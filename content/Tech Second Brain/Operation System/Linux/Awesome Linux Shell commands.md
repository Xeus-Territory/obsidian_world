---
title: Awesome Linux Shell Commands
tags:
  - awesome
  - linux
  - command
  - helpful
  - usage
---

![[icon-linux.svg|center|450]]
>[!info]
>Place to archive and snapshot the incredible command or pipe command with Linux OS platform such as Debian, Ubuntu, CentOS, ...

If you want to check the command with cheatsheet on your terminal, I recommend you to double-check at website [cheat.sh](https://cheat.sh/) or use `curl`

```bash
# main-page
curl cheat.sh/<command-want-to-explore>

# another-one
curl cht.sh/<command-want-to-explore>
```

If you want alternative version, I would say you prefer to [tldr](https://github.com/tldr-pages/tldr)

```bash
tldr <command-want-to-explore>
```
# In-house Commands

## Common

### `awk`

Skip first line Usually header when you use `awk` to print column variables

```bash
awk 'NR>1 {print $3}'
```

Get the last param when seperate by `/` or any symbol, you can use `F` and `$NF` to get the result

```bash
awk -F/ '{print $NF}'
```

### `cat`

Explore more about `cat` command and utilities

- [StackOverFlow - How does "cat << EOF" work in bash?](https://stackoverflow.com/questions/2500436/how-does-cat-eof-work-in-bash)
- [StackOverFlow - How to read from a file or standard input in Bash](https://stackoverflow.com/questions/6980090/how-to-read-from-a-file-or-standard-input-in-bash)
- [Unix & Linux Stack Exchange - Format output of xargs](https://unix.stackexchange.com/questions/89130/format-output-of-xargs)

### `du` 

You can use `du` command for list all size inside your directory

```bash
# List folder only
du -csh xeusnguyen.xyz

# List file inside
du -csh xeusnguyen.xyz/*
```

### `echo`

Decode string with specify unicode-escaped with `-e` flag, read more at: [StackOverFlow - How to convert \uXXXX unicode to UTF-8 using console tools in *nix](https://stackoverflow.com/questions/8795702/how-to-convert-uxxxx-unicode-to-utf-8-using-console-tools-in-nix)

>[!note]
>You can use `uni2ascii` for instead if you want to integrate with 3rd party

```bash
echo -e "unicode-string"
```

### `find`

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
### `grep`

Explore more example with `grep` via

- [Internet - grep Flags – The Good Stuff](https://zwischenzugs.com/2022/02/02/grep-flags-the-good-stuff/)

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

### `jq`

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
# Good way
curl -H "PRIVATE-TOKEN: $PRIVATE_GLAB_TOKEN" "https://gitlab.com/api/v4/users/$GLAB_USER_ID/contributed_projects" | jq --arg REPO_CHECKED_NAME "$REPO_CHECKED_NAME" '.[] | select(.name == $REPO_CHECKED_NAME) | .id'

# Trick way
curl -H "PRIVATE-TOKEN: $PRIVATE_GLAB_TOKEN" "https://gitlab.com/api/v4/users/$GLAB_USER_ID/contributed_projects" | jq '.[] | select(.name == "'${REPO_CHECKED_NAME}'") | .id'
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

If you wanna encode URL with `jq`, you can follow this

```bash
# use for encode
jq --slurp --raw-input --raw-output @uri <(printf 'http://example.com/E = mc^2')
```

In the situation, if you want to decode `jwt` token, you can try with `jq`

```bash
jq -R 'split(".") | .[1] | @base64d | fromjson' <<< "$1"
```

You wanna update the all of key match with your request with new value, you can use `walk` with `jq >= 1.7`. In the end, It will overwrite your current file with new value.

```bash
jq 'walk(if type == "object" then with_entries( if .key == "KEY_WANT_UPDATE" then .value = "NEW_VALUE" else . end ) else . end)' "/path/json/file" > "/path/json/file.tmp" \
        && mv "/path/json/file.tmp" "/path/json/file"
```

### `scp`

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

### `ssh`

Documentations and articles

- [Tecmint - How to Increase SSH Connection Timeout in Linux](https://www.tecmint.com/increase-ssh-connection-timeout/)

Use tunneling mode of `ssh` to reverse shell from remote to your local host

>[!info]
>Command below to port-forward from port `127.0.0.1:8080` from remote host and send the traffic to port `:8080` inside your host

```bash
ssh -N -L 8080:127.0.0.1:8080 -i /path/to/your/private_key <user>@<remote-host> -p <port-ssh> # Default ssh via port 22, use -p if you need to specific
```
### `sed`

Documentation

- [Sed cheatsheet](https://quickref.me/sed.html)
- [How to Use Sed to Find and Replace a String in a File](https://phoenixnap.com/kb/sed-replace)
- [Internet - Practical Shell Patterns I Actually Use](https://zwischenzugs.com/2022/01/04/practical-shell-patterns-i-actually-use/)
- [Cyberciti - How to use sed to find and replace text in files in Linux / Unix shell](https://www.cyberciti.biz/faq/how-to-use-sed-to-find-and-replace-text-in-files-in-linux-unix-shell/)

To replace a string in file with `sed`, you can use command with format

```bash
# Replace in file (Global)
sed -i 's/OLD/NEW/g' path/file #Replace string inside a file
```

To replace in the string, you can control action with

```bash
echo "[MASKED]" | sed -e "s/\[MASKED\]/123456789/g"
```

To replace the string with content return from executing command, you can use

```bash
sed -i 's/OLD/'$(echo $NEW)'/g' path/file
```

### `tr`

Use `tr` to delete with `-d` flag

```bash
tr -d "HostName:Port" # If find 2 word, seperate with space
tr -d "HostNamePort" # If find 2 word, no space add-on
```

Use `tr` to change space to colon, ` ` --> `:`

```bash
tr -s "[:blank:]" ":"
```

### `tree`

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

### `tar`

When you want to extract or compress file into `tar.gz` format, you can use `tar` for handle this task

First of all, when you want to extract, you can use command

```bash
# Use when it have gz (gunzip)
tar -xzf /file/example.tar.gz

# Use when it has only tar
tar -xz /file/example.tar

# If you want to strip the folder inside, e.g level 1 or level 2
tar -xzf /file/example.tar.gz --strip-components <level-number>

# If you want to output your extract to output
mkdir -p /folder/to/output # make sure folder exist
tar -xzf /file/example.tar.gz -C /folder/to/output
```

Next, when you want to compress, you can use

```bash
# Use with file
tar -czf /file/to/compress.tar.gz file # Use can use multiple file

# Use to package folder
tar -czf /file/to/compress.tar.gz folder/*
```

At the end, when you want to see what inside the compress, you can use

```bash
tar -tvf /file/to/compress.tar.gz
```

### `set` & `unset`

You can use `set` and `unset` command for set the environment variables, on-off history, error handler and moreover stuff. Read more at

- [Phoenixnap - Linux set Command & How to Use it](https://phoenixnap.com/kb/linux-set)
- [Cybercity - Unset manual](https://bash.cyberciti.biz/guide/Unset)

To handle environment setup

```bash
# display name and values of shell variables
set

# unset the environment variable
unset <environment_variables>
```

To on-off history

```bash
set +o history # temporarily turn off history

# commands here won't be saved

set -o history # turn it back on
```

To handle-error stuff, usually stay as `trap` function in linux, it's alternative version of `||` command. Explore more at [StackOverFlow](https://stackoverflow.com/questions/62387402/reuse-bash-error-handling-trap-logic-with-set-e-command-cannot-invoke-error)

```bash
# syntax
set -e

# usage
set -e
cat nonexistingfile
echo "The end"
```
## System Administrator

### `chmod`

Explore more about `chmod` and couples of topics around

- [Redhat - Linux file permissions explained](https://www.redhat.com/en/blog/linux-file-permissions-explained)
- [Redhat - Linux permissions: SUID, SGID, and sticky bit](https://www.redhat.com/sysadmin/suid-sgid-sticky-bit)

```bash
# Grant full permission for file
chmod 777 /path/to/file

# Grant execute for file
chmod +x /path/to/file
```

**File Permission Table**

| Octal Value | Symbolic Notation | Binary | Permissions Granted              |
| ----------- | ----------------- | ------ | -------------------------------- |
| **0**       | `---`             | 000    | None                             |
| **1**       | `--x`             | 001    | Execute only                     |
| **2**       | `-w-`             | 010    | Write only                       |
| **3**       | `-wx`             | 011    | Write and Execute (2+1)          |
| **4**       | `r--`             | 100    | Read only                        |
| **5**       | `r-x`             | 101    | Read and Execute (4+1)           |
| **6**       | `rw-`             | 110    | Read and Write (4+2)             |
| **7**       | `rwx`             | 111    | Read, Write, and Execute (4+2+1) |

**Linux Permission Table**

| Special Permission      | Octal Value | Symbol                           | Short Explanation                                                                                                                                                                                                                    |
| ----------------------- | ----------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **SUID** (Set-User-ID)  | `4000`      | **s** or **S** (in user field)   | **File:** Allows the program to be executed with the permissions of the **file owner** (e.g., running `passwd` as the `root` owner). **Directory:** No effect.                                                                       |
| **SGID** (Set-Group-ID) | `2000`      | **s** or **S** (in group field)  | **File:** Allows the program to be executed with the permissions of the **file's group**. **Directory:** All new files and subdirectories created within it **inherit the directory's group ownership** for easy collaboration.      |
| **Sticky Bit**          | `1000`      | **t** or **T** (in others field) | **File:** No effect. **Directory:** Restricts file deletion; only the **owner** of a file (or the directory owner/root) can delete or rename it, even if others have write permission to the directory (e.g., the `/tmp` directory). |
### `fdisk`

Documentation: [What is FDISK and how does it work?](https://www.techtarget.com/whatis/definition/FDISK)

Use `fdisk` when you want to hangout with your hard disk drive, like integrate multiple way for formatting or partitioning a [hard disk drive](https://www.techtarget.com/searchstorage/definition/hard-disk-drive), or to delete different portions of it. FDISK is an external utility. It is most commonly used to prepare and [partition](https://www.techtarget.com/searchstorage/definition/partition) a hard drive

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

### `iostat`

You can use `iostat` for listing and monitoring your input and output of your disk, by this action you can doube-check state and bottleneck inside

Disk I/O Monitoring - This displays disk I/O statistics every 5 seconds, including utilization, queue length, and wait time

```bash
iostat -xz 5
```

### `journalctl`

Documentation:

- [DigitalOcean - How To Use Journalctl to View and Manipulate Systemd Logs](https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs)

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

Check the log systemd in catalog and pagination, you can use

```bash
journalctl -xeu service-name.service

--catalog         -x  -- Show explanatory texts with each log line 
--pager-end       -e  -- Jump to the end of the journal in the pager
--unit            -u  -- Show data only from the specified unit
```

Check the only kernel message by command

```bash
journalctl -k # show only kernel
```
### `lsblk`

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
### `lsof`

**lsof** is a command for `LiSting Open Files`. Find and explore more at [documentation](https://lsof.readthedocs.io/en/latest/)

To check network connection, you can use

```bash
lsof -i -P -n
```

Find files open to a process with known PID, e.g: 1234, you can use

```bash
lsof -p 1234
```

### `mkfs`

You can use `mkfs` command to formatting your device. Read more at [How to Use the mkfs Command on Linux](https://www.howtogeek.com/443342/how-to-use-the-mkfs-command-on-linux/)

```bash
mkfs [options] [-t type fs-options] device [size]
```

### `modprobe`

>[!info]
>The [kernel](https://phoenixnap.com/glossary/what-is-a-kernel) uses **`modprobe`** to request modules. The **`modprobe`** command searches through the standard installed module directories to find the necessary drivers.

Documentation:

- [PhoenixNAP - How To Use The Modprobe Command In Linux](https://phoenixnap.com/kb/modprobe-command)
- [ModProbe - Linux man page](https://linux.die.net/man/8/modprobe)
- [Cyberciti.biz - Howto display list of modules or device drivers in the Linux Kernel](https://www.cyberciti.biz/faq/howto-display-list-of-modules-or-device-drivers-in-the-linux-kernel/)

To add module to kernel in linux via command

```bash
# Default add module
sudo modprobe <module-name> # e.g: iscsi_tcp

# Add multiple module
sudo modprobe -all <first module name> <second module name>

# Confirm module or add for first time with --first-time opt
sudo modprobe <module name> --first-time
```

To remove module from kernel via command

```bash
# Remove module
sudo modprobe -r <module-name> # e.g: iscs_tcp

# Double-check already remove or first time remove
sudo modprobe -r <module-name> --first-time
```

To check and find module add into kernel, you can handle with couple of commands

```bash
# Check via lsmod
lsmod | grep -e "<module-name>"

# Check via find command
find /lib/modules/$(uname -r) -type f -name '*.ko*' | grep -e "<module-name>"

# Combine awk and modinfo command (easily output)
# Source: https://stackoverflow.com/questions/23645595/how-to-find-linux-module-path
awk '{ print $1 }' /proc/modules | xargs modinfo -n | sort | grep -e "<module_name>"
```

### `ps`

You can use `ps` command to check process inside your machine to identify CPU spike or memory leak or moreover

Find CPU-Intensive Processes - This lists the top 10 processes by CPU usage, showing the percentage, process ID, user, and command.

```bash
ps -eo pcpu,pid,user,args | sort -r | head -10
```

Find Memory Leaks - This updates every 5 seconds to show the top memory-consuming processes, helping you identify memory leaks

```bash
watch -n 5 "ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%mem | head"
```

Check Running Processes - This lists the top 10 processes sorted by CPU usage, helping you quickly identify resource-intensive processes.

```bash
ps aux --sort=-%cpu | head -10
```

### `hostnamectl`

When you think about change your current `hostname` for present your machine in network, ssh connection, you can use `hostnamectl` for hand-on it. Explore more at

- [PhoenixNAP - How to Change Hostname on Ubuntu](https://phoenixnap.com/kb/ubuntu-20-04-change-hostname)
- [RedHat - Configuring Host Names Using hostnamectl](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/7/html/networking_guide/sec_configuring_host_names_using_hostnamectl)
- [GeeksforGeek - hostnamectl command in Linux with Examples](https://www.geeksforgeeks.org/linux-unix/hostnamectl-command-in-linux-with-examples/)

First of all, you can check your `hostname` information by 

```bash
# Simple
hostnamectl
# Complete command
hostnamectl status
```

Next, you can exchange your `hostname` for couple of types with option `set-hostname` (NOTE: required `root` permission), including 

```bash
# transient - Assigned by mDNS server or DHCP server during run time
hostnamectl set-hostname new-name --transient

# static - used to initialize the kernel hostname during boot time
hostnamectl set-hostname new-name --static

# pretty - the hostname presented to the user, not to other computers on a network
hostnamectl set-hostname new-name --pretty

# combine three types, transient, static and pretty
hostnamectl set-hostname new-name
```

### `systemctl`

Documentations and articles

- [Redhat - Systemd cheat sheet](https://access.redhat.com/node/1199213/40/0/13122931)
- [Medium - Stop Using systemctl Blindly: Master Advanced Service Management Techniques!](https://medium.com/@howtouselinux/stop-using-systemctl-blindly-master-advanced-service-management-techniques-83dfd0e9c0ab)

Use `systemctl` command to check available service inside your host with state running

```bash
sudo systemctl list-units --type=service --state=running
```

Use one of option Disable/Enable/Restart/Stop/Start with service inside host for changing state

```bash
sudo systemctl disable/enable/restart/stop/start <name_of_service>
```

Check configure or state of service with `systemctl` command

```bash
sudo systemctl show/status <name_of_services>
```

To reload systemd manager configuration

```bash
sudo systemctl daemon-reload
```

### `vmstat`

If you want to see more information about your virtual memory statistics, you can use `vmstat` instead of `free` command. `vmstat` will let you know about about processes, memory, paging, block IO, traps, disks and cpu activity.

```bash
# view in short and basic form
vmstat

# view more specific form, for show counter staistic in Megabyte output
vmstat -s -sM
```

To see fully manual page, you can use `man` command or double-check at `cheat.sh` site

```bash
man vmstat
curl cheat.sh/vmstat
```
### `free`

The simple version of `vmstat`, you can use `free` which show directly the useful information to let you monitor your memory, especially distinguish and figure out the OOM event with high buffer/cache mem or something interesting. Check more at [[Awesome Linux Troubleshoot#Linux Memory|Linux Memory]]

```bash
# view your memory in output humanize
free -h

# minitor with a loop instead of watch,e.g: reload every 2s
free -h -s 2
```
### `crontab`

If you work in longtime with Linux, `crontab` is becoming the friend of yah, with let you schedule your command or script base on the linux scheduler as `cronjob`

You need to ensure to understand crontab format

```bash
# crontab format
* * * * *  command_to_execute
- - - - -
| | | | |
| | | | +- day of week (0 - 7) (where sunday is 0 and 7)
| | | +--- month (1 - 12)
| | +----- day (1 - 31)
| +------- hour (0 - 23)
+--------- minute (0 - 59)
```

Now you can use couple of command to edit/add/remove the crontab

```bash
# for editing
crontab -e # use default editor
EDITOR=nano crontab -e # use nano for instead if vim set up

# for listing
crontab -l

# for remove all cronjob
crontab -r

# replace current crontab by another file
crontab path/to/file
```

### `chattr` & `lsattr`

There are some advanced option for your to configure your file, but it doesn't use popular but it one of powerful technique let you control your file `mutable` ability for all user, even if `root`. Read more at [GeekforGeeks - chattr and lsattr commands in Linux with examples](https://www.geeksforgeeks.org/linux-unix/chattr-command-in-linux-with-examples/)

To view the attribute of your file, you can use `lsattr` command

```bash
# basic command for file
lsattr /path/to/your/file

# if you want to recursive
lsattr -R /path/to/directory

# or specific directory
lsattr -d /path/to/directory
```

For understanding the output, you can check table below

| Attribute               | Symbolic Character | Full Name / Short Explanation                                                                                                |
| ----------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| **Append-Only**         | `a`                | File can only be opened in **append mode**; existing data cannot be overwritten or truncated.                                |
| **Compressed**          | `c`                | The file is automatically **compressed** by the kernel (filesystem-specific).                                                |
| **No Dump**             | `d`                | The file is excluded during a file system **dump** (backup).                                                                 |
| **Extent Format**       | `e`                | The file is using **extents** for block mapping, a feature of the ext4 filesystem for improved performance with large files. |
| **Immutable**           | `i`                | The file is **immutable**; it cannot be modified, deleted, renamed, or linked to, even by the root user.                     |
| **Data Journaling**     | `j`                | All data is written to the **journal** before being written to the file (filesystem-specific, like ext3/ext4).               |
| **Synchronous Updates** | `s`                | Changes to the file are written to the disk **synchronously** (immediately), bypassing the write cache.                      |
| **No Tail-Merging**     | `t`                | Prevents the use of **tail-merging**, a space-saving optimization that combines small file tails into a single block.        |
| **Undeletable**         | `u`                | When the file is deleted, its contents are **saved** by the kernel, allowing for potential undeletion.                       |
To change the attribute, you can use `chattr` command. As usual, for secure or protect your file and directory, the attribute `i` immutable always be considered

```bash
# To add immutable to your file or directory
chattr +i /path/to/file # specific
chattr -R +i /path/to/directoy # recursive for directory

# To remove immutable to your file and directory
chattr -i /path/to/file # specific
chattr -R -i /path/to/directory # recursive for directory
```

### `chown` & `chgrp`

Another critical attribute for changing file permissions is **ownership**, which allows you to set which **user** or **group** a file belongs to. This is particularly helpful when working in environments with multiple users.

>[!info]
>The **`chown`** command is the more comprehensive command, as it can change both the **user owner** and the **group owner** of a file (or just the user owner). However, the **`chgrp`** command is built specifically to change *only* the **group owner**. You can use either command depending on whether you need to change both or just the group.

```bash
# change user owner of specific file/directory
chown <user> /path/to/file/or/directory

# change user/group owner of specific file/directory
chown <user>:<group> /path/to/file/or/directory

# change user owner but recursive files in directory
chown -R <user> /path/to/directory
```

If you want to use `chgrp` only, you can use

```bash
# change group owner
chown <group> /path/to/file/or/directory

# change group owner but recursive
chown -R <group> /path/to/directory
```

### `lspci`

If you encounter trouble with your PCI, hardware connector, you can use `lspci` to list the information and view what `pci` error define for what component

```bash
# View basic
lspci

# specific the device
lspci -s [[[[<domain>]:]<bus>]:][<slot>][.[<func>]]	# Show only devices in selected slots

# see the verbose version
lspci --vv -s [[[[<domain>]:]<bus>]:][<slot>][.[<func>]]	# Show only devices in selected slots
```
## Networking

### `netstat`

Cheatsheet: [Link](http://cheat.sh/netstat)

If you want to use another tool for networking check about open/listening/establish service, you can you `netstat`

The common command for listening service with process_id and don't show specific host

```bash
netstat -lnvp
```

View routing table

```bash
netstat -r
```

To view which users/processes are listening to which ports

```bash
netstat -lnptu # or sudo for more detail
```

List listening TCP and UDP ports (+ user and process if you're root)

```bash
netstat -lepunt
```

Find the correspond listening port with which service/user

```bash
netstat -pln | grep <port> | awk '{print $NF}'
```

To statistic

```bash
# statistic for both udp and tcp
netstat -s

# statistic for tcp
netstat -st

# statistic for udp
netstat -su
```

View network interface

```bash
# basic
netstat -i

# extend info
netstat -ie # same as ifconfig
```
### `ss`

If you familiar with `netstat` which usually not install from starting with almost Linux Distro, but instead of this one, you can try to use `ss` which integrate into default tool to debug networking

To show listening port in your host, you can use

```bash
# command will show progress with port openning (listening)
ss -tupl
```

To show establish process, you can use

```bash
# If you don't wanna show service,e.g: https, http, smb, ...
ss -tunp

# Show service
ss -tup
```

When you want to add filter socket port number, you can use

```bash
# Use Port Number
ss -at '( dport = :22 or sport = :22 )'

# Use Service
ss -at '( dport = :ssh or sport = :ssh )'
```

>[!info]
>If you are not found `ss` command, you can read file `/etc/services` for alternative which show us port and service mapping

### `dig`

When you have demand to find information about IP Address and other DNS record, you can use `dig` command

```bash
# find the IPv4 of example dns
dig +short A example.com

# specific dns server for searching
dig @8.8.8.8 +short A example.com

# see more information with verbose output
dig +noall +answer +comment example.com
```

>[!info]
>There are a lot of **DNS records** you can find with the **`dig`** (Domain Information Groper) command:
>- **A (Address) Record**: Maps a domain name to an **IPv4 address**. This is the most common record for finding a website's IP.
>- **AAAA (Quad-A) Record**: Maps a domain name to an **IPv6 address**.
>- **CNAME (Canonical Name) Record**: Used to create an **alias** from one domain name to another (e.g., `www.example.com` is an alias for `example.com`).
>- **MX (Mail Exchange) Record**: Specifies the **mail servers** responsible for accepting email on behalf of a domain name.
### `nc`

To check port open or not, you can use `nc` with some options to retrieve information. Explore more at:

- [StackOverFlow - Testing UDP port connectivity](https://serverfault.com/questions/416205/testing-udp-port-connectivity)
- [StackOverFlow - Test if remote TCP port is open from a shell script](https://stackoverflow.com/questions/4922943/test-if-remote-tcp-port-is-open-from-a-shell-script)

```bash
# Check port TCP open or not after 5s timeout
nc -z -v -w5 <host> <port>
# Check list port tcp from X to Y open or not after 5s timeout
nc -z -v -w5 <host> <portX>-<portY>
# Check port UDP or not
nc -z -u -v <host> <port>
```
### `ufw`

Documentations and articles

- [DigitalOcean - How to Set Up a Firewall with UFW on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-ubuntu)

### `iptables`

Learn more about `iptables` commands from links down below

- [Github - iptables cheatsheet](https://gist.github.com/davydany/0ad377f6de3c70056d2bd0f1549e1017)
- [Prompt generate Iptables](https://bashsenpai.com/resources/cheatsheets/iptables)
- [Hacktricks - Suricata & Iptables cheatsheet](https://book.hacktricks.xyz/generic-methodologies-and-resources/basic-forensic-methodology/pcap-inspection/suricata-and-iptables-cheatsheet)
- [How to list all iptables rules with line numbers on Linux](https://www.cyberciti.biz/faq/how-to-list-all-iptables-rules-in-linux/)
- [How can I remove specific rules from iptables?](https://stackoverflow.com/questions/10197405/how-can-i-remove-specific-rules-from-iptables)
- [DigitalOcean - How To Forward Ports through a Linux Gateway with Iptables](https://www.digitalocean.com/community/tutorials/how-to-forward-ports-through-a-linux-gateway-with-iptables)

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

# External Commands

## `Pip3` & `Python3`

![[icon-python.png]]

### Break system for installing

With `Python3` from version 3.12, there isn't gonna easy for us to install package, so if you want to force install with `python3-pip`, you can add the optional `--break-system-packages` after the pip command

```bash
pip3 install numpy --break-system-packages
```

With read from file, we can do same way

```bash
pip3 install -r requirements.txt --break-system-packages
```

### Specific Torch version

In some situations, your environment have higher version CUDA or driver of NVIDIA compare with Torch, you can use this version to bypass and migrate your torch to compatible version with your graphic card. Read more at [Reddit - RTX 5090 Training Issues - PyTorch Doesn't Support Blackwell Architecture Yet?](https://www.reddit.com/r/LocalLLaMA/comments/1law1go/rtx_5090_training_issues_pytorch_doesnt_support/)

```bash
pip install -U torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu128
```

### Create virtual environment with `venv`

With `Python3` from **version 3.12**, it require `venv` or use `--break-system-packages` for global environment. But in some situation, you need find out to `conda` or `venv` to make your environment become more convenience to install external package

To setup `venv`, Read more in official documentation [venv — Creation of virtual environments](https://docs.python.org/3/library/venv.html)

First of all, create new environment with command

```bash
python3 -m venv /path/to/new/venv
```

Active the environment

```bash
source /path/to/new/venv/bin/active
```

When you finish and want to comeback to global environment, in the `venv` shell, you can use command

```bash
deactivate
```
## `keytool` (Java)

Explore more about `keytool` through [Common Java Keytool Commands](https://knowledge.digicert.com/de/de/quovadis/ssl-certificates/ssl-general-topics/common-java-keytool-commands)
### Get keystroke information

To view and check information which store inside keystroke, which generate from `keytool` - key generator integrate into Java

```bash
keytool -list -v -keystore /path/to/your/keystore-file.keystore -alias your-key-alias -storepass your-keystore-password -keypass your-key-password
```

## `OpenVPN`

### Generate Client CA

To generate a completely Client CA for connecting to OpenVPN Server, you can use command

```bash
# Instruction
./etc/openvpn/server/easy-rsa/easyrsa build-client-full <file_name_base> [ cmd-opts ]

# Example
./etc/openvpn/server/easy-rsa/easyrsa build-client-full xeusnguyen nopass
```

# Terminal Tools

## Common

- [bat](https://github.com/sharkdp/bat): A cat(1) clone with wings.
- [bcal](https://github.com/jarun/bcal): 🔢 Bits, bytes and address calculator
- [duf](https://github.com/muesli/duf): Disk Usage/Free Utility - a better 'df' alternative 🌟 **(Recommended)**
- [dust](https://github.com/bootandy/dust) : A more intuitive version of du in rust
- [exa](https://github.com/ogham/exa): A modern replacement for ‘ls’.
- [fd](https://github.com/sharkdp/fd) : A simple, fast and user-friendly alternative to 'find'
- [fzf](https://github.com/junegunn/fzf): 🌸 A command-line fuzzy finder
- [httpie](https://github.com/httpie/cli): modern, user-friendly command-line HTTP client for the API era. JSON support, colors, sessions, downloads, plugins & more
- [ripgrep](https://github.com/BurntSushi/ripgrep) : ripgrep recursively searches directories for a regex pattern while respecting your gitignore
## Developer

- [pre-commit](https://github.com/pre-commit/pre-commit): A framework for managing and maintaining multi-language pre-commit hooks. 🌟 **(Recommended)**
- [pre-commit-hooks](https://github.com/pre-commit/pre-commit-hooks): Some out-of-the-box hooks for pre-commit 🌟 **(Recommended)**
## Monitoring

- [bpytop](https://github.com/aristocratos/bpytop): Linux/OSX/FreeBSD resource monitor 🌟 **(Recommended)**
- [entr](https://github.com/eradman/entr): Run arbitrary commands when files change
## Networking

- [rclone](https://github.com/rclone/rclone): "rsync for cloud storage" - Google Drive, S3, Dropbox, Backblaze B2, One Drive, Swift, Hubic, Wasabi, Google Cloud Storage, Azure Blob, Azure Files, Yandex Files 🌟 **(Recommended)**
- [nethogs](https://github.com/raboof/nethogs): Linux 'net top' tool
- [nload](https://github.com/rolandriegel/nload): Real-time network traffic monitor
- [iftop](https://github.com/soarpenguin/iftop): display bandwidth usage on an interface 🌟 **(Recommended)**
## Shell

- [ohmyzsh](https://github.com/ohmyzsh/ohmyzsh): Framework for managing your zsh configuration 🌟 **(Recommended)**
- [pet](https://github.com/knqyf263/pet): Simple command-line snippet manager
- [tldr](https://github.com/tldr-pages/tldr): 📚 Collaborative cheatsheets for console commands 🌟 **(Recommended)**
- [warp](https://www.warp.dev/): The terminal reimagined with AI and collaborative tools for better productivity
- [thefuck](https://github.com/nvbn/thefuck) : Magnificent app which corrects your previous console command.
## OS

- [auto-unlocker](https://github.com/paolo-projects/auto-unlocker): Unlocker for VMWare macOS
- [darling](https://github.com/darlinghq/darling): Darwin/macOS emulation layer for Linux
## Secrets Management

- [sops](https://getsops.io/) : Simple and flexible tool for managing secrets 🌟 **(Recommended)**
- [trufflehog](https://github.com/trufflesecurity/trufflehog): Find, verify, and analyze leaked credentials.w