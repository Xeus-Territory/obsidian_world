---
title: Shell command snippet
tags:
  - awesome
  - linux
  - command
  - helpful
  - usage
---
>[!info]
>Place to archive and snapshot the incredible command or pipe command with Linux OS platform such as Debian, Ubuntu, CentOS, ...

# In-house Commands
## `echo` command

Decode string with specify unicode-escaped with `-e` flag, read more at: [StackOverFlow - How to convert \uXXXX unicode to UTF-8 using console tools in *nix](https://stackoverflow.com/questions/8795702/how-to-convert-uxxxx-unicode-to-utf-8-using-console-tools-in-nix)

>[!note]
>You can use `uni2ascii` for instead if you want to integrate with 3rd party

```bash
echo -e "unicode-string"
```

## `journalctl` command

Documentation: [How To Use Journalctl to View and Manipulate Systemd Logs](https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs)

**Capture and logged full events of service**

```bash
journalctl -u service-name.service
```

**To see only log messages for the current boot**

```bash
journalctl -u service-name.service -b
```

**Find your boots in list**

```bash
journalctl --list-boots
```

**See the error log with command**

```bash
journalctl -p err -b 
```

>[!info]
>You can exchange -p option with pram
>- 0: emerg
>- 1: alert
>- 2: crit
>- 3: err
>- 4: warning
>- 5: notice
>- 6: info
>- 7: debug
## `grep` command

Use grep with exclude by `-v` flag

```bash
grep -v "dotnet" .
```

To grep include multiple word

>[!info]
>Use `-i` flag to execute that. Especially add with `\|` symbol between two words. Read more at: [How to Grep for Multiple Strings, Patterns or Words](https://phoenixnap.com/kb/grep-multiple-strings), extending with multiple situations **(HELPFUL)**

```bash
grep -i "Hostname\|Port"
```

## `awk` command

Skip first line Usually header when you use `awk` to print column variables

```bash
awk 'NR>1 {print $3}'
```

Get the last param when seperate by `/` or any symbol, you can use `F` and `$NF` to get the result

```bash
awk -F/ '{print $NF}'
```
## `tree` command

Print the sub-directory of folder with configuration level

```bash
tree -d -L 2 .
```

Print the sub file and folder with filter not include smt with `-I` option. Explore at [StackOverFlow - tree command for multiple includes and excludes](https://unix.stackexchange.com/questions/61074/tree-command-for-multiple-includes-and-excludes)

```bash
# With only
tree -a -L 1 -I .git

# With multiple
tree -a -L 1 -I '.git|.terraform.lock.hcl'
```

Print tree with combine full path, include and exclude pattern

```bash
tree -f -I "bin|unitTest" -P "*.[ch]|*.[ch]pp." your_dir/
```

## `find` command

Find the folder with find base on the regex format

```bash
find . -maxdepth 1 -type d -regex '.*/azp/_work/\d+$'
```

Find directory in current location but expose that in format `ls`

```bash
find . -type d -ls
```

Find the file or directory to provide you last in path of file and directory

```bash
find . -maxdepth 2 -type d | awk -F/ '{print $NF}'
```
## `iptables` command

Learn more about `iptables` commands from links down below

- [Github - iptables cheatsheet](https://gist.github.com/davydany/0ad377f6de3c70056d2bd0f1549e1017)
- [Prompt generate Iptables](https://bashsenpai.com/resources/cheatsheets/iptables)
- [Hacktricks - Suricata & Iptables cheatsheet](https://book.hacktricks.xyz/generic-methodologies-and-resources/basic-forensic-methodology/pcap-inspection/suricata-and-iptables-cheatsheet)
- [How to list all iptables rules with line numbers on Linux](https://www.cyberciti.biz/faq/how-to-list-all-iptables-rules-in-linux/)
- [How can I remove specific rules from iptables?](https://stackoverflow.com/questions/10197405/how-can-i-remove-specific-rules-from-iptables)

Allow only traffic from external IP to host via port

```bash
sudo iptables -A INPUT -s <source> -p <tcp/udp> --dport <destination-port> -j ACCEPT
```

Block all traffic to specify port in host

```bash
sudo iptables -A INPUT -p <tcp/udp> --dport <destination-port> -j DROP
```

List all rule and table rule

```bash
# List all rules
sudo iptables -S

# list all tables rules
sudo iptables -L -v -n | more

# list all rules for INPUT tables
sudo iptables -L INPUT -v -n
```

Delete rule in iptables

```bash
# Basic command to delete
sudo iptables -F

# To specify you want
# Find your rule base on number
iptables -L INPUT --line-numbers
# Remove that base on number of line
iptables -D INPUT <specific-line-number>

# IYKYN, use `-D` flag for same command `-A` to remove that rule
```

## `tr` command

Use `tr` to delete with `-d` flag

```bash
tr -d "HostName:Port" # If find 2 word, seperate with space
tr -d "HostNamePort" # If find 2 word, no space add-on
```

Use `tr` to change space to colon, ` ` --> `:`

```bash
tr -s "[:blank:]" ":"
```

## `ssh` command

Use tunneling mode of `ssh` to reverse shell from remote to your local host

>[!info]
>Command below to port-forward from port `127.0.0.1:8080` from remote host and send the traffic to port `:8080` inside your host

```bash
ssh -N -L 8080:127.0.0.1:8080 -i /path/to/your/private_key <user>@<remote-host> -p <port-ssh> # Default ssh via port 22, use -p if you need to specific
```

## `jq` command

List of articles relate `jq` with helpful solution

- [5 Useful jq Commands to Parse JSON on the CLI](https://www.fabian-kleiser.de/blog/5-useful-jq-commands-parse-json-cli/)
- [zendesk  - jq cheatsheet](https://www.fabian-kleiser.de/blog/5-useful-jq-commands-parse-json-cli/)
- [cheat.sh/jq](https://cheat.sh/jq)
- [jq 1.7 Manual](https://jqlang.github.io/jq/manual/)

You can use `jq` to select multiple variable

```bash
cat app.json | jq -r '.expo | .name, .version' 
```

You can use `jq` to select multiple variable and concat that to one string

```bash
cat app.json | jq -r '(.expo.name + "." + .expo.version)'
```

You can use `jq` with variable to pass through from command or define to your jq

```bash
curl -H "PRIVATE-TOKEN: $PRIVATE_GLAB_TOKEN" "https://gitlab.com/api/v4/users/$GLAB_USER_ID/contributed_projects" | jq --arg REPO_CHECKED_NAME "$REPO_CHECKED_NAME" '.[] | select(.name == $REPO_CHECKED_NAME) | .id'
```

`jq` support for another arg like `json`, you can try to concat object this one with your existence object. Explore more at [Add an object to existing JSON using jq](https://www.petermekhaeil.com/til/jq-append-json/) and [Append JSON Objects using jq](https://stackoverflow.com/questions/51147753/append-json-objects-using-jq)

```bash
cat ~/config-bk.json | jq -r --argjson addon "$(cat ~/.docker/config.json | jq -r ".auths")" '.auths+=$addon'
```

Convert json to string for multiple purpose

```bash
cat file.json | jq -c | jq -R
```

Get first keys in list object with `jq`

```bash
cat config-bk.json | jq  'keys[]'
```

Select the keys if value of a field is "auto". Explore at [Select the keys if value of a field is "auto"](https://unix.stackexchange.com/questions/719877/select-the-keys-if-value-of-a-field-is-auto)

```bash
# Get the object with value = auto
jq 'map_values(select(.value == "auto"))' file
# Get key with same situation
jq -r 'map_values(select(.value == "auto"))|keys[]' file
```
## `du` command 

You can use `du` command for list all size inside your directory

```bash
# List folder only
du -csh xeusnguyen.xyz

# List file inside
du -csh xeusnguyen.xyz/*
```

## `lsblk` command

If you want to take the look with your storage device like HDD or SSD, you can use `lsblk` to see what format of those devices

```bash
# View information about your disk
lsblk -o NAME,HCTL,SIZE,MOUNTPOINT

# View output info about filesystems
lsblk -f
```

|                 |                         |                                                        |                                             |
| --------------- | ----------------------- | ------------------------------------------------------ | ------------------------------------------- |
| **File System** | **Supported File Size** | **Compatibility**                                      | **Ideal Usage**                             |
| **FAT32**       | up to 4 GB              | Windows, Mac, Linux                                    | For maximum compatibility                   |
| **NTFS**        | 16 EiB – 1 KB           | Windows, Mac (read-only), most Linux distributions     | For internal drives and Windows system file |
| **Ext4**        | 16 GiB – 16 TiB         | Windows, Mac, Linux (requires extra drivers to access) | For files larger than 4 GB                  |
## `mkfs` command

You can use `mkfs` command to formatting your device. Read more at [How to Use the mkfs Command on Linux](https://www.howtogeek.com/443342/how-to-use-the-mkfs-command-on-linux/)

```bash
mkfs [options] [-t type fs-options] device [size]
```

## `fdisk` command

Documentation: [What is FDISK and how does it work?](https://www.techtarget.com/whatis/definition/FDISK)

Use `fdisk` when you want to hangout with your hard dkkkkkkkkkkkkkisk drive, like integrate multiple way for formatting or partitioning a [hard disk drive](https://www.techtarget.com/searchstorage/definition/hard-disk-drive), or to delete different portions of it. FDISK is an external utility. It is most commonly used to prepare and [partition](https://www.techtarget.com/searchstorage/definition/partition) a hard drive

```bash
# to view details of available disk partitions.
sudo fdisk -l
# to view the partitions on a specific disk.
sudo fdisk -l /dev/sda
# to create a hard disk partition.
sudo fdisk /dev/sda
# to view the partition size.
sudo fdisk -s /dev/sda
```

And when you want to hit to interaction mode you can try with

```bash
sudo fdisk /dev/sda
```

And when you hit keyboard with `m`, you can see the helper

```bash
Command (m for help): m

Help:

  GPT
   M   enter protective/hybrid MBR

  Generic
   d   delete a partition
   F   list free unpartitioned space
   l   list known partition types
   n   add a new partition
   p   print the partition table
   t   change a partition type
   v   verify the partition table
   i   print information about a partition

  Misc
   m   print this menu
   x   extra functionality (experts only)

  Script
   I   load disk layout from sfdisk script file
   O   dump disk layout to sfdisk script file

  Save & Exit
   w   write table to disk and exit
   q   quit without saving changes

  Create a new label
   g   create a new empty GPT partition table
   G   create a new empty SGI (IRIX) partition table
   o   create a new empty DOS partition table
   s   create a new empty Sun partition table

```

## `scp` command

Documentation: [SCP Command in Linux {13 Examples}](https://phoenixnap.com/kb/linux-scp-command)

`scp` is protocol which permit use copy and transfer file from remote and local machine with bi-direction, or cp from remote to remote

```bash
# From local to remote
scp /path/file/local user@ip:/path/file/remote

# From remote to local
scp user@ip:/path/file/remote /path/file/local

# From remote to remote
scp user1@ip1:/path/file/remote1 user2@ip2:/path/file/remote2

# From remote to remote (but your machine is mediate)
scp -3 user1@ip1:/path/file/remote1 user2@ip2:/path/file/remote2
```

In some special case, you can integrate with option with your scp command to specific

**Different Port**: Usually `scp` use SSH (Port 22) to mediate help you secure transfer data through that port, but in other situation SSH not work in Port 22, you can use `-p` to specific

```bash
scp -p 2222 /path/file/local user@ip:/path/file/remote
```

**Recursive**: To copy whole folder, usually we use recursive mode and `scp` does have with `-r`

```bash
scp -r /path/folder/ user@ip:/path/file/remote
```

## `sed` command

Documentation: [Sed cheatsheet](https://quickref.me/sed.html) and [How to Use Sed to Find and Replace a String in a File](https://phoenixnap.com/kb/sed-replace)

To replace a string in file with `sed`, you can use command with format

```bash
#Replace in file (Global)
sed -i 's/OLD/NEW/g' path/file #Replace string inside a file
```

To replace in the string, you can control action with

```bash
echo "[MASKED]" | sed -e "s/\[MASKED\]/123456789/g"
```
# Cheatsheet
## Re run the previous command

You can use previous command with `!!` on your shell, for example

```bash
# First if you use clear screen
clear

# You can call clear screen again with !!
!!
```

Also you can reuse the previous command arguments, for example

```bash
$ commad <args>
$ 2nd command !$
```

## Use environment variables from `.env` file

>[!info]
>Read more about topic in `Stackoverflow` :  [Set environment variables from file of key/value pairs](https://stackoverflow.com/questions/19331497/set-environment-variables-from-file-of-key-value-pairs)

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
## Update Ubuntu new version

You can use integration tool inside `ubuntu` to update new version, that will pull and update packages inside host, do that easily with command

```bash
# Check the linux version
lsb_release -a

# Use command to update new version ubuntu
do-release-upgrade
```

>[!warning]
>In this situation you update `ubuntu`, it will update your kernel so please remember make a big-changes can gain different harden to control, so do know before you doing

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

## Comment note in Shell Bash

>[!info]
>2 ways for writing the comment to shell bash.
>
>Example and troubleshooting via  [Link to details](https://ioflood.com/blog/bash-comment/)

### Using the `#` character for comment

>[!info]
>In Bash, a comment starts with the hash symbol (#). Anything after # on that line is considered a comment and is ignored by the Bash interpreter

```bash
# This is a comment in Bash

# Output:
# (No output, as comments are not executed)
```

### Using the doctype `Here Document` for comment multiple line

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

## Reconfiguration for curl template output

>[!note]
>**Reference: [Timing Page Responses With Curl](https://www.hashbangcode.com/article/timing-page-responses-curl)**
### Templates format to output via `curl` command

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

### How to use

Find the PATH which including the `curl-formatter.txt` file with `cd` or `pwd`, Use this with `curl` command

```bash
curl -w "@<file-formatter-above>" -o /dev/null -sL <url>
```

![[Pasted image 20240218140458.png]]

## Redirect Output and Error

>[!note]
>Reference ▶️ ▶️ ▶️  [How to Redirect Output and Error to /dev/null in Linux](https://linuxhandbook.com/redirect-dev-null/)
### Some thing about the output of linux

- In the linux machine,  `/dev/null` that will location where you can return null for your shell like `command 2>&1 /dev/null`
- There will have 3 three type of output which linux has
	- Standard input (stdin) is designated with 0
	- Standard output (stdout) is designated with 1
	- Standard error (stderr) is designated with 2
### Redirect output to /dev/null in Linux
   
*For example*: You run `apt install curl` but you want your shell not return anything you can redirect `output` into `/dev/null`. It will be like 

```bash
sudo apt install curl 1>/dev/null
```

![[Drawing 2024-02-18 14.22.10.excalidraw.png]]

*Usage: Used it when you don't want `stdout` go to your shell, just removing the odd things and keep the important output*

### Redirect error to /dev/null in Linux
   
*For example*: You run `find /` but you run with non root, so somecase you will have some permission error output to your shell. You can use `/dev/null` for removing this messing stuff

```bash
find / 2> /dev/null
```

![[Pasted image 20240218143855.png]]

### Combine `stdout` and `stderror` into one with this character `&`
   
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

# External Commands
## Caddy server

Use the documentation to get valid command to handling [Caddy Server](https://caddyserver.com/docs/command-line#caddy-reload)

To reload configuration use `reload` command. Doc: [caddy reload](https://caddyserver.com/docs/command-line#caddy-reload)

```bash
caddy reload --config /location/caddy/file
```

To check and validate configuration from `caddyfile` use `validate` command. Doc: [caddy validate](https://caddyserver.com/docs/command-line#caddy-validate)

```bash
caddy validate --config /location/caddy/file
```

>[!note]
>With `Caddy V2`, mostly `websocket` automatically serve and do not need to configuration like `v1` . Check about that in [Caddy Proxy](https://caddyserver.com/docs/v2-upgrade#proxy)

## Vagrant

If you have problems when `vagrant` can't authentication for `ssh`. You will need concern to add this setting. Read more at: [Vagrant ssh authentication failure](https://stackoverflow.com/questions/22922891/vagrant-ssh-authentication-failure)

```bash title="Vagrantfile"
config.ssh.forward_agent = true
```

## Swap mode in Ubuntu

You can swap mode in Ubuntu from desktop mode to server mode, by use key combining

- Ctrl + Alt + F1 : To use desktop mode
- Ctrl + Alt + F3: To use shell or server mode