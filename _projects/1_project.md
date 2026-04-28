---
layout: page
title: Computational Polaritonics
description: Atomistic cavity molecular dynamics for vibrational polaritons and self-consistent light-matter simulations.
img: assets/img/research_figures/cavmd.png
importance: 1
category: work
related_publications: true
_styles: |
  .post-description {
    font-size: 1.02rem;
    line-height: 1.55;
  }
---

`CavMD` expands the scope of conventional molecular dynamics and can efficiently simulate collective vibrational strong coupling formed by a large collection of realistic molecules. Beyond the single-mode limit, the recently developed mesoscale CavMD approach propagates coupled light-matter dynamics for condensed-phase molecules confined in a wide range of cavity geometries, including the planar Fabry-Perot cavities commonly employed in experiments.

Built on this framework, the project studies how cavity environments reshape molecular vibrations, energy transfer, and spectroscopic responses in realistic systems. Recent examples include selective excitation of IR-inactive modes via vibrational polaritons {% cite jiSelectiveExcitationIRInactive2025 %}, nonlinear signatures in two-dimensional IR-Raman spectroscopy of vibrational polaritons {% cite jiTwodimensionalIRRamanSpectroscopy2026 %}, and self-consistent light-matter simulations enabled by the MaxwellLink framework {% cite jiMaxwellLinkUnifiedFramework2026 %}.

<div class="row">
  <div class="col-sm-8 mx-auto mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/research_figures/cavmd.png" title="Selective excitation via vibrational polaritons" class="img-fluid rounded z-depth-1 d-block mx-auto" max-width="600px" %}
  </div>
</div>
<div class="caption">
  Representative figures from CavMD-related studies.
</div>

Current themes in this project include cavity-modified vibrational relaxation, collective vibrational strong coupling in realistic molecular ensembles, polariton-enabled mode selectivity, nonlinear spectroscopic observables, and simulation frameworks that couple molecular and electromagnetic degrees of freedom on equal footing.
