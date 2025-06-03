## DOM 操作与 BOM 操作

- 创建节点
  `document.createElement('div'), `
- 查询节点
  `document.querySelector('.classname'), document.querySlectorAll(), document.getElementsById`
- 更新节点
  `p.innerHTML = '\string <节点>'` `innerText`直接文本 `p.style.fontSize=14px` 样式
- 添加节点
  `p.appendChild(q)` `insertBefore` `setAttribute('class', 'white')`
- 删除节点

### BOM (Browser Object Model)

浏览器对象模型，提供了独立于内容与浏览器窗口进行交互的对象

其作用就是跟浏览器做一些交互效果,比如如何进行页面的后退，前进，刷新，浏览器的窗口发生变化，滚动条的滚动，以及获取客户的一些信息如：浏览器品牌版本，屏幕分辨率

浏览器的全部内容可以看成 DOM，整个浏览器可以看成 BOM。区别如下：
| 项目 | DOM（Document Object Model） | BOM（Browser Object Model） |
| ---- | -------------------------- | ------------------------------------------------- |
| 全称 | Document Object Model | Browser Object Model |
| 作用 | 操作 HTML 和 XML 文档结构（页面内容） | 操作浏览器窗口和环境（非页面内容） |
| 核心对象 | `document` | `window`（及其子对象如 `location`、`navigator`、`history`） |
| 标准 | **W3C 标准** | **非标准**（由浏览器厂商实现） |
| 使用场景 | 修改页面结构、样式、内容 | 控制地址栏、导航、弹窗、浏览器信息等 |
| 示例功能 | 获取元素、修改文本、添加节点等 | 弹出窗口、跳转链接、获取浏览器类型等 |

BOM 的核心操作对象 window,操作包括`window.scrollTo(), window.resize, window.open()`

#### Navigator

navigator 对象主要用来获取浏览器的属性，区分浏览器类型。属性较多，且兼容性比较复杂

下表列出了 navigator 对象接口定义的属性和方法：
| 属性 / 方法 | 说明 | 示例 | 兼容性说明 |
| ------------------------------- | --------------------------- | ----------------------------------------------- | ------------------------ |
| `navigator.userAgent` | 返回浏览器的 user-agent 字符串 | `navigator.userAgent` | ✅ 广泛支持，但字符串复杂 |
| `navigator.platform` | 返回运行环境的操作系统平台信息 | `navigator.platform` | ✅ 大多数浏览器支持 |
| `navigator.language` | 当前浏览器设置的语言 | `navigator.language` | ✅ 支持良好 |
| `navigator.languages` | 返回用户首选语言的数组（按优先级） | `navigator.languages` | ✅ 现代浏览器支持 |
| `navigator.cookieEnabled` | 浏览器是否启用 Cookie | `navigator.cookieEnabled` | ✅ 兼容性好 |
| `navigator.onLine` | 返回浏览器是否处于联网状态 | `navigator.onLine` | ✅ 支持良好，部分实现不准确 |
| `navigator.javaEnabled()` | 检查浏览器是否启用 Java（不是 JS） | `navigator.javaEnabled()` | ⚠️ 已过时，基本无用 |
| `navigator.hardwareConcurrency` | 设备的 CPU 线程数 | `navigator.hardwareConcurrency` | ✅ 新版浏览器支持，适用于性能优化 |
| `navigator.deviceMemory` | 设备的内存大小（单位 GB） | `navigator.deviceMemory` | ✅ Chrome 支持，其他不广泛 |
| `navigator.geolocation` | 获取地理位置对象（用于定位） | `navigator.geolocation.getCurrentPosition(...)` | ✅ 大多数浏览器支持，但需用户授权 |
| `navigator.permissions` | 查询权限状态（如地理位置、通知） | `navigator.permissions.query({...})` | ✅ 现代浏览器支持（较新） |
| `navigator.mediaDevices` | 访问摄像头、麦克风等媒体输入设备 | `navigator.mediaDevices.getUserMedia(...)` | ✅ 现代浏览器支持 |
| `navigator.credentials` | Web Credential API，用于登录状态管理 | `navigator.credentials.get(...)` | ✅ 新标准，部分浏览器支持 |
| `navigator.connection` | 网络连接信息（类型、速度） | `navigator.connection.downlink` | ⚠️ 仅部分浏览器支持，如 Chrome 移动端 |

#### history

history 对象主要用来操作浏览器 URL 的历史记录，可以通过参数向前，向后，或者向指定 URL 跳转

和 React 中 HashRouter 和 BrowserRouter 有一定关联，
其中 BR 直接操作 history 对象来进行前进和后退
`history.go, history.back`
`history.pushState, history.popState`
