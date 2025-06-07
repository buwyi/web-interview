## BFC

BFC(Block Formatting context)， 块级格式化上下文
[MDN 官方文档解释](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_display/Block_formatting_context)

它具有以下三种行为

- 包含内部浮动
- 排除外部浮动
- 阻止外边距重叠

### BFC 的触发条件

| 条件                                                                   | 示例                           |
| ---------------------------------------------------------------------- | ------------------------------ |
| 根元素（如 `<html>`）                                                  | 页面根                         |
| 浮动元素                                                               | `float: left/right`            |
| 绝对定位元素                                                           | `position: absolute/fixed`     |
| 设置 `overflow` 为非 `visible` 的值                                    | `overflow: hidden/auto/scroll` |
| `display: inline-block`, `table-cell`, `table-caption`, `flex`, `grid` | 多种布局机制                   |
| 设置 `contain: layout/paint/content`                                   | 性能优化相关                   |
| 设置 `will-change: transform` 等                                       | 提前创建渲染层                 |

- 直接使用 display: `flow-root`能让该元素生成一个块级元素盒，会建立一个新的 BFC


### 包含内部浮动
如果在BFC内部中存在浮动元素，浮动元素会撑开这个BFC,在正常的块内部不会触发，因为浮动元素会独立于块。


### 排除外部浮动
当一个浮动元素和块级元素属于同级时，浮动元素会浮在块级元素上，但是如果是BFC元素，会与浮动元素正常进行边距计算

### 防止外边距重叠