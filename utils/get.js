'use strict'

const https = require('https')

function request (url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, resolve)
    req.on('error', reject)
    req.end()
  })
}

function receive (res) {
  return new Promise((resolve, reject) => {
    let data = ''
    res.setEncoding('utf8')
    res.on('data', chunk => {
      data += chunk
    })
    res.on('end', () => {
      resolve(data)
    })
    res.on('error', reject)
  })
}

module.exports = url => request(url).then(receive)
