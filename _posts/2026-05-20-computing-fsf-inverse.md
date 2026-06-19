---
layout: post
title: Computing Large Scale Matrices Product with Generalized Inverse \(FSF^+\)
post_title: Computing \(FSF^+\)
date: 2026-05-20
description: A numerical linear algebra note on generalized inverses, SVD, scipy.linalg.solve, Cholesky decomposition, and LU decomposition for \(FSF^+\).
tags: numerical-linear-algebra scipy matrix-computation
categories: math
---

Consider the matrix expression $A = F S F^+$, where $F$ is a general matrix, not necessarily square, $S$ is a given diagonal matrix, and $F^+$ denotes the Moore-Penrose generalized inverse which satisfies 

$$FF^+F=F$$

## 1. SVD method

The most robust way to define and compute the generalized inverse is through the singular value decomposition. Let

$$
F = U\Sigma V^{\dagger},
$$

where $U$ and $V$ are unitary matrices, $V^{\dagger}$ is the conjugate transpose of $V$, and $\Sigma$ is rectangular diagonal with singular values $\sigma_i\ge 0$. The Moore-Penrose inverse of general matrix $F$ is defined as

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

The function `scipy.linalg.solve` solves a square linear system $AX=B$. It becomes useful after we reduce the generalized inverse to a square system under rank assumptions. Assume $F\in\mathbb C^{m\times n}$ has full column rank

$$
FF^+F=F \quad \Leftrightarrow \quad F^{\dagger}FF^+F=F^{\dagger}F \quad \Leftrightarrow \quad F^+ = (F^\dagger F)^{-1}F^\dagger.
$$

Let $G = F^\dagger F$, which is an $n\times n$ Hermitian positive definite matrix, and $F^+ = G^{-1}F^\dagger$. Instead of forming $G^{-1}$ explicitly, in `scipy` we solve

$$
G X = F^\dagger \quad \Rightarrow \quad X=F^+ \quad \Rightarrow \quad FSF^+=FSX.
$$

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

If $F\in\mathbb R^{m\times n}$ has full row rank, then

$$
F^+ = F^\dagger(FF^\dagger)^{-1}.
$$

Therefore, when $S$ is diagonal,

$$
FSF^+ = FSF^\dagger(FF^\dagger)^{-1}.
$$

If we define $G = FF^\dagger,\ B = FSF^\dagger$, then the target matrix can be computed as

$$
FSF^+ = BG^{-1} \quad \Leftrightarrow \quad FSF^+G = B \quad \Leftrightarrow \quad G^{\dagger}(FSF^+)^{\dagger} = B^{\dagger}.
$$

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

The code above solves

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

## 3. Cholesky decomposition

If $F$ has full column rank, then $G = F^\dagger F$ is Hermitian positive definite. Hence we can compute the generalized inverse through a Cholesky factorization of $G$:

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

## 4. LU decomposition

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

## 5. Least-squares viewpoint

The generalized inverse $FF^+=I$ can be optimized via least-squares method as

$$
F^+=\min_X \|FX-I\|_2.
$$

Scipy exposes this directly through `scipy.linalg.lstsq`:

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

## 6. Using the tensor-product structure of $F$ and $S$

The discussion above treats $F$ as a general dense matrix. If $F$ has tensor-product structure, this can reduce the computation dramatically. Let the grid points be uniformly distributed in a rectangular box

$$
x\in[0,L_x],\qquad y\in[0,L_y],\qquad z\in[0,L_z],
$$

with $n_x,n_y,n_z$ grid points, satisifying $n_{\mathrm{grid}}=n_xn_yn_z$.

For the mode indices,

$$
k_x=\frac{l_x\pi}{L_x},\qquad
k_y=\frac{l_y\pi}{L_y},\qquad
k_z=\frac{l_z\pi}{L_z}.
$$

If there are $n_{l_x},n_{l_y},n_{l_z}$ allowed mode indices in the three directions, satisifying $n_{\mathrm{mode}}=n_{l_x}n_{l_y}n_{l_z}$.

The mode functions along $x,y,z$-axis are defined as

$$
\begin{aligned}
F_{(l_x,l_y,l_z),(i,j,k)}^x&=\cos(k_xx_i)\sin(k_yy_j)\sin(k_zz_k),\\
F_{(l_x,l_y,l_z),(i,j,k)}^y&=\sin(k_xx_i)\cos(k_yy_j)\sin(k_zz_k),\\
F_{(l_x,l_y,l_z),(i,j,k)}^z&=\sin(k_xx_i)\sin(k_yy_j)\cos(k_zz_k).
\end{aligned}
$$

