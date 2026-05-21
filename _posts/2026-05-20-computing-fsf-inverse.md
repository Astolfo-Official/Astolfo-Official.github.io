---
layout: post
title: Computing \(FSF^+\)
date: 2026-05-20
description: A numerical linear algebra note on generalized inverses, SVD, scipy.linalg.solve, Cholesky decomposition, and LU decomposition for \(FSF^+\).
tags: numerical-linear-algebra scipy matrix-computation
categories: math
---

Consider the matrix expression $A = F S F^+$, where $F$ is a general matrix, not necessarily square, $S$ is a given diagonal matrix, and $F^+$ denotes the Moore-Penrose generalized inverse. If $F\in\mathbb C^{m\times n}$, then $F^+\in\mathbb C^{n\times m}$. Therefore $S$ should be an $n\times n$ diagonal matrix, and $FSF^+$ is an $m\times m$ matrix.

## 1. SVD method

The most robust way to define and compute the generalized inverse is through the singular value decomposition. Let

$$
F = U\Sigma V^{\dagger},
$$

where $U$ and $V$ are unitary matrices, $V^{\dagger}$ is the conjugate transpose of $V$, and $\Sigma$ is rectangular diagonal with singular values $\sigma_i\ge 0$.

The Moore-Penrose inverse is

$$
F^+ = (U\Sigma V^{\dagger})^{\dagger} = V\Sigma^+U^{\dagger},
$$

where $\Sigma^+$ is obtained by replacing every nonzero singular value $\sigma_i$ by $1/\sigma_i$ and changing the rectangular shape from $m\times n$ to $n\times m$. For a square diagonal matrix, this shape change is invisible. Therefore,

$$
FSF^+=FSV\Sigma^+U^\dagger.
$$

In Scipy, the direct SVD function is `scipy.linalg.svd`. In following example, the `tol` below is the rank cutoff. Singular values larger than `tol` are inverted; singular values smaller than or equal to `tol` are treated as numerically zero and mapped to zero in $\Sigma^+$. This avoids dividing by zero and also prevents extremely small singular values from producing huge unstable entries in the pseudoinverse.

```python
import numpy as np
from scipy.linalg import svd

np.set_printoptions(precision=6, suppress=True)

F = np.array([[1.0, 2.0, 0.0], [0.0, 1.0, 1.0]])  # shape (m, n) = (2, 3)
S = np.diag([0.5, 2.0, 3.0])  # S is n by n

U, sigma, Vh = svd(F, full_matrices=False)

tol = 1e-12
sigma_plus = np.where(sigma > tol, 1.0 / sigma, 0.0)

F_plus = (Vh.conj().T * sigma_plus) @ U.conj().T
A = F @ S @ F_plus

print(A)
```

```text
[[ 1.5       0.5     ]
 [-0.333333  2.833333]]
```

In practice, one usually uses `scipy.linalg.pinv`, which computes the Moore-Penrose inverse directly:

```python
import numpy as np
from scipy.linalg import pinv

np.set_printoptions(precision=6, suppress=True)

F = np.array([[1.0, 2.0, 0.0], [0.0, 1.0, 1.0]])
S = np.diag([0.5, 2.0, 3.0])

F_plus = pinv(F)
A = F @ S @ F_plus

print(A)
```
```text
[[ 1.5       0.5     ]
 [-0.333333  2.833333]]
```

This is the safest default when $F$ may be rectangular, rank-deficient, or ill-conditioned.

## 2. Using `scipy.linalg.solve`

The function `scipy.linalg.solve` solves a square linear system

$$
AX=B.
$$

So it does not directly invert a rectangular matrix. Instead, it becomes useful after we reduce the generalized inverse to a square system under rank assumptions.

For example, if $F\in\mathbb C^{m\times n}$ has full column rank, then $m\ge n$ and

$$
F^+ = (F^\dagger F)^{-1}F^\dagger.
$$

Let

$$
G = F^\dagger F.
$$

Then $G$ is an $n\times n$ Hermitian positive definite matrix, and

$$
F^+ = G^{-1}F^\dagger.
$$

Instead of forming $G^{-1}$ explicitly, solve

$$
G X = F^\dagger.
$$

Then $X=F^+$, so

$$
FSF^+=FSX.
$$

In Scipy:

