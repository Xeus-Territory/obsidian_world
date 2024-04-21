---
title: Account identity, Users and Groups with Azure
tags:
  - devops
  - azure
  - admin
---
# User accounts

| User account                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cloud identity**                  | A user account with a _cloud identity_ is defined only in Microsoft Entra ID. This type of user account includes administrator accounts and users who are managed as part of your organization. A cloud identity can be for user accounts defined in your Microsoft Entra organization, and also for user accounts defined in an external Microsoft Entra instance. When a cloud identity is removed from the primary directory, the user account is deleted. |
| **Directory-synchronized identity** | User accounts that have a _directory-synchronized identity_ are defined in an on-premises Active Directory. A synchronization activity occurs via Microsoft Entra Connect to bring these user accounts in to Azure. The source for these accounts is Windows Server Active Directory.                                                                                                                                                                         |
| **Guest user**                      | _Guest user_ accounts are defined outside Azure. Examples include user accounts from other cloud providers, and Microsoft accounts like an Xbox LIVE account. The source for guest user accounts is Invited user. Guest user accounts are useful when external vendors or contractors need access to your Azure resources.                                                                                                                                    |
# Identity accounts

Documentation: [How to create, invite, and delete users](https://learn.microsoft.com/en-us/entra/fundamentals/how-to-create-delete-users)

Several ways to add cloud identity user accounts in Microsoft Entra ID

- Portal
- 365 Admin Center
- Admin console 
- Azure CLI

![[Pasted image 20240416135429.png]]

>[!info]
>The administrator can Create a user within the organization or Invite a guest user to provide access to organization resources

# Bulk user accounts

Documentation: [Azure - Bulk create users in Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity/users/users-bulk-add)

![[Pasted image 20240416135417.png]]

Easy way for bulk create and delete user account is using Azure portal

- Only `Global administrators` or `User administrators` have privileges to create and delete user accounts
- Complete bulk operations, Admin fills out a `CSV` template of data for user accounts
- Bulk template can down from `Entra Admin Center`
- Bulk list of user accounts can be downloaded

# Group Accounts

Documentation: [Learn about groups and access rights in Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/fundamentals/concept-learn-about-groups)

There are two different types of group accounts

- **Security groups** are used to manage member and computer access to shared resources for a group of users, create a security group for a specific security policy and apply the same permissions to all members of a group.
- **Microsoft 365 groups** provide collaboration opportunities. Group members have access to a shared mailbox, calendar, files, SharePoint site, and more.

When adding group members, you need to know what access rights should be applied

| Access rights      | Description                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Assigned**       | Add specific users as members of a group, where each user can have unique permissions.                                                                                                                                                                                                                                                                                                       |
| **Dynamic user**   | Use dynamic membership rules to automatically add and remove group members. When member attributes change, Azure reviews the dynamic group rules for the directory. If the member attributes meet the rule requirements, the member is added to the group. If the member attributes no longer meet the rule requirements, the member is removed.                                             |
| **Dynamic device** | (_Security groups only_) Apply dynamic group rules to automatically add and remove devices in security groups. When device attributes change, Azure reviews the dynamic group rules for the directory. If the device attributes meet the rule requirements, the device is added to the security group. If the device attributes no longer meet the rule requirements, the device is removed. |




