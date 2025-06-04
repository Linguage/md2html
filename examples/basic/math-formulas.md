# 数学公式演示

## 1. 基础数学公式

### 1.1 行内公式

这是一个行内数学公式：$E = mc^2$，这是爱因斯坦的质能方程。

另一个例子：当 $a \neq 0$ 时，二次方程 $ax^2 + bx + c = 0$ 的解为：$x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$

### 1.2 块级公式

下面是一个居中显示的数学公式：

$$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$

## 2. 高等数学

### 2.1 微积分

**导数定义**：

$$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

**定积分的基本定理**：

$$\int_a^b f(x) dx = F(b) - F(a)$$

其中 $F(x)$ 是 $f(x)$ 的原函数。

### 2.2 级数

**泰勒级数**：

$$f(x) = f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \frac{f'''(a)}{3!}(x-a)^3 + \cdots$$

**欧拉公式**：

$$e^{i\theta} = \cos\theta + i\sin\theta$$

当 $\theta = \pi$ 时，得到著名的欧拉恒等式：

$$e^{i\pi} + 1 = 0$$

## 3. 线性代数

### 3.1 矩阵运算

**矩阵乘法**：

$$\mathbf{C} = \mathbf{A}\mathbf{B} \quad \text{其中} \quad c_{ij} = \sum_{k=1}^n a_{ik}b_{kj}$$

**行列式**（3x3矩阵）：

$$\det(\mathbf{A}) = \begin{vmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33}
\end{vmatrix}$$

$$= a_{11}(a_{22}a_{33} - a_{23}a_{32}) - a_{12}(a_{21}a_{33} - a_{23}a_{31}) + a_{13}(a_{21}a_{32} - a_{22}a_{31})$$

### 3.2 特征值和特征向量

对于方阵 $\mathbf{A}$，如果存在标量 $\lambda$ 和非零向量 $\mathbf{v}$ 使得：

$$\mathbf{A}\mathbf{v} = \lambda\mathbf{v}$$

则称 $\lambda$ 为 $\mathbf{A}$ 的特征值，$\mathbf{v}$ 为对应的特征向量。

## 4. 概率论与统计

### 4.1 概率分布

**正态分布密度函数**：

$$f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}$$

**泊松分布**：

$$P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!}$$

### 4.2 贝叶斯定理

$$P(A|B) = \frac{P(B|A)P(A)}{P(B)}$$

这是贝叶斯定理的基本形式，在机器学习和统计推断中有重要应用。

## 5. 复杂公式示例

### 5.1 傅里叶变换

**连续傅里叶变换**：

$$F(\omega) = \int_{-\infty}^{\infty} f(t) e^{-i\omega t} dt$$

**离散傅里叶变换**：

$$F_k = \sum_{n=0}^{N-1} f_n e^{-2\pi i k n / N}$$

### 5.2 薛定谔方程

**时间相关薛定谔方程**：

$$i\hbar \frac{\partial}{\partial t} \Psi(\mathbf{r}, t) = \hat{H} \Psi(\mathbf{r}, t)$$

**时间无关薛定谔方程**：

$$\hat{H}\Psi = E\Psi$$

### 5.3 麦克斯韦方程组

$$\begin{align}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\epsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0\mathbf{J} + \mu_0\epsilon_0\frac{\partial \mathbf{E}}{\partial t}
\end{align}$$

## 6. 数学符号表

### 6.1 希腊字母

| 小写 | 大写 | 名称 | 常用含义 |
|------|------|------|----------|
| $\alpha$ | $A$ | Alpha | 角度、系数 |
| $\beta$ | $B$ | Beta | 角度、系数 |
| $\gamma$ | $\Gamma$ | Gamma | 伽马函数 |
| $\delta$ | $\Delta$ | Delta | 变化量 |
| $\epsilon$ | $E$ | Epsilon | 小量 |
| $\lambda$ | $\Lambda$ | Lambda | 特征值 |
| $\mu$ | $M$ | Mu | 均值 |
| $\sigma$ | $\Sigma$ | Sigma | 标准差、求和 |
| $\pi$ | $\Pi$ | Pi | 圆周率、乘积 |
| $\omega$ | $\Omega$ | Omega | 角频率 |

### 6.2 运算符号

- 求和：$\sum_{i=1}^n a_i$
- 乘积：$\prod_{i=1}^n a_i$
- 积分：$\int_a^b f(x) dx$
- 偏导：$\frac{\partial f}{\partial x}$
- 梯度：$\nabla f$
- 拉普拉斯算子：$\nabla^2 f = \Delta f$

:::info
**提示**：在MD2HTML编辑器中，数学公式使用KaTeX渲染，支持大部分LaTeX数学符号和公式。
:::

## 7. 实际应用示例

### 7.1 机器学习中的数学

**线性回归的损失函数**：

$$J(\theta) = \frac{1}{2m} \sum_{i=1}^m (h_\theta(x^{(i)}) - y^{(i)})^2$$

**梯度下降算法**：

$$\theta_j := \theta_j - \alpha \frac{\partial}{\partial \theta_j} J(\theta)$$

**sigmoid函数**：

$$\sigma(z) = \frac{1}{1 + e^{-z}}$$

### 7.2 深度学习

**softmax函数**：

$$\text{softmax}(z_i) = \frac{e^{z_i}}{\sum_{j=1}^K e^{z_j}}$$

**交叉熵损失**：

$$L = -\sum_{i=1}^n y_i \log(\hat{y}_i)$$

**反向传播算法**：

$$\frac{\partial L}{\partial w_{ij}} = \frac{\partial L}{\partial a_j} \cdot \frac{\partial a_j}{\partial z_j} \cdot \frac{\partial z_j}{\partial w_{ij}}$$

:::success
**成功渲染**：以上数学公式都应该能在MD2HTML编辑器中正确显示。
:::

---

这个示例展示了MD2HTML编辑器对各种数学公式的支持能力，从简单的行内公式到复杂的多行公式都能很好地渲染。
