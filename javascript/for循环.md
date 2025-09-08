# js内的for循环
在 **JavaScript** 里，`for` 循环有几种常见写法，我给你整理一下常用的几种：

---

## 1. **传统 for 循环**

最基础的写法，适合知道循环次数的情况：

```js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
// 输出: 0 1 2 3 4
```

语法：

```js
for (初始化; 条件; 迭代) {
  // 循环体
}
```

---

## 2. **for...in**

用来 **遍历对象的可枚举属性**（键名），也可以遍历数组下标（不推荐用于数组，顺序不可保证）。

```js
const obj = { a: 1, b: 2, c: 3 };
for (let key in obj) {
  console.log(key, obj[key]);
}
// 输出: a 1, b 2, c 3
```

---

## 3. **for...of**

用来 **遍历可迭代对象**（数组、字符串、Set、Map等），直接拿到值。

```js
const arr = [10, 20, 30];
for (let value of arr) {
  console.log(value);
}
// 输出: 10 20 30
```

---

## 4. **forEach（数组方法）**

严格来说不算语法，而是数组自带的方法，不能用 `break` 或 `continue`。

```js
[1, 2, 3].forEach((item, index) => {
  console.log(index, item);
});
// 输出: 0 1, 1 2, 2 3
```

---

## 5. **无限循环（手动 break）**

```js
let i = 0;
for (;;) {  // 没有条件，等同于 while(true)
  if (i > 3) break;
  console.log(i);
  i++;
}
// 输出: 0 1 2 3
```

---

👉 最常见的是这三个：

* **`for`**（计数）
* **`for...in`**（遍历对象属性）
* **`for...of`**（遍历可迭代对象的值）

要不要我帮你画一张 **流程图**，对比这几种 `for` 循环什么时候用？
