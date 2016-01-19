var test = require('tape');
var teatime = require('../teatime.js');

test('sanity', function (t) {
  t.ok(true, 'I am sane');
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

test('differenceInHours', function (t) {
  var d = new Date();
  var date = teatime.addDays(d, 1);
  t.equal(teatime.differenceInHours(d, date), 24);

  date = teatime.addHours(date, 1);
  t.equal(teatime.differenceInHours(d, date), 25);

  date = teatime.addMinutes(date, 30);
  t.equal(teatime.differenceInHours(d, date), 25);

  t.end();
});

test('differenceInMinutes', function (t) {
  var d = new Date();
  var date = teatime.addDays(d, 1);
  t.equal(teatime.differenceInMinutes(d, date), 24 * 60);

  date = teatime.addMinutes(date, 30);
  t.equal(teatime.differenceInMinutes(d, date), 24 * 60 + 30);

  t.end();
});

test('differenceInSeconds', function (t) {
  var d = new Date();
  var date = teatime.addDays(d, 1);
  t.equal(teatime.differenceInSeconds(d, date), 24 * 60 * 60);

  date = teatime.addMinutes(date, 30);
  t.equal(teatime.differenceInSeconds(d, date), 24 * 60 * 60 + 30 * 60);

  date = teatime.addSeconds(date, -1);
  t.equal(teatime.differenceInSeconds(d, date), 24 * 60 * 60 + 30 * 60 - 1);

  t.end();
});

test('isSameMonth', function (t) {
  var d = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)');
  t.ok(teatime.isSameMonth(d, teatime.addDays(d, 1)));
  t.ok(teatime.isSameMonth(d, teatime.addDays(d, 13)));
  t.notOk(teatime.isSameMonth(d, teatime.addDays(d, 14)));
  t.end();
});

test('isSameDay', function (t) {
  var d = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)');
  t.ok(teatime.isSameDay(d, teatime.addHours(d, 1)));
  t.ok(teatime.isSameDay(d, teatime.addHours(d, 10)));
  t.ok(teatime.isSameDay(d, teatime.noon(d)));
  t.notOk(teatime.isSameDay(d, teatime.addDays(d, 1)));
  t.end();
});

test('dates array', function (t) {
  var start = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)')
    , end = teatime.noon(new Date('Mon Jan 21 2016 13:07:17 GMT+0200 (EET)'));
  var dates = teatime.dates(start, end);
  t.equal(dates.length, 3);
  t.ok(teatime.equal(dates[0], start));
  t.equal(dates[1].toString(), teatime.addDays(start, 1).toString());
  t.equal(dates[2].toString(), teatime.addDays(start, 2).toString());
  t.end();
});

test('equal', function (t) {
  t.notEqual(new Date(), new Date());
  t.ok(teatime.equal(new Date(), new Date()));
  t.notOk(teatime.equal(new Date(), teatime.addMilliseconds(new Date(), 1)));
  t.end();
});

test('dateString', function (t) {
  var d = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)')
  t.equal(teatime.dateString(d), 'Mon Jan 18 2016');
  t.end();
});

test('min & max', function (t) {
  var d1 = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)');
  var d2 = new Date('Mon Jan 18 2016 12:07:17 GMT+0200 (EET)');
  t.equal(teatime.min(d1, d2), d2);
  t.equal(teatime.min(d2, d1), d2);
  t.equal(teatime.max(d1, d2), d1);
  t.equal(teatime.max(d2, d1), d1);
  t.end();
});

test('firstDateInMonth', function (t) {
  var d1 = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)');
  t.equal(teatime.firstDateInMonth(d1).toString(), 'Fri Jan 01 2016 13:07:17 GMT+0200 (EET)');
  t.end();
});

test('lastDateInMonth', function (t) {
  var d1 = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)');
  t.equal(teatime.lastDateInMonth(d1).toString(), 'Sun Jan 31 2016 13:07:17 GMT+0200 (EET)');
  t.end();
});

