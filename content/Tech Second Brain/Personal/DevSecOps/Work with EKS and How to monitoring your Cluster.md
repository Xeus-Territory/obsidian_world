---
title: Work with EKS and How to monitoring your Cluster
tags:
  - devops
  - k8s
  - monitoring
  - aws
  - cloud-services
---
>[!quote]
>Hi @all, I back after previous week spend for couple stuff of myself, recover and love 😄. How is your holiday?, it's starting right, I hope you have good time with family and enjoy your holiday. Today, I think that one is the last article about technologies before new year, cuz I want to spend next week for recap session, so enjoy the topics today. In today session, we will learn how can you work with EKS and implement for your cluster once monitoring stack. Let's digest

# How can we work with EKS

![[short-story-meme.png|center]]

>[!question]
>When you kick off new EKS, I believe you can messup a bit with how we can setup the authentication to help `kubectl` or `aws` can retrieve the information inside Kubernetes Cluster via `Kubernetes API`. This one is really interesting question

I need spend a couple of hours to see how this work, because I need to access to cluster to see what happen inside EKS Milvus Cluster, you can explore more information at [[First EKS Cluster with Milvus DB]]. 

## Methodology to authenticate

When I first time to use `EKS`, It's totally different than AKS. And I reach to how to configuration the permission to help this blocker resolved, through

