---
title: "Kubewekend Session Extra 3: RKE2 and The Nightmare with Network and CoreDNS"
tags:
  - devops
  - k8s
  - kubewekend
  - usage
---

>[!quote]
>Yo hello everyone! Hope you're all doing well. I'm still good and enjoying things.
>
>Today, I want to share a bit about a situation I ran into when setting up a new node for my Kubernetes cluster. My node's network wasn't working, which caused delays for my application. Let's dive in and see what was going on.

# 😄The Issue of Issue

>[!question]
>If you've already faced or are currently facing - **Kubernetes DNS issues**, you know they can create incredibly frustrating debugging moments that are far from easy. Consequently, I dedicated two days to learning and resolving the specific problem detailed below. This tutorial outlines precisely how I fixed it. Be sure to take note of this one!

![[Pasted image 20250711145442.png]]

In my experience, when attempting to self-host Kubernetes clusters, specifically on-premise solutions like K3s, RKE2, or other local Kubernetes setups, you're likely to encounter a specific problem. Your pods might spin up, and components like `CoreDNS`, `CNI`, `KubeProxy`, and `Kubelet` appear to be functioning perfectly, yet your pods cannot communicate with services to resolve domains.

This issue then cascades, causing significant problems for `health-checks`, `InitContainers`, `Jobs`, `Prehooking`, and more, leaving you unsure where to even begin troubleshooting. Let's list a couple of potential reasons, and I will separate into three levels, **Rare, Unique and Special** 

