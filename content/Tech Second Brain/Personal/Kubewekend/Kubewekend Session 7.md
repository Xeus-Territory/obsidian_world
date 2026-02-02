---
title: "Kubewekend Session 7: Setup new deployment and route traffic to kubewekend cluster"
tags:
  - kubewekend
  - devops
  - kubernetes
  - usage
---

![[meme-long-time-no-see.png|center]]

> [!quote]
> Hello! It's been a while, a month since my last break, and nearly half a year since this blog was moved to the archives. I’ve taken some free time this weekend to revive it with fresh content for the **Kubewekend Stories** series. I've been running plenty of experiments over the past month, and I'm excited to finally share these articles. Let’s dive into this week’s Kubewekend to explore the best strategies for ingressing your applications into a cluster!
# Kubewekend Before and Now

If you remember about `Kubewekend` in nearest time about we handle extra part about to setup `RKE2` for Kubernetes instead `Kind`, you can double-check again in [[Kubewekend Session Extra 2|Kubewekend Session Extra 2: Rebuild Cluster with RKE2 or K3S]]. As I've mentioned in these articles, I chose **RKE2** for our production environment due to considerations like **Container Storage Interface (CSI)** and **High Availability (HA)**, which `kind` doesn't fully address in that context.

However, despite those challenges, I still believe `kind` remains the best option for practicing in a **local Kubernetes environment**. Today, we're revisiting `kind` with **Cilium** to explore how this platform, leveraging **eBPF** and **Network Security CNI**, that can enhance our applications. Explore again about Cilium, Hubble and eBPF Technologies via [[Kubewekend Session 4|Kubewekend Session 4: Learn about ebpf with hubble and cilium]]

![[thumbnail-cilium-announce-v1.17.png|center]]

After a few months, I've dived into several blogs about **Cilium** and its comparison with traditional models like **Kube-Proxy**. These resources explain how **eBPF** is transforming networking in Kubernetes and what trade-offs we make when adopting Cilium. There are a new versions of Cilium are constantly introducing exciting functionalities and there's a lot happening with **eBPF** and **Cilium** is pushing the boundaries.

You can find more great information by reading the articles or visiting the LinkedIn and blog posts linked below.

**Version Release Note**

