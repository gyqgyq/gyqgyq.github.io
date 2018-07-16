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
  let res = []
  array.forEach(val => {
    if (comparator(val) !== comparator(value)) {
      res.push(value)
    }
  })
  return res
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
        res.push(val.user)
      }
    })
  } else {
    array.forEach(val => {
      if (!predicate in val) {
        res.push(val.user)
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
  if (array && array.length) {
    return []
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






  return {
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
  }
}()