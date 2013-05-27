/**
* 5/18/2013
* responded to a tweet
* quick and dirty event source module (browser only)
* add, remove methods accept config object with context and callback properties
* fire method accepts data object (sets the type property, thought)
* a listener may be added only once
*/

// src (get it?)
module.exports = Source;

function Source() {
    this.listeners = {}
}

Source.prototype.add = add;
function add(type, listener) {
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
}

Source.prototype.remove = remove;
function remove(type, listener) {
  var source = this
  source.listeners[type].forEach(function(item, i, listeners) {
    if (item === listener) {
      source.listeners = listeners.slice(i)
      return
    }
  })
}
    
Source.prototype.fire = fire;
function fire(data) {
  var source = this
  var listeners = source.listeners[data.type]
  if (!listeners) {
    return
  }
  listeners.forEach(function(listener) {
    listener.callback.call(listener.context, data)
  })
}
