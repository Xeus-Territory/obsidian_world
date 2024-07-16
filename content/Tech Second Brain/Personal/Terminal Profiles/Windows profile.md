---
title: Windows profile
tags:
  - powershell
  - terminal-profile
  - helpful
---
>[!summary]
>This is about some configuration to make your effective when work with powershell. This will collection from multiple source, check it out and let's create your favorite shell
>- [Autocomplete in PowerShell](https://techcommunity.microsoft.com/t5/itops-talk-blog/autocomplete-in-powershell/ba-p/2604524)
>- [Fish-like Autosuggestion in Powershell](https://dev.to/animo/fish-like-autosuggestion-in-powershell-21ec)
>- [Oh-my-posh Documentation](https://ohmyposh.dev/docs/)
>- [Oh my posh - Nerdfonts](https://www.nerdfonts.com/)
>- [Powershell Gallery](https://www.powershellgallery.com/)
>- [Chocolatey Package](https://community.chocolatey.org/packages)
>- [Unikey](https://www.unikey.org/en/download.html)
>- [winget tool](https://learn.microsoft.com/en-us/windows/package-manager/winget/)
>- [Font-installing.ps1](https://gist.github.com/anthonyeden/0088b07de8951403a643a8485af2709b)

When you need to setup those things, you need to be consider for install some thing, like

- [Windows Terminal](https://github.com/microsoft/terminal)
- [Chocolatey](https://chocolatey.org/install) 

For install `Chocolatey`, you can use one-line command with `Administrator` of your `powershell`

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

Install some common module for your `powershell` terminal

```powershell
# Install git
choco install git

# Install vscode
choco install vscode

# Install Oh-my-posh
# Documentation: https://ohmyposh.dev/docs/installation/windows
choco install oh-my-posh

# Install powertoys
# Documentation: https://learn.microsoft.com/en-us/windows/powertoys/install
winget install Microsoft.PowerToys --source winget

# Optional: You can install winget 3.0.0 beta UI for easily managed
# Documentation: https://github.com/marticliment/WingetUI
choco install wingetui
```

You need to configure `profile` for apply the plugin for your `powershell` by run

```powershell
notepad $PROFILE
```

Click or enter for `yes` optional when your terminal not exist these one

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

To understand more about `powershell`, come and take a look on

- [[Powershell Snippets]]
- [[Tech Second Brain/Operation System/Helpful Pages & Articles#Window|Windows Helpful Pages & Articles]]
