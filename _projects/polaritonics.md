---
layout: page
title: Computational Polaritonics
description: >
  Atomistic and mesoscale cavity molecular dynamics for realistic vibrational
  polaritons. This project studies how optical cavities reshape molecular
  vibrations, relaxation, energy transfer, and nonlinear spectroscopic
  responses, while developing self-consistent light-matter simulation tools
  such as CavMD and MaxwellLink.
img: assets/img/research_figures/cavmd.png
img_scale: 1.0
importance: 1
category: work
research_area: photonics
research_filter: Polaritonics
related_publications: true
scholar:
  sort_by: urldate,key
  order: descending,descending
  group_by: year
  group_order: descending
---

`CavMD` is an efficient method for simulating collective vibrational strong coupling in large ensembles of realistic molecules, which expands the scope of conventional molecular dynamics. Beyond the single-mode limit, the recently developed mesoscale CavMD approach propagates coupled light-matter dynamics for condensed-phase molecules confined in a Fabry-Pérot cavity.

Built on this framework, the project studies how cavity environments reshape molecular vibrations, energy transfer, and spectroscopic responses in realistic systems. Recent examples include selective excitation of IR-inactive modes via vibrational polaritons {% cite jiSelectiveExcitationIRInactive2025 %}, nonlinear signatures in two-dimensional IR-Raman spectroscopy of vibrational polaritons {% cite jiTwodimensionalIRRaman2026 %}, and self-consistent light-matter simulations enabled by the MaxwellLink framework {% cite jiMaxwellLinkUnifiedFramework2026 %}.

Recent mesoscale simulations further examine vibrational polariton transport beyond a simple ballistic-to-diffusive picture. Under strong pumping, polariton transport becomes frozen, exhibiting behavior reminiscent of Bose-Einstein condensation (BEC) induced by in-plane symmetry breaking. {% cite jiNonlinearFreezingVibrational2026 %}.

<div class="row">
  <div class="col-sm-8 mx-auto mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/research_figures/cavmd.png" title="Selective excitation via vibrational polaritons" class="img-fluid rounded z-depth-1 d-block mx-auto" max-width="600px" %}
  </div>
</div>
<div class="caption">
  Fabry-Pérot cavity setup in CavMD.
</div>
