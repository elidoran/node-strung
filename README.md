# strung
[![Build Status](https://travis-ci.com/elidoran/node-strung.svg?branch=master)](https://travis-ci.com/elidoran/node-strung)
[![npm version](https://badge.fury.io/js/strung.svg)](http://badge.fury.io/js/strung)
[![Coverage Status](https://coveralls.io/repos/github/elidoran/node-strung/badge.svg?branch=master)](https://coveralls.io/github/elidoran/node-strung?branch=master)

Readable stream to send a string, Writable stream to gather a string, or both.

Features:

1. uses `StringDecoder` to properly decode `Buffer` chunks into strings.
2. stores string chunks in an array to concatenate (and cache result) upon accessing property `strung.string`. This avoids concatenating each time a chunk is received.
3. reusable via reset/pipe.
4. is a Duplex so it can be both a source and a sink at the same time.


## Install

```sh
npm install --save strung
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

// 1a. get builder function:
const buildStrung = require('strung')

// 1b. create instance with string to pipe out:
const strung = buildStrung('some string')

// 1c. pipe string to another stream:
strung.pipe(anotherStream)


// 2a. get builder function to use to create instances:
const buildStrung = require('strung')

// 2b. create an instance with a string and pipe it to another stream:
buildStrung('some string').pipe(anotherStream)

//  or:
buildStrung.pipe('some string').pipe(anotherStream)


// Piping in: Strung as a sink

// 3a. get strung function to create an instance:
const buildStrung = require('strung')

// 3b. create a source strung:
const sink = Strung()

// 3c. use event to get full string from sink:
sink.on('finish', () => {
  console.log('collected string:', sink.string)
})

// 3d. pipe stream to strung:
anotherStream.pipe(sink)


// Both source and sink

// 4a. get build function:
const buildStrung = require('strung')

// 4b. build an instance:
const strung = buildStrung('some string')

// 4c. use event to get full string from it
strung.on('finish', () => {
  console.log('collected string:', strung.string)
})

// 4d. pipe to another stream and then back to itself:
//  * acts as a Readable to provide the string.
//  * acts as a Writable to receive the final string.
strung.pipe(anotherStream).pipe(strung)


// Or, use separate instances for source and sink.

// Also, the Strung class is also exported as a sub-property:
const { Strung } = require('strung')

// 6b. create an instance as a source (has a string) (can be a sink, too)
const source = new Strung('some string')

// 6c. create an instance as a sink (no string) (also a source w/out content)
const sink = new Strung


// Reset strung instance with new string

// 7a. create a strung instance:
const strung = buildStrung('some string')

// 7b. use event to continue when it's done:
strung.on('finish', () => {
  console.log('collected string:', strung.string)

  // 7d. reuse it to pipe something else via reset
  strung.reset('a new string').pipe(differentStream).pipe(strung)

  // OR:
  // 7e. call pipe with a string which does a reset and returns itself
  strung.pipe('a new string').pipe(differentStream).pipe(strung)
})

// 7c. pipe strung into first stream and then itself:
strung.pipe(anotherStream).pipe(strung)
```


## [MIT License](LICENSE)
