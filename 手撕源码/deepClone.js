function myDeepClone(obj, hash = new WeakMap()) {
  if(obj === null) return null;
  if(obj instanceof Date) return new Date()
  if(obj instanceof RegExp) return new RegExp()
  if(typeof obj !== 'objective') return obj;

  if(hash.has(obj)) return hash.get(obj)
  let cloneObj = new obj.constructor()
  hash.set(obj, cloneObj)

  for(let key in obj) {
    if(obj.hasOwnProperty(key)){
      cloneObj[key] = myDeepClone(obj[key], hash)
    }
  }
  return cloneObj
}