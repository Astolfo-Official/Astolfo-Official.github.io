---
layout: page
permalink: /publications/
title: Publications
description:
nav: true
nav_order: 2
scholar:
  sort_by: urldate,key
  order: descending,descending
  group_by: year
  group_order: descending
_styles: |
  .post-header {
    display: none;
  }

  .publications-page {
    --publication-accent-soft: rgba(252, 126, 175, 0.1);
    --publication-chart-start: #f09abb;
    --publication-chart-end: #9f99d1;
    --publication-chart-surface: rgba(185, 182, 223, 0.12);
    --publication-chart-shadow: rgba(179, 139, 191, 0.18);
    --publication-card-shadow: 0 10px 28px rgba(17, 46, 54, 0.1);
    --publication-card-shadow-hover: 0 16px 38px rgba(252, 126, 175, 0.24);
    margin-top: 0;
  }

  .publication-page-hero {
    margin-bottom: 1.35rem;
  }

  .publication-workbench {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(18.5rem, 20rem);
    gap: 1rem;
    align-items: start;
  }

  .publication-list-panel,
  .publication-insights {
    min-width: 0;
  }

  .publication-insights {
    border: 1px solid var(--global-divider-color);
    border-radius: 8px;
    background: var(--global-card-bg-color);
  }

  .publication-list-panel {
    padding: 0;
  }

  .publication-insights__search {
    padding: 1rem 1.1rem;
    border-bottom: 1px solid var(--global-divider-color);
  }

  .publication-insights__search .bibsearch-form-input {
    width: 100%;
    min-height: 2.3rem;
    padding: 0.55rem 0.7rem;
    border: 1px solid var(--global-divider-color);
    border-radius: 8px;
    background: var(--global-card-bg-color);
    color: var(--global-text-color);
    font-size: 0.78rem;
  }

  .publication-insights__search .bibsearch-form-input:focus {
    border-color: var(--global-theme-color);
    outline: 0;
    box-shadow: 0 0 0 0.18rem rgba(252, 126, 175, 0.14);
  }

  .publication-filter-list {
    display: flex;
    flex-wrap: nowrap;
    gap: 0.28rem;
    margin: 0;
    padding: 0;
    overflow-x: auto;
    list-style: none;
    scrollbar-width: none;
  }

  .publication-filter-list::-webkit-scrollbar {
    display: none;
  }

  .publication-filter-list > li {
    flex: 0 0 auto;
  }

  .publication-filter {
    min-height: 1.8rem;
    padding: 0.28rem 0.42rem;
    border: 1px solid var(--global-divider-color);
    border-radius: 999px;
    background: transparent;
    color: var(--global-text-color);
    font: inherit;
    font-size: 0.64rem;
    font-weight: 600;
    white-space: nowrap;
    cursor: pointer;
    transition:
      border-color 0.2s ease,
      background-color 0.2s ease,
      color 0.2s ease;
  }

  .publication-filter:hover,
  .publication-filter.is-active {
    border-color: var(--global-theme-color);
    background: var(--global-theme-color);
    color: var(--global-hover-text-color);
  }

  .publication-sidebar-filtered {
    display: none !important;
  }

  .publications-page .publications {
    margin-top: 0;
  }

  .publications-page .publications h2.bibliography {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 2rem 0 0.85rem;
    padding-top: 0;
    border-top: 0;
    color: var(--global-text-color);
    font-size: clamp(1.2rem, 1rem + 1vw, 1.55rem);
    font-weight: 700;
    line-height: 1.14;
    letter-spacing: 0;
  }

  .publications-page .publications h2.bibliography:first-child {
    margin-top: 0;
  }

  .publications-page .publications h2.bibliography::after {
    content: "";
    flex: 1 1 auto;
    height: 1px;
    background: linear-gradient(90deg, var(--global-divider-color), transparent);
  }

  .publications-page .publications ol.bibliography {
    display: grid;
    gap: 0.75rem;
  }

  .publications-page .publications ol.bibliography > li {
    margin-bottom: 0;
    padding: clamp(0.9rem, 2vw, 1.05rem);
    border: 1px solid color-mix(in srgb, var(--global-theme-color) 22%, var(--global-divider-color));
    border-left: 3px solid color-mix(in srgb, var(--global-theme-color) 72%, transparent);
    border-radius: 8px;
    background: linear-gradient(115deg, var(--publication-accent-soft) 0%, transparent 100%), var(--global-card-bg-color);
    box-shadow: var(--publication-card-shadow);
    transition:
      border-color 160ms ease,
      box-shadow 160ms ease,
      transform 160ms ease;
  }

  .publications-page .publications ol.bibliography > li:hover {
    border-color: var(--global-theme-color);
    border-left-color: var(--global-theme-color);
    box-shadow: var(--publication-card-shadow-hover);
    transform: translateY(-2px);
  }

  .publications-page .publications ol.bibliography li .title {
    margin-bottom: 0.35rem;
    font-size: 1.02rem;
    line-height: 1.35;
  }

  .publications-page .publications ol.bibliography li .author,
  .publications-page .publications ol.bibliography li .periodical {
    color: var(--global-text-color-light);
    font-size: 0.88rem;
  }

  .publications-page .publications ol.bibliography li .abbr abbr {
    border-radius: 6px;
  }

  .publications-page .publications ol.bibliography li .abbr .preview-container {
    border: 1px solid var(--global-divider-color);
    border-radius: 6px;
    background: linear-gradient(135deg, var(--publication-accent-soft), transparent), var(--global-bg-color);
  }

  .publications-page .publications ol.bibliography li .resource-links .resource-link,
  .publications-page .publications ol.bibliography li .links a.btn {
    border-color: var(--global-divider-color);
    border-radius: 6px;
    background: transparent;
    color: var(--global-text-color);
    font-weight: 600;
  }

  .publications-page .publications ol.bibliography li .resource-links .resource-link:hover,
  .publications-page .publications ol.bibliography li .links a.btn:hover {
    border-color: var(--global-theme-color);
    background: var(--global-theme-color);
    color: var(--global-hover-text-color);
  }

  .publication-insights {
    position: sticky;
    top: 5rem;
    overflow: hidden;
  }

  .publication-insights__header {
    padding: 1.15rem 1.1rem 1rem;
    border-bottom: 1px solid var(--global-divider-color);
    background: var(--global-card-bg-color);
  }

  .publication-insights__kicker,
  .publication-insights__section-title,
  .publication-year-label {
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .publication-insights__kicker {
    margin: 0 0 0.35rem;
    color: var(--global-theme-color);
  }

  .publication-insights__header h2 {
    margin: 0;
    color: var(--global-text-color);
    font-size: 1.3rem;
    font-weight: 700;
    line-height: 1.18;
  }

  .publication-insights__updated {
    margin: 0.55rem 0 0;
    color: var(--global-text-color-light);
    font-size: 0.78rem;
    line-height: 1.5;
  }

  .publication-insights__filters {
    display: grid;
    gap: 0.85rem;
    padding: 0.95rem 1.1rem 1rem;
    border-bottom: 1px solid var(--global-divider-color);
  }

  .publication-filter-group {
    min-width: 0;
    margin: 0;
    padding: 0;
    border: 0;
  }

  .publication-filter-group legend {
    width: auto;
    margin: 0 0 0.45rem;
    color: var(--global-text-color-light);
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    line-height: 1.2;
    text-transform: uppercase;
  }

  .publication-stats {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin: 0;
    padding: 0;
  }

  .publication-stat {
    min-width: 0;
    padding: 0.9rem 1rem;
    border-right: 1px solid var(--global-divider-color);
    border-bottom: 1px solid var(--global-divider-color);
  }

  .publication-stat:nth-child(2n) {
    border-right: 0;
  }

  .publication-stat dt {
    margin-bottom: 0.35rem;
    color: var(--global-text-color-light);
    font-size: 0.72rem;
    font-weight: 700;
    line-height: 1.3;
  }

  .publication-stat dd {
    display: flex;
    gap: 0.35rem;
    align-items: baseline;
    margin: 0;
    color: var(--global-text-color);
    font-size: 1.35rem;
    font-weight: 750;
    line-height: 1;
  }

  .publication-stat small {
    color: var(--global-text-color-light);
    font-size: 0.7rem;
    font-weight: 600;
  }

  .publication-insights__section {
    padding: 1rem 1.1rem;
    border-bottom: 1px solid var(--global-divider-color);
  }

  .publication-insights__section-title {
    margin: 0 0 0.75rem;
    color: var(--global-theme-color);
  }

  .publication-insights__section-heading {
    display: flex;
    gap: 0.75rem;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 0.75rem;
  }

  .publication-insights__section-heading .publication-insights__section-title {
    margin: 0;
  }

  .publication-chart-context {
    color: var(--global-text-color-light);
    font-size: 0.68rem;
    font-weight: 700;
    white-space: nowrap;
  }

  .publication-year-chart {
    display: grid;
    grid-template-columns: repeat(var(--publication-year-count, 1), minmax(2.5rem, 1fr));
    gap: 0.45rem;
    margin: 0;
    padding: 0.7rem 0.45rem 0.55rem;
    overflow-x: auto;
    border: 1px solid var(--global-divider-color);
    border-radius: 8px;
    background:
      linear-gradient(135deg, rgba(252, 126, 175, 0.05), var(--publication-chart-surface)),
      var(--global-card-bg-color);
    list-style: none;
  }

  .publication-year-chart > li {
    min-width: 0;
  }

  .publication-year-bar {
    display: grid;
    grid-template-rows: auto 5.25rem auto;
    gap: 0.35rem;
    width: 100%;
    min-width: 0;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    cursor: pointer;
    transition:
      opacity 180ms ease,
      filter 180ms ease;
  }

  .publication-year-value {
    display: block;
    min-width: 0;
    padding: 0.15rem 0.2rem;
    overflow: hidden;
    border: 1px solid var(--global-divider-color);
    border-radius: 999px;
    color: var(--global-text-color);
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
    font-size: 0.68rem;
    font-weight: 750;
    line-height: 1.1;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .publication-year-track {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    min-width: 0;
  }

  .publication-year-fill {
    width: clamp(0.72rem, 48%, 1.35rem);
    height: max(0.24rem, var(--publication-bar-ratio, 0%));
    border-radius: 999px 999px 0.25rem 0.25rem;
    background: linear-gradient(180deg, var(--publication-chart-start), var(--publication-chart-end));
    box-shadow: 0 5px 14px var(--publication-chart-shadow);
    transition:
      height 240ms ease,
      opacity 180ms ease;
  }

  .publication-year-bar:hover .publication-year-value,
  .publication-year-bar:focus-visible .publication-year-value,
  .publication-year-bar.is-year-active .publication-year-value {
    border-color: var(--global-theme-color);
    color: var(--global-theme-color);
  }

  .publication-year-label {
    color: var(--global-theme-color);
    letter-spacing: 0.02em;
    text-align: center;
  }

  .publication-year-bar:focus-visible {
    border-radius: 6px;
    outline: 2px solid color-mix(in srgb, var(--global-theme-color) 54%, transparent);
    outline-offset: 3px;
  }

  .publication-year-bar.is-year-muted,
  .publications-page .publications h2.bibliography.is-year-muted,
  .publications-page .publications ol.bibliography > li.is-year-muted {
    opacity: 0.24;
    filter: grayscale(0.55) saturate(0.35);
  }

  .publications-page .publications h2.bibliography,
  .publications-page .publications ol.bibliography > li {
    transition:
      opacity 180ms ease,
      filter 180ms ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.2s ease;
  }

  html[data-theme="dark"] .publications-page {
    --publication-accent-soft: rgba(252, 126, 175, 0.13);
    --publication-chart-start: #f3a5c3;
    --publication-chart-end: #aaa4da;
    --publication-chart-surface: rgba(188, 185, 228, 0.13);
    --publication-chart-shadow: rgba(243, 165, 195, 0.2);
    --publication-card-shadow: 0 12px 30px rgba(0, 0, 0, 0.26);
    --publication-card-shadow-hover: 0 18px 42px rgba(252, 126, 175, 0.28);
  }

  @media (max-width: 960px) {
    .publication-workbench {
      grid-template-columns: 1fr;
    }

    .publication-insights {
      position: static;
      grid-row: 1;
    }
  }

  @media (max-width: 767.98px) {
    .publications-page {
      margin-top: 0;
    }

    .publications-page .publications ol.bibliography > li {
      padding: 1rem;
    }
  }

  @media (max-width: 480px) {
    .publication-stats {
      grid-template-columns: 1fr;
    }

    .publication-stat,
    .publication-stat:nth-child(2n) {
      border-right: 0;
    }
  }
---

<!-- _pages/publications.md -->

<div class="publications-page">
  <header class="page-hero publication-page-hero">
    <h1>{{ page.title }}</h1>
    <p>Articles and preprints across polaritonics, electronic-structure theory, and autonomous scientific simulation.</p>
  </header>

{% assign publication_records = site.data.cv.cv.sections.Publications %}
{% assign publication_total = site.data.citations.papers | size %}
{% assign first_author_total = 0 %}
{% assign first_author_citation_total = 0 %}
{% for publication in publication_records %}
{% assign publication_first_author = publication.authors | split: ' and ' | first | strip %}
{% if publication_first_author == 'Ji, Xinwei' %}
{% assign first_author_total = first_author_total | plus: 1 %}
{% assign publication_title_key = publication.title | downcase | remove: ' ' | remove: '-' | remove: '–' | remove: '—' | remove: ':' %}
{% for paper in site.data.citations.papers %}
{% assign citation_title_key = paper[1].title | downcase | remove: ' ' | remove: '-' | remove: '–' | remove: '—' | remove: ':' %}
{% if publication_title_key == citation_title_key %}
{% assign first_author_citation_total = first_author_citation_total | plus: paper[1].citations %}
{% break %}
{% endif %}
{% endfor %}
{% endif %}
{% endfor %}

{% assign citation_total = 0 %}
{% for paper in site.data.citations.papers %}
{% assign citation_total = citation_total | plus: paper[1].citations %}
{% endfor %}

  <div class="publication-workbench">
    <section class="publication-list-panel" aria-label="Publication list">
      <div class="publications">
        {% publications_bibliography %}
      </div>
    </section>

    <aside class="publication-insights" aria-labelledby="publication-insights-title">
      <header class="publication-insights__header">
        <p class="publication-insights__kicker">Google Scholar</p>
        <h2 id="publication-insights-title">Publication snapshot</h2>
        {% if site.data.citations.metadata.last_updated %}
          <p class="publication-insights__updated">Citation data updated {{ site.data.citations.metadata.last_updated | date: '%b %-d, %Y' }}.</p>
        {% endif %}
      </header>

      <div class="publication-insights__search">
        {% include bib_search.liquid %}
      </div>

      <div class="publication-insights__filters" aria-label="Publication filters">
        <fieldset class="publication-filter-group">
          <legend>Authorship</legend>
          <ul class="publication-filter-list">
            <li><button class="publication-filter is-active" type="button" data-authorship="all" aria-pressed="true">All</button></li>
            <li><button class="publication-filter" type="button" data-authorship="first-author" aria-pressed="false">First author</button></li>
            <li><button class="publication-filter" type="button" data-authorship="coauthor" aria-pressed="false">Coauthor</button></li>
          </ul>
        </fieldset>
        <fieldset class="publication-filter-group">
          <legend>Research direction</legend>
          <ul class="publication-filter-list">
            <li><button class="publication-filter is-active" type="button" data-area="all" aria-pressed="true">All</button></li>
            <li><button class="publication-filter" type="button" data-area="photonics" aria-pressed="false">Polaritonics</button></li>
            <li><button class="publication-filter" type="button" data-area="electronic structure" aria-pressed="false">Electronic structure</button></li>
            <li><button class="publication-filter" type="button" data-area="ai-agents" aria-pressed="false">AI agents</button></li>
          </ul>
        </fieldset>
      </div>

      <dl class="publication-stats">
        <div class="publication-stat">
          <dt>Showing</dt>
          <dd aria-live="polite">
            <span id="publication-visible-count">{{ publication_total }}</span>
            <small>of <span id="publication-total-count">{{ publication_total }}</span></small>
          </dd>
        </div>
        <div class="publication-stat">
          <dt>Citations</dt>
          <dd aria-live="polite">
            <span id="publication-visible-citations">{{ citation_total }}</span>
            <small>of {{ citation_total }}</small>
          </dd>
        </div>
        <div class="publication-stat">
          <dt>First author</dt>
          <dd>
            <span id="publication-visible-first-author-count">{{ first_author_total }}</span>
            <small><span id="publication-visible-first-author-citations">{{ first_author_citation_total }}</span> citations</small>
          </dd>
        </div>
        <div class="publication-stat">
          <dt>h-index</dt>
          <dd>
            <span>{{ site.data.citations.h_index | default: 0 }}</span>
          </dd>
        </div>
      </dl>

      <section class="publication-insights__section" aria-labelledby="publication-citation-years-title">
        <div class="publication-insights__section-heading">
          <h3 id="publication-citation-years-title" class="publication-insights__section-title">Citations by year</h3>
          <span class="publication-chart-context">All papers</span>
        </div>
        <ol id="publication-citation-chart" class="publication-year-chart" data-metric="citations"></ol>
      </section>

    </aside>

  </div>
</div>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    const authorshipFilters = Array.from(document.querySelectorAll(".publication-filter[data-authorship]"));
    const areaFilters = Array.from(document.querySelectorAll(".publication-filter[data-area]"));
    const entries = Array.from(document.querySelectorAll(".publications-page .bibliography > li"));
    const citationHistory = {{ site.data.citations.citations_by_year | jsonify }};
    if (authorshipFilters.length === 0 || areaFilters.length === 0 || entries.length === 0) return;

    let activeAuthorship = "all";
    let activeArea = "all";

    const updateVisibleStats = () => {
      const visibleEntries = entries.filter(
        (entry) => !entry.classList.contains("unloaded") && !entry.classList.contains("publication-sidebar-filtered")
      );
      const countElement = document.getElementById("publication-visible-count");
      const totalCountElement = document.getElementById("publication-total-count");
      const citationElement = document.getElementById("publication-visible-citations");
      const firstAuthorCountElement = document.getElementById("publication-visible-first-author-count");
      const firstAuthorCitationElement = document.getElementById("publication-visible-first-author-citations");
      const visibleCitations = visibleEntries.reduce(
        (total, entry) => total + (Number(entry.querySelector(".publication-entry-column")?.dataset.citations) || 0),
        0
      );
      const visibleFirstAuthorEntries = visibleEntries.filter(
        (entry) => entry.querySelector(".publication-entry-column")?.dataset.authorship === "first-author"
      );
      const visibleFirstAuthorCitations = visibleFirstAuthorEntries.reduce(
        (total, entry) => total + (Number(entry.querySelector(".publication-entry-column")?.dataset.citations) || 0),
        0
      );

      if (countElement) countElement.textContent = visibleEntries.length;
      if (totalCountElement) totalCountElement.textContent = entries.length;
      if (citationElement) citationElement.textContent = visibleCitations;
      if (firstAuthorCountElement) firstAuthorCountElement.textContent = visibleFirstAuthorEntries.length;
      if (firstAuthorCitationElement) firstAuthorCitationElement.textContent = visibleFirstAuthorCitations;
    };

    const setFocusedChartYear = (focusedYear) => {
      const yearBars = Array.from(document.querySelectorAll(".publication-year-bar"));
      const hasMatchingYear = yearBars.some((bar) => bar.dataset.year === focusedYear);
      if (!hasMatchingYear) return;

      yearBars.forEach((bar) => {
        bar.classList.toggle("is-year-active", bar.dataset.year === focusedYear);
        bar.classList.toggle("is-year-muted", bar.dataset.year !== focusedYear);
      });
    };

    const clearFocusedChartYear = () => {
      document.querySelectorAll(".publication-year-bar").forEach((bar) => {
        bar.classList.remove("is-year-muted", "is-year-active");
      });
    };

    const setFocusedPublicationYear = (focusedYear) => {
      entries.forEach((entry) => {
        const entryYear = entry.querySelector(".publication-entry-column")?.dataset.publicationYear || "";
        entry.classList.toggle("is-year-muted", entryYear !== focusedYear);
      });

      document.querySelectorAll(".publications-page h2.bibliography").forEach((heading) => {
        const groupEntries = heading.nextElementSibling?.querySelectorAll(".publication-entry-column") || [];
        const hasMatchingYear = Array.from(groupEntries).some((entry) => entry.dataset.publicationYear === focusedYear);
        heading.classList.toggle("is-year-muted", !hasMatchingYear);
      });

      setFocusedChartYear(focusedYear);
    };

    const clearFocusedPublicationYear = () => {
      entries.forEach((entry) => entry.classList.remove("is-year-muted"));
      document.querySelectorAll(".publications-page h2.bibliography").forEach((heading) => {
        heading.classList.remove("is-year-muted");
      });
      clearFocusedChartYear();
    };

    const createYearBar = (yearSummary, maximumValue) => {
      const value = yearSummary.citations;
      const item = document.createElement("li");
      const button = document.createElement("button");
      const valueLabel = document.createElement("span");
      const track = document.createElement("span");
      const fill = document.createElement("span");
      const yearLabel = document.createElement("span");

      button.type = "button";
      button.className = "publication-year-bar";
      button.dataset.year = yearSummary.year;
      button.setAttribute("aria-label", `${yearSummary.year}: ${value} citations`);

      valueLabel.className = "publication-year-value";
      valueLabel.textContent = value;

      track.className = "publication-year-track";
      track.setAttribute("aria-hidden", "true");
      fill.className = "publication-year-fill";
      fill.style.setProperty("--publication-bar-ratio", `${maximumValue > 0 ? (value / maximumValue) * 100 : 0}%`);
      track.append(fill);

      yearLabel.className = "publication-year-label";
      yearLabel.textContent = yearSummary.year;

      button.append(valueLabel, track, yearLabel);
      button.addEventListener("pointerenter", () => setFocusedPublicationYear(yearSummary.year));
      button.addEventListener("pointerleave", clearFocusedPublicationYear);
      button.addEventListener("focus", () => setFocusedPublicationYear(yearSummary.year));
      button.addEventListener("blur", clearFocusedPublicationYear);
      item.append(button);
      return item;
    };

    const buildCitationChart = () => {
      const citationSummaries = Object.entries(citationHistory || {})
        .map(([year, citations]) => ({ year, citations: Number(citations) || 0 }))
        .sort((left, right) => Number(left.year) - Number(right.year));
      if (citationSummaries.length === 0) return;

      const citationChart = document.getElementById("publication-citation-chart");
      const maximumCitations = Math.max(...citationSummaries.map((summary) => summary.citations));

      citationChart?.style.setProperty("--publication-year-count", citationSummaries.length);

      citationChart?.replaceChildren(...citationSummaries.map((summary) => createYearBar(summary, maximumCitations)));
    };

    const bindPublicationYearInteractions = () => {
      entries.forEach((entry) => {
        const publicationYear = entry.querySelector(".publication-entry-column")?.dataset.publicationYear || "";
        if (!publicationYear) return;

        entry.addEventListener("pointerenter", () => setFocusedChartYear(publicationYear));
        entry.addEventListener("pointerleave", clearFocusedChartYear);
        entry.addEventListener("focusin", () => setFocusedChartYear(publicationYear));
        entry.addEventListener("focusout", (event) => {
          if (!entry.contains(event.relatedTarget)) clearFocusedChartYear();
        });
      });
    };

    const assignPublicationNumbers = () => {
      const publicationNumbers = entries.map((entry) => entry.querySelector(".publication-number")).filter(Boolean);
      const publicationCount = publicationNumbers.length;

      publicationNumbers.forEach((numberElement, index) => {
        numberElement.textContent = publicationCount - index;
      });
    };

    const updateBibliographyGroups = () => {
      document.querySelectorAll(".publications-page h2.bibliography").forEach((heading) => {
        let iterator = heading.nextElementSibling;
        let hasVisibleEntry = false;

        while (iterator && iterator.tagName !== "H2") {
          if (iterator.tagName === "OL") {
            const listItems = Array.from(iterator.querySelectorAll(":scope > li"));
            const listHasVisibleEntry = listItems.some(
              (item) => !item.classList.contains("unloaded") && !item.classList.contains("publication-sidebar-filtered")
            );

            iterator.classList.toggle("publication-sidebar-filtered", !listHasVisibleEntry);
            if (iterator.previousElementSibling && iterator.previousElementSibling.tagName !== "OL") {
              iterator.previousElementSibling.classList.toggle("publication-sidebar-filtered", !listHasVisibleEntry);
            }
            hasVisibleEntry = hasVisibleEntry || listHasVisibleEntry;
          }
          iterator = iterator.nextElementSibling;
        }

        heading.classList.toggle("publication-sidebar-filtered", !hasVisibleEntry);
      });
      updateVisibleStats();
    };

    const applySidebarFilters = () => {
      entries.forEach((entry) => {
        const entryData = entry.querySelector(".publication-entry-column")?.dataset;
        const entryArea = entryData?.researchArea || "";
        const entryAuthorship = entryData?.authorship || "coauthor";
        const matchesArea = activeArea === "all" || entryArea === activeArea;
        const matchesAuthorship = activeAuthorship === "all" || entryAuthorship === activeAuthorship;
        entry.classList.toggle("publication-sidebar-filtered", !matchesArea || !matchesAuthorship);
      });
      updateBibliographyGroups();
    };

    authorshipFilters.forEach((button) => {
      button.addEventListener("click", () => {
        activeAuthorship = button.dataset.authorship;
        authorshipFilters.forEach((filterButton) => {
          const isActive = filterButton === button;
          filterButton.classList.toggle("is-active", isActive);
          filterButton.setAttribute("aria-pressed", String(isActive));
        });
        applySidebarFilters();
      });
    });

    areaFilters.forEach((button) => {
      button.addEventListener("click", () => {
        activeArea = button.dataset.area;
        areaFilters.forEach((filterButton) => {
          const isActive = filterButton === button;
          filterButton.classList.toggle("is-active", isActive);
          filterButton.setAttribute("aria-pressed", String(isActive));
        });
        applySidebarFilters();
      });
    });

    document.getElementById("bibsearch")?.addEventListener("input", () => {
      window.setTimeout(updateBibliographyGroups, 20);
    });

    assignPublicationNumbers();
    buildCitationChart();
    bindPublicationYearInteractions();
    applySidebarFilters();
  });
</script>
