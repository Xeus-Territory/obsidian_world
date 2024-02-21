---
title: Create Free SSL with Let's Encrypt and Certbot
tags:
  - devops
  - fundamentals
  - ssl
  - docker
  - solutions
  - DIY
  - usage
---

*So with SSL, you will have multiple choices with technology but for optimizing your price to operating anything system. Your static ip which had is best optional for combine with Let's Encrypt, certbot of python3 with your domain. For more information, you can go to see [Let's Encrypt Documentation](https://letsencrypt.org/docs/) and [Certbot Documentation](https://certbot.eff.org/) for more information*

>*Following this document for customize your own SSL: [https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/](https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/), so in our situation, nginx running inside docker it will make anything become strange than running in own host, so give more time to finding away to try best of it inside container*

1. First of all, you need to add some of the configuration to mount /etc/letsencrypt from local inside the docker. For this purpose, if Nginx dies when restarting that one , the SSL will exist and be continuously used.

```yaml
# docker-compose.yaml
proxy:
  <some_another_configuration>
  volumes:
      - <another_mount>
      - /etc/letsencrypt:/etc/letsencrypt
```

2. You need to configure the default conf file of nginx, so in this situation, it have more ways to add let's encrypt, but for ignoring the annoy for fail create, I will recommend that you to choosing use certbot inside the nginx containers

```bash
#!/bin/bash
# <vm shell> 
docker exec -it $(docker ps | grep proxy | awk '{print $1}') /bin/bash
# <container shell> 
apt update && apt install nano certbot python3-certbot-nginx -y
certbot --nginx -d <your_domain> --agree-tos -m <your_email> # Read and deny the pop up appear
## Notification will announce if it is done succeed. Your cert and inomation of register is created inside the folder /etc/letsencrypt/*fr
```

3. After that your conf of nginx, the certbot will automatically reconfigure your nginx conf file with SSL. Your application will change from HTTP to HTTPS (`# managed by Certbot`) is added. You can move this configuration for another route and it will help you reuse your SSL for another subdomain. I think this SSL is `wildcard certificate` and you can use it for multiple subdomains with just one certificate.

4. So reapplied for configuration Nginx by this command
   
```bash
#!/bin/bash
# <container shell> 
nginx -t # This command will check your syntax is okay or not
nginx -s reload # It will reload the new configuration for nginx
```

The result is your SSL applied to your domain, go and check it via browser. If 

### Renew SSL Certificate
- Let's encrypt is not supported by long-term SSL, so you need to manually renew or create a job to renew it.
- With my plan, I will renew it on the first day of the month to keep the certificate always available, that to executing this command and pushes that for crontab to take care of it.

```bash
#!/bin/bash
certbot renew --dry-run # This command will renew the certificate with detailed information
certbot renew --quiet # This command will renew the certificate on the background thread
```