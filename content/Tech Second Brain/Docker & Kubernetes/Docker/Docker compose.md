---
title: Docker compose snippet
tags:
  - docker
  - usage
  - helpful
  - devops
---
# Helpful command

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