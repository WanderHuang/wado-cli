#!/usr/bin/env node
// 上一行表明当前是一个脚本，当项目被npm link后，就可以在命令行使用了

// commander.js 帮助您快速构建命令行软件
const program = require('commander');
// 延迟输出，可以用来模拟进度、逐行输出等
const { delayProgressQuote, delayPrint } = require('./handler/delay');
// 字符串加密
const { encodeByMd5 } = require('./handler/encode');
// 列出文件
const { listAllFiles } = require('./handler/file');

// program常用方法
// version 设置当前cli版本
// option('参数', '描述', '默认值') 设置命令携带的参数
// []表示可选 <>表示必填
// wado --delay 300
program
  .version('0.0.1')
  .option('--delay [delay]', 'execute after delayed', 300)

// command用于设置一个命令
// wado delay 输出文字 --delay 1000 一秒后输出文字
// action(option, cmd) option表示输入参数，cmd表示当前命令对象
program
  .command('delay <option>')
  .description('print <option> after delay time. use --delay to set delay time.')
  .action((actionType) => {
    if (actionType === 'version') {
      delayProgressQuote(program.delay, program.version())
    } else {
      delayPrint(program.delay, `${actionType} is been delayed`)
    }
  })

// 加密文字
// wado encode 需要加密的文字 -s m
// -s 加盐
program
  .command('encode <key>')
  .option('-s, --salt', 'use salt to enhance the code')
  .description('search <key> from google api')
  .action((key) => {
    encodeByMd5(key)
  })

// 列出所有文件
program
  .command('ls <type>')
  .option('-d, --directory <dir>', 'find in special directory')
  .description('list files of this directory')
  .action((type, cmd) => {
    listAllFiles(type, cmd.directory)
  })

program.parse(process.argv);
