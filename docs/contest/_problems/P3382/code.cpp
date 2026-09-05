#include <bits/stdc++.h>
using namespace std;

const double eps=1e-8;
const int N=15;
double a[N];
int n;
double f(double x)
{
	double res=0;
	for(int i=n;i>=0;i--)res=res*x+a[i];
	return res;
}
int main()
{
	cin.tie(nullptr);
	ios::sync_with_stdio(false);
	double l,r;
	cin>>n>>l>>r;
	for(int i=n;i>=0;i--)cin>>a[i];
	while(r-l>eps)
	{
		double m1=(l*2+r)/3,m2=(l+r*2)/3;
		if(f(m1)>f(m2))r=m2;
		else l=m1;
	}
	cout<<fixed<<setprecision(6)<<l<<'\n';
	return 0;
}
