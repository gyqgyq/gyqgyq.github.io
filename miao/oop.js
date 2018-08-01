  //集合类型Set
function MySet(ary) {
  this.set = []
  if (ary.length !== 0 || ary !== null) {
    for (let i = 0; i < ary.length; i++) {
      if (!this.set.includes(ary[i])) {
        this.set.push(ary[i])
      }
    }
  }
}
Object.defineProperty(MySet.prototype, 'size', {
  get: function () {
    return this.set.length
  }
})
MySet.prototype.add = function(val) {
  for (let i = 0; i < this.set.length; i++) {
    if (this.set[i] === val) {
      return this
    }
  }
  this.set.push(val)
  return this
}

MySet.prototype.clear = function() {
  this.set = []
  return this
}
MySet.prototype.delete = function(val) {
  for (let i = 0; i < this.set.length; i++) {
    if (this.set[i] === val) {
      this.set.splice(i, 1)
      return true
    }
  }
  return false
 }

MySet.prototype.entries = function() {
  this.set.reduce((res, item) => {
    res[item] = item
    return res
  }, {})
}

MySet.prototype.forEach = function(action) {
  let res = []
  for (let i = 0; i < this.set.length; i++) {
    res.push(action(this.set[i]))
  }
  return res
}

MySet.prototype.has = function(val) {
  for (let i = 0; i < this.set.length; i++) {
    if (this.set[i] === val) {
      return true
    }
  }
  return false
}

MySet.prototype.keys = function() {
  let res = []
  for (let i = 0; i < this.set.length; i++) {
    res.push(this.set[i])
  }
  return res
}

MySet.prototype.values = function() {
  return Set.prototype.keys()
}

//映射类型 Map

function MyMap(ary) {
  this.map = {}
  for (let i = 0; i < ary.length; i++) {
    let key = ary[i][0] === undefined ? null : ary[i][0]
    let val = ary[i][1] === undefined ? null : ary[i][1]
    this.map[key] = val
  }
}

MyMap.prototype.set = function(key, val) {
  this.map[key] = val
  return this
}

MyMap.prototype.clear = function () {
  this.map = {}
  return this
}

MyMap.prototype.delete = function(key) {
  delete this.map[key]
  return this
}

MyMap.prototype.entries = function() {
  let res = []
  for (let key in this.set) {
    res.push([key, this.set[key]])
  }
  return res
}

MyMap.prototype.forEach = function(action) {
  let res = []
  for (let key in this.set) {
    res.push(action(key, this.set[key]))
  }
  return res
}

MyMap.prototype.get = function(key) {
  return this.set[key]
}

MyMap.prototype.has = function(key) {
  return key in this.set
}

MyMap.prototype.keys = function () {
  let res = []
  for (let key in this.set) {
    res.push(key)
  }
  return res
}

MyMap.prototype.values = function() {
  let res = []
  for (let key in this.set) {
    res.push(this.set[key])
  }
  return res
}



//-----------------------------------------------------

//MyArray

function MyArray(...args) {
  if (args.length === 1 && typeof args[0] === 'number') {
    this._length = args[0]
  } else {
    let i = 0
    for (; i < args.length; i++) {
      this[i] = args[i]
    }
    this._length = i
  }
}



Object.defineProperty(MyArray.prototype, 'length', {
  // writable: true,
  enumerable: false,
  // configurable: false,
  get: function() {
    return this._length
  },
  set: function(l) {
    if (l < this._length) {
      for (let i = l; i < this._length; i++) {
        delete this[i]
      }
    }
    this._length = l
  },
})

MyArray.from = function(ary, f, thisArg) {
  let res = new MyArray()
  if (arguments.length === 1) {
    if (typeof ary === 'string') {
      for (let i = 0; i < ary.length; i++) {
        res.push(ary[i])
      }
    } else {
      for (let key in ary) {
        res.push(ary[key])
      }
    }
  } else if (arguments.length === 2) {
    for (let val of ary) {
      res.pish(f(val))
    }
  } else {
    for (let val of ary) {
      res.push(f.call(thisArg, val))
    }
  }
  return res
}

MyArray.isArray = function (ary) {
  return ary.__proto__ === MyArray.prototype
}

MyArray.of = function (...args) {
  let i = 0
  for (; i < args.length; i++) {
    this[i] = args[i]
  }
  this._length = i
}

MyArray.prototype.push = function (...args) {
  for (var i = 0; i < args.length; i++) {
    this[this.length++] = args[i] 
  }
  return this.length
}

MyArray.prototype.concat = function(...args) {
  let res = new MyArray()
  for (let key in this) {
    if (key === '_length') {
      break
    }
    res.push(this[key])
  }
  for (let i = 0; i < args.length; i++) {
    if (MyArray.isArray(args[i])) {
      for (let key in args[i]) {
        if (key === '_length') {
          break
        }
        res.push(args[i][key])
      }
    } else {
      res.push(args[i])
    }
  }
  return res
}

MyArray.prototype.every = function(callback, thisArg = null) {
  for (let key in this) {
    if (key === '_length') {
      break
    }
    if (!callback.call(thisArg, this[key], key, this)) {
      return false
    }
  }
  return true
}

MyArray.prototype.fill = function(value, start = 0, end = this.length) {
  start = start < 0 ? this.length + start : start
  end = end < 0 ? this.length + end : end
  for (let i = start; i < end; i++) {
    this[i] = value
  }
  return this
}

