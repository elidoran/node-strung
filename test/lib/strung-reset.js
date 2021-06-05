'use strict'

const tap = require('tap')

const strung = require('../../index.js')

const through = require('through2')

const sinker = require('../helpers/sinker.js')

const sourceContent = 'the source content'

tap.test('as source without content', t => {
  const source = strung().reset()
  const sink = sinker()
  source.on('error', e => t.end(e))
  sink.on('error', e => t.end(e))
  sink.on('finish', error => {
    t.equal(sink.string, undefined)
    t.end(error)
  })
  source.pipe(sink)
})

tap.test('as source with content', t => {
  const source = strung().reset(sourceContent)
  const sink = sinker()
  source.on('error', e => t.end(e))
  sink.on('error', e => t.end(e))
  sink.on('finish', error => {
    t.equal(sink.string, sourceContent)
    t.end(error)
  })
  source.pipe(sink)
})

tap.test('as sink without source content', t => {
  const source = through()
  const sink = strung().reset()
  source.on('error', e => t.end(e))
  sink.on('error', e => t.end(e))
  sink.on('finish', error => {
    t.equal(sink.string, null)
    t.end(error)
  })
  source.pipe(sink)
  source.end()
})

tap.test('as sink with source content', t => {
  const source = through()
  const sink = strung().reset()
  source.on('error', e => t.end(e))
  sink.on('error', e => t.end(e))
  sink.on('finish', error => {
    t.equal(sink.string, sourceContent)
    t.end(error)
  })
  source.pipe(sink)
  source.end(sourceContent)
})

tap.test('as *separate* source and sink, without source content', t => {
  const source = strung().reset()
  const sink = strung().reset()
  source.on('error', e => t.end(e))
  sink.on('error', e => t.end(e))
  sink.on('finish', error => {
    t.equal(sink.string, null)
    t.end(error)
  })
  source.pipe(sink)
})

tap.test('as *separate* source and sink, with source content', t => {
  const source = strung().reset(sourceContent)
  const sink = strung().reset()
  source.on('error', e => t.end(e))
  sink.on('error', e => t.end(e))
  sink.on('finish', error => {
    t.equal(sink.string, sourceContent)
    t.end(error)
  })
  source.pipe(sink)
})

tap.test('as *both* source and sink, without source content', t => {
  const sourceAndSink = strung().reset()
  sourceAndSink.on('error', e => t.end(e))
  sourceAndSink.on('finish', error => {
    t.equal(sourceAndSink.string, null)
    t.end(error)
  })
  sourceAndSink.pipe(sourceAndSink)
})

tap.test('as *both* source and sink, with source content', t => {
  const sourceAndSink = strung().reset(sourceContent)
  sourceAndSink.on('error', e => t.end(e))
  sourceAndSink.on('finish', error => {
    t.equal(sourceAndSink.string, sourceContent)
    t.end(error)
  })
  sourceAndSink.pipe(sourceAndSink)
})
