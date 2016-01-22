var test = require('tape');
var instadate = require('../instadate.js');

test('sanity', function (t) {
  t.ok(true, 'I am sane');
  t.end();
});

test('noon without input date', function (t) {
  var d = instadate.noon();
  t.equal(d.getHours(), 12);
  t.equal(d.getMinutes(), 0);
  t.equal(d.getSeconds(), 0);
  t.equal(d.getMilliseconds(), 0);
  t.equal(d.getDate(), (new Date()).getDate());
  t.end();
});

test('noon with input date', function (t) {
  var date = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)');
  var d = instadate.noon(date);
  t.equal(d.getHours(), 12);
  t.equal(d.getMinutes(), 0);
  t.equal(d.getSeconds(), 0);
  t.equal(d.getMilliseconds(), 0);
  t.equal(d.getDate(), date.getDate());
  t.end();
});

test('adding days', function (t) {
  var d = instadate.noon(new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)'));
  t.equal(d.getDate(), 18);
  t.equal(instadate.addDays(d, 1).getDate(), 19);
  t.equal(instadate.addDays(d, -1).getDate(), 17);
  t.end();
});

test('adding hours', function (t) {
  var d = instadate.noon();
  t.equal(instadate.addHours(d, 1).getHours(), 13);
  t.equal(instadate.addHours(d, -1).getHours(), 11);
  t.equal(instadate.addHours(d, 24).getHours(), 12);
  t.equal(instadate.addHours(d, -24).getHours(), 12);
  t.end();
});

test('adding minutes', function (t) {
  var d = instadate.noon();
  t.equal(instadate.addMinutes(d, 1).getMinutes(), 1);
  t.equal(instadate.addMinutes(d, -1).getMinutes(), 59);
  t.end();
});

test('adding seconds', function (t) {
  var d = instadate.noon();
  var added = instadate.addSeconds(d, 1);
  t.equal(added.getSeconds(), 1);
  t.equal(added.getMinutes(), 0);

  var subtracted = instadate.addSeconds(d, -1);
  t.equal(subtracted.getSeconds(), 59);
  t.equal(subtracted.getMinutes(), 59);
  t.end();
});

test('adding milliseconds', function (t) {
  var d = instadate.noon();
  var added = instadate.addMilliseconds(d, 1);
  t.equal(added.getMilliseconds(), 1);

  var subtracted = instadate.addMilliseconds(d, -1);
  t.equal(subtracted.getMilliseconds(), 999);
  t.end();
});

test('differenceInDates', function (t) {
  var d = new Date('Mon Jan 18 2016 23:07:17 GMT+0200 (EET)');
  t.equal(instadate.differenceInDates(d, d), 0);
  t.equal(instadate.differenceInDates(d, instadate.addHours(d, 1)), 1);
  t.equal(instadate.differenceInDates(d, instadate.addHours(d, -24)), -1);
  t.end();
});

test('differenceInDays', function (t) {
  var d = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)');
  var d2 = new Date('Thu Jan 21 2016 13:07:17 GMT+0200 (EET)');
  t.equal(instadate.differenceInDays(d, d2), 3);
  t.equal(instadate.differenceInDays(d, instadate.addDays(d, 1)), 1);
  t.equal(instadate.differenceInDays(d, instadate.addDays(d, 1)), 1);
  t.equal(instadate.differenceInDays(d, instadate.addDays(d, 1000)), 1000);
  t.equal(instadate.differenceInDays(d, instadate.addDays(d, -1)), -1);
  t.end();
});

test('differenceInWeekendDays', function (t) {
  var d = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)');
  t.equal(instadate.differenceInWeekendDays(d, instadate.addDays(d, 1)), 0);
  t.equal(instadate.differenceInWeekendDays(d, instadate.addDays(d, 14)), 4);
  t.equal(instadate.differenceInWeekendDays(d, instadate.addDays(d, -1)), 0);
  t.equal(instadate.differenceInWeekendDays(d, instadate.addDays(d, 0)), 0);
  t.end();
});

test('differenceInHours', function (t) {
  var d = new Date();
  var date = instadate.addDays(d, 1);
  t.equal(instadate.differenceInHours(d, date), 24);

  date = instadate.addHours(date, 1);
  t.equal(instadate.differenceInHours(d, date), 25);

  t.equal(instadate.differenceInHours(d, instadate.addMinutes(date, 25)), 25);
  t.equal(instadate.differenceInHours(d, instadate.addMinutes(date, 35)), 25);

  t.end();
});

test('differenceInMinutes', function (t) {
  var d = new Date();
  var date = instadate.addDays(d, 1);
  t.equal(instadate.differenceInMinutes(d, date), 24 * 60);

  date = instadate.addMinutes(date, 30);
  t.equal(instadate.differenceInMinutes(d, date), 24 * 60 + 30);

  t.end();
});

