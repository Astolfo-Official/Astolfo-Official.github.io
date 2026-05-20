---
layout: page
title: News
permalink: /news/
nav: true
nav_order: 6
description:
_styles: |
  .post-header {
    display: none;
  }

  .news-page {
    margin-top: 0;
  }

  .news-page .news {
    margin-top: 1.35rem;
  }

  .news-tools {
    margin: 1.15rem 0 1.35rem;
  }

  .news-search-input {
    width: min(100%, 22rem);
    min-height: 2.75rem;
    padding: 0.72rem 0.95rem;
    border: 1px solid var(--global-divider-color);
    border-radius: 8px;
    background: var(--global-card-bg-color);
    color: var(--global-text-color);
    box-shadow: 0 14px 34px rgba(15, 23, 42, 0.05);
  }

  .news-search-input:focus {
    border-color: var(--global-theme-color);
    outline: 0;
    box-shadow: 0 0 0 0.18rem rgba(252, 126, 175, 0.14);
  }

  .news-search-empty {
    display: none;
    margin: 1rem 0 0;
    color: var(--global-text-color-light);
  }

  .news-search-empty.is-visible {
    display: block;
  }

  .news-page .news .table-responsive {
    overflow: visible;
  }

  .news-page .news table {
    display: block;
    margin: 0;
  }

  .news-page .news tbody {
    display: grid;
    gap: 0.65rem;
  }

  .news-page .news tr {
    display: grid;
    grid-template-columns: 10.5rem minmax(0, 1fr);
    gap: 0.75rem;
    align-items: center;
    min-height: 3.25rem;
    padding: 0.68rem 0.9rem;
    border: 1px solid var(--global-divider-color);
    border-radius: 8px;
    background:
      linear-gradient(135deg, rgba(252, 126, 175, 0.08), transparent 46%),
      var(--global-card-bg-color);
    box-shadow: 0 14px 34px rgba(15, 23, 42, 0.05);
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.2s ease;
  }

  .news-page .news tr:hover {
    border-color: color-mix(in srgb, var(--global-theme-color) 34%, var(--global-divider-color));
    box-shadow: 0 20px 42px rgba(15, 23, 42, 0.08);
    transform: translateY(-2px);
  }

  .news-page .news th,
  .news-page .news td {
    display: flex;
    align-items: center;
    padding: 0;
    border: 0;
    color: var(--global-text-color);
    font-size: 0.98rem;
    line-height: 1.45;
  }

  .news-page .news th {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 10.5rem !important;
    white-space: nowrap;
  }

  .news-page .news-number {
    display: inline-flex;
    min-width: 2rem;
    min-height: 2rem;
    align-items: center;
    justify-content: center;
    border: 1px solid color-mix(in srgb, var(--global-theme-color) 36%, var(--global-divider-color));
    border-radius: 999px;
    color: var(--global-theme-color);
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 0;
  }

  .news-page .news-date {
    color: var(--global-theme-color);
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .news-page .news-title {
    color: var(--global-text-color);
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.4;
    text-decoration: none;
  }

  .news-page .news-title:hover {
    color: var(--global-theme-color);
  }

  .news-page .news td p:last-child {
    margin-bottom: 0;
  }

  .news-page .news tr.news-search-hidden {
    display: none;
  }

  @media (max-width: 640px) {
    .news-page .news tr {
      grid-template-columns: 1fr;
      gap: 0.35rem;
      align-items: start;
    }
  }
---

<div class="news-page">
  <header class="page-hero">
    <h1>{{ page.title }}</h1>
    <p>{{ page.description }}</p>
  </header>

  <div class="news-tools">
    <input id="news-search" class="news-search-input" type="search" placeholder="Search news" aria-label="Search news">
    <p id="news-search-empty" class="news-search-empty">No matching news.</p>
  </div>

  {% include news.liquid %}
</div>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("news-search");
    const emptyState = document.getElementById("news-search-empty");
    const entries = Array.from(document.querySelectorAll(".news-page .news tbody tr"));
    if (!searchInput || entries.length === 0) return;

    searchInput.addEventListener("input", function () {
      const query = searchInput.value.trim().toLowerCase();
      let visibleCount = 0;

      entries.forEach((entry) => {
        const matches = entry.textContent.toLowerCase().includes(query);
        entry.classList.toggle("news-search-hidden", !matches);
        if (matches) visibleCount += 1;
      });

      if (emptyState) emptyState.classList.toggle("is-visible", visibleCount === 0);
    });
  });
</script>
