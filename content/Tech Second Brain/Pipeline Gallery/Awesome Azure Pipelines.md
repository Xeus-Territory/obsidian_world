---
title: Awesome Azure Pipelines
tags:
  - cicd
  - automation
  - azure
  - basic-templates
---

# Introduce Azure Pipelines

>[!Summary]
>The Gallery of Azure DevOps pipelines, where I share experience about some approaching automation in this platform.

![[Pasted image 20240729215324.png]]
## Documentation

- [Azure - What is Azure Pipelines?](https://learn.microsoft.com/en-us/azure/devops/pipelines/get-started/what-is-azure-pipelines?view=azure-devops)
- [Azure - Azure Pipelines documentation](https://learn.microsoft.com/en-us/azure/devops/pipelines/?view=azure-devops)
- [Azure - YAML schema reference for Azure Pipelines](https://learn.microsoft.com/en-us/azure/devops/pipelines/yaml-schema/?view=azure-pipelines)
## Feature

- [Azure - Predefine variables](https://learn.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml)
- [Azure - Azure Pipelines task reference](https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/?view=azure-pipelines&viewFallbackFrom=azure-devops)
- [Azure - Specify conditions](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/conditions?view=azure-devops&tabs=yaml%2Cstages) - **(NOTE : Vice versa `eq`, you can use `ne` but reference little bit on documentation)**
- [Azure - Expressions](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/expressions?view=azure-devops)
- [Azure - Create and target an environment](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/environments?view=azure-devops)
- [Azure - Template usage reference](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/templates?view=azure-devops&pivots=templates-includes)
- [Azure - Publish and download pipeline artifacts](https://learn.microsoft.com/en-us/azure/devops/pipelines/artifacts/pipeline-artifacts?view=azure-devops&tabs=yaml)
# Deploy React application to  Azure SWA

>[!summary]
>Pipelines will help you deploy and release react application to `swa` of Azure Cloud
>
>Plugins:
>- [UseNode@1](https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/use-node-v1?view=azure-pipelines)
>- [PublishBuildArtifacts@1](https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/publish-build-artifacts-v1?view=azure-pipelines)
>- [DownloadBuildArtifacts@0](https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/download-build-artifacts-v0?view=azure-pipelines)
>  
>  Tools:
>  - [swa-cli](https://azure.github.io/static-web-apps-cli/)

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

![[Pasted image 20240507142757.png|center]]

Click `Run` to trigger pipeline, last state will announce your deployment completely with your web application domain

# Setup CI/CD for React Native

Read more about React Native build with fastlane on CI/CD at [[Build mobile with fastlane (Part 1)#Define `fastlane` android project configuration|Build mobile with fastlane]]

>[!warning]
>**Status ⌛: Not completely, continuous integrate next step build android 😢 😢 😢** 

>[!info]
>Setup CI for setup environment, build tools for test and build `APK` and `IPA` file for both `Android` and `IOS`. Let digest !!! 
>
>Plugins:
>- [UseNode@1](https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/use-node-v1?view=azure-pipelines)
>- [PublishTestResults@2 ](https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/publish-test-results-v2?view=azure-pipelines&tabs=trx%2Ctrxattachments%2Cyaml)
>
>Tools:
>- [jest-junit](https://www.npmjs.com/package/jest-junit)
>- [jest](https://jestjs.io/docs/getting-started)

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
              version: '18.20'
          
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

  - stage: build_android
    displayName: Build Android Applications
    jobs:
      - job: build_android
        displayName: Build Android Jobs
        steps:
          - task: UseNode@1
            displayName: Setup Node Environment
            inputs:
              version: "18.20"
          
          - script: |
              npm i -g yarn
              yarn install
            displayName: Install node package for project

          - script: |
              cd ./android || exit 1
              fastlane build
            displayName: Build the APK for Android Project
          
          - task: PublishBuildArtifacts@1
            displayName: Publish APK file to Repository
            inputs:
              ArtifactName: APK Package
              PathtoPublish: ./android/app/build/outputs/apk/release
```

## Troubleshoot

>[!warning]
>When you set up the azure-agent for running job, remember set `.env` variables for specify agent because it will not read Linux `$PROFILE`, just read only environment in `runsvc.sh`. Read more at: [StackOverFlow - ANDROID_HOME not set (VSTS agent running as service on OS X)](https://stackoverflow.com/questions/37890362/android-home-not-set-vsts-agent-running-as-service-on-os-x)

# Setup CICD for Building Container Applications

>[!summary]
>You can use this pipeline for deploy application [Azure Container Application](https://learn.microsoft.com/en-us/azure/container-apps/overview) with self-hosted VM via `systemassign` identity
>
>Plugins:
>- [UseDotNet@2](https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/use-dotnet-v2?view=azure-pipelines) **(NOTE: For .NET Core application, change for whatever you want)**
>- [DotNetCoreCLI@2](https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/dotnet-core-cli-v2?view=azure-pipelines)
>- [PublishBuildArtifacts@1](https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/publish-build-artifacts-v1?view=azure-pipelines)
>- [Docker@2](https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/docker-v2?view=azure-pipelines&tabs=yaml)
>
>Tools (Require install to VM)
>- [[Awesome Docker CLI#Installing|Docker Installing]]
>- [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)
>- [Azure VM Authentication](https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/qs-configure-portal-windows-vm)
>- [VM authentication with Service Principle](https://learn.microsoft.com/en-us/azure/developer/java/sdk/identity-service-principal-auth)
>- [Authenticate to Azure using Azure CLI](https://learn.microsoft.com/en-us/cli/azure/authenticate-azure-cli)
>- [Create Service Principle](https://learn.microsoft.com/en-us/entra/identity-platform/howto-create-service-principal-portal)

```bash
# Non trigger automation trigger, but base on policy
trigger: none

# Trigger when open PR to main
pr:
  branches:
    include:
      - main

pool:
  vmImage: 'ubuntu-latest'

stages:
  - stage: test_and_build
    displayName: Test and Build Applications
    condition: ne(variables['Build.SourceBranchName'], 'main')
    variables:
      buildConfiguration: 'Release'
    jobs:
      - job: test_and_build
        displayName: Test and Build Applications
        steps:
          - task: UseDotNet@2
            displayName: 'Install .NET Core SDK'
            inputs:
              version: 8.0.300

          - task: DotNetCoreCLI@2
            displayName: 'Restore Dependencies'
            inputs:
              command: 'restore'
			  projects: '**/*.csproj'

          - task: DotNetCoreCLI@2
            displayName: "Build Project"
            inputs:
              command: 'build'
              arguments: '-c $buildConfiguration -o ./build'
              modifyOutputPath: true
              workingDirectory: './src'

          - task: DotNetCoreCLI@2
            displayName: "Published Project"
            inputs:
              command: 'publish'
              arguments: '-c $buildConfiguration -o ./publish'
              zipAfterPublish: false
              workingDirectory: './src'

          - task: PublishBuildArtifacts@1
            displayName: 'Published Artifact'
            inputs:
              PathtoPublish: './src/publish'
              ArtifactName: public-artifact  - stage: build_image

  - stage: build_image
    displayName: Build Docker Image
    # Run when merge code into main
    condition: eq(variables['build.sourceBranch'], 'refs/heads/main')
    jobs:
      - job: build_image
        displayName: Build Docker Image and Push to registry
        steps:
          - task: Docker@2
            displayName: Login to ACR
            inputs:
              command: login
              # Manage service connections
              # Documentation: https://learn.microsoft.com/en-us/azure/devops/pipelines/library/service-endpoints?view=azure-devops&tabs=yaml
              containerRegistry: "Dockerserviceconnection"

          - task: Docker@2
            displayName: Build and Push Image
            inputs:
              command: buildAndPush
              Dockerfile: ./src/Dockerfile
              repository: app-dev
              buildContext: ./src/
              tags: |
                latest
                $(Build.SourceVersion)

  - stage: deploy
    displayName: Deploy Applications
    dependsOn: build_image
    condition: and(succeeded('build_image'), eq(variables['build.sourceBranch'], 'refs/heads/main'))
    jobs:
      - deployment: deploy
	    # Set rule to permit running this job or pending
	    # Documentation: https://learn.microsoft.com/en-us/azure/devops/pipelines/process/environments?view=azure-devops
        environment: $(environmentDeployment)
        strategy:
          runOnce:
            deploy:
              steps:
              - script: |
                  az login --identity
                  az containerapp update --name mindfull-app-$(environmentDeployment) \
                    --resource-group rg-$(environmentDeployment) \
                    --image example.azurecr.io/app-$(environmentDeployment):$(Build.SourceVersion) \
                    --set-env-vars "ASPNETCORE_ENVIRONMENT=$(environmentApplication)" \
                    "ConnectionStrings__Default=secretref:ConnectionStrings"
                displayName: Deploy Applications to Container App
```

>[!note]
>Policy on auto trigger, just work with `main` branch. So if you work with another branch, like `production`,`develop`, ... Thus we need, change `trigger` value to your specify branch. Issue: [StackOverFlow - Using CI triggers and PR build validation together: Prevent that build runs twice](https://stackoverflow.com/questions/61737516/using-ci-triggers-and-pr-build-validation-together-prevent-that-build-runs-twic)

```yaml {5-8,10-13}
# Just work with main, if you push the pr
trigger: none

# If you want to use both pr and trigger (For another branch)
trigger:
  branches:
    include:
      - develop

pr:
  branches:
    include:
      - develop
```
## Optional

To help PR event occur trigger CI automation, you need to configure  `Policy` for branch, for example

![[Pasted image 20240524160443.png]]

You want trigger for `main` branch, so you need choose `Branch polices` option, It will bring you to another page for setup `policy`

![[Pasted image 20240524160939.png]]

On the `Build Validation`, you can choose `+` button for adding build validation with trigger automation your pipeline

![[Pasted image 20240524161037.png|center]]

For example, I have `react-native` pipeline, It will automation trigger this one when I create PR. 
- You can choose **Manual** for instead but if you want, 
- Others optional, you can clarify **Required** or **Optional** to accept build `failed` pipeline, that cause block
- Choose the Build expiration to set time line of Build events to validate

![[Pasted image 20240524161635.png]]

When trigger, your pipeline will set `PR automated for` instead of `Individual CI`

## Troubleshoot

>[!warning]
>When you use `succeeded()` expression, remember import name branch you need to check on on the single quote bracket like `succeeded('build')`, it mean this task will read-only the status state of `build` stage, if not it will read all values of **stage** or **job** in pipeline, and make a decision

# Retrieve the artifact cross pipelines

>[!summary]
>When you wanna apply the methodology to retrieve the artifact cross pipelines in same project, It will help you doing multiple things kinda like **up-down pipeline**, depend on, more
>
>Plugins:
>1. [PublishBuildArtifacts@1](https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/publish-build-artifacts-v1?view=azure-pipelines)
>2. [DownloadPipelineArtifact@2](https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/download-pipeline-artifact-v2?view=azure-pipelines)

You can use `publish` plugin to upload your file into artifact of Azure Pipeline

```yaml title="artifact-hub/azure-pipelines.yml"
pool:
  vmImage: 'ubuntu-latest'
 
stages:
  - stage: build_publish_artifacts
    displayName: Build and publish
    jobs:
      - job: publish_artifacts
        displayName: publish artifacts
        steps:
	      # Write text into the file
          - script: |
              echo "artifact-123" > artifact.txt
            displayName: Publish artifact

		  # Upload that file into artifact in azure pipelines
          - task: PublishBuildArtifacts@1
            inputs:
              ArtifactName: public
              PathtoPublish: "artifact.txt"
```

After that in other repository inside project, you can easily retrieve that artifact from your pipeline

```yaml title="retrieve-artifact/azure-pipelines.yml"
pool:
  vmImage: "ubuntu-latest"

stages:
  - stage: download_publish_artifacts
    displayName: download artifact
    jobs:
      - job: download_artifact
        displayName: download artifacts
        steps:
	      # Download artifact from another repo inside same project
          - task: DownloadPipelineArtifact@2
            inputs:
              # Set build type
              buildType: "specific"
              # Project name
              project: "artifact-hub"
              # Pipeline id where run publish
              definition: "3"
              # Download from main artifact
              buildVersionToDownload: "latest"
              # Specific artifact name published
              artifactName: "public"
              # Output Path
              targetPath: "$(Pipeline.Workspace)"

		  # Get the content inside the artifact
          - script: |
              cat $(Pipeline.Workspace)/artifact.txt
            displayName: Display artifact.txt
```

![[Pasted image 20241224101518.png]]

>[!info]
>This implement already work with multiple repositories inside one project. If you wanna apply with cross project, you should be considered before applying

Related articles and implementation, Explore more at

- [Azure - Publish and download pipeline artifacts](https://learn.microsoft.com/en-us/azure/devops/pipelines/artifacts/pipeline-artifacts?view=azure-devops&tabs=yaml)
- [Azure - Publish and download build artifacts](https://learn.microsoft.com/en-us/azure/devops/pipelines/artifacts/build-artifacts?view=azure-devops&tabs=yaml)
- [Youtube - Azure Pipelines Download Latest Successful Artifact From Another Pipeline Automatically](https://www.youtube.com/watch?v=KrVImq0Rdw8&ab_channel=DataEngineeringWithNick)
- [StackOverFlow - Azure Artifacts - Sharing project-scoped feeds with other projects](https://stackoverflow.com/questions/64821831/azure-artifacts-sharing-project-scoped-feeds-with-other-projects)
# Error and Troubleshoot

## The SSL connection could not be established, and No usable version of libssl was found

With the sentence `No usable version of libssl was found`, usually meet on Ubuntu 22.04, you can fix by install `openssl`

Ubuntu: [Ubuntu Package](http://security.ubuntu.com/ubuntu/)
Issue: [Github](https://github.com/microsoft/azure-pipelines-agent/issues/3599)

```bash
wget -c http://security.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.0g-2ubuntu4_amd64.deb

sudo dpkg -i libssl1.1_1.1.0g-2ubuntu4_amd64.deb
```

After that, you can run `./config.sh`, but next sentence will problems `The SSL connection could not be established`. You can resolve that one with `ENV AZP` variables

First export to environment variable `AZP_AGENT_USE_LEGACY_HTTP` and run `./config.sh`

```bash
export AZP_AGENT_USE_LEGACY_HTTP=true

./config.sh
```

After that, you need set to environment to agent to bypass the SSL issue in `runsvc.sh` file

```bash title="runsvc.sh"
#!/bin/bash

# convert SIGTERM signal to SIGINT
# for more info on how to propagate SIGTERM to a child process see: http://veithen.github.io/2014/11/16/sigterm-propagation.html
trap 'kill -INT $PID' TERM INT

if [ -f ".path" ]; then
    # configure
    export PATH=`cat .path`
    echo ".path=${PATH}"
fi

# insert anything to setup env when running as a service
export AZP_AGENT_USE_LEGACY_HTTP=true

# run the host process which keep the listener alive
./externals/node10/bin/node ./bin/AgentService.js &
PID=$!
wait $PID
trap - TERM INT
wait $PID
```

And that all, trigger `svc.sh` file to setup and connect the agent to pool

```bash
sudo ./svc.sh install
sudo ./svc.sh start
```