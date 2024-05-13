---
title: Virtual Machine
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

![[Pasted image 20240513131127.png]]

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

Training: [Create a Windows virtual machine in Azure](https://learn.microsoft.com/en-us/training/modules/create-windows-virtual-machine-in-azure/)

# Backup and restore

Reference resource

- [Explore options to protect virtual machine data](https://learn.microsoft.com/en-us/training/modules/configure-virtual-machine-backups/2-protect-data)
- [Create virtual machine snapshots in Azure Backup](https://learn.microsoft.com/en-us/training/modules/configure-virtual-machine-backups/3-create-snapshots)
- [Set up Azure Recovery Services vault backup options](https://learn.microsoft.com/en-us/training/modules/configure-virtual-machine-backups/4-setup-recovery-services-vault-backup-options)

>[!info]
>Azure Backup provides independent and isolated backups to guard against unintended destruction of the data on your virtual machines. Administrators can implement Azure services to support their backup requirements, including the Microsoft Azure Recovery Services (MARS) agent for Azure Backup, the Microsoft Azure Backup Server (MABS), Azure managed disks snapshots, and Azure Site Recovery.

Backup options for virtual machines

|**Azure backup option**|**Configuration scenarios**|**Description**|
|---|---|---|
|**Azure Backup**|_Back up Azure virtual machines running production workloads_  <br>  <br>_Create application-consistent backups for both Windows and Linux virtual machines_|Azure Backup takes a snapshot of your virtual machine and stores the data as recovery points in geo-redundant recovery vaults. When you restore from a recovery point, you can restore your entire virtual machine or specific files only.|
|**Azure Site Recovery**|_Quickly and easily recover specific applications_  <br>  <br>_Replicate to the Azure region of your choice_|Azure Site Recovery protects your virtual machines from a major disaster scenario when a whole region experiences an outage due to a major natural disaster or widespread service interruption.|
|**Azure managed disks - snapshot**|_Quickly and easily back up your virtual machines that use Azure managed disks at any point in time_  <br>  <br>_Support development and test environments_|An Azure managed disks snapshot is a read-only full copy of a managed disk that's stored as a standard managed disk by default. A snapshot exists independent of the source disk and can be used to create new managed disks. Each snapshot is billed based on the actual size used. If you create a snapshot of a managed disk with a capacity of 64 GB that's used only 10 GB, you're billed for 10 GB.|
|**Azure managed disks - image**|_Create an image from your custom VHD in an Azure storage account or directly from a generalized (via Sysprep) virtual machine_  <br>  <br>_Create hundreds of virtual machines by using your custom image without copying or managing any storage account_|Azure managed disks also support creating a managed custom image. This process captures a single image that contains all managed disks associated with a virtual machine, including both the operating system and data disks.|

![[Pasted image 20240513152138.png]]

An Azure Backup job creates a snapshot for your virtual machine in two phases:

- Phase 1: Take a snapshot of the virtual machine data
- Phase 2: Transfer the snapshot to an Azure Recovery Services vault

Characteristics of snapshots and recovery points in Azure Backup

- By default, Azure Backup keeps snapshots for two days to reduce backup and restore times, local retention reduces the time required to transform and copy data back
- You can set the default snapshot retention value from one and five days.
- Incremental snapshots are stored as Azure page blobs (Azure Disks).
- Recovery points for a virtual machine snapshot are available only after both phases of the Azure Backup job are complete.
- Recovery points are listed for the virtual machine snapshot in the Azure portal and are labeled with a _recovery point type_.
- After a snapshot is first taken, the recovery points are identified with the **snapshot** recovery point type.
- After the snapshot is transferred to an Azure Recovery Services vault, the recovery point type changes to **snapshot and vault**.

You can follow the instruction for [Back up your virtual machines](https://learn.microsoft.com/en-us/training/modules/configure-virtual-machine-backups/5-backup-virtual-machines), and [Restore your virtual machines](https://learn.microsoft.com/en-us/training/modules/configure-virtual-machine-backups/6-restore-virtual-machines), [Implement soft delete for your virtual machines](https://learn.microsoft.com/en-us/training/modules/configure-virtual-machine-backups/9-manage-soft-delete)

![[Pasted image 20240513153322.png]]

<div align="center">
    <strong><em><p style="text-align: center;">Soft delete option for Azure Blob objects</p></em></strong>
</div>

>[!note]
>- Apply soft-delete state will keep data retained for 14 days
>- What is the retention period of virtual machine backups in the default backup policy?  30 days 

>[!question]
>What's the best backup method for the company's production virtual machines?  **Azure Backup**

Summary about VM backup, you can follow [this article](https://learn.microsoft.com/en-us/training/modules/configure-virtual-machine-backups/13-summary-resources)

Virtual Machine type which supported by Azure Backup

Documentation: [Support matrix for Azure VM backups](https://learn.microsoft.com/en-us/azure/backup/backup-support-matrix-iaas)

![[Pasted image 20240515142354.png]]

![[Pasted image 20240515142523.png]]
# Monitoring

Reference resource

- [Monitoring for Azure VMs](https://learn.microsoft.com/en-us/training/modules/monitor-azure-vm-using-diagnostic-data/2-monitor-vm-health)
- [Monitor VM host data](https://learn.microsoft.com/en-us/training/modules/monitor-azure-vm-using-diagnostic-data/3-exercise-create-virtual-machine)
- [Use Metrics Explorer to view detailed host metrics](https://learn.microsoft.com/en-us/training/modules/monitor-azure-vm-using-diagnostic-data/4-view-host-metrics)
- [Collect client performance counters by using VM insights](https://learn.microsoft.com/en-us/training/modules/monitor-azure-vm-using-diagnostic-data/5-enable-vm-insights)
- [Collect VM client event logs](https://learn.microsoft.com/en-us/training/modules/monitor-azure-vm-using-diagnostic-data/6-collect-log-data)

Azure VMs have several layers that require monitoring. Each of the following layers has a distinct set of telemetry and monitoring requirements.

- Host VM
- Guest operating system (OS)
- Client workloads
- Applications that run on the VM

![[Pasted image 20240513173221.png]]

## Understand Metrics Explorer

To open Metrics Explorer, you can:

- Select **Metrics** from the VM's left navigation menu under **Monitoring**.
- Select the **See all Metrics** link next to **Platform metrics** on the **Monitoring** tab of the VM's **Overview** page.
- Select **Metrics** from the left navigation menu on the Azure Monitor **Overview** page.

![[Pasted image 20240513173621.png]]

In Metrics Explorer, you can select the following values from the dropdown fields:

- **Scope:** If you open Metrics Explorer from a VM, this field is prepopulated with the VM name. You can add more items with the same resource type (VMs) and location.
- **Metric Namespace**: Most resource types have only one namespace, but for some types, you must pick a namespace. For example, storage accounts have separate namespaces for files, tables, blobs, and queues.
- **Metric**: Each metrics namespace has many metrics available to choose from.
- **Aggregation**: For each metric, Metrics Explorer applies a default aggregation. You can use a different aggregation to get different information about the metric.

You can apply the following aggregation functions to metrics:

- **Count**: Counts the number of data points.
- **Average (Avg)**: Calculates the arithmetic mean of values.
- **Maximum (Max)**: Identifies the highest value.
- **Minimum (Min)**: Identifies the lowest value.
- **Sum**: Adds up all the values.

>[!question]
>Which of these parameters isn't included in the dropdown fields when you define a Metrics Explorer graph? **Time range**
>
>What's a quick way to install the Azure Monitor Agent to collect guest OS metrics?  **Select the Azure Monitor Agent when you enable VM insights.**
>
>What capabilities does enabling VM insights provide?  **Prebuilt client performance workbooks and guest OS metrics.**
## Create a DCR to collect log data

In the Azure portal, search for and select _monitor_ to go to the Azure Monitor **Overview** page.

![[Pasted image 20240513174302.png]]


>[!question]
> How can you view log data collected by a DCR? **By using a KQL query in your Log Analytics workspace.**


Summary: https://learn.microsoft.com/en-us/training/modules/monitor-azure-vm-using-diagnostic-data/7-summary

# Questions

1. Your company also has an on-premises Hyper-V server that hosts a VM, named VM1, which must be replicated to Azure. How can be achieve this goal

	For physical servers - Storage Account - Azure Recovery Services Vault - Replication policy https://docs.microsoft.com/en-us/azure/site-recovery/physical-azure-disaster-recovery For Hyper-v server - Hyper-V site - Azure Recovery Services Vault - Replication policy https://docs.microsoft.com/en-nz/azure/site-recovery/hyper-v-prepare-on-premises-tutorial

2. 