```python
import numpy as np
from scipy.linalg import solve

np.set_printoptions(precision=6, suppress=True)

F = np.array([[1.0, 0.0], [1.0, 1.0], [0.0, 1.0]])  # full column rank
S = np.diag([0.5, 2.0])

G = F.conj().T @ F
F_plus = solve(G, F.conj().T, assume_a="pos")
A = F @ S @ F_plus

print(A)
```
```text
[[ 0.333333  0.166667 -0.166667]
 [-0.333333  0.833333  1.166667]
 [-0.666667  0.666667  1.333333]]
```

Mathematically, this works because `solve` factors the square matrix $G$ and then performs triangular solves. For a general dense square matrix, LAPACK often uses LU factorization with pivoting. If `assume_a="pos"` is given, Scipy can use algorithms for positive definite matrices.

The limitations are important:

- The `solve` method above assumes full column rank.
- It uses the normal matrix $F^\dagger F$, which squares the condition number and can be less stable than SVD.
- If $F$ is rank-deficient, $F^\dagger F$ is singular and this method fails.
- If $F$ is very ill-conditioned, prefer `pinv` or an SVD-based method.
- For large sparse matrices, use `scipy.sparse.linalg` rather than dense `scipy.linalg`.

There is also a useful full-row-rank variant. If $F\in\mathbb R^{m\times n}$ has full row rank, then

$$
F^+ = F^\dagger(FF^\dagger)^{-1}.
$$

Therefore, when $S$ is diagonal,

$$
FSF^+ = FSF^\dagger(FF^\dagger)^{-1}.
$$

If we define

$$
G = FF^\dagger,\qquad B = FSF^\dagger,
$$

then the target matrix can be computed as

$$
FSF^+ = BG^{-1}.
$$

In the real-valued code below, `.T` is the ordinary transpose. For complex matrices, replace it by `.conj().T`. The diagonal matrix $S$ does not need to be formed explicitly. Multiplying each column of $F$ by the corresponding diagonal entry of $S$ is enough:

```python
F_x = self.ftilde_k[:, :, 0]

G_x = F_x @ F_x.T
B_x = (F_x * self.smooth_2d[None, :]) @ F_x.T

eps_x = 1e-8 * max(np.linalg.norm(G_x, ord=2), 1.0)

abc_x = solve(
    G_x.T + eps_x * np.eye(G_x.shape[0]),
    B_x.T,
    assume_a="sym",
    check_finite=False,
).T
```

The final `.T` is just a convenient way to solve a right-side linear system. Since `scipy.linalg.solve` solves

$$
AX = C,
$$

the code above solves

$$
(G_x^\dagger+\varepsilon I)Y = B_x^\dagger
$$

and then returns

$$
Y^\dagger = B_x(G_x+\varepsilon I)^{-1}.
$$

The regularization term $\varepsilon I$ is the singularity safeguard. Here

$$
\varepsilon = 10^{-8}\max(\|G_x\|_2,1)
$$

scales the perturbation with the size of $G_x$, while keeping it nonzero even when $G_x$ is tiny. Numerically, this replaces the possibly singular or nearly singular inverse $G_x^{-1}$ by the damped inverse $(G_x+\varepsilon I)^{-1}$. This is a Tikhonov-style stabilization: it is usually faster than SVD, but it no longer computes the exact Moore-Penrose inverse when $G_x$ is singular. The result should be interpreted as a regularized approximation to $FSF^+$.

One can inspect the conditioning with:

```python
cond_F = np.linalg.cond(F)
cond_G = np.linalg.cond(G)

print(cond_F)
print(cond_G)
```

Example output:

```text
1.7320508075688772
2.999999999999999
```

Typically, $\kappa(F^\dagger F)=\kappa(F)^2$, which is why SVD is often the safer numerical choice.

## 3. Least-squares viewpoint

The generalized inverse is tightly connected to least squares. For a full column rank matrix, $F^+b$ is the least-squares solution of

$$
\min_x \|Fx-b\|_2.
$$

For the matrix expression $F S F^+$, we can think of computing $F^+$ column by column. Scipy exposes this directly through `scipy.linalg.lstsq`:

