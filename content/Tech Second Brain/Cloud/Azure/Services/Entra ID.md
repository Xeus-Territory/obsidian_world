---
title: Entra and Entra ID
tags:
  - azure
  - devops
  - admin
  - cloud-services
---
![[thumbnail-entra-id.png]]

# What is Entra and Entra ID

Helpful article:

- [Active Directory versus Microsoft Entra ID: What’s the difference?](https://www.pdq.com/blog/active-directory-versus-microsoft-entra-id/)
- [What is Microsoft Entra ID?](https://learn.microsoft.com/en-us/entra/fundamentals/whatis)

>[!summary]
>Microsoft Entra ID is a cloud-based identity and access management service that enables your employees access external resources. It’s exactly like Active Directory but with cloud capabilities, more than just the cloud or hybrid alternative to the historically on-prem Active Directory.

Entra ID helps to support user access to resources and applications, such as:

- Internal resources and apps located on your corporate network.
- External resources like Microsoft 365, the Azure portal, and SaaS applications.
- Cloud apps developed for your organization.

To tell about different, you can take a look on diagram with AD vs Entra ID. On AD, Use Kerberos, NTLM authentication to on-premises application

![[azure-authen-local-cloud.png]]


# Entra Feature and Terminotory

![[azure-entra-id-governance.png]]

- **SSO** : provides secure single sign-on to web apps **on the cloud** and to **on-premises apps**. **Users can sign in with the same set of credentials to access all their apps.**
- **Ubiquitous device support** : Support across device, access and launch app by using existing work credentials
- **Secure remote access** : Enables secure remote access for on-premises web apps, include methodology with MFA, conditional access policies, and group-based access management. Access from anywhere, including portal
- **Cloud extensibility** : Extend to the cloud to help you manage a consistent set of users, groups, passwords, and devices across environments.
- **Sensitive data protection** : Unique identity protection capabilities to secure your sensitive data and apps. Admins can monitor for suspicious sign-in activity and potential vulnerabilities in a consolidated view.
- **Self-service support**: Delegate selected administrator tasks to company employees. Providing self-service app access and password management through verification steps can reduce helpdesk calls and enhance security.

Drop list is brief and popular feature of entra, you can explore more on

- [Which features work in Microsoft Entra ID ?](https://learn.microsoft.com/en-us/entra/fundamentals/whatis#which-features-work-in-microsoft-entra-id)
- [Entra Terminology](https://learn.microsoft.com/en-us/entra/fundamentals/whatis#terminology) **(IMPORTANT)**

# Active Directory Domain Services to Microsoft Entra ID

>[!info]
>Active Directory Domain Services (AD DS) is the traditional deployment of Windows Server-based Active Directory on a physical or virtual server, includes
>- Active Directory Certificate Services (AD CS)
>- Active Directory Lightweight Directory Services (AD LDS)
>- Active Directory Federation Services (AD FS)
>- Active Directory Rights Management Services (AD RMS).
>

>[!note]
>Microsoft Entra ID is similar to AD DS, but there are significant differences. It's important to understand that using Microsoft Entra ID for your configuration is different from deploying an Active Directory domain controller on an Azure virtual machine and then adding it to your on-premises domain

Related documentation:

- [Azure - Compare Identity Service](https://learn.microsoft.com/en-us/entra/identity/domain-services/compare-identity-solutions)

# Entra editions

| Feature                                                        | Free      | Premium P1 | Premium P2 |
| -------------------------------------------------------------- | --------- | ---------- | ---------- |
| **Directory Objects**                                          | 500,000   | Unlimited  | Unlimited  |
| **Single Sign-on**                                             | Unlimited | Unlimited  | Unlimited  |
| **Core Identity and Access Management**                        | `X`       | `X`        | `X`        |
| **Business-to-business Collaboration**                         | `X`       | `X`        | `X`        |
| **Identity and Access Management  <br>for Microsoft 365 apps** |           | `X`        | `X`        |
| **Premium Features**                                           |           | `X`        | `X`        |
| **Hybrid Identities**                                          |           | `X`        | `X`        |
| **Advanced Group Access Management**                           |           | `X`        | `X`        |
| **Conditional Access**                                         |           | `X`        | `X`        |
| **Identity Protection**                                        |           |            | `X`        |
| **Identity Governance**                                        |           |            | `X`        |
## P1

- Supports advanced administration like dynamic groups, self-service group management, and cloud write-back capabilities
- Includes Microsoft Identity Manager, an on-premises identity and access management suite.
- Allow self-service password reset for your on-premises users

## P2

- Provide risk-based Conditional Access to your apps and critical company data
- Privileged Identity Management is included to help discover, restrict, and monitor administrators and their access to resources, and to provide just-in-time access when needed.

# Self-service password reset (SSPR) 

![[Pasted image 20240416133350.png]]

Requirements of `SSPR` feature

- Require Global Administrator privileges account to manage `SSPR` options (NOTE: Always reset own passwords, no matter what)
- Uses `Security Group (SG)` to limit the users who have privileges
- Must have a valid license to use `SSPR`


# Question

1. With Entra which have policy to require members of the Global Administrators group to use Multi-Factor Authentication and an Azure AD-joined device when they connect to Azure AD from untrusted locations.
	- You access the Azure portal to alter the grant control of the Azure AD conditional access policy.
	- You can't access MFA page to alter the user settings, or portals to alter the session control of the Azure AD


2. Your company makes use of Multi-Factor Authentication for when users are not in the office. The Per Authentication option has been configured as the usage model. After the acquisition of a smaller business and the addition of the new staff to Azure Active Directory (Azure AD) obtains a different company and adding the new employees to Azure Active Directory (Azure AD), you are informed that these employees should also make use of Multi-Factor Authentication. To achieve this, the Per Enabled User setting must be set for the usage model.

	- You can't reconfigure the existing usage model by Portal, AZ CLI, but you need to create a new one and reactive your existing server with activation credentials from new provider

3. You now need to replicate the user information to Azure AD immediately.

	- You run the `Start-ADSyncSyncCycle -PolicyType Delta` Initial PowerShell cmdlet.
	- You can't use Active Directory Sites and Services to force replication of the Global Catalog on a domain controller. On a server with Azure AD Connect installed, navigate to the Start menu and select AD Connect, then Synchronization Service.

		1. Go to CONNECTORS tab.
		2. Select RUN on the ACTIONS pane.

4. Create a guest user on your AD, use command `New-AzureADMSInvitation` instead of `New-AzureADUser` which create a user in AD
	- "Bulk Create" or  `New-MgUser` is for new Azure AD Users.
	- Use "Bulk invite users" to prepare a comma-separated value (.csv) file with the user information and invitation preferences
	- You create a PowerShell script that runs the `New-MgInvitation` cmdlet for each external user.

5. Under Limitations and known issues: *"Group-based licensing currently does not support groups that contain other groups (nested groups). If you apply a license to a nested group, only the immediate first-level user members of the group have the licenses applied."*


