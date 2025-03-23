---
title: The awesome of Elasticsearch
tags:
  - cheatsheet
  - api
  - usage
  - database
  - elasticsearch
---

# Documentations and Articles

## Setup

- [Elastic - Set up a cluster for high availability](https://www.elastic.co/guide/en/elasticsearch/reference/current/high-availability.html)

## Tips & configuration

- [Opster - Elasticsearch Heap Size Usage and JVM Garbage Collection](https://opster.com/guides/elasticsearch/capacity-planning/elasticsearch-heap-size-usage/)
- [Elastic - Orchestrating Elastic Stack applications](https://www.elastic.co/guide/en/cloud-on-k8s/current/k8s-orchestrating-elastic-stack-applications.html)

# Interaction with Elasticsearch via CURL

>[!summary]
>This note content the basic, popular command of `elasticsearch` and case it can use

>[!note]
>All commands will work if you need bypass HTTPS. But if it not accepted, you need to provide the `crt` and `key` with compulsory

1. Get the list snapshot

```shell
curl --insecure -X GET "https://<es-username>:<es-password>@<es-domain>:<es-port>/_cat/snapshots/<repository>"
``` 

2. Delete specify snapshot 

```shell
curl -X DELETE --insecure "https://<es-username>:<es-password>@<es-domain>:<es-port>/_snapshot/<repository>/<name-snapshot>
```

3. List first 50 snapshot, add `comma` to easily create the removing strings

```bash
curl --insecure -X GET "https://<es-username>:<es-password>@<es-domain>:<es-port>/_cat/snapshots/azure" | awk '{print $1}' | head -n 50 | xargs -I{} echo -n "{}," | rev | cut -c2- | rev | xargs
```

