---
layout: page
title: Software
permalink: /software/
description: >
  I build or contribute to open-source infrastructure for computational light-matter science and autonomous simulation workflows.
nav: true
nav_order: 3.5
_styles: |
  .post-header {
    display: none;
  }

  .software-page {
    --software-accent: #2f6f73;
    --software-accent-soft: rgba(47, 111, 115, 0.09);
    --software-card-shadow: 0 10px 28px rgba(17, 46, 54, 0.1);
    --software-card-shadow-hover: 0 16px 38px rgba(17, 46, 54, 0.16);
    margin-top: 0;
  }

  .software-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  .software-card {
    display: flex;
    min-width: 0;
    height: 100%;
    padding: 0.9rem;
    border: 1px solid color-mix(in srgb, var(--software-accent) 22%, var(--global-divider-color));
    border-left: 3px solid color-mix(in srgb, var(--software-accent) 72%, transparent);
    border-radius: 8px;
    background:
      linear-gradient(145deg, var(--software-accent-soft), rgba(252, 126, 175, 0.045) 54%, transparent 84%),
      var(--global-card-bg-color);
    box-shadow: var(--software-card-shadow);
    transition:
      border-color 160ms ease,
      box-shadow 160ms ease,
      transform 160ms ease;
  }

  .software-card:hover {
    border-color: color-mix(in srgb, var(--software-accent) 42%, var(--global-divider-color));
    border-left-color: color-mix(in srgb, var(--software-accent) 72%, transparent);
    box-shadow: var(--software-card-shadow-hover);
    transform: translateY(-2px);
  }

  .software-card__inner {
    display: flex;
    width: 100%;
    min-width: 0;
    height: 100%;
    flex-direction: column;
    gap: 1rem;
  }

  .software-card__media {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    aspect-ratio: 632 / 461;
    flex: 0 0 auto;
    overflow: hidden;
    border: 1px solid var(--global-divider-color);
    border-radius: 6px;
    background: #fff;
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

  .software-card__copy {
    min-width: 0;
    flex: 1 1 auto;
  }

  .software-card__monogram {
    color: var(--global-theme-color);
    font-family: var(--global-font-family);
    font-size: clamp(2.6rem, 7vw, 4.2rem);
    font-weight: 800;
    letter-spacing: -0.08em;
  }

  .software-card__title {
    margin: 0 0 0.6rem;
    color: var(--global-text-color);
    font-size: clamp(1.1rem, 1.7vw, 1.3rem);
    font-weight: 700;
    line-height: 1.28;
    text-align: center;
  }

  .software-card__title a {
    color: inherit;
    text-decoration: none;
  }

  .software-card__title a:hover {
    color: var(--global-theme-color);
  }

  .software-card__description {
    margin-bottom: 0;
    color: var(--global-text-color-light);
    font-size: 0.88rem;
    line-height: 1.62;
  }

  html[data-theme="dark"] .software-page {
    --software-accent: #74c7c0;
    --software-accent-soft: rgba(116, 199, 192, 0.13);
    --software-card-shadow: 0 12px 30px rgba(0, 0, 0, 0.26);
    --software-card-shadow-hover: 0 18px 42px rgba(0, 0, 0, 0.36);
  }

  @media (max-width: 960px) {
    .software-list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 640px) {
    .software-list {
      grid-template-columns: 1fr;
    }

    .software-card {
      padding: 1rem;
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
          {% assign software_image = "assets/img/software_figures/maxwelllink.png" %}
          {% assign software_image_class = "software-card__image" %}
          {% assign software_website = "https://maxwelllink.org/" %}
          {% assign software_description = "A general-purpose framework for self-consistent light–matter simulations that connects multiple electromagnetic solvers with molecular dynamics and electronic-structure engines through a flexible socket interface." %}
        {% when "FermiLink" %}
          {% assign software_name = "FermiLink" %}
          {% assign software_image = "assets/img/software_figures/fermilink.png" %}
          {% assign software_image_class = "software-card__image" %}
          {% assign software_website = "https://fermilink.org/" %}
          {% assign software_description = "A unified agent framework for multidomain autonomous scientific simulations, designed to plan, execute, and refine computational workflows across different simulation backends and code optimization." %}
        {% when "I-Pi" %}
          {% assign software_name = "i-PI" %}
          {% assign software_image = "assets/img/software_figures/ipi-logo.png" %}
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
                sizes="(min-width: 961px) 24rem, (min-width: 641px) 50vw, 100vw"
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
