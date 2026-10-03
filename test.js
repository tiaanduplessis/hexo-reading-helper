'use strict'

const assert = require('assert')
let reading
const previousHexo = global.hexo

global.hexo = {
  extend: {
    helper: {
      register: (name, helper) => {
        assert.strictEqual(name, 'reading')
        assert.strictEqual(reading, undefined)
        reading = helper
      }
    }
  }
}

try {
  require(process.argv[2] || './')
} finally {
  if (previousHexo === undefined) {
    delete global.hexo
  } else {
    global.hexo = previousHexo
  }
}
assert.strictEqual(typeof reading, 'function')

let failed = 0
function test (name, check) {
  try {
    check()
    console.log('ok - ' + name)
  } catch (error) {
    failed++
    console.error('not ok - ' + name)
    console.error(error.stack)
  }
}

function words (count) {
  return Array(count).fill('word').join(' ')
}

test('formats empty, singular and plural word counts', () => {
  assert.strictEqual(reading('').words(), '0 words')
  assert.strictEqual(reading('').time(), '0 min read')
  assert.strictEqual(reading('word').words(), '1 word')
  assert.strictEqual(reading('word').time(), '1 min read')
  assert.strictEqual(reading('two words').words(), '2 words')
  assert.strictEqual(reading(' \n\r\t ').words(), '0 words')
  assert.strictEqual(reading(' \n first\tsecond\rthird ').words(), '3 words')
})

test('defaults to 200 words per minute and accepts a custom rate', () => {
  assert.strictEqual(reading(words(200)).time(), '1 min read')
  assert.strictEqual(reading(words(220)).time(), '2 min read')
  assert.strictEqual(reading(words(400)).time(), '2 min read')
  assert.strictEqual(reading(words(400), { wordsPerMinute: 400 }).time(), '1 min read')
  assert.strictEqual(reading(words(440), { wordsPerMinute: 400 }).time(), '2 min read')
})

test('keeps omitted and null options compatible', () => {
  assert.strictEqual(reading('two words', undefined).words(), '2 words')
  assert.strictEqual(reading('two words', null).words(), '2 words')
  assert.strictEqual(reading(words(200), { wordsPerMinute: 0 }).time(), '1 min read')
})

test('passes numeric statistics to formatting callbacks', () => {
  const result = reading(words(220))
  assert.strictEqual(result.words(count => { assert.strictEqual(count, 220); return 'custom words' }), 'custom words')
  assert.strictEqual(result.time(minutes => { assert.strictEqual(minutes, 2); return 'custom time' }), 'custom time')
  assert.strictEqual(reading('').words(count => count), 0)
  assert.strictEqual(reading('').time(minutes => minutes), 0)
})

test('supports reusing options without changing earlier results', () => {
  const options = { wordsPerMinute: 400 }
  const first = reading(words(400), options)
  assert.strictEqual(reading(words(800), options).time(), '2 min read')
  assert.strictEqual(first.time(), '1 min read')
  assert.strictEqual(reading(words(400)).time(), '2 min read')
})

test('isolates custom word boundaries from later calls', () => {
  const options = { wordBound: character => character === ',' }
  assert.strictEqual(reading('one', options).words(), '1 word')
  assert.strictEqual(reading(',one,two,three,', options).words(), '3 words')
  assert.strictEqual(reading('one\ntwo,three', options).words(), '2 words')
  const custom = reading('one,two,three', options)
  assert.strictEqual(custom.words(), '3 words')
  assert.strictEqual(reading('one two three').words(), '3 words')
  assert.strictEqual(reading('one two three', {}).words(), '3 words')
  assert.strictEqual(reading('one two three', { wordsPerMinute: 400 }).words(), '3 words')
  assert.strictEqual(reading('one,two,three').words(), '1 word')
  assert.strictEqual(custom.words(), '3 words')
})

if (failed) process.exitCode = 1
