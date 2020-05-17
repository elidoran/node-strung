'use strict'

const assert = require('assert')

describe('test require strung', () => {

  const testString = 'test string'

  describe('without arguments', () => {
    it('should return builder function', () => {
      const strung = require('../../lib')
      assert.equal(typeof strung, 'function', 'strung should be a Function')
    })
  })

  describe('with empty arguments', () => {
    it('should return a Strung class instance', () => {
      var strung;
      strung = require('../../lib')()
      assert.notEqual(typeof strung, 'function', 'strung should be a class instance')
    })
  })

  describe('with string argument', () => {
    it('should create a Strung class instance with string', () => {
      var strung;
      strung = (require('../../lib'))(testString)
      assert.equal(strung._source, testString)
    })
  })

  describe('with destructuring for class', () => {
    it('should extract exported class', () => {
      var Strung;
      Strung = require('../../lib').Strung;
      assert(Strung)
    })
  })

  describe('with exported pipe()', () => {
    it('should create a Strung class instance with string', () => {
      var strung;
      strung = (require('../../lib')).pipe(testString)
      assert.notEqual(typeof strung, 'function', 'strung should be a class instance')
      assert.equal(strung._source, testString)
    })

    it('should throw an error when a non-string is supplied', () => {
      assert.throws((() => {
        return (require('../../lib')).pipe(12345)
      }), /must provide a string to pipe\(\)/)
    })
  })
})
