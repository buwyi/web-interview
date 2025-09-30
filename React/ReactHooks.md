## Hooks 规则

### 仅在顶层调用 Hook

翻译翻译就是:

- 不要在循环、条件语句、嵌套函数或 try/catch/finally 代码块中调用 Hook。相反，你应该在 React 函数组件的顶层使用 Hook，且在任何提前返回之前。
- 你只能在 React 渲染函数组件时调用 Hook, 在函数组件的顶层调用， 在自定义 hook 的顶层调用
  不支持在其他任何情况下调用以 use 开头的 Hook，例如：
  🔴 不要在条件语句或循环中调用 Hook。
  🔴 不要在条件性的 return 语句之后调用 Hook。
  🔴 不要在事件处理函数中调用 Hook。
  🔴 不要在类组件中调用 Hook。
  🔴 不要在传递给 useMemo、useReducer 或 useEffect 的函数内部调用 Hook。
  🔴 不要在 try/catch/finally 代码块中调用 Hook。

为什么会有这样的要求呢？
因为 React 在渲染函数组件的过程中，是根据调用 Hooks 的顺序来决定对应的状态，而不是根据 useState(initialValue)其中 initialValue 的值来决定是他维护的是哪一个 state。
在 Hooks 的代码内部,存在一个 currentIndex 拉力记录当前的索引，通过 currnetIndex 来记录现在是第几个 hooks，每次调用必须确保顺序完全一致，否则就会导致状态的错位。

```js
let hooks = []
let currentIndex = 0
function useState(initialValue) {
  const idx = currentIndex
  hooks[idx] = hooks[idx] ?? initialValue
  function setState(newVal) {
    hooks[idx] = newVal
    reRender()
  }
  currentIndex++
  return [hooks[idx], setState]
}
```

### 竟在 React 函数调用 Hooks

因为只有 React 函数中，会出现 jsx 的语言，jsx 的语法在 React 框架中是一种语法糖，他被转换成了 react.createElement 的函数调用，这个创建出来的 createElement 对象就是一个虚拟 dom 树节点，在 fiber 架构中，虚拟 dom 树节点会形成一个新的数据结构 fiber 树，这个 fiber 树上挂载了 hooks 这个队列，这个队列就是我们组件保存 hooks 的队列，也就是说 hooks 是被保存在 fiber 树上的，而 fiber 树是只有 react 函数组件才具有的，其他的函数都不具备，所以他们就算使用了 hooks，也无法进行记忆，会在下一次中丢失。

## useMemo() 和 useCallback() 的区别是什么
