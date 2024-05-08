---
title: Azure Cloud Shell
tags:
  - admin
  - devops
  - azure
  - cloud-services
---
# What is Cloud Shell ?

Reference resource

- [How does Azure Cloud Shell work?](https://learn.microsoft.com/en-us/training/modules/intro-to-azure-cloud-shell/3-how-azure-cloud-shell-works) 

>[!info]
>Azure Command Line is designed for further use in Azure Portals instead of your machine. 

You can access Cloud shell with some ways, like 

- From a direct link: [https://shell.azure.com](https://shell.azure.com/)

![[Pasted image 20240509095747.png]]

![[Pasted image 20240509095657.png]]

- From the Azure portal
- From code snippets when accessing Microsoft Learn

>[!warning]
>Cloud Shell sessions terminate after 20 minutes of inactivity. When a session terminates, files on your CloudDrive are persisted, but you need to start a new session to access the Cloud Shell environment.

# Feature

You can interact with Cloud Shell with same experience like your Terminal or `Powershell`, with few optional for your choose: `Bash` or `Powershell`

![[Pasted image 20240509100206.png]]

You can upload script from your machine to Cloud shell, and it can help you execute them on current shell

![[Pasted image 20240509100255.png]]

You can open editor like `VSCode` on Cloudshell, very convenient and helpful when you want to make a change on the file but not familiar with shell editor like `Vim` or `nano`

![[Pasted image 20240509100531.png]]

# Cloud shell tools

When you create new shell, currently shell will help you install and provide those tools for helpful and convenient for working on platform

|Category|Name|
|---|---|
|**Linux tools**|bash  <br>zsh  <br>sh  <br>tmux  <br>dig|
|**Azure tools**|Azure CLI and [Azure classic CLI](https://github.com/Azure/azure-xplat-cli)  <br>AzCopy  <br>Azure Functions CLI  <br>Service Fabric CLI  <br>Batch Shipyard  <br>blobxfer|
|**Text editors**|code (Cloud Shell editor)  <br>vim  <br>nano  <br>emacs|
|**Source control**|git|
|**Build tools**|make  <br>maven  <br>npm  <br>pip|
|**Containers**|Docker Machine  <br>Kubectl  <br>Helm  <br>DC/OS CLI|
|**Databases**|MySQL client  <br>PostgreSql client  <br>sqlcmd Utility  <br>mssql-scripter|
|**Other**|iPython Client  <br>Cloud Foundry CLI  <br>Terraform  <br>Ansible  <br>Chef InSpec  <br>Puppet Bolt  <br>HashiCorp Packer  <br>Office 365 CLI|


