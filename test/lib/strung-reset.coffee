assert = require 'assert'
strung = require '../../lib'
through = require 'through2'

sinker = ->
  sink = through (chunk, encoding, next) ->
    sink.string ?= ''
    sink.string += chunk.toString 'utf8'
    next()
  return sink

describe 'test *reset* builder strung', ->

  sourceContent = 'the source content'

  describe 'as source', ->

    describe 'with no content string', ->

      it 'should end immediately', (done) ->

        source = strung().reset() # no source content
        sink = sinker()
        source.on 'error', done
        sink.on 'error', done
        sink.on 'finish', (error) ->
          assert.equal sink.string, undefined
          done error
        source.pipe sink

    describe 'with string content', ->

      it 'should pipe string to next stream', (done) ->

        source = strung().reset sourceContent
        sink = sinker()
        source.on 'error', done
        sink.on 'error', done
        sink.on 'finish', (error) ->
          assert.equal sink.string, sourceContent
          done error
        source.pipe sink


  describe 'as sink', ->

    describe 'with no source content', ->

      it 'should finish without content', (done) ->

        source = through() # pass thru
        sink = strung().reset()
        source.on 'error', done
        sink.on 'error', done
        sink.on 'finish', (error) ->
          assert.equal sink.string, undefined
          done error
        source.pipe sink
        # through2 doesn't seem to trigger from pipe call...so, nudge it
        source.end()


    describe 'with source content', ->

      it 'should contain source content', (done) ->

        source = through() # pass thru
        sink = strung().reset()
        source.on 'error', done
        sink.on 'error', done
        sink.on 'finish', (error) ->
          assert.equal sink.string, sourceContent
          done error
        source.pipe sink
        # provide through2 with the source content, and end it at once.
        source.end sourceContent


  describe 'as *separate* source and sink', ->

    describe 'with no source content', ->

      it 'then sink should finish without content', (done) ->

        source = strung().reset() # no source content
        sink = strung().reset()
        source.on 'error', done
        sink.on 'error', done
        sink.on 'finish', (error) ->
          assert.equal sink.string, undefined
          done error
        source.pipe sink


    describe 'with source content', ->

      it 'then sink should contain source content', (done) ->

        source = strung().reset sourceContent
        sink = strung().reset()
        source.on 'error', done
        sink.on 'error', done
        sink.on 'finish', (error) ->
          assert.equal sink.string, sourceContent
          done error
        source.pipe sink


  describe 'as *both* source and sink', ->

    describe 'with no source content', ->

      it 'then it should finish without content', (done) ->

        sourceAndSink = strung().reset() # no source content
        sourceAndSink.on 'error', done
        sourceAndSink.on 'finish', (error) ->
          assert.equal sourceAndSink.string, undefined
          done error
        sourceAndSink.pipe sourceAndSink


    describe 'with source content', ->

      it 'then sink should contain source content', (done) ->

        sourceAndSink = strung().reset sourceContent
        sourceAndSink.on 'error', done
        sourceAndSink.on 'finish', (error) ->
          assert.equal sourceAndSink.string, sourceContent
          done error
        sourceAndSink.pipe sourceAndSink
