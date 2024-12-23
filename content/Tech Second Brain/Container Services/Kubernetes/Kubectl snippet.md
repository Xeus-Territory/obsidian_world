---
title: Kubectl snippet
tags:
  - k8s
  - devops
  - helpful
  - usage
---
>[!info]
>Small script and take a note to interact between `kubectl` and your kubernetes cluster.

You can explore command with `kubectl` in some place, including

- [kubectl Quick Reference](https://kubernetes.io/docs/reference/kubectl/quick-reference/)
- [kubectl reference](https://kubernetes.io/docs/reference/kubectl/generated/)
# Get base64 decode of secret with no more 3th party

```bash
kubectl get secrets -n <namespace> <secret> -o go-template='{{range $k,$v := .data}}{{"### "}}{{$k}}{{"\n"}}{{$v|base64decode}}{{"\n\n"}}{{end}}'
```

# Debug your node via kubectl

```bash
kubectl debug node/my-node -it --image=<img>
```

# Check the resource of workload with `resource-capacity` extension

Download via `krew`, find out the step at [krew installing](https://krew.sigs.k8s.io/docs/user-guide/setup/install/)

```bash
# Extension: https://github.com/robscott/kube-capacity

# Check the available resources
kubectl resource-capacity -a

# Check detail resource utilize of all workload
kubectl resource-capacity -p --util
```

# Scale down the `statefulset` application

```bash
# Use scale option
kubectl scale --replicas=0 sts <sts name>

# Or we can use patch or edit option
kubectl patch statefulsets <stateful-set-name> -p '{"spec":{"replicas":<new-replicas>}}'
```

You need to consider when apply scaling down can not working because *"cannot scale down a StatefulSet when any of the stateful Pods it manages is unhealthy. Scaling down only takes place after those stateful Pods become running and ready."* . Read more in: [Scale a StatefulSet](https://kubernetes.io/docs/tasks/run-application/scale-stateful-set/#troubleshooting)

# Delete `pods` with not on state `Running`

```bash
k delete pods -n <name-space> --field-selector=status.phase!=Running
```

# Delete `all` component inside cluster

```bash
# For example: Delete all pvc in namespace default
kubectl delete pvc --all 
```
# Create the generic secrets from file, for example `binary` file with auto convert to `base64` format

```bash
kubectl create secret generic accounts-identityserver-certificate --from-file=certificate.pfx --dry-run=client -o yaml > certificate_sec.yaml 
```

# Check currently config context 

```bash
kubectl config view --minify
```

# Change default storage class for your node

```bash
kubectl patch storageclass <sc-specific> -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
```

# Roll out the previous deployment

```bash
kubectl rollout history deployment <deployment-name> -n <namespace>  
kubectl rollout undo deployment <deployment-name> -n <namespace>
```

# Get events with filter depend `creationTimestamp`


```bash
kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp
```