export function convertKey(arr, keyMap) {
  let tempString = JSON.stringify(arr)
  for (var key in keyMap) {
    var reg = `/"${key}":/g`
    // eslint-disable-next-line no-eval
    tempString = tempString.replace(eval(reg), '"' + keyMap[key] + '":')
  }
  return JSON.parse(tempString)
}