Take $F_{(l_x,l_y,l_z),(i,j,k)}^x$ for example, define the one-dimensional matrices

$$
(C_x)_{l_x,i}=\cos(k_xx_i),\qquad
(S_y)_{l_y,j}=\sin(k_yy_j),\qquad
(S_z)_{l_z,k}=\sin(k_zz_k).
$$

Then, up to the chosen flattening order of the multi-indices $F = C_x\otimes S_y\otimes S_z$ with shape $n_{\mathrm{mode}}\times n_{\mathrm{grid}}$. It is a Kronecker product of three much smaller one-dimensional matrices.

Now suppose the smooth grid function also separates $s(x_i,y_j,z_k)=s_x(x_i)s_y(y_j)s_z(z_k)$. As a diagonal matrix on the three-dimensional grid, this means

$$
S = \operatorname{diag}(s_x)\otimes \operatorname{diag}(s_y)\otimes \operatorname{diag}(s_z) = D_x\otimes D_y\otimes D_z.
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

The small examples above are meant to show correctness, not performance. To compare the dense methods with the direct-product decomposition on the same problem, the benchmark below generates two-dimensional tensor-product matrices

$$
F=C_x\otimes S_y,\qquad S=D_x\otimes D_y,
$$

and measures the end-to-end time needed to compute $A=FSF^+$. The first six methods treat $F$ as a dense matrix. The last method uses the factorization

$$
(C_xD_xC_x^+)\otimes(S_yD_yS_y^+).
$$

The diagonal entries of $D_x$ and $D_y$ are generated by a fixed smooth cutoff function, so each size gives a deterministic pair $(F,S)$. Each method is timed once per size. For `solve`, Cholesky, and LU, the benchmark uses the smaller normal matrix: $F^\dagger F$ when $m\ge n$, and $FF^\dagger$ when $m<n$.

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

xy_dims = [
    # nx, ny, nlx, nly
    (16, 16, 8, 8),
    (24, 24, 12, 12),
    (32, 32, 16, 16),
    (40, 40, 20, 20),
    (48, 48, 24, 24),
    (56, 56, 28, 28),
]


def abc(grid_1d, r01=0.05, r10=0.95):
    if len(grid_1d) < 3:
        return np.ones_like(grid_1d)

    grid_1d = np.array(grid_1d)
    r00, r11 = grid_1d[0], grid_1d[-1]

    S = np.zeros_like(grid_1d)
    middle = np.where((grid_1d < r10) & (grid_1d > r01))[0]
    S[middle] = 1

    l_side = np.where((grid_1d < r01) & (grid_1d > r00))[0]
    r_side = np.where((grid_1d < r11) & (grid_1d > r10))[0]

    def smooth(x, l, r, p):
        frac = (l - r) / (l - x) + (r - l) / (x - r)
        if p:
            return 1 / (1 + np.exp(-frac))
        return 1 / (1 + np.exp(frac))

    l_value = np.array(
        [smooth(i, l=r00, r=r01, p=False) for i in grid_1d[l_side]]
    )
    r_value = np.array(
        [smooth(i, l=r10, r=r11, p=True) for i in grid_1d[r_side]]
    )
    S[l_side] = l_value
    S[r_side] = r_value

    return S


def weighted_F(case):
    return case["F"] * case["s"][None, :]


def svd_method(case):
    F = case["F"]

    U, sigma, Vh = svd(F, full_matrices=False, check_finite=False)
    tol = np.finfo(float).eps * max(F.shape) * sigma[0]
    sigma_plus = np.where(sigma > tol, 1.0 / sigma, 0.0)
    F_plus = (Vh.T * sigma_plus) @ U.T
    return weighted_F(case) @ F_plus


def pinv_method(case):
    return weighted_F(case) @ pinv(case["F"], check_finite=False)


def solve_method(case):
    F = case["F"]
    m, n = F.shape

    if m >= n:
        G = F.T @ F
        F_plus = solve(G, F.T, assume_a="pos", check_finite=False)
        return weighted_F(case) @ F_plus

    G = F @ F.T
    B = weighted_F(case) @ F.T
    return solve(G.T, B.T, assume_a="pos", check_finite=False).T


