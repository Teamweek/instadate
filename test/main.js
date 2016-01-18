var test = require('tape');
var teatime = require('../teatime.js');

test('sanity', function (t) {
  t.equal(true, true);
  t.end();
});

test('noon without input date', function (t) {
  var d = teatime.noon();
  t.equal(d.getHours(), 12);
  t.equal(d.getMinutes(), 0);
  t.equal(d.getSeconds(), 0);
  t.equal(d.getMilliseconds(), 0);
  t.equal(d.getDate(), (new Date()).getDate());
  t.end();
});

test('noon with input date', function (t) {
  var date = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)');
  var d = teatime.noon(date);
  t.equal(d.getHours(), 12);
  t.equal(d.getMinutes(), 0);
  t.equal(d.getSeconds(), 0);
  t.equal(d.getMilliseconds(), 0);
  t.equal(d.getDate(), date.getDate());
  t.end();
});

test('adding days', function (t) {
  var d = teatime.noon(new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)'));
  t.equal(d.getDate(), 18);
  t.equal(teatime.addDays(d, 1).getDate(), 19);
  t.equal(teatime.addDays(d, -1).getDate(), 17);
  t.end();
});

test('adding hours', function (t) {
  var d = teatime.noon();
  t.equal(teatime.addHours(d, 1).getHours(), 13);
  t.equal(teatime.addHours(d, -1).getHours(), 11);
  t.equal(teatime.addHours(d, 24).getHours(), 12);
  t.equal(teatime.addHours(d, -24).getHours(), 12);
  t.end();
});

test('adding minutes', function (t) {
  var d = teatime.noon();
  t.equal(teatime.addMinutes(d, 1).getMinutes(), 1);
  t.equal(teatime.addMinutes(d, -1).getMinutes(), 59);
  t.end();
});

test('adding seconds', function (t) {
  var d = teatime.noon();
  var added = teatime.addSeconds(d, 1);
  t.equal(added.getSeconds(), 1);
  t.equal(added.getMinutes(), 0);

  var subtracted = teatime.addSeconds(d, -1);
  t.equal(subtracted.getSeconds(), 59);
  t.equal(subtracted.getMinutes(), 59);
  t.end();
});

test('adding milliseconds', function (t) {
  var d = teatime.noon();
  var added = teatime.addMilliseconds(d, 1);
  t.equal(added.getMilliseconds(), 1);

  var subtracted = teatime.addMilliseconds(d, -1);
  t.equal(subtracted.getMilliseconds(), 999);
  t.end();
});

test('adding milliseconds', function (t) {
  var d = teatime.noon();
  var added = teatime.addMilliseconds(d, 1);
  t.equal(added.getMilliseconds(), 1);

  var subtracted = teatime.addMilliseconds(d, -1);
  t.equal(subtracted.getMilliseconds(), 999);
  t.end();
});

test('differenceInDays', function (t) {
  var d = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)');
  t.equal(teatime.differenceInDays(d, teatime.addDays(d, 1)), 1);
  t.equal(teatime.differenceInDays(d, teatime.addDays(d, 1000)), 1000);
  t.equal(teatime.differenceInDays(d, teatime.addDays(d, -1)), -1);
  t.end();
});