```python
import numpy as np
from scipy.linalg import lstsq

np.set_printoptions(precision=6, suppress=True)

F = np.array([[1.0, 0.0], [1.0, 1.0], [0.0, 1.0]])
S = np.diag([0.5, 2.0])

F_plus, residuals, rank, singular_values = lstsq(F, np.eye(F.shape[0]))
A = F @ S @ F_plus

print(A)
print(f"rank: {rank}")
print(f"singular values: {singular_values}")
```
```text
[[ 0.333333  0.166667 -0.166667]
 [-0.333333  0.833333  1.166667]
 [-0.666667  0.666667  1.333333]]
rank: 2
singular values: [1.732051 1.      ]
```

Here `lstsq(F, I_m)` solves

$$
FX\approx I_m
$$

in the least-squares sense, and returns $X=F^+$ when the standard Moore-Penrose conditions are met. For rank-deficient or highly ill-conditioned matrices, `pinv` is usually clearer because it makes the singular-value thresholding explicit.

## 4. Cholesky decomposition

If $F$ has full column rank, then

$$
G = F^\dagger F
$$

is Hermitian positive definite. Hence we can compute the generalized inverse through a Cholesky factorization of $G$:

$$
G = LL^\dagger.
$$

This gives the same normal-equation formula

$$
F^+ = G^{-1}F^\dagger,
$$

but solves it using the triangular Cholesky factors.

```python
import numpy as np
from scipy.linalg import cho_factor, cho_solve

np.set_printoptions(precision=6, suppress=True)

F = np.array([[1.0, 0.0], [1.0, 1.0], [0.0, 1.0]])  # full column rank
S = np.diag([0.5, 2.0])

G = F.conj().T @ F
c, lower = cho_factor(G)

F_plus = cho_solve((c, lower), F.conj().T)
A = F @ S @ F_plus

print(A)
```
```text
[[ 0.333333  0.166667 -0.166667]
 [-0.333333  0.833333  1.166667]
 [-0.666667  0.666667  1.333333]]
```

This is efficient, but it is only appropriate when $F^\dagger F$ is safely positive definite. If $F$ is close to rank-deficient, the Cholesky route can be numerically fragile.

## 5. LU decomposition

LU decomposition is useful when the square system to be solved is not being treated as positive definite. For example, one can explicitly factor the normal matrix $G=F^\dagger F$ and reuse the factorization:

```python
import numpy as np
from scipy.linalg import lu_factor, lu_solve

np.set_printoptions(precision=6, suppress=True)

F = np.array([[1.0, 0.0], [1.0, 1.0], [0.0, 1.0]])
S = np.diag([0.5, 2.0])

G = F.conj().T @ F
lu, piv = lu_factor(G)

F_plus = lu_solve((lu, piv), F.conj().T)
A = F @ S @ F_plus

print(A)
```
```text
[[ 0.333333  0.166667 -0.166667]
 [-0.333333  0.833333  1.166667]
 [-0.666667  0.666667  1.333333]]
```

This can be useful when the same $F$ is reused many times with different $S$ matrices:

```python
G = F.conj().T @ F
lu, piv = lu_factor(G)
F_plus = lu_solve((lu, piv), F.conj().T)

for S in many_S_matrices:
    A = F @ S @ F_plus
    print(A)
```

However, if $G$ is Hermitian positive definite, Cholesky is usually the better structured factorization. If $F$ is rank-deficient or ill-conditioned, SVD or `pinv` is usually safer than either Cholesky or LU on the normal equations.

## 6. Benchmark

The small examples above are meant to show correctness, not performance. For timing, it is better to use larger random matrices and average over repeated runs. The following benchmark generates random real matrices $F\in\mathbb R^{m\times n}$ and diagonal $S\in\mathbb R^{n\times n}$, then measures the end-to-end time needed to compute $A=FSF^+$ for each method. The random generation itself is outside the timed region.

The benchmark includes both tall matrices and their wide counterparts. For `solve`, Cholesky, and LU, the implementation uses the smaller normal matrix: $F^\dagger F$ when $m\ge n$, and $FF^\dagger$ when $m<n$.

