# `Umami` - The Analytics Components of Obsidiant World

>[!NOTE]
>This compose file is already work as the stack in Docker Swarm, you can self-hosted this stack instead with `docker-swarm`.
>To continuous using with `docker-compose`, please double-check this file in the oldest version

1. Point your domain type `A/AAAA` to your public `IPv4/IPv6` of VPS
2. Install `docker` and `compose` for your host

```bash
# Install docker (official way)
curl -fsSL https://get.docker.com | sudo bash -

# Install compose plugin
DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker}
mkdir -p $DOCKER_CONFIG/cli-plugins
curl -SL https://github.com/docker/compose/releases/download/v2.29.1/docker-compose-linux-x86_64 -o $DOCKER_CONFIG/cli-plugins/docker-compose
chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose
```

3. Run stack in `docker swarm`

>[!NOTE]
>Required: Enabling the `swarm` mode

```bash
docker stack deploy -c webanalytics.yml webanalytics
```

>[!IMPORTANT]
>Please remind, The Caddy Server need port 443 enabled on your VPS. If not, it won't work to challenge the acme for serving TLS automatically**