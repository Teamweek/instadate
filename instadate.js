var difference = require('lodash.difference');
var trunc = require('math-trunc');

var isNode = typeof window === 'undefined';
var constants = {
  MS_IN_DAY: 1000 * 60 * 60 * 24,
  MS_IN_HOUR: 1000 * 60 * 60,
  MS_IN_MINUTE: 1000 * 60,
  MS_IN_SECOND: 1000,
  WEEKEND_DAYS: [6, 0],
  WORK_DAYS: [1, 2, 3, 4, 5],
  ALL_DAYS: [0, 1, 2, 3, 4, 5, 6],
}

var instadate = {

  utc: utc,

  noon: function (d) {
    var date;
    if (d) {
      date = new Date(d);
    } else {
      date = new Date();
    }
    date.setHours(12, 0, 0, 0);
    return date;
  },

  /* Difference between dates */

  differenceInDates: function (d1, d2) {
    return trunc((utcDate(d2) - utcDate(d1)) / constants.MS_IN_DAY);
  },

  differenceInDays: function (d1, d2) {
    return trunc((utc(d2) - utc(d1)) / constants.MS_IN_DAY);
  },

  differenceInHours: function (d1, d2) {
    return trunc((utc(d2) - utc(d1)) / constants.MS_IN_HOUR);
  },

  differenceInMinutes: function (d1, d2) {
    return trunc((utc(d2) - utc(d1)) / constants.MS_IN_MINUTE);
  },

  differenceInSeconds: function (d1, d2) {
    return trunc((utc(d2) - utc(d1)) / constants.MS_IN_SECOND);
  },

  differenceInWeekendDays: function (d1, d2) {
    var period = instadate.differenceInDays(d1, d2);
    return instadate.weekendDaysInPeriod(d1.getDay(), period)
  },

  differenceInWorkDays: function (d1, d2) {
    var period = instadate.differenceInDays(d1, d2);
    return instadate.workDaysInPeriod(d1.getDay(), period)
  },

  /* Adding time to dates */

  addYears: function (d, years) {
    var date = new Date(d);
    date.setFullYear(date.getFullYear() + years);
    return date;
  },

  addMonths: function (d, months) {
    var date = new Date(d);
    date.setMonth(date.getMonth() + months);
    return date;
  },

  addDays: function (d, days) {
    var date = new Date(d);
    date.setDate(date.getDate() + days);
    return date;
  },

  addHours: function(d, hours) {
    var date = new Date(d);
    date.setHours(date.getHours() + hours);
    return date;
  },

  addMinutes: function(d, minutes) {
    var date = new Date(d);
    date.setMinutes(date.getMinutes() + minutes);
    return date;
  },

  addSeconds: function (d, seconds) {
    var date = new Date(d);
    date.setSeconds(date.getSeconds() + seconds);
    return date;
  },

  addMilliseconds: function (d, ms) {
    var date = new Date(d);
    date.setMilliseconds(date.getMilliseconds() + ms);
    return date;
  },

  /* Comparison */

  isSameYear: function (a, b) {
    return a && b && a.getFullYear() === b.getFullYear();
  },

  isSameMonth: function (a, b) {
    return instadate.isSameYear(a, b) && a.getMonth() === b.getMonth();
  },

  isSameDay: function (a, b) {
    return instadate.isSameMonth(a, b) && a.getDate() === b.getDate();
  },

  equal: function (d1, d2) {
    return d1 && d2 && !(d1 - d2);
  },

  min: function (d1, d2) {
    return d1 - d2 < 0 ? d1 : d2;
  },

  max: function (d1, d2) {
    return d1 - d2 > 0 ? d1 : d2;
  },

  /* Other */

  dates: function(start, end) {
    if (start > end) {
      var temp = end;
      end = start;
      start = temp;
    }
    var result = []
      , diff = instadate.differenceInDates(start, end);
    for (var i = 0; i <= diff; i++) {
      result.push(instadate.addDays(start, i));
    }
    return result;
  },

  isoDateString: function (date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }

    return year + '-' + month + '-' + day;
  },

  parseISOString: function (isoString) {
    if (isNode) {
      return new Date(isoString);
    } else {
      return instadate.resetTimezoneOffset(new Date(isoString));
    }
  },

  resetTimezoneOffset: function (date) {
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  },

  firstDateInMonth: function (d) {
    var date = new Date(d);
    date.setDate(1);
    return date;
  },

  lastDateInMonth: function (d) {
    var date = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    date.setHours(d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
    return date;
  },

  isWeekendDay: function (day) {
    return constants.WEEKEND_DAYS.indexOf(day) !== -1;
  },

  isWorkDay: function (day) {
    return !instadate.isWeekendDay(day);
  },

  isWeekendDate: function (date) {
    return instadate.isWeekendDay(date.getDay());
  },

  isWorkDate: function (date) {
    return !instadate.isWeekendDate(date);
  },

  setWeekendDays: function (days) {
    if (!(days instanceof Array)) {
      throw new Error('Weekend days needs to be an array');
    }
    constants.WEEKEND_DAYS = days;
    constants.WORK_DAYS = difference([0, 1, 2, 3, 4, 5, 6], days);
  },

  daysInPeriod: function(firstDay, length, days) {
    if (firstDay instanceof Date) {
      firstDay = firstDay.getDay();
    }
    if (!days) {
      days = constants.ALL_DAYS;
    }
    var total = 0
      , direction = length >= 0 ? 1 : -1;

    function check(i) {
      var absShift = Math.abs(firstDay + i);
      var extra = Math.ceil(absShift / 7) * 7;
      var day = (extra + firstDay + i) % 7;
      if (days.indexOf(day) !== -1) {
        total++;
      }
    }

    if (length >= 0) {
      for (var i = 0; i < length; i++) {
        check(i);
      }
    } else {
      for (var i = 0; i > length; i--) {
        check(i);
      }
    }
    return total;
  },

  weekendDaysInPeriod: function (firstDay, length) {
    return instadate.daysInPeriod(firstDay, length, constants.WEEKEND_DAYS);
  },

  workDaysInPeriod: function (firstDay, length) {
    return instadate.daysInPeriod(firstDay, length, constants.WORK_DAYS);
  },

  /* isAfter & isBefore */
  isAfter: function (a, b) {
    return a.getTime() > b.getTime()
  },

  isBefore: function (a, b) {
    return a.getTime() < b.getTime()
  },

  isYearAfter: function (a, b) {
    return a.getFullYear() > b.getFullYear();
  },

  isMonthAfter: function (a, b) {
    return instadate.isYearAfter(a, b) ||
      a.getMonth() > b.getMonth() && instadate.isSameYear(a, b);
  },

  isDayAfter: function (a, b) {
    return instadate.isMonthAfter(a, b) ||
      a.getDate() > b.getDate() && instadate.isSameMonth(a, b);
  },

  isYearBefore: function (a, b) {
    return instadate.isYearAfter(b, a);
  },

  isMonthBefore: function (a, b) {
    return instadate.isMonthAfter(b, a);
  },

  isDayBefore: function (a, b) {
    return instadate.isDayAfter(b, a);
  },

  /* isBetween */

  isYearBetween: function (d, start, end) {
    return isBetween(d, start, end, instadate.isYearBefore, instadate.isYearAfter);
  },

  isMonthBetween: function (d, start, end) {
    return isBetween(d, start, end, instadate.isMonthBefore, instadate.isMonthAfter);
  },

  isDayBetween: function (d, start, end) {
    return isBetween(d, start, end, instadate.isDayBefore, instadate.isDayAfter);
  },

  isoWeekDay: function (d) {
    return d.getDay() || 7;
  },

  daysInMonth: function (month, year) {
    return new Date(year, month + 1, 0).getDate();
  },

};

function utc(d) {
  return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(),
    d.getMinutes(), d.getSeconds(), d.getMilliseconds());
}

function utcDate(d) {
  return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
}

function isBetween(d, start, end, beforeFn, afterFn) {
  if (start > end) {
    var temp = end;
    end = start;
    start = temp;
  }
  return beforeFn(start, d) && afterFn(end, d);
};

module.exports = instadate;
