---
title: Azure Pipelines Gallery
tags:
  - cicd
  - automation
  - azure
  - basic-templates
---
>[!info]
>The Gallery of some `Azure DevOps` pipeline. Manual down below
>- [YAML schema reference for Azure Pipelines](https://learn.microsoft.com/en-us/azure/devops/pipelines/yaml-schema/?view=azure-pipelines)
>- [Predefine variables](https://learn.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml)
>- [Azure Pipelines task reference](https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/?view=azure-pipelines&viewFallbackFrom=azure-devops)
# Deploy React application to  Azure SWA

>[!summary]
>Pipelines will help you deploy and release react application to `swa` of Azure Cloud

First of all, you need to provide this `json` file for purpose set up `swa-cli` what use to provide configuration and deploy your application

```json title="swa-cli.config.json"
{
    "$schema": "https://aka.ms/azure/static-web-apps-cli/schema",
    "configurations": {
      "wiki": {
        "appLocation": ".",
        "outputLocation": "public",
        "appBuildCommand": "npm run build",
        "run": "npm run start",
        "appDevserverUrl": "http://localhost:8080",
        "env": "production"
      }
    }
}
```

```yaml title="azure-pipelines.yaml"
trigger: none
pool: $(PoolName)

stages:
  - stage: build_publish_artifacts
    displayName: Build and publish
    jobs:
      - job: setup_environment_and_publish_artifacts
        displayName: Setup environemnts, build and publish artifacts
        steps:
          - task: UseNode@1
            displayName: Setup Node
            inputs:
              version: '18.14'
          
          - script: |
              npm ci
              npx quartz build
            workingDirectory: "./src"
            displayName: Install dependencies and build

          - task: PublishBuildArtifacts@1
            inputs:
              ArtifactName: public
              PathtoPublish: "./src/public"

  - stage: deploy_to_swa
    displayName: Deploy Page
    jobs:
      - job: pull_and_deploy_web
        displayName: Deploy the web page
        steps:
          - task: DownloadBuildArtifacts@0
            inputs:
              artifactName: public
              downloadPath: "./src/"
            displayName: Download build artifacts

          - task: UseNode@1
            displayName: Setup Node
            inputs:
              version: '18.14'

          - script: |
              npm install -g @azure/static-web-apps-cli
              swa --version
              swa deploy --deployment-token=$(token_release)
            workingDirectory: $(System.DefaultWorkingDirectory)/src
            displayName: Install swa and deploy application
          
```

Just create a pipeline on `Azure DevOps` and trigger the pipeline by manually, and provide some require environment variables for pipeline, like `token_release` (Token of Azure SWA) and `PoolName` (Name of agent to perform pipeline)

![[Pasted image 20240507142757.png]]

Click `Run` to trigger pipeline, last state will announce your deployment completely with your web application domain


# Setup CI/CD for React Native

**Status: Not completely now 😢😢😢 . Waiting for next release**

>[!info]
>Setup CI for setup environment, build tools for test and build `APK` and `IPA` file for both `Android` and `IOS`. Let digest !!! 

```yaml title="react-native.yaml"
trigger: none

stages:
  - stage: setup_and_test
    displayName: Setup environment and test
    pool:
      vmImage: 'ubuntu-latest'
    jobs:
      - job: setup_and_test 
        displayName: Setup environment
        steps:
          - task: UseNode@1
            displayName: Setup Node
            inputs:
              version: '16.20'
          
          - script: |
              npm i -g yarn
              yarn install
            displayName: Install Package
            workingDirectory: "./app"

          - script: |
              yarn lint
            displayName: Syntax Check ESlint
            workingDirectory: "./app"

          - script: |
              yarn add -D jest-junit
              yarn test --ci --reporters=jest-junit --reporters=default
            displayName: Unit test jest
            workingDirectory: "./app"

          - task: PublishTestResults@2
            displayName: Publish Test Result
            inputs:
              testResultsFormat: 'JUnit'
              testResultsFiles: '**/junit.xml'
              searchFolder: "./app"
```
