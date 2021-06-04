'use strict'

const { Duplex } = require('stream')
const { StringDecoder } = require('string_decoder')
const stringConcat = String.prototype.concat

class Strung extends Duplex {
  constructor(string, encoding) {
    super({
      decodeStrings: false
    })

    // avoid making private state into enumerable/configurable properties.
    // and make the public state, `string`, into a getter for concat'ing array.
    Object.defineProperties(this, {
      // for Readable
      _source: { value: string, writable: true },
      _start: { value: 0, writable: true },

      // for Writable
      _strings: { value: [] },
      _decoder: { value: new StringDecoder(encoding || 'utf8') },

      // for strung.string to concat the _strings array and cache it in _string.
      _string: { value: null, writable: true, },

      // to determine if the cached _string value is valid.
      _stringsLength: { value: 0, writable: true },

      // for users, the property strung.string is internally concat'd, and cached.
      string: {
        enumerable: true,
        get() {
          const length = (this._strings && this._strings.length) || 0

          // create this._string if we haven't yet and there's some in _strings.
          // or, if the length of _strings when we cached it was different than now.
          if ((!this._string && (length > 0)) || (this._stringsLength !== length)) {
            this._stringsLength = length // remember when caching.
            this._string = stringConcat.apply('', this._strings)
          }

          return this._string
        },
        set(s) {
          this._string = s
        }
      }
    })
  }

  // read from its source string or send null when it's all sent
  _read(size) {
    const source = this._source
        , start = this._start

    if (!source || (start >= source.length)) {
      this.push(null)
    }

    else {
      this._start = start + size // move this forward, then it's the 'end' below.
      this.push(source.slice(start, this._start))
    }
  }

  // accumulates what's written into `string`
  _write(chunk, encoding, next) {
    this._strings.push(
      ('buffer' === encoding)
        ? this._decoder.write(chunk)
        : chunk
    )

    next()
  }

  _writev(chunks, next) {
    let chunk, i

    for (i = 0; i < chunks.length; i++) {
      chunk = chunks[i]
      this._strings.push(
        ('buffer' === chunk.encoding)
          ? this._decoder.write(chunk.chunk)
          : chunk.chunk
      )
    }

    next()
  }

  _final(done) {
    const tail = this._decoder.end()

    if (tail) {
      this.strings.push(tail)
    }

    done()
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

    // for Readable
    this._source = string
    this._start = 0

    // for Writable
    this._strings.length = this._stringsLength = 0
    this._string = null

    return this
  }

}


// export a function which creates a Strung instance
module.exports = (string, encoding) => new Strung(string, encoding)

// export the class as a sub property on the function
module.exports.Strung = Strung

// export a helper function on our exported function to start piping a string
module.exports.pipe = function(string) {
  if ('string' !== typeof string) {
    throw new TypeError('must provide a string to pipe()')
  }

  return new Strung(string)
}
