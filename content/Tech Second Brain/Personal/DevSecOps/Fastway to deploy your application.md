---
title: How the fast way to deploy your application ?
tags:
  - devops
  - azure
  - digital-ocean
  - cloud-services
  - helpful
---
>[!quote]
>So hi @all, It's me again and long time no see, just have a quick break for vacation on last week. Back to back, today I will provide you the way to deploy your application, how the fast way the cloud service can help you serve this problems ? Let digest about ☕☕

![[Pasted image 20240623094546.png]]

# Problems and role of Cloud

>[!question]
>I know when you want to perform or release your application, sometime you will meet some problems on knowledge when you do not have experience with Virtual machine (Azure), EC2 (AWS), or droplet (Digital Ocean) to setup and operation your application on these one
>

![[Pasted image 20240623095431.png]]

But don't worry, because of with the growth of containerization technologies, you will easily resolve that with your own application work like container, for example `docker` or `podman`.

And luckily, Cloud support us about most of part in this progress, you just click few button, and your application can be on internet by directly and convenient. I just drop down some technologies, and we will go interact with few of them on next part.

## Azure

Like you know, I am DevOps engineer and Azure is main cloud I am working and have most experience. In my opinion, Azure do great things to delivery you solution to operate and automation release your application on their platform on container app or source code, via **Container App Service** or **App Service**

<div align="center">
		<img src="https://learn.microsoft.com/en-us/azure/container-apps/media/overview/azure-container-apps-example-scenarios.png">
	    <strong><em><p style="text-align: center;">Azure Container Apps</p></em></strong>
</div>
>[!info]
>[Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/overview) is a serverless platform that allows you to maintain less infrastructure and save costs while running containerized applications

Just gave you more about information in my article on progress learn `Az104` [[Container Apps|Azure Container App]]

With Container App Service, you will not have worry and mess up about server configuration, orchestration and deployment. This one provides most of things and keep your app always alive and stable.

Scenarios when you want to work with Container App, usually for

- API Application
- Background process
- Event-Driven processing
- Microservice

And not stop that, you will have support in scalable functionality base on `HTTP Traffic`, `Event Driven`, `CPU and Memory Load` and `KEDA (Kubernetes Event-Driven Autoscaling)` and many features you can use to do interesting with your application in Container

