---
title: Setup Node Exporter for your host
tags:
  - devops
  - usage
  - helpful
---
>[!info]
>Node exporter is agent which help you export metric of  machine, It can be used with `Prometheus`
>
>Github: https://github.com/Xeus-Territory/ntma_anomaly/blob/main/Script/worker/bash/setup-node-exporter.sh

The script is creating for purpose help you self-host node_exporter on your local machine

```bash
#!/bin/bash

if [[ "$1" == "create" ]]; then
    # Download the package node exporter and extract the pack
    if [[ "$2" != "" ]]; then
        echo "Downloading package node exporter version $2"
        curl -LO https://github.com/prometheus/node_exporter/releases/download/v"$2"/node_exporter-"$2".linux-amd64.tar.gz
        tar -xvf node_exporter-"$2".linux-amd64.tar.gz > /dev/null
        sudo mv node_exporter-"$2".linux-amd64/node_exporter /usr/local/bin
        rm -rf node_exporter-"$2".linux-amd64.tar.gz && rm -rf node_exporter-"$2".linux-amd64
        # Write the service for systemd and start it --> The node exporter will run on port 9100
        cat << EOF | sudo tee /etc/systemd/system/node_exporter.service > /dev/null
[Unit]
Description=Prometheus Node Exporter
Documentation=https://github.com/prometheus/node_exporter
After=network-online.target

[Service]
User=root
ExecStart=/usr/local/bin/node_exporter  $OPTIONS
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF
        sudo systemctl start node_exporter.service
        sudo systemctl enable node_exporter.service
        echo "Node_exporter started successfully"
        exit 0
    else
        echo "Unknow version for package node exporter, try again"
        exit 1
    fi
elif [[ "$1" == "destroy" ]]; then
    # Stop service node exporter | if failed return message
    sudo systemctl stop node_exporter.service 2> /dev/null || (echo "Not exist a node exporter service, check again" | exit 1)
    # Remove the anything refer node_exporeter include serive and binary file
    sudo rm -rf /etc/systemd/system/node_exporter.service
    sudo rm -rf /usr/local/bin/node_exporter
    echo "Node_exporter is stopped and removed successfully"
    exit 0
elif [[ "$1" == "down" ]]; then
    # Stop service node exporter
    sudo systemctl stop node_exporter.service 2> /dev/null || (echo "Not exist a node exporter service, check again" | exit 1)
    echo "Node-exporter is stopped successfully"
elif [[ "$1" == "up" ]]; then
    # Start stop service node exporter
    sudo systemctl start node_exporter.service 2> /dev/null || (echo "Not exist a node exporter service, check again" | exit 1)
    echo "Node-exporter is started successfully"
else
    echo "Unknow option do you want, add option and try again"
    exit 1
fi
```