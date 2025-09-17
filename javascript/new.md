## new 函数

流程

- 创建一个新的空对象`obj`
- 将对象与构造函数通过原型链连接起来`obj.__proto__ = Func.prototype`
- 将构造函数中的 this 绑定到新的对象`obj`上
- 根据构造函数的返回类型做判断，如果原始值则忽略，如果返回对象则正常处理
  - 简单类型返回，不管
  - 返回对象时，返回这个对象

### 手写 new 函数

```javascript
function myNew(Func, ...args) {
  const obj = {};
  obj.__proto__ = Func.prototype;
  let result = Func.apply(obj, args);
  return result instanceof Object ? result : obj;
}
```
