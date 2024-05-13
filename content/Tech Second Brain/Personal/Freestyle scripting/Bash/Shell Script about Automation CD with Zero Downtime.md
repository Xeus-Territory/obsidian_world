---
title: Shell Script about Automation CD with Zero Downtime
tags:
  - linux
  - solutions
  - cicd
  - bash
  - architecture
  - devops
---
>[!summary]
>Zero Downtime and Automation CD for raw machine with Nginx configuration (Using the combination with GLAB for example - Add another if you do customize)
>
>Purpose: Create a platform specific the non't downtime when deploying. Specifically with Blue and Green Deployments Methods, Maybe have Yellow Intergration its for make sure it can perform CD
> 
> Provide the output in the format:
> 
> Date: Oct 2023
> Author: Xeus Nguyen

```bash title="automation_cd.sh"

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

  

if [ -z $1 ] || [ -z $2 ]|| [ -z $3 ] || [ -z $4 ] || [ -z $5 ] || [ -z $6 ] || [ -z $7 ]; then

    echo -n "Missing parameter, checking again ..."

    exit 1

fi

  

# Provide the name of your container and more thing specific

nginx_container_name="YOUR_NGINX_CONTAINER_NAME"

backend_container_name="NAME_OF_BACKEND_CONTAINER" # Specify if you want to assign it for backend tag

frontend_container_name="NAME_OF_FRONT_END_CONTAINER" # Specify if you want to assign it for frontend tag

backend_latest_tag_path="PATH_TO_GET_LATEST_TAG_BE" # Specify if you put that tag inside for backend container

frontend_latest_tag_path="PATH_TO_GET_LATEST_TAG_FE" # Specify if you put that tag inside for frontend container

aws_infromation_path="PATH_TO_GET_AWS_INFO" # Specify it when you want to update AWS information (Default: It will help you update ENV file)

portainer_team_if_you_have="PORTAINER_TEAM_NAME_CONTROLLER_CONTANINER" # Specify name of the teamname for controlling the container via portainer

network_for_container="NETWORK_FOR_CONTAINER_USING" # Specify name of network for join the container inside

health_check_command_be="HEALTH_CHECK_COMMAND_BE" # Specify command to run when health check BE (Ex: # --health-cmd 'curl -Is localhost:8080/openapi/docs | head -n 1')

health_check_command_fe="HEALTH_CHECK_COMMAND_FE" # Specify command to run when health check FE (Ex: # --health-cmd 'curl -Is localhost:8080/openapi/docs | head -n 1')

  
  

# Initialize the config of Nginx

nginx_default_config_path="$nginx_config_path/nginx_default.conf"

original_config=$(cat $nginx_config_path/original.conf) || exit 1

backend_update=$(cat $nginx_config_path/backend_update.conf) || exit 1

frontend_update=$(cat $nginx_config_path/frontend_update.conf) || exit 1

  

# Function to retrive a new environment variable

retrive_env_file()

{

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

  

    echo -n "$(curl  -H "Host: ${bucket}.s3.amazonaws.com" \

        -H "Date: ${dateValue}" \

        -H "Content-Type: ${contentType}" \

        -H "Authorization: AWS ${AWS_ACCESS_KEY_ID}:${signature}" \

        https://${bucket}.s3.amazonaws.com/${amzFile} -o "$outputFile")"

}

  

# Function for reconfigure for Nginx Proxy when have updated

nginx_service_reload()

{

    docker exec $(docker ps | grep $nginx_container_name | awk '{print $1}') nginx -s reload

}

  

# Function to doing health checks for new container is deployed

healthcheck_container()

{

    infoContainer=$1

    while true;

        do

            if [ "$(docker ps | grep $infoContainer | grep healthy | xargs)" == "" ]; then

                continue

            else

                echo "$infoContainer is already healthy"

                break

            fi

        done

}

  

# Function to route traffic from old to new with zero down times

route_traffic_old_to_new()

{  

    # Intilize the variables used for function

    service=$1

  

    # Conditional for checking and executing route traffic from old to new containers

    if [ $service == "TAG_BACKEND" ]; then

  

        # Replace original config to new for proxy new container

        echo -n "$backend_update" > $nginx_default_config_path

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

            echo -n "$original_config" > $nginx_default_config_path

            nginx_service_reload

            docker rm -f $(docker ps | grep "$backend_container_name"_2 | awk '{print $1}')

  

        fi

        if [ $number_of_replicas -eq 2 ]; then

            # Option 2: Just use 2 Applications Containers for reducing zero down time

            docker rename "$backend_container_name"_2 "$backend_container_name"_1

            # Replace againts original config

            echo -n "$original_config" > $nginx_default_config_path

            nginx_service_reload

        fi

  

        # Running migrate to upgrade new structure for database when new container is deployed

        # It just uses when you want to migrate it when you use crystal (Uncomment if you want to)

        # sleep 5

        # docker exec "$backend_container_name"_1 crystal sam.cr db:migrate

    fi

    if [ $service == "TAG_FRONTEND" ]; then

  

        # Replace original config to new for proxy new container

        echo -n "$frontend_update" > $nginx_default_config_path

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

            echo -n "$original_config" > $nginx_default_config_path

            nginx_service_reload

            docker rm -f $(docker ps | grep "$frontend_container_name"_2 | awk '{print $1}')

            # Give the time breaker for stable update front end (Need much resources to upgrade) (Change a number if you want)

            sleep 240

        fi

        if [ $number_of_replicas -eq 2 ]; then

            # Option 2: Just use 2 Applications Containers for reducing zero down time

            docker rename "$frontend_container_name"_2 "$frontend_container_name"_1

            # Replace againts original config

            echo -n "$original_config" > $nginx_default_config_path

            nginx_service_reload

            # Give the time breaker for stable update front end (Need much resources to upgrade) (Change a number if you want)

            sleep 240

        fi

    fi

}

  

# Function to pull and upgrade the image for container

check_latest_tags_version()

{

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

                    "$env_file_path"  "$(cat $aws_infromation_path/aws_access_key_id)" \

                    "$(cat $aws_infromation_path/aws_secret_access_key)"

  

            # Pull new image and upgrade tags stored

            docker pull $image_container_for_be_pulling:$check_tags

            echo $check_tags > $backend_latest_tag_path

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

                    "$env_file_path"  "$(cat $aws_infromation_path/aws_access_key_id)" \

                    "$(cat $aws_infromation_path/aws_secret_access_key)"

  

            # Pull new image and upgrade tags stored

            docker pull $image_container_for_fe_pulling:$check_tags

            echo $check_tags > $frontend_latest_tag_path

  

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