# JSON 对象上的两个方法

## JSON.stringfy()

可以把 javascript 对象序列化为 JSON 字符串

```js
let json1 = {
  title: "Json.stringify",
  author: ["浪里行舟"],
  year: 2021,
};
let jsonText = JSON.stringify(json1);
```

默认情况下的 jsonText 格式为 `"{"title":"Json.stringify","author":["浪里行舟"],"year":2021}"`
因为默认情况下，输出会不包含空格或者缩进， 同样的，当值为 undefined 即无值时，将被忽略

接受参数

```js
/**
 * param:
 *    object:  即为要进行JSON字符串化的js对象
 *    filter： 过滤器， 可以是数组和函数，当为数组时， stringfy输出的字符串仅包含js对象内符合数组的属性;
 *                     当为函数是，函数接受两个参数，key和value, 即js对象的对应键值， 可以在函数内部进行返回值处理， 如果返回值是undefined遵从undefined, 被忽略
 *    indent： 为数值时，代表每一级缩进的空格数
 */
JSON.stringfy(object, filter, indent);
```

**此外，对象上如果有 toJSON()方法，stringfy 会按照 toJSON 的逻辑进行转换**

## stringfy()用法

- 判断对象中是否包含某内容

```js
//判断数组是否包含某对象
let data = [{ name: "浪里行舟" }, { name: "前端工匠" }, { name: "前端开发" }],
  val = { name: "浪里行舟" };
if (JSON.stringfy(data).indexof(JSON.stringfy(val)) !== -1) return true;
else return false;
```

- 判断两个对象是否相等， 由于是转换成字符串形式，所以如果 js 对象内部的顺序出现变化，会导致错误
- 将 js 对象转换成 JSON 字符串存储在 localStroage/sessionStroage

## 注意事项

stringfy 在转换值中又无法转换的内容

- 对象中
  - NaN， Infinity -> Null
  - undefined, function(){}, Symbol("") -> 忽略
- 数组中
  - undefined, function(){}, Symbol("") -> Null
