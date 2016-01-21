# Instadate

A minimal high performance date library for Node.js and Browser. Use it to compare and manipulate dates.

## Installation
```
npm install instadate
```

## Motivation behind Instadate

Current popular date libraries put a lot of effort into doing a lot of things correctly. Instadate on the other hand only has a handful of features that are all geared towards performance. Instadate is more of a wrapper around the native JavaScript Date than a full on date library.

Use Instadate when you need to run thousands of date manipulations or comparisons per second  .

**Instadate..**
* is **fast** (10 - 1000 times faster than moment)
* is **small** (just look at the source)
* does **not** care about **timezones** (use moment instead)
* is **immutable** (Instadate will always return new date objects and never modify the given ones)

## Testing
```
npm test
```
