---
title: Create Free SSL with Let's Encrypt and Certbot
tags:
  - devops
  - fundamentals
  - ssl
  - docker
  - solutions
---

![[thumbnail-letencrypt-certbot-nginx.png]]

**For SSL implementation**, various technologies are available. Nevertheless, to optimize the cost of operating your system, pairing a static IP address with **Let's Encrypt** and the **Certbot Python 3** client is highly recommended for your domain.

You can find more information at

- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [Certbot](https://certbot.eff.org/) and [Certbot Documentation](https://eff-certbot.readthedocs.io/en/latest/index.html)

To customize your SSL with Nginx, follow [this document: Update: Using Free Let’s Encrypt SSL/TLS Certificates with NGINX](https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/). Please note that running Nginx within Docker can be more complex than on a host machine, so allow extra time to determine the optimal configuration inside the container.

More about Nginx Configuration that should be useful for you

- [DigitalOcean - How To Create Let's Encrypt Wildcard Certificates with Certbot](https://www.digitalocean.com/community/tutorials/how-to-create-let-s-encrypt-wildcard-certificates-with-certbot)
- [DigitalOcean - How To Use Certbot Standalone Mode to Retrieve Let's Encrypt SSL Certificates on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-use-certbot-standalone-mode-to-retrieve-let-s-encrypt-ssl-certificates-on-ubuntu-1804)

# Setup Free SSL with Certbot and Nginx

1. First of all, you need to add some of the configuration to mount `/etc/letsencrypt` from local inside the docker. For this purpose, if `nginx` dies when restarting that one , the `SSL` will exist and be continuously used.

```yaml title="docker-compose.yaml"
proxy:
  <some_another_configuration>
  volumes:
      - <another_mount>
      - /etc/letsencrypt:/etc/letsencrypt
```

2. You need to configure the default conf file of `nginx`, so in this situation, it have more ways to add let's encrypt, but for ignoring the annoy for fail create, I will recommend that you to choosing use `certbot` inside the `nginx` containers

```bash
#!/bin/bash
# <vm shell> 
docker exec -it $(docker ps | grep proxy | awk '{print $1}') /bin/bash
# <container shell> 
apt update && apt install nano certbot python3-certbot-nginx -y
certbot --nginx -d <your_domain> --agree-tos -m <your_email> # Read and deny the pop up appear
## Notification will announce if it is done succeed. Your cert and inomation of register is created inside the folder /etc/letsencrypt/*fr
```

3. After setting your conf of `nginx`, the `certbot` will automatically reconfigure your nginx conf file with SSL. Your application will change from HTTP to HTTPS (`# managed by Certbot`) is added. You can move this configuration for another route and it will help you reuse your SSL for another subdomain

4. So reapplied for configuration Nginx by this command
   
```bash
#!/bin/bash
# <container shell> 
nginx -t # This command will check your syntax is okay or not
nginx -s reload # It will reload the new configuration for nginx
```

The result is your SSL applied to your domain, go and check it via browser
# Renew SSL Certificate

- Let's encrypt is not supported by long-term SSL, so you need to manually renew or create a job to renew it.
- With my plan, I will renew it on the first day of the month to keep the certificate always available, that to executing this command and pushes that for crontab to take care of it.

```bash
#!/bin/bash
certbot renew --dry-run # This command will renew the certificate with detailed information
certbot renew --quiet # This command will renew the certificate on the background thread
```