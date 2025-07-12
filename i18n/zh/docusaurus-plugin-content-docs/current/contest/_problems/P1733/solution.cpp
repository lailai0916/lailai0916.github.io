#include <bits/stdc++.h>
using namespace std;

const int L=1;
const int R=1000000000;
int main()
{
	int l=L,r=R+1;
	while(l<r)
	{
		int mid=l+r>>1;
		cout<<mid<<'\n'<<flush;
		int t;
		cin>>t;
		if(t==0)break;
		else if(t==1)r=mid;
		else if(t==-1)l=mid+1;
	}
	return 0;
}