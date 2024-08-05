---
title: Powershell script collection
tags:
  - command
  - powershell
  - DIY
  - devops
---
# Build Azure Agent with .NET Core by Powershell

>[!summary]
>This article will tell you how to use powershell script below, why it creates and release. Go check it in article ▶️ ▶️ [Setup the virtual machine Linux and Windows for Agents and Azure-Pipelines](https://hackmd.io/@XeusNguyen/S1BrSRPW6)

```powershell title="dotnet_azure_agent.ps1"
# Initialized parameter for the script
$localTempDir = $env:TEMP
$chromeInstaller = "ChromeInstaller.exe"
$Process2Monitor = "ChromeInstaller"
$zipfileDownload = "vsts-agent-win-x64-3.220.5.zip"
$powershellInstaller = "dotnet-install.ps1"

# Initialized parameter for agent specific
$URL_TFS = "${url}"
$AUTH_TYPE = "${auth}"
$TOKEN_AUTH = "${token}"
$POOL_AGENT = "${pool}"
$NAME_AGENT = "${agent}"
$WORKDIR = "${workdir}"

# Export environment variables for validation
[System.Environment]::SetEnvironmentVariable('AGENT_ALLOW_RUNASROOT', 1)
[System.Environment]::SetEnvironmentVariable('AZP_AGENT_DOWNGRADE_DISABLED', $true)

# Install Chrome 
(New-Object System.Net.WebClient).DownloadFile('http://dl.google.com/chrome/install/375.126/chrome_installer.exe', "$LocalTempDir\$ChromeInstaller")
& "$localTempDir\$ChromeInstaller" /silent /install
Do {
    $ProcessesFound = Get-Process | Where-Object { $Process2Monitor -contains $_.Name } | Select-Object -ExpandProperty Name
    If ($ProcessesFound) { "Still running: $($ProcessesFound -join ', ')" | Write-Host; Start-Sleep -Seconds 2 }
    else { Remove-Item "$LocalTempDir\$ChromeInstaller" -ErrorAction SilentlyContinue -Verbose } 
} Until (!$ProcessesFound)

# Install dotnet
mkdir "$env:CommonProgramFiles\dotnet"
Invoke-WebRequest "https://dot.net/v1/$powershellInstaller" -OutFile "$localTempDir\$powershellInstaller"
& "$localTempDir\$powershellInstaller" -Runtime dotnet -Version 7.0.9 -InstallDir "$env:ProgramFiles\dotnet"
dotnet --info
& "$localTempDir\$powershellInstaller" -Version 7.0.306 -Channel 7.0.9 -InstallDir "$env:ProgramFiles\dotnet"
dotnet --version
setx PATH "$env:path;$env:ProgramFiles\dotnet" -m

# Install Azure-CLI and Azureps (Availability for pipelines)
# Install Azure-CLI (Not needed but for sure)
Invoke-WebRequest -Uri https://aka.ms/installazurecliwindows -OutFile .\AzureCLI.msi; Start-Process msiexec.exe -Wait -ArgumentList '/I AzureCLI.msi /quiet'; Remove-Item .\AzureCLI.msi
# Install Azureps
Install-PackageProvider -Name NuGet -MinimumVersion 2.8.5.201 -Force
Install-Module -Name Azure, Azure.Storage, AzureRM -Repository PSGallery -AllowClobber -Force
(Get-Module -ListAvailable | Where-Object { $_.Name -eq 'Azure' }) ` | Select-Object Version, Name, Author, PowerShellVersion  | Format-List;
(Get-Module -ListAvailable | Where-Object { $_.Name -eq 'AzureRM' }) ` | Select-Object Version, Name, Author, PowerShellVersion  | Format-List;

# Connect to Pool and Create a new Agent
Set-Location C:\
mkdir agent
Set-Location agent
(New-Object System.Net.WebClient).DownloadFile('https://vstsagentpackage.azureedge.net/agent/3.220.5/vsts-agent-win-x64-3.220.5.zip', "$LocalTempDir\$zipfileDownload")
Add-Type -AssemblyName System.IO.Compression.FileSystem ; [System.IO.Compression.ZipFile]::ExtractToDirectory("$LocalTempDir\$zipfileDownload", "$PWD")
.\config.cmd --unattended --url "$URL_TFS" --auth "$AUTH_TYPE" --token "$TOKEN_AUTH" --pool "$POOL_AGENT" --agent "$NAME_AGENT" --work "$WORKDIR"

# Create the EOF file for saving the file for later execution
@"
# Create the the schedule job
Register-ScheduledJob -Trigger (New-JobTrigger -AtStartup -RandomDelay 00:00:30) -Name agentRun -ScriptBlock { C:\agent\run.cmd }
# Restart computer for the first time
Restart-Computer
"@ | Out-File "C:\Users\startup.ps1"

# Check the file exists
Get-Content -Path "C:\Users\startup.ps1"

# Step to setup the Windows guest agent paricipation in sysprep process - (Must be exist for complete build Image for Windows Azure VM)
while ((Get-Service RdAgent).Status -ne 'Running') { 
    Start-Sleep -s 5 
}
while ((Get-Service WindowsAzureGuestAgent).Status -ne 'Running') { 
    Start-Sleep -s 5 
}
& $env:SystemRoot\\System32\\Sysprep\\Sysprep.exe /oobe /generalize /quiet /quit
while ($true) { 
    $imageState = Get-ItemProperty HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Setup\\State | Select-Object ImageState
    if ($imageState.ImageState -ne 'IMAGE_STATE_GENERALIZE_RESEAL_TO_OOBE') { 
        Write-Output $imageState.ImageState
        Start-Sleep -s 10 
    } 
    else { 
        break 
    } 
}
```
