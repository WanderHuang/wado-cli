exports.getProgressString = function getProgressString (progress) {
  const total = 100
  let res = ''
  progress = Math.floor(progress)
  for (let i = 0; i < total; i++) {
    res += i < progress ? '>' : '='
  }
  return res
}

exports.writeJSON = function writeJSON () {
  
}