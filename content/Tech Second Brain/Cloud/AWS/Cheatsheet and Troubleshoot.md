---
title: AWS Cloud Cheatsheet and Troubleshoot
tags:
  - cheatsheet
  - helpful
  - cloud-services
  - aws
---
# Which reason do you concern AWS ?

![[Pasted image 20240801094225.png]]

>[!quote]
>The big reason why i choose AWS about unique idea of maintainer and developer from AWS company put inside their services. They give me other perspective to create, control and manage service, and that is creating the difference between `aws` and `azure`. Especially, this cloud have some strange service and practice with it help me have more knowledge, and that why I concern to choose `AWS` and one more thing huge community stand behind will help you resolve any problems, for sure.
>
>If I concern about `aws` and `azure`, I will choose one of them depend on what I need to do. About trying to operate service like web dynamic - static, DB and container app, I will choose `azure`, and in another task, if I want to practice with secrets management, simple storage as S3, Queue message, ... I will choose `aws` for alternative

You can figure what you need to do for start with `aws` via some website and article

- [AWS Documentation](https://docs.aws.amazon.com/)
- [AWS Training](https://www.aws.training/)
- [AWS Architecture Center](https://aws.amazon.com/architecture/)
- [AWS CLI - Installation Guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) 
- [AWS CLI - Command Guide](https://awscli.amazonaws.com/v2/documentation/api/latest/index.html)
- [AWS Create Account Guide](https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-creating.html)
- [AWS Price Calculator](https://calculator.aws/#/)

You can manage `aws` as organization via the tree and sub-organization inside root account

![[Pasted image 20240801100407.png]]

So enjoy what you need, inside the article will share about how you CLI, cheatsheet, collection of useful article around `aws`. Externally, In `AWS` , I will share about some others topic, such as **Services**, **Certificates** and more about **Best Practice**
# AWS CLI

>[!question]
>You need to export some configuration before you can use `awscli`, such as
>- AWS_ACCESS_KEY_ID (Obligatory)
>- AWS_SECRET_ACCESS_KEY (Obligatory)
>- AWS_SESSION_TOKEN (If you have)
## S3

>[!warning]
>With `s3` some situation i set it up `--endpoint-url` it mean i use `localstack` for virtualization `aws` cloud on my machine, so keep mind and skip the flag if you want to applied to your `aws` cloud

### Create the bucket

```bash
aws --endpoint-url=http://localhost:4566 s3api create-bucket --bucket sample-bucket
```

### List the object in the bucket

```bash
aws --endpoint-url=http://localhost:4566 s3 ls s3://sample-bucket/
```

### Upload the object from directory to bucket, with single file or multiple files

```bash
# Upload only one file or dir
aws --endpoint-url=http://localhost:4566 s3 cp file|dir s3://sample-bucket

# Upload multiple
aws --endpoint-url=http://localhost:4566 s3 cp file|dir s3://sample-bucket --recursive
```

### Read contents inside bucket

```bash
aws --endpoint-url=http://localhost:4566 s3 cp s3://sample-bucket/file -
```

## STS

### Get caller identity to detect `whoami` or `role`

```bash
aws sts get-caller-identity
```

### Assume role with web-identity

```bash
aws sts assume-role-with-web-identity \
--role-arn arn:aws:iam::xxxxx:role/rolename \
--role-session-name <what-ever-you-want> \
--web-identity-token $TOKEN # mostly token is JWT Format
```

## ECS

### List task inside ECS Cluster

```bash
aws ecs list-tasks --cluster <name-cluster>
```

### Execution command

>[!warning]
>In this part you need to confirm two thing to install inside cluster and your machine

In your machine, need to install `session-manager-plugin`. Use `curl` command to download

```bash
curl "https://s3.amazonaws.com/session-manager-downloads/plugin/latest/ubuntu_64bit/session-manager-plugin.deb" -o "session-manager-plugin.deb"
```

 In your task, you need enable feature execute-command if not

```bash
aws ecs update-service \
--cluster <cluster-name> --service <service-name> \
--enable-execute-command --force-new-deployment
```

And now if you confirm two thing about you can use execution to inject something inside container

```bash
aws ecs execute-command --cluster <cluster-name> \
--container <name-container> --interactive --task <task-arn> \
--command <your/command>
```

## ECR

### Get login password of your ECR

```bash
aws ecr get-login-password
```

### Login to your ECR

```bash
aws ecr get-login-password | crane auth login -u AWS --password-stdin <url-ecr>
```

## EKS

### Get token of cluster

```bash
aws eks get-token --cluster-name <name>
```

## SQS

###  Retrieve message from queue

```bash
aws sqs receive-message \
--queue-url <sqs-url> \
--attribute-names All --message-attribute-names All \
--max-number-of-messages 10
```

## SNS

### Subscribe `webhook` with SNS

Use can use two platform to generate endpoint

- [Beeceptor](https://beeceptor.com/) : API Mocking
- [Webhook.site](https://webhook.site/) : Generates free, unique URLs and e-mail addresses and lets you see everything that’s sent there instantly. (Usage: Steal cookies, bypass authorized, …)

```bash
aws sns subscribe \
    --topic-arn <topic-arn> \
    --protocol https \
    --notification-endpoint <endpoint>
```

## Cognito-identity

### Get Identity

```bash
aws cognito-identity get-id --identity-pool-id <identity-pool-id>
```

### Get Credential

```bash
aws cognito-identity get-credentials-for-identity --identity-id <identity-from-get-identity>
```

### Get Open ID Token

>[!note]
>Use when you receive `open-id` token to retrieve the credential to access AWS

```bash
aws cognito-identity get-open-id-token --identity-id <identity-from-get-identity>
```

## Configure

### Set credential for profile

```bash
aws configure --profile <profile-name>
```

And easily you can temporarily switch profiles with export to environment variable

```bash
# V1
export AWS_DEFAULT_PROFILE=<profile-name>
# V2
export AWS_PROFILE=<profile-name>
```

# Helpful articles

- [Medium - ECS (Fargate) with ALB Deployment Using Terraform — Part 3](https://medium.com/the-cloud-journal/ecs-fargate-with-alb-deployment-using-terraform-part-3-eb52309fdd8f)
- [Medium - Creating SSL Certificates using AWS Certificate Manager (ACM)](https://medium.com/@sonynwoye/creating-ssl-certificates-using-aws-certificate-manager-acm-1c359e70ce4d)
