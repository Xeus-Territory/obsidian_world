---
title: Shell Script for config Docker Portainer
tags:
  - monitoring
  - bash
  - docker
  - basic-knowledge
  - devops
---
```bash
# config_portainer.sh

#!/bin/bash

# This script is used to configure the portainer which monitoring and control for your Kubernetes cluster or Docker Service

# Check recreate a password or create container

arg=$1
container_portainer_name=$2
  

if [ -z "$arg" ]; then
    echo "Please specify a arguments for optional, (--reset-password) or (--create-container)" && exit 1
fi

if [ -z "$container_portainer_name" ]; then

    echo "Please specify a portainer container name for identity your container" && exit 1

fi


if [[ "$arg" == "--reset-password" ]]; then
    docker stop $container_portainer_name
    docker run --rm -v portainer_data:/data portainer/helper-reset-password
    docker start $container_portainer_name
fi

if [[ "$arg" == "--deploy-master-ssl-portainer" ]]; then
	read -p "Enter your domain with letencrypt SSL: " domain_letencrypt
	read -p "Enter your domain with docker network: " network_portainer_name
	
	if [ -z "$domain_letencrypt" ]; then
	    echo "Please specify a domain with verify by domain_letencrypt" && exit 1
	fi

	if [ -z "$network_portainer_name" ]; then
	    echo "This network will be default bridge, rechange if you need to changing that"
	    network_portainer_name="bridge"
	fi

    # Not reset password - create a new one
    docker run -d --name $container_portainer_name --restart always \
        -v /var/run/docker.sock:/var/run/docker.sock \
        -v portainer_data:/data \
        -v /etc/letsencrypt/live/$domain_letencrypt:/certs/live/$domain_letencrypt:ro \
        -v /etc/letsencrypt/archive/$domain_letencrypt:/certs/archive/$domain_letencrypt:ro \
        --network $network_portainer_name  portainer/portainer-ce:latest \
        --sslcert /certs/live/$domain_letencrypt/fullchain.pem \
        --sslkey /certs/live/$domain_letencrypt/privkey.pem
fi

if [[ "$arg" == "--deploy-master-portainer" ]]; then
    # Not reset password - Not create agent - not a master deal portainer - create a local master portainer
    docker run -d --name $container_portainer_name --restart always \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v portainer_data:/data \
    portainer/portainer-ce:latest
fi

if [[ $arg == "--deploy-agent-portainer" ]]; then
    # Not reset password - create a agent
    docker run -d \
    -p 9001:9001 \
    --name $container_portainer_name \
    --restart=always \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v /var/lib/docker/volumes:/var/lib/docker/volumes \
    portainer/agent:2.19.1
fi
```

