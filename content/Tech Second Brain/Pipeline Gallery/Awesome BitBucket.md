---
title: The awesome of BitBucket Pipelines
tags:
  - cicd
  - bitbucket
  - automation
  - basic-templates
---
# Introduce BitBucket

>[!summary]
>BitBucket Pipelines is already approached by myself, take a note and sharing about how we can implement with BitBucket Pipelines

## Documentation

- [BitBucket - Build, test, and deploy with Pipelines (General Document)](https://support.atlassian.com/bitbucket-cloud/docs/build-test-and-deploy-with-pipelines/)
- [Bitbucket - Pipelines configuration reference](https://support.atlassian.com/bitbucket-cloud/docs/bitbucket-pipelines-configuration-reference/)
## Feature

- [BitBucket - Artifact](https://support.atlassian.com/bitbucket-cloud/docs/use-artifacts-in-steps/)
- [BitBucket - Pipe Integration](https://bitbucket.org/product/features/pipelines/integrations)
- [BitBucket - Variables and secrets](https://support.atlassian.com/bitbucket-cloud/docs/variables-and-secrets/)
- [BitBucket - Step options](https://support.atlassian.com/bitbucket-cloud/docs/step-options/)
- [BitBucket - Validator for bitbucket-pipelines.yml](https://bitbucket.org/product/pipelines/validator)
## Articles

- [Medium - The Last Bitbucket Pipelines Tutorial You’ll Ever Need: Mastering CI and CD](https://chrisfrewin.medium.com/the-last-bitbucket-pipelines-tutorial-youll-ever-need-mastering-ci-and-cd-28a027fc5e40)


# First Pipeline in BitBucket

>[!info]
>The first definition pipeline in BitBucket, It just focus deploy static web frontend to staging and production, including: Build and Deploy with SCP

Extension to use inside pipeline: [Pipe - SCP Deploy](https://bitbucket.org/product/features/pipelines/integrations?search=atlassian%2Fscp-deploy&p=atlassian/scp-deploy)
## Prerequisites

1. Enable 2FA of BitBucket, read more about this enable at [Enable two-step verification](https://support.atlassian.com/bitbucket-cloud/docs/enable-two-step-verification/)
2. Turn on pipelines feature in repository setting
3. Provision runner for BitBucket, read more about this one at [Adding a new runner in Bitbucket](https://support.atlassian.com/bitbucket-cloud/docs/adding-a-new-runner-in-bitbucket/)
4. To use SCP, you need to add SSH Key into bitbucket for managing and securing with transparent. In other one, you need to add SSH Key into host for permitting agent can connect. Make sure you fetch fingerprint of knowhost to validate connection, explore at issue [Bitbucket Pipeline Host key verification failed. (Centos)](https://community.atlassian.com/t5/Bitbucket-questions/Bitbucket-Pipeline-Host-key-verification-failed-Centos/qaq-p/1574263)

## Detailing Pipeline

```yaml
# The `pipelines` property is used to define the build process for a repository.
# Documentation: https://support.atlassian.com/bitbucket-cloud/docs/pipeline-start-conditions/
pipelines:
  # `default` pipeline runs on every push (excluding tag pushes) to the repository
  # NOTE: Run on any branch not set policies (Checkout branch will be affected)
  default:
    - step:
        name: Build and Upload Artifact
        image: node:20.18.0
        script:
          - npm install
          - npm run build
        artifacts:
          - dist/**
        runs-on:
          - self.hosted
          - linux

  # Run deploy only to staging branch
  branches:
    staging:
      - step:
          name: Build code to dist bundle
          image: node:20.18.0
          script:
            - npm install
            - npm run build
          artifacts:
            - dist/**
          runs-on:
            - self.hosted
            - linux
      - step:
          name: Deploy dist artifacts using SCP to Staging
          # Setting `deployment` help retrive variable depend on environment definition in deployment tab of repository setting
          # Documentation: https://support.atlassian.com/bitbucket-cloud/docs/step-options/#Deployment
          deployment: Staging
          script:
            - pipe: atlassian/scp-deploy:1.5.1
              variables:
                USER: "$USER"
                SERVER: "$LS_IP"
                REMOTE_PATH: "/var/www/html"
                LOCAL_PATH: "dist/*"
          runs-on:
            - self.hosted
            - linux

  # Run deploy only to main branch
    main:
      - step:
          name: Build code to dist bundle
          image: node:20.18.0
          script:
            - npm install
            - npm run build
          artifacts:
            - dist/**
          runs-on:
            - self.hosted
            - linux
      - step:
          name: Deploy dist artifacts using SCP to Production
          # Setting `deployment` help retrive variable depend on environment definition in deployment tab of repository setting
          # Documentation: https://support.atlassian.com/bitbucket-cloud/docs/step-options/#Deployment
          deployment: Production
          script:
            - pipe: atlassian/scp-deploy:1.5.1
              variables:
                USER: "$USER"
                SERVER: "$LS_IP"
                REMOTE_PATH: "/var/www/html"
                LOCAL_PATH: "dist/*"
          runs-on:
            - self.hosted
            - linux
```
