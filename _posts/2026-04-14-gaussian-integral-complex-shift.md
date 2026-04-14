---
layout: post
title: Complex Shifts in the Gaussian Integral
date: 2026-04-14
description: A contour proof that a complex-shifted Gaussian integral equals the ordinary one, with an application to the free-particle heat kernel.
tags: math complex-analysis statistical-mechanics
categories: physics
---

Consider a single free particle in a three-dimensional box of volume $V$ at temperature $T$, with $\beta = (k_B T)^{-1}$. Its Hamiltonian satisfies

$$
\hat H |\mathbf k\rangle
=
\frac{\hat{\mathbf p}^2}{2m} |\mathbf k\rangle
=
\frac{\hbar^2 \mathbf k^2}{2m} |\mathbf k\rangle
=
\varepsilon_{\mathbf k} |\mathbf k\rangle.
$$

Under periodic boundary conditions, each $\mathbf k$-state occupies a volume $(2\pi)^3/V$ in $\mathbf k$-space, and the position-space wavefunction is

$$
\langle \mathbf r | \mathbf k \rangle
=
\frac{e^{i\mathbf k\cdot\mathbf r}}{\sqrt V}.
$$

To derive the one-particle partition function $z_1 = V/\Lambda^3$, it is enough to compute the thermal kernel

