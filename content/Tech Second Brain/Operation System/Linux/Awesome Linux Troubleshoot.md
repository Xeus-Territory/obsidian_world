---
title: Awesome Linux Troubleshooting
tags:
  - troubleshoot
  - linux
  - helpful
  - cheatsheet
---

![[thumbnail-linux-troubleshoot-tools.png]]

# VirtualBox Error in Ubuntu

## Error when setup virtualbox in Ubuntu

>[!info]
>That issue come from when you install the `virtualbox` in OS with enable secure boot in the `BIOS`, usually come from individual machine, I thinks. Mostly you install `virtualbox` from `apt`, it will not applied when your machine meet that problem. Can explain more 😅

You can find the solution for secure boot at

- [I can't execute command modprobe vboxdrv](https://stackoverflow.com/questions/38437264/i-cant-execute-command-modprobe-vboxdrv)
- [Could not load 'vboxdrv' after upgrade to Ubuntu 16.04 (and I want to keep secure boot)](https://askubuntu.com/questions/760671/could-not-load-vboxdrv-after-upgrade-to-ubuntu-16-04-and-i-want-to-keep-secur)

>[!quote]
>That is tough think for new start, I know but you have 2 way to resolve the problem, i dunno make sure you follow what but, this is the same between them but one side is manually generate and other use `deb` with include that step. Follow if you solve the problem

### First method: Manually generate MOK

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

### Second method: Automatically generate MOK

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

## VMSetError: VirtualBox can't enable the AMD-V extension

Following these discussions

- [StackOverFlow - AMD-V is being used by another hypervisor. (VERR_SVM_IN_USE)](https://askubuntu.com/questions/403591/amd-v-is-being-used-by-another-hypervisor-verr-svm-in-use)
- [VirtualBox - VMSetError: VirtualBox can't enable the AMD-V extension](https://forums.virtualbox.org/viewtopic.php?t=107117)

It let me know about this error is coming from the conflict between VirtualBox and KVM module in Kernel. To fixing it, you need to remove that conflict from kernel via `rmmod` command or `modprobe` command

```bash
# remove virtualbox (optional)
sudo rmmod vboxdrv
sudo rmmod vboxnetflt

#remove kvm (obligatory) - Fixed
sudo rmmod kvm
sudo rmmod kvm_amd
```

After applying this change, you can use Virtualbox with Vagrant for setup a new virtual machine. But after reboot, it can load into your kernel one again and you can fix it with 100% by adding blacklist into your `grub`, explore more at [StackOverFlow - How to blacklist kernel modules?](https://askubuntu.com/questions/110341/how-to-blacklist-kernel-modules)
# Setup Environment Variables

## Set and use environment variables from `.env` file

>[!info]
>Read more about topic at
>-  [StackOverFlow - Set environment variables from file of key/value pairs](https://stackoverflow.com/questions/19331497/set-environment-variables-from-file-of-key-value-pairs)
>- [FreeCodeCamp - How to Set an Environment Variable in Linux](https://www.freecodecamp.org/news/how-to-set-an-environment-variable-in-linux/)

Use export with except `#` line in `.env` file

```bash
export $(grep -v '^#' .env | xargs)
```

When you want to work with script, you can use `-o allexport`

```bash
# Multiple line
set -o allexport
source dot/env/file
set +o allexport

# One line
set -o allexport && source dot/env/file && set +o allexport
```

In some case, you wanna disable a environment in current shell, so you can

```bash
unset ENVIRONMENT_VARIABLE
```

## Setup Global environment for multiple users

Following the [StackOverFlow - Setting global environment variable for everyone](https://askubuntu.com/questions/261760/setting-global-environment-variable-for-everyone), you can have possibility to setup the environment in global mode and anyone who inherit will have fully access this environment variables

For example, I want to update my PATH for all use in system, so you need login to root for easier make a change with `/etc/environment`

```bash
# Go to sudo
sudo -i

# Make a change with nano or vim
nano /etc/environent

# e.g: Add a new path /usr/local/nvidia/tooklit
## export PATH="/usr/bin/:/usr/local/bin:/usr/local/nvidia/toolkit"
```

Save it file and make login again with another user, you will see your PATH is already update new route, you can use `source` to apply change for this file in current

>[!warning]
>But it will change for users not for root, so it means you root need to define into `.profile` file or `.bashrc` or `.zshrc` to apply the variables

For more enhancement, you can consider to modify with new script in `/etc/profile.d` where we can store script and trigger for all user who login into shell. Read more at:

- [StackExchange - Setting variable in /etc/environment has no effect](https://superuser.com/questions/1308298/setting-variable-in-etc-environment-has-no-effect)
- [Ubuntu Community - System-wide environment variables](https://help.ubuntu.com/community/EnvironmentVariables#System-wide_environment_variables)
# Ubuntu version and Patch Linux/Kernel Package

## Upgrade Ubuntu Version

You can use integration tool inside `ubuntu` to update new version, that will pull and update packages inside host, do that easily with command

```bash
# Check the linux version
lsb_release -a

# Use command to update new version ubuntu
# You should update all package before try this command
# sudo apt update
# sudo apt upgrade -y # Upgrade major package
# sudo apt dist-upgrade -y # Upgrade distribute package
do-release-upgrade
```

>[!warning]
>In this situation you update `ubuntu`, it will update your kernel so please remember make a big-changes can gain different harden to control, so do know before you doing

## Upgrade your kernel

Follow some methodology to upgrade new version of kernel, such as

- [How to Update Linux Kernel In Ubuntu](https://phoenixnap.com/kb/how-to-update-kernel-ubuntu)
- [Cập nhật Linux Kernel trên Ubuntu 20.04](https://thuanbui.me/cap-nhat-linux-kernel-tren-ubuntu-20-04/) (Vietnamese)
- [How to Update/Upgrade Linux Kernel in Ubuntu](https://www.dedicatedcore.com/blog/update-linux-kernel-ubuntu/)
- [Ubuntu Linux Upgrade Linux Kernel Command](https://www.cyberciti.biz/faq/howto-upgrading-the-ubuntu-linux-kernel/)

Depend on those articles, you can update `kernel` of Ubuntu via

- Update OS version (e.g. 20.04 --> 22.04)
- Update package of OS dependencies
- Manually Update

When you choose manually update, you can use some following tools

- [Mainline](https://github.com/bkw777/mainline)
- [ubuntu-mainline-kernel.sh](https://github.com/pimlie/ubuntu-mainline-kernel.sh)
- Directly download use `curl` or `wget` and installing from [pkgs.org](https://pkgs.org/)

If you see this one from via `kubewekend` series, I prefer to use update Ubuntu version or use secondly optional via `apt` like

```bash
# check your kernel version, via uname
uname -r

# find the supportive from apt repositories, via apt search
sudo apt search linux-image

# figure out the compatible version, if you come from kubewekend you can use version 5.15.0-116-generic, so we install via
sudo apt install linux-virtual-hwe-20.04 -y

# Reboot to receive the new update
sudo reboot # OR use sudo shutdown -r now
```

![[Pasted image 20240724103806.png]]
## Error when install package but you can't

Link for resolve: [Reddit](https://www.reddit.com/r/pop_os/comments/s6l82d/trying_to_up_date_the_system_but_keep_getting/)

If you package problem, for example (`Code`). You need to perform these commands

```bash
# Location the error or missing package
sudo apt policy code

# Reinstall or purge your package cause error
sudo dpkg --remove --force-remove-reinstreq code
sudo apt purge code --autoremove
sudo apt install --fix-broken
sudo apt update
```

##  `libssl` error in Ubuntu 22.04

>[!info]
>Ubuntu 22.04 has upgraded libssl to 3 and does not propose libssl1.1, so when you install packages that meet the problems, with me when setup `Azure agent`, read at [[Awesome Azure Pipelines#The SSL connection could not be established, and No usable version of libssl was found|The SSL connection could not be established, and No usable version of libssl was found]]. But when you need to revert some other version problem will mess up, you can follow this one and reboot your machine to applied compatible version of `libssl`

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

## Update alternative version

>[!quote]
>When you have multiple version of tools, package or moreover, like `python` `java jdk` `shell`, you need to switch between of them  that why you need the topic

For change and update the configuration between different of tools, `debian` core offer us the command call `update-alternatives`. Let digest to its

You can find the manual of the command with `--help` flag

```bash
$ update-alternatives --help
Usage: update-alternatives [<option> ...] <command>

Commands:
  --install <link> <name> <path> <priority>
    [--slave <link> <name> <path>] ...
                           add a group of alternatives to the system.
  --remove <name> <path>   remove <path> from the <name> group alternative.
  --remove-all <name>      remove <name> group from the alternatives system.
  --auto <name>            switch the master link <name> to automatic mode.
  --display <name>         display information about the <name> group.
  --query <name>           machine parseable version of --display <name>.
  --list <name>            display all targets of the <name> group.
  --get-selections         list master alternative names and their status.
  --set-selections         read alternative status from standard input.
  --config <name>          show alternatives for the <name> group and ask the
                           user to select which one to use.
  --set <name> <path>      set <path> as alternative for <name>.
  --all                    call --config on all alternatives.

<link> is the symlink pointing to /etc/alternatives/<name>.
  (e.g. /usr/bin/pager)
<name> is the master name for this link group.
  (e.g. pager)
<path> is the location of one of the alternative target files.
  (e.g. /usr/bin/less)
<priority> is an integer; options with higher numbers have higher priority in
  automatic mode.

Options:
  --altdir <directory>     change the alternatives directory
                             (default is /etc/alternatives).
  --admindir <directory>   change the administrative directory
                             (default is /var/lib/dpkg/alternatives).
  --instdir <directory>    change the installation directory.
  --root <directory>       change the filesystem root directory.
  --log <file>             change the log file.
  --force                  allow replacing files with alternative links.
  --skip-auto              skip prompt for alternatives correctly configured
                           in automatic mode (relevant for --config only)
  --quiet                  quiet operation, minimal output.
  --verbose                verbose operation, more output.
  --debug                  debug output, way more output.
  --help                   show this help message.
  --version                show the version.
```

When you want to take a look how the version we have, such as `java` you can call with `--list` flag and name, example

```bash
$ update-alternatives --list java
/usr/lib/jvm/java-11-openjdk-amd64/bin/java
/usr/lib/jvm/java-18-openjdk-amd64/bin/java
```

And  when you have decision, on my situation `java` on my machine on `11` but I want to switch to `18`, you can perform this command

```bash
# Check version java
$ java --version
openjdk 11.0.22 2024-01-16
OpenJDK Runtime Environment (build 11.0.22+7-post-Ubuntu-0ubuntu222.04.1)
OpenJDK 64-Bit Server VM (build 11.0.22+7-post-Ubuntu-0ubuntu222.04.1, mixed mode, sharing)

# Change version to 18
$ sudo update-alternatives --config java
There are 2 choices for the alternative java (providing /usr/bin/java).

  Selection    Path                                         Priority   Status
------------------------------------------------------------
  0            /usr/lib/jvm/java-18-openjdk-amd64/bin/java   1811      auto mode
* 1            /usr/lib/jvm/java-11-openjdk-amd64/bin/java   1111      manual mode
  2            /usr/lib/jvm/java-18-openjdk-amd64/bin/java   1811      manual mode

Press <enter> to keep the current choice[*], or type selection number: 0
update-alternatives: using /usr/lib/jvm/java-18-openjdk-amd64/bin/java to provide /usr/bin/java (java) in auto mode

# Check the version java again
$ java --version
openjdk 18.0.2-ea 2022-07-19
OpenJDK Runtime Environment (build 18.0.2-ea+9-Ubuntu-222.04)
OpenJDK 64-Bit Server VM (build 18.0.2-ea+9-Ubuntu-222.04, mixed mode, sharing)
```

Relate documentation

- [Switch between multiple java versions](https://askubuntu.com/questions/740757/switch-between-multiple-java-versions)
- [What exactly does `update-alternatives` do?](https://askubuntu.com/questions/233190/what-exactly-does-update-alternatives-do)
- [The update-alternatives Command in Linux](https://www.baeldung.com/linux/update-alternatives-command)

##  `SSH` problems

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
# Comment note in Shell Bash

>[!info]
>2 ways for writing the comment to shell bash.
>
>Example and troubleshooting via  [Link to details](https://ioflood.com/blog/bash-comment/)

## Using the `#` character for comment

>[!info]
>In Bash, a comment starts with the hash symbol (#). Anything after # on that line is considered a comment and is ignored by the Bash interpreter

```bash
# This is a comment in Bash

# Output:
# (No output, as comments are not executed)
```

## Using the doctype `Here Document` for comment multiple line

>[!info]
>Bash doesn’t have a specific syntax for multi-line comments like some other languages, but you can use a trick with the : command and a ‘here document’ to achieve the same effect.

```bash
: << 'END_COMMENT'
This is a
multi-line comment
in Bash
END_COMMENT

# Output:
# (No output, as comments are not executed)
```

# Reconfiguration for curl template output

>[!note]
>**Reference: [Timing Page Responses With Curl](https://www.hashbangcode.com/article/timing-page-responses-curl)**
## Templates format to output via `curl` command

```bash title="curl-formatter.txt"
time_namelookup:  %{time_namelookup}s\n
time_connect:  %{time_connect}s\n
time_appconnect:  %{time_appconnect}s\n
time_pretransfer:  %{time_pretransfer}s\n
time_redirect:  %{time_redirect}s\n
time_starttransfer:  %{time_starttransfer}s\n
				 ----------\n
	  time_total:  %{time_total}s\n
```

*To reference the documentation for the time based variables is as follows.*

- **time_appconnect** - The time, in seconds, it took from the start until the SSL/SSH/etc connect/handshake to the remote host was completed.
- **time_connect** - The time, in seconds, it took from the start until the TCP connect to the remote host (or proxy) was completed.
- **time_namelookup** - The time, in seconds, it took from the start until the name resolving was completed.
- **time_pretransfer** - The time, in seconds, it took from the start until the file transfer was just about to begin. This includes all pre-transfer commands and negotiations that are specific to the particular protocol(s) involved.
- **time_redirect** - The time, in seconds, it took for all redirection steps including name lookup, connect, pretransfer and transfer before the final transaction was started. time_redirect shows the complete execution time for multiple redirections.
- **time_starttransfer** - The time, in seconds, it took from the start until the first byte was just about to be transferred. This includes time_pretransfer and also the time the server needed to calculate the result.
- **time_total** -  The total time, in seconds, that the full operation lasted.

## How to use

Find the PATH which including the `curl-formatter.txt` file with `cd` or `pwd`, Use this with `curl` command

```bash
curl -w "@<file-formatter-above>" -o /dev/null -sL <url>
```

![[Pasted image 20240218140458.png]]

# Redirect Output and Error

>[!note]
>Reference ▶️ ▶️ ▶️  [How to Redirect Output and Error to /dev/null in Linux](https://linuxhandbook.com/redirect-dev-null/)
## Some thing about the output of linux

- In the linux machine,  `/dev/null` that will location where you can return null for your shell like `command 2>&1 /dev/null`
- There will have 3 three type of output which linux has
	- Standard input (stdin) is designated with 0
	- Standard output (stdout) is designated with 1
	- Standard error (stderr) is designated with 2
## Redirect output to /dev/null in Linux
   
*For example*: You run `apt install curl` but you want your shell not return anything you can redirect `output` into `/dev/null`. It will be like 

```bash
sudo apt install curl 1>/dev/null
```

![[Drawing 2024-02-18 14.22.10.excalidraw.png]]

*Usage: Used it when you don't want `stdout` go to your shell, just removing the odd things and keep the important output*
## Redirect error to /dev/null in Linux
   
*For example*: You run `find /` but you run with non root, so somecase you will have some permission error output to your shell. You can use `/dev/null` for removing this messing stuff

```bash
find / 2> /dev/null
```

![[Pasted image 20240218143855.png]]

## Combine `stdout` and `stderror` into one with this character `&`
   
```bash
1. Long version
find / 2> /dev/null 1>/dev/null

2. Short version
find / 2>&1 /dev/null (Send error to output and send them to /dev/null)

3. Some other case
find / > /dev/null 2>&1
```

>[!attention] Sometime you can use version `2` of combining
>	
>The `2>&1` part means "redirect the error stream into the output stream", so when you redirect the output stream, error stream gets redirected as well. Even if your program writes to `stderr` now, that output would be discarded as well. ([Sergey Kalinichenko](https://stackoverflow.com/users/335858/sergey-kalinichenko))

**Find this problem ▶️ ▶️  [What is /dev/null 2>&1?](https://stackoverflow.com/questions/10508843/what-is-dev-null-21)**

# User Management in Linux

>[!info]
>With User and Group configuration in Linux become potential to managing, and enhance your security, user connection and moreover. Following some situation to keep some command that be useful for us when manipulate this stuff inside Linux

Some articles can be good for us when practicing with those stuff around

- [Ubuntu Doc - User management](https://ubuntu.com/server/docs/user-management)
- [User Management in Linux](https://phoenixnap.com/kb/user-management-linux)
- [How to Manage Users in Linux](https://www.freecodecamp.org/news/how-to-manage-users-in-linux/)
- [Introduction to usermod command](https://www.golinuxcloud.com/usermod-command-in-linux/)
## Change Password

If you want to change password of current user, you can use command

```bash
# For Current User
passwd

# For Root User
sudo passwd

# For another user
passwd <username>
```

## Add and Delete user

In this situation, you have multiple command to handle it, such as `adduser`, `useradd`, `deluser` and `userdel`. With the graduation introduce by Ubuntu Doc, I will choose `adduser` and `deluser` to handle this case

```bash
# Add user with no need handle much
sudo adduser username

# Del user with no need erase through multiple steps
sudo deluser username
```

## Add and Delete user out of group

There is many way to handle this work, but I prefer to use it with `usermod` command

```bash
# Add user to group
sudo usermod -aG group username

# Remove user out group
sudo usermod -rG group username
```

## Helpful `usermod` command

Change your user with new name, but you need do it on another user with kill that shell, because if you access to your old account, I will be attached by process

```bash
sudo usermod -l old_name new_name
```

Change the shell of user, you can switch to user to use `chsh` but this can be done remotely

```bash
sudo usermod --shell /path/to/shell username
```

Move the content of user's home directory using `usermod` command

```bash
sudo usermod -d new_dir_path -m user_name
```

# Run Background Command

>[!info]
>In some situation, when you want to multitasking on your shell but the task become sophisticated and should run in longtime for initiating or deleting somethings, you should move that into background and run to complete, you can use couple of tools and utilities of Linux to handle this, such as `Ampersand (&)`, `screen`, `tmux`, ...

You can double-check some articles to gather more information

- [Phoenixnap - How to Run Linux Commands in Background](https://phoenixnap.com/kb/linux-run-command-background)
- [GitHub - tmux shortcuts & cheatsheet](https://gist.github.com/MohamedAlaa/2961058)
- [GitHub - how-to-tmux-background-process.md](https://gist.github.com/davydany/d33f4b5e19eab6b805b045b91d3cf858)
- [How to Use Linux's screen Command](https://www.howtogeek.com/662422/how-to-use-linuxs-screen-command/)

## Use Ampersand (&)

This is one of utilities already integrating inside your linux, you just playground with `&` with your command

```bash
# Run command in background
[command] &

# e.g
ping -4 google.com &
```

This will move this command into background and run to successful, you can check that via `jobs` command

```bash
# List all jobs background in your host
jobs
```

You can use `fg` for turn back command from background to current your shell

```bash
# Back with command
fg %<command> # e.g fg %nano

# Back with PID
fg <pid>
```

If you wanna suspend command, you can just hotkey `ctrl + z` to move process running into background and if you wanna run again in background, you can use `bg` command

## Use `screen`

This one is one kind of popular method, you can use `screen` command to help you move the command into screen and you can control and manipulate multitask in multiple screen.

To install `screen`, you can use

```bash
sudo apt install screen -y
```

Now use `screen` to move your shell into `screen` mode

```bash
screen
```

Now, you can operate that one, try run long command such as `ping` and run hotkey `ctrl+a d` to attach this session

List all screen, you can use

```bash
screen -ls
```

To turn screen again, you can use with id of screen output from `ls` option or use name of shell

```bash
# Return by id
screen -r 2429028

# If you set your screen name like, e.g screen -S curl-command
# Return by name
screen -r curl-command
```

## Use `tmux`

If I have talk about background process, most of my friend will relate `tmux` and I know many `linux` user use `tmux` every single day, so why not learn a bit about that one

For `tmux` installation, you can use

```bash
sudo apt install tmux -y
```

Now run `tmux` command for executing new session

```bash
tmux
```

You are in `tmux`, so try to run `ping` or `curl` command in longtime and you can use hotkey `ctrl+b d` for detaching your session into background

Now if you wanna turn your `tmux` again, you can use `tmux` with attach option

```bash
tmux a # or tmux attach
```

For more specific, you can add name for new session and turn it back with the name for more distinguish between multitasking

```bash
# specific name
tmux new -s tmux-first

# turn it back with name
tmux attach -t tmux-first
```

For list `tmux`  session, you can use

```bash
tmux ls
```

Some cool functionality of `tmux` with hotkey, including

- **Create a new tab:** `[CTRL]+[b], [c]`
- **Switch to tab number:** `[CTRL]+[b], <number>`
- **Enable Scrolling up / Page up:** `[CTRL]+[b], [`
- **Vertical Split**: `[CTRL]+[b], %`
- **Horizontal Split**: `[CTRL]+[b], "`
- **Kill tab**: `[CTRL]+[b], x`

# Networking with Linux

Find more the couple of articles below for troubleshooting Linux Networking

- [Medium - How To Evaluate the Network Performance of a Linux System](https://medium.com/devops-dev/how-to-evaluate-the-network-performance-of-a-linux-system-69db89cae0ed)
- [Ubuntu - Networking](https://documentation.ubuntu.com/server/explanation/networking/)
- [Netplan - YAML Configuration](https://netplan.readthedocs.io/en/stable/netplan-yaml/)
- [How to Disable IPv6 on Ubuntu Linux](https://itsfoss.com/disable-ipv6-ubuntu-linux/)

## Network Lost in Gaming Mainboard

![[Pasted image 20250728113557.png]]

This network is probably weird than any I ever intercept, this comes from feature/bug of Gaming mother board when used it as Linux Machine, e.g: Ubuntu, LinuxMint or Arch. Explore more at

- [LinuxMint - (SOLVED) Internet randomly disconnects: PCIe link lost](https://forums.linuxmint.com/viewtopic.php?t=416924)
- [Arch - (SOLVED) Network connection dies randomly](https://bbs.archlinux.org/viewtopic.php?id=288371)
- [Reddit - Network card (Intel Ethernet Controller I225-V, igc) keeps dropping after 1 hour on linux - solved with kernel param](https://www.reddit.com/r/buildapc/comments/xypn1m/network_card_intel_ethernet_controller_i225v_igc/)

Following Reddit Thread, This issue come from `i255` network device and it's really tough things which I don't wonder to touch anytime but it occur frequently in machine, especially with high workload, it's truly disturb and nightmare. So these articles and discussion come from by solution to exchange `kernel` params

In particular, we need to *"**disable power management on the PCIe** entirely with `pcie_port_pm=off`. In the file `/etc/default/grub`, line` GRUB_CMDLINE_LINUX_DEFAULT` we can add `pcie_port_pm=off` and then run `update-grub` to rebuild the boot config"*

# About disk, partition, storage and volume in Linux

>[!note]
>This implement show us how you can workaround with your storage, disk and partition inside Linux. Learn and leverage these techniques for building a success

![[meme-linux-disk.png|center]]

Before you go into partition (advantaged), you can view another functionality with disk in another my example

- [[Awesome Azure Cloud#Add a new disk for your `linux` virtual machine|Add a new disk for your `linux` virtual machine]]
- [[Kubewekend Session 6#Prerequisites|Ceph prerequisites with addition disk]]
## Mount and Unmount Disk in Linux

- [Devconnected - How To Mount and Unmount Drives on Linux](https://devconnected.com/how-to-mount-and-unmount-drives-on-linux/)
- [Networkwolrd - Linux commands for managing, partitioning, troubleshooting](https://www.networkworld.com/article/964235/linux-commands-for-managing-partitioning-troubleshooting.html)
- [Internet - How to Change Permissions on Mounted Drive in Linux](https://linuxsimply.com/linux-change-permissions-on-mounted-drive/)
- [Askubuntu - How to merge partitions?](https://askubuntu.com/questions/66000/how-to-merge-partitions)

To mount disk into your host, you should have `sudo` permission for handling that task

First of all, check the disk in your host via

```bash
lsblk -f
```

If you see your disk inject into your host, like `nvme0n2` for example, you should check this disk format or not, if does, you should format this one

For partition the disk when you attach a new one, you can follow instruction about [Create a Partition in Linux - A Step-by-Step Guide](https://www.digitalocean.com/community/tutorials/create-a-partition-in-linux), [Prepare a new empty disk](https://learn.microsoft.com/en-us/azure/virtual-machines/linux/attach-disk-portal#prepare-a-new-empty-disk),  [How to Format Disk Partitions in Linux](https://phoenixnap.com/kb/linux-format-disk) to understand way to handle that

```bash
sudo mkfs -t ext4 /dev/nvme0n2
```

If you wanna file system format, you can double-check at [File System Comparison: NTFS, FAT32, exFAT, and EXT, Which File System Should I Use](https://www.easeus.com/diskmanager/file-system.html)

|                 |                         |                                                        |                                             |
| --------------- | ----------------------- | ------------------------------------------------------ | ------------------------------------------- |
| **File System** | **Supported File Size** | **Compatibility**                                      | **Ideal Usage**                             |
| **FAT32**       | up to 4 GB              | Windows, Mac, Linux                                    | For maximum compatibility                   |
| **NTFS**        | 16 EiB – 1 KB           | Windows, Mac (read-only), most Linux distributions     | For internal drives and Windows system file |
| **Ext4**        | 16 GiB – 16 TiB         | Windows, Mac, Linux (requires extra drivers to access) | For files larger than 4 GB<br>              |
Double check again with command

```bash
lsblk -f
```

Mount your partition disk into the directories of machine via `mount`

```bash
sudo mount /dev/nvme0n2 /path/to/mount
```

Check your disk is add to `/etc/fstab`, you can use `blkid` to handle that

```bash
sudo blkid
```

After that you can be make some mistake but if you want grant permission, you can continue for your progress in down below

```bash
# Change ownership of your drive
sudo chown <your-username> /dev/nvme0n2

# Change mount write permission
# NOTE: Umount before to do
sudo umount /dev/nvme0n2
sudo mount -o /dev/nvme0n2 /my-drive-locate

# Change permission of your file inside to user
sudo chown -R <user>:<group> /my-drive-locate
```

If you want `unmount` your disk, you can follow

```bash
sudo umount /dev/nvme0n2
```

## Create a new partition

You can follow the article "[PhoenixNAP - How to Create Partitions in Linux](https://phoenixnap.com/kb/linux-create-partition)" to create a new partition on your disk. While multiple command-line tools are available for managing partitions, `fdisk` and `parted` are two popular options to consider.

>[!warning]
>To practice **disk partitioning**, you should always use a **brand new volume** or a disk that is **not currently in use and has no existing partitions**. Experimenting on your **boot disk** is extremely risky. You cannot partition or shrink a disk that is actively in use, which is why a fresh or unallocated disk is essential.

I prefer to use `fdisk` with good interaction and transparent what are you doing with your disk

First of all, you can check your disk attached on your machine via command

```bash
# Check your disk, partion and mountpoint
lsblk -f # View full your disk existing in your host (file-system)
lsblk -o NAME,HCTL,SIZE,MOUNTPOINT # expose less information

# Check with the fdisk also return good quality
fdisk -l # List all information about disk,partion
fdisk -x # see more information
```

Next, you can understand what target to part into small piece, you can use `fdisk` to playground with your disk

```bash
# e.g your disk is /dev/sdb for example
fdisk /dev/sdb
```

Now you will be loaded into new command shell, and inhere you can use `m` to view help

![[Pasted image 20250609145227.png|center]]

So we focus to use `n` to help us create a new partition for your disk

![[Pasted image 20250609145857.png|center]]

You can choose `p` to create a primary partition. When prompted, select a partition number (typically from 1 to 4, though it can extend up to 128 depending on the partitioning scheme). Then, define the first and last sectors, specifying the size in units like kilobytes (KB), megabytes (MB), gigabytes (GB), ...

![[Pasted image 20250609150408.png|center]]

Validate your partition before confirm to write it into the partition by `p`

![[Pasted image 20250609150555.png|center]]

Now confirm it with `w` to confirm your partition table and you can confirm your disk will contain a new partition, e.g: `/dev/sdb1`

![[Pasted image 20250609150804.png|center]]

Now you can format your disk and use this as usual to used. Explore more at above: [[Awesome Linux Troubleshoot#Mount and Unmount Disk in Linux|Mount and Unmount Disk in Linux]]

## Delete a partition

Similar to creating partitions, you also have the option to delete them using `fdisk`. You can find more details in the article "[PhoenixNAP - How to Delete Partition in Linux](https://phoenixnap.com/kb/delete-partition-linux)." While `fdisk` allows you to modify (e.g., delete) partitions on your disk, it is strongly recommended that you **unmount (`umount`)** any mounted filesystems and **turn off any swap space (`swapoff`)** on that disk _before_ using `fdisk` to avoid data corruption or loss.

```bash
# e.g: your disk is /dev/sdb
fdisk /dev/sdb
```

Now you are into `fdisk` shell and you can choose `d` option to remove your partition, if you have multiple partition in your disk, it will ask you remove what partition and if not it will remove your only partition in your disk

![[Pasted image 20250609151804.png|center]]

If you decide overwrite and complete after view partition table, you can confirm that with `w` option

![[Pasted image 20250609151927.png]]

>[!warning]
>If you disk are still using as your mounting, your partition will work on next reboot, it means your partition still there

Now you can view your attach volume with `lsblk -f` command and you can see your partition will disappear

## Resize or extend the partition 


>[!question]
>If you encounter an "out of volume" error for your `/` (root) directory, but have ample unused space on your volume system, you can try extending your current partition. Here are some instructions you can review to handle this configuration.

Explore more information with these articles

- [Medium - How to Resize AWS EBS Volume (NVMe) and Extend Linux Partitions](https://fanio-martin.medium.com/how-to-resize-aws-ebs-volume-nvme-and-extend-linux-partitions-36d610650b38)
- [AWS Docs - Extend the file system after resizing an Amazon EBS volume](https://docs.aws.amazon.com/ebs/latest/userguide/recognize-expanded-volume-linux.html)
- [Redhat - What is growpart utility and how to use it ?](https://access.redhat.com/solutions/5540131)
- [Alibaba - Extend the partitions and file systems of disks on a Linux instance](https://www.alibabacloud.com/help/en/ecs/user-guide/extend-the-partitions-and-file-systems-of-disks-on-a-linux-instance)
- [Unix & Linux - How do I resize partitions and filesystems on them?](https://unix.stackexchange.com/questions/169395/how-do-i-resize-partitions-and-filesystems-on-them)
- [TectMint  - 8 Parted Commands to Manage Disk Partitions in Linux](https://www.tecmint.com/parted-command-create-linux-partitions/)

For example, I have disk 10GB and use only first partition 2GB but currently my partition is out of space but we have second partition contain 8GB not use for any tasks. That's why I should extend first partition with second partition to resolve about out of space

![[Pasted image 20250609153519.png]]

Now you need to extend your `sdb1` with `sdb2` with few steps. For resizing task, you can choose `growpart`, `resize2fs` for tools able handle configuration.

>[!info]
>If your disk is free space but format by `ext4`, you can't extend your partition because current your disk is used all and not able to modify. Why ? `growpart` is for maximal, contiguous extension. It will use all available free space. But if you want to advantage, you should use `parted` command for instead

```bash
growpart /dev/sdb 1
```

>[!warning]
>Remembering you need to aware about space between your directory `/dev/sdb` and number partition for example `sdb 1` to let you extend your partition

![[Pasted image 20250609154930.png]]

That's why you should remove the `sdb2` partition to collect free space for `sdb1` partition with `fdisk` and now you can use `growpart` to extend free space

```bash
growpart /dev/sdb 1
```

![[Pasted image 20250609155627.png]]

Now you can double-check with `lsblk` to see how your modification

![[Pasted image 20250609160012.png]]
>[!info]
>You can see the your partition is extend to 10GB but current your file-system is still used 1.7GB, so you need one step with `resize2fs` for confirm your resizing

```bash
resize2fs /dev/sdb1
```

Now you can use `lsblk -f` of `df -hT` and you can see your disk will be formatted

>[!warning]
>For more advantaged, you should learn and practical with [parted](https://www.gnu.org/software/parted/manual/parted.html), it's a command-line of gparted GUI which used for shrinking and workaround with your partition, but remembering you should consider for what you doing before applying anything with these tools. Read more at [TectMint  - 8 Parted Commands to Manage Disk Partitions in Linux](https://www.tecmint.com/parted-command-create-linux-partitions/)

## Resize tmpfs in Linux

>[!question]
>When you meet some problem related `tmpfs`, it is a file system which keeps all of its files in virtual memory, explore more at: [Kernel - Tmpfs](https://docs.kernel.org/filesystems/tmpfs.html). 
>
>So mostly it will use `tmpfs` for `/run` directory and you can `reboot` to free virtual memory, but in some cases, you can't do this operation and it will cause couple annoying

But luckily, I found the techniques for helping us `remount` but not corrupt any data in this location, expand method always good for us. Check it at [Medium - How to resize tmpfs in Linux](https://medium.com/opsops/how-to-resize-tmpfs-in-linux-6fbfbe23b092)

You can use `mount` command with option `remount` to expand the size, it requires `sudo` so you should take this permission

```bash
sudo mount -o remount,size=new_size /path/to/tmpfs

# e.g expand full disk /run (as tmpfs). Check it with df -h 
sudo mount -o remount,size=10G /run
```

It will expand your `/run` immediately, so don't worry corrupt or loss data. If fail, It will pop up the error at mount point

```bash
mount: /run: mount point not mounted or bad option.
       dmesg(1) may have more information after failed mount system call.
```

## Clean Swap memory

With architecture of linux, swap memory submit crucial role for operating stuff inside machine, bring back stability and performance. Explore about swap memory at [Phoenix - Swap Space in Linux: What It Is & How It Works](https://phoenixnap.com/kb/swap-space)

>[!warning]
>The customization into swap memory need to concern before do because you will touch into part with one making decision for performance main system

But you can gently clean that with few commands to help you collect, and get swap memory back to machine. E.g: When you compile java, if you not configure `jvm` with good behavior, It will use a lot memory and swap is one of those.

To prevent that, you can use command below to disable all swap partition, it will help reclaim memory swap being use

```bash
sudo swapoff -a
```

After reclaim, you can turn on it again for reusing to continuous provide swap memory for system

```bash
sudo swapon -a
```

You can explore and figure out more configuration and memory with linux through article

- [Tecmint - How to Clear RAM Memory Cache, Buffer and Swap Space on Linux](https://www.tecmint.com/clear-ram-memory-cache-buffer-and-swap-space-on-linux/)
- [Kernal Doc - Memory Management](https://docs.kernel.org/admin-guide/mm/index.html)