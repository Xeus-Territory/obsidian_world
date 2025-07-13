---
title: Awesome Kubernetes
tags:
  - awesome
  - kubewekend
  - collections
  - devops
---
>[!purpose]
>This page is created for purpose store relation to helpful articles, make a some reference link when you can check and understand more about K8s (Kubernetes) and awesome things with this orchestration, but also learning and exploring more about worldwide containerization 🔥

# Kubernetes
![[icon-kubernetes.png|center]]

## Articles / Documentation / Practicing

### Azure Kubernetes Service (AKS)

- [Azure - Scaling options for applications in Azure Kubernetes Service (AKS)](https://learn.microsoft.com/en-us/azure/aks/concepts-scale)
- [Azure - Core Kubernetes concepts for Azure Kubernetes Service](https://learn.microsoft.com/en-us/azure/aks/concepts-clusters-workloads)
- [Azure - Supported Kubernetes versions in Azure Kubernetes Service (AKS)](https://learn.microsoft.com/en-us/azure/aks/supported-kubernetes-versions?tabs=azure-cli)
- [AKS DevSecOps Workshop](https://azure.github.io/AKS-DevSecOps-Workshop/) 🌟 **(Recommended)**
- [Azure - Best practices for basic scheduler features in Azure Kubernetes Service (AKS)](https://learn.microsoft.com/en-us/azure/aks/operator-best-practices-scheduler)
- [Medium - Optimize Your Kubernetes Resources with Azure IAM: Managed vs. Workload Identity](https://itnext.io/simplify-secure-your-azure-resources-managed-identity-vs-workload-identity-fe49d133fc03)
### Container Runtime (CRI)

- [Kubernetes - Container Runtime Interface (CRI)](https://kubernetes.io/docs/concepts/architecture/cri/)
### Do It Yourself (DIYs)

- [Medium - Creating a Custom Scheduler in Kubernetes: A Practical Guide](https://overcast.blog/creating-a-custom-scheduler-in-kubernetes-a-practical-guide-2d9f9254f3b5) 🌟 **(Recommended)**
- [Medium - HomeLab Kubernetes Cluster Setup](https://cavecafe.medium.com/setup-homelab-kubernetes-cluster-cfc3acd4dca5)
- [Medium - Kubernetes, but locally.](https://medium.com/@mosesmbadi/kubernetes-but-locally-aa5fbd671763) 🌟 **(Recommended)**
- [Kubecost - Monitoring NVIDIA GPU Usage in Kubernetes with Prometheus](https://blog.kubecost.com/blog/nvidia-gpu-usage/)
- [Last9 - How to Monitor Ephemeral Storage Metrics in Kubernetes](https://last9.io/blog/monitor-ephemeral-storage-metrics-in-kubernetes/)
- [Ingress Nginx Controller - Basic Authentication](https://kubernetes.github.io/ingress-nginx/examples/auth/basic/)
- [Technotim - Mirror your Kubernetes configs, secrets, and resources to other namespaces](https://technotim.live/posts/k8s-reflector/)
- [Medium - Running a “stateless” email server in Kubernetes using Mailu](https://medium.com/gitconnected/running-a-stateless-email-server-in-kubernetes-using-mailu-9c1ebd8003e9)
- [Medium - Configure Hashicorp's Vault for Kubernetes Auth](https://docs.armory.io/continuous-deployment/armory-admin/secrets/vault-k8s-configuration/)
- [DAOCloud - ArgoCD High Availability Solution](https://github.com/DaoCloud/DaoCloud-docs/blob/main/docs/en/docs/amamba/quickstart/argo-cd-HA.md)
- [DigitalOcean - How To Set Up an Elasticsearch, Fluentd and Kibana (EFK) Logging Stack on Kubernetes](https://www.digitalocean.com/community/tutorials/how-to-set-up-an-elasticsearch-fluentd-and-kibana-efk-logging-stack-on-kubernetes) 🌟 **(Recommended)**
### eBPF

- [Medium - eBPF Maps State Synchronization across Multi-Node Kubernetes Cluster](https://medium.com/gitconnected/ebpf-maps-state-synchronization-across-multi-node-kubernetes-cluster-d0c075810fa7)

### Elastic Kubernetes Service (EKS)

- [Medium - Kubernetes — EKS — Upgrade process best practices (on AWS)](https://medium.com/atmosly/kubernetes-eks-upgrade-process-best-practices-on-aws-aed30e16bac1)
- [Medium - EKS Cluster Network Architecture for Worker Nodes](https://keetmalin.medium.com/eks-cluster-network-architecture-for-worker-nodes-635e067c8c2a)
- [Medium - Bringing Amazon EKS Hybrid Nodes to life with Palette](https://medium.com/itnext/bringing-amazon-eks-hybrid-nodes-to-life-with-palette-584734449503)
- [Medium - Kubernetes: a single AWS Load Balancer for different Kubernetes Ingresses](https://itnext.io/kubernetes-a-single-aws-load-balancer-for-different-kubernetes-ingresses-c8f68c75b7d8)
- [Medium - Configuring Production-Ready EKS Clusters with Terraform and GitHub Actions](https://medium.com/stackademic/configuring-production-ready-eks-clusters-with-terraform-and-github-actions-c046e8d44865)
- [AWS - EKS Best Practices Guides](https://aws.github.io/aws-eks-best-practices/)
- [AWS - Kubernetes concepts for EKS](https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-concepts.html)
- [AWS - the Kubernetes version lifecycle on EKS](https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-versions.html)
- [EKS Workshop - New version](https://www.eksworkshop.com/) 🌟 **(Recommended)**
- [EKS Workshop - Old Version](https://archive.eksworkshop.com/) 🌟 **(Recommended)**
- [AWS EKS Workshop - Configure Cluster Autoscaler (CA)](https://archive.eksworkshop.com/beginner/080_scaling/deploy_ca/#deploy-the-cluster-autoscaler-ca)
- [GitHub - Cluster Autoscaler on AWS](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler/cloudprovider/aws)
- [Medium - Mastering Horizontal Pod Autoscaling (HPA) in Amazon EKS Using Helm, Terraform, and ArgoCD: A Complete Guide with CI/CD](https://ramchandra-vadranam.medium.com/mastering-horizontal-pod-autoscaling-hpa-in-amazon-eks-using-helm-terraform-and-argocd-a-2b551720f1ad)
- [AWS - Learn how EKS Pod Identity grants pods access to AWS services](https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html)
- [AWS - EKS IAM roles for service accounts](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html)
- [Medium - Why AWS EKS Pod Identity is a Better Fit Than IRSA for Your Kubernetes Needs?](https://aws.plainenglish.io/why-aws-eks-pod-identity-is-a-better-fit-than-irsa-for-your-kubernetes-needs-1be05515f970) 🌟 **(Recommended)**
- [Medium - Simplify Kubernetes Storage: Mounting EFS to EKS Like a Pro](https://medium.com/kotaicode/simplify-kubernetes-storage-mounting-efs-to-eks-like-a-pro-655e13f72041)
- [AWS Docs - Grant IAM users access to Kubernetes with EKS access entries](https://docs.aws.amazon.com/eks/latest/userguide/access-entries.html)
- [AWS Blogs - Proactive autoscaling of Kubernetes workloads with KEDA using metrics ingested into Amazon Managed Service for Prometheus](https://aws.amazon.com/blogs/mt/proactive-autoscaling-kubernetes-workloads-keda-metrics-ingested-into-aws-amp/)
- [AWS Blogs - A deep dive into simplified Amazon EKS access management controls](https://aws.amazon.com/vi/blogs/containers/a-deep-dive-into-simplified-amazon-eks-access-management-controls/)
- [Medium - Mastering Ingress Strategies for AWS EKS: ALB vs. Istio vs. NGINX](https://ramchandra-vadranam.medium.com/mastering-ingress-strategies-for-aws-eks-alb-vs-istio-vs-nginx-34a7bd4ce152) 🌟 **(Recommended)**
### Fundamental

- [Medium - Kubernetes Scheduling: Understanding the Math Behind the Magic](https://romanglushach.medium.com/kubernetes-scheduling-understanding-the-math-behind-the-magic-2305b57d45b1) 🌟 **(Recommended)**
- [Medium - Kubernetes Networking: Load Balancing Techniques and Algorithms](https://romanglushach.medium.com/kubernetes-networking-load-balancing-techniques-and-algorithms-5da85c5c7253) 🌟 **(Recommended)**
- [ArmoSecr - etcd in Kubernetes](https://www.armosec.io/glossary/etcd-kubernetes/)
- [Densify - Kubernetes Service Discovery](https://www.densify.com/kubernetes-autoscaling/kubernetes-service-discovery/)
- [Dev.io - Basic Guide to Kubernetes Service Discovery](https://dev.to/nomzykush/basic-guide-to-kubernetes-service-discovery-dmd)
- [KodeKloud - Kube-Proxy: What Is It and How It Works](https://kodekloud.com/blog/kube-proxy/)
- [Kubernetes - Controllers](https://kubernetes.io/docs/concepts/architecture/controller/)
- [Kubernetes - Extending Kubernetes](https://kubernetes.io/docs/concepts/extend-kubernetes/)
- [Kubernetes - Ingress Controllers](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/)
- [Kubernetes - Scheduler Configuration](https://kubernetes.io/docs/reference/scheduling/config/) 🌟 **(Recommended)**
- [Kubernetes - Scheduling, Preemption and Eviction](https://kubernetes.io/docs/concepts/scheduling-eviction/)
- [Kubernetes - The Kubernetes API](https://kubernetes.io/docs/concepts/overview/kubernetes-api/)
- [Kubernetes - Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [Medium - Top 10 Kubernetes Pod Concepts That Confuse Beginners](https://medium.com/frontend-canteen/top-10-kubernetes-pod-concepts-that-confuse-beginners-8c0954021f3f)
- [Redhat - Top 10 must-know Kubernetes design patterns](https://developers.redhat.com/blog/2020/05/11/top-10-must-know-kubernetes-design-patterns) 🌟 **(Recommended)**
### General

- [Medium - 7 Underrated Kubernetes Projects: Elevate Your Lab Playground!](https://medium.com/@ebenamor/7-underrated-kubernetes-projects-elevate-your-lab-playground-ac7f47cba347)
- [Kubernetes -  Documentation](https://kubernetes.io/docs/home/)
### Hardware and Resources

- [Medium - Why does my 2vCPU application run faster in a VM than in a container? (Content of the year 2024)](https://hwchiu.medium.com/why-does-my-2vcpu-application-run-faster-in-a-vm-than-in-a-container-6438ffaba245) 🌟 **(Recommended)**
- [Medium - Why and Why Not of Enabling Swap in Kubernetes](https://hwchiu.medium.com/why-and-why-not-of-enabling-swap-in-kubernetes-08c094a8d427)

### Networking (CNI)

- [Medium - Deciphering the Kubernetes Networking Maze: Navigating Load-Balance, BGP, IPVS and Beyond](https://medium.com/itnext/deciphering-the-kubernetes-networking-maze-navigating-load-balance-bgp-ipvs-and-beyond-7123ef428572) 🌟 **(Recommended)**
- [Medium - Kubernetes Traffic Optimization: The Role of Topology-Aware Routing](https://faun.pub/kubernetes-traffic-optimization-the-role-of-topology-aware-routing-c950e25f3bf1) 🌟 **(Recommended)**
- [Alibaba - Kubernetes CNIs and CNI Plug-ins](https://www.alibabacloud.com/blog/getting-started-with-kubernetes-%7C-kubernetes-cnis-and-cni-plug-ins_596330)
- [Medium - Kubernetes Networking in the Simplest Way 🚀](https://aws.plainenglish.io/kubernetes-networking-in-the-simplest-way-d84e3b7ed940)
- [Ranchers - Container Network Interface (CNI) Providers](https://ranchermanager.docs.rancher.com/faq/container-network-interface-providers) 🌟 **(Recommended)**
- [Blog - A Deep Dive into CoreDNS with Rancher: Best Practices and Troubleshooting](https://support.tools/coredns-and-rancher/) 🌟 **(Recommended)**
### Storage (CSI)

- [Medium - 7 Best Open Source Storage Solutions for Kubernetes](https://blog.devops.dev/7-best-open-source-storage-solutions-for-kubernetes-0da8b51efe8d)
- [Blog - Installing the NFS CSI Driver on a Kubernetes cluster to allow for dynamic provisioning of Persistent Volumes](https://rudimartinsen.com/2024/01/09/nfs-csi-driver-kubernetes/)
- [Medium - Implementing ROOK Ceph Storage solution on Virtual kubernetes clusters](https://purushothamkdr453.medium.com/implementing-rook-ceph-storage-solution-on-virtual-kubernetes-clusters-f9b7abfbcb56) 🌟 **(Recommended)**
- [Medium - Kubernetes Storage Performance Comparison Rook Ceph and Piraeus Datastore (LINSTOR)](https://medium.com/@gjanders03/kubernetes-storage-performance-comparison-rook-ceph-and-piraeus-datastore-linstor-e9bc2859a8f0)
- [Kubernetes - Kubernetes CSI Documentation](https://kubernetes-csi.github.io/docs/)
- [Medium - How to Setup Dynamic NFS Provisioning in a Kubernetes Cluster](https://hbayraktar.medium.com/how-to-setup-dynamic-nfs-provisioning-in-a-kubernetes-cluster-cbf433b7de29)
- [GitHub - Deploying NFS Server in Kubernetes](https://github.com/appscode/third-party-tools/blob/master/storage/nfs/README.md)
### Story and Question

- [Medium - Database in Kubernetes: Is that a good idea?](https://medium.com/@fengruohang/database-in-kubernetes-is-that-a-good-idea-daf5775b5c1f)
- [Medium - Why NGINX IngressController Isn’t the Best Choice for Production Workloads](https://medium.com/@talhakhalid101/why-nginx-ingresscontroller-isnt-the-best-choice-for-production-workloads-dfc641da3e2c) 🌟 **(Recommended)**
- [Internet - Pain(less?) NGINX Ingress](https://danielfm.me/post/painless-nginx-ingress/) 🌟 **(Recommended)**
- [Medium - Why Some Companies are Moving Away from Kubernetes for Development Environments in 2025](https://medium.com/@PlanB./why-some-companies-are-moving-away-from-kubernetes-for-development-environments-in-2025-1f44b4fd4f3f)
- [Medium - My Top 50 Kubernetes Notes for DevOps Engineers — Detailed Q&A](https://medium.com/@thecloudarchitect/my-top-50-kubernetes-notes-for-devops-engineers-detailed-q-a-9d9c375c0076)
### Tips for Configuration

- [Medium - 11 Kubernetes Deployment Configs You Should Know in 2024](https://medium.com/overcast-blog/11-kubernetes-deployment-configs-you-should-know-in-2024-1126740926f0)
- [Medium - 15 Best Kubernetes Cost Optimization Tools for 2024](https://overcast.blog/15-best-kubernetes-cost-optimization-tools-for-2024-2e131a7cbe7a)
- [Medium - 10 Ways for Kubernetes Declarative Configuration Management](https://medium.com/stackademic/10-ways-for-kubernetes-declarative-configuration-management-3538673fd0b5)
- [Cast.ai - Custom Kube-Scheduler: Why And How to Set it Up in Kubernetes](https://cast.ai/blog/custom-kube-scheduler-why-and-how-to-set-it-up-in-kubernetes/) 🌟 **(Recommended)**
- [Medium - 24 Kubernetes Masters’ Configurations](https://overcast.blog/24-kubernetes-mastersconfigurations-29235c65b337)
- [Spot - 8 Kubernetes Deployment Strategies: Roll Out Like the Pros](https://spot.io/resources/kubernetes-autoscaling/5-kubernetes-deployment-strategies-roll-out-like-the-pros/) 🌟 **(Recommended)**
- [Medium - Zero-Downtime Deployments with Kubernetes](https://blog.devgenius.io/zero-downtime-deployments-with-kubernetes-a2d3200d207f)
### Tools

- [Medium - 10 Essential Kubernetes Tools You Didn’t Know You Needed](https://medium.com/itnext/10-essential-kubernetes-tools-you-didnt-know-you-needed-06954251d845)
- [Medium - Lightweight CI/CD Solutions for Kubernetes: Going Beyond Keel, Flux, and ArgoCD](https://medium.com/@PlanB./lightweight-ci-cd-solutions-for-kubernetes-going-beyond-keel-flux-and-argocd-8b0b923e644c) 🌟 **(Recommended)**
- [Medium - 12 Tools that will make Kubernetes management easier in 2024](https://medium.com/faun/12-tools-that-will-make-kubernetes-management-easier-in-2024-b7c349dc0eaa) 🌟 **(Recommended)**
- [Medium - 2 Powerful AI and Database Operators to Extend your K8s Cluster](https://onairotich.medium.com/2-powerful-ai-and-database-operators-to-extend-your-k8s-cluster-9c517e83b368)
- [Medium - VictoriaLogs: an overview, run in Kubernetes, LogsQL, and Grafana](https://itnext.io/victorialogs-an-overview-run-in-kubernetes-logsql-and-grafana-88e0934a5ccd)
- [Medium - The guide to kubectl I never had](https://medium.com/@jake.page91/the-guide-to-kubectl-i-never-had-3874cc6074ff)
- [Vault - Kubernetes auth method](https://developer.hashicorp.com/vault/docs/auth/kubernetes#kubernetes-auth-method)
- [ArgoCD - High Availability](https://argo-cd.readthedocs.io/en/stable/operator-manual/high_availability/) 🌟 **(Recommended)**
### Troubleshoot

- [StackOverFlow - How can I keep a container running on Kubernetes?](https://stackoverflow.com/questions/31870222/how-can-i-keep-a-container-running-on-kubernetes) 🌟 **(Recommended)**
- [Kubernetes - Debugging Kubernetes nodes with crictl](https://kubernetes.io/docs/tasks/debug/debug-cluster/crictl/#before-you-begin)
- [Medium - Do Kubernetes Pods Really Get Evicted Due to CPU Pressure?](https://medium.com/overcast-blog/do-pods-really-get-evicted-due-to-cpu-pressure-2b27274a670c)
- [StackOverFlow - Why AKS nodes shows less amount of memory as allocatable where its actual memory is still available](https://stackoverflow.com/questions/68521392/why-aks-nodes-shows-less-amount-of-memory-as-allocatable-where-its-actual-memory) 🌟 **(Recommended)**
- [StackOverFlow - Constantly getting Crashloopbackoff error in Kubernetes PODS generally in MongoDB pods](https://stackoverflow.com/questions/63142792/constantly-getting-crashloopbackoff-error-in-kubernetes-pods-generally-in-mongod)
- [Suneeta Mall - WTH! Who killed my pod - Whodunit?](https://suneeta-mall.github.io/2021/03/14/wth-who-killed-my-pod.html)
- [Kubernetes - Validate node setup](https://kubernetes.io/docs/setup/best-practices/node-conformance/)
- [Komodor - Resolving OOMkilled on Kubernetes](https://komodor.com/learn/how-to-fix-oomkilled-exit-code-137/)
- [Komodor - Exit Codes in Docker and Kubernetes: The Complete Guide](https://komodor.com/learn/exit-codes-in-containers-and-kubernetes-the-complete-guide/) 🌟 **(Recommended)**
- [Helm - Debugging Helm Templates](https://helm.sh/docs/chart_template_guide/debugging/)
- [GitHub - WARNING: Kubernetes configuration file is group/world-readable](https://github.com/helm/helm/issues/9115)
- [Medium - Tracking Down “Invisible” OOM Kills in Kubernetes](https://medium.com/@reefland/tracking-down-invisible-oom-kills-in-kubernetes-192a3de33a60) 🌟 **(Recommended)**
- [GitHub - Fluentd in_tail plugin randomly fails with "too many open files"](https://github.com/fluent/fluent-bit/issues/1777#issuecomment-1494952647) 🌟 **(Recommended)**
- [Blog - Pod DNS Problems](https://blog.differentpla.net/blog/2022/02/25/pod-dns-problems/) 🌟 **(Recommended)**
## Awesome repositories

- [awesome-k8s-resources](https://github.com/tomhuang12/awesome-k8s-resources) : A curated list of awesome Kubernetes tools and resources 🌟 **(Recommended)**
- [awesome-krew-plugin](https://krew.sigs.k8s.io/plugins/): A list of Plugin which used by kubectl
- [awesome-kubernetes](https://ramitsurana.github.io/awesome-kubernetes/) : A curated list for awesome kubernetes sources 🚢🎉
- [kubebuilder](https://book.kubebuilder.io/introduction): Kubebuilder - SDK for building Kubernetes APIs using CRDs
- [Kubernetes Cluster API](https://cluster-api.sigs.k8s.io/) : About cluster API 🌟 **(Recommended)**
- [Kubernetes/community](https://github.com/kubernetes/community) : Kubernetes community content
- [Kubernetes CSI Drivers](https://kubernetes-csi.github.io/docs/drivers.html): The following are a set of CSI driver which can be used with Kubernetes 🌟 **(Recommended)**
- [Kubernetes/enhancements](https://github.com/kubernetes/enhancements): Enhancements tracking repo for Kubernetes
- [Kubernetes Schedule Plugins](https://scheduler-plugins.sigs.k8s.io/): Repository for out-of-tree scheduler plugins based on the [scheduler framework](https://kubernetes.io/docs/concepts/scheduling-eviction/scheduling-framework/) 🌟 **(Recommended)**
- [KubeSec Diagram](https://kubesec-diagram.github.io/): a diagram made to better understand and get an overview of kubernetes security 🌟 **(Recommended)**
- [Kubetools](https://collabnix.github.io/kubetools/): A Curated List of Kubernetes Tools 🌟 **(Recommended)**
## Blogs

- [Kubernetes - Blog](https://kubernetes.io/blog/) 🌟 **(Recommended)**
- [Nubenetes](https://nubenetes.com/) : Awesome Kubernetes & Cloud 🌟 **(Recommended)**
- [Matthew Mattox Personal Tech Blog](https://support.tools/): Really Cool guys write about Kubernetes, especially RKE2 with deeply debug and configuration 🌟 **(Recommended)**
## Certificate & Practice

- [certified-kubernetes-administrator-course](https://github.com/kodekloudhub/certified-kubernetes-administrator-course) : Kodecloud Certified Kubernetes Administrator - CKA Course
- [certified-kubernetes-security-specialist-cks-course](https://github.com/kodekloudhub/certified-kubernetes-security-specialist-cks-course) : Kodecloud Notes from the Certified Kubernetes Security Specialist Course on KodeKloud
- [killer.sh - Linux Foundation Exam Simulators](https://killer.sh/) 🌟 **(Recommended)**
- [kube4sure - The Kubernetes Exam Simulator](https://www.kube4sure.com/)
- [learnk8s - Kubernetes training for engineer](https://learnk8s.io/) 🌟 **(Recommended)**
## Operator & Chart

- [Artifacthub](https://artifacthub.io/) : Find, install and publish Cloud Native packages for Kubernetes 🌟 **(Recommended)**
- [Bitami Hem Chart](https://github.com/bitnami/charts): Popular applications, provided by [Bitnami](https://bitnami.com/), ready to launch on Kubernetes 🌟 **(Recommended)**
- [BJW Helm Chart](https://github.com/bjw-s-labs/helm-charts): Helm template for common application
- [Knative](https://github.com/knative/docs):  An Open-Source Enterprise-level solution to build Serverless and Event Driven Applications. [Documentation](https://knative.dev/docs/concepts/)
- [Kubeblocks](https://kubeblocks.io/docs/release-0.9/user_docs/overview/introduction):  an open-source Kubernetes operator for databases (more specifically, for stateful applications, including databases and middleware like message queues), enabling users to run and manage multiple types of databases on Kubernetes.
- [MongoDB Community Kubernetes Operator](https://github.com/mongodb/mongodb-kubernetes-operator), you can take the look some `crd`, and configuration with `github` link like [CRD](https://github.com/mongodb/mongodb-kubernetes-operator/blob/master/config/crd/bases/mongodbcommunity.mongodb.com_mongodbcommunity.yaml) and [Samples](https://github.com/mongodb/mongodb-kubernetes-operator/tree/master/config/samples)
- [mongodb-kubernetes-operator](https://github.com/mongodb/mongodb-kubernetes-operator) : MongoDB Community Kubernetes Operator
- [OperatorHub](https://operatorhub.io/):  Home for the Kubernetes community to share Operators 🌟 **(Recommended)**
- [Poly Helm Chart](https://github.com/haonguyen1915/helm-charts): Self-define Helm chart for AI purpose application
- [Rancher Helm Chart](https://github.com/rancher/partner-charts/tree/main-source): A catalog based on applications from independent software vendors (ISVs). Most of them are SUSE Partners
- [Strimzi](https://strimzi.io/docs/operators/latest/overview): Strimzi simplifies the process of running [Apache Kafka](https://kafka.apache.org/) within a Kubernetes cluster
## Organizations

- [ApeCloud](https://github.com/apecloud): The community who focus on designing architecture inside Cloud Platform, especially Kubernetes. Author of [Kubeblocks](https://kubeblocks.io/docs/release-0.9/user_docs/overview/introduction)
- [AppsCode](https://github.com/appscode): Kubernetes-native Data Platform 🌟 **(Recommended)**
- [Carvel](https://github.com/carvel-dev): a set of reliable, single-purpose, composable tools that aid in your application building, configuration, and deployment to Kubernetes. Author of [ytt](https://github.com/carvel-dev/ytt), [kapp-controller](https://github.com/carvel-dev/kapp-controller)
- [Devtron Inc](https://github.com/devtron-labs): Software Delivery Workflow For Kubernetes 🌟 **(Recommended)**
- [DaoCloud](https://github.com/DaoCloud): An innovation leader in the cloud-native field 🌟 **(Recommended)**
- [Kubecost](https://github.com/kubecost): Organization of Kubecost - a monitoring application which provides real-time cost visibility and insights for teams using Kubernetes, helping you continuously reduce your cloud costs
- [Kubeflow](https://github.com/kubeflow/):  An open, community driven project to make it easy to deploy and manage an ML stack on Kubernetes
- [Kubernetes CSI](https://github.com/kubernetes-csi): Kubernetes specific Container-Storage-Interface (CSI) components 🌟 **(Recommended)**
- [Kubernetes](https://github.com/kubernetes): Production-Grade Container Scheduling and Management 🌟 **(Recommended)**
- [kubernetes-sigs](https://github.com/kubernetes-sigs) : Org for Kubernetes SIG-related work 🌟 **(Recommended)**
- [KubeWharf](https://github.com/kubewharf): Developer community legit insane tools for Kubernetes
- [Medik8s](https://github.com/medik8s): Medik8s (pronounced medicates) aims for automatic detection and recovery of unhealthy k8s nodes
- [Polyaxon](https://github.com/polyaxon): A platform for reproducible and scalable machine learning and deep learning
- [The Helm Project](https://github.com/helm): The package manager for Kubernetes 🌟 **(Recommended)**
- [VMware Tanzu](https://github.com/vmware-tanzu): Cloud native open source from VMware, almost for Kubernetes, Author of [velero](https://github.com/vmware-tanzu/velero)
## Topics

- [Helm](https://github.com/topics/helm)
- [K8s](https://github.com/topics/k8s)
- [Kubernetes](https://github.com/topics/kubernetes)
# Kubernetes Tools

![[k8s-general.png]]
## API Gateway / Ingress Controller / LB

- [AGIC - Application Gateway Ingress Controller](https://azure.github.io/application-gateway-kubernetes-ingress/): Possible for Azure Kubernetes Service (AKS) customers to leverage Azure's native Application Gateway L7 load-balancer to expose cloud software to the Internet. [Azure Article](https://learn.microsoft.com/en-us/azure/application-gateway/ingress-controller-overview)
- [AWS Load Balancer Controller](https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.10/): AWS Load Balancer Controller is a controller to help manage Elastic Load Balancers for a Kubernetes cluster 🌟 **(Recommended)**
- [Gateway API](https://gateway-api.sigs.k8s.io/): Gateway API is an official Kubernetes project focused on L4 and L7 routing in Kubernetes
- [Ingress-Nginx Controller](https://kubernetes.github.io/ingress-nginx/) : Documentation about Nginx ingress which use for delivery IN/OUT traffic for Kubernetes Cluster 🌟 **(Recommended)**
- [Kong Ingress Controller](https://docs.konghq.com/kubernetes-ingress-controller/latest/):  Allows you to run Kong Gateway as a Kubernetes Ingress to handle inbound requests for a Kubernetes cluster 🌟 **(Recommended)**
- [kube-vip](https://kube-vip.io/): Provides Kubernetes clusters with a virtual IP and load balancer for both the control plane (for building a highly-available cluster) and Kubernetes Services of type `LoadBalancer` without relying on any external hardware or software.
- [MetalLB](https://metallb.io/): A load-balancer implementation for bare metal [Kubernetes](https://kubernetes.io/) clusters, using standard routing protocols.
- [Nginx Gateway Fabric](https://github.com/nginx/nginx-gateway-fabric): Provides an implementation for the Gateway API using NGINX as the data plane.
- [Traefik - ApiGateway](https://doc.traefik.io/traefik-hub/api-gateway/intro): A drop-in replacement for Traefik Proxy, it can do everything Traefik Proxy does, with additional capabilities and support out of the box.
- [Traefik - Ingress Controller](https://doc.traefik.io/traefik/providers/kubernetes-ingress/): A Kubernetes Ingress controller; that is to say, it manages access to cluster services by supporting the [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) specification.
## Autoscaling

- [Keda](https://keda.sh/docs/2.16/): Kubernetes Event-driven Autoscaling
- [Kubernetes Autoscaler](https://github.com/kubernetes/autoscaler): Autoscaling components for Kubernetes 🌟 **(Recommended)**

## Agents

- [botkube](https://github.com/kubeshop/botkube): An app that helps you monitor your Kubernetes cluster, debug critical deployments & gives recommendations for standard practices 🌟 **(Recommended)**
- [kagent](https://github.com/kagent-dev/kagent): A Kubernetes native framework for building AI agents 🌟 **(Recommended)**
## Backup

- [velero](https://github.com/vmware-tanzu/velero): Backup and migrate Kubernetes applications and their persistent volumes
- [trilio](https://docs.trilio.io/kubernetes): A data protection and backup solution specifically designed for Kubernetes environments
## Benchmark and Validation

- [kube-bench](https://github.com/aquasecurity/kube-bench): Checks whether Kubernetes is deployed according to security best practices as defined in the CIS Kubernetes Benchmark
- [kubeconform](https://github.com/yannh/kubeconform): A FAST Kubernetes manifests validator, with support for Custom Resources!
- [Instance calculator](https://learnk8s.io/kubernetes-instance-calculator) : Estimate and find the number of max workload can apply for instance
- [silver-surfer](https://github.com/devtron-labs/silver-surfer): Kubernetes objects api-version compatibility checker and provides migration path for K8s objects and prepare it for cluster upgrades
## Chaos

- [chaos-mesh](https://github.com/chaos-mesh/chaos-mesh): A Chaos Engineering Platform for Kubernetes.
- [litmus](https://github.com/litmuschaos/litmus): Chaos Engineering Framework with cross-cloud support.
## Cluster Management

- [Crossplane](https://docs.crossplane.io/latest/): An open source Kubernetes extension that transforms your Kubernetes cluster into a **universal control plane**.
- [GlassKube](https://glasskube.dev/docs/) : An open-source Kubernetes package manager that simplifies package management for Kubernetes
- [kubeapps](https://github.com/vmware-tanzu/kubeapps): A web-based UI for deploying and managing applications in Kubernetes clusters
- [kubeshark](https://github.com/kubeshark/kubeshark): The API traffic analyzer for Kubernetes providing real-time K8s 🌟 **(Recommended)**
- [lens](https://github.com/lensapp/lens): Lens - The way the world runs Kubernetes 🌟 **(Recommended)**
## Configuration Management

- [Reloader](https://github.com/stakater/Reloader): A Kubernetes controller to watch changes in ConfigMap and Secrets and do rolling upgrades on Pods with their associated Deployment, StatefulSet, DaemonSet and DeploymentConfig 🌟 **(Recommended)**
- [vals](https://github.com/helmfile/vals): Helm-like configuration values loader with support for various sources 🌟 **(Recommended)**
## Development Environment

- [devspace](https://github.com/devspace-sh/devspace): The Fastest Developer Tool for Kubernetes
## Development Library

- [kooper](https://github.com/spotahome/kooper): A simple Go library to create Kubernetes operators and controllers.
- [kubebuilder](https://github.com/kubernetes-sigs/kubebuilder): SDK for building Kubernetes APIs using CRDs
## DNS and SSL

- [cert-manager](https://github.com/cert-manager/cert-manager): Automatically provision and manage TLS certificates in Kubernetes 🌟 **(Recommended)**
- [external-dns](https://github.com/kubernetes-sigs/external-dns): Configure external DNS servers
## GPU Scheduler

- [AMD GPU Operator](https://github.com/ROCm/gpu-operator): Simplifies the deployment and management of AMD Instinct GPU accelerators within Kubernetes clusters. [Documentation](https://instinct.docs.amd.com/projects/gpu-operator/en/latest/)
- [HAMi](https://github.com/Project-HAMi/HAMi): Heterogeneous AI Computing Virtualization Middleware 🌟 **(Recommended)**
- [Intel GPU Operator](https://github.com/intel/intel-device-plugins-for-kubernetes): Intel GPU plugin facilitates Kubernetes workload. [Documentation](https://intel.github.io/intel-device-plugins-for-kubernetes/cmd/gpu_plugin/README.html)
- [k8s-dra-driver-gpu](https://github.com/NVIDIA/k8s-dra-driver-gpu): Dynamic Resource Allocation (DRA) for NVIDIA GPUs in Kubernetes
- [KAI-Scheduler](https://github.com/NVIDIA/KAI-Scheduler): an open source Kubernetes Native scheduler for AI workloads at large scale
- [NVIDIA GPU Operator](https://github.com/NVIDIA/gpu-operator): NVIDIA GPU Operator creates, configures, and manages GPUs in Kubernetes. [Documentation](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/overview.html) 🌟 **(Recommended)**
## Kubectl Tools Kit

- [krew](https://github.com/kubernetes-sigs/krew): 📦 Find and install kubectl plugins 🌟 **(Recommended)**
- [kube-capacity](https://github.com/robscott/kube-capacity): A simple CLI that provides an overview of the resource requests, limits, and utilization in a Kubernetes cluster 🌟 **(Recommended)**
- [kubectl-node-shell](https://github.com/kvaps/kubectl-node-shell): Exec into node via kubectl 🌟 **(Recommended)**
- [kubectl-trace](https://github.com/iovisor/kubectl-trace):  Schedule bpftrace programs on your kubernetes cluster using the kubectl
- [kubectl-tree](https://github.com/ahmetb/kubectl-tree): kubectl plugin to browse Kubernetes object hierarchies as a tree 🎄
- [kubectl-view-allocations](https://github.com/davidB/kubectl-view-allocations): kubectl plugin to list allocations (cpu, memory, gpu,... X utilization, requested, limit, allocatable,...) 🌟 **(Recommended)**
## Kubernetes Hosted

- [eksctl](https://github.com/eksctl-io/eksctl): The official CLI for Amazon EKS. [Website](https://eksctl.io/)
- [K0s](https://docs.k0sproject.io/stable/): k0s is an open source, all-inclusive Kubernetes distribution, which is configured with all of the features needed to build a Kubernetes cluster.
- [K3s](https://docs.k3s.io/): Lightweight Kubernetes. Easy to install, half the memory, all in a binary of less than 100 MB 🌟 **(Recommended)**
- [Kind](https://kind.sigs.k8s.io/) : [kind](https://sigs.k8s.io/kind) is a tool for running local Kubernetes clusters using Docker container “nodes” 🌟 **(Recommended)**
- [Kubernetes Goat](https://madhuakula.com/kubernetes-goat/docs): An interactive Kubernetes security learning playground
- [Kubernetes Official solution](https://kubernetes.io/docs/setup/production-environment/tools/) : Installing Kubernetes with deployment tools. Such as: [kubespray](https://github.com/kubernetes-sigs/kubespray), [kubeadm](https://github.com/kubernetes/kubeadm) 🌟 **(Recommended)**
- [MicroK8s](https://microk8s.io/docs): MicroK8s is a low-ops, minimal production Kubernetes.
- [minikube](https://minikube.sigs.k8s.io/docs/) : minikube quickly sets up a local Kubernetes cluster on macOS, Linux, and Windows
- [Talos Linux](https://www.talos.dev/) : The Kubernetes Operating System
	- [cluster-template](https://github.com/onedr0p/cluster-template): A template for deploying a Talos Kubernetes cluster including Flux for GitOps
- [kubevirt](https://kubevirt.io/): Provides a unified development platform where developers can build, modify, and deploy applications residing in both Application Containers as well as Virtual Machines in a common, shared environment.
## Monitoring

- [kube-state-metrics](https://github.com/kubernetes/kube-state-metrics): Add-on agent to generate and expose cluster-level metrics 🌟 **(Recommended)**
- [metrics-server](https://github.com/kubernetes-sigs/metrics-server): Scalable and efficient source of container resource metrics for Kubernetes built-in autoscaling pipelines 🌟 **(Recommended)**
- [OpenSLO](https://github.com/OpenSLO/OpenSLO): Open specification for defining and expressing service level objectives (SLO)
- [prometheus-operator](https://prometheus-operator.dev/docs/getting-started/introduction/): A [Kubernetes Operator](https://github.com/cncf/tag-app-delivery/blob/main/operator-wg/whitepaper/Operator-WhitePaper_v1-0.md#foundation) that provides Kubernetes native deployment and management of [Prometheus](https://prometheus.io/) and related monitoring components.
- [x509-certificate-exporter](https://github.com/enix/x509-certificate-exporter): A Prometheus exporter to monitor x509 certificates expiration in Kubernetes clusters or standalone 🌟 **(Recommended)**
## Policy Controller

- [Kyverno](https://kyverno.io/) : Kubernetes Native Policy Management
- [OPA Gatekeeper](https://open-policy-agent.github.io/gatekeeper/website/) : A customizable cloud native policy controller that helps enforce policies and strengthen governance 🌟 **(Recommended)**
## Resources Orchestrator

- [kro](https://github.com/awslabs/kro): Kube Resource Orchestrator
- [Kueue](https://kueue.sigs.k8s.io/docs/overview/): a kubernetes-native system that manages quotas and how jobs consume them.
## Secret Management

- [external-secrets](https://github.com/external-secrets/external-secrets): External Secrets Operator reads information from a third-party service like AWS Secrets Manager and automatically injects the values as Kubernetes Secrets 🌟 **(Recommended)**
- [vault-secrets-operator](https://github.com/ricoberger/vault-secrets-operator): Create Kubernetes secrets from Vault for a secure GitOps based workflow 🌟 **(Recommended)**
## Service Discovery

- [consul](https://developer.hashicorp.com/consul/docs?product_intent=consul):  A multi-networking tool that offers a fully-featured service mesh solution
- [coredns](https://github.com/coredns/coredns): CoreDNS is a DNS server that chains plugin 🌟 **(Recommended)**
## Service Mesh

- [Istio](https://istio.io/): Service Mesh. Simplified. Easily build cloud native workloads securely and reliably with `Istio`, with or without sidecars.
- [linkerd](https://linkerd.io/2.15/overview/):  A _service mesh_ for Kubernetes. It makes running services easier and safer by giving you runtime debugging, observability, reliability, and security—all without requiring any changes to your code.
## Service Proxy

- [envoy](https://www.envoyproxy.io/docs/envoy/v1.31.0/) : Envoy is an L7 proxy and communication bus designed for large modern service oriented architectures
- [kube-proxy](https://github.com/kubernetes/kube-proxy): The Kubernetes network proxy runs on each node 🌟 **(Recommended)**
## Storage Platforms

- [csi-driver-nfs](https://github.com/kubernetes-csi/csi-driver-nfs): This driver allows Kubernetes to access NFS server on Linux node
- [Longhorn](https://longhorn.io/): Cloud native distributed block storage for Kubernetes 🌟 **(Recommended)**
- [MinIO](https://min.io/docs/minio/kubernetes/upstream/index.html): MinIO Object Storage for Kubernetes 🌟 **(Recommended)**
- [Rook](https://rook.io/docs/rook/latest-release/Getting-Started/intro/): An open source cloud-native storage orchestrator, providing the platform, framework, and support for Ceph storage to natively integrate with cloud-native environments 🌟 **(Recommended)**
## Threat Intelligence

- [Falco](https://falco.org/): Detect security threats in real time 🌟 **(Recommended)**
- [kubescape](https://github.com/kubescape/kubescape): Kubescape is an open-source Kubernetes security platform for your IDE, CI/CD pipelines, and clusters
- [openappsec](https://github.com/openappsec/openappsec): A machine learning security engine that preemptively and automatically prevents threats against Web Application & APIs.
- [sysdig](https://github.com/draios/sysdig): Linux system exploration and troubleshooting tool with first class support for containers
- [teleport](https://github.com/gravitational/teleport): The easiest, and most secure way to access and protect all of your infrastructure.
- [Tetragon](https://tetragon.io/docs/) : Cilium Tetragon component enables powerful realtime, eBPF-based Security Observability and Runtime Enforcement. 🌟 **(Recommended)**
## Utilities Kubernetes

- [kubernetes-reflector](https://github.com/emberstack/kubernetes-reflector): Custom Kubernetes controller that can be used to replicate secrets, configmaps and certificates 🌟 **(Recommended)**