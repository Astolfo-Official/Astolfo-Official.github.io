---
layout: post
title: How to Get the Casida Equation in TDDFT
date: 2026-03-26
description: A note-faithful walkthrough of how linear-response TDDFT becomes the Casida equation.
tags: tddft quantum-chemistry excited-states
categories: physics
---

This post follows the note `Casida_TDDFT Linear Response.pdf` closely. The main idea in that note is simple: excitation energies are the poles of a response function, so the whole TDDFT problem is to rewrite that response in a form we can actually solve. Throughout I keep the note's spin-orbital notation and set $\hbar = 1$.

## 1. Start from linear response

The note begins with a general perturbation

$$
\hat b(t) = \hat b \cos \omega_0 t,
$$

and asks for the response of some observable $\hat a$. If

$$
\hat H \Psi_I = E_I \Psi_I,
$$

then first-order time-dependent perturbation theory gives, in the frequency domain,

$$
\hat b(\omega)\Psi_0
=
(\omega - \hat H + E_0)\,\delta \Psi_0(\omega),
$$

so that

$$
\delta \Psi_0(\omega)
=
\sum_{I \ne 0}
\Psi_I
\frac{\langle \Psi_I | \hat b(\omega) | \Psi_0 \rangle}{\omega - \omega_I},
\qquad
\omega_I = E_I - E_0.
$$

For spectroscopy, the key example is the dynamic polarizability:

$$
\alpha_{r_i,r_j}(\omega)
=
\sum_{I \ne 0}
\frac{
2\omega_I
\langle \Psi_0 | r_i | \Psi_I \rangle
\langle \Psi_I | r_j | \Psi_0 \rangle
}{
\omega_I^2 - \omega^2
}.
$$

The note also writes this as a sum-over-states formula,

$$
\alpha(\omega)
=
\sum_{I \ne 0}
\frac{f_I}{\omega_I^2 - \omega^2},
$$

with oscillator strengths

$$
f_I
=
\frac{2}{3}\omega_I
\left(
|\langle \Psi_0 | x | \Psi_I \rangle|^2
+
|\langle \Psi_0 | y | \Psi_I \rangle|^2
+
|\langle \Psi_0 | z | \Psi_I \rangle|^2
\right).
$$

So the excitation spectrum is encoded in the poles of $\alpha(\omega)$.

## 2. The TDDFT plan

The note then turns this into a TDDFT problem. Apply

$$
v^{\mathrm{appl}}(\mathbf r,t)
=
\epsilon\,r_j \cos \omega t,
$$

compute the induced density

$$
\delta \rho(\mathbf r,t)
=
\sum_i
\left[
\psi_i(\mathbf r)\,\delta \psi_i^*(\mathbf r,t)
+
\delta \psi_i(\mathbf r,t)\,\psi_i^*(\mathbf r)
\right],
$$

and recover the dynamic polarizability from the induced dipole. In other words, TDDFT does not change the target quantity. It changes how we compute the poles.

## 3. Expand the response in the unperturbed MO basis

The response density matrix is expanded as