MyArray.prototype.filter = function(callback, thisArg = null) {
  let res = new MyArray
  for (let key in this) {
    if (key === '_length') {
      break
    }
    if (callback.call(thisArg, this[key], key, this)) {
      res.push(this[key])
    }
  }
  return res
}

MyArray.prototype.find = function(callback, thisArg = null) {
  for (let key in this) {
    if (key === '_length') {
      break
    }
    if (callback.call(thisArg, this[key], key, this)) {
      return this[key]
    }
  }
  return undefined
}

MyArray.prototype.findIndex = function(callback, thisArg = null) {
  for (let key in this) {
    if (key === '_length') {
      break
    }
    if (callback.call(thisArg, this[key], key, this)) {
      return +key
    }
  }
  return -1
}

MyArray.prototype.forEach = function(callback, thisArg = null) {
  let res = new MyArray()
  for (let key in this) {
    if (key === '_length') {
      break
    }
    res[this[key]] = callback.call(thisArg, this[key], key, this)
  }
  return res
}

MyArray.prototype.includes = function(searchElement, fromIndex = 0) {
  fromIndex = fromIndex < 0 ? this.length + fromIndex : fromIndex
  if (fromIndex >= this.length) {
    return false
  }
  for (let key in this) {
    if (key < fromIndex) {
      continue
    }
    if (key === '_length') {
      break
    }
    if (this[key] === searchElement) {
      return true
    }
  }
  return false
}

MyArray.prototype.indexOf = function(searchElement, fromIndex = 0) {
  fromIndex = fromIndex < 0 ? this.length + fromIndex : fromIndex
  if (fromIndex >= this.length) {
    return -1
  }
  for (let key in this) {
    if (key < fromIndex) {
      continue
    }
    if (key === '_length') {
      break
    }
    if (this[key] === searchElement) {
      return key
    }
  }
  return -1
}

MyArray.prototype.join = function(separator = '') {
  let res = ''
  let flag = false
  for (let key in this) {
    if (key === '_length') {
      break
    } else if (flag) {
      res += separator
    }
    res += this[key]
    flag = true
  }
  return res
}

MyArray.prototype.keys = function() {
  let res = []
  for (let key in this) {
    if (key === '_length') {
      break
    }
    res.push(key)
  }
  return res
}

MyArray.prototype.lastIndexOf = function(searchElement, fromIndex = this.length - 1) {
  if (fromIndex < -this.length) {
    return -1
  } else if (fromIndex < 0) {
    fromIndex = this.length + fromIndex
  }
  for (let i = fromIndex; i >= 0; i--) {
    if (searchElement === this[i]) {
      return i
    }
  }
  return -1
}

MyArray.prototype.map = function(callback, thisArg = null) {
  let res = new MyArray
  for (let key in this) {
    if (key === '_length') {
      break
    }
    res.push(callback.call(thisArg, this[key], key, this)) 
  }
  return res
}

MyArray.prototype.pop = function() {
  if (this.length === 0) {
    return undefined
  }
  let res = this[this.length - 1]
  this.length--
  return res
}

MyArray.prototype.reduce = function(callback, initialValue) {
  let flag = false
  if (initialValue === undefined) {
    flag = true
  }
  for (let key in this) {
    if (key === '_length') {
      break
    }
    if (flag) {
      flag = false
      initialValue = this[key]
      continue
    }
    initialValue = callback(initialValue, this[key], key, this)
  }
  return initialValue
}

MyArray.prototype.reduceRight = function(callback, initialValue) {
  let flag = false
  if (initialValue === undefined) {
    flag = true
  }
  for (let i= this.length - 1; i >= 0; i--) {
    if (flag) {
      flag = false
      initialValue = this[i]
      continue
    }
    initialValue = callback(initialValue, this[i], i, this)
  }
  return initialValue
}

MyArray.prototype.reverse = function() {
  let val
  let len = this.length
  let n = (len - 1) / 2 | 0
  for (let i = 0; i <= n; i++) {
    val = this[i]
    this[i] = this[len - i - 1]
    this[len - i - 1] = val
  }
  return this
}

MyArray.prototype.shift = function() {
  let res
  let flag = true
  for (let key in this) {
    if (key === '_length') {
      break
    }
    if (flag) {
      flag = false
      res = this[key]
    }
    this[key] = this['' + (+key + 1)]
  }
  this.pop()
  return res
}

MyArray.prototype.slice = function(begin = 0, end = this.length) {
  let res = new MyArray()
  for (let i = begin; i < end; i++) {
    res.push(this[i])
  }
  return res
}


MyArray.prototype.some = function(callback, thisArg = null) {
  for (let key in this) {
    if (key === '_length') {
      break
    }
    if (callback.call(thisArg, this[key], key, this)) {
      return true
    }
  }
  return false
}



Object.defineProperties(MyArray.prototype, {
  '_length': {enumerable: false, configurable: false, writable: true},
  'push': {enumerable: false},
  'concat': {enumerable: false},
  'every': {enumerable: false},
  'fill': {enumerable: false},
  'filter': {enumerable: false},
  'find': {enumerable: false},
  'findIndex': {enumerable: false},
  'forEach': {enumerable: false},
  'includes': {enumerable: false},
  'indexOf': {enumerable: false},
  'join': {enumerable: false},
  'keys': {enumerable: false},
  'lastIndexOf': {enumerable: false},
  'map': {enumerable: false},
  'pop': {enumerable: false},
  'reduce': {enumerable: false},
  'reduceRight': {enumerable: false},
  'reverse': {enumerable: false},
  'shift': {enumerable: false},
  'slice': {enumerable: false},
})
