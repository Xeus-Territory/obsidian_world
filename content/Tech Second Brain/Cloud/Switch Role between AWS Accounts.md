---
title: "Cloud IAM 101: Switch Role between AWS Accounts"
tags:
  - devops
  - aws
  - cloud-services
  - usage
  - terraform
---
>[!quote]
>Hi @all, a second article for this week 🙌 and I think write about `Terraform` to control over AWS Accounts is not bad, sometime this can be one of solution to handle a big organization with `Assume Role` and apply it for `Terraform`. Let's digest and get more experience.

# The big problem

When you try to handle with Big Cloud Platform, such as Azure, AWS and GCP is really different in services, but especially in organization structure. Therefore, you need to take the look for these articles, and give best insight about that one

- [Account Structure Comparison between AWS and Azure](https://www.linkedin.com/pulse/account-structure-comparison-between-aws-azure-richard-lenan-zhao)
- [AWS, Azure, and GCP: The Ultimate IAM Comparison](https://www.zippyops.com/aws-azure-and-gcp-the-ultimate-iam-comparison)

![[Pasted image 20240920135818.png]]

As you can see, `AWS` and `GCP` look like more simple  than `Azure`, but whole the structure have different level to give the control services and resources in Cloud

- **AWS**: Control over resource and services inside **AWS Accounts**, to handle organization you need to tackle with exchange between them through **IAM Account**
- **Azure**: Resources and Services operate inside **Resource Group** but with one user you can have multiple subscription, to exchange between the resource, you should exchange between **Subscription**.
- **GCP**: Control over inside **Project** stand below **Organization** (NOTE: Not familiar with GCP)

>[!question]
>Therefore, one of big problem come up when you try to expand your directory or organization, that one will create complex in control over them through Infrastructure as code (E.g Terraform). That why when you head to handle multiple them, Cloud create some of methodology to handle that problem

>[!quote]
>I am not having any experience with GCP, so I will skip for not take your time

With AWS, they provide us some methodology and look like kind of unique

![[Pasted image 20240921151343.png]]

- [Assume Role](https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html) - Assume role to access another resource in different AWS Accounts
- [AWS Management Console as an IAM user](https://docs.aws.amazon.com/signin/latest/userguide/introduction-to-iam-user-sign-in-tutorial.html) - Use multiple IAM User for each AWS compatible account 
- [IAM Identity Center](https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html) - Centralized management AWS Account for user with right permission. You can check this one from my article [[AWS SSO from Self Gitlab Terraform Module Registry#AWS SSO|AWS SSO]]
- If you want more special thing, I will suggest about [AWS Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/authentication.html) through UserID inside pool

With Azure, The story can become more complex but really awesome

![[Pasted image 20240921151646.png]]

- [Azure AD](https://learn.microsoft.com/en-us/entra/identity/) - Use for control access User and Groups with Azure Cloud, and for with best efficiency Azure have [Tenant](https://learn.microsoft.com/en-us/entra/fundamentals/whatis#:~:text=a%20credit%20card.-,Tenant,-A%20dedicated%20and) to represents a single organization and is intended for managing your employees, business apps, and other internal resources. Read more about [Entra](https://learn.microsoft.com/en-us/entra/fundamentals/what-is-entra) and [Entra ID](https://learn.microsoft.com/en-us/entra/fundamentals/whatis)
- [App Registration](https://learn.microsoft.com/en-us/security/zero-trust/develop/app-registration) - Represent for methodology to execution from your CLI, your application with secret provider to authentication your environment and try to connect with Azure, Microsoft 365, Microsoft Graph, and more. (NOTE: IYKYK about [Service Principle](https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals?tabs=browser))
- [Managed Identity](https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview) - Methodology to help your Azure resources or internal inside Entra can authentication to Azure Cloud with role assignment through RBAC.

>[!done]
>Corresponding to each method, `Terraform` try to adapt each one to become way to help your `terraform` communicate with AWS or Azure, let see what do we got first with `AWS` through assuming role

# Assume Role with AWS

![[Pasted image 20240921153121.png]]
<div align="center">
	<p style="text-align: center;">Assume role with AWS</p>
</div>

>[!quote]
>If I relate about whole methodology to authentication, this one will take over a days to read 😄. But I think about **Assume Role**, that one is seem cool for us on trying switch between account, and one of ways recommended by AWS. 

Therefore before starting, you need to check about articles because I think those ones will cover my proposal to hanging on

- [Switch from a user to an IAM role (console)](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-console.html)
- [Methods to assume a role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_manage-assume.html)
- [Youtube - Grant access across different AWS accounts using IAM roles. (AWS Cross Accounts & Assume Role)](https://www.youtube.com/watch?v=Xo-7VySEm7o&ab_channel=CLOUDVANI)
- [Youtube - How to Switch Roles in the AWS Management Console](https://www.youtube.com/watch?v=BfE2G-fsBNU&ab_channel=TinyTechnicalTutorials)

## Prerequisite

To try this lab, you need to get and do to get one of these requirements below

1. First of all, you need to try to create one of **AWS Account (Root)**, and you can follow the method in this [AWS Create Account Guide](https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-creating.html) to create one for you
2. Next, Because your AWS Account with tag **Management Account** will stay in **Root** Organization, so you don't need have create another organizations. You just need to create one other **AWS Account**, and I think [Creating a member account in an organization with AWS Organizations Guide](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_create.html) can be useful
3. Last one, you need to add one of IAM User to your **Root AWS Account** to practicing. Following [Create an IAM user in your AWS account Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) to create one for yourself. 
 
>[!note]
>Remember you need to access to lab with account not your root, that will gonna work because `root` account will have highest permission.

![[Pasted image 20240921161343.png]]

![[Pasted image 20240921162008.png]]

## Test and validate new AWS Account

If you attend when you try create AWS Account, AWS will auto-generated role `OrganizationAccountAccessRole`, and that give you a change to switch role for get experience 😄

When you try login to `console` with IAM User, you will see the button **Switch Role** inside your account management tab

![[Pasted image 20240921162640.png|center]]

And so you try click to **Switch Role**, AWS will redirect you to switch role page, and now provide a little bit information to create profile to switching

![[Pasted image 20240921162855.png]]

You need to fill some information, such as

- **Account ID** - ID of AWS Account you want to switch, that one can find inside your place, you create `AWS Accounts`
- **IAM role name**  - `OrganizationAccountAccessRole` **(Default)**
- **Display Name** - What ever you want to representing this switching
- **Display Color** - What color to use for distinguished from different switching

![[Pasted image 20240921163317.png|center]]

But `OrganizationAccountAccessRole` have problem because that give you highest permission - `AdministratorAccess`  to access different account, sometime it's not good for us in controlling secure, reliable and moreover things.

>[!quote]
>That why, when you first to set up IAM User and try to give highest permission for account, It means you give user a way to switch to another account in your organization, create and control resource, that reason why you will mess up with organization management when it expand. And this reason why you have [AWS Identity Center](https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html), so come take the look with my article about topic at [[AWS SSO from Self Gitlab Terraform Module Registry]]

## How the switch role work

The reason why you can switch role easily, because my `IAM User` has assigned with `AdministratorAccess` policy, and It means you will receive the full `sts` permission include assume your role

![[Pasted image 20240921165133.png]]

Let give a try, you use Root AWS Accounts, and try to remove `AdministratorAccess` access through account, and now you will not switch to any account in your organization

![[Pasted image 20240921165501.png]]

Ask you can see, you can't and that why give `AdministratorAccess` cause some stuff make mess up your AWS Account, and can't control anything else. Therefore, let's create a suitable policy to switch your account again

1. First of all, you need to access **IAM Services**, choose **Policies** **(NOTE: Use Root Account because your IAM User is not available to doing anything in IAM Services 😏)**
2. Next, Choose **Create Policy**, and select `STS` service to create assume-role policy
3. In `STS`, Choose `Write` and Check `Assume Role`
4. Now you have two option, set `specific` of policy with providing `arn` or you set `all` to you as `*` wildcard resources. With me set `arns` to restrict and choose only some role with suitable permission. Choose `Other Account` --> Add Account ID and Role

![[Pasted image 20240921211722.png]]

5. After you create policy successfully, and now you can this policy to IAM Account and try switch role again (Result: You will have permission again 😄)

![[Pasted image 20240921212231.png]]

>[!quote]
>As you can see, you can assume role to not only current account, and for many account if you know about `role` created from other account side, and give trusted resources for your account to assume, and result is connected and anything make sense.

![[Pasted image 20240921212750.png]]

>[!quote]
>You have more way to create, and select trusted entity for your role inside IAM Service, that make AWS become more interesting with authentication method, and provide a good environment to keep your organization have structure, and stable, honestly to say that as good compared with Azure. Explore more about AWS IAM Roles
>- [IAM roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html)
>- [IAM role creation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create.html)

# Combination AWS Assume Role with Terraform

Nowadays, Infrastructure as Code (IaC) is becoming one of important part when try to operate infrastructure with Cloud provider, and Why not if we combination between AWS Assume Role, and `Terraform` to control multiple AWS Accounts with anything gonna easy than ever

We will separate `Terraform` block to become two things need cloud authentication, including

- [Terraform Backend](https://developer.hashicorp.com/terraform/language/backend) - If you choose another cloud to keep your `tfstate`, you need to concern about use role to access through AWS Account to `S3` for example
- [Terraform Providers](https://developer.hashicorp.com/terraform/language/providers) - Locate to `Terraform` to connect and provision the infrastructure

When you try to connect to [AWS Terraform Providers](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) in [Authentication and Configuration](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#authentication-and-configuration) part that one give you some advice to help you connect to AWS Account, and one of method is about using via **Assume Role**

![[Pasted image 20240921215248.png]]

Usually, when you try to run `terraform`, you need export `access_key`, `secret_key` to your host or assign inside `aws` providers to authenticating your host

```bash
provider "aws" {
  region     = "us-west-2"
  access_key = "my-access-key"
  secret_key = "my-secret-key"
}
```

```bash
export AWS_ACCESS_KEY_ID=xxxxxxx
export AWS_SECRET_ACCESS_KEY=xxxxxxxxx
export AWS_DEFAULT_REGION=xxxxxxxxx
```

But if you have multiple account, you need to manipulate between switch IAM User, and it really not good because when you try to `assumerole`, that not return easy way to help you directly using it, and you need to handle export one time again

```bash
# Example
aws sts assume-role --role-arn arn:aws:iam::123456789123:role/myAwesomeRole --role-session-name test --region eu-central-1
```

```json
{
    "Credentials": {
        "AccessKeyId": "someAccessKeyId",
        "SecretAccessKey": "someSecretAccessKey",
        "SessionToken": "someSessionToken",
        "Expiration": "2020-08-04T06:52:13+00:00"
    },
    "AssumedRoleUser": {
        "AssumedRoleId": "idOfTheAssummedRole",
        "Arn": "theARNOfTheRoleIWantToAssume"
    }
}
```

In my opinion, you need to try export  `access_key`, `secret_key`, `session_token`  one time again, and this can become really tired. I know we can run it [one line command](https://stackoverflow.com/questions/63241009/aws-sts-assume-role-in-one-command)

![[Pasted image 20240921223349.png]]

But I can convenient to say `Terraform` take care it for us, really good and easily way

```bash
terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      version = "5.67.0"
      source  = "hashicorp/aws"
    }
  }
  backend "s3" {
    bucket = "mybucket"
    key    = "path/to/my/key"
    region = "us-east-1"
    assume_role = {
      role_arn     = "arn:aws:iam::123456789123:role/myAwesomeRole"
      session_name = "value"
    }
  }
}

provider "aws" {
  dynamic "assume_role" {
    for_each = var.isLocal ? [] : [1]
    content {
      role_arn     = "arn:aws:iam::123456789123:role/myAwesomeRole"
      session_name = "value"
    }
  }
}
```

As you can see, both `backend` and `providers` block has `assume_role` entry give us opportunity to assign expected role for helping `terraform` try to connect right place.

>[!note]
>It means you just need connect for only account, and assume role will automatically take care part for cross account if your profile have permission to assume role

There are two case you can do to making your customization with assume role become perfect, including

- Use `dynamic` block for assume role, it mean you can try more flexible way to use `assume_role` or not. Explore more at [How to make provider assume_role block conditional](https://stackoverflow.com/questions/66473337/how-to-make-provider-assume-role-block-conditional)
- Create `backend` config file to help step `init` retrieve right expectation `backend` but not increase the complicated your `terraform` because with `backend` you can't specific your variable inside block. Explore more at ["Variables may not be used here" during terraform init](https://stackoverflow.com/questions/65838989/variables-may-not-be-used-here-during-terraform-init)

That why you can create `backend.conf` file and mapping the value inside `s3` block or `azurerm` with specific value in each type

```bash title="backend.conf"
assume_role = {
  role_arn     = "arn:aws:iam::123456789123:role/myAwesomeRole"
  session_name = "value"
}
```

And run `terraform init` with specific `backend` configuration

```bash
terraform init -backend-config=backend.conf
```

Take same but more flexible to help you switch between multiple role-arn in specific case, automation in pipeline or use `Atlantis` to provisioning your AWS, Azure or moreover clouds
# Conclusion

![[byebye.png|center|500]]

>[!done]
>This is @all for article, really things of thing when I try to learn and adapt something new for project. `IAM` is such great thing with Cloud Services, any cloud will have different way to getting in. Hope this article bring you good things, more value and efficiency to help you reduce complex and increase flexible in `Terraform` to manage multiple AWS Accounts

>[!quote]
>Nothing gonna occur with learning something new in the weekend, I hope you spend a good time for read my blog. I am happy to see my community grow up every day, and this one push me more active to release and learn every week, therefore stay safe, learn something new and see yeah in next weekend. Don't forget to check [[Build mobile with Expo (Part 2)]] - second article in this weekend, see yah 🙌