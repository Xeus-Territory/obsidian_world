---
title: Vault and Keycloak - The combination for rotation Vault Token
tags:
  - devops
  - tech
  - automation
  - vault
---

>[!quote]
>Hi @all, It's me again and It's been a while after I chill out and enjoy the technologies, so I turn back and today I will talk about `Vault`, Identity Server like `KeyCloak` which provide `OIDC` Authentication methods for accessing Vault, How can we use this combination for rotating vault token. One more time, happy to see you here and now let's digest what we got today 🙌

# Problem and What things do we have ?

>[!quote]
>First of all, as usual we will try to walkthrough a bit concept, technologies and moreover situation of this articles, it will help you why we should order and combine `vault` and `keycloak` for your service

## Hashicorp Vault - Secrets Management

![[icon-hashicorp-vault.svg|center|350]]



>[!info]
><h3>What is Vault</h3>
>
>[Vault](https://developer.hashicorp.com/vault/docs?product_intent=vault) is an identity-based secret and encryption management system. It's a product of Hashicorp, same providers of `Terraform`, `Vagrant`, `Nomad`, ...

If you want to find the optional for your secrets management, Vault is great options for your choice, because It provides us what a features, such as

- Secrets Management: Centrally store, access, and deploy secrets across applications, systems, and infrastructure.
	- [KV Secrets](https://developer.hashicorp.com/vault/docs/secrets/kv)
	- [Database Credentials](https://developer.hashicorp.com/vault/docs/secrets/databases)
	- [Kubernetes Secrets](https://developer.hashicorp.com/vault/docs/platform/k8s)

- Encryption Service: Securely handle data such as social security numbers, credit card numbers, and other types of compliance-regulated information.
	- [Transit Secrets](https://developer.hashicorp.com/vault/docs/secrets/transit)
	- [Tokenization](https://developer.hashicorp.com/vault/docs/secrets/transform/tokenization)
	- [Transform Secrets](https://developer.hashicorp.com/vault/docs/secrets/transform)

- Key Management: Use a standardized workflow for distribution and lifecycle management of cryptographic keys in various KMS providers.
	- [KMIP](https://developer.hashicorp.com/vault/docs/secrets/kmip)
	- [Key Management Secrets](https://developer.hashicorp.com/vault/docs/secrets/key-management)
	- [PKI](https://developer.hashicorp.com/vault/docs/secrets/pki)

In terms of protection, Vault support us for authorization for multiple ways, such as

- [Identiy with Entities and Groups](https://developer.hashicorp.com/vault/tutorials/auth-methods/identity)
- [RBAC with Policies](https://developer.hashicorp.com/vault/tutorials/policies)

>[!quote]
>It's been a while when I use `vault` but not much for understanding whole of feature of this platform, so we can turn back later in another blog and go detail of incredible tools.

But talk about what I like most about Vault, honestly you should talk about methodology Vault supplies for authenticating with multiple platform and access to Vault for getting secrets. Currently, Vault support authentication via

- [Auth Method](https://developer.hashicorp.com/vault/docs/concepts/auth#auth-methods): `userpass`, `kubernetes`, `jwt`, `oidc`, ... 
- [Tokens](https://developer.hashicorp.com/vault/docs/concepts/auth#tokens): `token`

It makes Vault to become more flexible than multiple tools with various platforms can make connect and compatible with Vault to become consistent. It's not bad to say **"Vault is a great option for you in currently, as OpenSource (Self-hosted Version)"**

Why I told, Vault is great choice because It has huge community, support SDK in multiple languages and have CLI for who want to stick with this platform

- [Vault CLI](https://developer.hashicorp.com/vault/docs/commands): A static binary that wraps the Vault API
- [Hvac](https://github.com/hvac/hvac): 🔒 Python 3.X client for HashiCorp Vault

![[thumbnail-hashircorp-vault-price.png]]

But here is the deal, if you want to work with Vault because this platform has multiple to usage via

- [Hashicorp Vault - Cloud](https://www.hashicorp.com/en/pricing?tab=vault): It will cost you around **0.62$** for hour of Cluster **(Too expensive 🥶)**
- [Hashicorp Vault - In your host](https://developer.hashicorp.com/vault/docs/install/install-binary): Totally free and support for multiple OS
- [Hashicorp Vault - Docker](https://hub.docker.com/r/hashicorp/vault): Free and should be used via Docker 😄
- [Hashicorp Vault - Kubernetes Helm](https://developer.hashicorp.com/vault/docs/platform/k8s): Deploy your `Vault` via Kubernetes and use a couple of massive features, truly crazy stuff and unique
- If you find a cloud supportive, [AWS](https://developer.hashicorp.com/vault/docs/platform/aws) and [Azure](https://www.hashicorp.com/en/blog/hcp-vault-on-microsoft-azure-is-now-generally-available)

>[!quote]
>So I promise if we have occasion, I will write a blog to guide you about how to selfhosted vault for your own. But now, make sure you try self-hosted Vault for your own.

But hold on, wait a sec, There are many tools out there can become actual rival of Vault, you can find more of them, like

- [infisical](https://github.com/Infisical/infisical): the open-source secret management platform
- [sops](https://getsops.io/) : Simple and flexible tool for managing secrets
- [openbao](https://openbao.org/): An open source, community-driven fork of Vault managed by the Linux Foundation.

## KeyCloak - Identity Server for y'all

>[!quote]
>I try to refer to Vault with `OIDC/JWT` as authentication method, right ? It means you need identity servers where help you authentication via `callback` function to login from this one into Vault, and `Keycloak` brings back the solution

![[keycloak-svgrepo-com.svg|center|350]]

>[!quote]
><h3>What is KeyCloak </h3>
>
>[Keycloak](https://www.keycloak.org/docs/latest/server_admin/index.html) is an Open Source Identity and Access Management For Modern Applications and Services - a single sign on solution for web apps and RESTful web services. This one is one of popular projects managed by [CNCF](https://www.cncf.io/projects/keycloak/)

Keycloak supports user multiple features, such as

- Single Sign On (SSO)
- Identity Brokering and Social Login
- User Federation
- Standard Protocol such as OpenID Connect, SAML and OAuth 2.0
- ...

Let's talk a bit about KeyCloak Architecture, but the documentation It's quite hard to read and following concept, so you can read add-on articles or read `server-admin` of KeyCloak 😃, such as

- [Dev.to - Getting Started with Keycloak: Understanding the Basics](https://dev.to/haithamoumer/getting-started-with-keycloak-understanding-the-basics-55bf)
- [KeyCloak - Server Administration Guide](https://www.keycloak.org/docs/latest/server_admin/index.html)
- [KeyCloak Benchmark - Architecture](https://www.keycloak.org/keycloak-benchmark/kubernetes-guide/latest/architecture)

If you run KeyCloak in Kubernetes, you will usually see that exist two components, including

- [KeyCloak Server](https://www.keycloak.org/server/containers): It's only KeyCloak runtime and core processor for whole tasks you work with KeyCloak via API, UI or SDK
- [KeyCloak Database](https://www.keycloak.org/server/db): If you run `KeyCloak` as production, It's actual recommend you run with Database and `PostgreSQL` is one of databases choice by `KeyCloak`

With `Keycloak`, you will approach with couple of concepts, like

- `Realm`: A realm manages a set of users, credentials, roles, and groups.
- `roles`: Roles identify a type or category of user
- `consent`: when you as an admin want a user to give permission to a client before that client can participate in the authentication process

For Installation `KeyCloak`, you will have multiple ways, and run with database is best practice to keep your data with `KeyCloak`

- [KeyCloak - OpenJDK](https://www.keycloak.org/getting-started/getting-started-zip): Installation from binary version
- [KeyCloak - Docker](https://www.keycloak.org/getting-started/getting-started-docker): Docker version KeyCloak, You need `docker` to hit and run
- [KeyCloak - Kubernetes Manifest](https://www.keycloak.org/getting-started/getting-started-kube): Use Kubernetes Manifest to deploy KeyCloak
- [KeyCloak - Kubernetes Helm](https://artifacthub.io/packages/helm/bitnami/keycloak): Use Kubernetes Helm to deploy KeyCloak. Managed by [Bitami](https://bitnami.com/stack/keycloak/helm)
- [KeyCloak - Kubernetes Operator](https://operatorhub.io/operator/keycloak-operator): Use Kubernetes Operator to deploy KeyCloak. [Guide](https://www.keycloak.org/operator/installation)

>[!quote]
>One time again, We don't have much time to go through detail about `KeyCloak`, I will keep that for individual blog because `KeyCloak` is really huge and you should give bunch of time to use and gain experience with KeyCloak

But `KeyCloak` is not unique things about Identity Server, This category have at least 5 - 10 candidates as actual rival of `KeyCloak`, like

- [authentik](https://docs.goauthentik.io/docs/) :  An IdP (Identity Provider) and SSO (single sign on) that is built with security at the forefront of every piece of code, every feature, with an emphasis on flexibility and versatility.
- [spicedb](https://github.com/authzed/spicedb): Open Source, Google Zanzibar-inspired database for scalably storing and querying fine-grained authorization data. [Documentation](https://authzed.com/docs/spicedb/getting-started/discovering-spicedb)
- [FusionAuth](https://fusionauth.io/docs/get-started/): a modern platform for Customer Identity and Access Management (CIAM).
- [zitadel](https://github.com/zitadel/zitadel): Identity infrastructure, simplified for you.
- [authelia](https://github.com/authelia/authelia): The Single Sign-On Multi-Factor portal for web apps
- [hydra](https://github.com/ory/hydra): Fully customizable OpenID Certified™ OpenID Connect and OAuth2 Provider in the world.
- Moreover at [OIDC](https://github.com/topics/oidc), [Authentication](https://github.com/topics/authentication), ...
## The Actual Problem

![[meme-short-story.png|center]]

So turn back to the real story, It is about how can we solve problem when you need rotation your Token for couple of reasons

- Renew `TTL` because Vault lets you borrow the token as lease state, It means after `TTL` reach to expire, your token will revoke and It can cause corrupt your work progress.
- Secure your application and your authentication, It grants you specific policies on the right `aud` and suitable `ttl`

For practice with vault, you can use multiple ways to authentication and it give a couple of ideas and that why you can see I bring `keycloak` with `vault`.

1. Use `OIDC` with tools for access by automation test tools, such as [selenium](https://www.selenium.dev/) or [playwright](https://playwright.dev/), authorized by `keycloak` and generate Vault Token
2. Use `jwt` token to authentication, authorized by `keycloak` and generate Vault Token
3. Use `userpass` to authentication to Vault and generate Vault Token

You can follow a couple of articles to understand why

- [Youtube - Configure OIDC access to Vault in Less than 10 Minutes!](https://www.youtube.com/watch?v=e3TPKlPjcdA&ab_channel=Drewbernetes)
- [Medium - Vault + Keycloak: Secure JWT-Based Access](https://pkakuyo.medium.com/vault-keycloak-secure-jwt-based-access-7ddeef325188)
- [Vault - Use JWT/OIDC authentication](https://developer.hashicorp.com/vault/docs/auth/jwt)
- [Medium - SSO Authentication with Selenium](https://amacal.medium.com/sso-authentication-with-selenium-a32519c4f21f)
- [Dev.to - Automating Zerodha Login without Selenium: A Pythonic Approach](https://dev.to/sagamantus/automating-zerodha-login-without-selenium-a-pythonic-approach-3b8o)
- [Medium - Integrating Keycloak OIDC with HashiCorp Vault HCP: A Terraform Comprehensive Guide 🧑‍💻](https://itnext.io/integrating-keycloak-oidc-with-hashicorp-vault-hcp-a-terraform-comprehensive-guide-b41c58ae6ecc)

# Practice Session

>[!question]
>In this practice session, we will try follow the strategy to login vault via `oidc/jwt` and I will show you how can we setup and configuration for authentication with these method. We can use Python for write a code to try a couple of method idea above

![[Pasted image 20250330143532.png]]
<div align="center">
	<p style="text-align: center;"><a href="https://itnext.io/integrating-keycloak-oidc-with-hashicorp-vault-hcp-a-terraform-comprehensive-guide-b41c58ae6ecc">Source: Integrating Keycloak OIDC with HashiCorp Vault HCP: A Terraform Comprehensive Guide 🧑‍💻</p>
</div>

## Preparation

First of all, you should install `vault-cli` in your host, you can follow this code to get stable version

```bash
https://releases.hashicorp.com/vault/1.18.5/vault_1.18.5_linux_amd64.zip && unzip vault_1.18.5_linux_amd64.zip && sudo mv vault /usr/local/bin && rm -rf vault_1.18.5_linux_amd64.zip LICENSE.txt
```

Next you need to configuration KeyCloak with a couple of steps to follow or [tutorial](https://developer.hashicorp.com/vault/docs/auth/jwt/oidc-providers/keycloak)

1. Access into your `keycloak`, I recommend use `master` realms for add another realm into your host
2. After, you create realms, such as `vault` for example, you can go to `client` and create new one

![[Pasted image 20250330144438.png]]

![[Pasted image 20250330144503.png]]

3. In Login Settings, you can put into textbox follow your Vault Host

	- Root URL: Your Vault Host, e.g: `http://localhost:8200`
	- Valid redirect URIs: `http://localhost:8200/ui/vault/auth/oidc/oidc/callback` and `http://localhost:8250/oidc/callback`
	- Admin URL: `http://localhost:8200/ui/vault/auth/oidc/oidc/callback`

	Explain:
	- If you use UI, your callback URL will return from `localhost:8200`  so if you map domain, you should exchange into `localhost:8200` into `vault.test.com` for example
	- If you use CLI, your callback URL will return from `localhost:8250` so It will return via CLI at `localhost:8250`, It means you not need map it to any domain because it only work on with `vault-cli`. Or if you want to use `domain`, make sure it have path `oidc/callback` to handle this response

4. Get your client secrets and we will done with `keycloak`

## Vault with OIDC and JWT

>[!info]
>To enable `OIDC/JWT` in Vault, you can use with both version UI or CLI, I prefer UI because you can create and configuration directly via this tools than UI **(NOTE: some functionality can configure only via CLI, If you want to use UI, you can use at `CLI` symbol)**

To setup and enable, you need to export environment for VAULT configuration

- VAULT_ADDR="your-vault-address"
- VAULT_TOKEN="root-token-plz"

Now enable `oidc` and `jwt` via command

```bash
# default
vault auth enable jwt
vault auth enable oidc

# if you want to more specific path
vault auth enable oidc -path keycloak # Your OIDC will use /keycloak path
```

>[!warning]
>if you set path in your auth method, you should be exchange your URL in UI configuration to specific to mount directory, e.g: `/keycloak`
>
>- UI Path: `https://{vault_host}/ui/vault/auth/keycloak/oidc/callback`
>- Template: `https://{host:port}/ui/vault/auth/{path}/oidc/callback`

Next, configuration profile for  `oidc` and `jwt`

`oidc`

```bash
vault write auth/oidc/config \
oidc_discovery_url="https://{your-keycloak-host}/realms/{your-vault}" \
oidc_client_id="{your-client-name}" \
oidc_client_secret="{your-client-secret}" \
bound_issuer="https://{your-keycloak-host}/realms/{your-vault}" \
default_role="default"
```

`jwt`

```bash
vault write auth/jwt/config \
oidc_discovery_url="https://{your-keycloak-host}/realms/{your-vault}" \
oidc_client_id="" \
oidc_client_secret="" \
bound_issuer="https://{your-keycloak-host}/realms/{your-vault}" \
default_role="default"
```

There are two situations for configuration `jwt`, including

- To support JWT roles, either local keys, JWKS URL(s), or an OIDC Discovery URL must be present. For OIDC roles, OIDC Discovery URL, OIDC Client ID and OIDC Client Secret are required. For the list of available configuration options, please see the [API documentation](https://developer.hashicorp.com/vault/api-docs/auth/jwt).
- If you need to perform JWT verification with JWT token validation, then leave the `oidc_client_id` and `oidc_client_secret` blank. (This is my situation)

Next, role profile for  `oidc` and `jwt`. You should read [OIDC Configuration](https://developer.hashicorp.com/vault/docs/auth/jwt#oidc-configuration-troubleshooting) to understand more about role

`oidc`

```bash
vault write auth/oidc/role/default \
allowed_redirect_uris="https://{vault-host}/ui/vault/auth/oidc/oidc/callback" \
allowed_redirect_uris="http://localhost:8250/oidc/callback" \
user_claim="sub" \
ttl="1h" \
role_type="oidc" \
policies="your-policies"
```

`jwt`

```bash
vault write auth/jwt/role/default \
allowed_redirect_uris="http://localhost:8250/oidc/callback" \
bound_subject="your-bound-subject" \
bound_audiences="your-bound-audience"
user_claim="sub" \
ttl="1h" \
role_type="jwt" \
policies="your-policies"
```

For understand about `claim`, you should read about [Bound claims](https://developer.hashicorp.com/vault/docs/auth/jwt#oidc-configuration-troubleshooting)

- `bound_subject`: must match the provided `sub` claim (In your `jwt` token)
- `bound_audiences` parameter is required when an `aud` claim is set.
- `bound_audiences` parameter must match at least one of provided `aud` claims.

But how to understand the structure of `jwt` token generate about KeyCloak, you should read these articles

- [Platformatic - Configure JWT with Keycloak](https://docs.platformatic.dev/docs/guides/jwt-keycloak)
- [KeyCloak - Authorization Services Guide](https://www.keycloak.org/docs/latest/authorization_services/index.html)
- [Dev.to - How To Configure Audience In Keycloak](https://dev.to/metacosmos/how-to-configure-audience-in-keycloak-kp4)

Now define the policies, and you can kickoff your login with `oidc/jwt`

```bash
vault policy write your-policies <<EOF
path "secret/data/test/*" {
  capabilities = ["read"]
}
EOF
```

Remember create `kv` secret engine with name `secret` and provide PATH `/data/test`

Alright, now you can login Vault with `OIDC/JWT`

## Login Vault with CLI and UI

If you choose UI for login option, your page will return this

`OIDC`

![[Pasted image 20250330154229.png]]

`JWT`

![[Pasted image 20250330154257.png]]

If you choose `OIDC`, It will pop up and return you a page of `keycloak` for callback functionality, login with `username` and `password` in that realms and you can directly login into `Vault`

![[Pasted image 20250330154700.png]]

What else if you use `CLI` for authentication, It's same as UI but it operate via `CLI` 😄

```bash
vault login -method=oidc role="default"
```

This command will return `vault-token`, you can use for long-term purpose but now your host will authentication into Vault

JWT only supports for validate your JWT Generated, so you need to use API or SDK to help you generate it via `KeyCloak`. So we will move to authentication via Python and use `hvac` to tackle this option

## Use Python for Authentication

>[!quote]
>First of all, I want to talk a bit about my stupid plan, use automation test tools for automatically login as OIDC providers. It's actually to say I fail but that kinda fun idea to help we can login with used `selenium` or `pypeeteer` to run chrome as headless mode to login via browser running in background. But it's hard to control because you need to programming as asynchronous to sort of task via thread. If you wanna try, go ahead because I curious how can I do it for production 😄

To make a code run, you should install couple of library

```bash
hvac==2.3.0
pyppeteer==2.0.0
requests==2.32.3
```

The success optional is one used to render `jwt` token and login into vault via this. You can follow this python

```python title="keycloak_auth_vault_jwt.py"
import requests
import hvac

client = hvac.Client("https://vault-domain.example.xyz")
ROLE = 'default'

KEYCLOAK_URL="xxxxx"
KEYCLOAK_REALM="yyyyy"
KEYCLOAK_CLIENT_ID="zzzzzzzz"
KEYCLOAK_CLIENT_SECRET="abcdef"
KEYCLOAK_USERNAME="qwert"
KEYCLOAK_PASSWORD="plmiok"

token_url = f"{KEYCLOAK_URL}/realms/{KEYCLOAK_REALM}/protocol/openid-connect/token"

data = {
        "grant_type": "password",
        "client_id": KEYCLOAK_CLIENT_ID,
        "client_secret": KEYCLOAK_CLIENT_SECRET,
        "username": KEYCLOAK_USERNAME,
        "password": KEYCLOAK_PASSWORD,
}

response = requests.post(token_url,data=data)

# print(response.elapsed.total_seconds())

token_data = response.json()

# print(token_data['access_token'])
response = client.auth.jwt.jwt_login(
    role=ROLE,
    jwt=token_data['access_token'],
)
print('Client token returned: %s' % response['auth']['client_token'])
```

The code will split into two progress

- Request to `keycloak` to generate `JWT` token, used `requests`
- Sending the `jwt` from `keycloak` to Vault with `ROLE`, and result will return `client_token` of vault, used `hvac` to create client_connection

The failure, you can read about [example - OIDC Authorization URL Request](https://python-hvac.org/en/stable/usage/auth_methods/jwt-oidc.html#oidc-authorization-url-request) to understand what they do. I will try to brief this one depend on my knowledge

- In a head of script, they try to define the callback_url with port, as you can remember that one same as `vault-cli` required, so default it should be port `8250`. One more they define the closing page for help your return into your browser if you login successful
- In `login_oidc_get_token` func, they try to define HTTP Server which run and handle request from browser about your login, It will listen in `localhost:8250` for your login become success
- In `main` func, they will get `callback` url and open browser to redirect you to that `keycloak` login page, after you login successful they will use `localhost:8250` to turn back `HTML` definition with parameter attaching. They try to get `token` for `login_oidc_get_token` to make authenticate into vault with `token`, `nonce`, `state` retrieve from `callback_url`
- At the end they return `client_token` same as `jwt` way

But, I want to automatically this functionality so why I make decision for use `playwright` to login with chrome headless version. So I'm not good to code `async` because I don't have much experience with this, but use `gemini` and I got this

```bash title="keycloak_auth_vault_playwright.py"
import asyncio
import hvac
import urllib.parse
from playwright.async_api import async_playwright
from http.server import BaseHTTPRequestHandler, HTTPServer
import threading
import logging

OIDC_CALLBACK_PORT = 8250
OIDC_REDIRECT_URI = f'http://localhost:{OIDC_CALLBACK_PORT}/oidc/callback'
ROLE = 'default'
# SELF_CLOSING_PAGE = '''<!doctype html><html><head><script>// Closes IE, Edge, Chrome, Bravewindow.onload = function load() {  window.open('', '_self', '');  window.close();};</script></head><body>  <p>Authentication successful, you can close the browser now.</p>  <script>    // Needed for Firefox security    setTimeout(function() {          window.close()    }, 5000);  </script></body></html>'''
SELF_CLOSING_PAGE = '''
<!DOCTYPE html>
<html>
<head>
    <title>Authentication Successful</title>
</head>
<body>
    <p>Authentication successful. You can close this tab now.</p>
</body>
</html>
'''

logging.basicConfig(level=logging.DEBUG)

async def login_oidc_get_token_playwright(auth_url):
    """Uses Playwright to automate the OIDC login process."""

    class HttpServ(HTTPServer):
        def __init__(self, *args, **kwargs):
            HTTPServer.__init__(self, *args, **kwargs)
            self.token = None
            self.event = threading.Event()
            self.error = None

    class AuthHandler(BaseHTTPRequestHandler):
        def do_GET(self):
            try:
                params = urllib.parse.parse_qs(self.path.split('?')[1])
                self.server.token = params['code'][0]
            except Exception as e:
                logging.error(f"HTTP Server Error: {e}")
                self.server.error = e
            finally:
                self.server.event.set() # Event is always set

            self.send_response(200)
            self.end_headers()
            self.wfile.write(str.encode(SELF_CLOSING_PAGE))

    server_address = ('', OIDC_CALLBACK_PORT)
    httpd = HttpServ(server_address, AuthHandler)

    def run_server():
        try:
            httpd.handle_request()
        except Exception as e:
            logging.error(f"Server Thread error: {e}")
            httpd.error = e
        finally:
            httpd.event.set() #event is always set
        httpd.server_close()

    server_thread = threading.Thread(target=run_server)
    server_thread.start()

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        page = await browser.new_page()
        await page.goto(auth_url)

        await page.wait_for_selector('#username')
        await page.fill('#username', 'your-username')
        await page.fill('#password', 'your-password')

        await page.click('#kc-login')
        await page.wait_for_url(url=OIDC_REDIRECT_URI, wait_until="load")

        # await browser.close()
        logging.debug("Playwright finished, waiting for server...")
        await browser.close()
        logging.debug("Browser closed successfully.")

    if not httpd.event.wait(timeout=30):  # Timeout after 30 seconds
        logging.error("Timeout waiting for HTTP server.")
        return None

    if httpd.error:
        logging.error(f"HTTP Server error: {httpd.error}")
        return None

    logging.debug(f"Token received: {httpd.token}")
    server_thread.join(timeout=5) #added timeout to thread join.
    logging.debug("Server Thread finished")

    return httpd.token

async def main():
    client = hvac.Client("https://vault.example.xyz")

    auth_url_response = client.auth.oidc.oidc_authorization_url_request(
        role=ROLE,
        redirect_uri=OIDC_REDIRECT_URI,
    )
    auth_url = auth_url_response['data']['auth_url']
    if auth_url == '':
        return None

    params = urllib.parse.parse_qs(auth_url.split('?')[1])
    auth_url_nonce = params['nonce'][0]
    auth_url_state = params['state'][0]

    token = await login_oidc_get_token_playwright(auth_url)
    if token is None:
        return None

    auth_result = client.auth.oidc.oidc_callback(
        code=token,
        path='oidc',
        nonce=auth_url_nonce,
        state=auth_url_state,
    )
    new_token = auth_result['auth']['client_token']
    logging.debug(f'Client token returned: {new_token}')

    client.token = new_token
    return client

if __name__ == '__main__':
    asyncio.get_event_loop().run_until_complete(main())
```

This code is not completely, if you have any idea, it should be considered for implementing. Cheer 1 hour of mine exhausted with `gemini` to deal with it

Remember install playwright

```bash 
pip install playwright

playwright install
```

# Conclusion

![[meme-gg.png|center]]

>[!done]
>That's all for this weekend, hope you walkaround to the end of session and find well with your implementation. It's kinda curious and fun, I have time to learn again who been as dev for implementation, learn and share with you about couple of idea that's crazy enough. But don't deal with your production, let's keep it simple 🍻

>[!quote]
>Feel great and enjoyable with mywork, I'am super curious with whole things I learn from my job, that give me more advice and ability to brain storm and deal with crazy idea, like run headless for authentication OIDC, that's really fun. So stay safe, keep working and learning y'all guy and we will meet together on next weekend. Bye and have happy weekend !!!


