---
title: 0-downtime with Blue-Green Deployment
tags:
  - DIY
  - solutions
  - devops
  - architecture
  - usage
  - docker
---
>[!info]
>*Solution*: Choose for temporary Blue and Green deployment. More detail can be found in this [ Custom Blue Green Deployment With Nginx And Gitlab Ci](https://www.kimsereylam.com/gitlab/nginx/dotnetcore/ubuntu/2019/01/04/custom-blue-green-deployment-with-nginx-and-gitlab-ci.html)

![[Pasted image 20240218150404.png]]
<div align="center">
    <strong><em><p style="text-align: center;">Blue and Green deployment strategy</p></em></strong>
</div>

# Nginx with bash scripting

- With the bash script is registered via cronjob, we need to consider about two things:
	1. Nginx need to be setup for `reverse proxy` and `route traffic` when **downtime** occur 
	2. Docker will have strategy about scale up and down the service for reducing down time

- With `nginx` configuration, it will be possible to reload a new configuration Nginx and except downtime when updating service with `nginx` *(Service will have retries but not return 5xx Error)*
- On the script, it will flexibly re-change between 2 configurations via [[Shell Script about Automation CD with Zero Downtime]]
- Have `sleep` command between them, so it will change to default when the service becomes stable

# Docker
With Docker strategy, it will perform some this task like
1. When have new image on container registry, it will perform pull new image on that time. Update the `.env` file from `S3`           
2. After that, it will scale up the service with 2 new containers, first once for routing traffic from old to new and rename new to original version. Proxy will be return to original version for process a new job
3. This strategy will be occur quickly and carefully by having the health checking of container on each progress. 
4. It will reduce downtime when applied new service into. After deploy and recreate success, that will remove both container and image of old one for reclaim resource and update new tags into location for extract for next time.

# How to running this script manually

## Required tools to perform this script
- This script is created for only `Debian` distro (Ubuntu, Kali, Raspian, Debian, ...) not support for (RedHat, Centos, ...). Need to consideration when installing
- Bash Script will need into some tools on below list: 
	- Docker: `docker-compose, docker.io`
	- Download Tools: `curl, wget`
	- `JSON` processing: `jq`

## Manually run this script
- Parameter is obligated to pass for your command (Please input with right position with numeric):
	1. Name of the `gitlab` account (This account needs to be work with Token Generated - Token need put into ~/.credentials/gitlab) `(E.x: Xeus-DevOps)`
	2. Path to env file for whole container (This `.env` file is same as `.env` file provide for docker-compose) `(E.x: /some_platform/.env)` 
	3. Path to Nginx configuration file (Nginx configuration file for reverse proxy) `(E.x: /some_platform/nginx/nginx_default.conf)` 
	4. Optional with 2 - 3 containers (This will help optimize the resource for initialization containers, Require 3Gb ram above 3 opt) `(E.x: 2 or 3)`

- Executable command (Before running this command, make sure it have rule execution enabled) 
- For rule execution enabled, run command: `chmod +x <your_bash_file>` or `chmod 0700 <your_bash_file>` 
- For running the command: using `bash` or `./<your_script>`

```bash
#!/bin/bash
bash -c "<your_script> <username_gitlab> <path_env> <path_nginx_config> <containers_numberic>" # Opt 1 
./<your_script> <username_gitlab> <path_env> <path_nginx_config> <containers_numberic> # Opt 2
```

The contents of script can find out ▶️ ▶️ [Shell Script about Automation CD with Zero Downtime](Shell%20Script%20about%20Automation%20CD%20with%20Zero%20Downtime.md)

