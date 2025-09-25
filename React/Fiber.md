# Fiber

为了优化渲染中的性能问题，引入了 Fiber 架构
因为原有的渲染中，渲染进程是同步的，且耗时较长，如果出现层级过深的内容，会导致用户 UI 界面的卡顿
全量渲染的模式

所以 fiber 算法有两个核心特点

- 动态优先级
- 可中断渲染

fiber 作为一个数据结构能够存储从 createElement 创建的组件信息，根据算法构建 fiber 树，最后在 commit 阶段的 mutation 子阶段被渲染成真实的 dom 树
## JSX 转换成 Fiber 树的过程

### 1. JSX 编译

```jsx
// 源代码
;<div>
  <span>Hello</span>
</div>

// 编译后
React.createElement("div", null, React.createElement("span", null, "Hello"))
```
首先jsx知识一种语法糖，他会被babel编译成react.createElement的调用，然后创建一个ReactElement对象，这个element对象也被叫做虚拟dom节点

### 2. ReactElement（虚拟 DOM）

`createElement`创建描述性对象：

```javascript
{
  type: 'div',
  props: {
    children: { type: 'span', props: { children: 'Hello' } }
  }
}
```

### 3. Fiber 节点

Reconciler 将 ReactElement 转换成 Fiber 节点：

```javascript
{
  type: 'div',           // 元素类型
  props: {...},          // 属性
  child: FiberNode,      // 第一个子节点
  sibling: FiberNode,    // 兄弟节点
  return: FiberNode,     // 父节点
  stateNode: DOMElement, // 对应的真实DOM
  effectTag: 'UPDATE'    // 操作类型
}
```

## Fiber 树和 DOM 树的关系

- **Fiber 树**: React 内部数据结构，用于管理状态、调度更新
- **DOM 树**: 浏览器真实节点树
- **关系**: Fiber 节点通过`stateNode`指向对应的真实 DOM 节点

## 虚拟 DOM 到真实 DOM 的转换时机

### Render 阶段（可中断）

- 构建 Fiber 树
- 执行 diff 算法
- 标记 DOM 操作（effectTag）
- **不操作真实 DOM**

### Commit 阶段（不可中断）

1. **Before mutation**: DOM 操作前的生命周期
2. **Mutation**: **虚拟 DOM 变真实 DOM 的关键时机**
   - 执行 DOM 插入、删除、更新
   - 调用`appendChild`、`removeChild`等 API
3. **Layout**: DOM 操作后的生命周期

