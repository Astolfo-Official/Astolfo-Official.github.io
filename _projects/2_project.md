---
layout: page
title: AI-enhanced Research
description: LLM-based autonomous agents for scientific simulations, workflow orchestration, and code optimization across research domains.
img: assets/img/research_figures/fermilink.png
importance: 2
category: work
related_publications: true
---

`AI-enhanced Research` explores how large language models and autonomous agents can assist scientific discovery by planning simulations, coordinating domain tools, and improving research code. The focus is on building reliable agentic workflows that remain grounded in physics, chemistry, and numerical constraints rather than treating scientific computing as a generic text-generation problem.

A representative direction in this effort is `FermiLink`, a unified agent framework for multidomain autonomous scientific simulations {% cite mengFermiLinkUnifiedAgent2026 %}. This line of work studies how LLM-based agents can decompose scientific tasks, interface with simulation backends, iteratively refine code, and organize multi-step computational experiments across different research settings.

<div class="row">
  <div class="col-sm-8 mx-auto mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/publication_preview/mengFermiLinkUnifiedAgent2026.png" title="FermiLink for autonomous scientific simulations" class="img-fluid rounded z-depth-1 d-block mx-auto" max-width="600px" %}
  </div>
</div>
<div class="caption">
  Preview of FermiLink, a unified agent framework for multidomain autonomous scientific simulations.
</div>

Current themes in this project include LLM-driven scientific workflow automation, autonomous orchestration of simulation pipelines, code generation and optimization for scientific software, evaluation of agent reliability in research environments, and human-in-the-loop systems that accelerate discovery while preserving interpretability and reproducibility.
