---
title: Git workflow
tags:
  - git
  - usage
  - helpful
---
# Squash commit

>[!info]
>Purpose: Combine N commit into one, and make it for new message

Reference resource

- [Git squash rebase - Vietnamese](https://manhpt.com/2019/06/15/git-workflow-lam-the-nao-de-squash-commit-tai-local/)
- [StackOverFlow - How do I squash my last N commits together?](https://stackoverflow.com/questions/5189560/how-do-i-squash-my-last-n-commits-together)

Method 1: `rebase` with `-i` flag

```bash
git rebase -i <hash-id-you-want-to-squash>
```

>[!important]
>Change the secondary commit from `pick` to `squash`, save and continue for set new message for commit

![[Pasted image 20240513095544.png|center]]

![[Pasted image 20240513095617.png|center]]

![[Pasted image 20240513095700.png|center]]

Method 2: `reset` with `--soft` flag

```bash
git reset --soft <hash-id-you-want-to-squash
```

![[Pasted image 20240513095821.png|center]]

```bash
git commit -m "New message represent for twice or N commit"
```

![[Pasted image 20240513100055.png|center]]

# Delete branch

Follow the article to understand how we can remove the branch in local and remote, use `-d` flag at: [Git Delete Remote Branch – How to Remove a Remote Branch in Git](https://www.freecodecamp.org/news/git-delete-remote-branch/)

For locally, just use `-d` with command `git branch`

```bash
# e.g: you want to delete release-v1 branch
git branch -D release-v1 # For delete branch
git branch -d release-v1 # For fully merged branch
```

For remote, use `-d` with command push

```bash
# e.g: you want to delete release-v1 branch, but not locally, but remotely
git push origin -d release-v1
```

# Change commit contents

You can change author for commit with flag `--author` with commit command

```bash
git commit --amend --author="Author Name <email@address.com>" --no-edit
```

And you can take it with new message with flag `--message` or `-m` with commit amend

```bash
git commit --amend --message "Hello_world"
```