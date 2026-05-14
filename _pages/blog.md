---
layout: default
permalink: /blog/
title: blog
nav: true
nav_order: 4
pagination:
  enabled: true
  collection: posts
  permalink: /page/:num/
  per_page: 5
  sort_field: date
  sort_reverse: true
  trail:
    before: 1
    after: 3
---

<div class="post blog-index">
  {% assign blog_name = site.blog_name | default: 'Blog' %}
  {% assign blog_description = site.blog_description | default: 'Notes, derivations, and technical fragments from my research notebook.' %}

  <header class="blog-index-hero">
    <h1>{{ blog_name }}</h1>
    {% if blog_description == 'Also see the structured notes in my bookshelf' %}
      <p>Also see the structured notes in my <a href="{{ '/notes/' | relative_url }}">bookshelf</a>.</p>
    {% else %}
      <p>{{ blog_description }}</p>
    {% endif %}
  </header>

  {% if site.display_tags and site.display_tags.size > 0 or site.display_categories and site.display_categories.size > 0 %}
    <nav class="blog-filter-bar" aria-label="Blog filters">
      {% for tag in site.display_tags %}
        <a href="{{ tag | slugify | prepend: '/blog/tag/' | relative_url }}"><i class="fa-solid fa-hashtag fa-sm"></i>{{ tag }}</a>
      {% endfor %}
      {% for category in site.display_categories %}
        <a href="{{ category | slugify | prepend: '/blog/category/' | relative_url }}"><i class="fa-solid fa-tag fa-sm"></i>{{ category }}</a>
      {% endfor %}
    </nav>
  {% endif %}

  {% if page.pagination.enabled %}
    {% assign postlist = paginator.posts %}
  {% else %}
    {% assign postlist = site.posts %}
  {% endif %}

  <div class="blog-stream">
    {% for post in postlist %}
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

      <article class="blog-card{% if post.thumbnail %} blog-card--with-image{% endif %}">
        <div class="blog-card-copy">
          <div class="blog-card-meta">
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
                <a href="{{ category | slugify | prepend: '/blog/category/' | relative_url }}"><i class="fa-solid fa-tag fa-sm"></i>{{ category }}</a>
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

  {% if page.pagination.enabled %}
    {% include pagination.liquid %}
  {% endif %}
</div>
