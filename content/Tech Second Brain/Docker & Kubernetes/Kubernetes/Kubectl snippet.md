---
title: Kubectl snippet
tags:
  - k8s
  - devops
  - helpful
  - usage
---
# Helpful command

## Get base64 decode of secret with no more 3th party

```bash
kubectl get secrets -n <namespace> <secret> -o go-template='{{range $k,$v := .data}}{{"### "}}{{$k}}{{"\n"}}{{$v|base64decode}}{{"\n\n"}}{{end}}'
```

## Debug your node via kubectl

```bash
kubectl debug node/my-node -it --image=<img>
```

## Check the resource of workload with `resource-capacity` extension

Download via `krew`, find out the step at [krew installing](https://krew.sigs.k8s.io/docs/user-guide/setup/install/)

```bash
# Extension: https://github.com/robscott/kube-capacity

# Check the available resources
kubectl resource-capacity -a

# Check detail resource utilize of all workload
kubectl resource-capacity -p --util
```

## Scale down the `statefulset` application

```bash
# Use scale option
kubectl scale --replicas=0 sts <sts name>

# Or we can use patch or edit option
kubectl patch statefulsets <stateful-set-name> -p '{"spec":{"replicas":<new-replicas>}}'
```

You need to consider when apply scaling down can not working because *"cannot scale down a StatefulSet when any of the stateful Pods it manages is unhealthy. Scaling down only takes place after those stateful Pods become running and ready."* . Read more in: [Scale a StatefulSet](https://kubernetes.io/docs/tasks/run-application/scale-stateful-set/#troubleshooting)

## Delete `pods` with not on state `Running`

```bash
k delete pods -n <name-space> --field-selector=status.phase!=Running
```

## Create the generic secrets from file, for example `binary` file with auto convert to `base64` format

```bash
kubectl create secret generic accounts-identityserver-certificate --from-file=certificate.pfx --dry-run=client -o yaml > certificate_sec.yaml 
```

## Check currently config context 

```bash
kubectl config view --minify
```

# Change default storage class for your node

```bash
kubectl patch storageclass <sc-specific> -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
```