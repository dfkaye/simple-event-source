/*
 * big giant event source test suite and fanzone
 */
var test = require('tape');
var Source = require('..');

test('sanity check', function(t) {
    t.ok(typeof Source == 'function');
    t.end();
});

test('tap test - add, fire, and remove', function(t) {
    var s = new Source
     
    var listener = {};
     
    listener.onTest = function (data) {
        t.fail('should not see this - not registering it to event source');
    };
     
    listener.onTap = function (data) {
        t.equal(data.type, 'tap', 'data type should be tap');
        t.equal(data.value, 'is this thing on?', 'should be on');
    };
     
    var tap = { context: listener, callback: listener.onTap }
    var test = { context: listener, callback: listener.onTest }
     
    s.add('tap', tap);
    s.add('tap', tap);
    
    t.equal(s.listeners['tap'].length, 1, 'should have only one tap listener');
    
    s.fire({
        type: 'tap',
        value: 'is this thing on?'
    });
    
    s.fire({
        type: 'test',
        value: 'testing that event listener is not registered'
    });
    
    s.remove('tap', tap);
        
    t.equal(s.listeners['tap'], undefined, 'should have no tap listener');

    s.fire({
        type: 'tap',
        value: 'should not see this after tap is unregistered'
    });
    
    t.end();
});

