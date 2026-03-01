---
title: "Network 101: Advantage and Modern Networking Fundamentals - VPN and Routing"
tags:
  - devops
  - networking
  - usage
  - fundamentals
draft: "true"
---
# Resources

https://www.gl-inet.com/blog/openvpn-vs-wireguard-vs-tailscale-which-vpn-to-choose/
https://serverfault.com/questions/891690/disable-global-routing-with-openvpn
https://community.openvpn.net/Pages/Compression
https://community.openvpn.net/Pages/OpenVPN3Linux
https://www.manageengine.com/network-monitoring/tech-topics/network-routing.html
https://www.wireguard.com/netns/
https://blog.sdn.clinic/2025/01/linux-routing-fundamentals/
https://www.megaport.com/blog/multicloud-connectivity-complete-guide/
https://docs.cloud.google.com/load-balancing/docs/tcp/internal-proxy-lb-and-other-networks
# Routing, Methodology and Protocol

Routing and how to routing
Routing protocol BGP, OSPF, RIPv1, RIPv2, EIGRP
Linux Routing with `route`, `ip route`

![[thumbnail-network-routing-protocol.png]]

Setup Routing ? static, dynamic or default

# VPN and Protocol

![[thumbnail-vpn-protocols.png]]

What is the VPN ?
How many protocols ? How can adapt or operate them ? (L2TP, IPSEC, IKEv2, PPTP, OpenVPN, Wiregurd)
How many ways are there for VPN Setup ? (Site to site, wireguard overlay, Client to Site)

# Modern Networking Routing

- Network Mesh
- Direct Exchange
- ZTM (flomesh)
- HTTP Proxy or Tunnel (Chailsaw, bore, localtunnel or ngrok)
# High Performance for Peering Networking

Opensource:

- `wireguard`
- `awl`
- `pritunl`

Enterprise

- `AWS VPC Peering`
- `Express Connect` (Alibaba, AWS, Azure, Google)

# Linux Networking

- https://developers.redhat.com/blog/2018/10/22/introduction-to-linux-interfaces-for-virtual-networking#
- https://medium.com/@ibshafique/exploring-linux-network-namespaces-creating-and-communicating-with-isolated-network-environments-b6b68a69d5ee

# Kubernetes Networking

https://www.ivinco.com/blog/a-deep-dive-into-kubernetes-networking
- https://network-insight.net/2016/03/19/kubernetes-network-namespace/

# Networking Connection in K8s with BGP and L2

- https://metallb.universe.tf/concepts/bgp/
- https://docs.cilium.io/en/stable/network/bgp-toc/
- https://docs.tigera.io/calico/latest/networking/configuring/bgp

# Multi-Cluster K8s Routing

1. Service Mesh
2. Cluster Mesh
3. MCS API https://github.com/kubernetes-sigs/mcs-api

https://linkerd.io/2-edge/features/multicluster/
https://docs.solo.io/gloo-mesh-gateway/main/traffic_management/concepts/multi-cluster/
https://docs.cloud.google.com/kubernetes-engine/docs/concepts/multi-cluster-gateways
