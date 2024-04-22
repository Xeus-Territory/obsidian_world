---
title: Azure RBAC
tags:
  - admin
  - devops
  - azure
  - cloud-services
---
# RBAC

Documentation:

- [Implement role-based access control](https://learn.microsoft.com/vi-vn/training/modules/configure-role-based-access-control/2-implement)
- [Create a role definition](https://learn.microsoft.com/vi-vn/training/modules/configure-role-based-access-control/3-create-role-definition)
- [Create a role assignment](https://learn.microsoft.com/vi-vn/training/modules/configure-role-based-access-control/4-create-role-assignment)
- [Compare Azure roles to Microsoft Entra roles](https://learn.microsoft.com/vi-vn/training/modules/configure-role-based-access-control/5-compare-azure-roles-to-azure-ad-roles)
- [Apply role-based access control](https://learn.microsoft.com/vi-vn/training/modules/configure-role-based-access-control/6-apply-authentication)

![[Pasted image 20240416150707.png]]

>[!info]
>Role-based access control (RBAC) is a mechanism that can help you manage who can access your Azure resources. RBAC lets you determine what operations specific users can do on specific resources, and control what areas of a resource each user can access.
>
>Azure RBAC is an authorization system built on Azure Resource Manager. Azure RBAC provides fine-grained access management of resources in Azure.

| Concept                | Description                                                                                                                                                                                                           | Examples                                                                                                                                                             |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Security principal** | An object that represents something that requests access to resources.                                                                                                                                                | User, group, service principal, managed identity                                                                                                                     |
| **Role definition**    | A set of permissions that lists the allowed operations. Azure RBAC comes with built-in role definitions, but you can also create your own custom role definitions.                                                    | Some built-in role definitions: _Reader_, _Contributor_, _Owner_, _User Access Administrator_                                                                        |
| **Scope**              | The boundary for the requested _level_ of access, or "how much" access is granted.                                                                                                                                    | Management group, subscription, resource group, resource                                                                                                             |
| **Role assignment**    | An **assignment** attaches a **role definition** to a **security principal** at a particular **scope**. Users can grant the access described in a role definition by creating (attaching) an assignment for the role. | - Assign the _User Access Administrator_ role to an admin group scoped to a management group  <br>- Assign the _Contributor_ role to a user scoped to a subscription |

## Comparison between RBAC roles vs Entra roles  

|                   | Azure RBAC roles                                                                                                               | Microsoft Entra ID admin roles                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| Access management | Manages access to Azure resources                                                                                              | Manages access to Microsoft Entra resources                                                                 |
| Scope assignment  | Scope can be specified at multiple levels, including management groups, subscriptions, resource groups, and resources          | Scope is specified at the tenant level                                                                      |
| Role definitions  | Roles can be defined via the Azure portal, the Azure CLI, Azure PowerShell, Azure Resource Manager templates, and the REST API | Roles can be defined via the Azure admin portal, Microsoft 365 admin portal, and Microsoft Graph PowerShell |

## Apply role-based access control

![[Pasted image 20240416152504.png]]

- **Microsoft Entra admin roles** are used to manage resources in Microsoft Entra ID, such as users, groups, and domains. These roles are defined for the Microsoft Entra tenant at the root level of the configuration.
    
- **Azure RBAC roles** provide more granular access management for Azure resources. These roles are defined for a requestor or resource and can be applied at multiple levels: the root, management groups, subscriptions, resource groups, or resources.