---
title: Troubleshoot Linux Problems
tags:
  - troubleshoot
  - linux
  - helpful
  - cheatsheet
---
# Error when package code needs to be installed, but I can't find an archive for it

Link for resolve: [Reddit](https://www.reddit.com/r/pop_os/comments/s6l82d/trying_to_up_date_the_system_but_keep_getting/)

If you package problem, for example (`Code`). You need to perform these command

```bash
# Location the error or missing package
sudo apt policy code

# Reinstall or purge your package cause error
sudo dpkg --remove --force-remove-reinstreq code
sudo apt purge code --autoremove
sudo apt install --fix-broken
sudo apt update
```