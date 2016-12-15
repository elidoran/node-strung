{Duplex} = require 'stream'

class Strung extends Duplex
  constructor: (@_source) -> super decodeStrings:false

  _read: (size) ->
    unless @_source?.length then return @push null
    @push @_source[...size]
    @_source = @_source[size..]
    return

  _write: (string, _, next) ->
    string = string.toString()
    if @string? then @string += string
    else @string = string
    next()

  pipe: (stringOrStream) ->
    if 'string' is typeof stringOrStream then @reset stringOrStream
    else super stringOrStream

  reset: (string) ->
    Duplex.call this, decodeStrings:false # rerun constructor to reconfigure it
    @_source = string
    delete @string
    return this

# export a function which creates a Strung instance
module.exports = (string) -> new Strung string

# export the class as a sub property on the function
module.exports.Strung = Strung

# export a helper function on our exported function to start piping a string
module.exports.pipe = (string) ->
  unless 'string' is typeof string
    throw new TypeError 'must provide a string to pipe()'
  new Strung string
