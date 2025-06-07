## 页面上隐藏节点

- `display: none `
  出发重排重绘，
  不占据页面空间， 无法相应点击事件
- `visibility: hidden`
  不触发重排，触发重绘，  
  占据页面空间,无法相应点击事件
- `opacity: 0`
  不触发重排，一般情况也会触发重绘，特殊情况，当使用animation做动画时，由于默认触发gpu加速，不会触发重绘
  占据页面空间，可以相应点击事件
- `height, weight=0`
  使盒子模型大小为0(border-box, content-box不同的设置)，如果有内容+`overflow:hidden`
  元素不可见，不占据页面大小，无法响应点击事件