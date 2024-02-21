---
title: powershell-profile
tags:
  - powershell
  - terminal-profile
  - helpful
---
*This is about some configuration to make your effective when work with powershell. This will collection from multiple source, I will update ASAP*

```powershell
## To running this script - need to bypass restricted
## RUN THIS COMMAND VIA ADMINSTRATOR PWSH: Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

# Set the autosuggestion in pwsh
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
```