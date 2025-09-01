function mySetTimeout(callback, delay, ...args) {
  const start = +new Date();
  let timer, now;
  function loop() {
    timer = window.requestAnimationFrame(loop);
    now = +new Date();
    if (now - start >= delay) {
      callback.apply(this, args);
      window.cancelAnimationFrame(timer);
    }
  }
  window.requestAnimationFrame(loop);
}

function callback() {
  console.log("callback function");
}

mySetTimeout(callback, 1000);
