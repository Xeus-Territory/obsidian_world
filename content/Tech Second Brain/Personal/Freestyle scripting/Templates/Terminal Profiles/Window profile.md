---
title: Window profile
tags:
  - powershell
  - terminal-profile
  - helpful
---
>[!summary]
>This is about some configuration to make your effective when work with powershell. This will collection from multiple source, I will update ASAP

```powershell title="Microsoft.PowerShell_profile.ps1"
## To running this script - need to bypass restricted
## RUN THIS COMMAND VIA ADMINSTRATOR PWSH: Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

# Set the autosuggestion and autocomplete in pwsh
# Install before running (Administrator running)
# Install-Module PSReadLine -RequiredVersion 2.1.0

Import-Module PSReadLine
Set-PSReadLineOption -PredictionSource History

# Shows navigable menu of all options when hitting Tab
# Default not need to downloading
Set-PSReadlineKeyHandler -Key Tab -Function MenuComplete

# Set the autosuggestion git in pwsh
# Install before used for preventing error
# PowerShellGet\Install-Module posh-git -Scope CurrentUser -Force

Add-PoshGitToProfile -AllHosts -Force

## Set oh-my-posh theme for powershell
# Install this oh-my-posh from website: https://ohmyposh.dev/ or windows store
oh-my-posh init pwsh | Invoke-Expression
```