'use strict'

const tap = require('tap')

const Strung = require('../../index.js').Strung

const through = require('through2')

const sinker = require('../helpers/sinker.js')

const sourceContent = 'the source content'

tap.test('as source without content', t => {
  const source = new Strung
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
  const source = new Strung(sourceContent)
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
  const sink = new Strung
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
  const sink = new Strung
  source.on('error', e => t.end(e))
  sink.on('error', e => t.end(e))
  sink.on('finish', error => {
    t.equal(sink.string, sourceContent)
    t.end(error)
  })
  source.pipe(sink)
  source.end(sourceContent)
})

tap.test('as sink with direct writes', t => {
  const input = 'some test input'
  const sink = new Strung
  sink.on('error', e => t.end(e))
  sink.on('finish', error => {
    t.equal(sink.string, input)
    t.end(error)
  })
  sink.write('some ')
  sink.write('test')
  sink.end(' input')
})

tap.test('as *separate* source and sink, without source content', t => {
  const source = new Strung
  const sink = new Strung
  source.on('error', e => t.end(e))
  sink.on('error', e => t.end(e))
  sink.on('finish', error => {
    t.equal(sink.string, null)
    t.end(error)
  })
  source.pipe(sink)
})

tap.test('as *separate* source and sink, with source content', t => {
  const source = new Strung(sourceContent)
  const sink = new Strung
  source.on('error', e => t.end(e))
  sink.on('error', e => t.end(e))
  sink.on('finish', error => {
    t.equal(sink.string, sourceContent)
    t.end(error)
  })
  source.pipe(sink)
})

tap.test('as *both* source and sink, without source content', t => {
  const sourceAndSink = new Strung
  sourceAndSink.on('error', e => t.end(e))
  sourceAndSink.on('finish', error => {
    t.equal(sourceAndSink.string, null)
    t.end(error)
  })
  sourceAndSink.pipe(sourceAndSink)
})

tap.test('as *both* source and sink, with source content', t => {
  const sourceAndSink = new Strung(sourceContent)
  sourceAndSink.on('error', e => t.end(e))
  sourceAndSink.on('finish', error => {
    t.equal(sourceAndSink.string, sourceContent)
    t.end(error)
  })
  sourceAndSink.pipe(sourceAndSink)
})
