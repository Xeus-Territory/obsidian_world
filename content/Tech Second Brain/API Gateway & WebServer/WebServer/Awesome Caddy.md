---
title: Awesome Caddy
tags:
  - devops
  - webserver
  - usage
  - awesome
---

![[thumbnail-caddy.png]]

# Repository

- [Caddy](https://github.com/caddyserver/caddy): Fast and extensible multi-platform HTTP/1-2-3 web server with automatic HTTPS
- [Caddy Org](https://github.com/caddyserver): The ultimate server: enterprise-ready, extensible, open source, and automatic HTTPS with a configuration API
- [dist](https://github.com/caddyserver/dist): Resources for packaging and distributing Caddy
# Documentations and Articles

>[!note]
>**Caddy is the first and only web server to use HTTPS automatically _and by default_.**

- [Caddy Server Documentation](https://caddyserver.com/docs/)
- [Common Caddyfile Patterns](https://caddyserver.com/docs/caddyfile/patterns)
- [Automatic HTTPS](https://caddyserver.com/docs/automatic-https)
- [[Caddy Server and Umami analytics platform]]
# Caddy Configuration

## Default

```bash
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