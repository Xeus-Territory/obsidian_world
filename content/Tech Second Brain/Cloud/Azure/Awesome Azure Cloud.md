---
title: The awesome of Azure Cloud
tags:
  - cheatsheet
  - helpful
  - azure
  - cloud-services
---
# Why I am choose Azure ?

![[icon-azure.png]]
>[!quote]
>To be honestly, Although I try some cloud platforms from basic to complicate, Azure has priority when I want use computing. This platform support more services, tools, utility which helpful a lot for uses. Not comparison between multiple Cloud platforms, In this series, I want to contribute why I choose Azure, what helpful services, some top of architecture and infrastructure, role of Azure Cloud with DevOps, Developers, ... and what I archive when doing with Azure

![[azure-general.png]]
<div align="center">
    <strong><em><p style="text-align: center;"><a href="https://iamguptarishi.wordpress.com/2019/03/04/a-walkthrough-of-azure-services/">A walkthrough of Azure Services</a></p></em></strong>
</div>

![[azure-services-decision.png]]
<div align="center">
    <strong><em><p style="text-align: center;"><a href="https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/compute-decision-tree">Choose an Azure compute service</a></p></em></strong>
</div>

![[azure-level-management.png|center|500]]
<div align="center">
	<strong><em><p style="text-align: center;"><a href="https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-setup-guide/organize-resources">Organize your Azure resources effectively</a></p></em></strong>
</div>

What you can find out and figure out about Azure, Cloud Computing, Documentation, Services and more, Link is down-below 🤝

## Architecture

