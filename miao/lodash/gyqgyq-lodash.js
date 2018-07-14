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
    for (let i of array) {
      if (value.indexOf(i) === -1) {
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



  return {
    chunk: chunk
    compact: compact
    concat: concat
    difference: difference
    differenceBy: differenceBy
  }
}()