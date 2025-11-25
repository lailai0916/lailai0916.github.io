# 变量

## 参考资料

- [变量 - OI Wiki](https://oi-wiki.org/lang/var/)

## 变量范围

|       变量类型       | 字节  |                  最大值                  |                  最小值                  |
| :------------------: | :---: | :--------------------------------------: | :--------------------------------------: |
|        `bool`        |  $1$  |                   $1$                    |                   $0$                    |
|        `char`        |  $1$  |                `CHAR_MAX`                |                `CHAR_MIN`                |
|    `signed char`     |  $1$  |          $127$<br />`SCHAR_MAX`          |         $-128$<br />`SCHAR_MIN`          |
|   `unsigned char`    |  $1$  |          $255$<br />`UCHAR_MAX`          |                   $0$                    |
|       `short`        |  $2$  |         $32767$<br />`SHRT_MAX`          |         $-32768$<br />`SHRT_MIN`         |
|   `unsigned short`   |  $2$  |         $65535$<br />`USHRT_MAX`         |                   $0$                    |
|        `int`         |  $4$  |       $2147483647$<br />`INT_MAX`        |       $-2147483648$<br />`INT_MIN`       |
|    `unsigned int`    |  $4$  |       $4294967295$<br />`UINT_MAX`       |                   $0$                    |
|        `long`        | $4/8$ |                `LONG_MAX`                |                `LONG_MIN`                |
|     `long long`      |  $8$  |  $9223372036854775807$<br />`LLONG_MAX`  | $-9223372036854775808$<br />`LLONG_MIN`  |
| `unsigned long long` |  $8$  | $18446744073709551615$<br />`ULLONG_MAX` |                   $0$                    |
|       `float`        |  $4$  |  $3.40282\times 10^{38}$<br />`FLT_MAX`  | $1.17549\times 10^{-38}$<br />`FLT_MIN`  |
|       `double`       |  $8$  | $1.79769\times 10^{308}$<br />`DBL_MAX`  | $2.22507\times 10^{-308}$<br />`DBL_MIN` |
|    `long double`     | $16$  |        $1.18973\times 10^{4932}$         |        $3.3621\times 10^{-4932}$         |
