var constants = {
  MS_IN_DAY: 1000 * 60 * 60 * 24,
  MS_IN_HOUR: 1000 * 60 * 60,
  MS_IN_MINUTE: 1000 * 60,
  MS_IN_SECOND: 1000,
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
  }

};

module.exports = teatime;
