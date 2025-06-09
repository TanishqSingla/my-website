---
title: 'The curious case of Typed Array optmisation'
description: 'Recently I optimised my fuzzy search algorithm by using typed array, but eventually found many gotchas'
publishDate: '2025-06-09'
tags: ['javascript', 'optimisation']
---

## Introduction
Recently I implemented fuzzy-search for my [ledger](https://github.com/TanishqSingla/ledger/) application. The current version is very bare bones and heavily relies on Levenshtein distance with a few calculation to weed out irrelevant result. 
## The itch to optimise
Levenshtein distance is a fairly a simple algorithm and I was already using an optimised version called Wagner-Fischer Algorithm. It was fast enough for fairly large dataset (100-200 list items)  and did not require. But I had a lot of time.

```js
function getDistance(word1, word2) {
  const matrix = Array(word1.length + 1).fill(0).map(() =>
    Array(word2.length + 1).fill(0)
  );

  for (let row = 0; row < word1.length + 1; row++) {
    matrix[row][0] = row;
  }

  for (let col = 0; col < word2.length + 1; col++) {
    matrix[0][col] = col;
  }

  for (let row = 1; row < word1.length + 1; row++) {
    for (let col = 1; col < word2.length + 1; col++) {
      if (word1[row - 1] == word2[col - 1]) {
        matrix[row][col] = matrix[row - 1][col - 1];
        continue;
      }
      matrix[row][col] = Math.min(
        matrix[row - 1][col] + 1,
        matrix[row][col - 1] + 1,
        matrix[row - 1][col - 1] + 1,
      );
    }
  }

  return matrix[word1.length][word2.length];
}
```

Your leetcode brained must be shouting right now seeing `word1.length + 1` in the for loop.

This leetcode brained habit of mine is what actually triggered to benchmark and optimise the algorithm.

So I setup a test bench using Deno. And did an initial run of the initial version and the version where I pre-calculated the length.

These were the results.

```

```

| bench                              | avg (ns) | min     | max     | p75     | p99     | runs |
| ---------------------------------- | -------- | ------- | ------- | ------- | ------- | ---- |
| getDistance - original             | 1006.92  | 1000.69 | 1039.87 | 1008.73 | 1039.87 | 60   |
| getDistance - pre-calculate length | 974.66   | 964.59  | 1050.67 | 974.85  | 1050.67 | 62   |

I ran the test 3 times and consistently managed to save ~40 ns. Not great or something significant, but a small win.

This small win made me invest more time into optimising the algorithm. After researching and brainstorming for a while, I came up with the optimisation of using 2 strings instead of a 2-D array, turned out this was a go-to optimisation step if the end goal is just to find the edit distance between 2 strings. 

Here's what the code looks like
```js
function getEditDistance2Strings(word1, word2) {
  let current = Array(word1.length + 1).fill(0);
  let buffer = Array(current.length).fill(0);

  for (let col = 0; col < current.length; col++) current[col] = col;

  for (let row = 1; row < word2.length + 1; row++) {
    buffer[0] = row;
    for (let col = 1; col < buffer.length; col++) {
      if (word1[col - 1] == word2[row - 1]) {
        buffer[col] = current[col - 1];
      } else {
        buffer[col] = Math.min(
          buffer[col - 1] + 1,
          current[col] + 1,
          current[col - 1] + 1,
        );
      }
    }
    [buffer, current] = [current, buffer];
  }

  return current[word1.length];
}
```

The results speak for themselves.

| bench                              | avg (ns) | min     | max     | p75     | p99     | runs |
| ---------------------------------- | -------- | ------- | ------- | ------- | ------- | ---- |
| getDistance - original             | 1006.92  | 1000.69 | 1039.87 | 1008.73 | 1039.87 | 60   |
| getDistance - pre-calculate length | 974.66   | 964.59  | 1050.67 | 974.85  | 1050.67 | 62   |
| getDistance - 2 strings            | 355.41   | 346.82  | 360.55  | 356.80  | 359.54  | 151  |
A 300% improvement in calculating the edit distance. Oh boy!

## Stepping in with assumptions
After seeing the improvement from ~950ns to ~350ns, I became more geeked on optimisation. I quickly realised that I am only storing numbers in the array and array is an object in javascript.
Also my words had a limit of 200 character length, so the distance stored can't. be possibly more than that and also they can't be < 0.

`UintArray` ringed in my brain and I quickly sprayed my hands on the keyboard and came up with a potential optimisation.
```js
function getEditDistanceOpt2(word1, word2) {
	const len1 = word1.length;
	const len2 = word2.length;

  let current = new Uint8Array(len1);
  let buffer = new Uint8Array(len1);

  for (let col = 0; col < len1; col++) current[col] = col;

  for (let row = 1; row < len2; row++) {

    buffer[0] = row;
    for (let col = 1; col < len1; col++) {
      if (word1[col - 1] == word2[row - 1]) {
        buffer[col] = current[col - 1];
      } else {
        buffer[col] = Math.min(
          buffer[col - 1] + 1,
          current[col] + 1,
          current[col - 1] + 1,
        );
      }
    }
    [buffer, current] = [current, buffer];
  }

  return current[word1.length];
```

The results: 

| bench                              | avg (ns) | min    | max     | p75     | p99     | runs |
| ---------------------------------- | -------- | ------ | ------- | ------- | ------- | ---- |
| getDistance - original             | 999.44   | 993.37 | 1025.92 | 999.91  | 1025.92 | 61   |
| getDistance - pre-calculate length | 1005.09  | 999.91 | 1054.09 | 1005.99 | 1054.09 | 60   |
| getDistance - 2 strings            | 351.32   | 347.92 | 358.47  | 352.31  | 356.33  | 153  |
| getDistance - Uint arr flop        | 410.17   | 396.28 | 426.10  | 412.54  | 425.94  | 132  |
Not what I expected, instead of optimising the time, I increased it by ~50ns here.

## So what's happening here
After scratching my head for a while and evaluating what could possibly be the culprit. I suddenly realised a fact about the number type of javascript. Since Javascript numbers are 64-bit floating point numbers so there must be a significant time loss for converting them.

So I tested the theory out and instead of using `Uint8Array` I used `Float64Array`.

```js
function getEditDistanceOpt2(word1, word2) {
	const len1 = word1.length;
	const len2 = word2.length;

  let current = new Float64Array(len1);
  let buffer = new Float64Array(len1);

  for (let col = 0; col < len1; col++) current[col] = col;

  for (let row = 1; row < len2; row++) {
    buffer[0] = row;
    for (let col = 1; col < len1; col++) {
      if (word1[col - 1] == word2[row - 1]) {
        buffer[col] = current[col - 1];
      } else {
        buffer[col] = Math.min(
          buffer[col - 1] + 1,
          current[col] + 1,
          current[col - 1] + 1,
        );
      }
    }
    [buffer, current] = [current, buffer];
  }

  return current[word1.length];
```

Results:

| bench                              | avg (ns) | min     | max     | p75     | p99     | runs |
| ---------------------------------- | -------- | ------- | ------- | ------- | ------- | ---- |
| getDistance - original             | 1018.71  | 1012.61 | 1053.97 | 1019.04 | 1053.97 | 60   |
| getDistance - pre-calculate length | 966.19   | 956.52  | 1060.15 | 965.81  | 1060.15 | 62   |
| getDistance - 2 strings            | 352.84   | 347.55  | 361.66  | 354.44  | 359.13  | 152  |
| getDistance - Uint arr flop        | 419.73   | 387.63  | 437.49  | 422.73  | 434.27  | 130  |
| getDistance - Float64 to rescue    | 388.91   | 371.31  | 440.82  | 389.17  | 440.30  | 139  |
Bingo! There was some truth to the theory. But things still don't look good in order.

So back to researching again, why are arrays faster than typed arrays in js? Turns out, Javascript engines (in this case V8), tries to use arrays under the hood when possible.
This is why the performance is almost identical for dynamic arrays and typed arrays. 

There are certain optimisations built into the `Array` , which allow Javascript to optimise array for what kind of data is stored in it. You can learn more on it [here](https://youtu.be/m9cTaYI95Zc?feature=shared). 

## Conclusion
Optimising javascript on a low level is tricky as we move more upwards in the abstraction levels without good controls, behaviours are often unpredictable. 

Since my constraint here were limited regarding the data, I was able to try one more optimisation which was pre-allocating the typed array. Since the maximum length of my word is going to be 200, I can jus pre-allocate a typed array of length 200.

```js
let current = new Float64Array(256);
let buffer = new Float64Array(256);
function getEditDistancePreAllocated(word1, word2) {
  const len1 = word1.length + 1;
  const len2 = word2.length + 1;

  for (let col = 0; col < len1; ++col) current[col] = col;

  for (let row = 1; row < len2; ++row) {
    buffer[0] = row;
    for (let col = 1; col < len1; col++) {
      if (word1[col - 1] == word2[row - 1]) {
        buffer[col] = current[col - 1];
      } else {
        buffer[col] = Math.min(
          buffer[col - 1] + 1,
          current[col] + 1,
          current[col - 1] + 1,
        );
      }
    }
    [buffer, current] = [current, buffer];
  }

  return current[word1.length];
}
```

Music in my ears!

| bench                               | avg (ns) | min    | max     | p75     | p99     | runs |
| ----------------------------------- | -------- | ------ | ------- | ------- | ------- | ---- |
| getDistance - original              | 1001.21  | 981.39 | 1026.03 | 1001.90 | 1026.03 | 60   |
| getDistance - pre-calculate length  | 976.29   | 971.92 | 1049.28 | 975.92  | 1049.28 | 62   |
| getDistance - 2 strings             | 353.82   | 340.93 | 360.73  | 355.25  | 359.17  | 152  |
| getDistance - Uint arr flop         | 426.41   | 401.52 | 599.55  | 428.15  | 451.05  | 128  |
| getDistance - Float64 to rescue     | 416.75   | 374.52 | 444.09  | 434.84  | 443.40  | 131  |
| getDistance - Float64 pre allocated | 249.02   | 248.09 | 251.75  | 249.21  | 251.32  | 211  |
I was able to optimise the algorithm further by ~70%. Phew!

I also tried pre-allocating `Array` but for some reason it did not optimise the result, I am out of guesses and would love to know if you have any idea why pre-allocated `Float64Array` worked but not `Array`.
