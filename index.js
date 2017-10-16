'use strict'

const get = require('./utils/get')

const api = 'https://api.giphy.com/v1/gifs/'

function querify (params) {
  return '?'.concat(
    Object.keys(params)
      .map(key => key + '=' + params[key])
      .join('&')
  )
}

function unify (data) {
  if (data.constructor === Array) {
    return data.map(unify)
  }
  const { id, images } = data
  const { url, frames, width, height } = images
    ? images.original
    : { url: data.image_url, frames: data.image_frames, width: data.image_width, height: data.image_height }
  return { id, url, frames, width, height }
}

async function fetch (path, params) {
  const url = api + path + querify(params)
  const { data, meta } = await get(url).then(JSON.parse)
  if (meta.status !== 200) {
    throw new Error(meta.status + ' ' + meta.msg)
  }
  return unify(data)
}

module.exports = (id, params) => fetch(id, params)
module.exports.random = (tag, params) => fetch('random', Object.assign(params, { tag }))
module.exports.search = (q, params) => fetch('search', Object.assign(params, { q }))
module.exports.trending = params => fetch('trending', params)
