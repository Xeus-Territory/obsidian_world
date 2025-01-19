---
title: DIY Shell Script Collections
tags:
  - linux
  - DIY
  - devops
  - helpful
  - usage
  - api
  - architecture
  - automation
---
# Blue Green Deployment Docker for Zero Downtime

>[!summary]
>Zero Downtime and Automation CD for raw machine with Nginx configuration (Using the combination with GLAB for example - Add another if you do customize)
>
>Purpose: Create a platform specific the non't downtime when deploying. Specifically with Blue and Green Deployments Methods, Maybe have Yellow Intergration its for make sure it can perform CD
> 
> Provide the output in the format:
> 
> Date: Oct 2023
> Author: Xeus Nguyen

```bash title="blue_green_cd.sh"
#!/bin/bash
# Read the input parameter and check missing parameters
gitlab_username=$1
glab_token=$2
env_file_path=$3
nginx_config_path=$4
number_of_replicas=$5
image_container_for_be_pulling=$6
image_container_for_fe_pulling=$7
name_repo_glab_backend=$8
name_repo_glab_frontend=$9
if [ -z $1 ] || [ -z $2 ] || [ -z $3 ] || [ -z $4 ] || [ -z $5 ] || [ -z $6 ] || [ -z $7 ]; then
    echo -n "Missing parameter, checking again ..."
    exit 1
fi
# Provide the name of your container and more thing specific
nginx_container_name="YOUR_NGINX_CONTAINER_NAME"
backend_container_name="NAME_OF_BACKEND_CONTAINER"                     # Specify if you want to assign it for backend tag
frontend_container_name="NAME_OF_FRONT_END_CONTAINER"                  # Specify if you want to assign it for frontend tag
backend_latest_tag_path="PATH_TO_GET_LATEST_TAG_BE"                    # Specify if you put that tag inside for backend container
frontend_latest_tag_path="PATH_TO_GET_LATEST_TAG_FE"                   # Specify if you put that tag inside for frontend container
aws_infromation_path="PATH_TO_GET_AWS_INFO"                            # Specify it when you want to update AWS information (Default: It will help you update ENV file)
portainer_team_if_you_have="PORTAINER_TEAM_NAME_CONTROLLER_CONTANINER" # Specify name of the teamname for controlling the container via portainer
network_for_container="NETWORK_FOR_CONTAINER_USING"                    # Specify name of network for join the container inside
health_check_command_be="HEALTH_CHECK_COMMAND_BE"                      # Specify command to run when health check BE (Ex: # --health-cmd 'curl -Is localhost:8080/openapi/docs | head -n 1')
health_check_command_fe="HEALTH_CHECK_COMMAND_FE"                      # Specify command to run when health check FE (Ex: # --health-cmd 'curl -Is localhost:8080/openapi/docs | head -n 1')
# Initialize the config of Nginx
nginx_default_config_path="$nginx_config_path/nginx_default.conf"
original_config=$(cat $nginx_config_path/original.conf) || exit 1
backend_update=$(cat $nginx_config_path/backend_update.conf) || exit 1
frontend_update=$(cat $nginx_config_path/frontend_update.conf) || exit 1
# Function to retrive a new environment variable
retrive_env_file() {
    bucket="$1"
    amzFile="$2"
    outputFile="$3"
    resource="/${bucket}/${amzFile}"
    contentType="application/x-compressed-tar"
    dateValue=$(date -R)
    stringToSign="GET\n\n${contentType}\n${dateValue}\n${resource}"
    AWS_ACCESS_KEY_ID="$4"
    AWS_SECRET_ACCESS_KEY="$5"
    signature=$(echo -en "${stringToSign}" | openssl sha1 -hmac ${AWS_SECRET_ACCESS_KEY} -binary | base64)
    echo -n "$(curl -H "Host: ${bucket}.s3.amazonaws.com" \
        -H "Date: ${dateValue}" \
        -H "Content-Type: ${contentType}" \
        -H "Authorization: AWS ${AWS_ACCESS_KEY_ID}:${signature}" \
        https://${bucket}.s3.amazonaws.com/${amzFile} -o "$outputFile")"
}
# Function for reconfigure for Nginx Proxy when have updated
nginx_service_reload() {
    docker exec $(docker ps | grep $nginx_container_name | awk '{print $1}') nginx -s reload
}
# Function to doing health checks for new container is deployed
healthcheck_container() {
    infoContainer=$1
    while true; do
        if [ "$(docker ps | grep $infoContainer | grep healthy | xargs)" == "" ]; then
            continue
        else
            echo "$infoContainer is already healthy"
            break
        fi
    done
}
# Function to route traffic from old to new with zero down times
route_traffic_old_to_new() {
    # Intilize the variables used for function
    service=$1
    # Conditional for checking and executing route traffic from old to new containers
    if [ $service == "TAG_BACKEND" ]; then
        # Replace original config to new for proxy new container
        echo -n "$backend_update" >$nginx_default_config_path
        healthcheck_container "$backend_container_name"_2
        nginx_service_reload
        sleep 5
        # Remove the old container for reconfiguration new to orignal state
        remove_image=$(docker ps | grep "$backend_container_name"_1 | awk '{print $2}')
        docker rm -f $(docker ps | grep "$backend_container_name"_1 | awk '{print $1}')
        docker rmi -f $remove_image
        # Choose the strategy for upgrading traffic proxy to zero down time deployment
        if [ $number_of_replicas -eq 3 ]; then
            # Option 1: Use 3 Applications Containers for reducing too much down time
            healthcheck_container "$backend_container_name"_bk
            docker rename "$backend_container_name"_bk "$backend_container_name"_1
            # Replace againts original config
            echo -n "$original_config" >$nginx_default_config_path
            nginx_service_reload
            docker rm -f $(docker ps | grep "$backend_container_name"_2 | awk '{print $1}')
        fi
        if [ $number_of_replicas -eq 2 ]; then
            # Option 2: Just use 2 Applications Containers for reducing zero down time
            docker rename "$backend_container_name"_2 "$backend_container_name"_1
            # Replace againts original config
            echo -n "$original_config" >$nginx_default_config_path
            nginx_service_reload
        fi
    # Running migrate to upgrade new structure for database when new container is deployed
    # It just uses when you want to migrate it when you use crystal (Uncomment if you want to)
    # sleep 5
    # docker exec "$backend_container_name"_1 crystal sam.cr db:migrate
    fi
    if [ $service == "TAG_FRONTEND" ]; then
        # Replace original config to new for proxy new container
        echo -n "$frontend_update" >$nginx_default_config_path
        healthcheck_container "$frontend_container_name"_2
        nginx_service_reload
        sleep 5
        # Remove the old container for reconfiguration new to orignal state
        remove_image=$(docker ps | grep "$frontend_container_name"_1 | awk '{print $2}')
        docker rm -f $(docker ps | grep "$frontend_container_name"_1 | awk '{print $1}')
        docker rmi -f $remove_image
        # Choose the strategy for upgrading traffic proxy to zero down time deployment
        if [ $number_of_replicas -eq 3 ]; then
            # Option 1: Use 3 Applications Containers for reducing too much down time
            healthcheck_container "$frontend_container_name"_bk
            docker rename "$frontend_container_name"_bk "$frontend_container_name"_1
            # Replace againts original config
            echo -n "$original_config" >$nginx_default_config_path
            nginx_service_reload
            docker rm -f $(docker ps | grep "$frontend_container_name"_2 | awk '{print $1}')
            # Give the time breaker for stable update front end (Need much resources to upgrade) (Change a number if you want)
            sleep 240
        fi
        if [ $number_of_replicas -eq 2 ]; then
            # Option 2: Just use 2 Applications Containers for reducing zero down time
            docker rename "$frontend_container_name"_2 "$frontend_container_name"_1
            # Replace againts original config
            echo -n "$original_config" >$nginx_default_config_path
            nginx_service_reload
            # Give the time breaker for stable update front end (Need much resources to upgrade) (Change a number if you want)
            sleep 240
        fi
    fi
}
# Function to pull and upgrade the image for container
check_latest_tags_version() {
    # Intilize the variables used for function
    name_tags=$1
    check_tags=$2
    # Set current_tags on the machine for check new update
    if [ $name_tags == "TAG_BACKEND" ]; then
        current_tags=$(cat $backend_latest_tag_path)
    fi
    if [ $name_tags == "TAG_FRONTEND" ]; then
        current_tags=$(cat $frontend_latest_tag_path)
    fi
    if [ $current_tags == $check_tags ]; then
        return
    else
        if [ $name_tags == "TAG_BACKEND" ]; then
            # Retrive a new env file before pull new image
            retrive_env_file "$(cat $aws_infromation_path/s3_bucket)" \
                "$(cat $aws_infromation_path/bucket_file_path)" \
                "$env_file_path" "$(cat $aws_infromation_path/aws_access_key_id)" \
                "$(cat $aws_infromation_path/aws_secret_access_key)"
            # Pull new image and upgrade tags stored
            docker pull $image_container_for_be_pulling:$check_tags
            echo $check_tags >$backend_latest_tag_path
            # Run a new container with new image
            docker run -d --name "$backend_container_name"_2 \
                --env-file $env_file_path \
                --label io.portainer.accesscontrol.teams="$portainer_team_if_you_have" \
                --network $network_for_container \
                --health-cmd $health_check_command_be \
                --health-interval '3s' \
                --health-retries 3 \
                --add-host "host.docker.internal:host-gateway" \
                $image_container_for_be_pulling:$check_tags
            if [ $number_of_replicas -eq 3 ]; then
                # Run a new replication with new image (Testing for unavailable versions)
                docker run -d --name "$backend_container_name"_bk \
                    --env-file $env_file_path \
                    --label io.portainer.accesscontrol.teams="$portainer_team_if_you_have" \
                    --network $network_for_container \
                    --health-cmd $health_check_command_be \
                    --health-interval '3s' \
                    --health-retries 3 \
                    --add-host "host.docker.internal:host-gateway" \
                    $image_container_for_be_pulling:$check_tags
            fi
            # Zero Downtime deployments for backend
            route_traffic_old_to_new $name_tags
        fi
        if [ $name_tags == "TAG_FRONTEND" ]; then
            # Retrive a new env file before pull new image
            retrive_env_file "$(cat $aws_infromation_path/s3_bucket)" \
                "$(cat $aws_infromation_path/bucket_file_path)" \
                "$env_file_path" "$(cat $aws_infromation_path/aws_access_key_id)" \
                "$(cat $aws_infromation_path/aws_secret_access_key)"
            # Pull new image and upgrade tags stored
            docker pull $image_container_for_fe_pulling:$check_tags
            echo $check_tags >$frontend_latest_tag_path
            # Run a new container with new image
            docker run -d --name "$frontend_container_name"_2 \
                --env-file $env_file_path \
                --label io.portainer.accesscontrol.teams="$portainer_team_if_you_have" \
                --network $network_for_container \
                --health-cmd $health_check_command_fe \
                --health-interval '3s' \
                --health-retries 3 \
                --add-host "host.docker.internal:host-gateway" \
                $image_container_for_fe_pulling:$check_tags
            if [ $number_of_replicas -eq 3 ]; then
                # Run a new replication with new image (Testing for unavailable versions)
                docker run -d --name "$frontend_container_name"_bk \
                    --env-file $env_file_path \
                    --label io.portainer.accesscontrol.teams="$portainer_team_if_you_have" \
                    --network $network_for_container \
                    --health-cmd $health_check_command_fe \
                    --health-interval '3s' \
                    --health-retries 3 \
                    --add-host "host.docker.internal:host-gateway" \
                    $image_container_for_fe_pulling:$check_tags
            fi
            # Zero Downtime deployments for frontend
            route_traffic_old_to_new $name_tags
        fi
    fi
}
## find the userID and repo to access the registry
userid=$(curl -H "PRIVATE-TOKEN: $glab_token" "https://gitlab.com/api/v4/users?username=$gitlab_username" | jq '.[].id')
glab_be_id=$(curl -H "PRIVATE-TOKEN: $glab_token" "https://gitlab.com/api/v4/users/$userid/contributed_projects" | jq --arg REPO_GLAB_BACKEND "$name_repo_glab_backend" '.[] | select(.name == "REPO_GLAB_BACKEND") | .id')
glab_fe_id=$(curl -H "PRIVATE-TOKEN: $glab_token" "https://gitlab.com/api/v4/users/$userid/contributed_projects" | jq --arg REPO_GLAB_FRONTEND "$name_repo_glab_frontend" '.[] | select(.name == "REPO_GLAB_FRONTEND") | .id')
registry_glab_be_id=$(curl -H "PRIVATE-TOKEN: $glab_token" "https://gitlab.com/api/v4/projects/$glab_be_id/registry/repositories" | jq '.[].id')
registry_glab_fe_id=$(curl -H "PRIVATE-TOKEN: $glab_token" "https://gitlab.com/api/v4/projects/$glab_fe_id/registry/repositories" | jq '.[].id')
list_tag_glab_be=$(curl -H "PRIVATE-TOKEN: $glab_token" "https://gitlab.com/api/v4/registry/repositories/$registry_glab_be_id?tags=true&tags_count=true&size=true" | jq '.tags[]' | jq -jr '.name, " "')
list_tag_glab_fe=$(curl -H "PRIVATE-TOKEN: $glab_token" "https://gitlab.com/api/v4/registry/repositories/$registry_glab_fe_id?tags=true&tags_count=true&size=true" | jq '.tags[]' | jq -jr '.name, " "')
latest_commit_sha_glab_be=$(curl -H "PRIVATE-TOKEN: $glab_token" "https://gitlab.com/api/v4/projects/$glab_be_id/repository/branches/main" | jq '.commit.short_id' | tr -d '\"')
latest_commit_sha_glab_fe=$(curl -H "PRIVATE-TOKEN: $glab_token" "https://gitlab.com/api/v4/projects/$glab_fe_id/repository/branches/main" | jq '.commit.short_id' | tr -d '\"')
## Check the latest tag and update the image in currently project
if [ ! -z "$(echo $list_tag_glab_fe | grep $latest_commit_sha_glab_fe)" ]; then
    check_latest_tags_version TAG_FRONTEND $latest_commit_sha_glab_fe
fi
if [ ! -z "$(echo $list_tag_glab_be | grep $latest_commit_sha_glab_be)" ]; then
    check_latest_tags_version TAG_BACKEND $latest_commit_sha_glab_be
fi
# Add more time to confirm reload nginx configure
nginx_service_reload
```

