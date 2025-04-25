---
title: 'Creating better abstractions in React with Web-components'
description: 'Learn how we can maximize using browser apis and create better abstractions for our React components'
publishDate: '2025-04-21'
tags: ['react', 'frontend', 'web', 'javascript']
---

## Why web-components?
Web components are reduced to a buzz word in React ecosystem, while we all realize it's potential, we still don't see it as an ideal fit for many of our problems.

Having worked as a React developer for a while, I feel like our ecosystem is poor at creating as well as re-using code.
Every feature cycle we encounter some scenario where we end up creating a new component altogether, and we also make sure it is generic and can be re-used.
But when the time comes to re-use it, we often side-step and create a new, as we realize that this particular use-case doesn't fit and we don't want to change behavior for all the code.

And then there's the `ref` hell, so much of the logic, event listeners etc. are defined using ref's which isn't a bad thing, but it surely becomes a pain, when we have some kind of nesting or multiple references.

## Outsourcing browser built-ins to js
Popular component libraries like radix, or headlessui have one thing in common, they handle a lot of things out-of-the box. 
But this has a cost, since the libraries are made headless, they re-create a lot of stuff in JS, which we get built-in the browser. This includes keyboard-navigation handlers, focus traps etc.

As a result we end up creating a huge bundle size for the application and we end up shipping bloated applications, which have a poor performance on mobile phones.

## This is the way
By now you must have guessed the pointers I am targeting for web-components. 

Web components open a new way for us to write code to create re-usable components. 

## Showing you the code
Since the famous Linus's meme is coming to your mind, allow me to show the code. 

I am going to create a Modal component, a distinct feature of modal is that they an be closed when the backdrop is clicked, which is not present in the browser's dialog tag.
If you remember I made this in my recent blog [popover using dialog](https://tanishqsingla.in/blog/popover-with-dialog/).

The neat thing about web-components is that we can extend them from existing components provided in the browser. So we can easily utilize the existing `dialog`  component for our case.

We can create our Web component as such:

```js
class ModalDialog extends HTMLDialogElement {
	constructor() {
		super();

		this.addEventListener("click", this.handleOutsideClick);
	}

	handleOutsideClick(event) {
		const rect = this.getBoundingClientRect();
		const outsideDialog = event.clientY <= rect.top ||
			event.clientX <= rect.left || event.clientX >= rect.right ||
			event.clientY >= rect.bottom;

		if (outsideDialog) this.close();
	}
}

customElements.define("modal-dialog", ModalDialog, { extends: "dialog" });
```

This way we can just 

```jsx
<dialog is="modal-dialog">
...
</dialog>
```

This way we can avoid adding an event listener in a useEffect, and also don't have to worry about the cleanups.

Best part is we get all the goodies included in the dialog, which includes: 
- A layer for backdrop
- Focus trap
- Keyboard navigation like `Esc` to close

Since we're not using any ref here, we don't have to deal with `forwardRef` as well. and can use a `ref` without any hassle. 

## Conclusion
I have been using web-components to abstract things like this for a while, and they have helped me a lot in abstracting things like this. 

Leveraging on web-components like this, where we extend behavior of an existing HTML tag and adding custom behavior, is a neat way of having custom components with a lot less Javascript.

This approach is very convenient, I haven't faced any downside yet. If you have implemented this at scale, let me know what are some challenges or benefits I missed in the blog.
