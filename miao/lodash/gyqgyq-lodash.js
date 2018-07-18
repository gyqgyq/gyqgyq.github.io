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
  function difference(array, value) {
    if (value === undefined || array === []) {
      return array
    }
    let res = []
    let val = []
    for (let i = 1; i < arguments.length; i++) {
      for (let j = 0; j < arguments[i].length; j++) {
        val.push(arguments[i][j])
      }
    }
    for (let i of array) {
      if (val.indexOf(i) === -1) {
        res.push(i)
      }
    }
    return res
  }
  /**
   * [differenceBy description]
   * @param  {[type]} array    [description]
   * @param  {[type]} value    [description]
   * @param  {[type]} iteratee [description]
   * @return {[type]}          [description]
   */
  function differenceBy(array, value, iteratee) {
    let res = []
    let newValue = []
    if (typeof iteratee === 'function') {
      for (let i of value) {
        newValue.push(iteratee(i))
      }
      for (let i of array) {
        if (newValue.indexOf(iteratee(i)) === -1) {
          res.push(i)
        }
      }
    } else {
      for (let i of value) {
        newValue.push(i[iteratee])
      }
      for (let i of array) {
        if (newValue.indexOf(i[iteratee]) === -1) {
          res.push(i)
        }
      }
    }
    return res
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
  function dropRightWhile(array, predicate) {
    let res = []
    if (typeof predicate === 'function') {
      array.forEach(val => {
        if (!predicate(val)) {
          res.push(val)
        }
      })
    } else if (Array.isArray(predicate)) {
      array.forEach(val => {
        if (val[predicate[0]] !== predicate[1]) {
          res.push(val)
        }
      })
    } else if (typeof predicate === 'object') {
      array.forEach(val => {
        if (!isEqual(val, predicate)) {
          res.push(val)
        }
      })
    } else if (typeof predicate === 'string') {
      array.forEach(val => {
        if (predicate in val) {
          res.push(val)
        }
      })
    }
    return res
  }

  /**
   * [dropWhile description]
   * @param  {[type]} array     [description]
   * @param  {[type]} predicate [description]
   * @return {[type]}           [description]
   */
  function dropWhile(array, predicate) {
    let res = []
    if (typeof predicate === 'function') {
      array.forEach(val => {
        if (!predicate(val)) {
          res.push(val)
        }
      })
    } else if (Array.isArray(predicate)) {
      array.forEach(val => {
        if (val[predicate[0]] !== predicate[1]) {
          res.push(val)
        }
      })
    } else if (typeof predicate === 'object') {
      array.forEach(val => {
        if (!isEqual(val, predicate)) {
          res.push(val)
        }
      })
    } else if (typeof predicate === 'string') {
      array.forEach(val => {
        if (predicate in val) {
          res.push(val)
        }
      })
    }
    return res
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
    let sum = 0
    for (let i = 0; i < array.length; i++) {
      sum += array[i]
    }
    return sum
  }

  /**
   * [sumBy description]
   * @param  {[type]} array    [description]
   * @param  {[type]} iteratee [description]
   * @return {[type]}          [description]
   */
  function sumBy(array, iteratee = identity) {
    let sum = 0
    if (typeof iteratee === 'function') {
      for (let i = 0; i < array.length; i++) {
        sum += iteratee(array[i])
      }
    } else {
      for (let i = 0; i < array.length; i++) {
        sum += array[i][iteratee]
      }
    } 
    return sum
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
        res.push(ary)
        return
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


  function union(...array) {
    
  }


  return {
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