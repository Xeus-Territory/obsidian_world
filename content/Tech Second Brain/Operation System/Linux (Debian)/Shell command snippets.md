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

You can use `journalctl` for capture and logged full events of service, by `-u` flag

```bash
journalctl -u service-name.service
	```

Or, to see only log messages for the current boot

```bash
journalctl -u service-name.service -b
```

## `grep` command

Use grep with exclude by `-v` flag

```bash
grep -v "dotnet" .
```

To grep include multiple word, use `-i` flag to execute that. Especially add with `\|` symbol between two words. Read more at: [How to Grep for Multiple Strings, Patterns or Words](https://phoenixnap.com/kb/grep-multiple-strings), extending with multiple situations (HELPFUL)

```bash
grep -i "Hostname\|Port"
```

## `awk` command

Skip first line, Usually header when you use `awk` to print column variables

```bash
awk 'NR>1 {print $3}'
```

## `tree` command

Print the sub-directory of folder with configuration level

```bash
tree -d -L 2 .
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