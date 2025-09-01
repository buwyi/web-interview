function mySetInterval(callback, delay) {
  let intervalId = null;
  function loop() {
    intervalId = setTimeout(() => {
      callback();
      loop();
    }, delay);
  }
  loop();
  return clearTimeout(intervalId);
}

mySetInterval(callback, 1000);
