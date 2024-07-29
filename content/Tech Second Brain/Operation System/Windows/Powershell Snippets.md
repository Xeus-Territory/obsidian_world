---
title: Powershell Snippets
tags:
  - command
  - powershell
  - usage
  - awesome
  - helpful
---
>[!info]
>Powershell Powershell, bring more helpful and memorable command which can reuse on next time 😅😅😅

# Extract `zip` file

You can use `Expand-Archive` for extract `ZIP` file, for example

```powershell
Expand-Archive .\translators-main.zip -DestinationPath .
```

The command will extract the `translators-main.zip` file in current folder


# Restart `wsl` to claim memory

You can use `--shutdown` flag to restart the `wsl` machine or you can setup `.wslconfig` on PATH `$env:USERPROFILE`, read more: [Advanced settings configuration in WSL](https://learn.microsoft.com/en-us/windows/wsl/wsl-config). More about scenarios you can read in [StackOverFlow - How can I reduce the consumption of the `vmmem` process?](https://superuser.com/questions/1559170/how-can-i-reduce-the-consumption-of-the-vmmem-process)

>[!note]
>Shutdown to reclaim resource

```powershell
# Shutdown WSL to reclaim resource
wsl --shutdown
```

>[!info]
>Set new configuration

```powershell title=".wslconfig"
# Update new info for wsl2
[wsl2]
memory=3GB # Set the limit memory can give for wsl
```

```powershell
# Try shutdown after change configuration
wsl --shutdown
```

# Common `wsl` command

Official documentation: [Basic commands for WSL](https://learn.microsoft.com/en-us/windows/wsl/basic-commands)

## Update `wsl`

```powershell 
wsl --update
```

## Check the list subsystem running

```powershell
wsl --list --running
```

## Set default linux distribution

```powershell
wsl --set-default <Distribution Name>
```

## Shutdown the `wsl`

```powershell
wsl --shutdown
```

## Terminate linux distribution

```powershell
wsl --terminate <Distribution Name>
```

## List distribution you have on Window machine

```powershell
wsl --list
```

# `Invoke-WebRequest` alias of `wget` & `curl`

Reference: [StackExchange - PowerShell equivalent of curl](https://superuser.com/questions/344927/powershell-equivalent-of-curl) - [Invoke-WebRequest](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-webrequest?view=powershell-7.4)

You can use `curl` alias of command `Invoke-WebRequest`

```powershell
# Use on curl style
curl -Uri "https://www.example.com/myfile.txt" -OutFile myfile.txt

# Use on altenative
Invoke-WebRequest -Uri "https://www.example.com/myfile.txt" -OutFile myfile.txt
```

Because the powershell output work really special, `object-type` I think so. Thus, you can use `select-object` to get the what actually you want, such as `Content`

```powershell
# Output not raw string
Invoke-WebRequest -Uri https://www.google.com | Select-Object 'Content'
```

![[Pasted image 20240518145736.png]]

For expand the raw string, you can use ` -ExpandProperty` flag like example

```powershell
Invoke-WebRequest -Uri https://www.google.com | Select-Object -ExpandProperty 'Content'
```

![[Pasted image 20240518145918.png]]

# Go to the administrator

Use can use `start-process` with `-verb` flag on `runas` mode to change your shell to Administrator role

```powershell
# Open Windows Terminals (New version if you install)
Start-Process wt -Verb runAs

# Open powershell in Terminal
Start-Process powershell -Verb runAs
```

But on the currently, Windows just ready to release `sudo` command for help you doing super user command can do without open terminal with Administrator. Read more at: [Sudo for Windows](https://learn.microsoft.com/en-us/windows/sudo/)

# Reload `$PROFILE`

When you want to reload or apply plugin which you put on your `$PROFILE`, you can make it straightway with command

```powershell
. $PROFILE
```

