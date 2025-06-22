---
title: "Kubewekend Session 7: Setup new application in kubewekend with Cilium"
tags:
  - kubewekend
  - devops
  - series
  - k8s
draft: "true"
---

![[meme-long-time-no-see.png|center]]

Hey there! It's great to reconnect after a while. I hope you've all been doing well and rocking it at work!

My month-long disappearance was due to a mix of things—travel, a bit of content block, and, honestly, a touch of laziness. 😄 But today feels wonderful because we're diving back into the **Kubewekend series**!

We'll be exploring **Helm, Kubernetes applications**, and even more powerful features with **Cilium**. Get ready to discover how you can structure your **ingress, egress, and network security** for your deployments. Settle in, because we're starting now!

# Kubewekend Before and Now

As I remember about `Kubewekend` in nearest time about we handle extra part about how can we setup `RKE2` for Kubernetes instead `Kind`, you can double-check again in [[Kubewekend Session Extra 2|Kubewekend Session Extra 2: Rebuild Cluster with RKE2 or K3S]]

As I've mentioned in these articles, I chose **RKE2** for our production environment due to considerations like **Container Storage Interface (CSI)** and **High Availability (HA)**, which `kind` doesn't fully address in that context.

However, despite those challenges, I still believe `kind` remains the best option for practicing in a **local Kubernetes environment**. Today, we're revisiting `kind` with **Cilium** to explore how this platform, leveraging **eBPF** and **Network Security CNI**, can enhance our applications. Explore again about Cilium, Hubble and eBPF Technologies via [[Kubewekend Session 4|Kubewekend Session 4: Learn about ebpf with hubble and cilium]]

![[Pasted image 20250621154321.png|center]]

After a few months, I've dived into several blogs about **Cilium** and its comparison with traditional models like **Kube-Proxy**. These resources explain how **eBPF** is transforming networking in Kubernetes and what trade-offs we make when adopting Cilium. New versions of Cilium are constantly introducing exciting functionalities.

There's a lot happening with **eBPF** and **Cilium** is pushing the boundaries. You can find more great information by reading the articles or visiting the LinkedIn and blog posts linked below.

- [KodeKloud - eBPF Essentials for DevOps Professionals](https://kodekloud.com/blog/ebpf-essentials-devops/) 🌟 **(Recommended)**
- [Medium - Picking Between Calico and Cilium for Your On-Prem Kubernetes Cluster](https://medium.com/@PlanB./picking-between-calico-and-cilium-for-your-on-prem-kubernetes-cluster-9c3849083a45)
- [Medium - eBPF and Cilium Are Cool, So Why Do We Keep Choosing Kube-Proxy?](https://medium.com/@PlanB./ebpf-and-cilium-are-cool-so-why-do-we-keep-choosing-kube-proxy-4423bdefca7d) 🌟 **(Recommended)**
- [Linkedin - Isovalent](https://www.linkedin.com/company/isovalent/posts/?feedView=all)
- [Linkedin - Liz Rice](https://www.linkedin.com/in/lizrice/recent-activity/all/) 🌟 **(Recommended)**
- [Linkedin - Cilium](https://www.linkedin.com/company/cilium/posts/?feedView=all)
- [Isovalent - Blog](https://isovalent.com/blog/) 🌟 **(Recommended)**
- [Medium - eBPF Series by A. Quan Huynh](https://medium.com/@hmquan08011996/kubernetes-networking-ebpf-in-action-f0df2592dade) 🌟 **(Recommended)**

As you can see, I never believe mine about missing many news of this technologies, I grow fast and crazy couple recently months with AI Blooming, that's insane. BTW, I will try to recap and learn again by taking walkthrough with a really tugh

- Feature of Cilium Deployment, CLI Is great,  but we can explore more configuration in Cilium with Operator, CRDs via [Helm Chart](https://artifacthub.io/packages/helm/cilium/cilium)
- Define a Helm template for application using features of Cilium like `network-policy`, `ingress` or `gateway` 👉 [Kubewekend Helm Chart](https://kubewekend.xeusnguyen.xyz/#helm-chart)

# Helm repositories for Kubewekend

![[Helm.png]]