$$
\delta \gamma_\sigma(\mathbf r,\mathbf r';\omega)
=
\sum_{ij}
\psi_{i\sigma}(\mathbf r)\,
\delta P_{ij\sigma}(\omega)\,
\psi_{j\sigma}^*(\mathbf r').
$$

For a perturbation $\hat b(\omega)$, the note writes

$$
\delta P_{ij\sigma}(\omega)
=
\frac{n_{j\sigma} - n_{i\sigma}}
{\omega - (\epsilon_{i\sigma} - \epsilon_{j\sigma})}
\langle \psi_{i\sigma} | \hat b(\omega) | \psi_{j\sigma} \rangle,
$$

and the first-order orbital response as

$$
\delta \psi_{i\sigma}(\mathbf r,\omega)
=
\sum_{j \ne i}
\psi_{j\sigma}(\mathbf r)\,
\frac{
\langle \psi_{j\sigma} | \hat b(\omega) | \psi_{i\sigma} \rangle
}{
\omega - (\epsilon_{j\sigma} - \epsilon_{i\sigma})
}.
$$

At this stage, the unknowns are the matrix elements $\delta P_{ij\sigma}(\omega)$.

## 4. Insert the time-dependent Kohn-Sham potential

The time-dependent Kohn-Sham equation is

$$
\left[
-\frac{1}{2}\nabla^2
+
v_{\mathrm{ext}}(\mathbf r,t)
+
\int \frac{\rho(\mathbf r',t)}{|\mathbf r - \mathbf r'|}\,d\mathbf r'
+
v_{\mathrm{xc}}(\mathbf r,t)
\right]
\psi_i(\mathbf r,t)
=
i\frac{\partial}{\partial t}\psi_i(\mathbf r,t),
$$

with

$$
\rho(\mathbf r,t)
=
\sum_{i\sigma}
f_{i\sigma}
|\psi_{i\sigma}(\mathbf r,t)|^2.
$$

The note then adopts the adiabatic approximation,

$$
v_{\mathrm{xc}}(\mathbf r,t)
=
\frac{\delta E_{\mathrm{xc}}[\rho_t]}{\delta \rho_t(\mathbf r)},
$$

so the self-consistent field reacts instantly and carries no memory.

After linearization, the effective perturbation becomes

$$
\delta v_{\mathrm{eff}}^\sigma
=
v_{\mathrm{appl}}^\sigma
+
\sum_\tau
f^{\sigma,\tau}\,\delta \gamma_\tau,
$$

with

$$
f^{\sigma,\tau}
=
f_H^{\sigma,\tau}
+
f_{\mathrm{xc}}^{\sigma,\tau}.
$$

The corresponding coupling matrix is

$$
K_{ij\sigma,kl\tau}
=
\iiint\!\!\int
\psi_{i\sigma}^*(\mathbf r_1)\psi_{j\sigma}(\mathbf r_1')
f^{\sigma,\tau}(\mathbf r_1,\mathbf r_1';\mathbf r_2,\mathbf r_2')
\psi_{k\tau}(\mathbf r_2)\psi_{l\tau}^*(\mathbf r_2')
\,
d\mathbf r_1\,d\mathbf r_1'\,d\mathbf r_2\,d\mathbf r_2'.
$$

Using this, the note arrives at the coupled-perturbed equation

$$
\delta P_{ij\sigma}(\omega)
=
\frac{n_{j\sigma} - n_{i\sigma}}
{\omega - (\epsilon_{i\sigma} - \epsilon_{j\sigma})}
\langle \psi_{i\sigma} | \delta \hat v_{\mathrm{eff}}^\sigma(\omega) | \psi_{j\sigma} \rangle,
$$

with

$$
\langle \psi_{i\sigma} | \delta \hat v_{\mathrm{eff}}^\sigma(\omega) | \psi_{j\sigma} \rangle
=
v_{ij\sigma}^{\mathrm{appl}}(\omega)
+
\sum_{kl\tau}
K_{ij\sigma,kl\tau}\,\delta P_{kl\tau}(\omega).
$$

This is the TDDFT response equation in the MO basis.

## 5. Separate particle-hole and hole-particle blocks

The note next distinguishes the particle-hole and hole-particle sectors. Using occupied indices $i,j$ and virtual indices $a,b$, and for real orbitals,

$$
\delta P_{ph,\sigma}(\omega)
=
\delta P_{hp,\sigma}^*(\omega).
$$

This makes it natural to define the two standard blocks

$$
A_{ia\sigma,jb\tau}
=
\delta_{\sigma\tau}\delta_{ij}\delta_{ab}
(\epsilon_{a\sigma} - \epsilon_{i\sigma})
+
K_{ia\sigma,jb\tau},
$$

and

$$
B_{ia\sigma,jb\tau}
=
K_{ia\sigma,bj\tau}.
$$

Everything from this point on is just linear algebra in the particle-hole space.

## 6. The TDDFT RPA equation and the Casida equation

At an excitation frequency, the density response becomes infinite even when the applied perturbation stays finite. That turns the response problem into the homogeneous eigenvalue equation

$$
\begin{pmatrix}
A & B \\
B & A
\end{pmatrix}
\begin{pmatrix}
X_I \\
Y_I
\end{pmatrix}
=
\omega_I
\begin{pmatrix}
1 & 0 \\
0 & -1
\end{pmatrix}
\begin{pmatrix}
X_I \\
Y_I
\end{pmatrix}.
$$

In the note this is called the TDDFT RPA equation, and it is also the Casida equation in its non-Hermitian form.

The note then rewrites it as

$$
(A+B)(X_I+Y_I) = \omega_I (X_I-Y_I),
$$

$$
(A-B)(X_I-Y_I) = \omega_I (X_I+Y_I).
$$

From these two relations one gets the Hermitian squared form

$$
\Omega F_I = \omega_I^2 F_I,
$$

with

$$
\Omega
=
(A-B)^{1/2}(A+B)(A-B)^{1/2},
$$

and

$$
F_I
=
(A-B)^{-1/2}(X_I+Y_I).
$$

That is the form of the Casida equation emphasized in the note.

## 7. Why solving $\Omega$ gives the spectrum

The note makes the connection to spectroscopy explicit by writing the real part of the response as

$$
(\mathrm{Re}\,\delta P)(\omega)
=
(A-B)^{1/2}
(\omega^2\mathbf 1 - \Omega)^{-1}
(A-B)^{1/2}
v^{\mathrm{appl}}(\omega).
$$

Now the poles are obvious: they occur when $\omega^2$ hits an eigenvalue of $\Omega$. So solving

$$
\Omega F_I = \omega_I^2 F_I
$$

directly produces the excitation energies.

The same note then connects the eigenvectors to intensities through the transition moments,

$$
\omega_I^{1/2}
\langle \Psi_0 | \hat x | \Psi_I \rangle
=
\vec x^{\dagger}(A-B)^{1/2}F_I,
$$

and therefore to the oscillator strengths

$$
f_I
=
\frac{2}{3}\omega_I
\left(
|\langle \Psi_0 | x | \Psi_I \rangle|^2
+
|\langle \Psi_0 | y | \Psi_I \rangle|^2
+
|\langle \Psi_0 | z | \Psi_I \rangle|^2
\right).
$$

So the eigenvalues give the poles, and the eigenvectors give the residues.

## 8. What the Casida eigenvector means

The note finishes by interpreting the excitation in the Kohn-Sham reference system:

$$
\Psi_I
=
\sum_\sigma
\sum_i^{\mathrm{occ}}
\sum_a^{\mathrm{virt}}
\sqrt{
\frac{\epsilon_{a\sigma} - \epsilon_{i\sigma}}
{\omega_I}
}
F_{ia\sigma}\,
\Phi_{i\sigma}^{a\sigma},
$$

where $\Phi_{i\sigma}^{a\sigma}$ is a singly excited Kohn-Sham determinant.

So the Casida vector does two jobs at once. It gives the pole position through $\omega_I^2$, and it tells you which single excitations dominate that state.

That is the logic of the note from start to finish: linear response turns the spectrum into poles of a response function, TDDFT rewrites that response in the Kohn-Sham particle-hole basis, the kernel builds the $A$ and $B$ matrices, and the final problem is the Hermitian eigenvalue equation

$$
\Omega F_I = \omega_I^2 F_I.
$$