$$
K_\beta(\mathbf r,\mathbf r')
=
\langle \mathbf r | e^{-\beta \hat H} | \mathbf r' \rangle
=
\frac{1}{(2\pi)^3}
\int
e^{-\beta \varepsilon_{\mathbf k}}
e^{i\mathbf k\cdot(\mathbf r-\mathbf r')}
\,
\mathrm d^3\mathbf k.
$$

Since the exponential factorizes completely in Cartesian coordinates, we only need the one-dimensional integral

$$
I(b)
=
\int_{-\infty}^{+\infty}
\exp\left(-a k^2 + i b k\right)\,\mathrm d k,
\qquad
a = \frac{\beta\hbar^2}{2m},
\quad
b = x-x'.
$$

One subtle point is worth fixing in notation. Here I am working in $\mathbf k$-space, so the Gaussian weight is $e^{-\beta \hbar^2 k^2/(2m)}$ and the Fourier phase is $e^{ik(x-x')}$. If instead one changes variables to the physical momentum $p=\hbar k$, then the kernel must be written with measure $(2\pi\hbar)^{-3}\,d^3p$ and phase factor $e^{ip(x-x')/\hbar}$. The two formulations are equivalent, but mixing them is exactly where the thermal-wavelength prefactor is easy to lose.

Completing the square gives

$$
I(b)
=
e^{-b^2/4a}
\int_{-\infty}^{+\infty}
\exp\left[-a\left(k-\frac{ib}{2a}\right)^2\right]\mathrm d k.
$$

So the key point is to justify that the Gaussian integral is unchanged by this purely imaginary shift:

$$
\int_{-\infty}^{+\infty}
\exp\left[-a\left(k-\frac{ib}{2a}\right)^2\right]\mathrm d k
=
\int_{-\infty}^{+\infty} e^{-a u^2}\,\mathrm d u.
$$

To prove this, let

$$
f(z)=e^{-a z^2},
\qquad
z\in\mathbb C,
$$

which is entire on the whole complex plane. Define $c=-b/(2a)\in\mathbb R$. Then the shifted integral can be written as

$$
\int_{-\infty}^{+\infty}
\exp\left[-a\left(k-\frac{ib}{2a}\right)^2\right]\mathrm d k
=
\int_{-\infty}^{+\infty} e^{-a(k+ic)^2}\,\mathrm d k.
$$

In other words, we are integrating $f(z)$ along the horizontal line $\operatorname{Im} z = c$. Now choose the rectangular contour $C_R$ with vertices

$$
-R,\quad R,\quad R+ic,\quad -R+ic,
$$

oriented counterclockwise, and denote its four sides by $L_1,L_2,L_3,L_4$.

<img src="/assets/img/blog_figures/20260414_gaussian_integal.png" alt="Rectangular contour for the complex shift of the Gaussian integral" style="width: 56%; height: auto; display: block; margin: 0 auto;">

Because $f(z)$ is analytic everywhere, Cauchy's integral theorem gives

$$
\oint_{C_R} f(z)\,\mathrm d z
=
\int_{L_1} f(z)\,\mathrm d z
+
\int_{L_2} f(z)\,\mathrm d z
+
\int_{L_3} f(z)\,\mathrm d z
+
\int_{L_4} f(z)\,\mathrm d z
=
0.
$$

The two horizontal segments are

$$
\int_{L_1} f(z)\,\mathrm d z
=
\int_{-R}^{R} e^{-a x^2}\,\mathrm d x,
$$

and

$$
\int_{L_3} f(z)\,\mathrm d z
=
\int_{R+ic}^{-R+ic} e^{-a z^2}\,\mathrm d z
=
-\int_{-R}^{R} e^{-a(x+ic)^2}\,\mathrm d x.
$$

It remains to estimate the vertical edges. For $L_2$ we parametrize

$$
z=R+isc,
\qquad
s\in[0,1],
$$

and similarly for $L_4$. Then, as $R\to\infty$,

$$
\left|\int_{L_2} f(z)\,\mathrm d z\right|
=
\left|\int_0^1 ic\,e^{-a(R+isc)^2}\,\mathrm d s\right|
\le
|c|\int_0^1 \left|e^{-a(R+isc)^2}\right|\mathrm d s
$$

and therefore

$$
\left|\int_{L_2} f(z)\,\mathrm d z\right|
\le
|c|
\int_0^1 e^{-a(R^2-c^2s^2)}\,\mathrm d s
\le
|c|\,e^{-a(R^2-c^2)}
\longrightarrow 0.
$$

The same estimate holds for $L_4$. Hence, in the limit $R\to\infty$, only the two horizontal sides survive, and we obtain

$$
\int_{-\infty}^{+\infty} e^{-a(x+ic)^2}\,\mathrm d x
=
\int_{-\infty}^{+\infty} e^{-a x^2}\,\mathrm d x.
$$

So the plane-wave Gaussian reduces to the ordinary Gaussian:

$$
I(b)
=
e^{-b^2/4a}
\int_{-\infty}^{+\infty} e^{-a u^2}\,\mathrm d u
=
\sqrt{\frac{\pi}{a}}\,e^{-b^2/4a}
=
\sqrt{\frac{2\pi m}{\beta\hbar^2}}
\exp\left(-\frac{m b^2}{2\beta\hbar^2}\right).
$$

Multiplying the three Cartesian factors together, we arrive at the free-particle heat kernel in coordinate space:

$$
K_\beta(\mathbf r,\mathbf r')
=
\left(\frac{m}{2\pi\beta\hbar^2}\right)^{3/2}
\exp\left[
-\frac{m|\mathbf r-\mathbf r'|^2}{2\beta\hbar^2}
\right].
$$

In particular, on the diagonal $\mathbf r=\mathbf r'$,

$$
K_\beta(\mathbf r,\mathbf r)
=
\left(\frac{m}{2\pi\beta\hbar^2}\right)^{3/2}.
$$

Therefore the single-particle partition function is

$$
z_1
=
\operatorname{Tr}(e^{-\beta\hat H})
=
\int_V K_\beta(\mathbf r,\mathbf r)\,\mathrm d^3\mathbf r
=
V\left(\frac{m}{2\pi\beta\hbar^2}\right)^{3/2}
=
\frac{V}{\Lambda^3},
$$

with thermal wavelength

$$
\Lambda
=
\sqrt{\frac{2\pi\beta\hbar^2}{m}}=\frac{h}{\sqrt{2\pi k_{\rm B}Tm}}.
$$
