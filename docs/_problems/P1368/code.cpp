#include <bits/stdc++.h>
using namespace std;

int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	vector<int> a(n<<1);
	for(int p=0;p<n;p++)
	{
		cin>>a[p];
		a[p+n]=a[p];
	}
	int i=0,j=1,k=0;
	while(k<n&&i<n&&j<n)
	{
		if(a[i+k]==a[j+k]){k++;continue;}
		if(a[i+k]>a[j+k])i+=k+1;
		else j+=k+1;
		if(i==j)j++;
		k=0;
	}
	for(int p=0;p<n;p++)cout<<a[p+min(i,j)]<<' ';
	return 0;
}
