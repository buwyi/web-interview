function myInstancof(obj, constructor) {
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return false
  }

  let proto = Object.getPrototypeOf(obj) // 获取对象的原型 obj.__proto__
  const prototype = constructor.prototype //  获取构造函数的原型对象

  // 沿着原型链向上递归查找
  while (proto) {
    if(proto === prototype) {
      return true
    }
    proto = Object.getPrototypeOf(proto)
  }

  return false
}