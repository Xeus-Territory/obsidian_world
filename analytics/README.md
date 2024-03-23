# Manual to configuration `umami` analytics components

1. Change `env` variables for your application and database
2. Point your domain type `A/AAAA` to your public `IPv4/IPv6` of VPS
3. Install `docker` and `docker-compose` for your host

    ```bash
    sudo apt update && sudo apt install -y docker.io docker-compose
    sudo usermod -aG docker $USER
    sudo systemctl enable docker
    sudo chmod 666 /var/run/docker.sock
    ```

4. Run `docker-compose` with compose file

    ```bash
    docker-compose -p analytics -f docker-compose.yaml up -d
    ```

**Notice: CaddyServer need 443 enabled on your VPS, If not it will not work (Firewall Rule)**