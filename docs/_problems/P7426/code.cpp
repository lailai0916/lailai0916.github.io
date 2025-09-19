#include <bits/stdc++.h>
#define f(x,y) (x*60+y)
#define g(x,y,z) (x*3600+y*60+z)
using namespace std;

using ll=long long;
const int inf=0x3f3f3f3f;
const int N=10005;
const int day[13]={0,0,31,59,90,120,151,181,212,243,273,304,334};
const int sun[2][7]={{21,19,17,14,11,7,3},{10,9,8,7,6,4,2}};
const int plan[2][5]={{18,15,12,9,6},{5,4,3,2,1}};
const int test[3][10]=
{
	{f(12,30),f(13,0),f(13,30),f(14,0),f(14,30),f(15,10),f(15,50),f(16,30),f(17,10),f(18,0)},
	{f(6,40),f(6,57),f(7,14),f(7,31),f(7,50),f(8,5),f(8,20),f(8,35),f(8,50),f(9,0)},
	{20,18,16,14,12,10,8,6,4,2}
};
pair<int,string> level[11]={{95,"A"},{90,"A-"},{85,"B+"},{80,"B"},{77,"B-"},{73,"C+"},{70,"C"},{67,"C-"},{63,"D+"},{60,"D"},{0,"F"}};
map<ll,int> mp;
struct Stu
{
	ll id;
	char sex;
	int score,cnt1,cnt2,lst;
	bool operator<(Stu t){return id<t.id;}
}P[N];
int main()
{
	int n;
	scanf("%d",&n);
	for(int i=1;i<=n;i++)
	{
		char t1;
		int a,b,t2;
		scanf("%lld%*c%c%d%d%*c%d%*c%*c%c%d%d",&P[i].id,&P[i].sex,&P[i].score,&a,&b,&t1,&t2,&P[i].cnt1);
		for(int j=0;j<10;j++)if(f(a,b)<=test[P[i].sex=='F'][j]){P[i].score+=test[2][j];break;}
		P[i].score+=(t1=='P'?10:0)+t2;
		P[i].lst=-inf;
		mp[P[i].id]=i;
	}
	int m;
	scanf("%d",&m);
	while(m--)
	{
		ll id;
		int date,h1,m1,s1,h2,m2,s2,a,b,step;
		double L;
		scanf("%d%lld%d%*c%d%*c%d%d%*c%d%*c%d%lf%d%*c%d%*c%d",&date,&id,&h1,&m1,&s1,&h2,&m2,&s2,&L,&a,&b,&step);
		int x=mp[id];
		int len=(L*1000+0.5),tmp=(day[date%10000/100]+date%100)*86400;
		if(len>=(P[x].sex=='M'?3000:1500)&&(g(h2,m2,s2)-g(h1,m1,s1))*2<=len&&(g(h2,m2,s2)-g(h1,m1,s1))*5>=len&&f(a,b)<=f(4,30)&&len*2<=step*3&&g(h1,m1,s1)+tmp-P[x].lst>=21600)
		{
			P[x].lst=g(h2,m2,s2)+tmp;
			P[x].cnt2++;
		}
	}
	for(int i=1;i<=n;i++)
	{
		for(int j=0;j<7;j++)if(P[i].cnt2>=sun[0][j]){P[i].score+=sun[1][j];break;}
		for(int j=0;j<5;j++)if(P[i].cnt1+P[i].cnt2>=plan[0][j]){P[i].score+=plan[1][j];break;}
		printf("%lld %d ",P[i].id,P[i].score);
		for(int j=0;j<11;j++)if(P[i].score>=level[j].first){printf("%s\n",level[j].second.c_str());break;}
	}
	return 0;
}
