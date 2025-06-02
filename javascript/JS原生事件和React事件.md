## 事件对比

| 特性      | 原生 DOM 事件              | React 合成事件（SyntheticEvent）                  |
| --------- | -------------------------- | ------------------------------------------------- |
| 类型      | 原生 `Event` 对象          | React 包装后的 `SyntheticEvent`                   |
| 添加方式  | `element.addEventListener` | JSX 中的 `onClick={}`                             |
| 事件系统  | 依赖浏览器的事件流系统     | 自己实现的“事件代理机制”                          |
| 冒泡/捕获 | 原生支持三阶段             | React 默认只冒泡，可手动添加捕获 `onClickCapture` |
| 自动解绑  | 不会自动解绑               | React 会在组件卸载时自动解绑                      |
| 支持委托  | 需要手动委托到父级         | React 自动将所有事件委托到根节点（如 `document`） |
| 性能      | 多事件会产生多个监听器     | React 用一个全局监听器管理全部事件                |
| 可移植性  | 原生浏览器行为             | 跨浏览器兼容性好（React 做了兼容封装）            |

### 合成事件

React 中的合成事件本质
React 会把所有事件都挂在根元素（如 document 或 root）上统一处理，而不是每个 DOM 元素都绑定一个事件。这种做法称为事件代理。

当你写：`<button onClick={handleClick}>Click</button>`

React 会在 document 上注册一个全局的点击事件，来捕获所有点击

它使用 event.target 判断触发了哪个组件，再调用对应的 handleClick

### 执行顺序问题

合成事件会在原生事件的冒泡阶段拦截，进行合成事件的执行。

```javascript
import React, { useEffect, useRef } from "react";

function App() {
  const btnRef = useRef();

  useEffect(() => {
    btnRef.current.addEventListener("click", () => {
      console.log("👉 原生 DOM 冒泡阶段");
    });

    btnRef.current.addEventListener(
      "click",
      () => {
        console.log("👀 原生 DOM 捕获阶段");
      },
      true
    );
  }, []);

  return (
    <button
      ref={btnRef}
      onClick={() => console.log("💥 React 合成事件（冒泡）")}
      onClickCapture={() => console.log("⚡ React 合成事件（捕获）")}
    >
      点击我
    </button>
  );
}


output:
⚡ React 合成事件（捕获）
👀 原生 DOM 捕获阶段
💥 React 合成事件（冒泡）
👉 原生 DOM 冒泡阶段

```

### React 事件委托写法

`event.target.closest()`找到接近的节点
`li.dataset.index`获取对应的索引来找到信息

```javascript
import React from "react";

function EventDelegationExample() {
  const items = ["🍎 Apple", "🍌 Banana", "🍇 Grape", "🍊 Orange"];

  const handleClick = (e) => {
    // 事件目标可能是 <li> 里面的文字节点或 <li> 本身
    const li = e.target.closest("li");
    if (li && li.dataset.index !== undefined) {
      const index = li.dataset.index;
      alert(`你点击了第 ${parseInt(index) + 1} 个项目: ${items[index]}`);
    }
  };

  return (
    <div>
      <h2>事件委托示例</h2>
      <ul onClick={handleClick}>
        {items.map((item, index) => (
          <li key={index} data-index={index} style={{ cursor: "pointer" }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventDelegationExample;
```

播放列表中，对播放列表的 ul 进行的事件委托，通过点击 li 或者 li 上的按钮进行不同的事件。

```javascript
  //播放列表中点击歌曲事件 && 四个图标按钮事件也在这里（事件委托， 将ul => li 中的每个li的事件绑定在ul上， 减少响应函数数量）
  const handleChangeMusic = (event: SyntheticEvent) => {
    // console.log(event);    //SyntheticEvent 合成事件对象
    const target = event.target as HTMLElement;
    //console.log(target);    //点击的HTML对象，上浮队列的第一个
    const buttonElement = target.closest('button.btn');
    // console.log(buttonElement);
    const songElement = target.closest('[data-id]');
    // console.log(songElement); //离点击对象最近的含有data-id属性的对象
    if (!songElement) return;
    const songId = songElement.getAttribute('data-id'); //获取点击单曲的id
    if (!songId) return;

    //点击的区域是否为按钮
    if (buttonElement) {
      event.stopPropagation();
      const action = buttonElement.classList.contains('delete')
        ? 'delete'
        : buttonElement.classList.contains('download')
          ? 'download'
          : buttonElement.classList.contains('favor')
            ? 'favor'
            : buttonElement.classList.contains('share')
              ? 'share'
              : null;

      if (!action) return;

      switch (action) {
        case 'delete':
          dispatch(fetchDeleteSongAction(parseInt(songId)));
          console.log(`delete ${songId}`);
          break;
        case 'download':
          console.log(`download${songId}`);
          break;
        case 'favor':
          console.log(`favor${songId}`);
          break;
        case 'share':
          console.log(`share${songId}`);
          break;
      }
      return;
    }
    dispatch(fetchCurrentSongAction(parseInt(songId)));
  };
```
