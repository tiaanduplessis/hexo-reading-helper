/* global hexo */
'use strict'

const readingTime = require('reading-time')

hexo.extend.helper.register('reading', (content, options) => {
  const stats = readingTime(content, options)

  return {
    words: (cb) => cb ? cb(stats.words) : `${stats.words} ${stats.words === 1 ? 'word' : 'words'}`,
    time: (cb) => cb ? cb(Math.ceil(stats.minutes.toFixed(2))) : stats.text
  }
})
