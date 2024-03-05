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
>*More information about GLAB CI/CD and GLAB VARIABLES. Go check:*
>1. [GITLAB CI/CD](https://docs.gitlab.com/ee/ci/yaml/)
>2. [GITLAB VARIABLES](https://docs.gitlab.com/ee/ci/variables/) & [GITLAB_PREDEFINED_VAR](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html)
>3. [GITLAB_DOC](https://docs.gitlab.com/ee/user/)

## Example

```yaml
# .gitlab-ci.yml

stages:
  - 'synchronize-code'
  - 'test'
  - 'build-code'
  - 'build-image'

default:
  image:
    name: node:18-bullseye

before_script:
  - npm i -g yarn --force
  - yarn install

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
  artifacts:
    untracked: false
    when: on_success
    expire_in: "30 days"
    paths:
      - "./public"
  allow_failure: false

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