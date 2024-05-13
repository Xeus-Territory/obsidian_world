---
title: Can use volume with cronjobs ?
tags:
  - k8s
  - devops
  - basic-knowledge
---
>[!purpose]
>This note will content the thing which finding on working progress with K8s. Just take note and link for resolving the problem. Find out detail if it has unique directory

`Cronjobs --> Create Jobs (Trigger by scheduled) --> Pod` : In this situation, Pod in K8s can used the volume and mount succeed when the script running. But if you applied it with pods, it will not, your `command` will run faster than mount progress. [Checked it in this link](https://stackoverflow.com/questions/46578331/kubernetes-is-it-possible-to-mount-volumes-to-a-container-running-as-a-cronjob) 

```yaml
apiVersion: batch/v1beta1
kind: CronJob
metadata:
  name: update-db
spec:
  schedule: "*/1 * * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: update-fingerprints
            image: python:3.6.2-slim
            command: ["/bin/bash"]
            args: ["-c", "python /client/test.py"]
            volumeMounts:
            - name: application-code
              mountPath: /where/ever
          restartPolicy: OnFailure
          volumes:
          - name: application-code
            persistentVolumeClaim:
              claimName: application-code-pv-claim
```
