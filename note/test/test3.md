$\begin{align}
  S &=\displaystyle\sum^n_{a_1=1}\sum^n_{a_2=1}\cdots\sum^n_{a_k=1}\dfrac{\max^k_{i=1}\{a_i\}\times \min^k_{i=1}\{a_i\}}{\max^k_{i=1}\{a_i\}-\min^k_{i=1}\{a_i\}+1} \\
  &= \displaystyle\sum_{x=1}^n\sum_{y=1}^x\left(\left((x-y+1)^k-2(x-y)^k+(x-y-1)^k\right)\times\dfrac{x\times y}{x-y+1}\right) \\
  &= \displaystyle\sum_{i=0}^{n-1}\left(\sum_{j=1}^{n-i}\dfrac{j\cdot(j+i)}{i+1}\right)\cdot\left((i+1)^k-2i^k+(i-1)^k\right) \\
  &= \displaystyle\sum_{i=0}^{n-1}\left(\sum_{j=1}^{n-i}j^2+i\sum_{j=1}^{n-i}j\right)\cdot\dfrac{(i+1)^k-2i^k+(i-1)^k}{i+1} \\
  &= \displaystyle\sum_{i=0}^{n-1}\left(\dfrac{(n-i)(n-i+1)(2n-2i+1)}{6}+i\dfrac{(n-i)(n-i+1)}{2}\right)\cdot\dfrac{(i+1)^k-2i^k+(i-1)^k}{i+1}
\end{align}$

