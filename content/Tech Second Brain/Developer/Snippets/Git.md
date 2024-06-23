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

![[Pasted image 20240513095544.png]]

![[Pasted image 20240513095617.png]]
![[Pasted image 20240513095700.png]]

Method 2: `reset` with `--soft` flag

```bash
git reset --soft <hash-id-you-want-to-squash
```

![[Pasted image 20240513095821.png]]

```bash
git commit -m "New message represent for twice or N commit"
```

![[Pasted image 20240513100055.png]]
