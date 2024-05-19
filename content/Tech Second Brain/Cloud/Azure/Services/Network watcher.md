---
title: Network watcher
tags:
  - cloud-services
  - azure
  - devops
  - admin
---
# What is Azure Network Watcher ?

Reference resource

- [Describe Azure Network Watcher features](https://learn.microsoft.com/en-us/training/modules/configure-network-watcher/2-describe-features)

Azure Network Watcher provides tools to monitor, diagnose, view metrics, and enable or disable logs for resources in an Azure virtual network. Network Watcher is a regional service that enables you to monitor and diagnose conditions at a network scenario level.

![Screenshot of the Network Watcher Get Started page in the Azure portal.](https://learn.microsoft.com/en-us/training/wwl-azure/configure-network-watcher/media/network-watcher-861659e0.png)

Features of Network Watcher

| Feature                     | Description                                                                                                                                                                                                                                                               | Scenarios                                                                                                                                                                                                                     |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **IP flow verify**          | Quickly diagnose connectivity issues from or to the internet, and from or to your on-premises environment.                                                                                                                                                                | _Identify if a security rule blocks ingress or egress traffic to or from a virtual machine_  <br>  <br>_Troubleshoot issues to determine if other exploration is required_                                                    |
| **Next hop**                | View the next connection point (or _next hop_) in your network route, and analyze your network routing configuration.                                                                                                                                                     | _Determine if there's a next hop, and view the next hop target, type, and route table_  <br>  <br>_Confirm traffic reaches an intended target destination_                                                                    |
| **VPN troubleshoot**        | Diagnose and troubleshoot the health of your virtual network gateway or connection with gathered data. View connection statistics, CPU and memory information, IKE security errors, packet drops, and buffers and events.                                                 | _View summary diagnostics in the Azure portal_  <br>  <br>_Review detailed diagnostics in generated log files stored in your Azure storage account_  <br>  <br>_Simultaneously troubleshoot multiple gateways or connections_ |
| **NSG diagnostics**         | Use flow logs to map IP traffic through a network security group (NSG). A common implementation for NSG flow logs is to meet security compliance regulations and auditing requirements.                                                                                   | _Define prescriptive NSG rules for your organization, and conduct periodic compliance audits_  <br>  <br>_Compare your prescriptive NSG rules against the effective rules for each virtual machine in your network_           |
| **Connection troubleshoot** | Azure Network Watcher Connection Troubleshoot is a more recent addition to the Network Watcher suite of networking tools and capabilities. Check a direct TCP or ICMP connection from a virtual machine, application gateway, or Azure Bastion host to a virtual machine. | _Troubleshoot your network performance and connectivity issues in Azure_  <br>  <br>_Troubleshoot connection issues for a virtual machine, application gateway, or Azure Bastion host_                                        |

# IP flow verify diagnostics

Reference resource 

- [Review IP flow verify diagnostics](https://learn.microsoft.com/en-us/training/modules/configure-network-watcher/3-review-flow-verify-diagnostics)

>[!info]
>The IP flow verify feature in Azure Network Watcher checks connectivity from or to the internet, and from or to your on-premises environment. This feature helps you identify if a security rule is blocking traffic to or from your virtual machine or the internet.

![[Pasted image 20240513164928.png]]

Configuration details and functionality of the IP flow verify feature in Azure Network Watcher.

- You need to set obligatory properties of IP flow verify, like **VM and network interface, Local port, remote IP address and port, Protocol, Traffic direction**
- The feature tests communication for a target virtual machine with associated network security group (NSG) rules by running inbound and outbound packets to and from the machine.
- After the test runs complete, the feature informs you whether communication with the machine succeeds (allows access) or fails (denies access).
- If the target machine denies the packet because of an NSG, the feature returns the name of the controlling security rule.

>[!note]
>The IP flow verify feature is ideal for helping to ensure correct application of your security rules.

# Next hop diagnostics

Reference resource

- [Review next hop diagnostics](https://learn.microsoft.com/en-us/training/modules/configure-network-watcher/4-review-next-hop-diagnostics)

>[!info]
>The next hop feature in Azure Network Watcher checks if traffic is being directed to the intended destination. This feature lets you view the next connection point (or next hop) in your network route, and helps you verify a correct network configuration.

![[Pasted image 20240513165452.png]]

Properties and summary of the next hop feature in Azure Network Watcher.

- You configure the next hop feature with the following properties in the Azure portal:
    
    - Your subscription and resource group
    - Virtual machine and network interface
    - Source IP address
    - Destination IP address (If you want to confirm a specified target is reachable)
- The feature tests the next connection point in your network route configuration.
    
- The next hop test returns three items:
    
    - Next hop type
    - IP address of the next hop (If available)
    - Route table for the next hop (If available)
- Examples of a next hop are _Internet_, _Virtual Network_, and _Virtual Network Service Endpoint_.
    
- If the next hop is a user-defined route (UDR), the process returns the UDR route. Otherwise, next hop returns the system route.
    
- If the next hop is of type _None_, there might be a valid system route to the destination IP address, but no next hop exists to route the traffic to the target.

>[!note]
>The next hop feature is ideal for identifying unresponsive virtual machines or broken routes in your network.

# Visualize the network topology

>[!info]
>Azure Network Watcher provides a network monitoring topology tool to help administrators visualize and understand infrastructure. The following image shows an example topology diagram for a virtual network in Network Watcher.

Reference resource

- [Visualize the network topology](https://learn.microsoft.com/en-us/training/modules/configure-network-watcher/5-visualize-network-topology)

![[Pasted image 20240513165649.png]]

Characteristics of the network topology capability in Azure Network Watcher.

- The Network Watcher Topology tool generates a visual diagram of the resources in a virtual network.  
- The graphical display shows the resources in the network, their interconnections, and their relationships with each other.
- You can view subnets, virtual machines, network interfaces, public IP addresses, network security groups, route tables, and more.
- To generate a topology, you need an Azure Network Watcher instance in the same region as the virtual network.

Summary and resources : https://learn.microsoft.com/en-us/training/modules/configure-network-watcher/7-summary-resources