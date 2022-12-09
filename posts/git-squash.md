---
title: "Too many commits, squash'em!!"
date: "2021-10-22"
---
If you're someone like me who likes to commit every small change and end up having too many commits for a single feature and think "Wouldn't it be nice if you can merge some of those meaningless commits?"

## Squash to the rescue
Turns out you can do just that in OG git. Let us look how to use `squash`, for following the tutorial I've created a github repo, you can open the repo by clicking [here](https://github.com/TanishqSingla/squash-example).

## Fixing those commits
Take a min and look at the commit section in the repo and check the content of those commits.
If you're also weirded out by those awful commits then don't worry, we'll fix them together.

First let's find the commits that are meaningless.
The first one that I feel is meaningless is the 3rd commit form the start of branch, here we only change the title of the this can easily be merged with the boilerplate commit.

In a terminal do `git rebase -i HEAD~5`. This command will open the rebase command in interactive mode with the last 5 commits you've from the current commit.

```
pick b1b37b5 Added boiler plate code
pick 125e103 Changing title
pick c6c03ac Adding navbar list
pick 3816fa0 Adding Downloads in navbar list
pick 10534c0 Added Pricing section

...
```
You should see something like this in your text editor which you've chosen as default in git. You can do a bunch of stuff in here, commands for which will be available in the same.
Now, what we do is change that `pick` in our commit where we change our title to `squash`

The end result should look like this.
```
pick b1b37b5 Added boiler plate code
squash 125e103 Changing title
pick c6c03ac Adding navbar list
pick 3816fa0 Adding Downloads in navbar list
pick 10534c0 Added Pricing section
```
Changing the `pick` to `squash` will basically merge the `Changing title` commit with the `Added boiler plate code` commit.

Save the file and close it. 

Now you should see this message popping up in a file
```
# This is a combination of 2 commits.
# This is the 1st commit message:

Added boiler plate code

# This is the commit message #2:

Changing title

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Date:      Fri Oct 22 01:02:46 2021 +0530
#
# interactive rebase in progress; onto 2814ed0
# Last commands done (2 commands done):
#    pick b1b37b5 Added boiler plate code
#    squash 125e103 Changing title
# Next commands to do (3 remaining commands):
#    pick c6c03ac Adding navbar list
#    pick 3816fa0 Adding Downloads in navbar list
# You are currently rebasing branch 'master' on '2814ed0'.
#
# Changes to be committed:
#	modified:   index.html
#
```
In this file you can change the commit message for your final commit i.e commit formed after merging. As mentioned in the instructions, lines starting with `#` are going to get ignored, so I am going to comment the `Changing title` message and change the `Added boiler plate code` to `Added boilerplate and changed title.

Save and close the file and now do `git log`.

**Tada!** our commits are merged into one and our changes look more meaningful.

Now try doing the same for `Added downloads section` and `Added Pricing section` commits.