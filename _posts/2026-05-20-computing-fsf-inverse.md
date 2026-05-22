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

## 6. Using the tensor-product structure of $F$ and $S$

The discussion above treats $F$ as a general dense matrix. In the actual problem, however, $F$ has much more structure. This can reduce the computation dramatically.

Let the grid points be uniformly distributed in a rectangular box

$$
x\in[0,L_x],\qquad y\in[0,L_y],\qquad z\in[0,L_z],
$$

with $n_x,n_y,n_z$ grid points. Hence

$$
n_{\mathrm{grid}}=n_xn_yn_z.
$$

For the mode indices,

$$
k_x=\frac{l_x\pi}{L_x},\qquad
k_y=\frac{l_y\pi}{L_y},\qquad
k_z=\frac{l_z\pi}{L_z}.
$$

If there are $n_{l_x},n_{l_y},n_{l_z}$ allowed mode indices in the three directions, then

$$
n_{\mathrm{mode}}=n_{l_x}n_{l_y}n_{l_z}.
$$

The third dimension of the stored array for $F$ records which coordinate carries the cosine. To keep the notation concrete, consider only the first case, where the cosine is in the $x$ direction:

$$
F_{(l_x,l_y,l_z),(i,j,k)}
=
\cos(k_xx_i)\sin(k_yy_j)\sin(k_zz_k).
$$

Define the one-dimensional matrices

$$
(C_x)_{l_x,i}=\cos(k_xx_i),\qquad
(S_y)_{l_y,j}=\sin(k_yy_j),\qquad
(S_z)_{l_z,k}=\sin(k_zz_k).
$$

Then, up to the chosen flattening order of the multi-indices,

$$
F = C_x\otimes S_y\otimes S_z.
$$

This is the key point: the full matrix has shape

$$
n_{\mathrm{mode}}\times n_{\mathrm{grid}},
$$

but it is not a generic matrix of that size. It is a Kronecker product of three much smaller one-dimensional matrices.

Now suppose the smooth grid function also separates:

$$
s(x_i,y_j,z_k)=s_x(x_i)s_y(y_j)s_z(z_k).
$$

As a diagonal matrix on the three-dimensional grid, this means

$$
S = D_x\otimes D_y\otimes D_z,
$$

where

$$
D_x=\operatorname{diag}(s_x),\qquad
D_y=\operatorname{diag}(s_y),\qquad
D_z=\operatorname{diag}(s_z).
$$

Using the identities

$$
(A\otimes B\otimes C)(D\otimes E\otimes H)
=
(AD)\otimes(BE)\otimes(CH),
$$

and

$$
(A\otimes B\otimes C)^+
=
A^+\otimes B^+\otimes C^+,
$$

we get the separated formula

$$
FSF^+
=
(C_xD_xC_x^+)
\otimes
(S_yD_yS_y^+)
\otimes
(S_zD_zS_z^+).
$$

So instead of computing one large $n_{\mathrm{mode}}\times n_{\mathrm{grid}}$ pseudoinverse problem, we compute three one-dimensional problems. If the one-dimensional matrices have shapes

$$
C_x\in\mathbb R^{n_{l_x}\times n_x},\qquad
S_y\in\mathbb R^{n_{l_y}\times n_y},\qquad
S_z\in\mathbb R^{n_{l_z}\times n_z},
$$

then the cost is controlled by the three small pairs $(n_{l_x},n_x)$, $(n_{l_y},n_y)$, and $(n_{l_z},n_z)$, rather than by the full pair $(n_{\mathrm{mode}},n_{\mathrm{grid}})$. This is often the difference between an impossible dense computation and a cheap one.

In code, the dense Kronecker product should usually not be formed unless the final matrix is genuinely needed as a dense array. The one-dimensional factors can be computed as follows:

```python
import numpy as np
from scipy.linalg import pinv


def one_dim_factor(Phi, weight):
    """Compute Phi diag(weight) Phi^+ without forming diag(weight)."""
    return (Phi * weight[None, :]) @ pinv(Phi, check_finite=False)


# x_grid, y_grid, z_grid are one-dimensional grid arrays.
# lx_values, ly_values, lz_values are the selected mode indices.
kx = lx_values[:, None] * np.pi / Lx
ky = ly_values[:, None] * np.pi / Ly
kz = lz_values[:, None] * np.pi / Lz

Cx = np.cos(kx * x_grid[None, :])
Sy = np.sin(ky * y_grid[None, :])
Sz = np.sin(kz * z_grid[None, :])

Ax = one_dim_factor(Cx, sx)
Ay = one_dim_factor(Sy, sy)
Az = one_dim_factor(Sz, sz)

# Only do this if the dense nmode by nmode result is actually needed.
A = np.kron(np.kron(Ax, Ay), Az)
```

