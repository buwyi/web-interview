## this 指向问题

绝大多数情况下实在运行时绑定，箭头函数则是在定义时绑定
一般来说，this 关键字是函数运行时自动生成的一个内部对象，只能在函数内部使用，指向调用它的对象, this 在运行中一旦确定，不会进行更改。

```javascript
function baz() {
  // 当前调用栈是：baz
  // 因此，当前调用位置是全局作用域

  console.log("baz");
  bar(); // <-- bar的调用位置
}

function bar() {
  // 当前调用栈是：baz --> bar
  // 因此，当前调用位置在baz中

  console.log("bar");
  foo(); // <-- foo的调用位置
}

function foo() {
  // 当前调用栈是：baz --> bar --> foo
  // 因此，当前调用位置在bar中

  console.log("foo");
}

baz(); // <-- baz的调用位置
```

### 四种绑定规则，默认绑定，隐式绑定，new 绑定， 显式绑定

- 默认绑定

```javascript
var name = "Jenny";
function person() {
  return this.name;
}
console.log(person()); //Jenny
```

上述代码输出 Jenny，原因是调用函数的对象在游览器中位 window，因此 this 指向 window，所以输出 Jenny

> 注意：严格模式下，不能将全局对象用于默认绑定，this 会绑定到 undefined，只有函数运行在非严格模式下，默认绑定才能绑定到全局对象

- 隐式绑定
  当函数作为某个对象的方法被调用时，此时这个函数里面的 this 指向的是上级对象

```javascript
function test() {
  console.log(this.x);
}

var obj = {};
obj.x = 1;
obj.m = test;

obj.m(); // 1
```

当外层包含多个对象时，this 也只是指向函数的上一级对象, 下面这段代码中，调用 fn 时，this 指向的是 b 这个上一级对象，其中并没有 a 属性，所以输出 undefined

```javascript
var o = {
  a: 10,
  b: {
    fn: function () {
      console.log(this.a); //undefined
    },
  },
};
o.b.fn();
```

还有一种情况，this 指向最后的调用对象， fn 在赋值过程中并没有执行，所以在运行时实际的上一级调用者为 window(非严格模式)

```javascript
var o = {
  a: 10,
  b: {
    a: 12,
    fn: function () {
      console.log(this.a); //undefined
      console.log(this); //window
    },
  },
};
var j = o.b.fn;
j();
```

- new 绑定

通过构造函数`new`一个新的实例对象时，此时构造函数中若有 this, 则这个 this 指向这个实例对象

```javascript
function test() {
  this.x = 1;
}

var obj = new test();
obj.x; // 1
```

特殊情况中

- new 的构造函数中 return 一个对象，则 this 指向这个 return 的对象

```javascript
function fn() {
  this.user = "xxx";
  return {};
}
var a = new fn();
console.log(a.user); //undefined
```

- return 一个简单类型时，this 指向实例对象
- return 一个 null 时，虽然 null 也为对象，但是 this 指向实例对象

- 显式绑定

`apply(), call(), bind()` 是函数的一个方法，作用是改变函数的调用对象。它的第一个参数就表示改变后的调用这个函数的对象。因此，这时 this 指的就是这第一个参数

### 箭头函数的 this 指向

编译时进行绑定，类似于词法作用域机制，继承自定义时的外部作用域的 this

```javascript
const obj = {
  name: "obj",
  sayThis: function () {
    console.log(this.name);
  },
  sayArrow: () => {
    console.log(this.name);
  },
};

obj.sayThis(); // 'obj'
obj.sayArrow(); // undefined（或 window.name）
```

为什么对象不能作为一个箭头函数定义时的外部作用域？

- 因为 JavaScript 中只有以下结构会创建新的作用域：
- 函数体（function）
- 模块（module）
- try/catch
- with
- class（ES6）

块作用域（let/const/{} 条件块等）仅影响变量，但不影响 this
⚠️ 对象字面量 {} 本身不会形成作用域！ 所以它不能作为箭头函数 this 的定义作用域。

箭头函数由于没有[[constructor]]所以无法作为构造函数，通过 new 产生实例对象
| 场景 | 推荐使用函数类型 |
| -------------------- | ---------- |
| 对象方法 | `function` |
| 原型链方法、类方法 | `function` |
| 事件监听 | `function` |
| 定时器/Promise/数组回调内部函数 | `=>` 箭头函数 |

### 优先级

综上，new 绑定优先级 > 显示绑定优先级 > 隐式绑定优先级 > 默认绑定优先级
