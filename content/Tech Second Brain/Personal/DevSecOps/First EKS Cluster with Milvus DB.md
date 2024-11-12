---
title: First EKS Cluster with Milvus DB
tags:
  - DIY
  - aws
  - k8s
  - vector-database
  - cloud-services
---
>[!quote]
>Hello @all, long time no see, it's me again. Sorry, I don't have time for doing personal blogging, but my job is crazy disaster, anything need to ready and I feel not well with my health to control over two things. Now, I take a break and don't touch anything, therefore I write a blog again. Today, I learn a lot to setup first EKS cluster, especially Milvus Cluster as VectorDB. Let's digest

# Talk a bit about EKS

![[Arch_Amazon-EKS-Cloud_64.svg|center|400]]

If you first time to come up with Kubernetes, you can enjoy and learn more about this techniques inside couple of my blog, that huge and truly insane

- [[Kubewekend Session 3|Kubewekend Session 3: Basically about Kubernetes architecture]]
- [[AKS|Azure Kubernetes Service]]
- [DevOps Training Session 13: Cloud - K8s Overview](https://hackmd.io/2egQHy8SRMu_hT7lMpfrKg)

Back again with EKS, It's Kubernetes Services of AWS Cloud, try to explore more about that at [Amazon EKS - Kubernetes concepts](https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-concepts.html)

>[!info]
>Amazon Elastic Kubernetes Service (Amazon EKS) is an AWS managed service based on the open source [Kubernetes](https://kubernetes.io/) project. While there are things you need to know about how the Amazon EKS service integrates with AWS Cloud (particularly when you first create an Amazon EKS cluster)

As you can see in description, EKS is built and used as usual Kubernetes but leverage in AWS Resources, It's mean you will bring Kubernetes to approach with S3, ALB (Application Load Balancer), EBS (GP2, GP3), VPC, and .....

To create and get for yourself one EKS Cluster, you need to approach at least with one of things [eksctl](https://eksctl.io/) - The official CLI for Amazon EKS. But, you can use [Terraform](https://registry.terraform.io/modules/terraform-aws-modules/eks/aws/latest) or [Pulumi](https://www.pulumi.com/registry/packages/aws/api-docs/eks/cluster/) to handle the job created with same effort, it's totally up to you.

>[!note]
>Kubernetes is one of interesting technology nowadays, no one can refuse that and you will have multiple way to approach, and you can handle your cluster in multiple way. But with EKS, leverage in AWS Resources bring back you more challenge and powerful, you can get more value from them

You can try to calculate your cluster setup cost around how much and I think you will fair enough to give EKS a chance to work in your organizations, follow the [link](https://aws.amazon.com/eks/pricing/) to get more information. (NOTE: EKS will charge much money, you will pay for EC2, EBS and Control Plane. But you need to concern use newest version to prevent charge [extended support EKS](https://aws.amazon.com/blogs/containers/amazon-eks-extended-support-for-kubernetes-versions-pricing/) with high price)

BTW, EKS is well place where you want to both used AWS Resources and operating microservice used them, that tuff with price but high quality back. I think it's fair enough but if you choose you can concern with AKS, DOKS, ...

# Set up Milvus in EKS

>[!info]
>Turn back the story, I need to focus setup Milvus VectorDB inside EKS and It's about journey to handle that but really pitfall you need to catch and I try to warn about that with you to get good setup

## Install and Setup Prerequisites

You can read about setup through article [Deploy a Milvus Cluster on EKS](https://milvus.io/docs/eks.md). Following the documentation, you need to prepare some tools inside your machine, such as

- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) - AWS Command Line

```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
rm -rf aws awscliv2.zip
```

- [Kubectl](https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html) - Kubernetes Command Line

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo chmod +x kubectl
sudo mv kubectl /usr/local/bin
```

- [helm](https://helm.sh/docs/intro/install/) - Kubernetes Package Managers

```bash
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

- [eksctl](https://eksctl.io/) - The official CLI for Amazon EKS. (NOTE: Install version `0.194.0`, reason why you will know in down below)

```bash
# for ARM systems, set ARCH to: `arm64`, `armv6` or `armv7`
ARCH=amd64
PLATFORM=$(uname -s)_$ARCH

curl -sLO "https://github.com/eksctl-io/eksctl/releases/latest/download/eksctl_$PLATFORM.tar.gz"

# (Optional) Verify checksum
curl -sL "https://github.com/eksctl-io/eksctl/releases/latest/download/eksctl_checksums.txt" | grep $PLATFORM | sha256sum --check

tar -xzf eksctl_$PLATFORM.tar.gz -C /tmp && rm eksctl_$PLATFORM.tar.gz

sudo mv /tmp/eksctl /usr/local/bin
```

Next you need to prepare IAM to access into AWS Organization. For me, I usually handle AWS with highest permission `AdministratorAccess`, It's totally not recommend.

- But as usual, when you want to quick setup and not want to corrupt anything in provisioning progress, choosing highest permission is better way. BTW, you can try to define one of these as [EKS Policies](https://eksctl.io/usage/minimum-iam-policies/), if you want to keep anything secure

- With Milvus Cluster require S3 Access, you need to define add-on permission for this resource. You can do specific for what bucket created for Milvus or you can use highest permission of S3 like `AmazonS3FullAccess`

## Setup Bucket for Milvus

In my circumstance, I prefer to use terraform for provisioning s3 bucket

```bash title="main.tf"
### S3 bucket for milvus object storage ###
resource "aws_s3_bucket" "milvus_object" {
  bucket = "milvus-object-bucket"
}
```

After setup code block to create `aws_s3_bucket`, you need to run terraform workflow

```bash
# Setup PATH, Install dependencies, ...
terraform init
# Get the Plan to see what resource create or destroy
terraform plan
# Apply when use pleasure with plan
terraform apply
```

## Setup EKS Cluster

As you can see, EKS have multiple ways to setup, and we can choose to use `eksctl` for new way to provision cluster for us, why not.

`eksctl` will create EKS cluster by using **AWS Cloudformation**. With `default`, when you try to run easy command with `eksctl`, you will get one managed **nodegroup** containing two `m5.large` nodes.

```bash
eksctl create cluster
```

But in this case, I will try to make more customize because `eksctl` permits us to do stuff like define what VPC, EC2 Size, Plugin, ... You will have file like this

```yaml title="cluster.yaml"
# API of ekctl to make conversation
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig

# Config information for Cluster
metadata:
  # Name Cluster
  name: "milvus-cluster"
  # Region
  region: "ap-southeast-1"
  # Version EKS Cluster
  version: "1.29" # Support at least March 2025

# Config IAM for Cluster
iam:
  # Enable withOIDC to automatically create an IRSA for the amazon CNI plugin and limit permissions granted to nodes in your cluster
  # Documentation: https://eksctl.io/usage/security/#withoidc
  withOIDC: true

  # Give permission depend on RBAC for each sa
  serviceAccounts:
  - metadata:
      name: aws-load-balancer-controller
      namespace: kube-system
    wellKnownPolicies:
      awsLoadBalancerController: true
  - metadata:
      name: milvus-s3-access-sa
      # if no namespace is set, "default" will be used;
      # the namespace will be created if it doesn't exist already
      namespace: milvus
      labels: {aws-usage: "milvus"}
    # Attach directly the aws policies for serviceAccount
    # Documentation: https://eksctl.io/usage/iamserviceaccounts/?h=service#usage-with-config-files
    attachPolicyARNs:
    - "arn:aws:iam::aws:policy/AmazonS3FullAccess"

# Use existed VPC to create EKS.
# If you don't config vpc subnets, eksctl will automatically create a brand new VPC
# Documentation: https://eksctl.io/usage/vpc-configuration/?h=vpc#use-existing-vpc-other-custom-configuration
vpc:
  subnets:
    private:
      ap-southeast-1a: { id: subnet-123abc }
      ap-southeast-1b: { id: subnet-456xyz }
      ap-southeast-1c: { id: subnet-789def }

# Definition NodeGroups as EC2 Instance for EKS Cluster
# Documentation: https://eksctl.io/usage/nodegroup-managed/
managedNodeGroups:
  - name: ng-milvus
    labels: { role: milvus }
    instanceType: m6i.large
    desiredCapacity: 1
    privateNetworking: true

# A new feature that lets you enable and manage Kubernetes operational software for your AWS EKS clusters
# Documentation: https://eksctl.io/usage/addons/
addons:
# Networking: Using VPC
- name: vpc-cni # no version is specified so it deploys the default version
  attachPolicyARNs:
    - arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy
# Networking: Using to service discovery
- name: coredns
  version: latest # auto discovers the latest available
# Networking: Using to service routing
- name: kube-proxy
  version: latest
# Storage: Using AWS EBS
- name: aws-ebs-csi-driver
  wellKnownPolicies:      # add IAM and service account
    ebsCSIController: true
```

After you define, you can use `eksctl` command to setup your cluster

```bash
eksctl create cluster -f cluster.yaml
```

Wait around 10 - 15 mins, and you can get kubeconfig from `aws eks` command

```bash
aws eks update-kubeconfig --region "ap-southeast-1" --name "milvus-cluster"
```

And now, you can use `kubectl` to retrieve new cluster.

But hold on, before we go to next one, I will help you prevent some mistake inside `eksctl` in `V0.193.0` to relate with issue https://github.com/eksctl-io/eksctl/issues/7987

![[Pasted image 20241110140735.png]]

This bug will create error when you try to create load balancer with serviceAccount permission, you will assign for `aws-load-balancer-controller` in next part. This service account will miss two configuration and cause you a noise when create load balancing

- `elasticloadbalancing:DescribeListenerAttributes`
- `elasticloadbalancing:ModifyListenerAttributes`

So why I give you advice to install `eksctl` in `V0.194.0` because the commit is attached with this version. You can read about fix at https://github.com/eksctl-io/eksctl/blob/v0.194.0/pkg/cfn/builder/iam_test.go#L503

But if you unlucky to see this warning, don't afraid you can fix it up if you can find exactly role attach with your service account inside AWS IAM, modify context with add `elasticloadbalancing:DescribeListenerAttributes` and save to apply

Next, you will do second work relate about your exist VPC and Subnet because you use `VPC CNI` to setup network inside Cluster. Therefore, It means to your pod will try discover and make conversation via that network, load balancer work and spawn inside subnet, you need to add following tag if aws doesn't add it for you. Read more about this one at [View Amazon EKS networking requirements for VPC and subnets](https://docs.aws.amazon.com/eks/latest/userguide/network-reqs.html)

>[!warning]
>If you want to deploy load balancers to a subnet, the subnet must have the following tag:
>1. Private Subnet: `kubernetes.io/role/internal-elb` : `1`
>2. Public Subnet: `kubernetes.io/role/elb` : `1`
>3. Public and Private Subnet: `kubernetes.io/cluster/<name-cluster>`: `shared`

Some advices and best practices when you try combine EKS with VPC to load balancer

- [VPC and Subnet Considerations](https://docs.aws.amazon.com/eks/latest/best-practices/subnets.html)
- [How do I automatically discover the subnets that my Application Load Balancer uses in Amazon EKS?](https://repost.aws/knowledge-center/eks-vpc-subnet-discovery)

## Setup StorageClass

>[!note]
>Milvus uses `etcd` as meta storage and needs to rely on the `gp3` StorageClass to create and manage PVC.

You can check `addons` in `cluster.yaml`, you will see `aws-ebs-csi-driver` that one is driver CSI to help your cluster connect and create EBS from your Kubernetes. To do that stuff, Kubernetes have `StorageClass` to define information about communicate mechanism

```yaml title="storageclass.yaml"
# Milvus uses etcd as meta storage and needs to rely on the gp3 StorageClass to create and manage PVC.
# Documentation: https://milvus.io/docs/eks.md#Create-a-StorageClass
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: ebs-gp3-sc
  annotations:
    storageclass.kubernetes.io/is-default-class: "true"
provisioner: ebs.csi.aws.com
volumeBindingMode: WaitForFirstConsumer
parameters:
  type: gp3
```

After you copy and put that in the file, you can try to apply this manifest into exist EKS with kubectl

```bash
kubectl apply -f storageclass.yaml
```

With current cluster, `gp2` is default `storageclass`, you need use `kubectl patch` command to change `gp2` into `gp3` for default

```bash

kubectl patch storageclass gp2 -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"false"}}}'

```

## Setup AWS LoadBalancer Controller

You have multiple way to help your service go live in Kubernetes, such as Ingress, API Gateway and LoadBalancer. With EKS, if you don't want to become frustrated to setup something strange inside cluster, do best practice aws loadbalancer to reduce lot of complex. **(NOTE: Sometime It's truly exist funny error, but it's up to you 😄)**

Easily to setup `aws-load-balancer-controller`, we can use `helm` for easier applying definition to our cluster directly. You can read blog of mine about [[What is Helm]]

```bash
# Add EKS Chart to repo
helm repo add eks https://aws.github.io/eks-charts
# Update Repo
helm repo update
```

Install the AWS Load Balancer Controller with  `aws-load-balancer-controller` chart

```bash
helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system \
  --set clusterName='milvus-cluster' \
  --set serviceAccount.create=false \
  --set serviceAccount.name=aws-load-balancer-controller # Use sa defined - problem in eksctl V0.193.0
```

Wait a bit and you can see result with `kubectl` command

```bash
kubectl get deployment -n kube-system aws-load-balancer-controller
```

You need to learn about how to use `aws-load-balancer-controller`, I think you concern to refer with [AWS Load Balancer Controller Documentation](https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.10/)

## Setup Milvus Cluster

>[!note]
>Now your cluster is ready to setup, you need to use `helm` to import chart and start installation.

Because Milvus Cluster is not running as standalone, your configuration can become complicate a bit, so for convenient, you need to prepare `milvus.yaml` to help `helm` create expectation Milvus cluster. To know about how configuration, you can try to access to [ArtifactHub - milvus](https://artifacthub.io/packages/helm/milvus-helm/milvus?modal=values) and find what things you need to overwrite or not

```yaml title="milvus.yaml"
cluster:
  enabled: true

# Create service as Load Balancer for Milvus Database
service:
  type: LoadBalancer
  port: 19530
  annotations: 
    service.beta.kubernetes.io/aws-load-balancer-type: external
    service.beta.kubernetes.io/aws-load-balancer-name: milvus-service
    service.beta.kubernetes.io/aws-load-balancer-scheme: internet-facing
    service.beta.kubernetes.io/aws-load-balancer-nlb-target-type: ip

# Disable minio to use S3 instead
minio:
  enabled: false

externalS3:
  enabled: true
  host: "s3.ap-southeast-1.amazonaws.com"
  port: "443"
  useSSL: true
  bucketName: "<bucket-name>"
  useIAM: true
  cloudProvider: "aws"
  region: "ap-southeast-1"

# Disable Pulsal and use Kafka instead
pulsar:
  enabled: false

kafka:
  enabled: true

# Enable Authentication to Milvus DB
extraConfigFiles:
  user.yaml: |+
    common:
      security:
        authorizationEnabled: true

# Enable Attu
attu:
  enabled: true
  ingress:
    enabled: true
    ingressClassName: "alb"
    annotations:
      # Read More at: https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.10/guide/ingress/annotations/#ingress-annotations
      alb.ingress.kubernetes.io/scheme: internet-facing # Public intenet
      alb.ingress.kubernetes.io/target-type: ip # Pod IP
      alb.ingress.kubernetes.io/listen-ports: '[{"HTTPS":443}]' # 443
      alb.ingress.kubernetes.io/certificate-arn: xxxxxx # Arn ACM HTTPS
      alb.ingress.kubernetes.io/ssl-policy: ELBSecurityPolicy-TLS13-1-2-2021-06
 ```

Now you can reach to `helm` and create cluster what you want

```bash
helm repo add milvus https://zilliztech.github.io/milvus-helm/
helm repo update
helm install milvus-db milvus/milvus -n milvus -f milvus.yaml
```

Now you need to wait to all of components work with no error, you will meet some problem because reason

- App restart one to two time for wait `etcd` and `kafka` already ready
- You can't modify replica number `etcd`, `kafka` and `zookeeper` with cluster mode because you will meet the error related with replicate factor

Your patience will get fair result if you wait enough long 😄. Just kidding, you can try to get cluster with kubectl

```bash
kubectl get pods -n milvus
```

To get svc and attu, you can try another kubectl command

```bash
# Get svc for milvus db
kubectl get svc -n milvus

# Get ingress for attu
kubectl get ingress -n milvus 
```

# Adjust domain for Milvus

Before you can approach this UI, you need to handle to map your expectation domain with TLS to ready connect from browser

![[Pasted image 20241110154411.png]]

You can use Terraform to create Route53 record, if your domain will serve and managed with supportive from ACM (AWS Certificate Managed), your new domain will help you serve TLS, HTTPS quickly

```bash title="main.tf"
### S3 bucket for milvus object storage ###
resource "aws_s3_bucket" "milvus_object" {
  bucket = "milvus-object-bucket"
}

# Get exist ALB was created by Milvus Cluster
data "aws_lb" "milvus_lb" {
  arn = "xxxxxxxxxxx"
}

data "aws_lb" "milvus_attu" {
  arn = "yyyyyyyyyyy"
}

# Create domain with ACM from AWS
resource "aws_route53_record" "milvus_attu" {
  zone_id = "zone_id_xyz"
  name    = "milvus-attu.example.com"
  type    = "CNAME"
  ttl     = "300"
  records = [data.aws_lb.milvus_attu.dns_name]
}

resource "aws_route53_record" "milvus_endpoint" {
  zone_id = "zone_id_xyz"
  name    = "milvus.example.com"
  type    = "CNAME"
  ttl     = "300"
  records = [data.aws_lb.milvus_lb.dns_name]
}
```

Run terraform workflow and you will try to connect into Milvus Cluster from browser. 

>[!note]
>Your start user and password with Milvus Cluster is `root:Milvus`
> **WARNING: NEED TO CHANGE AFTER FIRST LOGIN**

# Conclusion

![[byebye.png|center|500]]

>[!done]
>That's all thing, I want to share with you when I create first EKS for myself, and it's good experience to have opportunity to do, capture the journey and share to whole of you. I thinks EKS is not hard to setup, quite easily but when you try to leverage AWS Services, you need to make sure you control over of that because if you mess up, your cost will reach to huge number. 

>[!quote]
>Couple tough week with me, not have any mood to handover anything else, mess up with work and do some stuff didn't make me comfortable. This week is kind of that, but I put it back and try to reach to good feeling, back again with useful article and hope so you feel well with this one. Thanks again buddy, stay safe, learn a new thing and we will meet in next weekend. Bye 👋
