---
title: Awesome Networking
tags:
  - networking
  - system-architecture
  - devops
  - awesome
---

![[thumbnail-osi-tcpip.png]]
# General

## Awesome Repositories

- [awesome-networking](https://github.com/nyquist/awesome-networking): Curated list of awesome computer networking resources 🌟 **(Recommended)**
- [awesome-tunneling](https://github.com/anderspitman/awesome-tunneling) : List of ngrok/Cloudflare Tunnel alternatives and other tunneling software and services. Focus on self-hosting. 🌟 **(Recommended)**
- [HowDoesInternetWork - Protocols – All great networking protocols arranged and explained](https://howdoesinternetwork.com/protocols)
- [network-examples](https://github.com/knorrie/network-examples): Linux networking examples and tutorials
## Blogs

- [LF Networking Blog](https://lfnetworking.org/newsroom/lf-networking-blog/)
## Landscape

- [LF Networking Landscape](https://lfnetworking.org/projects/): LF Networking (LFN) provides the largest set of open source networking projects via a broad industry coalition that comprise the open networking stack.
## Articles

### Overview

- [NetworkWorld - The state of open-source networking: Foundations and technologies driving today’s networks](https://www.networkworld.com/article/4107254/the-state-of-open-source-networking-the-foundations-and-technologies-driving-todays-networks.html) 🌟 **(Recommended)**
- [[Advantage Networking Fundamental - Routing, VPN and Peering]]
- [GeekforGeek - Types of Network Protocols](https://www.geeksforgeeks.org/computer-networks/types-of-network-protocols-and-their-uses/)
### BGP

- [BGP Failover and Multi-Homing from Two VPS Locations](https://www.virtua.cloud/learn/en/tutorials/bgp-failover-multi-homing-vps)
### DNS

- [Dev.to - WireGuard DoV (DNS-over-VPN)](https://dev.to/xeptore/wireguard-dov-dns-over-vpn-ell) 🌟 **(Recommended)**
### Network in Linux

- [RedHat - Introduction to Linux interfaces for virtual networking](https://developers.redhat.com/blog/2018/10/22/introduction-to-linux-interfaces-for-virtual-networking#)
- [Medium - Exploring Linux Network Namespaces: Creating and Communicating with Isolated Network Environments](https://medium.com/@ibshafique/exploring-linux-network-namespaces-creating-and-communicating-with-isolated-network-environments-b6b68a69d5ee)
- [SDNClinic - Linux Routing Fundamentals](https://blog.sdn.clinic/2025/01/linux-routing-fundamentals/)
### Network Protocol

- [Blog - Visualizing Network Topologies: Zero to Hero in Two Days](https://habr.com/en/articles/534716/)
- [Smashing Magazine - HTTP/3 From A To Z: Core Concepts](https://www.smashingmagazine.com/2021/08/http3-core-concepts-part1/)
- [Blog - Using HTTP/3 in gRPC](https://unnieayilliath.com/2023/02/19/using-http-3-in-grpc/)
- [Medium - The Past and Present of Browser Architecture](https://levelup.gitconnected.com/the-past-and-present-of-browser-architecture-522c65d1c2cd)
### VxLAN

- [Level Zero Networking (Blog) - Scalable and Secure VxLAN Multisite using NetBird – Part 1:Initial Config-L3VPN](https://lev-0.com/2024/03/11/scalable-and-secure-vxlan-multisite-using-netbird-part-1initial-config-l3vpn/)
# Network Tools & OpenSources

![[thumbnail-network-peering.png]]

## Routing

- [gobgp](https://github.com/osrg/gobgp): BGP implemented in the Go Programming Language
- [frr](https://github.com/FRRouting/frr): The FRRouting Protocol Suite
## DNS

- [pdns](https://github.com/PowerDNS/pdns): PowerDNS Authoritative, PowerDNS Recursor, dnsdist
- [nip.io](https://github.com/exentriquesolutions/nip.io): Dead simple wildcard DNS for any IP address.
- [sslip.io](https://github.com/cunnie/sslip.io): Golang-based DNS server which maps DNS records with embedded IP addresses to those addresses.
## DDNS

- [DDNS Cloudflare](https://gist.githubusercontent.com/thecrazybob/2ddd932b8f9f6ba1b450c3161d0d1355/raw/16421e95eaa5103ccc0945f5ac65df3a784c403e/lwp-cloudflare-dyndns.sh): Setting Cloudflare DDNS for dynamically change your domain record with new IP base on the concept DNS. (Note: Use this one with `crontab` for more efficiency)
## NFS

- [nfs-ganesha](https://github.com/nfs-ganesha/nfs-ganesha): an NFSv3,v4,v4.1 fileserver that runs in user mode on most UNIX/Linux systems 🌟 **(Recommended)**
## Network Calculator

- [Subnet Calculator](https://www.subnet-calculator.com/): Calculator CIDR concept of subnet 🌟 **(Recommended)**
- [VLSM Calculator](https://subnettingpractice.com/vlsm.html): Calculator VLSM concept of subnet 🌟 **(Recommended)**
## Network Infrastructure

- [ZTM](https://github.com/flomesh-io/ztm) :  A privacy-first open-source decentralized network software based on HTTP/2 tunnels.

## RDP

- [FreeRDP](https://github.com/FreeRDP/FreeRDP): FreeRDP is a free remote desktop protocol library and clients
## Reverse Proxy & Tunneling

- [bore](https://github.com/ekzhang/bore): 🕳 bore is a simple CLI tool for making tunnels to localhost 🌟 **(Recommended)**
- [frp](https://github.com/fatedier/frp): A fast reverse proxy to help you expose a local server behind a NAT or firewall to the internet.
- [GO Simple Tunnel](https://gost.run/en/): A simple security tunnel written in golang
- [localtunnel](https://theboroer.github.io/localtunnel-www/): Localtunnel allows you to easily share a web service on your local development machine without messing with DNS and firewall settings. 🌟 **(Recommended)**
- [rathole](https://github.com/rathole-org/rathole): A lightweight and high-performance reverse proxy for NAT traversal, written in Rust. An alternative to frp and ngrok. 
- [wstunnel](https://github.com/erebe/wstunnel) : Tunnel all your traffic over Websocket or HTTP2 - Bypass firewalls/DPI - Static binary available 🌟 **(Recommended)**
## VPN

- [openvpn-install.sh](https://github.com/Nyr/openvpn-install/blob/master/openvpn-install.sh): Setting up `openvpn` for your host 🌟 **(Recommended)**
- [wireguard-install.sh](https://github.com/Nyr/wireguard-install/blob/master/wireguard-install.sh): Setting up `wireguardvpn` for your host
- [vpncloud](https://github.com/dswd/vpncloud): Peer-to-peer VPN
- [pritunl](https://github.com/pritunl/pritunl): Enterprise VPN server 🌟 **(Recommended)**
- [netbird](https://github.com/netbirdio/netbird): NetBird securely connects people, machines and AI agents across any network with one identity-based Zero Trust platform. Powered by peer-to-peer WireGuard
- [headscale](https://github.com/juanfont/headscale): An open source, self-hosted implementation of the Tailscale control server
## VIP (Virtual IP Address)

- [vip-manager](https://github.com/cybertec-postgresql/vip-manager): Manages a virtual IP based on state kept in etcd or Consul
# Matrix Solution & OpenSource Comparison

## VPN Solutions for Site-to-Site

```ascii
HUB-AND-SPOKE (Pritunl)          PEER-TO-PEER MESH (NetBird)
  [Site A]     [Site B]           [Site A Router] <====Direct====> [Site B Router]
      \           /                                \               /
       \         /                                  \             /
    [Pritunl Server]                              [NetBird Control Plane]
   (Central Bottleneck)                     (Exchanges Keys/Metadata Only)
```

| **Feature / Metric**        | **NetBird**                           | **Pritunl (WireGuard/OpenVPN)**             | **Headscale + Tailscale Client**             | **Defined Net / Nebula**             |
| --------------------------- | ------------------------------------- | ------------------------------------------- | -------------------------------------------- | ------------------------------------ |
| **Data-Path Latency**       | **Lowest (Direct P2P WireGuard)**     | Medium to High (Routed through Gateway)     | **Lowest (Direct P2P WireGuard)**            | **Lowest (Direct P2P Noise/UDP)**    |
| **Control-Plane Model**     | Fully Open Source (BSD-3/AGPLv3)      | Open Core (Proprietary enterprise features) | Open Source (Community engine for Tailscale) | Fully Open Source (Apache 2.0)       |
| **NAT Traversal Mechanism** | ICE / WebSockets / Custom STUN & TURN | Traditional Port Forwarding / Static IPs    | STUN / DERP Relays                           | Lighthouse nodes / UDP hole punching |
| **Site-to-Site Gateway**    | **Native Routing Nodes**              | Traditional Central VPN Server              | Subnet Routers                               | Relies on Overlay IPs per host       |
| **ACL / Policy Model**      | Centralized UI / API Group-based ZTNA | Organization & Route-based ACLs             | YAML Policy / JSON ACLs                      | Host-level PKI certificates          |
| **Key Management**          | Automated via Signal Server           | Automated via Pritunl Server                | Automated via Headscale Server               | Manual / Automated PKI CA setup      |

| **Dimension**              | **Native NetBird Gateway**                    | **VXLAN / EVPN over NetBird (VyOS)**                                              |
| -------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------- |
| **Encapsulation Overhead** | **Lowest** (Outer IP + UDP + WireGuard)       | **Higher** (Outer IP + UDP + WireGuard + VXLAN Header)                            |
| **Layer Adjacency**        | **Layer 3 Only** (IP Routing between subnets) | **Layer 2 or Layer 3** (Stretched VLANs & L3VPN)                                  |
| **Control Plane**          | NetBird Management UI (Static Routes/ACLs)    | MP-BGP EVPN running inside the WireGuard tunnel                                   |
| **MTU Penalty**            | ~60 Bytes (WireGuard over IPv4)               | **~110 Bytes** (60 B WireGuard + 50 B VXLAN) $\rightarrow$ Max MTU $\approx 1390$ |
| **Multi-Tenancy**          | Groups/ACLs in NetBird UI                     | **VRF & VNI Isolation** (True enterprise multi-tenancy)                           |
| **Setup Complexity**       | Very Low (Docker Compose + simple UI)         | High (Requires VyOS, BGP/EVPN knowledge, and container management)                

## DNS with Networking Solutions

1. **DNS Resolvers / Proxies (Layer 7 DNS):** `dnsproxy`, `CoreDNS`, `Unbound`
2. **Reverse Tunnels / NAT Traversal (Layer 4 TCP/UDP Port Forwarders):** `rathole`, `frp`
3. **Transparent IP-Level Tunnels (Layer 3 Network Tun):** `tun2socks`

| **Tool**        | **Category**            | **Primary Function**                                         | **Encrypted Upstream Support (DoH/DoT/DoQ)**             | **NAT Traversal / Remote Expose**                  | **Layer 3 Routing (System-wide traffic)** | **Complexity & Overhead**                                | **Best Use Case**                                                                                |
| --------------- | ----------------------- | ------------------------------------------------------------ | -------------------------------------------------------- | -------------------------------------------------- | ----------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **`dnsproxy`**  | DNS Proxy               | High-performance DNS proxy & DoH/DoT listener                | **Native & Excellent** (DoH, DoT, DoQ, DNS-over-HTTPS/3) | ❌ No                                               | ❌ No                                      | **Very Low** (Single binary, lightweight Go engine)      | Forwarding local client DNS to remote VPS secure endpoints with ultra-low latency.               |
| **`CoreDNS`**   | DNS Resolver / Server   | Extensible plugin-based DNS middleware engine                | **High** (via plugins like `forward` or `tls`)           | ❌ No                                               | ❌ No                                      | **Medium** (Requires `Corefile` syntax knowledge)        | Complex DNS rewriting, split-horizon routing, or enterprise Kubernetes integration.              |
| **`Unbound`**   | Recursive DNS Resolver  | Authoritative/Recursive root server querying                 | **Moderate** (Primarily DoT upstream & DNSSEC)           | ❌ No                                               | ❌ No                                      | **Medium to High** (Requires tuning C/cache settings)    | Maximum privacy by resolving directly to root nameservers without upstream ISP dependencies.     |
| **`rathole`**   | Layer 4 Reverse Proxy   | High-performance Rust-based port forwarder                   | N/A (Exposes raw TCP/UDP port data)                      | **Native & Optimized**                             | ❌ No                                      | **Low** (Simple client/server configuration)             | Tunnelling UDP (port 53) or TCP (DoT) traffic through NAT/firewalls from VPS to home server.     |
| **`frp`**       | Layer 4/7 Reverse Proxy | Feature-rich reverse proxy / NAT traversal                   | N/A (Proxies raw protocols)                              | **Native & Feature-Rich** (includes Web Dashboard) | ❌ No                                      | **Medium** (Higher memory overhead than rathole)         | Exposing internal DNS endpoints behind deep NATs with a web UI management interface.             |
| **`tun2socks`** | Layer 3 TUN Device      | Translates system TUN interface traffic to SOCKS5/HTTP proxy | N/A (Operates on raw IP packet level)                    | ❌ No (Requires external proxy gateway)             | **Native & Complete**                     | **Medium** (Requires OS-level routing table adjustments) | Forcing **all OS-level network traffic** (including all system DNS queries) through a VPS proxy. |

Depending on the exact target architecture for the VPS DNS pipeline, the following combinations yield the best results:

**Option A: Ultra-Fast Secure Forwarder (Low Overhead)**

- **Stack:** `dnsproxy` (Client/Local) $\longrightarrow$ **NetBird / WireGuard** $\longrightarrow$ `dnsproxy` or `CoreDNS` (VPS)
- **Why:** `dnsproxy` uses minimal memory and CPU while natively handling DoH/DoT/DoQ multiplexing. Combined with WireGuard or NetBird direct P2P mesh, it eliminates proxy overhead.

**Option B: Exposing Home DNS via VPS (Behind CGNAT / Firewalls)**

- **Stack:** `Unbound` / `CoreDNS` (Home Network) $\longrightarrow$ `rathole` client $\longrightarrow$ `rathole` server (VPS Public IP)
- **Why:** `rathole` provides lightweight, memory-safe Rust-based NAT traversal. The public VPS receives DNS queries on port 53 and tunnels them directly to your home `Unbound` instance over an encrypted channel.

**Option C: System-Wide Invisible Routing over SOCKS5**

- **Stack:** OS Traffic $\longrightarrow$ `tun2socks` $\longrightarrow$ SOCKS5 Tunnel (VPS) $\longrightarrow$ Upstream DNS (`CoreDNS` / Public)
- **Why:** If local applications bypass standard `resolv.conf` settings, `tun2socks` creates a virtual network interface (TUN) to capture all raw IP packets and send them down the VPS tunnel automatically.

Others more keywork to discovery, you can find out into this matrix

1. **ALL-IN-ON TUNNEL / ROUTER DRIVERS**: ([sing-box](https://github.com/sagernet/sing-box) / [Xray-core](https://github.com/xtls/xray-core)) -> Handles DNS, SOCKS5, Shadowsocks/VLESS, and TUN routing in a single binary.

2. **SECURE ENCRYPTED DNS DAEMONS**: [DNSCrypt-Proxy](https://github.com/dnscrypt/dnscrypt-proxy) / [AdGuard Home](https://github.com/AdguardTeam/Adguardhome) -> Built specifically for encrypted upstreams (DoH/DoT/DoQ/DNSCrypt) with adblocking.

3. **SMART DNS / SNI PROXIES**: [sniproxy](https://github.com/mosajjal/sniproxy) + [BIND/dnsmasq](https://wiki.archlinux.org/title/Dnsmasq) -> Routes ONLY domain-matching traffic through the VPS, letting heavy media stream directly.

| **Tool**             | **Category**            | **Primary Function**                     | **Native Encryption (DoH/DoT/DoQ)**            | **Layer 3 TUN Routing**       | **Memory / CPU Overhead** | **Key Advantage**                                                                             |
| -------------------- | ----------------------- | ---------------------------------------- | ---------------------------------------------- | ----------------------------- | ------------------------- | --------------------------------------------------------------------------------------------- |
| **`sing-box`**       | Universal Proxy Engine  | All-in-one routing framework             | **Native & Advanced**                          | **Yes** (Built-in TUN driver) | Very Low (Go-based)       | Replaces `tun2socks` + `dnsproxy` + `v2ray` with a single, highly performant engine.          |
| **`AdGuard Home`**   | DNS Server & Ad-Blocker | Network-wide filtering & secure resolver | **Native** (DoH, DoT, DoQ, DNSCrypt)           | ❌ No                          | Low (Web UI included)     | Best for user-friendly UI, rule-based upstream routing, and built-in privacy protection.      |
| **`DNSCrypt-Proxy`** | Secure DNS Client       | Encrypted DNS tunnel daemon              | **Native** (DNSCrypt v2 & DoH)                 | ❌ No                          | Extremely Low             | High resistance against DNS censorship, tampering, and deep packet inspection (DPI).          |
| **`sniproxy`**       | Layer 7 SNI Proxy       | Proxies HTTP/HTTPS based on TLS SNI      | N/A (Operates at TCP SNI layer)                | ❌ No                          | Very Low (C-based)        | Used alongside DNS to build custom **Smart DNS** setups (rerouting only geo-blocked targets). |
| **`Xray-core`**      | Routing Platform        | Advanced proxy & traffic classifier      | **Native** (Supports arbitrary DNS over proxy) | **Yes** (via `tproxy` / TUN)  | Low to Medium             | Granular routing rules (e.g., route domestic DNS locally, send targeted domains to VPS).      |
