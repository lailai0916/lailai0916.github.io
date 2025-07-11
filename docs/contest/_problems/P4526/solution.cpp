#include <bits/stdc++.h>
#define mid ((l+r)/2)
using namespace std;

const double eps=1e-8;
double a;
double F(double x)
{
	return pow(x,a/x-x);
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
	cin>>a;
	if(a<0)cout<<"orz"<<'\n';
	else cout<<fixed<<setprecision(5)<<calc(eps,20,eps)<<'\n';
	return 0;
}