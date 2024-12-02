---
title: Configuration CheatSheet
tags:
  - DIY
  - configuration-file
  - devops
  - admin
---
# terraform-docs

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