If the final operation is applying $FSF^+$ to a vector rather than explicitly storing the whole matrix, it is better to keep the three factors $A_x,A_y,A_z$ and apply them by reshaping the vector into a three-dimensional tensor. For a vector ordered consistently with the Kronecker product above,

```python
def apply_kron_3d(Ax, Ay, Az, v):
    V = v.reshape(Ax.shape[1], Ay.shape[1], Az.shape[1])
    V = np.einsum("ai,ijk->ajk", Ax, V, optimize=True)
    V = np.einsum("bj,ajk->abk", Ay, V, optimize=True)
    V = np.einsum("ck,abk->abc", Az, V, optimize=True)
    return V.reshape(-1)
```

This avoids materializing the full $n_{\mathrm{mode}}\times n_{\mathrm{mode}}$ matrix. The storage drops from order $O(n_{\mathrm{mode}}^2)$ to roughly $
O(n_{l_x}^2+n_{l_y}^2+n_{l_z}^2)$, if only the separated factors are stored.

The other two cosine placements are analogous:

$$
\sin(k_xx)\cos(k_yy)\sin(k_zz),
\qquad
\sin(k_xx)\sin(k_yy)\cos(k_zz).
$$

One simply replaces the corresponding one-dimensional sine matrix by the cosine matrix in that coordinate. If $S$ is not exactly separable but can be well approximated by a short sum of separable terms,

$$
S\approx\sum_{r=1}^R D_x^{(r)}\otimes D_y^{(r)}\otimes D_z^{(r)},
$$

then the same idea gives

$$
FSF^+
\approx
\sum_{r=1}^R
(C_xD_x^{(r)}C_x^+)
\otimes
(S_yD_y^{(r)}S_y^+)
\otimes
(S_zD_z^{(r)}S_z^+).
$$

Thus the exact tensor-product case is not only faster by itself; it is also the natural starting point for low-rank separable approximations of a more general smooth three-dimensional $S$.

## 7. Benchmark

The small examples above are meant to show correctness, not performance. For timing, it is better to use larger matrices and average over repeated runs. To compare the dense methods with the direct-product decomposition on the same problem, the benchmark below generates two-dimensional tensor-product matrices

$$
F=C_x\otimes S_y,\qquad S=D_x\otimes D_y,
$$

and measures the end-to-end time needed to compute $A=FSF^+$. The first six methods treat $F$ as a dense matrix. The last method uses the factorization

$$
(C_xD_xC_x^+)\otimes(S_yD_yS_y^+).
$$

The random generation itself is outside the timed region. For `solve`, Cholesky, and LU, the benchmark uses the smaller normal matrix: $F^\dagger F$ when $m\ge n$, and $FF^\dagger$ when $m<n$.

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
xy_dims = [
    # nx, ny, nlx, nly
    (24, 24, 12, 12),
    (36, 36, 18, 18),
    (48, 48, 24, 24),
]
repeats = 20


def svd_method(case):
    F = case["F"]
    S = case["S"]

    U, sigma, Vh = svd(F, full_matrices=False, check_finite=False)
    tol = np.finfo(float).eps * max(F.shape) * sigma[0]
    sigma_plus = np.where(sigma > tol, 1.0 / sigma, 0.0)
    F_plus = (Vh.T * sigma_plus) @ U.T
    return F @ S @ F_plus


def pinv_method(case):
    F = case["F"]
    S = case["S"]

    return F @ S @ pinv(F, check_finite=False)


def solve_method(case):
    F = case["F"]
    S = case["S"]
    s = case["s"]
    m, n = F.shape

    if m >= n:
        G = F.T @ F
        F_plus = solve(G, F.T, assume_a="pos", check_finite=False)
        return F @ S @ F_plus

    G = F @ F.T
    B = (F * s[None, :]) @ F.T
    return solve(G.T, B.T, assume_a="pos", check_finite=False).T


