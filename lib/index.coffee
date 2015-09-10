{Duplex} = require 'stream'

class Strung extends Duplex
  constructor: (@_source, @_encoding = 'utf8') ->  super()

  _read: (size) ->
    unless @_source?.length then return @push null
    @push @_source[...size]
    @_source = @_source[size..]
    return

  _write: (string, encoding, next) ->
    string = string.toString @_encoding
    if @string? then @string += string
    else @string = string
    next()

  pipe: (stringOrStream, encoding = 'utf8') -> # TODO: throw error when undefined?
    if 'string' is typeof stringOrStream
      return @reset stringOrStream, encoding
    else
      return super stringOrStream

  reset: (string, encoding = 'utf8') ->
    Duplex.call this # rerun constructor to reconfigure it
    @_source = string
    @_encoding = encoding
    delete @string
    return this

# export a function which creates a Strung instance
module.exports = exporter = (string, encoding) -> new Strung string, encoding
# export the class as a sub property on the function
exporter.Strung = Strung
# export a helper function on our exported function to start piping a string
exporter.pipe = (string, encoding = 'utf8') ->
  unless 'string' is typeof string
    throw new Error 'exported strung function only accepts a string to pipe()'
  new Strung string, encoding