```python
import numpy as np
from time import perf_counter
from scipy.linalg import (
    cho_factor,
    cho_solve,
    lstsq,
    lu_factor,
    lu_solve,
    pinv,
    solve,
    svd,
)

rng = np.random.default_rng(20260520)
dims = [(100, 50), (50, 100), (500, 250), (250, 500), (1000, 500), (500, 1000)]
repeats = 50


def svd_method(F, S, s):
    U, sigma, Vh = svd(F, full_matrices=False, check_finite=False)
    tol = np.finfo(float).eps * max(F.shape) * sigma[0]
    sigma_plus = np.where(sigma > tol, 1.0 / sigma, 0.0)
    F_plus = (Vh.T * sigma_plus) @ U.T
    return F @ S @ F_plus


def pinv_method(F, S, s):
    return F @ S @ pinv(F, check_finite=False)


def solve_method(F, S, s):
    m, n = F.shape

    if m >= n:
        G = F.T @ F
        F_plus = solve(G, F.T, assume_a="pos", check_finite=False)
        return F @ S @ F_plus

    G = F @ F.T
    B = (F * s[None, :]) @ F.T
    return solve(G.T, B.T, assume_a="pos", check_finite=False).T


def lstsq_method(F, S, s):
    F_plus, *_ = lstsq(F, np.eye(F.shape[0]), check_finite=False)
    return F @ S @ F_plus


def cholesky_method(F, S, s):
    m, n = F.shape

    if m >= n:
        G = F.T @ F
        c, lower = cho_factor(G, check_finite=False)
        F_plus = cho_solve((c, lower), F.T, check_finite=False)
        return F @ S @ F_plus

    G = F @ F.T
    B = (F * s[None, :]) @ F.T
    c, lower = cho_factor(G, check_finite=False)
    return cho_solve((c, lower), B.T, check_finite=False).T


def lu_method(F, S, s):
    m, n = F.shape

    if m >= n:
        G = F.T @ F
        lu, piv = lu_factor(G, check_finite=False)
        F_plus = lu_solve((lu, piv), F.T, check_finite=False)
        return F @ S @ F_plus

    G = F @ F.T
    B = (F * s[None, :]) @ F.T
    lu, piv = lu_factor(G, check_finite=False)
    return lu_solve((lu, piv), B.T, check_finite=False).T


methods = [
    ("SVD", svd_method),
    ("pinv", pinv_method),
    ("solve", solve_method),
    ("lstsq", lstsq_method),
    ("Cholesky", cholesky_method),
    ("LU", lu_method),
]

print(f"repeats = {repeats}")
print("| F shape | SVD | pinv | solve | lstsq | Cholesky | LU |")
print("|---:|---:|---:|---:|---:|---:|---:|")

for m, n in dims:
    F = rng.standard_normal((m, n))
    s = rng.standard_normal(n)
    S = np.diag(s)
    row = []

    for name, method in methods:
        method(F, S, s)  # warm-up
        times = []

        for _ in range(repeats):
            start = perf_counter()
            method(F, S, s)
            times.append(perf_counter() - start)

        row.append(np.mean(times))

    print(f"| {m} x {n} | " + " | ".join(f"{t:.6f}" for t in row) + " |")
```

Local benchmark on M3 Pro chip, with 50 repetitions for every method and every matrix size, the average times in seconds were:

<div style="overflow-x: auto;">
  <table style="margin: 1rem auto; border-collapse: collapse; border: 1px solid var(--global-divider-color);">
    <thead>
      <tr>
        <th style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">F shape</th>
        <th style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">SVD</th>
        <th style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">pinv</th>
        <th style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">solve</th>
        <th style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">lstsq</th>
        <th style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">Cholesky</th>
        <th style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">LU</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">100 x 50</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.000620</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.000597</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.000162</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.001049</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.000154</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.000119</td>
      </tr>
      <tr>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">50 x 100</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.000740</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.000727</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.000128</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.000817</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.000113</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.000119</td>
      </tr>
      <tr>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">500 x 250</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.047543</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.071102</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.007706</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.096004</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.010087</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.005028</td>
      </tr>
      <tr>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">250 x 500</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.042368</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.042022</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.007834</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.045064</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.004704</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.003286</td>
      </tr>
      <tr>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">1000 x 500</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.219666</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.223452</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.031117</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.392856</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.024497</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.021359</td>
      </tr>
      <tr>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">500 x 1000</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.208340</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.188151</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.019979</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.262974</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.014480</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem;">0.014524</td>
      </tr>
    </tbody>
  </table>
</div>

The normal-equation methods are faster here, but this speed comes with the usual numerical tradeoff: they assume full column rank in the tall case or full row rank in the wide case, and they square the condition number through $F^\dagger F$ or $FF^\dagger$. For a benchmark focused on robustness rather than speed, `pinv` or the direct SVD route is the more meaningful comparison.