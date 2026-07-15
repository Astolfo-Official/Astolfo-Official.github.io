---
layout: page
title: Software
permalink: /software/
description: >
  We build software infrastructure for computational light-matter science and beyond.
nav: true
nav_order: 3.5
_styles: |
  .post-header {
    display: none;
  }

  .software-page {
    margin-top: 0;
  }

  .software-list {
    display: grid;
    gap: 1rem;
  }

  .software-card {
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

  .software-card:hover {
    border-color: color-mix(in srgb, var(--global-theme-color) 38%, var(--global-divider-color));
    box-shadow: 0 20px 42px rgba(15, 23, 42, 0.09);
    transform: translateY(-2px);
  }

  .software-card__inner {
    display: grid;
    grid-template-columns: minmax(11rem, 15rem) minmax(0, 1fr);
    gap: 1.25rem;
    align-items: center;
  }

  .software-card__media {
    display: flex;
    align-items: center;
    justify-content: center;
    width: min(100%, 14.5rem);
    height: clamp(10.75rem, 17vw, 12rem);
    justify-self: center;
    overflow: hidden;
    border: 1px solid var(--global-divider-color);
    border-radius: 8px;
    background: var(--global-bg-color);
  }

  .software-card__media figure,
  .software-card__media picture {
    display: block;
    width: 100%;
    height: 100%;
    margin: 0;
  }

  .software-card__image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .software-card__monogram {
    color: var(--global-theme-color);
    font-family: var(--global-font-family);
    font-size: clamp(2.6rem, 7vw, 4.2rem);
    font-weight: 800;
    letter-spacing: -0.08em;
  }

  .software-card__title {
    margin-bottom: 0.7rem;
    color: var(--global-text-color);
    font-size: clamp(1.35rem, 2.4vw, 1.75rem);
    font-weight: 700;
    line-height: 1.14;
  }

  .software-card__title a {
    color: inherit;
    text-decoration: none;
  }

  .software-card__title a:hover {
    color: var(--global-theme-color);
  }

  .software-card__description {
    margin-bottom: 1rem;
    color: var(--global-text-color-light);
    font-size: 1rem;
    line-height: 1.75;
  }

  @media (max-width: 767.98px) {
    .software-card {
      padding: 1rem;
    }

    .software-card__inner {
      grid-template-columns: 1fr;
      gap: 1.35rem;
    }

    .software-card__media {
      width: min(100%, 18rem);
      height: 15rem;
    }
  }
---

{% assign software_entries = site.data.cv.cv.sections.Software %}

<div class="software-page">
  <header class="page-hero">
    <h1>{{ page.title }}</h1>
    <p>{{ page.description }}</p>
  </header>

  <div class="software-list">
    {% for software in software_entries %}
      {% case software.label %}
        {% when "MaxwellLink" %}
          {% assign software_name = "MaxwellLink" %}
          {% assign software_image = "assets/img/publication_preview/jiMaxwellLinkUnifiedFramework2026.png" %}
          {% assign software_image_class = "software-card__image" %}
          {% assign software_website = "https://maxwelllink.org/" %}
          {% assign software_description = "A general-purpose framework for self-consistent light–matter simulations that connects multiple electromagnetic solvers with molecular dynamics and electronic-structure engines through a flexible socket interface." %}
        {% when "FermiLink" %}
          {% assign software_name = "FermiLink" %}
          {% assign software_image = "assets/img/publication_preview/mengFermiLinkUnifiedAgent2026.png" %}
          {% assign software_image_class = "software-card__image" %}
          {% assign software_website = "https://fermilink.org/" %}
          {% assign software_description = "A unified agent framework for multidomain autonomous scientific simulations, designed to plan, execute, and refine computational workflows across different simulation backends and code optimization." %}
        {% when "I-Pi" %}
          {% assign software_name = "i-PI" %}
          {% assign software_image = "assets/img/ipi-logo.png" %}
          {% assign software_image_class = "software-card__image" %}
          {% assign software_website = "https://docs.ipi-code.org/" %}
          {% assign software_description = "An open-source Python interface for advanced molecular simulations. I contribute to its ecosystem for multidomain molecular dynamics and light–matter simulation workflows." %}
      {% endcase %}

      <article class="software-card">
        <div class="software-card__inner">
          <a class="software-card__media" href="{{ software_website }}" target="_blank" rel="noopener noreferrer" aria-label="Open the {{ software_name }} website">
            {% if software_image %}
              {%
                include figure.liquid
                loading="eager"
                path=software_image
                sizes="(min-width: 768px) 15rem, 18rem"
                alt=software_name
                class=software_image_class
              %}
            {% else %}
              <span class="software-card__monogram" aria-hidden="true">i-PI</span>
            {% endif %}
          </a>

          <div class="software-card__copy">
            <h2 class="software-card__title">
              <a href="{{ software_website }}" target="_blank" rel="noopener noreferrer">{{ software_name }}</a>
            </h2>
            <p class="software-card__description">{{ software_description }}</p>
          </div>
        </div>
      </article>
    {% endfor %}
  </div>
</div>
