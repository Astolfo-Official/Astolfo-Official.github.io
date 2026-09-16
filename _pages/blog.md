---
layout: default
permalink: /blog/
title: Blog
nav: true
nav_order: 5
---

<div class="post blog-index">
  {% assign blog_name = site.blog_name | default: 'Blog' %}
  {% assign blog_description = site.blog_description | default: 'Notes, derivations, and technical fragments from my research notebook.' %}
  {% assign postlist = site.posts %}
  {% assign blog_posts_size = postlist | size %}
  {% assign math_posts_size = 0 %}
  {% assign physics_posts_size = 0 %}
  {% assign computation_posts_size = 0 %}
  {% for post in postlist %}
    {% if post.categories contains 'math' %}
      {% assign math_posts_size = math_posts_size | plus: 1 %}
    {% endif %}
    {% if post.categories contains 'physics' %}
      {% assign physics_posts_size = physics_posts_size | plus: 1 %}
    {% endif %}
    {% if post.categories contains 'computation' %}
      {% assign computation_posts_size = computation_posts_size | plus: 1 %}
    {% endif %}
  {% endfor %}

  <header class="blog-index-hero">
    <h1>{{ blog_name }}</h1>
    {% if blog_description == 'Also see the structured notes in my bookshelf' %}
      <p>Also see the structured notes in my <a href="{{ '/notes/' | relative_url }}">bookshelf</a>.</p>
    {% else %}
      <p>{{ blog_description }}</p>
    {% endif %}
  </header>

  <div class="blog-workbench">
    <section class="blog-list-panel" aria-label="Blog posts">
      <div class="blog-stream">
        {% for post in postlist %}
          {% assign post_number = blog_posts_size | minus: forloop.index0 %}
          {% if post.external_source == blank %}
            {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
          {% else %}
            {% assign read_time = post.feed_content | strip_html | number_of_words | divided_by: 180 | plus: 1 %}
          {% endif %}
          {% assign year = post.date | date: '%Y' %}
          {% assign tags = post.tags | join: '' %}
          {% assign categories = post.categories | join: '' %}

          {% if post.redirect == blank %}
            {% assign post_url = post.url | relative_url %}
            {% assign post_target = '' %}
          {% elsif post.redirect contains '://' %}
            {% assign post_url = post.redirect %}
            {% assign post_target = ' target="_blank" rel="noopener noreferrer"' %}
          {% else %}
            {% assign post_url = post.redirect | relative_url %}
            {% assign post_target = '' %}
          {% endif %}

          <article
            class="blog-card{% if post.thumbnail %} blog-card--with-image{% endif %}"
            data-categories="{{ post.categories | join: '|' | downcase | escape }}"
          >
            <div class="blog-card-copy">
              <div class="blog-card-meta">
                <span class="blog-card-number">#{{ post_number }}</span>
                <span>{{ post.date | date: '%b %-d, %Y' }}</span>
                <span>{{ read_time }} min read</span>
                {% if post.external_source %}
                  <span>{{ post.external_source }}</span>
                {% endif %}
              </div>
              <h2 class="blog-card-title">
                <a href="{{ post_url }}"{{ post_target }}>{{ post.title }}</a>
              </h2>
              {% if post.description %}
                <p class="blog-card-description">{{ post.description }}</p>
              {% endif %}
              <div class="blog-card-tags">
                <a href="{{ year | prepend: '/blog/' | relative_url }}"><i class="fa-solid fa-calendar fa-sm"></i>{{ year }}</a>
                {% if tags != '' %}
                  {% for tag in post.tags %}
                    <a href="{{ tag | slugify | prepend: '/blog/tag/' | relative_url }}"><i class="fa-solid fa-hashtag fa-sm"></i>{{ tag }}</a>
                  {% endfor %}
                {% endif %}
                {% if categories != '' %}
                  {% for category in post.categories %}
                    <a href="{{ category | slugify | prepend: '/blog/category/' | relative_url }}"
                      ><i class="fa-solid fa-tag fa-sm"></i>{{ category }}</a
                    >
                  {% endfor %}
                {% endif %}
              </div>
            </div>
            {% if post.thumbnail %}
              <a class="blog-card-media" href="{{ post_url }}"{{ post_target }}>
                <img src="{{ post.thumbnail | relative_url }}" alt="{{ post.title }}">
              </a>
            {% endif %}
          </article>
        {% endfor %}
      </div>
      <p class="blog-empty-state" role="status">No posts match your search and topic.</p>
    </section>

    <aside class="blog-insights" aria-labelledby="blog-insights-title">
      <header class="blog-insights__header">
        <p class="blog-insights__kicker">Writing archive</p>
        <h2 id="blog-insights-title">Blog snapshot</h2>
      </header>

      <div class="blog-insights__search">
        <label class="sr-only" for="blog-search">Search blog posts</label>
        <input id="blog-search" class="blog-search" type="search" placeholder="Search blog posts..." autocomplete="off">
      </div>

      <div class="blog-insights__filters">
        <p class="blog-insights__filter-label">Topic</p>
        <ul class="blog-category-filters" aria-label="Blog topic filters">
          <li><button class="blog-category-filter is-active" type="button" data-category="all" aria-pressed="true">All</button></li>
          <li><button class="blog-category-filter" type="button" data-category="math" aria-pressed="false">Math</button></li>
          <li><button class="blog-category-filter" type="button" data-category="physics" aria-pressed="false">Physics</button></li>
          <li><button class="blog-category-filter" type="button" data-category="computation" aria-pressed="false">Computation</button></li>
        </ul>
      </div>

      <dl class="blog-stats">
        <div class="blog-stat">
          <dt>All posts</dt>
          <dd>{{ blog_posts_size }}</dd>
        </div>
        <div class="blog-stat">
          <dt>Math</dt>
          <dd>{{ math_posts_size }}</dd>
        </div>
        <div class="blog-stat">
          <dt>Physics</dt>
          <dd>{{ physics_posts_size }}</dd>
        </div>
        <div class="blog-stat">
          <dt>Computation</dt>
          <dd>{{ computation_posts_size }}</dd>
        </div>
      </dl>

      <section class="blog-insights__topic-section" aria-labelledby="blog-topics-title">
        <div class="blog-insights__section-heading">
          <h3 id="blog-topics-title">Blogs by topic</h3>
          <span>{{ blog_posts_size }} total</span>
        </div>
        <svg id="blog-topic-chart" class="blog-topic-chart" viewBox="0 0 320 280" role="group" aria-label="Blog posts by topic"></svg>
      </section>
    </aside>

  </div>
</div>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("blog-search");
    const filters = Array.from(document.querySelectorAll(".blog-category-filter"));
    const posts = Array.from(document.querySelectorAll(".blog-stream .blog-card"));
    const emptyState = document.querySelector(".blog-empty-state");
    if (!searchInput || filters.length === 0) return;

    let activeCategory = "all";

    const topics = [
      { key: "math", label: "Math" },
      { key: "physics", label: "Physics" },
      { key: "computation", label: "Computation" },
    ];
    const categoriesOf = (post) => (post.dataset.categories || "").split("|");
    const chart = document.getElementById("blog-topic-chart");
    const chartItems = [];
    let hoveredTopics = null;
    let focusedTopics = null;

    const updateHighlight = () => {
      const selected = hoveredTopics || focusedTopics || [];
      const hasSelection = selected.length > 0;
      chartItems.forEach((item) => {
        const matches = selected.includes(item.dataset.topic);
        item.classList.toggle("is-topic-active", hasSelection && matches);
        item.classList.toggle("is-topic-muted", hasSelection && !matches);
      });
      posts.forEach((post) => {
        const matches = categoriesOf(post).some((category) => selected.includes(category));
        post.classList.toggle("is-topic-active", hasSelection && matches);
        post.classList.toggle("is-topic-muted", hasSelection && !matches);
      });
    };

    const bindHighlight = (element, keys) => {
      element.addEventListener("pointerenter", () => {
        hoveredTopics = keys;
        updateHighlight();
      });
      element.addEventListener("pointerleave", () => {
        hoveredTopics = null;
        updateHighlight();
      });
      element.addEventListener("focusin", () => {
        focusedTopics = keys;
        updateHighlight();
      });
      element.addEventListener("focusout", (event) => {
        if (element.contains(event.relatedTarget)) return;
        focusedTopics = null;
        updateHighlight();
      });
    };

    const buildTopicChart = () => {
      const summaries = topics.map((topic) => ({
        ...topic,
        count: posts.filter((post) => categoriesOf(post).includes(topic.key)).length,
      }));
      // Posts in multiple topics contribute once to each topic's share.
      const total = summaries.reduce((sum, topic) => sum + topic.count, 0);
      const svgElement = (tag, attributes = {}) => {
        const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
        Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
        return element;
      };
      const defs = svgElement("defs");
      const sheen = svgElement("linearGradient", {
        id: "blog-topic-sheen", x1: "0%", y1: "0%", x2: "35%", y2: "100%",
      });
      sheen.append(svgElement("stop", { offset: "0%", "stop-color": "#fff", "stop-opacity": "0.32" }));
      sheen.append(svgElement("stop", { offset: "48%", "stop-color": "#fff", "stop-opacity": "0" }));
      sheen.append(svgElement("stop", { offset: "100%", "stop-color": "#56344c", "stop-opacity": "0.09" }));
      defs.append(sheen);
      chart.append(defs);
      // Draw every side below every top face so adjacent slices cannot overlap.
      const depthLayer = svgElement("g", { class: "blog-topic-depth-layer", "aria-hidden": "true" });
      chart.append(depthLayer);
      let angle = -Math.PI / 2;
      const labels = [];
      summaries.forEach((topic) => {
        if (topic.count === 0) return;
        const share = topic.count / total;
        const description = `${topic.label}: ${topic.count} posts (${Math.round(share * 100)}%)`;
        const selectTopic = () => filters.find((filter) => filter.dataset.category === topic.key)?.click();
        const end = angle + share * Math.PI * 2;
        const middle = share === 1 ? -Math.PI / 2 : (angle + end) / 2;
        const separation = share === 1 ? 0 : 2.5;
        const offset = `translate(${separation * Math.cos(middle)} ${separation * Math.sin(middle)})`;
        const point = (radians, radius) => [160 + radius * Math.cos(radians), 140 + radius * Math.sin(radians)];
        const group = svgElement("g", {
          class: "blog-topic-group",
          transform: offset,
          tabindex: "0",
          role: "button",
          "aria-label": description + ". Filter posts",
        });
        group.dataset.topic = topic.key;
        const title = svgElement("title");
        title.textContent = description;
        group.append(title);
        const path = share === 1
          ? "M 160 54 A 86 86 0 1 1 160 226 A 86 86 0 1 1 160 54 Z"
          : `M 160 140 L ${point(angle, 86).join(" ")} A 86 86 0 ${share > 0.5 ? 1 : 0} 1 ${point(end, 86).join(" ")} Z`;
        // Only the front-facing outer arc has a visible side wall. A full
        // translated slice would show its rear edge through a faded top face.
        const frontStart = Math.max(0, angle);
        const frontEnd = Math.min(Math.PI, end);
        if (frontEnd > frontStart) {
          const topStart = point(frontStart, 86);
          const topEnd = point(frontEnd, 86);
          const bottomStart = [topStart[0], topStart[1] + 8];
          const bottomEnd = [topEnd[0], topEnd[1] + 8];
          const wall = `M ${topStart.join(" ")} A 86 86 0 0 1 ${topEnd.join(" ")} L ${bottomEnd.join(" ")} A 86 86 0 0 0 ${bottomStart.join(" ")} Z`;
          const depth = svgElement("path", { d: wall, class: "blog-topic-depth", transform: offset });
          depth.dataset.topic = topic.key;
          chartItems.push(depth);
          depthLayer.append(depth);
        }
        group.append(svgElement("path", { d: path, class: "blog-topic-slice", fill: "var(--topic-color)" }));
        group.append(svgElement("path", { d: path, class: "blog-topic-sheen", fill: "url(#blog-topic-sheen)", "aria-hidden": "true" }));
        // Area centroid of a circular sector: wide slices place their number
        // closer to the center, while narrow slices move it toward the rim.
        const halfAngle = share * Math.PI;
        const numberRadius = (4 * 86 * Math.sin(halfAngle)) / (3 * (2 * halfAngle));
        const [numberX, numberY] = share === 1 ? [160, 140] : point(middle, numberRadius);
        const number = svgElement("text", { x: numberX, y: numberY, class: "blog-topic-count", "aria-hidden": "true" });
        number.textContent = topic.count;
        group.append(number);

        const [edgeX, edgeY] = point(middle, 90);
        const [outerX, outerY] = point(middle, 120);
        const labelX = Math.max(57, Math.min(277, outerX));
        labels.push({ group, topic, edgeX, edgeY, x: labelX, y: outerY, side: Math.cos(middle) < 0 ? -1 : 1 });
        group.addEventListener("click", selectTopic);
        group.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            selectTopic();
          }
        });
        bindHighlight(group, [topic.key]);
        chartItems.push(group);
        chart.append(group);
        angle = end;
      });
      // Keep neighboring labels apart even when one topic has very few posts.
      [-1, 1].forEach((side) => {
        const sideLabels = labels.filter((label) => label.side === side).sort((a, b) => a.y - b.y);
        sideLabels.forEach((label, index) => {
          if (index > 0) label.y = Math.max(label.y, sideLabels[index - 1].y + 25);
        });
        const overflow = Math.max(0, (sideLabels.at(-1)?.y || 0) - 258);
        sideLabels.forEach((label) => { label.y -= overflow; });
      });
      labels.forEach(({ group, topic, edgeX, edgeY, x, y }) => {
        group.append(svgElement("line", { x1: edgeX, y1: edgeY, x2: x, y2: y, class: "blog-topic-leader" }));
        const label = svgElement("text", { x, y: y < 140 ? y - 9 : y + 15, class: "blog-topic-label", "aria-hidden": "true" });
        label.textContent = topic.label;
        group.append(label);
      });
      chart.hidden = total === 0;
    };

    const applyBlogFilters = () => {
      const query = searchInput.value.trim().toLocaleLowerCase();
      let visibleCount = 0;

      posts.forEach((post) => {
        const categories = (post.dataset.categories || "").split("|");
        const matchesCategory = activeCategory === "all" || categories.includes(activeCategory);
        const matchesSearch = query === "" || post.textContent.toLocaleLowerCase().includes(query);
        const isVisible = matchesCategory && matchesSearch;

        post.classList.toggle("is-filtered", !isVisible);
        if (isVisible) visibleCount += 1;
      });

      emptyState?.classList.toggle("is-visible", visibleCount === 0);
    };

    filters.forEach((button) => {
      button.addEventListener("click", () => {
        activeCategory = button.dataset.category;
        filters.forEach((filterButton) => {
          const isActive = filterButton === button;
          filterButton.classList.toggle("is-active", isActive);
          filterButton.setAttribute("aria-pressed", String(isActive));
        });
        applyBlogFilters();
      });
    });

    searchInput.addEventListener("input", applyBlogFilters);
    buildTopicChart();
    posts.forEach((post) => bindHighlight(post, topics.map((topic) => topic.key).filter((key) => categoriesOf(post).includes(key))));
    applyBlogFilters();
  });
</script>
