---
title: Personal DIY Projects Management
tags:
  - devops
  - research
  - infosec
  - devsecops
  - self-hosted
  - cloud-services
  - DIY
  - docker
  - usage
  - solutions
  - architecture
  - k8s
---
>[!quote]
>*Most of those topics which i consider for contributing and find out the best way to apply this functionality, if you find the same mindset or want to collaboration, feel free meet me. Always wait with some reason* 😄😄😄

>[!note]
>The icon to telling you about what task is on progress or pending 😄
>
>- ✍ : On progressing, usually attach with `github` and blog, find in [[All Blogs|all blogs page]]
>- 🚧 : Pending, just stop like a note, and idea to doing something around that. Waiting for new information LOL
# Kubewekend
## Setup Self Kubernetes Cluster in locally ✍

Github: [kubewekend](https://github.com/Xeus-Territory/kubewekend)

>[!summary]
>Use the instant technologies for setting up Kubernetes cluster, with
>- Use `Vargrant` to configuration the VM with provider in `VirtualBox` ✅
>- Ansible - To setup and run script and bring up `kubernetes` cluster on locally, Use `kind` ✅
>- Exploring, understanding and provisioning require components inside the `kind` cluster ✅
>- `cilium` and `ebpf` - The powerful kernel service of `kubewekend` cluster ✅
>- How to build the High Availability (HA) Cluster.  ✅
>- Use extend `CSI` for volume and storage class with `Ceph` ✅
>- Setup new `app`, use `cilium` to route traffic into cluster via gateway ⌛
>- Setup the monitoring cluster inside the `kubernetes` with `node-exporter`, `cadvisor`, `prometheus` and `grafana` ⌛
>- Setup tracing, logging, profiling components in `kubewekend` cluster ⌛
>- Customize default scheduled in `kubernetes` cluster with `kube-scheduler` ⌛

## Customize script for manipulation scheduled Kubernetes 🚧

>[!summary]
>Create a customize script for optimize and manipulation scheduled instead of default for Kubernetes, with feature like
>- Determine density of all workloads and nodes to scheduling
>- Be able to overwrite or set priority for nodes, workloads to scheduling
>- Work great with another cluster configuration like AKS, EKS or Kubeadm, ...

# Hackwekend

## HTTP Tunneling for secure connection 🚧

>[!summary]
>Tunneling the request to internet to HTTP and return response to currently browser like VPN but alternative

Reference technics : `ZTM (Zero Trust Mesh)` , `wstunnel`

## Lateral Movement Attack 🚧

>[!summary]
>Find the way to perform LM, how affect of them, provisioning lab and find the way to patching it.

# wouops
## Sidecar for remote profiling applications 🚧

>[!summary]
>Make a container can distribute and mental monitoring, profiling application with remotely by Sidecar pattern

![[Pasted image 20240502101316.png]]

## Pre-hook framework 🚧

Github: **[distribute-git-hook](https://github.com/wouops/distribute-git-hook)**

>[!summary]
>Create a framework on light weight and isolation components for check commit and push event in currently source code to repositories, with features like
>- Code smell and validate code for improving the code quality
>- Handling prehook for pentesting surface application on whitebox like secret leak, CVE, misconfiguration
>- Offer the announcement location, can be grafana or report with dashboard about your commit

# fast_deployment

>[!info]
>About the methodology which can apply for release or deploy the application which no down time, rapidly and more efficience work with script, DevOps circle

## Blue Green Deployment 🚧

>[!note]
>Feel free to read about small article about operating 👉 [[0-downtime with Blue-Green Deployment]]
## Canary Deployment 🚧

# AIOps and MLOps 🚧

## Milvus Cluster 🚧

Documentation: https://milvus.io/docs

>[!info]
>Try to learn and explore vector database of Linux Foundation Opensource, and try to practical with feature and grasp the infrastructure of `milvus` with `kubewekend` cluster

