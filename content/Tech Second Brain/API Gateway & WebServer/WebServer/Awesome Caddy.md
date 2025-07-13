---
title: Awesome Caddy
tags:
  - devops
  - webserver
  - usage
  - awesome
---

![[thumbnail-caddy.png]]

# General

>[!note]
>**Caddy is the first and only web server to use HTTPS automatically _and by default_.**
## Repository

- [Caddy](https://github.com/caddyserver/caddy): Fast and extensible multi-platform HTTP/1-2-3 web server with automatic HTTPS 🌟 **(Recommended)**
- [dist](https://github.com/caddyserver/dist): Resources for packaging and distributing Caddy
## Documentations and Articles

- [Automatic HTTPS](https://caddyserver.com/docs/automatic-https)
- [[Caddy Server and Umami analytics platform]]
- [Caddy Server Documentation](https://caddyserver.com/docs/)
- [Common Caddyfile Patterns](https://caddyserver.com/docs/caddyfile/patterns)

# Caddy Commands

Use the documentation to get valid command to handling [Caddy Server](https://caddyserver.com/docs/command-line#caddy-reload)

To reload configuration use `reload` command. Doc: [caddy reload](https://caddyserver.com/docs/command-line#caddy-reload)

```bash
caddy reload --config /location/caddy/file
```

To check and validate configuration from `caddyfile` use `validate` command. Doc: [caddy validate](https://caddyserver.com/docs/command-line#caddy-validate)

```bash
caddy validate --config /location/caddy/file
```

>[!note]
>With `Caddy V2`, mostly `websocket` automatically serve and do not need to configuration like `v1` . Check about that in [Caddy Proxy](https://caddyserver.com/docs/v2-upgrade#proxy)

# Caddy Configuration

## Default

```bash title="Caddyfile"
# The Caddyfile is an easy way to configure your Caddy web server.
#
# Unless the file starts with a global options block, the first
# uncommented line is always the address of your site.
#
# To use your own domain name (with automatic HTTPS), first make
# sure your domain's A/AAAA DNS records are properly pointed to
# this machine's public IP, then replace ":80" below with your
# domain name.

:80 {
	# Set this path to your site's directory.
	root * /usr/share/caddy

	# Enable the static file server.
	file_server

	# Another common task is to set up a reverse proxy:
	# reverse_proxy localhost:8080

	# Or serve a PHP site through php-fpm:
	# php_fastcgi localhost:9000
}

# Refer to the Caddy docs for more information:
# https://caddyserver.com/docs/caddyfile
```

## Basic Auth

If you want to add a basic-auth for Caddy, you can workaround function integrated inside Caddy. Read more at [Caddy - basic_auth](https://caddyserver.com/docs/caddyfile/directives/basic_auth)

First of all, you need to use CLI of caddy with [`hash-password`](https://caddyserver.com/docs/command-line#caddy-hash-password) to create your credential with your account, because Caddy only apply the hash-password for authenticate, so that's why you need it

```bash
caddy hash-password <your-username>
```

Prompting your password and you will receive the hash in the end, copy that and ready to put into `Caddyfile`

```bash title="Caddyfile"
https://your-domain.needto.ssl {
	basic_auth {
		<user-name> <hash-password> # e.g: nash $2a$14$Zkx19XLiW
	}
	...
	<your configure>
}
```

More interesting example at [Single Sign-on in Caddy Server Using only the Caddyfile and Basic Authentication](https://josheli.com/knob/2021/02/24/single-sign-on-in-caddy-server-using-only-the-caddyfile-and-basic-authentication/)