- [AWS Docs - Grant IAM users and roles access to Kubernetes APIs](https://docs.aws.amazon.com/eks/latest/userguide/grant-k8s-access.html)
- [AWS Docs - Associate access policies with access entries](https://docs.aws.amazon.com/eks/latest/userguide/access-policies.html)
- [AWS Docs - Actions, resources, and condition keys for Amazon Elastic Kubernetes Service](https://docs.aws.amazon.com/service-authorization/latest/reference/list_amazonelastickubernetesservice.html)

There is many ways to authenticate, and you can catch up that really exist in two types

- **An AWS Identity and Access Management (IAM) _principal_ (role or user)** – This type requires authentication to IAM. Users can sign in to AWS as an [IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html) user or with a [federated identity](https://aws.amazon.com/identity/federation/) by using credentials provided through an identity source.
- **A user in your own OpenID Connect (OIDC) provider** – This type requires authentication to your [OIDC](https://openid.net/connect/) provider. For more information about setting up your own OIDC provider with your Amazon EKS cluster, see [Grant users access to Kubernetes with an external OIDC provider](https://docs.aws.amazon.com/eks/latest/userguide/authenticate-oidc-identity-provider.html).

>[!note]
>Following my situation, I prefer to use AWS IAM because it's kinda easily to configuration because I'am using IAM Identity Center that way can really help grant access for role assume for my shell to using `kubeconfig` via `kubectl`

To enable this feature, you can follow in couple of steps in next part
## Cluster Authenticated Mode and IAM Identities

![[Pasted image 20241222131937.png]]

If you choose follow to use **IAM principal (role and user)** to access `Kubernetes`, you need to follow methods to allow your **IAM principal** to access `Kubernetes` object in your cluster, including

- **Creating access entries**
- **Adding entries to the `aws-auth` `ConfigMap`**

In term of mine, I am using **access entries** to access to `Kubernetes` but it's kinda require you choose once of two option depend on your cluster version and platform version. Explore more at [Associate IAM Identities with Kubernetes Permissions](https://docs.aws.amazon.com/eks/latest/userguide/grant-k8s-access.html). If you wanna easily, you should use `access entries` than `aws-auth`

To set `access entries` available, you have couple stuff do with Cluster Authentication Mode because you need to set your cluster determine to permit your **IAM principals** be able to access `Kubernetes` object. There are three mode you can set for your Cluster, including

- **The `aws-auth` `ConfigMap` inside the cluster** (Original)
- **Both the `ConfigMap` and access entries**
- **Access entries only**

In my perspective, you can choose to use **both** because I don't wanna corrupt anything because you know that tuff if you want intercept any problem from your Cluster to AWS Service integrated like MilvusDB, so for ensure, I enable both, and when you apply it you can see the authentication mode of cluster like

![[Pasted image 20241222133138.png]]

Awesome, now you can turn back and add the entry depend on your definition. If you want explore more way to configuration EKS cluster authentication mode, don't forget to double-check blog [A deep dive into simplified Amazon EKS access management controls](https://aws.amazon.com/vi/blogs/containers/a-deep-dive-into-simplified-amazon-eks-access-management-controls/)
## Configure IAM Access Entry

>[!info]
>As you know about I use **IAM Identity Center** to configure authentication and authorization for user and group to access AWS Resources. With **IAM Access Entry** for EKS, It's not exception, I need to add the policies to grant account can describe **EKS Cluster** configuration for retrieving `kubeconfig` to current shell

First of all, back to `terraform` configuration to configure add-on policies, you can consider to provide policy `AmazonEKSWorkerNodePolicy` because you need permission `eks:DescribeCluster` to get `kubeconfig` and this policy actual contains it, so hit to `terraform` and do it for yourself. Explore at [[AWS SSO from Self Gitlab Terraform Module Registry#Reuse with your AWS SSO module|Reuse with your AWS SSO module]]

```bash title="sso.tf"
module "sso_identity" {
  source = "gitlab.com/awesome_terraform_practice/aws-iam-identity-center/aws"
  version = "0.0.1"
  ...
  ...
  ...
    DeveloperServiceAccess = {
      description          = "Provides AWS Developers permissions.",
      session_duration     = "PT3H"
      aws_managed_policies = [
      "arn:aws:iam::aws:policy/job-function/ViewOnlyAccess",
      "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
      ]
      tags                 = { ManagedBy = "Terraform" }
    }
  }
  ...
  ...
  ...
}
```

Now apply `terraform` and you can describe your EKS Cluster with AWS Portal, It gains you permission to retrieve `kubeconfig` through command

```bash
aws eks update-kubeconfig --region <CLUSTER_REGION> --name <NAME_CLUSTER>
```

You just need to setup it for Developer because if you have administrator to access AWS, you may need have permission to view and configuration tons of things with EKS. BTW, you need to request DevOps or AWS Admin to create access entries for your `DeveloperServiceAccess` role. You can follow step at [AWS Docs - Create access entries](https://docs.aws.amazon.com/eks/latest/userguide/creating-access-entries.html)

I prefer the way to create this entries through AWS Portal, kinda convenient and after you complete, who have `DeveloperServiceAccess` can able to use this access Kubernetes object. BTW you need consider what policy provide for this role inside Kubernetes cluster, you can double-check at [AWS Docs - Review access policy permissions](https://docs.aws.amazon.com/eks/latest/userguide/access-policy-permissions.html)

>[!note]
>In my situation, I like give permission `AmazonEKSClusterAdminPolicy` for who is Administrator of EKS Cluster and `AmazonEKSViewPolicy` for who is developer of EKS Cluster

Now you can try to export profile with AWS SSO, and see what happen with your developer permission

```bash
aws configure sso --profile DeveloperAccess
```

And It's work recently, you can retrieve `pods`, `logs` inside your target EKS Cluster. If you want to retrieve the `metrics` through `metrics.k8s.io`, you need to grant permission from `AmazonEKSViewPolicy` to `AmazonEKSAdminViewPolicy` **(Note: Secret be able to view with this permission)**

>[!done]
>Now you can access and practice with EKS Cluster from both AWS Portal and your local machine with `kubectl`

# EKS Cluster Monitoring and Observability

![[monitoring-meme.png|center]]

>[!quote]
>As you can see, when you access Kubernetes, you can use `kubectl` to view both `metrics` and `logs` but you know but in term of developer, that kinda tuff when they first face up with `kubectl` and `kubernetes` so read all of these output inside the shell can be tough. But, AWS always offer another way to monitor and observer the EKS Cluster through **CloudWatch** or **Grafana/Prometheus**, It's up to you to choose one of these to operating for your cluster

For me, CloudWatch is such a good thing, so we can try follow that implementation leverage that one to create fully stack to directly monitor your EKS Cluster, let's check it out

## Intercept metrics and logs with Cloudwatch Agents

![[Pasted image 20241222165831.png]]

First of all, I need to figure how we can do, so reach to couple blog and documentation of AWS to explore more information, such as

- [AWS Docs - Monitor your cluster performance and view logs](https://docs.aws.amazon.com/eks/latest/userguide/eks-observe.html)
- [AWS Docs - Setting up Container Insights on Amazon EKS and Kubernetes](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/deploy-container-insights-EKS.html)
- [AWS Docs - Quick Start setup for Container Insights on Amazon EKS and Kubernetes](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Container-Insights-setup-EKS-quickstart.html)
- [AWS Docs - Setting up the CloudWatch agent to collect cluster metrics](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Container-Insights-setup-metrics.html)
- [AWS Docs - Send logs to CloudWatch Logs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Container-Insights-EKS-logs.html)
- [AWS Docs - Set up Fluent Bit as a DaemonSet to send logs to CloudWatch Logs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Container-Insights-setup-logs-FluentBit.html)
- [Medium - Streamlining Logging and Monitoring in Amazon EKS with Fluentd and CloudWatch Agent](https://harsh05.medium.com/streamlining-logging-and-monitoring-in-amazon-eks-with-fluentd-and-cloudwatch-agent-756f828c0df3)
- [AWS Blogs - Fluent Bit Integration in CloudWatch Container Insights for EKS](https://aws.amazon.com/blogs/containers/fluent-bit-integration-in-cloudwatch-container-insights-for-eks/)
- [GitHub - amazon-cloudwatch-container-insights](https://github.com/aws-samples/amazon-cloudwatch-container-insights) - CloudWatch Agent Dockerfile and K8s YAML templates for CloudWatch Container Insights.

After spend a bit time to read and view couple results from implementation, so I decide to install stack to monitor cluster, including

- **CloudWatch Agent** - Scrape metrics
- **Fluentbit** - Scrape logs

To easier in implementation, so I try retrieve  a fully manifest combine both CloudWatch Agent and Fluentbit, you can double check before install inside your cluster. Explore it at [cwagent-fluent-bit-quickstart-enhanced.yaml](https://github.com/aws-samples/amazon-cloudwatch-container-insights/blob/main/k8s-deployment-manifest-templates/deployment-mode/daemonset/container-insights-monitoring/quickstart/cwagent-fluent-bit-quickstart-enhanced.yaml)

```yaml title="cwagent-fluent-bit-quickstart-enhanced.yaml"
# create amazon-cloudwatch namespace
apiVersion: v1
kind: Namespace
metadata:
  name: amazon-cloudwatch
  labels:
    name: amazon-cloudwatch
---

# create cwagent service account and role binding
apiVersion: v1
kind: ServiceAccount
metadata:
  name: cloudwatch-agent
  namespace: amazon-cloudwatch

---
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: cloudwatch-agent-role
rules:
  - apiGroups: [""]
    resources: ["pods", "nodes", "endpoints"]
    verbs: ["list", "watch"]
  - apiGroups: ["apps"]
    resources: ["replicasets", "daemonsets", "deployments", "statefulsets"]
    verbs: ["list", "watch"]
  - apiGroups: [ "" ]
    resources: [ "services" ]
    verbs: [ "list", "watch" ]
  - apiGroups: ["batch"]
    resources: ["jobs"]
    verbs: ["list", "watch"]
  - apiGroups: [""]
    resources: ["nodes/proxy"]
    verbs: ["get"]
  - apiGroups: [""]
    resources: ["nodes/stats", "configmaps", "events"]
    verbs: ["create", "get"]
  - apiGroups: [""]
    resources: ["configmaps"]
    resourceNames: ["cwagent-clusterleader"]
    verbs: ["get","update"]
  - nonResourceURLs: ["/metrics"]
    verbs: ["get", "list", "watch"]

---
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: cloudwatch-agent-role-binding
subjects:
  - kind: ServiceAccount
    name: cloudwatch-agent
    namespace: amazon-cloudwatch
roleRef:
  kind: ClusterRole
  name: cloudwatch-agent-role
  apiGroup: rbac.authorization.k8s.io
---

# create configmap for cwagent config
apiVersion: v1
data:
  # Configuration is in Json format. No matter what configure change you make,
  # please keep the Json blob valid.
  cwagentconfig.json: |
    {
      "agent": {
        "region": "{{region_name}}"
      },
      "logs": {
        "metrics_collected": {
          "kubernetes": {
            "cluster_name": "{{cluster_name}}",
            "metrics_collection_interval": 60,
            "enhanced_container_insights": true
          }
        },
        "force_flush_interval": 5
      }
    }
kind: ConfigMap
metadata:
  name: cwagentconfig
  namespace: amazon-cloudwatch
---

# deploy cwagent as daemonset
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: cloudwatch-agent
  namespace: amazon-cloudwatch
spec:
  selector:
    matchLabels:
      name: cloudwatch-agent
  template:
    metadata:
      labels:
        name: cloudwatch-agent
    spec:
      containers:
        - name: cloudwatch-agent
          image: public.ecr.aws/cloudwatch-agent/cloudwatch-agent:1.300032.3b392
          #ports:
          #  - containerPort: 8125
          #    hostPort: 8125
          #    protocol: UDP
          resources:
            limits:
              cpu:  400m
              memory: 400Mi
            requests:
              cpu: 400m
              memory: 400Mi
          # Please don't change below envs
          env:
            - name: HOST_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.hostIP
            - name: HOST_NAME
              valueFrom:
                fieldRef:
                  fieldPath: spec.nodeName
            - name: K8S_NAMESPACE
              valueFrom:
                fieldRef:
                  fieldPath: metadata.namespace
            - name: CI_VERSION
              value: "k8s/1.3.20"
          # Please don't change the mountPath
          volumeMounts:
            - name: cwagentconfig
              mountPath: /etc/cwagentconfig
            - name: rootfs
              mountPath: /rootfs
              readOnly: true
            - name: dockersock
              mountPath: /var/run/docker.sock
              readOnly: true
            - name: varlibdocker
              mountPath: /var/lib/docker
              readOnly: true
            - name: containerdsock
              mountPath: /run/containerd/containerd.sock
              readOnly: true
            - name: sys
              mountPath: /sys
              readOnly: true
            - name: devdisk
              mountPath: /dev/disk
              readOnly: true
      nodeSelector:
        kubernetes.io/os: linux
      volumes:
        - name: cwagentconfig
          configMap:
            name: cwagentconfig
        - name: rootfs
          hostPath:
            path: /
        - name: dockersock
          hostPath:
            path: /var/run/docker.sock
        - name: varlibdocker
          hostPath:
            path: /var/lib/docker
        - name: containerdsock
          hostPath:
            path: /run/containerd/containerd.sock
        - name: sys
          hostPath:
            path: /sys
        - name: devdisk
          hostPath:
            path: /dev/disk/
      terminationGracePeriodSeconds: 60
      serviceAccountName: cloudwatch-agent

---

# create configmap for cluster name and aws region for CloudWatch Logs
# need to replace the placeholders {{cluster_name}} and {{region_name}}
# and need to replace {{http_server_toggle}} and {{http_server_port}}
# and need to replace {{read_from_head}} and {{read_from_tail}}
apiVersion: v1
data:
  cluster.name: {{cluster_name}}
  logs.region: {{region_name}}
  http.server: {{http_server_toggle}}
  http.port: {{http_server_port}}
  read.head: {{read_from_head}}
  read.tail: {{read_from_tail}}
kind: ConfigMap
metadata:
  name: fluent-bit-cluster-info
  namespace: amazon-cloudwatch
---

apiVersion: v1
kind: ServiceAccount
metadata:
  name: fluent-bit
  namespace: amazon-cloudwatch
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: fluent-bit-role
rules:
  - nonResourceURLs:
      - /metrics
    verbs:
      - get
  - apiGroups: [""]
    resources:
      - namespaces
      - pods
      - pods/logs
      - nodes
      - nodes/proxy
    verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: fluent-bit-role-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: fluent-bit-role
subjects:
  - kind: ServiceAccount
    name: fluent-bit
    namespace: amazon-cloudwatch
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: fluent-bit-config
  namespace: amazon-cloudwatch
  labels:
    k8s-app: fluent-bit
data:
  fluent-bit.conf: |
    [SERVICE]
        Flush                     5
        Grace                     30
        Log_Level                 error
        Daemon                    off
        Parsers_File              parsers.conf
        HTTP_Server               ${HTTP_SERVER}
        HTTP_Listen               0.0.0.0
        HTTP_Port                 ${HTTP_PORT}
        storage.path              /var/fluent-bit/state/flb-storage/
        storage.sync              normal
        storage.checksum          off
        storage.backlog.mem_limit 5M

    @INCLUDE application-log.conf
    @INCLUDE dataplane-log.conf
    @INCLUDE host-log.conf

  application-log.conf: |
    [INPUT]
        Name                tail
        Tag                 application.*
        Exclude_Path        /var/log/containers/cloudwatch-agent*, /var/log/containers/fluent-bit*, /var/log/containers/aws-node*, /var/log/containers/kube-proxy*
        Path                /var/log/containers/*.log
        multiline.parser    docker, cri
        DB                  /var/fluent-bit/state/flb_container.db
        Mem_Buf_Limit       50MB
        Skip_Long_Lines     On
        Refresh_Interval    10
        Rotate_Wait         30
        storage.type        filesystem
        Read_from_Head      ${READ_FROM_HEAD}

    [INPUT]
        Name                tail
        Tag                 application.*
        Path                /var/log/containers/fluent-bit*
        multiline.parser    docker, cri
        DB                  /var/fluent-bit/state/flb_log.db
        Mem_Buf_Limit       5MB
        Skip_Long_Lines     On
        Refresh_Interval    10
        Read_from_Head      ${READ_FROM_HEAD}

    [INPUT]
        Name                tail
        Tag                 application.*
        Path                /var/log/containers/cloudwatch-agent*
        multiline.parser    docker, cri
        DB                  /var/fluent-bit/state/flb_cwagent.db
        Mem_Buf_Limit       5MB
        Skip_Long_Lines     On
        Refresh_Interval    10
        Read_from_Head      ${READ_FROM_HEAD}

    [FILTER]
        Name                kubernetes
        Match               application.*
        Kube_URL            https://kubernetes.default.svc:443
        Kube_Tag_Prefix     application.var.log.containers.
        Merge_Log           On
        Merge_Log_Key       log_processed
        K8S-Logging.Parser  On
        K8S-Logging.Exclude Off
        Labels              Off
        Annotations         Off
        Use_Kubelet         On
        Kubelet_Port        10250
        Buffer_Size         0

    [OUTPUT]
        Name                cloudwatch_logs
        Match               application.*
        region              ${AWS_REGION}
        log_group_name      /aws/containerinsights/${CLUSTER_NAME}/application
        log_stream_prefix   ${HOST_NAME}-
        auto_create_group   true
        extra_user_agent    container-insights

  dataplane-log.conf: |
    [INPUT]
        Name                systemd
        Tag                 dataplane.systemd.*
        Systemd_Filter      _SYSTEMD_UNIT=docker.service
        Systemd_Filter      _SYSTEMD_UNIT=containerd.service
        Systemd_Filter      _SYSTEMD_UNIT=kubelet.service
        DB                  /var/fluent-bit/state/systemd.db
        Path                /var/log/journal
        Read_From_Tail      ${READ_FROM_TAIL}

    [INPUT]
        Name                tail
        Tag                 dataplane.tail.*
        Path                /var/log/containers/aws-node*, /var/log/containers/kube-proxy*
        multiline.parser    docker, cri
        DB                  /var/fluent-bit/state/flb_dataplane_tail.db
        Mem_Buf_Limit       50MB
        Skip_Long_Lines     On
        Refresh_Interval    10
        Rotate_Wait         30
        storage.type        filesystem
        Read_from_Head      ${READ_FROM_HEAD}

    [FILTER]
        Name                modify
        Match               dataplane.systemd.*
        Rename              _HOSTNAME                   hostname
        Rename              _SYSTEMD_UNIT               systemd_unit
        Rename              MESSAGE                     message
        Remove_regex        ^((?!hostname|systemd_unit|message).)*$

    [FILTER]
        Name                aws
        Match               dataplane.*
        imds_version        v2

    [OUTPUT]
        Name                cloudwatch_logs
        Match               dataplane.*
        region              ${AWS_REGION}
        log_group_name      /aws/containerinsights/${CLUSTER_NAME}/dataplane
        log_stream_prefix   ${HOST_NAME}-
        auto_create_group   true
        extra_user_agent    container-insights

  host-log.conf: |
    [INPUT]
        Name                tail
        Tag                 host.dmesg
        Path                /var/log/dmesg
        Key                 message
        DB                  /var/fluent-bit/state/flb_dmesg.db
        Mem_Buf_Limit       5MB
        Skip_Long_Lines     On
        Refresh_Interval    10
        Read_from_Head      ${READ_FROM_HEAD}

    [INPUT]
        Name                tail
        Tag                 host.messages
        Path                /var/log/messages
        Parser              syslog
        DB                  /var/fluent-bit/state/flb_messages.db
        Mem_Buf_Limit       5MB
        Skip_Long_Lines     On
        Refresh_Interval    10
        Read_from_Head      ${READ_FROM_HEAD}

    [INPUT]
        Name                tail
        Tag                 host.secure
        Path                /var/log/secure
        Parser              syslog
        DB                  /var/fluent-bit/state/flb_secure.db
        Mem_Buf_Limit       5MB
        Skip_Long_Lines     On
        Refresh_Interval    10
        Read_from_Head      ${READ_FROM_HEAD}

    [FILTER]
        Name                aws
        Match               host.*
        imds_version        v2

    [OUTPUT]
        Name                cloudwatch_logs
        Match               host.*
        region              ${AWS_REGION}
        log_group_name      /aws/containerinsights/${CLUSTER_NAME}/host
        log_stream_prefix   ${HOST_NAME}.
        auto_create_group   true
        extra_user_agent    container-insights

  parsers.conf: |
    [PARSER]
        Name                syslog
        Format              regex
        Regex               ^(?<time>[^ ]* {1,2}[^ ]* [^ ]*) (?<host>[^ ]*) (?<ident>[a-zA-Z0-9_\/\.\-]*)(?:\[(?<pid>[0-9]+)\])?(?:[^\:]*\:)? *(?<message>.*)$
        Time_Key            time
        Time_Format         %b %d %H:%M:%S

    [PARSER]
        Name                container_firstline
        Format              regex
        Regex               (?<log>(?<="log":")\S(?!\.).*?)(?<!\\)".*(?<stream>(?<="stream":").*?)".*(?<time>\d{4}-\d{1,2}-\d{1,2}T\d{2}:\d{2}:\d{2}\.\w*).*(?=})
        Time_Key            time
        Time_Format         %Y-%m-%dT%H:%M:%S.%LZ

    [PARSER]
        Name                cwagent_firstline
        Format              regex
        Regex               (?<log>(?<="log":")\d{4}[\/-]\d{1,2}[\/-]\d{1,2}[ T]\d{2}:\d{2}:\d{2}(?!\.).*?)(?<!\\)".*(?<stream>(?<="stream":").*?)".*(?<time>\d{4}-\d{1,2}-\d{1,2}T\d{2}:\d{2}:\d{2}\.\w*).*(?=})
        Time_Key            time
        Time_Format         %Y-%m-%dT%H:%M:%S.%LZ
---
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluent-bit
  namespace: amazon-cloudwatch
  labels:
    k8s-app: fluent-bit
    version: v1
    kubernetes.io/cluster-service: "true"
spec:
  selector:
    matchLabels:
      k8s-app: fluent-bit
  template:
    metadata:
      labels:
        k8s-app: fluent-bit
        version: v1
        kubernetes.io/cluster-service: "true"
    spec:
      containers:
      - name: fluent-bit
        image: public.ecr.aws/aws-observability/aws-for-fluent-bit:stable
        imagePullPolicy: Always
        env:
            - name: AWS_REGION
              valueFrom:
                configMapKeyRef:
                  name: fluent-bit-cluster-info
                  key: logs.region
            - name: CLUSTER_NAME
              valueFrom:
                configMapKeyRef:
                  name: fluent-bit-cluster-info
                  key: cluster.name
            - name: HTTP_SERVER
              valueFrom:
                configMapKeyRef:
                  name: fluent-bit-cluster-info
                  key: http.server
            - name: HTTP_PORT
              valueFrom:
                configMapKeyRef:
                  name: fluent-bit-cluster-info
                  key: http.port
            - name: READ_FROM_HEAD
              valueFrom:
                configMapKeyRef:
                  name: fluent-bit-cluster-info
                  key: read.head
            - name: READ_FROM_TAIL
              valueFrom:
                configMapKeyRef:
                  name: fluent-bit-cluster-info
                  key: read.tail
            - name: HOST_NAME
              valueFrom:
                fieldRef:
                  fieldPath: spec.nodeName
            - name: HOSTNAME
              valueFrom:
                fieldRef:
                  apiVersion: v1
                  fieldPath: metadata.name
            - name: CI_VERSION
              value: "k8s/1.3.20"
        resources:
            limits:
              memory: 200Mi
            requests:
              cpu: 500m
              memory: 100Mi
        volumeMounts:
        # Please don't change below read-only permissions
        - name: fluentbitstate
          mountPath: /var/fluent-bit/state
        - name: varlog
          mountPath: /var/log
          readOnly: true
        - name: varlibdockercontainers
          mountPath: /var/lib/docker/containers
          readOnly: true
        - name: fluent-bit-config
          mountPath: /fluent-bit/etc/
        - name: runlogjournal
          mountPath: /run/log/journal
          readOnly: true
        - name: dmesg
          mountPath: /var/log/dmesg
          readOnly: true
      terminationGracePeriodSeconds: 10
      hostNetwork: true
      dnsPolicy: ClusterFirstWithHostNet
      volumes:
      - name: fluentbitstate
        hostPath:
          path: /var/fluent-bit/state
      - name: varlog
        hostPath:
          path: /var/log
      - name: varlibdockercontainers
        hostPath:
          path: /var/lib/docker/containers
      - name: fluent-bit-config
        configMap:
          name: fluent-bit-config
      - name: runlogjournal
        hostPath:
          path: /run/log/journal
      - name: dmesg
        hostPath:
          path: /var/log/dmesg
      serviceAccountName: fluent-bit
      nodeSelector:
        kubernetes.io/os: linux
```

>[!warning]
>You need to modify two parameter inside the manifest, including
>1. CWAgent
>- `{{cluster_name}}` by your cluster name (e.g: milvus-cluster)
>- `{{region_name}}` by your region deployed EKS (e.g: ap-southeast-1)
>1. Fluentbit: Explore at [Setting up Fluent Bit](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Container-Insights-setup-logs-FluentBit.html#Container-Insights-FluentBit-setup)
>- `cluster.name: {{cluster_name}}` by your cluster name (e.g: milvus-cluster)
>- `logs.region: {{region_name}}` by your region deployed EKS (e.g: ap-southeast-1)
>- `http.server: {{http_server_toggle}}` (e.g: 'Off')
>- `http.port: {{http_server_port}}` (e.g: '2020')
>- `read.head: {{read_from_head}}` (e.g: 'Off')
>- `read.tail: {{read_from_tail}}` (e.g: 'On')

Now you can apply manifest and see the result expose from your EKS Cluster, but remember login into Administrator role to have permission write into cluster

```bash
kubectl apply -f cwagent-fluent-bit-quickstart-enhanced.yaml
```

>[!warning]
>Take a guess, It's totally failure because we forgot setup the legit important to gain permission **EKS Cluster** have put logs and metrics to `CloudWatch`. Back to this configuration at [AWS Docs - Verifying prerequisites for Container Insights in CloudWatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Container-Insights-prerequisites.html)

As you can see, we need provide more permission into role attached with EKS Cluster to help send logs and metrics to cloudwatch through that one, **CloudWatchAgentServerPolicy** need to be configured

After you make sure anything work with your node group, you can apply manifest again and see the result.

>[!done]
>Boom, successfully you totally view both metrics and logs inside your CloudWatch

## Couple of results when deployed successful

![[Pasted image 20241222184514.png]]
<div align="center">
	<p style="text-align: center;">Workload of EKS Monitoring</p>
</div>

With metrics, `CWAgent` will send that into `CloudWatch` in metrics `ContainerInsights` 

![[Pasted image 20241222184706.png]]

With logs, `Fluentbit` will send that into `CloudWatch` as log groups in context

- **/aws/containerinsights/Cluster_Name/application**
- **/aws/containerinsights/Cluster_Name/host**
- **/aws/containerinsights/Cluster_Name/dataplane**
- **/aws/containerinsights/Cluster_Name/performance**

![[Pasted image 20241222185156.png]]

>[!done]
>Now you can take a look and debug directly your cluster through CloudWatch Portal, truly convenient btw consider your cost paid for that. If you think that really work, go for it that really cool stuff you can make bit for your EKS Cluster

# Conclusion

![[byebye.png|center|500]]

>[!done]
>Well, this is all for this weekend, really cool stuff and I learn a lots when setup the permission and monitoring stack for EKS, maybe this article is last article that write about AWS Cloud and Service, cuz I will move on on the next stage of my career and see what the different zone I can inspect, learn and enjoy a lots, upset to say that but don't worry if anything new about AWS, I will turn back soon. BTW, let's see what next articles on new year bring up the different stuff in my site. Again, that really memorable with Cloud Services and I will remember a lot, now let's celebrate for the last one 🍻

>[!quote]
>Hope you find well information and learn a lots of techniques through this blog. This one can be last Cloud Services article, last technology articles for this year cuz I will spend next week for my 2024 recap session. I hope y'all have happiness holiday with family and friend, take a rest, recover and turn back with positive energy. So one again, thank for standing with me during this year, this is very meaningful with my growth, therefore stay safe, learn new thing and see yeah on next year at the first weekend session. Happy holiday, merry christmas and happy new year 2025. Bye Bye 👋
