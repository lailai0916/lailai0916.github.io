#include <bits/stdc++.h>
using namespace std;

const int N=500005;
int ch[N][26],fail[N],len[N],cnt[N];
string s;
int n;
int get_fail(int u)
{
	while(s[n-len[u]-1]!=s[n])u=fail[u];
	return u;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	cin>>s;
	s='#'+s;
	fail[0]=1;
	len[1]=-1;
	int tot=1,last=0,k=0,m=s.size()-1;
	for(n=1;n<=m;n++)
	{
		s[n]=(s[n]-97+k)%26+97;
		int p=get_fail(last);
		int c=s[n]-'a';
		if(!ch[p][c])
		{
			++tot;
			len[tot]=len[p]+2;
			fail[tot]=ch[get_fail(fail[p])][c];
			cnt[tot]=cnt[fail[tot]]+1;
			ch[p][c]=tot;
		}
		last=ch[p][c];
		k=cnt[last];
		cout<<k<<' ';
	}
	return 0;
}
