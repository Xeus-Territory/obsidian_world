---
title: App Service
tags:
  - admin
  - devops
  - azure
  - cloud-services
---
# What App Service Plans ?

Reference resource

- [Implement Azure App Service plans](https://learn.microsoft.com/en-us/training/modules/configure-app-service-plans/2-implement-azure)
- [Determine Azure App Service plan pricing](https://learn.microsoft.com/en-us/training/modules/configure-app-service-plans/3-determine-plan-pricing)

![[Pasted image 20240513092716.png]]

>[!info]
>In Azure App Service, an application runs in an Azure App Service plan. An App Service plan defines a set of compute resources for a web application to run. The compute resources are analogous to a server farm in conventional web hosting. One or more applications can be configured to run on the same computing resources (or in the same App Service plan).

 Azure App Service plan is the scale unit of App Service applications. Depending on the pricing tier for your Azure App Service plan, your applications run and scale in a different manner. There are several plan tiers, such as

>[!info]
><h3>Free or Shared tier </h3>
>
>> [!note]
>> - Applications run by receiving CPU minutes on a shared virtual machine instance.
>> - Applications can't scale out.

>[!info]
><h3>Basic, Standard, Premium, or Isolated</h3>
>
>>[!note]
>>- Applications run on all virtual machine instances configured in the App Service plan.
>>- Multiple applications in the same plan share the same virtual machine instances.
>>- If you have multiple deployment slots for an application, all deployment slots run on the same virtual machine instances.
>>- If you enable diagnostic logs, perform backups, or run WebJobs, these tasks use CPU cycles and memory on the same virtual machine instances.

Six categories of pricing tiers for an Azure App Service plan

![[Pasted image 20240513094929.png]]

# Scale up and Scale out

Reference resource

- [Scale up and scale out Azure App Service](https://learn.microsoft.com/en-us/training/modules/configure-app-service-plans/4-scale-up-scale-out)
- [Configure Azure App Service autoscale](https://learn.microsoft.com/en-us/training/modules/configure-app-service-plans/5-plan-scaling)

>[!info]
>There are two methods for scaling your Azure App Service plan and applications: scale up and scale out. You can scale your applications manually or automatically, which is referred to as autoscale.

 <iframe width="600" height="315"
src="https://www.youtube.com/embed/LS8ZPbQzRpc">
</iframe> 

When you apply, 

- Scale up method will upsize and change price tier for your App Service plan, It mean you will have increase `CPU`, `Memory` , `Disk Space` and more extra features like `dedicated virtual machines, custom domains and certificates, staging slots, autoscaling, and more`
- Scale-out method increases the number of virtual machine instances that run your application, you can scale out up to 3 - 100 instances base on your pricing tier
- With autoscale, you can automatically increase the scale instance count for the scale-out method. Autoscale is based on predefined rules and schedules.
- App Service plan can be scaled up and down at any time by changing the pricing tier of the plan.

>[!question]
>Which App Service Plan can you implement to support the Production team's requirements? **Premium**

# Implementation

Resource reference

- [Implement Azure App Service](https://learn.microsoft.com/en-us/training/modules/configure-azure-app-services/2-implement)
- [Create an app with App Service](https://learn.microsoft.com/en-us/training/modules/configure-azure-app-services/3-create-app-service)

![[Pasted image 20240513103126.png]]

>[!info]
>Azure App Service brings together everything you need to create websites, mobile backends, and web APIs for any platform or device. Applications run and scale with ease in both Windows and Linux-based environments.

It has many things features can help you host your App Service Instances, like

- Multiple languages and frameworks
- DevOps optimization
- Global scale with high availability
- Connections to SaaS platforms and on-premises data
- Security and compliance
- Application templates
- Visual Studio integration
- API and mobile features
- Serverless code

When you implement App Service, you need to provide basic configuration, like `Name`, `Publish`, `Runtime Stack`, `OS`, `Region` and `App Service Plan`

After you create app service, you can have some extra options for setting your applications, like

- **Always On**: You can keep your app loaded even when there's no traffic. This setting is required for continuous WebJobs or for WebJobs that are triggered by using a CRON expression.
- **ARR affinity**: In a multi-instance deployment, you can ensure your app client is routed to the same instance for the life of the session.
- **Connection strings**: Connection strings for your app are encrypted at rest and transmitted over an encrypted channel.


# CI/CD

Reference resource

- [Explore continuous integration and deployment](https://learn.microsoft.com/en-us/training/modules/configure-azure-app-services/4-explore-continuous-integration-deployment) 

>[!info]
>When you create your web app with App Service, you can choose automated or manual deployment.

Automated deployment (continuous integration) is a process used to push out new features and bug fixes in a fast and repetitive pattern with minimal impact on end users. It support several resource like

- Azure DevOps
- Github
- Bit Bucket

Or maybe you can manual deploy to App service by pushing code to Azure. There are several options, like

- Git
- CLI
- Editor (VS/VScode)
- FTP

# Deployment slots

![[Pasted image 20240513104436.png]]

Reference resource

- [Create deployment slots](https://learn.microsoft.com/en-us/training/modules/configure-azure-app-services/5-create-deployment-slots)
- [Add deployment slots](https://learn.microsoft.com/en-us/training/modules/configure-azure-app-services/6-add-deployment-slots)

>[!info]
>When you deploy your web app, web app on Linux, mobile backend, or API app to Azure App Service, you can use a separate deployment slot instead of the default production slot.

Characteristics of deployment slots.

- Deployment slots are live apps that have their own hostnames.
- Available in the Standard, Premium, and Isolated App Service pricing tiers
- The Standard, Premium, and Isolated tiers offer different numbers of deployment slots.
- App content and configuration elements can be swapped between two deployment slots, including the production slot.

 <iframe width="600" height="315"
src="https://youtube.com/embed/5rR5C4Z5dU4">
</iframe> 

About configuration of deployment slots

- New deployment slots can be empty or cloned.
- Failing into 3 categories: **Slot-specific app settings and connection strings**, Continuous **deployment settings**, **Azure App Service authentication settings**
- You clone a configuration from another deployment slot, the cloned configuration is editable

![[Pasted image 20240513105035.png]]

# Security

Reference resource

- [Secure your App Service app](https://learn.microsoft.com/en-us/training/modules/configure-azure-app-services/7-secure-app-service) 

App Service helps you provide security for your app, like

- Authentication and Authorization module runs in same environment as your app
- Using app-settings
- Incoming HTTP request passes through the module before it's handled by your application code.
- The security module handles several tasks for your app:
    
    - Authenticate users with the specified provider
    - Validate, store, and refresh tokens
    - Manage the authenticated session
    - Inject identity information into request headers

But you need to concern about

- **Allow Anonymous requests (no action).**
- **Allow only authenticated requests.**
- **Logging and tracing.**

# Backup and Restore

Reference resource

- [Back up and restore your App Service app](https://learn.microsoft.com/en-us/training/modules/configure-azure-app-services/9-backup-app-service)

For use Backup and Restore on your App Service, you need to following configuration, such as

- Use Standard or Premium tier App Service plan for your app or site.
- Use storage account same subscription with your applications
- Can back up the following information to the Azure storage account and container you configured, include : **App configuration settings, File content, Database connected**
- In your storage account, each backup consists of a Zip file and XML file:
    
    - The Zip file contains the back-up data for your app or site.
    - The XML file contains a manifest of the Zip file contents.

- Configure backups manually or on a schedule.
- Full backups are the default.
- Partial backups are supported
- Restore partial backups of your app or site the same way you restore a regular backup.
- Backups can hold up to 10 GB of app and database content.
- Backups for your app or site are visible on the Containers page of your storage account and app (or site) in the Azure portal.


# Monitoring

Reference resource

- [Use Azure Application Insights](https://learn.microsoft.com/en-us/training/modules/configure-azure-app-services/10-use-application-insights)

![[Pasted image 20240513110333.png]]

Characteristics of Application Insights for Azure Monitor.

- Application Insights works on various platforms including .NET, Node.js and Java EE.
- The feature can be used for configurations that are hosted on-premises, in a hybrid environment, or in any public cloud.
- Application Insights integrates with your Azure DevOps process, and has connection points to many development tools.
- You can monitor and analyze data from mobile apps by integrating with Visual Studio App Center.


LAB: https://learn.microsoft.com/en-us/training/modules/configure-azure-app-services/11-simulation-web-apps

Training: [Host a web application with Azure App Service](https://learn.microsoft.com/en-us/training/modules/host-a-web-app-with-azure-app-service/)