def lstsq_method(case):
    F = case["F"]
    S = case["S"]

    F_plus, *_ = lstsq(F, np.eye(F.shape[0]), check_finite=False)
    return F @ S @ F_plus


def cholesky_method(case):
    F = case["F"]
    S = case["S"]
    s = case["s"]
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


def lu_method(case):
    F = case["F"]
    S = case["S"]
    s = case["s"]
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


def one_dim_factor(Phi, weight):
    return (Phi * weight[None, :]) @ pinv(Phi, check_finite=False)


def direct_product_method(case):
    Ax = one_dim_factor(case["Cx"], case["sx"])
    Ay = one_dim_factor(case["Sy"], case["sy"])
    return np.kron(Ax, Ay)


def make_case(nx, ny, nlx, nly):
    x = np.linspace(0.0, 1.0, nx)
    y = np.linspace(0.0, 1.0, ny)
    lx = np.arange(1, nlx + 1)
    ly = np.arange(1, nly + 1)

    Cx = np.cos(lx[:, None] * np.pi * x[None, :])
    Sy = np.sin(ly[:, None] * np.pi * y[None, :])
    sx = 1.0 + 0.25 * rng.standard_normal(nx)
    sy = 1.0 + 0.25 * rng.standard_normal(ny)
    F = np.kron(Cx, Sy)
    s = np.kron(sx, sy)

    return {
        "F": F,
        "S": np.diag(s),
        "s": s,
        "Cx": Cx,
        "Sy": Sy,
        "sx": sx,
        "sy": sy,
    }


def mean_time(fn, case):
    fn(case)  # warm-up
    times = []

    for _ in range(repeats):
        start = perf_counter()
        fn(case)
        times.append(perf_counter() - start)

    return np.mean(times)


methods = [
    ("SVD", svd_method),
    ("pinv", pinv_method),
    ("solve", solve_method),
    ("lstsq", lstsq_method),
    ("Cholesky", cholesky_method),
    ("LU", lu_method),
    ("direct product", direct_product_method),
]

print(f"repeats = {repeats}")
print("| grid | modes | F shape | SVD | pinv | solve | lstsq | Cholesky | LU | direct product |")
print("|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|")

for nx, ny, nlx, nly in xy_dims:
    case = make_case(nx, ny, nlx, nly)
    row = [mean_time(method, case) for _, method in methods]

    print(f"| {nx} x {ny} | {nlx} x {nly} | {case['F'].shape[0]} x {case['F'].shape[1]} | " + " | ".join(f"{t:.6f}" for t in row) + " |")
```

Local benchmark from one run of the script above (DP is direct-product):

<div style="overflow-x: auto;">
  <table style="margin: 1rem auto; border-collapse: collapse; border: 1px solid var(--global-divider-color); font-size: 0.92rem; white-space: nowrap;">
    <thead>
      <tr>
        <th style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">grid</th>
        <th style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">modes</th>
        <th style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">F shape</th>
        <th style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">SVD</th>
        <th style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">pinv</th>
        <th style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">solve</th>
        <th style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">lstsq</th>
        <th style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">Cholesky</th>
        <th style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">LU</th>
        <th style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">PD</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">24 x 24</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">12 x 12</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">144 x 576</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">0.015257</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">0.015187</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">0.001692</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">0.013115</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">0.001950</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">0.001279</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">0.000089</td>
      </tr>
      <tr>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">36 x 36</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">18 x 18</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">324 x 1296</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">0.072952</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">0.077010</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">0.006327</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">0.085367</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">0.011742</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">0.007305</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">0.000183</td>
      </tr>
      <tr>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">48 x 48</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">24 x 24</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">576 x 2304</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">0.274851</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">0.291603</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">0.024633</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">0.263048</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">0.024746</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">0.036027</td>
        <td style="border: 1px solid var(--global-divider-color); padding: 0.35rem 0.6rem; text-align: center;">0.000554</td>
      </tr>
    </tbody>
  </table>
</div>

The normal-equation methods are faster than SVD-based methods in the dense benchmark, but this speed comes with the usual numerical tradeoff: they assume full column rank in the tall case or full row rank in the wide case, and they square the condition number through $F^\dagger F$ or $FF^\dagger$. The direct-product method is faster for this separable case because it avoids the full dense pseudoinverse problem.

The relative errors of the direct-product result against the dense `pinv` result were all in the order of magnatude $10^{-15}$.
