---
title: "Kubewekend Session Extra 5: Combination GitOps with ArgoCD into Kubewekend Cluster"
tags:
  - kubewekend
  - k8s
  - devops
  - gitops
draft: "true"
---

>[!quote]
>Hello again! It has been a while since we last connected. I'm excited to bring back the **Kubeweekend** series with a brand new session. Today, I will comprehensively share my journey to **rebuild my homelab using K3s** and implement a **full GitOps strategy** to prepare for application deployments. I hope you find this content valuable—grab your seat, as we're about to begin!
# Kubewekend with K3s

![[thumbnail-k3s.png|center]]



Kubewekend with

- K3s
- Traefik Ingress Controller
- ArgoCD / App of app / Image updater
- Cert Manager

Command setup

```bash
curl -sfL https://get.k3s.io | INSTALL_K3S_VERSION="v1.34.1+k3s1" sh -
```

Reference

- [Medium - ArgoCD and cert-manager TLS/SSL certificates Integration: In-depth guide](https://soappanda.medium.com/argocd-and-cert-manager-tls-ssl-certificates-integration-in-depth-guide-03199da8257a)
- [Vultr - How to Set Up Argo CD on Kubernetes](https://docs.vultr.com/how-to-set-up-argo-cd-on-kubernetes)
- [ArgoCD - TLS configuration](https://argo-cd.readthedocs.io/en/stable/operator-manual/tls/)
- [Cert Manager - ACME](https://cert-manager.io/docs/configuration/acme/)
- [Cert Manager - HTTP01](https://cert-manager.io/docs/configuration/acme/http01/)
- [Let's Encrypt - Profiles](https://letsencrypt.org/docs/profiles/)
- [Lets' Encrypt - ACME Client Implementations](https://letsencrypt.org/docs/client-options/)
- [Let's Encrypt - Challenge Types](https://letsencrypt.org/docs/challenge-types/)
- [Vultr - How to Install Traefik Ingress controller with Cert-Manager on Kubernetes](https://docs.vultr.com/how-to-install-traefik-ingress-controller-with-cert-manager-on-kubernetes)
- [Traefik - Traefik & Kubernetes with Gateway API](https://doc.traefik.io/traefik/reference/routing-configuration/kubernetes/gateway-api/)
- [Traefik - Traefik & Kubernetes with Ingress](https://doc.traefik.io/traefik/reference/routing-configuration/kubernetes/ingress/)
- [Cert Manager - Securing NGINX-ingress](https://cert-manager.io/docs/tutorials/acme/nginx-ingress/)
- [Cert Manager - HTTP Validation](https://cert-manager.io/docs/tutorials/acme/http-validation/)
- [CNCF - Managing Kubernetes Workloads Using the App of Apps Pattern in ArgoCD-2](https://www.cncf.io/blog/2025/10/07/managing-kubernetes-workloads-using-the-app-of-apps-pattern-in-argocd-2/)