- [Azure - Browse Azure Architectures](https://learn.microsoft.com/en-us/azure/architecture/browse/)
- [Azure - Sample Code from Microsoft Developer Tools](https://learn.microsoft.com/en-us/samples/browse/)
- [Azure - Well-Architected Framework](https://learn.microsoft.com/en-us/azure/well-architected/)
- [Azure - Application architecture fundamentals](https://learn.microsoft.com/en-us/azure/architecture/guide/)
## Community

- [Azure - Blog](https://azure.microsoft.com/en-us/blog/)
- [Azure - Tech Community](https://techcommunity.microsoft.com/)
- [Azure - Azure Category Community](https://techcommunity.microsoft.com/t5/azure/ct-p/Azure)
- [Azure - Architecture Blog](https://techcommunity.microsoft.com/t5/azure-architecture-blog/bg-p/AzureArchitectureBlog)
## General

- [Wikipedia - Microsoft Azure](https://en.wikipedia.org/wiki/Microsoft_Azure)
- [Azure - Documentation](https://learn.microsoft.com/en-us/azure/?product=popular)
- [Azure - Technical documentation](https://learn.microsoft.com/en-us/docs/)
- [Azure - Learning Platform](https://learn.microsoft.com/en-us/training/azure/)
- [Azure - Register Account](https://azure.microsoft.com/en-us/free)
## Utilities

- [Azure CLI - User Guide](https://learn.microsoft.com/en-us/cli/azure/reference-index?view=azure-cli-latest)
- [Azure Price Calculator](https://azure.microsoft.com/en-gb/pricing/calculator/)

>[!info]
>If you want to receive the credit from VS Subscription, you can direct use via [Monthly Azure credits for Visual Studio subscribers](https://azure.microsoft.com/en-us/pricing/member-offers/credit-for-visual-studio-subscribers)

# Awesome Azure Repository

## Repository

- [Awesome Microsoft Azure Architecture](https://github.com/lukemurraynz/awesome-azure-architecture) - A curated list of AWESOME blogs, videos, tutorials, code, tools, and scripts related to the design and implementation of solutions in Microsoft Azure.
- [Azure Resource Manager QuickStart Templates](https://github.com/Azure/azure-quickstart-templates) - Azure Quickstart Templates about `azure-arm` or `bicep`
## Page

- [Azure Verified Modules](https://azure.github.io/Azure-Verified-Modules/) - An initiative to consolidate and set the standards for what a good Infrastructure-as-Code module looks like.
## Organization

- [Microsoft Azure](https://github.com/Azure) - APIs, SDKs and open source projects from Microsoft Azure
- [Microsoft Docs](https://github.com/MicrosoftDocs) - The modern documentation service for Microsoft
- [Azure Samples](https://github.com/Azure-Samples) - Microsoft Azure code samples and examples in .NET, Java, Python, JavaScript, TypeScript, PHP and Ruby
# Blogs, Articles and Videos

## Articles

- [Azure - Technology choices for Azure solutions](https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/technology-choices-overview)
- [Azure - Subscription and Service Limits, Quotas, and Constraints](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/azure-subscription-service-limits)
- [Azure - Web applications architecture design](https://learn.microsoft.com/en-us/azure/architecture/web-apps/)
## Blogs

- [Medium - Dave R - Microsoft Azure & AI MVP☁️](https://blog.azinsider.net/)
- [Medium - Jiadong Chen](https://jiadong-chen.medium.com/)
# Azure CLI

## az vm

### Create virtual machine

Documentation: [az vm create](https://learn.microsoft.com/en-us/cli/azure/vm?view=azure-cli-latest#az-vm-create)

```bash
az vm create -n MyVm -g MyResourceGroup --image Ubuntu2204
```

## az acr

### Login to your acr

Documentation: [Authenticate with an Azure container registry](https://learn.microsoft.com/en-us/azure/container-registry/container-registry-authentication?tabs=azure-cli) and [az acr login](https://learn.microsoft.com/en-us/cli/azure/acr?view=azure-cli-latest#az-acr-login)

```bash
az acr login --name acrname
```

## az containerapp

### Update new information for containerapp

Documentation: [az containerapp update](https://learn.microsoft.com/en-us/cli/azure/containerapp?view=azure-cli-latest#az-containerapp-update)

```bash
# Use two env first is your selection, second is get from secrets
az containerapp update --name containerappName \
--resource-group rg --image img_locate \
--set-env-vars "ASPNETCORE_ENVIRONMENT=$(environmentApplication)" \
"ConnectionStrings__Default=secretref:db-connection-string"
```

### Exec to container app

Documentation: [az containerapp exec](https://learn.microsoft.com/en-us/cli/azure/containerapp?view=azure-cli-latest#az-containerapp-exec)

>[!note]
>Execution when you have only one container and one revision

```bash
az containerapp exec -n my-containerapp -g MyResourceGroup --command bash
```

>[!note]
>Execution when you have specified one container and one revision in one of those

```bash
az containerapp exec -n my-containerapp -g MyResourceGroup --replica MyReplica --revision MyRevision
```

# Azure Virtual Machine

## Add a new disk for your `linux` virtual machine

You can check about that via [Azure Article - Use the portal to attach a data disk to a Linux VM](https://learn.microsoft.com/en-us/azure/virtual-machines/linux/attach-disk-portal) or [Azure Article - Add a disk to a Linux VM](https://learn.microsoft.com/en-us/azure/virtual-machines/linux/add-disk?tabs=ubuntu)

1. Add a new disk with portal or `azcli`
2. Login to your machine with `ssh`, try to find your disk with not formatted yet via `lsblk`

	```shell
	lsblk -o NAME,HCTL,SIZE,MOUNTPOINT | grep -i "sd"
	```

	![[Pasted image 20240620102257.png|center]]

	`sdc` disk actually not mount, that target disk you need to format and attach to your machine

3. Partition the disk when you attach a new one, you can follow instruction about [Create a Partition in Linux - A Step-by-Step Guide](https://www.digitalocean.com/community/tutorials/create-a-partition-in-linux), [Prepare a new empty disk](https://learn.microsoft.com/en-us/azure/virtual-machines/linux/attach-disk-portal#prepare-a-new-empty-disk),  [https://phoenixnap.com/kb/linux-format-disk](https://phoenixnap.com/kb/linux-format-disk) to understand way to handle that

	```shell
	sudo parted /dev/sdc --script mklabel gpt mkpart xfspart xfs 0% 100%
	sudo mkfs.xfs /dev/sdc1
	sudo partprobe /dev/sdc1
	```

4. Mount your partition disk into the directories of machine via `mount`

	```bash
	sudo mount /dev/sdc1 /root
	```

	![[Pasted image 20240620104104.png]]

5. Check your disk is add to `/etc/fstab`, you can use `blkid` to handle that

	```bash
	sudo blkid
	```

	![[Pasted image 20240620104730.png]]

>[!info]
>In my situation, when mount to `/` instead of `/root`, It makes some change and gave you new definition for your current route, mean `/dev/sdc1` will replace default disk and can be cause the problem, I think 😄. Just `umount` and repeat `mount` again

After that you can be make some mistake but if you want grant permission, you can continue for your progress in down below

```bash
# Change ownership of your drive
sudo chown <your-username> /dev/sda3

# Change mount write permission
# NOTE: Umount before to do
sudo umount /dev/sda3
sudo mount -o /dev/sda3 /my-drive-locate

# Change permission of your file inside to user
sudo chown -R <user>:<group> /my-drive-locate
```

And now you can use it like usual disk