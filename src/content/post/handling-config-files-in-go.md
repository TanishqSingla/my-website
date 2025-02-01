---
title: 'Handling config files in go'
description: 'Learning to handle config files in go programming language'
publishDate: '2024-03-01'
tags: ['go', 'backend']
---

## Introduction

Learning a new language and leaving the comfort zone of your tech stack is a challenging process, one can phrase the experience similar to walking in an unknown territory.
I am currently developing my back-end in go programming language, which came with it's own challenges. Luckily go programming language was very simple, in syntax as well as behavior, so it did not take much effort to get comfortable with it.
However when I got ready to make my first application, my head got clouded with questions. Those questions would typically fall in the following category

- Is this a good practice?
- How is this organised?
- Is this how you're supposed to use the framework?

In every step these questions would stop me from developing my application.
The Go docs and manual were not able to satisfy my hunger. I tried reading popular books, but they would leave me with more questions than answers.

## The solution

I resorted to learning from open source projects. Go has a huge community, also the nature of Go programming language there are plenty of clever programming tips to learn from them. Combining both of the traits you get a lot of open source projects to learn from.

## Config Handling

One such technique I learned was handling configs in a Go program. This comes from an open source project [Rocket](https://github.com/Shivamsouravjha/Rocket) by [Shivam Sourav Jha](https://github.com/Shivamsouravjha/).

## TL;DR

The gist of the approach was to have a separate `config` file, and define a global struct/variables for the config and initialize the environment variables.

If you understood the approach, you don't have to continue. If you're new to go and want to understand what I am talking about I'll be explaining it in detail.

## Things I improvised

The usage of `init` was clever and it was new to me when I first looked at the repo. There are some good ideas to learn from it and also some things that I thought can be improvised.

For me in the context of this config handling approach, I changed a few things. They are mentioned below

- Remove the `Get()` to access env variable. The function can be handy if there is some behavior I want to add before any function can access the config variable, but for now I did not find any use case for it.
- Not exporting the config struct. In the repo for some reason the author exported the `Config` struct, I found it useless and kept it in the scope of the package.

## Config handling in action

First you need a separate config file and name it under a package.

```go
// config/config.go
package config

// Define your env variables and their type
type configuration struct {
}

// declaring global variable. This is going to be exported in the package.
var Config configuration

// Here we initialize our config variables
func init() {
 Config = Configuration {
  // assign values to variables
 }
}
```

Here, we're relying on `init` function to initialize a variable. Now go has a really neat feature with packages, this `init` function gets executed when the package is used somewhere. So we don't have to manually run the `init` function.

## Conclusion

Go programming language is rich with open source repos to learn. People creating these repos range from students to professionals helping the world to learn from their code and for me simplifying my learning. Do show them some love by starring their repos.

![Pikachu eating cake meme](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/u8nwqr4sn3xdhrxueh3u.png)
