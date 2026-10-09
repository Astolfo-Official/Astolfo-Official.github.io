#!/usr/bin/env python

import json
import os
import sys
import tempfile
import time
from datetime import datetime, timezone
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

import yaml


OUTPUT_FILE = "_data/citations.yml"
SERPAPI_ENDPOINT = "https://serpapi.com/search.json"
SERPAPI_PAGE_SIZE = 100
SERPAPI_MAX_PAGES = 10


class CitationFetchError(RuntimeError):
    """Raised when a citation provider cannot return usable data."""


def load_scholar_user_id() -> str:
    """Load the Google Scholar user ID from the configuration file."""
    config_file = "_data/socials.yml"
    if not os.path.exists(config_file):
        raise CitationFetchError(
            f"Configuration file {config_file} not found. Please ensure the file exists and contains your Google Scholar user ID."
        )

    try:
        with open(config_file, "r", encoding="utf-8") as file:
            config = yaml.safe_load(file) or {}
    except yaml.YAMLError as error:
        raise CitationFetchError(
            f"Error parsing YAML file {config_file}: {error}. Please check the file for correct YAML syntax."
        ) from error

    scholar_user_id = config.get("scholar_userid")
    if not scholar_user_id:
        raise CitationFetchError(
            "No 'scholar_userid' found in _data/socials.yml. Please add your Google Scholar user ID."
        )
    return str(scholar_user_id)


def load_existing_data() -> dict:
    """Load the existing citation file, returning an empty dictionary if absent."""
    if not os.path.exists(OUTPUT_FILE):
        return {}

    try:
        with open(OUTPUT_FILE, "r", encoding="utf-8") as file:
            data = yaml.safe_load(file)
        return data if isinstance(data, dict) else {}
    except Exception as error:
        print(
            f"Warning: Could not read existing citation data from {OUTPUT_FILE}: {error}. The file may be missing or corrupted."
        )
        return {}


def to_int(value, default: int = 0) -> int:
    """Convert API values to integers without failing on empty fields."""
    try:
        return int(value)
    except (TypeError, ValueError):
        return default


def request_serpapi_page(api_key: str, scholar_user_id: str, start: int) -> dict:
    """Fetch one Google Scholar author page from SerpApi with bounded retries."""
    params = {
        "engine": "google_scholar_author",
        "author_id": scholar_user_id,
        "api_key": api_key,
        "hl": "en",
        "num": SERPAPI_PAGE_SIZE,
        "start": start,
    }
    request = Request(
        f"{SERPAPI_ENDPOINT}?{urlencode(params)}",
        headers={"Accept": "application/json", "User-Agent": "citation-updater/1.0"},
    )

    last_error = "unknown error"
    for attempt in range(1, 4):
        try:
            with urlopen(request, timeout=45) as response:
                payload = json.load(response)

            if payload.get("error"):
                raise CitationFetchError(str(payload["error"]))
            if payload.get("search_metadata", {}).get("status") == "Error":
                raise CitationFetchError("SerpApi reported an unsuccessful search.")
            return payload
        except HTTPError as error:
            last_error = f"HTTP {error.code}"
        except URLError as error:
            last_error = f"network error: {error.reason}"
        except (json.JSONDecodeError, TimeoutError) as error:
            last_error = error.__class__.__name__
        except CitationFetchError as error:
            last_error = str(error)

        if attempt < 3:
            delay = 2**attempt
            print(
                f"SerpApi request attempt {attempt} failed ({last_error}); retrying in {delay} seconds."
            )
            time.sleep(delay)

    raise CitationFetchError(f"SerpApi failed after 3 attempts ({last_error}).")


def fetch_with_serpapi(api_key: str, scholar_user_id: str) -> dict:
    """Fetch citation metrics through SerpApi's Google Scholar Author API."""
    print("Fetching Google Scholar citations through SerpApi.")
    first_page = None
    articles = []
    start = 0

    for _ in range(SERPAPI_MAX_PAGES):
        page = request_serpapi_page(api_key, scholar_user_id, start)
        if first_page is None:
            first_page = page

        page_articles = page.get("articles") or []
        articles.extend(page_articles)
        if len(page_articles) < SERPAPI_PAGE_SIZE:
            break
        start += len(page_articles)
    else:
        raise CitationFetchError(
            f"SerpApi pagination exceeded {SERPAPI_MAX_PAGES} pages."
        )

    if not first_page or not articles:
        raise CitationFetchError(
            f"SerpApi returned no publications for Google Scholar ID '{scholar_user_id}'."
        )

    cited_by = first_page.get("cited_by") or {}
    h_index = None
    for row in cited_by.get("table") or []:
        metric = row.get("h_index")
        if metric:
            h_index = to_int(metric.get("all"))
            break

    citations_by_year = {
        str(item["year"]): to_int(item.get("citations"))
        for item in cited_by.get("graph") or []
        if item.get("year") is not None
    }

    papers = {}
    for article in articles:
        publication_id = article.get("citation_id")
        if not publication_id:
            print(
                f"Warning: SerpApi returned a publication without a citation ID: {article.get('title', 'Unknown')}."
            )
            continue

        title = article.get("title") or "Unknown Title"
        year = str(article.get("year") or "Unknown Year")
        citations = to_int((article.get("cited_by") or {}).get("value"))
        print(f"Found: {title} ({year}) - Citations: {citations}")
        papers[publication_id] = {
            "title": title,
            "year": year,
            "citations": citations,
        }

    return {
        "source": "serpapi",
        "h_index": h_index,
        "citations_by_year": citations_by_year,
        "papers": papers,
    }


