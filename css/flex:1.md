## flex:1

- flex:1 的全写是什么
  flex-grow: 1; 允许在有多余空间中扩展，占据一份空间
  flex-shrink: 1; 当空间不足时，该元素支持缩小，占据一份收缩比例
  flex-basis: 0; 元素初始主轴尺寸 0, 所以空间分配时完全按照 flex-grow 分配

### flex-grow

设置在主轴上的增长系数，
剩余空间是 flex 容器的大小减去所有 flex 项的大小加起来的大小。如果所有的兄弟项目都有相同的 flex-grow 系数，那么所有的项目将剩余空间按相同比例分配，否则将根据不同的 flex-grow 定义的比例进行分配。

### flex-shrink

指定了 flex 元素的收缩规则，
flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值。

### flex-basis

指定了 flex 在主轴上的初始大小
