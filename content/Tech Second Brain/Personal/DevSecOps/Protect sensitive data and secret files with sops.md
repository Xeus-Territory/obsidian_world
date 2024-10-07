---
title: Protect sensitive data and secret files with sops
tags:
  - devsecops
  - devops
  - usage
  - whatis
  - infosec
---
>[!quote]
>Hi @all, It's me again 👋, how is your week ? Back again to my blog, this weekend, I want to sit with you to talk about how to keep your sensitive environment variables or secret files look secure, and able to put in repository. Let's digest
>

Before starting this week article, I already write about the some method to keep secret with `dotenv-vault`. Check it out at [[How can protect React secrets]]

# The Story

![[short-story-meme.png|center]]

>[!quote]
>*"When you work with any programs, web application or infrastructure, you always face and mess up with your sensitive environment variables or secret files, and you need to keep your secret not leaking anywhere. Honestly, This work will not gonna easily, and when you want to transfer those for your coworker, Is it gonna secure if you try to send message via `slack` or `teams`? In my perspective, no and no"*

Obviously, there are nothing to help you ensure your secrets, leaking or not? Therefore, you need to prepare, and saving for yourself something, like the armor for your secret things. 

Luckily, The opensource communities always don't make you disappoint with tons of things (tools, platforms and moreover) to enhance, protect, and you can put your secret gracefully into source code, such as

