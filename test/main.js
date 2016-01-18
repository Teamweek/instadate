var test = require('tape');
var teatime = require('../teatime.js');

test('sanity', function (t) {
  t.equal(100, 100);
  t.end();
});

test('noon', function (t) {
  var d = teatime.noon();
  t.equal(d.getHours(), 12);
  t.equal(d.getMinutes(), 0);
  t.equal(d.getSeconds(), 0);
  t.equal(d.getMilliseconds(), 0);
  t.equal(d.getDate(), (new Date()).getDate());
  t.end();
});
