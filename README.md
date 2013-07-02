simple-event-source
===================

JavaScript kata for pubsub module - no $ involved.

* started out 5/18/2013 as a response to a [tweet from @andrewray](https://twitter.com/andrewray/status/335924047131066368) 
with quick and dirty event source module [gist](https://gist.github.com/dfkaye/5606827).

builds
------

[![Build Status](https://travis-ci.org/dfkaye/simple-event-source.png)](https://travis-ci.org/dfkaye/simple-event-source)

tests
-----

Using [tape](https://github.com/substack/tape) to run tests from the node.js 
command line, and in order to use [testling](http://ci.testling.com/) from the
github service hook.

[![browser support](https://ci.testling.com/dfkaye/simple-event-source.png)](https://ci.testling.com/dfkaye/simple-event-source)

tape from the command line
--------------------------

    cd ./simple-event-source
    
and either of these:

    npm test
    node ./test/suite.js


todo
----

+ better test suite (maybe)
+ <del>travis (definitely)</del>
+ testling (maybe - **browserify is sub-optimal**)
+ npm