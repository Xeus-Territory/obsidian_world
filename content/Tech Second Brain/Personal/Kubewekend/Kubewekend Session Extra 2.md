---
title: "Kubewekend Session Extra 2: Rebuild Cluster with Rancher or K3S"
tags:
  - kubewekend
  - k8s
  - devops
  - self-hosted
  - usage
draft: "true"
---
>[!quote]
>Hi there, happy to see you there, I just start the holiday in my country, so spend a bit time in weekend to chill out and learn couple things. I figure out one problem in Kubewekend Cluster, we use `kind` and it's tricky a bit when we do more stuff to handout with CSI, I don't deny any thing `kind` do for community, it's truly crazy but sometime we need to consider another to hangout with good potentials and easier to setup, `RKE` and `K3S` maybe save us some points today. Let's digest

# The problem and what should we do

![[meme-failure.png|center|500]]


# Reference

- [Calico CNI](https://docs.tigera.io/calico/latest/about/)
- [RKE2- Quick Installation](https://docs.rke2.io/install/quickstart)
- [RKE2 - Upgrade](https://docs.rke2.io/upgrades/manual_upgrade)
- [RKE2 - Advanced Options and Configuration](https://docs.rke2.io/advanced)
- [RKE2 - Configuration Options](https://docs.rke2.io/install/configuration)
- [RKE2 - Uninstall](https://docs.rke2.io/install/uninstall)
- [RKE2 - How to restart kube-proxy?](https://github.com/rancher/rke2/discussions/5910)
- [GitHub Issue - kube-proxy pods continuously CrashLoopBackOff](https://github.com/kubernetes/kubernetes/issues/118461)
- [Github Issue - Following gpu-operator documentation will break RKE2 cluster after reboot](https://github.com/NVIDIA/gpu-operator/issues/992)
- [GitHub Issue - SandboxChanged Pod sandbox changed, it will be killed and re-created](https://github.com/kubernetes/kubernetes/issues/56996)
- [GitHub Issue - How to solve could not load NVML library: libnvidia-ml.so.1](https://github.com/NVIDIA/k8s-device-plugin/issues/478)