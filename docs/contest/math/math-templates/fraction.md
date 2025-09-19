# 分数

## 实现

```cpp
using ll=long long;
struct Frac
{
	ll p,q;
	Frac(ll _p,ll _q):p(_p),q(_q){}
	void maintain()
	{
		if(q<0){p=-p;q=-q;}
		ll g=gcd(p,q);
		p/=g;q/=g;
	}
	Frac operator+(const Frac &rhs) const
		{
		Frac res={p*rhs.q+q*rhs.p,q*rhs.q};
		res.maintain();
		return res;
	}
	Frac operator-(const Frac &rhs) const
		{
		Frac res={p*rhs.q-q*rhs.p,q*rhs.q};
		res.maintain();
		return res;
	}
	Frac operator*(const Frac &rhs) const
		{
		Frac res={p*rhs.p,q*rhs.q};
		res.maintain();
		return res;
	}
	Frac operator/(const Frac &rhs) const
		{
		Frac res={p*rhs.q,q*rhs.p};
		res.maintain();
		return res;
	}
};
```