test('differenceInSeconds', function (t) {
  var d = new Date();
  var date = instadate.addDays(d, 1);
  t.equal(instadate.differenceInSeconds(d, date), 24 * 60 * 60);

  date = instadate.addMinutes(date, 30);
  t.equal(instadate.differenceInSeconds(d, date), 24 * 60 * 60 + 30 * 60);

  date = instadate.addSeconds(date, -1);
  t.equal(instadate.differenceInSeconds(d, date), 24 * 60 * 60 + 30 * 60 - 1);

  t.end();
});

test('isSameMonth', function (t) {
  var d = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)');
  t.ok(instadate.isSameMonth(d, instadate.addDays(d, 1)));
  t.ok(instadate.isSameMonth(d, instadate.addDays(d, 13)));
  t.notOk(instadate.isSameMonth(d, instadate.addDays(d, 14)));
  t.end();
});

test('isSameDay', function (t) {
  var d = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)');
  t.ok(instadate.isSameDay(d, instadate.addHours(d, 1)));
  t.ok(instadate.isSameDay(d, instadate.addHours(d, 10)));
  t.ok(instadate.isSameDay(d, instadate.noon(d)));
  t.notOk(instadate.isSameDay(d, instadate.addDays(d, 1)));
  t.end();
});

test('dates array', function (t) {
  var start = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)')
    , end = instadate.noon(new Date('Thu Jan 21 2016 13:07:17 GMT+0200 (EET)'));
  var dates = instadate.dates(start, end);
  t.equal(dates.length, 2);
  t.ok(instadate.equal(dates[0], start));
  t.equal(dates[1].toString(), instadate.addDays(start, 1).toString());
  t.end();
});

test('equal', function (t) {
  t.notEqual(new Date(), new Date());
  t.ok(instadate.equal(new Date(), new Date()));
  t.notOk(instadate.equal(new Date(), instadate.addMilliseconds(new Date(), 1)));
  t.end();
});

test('dateString', function (t) {
  var d = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)')
  t.equal(instadate.dateString(d), 'Mon Jan 18 2016');
  t.end();
});

test('min', function (t) {
  var d1 = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)');
  var d2 = new Date('Mon Jan 18 2016 12:07:17 GMT+0200 (EET)');
  t.equal(instadate.min(d1, d2), d2);
  t.equal(instadate.min(d2, d1), d2);
  t.end();
});

test('max', function (t) {
  var d1 = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)');
  var d2 = new Date('Mon Jan 18 2016 12:07:17 GMT+0200 (EET)');
  t.equal(instadate.max(d1, d2), d1);
  t.equal(instadate.max(d2, d1), d1);
  t.end();
});

test('firstDateInMonth', function (t) {
  var d1 = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)');
  t.equal(instadate.firstDateInMonth(d1).toString(), 'Fri Jan 01 2016 13:07:17 GMT+0200 (EET)');
  t.end();
});

test('lastDateInMonth', function (t) {
  var d1 = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)');
  t.equal(instadate.lastDateInMonth(d1).toString(), 'Sun Jan 31 2016 13:07:17 GMT+0200 (EET)');
  t.end();
});

test('isWeekendDay', function (t) {
  t.ok(instadate.isWeekendDay(0));
  t.notOk(instadate.isWeekendDay(1));
  t.notOk(instadate.isWeekendDay(2));
  t.notOk(instadate.isWeekendDay(3));
  t.notOk(instadate.isWeekendDay(4));
  t.notOk(instadate.isWeekendDay(5));
  t.ok(instadate.isWeekendDay(6));
  t.end();
});

test('isWeekendDate', function (t) {
  var d = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)');
  t.notOk(instadate.isWeekendDate(d));
  t.notOk(instadate.isWeekendDate(instadate.addDays(d, 1))); // Tue
  t.notOk(instadate.isWeekendDate(instadate.addDays(d, 2))); // Wed
  t.notOk(instadate.isWeekendDate(instadate.addDays(d, 3))); // Thu
  t.notOk(instadate.isWeekendDate(instadate.addDays(d, 4))); // Fri
  t.ok(instadate.isWeekendDate(instadate.addDays(d, 5))); // Sat
  t.ok(instadate.isWeekendDate(instadate.addDays(d, 6))); // Sun
  t.end();
});

test('isWorkDay', function (t) {
  t.notOk(instadate.isWorkDay(0));
  t.ok(instadate.isWorkDay(1));
  t.ok(instadate.isWorkDay(2));
  t.ok(instadate.isWorkDay(3));
  t.ok(instadate.isWorkDay(4));
  t.ok(instadate.isWorkDay(5));
  t.notOk(instadate.isWorkDay(6));
  t.end();
});

