---
title: Awesome Docker CLI
tags:
  - docker
  - helpful
  - devops
  - usage
---

![[icon-docker.svg|center|450]]
# Installing

## The default installation (via APT)

```bash
# Apply with Debian, Ubuntu or Kali
sudo apt update && sudo apt install docker.io docker-compose -y

# Enable and add permission (Usually: You terminal is not root, if root you can escape)
sudo usermod -aG docker $USER
sudo systemctl enable docker.service
# Restart your shell to permit this rule
# OR
# Bybass the socket run with docker cli (for first time)
sudo chmod 666 /var/run/docker.sock
```

## The official ways

Official install instruction: https://docs.docker.com/engine/install/ubuntu/

*Get fully setup docker with only one command*

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh ./get-docker.sh --dry-run

# OR

curl -fsSL https://get.docker.com | sudo bash -
```

If you wanna run docker as rootless (means not `sudo`), you can consider use

```bash
sudo sh -eux <<EOF
# Install newuidmap & newgidmap binaries
apt-get install -y uidmap
EOF

# Run install
dockerd-rootless-setuptool.sh install
```

## Install only binaries

To install the binaries of Docker and related, you can refer to this instruction and couple of links

- [Docker - Install Docker Engine from binaries](https://docs.docker.com/engine/install/binaries/)
- [Docker Package Repository](https://download.docker.com/)

```bash
# NOTE: required wget !!! (For linux x86-64)

export DOCKER_VERSION="20.10.22" && \
	wget -O docker-$DOCKER_VERSION.tgz \
	https://download.docker.com/linux/static/stable/x86_64/docker-$DOCKER_VERSION.tgz && \
	tar -xzf docker-$DOCKER_VERSION.tgz -C /usr/local/bin/ --strip-components 1 && \
	rm -rf docker-$DOCKER_VERSION.tgz
```

# Helpful command

## Basic `run` command, but with helpful flag

Documentation: [docker run](https://docs.docker.com/reference/cli/docker/container/run/)

```bash
docker run -d --name new-container --env foo=bar --env-file ~/world_env --restart always -u root --volume new:/data -p 80:80 -p 2345-5678:2345:5678 busybox
```

This `run` command will include some very helpful and common flag, such as

1. `-d` or `--detact` : Run container in background and print container ID
2. `-it` or `-i`  `-t` : Keep STDIN open even if not attached with allocate a pseudo-TTY, common use with : `docker exec` or `docker run -itd` with some default container like `debian`, `busybox` or `curl`
3. `--name` : Assign a name to the container
4. `--env` or `-e` :  Set environment variables (can you multiple time)
5. `--env-file`:  Read in a file of environment variables
6. `--restart` : Set restart policy for container, Read more at [Restart policies (--restart)](https://docs.docker.com/reference/cli/docker/container/run/#restart)
7. `--user` or `-u` : Username or UID which run in container
8. `--volume` : Bind mount a volume, use `mount` instead if you want support most
9. `-p` : Publish port of container (Can you multiple time and set a range)
10. `-net` or `--network`: Use for bind network (docker or host) into your container.
	- e.g: `-net=host` it means bind your `localhost` into your container
	- e.g: `-net=docker-network` it means connect your docker container with network `docker-network` managed by docker
11. More advanced via `--add-host` to add directly `host` into your docker container at `/etc/hosts`, Read more at [Add entries to container hosts file (--add-host)](https://docs.docker.com/reference/cli/docker/container/run/#add-host)
## Basic `build` command

Documentation: [docker build](https://docs.docker.com/reference/cli/docker/image/build/) or [docker buildx](https://docs.docker.com/reference/cli/docker/buildx/)

With some recommendation, when use `build` is not actually efficiency, you can use `builx` for instead, install instruction: [Linux Packages](https://github.com/docker/buildx?tab=readme-ov-file#linux-packages)

```bash
# Install buildx
sudo apt install docker-buildx -y

# Add buildx into daemon
docker buildx install
```

You can use `build` command , like

```bash
# With build

docker build -t buildcontainer:latest -f Dockerfile .

# With buildx

docker buildx build -t buildcontainer:latest -f Dockerfile .

# With URL
docker build github.com/creack/docker-firefox

