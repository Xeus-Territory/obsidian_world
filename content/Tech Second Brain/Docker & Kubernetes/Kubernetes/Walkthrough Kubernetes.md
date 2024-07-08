---
title: Walkthrough Kubernetes
tags:
  - k8s
  - usage
  - helpful
---
# Can use volume with cronjobs

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

# Do Kubernetes Pods Really Get Evicted Due to CPU Pressure?

Reference article: [Do Kubernetes Pods Really Get Evicted Due to CPU Pressure?](https://medium.com/overcast-blog/do-pods-really-get-evicted-due-to-cpu-pressure-2b27274a670c)

>[!hint]
>Pods are not directly evicted due to high CPU pressure or usage alone. Instead, Kubernetes relies on CPU throttling mechanisms to manage and limit a pod’s CPU usage, ensuring fair resource sharing among pods on the same node.
>
>While high CPU usage by a pod can indirectly contribute to resource pressure and potentially lead to eviction due to memory or other resource shortages, CPU throttling is the primary mechanism used to manage CPU-intensive workloads

# # Restart `Statefulset` workload

*Related link*

- [Delete a StatefulSet](https://kubernetes.io/docs/tasks/run-application/delete-stateful-set/)
- [Force Delete StatefulSet Pods](https://kubernetes.io/docs/tasks/run-application/force-delete-stateful-set-pod/)

**Notice**

1. Do not removing `statefulset` workload, it will scale down to 0 and not bring up anymore. Instead of just removing pods, It will help the pods restart base on `statefulset` strategy
2. Rollout `statefulset` is not work when status of `statefulset` is `completed`
3. Deleting pods in `statefulset` will not remove **associated volume**

>[!note]
> Deleting the PVC after the pods have terminated might trigger deletion of the backing Persistent Volumes depending on the storage class and reclaim policy. You should never assume ability to access a volume after claim deletion.
> 
> Note: Use caution when deleting a PVC, as it may lead to data loss.

 4. Complete deletion of a `StatefulSet`
 
To delete everything in a `StatefulSet`, including the associated pods, you can run a series of commands similar to the following*
 
```bash
grace=$(kubectl get pods <stateful-set-pod> --template '{{.spec.terminationGracePeriodSeconds}}')
kubectl delete statefulset -l app.kubernetes.io/name=MyApp
sleep $grace
kubectl delete pvc -l app.kubernetes.io/name=MyApp
```
