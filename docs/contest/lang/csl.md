# C++ 标准库

## 参考资料

- [C++ 标准库简介 - OI Wiki](https://oi-wiki.org/lang/csl/)
- [标准模板库 - 维基百科](https://zh.wikipedia.org/wiki/标准模板库)

## 标准模板库

标准模板库（Standard Template Library）是 C++ 标准库的一部分，里面包含了一些模板化的通用的数据结构和算法。

## STL 容器

![](https://oi-wiki.org/lang/csl/images/container1.png)

### 序列式容器

#### array

#### vector

#### deque

:::tip

The “ueue” in “queue” is silent — but not in “deque.”

:::

- [std::deque - cppreference.com](https://zh.cppreference.com/w/cpp/container/deque)

##### 访问

- `front()` 返回队首元素
- `back()` 返回队尾元素

##### 修改

- `push_back()` 将元素添加到容器末尾
- `pop_back()` 移除末元素
- `push_front()` 插入元素到容器起始
- `pop_front()` 移除首元素
- `clear()` 清除内容
- `insert()` 在指定位置前插入元素（传入迭代器和元素，$O(n)$）
- `erase()` 擦除指定位置的元素（传入迭代器，$O(n)$）

##### 容量

- `empty()` 检查容器是否为空
- `size()` 返回元素数

#### list

#### forward_list

### 关联式容器

#### set

#### multiset

#### map

#### multimap

### 无序关联式容器

#### unordered_set

#### unordered_multiset

#### unordered_map

#### unordered_multimap

### 容器适配器

#### stack

- [std::stack - cppreference.com](https://zh.cppreference.com/w/cpp/container/stack)

##### 访问

- `top()` 访问栈顶元素

##### 修改

- `push()` 向栈顶插入元素
- `pop()` 移除栈顶元素

##### 容器

- `empty()` 检查容器适配器是否为空
- `size()` 返回元素数

#### queue

- [std::queue - cppreference.com](https://zh.cppreference.com/w/cpp/container/queue)

##### 访问

- `front()` 访问第一个元素
- `back()` 访问最后一个元素

##### 修改

- `push()` 向队列尾部插入元素
- `pop()` 移除首个元素

##### 容器

- `empty()` 检查容器适配器是否为空
- `size()` 返回元素数

#### priority_queue

## 其他容器（非 STL 容器）

### bitset

### string

### pair

### tuple

## STL 算法
