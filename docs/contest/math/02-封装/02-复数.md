# 复数

## 实现

```cpp
struct Comp
{
	double real,imag;
	Comp(double x=0,double y=0):real(x),imag(y){}
	Comp operator+(const Comp &rhs) const{return Comp(real+rhs.real,imag+rhs.imag);}
	Comp operator-(const Comp &rhs) const{return Comp(real-rhs.real,imag-rhs.imag);}
	Comp operator*(const Comp &rhs) const{return Comp(real*rhs.real-imag*rhs.imag,real*rhs.imag+rhs.real*imag);}
};
```

