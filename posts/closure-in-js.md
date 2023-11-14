---
title: "Closure in JS and why you should bother"
date: "2021-07-16"
---

## Overview

If you're in middle of learning JavaScript or you already completed various online tutorials, you may have came across closures and did not bother much after learning about it. Interestingly you can easily find tons of blogs on this platform explaining closures in depth, but why you should bother reading them? This blog attempts to answer that.
This blog is an attempt to make you curious and give you a feel why closures are considered one of the pillars in JavaScript.

## How tutorials do it?

If you're watching one of the tutorials or you've enrolled in a boot camp that briefs JavaScript, they might have touched the concept of closure and there's a high chance you've came across a code like this.

```js
const string = "hello closure";
function print() {
	console.log(string);
}
```

Which outputs:

```
hello closure
```

And a lazy conclusion comes out of this example is that the function insides can get the variable from its parent scope and marking the end of story for closures.

## Does it really end there?

This part of the blog is a bit sloppy, so bear with me a little.
I don't remember the itihās (history of events) and what was I doing, I wanted to create a function that only ran once no matter how many times you call it but I didn't want it to use a global variable that keeps tracks of the execution count. So I came up with a higher order function, it looked like this:

```js
function closure() {
	let counter = 0;
	function onlyExecutesOnce() {
		if (counter == 1) {
			return;
		}
		counter += 1;
		console.log(counter);
	}

	return onlyExecutesOnce;
}

/* testing the function */
const myFunction = closure();
myFunction();
myFunction();
myFunction();
```

Output:

```
1
```

At first glance I didn't not bother much and to my eyes it looked plain and simple.

## So What's the Conclusion?

So, after thinking about my code a question dropped in my mind.
**Why is it that `myFunction()` is sharing the same surrounding environment as `onlyExecutesOnce()`?**
This question puzzled me as I wasn't able to get to a straight forward explanation for this behavior. After reading about it I came to know that whenever you pass a function definition it also takes its surrounding information with it.
And that's what closures are, the function is not only getting the variables from its surrounding it is also **_attaching itself_** with the information from its surrounding of where it was declared. In this case `onlyExecutesOnce()` is also attached with information of its surrounding which is being passed to `myFunction()`.
So closures, my fellow readers opens a lots of doors for doing
