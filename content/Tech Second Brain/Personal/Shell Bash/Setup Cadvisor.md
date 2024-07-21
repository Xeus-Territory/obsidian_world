---
title: Setup Cadvisor on your host
tags:
  - bash
  - usage
  - devops
---
>[!info]
>Cadvisor is opensource of Google which use to analyzes resource usage and performance characteristics of running containers.
>
>Github: https://github.com/google/cadvisor

The script is create for purpose help you install `Cadvisor` in your host as service

```bash
#!/bin/bash

if [[ "$1" == "create" ]]; then
    # Verify that command have version
    if [[ "$2" != "" ]]; then
        curl -L https://github.com/google/cadvisor/releases/download/v"$2"/cadvisor-v"$2"-linux-amd64 -o cadvisor
        chmod +x cadvisor | sudo mv cadvisor /usr/local/bin
        cat << EOF | sudo tee /etc/systemd/system/cadvisor.service > /dev/null
[Unit]
Description=Cadvisor
Documentation=https://github.com/google/cadvisor
After=network-online.target

[Service]
User=root
ExecStart=/usr/local/bin/cadvisor  $OPTIONS
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF
    sudo systemctl start cadvisor.service
    sudo systemctl enable cadvisor.service
    echo "Cadvisor service is already started successful"
    exit 0
    else
        echo "Command is not have version for create, add and try again."
        exit 1
    fi
elif [[ "$1" == "destroy" ]]; then
    # Stop service node exporter | if failed return message
    sudo systemctl stop cadvisor.service 2> /dev/null || (echo "Not exist a cadvisor service, check again" | exit 1)
    # Remove the anything refer node_exporeter include serive and binary file
    sudo rm -rf /etc/systemd/system/cadvisor.service
    sudo rm -rf /usr/local/bin/cadvisor
    echo "cadvisor is stopped and removed successfully"
    exit 0
elif [[ "$1" == "down" ]]; then
    # Stop service node exporter | if failed return message
    sudo systemctl stop cadvisor.service 2> /dev/null || (echo "Not exist a cadvisor service, check again" | exit 1)
    echo "cadvisor is stopped successfully"
    exit 0
elif [[ "$1" == "up" ]]; then
    # Start service node exporter | if failed return message
    sudo systemctl start cadvisor.service 2> /dev/null || (echo "Not exist a cadvisor service, check again" | exit 1)
    echo "cadvisor is started successfully"
    exit 0
else
    echo "Missing arguments, please specify to using the bash command"
    exit 1
fi
```