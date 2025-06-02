## bind, apply, call

### 用处

call、apply、bind 作用是改变函数执行时的上下文，简而言之就是改变函数运行时的 this 指向

那么什么情况下需要改变 this 的指向呢？下面举个例子

```javascript
var name = "lucy";
var obj = {
  name: "martin",
  say: function () {
    console.log(this.name);
  },
};
obj.say(); // martin，this 指向 obj 对象
setTimeout(obj.say, 0); // lucy，this 指向 window 对象
```

从上面可以看到，正常情况 say 方法输出 martin

但是我们把 say 放在 setTimeout 方法中，在定时器中是作为回调函数来执行的，因此回到主栈执行时是在全局执行上下文的环境中执行的，这时候 this 指向 window，所以输出 lucy

我们实际需要的是 this 指向 obj 对象，这时候就需要该改变 this 指向了

`setTimeout(obj.say.bind(obj),0); //martin，this 指向 obj 对象`

### 区别

- call

  - call 接受两个参数，第一个参数是 this 的指向，第二个参数是函数接受的参数，以数组的形式传入
  - 改变 this 指向后，原函数立即执行一次，且此方法只临时改变一次 this 指向

  ```javascript
  function fn(...args) {
    console.log(this, args);
  }
  let obj = {
    myname: "张三",
  };
  fn.apply(obj, [1, 2]); // this 会变成传入的 obj，传入的参数必须是一个数组；
  fn(1, 2); // this 指向 window
  fn.apply(null, [1, 2]); // this 指向 window
  fn.apply(undefined, [1, 2]); // this 指向 window
  ```

  当第一个参数为 null、undefined 的时候，默认指向 window(在浏览器中)

- apply
  - apply 接受两个参数，第一个参数是 this 的指向，第二个参数是函数接受的参数，以参数列表形式传入
  - 改变 this 指向后，原函数立即执行一次，且此方法只临时改变一次 this 指向
- bind

  - 第一参数为 this 指向，后面为参数列表，可分多次传入
  - 改变 this 指向后不会立即执行，而是返回一个永久改变 this 指向的函数

  ```javascript
  function fn(...args) {
    console.log(this, args);
  }
  let obj = {
    myname: "张三",
  };

  const bindFn = fn.bind(obj); // this 也会变成传入的 obj ，bind 不是立即执行需要执行一次
  bindFn(1, 2); // this 指向 obj
  fn(1, 2); // this 指向 window
  ```

### 实现一个 bind 函数

我们需要完成三个部分

- 修改 this 指向
- 动态传递参数
- 兼容 new 关键字 //暂未理解

```javascript
Function.prototype.myBind = function (context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }

  // 获取参数
  const args = [...arguments].slice(1),
    fn = this;

  return function Fn() {
    // 根据调用方式，传入不同绑定值
    return fn.apply(
      this instanceof Fn ? new fn(...arguments) : context,
      args.concat(...arguments)
    );
  };
};
```
