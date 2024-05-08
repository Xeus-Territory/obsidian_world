---
title: Azure DNS
tags:
  - azure
  - "#cloud-services"
  - admin
  - devops
---
# About DNS

![[Pasted image 20240509102308.png]]

>[!info]
>Azure DNS enables you to host your DNS domains in Azure and access name resolution for your domains by using Microsoft Azure infrastructure. You can configure and manage your custom domains with Azure DNS in the Azure portal.
>
>By accessing your domains in Azure, you can use your same credentials, support agreements, and billing preferences as for your other Azure services.

## Entra Domain

Some concept and theory about `domain` in Azure you need to know

- When you create an Azure subscription, Azure automatically creates a Microsoft Entra domain for your subscription (NOTE: Must be a **global administrator** to perform domain management tasks )
- Initials domain, usually have template like `account-username.onmicrosoft.com`
- The purpose of a **custom domain** name is to provide a simplified form of your domain name to support specific users or tasks.

	![[Pasted image 20240509102628.png]]

- You need wait time to `custom domain` verify, during this time you need to use `init domain`
- Can't delete `init domain`, can routable custom domain that you control
- In EntraID, `domain` needs to be globally unique, can't use same `custome` domain in multiple Entra

## Verify custom domain

After add custom domain, you need access Entra and verify your domain, by

- Add DNS record of your domain like `MX` or `TXT` record type
- Azure will query DNS domain to validate your record, process can take several minutes to hours


# Azure DNS zone

## About

Reference resources

- [Create Azure DNS zones](https://learn.microsoft.com/en-us/training/modules/configure-azure-dns/4-create-zones)

>[!info]
>DNS zone is service of Azure, which provides a reliable, secure DNS service to manage and resolve domain names in a virtual network without needing to add a custom DNS solution. 
>
>An Azure **DNS zone** hosts the DNS records for a domain, to host your domain in Azure DNS, you need create and put your domain inside DNS Zone

![[Pasted image 20240509103730.png]]

When create DNS Zone, you need to provide

- Zone name
- Numbers of record
- Resource group
- Zone location
- Associated Subscription
- DNS name servers

Some important characteristics about DNS zones

- Name of DNS Zone need to unique on RG
- Can be same name with DNS Zone but need put on different RG or subscriptions
- When share same name, each DNS zone instance is assigned to a different DNS name server address.
- Root/Parents domain need to registered and point to Azure DNS like `Cloudflare` (Example: `example.com`)
- Child domains are registered directly in Azure DNS. (Example: `newsub.example.com`) 


## Delegated DNS Domain

Reference resource

- [Delegate DNS domains](https://learn.microsoft.com/en-us/training/modules/configure-azure-dns/5-delegate-dns-domains)

>[!info]
>To delegate your domain to Azure DNS, you need to identify the DNS name servers for your DNS zone. Each time a DNS zone is created, Azure DNS allocates DNS name servers from a pool. After the DNS name servers are **assigned**, **Azure DNS automatically creates authoritative NS (or Name server)** records in your DNS zone.

The delegation process for your domain involves several steps:

1. Identify your DNS name servers
2. Update your parent domain
3. Delegate subdomains (optional)

>[!hint]
>Easiest way to find the DNS name servers assigned to your DNS zone is through the Azure portal.

You can update parent domain, with few steps

1. Go to your registrar's DNS management page.
2. Find the existing `NS` records for your parent domain.
3. Replace the existing `NS` records with the `NS` records created for your domain by Azure DNS.

When you work with `NS` record, you need to considerations to

- Copy `NS` must be include trailing period  (`.`) at the end of your address , It will help indicate your `FQDN`
- When delegate, must be use exactly name of DNS name serves as created by Azure

To delegate subdomain, you need to perform few steps, include

1. Go to the parent DNS zone for your domain in the Azure portal.
2. Find the existing `NS` records for your parent domain.
3. Create new `NS` records for your child DNS zone (subdomain).


You also learn more about DNS record sets, by following link [Add DNS record sets](https://learn.microsoft.com/en-us/training/modules/configure-azure-dns/6-add-dns-record-sets)

# Azure Private DNS zones

>[!info]
>Azure Private DNS zones can be created by using your own custom domain names rather than the names provided by Azure

![[Pasted image 20240509105601.png]]

More things about Azure Private DNS benefits, can take from [Plan for Azure Private DNS zones](https://learn.microsoft.com/en-us/training/modules/configure-azure-dns/7-plan-for-private-dns-zones) and you can have overview with some scenarios, by [Review Azure Private DNS zone scenarios](https://learn.microsoft.com/en-us/training/modules/configure-azure-dns/8-determine-private-zone-scenarios)

# Extend contents

- [Overview Azure DNS](https://learn.microsoft.com/en-us/training/modules/host-domain-azure-dns/2-what-is-azure-dns)
- [Configure Azure DNS to host your domain](https://learn.microsoft.com/en-us/training/modules/host-domain-azure-dns/3-configure-azure-dns-host-domain)
- [Lab - Create a DNS zone and an A record by using Azure DNS](https://learn.microsoft.com/en-us/training/modules/host-domain-azure-dns/4-exercise-create-dns-zone-a-record)
- [Lab - Create alias records for Azure DNS](https://learn.microsoft.com/en-us/training/modules/host-domain-azure-dns/6-exercise-create-alias-records)