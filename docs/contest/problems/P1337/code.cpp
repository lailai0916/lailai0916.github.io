#include <bits/stdc++.h>
using namespace std;

const int N=1005;
double x[N],y[N],w[N];
int n;
double ansx,ansy,ansv;
mt19937 rng(20040525);

double calc(double px,double py)
{
	double sum=0;
	for(int i=1;i<=n;i++)
	{
		double dx=px-x[i],dy=py-y[i];
		sum+=sqrt(dx*dx+dy*dy)*w[i];
	}
	if(sum<ansv)
	{
		ansv=sum;
		ansx=px;
		ansy=py;
	}
	return sum;
}

double frand()
{
	return (double)rng()/rng.max()*2-1;
}

void anneal()
{
	double px=ansx,py=ansy;
	double t=3000;
	while(t>1e-15)
	{
		double nx=px+frand()*t;
		double ny=py+frand()*t;
		double dv=calc(nx,ny)-calc(px,py);
		if(dv<0||exp(-dv/t)*rng.max()>rng())
		{
			px=nx;
			py=ny;
		}
		t*=0.99;
	}
}

int main()
{
	cin>>n;
	double sx=0,sy=0,sw=0;
	for(int i=1;i<=n;i++)
	{
		cin>>x[i]>>y[i]>>w[i];
		sx+=x[i]*w[i];
		sy+=y[i]*w[i];
		sw+=w[i];
	}
	ansx=sx/sw;
	ansy=sy/sw;
	ansv=1e18;
	calc(ansx,ansy);
	for(int i=0;i<50;i++)anneal();
	printf("%.3f %.3f\n",ansx,ansy);
	return 0;
}
