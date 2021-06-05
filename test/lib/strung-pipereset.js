'use strict'

const tap = require('tap')

const strung = require('../../index.js')

const through = require('through2')

const sinker = require('../helpers/sinker.js')

const sourceContent = 'the source content'

tap.test('as source without content', t => {
  const source = strung('content to reset away')
  const sink = sinker()
  source.on('error', e => t.end(e))
  sink.on('error', e => t.end(e))
  sink.on('finish', error => {
    t.equal(sink.string, undefined)
    t.end(error)
  })
  source.pipe('').pipe(sink)
})

tap.test('as source with content', t => {
  const source = strung('content to reset away')
  const sink = sinker()
  source.on('error', e => t.end(e))
  sink.on('error', e => t.end(e))
  sink.on('finish', error => {
    t.equal(sink.string, sourceContent)
    t.end(error)
  })
  source.pipe(sourceContent).pipe(sink)
})

tap.test('as *separate* source and sink, without source content', t => {
  const source = strung('content to reset away')
  const sink = strung()
  source.on('error', e => t.end(e))
  sink.on('error', e => t.end(e))
  sink.on('finish', error => {
    t.equal(sink.string, null)
    t.end(error)
  })
  source.pipe('').pipe(sink)
})

tap.test('as *separate* source and sink, with source content', t => {
  const source = strung('content to reset away')
  const sink = strung()
  source.on('error', e => t.end(e))
  sink.on('error', e => t.end(e))
  sink.on('finish', error => {
    t.equal(sink.string, sourceContent)
    t.end(error)
  })
  source.pipe(sourceContent).pipe(sink)
})

tap.test('as *both* source and sink, without source content', t => {
  const sourceAndSink = strung('content to reset away')
  sourceAndSink.on('error', e => t.end(e))
  sourceAndSink.on('finish', error => {
    t.equal(sourceAndSink.string, null)
    t.end(error)
  })
  sourceAndSink.pipe('').pipe(sourceAndSink)
})

tap.test('as *both* source and sink, with source content', t => {
  const sourceAndSink = strung('content to reset away')
  sourceAndSink.on('error', e => t.end(e))
  sourceAndSink.on('finish', error => {
    t.equal(sourceAndSink.string, sourceContent)
    t.end(error)
  })
  sourceAndSink.pipe(sourceContent).pipe(sourceAndSink)
})
