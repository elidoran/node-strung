# strung
[![Build Status](https://travis-ci.org/elidoran/node-strung.svg?branch=master)](https://travis-ci.org/elidoran/node-strung)
[![Dependency Status](https://gemnasium.com/elidoran/node-strung.png)](https://gemnasium.com/elidoran/node-strung)
[![npm version](https://badge.fury.io/js/strung.svg)](http://badge.fury.io/js/strung)
[![Coverage Status](https://coveralls.io/repos/github/elidoran/node-strung/badge.svg?branch=master)](https://coveralls.io/github/elidoran/node-strung?branch=master)

Acts as a stream to send a string, gather a string, or both.

[README - CoffeeScript Edition](https://github.com/elidoran/node-strung/blob/master/docs/README-CS.md)


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
5. resetting an instance with a new string (to use as a source)
6. resetting an instance with `pipe(string)` (to use as a source)

```javascript
// Piping out: Strung as a source

// 1a. create instance with string to pipe out
var strung = require('strung')('some string')

// 1b. pipe string to another stream
strung.pipe(anotherStream)


// 2a. get strung function to use to create instances
var Strung = require('strung')

// 2b. create an instance with a string and pipe it to another stream
Strung('some string').pipe(anotherStream)

//  or:
Strung.pipe('some string').pipe(anotherStream)


// Piping in: Strung as a sink

// 3a. get strung function to create an instance
var Strung = require('strung')

// 3b. create a source strung
var sink = Strung()

// combine 3a and 3b:
var sink = require('strung')()

// 3c. use event to get full string from sink
sink.on('finish', function() {
  console.log('collected string:',sink.string)
})

// 3d. pipe stream to strung
anotherStream.pipe(sink)


// Both source and sink

// 4a. get instance from function (like 1a)
var strung = require('strung')('some string')

// 4b. use event to get full string from it
strung.on('finish', function() {
  console.log('collected string:',strung.string)
})

// 4c. pipe to another stream and then back to itself
strung.pipe(anotherStream).pipe(strung)


// Separate instances for source and sink

// 5a. get function to create instances
var strung = require('strung')

// 5b. create a source
var source = strung('some string')

// 5c. create a sink
var sink = strung()

// 5d. use event to get full string from sink
sink.on( 'finish', function() {
  console.log('collected string:',sink.string)
})

// 5e. pipe source thru another stream to sink
source.pipe(anotherStream).pipe(sink)


// the Strung class is also exported as a subproperty

// 6a. get class
var Strung = require('strung').Strung

// 6b. create an instance as a source (has a string) (can be a sink, too)
var source = new Strung('some string')

// 6c. create an instance as a sink (no string)
var sink = new Strung


// Reset strung instance with new string

// 7a. create a strung instance
var strung = require('strung')('some string')

// 7b. use event to continue when it's done:
strung.on('finish', function() {
  console.log('collected string:',strung.string)

  // 7d. reuse it to pipe something else via reset
  strung.reset('a new string').pipe(differentStream).pipe(strung)

  // OR:
  // 7e. call pipe with a string which does a reset and returns itself
  strung.pipe('a new string').pipe(differentStream).pipe(strung)
})

// 7c. use strung
strung.pipe(anotherStream).pipe(strung)


// ES6 version:
import Strung from 'strung'

const source = new Strung('some string')
const sink   = new Strung()

source.pipe(anotherStream).pipe(sink)

sink.on('finish', () =>
  console.log(`collected string: ${sink.string}`)
)
```


## [MIT License](LICENSE)
