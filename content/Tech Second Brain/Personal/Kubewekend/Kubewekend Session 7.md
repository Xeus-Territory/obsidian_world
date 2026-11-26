---
title: "Kubewekend Session 7: Setup new deployment and route traffic to kubewekend cluster"
tags:
  - kubewekend
  - devops
  - kubernetes
  - usage
---

![[thumbnail-k8s-ingress-traffic.png]]

> [!quote]
> Hello! It's been a while, a month since my last break, and nearly half a year since this blog was moved to the archives. I’ve taken some free time this weekend to revive it with fresh content for the **Kubewekend Stories** series. I've been running plenty of experiments over the past month, and I'm excited to finally share these articles. Let’s dive into this week’s Kubewekend to explore the best strategies for ingressing your applications into a cluster!
# Kubewekend Before and Now

If you recall our recent `Kubewekend` sessions where we explored setting up **RKE2** for Kubernetes instead of `kind`, you can revisit that walkthrough in [[Kubewekend Session Extra 2|Kubewekend Session Extra 2: Rebuild Cluster with RKE2 or K3S]]. As I noted in those posts, I chose **RKE2** for production environments due to critical requirements like **Container Storage Interface (CSI)** support and **High Availability (HA)**, areas that `kind` is not designed to address at production scale.

Despite those limitations, I still believe `kind` remains the best tool for experimenting and practicing in a **local Kubernetes environment**. Today, we are revisiting `kind` alongside **Cilium** to explore how leveraging **eBPF** and a security-focused CNI can enhance our applications. If you need a refresher on the fundamentals of Cilium, Hubble, and eBPF, check out [[Kubewekend Session 4|Kubewekend Session 4: Learn about ebpf with hubble and cilium]].

![[thumbnail-cilium-announce-v1.17.png|center]]

After a few months, I've dived into several blogs about **Cilium** and its comparison with traditional models like **Kube-Proxy**. These resources explain how **eBPF** is transforming networking in Kubernetes and what trade-offs we make when adopting Cilium. There are a new versions of Cilium are constantly introducing exciting functionalities and there's a lot happening with **eBPF** and **Cilium** is pushing the boundaries.

You can find more great information by reading the articles or visiting the LinkedIn and blog posts linked below.

**Version Release Note**

