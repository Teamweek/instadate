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
  }

};

module.exports = teatime;
