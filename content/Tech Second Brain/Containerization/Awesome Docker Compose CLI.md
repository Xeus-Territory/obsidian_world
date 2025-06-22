---
title: Awesome Docker Compose CLI
tags:
  - docker
  - usage
  - helpful
  - devops
---

![[icon-docker-swarm.png|center|500]]
# Installing

You can try install docker compose in two method, `apt` package managing or manually. Read more at

- [Install the Compose plugin](https://docs.docker.com/compose/install/linux/) (Recommended)
- [Install Compose standalone](https://docs.docker.com/compose/install/standalone/)

## Use `apt` package

```bash
sudo apt install docker-compose-plugin -y
```

## Manually download

1. To download and install the Compose CLI plugin, run

```bash
DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker}
mkdir -p $DOCKER_CONFIG/cli-plugins
curl -SL https://github.com/docker/compose/releases/download/v2.29.1/docker-compose-linux-x86_64 -o $DOCKER_CONFIG/cli-plugins/docker-compose
```

2. Apply executable permissions to the binary

```bash
chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose
```
# Basic command

>[!info]
>With `docker-compose`, you can find and explore more about this technicals with documentation in details, such as
>- [Compose Documentation](https://docs.docker.com/compose/)
>- [Compose CLI](https://docs.docker.com/compose/reference/)

`up` and `stop` command which commonly use to bring up and down the bunch of container inside compose file

1. [`up` command documentation](https://docs.docker.com/reference/cli/docker/compose/up/)
2. [`down` command documentation](https://docs.docker.com/reference/cli/docker/compose/down/)

```bash
# Up command (With out build)
docker-compose -p nameproject -f /locate/your/docker/compose --no-build up -d

# Up command (With build)
docker-compose -p nameproject -f /locate/your/docker/compose --build up -d

# Up command (with specify target service)
docker-compose -p nameproject -f /locate/your/docker/compose up -d yourservice

# Down command
docker-compose -p nameproject -f /locate/your/docker/compose down 
```

Common options often use with `compose`, like

- `-p` : set project name, represent your container name with service in compose file, example: `next-application`
- `-f` : specify with compose file in use for execute with command

# Note special Key in compose

## Use host network to use driver of local interface,

Use when you want to call via `DNS` on different network with your `eth` interface

Documentation: [Accessing Host Services from Docker Containers](https://dev.to/mjnaderi/accessing-host-services-from-docker-containers-1a97)

```yaml {3-4}
services:
	application:
	    extra_hosts:
			- "host.docker.internal:host-gateway"
```

## Select your network with `external`

```yaml {4}
networks:
  wkernet:
    driver: overlay
    external: true
```

# Update compose

Documentation

- [How to Get Docker-Compose to Always Use the Latest Image](https://www.baeldung.com/ops/docker-compose-latest-image)
- [docker compose pull](https://docs.docker.com/reference/cli/docker/compose/pull/) and [docker compose up](https://docs.docker.com/reference/cli/docker/compose/up/)

>[!info]
>You can hand-on with compose via update the container inside stack to new version by trying pull and up again

If you have new version of images inside one of container, you can try to update that via

```bash
# You can specific services name or pull all of container
docker compose -f /file/compose -p name-stack pull <services-name>

# Try to restart containers in stack with new image
docker compose -f /file/compose -p name-stack up -d <services-name>
```

# Troubleshoot

## Not supported URL scheme http+docker

Link issue: [Bug - Breaks with requests 2.32.0: Not supported URL scheme http+docker](https://github.com/docker/docker-py/issues/3256)

If you meet this problem, you can try to reinstall or downgrade version of `requests` package inside your host because `docker-compose` will use `requests` for this URL Scheme

```bash
# Python < 3.12
pip install requests==2.31.0

# Python >= 3.12
pip install requests==2.31.0 --break-system-packages
```