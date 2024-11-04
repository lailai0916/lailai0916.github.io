# Kahan 求和

## 实现

```cpp
double kahan_sum(vector<double> a)
{
	double res=0,c=0;
	for(auto x:a)
	{
		double y=x-c;
		double t=res+y;
		c=(t-res)-y;
		res=t;
	}
	return res;
}
```

