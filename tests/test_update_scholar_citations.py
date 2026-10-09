import importlib.util
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import yaml


SCRIPT_PATH = Path(__file__).parents[1] / "bin" / "update_scholar_citations.py"
SPEC = importlib.util.spec_from_file_location("update_scholar_citations", SCRIPT_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)


class UpdateScholarCitationsTest(unittest.TestCase):
    def test_serpapi_response_is_normalized(self):
        payload = {
            "search_metadata": {"status": "Success"},
            "cited_by": {
                "table": [{"citations": {"all": 8}}, {"h_index": {"all": 3}}],
                "graph": [
                    {"year": 2025, "citations": 3},
                    {"year": 2026, "citations": 5},
                ],
            },
            "articles": [
                {
                    "citation_id": "user:paper",
                    "title": "Example paper",
                    "year": "2026",
                    "cited_by": {"value": 5},
                }
            ],
        }

        with patch.object(MODULE, "request_serpapi_page", return_value=payload):
            result = MODULE.fetch_with_serpapi("secret", "user")

        self.assertEqual(result["source"], "serpapi")
        self.assertEqual(result["h_index"], 3)
        self.assertEqual(result["citations_by_year"], {"2025": 3, "2026": 5})
        self.assertEqual(result["papers"]["user:paper"]["citations"], 5)

    def test_missing_summary_metrics_keep_existing_values(self):
        existing = {"h_index": 4, "citations_by_year": {"2026": 9}}
        fetched = {
            "source": "serpapi",
            "h_index": None,
            "citations_by_year": {},
            "papers": {
                "user:paper": {
                    "title": "Example paper",
                    "year": "2026",
                    "citations": 9,
                }
            },
        }

        result = MODULE.build_citation_data(fetched, existing, "2026-10-09")

        self.assertEqual(result["h_index"], 4)
        self.assertEqual(result["citations_by_year"], {"2026": 9})

    def test_citation_file_is_written_atomically(self):
        citation_data = {
            "metadata": {"last_updated": "2026-10-09", "source": "serpapi"},
            "citations_by_year": {"2026": 5},
            "h_index": 2,
            "papers": {},
        }

        with tempfile.TemporaryDirectory() as directory:
            output_file = Path(directory) / "citations.yml"
            with patch.object(MODULE, "OUTPUT_FILE", str(output_file)):
                MODULE.write_citation_data(citation_data)

            with output_file.open(encoding="utf-8") as file:
                self.assertEqual(yaml.safe_load(file), citation_data)

    def test_new_successful_fetch_date_counts_as_a_change(self):
        existing = {
            "metadata": {"last_updated": "2026-10-08", "source": "serpapi"},
            "citations_by_year": {"2026": 5},
            "h_index": 2,
            "papers": {},
        }
        updated = {
            **existing,
            "metadata": {"last_updated": "2026-10-09", "source": "serpapi"},
        }

        self.assertTrue(MODULE.citation_data_changed(existing, updated))


if __name__ == "__main__":
    unittest.main()
