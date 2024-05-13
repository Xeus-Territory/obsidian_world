---
title: Subscription
tags:
  - azure
  - admin
  - azure-devops
  - cloud-services
---
# Subscription

Documentation: [Create a Microsoft Customer Agreement subscription](https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/create-subscription)

![[Pasted image 20240416141907.png]]

>[!info]
>Subscriptions help you organize access to Azure cloud service resources, and help you control how resource usage is reported, billed, and paid.

About characteristics subscription

- Every Azure cloud service **belongs** to a subscription.
- Each subscription can have **a different billing and payment** configuration.
- **Multiple subscriptions** can be **linked to the same** Azure account.
- **More than one Azure account** can be **linked to the same** subscription.
- Billing for Azure services is done on a per-subscription basis.
- If your Azure account is the only account associated with a subscription, you're responsible for the billing requirements.
- **Programmatic operations** for a cloud service might **require a subscription ID.**

>[!note]
>Azure offers free and paid subscription options to meet different needs and requirements. The most common subscriptions are **Free**, **Pay-As-You-Go**, **Enterprise Agreement**, and **Student**. For your organization, you can choose a combination of procurement options and subscription choices to meet your business scenarios.

# Regions

Documentation: [Identify Azure regions](https://learn.microsoft.com/vi-vn/training/modules/configure-subscriptions/2-identify-regions)

![[Pasted image 20240417141724.png]]

>[!info]
>A region is a geographical area on the planet containing at least one, but potentially multiple datacenters. The datacenters are in close proximity and networked together with a low-latency network.

Prominent characteristics of paired regions:

- **Physical isolation**
- **Platform-provided replication**
- **Region recovery order**
- **Sequential updates**
- **Data residency**

You can find the regions, choose the right position for your project with [Azure geographies](https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies/#overview)


# Questions

1. What can you add Admin1 as a co-administrator?

	To add Admin1 as a co-administrator to Sub1:
	
	In the Azure portal, navigate to Sub1.
	Click Access control (IAM).
	Click Assign role.
	Select the Co-Administrator role.
	Select Admin1 in the Select drop-down list.
	Click Assign.
	Once the role has been assigned, Admin1 will have full access to all resources in Sub1.
	
	Note: **Co-administrators** can only be assigned at the subscription scope. You cannot assign co-administrators to resource groups, management groups, or virtual machines.

