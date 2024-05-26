---
title: Kubectl snippet
tags:
  - k8s
  - devops
  - helpful
  - usage
---
# Helpful command

- Get base64 decode of secret with no more 3th party

```bash
k get secrets -n <namespace> <secret> -o go-template='{{range $k,$v := .data}}{{"### "}}{{$k}}{{"\n"}}{{$v|base64decode}}{{"\n\n"}}{{end}}'
```

- Debug your node via kubectl

```bash
k debug node/my-node -it --image=<img>
```

- Check the resource of workload with `resource-capacity` extension. [Link](https://github.com/robscott/kube-capacity)

```bash
# Check the available resources
k resource-capacity -a

# Check detail resource utilize of all workload
k resource-capacity -p --util
```

- Scale down the `statefulset` application

```bash
# Use scale option
kubectl scale --replicas=0 sts <sts name>

# Or we can use patch or edit option
kubectl patch statefulsets <stateful-set-name> -p '{"spec":{"replicas":<new-replicas>}}'
```

You need to consider when apply scaling down can not working because *"cannot scale down a StatefulSet when any of the stateful Pods it manages is unhealthy. Scaling down only takes place after those stateful Pods become running and ready."* . Read more in: [Scale a StatefulSet](https://kubernetes.io/docs/tasks/run-application/scale-stateful-set/#troubleshooting)

- Delete `pods` with not on state `Running`

```bash
k delete pods -n monitoring --field-selector=status.phase!=Running
```

