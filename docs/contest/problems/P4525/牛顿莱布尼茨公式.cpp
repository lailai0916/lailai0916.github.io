#include <bits/stdc++.h>
using namespace std;

double a,b,c,d,l,r;
double f1(double x)
{
	return c/a*x+(a*d-b*c)/(a*a)*log(fabs(a*x+b));
}
double f2(double x)
{
	return c/(b*2)*x*x+d/b*x;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	cin>>a>>b>>c>>d>>l>>r;
	cout<<fixed<<setprecision(6)<<(a!=0?f1(r)-f1(l):f2(r)-f2(l))<<'\n';
	return 0;
}
