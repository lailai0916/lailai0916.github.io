# 快速傅立叶变换（FFT）

## 参考资料

- [快速傅里叶变换 - OI Wiki](https://oi-wiki.org/math/poly/fft/)

## 思路

首先进行正变换，然后逐位相乘，最后通过逆变换得到答案。

## 复数

```cpp
struct Comp
{
	double real,imag;
	Comp(double real=0.0,double imag=0.0):real(real),imag(imag){}
	Comp operator+(const Comp &rhs) const{return Comp(real+rhs.real,imag+rhs.imag);}
	Comp operator-(const Comp &rhs) const{return Comp(real-rhs.real,imag-rhs.imag);}
	Comp operator*(const Comp &rhs) const{return Comp(real*rhs.real-imag*rhs.imag,real*rhs.imag+rhs.real*imag);}
	Comp operator/(const Comp &rhs) const{return Comp((real*rhs.real+imag*rhs.imag)/(rhs.real*rhs.real+rhs.imag*rhs.imag),(imag*rhs.real-real*rhs.imag)/(rhs.real*rhs.real+rhs.imag*rhs.imag));}
};
```

## 例题

### 洛谷 P3803 【模板】多项式乘法（FFT）

<Problem id="P3803" />

### 洛谷 P1919 【模板】高精度乘法 | A\*B Problem 升级版

<Problem id="P1919" />
