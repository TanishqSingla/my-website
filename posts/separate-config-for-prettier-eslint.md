---
title: "You might not need separate config for prettier and eslint"
date: "2023-08-10"
---

## Overview

Recently [Andy Jiang](https://github.com/lambtron) from Deno posted this wonderful article [Node.js's Config Hell Problem
](https://deno.com/blog/node-config-hell) highlighting the config hell in a project that uses Node.js and this makes a wonderful case for using Deno over Node.js in this particular case.
In this blog series I will be exploring some ways to reduce config hell. Let's start with the first part of this series.

## You might not need separate config for prettier and eslint

If you use eslint and prettier together you might be familiar with conflicting styling rules of eslint and prettier, and would've preferred to only using eslint for linting and prettier for formatting, and end up creating 2 files like `.prettierrc` and `.eslintrc` and let me show you, you only need one.

Linting and formatting are often clubbed together and it makes sense to have one config that handles both. By using eslint plugins we can achieve that.

### Using eslint plugins

We'll be using these 2 plugins

- `eslint-config-prettier`
- `eslint-plugin-prettier`

By using these we eliminate the need `prettier` installed as dev dependency, if you want to add prettier as a eslint rule (which this blog does).

Install these two plugins with the following command

```sh
# for npm
npm install -D eslint-config-prettier eslint-plugin-prettier

# for yarn
yarn add -D eslint-config-prettier eslint-plugin-prettier

# for pnpm
pnpm add -D eslint-config-prettier eslint-plugin-prettier
```

After adding the dependency let's modify our `eslint` config. I am using `.eslintrc.json`, if you're using other formats you can change the syntax according to that.

In the `eslint` config add `plugin:prettier/recommend` in the extends field and add `prettier` in `plugins` field

```js
// .eslintrc.json
{
  "extends": [<your configs>, "plugin:prettier/recommended"],
  "plugins": [<your plugins>, "prettier"]
}
```

Now let's add our rules

```js
// .eslintrc.json
{
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "useTabs": true,
        "singleQuote": true,
        "semi": true
      }
    ],
      "indent": ["error", "tab"],
      "quotes": ["error", "single"],
      "semi": ["error", "always"]
  }
}
```

In the config file mentioned above we're using the `prettier` config options such as `useTabs`, `singleQuote` and `semi` inside the eslint rule.
This config allows us to format the documents using prettier and with our desired config when we run `eslint --fix .`

This method saves us having 2 different files for linter and formatter, I'll be exploring more ways and them in this series. As always do let me know your suggestions.

## References

[Integrating with linters - Prettier Docs](https://prettier.io/docs/en/integrating-with-linters)
[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
[eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)