def fetch_with_scholarly(scholar_user_id: str) -> dict:
    """Fetch citation metrics directly as a best-effort fallback."""
    from scholarly import scholarly

    print(
        "Fetching Google Scholar citations directly with scholarly (best-effort fallback)."
    )
    scholarly.set_timeout(20)
    scholarly.set_retries(2)

    try:
        author = scholarly.search_author_id(scholar_user_id)
        author_data = scholarly.fill(
            author, sections=["indices", "counts", "publications"]
        )
    except Exception as error:
        raise CitationFetchError(
            f"Direct Google Scholar fetch failed: {error}"
        ) from error

    publications = author_data.get("publications") or []
    if not publications:
        raise CitationFetchError(
            f"No publications found for Google Scholar ID '{scholar_user_id}'."
        )

    papers = {}
    for publication in publications:
        publication_id = publication.get("pub_id") or publication.get(
            "author_pub_id"
        )
        if not publication_id:
            print(
                f"Warning: No ID found for publication: {publication.get('bib', {}).get('title', 'Unknown')}."
            )
            continue

        bibliography = publication.get("bib") or {}
        title = bibliography.get("title") or "Unknown Title"
        year = str(bibliography.get("pub_year") or "Unknown Year")
        citations = to_int(publication.get("num_citations"))
        print(f"Found: {title} ({year}) - Citations: {citations}")
        papers[publication_id] = {
            "title": title,
            "year": year,
            "citations": citations,
        }

    return {
        "source": "scholarly",
        "h_index": author_data.get("hindex"),
        "citations_by_year": {
            str(year): to_int(count)
            for year, count in (author_data.get("cites_per_year") or {}).items()
        },
        "papers": papers,
    }


def fetch_citations(scholar_user_id: str) -> dict:
    """Use SerpApi when configured and retain scholarly as a fallback."""
    api_key = os.getenv("SERPAPI_API_KEY", "").strip()
    if api_key:
        try:
            return fetch_with_serpapi(api_key, scholar_user_id)
        except CitationFetchError as error:
            print(f"Warning: {error}")
            print("Falling back to a direct Google Scholar request.")
    else:
        print(
            "SERPAPI_API_KEY is not configured; direct Google Scholar requests may be rate-limited."
        )

    return fetch_with_scholarly(scholar_user_id)


def build_citation_data(fetched: dict, existing_data: dict, today: str) -> dict:
    """Normalize provider data and preserve existing metrics if a field is absent."""
    papers = fetched.get("papers") or {}
    if not papers:
        raise CitationFetchError("The citation provider returned no usable publications.")

    h_index = fetched.get("h_index")
    if h_index is None:
        if "h_index" in existing_data:
            print("Warning: Provider returned no h-index; keeping the existing value.")
            h_index = existing_data["h_index"]
        else:
            citation_counts = sorted(
                (paper["citations"] for paper in papers.values()), reverse=True
            )
            h_index = sum(
                count >= position
                for position, count in enumerate(citation_counts, start=1)
            )

    citations_by_year = fetched.get("citations_by_year") or {}
    if not citations_by_year and existing_data.get("citations_by_year"):
        print(
            "Warning: Provider returned no annual citation history; keeping the existing history."
        )
        citations_by_year = existing_data["citations_by_year"]

    return {
        "metadata": {"last_updated": today, "source": fetched["source"]},
        "citations_by_year": citations_by_year,
        "h_index": to_int(h_index),
        "papers": papers,
    }


def citation_data_changed(existing_data: dict, citation_data: dict) -> bool:
    """Return whether citation values or successful-fetch metadata changed."""
    return existing_data != citation_data


def write_citation_data(citation_data: dict) -> None:
    """Atomically replace the citation file so interruptions cannot corrupt it."""
    output_directory = os.path.dirname(OUTPUT_FILE) or "."
    file_descriptor, temporary_path = tempfile.mkstemp(
        dir=output_directory, prefix=".citations-", suffix=".yml"
    )
    try:
        with os.fdopen(file_descriptor, "w", encoding="utf-8") as file:
            yaml.safe_dump(citation_data, file, width=1000, sort_keys=True)
        os.replace(temporary_path, OUTPUT_FILE)
    finally:
        if os.path.exists(temporary_path):
            os.remove(temporary_path)


def get_scholar_citations() -> None:
    """Fetch and update Google Scholar citation data."""
    scholar_user_id = load_scholar_user_id()
    print(f"Fetching citations for Google Scholar ID: {scholar_user_id}")
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    existing_data = load_existing_data()

    last_updated = (existing_data.get("metadata") or {}).get("last_updated")
    if last_updated:
        print(f"Last updated on: {last_updated}")
        if (
            last_updated == today
            and existing_data.get("citations_by_year")
            and "h_index" in existing_data
        ):
            print("Citation data was already updated today. Skipping fetch.")
            return

    fetched = fetch_citations(scholar_user_id)
    citation_data = build_citation_data(fetched, existing_data, today)

    if not citation_data_changed(existing_data, citation_data):
        print(f"Citation data is unchanged. Successful source: {fetched['source']}.")
        return

    write_citation_data(citation_data)
    print(f"Citation data saved to {OUTPUT_FILE} using {fetched['source']}.")


if __name__ == "__main__":
    try:
        get_scholar_citations()
    except CitationFetchError as error:
        print(f"Citation update failed: {error}")
        sys.exit(1)
    except Exception as error:
        print(f"Unexpected error: {error}")
        sys.exit(1)
