---
title: "Kubewekend Session Extra 6: Kubernetes Scaling in Action. Try to discovery the Service Mesh with Istio inside Kubewekend Cluster"
tags:
  - kubewekend
  - kubernetes
  - k8s
  - platform-engineering
  - devops
---

![[thumbnail-network-centric-with-istio.png]]

>[!quote]
>Hello, it's me again - how was your week? The previous Kubewekend session wrapped up a lot of ground, helped me reflect on additional architectural challenges in [W'xOps IDP](https://www.wxops.cloud/) development, and gave me the energy to stay motivated for the upcoming sessions. I hope you find this one useful for learning and understanding Kubernetes. Today, I'm revisiting scalable multi-cluster networking, catching up on Cloud Native updates this weekend, and walking through some practical and experiment with Service Mesh, one of core concept for operating Kubernetes networking and managing East-West and North-South traffic delivery. Let's dive deep into today's topics.

Before getting into the details, if you want to review related networking topics covering Kubernetes, multi-cluster setups, and Cloud Native networking, you can check out some of my other articles on these subjects:

- [[Kubewekend Session 7|Kubewekend Session 7: Setup new deployment and route traffic to kubewekend cluster]] - Covers basic networking in Kubernetes, Service-to-Pod routing, and CNI.
- [[Kubewekend Session Extra 3|Kubewekend Session Extra 3: RKE2 and The Nightmare with Network and CoreDNS]] - Covers troubleshooting CoreDNS and CNI iptables rules to understand Pod-to-Pod connectivity.
- [[The Story of Mine about Multi-Region Architecture]] - Covers concepts, experiments, and practical implementations of multi-region Kubernetes architecture in the cloud.
- [[To Cloud Native Multi-Cluster with ExternalDNS]] - Covers using `external-dns` as a core component to distribute traffic across multi-cluster environments.
- [[Awesome Kubernetes Walkthrough#Kubernetes Multi-Cluster Approach and Strategy Matrix]] - A collection of my thoughts and decision-making frameworks for designing multi-cluster architectures and networking layers.

# The Story of Scaling, W Cloud Native Today

With the evolution of Cloud Native in general, and Kubernetes specifically, ecosystems have become increasingly powerful and complex, unlocking deeper observability and the ability to overcome major technological bottlenecks. Honestly, it is remarkable how rapidly innovations emerge following every KubeCon around the world. At the time of writing this article, KubeCon NA 2026 has already taken place, introducing major advancements in Platform Engineering, AI Agentic & Inference, and . If you have a moment, I recommend checking out the [KubeCon NA 2026 Keynote Playlist](https://www.youtube.com/playlist?list=PLPmTb10DsaPI).

## Cloud Native in Action

![[thumbnail-cloudnative-inference.png]]
<div align="center">
	<p style="text-align: center;">The Cloud Native Inference Stack by ModelPlane (KubeCon NA 2026)</p>
</div>

What stands out to me most, and continues to grow every day, is **scalability**: the ability to seamlessly expand compute resources and architectural capacity. The Cloud Native ecosystem is already mature in this regard and continues to evolve every single day.

When looking at how Kubernetes has evolved, it is no longer just about managing a collection of cluster contexts via `kubectl`. Instead, it is transforming around modern **multi-cluster concepts**, alongside dedicated **platforms for developer and agentic experiences**, such as:

**Multi-Cluster**

- **[Karmada](https://github.com/karmada-io/karmada)** (CNCF Graduated)
- **[OCM (Open Cluster Management)](https://github.com/open-cluster-management-io/ocm)** (CNCF Incubating)

**Platform**

- **[KubeVela](https://github.com/kubevela/kubevela)** (CNCF Incubating)
- **[OpenChoreo](https://github.com/openchoreo/openchoreo)** (CNCF Sandbox)

**AI Agentic & Inference**

- **[HAMi](https://github.com/Project-HAMi/HAMi)** (CNCF Incubating)
- **[Kubeflow](https://github.com/kubeflow/kubeflow)** (CNCF Graduated)
- **[KubeRay](https://github.com/kuberay-project/kuberay)** (CNCF Sandbox)
- **[KAI Scheduler](https://github.com/kai-scheduler/KAI-Scheduler)** (CNCF Sandbox)
- **[Agent Substrate](https://github.com/agent-substrate/substrate)** (CNCF Sandbox)
- **[OpenShell](https://github.com/NVIDIA/OpenShell)** (CNCF Sandbox)

**Networking**

- **[Istio](https://github.com/istio/istio)** (CNCF Graduated)
- **[Linkerd](https://github.com/linkerd/linkerd2)** (CNCF Graduated)
- **[Cilium](https://github.com/cilium/cilium)** (CNCF Graduated)

These tools, and many other remarkable projects in the ecosystem, are true game changers elevating the cloud computing economy to a new level, especially in the AI era. They are designed to make Kubernetes workloads more stable, scalable, and resource-optimized.

Through end-user case studies and community discussions, you can find plenty of real-world validation and confidence in open-source ecosystems. You can explore more at:

- [Platform Engineering Activities at KubeCon + CloudNativeCon North America 2026](https://cloudnativeplatforms.com/es/blog/kubecon-na-2026/)
- [KubeCon + CloudNativeCon NA 2026: End User TAB recommendations and tips](https://www.cncf.io/blog/2026/10/29/kubecon-cloudnativecon-na-2026-end-user-tab-recommendations-and-tips/)
- [GitOps at Meta: How Meta Is Accelerating AI Infrastructure Deployments with Argo CD, Helm and Kubernetes](https://www.cncf.io/case-studies/meta/)

That is why I remain curious to see what comes next for Cloud Native and Kubernetes after KubeCon. There is always an opportunity to learn, reflect, embrace new ideas, and look toward the future.

By the way, when I watched the **[Modelplane](https://github.com/modelplaneai/modelplane)** demo during the [Keynote Session](https://youtu.be/tF4GE8qn92I?si=eO0k4qwxnfD51X0p&t=2452), I found myself applauding instinctively. Modelplane delivered an impressive walkthrough of distributed model deployment and serving across clouds. It gave me plenty of inspiration around **[Crossplane](https://github.com/crossplane/crossplane)** and practical real-world patterns that directly reflect how I am building and leveraging this framework in production for **[W'xOps Core](https://github.com/wxops-idp/wxops-core)**.
## Istio and Service Mesh at Cloud Native

![[Pasted image 20261114221714.png]]

While writing this blog post, I looked up Istio's presence at KubeCon NA 2026 and found that the project hosted several dedicated sessions, including Istio Day. The lineup covered key advancements such as Ambient Mesh, AI-aware traffic management, and AI agent identity governance, bringing maintainers, contributors, practitioners, and end users together. You can explore the full details at [Istio at KubeCon North America 2026](https://istio.io/latest/blog/2026/kubecon-na/).

**Service Mesh** remains one of the hottest topics in Cloud Native and Kubernetes, and Istio is among the most widely adopted solutions. Beyond acting as a foundational service mesh, it provides comprehensive capabilities for scalability, multi-cluster networking, traffic distribution, and zero-trust security. Personally, I haven't had extensive hands-on experience using Istio in my day-to-day work, so this is a great opportunity to dive into the latest release and see firsthand how its future roadmap lives up to everything I've read and heard about Istio in Kubernetes.

From [Cloud Native Now](https://cloudnativenow.com/kubecon-cloudnativecon-north-america-2026/istio-ambient-multi-network-reaches-general-availability/), **Istio Ambient Mode Multi-Network support achieved General Availability (GA)**.

- **Why it matters:** Sidecarless Ambient Mesh, which splits L4 security (`ztunnel` per node) from optional L7 processing (namespace `Waypoint` proxies), can now seamlessly span multiple Kubernetes clusters, VPCs, and clouds with active-active workload routing.
- **Performance Impact:** Removing per-pod Envoy sidecars delivers over **60% improvement in resource utilization** and up to a **75% reduction in latency**, freeing critical memory and CPU for high-density AI inference pods.
# Kubernetes Networking for Scaling
## Networking Landscape at L4/L7

![[thumbnail-osi-tcpip.png]]

![[thumbnail-osi-tcpip-mapping.png]]

I focus on networking because it is the foundation of any architecture, it connects and defines every concept on the internet, and Kubernetes is no exception. Because Kubernetes operates as a high-level, user-defined networking architecture, workloads primarily focus on Layer 4 (Transport) and Layer 7 (Application) of the OSI model, which map directly to the Transport and Application layers of the TCP/IP model. While we don't directly configure L1, L2, or L3 at the application level, Kubernetes still relies heavily on them—for instance, L3 is where IP addresses are assigned to Pods, and managed by **[CNI](https://www.cni.dev/)**. However, L4 and L7 are where application traffic decisions happen and where Istio directly operates. Before getting into the implementation details, you should read these articles to build a stronger foundation on these layers:

- [Wikipedia - OSI model](https://en.wikipedia.org/wiki/OSI_model)
- [Cloudflare - What is the OSI Model?](https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/)
- [Platform9 - Guide to Kubernetes Networking](https://platform9.com/blog/guide-to-kubernetes-networking/)
- [CNCF - Kubernetes networking demystified: a brief guide](https://www.cncf.io/blog/2020/01/30/kubernetes-networking-demystified-a-brief-guide/)
- [Cisco - A Comprehensive Guide to Kubernetes Networking with the Intersight Kubernetes Service White paper](https://www.cisco.com/c/en/us/products/collateral/cloud-systems-management/intersight/comp-guide-kubernetes-networking-wp.html)
- [StackOverFlow - Kubernetes Networking: A Deep Dive](https://stackoverflow.com/questions/73821483/differences-between-kubernetes-layer-7-and-layer-4-cloud-load-balancers)
- [Buoyant - A guide to modern Kubernetes network policies](https://www.buoyant.io/blog/a-guide-to-modern-kubernetes-network-policies)
- [Medium - Kubernetes Networking: A Deep Dive](https://medium.com/@h.stoychev87/kubernetes-networking-a-deep-dive-6081d794e97c)
- [Medium - Securing Kubernetes Layer by Layer: An OSI Approach (Part 2 : L4)](https://itnext.io/securing-kubernetes-layer-by-layer-an-osi-approach-part-2-l4-498c69f951fc)
- [Medium - Securing Kubernetes Layer by Layer: An OSI Approach (Part 4: L7)](https://itnext.io/securing-kubernetes-layer-by-layer-an-osi-approach-part-4-l7-14b0f51055a3)

**In Network General**

[**Layer 4 (Transport Layer)**](https://en.wikipedia.org/wiki/Transport_layer) handles end-to-end communication between hosts using protocols like **TCP** and **UDP**. An L4 device looks only at network-level metadata, specifically the **5-tuple** (Source IP, Source Port, Destination IP, Destination Port, Protocol), and forwards packets without reading what is inside them.

- **Key traits:** Ultra-fast, low CPU/memory overhead, preserves client IP easily, and passes encrypted traffic (like TLS) straight through without decrypting it.
- **Limitation:** It cannot make routing decisions based on URL paths, domain names, or HTTP headers.

[**Layer 7 (Application Layer)**](https://en.wikipedia.org/wiki/Application_layer) handles application-specific protocols such as **HTTP/HTTPS, gRPC, WebSockets, and DNS**. An L7 proxy terminates the client connection, decrypts TLS (if configured), reassembles the stream, and inspects the actual application payload.

- **Key traits:** Routes based on hostnames (`api.example.com`), URL paths (`/v1/users`), HTTP methods (`GET`/`POST`), headers, or cookies. Supports TLS termination, rate limiting, retries, and Web Application Firewalls (WAF).
- **Limitation:** Higher latency and resource usage because the proxy must parse application protocols and manage separate client and backend connections.

|**Feature**|**Layer 4 (Transport)**|**Layer 7 (Application)**|
|---|---|---|
|**Protocols**|TCP, UDP, SCTP|HTTP/1.1, HTTP/2, HTTP/3, gRPC, WebSockets|
|**Routing Criteria**|IP address + Port|URL path, Host header, HTTP headers, cookies|
|**TLS Handling**|Passthrough (encrypted end-to-end)|Terminates TLS at the proxy (can re-encrypt)|
|**Performance**|Very high throughput, minimal latency|Higher CPU/memory cost due to payload inspection|
|**Connection Model**|Packet/stream forwarding|Full proxy (terminates client, opens backend connection)|

Back to [Kubernetes Networking in Cluster](https://kubernetes.io/docs/concepts/cluster-administration/networking/), there are 4 problems to address, including

1. Highly-coupled container-to-container communications
2. Pod-to-Pod communications
3. Pod-to-Service communications
4. External-to-Service communications

By answering these problems, that show the reflect about connection between L4 and L7 in Kuberntes

**L4 in Kubernetes**

- **[Services](https://kubernetes.io/docs/concepts/services-networking/service/) (`ClusterIP`, `NodePort`, `LoadBalancer`)**: The core Kubernetes `Service` object is strictly an **L4 abstraction**. When traffic hits a Service IP and port, `kube-proxy` (using `iptables`, `IPVS`, or **eBPF** via Cilium) load-balances TCP/UDP connections across healthy Pod IPs. A `LoadBalancer` Service provisions a cloud network load balancer (such as an AWS NLB) that forwards raw TCP/UDP traffic.
- **[NetworkPolicy](https://kubernetes.io/docs/concepts/services-networking/network-policies/)**:  Native Kubernetes `NetworkPolicy` operates at **L3/L4**. It restricts pod-to-pod traffic using pod labels, namespaces, CIDR IP blocks, and TCP/UDP ports—it cannot block specific HTTP paths like `POST /admin`.

**L7 in Kubernetes**

- **[Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)**: The traditional Kubernetes resource for **L7 HTTP/HTTPS routing**. An `Ingress` resource defines host-based and path-based rules (e.g., routing `/checkout` to `checkout-service`) and TLS certificates. It requires an **Ingress Controller** (such as NGINX, Traefik, HAProxy, or Envoy) running in the cluster to act as the L7 reverse proxy. With `traefik`, you can use Ingress at L4 with [`IngressRouteTCP`](https://doc.traefik.io/traefik/reference/routing-configuration/kubernetes/crd/tcp/ingressroutetcp/) and [`IngressRouteUDP`](https://doc.traefik.io/traefik/reference/routing-configuration/kubernetes/crd/udp/ingressrouteudp/)
- **[Gateway API](https://kubernetes.io/docs/concepts/services-networking/gateway/) ( `HTTPRoute`, `GRPCRoute`)**: The modern, role-oriented successor to Ingress. Gateway API separates infrastructure (`GatewayClass`, `Gateway`) from application routing (`HTTPRoute`, `GRPCRoute`). It brings native L7 capabilities that Ingress lacked—such as weighted traffic splitting (canary deployments), header modification, and cross-namespace routing—while also supporting L4 via `TCPRoute` and `UDPRoute`.
- **[Service Mesh](https://glossary.cncf.io/service-mesh/) (Istio, Linkerd, Cilium):** Service meshes inject L7 proxies (typically Envoy) at the pod or node level to govern **east-west (pod-to-pod)** traffic. This adds L7 capabilities to internal `ClusterIP` communication, including automatic mTLS, L7 authorization policies (e.g., _"Service A can only send `GET` requests to Service B"_), circuit breaking, and distributed tracing.

![[thumbnail-k8s-ingress-traffic.png]]

In a typical production cluster, **L4 and L7 are chained**:

1. External user traffic hits a cloud **L4 LoadBalancer** (`Service` of type `LoadBalancer`) on port `443`.
2. That L4 LoadBalancer forwards the TCP stream directly to an **L7 Ingress Controller or Gateway** (like Envoy) running inside the cluster.
3. The L7 Gateway terminates TLS, inspects the HTTP host and path, and routes the request to an internal **L4 `ClusterIP` Service**, which finally forwards packets to a specific Pod.

## Traffic Distribution in Kubernetes

![[thumbnail-k8s-multi-cluster-network-l7.png]]
### Network Centric Scaling with L4/L7

A networking landscape operating across **L4 and L7** enables seamless connectivity across multiple clusters and allows direct Pod-to-Pod communication across cluster boundaries, a paradigm known as **network-centric** architecture. This model represents a fundamental shift from a **cluster-centric scaling model** (scaling up a single, massive cluster) to a **network-centric scaling model** (scaling horizontally across many smaller, isolated clusters connected over the network).

>[!question] Limitation
>Historically, teams scaled Kubernetes by adding more nodes to a single giant cluster. Over time, single-cluster scaling hits hard architectural limits:
>- **Control-plane bottlenecks:** `etcd` and the API server degrade as Pod and node counts grow.
>- **Blast radius:** A bad CNI upgrade, DNS failure, or misconfigured cluster-wide policy can take down every workload at once.
>- **Cloud & regional boundaries:** A single Kubernetes cluster cannot reliably span distant geographic regions due to strict latency requirements on `etcd` consensus.

**Network-centric scaling** solves these challenges by treating individual clusters as disposable, failure-isolated "cells" (scoped per region, availability zone, or team) and relying on the **L4/L7 network layer** to stitch them together into a single logical application fabric.

At **L4 (Transport)**, the network's job is to make a Pod or `Service` in **Cluster A** directly reachable from **Cluster B** at the TCP/UDP packet level, as if they resided on the same flat network.

While L4 builds the connectivity pipes between clusters, **L7 (Application)** acts as the **traffic brain**. Because L7 proxies (such as Envoy) inspect HTTP/2, gRPC, request headers, and application-level health, they govern *how* traffic is dynamically routed, balanced, and secured across clusters.

| **Dimension**            | **Layer 4 (Transport) in Multi-Cluster**                          | **Layer 7 (Application) in Multi-Cluster**                                |
| ------------------------ | ----------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **Primary Role**         | **Connectivity:** Bridges Pod/Service IP networks across clusters | **Distribution:** Shapes, splits, and fails over requests across clusters |
| **Core Mechanism**       | Flat IP routing, BGP, VXLAN/WireGuard tunnels, eBPF               | Reverse proxies (Envoy), HTTP/gRPC routing, global L7 load balancers      |
| **Scaling Pattern**      | Active-Active pod pooling & overflow spillover                    | Weighted canary rollouts, geo-routing, tenant-based cluster sharding      |
| **Key K8s APIs / Tools** | MCS API (`ServiceImport`), Cilium Cluster Mesh, Submariner        | Multi-Cluster Gateway API (`HTTPRoute`), Istio Multi-Cluster              |
| **Main Constraint**      | Often requires non-overlapping Pod CIDRs and high mutual trust    | Adds proxy latency and requires certificate/trust-domain federation       |

Connecting clusters at **L4** vs. **L7** creates very different coupling models:

- **L4-coupled clusters** (like a flat Cluster Mesh) behave almost like one extended network. They deliver ultra-low latency for East-West microservice chatter, _but_ they require careful IP address planning (non-overlapping Pod CIDRs) and share a tighter security trust boundary.
- **L7-coupled clusters** (connected via Multi-Cluster Gateways) stay **loosely coupled**. Each cluster can have overlapping internal IP ranges and independent upgrades, exposing only explicit HTTP/gRPC APIs to other clusters.

>[!note] Lesson Learn
>In practice, mature multi-cluster platforms combine both: **L7 Gateways** at the edge and between independent domain clusters, and **L4 Cluster Meshes** within tightly coupled regional clusters that need high-throughput pod-to-pod communication.

### North-South and East-West

Network Centric model directly expand the traditional **North-South** and **East-West** terminology in Kubernetes, which usually use for Data Center Networking to describe traffic relative to a **single cluster boundary**. Once you scale across multiple clusters over the network, those boundaries stretch, and the Kubernetes ecosystem introduces new patterns and gateways to manage both directions.

| **Traffic Direction**                                                                | **Traditional Single-Cluster Meaning**                                          | **Network-Centric (Multi-Cluster) Meaning**                                                                                                                                    |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**North-South**](https://gateway-api.sigs.k8s.io/docs/glossary/#northsouth-traffic) | External users/APIs entering (`Ingress`) or leaving (`Egress`) **one cluster**. | **Edge-to-Fleet:** Global traffic entering across _any_ healthy cluster (Multi-Cluster Ingress/Gateway) and centralized outbound traffic leaving the fleet (`Egress Gateway`). |
| [**East-West**](https://gateway-api.sigs.k8s.io/docs/glossary/#eastwest-traffic)     | Internal microservice chatter (**Pod-to-Pod**) inside the **same cluster**.     | **Intra-Cluster & Cross-Cluster:** Service-to-service traffic flowing seamlessly between pods in the same cluster _and_ across different clusters as one logical fabric.       |

North-South covers traffic crossing the **external perimeter** of your Kubernetes environment (internet, on-prem networks, third-party SaaS APIs).

- **Northbound / Ingress (Traffic Coming In):**
    
    - _Single-cluster:_ Managed via `Ingress`, `Gateway API`, or `Service type: LoadBalancer`.
    - _Network-centric expansion:_ Uses **Multi-Cluster Gateways** (e.g., GKE Multi-Cluster Gateway, Cilium Global Ingress, or Anycast L4/L7 load balancers) to terminate TLS at the global edge and route requests to the closest or healthiest cluster.

- **Southbound / Egress (Traffic Going Out):**
    
    - _Single-cluster:_ Pods talk to external databases or APIs using their node's IP (via [SNAT](https://www.f5.com/glossary/secure-network-address-translation-snat)) or restricted by `NetworkPolicy` egress rules.
    - _Network-centric expansion:_ Introduces **Egress Gateways** (in Istio or Cilium), which route outbound pod traffic from multiple clusters through dedicated gateway nodes with static, predictable public IPs so external firewalls can allowlist your entire cluster fleet.

East-West covers internal **application-to-application** communication within your trusted platform boundary.

- **Intra-Cluster East-West:** Standard `ClusterIP` service calls between pods on the same or different worker nodes inside one cluster, governed by CNI routing (`kube-proxy` / eBPF) and `NetworkPolicy`.
- **Cross-Cluster East-West (The Network-Centric Expansion):** When Cluster A's `checkout` pod calls Cluster B's `inventory` pod, that traffic is still considered **East-West** because both workloads belong to the same internal trust domain. The ecosystem handles this in two ways:
    
    1. **Direct Pod-to-Pod East-West (L3/L4):** Technologies like **Cilium Cluster Mesh** or **Submariner** connect the pod networks directly over encrypted tunnels, so cross-cluster East-West behaves identically to local East-West.
    2. **East-West Gateways (L7):** Service meshes like **Istio** deploy a dedicated **East-West Gateway** on each cluster. Unlike a North-South Ingress Gateway (which exposes public APIs to end users), an East-West Gateway only accepts internal mTLS-authenticated mesh traffic from peer clusters.

>[!note] Lesson Learn
>In the modern Kubernetes Networking with Gateway API and eBPF, the distinguish between these concept become blurring by
>- **Gateway API for both:** While Gateway API started as a North-South `Ingress` replacement, initiatives like **[GAMMA](https://gateway-api.sigs.k8s.io/docs/mesh/gamma/)** (Gateway API for Mesh Management and Administration) allow `HTTPRoute` and `GRPCRoute` to govern **East-West** `ClusterIP` traffic using the exact same YAML model.
>- **Unified L4/L7 Data Planes:** Tools like Cilium and Envoy handle North-South edge routing, East-West internal routing, and Egress policies in the same engine.

### Network Centric vs Application Centric

When I took the time research about multi-cluster couple month ago, I had thought it declare the clearly boundaries between two concept **Network Centric** and **Application Centric**, by choosing which layer own the intelligence. Therefore, I choose to use Application (L7) by Network (L4), but the question doesn't I should nest them together. In short, 

- **Network-Centric** extends the _network fabric_ across clusters so pods and services talk as if they live on one big flat network (L3/L4-first).
- **Application-Centric** keeps clusters as _isolated network islands_ and uses application-aware proxies and APIs to route individual requests between them (L7-first).

**In a network-centric model**, multi-cluster scaling is treated as a **routing and IP-reachability problem**. The underlying CNI or network infrastructure stitches the clusters together so traffic flows at the packet/connection level without applications or proxies needing to intervene.

- **How traffic is distributed:** Handled via **L3/L4 routing** (BGP, VXLAN/WireGuard tunnels, eBPF maps, or Global Anycast L4 Load Balancers). When a pod calls a global `ClusterIP` or `*.clusterset.local` DNS name, the kernel or network load balancer picks an endpoint IP—preferring local cluster pods and spilling over to remote cluster pods when local capacity is exhausted.
- **Cluster relationship:** **Tightly coupled at the network layer.** Clusters typically require non-overlapping Pod/Service CIDRs and direct node-to-node network connectivity.
- **Best fit:** High-throughput, latency-sensitive internal workloads (databases, Kafka, AI/ML distributed jobs, regional HA pairs) where L7 proxy hops would add unacceptable overhead.

**In an application-centric model**, multi-cluster scaling is treated as a **service-identity and request-routing problem**. Clusters remain completely independent at the network layer (they can even have identical overlapping Pod IPs), and traffic crosses cluster boundaries only through explicit **L7 Gateways or Service Mesh proxies**.

- **How traffic is distributed:** Handled via **L7 request inspection** (Envoy, Multi-Cluster Gateway API `HTTPRoute`, Istio `VirtualService`). Traffic is distributed based on HTTP headers, JWT claims, tenant IDs, or exact percentage weights (e.g., 90% to Cluster A, 10% to Cluster B), with active health checks that immediately reroute requests if a cluster starts returning HTTP `503` errors.
- **Cluster relationship:** **Loosely coupled (cell-based architecture).** Each cluster is an autonomous blast-radius boundary that can run different CNI plugins, overlapping IP ranges, or different Kubernetes versions.
- **Best fit:** User-facing microservices, multi-region active-active APIs, blue/green cluster upgrades, and regulated environments needing strict per-service mTLS authorization.

|**Dimension**|**Network-Centric Model**|**Application-Centric Model**|
|---|---|---|
|**Primary Control Layer**|**L3 / L4** (IPs, Ports, BGP, eBPF)|**L7** (HTTP/gRPC requests, headers, SPIFFE identity)|
|**Unit of Distribution**|**TCP/UDP Connections & Packets**|**Individual Application Requests**|
|**Cluster Coupling**|**Tight:** Shared routing domain, non-overlapping CIDRs|**Loose:** Isolated network domains, overlapping CIDRs allowed|
|**Failover Trigger**|Node/Pod TCP health check failure|Application-level signals (HTTP 5xx rate, latency spikes)|
|**Upgrade & Blast Radius**|Network changes (BGP/CNI) can affect peer clusters|Clusters upgrade independently behind Gateway boundaries|
|**Typical Stack**|Cilium Cluster Mesh, Submariner, Cloud L4 Anycast|Multi-Cluster Gateway API, Istio, Envoy / Cloud Global L7 LB|

>[!note] Lesson Learn
>In production, large Kubernetes platforms rarely pick only one, they nest them:
>1. **Application-Centric between regions/cells:** Separate regions or failure domains are connected at **L7** via Multi-Cluster Gateways so a bad rollout or network issue in Region A cannot cascade into Region B.
>2. **Network-Centric inside a region:** Multiple clusters inside the _same_ metro/region are linked at **L3/L4** via eBPF Cluster Mesh so microservices can share capacity and fail over locally at near-zero latency.

### Real Use-Case

![[design-multi-cluster-with-glb.png]]

Having tested and evaluated several architectural patterns, here is why I lean toward an **application-centric** approach, and why I aim to balance it with **network-centric** principles, since Kubernetes ultimately resolves and routes traffic at the network layer. You can explore the full implementation details in [[To Cloud Native Multi-Cluster with ExternalDNS]].

With the support of [ExternalDNS](https://kubernetes-sigs.github.io/external-dns/v0.24.0/) and a managed DNS provider (such as Cloudflare, Amazon Route 53, or another cloud DNS), I designed a strategy to intelligently route traffic only to healthy clusters where the application is available. When deploying an application across multiple clusters, each cluster registers the same DNS record in Route 53 pointing to its external ingress/load balancer IP once the application passes health checks. By pairing this with [Route 53 Health Checks and DNS Failover](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover.html), you can keep your service continuously available, automate failover, and leverage advanced [Route 53 Routing Policies](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html) (such as latency-based, geoproximity, failover, weighted, or IP-based routing). You can also pair this setup with a Global Traffic Management (GTM) solution to minimize end-to-end latency.

While the POC performed very well, there are still key trade-offs and operational insights worth highlighting:

- **Latency and Routing Accuracy:** Latency-based and target routing results were impressive with high accuracy. When configuring an additional DNS layer for domain resolution, responses returned rapidly with resolution latency under `10ms`. Although operating this strategy under heavy production traffic introduces real-world complexities (such as client-side DNS caching), the overall performance exceeded expectations.
- **Failover and Downtime Behavior:** Failover and chaos testing demonstrated solid resilience. While Route 53's failover routing handles endpoint transitions reliably, recovering from an unavailable state back to healthy still leaves room for improvement. Specifically, recovery speed can be further refined by tuning DNS TTLs, optimizing health check intervals, and gracefully masking transient service downtime inside Kubernetes. Even with the additional tuning required for production readiness, it remains a strong foundation to build upon.
- **Cost vs. Resilience:** AWS services come with a noticeable price tag, running frequent, granular health checks costs roughly `$3` per endpoint/month. However, if that trade-off fits your budget, it provides reliable failover handoffs and strong system high availability. For teams looking for even lower-latency, anycast-driven multi-cluster routing within AWS without DNS caching delays, [AWS Global Accelerator](https://aws.amazon.com/global-accelerator/) is a compelling alternative.

If you want to dive deeper into Kubernetes networking, multi-cluster architectures, and managing traffic across large clusters or fleets, these resources are great starting points for further research:

- [Medium - Enterprise Kubernetes Networking: CNI, Service Mesh, Multi-Cluster & Gateway API](https://medium.com/codex/enterprise-kubernetes-networking-cni-service-mesh-multi-cluster-gateway-api-2284f6782172)
- [Cloud Native Deep Dive - Managing Traffic In Kubernetes For Gateways & Service Mesh](https://www.cloudnativedeepdive.com/managing-traffic-in-kubernetes-for-gateways-service-mesh/)
- [Medium - Kubernetes Traffic Management: Combining Gateway API with Service Mesh for North-South and East-West Use Cases](https://medium.com/@disha.20.10/kubernetes-traffic-management-combining-gateway-api-with-service-mesh-for-north-south-and-63e39ad95dcc)
- [Tigera - Secure and Scalable Kubernetes for Multi-Cluster Management](https://www.tigera.io/blog/secure-and-scalable-kubernetes-for-multi-cluster-management/)
- [Medium - Controlling Kubernetes Network Traffic Part 1](https://aws.plainenglish.io/controlling-kubernetes-network-traffic-part-1-ca6fa2dbad51)
- [Medium - Controlling Kubernetes Network Traffic Part 2](https://eyal-estrin.medium.com/controlling-kubernetes-network-traffic-part-2-e73938f9da38)
- [Blog - k8gb: The Best Open Source GSLB Solution for Cloud Native](https://oilbeater.com/en/2024/04/18/k8gb-best-cloudnative-gslb/)
- [Blog - 5 Solutions for Multi-Cluster Communication in Kubernetes](https://oilbeater.com/en/2024/05/24/five-kubernetes-multicluster-network/)
- [AWS - Exposing Kubernetes Applications, Part 1: Service and Ingress Resources](https://aws.amazon.com/blogs/containers/exposing-kubernetes-applications-part-1-service-and-ingress-resources/)
- [AWS - Exposing Kubernetes Applications, Part 2: AWS Load Balancer Controller](https://aws.amazon.com/blogs/containers/exposing-kubernetes-applications-part-2-aws-load-balancer-controller/)
- [AWS - Exposing Kubernetes Applications, Part 3: Ingress-Nginx Controller](https://aws.amazon.com/blogs/containers/exposing-kubernetes-applications-part-3-nginx-ingress-controller/)
- [Medium - Multi-Cluster & Disaster Recovery: Building a Global Kubernetes Architecture That Never Sleeps](https://blog.devops.dev/multi-cluster-disaster-recovery-building-a-global-kubernetes-architecture-that-never-sleeps-fcaf5b0e352a)
- [Traefik - Understanding Multi-Cluster Kubernetes: Architecture, Benefits, and Challenges](https://traefik.io/glossary/understanding-multi-cluster-kubernetes)
- [RedHat Research - Bridging clusters: a comparative look at multicluster networking performance in Kubernetes](https://research.redhat.com/blog/article/bridging-clusters-a-comparative-look-at-multicluster-networking-performance-in-kubernetes/)
- [[Awesome Kubernetes Walkthrough#Kubernetes Multi-Cluster Approach and Strategy Matrix]]
- [Dev.to - L4-L7 Performance: Comparing LoxiLB, MetalLB, NGINX, HAProxy](https://dev.to/nikhilmalik/l4-L7-performance-comparing-loxilb-metallb-nginx-haproxy-1eh0)
- [Medium - Kubernetes multi-cluster implementation in under 10 minutes](https://itnext.io/kubernetes-multi-cluster-implementation-in-under-10-minutes-2927952fb84c)
# Try Istio on Kubewekend Lab

Beyond an application-centric approach, a **Service Mesh** can be a stronger choice for optimizing operations across L4 and L7, providing a flatter, more efficient network fabric to connect multiple clusters. Additionally, it offers built-in security capabilities (such as mutual TLS and fine-grained authorization policies) that I overlooked in my previous setup. Istio is a great choice to learn, adopt, and apply if your clusters require zero-trust security, strict network policies, and seamless scalability and extensibility. First, let's take a walkthrough of Service Mesh concepts and Istio to see what it actually brings to the table.
## Service Mesh

![[thumbnail-service-mesh-concept.png]]

>[!question] What is Service Mesh ?
>[According to CNCF](https://glossary.cncf.io/service-mesh/), a service mesh addresses networking challenges in microservice architectures by managing communication between services, adding capabilities for reliability, observability, and security across all workloads.
>
>[According to Red Hat](https://www.redhat.com/en/topics/microservices/what-is-a-service-mesh), a service mesh is a dedicated infrastructure layer within a software application that handles service-to-service communication. It manages traffic routing, security, observability, and resiliency functions while abstracting these complexities away from individual services.
>
>[According to AWS](https://aws.amazon.com/what-is/service-mesh/), a service mesh is a dedicated infrastructure layer that manages communications between services in a distributed application. It intercepts traffic to handle observability, service discovery, logging, tracing, and retries without requiring developers to modify application code in containerized microservices.
>
>[According to Solo.io](https://www.solo.io/topics/istio/service-mesh), a networking framework  for adding observability, security, and reliability to distributed applications. It achieves this by providing these functions at the platform layer, instead of having them embedded in the application layer.

A service mesh manages communication between services by routing traffic through an array of network proxies. These proxies intercept and manage network traffic, enforce security policies, balance workloads, and collect performance telemetry for each service. Traditionally, these proxies are injected into each Pod as a **sidecar**. Instead of services communicating directly with one another, all internal Pod traffic is intercepted and handled via its sidecar proxy, forming a unified **data plane**.

Meanwhile, the **control plane** manages configuration and policy distribution across the data plane. It distributes traffic routing rules, manages mTLS security certificates between services, configures components to enforce authorization policies, and aggregates telemetry.

>[!warning]
>Running a service mesh with a sidecar architecture introduces significant resource overhead (CPU and memory per Pod) and increases operational complexity as the system scales.

This is why **sidecarless** architectures (such as Istio Ambient Mesh or Cilium Service Mesh) were designed, shifting mesh functionality down to the node or OS level by leveraging kernel capabilities like **eBPF** and lightweight node-level proxies. By eliminating per-Pod sidecar proxies, this approach drastically reduces resource consumption and removes redundant network hops, resulting in lower latency and improved overall performance.

Benefit when applying Service Mesh, including

- **Improved security.** A service mesh uses mutual Transport Layer Security (mTLS) to ensure communication between services is encrypted and secure, and sensitive user data is protected.
- **Policy enforcement.** Service meshes include centralized configuration for service policies like quotas, rate-limiting, and authentication and authorization.
- **Traffic management.** Service mesh can help your apps manage traffic to individual services based on load conditions, versions, and user-specific rules.
- **Health checks and observability**: a service mesh you can implement built-in observability tools like distributed tracing and metrics collection. Sidecars in a service mesh collect metrics (request counts, latency, error rates) and send them to the control plane or monitoring tools.
- **Fault tolerance and increased resilience.** When microservices encounter failures, a service mesh can help by automating retries and fallbacks.

Beside the benefit, Service Mesh also bring couple of challenges when applying

- Complexity and integration with existing systems. A service mesh can be difficult to set up, manage, and integrate with existing systems.
- Resource requirements and operational overhead.
- Skills gaps. Teams need training to understand service mesh features, configuration, and best practices.

Nowadays, you have more than one option to choose from when setting up a Service Mesh in your cluster, including:

- **[Istio](https://github.com/istio/istio)** (CNCF Graduated): One of the most popular service mesh solutions in Kubernetes, offering flexible deployment models that support both traditional **Sidecar** and sidecarless (**Ambient Mesh**) modes.
- **[Linkerd](https://github.com/linkerd/linkerd2)** (CNCF Graduated): A lightweight, Kubernetes-native alternative to Istio powered by a fast, memory-safe Rust micro-proxy (`linkerd2-proxy`).
- **[Cilium](https://github.com/cilium/cilium)** (CNCF Graduated): The first CNI plugin to enter the service mesh space, integrating mesh capabilities directly into the Linux kernel networking layer via **eBPF**.
- **[Consul](https://github.com/hashicorp/consul)** (HashiCorp Solution): A distributed, highly available, and data-center-aware service networking solution designed to connect and configure applications across dynamic, multi-platform infrastructure (spanning Kubernetes, VMs, and bare metal).
- Others solution, e.g: **[kuma](https://github.com/kumahq/kuma)** (CNCF Sandbox), **[Traefik Mesh](https://github.com/traefik/mesh)**, **[Kong Mesh](https://developer.konghq.com/mesh/)**, ...

| **Feature / Dimension**        | **Istio**                                               | **Linkerd**                                   | **Cilium Service Mesh**                                | **HashiCorp Consul**                              | **Kuma**                                                    | **Traefik Mesh**                              | **Kong Mesh**                                |
| ------------------------------ | ------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------- | -------------------------------------------- |
| **Data Plane Proxy**           | Envoy (Sidecar) or `ztunnel` + Waypoint (Ambient)       | Custom Rust proxy (`linkerd2-proxy`)          | eBPF (L3/L4) + per-node/waypoint Envoy (L7)            | Envoy                                             | Envoy                                                       | Per-node Traefik proxy (`DaemonSet`)          | Envoy (built on Kuma)                        |
| **Sidecarless Option**         | **Yes** (Ambient Mode)                                  | **No** (Sidecar only)                         | **Yes** (Sidecarless by default)                       | **No** (Sidecar only)                             | **No** (Sidecar only)                                       | **Yes** (Per-node proxy)                      | **No** (Sidecar only)                        |
| **Supported Platforms**        | Kubernetes + VMs                                        | Kubernetes only                               | Kubernetes + external VMs                              | Kubernetes, VMs, Nomad, Bare Metal                | Kubernetes + VMs                                            | Kubernetes only                               | Kubernetes + VMs                             |
| **Resource Overhead**          | Moderate–High (Sidecar) / Low (Ambient)                 | **Very Low** (Rust micro-proxy)               | **Very Low** (Kernel-level eBPF)                       | Moderate–High                                     | Moderate                                                    | **Low** (Shared per node)                     | Moderate                                     |
| **Operational Complexity**     | High (rich API & CRD surface)                           | **Low** (opinionated, minimal config)         | Moderate (often paired with Cilium CNI)                | High (requires Consul server cluster)             | Low–Moderate                                                | **Very Low**                                  | Moderate                                     |
| **Security & mTLS**            | Automated SPIFFE mTLS, JWT, fine-grained L4/L7 AuthZ    | Automated mTLS by default, L7 AuthZ policies  | WireGuard / IPsec transparent encryption + mutual auth | Consul CA / Vault integration, Intentions (AuthZ) | Built-in CA / Vault, mTLS, Traffic Permissions              | Basic mTLS (no strict zero-trust identity)    | Enterprise mTLS, OPA, FIPS 140-2 compliance  |
| **Traffic Management**         | Extensive (canary, mirroring, fault injection, retries) | Good (traffic splits, retries, timeouts)      | Good (Gateway API, L7 HTTP routing, retries)           | Good (L7 routing, failover, splitting)            | Comprehensive (routing, fault injection, rate limiting)     | Basic (SMI-based traffic splitting & retries) | Comprehensive + native Kong API Gateway sync |
| **Multi-Cluster / Multi-Mesh** | Strong (Primary-Remote, Multi-Primary, Federation)      | Good (Cluster mirroring via gateways)         | Strong (ClusterMesh with native eBPF routing)          | **Very Strong** (Multi-datacenter federation)     | **Native Multi-Zone** (Built-in global/zone control planes) | Single cluster only                           | **Enterprise Multi-Zone** + global GUI       |
| **License & Governance**       | Open Source (Apache 2.0, CNCF Graduated)                | Open Source code (Apache 2.0, CNCF Graduated) | Open Source (Apache 2.0, CNCF Graduated)               | Source-Available (BSL 1.1)                        | Open Source (Apache 2.0, CNCF Incubating)                   | Open Source (Apache 2.0)                      | Commercial (Proprietary on top of Kuma)      |

>[!note] Lesson Learn
>**Why:** A service mesh moves complex networking concerns—such as encryption, retries, traffic routing, and telemetry—out of your application code and into a dedicated infrastructure layer. This lets developers focus purely on business logic while platform teams enforce consistent security and reliability across every service.
>
>**When:** Adopt a service mesh once your architecture grows beyond roughly 15–20 microservices, spans multiple programming languages where maintaining duplicate networking libraries becomes error-prone, or faces strict compliance mandates. If you have only a handful of services in a single language, a standard API gateway and shared code libraries are simpler and avoid unnecessary operational overhead.
>
>**Common Use Cases:**
>- **Zero-Trust Security:** Automatically encrypting all internal service-to-service traffic with Mutual TLS (mTLS) and enforcing identity-based access policies for compliance (e.g., PCI-DSS, HIPAA).
>- **Progressive Delivery:** Safely rolling out updates via canary releases (routing 5% of traffic to a new version), A/B testing, or shadowing live production traffic without affecting end users.
>- **Cascading Failure Prevention & Debugging:** Applying standardized timeouts, circuit breakers, and distributed tracing across polyglot microservices to isolate slow dependencies and pinpoint bottlenecks fast.

If you want to find the comparison between service-mesh solutions, let's visit these article

- [Platform9 - Kubernetes Service Mesh: A Comparison of Istio, Linkerd, and Consul](https://platform9.com/blog/kubernetes-service-mesh-a-comparison-of-istio-linkerd-and-consul/)
- [Service Mesh Comparison](https://servicemesh.es/)
- [Solo.io - Linkerd vs. Istio: 7 Key Differences](https://www.solo.io/topics/istio/linkerd-vs-istio)
- [Solo.io - What Is a Service Mesh? Overview and Top 6 Tools](https://www.solo.io/topics/istio/service-mesh)
- [Tigera - Service Mesh: Benefits, Challenges, and 7 Key Concepts](https://www.tigera.io/learn/guides/service-mesh/)
## Istio in Action

![[icon-istio.png|center]]


>[!question] What is Istio ?
>[Istio](https://istio.io/latest/docs/overview/what-is-istio/) is an open source service mesh solution that enables developers to connect, control, monitor, and secure microservices architectures. Istio is introduced first time at 2017 by [Google](https://opensource.google/projects/istio) and currently Istio is graduated CNCF Project.

Istio provider several features for

- Secure service-to-service communication in a cluster with mutual TLS encryption, strong identity-based authentication and authorization
- Automatic load balancing for HTTP, gRPC, WebSocket, and TCP traffic
- Fine-grained control of traffic behavior with rich routing rules, retries, failovers, and fault injection
- A pluggable policy layer and configuration API supporting access controls, rate limits and quotas
- Automatic metrics, logs, and traces for all traffic within a cluster, including cluster ingress and egress

Istio is designed for extensibility and can handle a diverse range of deployment needs. With Control Plane run in Kubernetes, you can add your services into that cluster, [extend mesh for another cluster](https://istio.io/latest/docs/ops/deployment/deployment-models/), even though  [VMs or orther endpoints](https://istio.io/latest/docs/ops/deployment/vm-architecture/).

To explore more resource about Istio, you can visit these links before we take a deep walkthrough into Architecture, Concepts, and Modeling of Istio

**Officials**

- [Istio - Offcial Documentation](https://istio.io/latest/docs/)
- [Istio - What is Istio](https://istio.io/latest/docs/overview/what-is-istio/)
- [Istio - Why choose Istio?](https://istio.io/latest/docs/overview/why-choose-istio/)
- [Istio - Architecture](https://istio.io/latest/docs/ops/deployment/architecture/)
- [Istio - Istio Ecosystem](https://istio.io/latest/about/ecosystem/)
- [Istio - Install Multicluster](https://istio.io/latest/docs/setup/install/multicluster/)
- [Istio - Examples](https://istio.io/latest/docs/examples/)

**Providers**

- [Solo.io - What is Istio?](https://www.solo.io/topics/istio)
- [Solo.io - Istio architecture](https://www.solo.io/topics/istio/istio-architecture)
- [Solo.io - Istio tutorial](https://www.solo.io/topics/istio/istio-tutorial)

**Anothers**

- [GitHub - learn-istio](https://github.com/meganokeefe/learn-istio): ⛵️ Istio resources 🕸
- [Istio Service Mesh Workshop](https://www.istioworkshop.io/)
- [Alibaba - Architecture Analysis of Istio: The Most Popular Service Mesh Project](https://www.alibabacloud.com/blog/architecture-analysis-of-istio-the-most-popular-service-mesh-project_597010)
- [TheNewStack - Why Do You Need Istio When You Already Have Kubernetes?](https://thenewstack.io/why-do-you-need-istio-when-you-already-have-kubernetes/)
- [GitHub - microservices-demo](https://github.com/GoogleCloudPlatform/microservices-demo): Sample cloud-first application with 10 microservices showcasing Kubernetes, Istio, and gRPC.
- [GitHub - kiali](https://github.com/kiali/kiali): Kiali project, observability for the Istio service mesh
- [GitHub - gitops-istio](https://github.com/stefanprodan/gitops-istio): A GitOps recipe for Progressive Delivery with Flux v2, Flagger and Istio
- [Blog - Istio Ambient Mesh: The Sidecarless Methodology](https://www.cloudnativedeepdive.com/istio-ambient-mesh-the-sidecarless-methodology/)
- [anthos-service-mesh-samples](https://github.com/GoogleCloudPlatform/anthos-service-mesh-samples): sample applications used in [Anthos Service Mesh](https://cloud.google.com/service-mesh/docs/overview) (Google Mesh Istio.
- [Oracle - Istio Ambient: A New Dawn for Kubernetes Efficiency](https://blogs.oracle.com/cloud-infrastructure/istio-ambient-mode-new-dawn-kubernetes-efficiency)
- [Tigera - An In-Depth Look at Istio Ambient Mode with Calico](https://www.tigera.io/blog/an-in-depth-look-at-istio-ambient-mode-with-calico/)
### Architecture


![[thumbnail-istio-arch.svg|700]]
<div align="center">
	<p style="text-align: center;">Istio Architecture (Source: Istio)</p>
</div>

An Istio service mesh is logically split into a **data plane** and a **control plane**.

- **Control Plane**: manages and configures the proxies to route traffic.
- **Data Plane**:  Composes a set of intelligent proxies (**[Envoy](https://www.envoyproxy.io/)**) deployed as sidecar. These proxies control all communicate between microservice, and also doing the observability as telemetry collector.

>[!info] Data Plane Modes
>According on v1.32 (latest), Istio order you two modes for setting up Data Plane
>- [**sidecar mode**](https://istio.io/latest/docs/overview/dataplane-modes/#sidecar-mode), which deploys an Envoy proxy along with each pod that you start in your cluster, or running alongside services running on VMs.
>- [**ambient mode**](https://istio.io/latest/docs/overview/dataplane-modes/#ambient-mode), which uses a per-node Layer 4 proxy ([ztunnel](https://istio.io/latest/docs/ambient/overview/#ztunnel)), and optionally a per-namespace Envoy proxy for Layer 7 features ([waypoint](https://istio.io/latest/docs/ambient/overview/#waypoint-proxies)).

[**Envoy**](https://istio.io/latest/docs/ops/deployment/architecture/#envoy) is the only core component of Istio for interacting Data Plane traffic, It's the opensource and graduated project from CNCF, a high-performance proxy developed in C++ to mediate all inbound and outbound traffic for all services in the service mesh. Explore more about [Envoy Proxy at here](https://www.envoyproxy.io/)

Envoy proxies are deployed as sidecars to services, logically augmenting the services with Envoy’s many built-in features, for example:

- Dynamic service discovery
- Load balancing
- TLS termination
- HTTP/2 and gRPC proxies
- Circuit breakers
- Health checks
- Staged rollouts with %-based traffic split
- Fault injection
- Rich metrics

This sidecar work for enforcing policy decision and extract telemetry which sent to monitoring system to provide information about entire mesh.

With Envoy proxies, you don't require to touch the code or rewrite architecture, instead Istio add several capabilities into existing deployment. Here are key Istio features and tasks Envoy proxies enable:

- **Traffic control features**: enforce fine-grained traffic control with rich routing rules for HTTP, gRPC, WebSocket, and TCP traffic.
- **Network resiliency features**: setup retries, failovers, circuit breakers, and fault injection.
- **Security and authentication features**: enforce security policies and enforce access control and rate limiting defined through the configuration API.
- **Pluggable extensions model based on WebAssembly** that allows for custom policy enforcement and telemetry generation for mesh traffic.

[**Istiod**](https://istio.io/latest/docs/ops/deployment/architecture/#istiod) provides certificate management, service discovery, and configuration. It converts the high-level routing rules controlling traffic behavior into Envoy-specific configurations, propagating them to sidecars during runtime.

From v1.5, Istio already merge three components (`Pilot`, `Citadel`, `Galley`) of control plane in `istiod`. Read detail at [Introducing istiod: simplifying the control plane](https://istio.io/latest/blog/2020/istiod/)

- **Pilot** - uses the Envoy API to communicate with the Envoy sidecar. The pilot is responsible for traffic management, routing, and service inspection.
- **Citadel** - provides secure communication between services by managing user authentication, certificate and credential management.
- **Galley** - responsible for configuration management, distribution, and processing.

**About Service Discovery**, Istiod support discovery for multiple environment such as Kubernetes or VMs. [Istio’s Traffic Management API](https://istio.io/latest/docs/concepts/traffic-management/) can help instruct Istiod to refine an Envoy configuration to enforce more granular control over traffic in a service mesh.

**About Security**, Istiod security provides built-in identity and credential management to achieve strong service-to-service and end-user authentication. Additionally, Istio can help you upgrade unencrypted traffic within a service mesh.

**About Certificate Management**, Istiod functions as a certificate authority (CA), generating certificates to enable secure mTLS communication within the data plane.
### Concepts

 To catch up easier with Istio, you should intent to Istio concepts, including

- [Traffic Management](https://istio.io/latest/docs/concepts/traffic-management/): Istio’s traffic routing rules let you easily control the flow of traffic and API calls between services.
- [Security](https://istio.io/latest/docs/concepts/security/): provides a comprehensive security solution to solve traffic encryption, mTLS and fine-grained access policies, and audit tools.
- [Observability](https://istio.io/latest/docs/concepts/observability/): Istio generates detailed telemetry for all service communications within a mesh, empowering operators to troubleshoot, maintain, and optimize their applications – without imposing any additional burdens on service developers.
- [Extensibility](https://istio.io/latest/docs/concepts/extensibility/): Istio provides two primary extension mechanisms, with WebAssembly (Wasm) and Lua, both are configured using the [`TrafficExtension`](https://istio.io/latest/docs/reference/config/proxy_extensions/traffic_extension/) API, which provides a unified way to attach extensions to workloads with consistent targeting and phase/priority ordering.

**With Traffic Management**, Istio provide this concept via CRDs which easy to configuration via YAML, including

- [Virtual services](https://istio.io/latest/docs/concepts/traffic-management/#virtual-services): Defines _where_ traffic goes after entering the mesh. It handles HTTP header/path matching, percentage-based traffic splitting (canary rollouts), retries, timeouts, and fault injection.
- [Destination rules](https://istio.io/latest/docs/concepts/traffic-management/#destination-rules): Defines _what happens_ to traffic once routed to a destination—configuring load-balancing algorithms, connection pools, TLS settings, and circuit breakers.
- [Gateways](https://istio.io/latest/docs/concepts/traffic-management/#gateways): Manages traffic entering or leaving the edge of the mesh (Ingress/Egress), handling ports, TLS termination, and exposed hostnames.
- [Service entries](https://istio.io/latest/docs/concepts/traffic-management/#service-entries): Registers external dependencies (like third-party APIs or legacy databases) into Istio’s internal registry so you can apply mesh routing and resilience policies to outbound calls.
- [Sidecars](https://istio.io/latest/docs/concepts/traffic-management/#sidecars): To configure the envoy proxy sidecar, for port and protocol accepted, and limit the sets of service that proxy can reach. 

You can find others CRDs of Traffic Managment at [Traffic Management Reference](https://istio.io/latest/docs/reference/config/networking/)

>[!info] More about Traffic Managmenent
>Istio support Traffic Management with various option, from [Kubernetes Ingress](https://istio.io/latest/docs/tasks/traffic-management/ingress/kubernetes-ingress/), Istio [Ingress](https://istio.io/latest/docs/tasks/traffic-management/ingress/ingress-control/)/[Egress](https://istio.io/latest/docs/tasks/traffic-management/egress/egress-gateway/) Gateway, and [Kubernetes Gateway](https://istio.io/latest/docs/tasks/traffic-management/ingress/gateway-api/).
>

**With Security**, Istio also operate and provide CRDs to let you define concept via YAML

- [PeerAuthentication](https://istio.io/latest/docs/reference/config/security/peer_authentication/): Assigns every service strong identity and automatically encrypts service-to-service traffic with Mutual TLS.
- [RequestAuthentication](https://istio.io/latest/docs/reference/config/security/request_authentication/): Validates incoming JWT tokens from identity providers (like Auth0 or Keycloak) at the proxy level.
- [AuthorizationPolicy](https://istio.io/latest/docs/reference/config/security/authorization-policy/): Enforces fine-grained rules dictating which services or users can call specific endpoints or HTTP methods.

**With Observability**, Istio generates the following types of telemetry in order to provide overall service mesh observability

- [Metrics](https://istio.io/latest/docs/concepts/observability/#metrics). Istio generates a set of service metrics based on the four “golden signals” of monitoring (latency, traffic, errors, and saturation). Istio also provides detailed metrics for the control plane.
- [Distributed Traces](https://istio.io/latest/docs/concepts/observability/#distributed-traces). Istio generates distributed trace spans for each service, providing operators with a detailed understanding of call flows and service dependencies within a mesh.
- [Access Logs](https://istio.io/latest/docs/concepts/observability/#access-logs). Istio can generate a full record of each request, including source and destination metadata.

**With Extensible**, Istio provide them via CRDs

- [WasmPlugin](https://istio.io/latest/docs/reference/config/proxy_extensions/wasm-plugin/): Provides a mechanism to extend the functionality provided by the Istio proxy through WebAssembly filters.
- [TrafficExtension](https://istio.io/latest/docs/reference/config/proxy_extensions/traffic_extension/): Provides a mechanism to extend the functionality provided by the Istio proxy through WebAssembly or Lua filters.
### Deployment Models

![[thumbnail-istio-multi-primary.png]]
<div align="center">
	<p style="text-align: center;">Primary clusters with endpoint discovery (Source: Istio)</p>
</div>

Istio is the flexible solution to help you choose what deployment models match to your expectation (your availability requirements, network boundaries, and operational maturity), including

1. [single or multiple cluster](https://istio.io/latest/docs/ops/deployment/deployment-models/#cluster-models): The workload instances of your application run in one or more clusters.
2. [single or multiple network](https://istio.io/latest/docs/ops/deployment/deployment-models/#network-models): Istio supports spanning a service mesh over a variety of network topologies.
3. [single or multiple control plane](https://istio.io/latest/docs/ops/deployment/deployment-models/#control-plane-models): Istio support setup Istio with in-cluster control plane or many control plane for multicluster mesh.
4. [single or multiple mesh](https://istio.io/latest/docs/ops/deployment/deployment-models/#mesh-models): Istio supports having all of your services in a mesh, or federating multiple meshes together, which is also known as multi-mesh.

An application’s workload instances can run in one or more Kubernetes clusters. Confining clusters to an availability zone or region provides high availability, performance, and isolation. A production system can run in a multi-cluster service mesh over different zones and regions, with cloud load balancers handling locality and regional or zonal failover.

Usually, a cluster forms the boundary for endpoint discovery and configuration, for instance, with an API server managing the configuration for each cluster discovery. Kubernetes supports this per-cluster configuration, so this approach minimizes the issues associated with misconfiguration.

Istio lets you configure a service mesh spanning multiple clusters.

[**Single-Cluster**](https://istio.io/latest/docs/ops/deployment/deployment-models/#single-cluster): All workloads and a single `istiod` control plane run inside one Kubernetes cluster.

- **Best for:** Teams starting with Istio, development/staging environments, and applications that do not require cross-region or cross-cluster failover.
- **Trade-off:** Lowest operational complexity, but the cluster is a single point of failure.

**[Multi-Cluster](https://istio.io/latest/docs/ops/deployment/deployment-models/#multiple-clusters)**: You can configure a single mesh to include multiple clusters. Using a multicluster deployment within a single mesh affords the following capabilities beyond that of a single cluster deployment

- **Best for**: Fault isolation and fail over, location-aware routing and fail over, various [control plane models](https://istio.io/latest/docs/ops/deployment/deployment-models/#control-plane-models) support different levels of availability, team or project isolation.
- **Trade-off**: Increase complexity

You can setup Multi-Cluster in serveral designs, including

- [Primary-Remote](https://istio.io/latest/docs/setup/install/multicluster/primary-remote/)
- [Primary Remote on different networks](https://istio.io/latest/docs/setup/install/multicluster/primary-remote_multi-network/)
- [Multi-Primary](https://istio.io/latest/docs/setup/install/multicluster/multi-primary/)
- [Multi-Primary on different networks](https://istio.io/latest/docs/setup/install/multicluster/multi-primary_multi-network/)

>[!question] DNS with multiple clusters
>DNS in a multi-cluster Istio mesh is complicated because **Kubernetes DNS is strictly cluster-scoped, while Istio’s service registry is mesh-wide**. Because applications perform DNS resolution _before_ sending network packets, a failed local DNS lookup stops traffic before the Istio proxy ever gets a chance to route it.
>
>To ensure that DNS lookup succeeds, you must deploy a Kubernetes `Service` to each cluster that consumes that service. This ensures that regardless of where the request originates, it will pass DNS lookup and be handed to Istio for proper routing. This can also be achieved with Istio `ServiceEntry`, rather than Kubernetes `Service`. However, a `ServiceEntry` does not configure the Kubernetes DNS server. This means that DNS will need to be configured either manually or with automated tooling such as the [Address auto allocation](https://istio.io/latest/docs/ops/configuration/traffic-management/dns-proxy/#address-auto-allocation) feature of [Istio DNS Proxying](https://istio.io/latest/docs/ops/configuration/traffic-management/dns-proxy/). Istio also recommend two DNS solution to help a hand by [Admiral](https://github.com/istio-ecosystem/admiral) or [Kubernetes Multi-Cluster Services (MCS API)](https://github.com/kubernetes/enhancements/tree/master/keps/sig-multicluster/1645-multi-cluster-services-api)

>[!done] Conclusion
>Beside the Cluster, you can choose another setup, but with me Clusters is look mature and clear to adopt by any team required Istio for Service Mesh. You can take a look for quick double-check about Deployment Models of Istio below for easier making decision.

| **Deployment Solution**             | **Control Plane (istiod)**                     | **Network Requirement**                           | **Availability & Blast Radius**                            | **Operational Complexity**                        | **Best Use Case**                                                                             |
| ----------------------------------- | ---------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **Single-Cluster**                  | 1 local `istiod`                               | Single flat network                               | Single cluster failure domain                              | **Low**                                           | Starting with Istio, dev/staging, or apps not needing cross-cluster failover.                 |
| **Primary-Remote (Single Network)** | 1 primary `istiod` managing remote clusters    | Flat network (non-overlapping pod CIDRs)          | Remote clusters lose config/cert updates if primary fails  | **Moderate**                                      | Centralized management of multiple small clusters inside the same VPC/region.                 |
| **Primary-Remote (Multi-Network)**  | 1 primary `istiod` + East-West Gateways        | Separate networks / overlapping CIDRs allowed     | Primary cluster is a control-plane single point of failure | **Moderate–High**                                 | Connecting isolated VPCs or edge clusters under one central platform team.                    |
| **Multi-Primary (Single Network)**  | 1 `istiod` per cluster (all active)            | Flat network (non-overlapping pod CIDRs)          | **High** — isolated control-plane failure domains          | **High** (must prevent config drift)              | High availability across multiple clusters within a single shared cloud network.              |
| **Multi-Primary (Multi-Network)**   | 1 `istiod` per cluster + East-West Gateways    | Separate networks / clouds / regions              | **Highest** — full regional & control-plane isolation      | **Very High** (CA sync, gateways, remote secrets) | Enterprise multi-region disaster recovery, hybrid cloud, and strict blast-radius isolation.   |
| **External Control Plane**          | Dedicated control-plane cluster (no workloads) | Network route from data planes to control cluster | Control plane isolated from workload spikes/attacks        | **High**                                          | Managed service mesh offerings or strict separation between platform admins and app clusters. |
| **Multi-Mesh (Federation)**         | Separate `istiod` & separate Root CA per mesh  | Gateway-to-gateway federation                     | Complete fault & administrative isolation                  | **Very High**                                     | Independent business units, M&A, or overlapping namespace/service names that must not merge.  |

>[!hint] Another Concept (Hybrid Model)
>A unique feature of Istio is that it supports both containerized workloads and those running in [virtual machines (VMs)](https://istio.io/latest/docs/ops/deployment/vm-architecture/). Istio’s VM support allows you to connect workloads outside of your Kubernetes cluster to a mesh. Istio provides two mechanisms to represent virtual machine workloads:
>- [`WorkloadGroup`](https://istio.io/latest/docs/reference/config/networking/workload-group/) represents a logical group of virtual machine workloads that share common properties. This is similar to a `Deployment` in Kubernetes.
>- [`WorkloadEntry`](https://istio.io/latest/docs/reference/config/networking/workload-entry/) represents a single instance of a virtual machine workload. This is similar to a `Pod` in Kubernetes.

## Setup Istio Mesh in Kubewekend

Now let's setup Istio in **Kubewekend** to practice Istio concepts below, and see what feature Istio order for us

- Sidecar and Ambient Mode
- Traffic Management with Ingress Gateway and Egress Gateway
- mTLS and Policies enforcement (Valid on Kubewekend)
- Multi-Cluster in different network (Valid on Kubewekend)

Here are these lab and articles, which I got inspired to built the own version on Kubewekend. You can overview them before reaching out Kubewekend version

- [Solo.io - Istio tutorial](https://www.solo.io/topics/istio/istio-tutorial)
- [Istio Service Mesh Workshop](https://www.istioworkshop.io/)
- [Istio - Bookinfo Application](https://istio.io/latest/docs/examples/bookinfo/)
- [Medium - Enterprise Kubernetes Networking: CNI, Service Mesh, Multi-Cluster & Gateway API](https://medium.com/codex/enterprise-kubernetes-networking-cni-service-mesh-multi-cluster-gateway-api-2284f6782172)
- [Cloud Native Deep Dive - Managing Traffic In Kubernetes For Gateways & Service Mesh](https://www.cloudnativedeepdive.com/managing-traffic-in-kubernetes-for-gateways-service-mesh/)
- [Medium - Kubernetes Traffic Management: Combining Gateway API with Service Mesh for North-South and East-West Use Cases](https://medium.com/@disha.20.10/kubernetes-traffic-management-combining-gateway-api-with-service-mesh-for-north-south-and-63e39ad95dcc)
- [Medium - Securing Kubernetes Layer by Layer: An OSI Approach (Part 2 : L4)](https://itnext.io/securing-kubernetes-layer-by-layer-an-osi-approach-part-2-l4-498c69f951fc)
- [Blog - Istio Ambient Mesh: The Sidecarless Methodology](https://www.cloudnativedeepdive.com/istio-ambient-mesh-the-sidecarless-methodology/)

Let's spin up a single-node **K3s** cluster on a VM, VPS, or cloud host of your choice using `kubewekend` from [GitHub - Kubewekend](https://github.com/Xeus-Territory/kubewekend)

```bash
git clone https://github.com/Xeus-Territory/kubewekend.git
cd kubewekend
pip install -r requirements.txt
./scripts/setup.sh config show
```

![[thumbnail-kubewekend-k3s-config.png]]

>[!info] VPS Specifications
>My experimental VPS machine is provisioned with: 2 vCPUs – 8 GB RAM – Ubuntu 24.04 LTS.

Next, configure your Ansible inventory with your target VPS IP address and SSH credentials, then verify connectivity

```bash
# Setup inventory with your SSH and IP of VPS
./scripts/setup.sh inventory set-remote

# Test connectivity before setup
./scripts/setup.sh inventory ping standalone-masters
```

After status return successful, you can run command to setup `k3s` cluster, this will install `install_common` with various opensource, and tool to help you workaroud with kubernetes inside host, and `setup_k3s` to setup K3s Cluster with configuration

```bash
./scripts/setup.sh k3s setup --host k8s-master-machine --ask-become-pass
```

You can execute `kubectl` directly on the VPS, or you can get `kubeconfig` to your host and practice with K3s Cluster from remote-vps

```bash
  ssh <master> 'sudo -S cat /etc/rancher/k3s/k3s.yaml' > ~/.kube/config
  # Then replace 127.0.0.1 with the master node IP in the kubeconfig
  sed -i 's/127.0.0.1/<master_ip>/g' ~/.kube/config
```

```bash
kubectl get pods -A
```

![[thumbnail-kubewekend-k3s-bootstrap.png]]

Before go to setup, Istio offer [`istioctl`](https://istio.io/latest/docs/setup/install/istioctl/) for easier help us deploy and setup Istio inside Kubernetes for both profile **Sidecar** or **Ambient**. In the situation, you prefer to use `helm` to setup `istio` than CLI, you can double-check detail at

- [Istio - Install with Helm (Sidecar)](https://istio.io/latest/docs/setup/install/helm/)
- [Istio - Install with Helm (Ambient)](https://istio.io/latest/docs/ambient/install/helm/)
- [Istio Helm Chart](https://github.com/istio/istio/tree/1.32.0/manifests/charts)

**Setup Helm**

```bash
# (charts for official release versions)
helm repo add istio https://blob.istio.io/istio-release/charts
helm repo update
```

**Setup Istioctl**

```bash
# Download release istio
curl -L https://istio.io/downloadIstio | ISTIO_VERSION=1.32.0 TARGET_ARCH=x86_64 sh -

# Export CLI PATH
cd istio-1.32.0 && export PATH="$PWD/bin:$PATH"
```

>[!warning] Istio Configuration Profiles
>Istio can operate by several profiles, and for ensuring you know what will work in that profile, you can check-out them at [Istio - Installation Configuration Profiles](https://istio.io/latest/docs/setup/additional-setup/config-profiles/)
>
>Configuration profiles compose with other values overrides or flags, so any individual value a configuration profile sets can be manually overridden by specifying a `--set` flag after it in the command.
>
>There are 2 kinds of configuration profiles: _deployment_ profiles and _platform_ profiles, and using both is recommended.
>- _deployment_ profiles are intended to provide good defaults for a given deployment topology (`default`, `remote`, `ambient`, etc).
>- _platform_ profiles are intended to provide necessary platform-specific defaults, for a given target platform (`eks`, `gke`, `openshift`, etc).

```bash
# By helm
helm install istiod istio/istiod -n istio-system --set profile=default --set global.platform=gke --wait

# By istioctl
istioctl install --set profile=default --set values.global.platform=gke
```
### Sidecar and Ambient Mode

Before hit to detail, you should overview again which mode to choose betweeen [Sidecar or ambient?](https://istio.io/latest/docs/overview/dataplane-modes/), This decision will define which architecture of data plane, offering two distinct operational models for intercepting and securing workload traffic:

- **Sidecar Mode:** Injects a dedicated Envoy proxy container into every application pod (via `istio-injection=enabled` or native Kubernetes sidecar containers). Every pod handles both Layer 4 (mTLS) and Layer 7 (HTTP routing, retries, telemetry) independently, giving strict per-pod isolation at the cost of higher memory overhead and pod restarts during proxy upgrades.

- **Ambient Mode:** Eliminates sidecar containers by splitting L4 and L7 processing into two shared tiers:
    
    - **`ztunnel` (Layer 4):** A lightweight Rust-based DaemonSet running per node that handles mTLS encryption, SPIFFE identity, L4 authorization, and TCP telemetry over [**HBONE**](https://istio.io/latest/docs/ambient/architecture/hbone/) (HTTP/2 `CONNECT` tunnels) without restarting application pods.
    - **Waypoint Proxies (Layer 7):** Optional, per-namespace or per-service Envoy deployments managed via the **Kubernetes Gateway API**, deployed only when workloads require L7 HTTP routing, canary splitting, or JWT validation.

| **Dimension**          | **Sidecar Mode**                                         | **Ambient Mode**                                    |
| ---------------------- | -------------------------------------------------------- | --------------------------------------------------- |
| **Proxy Footprint**    | 1 Envoy proxy per Pod                                    | 1 `ztunnel` per Node + optional L7 Waypoints        |
| **Workload Restarts**  | Required to enroll/upgrade proxies                       | Zero restarts (`istio.io/dataplane-mode=ambient`)   |
| **L4 vs. L7 Coupling** | Always coupled in every pod                              | Decoupled (L4 always on; L7 opt-in via Waypoint)    |
| **Configuration API**  | Classic Istio APIs (`VirtualService`, `DestinationRule`) | Kubernetes **Gateway API** (`Gateway`, `HTTPRoute`) |

- **Choose Istio Ambient + Waypoints** for almost all new deployments. You get the exact same L7 features as Sidecar mode with significantly lower memory overhead, no pod restarts during Istio upgrades, and the ability to pay the L7 cost only on the specific namespaces that need it.
- **Choose Istio Sidecar** only if you need strict single-tenant proxy isolation per pod (e.g., untrusted multi-tenant workloads where sharing a node/namespace proxy is a security concern) or rely on legacy custom `EnvoyFilter` / WebAssembly (Wasm) plugins not yet supported in Waypoints.

>[!info] Ambient Data Plane
>According to [Istio - Ambient data plane](https://istio.io/latest/docs/ambient/architecture/data-plane/), Workload can fall into 3 categories
>1. **Out of Mesh**: a standard pod without any mesh features enabled. Istio and the ambient data plane are not enabled.
>2. **In Mesh**: a pod that is included in the ambient data plane, and has traffic intercepted at the Layer 4 level by ztunnel. In this mode, L4 policies can be enforced for pod traffic. This mode can be enabled by setting the `istio.io/dataplane-mode=ambient` label. See [labels](https://istio.io/latest/docs/ambient/usage/add-workloads/#ambient-labels) for more details.
>3. **In Mesh, Waypoint enabled**: a pod that is _in mesh_ _and_ has a waypoint proxy deployed. In this mode, L7 policies can be enforced for pod traffic. This mode can be enabled by setting the `istio.io/use-waypoint` label. See [labels](https://istio.io/latest/docs/ambient/usage/add-workloads/#ambient-labels) for more details.
>
>Depending on which category a workload is in, the traffic path will be different.

The following table summarizes how sidecar-mode resources map to their ambient equivalents:

| Sidecar resource                                                              | Action in ambient mode                                                                                                                                         |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VirtualService`                                                              | Migrate to `HTTPRoute` (`VirtualService` support is Alpha in ambient)                                                                                          |
| `DestinationRule` (traffic policies: connection pool, outlier detection, TLS) | No change; waypoints apply traffic policies                                                                                                                    |
| `DestinationRule` (routing subsets used with `HTTPRoute`)                     | Create version-specific Kubernetes Services as `backendRefs` for `HTTPRoute`                                                                                   |
| `AuthorizationPolicy` with L4 rules                                           | No change; ztunnel enforces L4 policies directly                                                                                                               |
| `AuthorizationPolicy` with L7 rules                                           | Attach to waypoint using `targetRefs`                                                                                                                          |
| `RequestAuthentication`                                                       | Attach to waypoint using `targetRefs`                                                                                                                          |
| `EnvoyFilter`                                                                 | Not supported on waypoints                                                                                                                                     |
| `WasmPlugin`                                                                  | Attach to waypoint using `targetRefs`                                                                                                                          |
| `Gateway` (networking.istio.io/v1)                                            | No change required; Istio Gateway resources continue to work in ambient mode. Add `istio.io/ingress-use-waypoint` to route ingress traffic through a waypoint. |

>[!info] Migrate from Sidecar to Ambient
>Recently,, Istio allow you to migrate from Sidecar to Ambient. The migration is designed to be gradual and reversible: sidecar and ambient workloads can coexist in the same mesh during the process, allowing you to migrate one namespace at a time. Explore more at [Istio - Migrate from Sidecar to Ambient](https://istio.io/latest/docs/ambient/migrate/)

Now we will setup both mode, and try to setup and compare between two mode with specific application. I prefer to use `helm` to installation, so ensure you already finish step add `helm repo` of istio above to local, and ready to setup into target cluster.

For both system, you require to setup `base` chart for CRDs and ValidationWebhook of Istio. See more value at [Artifact Hub - istio-base](https://artifacthub.io/packages/helm/istio-official/base)

```bash
helm upgrade --install istio-base istio/base -n istio-system --version 1.32.0 --create-namespace --set defaultRevision=default

# validate
helm ls -n istio-system
```

You can validate API of Istio appearance by command

```bash
kubectl api-resources --api-group=networking.istio.io                

NAME               SHORTNAMES   APIVERSION                     NAMESPACED   KIND
destinationrules   dr           networking.istio.io/v1         true         DestinationRule
envoyfilters                    networking.istio.io/v1alpha3   true         EnvoyFilter
gateways           gw           networking.istio.io/v1         true         Gateway
proxyconfigs                    networking.istio.io/v1beta1    true         ProxyConfig
serviceentries     se           networking.istio.io/v1         true         ServiceEntry
sidecars                        networking.istio.io/v1         true         Sidecar
virtualservices    vs           networking.istio.io/v1         true         VirtualService
workloadentries    we           networking.istio.io/v1         true         WorkloadEntry
workloadgroups     wg           networking.istio.io/v1         true         WorkloadGroup
```

Next, we will install `istiod` for setting up control plane of istio, this component also require by two mode. Explore more value at [Artifact Hub - istiod](https://artifacthub.io/packages/helm/istio-official/istiod)

```bash
helm upgrade --install istiod istio/istiod -n istio-system --version 1.32.0 --create-namespace --wait

helm ls -n istio-system
```

>[!done] Sidecar Mode Ready
>Now you are setup fully sidecar mode, because core in default will available when you enable namespace with label `istio-injection=enable`. Explore more at [Controlling the injection policy](https://istio.io/latest/docs/setup/additional-setup/sidecar-injection/#controlling-the-injection-policy)

Now let's try to create a sidecar namespace with label `istio-injection=enable`

```bash
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Namespace
metadata:
  name: lab-sidecar
  labels:
    istio-injection: enabled
EOF
```

Now create pod run inside namespace `lab-sidecar`, it will deploy one sidecar for proxy attached with workload

```bash
kubectl create deployment sidecar-nginx --namespace=lab-sidecar --image nginx:1.27-alpine
```

After this deployment create, `nginx` pod expect will have `2/2` with one of them is `istio-proxy` sidecar

```bash
kubectl get pods -n lab-sidecar                                      
NAME                            READY   STATUS    RESTARTS   AGE
sidecar-nginx-bd9968b54-d8zqd   2/2     Running   0          117s

# View detail
kubectl get pods -n lab-sidecar sidecar-nginx-xxx-yyy -o yaml
kubectl describe -n lab-sidecar sidecar-nginx-xxx-yyyy
kubectl log -n lab-sidecar sidecar-nginx-xxx-yyyy istio-proxy -f
```

Next we will finish setup `istio` for enable ambient mode, with `ztunnel` and `istio-cni`, Explore more them at [Istio - Ztunnel traffic redirection](https://istio.io/latest/docs/ambient/architecture/traffic-redirection/). Because **Ambinent Mode** is using  **Kubernetes Gateway API CRDs**, therefore ensure it install, with **Kubewekend**, it will enable by default to version `v1.6.3`. Check again with command

```bash
kubectl api-resources --api-group=gateway.networking.k8s.io

NAME                 SHORTNAMES   APIVERSION                     NAMESPACED   KIND
backendtlspolicies   btlspolicy   gateway.networking.k8s.io/v1   true         BackendTLSPolicy
gatewayclasses       gc           gateway.networking.k8s.io/v1   false        GatewayClass
gateways             gtw          gateway.networking.k8s.io/v1   true         Gateway
grpcroutes                        gateway.networking.k8s.io/v1   true         GRPCRoute
httproutes                        gateway.networking.k8s.io/v1   true         HTTPRoute
listenersets         lset         gateway.networking.k8s.io/v1   true         ListenerSet
referencegrants      refgrant     gateway.networking.k8s.io/v1   true         ReferenceGrant
tcproutes                         gateway.networking.k8s.io/v1   true         TCPRoute
tlsroutes                         gateway.networking.k8s.io/v1   true         TLSRoute
udproutes                         gateway.networking.k8s.io/v1   true         UDPRoute
```

Next enable `istio` with `profile=ambient`

```bash
helm upgrade --install istiod istio/istiod -n istio-system --version 1.32.0 --create-namespace --wait \
--reuse-values \
--set profile=ambient
```

Next install `istio-cni`, The `cni` chart installs the Istio CNI node agent. It is responsible for detecting the pods that belong to the ambient mesh, and configuring the traffic redirection between pods and the ztunnel node proxy (which will be installed later). Explore more at [Artifact Hub - cni](https://artifacthub.io/packages/helm/istio-official/cni)

```bash
helm upgrade --install istio-cni istio/cni -n istio-system \
--version 1.32.0 --wait \
--set profile=ambient 
```

Now we setup `ztunnel` chart installs the ztunnel DaemonSet, which is the node proxy component of Istio’s ambient mode. [Artifact Hub - ztunnel](https://artifacthub.io/packages/helm/istio-official/ztunnel)

```bash
helm upgrade --install ztunnel istio/ztunnel -n istio-system \
--version 1.32.0 --wait
```

```bash
kubectl get deployment,daemonset -n istio-system

NAME                     READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/istiod   1/1     1            1           49m

NAME                            DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR            AGE
daemonset.apps/istio-cni-node   1         1         0       1            0           kubernetes.io/os=linux   3m20s
daemonset.apps/ztunnel          1         1         1       1            1           kubernetes.io/os=linux   65s
```

>[!done] Ambient Mode Ready
>Now full component in `istio-system` already run with `ambient` mode. Ambient mode will effect with namespace use label `istio.io/dataplane-mode=ambient`. Explore more at [Ambient Label Reference](https://istio.io/latest/docs/ambient/usage/add-workloads/#ambient-labels)

Now create namespace for Ambient Mode

```bash
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Namespace
metadata:
  name: lab-ambient
  labels:
    istio.io/dataplane-mode: ambient
EOF
```

Next do same work as test with sidecar, we will deploy `nginx` in ambient namespace

```bash
kubectl create deployment ambient-nginx --namespace=lab-ambient --image nginx:1.27-alpine
```

It will expect with only `1/1` pod without any proxy like sidecar

```bash
kubectl get pods -n lab-ambient 
NAME                             READY   STATUS    RESTARTS   AGE
ambient-nginx-75b48c4c9f-h6qrj   1/1     Running   0          14s
```

Now we will compare what the control plane sees

```bash
$ istioctl proxy-status

NAME                                          CLUSTER        ISTIOD                      VERSION     SUBSCRIBED TYPES
sidecar-nginx-bd9968b54-d8zqd.lab-sidecar     Kubernetes     istiod-7f75b68958-8jwwx     1.32.0      4 (CDS,LDS,EDS,RDS)
ztunnel-mt6nr.istio-system                    Kubernetes     istiod-7f75b68958-8jwwx     1.32.0      2 (WADS,WDS)

istioctl ztunnel-config workloads | grep -E 'NAMESPACE|lab-'

NAMESPACE    POD NAME                                          ADDRESS      NODE        WAYPOINT PROTOCOL
lab-ambient  ambient-nginx-75b48c4c9f-h6qrj                    10.42.0.53   wxops-amd64 None     HBONE
lab-sidecar  sidecar-nginx-bd9968b54-d8zqd                     10.42.0.48   wxops-amd64 None     TCP
```

- `proxy-status` list **one proxy per sidecar Pod** and ztunnel. The ambient Pods are not in it: they have no proxy of their own.
- `ztunnel-config workloads` lists every workload ztunnel knows about with protocol HBONE. With Sidecar that will show protocol TCP, and The `WAYPOINT` column is `None` until a waypoint serves them
### Traffic Management with Istio Ingress Gateway

Main purpose of Istio is about Traffic Management, and it support various options, including

- Kubernetes [Ingress](https://istio.io/latest/docs/tasks/traffic-management/ingress/kubernetes-ingress/) resources
- [Istio Gateway](https://istio.io/latest/docs/concepts/traffic-management/#gateways) with [Gateway](https://istio.io/latest/docs/reference/config/networking/gateway)
- [Kubernetes Gateway](https://gateway-api.sigs.k8s.io/) resource

>[!info] Recommend from Istio
>A `Gateway` provides more extensive customization and flexibility than `Ingress`, and allows Istio features such as monitoring and route rules to be applied to traffic entering the cluster.

Because go to setup, you need to distinguish between **Istio Gateway** and **Kubernetes Gateway**, both of them also provide the `gateway` with their API Group, therefore you should be declare and get exactly what type you want to create, before it mess-up

```bash
# Kubernetes gateway
kubectl get gateways.gateway.networking.k8s.io

# Istio gateway
kubectl get gateways.networking.istio.io
```

Before setup `gateway` chart, you need to remove `traefik` to claim again LoadBalancer IP for `gateway` type: LoadBalancer which route traffic via Istio instead traefik in this siutation

```bash
helm uninstall -n kube-system traefik
```

To operate any routing and traffic managment, you should setup [gateway](https://istio.io/latest/docs/setup/additional-setup/gateway/) with `gateway` charts to define any types above. Explore more at [ArtifactHub - gateway](https://artifacthub.io/packages/helm/istio-official/gateway)

```bash
helm upgrade --install istio-ingressgateway istio/gateway -n istio-ingress --create-namespace --version 1.32.0
```

Now get the status and start confguration with `istio-ingressgateway`

```bash
kubectl get pods -n istio-ingress
kubectl get services -n istio-ingress
```

>[!done]
>It will ready when **External-IP** is assigned into istio with LoadBalancer IP of Kubewekend

First, we will try to setup `ingress`, using this controller by define `ingressClass` and `ingress` for service. Exlore more at 

```bash
cat <<EOF | kubectl apply -f -
apiVersion: networking.k8s.io/v1
kind: IngressClass
metadata:
  name: istio
spec:
  controller: istio.io/ingress-controller
EOF
```

Now try to setup `nginx.kubewekend.local` with `ingressClass` to nginx-pod in `lab-sidecar` for example

```bash
kubectl expose deployment -n lab-sidecar sidecar-nginx --port 80 --target-port 80
kubectl create ingress -n lab-sidecar sidecar-nginx --class istio --rule=nginx.kubewekend.local/\*=sidecar-nginx:80

# View again
kubectl get service,ingress -n lab-sidecar
```

```bash
curl -v -H 'Host: nginx.kubewekend.local' http://YOUR-GATEWAY-IP/

> GET / HTTP/1.1
> Host: nginx.kubewekend.local
> User-Agent: curl/8.5.0
> Accept: */*
> 
< HTTP/1.1 200 OK
< server: istio-envoy
< date: Thu, 26 Nov 2026 01:15:22 GMT
< content-type: text/html
< content-length: 615
< last-modified: Wed, 16 Apr 2025 12:55:34 GMT
< etag: "67ffa8c6-267"
< accept-ranges: bytes
< x-envoy-upstream-service-time: 2
< 
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

>[!question]
>You won't see any load-balancer ip attached into `sidecar-nginx`, but your traffic also access, it already ingress and configure traffic via `istio-envoy`

Next we will setup `ingress-gateway` of istio and Kubernetes API in `lab-ambient` namespace

**Istio APIs** with `Gateway` and `VirtualService`

```bash
# expose service
kubectl expose -n lab-ambient deployment ambient-nginx --port 80 --target-port=80

# setup istio-gateway
cat <<EOF | kubectl apply -n lab-ambient -f -
apiVersion: networking.istio.io/v1
kind: Gateway
metadata:
  name: nginx-istio-gateway
spec:
  # The selector matches the ingress gateway pod labels.
  # If you installed Istio using Helm following the standard documentation, this would be "istio=ingress"
  selector:
    istio: ingressgateway
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - "nginx-istio-gateway.kubewekend.local"
EOF
```

Next we setup `VirtualService` via `gateway`

```bash
cat <<EOF | kubectl apply -n lab-ambient -f -
apiVersion: networking.istio.io/v1
kind: VirtualService
metadata:
  name: nginx-istio
spec:
  hosts:
  - "nginx-istio-gateway.kubewekend.local"
  gateways:
  - nginx-istio-gateway
  http:
  - match:
    - uri:
        prefix: /
    route:
    - destination:
        port:
          number: 80
        host: ambient-nginx
EOF
```

Test request with `curl`

```bash
curl -v -H 'Host: nginx-istio-gateway.kubewekend.local' http://YOUR-GATEWAY-IP/

> GET / HTTP/1.1
> Host: nginx-istio-gateway.kubewekend.local
> User-Agent: curl/8.5.0
> Accept: */*
> 
< HTTP/1.1 200 OK
< server: istio-envoy
< date: Thu, 26 Nov 2026 01:36:28 GMT
< content-type: text/html
< content-length: 615
< last-modified: Wed, 16 Apr 2025 12:55:34 GMT
< etag: "67ffa8c6-267"
< accept-ranges: bytes
< x-envoy-upstream-service-time: 14
< 
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

Now you already route traffic via istio-gateway. Next we will try to provision with **Kubernetes CRDs** to see anything different with **HTTPRoute** and **Gateway**

```bash
cat <<EOF | kubectl apply -n lab-ambient -f -
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: kubernetes-gateway
spec:
  gatewayClassName: istio
  listeners:
  - name: http
    hostname: "nginx-gateway.kubewekend.local"
    port: 80
    protocol: HTTP
    allowedRoutes:
      namespaces:
        from: Same
---
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: nginx-gateway
spec:
  parentRefs:
  - name: kubernetes-gateway
  hostnames: ["nginx-gateway.kubewekend.local"]
  rules:
  - matches:
    - path:
        type: PathPrefix
        value: /
    backendRefs:
    - name: ambient-nginx
      port: 80
EOF
```

>[!warning]
>When you provision `gatewayClassName: istio`, it will provision your Gateway as the LoadBalancer, if your host doesn't create with `metallb` or any VIP LB, it will stuck to create Gateway.

The way to fix this problem is turn into `ClusterIP` with annotate `networking.istio.io/service-type: ClusterIP`, that will turn into service address, and you use gateway via `port-forward` or, you need another controller to expose this traffic, e.g: assign hostname of gateway to service LB of istio. You need to

- Move Gateway from lab-ambient to `istio-ingress` to use this hostname from that namespace, it doesn't create Gateway use another hostname across-namespace
- Instead use Gateway in one namespace, you can turn this gateway into `Same` --> `All`
- Set the `parentRefs` of `HTTPRoute` to this gateway with `namespace` specific

```bash
kubectl delete -n lab-ambient gateways.gateway.networking.k8s.io kubernetes-gateway
```

```bash {7,10-12,20}
cat <<EOF | kubectl apply -n istio-ingress -f -
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: kubernetes-gateway
  annotations:
    networking.istio.io/service-type: ClusterIP
spec:
  gatewayClassName: istio
  addresses:
  - type: Hostname
    value: istio-ingressgateway.istio-ingress.svc.cluster.local
  listeners:
  - name: http
    hostname: "nginx-gateway.kubewekend.local"
    port: 80
    protocol: HTTP
    allowedRoutes:
      namespaces:
        from: All
EOF
```

```bash {9}
cat <<EOF | kubectl apply -n lab-ambient -f -
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: nginx-gateway
spec:
  parentRefs:
  - name: kubernetes-gateway
    namespace: istio-ingress
  hostnames: ["nginx-gateway.kubewekend.local"]
  rules:
  - matches:
    - path:
        type: PathPrefix
        value: /
    backendRefs:
    - name: ambient-nginx
      port: 80
EOF
```

Now let's try again with `curl` command

```bash
curl -v -H 'Host: nginx-gateway.kubewekend.local' http://YOUR-GATEWAY-IP/

> GET / HTTP/1.1
> Host: nginx-gateway.kubewekend.local
> User-Agent: curl/8.5.0
> Accept: */*
> 
< HTTP/1.1 200 OK
< server: istio-envoy
< date: Thu, 26 Nov 2026 02:45:09 GMT
< content-type: text/html
< content-length: 615
< last-modified: Wed, 16 Apr 2025 12:55:34 GMT
< etag: "67ffa8c6-267"
< accept-ranges: bytes
< x-envoy-upstream-service-time: 2
< 
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

But you can manipulate this **Kubernetes Gateway** by use ambient mode with [WayPoint](https://istio.io/latest/docs/ambient/usage/waypoint/) for ingress traffic, even thougt waypoint is using for **east-west (service-to-service inside the mesh)**

| Feature                  | Ingress Gateway (`gatewayClassName: istio`)          | Waypoint Proxy (`gatewayClassName: istio-waypoint`)              |
| ------------------------ | ---------------------------------------------------- | ---------------------------------------------------------------- |
| **Traffic Direction**    | **North-South** (external internet → cluster)        | **East-West** (service-to-service inside the mesh)               |
| **Istio Mode**           | Works in **both** Sidecar mode and Ambient mode      | Used **only** in Istio Ambient mode                              |
| **Uses HBONE?**          | Optional (only if routing to Ambient mesh workloads) | **Yes** (receives L4 mTLS tunnels over port `15008`)             |
| **Service Type Created** | `LoadBalancer` (by default)                          | **`ClusterIP` only** (internal cluster IP, never an external LB) |

>[!note] Learning
>Above concept is proven for **Why Use Kubernetes Gateway API Without Ambient/HBONE?**
>
>Even in standard **Istio Sidecar mode** (without waypoints or HBONE), Kubernetes Gateway API is now Istio's default, recommended API for ingress because:
>- **Vendor neutrality:** Your `Gateway` and `HTTPRoute` manifests follow the official Kubernetes standard instead of Istio-specific CRDs (`networking.istio.io/v1`).
>- **Safer multi-team routing:** Developers manage their own `HTTPRoute` resources in their own namespaces without needing write access to the shared ingress `Gateway`.
>- **No extra LoadBalancers needed:** You create **one** `Gateway` (one `LoadBalancer`) for your cluster/environment, and attach dozens of `HTTPRoute` resources to it.
>  
>  But **When Waypoints & HBONE Come In**
>- You only use `istio-waypoint` and **HBONE** (HTTP-Based Overlay Network Environment) if you adopt **Istio Ambient mode** (sidecarless mesh) and need Layer 7 features—like HTTP header routing, retries, or L7 authorization policies—for internal service-to-service traffic.

First checkout again namespace already assign label `istio.io/dataplane-mode` to ensure waypoint worked

```bash
kubectl get ns -L istio.io/dataplane-mode
```

Now create `Gateway` but assign label `istio.io/waypoint-for: service` for `lab-ambient`. Explore more about [labels](https://istio.io/latest/docs/ambient/usage/add-workloads/#ambient-labels)

|`waypoint-for` value|Original destination type|
|---|---|
|`service`|Kubernetes services|
|`workload`|Pod IPs or VM IPs|
|`all`|Both service and workload traffic|
|`none`|No traffic (useful for testing)|

```bash
cat <<EOF | kubectl apply -f -
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  labels:
    istio.io/waypoint-for: service
  name: waypoint
  namespace: lab-ambient
spec:
  gatewayClassName: istio-waypoint
  listeners:
  - name: mesh
    port: 15008
    protocol: HBONE
EOF
```

After the Gateway resource is applied, Istiod will monitor the resource, deploy and manage the corresponding `waypoint` deployment and service for users automatically.

When[ a waypoint proxy is deployed](https://istio.io/latest/docs/ambient/usage/waypoint/#useawaypoint), it is not used by any resources until you explicitly configure those resources to use it. But you need to ensure which of you want to use

- **East-West** Traffic: *Requests from other pods in the mesh to the labeled namespace, service, or workload are sent through the destination waypoint for Layer 7 policy and telemetry*. You need to add the `istio.io/use-waypoint` label with a value of the **waypoint name**, it can be assign to **namespace**, **service**, **pod**.
- **North-South** Traffic (Ingress Gateways and waypoints): *Requests from an Istio ingress gateway to that `service` through the same waypoint as mesh traffic*. You need to set `istio.io/ingress-use-waypoint` to `true` on the Kubernetes `Service`, or on the `Namespace` to apply to all services in that namespace (supported starting with Istio 1.25).

>[!info]
>Enabling this path results in **Layer 7 processing at both the ingress gateway and the waypoint** (a two-tier gateway pattern). Consider authorization rules, latency, and metrics for both hops.

```bash
kubectl label service -n lab-ambient ambient-nginx istio.io/use-waypoint=waypoint
kubectl label service -n lab-ambient ambient-nginx istio.io/ingress-use-waypoint=true
```

Now we you can try to request with `curl` to see what inside change

```bash
curl -v -H 'Host: nginx-gateway.kubewekend.local' http://YOUR-GATEWAY-IP/
```

It's the same, but when you look into the actual log of `nginx`, you can figure out the different ingress of source request

```bash
kubectl logs -n lab-ambient deployments/ambient-nginx

...
10.42.0.55 - - [26/Nov/2026:02:45:09 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/8.5.0" "10.42.0.1"
10.42.0.55 - - [26/Nov/2026:06:04:05 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/8.5.0" "10.42.0.1"
10.42.0.61 - - [26/Nov/2026:06:11:36 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/8.5.0" "10.42.0.1"
10.42.0.61 - - [26/Nov/2026:06:17:24 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/8.5.0" "10.42.0.1"
...
```

- **Without Waypoint (Direct from Ingress):**  
    `External Client` ➔ `Ingress Gateway Pod` ➔ `ztunnel` ➔ `App Pod`  
    _(The Ingress Gateway handles all L7 rules and connects straight to your app's `ztunnel`.)_
    
- **With Waypoint (`istio.io/ingress-use-waypoint=true`):**  
    `External Client` ➔ `Ingress Gateway Pod` ➔ **`Waypoint Pod`** ➔ `ztunnel` ➔ `App Pod`
    (The Ingress Gateway hands the traffic off to the Waypoint Pod first, so the Waypoint can enforce your namespace/service's L7 policies before reaching the app.)

>[!info]
>You can discovery more about this Istio concept via Lab or [Kubewekend](https://kubewekend.xeusnguyen.xyz/), checkout to practice more or reference [Istio - Bookinfo Application](https://istio.io/latest/docs/examples/bookinfo/)

### Security with mTLS

Because I want to overview the small mTLS, you can explore detail at [Kubewekend](https://github.com/xeus-territory/kubewekend) and [Kubewekend Docs - Lab 02: mTLS and Policies](https://kubewekend.xeusnguyen.xyz/examples/istio-case-studies/02-mtls-and-policies/). I will setup only sidecar on this Lab to see what happen and secret provision to serving mTLS between pod-to-pod request each others. Explore more about mTLS with Service Mesh at [Youtube - What Is Mutual TLS (mTLS), Why Do We Need It, And How Do We Get It?](https://www.youtube.com/watch?v=b38k2GiLDdc)

We will use `lab-ambient` and `lab-sidecar` above but add one more namespace legacy for not setup istio mesh. Run provision following the docs with provide in `lab-sidecar` three application `curl curl-other httpbin` for the lab and one `curl` in legacy

We will perform [**PERMISSIVE**](https://istio.io/latest/docs/concepts/security/#permissive-mode) -  which allows a service to accept both plaintext traffic and mutual TLS traffic at the same time. This feature greatly improves the mutual TLS onboarding experience.

```bash
kubectl exec -n legacy deploy/curl -c common -- curl -s -I http://httpbin.lab-sidecar:8080/get

HTTP/1.1 200 OK
access-control-allow-credentials: true
access-control-allow-origin: *
content-type: application/json; charset=utf-8
date: Thu, 26 Nov 2026 08:25:33 GMT
x-envoy-upstream-service-time: 0
server: istio-envoy
x-envoy-decorator-operation: httpbin.lab-sidecar.svc.cluster.local:8080/*
transfer-encoding: chunked
```

`http=200`. By default Istio accepts plain text next to mTLS, so you can onboard workloads one at a time.

Now we try to applied mTLS mode [**STRICT**](https://istio.io/latest/docs/concepts/security/#peer-authentication) - Workloads only accept mutual TLS traffic, via `PeerAuthentication`

```bash
cat <<EOF | kubectl apply -f -
apiVersion: security.istio.io/v1
kind: PeerAuthentication
metadata:
  name: default
  namespace: lab-sidecar
spec:
  mtls:
    mode: STRICT
EOF
```

We will perform two `curl`, one from not mesh namespace and one is in mesh namespace

```bash
# From legacy
kubectl exec -n legacy deploy/curl -c common -- curl -s -I http://httpbin.lab-sidecar:8080/get

command terminated with exit code 56

# From lab-sidecar
kubectl exec -n lab-sidecar deploy/curl -c common -- curl -s -I http://httpbin.lab-sidecar:8080/get

HTTP/1.1 200 OK
access-control-allow-credentials: true
access-control-allow-origin: *
content-type: application/json; charset=utf-8
date: Thu, 26 Nov 2026 08:35:10 GMT
x-envoy-upstream-service-time: 17
server: envoy
transfer-encoding: chunked
```

The legacy call ends with `exit=56` (connection reset); the mesh call is `http=200`

To provent mTLS already inject, you can see this in request header. The sidecar adds `X-Forwarded-Client-Cert` (XFCC) with the caller’s certificate identity

```bash
kubectl exec -n lab-sidecar deploy/curl -c common -- curl -s http://httpbin.lab-sidecar:8080/headers

...
"X-Forwarded-Client-Cert": [
      "By=spiffe://cluster.local/ns/lab-sidecar/sa/httpbin;Hash=
]

istioctl x describe pod "$(kubectl -n lab-sidecar get pod -l app=httpbin -o jsonpath='{.items[0].metadata.name}')" -n lab-sidecar


Pod: httpbin-7d49587d9b-lcv6t
   Pod Revision: default
   Pod Ports: 8080 (common)
--------------------
Service: httpbin
   Port: http 8080/HTTP targets pod port 8080
--------------------
Effective PeerAuthentication:
   Workload mTLS mode: STRICT
Applied PeerAuthentication:
   default.lab-sidecar
```

The header contains `URI=spiffe://cluster.local/ns/lab-sidecar/sa/curl`, the caller’s identity. `describe` reports `Workload mTLS mode: STRICT`.

You can see the certificate with `isitoctl` comamand

```bash
istioctl proxy-config secret deploy/httpbin -n lab-sidecar

RESOURCE NAME     TYPE           STATUS     VALID CERT     SERIAL NUMBER                        NOT AFTER                NOT BEFORE
default           Cert Chain     ACTIVE     true           ad5535efb2e89a20fe8777728d541e87     2026-11-27T08:20:12Z     2026-11-26T08:18:12Z
ROOTCA            CA             ACTIVE     true           90e26b01b9a73dea2adab551149a3cec     2036-11-22T14:52:57Z     2026-11-25T14:52:57Z

istioctl proxy-config secret deploy/httpbin -n lab-sidecar -o json \
  | jq -r '.dynamicActiveSecrets[] | select(.name=="default") | .secret.tlsCertificate.certificateChain.inlineBytes' | base64 -d \
  | openssl x509 -noout -text | grep -E 'URI:|Not Before|Not After'
            Not Before: Nov 26 08:18:12 2026 GMT
            Not After : Nov 27 08:20:12 2026 GMT
                URI:spiffe://cluster.local/ns/lab-sidecar/sa/httpbin
```

You see two certificates (`default`, the workload certificate, and `ROOTCA`), the SPIFFE ID as a URI alternative name (`URI:spiffe://cluster.local/ns/lab-sidecar/sa/httpbin`), and a lifetime of about 24 hours: Istio rotates it for you.

The last restriction is enable authorization for deny all method request, and only allow for GET. This restriction will use [`AuthorizationPolicy`](https://istio.io/latest/docs/concepts/security/#authorization-policies)

```bash
cat <<EOF | kubectl apply -f -
apiVersion: security.istio.io/v1
kind: AuthorizationPolicy
metadata:
  name: deny-all
  namespace: lab-sidecar
spec: {}
---
apiVersion: security.istio.io/v1
kind: AuthorizationPolicy
metadata:
  name: allow-curl-get
  namespace: lab-sidecar
spec:
  selector:
    matchLabels:
      app: httpbin
  action: ALLOW
  rules:
    - from:
        - source:
            principals: ["cluster.local/ns/lab-sidecar/sa/curl"]
      to:
        - operation:
            methods: ["GET"]
            paths: ["/get"]
EOF
```

```bash
kubectl -n lab-sidecar exec deploy/curl -c common -- curl -s http://httpbin:8080/get # allowed

kubectl -n lab-sidecar exec deploy/curl -c common -- curl -s http://httpbin:8080/headers # other path RBAC:access denied

kubectl -n lab-sidecar exec deploy/curl -c common -- curl -s -X POST http://httpbin:8080/post # other method RBAC:access denied
```

>[!done]
>That's all, it just small walkthrought but to show you how istio protect connect between workload in mesh, and not in mesh, applied policy to let them allow to accessible from specific path and method with secure mTLS.

### Conclusion

>[!question] Common Reasons Teams Choose a Service Mesh
>- **Zero-Trust Security:** Enforces workload identity, mTLS encryption in transit, and centralized access/authentication policies across services. 🌟 **(Core Important)**
>- **Deep Observability:** Captures consistent metrics, logs, and distributed traces across east-west traffic to pinpoint bottlenecks and service dependencies. 🌟 **(Core Important)**
>- **Granular Traffic Control & Resiliency:** Supports canary deployments, retries, timeouts, circuit breaking, and fault injection independently of application releases. 🌟 **(Foundation Important)**
>- **Decoupled Developer Velocity:** Frees developers from writing and maintaining repetitive networking or security libraries inside every microservice. 🌟 **(Result Important)**

**What `NetworkPolicy` + Ingress Controller Can vs. Cannot Do**

|Capability|Ingress Controller + `NetworkPolicy`|Service Mesh (Istio Ambient / Waypoint)|
|---|---|---|
|**Pod-to-Pod Firewall**|**Yes (L3/L4 only):** Blocks/allows traffic by Pod labels, Namespace, or IP/port.|**Yes (L3/L4 + L7):** Can allow `GET /orders` while blocking `DELETE /orders`.|
|**East-West Encryption**|**No:** Internal traffic between pods is unencrypted plain text unless your app implements TLS itself.|**Yes (Automatic mTLS):** Encrypts all pod-to-pod traffic transparently with zero app code changes.|
|**Cryptographic Identity**|**No:** Relies on Pod IPs (which change constantly when pods restart).|**Yes (SPIFFE ID):** Verifies the cryptographic identity of the workload, not just its IP.|
|**Internal Traffic Control**|**No:** Only works at the cluster edge (Ingress). Internal calls just use basic Kubernetes `Service` round-robin.|**Yes:** Canary rollouts, retries, timeouts, and circuit breaking between internal microservices.|
|**L7 Observability**|**Edge only:** You see HTTP metrics at the ingress, but internal service-to-service calls are invisible.|**Everywhere:** Automatic distributed tracing, latency, and HTTP error rates across every service hop.|

**When You Should Skip the Mesh (or Skip the Waypoint)?**

- **Stick to Ingress/Gateway Controller + `NetworkPolicy` if:** You have a small-to-medium cluster, mostly north-south traffic, and basic IP/namespace isolation is enough.
- **Use Istio Ambient _without_ Waypoints if:** You want automatic **zero-trust mTLS encryption** between all your pods (`ztunnel`), while keeping your north-south traffic simple through just the Ingress Gateway.
- **Add Waypoints only if:** You have many internal microservices talking to each other and need **L7 authorization (JWT/HTTP paths), canary traffic splitting, or deep HTTP telemetry** without modifying application code.

**Decision Matrix: Standard K8s vs. Istio Tiers**

|**Decision Factor**|**Standard K8s (Gateway API + NetworkPolicy)**|**Istio Ambient (ztunnel only — L4)**|**Istio Ambient + Waypoints (L7)**|**Istio Sidecar (Classic — L4/L7)**|
|---|---|---|---|---|
|**Proxy Architecture**|None (kernel / CNI native)|Shared per-node Rust proxy (`ztunnel`)|Per-node `ztunnel` + shared namespace Envoy Waypoint|Dedicated Envoy container injected into **every** pod|
|**Primary Traffic Pattern**|North-South (Client → Edge → App)|East-West (Many internal services, basic routing)|Complex East-West (Selective L7 per namespace/service)|Complex East-West (Uniform L7 across all pods)|
|**Pod-to-Pod Encryption**|None (unencrypted unless coded in app)|Automatic mTLS everywhere|Automatic mTLS everywhere|Automatic mTLS everywhere|
|**Firewall Granularity**|L3/L4 (IP, Port, Pod Labels)|L4 + Cryptographic Identity (SPIFFE)|L4 + L7 (HTTP paths, methods, JWT claims)|L4 + L7 (HTTP paths, methods, JWT claims)|
|**Retries & Circuit Breaking**|Must be coded in every app|Must be coded in every app|Handled by shared Waypoint proxies|Handled by per-pod Envoy sidecars|
|**Canary Traffic Splitting**|Edge/Ingress only|Edge/Ingress only|Any internal service-to-service call|Any internal service-to-service call|
|**Observability**|Edge HTTP metrics + node CPU/RAM|L4 TCP connection metrics & flow logs|Full L7 HTTP/gRPC latency, error rates & traces|Full L7 HTTP/gRPC latency, error rates & traces|
|**Resource & Latency Cost**|**Lowest** (no proxy overhead)|**Very low** (lightweight shared node proxy)|**Moderate** (shared Waypoints; extra network hop for L7)|**Highest** (RAM/CPU per pod; 2 proxy hops per call)|
|**Operational & Pod Impact**|Zero app disruption|Zero app disruption (no pod restarts for mesh upgrades)|Zero app disruption (Waypoints scale independently)|High (requires pod restarts for proxy upgrades; complicates K8s Jobs)|

# Conclusion

![[meme-hero.png|center]]

>[!done] My Thought
>After a week of writing and building labs, I have officially wrapped up the Istio and Service Mesh session. My feelings are a bit mixed—even at the finish line, I have not touched every upper limit of what a Service Mesh aims to solve, yet the core value is crystal clear. A service mesh is a genuine game-changer for solving complex microservice observability, enforcing a zero-trust security model across any system, and governing east-west and north-south traffic via sidecars or node proxies (`ztunnel`). Istio's internals are massive and can easily consume weeks to master every nuance, which is tough to cover in a single weekend sprint. Still, I will keep expanding the hands-on examples inside [Kubewekend](https://github.com/Xeus-Territory/kubewekend) so you can easily reproduce these labs and test advanced Istio architectures yourself.

>[!quote] A Thankful Note of Mine
>I hope you are doing well and found value in taking the time to read through these articles. You can continue practicing through **Kubewekend**, which I have refactored to provide a complete, reproducible environment for diving deep into Kubernetes and its cloud-native ecosystem over your weekends. Together with [[Kubewekend Session Extra 7]], this marks my final standalone deep-dive article for 2026 as I shift my focus back to [**W'xOps IDP**](https://www.wxops.cloud/) and prepare to launch a new project soon. Once again, stay safe, stay patient, and keep pushing forward with your work—whether the path is steep or smooth, never give up. See you in the next post in the new year, and do not forget to check out the **2026 Recap** at the end of December!

You shoule explore Best Practice and Real use-case when perform Istio as Service Mesh. These video and articles, or whatever actual answer your question before you choose service-mesh for tech-stack of Kubernetes cluster. To be honest, Service Mesh is hard to master because it's a great unified wrapper and concept that brings together the core features of several tools into one platform

- [Istio - Best Practicing](https://istio.io/latest/docs/ops/best-practices/)
- [Istio - Case studies](https://istio.io/latest/about/case-studies/)
- [Istio - Networking with a service mesh: use cases, best practices, and comparison of top mesh options](https://www.cncf.io/blog/2021/07/15/networking-with-a-service-mesh-use-cases-best-practices-and-comparison-of-top-mesh-options/)
- [Linkerd - Linkerd 2.x Adopters & Case Studies](https://linkerd.io/community/adopters/)
- [Youtube - Service Mesh Explained | Sidecar Proxy & Microservices Communication](https://www.youtube.com/watch?v=xuOJF3w4vQQ)
- [Youtube - Istio & Service Mesh - simply explained in 15 mins](https://www.youtube.com/watch?v=16fgzklcF7Y)
- [GitHub - learn-istio](https://github.com/meganokeefe/learn-istio): ⛵️ Istio resources 🕸
- [Istio Service Mesh Workshop](https://www.istioworkshop.io/)
- [Buoyant - Service Mesh at Scale: How Xbox Cloud Gaming Secures 22,000 Pods with Linkerd](https://www.buoyant.io/case-studies/xbox)
- [Medium - Zero Configuration Service Mesh with On-Demand Cluster Discovery (Netflix)](https://netflixtechblog.com/zero-configuration-service-mesh-with-on-demand-cluster-discovery-ac6483b52a51)
- [200Lab - Service Mesh là gì? Giải pháp quản lý giao tiếp giữa các Microservices](https://200lab.io/blog/service-mesh-la-gi?srsltid=AYCX9vJIMhv0xue2AKIU9dlTteocjN6akL_5BEqbj1nJqzD8Kfh7T9s1)
- [Youtube - Service Mesh - Feat. Cilium, Istio, Linkerd, and Kuma (You Choose!, Ch. 04, Ep. 08)](https://www.youtube.com/watch?v=g-tHbIcFYTM)
- [InfoQ - Envoy Service Mesh Case Study: Mitigating Cascading Failure at Lyft](https://www.infoq.com/articles/envoy-service-mesh-cascading-failure/)
- [Youtube - From Custom to Community: Embracing Envoy for Service Mesh Proxies at ING](https://www.youtube.com/watch?v=PEjfoH9nUss)
- [Dev.to - Evaluating 2 Popular Service Meshes](https://dev.to/aws-builders/evaluating-2-popular-service-meshes-3no9)
- [Thoughtworks - Building a Service Mesh with Envoy](https://www.thoughtworks.com/insights/blog/building-service-mesh-envoy-0)
- [CNCF - Service mesh 101: the role of Envoy](https://www.cncf.io/blog/2021/10/22/service-mesh-101-the-role-of-envoy/)
- [JavaCodeGeeks - Service Mesh Architecture: Istio and Envoy in Production](https://www.javacodegeeks.com/2025/11/service-mesh-architecture-istio-and-envoy-in-production.html)
- [Tigera - Istio Service Mesh: Architecture, Traffic Flow, and Operational Challenges](https://www.tigera.io/learn/guides/istio/istio-service-mesh/)
- [Youtube - Webinar: Using Envoy Proxy as Your Gateway to Service Mesh](https://www.youtube.com/watch?v=EdyYCjYVuwM)
- [Youtube - How Service Meshes Work in Kubernetes](https://www.youtube.com/watch?v=izVWk7rYqWI)
- [Youtube - A Guided Tour of Cilium Service Mesh](https://www.youtube.com/watch?v=e10kDBEsZw4)
- [Youtube - Choosing a Service Mesh - Alex McMenemy & Dimple Thoomkuzhy, Compare the Market](https://www.youtube.com/watch?v=hegNjjatNTU)