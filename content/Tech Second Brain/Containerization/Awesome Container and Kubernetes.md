---
title: The awesome of Container and Kubernetes
tags:
  - k8s
  - research
  - architecture
  - helpful
  - docker
  - awesome
---
>[!purpose]
>This page is created for purpose store relation to helpful articles, make a some reference link when you can check and understand more about K8s (Kubernetes) and awesome things with this orchestration, but also learning and exploring more about worldwide containerization 🔥
# Docker & Containerization

![[thumbnail-vm-and-container.png]]
## Articles

- [Medium - Powerful Docker Alternatives in 2024](https://medium.com/gitconnected/powerful-docker-alternatives-to-revolutionize-containerization-in-2024-99249ba6d059)
- [AquaSec - Container Engines: How They Work and Top 7 Options](https://www.aquasec.com/cloud-native-academy/container-platforms/container-engines/)
- [Blackvoid - Synology, Docker and open source tech blog](https://www.blackvoid.club/)
- [Medium - Deep Dive into Docker Containers | Architecture and Features](https://medium.com/@dmosyan/deep-dive-into-docker-containers-architecture-and-features-530a937f4c87)
- [Docker - Alternative container runtimes](https://docs.docker.com/engine/daemon/alternative-runtimes/)
- [Cloudraft - Most Popular Container Runtimes](https://www.cloudraft.io/blog/container-runtimes)
- [Medium - 11 Open-Source SaaS Killer — Selfhost With Docker](https://blog.devgenius.io/11-open-source-saas-killer-selfhost-with-docker-034456653568)
- [Medium - 11 Open-Source SaaS Killer — Selfhost With Docker -2](https://medium.com/@harendra21/11-open-source-saas-killer-selfhost-with-docker-2-5d507de8b68f)
- [Medium - 11 Open-Source SaaS Killer — Selfhost With Docker -3](https://medium.com/@harendra21/11-open-source-saas-killer-selfhost-with-docker-3-a707a15cb540)
- [Dev.to - Comparison of Alpine, Slim, Stretch, Buster, Jessie, and Bullseye Linux Distributions](https://dev.to/falselight/comparison-of-alpine-slim-stretch-buster-jessie-and-bullseye-linux-distributions-1329)
## Awesome Repositories

- [awesome-compose](https://github.com/docker/awesome-compose) : Awesome Docker Compose samples
- [awesome-docker](https://github.com/veggiemonk/awesome-docker) : 🐳 A curated list of Docker resources and projects
- [awesome-stacks](https://github.com/ethibox/awesome-stacks): Deploy 120+ open-source web apps with one Docker command.
- [bitnami-containers](https://github.com/bitnami/containers) : Bitnami container images
## Development & Implementation

- [Ivan Velichko - Implementing Container Runtime Shim: runc](https://iximiuz.com/en/posts/implementing-container-runtime-shim/)
- [KodeKloud - 3 Best Ways to Run Docker in Docker Container](https://kodekloud.com/blog/run-docker-in-docker-container/)
## General & Documentation

- [Docker Documentation](https://docs.docker.com/)
- [Podman Documentation](https://docs.podman.io/en/latest/)
- [Rootless Containers](https://rootlesscontaine.rs/): Rootless containers refers to the ability for an unprivileged user to create, run and otherwise manage containers.
- [Youtube NetworkChuck - Docker Tutorials Series](https://www.youtube.com/playlist?list=PLIhvC56v63IJlnU4k60d0oFIrsbXEivQo)
## Organizations

- [AliyunContainerService](https://github.com/AliyunContainerService): Aliyun (Alibaba Cloud) Container Service
- [Bitnami](https://github.com/bitnami): Organization belong of VMWare to contributing docker image. [Website](https://bitnami.com/)
- [Collabnix](https://github.com/collabnix): A Community of 8800+ DevOps Engineers for Learning Containerization
- [Containers](https://github.com/containers) : Open Repository for Container Tools
- [Docker](https://github.com/docker): Docker helps developers bring their ideas to life by conquering the complexity of app development.
- [LinuxServer.io](https://github.com/linuxserver): Building and maintaining community images
## Tips for configuration

- [Medium - Accessing the host’s localhost from inside a Docker container](https://medium.com/@gladevise/accessing-the-hosts-localhost-from-inside-a-docker-container-c5935e275953)
- [Medium - Docker Commands You Never Heard Of!](https://medium.com/@arton.demaku/docker-commands-you-never-heard-of-4b25da3dd738)
- [Medium - 13 Docker Cost Optimizations You Should Know](https://medium.com/overcast-blog/13-docker-cost-optimizations-you-should-know-1f78c0accb45)
- [Medium - Docker Beginner to Expert Tutorial](https://levelup.gitconnected.com/docker-beginner-to-expert-tutorial-68555aa3e544)
## Topics

- [CNI GitHub](https://github.com/topics/cni): Collection of GitHub about CNI (Container Network Interface) Topics
## Troubleshoot

- [Medium - 11 Ways to Troubleshoot Docker Faster](https://medium.com/gitconnected/11-ways-to-troubleshoot-docker-faster-8f9ab55dd419)
# Containerization Registries and Tools

![[thumbnail-container-service-layer.png]]
## CNI (Container Network Interface)

- [calico](https://www.tigera.io/project-calico/): Calico is a networking and security solution that enables `Kubernetes` workloads and non-Kubernetes/legacy workloads to communicate seamlessly and securely.
- [cilium](https://cilium.io/) : Cilium is an open source, cloud native solution for providing, securing, and observing network connectivity between workloads, fueled by the revolutionary Kernel technology eBPF
- [cni](https://github.com/containernetworking/cni) : Container Network Interface - networking for Linux containers. [Website](https://www.cni.dev/docs/)
- [flannel](https://github.com/flannel-io/flannel) : A network fabric for containers, designed for `Kubernetes`
## Containerization Items

- [crane](https://github.com/google/go-containerregistry/tree/main/cmd/crane): A tool for interacting with remote images and registries
- [dive](https://github.com/wagoodman/dive) : A tool for exploring each layer in a docker image
- [docker-rollout](https://github.com/Wowu/docker-rollout): Zero Downtime Deployment for Docker Compose
- [nginx-proxy](https://github.com/nginx-proxy/nginx-proxy): Automated nginx proxy for Docker containers using docker-gen
- [trivy](https://github.com/aquasecurity/trivy): Find vulnerabilities, misconfigurations, secrets, SBOM in containers, Kubernetes, code repositories, clouds and more
- [watchtower](https://github.com/containrrr/watchtower): A process for automating Docker container base image updates.
## Containerization Registry/Compose Collections

- [Amazon ECR Public Gallery](https://gallery.ecr.aws/)
- [Awesome Docker Compose Examples](https://haxxnet.github.io/Compose-Examples/)
- [Bitnami Application Catalog](https://bitnami.com/stacks)
- [DockerHub](https://hub.docker.com/)
- [Google Artifact Registry Distroless](https://console.cloud.google.com/artifacts/docker/distroless/us/gcr.io)
- [LinuxServer](https://docs.linuxserver.io/) : [Tutorial Manual](https://docs.linuxserver.io/)
- [Microsoft Artifact Registry](https://mcr.microsoft.com/)
- [Quay Registry](https://quay.io/)
## CRI (Container Runtime Interface)

- [containerd](https://github.com/containerd/containerd) : An open and reliable container runtime. [Getting started](https://github.com/containerd/containerd/blob/main/docs/getting-started.md)
- [cri-dockerd](https://github.com/Mirantis/cri-dockerd): dockerd as a compliant Container Runtime Interface for Kubernetes (Mirantis OpenSource)
- [cri-tools](https://github.com/kubernetes-sigs/cri-tools) : CLI and validation tools for Kubelet Container Runtime Interface (CRI). [User guide](https://github.com/kubernetes-sigs/cri-tools/blob/master/docs/crictl.md)
- [docker](https://docs.docker.com/engine/install/#server) : Docker is one of CRI mostly to used 
- [kubeletctl](https://github.com/cyberark/kubeletctl): A client for kubelet
## OCI (Open Container Initiative)

>[!info]
>The OCI currently contains three specifications: the Runtime Specification (runtime-spec), the Image Specification (image-spec) and the Distribution Specification (distribution-spec). The Runtime Specification outlines how to run a “filesystem bundle” that is unpacked on disk. At a high-level an OCI implementation would download an OCI Image then unpack that image into an OCI Runtime filesystem bundle. At this point the OCI Runtime Bundle would be run by an OCI Runtime.
>
>Official Website: [Link](https://opencontainers.org/)

- [buildah](https://github.com/containers/buildah) : A tool that facilitates building OCI images.
- [kaniko](https://github.com/GoogleContainerTools/kaniko): Build Container Images In Kubernetes
- [podman](https://github.com/containers/podman) : A tool for managing OCI containers and pods.
- [runc](https://github.com/opencontainers/runc) : CLI tool for spawning and running containers according to the OCI specification
##  Selfhosted Container Registry

- [harbor](https://github.com/goharbor/harbor): An open source trusted cloud native registry project that stores, signs, and scans content
- [nixery](https://github.com/tazjin/nixery): Container registry which transparently builds images using the Nix package manager
## Useful Container Image

- [amazon/aws-cli](https://hub.docker.com/r/amazon/aws-cli): Universal Command Line Interface for Amazon Web Services
- [docker-android](https://github.com/budtmo/docker-android): Android in docker solution with noVNC supported and video recording
- [docker](https://hub.docker.com/_/docker): Docker in Docker!
- [windows](https://github.com/dockur/windows): Windows inside a Docker container.
# Kubernetes
![[icon-kubernetes.png|center]]

## Articles

- [Medium - 7 Underrated Kubernetes Projects: Elevate Your Lab Playground!](https://medium.com/@ebenamor/7-underrated-kubernetes-projects-elevate-your-lab-playground-ac7f47cba347)
- [Medium - Why does my 2vCPU application run faster in a VM than in a container?](https://hwchiu.medium.com/why-does-my-2vcpu-application-run-faster-in-a-vm-than-in-a-container-6438ffaba245)
- [Medium - 11 Kubernetes Deployment Configs You Should Know in 2024](https://medium.com/overcast-blog/11-kubernetes-deployment-configs-you-should-know-in-2024-1126740926f0)
- [Medium - Deciphering the Kubernetes Networking Maze: Navigating Load-Balance, BGP, IPVS and Beyond](https://medium.com/itnext/deciphering-the-kubernetes-networking-maze-navigating-load-balance-bgp-ipvs-and-beyond-7123ef428572)
- [Medium - Kubernetes Scheduling: Understanding the Math Behind the Magic](https://romanglushach.medium.com/kubernetes-scheduling-understanding-the-math-behind-the-magic-2305b57d45b1)
- [Medium - Kubernetes Networking: Load Balancing Techniques and Algorithms](https://romanglushach.medium.com/kubernetes-networking-load-balancing-techniques-and-algorithms-5da85c5c7253)
- [Medium - 15 Best Kubernetes Cost Optimization Tools for 2024](https://overcast.blog/15-best-kubernetes-cost-optimization-tools-for-2024-2e131a7cbe7a)
- [Azure - Scaling options for applications in Azure Kubernetes Service (AKS)](https://learn.microsoft.com/en-us/azure/aks/concepts-scale)
- [Medium - Database in Kubernetes: Is that a good idea?](https://medium.com/@fengruohang/database-in-kubernetes-is-that-a-good-idea-daf5775b5c1f)
- [Medium - 10 Ways for Kubernetes Declarative Configuration Management](https://medium.com/stackademic/10-ways-for-kubernetes-declarative-configuration-management-3538673fd0b5)
- [Medium - 10 Essential Kubernetes Tools You Didn’t Know You Needed](https://medium.com/itnext/10-essential-kubernetes-tools-you-didnt-know-you-needed-06954251d845)
- [Medium - Kubernetes — EKS — Upgrade process best practices (on AWS)](https://medium.com/atmosly/kubernetes-eks-upgrade-process-best-practices-on-aws-aed30e16bac1)
- [Medium - 7 Best Open Source Storage Solutions for Kubernetes](https://blog.devops.dev/7-best-open-source-storage-solutions-for-kubernetes-0da8b51efe8d)
- [Medium - Lightweight CI/CD Solutions for Kubernetes: Going Beyond Keel, Flux, and ArgoCD](https://medium.com/@PlanB./lightweight-ci-cd-solutions-for-kubernetes-going-beyond-keel-flux-and-argocd-8b0b923e644c)
- [Medium - EKS Cluster Network Architecture for Worker Nodes](https://keetmalin.medium.com/eks-cluster-network-architecture-for-worker-nodes-635e067c8c2a)
- [Medium - Why NGINX IngressController Isn’t the Best Choice for Production Workloads](https://medium.com/@talhakhalid101/why-nginx-ingresscontroller-isnt-the-best-choice-for-production-workloads-dfc641da3e2c)
- [Internet - Pain(less?) NGINX Ingress](https://danielfm.me/post/painless-nginx-ingress/)
- [Medium - Optimize Your Kubernetes Resources with Azure IAM: Managed vs. Workload Identity](https://itnext.io/simplify-secure-your-azure-resources-managed-identity-vs-workload-identity-fe49d133fc03)
- [Medium - Bringing Amazon EKS Hybrid Nodes to life with Palette](https://medium.com/itnext/bringing-amazon-eks-hybrid-nodes-to-life-with-palette-584734449503)
- [Medium - 12 Tools that will make Kubernetes management easier in 2024](https://medium.com/faun/12-tools-that-will-make-kubernetes-management-easier-in-2024-b7c349dc0eaa)
- [Medium - Why Some Companies are Moving Away from Kubernetes for Development Environments in 2025](https://medium.com/@PlanB./why-some-companies-are-moving-away-from-kubernetes-for-development-environments-in-2025-1f44b4fd4f3f)
- [Cast.ai - Custom Kube-Scheduler: Why And How to Set it Up in Kubernetes](https://cast.ai/blog/custom-kube-scheduler-why-and-how-to-set-it-up-in-kubernetes/)
- [Blog - Installing the NFS CSI Driver on a Kubernetes cluster to allow for dynamic provisioning of Persistent Volumes](https://rudimartinsen.com/2024/01/09/nfs-csi-driver-kubernetes/)
- [Medium - Kubernetes Traffic Optimization: The Role of Topology-Aware Routing](https://faun.pub/kubernetes-traffic-optimization-the-role-of-topology-aware-routing-c950e25f3bf1)
## Awesome repositories

- [awesome-k8s-resources](https://github.com/tomhuang12/awesome-k8s-resources) : A curated list of awesome Kubernetes tools and resources.
- [awesome-krew-plugin](https://krew.sigs.k8s.io/plugins/): A list of Plugin which used by kubectl
- [awesome-kubernetes](https://ramitsurana.github.io/awesome-kubernetes/) : A curated list for awesome kubernetes sources 🚢🎉
- [k8s-deployment-strategies](https://github.com/ContainerSolutions/k8s-deployment-strategies) : Kubernetes deployment strategies explained. [Article](https://blog.container-solutions.com/kubernetes-deployment-strategies)
- [kubebuilder](https://book.kubebuilder.io/introduction): Kubebuilder - SDK for building Kubernetes APIs using CRDs
- [Kubernetes Cluster API](https://cluster-api.sigs.k8s.io/) : About cluster API
- [Kubernetes/community](https://github.com/kubernetes/community) : Kubernetes community content
- [Kubernetes CSI Drivers](https://kubernetes-csi.github.io/docs/drivers.html): The following are a set of CSI driver which can be used with Kubernetes
- [Kubernetes/enhancements](https://github.com/kubernetes/enhancements): Enhancements tracking repo for Kubernetes
- [Kubetools](https://collabnix.github.io/kubetools/): A Curated List of Kubernetes Tools
- [Kubernetes Schedule Plugins](https://scheduler-plugins.sigs.k8s.io/): Repository for out-of-tree scheduler plugins based on the [scheduler framework](https://kubernetes.io/docs/concepts/scheduling-eviction/scheduling-framework/).
- [Kubernetes examples](https://k8s-examples.container-solutions.com/): A series of YAML references with canonical and as-simple-as-possible demonstrations of kubernetes functionality and features.
- [awesome-argo](https://github.com/akuity/awesome-argo): A curated list of awesome projects and resources related to Argo (a CNCF graduated project)
## Certificate & Practice

- [certified-kubernetes-administrator-course](https://github.com/kodekloudhub/certified-kubernetes-administrator-course) : Kodecloud Certified Kubernetes Administrator - CKA Course
- [certified-kubernetes-security-specialist-cks-course](https://github.com/kodekloudhub/certified-kubernetes-security-specialist-cks-course) : Kodecloud Notes from the Certified Kubernetes Security Specialist Course on KodeKloud
- [killer.sh - Linux Foundation Exam Simulators](https://killer.sh/)
- [kube4sure - The Kubernetes Exam Simulator](https://www.kube4sure.com/)
- [learnk8s - Kubernetes training for engineer](https://learnk8s.io/)
## Development & Implementation

- [Medium - Kubernetes: a single AWS Load Balancer for different Kubernetes Ingresses](https://itnext.io/kubernetes-a-single-aws-load-balancer-for-different-kubernetes-ingresses-c8f68c75b7d8)
- [Medium - Implementing ROOK Ceph Storage solution on Virtual kubernetes clusters](https://purushothamkdr453.medium.com/implementing-rook-ceph-storage-solution-on-virtual-kubernetes-clusters-f9b7abfbcb56)
- [Medium - Kubernetes Storage Performance Comparison Rook Ceph and Piraeus Datastore (LINSTOR)](https://medium.com/@gjanders03/kubernetes-storage-performance-comparison-rook-ceph-and-piraeus-datastore-linstor-e9bc2859a8f0)
- [Medium - 2 Powerful AI and Database Operators to Extend your K8s Cluster](https://onairotich.medium.com/2-powerful-ai-and-database-operators-to-extend-your-k8s-cluster-9c517e83b368)
- [Medium - Creating a Custom Scheduler in Kubernetes: A Practical Guide](https://overcast.blog/creating-a-custom-scheduler-in-kubernetes-a-practical-guide-2d9f9254f3b5)
- [Medium - VictoriaLogs: an overview, run in Kubernetes, LogsQL, and Grafana](https://itnext.io/victorialogs-an-overview-run-in-kubernetes-logsql-and-grafana-88e0934a5ccd)
- [Medium - Configuring Production-Ready EKS Clusters with Terraform and GitHub Actions](https://medium.com/stackademic/configuring-production-ready-eks-clusters-with-terraform-and-github-actions-c046e8d44865)
- [Medium - eBPF Maps State Synchronization across Multi-Node Kubernetes Cluster](https://medium.com/gitconnected/ebpf-maps-state-synchronization-across-multi-node-kubernetes-cluster-d0c075810fa7)
- [Medium - GitOps with Kubernetes, Terraform, Gitlab and FluxCD](https://medium.com/@prag-matic/gitops-with-kubernetes-terraform-gitlab-and-fluxcd-2875d1010dac)
- [Medium - Configure CI/CD pipeline: GitlabCI, ArgoCD, HelmCharts & SOPS](https://medium.com/@golaneduard1/configure-ci-cd-pipeline-gitlabci-argocd-helmcharts-sops-3cbf94f300ed)
## DIYs

- [Medium - HomeLab Kubernetes Cluster Setup](https://cavecafe.medium.com/setup-homelab-kubernetes-cluster-cfc3acd4dca5)
- [Medium - Kubernetes, but locally.](https://medium.com/@mosesmbadi/kubernetes-but-locally-aa5fbd671763)
- [Medium - End-to-End DevSecOps and GitOps Implementation with Jenkins, Docker, SonarQube, Trivy, Terraform, ArgoCD, and Amazon EKS](https://medium.com/@harsh05/end-to-end-devsecops-and-gitops-implementation-with-jenkins-docker-sonarqube-trivy-terraform-3ae842882b75)
## General & Documentation

- [Alibaba - Kubernetes CNIs and CNI Plug-ins](https://www.alibabacloud.com/blog/getting-started-with-kubernetes-%7C-kubernetes-cnis-and-cni-plug-ins_596330)
- [ArmoSecr - etcd in Kubernetes](https://www.armosec.io/glossary/etcd-kubernetes/)
- [AWS - EKS Best Practices Guides](https://aws.github.io/aws-eks-best-practices/)
- [AWS - Kubernetes concepts for EKS](https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-concepts.html)
- [AWS - the Kubernetes version lifecycle on EKS](https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-versions.html)
- [Azure - Core Kubernetes concepts for Azure Kubernetes Service](https://learn.microsoft.com/en-us/azure/aks/concepts-clusters-workloads)
- [Azure - Supported Kubernetes versions in Azure Kubernetes Service (AKS)](https://learn.microsoft.com/en-us/azure/aks/supported-kubernetes-versions?tabs=azure-cli)
- [Densify - Kubernetes Service Discovery](https://www.densify.com/kubernetes-autoscaling/kubernetes-service-discovery/)
- [Dev.io - Basic Guide to Kubernetes Service Discovery](https://dev.to/nomzykush/basic-guide-to-kubernetes-service-discovery-dmd)
- [KodeKloud - Kube-Proxy: What Is It and How It Works](https://kodekloud.com/blog/kube-proxy/)
- [KodeKloud - Kube-Proxy: What Is It and How It Works](https://kodekloud.com/blog/kube-proxy/)
- [Kubernetes Blog](https://kubernetes.io/blog/)
- [Kubernetes - Container Runtime Interface (CRI)](https://kubernetes.io/docs/concepts/architecture/cri/)
- [Kubernetes - Controllers](https://kubernetes.io/docs/concepts/architecture/controller/)
- [Kubernetes Documentation](https://kubernetes.io/docs/home/)
- [Kubernetes - Extending Kubernetes](https://kubernetes.io/docs/concepts/extend-kubernetes/)
- [Kubernetes - Ingress Controllers](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/)
- [Kubernetes - Kubernetes CSI Documentation](https://kubernetes-csi.github.io/docs/)
- [Kubernetes - Scheduler Configuration](https://kubernetes.io/docs/reference/scheduling/config/)
- [Kubernetes - Scheduling, Preemption and Eviction](https://kubernetes.io/docs/concepts/scheduling-eviction/)
- [Kubernetes - The Kubernetes API](https://kubernetes.io/docs/concepts/overview/kubernetes-api/)
- [Kubernetes - Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [[Kubewekend Session 3|Kubewekend Session 3: Basically about Kubernetes architecture]]
- [Medium - Kubernetes Networking in the Simplest Way 🚀](https://aws.plainenglish.io/kubernetes-networking-in-the-simplest-way-d84e3b7ed940)
- [Medium - Top 10 Kubernetes Pod Concepts That Confuse Beginners](https://medium.com/frontend-canteen/top-10-kubernetes-pod-concepts-that-confuse-beginners-8c0954021f3f)
- [Ranchers - Container Network Interface (CNI) Providers](https://ranchermanager.docs.rancher.com/faq/container-network-interface-providers)
- [Redhat - Top 10 must-know Kubernetes design patterns](https://developers.redhat.com/blog/2020/05/11/top-10-must-know-kubernetes-design-patterns)
## Organizations

- [ApeCloud](https://github.com/apecloud): The community who focus on designing architecture inside Cloud Platform, especially Kubernetes. Author of [Kubeblocks](https://kubeblocks.io/docs/release-0.9/user_docs/overview/introduction)
- [AppsCode](https://github.com/appscode): Kubernetes-native Data Platform
- [Carvel](https://github.com/carvel-dev): a set of reliable, single-purpose, composable tools that aid in your application building, configuration, and deployment to Kubernetes. Author of [ytt](https://github.com/carvel-dev/ytt), [kapp-controller](https://github.com/carvel-dev/kapp-controller)
- [Devtron Inc](https://github.com/devtron-labs): Software Delivery Workflow For Kubernetes
- [Kubecost](https://github.com/kubecost): Organization of Kubecost - a monitoring application which provides real-time cost visibility and insights for teams using Kubernetes, helping you continuously reduce your cloud costs
- [Kubeflow](https://github.com/kubeflow/):  An open, community driven project to make it easy to deploy and manage an ML stack on Kubernetes
- [Kubernetes CSI](https://github.com/kubernetes-csi): Kubernetes specific Container-Storage-Interface (CSI) components
- [Kubernetes](https://github.com/kubernetes): Production-Grade Container Scheduling and Management
- [kubernetes-sigs](https://github.com/kubernetes-sigs) : Org for Kubernetes SIG-related work
- [KubeWharf](https://github.com/kubewharf): Developer community legit insane tools for Kubernetes
- [Medik8s](https://github.com/medik8s): Medik8s (pronounced medicates) aims for automatic detection and recovery of unhealthy k8s nodes
- [Polyaxon](https://github.com/polyaxon): A platform for reproducible and scalable machine learning and deep learning
- [The Helm Project](https://github.com/helm): The package manager for Kubernetes
- [VMware Tanzu](https://github.com/vmware-tanzu): Cloud native open source from VMware, almost for Kubernetes, Author of [velero](https://github.com/vmware-tanzu/velero)
## Practicing

- [AKS DevSecOps Workshop](https://azure.github.io/AKS-DevSecOps-Workshop/): Practical exercises to learn about Azure Kubernetes Service
- [EKS Workshop - New version](https://www.eksworkshop.com/): Practical exercises to learn about Amazon Elastic Kubernetes Service
- [EKS Workshop - Old Version](https://archive.eksworkshop.com/): Explore multiple ways to configure VPC, ALB, and EC2 Kubernetes workers, and Amazon Elastic Kubernetes Service.
## Tips for configuration

- [Medium - 24 Kubernetes Masters’ Configurations](https://overcast.blog/24-kubernetes-mastersconfigurations-29235c65b337)
- [Azure - Best practices for basic scheduler features in Azure Kubernetes Service (AKS)](https://learn.microsoft.com/en-us/azure/aks/operator-best-practices-scheduler)
- [Medium - My Top 50 Kubernetes Notes for DevOps Engineers — Detailed Q&A](https://medium.com/@thecloudarchitect/my-top-50-kubernetes-notes-for-devops-engineers-detailed-q-a-9d9c375c0076)
- [Spot - 8 Kubernetes Deployment Strategies: Roll Out Like the Pros](https://spot.io/resources/kubernetes-autoscaling/5-kubernetes-deployment-strategies-roll-out-like-the-pros/)
- [Medium - GitOps: How to Manage Dynamic Network Policy Changes at Scale Across 25 Clusters?](https://itnext.io/gitops-how-to-manage-dynamic-network-policy-changes-at-scale-across-25-clusters-0727ce1145e5)
- [AWS EKS Workshop - Configure Cluster Autoscaler (CA)](https://archive.eksworkshop.com/beginner/080_scaling/deploy_ca/#deploy-the-cluster-autoscaler-ca)
- [GitHub - Cluster Autoscaler on AWS](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler/cloudprovider/aws)
- [Medium - Mastering Horizontal Pod Autoscaling (HPA) in Amazon EKS Using Helm, Terraform, and ArgoCD: A Complete Guide with CI/CD](https://ramchandra-vadranam.medium.com/mastering-horizontal-pod-autoscaling-hpa-in-amazon-eks-using-helm-terraform-and-argocd-a-2b551720f1ad)
- [AWS - Learn how EKS Pod Identity grants pods access to AWS services](https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html)
- [AWS - IAM roles for service accounts](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html)
- [Medium - Why AWS EKS Pod Identity is a Better Fit Than IRSA for Your Kubernetes Needs?](https://aws.plainenglish.io/why-aws-eks-pod-identity-is-a-better-fit-than-irsa-for-your-kubernetes-needs-1be05515f970)
- [Medium - Simplify Kubernetes Storage: Mounting EFS to EKS Like a Pro](https://medium.com/kotaicode/simplify-kubernetes-storage-mounting-efs-to-eks-like-a-pro-655e13f72041)
- [Medium - The guide to kubectl I never had](https://medium.com/@jake.page91/the-guide-to-kubectl-i-never-had-3874cc6074ff)
- [AWS Docs - Grant IAM users access to Kubernetes with EKS access entries](https://docs.aws.amazon.com/eks/latest/userguide/access-entries.html)
- [AWS Blogs - Proactive autoscaling of Kubernetes workloads with KEDA using metrics ingested into Amazon Managed Service for Prometheus](https://aws.amazon.com/blogs/mt/proactive-autoscaling-kubernetes-workloads-keda-metrics-ingested-into-aws-amp/)
- [AWS Blogs - A deep dive into simplified Amazon EKS access management controls](https://aws.amazon.com/vi/blogs/containers/a-deep-dive-into-simplified-amazon-eks-access-management-controls/)
- [Kubecost - Monitoring NVIDIA GPU Usage in Kubernetes with Prometheus](https://blog.kubecost.com/blog/nvidia-gpu-usage/)
- [Last9 - How to Monitor Ephemeral Storage Metrics in Kubernetes](https://last9.io/blog/monitor-ephemeral-storage-metrics-in-kubernetes/)
- [Ingress Nginx Controller - Basic Authentication](https://kubernetes.github.io/ingress-nginx/examples/auth/basic/)
- [Medium - How to Setup Dynamic NFS Provisioning in a Kubernetes Cluster](https://hbayraktar.medium.com/how-to-setup-dynamic-nfs-provisioning-in-a-kubernetes-cluster-cbf433b7de29)
- [GitHub - Deploying NFS Server in Kubernetes](https://github.com/appscode/third-party-tools/blob/master/storage/nfs/README.md)
- [Technotim - Mirror your Kubernetes configs, secrets, and resources to other namespaces](https://technotim.live/posts/k8s-reflector/)
- [Medium - Running a “stateless” email server in Kubernetes using Mailu](https://medium.com/gitconnected/running-a-stateless-email-server-in-kubernetes-using-mailu-9c1ebd8003e9)
- [Medium - Mastering Ingress Strategies for AWS EKS: ALB vs. Istio vs. NGINX](https://ramchandra-vadranam.medium.com/mastering-ingress-strategies-for-aws-eks-alb-vs-istio-vs-nginx-34a7bd4ce152)
- [Medium - Configure Hashicorp's Vault for Kubernetes Auth](https://docs.armory.io/continuous-deployment/armory-admin/secrets/vault-k8s-configuration/)
- [Vault - Kubernetes auth method](https://developer.hashicorp.com/vault/docs/auth/kubernetes#kubernetes-auth-method)
- [DAOCloud - ArgoCD High Availability Solution](https://github.com/DaoCloud/DaoCloud-docs/blob/main/docs/en/docs/amamba/quickstart/argo-cd-HA.md)
- [ArgoCD - High Availability](https://argo-cd.readthedocs.io/en/stable/operator-manual/high_availability/)
## Topics

- [Helm](https://github.com/topics/helm)
- [K8s](https://github.com/topics/k8s)
- [Kubernetes](https://github.com/topics/kubernetes)
## Troubleshoot
 
- [StackOverFlow - How can I keep a container running on Kubernetes?](https://stackoverflow.com/questions/31870222/how-can-i-keep-a-container-running-on-kubernetes)
- [Kubernetes - Debugging Kubernetes nodes with crictl](https://kubernetes.io/docs/tasks/debug/debug-cluster/crictl/#before-you-begin)
- [Medium - Do Kubernetes Pods Really Get Evicted Due to CPU Pressure?](https://medium.com/overcast-blog/do-pods-really-get-evicted-due-to-cpu-pressure-2b27274a670c)
- [StackOverFlow - Why AKS nodes shows less amount of memory as allocatable where its actual memory is still available](https://stackoverflow.com/questions/68521392/why-aks-nodes-shows-less-amount-of-memory-as-allocatable-where-its-actual-memory)
- [StackOverFlow - Constantly getting Crashloopbackoff error in Kubernetes PODS generally in MongoDB pods](https://stackoverflow.com/questions/63142792/constantly-getting-crashloopbackoff-error-in-kubernetes-pods-generally-in-mongod)
- [Suneeta Mall - WTH! Who killed my pod - Whodunit?](https://suneeta-mall.github.io/2021/03/14/wth-who-killed-my-pod.html)
- [Kubernetes - Validate node setup](https://kubernetes.io/docs/setup/best-practices/node-conformance/)
- [Komodor - Resolving OOMkilled on Kubernetes](https://komodor.com/learn/how-to-fix-oomkilled-exit-code-137/)
- [Komodor - Exit Codes in Docker and Kubernetes: The Complete Guide](https://komodor.com/learn/exit-codes-in-containers-and-kubernetes-the-complete-guide/)
- [Helm - Debugging Helm Templates](https://helm.sh/docs/chart_template_guide/debugging/)
- [GitHub - WARNING: Kubernetes configuration file is group/world-readable](https://github.com/helm/helm/issues/9115)
# Kubernetes Tools

![[k8s-general.png]]
## API Gateway / Ingress Controller / LB

- [AGIC - Application Gateway Ingress Controller](https://azure.github.io/application-gateway-kubernetes-ingress/): Possible for Azure Kubernetes Service (AKS) customers to leverage Azure's native Application Gateway L7 load-balancer to expose cloud software to the Internet. [Azure Article](https://learn.microsoft.com/en-us/azure/application-gateway/ingress-controller-overview)
- [AWS Load Balancer Controller](https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.10/): AWS Load Balancer Controller is a controller to help manage Elastic Load Balancers for a Kubernetes cluster.
- [Gateway API](https://gateway-api.sigs.k8s.io/): Gateway API is an official Kubernetes project focused on L4 and L7 routing in Kubernetes
- [Ingress-Nginx Controller](https://kubernetes.github.io/ingress-nginx/) : Documentation about Nginx ingress which use for delivery IN/OUT traffic for Kubernetes Cluster
- [Kong Ingress Controller](https://docs.konghq.com/kubernetes-ingress-controller/latest/):  Allows you to run Kong Gateway as a Kubernetes Ingress to handle inbound requests for a Kubernetes cluster.
- [kube-vip](https://kube-vip.io/): Provides Kubernetes clusters with a virtual IP and load balancer for both the control plane (for building a highly-available cluster) and Kubernetes Services of type `LoadBalancer` without relying on any external hardware or software.
- [MetalLB](https://metallb.io/): A load-balancer implementation for bare metal [Kubernetes](https://kubernetes.io/) clusters, using standard routing protocols.
- [Nginx Gateway Fabric](https://github.com/nginx/nginx-gateway-fabric): Provides an implementation for the Gateway API using NGINX as the data plane.
- [Traefik - ApiGateway](https://doc.traefik.io/traefik-hub/api-gateway/intro): A drop-in replacement for Traefik Proxy, it can do everything Traefik Proxy does, with additional capabilities and support out of the box.
- [Traefik - Ingress Controller](https://doc.traefik.io/traefik/providers/kubernetes-ingress/): A Kubernetes Ingress controller; that is to say, it manages access to cluster services by supporting the [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) specification.
## Autoscaling

- [Keda](https://keda.sh/docs/2.16/): Kubernetes Event-driven Autoscaling
- [Kubernetes Autoscaler](https://github.com/kubernetes/autoscaler): Autoscaling components for Kubernetes
## Backup

- [velero](https://github.com/vmware-tanzu/velero): Backup and migrate Kubernetes applications and their persistent volumes
- [trilio](https://docs.trilio.io/kubernetes): A data protection and backup solution specifically designed for Kubernetes environments
## Benchmark

- [kube-bench](https://github.com/aquasecurity/kube-bench): Checks whether Kubernetes is deployed according to security best practices as defined in the CIS Kubernetes Benchmark

## Chaos

- [chaos-mesh](https://github.com/chaos-mesh/chaos-mesh): A Chaos Engineering Platform for Kubernetes.
- [litmus](https://github.com/litmuschaos/litmus): Chaos Engineering Framework with cross-cloud support.
## Cloud Hosted

- [eksctl](https://github.com/eksctl-io/eksctl): The official CLI for Amazon EKS. [Website](https://eksctl.io/)
## Cluster Management

- [Crossplane](https://docs.crossplane.io/latest/): An open source Kubernetes extension that transforms your Kubernetes cluster into a **universal control plane**.
- [GlassKube](https://glasskube.dev/docs/) : An open-source Kubernetes package manager that simplifies package management for Kubernetes
- [kubeapps](https://github.com/vmware-tanzu/kubeapps): A web-based UI for deploying and managing applications in Kubernetes clusters
- [kubeshark](https://github.com/kubeshark/kubeshark): The API traffic analyzer for Kubernetes providing real-time K8s
- [lens](https://github.com/lensapp/lens): Lens - The way the world runs Kubernetes

## Configuration Management

- [Reloader](https://github.com/stakater/Reloader): A Kubernetes controller to watch changes in ConfigMap and Secrets and do rolling upgrades on Pods with their associated Deployment, StatefulSet, DaemonSet and DeploymentConfig
- [vals](https://github.com/helmfile/vals): Helm-like configuration values loader with support for various sources
## Development Environment

- [devspace](https://github.com/devspace-sh/devspace): The Fastest Developer Tool for Kubernetes
## Development Library

- [kooper](https://github.com/spotahome/kooper): A simple Go library to create Kubernetes operators and controllers.
- [kubebuilder](https://github.com/kubernetes-sigs/kubebuilder): SDK for building Kubernetes APIs using CRDs
## DNS and SSL

- [cert-manager](https://github.com/cert-manager/cert-manager): Automatically provision and manage TLS certificates in Kubernetes
- [external-dns](https://github.com/kubernetes-sigs/external-dns): Configure external DNS servers
## GitOps / Automation Deployment Platforms

- [argo-cd](https://argo-cd.readthedocs.io/en/stable/) :  A declarative, GitOps continuous delivery tool for Kubernetes.
	- [argo-rollouts](https://github.com/argoproj/argo-rollouts): Progressive Delivery for Kubernetes. Maintained by Argo
	- [argocd-image-updater](https://github.com/argoproj-labs/argocd-image-updater): Automatic container image update for Argo CD

- [fluxcd](https://fluxcd.io/flux/) : Tool for keeping Kubernetes clusters in sync with sources of configuration (like Git repositories), and automating updates to configuration when there is new code to deploy.
	- [flagger](https://flagger.app/): Progressive Delivery Operator for Kubernetes. Maintained by Flux

- [helm](https://helm.sh/): The package manager for Kubernetes
- [kargo](https://docs.kargo.io/): A next-generation continuous delivery and application lifecycle orchestration platform for Kubernetes
- [kustomize](https://github.com/kubernetes-sigs/kustomize): Customization of kubernetes YAML configurations
- [operator-lifecycle-manager](https://github.com/operator-framework/operator-lifecycle-manager): A management framework for extending Kubernetes with Operators
- [werf](https://github.com/werf/werf): A solution for implementing efficient and consistent software delivery to Kubernetes facilitating best practices.
## GPU Scheduler

- [AMD GPU Operator](https://github.com/ROCm/gpu-operator): Simplifies the deployment and management of AMD Instinct GPU accelerators within Kubernetes clusters. [Documentation](https://instinct.docs.amd.com/projects/gpu-operator/en/latest/)
- [HAMi](https://github.com/Project-HAMi/HAMi): Heterogeneous AI Computing Virtualization Middleware
- [Intel GPU Operator](https://intel.github.io/intel-device-plugins-for-kubernetes/cmd/gpu_plugin/README.html): Intel GPU plugin facilitates Kubernetes workload
- [NVIDIA GPU Operator](https://github.com/NVIDIA/gpu-operator): NVIDIA GPU Operator creates, configures, and manages GPUs in Kubernetes. [Documentation](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/overview.html)
## Identity and access management

- [Keycloak](https://github.com/keycloak/keycloak): an open-source identity and access management solution for modern applications and services, built on top of industry security standard protocols.
## Kubectl Tools Kit

- [krew](https://github.com/kubernetes-sigs/krew): 📦 Find and install kubectl plugins
- [kube-capacity](https://github.com/robscott/kube-capacity): A simple CLI that provides an overview of the resource requests, limits, and utilization in a Kubernetes cluster
- [kubectl-node-shell](https://github.com/kvaps/kubectl-node-shell): Exec into node via kubectl
- [kubectl-trace](https://github.com/iovisor/kubectl-trace):  Schedule bpftrace programs on your kubernetes cluster using the kubectl
- [kubectl-tree](https://github.com/ahmetb/kubectl-tree): kubectl plugin to browse Kubernetes object hierarchies as a tree 🎄
- [kubectl-view-allocations](https://github.com/davidB/kubectl-view-allocations): kubectl plugin to list allocations (cpu, memory, gpu,... X utilization, requested, limit, allocatable,...)
## Local Kubernetes Self-Hosted

- [K0s](https://docs.k0sproject.io/stable/): k0s is an open source, all-inclusive Kubernetes distribution, which is configured with all of the features needed to build a Kubernetes cluster.
- [K3s](https://docs.k3s.io/): Lightweight Kubernetes. Easy to install, half the memory, all in a binary of less than 100 MB.
- [Kind](https://kind.sigs.k8s.io/) : [kind](https://sigs.k8s.io/kind) is a tool for running local Kubernetes clusters using Docker container “nodes”.
- [Kubernetes Goat](https://madhuakula.com/kubernetes-goat/docs): An interactive Kubernetes security learning playground
- [Kubernetes Official solution](https://kubernetes.io/docs/setup/production-environment/tools/) : Installing Kubernetes with deployment tools. Such as: [kubespray](https://github.com/kubernetes-sigs/kubespray), [kubeadm](https://github.com/kubernetes/kubeadm)
- [MicroK8s](https://microk8s.io/docs): MicroK8s is a low-ops, minimal production Kubernetes.
- [minikube](https://minikube.sigs.k8s.io/docs/) : minikube quickly sets up a local Kubernetes cluster on macOS, Linux, and Windows
- [Talos Linux](https://www.talos.dev/) : The Kubernetes Operating System
	- [cluster-template](https://github.com/onedr0p/cluster-template): A template for deploying a Talos Kubernetes cluster including Flux for GitOps
## Monitoring

- [kube-state-metrics](https://github.com/kubernetes/kube-state-metrics): Add-on agent to generate and expose cluster-level metrics
- [metrics-server](https://github.com/kubernetes-sigs/metrics-server): Scalable and efficient source of container resource metrics for Kubernetes built-in autoscaling pipelines.
- [OpenSLO](https://github.com/OpenSLO/OpenSLO): Open specification for defining and expressing service level objectives (SLO)
- [prometheus-operator](https://prometheus-operator.dev/docs/getting-started/introduction/): A [Kubernetes Operator](https://github.com/cncf/tag-app-delivery/blob/main/operator-wg/whitepaper/Operator-WhitePaper_v1-0.md#foundation) that provides Kubernetes native deployment and management of [Prometheus](https://prometheus.io/) and related monitoring components.
## Operator & Chart

- [Artifacthub](https://artifacthub.io/) : Find, install and publish Cloud Native packages for Kubernetes
- [Elasticsearch (ECK) Operator](https://operatorhub.io/operator/elastic-cloud-eck), you can figure out configuration via [Customize Pods](https://www.elastic.co/guide/en/cloud-on-k8s/master/k8s-customize-pods.html#)
- [Kubeblocks](https://kubeblocks.io/docs/release-0.9/user_docs/overview/introduction):  an open-source Kubernetes operator for databases (more specifically, for stateful applications, including databases and middleware like message queues), enabling users to run and manage multiple types of databases on Kubernetes.
- [kubernetes-reflector](https://github.com/emberstack/kubernetes-reflector): Custom Kubernetes controller that can be used to replicate secrets, configmaps and certificates
- [MongoDB Community Kubernetes Operator](https://github.com/mongodb/mongodb-kubernetes-operator), you can take the look some `crd`, and configuration with `github` link like [CRD](https://github.com/mongodb/mongodb-kubernetes-operator/blob/master/config/crd/bases/mongodbcommunity.mongodb.com_mongodbcommunity.yaml) and [Samples](https://github.com/mongodb/mongodb-kubernetes-operator/tree/master/config/samples)
- [nfs-subdir-external-provisioner](https://github.com/kubernetes-sigs/nfs-subdir-external-provisioner): Dynamic sub-dir volume provisioner on a remote NFS server.
- [OperatorHub](https://operatorhub.io/):  Home for the Kubernetes community to share Operators
- [RabbitMQ-cluster-operator](https://operatorhub.io/operator/rabbitmq-cluster-operator), read more about that via [source code](https://github.com/rabbitmq/cluster-operator)
- [Strimzi](https://strimzi.io/docs/operators/latest/overview): Strimzi simplifies the process of running [Apache Kafka](https://kafka.apache.org/) within a Kubernetes cluster
## Policy Controller

- [Kyverno](https://kyverno.io/) : Kubernetes Native Policy Management
- [OPA Gatekeeper](https://open-policy-agent.github.io/gatekeeper/website/) : A customizable cloud native policy controller that helps enforce policies and strengthen governance
## Resources Orchestrator

- [kro](https://github.com/awslabs/kro): Kube Resource Orchestrator. [Documentation](https://kro.run/docs/overview)
## Secret Management

- [external-secrets](https://github.com/external-secrets/external-secrets): External Secrets Operator reads information from a third-party service like AWS Secrets Manager and automatically injects the values as Kubernetes Secrets.
- [vault-secrets-operator](https://github.com/ricoberger/vault-secrets-operator): Create Kubernetes secrets from Vault for a secure GitOps based workflow.
## Serverless Hosted

- [knative](https://github.com/knative/docs):  An Open-Source Enterprise-level solution to build Serverless and Event Driven Applications. [Documentation](https://knative.dev/docs/concepts/)
## Service Discovery

- [consul](https://developer.hashicorp.com/consul/docs?product_intent=consul):  A multi-networking tool that offers a fully-featured service mesh solution
- [coredns](https://github.com/coredns/coredns): CoreDNS is a DNS server that chains plugin
## Service Mesh

- [Istio](https://istio.io/): Service Mesh. Simplified. Easily build cloud native workloads securely and reliably with `Istio`, with or without sidecars.
- [linkerd](https://linkerd.io/2.15/overview/):  A _service mesh_ for Kubernetes. It makes running services easier and safer by giving you runtime debugging, observability, reliability, and security—all without requiring any changes to your code.
## Service Proxy

- [envoy](https://www.envoyproxy.io/docs/envoy/v1.31.0/) : Envoy is an L7 proxy and communication bus designed for large modern service oriented architectures
- [kube-proxy](https://github.com/kubernetes/kube-proxy): The Kubernetes network proxy runs on each node
## Storage Platforms

- [csi-driver-nfs](https://github.com/kubernetes-csi/csi-driver-nfs): This driver allows Kubernetes to access NFS server on Linux node
- [Longhorn](https://longhorn.io/): Cloud native distributed block storage for Kubernetes
- [MinIO](https://min.io/docs/minio/kubernetes/upstream/index.html): MinIO Object Storage for Kubernetes
- [Rook](https://rook.io/docs/rook/latest-release/Getting-Started/intro/): An open source cloud-native storage orchestrator, providing the platform, framework, and support for Ceph storage to natively integrate with cloud-native environments
## Threat Intelligence

- [Falco](https://falco.org/): Detect security threats in real time
- [kubescape](https://github.com/kubescape/kubescape): Kubescape is an open-source Kubernetes security platform for your IDE, CI/CD pipelines, and clusters
- [openappsec](https://github.com/openappsec/openappsec): A machine learning security engine that preemptively and automatically prevents threats against Web Application & APIs.
- [sysdig](https://github.com/draios/sysdig): Linux system exploration and troubleshooting tool with first class support for containers
- [teleport](https://github.com/gravitational/teleport): The easiest, and most secure way to access and protect all of your infrastructure.
- [Tetragon](https://tetragon.io/docs/) : Cilium Tetragon component enables powerful realtime, eBPF-based Security Observability and Runtime Enforcement.
## Utilities

- [Instance calculator](https://learnk8s.io/kubernetes-instance-calculator) : Estimate and find the number of max workload can apply for instance
- [botkube](https://github.com/kubeshop/botkube): An app that helps you monitor your Kubernetes cluster, debug critical deployments & gives recommendations for standard practices
- [silver-surfer](https://github.com/devtron-labs/silver-surfer): Kubernetes objects api-version compatibility checker and provides migration path for K8s objects and prepare it for cluster upgrades
## Validation

- [kubeconform](https://github.com/yannh/kubeconform): A FAST Kubernetes manifests validator, with support for Custom Resources!

## Virtualization

- [kubevirt](https://kubevirt.io/): Provides a unified development platform where developers can build, modify, and deploy applications residing in both Application Containers as well as Virtual Machines in a common, shared environment.