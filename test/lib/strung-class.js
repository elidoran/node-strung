'use strict'

const assert = require('assert')

const Strung = require('../../lib').Strung

const through = require('through2')

const sinker = require('../helpers/sinker')

describe('test strung *as a class*', () => {

  const sourceContent = 'the source content'

  describe('as source', () => {
    describe('with no content string', () => {
      it('should end immediately', (done) => {
        const source = new Strung
        const sink = sinker()
        source.on('error', done)
        sink.on('error', done)
        sink.on('finish', (error) => {
          assert.equal(sink.string, null)
          done(error)
        })
        source.pipe(sink)
      })
    })

    describe('with string content', () => {
      it('should pipe string to next stream', (done) => {
        const source = new Strung(sourceContent)
        const sink = sinker()
        source.on('error', done)
        sink.on('error', done)
        sink.on('finish', (error) => {
          assert.equal(sink.string, sourceContent)
          done(error)
        })
        source.pipe(sink)
      })
    })
  })

  describe('as sink', () => {
    describe('with no source content', () => {
      it('should finish without content', (done) => {
        const source = through()
        const sink = new Strung
        source.on('error', done)
        sink.on('error', done)
        sink.on('finish', (error) => {
          assert.equal(sink.string, null)
          done(error)
        })
        source.pipe(sink)
        source.end()
      })
    })

    describe('with source content', () => {
      it('should contain source content', (done) => {
        const source = through()
        const sink = new Strung
        source.on('error', done)
        sink.on('error', done)
        sink.on('finish', (error) => {
          assert.equal(sink.string, sourceContent)
          done(error)
        })
        source.pipe(sink)
        source.end(sourceContent)
      })
    })
  })

  describe('as *separate* source and sink', () => {
    describe('with no source content', () => {
      it('then sink should finish without content', (done) => {
        const source = new Strung
        const sink = new Strung
        source.on('error', done)
        sink.on('error', done)
        sink.on('finish', (error) => {
          assert.equal(sink.string, null)
          done(error)
        })
        source.pipe(sink)
      })
    })

    describe('with source content', () => {
      it('then sink should contain source content', (done) => {
        const source = new Strung(sourceContent)
        const sink = new Strung
        source.on('error', done)
        sink.on('error', done)
        sink.on('finish', (error) => {
          assert.equal(sink.string, sourceContent)
          done(error)
        })
        source.pipe(sink)
      })
    })
  })

  describe('as *both* source and sink', () => {
    describe('with no source content', () => {
      it('then it should finish without content', (done) => {
        const sourceAndSink = new Strung
        sourceAndSink.on('error', done)
        sourceAndSink.on('finish', (error) => {
          assert.equal(sourceAndSink.string, null)
          done(error)
        })
        sourceAndSink.pipe(sourceAndSink)
      })
    })

    describe('with source content', () => {
      it('then sink should contain source content', (done) => {
        const sourceAndSink = new Strung(sourceContent)
        sourceAndSink.on('error', done)
        sourceAndSink.on('finish', (error) => {
          assert.equal(sourceAndSink.string, sourceContent)
          done(error)
        })
        sourceAndSink.pipe(sourceAndSink)
      })
    })
  })
})
