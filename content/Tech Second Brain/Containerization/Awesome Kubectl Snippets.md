---
title: Awesome Kubectl snippets
tags:
  - k8s
  - devops
  - helpful
  - usage
  - awesome
---

![[icon-kubernetes.png|center]]

>[!info]
>Small script and take a note to interact between `kubectl` and your kubernetes cluster.

You can explore command with `kubectl` in some place, including

- [kubectl Quick Reference](https://kubernetes.io/docs/reference/kubectl/quick-reference/)
- [kubectl reference](https://kubernetes.io/docs/reference/kubectl/generated/)

A couple of aliases for `kubectl` profile

```bash
export KUBE_EDITOR="nano" # Kube edit will use nano for default editor
alias k="kubectl"
alias kgp="kubectl get pods"
alias kn="kubectl config set-context --current --namespace"
alias kaf="kubectl apply -f "
alias kr="kubectl run --dry-run=client -o yaml "
alias krcp="k resource-capacity -p --util"
alias krca="k resource-capacity -a"
```

To directly use any profile not including in `kubeconfig`, you can use this with environment vars like this

```bash
export KUBECONFIG=/path/to/profile
```

>[!note]
>In the circumstance, you want merge this external configuration to `kubeconfig`, you can use [kconfig](https://github.com/corneliusweig/konfig) to help you reduce the manual step by automatically install into the default at `~/.kube/config` or double-check [StackOverFlow - How to merge kubectl config file with ~/.kube/config?](https://stackoverflow.com/questions/46184125/how-to-merge-kubectl-config-file-with-kube-config) for more approaching
# Combination
## Force terminate the stuck namespace

```bash
NS=`kubectl get ns |grep Terminating | awk 'NR==1 {print $1}'` && kubectl get namespace "$NS" -o json   | tr -d "\n" | sed "s/\"finalizers\": \[[^]]\+\]/\"finalizers\": []/"   | kubectl replace --raw /api/v1/namespaces/$NS/finalize -f - 
```
# Config Command
## Check currently config context 

```bash
kubectl config view --minify
```

# Create Command
## Create the generic secrets from file

For example `binary` file with auto convert to `base64` format

```bash
kubectl create secret generic accounts-identityserver-certificate --from-file=certificate.pfx --dry-run=client -o yaml > certificate_sec.yaml 
```

# Debug Command
## Debug your node via kubectl

```bash
kubectl debug node/my-node -it --image=<img>
```

# Delete command
## Delete `all` component inside cluster

```bash
# For example: Delete all pvc in namespace default
kubectl delete pvc --all 
```

## Delete `pods` with not on `Running` state

```bash
k delete pods -n <name-space> --field-selector=status.phase!=Running
```

## Delete `pods` stuck in `Terminatting` state

```bash
kubectl delete pod <PODNAME> --grace-period=0 --force --namespace <NAMESPACE>
```

## Delete `pod` in state not finalizers

Article: [Medium - Kubernetes Pods That Refused to Die: The Haunting of Our Cluster](https://medium.com/@rudra910203/kubernetes-pods-that-refused-to-die-the-haunting-of-our-cluster-4813fa5226fa) 

In some situation, `delete` command won't let you kill your pod, reason can be like

- Block deletion until a controller does cleanup (e.g., storage detachment)
- Your controller add a finalizer for handling this action
- Finalizer can' remove and lead to crash, and your application never delete

To solve this mess, you can workaround with `finalizer` of your `pod`

```bash
kubectl get pods xxx -o json | jq '.metadata.finalizers'
```

If it does exist, it means you should shut it down

```bash
kubectl patch pod xxx --type json \
--patch='[{"op": "remove", "path": "/metadata/finalizers"}]'
```

Now you can remove your `custom-controller`. 

>[!tip]
>From author, you can apply a `webhook` into your cluster to prevent finalizers add into your pods

```yaml
# ValidatingWebhookConfiguration to block bad finalizers  
apiVersion: admissionregistration.k8s.io/v1  
kind: ValidatingWebhookConfiguration  
metadata:  
name: block-cursed-finalizers  
webhooks:  
- name: finalizer-police.example.com  
rules:  
- operations: ["CREATE", "UPDATE"]  
apiGroups: [""]  
apiVersions: ["v1"]  
resources: ["pods"]
```
# External command
## Check the resource of workload v1

Download via `krew`, find out the step at [krew installing](https://krew.sigs.k8s.io/docs/user-guide/setup/install/) and extension at [github](https://github.com/robscott/kube-capacity)

```bash
kubectl krew install resource-capacity
```

```bash
# Extension: https://github.com/robscott/kube-capacity

# Check the available resources
kubectl resource-capacity -a

# Check detail resource utilize of all workload
kubectl resource-capacity -p --util
```

## Check the resource of workload, able to view GPU

Download new extension from `krew` at [github](https://github.com/davidB/kubectl-view-allocations)

```bash
kubectl krew install view-allocations
```

```bash
# Extension: https://github.com/davidB/kubectl-view-allocations

# Show GPU allocation
k view-allocation -r gpu

# Check available resource of all node
k view-allocation -g resource

# Check resource depend on group namespace
k view-allocation -g namespace

# View as csv for analysis
k view-allocations -o csv
```

## View relationship between resources

Download new extension from `krew` at [github](https://github.com/ahmetb/kubectl-tree)

```bash
kubectl krew install tree
```

```bash
# Extension: https://github.com/ahmetb/kubectl-tree

# View relationship of deployment
k tree deployment <name-deploymen>

# You can view the resource with API. e.g: longhorn share manager
k tree sharemanagers.longhorn.io test
```

## Spawn node-shell for debug node

Down new extension from `krew` at [github](https://github.com/kvaps/kubectl-node-shell)

```bash
kubectl krew install node-shell
```

```bash
# Extension: https://github.com/kvaps/kubectl-node-shell

# Get standard bash shell
kubectl node-shell <node>

# Use custom image for pod
kubectl node-shell <node> --image <image>

# Execute custom command
kubectl node-shell <node> -- echo 123

# Use stdin
cat /etc/passwd | kubectl node-shell <node> -- sh -c 'cat > /tmp/passwd'

# Run oneliner script
kubectl node-shell <node> -- sh -c 'cat /tmp/passwd; rm -f /tmp/passwd'
```
# Get Command
## Base64 decode of secret with no more 3th party

```bash
# Use go-template
kubectl get secrets -n <namespace> <secret> \
-o go-template='{{range $k,$v := .data}}{{"### "}}{{$k}}{{"\n"}}{{$v|base64decode}}{{"\n\n"}}{{end}}'

# Use json
kubectl get secret -n <namespace> <secret> -o jsonpath='{.data.*}' | base64 -d
```

## Get events with filter depend `creationTimestamp`

```bash
kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp
```

## Get `taint` of node

```bash
kubectl get nodes -o='custom-columns=NodeName:.metadata.name,TaintKey:.spec.taints[*].key,TaintValue:.spec.taints[*].value,TaintEffect:.spec.taints[*].effect'
```

## List All Container Images Running in a Cluster

If you want to double-check more about this topic, you can read more at [Kubernetes - List All Container Images Running in a Cluster](https://kubernetes.io/docs/tasks/access-application-cluster/list-all-running-container-images/)

BTW, I prefer to list all container image, include init and runtime container for any pods in all namespaces with command with count number of image used in system

```bash
kubectl get pods --all-namespaces -o jsonpath="{.items[*].spec['initContainers', 'containers'][*].image}" |\
tr -s '[[:space:]]' '\n' |\
sort |\
uniq -c
```
# Patch Command

## Change default storage class for your node

```bash
kubectl patch storageclass <sc-specific> -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
```

# Rollout Command

Read more about rollout at: [How do you rollback deployments in Kubernetes?](https://learnk8s.io/kubernetes-rollbacks)
## Roll out the previous deployment

```bash
# Check history of version
# View history tree of your application
kubectl rollout history deployment <deployment-name> -n <namespace>
# View detail once of history of your revision
kubectl rollout history deployment <deployment-name> \
-n <namespace> --revision <revision_number>

# Rollout to version
# Rollout your application to 0 (last revision). Default
kubectl rollout undo deployment <deployment-name> -n <namespace>
# Rollout your application to specific revision
kubectl rollout undo deployment <deployment-name> \
-n <namespace> --to-revision <revision_number>
```

# Scale Command
## Scale down the `statefulset` application

```bash
# Use scale option
kubectl scale --replicas=0 sts <sts name>

# Or we can use patch or edit option
kubectl patch statefulsets <stateful-set-name> -p '{"spec":{"replicas":<new-replicas>}}'
```

>[!note]
>You need to consider when apply scaling down can not working because *"cannot scale down a StatefulSet when any of the stateful Pods it manages is unhealthy. Scaling down only takes place after those stateful Pods become running and ready."* . Read more in: [Scale a StatefulSet](https://kubernetes.io/docs/tasks/run-application/scale-stateful-set/#troubleshooting)
