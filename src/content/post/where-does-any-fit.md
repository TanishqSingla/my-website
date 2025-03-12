---
title: 'Should we forget about any?'
description: 'Should we forget about any or does it still have a place'
publishDate: '2025-03-13'
tags: ['typescript']
---

A brief history

Typescript has become unanimous in javascript ecosystem, and now I rarely see a project that decides not to use it. But it did not start this way. Earlier typescript used to sway people away, as it made the code look more like java, which is strongly typed language with a noisy syntax.

After hearing all the good reviews, the devs finally gave in. Using APIs become simpler, no more looking at the documentation for the order of arguments. Ambiguous values would be constrained to have multiple types. Cherry on top, it came with an LSP, so you can view the type error before even transpiling the code. 

Soon devs hit a roadblock, people got addicted to types as it made their lives easier, but the code legacy code which has been written in typescript was still catching up.
This was due to many reasons
Tooling - typescript was still young and lacked many features.
Mismatch in priorities - Types were considered extra works, code authors would sprinkle any just to get past the type checker to successfully compile the code.
Lack of conventions and resources - Devs newly jumping into making their code typesafe would often find themselves bike shedding, there was no opinionated way of doing typescript, or stuff like patterns anti-patterns.

The present

As we now sit and use our favorite libraries/frameworks, these issues pop-up very rarely. Thanks to the type-safety movement led by enthusiasts and typescript nerds, the ecosystem around types is more robust than ever. 

It is around this time our type any became an enemy for all. We raise our eyebrows and glare at the code whenever we see any being used in a PR, instinctively clicking on the line, leaving a review "can we make this more typesafe?". Leaving a sigh, that any won't create a problem later on. 

Now product and fellow EMs make us delete and rewrite a typesafe version of that "bad code". Software development goes in full circle. 

any is not going anywhere yet

Let's write a `useApi` hook, which is you may have encountered often, this hooks returns a function that let's you call an api and handles it's state such as loading, success and error.

```ts
export function useApi({
	apiFn,
	onSuccess,
}) {
	const [isSuccess, setIsSuccess] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const callApi = async (params) => {
		reset();
		setIsLoading(true);

		try {
			const resp = await apiFn(params);
			onSuccess(resp);

			setIsSuccess(true);
		} catch (err) {
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	};

	const reset = () => {
		setIsSuccess(false);
		setIsLoading(false);
		setIsError(false);
	};

	return {
		isSuccess,
		isError,
		isLoading,
		callApi,
		reset,
	};
};
```

Now let's make it typesafe.

Well it's kinda tricky, we can start by filling in the pieces of type we know and rest as any. 

We know that the `onSuccess` argument type would be the return type of the `apiFn` , which we can represent it this way.

```ts
onSuccess(data: Awaited<ReturnType<typeof apiFn>>);
```

Similarly we can also write the types of the parameters for our `callApi` function

```ts
const callApi = async (params: Parameters<typeof apiFn>[0]);
```

Our `apiFn` can have any type, so our mutation hook types also need to revolve around it, yep this sounds like a generics problem.

```ts
useApi<T>({ apiFn, onSuccess }: { apiFn: T, ...  })
```

If you use the function now, it will be typesafe. You can use autocomplete again!

But the typescript compiler is still complaining, you may encounter this error 

```
Type 'T' does not satisfy the constraint '(...args: any) => any'.
```

This is an easy error to fix, we just need to constraint our generic to be a function.

```ts
useApi<T>({ apiFn, onSuccess }: { apiFn: T extends (...args) => any, ...  })
```

And we're done. We made a `useApi` function fully typesafe. The function looks like this

```ts
export function useApi<T extends (...args: any) => any>({
	apiFn,
	onSuccess,
}: { apiFn: T; onSuccess: (data: Awaited<ReturnType<T>>) => void }) {
	const [isSuccess, setIsSuccess] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const mutate = async (params: Parameters<T>[0]) => {
		reset();
		setIsLoading(true);

		try {
			const resp = await apiFn(params);
			onSuccess(resp);

			setIsSuccess(true);
		} catch (err) {
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	};

	const reset = () => {
		setIsSuccess(false);
		setIsLoading(false);
		setIsError(false);
	};

	return {
		isSuccess,
		isError,
		isLoading,
		mutate,
		reset,
	};
};
```

Your eyes trained on countless code reviews might be looking at the use of `any`, and thinking if it can be typed more, what about using `unknown`.

You don't need to, use of `any` as a constraint is perfect here, which is the reason why they are present everywhere when you look at the Utility types. 

Conclusions

`any` works best when used in making constraints to your generics or utility types.
