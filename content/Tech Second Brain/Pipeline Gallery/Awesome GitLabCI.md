---
title: Awesome GitlabCI
tags:
  - gitlab
  - cicd
  - basic-templates
  - automation
---

# Introduce GitlabCI

>[!summary]
>This template which store short `yaml` to show how can work with `GitlabCI` and note some specify for use case

![[thumbnail-gitlab-ci.png|center]]
*More information about Gitlab CI/CD and Variables. Go check*

## Articles

- [Dev.to - 5 ways for GitLab CI runners to get AWS credentials](https://dev.to/edmundkwok/5-ways-for-gitlab-ci-runners-to-get-aws-credentials-11hp)
- [Dev.to - Authenticating your GitLab CI runner to an AWS ECR registry using Amazon ECR Docker Credential Helper 🔑](https://dev.to/aws-builders/authenticating-your-gitlab-ci-runner-to-an-aws-ecr-registry-using-amazon-ecr-docker-credential-helper-3ba)
- [Medium - Seven tips for writing better GitLab pipelines](https://blog.devops.dev/seven-tips-for-writing-better-gitlab-pipelines-c94f348ad0b9)
## General

- [GitLab CI/CD examples](https://docs.gitlab.com/ee/ci/yaml/yaml_optimization.html) - GitLab CI/CD Collections
- [Gitlab Documentation](https://docs.gitlab.com/ee/user/) - General Documentation about GitLab
- [Gitlab Permissions and roles](https://docs.gitlab.com/ee/user/permissions.html) - About Role and Permissions of account in GitLab organization
- [GitLab Runner Helm chart](https://docs.gitlab.com/runner/install/kubernetes/) - Self-hosted runner inside Kubernetes
- [GitLab Runner](https://docs.gitlab.com/runner/) - Information about GitLab Runner and configuration
- [GitLab Runner Docker executor](https://docs.gitlab.com/runner/executors/docker/) - Uses the Docker executor to run jobs on Docker images.
- [Run GitLab Runner in a container](https://docs.gitlab.com/runner/install/docker/) - GitLab Runner in a Docker container to execute CI/CD jobs
## Syntax

- [Gitlab CI/CD Syntax](https://docs.gitlab.com/ee/ci/yaml/) - Introduce about GitLab Syntax and usage
- [Variables](https://docs.gitlab.com/ee/ci/variables/) & [Predefine variables](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html) - GitLabCI Variables and Predefined variables
- [Scripts and job logs](https://docs.gitlab.com/ee/ci/yaml/script.html#multiline-commands-not-preserved-by-folded-yaml-multiline-block-scalar) - Use for format script and log inside job
## Features

- [GitlabCI Services](https://docs.gitlab.com/ee/ci/services/) - Use service keyword GitLabCI
- [Run your CI/CD jobs in Docker containers](https://docs.gitlab.com/ee/ci/docker/using_docker_images.html#use-statically-defined-credentials) - Setup GitLabCI in docker+machine
- [Use Docker to build Docker images](https://docs.gitlab.com/ee/ci/docker/using_docker_build.html) - Run Dind to build image inside GitLabCI
- [DRY development: A cheatsheet on reusability throughout GitLab](https://about.gitlab.com/blog/2023/01/03/keeping-your-development-dry/) - DRY Mindset
- [Optimize GitLab CI/CD configuration files](https://docs.gitlab.com/ee/ci/yaml/yaml_optimization.html) - Optimize and DRY Mindset
- [CI/CD components](https://docs.gitlab.com/ee/ci/components/) - GitLabCI Components
- [Downstream pipelines](https://docs.gitlab.com/ee/ci/pipelines/downstream_pipelines.html?tab=Multi-project+pipeline) - Use Downstream pipelines for trigger
- [Gitlab CI/CD Pass artifacts/variables between pipelines](https://stackoverflow.com/questions/68179565/gitlab-ci-cd-pass-artifacts-variables-between-pipelines) - Methodology for reuse artifacts
- [GitLab CI/CD artifacts reports types](https://docs.gitlab.com/ee/ci/yaml/artifacts_reports.html) - Report type of GitLab Artifact
- [GitLab CI/CD Environments and deployments](https://docs.gitlab.com/ee/ci/environments/) - Environments describe where code is deployed.
- [GitLab container registry](https://docs.gitlab.com/ee/user/packages/container_registry/) - You can use the integrated container registry to store container images for each GitLab project.
- [How to modify a variable, used as name for docker image](https://forum.gitlab.com/t/how-to-modify-a-variable-used-as-name-for-docker-image/81438/1) - Dynamic image to using for GitLabCI
- [Caching in GitLab CI/CD](https://docs.gitlab.com/ci/caching/)  - Use Cache Strategies for boosting productivity CI/CD
## Issues

- [StackOverFlow - Pip install a private repo from Gitlab with Personal Access Token on Gitlab-CI](https://stackoverflow.com/questions/64266246/pip-install-a-private-repo-from-gitlab-with-personal-access-token-on-gitlab-ci)

## Templates

- [to be continuous...](https://gitlab.com/to-be-continuous): GitLab CI templates
- [GitLab Template](https://gitlab.com/gitlab-org/gitlab/-/tree/master/lib/gitlab/ci/templates): Development guide for GitLab CI templates
# Setup GitLab Runner

## Run in Container (Docker Executor)

GitLab Runner is one platform which offers us multiple way for [executor](https://docs.gitlab.com/runner/executors/), we have

- [Shell](https://docs.gitlab.com/runner/executors/shell/)
- [Docker](https://docs.gitlab.com/runner/executors/docker/)
- [Kubernetes](https://docs.gitlab.com/runner/executors/kubernetes/)

That why you can choose one of these for your project, and solution has seen most choice is Docker

>[!info]
>You can use the Docker executor to:
>- Maintain the same build environment for each job
>- Use the same image to test commands locally without the requirement of running a job in the CI server.
>
>The Docker executor uses [Docker Engine](https://www.docker.com/products/container-runtime/) to run each job in a separate and isolated container. To connect to Docker Engine, the executor uses:
>- The image and services you define in [`.gitlab-ci.yml`](https://docs.gitlab.com/ci/yaml/).
>- The configurations you define in [`config.toml`](https://docs.gitlab.com/runner/commands/#configuration-file).

When you setup your `gitlab-runner` inside container, you can double-check two repository for official or trusted image

- [gitlab/gitlab-runner](https://hub.docker.com/r/gitlab/gitlab-runner)
- [bitami/gitlab-runner](https://hub.docker.com/r/bitnami/gitlab-runner)

First of all, you need to create the `gitlab-runner` via API or UI of gitlab

Next, after first step you will get the `token` for helping you connect your container with `GitLab`. So with the `gitlab-runner` image, It will hit to `entrypoint` with [gitlab-runner command](https://docs.gitlab.com/runner/commands/), so you can attached `args` when your run container.

If you not set `args`, It will default use `run` command with configuration. To let's your `gitlab-runner` pick your job, you should run `register` command, and it will create the` config.toml` at `/srv/gitlab-runner/config`

```bash
docker run -d --name gitlab-runner \
-v /srv/gitlab-runner/config:/etc/gitlab-runner \
-v /var/run/docker.sock:/var/run/docker.sock \
gitlab/gitlab-runner:v17.4.2 register \
--non-interactive \
--url your-gitlab-url \
--token your-gitlab-runner-token \
--executor docker \
--docker-image alpine:latest
```

```toml title="config.toml"
concurrent = 1

[[runners]]
  name = "lintRunner" # Name your runner
  url = "..." # URL GitLab
  token = "..." # GitLab Token
  executor = "docker"
  [runners.docker]
    tls_verify = false
    image = "alpine:latest"
    privileged = false
    disable_entrypoint_overwrite = false
    oom_kill_disable = false
    disable_cache = false # Should be used if you wanna cache active
    volumes = [
      "/cache", # Modify this path for volume when the cache output
    ]
    shm_size = 0
    allowed_pull_policies = ["always", "if-not-present"]
```

Now run your `gitlab-runner` with command

```bash
docker run -d --name gitlab-runner \
-v /srv/gitlab-runner/config:/etc/gitlab-runner \
-v /var/run/docker.sock:/var/run/docker.sock \
gitlab/gitlab-runner:v17.4.2
```

For the situation, you want to reconfiguration, you can modify directly in `config.toml`, your GitLab will dynamically reload after 3s. Explore more about at: [Advanced Configuration](https://docs.gitlab.com/runner/configuration/advanced-configuration/)

If you don't wanna to keep continue gitlab-runner, you can remove that or unregistered that for maintain or do something

```bash
docker run -d --name gitlab-runner \
-v /srv/gitlab-runner/config:/etc/gitlab-runner \
-v /var/run/docker.sock:/var/run/docker.sock \
gitlab/gitlab-runner:v17.4.2 unregister \
--url your-gitlab-url \
--token your-gitlab-runner-token
```
# Use cases and scenarios

## Completely pipeline for Container Services

>[!info]
>React build app, test and build Image for container services

>[!info]
>This pipeline definition will cover for me and you with mostly cases when you work with GitlabCI
>- Run Script
>- Perform test
>- Build code and upload artifact
>- Build docker image and push to currently registry

```yaml title=".gitlab-ci.yml"
# Define stage for running job inside
stages:
  - 'synchronize-code'
  - 'test'
  - 'build-code'
  - 'build-image'

# Choose the default image if not set, it will use it
default:
  image:
    name: node:18-bullseye

# Default, run script before you run the script on job
before_script:
  - npm i -g yarn --force
  - yarn install

# Job is define with rule, another before_script and script
synchronize-code-job:
  stage: synchronize-code
  retry: 1
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
      changes:
        - src/config/i18n/data/*
  image: debian:11.7
  before_script:
    - apt update && apt install -y curl jq
  script:
    - bash -c "./utils/synchronize_gitlab.sh $(echo $PRIVATE_GLAB_TOKEN) $(echo $GLAB_USERNAME)"

test-code-job:
  stage: test
  retry: 1
  script:
    - yarn lint:fix
  allow_failure: false

build-code-job:
  stage: build-code
  retry: 1
  script:
    - yarn build
    - cp -a dist/. public/
# Upload artifact to gitlab, on path and keep on time
  artifacts:
    untracked: false
    when: on_success
    expire_in: "30 days"
    paths:
      - "./public"
  allow_failure: false

# For some reason, Docker in Docker was tough suggestion with need to manipulated agent run. So alternative for that is using kaniko
# Read on: https://docs.gitlab.com/ee/ci/docker/using_kaniko.html
build-image-job:
  stage: build-image
  retry: 1
  image:
    name: gcr.io/kaniko-project/executor:debug
    entrypoint: ['']
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
  variables:
    IMAGE_NAME: '$CI_REGISTRY_IMAGE:$CI_COMMIT_BRANCH'
  before_script: # Login into registry to push image
    - mkdir -p /kaniko/.docker
    - echo "{\"auths\":{\"${CI_REGISTRY}\":{\"auth\":\"$(printf "%s:%s" "${CI_REGISTRY_USER}" "${CI_REGISTRY_PASSWORD}" | base64 | tr -d '\n')\"}}}" > /kaniko/.docker/config.json
  script:
    - /kaniko/executor
      --context "${CI_PROJECT_DIR}"
      --dockerfile "${CI_PROJECT_DIR}/Dockerfile"
      --destination "${CI_REGISTRY_IMAGE}:${CI_COMMIT_SHORT_SHA}"
  after_script:
    - rm -rf /kaniko/.docker
  allow_failure: false
```

## Build & push docker image to private registry

>[!info]
>Use private ECR of AWS with dind (Local Include)

Before run and execute the script, you need to expose some variables into CI/CD variables because of AWS authentication, and one more to ensure anything secrets will not expose

- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_ACCOUNT

Remember when you want to your variables have effected with your `.gitlab-ci.yml` pipelines, you need to concern about use variables in mode `protected` or not because if your branch is not `protected`, you variables will not have export anything, that sick 😄

![[Pasted image 20240815094141.png|center]]

And then you can execute pipelines like usual, but for become special, I will use add on `include` keyword to import somewhere template `gitlab`, and try to use this one via `!reference`

You need to create template in your repo, for example `/templates/ci/ecr-auth.gitlab-ci.yml`

```yaml title="ecr-auth.gitlab-ci.yml"
.ecr_auth:
  before_script:
    - export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
    - export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
    - export AWS_ACCOUNT=$AWS_ACCOUNT
    - apk add aws-cli
    - aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com
```

>[!info]
>With template will help us to authentication AWS Account, we will use that via `!refernce` tags inside your `.gitlab-ci.yml` and attach with template define with name and which one to use inside template. For example, I have `.ecr_auth` template with `before_script` , base on those one you can use with `!reference [.ecr_auth, before_script]`

And to use `!reference` in yaml file of editor, you need to configure inside settings of them for bypass the error

```json title=".vscode/settings.json"
{
    "yaml.customTags": [
        "!reference sequence"
    ]
}
```

>[!info]
>YAML has a feature called ‘anchors’ that you can use to duplicate content across your document. For example, read here: [YAML anchors for scripts](https://docs.gitlab.com/ee/ci/yaml/yaml_optimization.html#yaml-anchors-for-scripts)

>[!warning]
>But You can’t use YAML anchors across multiple files when using the [`include`](https://docs.gitlab.com/ee/ci/yaml/index.html#include) keyword. Anchors are only valid in the file they were defined in. To reuse configuration from different YAML files, use [`!reference` tags](https://docs.gitlab.com/ee/ci/yaml/yaml_optimization.html#reference-tags) or the [`extends` keyword](https://docs.gitlab.com/ee/ci/yaml/yaml_optimization.html#use-extends-to-reuse-configuration-sections).

```yaml title=".gitlab-ci.yml"
stages:
  - "build-docker-image"

include:
  - local: "/templates/ci/ecr-auth.gitlab-ci.yml"

image: docker:27
# Remember if you use docker:dind from another registry, set alias for service to prevent the error
# Documentation: https://docs.gitlab.com/ee/ci/services/#available-settings-for-services
services:
  - docker:dind

before_script:
  - !reference [.ecr_auth, before_script]

build-python-image:
  stage: build-docker-image
  when: manual
  script: |
    docker build -t $AWS_ACCOUNT.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/base-image:python-generic -f ./docker/python/Dockerfile .
    docker push $AWS_ACCOUNT.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/base-image:python-generic
  allow_failure: false

build-node-image:
  stage: build-docker-image
  when: manual
  image:
    name: docker:dind
  script: |
    docker build -t $AWS_ACCOUNT.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/base-image:node-generic -f ./docker/node/Dockerfile .
    docker push $AWS_ACCOUNT.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/base-image:node-generic
  allow_failure: false
```

## Authentication Job with private ECR from remote repository

![[design-repo-auth-private-aws-ecr.png]]

>[!info]
>Purpose: Create a general template, that help job can authenticate to private ECR from remote repo, following that job will pull and use private docker image for jobs instead of use the public version

Following this idea, `Gitlab` offers for us one methodology to help us authentication private CR via CI/CD variables by `DOCKER_AUTH_CONFIG`. Read more at [documentation](https://docs.gitlab.com/ee/ci/docker/using_docker_images.html#configure-a-job)

>[!note]
>Remember, **DOCKER_AUTH_CONFIG** will only help you authenticate your service for pull image from docker registry, If you want to make interaction with private registry, please use `docker login` or `crane auth login`

1. Create a CI/CD variable `DOCKER_AUTH_CONFIG` with the content of the Docker https://docs.gitlab.com/ee/ci/yaml/script.html#multiline-commands-not-preserved-by-folded-yaml-multiline-block-scalarconfiguration file as the value

	- For protected, general repository will use and wrap authentication, such as `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`, we only authenticate private `ECR` via only general repository. 
	- Therefore, we will use `downstream` techniques of `Gitlab`, with one help us trigger general pipeline from remote repository, and in the last that will submit authentication successfully as `~/.docker/config.json` to remote repository

2. You can now use any private image from private ECR defined in `image` or `services` in your `.gitlab-ci.yml` file

### Create Upstream Pipeline

Upstream pipeline where we configure to generate token of ECR or private dockerhub, you can do same with each others

```yaml title=".gitlab-ci.yml"
stages:
  - "build-docker-image"

include:
  - local: "/templates/ci/ecr-auth.gitlab-ci.yml"

image: docker:27
services:
  - docker:dind

before_script:
  - !reference [.ecr_auth, before_script]

after_script: docker logout $AWS_ACCOUNT.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com

# Export ECR_AUTH_CONFIG for remote repository
ecr_auth:
  stage: .pre
  image: docker:27
  services:
    - docker:dind
  when: always
  script:
    - apk add jq
    - echo "AUTH_CONFIG=$(cat /root/.docker/config.json | jq -r ".auths.\"private.container.registry.com\".auth")" >> auth.env

  rules:
    - when: on_success

  artifacts:
    reports:
      dotenv: auth.env
```

- Follow the technique in the second part, you can reuse template for login `ECR`, and try to import that with `include` and `!reference` keyword
- After run, `before script`, It mean your `docker+machine` runner work and authenticate to `private` ECR, now we add `jq` for help us manipulate and analysis `json` file, which one format of `/root/.docker/config.json` and help you retrieve the token when you use `docker login` command (NOTE: Base64 is actually work and you not need to do anything).
- After analysis and retrieve the token, Gilab offer us the methodology to export that result into `.env` because file is tough for process,therefore with simple string we have easily ways to apply that in other repository. Read more at  [GitLab CI/CD artifacts reports types](https://docs.gitlab.com/ee/ci/yaml/artifacts_reports.html)

>[!warning]
>Remember expose `rules` for any situation because `need` or `trigger` will base on that for condition which execute command in remote repository

- Lastly, we expose that via artifacts, and you will create **downstream pipeline** which one retrieve that value

But wait, you need do one more thing. Because of [expiration of AWS ECR](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ecr/get-login-password.html), you need have strategy to renew that. You don't have much time to prepare what time we need to trigger pipeline again. That why we need `schedule` to handle, and Gitlab provide it for us inside `crontab` and very easily. Read more at [Scheduled pipelines](https://docs.gitlab.com/ee/ci/pipelines/schedules.html)

![[Pasted image 20240818142744.png]]

For example, I create `pipeline schedule` with strategy

- Rerun after every 55 minutes, practice with [cron guru](https://crontab.guru/#*/55_*_*_*_*)
- Select time zone, for example Singapore but it not important in situation
- Select branch, I choose `main` branch
- You can add more custom `variable` when run pipeline
- Click create and enjoy
### Create Downstream pipeline

With downstream pipeline you have two option

- Use `trigger` to call remote repository, but that tough and to control
- Use `need` to receive artifact from remote repository

Follow we will use `need` to define downstream pipeline, for easily expose your token. You will need to practice with `curl` command with [GitlabAPI Project-level CI/CD variables API](https://docs.gitlab.com/ee/api/project_level_variables.html)

```yaml title=".gitlab-ci.yml"
# Downstream use need to receive artiface type
stages:
  - auth
  - ci-stuff

authentication:
  stage: auth
  image: alpine:3 # recommend for cut of time
  needs:
    - project: "gitlab/upstream/project"
      job: private_auth # same name with job expose token
      ref: "main" # branch you want to receive the artifact
      artifacts: true
  script:
    - apk add curl jq
    - DOCKER_AUTH_CONFIG=$(echo "{\"auths\":{\"private.container.registry.com\":{\"auth\":\"$(printf "%s" "$AUTH_CONFIG")\"}}}")
    - 'UPDATE_CONDITION=$(curl -XGET --header "PRIVATE-TOKEN: $GITLAB_AUTH_TOKEN" "https://gitlab.com/api/v4/projects/$CI_PROJECT_ID/variables/DOCKER_AUTH_CONFIG")'
    - >
      if [ "$UPDATE_CONDITION" == "{\"message\":\"404 Variable Not Found\"}" ]; then
        echo "Add new DOCKER_AUTH_CONFIG variable"
        curl -XPOST --header "PRIVATE-TOKEN: $GITLAB_AUTH_TOKEN" "https://gitlab.com/api/v4/projects/$CI_PROJECT_ID/variables" --form "key=DOCKER_AUTH_CONFIG" --form "value=$DOCKER_AUTH_CONFIG" --form "raw=true"  > /dev/null 2>&1
      else
        echo "Update DOCKER_AUTH_CONFIG variable"
        curl -XPUT --header "PRIVATE-TOKEN: $GITLAB_AUTH_TOKEN" "https://gitlab.com/api/v4/projects/$CI_PROJECT_ID/variables/DOCKER_AUTH_CONFIG" --form "value=$DOCKER_AUTH_CONFIG" --form "raw=true"  > /dev/null 2>&1
      fi

# Job for check successfull authentication ECR
recheck:
  stage: ci-stuff
  image: private.container.registry.com/image:latest
  script:
    - echo "I am in private container !!! bruh"
```

- With this `CI`, we will do twice stuff, authentication and check pull private image successfully or not
- Use `need` to retrieve the artifact in `dotenv` in Gitlab, because gitlab provide us many type of artifact and `dotenv` is one of them. Read more at [GitLab CI/CD artifacts reports types](https://docs.gitlab.com/ee/ci/yaml/artifacts_reports.html)
- Use script to install some we need `curl` because `alpine:3` is lighweigh image and do not include anything inside. After that, we trigger `curl` command to execute API of Gitlab to set string `DOCKER_AUTH_CONFIG` inside machine with created via artifact to `CI/CD` variables
	![[Pasted image 20240818141000.png]]

- Now your `recheck` job will pass with in-use `private` image, how cool is this 🙌🙌🙌

	![[Pasted image 20240818144644.png]]

### For optimize pipeline, and easily reuse by other repository

With idea cut off the effort for user who want to implement pipeline, you just change job from execute to hidden with `.` form with become template for reuse by remote repositories, like these

```yaml title="ecr_auth.gitlab-ci.yml" {9-28}
.ecr_auth:
  before_script: &ecr_auth
    - export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
    - export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
    - export AWS_ACCOUNT=$AWS_ACCOUNT
    - apk add aws-cli
    - aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com

.ecr_remote_auth:
  stage: test
  image: alpine:3
  needs:
    - project: "gitlab/upstream/project"
      job: private_auth # same name with job expose token
      ref: "main" # branch you want to receive the artifact
      artifacts: true
  script:
    - apk add curl jq
    - DOCKER_AUTH_CONFIG=$(echo "{\"auths\":{\"private.container.registry.com\":{\"auth\":\"$(printf "%s" "$AUTH_CONFIG")\"}}}")
    - 'UPDATE_CONDITION=$(curl -XGET --header "PRIVATE-TOKEN: $GITLAB_AUTH_TOKEN" "https://gitlab.com/api/v4/projects/$CI_PROJECT_ID/variables/DOCKER_AUTH_CONFIG")'
    - >
      if [ "$UPDATE_CONDITION" == "{\"message\":\"404 Variable Not Found\"}" ]; then
        echo "Add new DOCKER_AUTH_CONFIG variable"
        curl -XPOST --header "PRIVATE-TOKEN: $GITLAB_AUTH_TOKEN" "https://gitlab.com/api/v4/projects/$CI_PROJECT_ID/variables" --form "key=DOCKER_AUTH_CONFIG" --form "value=$DOCKER_AUTH_CONFIG" --form "raw=true"  > /dev/null 2>&1
      else
        echo "Update DOCKER_AUTH_CONFIG variable"
        curl -XPUT --header "PRIVATE-TOKEN: $GITLAB_AUTH_TOKEN" "https://gitlab.com/api/v4/projects/$CI_PROJECT_ID/variables/DOCKER_AUTH_CONFIG" --form "value=$DOCKER_AUTH_CONFIG" --form "raw=true"  > /dev/null 2>&1
      fi
```

And from remote, you can use both `include` and `extends` keywords for retrieve this template, super easy 😄

```yaml title=".gitlab-ci.yml"
# Downstream use need to receive artiface type
stages:
  - auth
  - ci-stuff

include:
  - project: "gitlab/upstream/project" # Not include gitlab.com
    file: "/templates/ci/ecr-auth.gitlab-ci.yml"
    ref: "main"

authentication:
  # Easily reuse with no one understand syntax inside user gitlab
  extends: .ecr_remote_auth

# Job for check successfull authentication ECR
recheck:
  stage: ci-stuff
  image: private.container.registry.com/image:latest
  script:
    - echo "I am in private container !!! bruh"
```

## Caching with GitLab CI

To rapid and boost your GitLab Job, [Cache](https://docs.gitlab.com/ci/caching/) is one of best solution to adapt in your pipeline, fast and compatible with multiple strategies, repository of each languages, e.g: Python or NodeJS. Explore more information and detail at [[GitLab Runner and Features of this platform#Cache - The efficiency behavior for your GitLab|Cache - The efficiency behavior for your GitLab]]

For best practices, you can apply a couple of configurations for your cache, such as

- Policy for `pull-push` your cache. Explore more at [Use a variable to control a job’s cache policy](https://docs.gitlab.com/ci/caching/#use-a-variable-to-control-a-jobs-cache-policy) 
- Use fallback key with cache. Explore more at [Use a fallback cache key](https://docs.gitlab.com/ci/caching/#use-a-fallback-cache-key)
- Configuration `protected` and `unprotected`, in some situations, you need to bypass to help reuse cache from `protected` branch. Explore more at [Use the same cache for all branches](https://docs.gitlab.com/ci/caching/#use-the-same-cache-for-all-branches)

With GitLab Runner already enable Cache, you can add couple of stuff into your GItLab Job with `cache` option
### NodeJS

With `nodejs`, you need to backup your `node_module` into cache for boost your project, so your pipeline will like this

```yaml title=".gitlab-ci.yml" {28-30}
# Define stage for running job inside
stages:
  - 'build-code'

# Choose the default image if not set, it will use it
default:
  image:
    name: node:18-bullseye

# Default, run script before you run the script on job
before_script:
  - npm i -g yarn --force
  - yarn install

build-code-job:
  stage: build-code
  retry: 1
  script:
    - yarn build
    - cp -a dist/. public/
# Upload artifact to gitlab, on path and keep on time
  artifacts:
    untracked: false
    when: on_success
    expire_in: "30 days"
    paths:
      - "./public"
  cache:
    paths:
      - node_modules
  allow_failure: false
  tags:
   - self-hosted-runner
```

### Python

With `python`, it will have some different like location to save the cache, it usually inside `~/.cache or /root/.cache` which `cache` can not touch or access because your `job` will only work in source project, therefore you need to modify a bit

```yaml {4-7}
job-name:
  ...
  variables:
	# Use for poetry project
    POETRY_CACHE_DIR: "$CI_PROJECT_DIR/.cache/pypoetry"
    # Use for pip project
    PIP_CACHE_DIR: "$CI_PROJECT_DIR/.cache/pip"
```

As you can, you can use variables to overwrite where to save the cache for first time, it will save the cache into project directory and allow your job to upload to cache into the pipeline

At the end, this is fully pipeline to help you define the cache for Python Project with combine Policy to `pull-push` with health for your storage 😄

```yaml title=".gitlab-ci.yml"
lint:
  stage: lint
  image: python:3.10.6-slim-bulleye
  variables:
    POETRY_VIRTUALENVS_CREATE: false
  before_script:
    - poetry self update
    - pip install --upgrade pkginfo
  script:
    - make install
    - make lint
  allow_failure: false
  # Add more rule for cache pull-push which great behavior to keep your cache alway on track
  rules:
    - if: $CI_COMMIT_BRANCH == "develop"
      variables:
        POLICY: pull-push
    - if: $CI_COMMIT_BRANCH != $CI_DEFAULT_BRANCH
      variables:
        POLICY: pull
  variables:
    POETRY_CACHE_DIR: "$CI_PROJECT_DIR/.cache/pypoetry"
  # Save and you cache at the another location
  cache:
    key: $CI_PROJECT_NAME-cache
    paths:
      - $POETRY_CACHE_DIR
    policy: $POLICY
  tags: [ docker ]
```

