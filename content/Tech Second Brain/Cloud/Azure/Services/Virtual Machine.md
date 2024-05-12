---
title: Azure Virtual Machine
tags:
  - devops
  - admin
  - azure
  - cloud-services
---
# What is Azure Virtual Machine ?

Reference resource

- [Review cloud services responsibilities](https://learn.microsoft.com/en-us/training/modules/configure-virtual-machines/2-review-cloud-services-responsibilities?source=learn)

![[Pasted image 20240511180102.png]]

>[!info]
>Azure Virtual Machines is the basis of the Azure infrastructure as a service (IaaS) model. IaaS is an instant computing infrastructure, provisioned and managed over the internet.
>
>Its own operating system, storage, and networking capabilities, and can run a wide range of applications. With VM, you can implementation, configuration for doing your purpose like software, workspace or anything. It can easily to scale up and have multiple selection base on your paid

With Azure VM, It has multiple things you need to consider when pick some machine for your shell, such as

- Start with the network.
- Choose a name for the virtual machine.
- Decide the location for the virtual machine.
- Determine the size of the virtual machine.
- Review the pricing model and estimate your costs.
- Identify which Azure Storage to use with the virtual machine.
- Select an operating system for the virtual machine.

For more detail, you can take a look on [Plan virtual machines](https://learn.microsoft.com/en-us/training/modules/configure-virtual-machines/3-plan) , [Determine virtual machine sizing](https://learn.microsoft.com/en-us/training/modules/configure-virtual-machines/4-determine-virtual-machine-sizing),[Determine virtual machine storage](https://learn.microsoft.com/en-us/training/modules/configure-virtual-machines/5-determine-virtual-machine-storage)


>[!warning]
>But more important, it will cause more effected or not base on your selection, you need to choose the virtual machine base on your purpose, because when you not use most of power of machine, money you paid for it will be wasted
>
>Like image above, It separates to multiple type with multiple purpose, you can take a look, and give a decision, via
>- [Virtual Machine series](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/)
>- [Virtual Machines Pricing](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/linux/)

About the storage, Azure is supporting some storage style, and disks can be most used by Virtual machine but it has another type

>[!info]
>All Azure virtual machines have at least two disks: an operating system disk and a temporary disk. Virtual machines can also have one or more data disks. All disks are stored as virtual hard disks (VHDs). A VHD is like a physical disk in an on-premises server but, virtualized.

>[!info]
>Some information about Disks in Azure
>- OS Disk registered with SATA drive, and label `C:`
>- Temp Disk, data can be lost and shouldn't be data that critical to the system, with Window usually label `D:`, and store `pagefile.sys`. With Linux, disk is mounting into `/dev/sdb` by Azure Linux Agent
>- Data disk is a managed disk that's attached to a virtual machine to store application data, or other data you need to keep. Data disks are registered as SCSI drives and are labeled with a letter you choose. 

>[!warning]
>The size of a virtual machine determines how many data disks you can attach and the type of storage you can use to host the data disks. On my situation, you will met the problems when `kubernetes` node use more disk than set-number

# Implementation

You can take a look this instruction to figure out what you need to do when implementation virtual machine, via [Create virtual machines in the Azure portal](https://learn.microsoft.com/en-us/training/modules/configure-virtual-machines/6-create-portal)

 <iframe width="600" height="315"
src="https://www.youtube.com/embed/QOv_-xBXkpo">
</iframe> 

# Connect to virtual machine

Reference resource

- [Connect to virtual machines](https://learn.microsoft.com/en-us/training/modules/configure-virtual-machines/7-connect-to)

>[!info]
>There are several ways to connecting virtual machine, and with Azure, It also provide same method but we can implementation more secure for connection with `Bastion Host`.

![[Pasted image 20240512131115.png]]

The `Azure Bastion` service is a fully platform-managed `PaaS` service. Azure Bastion provides secure and seamless `RDP/SSH` connectivity to your virtual machines directly over `SSL`. When you connect via Azure Bastion, your virtual machines don't need a public IP address.

 <iframe width="600" height="315"
src="https://www.youtube.com/embed/epWKTGGa_wY">
</iframe> 

>[!summary]
>
>Azure Bastion protects your virtual machines from exposing RDP/SSH ports to the outside world while still providing secure access with RDP/SSH, you just need Azure Portals to access the virtual machine. That all 👍

With Window, you can connect it with `RDP` and open on port `3389`. With Linux machine, you can use `SSH` open on port `22` for connecting to virtual machine, also you can use password or private key for authentication and secure your access

>[!question]
>1. Which virtual machine is best for running a network appliance?  **Compute-optimized virtual machine**
>2. For the security requirements, how can you connect to Azure Linux virtual machines and install software? **Configure Azure Bastion.**
>3. What effect do the default network security settings have on a new virtual machine? **Outbound requests are allowed. Inbound traffic is allowed only from within the virtual network.**



