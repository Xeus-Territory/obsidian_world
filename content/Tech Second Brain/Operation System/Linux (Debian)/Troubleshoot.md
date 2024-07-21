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

# Problem with `ssh`

When you see the situation about your key for authentication a destination host have changing because your action or hacker, from your side you can resolve when exection `ssh` by flushing the old key like

```bash
ssh-keygen -f "/home/user/.ssh/known_hosts" -R "[127.0.0.1]:6996"
```

>[!done]
>It will help you update your known_hosts, and give you permission to authentication remote host with new cred

If you meet situation about, `cannot auth ssh via password`. It means, usually your host will protect your `VM` with no enable `PasswordAuthentication` in `/etc/ssh/sshd_conf`. If you want to enable, you need to perform

```bash
# Change content sshd_config
sudo sed -i 's/#PasswordAuthentication no/PasswordAuthentication yes/' /etc/ssh/sshd_config

# Restart ssh vervice
sudo systemctl restart sshd

# OR
sudo /etc/init.d/ssh force-reload
sudo /etc/init.d/ssh restart
```

# Could not load 'vboxdrv' after upgrade to Ubuntu 16.04 (and I want to keep secure boot)

>[!info]
>That issue come from when you install the `virtualbox` in OS with enable secure boot in the `BIOS`, usually come from individual machine, I thinks. Mostly you install `virtualbox` from `apt`, it will not applied when your machine meet that problem. Can explain more 😅

You can find the solution for secure boot at

- [I can't execute command modprobe vboxdrv](https://stackoverflow.com/questions/38437264/i-cant-execute-command-modprobe-vboxdrv)
- [Could not load 'vboxdrv' after upgrade to Ubuntu 16.04 (and I want to keep secure boot)](https://askubuntu.com/questions/760671/could-not-load-vboxdrv-after-upgrade-to-ubuntu-16-04-and-i-want-to-keep-secur)

>[!quote]
>That is tough think for new start, I know but you have 2 way to resolve the problem, i dunno make sure you follow what but, this is the same between them but one side is manually generate and other use `deb` with include that step. Follow if you solve the problem

**First method**

>[!note]
>Manually generate, and submit `mok` for authentication secure boot, that new for me and cost me time to understand 😄 but that gradually valuable

```bash
# Install the mkutil package to be able to do signed
# Often, your host will include this tool, if not download it
sudo apt update
sudo apt install mokutil -y

# Generate the signature file
openssl req -new -x509 -newkey rsa:2048 -keyout MOK.priv -outform DER -out MOK.der -nodes -days 36500 -subj "/CN=VirtualBox/"

# Add it to the kernal
sudo /usr/src/linux-headers-$(uname -r)/scripts/sign-file sha256 ./MOK.priv ./MOK.der $(modinfo -n vboxdrv)

# Register it for the Secure Boot
# In this step, it will ask you provide the password
# provide it what you want, remember and retype when reboot MOK again
sudo mokutil --import MOK.der

# Do the reboot machine now, with reboot or shutdown command
sudo shutdown -r now # sudo reboot (same actions)
```

![[Pasted image 20240706163413.png]]

When reboot you will see the screen, choose `Enroll MOK` to continue. Answer the step in blue screen `Enroll MOK > Continue > Yes > and it will ask you for the password > reboot`. That will boot you to `ubuntu`. After that to validate it work or not, you can do

```bash
# Check version and problems of virtualbox, if not
# Use are completely resolving the problem
VBoxManage --version

# (Optional) To check MOK key, sign and status, use
sudo mokutil --list-enrolled
```

If not work at all, you need to delete the `MOK key` and will do the another optional

```bash
# Delete the key (On the situation, you continue keep key)\
# basically, you just need delete with key selected
sudo mokutil --delete /your/key/enrolled

# Check the key will add to queue to delete
sudo mokutil --list-delete # exist, it will be okay

# Reboot, and do enroll MOK boot like above
sudo reboot
```

Your work will have different, you can follow `Enroll MOK > Delete > Yes > and it will ask you for the password > reboot` . That all you remove the old key, if you delete or forgot where you put the key, follow this step

```bash
# You will export the key you enrolled
mokutil --export

# Usually, that will have name with syntax, e.g: MOK-xxxx.der
# take a look list-enrolled, map that with the key, for example
# If your key which want delete on location, you will choose
# MOK-0002.der with same command above
sudo mokutil --delete MOK-0002.der
```

**Second method**

>[!note]
>That will simple, but make sure you do same thing above but the `virtualbox` will give you all step and just need prompt your password, remember for re-typing again in MOK

This method will require you install `virtualbox` from official documentation, you can use `wget` , `curl` or you can directly click and install that, [here the link](https://www.virtualbox.org/wiki/Linux_Downloads)

After that, you need install that with `--fix-broken` to help you install dependencies packages with your `deb`

```bash
# For example, I use Ubuntu 24.04. It can be done like this
# You will ask to prompt password in the last step
sudo apt --fix-broken install ./virtualbox-7.0_7.0.18-162988~Ubuntu~noble_amd64.deb -y

# Reboot and do MOK step like above
sudo shutdown -r now
```

>[!done]
>That will help you resolve this case, maybe when you have new version of Ubuntu that can be reason why you had the problems, make sure you control that


