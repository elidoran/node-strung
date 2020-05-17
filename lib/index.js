'use strict'

const { Duplex } = require('stream')

class Strung extends Duplex {

  constructor(source) {
    super({
      decodeStrings: false
    })

    this._source = source
  }

  // read from its source string or send null when it's all sent
  _read(size) {

    const source = this._source

    if (!source) {
      this.push(null)
    }

    else {
      this.push(source.slice(0, size))
      this._source = source.slice(size, source.length)
    }
  }

  // accumulates what's written into `string`
  _write(s, _, next) {

    const string = s.toString()

    this.string = this.string ? this.string + string : string

    next()
  }

  // pipe a string to set its source,
  // pipe a stream to send its source to the stream.
  pipe(stringOrStream) {
    if ('string' === typeof stringOrStream) {
      return this.reset(stringOrStream)
    }

    else {
      return Duplex.prototype.pipe.call(this, stringOrStream)
    }
  }

  // make ready to use it again.
  reset(string) {
    Duplex.call(this, { decodeStrings: false })
    this._source = string
    this.string = null
    return this
  }

}



// export a function which creates a Strung instance
module.exports = function(string) {
  return new Strung(string)
}

// export the class as a sub property on the function
module.exports.Strung = Strung

// export a helper function on our exported function to start piping a string
module.exports.pipe = function(string) {
  if ('string' !== typeof string) {
    throw new TypeError('must provide a string to pipe()')
  }

  return new Strung(string)
}
