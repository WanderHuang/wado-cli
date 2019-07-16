const md5 = require('blueimp-md5');
const { print } = require('../utils/fns')

exports.encodeByMd5 = function encodeByMd5 (key, salt = '-') {
  print(md5(key.split('').reverse().join(salt)).substr(0, 15), 'blue')
}