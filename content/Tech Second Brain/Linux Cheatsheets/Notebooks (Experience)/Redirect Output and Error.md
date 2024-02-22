---
title: Redirect Output and Error
tags:
  - cheatsheet
  - linux
  - bash
---

Reference ▶️ ▶️ ▶️  [How to Redirect Output and Error to /dev/null in Linux](https://linuxhandbook.com/redirect-dev-null/)
## Some thing about the output of linux
- In the linux machine,  `/dev/null` that will location where you can return null for your shell like `command 2>&1 /dev/null`
- There will have 3 three type of output which linux has
	- Standard input (stdin) is designated with 0
	- Standard output (stdout) is designated with 1
	- Standard error (stderr) is designated with 2

## What things we can play with this
1. Redirect output to /dev/null in Linux
*For example*: You run `apt install curl` but you want your shell not return anything you can redirect `output` into `/dev/null`. It will be like 

```bash
sudo apt install curl 1>/dev/null
```

![[Drawing 2024-02-18 14.22.10.excalidraw.png]]
*Usage: Used it when you don't want stdout go to your shell, just removing the odd things and keep the important output*

2. Redirect error to /dev/null in Linux
*For example*: You run `find /` but you run with non root, so somecase you will have some permission error output to your shell. You can use `/dev/null` for removing this messing stuff

```bash
find / 2> /dev/null
```

![[Pasted image 20240218143855.png]]

3. Awesome things, you can combine `stdout` and `stderror` into one with this character `&`
```bash
1. Long version
find / 2> /dev/null 1>/dev/null

2. Short version
find / 2>&1 /dev/null (Send error to output and send them to /dev/null)

3. Some other case
find / > /dev/null 2>&1
```

## Troubleshoot

>[!attention] Sometime you can use version `2` of combining
>	The `2>&1` part means "redirect the error stream into the output stream", so when you redirect the output stream, error stream gets redirected as well. Even if your program writes to `stderr` now, that output would be discarded as well. ([Sergey Kalinichenko](https://stackoverflow.com/users/335858/sergey-kalinichenko))

**Find this problem ▶️ ▶️  [What is /dev/null 2>&1?](https://stackoverflow.com/questions/10508843/what-is-dev-null-21)**
