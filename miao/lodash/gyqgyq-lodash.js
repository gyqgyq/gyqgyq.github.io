var gyqgyq = function() {
  /**
   * [chunk description]
   * @param  {array} array [description]
   * @param  {Number} size  [description]
   * @return {[type]}       [description]
   */
  function chunk(array, size = 1) {
    let res = []
    let arr = []
    for (let i of array) {
      arr.push(i)
      if (arr.length === size) {
        res.push(arr)
        arr = []
      }
    }
    if (arr.length !== 0) {
      res.push(arr)
    }
    return res
  }

  /**
   * [compact description]
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  function compact(array) {
    let res = []
    for (let i = 0; i < array.length; i++) {
      if (array[i]) {
        res.push(array[i])
      }
    }
    return res
  }

  /**
   * [concat description]
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  function concat (array) {
    let res = []
    for (let i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] === 'object') {
        for (let j = 0; j < arguments[i].length; j++) {
          res.push(arguments[i][j])
        }
      } else {
        res.push(arguments[i])
      }
    }
    return res
  }

  /**
   * [difference description]
   * @param  {[type]} array [description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  function difference(array, ...value) {
    let val = flatten([...value])
    return differenceBy(array, val)
  }
  /**
   * [differenceBy description]
   * @param  {[type]} array    [description]
   * @param  {[type]} value    [description]
   * @param  {[type]} iteratee [description]
   * @return {[type]}          [description]
   */
  function differenceBy(array, ...args) {
    let func
    if (typeof args[args.length - 1] === 'function' || typeof args[args.length - 1] === 'string') {
      func = gyqgyq.iteratee(args.pop())
    } else {
      func = gyqgyq.identity
    }
    args = gyqgyq.flattenDeep([...args])
    let newValue = args.map(it => func(it))
    return array.filter(item => !newValue.includes(func(item)))
  }


  /**
   * [differenceWith description]
   * @param  {[type]} array      [description]
   * @param  {[type]} value      [description]
   * @param  {[type]} comparator [description]
   * @return {[type]}            [description]
   */
  function differenceWith (array, value, comparator) {
    return array.filter(val => value.every(item => !comparator(val, item)))
  }

  /**
   * [drop description]
   * @param  {[type]} array [description]
   * @param  {Number} n     [description]
   * @return {[type]}       [description]
   */
  function drop(array, n = 1) {
    return array.splice(n)
  }

  /**
   * [dropRight description]
   * @param  {[type]} array [description]
   * @param  {Number} n     [description]
   * @return {[type]}       [description]
   */
  function dropRight(array, n = 1) {
    return array.splice(0, array.length - n)
  }

  /**
   * [dropRightWhile description]
   * @param  {[type]} array     [description]
   * @param  {[type]} predicate [description]
   * @return {[type]}           [description]
   */
  function dropRightWhile(array, predicate = gyqgyq.identity) {
    let func = iteratee(predicate)
    for (let i = array.length - 1; i >= 0; i--) {
      if (!func(array[i])) {
        return array.splice(0, i + 1)
      }
    }
  }

  /**
   * [dropWhile description]
   * @param  {[type]} array     [description]
   * @param  {[type]} predicate [description]
   * @return {[type]}           [description]
   */
  function dropWhile(array, predicate) {
    let func = iteratee(predicate)
    for (let i = 0; i < array.length; i++) {
      if (!func(array[i])) {
        return array.splice(i)
      }
    }
  }

  /**
   * [fill description]
   * @param  {[type]} array [description]
   * @param  {[type]} value [description]
   * @param  {Number} start [description]
   * @param  {[type]} end   [description]
   * @return {[type]}       [description]
   */
  function fill(array, value, start = 0, end = array.length) {
    for (let i = start; i < end; i++) {
      array[i] = value
    }
    return array
  }


  /**
   * [unary description]
   * @param  {[type]} func [description]
   * @return {[type]}      [description]
   */
  function unary(func) {
    return function (value) {
      return func(value)
    }
  }

  /**
   * [negate description]
   * @param  {[type]} predicate [description]
   * @return {[type]}           [description]
   */
  function negate(predicate) {
    return function (...args) {
      return !predicate(...args)
    }
  }

  /**
   * [range description]
   * @param  {[type]} start [description]
   * @param  {[type]} end   [description]
   * @param  {Number} step  [description]
   * @return {[type]}       [description]
   */
  function range(start, end, step = 1) {
    let res = []
    if (arguments.length === 1) {
      end = start
      start = 0
    }
    if (step === 0) {
      for (let i = start; i < end; i += 1) {
        res.push(start)
      }
      return res
    }
    if (end < start) {
      if (arguments.length < 3) {
        step = -1
      }
      for (let i = start; i > end; i += step) {
        res.push(i)
      }
    } else {
      for (let i = start; i < end; i += step) {
        res.push(i)
      }
    }
    return res
  }

  /**
   * [rangeRight description]
   * @param  {[type]} start [description]
   * @param  {[type]} end   [description]
   * @param  {Number} step  [description]
   * @return {[type]}       [description]
   */
  function rangeRight(start, end, step = 1) {
    let res = []
    if (arguments.length === 1) {
      end = start
      start = 0
    }
    if (step === 0) {
      for (let i = start; i < end; i += 1) {
        res.unshift(start)
      }
      return res
    }
    if (end < start) {
      if (arguments.length < 3) {
        step = -1
      }
      for (let i = start; i > end; i += step) {
        res.unshift(i)
      }
    } else {
      for (let i = start; i < end; i += step) {
        res.unshift(i)
      }
    }
    return res
  }

  /**
   * [inRange description]
   * @param  {[type]} number [description]
   * @param  {[type]} start  [description]
   * @param  {[type]} end    [description]
   * @return {[type]}        [description]
   */
  function inRange(number, start, end) {
    if (arguments.length === 2) {
      end = start
      start = 0
    }
    if (number >= 0) {
      if (number >= start && number < end) {
        return true
      } else {
        return false
      }
    } else {
      if (number <= start && number > end) {
        return true
      } else {
        return false
      }
    }
  }

  /**
   * [sum description]
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  function sum(array) {
    return sumBy(array, gyqgyq.identity)
  }

  /**
   * [sumBy description]
   * @param  {[type]} array    [description]
   * @param  {[type]} iteratee [description]
   * @return {[type]}          [description]
   */
  function sumBy(array, iteratee = gyqgyq.identity) {
    var result = 0
    iteratee = gyqgyq.iteratee(iteratee)
    for (let i = 0; i < array.length; i++) {
      result += iteratee(array[i])
    }
    return result
  }

  /**
   * [uniq description]
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  function uniq(array) {
    return array.reduce((acc, item) => {
      acc.indexOf(item) === -1 ? acc.push(item) : ''
      return acc
    }, [])
  }

  /**
   * [isEqual description]
   * @param  {[type]}  value [description]
   * @param  {[type]}  other [description]
   * @return {Boolean}       [description]
   */
  function isEqual(value, other) {
    if (value === other) {
      return true
    }

    if (value !== value && other !== other) {
      return true
    }
    if (Array.isArray(value) && Array.isArray(other)) {
      let len = value.length
      if (len !== other.length) {
        return false
      }
      for (let i = 0; i < len; i++) {
        if (!isEqual(value[i], other[i])) {
          return false
        }
      }
      return true  
    }
    if (typeof value === 'object' && typeof other === 'object') {
      if (Array.isArray(value) || Array.isArray(other)) {
        return false
      }
      let propNames = []
      for (let i in value) {
        propNames.push(i)
      }
      for (let i in other) {
        propNames.push(i)
      }
      propNames = uniq(propNames)
      for (let prop of propNames) {
        if (!isEqual(value[prop], other[prop])) {
          return false
        }
      }
      return true
    }
    return value === other
  }

  /**
   * [head description]
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  function head(array) {
    return array[0]
  }

  /**
   * [indexOf description]
   * @param  {[type]} array     [description]
   * @param  {[type]} value     [description]
   * @param  {Number} fromIndex [description]
   * @return {[type]}           [description]
   */
  function indexOf(array, value, fromIndex = 0) {
    for (let i = fromIndex; i < array.length; i++) {
      if (array[i] === value) {
        return i
      }
    }
    return -1
  }

  /**
   * [initial description]
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  function initial(array) {
    let res = []
    for (let i = 0; i < array.length - 1; i++) {
      res.push(array[i])
    }
    return res
  }

  /**
   * [intersection description]
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  function intersection(array) {
    let res = []
    arguments[0].forEach(val => {
      if (arguments[1].indexOf(val) !== -1) {
        res.push(val)
      }
    })
    return res
  }

  /**
   * [add description]
   * @param {[type]} augend [description]
   * @param {[type]} addend [description]
   */
  function add(augend, addend) {
    return augend + addend
  }

  /**
   * [ceil description]
   * @param  {[type]} number    [description]
   * @param  {Number} precision [description]
   * @return {[type]}           [description]
   */
  function ceil(number, precision = 0) {
    return Math.ceil(number * 10 ** precision) / 10 ** precision
  }

  /**
   * [divide description]
   * @param  {[type]} dividend [description]
   * @param  {[type]} divisor  [description]
   * @return {[type]}          [description]
   */
  function divide(dividend, divisor) {
    return dividend / divisor
  }

  /**
   * [ceil description]
   * @param  {[type]} number    [description]
   * @param  {Number} precision [description]
   * @return {[type]}           [description]
   */
  function floor(number, precision = 0) {
    return Math.floor(number * 10 ** precision) / 10 ** precision
  }

  /**
   * [max description]
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  function max(array) {
    return array.length === 0 ? undefined : array.reduce((a, b) => a > b ? a : b , -Infinity)
  }

  /**
   * [join description]
   * @param  {[type]} array     [description]
   * @param  {String} separator [description]
   * @return {[type]}           [description]
   */
  function join(array, separator = ',') {
    return array.join(separator)
  }

  /**
   * [lase description]
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  function last(array) {
    return array[array.length - 1]
  }

  /**
   * [lastIndexOf description]
   * @param  {[type]} array     [description]
   * @param  {[type]} value     [description]
   * @param  {[type]} fromIndex [description]
   * @return {[type]}           [description]
   */
  function lastIndexOf(array, value, fromIndex = array.length - 1) {
    for (let i = fromIndex; i >= 0; i--) {
      if (array[i] === value) {
        return i
      }
    }
    return -1
  }

  /**
   * [nth description]
   * @param  {[type]} array [description]
   * @param  {Number} n     [description]
   * @return {[type]}       [description]
   */
  function nth(array, n = 0) {
    return n < 0 ? array[array.length + n] : array[n]
  }

  /**
   * [pull description]
   * @param  {[type]}    array [description]
   * @param  {...[type]} argus [description]
   * @return {[type]}          [description]
   */
  function pull(array, ...argus) {
    return array.filter(item => argus.indexOf(item) === -1)
  }

  /**
   * [pullAll description]
   * @param  {[type]} array  [description]
   * @param  {[type]} values [description]
   * @return {[type]}        [description]
   */
  function pullAll(array, values) {
    return array.filter(item => values.indexOf(item) === -1)
  }

  /**
   * [pullAt description]
   * @param  {[type]} array   [description]
   * @param  {[type]} indexes [description]
   * @return {[type]}         [description]
   */
  function pullAt(array, indexes) {
    let res = []
    for (let i = indexes.length - 1; i >= 0; i--) {
      res.unshift(array.splice(indexes[i], 1)[0])
    }
    return res
  }

  /**
   * [flatten description]
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  function flatten(array) {
    return array.reduce((acc, item) => {
      Array.isArray(item) ? acc.push(...item) : acc.push(item)
      return acc
    }, [])
  }
  // function flatten(ary) {
  //   return [].concat(...ary)
  // }
  /**
   * [flattenDeep description]
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  function flattenDeep(array) {
    function flattenPush(ary) {
      ary.forEach(item => {
        if (Array.isArray(item)) {
          return flattenPush(item)
        } else {
          res.push(item)
          return res
        }
      })
    }
    let res = []
    flattenPush(array)
    return res
  }

  /**
   * [flattenDepth description]
   * @param  {[type]} array [description]
   * @param  {Number} depth [description]
   * @return {[type]}       [description]
   */
  function flattenDepth(array, depth = 1) {
    function flattenPush(ary, depth) {
      if (depth === 0) {
        res.push(...ary)
        return res
      }
      ary.forEach(item => {
        if (Array.isArray(item)) {
          flattenPush(item, depth - 1)
        } else {
          res.push(item)
          return res
        }
      })
    }
    let res = []
    flattenPush(array, depth)
    return res
  }

  /**
   * [fromPairs description]
   * @param  {[type]} pairs [description]
   * @return {[type]}       [description]
   */
  function fromPairs(pairs) {
    let res = {}
    pairs.forEach(item => {
      res[item[0]] = item[1]
    })
    return res
  }

  /**
   * [remove description]
   * @param  {[type]} array     [description]
   * @param  {[type]} predicate [description]
   * @return {[type]}           [description]
   */
  function remove(array, predicate = gyqgyq.identity) {
    return array.reduce((acc, item, index) => {
      if (predicate(item)) {
        acc.push(item)
        array.splice(index, 1)
        return acc
      } else {
        return acc
      }
    }, [])
  }

  /**
   * [reverse description]
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  function reverse(array) {
    let index = (array.length - 1) / 2 | 0
    for (let i = 0; i <= index; i++) {
      let a = array[i]
      array[i] = array[array.length - 1 - i]
      array[array.length - 1 - i] = a
    }
    return array
  }

  /**
   * [slice description]
   * @param  {[type]} array [description]
   * @param  {Number} start [description]
   * @param  {[type]} end   [description]
   * @return {[type]}       [description]
   */
  function slice(array, start = 0, end = array.length) {
    return array.slice(start, end)
  }

  /**
   * [sortedLastIndex description]
   * @param  {[type]} array [description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  function sortedLastIndex(array, value) {
    let left = 0
    let right = array.length - 1
    while (left < right) {
      let mid = (left + right) >>> 1
      let computed = array[mid]
      if (computed <= value) {
        left = mid + 1
      } else if (computed > value) {
        right = mid
      }
    }
    return right
  }

  /**
   * [sortedUniq description]
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  function sortedUniq(array) {
    let res = []
    return array
    .filter((item, index)=> item !== array[index - 1])
    .reduce((acc, val) => {
      res.push(val)
      return res
    }, [])
  }

  /**
   * [sortedUniqBy description]
   * @param  {[type]} array    [description]
   * @param  {[type]} iteratee [description]
   * @return {[type]}          [description]
   */
  function sortedUniqBy(array, iteratee) {
    let res = []
    return array
    .filter((item, index)=> iteratee(item) !== 
      iteratee(array[index - 1]))
    .reduce((acc, val) => {
      res.push(val)
      return res
    }, [])
  }

  /**
   * [tail description]
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  function tail(array) {
    array.shift()
    return array
  }

  /**
   * [take description]
   * @param  {[type]} array [description]
   * @param  {Number} n     [description]
   * @return {[type]}       [description]
   */
  function take(array, n = 1) {
    let res = []
    let size = n > array.length ? array.length : n
    for (let i = 0; i < size; i++) {
      res.push(array[i])
    }
    return res
  }

  /**
   * [takeRight description]
   * @param  {[type]} array [description]
   * @param  {Number} n     [description]
   * @return {[type]}       [description]
   */
  function takeRight(array, n = 1) {
    let res = []
    let size = n > array.length ? 0 : array.length - n
    for (let i = size; i < array.length; i++) {
      res.push(array[i])
    }
    return res
  }

  /**
   * [union description]
   * @param  {...[type]} array [description]
   * @return {[type]}          [description]
   */
  function union(...array) {
    return array.reduce((acc, item) => {
      item.reduce((ac, val) => {
        if (ac.indexOf(val) === -1) {
          ac.push(val)
          return ac
        } else {
          return ac
        }
      }, acc)
      return acc
    }, [])
  }

  /**
   * [xor description]
   * @param  {...[type]} array [description]
   * @return {[type]}          [description]
   */
  function xor(...array) {
    let res =  array.reduce((acc,item) => {
      item.reduce((ac, val) => {
        ac.push(val)
        return ac
      }, acc)
      return acc
    }, [])

    let dict = {}
    res.forEach(item => {
      if (dict[item] === undefined) {
        dict[item] = 1
      } else {
        dict[item] += 1
      }
    })
    return res.filter(item => dict[item] === 1)
  }
  
  /**
   * [identity description]
   * @param  {[type]} v [description]
   * @return {[type]}   [description]
   */
  function identity(v) {
    return v
  }
  
  /**
   * [property description]
   * @param  {[type]} propName [description]
   * @return {[type]}          [description]
   */
  function property(propName) {
    let name = propName.split('.')
    if (name.length === 1) {
      return function (obj) {
        return obj[propName]
      }
    } else {
      return function (obj) {
        return obj[name[0]][name[1]]
      }
    }
    
  }

  /**
   * 返回函数深度对比对象子集
   * @param  {[type]} src [description]
   * @return {[type]}     [description]
   */
  function matches(src) {
    return function (obj) {
      for (let key in src) {
        if (src[key] !== obj[key]) {
          if (!gyqgyq.isMatch(obj[key], src[key])) {
            return false
          }
        } 
      }
      return true
    }
  }

  /**
   * 深度对比对象是否是子集
   * @param  {[type]}  object [description]
   * @param  {[type]}  source [description]
   * @return {Boolean}        [description]
   */
  function isMatch(object, source) {
    if (typeof object !== 'object' || typeof source !== 'object') {
      return false
    }
    for (let key in source) {
      if (object[key] !== source[key]) {
        if (!isMatch(object[key], source[key])) {
          return false
        }
      }
    }
    return true
  }
  
  /**
   * [fromPairs description]
   * @param  {[type]} pairs [description]
   * @return {[type]}       [description]
   */
  function fromPairs(pairs) {
    let res = {}
    for (let i = 0; i < pairs.length; i++) {
      res[pairs[i][0]] = pairs[i][1]
    }
    return res
  }

  /**
   * [matchesProperty description]
   * @param  {[type]} path     [description]
   * @param  {[type]} srcValue [description]
   * @return {[type]}          [description]
   */
  function matchesProperty(path, srcValue) {
    let ary = [].concat(path, srcValue)
    return matches(fromPairs([ary]))
  }

  /**
   * [findIndex description]
   * @param  {[type]} array     [description]
   * @param  {[type]} predicate [description]
   * @param  {Number} fromIndex [description]
   * @return {[type]}           [description]
   */
  function findIndex(array, predicate = gyqgyq.identity, fromIndex = 0) {
    let func
    if (typeof predicate === 'function') {
      func = predicate
    } else if (typeof predicate === 'string') {
      func = gyqgyq.property(predicate)
    } else if (Array.isArray(predicate)) {
      func = gyqgyq.matchesProperty(predicate)
    } else {
      func = gyqgyq.matches(predicate)
    }
    for (let i = fromIndex; i < array.length; i++) {
      if (func(array[i])) {
        return i
      }
    }
    return -1
  }

  /**
   * [findLastIndex description]
   * @param  {[type]} array     [description]
   * @param  {[type]} predicate [description]
   * @param  {[type]} fromIndex [description]
   * @return {[type]}           [description]
   */
  function findLastIndex(array, predicate = gyqgyq.identity, fromIndex = array.length - 1) {
    let func
    if (typeof predicate === 'function') {
      func = predicate
    } else if (typeof predicate === 'string') {
      func = gyqgyq.property(predicate)
    } else if (Array.isArray(predicate)) {
      func = gyqgyq.matchesProperty(predicate)
    } else {
      func = gyqgyq.matches(predicate)
    }
    for (let i = fromIndex; i >= 0; i--) {
      if (func(array[i])) {
        return i
      }
    }
    return -1
  }

  /**
   * [intersectionBy description]
   * @param  {[type]} array    [description]
   * @param  {[type]} ary      [description]
   * @param  {[type]} iteratee [description]
   * @return {[type]}          [description]
   */
  function intersectionBy(array, ary, iteratee = gyqgyq.identity) {
    let func = gyqgyq.iteratee(iteratee)
    let newAry = ary.map(x => func(x))
    return array.filter(item => newAry.includes(func(item)))
  } 

  /**
   * [intersectionWith description]
   * @param  {[type]} array      [description]
   * @param  {[type]} other      [description]
   * @param  {[type]} comparator [description]
   * @return {[type]}            [description]
   */
  function intersectionWith(array, other, comparator) {
    return array.filter(item => {
      for (let i = 0; i < other.length; i++) {
        if (comparator(item, other[i])) {
          return true
        }
      }
      return false
    })
  }

  /**
   * [pullAllBy description]
   * @param  {[type]} array    [description]
   * @param  {[type]} values   [description]
   * @param  {[type]} iteratee [description]
   * @return {[type]}          [description]
   */
  function pullAllBy(array, values, iteratee = gyqgyq.identity) {
    let func = gyqgyq.iteratee(iteratee)
    let newVal = values.map(x => func(x))
    return array.filter(item => gyqgyq.indexOf(newVal, func(item)) === -1)
  }

  /**
   * [pullAllWith description]
   * @param  {[type]} array      [description]
   * @param  {[type]} values     [description]
   * @param  {[type]} comparator [description]
   * @return {[type]}            [description]
   */
  function pullAllWith(array, values, comparator) {
    return array.filter(item => {
      for (let i = 0; i < values.length; i++) {
        if (comparator(item, values[i])) {
          return false
        }
      }
      return true
    })
  }

  /**
   * [sortedIndex description]
   * @param  {[type]} array [description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  function sortedIndex(array, value) {
    let left = 0
    let right = array.length - 1
    while (left < right) {
      let mid = (left + right) >>> 1
      let computed = array[mid]
      if (computed < value) {
        left = mid + 1
      } else if (computed >= value) {
        right = mid
      }
    }
    return right
  }


  function sortedIndexBy(array, value, iteratee = gyqgyq.identity) {
    let func = gyqgyq.iteratee(iteratee)
    let left = 0
    let right = array.length
    let ary = array.map(x => func(x))
    let val = func(value)
    while (left < right) {
      let mid = (left + right) >>> 1
      if (ary[mid] >= val) {
        right = mid 
      } else {
        left = mid + 1
      }
    }
    return right
  }


  function iteratee(shorthand = gyqgyq.identity) {
    if (typeof shorthand === 'function') {
      return shorthand
    } else if (typeof shorthand === 'string') {
      return gyqgyq.property(shorthand)
    } else if (Array.isArray(shorthand)) {
      return gyqgyq.matchesProperty(shorthand)
    } else {
      return gyqgyq.matches(shorthand)
    }
  }

  function keyBy(collection, iteratee = gyqgyq.identity) {
    let obj = {}
    let func = gyqgyq.iteratee(iteratee)
    for (let item of collection) {
      obj[func(item)] = item
    }
    return obj
  }


  function groupBy (collection, iteratee = gyqgyq.identity) {
    let func = gyqgyq.iteratee(iteratee)
    return collection.reduce((result, item, key) => (key = func(item), key in result ? result[key].push(item) : result[key] = [item], result), {})
  }


  function after(n, func) {
    let c = 0
    let lastResult
    return function(...args) {
      c++
      if (c >= n) {
        lastResult = func(...args)
      }
      return lastResult
    }
  }

  function before(n, func) {
    let c = 0
    let result
    return function (...args) {
      c++
      if (c <= n) {
        result = func(...args)
      }
      return result
    }
  }


  function ary(func, n = func.length) {
    return function (...args) {
      return func(...args.slice(0, n))
    }
  }

  function flip(func) {
    return function(...args) {
      return func(...args.reverse())
    }
  }
  function spread(func, start = 0) {
    return function(ary) {
      return func.apply(null, ary)
    }
  }

  function sortedIndexOf(array, value) {
    let left = 0
    let right = array.length - 1
    while (left < right) {
      let mid = (left + right) >>> 1
      let computed = array[mid]
      if (computed < value) {
        left = mid + 1
      } else if (computed >= value) {
        right = mid
      }
    }
    return right
  }

  function sortedLastIndex(array, value) {
    let left = 0
    let right = array.length - 1
    while (left < right) {
      let mid = (left + right) >>> 1
      let computed = array[mid]
      if (computed <= value) {
        left = mid + 1
      } else if (computed > value) {
        right = mid
      }
    }
    return right
  }

  function sortedLastIndexBy(array, value, iteratee = gyqgyq.identity) {
    let func = gyqgyq.iteratee(iteratee)
    let left = 0
    let right = array.length
    let ary = array.map(x => func(x))
    let val = func(value)
    while (left < right) {
      let mid = (left + right) >>> 1
      if (ary[mid] > val) {
        right = mid 
      } else {
        left = mid + 1
      }
    }
    return right
  }

  function sortedLastIndexOf(array, value) {
    let left = 0
    let right = array.length - 1
    while (left < right) {
      let mid = (left + right) >>> 1
      let computed = array[mid]
      if (computed <= value) {
        left = mid + 1
      } else if (computed > value) {
        right = mid
      }
    }
    return right - 1
  }

  function takeRightWhile(array, predicate = gyqgyq.identity) {
    let func = gyqgyq.iteratee(predicate)
    let res = []
    for (let i = array.length - 1; i >= 0; i--) {
      if (func(array[i])) {
        res.unshift(array[i])
      } else {
        break
      }
    }
    return res
  }

  function takeWhile(array, predicate = gyqgyq.iteratee) {
    let func = gyqgyq.iteratee(predicate)
    let res = []
    for (let i = 0; i < array.length; i++) {
      if (func(array[i])) {
        res.push(array[i])
      } else {
        break
      }
    }
    return res
  }

  function unionBy(...args) {
    let func
    if (typeof args[args.length - 1] === 'function' || typeof args[args.length - 1] === 'string') {
      func = gyqgyq.iteratee(args.pop())
    } else {
      func = gyqgyq.identity
    }
    args = gyqgyq.flattenDepth(args)
    let res = []
    let value = []
    for (let val of args) {
      if (!value.includes(func(val))) {
        res.push(val)
        value.push(func(val))
      }
    }
    return res
  }
  function unionWith(...args) {
    let func
    if (typeof args[args.length - 1] === 'function') {
      func = gyqgyq.iteratee(args.pop())
    } else {
      func = gyqgyq.identity
    }
    args = gyqgyq.flattenDepth(args)
    let res = []
    let flag
    for (let val of args) {
      flag = true
      for (let i of res) {
        if (func(val, i)) {
          flag = false
          break
        }
      }
      if (flag) {
        res.push(val)
      }
    }
    return res
  }


  function uniqBy(array, iteratee = gyqgyq.identity) {
    let func = gyqgyq.iteratee(iteratee)
    let res = []
    let val = []
    for (let i of array) {
      if (!val.includes(func(i))) {
        res.push(i)
        val.push(func(i))
      }
    }
    return res
  }


  function uniqWith(array, comparator) {
    let res = []
    let flag
    for (let i = 0; i < array.length; i++) {
      flag = true
      for (let j = 0; j < res.length; j++) {
        if (comparator(array[i], res[j])) {
          flag = false
          break
        }
      }
      if (flag) {
        res.push(array[i])
      }
    }
    return res
  }

  function unzip(array) {
    let str = []
    let num = []
    let bool = []
    array = gyqgyq.flattenDepth(array)
    array.forEach(item => {
      let t = typeof item
      if (t === 'string') {
        str.push(item)
      } else if (t === 'number') {
        num.push(item)
      } else {
        bool.push(item)
      }
    })
    return [str, num, bool]
  }


  function unzipWith(array, iteratee = gyqgyq.identity) {
    let func = gyqgyq.iteratee(iteratee)
    let res = []
    for (let i = 0; i < array[0].length; i++) {
      res.push(func.bind(null, array[0][i]))
    }
    for (let i = 0; i < array[1].length; i++) {
      res[i] = res[i](array[1][i])
    }
    return res
  }


  function without(array, ...args) {
    return array.filter(item => !args.includes(item))
  }

  function countBy(collection, iteratee = gyqgyq.identity) {
    let func = gyqgyq.iteratee(iteratee)
    let res = {}
    collection.forEach(item => {
      if (func(item)in res) {
        res[func(item)] += 1
      } else {
        res[func(item)] = 1
      }
    })
    return res
  }


  function forEach(collection, iteratee = gyqgyq.identity) {
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        iteratee(collection[i], i, collection)
      }
    } else {
      let key = Object.keys(collection)
      for (let i = 0; i < key.length; i++) {
        iteratee(collection[key[i]], key[i], collection)
      }
    }
    return collection
  }


  function forEachRight(collection, iteratee = gyqgyq.identity) {
    if (Array.isArray(collection)) {
      for (let i = collection.length - 1; i >= 0; i--) {
        iteratee(collection[i], i, collection)
      }
    } else {
      let key = Object.keys(collection)
      for (let i = key.length - 1; i >= 0; i--) {
        iteratee(collection[key[i]], key[i], collection)
      }
    }
    return collection
  }


  function every(collection, predicate = gyqgyq.identity) {
    let func = gyqgyq.iteratee(predicate)
    for (let i = 0; i < collection.length; i++) {
      if (!func(collection[i], i, collection)) {
        return false
      }
    }
    return true
  }

  function filter(collection, predicate = gyqgyq.identity) {
    let func = gyqgyq.iteratee(predicate)
    let res = []
    gyqgyq.forEach(collection, function (item, key, collection) {
      if (func(item, key, collection)) {
        res.push(item)
      }
    })
    return res
  }


  function find(collection, predicate = gyqgyq.identity, fromIndex = 0) {
    let func = gyqgyq.iteratee(predicate)
    for (let i = fromIndex; i < collection.length; i++) {
      if (func(collection[i], i, collection)) {
        return collection[i]
      }
    }
    return undefined
  }


  function findLast(collection, predicate = gyqgyq.identity, fromIndex = collection.length - 1) {
    let func = gyqgyq.iteratee(predicate)
    for (let i = fromIndex; i >= 0; i--) {
      if (func(collection[i], i, collection)) {
        return collection[i]
      }
    }
    return undefined
  }


  function flatMap(collection, iteratee = gyqgyq.identity) {
    let res = []
    let func = gyqgyq.iteratee(iteratee)
    for (let i = 0; i < collection.length; i++) {
      res.push(func(collection[i], i, collection))
    }
    return flatten(res)
  }


  function flatMapDeep(collection, iteratee = gyqgyq.identity) {
    let res = []
    let func = gyqgyq.iteratee(iteratee)
    for (let i = 0; i < collection.length; i++) {
      res.push(func(collection[i], i, collection))
    }
    return flattenDeep(res)
  }


  function flatMapDepth(collection, iteratee = gyqgyq.identity, depth = 1) {
    let res = []
    let func = gyqgyq.iteratee(iteratee)
    for (let i = 0; i < collection.length; i++) {
      res.push(func(collection[i], i, collection))
    }
    return flattenDepth(res, depth)
  }

  function includes(collection, value, fromIndex = 0) {
    if (Array.isArray(collection)) {
      for (let i = fromIndex; i < collection.length; i++) {
        if (collection[i] === value) {
          return true
        }
      }
    } else if (typeof collection === 'string') {
      for (let i = fromIndex; i < collection.length; i++) {
        let j = 0
        for (; j < value.length; j++) {
          if (collection[i] === value[j]) {
            if (collection[i + j] !== value[j]) {
              break
            }
          } 
        }
        if (j === value.length) {
          return true
        }
      }
    } else {
      for (let key in collection) {
        if (collection[key] === value) {
          return true
        }
      }
    }
    return false
  }

  function bind(f, thisArg, ...fixedArgs) {
    return function (...restArgs) {
      return f.apply(thisArg, [...fixedArgs, ...restArgs])
    }
  }


  function map(collection, iteratee = gyqgyq.identity) {
    let func = gyqgyq.iteratee(iteratee)
    let res = []
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        res.push(func(collection[i], i, collection))
      }
    } else {
      for (let key in collection) {
        res.push(func(collection[key], key, collection))
      }
    }
    return res
  }

  
  function partition(collection, predicate = gyqgyq.identity) {
    let func = gyqgyq.iteratee(predicate)
    let t = []
    let f = []
    for (let i = 0; i < collection.length; i++) {
      if (func(collection[i])) {
        t.push(collection[i])
      } else {
        f.push(collection[i])
      }
    }
    return [t, f]
  }

  function reduce(collection, iteratee = gyqgyq.identity, accumulator) {
    let func = gyqgyq.iteratee(iteratee)
    if (Array.isArray(collection)) {
      let i = 0
      if (arguments.length < 3) {
        i = 1
        accumulator = collection[0]
      }
      for (; i < collection.length; i++) {
        accumulator = func(accumulator, collection[i],i ,collection)
      }
      return accumulator
    }

    for (let key in collection) {
      if (arguments.length < 3 && accumulator === undefined) {
        accumulator = collection[key]
      } 
      accumulator = func(accumulator, collection[key], key, collection)
    }
    return accumulator
  }

  function reduceRight(collection, iteratee = gyqgyq.identity, accumulator) {
    let func = gyqgyq.iteratee(iteratee)
    if (Array.isArray(collection)) {
      let i = collection.length - 1
      if (arguments.length < 3) {
        i = collection.length - 2
        accumulator = collection[collection.length - 1]
      }
      for (; i >= 0; i--) {
        accumulator = func(accumulator, collection[i],i ,collection)
      }
      return accumulator
    }

    for (let key in collection) {
      if (arguments.length < 3 && accumulator === undefined) {
        accumulator = collection[key]
      } 
      accumulator = func(accumulator, collection[key], key, collection)
    }
    return accumulator
  }


  function reject(collection, predicate = gyqgyq.identity) {
    let func = gyqgyq.iteratee(predicate)
    return gyqgyq.reduce(collection, (acc, item, index) => {
      if (!func(item)) {
        acc.push(item)
      }
      return acc
    }, [])
  }
  

  function sample(collection) {
    let len = collection.length
    let n = Math.random() * len | 0
    return collection[n]
  }

  function sampleSize(collection, n = 1) {
    let res = []
    while (n > 0) {
      let len = collection.length
      let num = Math.random() * len | 0
      res.push(...collection.splice(num, 1))
      n--
    }
    return res
  }

  function shuffle(collection) {
    let res = []
    while (collection.length > 0) {
      let len = collection.length
      let num = Math.random() * len | 0
      res.push(...collection.splice(num, 1))
    }
    return res
  }

  function size(collection) {
    if(Array.isArray(collection || typeof collection === 'string')) {
      return collection.length
    } else {
      let count = 0
      for (let key in collection) {
        count++
      }
      return count
    }
  }

  function some(collection, predicate = gyqgyq.identity) {
    let func = gyqgyq.iteratee(predicate)
    for (let i = 0; i < collection.length; i++) {
      if (func(collection[i])) {
        return true
      }
    }
    return false
  }

  function ary(func, n = func.length) {
    return function (...args) {
      return func(...args.slice(0, n))
    }
  }

  function forOwn(object, iteratee = gyqgyq.identity) {
    let func = gyqgyq.iteratee(iteratee)
    for (let key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        func(object[key], key)
      }
    }
    return object
  }

  function forOwnRight(object, iteratee = gyqgyq.identity) {
    let func = gyqgyq.iteratee(iteratee)
    let ary = []
    for (let key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        ary.push([object[key], key])
      }
    }
    for (let i = ary.length - 1; i >= 0; i--) {
      func.apply(null, ary[i])
    }
    return object
  }

  function assign(object, ...args) {
    let hasOwn = Object.prototype.hasOwnProperty
    for (let i = 0; i < args.length; i++) {
      for (let key in args[i]) {
        if (hasOwn.call(args[i], key)) {
          object[key] = args[i][key]
        }
      }
    }
    return object
  }

  function merge(object, ...args) {
    let hasOwn = Object.prototype.hasOwnProperty
    for (let i = 0; i < args.length; i++) {
      for (let key in args[i]) {
        if (hasOwn.call(args[i], key)) {
          if (key in object) {
            if (Array.isArray(object[key]) || typeof object[key] === 'object') {
              object[key] = [gyqgyq.assign(...object[key]), gyqgyq.assign(...args[i][key])]
            } else {
              object[key] = args[i][key]
            }
          } else {
            object[key] = args[i][key]
          }
        }
      }
    }
    return object
  }

  function keys(object) {
    let res = []
    if (typeof object === 'object') {
      for (let key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          res.push(key)
        }
      }
      return res
    } else {
      for (let i in object) {
        res.push('' + i)
      }
      return res
    }
  }

  function toPairs(object) {
    let res = []
    for (let key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        res.push([key, object[key]])
      }
    }
    return res
  }

  function values(object) {
    let res = []
    if (typeof object === 'object') {
      for (let key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          res.push(object[key])
        }
      }
      return res
    } else {
      for (let i = 0; i < object.length; i++) {
        res.push(object[i])
      }
      return res
    }
  }

  function bindKey(object, key, partials) {
    return function(...args) {
      return object[key].apply(object, [partials, args])
    }
  }

  function xorBy(...args) {
    let func
    if (!Array.isArray(args[args.length - 1])) {
      func = gyqgyq.iteratee(args.pop())
    } else {
      func = gyqgyq.identity
    }
    let ary = flattenDeep(args)
    let dict = ary.reduce((acc, item) => {
      let a = func(item)
      if (a in acc) {
        acc[a] += 1
      } else {
        acc[a] = 1
      }
      return acc
    }, {})
    return ary.filter(it => dict[func(it)] === 1)
  }

  function xorWith(...args) {
    let func = args.pop()
    for (let i = 0; i < args[0].length; i++) {
      for (let j = 0; j < args[1].length; j++) {
        if (func(args[0][i], args[1][j])) {
          args[0].splice(i, 1)
          i--
          args[1].splice(j, 1)
          j--
        }
      }
    }
    return flattenDeep(args)
  }

  function zip(...args) {
    let res = []
    let flag = true
    let count = 0
    while (flag) {
      flag = false
      res[count] = []
      for (let i = 0; i < args.length; i++) {
        res[count].push(args[i][count])
        if (args[i][count + 1] !== undefined) {
          flag = true
        }
      }
      count++
    }
    return res 
  }

  function zipObject(props = [], value = []) {
    let res = {}
    for (let i = 0; i < props.length; i++) {
      res[props[i]] = value[i]
    }
    return res
  }

  function zipWith(...args) {
    let func
    if (!Array.isArray(args[args.length - 1])) {
      func = gyqgyq.iteratee(args.pop())
    } else {
      func = gyqgyq.identity
    }
    let res = []
    let count = 0
    while (count < args[0].length) {
      res.push(func(...args.reduce((acc, item) => {
        acc.push(item[count])
        return acc
      }, [])))
      count++
    }
    return res
  }

  function castArray(value) {
    if (Array.isArray(value)) {
      return value
    } else if (value === undefined) {
      return []
    } else {
      return [value]
    }
  }

  function clone(value) {
    return value
  }

  function conformsTo(object, source) {
    for (let key in source) {
      if (!source[key](object[key])) {
        return false
      }
    }
    return true
  }
  

  function eq(value, other) {
    if (value !== value && other !== other) {
      return true
    }
    return value === other
  }

  function gt(value, other) {
    return value > other
  }

  function gte(value, other) {
    return value >= other
  }

  function isArray(value) {
    return Array.isArray(value)
  }

  function isArrayBuffer(value) {
    return value.__proto__ === ArrayBuffer.prototype
  }

  function isArrayLike(value) {
    if (typeof value === 'function' || value === undefined) {
      return false
    }
    return true
  }

  function isArrayLikeObject(value) {
    if (Array.isArray(value) || typeof value === 'object') {
      return true
    }
    return false
  }

  function isBoolean(value) {
    return value === true || value === false
  }

  function isBuffer(value) {
    return value.__proto__ === Buffer.prototype
  }

  function isDate(value) {
    return value.__proto__ === Date.prototype
  }

  function isError(value) {
    return value.__proto__ === Error.prototype
  }

  function isFinite(value) {
    if (value === Infinity || value === -Infinity || typeof value !== 'number') {
      return false
    }
    return true
  }

  function isFunction(value) {
    return typeof value === 'function'
  }

  function isMap(value) {
    return value.__proto__ === Map.prototype
  }

  function isMatchWith(object, source, customizer) {
    for (let key in object) {
      if (source[key] !== undefined) {
        if (customizer(object[key], source[key])) {
          return true
        }
      }
    }
    return false
  }

  function isNaN(value) {
    if (value !== value) {
      return true
    } else if (typeof value === 'object') {
      return value.toString() === 'NaN'
    }
    return false
  }

  function isNil(value) {
    return value === undefined || value === null || value === void 0
  }
  
  function isNull(value) {
    return  value === null
  }

  function isNumber(value) {
    return typeof value === 'number'
  }

  function isObject(value) {
    return typeof value === 'object'
  }

  function isObjectLike(value) {
    return typeof value === 'object'
  }

  function isSafeInteger(value) {
    if (typeof value === 'number') {
      if (value > Number.MIN_VALUE && value < Number.MAX_VALUE) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  function isSet(value) {
    return value.__proto__ === Set.prototype
  }

  function isString(value) {
    return typeof value === 'string'
  }

  function isSymbol(value) {
    return typeof value === 'symbol'
  }

  function isTypedArray(value) {
    return value.__proto__ = Uint8Array.prototype
  }

  function isUndefined(value) {
    return value === undefined || value === void 0
  }

  function isWeakMap(value) {
    return value.__proto__ === WeakMap.prototype
  }

  function isWeakSet(value) {
    return value.__proto__ === WeakSet.prototype
  }

  function lt(value, other) {
    return value > other
  }

  function lte(value, other) {
    return value >= other
  }

  function toArray(value) {
    let res = []
    if (typeof value === 'string') {
      for (let i = 0; i < value.length; i++) {
        res.push(value[i])
      }
    } else if (typeof value === 'object') {
      for (let key in value) {
        res.push(value[key])
      }
    }
    return res
  }

  function toString(value) {
    if (value === null || value === undefined) {
      return ''
    } else if (typeof value === 'number') {
      if (value === -0) {
        return '-0'
      } else {
        return '' + value
      }
    }
    return value.toString()
  }

  function maxBy(array, iteratee = gyqgyq.identity) {
    let func = gyqgyq.iteratee(iteratee)
    return array.reduce((acc, iter) => func(acc) > func(iter) ? acc : iter)
  }

  function mean(array) {
    return array.reduce((res, item, index) => (res * index + item) / (index + 1))
  }

  function meanBy(array, iteratee = gyqgyq.identity) {
    let func = gyqgyq.iteratee(iteratee)
    return array.reduce((res, item, index) => (res * index + func(item)) / (index + 1), 0)
  }

  function min(array) {
    if (array.length === 0) {
      return undefined
    }
    return gyqgyq.reduce(array, (res, item) => res < item ? res : item)
  }

  function minBy(array, iteratee = gyqgyq.identity) {
    let func = gyqgyq.iteratee(iteratee)
    return gyqgyq.reduce(array, (res, item) => func(res) < func(item) ? res : item)
  }

  function multiply(multiplier, multiplicand) {
    return multiplicand * multiplier
  }

  function round(number, precision = 0) {
    return Math.round(number * 10 ** precision) * 10 ** (-precision)
  }

  function subtract(minuend, subtrahend) {
    return minuend - subtrahend
  }

  function clamp(number, lower, upper) {
    return [number, lower, upper].sort((a,b) => a - b)[1]
  }

  
  //-----------------啪-------------------
  return {
    clamp: clamp,
    subtract: subtract,
    round: round,
    multiply: multiply,
    minBy: minBy,
    min: min,
    meanBy: meanBy,
    mean: mean,
    maxBy: maxBy,
    toString: toString,
    toArray: toArray,
    lte: lte,
    lt: lt,
    isWeakSet: isWeakSet,
    isWeakMap: isWeakMap,
    isUndefined: isUndefined,
    isTypedArray: isTypedArray,
    isSymbol: isSymbol,
    isString: isString,
    isSet: isSet,
    isSafeInteger: isSafeInteger,
    isNumber: isNumber,
    isNull: isNull,
    isNil: isNil,
    isNaN: isNaN,
    isMatchWith: isMatchWith,
    isMap: isMap,
    isFunction: isFunction,
    isFinite: isFinite,
    isError: isError,
    isDate: isDate,
    isBuffer: isBuffer,
    isBoolean: isBoolean,
    isArrayLikeObject: isArrayLikeObject,
    isArrayLike: isArrayLike,
    isArrayBuffer: isArrayBuffer,
    isArray: isArray,
    gte: gte,
    gt: gt,
    eq: eq,
    conformsTo: conformsTo,
    clone: clone,
    castArray: castArray,
    zipWith: zipWith,
    zipObject: zipObject,
    zip: zip,
    xorWith: xorWith,
    xorBy: xorBy,
    bindKey: bindKey,
    values: values,
    toPairs: toPairs,
    keys: keys,
    merge: merge,
    assign: assign,
    forOwnRight: forOwnRight,
    forOwn: forOwn,
    ary: ary,
    some: some,
    size: size,
    shuffle: shuffle,
    sampleSize: sampleSize,
    sample: sample,
    reject: reject,
    reduceRight: reduceRight,
    reduce: reduce,
    partition: partition,
    map: map,
    bind: bind,
    includes: includes,
    flatMapDepth: flatMapDepth,
    flatMapDeep: flatMapDeep,
    flatMap: flatMap,
    findLast: findLast,
    find: find,
    filter: filter,
    every: every,
    forEachRight: forEachRight,
    forEach: forEach,
    countBy: countBy,
    without: without,
    unzipWith: unzipWith,
    unzip: unzip,
    uniqWith: uniqWith,
    uniqBy: uniqBy,
    unionWith: unionWith,
    unionBy: unionBy,
    takeWhile: takeWhile,
    takeRightWhile: takeRightWhile,
    sortedLastIndexOf: sortedLastIndexOf,
    sortedLastIndexBy: sortedLastIndexBy,
    sortedLastIndex: sortedLastIndex,
    sortedIndexOf: sortedIndexOf,
    spread: spread,
    flip: flip,
    ary: ary,
    before: before,
    after: after,
    groupBy: groupBy,
    keyBy: keyBy,
    iteratee: iteratee,
    sortedIndexBy: sortedIndexBy,
    pullAllWith: pullAllWith,
    pullAllBy: pullAllBy,
    intersectionWith: intersectionWith,
    intersectionBy: intersectionBy,
    findLastIndex: findLastIndex,
    findIndex: findIndex,
    matchesProperty: matchesProperty,
    fromPairs: fromPairs,
    matches: matches,
    isMatch: isMatch,
    property: property,
    identity: identity,
    xor: xor,
    union: union,
    takeRight: takeRight,
    take: take,
    tail: tail,
    sortedUniqBy: sortedUniqBy,
    sortedUniq: sortedUniq,
    sortedLastIndex: sortedLastIndex,
    sortedIndex: sortedIndex,
    slice: slice,
    reverse: reverse,
    remove: remove,
    fromPairs: fromPairs,
    flattenDepth: flattenDepth,
    flattenDeep: flattenDeep,
    flatten: flatten,
    pullAt: pullAt,
    pullAll: pullAll,
    chunk: chunk,
    compact: compact,
    concat: concat,
    difference: difference,
    differenceBy: differenceBy,
    differenceWith: differenceWith,
    drop: drop,
    dropRight: dropRight,
    dropRightWhile: dropRightWhile,
    dropWhile: dropWhile,
    fill: fill,
    unary: unary,
    negate: negate,
    range: range,
    rangeRight: rangeRight,
    inRange: inRange,
    sum: sum,
    sumBy: sumBy,
    uniq: uniq,
    isEqual: isEqual,
    head: head,
    indexOf: indexOf,
    initial: initial,
    intersection: intersection,
    add: add,
    ceil: ceil,
    divide: divide,
    floor: floor,
    max: max,
    join: join,
    last: last,
    lastIndexOf: lastIndexOf,
    nth: nth,
    pull: pull,
  }
}()