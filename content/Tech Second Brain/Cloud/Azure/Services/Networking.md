---
title: Networking
tags:
  - admin
  - cloud-services
  - azure
  - devops
---
# Virtual networks

![[Pasted image 20240423132235.png]]

Documentation:

- [What is Azure Virtual Network?](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview)
- [Training - Virtual Networks](https://learn.microsoft.com/en-us/training/modules/configure-virtual-networks/2-plan-virtual-networks)

>[!info]
>Azure virtual networks are an essential component for creating private networks in Azure. They allow different Azure resources to securely communicate with each other, the internet, and on-premises networks.

*Azure network services offer a range of components with functionalities and capabilities*

![[Pasted image 20240423132454.png]]

Characteristics of virtual networks in Azure.

- An Azure virtual network is a logical isolation of the Azure cloud resources.
- You can use virtual networks to provision and manage virtual private networks (VPNs) in Azure.
- Each virtual network has its own Classless Inter-Domain Routing (CIDR) block and can be linked to other virtual networks and on-premises networks.
- You can link virtual networks with an on-premises IT infrastructure to create hybrid or cross-premises solutions, when the CIDR blocks of the connecting networks don't overlap.
- You control the DNS server settings for virtual networks, and segmentation of the virtual network into subnets.

Consider when using virtual networks

- Create a dedicated private cloud-only virtual network
- Securely extend your data center with virtual networks
- Enable hybrid cloud scenarios

# Subnet

![[Pasted image 20240423132909.png]]

Documentation: 

- [Traning - Create subnets](https://learn.microsoft.com/en-us/training/modules/configure-virtual-networks/3-create-subnets)

>[!info]
>Subnets provide a way for you to implement logical divisions within your virtual network. Your network can be segmented into subnets to help improve security, increase performance, and make it easier to manage.

Conditions for the IP addresses in a virtual network when you apply segmentation with subnets

- Each subnet contains a range of IP addresses that fall within the virtual network address space.
- The address range for a subnet must be unique within the address space for the virtual network.
- The range for one subnet can't overlap with other subnet IP address ranges in the same virtual network.
- The IP address space for a subnet must be specified by using CIDR notation.
- You can segment a virtual network into one or more subnets in the Azure portal. Characteristics about the IP addresses for the subnets are listed.

![[Pasted image 20240423133050.png]]

Reserved Address

>[!info]
>Reserved Address mean various [Internet Protocol](https://en.wikipedia.org/wiki/Internet_Protocol "Internet Protocol") (IP) addresses for special purposes.

![[Pasted image 20240423133135.png]]

Consider when using subnets

- Service requirements
- Network virtual appliances
- Service endpoints
- Network security groups
- Private links

# IP Addresses

![[Pasted image 20240423133547.png]]

Documentation:

- [Traning - Plan IP addressing](https://learn.microsoft.com/en-us/training/modules/configure-virtual-networks/5-plan-addressing) 
- [Training - Create public IP addressing](https://learn.microsoft.com/en-us/training/modules/configure-virtual-networks/6-create-public-ip-addressing)

>[!info]
>There are two types of Azure IP addresses: private and public.
>
>**Private IP addresses** enable communication within an Azure virtual network and your on-premises network. You create a private IP address for your resource when you use a VPN gateway or Azure ExpressRoute circuit to extend your network to Azure.
>
>**Public IP addresses** allow your resource to communicate with the internet. You can create a public IP address to connect with Azure public-facing services.

Characteristics of IP addresses.

- IP addresses can be statically assigned or dynamically assigned.
- You can separate dynamically and statically assigned IP resources into different subnets.
- Static IP addresses don't change and are best for certain situations, such as:
    
    - DNS name resolution, where a change in the IP address requires updating host records.
    - IP address-based security models that require apps or services to have a static IP address.
    - TLS/SSL certificates linked to an IP address.
    - Firewall rules that allow or deny traffic by using IP address ranges.
    - Role-based virtual machines such as Domain Controllers and DNS servers.

Consider when creating a public IP address

- **IP Version** : IPv4 (32 bit) or IPv6 (128 bit), or both of them
- **SKU** : Standard or Basic. Must match the SKU of Load Balancer
- **Name**: Name of IP address
- **IP address assignment**:

	- **Dynamic addresses** are assigned after a public IP address is associated to an Azure resource and is started for the first time. Dynamic addresses can change if a resource such as a virtual machine is stopped (deallocated) and then restarted through Azure. *When a public IP address resource is removed from a resource, the dynamic address is released.*
	- **Static addresses** are assigned when a public IP address is created. Static addresses aren't released until a public IP address resource is deleted. If the address isn't associated to a resource, you can change the assignment method after the address is created. If the address is associated to a resource, you might not be able to change the assignment method.

## Public IP address

![[Pasted image 20240423134524.png]]

Documentation:

- [Training - Associate public IP addresses](https://learn.microsoft.com/en-us/training/modules/configure-virtual-networks/7-associate-public-ip-addresses)

Consider when associating public IP addresses

![[Pasted image 20240423134614.png]]

SKU Public IP address

![[Pasted image 20240423134704.png]]

## Private IP address

![[Pasted image 20240423134923.png]]

Documentation:

- [Traning - Allocate or assign private IP addresses](https://learn.microsoft.com/en-us/training/modules/configure-virtual-networks/8-associate-private-ip-addresses)

Consider when associating private IP addresses

![[Pasted image 20240423135408.png]]

Private IP address assignment

*There are two options: dynamic and static.*

- **Dynamic**: Azure assigns the next available unassigned or unreserved IP address in the subnet's address range. Dynamic assignment is the default allocation method.
- **Static**: You select and assign any unassigned or unreserved IP address in the subnet's address range.

# Network Security Group (NSG)

![[Pasted image 20240423142158.png]]

Documentation:

- [Network security groups](https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview)
- [Training - Implement network security groups](https://learn.microsoft.com/en-us/training/modules/configure-network-security-groups/2-implement-network-security-groups)

>[!info]
>You can limit network traffic to resources in your virtual network by using a network security group. You can assign a network security group to a subnet or a network interface, and define security rules in the group to control network traffic.

Characteristics of network security groups.

- A network security group contains a list of security rules that allow or deny inbound or outbound network traffic.
- A network security group can be associated to a subnet or a network interface.
- A network security group can be associated multiple times.
- You create a network security group and define security rules in the Azure portal.

You can assign network security groups to a subnet and create a protected screened subnet (as DMZ). A DMZ acts as a buffer between resources within your virtual network and the internet.

- Use the network security group to restrict traffic flow to all machines that reside within the subnet.
- Each subnet can have a maximum of one associated network security group.

You can assign network security groups to a network interface card (NIC).

- Define network security group rules to control all traffic that flows through a NIC.
- Each network interface that exists in a subnet can have zero, or one, associated network security groups.

## Rules

![[Pasted image 20240423143750.png]]

Documentation:

- [Training - Determine network security group rules](https://learn.microsoft.com/en-us/training/modules/configure-network-security-groups/3-determine-network-security-groups-rules)

>[!info]
>Security rules in network security groups enable you to filter network traffic. You can define rules to control the traffic flow in and out of virtual network subnets and network interfaces.

Characteristics of security rules in network security groups

- Azure creates several default security rules within each network security group, including inbound traffic and outbound traffic
- You can add more security rules to a network security group by specifying conditions for any of the following settings:
    
    - **Name**
    - **Priority**
    - **Port**
    - **Protocol** (Any, TCP, UDP)
    - **Source** (Any, IP addresses, Service tag)
    - **Destination** (Any, IP addresses, Virtual network)
    - **Action** (Allow or Deny)
- Each security rule is assigned a Priority value. All security rules for a network security group are processed in priority order. **When a rule has a low Priority value, the rule has a higher priority or precedence in terms of order processing.**
- You can't remove the default security rules.
- You can override a default security rule by creating another security rule that has a higher Priority setting for your network security group.

Azure defines three default inbound security rules for your network security group

![[Pasted image 20240423144140.png]]

Azure defines three default outbound security rules for your network security group

![[Pasted image 20240423144205.png]]

>[!info]
><h2>Effective rules</h2>
>
>Each network security group and its defined security rules are evaluated independently.
>- For inbound traffic, Azure first processes network security group security rules for any associated subnets and then any associated network interfaces.
>- For outbound traffic, the process is reversed. Azure first evaluates network security group security rules for any associated network interfaces followed by any associated subnets.
>- For both the inbound and outbound evaluation process, Azure also checks how to apply the rules for intra-subnet traffic.
>
>*Source : Azure*

Azure processes rules for **inbound traffic** for all VMs in the configuration. Azure identifies if the VMs are members of an NSG, and if they have an associated subnet or NIC.

- When an NSG is created, Azure creates the default security rule `DenyAllInbound` for the group. The default behavior is to deny all inbound traffic from the internet. If an NSG has a subnet or NIC, the rules for the subnet or NIC can override the default Azure security rules.
- NSG inbound rules for a subnet in a VM take precedence over NSG inbound rules for a NIC in the same VM.

Azure processes rules for **outbound traffic** by first examining NSG associations for NICs in all VMs.

- When an NSG is created, Azure creates the default security rule `AllowInternetOutbound` for the group. The default behavior is to allow all outbound traffic to the internet. If an NSG has a subnet or NIC, the rules for the subnet or NIC can override the default Azure security rules.
- NSG outbound rules for a NIC in a VM take precedence over NSG outbound rules for a subnet in the same VM.

Consider when creating effective rules

- Allowing all traffic
- Importance of allow rules
- Intra-subnet traffic
- Rule priority

![[Pasted image 20240423144913.png]]

## Application Security Group (ASG)

![[Pasted image 20240423145142.png]]

Documentation:

- [Application security groups](https://learn.microsoft.com/en-us/azure/virtual-network/application-security-groups)
- [Training - Implement application security groups](https://learn.microsoft.com/en-us/training/modules/configure-network-security-groups/6-implement-asgs)

>[!info]
>You can implement [application security groups](https://learn.microsoft.com/en-us/azure/virtual-network/application-security-groups) in your Azure virtual network to logically group your virtual machines by workload. You can then define your network security group rules based on your application security groups.

>[!question]
><h2>Usage of ASG</h2>
>
>Application security groups work in the same way as network security groups, but they provide an application-centric way of looking at your infrastructure. You join your virtual machines to an application security group. Then you use the application security group as a source or destination in the network security group rules.

Consider when using application security groups

- IP address maintenance.
- No subnets
- Simplified rules
- Workload support

>[!question]
>1. Which of the security rules defined by the infrastructure team takes precedence? The deny rule takes precedence.
>2. What happens to network traffic that doesn't match any NSG rules?  It's denied by default.

# Network peering

## About

Reference resources

- [Determine Azure Virtual Network peering uses](https://learn.microsoft.com/en-us/training/modules/configure-vnet-peering/2-determine-uses)

>[!info]
>Azure Virtual Network peering lets you connect virtual networks in the same or different regions. Azure Virtual Network peering provides secure communication between resources in the peered networks.

![[Pasted image 20240509110913.png]]

Some prominent characteristics of Azure Virtual Network peering

- Two type peering: `Regional` and `Global`
- `Regional` peering connect exist network same region
- `Global` peering connect exist network in different regions
- Can create a `regional` and `global` on totally region which supported by Azure
- Manage virtual network will normal after you create virtual network
- Global peering isn't permitted  in different Azure Government cloud

Benefits of peering

![[Pasted image 20240509112436.png]]

## Implementation

Reference resource

- [Create virtual network peering]()

You need to follow some points yo create the peering

- Permission need assign to `Network Contributor` or `Classic Network Contributor`, if not you need provide custom rule which allow peering actions
- Need 2 VNet to create peering
- Second VNet in peering was called `remote network`

## More about Peering

- [Extend peering with user-defined routes and service chaining](https://learn.microsoft.com/en-us/training/modules/configure-vnet-peering/5-determine-service-chaining-uses)
![[Pasted image 20240509125843.png]]

>[!question]
>When virtual networks are successfully peered, what's the peering status for both virtual networks in the peering? Connected
# VPN Gateway

![[Pasted image 20240509125017.png]]

Reference resource

- [Gateway transit and connectivity](https://learn.microsoft.com/en-us/training/modules/configure-vnet-peering/3-determine-gateway-transit-connectivity)

>[!hint]
>When virtual networks are peered, you can configure Azure VPN Gateway in the peered virtual network as a _transit point_. In this scenario, a peered virtual network uses the remote VPN gateway to gain access to other resources.

How Azure VPN Gateway is implemented

- A virtual network can have **only one** VPN gateway.
- Gateway transit support both `region` and `global` peering
- When you allow VPN gateway transit, the virtual network can communicate to resources outside the peering. Some case you can use VPN, such as

    - Use a site-to-site VPN to connect to an on-premises network.
    - Use a vnet-to-vnet connection to another virtual network.
    - Use a point-to-site VPN to connect to a client.

- Gateway transit allows peered virtual networks to share the gateway and get access to resources. You not need VPN Gateway if implement your network like this stuff
- You can apply network security groups in a virtual network to block or allow access to other virtual networks or subnets. When you configure virtual network peering, you can choose to open or close the network security group rules between the virtual networks.

# Routes and endpoints

Reference resource

- [Review system routes](https://learn.microsoft.com/en-us/training/modules/configure-network-routing-endpoints/2-review-system-routes)
- [Identify user-defined routes](https://learn.microsoft.com/en-us/training/modules/configure-network-routing-endpoints/3-identify-user-defined-routes)
- [Determine service endpoint uses](https://learn.microsoft.com/en-us/training/modules/configure-network-routing-endpoints/4-determine-service-endpoint-uses)
- [Determine service endpoint services](https://learn.microsoft.com/en-us/training/modules/configure-network-routing-endpoints/5-determine-service-endpoint-services)

>[!info]
>Azure uses _system routes_ to direct network traffic between virtual machines, on-premises networks, and the internet. Information about the system routes is recorded in a _route table_.

>[!info]
>Azure automatically handles all network traffic routing, but in some cases, a custom configuration is preferable. In these situations, you can configure user-defined routes (UDRs) and next hop targets.

>[!info]
>A virtual network service endpoint provides the identity of your virtual network to the Azure service. After service endpoints are enabled in your virtual network, you can secure Azure service resources to your virtual network by adding a virtual network rule to the resources.
## Private Links

>[!info]
>Azure Private Link provides private connectivity from a virtual network to Azure platform as a service (PaaS), customer-owned, or Microsoft partner services. It simplifies the network architecture and secures the connection between endpoints in Azure by eliminating data exposure to the public internet.

 Characteristics of Azure Private Link

- Keeps all traffic on the Microsoft global network. There's no public internet access.
- Global and there are no regional restrictions, can run in other Azure regions
- Services delivered on Azure can be brought into your private virtual network by mapping your network to a private endpoint.
- Private Link can privately deliver your own services in your customer's virtual networks.
- All traffic to the service can be routed through the private endpoint. No gateways, NAT devices, Azure ExpressRoute or VPN connections, or public IP addresses are required.

![[Pasted image 20240509132940.png]]

>[!question]
>Real Scenario, and learn more about Routes traffic in network, following this [knowledge check](https://learn.microsoft.com/en-us/training/modules/configure-network-routing-endpoints/8-knowledge-check)

 Valid next hop type can be

- Virtual appliance
- Virtual network gateway
- Virtual network
- Internet
- None, when meet this hop, traffic will be dropped

![[Pasted image 20240509162939.png]]

More information, technicals and papers about network routing in :  https://learn.microsoft.com/en-us/training/modules/configure-network-routing-endpoints/9-summary-resources

# Extend contents

- [Connect services by using virtual network peering](https://learn.microsoft.com/en-us/training/modules/integrate-vnets-with-vnet-peering/2-connect-services-using-vnet-peering): About Reciprocal connection, cross-subscription VNet peering, Transitivity, Transit, Overlap, ExpressRoute, VPN
- [Lab - Prepare virtual networks for peering by using Azure CLI commands](https://learn.microsoft.com/en-us/training/modules/integrate-vnets-with-vnet-peering/3-exercise-prepare-vnets-for-peering-using-azure-cli-commands)
- [Lab - Configure virtual network peering connections by using Azure CLI commands](https://learn.microsoft.com/en-us/training/modules/integrate-vnets-with-vnet-peering/4-exercise-configure-vnet-peering-connections-using-azure-cli-commands)
- [Lab - Verify virtual network peering by using SSH between Azure virtual machines](https://learn.microsoft.com/en-us/training/modules/integrate-vnets-with-vnet-peering/5-exercise-verify-vnet-peering)
- [Identify routing capabilities of an Azure virtual network](https://learn.microsoft.com/en-us/training/modules/control-network-traffic-flow-with-routes/2-azure-virtual-network-route)
- [Lab - Create custom routes](https://learn.microsoft.com/en-us/training/modules/control-network-traffic-flow-with-routes/3-exercise-create-custom-routes)
- [What is an NVA?](https://learn.microsoft.com/en-us/training/modules/control-network-traffic-flow-with-routes/4-network-virtual-appliances)
- [Lab - Create an NVA and virtual machines](https://learn.microsoft.com/en-us/training/modules/control-network-traffic-flow-with-routes/5-exercise-create-nva-vm)
- [Lab - Route traffic through the NVA](https://learn.microsoft.com/en-us/training/modules/control-network-traffic-flow-with-routes/6-exercise-route-traffic-through-nva)