- [sops](https://github.com/getsops/sops): Simple and flexible tool for managing secrets
- [keywhiz](https://github.com/square/keywhiz): A system for distributing and managing secrets
- [ansible-vault](https://docs.ansible.com/ansible/latest/vault_guide/index.html): Protecting sensitive data with Ansible vaul
- [teller](https://github.com/tellerops/teller): Cloud native secrets management for developers - never leave your command line for secrets.

With me the brightness candidate for us today, we will work, and try to practice with `sops` because it's indeed lightweight and ease to install, setup and integration with wide range automation platforms and languages. Find and explore more about this one on next part 🤔
# What is sops?

![[sops-image.png]]

If you have first time to work with `sops`, you will have great experience to involve this tool through

- [SOPS - Documentation](https://getsops.io/docs/)
- [GitGurdian - A Comprehensive Guide to SOPS: Managing Your Secrets Like A Visionary, Not a Functionary](https://blog.gitguardian.com/a-comprehensive-guide-to-sops/)
- [Medium - Use SOPS and Terraform to create encrypt/decrypt files with AWS KMS](https://medium.com/@arunmrp90/use-sops-and-terraform-to-create-encrypted-decrypt-files-with-aws-kms-a38ac793518b)
## Introduce

>[!info]
><h2>SOPS</h2>
>
>An editor of encrypted files that supports YAML, JSON, ENV, INI and BINARY formats and encrypts with AWS KMS, GCP KMS, Azure Key Vault, age, and PGP

>[!note]
>SOPS was initially launched as a project at Mozilla in 2015 and has been graciously donated to the [CNCF](https://www.cncf.io/projects/sops/) as a Sandbox project in 2023, now under the stewardship of a [new group of maintainers](https://github.com/getsops/community/blob/main/MAINTAINERS.md).

SOPS brings us the ability to applying with multiple format file, you will ease to integrate to what ever file you want. The enhancement of SOPS will come from the interactive between SOPS and Cloud Platform

![[Pasted image 20241013155100.png]]
<div align="center">
	<p style="text-align: center;"><a href="https://twitter.com/sec_r0?ref=blog.gitguardian.com">Source:  @sec_r0</a></p>
</div>

As you know, **Cloud Platforms** already submit the crucial role for any programming product around the world, that brings faster, more convenient and easier to operate. SOPS borns to receive the supportive from cloud platform to ensure about encrypting and decrypting your sensitive being smoothly, and automatically.

>[!question]
>How to SOPS can doing this stuff ? This one will absorbing question

## How to SOPS encrypt/decrypt?

Following the documentation, you will figure out [the way to SOPS handle encrypt/decrypt](https://getsops.io/docs/#encryption-protocol) through their encryption protocol

- It means they use [GenerateDataKey Function](https://github.com/getsops/sops/blob/365d9242f26b308bee98fae01057e57f2e67a1a8/sops.go#L596) to generate 32Bytes = 256Bits data key, and leverage Cloud Platform Key Managment, such as **AWS KMS**, **Azure Keyvault**, ... to encrypt this data key, but also they use with [PGP](https://www.openpgp.org/)

- The encryption progress will not having any touch by human intervention, It will automatically retrieve from your profile configuration to specific the information which was provided by you. 

- When SOPS complete encryption progress, it will open a text editor and save to new file. Upon save, SOPS browses the entire file as a key/value tree. Every time SOPS encounters a leaf value (a value that does not have children), it encrypts with the value with `AES256_GCM` using the data key and a 256 bit random initialization vector.

- Each file uses a single data key to encrypt all values of a document, but each value receives a unique initialization vector and has unique authentication data.

- Additional data will be ensured the integrity of the encrypted data and tree structure with encryption key, and concatenated into a byte string that is used as **AEAD additional data (aad)** when encrypting values

In additional, SOPS uses [MAC (Message Authentication Code)](https://getsops.io/docs/#message-authentication-code) to ensure the integrity of data, MAC will configure below structure `sops --> mac`, and you make a change with `--mac-only-encrypted` or inside `.sops.yaml`

>[!quote]
>Honestly, With to knowing how the work of SOPS, It does tough choice as hit a wall, because SOPS stands below the method to encrypt and key exchange, that totally make SOPS to become potential candidate when you think about secret distributing

## The SOPS threaten

>[!quote]
>SOPS also still **humble**, they commit their encryption is strong as weakest cryptographic mechanism 😄. I don't know actual mean but they give us the vision about SOPS can be threaten by other factors
>
>*"The security of the data stored using SOPS is as **strong as the weakest cryptographic mechanism**. Values are encrypted using AES256_GCM which is the strongest symmetric encryption algorithm known today. Data keys are encrypted in either KMS, which also uses AES256_GCM, or PGP which uses either RSA or ECDSA keys."*

You can find out some scenarios attacking to SOPS which referred by maintainers

- [Compromised AWS credentials grant access to KMS master key](https://getsops.io/docs/#compromised-aws-credentials-grant-access-to-kms-master-key)
- [Compromised PGP key](https://getsops.io/docs/#compromised-pgp-key)
- [Factorized RSA key](https://getsops.io/docs/#factorized-rsa-key)
- [Weak AES cryptography](https://getsops.io/docs/#weak-aes-cryptography)

>[!quote]
>With no one any products or opensources can be enhance and protect your sensitive data 100% secure, your behavior and mindset will make decision to your data being secure or not, zero trust with anything else, It's certainly tough but truth 😏
# Practice Session

>[!question]
>In this practice session, I think we will focus to use `sops` with cloud service, and [AWS KMS](https://aws.amazon.com/kms/?nc1=h_ls) can surely ease to approach with [small price](https://aws.amazon.com/kms/pricing/) around 1$ for pay as you go, and free if you are on `free-tier` of AWS Program


![[Pasted image 20241013142937.png]]
<div align="center">
	<p style="text-align: center;"><a href="https://www.middlewareinventory.com/blog/using-sops-with-aws-kms-encrypt-and-decrypt-files-devops-junction/">Source: Using SOPS with AWS KMS - Encrypt and Decrypt files | Devops Junction</a></p>
</div>

You can read about this concept of practice through [Linkedin - Protect sensitive information with Mozilla SOPS and AWS KMS](https://www.linkedin.com/pulse/protect-sensitive-information-mozilla-sops-aws-kms-vin%C3%ADcius/)
## Install SOPS

You have multiple ways to install SOPS, such as

- [Use Source Code](https://getsops.io/docs/#development-branch)
- [Use Compile Release](https://github.com/getsops/sops/releases) - Recommended

With compile release, you can install `sops` via script

```bash
# Download the binary
curl -LO https://github.com/getsops/sops/releases/download/v3.9.1/sops-v3.9.1.linux.amd64

# Make the binary executable
chmod +x sops-v3.9.1.linux.amd64

# Move the binary in to your PATH
sudo mv sops-v3.9.1.linux.amd64 /usr/local/bin/sops
```

And now you can use `sops` in your shell, validate itself with `--version` command

```bash
~ ⌚ 15:58:53
$ sops --version
sops 3.9.1 (latest)
```

## Create KMS Key

To help your `sops` can retrieve KMS, you need to ensure two things

- Provide `SOPS_KMS_ARN` - The arn of your KMS Key
- Provide `AWS_CREDENTIALS` - Your AWS Credentials through [AWS Profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) or [Environment variables](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html)

But first of all, you need to go to your AWS Web Portal and create one KMS Key for your own

After login in to your AWS, Search AWS KMS in your search bar

![[Pasted image 20241013160810.png]]

You need to click to `customer-managed-key` in left panel to create your customize key, and click to `create-key` button

>[!info]
>Remember, you can provide IAM users and roles if you want, but to ease usage, you can reuse your IAM users with permission to manage this AWS Key, and easily to retrieve this one. But, you can't set the that one, and your key will be allowed for all services in current AWS Account

![[Pasted image 20241013161607.png]]

```json title="kms-policy-with-no-iam"
{
    "Id": "key-consolepolicy-3",
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Enable IAM User Permissions",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::xxxxxxxxxx:root"
            },
            "Action": "kms:*",
            "Resource": "*"
        }
    ]
}
```

```json title="kms-policy-with-iam"
{
    "Id": "key-consolepolicy-3",
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Enable IAM User Permissions",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::xxxxxxxxx:root"
            },
            "Action": "kms:*",
            "Resource": "*"
        },
        {
            "Sid": "Allow access for Key Administrators",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::xxxxxxxxx:user/xeus.n"
            },
            "Action": [
                "kms:Create*",
                "kms:Describe*",
                "kms:Enable*",
                "kms:List*",
                "kms:Put*",
                "kms:Update*",
                "kms:Revoke*",
                "kms:Disable*",
                "kms:Get*",
                "kms:Delete*",
                "kms:TagResource",
                "kms:UntagResource",
                "kms:ScheduleKeyDeletion",
                "kms:CancelKeyDeletion",
                "kms:RotateKeyOnDemand"
            ],
            "Resource": "*"
        },
        {
            "Sid": "Allow use of the key",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::xxxxxxxxx:user/xeus.n"
            },
            "Action": [
                "kms:Encrypt",
                "kms:Decrypt",
                "kms:ReEncrypt*",
                "kms:GenerateDataKey*",
                "kms:DescribeKey"
            ],
            "Resource": "*"
        },
        {
            "Sid": "Allow attachment of persistent resources",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::xxxxxxxxx:user/xeus.n"
            },
            "Action": [
                "kms:CreateGrant",
                "kms:ListGrants",
                "kms:RevokeGrant"
            ],
            "Resource": "*",
            "Condition": {
                "Bool": {
                    "kms:GrantIsForAWSResource": "true"
                }
            }
        }
    ]
}
```

And click `create`, and you will have key for your own. You can retrieve `arn` when you click to your key and view information

```bash
arn:aws:kms:ap-southeast-1:xxxxxxxxx:key/GUID_KEY
```

Now back to your shell, and try to export twice information which I relate in the head of session

```bash
# AWS Credentials, where KMS Key exist
export AWS_ACCESS_KEY_ID=xxxxxxxxx
export AWS_SECRET_ACCESS_KEY=xxxxxxxxx
export AWS_DEFAULT_REGION=ap-southeast-1

# SOPS_KMS_ARN
export SOPS_KMS_ARN="arn:aws:kms:ap-southeast-1:xxxxxxxxx:key/GUID_KEY"
```

>[!done]
>At the moment, you are successfully configuring for your SOPS. You can enhance your configuration with more detail through `.sops.yaml` but not actually needed in this time

## Try to encrypt and decrypt with sops

SOPS will provide us through interface or option, what ever you can call with SOPS CLI to handle for encrypt and decrypt action, you can get the manual with `--help` with each option

```bash
# Get help of encrypt option
sops encrypt --help

# Get help of decrypt option
sops decrypt --help
```

Now create for your own, one sensitive file with `json` or `yaml`, for example

```json title="example_plain.json"
{
  "key1": "supersecret",
  "key2": "sensitive"
}
```

Encrypt this file with `sops`, you can use command

```bash
sops encrypt example_plain.json
```

You will receive with output in your shell with encryption data, and locale where `kms` retrieving, and `mac` encryption

```bash
{
  "key1": "ENC[AES256_GCM,data:spruCtY4whEhnxQ=,iv:8XHTgKyTuEFGpYkzmbJeyaCyz2GUDKP/mQac9BVeqUs=,tag:krk23V335k9t2HqXPZWBzA==,type:str]",
  "key2": "ENC[AES256_GCM,data:EbBGVTSQLSS6,iv:DHojauQ12Hpbe9PGOg8VG8LECDx6UUc0IDvuEPRISVA=,tag:PysoXf+Ytj/RXJl4ZheFHg==,type:str]",
  "sops": {
    "kms": [
      {
        "arn": "arn:aws:kms:ap-southeast-1:xxxxxxxxx:key/GUID_KEY",
        "created_at": "2024-10-13T09:34:26Z",
        "enc": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "aws_profile": ""
      }
    ],
    "gcp_kms": null,
    "azure_kv": null,
    "hc_vault": null,
    "age": null,
    "lastmodified": "2024-10-13T09:34:27Z",
    "mac": "ENC[AES256_GCM,data:R42dOP3RGnYq6zhYdwVRz5r9xlUH/SV32apnghG7tCVFBMuFJzCfDaRByj7zyPzZ3inB7PPZh7tf/EOSUeegiqGt7qYgsBnRDgOjZAEJbXeF361ya4rHyG68Qq/a8FedFFkUmMt+0r9KRgReB4Bw2IoXSW2O6H5He3VidPB5TT4=,iv:q4TvDqFBqBvUQ2pkxsMHt/Q019elNgK3Hm9fe/AK1vE=,tag:qbWxoCJ2lBxuRFYSTK1xbQ==,type:str]",
    "pgp": null,
    "unencrypted_suffix": "_unencrypted",
    "version": "3.9.1"
  }
}
```

If you want output that one, you can try to use `--output` or `>` to export new file encrypt what you want

```bash
# Use --output
sops encrypt example_plain.json --output example_enc.json

# Use > (output functionality)
sops encrypt example_plain.json > example_enc.json
```

BTW, you can try to manipulate your output with `--output-type`, it means you can convert the encryption to storing in another format `json, yaml, dotenv and binary`

```bash
sops encrypt example_plain.json --output-type yaml --output 
```

With decrypt, you can use in same way by exchange the `encrypt` --> `decrypt` with encrypt file

```bash
# To stdout
sops decrypt example_enc.json

# To file
sops decrypt example_enc.json > example_plain_dec.json
```

>[!done]
>That's all stuff you need involve to encrypt and decrypt with KMS. To more configuration, you can try to use with `.sops.yaml`
>

## Advantage encrypt/decrypt with KMS

**About using `.sops.yaml`** 

You can do sort of thing with more configuration through `.sops.yaml` but almost for to use one or more KMS key with specific cases to encrypt, it means you want to encrypt type of file with each KMS, you can handle in that one. Read more at [Using .sops.yaml conf to select KMS, PGP and age for new files](https://getsops.io/docs/#using-sopsyaml-conf-to-select-kms-pgp-and-age-for-new-files)

**About using SOPS across AWS Account**

One more things, I think you should concern about [Assuming roles and using KMS in various AWS accounts](https://getsops.io/docs/#assuming-roles-and-using-kms-in-various-aws-accounts), SOPS can help you provide the role inside `encrypt` file to specific role your shell or agent in-use to decrypt your SOPS Encrypt file, It's actual useful when you have KMS for across AWS Account.

You can actual provide it via `--kms` or `SOPS_KMS_ARN` variables with specific ARN of role after `+` sign, for example

```bash
export SOPS_KMS_ARN="arn:aws:kms:ap-southeast-1:xxxxxxxxx:key/GUID_KEY+
arn:aws:iam::927034868273:role/sops-dev-xyz"
```

# Integrate SOPS to Terraform

You can try SOPS to becoming the integration tool to help you involve and store your secret for Terraform, It means you can store your SOPS Encrypt file inside your source code, and implement [SOPS Provider](https://registry.terraform.io/providers/carlpett/sops/latest/docs) to retrieve that one to your Terraform Code

It's bring you more value and ease to maintain your Terraform Code

- No use any more `tfvars` to store your secret
- Ease to delivery to CI/CD with no more configuration about variables

![[Pasted image 20241013170907.png]]
<div align="center">
	<p style="text-align: center;"><a href="https://stratusgrid.com/blog/version-your-secrets-in-git-using-sops">Source: SOPS Encryption: How to Manage Your Secrets In Git With SOPS</a></p>
</div>

You can easily configure `sops` providers, like

```bash title="providers.tf"
terraform {
  required_version = ">= 1.5"
  required_providers {
    sops = {
      source  = "carlpett/sops"
      version = "1.1.1"
    }
  }
}

provider "sops" {
}
```

Setup the data to get secret value from your source code with KMS Integration

```bash
# Get value from secrets/environment configuration YAML file
data "sops_file" "app-env" {
  source_file = "./env/app-env"
}
```

You will have two output style to call that `data` block in your Terraform, you can choose one of them and it's totally on your implementation

```yaml
local {
	# Call via map of data
	map_password = data.sops_file.demo-secret.data["db.password"]

	# Call via terraform object
	object_password = jsondecode(data.sops_file.demo-secret.raw).db.password
}
```

>[!done]
>As you can see, Terraform support good with SOPS, and now you are having one more tools to enhance and storing secure variables with Terraform 🙌

# Conclusion

![[byebye.png|center|500]]

>[!done]
>That all, I hope you have great journey to learn some more new tools, and more technique to keep your workflow smoothly and secure your workspace. Now you can try to implement SOPS, and try to managing in the good way with sensitive data with SOPS and your cloud platform, such as AWS KMS. I think with good leverage of cloud platform, you will have many and many opportunities to adapt with new workflow to your project, and It make sense with technological nowaday 😃
>

>[!quote]
>There is a good week to sit back and learn new things, that's actually happen and I try to learn and capture about this one. To go further, gaining more knowledge is required, and this is a chance to doing something great, therefore, with your supportive, I will try put in more effort, and bring more value knowledge for our community, I feel grateful with your reading. So my readers, I hope you stay safe, learn something new and we will meet against in next weekend. Bye Bye 👋