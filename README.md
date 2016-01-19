# Teatime

A minimal high performance date library for Node.js and Browser. Use it to compare and manipulate dates.

## Installation
Teatime isn't on npm yet, install it from GitHub:
```
npm install teamweek/teatime
```

## Motivation behind Teatime

Current popular date libraries put a lot of effort into doing a lot of things correctly. Teatime on the other hand only has a handful of features that are all geared towards performance. Teatime is more of a wrapper around the native JavaScript Date than a full on date library.

Use Teatime when you need to run thousands of date manipulations or comparisons per second  .

**Teatime..**
* is **fast** (10 - 1000 times faster than moment)
* is **small** (just look at the source)
* does **not** care about **timezones** (use moment instead)
* is **immutable** (Teatime will always return new date objects and never modify the given ones)

## Testing
```
npm test
```
