#include <bits/stdc++.h>
using namespace std;

const double eps=1e-10;
const int inf=0x3f3f3f3f;
const int N=10005;
double a[N],b[N],c[N];
int n;
double f(double x)
{
	double res=-inf;
	for(int i=1;i<=n;i++)res=max(res,a[i]*x*x+b[i]*x+c[i]);
	return res;
}
int main()
{
	cin.tie(nullptr);
	ios::sync_with_stdio(false);
	int T;
	cin>>T;
	while(T--)
	{
		cin>>n;
		for(int i=1;i<=n;i++)cin>>a[i]>>b[i]>>c[i];
		double l=0,r=1000;
		while(r-l>eps)
		{
			double m1=(l*2+r)/3,m2=(l+r*2)/3;
			if(f(m1)<f(m2))r=m2;
			else l=m1;
		}
		cout<<fixed<<setprecision(4)<<f(l)<<'\n';
	}
	return 0;
}
