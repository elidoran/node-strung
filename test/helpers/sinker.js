'use strict'

const through = require('through2')

module.exports = function() {
  const sink = through((chunk, encoding, next) => {
    if (!sink.string) {
      sink.string = ''
    }
    sink.string += chunk.toString('utf8')
    next()
  })
  return sink
};
