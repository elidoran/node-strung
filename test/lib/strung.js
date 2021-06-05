'use strict'

const tap = require('tap')

const strung = require('../../index.js')

const { PassThrough } = require('stream')

const through = require('through2')

const sinker = require('../helpers/sinker.js')

const sourceContent = 'the source content'

tap.test('as source without content', t => {
  const source = strung()
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
  const source = strung(sourceContent)
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
  const sink = strung()
  source.on('error', e => t.end(e))
  sink.on('error', e => t.end(e))
  sink.on('finish', error => {
    t.equal(sink.string, null)
    sink.string = 'test set'
    t.equal(sink.string, 'test set')
    t.end(error)
  })
  source.pipe(sink)
  source.end()
})

tap.test('as sink with source content', t => {
  const source = through()
  const sink = strung()
  source.on('error', e => t.end(e))
  sink.on('error', e => t.end(e))
  sink.on('finish', error => {
    t.equal(sink.string, sourceContent)
    sink.string = 'test set'
    t.equal(sink.string, 'test set')
    t.end(error)
  })
  source.pipe(sink)
  source.end(sourceContent)
})

tap.test('as sink with direct writes', t => {
  const input = 'some test input'
  const sink = strung()
  sink.on('error', e => t.end(e))
  sink.on('finish', error => {
    t.equal(sink.string, input)
    t.end(error)
  })
  sink.write('some ')
  sink.write('test')
  sink.end(' input')
})

tap.only('as sink with multiple chunks to writev', t => {
  const input = 'some test input'
  const pass = new PassThrough
  const sink = strung()
  sink.on('error', e => t.end(e))
  sink.on('finish', error => {
    t.equal(sink.string, input)
    t.end(error)
  })
  sink.cork() // force it to buffer so it'll use _writev
  sink.write('some ')
  sink.write('test')
  sink.end(' input') // this does uncork()
})

tap.only('as sink with multiple Buffer chunks to writev', t => {
  const input = 'some test input'
  const pass = new PassThrough
  const sink = strung()
  sink.on('error', e => t.end(e))
  sink.on('finish', error => {
    t.equal(sink.string, input)
    t.end(error)
  })
  sink.cork() // force it to buffer so it'll use _writev
  sink.write(Buffer.from('some '), 'utf8')
  sink.write(Buffer.from('test'), 'utf8')
  sink.end(Buffer.from(' input'), 'utf8') // this does uncork()
})

tap.only('as sink with multiple Buffer chunks and a tail', t => {
  // taken from Node's stream package documentation.
  const euro = [[0xE2, 0x82], [0xAC]].map(Buffer.from)

  const input = 'currency: €'
  const pass = new PassThrough
  const sink = strung()
  sink.on('error', e => t.end(e))
  sink.on('finish', error => {
    t.not(sink.string, input)
    t.end(error)
  })
  sink.cork() // force it to buffer so it'll use _writev
  sink.write('currency: ')
  sink.write(euro[0], 'utf8')
  // this is the part we're *not* doing, so there's an incomplete unicode char:
  //   sink.end(euro[1], 'utf8')
  sink.end() // this does uncork()
})

tap.test('as *separate* source and sink, without source content', t => {
  const source = strung()
  const sink = strung()
  source.on('error', e => t.end(e))
  sink.on('error', e => t.end(e))
  sink.on('finish', error => {
    t.equal(sink.string, null)
    t.end(error)
  })
  source.pipe(sink)
})

tap.test('as *separate* source and sink, with source content', t => {
  const source = strung(sourceContent)
  const sink = strung()
  source.on('error', e => t.end(e))
  sink.on('error', e => t.end(e))
  sink.on('finish', error => {
    t.equal(sink.string, sourceContent)
    t.end(error)
  })
  source.pipe(sink)
})

tap.test('as *both* source and sink, without source content', t => {
  const sourceAndSink = strung()
  sourceAndSink.on('error', e => t.end(e))
  sourceAndSink.on('finish', error => {
    t.equal(sourceAndSink.string, null)
    t.end(error)
  })
  sourceAndSink.pipe(sourceAndSink)
})

tap.test('as *both* source and sink, with source content', t => {
  const sourceAndSink = strung(sourceContent)
  sourceAndSink.on('error', e => t.end(e))
  sourceAndSink.on('finish', error => {
    t.equal(sourceAndSink.string, sourceContent)
    t.end(error)
  })
  sourceAndSink.pipe(sourceAndSink)
})
