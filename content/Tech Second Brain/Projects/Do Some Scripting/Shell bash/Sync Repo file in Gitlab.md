---
title: Sync Repo file in Gitlab
tags:
  - gitlab
  - bash
  - linux
---
*This script is used to synchronize the files inside 2 different directories which come from 2 repo gitlab

```bash
# synchronize_gitlab.sh

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