But If you want have own instance like VM but not need to provision that, Azure provides you service call [Azure Container Instance](https://learn.microsoft.com/en-us/azure/container-instances/container-instances-overview). 

>[!note]
>Just take a look via my article about this service [[Container Instances|Azure Container Instance]]

![[Pasted image 20240623101459.png]]

>[!info]
>Azure Container Instances offers the fastest and simplest way to run a container in Azure, without having to manage any virtual machines and without having to adopt a higher-level service.

>[!hint]
>In far further optional, If you want to make full container orchestration, including service discovery across multiple containers, automatic scaling, and coordinated application upgrades, Azure and me will suggest about [AKS - Azure Kubernetes Service](https://learn.microsoft.com/en-us/azure/aks/) for instead

Most of useful of **Container Instance** about fast way to setup the instance for purpose running container application instead of take care about Virtual Machine, that why you need to choose this. With Container App will support you on pulling your container from registry like Docker Hub, Azure Container Registry or what ever registry you have, and bring up application in the instance. Please read more about feature of service from [What is Azure Container Instances?](https://learn.microsoft.com/en-us/azure/container-instances/container-instances-overview)

Lastly candidate of Azure I want to describe, to way you can handle and operator your application via directly your source code like Platform as a service (PaaS), [Azure App Service](https://learn.microsoft.com/en-us/azure/app-service/overview)

![[Pasted image 20240513092716.png]]

>[!info]
>_Azure App Service_ is an HTTP-based service for hosting web applications, REST APIs, and mobile back ends. You can develop in your favorite language, be it .NET, .NET Core, Java, Node.js, PHP, and Python. Applications run and scale with ease on both Windows and [Linux](https://learn.microsoft.com/en-us/azure/app-service/overview#app-service-on-linux)-based environments.

I will do not familiar much about this service because containerization much powerful them, and most work with that but if you just want focus to develop your application like a platform, Azure App will potential target for you

In Azure App Service you will have multiple optional to operator your application, and it split to specify purpose, such as

- Web App
- Static Web App
- Web App + Database
- Wordpress

Base on your purpose, you will have decide the best service which you want. [Static Web App](https://azure.microsoft.com/en-us/products/app-service/static), service which I use for frontend application like React App, Just build the artifact, and push up to Static web app and others work will taken by Azure with Continuous Deployment

![[Pasted image 20240623104036.png]]

So with Azure, You have multiple selection to take responsible for operating your application. In the next part, I will share you about way to deploy your application in container with Azure Container App with provisioning progress and CI/CD to reach the goal.

You can reach more article about comparison between them

- [Azure App Service vs Azure Container Apps - which to use?](https://learn.microsoft.com/en-us/answers/questions/1337789/azure-app-service-vs-azure-container-apps-which-to)
- [Azure Virtual Machines vs Azure App Service – Which One Is Right For You?](https://learn.microsoft.com/en-us/answers/questions/1337789/azure-app-service-vs-azure-container-apps-which-to)
- [Comparing Container Apps with other Azure container options](https://learn.microsoft.com/en-us/azure/container-apps/compare-options)

## AWS

How about AWS ? In my opinion, AWS have service do the jobs like Azure Provide. It means when you think about running the service inside container, AWS provide you to operate that.

I just not work to much with `AWS` but I can introduce some of them for your purpose, maybe can be wrong but hope so we can learn others from that 😄😄

![[Pasted image 20240623135825.png]]
<div align="center">
	<strong><em><p style="text-align: center;">AWS ECS</p></em></strong>
</div>
>[!info]
>[Amazon Elastic Container Service (Amazon ECS)](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html) is a fully managed container orchestration service that helps you easily deploy, manage, and scale containerized applications

It's integrated with both AWS and third-party tools, such as Amazon Elastic Container Registry and Docker. This integration makes it easier for teams to focus on building the applications, not the environment

There are three layers in Amazon ECS:

- Capacity - The infrastructure where your containers run
- Controller - Deploy and manage your applications that run on the containers
- Provisioning - The tools that you can use to interface with the scheduler to deploy and manage your applications and containers

![[Pasted image 20240623140424.png]]

With capacity, you have three options to choose when work with `ECS`

- EC2 Instance (VM of AWS) - *You choose the instance type, the number of instances, and manage the capacity.*
- Serverless (AWS Fargate (Fargate)) in the AWS cloud - *Fargate is a serverless, pay-as-you-go compute engine. With Fargate you don't need to manage servers, handle capacity planning, or isolate container workloads for security.*
- On-premises virtual machines (VM) or servers - *Amazon ECS Anywhere provides support for registering an external instance such as an on-premises server or virtual machine (VM), to your Amazon ECS cluster.*

The capacity can be located in any of the following AWS resources:

- Availability Zones
- Local Zones
- Wavelength Zones
- AWS Regions
- AWS Outposts

On the middle layer, AWS provide us the in-house software with manage deployment for your application

On the high layer, that client side with provide you multiple way to create and config `ECS` via

- **AWS Management Console** - *Web interface of AWS Cloud*
- **[AWS CLI](https://aws.amazon.com/cli/)** - *Provides commands for a broad set of AWS services*
- **[AWS SDK](https://aws.amazon.com/tools/#SDKs)** - *Provides language-specific APIs and takes care of many of the connection details*
- **[Copilot](https://github.com/aws/copilot-cli)** -  *Provides an open-source tool for developers to build, release, and operate production ready containerized applications on Amazon ECS*\
- **[AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/home.html)** - *Provides an open-source software development framework that you can use to model and provision your cloud application resources using familiar programming languages*

![[Pasted image 20240623142018.png]]
<div align="center">
	<strong><em><p style="text-align: center;">AWS Fargate</p></em></strong>
</div>
>[!info]
>[AWS Fargate](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html) is a technology that you can use with Amazon ECS to run [containers](https://aws.amazon.com/what-are-containers) without having to manage servers or clusters of Amazon EC2 instances. With AWS Fargate, you no longer have to provision, configure, or scale clusters of virtual machines to run containers. This removes the need to choose server types, decide when to scale your clusters, or optimize cluster packing.

`Fargate` is target when you think about container with AWS, It will help you operate your application in multiple case in orchestration like EKS (Elastic Kubernetes Service), ECS (Elastic Container Service). You can use `Fargate` in two type - Normal and Spot, that will base on your demand to doing something with one

If you think about App service, yup `AWS` already have it `Amplify`

![[Pasted image 20240623143045.png]]

>[!info]
>[Amplify Hosting](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html) provides a Git-based workflow for hosting full-stack serverless web applications with continuous deployment

Amplify deploys your app to the AWS global content delivery network (CDN). This user guide provides the information you need to get started with Amplify Hosting.

Amplify Hosting supports many common SSR frameworks, single-page application (SPA) frameworks, and static site generators and serve them multiple feature, including

- Feature branches
- Custom domains
- PR previews 
- End to end testing
- Password protected branches
- Redirects and rewrites
- Atomic deployments

Nowaday, Amplify grow to next gen, and provide way to help us to build the backend not even frontend. You can take a look at [Build & connect backend](https://docs.amplify.aws/nextjs/build-a-backend) in the _Amplify docs_. 

So that all about AWS, supper cool and unique services, and I just look around and give you introduce about that, maybe on next time I will drop some blog about `AWS` services. Let wait and do more practice in this cloud 👍

## Digital Ocean

![[Pasted image 20240623144432.png]]

Except three big cloud company, Digital Ocean is the best choice when you think about cheap, and fully service like big cloud provided by Digital Ocean. Externally, You can choose the alternative for Digital Ocean such as

- [Akamai](https://www.akamai.com/)
- [Hetzner](https://www.hetzner.com/)
- [OVHcloud](https://www.ovhcloud.com/asia/)

But luckily, Digital Ocean is friendly and fastway to create your account, just need 1$ to create account, and you will have clean web interface, and working flow for newbie when reach to cloud, honestly bro 😄

>[!quote]
>Go to digital ocean, on the first think, I do not know about app service of them, Just mess up to think about way to create and management application via `Droplet` - VM service of Digital Ocean. But when read Terraform, and I know that really exist `serverless` for container app and app service, It called [App Platform](https://www.digitalocean.com/products/app-platform), that really make me impressed 💯

![[Pasted image 20240623144907.png]]

>[!info]
>Get your apps to market fast with App Platform—a fully managed solution that's super simple to set up with cost-effective pricing so you can grow and scale with ease.

With app platform you really did awesome things, let me introduce hot feature

- **Build with ease** - *Simply publish your source code from a Git repo, a container image, or Docker Hub.*
- **Deploy with speed** - *Choose from shared or dedicated resources based on your app or website needs.*
- **Scale with flexibility** - *Set and forget with smart autoscaling that suits your budget and growth plans.*

Really honestly, App Platform still the best choice when you set it up and do familiar with cloud provider, really convenient and make you more easily to handling and aggressive to operator your application on Cloud environment

![[Pasted image 20240623145846.png]]

App platform can help you hosting both frontend and backend service, such as

- Web app
- Website
- APIs

One more thing make it become interesting about pricing, good range and easily to approaching for user which think about fastly configuration and deliver our service to internet, that really does and make good thing

## Conclusion

>[!done]
>With above the solution, most of things come up cloud because of super dope service which provided by them. And that will make you have more decision to choose one of them to becoming the potential for operate and release application. They have strengths and weakness, but It can make the marketplace to become chaotic and really interesting

Reach to next part, we will actually provide and play with some cool thing to create and setup your progress to deploy your application to one of them cloud

# Operate and deploy your application

This part will talk about Azure and Digital Ocean, because of I really make and do familiar with that so far that will help you cut off effort to go to the goal. I think `App Platform` will scope of this article, will be **Azure** on next stage

![[Pasted image 20240623150613.png]]

Before reach to detail, some technologies with in-use for provisioning and create ci/cd process to completely, therefore you need to take that key feature to understand what I doing, like

- Terraform (IaC)
- Azure DevOps Pipelines

## Completely Architecture

![[Pasted image 20240623154334.png]]

With simple deployment will include 2 way to affect to infrastructure, Dev and DevOps

- With DevOps, I will provide the local way to provisioning the infrastructure from Terraform
- With Dev, I will include CI/CD process to build and release application. With decision, not or ready to push docker image tag `latest` to registry, and CD with provide by App Platform will help us the others work

## Provisioning

For secure and easily to delivery infrastructure in `tfstate`, I will offer you store that one in cloud environment. You will need authentication to reach that, and can directly share with member team when they want to upgrade anything. Local state is other way but not secure, and you need manually manage versioning of `tfstate`. Explore more at [Backend Configuration](https://developer.hashicorp.com/terraform/language/settings/backends/configuration)

Before you can use `terraform`, I choose `Azure Storage` for backend of terraform. You can follow this way to create your own one in Azure

- Go to web portal of Azure, type `Storage Accounts`
- Select that and click on `Create`, It will require put some information **Resource Group, Storage Account Name (Unique), Region, Performance and Redundancy**.
- After go through all tab, you can click `Review + Create`
- Click `Create` to completely create your `Storage Accounts`

![[Pasted image 20240623155801.png]]

- You need to create a new container storage, and name is what ever you want, like me `terraform-vault` can be great choice 😄

With all step above, you will have use `azurerm` like the backend of your `tfstate`

```hcl title="providers.tf"
terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "2.39.2"
    }
  }

  backend "azurerm" {
    resource_group_name  = "NewOne"
    storage_account_name = "donottouchthisthing"
    container_name       = "terraform-vault"
    key                  = "example-production.tfstate"
  }
}

provider "digitalocean" {
  token = var.do_token
}
```

```hcl title="variables.tf"
variable "do_token" {
  description = "Authentication Token for Digital Ocean"
  type        = string
  sensitive   = true
}
```

With `digitalocean` , you can follow this to understand components provide at [DigitalOcean Provider](https://registry.terraform.io/providers/digitalocean/digitalocean/latest/docs). To authentication providers, you need to create your own token in Digital Ocean account. You can read more about that in [this article - How to Create a Personal Access Token](https://docs.digitalocean.com/reference/api/create-personal-access-token/). Recommendation give **Root permission** is the best way to handle and work with Digital Ocean cloud

When you get the token, put that to environment or via `tfvars` file. That will help `Terraform` can understand and use that for provisioning progress. Read more at: [Input Variables](https://developer.hashicorp.com/terraform/language/values/variables)

1. Use `tfvars`

	```hcl title="terraform.tfvars"
	do_token="xxxxxxxxxx"
	```

2. Use environment
	
	```bash
	export TF_VAR_do_token="xxxxxxxxxx"
	```

3. Use `-var` parameter when use `terraform` command

One more thing, when use `azurerm` use need authentication terraform with `Azure`. You have multiple way to authentication that

- Use `az login` or `az login --use-device-code` to authentication your shell to directly access to Azure Cloud (**Recommendation**)
- Use `EntraID` with `App Registry` to create **Service Principle** and use that to login Azure with permission provide by `EntraID`
- If you work on Azure Resource like VM, Use can use managed identity with provided by Azure on that service, that very easily take when you work on Azure VM

After you claim all step above, you go to half of part to provisioning the architecture like image. You will need know about [Module](https://developer.hashicorp.com/terraform/language/modules). That will help you a lot when you split environment or try to release some where with consistent between environment, especially share that like registry to private cloud

Usually my source `terraform` directory can be like

```bash
terraform/
-- env/
---- production/
------- main.tf
------- providers.tf
------- outputs.tf
------- variables.tf
------- terraform.tfvars
-- modules/
---- common/
------- main.tf
------- variables.tf
---- postgres/
------- main.tf
------- variables.tf
```

Follow that directory, below script will describe all cloud we need to provisioning

>[!note]
> With the providers not provider by **hashicorp**, you need to create and put the configuration provider into `.tf` file like `env` directory to help Terraform detect that. In this situation, source from `digitalocean/digitalocean` not come from `hashicorp/`

***`common` module***

```hcl title="common/main.tf"
resource "digitalocean_container_registry" "container_registry" {
  name                   = "containerregistryxxxx"
  subscription_tier_slug = var.registry_tier
  region                 = var.location
}
```

```hcl title="common/providers.tf"
terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "2.39.2"
    }
  }
}

provider "digitalocean" {
  token = var.do_token
}
```

```hcl title="variables.tf"
variable "registry_tier" {
  type = string
}

variable "location" {
  type = string
}

variable "do_token" {
  description = "Authentication Token for Digital Ocean"
  type        = string
  sensitive   = true
}
```

```hcl title="common/outputs.tf"
output "registry_name" {
  value = digitalocean_container_registry.container_registry.name
}
```

***`container` module***

```hcl title="container/main.tf"
resource "digitalocean_app" "xxxxxxx" {
  spec {
    name   = "xxxxxxx-${var.env}"
    region = var.location

    service {
      name               = "xxxxxxx-${var.env}"
      instance_size_slug = "basic-xs"
      instance_count     = 1
      http_port          = "8080"
      image {
        registry_type = "DOCR"
        repository    = "xxxxxxx-${var.env}"
        tag           = "latest"
        deploy_on_push {
          enabled = true
        }
      }

      env {
        key   = "xxxxxxx"
        value = "first"
        type  = "GENERAL"
      }

      env {
        key   = "db_connection_string"
        value = var.db_connection_string
        type  = "SECRET"
      }
    }
  }
}

```

```hcl title="container/variables.tf"
variable "env" {
  type = string
}

variable "location" {
  type = string
}

variable "registry_name" {
  type = string
}

variable "db_connection_string" {
  type      = string
  sensitive = true
}

variable "do_token" {
  description = "Authentication Token for Digital Ocean"
  type        = string
  sensitive   = false
}
```

```hcl title="container/providers.tf"
terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "2.39.2"
    }
  }
}

provider "digitalocean" {
  token = var.do_token
}
```

***`postgres` module***

```hcl title="postgres/main.tf"
resource "digitalocean_database_cluster" "xxxxxxx" {
  name       = "db-${var.env}"
  engine     = "pg"
  version    = "15"
  size       = var.db_size
  region     = var.location
  node_count = 1
}

resource "digitalocean_database_db" "xxxxxxx" {
  name       = "xxxxxxx"
  cluster_id = digitalocean_database_cluster.xxxxxxx.id
}
```

```hcl title="postgres/outputs.tf"
output "db_connection_string" {
  value     = "Host=${digitalocean_database_cluster.xxxxxxx.host};Port=${digitalocean_database_cluster.xxxxxxx.port};Database=mindfull;Username=${digitalocean_database_cluster.xxxxxxx.user};Password=${digitalocean_database_cluster.xxxxxxx.password}"
  sensitive = true
}

```

```hcl title="postgres/variables.tf"
variable "env" {
  type = string
}

variable "location" {
  type = string
}

variable "db_size" {
  type = string
}

variable "do_token" {
  description = "Authentication Token for Digital Ocean"
  type        = string
  sensitive   = false
}
```

```hcl title="postgres/providers.tf"
terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "2.39.2"
    }
  }
}

provider "digitalocean" {
  token = var.do_token
}
```

That all for module you need back to `env` directory to provision your main module

```hcl title="env/do/main.tf"
module "common" {
  source        = "../../modules/common"
  registry_tier = var.registry_tier
  location      = var.location
  do_token      = var.do_token
}

module "postgres" {
  source           = "../../modules/postgres"
  env              = var.env
  location         = var.location
  db_size          = var.db_size
  do_token         = var.do_token
}

module "container" {
  source                        = "../../modules/container"
  env                           = var.env
  location                      = var.location
  do_token                      = var.do_token
  registry_name                 = module.common.registry_name
  db_connection_string          = module.postgres.db_connection_string
}

```

```hcl title="env/do/variables.tf"
variable "do_token" {
  description = "Authentication Token for Digital Ocean"
  type        = string
  sensitive   = false
}

variable "env" {
  description = "Environment of project"
  type        = string
  default     = "prod"
}

variable "db_size" {
  description = "Size of instance database"
  type        = string
  default     = "db-s-1vcpu-1gb"
}

variable "location" {
  description = "Region for operation all services"
  type        = string
  default     = "sgp1"
}

variable "registry_tier" {
  description = "Tier of Container Registry"
  type        = string
  default     = "basic"
}
```

Yup that finest all, but first of all you just need to create `common` and `postgres` first because when you create container application, your app will not figure out your image push to registry

Applied `terraform progress` you will have the container registry and `postgres`. Let to application release part to more understand

```bash
terraform init
terraform plan
terraform apply -auto-approve
```

## Release application

With release stage, that is very easily. First of all, sorry because I just write the tutorial base on the application with provided by Dev so not prepare the opensource for you can follow. But if you know need the article for give the environment like backend with Restful API and `postgres` you will know what thing to do. For example, I just collect some external resource to guide you about that

- [How To Use a PostgreSQL Database in a Flask Application](https://www.digitalocean.com/community/tutorials/how-to-use-a-postgresql-database-in-a-flask-application)
- [Github - flask-postgres-docker-compose-simple-app](https://github.com/khristoforovs/flask-postgres-docker-compose-simple-app)
- [Medium - How to build a CRUD API using Python Flask and SQLAlchemy ORM with PostgreSQL](https://medium.com/@yahiaqous/how-to-build-a-crud-api-using-python-flask-and-sqlalchemy-orm-with-postgresql-7869517f8930)

Forgiveness to me @all, to make up for that I will show the pipeline in Azure DevOps to give you quite vision when you can push and release your application to Digital Ocean with App Platform

When to create and login TFS, you need to create some `Service Connection` to integrate Docker Plugin in your pipeline, and create the approve to handle the permission when you want to release application

1. Create `Service Connection`

	- First you need to choose `Project settings` on your repositories
	- On the left of monitor, you will see `service connections`, choose and you will direct to `Service connections` monitor
	- On the right head of monitor, you click on `New service connection` and choose `Docker Registry` and provide the requirement information. Click `Save` and you successfully to create `Docker Registry Service Connection`

		![[Pasted image 20240623172322.png]]

2. To create the environment to Deployment which help you add permission action to approve perform pipeline progress, read step via [Create and target an environment](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/environments?view=azure-devops)

After you create all that, you need prepare `azure-pipeline.yaml` with down below

```yaml title="azure-pipeline.yaml"
# Trigger when open PR and merge
trigger:
  branches:
    include:
      - dev

# Select pool for running task
pool: default

stages:
  - stage: build_and_deploy_image
    displayName: Build and Deploy Docker Image
    condition: eq(variables['build.sourceBranch'], 'refs/heads/dev')
    jobs:
      - deployment: build_and_deploy_docker_image
        displayName: Build Docker Image and Deploy
        environment: $(environmentDeployment)
        strategy:
          runOnce:
            deploy:
              steps:
                - task: Docker@2
                  displayName: Login to DOCR
                  inputs:
                    command: login
                    containerRegistry: XXXXXXXX
                  
    
                - task: Docker@2
                  displayName: Build and Push Image
                  inputs:
                    command: buildAndPush
                    Dockerfile: ./src/Dockerfile
                    repository: containerregistryxxxx/xxxxxxx-dev
                    buildContext: ./src/
                    tags: |
                      latest
                      $(Build.SourceVersion)
```

With this pipeline, you just need to perform CI because CD will serve from App Platform direction. Specify thing I want note in this pipeline about the `environment` for approval and rule to auto trigger this pipeline, with detailing

- Pipeline will auto trigger when have push to `dev` branch
- Pipeline will ask to your approval to perform build and push Image to Digital Ocean container registry

	```yaml {17-20}
	# Trigger when open PR and merge
	trigger:
	  branches:
	    include:
	      - dev
	
	# Select pool for running task
	pool: default
	
	stages:
	  - stage: build_and_deploy_image
	    displayName: Build and Deploy Docker Image
	    condition: eq(variables['build.sourceBranch'], 'refs/heads/dev')
	    jobs:
	      - deployment: build_and_deploy_docker_image
	        displayName: Build Docker Image and Deploy
	        environment: $(environmentDeployment)
	        strategy:
	          runOnce:
	            deploy:
	              steps:
	                - task: Docker@2
	                  displayName: Login to DOCR
	                  inputs:
	                    command: login
	                    containerRegistry: XXXXXXXX
	                  
	    
	                - task: Docker@2
	                  displayName: Build and Push Image
	                  inputs:
	                    command: buildAndPush
	                    Dockerfile: ./src/Dockerfile
	                    repository: containerregistryxxxx/xxxxxxx-dev
	                    buildContext: ./src/
	                    tags: |
	                      latest
	                      $(Build.SourceVersion)
	```

So that all, you save and put the variable which require your application on the pipeline setting

![[Pasted image 20240623173728.png]]

Click `Save` and you will successful pipeline with ready to release. And result when you perform completely build and push your application to registry

![[Pasted image 20240623173807.png]]

## Automation Deployment

Back to the `terraform` code, we will be applied the rest of one about `container` module. If you make the concern, how the heck the `App Platform` can be release your application with automation mode. Just simple, have you look about `main.tf`

```hcl title="container/main.tf" {14,15-17}
resource "digitalocean_app" "xxxxxxx" {
  spec {
    name   = "xxxxxxx-${var.env}"
    region = var.location

    service {
      name               = "xxxxxxx-${var.env}"
      instance_size_slug = "basic-xs"
      instance_count     = 1
      http_port          = "8080"
      image {
        registry_type = "DOCR"
        repository    = "xxxxxxx-${var.env}"
        tag           = "latest"
        deploy_on_push {
          enabled = true
        }
      }

      env {
        key   = "xxxxxxx"
        value = "first"
        type  = "GENERAL"
      }

      env {
        key   = "db_connection_string"
        value = var.db_connection_string
        type  = "SECRET"
      }
    }
  }
}
```

The highlight is reason why `App Platform` can perform CD with not provide something because of you combine two step from CI to CD

- On the CI, you ask permission `approval` to permit your CI progress that mean application will not be release unless you perform action
- With CD, It always waits and detects new version of tag Container, It means `latest` will the factor when I permit CI to push new Image to overwrite the old tag `latest` with option `deploy_on_push` is enable. CD will perform with commitment from CI, and you can clearly create the progress with no doubt downtime and easily to management. That's quite simple 😃

![[Pasted image 20240623174835.png]]

That done, you will have completely progress to perform provisioning and make progress automation in pipeline to fast deploy your application with not configuration about server, just `serverless` functionality, cool stuff 🥶🥶

## App Platform

I think the article to become long and hard to understand because cover to much thing but if make it run that will good for you to design small to medium thing with easily to management full completely progress.

So with `App Platform`, you will have clearly UI when work with on Digital Ocean web portal, such as

- You have `Runtime Log` on the portal, with not need to self host anything to monitoring and collection log. But if you need to analysis, maybe the component inside monitoring cluster will help you
- When you select `settings`, you will have `Log Forwarding` , It means you have push the log  to powerful platform to analysis, alert and moreover thing can do with that. Example: Datadog, Logtail, PaperTrail, OpenSearch and moreover external platform

	![[Pasted image 20240623175508.png]]
- If you need to alert about announcing your application, you can configuration the alert on `settings` tab. That will directly send email to your admin account or `slack` team chat

	![[Pasted image 20240623175743.png]]

- You can easily management app spec, and give the `vertical scaling` to upgrade large node or make `horizontal scaling` to add more instance load traffic between them. You can read more about via [Terraform - Digital Ocean App](https://registry.terraform.io/providers/digitalocean/digitalocean/latest/docs/resources/app)


# Conclusion

>[!done]
>That all for today @all, happily to writing this blog and sharing you about knowledge of this technologies, supper cool and fast to deploy your own application with Cloud providers. I think and wish it will help you to do more great things, with flexible and more compatible in containerization to becoming large, more powerful with such a good thing bring up. The nowaday The game is not just simple create and manage, you need to learn more and integrate to escalate new thing with container application such as AI, Data, Network or Security inside.

>[!quote]
>Hope you have a great time, share and talk anyone about that. Learn new thing, and not give up, stay safe and do best thing @all. I will see you on next release

