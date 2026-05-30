---
layout: about
title: Home
permalink: /
subtitle:
custom_home: true

profile: false

selected_papers: false
social: false

announcements:
  enabled: true
  scrollable: true
  limit: 3

latest_posts:
  enabled: true
  scrollable: true
  limit: 3

_styles: |
  .post-header {
    display: none;
  }

  .home-page {
    --home-accent: var(--global-theme-color);
    --home-accent-soft: rgba(252, 126, 175, 0.12);
    margin-top: 0.25rem;
  }

  .home-hero {
    position: relative;
    min-height: min(72vh, 42rem);
    display: flex;
    align-items: center;
    margin: 0 0 2.2rem;
    padding: clamp(2rem, 6vw, 4.5rem);
    overflow: hidden;
    border: 1px solid var(--global-divider-color);
    border-radius: 8px;
    background:
      linear-gradient(90deg, rgba(17, 25, 29, 0.84), rgba(17, 25, 29, 0.55) 42%, rgba(17, 25, 29, 0.12) 78%),
      url("/assets/img/prof_pic.jpg") right center / min(46rem, 72vw) auto no-repeat,
      linear-gradient(135deg, rgba(47, 111, 115, 0.28), rgba(252, 126, 175, 0.18)),
      var(--global-card-bg-color);
    box-shadow: 0 24px 70px rgba(15, 23, 42, 0.14);
    isolation: isolate;
  }

  .home-hero::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.07) 1px, transparent 1px);
    background-size: 44px 44px;
    mask-image: linear-gradient(90deg, black, transparent 78%);
  }

  .home-hero__content {
    width: min(100%, 46rem);
    color: #fff;
  }

  .home-kicker {
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
    margin: 0 0 1rem;
    color: rgba(255, 255, 255, 0.86);
    font-size: 0.82rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .home-kicker::before {
    content: "";
    width: 2.4rem;
    height: 1px;
    background: currentColor;
    opacity: 0.7;
  }

  .home-title {
    margin: 0;
    color: #fff;
    font-size: clamp(3rem, 8vw, 5.5rem);
    line-height: 0.98;
    letter-spacing: 0;
  }

  .home-subtitle {
    max-width: 33rem;
    margin: 1.15rem 0 0;
    color: rgba(255, 255, 255, 0.88);
    font-size: clamp(1rem, 1.6vw, 1.18rem);
    line-height: 1.66;
  }

  .home-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1.55rem;
  }

  .home-actions a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-height: 2.75rem;
    padding: 0.72rem 1.05rem;
    border: 1px solid rgba(255, 255, 255, 0.26);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.14);
    color: #fff !important;
    font-size: 0.92rem;
    font-weight: 700;
    text-decoration: none !important;
    backdrop-filter: blur(10px);
    transition:
      transform 180ms ease,
      background 180ms ease,
      box-shadow 180ms ease;
  }

  .home-actions a:first-child {
    border-color: color-mix(in srgb, var(--home-accent), white 26%);
    background: var(--home-accent);
    box-shadow: 0 16px 34px rgba(252, 126, 175, 0.28);
  }

  .home-actions a:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 38px rgba(0, 0, 0, 0.2);
  }

  .home-signal-strip {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    margin-top: 1.35rem;
  }

  .home-signal-strip span {
    display: inline-flex;
    min-height: 1.75rem;
    align-items: center;
    padding: 0.32rem 0.55rem;
    border: 1px solid rgba(255, 255, 255, 0.24);
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.88);
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
    font-size: 0.76rem;
    font-weight: 700;
  }

  .home-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 1rem;
    margin: 1.25rem 0 2.2rem;
  }

  .home-join {
    border: 1px solid var(--global-divider-color);
    border-radius: 8px;
    background:
      linear-gradient(135deg, var(--home-accent-soft), transparent 46%),
      var(--global-card-bg-color);
    box-shadow: 0 14px 34px rgba(15, 23, 42, 0.06);
  }

  .home-join h2,
  .home-stream-card h2 {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin: 0 0 0.75rem;
    color: var(--global-text-color);
    font-size: clamp(1.2rem, 1.55vw, 1.55rem);
    font-weight: 750;
    line-height: 1.2;
  }

  .home-join h2::before,
  .home-stream-card h2::before {
    content: "";
    width: 0.58rem;
    height: 0.58rem;
    border-radius: 999px;
    background: var(--global-theme-color);
    box-shadow: 0 0 0 0.22rem var(--home-accent-soft);
  }

  .home-join h2::after,
  .home-stream-card h2::after {
    content: "";
    width: 2.8rem;
    height: 2px;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--global-theme-color), transparent);
  }

  .home-join p {
    margin: 0;
    color: var(--global-text-color-light);
    font-size: 0.98rem;
    font-weight: 500;
    line-height: 1.55;
    white-space: nowrap;
  }

  .home-join {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(12rem, max-content);
    gap: 1rem 1.5rem;
    align-items: center;
    padding: clamp(1rem, 2.4vw, 1.35rem);
  }

  .home-join-copy {
    min-width: 0;
  }

  .home-join-actions {
    display: flex;
    justify-content: center;
    justify-self: end;
  }

  .home-join-actions a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-width: 11.5rem;
    min-height: 2.8rem;
    padding: 0.7rem 1rem;
    border: 1px solid color-mix(in srgb, var(--global-theme-color) 48%, var(--global-divider-color));
    border-radius: 8px;
    background: color-mix(in srgb, var(--global-theme-color) 8%, var(--global-card-bg-color));
    color: var(--global-theme-color) !important;
    font-weight: 700;
    text-decoration: none;
    white-space: nowrap;
    transition:
      transform 180ms ease,
      border-color 180ms ease,
      background 180ms ease;
  }

  .home-join-actions a:hover {
    border-color: var(--global-theme-color);
    background: color-mix(in srgb, var(--global-theme-color) 14%, var(--global-card-bg-color));
    color: var(--global-theme-color) !important;
    transform: translateY(-1px);
  }

  .home-feed-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    margin-top: 2.2rem;
  }

  .home-feed-card {
    padding: clamp(1rem, 2.4vw, 1.35rem);
    border: 1px solid var(--global-divider-color);
    border-radius: 8px;
    background: var(--global-card-bg-color);
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.05);
  }

  .home-feed-card h2 {
    margin-top: 0;
  }

  .home-stream-card {
    background:
      linear-gradient(135deg, rgba(252, 126, 175, 0.08), transparent 52%),
      var(--global-card-bg-color);
    box-shadow: 0 14px 34px rgba(15, 23, 42, 0.05);
  }

  .home-stream-card h2 a {
    color: inherit !important;
    text-decoration: none;
  }

  .home-stream-card h2 a:hover {
    color: var(--global-theme-color) !important;
  }

  .home-stream-card .news .table-responsive {
    overflow: visible;
  }

  .home-feed-card .news table {
    margin-bottom: 0;
  }

  .home-feed-card .news th,
  .home-feed-card .news td {
    padding: 0.48rem 0;
    border-top: 0;
    color: var(--global-text-color-light);
    font-size: 0.9rem;
  }

  .home-feed-card .news th {
    width: 7rem !important;
    padding-right: 0.9rem;
    color: var(--global-text-color);
    font-weight: 700;
    white-space: nowrap;
  }

  .home-feed-card .news-title {
    color: var(--global-text-color);
    font-weight: 650;
    text-decoration: none;
  }

  .home-feed-card .news-title:hover {
    color: var(--global-theme-color);
  }

  .home-stream-card .news table {
    display: block;
  }

  .home-stream-card .news tbody {
    display: grid;
    gap: 0.48rem;
  }

  .home-stream-card .news tr {
    display: grid;
    grid-template-columns: 8.35rem minmax(0, 1fr);
    gap: 0.55rem;
    align-items: center;
    min-height: 2.86rem;
    padding: 0.48rem 0.85rem;
    border: 1px solid var(--global-divider-color);
    border-radius: 8px;
    background: var(--global-bg-color);
    transition:
      border-color 0.2s ease,
      transform 0.2s ease;
  }

  .home-stream-card .news tr:hover {
    border-color: color-mix(in srgb, var(--global-theme-color) 34%, var(--global-divider-color));
    transform: translateY(-1px);
  }

  .home-stream-card .news th,
  .home-stream-card .news td {
    display: flex;
    align-items: center;
    padding: 0;
    border: 0;
    color: var(--global-text-color);
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .home-stream-card .news th {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    width: 8.35rem !important;
    color: var(--global-theme-color);
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .home-news-card .news th {
    width: 10.2rem !important;
    color: #fc7eaf;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0;
    text-transform: none;
  }

  .home-posts-card .news th {
    width: 10.2rem !important;
    color: #fc7eaf;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0;
    text-transform: none;
  }

  .home-posts-card .news-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .home-stream-card .news-number {
    display: inline-flex;
    min-width: 1.9rem;
    min-height: 1.9rem;
    align-items: center;
    justify-content: center;
    border: 1px solid color-mix(in srgb, #fc7eaf 32%, var(--global-divider-color));
    border-radius: 999px;
    color: #fc7eaf;
    font-weight: 800;
    letter-spacing: 0;
  }

  .home-stream-card .news-date {
    display: inline-block;
    color: #fc7eaf;
  }

  .home-stream-card .news-title {
    display: block;
    color: var(--global-text-color);
    font-weight: 700;
    line-height: 1.42;
    text-decoration: none;
    white-space: normal;
  }

  .home-stream-card .news-title:hover {
    color: var(--global-theme-color);
  }

  @media (max-width: 900px) {
    .home-hero {
      min-height: 34rem;
      background:
        linear-gradient(90deg, rgba(17, 25, 29, 0.9), rgba(17, 25, 29, 0.62)),
        url("/assets/img/prof_pic.jpg") right center / auto 100% no-repeat,
        var(--global-card-bg-color);
    }

    .home-grid,
    .home-feed-grid {
      grid-template-columns: 1fr;
    }

    .home-join {
      grid-template-columns: 1fr;
    }

    .home-join-actions {
      justify-self: start;
      width: 100%;
    }

    .home-join-actions a {
      width: min(100%, 16rem);
    }

    .home-join p {
      white-space: normal;
    }

    .home-stream-card .news tr {
      grid-template-columns: 1fr;
      gap: 0.35rem;
      align-items: start;
    }
  }

  @media (max-width: 560px) {
    .home-hero,
    .home-join,
    .home-feed-card {
      width: min(100%, calc(100vw - 1.5rem));
      max-width: calc(100vw - 1.5rem);
    }

    .home-hero {
      min-height: 32rem;
      padding: 1.25rem;
      background:
        linear-gradient(180deg, rgba(17, 25, 29, 0.92), rgba(17, 25, 29, 0.64)),
        url("/assets/img/prof_pic.jpg") center bottom / auto 72% no-repeat,
        var(--global-card-bg-color);
    }

    .home-subtitle {
      max-width: 100%;
    }

    .home-actions {
      display: grid;
      grid-template-columns: 1fr;
      width: min(100%, 16rem);
    }
  }
---

<div class="home-page">
  <section class="home-hero" aria-label="Xinwei Ji home">
    <div class="home-hero__content">
      <p class="home-kicker">Chemical Physics · Light-Matter Interaction</p>
      <h1 class="home-title">Xinwei Ji</h1>
      <p class="home-subtitle">
        Ph.D. student in Physics and Astronomy at the University of Delaware, working on theoretical and computational tools for molecular light-matter dynamics.
      </p>
      <div class="home-actions">
        <a href="{{ '/research/' | relative_url }}"><i class="fa-solid fa-wave-square" aria-hidden="true"></i> Research</a>
        <a href="{{ '/publications/' | relative_url }}"><i class="fa-solid fa-book-open" aria-hidden="true"></i> Publications</a>
        <a href="{{ '/cv/' | relative_url }}"><i class="fa-solid fa-file-lines" aria-hidden="true"></i> CV</a>
      </div>
      <div class="home-signal-strip" aria-label="Research signals">
        <span>polaritonics.md</span>
        <span>MD_simulations.yml</span>
        <span>scientific_agents.ai</span>
      </div>
    </div>
  </section>

  <div class="home-grid">
    <aside class="home-join">
      <div class="home-join-copy">
        <h2>Join TEL Research Group</h2>
        <p>
          For collaborations and opportunities to join the TEL Group, please visit our Group website.
        </p>
      </div>
      <div class="home-join-actions">
        <a href="https://www.taoeli.org" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> Visit Group Website</a>
      </div>
    </aside>
  </div>

  <div class="home-feed-grid">
    {% if page.announcements and page.announcements.enabled %}
      <section class="home-feed-card home-stream-card home-news-card">
        <h2><a href="{{ '/news/' | relative_url }}" style="color: inherit">News</a></h2>
        {% include news.liquid limit=true %}
      </section>
    {% endif %}

    {% if page.latest_posts and page.latest_posts.enabled %}
      <section class="home-feed-card home-stream-card home-posts-card">
        <h2><a href="{{ '/blog/' | relative_url }}" style="color: inherit">Latest Posts</a></h2>
        {% include latest_posts.liquid %}
      </section>
    {% endif %}
  </div>
</div>
