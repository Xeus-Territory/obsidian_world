---
title: "Kubewekend Session Extra 4: Kind and Sandbox environment for GitLab CI"
tags:
  - kubewekend
  - devops
  - k8s
  - usage
  - cicd
---
>[!quote]
>"Hi everyone! It's me again for another **Kubeweken** session! It's been a while **since I released** the first **Kubeweken** session, and it **has become** a truly **significant part of my journey** – complicated, yet wonderfully rewarding.
>
>I just want to **express my sincere appreciation to everyone who has already supported me and continues to support** this series.
>
>**Without further ado, let's dive into Kubernetes!** Specifically, we'll be **exploring how to operate a Kubernetes Sandbox** within GitLab CI/CD for both CPU and GPU applications."

# How can make it happen ?

![[icon-kind.png|center|500]]



## The story of mine

When tasked with building a cost-effective sandbox for application testing before moving to staging, I initially hit a roadblock. Without the resources for dedicated Kubernetes clusters like K3s or RKE2 to host workloads, it felt like an insurmountable challenge.

However, the idea of [Kind (Kubernetes in Docker)](https://kind.sigs.k8s.io/) immediately came to mind. Its excellent capability to run within Docker containers, combined with GitLab CI's robust support for [Docker-in-Docker (dind)](https://docs.gitlab.com/ci/docker/using_docker_build/#use-docker-in-docker) for running multiple services, made Kind a shining star for getting started. My journey didn't stop there; I found several articles, although older, that further proved Kind's viability for operation within CI/CD pipelines. This discovery truly propelled me into this project.

For more information, consider checking these resources:

- [Kind - Using KIND in CI](https://kind.sigs.k8s.io/docs/user/resources/#using-kind-in-ci)
- [Sysbee - Testing Kubernetes deployments with KIND](https://www.sysbee.net/blog/kind-testing-kubernetes-deployments/)
- [KuberMatic - Running Kubernetes In The CI Pipeline For Integration & E2E Tests](https://www.kubermatic.com/blog/2019-03-12-running-kubernetes-in-the-ci-pipeline/)

## Which things can helped ?

Now, I'm having [Kind](https://kind.sigs.k8s.io/) but any bloom together, it means this will become blackbox inside CI/CD which entire not resolve any problem but cause more trouble to debug and see what happen inside Kind. There are some issues need to answered before operating sandbox successfully

- How can I monitor, debug and troubleshoot `pod` inside Kubernetes Sandbox ? I try to find solution, and it comes up some ideas. like

	1. Using the pattern - [Sidecar](https://learn.microsoft.com/en-us/azure/architecture/patterns/sidecar) with [Fluentbit](https://github.com/leahnp/fluentbit-sidecar) to collect the log and expose it to `Kafka` or ElasticSearch for data sourcing, that's trust solution but coming with complex idea to operate them in Sandbox, I think that trade off is not deserve. If you want to explore more about FluentBit as Sidecar, You can try this [Medium - Run fluent-bit as a sidecar to stream logs to Loki in EKS Fargate](https://the-optimizer.medium.com/run-fluent-bit-as-a-sidecar-to-stream-logs-to-loki-in-eks-fargate-6d08424f6ed6) **(Skipped ❌)**
	2. Second choice, I write backend server which interact with `Kubectl` to scrape log, metrics and event in sandbox to email for example to let's me know when are there failure in CI/CD pipelines. It great choice but one upon again it becomes complex and the workload spent for them will swallow much time to setup and implement. Hold on, you can try with MCP like [Kagent](https://kagent.dev/) and [BotKube](https://botkube.io/) to support you turn `kubectl` to tool of MCP server and Client can use it to debug, but you need concern to the complexity of this solution **(Skipped ❌)**
	3. The last one, shout out to [Anh Phong - AI Engineer](https://www.linkedin.com/in/phongnt038/) to help me turn this debug progress integrated inside environment as tools to debug Kubernetes remotely via `websocket`, you know it comes from idea of [Portainer](https://www.portainer.io/) and it truly work to streaming log when it open websocket to scrape log, events inside Kubernetes **(Chosen 🌟)**

- When the sandbox is already run, how can I access to them, e.g: API Docs or Interactive with application inside Kubernetes Sandbox. Technically, when i try to tradition environment, it will become easier for my hosted, because with GitLab CI, you dynamically run in many runner and it's impossible to NAT your pot network to handle randomly network of Kubernetes in Docker. But we have plan with [Kubernetes Tunnelling](https://openziti.io/docs/reference/tunnelers/kubernetes/), which can help resolve the accessible issue

	1. First option, I try to use controller of Kubernetes and it truly exist multiple popular candidates, such as [ngrok-operator](https://github.com/ngrok/ngrok-operator), [cloudflare-operator](https://github.com/adyanth/cloudflare-operator) or [inlets-operator](https://github.com/inlets/inlets-operator) which provide the great idea to control egress via ingress controller, like `ngrok` provide the tunnel to map your `pod` in Kubernetes with domain of them. Here is article [Ngrok - Introducing the ngrok Kubernetes Operator](https://ngrok.com/blog-post/ngrok-k8s) related more about that. But you know hard to say, when we have multiple application it doesn't work more, I don't try `inlets` or `cloudflare` but it required a couple pricing option, and know we hard to dynamically domain in CI/CD for couple of apps in same time **(Skipped ❌)**
	2. But, `inlets` arch give me idea to use middleware server, act like bastion host to tunneling HTTP server via them, I can combine it with `kubectl` to `port-warding` application and open tunnel to bastion host server to tell it expose this local-port via them. I try and find couple of candidates actual great, e.g [Bore](https://github.com/ekzhang/bore) or [Chisel](https://github.com/jpillora/chisel) with `Client` and `Server` to expose network that entire resolve my concerning with secure expose 

We've resolved two significant questions, confirming that a dynamic Kubernetes environment can serve as a CI/CD sandbox for temporary use, releasing resources after testing to push to staging.

While I cannot disclose proprietary company tools, with permission from [Anh Phong - AI Engineer](https://www.linkedin.com/in/phongnt038/), I can outline the use case capabilities of our 'sandbox-cli'. You can develop a similar tool independently before his official publication.

Its features include:

- Built on Python, it uses WebSockets to stream logs and metrics from the client (sandbox) to a server.
- It interacts with `bore` and `kubectl` to retrieve logs, manage port-forwarding, and expose sandbox events to the server.
- It visualizes data in a user-friendly WebUI for effective monitoring, debugging, and interactive testing, enabling the release of the Kind cluster

## CPU and GPU option for Kind

![[meme-k8s-me.png|center]]

Because our business focuses on specific AI Model applications and serving them on GPUs, standard Kind doesn't meet our needs. After researching, we found that NVIDIA has indeed addressed this with **[NVKind](https://github.com/NVIDIA/nvkind)**, a wrapper around Kind specifically designed for GPU serving.

NVKind integrates crucial libraries to enable interaction with GPUs. It leverages the **device-plugin** within Kind to expose GPU resources and utilizes **nvidia-container-toolkit** to bridge the gap for container access to these devices. For a deeper understanding, I highly recommend reviewing its GitHub repository and the article: '[Tutorial: Set Up a Cloud Native GPU Testbed With Nvkind Kubernetes](https://thenewstack.io/tutorial-set-up-a-cloud-native-gpu-testbed-with-nvkind-kubernetes/)' on The New Stack

More repositories and discussion around this topics at

- [GitHub - nvidia-kind-deploy](https://github.com/SeineAI/nvidia-kind-deploy)
- [Reddit - Minikube versus Kind: GPU Support](https://www.reddit.com/r/kubernetes/comments/1ilb8v2/minikube_versus_kind_gpu_support/)
- [Youtube - Kind + GPU: A Local K8s cluster that can run GPU pods](https://www.youtube.com/watch?v=O1683vzaJVE&ab_channel=Samos123)
# Make it happen

![[meme-blind-choice.png|center]]

For resolve and cut of the complex when we put a lot of command in CI/CD to setup, we need split this sandbox to small piece to easier for control quality and also easier to connect them to consistent system via couple of steps

- Build Base Docker Image for Kind CPU and Kind GPU
- Deploy Bore Service for Tunneling HTTP
- Deploy Sandbox Tools as CLI with Server and WebUI
- Implement and operate GitLab CI/CD with Kind Image

## Build The Base Docker Image

First of all, we need to build the docker image for reducing the complex when we operate them in GitLab CI, including

- Setup requirement package like `curl`, `wget`, `jq`, `git`
- Setup binaries tools like `kubectl`, `helm`, `kind` and `nvkind (GPU)`
- Setup Golang language and Docker for GPU Sandbox
- Script as tool for `get-secrets` and `get-metrics`
- Setup `bore-cli` and `sandbox-cli` for monitoring and tunneling

You can pull these image from my dockerhub

- CPU Kind Sandbox: [Link](https://hub.docker.com/r/xeusnguyen/cpu-kind-sandbox)
- GPU Kind Sandbox: [Link](https://hub.docker.com/r/xeusnguyen/gpu-kind-sandbox)

```bash
# CPU
docker pull xeusnguyen/cpu-kind-sandbox:v0.1.0

# GPU
docker pull xeusnguyen/gpu-kind-sandbox:v0.1.0
```

You can try to modify the resource below to get your own Docker Image with structure like this

```bash
sandbox
├── cpu.Dockerfile
├── gpu.Dockerfile
├── Makefile
├── README.md
└── scripts
    ├── get-metrics
    └── get-secrets
```

```Dockerfile title="cpu.Dockerfile"
FROM docker:20.10.22

# Definition Environment Variable
ARG KIND_VERSION
ARG KUBECTL_VERSION
ENV KIND_VERSION=$KIND_VERSION
ENV KUBECTL_VERSION=$KUBECTL_VERSION

# Download and setup prerequiste packages for sandbox

# Setup the standard packages
RUN apk add -U wget curl jq git python3 py3-pip

# Setup Kind, Kubectl and Helm
RUN wget -O /usr/local/bin/kind \
    https://github.com/kubernetes-sigs/kind/releases/download/${KIND_VERSION}/kind-linux-amd64 && \
    chmod +x /usr/local/bin/kind
RUN wget -O /usr/local/bin/kubectl \
    https://storage.googleapis.com/kubernetes-release/release/${KUBECTL_VERSION}/bin/linux/amd64/kubectl && \
    chmod +x /usr/local/bin/kubectl
RUN export VERIFY_CHECKSUM=false && \
    curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | sh

# Setup the tools to interactive with Kubectl and Vault
COPY ./scripts/get-metrics /usr/local/bin/get-metrics
COPY ./scripts/get-secrets /usr/local/bin/get-secrets

# Setup the bore-cli for tunneling
RUN wget -O /tmp/bore.tar.gz \
    https://github.com/ekzhang/bore/releases/download/v0.6.0/bore-v0.6.0-x86_64-unknown-linux-musl.tar.gz && \
    tar -xzf /tmp/bore.tar.gz -C /usr/local/bin
```

```Dockerfile title="gpu.Dockerfile"
FROM ubuntu:22.04

# Definition Environment Variable
ARG DOCKER_VERSION
ARG KIND_VERSION
ARG KUBECTL_VERSION
ARG GO_VERSION
ENV KIND_VERSION=$KIND_VERSION
ENV KUBECTL_VERSION=$KUBECTL_VERSION
ENV DOCKER_VERSION=$DOCKER_VERSION
ENV GO_VERSION=$GO_VERSION
# Download and setup prerequiste packages for sandbox

# Setup the standard packages
RUN apt update && apt install -y wget curl jq git \
                    python3 python3-pip \
                    build-essential pkg-config \
                    libnvidia-ml-dev

# Setup Docker command
RUN wget -O docker-$DOCKER_VERSION.tgz \
	https://download.docker.com/linux/static/stable/"$(uname -m)"/docker-$DOCKER_VERSION.tgz && \
	tar -xzf docker-$DOCKER_VERSION.tgz -C /usr/local/bin/ --strip-components 1 && \
	rm -rf docker-$DOCKER_VERSION.tgz

# Setup and configure Go
RUN wget -O go$GO_VERSION.linux-amd64.tar.gz \
    https://go.dev/dl/go$GO_VERSION.linux-amd64.tar.gz && \
    tar -xzf go$GO_VERSION.linux-amd64.tar.gz -C /usr/local && \
    rm -rf go$GO_VERSION.linux-amd64.tar.gz
ENV GOROOT /usr/local/go
ENV GOPATH /go
ENV PATH /go/bin:/usr/local/go/bin:$PATH

RUN mkdir -p ${GOPATH}/src ${GOPATH}/bin

# Setup Kind, NVKind, Kubectl and Helm
RUN wget -O /usr/local/bin/kind \
    https://github.com/kubernetes-sigs/kind/releases/download/${KIND_VERSION}/kind-linux-amd64 && \
    chmod +x /usr/local/bin/kind
RUN go install github.com/NVIDIA/nvkind/cmd/nvkind@latest
RUN wget -O /usr/local/bin/kubectl \
    https://storage.googleapis.com/kubernetes-release/release/${KUBECTL_VERSION}/bin/linux/amd64/kubectl && \
    chmod +x /usr/local/bin/kubectl
RUN export VERIFY_CHECKSUM=false && \
    curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Setup the tools to interactive with Kubectl and Vault
COPY ./scripts/get-metrics /usr/local/bin/get-metrics
COPY ./scripts/get-secrets /usr/local/bin/get-secrets

# Setup the bore-cli for tunneling
RUN wget -O /tmp/bore.tar.gz \
    https://github.com/ekzhang/bore/releases/download/v0.6.0/bore-v0.6.0-x86_64-unknown-linux-musl.tar.gz && \
    tar -xzf /tmp/bore.tar.gz -C /usr/local/bin
```

```bash title="./scripts/get-secrets"
#!/bin/sh

# ==============================================================================
# Vault Secret CLI Tool
# This script securely fetches secrets from a HashiCorp Vault instance using
# command-line arguments and populates a local .env file.
#
# Usage:
#   ./get-secrets.sh --vault-addr <addr> --secret-path <path> --env-file <file> --token <token>
#   ./get-secrets.sh --vault-addr <addr> --secret-path <path> --env-file <file> --username <user> --password <pass>
#
# Prerequisites:
# - `curl` and `jq` must be installed on your system.
# ==============================================================================

# Exit immediately if a command exits with a non-zero status.
set -e

# Exit if any variable is unset.
set -u

# --- Configuration & Utility Functions ---

# Function to print messages to the console.
# $1: The message to print.
print_message() {
  echo ""
  echo ">>> $*"
}

# Function to check for required dependencies.
check_dependencies() {
  for cmd in "curl" "jq"; do
    if ! command -v "$cmd" > /dev/null 2>&1; then
      echo "Error: Required command '$cmd' is not installed." >&2
      exit 1
    fi
  done
}

# Function to display usage information.
usage() {
  echo "Usage: $0 [options]"
  echo "  -a, --vault-addr <addr>      Vault server address (e.g., http://127.0.0.1:8200)"
  echo "  -s, --secret-path <path>     Path to the secret in Vault (e.g., secret/data/my-app/config)"
  echo "  -e, --env-file <file>        Name for the output .env file (e.g., .env)"
  echo "  -u, --username <user>        Username for userpass authentication"
  echo "  -p, --password <pass>        Password for userpass authentication"
  echo "  -t, --token <token>          Vault token for direct access"
  echo "  -h, --help                   Display this help message"
  exit 1
}

# --- Main Script Logic ---

check_dependencies

# Initialize variables
VAULT_ADDR=""
SECRET_PATH=""
ENV_FILE=""
VAULT_USERNAME=""
VAULT_PASSWORD=""
VAULT_TOKEN=""

# Parse command-line arguments
while [ "$#" -gt 0 ]; do
  case "$1" in
    -a|--vault-addr)
      VAULT_ADDR="$2"
      shift
      ;;
    -s|--secret-path)
      SECRET_PATH="$2"
      shift
      ;;
    -e|--env-file)
      ENV_FILE="$2"
      shift
      ;;
    -u|--username)
      VAULT_USERNAME="$2"
      shift
      ;;
    -p|--password)
      VAULT_PASSWORD="$2"
      shift
      ;;
    -t|--token)
      VAULT_TOKEN="$2"
      shift
      ;;
    -h|--help)
      usage
      ;;
    -*) # Unknown option
      echo "Error: Unknown option $1" >&2
      usage
      ;;
    *) # Positional arguments
      ;;
  esac
  shift
done

# Validate required arguments
if [ -z "$VAULT_ADDR" ] || [ -z "$SECRET_PATH" ] || [ -z "$ENV_FILE" ]; then
  echo "Error: Missing required arguments. --vault-addr, --secret-path, and --env-file are mandatory." >&2
  usage
fi

# Authenticate and get the token
if [ -n "$VAULT_TOKEN" ]; then
  print_message "Using provided token for access."
elif [ -n "$VAULT_USERNAME" ] && [ -n "$VAULT_PASSWORD" ]; then
  print_message "Authenticating with userpass..."
  AUTH_RESPONSE=$(curl -s --request POST \
    --data "{\"password\": \"$VAULT_PASSWORD\"}" \
    "$VAULT_ADDR/v1/auth/userpass/login/$VAULT_USERNAME")

  # Extract the token using jq
  if echo "$AUTH_RESPONSE" | jq -e '.auth.client_token' >/dev/null; then
    VAULT_TOKEN=$(echo "$AUTH_RESPONSE" | jq -r '.auth.client_token')
    print_message "Authentication successful. Token received."
  else
    echo "Error: Failed to authenticate with userpass. Check your credentials." >&2
    echo "Vault response: $AUTH_RESPONSE" >&2
    exit 1
  fi
else
  echo "Error: No authentication method specified. Please provide a token or a username/password." >&2
  usage
fi

# 3. Fetch the secrets from Vault
print_message "Fetching secrets from '$SECRET_PATH'..."
SECRET_RESPONSE=$(curl -s --header "X-Vault-Token: $VAULT_TOKEN" \
  "$VAULT_ADDR/v1/$SECRET_PATH")

# 4. Parse and write secrets to the .env file
if echo "$SECRET_RESPONSE" | jq -e '.data.data' >/dev/null; then
  # Extract the secrets data from the response using jq
  SECRET_DATA=$(echo "$SECRET_RESPONSE" | jq '.data.data')

  # Clear the .env file if it exists, otherwise create it
  echo "" > "$ENV_FILE"

  # Iterate over the keys and values, formatting them for the .env file
  print_message "Parsing secrets and writing to '$ENV_FILE'..."
  echo "$SECRET_DATA" | jq -r 'to_entries[] | "export \(.key)=\"\(.value)\""' >> "$ENV_FILE"

  print_message "Secrets successfully written to '$ENV_FILE'."
  echo "You can now source the file with: source $ENV_FILE"
else
  echo "Error: Failed to fetch secrets from path '$SECRET_PATH'. Check the path and token permissions." >&2
  echo "Vault response: $SECRET_RESPONSE" >&2
  exit 1
fi
```

```bash title="./scripts/get-metrics"
#!/bin/sh

# k8s-pod-info: A CLI tool to get Kubernetes pod CPU/Memory usage, requests, and limits.
# Designed for POSIX-compliant shells (like /bin/sh).

# --- Configuration ---
POD_NAME=""
NAMESPACE=""

# --- Functions ---

# Function to display usage information
usage() {
  echo "Usage: $0 [OPTIONS]"
  echo "Get Kubernetes pod CPU/Memory usage, requests, and limits."
  echo
  echo "Options:"
  echo "  -p, --pod-name <name>      Name of the Kubernetes pod to query (required)."
  echo "  -n, --namespace <name>     Namespace where the pod is located (required)."
  echo "  -h, --help                 Display this help message and exit."
  echo
  echo "Examples:"
  echo "  $0 --pod-name my-app-pod-abc --namespace default"
  echo "  $0 -p another-pod-xyz -n kube-system"
  echo "  $0 -p some-metrics-pod -n kube-system | jq ."
  echo
  exit 0
}

# --- Argument Parsing ---
# Loop until all arguments are processed
while [ "$#" -gt 0 ]; do
  case "$1" in
    -p|--pod-name)
      # Check if value is missing
      if [ -z "$2" ]; then
        echo "Error: --pod-name requires a non-empty argument." >&2
        usage
      fi
      # Check if value is another option (starts with hyphen)
      case "$2" in
        -*)
          echo "Error: --pod-name requires a value, but '$2' looks like another option." >&2
          usage
          ;;
      esac
      POD_NAME="$2"
      shift # consume option
      ;;
    -n|--namespace)
      # Check if value is missing
      if [ -z "$2" ]; then
        echo "Error: --namespace requires a non-empty argument." >&2
        usage
      fi
      # Check if value is another option (starts with hyphen)
      case "$2" in
        -*)
          echo "Error: --namespace requires a value, but '$2' looks like another option." >&2
          usage
          ;;
      esac
      NAMESPACE="$2"
      shift # consume option
      ;;
    -h|--help)
      usage
      ;;
    -*)
      echo "Error: Unknown option '$1'" >&2
      usage
      ;;
    *) # Positional arguments (not expected if using flags)
      echo "Error: Unexpected positional argument '$1'" >&2
      usage
      ;;
  esac
  shift # consume argument (either the option or the option's value)
done

# --- Validate Required Arguments ---
if [ -z "$POD_NAME" ] || [ -z "$NAMESPACE" ]; then
  echo "Error: Both --pod-name and --namespace are required." >&2
  usage
fi

# --- Main Logic ---

# 1. Get CPU and Memory usage for the specific pod
# We use try-catch to handle cases where the pod might not be "top"-able yet or data isn't available
POD_USAGE_JSON=$(kubectl top pod "$POD_NAME" --namespace "$NAMESPACE" --no-headers 2>/dev/null | \
  awk '{print "{\"pod\":\""$1"\", \"cpu_usage\":\""$2"\", \"memory_usage\":\""$3"\"}"}' | \
  jq -s .)

# Check if usage data was found
if [ "$(echo "$POD_USAGE_JSON" | jq 'length')" -eq 0 ]; then
  echo "Warning: Could not get usage data for pod '$POD_NAME' in namespace '$NAMESPACE'. It might not be running, or metrics are not available." >&2 # Send warning to stderr
  # Provide a default structure with nulls for usage if data is missing
  POD_USAGE_JSON='[{"pod":"'"$POD_NAME"'","cpu_usage":null,"memory_usage":null}]'
fi


# 2. Get CPU and Memory requests/limits for the specific pod
# We need to loop through containers because requests/limits are per-container.
POD_RESOURCES_JSON=$(kubectl get pod "$POD_NAME" --namespace "$NAMESPACE" -o json | jq -c '
. as $pod | {
  pod: $pod.metadata.name,
  namespace: .metadata.namespace, # Fix: Use .metadata.namespace directly
  containers: [
    .spec.containers[] | {
      name: .name,
      cpu_request: (.resources.requests.cpu // "0m"),
      cpu_limit: (.resources.limits.cpu // "0m"),
      memory_request: (.resources.requests.memory // "0Mi"),
      memory_limit: (.resources.limits.memory // "0Mi")
    }
  ]
}' | jq -s .)


# 3. Combine and process the data with jq
jq -n \
  --argjson pod_usage "$POD_USAGE_JSON" \
  --argjson pod_resources "$POD_RESOURCES_JSON" \
  '
  ($pod_usage[0]) as $usage_data |

  ($pod_resources[0]) as $resource_data |

  ($resource_data.containers | reduce .[] as $c (
    {cpu_req: 0, cpu_limit: 0, mem_req: 0, mem_limit: 0};
    .cpu_req += ($c.cpu_request | gsub("m";"") | tonumber? // 0) |
    .cpu_limit += ($c.cpu_limit | gsub("m";"") | tonumber? // 0) |
    .mem_req += ($c.memory_request | gsub("Mi";"") | tonumber? // 0) |
    .mem_limit += ($c.memory_limit | gsub("Mi";"") | tonumber? // 0)
  )) as $totals |

  {
    pod: $usage_data.pod,
    cpu_usage: $usage_data.cpu_usage,
    memory_usage: $usage_data.memory_usage,
    cpu_request: ($totals.cpu_req | tostring + "m"),
    cpu_limit: ($totals.cpu_limit | tostring + "m"),
    memory_request: ($totals.mem_req | tostring + "Mi"),
    memory_limit: ($totals.mem_limit | tostring + "Mi")
  }
'
```

Now you already to build your docker image with command

```bash
# For CPU Sandbox
docker buildx build -t cpu-kind-sandbox \
-f cpu.Dockerfile \
--build-arg KIND_VERSION=v0.29.0 \
--build-arg KUBECTL_VERSION=v1.27.0 .

# For GPU Sandbox
docker buildx build -t gpu-kind-sandbox \
-f gpu.Dockerfile \
--build-arg KIND_VERSION=v0.29.0 \
--build-arg KUBECTL_VERSION=v1.27.0 \
--build-arg DOCKER_VERSION=20.10.22 \
--build-arg GO_VERSION=1.23.0 .
```

## Setup Bore Server

To enable tunneling, we will adapt the [Bore](https://github.com/ekzhang/bore) tool, leveraging its self-hosted client-server capabilities. For simplified setup, Docker images are preferred for self-hosting at this time.

You will need a server configured to open specific ports for tunneling and management:

- **3000 - 3005**: Port range dedicated for tunneling.
- **7835**: An implicit control port for establishing new connections on demand.

First, you need to configure your cloud provider's firewall, NACL, or Security Group to enable accessibility for the Bore Client on the specified ports.

Next, install Docker and set up the Bore server using the following command:

```bash
sudo docker run -d --name bore-server \
    -p 7835:7835 -p 3000-3005:3000-3005 \
    -e BORE_MIN_PORT=3000 \
    -e BORE_MAX_PORT=3005 \
    -e BORE_SECRET=<your-secret-for-secure-connection> \
    ekzhang/bore server
```

After that, you will able to connect from other bore client to server with command, but you can try to use docker command to testing

```bash
sudo docker run -it --rm \
	--network host ekzhang/bore \
	local 80 --to <your-bore-server-address> --secret <your-secret-for-secure-connection>
```

Access the browser with result tunnel command, and you can see your application exposed in that IP address

## Implement and operate GitLab CI/CD with Kind Image

![[meme-hero.png|center]]

For license reasons, I cannot display the actual appearance of the Sandbox CLI, Server, and WebUI. However, based on the features described, it is an excellent tool that allows developers to debug directly within the Kubernetes Sandbox in CI.

![[design-pipeline-sandbox.png]]

Let's draft the `.gitlab-ci.yml` following the image above, it won't to show you all technique inside pipeline, but we only focus on `sandbox-ci`, which create magic in this pipelines

We should define `kind-config.yaml` to let bootstrap for sandbox cluster

```yaml title="kind-config.yaml"
apiVersion: kind.x-k8s.io/v1alpha4
kind: Cluster
networking:
  apiServerAddress: "0.0.0.0"

kubeadmConfigPatchesJSON6902:
- group: kubeadm.k8s.io
  version: v1beta3
  kind: ClusterConfiguration
  patch: |
    - op: add
      path: /apiServer/certSANs/-
      value: docker

nodes:
  - role: control-plane
```

>[!note]
>As you can see, I used `kubeadmConfigPatchesJSON6902` to patch the `kubeadm` `ClusterConfiguration`, which modifies the network to enable connectivity to the Kind cluster's services from within the CI pipeline. Read more about example at **[GitHub - kind-example-config.yaml](https://github.com/kubernetes-sigs/kind/blob/main/site/content/docs/user/kind-example-config.yaml)**

Now we will implement `.gitlab-ci.yml` but I will spend for CPU first and GPU is in progressed, therefore, I will add into this article next week

```yaml title=".gitlab-ci.yml"
image: xeusnguyen/cpu-kind-sandbox:v0.1.0
services:
  - name: docker:20.10.22-dind
    alias: docker

stages:
  - sandbox
  - error

sandbox:
  stage: sandbox
  script:
    # Login to Private Container Registry
    - docker login -u "$REGISTRY_USER" -p "$REGISTRY_PASSWORD" "$REGISTRY_LOCATION"

    # Setup Kind Kubernetes Sandbox
    - kind delete clusters --all || echo "Non't exist any cluster"
    - kind create cluster 
        --name=sandbox-$CI_COMMIT_SHORT_SHA 
        --image="kindest/node:v1.27.11" 
        --config=./kubernetes/kind-config.yaml --wait=60s
    - sed -i -E -e 's/localhost|0\.0\.0\.0/docker/g' "$HOME/.kube/config"
    - kubectl wait --for=condition=Ready nodes/nlp-sandbox-$CI_COMMIT_SHORT_SHA-control-plane --timeout=120s
    - kubectl get nodes -o wide
    - kubectl get pods --all-namespaces -o wide
    - kubectl get services --all-namespaces -o wide

    # Setup secret registry-cred for private container registry
    - kubectl create secret generic registry-cred 
        --from-file=.dockerconfigjson=$HOME/.docker/config.json --type=kubernetes.io/dockerconfigjson

    # Setup metrics server
    - helm repo add metrics-server https://kubernetes-sigs.github.io/metrics-server/
    - helm install metrics-server metrics-server/metrics-server --set "args={--kubelet-insecure-tls=true}" --wait
    - kubectl get pods --all-namespaces -o wide

    # # Setup Ngrok for Kubernetes Tunnel
    # - helm repo add ngrok https://charts.ngrok.com
    # - helm repo update 
    # - helm install ngrok-operator ngrok/ngrok-operator
    #     --version=0.19.0 --namespace ngrok-operator --create-namespace 
    #     --set credentials.apiKey=$NGROK_API_KEY --set credentials.authtoken=$NGROK_AUTHTOKEN --wait
    # - kubectl get pods --all-namespaces -o wide

    # Setup your own Application
    # Use get-secret to access vault (options)
    # - get-secrets 
    #     --vault-addr $VAULT_ADDRESS 
    #     --secret-path $SECRET_PATH 
    #     --username $USERNAME 
    #     --password $PASSWORD 
    #     --env-file /tmp/config.env
    
    # Deploy your application via helm
    - helm repo add kubewekend https://kubewekend.xeusnguyen.xyz/kubernetes/charts
    - helm repo update
    - helm install todo-app kubewekend/common
        -f values.yaml
        --set image.repository="xeusnguyen/application"
        --set image.tag="v0.0.1" 
        --set service.port="3000"
        --wait
    - kubectl get pods --all-namespaces -o wide

    # Use Sandbox CLI
    sandbox-cli command

  after_script:
    - echo "Signal ending from websocket, you are testing sandbox successfully, now we can release the cluster of this CI"
    - kind delete cluster --name=sandbox-$CI_COMMIT_SHORT_SHA

failure:
  stage: error
  when: on_failure
  dependencies:
    - sandbox
  script:
    - echo "error when deploy your application"
  after_script:
    - kind delete cluster --name=sandbox-$CI_COMMIT_SHORT_SHA
```

A couple result of pipeline and when we operate successfully

![[Pasted image 20250817220529.png]]
![[Pasted image 20250817220941.png]]
# Conclusion

![[meme-waiting.png|center|500]]

>[!done]
>That's all for this weekend's **session/article**! I know this **piece** feels a bit rushed, but I'll update it next week to **provide more detailed information, tutorials, explanations, and more.**
>
>**I hope you found the quality of this Kubeweken session valuable this weekend.** It was a real pleasure to experiment with a couple of new pipeline **approaches** for the Kubernetes Sandbox. It truly worked and will be **incredibly helpful for businesses looking to integrate** Kubernetes into their CI/CD pipelines.

>[!quote]
>This is the last article for this weekend, joining two others I've shared. I hope you have a great and enjoyable weekend, and take time to recharge for the week ahead!
>
>**Just a quick update:** I'll be taking a month-long break from tech releases to focus on another plan for the year. So, I'll see you in the next Kubeweken session! Stay safe and well, and I promise, I'll be back soon! Bye-bye 👋 


