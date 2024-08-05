---
title: Azure pipeline and Azure DevOps
tags:
  - admin
  - cloud-services
  - azure
  - azure-devops
  - automation
---
# About the Azure pipeline

*Documentation: [Doc](https://learn.microsoft.com/en-us/azure/devops/pipelines/?view=azure-devops)*

>[!info]
>Azure Pipelines automatically builds and tests code projects. It supports all major languages and project types and combines [continuous integration](https://learn.microsoft.com/en-us/azure/devops/pipelines/get-started/what-is-azure-pipelines?view=azure-devops#continuous-integration), [continuous delivery](https://learn.microsoft.com/en-us/azure/devops/pipelines/get-started/what-is-azure-pipelines?view=azure-devops#continuous-delivery), and [continuous testing](https://learn.microsoft.com/en-us/azure/devops/pipelines/get-started/what-is-azure-pipelines?view=azure-devops#continuous-testing) to build, test, and deliver your code to any destination.

![[Pasted image 20240729215134.png]]

# How can work with Azure Pipeline ?

## Create

![[Pasted image 20240729215152.png|center]]

On the Azure Pipeline, It offers for us some ways to implementation `pipelines` from multiple resources like

- `YAML` pipeline - This flexible way for manage pipeline **as code**
- Classic editor - Simple way to making pipeline in `Web UI`
## Customize

![[Pasted image 20240729215235.png]]

On the Infrastructure project, Azure Pipelines are implemented on `YAML`. If you want to custom them, you should learn

- Learn how to write `YAML` file
- Structure, syntax and workflow of Azure Pipeline. Read more: [Azure pipeline definition](https://learn.microsoft.com/en-us/azure/devops/pipelines/yaml-schema/pipeline?view=azure-pipelines)
- Use the integration tools on pipelines

For custom your pipeline, choose **edit** button on the pipeline, you will redirect to `YAML editor`. You can change the directly to `YAML`, and click **Save** with commit message to apply your change

![[Pasted image 20240729215301.png|center]]

On the editor, you can put a hard code `variables` for your pipeline, It means that `variables` always use on pipeline. Just click button `Variables`, create new variables and save.
## Run

After create a pipeline like expectation, save it and you can view and manage your pipelines by choosing **Pipelines** from the left-hand menu to go to the pipelines landing page.

![[Pasted image 20240729215324.png]]

To run the pipeline, select your new pipeline and click button `Run Pipeline`, It will ask you about Branch should be trigger, if you not set it on pipeline. Choose the `branch` and click button `Run`

![[Pasted image 20240729215330.png]]

View your run process, click to the new pipeline, choose **Stages and jobs** to look the result

![[Pasted image 20240729215337.png]]

## Set automation

Click on **Setting button**, choose **Triggers** for making schedule

![[Pasted image 20240729215356.png|center]]

Click **Add** button for create a new schedule

![[Pasted image 20240729215406.png|center]]

Choose the time-zone, day of weeks and source code branch for your schedule

![[Pasted image 20240729215422.png|center]]

>[!warning]
>On the first time, you need trigger pipeline and next pipeline will auto execution.

# Azure Pipeline features

## Agent

Pipeline is simply run the script and It need a machine for doing this stuff, Azure Pipelines provides several different types of agents.

| Agent type                                                                                                                                                                                    | Description                                                                                                   | Availability                               |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| [Microsoft-hosted agents](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/agents?view=azure-devops&tabs=yaml%2Cbrowser#microsoft-hosted-agents)                               | Agents hosted and managed by Microsoft                                                                        | Azure DevOps Services                      |
| [Self-hosted agents](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/agents?view=azure-devops&tabs=yaml%2Cbrowser#install)                                                    | Agents that you configure and manage, hosted on your VMs                                                      | Azure DevOps Services, Azure DevOps Server |
| [Azure Virtual Machine Scale Set agents](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/agents?view=azure-devops&tabs=yaml%2Cbrowser#azure-virtual-machine-scale-set-agents) | A form of self-hosted agents, using Azure Virtual Machine Scale Sets, that can be auto-scaled to meet demands | Azure DevOps Services                      |
>[!info]
><h3>Microsoft-hosted agents</h3>
>Pros: If your pipelines are in Azure Pipelines, then you've got a convenient option to run your jobs using a Microsoft-hosted agent. With Microsoft-hosted agents, maintenance and upgrades are taken care of for you
>
>Cons: Limitation time for free to use. Charge fee for extend running time
>
>[Learn more about Microsoft-hosted agents](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/hosted?view=azure-devops).

>[!info]
><h3>Self-hosted agents</h3>
>An agent that you set up and manage on your own to run jobs is a self-hosted agent. You can use self-hosted agents in Azure Pipelines or Azure DevOps Server, formerly named Team Foundation Server (TFS). Self-hosted agents give you more control to install dependent software needed for your builds and deployments. Also, machine-level caches and configuration persist from run to run, which can boost speed.
>
>[Learn more about Self-hosted agents](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/agents?view=azure-devops&tabs=yaml%2Cbrowser#self-hosted-agents)

>[!info]
><h3>Azure Virtual Machine Scale Set agents</h3>
>Azure Virtual Machine Scale Set agents are a form of self-hosted agents that can be auto-scaled to meet your demands. This elasticity reduces your need to run dedicated agents all the time. Unlike Microsoft-hosted agents, you have flexibility over the size and the image of machines on which agents run.
>
>You specify a Virtual Machine Scale Set, a number of agents to keep on standby, a maximum number of virtual machines in the scale set, and Azure Pipelines manages the scaling of your agents for you.
>
>For more information, see [Azure Virtual Machine Scale Set agents](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/scale-set-agents?view=azure-devops).

## Environment

### Overview

![[Pasted image 20240729215456.png]]

>[!info]
>An environment is a collection of resources that you can target with deployments from a pipeline. Typical examples of environment names are Dev, Test, QA, Staging, and Production. An Azure DevOps environment represents a logical target where your pipeline deploys software.

Azure DevOps environments aren't available in classic pipelines. For classic pipelines, [deployment groups](https://learn.microsoft.com/en-us/azure/devops/pipelines/release/deployment-groups/?view=azure-devops) offer similar functionality.

### Create an environment

1. Sign in to your organization: `https://dev.azure.com/{yourorganization}` and select your project.

2. Select **Pipelines** > **Environments** > **Create environment**.

	![[Pasted image 20240729215506.png]]

3. Enter information for the environment, and then select **Create**. Resources can be added to an existing environment later

	![[Pasted image 20240729215517.png|center]]

### Target an environment

Use the `jobs.deployment.environment` for set the value 

```yaml {8-9}
- stage: deploy
  jobs:
  - deployment: DeployWeb
    displayName: deploy Web App
    pool:
      vmImage: 'Ubuntu-latest'
    # creates an environment if it doesn't exist
    environment: 
      name: 'smarthotel-dev'
      resourceName: myVM
      resourceType: virtualMachine
    strategy:
      runOnce:
        deploy:
          steps:
          - script: echo Hello world
```

### Approvals

![[Pasted image 20240729215557.png]]

Manually control when a stage should run using approval checks. Use approval checks to control deployments to production environments. Checks are available to the resource Owner to control when a stage in a pipeline consumes a resource. As the owner of a resource, such as an environment, you can [define approvals and checks](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops) that must be satisfied before a stage consuming that resource starts.

The Creator, Administrator, and user roles can manage approvals and checks. The Reader role can't manage approvals and checks.

### Security

Check about security in [Azure Pipeline Environment Security](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/environments?view=azure-devops#security)

>[!info]
>You can control who can create, view, use, and manage environments with user permissions. There are four roles: Creator with a scope of all environments, Reader, User, and Administrator.

![[Pasted image 20240729215649.png]]

## Library

>[!info]
>A library is a collection of build and release assets for an Azure DevOps project. Assets defined in a library can be used in multiple build and release pipelines of the project. The Library tab can be accessed directly in Azure Pipelines.
>
>The library contains two types of assets: [variable groups](https://learn.microsoft.com/en-us/azure/devops/pipelines/library/variable-groups?view=azure-devops) and [secure files](https://learn.microsoft.com/en-us/azure/devops/pipelines/library/secure-files?view=azure-devops).

![[Pasted image 20240729215726.png]]

If you want to explore more about how to write and structure `yaml` of Azure Pipelines, you can check at

- [[Azure Pipelines]]
- [[Fastway to deploy your application]]