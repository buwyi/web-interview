## ajax

AJAX 全称(Async Javascript and XML)

即异步的 JavaScript 和 XML，是一种创建交互式网页应用的网页开发技术，可以在不重新加载整个网页的情况下，与服务器交换数据，并且更新部分网页

Ajax 的原理简单来说通过 XmlHttpRequest 对象来向服务器发异步请求，从服务器获得数据，然后用 JavaScript 来操作 DOM 而更新页面

### 实现过程

实现 Ajax 异步交互需要服务器逻辑进行配合，需要完成以下步骤：

- 创建 Ajax 的核心对象 XMLHttpRequest 对象

- 通过 XMLHttpRequest 对象的 open() 方法与服务端建立连接

- 构建请求所需的数据内容，并通过 XMLHttpRequest 对象的 send() 方法发送给服务器端

- 通过 XMLHttpRequest 对象提供的 onreadystatechange 事件监听服务器端你的通信状态

- 接受并处理服务端向客户端响应的数据结果

- 将处理结果更新到 HTML 页面中

具体函数内容
`xhr.open(method, url, [async][, user][, password])`
其中，
method：表示当前的请求方式，常见的有 GET、POST
url：服务端地址
async：布尔值，表示是否异步执行操作，默认为 true
user: 可选的用户名用于认证用途；默认为 null
password: 可选的密码用于认证用途，默认为 null

onreadystatechange()通过监听readyState来确定通信状态
| readyState | 含义                       |
| ---------- | ------------------------ |
| 0          | UNSENT（未初始化）             |
| 1          | OPENED（连接已建立）            |
| 2          | HEADERS\_RECEIVED（收到响应头） |
| 3          | LOADING（接收响应中）           |
| 4          | DONE（请求完成）               |


### 封装

//封装一个 ajax 请求

```javascript
function ajax(options) {
  //创建XMLHttpRequest对象
  const xhr = new XMLHttpRequest();

  //初始化参数的内容
  options = options || {};
  options.type = (options.type || "GET").toUpperCase();
  options.dataType = options.dataType || "json";
  const params = options.data;

  //发送请求
  if (options.type === "GET") {
    xhr.open("GET", options.url + "?" + params, true);
    xhr.send(null);
  } else if (options.type === "POST") {
    xhr.open("POST", options.url, true);
    xhr.send(params);

    //接收请求
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        let status = xhr.status;
        if (status >= 200 && status < 300) {
          //如果options.success为真，则代入参数执行，即若存在options.success则实行
          options.success && options.success(xhr.responseText, xhr.responseXML);
        } else {
          options.fail && options.fail(status);
        }
      }
    };
  }
}
```
