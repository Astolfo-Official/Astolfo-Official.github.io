---
layout: page
permalink: /publications/
title: publications
description: ""
nav: true
nav_order: 3
scholar:
  sort_by: urldate,key
  order: descending,descending
  group_by: year
  group_order: descending
---

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="publications">
{% bibliography %}
</div>
