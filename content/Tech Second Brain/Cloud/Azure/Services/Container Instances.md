---
title: Container Instances
tags:
  - azure
  - cloud-services
  - admin
  - devops
---
# Compare Container and VM

Reference resource

- [Compare containers to virtual machines](https://learn.microsoft.com/en-us/training/modules/configure-azure-container-instances/2-compare-containers-to-virtual-machines)

![[Pasted image 20240513110826.png]]

>[!info]
>Hardware virtualization has made it possible to run multiple isolated instances of operating systems concurrently on the same physical hardware. Containers represent the next stage in the virtualization of computing resources.

![[Pasted image 20240513110838.png]]

Benefit when use Containers, including

- Flexibility and speed
- Simple Testing
- App deployment
- Workload density

# Azure Container Instances 

![[Pasted image 20240513111125.png]]

Reference resource

- [Review Azure Container Instances](https://learn.microsoft.com/en-us/training/modules/configure-azure-container-instances/3-review)

>[!info]
>Azure Container Instances offers the fastest and simplest way to run a container in Azure, without having to manage any virtual machines and without having to adopt a higher-level service. Azure Container Instances is a great solution for any scenario that can operate in isolated containers, including simple applications, task automation, and build jobs because it provides a single pod of Hyper-V isolated containers on demand.

![[Pasted image 20240513111215.png]]

When use Azure Container Instances, you can implement your applications, with

- Fast startup times
- Public IP connectivity and DNS names (IP and FQDN)
- Custom sizes
- Persistent storage
- Linux or Windows
- Can be scheduling for sharing host machine resources with multiple-container groups
- Virtual network deployment
## Container group

![[Pasted image 20240513113230.png]]

Reference resource

- [Implement container groups](https://learn.microsoft.com/en-us/training/modules/configure-azure-container-instances/4-implement-container-groups)

>[!info]
>The **top-level** resource in **Azure Container Instances** is the **container group**. A container group is a collection of containers that get scheduled on the same host machine. The containers in a container group share a lifecycle, resources, local network, and storage volumes.

- Container group is similar pod in Kubernetes, It can be shared related resources
- Allocates resources to a multi-container group by adding together the resource requests of all containers in the group. Resources can include items such as CPUs, memory, and GPUs.
- There are two common ways to deploy a multi-container group: Azure Resource Manager (ARM) templates and YAML files.
- Container groups can share an external-facing IP address, one or more ports on the IP address, and a DNS label with an FQDN.
    
    - **External client access**. You must expose the port on the IP address and from the container to enable external clients to reach a container in your group.
    - **Port mapping**. Port mapping isn't supported because containers in a group share a port namespace.
    - **Deleted groups**. When a container group is deleted, its IP address and FQDN are released.

LAB: https://learn.microsoft.com/en-us/training/modules/configure-azure-container-instances/6-simulation-containers


>[!question]
>Which of the following options is a feature of Azure Container Instances?  **Billing for Container Instances occurs when containers are in use.**

