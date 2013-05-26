/**
* 5/18/2013
* responded to a tweet
* quick and dirty event source module (browser only)
* add, remove methods accept config object with context and callback properties
* fire method accepts data object (sets the type property, thought)
* a listener may be added only once
* 
* the creation or construction step is a *little* different (use new Source.constructor()).
*/

// src (get it?)
 
var Source = (function (exports) {
  var Source = {
    constructor: function () {
      this.listeners = {}
    },
    add: function (type, listener) {
      var source = this
      var adding = true
      if (!source.listeners[type]) {
        source.listeners[type] = []
      }
      
      // filter duplicate context + callback listeners    
      source.listeners[type].forEach(function(item, i, listeners) {
        if (item.context === listener.context && item.callback === listener.callback) {
          adding = false
          return
        }
      })
      
      if (adding) {
          source.listeners[type].push(listener)
      }
    },
    remove: function (type, listener) {
      var source = this
      source.listeners[type].forEach(function(item, i, listeners) {
        if (item === listener) {
          source.listeners = listeners.slice(i)
          return
        }
      })
    },
    fire: function (data) {
      var source = this
      var listeners = source.listeners[data.type]
      if (!listeners) {
        return
      }
      listeners.forEach(function(listener) {
        listener.callback.call(listener.context, data)
      })
    }
  }
  Source.constructor.prototype = Source
  return Source
}());
 
// test

// a little variety at creation step - for spice
var s = new Source.constructor

var listener = {};

listener.onTest = function (data) {
  console.log('wait - should not see this - not registering it to event source');
};

listener.onTap = function (data) {
  console.log(data.type + ': ' + data.value);
};

var tap = { context: listener, callback: listener.onTap }
var test = { context: listener, callback: listener.onTest }


s.add('tap', tap);
s.add('tap', tap);
s.fire({
  type: 'tap',
  value: 'is this thing on?'
});
 
s.fire({
  type: 'test',
  value: 'testing that event listener is not registered'
});
 
s.remove('tap', tap);
 
s.fire({
  type: 'tap',
  value: 'should not see this after tap is unregistered'
});
