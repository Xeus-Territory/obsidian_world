---
title: Awesome Git workflow
tags:
  - git
  - usage
  - helpful
---

![[icon-git.svg|center|400]]

# Squash commit

>[!info]
>Purpose: Combine N commit into one, and make it for new message

Reference resource

- [Git squash rebase - Vietnamese](https://manhpt.com/2019/06/15/git-workflow-lam-the-nao-de-squash-commit-tai-local/)
- [StackOverFlow - How do I squash my last N commits together?](https://stackoverflow.com/questions/5189560/how-do-i-squash-my-last-n-commits-together)
## Method 1: `rebase` with `-i` flag

```bash
git rebase -i <hash-id-you-want-to-squash>
```

>[!important]
>Change the secondary commit from `pick` to `squash`, save and continue for set new message for commit

![[Pasted image 20240513095544.png|center]]

![[Pasted image 20240513095617.png|center]]

![[Pasted image 20240513095700.png|center]]

## Method 2: `reset` with `--soft` flag

```bash
git reset --soft <hash-id-you-want-to-squash
```

![[Pasted image 20240513095821.png|center]]

```bash
git commit -m "New message represent for twice or N commit"
```

![[Pasted image 20240513100055.png|center]]

# Delete branch

>[!info]
>Follow the article to understand how we can remove the branch in local and remote, use `-d` flag at: [Git Delete Remote Branch – How to Remove a Remote Branch in Git](https://www.freecodecamp.org/news/git-delete-remote-branch/)

## For locally

You can use `-d` with command `git branch`

```bash
# e.g: you want to delete release-v1 branch
git branch -D release-v1 # For delete branch
git branch -d release-v1 # For fully merged branch
```

## For remote

You can use `-d` with command push

```bash
# e.g: you want to delete release-v1 branch, but not locally, but remotely
git push origin -d release-v1
```

# Change commit contents

>[!info]
>When you want make a change inside your commit, `git` give us permission to handle it with `--amend` and option attaching

## Change author of commit

You can change author for commit with flag `--author` with commit command

```bash
git commit --amend --author="Author Name <email@address.com>" --no-edit
```

## Change message

And you can take it with new message with flag `--message` or `-m` with commit amend

```bash
git commit --amend --message "Hello_world"
```

## Skip `pre-commit` rule

To skip commit rule, you can add option `--no-verify` or `-n` to bypass `pre-commit` hook

```bash
git commit --no-verify -m "Hello_world, now I bypass pre-commit"
```
# Tagging commit

>[!info]
>`git` command support us release commit inside some repository platform, such as `github`, `gitlab` through using tagging with commit.

If you want explore more about this topic, here are some articles for you 

- [Atlassian - Git tag](https://www.atlassian.com/git/tutorials/inspecting-a-repository/git-tag)
- [2.6 Git Basics - Tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
- [git-tag Documentation](https://git-scm.com/docs/git-tag)

## Tagging one commit with annotate

When you want tagging in current commit, you can run `tag` with `-a` for annotate and `-m` for message

```bash
# NOTE: Use can asign tag with format v0.0.x or ver0.0.x. But notice about platform for compatible tagging
git tag -a <tag> -m "message if tag"
```

If you want to specific commit, add commit SHA in last command above

```bash
git tag -a 0.0.1 -m "message" 6706483
```

## Rename tagging for old tags

You can read the [question - How do you rename a Git tag?](https://stackoverflow.com/questions/1028649/how-do-you-rename-a-git-tag) to understand how can we handle this case

```bash
git tag new old           # Create a new local tag named `new` from tag `old`.
git tag -d old            # Delete local tag `old`.
git push origin new :old  # Push `new` to your remote named "origin", and delete tag `old` on origin (by pushing an empty tag name to it).
```

![[Pasted image 20240915132426.png]]

## Force edit tagging

If you want to keep same context of tag, but change it to new commit or new message, you can handle it with `-f` option with below command

```bash
# Change new commit
git tag -a -f 0.0.1 <new-commit>

# Change new message
git tag <tag name> <tag name>^{} -f -m "<new message>"
```

## Share tagging (release)

>[!info]
>You can handle share tagging with `push` command through two way

Push with both branch, and tagging

```bash
git push -u origin brach-commig --tags 0.0.1
```

Or you can push only tag to remote

```bash
git push -u origin 0.0.1
```

>[!note]
>Reason why we can, because your `tag` and `branch` will separate, and push same or not, it's does matter

## View Tagging

You can review your tag, content inside or what commit it attaching with through various commands

```bash
# Review your git tag
git tag

# View your git tag with specific expression
git tag -l *-rc*

# View your git tag with colume display
git tag --column <always/column/row/dense/...>

# View detail change in tag
git show tag-name
```

# Set profile for multiple workspace

>[!note]
>Time to time when you stay in the project with configuration to enforce you to commit your code with same of prefix of organization, that why we need to learn set multiple `git` profile for each project

You can double-check couple of documentations before starting

- [Git Doc - git-config](https://git-scm.com/docs/git-config)
- [FreeCodeCamp - How to Use Multiple Git Configs on One Computer](https://www.freecodecamp.org/news/how-to-handle-multiple-git-configurations-in-one-machine/) (Easiest)
- [StackOverFlow - Is it possible to have different Git configuration for different projects?](https://stackoverflow.com/questions/8801729/is-it-possible-to-have-different-git-configuration-for-different-projects)

If you are set git profile to global with both of these command

```bash
git config --global user.name "YOUR_NAME"
git config --global user.gmail "YOUR_GMAIL"
```

you can find your global `git` profile at HOME directory at `~/.gitconfig`. So you should be edit this file by replacing with these configurations

```bash title="~/.gitconfig"
# This will define git should be used personal profile at Personal PATH
[includeIf "gitdir:~/Personal/**"]
  path = ~/.gitconfig-personal

# In another case, git should be used work profile at Work PATH
[includeIf "gitdir:~/Work/**"]
  path = ~/.gitconfig-work
```

If you clarify what need to set for both of profile, you should create two profile in home directory one for personal and one for work

```bash title="~/.gitconfig-personal"
[user]
name = Xeus Nguyen
email = personal_email@gmail.com
```

```bash title="~/.gitconfig-work"
name = Xeus Nguyen
email = work_email@gmail.com
```

Now with each of directory, it will use `git` profile corresponding, you can double check it with command

```bash
git config --list
```