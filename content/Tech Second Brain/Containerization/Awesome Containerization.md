---
title: Awesome Containerization
tags:
  - awesome
  - devops
  - docker
  - collections
---

# Docker & Containerization

![[thumbnail-vm-and-container.png]]
## Articles

- [Medium - Powerful Docker Alternatives in 2024](https://medium.com/gitconnected/powerful-docker-alternatives-to-revolutionize-containerization-in-2024-99249ba6d059)
- [AquaSec - Container Engines: How They Work and Top 7 Options](https://www.aquasec.com/cloud-native-academy/container-platforms/container-engines/)
- [Blackvoid - Synology, Docker and open source tech blog](https://www.blackvoid.club/)
- [Medium - Deep Dive into Docker Containers | Architecture and Features](https://medium.com/@dmosyan/deep-dive-into-docker-containers-architecture-and-features-530a937f4c87)
- [Docker - Alternative container runtimes](https://docs.docker.com/engine/daemon/alternative-runtimes/)
- [Cloudraft - Most Popular Container Runtimes](https://www.cloudraft.io/blog/container-runtimes)
- [Medium - 11 Open-Source SaaS Killer — Selfhost With Docker](https://blog.devgenius.io/11-open-source-saas-killer-selfhost-with-docker-034456653568)
- [Medium - 11 Open-Source SaaS Killer — Selfhost With Docker -2](https://medium.com/@harendra21/11-open-source-saas-killer-selfhost-with-docker-2-5d507de8b68f)
- [Medium - 11 Open-Source SaaS Killer — Selfhost With Docker -3](https://medium.com/@harendra21/11-open-source-saas-killer-selfhost-with-docker-3-a707a15cb540)
- [Dev.to - Comparison of Alpine, Slim, Stretch, Buster, Jessie, and Bullseye Linux Distributions](https://dev.to/falselight/comparison-of-alpine-slim-stretch-buster-jessie-and-bullseye-linux-distributions-1329)
## Awesome Repositories

- [awesome-compose](https://github.com/docker/awesome-compose) : Awesome Docker Compose samples
- [awesome-docker](https://github.com/veggiemonk/awesome-docker) : 🐳 A curated list of Docker resources and projects
- [awesome-stacks](https://github.com/ethibox/awesome-stacks): Deploy 120+ open-source web apps with one Docker command.
- [bitnami-containers](https://github.com/bitnami/containers) : Bitnami container images
## Development & Implementation

- [Ivan Velichko - Implementing Container Runtime Shim: runc](https://iximiuz.com/en/posts/implementing-container-runtime-shim/)
- [KodeKloud - 3 Best Ways to Run Docker in Docker Container](https://kodekloud.com/blog/run-docker-in-docker-container/)
## General & Documentation

- [Docker Documentation](https://docs.docker.com/)
- [Podman Documentation](https://docs.podman.io/en/latest/)
- [Rootless Containers](https://rootlesscontaine.rs/): Rootless containers refers to the ability for an unprivileged user to create, run and otherwise manage containers.
- [Youtube NetworkChuck - Docker Tutorials Series](https://www.youtube.com/playlist?list=PLIhvC56v63IJlnU4k60d0oFIrsbXEivQo)
## Organizations

- [AliyunContainerService](https://github.com/AliyunContainerService): Aliyun (Alibaba Cloud) Container Service
- [Bitnami](https://github.com/bitnami): Organization belong of VMWare to contributing docker image. [Website](https://bitnami.com/)
- [Collabnix](https://github.com/collabnix): A Community of 8800+ DevOps Engineers for Learning Containerization
- [Containers](https://github.com/containers) : Open Repository for Container Tools
- [Docker](https://github.com/docker): Docker helps developers bring their ideas to life by conquering the complexity of app development.
- [LinuxServer.io](https://github.com/linuxserver): Building and maintaining community images
## Tips for configuration

- [Medium - Accessing the host’s localhost from inside a Docker container](https://medium.com/@gladevise/accessing-the-hosts-localhost-from-inside-a-docker-container-c5935e275953)
- [Medium - Docker Commands You Never Heard Of!](https://medium.com/@arton.demaku/docker-commands-you-never-heard-of-4b25da3dd738)
- [Medium - 13 Docker Cost Optimizations You Should Know](https://medium.com/overcast-blog/13-docker-cost-optimizations-you-should-know-1f78c0accb45)
- [Medium - Docker Beginner to Expert Tutorial](https://levelup.gitconnected.com/docker-beginner-to-expert-tutorial-68555aa3e544)
## Topics

- [CNI GitHub](https://github.com/topics/cni): Collection of GitHub about CNI (Container Network Interface) Topics
## Troubleshoot

- [Medium - 11 Ways to Troubleshoot Docker Faster](https://medium.com/gitconnected/11-ways-to-troubleshoot-docker-faster-8f9ab55dd419)
# Containerization Registries and Tools

![[thumbnail-container-service-layer.png]]
## CNI (Container Network Interface)

- [calico](https://www.tigera.io/project-calico/): Calico is a networking and security solution that enables `Kubernetes` workloads and non-Kubernetes/legacy workloads to communicate seamlessly and securely.
- [cilium](https://cilium.io/) : Cilium is an open source, cloud native solution for providing, securing, and observing network connectivity between workloads, fueled by the revolutionary Kernel technology eBPF 🌟 **(Recommended)**
- [cni](https://github.com/containernetworking/cni) : Container Network Interface - networking for Linux containers. [Website](https://www.cni.dev/docs/)
- [flannel](https://github.com/flannel-io/flannel) : A network fabric for containers, designed for `Kubernetes`
## Containerization Items

- [crane](https://github.com/google/go-containerregistry/tree/main/cmd/crane): A tool for interacting with remote images and registries
- [dive](https://github.com/wagoodman/dive) : A tool for exploring each layer in a docker image 🌟 **(Recommended)**
- [docker-rollout](https://github.com/Wowu/docker-rollout): Zero Downtime Deployment for Docker Compose
- [nginx-proxy](https://github.com/nginx-proxy/nginx-proxy): Automated nginx proxy for Docker containers using docker-gen
- [skopeo](https://github.com/containers/skopeo): Work with remote images registries - retrieving information, images, signing content
- [trivy](https://github.com/aquasecurity/trivy): Find vulnerabilities, misconfigurations, secrets, SBOM in containers, Kubernetes, code repositories, clouds and more
- [watchtower](https://github.com/containrrr/watchtower): A process for automating Docker container base image updates.
## Containerization Registry/Compose Collections

- [Amazon ECR Public Gallery](https://gallery.ecr.aws/)
- [Awesome Docker Compose Examples](https://haxxnet.github.io/Compose-Examples/)
- [Bitnami Application Catalog](https://bitnami.com/stacks)
- [DockerHub](https://hub.docker.com/)
- [Google Artifact Registry Distroless](https://console.cloud.google.com/artifacts/docker/distroless/us/gcr.io)
- [LinuxServer](https://docs.linuxserver.io/) : [Tutorial Manual](https://docs.linuxserver.io/)
- [Microsoft Artifact Registry](https://mcr.microsoft.com/)
- [Quay Registry](https://quay.io/)
## CRI (Container Runtime Interface)

- [containerd](https://github.com/containerd/containerd) : An open and reliable container runtime. [Getting started](https://github.com/containerd/containerd/blob/main/docs/getting-started.md) 🌟 **(Recommended)**
- [cri-dockerd](https://github.com/Mirantis/cri-dockerd): dockerd as a compliant Container Runtime Interface for Kubernetes (Mirantis OpenSource)
- [cri-tools](https://github.com/kubernetes-sigs/cri-tools) : CLI and validation tools for Kubelet Container Runtime Interface (CRI). [User guide](https://github.com/kubernetes-sigs/cri-tools/blob/master/docs/crictl.md)
- [docker](https://docs.docker.com/engine/install/#server) : Docker is one of CRI mostly to used 
- [kubeletctl](https://github.com/cyberark/kubeletctl): A client for kubelet
## OCI (Open Container Initiative)

>[!info]
>The OCI currently contains three specifications: the Runtime Specification (runtime-spec), the Image Specification (image-spec) and the Distribution Specification (distribution-spec). The Runtime Specification outlines how to run a “filesystem bundle” that is unpacked on disk. At a high-level an OCI implementation would download an OCI Image then unpack that image into an OCI Runtime filesystem bundle. At this point the OCI Runtime Bundle would be run by an OCI Runtime.
>
>Official Website: [Link](https://opencontainers.org/)

- [buildah](https://github.com/containers/buildah) : A tool that facilitates building OCI images.
- [kaniko](https://github.com/GoogleContainerTools/kaniko): Build Container Images In Kubernetes
- [podman](https://github.com/containers/podman) : A tool for managing OCI containers and pods.
- [runc](https://github.com/opencontainers/runc) : CLI tool for spawning and running containers according to the OCI specification
##  Selfhosted Container Registry

- [harbor](https://github.com/goharbor/harbor): An open source trusted cloud native registry project that stores, signs, and scans content 🌟 **(Recommended)**
- [nixery](https://github.com/tazjin/nixery): Container registry which transparently builds images using the Nix package manager
## Useful Container Image

- [amazon/aws-cli](https://hub.docker.com/r/amazon/aws-cli): Universal Command Line Interface for Amazon Web Services
- [docker-android](https://github.com/budtmo/docker-android): Android in docker solution with noVNC supported and video recording
- [docker](https://hub.docker.com/_/docker): Docker in Docker!
- [windows](https://github.com/dockur/windows): Windows inside a Docker container.

# Awesome Dockerfile

## NextJS

```dockerfile
# Frontend Build Stage
FROM node:22.9.0-alpine AS frontend-build

WORKDIR /app

# Add .env for project
ARG NEXT_PUBLIC_API_ENDPOINT
RUN echo "NEXT_PUBLIC_API_ENDPOINT=$NEXT_PUBLIC_API_ENDPOINT" > .env

# Copy package files & Install dependencies
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Copy the rest of the frontend code
COPY . .

# Build the Next.js application
RUN yarn build

# Final Stage
FROM node:22.9.0-alpine AS runner

WORKDIR /app

# Copy built frontend
COPY --from=frontend-build /app/.next /app/.next
COPY --from=frontend-build /app/public /app/public
COPY --from=frontend-build /app/node_modules /app/node_modules
COPY --from=frontend-build /app/next-env.d.ts /app/
COPY next.config.ts postcss.config.mjs package.json /app/

# Set environment variables
ENV NODE_ENV=production

# Expose ports for the frontend and backend
EXPOSE 3000

# run application
CMD node_modules/.bin/next start -p 3000
```

