---
layout: post
title: How to Get the Casida Equation in TDDFT
date: 2026-03-26
description: A compact derivation of the Casida eigenvalue problem from linear-response TDDFT.
tags: tddft quantum-chemistry excited-states
categories: physics
---

If you have seen the final Casida equation

$$
\sum_{q'}
\left[
\omega_q^2 \delta_{q q'} + 4 \sqrt{\omega_q \omega_{q'}} K_{q q'}
\right]
F_{q'} = \Omega^2 F_q,
$$

it can look like it appears out of nowhere. It does not. It is just the linear-response TDDFT Dyson equation projected onto the basis of Kohn-Sham single excitations $q = (i \to a)$.

In this note I will use a closed-shell, real-orbital notation to keep the algebra short. Different books move factors of 2 between the response function, spin summation, and the kernel, so if your favorite reference looks slightly different, that is usually a convention issue rather than a physics issue.

## 1. Start from the density-response equation

The induced density is related to the external perturbation by the interacting response function:

$$
\delta n(\mathbf{r}, \omega) = \int \chi(\mathbf{r}, \mathbf{r}', \omega)\,\delta v_{\mathrm{ext}}(\mathbf{r}', \omega)\,\mathrm{d}\mathbf{r}'.
$$

In TDDFT, the interacting response satisfies the Dyson-like equation

$$
\chi = \chi_s + \chi_s f_{\mathrm{Hxc}} \chi,
$$

where

$$
f_{\mathrm{Hxc}}(\mathbf{r}, \mathbf{r}', \omega)
=
\frac{1}{|\mathbf{r} - \mathbf{r}'|}
+ f_{\mathrm{xc}}(\mathbf{r}, \mathbf{r}', \omega).
$$

The true excitation energies are the poles of $\chi$. To find them, we look for nontrivial density oscillations at frequency $\Omega$ even with no external driving. In other words, at an excitation we can write

$$
\delta n(\mathbf{r}, \Omega)
=
\int \chi_s(\mathbf{r}, \mathbf{r}', \Omega)\,
\delta v_s(\mathbf{r}', \Omega)\,\mathrm{d}\mathbf{r}',
$$

with the induced Kohn-Sham potential

$$
\delta v_s(\mathbf{r}, \Omega)
=
\int f_{\mathrm{Hxc}}(\mathbf{r}, \mathbf{r}', \Omega)\,
\delta n(\mathbf{r}', \Omega)\,\mathrm{d}\mathbf{r}'.
$$

So the whole problem reduces to solving the homogeneous self-consistent response equation.

## 2. Write the Kohn-Sham response in the particle-hole basis

Let $i,j$ denote occupied orbitals and $a,b$ virtual orbitals. Define the Kohn-Sham transition energies

$$
\omega_{i a} = \varepsilon_a - \varepsilon_i
$$

and the transition densities

$$
\Phi_{i a}(\mathbf{r}) = \phi_i(\mathbf{r}) \phi_a(\mathbf{r}).
$$

For a closed-shell system, the noninteracting response can be written as

$$
\chi_s(\mathbf{r}, \mathbf{r}', \omega)
=
2 \sum_{i a}
\Phi_{i a}(\mathbf{r}) \Phi_{i a}(\mathbf{r}')
\left[
\frac{1}{\omega - \omega_{i a}}
- \frac{1}{\omega + \omega_{i a}}
\right].
$$

Combining the two fractions gives the symmetric form

$$
\chi_s(\mathbf{r}, \mathbf{r}', \omega)
=
\sum_{i a}
\frac{4 \omega_{i a}}{\omega^2 - \omega_{i a}^2}
\Phi_{i a}(\mathbf{r}) \Phi_{i a}(\mathbf{r}').
$$

This is the key step: once the Kohn-Sham response is expressed in the space of single excitations, the Casida matrix drops out by projection.

## 3. Project the response equation onto transition space

Define the projection of the induced Kohn-Sham potential onto a given transition:

$$
g_{i a}(\omega)
=
\int \Phi_{i a}(\mathbf{r})\,\delta v_s(\mathbf{r}, \omega)\,\mathrm{d}\mathbf{r}.
$$

Using the symmetric form of $\chi_s$, the density variation becomes

$$
\delta n(\mathbf{r}, \omega)
=
\sum_{i a}
\frac{4 \omega_{i a}}{\omega^2 - \omega_{i a}^2}
\Phi_{i a}(\mathbf{r})\,g_{i a}(\omega).
$$

Now project the induced potential back onto the same basis:

$$
g_{i a}(\omega)
=
\int \Phi_{i a}(\mathbf{r})
\left[
\int
f_{\mathrm{Hxc}}(\mathbf{r}, \mathbf{r}', \omega)\,
\delta n(\mathbf{r}', \omega)\,\mathrm{d}\mathbf{r}'
\right]
\mathrm{d}\mathbf{r}.
$$

Substituting the expansion of $\delta n$ gives

$$
g_{i a}(\omega)
=
\sum_{j b}
K_{i a, j b}(\omega)
\frac{4 \omega_{j b}}{\omega^2 - \omega_{j b}^2}
g_{j b}(\omega),
$$

where the coupling matrix is

$$
K_{i a, j b}(\omega)
=
\iint
\Phi_{i a}(\mathbf{r})\,
f_{\mathrm{Hxc}}(\mathbf{r}, \mathbf{r}', \omega)\,
\Phi_{j b}(\mathbf{r}')
\mathrm{d}\mathbf{r}\,\mathrm{d}\mathbf{r}'.
$$

So far nothing has been approximated beyond the usual linear-response framework.

## 4. Turn the projected equation into an eigenvalue problem

At an excitation frequency $\Omega$, define scaled amplitudes

$$
F_{i a}
=
\frac{\sqrt{\omega_{i a}}}{\Omega^2 - \omega_{i a}^2}\,
g_{i a}(\Omega).
$$

Equivalently,

$$
g_{i a}(\Omega)
=
\frac{\Omega^2 - \omega_{i a}^2}{\sqrt{\omega_{i a}}}\,
F_{i a}.
$$

Insert this into the projected equation:

$$
\frac{\Omega^2 - \omega_{i a}^2}{\sqrt{\omega_{i a}}}\,F_{i a}
=
\sum_{j b}
K_{i a, j b}(\Omega)
\frac{4 \omega_{j b}}{\Omega^2 - \omega_{j b}^2}
\frac{\Omega^2 - \omega_{j b}^2}{\sqrt{\omega_{j b}}}\,
F_{j b}.
$$

The factors $(\Omega^2 - \omega_{j b}^2)$ cancel on the right, leaving

$$
\left(
\Omega^2 - \omega_{i a}^2
\right) F_{i a}
=
4 \sum_{j b}
\sqrt{\omega_{i a} \omega_{j b}}\,
K_{i a, j b}(\Omega)\,
F_{j b}.
$$

Move everything except $\Omega^2 F_{i a}$ to the left:

$$
\sum_{j b}
\left[
\omega_{i a}^2 \delta_{i j} \delta_{a b}
+ 4 \sqrt{\omega_{i a} \omega_{j b}}\,
K_{i a, j b}(\Omega)
\right]
F_{j b}
=
\Omega^2 F_{i a}.
$$

This is the Casida equation.

If we collapse the pair index $(i,a)$ into a single label $q$, it becomes

$$
\sum_{q'}
\left[
\omega_q^2 \delta_{q q'}
+ 4 \sqrt{\omega_q \omega_{q'}} K_{q q'}(\Omega)
\right]
F_{q'}
=
\Omega^2 F_q.
$$

## 5. Where the usual practical approximations enter

The derivation above is general within linear-response TDDFT, but most actual calculations make one more step:

$$
f_{\mathrm{xc}}(\mathbf{r}, \mathbf{r}', \omega)
\longrightarrow
f_{\mathrm{xc}}(\mathbf{r}, \mathbf{r}').
$$

This is the adiabatic approximation. Once the kernel is frequency independent, $K_{i a, j b}$ is just an ordinary matrix and the Casida equation becomes a standard Hermitian eigenvalue problem for $\Omega^2$.

You may also see the same physics written in the $(A,B)$ formulation,

$$
\begin{pmatrix}
A & B \\
B & A
\end{pmatrix}
\begin{pmatrix}
X \\
Y
\end{pmatrix}
=
\Omega
\begin{pmatrix}
I & 0 \\
0 & -I
\end{pmatrix}
\begin{pmatrix}
X \\
Y
\end{pmatrix},
$$

which is equivalent to the Casida equation after a similarity transformation. In the Tamm-Dancoff approximation (TDA), one drops the $B$ block and solves a simpler linear eigenvalue problem.

## 6. What each object means physically

- $\omega_{i a}$ is a bare Kohn-Sham orbital energy difference.
- $K_{i a, j b}$ couples different single excitations through the Hartree and exchange-correlation kernel.
- $F_{i a}$ tells you how the true excitation is built from Kohn-Sham particle-hole transitions.
- $\Omega$ is the interacting excitation energy, so it includes the collective mixing that plain orbital energy differences miss.

That is why Casida often gives much better excitation energies than simply reading off $\varepsilon_a - \varepsilon_i$ from the ground-state Kohn-Sham spectrum.

## 7. The short version

The Casida equation is not an extra postulate on top of TDDFT. It is just:

1. Write the TDDFT Dyson equation for $\chi$.
2. Express $\chi_s$ in the basis of Kohn-Sham particle-hole transitions.
3. Project the response equation onto that basis.
4. Rescale the amplitudes so the equation becomes Hermitian in $\Omega^2$.

Once you see those four steps, the Casida matrix is simply the linear-response TDDFT problem written in a practical basis.