- [Cilium 1.17](https://github.com/cilium/cilium/releases/tag/v1.17.0)
- [Cilium 1.18](https://github.com/cilium/cilium/releases/tag/v1.18.0)
- [Cilium 1.19](https://github.com/cilium/cilium/releases/tag/v1.19.0)
- [Cilium 1.20](https://github.com/cilium/cilium/releases/tag/v1.20.0)

**Articles**

- [KodeKloud - eBPF Essentials for DevOps Professionals](https://kodekloud.com/blog/ebpf-essentials-devops/) 🌟 **(Recommended)**
- [Medium - Picking Between Calico and Cilium for Your On-Prem Kubernetes Cluster](https://medium.com/@PlanB./picking-between-calico-and-cilium-for-your-on-prem-kubernetes-cluster-9c3849083a45)
- [Medium - eBPF and Cilium Are Cool, So Why Do We Keep Choosing Kube-Proxy?](https://medium.com/@PlanB./ebpf-and-cilium-are-cool-so-why-do-we-keep-choosing-kube-proxy-4423bdefca7d) 🌟 **(Recommended)**
- [Medium - eBPF Series by Mr. Quan Huynh](https://medium.com/@hmquan08011996/kubernetes-networking-ebpf-in-action-f0df2592dade) 🌟 **(Recommended)**

**Maintainer and Linkedin Pages**

- [Linkedin - Isovalent](https://www.linkedin.com/company/isovalent/posts/?feedView=all)
- [Linkedin - Liz Rice](https://www.linkedin.com/in/lizrice/recent-activity/all/) 🌟 **(Recommended)**
- [Linkedin - Cilium](https://www.linkedin.com/company/cilium/posts/?feedView=all)
- [Isovalent - Blog](https://isovalent.com/blog/) 🌟 **(Recommended)**

Comparing with previous blog from a year ago, I believe Cilium is evolving to become the new methodology for who love and want to adopt eBPF and network enhancement around this technology, and once again I think Cilium can do lots of stuff to control your network in Kubernetes with great ecosystem, such as

- [Ingress Controller](https://docs.cilium.io/en/stable/network/servicemesh/ingress/)
- [Gateway API](https://docs.cilium.io/en/stable/network/servicemesh/gateway-api/gateway-api/)
- [LoadBalancer IP Address Management (LB IPAM)](https://docs.cilium.io/en/stable/network/lb-ipam/)
- [Node IPAM LB](https://docs.cilium.io/en/stable/network/node-ipam/)

Let's explore more about Cilium Utilities and Learn how can Kubernetes expose your application and serving traffic in your application. From this one, you can change any technologies or CRDs about Load Balancer, Ingress Controller or API Gateway to make your Kubernetes become more efficiency and more persona
# How does Kubernetes serve the traffic ?

![[thumbnail-how-k8s-serve-traffic.png]]

When working with Kubernetes, networking always remains a top priority because it can be complex to master and introduces many abstractions unique to the Kubernetes ecosystem. For a solid overview before diving into my walkthrough, you can review the official documentation at [Kubernetes - Services, Load Balancing, and Networking](https://kubernetes.io/docs/concepts/services-networking/).

Before going into deep technical detail, let's take a brief end-to-end walkthrough of how Kubernetes networking initializes and serves traffic:

- **Pod Networking (CNI):** Starting at the foundation of the cluster, the [**CNI (Container Network Interface)**](https://www.cni.dev/) plays a critical role by **assigning unique IP addresses to Pods**, which forms the baseline of Kubernetes networking. This **cluster-wide IP address** allows Pods to communicate directly with one another—whether on the same node or across different nodes—without requiring proxies or NAT.
- **Service Discovery & Routing:** Building upon Pod networking, the [Service](https://kubernetes.io/docs/concepts/services-networking/service/) API provides a stable virtual IP address (ClusterIP) to represent a dynamic set of underlying Pods. This is backed by [EndpointSlices](https://kubernetes.io/docs/concepts/services-networking/endpoint-slices/), which continuously track the network endpoints of the healthy Pods matching that Service.
- **North-South L7 Routing:** To make internal Services accessible to external clients via HTTP/HTTPS and L4/L7 routing rules, Kubernetes utilizes **Ingress** and the modern **Gateway API**.
- **External Exposure (LoadBalancer):** To advertise these entry points externally, you typically deploy a [Service of type: LoadBalancer](https://kubernetes.io/docs/concepts/services-networking/service/#loadbalancer), which acts as a bridge between the Kubernetes cluster and your external network. While managed cloud providers provision this automatically, implementing `LoadBalancer` Services in on-premises or bare-metal environments presents unique challenges, this post will explore effective strategies to solve those problems.
- **Network Security:** To govern both accessibility and zero-trust isolation, [NetworkPolicy](https://kubernetes.io/docs/concepts/services-networking/network-policies/) is a built-in Kubernetes resource used to restrict traffic between Pods or between Pods and external endpoints. Today, eBPF-powered solutions like Cilium have emerged as top-tier choices for enforcing policies across L3, L4, and L7. We will dive deeper into Network Policies and Kubernetes security in a dedicated future post.

Kubernetes takes a distinct, decoupled approach to networking—exposing standardized APIs while leaving the underlying implementation to pluggable ecosystem components chosen for your cluster. Even so, understanding the core building blocks remains essential for any modern platform engineer, so make sure you are familiar with [Container Networking Interface (CNI) and Network Policy](https://kubernetes.io/docs/concepts/cluster-administration/addons/#networking-and-network-policy) as well as the [Kubernetes Proxy (`kube-proxy`)](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/).

With **Cilium**, you get a unified, eBPF-native networking stack capable of covering the entire Kubernetes networking spectrum, a next-generation architecture already adopted by engineering teams worldwide. Let's explore what comes next in
# Kubewekend with Cilium

![[thumbnail-cilium-feature.png]]

In older setups, we used the Cilium CLI to install the Cilium control plane and Hubble in our cluster. However, to unlock finer-grained control over newer features and production configurations, I recommend deploying Cilium via Helm—specifically using [Helm Chart v1.18.x](https://artifacthub.io/packages/helm/cilium/cilium/1.18.5) or the latest [Helm Chart v1.20.x](https://artifacthub.io/packages/helm/cilium/cilium/1.20.5). With the updated [Kubewekend Source Code](https://github.com/xeus-territory/kubewekend), I have streamlined deploying Cilium via `helm` in a KinD cluster, but first, you need to understand the underlying steps involved.

When I turn on the Kubewekend Cluster with Cilium, that will help your cluster work perfectly via `helm` command below

```bash
helm repo add cilium https://helm.cilium.io/
helm repo update
helm upgrade --install cilium cilium/cilium --version 1.18.5 --wait \
  --namespace kube-system \
  --set operator.replicas=1 \
  --set hubble.enabled=true \
  --set hubble.relay.enabled=true \
  --set hubble.ui.enabled=true \
  --set ipam.mode=cluster-pool
```

![[Pasted image 20260201164328.png]]

Let's take a look about Cilium Components when we deploy this stack in Kubewekend

- [Cilium Envoy](https://docs.cilium.io/en/latest/security/network/proxy/envoy/): Envoy will setup as `daemonset` workload and become host proxy for enforcing HTTP and other L7 policies as specified in network policies for the cluster.
- [Cilium Operator](https://docs.cilium.io/en/stable/internals/cilium_operator/): Operator will work as controller to orchestration the CRDs provided by Cilium, which help you define a lots of stuff with Cilium Features.
- Cilium: The `daemonset` pods work as CNI in Kubewekend Cluster
- [Hubble Relay and Hubble UI](https://docs.cilium.io/en/stable/internals/hubble/): The tools let us discover and monitor network follow inside cluster, and visualization them as dashboard with friendly UI

By default, you will encounter the several problem when create the Service as Load Balancer because Kind doesn't integrate actual Load Balancer between Kubernetes with your host, so why you operate any Ingress Controller with Service Load Balancer, that will stuck in **Pending** State. 

For example I try to operate Nginx Ingress and you will see your Nginx Controller Service still pending before LoadBalancer initialize

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/refs/tags/controller-v1.14.1/deploy/static/provider/kind/deploy.yaml
```

![[Pasted image 20260201165832.png]]

Otherwise, you will have multiple options about Gateway and Ingress to expose your Services in Kubernetes. Please spent time to double-check couple of options below

- [Kubernetes - Third party ingress controllers](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/#third-party-ingress-controllers)
- [GatewayAPI  - Gateway Controller Implementation Status](https://gateway-api.sigs.k8s.io/implementations/#gateway-controller-implementation-status)

As you can see, the great issue is appearing and that made us to must find the solution if you want to expose your application. Luckily, **LoadBalancer** is one of the interesting things introduced much in Kubernetes, and here what stuff we can tackle to solved our problems, with couple of solutions below

- Using VIP (Virtual IP) in Kind Network with [Kube-vip](https://kube-vip.io/) or [MetalLB](https://metallb.io/)
- Using Cloud Provider of Kind, the solution recommend by Kind at [Kind - LoadBalancer](https://kind.sigs.k8s.io/docs/user/loadbalancer/). To reduce the complex, I already try to build them into docker-container and easier to distribute them with tag `xeusnguyen/cloud-provider-kind:latest`
- With Cilium, They introduce several ways to setup Load Balancer, including [LoadBalancer IP Address Management (LB IPAM)](https://docs.cilium.io/en/stable/network/lb-ipam/) and [Node IPAM LB](https://docs.cilium.io/en/stable/network/node-ipam/)

>[!note]
>There are more several stuff to deal with Load Balancer optional, so if you want to explore more about Kubernetes with this technology. Please double-check these articles
>- [CNCF - A cloud-like on-prem load balancer for Kubernetes?](https://www.cncf.io/blog/2022/02/21/a-cloud-like-on-prem-load-balancer-for-kubernetes/)
>- [Medium - MetalLB and KinD: Loads Balanced Locally](https://medium.com/@tylerauerbeck/metallb-and-kind-loads-balanced-locally-1992d60111d8)
>- [Apptio - Chapter 10: Load Balancing](https://www.apptio.com/topics/kubernetes/best-practices/load-balancer/)
>- [Kubernetes - Create an External Load Balancer](https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/)
>- [Cilium - Understanding Kubernetes Load Balancing](https://cilium.io/blog/2026/04/25/understanding-kubernetes-load-balancing/)

![[thumbnail-k8s-loadbalancer.png|center|450]]

This article focuses specifically on **Cilium**, detailing how to leverage it alongside **Nginx Ingress** to route external traffic into the cluster. After evaluating various architectural patterns, I have opted for **[Node IPAM LB](https://docs.cilium.io/en/stable/network/node-ipam/)**. This feature provides Service Load Balancing using the Node's own IP addresses, a concept similar to the **ServiceLB (KlipperLB)** implementation found in [K3s](https://github.com/k3s-io/klipper-lb).

This approach significantly reduces complexity for those who prefer not to manage L2 or BGP configurations. It is particularly effective for environments like **Kind**, where multiple networking layers can become difficult to manage. Node IPAM LB is the most streamlined option: it honors `.spec.ipFamilies` (choosing between IPv4 and IPv6) and prioritizes `ExternalIP` addresses, falling back to `InternalIP` addresses otherwise.

There are several critical considerations when adopting **Node IPAM LB** for your cluster:

- **Traffic Policy:** Setting `.spec.externalTrafficPolicy` to `Cluster` or `Local` determines candidate selection. `Cluster` considers all nodes as candidates, while `Local` focuses on nodes hosting the specific Pods defined by the Service's EndpointSlices.
- **Cilium Constraints:** When using **Cilium Ingress** or the **Gateway API**, you cannot set `.spec.externalTrafficPolicy` to `Local` because it utilizes dummy endpoints for the Service LoadBalancer. This is specific to the Cilium implementation; for consistent behavior, it is recommended to set this value to `Cluster`.
- **Node Selection:** Node IPAM LB honors the label `node.kubernetes.io/exclude-from-external-load-balancers` and the `ToBeDeletedByClusterAutoscaler` taint to prevent specific nodes from being used as load-balancing candidates.
- **Node Filtering:** To explicitly restrict which nodes listen for incoming traffic, you can add the `io.cilium.nodeipam/match-node-labels` annotation to your Service.

To change and make it available for NodeIPAM, you must upgrade `helm` one more time and add couple of new parameters

```bash
helm upgrade --install cilium cilium/cilium --version 1.18.5 \
  --namespace kube-system \
  --reuse-values \
  --set nodeIPAM.enabled=true \
  --set defaultLBServiceIPAM=nodeipam
kubectl rollout restart -n kube-system deployment cilium-operator
```

Now let's double-check again with `ingress-nginx` and service with LoadBalancer

![[Pasted image 20260202101113.png]]

As you can see, the NodeIP Address assigned into controller, and make it's able to work as Kubernetes for ingress

>[!question] Why does it have that IP ?
>Because your `kubewekend` is operating with `kind` cluster and use `kind` network managed by Docker, and it will attach with IP in that container network range. For my situation, Docker setup the `kind` network with CIDR `172.18.0.0/16` so why you see it have IP `172.18.0.2`, and you can double-check with command
>```bash
>docker network inspect kind
>```

So what next ? We will take walkthrough to implement new deployment and expose them with `nginx` ingress to serving external traffic
## Deployment and expose the application with Ingress

With NodeIPAM, your actual IP of node already assign into control-plane and loadbalancer, so it simply understand your `kubewekend` container can able to access via port `80/443`. That's why you can expose port `80/443` in the configuration of Kind when you run the bootstrap cluster, Read more at [Kind - Extra Ports Mapping](https://kind.sigs.k8s.io/docs/user/configuration/#extra-port-mappings)

But in the situation, you already bootstrap cluster and operate `cilium` that's pretty hard to re-run concept again because we can't expose port again when container is running in Docker, instead we recreate again. So that's not pretty good deal, but we can try with another way below, but first let's run couple way to check your ingress worked, and ready to expose your application

First, let's run `curl` command to port of your `kubewekend` cluster at `80/443`, and also to port when your `ingress` run as `node-port`. By default, `nginx-ingress` will define default backend at `/healthz` route to let you can do `health-check`

![[Pasted image 20260202103937.png]]

```bash
# For http (Work with LoadBalancer)
curl -i http://<IP-LB>/healthz

# For https (Work with LoadBalancer)
curl -i -k https://<IP-LB>/healthz

# For situation only node-port working
curl -i http://<HostIP>:<PortMapping>/healthz
```

```bash
vagrant@k8s-master-machine:~$ curl -i http://172.18.0.2/healthz
HTTP/1.1 200 OK
Date: Mon, 02 Feb 2026 03:40:32 GMT
Content-Type: text/html
Content-Length: 0
Connection: keep-alive

vagrant@k8s-master-machine:~$ curl -i -k https://172.18.0.2/healthz
HTTP/2 200 
date: Mon, 02 Feb 2026 03:41:30 GMT
content-type: text/html
content-length: 0

vagrant@k8s-master-machine:~$ curl -i http://172.18.0.2:32350/healthz
HTTP/1.1 200 OK
Date: Mon, 02 Feb 2026 03:42:39 GMT
Content-Type: text/html
Content-Length: 0
Connection: keep-alive
```

Next, let's operate `nginx` deployment and try to expose with `nginx` ingressclass to see what it work. You can save as file or run it with `cat <<EOF` command by `kubectl apply -f`

```yaml title="ingress-test-deployment.yaml"
# Write the test deployment with custom settings
apiVersion: apps/v1
kind: Deployment
metadata:
  name: test-deployment
  labels:
    app: test-deployment
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      app: test-deployment
  template:
    metadata:
      labels:
        app: test-deployment
    spec:
      containers:
      - name: deployment-container
        image: nginx:latest
        ports:
        - containerPort: 80
---
# Write the test service with custom settings
apiVersion: v1
kind: Service
metadata:
  name: test-service
  labels:
    app: test-deployment
  namespace: default
spec:
  selector:
    app: test-deployment
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: ClusterIP
---
# Write the test ingress with custom settings
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: test-ingress
  labels:
    app: test-deployment
  namespace: default
spec:
  ingressClassName: nginx
  rules:
  - host: ingress.local
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: test-service
            port:
              number: 80
```

```bash
kubectl apply -f ingress-test-deployment.yaml
```

Now in `default` namespace, your application will create with `nginx` container and also expose the new service and domain for your application with `nginx` IngressClass. 

You can double-check again with `curl` command. Because you setup the `host`, to let `ingress-nginx` know what service to routing, you must specific `host` header

```bash
curl -i -H 'Host: ingress.local' http://<LB-IP>
```

Alright, that's seem pretty good for us, and we are also set up what we need to implementation the brand new application with expose them via Kubernetes concept by `Service` and `Ingress`. To make it become more accessible, especially via browser and don't need recreate `kubewekend`, I think about tunnel, proxy or socket strategy to map Host IP, it means IP of host used to run `kubewekend` to container where `kubewekend` work

After get involve couple of technologies, I think [socat](https://www.redhat.com/en/blog/getting-started-socat) is pretty good option to handle mapping IP to IP with TCP forwarder. This option become more trust after review couple articles

- [Stackoverflow - socat port forwarding for https](https://stackoverflow.com/questions/34791674/socat-port-forwarding-for-https)
- [Stackoverflow - What actually reuseaddr option does in socat?](https://stackoverflow.com/questions/75059280/what-actually-reuseaddr-option-does-in-socat)
- [SuperUser - forward a TCP connection with logging using socat](https://superuser.com/questions/1261685/forward-a-tcp-connection-with-logging-using-socat)

The best option for handle in this case is creating service `systemd`, that take the responsibility to forward from port `80/443` of host to port `80/443` of container. Here is definition

```toml title="/etc/systemd/system/socat-netforward-port-80.service"
[Unit]
Description=Socat Network Forwarding Service port 80
After=network.target

[Service]
Type=simple
User=root
ExecStart=/usr/bin/socat TCP-LISTEN:80,bind=<HOST-IP>,fork TCP:<IP-LB>:80
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

```toml title="/etc/systemd/system/socat-netforward-port-443.service"
[Unit]
Description=Socat Network Forwarding Service port 443
After=network.target

[Service]
Type=simple
User=root
ExecStart=/usr/bin/socat TCP-LISTEN:443,bind=<HOST-IP>,fork TCP:<IP-LB>:443
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Now enable and start these services

```bash
sudo systemctl daemon-reload
sudo systemctl enable socat-netforward-port-80.service
sudo systemctl enable socat-netforward-port-443.service
sudo systemctl start socat-netforward-port-80.service
sudo systemctl start socat-netforward-port-443.service
sudo systemctl restart socat-netforward-port-80.service || echo "socat-netforward-port-80 service will be restarted after 10 seconds"
sudo systemctl restart socat-netforward-port-443.service || echo "socat-netforward-port-443 service will be restarted after 10 seconds"          
sudo systemctl status socat-netforward-port-80.service
sudo systemctl status socat-netforward-port-443.service
```

Alright, let's try again with the request to host instead via External Load Balancer

```bash
curl -i -H 'Host: ingress.local' http://<HOST-IP>
```

```bash
vagrant@k8s-master-machine:~$ curl -i -H 'Host: ingress.local' http://192.168.56.99
HTTP/1.1 200 OK
Date: Mon, 02 Feb 2026 04:21:17 GMT
Content-Type: text/html
Content-Length: 615
Connection: keep-alive
Last-Modified: Tue, 09 Dec 2025 18:28:10 GMT
ETag: "69386a3a-267"
Accept-Ranges: bytes

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

If you want to expose via browser, let's define inside `/etc/hosts`

```bash
sudo nano /etc hosts

> 192.168.56.99 ingress.local
```

![[Pasted image 20260202112511.png]]

>[!warning] Breaking News
>In March 2026, `ingress-nginx` is becoming archive with not upgrading anymore, if you want to take the advantage futures of Kubernetes networking, you should consider to migrate into Gateway or using instead by other implementations, like Cilium, Traefik or Kong. Read more at 
>- [CNCF - Navigating the ingress-nginx archival: why now is the time to move to Cilium](https://www.cncf.io/blog/2026/01/27/navigating-the-ingress-nginx-archival-why-now-is-the-time-to-move-to-cilium/)
>- [Gateway API - Migrating from Ingress](https://gateway-api.sigs.k8s.io/guides/getting-started/migrating-from-ingress/)
>- [GitHub - ingress2gateway](https://github.com/kubernetes-sigs/ingress2gateway): Convert Ingress resources to Gateway API resources
>- [Traefik - Migrate from Ingress NGINX Controller to Traefik](https://doc.traefik.io/traefik/migrate/nginx-to-traefik/)

## How about the Cilium implementation? (Update 11/2026)

![[thumbnail-cilium-ingress.png]]

>[!warning]
>In Cilium **v1.18.x and earlier**, you could run Cilium alongside `kube-proxy` (or in partial replacement modes). For anyone unfamiliar with [`kube-proxy`](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/), *"it is a Kubernetes network proxy that runs on each node. It reflects services as defined in the Kubernetes API on each node and performs simple TCP, UDP, and SCTP stream forwarding or round-robin forwarding across a set of backends"*—meaning it handles traffic routing for Kubernetes Services of types **ClusterIP, NodePort, LoadBalancer, and services with externalIPs**.
>
>Starting from **v1.19.x and later**, if you want eBPF to handle all Service types natively, you should disable `kube-proxy` in your Kubernetes cluster and enable full `kubeProxyReplacement` (`kubeProxyReplacement=true`) in Cilium—as partial/hybrid replacement is no longer supported. Enabling `kubeProxyReplacement` is also a hard prerequisite if you plan to use Cilium's built-in **Ingress Controller** or **Gateway API** implementations.
>
>Be aware that removing `kube-proxy` on an existing cluster will drop active Service connections and interrupt Service-related traffic until Cilium's eBPF replacement datapath is fully initialized.
>
>Explore more at: [Kubernetes Without kube-proxy](https://docs.cilium.io/en/stable/network/kubernetes/kubeproxy-free/)

| Setup / Scenario                                                         | Cilium v1.18                                                                                        | Cilium v1.19                                                                                                                                                        |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hybrid Mode** (`kubeProxyReplacement=false` + `nodePort.enabled=true`) | **Allowed** (deprecated). `kube-proxy` remained active while Cilium intercepted `NodePort` traffic. | **Removed.** `nodePort.enabled` no longer exists, so `kubeProxyReplacement=false` won't make your IngressController worked, and assign the IP Address for `ingress` |
| **Cilium Handles NodePort**                                              | Enabled via `kubeProxyReplacement=true` **or** `nodePort.enabled=true`.                             | Enabled **only** via **`kubeProxyReplacement=true`**.                                                                                                               |
| **`kube-proxy` Status**                                                  | Optional in hybrid mode, removed in full replacement mode.                                          | **Must be disabled/removed** when using `kubeProxyReplacement=true`.                                                                                                |

The implementation of **Cilium Ingress and the Gateway API** reflects its unique architectural position as a CNI-integrated solution. Unlike traditional controllers that run as standalone deployments, Cilium embeds these capabilities directly into its networking stack, providing a unified management experience.

- **Unified Network Stack:** Because Ingress and Gateway API are part of the Cilium CNI, they eliminate the need for separate controllers (like ingress-nginx). You can expose your services via a **LoadBalancer**, **NodePort**, or even directly on the **Host Network**. This consolidation reduces operational complexity by providing a single, comprehensive stack for all Kubernetes networking requirements.
- **eBPF and Transparent Proxying:** When traffic reaches a service port, Cilium utilizes **eBPF** to intercept packets and transparently forward them to a per-node Envoy instance using the **[TPROXY kernel facility](https://docs.kernel.org/networking/tproxy.html)**. This mechanism ensures high performance and enables the [**CiliumNetworkPolicy**](https://docs.cilium.io/en/stable/network/kubernetes/policy/) engine to enforce security rules on both incoming and outgoing ingress traffic. The Envoy component on each node is specially optimized to interact with the eBPF engine for rapid policy lookups.
- **Source IP Visibility:** To maintain visibility into the original client, Cilium leverages Envoy to append the trusted client address to the `X-Envoy-External-Address` header. This is critical for applications that require accurate logging or IP-based access controls.
- **Advanced Features and Annotations:** Cilium supports modern requirements like [TLS Passthrough](https://docs.cilium.io/en/stable/network/servicemesh/ingress/#tls-passthrough-and-source-ip-visibility) and standard [Ingress Path Types](https://docs.cilium.io/en/stable/network/servicemesh/ingress/#ingress-path-types-and-precedence). It also offers a variety of [supported annotations](https://docs.cilium.io/en/stable/network/servicemesh/ingress/#supported-ingress-annotations), allowing for a transition from ingress-nginx that feels familiar yet operates with a more sophisticated eBPF-driven backend.

> [!info]
> **Host Networking Mode:** Since version 1.16, Cilium supports [Host Networking mode](https://docs.cilium.io/en/stable/network/servicemesh/ingress/#host-network-mode) for Ingress and Gateway API. This allows the Ingress Controller to be exposed directly on the host's network interfaces, which is particularly useful in environments where a standard LoadBalancer service is not available.

Let's jump on the feature Ingress, and see what we got with this ingressclass instead of `nginx`. For setup `cilium-ingress`, your kubernetes need to meet the requirement, including

- Cilium must be configured with NodePort enabled, using `nodePort.enabled=true` or by enabling the kube-proxy replacement with `kubeProxyReplacement=true`
- Cilium must be configured with the L7 proxy enabled using `l7Proxy=true` (default)
- Kubernetes cluster need to support Service of LoadBalancer Type

After reviewing the helm-chart of Cilium, you can use this command below to open ingress controller

```bash title="v1.18.x (Hybrid)"
helm upgrade --install cilium cilium/cilium --version 1.18.5 \
  --namespace kube-system \
  --reuse-values \
  --set nodePort.enabled=true \
  --set ingressController.enabled=true \
  --set ingressController.loadbalancerMode=shared
kubectl rollout restart -n kube-system deployment cilium-operator
kubectl rollout restart -n kube-system daemonset cilium
```

>[!important]
>Make sure you correctly set your `API_SERVER_IP` and `API_SERVER_PORT` below with the control-plane node IP address and the kube-apiserver port number reported by `kubeadm init` (Kubeadm will use port `6443` by default).

```bash title="v1.19.x, and higher" {6-8}
helm upgrade --install cilium cilium/cilium --version 1.20.5 --wait \
  --namespace kube-system \
  --reuse-values \
  --set ingressController.enabled=true \
  --set ingressController.loadbalancerMode=shared \
  --set kubeProxyReplacement=true \
  --set k8sServiceHost="$API_SERVER_IP" \
  --set k8sServicePort="$API_SERVER_PORT"
kubectl rollout restart -n kube-system deployment cilium-operator
kubectl rollout restart -n kube-system daemonset cilium
```

>[!info]
>Cilium supports two Ingress load balancer modes: `shared` and `dedicated`. Each mode has distinct trade-offs: in `shared` mode, a single LoadBalancer Service (`cilium-ingress`) is reused across all Ingress resources to conserve infrastructure and minimize cloud costs. In `dedicated` mode, Cilium provisions a separate `LoadBalancer` Service (`cilium-ingress-<ingress-name>`) per Ingress resource, providing strict endpoint isolation at the expense of provisioning multiple external load balancers.

After enabling the Ingress Controller feature, you can verify the newly created `IngressClass` (`cilium`) alongside the provisioned `LoadBalancer` Service(s).

```bash
kubectl get pods -n kube-system
kubectl get service -n kube-system
kubectl get ingressclass
```

Let's edit our previous Ingress manifest to route traffic through `cilium-ingress` instead of `ingress-nginx` and observe the result

```bash
kubectl edit -n default ingress test-ingress
```

To see Cilium Envoy Config, you can use command below to see the envoy support for each type LoadBalancer created for Service `cilium-ingress` and `cilium-gateway`

```bash
kubectl get ciliumenvoyconfigs.cilium.io -A
```

Next, let's test the endpoint again using `curl`. Before doing so, make sure to scale down or uninstall the existing `ingress-nginx` deployment so it doesn't conflict with the same `LoadBalancer` external IP allocated by Node IPAM. Afterward, restart both the `cilium-operator` Deployment and the `cilium` CNI DaemonSet so the new Ingress configuration reconciles cleanly

```bash
curl -i -H 'Host: ingress.local' http://<HOST-IP>
```

```bash {3,10}
vagrant@k8s-master-machine:~$ curl -i -H 'Host: ingress.local' http://172.18.0.2
HTTP/1.1 200 OK
server: envoy
date: Mon, 02 Feb 2026 07:41:33 GMT
content-type: text/html
content-length: 615
last-modified: Tue, 09 Dec 2025 18:28:10 GMT
etag: "69386a3a-267"
accept-ranges: bytes
x-envoy-upstream-service-time: 0

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

Explore more information about Cilium at

- [Cilium - Kubernetes Ingress Support](https://docs.cilium.io/en/stable/network/servicemesh/ingress/)
- [Cilium - Kubernetes Gateway API Support](https://docs.cilium.io/en/stable/network/servicemesh/gateway-api/gateway-api/)
- [Cilium - Kubernetes Without kube-proxy](https://docs.cilium.io/en/stable/network/kubernetes/kubeproxy-free/)
## Deployment and expose the application with API Gateway (Update 11/2026)

This is an important update: as of November 2026, the Kubernetes **Gateway API** has matured and gained widespread production adoption across the industry, especially following the official end-of-life (EOL) and retirement of the community-maintained `ingress-nginx` controller in March 2026. Consequently, migrating from **Ingress to Gateway API** has become the standard industry path forward.

>[!info] API Gateway in Cloud & System Design Patterns
>
>Implement an API gateway as the single entry point for all clients. The API gateway handles incoming requests in one of two ways: some requests are simply proxied or routed directly to the appropriate backend service, while others are handled by fanning out across multiple services.

An API Gateway helps solve several critical architectural challenges:

- **Enforcing Security:** Applying centralized security controls at the edge, including mTLS, rate limiting, and authentication policies.
- **Unified Entry Point:** Providing a single, consistent endpoint for routing traffic to diverse backend microservices.
- **Observability and Auditing:** Centralizing traffic inspection, audit logging, and telemetry to accurately monitor and measure backend service performance.

With these capabilities, Gateway API provides a strong architectural foundation for any Cloud Native team migrating from traditional Ingress Controllers to modern Gateway API standards. Before diving deeper into integrating Gateway API with Cilium, I recommend reviewing the official [Gateway API Introduction](https://gateway-api.sigs.k8s.io/docs/introduction/) documentation to solidify the core concepts.

>[!info] Gateway API in Kubernetes
>[Gateway API](https://gateway-api.sigs.k8s.io/docs/introduction/) is an official Kubernetes project focused on L4 and L7 routing in Kubernetes. It represents the next generation of Kubernetes Ingress, Load Balancing, and Service Mesh APIs—designed from the outset to be generic, expressive, and role-oriented.

![[thumbnail-k8s-gateway-concepts.png]]

Gateway API provides a set of CRDs focused primarily on the routing layer across multiple protocols ([HTTPRoute, GRPCRoute, TCPRoute, UDPRoute, and TLSRoute](https://gateway-api.sigs.k8s.io/docs/concepts/api-overview/#route-types)). These CRDs serve as a standardized Kubernetes blueprint before you install a concrete [Gateway Controller](https://gateway-api.sigs.k8s.io/docs/implementations/list/) to reconcile those specifications and expose your services. Today, Gateway API supports both Ingress (North-South) and Service Mesh (East-West) use cases.

For [Gateway API for Ingress](https://gateway-api.sigs.k8s.io/docs/concepts/api-overview/#route-types), a [Gateway](https://gateway-api.sigs.k8s.io/reference/api-types/gateway/) resource defines the network endpoint that routes external traffic into internal cluster services. Each Gateway is bound to a [GatewayClass](https://gateway-api.sigs.k8s.io/reference/api-types/gatewayclass/), which specifies the underlying [gateway controller](https://gateway-api.sigs.k8s.io/docs/glossary/#gateway-controller) responsible for provisioning and managing the traffic infrastructure. Individual routing resources (such as [HTTPRoute](https://gateway-api.sigs.k8s.io/reference/api-types/httproute/)) are then [attached to the Gateway resource via `parentRefs`](https://gateway-api.sigs.k8s.io/docs/concepts/api-overview/#attaching-routes-to-gateways). Separating these concerns into distinct resources is central to Gateway API's role-oriented design, allowing multiple gateway controllers (represented by `GatewayClass` resources) and multiple gateway instances (`Gateway` resources) to coexist cleanly within the same cluster.

For [Gateway API for Service Mesh](https://gateway-api.sigs.k8s.io/docs/introduction/#gateway-api-for-service-mesh-the-gamma-initiative), things work slightly differently when managing east-west traffic inside a [service mesh](https://gateway-api.sigs.k8s.io/docs/glossary/#service-mesh). Because a cluster typically runs a single mesh, the [Gateway](https://gateway-api.sigs.k8s.io/reference/api-types/gateway/) and [GatewayClass](https://gateway-api.sigs.k8s.io/reference/api-types/gatewayclass/) resources are bypassed; instead, individual route resources (such as [HTTPRoute](https://gateway-api.sigs.k8s.io/reference/api-types/httproute/)) bind [directly to Service resources via `parentRefs`](https://gateway-api.sigs.k8s.io/docs/mesh/). This allows the mesh data plane to intercept and manage any internal traffic directed to that `Service` while preserving Gateway API's role-oriented model. Through the [GAMMA initiative](https://gateway-api.sigs.k8s.io/docs/mesh/), you can configure service mesh traffic policies using the exact same standard Gateway API routing resources without learning vendor-specific CRDs.

In recent, I think if you want to adapt API Gateway with Kubernetes, here is couple of on the top opts:

- [Kong Gateway API](https://github.com/Kong/kubernetes-ingress-controller)
- [KGateway](https://github.com/kgateway-dev/kgateway)
- [Cilium Gateway API](https://docs.cilium.io/en/latest/network/servicemesh/gateway-api/gateway-api/)
- [Envoy Gateway](https://github.com/envoyproxy/gateway)
- [Traefik Gateway](https://doc.traefik.io/traefik/reference/install-configuration/providers/kubernetes/kubernetes-gateway/)

In this update, I will walk through how to configure Cilium to support Gateway API in Kubewekend if you decide to use Cilium CNI as your Gateway API controller.

Just like with Cilium's Ingress support, starting from Cilium **v1.19.x**, you can no longer run Kubernetes `kube-proxy` alongside Cilium for these features. Instead, you must disable `kube-proxy` and migrate to Cilium's eBPF-based `kubeProxyReplacement` (`kubeProxyReplacement=true`) so Cilium natively manages all Kubernetes Service types.

>[!important]
>Before applying `helm` for Cilium, you must install a compatible version of the Gateway API CRDs. For Cilium v1.20.x, **v1.6.3** is the recommended standard release.

```bash
kubectl apply --server-side --force-conflicts \
-f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.6.3/standard-install.yaml
```

Once the CRDs are installed, upgrade Cilium with Gateway API support enabled. After a successful rollout, Cilium automatically registers its `GatewayClass` (`cilium`)

```bash
helm upgrade --install cilium cilium/cilium --version 1.20.5 --wait \
  --namespace kube-system \
  --reuse-values \
  --set gatewayAPI.enabled=true \
  --set kubeProxyReplacement=true \
  --set k8sServiceHost="$API_SERVER_IP" \
  --set k8sServicePort="$API_SERVER_PORT"
kubectl rollout restart -n kube-system deployment cilium-operator
kubectl rollout restart -n kube-system daemonset cilium
```

```bash
kubectl get gatewayclasses.gateway.networking.k8s.io 
NAME     CONTROLLER                     ACCEPTED   AGE
cilium   io.cilium/gateway-controller   True       56m
```

Now you can write manifests to define a `Gateway` in your cluster. Before doing so, explore and understand the API schema fields used in your YAML manifests. The links below reference the **v1.6** specification as the standard, though you can inspect other versions depending on your requirements, or explore the schema directly in your terminal using `kubectl explain`

- [Gateway](https://gateway-api.sigs.k8s.io/reference/api-spec/1.6/spec/#gateway)
- [HTTPRoute](https://gateway-api.sigs.k8s.io/reference/api-spec/1.6/spec/#httproute)

```bash
kubectl explain gateway.spec --recursive
kubectl explain httproute.spec --recursive
```

Here is full example to deployment two applications and services, with traffic routing by `HTTPRoute` and `Gateway`

```yaml
# NOTE The Gateway APIs are not yet available by default in Kubernetes.
# Follow these instructions to install them before using this example:
# https://gateway-api.sigs.k8s.io/guides/#install-experimental-channel
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: echo-1
  labels:
    app: echo-1
spec:
  selector:
    matchLabels:
      app: echo-1
  template:
    metadata:
      labels:
        app: echo-1
    spec:
      containers:
      - name: echo-1
        image: kong/go-echo:0.3.0
        env:
          - name: POD_NAME
            valueFrom:
              fieldRef:
                fieldPath: metadata.name
        ports:
        - containerPort: 80
        resources:
          limits:
            memory: "64Mi"
            cpu: "250m"
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: echo-1
  name: echo-1
spec:
  ports:
  - port: 80
    protocol: TCP
    targetPort: 1027
  selector:
    app: echo-1
  type: ClusterIP
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: echo-2
  labels:
    app: echo-2
spec:
  selector:
    matchLabels:
      app: echo-2
  template:
    metadata:
      labels:
        app: echo-2
    spec:
      containers:
      - name: echo-2
        image: kong/go-echo:0.3.0
        env:
          - name: POD_NAME
            valueFrom:
              fieldRef:
                fieldPath: metadata.name
        ports:
        - containerPort: 80
        resources:
          limits:
            memory: "64Mi"
            cpu: "250m"
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: echo-2
  name: echo-2
spec:
  ports:
  - port: 8080
    protocol: TCP
    targetPort: 1027
  selector:
    app: echo-2
  type: ClusterIP
---
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: cilium-gateway
spec:
  gatewayClassName: cilium
  listeners:
  - allowedRoutes:
      namespaces:
        from: Same
    name: http
    protocol: HTTP
    port: 80
---
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: cilium-httproute-testing
spec:
  parentRefs:
  - name: cilium-gateway
  hostnames:
  - apigateway.kubewekend.local
  rules:
  - matches:
    - path:
        type: PathPrefix
        value: /
    backendRefs:
    - name: echo-1
      kind: Service
      port: 80
      weight: 75
    - name: echo-2
      kind: Service
      port: 8080
      weight: 25
```

When you apply this manifest, Cilium automatically generates a corresponding `CiliumEnvoyConfig` (`cec`) resource and programs the underlying Envoy routes so Cilium can forward traffic to your application. Keep in mind that `Gateway` has a notable field called [`listeners.allowedRoutes`](https://gateway-api.sigs.k8s.io/reference/api-spec/main/spec/#allowedroutes), which controls which routes can attach to the listener based on [namespace](https://gateway-api.sigs.k8s.io/reference/api-spec/main/spec/#routenamespaces) and [API group/kind](https://gateway-api.sigs.k8s.io/reference/api-spec/main/spec/#routegroupkind). By default, `allowedRoutes.namespaces.from` is set to `Same`, meaning only routing resources (such as an `HTTPRoute`) located in the same namespace as the `Gateway` can reference it.

Now try to `curl` with specific Gateway API to testing the routing following the `weight` for each `service`

```bash
GATEWAY=$(kubectl get gateway cilium-gateway -o jsonpath='{.status.addresses[0].value}')
curl -H 'Host: apigateway.kubewekend.local' http://$GATEWAY/
```

```bash
~ ⌚ 17:00:27
$ curl -H 'Host: apigateway.kubewekend.local' http://$GATEWAY/
Running on Pod echo-1-74854ccf76-dbnv5.


~ ⌚ 17:00:32
$ curl -H 'Host: apigateway.kubewekend.local' http://$GATEWAY/
Running on Pod echo-1-74854ccf76-dbnv5.


~ ⌚ 17:00:35
$ curl -H 'Host: apigateway.kubewekend.local' http://$GATEWAY/
Running on Pod echo-1-74854ccf76-dbnv5.


~ ⌚ 17:00:37
$ curl -H 'Host: apigateway.kubewekend.local' http://$GATEWAY/
Running on Pod echo-2-7df5d6787d-9rp2m.
```

Anyway, you can find more example about Gateway API using Cilium more at [GitHub - Cilium Gateway Examples](https://github.com/cilium/cilium/tree/main/examples/kubernetes/gateway), e.g: [HTTPS](https://github.com/cilium/cilium/blob/main/examples/kubernetes/gateway/basic-https.yaml), [TLS Gateway](https://github.com/cilium/cilium/blob/main/examples/kubernetes/gateway/https-default-tls-certificate.yaml), ...

Explore more at:

- [Microservice - API Gateway](https://microservices.io/patterns/apigateway.html)
- [CNCF Glossary - API Gateway](https://glossary.cncf.io/api-gateway/)
- [Azure - Gateway Aggregation](https://learn.microsoft.com/en-us/azure/architecture/patterns/gateway-aggregation), [Azure - Gateway Offloading](https://learn.microsoft.com/en-us/azure/architecture/patterns/gateway-offloading), [Azure - Gateway Routing](https://learn.microsoft.com/en-us/azure/architecture/patterns/gateway-routing)
- [Solo.io - API gateway pattern](https://www.solo.io/topics/api-gateway/api-gateway-pattern)
- [Solo.io - API Gateways in the Cloud-Native World](https://www.solo.io/blog/api-gateways-cloud-native)
- [Azure - Use API gateways in microservices](https://learn.microsoft.com/en-us/azure/architecture/microservices/design/gateway)
- [API7.ai - Cloud-Native API Gateway on Kubernetes](https://api7.ai/learning-center/api-gateway-guide/cloud-native-api-gateway-kubernetes)
- [ChoreoLab - Cloud native API gateway: Architecture guide for 2026](https://choreolabs.com/api-management/learn/cloud-native-api-gateway/)
- [Medium - The API Gateway in Cloud-Native Microservices: Standard Capabilities, Deployment, and K8s Integration](https://rurutia1027.medium.com/the-api-gateway-in-cloud-native-microservices-standard-capabilities-deployment-and-k8s-93953a539787)
- [TheNewStack - The API Gateway and the Future of Cloud Native Applications](https://thenewstack.io/the-api-gateway-and-the-future-of-cloud-native-applications/)
- [Solo.io - Kubernetes API Gateway](https://www.solo.io/topics/api-gateway/kubernetes-api-gateway)
- [Isovalent - Kubernetes Ingress vs Gateway API](https://isovalent.com/blog/post/ingress-vs-gateway-api/)
# Conclusion

![[meme-tired.png|center|450]]

> [!done]
> For the first post of this year, I am shifting my focus toward "slow technology"—taking the time to deep-dive into the core concepts I want to highlight during our `kubewekend` sessions. This post, originally from my archives, is an essential resource for those looking to delve into Kubernetes as a beginner. It is designed to help you build a solid foundation for your practice. I hope this article clarifies the complexities of Kubernetes networking and demonstrates exactly how Pods are exposed and advertised to external traffic within a cluster.

> [!quote]
> Happy New Year, everyone! I hope this post kicks off a year filled with exciting challenges and growth. I plan to dedicate more time to refining `kubewekend`, making it a platform where learning Kubernetes is accessible and intuitive. My goal is to help you integrate the technologies you love and build them into a robust platform that supports the future of your career. Let’s see what we can achieve together! If you enjoy the content, please consider dropping a star to follow the activity on [GitHub - Kubewekend](https://github.com/Xeus-Territory/kubewekend). Take care, and I’ll see you in the next `kubewekend` drop!

