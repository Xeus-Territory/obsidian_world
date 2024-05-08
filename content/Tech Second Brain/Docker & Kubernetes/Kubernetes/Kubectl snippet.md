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