1. **(Rare)** Your CoreDNS is in wrong configuration and CoreDNS can't resolve your service domain with current configuration. These issues linked to

	- [GitHub RKE2 - Containers can't resolve hostnames](https://github.com/rancher/rke2/discussions/6168)
	- [Blog - Pod DNS Problems](https://blog.differentpla.net/blog/2022/02/25/pod-dns-problems/)

2. **(Special)** The [Checksum TX](https://www.kernel.org/doc/html/next/networking/checksum-offloads.html) is wrong configuration or not able fit with your kernel version in your network Interface, honestly to say if you encounter this problem, that ain't gonna easy for understanding

	- [Medium - Resolving Flannel-Related DNS and Metrics Server Issues in RKE2 Kubernetes on Ubuntu 22.04](https://medium.com/@ozkanpoyrazoglu/resolving-flannel-related-dns-and-metrics-server-issues-in-rke2-kubernetes-on-ubuntu-22-04-7feb5fb21a14)
	- [GitHub RKE2 - RKE2 Cluster running Calico seemingly losing UDP traffic when transiting through service IP to remotely located pod](https://github.com/rancher/rke2/issues/1541)
	- [GitHub Calico - bad udp cksum when using vxlan](http://github.com/projectcalico/calico/issues/4865)

3. **(Unique)** Firewall is turning on and there are some rules you settle up but make conflict with RKE2 or K3S, including `firewalld`, `ufw` or `iptables`. This one is not simple if you doesn't understand what's going on when turn on, turn off any rules in bunch of this 😄

	- [RKE2 - Firewalld conflicts with default networking](https://docs.rke2.io/known_issues#firewalld-conflicts-with-default-networking)
	- [K3s - Iptables Legacy Problems](https://docs.k3s.io/known-issues#iptables)
	- [K3s - UFW should be disabled](https://docs.k3s.io/installation/requirements?os=debian#operating-systems)

4. **(Special)** Other situation relate with your kernel version, CNI, Network Policy, IP Exhaustion, Open Port, ...

	- [K3s - Inbound Rules for K3s Nodes](https://docs.k3s.io/installation/requirements#inbound-rules-for-k3s-nodes)
	- [Rancher Issue - Configure K3s on EC2](https://slack-archive.rancher.com/t/13267212/i-need-urgent-help-please-i-m-trying-to-configure-k3s-on-ec2)
	- [RKE2 - Known Issues and Limitations](https://docs.rke2.io/known_issues)

>[!info]
>Here are a couple of issues we might encounter when self-hosting. I know this list isn't exhaustive, but we can always discuss more if either of us finds them later. Let's go through each one to see what we have.
>

# 🔥 Firewall Related

![[meme-firewall.png|center]]

>[!info]
>After spend bunch of hours to debug, I figure out my issue come from firewall which things I actually love and hate in Linux, especially Ubuntu because it's really complicated

First of all, you can double-check my note about commands [[Awesome Linux Shell commands#`iptables` command|Iptables]] to figure rule and awesome things related about Linux firewall, and you can read them to update more about firewall knowledge

- [Blog - iptables: a simple cheatsheet](https://andreafortuna.org/2019/05/08/iptables-a-simple-cheatsheet/)
- [Gist - IP Tables (iptables) Cheat Sheet](https://gist.github.com/davydany/0ad377f6de3c70056d2bd0f1549e1017)
- [Medium - UFW: Uncomplicated Firewall — Cheat Sheet](https://blog.rtsp.us/ufw-uncomplicated-firewall-cheat-sheet-a9fe61933330)
- [Digital Ocean - How To Set Up a Firewall Using FirewallD on CentOS 7](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-using-firewalld-on-centos-7)

When I tried to list all my firewall rules, I discovered that `UFW` was actively running on my node and contained numerous rules that I suspected were causing packet loss (**DROP**)

While Ubuntu typically has open ports by default, enhanced security often involves integrating a firewall like `firewalld`, `ufw`, or `iptables`. The reason I checked `iptables` directly is that `ufw` or `firewalld` write their rules to `iptables` at a higher level, which can sometimes lead to overlooking critical conflicts. See these posts below to understand

- [Blog - Making Rules For IPtables Firewall with UFW](https://cloufish.github.io/blog/posts/Making-Rules-For-IPTables-Firewall-With-UFW/)
- [RockyLinux - iptables guide to firewalld - Introduction](https://docs.rockylinux.org/guides/security/firewalld/)

This conflict arises because **RKE2** and **K3s** inherently manage firewall rules for us. They export specific rules to control opening, closing, accepting, or dropping connections for their CNI (Container Network Interface), enabling pods and services to communicate. This pre-existing management by RKE2/K3s directly conflicts with other firewall configurations.

Let's check and tackle with `iptables` first because you will have overview of whole firewall in system

```bash
# List all rules
sudo iptables -S | grep -e "ufw"
```

Now you need to aware about this one, with default configuration of RKE2, you usually see it uses **IP - 10.43.0.10** with **Port UDP/53** for **RKE2 CoreDNS** with actually handle the tough job for resolving domain and let's your service communicate each others

But some how, there are rules which set up for blocking your connection, you can simple test with command in node level but pre-define network or debug with [[Awesome Kubernetes Walkthrough#Debug network with Pods|Debug network with Pods]] inside your Kubernetes with `dig` command

```bash
dig @10.43.0.10 google.com
```

f you can execute this command and receive a result within a few milliseconds, your **CoreDNS** is functioning correctly. However, if it fails or experiences delays, then your firewall could be a contributing factor to the problem. To address this, we'll need to adjust some settings. The choice is yours, as disabling a firewall can be risky, but sometimes it's a necessary step to understand the root cause. As per the [K3s Documentation - UFW should be disabled](https://docs.k3s.io/installation/requirements?os=debian#operating-systems).

For Ubuntu, that's really simple

```bash
sudo ufw disable
```

Now **reboot your system** and double-check again your `RKE2`, if your problem actual gone, congratulation 🎊 but not you can go for next part to see what we apply for CoreDNS and CNI

BTW, check your `iptables` and see anything else relating into **UDP/53** for Kubernetes IP or Host IP

# 🌚 CoreDNS and Corefile

![[icon-core-dns.png]]

There aren't going simple as well, especially relating into core of Kubernetes and [CoreDNS](https://coredns.io/) is one of them. CoreDNS is a DNS Server which help you resolve internal domain of Kubernetes to IP, and you it broke your network inside Kubernetes will gonna die, seriously CoreDNS is blackbone for all stuff things related service and network inside Kubernetes. 

We will not go deeper into CoreDNS, I will spend it for later articles but if you want to explore, you should double-check these contents

- [CoreDNS Documentation](https://coredns.io/manual/toc/)
- [Learning CoreDNS by @psycholog1st](https://hackmd.io/@psycholog1st/HkTKMApfgx)
- [Blog - A Deep Dive into CoreDNS with Rancher: Best Practices and Troubleshooting](https://support.tools/coredns-and-rancher/)

Go direct in RKE2 CoreDNS, RKE2 will install the coredns for first start as `deployment` with two `replica`, it means there are some reason why your CoreDNS will work perfect if CoreDNS land in node with not error with DNS issue. But in some situation, CoreDNS schedule to problem node, your cluster will encounter some problem when resolve domain, and it's shitty disturb.

For enhancement, you can try to modify the `Corefile` which mount as Configmap in Kubernetes Cluster. To understand more, you should read them docs

- [CoreDNS Documentation - Corefile Structure](https://coredns.io/manual/toc/#configuration)
- [CoreDNS Blog - Corefile Explained](https://coredns.io/2017/07/23/corefile-explained/)
- [Kubernetes Documentation - Customizing DNS Service](https://kubernetes.io/docs/tasks/administer-cluster/dns-custom-nameservers/)

There are two points need to care in `Corefile`

- `log`: Enable log to see or debug CoreDNS, by default it will **Disable**
- `forward . /etc/resolv.conf`: Any queries that are not within the Kubernetes cluster domain are forwarded to predefined resolvers (/etc/resolv.conf)

After I delve into these [GitHub RKE2 - Containers can't resolve hostnames](https://github.com/rancher/rke2/discussions/6168) and [Blog - Pod DNS Problems](https://blog.differentpla.net/blog/2022/02/25/pod-dns-problems/) to let me figure out to change DNS resolve to another like Google `8.8.8.8`, I'm not sure because this action can drop your performance of your service but sometime you can give a try and find the fit way for your cluster. You can handle follow this step

```bash {7,19}
# 1. Edit the configmap of your CoreDNS
kubectl edit cm -n kube-system rke2-coredns-rke2-coredns

# 2. Enhance the log and change default forward from
# /etc/resolv.conf --> 8.8.8.8
.:53 {
	log # Enable log
	errors 
	health  {
		lameduck 5s
	}
	ready 
	kubernetes   cluster.local  cluster.local in-addr.arpa ip6.arpa {
		pods insecure
		fallthrough in-addr.arpa ip6.arpa
		ttl 30
	}
	prometheus   0.0.0.0:9153
	forward   . 8.8.8.8 # Instead for /etc/resolv.conf
	cache   30
	loop 
	reload 
	loadbalance 
}

# 3. Restart your CoreDNS
kubectl rollout restart deployment -n kube-system rke2-coredns-rke2-coredns
```

Now you can re-try and if it not resolve your problem, you can find out to unique situation which one I actually consider when apply it, but it's fun and interesting. Let's go to interface and CNI networking, tough choice

# 🌊 CNI - Network Interface and Checksum TX

![[thumbnail-kubernetes-cni.png]]

As you know, the **CNI (Container Network Interface)** serves as the network plugin for Kubernetes, defining numerous networking aspects, including network policy, pod-to-pod communication, and various features specific to each CNI, such as [Cilium](https://github.com/cilium/cilium), [Calico](https://www.tigera.io/project-calico/), [Flannel](https://github.com/flannel-io/flannel), and [Canal](https://github.com/projectcalico/canal), among others.

By default, **RKE2 versions 1.27.x and lower utilize the `Flannel` network plugin, while higher versions employ `Calico`**. I won't lie; you should generally keep your hands off these configurations, as any modification can be very dangerous and potentially bring down the entire system. That's why I'm presenting this solution last—I believe you should thoroughly understand it before attempting to apply it. Even after using RKE2 for several months, Canal/Flannel still feel mysterious to me, as I rarely need to interact with them directly.

This particular issue is related to the kernel and [**ChecksumTX**](https://www.kernel.org/doc/html/next/networking/checksum-offloads.html), a concept I knew little about until I encountered this specific situation. Its definition states: _"The interface for offloading a transmit checksum to a device is explained in detail in comments near the top of include/linux/skbuff.h."_ Essentially, it describes how to ensure your packet traverses the network interface correctly as part of the packaging process, including header offloading. (I hope I'm describing that accurately! 😢)

![[Pasted image 20250713150532.png]]

Following articles related to this problem, some suggested turning off the **checksum** on the Kubernetes network interface. However, you should definitely read this [GitHub Issue - k3s on rhel 8 network/dns probleme and metrics not work](https://github.com/k3s-io/k3s/issues/5013#issuecomment-1026061183). It details how they used tough techniques like **sniffing, dumping, and `dig`** on the network interface _before_ concluding that the problem was indeed a **bad checksum**.

So they try to use `ethtool` - one of tool for modify interface in linux to fix this one, and off this checksum is one solution to deal with this type problem

```bash
sudo ethtool -K flannel.1 tx-checksum-ip-generic off
```

And now they try again with `dig` command via IP Service of CoreDNS and it's actually work, man that's truly insane

![[Pasted image 20250713151316.png]]

But I tell you before, it's temporary solution when your service restart, your interface will turn on again with default configuration, so that why they write it to script and put that into `systemd` run after `server` or `agent` service worked at [Link](https://github.com/k3s-io/k3s/issues/5013#issuecomment-1863241597)

![[Pasted image 20250713151537.png]]

>[!quote]
>This is truly an **insane issue**, one I never expected to encounter myself, and I bet it'd make many of you consider dropping or completely reinstalling your OS! 😄

# 🏋️‍♀️ Conclusion

![[meme-waiting.png|center]]

>[!done]
>This is @all for this weekend, hope you enjoy your time with my articles and learn something via them. Out of 6 month, I see the Kubernetes world is really what insane and sometime rediculous but this push me more learning energy to figure out the new things, and that's why we see this articles dropped

>[!quote]
>I'll be working to balance my workload and continue learning and sharing more about technology. Therefore, I hope you all stay healthy, keep moving forward, and I'll see you soon! Don't forget to double-check [[30-06-2025 to 13-07-2025|Dueweekly Session 14]]