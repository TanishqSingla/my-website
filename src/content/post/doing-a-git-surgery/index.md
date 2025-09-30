---
title: 'Doing a git surgery'
description: 'Extracting files from one git repo to another while preserving history with git format-patch'
publishDate: '2025-09-30'
tags: ['git']
---

## Introduction
Recently I had to perform of what I call a surgery with git. Here's a quick rundown.
At [Monkeys](https://monkeys.com.co) backend we had a bunch of proto files that were stored in an arrangement of nested folders. This wasn't a problem with Go as the package management in go is very simplified since we get to use the URL.
We are following a Microservice architecture at Monkeys so we can scale our services individually. This architecture also allows us the ability to use different tools for different jobs, so Go wasn't going to be our only tool.

So to make it easier for other microservices, the protobuf files needed to be moved from the nested folder structure.

## The Surgery 
At Monkeys I want to make every contribution meaningful, and appreciate the time and effort spent by others.
So this is where the challenge began, I wanted to extract the files without modifying or sacrificing any git commit history related to the file.

![](giphy.gif)

There were a bunch of solutions available, namely reposurgion git-filter-branch/git-filter-repo. But they were third party tools not git commands. 

After browsing for a while I learned about format-branch git command. And turned out this was all I need.

So I quickly created some patch files using
```sh
git format-patch --root -- <file_names>
```

After creating these patch files I moved them to another directory, which will contain the proto files for new repo.

Then I applied the patches using 
```sh
git am <patch_file>
```

However this created the nested folder that the parent branch had. 

![](Pasted image 20250930205431.png)

This was not what I needed. After scrambling for a while and reading patch files, I realised that patch file contains a mail section and a diff.

Big brain moment. 

I could just modify the filename in the patch and apply it. Tested this and boom!

Did a find and replace of in all files in my favorite editor nvim, which only required 2 commands. 

And then I mass applied the patches. The result speaks for itself, [repo](https://github.com/the-monkeys/monkeys_protos.git). Contributors, commits and even commit messages are preserved and in order. 

## Conclusion
This is how you can extract files to another repo with the history preserved. I hope now you can handle things like repo migrations, shoutout to reddit user [u/dalbertom](https://www.reddit.com/user/dalbertom/) for letting me know this awesome command called git format-patch.
