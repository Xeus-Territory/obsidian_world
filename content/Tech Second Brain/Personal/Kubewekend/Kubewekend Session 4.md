---
title: "Kubewekend Session 4: Learn about ebpf with hubble and cilium"
tags:
  - devops
  - k8s
  - series
  - kubewekend
---
>[!quote]
>Hi @all, do you have a great week, huh ? This weekend will become more interested in learning with `eBPF`, practice with `cilium` and `hubble`, one of most huge platforms to control and managing whole progress inside network of `Kubernetes` clusters. Are you ready, mate, let's digest !!

Before start this week, I want to give appreciation and shout out for many communities, for powerful technologies who came up from

- [eBPF](https://ebpf.io/) - *A revolutionary technology with origins in the Linux kernel*
- [CNCF](https://www.cncf.io/) - *the open source, vendor-neutral hub of cloud native computing*
- [Isovalent](https://isovalent.com/) -  Community stand behind the `cilium` and sub-projects of `cilium`
- [Cilium](https://cilium.io/) - *an open source, cloud native solution for providing, securing, and observing network connectivity between workloads, fueled by the revolutionary Kernel technology eBPF*
- [Hubble](https://github.com/cilium/hubble), [Tetragon](https://tetragon.io/) - *Ambassador and integration sub-projects of `cilium`*
- [eCHO - eBPF & Cilium Office Hours](https://www.youtube.com/playlist?list=PLDg_GiBbAx-mY3VFLPbLHcxo6wUjejAOC) - Youtube series where we can find and learn more about `eBPF` and `cilium` via live stream every week

 And don't forget to checkout the super cool previous sessions of `kubewekend` down below

- [[Kubewekend Session 1]]
- [[Kubewekend Session 2]]
- [[Kubewekend Session 3]]
- **[[Kubewekend Session 4]]**

# What is `eBPF` ?

![[Pasted image 20240719104018.png|center]]

Like I promising on the article about [[Profiling applications with Pyroscope]], today we will learn and do research about `eBPF` - the technologies stand behind `pyroscope`

>[!question]
>Anyone in here are knowing about `eBPF` or `BPF`? This will be pleasant about question to the most powerful technology inside nowaday `kubernetes`
>

We have used `BPF` but you don't ever known about that, probably I really surprise and suspicious about this one on first time hearing them 😄. No joke dude, listening in [eCHO episode 1: Introduction to Cilium](https://www.youtube.com/watch?v=80OYrzS1dCA&ab_channel=eBPF%26CiliumCommunity)

You can use `BPF` via tools, such as `tcpdump`, `bpftool`, `perf`, `wireshark` - actually not much information but classic `BPF` build up `libpcap`  and more network libraries. Read more about `BPF` at: [Berkeley Packet Filter](https://en.wikipedia.org/wiki/Berkeley_Packet_Filter). If you have enough time and patience, read the source code from of them to see how the `BPF` work, no cap bruh 😅

>[!note]
>Since version 3.18, the Linux kernel includes an extended `BPF` virtual machine with ten 64-bit registers, now `eBPF` is coming up with the evolution of `BPF` and bring for us many advantage characteristics from them

## Introduce

![[Pasted image 20240719154007.png]]
>[!info]
><h3>eBPF</h3>
>
>[eBPF](https://ebpf.io/what-is-ebpf/) is a revolutionary technology with origins in the Linux kernel that can run sandboxed programs in a privileged context such as the operating system kernel. It is used to safely and efficiently extend the capabilities of the kernel without requiring to change kernel source code or load kernel modules.

eBPF brings useful and change formula fundamentally to running the programs within the operating system, I means it can be used for operating system then guarantees safety and execution efficiency as if natively compiled with the aid of a Just-In-Time (JIT) compiler and verification engine. This has led to a wave of eBPF-based projects covering a wide array of use cases, including next-generation networking, observability, and security functionality.

eBPF is used extensively to drive a wide variety of use cases

- Providing high-performance networking and load-balancing in modern data centers and cloud native environments
- Extracting fine-grained security observability data at low overhead
- Helping application developers trace applications
- Providing insights for performance troubleshooting
- Preventive application and container runtime security enforcement
- And moreover

>[!quote]
>*The possibilities are endless, and the innovation that eBPF is unlocking has only just begun.*
>
>From *What is eBPF? - ebpf.io*

>[!info]
>BPF originally stood for [Berkeley Packet Filter](https://en.wikipedia.org/wiki/Berkeley_Packet_Filter), but now that eBPF (extended BPF) can do so much more than packet filtering, the acronym no longer makes sense. eBPF is now considered a standalone term that doesn’t stand for anything. In the Linux source code, the term BPF persists, and in tooling and in documentation, the terms BPF and eBPF are generally used interchangeably. The original BPF is sometimes referred to as cBPF (classic BPF) to distinguish it from eBPF.
>
>From *What is eBPF? - ebpf.io*

## Features

In this part, we move to detailing about `eBPF`, which come up idea and more concept to understand about useful and how can we leverage a solution on `eBPF`

Explore more with the high quality contents from

- [eBPF Documentation](https://ebpf.io/what-is-ebpf/)
- [eBPF & XDP Reference Guide](https://cilium.readthedocs.io/en/stable/bpf/).
- [eBPF Explained: Use Cases, Concepts, and Architecture](https://www.tigera.io/learn/guides/ebpf/)

From my perspective, I do not have much experience with `eBPF` after use `cilium` and `hubble`, therefore hard to me to explain the detailing how `eBPF` actually work, you can read more information above reference, and I just brief some information from them

![[Pasted image 20240720152555.png]]

`eBPF` programs are event-driven and are run when the kernel or an application passes a certain hook point - include system calls, function entry/exit, kernel tracepoints, network events, and several others.

Pre-hook is possible to create a **kernel probe (kprobe)** or **user probe (uprobe)** to attach `eBPF` programs when not exist any defined on particular need

![[Pasted image 20240720154218.png]]

We can use abstraction on top of `eBPF`, such as `cilium`, `bcc` or `bpftrace` and do not require writing, that why I said about `cilium` is take cover all about `eBPF` 😄

But you can compile that if not really exist higher abstraction for compatibility via a compiler suite like [LLVM](https://llvm.org/) to compile pseudo-C code into `eBPF` bytecode.

![[Pasted image 20240720154650.png]]

eBPF program can load to `kernel` via system call, and you need to pass through two steps before being attached to request hook `verification` and `Jit compilation`

1. On the `verification` progress, It will ensure the `eBPF` program can be safe to run, and several conditions need to meet like **holds the required capabilities (privileges)**, **not crash or otherwise harm the system**, **runs to completion (not loop forever or holding up processing)*

2. How about `JIT` (Just-in-time), the compilation step translates the generic bytecode of the program into the machine specific instruction set to optimize execution speed of the program

To store and retrieve data, `eBPF` use technics called `maps`, help reduce the complexity when work with wide set of data structures, this one can be accessed from `eBPF` programs vis system call. `Maps` can be used for both a shared and a per-CPU variation with some supported type (e.g *Hash tables, LRU, Ring Buffer, ...*)

![[Pasted image 20240721091314.png]]

To flexible in finding compatible version of kernel and programs, `ebpf` can make function call into [helper function](https://www.geeksforgeeks.org/what-are-the-helper-functions/) to find stable API offered, such as helper function in used `Generate random numbers`, `eBPF map access`, `Manipulate network packets and forwarding logic`, `Get process/cgroup context`, `Get current time & date`, ...

![[Pasted image 20240721091642.png]]

`eBPF` is work with concept called `tail and function` call - It means function can be definition and calling functions of `eBPF` program and tail can call and execute another `eBPF` program and replace the execution context

![[Pasted image 20240721092516.png|center]]

>[!quote]
>*"With great power there must also come great responsibility"* 🙌
>
>IYKYN and From *What is eBPF? - ebpf.io*

`eBPF` is becoming the most powerful technology, because easily to see this one work with [kernel](https://www.geeksforgeeks.org/kernel-in-operating-system/) - central component of an operating system that manages operations of computer and hardware. Therefore, `eBPF` need to ensure anything in securable and safety, and can be listed in some layers

1. **Must be Required Privileges**, all `eBPF` need ensure to running in privileges mode (root) or require the capability CAP_BPF, **unless Unprivileges eBPF is enabled**
2. `eBPF` programs need to pass **Verifier** to ensure safety of the program itself, we have talked this one above
3. `eBPF` programs runs through a **Hardening** process - It means when `eBPF` run need to be ensure these steps

	- **Program execution protection** :  Kernel memory holding an eBPF program is protected and made read-only
	- **Mitigation against Spectre**: Under speculation CPUs may mispredict branches and leave observable side effects that could be extracted through a side channel.
	- **Constant blinding**: All constants in the code are blinded to prevent JIT spraying attacks.

4. Use **Abstracted Runtime Context**, not let `eBPF` program access arbitrary kernel memory directly, but through eBPF helpers and put Data and data structures that lie outside of the context of the program

>[!quote]
>This is quite hard to understand right now, because of belong to deepest of operate system, your `kernel` level where work with network and hardware, really tough. But when you learn something new, I think go from concept but brief can be help you slowly to inspect to your tool and figure out how that work 😃

BTW, we reach out to reason why eBPF become actually ascendancy in Infrastructure in currently

## Why eBPF ?

The honest answer come from the evolution, from technology, from the mindset, from the attacking as cybercriminal, and many things is really grow faster than ever

Let image about when you actually work your application inside the container, and it actually the OS in light weight, you really do anything else right now inside one of operation system, that will actually have kernel. And to be secure on dangerous world of technology, you need to be ensure about connection and workflow inside them, such as network, hardware and functional, performance that reason why `eBPF` is comeback and become more potential in currently, honestly

>[!quote]
>
><h2>"eBPF's is actually impact on the Linux Kernel"</h2>
>
>From *[eBPF's impact on the Linux Kernel](https://ebpf.io/what-is-ebpf/#ebpfs-impact-on-the-linux-kernel) - eBPF Documentation - ebpf.io*

![[Pasted image 20240721100213.png]]

>[!info]
>Main purpose of the Linux kernel is to abstract the hardware or virtual hardware and provide a consistent API (system calls) allowing for applications to run and share the resources

![[Pasted image 20240721101050.png]]

>[!info]
>With eBPF, a new option is available that allows for reprogramming the behavior of the Linux kernel without requiring changes to kernel source code or loading a kernel module

That reason why `eBPF` is actually act like rewriting the definition when you programing and doing inspect on the progress to improvised your application through observability, tracing and profiling application, really become trending on next time in the future, probably 100%

![[Pasted image 20240721103707.png]]

In currently, you can work on `eBPF` through some toolchains act like abstractions and libraries which you can interact with

- [bcc](https://github.com/iovisor/bcc) - *A framework that enables users to write python programs with eBPF programs embedded inside them*
- [bpftrace](https://github.com/bpftrace/bpftrace) - *High-level tracing language for Linux eBPF*
- [ebpf-go](https://github.com/cilium/ebpf) - *Pure-Go library to read, modify and load eBPF programs and attach them to various hooks in the Linux kernel.*
- [libbpf](https://github.com/libbpf/libbpf) - *Automated upstream mirror for libbpf stand-alone build.*

And one more thing, super recommend you about communities, articles, series and books to explore more information about `eBPF` and another dependencies

- [eBPF & Cilium Community](https://www.youtube.com/@eBPFCilium/videos), Youtube channel where you start to learn about `eBPF`
- [Learning eBPF](https://isovalent.com/books/learning-ebpf/?utm_source=website-ebpf&utm_medium=referral&utm_campaign=partner), Liz Rice, O'Reilly, 2023
- [What is eBPF?](https://isovalent.com/books/ebpf/?utm_source=website-ebpf&utm_medium=referral&utm_campaign=partner), Liz Rice, O'Reilly, 2022
- [BPF Performance Tools](http://www.brendangregg.com/bpf-performance-tools-book.html), Brendan Gregg, Addison-Wesley Professional Computing Series, Dec 2019
- [Isovalent Lab about eBPF](https://isovalent.com/resource-library/labs/?topic=ebpf)
- [ebpf-beginners](https://github.com/lizrice/ebpf-beginners), The beginner's guide to eBPF by Liz Rice
- [learning-ebpf](https://github.com/lizrice/learning-ebpf), Lab practice with Learning eBPF book of Liz Rice and O'Reilly

But we can understand more about `eBPF` in this series `kubewekend` through operate `cilium`, `hubble`, `tetragon` and `pyroscope`, read the next part, more pleasant thing stand behind
# Approach eBPF in real life

>[!quote]
>When take the deep dive into `eBPF` is becoming quite long and more thing to understand, with `eBPF` in raw you will hard to be imaged or structured for what this technology can do in currently. Wait, don't worry buddy, `eBPF` is go far than we are imaging, there is tons of tools, platform for multiple purpose approach `eBPF`, and that make your game become more easy than ever.

Let's take some example

![[Pasted image 20240721134616.png]]

*"When you have tough case inside your application, and dunno any reason why your application become slowly"* - now you can use `eBPF` for observability tools like [Pyroscope](https://pyroscope.io/) to check what is going on with your application, memory leaks, pressure CPU and moreover

![[Pasted image 20240721134552.png]]

"*When you want to control, understand traffic inside your native cloud platform such as Kubernetes*" - now you can use `eBPF` for networking monitoring with [Cilium](https://cilium.io/) and [Hubble](https://github.com/cilium/hubble) to understand Network, Service & Security inside Kubernetes Clusters

![[Pasted image 20240721134826.png]]

"*When you want to enables powerful realtime, eBPF-based Security Observability and Runtime Enforcement, detects and is able to react to security-significant events*" - now you can use [Tetragon](https://tetragon.io/) and [Falco](https://falco.org/) to handling that stuff

![[Pasted image 20240721135007.png]]

"*You want to create and handle huge performance load balancer*" - now you can use [Cilium](https://cilium.io/) to control what happen behind the scene of Load Balancer

You can explore more about `eBPF` technically and compatible platform for your native cloud services of your

- [KodeCloud - eBPF Essentials for DevOps Professionals](https://kodekloud.com/blog/ebpf-essentials-devops/)
- [eBPF Applications Landscape](https://ebpf.io/applications/)
- [eBPF Infrastructure Landscape](https://ebpf.io/infrastructure/)
- [Linux Extended BPF (eBPF) Tracing Tools](https://www.brendangregg.com/ebpf.html)
- [awesome-ebpf](https://github.com/zoidyzoidzoid/awesome-ebpf)
- [eBPF Docs](https://ebpf-docs.dylanreimerink.nl/)

>[!quote]
>This is why I said `eBPF` is growing up and go far way, that become the influence on next time. So why we don't we learn about `eBPF` - easily and shorten way to catch up what is going on in Cloud Native. In `kubewekend`, we are figure out that and in this session 4, we will learn about `cilium` and `hubble`

# Cilium

![[Pasted image 20240721140155.png]]

 With me `cilium` is one of most impressed I ever seen, that contain multiple things from networking, service mesh, the methodology how can control and give policy for your connection of pods inside Native Cloud like Kubernetes. It's a unique and maybe huge platform when you take a look on the technics 🤯. So what is `cilium` and why I get excited about it

## Introduce

>[!info]
><h3>Cilium</h3>
>
>Cilium is used to provide and transparently secure network connectivity and load balancing between application workloads such as application containers, processes, or VMs. Cilium operates at Layer 3/4 to provide traditional networking and security services as well as Layer 7 to protect and secure use of modern application protocols such as HTTP, gRPC, and Kafka.

 Cilium is a part of the [Cloud Native Computing Foundation](https://www.cncf.io/) and is their most advanced and widely used CNI for Kubernetes - that is reason why you see me related this one on previous session - [[Kubewekend Session 3#Another components]]

Cilium will become a part of `Kubewekend` cluster and we will do more practically with this technology inside progress of `Kubewekend`, so excited 🙌

>[!info]
>At the foundation of Cilium is a new Linux kernel technology called eBPF, which enables the dynamic insertion of powerful security visibility and control logic within Linux itself. Because eBPF runs inside the Linux kernel, Cilium security policies can be applied and updated without any changes to the application code or container configuration.
>
>From [Introduction to Cilium & Hubble](https://docs.cilium.io/en/stable/overview/intro/#introduction-to-cilium-hubble "Permalink to this heading")

By leveraging Linux eBPF, `Cilium` retains the ability to doing some interesting things, like

- **[Protect and secure APIs transparently](https://docs.cilium.io/en/stable/overview/intro/#protect-and-secure-apis-transparently)** - *For most of modern application protocols such as REST/HTTP, gRPC and Kafka. `Cilium` plays role like firewall in L3 and L4 of Networking modelling. `Cilium` provides the ability to filter on individual application protocol requests.*

- **[Secure service to service communication based on identities](https://docs.cilium.io/en/stable/overview/intro/#secure-service-to-service-communication-based-on-identities)** - *Assigns a security identity to groups of application containers, provide the methodology to validate the identity at the receiving node for them*. (Use key-value store)

- **[Secure access to and from external services](https://docs.cilium.io/en/stable/overview/intro/#secure-access-to-and-from-external-services)** - *Allows to limit access to and from application containers to particular IP ranges.*

- **[Simple Networking](https://docs.cilium.io/en/stable/overview/intro/#simple-networking)** - *Easily to IP allocation without any coordination between hosts, supported for **Overlay** - Encapsulation-based virtual network spanning all hosts or **Native Routing:** Use of the regular routing table of the Linux host.*

- **[Load Balancing](https://docs.cilium.io/en/stable/overview/intro/#load-balancing)** - *Implements distributed load balancing for traffic between application containers and to external services and is able to fully replace components such as kube-proxy. The load balancing is implemented in eBPF using efficient hashtables allowing for almost unlimited scale.*

- **[Bandwidth Management](https://docs.cilium.io/en/stable/overview/intro/#bandwidth-management)** - *Implements bandwidth management through efficient EDT-based (Earliest Departure Time) rate-limiting with eBPF for container traffic that is egressing a node*

- **[Monitoring and Troubleshooting](https://docs.cilium.io/en/stable/overview/intro/#monitoring-and-troubleshooting)** - *Gain visibility and to troubleshoot issues is fundamental to the operation of any distributed system, such as **Event monitoring with metadata** - Retrieve what packet drop with full metadata, **Metrics export via Prometheus** - export metrics for Prometheus can be visualization, and use [Hubble](https://github.com/cilium/hubble/) to deep inspect what is going in Kubernetes via Cilium's provided*

## How to Install ?

![[Pasted image 20240721143940.png|center]]

>[!quote]
>Back to previous session, on the session 2, we are successful build and operate our cluster, but if you concern about when  you try `kubectl` get nodes, the state of `kubewekend` cluster is on not ready. It means we don't enable any CNI (Container Network Interface) inside cluster, check that on [[Kubewekend Session 2#Definition configuration for `kind`|Kind Configuration at Session 2]]. Therefore, we wait to in currently to operate and install `cilium` to `kubewekend` cluster

For start this lab, you can explore step at [Github - Kubewekend](https://github.com/Xeus-Territory/kubewekend?tab=readme-ov-file#cilium-and-ebpf---the-powerful-kernal-service-of-kubewekend-cluster)

You can find more information about setup `cilium` at: [Cilium Quick Installation](https://docs.cilium.io/en/stable/gettingstarted/k8s-install-default/)

```bash
# Download cilium
wget https://github.com/cilium/cilium-cli/releases/download/v0.16.11/cilium-linux-amd64.tar.gz

# Extract
tar -xzf cilium-linux-amd64.tar.gz

# Install cilium
sudo mv cilium /usr/local/bin/
```

And now you have `cilium-cli` on your host

![[Pasted image 20240721144055.png|center]]

You can install `cilium` to your cluster via this CLI

```bash
# Install cilium to your cluster
cilium install --version 1.15.6

# Validate of cilium after installation
cilium status --wait
```

![[Pasted image 20240721144133.png]]

And re-check again your state of node, all pods and node are ready for in-use, before to doing that check make sure you install `kubectl` if you don't have buddy

```bash
# Install kubectl from official page
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

# Change permission for your kubectl tool
chmod +x kubectl

# Install kubectl to your host
sudo mv kubectl /usr/local/bin
```

![[Pasted image 20240721144221.png]]

You can check and validate your state of cluster and pod via `get` command

```bash
kubectl get pods -A
```

![[Pasted image 20240721144246.png]]

```bash
kubectl get nodes
```

![[Pasted image 20240721144309.png]]

>[!done]
>Alright, everything is going same route, BTW we are full completely provision, and you can bring that cluster for your work LOL 😅. Sorry for my joke, but It really its because you have full components inside `kubewekend` and so the other session we will try to install extend things inside this cluster and have fun but now we keep moving with `cilium` and practical with this one.

## What can `Cilium` do?

So We are doing installation `cilium` to the kubewekend cluster, if you use `status` command, you can known about status of `cilium` inside kubewekend cluster, including

- `cilium-operator` in deployments
- `cilium` in daemonset

>[!info]
>Give you some information about `Operator` in Kubernetes, Operators are software extensions to Kubernetes that make use of [custom resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) to manage applications and their components. Operators follow Kubernetes principles, notably the [control loop](https://kubernetes.io/docs/concepts/architecture/controller).
>
>From *[Operator pattern](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/) - kubernetes.io*

>[!info]
>About `daemonset`, this is called type of workload inside Kubernetes Cluster, _DaemonSet_ ensures that all (or some) Nodes run a copy of a Pod. As nodes are added to the cluster, Pods are added to them. As nodes are removed from the cluster, those Pods are garbage collected. Deleting a DaemonSet will clean up the Pods it created.
>
>Some typical uses of a DaemonSet are:
>- running a cluster storage daemon on every node
>- running a logs collection daemon on every node
>- running a node monitoring daemon on every node

If you have those one in `kubernetes`, you can practice around the command `cilium` to understand what `cilium` can do for

### External `cilium` pods

You can use `--help` flag with `cilium-cli` to see more information

```bash
vagrant@k8s-master-machine:~$ cilium --help
CLI to install, manage, & troubleshooting Cilium clusters running Kubernetes.

Cilium is a CNI for Kubernetes to provide secure network connectivity and
load-balancing with excellent visibility using eBPF

Examples:
# Install Cilium in current Kubernetes context
cilium install

# Check status of Cilium
cilium status

# Enable the Hubble observability layer
cilium hubble enable

# Perform a connectivity test
cilium connectivity test

Usage:
  cilium [flags]
  cilium [command]

Available Commands:
  bgp          Access to BGP control plane
  clustermesh  Multi Cluster Management
  completion   Generate the autocompletion script for the specified shell
  config       Manage Configuration
  connectivity Connectivity troubleshooting
  context      Display the configuration context
  encryption   Cilium encryption
  help         Help about any command
  hubble       Hubble observability
  install      Install Cilium in a Kubernetes cluster using Helm
  status       Display status
  sysdump      Collects information required to troubleshoot issues with Cilium and Hubble
  uninstall    Uninstall Cilium using Helm
  upgrade      Upgrade a Cilium installation a Kubernetes cluster using Helm
  version      Display detailed version information

Flags:
      --context string             Kubernetes configuration context
      --helm-release-name string   Helm release name (default "cilium")
  -h, --help                       help for cilium
  -n, --namespace string           Namespace Cilium is running in (default "kube-system")

Use "cilium [command] --help" for more information about a command.
```

To setup completion with `cilium` in your shell, use `completion` and command into your shell profile, such as `zsh` or `bash`

```bash
# Use if your profile is bash
echo "source <(cilium completion bash) >> .bashrc"

# Use if your profile is zsh
echo "source <(cilium completion zsh) >> .zshrc"
```

![[Pasted image 20240721145540.png]]

You can check about `cilium` connectivity access in kubewekend cluster with providing scenarios from `cilium` via `connectivity test`

```bash
# If you validate connectivity

## Read manual of connectivity test command
cilium connectivity test --help

## Run tests inside cluster
cilium connectivity test

# If you want ti check network performance

## Read manual of connectivity perf command
cilium connectivity perf --help

## Run tests for check network performance
cilium connectivity perf
```

![[Pasted image 20240721145609.png]]

You will have `82` tests scenarios in kubewekend cluster, afterward you will get the result, if not any failure, your `cilium` work great with cluster

![[Pasted image 20240721145629.png]]

Fun things if you want to check about `echo-same-node` deployment, you can play with `port-forward` command inside `kubectl` and use reverse `ssh` to check the web-service before we setup `cilium` to expose service via domain

```bash
# Expose your service via localhost
kubectl port-forward -n cilium-test service/echo-same-node 8080:8080

# Because we do not hand-on any network inside `vmbox`, so we will use another way expose this service to your via `ssh-tunneling`
# Documentation: https://www.ssh.com/academy/ssh/tunneling-example

ssh -N -L 8080:127.0.0.1:8080 -i .vagrant/machines/k8s-master-machine/virtualbox/private_key vagrant@127.0.0.1 -p 6996
```

Access your host at `http://localhost:8080`

![[Pasted image 20240721145708.png]]

### Internal `cilium` pods

>[!quote]
>Quite fun a little bit, move on to inside `cilium` and inspect what is going on inside, view all the commands to use inside agent at [https://docs.cilium.io/en/latest/cheatsheet/](https://docs.cilium.io/en/latest/cheatsheet/)

```bash
# Find out the cilium pod
kubectl get pods -n kube-system

# Exec to the cilium pod to inspect more extensions
kubectl exec --tty --stdin -n kube-system cilium-xxxxx -- /bin/bash
```

First of all, you run `status` command to deep inspect about the agent

```bash
# Check basic status
cilium status

# Check more about information on all controllers, health and redirects
cilium status --all-controllers --all-health --all-redirects
```

![[Pasted image 20240721145843.png]]

Get current agent configuration

```bash
# Check configuration in basic
cilium config

# View all configuration of agent
cilium config --all
```

![[Pasted image 20240721145907.png]]

Run a monitoring to capture all traffic like `tcpdump` inside cluster, with `monitor` command

```bash
# All Traffic monitoring
cilium monitor

# Monitoring with verbose version
cilium monitor -v

# Monitoring with only L7
cilium monitor -t l7
```

![[Pasted image 20240721145932.png]]

Move on to check about `service` to view all loadbalancer services inside cluster

```bash
# View all services routing
cilium service list

# View specific services routing
cilium service get <id> -o json
```

![[Pasted image 20240721145957.png]]

>[!info]
>If you can see in service list, you can understand what is going on about networking map of all services inside Kubernetes cluster, metadata from IP, Type of service and if you do more inspect with specific you can see more information about `services` in network landscape

More over you can see about bpf level of load balancer

```bash
cilium bpf lb list
```

But we don see anything because we do not operate any load balancer configuration, this stuff we will be considered on session when operate the application, don't worry 😄

In the last one, we will try to see the `endpoint` inside cluster is useful optional in `cilium`

```bash
# Get list of all local endpoints
cilium endpoint list

# Get detailed view of endpoint properties and state
cilium endpoint get <id>

# Show recent endpoint specific log entries
cilium endpoint log <id>

# Turn on or off debug in monitor of target endpoint
cilium endpoint config <id> Debug=true
```

![[Pasted image 20240721150619.png]]

>[!quote]
>`cilium` is more powerful, but if i list all, we will make this session become boring. So if you want to explore more features, check out at: [https://docs.cilium.io/en/latest/cmdref/](https://docs.cilium.io/en/latest/cmdref/)

>[!done]
>We practice with `CLI` to much, and I know some persons are not familiar with this and can be annoyed. Therefore, we stop `cilium` and explore more in others session because `kubewekend` is still long LOL. Moving on the another sub-project of `cilium` is `hubble` and `hubbleUI` to see how the networking inside Kubewekend operate

# Hubble

![[Pasted image 20240721151150.png]]

Moving to introduce part to understand what is `hubble` and figure out what `hubble` can do inside Kubewekend, before start you can double check at [Documentation](https://docs.cilium.io/en/stable/gettingstarted/hubble_intro/)

## Introduce

>[!info]
><h3>Hubble</h3>
>
>A fully distributed networking and security observability platform. It is built on top of Cilium and eBPF to enable deep visibility into the communication and behavior of services as well as the networking infrastructure in a completely transparent manner.

By building on top of Cilium, Hubble can leverage eBPF for visibility, such as

- **[Service dependencies & communication map](https://docs.cilium.io/en/stable/overview/intro/#service-dependencies-communication-map)** - *Monitoring about communication between services, frequently, service dependency graph look like, HTTP call look like and with Kafka you can understand topics comsume from or produce to*

- **[Network monitoring & alerting](https://docs.cilium.io/en/stable/overview/intro/#network-monitoring-alerting)** - *Monitoring about any network communication failing, Why is communication failing and help us figure out problems, deep inspect about DNS, TCP and packet request inside TCP handshake like ACK SYN or what ever*

- **[Application monitoring](https://docs.cilium.io/en/stable/overview/intro/#application-monitoring)** - *Provide the rate of 5xx or 4xx HTTP response codes for a particular service or across all clusters, the 95th and 99th percentile latency between HTTP requests and responses in my cluster, which services are performing worst ? What is the latency between two services ?*

- [Security observability](https://docs.cilium.io/en/stable/overview/intro/#security-observability) - Monitoring about any connections blocked by network policies, any services access from outside cluster and understand services have resolved a particular DNS name

>[!info]
>Like the introduce from official homepage of `cilium`, I recommend you to watch [eCHO episode 2: Introduction to Hubble](https://www.youtube.com/watch?v=hD2iJUyIXQw&t=187s) to explore about Hubble and understand about this one

<iframe width="560" height="315" src="https://www.youtube.com/embed/hD2iJUyIXQw?si=-7ujaPw7kXKn5HVH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Now we will move to practice with `Hubble` and see what do service can do, alright !!

## How to install

Back to Kubewekend cluster, you need return shell of `vagrant` host to continue enable `hubble` via `cilium-cli`

```bash
cilium hubble enable
```

And now use `status` to see if `hubble` run or not

![[Pasted image 20240721152654.png]]

With hubble enable, kubewekend cluster will add a new thing run as deployment `hubble-relay`. But your version is deploy will not have any accesable, you need install add-on like `hubble-client` and `hubble-ui` to more visualize about `hubble`.

>[!info]
>In the general architecture, Hubble exposes gRPC services from the Cilium process that allows clients to receive flows and other type of data.

When we try to enable `hubble` with `cilium`, we will have `hubble-relay`, what is this service meaning? Explore at: [Hubble internals](https://docs.cilium.io/en/stable/internals/hubble/)

![[Pasted image 20240721153303.png]]

In Hubble will exist two components, *following Hubble internals - cilium.io*

- **[Hubble Server](https://docs.cilium.io/en/stable/internals/hubble/#hubble-server)**:  *The server will implement two gRPC services. The **[Observer service](https://docs.cilium.io/en/stable/internals/hubble/#the-observer-service)** which may optionally be exposed via a TCP socket in addition to a local Unix domain socket and the **[Peer service](https://docs.cilium.io/en/stable/internals/hubble/#the-peer-service)**, which is served on both as well as being exposed as a Kubernetes Service when enabled via TCP.*
- **[Hubble Relay](https://docs.cilium.io/en/stable/internals/hubble/#hubble-relay)**: *The Hubble component that brings multi-node support. It leverages the Peer service to obtain information about Hubble instances and consume their gRPC API in order to provide a more rich API that covers events from across the entire cluster*


Now when `hubble-relay` we need install `hubble-server` by `hubble-client`, and to installing that one you need use few command to download and setup that for your `vagrant` host

```bash
HUBBLE_VERSION=$(curl -s https://raw.githubusercontent.com/cilium/hubble/master/stable.txt)
HUBBLE_ARCH=amd64
if [ "$(uname -m)" = "aarch64" ]; then HUBBLE_ARCH=arm64; fi
curl -L --fail --remote-name-all https://github.com/cilium/hubble/releases/download/$HUBBLE_VERSION/hubble-linux-${HUBBLE_ARCH}.tar.gz{,.sha256sum}
sha256sum --check hubble-linux-${HUBBLE_ARCH}.tar.gz.sha256sum
sudo tar xzvfC hubble-linux-${HUBBLE_ARCH}.tar.gz /usr/local/bin
rm hubble-linux-${HUBBLE_ARCH}.tar.gz{,.sha256sum}
```

Now validate the hubble API Access

## What can `Hubble` do?

>[!note]
>In order to access the Hubble API, create a port forward to the Hubble service from your local machine. This will allow you to connect the Hubble client to the local port 4245 and access the Hubble Relay service in your Kubernetes cluster.

```bash
# Use via cilium
cilium hubble port-forward

# use via kubectl
kubectl port-forward -n kube-system service/hubble-relay 4245:80
```

And lastly, you can view status and observe via `hubble`

```bash
# View status
hubble status

# Observe API
hubble observe
```

<h3>Hubble Status</h3>

![[Pasted image 20240721154033.png]]

<h3>Hubble observe</h3>

![[Pasted image 20240721154104.png]]

>[!info]
>Like you run `tcpdump` inside the `kubernetes` and collect all of thing inside, but one question put in here, does that insecure or secure for monitoring?

Following, we try to use `hubble` to inspect and figure out what inside `kubernetes`, so if you follow the [eCHO episode 2: Introduction to Hubble](https://www.youtube.com/watch?v=hD2iJUyIXQw)

- You can see the all request from L7 like HTTP, DNS and moreover like Kafka and header or request actually still there, so that why Hubble is running inside `cluster` instead like service.
- Therefore, you need have `kubernetes` configuration to connect and install `hubble` inside your `kubernetes` cluster. 
- Honestly, secure or insecure base on your decision, in my perspective, `hubble` do great and right target purpose, so consider when try to enable Hubble and use Hubble to doing same thing, for prevent [GDPA](https://www.globaldpa.org/) I not sure about that

>[!quote]
>But we are practitioner, and we try and failure that why we stand there learn about new technologies. If you find more about GDPA, maybe I don't make sure anything be secure on `kubewekend` cluster that why we will find and figure out in this series

Now we are reaching to `web-ui` part, which one can make `hubble` become special for some cases. Try this command to enable `ui`

```bash
cilium hubble enable --ui
```

Wait for a minute, and use `status` command with `cilium` to view your `ui` is enabling

![[Pasted image 20240721160406.png]]

Use `port-forward` to expose `web-ui` to your localhost

```bash
# Use via cilium
cilium hubble ui

# Use port-foward of kubectl instead
kubectl port-forward -n kube-system service/hubble-ui 12000:80
```

You will hard to connect to `vagrant` host if you not attacked to `vmbox`, so instead of I use `ssh-tunnel` to connect `hubble-ui`

```bash
ssh -N -L 12000:127.0.0.1:12000 -i .vagrant/machines/k8s-master-machine/virtualbox/private_key vagrant@127.0.0.1 -p 6996
```

Now you can access `http://localhost:12000` to view web-ui of `hubble`

![[Pasted image 20240721160502.png]]

Inspect real time with example when use `connectivity` scenarios

```bash
while true; do cilium connectivity test; done
```

![[Pasted image 20240721160535.png]]

>[!done]
>If you can see, all of traffic what route path and communication between of them is exposing, that visualization can make you more understand of your cluster and what is going on inside, and lastly It's totally free. 

>[!quote]
>And when you want to find the alternative but cost a little, go check about [kubeshark](https://www.kubeshark.co/) - API Traffic Analyzer, not equally `hubble` but contain some feature can be used and really supper cool 🥶 BTW. But trust me, `hubble` do incredible things and quite fun a lots, awesome technics

# Conclusion

>[!done]
>This is @all for this weekend, hope you find well with my contents and drop me idea on my email if you want figure out some thing. Happier to share with you about `eBPF` what technology is cherished and researched for a long time to be able to share, and do more especially with `cilium` and `hubble`, those things will become the new wind on native-cloud and create a place in the community, honestly I believe

>[!quote]
>So give thankful and appreciate for `eBPF`, `BPF` , `Isovalent` , `Cilium` and `Hubble` to bring pleasant technology, huge community and do lot of funs thing inside the Kubernetes. And give warmful for my viewers who to catch my contents. And one again, stay safe and learn more things, I will see you as soon as next the weekend. Bye Bye @all 🙌🙌





