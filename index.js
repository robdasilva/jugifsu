'use strict'

const api = 'https://api.giphy.com/v1/gifs/'

function querify (params) {
  return '?'.concat(
    Object.keys(params)
      .map(key => key + '=' + params[key])
      .join('&')
  )
}

function fetch (path, params) {
  const url = api + path + querify(params)
  return Promise.resolve(`Fetching from ${url}`)
}

module.exports = (id, params) => fetch(id, params)
module.exports.random = (tag, params) => fetch('random', Object.assign(params, { tag }))
module.exports.search = (q, params) => fetch('search', Object.assign(params, { q }))
module.exports.trending = params => fetch('trending', params)
