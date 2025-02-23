---
title: Create Atlantis with ECS Fargate for automation provisioning
tags:
  - automation
  - provisioning
  - devops
  - tech
  - aws
---
>[!quote]
>Hi @all, this week is so busy for me, and this about to learn something new about gitops and techniques and tools depend on this concept, and this week I will take a break kubewekend series. Therefore, today we will learn about atlantis - gitops for automatic provisioning your infrastructure. Let's digest !!

# What is Atlantis ?

>[!quote]
>Infrastructure as Code is becoming the importance part of `DevOps` role model, It means `DevOps` engineer can resolve many problem to help am I swallow all technically inside `cloud` and that is possible. `Terraform`, `Pulumi`, `Chef`, `OpenTofu` - Those come up and make this game to become more easier than ever, really tough !!! And we always have next-question about How can we create automation with those ? Does any things can help us ?

![[thumbnail-gitopsvscicd.gif|center]]

And the answer is yes, and that is a lot solutions to help you attack problem, such as

- Basic method, you choose one of code management platform, and implement the process `CI/CD` with one of `IaC` which related above to help you provisioning and managing your infrastructure
- Advantage method, you choose `GitOps` which same idea as basic methodology but extend on the process about you only use `Pull Request` to control everything your infrastructure and deployment

It seem like not a big deal, you can choose what ever you want if you feel great with right expectation. You can read more about different between `GitOps` and Traditional `CI/CD` below

