#include <bits/stdc++.h>
using namespace std;

const double eps=1e-15;
int sgn(double x){return (x>eps)-(x<-eps);}
double divide(int x,int y){return (y!=0?x*1.0/y:INFINITY);}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int m,n;
	double r;
	cin>>m>>n>>r;
	int l1=0,l2=1,r1=1,r2=0,m1=0,m2=0;
	while(l1+r1<=m&&l2+r2<=n)
	{
		m1=l1+r1;
		m2=l2+r2;
		int tmp=sgn(r-divide(m1,m2));
		if(tmp==1){l1=m1;l2=m2;}
		else if(tmp==-1){r1=m1;r2=m2;}
		else{cout<<m1<<'/'<<m2<<'\n';return 0;}
	}
	int tmp=sgn((r-divide(l1,l2))-(divide(r1,r2)-r));
	if(tmp==0){cout<<"TOO MANY"<<'\n';}
	else if(tmp==1){cout<<r1<<'/'<<r2<<'\n';}
	else if(tmp==-1){cout<<l1<<'/'<<l2<<'\n';}
	return 0;
}