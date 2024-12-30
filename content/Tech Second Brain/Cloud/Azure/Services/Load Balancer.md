---
title: Load Balancer
tags:
  - admin
  - azure
  - devops
  - cloud-services
---
# What is Azure Load Balancer ?

>[!info]
>Azure Load Balancer delivers high availability and network performance to your applications. Administrators use load balancing to efficiently distribute incoming network traffic across back-end servers and resources. A load balancer is implemented by using load-balancing rules and health probes.

![[Pasted image 20240509134817.png]]

- Azure Load Balancer can be used for inbound and outbound scenarios.
- You can implement a **public** or **internal** load balancer, or use both types in a combination configuration.
- To implement a load balancer, you configure four components:
    
    - Front-end IP configuration
    - Back-end pools
    - Health probes
    - Load-balancing rules
- The front-end configuration specifies the public IP or internal IP that your load balancer responds to.
- The back-end pools are your services and resources, including Azure Virtual Machines or instances in Azure Virtual Machine Scale Sets.
- Load-balancing rules determine how traffic is distributed to back-end resources.
- Health probes ensure the resources in the backend are healthy.
- Load Balancer scales up to millions of TCP and UDP application flows.


# Implementation

>[!hint]
>You can implementation Public and Internal Load Balancer in Azure

![[Pasted image 20240509135150.png]]

>[!info]
>Use public load balancers to map the public IP addresses and port numbers of incoming traffic to the private IP addresses and port numbers of virtual machines. 
>
>The mapping can also be configured for response traffic from the virtual machines.
>
>Load-balancing rules are used to specify how to distribute specific types of traffic across multiple virtual machines or services. Therefore, you can use this to distribute load traffic from coming request to multiple internal webserver

![[Pasted image 20240509135342.png]]

>[!info]
>Vice versa, you use internal load balancers to direct traffic to resources that reside in a virtual network, or to resources that use a VPN to access Azure infrastructure. In this configuration, front-end IP addresses and virtual networks are never directly exposed to an internet endpoint. Internal line-of-business applications run in Azure and are accessed from within Azure or from on-premises resources.

# SKU (Stock Keeping Unit)

Support 3 SKU options: **Basic, Standard, and Gateway.**

- Standard Load Balancer is the newest product. It's essentially a superset of Basic Load Balancer.
- The Standard SKU offers an expanded and more granular feature set than the Basic SKU.
- The Basic SKU can be upgraded to the Standard SKU. But, new designs and architectures should use the Standard SKU.
- The Gateway SKU supports high performance and high availability scenarios with third-party network virtual appliances (NVAs).

![[Pasted image 20240509140155.png]]

# Components

![[thumbnail-loadbalancer-components.png]]

## Backend pools

Reference resource

