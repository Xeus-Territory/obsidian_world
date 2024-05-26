---
title: AWS CLI
tags:
  - aws
  - cloud-services
  - devops
  - admin
---
>[!info]
>With cheatsheet some situation i set it up `--endpoint-url` it mean i use `localstack` for virtualization `aws` cloud on my machine, so keep mind and skip the flag if you want to applied to your aws account
# S3

1. Create the bucket

```bash
aws --endpoint-url=http://localhost:4566 s3api create-bucket --bucket sample-bucket
```

2. List the object in the bucket

```bash
aws --endpoint-url=http://localhost:4566 s3 ls s3://sample-bucket/
```

3. Upload the object from directory to bucket, with **single file** or **multiple files**

```bash
# Upload only one file or dir
aws --endpoint-url=http://localhost:4566 s3 cp file|dir s3://sample-bucket

# Upload multiple
aws --endpoint-url=http://localhost:4566 s3 cp file|dir s3://sample-bucket --recursive
```

4. Read contents inside bucket

```bash
aws --endpoint-url=http://localhost:4566 s3 cp s3://sample-bucket/file -
```
