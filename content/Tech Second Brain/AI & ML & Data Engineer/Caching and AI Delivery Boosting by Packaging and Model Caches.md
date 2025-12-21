---
title: Caching and AI Delivery Boosting by Packaging and Model Caches
tags:
  - devops
  - cache
  - usage
  - architecture
  - ai
---

>[!quote]
>Hello y' @all guy, nice to see you here. BTW, How is your week ? I'm feel pleasure for what I am learning and doing right now, currently I enjoy with my new job and explore new strategies for keeping learn about architecture and growth up in tech fields.
>
>In this week, I will share about the technique that truly cool for optimizing your deployment became more efficiency. But in the system architecture nowadays, maybe you don't know much about this one. Let's say about **Package Cache** and Why you should use dependencies cache in your work.
# Cache and The story of their power

![[meme-cache.png]]

>[!quote]
>If you are developer or who work in technologies field, you will hear about Cache at least one time. Cache helps you a lot of things, such as minimal your time to retrieve package frequently accessed from a couple of locations.

Actually I don't have much experience when I use cache for my work as Developer, in some situations, I will meet that one or more time but It's kinda importance for somehow, such as

- Cache in `Docker`: If you work around `Docker` and `Dockefile`, you will see your build progress which reuse couple of build store inside some location and help you skip this process but completely done.
- If you use `node_modules`, I think you can use `install` for only one time before new module required you add into project
- As Networking, sometime you will hear about `DNS Cache`, that's technique you will retrieve into couple of `DNS Server` to get caching before you load directly to host to get IP address

>[!quote]
>So let's say, Cache is everywhere, anything process and you leverage this concept (architecture) to boost your application become more efficiency, fast and high experience quality.

Following, couple of articles, you can split Cache into two layer, one for Infrastructure and one for Technique & Strategies. If you can try to combine both of them, you will get the highest result ever seen, seriously

## Infrastructure Cache (Cache Type)

