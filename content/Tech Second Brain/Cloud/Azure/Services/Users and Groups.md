---
title: Account identity, Users and Groups with Azure
tags:
  - devops
  - azure
  - admin
---
# User accounts

![[Pasted image 20240422091155.png]]
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

![[Pasted image 20240422091226.png]]




