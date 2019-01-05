## 1.2.0 - Released 2019/01/04

1. drop node 4, add node 11
2. update deps
3. renames 'test-all' to 'test'
4. rewrite as a class
5. add 2019 to license

## 1.1.8 - Released 2018/07/15

1. remove Gemnasium badge from README
2. remove node 9, add node 10
3. update dev deps

## 1.1.7 - Released 2018/02/05

1. update dev deps
2. remove Travis testing for node 0.10 0.12, and 7, add 8 and 9.
3. reduce coverage scripts to one and use that in Travis
4. add 2018 to License

## 1.1.6 - Released 2017/05/26

1. add keywords

## 1.1.5 - Released 2017/05/15

1. tweak readme

## 1.1.4 - Released 2017/05/15

1. switched to JS5
2. reduced scripts to minimal
3. add scripts for node version testing
4. update ignore files
5. fix readme's ES6 example and link to LICENSE directly

## 1.1.3 - Released 2017/02/17

1. add missing 'var's
2. add ES6 example
3. update deps

## 1.1.2 - Released 2017/01/06

1. fix link to other README

## 1.1.1 - Released 2017/01/06

1. move CoffeeScript README to docs/ and make the main README use JavaScript
2. add docs/ to .npmingore
3. update coffee-script dep

## 1.1.0 - Released 2016/12/14

1. updated deps
2. added Nodes 0.12 to 7
3. explicitly config TravisCI to non-sudo
4. add code coverage with Istanbul, coffee-coverage, and Coveralls
5. add `after_success` so TravisCI publishes coverage data to Coveralls
6. Add Coveralls coverage badge to README
7. ignore coverage directory for both git and npm publish
8. add 2016 to the License file
9. change 'compile' to 'build' in package scripts
10. add new scripts for various coverage tasks
11. add a specific script for travis to run because it must clean the JS files after doing `npm install` which calls 'prepublish' which creates the JS files and those are read by the coverage tools.
12. remove the '.coffee' when requiring the 'sinker.coffee' file
13. remove all the encoding stuff, instead, let them use `Readable.setEncoding()` and `Writable.setDefaultEncoding()`. Note: this may be a "breaking change" needing a new major version, but, fortunately, no one is using this library except me, and, I never used the `encoding` setting. So, I'm going to just bump the minor version.
14. explicitly set option `decodeStrings` to `false` to ensure it doesn't change strings to Buffer's


## 1.0.5 - Released 2016/10/04

1. updated deps
2. DRY scripts in package.json

## 1.0.4 - Released 2015/09/21

1. updated mocha dev dependency
2. revised README code examples
3. moved `sinker` helper to its own file

## 1.0.3 - Released 2015/09/10

1. fixed fury.io URL

## 1.0.2 - Released 2015/09/10

1. added keywords

## 1.0.1 - Released 2015/09/10

1. added keywords and engine

## 1.0.0 - Released 2015/09/10

1. initial working version with tests
