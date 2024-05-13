---
title: Update alternative version
tags:
  - linux
  - command
  - helpful
  - cheatsheet
---
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
