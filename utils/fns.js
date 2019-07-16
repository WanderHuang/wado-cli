const chalk = require('chalk');
const log = console.log;
function print (info, color = 'white') {
  const engine = chalk[color]
  if (engine && typeof engine === 'function') {
    log(engine(info))
  } else {
    throw new Error('log do not support this color function')
  }
}

/**
 * 利用async函数来制造sleep
 * @param {Number} time 睡眠时间
 */
async function sleep (time) {
  return await new Promise((resolve) => setTimeout(() => resolve('sleep out'), time))
}

/**
 * 改造一个函数fn，使其每次调用都比上一次延迟time
 * 每次调用pushToDelayStack会返回一个cancel函数，主动调用cancel，会终止delay函数
 * cancel函数接受一个参数immediate，如果immediate=true，表示立即结束
 * @param {Function} fn 需要被delay的函数
 * @param {Number} time delay时间
 * @param {Number} cancelCount 如果没有被调用，经过cancelCount * time的时间后，事件被cancel
 */
function delay (fn, time, cancelCount = Infinity) {
  let stack = []
  let emptyRoundCycle = 0
  let cancelRoundCycle = 0
  let cycle = 0
  let shouldClear = false
  let shouldClearImmediately = false
  const timer = setInterval(() => {
    cycle++
    // 立即结束
    if (shouldClearImmediately && cycle >= cancelRoundCycle) {
      clearInterval(timer)
    }
    if (stack && stack.length) {
      const { fn, args } = stack.shift()
      if (fn && typeof fn === 'function') {
        fn(...args)
      }
    } else {
      if (shouldClear) {
        clearInterval(timer)
      } else {
        emptyRoundCycle++
        if (emptyRoundCycle >= cancelCount) {
          clearInterval(timer)
        }
      }
    }
  }, time)
  const cancel = function cancel (immediate) {
    shouldClear = true
    if (immediate === true) {
      cancelRoundCycle = stack.length
      shouldClearImmediately = immediate
    } 
  }
  return function pushToDelayStack(...args) {
    if (timer) {
      stack.push({ fn, args })
    } else {
      throw new Error('current pushToDelayStack is a dead function, please create another')
    }
    return cancel
  }
}

module.exports = {
  delay,
  sleep,
  print
}

// sleep(1000)

// const delayLog500 = delay(console.log, 500)
// delayLog500(1, 500)
// delayLog500(2, 1000)
// delayLog500(3, 1500)
// delayLog500(4, 2000)
