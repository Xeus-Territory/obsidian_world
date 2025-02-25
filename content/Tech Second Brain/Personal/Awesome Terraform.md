---
title: The awesome of Terraform
tags:
  - devops
  - terraform
  - helpful
  - whatis
---

>[!quote]
>Hi @all, Turn back to work in provisioning Infrastructure. You know about Infrastructure as Code is truly insane, in currently situation, DevOps must be known about once of tools for doing stuff, with me, I totally repeat time to time about Terraform. But todays, I will expose what actual think when I try to work Terraform in daily. Let's digest

![[terraform.png]]

>[!info]
><h2>What is Terraform?</h2>
>
>[Terraform](https://developer.hashicorp.com/terraform/intro) is an infrastructure as code tool that lets you build, change, and version infrastructure safely and efficiently. This includes low-level components like compute instances, storage, and networking; and high-level components like DNS entries and SaaS features.

# TL;DR

>[!done]
>On this topic, you can understand about IaC and Terraform with
>
>- Install and setup Terraform for your environment
>- What does Terraform do for your infrastructure ?
>- Powerful of Terraform
>- Structure of Terraform
>- How can you perform provision with Terraform on your machine or pipeline ?
>- Update your AKS version with Terraform
>- Use Terraform Docs for generating documentation resources

## Articles

- [Spacelift - Importing Existing Infrastructure Into Terraform – Step by Step](https://spacelift.io/blog/importing-exisiting-infrastructure-into-terraform)
- [Medium - Use SOPS and Terraform to create encrypt/decrypt files with AWS KMS](https://medium.com/@arunmrp90/use-sops-and-terraform-to-create-encrypted-decrypt-files-with-aws-kms-a38ac793518b)
- [Zeet - 9 Powerful Atlantis Alternatives to Enhance Terraform Efficiency](https://zeet.co/blog/atlantis-alternatives)
- [Zeet - 28 Most Powerful Terraform Tools (2024)](https://zeet.co/blog/terraform-tools)
- [Medium - Top Terraform Tools to Know in 2024](https://medium.com/env0/top-terraform-tools-to-know-in-2024-a00a232bb936)
- [Infracloud - 5 Tools to Auto-Generate Terraform Configuration Files](https://www.infracloud.io/blogs/auto-generate-terraform-configuration-files/)
## Blogs

- [Terraform Weekly](https://www.weekly.tf/) - A weekly newsletter about Terraform ecosystem (posts, tools, tips&tricks, open-source) with humble opinions by Anton Babenko.
## Repositories

- [awesome-tf](https://github.com/shuaibiyy/awesome-tf): Curated list of resources on HashiCorp's Terraform and OpenTofu
## Pages

- [Terraform Best Practices](https://www.terraform-best-practices.com/): An attempt to systematically describe best practices using Terraform and provide recommendations for the most frequent problems Terraform users experience
- [Terraform Documentation](https://developer.hashicorp.com/terraform/docs): An infrastructure as code tool that lets you build, change, and version infrastructure safely and efficiently
- [Terraform Registry](https://registry.terraform.io/): Terraform providers that power all of Terraform’s resource types, or find modules for quickly deploying common infrastructure configurations.
## Tools

- [atlantis](https://www.runatlantis.io/): Running Terraform Workflows with Ease
- [inframap](https://github.com/cycloidio/inframap): Read your tfstate or HCL to generate a graph specific for each provider, showing only the resources that are most important/relevant.
- [terraform-docs](https://terraform-docs.io/user-guide/introduction/) : A utility to generate documentation from Terraform modules in various output formats.
- [terraformer](https://github.com/GoogleCloudPlatform/terraformer): CLI tool to generate terraform files from existing infrastructure (reverse Terraform). Infrastructure to Code

# Install and setup environment for Terraform

>[!info]
><h2>How does Terraform work?</h2>
>The core Terraform workflow consists of three stages:
>
>- Write: You define resources, which may be across multiple cloud providers and services. For example, you might create a configuration to deploy an application on virtual machines in a Virtual Private Cloud (VPC) network with security groups and a load balancer.
>- Plan: Terraform creates an execution plan describing the infrastructure it will create, update, or destroy based on the existing infrastructure and your configuration.
>- Apply: On approval, Terraform performs the proposed operations in the correct order, respecting any resource dependencies. For example, if you update the properties of a VPC and change the number of virtual machines in that VPC, Terraform will recreate the VPC before scaling the virtual machines.

![[terraform-workflow.png]]

To installing `Terraform`, just need binary for setting whole thing. Explore more with [installing guide](https://developer.hashicorp.com/terraform/install), for example

```bash title="Ubuntu/Debian"
wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform
```

>[!note]
>If you use Windows OS, please access the documentation to knowing more information: [Terrafrom - Windows Version](https://developer.hashicorp.com/terraform/install#windows)

Validate and check version of `Terraform`

```bash
$ terraform --version
Terraform v1.6.2
on linux_amd64

Your version of Terraform is out of date! The latest version
is 1.7.5. You can update by downloading from https://www.terraform.io/downloads.html
```

# What does Terraform do ?

>[!info]
>Terraform is submit role for my daily work, including
>- Manage any infrastructure
>- Track your infrastructure
>- Automate changes
>- Standardize configurations
>- Collaborate

![[terraform-components.png]]
<div align="center">
	<p style="text-align: center;">Source: DevOps Mojo</p>
</div>

>[!info]
>All of process when apply **Infrastructure as Code** with `Terraform` from `init` --> `apply` will store in `json` file called `*.tfstate`.
> 
>The **state file** contains full details of resources in our terraform code. When you modify something on your code and apply it on cloud, terraform will look into the **state file**, and compare the changes made in the code from that state file and the changes to the infrastructure based on the state file.

> [!question]
>`*.tfstate` file have important role on infrastructure life cycle, therefore, keep it safety will become priority. **Hashicorp** has offered for us about feature which can store the file
>- Remote State
>- Delegation and Teamwork
>- Locking and Teamwork
>
>More detail about: https://developer.hashicorp.com/terraform/language/state/remote
# Powerful of Terraform

## Providers

![[terraform-providers.png]]

>[!info]
>With `Terraform`, you can have a huge community with tons of providers opensource, cloud, SaaS.
>
>Platforms Terraform about their providers in  [Terraform Registry](https://registry.terraform.io/)

## Documentation

![[terraform-docs.png]]

- Support `terraform-docs` which generate documentation in multiple type like `markdown json xml`. Try this at [terraform-docs-user-guide](https://terraform-docs.io/user-guide/introduction/)
-  Those *providers documentation* is very powerful, clear and positive for getting started. Checkout what my configuration with `terraform-docs` at [[Awesome Configuration CheatSheet#terraform-docs|Configuration CheatSheet > terraform-docs]]
## Integration

![[terraform-integrate.png]]

- Can integrate with multiple platform and plugin like `Code Scanning, CI/CD, Observability/Monitoring, Security, Audit`, ...
- Tons of opensource can help you work with Terraform, It make this to standard for Infrastructure as Code
# Structure Terraform as Code

*Related articles*

- [The Right way to structure Terraform Project!](https://ibatulanand.medium.com/the-right-way-to-structure-terraform-project-89a52d67e510)
- [Terraform Files – How to Structure a Terraform Project](https://spacelift.io/blog/terraform-files)

## Pros of structure your Terraform

*Base on: [10 Essential Aspects of a Terraform Project](https://ibatulanand.medium.com/the-right-way-to-structure-terraform-project-89a52d67e510#:~:text=10%20Essential%20Aspects%20of%20a%20Terraform%20Project)*

1. **Project Structure:** Maintain a standardized format for files and directories across all projects, ensuring consistency in organization.
2. **Modularization:** Utilize modules to enhance code abstraction and increase code reusability.
3. **Naming Conventions:** Implement naming conventions for configuration objects, such as variables, modules, and files, to ensure uniformity in resource names.
4. **Code Formatting and Style:** Employ consistent coding practices to keep your code clean, easy to read, understand, and maintain.
5. **Variables Declaration and Assignment:** Avoid hard-coding values to ensure code reusability and organization, especially for future modifications.
6. **Module Outputs:** Effectively integrate modules and the resources contained within them.
7. **Data Sources:** Leverage data sources to access resources defined outside of the Terraform project.
8. **Remote State Management:** Facilitate collaboration within teams and safeguard the state file from accidental deletion.
9. **Project Blast Radius:** Maintain an optimal project size, grouping related resources together while striking a balance between coupling and cohesion.
10. **Version Control:** Implement code version control to efficiently manage different versions of the code, facilitating collaboration and code sharing within teams.

## Structuring Terraform Project

But general purpose, we need to manage huge system with multiple environments. `Terraform` offer for us about **separating main components** into **modules** and **import** them for specify environments. Those one could be

```bash
    projectname/
    |
    |-- environment/
    |   |
    |   |-- prod/
    |   |   |
    |   |   |-- region1/
    |   |   |   |
    |   |   |   |-- provider.tf
    |   |   |   |-- version.tf
    |   |   |   |-- backend.tf
    |   |   |   |-- main.tf
    |   |   |   |-- variables.tf
    |   |   |   |-- terraform.tfvars
    |   |   |   |-- outputs.tf
    |   |   |
    |   |   |-- region2/
    |   |   |   |
    |   |   |   |-- ...
    |   |
    |   |-- dev/
    |   |   |
    |   |   |-- ...
    |   |
    |   |-- stage/
    |       |
    |       |-- ...
    |
    |-- modules/
    |   |
    |   |-- network/
    |   |   |
    |   |   |-- provider.tf
    |   |   |-- network.tf
    |   |   |-- loadbalancer.tf
    |   |   |-- variables.tf
    |   |   |-- variables-local.tf
    |   |   |-- outputs.tf
    |   |   |-- README.md
    |   |   |-- examples/
    |   |   |-- docs/
    |   |
    |   |-- vm/
    |       |
    |       |-- ...
    |
    |-- ...
```

## Understanding Terraform structure

>[!info]
>Reference above, Terraform structure will separate to 2 part
>- **Main directory**: Where we execute the Terraform commands and the code execution and deployment start
>- **Modules Directory**: Modules represent a fundamental aspect of Terraform that empowers the creation of reusable infrastructure deployment code.

### Main Directory

Main Directory is managed base on `ENV`, which mean we use same structure for multiple `ENV` but changing parameters and configuration

- `provider.tf`: Specifies the cloud or SaaS providers utilized.
- `main.tf`: Serves as the central Terraform file from which modules are invoked.
- `variables.tf`: Contains variable declarations.
- `outputs.tf`: Includes output value definitions.
- `terraform.tfvars`: Stores variable definitions and assignments.

>[!notice]
>In some case, `terraform.tfvars` is not using, instead of we use another way to serve Terraform variables in pipeline, that one is  `environment variables` named `TF_VAR`. Explore more: [Terraform - Environment Variables](https://developer.hashicorp.com/terraform/cli/config/environment-variables)

For example:

```bash
export TF_VAR_region=us-west-1
export TF_VAR_ami=ami-049d8641
export TF_VAR_alist='[1,2,3]'
export TF_VAR_amap='{ foo = "bar", baz = "qux" }'
```

### Modules Directory

Modules Directory, same as main directory but more particular like

```bash
|   |-- network/
|   |   |
|   |   |-- provider.tf
|   |   |-- network.tf
|   |   |-- loadbalancer.tf
|   |   |-- variables.tf
|   |   |-- outputs.tf
```

- `provider.tf`: Specifies the provider employed for resources within the module.
- `network.tf` or `loadbalancer.tf`: Specifies multiple things belongs to a module
- `variables.tf`: Contains declarations for module-specific variables.
- `outputs.tf`: Comprises definitions for output values.

### Connect Main with module directory

Module directory will be defined in Main module like

```bash title="main.tf"
module "elasticsearch" {
  source = "../../modules/elasticsearch"

  es_version     = var.elasticsearch_version
  node_count     = var.elasticsearch_node_count
  memory_request = var.elasticsearch_memory_request
  memory_limit   = var.elasticsearch_memory_limit
  cpu_request    = var.elasticsearch_cpu_request
  cpu_limit      = var.elasticsearch_cpu_limit
  storage_size   = var.elasticsearch_storage_size
  remote_state   = data.terraform_remote_state.azure.outputs
  depends_on = [
    module.common_resources
  ]
}
```

Example represent the import of `elasticsearch` in module in main directory, it means when we apply `main.tf`, `elasticsearch` can be created.

For preventing error when import your module, concern about

- Set all of variables which be used by module, for example: using `var.*` to get variables with defining in `variables.tf` of module
- Set `depends_on` for purpose sequentially provisioning your service, It means, on some situation, another modules should be created first and that one would be used like conditional for creating your modules

# Run the Terraform for provisioning your system

>[!info]
>In term of mine, Terraform will manage two part, like
>- Azure: Use to create and manage Azure Cloud Service
>- K8s: Use to create and manage services in Kubernetes

## Azure

Providers: Using `azurerm` for provisioning all cloud service, `*.tfstate` will store in `remote state` hosted by **Blob - Azure Storage Account**

```bash title="providers.tf"
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.85.0"
    }
	}
}

provider "azurerm" {
  features {}
}

terraform {
  backend "azurerm" {
    resource_group_name  = "xxxx"
    storage_account_name = "xxxx"
    container_name       = "xxxx"
    key                  = "xxxx"
    subscription_id      = "xxxx"
  }
}
```

Module is provisioned by `azurerm` like

- Resource group
- Vault
- AKS
- MSSQL
- PostgreSQL
- Storage Account, Azure Container, Azure File, ...

## Kubernetes

Providers: With K8s, we will use multiple provider for working with cluster

- `azurerm`: To get credentials of cluster (**Important !!!**)
- `helm`: To use `helm-release` for releasing helm chart into K8s
- `kubectl`: To apply manifest workload, network, storage into K8s
- `grafana`: To create alert for K8s system

```bash title="providers.tf"
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.85.0"
    }
    kubernetes = {
      source  = "hashicorp/helm"
      version = "2.12.1"
      source  = "hashicorp/kubernetes"
      version = ">= 2.10.0"
    }
    kubectl = {
      source  = "gavinbunney/kubectl"
      version = "=1.14.0"
    }
    grafana = {
      source  = "grafana/grafana"
      version = "=2.9.0"
    }
  }
}

provider "azurerm" {
  features {}
}

terraform {
  backend "azurerm" {
    resource_group_name  = "xxxx"
    storage_account_name = "xxxx"
    container_name       = "xxxx"
    key                  = "xxxx"
    subscription_id      = "xxxx"
  }
}
data "azurerm_kubernetes_cluster" "k8s" {
  name                = var.cluster_name
  resource_group_name = var.resource_group_name
}

provider "kubernetes" {
  host                   = data.azurerm_kubernetes_cluster.k8s.kube_config.0.host
  client_certificate     = base64decode(data.azurerm_kubernetes_cluster.k8s.kube_config.0.client_certificate)
  client_key             = base64decode(data.azurerm_kubernetes_cluster.k8s.kube_config.0.client_key)
  cluster_ca_certificate = base64decode(data.azurerm_kubernetes_cluster.k8s.kube_config.0.cluster_ca_certificate)
}

provider "helm" {
  kubernetes {
    host                   = data.azurerm_kubernetes_cluster.k8s.kube_config.0.host
    client_certificate     = base64decode(data.azurerm_kubernetes_cluster.k8s.kube_config.0.client_certificate)
    client_key             = base64decode(data.azurerm_kubernetes_cluster.k8s.kube_config.0.client_key)
    cluster_ca_certificate = base64decode(data.azurerm_kubernetes_cluster.k8s.kube_config.0.cluster_ca_certificate)
  }
}

provider "kubectl" {
  host                   = data.azurerm_kubernetes_cluster.k8s.kube_config.0.host
  client_certificate     = base64decode(data.azurerm_kubernetes_cluster.k8s.kube_config.0.client_certificate)
  client_key             = base64decode(data.azurerm_kubernetes_cluster.k8s.kube_config.0.client_key)
  cluster_ca_certificate = base64decode(data.azurerm_kubernetes_cluster.k8s.kube_config.0.cluster_ca_certificate)
  load_config_file       = false
}

provider "grafana" {
  url  = "https://monitoring.example.xyz"
  auth = var.grafana_auth
}

```

Module is provisioned on `kubernetes`, include

- WordPress Website: MySQL and WordPress
- Common resources: PVC, Secrets, Storage Class
- Elasticsearch
- Ingress Nginx
- Prometheus + Grafana
- Loki + Promtail
- MongoDB
- RabbitMQ
- Tempo
- Redis

## Running Terraform with Terminal

For running this provisioning process, you need do step by step

1. Create and validate module variables in main `variables.tf` file, for example: Set default or get from environments
2. Change directory to main module with specify environment, run `terraform init` for prepare working directory --> `xxxx.tfstate` will create on **remote state**
3. Run `terraform plan` for take a look what resource is create or change before apply
4. Make sure control resources which create, destroy or change, run `terraform apply` for applying new infrastructure

## Running Terraform with Azure Pipeline (Automation)

![[icon-azure-pipelines.png]]

There is a lot of ways to automating your Terraform Workflow, and integrate Terraform into CI/CD tools such as Azure Pipelines, GitHub Actions or GitLab CI that legit useful

```yaml title="terraform-plan-apply.yaml"
name: $(BuildDefinitionName)_$(date:yyyyMMdd)$(rev:.r)
trigger: none
pool: $(PoolName)
 
stages:  
  - stage: terraform_plan
    jobs:
    - job: "terraform_plan"
      steps:
      - task: TerraformInstaller@0
        displayName: install terraform
        inputs:
          terraformVersion: '1.6.6'

      - task: ms-devlabs.custom-terraform-tasks.custom-terraform-release-task.TerraformTaskV3@3
        displayName: 'Terraform : init'
        inputs:
          workingDirectory: $(WorkingDirectory)
          backendServiceArm: $(ServiceConnectionName)
          backendAzureRmResourceGroupName: $(BackendAzureRmResourceGroupName)
          backendAzureRmStorageAccountName: $(BackendAzureRmStorageAccountName)
          backendAzureRmContainerName: $(BackendAzureRmContainerName)
          backendAzureRmKey: $(BackendAzureRmKey)

      - task: ms-devlabs.custom-terraform-tasks.custom-terraform-release-task.TerraformTaskV3@3
        displayName: 'Terraform : plan'
        inputs:
          command: plan
          workingDirectory: $(WorkingDirectory)
          commandOptions: '-out=plan.tfplan -input=false'
          environmentServiceNameAzureRM: $(ServiceConnectionName)
              
      - task: PublishBuildArtifacts@1
        displayName: 'Publish Artifact: plan'
        inputs:
          PathtoPublish: $(BaseDirectory)
          ArtifactName: plan
      - task: DeleteFiles@1
        displayName: 'Remove unneeded files'
        inputs:
          contents: |
            .terraform
            plan.tfplan

  - stage: terraform_apply
    dependsOn: [terraform_plan]
    condition: succeeded('terraform_plan')
    jobs:
    - deployment: terraform_apply
      pool: $(PoolName)
      # creates an environment if it doesn't exist
      environment: $(EnvironmentName)
      strategy:
        runOnce:
          deploy:
            steps:
            - checkout: none
            - task: TerraformInstaller@0
              displayName: install terraform
              inputs:
                terraformVersion: '1.6.6'

            - task: ms-devlabs.custom-terraform-tasks.custom-terraform-release-task.TerraformTaskV3@3
              displayName: 'Terraform : init'
              inputs:
                workingDirectory: $(WorkingDirectory)
                backendServiceArm: $(ServiceConnectionName)
                backendAzureRmResourceGroupName: $(BackendAzureRmResourceGroupName)
                backendAzureRmStorageAccountName: $(BackendAzureRmStorageAccountName)
                backendAzureRmContainerName: $(BackendAzureRmContainerName)
                backendAzureRmKey: $(BackendAzureRmKey)

            - task: ms-devlabs.custom-terraform-tasks.custom-terraform-release-task.TerraformTaskV3@3
              displayName: 'Terraform : apply'
              inputs:
                command: apply
                workingDirectory: $(WorkingDirectory)
                commandOptions: 'plan.tfplan'
                environmentServiceNameAzureRM: $(ServiceConnectionName)

```

To run `terraform` task, you need follow this documentation to get one for your Azure Pipeline platform at [Terraform Task - Microsoft DevLabs](https://marketplace.visualstudio.com/items?itemName=ms-devlabs.custom-terraform-tasks)

Pipeline will separate for two step

- `terraform_plan` :  Run `init` and `plan`, which show change on your infrastructure
- `terraform_apply`: Base on `terraform_plan` condition to run this step, you need permit the permission to apply new change for infrastructure

Notice when run `Terraform` on Pipeline:

- Prepare your environment variables of terraform through pipeline variables
- Permit your permission on environment of pipeline
- Select and run the pipeline with expectation environment like dev, uat or prod

# Example: Update the version AKS with Terraform

>[!note]
>You should update your `AKS` version with `Terraform` for safety and consistent when upgrading in cloud. If you implement AKS or something related Azure Cloud, you can handle the version upgrade with Terraform with legit useful

1. Check the version should be upgraded to your current cluster with `az-cli`

```bash
az aks get-upgrades --resource-group <rg-name> --name <cluster-name> --output table

Name     ResourceGroup    MasterVersion    Upgrades
-------  ---------------  ---------------  ----------------------
default  aks              1.27.7           1.27.9, 1.28.3, 1.28.5
```

2. After you decide your upgrade version, go to `./deploy/terraform/azure/env/<name-env>/variables.tf`, find `k8s_version` and change that to expectation version

```bash
variable "k8s_version" {
  description = "Kubernetes version"
  default     = "1.27.7" --> "1.28.5"
}
```

3. On the first step, you need to make sure anything will not affected with your change, only `1` change about `aks` version. If not anything happen, you need approve permit to run next step
4. Validate your cluster version after completely **(Waiting on 10-20 minute)**

# Generate documentation Terraform with terraform-docs

>[!info]
>[terraform-docs](https://terraform-docs.io/) is one of tool which used for generating resources and configuration of Infrastructure as Code (Terraform) into Markdown style, e.g: README.md

```yaml title=".terraform-docs.yaml"
formatter: "markdown table"

output:
  file: "../README.md"
  mode: inject
  template: |-
    <!-- BEGIN_TF_DOCS -->

    {{ .Content }}
    
    <!-- END_TF_DOCS -->

sort:
  enabled: true
  by: name

settings:
  anchor: true
  color: true
  default: true
  description: false
  escape: true
  hide-empty: false
  html: true
  indent: 3
  lockfile: true
  read-comments: true
  required: true
  sensitive: true
  type: true
```

But in README.md, you need to configure where this docs generated into that by add-on, like

```bash title="README.md"
<!-- BEGIN_TF_DOCS -->

{{ .Content }}

<!-- END_TF_DOCS -->
```