# With -
docker build - < Dockerfile
```

Common flag when use `build` command, such as
1. `-t` or `--tag`: Tag an image, for distinguish
2. `-f` or `--file` : Specify a Dockerfile
3. `--build-arg` : Set build-time variables
4. `--add-host` : Add entries to container hosts file, very interesting. Read more at: [Add host](https://docs.docker.com/reference/cli/docker/image/build/#add-host)
5. `--target` : Specifying target build stage (With the multiple stage in Dockerfile)

## `stats` command

Use when you want to view usage of container in running on your host

```bash
docker stats
```

## `history` command

Use when you want show the history of an image, helpful if you want to detect what contents in each layer or change in image. You can use [dive](https://github.com/wagoodman/dive) instead for exploring each layer in a docker image

```bash
docker history yourimage
```

## `exec` command

Use when you want to execution command or attach the STDIN container to your shell

Common command which I usually use, like

Documentation: [docker exec](https://docs.docker.com/reference/cli/docker/container/exec/)
	
```bash
docker exec -it namecontainer /bin/bash
```

## `logs` command

Use when you want to show your logs of container into shell

Common usage command, like

```bash
docker logs -f namecontainer
```

with `-f` can help you read log in follow mode

## `cp` command

Use when you want to copy somethings from container to your local machine, or vice versa

```bash
docker cp ./some_file CONTAINER:/work
```

## `ps` command

Check and validate state of container
	
```bash
docker ps -a 
```

## `inspect` command

View and look on detail configuration or state of container, network, volume

```bash
# Use for inspect network
docker network inspect yournetwork

# Use for inspect container
docker container inspect yourcontainer
```

## `rm` and `rmi` command

Use to remove container and image on docker, use can use `prune` instead but if you want to force anything, `rm` and `rmi` will recommend

```bash
# Force install all container in your machine
docker rm -f $(docker ps -aq)

# Force install all image in your machine
docker rmi -f $(docker image ls)
```

## `start` , `stop`  and `restart`

Use to control state of container

```bash
# Start the exist container with stop state
docker start container
# Stop the exist container with start state
docker stop container
# Restart docker container
docker restart container
```

## `pull` command

Use to pull a docker image from repository or registry

```bash
docker pull nginx
```

## `push` command

As vice versa `pull` command, you to push image to repository or registry

```bash
docker push yourimage
```

## `login` and `logout`

Use to login or logout your docker from private repository or registry, you can found the credentials in `~/.docker/config.json`

Login with submitting the password on shell

```bash
docker login -u="${DOCKER_USERNAME}" -p="${DOCKER_PASSWORD}"
```

Login with password from `STDIN` from pipe command or get from another website

```bash
# Pass in with direct password to string
docker login --username=<user> --password-stdin <<<'password'

# Read from file and use pipe to pass string
cat /vars/docker/secrets.txt | docker login --username=<user> --password-stdin
```

# Cheat commands

## Filter untagged images, with use `dangling` property

```bash
docker images --filter "dangling=true"
```

## For filter image base on time, we can consider to using `before` `since` label with `--filter` flag

```bash
# Before: List previous image target
docker images --filter "before=image1"

# Since: List behind image target
docker images --filter "since=image3"
```

## Clean build cache of docker engine

```bash
# Use for old version
docker builder prune

# use for buildx version
docker buildx prune

# use for prune all system
docker system prune
```

It will ask you prompt yes or no, if you want to bypass this, add `-f` flag for force prune


# Troubleshoot

## Run container in the privilege mode

In some situations, you must to use `privilege` for running some container require that one, such as `docker:dind`, `kind` and more

If you don't run in root mode, you meet this stuck, and that tough

```bash
Certificate request self-signature ok
subject=CN=docker:dind server
/certs/server/cert.pem: OK
Certificate request self-signature ok
subject=CN=docker:dind client
/certs/client/cert.pem: OK
cat: can't open '/proc/net/ip6_tables_names': No such file or directory
cat: can't open '/proc/net/arp_tables_names': No such file or directory
ip: can't find device 'nf_tables'
nf_tables             372736 708 nft_chain_nat,nft_limit,nft_compat
nfnetlink              20480  4 nf_conntrack_netlink,nft_compat,nf_tables
libcrc32c              12288  4 nf_nat,nf_conntrack,nf_tables,raid456
modprobe: can't change directory to '/lib/modules': No such file or directory
ip: can't find device 'ip_tables'
ip_tables              36864  0 
x_tables               69632 13 xt_MASQUERADE,ip6t_REJECT,xt_hl,ip6t_rt,ipt_REJECT,xt_LOG,xt_multiport,xt_limit,xt_addrtype,xt_tcpudp,xt_conntrack,nft_compat,ip_tables
modprobe: can't change directory to '/lib/modules': No such file or directory
ip: can't find device 'ip6_tables'
modprobe: can't change directory to '/lib/modules': No such file or directory
iptables v1.8.10 (nf_tables)
mount: permission denied (are you root?)
Could not mount /sys/kernel/security.
AppArmor detection and --privileged mode might break.
mount: permission denied (are you root?)
```

Error inside `iptables`, `apparmor` and `network` and it gonna not be easy for yourself. But nowadays, docker provide the option with `--privileged` which solve all problem with container require the `root` permission

```bash
docker run -d --privileged docker:dind
```

And your problem will be resolve, container will start with no interrupt at all 🙌