- [Cilium 1.17](https://github.com/cilium/cilium/releases/tag/v1.17.0)
- [Cilium 1.18](https://github.com/cilium/cilium/releases/tag/v1.18.0)

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

![[thumbnail-k8s-ingress-traffic.png]]

## Basic Networking in Kubernetes

When you work with Kubernetes, the network topic always stay on the top priority because it's hard to understand and stick with lots of definition which appear only by Kubernetes. To get more information before diving into my sharing, you can double-check these concepts at [Kubernetes - Services, Load Balancing, and Networking](https://kubernetes.io/docs/concepts/services-networking/)

Let's take a short walkthrough from initialize of networking to completely serving before detailing it, but simply, these step will begin

- Starting with the foundation of the cluster, the **CNI (Container Network Interface)** plays a critical role by **assigning IP addresses to Pods**, which is the starting point of Kubernetes networking. This **cluster-wide IP address** allows Pods to communicate with one another—whether on the same node or across different nodes—directly, without the need for proxies or NAT.
- Building upon Pod networking, the [Service](https://kubernetes.io/docs/concepts/services-networking/service/) API provides a stable IP address to represent a set of underlying Pods. This is supported by [EndpointSlices](https://kubernetes.io/docs/concepts/services-networking/endpoint-slices/) objects, which track the network endpoints of the Pods backing that specific service.
- To make these Services accessible to clients outside the cluster, Kubernetes utilizes **Ingress** and the **Gateway API**.
- To advertise these services externally, you often deploy a [Service of type: LoadBalancer](https://kubernetes.io/docs/concepts/services-networking/service/#loadbalancer), which acts as a bridge between the Kubernetes cluster and your host network. While Cloud providers handle this automatically, implementing Load Balancers in On-Premises environments presents unique challenges; this blog will explore effective strategies to tackle those problems.
- To enhance both accessibility and security, [NetworkPolicy](https://kubernetes.io/docs/concepts/services-networking/network-policies/) is a built-in resource used to control traffic between Pods or between Pods and the outside world. Currently, solutions like Cilium are emerging as top-tier choices for this layer. We will dive deeper into Network Policies and Kubernetes security in a dedicated future post.

Kubernetes create the own way to make it becomes unique in network concept, and they implement them to API and let's community choose what they want for their Kubernetes cluster. But like I told, the basic network options always stay in standard for modern nowadays, so you must know about [Container Networking Interface (CNI) and Network Policy](https://kubernetes.io/docs/concepts/cluster-administration/addons/#networking-and-network-policy), [Kubernetes Proxy](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/) 

With `Cilium`, you will have the stack to ensure to cover whole network concepts of Kubernetes, the next gen already adopt by multiple team around the world. Let's explore next in 
## In Kubewekend with Cilium

With old version, we are use cilium CLI to setup the cilium controller and also hubble in our cluster. But if you want do more great things with brand new feature, I would recommend you to use  [Helm Chart](https://artifacthub.io/packages/helm/cilium/cilium/1.18.5) for Cilium Deployment. With the refine of [Kubewekend Source Code](https://github.com/xeus-territory/kubewekend), I will help you easier apply `helm` in Kind Cluster, but at first you need to know what step behind.

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

![[thumbnail-k8s-loadbalancer.png|center|450]]

This article focuses specifically on **Cilium**, detailing how to leverage it alongside **Nginx Ingress** to route external traffic into the cluster. After evaluating various architectural patterns, I have opted for **Node IPAM LB**. This feature provides Service Load Balancing using the Node's own IP addresses, a concept similar to the **ServiceLB (KlipperLB)** implementation found in [K3s](https://github.com/k3s-io/klipper-lb).

This approach significantly reduces complexity for those who prefer not to manage L2 or BGP configurations. It is particularly effective for environments like **Kind**, where multiple networking layers can become difficult to manage. Node IPAM LB is the most streamlined option: it honors `.spec.ipFamilies` (choosing between IPv4 and IPv6) and prioritizes `ExternalIP` addresses, falling back to `InternalIP` addresses otherwise.

There are several critical considerations when adopting **Node IPAM LB** for your cluster:

- **Traffic Policy:** Setting `.spec.externalTrafficPolicy` to `Cluster` or `Local` determines candidate selection. `Cluster` considers all nodes as candidates, while `Local` focuses on nodes hosting the specific Pods defined by the Service's EndpointSlices.
- **Cilium Constraints:** When using **Cilium Ingress** or the **Gateway API**, you cannot set `.spec.externalTrafficPolicy` to `Local` because it utilizes dummy endpoints for the Service LoadBalancer. This is specific to the Cilium implementation; for consistent behavior, it is recommended to set this value to `Cluster`.
- **Node Selection:** Node IPAM LB honors the label `node.kubernetes.io/exclude-from-external-load-balancers` and the `ToBeDeletedByClusterAutoscaler` taint to prevent specific nodes from being used as load-balancing candidates.
- **Node Filtering:** To explicitly restrict which nodes listen for incoming traffic, you can add the `io.cilium.nodeipam/match-node-labels` annotation to your Service.

To change and make it available for NodeIPAM, you must upgrade `helm` one more time and add couple of parameters

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

>[!note] Breaking News
>In March 2026, `ingress-nginx` is becoming archive with not upgrading anymore, if you want to take the advantage futures of Kubernetes networking, you should consider to migrate into Gateway or using instead by other implementations, like Cilium, Traefik or Kong. Read more at 
>- [CNCF - Navigating the ingress-nginx archival: why now is the time to move to Cilium](https://www.cncf.io/blog/2026/01/27/navigating-the-ingress-nginx-archival-why-now-is-the-time-to-move-to-cilium/)
>- [Gateway API - Migrating from Ingress](https://gateway-api.sigs.k8s.io/guides/getting-started/migrating-from-ingress/)

## How about the implementation of Cilium ?

![[thumbnail-cilium-ingress.png]]

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

```bash
helm upgrade --install cilium cilium/cilium --version 1.18.5 \
  --namespace kube-system \
  --reuse-values \
  --set nodePort.enabled=true \
  --set ingressController.enabled=true \
  --set ingressController.loadbalancerMode=shared
kubectl rollout restart -n kube-system deployment cilium-operator
kubectl rollout restart -n kube-system daemonset cilium
```

>[!info]
>Cilium support 2 type of ingress loadbalancer mode, include `shared` and `dedicated`. Each of type have own benefit, for `shared`, we can reuse only one loadbalancer for every expose with ingress resources, instead `dedicated` will create a dedicated loadbalancer for the ingress. It means you will have a lot of loadbalancer

After deploy the feature ingress, you can double-check again with new `ingressclass` created and also service as Load Balancer Type

```bash
kubectl get pods -n kube-system
kubectl get service -n kube-system
kubectl get ingressclass
```

Let's edit the example in previous and see what we got when calling via `cilium-ingress` instead `nginx-ingress`

```bash
kubectl edit -n default ingress test-ingress
```

Let's do `curl` command again and see what we got, but first let off `ingress-nginx` in previous because it will cause the confuse with same load-balancer address with NodeIPAM. After that, you can try to reload again `Operator` and `CNI` to adapt with this ingress one more time

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

# Conclusion

![[meme-tired.png|center|450]]

> [!done]
> For the first post of this year, I am shifting my focus toward "slow technology"—taking the time to deep-dive into the core concepts I want to highlight during our `kubewekend` sessions. This post, originally from my archives, is an essential resource for those looking to delve into Kubernetes as a beginner. It is designed to help you build a solid foundation for your practice. I hope this article clarifies the complexities of Kubernetes networking and demonstrates exactly how Pods are exposed and advertised to external traffic within a cluster.

> [!quote]
> Happy New Year, everyone! I hope this post kicks off a year filled with exciting challenges and growth. I plan to dedicate more time to refining `kubewekend`, making it a platform where learning Kubernetes is accessible and intuitive. My goal is to help you integrate the technologies you love and build them into a robust platform that supports the future of your career. Let’s see what we can achieve together! If you enjoy the content, please consider dropping a star to follow the activity on [GitHub - Kubewekend](https://github.com/Xeus-Territory/kubewekend). Take care, and I’ll see you in the next `kubewekend` drop!

