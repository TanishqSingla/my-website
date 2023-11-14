---
title: "Write your own pre-commit hooks"
date: "2023-08-12"
---

## Overview

If you've never written a git hooks don't worry. Writing git hooks is far more easier than you think it is. In this blog I'll be sharing a basic idea how pre-commit hooks are made by creating a simple `pre-commit` hook that runs a formatting and linting check on our project.

## Creating the project

The example in this blog is a simple hello world application using node.js and express but you don't have to learn anything about them as the main focus is to run the scripts and not to create a web-server.
You can find the project in this repo - [pre-commit-example](https://github.com/TanishqSingla/pre-commit-example).

## Project overview

The project contains our hello world application and the logic for it is defined in `server.js` and then there are some config files for `eslint` and `prettier`.

**server.js**

```js
const express = require("express");

const app = express();

app.get("/", (_, res) => {
	res.send("Hello world");
});

app.listen(3000, () =>
	console.log("server is running on http://127.0.0.1:3000"),
);
```

**eslint and prettier**
As for eslint and prettier, I am using prettier plugins with eslint, you can find more details for it in this blog - [You might not need a separate config for eslint and prettier](https://dev.to/tanishqsingla/you-might-not-need-separate-config-for-prettier-and-eslint-m9e)

```js
{
"env": { "commonjs": true,
    "es2021": true,
    "node": true
  },
  "extends": ["eslint:recommended", "plugin:prettier/recommended"],
  "plugins": ["prettier"],
  "parserOptions": {
    "ecmaVersion": "latest"
  },
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "semi": true,
        "useTab": true
      }

    ],
    "indent": ["error", "tab"],
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
  }
}
```

If you take a look at our config and `server.js` file, you will realize that when we will run our linter it is going throw errors.

**scripts**
I've added scripts to run our eslint in the `package.json` file

```js
"scripts": {
  "lint": "eslint .",
  "lint:fix": " eslint --fix ."
}
```

## Writing our pre-commit

Let's write our pre-commit hook. The general idea of writing our pre-commit hook (in this case) is to avoid code with linting errors to get commited, this will streamline our development cycle as developers often forget small things in the code which might get alarmed in our lint stage.

To write a pre-commit hook all we need to do is a create a bash script file named `pre-commit` in the `hooks` folder under `.git` folder.

```sh
#!/bin/sh

npm run lint

SUCCESS=$?

[ $SUCCESS -ne 0 ] && exit 1
exit 0
```

That's it! Yes, this is our pre commit hook that checks if our code is formatted or not. Let's look at what we're doing here.

**npm run lint**
This is the command we defined in our `package.json`, this commands run the eslint command and displays the error.

**SUCCESS=$?**
Here we're assigning a variable named `SUCCESS` and assigning it to the status code of the last command that ran i.e `npm run lint`. Commands that run successfully return 0 as their value and those who don't returns a non-zero value.

**[ $SUCCESS -ne 0] && exit 1**
This is our conditional statement that checks if the `SUCCESS` value is not 0, if it is not 0 then it exits with code 1 which is a non-zero value implying our program exited with an error.

**exit 0**
If our conditional statement returned false, we exit the program with 0 meaning success.

### One last step

Now that we've created our script we need to make it an executable so that the git can execute this file before we hit commit. To do that we provide the file with execute access. Run this command in your terminal to do that

```sh
chmod +x .git/hooks/pre-commit
```

Now when you'll try to commit the changes it won't let you do that, as we have linting errors in our code.

## Limitations of this approach

As simple as this approach looks there is one limitation with this approach, the hooks are not versioned by git and hence not stored in the repo.
There are work arounds to this mentioned in this [stackoverflow post](https://stackoverflow.com/questions/427207/can-git-hook-scripts-be-managed-along-with-the-repository). But this relies on Git v2.9 or older.
You can also create a simple script that copies the contents of your git hooks.

## Other solutions

You can follow [Git Hooks](https://githooks.com/) docs, this doc contains some amazing project that can supercharge your development cycle with git hooks.
You can also use `pre-commit` a very famous package for setup like this. You can refer this [tweet](https://twitter.com/TanishqSingla_/status/1690422847448244224?s=20) of mine.
