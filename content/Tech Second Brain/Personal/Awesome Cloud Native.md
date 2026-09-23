---
title: Awesome Cloud Native
tags:
  - awesome
  - collections
  - gitops
  - devops
  - cloud-native
---

![[thumbnail-cncf-landscape-v2.png]]

>[!info]
>*"Cloud native is the software approach of building, deploying, and managing modern applications in cloud computing environments. Modern companies want to build highly scalable, flexible, and resilient applications that they can update quickly to meet customer demands. To do so, they use modern tools and techniques that inherently support application development on cloud infrastructure. These cloud-native technologies support fast and frequent changes to applications without impacting service delivery, providing adopters with an innovative, competitive advantage." By [AWS about Cloud Native](https://aws.amazon.com/what-is/cloud-native/)*
>
>*"Cloud Native is an approach to designing and building applications for dynamic cloud environments. By prioritizing rapid development and frequent updates, organizations are able to innovate faster and reduce operational complexity." By [GitHub about Cloud Native](https://github.com/resources/articles/what-is-cloud-native)*

Cloud Native usually relate with Containerization, Kubernetes, and Architecture topics, therefore you should double-check more them at reference below

- [[Awesome Containerization]]
- [[Awesome DevOps & SRE & System & Tech]]
- [[Awesome DevSecOps]]
- [[Awesome Kubernetes]]
- [[Awesome Kubernetes Walkthrough]]
- [[Awesome Self-Hosted]]
- [[Awesome System Architecture]]
# General

![[thumbnail-gitops.png|center]]

## Advantage Articles

- [[Atlantis with ECS for automatic provisioning|Blog - Atlantis with ECS for automatic provisioning]]
- [Medium - GitOps: How to Manage Dynamic Network Policy Changes at Scale Across 25 Clusters?](https://itnext.io/gitops-how-to-manage-dynamic-network-policy-changes-at-scale-across-25-clusters-0727ce1145e5) 🌟 **(Recommended)**
## Awesome Repositories

- [awesome-argo](https://github.com/akuity/awesome-argo): A curated list of awesome projects and resources related to Argo (a CNCF graduated project)
- [awesome-cloud-native](https://github.com/rootsongjc/awesome-cloud-native): A curated list for awesome cloud native tools, software and tutorials.
- [awesome-cloudnative-trainings](https://github.com/joseadanof/awesome-cloudnative-trainings): Awesome Trainings from Cloud Native Computing Foundation Projects and Kubernetes related software
- [awesome-flux-infra](https://github.com/brainfair/awesome-flux-infra): This repository contains infrastructure applications and add-ons installed in Kubernetes via FluxCD v2.
- [awesome-microservices](https://github.com/mfornos/awesome-microservices): A curated list of Microservice Architecture related principles and technologies.
- [awesome-ebpf](https://github.com/zoidyzoidzoid/awesome-ebpf) : A curated list of awesome projects related to eBPF
## Blogs

- [Operate First](https://www.operate-first.cloud/apps/content/README.html): Serve as a main resource for all Operate First GitHub Org contributors.
- [Platform Engineering](https://platformengineering.org/blog): The blog about Platform Engineer and PlatformCon 
- [Internal Developer Platform](https://internaldeveloperplatform.org/): The general and blog about IDP and Development Strategies
- [Brendan Gregg](https://www.brendangregg.com/index.html): Cool guy with pleasant contents about ebpf and kernel technologies 🌟 **(Recommended)**
- [Isovalent Blog](https://isovalent.com/blog/): More about ebpf and kernel technologies, especially cilium and sub-projects of **cilium** 🌟 **(Recommended)**
## Bootstrap Articles

- [Medium - Configure CI/CD pipeline: GitlabCI, ArgoCD, HelmCharts & SOPS](https://medium.com/@golaneduard1/configure-ci-cd-pipeline-gitlabci-argocd-helmcharts-sops-3cbf94f300ed) 🌟 **(Recommended)**
- [Medium - End-to-End DevSecOps and GitOps Implementation with Jenkins, Docker, SonarQube, Trivy, Terraform, ArgoCD, and Amazon EKS](https://medium.com/@harsh05/end-to-end-devsecops-and-gitops-implementation-with-jenkins-docker-sonarqube-trivy-terraform-3ae842882b75)
- [Medium - GitOps with Kubernetes, Terraform, Gitlab and FluxCD](https://medium.com/@prag-matic/gitops-with-kubernetes-terraform-gitlab-and-fluxcd-2875d1010dac)
- [Digital Ocean - Implementing GitOps using Flux CD](https://www.digitalocean.com/community/developer-center/implementing-gitops-using-flux-cd)
- [Codefresh - Understanding Argo CD: Kubernetes GitOps Made Simple](https://codefresh.io/learn/argo-cd/) 🌟 **(Recommended)**
## eBPF Articles

![[thumbnail-ebpf-general.png]]

>[!info] eBPF
>**[eBPF](https://ebpf.io/what-is-ebpf/)** is a revolutionary technology with origins in the Linux kernel that can run sandboxed programs in a privileged context such as the operating system kernel. It is used to safely and efficiently extend the capabilities of the kernel without requiring to change kernel source code or load kernel modules.

- [[Profiling applications with Pyroscope]]
- [[Kubewekend Session 4|Kubewekend Session 4: Learn about ebpf with hubble and cilium]]
- [Medium - Noisy Neighbor Detection with eBPF](https://netflixtechblog.com/noisy-neighbor-detection-with-ebpf-64b1f4b3bbdd)
- [KodeKloud - eBPF Essentials for DevOps Professionals](https://kodekloud.com/blog/ebpf-essentials-devops/) 🌟 **(Recommended)**
- [Medium - eBPF Maps State Synchronization across Multi-Node Kubernetes Cluster](https://medium.com/gitconnected/ebpf-maps-state-synchronization-across-multi-node-kubernetes-cluster-d0c075810fa7)
## Landscape

- [CD Foundation Landscape](https://landscape.cd.foundation/): Collection about CI/CD Projects 🌟 **(Recommended)**
- [CNCF Landscape](https://landscape.cncf.io/): Collection by category tools and technologies of CNCF 🌟 **(Recommended)**
- [Platform Engineer landscape](https://platformengineering.org/platform-tooling): Distills the best practices in designing IDP 🌟 **(Recommended)**
## Organization and Community

- [CNCF Projects](https://contribute.cncf.io/contributors/projects/): All projects of the Cloud Native Computing Foundation
- [LFX](https://lfx.linuxfoundation.org/): a hub for collaboration and sustainability in open source
- [Linux Foundation Project](https://www.linuxfoundation.org/projects) : Opensource Ambassador for projects from multiple users
## Platform Engineer Articles

- [Blog - Platform Engineering in 2026: Why DIY Is Dead](https://roadie.io/blog/platform-engineering-in-2026-why-diy-is-dead/)
- [Humanitec - Self-hosted Platform Orchestrator](https://humanitec.com/blog/running-the-platform-orchestrator-self-hosted)
- [Medium - Top 20 Platform Engineering Tools](https://medium.com/spacelift/top-20-platform-engineering-tools-7e9c7289fb94)
- [Platform Engineer - 10 Platform engineering predictions for 2026](https://platformengineering.org/blog/10-platform-engineering-predictions-for-2026)
- [Platform Engineer - Internal Developer Platform (IDP) Reference Architectures](https://devops.com/internal-developer-platform-idp-reference-architectures/)
- [Platform Engineer - Top 10 platform engineering tools to use in 2025](https://platformengineering.org/blog/top-10-platform-engineering-tools-to-use-in-2025)
# Cloud-Native Tools and Frameworks

![[thumbnail-cncf-landscape.png]]

## Authentication

- [dex](https://github.com/dexidp/dex): OpenID Connect (OIDC) identity and OAuth 2.0 provider with pluggable connectors 🌟 **(Recommended)**
- [oauth2-proxy](https://github.com/oauth2-proxy/oauth2-proxy): A reverse proxy that provides authentication with Google, Azure, OpenID Connect and many more identity providers.
- [Keycloak](https://github.com/keycloak/keycloak): an open-source identity and access management solution for modern applications and services, built on top of industry security standard protocols. 🌟 **(Recommended)**
## Automatic Deployment & GitOps

- [argo-cd](https://argo-cd.readthedocs.io/en/stable/) :  A declarative, GitOps continuous delivery tool for Kubernetes 🌟 **(Recommended)**
	- [argo-rollouts](https://github.com/argoproj/argo-rollouts): Progressive Delivery for Kubernetes. Maintained by Argo
	- [argocd-image-updater](https://github.com/argoproj-labs/argocd-image-updater): Automatic container image update for Argo CD

- [fluxcd](https://fluxcd.io/flux/) : Tool for keeping Kubernetes clusters in sync with sources of configuration (like Git repositories), and automating updates to configuration when there is new code to deploy
	- [flagger](https://flagger.app/): Progressive Delivery Operator for Kubernetes. Maintained by Flux
	- [capacitor](https://github.com/gimlet-io/capacitor):  A general purpose UI for FluxCD
	- [weave-gitops](https://github.com/weaveworks/weave-gitops): a free and open source GUI for Flux under the [weave-gitops](https://web.archive.org/web/20230314183054/https://docs.gitops.weave.works/docs/intro/) project

- [kargo](https://docs.kargo.io/): A next-generation continuous delivery and application lifecycle orchestration platform for Kubernetes
- [flipt](https://github.com/flipt-io/flipt): Enterprise-ready, GitOps enabled, CloudNative feature management solution
- [fleet](https://github.com/rancher/fleet): Deploy workloads from Git to large fleets of Kubernetes clusters
- [cyclops](https://github.com/cyclops-ui/cyclops): an open-source dev tool that simplifies Kubernetes with an easy-to-use UI, making it less intimidating
- [GlassKube](https://glasskube.dev/docs/) : An open-source Kubernetes package manager that simplifies package management for Kubernetes
## Cloud Native Languages and Frameworks

- [cel-spec](https://github.com/google/cel-spec): Common Expression Language -- specification and binary representation
- [cue](https://github.com/cue-lang/cue): Validate and define text-based and dynamic configuration
- [helm](https://helm.sh/): The package manager for Kubernetes 🌟 **(Recommended)**
- [kcl](https://github.com/kcl-lang/kcl): KCL Programming Language Core and API (CNCF Sandbox Project). 🌟 **(Recommended)**
- [kustomize](https://github.com/kubernetes-sigs/kustomize): Customization of kubernetes YAML configurations 🌟 **(Recommended)**
- [operator-lifecycle-manager](https://github.com/operator-framework/operator-lifecycle-manager): A management framework for extending Kubernetes with Operators
- [werf](https://github.com/werf/werf): A solution for implementing efficient and consistent software delivery to Kubernetes facilitating best practices.
- [ytt](https://github.com/carvel-dev/ytt): YAML templating tool that works on YAML structure instead of text. Powered by [Carvel](https://carvel.dev/)
## Cloud Native Tools and Utilities

- [okteto](https://github.com/okteto/okteto): Develop your applications directly in your Kubernetes Cluster
- [mutagen](https://github.com/mutagen-io/mutagen): Fast file synchronization and network forwarding for remote development 🌟 **(Recommended)**
- [mirrord](https://github.com/metalbear-co/mirrord):  Run any process, on your machine or in an AI agent's environment, as if it were a pod in your Kubernetes cluster: real env vars, DNS, network, traffic. 🌟 **(Recommended)**
- [telepresence](https://github.com/telepresenceio/telepresence): Local development against a remote Kubernetes or OpenShift cluster
## eBPF

- [Cilium](https://cilium.io/): eBPF-based Networking, Observability, Security 🌟 **(Recommended)**
- [Pyroscope](https://github.com/grafana/pyroscope): Continuous Profiling Platform. Debug performance issues down to a single line of code 🌟 **(Recommended)**
- [Tetragon](https://tetragon.io/docs/) : Cilium Tetragon component enables powerful realtime, eBPF-based Security Observability and Runtime Enforcement. 🌟 **(Recommended)**
## Feature Flags

- [flagd](https://github.com/open-feature/flagd): A feature flag daemon with a Unix philosophy
- [flipt](https://github.com/flipt-io/flipt): Enterprise-ready, Git native feature management solution
- [go-feature-flag](https://github.com/thomaspoignant/go-feature-flag): GO Feature Flag is a simple, complete and lightweight self-hosted cloud native feature flag solution 100% Open Source — built on OpenFeature 🎛️
- [OpenFeature](https://openfeature.dev/): Standardizing Feature Flagging for Everyone
- [unleash](https://github.com/Unleash/unleash): Open-source feature management platform
## Internal Developer Platform (IDP)

- [KubeVela](https://kubevela.io/): a modern software delivery platform that makes deploying and operating applications across today's hybrid, multi-cloud environments _easier, faster and more reliable._
- [kubriX](https://github.com/suxess-it/kubriX): a **curated**, **opinionated**, and **highly flexible** Internal Developer Platform (IDP) for Kubernetes
- [Kusion](https://www.kusionstack.io/docs/) : An intent-driven **Platform Orchestrator**, which sits at the core of an **Internal Developer Platform (IDP)**
- [meshery](https://github.com/meshery/meshery): A self-service engineering platform, [Meshery](https://meshery.io/), is the open source, cloud native manager that enables the design and management of all Kubernetes-based infrastructure and applications (multi-cloud).
- [openchoreo](https://github.com/openchoreo/openchoreo): OpenChoreo is an open-source internal developer platform (IDP) 🌟 **(Recommended)**
- [Qovery](https://hub.qovery.com/docs/getting-started/what-is-qovery/) : the **Internal Developer Platform (IDP)** that cuts noise for developers with paved paths to production
- [Upbound](https://docs.upbound.io/): Build autonomous infrastructure platforms ready for the age of autonomous systems. Upbound support and hosting the packages of crossplane, check more at [Upbound Marketplace](https://marketplace.upbound.io/)
## Internal Developer Platform (IDP) Framework

- [backstage](https://github.com/backstage/backstage): An open framework for building developer portals
- [crossplane](https://github.com/crossplane/crossplane): a framework for building cloud native control planes without needing to write code. Explore more about [Crossplane Providers](https://github.com/crossplane-contrib) 🌟 **(Recommended)**
- [upjet](https://github.com/crossplane/upjet): A code generation framework and runtime for Crossplane providers
- [kratix](https://github.com/syntasso/kratix): Kratix is an open-source framework for building platforms
- [Kro](https://kro.run/):  Build declarative, secure, and verifiable Kubernetes abstractions. 
- [terraform-kubestack](https://github.com/kbst/terraform-kubestack): Kubestack is a framework for Kubernetes platform engineering teams to define the entire cloud native stack in one Terraform code base and continuously evolve the platform safely through GitOps.