# Kahan 求和

Kahan 求和算法，又名补偿求和或进位求和算法，是一个用来降低有限精度浮点数序列累加值误差的算法。

## 参考资料

- [Kahan 求和 - OI Wiki](https://oi-wiki.org/misc/kahan-summation/)
- [Kahan summation algorithm - Wikipedia](https://en.wikipedia.org/wiki/Kahan_summation_algorithm)

## 实现

```cpp
double kahan(vector<double> a)
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
