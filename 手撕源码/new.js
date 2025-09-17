function myNew(Func, ...args) {
  let obj = {};
  obj.__proto__ = Func.prototype;
  const result = Func.apply(obj, args);
  return result instanceof Object ? result : obj;
}
