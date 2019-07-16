const shell = require("shelljs");
const { print } = require('../utils/fns');
exports.listAllFiles = function listAllFiles (type, directory = '__current__') {
  if (directory !== '__current__') {
    const dir = shell.cd(directory)
    if (dir.code === 1) return
  }
  print(`List ${type} files below:`, 'blue')
  shell.ls(`*.${type}`).forEach((file) => {
    print(file, 'green')
  })
}