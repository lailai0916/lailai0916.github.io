#include<cstdio>
char *s={"#include<cstdio>%cchar *s={%c%s%c};%cint main(){printf(s,10,34,s,34,10);return 0;}"};
int main(){printf(s,10,34,s,34,10);return 0;}