test('isWorkDate', function (t) {
  var d = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)');
  t.ok(instadate.isWorkDate(d));
  t.ok(instadate.isWorkDate(instadate.addDays(d, 1))); // Tue
  t.ok(instadate.isWorkDate(instadate.addDays(d, 2))); // Wed
  t.ok(instadate.isWorkDate(instadate.addDays(d, 3))); // Thu
  t.ok(instadate.isWorkDate(instadate.addDays(d, 4))); // Fri
  t.notOk(instadate.isWorkDate(instadate.addDays(d, 5))); // Sat
  t.notOk(instadate.isWorkDate(instadate.addDays(d, 6))); // Sun
  t.end();
});

test('setWeekendDays', function (t) {
  instadate.setWeekendDays([1, 3, 5]);
  t.notOk(instadate.isWeekendDay(0));
  t.ok(instadate.isWeekendDay(1));
  t.notOk(instadate.isWeekendDay(2));
  t.ok(instadate.isWeekendDay(3));
  t.notOk(instadate.isWeekendDay(4));
  t.ok(instadate.isWeekendDay(5));
  t.notOk(instadate.isWeekendDay(6));

  instadate.setWeekendDays([6, 0]);
  t.ok(instadate.isWeekendDay(0));
  t.notOk(instadate.isWeekendDay(1));
  t.notOk(instadate.isWeekendDay(2));
  t.notOk(instadate.isWeekendDay(3));
  t.notOk(instadate.isWeekendDay(4));
  t.notOk(instadate.isWeekendDay(5));
  t.ok(instadate.isWeekendDay(6));
  t.end();
});

test('daysInPeriod', function (t) {
  var date = new Date();
  var days = instadate.daysInPeriod(date, 10);
  t.equal(days, 10);

  days = instadate.daysInPeriod(date, -10);
  t.equal(days, 10);

  days = instadate.daysInPeriod(1, 2);
  t.equal(days, 2);

  days = instadate.daysInPeriod(4, -2);
  t.equal(days, 2);

  days = instadate.daysInPeriod(0, 10, [0, 1]);
  t.equal(days, 4);

  days = instadate.daysInPeriod(0, -70, [0, 1]);
  t.equal(days, 20);

  days = instadate.daysInPeriod(0, -10, [0, 1]);
  t.equal(days, 3);

  t.end();
});

test('weekendDaysInPeriod', function (t) {
  t.equal(instadate.weekendDaysInPeriod(0, 7), 2);
  t.equal(instadate.weekendDaysInPeriod(0, 14), 4);
  t.equal(instadate.weekendDaysInPeriod(3, 14), 4);
  t.equal(instadate.weekendDaysInPeriod(1, 5), 0);
  t.equal(instadate.weekendDaysInPeriod(2, -5), 2);
  t.end();
});

test('workDaysInPeriod', function (t) {
  t.equal(instadate.workDaysInPeriod(0, 7), 5);
  t.equal(instadate.workDaysInPeriod(0, 14), 10);
  t.equal(instadate.workDaysInPeriod(3, 14), 10);
  t.equal(instadate.workDaysInPeriod(1, 5), 5);
  t.end();
});

test('isYearAfter', function (t) {
  var d = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)');
  t.notOk(instadate.isYearAfter(d, d));

  t.notOk(instadate.isYearAfter(instadate.addDays(d, 100), d));

  t.ok(instadate.isYearAfter(instadate.addDays(d, 365), d));
  t.notOk(instadate.isYearAfter(instadate.addDays(d, -365), d));

  t.end();
});

test('isYearBefore', function (t) {
  var d = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)');
  t.notOk(instadate.isYearBefore(d, d));
  t.notOk(instadate.isYearBefore(d, instadate.addDays(d, 100)));
  t.ok(instadate.isYearBefore(d, instadate.addDays(d, 365)));
  t.notOk(instadate.isYearBefore(d, instadate.addDays(d, -365)));

  t.end();
});

test('isMonthAfter', function (t) {
  var d = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)');
  t.notOk(instadate.isMonthAfter(d, d));
  t.ok(instadate.isMonthAfter(d, new Date('Mon Jan 19 2015 13:07:17 GMT+0200 (EET)')));
  t.notOk(instadate.isMonthAfter(d, new Date('Wed Jan 18 2017 13:07:17 GMT+0200 (EET)')));
  t.notOk(instadate.isMonthAfter(d, instadate.addDays(d, -1)));
  t.ok(instadate.isMonthAfter(instadate.addDays(d, 25), d));
  t.end();
});

