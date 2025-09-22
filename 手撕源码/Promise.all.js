// proms 作为Promise.all的传入参数是可迭代对象，可能是Promise数组，数组， set等
Promise.myall = function (proms) {
  // 拿到resolve和reject方法
  let res, rej;
  let p = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  })
  // 使用count判断是否全部完成，或者传入的是空迭代对象
  let count = 0;
  // 已完成的计数器
  let fullfilledCount = 0
  // 结果
  const result = []
  for (const  prom of proms) {
    count++;
    const index = count;
    // 无论传入什么，使用Promise包裹一层变成Promise
    Promise(prom).then((data)=>{
      // 使用index 按照顺序保存
      result[index] = data
      fullfilledCount++;
      // 全部都成功，才能resolve, 因为此处为异步条件，所以count已经计数完成
      if(fullfilledCount === count){
        res(result)
      }
    }, rej)
  }
  if(count === 0 ) {
    res(result);
  }
  return p
}