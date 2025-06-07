在 React 中使用 `HashRouter` 和 `BrowserRouter`（你提到的 “另一种包裹” 在 BOM（Browser Object Model）环境下通常指的是 `BrowserRouter`）的主要区别体现在它们处理 URL 的方式，以及对浏览器环境的依赖。

### 一、核心区别

| 特性         | `HashRouter`                           | `BrowserRouter`                                    |
| ---------- | -------------------------------------- | -------------------------------------------------- |
| URL 结构     | 使用 `#`（如 `http://example.com/#/about`） | 使用 HTML5 History API（如 `http://example.com/about`） |
| 依赖后端配置     | 不需要，前端控制全部路由                           | 需要后端支持所有路径都指向 `index.html`                         |
| 兼容性        | 更好，适用于旧浏览器或静态部署                        | 需要现代浏览器支持 `history.pushState`                      |
| 刷新或直接访问子路径 | 没问题，始终加载 `index.html` 然后读取 `#` 后的路径    | 后端必须配置路由转发，否则 404                                  |

---

### 二、在 BOM（Browser Object Model）环境下的差异

从 BOM 的角度看，主要差异如下：

1. **URL 行为**：

   * `HashRouter` 修改 `window.location.hash`，不会重新加载页面。
   * `BrowserRouter` 使用 `window.history.pushState` 修改 `pathname`，也不会重新加载页面，但直接访问子路径时浏览器会请求该路径对应的资源。

2. **页面刷新或 F5**：

   * `HashRouter` 的刷新不会请求服务器新路径，只会重新加载页面并跳转到 `#` 后面的部分。
   * `BrowserRouter` 的刷新会触发 HTTP 请求到当前的路径，如果服务器没配置好，会返回 404。

3. **对 `window.location` 的影响**：

   * `HashRouter` 修改 `location.hash`。
   * `BrowserRouter` 修改 `location.pathname`。

---

### 三、实际应用建议

* **用 `HashRouter` 的场景**：

  * 无法配置后端（如 GitHub Pages、纯静态托管）。
  * 需要兼容老浏览器或嵌入式环境。
* **用 `BrowserRouter` 的场景**：

  * 可配置后端（如使用 Node.js/Express、Nginx、Apache）。
  * 更干净的 URL（没有 `#`），更接近传统网站体验。

---

### 总结一句话：

> `HashRouter` 是前端完全控制的路径方案，适合静态部署；`BrowserRouter` 更现代、URL 更干净，但需要后端配合。




## 📌 一、背景：什么是“后端配置”？

“后端配置”指的是：当你使用 React 构建一个单页面应用（SPA）并将其部署到服务器后，如果用户直接访问一个子路径（比如 `/about`），服务器如何响应这个请求。

---

## 🧭 二、`HashRouter` 与 `BrowserRouter` 在 URL 行为上的关键区别

| 路由方式            | URL 示例                        | 浏览器发送请求到服务器的路径   | 是否需要后端处理               |
| --------------- | ----------------------------- | ---------------- | ---------------------- |
| `HashRouter`    | `https://example.com/#/about` | `/`（忽略 `#` 后的内容） | ❌ 不需要特殊配置              |
| `BrowserRouter` | `https://example.com/about`   | `/about`         | ✅ 需要服务器返回 `index.html` |

---

## 🔍 三、为什么 `BrowserRouter` 需要后端支持？

`BrowserRouter` 使用了 **HTML5 History API**，URL 会改变（比如从 `/` 变成 `/about`），但 React 会拦截这个变化，不让页面重新加载。**这是前端内部完成的路由切换**。

但是问题出在以下场景：

### 🧨 问题场景：

用户在浏览器中手动输入地址或刷新页面，例如访问：

```
https://example.com/about
```

此时，浏览器会像传统网站那样发送一个 HTTP 请求到服务器，请求 `/about` 这个路径。**如果服务器上没有 `/about` 这个文件或路由处理规则，就会返回 404**。

---

## ✅ 四、解决方案：如何配置后端支持 `BrowserRouter`？

你需要让服务器把任何路径请求都重定向到 `index.html`，让 React 自己处理路由。

### 🎯 配置方式示例：

#### 1. Nginx

```nginx
location / {
  try_files $uri /index.html;
}
```

#### 2. Apache

在 `.htaccess` 文件中添加：

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### 3. Express.js（Node.js）

```js
app.use(express.static('build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});
```

---

## 🚫 五、`HashRouter` 不需要上述配置的原因

`HashRouter` 使用 `#` 来分割实际路径和虚拟路径：

```
https://example.com/#/about
```

浏览器只会向服务器请求 `/`，即只会加载 `index.html`。`#/about` 不会被发送给服务器，而是前端在加载后由 React 自己解析。因此，服务器永远只需要处理根路径 `/`，不涉及路径匹配问题。

---

## ✅ 六、总结

| 项目                   | `HashRouter`        | `BrowserRouter`              |
| -------------------- | ------------------- | ---------------------------- |
| 服务器是否能识别子路径？         | ✔️ 永远加载 `/`，不涉及     | ❌ 需要配置，让任意路径都返回 `index.html` |
| 用户直接访问 `/about` 会怎样？ | 加载主页，前端解析 `#/about` | 如果没配置，会出现 404 错误             |
| 是否需要后端支持 SPA？        | ❌                   | ✅                            |

---

如你在 GitHub Pages、Netlify、Vercel、静态文件服务器等环境中部署 React 应用时，如果不能配置路径重定向，就推荐使用 `HashRouter`。



getparamters(url, params)

url='www.baidu.com/cdn=213213&cdn=21221'
params=cdn

['213213','21212']