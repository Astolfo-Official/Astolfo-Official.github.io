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
    margin-top: 0;
  }

  .publication-tools {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: center;
    margin: 1.15rem 0 2rem;
  }

  .publication-tools .bibsearch-form-input {
    width: min(100%, 22rem);
    min-height: 2.75rem;
    padding: 0.72rem 0.95rem;
    border: 1px solid var(--global-divider-color);
    border-radius: 8px;
    background: var(--global-card-bg-color);
    color: var(--global-text-color);
    box-shadow: 0 14px 34px rgba(15, 23, 42, 0.05);
  }

  .publication-tools .bibsearch-form-input:focus {
    border-color: var(--global-theme-color);
    outline: 0;
    box-shadow: 0 0 0 0.18rem rgba(252, 126, 175, 0.14);
  }

  .publication-filter-list {
    display: flex;
    flex: 1 1 auto;
    flex-wrap: wrap;
    gap: 0.45rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .publication-filter {
    min-height: 2.35rem;
    padding: 0.45rem 0.8rem;
    border: 1px solid var(--global-divider-color);
    border-radius: 999px;
    background: transparent;
    color: var(--global-text-color);
    font: inherit;
    font-size: 0.9rem;
    font-weight: 600;
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

  .research-area-filtered {
    display: none !important;
  }

  .publications-page .publications {
    margin-top: 0;
  }

  .publications-page .publications h2.bibliography {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 2.6rem 0 1.1rem;
    padding-top: 0;
    border-top: 0;
    color: var(--global-text-color);
    font-size: clamp(1.2rem, 1rem + 1vw, 1.55rem);
    font-weight: 700;
    line-height: 1.14;
    letter-spacing: 0;
  }

  .publications-page .publications h2.bibliography::after {
    content: "";
    flex: 1 1 auto;
    height: 1px;
    background: linear-gradient(90deg, var(--global-divider-color), transparent);
  }

  .publications-page .publications ol.bibliography {
    display: grid;
    gap: 1rem;
  }

  .publications-page .publications ol.bibliography > li {
    margin-bottom: 0;
    padding: clamp(1rem, 2.4vw, 1.25rem);
    border: 1px solid var(--global-divider-color);
    border-radius: 8px;
    background:
      linear-gradient(135deg, rgba(252, 126, 175, 0.1), transparent 44%),
      var(--global-card-bg-color);
    box-shadow: 0 14px 34px rgba(15, 23, 42, 0.06);
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.2s ease;
  }

  .publications-page .publications ol.bibliography > li:hover {
    border-color: color-mix(in srgb, var(--global-theme-color) 38%, var(--global-divider-color));
    box-shadow: 0 20px 42px rgba(15, 23, 42, 0.09);
    transform: translateY(-2px);
  }

  .publications-page .publications ol.bibliography li .title {
    margin-bottom: 0.35rem;
    font-size: 1.08rem;
    line-height: 1.4;
  }

  .publications-page .publications ol.bibliography li .author,
  .publications-page .publications ol.bibliography li .periodical {
    color: var(--global-text-color-light);
  }

  .publications-page .publications ol.bibliography li .abbr abbr {
    border-radius: 6px;
  }

  .publications-page .publications ol.bibliography li .abbr .preview-container {
    border: 1px solid var(--global-divider-color);
    border-radius: 8px;
    background: var(--global-bg-color);
  }

  .publications-page .publications ol.bibliography li .resource-links .resource-link,
  .publications-page .publications ol.bibliography li .links a.btn {
    border-color: var(--global-divider-color);
    border-radius: 999px;
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

  @media (max-width: 767.98px) {
    .publications-page {
      margin-top: 0;
    }

    .publication-tools {
      width: 100%;
      align-items: stretch;
      flex-direction: column;
    }

    .publications-page .publications ol.bibliography > li {
      padding: 1rem;
    }
  }
---

<!-- _pages/publications.md -->

<div class="publications-page">
  <header class="page-hero">
    <h1>{{ page.title }}</h1>
    <p>{{ page.description }}</p>
  </header>

  <div class="publication-tools">
    {% include bib_search.liquid %}
    <ul class="publication-filter-list" aria-label="Research direction filters">
      <li><button class="publication-filter is-active" type="button" data-area="all">All</button></li>
      <li><button class="publication-filter" type="button" data-area="photonics">Polaritonics</button></li>
      <li><button class="publication-filter" type="button" data-area="ai-agents">AI Agents</button></li>
      <li><button class="publication-filter" type="button" data-area="electronic structure">Electronic Structure</button></li>
    </ul>
  </div>

  <div class="publications">
    {% bibliography %}
  </div>
</div>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    const filters = Array.from(document.querySelectorAll(".publication-filter"));
    const entries = Array.from(document.querySelectorAll(".bibliography > li"));
    if (filters.length === 0 || entries.length === 0) return;

    let activeArea = "all";

    const assignPublicationNumbers = () => {
      const publicationNumbers = entries.map((entry) => entry.querySelector(".publication-number")).filter(Boolean);
      const publicationCount = publicationNumbers.length;

      publicationNumbers.forEach((numberElement, index) => {
        numberElement.textContent = publicationCount - index;
      });
    };

    const updateBibliographyGroups = () => {
      document.querySelectorAll("h2.bibliography").forEach((heading) => {
        let iterator = heading.nextElementSibling;
        let hasVisibleEntry = false;

        while (iterator && iterator.tagName !== "H2") {
          if (iterator.tagName === "OL") {
            const listItems = Array.from(iterator.querySelectorAll(":scope > li"));
            const listHasVisibleEntry = listItems.some(
              (item) => !item.classList.contains("unloaded") && !item.classList.contains("research-area-filtered")
            );

            iterator.classList.toggle("research-area-filtered", !listHasVisibleEntry);
            if (iterator.previousElementSibling && iterator.previousElementSibling.tagName !== "OL") {
              iterator.previousElementSibling.classList.toggle("research-area-filtered", !listHasVisibleEntry);
            }
            hasVisibleEntry = hasVisibleEntry || listHasVisibleEntry;
          }
          iterator = iterator.nextElementSibling;
        }

        heading.classList.toggle("research-area-filtered", !hasVisibleEntry);
      });
    };

    const applyResearchAreaFilter = () => {
      entries.forEach((entry) => {
        const entryArea = entry.querySelector(".publication-entry-column")?.dataset.researchArea || "";
        const matchesArea = activeArea === "all" || entryArea === activeArea;
        entry.classList.toggle("research-area-filtered", !matchesArea);
      });
      updateBibliographyGroups();
    };

    filters.forEach((button) => {
      button.addEventListener("click", () => {
        activeArea = button.dataset.area;
        filters.forEach((filterButton) => filterButton.classList.toggle("is-active", filterButton === button));
        applyResearchAreaFilter();
      });
    });

    document.getElementById("bibsearch")?.addEventListener("input", () => {
      window.setTimeout(updateBibliographyGroups, 0);
    });

    assignPublicationNumbers();
    applyResearchAreaFilter();
  });
</script>
