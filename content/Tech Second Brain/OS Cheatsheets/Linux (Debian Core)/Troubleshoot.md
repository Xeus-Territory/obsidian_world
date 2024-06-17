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

# `libssl` error in Ubuntu 22.04

>[!info]
>Ubuntu 22.04 has upgraded libssl to 3 and does not propose libssl1.1, so when you install packages that meet the problems, with me when setup `Azure agent`, read at [[Azure Pipelines Gallery#The SSL connection could not be established, and No usable version of libssl was found|The SSL connection could not be established, and No usable version of libssl was found]]. But when you need to revert some other version problem will mess up, you can follow this one and reboot your machine to applied compatible version of `libssl`

Link issue: [StackOverFlow - MongoDB Install Fails on Ubuntu 22.04 - Depends on libssl1.1 but it is not installable](https://askubuntu.com/questions/1403619/mongodb-install-fails-on-ubuntu-22-04-depends-on-libssl1-1-but-it-is-not-insta)

Package: [libssl1.1_1.1.1f-1ubuntu2_amd64.deb](https://ubuntu.pkgs.org/20.04/ubuntu-main-amd64/libssl1.1_1.1.1f-1ubuntu2_amd64.deb.html)

1. Install via source-list when you import the key

```shell
# Write a source of package into apt, to retrieve the version of package
echo "deb http://security.ubuntu.com/ubuntu focal-security main" | sudo tee /etc/apt/sources.list.d/focal-security.list

sudo apt-get update
sudo apt-get install libssl1.1

# Delete the focal-security list file you just created
sudo rm /etc/apt/sources.list.d/focal-security.list
```

2. Manually installed

```shell
# Retrive the package from ubuntu repositories
wget http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb

# Install the lib debian file which you download
sudo dpkg -i libssl1.1_1.1.1f-1ubuntu2_amd64.deb
```