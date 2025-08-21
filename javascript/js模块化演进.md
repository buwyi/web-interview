## 前端模块化演进历史

### 全局 function 模式

顾名思义，不同功能封装成不同函数，一个文件写所有

### namespace 模式

不同功能封装成不同对象，但是还是在一个文件内部

### IIFE(immediately invoked function expression) 立即调用函数调用模式

创建一个函数闭包，外部只能通过暴露的方法进行调用

```js
(function (window) {
  let data = 1;
  function printData() {
    console.log(data);
  }
  function otherFunc() {
    console.log(other);
  }

  window.myModule = {
    printData,
    otherFunc,
  };
})(window);
```

上面这段代码中，创建一个函数并且立即使用 window 作为参数调用，在函数最后在 window 上挂载了一个新对象，对象中包含了函数内部的方法，实现暴露的任务
可以在这上面这段代码的基础上，使用外部依赖作为参数传递进去，就能使用起到调用模块的目的

### CommonJS

Node 应用由模块组成，采用 CommonJS 模块规范。每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。在服务器端，模块的加载是运行时同步加载的；在浏览器端，模块需要提前编译打包处理。
- 代码运行在模块作用域中，不会影响全局作用域
- 模块可以多次加载，但是只会在第一次加载的时候运行一次，然后结果即被缓存，以后加载时读取的是缓存的结果，想要再次运行模块，需要清除缓存
- 模块加载的顺序是其在代码中出现的顺序

**CommonJS模块中暴露的模块是什么**
module变量代表当前模块，这个变量是一个对象，它的exports属性是对外的接口，加载模块实际上就是加载module.exports属性
和exports一组的操作是require，require会读入并且执行一个js文件，然后返回exports对象。如果未发现，则报错
模块加载机制中，结果被缓存的意思是，获取模块的对象时，是一个拷贝的对象，再次使用模块提供的方法改变模块内部的值时，实际上不会影响已经拷贝出来的值, 所以他是一种拷贝，而不是ES6中的引用
```js
var x = 5
var addX = function(value){
  return value+x
}
module.exports.x = x
module.exports.addX = addX
//或者以下写法
module.exports = {
  x:x
  addX:addX
}
```

### AMD(Asynchronous Module Definition)
AMD不同与CommonJS的同步加载模块，他是一种非同步加载模块的操作， 允许制定回调函数。
为什么要出现异步类型的模块加载规范呢？
因为在服务端中，模块文件都存储在本地，同步加载模块并不会因为网络请求产生额外的加载开销，但是在客户端环境，无法保存所有模块文件，所以需要使用网络请求模块内容，这个时候就需要使用异步的加载规范

### CMD(Common Module Definition)
CMD被用于浏览器端，模块加载是异步的，模块使用的时候才会进行加载执行

### ES6
ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。
通过和CommonJS的对比来确定特点
- CommonJS模块输出的是值的拷贝， 而ES6模块输出的是值的引用
- CommonJS模块是运行时加载，  ES6是编译时输出接口