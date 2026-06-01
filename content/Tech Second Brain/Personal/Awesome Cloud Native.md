---
title: Awesome Cloud Native
tags:
  - awesome
  - collections
  - gitops
  - devops
---

![[thumbnail-gitops.png|center]]

>[!info]
>*"Cloud native is the software approach of building, deploying, and managing modern applications in cloud computing environments. Modern companies want to build highly scalable, flexible, and resilient applications that they can update quickly to meet customer demands. To do so, they use modern tools and techniques that inherently support application development on cloud infrastructure. These cloud-native technologies support fast and frequent changes to applications without impacting service delivery, providing adopters with an innovative, competitive advantage." By [AWS about Cloud Native](https://aws.amazon.com/what-is/cloud-native/)*
>
>*"Cloud Native is an approach to designing and building applications for dynamic cloud environments. By prioritizing rapid development and frequent updates, organizations are able to innovate faster and reduce operational complexity." By [GitHub about Cloud Native](https://github.com/resources/articles/what-is-cloud-native)*

Cloud Native usually relate with Kubernetes and Architecture topics, so you can double-check more them at reference below

- [[Awesome DevOps & System & Tech]]
- [[Awesome DevSecOps]]
- [[Awesome Kubernetes]]
- [[Awesome Kubernetes Walkthrough]]
- [[Awesome Selfhosted]]
- [[Awesome System Architecture]]
# General

## Advantage Articles

- [[Atlantis with ECS for automatic provisioning|Blog - Atlantis with ECS for automatic provisioning]]
- [Medium - GitOps: How to Manage Dynamic Network Policy Changes at Scale Across 25 Clusters?](https://itnext.io/gitops-how-to-manage-dynamic-network-policy-changes-at-scale-across-25-clusters-0727ce1145e5) 🌟 **(Recommended)**
## Blogs

- [Operate First](https://www.operate-first.cloud/apps/content/README.html): Serve as a main resource for all Operate First GitHub Org contributors.
- [Platform Engineering](https://platformengineering.org/blog): The blog about Platform Engineer and PlatformCon 
- [Internal Developer Platform](https://internaldeveloperplatform.org/): The general and blog about IDP and Development Strategies
## Bootstrap Articles

- [Medium - Configure CI/CD pipeline: GitlabCI, ArgoCD, HelmCharts & SOPS](https://medium.com/@golaneduard1/configure-ci-cd-pipeline-gitlabci-argocd-helmcharts-sops-3cbf94f300ed) 🌟 **(Recommended)**
- [Medium - End-to-End DevSecOps and GitOps Implementation with Jenkins, Docker, SonarQube, Trivy, Terraform, ArgoCD, and Amazon EKS](https://medium.com/@harsh05/end-to-end-devsecops-and-gitops-implementation-with-jenkins-docker-sonarqube-trivy-terraform-3ae842882b75)
- [Medium - GitOps with Kubernetes, Terraform, Gitlab and FluxCD](https://medium.com/@prag-matic/gitops-with-kubernetes-terraform-gitlab-and-fluxcd-2875d1010dac)
- [Digital Ocean - Implementing GitOps using Flux CD](https://www.digitalocean.com/community/developer-center/implementing-gitops-using-flux-cd)
- [Codefresh - Understanding Argo CD: Kubernetes GitOps Made Simple](https://codefresh.io/learn/argo-cd/) 🌟 **(Recommended)**
## Landscape

- [CD Foundation Landscape](https://landscape.cd.foundation/): Collection about CI/CD Projects
- [CNCF Landscape](https://landscape.cncf.io/): Collection by category tools and technologies of CNCF 🌟 **(Recommended)**
- [CNCF Projects](https://contribute.cncf.io/contributors/projects/): All projects of the Cloud Native Computing Foundation
- [Linux Foundation Project](https://www.linuxfoundation.org/projects) : Opensource Ambassador for projects from multiple users
- [Platform Engineer landscape](https://platformengineering.org/platform-tooling): Distills the best practices in designing IDP
## Platform Engineer Articles

- [Platform Engineer - Internal Developer Platform (IDP) Reference Architectures](https://devops.com/internal-developer-platform-idp-reference-architectures/)
- [Platform Engineer - Top 10 platform engineering tools to use in 2025](https://platformengineering.org/blog/top-10-platform-engineering-tools-to-use-in-2025)
- [Platform Engineer - 10 Platform engineering predictions for 2026](https://platformengineering.org/blog/10-platform-engineering-predictions-for-2026)
- [Humanitec - Self-hosted Platform Orchestrator](https://humanitec.com/blog/running-the-platform-orchestrator-self-hosted)
## Awesome Repositories

- [awesome-argo](https://github.com/akuity/awesome-argo): A curated list of awesome projects and resources related to Argo (a CNCF graduated project)
- [awesome-cloud-native](https://github.com/rootsongjc/awesome-cloud-native): A curated list for awesome cloud native tools, software and tutorials.
- [awesome-cloudnative-trainings](https://github.com/joseadanof/awesome-cloudnative-trainings): Awesome Trainings from Cloud Native Computing Foundation Projects and Kubernetes related software
- [awesome-flux-infra](https://github.com/brainfair/awesome-flux-infra): This repository contains infrastructure applications and add-ons installed in Kubernetes via FluxCD v2.
# Cloud-Native Tools and Frameworks

![[thumbnail-cncf-landscape.png]]

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
- [GlassKube](https://glasskube.dev/docs/) : An open-source Kubernetes package manager that simplifies package management for Kubernetes
## Authentication

- [dex](https://github.com/dexidp/dex): OpenID Connect (OIDC) identity and OAuth 2.0 provider with pluggable connectors 🌟 **(Recommended)**
- [oauth2-proxy](https://github.com/oauth2-proxy/oauth2-proxy): A reverse proxy that provides authentication with Google, Azure, OpenID Connect and many more identity providers.
## Internal Developer Platform (IDP)

- [KubeVela](https://kubevela.io/): a modern software delivery platform that makes deploying and operating applications across today's hybrid, multi-cloud environments _easier, faster and more reliable._
- [kubriX](https://github.com/suxess-it/kubriX): a **curated**, **opinionated**, and **highly flexible** Internal Developer Platform (IDP) for Kubernetes
- [Kusion](https://www.kusionstack.io/docs/) : An intent-driven **Platform Orchestrator**, which sits at the core of an **Internal Developer Platform (IDP)**
- [meshery](https://github.com/meshery/meshery): A self-service engineering platform, [Meshery](https://meshery.io/), is the open source, cloud native manager that enables the design and management of all Kubernetes-based infrastructure and applications (multi-cloud).
- [openchoreo](https://github.com/openchoreo/openchoreo): OpenChoreo is an open-source internal developer platform (IDP)
- [Qovery](https://hub.qovery.com/docs/getting-started/what-is-qovery/) : the **Internal Developer Platform (IDP)** that cuts noise for developers with paved paths to production
- [Upbound](https://docs.upbound.io/): Build autonomous infrastructure platforms ready for the age of autonomous systems. Upbound support and hosting the packages of crossplane, check more at [Upbound Marketplace](https://marketplace.upbound.io/)
## Internal Developer Platform (IDP) Framework

- [backstage](https://github.com/backstage/backstage): An open framework for building developer portals
- [crossplane](https://github.com/crossplane/crossplane): a framework for building cloud native control planes without needing to write code. Explore more about [Crossplane Providers](https://github.com/crossplane-contrib)
- [upjet](https://github.com/crossplane/upjet): A code generation framework and runtime for Crossplane providers
- [kratix](https://github.com/syntasso/kratix): Kratix is an open-source framework for building platforms
- [Kro](https://kro.run/):  Build declarative, secure, and verifiable Kubernetes abstractions. 

## Cloud Native Languages and Frameworks

- [cel-spec](https://github.com/google/cel-spec): Common Expression Language -- specification and binary representation
- [cue](https://github.com/cue-lang/cue): Validate and define text-based and dynamic configuration
- [helm](https://helm.sh/): The package manager for Kubernetes 🌟 **(Recommended)**
- [kcl](https://github.com/kcl-lang/kcl): KCL Programming Language Core and API (CNCF Sandbox Project).
- [kustomize](https://github.com/kubernetes-sigs/kustomize): Customization of kubernetes YAML configurations 🌟 **(Recommended)**
- [operator-lifecycle-manager](https://github.com/operator-framework/operator-lifecycle-manager): A management framework for extending Kubernetes with Operators
- [werf](https://github.com/werf/werf): A solution for implementing efficient and consistent software delivery to Kubernetes facilitating best practices.
- [ytt](https://github.com/carvel-dev/ytt): YAML templating tool that works on YAML structure instead of text. Powered by [Carvel](https://carvel.dev/)