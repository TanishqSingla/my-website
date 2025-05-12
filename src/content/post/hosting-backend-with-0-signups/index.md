---
title: Hosting my backend server with 1 command and 0 signups
description: Hosting backend server with malai, a tool that let's you expose your localhost to inetrnet via P2P network
tags: ['backend', 'tools']
publishDate: '2025-05-12'
coverImage:
    src: "./cover.png"
    alt: "Developer on keyboard"
ogImage: "./cover.png"
---

## Introduction
I was developing a bot for [Monkeys](https://github.com/the-monkeys) (an open source organisation focused on creating a no-nonsense information), to help with routine tasks, reminders etc.

The discord documentation recommends [ngrok](https://ngrok.com) for hosting the bot server. So when I clicked on the site, and saw a signup page my mind shouted lame!.

What if there was a way to host my server but without having to rely on a cloud service that requires a signup. Spoiler alert! [malai](https://malai.sh) was just the answer I was looking for.

## Welcome malai
[Malai](https://malai.sh) is a tool that lets you expose your HTTP as well as TCP on internet via [Kulfi](https://github.com/kulfi-project/kulfi) network which is a P2P network, so no cloud!.

## Building with malai
Let me demonstrate how easy it is to create host a discord bot server with malai, and test it.

I am using [Deno](https://deno.com). But you can follow any tech stack here.

Let's add a healthcheck route and test if our server is hosted on internet or not.

```js
//main.js
import { Application, Router } from "@oak/oak";

const app = new Application();
const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = "healthy";
});

app.use(router.routes());
app.listen({ port: 3000 })
```

I run this server on localhost using 
```sh
deno main.js
```

Now to host this server with malai I just need to run one command i.e
```sh
malai http 3000 --public
```

[Malai](https://malai.sh) will generate a unique url that you can use and access your server from anywhere.

To confirm that we're really on the internet, let's create an endpoint which discord will use to register the bot.

```js
router.post("/api", async (ctx, next) => {
	// verify discord header and body
	const { valid, body } = await verifySignature(ctx.request);

	if (!valid) {
		ctx.response.status = 400;
		ctx.response.type = "application/json";
		ctx.response.body = { message: "Hello, Oak!" };
		return next();
	}

	if (body.type == 1) {
		ctx.response.status = 200;
		ctx.response.type = "application/json";
		ctx.response.body = { type: 1 };
		return next();
	}
})
```

## Conclusion
That's it! Malai is so easy to use and there is no signup process, authentication tokens api limit. Just generate a unique url and use it. I built a whole discord bot using malai, you can find it's code at https://github.com/the-monkeys/orangutan
