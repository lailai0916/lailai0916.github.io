#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=2000005;
int ch[N][26],fa[N],len[N],siz[N],tot=1,last=1;
int cnt[N],id[N];
void extend(int c)
{
	int p=last,cur=++tot;
	last=cur;
	len[cur]=len[p]+1;
	siz[cur]=1;
	for(;p&&!ch[p][c];p=fa[p])ch[p][c]=cur;
	if(!p)fa[cur]=1;
	else
	{
		int q=ch[p][c];
		if(len[q]==len[p]+1)fa[cur]=q;
		else
		{
			int cl=++tot;
			len[cl]=len[p]+1;
			fa[cl]=fa[q];
			memcpy(ch[cl],ch[q],sizeof ch[q]);
			fa[q]=fa[cur]=cl;
			for(;p&&ch[p][c]==q;p=fa[p])ch[p][c]=cl;
		}
	}
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	string s;
	cin>>s;
	for(char c:s)extend(c-'a');
	for(int i=1;i<=tot;i++)cnt[len[i]]++;
	for(int i=1;i<=tot;i++)cnt[i]+=cnt[i-1];
	for(int i=1;i<=tot;i++)id[cnt[len[i]]--]=i;
	ll ans=0;
	for(int i=tot;i>=1;i--)
	{
		int u=id[i];
		siz[fa[u]]+=siz[u];
		if(siz[u]>1)ans=max(ans,(ll)siz[u]*len[u]);
	}
	cout<<ans<<'\n';
	return 0;
}