- [Create back-end pools](https://learn.microsoft.com/en-us/training/modules/configure-azure-load-balancer/6-create-backend-pools)

>[!info]
>When you create Azure Load Balancer, you need to consider about what things you want to connect behind the scene, The concept was called `Backend pool`. Back-end pools contain the IP addresses of the virtual NICs that are connected to your load balancer.

The SKU type that you select determines which endpoint configurations are supported for the pool along with the number of pool instances allowed.

- The Basic SKU allows up to 300 pools, and the Standard SKU allows up to 1,000 pools.
- When you configure the back-end pools, you can connect to **availability sets**, **virtual machines**, or **Azure Virtual Machine Scale Sets**.
- For the Basic SKU, you can select virtual machines in a single availability set or virtual machines in an instance of Azure Virtual Machine Scale Sets.
    
- For the Standard SKU, you can select virtual machines or Virtual Machine Scale Sets in a single virtual network. Your configuration can include a combination of virtual machines, availability sets, and Virtual Machine Scale Sets.

## Health Probe

Reference resource

- [Create health probes](https://learn.microsoft.com/en-us/training/modules/configure-azure-load-balancer/7-create-health-probes)

>[!info]
>To more efficience, Azure Load balancer release `health probe`, that will help us check and validate the availability of service in backend pool, and help up detect and load traffic to service on ready or healthy status. The service doesn't meet probe, Load balancer stops sending new connection to the unhealthy instance

There are two main ways to configure a custom health probe: **HTTP** and **TCP**.

- In an **HTTP probe**, the load balancer probes your back-end pool endpoints every 15 seconds. A virtual machine instance is considered _healthy_ if it responds with an HTTP 200 message within the specified timeout period (default is 31 seconds). If any status other than HTTP 200 is returned, the instance is considered _unhealthy_, and the probe fails.
    
- A **TCP probe** relies on establishing a successful TCP session to a defined probe port. If the specified listener on the virtual machine exists, the probe succeeds. If the connection is refused, the probe fails.
    
- To configure a probe, you specify values for the following settings:
    
    - **Port**: Back-end port
    - **URI**: URI for requesting the health status from the backend
    - **Interval**: Amount of time between probe attempts (default is 15 seconds)
    - **Unhealthy threshold**: Number of failures that must occur for the instance to be considered unhealthy
- A **Guest agent probe** is a third option that uses the guest agent inside the virtual machine. This option isn't recommended when an HTTP or TCP custom probe configuration is possible.

## Rules

Reference resource

- [Create load balancer rules](https://learn.microsoft.com/en-us/training/modules/configure-azure-load-balancer/8-create-load-balancer-rules)

>[!info]
>You can define load-balancing rules to specify the what traffic can or not distribute to your back-end pool. Each rule maps a front-end IP address and port combination to a set of back-end IP address and port combinations.

- To configure a load-balancing rule, you need to have a frontend, backend, and health probe for your load balancer.
- To define a rule in the Azure portal, you configure several settings:

	- IP version (IPv4 or IPv6)
	- Front-end IP address, *Port, and Protocol (TCP or UDP)
	- Back-end pool and Back-end port
	- Health probe
	- Session persistence

- By default, Azure Load Balancer distributes network traffic equally among multiple virtual machines.
    
    Azure Load Balancer uses a five-tuple hash to map traffic to available servers. The tuple consists of the source IP address, source port, destination IP address, destination port, and protocol type. The load balancer provides stickiness only within a transport session.
    
- **Session persistence** specifies how to handle traffic from a client. By default, successive requests from a client go to any virtual machine in your pool.
    
    You can modify the session persistence behavior as follows:
    
    - **None (default)**: Any virtual machine can handle the request.
    - **Client IP**: Successive requests from the same client IP address go to the same virtual machine.
    - **Client IP and protocol**: Successive requests from the same client IP address and protocol combination go to the same virtual machine.

- Load-balancing rules can be used in combination with NAT rules.
    
    Consider a scenario where you use NAT from a load balancer's public address to TCP port 3389 on a specific virtual machine. By combining your NAT rule with load-balancing rules, you can enable remote desktop access from outside of Azure.

Lab: https://learn.microsoft.com/en-us/training/modules/configure-azure-load-balancer/9-simulation-load-balancer

More about Load Balancer, with conclusion and summary: https://learn.microsoft.com/en-us/training/modules/configure-azure-load-balancer/11-summary-resources

# Extend contents

- [Azure Load Balancer features and capabilities](https://learn.microsoft.com/en-us/training/modules/improve-app-scalability-resiliency-with-load-balancer/2-load-balancer-features)
- [Configure a public load balancer](https://learn.microsoft.com/en-us/training/modules/improve-app-scalability-resiliency-with-load-balancer/3-public-load-balancer)
- [Lab - Configure a public load balancer](https://learn.microsoft.com/en-us/training/modules/improve-app-scalability-resiliency-with-load-balancer/4-exercise-configure-public-load-balancer?pivots=bash)
- [Internal load balancer](https://learn.microsoft.com/en-us/training/modules/improve-app-scalability-resiliency-with-load-balancer/5-internal-load-balancer)