def cholesky_method(case):
    F = case["F"]
    m, n = F.shape

    if m >= n:
        G = F.T @ F
        c, lower = cho_factor(G, check_finite=False)
        F_plus = cho_solve((c, lower), F.T, check_finite=False)
        return weighted_F(case) @ F_plus

    G = F @ F.T
    B = weighted_F(case) @ F.T
    c, lower = cho_factor(G, check_finite=False)
    return cho_solve((c, lower), B.T, check_finite=False).T


def lu_method(case):
    F = case["F"]
    m, n = F.shape

    if m >= n:
        G = F.T @ F
        lu, piv = lu_factor(G, check_finite=False)
        F_plus = lu_solve((lu, piv), F.T, check_finite=False)
        return weighted_F(case) @ F_plus

    G = F @ F.T
    B = weighted_F(case) @ F.T
    lu, piv = lu_factor(G, check_finite=False)
    return lu_solve((lu, piv), B.T, check_finite=False).T


def lstsq_method(case):
    F = case["F"]
    F_plus, *_ = lstsq(F, np.eye(F.shape[0]), check_finite=False)
    return weighted_F(case) @ F_plus


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
    sx = abc(x)
    sy = abc(y)
    F = np.kron(Cx, Sy)
    s = np.kron(sx, sy)

    return {
        "F": F,
        "s": s,
        "Cx": Cx,
        "Sy": Sy,
        "sx": sx,
        "sy": sy,
    }


def time_once(fn, case):
    start = perf_counter()
    fn(case)
    return perf_counter() - start


methods = [
    ("SVD", svd_method),
    ("pinv", pinv_method),
    ("solve", solve_method),
    ("Cholesky", cholesky_method),
    ("LU", lu_method),
    ("lstsq", lstsq_method),
    ("direct product", direct_product_method),
]

print(
    "| F shape | SVD | pinv | solve | "
    "Cholesky | LU | lstsq | direct product |"
)
print("|---:|---:|---:|---:|---:|---:|---:|---:|")

for nx, ny, nlx, nly in sorted(
    xy_dims,
    key=lambda dims: (dims[2] * dims[3], dims[0] * dims[1]),
):
    case = make_case(nx, ny, nlx, nly)
    row = [time_once(method, case) for _, method in methods]

    prefix = f"| {nlx}^2 x {nx}^2 | "

    print(
        prefix
        + " | ".join(f"{elapsed:.1e}" for elapsed in row)
        + " |"
    )
```

Local benchmark from the script above (DP is direct-product):

$$
\begin{array}{c c c c c c c c}
\hline
F\text{ shape} & \text{SVD} & \text{pinv} & \text{solve} & \text{Cholesky} & \text{LU} & \text{lstsq} & \text{DP}\\
\hline
8^2\times16^2 & 1.7\times10^{-3} & 2.4\times10^{-3} & 1.7\times10^{-3} & 2.0\times10^{-3} & 1.4\times10^{-3} & 2.8\times10^{-3} & 1.1\times10^{-4}\\
12^2\times24^2 & 1.5\times10^{-2} & 3.2\times10^{-2} & 2.0\times10^{-2} & 2.0\times10^{-2} & 1.9\times10^{-2} & 3.5\times10^{-2} & 1.6\times10^{-4}\\
16^2\times32^2 & 8.5\times10^{-2} & 1.9\times10^{-1} & 1.2\times10^{-1} & 1.2\times10^{-1} & 1.1\times10^{-1} & 2.2\times10^{-1} & 3.9\times10^{-4}\\
20^2\times40^2 & 3.2\times10^{-1} & 7.5\times10^{-1} & 4.7\times10^{-1} & 4.7\times10^{-1} & 4.4\times10^{-1} & 8.0\times10^{-1} & 4.4\times10^{-4}\\
24^2\times48^2 & 9.2\times10^{-1} & 2.3\times10^{0} & 1.4\times10^{0} & 1.4\times10^{0} & 1.3\times10^{0} & 2.4\times10^{0} & 7.2\times10^{-4}\\
28^2\times56^2 & 2.3\times10^{0} & 5.9\times10^{0} & 3.6\times10^{0} & 3.6\times10^{0} & 3.4\times10^{0} & 6.2\times10^{0} & 1.0\times10^{-3}\\
\hline
\end{array}
$$

Here $F\text{ shape}=n_l^2\times n_x^2$ means the dense tensor-product matrix has $n_l \times n_l$ two-dimensional modes and $n_x \times n_x$ two-dimensional grid points.
