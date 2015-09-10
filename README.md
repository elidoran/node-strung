# strung

Acts as a stream to send a string, gather a string, or both.

## Install

```sh
npm install strung --save
```

## Usage

Show:

1. using it as a source (a Readable with string content)
2. using it as a sink (a Writable collecting string content)
3. as both a source and a sink at once
4. getting its class
5. resetting instance with new string as source
6. resetting instance with pipe(string)

```coffeescript
# # Piping out: Strung as a source

# 1a. create instance with string to pipe out
strung = require('strung') 'some string'
# 1b. pipe string to another stream
strung.pipe anotherStream

# 2a. get strung function to use to create instances
Strung = require('strung')
# 2b. create an instance with a string and pipe it to another stream
Strung('some string').pipe anotherStream
#  or:
Strung.pipe('some string').pipe(anotherStream)

# # Piping in: Strung as a sink

# 3a. get strung function to create an instance
Strung = require 'strung'
# 3b. create a source strung
sink = Strung()
# 3c. pipe stream to strung
anotherStream.pipe sink
# combine 3b and 3c:
sink = require('strung')()
# 3d. get full string from sink
sink.on 'finish', ->
  console.log 'collected string:',sink.string

# # Both source and sink

# 4a. get instance from function (like 1a)
strung = require('strung') 'some string'
# 4b. pipe to another stream and the back to itself
strung.pipe(anotherStream).pipe(strung)
# 4c. get full string from it
strung.on 'finish', ->
  console.log 'collected string:',strung.string

# # Separate instances for source and sink

# 5a. get function to create instances
strung = require 'strung'
# 5b. create a source
source = strung 'some string'
# 5c. create a sink
sink = strung()
# 5d. pipe source thru another stream to sink
source.pipe(anotherStream).pipe(sink)
# 5e. get full string from sink
sink.on 'finish', ->
  console.log 'collected string:',sink.string

# # the Strung class is also exported as a subproperty

# 6a. get class
{Strung} = require 'strung'
#  or:
Strung = require('strung').Strung
# 6b. create an instance as a source (has a string) (can be a sink, too)
source = new Strung 'some string'
# 6c. create an instance as a sink (no string)
sink = new Strung

# # reset strung instance with new string
# 7a. create a strung instance
strung = require('strung') 'some string'
# 7b. use strung
strung.pipe(anotherStream).pipe(strung)
# 7c. when finished using strung:
strung.on 'finish', ->
  console.log 'collected string:',strung.string
  # 7d. reuse it to pipe something else via reset
  strung.reset('a new string').pipe(differentStream).pipe(strung)
  # OR:
  # 7e. call pipe with a string which does a reset and returns itself
  strung.pipe('a new string').pipe(differentStream).pipe(strung)
```

## MIT License
