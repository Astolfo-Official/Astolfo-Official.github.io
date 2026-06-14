---
layout: post
title: Input-Output Theory for Planar Fabry-Perot Cavities
date: 2026-06-13
description: A derivation of the two-dimensional cavity photon field, coherent pumping, input-output relations, radiative losses, and the Lindblad master equation for planar Fabry-Perot cavities.
tags: cavity-qed input-output-theory fabry-perot polaritonics CavMD
categories: physics
---

这篇笔记基于 Carusotto 和 Ciuti 的 RMP 综述 [_Quantum fluids of light_](https://doi.org/10.1103/RevModPhys.85.299) 中 Sec. II.A.1 与 Sec. II.A.3 的内容撰写。

## 1. 二维腔光子场

考虑一个沿 $z$ 方向封闭、在横向平面 $\mathbf{r}=(x,y)$ 上平移不变的 Fabry-Perot 腔。由于横向平移对称性，腔光子的自由哈密顿量可以写成

$$
H_{\mathrm{cav}}
=
\int \frac{d^2 k}{(2\pi)^2}
\sum_{\sigma}
\hbar \omega_{\mathrm{cav}}(\mathbf{k})
a^\dagger_{\mathrm{C},\sigma}(\mathbf{k})
a_{\mathrm{C},\sigma}(\mathbf{k}).
$$

这里湮灭算符 $a_{\mathrm{C},\sigma}(\mathbf{k})$ 湮灭一个面内波矢为 $\mathbf{k}$、偏振方向为 $\sigma$ 的腔光子。这些模式算符满足波色子对易关系

$$
\left[
a_{\mathrm{C},\sigma}(\mathbf{k}),
a^\dagger_{\mathrm{C},\sigma'}(\mathbf{k}')
\right]
=
(2\pi)^2
\delta(\mathbf{k}-\mathbf{k}')
\delta_{\sigma\sigma'}, \qquad
\left[
a_{\mathrm{C},\sigma}(\mathbf{k}),
a_{\mathrm{C},\sigma'}(\mathbf{k}')
\right]
=0.
$$

平面腔虽然把光场沿 $z$ 方向限制住了，但在横向平面里光子仍然可以传播。如果只保留一个纵向量子数，光子的频率仍随面内波矢变化。对一个折射率为 $n_0$、腔长为 $\ell_z$ 的简单腔，

$$
\omega_{\mathrm{cav}}(\mathbf{k})
=
\frac{c}{n_0}
\sqrt{
\left(\frac{\pi}{\ell_z}\right)^2
+|\mathbf{k}|^2
}.
$$

在小 $|\mathbf{k}|$ 极限，

$$
\omega_{\mathrm{cav}}(\mathbf{k})
\simeq
\omega_0
+
\frac{\hbar |\mathbf{k}|^2}{2m_{\mathrm{ph}}}, \quad 
\omega_0=\frac{c\pi}{n_0\ell_z},
\quad
m_{\mathrm{ph}}
=
\frac{\hbar\omega_0 n_0^2}{c^2}.
$$

因此可以把平面腔光子当成二维有质量玻色子，其在纵向边界条件给出一个能隙 $\hbar\omega_0$，横向运动则表现为近似抛物线色散。

与动量空间算符对应的二维实空间场算符定义为

$$
\psi_{\mathrm{C},\sigma}(\mathbf{r})
=
\int
\frac{d^2 k}{(2\pi)^2}
a_{\mathrm{C},\sigma}(\mathbf{k})
e^{i\mathbf{k}\cdot\mathbf{r}}.
$$

于是场算符的对易关系可以表示成

$$
\left[
\psi_{\mathrm{C},\sigma}(\mathbf{r}),
\psi^\dagger_{\mathrm{C},\sigma'}(\mathbf{r}')
\right]
=
\delta(\mathbf{r}-\mathbf{r}')
\delta_{\sigma\sigma'}, \qquad
\left[
\psi_{\mathrm{C},\sigma}(\mathbf{r}),
\psi_{\mathrm{C},\sigma'}(\mathbf{r}')
\right]
=0.
$$

但真正可观测的电场仍然依赖三维位置 $(\mathbf{r},z)$，于是我们需要量子化的电场 $\widehat{\mathbf{E}}(\mathbf{r},z)$。先看一个经典实场的例子：

$$
E(t)=E_0\cos\omega t
=
\frac{E_0}{2}e^{-i\omega t}
+
\frac{E_0}{2}e^{i\omega t}.
$$

按照 $e^{-i\Omega t}$ 的约定，第一项对应 $\Omega=+\omega$，称为正频部分；第二项对应 $\Omega=-\omega$，称为负频部分。量子化电磁场时，先把经典电场按 normal modes 展开，再把每个模式的振幅提升为湮灭和产生算符。通常把含有湮灭算符的部分称为正频部分，把它的 Hermitian conjugate 称为负频部分：

$$
\widehat{\mathbf{E}}(\mathbf{r},z)
=
\widehat{\mathbf{E}}^{(+)}(\mathbf{r},z)
+
\widehat{\mathbf{E}}^{(-)}(\mathbf{r},z),
\qquad
\widehat{\mathbf{E}}^{(-)}
=
\left(\widehat{\mathbf{E}}^{(+)}\right)^\dagger .
$$

对平面腔，面内平移对称性决定了横向模式是平面波。这也可以看成 Bloch 定理的特殊情况。若横向存在周期结构，模式一般写成

$$
\mathbf{u}_{\mathbf{k}\sigma}(\mathbf{r},z)
=
e^{i\mathbf{k}\cdot\mathbf{r}}
\mathbf{w}_{\mathbf{k}\sigma}(\mathbf{r},z),
\qquad
\mathbf{w}_{\mathbf{k}\sigma}(\mathbf{r}+\mathbf{R},z)
=
\mathbf{w}_{\mathbf{k}\sigma}(\mathbf{r},z),
$$

其中 $\mathbf{R}$ 是横向晶格矢量。平面 Fabry-Perot 腔没有横向周期调制，所以周期部分退化为只依赖 $z$ 的纵向包络，$\mathbf{w}_{\mathbf{k}\sigma}(\mathbf{r},z)\rightarrow\mathbf{E}_{\sigma}(\mathbf{k},z)$。因此模式指标可取为 $\lambda=(\mathbf{k},\sigma)$，模式函数为

$$
\mathbf{u}_{\mathbf{k}\sigma}(\mathbf{r},z)
=
e^{i\mathbf{k}\cdot\mathbf{r}}
\mathbf{E}_{\sigma}(\mathbf{k},z).
$$

于是 normal mode expansion 给出

$$
\widehat{\mathbf{E}}(\mathbf{r},z)
=
\sum_\lambda
\mathbf{u}_\lambda(\mathbf{r},z)a_\lambda
+\mathrm{H.c.}
=
\int
\frac{d^2 k}{(2\pi)^2}
\sum_\sigma
e^{i\mathbf{k}\cdot\mathbf{r}}
\mathbf{E}_{\sigma}(\mathbf{k},z)
a_{\mathrm{C},\sigma}(\mathbf{k})
+\mathrm{H.c.}
$$

其中 $\mathbf{E}_{\sigma}(\mathbf{k},z)$ 是纵向模式函数。它包含镜子边界条件、介质折射率、以及单光子能量归一化。对于最简单的金属镜空腔，腔长为 $\ell_z$、折射率为 $n_0$，最低纵向模式近似为正弦形式：

$$
\mathbf{E}_{\sigma}(\mathbf{k},z)
=
\sqrt{
\frac{4\pi\hbar\omega_{\mathrm{cav}}}
{\ell_z n_0^2}
}
\mathbf{e}_\sigma
\sin\left(\frac{\pi z}{\ell_z}\right).
$$

这个公式说明了两个容易混淆的点。第一，二维场算符 $\psi_{\mathrm{C},\sigma}(\mathbf{r})$ 负责横向传播与统计性质；第二，物理电场还要乘上纵向模式函数，镜子的微观结构会改变这个函数。

## 2. 相干泵浦：外部光场如何进入腔

输入输出理论给出外部相干激光与腔内二维光子场之间的联系。由于平面腔保持面内动量守恒，一个入射频率为 $\omega$、入射角为 $\theta_{\mathrm{inc}}$ 的平面波只耦合到满足

$$
|\mathbf{k}|
=
\frac{\omega}{c}\sin\theta_{\mathrm{inc}}
$$

的腔场分量。换句话说，正入射泵浦主要驱动 $\mathbf{k}=0$ 模；斜入射泵浦选择非零面内动量；有限光斑则因为有横向 Fourier 宽度，会同时驱动一簇 $\mathbf{k}$ 模。

若入射场在偏振 $\sigma$ 上的横向 Fourier 分量为 $\widetilde{E}^{\mathrm{inc}}_{\sigma}(\mathbf{k},t)$，泵浦哈密顿量可写为

$$
H_{\mathrm{pump}}
=
i\hbar
\int
\frac{d^2 k}{(2\pi)^2}
\sum_\sigma
\left[
\eta^{\mathrm{fr}}_{\sigma}(\mathbf{k})
\widetilde{E}^{\mathrm{inc}}_{\sigma}(\mathbf{k},t)
a^\dagger_{\mathrm{C},\sigma}(\mathbf{k})
-
\eta^{\mathrm{fr}*}_{\sigma}(\mathbf{k})
\widetilde{E}^{\mathrm{inc}*}_{\sigma}(\mathbf{k},t)
a_{\mathrm{C},\sigma}(\mathbf{k})
\right].
$$

$\eta^{\mathrm{fr}}_{\sigma}(\mathbf{k})$ 描述前镜把外部入射场注入腔内的效率，这代表着前镜不完美。它与前镜透射振幅有关，也可以依赖 $\mathbf{k}$ 与偏振方向 $\sigma$ 。

由于镜子的不完美，腔内光子会通过前后镜重新辐射到外部。我们考虑漏出的光子产生的电场并重新把外部场算符直接写成腔内场算符与入射场的组合。对每个 $\mathbf{k}$ 和 $\sigma$，

$$
\widehat{E}^{\mathrm{tr}}_{\sigma}(\mathbf{k},t)
=
\kappa^{\mathrm{back}}_{\sigma}(\mathbf{k})
a_{\mathrm{C},\sigma}(\mathbf{k},t),
$$

$$
\widehat{E}^{\mathrm{refl}}_{\sigma}(\mathbf{k},t)
=
E^{\mathrm{inc}}_{\sigma}(\mathbf{k},t)
+
\kappa^{\mathrm{fr}}_{\sigma}(\mathbf{k})
a_{\mathrm{C},\sigma}(\mathbf{k},t).
$$

透射场只来自腔内光经后镜泄漏；反射场则有两部分：入射光在前镜的直接反射，以及腔内场从前镜重新辐射出来的贡献。实验中的反射谱、透射谱和干涉线形，正是这两条路径叠加后的结果。

这里隐含了 Markov 近似：镜子的透射过程被看作几乎瞬时，所以 $\eta$ 与 $\kappa$ 不显含外部输入场的频率，输入输出关系在时间上局域。对薄金属镜这很自然；对 DBR 镜则需要更细致的 Maxwell 方程或 transfer matrix 计算来得到有效参数。

把 Fabry-Perot 腔视为一个开放量子系统，在把腔外连续辐射模 trace out 后，腔场密度矩阵满足

$$
\frac{d\rho}{dt}
=
-\frac{i}{\hbar}
\left[H,\rho\right]
+
\mathcal{L}[\rho].
$$

若腔外辐射模温度远低于腔光子频率，即 $k_B T\ll \hbar\omega_{\mathrm{cav}}$，并且辐射耦合满足 Markov 近似，辐射损耗的 Lindblad 项为

$$
\mathcal{L}_{\mathrm{rad}}[\rho]
=
\int
\frac{d^2 k}{(2\pi)^2}
\sum_\sigma
\frac{\gamma^{\mathrm{rad}}_{\sigma}(\mathbf{k})}{2}
\left[
2a_{\mathrm{C},\sigma}(\mathbf{k})\rho
a^\dagger_{\mathrm{C},\sigma}(\mathbf{k})
-
a^\dagger_{\mathrm{C},\sigma}(\mathbf{k})
a_{\mathrm{C},\sigma}(\mathbf{k})\rho
-
\rho
a^\dagger_{\mathrm{C},\sigma}(\mathbf{k})
a_{\mathrm{C},\sigma}(\mathbf{k})
\right].
$$

这里 $\gamma^{\mathrm{rad}}_{\sigma}(\mathbf{k})$ 是模式分辨的辐射衰减率。它与前后镜输出耦合强度有关，直观上正比于两面镜透射率贡献之和：

$$
\gamma^{\mathrm{rad}}_{\sigma}(\mathbf{k})
\propto
\left|
\kappa^{\mathrm{fr}}_{\sigma}(\mathbf{k})
\right|^2
+
\left|
\kappa^{\mathrm{back}}_{\sigma}(\mathbf{k})
\right|^2.
$$

如果腔材料吸收、散射或其他非辐射通道不可忽略，可以再加一个同样形式的非辐射 Lindblad 项。总衰减率写作

$$
\gamma_{\mathrm{C},\sigma}(\mathbf{k})
=
\gamma^{\mathrm{rad}}_{\sigma}(\mathbf{k})
+
\gamma^{\mathrm{nrad}}_{\sigma}(\mathbf{k}).
$$

因此每个模式的光子数寿命是

$$
\tau_{\mathrm{C},\sigma}(\mathbf{k})
=
\frac{1}
{\gamma_{\mathrm{C},\sigma}(\mathbf{k})}.
$$

这比单模记号 $\tau_c=1/\gamma$ 更精确：平面腔中的寿命原则上是 $\mathbf{k}$ 与偏振依赖的。

一般来说，给定具体腔结构后，$\eta$、$\kappa$ 和 $\gamma$ 的数值并不能只靠输入输出理论本身决定，而需要求解电磁场穿过整个器件时的 Maxwell 方程。不过在前后镜相同的对称腔中，可以写出一些有用的简化关系：

$$
\eta^{\mathrm{fr}}_{\sigma}(\mathbf{k})
=
\eta^{\mathrm{back}}_{\sigma}(\mathbf{k}),
\quad
\kappa^{\mathrm{fr}}_{\sigma}(\mathbf{k})
=
\kappa^{\mathrm{back}}_{\sigma}(\mathbf{k}),
$$

此时辐射衰减率满足

$$
\gamma^{\mathrm{rad}}_{\sigma}(\mathbf{k})
=
-2
\eta_{\sigma}(\mathbf{k})
\kappa_{\sigma}(\mathbf{k}).
$$

## 3. 单模情形 $(\mathbf{k}_{\parallel}=0)$

如果只保留一个被泵浦的模式，例如正入射时的 $\mathbf{k}=0$、固定偏振 $\sigma$，二维积分和偏振求和就退化为一个单模算符 $a$。此时自由腔场哈密顿量变成

$$
H_{\mathrm{cav}}
=
\hbar\omega_c a^\dagger a.
$$

相干泵浦哈密顿量也从模式分辨形式退化为

$$
H_{\mathrm{pump}}
=
i\hbar
\left[
\eta E_{\mathrm{inc}}(t)a^\dagger
-
\eta^*E_{\mathrm{inc}}^*(t)a
\right].
$$

因此单模有效哈密顿量可以写成

$$
H_{\mathrm{single}}(t)
=
\hbar\omega_c a^\dagger a
+
i\hbar
\left[
\eta E_{\mathrm{inc}}(t)a^\dagger
-
\eta^*E_{\mathrm{inc}}^*(t)a
\right].
$$

若再加入前后镜导致的输入和损耗，上面的公式退化为熟悉的单模 Langevin 图像：

$$
\dot a
=
\left(
-i\omega_c
-\frac{\gamma}{2}
\right)a
+
\sqrt{\gamma_{\mathrm{fr}}}\,b_{\mathrm{in}}^{\mathrm{fr}}(t)
+
\sqrt{\gamma_{\mathrm{back}}}\,b_{\mathrm{in}}^{\mathrm{back}}(t).
$$

若只从前镜入射，前端输入含有相干振幅，后端输入通常是 vacuum noise。输出关系则可写成

$$
b_{\mathrm{out}}^{\mathrm{fr}}(t)
=
b_{\mathrm{in}}^{\mathrm{fr}}(t)
+
\kappa_{\mathrm{fr}}a(t),
\quad
b_{\mathrm{out}}^{\mathrm{back}}(t)
=
\kappa_{\mathrm{back}}a(t),
$$

其中整体符号取决于镜面反射相位约定。不同文献可能把第二项写成 $-\sqrt{\gamma}a$；物理结果不依赖这个符号本身，只要求泵浦、反射和透射的相位约定一致。

对于前后镜相同的对称腔，有

$$
\eta^{\mathrm{fr}}_{\sigma}(\mathbf{k})
=
\eta^{\mathrm{back}}_{\sigma}(\mathbf{k}),
\quad
\kappa^{\mathrm{fr}}_{\sigma}(\mathbf{k})
=
\kappa^{\mathrm{back}}_{\sigma}(\mathbf{k}).
$$

在最简单的正入射、空腔、Fabry-Perot 边界条件下，若两面无损金属镜相同、间距为 $\ell_z$，且镜子的透射振幅为 $T\ll 1$，RMP 综述给出的系数量级可写为

$$
\eta
=
\frac{cT}{2\ell_z}
\sqrt{
\frac{\ell_z}
{\pi\hbar\omega_{\mathrm{cav}}}
}, \quad
\kappa
=
-T
\sqrt{
\frac{\pi\hbar\omega_{\mathrm{cav}}}
{\ell_z}
}.
$$

对称腔中辐射衰减率可由输入输出系数写成

$$
\gamma_{\mathrm{rad}}
=
-2\eta\kappa
=
\frac{cT^2}{\ell_z}.
$$

因此这个单模 Fabry-Perot 腔的光子数寿命为

$$
\tau_c
=
\frac{1}{\gamma_{\mathrm{rad}}}
=
\frac{\ell_z}{cT^2}.
$$

实际 DBR 微腔或含介质结构中，$\eta$、$\kappa$、$\gamma$ 一般需要由 Maxwell 方程的具体边界问题决定，而不是只靠这个金属镜近似。
