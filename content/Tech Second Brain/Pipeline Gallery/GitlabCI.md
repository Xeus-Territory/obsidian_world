---
title: GitlabCI
tags:
  - gitlab
  - cicd
  - basic-templates
  - automation
---
>[!summary]
>This template which store short `yaml` to show how can work with `GitlabCI` and note some specify for use case
>
>*More information about Gitlab CI/CD and Variables. Go check:*
>1. [Gitlab CI/CD Syntax](https://docs.gitlab.com/ee/ci/yaml/)
>2. [Variables](https://docs.gitlab.com/ee/ci/variables/) & [Predefine variables](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html) - GitlabCI Variables and Predefine variables
>3. [Gitlab Documentation](https://docs.gitlab.com/ee/user/) - General Documentation about Gitlab
>4. [GitlabCI Services](https://docs.gitlab.com/ee/ci/services/) - Use service keyword GitlabCI
>5. [Run your CI/CD jobs in Docker containers](https://docs.gitlab.com/ee/ci/docker/using_docker_images.html#use-statically-defined-credentials) - Setup GitlabCI in docker+machine
>6. [Use Docker to build Docker images](https://docs.gitlab.com/ee/ci/docker/using_docker_build.html) - Run Dind to build image inside GitlabCI
>7. [GitLab Runner](https://docs.gitlab.com/runner/) - Information about Gitlab Runner and configuration
>8. [DRY development: A cheatsheet on reusability throughout GitLab](https://about.gitlab.com/blog/2023/01/03/keeping-your-development-dry/) - DRY Mindset
>9. [Optimize GitLab CI/CD configuration files](https://docs.gitlab.com/ee/ci/yaml/yaml_optimization.html) - Optimize and DRY Mindset
>10. [CI/CD components](https://docs.gitlab.com/ee/ci/components/) - GitlabCI Components
>11. [GitLab CI/CD examples](https://docs.gitlab.com/ee/ci/yaml/yaml_optimization.html) - GitlabCI/CD Collections
>12. [Downstream pipelines](https://docs.gitlab.com/ee/ci/pipelines/downstream_pipelines.html?tab=Multi-project+pipeline) - Use Downstream pipelines for trigger
>13. [Gitlab CI/CD Pass artifacts/variables between pipelines](https://stackoverflow.com/questions/68179565/gitlab-ci-cd-pass-artifacts-variables-between-pipelines) - Methodology for resue artifacts
>14. [Scripts and job logs](https://docs.gitlab.com/ee/ci/yaml/script.html#multiline-commands-not-preserved-by-folded-yaml-multiline-block-scalar) - Use for format script and log inside job
>15. [GitLab CI/CD artifacts reports types](https://docs.gitlab.com/ee/ci/yaml/artifacts_reports.html) - Report type of Gitlab Artifact

# React build app, test and build Image for container services

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

# Build and push docker image to private ECR with dind (Local Include)

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

# Authentication Job with private ECR from remote repo

![[RepoAuthPrivateECR.png]]

>[!info]
>Purpose: Create a general template, that help job can authenticate to private ECR from remote repo, following that job will pull and use private docker image for jobs instead of use the public version

Following this idea, `Gitlab` offers for us one methodology to help us authentication private CR via CI/CD variables by `DOCKER_AUTH_CONFIG`. Read more at [documentation](https://docs.gitlab.com/ee/ci/docker/using_docker_images.html#configure-a-job)

1. Create a CI/CD variable `DOCKER_AUTH_CONFIG` with the content of the Docker https://docs.gitlab.com/ee/ci/yaml/script.html#multiline-commands-not-preserved-by-folded-yaml-multiline-block-scalarconfiguration file as the value

	- For protected, general repository will use and wrap authentication, such as `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`, we only authenticate private `ECR` via only general repository. 
	- Therefore, we will use `downstream` techniques of `Gitlab`, with one help us trigger general pipeline from remote repository, and in the last that will submit authentication successfully as `~/.docker/config.json` to remote repository

2. You can now use any private image from private ECR defined in `image` or `services` in your `.gitlab-ci.yml` file

## Create Upstream Pipeline

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
## Create Downstream pipeline

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
    - 'curl -XPOST --header "PRIVATE-TOKEN: $GITLAB_AUTH_TOKEN" "https://gitlab.com/api/v4/projects/$CI_PROJECT_ID/variables" --form "key=DOCKER_AUTH_CONFIG" --form "value=$DOCKER_AUTH_CONFIG" --form "raw=true" > /dev/null 2>&1 || curl -XPUT --header "PRIVATE-TOKEN: $GITLAB_AUTH_TOKEN" "https://gitlab.com/api/v4/projects/$CI_PROJECT_ID/variables/DOCKER_AUTH_CONFIG" --form "value=$DOCKER_AUTH_CONFIG" --form "raw=true" > /dev/null 2>&1'

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