test('isWeekendDay', function (t) {
  t.ok(teatime.isWeekendDay(0));
  t.notOk(teatime.isWeekendDay(1));
  t.notOk(teatime.isWeekendDay(2));
  t.notOk(teatime.isWeekendDay(3));
  t.notOk(teatime.isWeekendDay(4));
  t.notOk(teatime.isWeekendDay(5));
  t.ok(teatime.isWeekendDay(6));
  t.end();
});

test('isWeekendDate', function (t) {
  var d = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)');
  t.notOk(teatime.isWeekendDate(d));
  t.notOk(teatime.isWeekendDate(teatime.addDays(d, 1))); // Tue
  t.notOk(teatime.isWeekendDate(teatime.addDays(d, 2))); // Wed
  t.notOk(teatime.isWeekendDate(teatime.addDays(d, 3))); // Thu
  t.notOk(teatime.isWeekendDate(teatime.addDays(d, 4))); // Fri
  t.ok(teatime.isWeekendDate(teatime.addDays(d, 5))); // Sat
  t.ok(teatime.isWeekendDate(teatime.addDays(d, 6))); // Sun
  t.end();
});

test('isWorkDay', function (t) {
  t.notOk(teatime.isWorkDay(0));
  t.ok(teatime.isWorkDay(1));
  t.ok(teatime.isWorkDay(2));
  t.ok(teatime.isWorkDay(3));
  t.ok(teatime.isWorkDay(4));
  t.ok(teatime.isWorkDay(5));
  t.notOk(teatime.isWorkDay(6));
  t.end();
});

test('isWorkDate', function (t) {
  var d = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)');
  t.ok(teatime.isWorkDate(d));
  t.ok(teatime.isWorkDate(teatime.addDays(d, 1))); // Tue
  t.ok(teatime.isWorkDate(teatime.addDays(d, 2))); // Wed
  t.ok(teatime.isWorkDate(teatime.addDays(d, 3))); // Thu
  t.ok(teatime.isWorkDate(teatime.addDays(d, 4))); // Fri
  t.notOk(teatime.isWorkDate(teatime.addDays(d, 5))); // Sat
  t.notOk(teatime.isWorkDate(teatime.addDays(d, 6))); // Sun
  t.end();
});

test('setWeekendDays', function (t) {
  teatime.setWeekendDays([1, 3, 5]);
  t.notOk(teatime.isWeekendDay(0));
  t.ok(teatime.isWeekendDay(1));
  t.notOk(teatime.isWeekendDay(2));
  t.ok(teatime.isWeekendDay(3));
  t.notOk(teatime.isWeekendDay(4));
  t.ok(teatime.isWeekendDay(5));
  t.notOk(teatime.isWeekendDay(6));

  teatime.setWeekendDays([6, 0]);
  t.ok(teatime.isWeekendDay(0));
  t.notOk(teatime.isWeekendDay(1));
  t.notOk(teatime.isWeekendDay(2));
  t.notOk(teatime.isWeekendDay(3));
  t.notOk(teatime.isWeekendDay(4));
  t.notOk(teatime.isWeekendDay(5));
  t.ok(teatime.isWeekendDay(6));
  t.end();
});

test('daysInPeriod', function (t) {
  var date = new Date();
  var days = teatime.daysInPeriod(date, 10, [0, 1, 2, 3, 4, 5, 6]);
  t.equal(days, 10);

  var days = teatime.daysInPeriod(0, 10, [0, 1]);
  t.equal(days, 4);
  t.end();
});

test('weekendDaysInPeriod', function (t) {
  t.equal(teatime.weekendDaysInPeriod(0, 7), 2);
  t.equal(teatime.weekendDaysInPeriod(0, 14), 4);
  t.equal(teatime.weekendDaysInPeriod(3, 14), 4);
  t.equal(teatime.weekendDaysInPeriod(1, 5), 0);
  t.end();
});

test('workDaysInPeriod', function (t) {
  t.equal(teatime.workDaysInPeriod(0, 7), 5);
  t.equal(teatime.workDaysInPeriod(0, 14), 10);
  t.equal(teatime.workDaysInPeriod(3, 14), 10);
  t.equal(teatime.workDaysInPeriod(1, 5), 5);
  t.end();
});