# Systemd Service

## Cadvisor

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

## Node Exporter

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

# Sync Repo file in Gitlab

>[!summary]
>This script is used to synchronize the files inside 2 different directories which come from 2 repo gitlab

```bash title="synchronize_gitlab.sh"
#! /bin/bash

# Initialize variables for running the script
PRIVATE_GLAB_TOKEN=$1
GLAB_USERNAME=$2
BRANCH_REPO_CHECKED="main"
BRANCH_CHECKOUT_REPO_SYNCHRONIZED="main"
BRANCH_OPENMR="openmr/synchronize/update-$(date +"%T-%d-%m-%y" | tr -d ":")"
REPO_CHECKED_NAME="Lab 1"
REPO_SYNCHRONIZED_NAME="Lab 2"
REPO_PATH_CHECKED="json/"
REPO_PATH_SYNCHRONIZED="storage/"
TARGET_BRANCH_SYNCHRONIZED_REPO="main"

if [ -z "$PRIVATE_GLAB_TOKEN" ] || [ -z "$GLAB_USERNAME" ]; then
    echo "Please provide a PAT and USERNAME for moving on next step ..." && exit 1
fi

# Prepare id to be used for another process via GLAB API
GLAB_USER_ID=$(curl -H "PRIVATE-TOKEN: $PRIVATE_GLAB_TOKEN" "https://gitlab.com/api/v4/users?username=$GLAB_USERNAME" | jq '.[].id')
REPO_CHECKED_ID=$(curl -H "PRIVATE-TOKEN: $PRIVATE_GLAB_TOKEN" "https://gitlab.com/api/v4/users/$GLAB_USER_ID/contributed_projects" | jq --arg REPO_CHECKED_NAME "$REPO_CHECKED_NAME" '.[] | select(.name == $REPO_CHECKED_NAME) | .id')
REPO_SYNCHRONIZED_ID=$(curl -H "PRIVATE-TOKEN: $PRIVATE_GLAB_TOKEN" "https://gitlab.com/api/v4/users/$GLAB_USER_ID/contributed_projects" | jq --arg REPO_SYNCHRONIZED_NAME "$REPO_SYNCHRONIZED_NAME" '.[] | select(.name == $REPO_SYNCHRONIZED_NAME) | .id')

# This curl will be create new branch for checkout from main or develop
curl -o /dev/null -H "PRIVATE-TOKEN: $PRIVATE_GLAB_TOKEN" -X POST "https://gitlab.com/api/v4/projects/$REPO_SYNCHRONIZED_ID/repository/branches?branch=$BRANCH_OPENMR&ref=$BRANCH_CHECKOUT_REPO_SYNCHRONIZED"

# # This curl will be create a new commit for new branch (Examples)
# curl -H "PRIVATE-TOKEN: $PRIVATE_TOKEN" -X POST \
#      --form "branch=$openmr" \
#      --form "commit_message=some commit message" \
#      --form "actions[][action]=update" \
#      --form "actions[][file_path]=test.json" \
#      --form "actions[][content]=<test.json" \
#      "https://gitlab.com/api/v4/projects/$lab2_id/repository/commits"

# This script and curl will be create a new commit for new branch

LATEST_SHA_REPO_CHECKED=$(curl -H "PRIVATE-TOKEN: $PRIVATE_GLAB_TOKEN" "https://gitlab.com/api/v4/projects/$REPO_CHECKED_ID/repository/branches/$BRANCH_REPO_CHECKED" | jq '.commit.id' | tr -d "\"")

LIST_DIFF_FILE_BASE_ON_CHECKPATH=$(curl -H "PRIVATE-TOKEN: $PRIVATE_GLAB_TOKEN" "https://gitlab.com/api/v4/projects/$REPO_CHECKED_ID/repository/commits/$LATEST_SHA_REPO_CHECKED/diff" | jq '.[] | select (.old_path | contains("'$REPO_PATH_CHECKED'")) | .old_path' | tr -d "\"" | cut -d "/" -f2)

CURL_COMMAND_COMMIT="curl -o /dev/null -H \"PRIVATE-TOKEN: $PRIVATE_GLAB_TOKEN\" -X POST --form \"branch=$BRANCH_OPENMR\" --form \"commit_message=Synchonized Between Repos (This commit is created automatically)\""

for ITEM in $LIST_DIFF_FILE_BASE_ON_CHECKPATH; do
    ADDITIONAL_CURL_COMMAND=" --form \"actions[][action]=update\" --form \"actions[][file_path]=$REPO_PATH_SYNCHRONIZED$ITEM\" --form \"actions[][content]=<$REPO_PATH_CHECKED$ITEM\""
    CURL_COMMAND_COMMIT+=$ADDITIONAL_CURL_COMMAND
done

COMPLETE_CURL_COMMAND="$CURL_COMMAND_COMMIT \"https://gitlab.com/api/v4/projects/$REPO_SYNCHRONIZED_ID/repository/commits\""

bash -c "$COMPLETE_CURL_COMMAND"

# This curl will be create a merge request into develop or main

curl -o /dev/null -H "PRIVATE-TOKEN: $PRIVATE_GLAB_TOKEN" -X POST \
     --form "id=$REPO_SYNCHRONIZED_ID" \
     --form "source_branch=$BRANCH_OPENMR" \
     --form "target_branch=$TARGET_BRANCH_SYNCHRONIZED_REPO" \
     --form "title=Snychronized 2 repo (This MR is automatically created)" \
     --form "remove_source_branch=true" \
    "https://gitlab.com/api/v4/projects/$REPO_SYNCHRONIZED_ID/merge_requests"


```

# Config Portainer in Docker

>[!summary]
> Simple script is used for working with Portainer

```bash title="config_portainer.sh"
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