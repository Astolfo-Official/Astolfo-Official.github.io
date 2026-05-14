---
layout: page
title: Research
permalink: /research/
description: My research is centered on understanding light-matter interactions through the development of innovative theoretical and computational tools.
nav: true
nav_order: 2
_styles: |
  .post-header {
    display: none;
  }

  .research-page {
    margin-top: 0;
  }

  .research-section-heading {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .research-section-heading::before {
    content: "";
    width: 3.5rem;
    height: 1px;
    background: var(--global-theme-color);
    opacity: 0.55;
  }

  .research-section-heading h2 {
    margin: 0;
    font-size: clamp(1.2rem, 1rem + 1vw, 1.55rem);
    letter-spacing: 0.02em;
  }

  .research-stream {
    display: grid;
    gap: 3rem;
  }

  .research-entry {
    padding-bottom: 3rem;
    border-bottom: 1px solid var(--global-divider-color);
  }

  .research-entry:last-child {
    padding-bottom: 0;
    border-bottom: 0;
  }

  .research-entry__inner {
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
    gap: 2rem;
    align-items: center;
  }

  .research-entry__inner--text-only {
    grid-template-columns: 1fr;
  }

  .research-entry__media {
    position: relative;
    display: block;
    overflow: hidden;
    border: 1px solid var(--global-divider-color);
    border-radius: 1.4rem;
    background:
      linear-gradient(145deg, rgba(252, 126, 175, 0.14), rgba(252, 126, 175, 0) 60%),
      var(--global-card-bg-color);
    box-shadow: 0 22px 50px rgba(15, 23, 42, 0.08);
  }

  .research-entry__media:hover {
    transform: translateY(-2px);
    box-shadow: 0 28px 54px rgba(15, 23, 42, 0.12);
  }

  .research-entry__media,
  .research-entry__title a,
  .research-entry__link {
    transition:
      color 0.2s ease,
      border-color 0.2s ease,
      background-color 0.2s ease,
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .research-entry__media figure,
  .research-entry__media picture {
    display: block;
    height: 100%;
    margin: 0;
  }

  .research-entry__image {
    display: block;
    width: 100%;
    height: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
  }

  .research-entry__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
    margin-bottom: 0.9rem;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--global-theme-color);
  }

  .research-entry__eyebrow::before {
    content: "";
    width: 2.2rem;
    height: 1px;
    background: currentColor;
    opacity: 0.55;
  }

  .research-entry__title {
    margin-bottom: 0.85rem;
    font-size: clamp(1.5rem, 1.2rem + 1vw, 2rem);
    line-height: 1.15;
  }

  .research-entry__title a {
    color: inherit;
    text-decoration: none;
  }

  .research-entry__title a:hover {
    color: var(--global-theme-color);
  }

  .research-entry__description {
    margin-bottom: 1rem;
    font-size: 1.04rem;
    line-height: 1.75;
  }

  .research-entry__summary {
    margin-bottom: 1.35rem;
    color: var(--global-text-color-light);
    line-height: 1.8;
  }

  .research-entry__link {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.72rem 1.05rem;
    border: 1px solid var(--global-divider-color);
    border-radius: 999px;
    color: var(--global-text-color);
    text-decoration: none;
    font-weight: 600;
  }

  .research-entry__link:hover {
    color: var(--global-hover-text-color);
    border-color: var(--global-theme-color);
    background: var(--global-theme-color);
  }

  @media (max-width: 767.98px) {
    .research-page {
      margin-top: 0.5rem;
    }

    .research-entry__inner {
      grid-template-columns: 1fr;
      gap: 1.35rem;
    }

    .research-entry {
      padding-bottom: 2.4rem;
    }

    .research-section-heading {
      margin-bottom: 1.5rem;
    }
  }
---

{% assign sorted_projects = site.projects | sort: "importance" %}

<div class="research-page">
  <header class="page-hero">
    <p class="page-hero-eyebrow">Research Directions</p>
    <h1>{{ page.title }}</h1>
    <p>{{ page.description }}</p>
  </header>

  <div class="research-section-heading">
    <h2>Main Research Interests</h2>
  </div>

  {% if sorted_projects.size > 0 %}
    <div class="research-stream">
      {% for project in sorted_projects %}
        {% if project.redirect %}
          {% assign project_url = project.redirect %}
        {% else %}
          {% assign project_url = project.url | relative_url %}
        {% endif %}
        {% assign project_summary = project.content | replace: '</p>', ' ' | replace: '<br>', ' ' | replace: '<br/>', ' ' | replace: '<br />', ' ' | strip_html | strip_newlines | replace: '  ', ' ' | replace: '  ', ' ' | truncatewords: 52 %}
        <section class="research-entry">
          <div class="research-entry__inner{% unless project.img %} research-entry__inner--text-only{% endunless %}">
            {% if project.img %}
              <a class="research-entry__media" href="{{ project_url }}">
                {%
                  include figure.liquid
                  loading="eager"
                  path=project.img
                  sizes="(min-width: 768px) 40rem, 100vw"
                  alt=project.title
                  class="research-entry__image"
                %}
              </a>
            {% endif %}
            <div class="research-entry__copy">
              <p class="research-entry__eyebrow">Research Direction {{ forloop.index }}</p>
              <h3 class="research-entry__title">
                <a href="{{ project_url }}">{{ project.title }}</a>
              </h3>
              <p class="research-entry__description">{{ project.description }}</p>
              <p class="research-entry__summary">{{ project_summary }}</p>
              <a class="research-entry__link" href="{{ project_url }}">Read more</a>
            </div>
          </div>
        </section>
      {% endfor %}
    </div>
  {% else %}
    <p>No research projects are available yet.</p>
  {% endif %}
</div>
