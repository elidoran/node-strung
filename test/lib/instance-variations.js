'use strict'

const tap = require('tap')

const testString = 'test string'

tap.test('require strung', t => {
  const strung = require('../../index.js')
  t.equal(typeof strung, 'function', 'w/out args should return builder function')

  let result = strung()
  t.not(typeof result, 'function', 'strung() should be a class instance')

  result = strung(testString)
  t.equal(result._source, testString, 'string source arg should be stored for use')

  const {Strung} = strung
  t.ok(Strung, 'exported builder function should have Strung class property')

  let piping = strung.pipe(testString)
  t.not(typeof piping, 'function', 'piping should be a class instance')
  t.equal(piping._source, testString, 'string source arg should be stored for use')

  t.throws(() => {
    return strung.pipe(12345)
  })

  t.end()
})
