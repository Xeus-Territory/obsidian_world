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


