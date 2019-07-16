const axios = require('axios')
const fs = require('fs')

async function fetch (url) {
  console.log('load', url)
  // , {proxy: {host: '127.0.0.1', port: 1080}}
  return await axios.get(url).catch(err => console.log(err))
}

exports.get = async function httpGet (url) {
  return await fetch(url)
}