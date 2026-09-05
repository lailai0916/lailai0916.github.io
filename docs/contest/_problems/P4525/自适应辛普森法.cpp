#include <bits/stdc++.h>
#define mid ((l+r)/2)
using namespace std;

const double eps=1e-8;
double a,b,c,d;
double F(double x)
{
	return (c*x+d)/(a*x+b);
}
double simp(double l,double r)
{
	return (F(l)+F(r)+F(mid)*4)*(r-l)/6;
}
double asr(double l,double r,double e,double ans)
{
	double L=simp(l,mid),R=simp(mid,r);
	if(fabs(L+R-ans)<=e*15)return L+R+(L+R-ans)/15;
	return asr(l,mid,e/2,L)+asr(mid,r,e/2,R);
}
double calc(double l,double r,double e)
{
	return asr(l,r,e,simp(l,r));
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	double l,r;
	cin>>a>>b>>c>>d>>l>>r;
	cout<<fixed<<setprecision(6)<<calc(l,r,eps)<<'\n';
	return 0;
}
