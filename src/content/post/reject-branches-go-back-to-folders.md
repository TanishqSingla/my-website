---
title: Reject Branches; Go back to folders
description: Traditional stash workflow poses some problems, what if going back to working with folders for version could solve it, let's see
publishDate: '2025-04-25' 
tags: ['git']
---

## Introduction
We all learn git at an impressionable age in our software development career and quickly grasp the pros and cons, which seems obvious when we learn them.

Obviously, who really wants to manage changes spread across different folders in our apps containing hundreds of files with thousands of lines of code. Hence a version control like git is necessary.

## All changes are not iterative
By the time we learn git and incorporate it in our workflow, things starting popping up, we realize the importance of our main or production branch and it's integrity.
If we mess it up there's no going back to how things were becomes painful.

Add a few more team mates in your project, and collaboration is parallelized and changes conflict. We now have to take in measure of what other folks are working on and a necessity to communicate is created.

Oh there's a critical bug in the current system! A regression is needed and the changes need to be paused, worse case is when a change relies on the current system, it needs to be re-iterated after the bug is solved.

## The friction
While the points mentioned above are a given in any collaborative environment. Standard git workflow, that is having one folder and navigating the code changes via branches, introduces the friction.

Navigating git branches unlike navigating to folders require some checks, git disallows navigating to branches if there are any unstaged changes exist in the codebase.

This lead to having a mental overhead of knowing that you have code that might be stashed.

There are often scenarios where you want to quickly checkout to main branch and create a hotfix, if you're already working on some change in another branch, this becomes painful. I have personally cloned a repo twice on my machine, where one was meant for hotfixes and small changes and other for the feature I am working on (If you've too, do let me konw :]).

One other pain point which is a bit personal to me is forgetting to delete the branches, branches stay hidden and often reveal themselves when we do a git command: 
```sh
git branch
```

This is trivial, but I have stumbled a lot remembering to checkout to correct branch and having to type the whole name of the branch, because the autocomplete interrupts at every keystroke.

## Welcome git worktrees
These are minor issues hence the solution is also not a radical one but one that let's you view your project's branches like you how you arrange folders.

And yes that's how you go back to folders. In layman terms, worktree allows you to lay out your branches in like folders, so your repo contains folders which denote the branch name E.g (./main, ./feaure-a etc.).

While worktree may sound overwhelming, if you dumb it down it's just a "what if branches were folders?".
This approach is a very neat solution to problems that arise in the stash workflow.

## Overview of git worktrees
There are not many commands that you need to know when working with git worktrees.

Knowing the following basics one are fine.

### Cloning a repo to worktree

You can clone a repo to have a worktree setup by just adding `--bare` flag and naming then folder you want it to clone into. E.g

```sh
git clone git@github.com:Username/repo.git --bare ./repo-worktree
```

**Adding/Creating a folder(branch)**
To add your remote branch or create one locally, you have to do

```sh
git worktree add <branch_name>
```

**Removing folder(branch)**
Deleting the folder is fine, but it doesn't remove your worktree from the registry, so you can do 

```sh
git worktree remove <folder_name>
```

There's also a prune, command if you prefer deleting folders and forget about theme

```sh
git worktree prune
```

## Conclusion
I hope this alternate solution is what you may be looking for, as always if I missed something do let me know.

