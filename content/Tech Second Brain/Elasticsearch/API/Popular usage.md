---
title: Elasticsearch API - Popular usage
tags:
  - cheatsheet
  - api
  - usage
---
*Purpose: This note content the basic, popular command of `elasticsearch` and case it can use*

*(All commands will work if you need bypass HTTPS, But if it not accepted, you need to provide the crt and key with compulsory)* 
1. Get the list snapshot

```shell
curl --insecure -X GET "https://<es-username>:<es-password>@<es-domain>:<es-port>/_cat/snapshots/<repository>"
``` 

2. Delete specify snapshot 

```shell
curl -X DELETE --insecure "https://<es-username>:<es-password>@<es-domain>:<es-port>/_snapshot/<repository>/<name-snapshot>
```

3. List first 50 snapshot, add `colon` to easily create the removing strings

```bash
curl --insecure -X GET "https://<es-username>:<es-password>@<es-domain>:<es-port>/_cat/snapshots/azure" | awk '{print $1}' | head -n 50 | xargs -I{} echo -n "{}," | rev | cut -c2- | rev | xargs
```

