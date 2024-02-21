---
title: Reconfiguration for curl template output
tags:
  - cheatsheet
  - linux
  - bash
---
**Reference: [Timing Page Responses With Curl](https://www.hashbangcode.com/article/timing-page-responses-curl)**

## Templates format to output via `curl` command

```bash 
# curl-formatter.txt (save this into file)
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

1. Find the PATH which including the `curl-formatter.txt` file with `cd` or `pwd`
2. Use this with command
```bash
curl -w "@<file-formatter-above>" -o /dev/null -sL <url>
```

Results
```bash
curl -w "@curl-formatter.txt" -o /dev/null -sL http://localhost:8080/index.html
```

![[Pasted image 20240218140458.png]]
