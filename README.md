# Instadate

A minimal high performance date library for Node.js and Browser. Use it to compare and manipulate dates.

## Installation
```
npm install instadate
```

## Usage
```javascript
var instadate = require('instadate');

var date1 = new Date();
var date2 = instadate.addDays(date1, 1);

instadate.differenceInDates(date1, date2);
```

## Motivation behind Instadate

Current popular date libraries put a lot of effort into doing a lot of things correctly. Instadate on the other hand only has a handful of features that are all geared towards performance. Instadate is more of a wrapper around the native JavaScript Date than a full on date library.

Use Instadate when you need to run thousands of date manipulations or comparisons per second  .

**Instadate..**
* is **fast** (10 - 1000 times faster than moment)
* is **small** (just look at the source)
* is **immutable** (Instadate will always return new date objects and never modify the given ones)

## Testing
```
npm test
```

**NB! Documentation is a WIP, look at source for all functions**

## API Reference

### `instadate.utc(date)`
Returns the UTC time in milliseconds.

### `instadate.noon(date)`
Returns a copy of the date with hours set to 12 and minutes, seconds and milliseconds set to 0.

### `instadate.differenceInDays(from, to)`
Returns the difference in days (24 hour periods) between two dates. Returned result can be negative.

### `instadate.differenceInHours(from, to)`
Returns the difference in hours (60 minute periods) between two dates. Returned result can be negative.

### `instadate.differenceInDays(from, to)`
Returns the difference in days (24 hour periods) between two dates. Returned result can be negative.

### `instadate.differenceInWeekendDays(from, to)`
Returns the difference in days (24 hour periods) between two dates. Excludes weekend days. Returned result can be negative.

### `instadate.differenceInWorkDays(from, to)`
Returns the difference in days (24 hour periods) between two dates. Excludes weekend days. Returned result can be negative.

### `instadate.differenceInDates(from, to)`
Similar to `differenceInDays` however counts all dates that fit into the period, not 24 hour periods.

### `instadate.addDays(date, days)`
Returns a cloned date with days added to it, use negative input for subtraction.

### `instadate.addHours(date, hours)`
Returns a cloned date with hours added to it, use negative input for subtraction.

### `instadate.addMinutes(date, minutes)`
Returns a cloned date with minutes added to it, use negative input for subtraction.

### `instadate.addSeconds(date, seconds)`
Returns a cloned date with seconds added to it, use negative input for subtraction.

### `instadate.addMilliseconds(date, milliseconds)`
Returns a cloned date with milliseconds added to it, use negative input for subtraction.

### `instadate.isSameYear(date1, date2)`
Returns if the years are equal

### `instadate.isSameMonth(date1, date2)`
Returns if the years and months are equal

### `instadate.isSameDay(date1, date2)`
Returns if the years, months and dates are equal

### `instadate.equal(date1, date2)`
Returns if the dates are equal to millisecond precision

### `instadate.min(date1, date2)`
Returns the earliest date

### `instadate.max(date1, date2)`
Returns the latest date
