through = require 'through2'

module.exports = ->
  sink = through (chunk, encoding, next) ->
    sink.string ?= ''
    sink.string += chunk.toString 'utf8'
    next()
  return sink
