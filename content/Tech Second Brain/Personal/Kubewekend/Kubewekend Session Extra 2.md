---
title: "Kubewekend Session Extra 2: Rebuild Cluster with RKE2 or K3S"
tags:
  - kubewekend
  - k8s
  - devops
  - self-hosted
  - usage
---
>[!quote]
>Hi there, happy to see you there, I just start the holiday in my country, so spend a bit time in weekend to chill out and learn couple things. I figure out one problem in Kubewekend Cluster, we use `kind` and it's tricky a bit when we do more stuff to handout with CSI, I don't deny any thing `kind` do for community, it's truly crazy but sometime we need to consider another to hangout with good potentials and easier to setup, `RKE` and `K3S` maybe save us some points today. Let's digest

# The Actual Problem of Mine

![[meme-failure.png|center|500]]

If you work with [kind](https://kind.sigs.k8s.io/), you will figure out how hard to setup a couple of core Kubernetes features with this platform

- High Availability (HA) - Default the concept `kind` will provision your K8s Cluster depend on initialization file `kind-config.yaml`, but you can walk through a bit concept to retrieve that but it ain't gonna easy, like expand manually via `join-node` for `master` or `worker`. Read more at [[Kubewekend Session 5|Kubewekend Session 5: Build HA Cluster]]
- CSI (Container Storage Interface) - The second challenge when use `kind` is about storage, you can bring up the popular concept into `kind` cluster but some situation that not work well because `kind` run inside docker, and you need to setup another layer in this layer, in some situation that pretty hard for control (NOTE: 100% you will stuck in this step a bit). Find more about conceptual with [[Kubewekend Session 6|Kubewekend Session 6: CSI and Ceph with Kubewekend]] and [[Kubewekend Session Extra 1|Kubewekend Session Extra 1: Longhorn and the story about NFS in Kubernetes]]

But I don't deny anything what incredible `kind` bring up for us, if I want to testing not relate to CSI and add more node, `kind` is always top 1 in my mind, that pretty provide a good environment for experiment, simple and clear to define any structure deployment in Kubernetes.

If you wanna find the solution storage for `kind`, I really recommend you for using

- Kind's Default `standard` StorageClass - This uses the built-in **Local Path Provisioner**
- [CSI Hostpath Driver](http://github.com/kubernetes-csi/csi-driver-host-path) - If you *really* need CSI features
- If you find to NFS Server, you can try [csi-driver-nfs](https://github.com/kubernetes-csi/csi-driver-nfs) and [nfs-subdir-external-provisioner](https://github.com/kubernetes-sigs/nfs-subdir-external-provisioner)

BTW, there some another candidates pop up in my mind, and it will try solve some problems not convenient of `kind`, let's read a couple of articles to explore

- [K0s Vs. K3s Vs. K8s: The Differences And Use Cases](https://www.nops.io/blog/k0s-vs-k3s-vs-k8s/)
- [Minikube vs. Kind vs. K3s](https://www.devzero.io/blog/minikube-vs-kind-vs-k3s)
- [Medium - Simple Comparison of Lightweight K8S Implementations](https://alperenbayramoglu2.medium.com/simple-comparison-of-lightweight-k8s-implementations-7c07c4e6e95f)

[RKE2](https://docs.rke2.io/) and [K3s](https://k3s.io/) are both great choices when you want to use full compatibility Kubernetes in host, it means this will optimize for you setup storage, HA, CSI with good behavior than `kind`

## RKE2

![[thumbnail-rke2.png|center]]

>[!info]
><h3>RKE2</h3>
>
>[RKE2](https://docs.rke2.io/) is Rancher's enterprise-ready next-generation Kubernetes distribution. It is a fully [conformant Kubernetes distribution](https://landscape.cncf.io/?group=projects-and-products&view-mode=card&item=platform--certified-kubernetes-distribution--rke-government#app-definition-and-development--application-definition-image-build) that focuses on security and compliance within the U.S. Federal Government sector.

A couple of special features of RKE2, we will have

- Security and Compliance Focused
- Simple Installation and Operation
- Containerd Runtime
- Static Pods for Control Plane
- Close to Upstream Kubernetes
- Embedded etcd
- Designed for Various Environments
- Based on Lessons from K3s

I happen to use `RKE2` because it's the cluster type used at my job. I find that `RKE2` offers stable configuration and comes with enough defaults to quickly set up a fully compatible cluster. However, I'm not completely sold on it because it has a lot of aspects to consider, though it's not a big problem, like

- **Require Certificate rotation after 365 days**: Because security compliance, it requires you for rotation the certificate for enhancing the security
- **Requirement a bit techniques for debugging in Linux**, especially `systemd` to finally understand what happen with `rke2`
- **A couple of tricky in configuration** to successfully provision `RKE2`, especially for GPU Machine
- **Must fully managing both `RKE2 Server` and `RKE2 Agent`**, that's pretty fun but sometime that cause you a lot of stuff. That's why It will require you a bit hardware to configure `RKE2`

>[!quote]
>But like I said, that's not a big deal when you use RKE2. You end up with a complete Kubernetes cluster that's well-behaved, stable for production, and has a large community for support. If you're just a little careful when you work with RKE2, your cluster will run well, trust me! 😄

Now coming with me to see around about [RKE2 Architecture](https://docs.rke2.io/architecture)

![[thumbnail-rke2-arch.png]]

`RKE2` seem like enough things for us to do great stuff with enterprise environment, such as

- Have both `Server` for **control plane, etcd or api-server** and `Agent` for **K8s Workloads**, that make `RKE2` seem clearly task responsibility for each components
- Run container with `containerd` runtime, that will become standard CRI of containerization world, bring a good performance, lightweight and remove complexity layer compare with another runtime, like `Docker`
- We have `etcd` for embedded cluster datastore, 🤔 I don't like `etcd` because not actually dive into this much but not deny the enormous feature and compatibility with `RKE2`. Explore more about [etcd client architecture](https://etcd.io/docs/v3.3/learning/client-architecture/) and [etcd versus other key-value stores](https://etcd.io/docs/v3.3/learning/why/)

Nowadays, `RKE2` is supporting into version 1.32 (Following closest the Kubernetes Native version, it's really impressive), check some version down below

- [RKE2 - V1.32.x](https://docs.rke2.io/release-notes/v1.32.X)
- [RKE2 - V1.31.x](https://docs.rke2.io/release-notes/v1.31.X)
- [RKE2 - V1.30.x](https://docs.rke2.io/release-notes/v1.30.X)
- [RKE2 - V1.29.x](https://docs.rke2.io/release-notes/v1.29.X)
- [RKE2 - V1.28.x](https://docs.rke2.io/release-notes/v1.28.X)
- [RKE2 - V1.27.x](https://docs.rke2.io/release-notes/v1.27.X)

## K3s

![[thumbnail-k3s.png]]

>[!info]
><h3>K3s</h3>
>
>[K3s](https://docs.k3s.io/) is Lightweight Kubernetes. Easy to install, half the memory, all in a binary of less than 100 MB and It's a fully compliant Kubernetes

With such a great features, including

- Distributed as **a single binary or minimal container** image.
- **Lightweight datastore based on sqlite3** as the default storage backend.
- **External dependencies have been minimized**; the only requirements are a modern kernel and cgroup mounts.
- Packages the **required dependencies for easy "batteries-included"** cluster creation
- Wrapped in **simple launcher** that **handles** a lot of the **complexity of TLS and options**.
- **Secure by default with reasonable** defaults for lightweight environments.
- Operation of all Kubernetes **control plane** components is **encapsulated in a single binary and process**, allowing K3s to automate and manage complex cluster operations like distributing certificates.

If you're searching for a lighter version of Kubernetes that's easier to control and has fewer moving parts, but still gives you all the core Kubernetes capabilities, `K3s` is a fantastic option to begin with. I've seen many tutorials that use `K3s` to get a self-hosted Kubernetes environment up and running quickly, which is why I'm suggesting it. You can find a detailed setup guide in Khue Doan's homelab repository on GitHub: [GitHub - khuedoan's homelab](https://github.com/khuedoan/homelab) **(Big shoutout to Khue Doan for putting together such a useful starting tutorial for anyone wanting to build a homelab with `K3s`! 🙌)**

Lemma bring you to check around `K3s` Architecture

![](https://docs.k3s.io/assets/images/how-it-works-k3s-revised-9c025ef482404bca2e53a89a0ba7a3c5.svg)

As you can see, `K3s` is pretty clear but cover a bunch of concepts of Kubernetes

- Able to self-hosted both `Server` and `Agent`
- Use `Containerd` for container runtime
- Like `RKE2`, `K3s` offer us two type selfhosted with only Server and HA Cluster, but you can have another options instead of embedded DB with `etcd` with ExternalDB, like `PostgreSQL`, `MySQL`, ...

`K3s` also follow closer version with Kubernetes upto V1.32, you can find version at

- [K3s - V1.32.x](https://docs.k3s.io/release-notes/v1.32.X)
- [K3s - V1.31.x](https://docs.k3s.io/release-notes/v1.31.X)
- [K3s - V1.30.x](https://docs.k3s.io/release-notes/v1.30.X)
- [K3s - V1.29.x](https://docs.k3s.io/release-notes/v1.29.X)
- [K3s - V1.28.x](https://docs.k3s.io/release-notes/v1.28.X)
- [K3s - V1.27.x](https://docs.k3s.io/release-notes/v1.27.X)

## So why we have K3s and RKE2

>[!info]
>Following the documentation of [RKE2](https://docs.rke2.io/#how-is-this-different-from-rke-or-k3s), They try to give us more information about two type of Kubernetes because `RKE2` is the highest version, with combination of `RKE1` and `K3s`

Here's a table highlighting the key differences between K3s and RKE2:

|   |   |   |
|---|---|---|
|Feature|K3s|RKE2 (Rancher Kubernetes Engine 2)|
|Primary Goal|Lightweight, easy to use, ideal for edge, IoT, and development.|Security and compliance focused, enterprise-ready, suitable for government and regulated industries.|
|Security Focus|Secure by default with reasonable defaults. Smaller attack surface.|Strong focus on security: CIS Benchmark hardening, FIPS 140-2 compliance, regular CVE scanning.|
|Upstream Alignment|May deviate slightly from upstream to achieve its lightweight goals.|Aims for closer alignment with upstream Kubernetes.|
|Default Datastore|SQLite (embedded), with options for etcd, MySQL, and PostgreSQL.|etcd (embedded).|
|Container Runtime|containerd (default), can be configured with Docker.|containerd (default), Docker is not a dependency. Control plane components run as static pods managed by kubelet.|
|Binary Size|Very small (< 100MB).|Larger than K3s due to added security features and components.|
|Resource Footprint|Minimal, designed for resource-constrained environments.|Higher than K3s due to added security and enterprise features, but still relatively lightweight compared to full Kubernetes.|
|Use Cases|Edge computing, IoT devices, single-node development, homelabs, CI.|Enterprise environments, government sectors, regulated industries with strict security and compliance requirements, multi-cloud, edge, and on-premises deployments.|
|Complexity|Simpler to install and manage, fewer moving parts by default.|More configuration options for security and advanced features, might have a slightly steeper learning curve than basic K3s setup.|
|Cloud Provider Integration|Strips out in-tree cloud providers, relies on out-of-tree (CCM).|Includes support for cloud provider integrations.|
|Storage Provisioning|Local Path Provisioner included by default. Relies on CSI for more advanced storage.|Supports in-tree storage providers and CSI.|
|Target Audience|Developers, hobbyists, users with resource-limited environments.|Enterprises, government agencies, security-conscious organizations.|
You can choose what ever you want, but need to consider a bit things to make a good decision

- Choose **K3s** when you need a lightweight and easy-to-use Kubernetes distribution, especially for edge computing, IoT, or local development. It prioritizes simplicity and low resource consumption.
- Choose **RKE2** when security and compliance are paramount, and you need an enterprise-ready distribution that aligns closely with upstream Kubernetes. It's designed for more regulated and mission-critical environments.

## The alternative version

If you wanna find to setup fully compliant Kubernetes Cluster, there are few options for choosing, include

- [Kubeadm](https://kubernetes.io/docs/reference/setup-tools/kubeadm/) - A CLI Tool helps turn your host into Kubernetes Cluster
- [talos](https://github.com/siderolabs/talos) - A modern Linux distribution built for Kubernetes.
- [K0s](https://docs.k0sproject.io/stable/): k0s is an open source, all-inclusive Kubernetes distribution, which is configured with all of the features needed to build a Kubernetes cluster.
- Moreover solution to operate Kubernetes out there
# Learn and take note about RKE2

![[meme-learn-new-daily.png|center]]

>[!quote]
>When you self-hosted `RKE2`, you should follow documentation that covered a lot of stuff to follow, but in some case, you need to know a bit tricky to finish configuring the Kubernetes Cluster

A couple of useful documentations should be taken care

- [RKE2 - Quick Installation](https://docs.rke2.io/install/quickstart)
- [RKE2 - High Availability](https://docs.rke2.io/install/ha)
- [RKE2 - Advanced Options and Configuration](https://docs.rke2.io/advanced)
- [RKE2 - Configuration Options](https://docs.rke2.io/install/configuration)
- [RKE2 - Upgrade](https://docs.rke2.io/upgrades/manual_upgrade)
- [RKE2 - Uninstall](https://docs.rke2.io/install/uninstall)

## Installation RKE2

Following documentation, we will have two type of selfhosted `RKE2`, including

- Normal Cluster - 1 master and multiple workers
- HA Cluster - 2 or more masters (should be odd number) and multiple workers

You can read [RKE2 - Quick Installation](https://docs.rke2.io/install/quickstart) and hand on following this concept, I will try to describe behavior each step

1. First of all, you should update and install a couple of things for your host and please make sure your host allow some [RKE2 requirements](https://docs.rke2.io/install/requirements)

```bash
sudo apt update
sudo apt install curl wget nano -y
```

2. Next, we will `curl` command to interact with script from `RKE2` with couple of variables need to consider

```bash
# Install Server
curl -sfL https://get.rke2.io | INSTALL_RKE2_VERSION="xxx" sh -

# Install Agent
curl -sfL https://get.rke2.io | INSTALL_RKE2_TYPE="agent" INSTALL_RKE2_VERSION="xxx" sh -
```

If you inspect the script at https://get.rke2.io, you will see some environment for setting this script and you should care about

- `INSTALL_RKE2_TYPE`: Type of rke2 service. Can be either "server" or "agent" **(Default is "server")**
- `INSTALL_RKE2_VERSION`: Version of rke2 to download
- `INSTALL_RKE2_CHANNEL`: Channel to use for fetching rke2 download URL **(Defaults to 'stable')**

This step will cover whole step to setup `systemd` for `rke2-server`, `rke2-agent` and prepare manifest, artifact for initialization your `rke2`

3. With the normal cluster, you just need only start `rke2-server` if you set up master node after previous complete

```bash
sudo systemctl enable rke2-server
sudo systemctl start rke2-server
```

Wait a bit around 30s - 1 Mins, but sometime it takes longer but don't worry, after that you can check status of service, run or not

```bash
# Use systemd
sudo systemctl status rke2-server

# Use journalctl
sudo journalctl -xeu rke2-server -f
```

If state of `rke2-server` is running and do not log any error, you can configure agent to join for cluster. But first read the node-token at `/var/lib/rancher/rke2/server/node-token`

```bash
cat /var/lib/rancher/rke2/server/node-token
```

Now prepare the configure for agents node to join cluster

```bash
# Default Agent will not exist this PATH, you should create
mkdir -p /etc/rancher/rke2

# Use nano or vim to edit config.yaml in this PATH
nano /etc/rancher/rke2/config.yaml
```

You should read two of these, [Server Configuration Reference](https://docs.rke2.io/reference/server_config) and [Agent Configuration Reference](https://docs.rke2.io/reference/linux_agent_config)

```yaml title="/etc/rancher/rke2/config.yaml"
# Requirements
server: master-server # e.g: https://<ip>:9345
token: master-token # master token for joining cluster
node-ip: ip-server # IP address of agent
# Optional
node-label:
	- "env=dev"
```

Now you can turn on the agent, and you can check the health of your agent with `kubectl` command

```bash
# Enable RKE2 Agent Service
sudo systemctl enable rke2-agent

# Start the RKE2 Agent
sudo systemctl start rke2-agent
```

Like I told, you can check the status, like logs or health of agent via `kubectl` or directly via `journalctl` command

```bash
# Get node for check the state
kubectl get nodes

# Get log of service
sudo journalctl -xeu rke2-agent -f
```

>[!info]
>This way is kinda simple because I just follow the same behavior with documentation to start normal Cluster. But if you setup HA Cluster, you can double check in next part

## Setup RKE2 High Availability

For production, the high availability is required and `RKE2` let us operate this option, explore more at [RKE2 - High Availability](https://docs.rke2.io/install/ha)

![[thumbnail-rke2-ha.png]]

As you can see, `RKE2` build up the HA Solution depend on [Raft Architecture](https://raft.github.io/), which will have

- A **fixed registration address** that is placed in front of server nodes to allow other nodes to register with the cluster
- An odd number (three recommended) of **server nodes** that will run etcd, the Kubernetes API, and other control plane services
- Zero or more **agent nodes** that are designated to run your apps and services

>[!info]
>`etcd` uses the Raft algorithm, which requires a quorum (majority) of nodes to agree on changes. To guarantee quorum even when some servers are down, you need an odd number of server nodes in your `etcd` cluster.
>
>This odd number allows the cluster to tolerate the failure of a minority of nodes without losing its ability to make decisions. For example, in a 3-node cluster, one node can fail. In a 5-node cluster, two can fail. While adding more odd-numbered nodes increases the fault tolerance (more failures can be handled), it also increases the total number of nodes that are potential points of failure.

You can read more about Why Raft Algorithm and How can `etcd` setup articles below

- [Dev.to - Understanding etcd's Raft Implementation: A Deep Dive into Raft Log](https://dev.to/justlorain/understanding-etcds-raft-implementation-a-deep-dive-into-raft-log-bdn)
- [etcd - FAQ](https://etcd.io/docs/v3.5/faq/)

So I will share more about `etcd` in another blogs, but lemme focus on RKE2 HA Setup with some steps, following

1. Configure a fixed registration address
2. Launch the first server node
3. Join additional server nodes
4. Join agent nodes

>[!info]
>For consistence environment for Kubernetes, you should have stable endpoint front of server nodes, that why you should have fixed registration address server

When you turn on the sever with fixed registration, you can use `node-token` to join for both `server` and `agent` into this server to create HA Cluster

## Setup GPU Worker

When you setup worker with GPU, that pretty especial than normal version, because you need create bridge or driver to let your RKE2 Agent can interact with Graphic Card inside Node via Kubernetes Layer. To handle this case, you should double-check about [RKE2 - Deploy NVIDIA operator](https://docs.rke2.io/advanced#deploy-nvidia-operator) and [HAMI - Configure containerd](https://project-hami.io/docs/installation/prequisities#configure-containerd)

First of all, you need to install [NVIDIA Operator](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/index.html) to support your node can communicate with your Graphic Card, you can install that via multiple ways

- [ArtifactHub](https://artifacthub.io/packages/helm/gpu-operator/gpu-operator) and [Helm Chart](https://github.com/NVIDIA/gpu-operator/tree/main/deployments/gpu-operator)
- [Manifest](https://docs.rke2.io/advanced#operator-installation) - Defined by `RKE2`

Secondly, you need to install [HAMI Helm Chart](https://project-hami.io/docs/installation/online-installation) (Optionals) for support virtualization GPU inside Kubernetes environment (NOTE: If you want to use GPU efficiency, you need to think about HAMI in your techstack)

When you configure Worker GPU, HAMI require you configure some `node-label` inside `/etc/rancher/rke2/config.yaml`

```yaml title="/etc/rancher/rke2/config.yaml"
# Requirements
server: master-server # e.g: https://<ip>:9345
token: master-token # master token for joining cluster
node-ip: ip-server # IP address of agent
# Optional
node-label:
  - "env=dev"
  # Require when you setup with HAMI
  # Documentation: https://project-hami.io/docs/installation/prequisities#label-your-nodes
  - "gpu=on"
```

Now run `rke2-agent` service for create a manifest and configure file generated for `agent` and `containerd`

```bash
sudo systemctl start rke2-agent
```

Copy exist file `config.toml` and overwrite with new one `config.toml.tmpl`, explore more at [RKE2 - Configuring containerd](https://docs.rke2.io/advanced?_highlight=gpu#configuring-containerd), because `containerd` doesn't recommend you edit directly inside `config.toml`, but you need edit inside `config.toml.tmpl` and it will automatically mapping your configuration

```bash
cp /var/lib/rancher/rke2/agent/etc/containerd/config.toml /var/lib/rancher/rke2/agent/etc/containerd/config.toml.tmpl
```

Modify add new configuration for `config.toml.tmpl` for configuration `hami`, explore more at [Hami - Prequisities Installation](https://project-hami.io/docs/installation/prequisities)

```toml
version = 2
[plugins]
  [plugins."io.containerd.grpc.v1.cri"]
    [plugins."io.containerd.grpc.v1.cri".containerd]
      default_runtime_name = "nvidia"

      [plugins."io.containerd.grpc.v1.cri".containerd.runtimes]
        [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.nvidia]
          privileged_without_host_devices = false
          runtime_engine = ""
          runtime_root = ""
          runtime_type = "io.containerd.runc.v2"
          [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.nvidia.options]
            BinaryName = "/usr/bin/nvidia-container-runtime"
```

Restart `containerd`

```bash
sudo systemctl daemon-reload && systemctl restart containerd
```

Restart `rke2-agent` to sync up again

```bash
sudo systemctl restart rke2-agent
```

## Note of RKE2

![[meme-awesome.png|center]]

>[!info]
>This is my personal checklist of key things I've learned about RKE2, along with some useful tips to make managing it easier, more streamlined, and even enjoyable. As I mentioned, RKE2 is a really powerful open-source tool, but it can present some complex management challenges.
### Access the cluster

If you wanna to access cluster `RKE2`, you should read few configurations and issues to let you remove complex to connect your cluster, setup `GitOps` (e.g: `flux` or `argocd`), ...

- [RKE2 - Cluster Access](https://docs.rke2.io/cluster_access)
- [Github Issue - error: Unable to connect to the server: x509: certificate is valid for ...](https://github.com/rancher/rke2/issues/852)

As you know, `RKE2` will write the `kubeconfig` file in `/etc/rancher/rke2/rke2.yaml`, so you can use this to connect directly inside your server host, it means if another tools outside the cluster, It won't able to connect into Kubernetes Cluster. So how can we treat that ? If you read [RKE2 - High Availability](https://docs.rke2.io/install/ha), you will aware about file created by own `/etc/rancher/rke2/config.yaml` before you start `server` or `agent`, that why we can add another domain, IP Address for let outside cluster can able communicate with KubeAPI inside RKE2 Cluster at `tls-san`

```yaml title="/etc/rancher/rke2/config.yaml" {2-5}
token: my-shared-secret  
tls-san:  
- my-kubernetes-domain.com # Domain Address
- another-kubernetes-domain.com # Another Domain Address
- 192.168.xx.xx # IP address
```

>[!note]
>As usual, that will require you configure into where you get certificate, as normal cluster, you can setup inside your master node, and in HA situations, you can set it up inside your master node used for fix registration

After you configuration, you will be able to connect your outside machine into Kubernetes Cluster, remember **exchange IP Address to remote/public** and **open port 6443** to allow the conversation
### GPU Problems

- [Github Issue - Following gpu-operator documentation will break RKE2 cluster after reboot](https://github.com/NVIDIA/gpu-operator/issues/992)
- [GitHub Issue - How to solve could not load NVML library: libnvidia-ml.so.1](https://github.com/NVIDIA/k8s-device-plugin/issues/478)

About this problem, I do not pretty well with this case, and It becomes more complicated if you miss some configuration, but remember and check some situation if you missing or try to bypass when initialize cluster

1. Install driver for graphic card inside your host, especially `libnvidia-ml.so.1`, read more about [RKE2 - Host OS requirements](https://docs.rke2.io/advanced#host-os-requirements). There are some documentation for following

	- [Ubuntu - NVIDIA drivers installation](https://documentation.ubuntu.com/server/how-to/graphics/install-nvidia-drivers/index.html)
	- [PhoenixNAP - How to Install Nvidia Drivers on Ubuntu](https://phoenixnap.com/kb/install-nvidia-drivers-ubuntu)

	```bash
	#!/bin/bash
	sudo apt update
	sudo apt install g++ freeglut3-dev build-essential libx11-dev libxmu-dev libxi-dev libglu1-mesa libglu1-mesa-dev -y
	sudo add-apt-repository ppa:graphics-drivers/ppa -y
	sudo apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2004/x86_64/3bf863cc.pub
	echo "deb https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2004/x86_64 /" | sudo tee /etc/apt/sources.list.d/cuda.list
	sudo apt update
	sudo apt install libnvidia-common-535 libnvidia-gl-535 nvidia-driver-535 -y
	```

2. Double-check about your [Nvidia Container Runtime](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/index.html), because I aware RKE2 configure this stuff in kinda strange way but in somehow your Cluster run with not much affordable to edit your GPU node

	- [Nvidia - Installing the NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html)
	- [Nvidia - Troubleshooting NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/troubleshooting.html)
	
	```bash
	# Check the version of nvidia-container-runtime
	nvidia-container-runtime --version
	
	# Check the configuration of nvidia-container-runtime
	cat /etc/nvidia-container-runtime/config.toml
	```
	
	In some crazy situation, you won't understand why your host miss `runc` in starting but your cluster run stable before node reboot again (Trust me, it really strange 😄)
	
	- [Github - RunC](https://github.com/opencontainers/runc)
	- [Ubuntu - RunC Package](https://launchpad.net/ubuntu/+source/runc)
	- [How To Install runc on Ubuntu 22.04](https://installati.one/install-runc-ubuntu-22-04/)
	
	```bash
	# Install runc
	sudo apt update
	sudo apt install runc -y
	
	# Double check runc version
	runc --version
	```

3. Double check and following requirement of [HAMI - Prequisities](https://project-hami.io/docs/installation/prequisities/)

	- Remember configure container-runtime with expectation of HAMI inside `containerd` configuration at `/var/lib/rancher/rke2/agent/etc/containerd/config.toml.tmpl`
	- Add label `gpu=on` on `/etc/rancher/rke2/config.yaml` to let your node reboot but without misconfiguration, because usually you will edit directly manifest with `kubectl` command

	To use the HAMI, you can following the concept to configure your manifest of Kubernetes like using annotation to configure resource and gpu-types for workload used GPU, mostly AI Services. Supportive reservation resource been through [HAMi](https://project-hami.io/docs)
	
	- `nvidia.com/gpu` and `nvidia.com/gpumem` : Default support via GPU Operator

	```yaml
		  resources:
			limits:
			  nvidia.com/gpu: 1 # requesting 1 GPU
			  nvidia.com/gpumem: 3000 # Each GPU contains 3000m device memory
	```

	- `nvidia.com/use-gputype` : [HAMi](https://project-hami.io/docs/userguide/NVIDIA-device/specify-device-type-to-use) offer for help scheduler exactly GPU Types

	In some situation, HAMI meet the error when split the GPU, you should restart daemonset running `hami-device-plugin` to let it retry the configuration again in GPU Node. Read more about [Github Issue - HAMI 插件运行中出现显卡注册失败](https://github.com/Project-HAMi/HAMi/issues/441)

>[!error]
>I have an update on a common GPU problem that I want to share with you and the community. The issue is an Nvidia driver version conflict where the user-space tools (like nvidia-smi) have a different version than the Nvidia kernel module. This typically results in an error message: `Failed to initialize NVML: Driver/library version mismatch`.
>
>Crucially, this driver mismatch can prevent Kubernetes (e.g., RKE2) from scheduling new application pods on the affected node, especially if those pods require GPUs. This is a significant operational disturbance."

To resolve the problem, you can double-check in a couple of resolved

- [StackOverFlow - Nvidia NVML Driver/library version mismatch (closed)](https://stackoverflow.com/questions/43022843/nvidia-nvml-driver-library-version-mismatch)
- [Blog - 解决Driver/library version mismatch](https://comzyh.com/blog/archives/967/)
- [GPU Mart - Failed to initialize NVML: Driver/library version mismatch - Troubleshooting](https://www.gpu-mart.com/blog/failed-to-initialize-nvml-driver-library-version-mismatch)

The usual behavior to resolve this issue is rebooting system

```bash
sudo reboot
```

To ensure version, you can purge and install new `nvidia-driver-*` , `libnvidia-common-*` and `libnvidia-gl-*` for your host

```bash
# Check mismatch via dmesg
sudo dmesg | grep -e NVRM

# Check current nvidia package in your host (ubuntu)
dpkg -l | grep -i nvidia

# Check kernel version
cat /proc/driver/nvidia/version

# Find compatible (recommended) version
ubuntu-drivers devices

# Update to new version (e.g. 555 is compatible version)
sudo apt purge nvidia-* 
sudo apt purge libnvidia-*
sudo apt autoremove
## Manual Update
sudo apt install libnvidia-common-555 libnvidia-gl-555 nvidia-driver-555 -y
## Automatic Update to recommended version
sudo ubuntu-drivers autoinstall

# For anything workwell reboot is obligatory
sudo reboot
```

To prevent the sudden upgrade (NOTE: I met issue and dunno the reason why 😰), you have two methods to handle this case but still keep same idea, **blocking sudden update**. Explore more at: [Tecmint - How to Disable Package Updates in Ubuntu, Debian and Mint](https://www.tecmint.com/disable-lock-blacklist-package-updates-ubuntu-debian-apt/)

1.  Use the `apt-hold` function to keep not update related

	```bash
	sudo apt-mark hold nvidia-dkms-version_number
	sudo apt-mark hold nvidia-driver-version_number
	sudo apt-mark hold nvidia-utils-version_number
	```

2. Make a change in `apt.conf.d` *(Suggest by my colleague)*

	```bash
	sudo nano /etc/apt/apt.conf.d/50unattended-upgrades
	
	Unattended-Upgrade::Package-Blacklist {
	// The following matches all packages starting with linux-
	// "linux-";
	//Added 20230822
	"linux-generic";
	"linux-image-generic";
	"linux-headers-generic";
	"nvidia-";
	"libnvidia-";
	"*nvidia*";
	};
	```
### Remove Node and Join again

>[!warning]
>If you understand the implications of uninstalling a node, you're welcome to try my tips. Nevertheless, I offer no guarantees about the correctness of these suggestions, particularly concerning actions that the RKE2 developers advise against 🚑.

To uninstall node, you can follow the [RKE2 - Uninstall](https://docs.rke2.io/install/uninstall) to give you exactly way to clean RKE2. But remember, you will erase all scripts, datas and anything else inside Kubernetes Cluster related that Node, so you need to

- [Backup your data](https://docs.rke2.io/datastore/backup_restore), especially `etcd`, `database`, or `pv` you created via storageclass, like `ceph`, `longhorn`, ...
- If you use `longhorn`, remember kickoff the replica of your `PV` inside that node before uninstalling
- Drain your node before doing anything else related node layer, because it really complicated and increase more problems if you won't
- Run `rke2-killall.sh` to kill all process exist in your node, before use `rke2-uninstall.sh`

>[!info]
>Now your RKE2 already prune, and you can install a new node again. This one is good behavior in some situation, you can't save your node
>

But there are trick I found when remove a node with `kubectl`, this can help you join `master` and `agent` again with same name inside Cluster, before that read these

- [Github Issue - RKE2 re-register existing nodes](https://github.com/rancher/rke2/issues/4852)
- [Suse - How to re-add a Master node to the RKE2 HA cluster once its removed from cluster.](https://www.suse.com/support/kb/doc/?id=000020821)

If you have read the [Advanced Docs - How Agent Node Registration Works](https://docs.rke2.io/advanced?_highlight=gpu#node-labels-and-taints:~:text=How%20Agent%20Node%20Registration%20Works), you can see after node join into cluster, it use `password` generated to join a node, It means when you delete node out will `kubectl`, that led `password` not valid and you can able to remove it at `/etc/rancher/node/password` and you can rerun `service` again, especially `agent` to join your node again

But `master` is using embedded `etcd` inside cluster, especially HA Cluster, you should backup version before you do anything else. So remove `db etcd` to led you reset your cluster and your node password like above to join again into cluster 

```bash
# remove etcd db
rm -rf /var/lib/rancher/rke2/server/db

# remove password
rm -rf /etc/rancher/node/password
```

You think that already enough to start, forget it, you need to create two files inside new `db` directory, especially you remove node out of cluster with `kubectl` (NOTE: You can use [Backup and Restore](https://docs.rke2.io/datastore/backup_restore) feature if you don't remove your master node out of cluster). There are two file, include

- `/var/lib/rancher/rke2/server/db/etcd/config` - `etcd` configuration
- `/var/lib/rancher/rke2/server/db/etcd/member` - name of `etcd` 

Because you remove node, it means you can't use name of `etcd` exist node to join into Raft Architecture, you should rename it inside two file (NOTE: I generate random 6 non't uppercase and number character) and now you can bring up again

```yaml title="/var/lib/rancher/rke2/server/db/etcd/config"
client-transport-security:
  cert-file: /var/lib/rancher/rke2/server/tls/etcd/server-client.crt
  client-cert-auth: true
  key-file: /var/lib/rancher/rke2/server/tls/etcd/server-client.key
  trusted-ca-file: /var/lib/rancher/rke2/server/tls/etcd/server-ca.crt
data-dir: /var/lib/rancher/rke2/server/db/etcd
election-timeout: 5000
experimental-initial-corrupt-check: true
experimental-watch-progress-notify-interval: 5000000000
heartbeat-interval: 500
listen-client-http-urls: https://127.0.0.1:2382
listen-client-urls: https://127.0.0.1:2379,https://<host-ip>:2379
listen-metrics-urls: http://127.0.0.1:2381
listen-peer-urls: https://127.0.0.1:2380,https://<host-ip>:2380
log-outputs:
- stderr
logger: zap
name: name-of-your-master # That should match with value in member file
peer-transport-security:
  cert-file: /var/lib/rancher/rke2/server/tls/etcd/peer-server-client.crt
  client-cert-auth: true
  key-file: /var/lib/rancher/rke2/server/tls/etcd/peer-server-client.key
  trusted-ca-file: /var/lib/rancher/rke2/server/tls/etcd/peer-ca.crt
snapshot-count: 10000
```

If you wanna restart the state, I concern about that really difficult because your change name of `etcd` and usually that not make sense, I will try to involve this backup when I understand what `etcd` saving, but now you can bring up `master` node with empty `etcd` **because you are setup in HA Cluster and that will not break anything (NOTE: Remember It just work with HA Cluster, do not use this way for normal cluster with only one master)**

```bash
sudo systemctl start rke2-server
```
### Rotation Certificate

>[!warning]
>For improved security, RKE2 automatically sets certificate expiry to 12 months. Neglecting this aspect can lead to significant problems: your `kube-api` will become unavailable, and your applications might fail. This is why awareness and proper handling of certificate lifecycles are essential when working with RKE2.

>[!info]
>If the certificates are expired or have fewer than 90 days remaining before they expire, the certificates are rotated when RKE2 is restarted.

But usually, you can handle on this stuff manually because `rke2` support us the command to handle this, before go to walkthrough, you should check documentation about this

- [RKE2 - Certificate Rotation](https://docs.rke2.io/advanced?_highlight=rotati#certificate-rotation)
- [Blog - Rotating RKE2 Certificates Before Expiration: A Necessary Practice](https://support.tools/post/rotate-rke2-certs/) (Careful when use `rke2-killall.sh` in this articles)

To monitoring your RKE2 Certificate, you have two ways to retrieve that

1. [Monitoring RKE2 Certs with x509-certificate-exporter](https://support.tools/post/x509-certificate-exporter/)
2. Use script below in your host to check this

```bash title="rke2-certificate-validate.sh"
#!/bin/bash

if [[ -d "/var/lib/rancher/rke2/server/tls" ]]; then
  dir="/var/lib/rancher/rke2/server/tls"
elif [[ -d "/var/lib/rancher/rke2/agent/tls" ]]; then
  dir="/var/lib/rancher/rke2/agent/tls"
else
dir="/var/lib/rancher/rke2/agent/"
fi
# Loop through each .crt file in the directory
for file in "$dir"/*.crt; do
# Extract the expiry date from the certificate
expiry=$(openssl x509 -enddate -noout -in "$file" | cut -d= -f 2-)
# Get the file name without the path
filename=$(basename "$file")
# Print the filename and expiry date in a pretty format
printf "%-30s %s\n" "$filename:" "$expiry"
done
```

Now If you take care all of this, you rotation node depend what you want

```bash
# Stop rke2-agent or rke2-server before rotation
sudo systemctl stop rke2-server # rke2-agent dangerous I prefer to restart it only

# Run rotation
rke2 certificates rotate

# Start again
sudo systemctl start rke2-server
```

>[!warning]
>But remember `rke2-killall.sh` will remove all service or process alive than we only stop service and another container keep continue run in this maintain progress

>[!note]
>If two of your three master nodes have expired certificates, you must manually rotate the certificates on those two. etcd requires this for HA clusters to function correctly and avoid nodes getting stuck during startup.
>
>Furthermore, if you have issues with `kube-api-server` or `kube-proxy` (like logging or connection problems), try restarting the `rke2-agent` service on the affected node. This won't disrupt running pods.

BTW, you can rotate the individual service by passing the `--service` flag, it means you can rotate certificate for specific things you want (NOTE: That's good behavior for not corrupting the huge cluster). Read more about [RKE2 - Certificate Management](https://docs.rke2.io/security/certificates#rotating-client-and-server-certificates-manually)
### Container Services in RKE2

>[!info]
>Regarding service management, I've observed a positive behavior in RKE2: you can make certain configurations on a node without disrupting the services running within it. Here are some best practices to help you protect your production environment.

Because I already read this about Author of RKE2 about [Github Issue - Containers from old version of RKE2 persist even after upgrade and multiple restarts of rke2-agent/server](https://github.com/rancher/rke2/issues/5576#issuecomment-1984309860)

>[!info]
>Containers are intentionally left running when RKE2 is restarted, including when RKE2 is restarted for an upgrade. This allows for minimally disruptive upgrades, as there is no reason that pods should be terminated just because the rke2 service is stopped. This behavior is shared with standalone containerd; stopping the containerd service does not stop the containers themselves.
>
>Containers started prior to the upgrade, whose configuration is not affected by the upgrade, will continue to run until some external change requires them to be stopped and/or restarted.

If I try to discovery more about [RKE2 - FIPS 140-2 Enablement](https://docs.rke2.io/security/fips_support#runtime), you can see that stack via each level inside RKE2 Node

```bash
- etcd
- containerd
    - containerd-shim
    - containerd-shim-runc-v1
    - containerd-shim-runc-v2
    - ctr
- crictl
- runc
```

That make sense and help you understand more clear about structure of RKE2 want you make sort of change inside Cluster, that led cause service restart, but if your RKE2 Stop for some reason, your service will already good, but aware off a bit that help you about `containerd` restart, and it doesn't mean your container restart (NOTE: Good behavior of RKE2 🔥) 

But if you want to increase more HA, you should configure [KeepAlive](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/7/html/load_balancer_administration/ch-lvs-overview-vsa#ch-lvs-overview-VSA) inside node to handle traffic, I prefer from 2 node above because that help you not corruption traffic and give you a chance to understand more about system before setup for another. Following some tutorial below

- [IBM - Keepalived and HAProxy](https://www.ibm.com/docs/en/solution-assurance?topic=available-keepalived-haproxy)
- [Kubesphere - Set up an HA Kubernetes Cluster Using Keepalived and HAproxy](https://kubesphere.io/docs/v3.4/installing-on-linux/high-availability-configurations/set-up-ha-cluster-using-keepalived-haproxy/)
- [Git - Running a load balancer for RKE2 api-server and nginx ingress controller using Keepalived and HAProxy in static pods](https://gist.github.com/mddamato/5b696d202befde53c333761e23dca616)
### Reboot GPU Machine (New Upgrade)

>[!warning]
>Resolving issues with RKE2 clusters, particularly concerning the GPU Agent, can be difficult. A frequent problem encountered is the RKE2 Agent initiating successfully yet subsequently retrying multiple times, resulting in operational instability. When faced with this, two primary approaches are available:
>1. Completely uninstall and then reinstall the components. Although a potential solution, this method carries inherent risks, especially if prior attempts were made without a full understanding of alternative strategies.
>2. Maintain the existing installation and instead implement specific configuration adjustments to return the cluster to a stable operating condition. Details are provided below.

So I met some troubles with GPU node because `apt` package try to compile a new module of NVIDIA driver for kernel, and it's making disturb for deployment via Kubernetes Layer. That's reason why I should be fix NVIDIA, explore more at my note [[Kubewekend Session Extra 2#GPU Problems|GPU Problems]] above and restart the node is obligatory in this maintenance

What is waiting for me it's truly coming and I guess this problem will be occur because I already use option 1, uninstall an reinstall node in RKE2 Cluster. So in this time, It's production and I don't know what things I faces off when I do it in this environment. Before I read this [GitHub Issue - Following gpu-operator documentation will break RKE2 cluster after reboot](https://github.com/NVIDIA/gpu-operator/issues/992), It gives me some idea when you actually now what RKE2 Actual work

If you read my note about [[Kubewekend Session Extra 2#Container Services in RKE2|Container Services in RKE2]] above and the issue, you will understand RKE2 will separate two process to running container with separate `containerd`, and you can get that distinguish

- `containerd` of RKE2 at `/var/lib/rancher/rke2/bin` and `/var/lib/rancher/rke2/data/v1.xx.xx/bin`, it will contain `containerd`, `kubectl`, ... But you know why it not export into your **$PATH** and If I don't get wrong about it, this only spend for `RKE2` stuff, like `kube-proxy`, `CNI`, `Ingress`, ...
- `containerd` of host at `/usr/bin` and this one already include in **$PATH**, ... In some case, I will actual remove by `RKE2-agent` after reboot, believe me sometime `runc` and `containerd` actual not found in your host. Explore installation at [Containerd - Getting Started](https://github.com/containerd/containerd/blob/main/docs/getting-started.md). And this one spent for running `containerd` socket

Now you know why, I will try to clarify it into each sentences

- RKE2 relies on the host's `containerd` for initial configuration but uses its own `containerd` instance to run services. This can lead to a conflict during configuration updates. Specifically, when you apply new `containerd` configurations, both `config.toml` and `config.toml.tmpl` are synchronized (as mentioned in the [Configuring containerd](https://docs.rke2.io/advanced#configuring-containerd) documentation). At this point, essential Kubernetes components like `kube-proxy`, the CNI (Container Network Interface), and Ingress are already running without issues. This suggests that two `containerd` processes are involved in managing the deployment.

- Upon reboot, all RKE2 Kubernetes components (including `kube-proxy`, CNI, Ingress, etc.) need to restart. However, the RKE2 `containerd` now depends on `nvidia-container-runtime`. If `kube-proxy` and the CNI haven't started yet (correct me if I'm wrong), the `GPU-Operator` cannot initialize. This lack of essential networking components causes the `GPU-Operator`, which is required for the `nvidia-container-runtime` to function, to crash. (NOTE: Actually )

Here why I pop up the idea to restore anything in set configuration. Let's me try to introduce a walkthrough

You should stop the `rke2-agent` for maintaining, yes it will cause a downtime but if you have well off resources for maintaining, you should `drain` node before doing and prevent to cause anything downtime for your service. But like I told `rke2-agent` stop doesn't mean your service already run stop (But in my case, reboot machine and it cause downtime 😄)

```bash
sudo systemctl stop rke2-agent
```

Now you should kill all service, which one running in `rke2-agent` with predefine script `rke2-killall.sh`

```bash
sudo rke2-killall.sh
```

This step will ensure, there aren't container running in error `containerd` state

Now you can finish the maintenance by removing `config.toml` and `config.toml.tmpl` to turn your `rke2-agent` and `containerd` into default configuration

```bash
cd /var/lib/rancher/rke2/agent/etc/containerd
rm -rf config.toml config.toml.tmpl
```

Now you can create a default `config.toml` which generated by `rke2`, and copy the code down below, there are two version, one for CPU and one for GPU, but CPU version also work with GPU with no doubt

```bash
nano config.toml
```

```toml title="containerd/config.toml"
# File generated by rke2. DO NOT EDIT. Use config.toml.tmpl instead.

########################
# VERSION: CPU MACHINE #
########################
version = 2

[plugins."io.containerd.internal.v1.opt"]
  path = "/var/lib/rancher/rke2/agent/containerd"
[plugins."io.containerd.grpc.v1.cri"]
  stream_server_address = "127.0.0.1"
  stream_server_port = "10010"
  enable_selinux = false
  enable_unprivileged_ports = true
  enable_unprivileged_icmp = true
  sandbox_image = "index.docker.io/rancher/mirrored-pause:3.6"

[plugins."io.containerd.grpc.v1.cri".containerd]
  snapshotter = "overlayfs"
  disable_snapshot_annotations = true
  



[plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc]
  runtime_type = "io.containerd.runc.v2"

[plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc.options]
  SystemdCgroup = true

[plugins."io.containerd.grpc.v1.cri".registry]
  config_path = "/var/lib/rancher/rke2/agent/etc/containerd/certs.d"
```

```toml title="containerd/config.toml"
# File generated by rke2. DO NOT EDIT. Use config.toml.tmpl instead.

########################
# VERSION: GPU MACHINE #
########################
version = 2

[plugins."io.containerd.internal.v1.opt"]
  path = "/var/lib/rancher/rke2/agent/containerd"
[plugins."io.containerd.grpc.v1.cri"]
  stream_server_address = "127.0.0.1"
  stream_server_port = "10010"
  enable_selinux = false
  enable_unprivileged_ports = true
  enable_unprivileged_icmp = true
  sandbox_image = "index.docker.io/rancher/mirrored-pause:3.6"

[plugins."io.containerd.grpc.v1.cri".containerd]
  snapshotter = "overlayfs"
  disable_snapshot_annotations = true
  



[plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc]
  runtime_type = "io.containerd.runc.v2"

[plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc.options]
  SystemdCgroup = true

[plugins."io.containerd.grpc.v1.cri".registry]
  config_path = "/var/lib/rancher/rke2/agent/etc/containerd/certs.d"






[plugins."io.containerd.grpc.v1.cri".containerd.runtimes."nvidia"]
  runtime_type = "io.containerd.runc.v2"
[plugins."io.containerd.grpc.v1.cri".containerd.runtimes."nvidia".options]
  BinaryName = "/usr/local/nvidia/toolkit/nvidia-container-runtime"
  SystemdCgroup = true
```

Alright, you can start `rke2-agent` for let's it initialize import part of it, like `kube-proxy`, `cni`, ...

```bash
sudo systemctl start rke2-agent
```

Validate it after waiting a few sec, ensure you should see `kube-proxy`, `cni` actually run to make the next configuration

```bash
kubectl get pods -n kube-system
```

Now, you can do same behavior when you create GPU node with modify `containerd`, so I will create a `config.toml.tmpl` with below file

```bash
nano config.toml.tmpl
```

```bash title="containerd/config.toml.tmlp"
# File generated by rke2. DO NOT EDIT. Use config.toml.tmpl instead.
version = 2

[plugins."io.containerd.internal.v1.opt"]
  path = "/var/lib/rancher/rke2/agent/containerd"
[plugins."io.containerd.grpc.v1.cri"]
  stream_server_address = "127.0.0.1"
  stream_server_port = "10010"
  enable_selinux = false
  enable_unprivileged_ports = true
  enable_unprivileged_icmp = true
  sandbox_image = "index.docker.io/rancher/mirrored-pause:3.6"

[plugins."io.containerd.grpc.v1.cri".containerd]
  snapshotter = "overlayfs"
  disable_snapshot_annotations = true
  default_runtime_name = "nvidia"  



[plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc]
  runtime_type = "io.containerd.runc.v2"

[plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc.options]
  SystemdCgroup = true

[plugins."io.containerd.grpc.v1.cri".registry]
  config_path = "/var/lib/rancher/rke2/agent/etc/containerd/certs.d"

[plugins."io.containerd.grpc.v1.cri".containerd.runtimes]
	[plugins."io.containerd.grpc.v1.cri".containerd.runtimes.nvidia]
		privileged_without_host_devices = false
		runtime_engine = ""
		runtime_root = ""
		runtime_type = "io.containerd.runc.v2"
		[plugins."io.containerd.grpc.v1.cri".containerd.runtimes.nvidia.options]
		BinaryName = "/usr/bin/nvidia-container-runtime"
```

Restart `containerd`

```bash
sudo systemctl daemon-reload && systemctl restart containerd
```

Restart `rke2-agent` to sync up again

```bash
sudo systemctl restart rke2-agent
```

>[!note]
>Your host will run like expectation, I give a try and that work in my case and your case if you meet this problem, RKE2 at version `1.27.11r1`. One upon again, the issue give my idea and I feel really appreciate and thankful for RKE2 Community
# Conclusion
![[meme-byebye.png|center|400]]

>[!done]
>That's all for this weekend. It's been a lot to learn and remember, so I've documented some of my learning journey with RKE2, including tips, tricks, and configuration insights for setting up a complete Kubernetes cluster using RKE2 and Rancher. I hope this article provides you with valuable information and inspires you to enhance your security, self-host effectively, and explore more exciting possibilities with RKE2.

>[!quote]
>Wrapping this up over the holiday! This article turned out to be quite substantial, and maybe even a bit overwhelming in its depth. I'd been planning to write this for a while, but it took four months of hands-on experience with `RKE2` before I felt confident enough to share my insights. It's been a rewarding experience – challenging at times, but incredibly enriching. I'm proud of what I've learned and how I can now leverage RKE2 😄. So, stay safe out there, keep that learning momentum going, and I'll catch you all next weekend. Remember to check my bi-weekly update this week. Farewell! 🙌

