var gyqgyq = function() {

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



  return {
    chunk: chunk
  }
}()