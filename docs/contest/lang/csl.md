# 标准库

## 参考资料

- [C++ 标准库简介 - OI Wiki](https://oi-wiki.org/lang/csl/)
- [标准模板库 - 维基百科](https://zh.wikipedia.org/zh-cn/标准模板库)

## 标准模板库

标准模板库（STL，Standard Template Library）是 C++ 标准库的一部分，里面包含了一些模板化的通用的数据结构和算法。

## STL 容器

![](https://oi-wiki.org/lang/csl/images/container1.png)

### 序列式容器

#### array

- [`std::array`](https://en.cppreference.com/w/cpp/container/array.html)

#### vector

- [`std::vector`](https://en.cppreference.com/w/cpp/container/vector.html)

#### deque

- [`std::deque`](https://en.cppreference.com/w/cpp/container/deque.html)

> The "ueue" in "queue" is silent, but not in "deque."

访问：

- `front()` 返回队首元素
- `back()` 返回队尾元素

修改：

- `push_back()` 将元素添加到容器末尾
- `pop_back()` 移除末元素
- `push_front()` 插入元素到容器起始
- `pop_front()` 移除首元素
- `clear()` 清除内容
- `insert()` 在指定位置前插入元素（传入迭代器和元素，$O(n)$）
- `erase()` 擦除指定位置的元素（传入迭代器，$O(n)$）

容量：

- `empty()` 检查容器是否为空
- `size()` 返回元素数

#### list

- [`std::list`](https://en.cppreference.com/w/cpp/container/list.html)

#### forward_list

- [`std::forward_list`](https://en.cppreference.com/w/cpp/container/forward_list.html)

### 关联式容器

#### set

- [`std::set`](https://en.cppreference.com/w/cpp/container/set.html)

#### multiset

- [`std::multiset`](https://en.cppreference.com/w/cpp/container/multiset.html)

#### map

- [`std::map`](https://en.cppreference.com/w/cpp/container/map.html)

#### multimap

- [`std::multimap`](https://en.cppreference.com/w/cpp/container/multimap.html)

### 无序关联式容器

#### unordered_set

- [`std::unordered_set`](https://en.cppreference.com/w/cpp/container/unordered_set.html)

#### unordered_multiset

- [`std::unordered_multiset`](https://en.cppreference.com/w/cpp/container/unordered_multiset.html)

#### unordered_map

- [`std::unordered_map`](https://en.cppreference.com/w/cpp/container/unordered_map.html)

#### unordered_multimap

- [`std::unordered_multimap`](https://en.cppreference.com/w/cpp/container/unordered_multimap.html)

### 容器适配器

#### stack

- [`std::stack`](https://en.cppreference.com/w/cpp/container/stack.html)

访问：

- `top()` 访问栈顶元素

修改：

- `push()` 向栈顶插入元素
- `pop()` 移除栈顶元素

容器：

- `empty()` 检查容器适配器是否为空
- `size()` 返回元素数

#### queue

- [`std::queue`](https://en.cppreference.com/w/cpp/container/queue.html)

访问：

- `front()` 访问第一个元素
- `back()` 访问最后一个元素

修改：

- `push()` 向队列尾部插入元素
- `pop()` 移除首个元素

容器：

- `empty()` 检查容器适配器是否为空
- `size()` 返回元素数

#### priority_queue

- [`std::priority_queue`](https://en.cppreference.com/w/cpp/container/priority_queue.html)

## 其他容器（非 STL 容器）

### bitset

- [`std::bitset`](https://en.cppreference.com/w/cpp/utility/bitset.html)

### string

- [`std::string`](https://en.cppreference.com/w/cpp/utility/string.html)

### pair

- [`std::pair`](https://en.cppreference.com/w/cpp/utility/pair.html)

### tuple

- [`std::tuple`](https://en.cppreference.com/w/cpp/utility/tuple.html)

## STL 算法

- `std::find`
- `std::reverse`
- `std::unique`
- `std::shuffle`
- `std::sort`
- `std::binary_search`
- `std::lower_bound`
- `std::upper_bound`
- `std::next_permutation`
- `std::prev_permutation`
- ...
