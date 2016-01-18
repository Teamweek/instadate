var difference = require('lodash.difference');

var constants = {
  MS_IN_DAY: 1000 * 60 * 60 * 24,
  MS_IN_HOUR: 1000 * 60 * 60,
  MS_IN_MINUTE: 1000 * 60,
  MS_IN_SECOND: 1000,
  WEEKEND_DAYS: [6, 0],
  WORK_DAYS: [1, 2, 3, 4, 5],
}

var teatime = {

  noon: function(d) {
    var date;
    if (d) {
      date = new Date(d);
    } else {
      date = new Date();
    }
    date.setHours(12, 0, 0, 0);
    return date;
  },

  differenceInDays: function(d1, d2) {
    var utc1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate());
    var utc2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate());
    return Math.floor((utc2 - utc1) / constants.MS_IN_DAY);
  },

  addDays: function (d, days) {
    return teatime.addMilliseconds(d, days * constants.MS_IN_DAY);
  },

  addHours: function(d, hours) {
    return teatime.addMilliseconds(d, hours * constants.MS_IN_HOUR);
  },

  addMinutes: function(d, minutes) {
    return teatime.addMilliseconds(d, minutes * constants.MS_IN_MINUTE);
  },

  addSeconds: function (d, seconds) {
    return teatime.addMilliseconds(d, seconds * constants.MS_IN_SECOND);
  },

  addMilliseconds: function (d, ms) {
    return new Date(d.getTime() + ms);
  },

  isSameDay: function (a, b) {
    return a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear();
  },

  dates: function(start, end) {
    var result = []
      , diff = teatime.differenceInDays(start, end);
    for (var i = 0; i < diff; i++) {
      result.push(teatime.addDays(start, i));
    }
    return result;
  },

  equal: function (d1, d2) {
    return !(d1 - d2);
  },

  dateString: function(date) {
    return date.toString().slice(0, 15);
  },

  min: function (d1, d2) {
    return d1 < d2 ? d1 : d2;
  },

  max: function (d1, d2) {
    return d1 > d2 ? d1 : d2;
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
    return !teatime.isWeekendDay(day);
  },

  isWeekendDate: function (date) {
    return teatime.isWeekendDay(date.getDay());
  },

  isWorkDate: function (date) {
    return !teatime.isWeekendDate(date);
  },

  setWeekendDays: function (days) {
    if (!(days instanceof Array)) {
      throw new Error('Weekend days needs to be an array');
    }
    constants.WEEKEND_DAYS = days;
    constants.WORK_DAYS = difference(days, [0, 1, 2, 3, 4, 5, 6]);
  },

};

module.exports = teatime;