- [CICD vs GitOps](https://www.linkedin.com/pulse/cicd-vs-gitops-registfy-v09de/)
- [Traditional CI-CD vs gitops](https://blog.devops.dev/traditional-ci-cd-vs-gitops-e835728642fb)

But as you know, I want to try and hand on with another tools, another concept and see what is big difference between of them and figure out what things need to clarify when you choose  `GitOps` or `CI/CD` for your projects

And I will try with `Infrastructure` as first, and `IaC` is first topic I relate to `GitOps`. So with `IaC`, you have multiple platform to hand on and one of most popular is `Atlantis`. You can choose alternative at [[Awesome DevOps & System & Tech#Terraform workflow automation|Alternative Atlantis]]

## Introduce

![[thumbnail-atlantis.png]]

You can find more information about `Atlantis` in the [documentation](https://www.runatlantis.io/) and [github](https://github.com/runatlantis/atlantis)

>[!info]
><h2>Atlantis</h2>
>
>Atlantis is a tool for collaborating on Terraform. The core functionality of Atlantis enables developers and operators to run `terraform plan` and `apply` directly from Terraform pull requests. Atlantis then comments back on the pull request with the output of the commands

You can image when you open PR, `Atlantis` will act like `bot` who will help you run `plan` inside `Terraform` workflow, and send back your output inside comment. You can directly communicate with `Atlantis` to making changes inside your Infrastructure with no effort

And depend on that idea, your team will receive the massive efficiency in

- [Collaboration](https://www.runatlantis.io/blog/2017/introducing-atlantis.html#effective-collaboration): You can analysis what change inside your `PR` where your team can easily see and feedback to give best decision before all of changes merge to `master` branch for example
- Help [Developers Writing Terraform](https://www.runatlantis.io/blog/2017/introducing-atlantis.html) : It means you create environment where developer doesn't have `credentials` can be accessed, and help `devloper` can change infrastructure in plan state where `Ops` team `apply` when you give same agreement

That why you need `Atlantis` right now for your project 😄, be external `Atlantis` will also ensure you about 

- Make Fewer mistake
- Instant Audit Logs
- Self-hosted
- Open Source

Assemble all of things, `Atlantis` is becoming potential to choosing when you want create `GitOps` process inside your project, easily and powerful. But you can consider to choose another one because out there are also equally good products

- [scalr](https://docs.scalr.io/docs/introduction) :  Remote operations backend for Terraform and OpenTofu (OTF)
- [digger](https://docs.digger.dev/readme/introduction) : open-source CI/CD orchestrator for Terraform
- [env0](https://docs.env0.com/?_gl=1*1w4u2il*_gcl_au*NzM1MjI0MDA5LjE3MjI3NTY3OTA.*_ga*NzQzMjM2NTIxLjE3MjI3NTY3ODY.*_ga_VYZFC0GDCG*MTcyMjc1Njc4NS4xLjEuMTcyMjc1NjgwNy40My4wLjA.):  best way to automate and manage any Infrastructure-as-Code, from Terraform and OpenTofu to Pulumi, CloudFormation, Terragrunt, Kubernetes, and more.

>[!quote]
>Lastly, Tool is not important, but if you know more than one you can push yourself to higher level, improve your mindset and do lot of useful things. `Atlantis` and what ever, It depends on your choosing. Good luck BTW 😄😄😄

## How can `Atlantis` work

Like I relate above,  `Atlantis` is opensource and you can understand all of concept or strategy inside their [source code](https://github.com/runatlantis/atlantis)

![[meme-decision.png|center]]

You can try self-hosted `Atlantis` in the multiple way, including

- Use [binaries version](https://github.com/runatlantis/atlantis/releases)
- Use [docker](https://github.com/runatlantis/atlantis/pkgs/container/atlantis) on locally or cloud like [AWS Fargate](https://www.runatlantis.io/docs/deployment#aws-fargate)
- Use in `Kubernetes` on multiple local and cloud via [Helm](https://www.runatlantis.io/docs/deployment#kubernetes-helm-chart), [Manifest](https://www.runatlantis.io/docs/deployment#kubernetes-manifests), [Kusomize](https://www.runatlantis.io/docs/deployment#kubernetes-kustomize)
- Use [OpenShift](https://www.runatlantis.io/docs/deployment#openshift)

If you choose self-hosted locally, ensure your host

- Install `terraform` or `opentofu` in your host (Binaries)
- Use `ngrok` or `localtunnel` to expose your `Atlantis` to your repositories, with actual URL. IDK does raw `IP` can be used but ensure use `URL` with SSL to except problems. [Troubleshoot HTTPS, SSL, TLS](https://www.runatlantis.io/docs/troubleshooting-https.html)

![[atlantis-workflow.png]]

Take a look `Atlantis` workflow, really simple

- First, when you create `PR` with code change, your repositories create trigger to `webhook` which set for `Atlantis`
- `Atlantis` will listen the trigger, after receiving the triggers they will pull the source code and use the algorithm inside [autoplanning](https://www.runatlantis.io/docs/autoplanning.html#autoplanning) to run `plan` before return result to `PR` as comment
- If you looks good `output` plan send from `Atlantis` inside `PR`, you can try interact with `Atlantis` to continue check or use `apply` function to apply change into Cloud
- When `Atlantis` receive the apply, It will run `apply` to your cloud with your code and set it up to `AWS` or what ever. If something wrong, `Atlantis` will return message error and unless completely anything `output` plan, your PR will be closed by `Atlantis` via [automerging](https://www.runatlantis.io/docs/automerging.html)

With workflow like above, when create `Atlantis` for yourself, ensure create

- [Git Host Access Credentials](https://www.runatlantis.io/docs/access-credentials.html#git-host-access-credentials)
- [Webhook Secrets](https://www.runatlantis.io/docs/webhook-secrets.html) to [Configuration Webhook](https://www.runatlantis.io/docs/configuring-webhooks.html#configuring-webhooks)
- [Cloud Credentials](https://www.runatlantis.io/docs/provider-credentials.html)

Currently, `Atlantis` is supporting for multiple code management tool, choose one of them and let try to self-hosted

- [GitHub](https://www.runatlantis.io/docs/access-credentials.html#github-user)
- [GitHub app](https://www.runatlantis.io/docs/access-credentials.html#github-app)
- [GitLab](https://www.runatlantis.io/docs/access-credentials.html#gitlab)
- [Gitea](https://www.runatlantis.io/docs/access-credentials.html#gitea)
- [Bitbucket Cloud (bitbucket.org)](https://www.runatlantis.io/docs/access-credentials.html#bitbucket-cloud-bitbucket-org)
- [Bitbucket Server (aka Stash)](https://www.runatlantis.io/docs/access-credentials.html#bitbucket-server-aka-stash)
- [Azure DevOps](https://www.runatlantis.io/docs/access-credentials.html#azure-devops)

I will choose `Gitlab` for guiding you what exactly need to setup your `webhook` and `cred`

## Create `Gitlab` Account and configuration for `Atlantis`

Following the requirement, you can create `gitlab` user is `atlantis` or use own account, anything is fine, sometimes you just need to do some basically

To create `cred` of your `gitlab`, It is actually `PAT` (Personal Access Token), you can following [this tutorial](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html) to create for your one. Base on [Atlantis](https://www.runatlantis.io/docs/access-credentials.html#gitlab), you need create Token assigned scope `API`, remember record that value to use on next part

![[Pasted image 20240804161014.png]]

>[!info]
>Your token can have format `glpat-xxxxxxxxxxxxxx`

Next you just need to create `webhook`, but currently you don't have target URL make sure you update that after your `Atlantis` work. Explore more by following [Atlantis](https://www.runatlantis.io/docs/configuring-webhooks#gitlab)

![[Pasted image 20240804162245.png|center]]

Choose `Webhooks` and put the information with secrets you prepare

![[Pasted image 20240804162405.png|center]]

And now select option `webhook` can effect with your `PR`

- Push events
- Comments
- Merge request events

Now you have all of things to setup `Atlantis` for yourself. Reach to `Terraform` code to know how to provisioning that one inside `AWS Fargate`


# Provisioning `Atlantis`

![[meme-over-provision.png]]

>[!info]
>Following the documentation from `Atlantis`, we can choose `Fargate` of AWS to operating our container `Atlantis`. If you know, `Fargate` is belong to service of AWS called `ECS` (Elastic Container Service) which one use to deploy and operate container via `task` or `docker-compose`, really tough

Some feature of `ECS` which I related on [[Fastway to deploy your application#AWS|Fastway to deploy your application with AWS]] and you can do it all with your code using module at [AWS Atlantis](https://registry.terraform.io/modules/terraform-aws-modules/atlantis/aws/latest)

To understand more about `ECS` and `Fargate`, I will follow to create all services by manual and provide that for `Atlantis` module, mostly about networking, As you come from `Azure` and newbie in `AWS` you will surprise with `AWS` networking concept
## Create and learn about networking with `AWS`

Base on `AWS`, ever you hear about `Public Subnet`, that concept is unique because when you learn about `networking` in **General**,  you just have `Private Subnet` and that all. Now we must use both of them `Public` and `Private` inside `AWS` and that can be tough thing but very pleasant

When I follow this article [ECS (Fargate) with ALB Deployment Using Terraform](https://registry.terraform.io/modules/terraform-aws-modules/atlantis/aws/latest), I have open view to implement what you need inside `networking` when try create your own in AWS

![[aws-network-setup.png]]

>[!note]
>In conclusion, AWS have `NAT gateway` (In Azure it not need to use) but in AWS you need this to go to the Internet, if not your host will work only from `inbound` site and not `egress` your `outbound` 😄, and in the other way you need to use `Internet Gateway` to through `ALB` before hit to your `Application`

Now we will do self-provisioning that, nowadays `AWS` is spending the module to help cut off the work to handle `networking`, you can check at [AWS VPC](https://registry.terraform.io/modules/terraform-aws-modules/vpc/aws/latest)

Create your `networks.tf` and applied this code below

```hcl title="networks.tf"
# Networking
data "aws_availability_zones" "default" {
}

resource "aws_vpc" "atlantis" {
  cidr_block = var.vpc_cidr
  tags       = var.tags
}

resource "aws_internet_gateway" "atlantis" {
  vpc_id = aws_vpc.atlantis.id
  tags   = var.tags
}
resource "aws_eip" "atlantis" {
  domain = "vpc"
  tags   = var.tags
}

resource "aws_nat_gateway" "atlantis" {
  allocation_id = aws_eip.atlantis.id
  subnet_id     = aws_subnet.public_atlantis[0].id
  tags          = var.tags
  depends_on    = [aws_internet_gateway.atlantis]
}

# Private subnet
resource "aws_subnet" "private_atlantis" {
  # Why: ALB need at least two subnets in different regions
  count             = 3
  vpc_id            = aws_vpc.atlantis.id
  cidr_block        = "10.0.${count.index}.0/24"
  availability_zone = data.aws_availability_zones.default.names[count.index]
  tags              = var.tags
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route_table" "private_atlantis" {
  vpc_id = aws_vpc.atlantis.id
  tags   = var.tags
}

resource "aws_route" "private_atlantis" {
  route_table_id         = aws_route_table.private_atlantis.id
  destination_cidr_block = "0.0.0.0/0"
  nat_gateway_id         = aws_nat_gateway.atlantis.id
}

resource "aws_route_table_association" "private_atlantis" {
  count          = 3
  subnet_id      = aws_subnet.private_atlantis[count.index].id
  route_table_id = aws_route_table.private_atlantis.id

  depends_on = [aws_route_table.private_atlantis]
}

# Public subnet
resource "aws_route_table" "public_atlantis" {
  vpc_id = aws_vpc.atlantis.id
  tags   = var.tags
}
resource "aws_subnet" "public_atlantis" {
  count             = 3
  vpc_id            = aws_vpc.atlantis.id
  cidr_block        = "10.0.${count.index + 3}.0/24"
  availability_zone = data.aws_availability_zones.default.names[count.index]
  tags              = var.tags
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route" "public" {
  route_table_id         = aws_route_table.public_atlantis.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.atlantis.id
}

resource "aws_route_table_association" "public" {
  count          = 3
  subnet_id      = aws_subnet.public_atlantis[count.index].id
  route_table_id = aws_route_table.public_atlantis.id
  depends_on     = [aws_route_table.public_atlantis]
}
```

```hcl title="variables.tf"
### General
variable "tags" {

  type = object({
    provision = string,
    domain    = string,
    used_by   = string,
    account   = string
  })
  description = "Tags for module which this one provisioned"
  default = {
    provision = "terraform",
    domain    = "cicd",
    used_by   = "atlantis",
    account   = "infrastructure"
  }
}

variable "region" {
  type        = string
  default     = "ap-southeast-1"
  description = "Region for provisioning module"
}

### Network
variable "vpc_cidr" {
  type        = string
  default     = "10.0.0.0/16"
  description = "The IPv4 CIDR block for the VPC"
}
```

As you can see, the code will create inside VPC to **6 subnet**, half of them spend for `Private` and other spend for `Public`, you can image

- Create VPC at range `10.0.0.0/16` will include `65536` network
- The `AWS ALB` need create **at least 2 subnet** in different zone, therefore I create 3 subnet in 3 different zone base on `data.aws_availability_zones.default` with return 3 zone `a b c`
- Attach zone and create 3 subnet for private and 3 subnet for public, It will

	- Public subnet: `10.0.3.0/24` `10.0.4.0/24` and `10.0.5.0/24` in `ap-southeast-1a` to `ap-southeast-1c`
	- Private subnet: `10.0.0.0/24` `10.0.1.0/24` and `10.0.2.0/24` in `ap-southeast-1a` to `ap-southeast-1c`

- Create Nat Gateway and Internet Gateway, and two Route Table to create connection between subnet with these Gateway
- Create the association between `Nat Gateway` with `Private Network` at range `0.0.0.0/0` and `Internet Gateway` with `Public Network` at range `0.0.0.0/0`

Now you already provisioning network for your `ALB` and It means you can attach network with `ALB` and use that assign to `ECS` where can load traffic

>[!warning]
>If you misconfiguration, that all kind reason in AWS start from `networking`. You need to verify at all and adapt right concept of AWS. Hope so 0 error in your provisioning progress

Apply the workflow of `Terraform` to get your result, remember set the backend of aws or what ever you want to, check out about [Backends Configuration](https://developer.hashicorp.com/terraform/language/settings/backends/configuration)

```bash
# Init
terraform init # Use -reconfigure if you change your backend

# Plan
terraform plan

# Apply
terraform apply
```

Now access in your `AWS`, view in `VPC` service you will see

![[Pasted image 20240804171156.png]]

And that do same as connect like I describe with NAT and Internet Gateway, with route table `0.0.0.0/0` for allow all traffic to and out VPC

## Use Network for `Atlantsis` module

If you provisioning all of them, your other work will very simple because module will take care and create all of part, you need to concern how set right configuration for `Atlantis` and give network subnet for right location

```hcl title="atlantis.tf"
locals {
  service_subnets      = [for s in aws_subnet.private_atlantis : s.id]
  alb_subnets          = [for s in aws_subnet.public_atlantis : s.id]
  # Put your gitlab-user with non @ who you created PAT Token
  atlantis_gitlab_user = "xeus.nguyen"
  root_domain          = "xeusnguyen.xyz"
}

data "aws_route53_zone" "infrastructure" {
  name         = "infrastructure.${local.root_domain}"
  private_zone = false
}
data "aws_acm_certificate" "infrastructure" {
  domain   = "*.infrastructure.${local.root_domain}"
  statuses = ["ISSUED"]
}

module "atlantis" {
  source  = "terraform-aws-modules/atlantis/aws"
  version = "4.4.0"

  name = "atlantis"

  # ECS Container Definition
  atlantis = {
    environment = [
      {
	    # GitLab username of API user
	    # Documentation: https://www.runatlantis.io/docs/server-configuration#gitlab-user
        name  = "ATLANTIS_GITLAB_USER"
        value = local.atlantis_gitlab_user
      },
      {
	    # Provide the allowlist repostories to connected with Atlantis
	    # Documentation: https://www.runatlantis.io/docs/server-configuration#repo-allowlist
        name  = "ATLANTIS_REPO_ALLOWLIST"
        value = "gitlab.com/allow-list/*"
      },
      {
	    # Username used for Basic Authentication on the Atlantis web service. Defaults to `atlantis`.
	    # Documentation: https://www.runatlantis.io/docs/server-configuration#web-username
        name  = "ATLANTIS_WEB_USERNAME"
        value = "atlantis"
      },
      {
	    # Enable Basic Authentication on the Atlantis web service.
	    # Documentation: https://www.runatlantis.io/docs/server-configuration#web-basic-auth
        name  = "ATLANTIS_WEB_BASIC_AUTH"
        value = "true"
      },
      {
	    # Automatically merge pull requests after all plans have been successfully applied. Defaults to `false`
	    # Documentation: https://www.runatlantis.io/docs/server-configuration#automerge
        name  = "ATLANTIS_AUTOMERGE"
        value = "true"
      }
    ]
    secrets = [
      {
	    # GitLab token of API user.
	    # Documnetation: https://www.runatlantis.io/docs/server-configuration#gitlab-token
        name      = "ATLANTIS_GITLAB_TOKEN"
        valueFrom = "arn:aws:secretsmanager:ap-southeast-1:xxxxxxx:secret:atlantis_gitlab_token:value:AWSCURRENT:"
      },
      {
	    # Secret used to validate GitLab webhooks.
	    # Documentation: https://www.runatlantis.io/docs/server-configuration#gitlab-webhook-secret
        name      = "ATLANTIS_GITLAB_WEBHOOK_SECRET"
        valueFrom = "arn:aws:secretsmanager:ap-southeast-1:xxxxxxx:secret:atlantis_gitlab_webhook_secret:value:AWSCURRENT:"
      },
      {
	    # Password used for Basic Authentication on the Atlantis web service. Defaults to `atlantis`.
	    # Documentation: https://www.runatlantis.io/docs/server-configuration#web-password
        name      = "ATLANTIS_WEB_PASSWORD"
        valueFrom = "arn:aws:secretsmanager:ap-southeast-1:xxxxxxx:secret:atlantis_web_password:value:AWSCURRENT:"
      }
    ]
  }

  # ECS Service
  service = {
	# ARN to give permission your ECS can access
    task_exec_secret_arns = [
      "arn:aws:secretsmanager:ap-southeast-1:xxxxxxx:secret:atlantis_gitlab_token",
      "arn:aws:secretsmanager:ap-southeast-1:xxxxxxx:secret:atlantis_gitlab_webhook_secret",
      "arn:aws:secretsmanager:ap-southeast-1:xxxxxxx:secret:atlantis_web_password"
    ]
    # Provide Atlantis permission necessary to create/destroy resources
    tasks_iam_role_policies = {
      AdministratorAccess = "arn:aws:iam::aws:policy/AdministratorAccess"
    }
  }
  service_subnets = local.service_subnets
  vpc_id          = aws_vpc.atlantis.id

  # ALB
  alb_subnets             = local.alb_subnets
  create_certificate      = false
  create_route53_records  = false
  certificate_arn         = data.aws_acm_certificate.infrastructure.arn
  certificate_domain_name = "atlantis.infrastructure.${local.root_domain}"
  route53_zone_id         = data.aws_route53_zone.infrastructure.zone_id
  tags                    = var.tags

  depends_on = [aws_subnet.private_atlantis, aws_subnet.public_atlantis]
}

resource "aws_route53_record" "atlantis" {
  zone_id = data.aws_route53_zone.infrastructure.zone_id
  name    = "atlantis.infrastructure.${local.root_domain}"
  type    = "CNAME"
  ttl     = 300
  records = [split("https://", module.atlantis.url)[1]]
}

```

As you can see, that module is really long, and you need to ensure provide enough parameter before applied, there are two thing you need concern inside this code

- You need create `ACM` (AWS Certificate Manager) and use `Route 53` (Currently, you must to use `Route53` to setup routing and domain). Following these articles to understand more

	1. [Medium - Creating SSL Certificates using AWS Certificate Manager (ACM)](https://medium.com/@sonynwoye/creating-ssl-certificates-using-aws-certificate-manager-acm-1c359e70ce4d)
	2. [Cloudflare - Partial (CNAME) setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup)

- Put that secret into ASM (AWS Secret Managers) to store your secret and retrieve that via terraform, secure and not leaking anything

	1. [Documentation Secret Manager](https://docs.aws.amazon.com/secretsmanager/)
    2. [AWS CLI](https://docs.aws.amazon.com/cli/latest/reference/secretsmanager/get-secret-value.html)

If you control everything is work, apply terraform workflow go live your `Atlantis` with `AWS Fargate`

![[Pasted image 20240804182548.png]]

![[Pasted image 20240804182635.png]]

Now access the URL which bind via `CNAME` of `Route53` and get access to `Atlantis` Web

![[Pasted image 20240804182839.png]]

## Add some specific configuration for Atlantis (Update)

To manipulate your Atlantis can retrieve any module from remote registry, such as GitLab, Terraform Cloud, ... This platform releases for us the method through environment variable, including

- [--tfe-hostname](https://www.runatlantis.io/docs/server-configuration.html#tfe-hostname): Hostname of your Terraform Enterprise installation to be used in conjunction. `e.g: gitlab.com`, but with default:  `app.terraform.io`
- [--tfe-token](https://www.runatlantis.io/docs/server-configuration.html#tfe-token): A token for Terraform Cloud/Terraform Enterprise integration. `e.g: glpat-xxxxxx` or `secret-manager:xxxxx`

Explore more about this configuration through article [Atlantis - Terraform Cloud/Enterprise](https://www.runatlantis.io/docs/terraform-cloud.html)

>[!info]
>If you know you know, Terraform offer us some methods to configuration that one, but you need to hand on with manually. Read more at: [CLI Configuration File (.terraformrc or terraform.rc)](https://developer.hashicorp.com/terraform/cli/config/config-file)

For example:

```bash title="~/.terraformrc"
credentials "gitlab.com" {
  token = "glpat-xxxxxxxxx"
}
```
# How `Webhook` work with `Atlantis`

Now we update `webhook` configuration in URL to your actually URL of `Atlantis`, try click test and you will see `HTTP 200` and that one really good, now you can use `Atlantis` in your Gitlab

![[Pasted image 20240804183104.png]]

When you create `PR`, you can see your bot or user which you set up in **Server Configuration** of `Atlantis` will response `plan` like this

![[Pasted-image-20240804183358.png]]

As you can see, `Atlantis` run `plan` in `root` directory, it means that find right path base on algorithm which I want

Externally, You can continue with `Atlantis` using comment with trigger `webhook`

- If you want to specific plan path, use `-d child/path` to select exactly location what you want. Read more at [atlantis plan](https://www.runatlantis.io/docs/using-atlantis.html#atlantis-plan)
- If your `plan` return expectation result, send comment `atlantis apply` to trigger apply, after finished with not problem `Atlantis` will auto close your `PR`. Read more at [atlantis apply](https://www.runatlantis.io/docs/using-atlantis.html#atlantis-apply)
- If you want to `destroy`, you can use `-destroy` flag, with `plan` command. Read more at [Using the -destroy Flag](https://www.runatlantis.io/docs/using-atlantis.html#using-the-destroy-flag)
- You have same command like `Terraform`, like `import` to import module you want to currently plan. Read more at [atlantis import](https://www.runatlantis.io/docs/using-atlantis.html#atlantis-import)
- You can relate with another command [atlantis state rm](https://www.runatlantis.io/docs/using-atlantis.html#atlantis-state-rm), [atlantis unlock](https://www.runatlantis.io/docs/using-atlantis.html#atlantis-unlock) and [atlantis approve_policies](https://www.runatlantis.io/docs/using-atlantis.html#atlantis-approve-policies)

With advantage feature of `Atlantis`, you can do more stuff to attack with customize deep inside this one

- [Server Side Repo Config](https://www.runatlantis.io/docs/server-side-repo-config.html#server-side-repo-config)
- [Custom Workflows](https://www.runatlantis.io/docs/custom-workflows.html)
- [Command Requirements](https://www.runatlantis.io/docs/command-requirements.html)

# Conclusion

![[meme-byebye.png|center]]

>[!done]
>That all for today, hope you find well with `Atlantis` and figure out what you need to do for setup `Atlantis` for yourself. `AWS` is come up with new idea and concept that why I need to catch up and feel free share that for you, happiness to do that. DM me if you meet any problems in setup `Atlantis`, I will feel free to take a seat and response LOL 😄

>[!quote]
>This week is not bad, learn something new and give my brain chill and recovery after `Kubewekend` , so if I not busy much, `Kubewekend` will return on the next weekend, one time again I really appreciate what your diligent to spend your time for reading my blog, therefore take care your health, stay safe, learn something new and I will see you on next week, bye bye 😄