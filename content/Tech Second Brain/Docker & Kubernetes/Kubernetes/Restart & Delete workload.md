---
title: Restart & Delete workloads
tags:
  - k8s
  - troubleshoot
  - devops
  - solutions
---
# Restart `Statefulset` workload

*Related link*

- [Delete a StatefulSet](https://kubernetes.io/docs/tasks/run-application/delete-stateful-set/)
## Notice

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

# Force Delete `StatefulSet` Pods

*Related link*

- [Force Delete StatefulSet Pods](https://kubernetes.io/docs/tasks/run-application/force-delete-stateful-set-pod/)