Correct me if I am wrong, when I try to figure out Cache in Infrastructure layer, like article [9 Caching Strategies for System Design Interviews](https://dev.to/somadevtoo/9-caching-strategies-for-system-design-interviews-369g). I find out that there are three caching types corresponding, including

1. **Client Site Cache**
2. **Server Site Cache**
3. **Database Cache**

That're three types and It's totally make sense, because most of techniques cache and structure that depend on three level in infrastructure layer to implement. You can find more information in couple of blogs

- [EdgeMesh - Server-Side Caching vs. Client-Side Caching: The Differences (And Which Is Good For Your Website)](https://edgemesh.com/blog/difference-between-server-side-caching-and-client-side-caching-and-which-is-good-for-your-website)
- [AWS - Database Caching](https://aws.amazon.com/caching/database-caching/)

When you try to take walkthough for each concept, you can reach to technique in programming for understand more how can they implement cache

## Technique and Strategies Cache

When I try to read articles about cache, they list me some caches and it's actually too much and sometime you just need to use 1 or 2 techniques but let's see what kind suitable for your situation

- [9 Caching Strategies for System Design Interviews](https://dev.to/somadevtoo/9-caching-strategies-for-system-design-interviews-369g)
- [Advanced Caching Strategies in Node.js: Boosting Performance and Scalability](https://medium.com/@FullStackSoftwareDeveloper/advanced-caching-strategies-in-node-js-boosting-performance-and-scalability-885d207fcc93)

Let's list a couple of candidates, such as

- In-Memory Cache
- Distributed Cache
- HTTP Caching
- Persistent Caching
- Write Through
- Write Back
- Cache-Aside
- ...

>[!info]
>In terms of situations, you usually meet about `Distributed Cache` with `Redis` or `Valkey`, `CDN`, and in programming, I usually hear about Write through and Write Back. This look like very multiple popular each type of them focus on solve couple of problems. 
>
>FACT: In sometime, if you are using cache but not understand the strategies, cache will take damage back LOL 😄, e.g: data keeping not update, ...

>[!warning]
>In perspective, Caching is pretty helpful but is double-edged sword, you should know what you do and what should implement because it's always exist Pros/Cons on any technologies.
## Pros and Cons of Cache

![[thumbnail-cut-the-cost.png]]

When I try to research about Cache, I find some articles that interesting talk about Pros and Cons of Cache, like

- [Blog - Pros and Cons of Caching Data in Software Development](https://www.bytesizedpieces.com/posts/cache-pro-con)
- [StackOverFlow - What are the Advantage and Disadvantage of Caching in Web Development](https://stackoverflow.com/questions/6609602/what-are-the-advantage-and-disadvantage-of-caching-in-web-development-in-php-ho)

We can conclude about cache into typically dots, such as

**Pros**

- Cache increase speed to boost user experience
- Optimize resources used and improve performance
- Accelerate data retrieval
- ...

**Cons**

- Risk of outdated content (stale data)
- Incorrect or corrupt cached data
- Security risk
- Overhead and Complexity
- ...
# Dependencies Cache

![[thumbnail-key-based-cache.png]]
<div align="center">
	<p style="text-align: center;">Source: Bitrise</p>
</div>


>[!question]
>Ever you been ask yourself about how to optimize the build time in your CI/CD with applications for example AI or Big complex. You will trade off your time by building and encapsulating whole process into Docker Image, push that into registry and deploy to your server, that will take a lots time to completely process, so that why you need think about use cache for handle a bit about it for yourself.

Because like y'all guy, I truly surprise with these applied strategies, you can follow couple of stuff to imagine how we can deal with cache to boost your build.

- [Python - Package index mirrors and caches](https://packaging.python.org/en/latest/guides/index-mirrors-and-caches/)
- [Bitrise - CI/CD caching with Bitrise: Dependency caching with Bitrise](https://bitrise.io/blog/post/ci-cd-caching-with-bitrise-dependency-caching-with-bitrise)
- [Blog - DIY node_modules cache for Docker in your CI](https://remelehane.dev/diy-nodemodules-cache-for-docker-in-your-ci)
- [Gradle - Speed Up Maven Build](https://gradle.com/blog/how-to-speed-up-maven-builds-with-a-build-cache/)

See that's really cool stuff and you need to consider to prevent build from scratch for big application, if you can deal to build with cache, 100% your build and release progress will boost to new level, seriously

Let's me describe a bit about `node` and `python`, there are two programming language you ever seen at least one time. With Python, you will have [Pip](https://github.com/pypa/pip) or [Poetry](https://python-poetry.org/docs/) for packaging manager and with Node, you will have a lots, such as [npm](https://docs.npmjs.com/about-npm), [yarn](https://classic.yarnpkg.com/en/docs/getting-started), or [pnpm](https://pnpm.io/). Tons of them have one similar about using `cache`

You will see about how fast you install your package with `pip` or `npm` with not need to load again because it uses cache as key-value to retrieve your package from when it's not exist in your project, it's will read from there, load package for your project before hit to `npm` or `pypi` for finding your package. So you can leverage in this technique for boost up your build and release application, You can explore more at

- [Pip Caching](https://pip.pypa.io/en/stable/topics/caching/)
- [Npm Cache](https://docs.npmjs.com/cli/v8/commands/npm-cache)

Usually, if you not set any ENV or opt for these package manager, it will use cache for capture mostly validation package and put it package in to your home directory or `~/`

## Python

First we talk about `Python` and `Pip`

If you install package from Pypi via pip, you will use normal form like

```bash
pip install flask
```

This command will install flask into your host and save flask cache into directory `~/.cache/pip` for next using

But pip offer us to not take this action by adding another option

```bash
pip install --no-cache-dir flask
```

This command will install flask into your host but not save cache and you will retrieve flask from Pypi for next installing

>[!info]
>You can't see the big different right, yeah because if you download the huge package such as `pytorch`, `triton`, this story will become make sense. It helps you call directly into cache and load package from cache to mem and install it for y'all

If you wanna know about pip cache directory, you can use command to find it

```bash
pip cache dir
```

>[!warning]
>Recommended to **NOT** disable pip’s caching unless you have caching at a higher level (eg: layered caches in container builds). Doing so can significantly slow down pip (due to repeated operations and package builds) and result in significantly more network usage.

As you can see, `pip` is not recommending you disable whenever you know what you did it, but if you wanna it, you can try with ENV for disable it and it can help down size your built image into smaller than ever.

```bash
export PIP_NO_CACHE_DIR=off
```

This environment will disable cache for your host, if this environment exist, you will not gonna use cache for any more

Fell free to understand more reason why via discussion [What is pip's `--no-cache-dir` good for?](https://stackoverflow.com/questions/45594707/what-is-pips-no-cache-dir-good-for)
## Node

How about node, is it the same as `python` ? The answer is yes and you can find your node cache via command

```bash
# Checks the integrity of your cache and ensures everything is in order
npm cache verify

# Find cache configuration
npm config get cache
```

This strategies is kinda same as `python`, it will hit to cache and find with `hash` of package, retrieve from cache into memory and load into your project, if not found, it will hit to `npm` registry and download it.

You can explore more about at article [Medium - NPM Caching: Speeding Up Your Development Process](https://medium.com/@ruben.alapont/npm-caching-speeding-up-your-development-process-340dcdc554b3)

If you use cache in CI/CD, you try to save the cache and reuse when you run command again

```yaml
default:
  image: node:latest
  cache:  # Cache modules in between jobs
    key: $CI_COMMIT_REF_SLUG
    paths:
      - .npm/
  before_script:
    - npm ci --cache .npm --prefer-offline

test_async:
  script:
    - node ./specs/start.js ./specs/async.spec.js
```

```yaml
stages:
  - build

build:
  stage: build
  image: node:18.17.1
  before_script:
    - npm install --global corepack@latest
    - corepack enable
    - corepack prepare pnpm@latest-10 --activate
    - pnpm config set store-dir .pnpm-store
  script:
    - pnpm install # install dependencies
  cache:
    key:
      files:
        - pnpm-lock.yaml
    paths:
      - .pnpm-store
```

You can give a try and find more example via

- [pnpm - Continuous Integration](https://pnpm.io/continuous-integration)
- [GitLab - Cache Node.js dependencies](https://docs.gitlab.com/ci/caching/#cache-nodejs-dependencies)
- [Yarn - Continuous Integration](https://classic.yarnpkg.com/lang/en/docs/install-ci/)

>[!quote]
>By some techniques to compress that into file and save in local, you can reuse cache for optimizing your build time, retrieve the package from run time and do a lot of stuff for building with no struggle because of poor network.
>
>Let's see what use case and how I try to apply that strategy for my work

# The Actual AI Delivery Case-Study

When I workaround with the AI Application, The size image is really insane because of some reason, such as

- AI Engineer tries to package model inside image and makes it become more bigger
- AI Engineer installs package for AI and pack it into application, and make image become more bigger, let's say 3 - 4 GB for `pytorch`
- In some ways, AI Engineer misses clean cache of `pip` or `poetry` and try package that into package and you know what is it.

That's reason why I should split the AI Code and model, package into two part, such as

- **Build time**: We just only rebuild the code when code actually change which only change about logical in application
- **Run time**: Setup environment by downloading package and models, loading and using it during runtime because the training usually on different pipeline
## Playground

So combination with Kubernetes, I suggest two option for building your MLflow by leveraging Kubernetes techniques

![[design-mlops-airflow.png]]
<div align="center">
	<p style="text-align: center;">Use MLFlow with Airflow for Training and Inference Pipeline</p>
</div>


![[design-mlops-workflow.png]]
<div align="center">
	<p style="text-align: center;">Use MLFlow for Inference Pipeline</p>
</div>

So I design two options but with the purpose, let's image

1. In first step, AI Engineer will build model and log that into `MLflow` for keeping artifact. `MLflow` will help you versioning and label your model for used.
	- If you work `airflow`, you can use event promote in `MLflow` for trigger `DAGs` worked and submit into webhook via `pub/sub` modeling and building configmap for your application
	- If you are only use `Mlflow`, you can use and playground with `MLflow` CLI to retrieve information of model
2. Build the docker image base on new code, push that into registry and wait for `argocd-image-updater` update the built image tag [following GitOps flow with ArgoCD](https://argocd-image-updater.readthedocs.io/en/stable/basics/update-strategies/)
	- With `Airflow`, that will not need to build docker image, It just focus on building configure map and submit that into Git
3. ArgoCD will sync from Git into ArgoCD management and your configuration will transfer into Kubernetes
4. Now update new configuration into your application, now you have option choose `sync` or not to update your image. In terms of situation, `auto-sync` is enabling, you can go for it to update automatically into your AI Application
5. Trigger runtime to retrieve the package, models and secrets from multiple resources, It will help you reduce a lot of time by checking from cache (as PVC) before downloading from remote like `Pypi` or `MLflow`
	- The strategies will different when use `airflow`, because it gracefully create new configmap and you config map to reload it, the `configmap` will store who directory, path for configuration runtime
	- In terms of use only `mlflow`, I will focus on setup via script file as `run-setup.sh` for example to setup environment and help minimize step in Kubernetes command
6. Package and models download from remote will be saved into PVC as Cache for next using, PVC will reuse `nfs` strategies, find more at [[Kubewekend Session Extra 1]] to understand more about how to setup `nfs` as PVC

Following step by step, you can choose some one of tools for setup [monorepo](https://github.com/korfuri/awesome-monorepo?tab=readme-ov-file) and centralize that into same way, such as

- [Make](https://www.gnu.org/software/make/manual/make.html)
- [Nx](https://nx.dev/)
- [Bazel](https://bazel.build/)
- ...

I decide to choose `make` and use `makefile` to control that one

```bash title="makefile"
requirements:
	pip install -r requirements.txt
	bash run-setup.sh

inference:
	python3 inference.py
```

To easier approaching, I will try to write `run-setup.sh` to support download, check and validate mode exist or not in PVC. But first of all, when you use `MLflow` as model registry, you should setup some environment variable, like

- `LOCAL_MODEL_PATH`: Use for specific location for storing downloading model **(e.g:** `/src/models`**)**
- `MLFLOW_MODEL_NAME`:  Use for specific model name when you log in MLflow **(e.g:** `set_fit_model`**)**
- `MLFLOW_MODEL_VERSION`: Use for specific version of model inside registry
- `MLFLOW_TRACKING_USERNAME`: Username for access into MLflow
- `MLFLOW_TRACKING_PASSWORD`:  Password for access into MLflow
- `MLFLOW_TRACKING_URI`: Tracking URI of MLflow

```bash title="run-setup.sh"
#!/bin/bash

# # MLflow # # 
MLFLOW_MODEL_NAME="$MLFLOW_MODEL_NAME" MLFLOW_MODEL_VERSION="$MLFLOW_MODEL_VERSION"

# # GENERAL # #
LOCAL_MODEL_PATH="$LOCAL_MODEL_PATH"

if [ -d "$LOCAL_MODEL_PATH/$MODEL_REGISTRY/$MLFLOW_MODEL_VERSION" ]; then
        echo "Model already exists at $LOCAL_MODEL_PATH/$MODEL_REGISTRY/$MLFLOW_MODEL_VERSION. Skipping download."
    else
        echo "Model not found. Downloading..."
        mkdir -p "$LOCAL_MODEL_PATH" # Create if it doesn't exist
        # # Download the model
        mlflow artifacts download --artifact-uri "models:/$MLFLOW_MODEL_NAME/$MLFLOW_MODEL_VERSION" \
        --dst-path "$MODELS_DIR/$MODEL_REGISTRY/$MLFLOW_MODEL_VERSION" || rm -rf $MODELS_DIR/$MODEL_REGISTRY/$MLFLOW_MODEL_VERSION
        # Verify download (essential!)
        if [ -d "$LOCAL_MODEL_PATH/$MODEL_REGISTRY/$MLFLOW_MODEL_VERSION" ]; then
            echo "Model downloaded successfully to $LOCAL_MODEL_PATH/$MODEL_REGISTRY/$MLFLOW_MODEL_VERSION"
        else
            echo "ERROR: Model download failed"
            exit 1

```

Now package that into `Dockerfile` and push into registry

At the end of application, you can try to setup PVC and Command into your application manifest, and your cache will work, first time will slow but second time will faster

```yaml title="deployment.yaml" {17-20, 23-36}
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ai-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: ai-deployment
  template:
    metadata:
      labels:
        app: ai-deployment
    spec:
      containers:
        - command:
            - "/bin/sh"
            - "-c"
            - "make requirements && make inference"
          image: python:3.10-buster
          name: ai-deployment
          volumeMounts:
			- name: models-package-cache
			  mountPath: /src/models
			  subPath: ./data/models/
			- name: models-package-cache
			  mountPath: /root/.cache/pip
			  subPath: ./data/cache/pip
			- name: models-package-cache
			  mountPath: /root/.cache/pypoetry
			  subPath: ./data/cache/poetry
      volumes:
		- name: models-package-cache
		  persistentVolumeClaim:
		    claimName: cache-pvc
```

Now run apply and you will see result

```bash
kubectl apply -f deployment.yaml
```

## Troubleshoot and Optimize

With the implementation, in term of situations, we will encounter a couple of problems and we need to figure out the solution for tackling with them, including
### 1. Is the implementation suitable for replica > 2 ?

Yes, in the good ways, we can configure to help multiple pods that rolling update sequentially.

Use strategies `RollingUpdate` deployments, explore more in there [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-update-deployment), It means when we set `.spec.strategy.type==RollingUpdate`. You can specify `maxUnavailable` and `maxSurge` to control the rolling update process.

With default configuration, `maxUnavailable` and `maxSurge` will set for 25%, It means at least one pod can be create new and one pod can be available in `replicasets`

In the `run-setup.sh` script, it’s will have check and ignore when the model is truly existence

```bash
if [ -d "$LOCAL_MODEL_PATH/$MODEL_REGISTRY/$MLFLOW_MODEL_VERSION" ]; then
        echo "Model already exists at $LOCAL_MODEL_PATH/$MODEL_REGISTRY/$MLFLOW_MODEL_VERSION. Skipping download."
```

### 2. Throttling CPU when load package from cache to pods

When Pod use `pip` or `poetry` to download package from `PyPi` or `cache`, we will encounter a couple of problems about CPU Utilization, for example

- The download and load progress is executed, that will find the resource inside `Cache` before hit to `PyPi`. In term of situations, Cache exist package requirements, that will load from Cache into Memory and reserve CPU for load Cache into application.
- With CPU on cloud, sometime It will have less core and frequency MHz, so In bad way It will make the download slow a bit but willing completely as well

When we explore about the issue at [Pip build option to use multicore](https://stackoverflow.com/questions/26228136/pip-build-option-to-use-multicore) , we can intercept about in **default**, `Pip` will use only one core for downloading and that can cause Throttling CPU

But we can try to setup add-on `--install-option="--jobs=6"` for `pip` or use that one with `make` via `MAKEFLAGS="-j$(nproc)"`

**Use with Pip**

```bash
pip3 install --install-option="--jobs=6" PyXXX
```

**Use with Make**

```bash
export MAKEFLAGS="-j$(nproc)" make requirements
```

# The initialization for model deployment (Advantaged Solution)

![[meme-awesome.png|center]]

When dealing with the dynamic nature of various tools required for **AI delivery with cache**, you have two main options for setup: using an **`initContainer`** or leveraging **runtime commands** within a **Kubernetes Pod**. You've decided to proceed with the second option—manipulating the tools via **runtime commands** executed by the main container.

Before proceeding, I want to give a shout-out to **[Anh Nhan Phan - AI Engineer](https://www.linkedin.com/in/nhan-phan-van-b814b223a/)**  who successfully built and established **Hive - Model and Data Registry**.
## 1. Raw Script

Here what you need to put init into `run-setup.sh` or what ever name you want

```bash title="run-setup.sh"
#!/bin/bash

# Function to replace the extracted path with a new path in a file.
# Requires 'jq' for JSON and 'yq' for YAML/YML.
replace_model_path() {
    local new_path="$1"
    local kv_models="$2"
    local file_path="$3"
    local file_extension=$(echo "$file_path" | awk -F'.' '{print $NF}')

    if [ "$file_extension" == "json" ]; then

      # Attempt to extract path (only used for presence check, not critical for jq update)
      extracted_path=$(sed -n 's/.*'$(echo $kv_models)':\s*\([^[:space:]]*\).*/\1/p' "$file_path")

      if [ -n "$extracted_path" ]; then
        # Use jq to recursively walk through all objects and update the key 'kv_models'
        # Note: This updates ALL instances of the key if it appears multiple times.
        jq 'walk(if type == "object" then with_entries( if .key == "'${kv_models}'" then .value = "'${new_path}'" else . end ) else . end)' "$file_path" > "$file_path.tmp" \
        && mv "$file_path.tmp" "$file_path"
        echo "✅ Replaced '$kv_models' with '$new_path' in $file_path ✅"
      else
        echo "⛔ $kv_models key not found in $file_path ⛔"
        exit 1
      fi        
    elif [ "$file_extension" == "yaml" ] || [ "$file_extension" == "yml" ]; then

      # Attempt to extract path (only used for presence check, not critical for yq update)
      extracted_path=$(sed -n 's/.*'$(echo $kv_models)':\s*\([^[:space:]]*\).*/\1/p' "$file_path")

      if [ -n "$extracted_path" ]; then
        # Use yq to recursively walk through all objects and update the key 'kv_models'
        yq 'walk(if type == "object" then with_entries( if .key == "'${kv_models}'" then .value = "'${new_path}'" else . end ) else . end)' "$file_path" --yaml-output > "$file_path.tmp" \
        && mv "$file_path.tmp" "$file_path"
        echo "✅ Replaced '$kv_models' with '$new_path' in $file_path ✅"
      else
        echo "⛔ $kv_models key not found in $file_path ⛔"
        exit 1
      fi
    else
      echo "⛔ Not support file extension: $file_extension ! Please use json, yaml or yml ⛔"
      exit 1
    fi
}

# Function to check if a CLI tool exists
check_cli_tool() {
    local tool_name="$1"

    if [ "$(command -v "$tool_name")" != "" ]; then
      echo "✅ $tool_name is installed ✅"
      return 0 # Tool exists
    else
      echo "⛔ ERROR: $tool_name is not installed. Please install it to proceed. ⛔"
      return 1 # Tool does not exist
    fi
}

# Function to validate mlflow model version based on alias/tag
validate_mlflow_model() {
    local MODEL_VERSION=""
    
    # Requires Python and the 'mlflow' library to be installed
    MODEL_VERSION="$(python3 -c "$(cat <<EOF
from mlflow import MlflowClient; 
import os

MLFLOW_MODEL_NAME=os.getenv('MLFLOW_MODEL_NAME')
MLFLOW_MODEL_ALIAS=os.getenv('MLFLOW_MODEL_ALIAS')

try:
  client = MlflowClient(); 
  model_version = client.get_model_version_by_alias(MLFLOW_MODEL_NAME, MLFLOW_MODEL_ALIAS).version; 
  print(model_version)
except Exception as e:
  print("ERROR")
  print(f"MLflow validation failed: {e}", file=os.sys.stderr)
EOF
)" 2> /dev/null || echo "ERROR")"

    echo "$MODEL_VERSION"
}

# Login Hive
hive_login() {
    echo "Attempting HIVE login..."
    hive login --email "$HIVE_EMAIL" --password "$HIVE_PASSWORD" 2> /dev/null

    if [ $? -eq 0 ]; then
      echo "✅ HIVE login successful. ✅"
      return 0
    else
      echo "⛔ ERROR: hive login failed. Check HIVE_EMAIL and HIVE_PASSWORD environment variables. ⛔"
      return 1
    fi
}

# Function to validate hive model version depend on alias/tag
validate_hive_model() {
    local MODEL_VERSION=""
    echo "Validating HIVE tag: $HIVE_TAG_NAME for repo ID: $HIVE_MODEL_REPO_ID"

    MODEL_VERSION="$(hive tag get -id "$HIVE_MODEL_REPO_ID" -t "$HIVE_TAG_NAME" --return-raw)"

    if [ $? -eq 0 ] && [ -n "$MODEL_VERSION" ]; then
      echo "$MODEL_VERSION"
    else
      echo "ERROR"
    fi
}

# Function to download and configure a model based on registry
download_and_configure_model() {
    local MODEL_REGISTRY="$1"
    local LOCAL_MODEL_PATH="$2" # option or default (absolute path for download destination)
    local MODELS_DIR="$3" # option or default (relative path for config update)
    local MODEL_VERSION="$4" # option (specific version/id)
    local KEY_MODEL_CONTEXT="$5" # option or default
    local CONFIGURE_FILE_PATH="$6" # option or default
    local MODEL_DEPLOYMENT_VERSION=""

    if [ "$MODEL_REGISTRY" = "HIVE" ]; then

      # 1. Login to HIVE
      if ! hive_login ; then
        exit 1;
      fi

      # 2. Check CLI tool
      if ! check_cli_tool hive ; then
        exit 1
      fi

      # 3. Determine Model Version
      if [ -z "$MODEL_VERSION" ]; then
          MODEL_DEPLOYMENT_VERSION=$(validate_hive_model)
      else
          MODEL_DEPLOYMENT_VERSION="$MODEL_VERSION"
      fi

      if [ "$MODEL_DEPLOYMENT_VERSION" = "ERROR" ] || [ -z "$MODEL_DEPLOYMENT_VERSION" ]; then
        echo "⛔ version or alias/tag ('$HIVE_TAG_NAME') not found for HIVE, please assign MODEL_VERSION or HIVE_TAG_NAME and retry. ⛔"
        exit 1
      fi

      # 4. Define full destination path
      DEST_PATH="$LOCAL_MODEL_PATH/$MODEL_REGISTRY/$MODEL_DEPLOYMENT_VERSION"
      CONFIG_PATH="$MODELS_DIR/$MODEL_REGISTRY/$MODEL_DEPLOYMENT_VERSION"


      if [ -d "$DEST_PATH" ]; then
          echo "✅ Model already exists at $DEST_PATH. Skipping download. ✅"
          replace_model_path "$CONFIG_PATH" "$KEY_MODEL_CONTEXT" "$CONFIGURE_FILE_PATH"
      else
          echo "⏳ Model not found. Downloading version $MODEL_DEPLOYMENT_VERSION...⏳"

          # Ensure the download destination exists
          mkdir -p "$LOCAL_MODEL_PATH"

          # Download the model and clean up on failure
          hive resource download -p "$DEST_PATH" -id "$HIVE_MODEL_REPO_ID" -v "$MODEL_DEPLOYMENT_VERSION"
          DOWNLOAD_STATUS=$?
          
          if [ $DOWNLOAD_STATUS -ne 0 ]; then
              echo "⛔ ERROR: HIVE download failed (Status: $DOWNLOAD_STATUS). Removing partial download directory: $DEST_PATH ⛔"
              rm -rf "$DEST_PATH"
              exit 1
          fi

          # Verify download
          if [ -d "$DEST_PATH" ]; then
              echo "✅ Model downloaded successfully to $DEST_PATH ✅"
              replace_model_path "$CONFIG_PATH" "$KEY_MODEL_CONTEXT" "$CONFIGURE_FILE_PATH"
          else
              echo "⛔ ERROR: Model download failed (directory verification failed). ⛔"
              exit 1
          fi
      fi

    elif [ "$MODEL_REGISTRY" = "MLFLOW" ]; then

      # 1. Check CLI tool
      if ! check_cli_tool mlflow ; then
        exit 1
      fi

      # 2. Determine Model Version
      if [ -z "$MODEL_VERSION" ]; then
          MODEL_DEPLOYMENT_VERSION=$(validate_mlflow_model)
      else
          MODEL_DEPLOYMENT_VERSION="$MODEL_VERSION"
      fi

      if [ "$MODEL_DEPLOYMENT_VERSION" = "ERROR" ] || [ -z "$MODEL_DEPLOYMENT_VERSION" ]; then
        echo "⛔ version or alias/tag ('$MLFLOW_MODEL_ALIAS') not found for MLFLOW model '$MLFLOW_MODEL_NAME', please assign MODEL_VERSION or MLFLOW_MODEL_ALIAS and retry. ⛔"
        exit 1
      fi

      # 3. Define full destination path
      DEST_PATH="$LOCAL_MODEL_PATH/$MODEL_REGISTRY/$MODEL_DEPLOYMENT_VERSION"
      CONFIG_PATH="$MODELS_DIR/$MODEL_REGISTRY/$MODEL_DEPLOYMENT_VERSION"

      if [ -d "$DEST_PATH" ]; then
        echo "✅ Model already exists at $DEST_PATH. Skipping download. ✅"
        replace_model_path "$CONFIG_PATH" "$KEY_MODEL_CONTEXT" "$CONFIGURE_FILE_PATH"
      else
        echo "⏳ Model not found. Downloading model '$MLFLOW_MODEL_NAME' version $MODEL_DEPLOYMENT_VERSION...⏳"
        mkdir -p "$LOCAL_MODEL_PATH" # Create if it doesn't exist

        # Download the model and clean up on failure
        # Note: MLflow downloads to the destination directory structure, not inside it, 
        # so we download to a temp location and move/rename.
        MLFLOW_ARTIFACT_URI="models:/$MLFLOW_MODEL_NAME/$MODEL_DEPLOYMENT_VERSION"
        
        # Download artifacts to the destination path
        mlflow artifacts download --artifact-uri "$MLFLOW_ARTIFACT_URI" \
        --dst-path "$DEST_PATH"
        DOWNLOAD_STATUS=$?

        if [ $DOWNLOAD_STATUS -ne 0 ]; then
            echo "⛔ ERROR: MLFLOW download failed (Status: $DOWNLOAD_STATUS). Removing partial download directory: $DEST_PATH ⛔"
            rm -rf "$DEST_PATH"
            exit 1
        fi

        # Verify download
        if [ -d "$DEST_PATH" ]; then
          echo "✅ Model downloaded successfully to $DEST_PATH ✅"
          replace_model_path "$CONFIG_PATH" "$KEY_MODEL_CONTEXT" "$CONFIGURE_FILE_PATH"
        else
          echo "⛔ ERROR: Model download failed (directory verification failed). ⛔"
          exit 1
        fi
      fi        
    fi
}

# Function to validate environment variables
validate_env_vars() {
    local valid=true
    local registry_set=false

    # Check for mandatory registry-specific ENV vars
    if [ "$MODEL_REGISTRY" = "MLFLOW" ]; then
        registry_set=true
        if [ -z "$MLFLOW_MODEL_NAME" ]; then
            echo "⛔ ERROR: MLFLOW_MODEL_NAME is not set (required for MLFLOW registry). ⛔"
            valid=false
        fi
        if [ -z "$MODEL_VERSION" ] && [ -z "$MLFLOW_MODEL_ALIAS" ]; then
            echo "⛔ ERROR: MODEL_VERSION or MLFLOW_MODEL_ALIAS must be set for MLFLOW. ⛔"
            valid=false
        fi
    fi

    if [ "$MODEL_REGISTRY" = "HIVE" ]; then
        registry_set=true
        if [ -z "$HIVE_MODEL_REPO_ID" ]; then
            echo "⛔ ERROR: HIVE_MODEL_REPO_ID is not set (required for HIVE registry). ⛔"
            valid=false
        fi
        if [ -z "$MODEL_VERSION" ] && [ -z "$HIVE_TAG_NAME" ]; then
            echo "⛔ ERROR: MODEL_VERSION or HIVE_TAG_NAME must be set for HIVE. ⛔"
            valid=false
        fi
        if [ -z "$HIVE_EMAIL" ] || [ -z "$HIVE_PASSWORD" ]; then
            echo "⛔ ERROR: HIVE_EMAIL and HIVE_PASSWORD must be set for HIVE login. ⛔"
            valid=false
        fi
    fi

    if ! "$registry_set"; then
        echo "⛔ ERROR: Invalid MODEL_REGISTRY specified: '$MODEL_REGISTRY'. Must be HIVE or MLFLOW. ⛔"
        valid=false
    fi

    if "$valid"; then
      return 0 # All variables are valid
    else
      return 1 # At least one variable is invalid
    fi
}

# --- Main Execution Block ---

# Global variables setup from positional arguments or environment variables
# Note: Arguments passed on the CLI take precedence over environment variables.
MODEL_REGISTRY="${1:-"$MODEL_REGISTRY"}"
LOCAL_MODEL_PATH="${2:-${LOCAL_MODEL_PATH:-"/src/models"}}"
MODELS_DIR="${3:-${MODELS_DIR:-"models"}}"
MODEL_VERSION="${4:-"$MODEL_VERSION"}"
KEY_MODEL_CONTEXT="${5:-${KEY_MODEL_CONTEXT:-"model_name_or_path"}}"
CONFIGURE_FILE_PATH="${6:-${CONFIGURE_FILE_PATH:-"config/system_config.yaml"}}"

echo "--- Model Deployment Setup Initiated ---"
echo "Registry: $MODEL_REGISTRY"
echo "Local Download Path (Absolute): $LOCAL_MODEL_PATH"
echo "Config Path (Relative): $MODELS_DIR"
echo "Target Config File: $CONFIGURE_FILE_PATH"
echo "Config Key to Update: $KEY_MODEL_CONTEXT"
if [ -n "$MODEL_VERSION" ]; then
    echo "Specific Model Version/ID: $MODEL_VERSION"
fi

# Validate requirement variables
if ! validate_env_vars; then
    echo "--- Setup Failed Due to Environment/Argument Errors ---"
    exit 1
fi

# Execute the main function
if download_and_configure_model "$MODEL_REGISTRY" "$LOCAL_MODEL_PATH" "$MODELS_DIR" "$MODEL_VERSION" "$KEY_MODEL_CONTEXT" "$CONFIGURE_FILE_PATH"; then
    echo "--- Model Deployment Setup Completed Successfully ---"
    exit 0
else
    echo "--- Model Deployment Setup Failed ---"
    exit 1
fi
```

>[!info]
>You can follow User Guide bellow to understand more how need you to do with this script

This script is designed to streamline the process of downloading a machine learning model from a centralized registry (**MLFLOW** or **HIVE**) and automatically configuring its local path within a deployment's configuration file (JSON, YAML, or YML).

## 2. Prerequisites

You must have the following tools installed and accessible in your execution environment:

|Tool|Purpose|Requirement for|
|---|---|---|
|**`jq`**|JSON processor, required for updating JSON configuration files.|All operations on `.json` files.|
|**`yq`**|YAML/YML processor, required for updating YAML/YML configuration files.|All operations on `.yaml` or `.yml` files.|
|**`mlflow` CLI**|MLflow command-line client, used for downloading artifacts.|`MLFLOW` registry only.|
|**`hive` CLI**|HIVE command-line client, used for authentication and downloads.|`HIVE` registry only.|
|**`python3`**|Python interpreter with the `mlflow` package installed, used for resolving aliases/tags.|`MLFLOW` registry only.|

The script itself must be saved (e.g., as `model_deploy_setup.sh`) and made executable:

```bash
chmod +x model_deploy_setup.sh
```

## 3. CLI Usage and Arguments

The script accepts up to six positional arguments, which override any corresponding environment variables. All arguments are optional if the corresponding **environment variables** are set.

### Syntax

```bash
./model_deploy_setup.sh [ARG1] [ARG2] [ARG3] [ARG4] [ARG5] [ARG6]
```

### Positional Arguments

|Index|Name|Default/ENV Fallback|Description|
|---|---|---|---|
|**ARG 1**|`MODEL_REGISTRY`|`$MODEL_REGISTRY`|**MANDATORY**: The model registry to use. Must be **HIVE** or **MLFLOW**.|
|**ARG 2**|`LOCAL_MODEL_PATH`|`/src/models`|**Absolute** path where the model should be downloaded on the local filesystem.|
|**ARG 3**|`MODELS_DIR`|`models`|**Relative** path that will be written into the configuration file. This should reflect the path used by your application at runtime.|
|**ARG 4**|`MODEL_VERSION`|`$MODEL_VERSION`|An optional specific model version ID (e.g., a hash or number). **If provided, this overrides any alias/tag lookup.**|
|**ARG 5**|`KEY_MODEL_CONTEXT`|`model_name_or_path`|The specific key in the configuration file whose value will be updated with the model path.|
|**ARG 6**|`CONFIGURE_FILE_PATH`|`config/system_config.yaml`|The path to the configuration file (must be `.json`, `.yaml`, or `.yml`).|

## 4. Environment Variables (Required)

In addition to the optional positional arguments, you **must** set registry-specific environment variables for the script to identify and locate the correct model.

### For MLFLOW Registry (`MODEL_REGISTRY="MLFLOW"`)

| Variable                       | Description                                                                                                                         |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`MLFLOW_MODEL_NAME`**        | The registered name of the model in MLflow (e.g., `my-production-classifier`).                                                      |
| **`MLFLOW_MODEL_ALIAS`**       | The alias (tag) used to identify the target version (e.g., `staging`, `Champion`). **Required if `MODEL_VERSION` is not provided.** |
| `MLFLOW_TRACKING_URI`          | _Optional but recommended._ The URI of your MLflow tracking server.                                                                 |
| `MLFLOW_TRACKING_USERNAME`<br> | _Optional._ Username for accessing a remote MLflow tracking server (required if authentication is enabled).                         |
| `MLFLOW_TRACKING_PASSWORD`     | _Optional._ Password for accessing a remote MLflow tracking server (required if authentication is enabled).                         |
### For HIVE Registry (`MODEL_REGISTRY="HIVE"`)

| Variable                 | Description                                                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| **`HIVE_EMAIL`**         | The email address for HIVE authentication (required for `hive login`).                                              |
| **`HIVE_PASSWORD`**      | The password for HIVE authentication (required for `hive login`).                                                   |
| **`HIVE_MODEL_REPO_ID`** | The unique repository ID for the model in HIVE.                                                                     |
| **`HIVE_TAG_NAME`**      | The tag used to identify the target version (e.g., `latest-prod`). **Required if `MODEL_VERSION` is not provided.** |

## 5. Workflow and Logic

1. **Variable Resolution**: The script resolves its settings using positional arguments first, then falling back to environment variables.
2. **Validation**: It validates the `MODEL_REGISTRY` value and ensures all required registry-specific variables are set (e.g., `MLFLOW_MODEL_NAME` for MLFLOW).
3. **CLI Check**: It checks for the presence of necessary CLI tools (`jq`/`yq`, `hive`/`mlflow`).
4. **Version Determination**:
    
    - If **`MODEL_VERSION`** (ARG 4) is set, it is used directly.
    - Otherwise, it attempts to resolve the specific version ID using the configured alias/tag (`MLFLOW_MODEL_ALIAS` or `HIVE_TAG_NAME`).
5. **Download Check**: It checks if the model already exists locally at the resolved absolute path (`$LOCAL_MODEL_PATH/$MODEL_REGISTRY/$MODEL_DEPLOYMENT_VERSION`).
6. **Download/Configuration**:
    
    - If the model **exists**, it skips the download and proceeds to configuration.
    - If the model **does not exist**, it downloads the model using the respective CLI (`mlflow artifacts download` or `hive resource download`).
7. **Configuration Update**: After successful version determination and/or download, the script updates the target configuration file (`CONFIGURE_FILE_PATH`). It locates the key specified by `KEY_MODEL_CONTEXT` and sets its value to the new relative path: `$MODELS_DIR/$MODEL_REGISTRY/$MODEL_DEPLOYMENT_VERSION`.
## 6. Examples

### Example 1: Downloading from MLFLOW using an Alias

**Scenario**: Download the version tagged `Production` for model `my-cnn-model` and update a JSON config file.

```
# Set environment variables for MLFLOW
export MODEL_REGISTRY="MLFLOW"
export MLFLOW_MODEL_NAME="my-cnn-model"
export MLFLOW_MODEL_ALIAS="prod"
export MLFLOW_TRACKING_USERNAME="admin"
export MLFLOW_TRACKING_PASSWORD="secretpassword"

# Run the script using default paths/keys
# (Defaults: /src/models as download, models as config path, config/system_config.yaml as config file)
./model_deploy_setup.sh
```
### Example 2: Downloading a Specific HIVE Version (using positional arguments)

**Scenario**: Download HIVE version `v1.2.3` for repo ID `12345` to a custom location and update a custom YAML file key.

```
# Set environment variables for HIVE login and ID
export HIVE_EMAIL="user@example.com"
export HIVE_PASSWORD="secretpassword"
export HIVE_MODEL_REPO_ID="12345"

# Run the script with specific positional arguments:
# ARG 1: HIVE
# ARG 2: /tmp/my_data/ (Absolute Download Path)
# ARG 3: data/ (Config Relative Path)
# ARG 4: v1.2.3 (Specific Version ID)
# ARG 5: s3_model_uri (Config Key)
# ARG 6: app_settings.yaml (Config File)
./model_deploy_setup.sh "HIVE" "/tmp/my_data" "data" "v1.2.3" "s3_model_uri" "app_settings.yaml"
```

**Resulting Config Path**: The script will write `data/HIVE/v1.2.3` into the `app_settings.yaml` file under the key `s3_model_uri`.

# Conclusion

![[meme-byebye.png|center|400]]

>[!done]
>It's too long for write a bit again, because I hold this blog too long and maybe release couple week ago but now we have it, no reason why LOL. Hope you get well and find information for your work, it's such wonderful adventure when I try to learn about cache and build up some strategies can be applied into AI Application, that will great as well

>[!quote]
>One week pass through, I just sit and write back again after long time and focus on other work, maybe I just let my self enjoy more with tech than force into discipline same last year. I truly enjoy, learn and figure out what should I do for next path, so you can do too, just keep run, learn, have fun and stay safe. See you in next week and now see yah

