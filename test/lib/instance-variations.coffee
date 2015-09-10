assert = require 'assert'

describe 'test require strung', ->

  testString = 'test string'

  describe 'without arguments', ->

    it 'should return builder function', ->

      strung = require '../../lib'

      assert.equal typeof(strung), 'function', 'strung should be a Function'

  describe 'with empty arguments', ->

    it 'should return a Strung class instance', ->

      strung = require('../../lib')()

      assert.notEqual typeof(strung), 'function', 'strung should be a class instance'

  describe 'with string argument', ->

    it 'should create a Strung class instance with string', ->

      strung = (require '../../lib') testString

      assert.equal strung._source, testString

  describe 'with destructuring for class', ->

    it 'should extract exported class', ->

      {Strung} = require '../../lib'

      assert Strung
