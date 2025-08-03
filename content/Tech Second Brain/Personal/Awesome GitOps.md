---
title: Awesome GitOps
tags:
  - awesome
  - collections
  - gitops
  - devops
---

![[thumbnail-gitops.png|center]]

# General

## Advantage Articles

- [[Atlantis with ECS for automatic provisioning|Blog - Atlantis with ECS for automatic provisioning]]
- [Medium - GitOps: How to Manage Dynamic Network Policy Changes at Scale Across 25 Clusters?](https://itnext.io/gitops-how-to-manage-dynamic-network-policy-changes-at-scale-across-25-clusters-0727ce1145e5) 🌟 **(Recommended)**
## Bootstrap Articles

- [Medium - Configure CI/CD pipeline: GitlabCI, ArgoCD, HelmCharts & SOPS](https://medium.com/@golaneduard1/configure-ci-cd-pipeline-gitlabci-argocd-helmcharts-sops-3cbf94f300ed) 🌟 **(Recommended)**
- [Medium - End-to-End DevSecOps and GitOps Implementation with Jenkins, Docker, SonarQube, Trivy, Terraform, ArgoCD, and Amazon EKS](https://medium.com/@harsh05/end-to-end-devsecops-and-gitops-implementation-with-jenkins-docker-sonarqube-trivy-terraform-3ae842882b75)
- [Medium - GitOps with Kubernetes, Terraform, Gitlab and FluxCD](https://medium.com/@prag-matic/gitops-with-kubernetes-terraform-gitlab-and-fluxcd-2875d1010dac)
- [Digital Ocean - Implementing GitOps using Flux CD](https://www.digitalocean.com/community/developer-center/implementing-gitops-using-flux-cd)
- [Codefresh - Understanding Argo CD: Kubernetes GitOps Made Simple](https://codefresh.io/learn/argo-cd/) 🌟 **(Recommended)**
## Blogs

- [Operate First](https://www.operate-first.cloud/apps/content/README.html): Serve as a main resource for all Operate First GitHub Org contributors.
## Repositories

- [awesome-argo](https://github.com/akuity/awesome-argo): A curated list of awesome projects and resources related to Argo (a CNCF graduated project)
- [awesome-flux-infra](https://github.com/brainfair/awesome-flux-infra): This repository contains infrastructure applications and add-ons installed in Kubernetes via FluxCD v2.
# Tools

## Automatic Deployment (Kubernetes)

- [argo-cd](https://argo-cd.readthedocs.io/en/stable/) :  A declarative, GitOps continuous delivery tool for Kubernetes 🌟 **(Recommended)**
	- [argo-rollouts](https://github.com/argoproj/argo-rollouts): Progressive Delivery for Kubernetes. Maintained by Argo
	- [argocd-image-updater](https://github.com/argoproj-labs/argocd-image-updater): Automatic container image update for Argo CD

- [fluxcd](https://fluxcd.io/flux/) : Tool for keeping Kubernetes clusters in sync with sources of configuration (like Git repositories), and automating updates to configuration when there is new code to deploy 🌟 **(Recommended)**
	- [flagger](https://flagger.app/): Progressive Delivery Operator for Kubernetes. Maintained by Flux
	- [capacitor](https://github.com/gimlet-io/capacitor):  A general purpose UI for FluxCD
	- [weave-gitops](https://github.com/weaveworks/weave-gitops): a free and open source GUI for Flux under the [weave-gitops](https://web.archive.org/web/20230314183054/https://docs.gitops.weave.works/docs/intro/) project

- [kargo](https://docs.kargo.io/): A next-generation continuous delivery and application lifecycle orchestration platform for Kubernetes
- [flipt](https://github.com/flipt-io/flipt): Enterprise-ready, GitOps enabled, CloudNative feature management solution
- [fleet](https://github.com/rancher/fleet): Deploy workloads from Git to large fleets of Kubernetes clusters
- [cyclops](https://github.com/cyclops-ui/cyclops): an open-source dev tool that simplifies Kubernetes with an easy-to-use UI, making it less intimidating
## State Management (Kubernetes)

- [helm](https://helm.sh/): The package manager for Kubernetes 🌟 **(Recommended)**
- [kustomize](https://github.com/kubernetes-sigs/kustomize): Customization of kubernetes YAML configurations 🌟 **(Recommended)**
- [operator-lifecycle-manager](https://github.com/operator-framework/operator-lifecycle-manager): A management framework for extending Kubernetes with Operators
- [werf](https://github.com/werf/werf): A solution for implementing efficient and consistent software delivery to Kubernetes facilitating best practices.
## Internal Developer Platform (IDP)

- [backstage](https://github.com/backstage/backstage): An open framework for building developer portals
- [KubeVela](https://kubevela.io/): a modern software delivery platform that makes deploying and operating applications across today's hybrid, multi-cloud environments _easier, faster and more reliable._
- [Kusion](https://www.kusionstack.io/docs/) : An intent-driven **Platform Orchestrator**, which sits at the core of an **Internal Developer Platform (IDP)**
- [Qovery](https://hub.qovery.com/docs/getting-started/what-is-qovery/) : the **Internal Developer Platform (IDP)** that cuts noise for developers with paved paths to production