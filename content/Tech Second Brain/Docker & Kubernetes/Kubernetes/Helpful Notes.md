---
title: Note about Kubernetes
tags:
  - k8s
  - usage
  - helpful
---
# Do Kubernetes Pods Really Get Evicted Due to CPU Pressure?

Reference article: [Do Kubernetes Pods Really Get Evicted Due to CPU Pressure?](https://medium.com/overcast-blog/do-pods-really-get-evicted-due-to-cpu-pressure-2b27274a670c)

>[!hint]
>Pods are not directly evicted due to high CPU pressure or usage alone. Instead, Kubernetes relies on CPU throttling mechanisms to manage and limit a pod’s CPU usage, ensuring fair resource sharing among pods on the same node.
>
>While high CPU usage by a pod can indirectly contribute to resource pressure and potentially lead to eviction due to memory or other resource shortages, CPU throttling is the primary mechanism used to manage CPU-intensive workloads.

# Popular Kubernetes Operators

- [Elasticsearch (ECK) Operator](https://operatorhub.io/operator/elastic-cloud-eck), you can figure out configuration via [Customize Pods](https://www.elastic.co/guide/en/cloud-on-k8s/master/k8s-customize-pods.html#)
- [MongoDB Community Kubernetes Operator](https://github.com/mongodb/mongodb-kubernetes-operator), you can take the look some `crd`, and configuration with `github` link like [CRD](https://github.com/mongodb/mongodb-kubernetes-operator/blob/master/config/crd/bases/mongodbcommunity.mongodb.com_mongodbcommunity.yaml) and [Samples](https://github.com/mongodb/mongodb-kubernetes-operator/tree/master/config/samples)
- [RabbitMQ-cluster-operator](https://operatorhub.io/operator/rabbitmq-cluster-operator), read more about that via [source code](https://github.com/rabbitmq/cluster-operator)