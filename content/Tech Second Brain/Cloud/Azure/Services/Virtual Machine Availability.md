---
title: Azure Virtual Machine Availability
tags:
  - devops
  - admin
  - azure
  - cloud-services
---
# Reason why your VM failures ?

![[Pasted image 20240512134209.png]]

With Azure, you must have plan for failure can occur anytime. There are three scenarios that can lead to your VM being impacted. You can explore it, via [Article: Plan for maintenance and downtime](https://learn.microsoft.com/en-us/training/modules/configure-virtual-machine-availability/2-plan-for-maintenance-downtime)

# Availability Sets

Reference resource

- [Create availability sets](https://learn.microsoft.com/en-us/training/modules/configure-virtual-machine-availability/3-setup-availability-sets)
- [Review update domains and fault domains](https://learn.microsoft.com/en-us/training/modules/configure-virtual-machine-availability/4-review-update-fault-domains)

>[!info]
>An availability set is a logical feature you can use to ensure a group of related virtual machines are deployed together.

Characteristics of availability sets.

- Perform the identical set of functionalities.
- Have a same software
-  Run across multiple physical servers, compute racks, storage units, and network switches.

>[!note]
>If a hardware or Azure software failure occurs, only a subset of the virtual machines in the availability set are affected.

- Can create same time with virtual machine
- More way to build, like `portals`, `ARM template`, `scripting` or `API`
- Provide SLA for the service. Explore more on [SLA for Azure Virtual Machines](https://azure.microsoft.com/support/legal/sla/virtual-machines/v1_9/).

>[!info]
>There are two concepts which implemented to help Azure maintain HA (High Availability) and fault tolerance when deploy and upgrade application: *update domains* and *fault domains*. Virtual machine always put in one update and fault domain

![[Pasted image 20240512141052.png]]

>[!info]
><h3>About update domain </h3>
>
>>[!summary]
>>An update domain is a group of nodes that are upgraded together during the process of a service upgrade (or rollout). An update domain allows Azure to perform incremental or rolling upgrades across a deployment.
>>>[!note]
>>>- Each update domain contains a set of virtual machines and associated physical hardware that can be updated and rebooted at the same time.
>>>- During planned maintenance, only one update domain is rebooted at a time.
>>>- By default, there are five (non-user-configurable) update domains.
>>>- You can configure up to 20 update domains.

>[!info]
><h3>About fault domain</h3>
>
>>[!summary]
>>A fault domain is a group of nodes that represent a physical unit of failure. Think of a fault domain as nodes that belong to the same physical rack.
>>>[!note]
>>>- A fault domain defines a group of virtual machines that share a common set of hardware (or switches) that share a single point of failure. An example is a server rack serviced by a set of power or networking switches.
>>>- Two fault domains work together to mitigate against hardware failures, network outages, power interruptions, or software updates.

# Availability zones

Reference resource

- [Review availability zones](https://learn.microsoft.com/en-us/training/modules/configure-virtual-machine-availability/5-review-availability-zones)

>[!info]
>Availability zones are a high-availability offering that protects your applications and data from datacenter failures. An availability zone in an Azure region is a combination of a fault domain and an update domain.

![[Pasted image 20240512142424.png]]

Characteristics of availability zones.

- Availability zones are unique physical locations within an Azure region.
- Each zone is made up of one or more datacenters that are equipped with independent power, cooling, and networking.
- To ensure resiliency, there's a minimum of three separate zones in all enabled regions.
- The physical separation of availability zones within a region protects applications and data from datacenter failures.
- Zone-redundant services replicate your applications and data across availability zones to protect against single-points-of-failure.

![[Pasted image 20240512142612.png]]

# Horizontal and vertical scaling

Reference resource

- [Compare vertical and horizontal scaling](https://learn.microsoft.com/en-us/training/modules/configure-virtual-machine-availability/6-compare-vertical-horizontal-scaling)

When you think about scaling, that provide two method `horizontal` or `vertical` for expand, scale up and make a high availability for your service. But you need to consider when apply, and know about different between them

![[Pasted image 20240512143017.png]]

>[!info]
>**Vertical scaling**, also known as scale up and scale down, involves increasing or decreasing the virtual machine size in response to a workload. Vertical scaling makes a virtual machine more (scale up) or less (scale down) powerful.

>[!info]
>**Horizontal scaling** is used to adjust the number of virtual machines in your configuration to support the changing workload. When you implement horizontal scaling, there's an increase (scale out) or decrease (scale in) in the number of virtual machine instances.

# Virtual machine scale set

Reference resource 

- [Implement Azure Virtual Machine Scale Sets](https://learn.microsoft.com/en-us/training/modules/configure-virtual-machine-availability/7-implement-scale-sets)

![[Pasted image 20240512143429.png]]

>[!info]
>Azure Virtual Machine Scale Sets are an Azure Compute resource that you can use to deploy and manage a set of identical virtual machines. When you implement Virtual Machine Scale Sets and configure all your virtual machines in the same way, you gain true autoscaling. Virtual Machine Scale Sets automatically increases the number of your virtual machine instances as application demand increases, and reduces the number of machine instances as demand decreases.

Characteristics of Azure Virtual Machine Scale Sets.

- Same base operating system image and configuration
- Support the use of Azure Load Balancer for basic layer-4 traffic distribution, and Azure Application Gateway for more advanced layer-7 traffic distribution and SSL termination.
- Run multiple instances of your application, continue access when meet problems with minimal interruption
- Implements autoscaling to automatically increase and decrease the number of virtual machines base on customer demand
- Support up to **1,000** virtual machine instances. If you create and upload your own **custom virtual machine images**, the limit is **600** virtual machine instances.

With VMSS, you have option for automatically increase or decrease virtual machine in sets, It called `autoscale`. When you apply `autoscale` for your virtual machine scale set, you need to concern about

- Automatic adjusted capacity
- Scale out/in
- Scheduled events
- Overhead

You can follow this instruction to create and setup for yourself vmss

- [Create Virtual Machine Scale Sets](https://learn.microsoft.com/en-us/training/modules/configure-virtual-machine-availability/8-create-scale-sets)
- [Configure autoscale](https://learn.microsoft.com/en-us/training/modules/configure-virtual-machine-availability/10-configure-autoscale)

<iframe width="600" height="315"
src="https://www.youtube.com/embed/bejKOxastpc">
</iframe> 

>[!question]
>Lab link: https://learn.microsoft.com/en-us/training/modules/configure-virtual-machine-availability/11-simulation-machine-scale
>
>Which Virtual Machine Scale Sets feature can be configured to add more DevOps machines during peak production? **Schedule-based rules**
>
>What types of scaling can you use to increase the CPU capacity for your existing Virtual Machine Scale Sets instances? **Vertical scaling**