test('isMonthBefore', function (t) {
  var d = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)');
  t.notOk(instadate.isMonthBefore(d, d));
  t.notOk(instadate.isMonthBefore(d, new Date('Mon Jan 19 2015 13:07:17 GMT+0200 (EET)')));
  t.ok(instadate.isMonthBefore(d, new Date('Wed Jan 18 2017 13:07:17 GMT+0200 (EET)')));
  t.notOk(instadate.isMonthBefore(d, instadate.addDays(d, -1)));
  t.notOk(instadate.isMonthBefore(instadate.addDays(d, 25), d));
  t.end();
});

test('isDayAfter', function (t) {
  var d = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)');
  t.notOk(instadate.isDayAfter(d, d));
  t.ok(instadate.isDayAfter(d, new Date('Mon Jan 19 2015 13:07:17 GMT+0200 (EET)')));
  t.notOk(instadate.isDayAfter(new Date('Mon Jan 19 2015 13:07:17 GMT+0200 (EET)'), d));
  t.ok(instadate.isDayAfter(d, instadate.addDays(d, -1)));
  t.notOk(instadate.isDayAfter(d, instadate.addHours(d, -13)));
  t.ok(instadate.isDayAfter(d, instadate.addHours(d, -14)));
  t.notOk(instadate.isDayAfter(d, instadate.addDays(d, 1000)));

  t.end();
});

test('isDayBefore', function (t) {
  var d = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)');
  t.notOk(instadate.isDayBefore(d, d));
  t.notOk(instadate.isDayBefore(d, new Date('Mon Jan 19 2015 13:07:17 GMT+0200 (EET)')));
  t.notOk(instadate.isDayBefore(d, instadate.addDays(d, -1)));
  t.ok(instadate.isDayBefore(d, instadate.addHours(d, 11)));
  t.notOk(instadate.isDayBefore(d, instadate.addHours(d, -14)));
  t.ok(instadate.isDayBefore(d, instadate.addDays(d, 1000)));

  t.end();
});

test('isYearBetween', function (t) {
  var d = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)');
  var d1 = new Date('Wed Jan 18 2017 13:07:17 GMT+0200 (EET)');
  var d2 = new Date('Sun Jan 18 2015 13:07:17 GMT+0200 (EET)');
  t.notOk(instadate.isYearBetween(d, d, d));
  t.notOk(instadate.isYearBetween(d, d1, d));
  t.notOk(instadate.isYearBetween(d, d, d2));

  t.ok(instadate.isYearBetween(d, d1, d2));
  t.ok(instadate.isYearBetween(d, d2, d1));

  t.notOk(instadate.isYearBetween(d, d1, instadate.addDays(d, 60)));

  t.end();
});

test('isMonthBetween', function (t) {
  var d = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)');
  var d1 = new Date('Fri Dec 18 2015 13:07:17 GMT+0200 (EET)');
  var d2 = new Date('Thu Feb 18 2016 13:07:17 GMT+0200 (EET)');
  t.notOk(instadate.isMonthBetween(d, d, d));
  t.notOk(instadate.isMonthBetween(d, d1, d));
  t.notOk(instadate.isMonthBetween(d, d, d2));

  t.ok(instadate.isMonthBetween(d, d1, d2));
  t.ok(instadate.isMonthBetween(d, d2, d1));

  t.notOk(instadate.isMonthBetween(d, d1, instadate.addDays(d, 6)));

  t.end();
});

test('isDayBetween', function (t) {
  var d = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)');
  var d1 = new Date('Sun Jan 17 2016 13:07:17 GMT+0200 (EET)');
  var d2 = new Date('Tue Jan 19 2016 13:07:17 GMT+0200 (EET)');
  t.notOk(instadate.isDayBetween(d, d, d));
  t.notOk(instadate.isDayBetween(d, d1, d));
  t.notOk(instadate.isDayBetween(d, d, d2));

  t.ok(instadate.isDayBetween(d, d1, d2));
  t.ok(instadate.isDayBetween(d, d2, d1));

  t.notOk(instadate.isDayBetween(d, d1, instadate.addHours(d, 6)));

  t.end();
});

test('isoWeekDay', function (t) {
  var d = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)');
  t.equal(instadate.isoWeekDay(d), 1);
  t.equal(instadate.isoWeekDay(instadate.addDays(d, 1)), 2);
  t.equal(instadate.isoWeekDay(instadate.addDays(d, 2)), 3);
  t.equal(instadate.isoWeekDay(instadate.addDays(d, 3)), 4);
  t.equal(instadate.isoWeekDay(instadate.addDays(d, 5)), 6);
  t.equal(instadate.isoWeekDay(instadate.addDays(d, 6)), 7);
  t.equal(instadate.isoWeekDay(instadate.addDays(d, 7)), 1);
  t.end();
});

test('isoDateString', function (t) {
  var d = new Date('Mon Jan 18 2016 13:07:17 GMT+0200 (EET)');
  t.equal(instadate.isoDateString(d), '2016-01-18');
  t.end();
});
