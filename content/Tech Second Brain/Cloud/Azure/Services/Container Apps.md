---
title: Container Apps
tags:
  - devops
  - admin
  - cloud-services
  - azure
---
# What is Container Apps ?

Reference resource

- [Review Azure Container Apps](https://learn.microsoft.com/en-us/training/modules/configure-azure-container-instances/5-review-docker-platform)


![[Pasted image 20240513114027.png]]

>[!info]
>Azure Container Apps is a serverless platform that allows you to maintain less infrastructure and save costs while running containerized applications

Common uses of Azure Container Apps include:

- Deploying API endpoints
- Hosting background processing jobs
- Handling event-driven processing
- Running microservices

Additionally, applications built on Azure Container Apps can dynamically scale based on the following characteristics:

- HTTP traffic
- Event-driven processing
- CPU or memory load
- Any KEDA-supported scaler

Azure Container Apps enables you to build serverless microservices and jobs based on containers.

Azure Container Apps doesn't provide direct access to the underlying Kubernetes APIs. If you would like to build Kubernetes-style applications and don't require direct access to all the native Kubernetes APIs and cluster management, Container Apps provides a fully managed experience based on best-practices

![[Pasted image 20240513114316.png]]
