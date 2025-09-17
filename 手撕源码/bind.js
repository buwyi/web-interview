Function.prototype.myBind = function (context) {
  if (typeof this !== "function") {
    throw new TypeError("Bind must be called on a function");
  }

  const args = [...arguments].slice(1),
    fn = this;

  return function Fn() {
    return fn.apply(
      this instanceof Fn ? new fn(...args) : context,
      args.concat(...arguments)
    );
  };
};
