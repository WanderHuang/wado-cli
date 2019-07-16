const chalk = require('chalk');
const { delay } = require('../utils/fns');
const { getProgressString } = require('../utils/resolvers');
const slog = require('single-line-log')(process.stdout);

const log = console.log;

exports.delayProgressQuote = function delayProgressQuote (delayTime, quote) {
  const defaultDelay = 300
  if (!/^[0-9]{1,}$/.test(delayTime)) {
    log(chalk.red(`option parameter ${delayTime} is illeagal, please use [Number]`))
    return
  }
  const delayLog500 = delay(slog,  parseInt(delayTime))
  const colors = ['red', 'magenta', 'yellow', 'green']
  let progress = 0
  let slash = true
  while (progress < 100) {
    progress += Math.random() * (parseInt(delayTime) / defaultDelay * 7) | 0 + 1
    if (progress > 100) {
      progress = 100
    }
    const chars = getProgressString(progress)
    let color = colors[0]
    if (progress <= 20) {
      color = colors[0]
    } else if (progress <= 40) {
      color = colors[1]
    } else if (progress <= 80) {
      color = colors[2]
    } else if (progress <= 100) {
      color = colors[3]
    } else {
      delayLog500(chalk.red(`error in loading`))
    }
    delayLog500(chalk[color](progress < 10 ? '0' + progress : progress, '%'), chalk.white(slash ? '/' : '\\'), chalk.white(chars))
    slash = !slash
  }
  delayLog500(chalk.blue(quote))(true)
}

exports.delayPrint = function delayPrint (time, info) {
  delay(log, time)(info)(true)
}
