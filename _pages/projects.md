---
layout: page
title: Research
permalink: /research/
description:
nav: true
nav_order: 1
_styles: |
  .post-header {
    display: none;
  }

  .research-page {
    margin-top: 0;
  }

  .research-stream {
    display: grid;
    gap: 1rem;
  }

  .research-entry {
    padding: clamp(1rem, 2.5vw, 1.25rem);
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

  .research-entry:hover {
    border-color: color-mix(in srgb, var(--global-theme-color) 38%, var(--global-divider-color));
    box-shadow: 0 20px 42px rgba(15, 23, 42, 0.09);
    transform: translateY(-2px);
  }

  .research-entry__inner {
    display: grid;
    grid-template-columns: minmax(11rem, 15rem) minmax(0, 1fr);
    gap: 1.25rem;
    align-items: center;
  }

  .research-entry__inner--text-only {
    grid-template-columns: 1fr;
  }

  .research-entry__media {
    position: relative;
    display: block;
    justify-self: center;
    width: min(100%, 14.5rem);
    height: clamp(10.75rem, 17vw, 12rem);
    overflow: hidden;
    border: 1px solid var(--global-divider-color);
    border-radius: 8px;
    background: var(--global-bg-color);
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
    object-fit: cover;
    object-position: center;
  }

  .research-entry__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
    margin-bottom: 0.9rem;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.08em;
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
    color: var(--global-text-color);
    font-size: clamp(1.35rem, 2.4vw, 1.75rem);
    font-weight: 700;
    line-height: 1.14;
    letter-spacing: 0;
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
    font-size: 1rem;
    line-height: 1.75;
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

    .research-entry__media {
      width: min(100%, 18rem);
      height: 15rem;
    }

    .research-entry {
      padding: 1rem;
    }
  }
---

{% assign sorted_projects = site.projects | sort: "importance" %}

<div class="research-page">
  <header class="page-hero">
    <h1>{{ page.title }}</h1>
    <p>{{ page.description }}</p>
  </header>

  {% if sorted_projects.size > 0 %}
    <div class="research-stream">
      {% for project in sorted_projects %}
        {% if project.redirect %}
          {% assign project_url = project.redirect %}
        {% else %}
          {% assign project_url = project.url | relative_url %}
        {% endif %}
        {% assign project_anchor = project.title | slugify %}
        <section id="{{ project_anchor }}" class="research-entry">
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
              <h3 class="research-entry__title">
                <a href="{{ project_url }}">{{ project.title }}</a>
              </h3>
              <p class="research-entry__description">{{ project.description }}</p>
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
