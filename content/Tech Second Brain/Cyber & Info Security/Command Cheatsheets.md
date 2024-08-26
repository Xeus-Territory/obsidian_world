---
title: "Info Security: Command Cheatsheets"
tags:
  - infosec
  - helpful
  - command
  - usage
---
>[!info]
>This page is place where I store command, configuration and moreover around information security.
# Nuclei

>[!info]
>Fast and customizable vulnerability scanner based on simple YAML based DSL.

[Github](https://github.com/projectdiscovery/nuclei) and [Documentation](https://docs.projectdiscovery.io/tools/nuclei/overview)

## Install `nuclei`

For install `nuclei`, you need to make sure your host installed golang, that is the fastest way to help you install `nuclei` for your host

```bash
go install -v github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest
```

Or you can try to install binary version from [release page](https://github.com/projectdiscovery/nuclei/releases) of `nuclei`

```bash
wget https://github.com/projectdiscovery/nuclei/releases/download/v3.3.0/nuclei_3.3.0_linux_amd64.zip

mkdir -p nuclei_unzip

unzip -d nuclei_unzip nuclei_3.3.0_linux_amd64.zip

sudo mv ./nuclei_unzip/nuclei /usr/local/bin

rm -rf nuclei_unzip nuclei_3.3.0_linux_amd64.zip
```

## Setup `nuclei-templates` for default

>[!info]
>I will become useful to cut off or you want specific your `nuclei-templates` and update that to become default templates of `nuclei` on run and target

```bash
nuclei -update-template-dir /path/to/your/nuclei-templates/
```

## Specific template and tags for scan with sort of endpoints

```bash
nuclei -tags lfi,ssrf,rce -t dast/vulnerabilities/ -l targets.txt
```

## Run `nuclei` with android app

With android platform, when you try to pentest this platforms, you will need bunch of tools to help you handle

- [apktool](https://apktool.org/docs/install/) : A tool for reverse engineering Android apk files
- [mobile-nuclei-templates](https://github.com/optiv/mobile-nuclei-templates) : `nuclei-templates` for mobile platforms

First of all, you need to reverse your `apk` to metadata and information include inside this target with `apktool`

```bash
java -jar apktool_2.9.3.jar d /path/to/apk -o /path/to/output_apktool
```

Now you can use `nuclei` to perform scanning inside output of `apktool`

```bash
# NOTE: Install mobile nuclei template with mobile inside your default nuclei-templates location
echo /path/to/output_apktool | nuclei -t mobile/
```