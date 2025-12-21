---
title: To Cloud Native Multi-Cluster with ExternalDNS
tags:
  - devops
  - k8s
  - kubernetes
  - system-architecture
  - usage
---

>[!quote] Surprise! One More for the Year 🎁
>Hi everyone! It is a great opportunity to be back with one more technical deep dive before the new year arrives. I know I mentioned in my last post that I was wrapping things up, but I managed to finish my experiments with **ExternalDNS** and couldn't wait to share the results with you.
>
>So, take a seat and let’s see what we’ve got. Welcome back for one last session before the holiday season truly begins!

# ExternalDNS and what do you waiting for?

![[icon-external-dns.png|center|500]]

Following my previous article, [[The Story of Mine about Multi-Region Architecture]] which explored scaling services and optimizing user experience via low-latency strategies, Global Server Load Balancing (GSLB), and Multi-Cluster patterns, I am now shifting my focus to [ExternalDNS](https://github.com/kubernetes-sigs/external-dns). 

In practice, I encountered significant authentication and integration challenges when attempting to sync Alibaba Cloud DNS with non-native Kubernetes distributions, such as RKE2 and K3s, via ExternalDNS. However, I successfully implemented a robust workaround using [AWS Route53](https://aws.amazon.com/route53/). Route53 proved highly compatible and widely supported for this target architecture. ExternalDNS serves as a force multiplier here, providing the seamless automation necessary to enhance the cloud-native maturity of any system.

Over the past year, as I delved deeper into the Kubernetes ecosystem, I developed a strong preference for building cloud-native solutions where tools operate as integrated components. This approach significantly reduces the friction of cross-stack compatibility. ExternalDNS, in particular, stands out; it is a powerful controller that automates DNS record management—the backbone of infrastructure—allowing engineering teams to offload substantial operational overhead.

Before diving into the core implementation, I would like to share a brief overview of current technological trends and my perspective on the specific challenges this solution is designed to resolve.

## What is ExternalDNS?

![[thumbnail-external-dns-workflow-source-gg.png]]

>[!note] Definition
>[ExternalDNS](https://kubernetes-sigs.github.io/external-dns/latest/) is a tools cloud-native to synchronizes exposed Kubernetes Service and Ingress with DNS Providers

ExternalDNS is an essential tool for teams that need to manage Kubernetes environments but lack direct, manual permissions to create and manage DNS records. It was specifically designed to alleviate this operational friction, offering native support for a wide range of providers, including [Google Cloud DNS](https://cloud.google.com/dns/docs/), [AWS Route 53](https://aws.amazon.com/route53/), [Azure DNS](https://azure.microsoft.com/en-us/services/dns), [Cloudflare](https://www.cloudflare.com/dns) and moreover.

According to the [FAQ](https://kubernetes-sigs.github.io/external-dns/latest/docs/faq/) and the [Initial Design](https://kubernetes-sigs.github.io/external-dns/latest/docs/initial-design/) documentation, **ExternalDNS** was inspired by and built upon the foundations of several pioneering projects, including:

* Kops’ [DNS Controller](https://github.com/kubernetes/kops/tree/HEAD/dns-controller)
* Zalando’s [Mate](https://github.com/linki/mate)
* Molecule Software’s [route53-kubernetes](https://github.com/wearemolecule/route53-kubernetes)

Today, ExternalDNS has become the industry standard for bridging the gap between Kubernetes and DNS management. Its growing popularity makes it the preferred choice for orchestrating DNS in Multi-Cluster architectures, enabling the centralization of record management into a single, unified workflow.

The objective of ExternalDNS is straightforward: it operates as a controller (Deployment) within the Kubernetes cluster and automates DNS record creation based on specific triggers:

1.  Parsing the `spec.rules.host` field in an Ingress object.
2.  Parsing the `spec.tls.hosts` field in an Ingress object.
3.  Detecting the `external-dns.alpha.kubernetes.io/hostname` annotation on an Ingress object.
4.  Detecting the `external-dns.alpha.kubernetes.io/hostname` annotation on a `type: LoadBalancer` Service object.

By monitoring these **two core Kubernetes resource types (Services and Ingresses)**, ExternalDNS automatically synchronizes DNS records and exposes applications. This creates a seamless developer experience where deploying an Ingress or Service automatically results in a live, reachable DNS endpoint on providers like AWS Route 53 or Google Cloud DNS.

Addressing the critical concern of ["Does it mess up my DNS records?"](https://kubernetes-sigs.github.io/external-dns/latest/docs/faq/#im-afraid-you-will-mess-up-my-dns-records), ExternalDNS implements a robust ownership mechanism to safeguard existing infrastructure. It ensures that it only modifies or deletes records it explicitly manages, leaving unmanaged records untouched. Currently, ExternalDNS supports the following registry methods for tracking record ownership:

* **[TXT Records](https://kubernetes-sigs.github.io/external-dns/latest/docs/initial-design/#ownership-via-txt-records):** This is the default approach. Each DNS record created by ExternalDNS is accompanied by a shadow TXT record containing a unique identifier (ID). This metadata indicates that the record is managed by ExternalDNS and is safe to update or delete.
* **[DynamoDB](https://kubernetes-sigs.github.io/external-dns/latest/docs/registry/dynamodb/):** For AWS users, ExternalDNS allows storing ownership metadata in a DynamoDB table rather than cluttering the hosted zone with TXT records.
* **`noop` Registry:** This option passes metadata directly to the provider. However, for most providers, this means metadata is not persisted, effectively disabling ownership tracking.
* **[AWS Service Discovery](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-discovery.html):** Metadata is stored within AWS Cloud Map (Service Discovery). This registry is exclusive to the `aws-sd` provider.
## The Expectation of Mine

The idea for this approach solidified when I was looking for a way to prove that DNS records could be managed externally without compromising security or architectural integrity. ExternalDNS stood out as the only solution that offered both stability and broad industry recognition. For my requirements, ExternalDNS is a mission-critical component; it enables me to architect a DNS layer that handles intelligent failover and multi-cluster routing with absolutely zero manual configuration.

I have extensively researched and referenced the following materials, which confirm that ExternalDNS is the right choice for high-availability and disaster recovery scenarios:

* **Automated Lifecycle Management:** The ability to sync the Kubernetes API state with public DNS providers ensures that the DNS records are always a "source of truth" for the current infrastructure.
* **Multi-Cluster Centralization:** It allows for a unified DNS management strategy where multiple clusters can report to a single hosted zone while maintaining record isolation via ownership IDs.
* **Operational Efficiency:** By offloading DNS updates to a controller, engineering teams can focus on application logic rather than manual infrastructure tickets.

These resources gave me the confidence that ExternalDNS can scale alongside a complex Multi-Region architecture while ensuring seamless service discovery for every new endpoint.

- [Dev.to - Automated DNS Record Management for Kubernetes Resources using external-dns and AWS Route53](https://dev.to/suin/automated-dns-record-management-for-kubernetes-resources-using-external-dns-and-aws-route53-cnm)
- [Dev.to - Securing external-dns: Encrypting TXT Registry Records](https://dev.to/suin/securing-external-dns-encrypting-txt-registry-records-11m4)
- [AWS - How to Set Up ExternalDNS with Amazon EKS: Automating DNS Management for Kubernetes Services and Ingresses](https://aws.amazon.com/awstv/watch/f924ce51dcc/)
- [AWS - Unified Service Discovery with Amazon ECS and Kubernetes](https://aws.amazon.com/blogs/opensource/unified-service-discovery-ecs-kubernetes/)
- [Infralovers - Amazon EKS with ALB and External DNS for Route 53](https://www.infralovers.com/blog/2023-10-13-amazon-eks-with-alb-and-external-dns-for-route53/)
- [EKS Workshop - ExternalDNS](https://www.eksworkshop.com/docs/fundamentals/exposing/ingress/external-dns)
- [ExternalDNS - AWS](https://kubernetes-sigs.github.io/external-dns/latest/docs/tutorials/aws/)
- [Youtube - External DNS for Kubernetes](https://www.youtube.com/watch?v=VSn6DPKIhM8)

![[Pasted image 20251221150150.png]]

AWS Route 53 stands out as one of the most mature environments for ExternalDNS integration. It serves as a foundational choice for building a centralized DNS management layer, specifically because ExternalDNS was architected with native support for this platform. 

Choosing AWS Route 53 as the central "source of truth" allows for a unified management strategy across both **EKS (Amazon Elastic Kubernetes Service)** and **Non-EKS clusters** (such as RKE2, K3s, or on-premises deployments). This centralized approach provides several architectural advantages:

* **Cross-Cluster Centralization:** You can manage records for multiple clusters from a single AWS account, significantly simplifying governance.
* **Native Integration:** ExternalDNS leverages AWS IAM roles (via IRSA for EKS or static credentials for non-EKS) to securely automate record lifecycle management.
* **Hybrid Cloud Ready:** By using Route 53, you bridge the gap between cloud-native workloads and legacy infrastructure, ensuring consistent name resolution across the entire organization.
* **Intelligent Routing:** It allows you to leverage Route 53's advanced features, such as latency-based routing or health-check-driven failover, directly through Kubernetes annotations.

By implementing this, the DNS layer effectively becomes a "self-healing" component of your infrastructure. Whether a service is joining a cluster in us-east-1 or a private data center, ExternalDNS ensures it is discoverable with zero manual intervention.

# It's Lab Time

![[thumbnail-multi-cluster-with-aws-route53-ga.png]]

Alright not waiting to long, I think we can start the POC to validate what I describe above with the AWS Route53 and multi-cluster. But first of all, I want to show what spec I got, including

- RKE2: Run `nginx` application with content RKE2 and expose them via `nginx-ingress`
- K3s: Run `nginx` application with content K3s and expose them via `traefik-ingress`
- 2x Publish IP: These one will different address but resolve same domain to let Route53 distribute traffic to them via ALB following `Round Robin` algorithm
## Preparation Experiment Environment

To testing for fair result, I will positive prepare two different content of each cluster to see the weight before we change the routing strategies to ensure low-latency with geo-location routing

I wil choose `nginx` for easier customize and easier to deploy that with static content, here what I prepare and apply for each cluster

To change content, I prefer to use `configmap` to modify the default output of `nginx` deployment

```yaml title="configmap.yaml"
apiVersion: v1
kind: ConfigMap
metadata:
  name: nginx-content
  namespace: default
data:
  index.html: |
    <html>
    <head><title>Cluster Discovery</title></head>
    <body>
      <h1>Hello from the Cluster!</h1>
      <p>This application is currently running on: <b>RKE2 Cluster</b></p>
    </body>
    </html>
```

```yaml title="deployment.yaml"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-distro-check
  labels:
    app: nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
        volumeMounts:
        - name: html-volume
          mountPath: /usr/share/nginx/html/index.html
          subPath: index.html
      volumes:
      - name: html-volume
        configMap:
          name: nginx-content
```

>[!note]
>You can do the same stuff with other cluster, exchange content and we can calculate the weight when DNS routing traffic to specific target.

You can apply these manifest to build the experiment application before we setup the `ExternalDNS` controller

```bash
kubectl apply -f configmap.yaml
kubectl apply -f deployment.yaml
kubectl expose deployment nginx-distro-check --port 80 --target-port 80
```

## Statistic Credential for Authentication Route53

When working with AWS, you must always ensure that your IAM entity has the appropriate permissions. Amazon Route 53 is no exception; you require a policy that grants access to Route 53 and permits the modification of records within the service. You can refer to the following documentation to define the necessary permissions for this POC:

- [ExternalDNS - AWS IAM Policy](https://kubernetes-sigs.github.io/external-dns/latest/docs/tutorials/aws/#iam-policy)
- [ExternalDNS - AWS IAM Permissions with ABAC](https://kubernetes-sigs.github.io/external-dns/latest/docs/tutorials/aws/#iam-permissions-with-abac)
- [ExternalDNS - AWS Further Improvements](https://kubernetes-sigs.github.io/external-dns/latest/docs/tutorials/aws/#further-improvements)

For demonstration purposes and ease of use in a playground environment, I will create and apply the basic policy defined by ExternalDNS. This policy provides sufficient privileges to list, read, and modify records in any **hosted zone** within AWS Route 53.

>[!warning]
>For enhanced security in production, you should implement the principle of least privilege by restricting permissions to specific Route 53 Hosted Zones used by your Kubernetes cluster.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "route53:ChangeResourceRecordSets",
        "route53:ListResourceRecordSets",
        "route53:ListTagsForResources"
      ],
      "Resource": [
        "arn:aws:route53:::hostedzone/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "route53:ListHostedZones"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
```

Because this policy doesn't exist, so you need to create it by yourself and assume them for any user which typically spent for ExternalDNS Service. For example, I will create this policy with name **ExternalDNSUpdater** and assume them for user `externaldns-user`

![[Pasted image 20251221161527.png]]

For the non EKS cluster, you are not available to use techniques related with service account to assume this policies so why I assume it via additional user and create static credential with AWS_KEY provided. But for more secure and if you use the EKS for main Kubernetes Cluster, you can follow these instruction to build the efficiency module

- [ExternalDNS - Node IAM Role](https://kubernetes-sigs.github.io/external-dns/latest/docs/tutorials/aws/#node-iam-role)
- [ExternalDNS - IAM Roles for Service Accounts](https://kubernetes-sigs.github.io/external-dns/latest/docs/tutorials/aws/#iam-roles-for-service-accounts) 🌟 **(More Secure - Recommended)**

But for my case-study, I will use to use [ExternalDNS - Static Credentials](https://kubernetes-sigs.github.io/external-dns/latest/docs/tutorials/aws/#static-credentials) to mount this credential into non't EKS cluster and it will allow for ExternalDNS pod to remote modify the record via this credentials. You can easily get one for yourself at **Security credentials** tab for each user in AWS Account

When you create and grab your key in AWS Console, you will have one time to save this access key, so create a file and save them with format

```bash title="poc_credentials"
[default]
aws_access_key_id=AWS_ACCESS_KEY_ID
aws_secret_access_key=AWS_SECRET_ACCESS_KEY
```

Now create the secrets in location where you want to deploy ExternalDNS, I prefer to use it with `external-dns` for distinguish with it other, so here what action to perform

```bash
kubectl create namespace external-dns
kubectl create secret generic external-dns \
	--namespace external-dns --from-file /path/to/credentials/file
```

>[!done]
>Alright, you are already doing whole stuff for prepare to start ExternalDNS deployment with pre-define IAM Authentication via Static Credentials
## Deploy ExternalDNS and Validate

For deploying ExternalDNS in target-cluster, you will several ways to handle this stuff, but following documentation, you can deploy it via [Helm - ExternalDNS](https://artifacthub.io/packages/helm/external-dns/external-dns) and it's official way to create the ExternalDNS easily but if you want to deloy via manifest

But I will recommend to use helm with official value definition, first of all, you need to read the default [values.yaml](https://github.com/kubernetes-sigs/external-dns/blob/master/charts/external-dns/values.yaml) before setup the `aws` provider version

```yaml title="values.yaml"
provider:
  name: aws
env:
  # Set default external region (even if global), but for prevent error
  - name: AWS_DEFAULT_REGION
    value: us-east-1
  - name: AWS_SHARED_CREDENTIALS_FILE
    value: /etc/aws/credentials/poc_credentials # the key credentials already define with key `poc_credentials`
extraVolumes:
  - name: aws-credentials
    secret:
      secretName: external-dns
extraVolumeMounts:
  - name: aws-credentials
    mountPath: /etc/aws/credentials
    readOnly: true
```

Now apply the helm deployed with the specific customize `values.yaml` with command

```bash
# Add helm repo
helm repo add external-dns https://kubernetes-sigs.github.io/external-dns/ && helm repo update

# Install external-dns with values.yaml
helm upgrade --install external-dns external-dns/external-dns --values values.yaml --namespace external-dns
```

Alright, when you validate the pod running with log show your the domain `host_zone`, that is good signal for ExternalDNS to work with your domain in Route53. Now, you can validate by create routing the traffic to your application via Ingress

```bash
kubectl create ingress nginx-distro-check \
--rule=externaldns-nginx.yourroute53.com/\*=nginx-distro-check:80 --class nginx \
--dry-run=client --namespace=default --output yaml | kubectl apply -f -;
```

Now you can double-check the log of `external-dns` and you can see that will announce your record is created in **Route53**

![[Pasted image 20251221174726.png]]
Now try to request into the application via DNS already define, and **the result is failure** because ExternalDNS will map the Local IP address for your A record, it means you can access externally. Therefore, I try to modify it to **Public IP** and this case study will be work at all

```bash
curl externaldns-nginx.yourdomain.route53

<html>
<head><title>Cluster Discovery</title></head>
<body>
  <h1>Hello from the Cluster!</h1>
  <p>This application is currently running on: <b>RKE2 Cluster</b></p>
</body>
</html
```

>[!note]
>The challenge still here with private IP and I need to manual change it's via Route53 portal, but it's also proven the record able to create via ExternalDNS for your cluster
## Advantaged configuration with ExternalDNS

To resolve these issues and optimize your setup, ExternalDNS provides a wide array of configuration options via `annotations`. These allow you to tailor DNS management to specific use cases—such as handling multiple DNS providers or improving synchronization efficiency. I have curated several resources that break down these advanced configurations in detail. Some of these community guides offer a more practical and accessible approach compared to the official documentation

- [ExternalDNS - Available Annotations](https://kubernetes-sigs.github.io/external-dns/latest/docs/annotations/annotations/): The comprehensive list of supported annotations for various providers.
- [DevOpsCube - ExternalDNS Step-by-Step Guide](https://devopscube.com/setup-externaldns-on-eks/): A practical breakdown of IAM roles and multi-provider setups.
- [Avesha Docs - Advanced Annotation Examples](https://docs.avesha.io/documentation/enterprise-smtd/0.1.0/external-dns/advanced-configuration/available-annotations/): Detailed examples for TTL, target overrides, and weighted records. 🌟 **(Recommended)**

These are couple of `annotations` and bring back great change for your configuration

- `external-dns.alpha.kubernetes.io/acces`: `private` or `public` --> This option lets you define what address need to define when your cluster have both `private` an `public` for Service and Ingress
- `external-dns.alpha.kubernetes.io/hostname`: This option lets you define the hostname for your service or ingress, especially it can propose for **Single or Multiple** domains and it will separate by comma `,` in multiple domains. You can use this for define host instead of specific inside `spec.rules.host` of ingress for example, but usually use it with service in mode **Load Balancer**

```yaml
apiVersion: v1
kind: Service
metadata:
  annotations:
    external-dns.alpha.kubernetes.io/hostname: sub.domain.tld,sub2.domain.tld,sub3.domain.tld
```

- `external-dns.alpha.kubernetes.io/target`: This option lets you define the target of your domain assignment, it will truly important in the situation if you want to specific multiple IP Addresses, or CNAME record for domain resolution. In the situation, the list have more than one record, you can use comma `,` to separate between of them

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    external-dns.alpha.kubernetes.io/hostname: sub.domain.tld
    external-dns.alpha.kubernetes.io/target: 12.34.56.78,90.12.34.56
```

- `external-dns.alpha.kubernetes.io/ttl`: This options let you define TTL (Time To Live) value for your DNS record, it's typically important for you to define the strategies failover and support the routing for upgrading the IP address behind the DNS. **The value is setting in seconds (s)**

```yaml
apiVersion: v1
kind: Service
metadata:
  annotations:
    external-dns.alpha.kubernetes.io/hostname: sub.domain.tld
    external-dns.alpha.kubernetes.io/ttl: "60"
```

With these optional, you can refine your ingress with new configuration like this, it will let your ExternalDNS define with great expectation record in Route53

```yaml {6-8}
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nginx-distro-check
  annotations:
    external-dns.alpha.kubernetes.io/target: test.anotherdomain.com
    external-dns.alpha.kubernetes.io/ttl: "60"
    external-dns.alpha.kubernetes.io/access: public
spec:
  ingressClassName: nginx
  rules:
  - host: externaldns-nginx.yourroute53.com
    http:
      paths:
      - backend:
          service:
            name: nginx-distro-check
            port:
              number: 80
        path: /
        pathType: Prefix
status:
  loadBalancer: {}
```

With Route53, you can do more stuff over than that, it's truly helpful for the situation if you want to define **Weight**, **Routing Policies**, **Healthcheck** for your domain

- [ExternalDNS - AWS Routing Policies](https://kubernetes-sigs.github.io/external-dns/latest/docs/tutorials/aws/#routing-policies)
- [ExternalDNS - AWS Associating DNS records with healthchecks](https://kubernetes-sigs.github.io/external-dns/latest/docs/tutorials/aws/#associating-dns-records-with-healthchecks)

For setting any routing policies, you need to define the annotation `external-dns.alpha.kubernetes.io/set-identifier` to define your unique identity for distinguish your policies, and you jut have permission to choose only one of these policies to adapt for your domain, for example

If you want to ensure the **Blue/Green or A/B Testing**, you can use `aws-weight` for this situation

**Cluster A Manifest**

```yaml
metadata:
  annotations:
    external-dns.alpha.kubernetes.io/hostname: app.example.com
    external-dns.alpha.kubernetes.io/set-identifier: cluster-a-record
    external-dns.alpha.kubernetes.io/aws-weight: "80"
```

**Cluster B Manifest**

```yaml
metadata:
  annotations:
    external-dns.alpha.kubernetes.io/hostname: app.example.com
    external-dns.alpha.kubernetes.io/set-identifier: cluster-b-record
    external-dns.alpha.kubernetes.io/aws-weight: "20"
```

Next one, if you want to ensure the Latency-Based Routing (Multi-Region), you can use `aws-region` with different identify for multiple-regions

```yaml
metadata:
  annotations:
    external-dns.alpha.kubernetes.io/hostname: global-app.example.com
    external-dns.alpha.kubernetes.io/set-identifier: us-east-endpoint
    external-dns.alpha.kubernetes.io/aws-region: us-east-1
```

How about failover, you can use it with `aws-failover` with define which one is primary and secondary for failover strategies

```yaml
metadata:
  annotations:
    external-dns.alpha.kubernetes.io/hostname: blog.example.com
    external-dns.alpha.kubernetes.io/set-identifier: primary-site
    external-dns.alpha.kubernetes.io/aws-failover: PRIMARY
```

If you wanna find the advantage mode for Geographic, you can find to two options for **Geolocation-based routing** (`aws-geolocation-continent-code`, `aws-geolocation-country-code` or `aws-geolocation-subdivision-code`) and **Geoproximity routing** (`aws-geoproximity-region`, `aws-geoproximity-local-zone-group`, `aws-geoproximity-coordinates` and `aws-geoproximity-bias`). With these options, you can do tone of strategies for your DNS Routing directly inside Kubernetes

ExternalDNS allow your record to attach with **Health-Check Template** but you can't define it with this tools, you only have permission to attach them with particular id, for example `external-dns.alpha.kubernetes.io/aws-health-check-id: <health-check-id>`

## Multi-Cluster with ExternalDNS Experiment and Result

>[!warning] TBD ⌛
>This part will come soon in next release with need to more time to experiment to prove it will bring back efficiency with high productivity

# Conclusion

![[meme-run-k8s.png|center|450]]

> [!done]
> That wraps up this post! I know I still owe you a deep dive into the most critical part—how the full stack handles **ExternalDNS with Route53** in a **multi-cluster** environment. I want to ensure the compatibility and reliability are 100% before sharing, so stay tuned for a major update on that experiment soon!

> [!quote]
> This really is the final technical post of the year! As the holidays approach, I hope all your deployments run smoothly and perfectly. I am so incredibly grateful for your support throughout this journey.
> 
> I’ll be taking a well-deserved break and working on a "Year in Review" recap. I look forward to seeing you all again in early 2026! It’s been a great year—now go enjoy time with your family and have a fantastic holiday. Merry Christmas and a Happy New Year! See you all soon! 🍻

