assert = require 'assert'
strung = require '../../lib'
through = require 'through2'

sinker = ->
  sink = through (chunk, encoding, next) ->
    sink.string ?= ''
    sink.string += chunk.toString 'utf8'
    next()
  return sink

describe 'test reset builder strung via *pipe*', ->

  sourceContent = 'the source content'

  describe 'as source', ->

    describe 'with no content string', ->

      it 'should end immediately', (done) ->

        source = strung 'content to reset away' # no source content
        sink = sinker()
        source.on 'error', done
        sink.on 'error', done
        sink.on 'finish', (error) ->
          assert.equal sink.string, undefined
          done error
        source.pipe('').pipe sink

    describe 'with string content', ->

      it 'should pipe string to next stream', (done) ->

        source = strung 'content to reset away'
        sink = sinker()
        source.on 'error', done
        sink.on 'error', done
        sink.on 'finish', (error) ->
          assert.equal sink.string, sourceContent
          done error
        source.pipe(sourceContent).pipe sink


  describe 'as *separate* source and sink', ->

    describe 'with no source content', ->

      it 'then sink should finish without content', (done) ->

        source = strung 'content to reset away' # no source content
        sink = strung()
        source.on 'error', done
        sink.on 'error', done
        sink.on 'finish', (error) ->
          assert.equal sink.string, undefined
          done error
        source.pipe('').pipe sink


    describe 'with source content', ->

      it 'then sink should contain source content', (done) ->

        source = strung 'content to reset away'
        sink = strung().reset()
        source.on 'error', done
        sink.on 'error', done
        sink.on 'finish', (error) ->
          assert.equal sink.string, sourceContent
          done error
        source.pipe(sourceContent).pipe sink


  describe 'as *both* source and sink', ->

    describe 'with no source content', ->

      it 'then it should finish without content', (done) ->

        sourceAndSink = strung 'content to reset away' # no source content
        sourceAndSink.on 'error', done
        sourceAndSink.on 'finish', (error) ->
          assert.equal sourceAndSink.string, undefined
          done error
        sourceAndSink.pipe('').pipe sourceAndSink


    describe 'with source content', ->

      it 'then sink should contain source content', (done) ->

        sourceAndSink = strung 'content to reset away'
        sourceAndSink.on 'error', done
        sourceAndSink.on 'finish', (error) ->
          assert.equal sourceAndSink.string, sourceContent
          done error
        sourceAndSink.pipe(sourceContent).pipe sourceAndSink
