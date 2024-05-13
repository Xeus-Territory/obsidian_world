---
title: Backup
tags:
  - admin
  - devops
  - azure
  - cloud-services
---
# What is Azure Backup ?

Reference resource

- [Describe Azure Backup benefits](https://learn.microsoft.com/en-us/training/modules/configure-file-folder-backups/2-describe-azure-backup-benefits)

>[!info]
>Azure Backup is the Azure-based service you can use to back up (or protect) and restore your data in the Microsoft cloud. Azure Backup replaces your existing on-premises or off-site backup solution with a cloud-based solution that's reliable, secure, and cost-competitive.

When you use Azure Backup service, you can be gotten this functionality from them, such as

- Offload on-premises backup
- Back up Azure IaaS VMs
- Get unlimited data transfer
- Keep data secure
- Get app-consistent backups
- Retain short and long-term data
- Automatic storage management
- Multiple storage options

# Backup centers

![[Pasted image 20240513140726.png]]

Reference resource

- [Implement Backup Center for Azure Backup](https://learn.microsoft.com/en-us/training/modules/configure-file-folder-backups/3-implement-azure-backup-center)
- [Configure Azure Recovery Services vault backup options](https://learn.microsoft.com/en-us/training/modules/configure-file-folder-backups/4-setup-recovery-service-vault-backup-options)
- [Use the Microsoft Azure Recovery Services (MARS) agent](https://learn.microsoft.com/en-us/training/modules/configure-file-folder-backups/5-mars-backup-agent)

>[!info]
>Azure Backup provides a single unified management experience in Azure. Enterprises can govern, monitor, operate, and analyze their backups at scale. The Backup center interface is consistent with Azure's native management experiences.

## Recovery Service vaults

>[!info]
>Recovery Services vault is a storage entity in Azure that stores data. Recovery Services vaults make it easy to organize your backup data, while minimizing management overhead.

Characteristics of Recovery Services vaults

- Can be used to back up Azure Files file shares or on-premises files and foldes.
- Store backup data for various Azure services, such as IaaS virtual machines (Linux or Windows) and Azure SQL in Azure VMs.
- Support System Center Data Protection Manager, Windows Server, Azure Backup Server, and other services.
- Can create a Recovery Services vault from the Backup center dashboard.

Configuring Recovery Services vaults, and replicated

- When use Azure Backup for Azure Files file shares, don't need configure the storage replication type

>[!info]
>Azure Files backup is snapshot-based, and no data is transferred to the vault. Snapshots are stored in the same Azure storage account as your backed-up file share.

- Use Backup center for configure replication for Recovery Service, under **Properties** > **Backup Configuration** > **Update**.
- There are 3 replication options: **Geo-redundant, locally redundant, and zone redundant**

![[Pasted image 20240513141851.png]]

- Can also specify how to restore data in a secondary, Azure paired region by enabling the Cross Region Restore.

>[!warning]
>You must change the storage replication type for your Recovery Services vault before you try to configure a backup in the vault. After you configure a backup, the option to modify the replication type is disabled.

 <iframe width="600" height="315"
src="https://www.youtube.com/embed/PcJ6fMcrcrg">
</iframe> 

## Microsoft Azure Recovery Services (MARS) agent

>[!info]
>Azure Backup uses the MARS agent to backup system data from on-premises machines and virtual machine. It offers many benefits for both backup and restoring

![[Pasted image 20240513142413.png]]

Characteristics of the MARS agent

- Can be installed on your Windows client or Windows Server
- The data that's available for backup depends on where you install and run the MARS agent.
- You can back up files and folders on Windows virtual machines or physical machines. Virtual machines can be on-premises or in Azure.
- Doesn't require a separate backup server.
- Isn't application-aware. You can restore files and folders from backups, or do a volume-level restore.

There are several ways you can run the MARS agent.

- **On-premises direct backup**
- **Back up for specific files or folders**
- **Back up to MABS or System Center DPM**

You can follow this instruction for [configuring on-premises file and folder backups](https://learn.microsoft.com/en-us/training/modules/configure-file-folder-backups/6-configure-backups)

Lab: https://learn.microsoft.com/en-us/training/modules/configure-file-folder-backups/7-interactive-lab-simulation
