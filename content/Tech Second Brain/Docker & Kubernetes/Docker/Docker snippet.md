---
title: Common Docker command and usage
tags:
  - docker
  - helpful
  - devops
  - usage
---
# Installing

- Install and set up docker on your host with rapidly, by

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

	Official install instruction: https://docs.docker.com/engine/install/ubuntu/

	```bash
	curl -fsSL https://get.docker.com -o get-docker.sh
	sudo sh ./get-docker.sh --dry-run
	
	# OR
	
	curl -fsSL https://get.docker.com | sudo bash -
	```

# Helpful command

- Basic `run` command, but with helpful flag

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

- Basic `build` command

	Documentation: [docker build](https://docs.docker.com/reference/cli/docker/image/build/) or [docker buildx](https://docs.docker.com/reference/cli/docker/buildx/)

	With some recommendation, when use `build` is not actually efficience, you can use `builx` for instead, install instruction: [Linux Packages](https://github.com/docker/buildx?tab=readme-ov-file#linux-packages)
	
	```bash
	sudo apt install docker-buildx -y
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


- `stats` command: Use when you want to view usage of container in running on your host

	```bash
	docker stats
	```


- `history` command: Use when you want show the history of an image, helpful if you want to detect what contents in each layer or change in image. You can use [dive](https://github.com/wagoodman/dive) instead for exploring each layer in a docker image

```bash
docker history yourimage
```

- `exec` command: Use when you want to execution command or attach the STDIN container to your shell

	Common command which I usually use, like

	Documentation: [docker exec](https://docs.docker.com/reference/cli/docker/container/exec/)
	
	```bash
	docker exec -it namecontainer /bin/bash
	```

- `logs` command: Use when you want to show your logs of container into shell

	Common usage command, like

	```bash
	docker logs -f namecontainer
	```
	
	with `-f` can help you read log in follow mode

- `cp` command: Use when you want to copy somethings from container to your local machine, or vice versa
	
	```bash
	docker cp ./some_file CONTAINER:/work
	```

- `ps` command: Check and validate state of container
	
	```bash
	docker ps -a 
	```

- `inspect` command: View and look on detail configuration or state of container, network, volume

	```bash
	# Use for inspect network
	docker network inspect yournetwork
	
	# Use for inspect container
	docker container inspect yourcontainer
	```

- `rm` and `rmi` command: Use to remove container and image on docker, use can use `prune` instead but if you want to force anything, `rm` and `rmi` will recommend
	
	```bash
	# Force install all container in your machine
	docker rm -f $(docker ps -aq)
	
	# Force install all image in your machine
	docker rmi -f $(docker image ls)
	```

- `start` and `stop` : Use to run or stop docker container

	```bash
	# Start the exist container with stop state
	docker start container
	# Stop the exist container with start state
	docker stop container
	```

- `pull` command: Use to pull a docker image from repository or registry
	
	```bash
	docker pull nginx
	```

- `push` command: as vice versa `pull` command, you to push image to repository or registry

	```bash
	docker push yourimage
	```

- `login` and `logout` : Use to login or logout your docker from private repository or registry, you can found the credentials in `~/.docker/config.json`