---
title: 'Improving linting and formatting 10x'
description: 'Optimizing formatting and linting performance to 10 times'
publishDate: '2025-03-31'
---

## Introduction
We've come a long way in computing, from punchcard batches to silicon transistors, nanometer in size, whose number increase [2 times every year](https://en.wikipedia.org/wiki/Moore%27s_law).

Thanks to these development, we're writing more sophisticated and complex software as well as the tools that help us make these software. However one suit of tools has been notorious in the lives of developers, that may have our managers giving the wrong expressions that we not might be working.

![https://imgs.xkcd.com/comics/compiling.png](https://imgs.xkcd.com/comics/compiling.png)

Compilers! While not much can be done for compilers, there's also another family of tools static analyzers, static analyzers are tools used to enforces behaviors which don't necessarily change the underlying functionality of the code, but how the code is written, they are often useful in finding potential bugs and security vulnerabilities, some even warn you about race conditions.

In Frontend ecosystem we have 2 tools that are used unanimously [eslint](https://eslint.org/) and [prettier](https://prettier.io/).

## Some rant
While the tools are quite fast, and you probably don't even notice it in your shiny M3 mac pro given by your company. Even they choke, in huge codebases and the worst victim is the older hardware.

I have spent a fair share of time with low end hardware and I hate it when the codebase is not accessible and requires you to run a bunch of tools causing it to have a minimum hardware requirement of a highend system. While some things can't be avoided, but I believe one should be able to run their frontend without worrying about the hardware.
## Why to optimize
Formatting and linting is used like the shell `clear` command, we love to spam it, but just imagine your `clear` command takes 30s every time you run it. 
I hope you're getting where I am going, not only this increases developer ergonomics, but it also avoid increasing feedback loops while coding.
## Venturing out for a solution
As every great engineer said, refactor/revamp should be your last option. So first let's explore the ways we can improve our underlying setup.

To give you an overview, I am using [the monkeys repo](https://github.com/the-monkeys/the_monkeys/)  at this [commit hash](https://github.com/the-monkeys/the_monkeys/commit/d3d55c073d3a0d31c77dabb04f3aba5433b1a1b8).
### Hardware specifications & OS
Processor - Intel(R) Core(TM) i3-7100T CPU @ 3.40GHz
RAM - 8GB

The clock speed is high, but the processor contains only 4 cores. But since single thread performance is key in these programs, you might observe slower performance on Ryzen processors that launched significantly later, than this processor.

The OS is Ubuntu 24.04 LTS

### Measuring time
Running lint without any optimization, with the following command
```json
// package.json
{
	"check": "eslint . && prettier --check ."
}
```
```sh
time npm run check
```
ends up taking 17s to 18s. Since the codebase is pretty small at this point and is bound to get larger, this only get worse.
And currently we're only linting, prettier when it has to replace the file adds around 700ms to 1s for each file.

### Running command in parallel
Since linting and checking formatting can be done in parallel, it's better if we do that. 
I was able to find 2 available options to do that with npm, since I want the command to be cross-platform, I am relying on these libraries.
#### `npm-run-all`
With this package we can run our npm scripts parallely. Let's create the commands we want to run parallely. 
```json
{
  "lint": "eslint .",
  "format:check": "prettier --check .",
  "check-parallel": "run-p lint format:check"
}
```

Now we can run our process in parallel, using this command
```
npm run check-parallel
```

**Result**
Using this I was able to bring down the time to 10s to 11s, we have now saved 5-6s and it also makes it clear that most of the time is taken by prettier.
#### `concurrently`
Concurrently is another package that can be used to parallelize commands and is also cross-platform. We can use concurrently like this

```json
{
	"check-conc": "concurrently 'eslint .' 'prettier --check .' "
}
```
**Result**
Result is same as `npm-run-all` but we get a neatly logs by default, so that's a plus for this library.

#### Evaluating caching
Caching seems to be a natural choice, but there are some caveats.
 
If your scope is limited to local machines, it's a great choice. But if you're creating a CI/CD over it then there are some caveats that need addressing.

To have caching enabled on your CI/CD you would have to commit your cache files in version control, or have a separate cache store that gets injected into your environment.

Either way, there's some complexity you need to deal with. You can ignore the cache for CI/CD but then the parity with the local setup ends.

Now that the caveats are mentioned, let's implement and look at the gains.

Since our worst offender is prettier, let's first add cache to prettier. Prettier offer 2 cache strategies, `metadata` and `content`. Prettier docs recommends `metadata` for speed.
```json
{
	"check-pretty-cache": "concurrently 'eslint .' && 'prettier --check --cache --cache-strategy metadata --cache-location ./prettier-cache .'"
}
```
By doing this I was able to further save 4-5s.

**Nextjs specific improvements**

The project is built on nextjs and nextjs provides it's own caching for build and lint operation. 
We can use the lint operation provided by next.js.

```json
{
	"check-cached": 'concurrently 'next lint' && 'prettier --check --cache --cache-strategy metadata --cache-location ./prettier-cache''
}
```
By using `concurrently` and caching prettier and eslint, we get the best time of 2s.

However caching follows law of diminishing returns, when the number of edited files increases, the gains would also diminish.
## Going Forward
Going forward there is one tool that I would love to implement, and it has completely replaced my personal flow.
However before jumping to new tools, I would highly recommend you apply the optimizations mentioned above as they don't bring any change to the input and output.
However replacing tools may come with their own set of unknowns.

The tool is [biome.js](https://biomejs.dev/). The performance is just amazing. In contrast without caching and running commands in parallel I am able to get 2s consistently on both operation.

Best part, it only has one config file to manage, and when I parallelized linting and formatting, I was able to run my operations under a 1s.
