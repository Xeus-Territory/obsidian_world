---
title: Window Server 2019
tags:
  - packer
  - virtual-machine-image
  - devops
---
*The packer script which provide and implementation the windows server in Azure Cloud, access via `winrm` and self configuration for `powershell` script*

More information about Packer:

- [Azure Provider Packer](https://developer.hashicorp.com/packer/integrations/hashicorp/azure)
- [DevOps Training Session 12: Cloud - Packer](https://hackmd.io/0kn1HkeETeSsFOdMdGODhQ)
- [Azure DevOps Agents Provisioning](https://hackmd.io/@XeusNguyen/S1BrSRPW6#Window)

You can took the script to put on `provisioner` in [[Awesome Powershell scripts#Build Azure Agent with .NET Core by Powershell|Build Azure Agent with .NET Core by Powershell]]

```json
packer {
  required_plugins {
    azure = {
      source  = "github.com/hashicorp/azure"
      version = "~> 1"
    }
  }
}

variable "os_type" {
  type        = string
  description = "Type of VM to be used for Provisioning Image"
  default     = "Windows"
}

variable "image_publisher" {
  type        = string
  description = "Which Image Publisher to use for provisioning Image"
  default     = "MicrosoftWindowsServer"
}

variable "image_offer" {
  type        = string
  description = "Which Image Offer to use for Provisioning Image"
  default     = "WindowsServer"
}

variable "image_sku" {
  type        = string
  description = "Which Image SKU to use for provisioning Image"
  default     = "2019-Datacenter"
}

variable "image_version" {
  type        = string
  description = "Which Image Version to use for provisioning Image"
  default     = "latest"
}

variable "managed_image_name" {
  type        = string
  description = "Name of the image"
}

variable "managed_image_resource_group_name" {
  type        = string
  description = "Resource Group Which stores the image"
}

variable "location" {
  type        = string
  description = "Location of the image"
}

variable "vm_size" {
  type        = string
  description = "Size of the VM using for provisioning Image"
  default     = "Standard_B2ms"
}

variable "azure_tags" {
  type        = map(string)
  description = "Tags of image"
  default = {
    managed     = "packer"
    environment = "dev"
  }
}

variable "communicator" {
  type        = string
  description = "Which Communication Type to use for connection into VM"
  default     = "winrm"
}

variable "winrm_configuration" {
  type = object({
    winrm_insecure = bool
    winrm_timeout  = string
    winrm_use_ssl  = bool
    winrm_username = string
  })
  description = "Configuration for winrm to use"
  default = {
    winrm_insecure = true
    winrm_timeout  = "5m"
    winrm_use_ssl  = true
    winrm_username = "infrauser"
  }
}

variable "url_org" {
  type        = string
  description = "URL of organization where give access for pool"
  sensitive   = true
}

variable "auth_type" {
  type        = string
  description = "authentication type for pool"
  default     = "pat"
}

variable "azure_pat" {
  type        = string
  description = "Azure PAT"
  sensitive   = true
}

variable "pool_name" {
  type        = string
  description = "Name of agent pool"
}

variable "workdir" {
  type        = string
  description = "work directory for pool"
  default     = "C:\\agent\\"
}

variable "agent_name" {
    type = string
    description = "Name of agent"
}

locals {
  script_content = "${templatefile("${abspath(path.root)}/data/setup-automation-agent.tpl", {
    url      = var.url_org,
    auth     = var.auth_type,
    token    = var.azure_pat,
    pool     = var.pool_name,
    agent    = var.agent_name,
    workdir  = var.workdir
  })}"
}

source "azure-arm" "windows-machine" {
  use_azure_cli_auth                = true
  os_type                           = var.os_type
  image_publisher                   = var.image_publisher
  image_offer                       = var.image_offer
  image_sku                         = var.image_sku
  image_version                     = var.image_version
  managed_image_name                = var.managed_image_name
  managed_image_resource_group_name = var.managed_image_resource_group_name
  location                          = var.location
  vm_size                           = var.vm_size
  azure_tags                        = var.azure_tags
  communicator                      = var.communicator
  winrm_insecure                    = var.winrm_configuration.winrm_insecure
  winrm_timeout                     = var.winrm_configuration.winrm_timeout
  winrm_use_ssl                     = var.winrm_configuration.winrm_use_ssl
  winrm_username                    = var.winrm_configuration.winrm_username
}

build {
  sources = ["sources.azure-arm.windows-machine"]

  provisioner "powershell" {
    inline = [local.script_content]
  }
}
```