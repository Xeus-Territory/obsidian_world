---
title: The awesome of Powershell Commands
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

Official documentation: [Basic commands for WSL](https://learn.microsoft.com/en-us/windows/wsl/basic-commands) and [Remove WSL](https://www.makeuseof.com/uninstall-wsl-windows/)

```powershell
# Update wsl
wsl --update

# Check the list subsystem running
wsl --list --running

# Set default linux distribution
wsl --set-default <Distribution Name>

# Shutdown the wsl
wsl --shutdown

# Terminate linux distribution
wsl --terminate <Distribution Name>

# List distribution you have on Window machine
wsl --list

# List available Linux distributions
wsl --list --online

# Set WSL version to 1 or 2
wsl --set-version <distribution name> <versionNumber>

# Export a distribution
wsl --export <Distribution Name> <FileName>

# Import a distribution
wsl --import <Distribution Name> <InstallLocation> <FileName>
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

# Enable Hyper-V service

>[!info]
>Information about Issue [StackOverFlow - How to disable Hyper-V in command line?](https://stackoverflow.com/questions/30496116/how-to-disable-hyper-v-in-command-line)]

## Command Prompt (CMD)

In an _elevated_ Command Prompt write this

```powershell
# To disable
bcdedit /set hypervisorlaunchtype off
# To enable
bcdedit /set hypervisorlaunchtype auto 
```

Restart to take effect or you can do it with command

```powershell
# Restart in one minute left
shutdown /r

# Restart immediately
shutdown /r /t 0

# Restart after time
shutdown /r /t TIME
```

## Powershell

Run in administrator before execute this

To disable

```powershell
# To disable
Disable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-All

# To enable
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-All

```

And restart or use command

```powershell
# Restart in one minute left
shutdown /r

# Restart immediately
shutdown /r /t 0

# Restart after time
shutdown /r /t TIME
```

# Get execute policy

Try to list all permission of `powershell` of currently user

```powershell
Get-ExecutionPolicy -List
```

# View all permission of user

Use `whoami` command to view

```powershell
whoami /all
```

# Set and change permission of file

Documentation: [How to change file permissions on Windows via powershell / cmd?](https://superuser.com/questions/1539172/how-to-change-file-permissions-on-windows-via-powershell-cmd)

To change and set permission of file or folder in powershell, you can use [Get-Acl](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.security/get-acl?view=powershell-7) and [Set-Acl](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.security/set-acl?view=powershell-7)

```powershell
# Copy permission from dog --> cat
Get-Acl -Path "C:\Dog.txt" | Set-Acl -Path "C:\Cat.txt"
```

Or we can use [icacls](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/icacls) to handle with same situation. Read more [tutorial](https://theitbros.com/using-icacls-to-list-folder-permissions-and-manage-files/) and [explanation](https://4sysops.com/archives/icacls-list-set-grant-remove-and-deny-permissions/)

```powershell
#  grant the group FileAdmins 'Delete' and 'Write DAC' permissions to C:\demo\example
icacls "C:\demo\example" /grant:r FileAdmins:(D,WDAC)
```

If you want to create `400` permission for your ssh-key or readonly file for currently user, you can use

```powershell
# Give current user explicit read-permission
icacls.exe $path /GRANT:R "$($env:USERNAME):(R)"
# Disable inheritance and remove inherited permissions
icacls.exe $path /inheritance:r
```
# Create new file

Explore more about methodology: [How to Use PowerShell to Create a File?](https://www.sharepointdiary.com/2020/09/powershell-create-file.html)

There is more of stuff way for create new file, and one of popular is use `New-Item`

```powershell
New-Item -Path "C:\Logs\NewLog.txt" -ItemType File
```

In another, you can use `Out-File` or `Set-Content`

```powershell
# Use Out-File
"Hello World" | Out-File -FilePath "C:\Logs\NewLog.txt"

# Use Set-Content
Set-Content -Path "C:\Logs\NewLog.txt" -Value "Hello World"
```

# Find the string in documentation

If you want to find the same idea of `grep` in Powershell, you can try with. Read more at [PowerShell equivalent to grep -f](https://stackoverflow.com/questions/15199321/powershell-equivalent-to-grep-f)

```powershell
# Use Select-String with regex pattern
ipconfig --help | Select-String -Pattern "/all"

# Use findstr function.
# Look the help of function
findstr /?
# Try to find include str
ipconfig --help | findstr /I all
# Uses specified string as a literal search string.
ipconfig --help | findstr /C:"/all"
```

# Command can be used

## `Get-Help`

Use the Get-Help cmdlet to display the syntax of any PowerShell cmdlet

```powershell
# Basic
Get-Help Get-Service

# List example
Get-Help Get-Service -Examples

# Search onl
Get-Help Get-Service -Online
```

## `Get-Service`

Helpful to know what services are installed on the system

```powershell
# Basic
Get-Service

# Pick display name colume
Get-Service | select DisplayName

# Find some service with condition
Get-Service | Where-Object {$_.status -eq "stopped"}
```

## `Get-EventLog`

Actually use PowerShell to parse your machine’s event logs using the Get-EventLog cmdlet

```powershell
# View Application event log
Get-EventLog -Log "Application"

# View Security event log (Admin)
Get-EventLog -Log "Security"
```

## `Get-Process`

Getting a list of available services, it’s often useful to be able to get a quick list of all the currently running processes

```powershell
# Basic
Get-Process

# Get full process (parrent and child)
Get-Process -Name chrome

# You can use Get-Process with combine Stop-Process
Get-Process | Where-Object { $_.Name -eq "myprocess" } | Select-Object -First 1 | Stop-Process
```

## `Format-Table`

 Used to format any output as a table

```powershell
# Format list of process with fit-size
Get-Process | Format-Table -Property Name, CPU, Memory -AutoSize
```

## `Format-List`

Output properties as a list, each on a new line

```powershell
# gets services and lists each individually
Get-Service | Format-List
```

## `Where-Object`

[Where-Object](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/where-object?view=powershell-7.3) is one of the most important cmdlets to know, as it enables you to take a dataset and pass it further down your pipeline for filtering

```powershell
Get-Service | Where-Object {$_.status -eq "stopped"}
```

## `For-Each`

The ForEach-Object cmdlet performs an operation against every item in a specified group of input objects.

```powershell
Get-Process | ForEach-Object {Write-Host $_.name -foregroundcolor cyan}
```

## `Compare-Object`

Useful to be able to compare two objects directly

```powershell
Compare-Object "as" "ax"
```

## `Select-Object`

The Select-Object cmdlet selects the specified properties of a single object or group of objects.

```powershell
Get-Process | Sort-Object name -Descending | Select-Object -Index 0,1,2,3,4
```

## `Get-Member`

One quality that makes PowerShell so versatile is that almost everything in PowerShell is an object consisting of a name, methods, and properties

```powershell
Get-Service | Get-Member
```

![[Pasted image 20240905203709.png]]

## `Get-ChildItem`

 [`Get-ChildItem`](https://www.pdq.com/powershell/get-childitem/) returns all the items in one or more containers

```powershell
# Basic
 Get-ChildItem .\content\

# Filter and include with folder
Get-ChildItem C:\Temp\* -Recurse -Include *taco*.txt
```

## `Out-GridView`

 PowerShell output returns to the console window. However, if you need to interact with the output, you can use the [`Out-GridView`](https://www.pdq.com/powershell/out-gridview/) cmdlet

```powershell
Get-Process | Out-GridView
```

# Base64 Decode and Encode

You can follow this question at [StackOverFlow - How to decode a Base64 string?](https://stackoverflow.com/questions/15414678/how-to-decode-a-base64-string)

**Convert TO Base64**

```powershell
[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes('Motörhead'))
```

**Convert FROM Base64**

```powershell
[Text.Encoding]::Utf8.GetString([Convert]::FromBase64String('TW90w7ZyaGVhZA=='))
```
