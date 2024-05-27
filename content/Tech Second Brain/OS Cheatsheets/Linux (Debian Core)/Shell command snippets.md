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

# `echo` command

- Decode string with specify unicode-escaped with `-e` flag, read more at: [StackOverFlow - How to convert \uXXXX unicode to UTF-8 using console tools in *nix](https://stackoverflow.com/questions/8795702/how-to-convert-uxxxx-unicode-to-utf-8-using-console-tools-in-nix)
	```bash
	echo -e "unicode-string"
	```

	You can use `uni2ascii` for instead if you want to integrate with 3rd party

# `journalctl` command

- You can use `journalctl` for capture and logged full events of service, by `-u` flag

	```bash
	journalctl -u service-name.service
	```

- Or, to see only log messages for the current boot

	```bash
	journalctl -u service-name.service -b
	```


# `grep` command

- Use grep with exclude by `-v` flag

	```bash
	grep -v "dotnet" .
	```

# `awk` command

- Skip first line, Usually header when you use `awk` to print column variables

	```bash
	awk 'NR>1 {print $3}'
	```

# `tree` command

- Print the sub-directory of folder with configuration level

	```bash
	tree -d -L 2 .
	```

# Re run the previous command

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