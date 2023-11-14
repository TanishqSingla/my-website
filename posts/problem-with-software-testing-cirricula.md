---
title: "The problem with Software Testing Curricula on Web"
date: "2023-11-10"
---

**Disclaimer**: I don't mean to convey any negative messages towards any individual or organisation. Treat this post as an opinions, and my opinion wouldn't change the world. There maybe some subjects or contents I have misunderstood due to language barrier so feel free to enlighten me.

## Introduction

As a self learner with no mentorship I treat internet as my mentor, and I have preached numerous times that you don't need a course or pay for any books because that information is available on the internet in some form. However the lightning struck when I stepped into the confusing lair of google seo to teach me software testing.
I was not willing to learn it through courses or books so searched google for any resources. I found two blog series

1. Wikipedia
2. [Browserstack guides on testing](https://www.browserstack.com/guide/what-is-software-testing)

There were few more, but they were completely off track from the core software testing topic so I didn't read them.

## Testing type, a total mess

Browserstack and Wikipedia both confused me a lot, during learning I mostly had to piece out what I think was relevant and assume the rest of it as outdated of false.
The first I got confused reading about software testing was Browserstack functional testing guide.
The functional testing guide named as [Functional Testing : A Detailed Guide](https://www.browserstack.com/guide/functional-testing) teaches about functional testing where Unit testing is mentioned as a part of functional testing as mentioned in their diagram just below **Types of Functional Testing**.

![Browserstack guide on functional testing](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zzsln3tnj5387izoj1uq.png)

As mentioned in the guide, **Unit Testing** is mentioned as a category of functional testing.
The link here references another guide named as [Unit Testing: A Detailed Guide](https://www.browserstack.com/guide/unit-testing-a-detailed-guide)
When you reach to the **Unit Testing Techniques** section, you'll encounter that **functional testing** which links us back to the Functional Testing Guide is mentioned as a technique of Unit testing but we just read that Unit testing is a type of functional testing.
What adds more to the confusion is the TDD section under Unit Testing guide, the **Read More** section links an article named as [Differences between Functional Testing and Unit Testing](https://www.browserstack.com/guide/difference-between-functional-testing-and-unit-testing).
I was already trying to make a sense of this cyclic reference of Unit and Functional Test, and now there's an article that writes about the differences between those.
There were similar articles other than Browserstack's that had the same cyclic reference problem.

## The Jargon Problem

It kills my soul when I see a veteran dev or a tester who happen to read about all the jargon ask the newbies to tell differences between tests like Smoke and Sanity tests and carries on a sly smirk.
While working in some orgs, I have realised terms like Sanity doesn't mean anything and testers and software developers love to throw around this word without any context or meaning.
Software testing terms don't provide any meaningful context from the name, some of them are not even native to Software Testing and hence lack the meaning.

- Smoke Testing
- Sanity Testing
- Regression Testing
- Structural Testing
- Big Bang Testing (what the hell does it even mean!)

The list goes on as you delve more into the types of tests.

Software Development in today's standard is also a responsibility of the developer and not just the tester, however the terms used in both disciplines are the same but the whole function and pipeline of the test differ.
**Sanity Vs Smoke Tests**
If you will search about sanity test and smoke test individually, you'll find their definition same. Wikipedia refers Sanity Tests as a alias of Smoke Tests in their wiki [Smoke Testing](<https://en.wikipedia.org/wiki/Smoke_testing_(software)>).
Luckily after browsing a lot a common pattern appeared which was the difference on how these tests are done and when they are done.
Smoke tests can be done using automation and are performed before they were handed over to the QA, which I imply as a developer running their suite of tests before handing their app to QA. Whereas Sanity Tests are performed after the developer hands over their build to QA.
In other words, smoke tests are performed by developers after they complete their feature or before handing out the final build, and sanity tests are performed by tester after the developer hands out the build of the application.

Smoke tests and sanity tests by definition are the same, both are confidence tests but the key difference lies in the stage of development pipeline.

## Conclusion

I would like to conclude this blog by saying Software Curriculum on web is a mess apart from the weird guides the theoretical content regarding Software Testing is highly outdated and severely lacks in abstracting its core concepts while completely ignoring the modern software development value stream and we need new and better structure to understand software testing.
