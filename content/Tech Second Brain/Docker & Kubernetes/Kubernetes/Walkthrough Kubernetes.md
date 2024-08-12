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

# Create troubleshoot pods

You can create `stateless` pods with no deployments for purpose

- Check and validate the networking in node, cluster like DNS resolve, health check
- Restore and Backup DB
- Debug or access service internal

For doing that, you need to use `kubectl`

1. Use `kubectl` for create manifest of pod

```bash
k run <name-pod> --image=debian:11.7 --dry-run=client -o yaml > pods.yaml

apiVersion: v1
kind: Pod
metadata:
  creationTimestamp: null
  labels:
    run: <name-pod>
  name: <name-pod>
spec:
  containers:
  - image: debian:11.7
    name: <name-pod>
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
```

2. Customize your pods, for keep alive, you should set command of pod to `tail -f /dev/null`

3. Run `apply` command with manifest

```bash
k apply -f pods.yaml
```

4. Wait few second, exec to the pods with command

```bash
k exec --tty --stdin pods/xxxx -- /bin/bash
```

5. Once you’ve finished testing, you can press Ctrl+D to escape the terminal session in the Pod. Pod will continue running afterwards. You can keep try with command step 4 or delete.

```bash
kubectl delete pod xxxx
```

NOTE: Usually, `curlimages/curl` is regular used. Try to create new pod with fast as possible

```bash
kubectl run mycurlpod --image=curlimages/curl -i --tty -- sh
```

## Stop or run the Cronjob with `patch`

You can see, `cronjob` is scheduled workload of `Kubernetes` which trigger on set-time for executing specify job. But sometimes, on during work time, your test job shouldn't work, therefore you will concert about **suspend** state of jobs. You can update state with command

```bash
k patch -n <namespace> cronjobs.batch <cronjobs-name> -p '{"spec": {"suspend": true}}'
```

Enable again by change `true` --> `false`

```bash
k patch -n <namespace> cronjobs.batch <cronjobs-name> -p '{"spec": {"suspend": false}}'
```

Furthermore, you can use `patch` for multiple purpose

- Update a container's image
- Partially update a node
- Disable a deployment livenessProbe using json patch
- Update a deployment's replica count

## Updating resources

You can handle graceful restart, rollback version with `roolout` command

```
# Graceful restart deployments, statefulset and deamonset
k rollout restart -n <namespace> <type-workload>/<name>

# Rollback version
kubectl rollout undo <type-workload>/<name>
kubectl rollout undo <type-workload>/<name> --to-revision=2

# Check the rollout status
kubectl rollout status -w <type-workload>/<name>
```

Kubernetes has some values with help to distinguish service with each others, specify identifying attributes of objects, attach arbitrary non-identifying metadata to objects, ...

- Label
- Annotations

And you can update that with `kubectl` via `label` and `anotation` command

```bash
# Add a Label
kubectl label pods my-pod new-label=awesome
# Remove a label
kubectl label pods my-pod new-label-  
# Overwrite an existing value
kubectl label pods my-pod new-label=new-value --overwrite  
# Add an annotation
kubectl annotate pods my-pod icon-url=http://goo.gl/XXBTWq     
# Remove annotation
kubectl annotate pods my-pod icon-url-                          
```

Next, you can update autoscale for deployment by command `autoscale`

```bash
kubectl autoscale deployment foo --min=2 --max=10
```

## Edit YAML manifest

`kubectl` can help you directly change manifest on your shell. If you `Linux` or `macos` user, you can use `nano` or `vim` to use feature

```bash
# Edit the service named docker-registry
kubectl edit svc/docker-registry                      
# Use an alternative editor
KUBE_EDITOR="nano" kubectl edit svc/docker-registry   
```

When you hit to complete button, your workload or resource will change immediately

## Delete resource

Use the `delete` command for executing

```bash
# Delete a pod using the type and name specified in pod.json
kubectl delete -f ./pod.json
# Delete a pod with no grace period
kubectl delete pod unwanted --now
kubectl delete pods <pod> --grace-period=0
# Delete pods and services with same names "baz" and "foo"
kubectl delete pod,service baz foo 
```

## Health check and interact with cluster, node and workload

Use the `events` command for detect what happen occur on `cluster node`

```bash
# List Events sorted by timestamp
kubectl get events --sort-by=.metadata.creationTimestamp

# List all warning events
kubectl events --types=Warning
```

If the status of workload are not `available` or `running`, you can use `describe` for verbose check workload

```bash
# Describe commands with verbose output
kubectl describe nodes my-node
kubectl describe pods my-pod
```

When the problem does not come up from workload, you can check `log` for extract more information

```bash
# dump pod logs (stdout)
kubectl logs my-pod

# dump pod logs (stdout) for a previous instantiation of a container. Usually use for crashloopback
kubectl logs my-pod --previous

# dump pod container logs (stdout, multi-container case) for a previous instantiation of a container
kubectl logs my-pod -c my-container --previous

# stream pod logs (stdout) 
kubectl logs -f my-pod 
```

If you check any situation on workload, especially pods, container without results, you can return to check resources usage on cluster. Before doing that, make sure you install [[Note about AKS#Install requirement tools|requirements tools]] for available to use

```bash
# Show metrics for all nodes
kubectl top node    
# Show metrics for a given node
kubectl top node my-node
# For total overview, you resource-capacity plugin
# print information includes quantity available instead of percentage used
kubectl resource-capacity -a
# print information includes resource utilization, pods in output
kubectl resource-capacity --until -p
```

`kubectl` can help you disable or manipulation node with command

```bash
# Mark my-node as unschedulable
kubectl cordon my-node
# Drain my-node in preparation for maintenance
kubectl drain my-node
# Mark my-node as schedulable
kubectl uncordon my-node                                              
```


>[!tips]
>For explore more, you can do lots of things with `kubectl`. To read and understand command, you should use **manual** with `--help` flag

# Setup metrics-server

Metrics server will part if you self-hosted your `kubernetes`, It means you need learn how setup `metrics-server` , and this quite very easily. Read more about `metrics-server` at **[metrics-server](https://github.com/kubernetes-sigs/metrics-server)**

Via `kubectl` you can applied manifest

```bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

Or you can use `helm` to release `metrics-server` chart at [helm](https://artifacthub.io/packages/helm/metrics-server/metrics-server)

```bash
# Add repo to your cluster
helm repo add metrics-server https://kubernetes-sigs.github.io/metrics-server/

# Create the metrics with find the helm-template inside repo
helm upgrade --install metrics-server metrics-server/metrics-server
```

>[!warning]
>Your `metrics-server` will stuck, because it meet problem to not authentication `tls` inside them with `kube-apiserver`

But don't worry about it,  you can bypass this via some trick. Read more about solution at

- [metrics-service in kubernetes not working](https://stackoverflow.com/questions/68648198/metrics-service-in-kubernetes-not-working)
- [metrics-server unable to authenticate to apiserver](https://github.com/kubernetes-sigs/metrics-server/issues/278)

So solution about using `edit` command of `kubectl` to edit manifest of deployments `kube-server`, you can do like this

```bash
# First of all, you can configure your editor to nano (Optional), you can't do this step if you prefer vim
export KUBE_EDITOR="nano"

# Use edit to change manifest of deployment
kubectl edit deployments -n kube-system metrics-server
```

Now scroll to `args` of container `metrics-server`, you can change them into

```bash
      - args:
        - --cert-dir=/tmp
        - --secure-port=10250
        - --kubelet-preferred-address-types=InternalIP,ExternalIP,Hostname
        - --kubelet-use-node-status-port
        - --metric-resolution=15s
        - --kubelet-insecure-tls=true # This will help you bypass authentication
```

And now your `metrics-server` will restart and running after 30s

![[Pasted image 20240718112540.png]]

Learn more about `kubernetes` metrics, read the article [Kubernetes' Native Metrics and States](https://dev.to/otomato_io/kubernetes-native-metrics-and-states-2p68)

# Configure Liveness, Readiness and Startup Probes

Kubernetes implement multiple probles type for health check your applications. See more at [Liveness, Readiness and Startup Probes](https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes)

If you want to learn about configuration, use [this documentation](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)

>[!tip]
>[Probes](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.30/#probe-v1-core) have a number of fields that you can use to more precisely control the behavior of startup, liveness and readiness checks
## Liveness

>[!info]
>Liveness probes determine when to restart a container. For example, liveness probes could catch a deadlock, when an application is running, but unable to make progress.

If a container fails its liveness probe repeatedly, the kubelet restarts the container.

You can set up `liveness` probe with command configuration

```yaml {15-21}
apiVersion: v1
kind: Pod
metadata:
  labels:
    test: liveness
  name: liveness-exec
spec:
  containers:
  - name: liveness
    image: registry.k8s.io/busybox
    args:
    - /bin/sh
    - -c
    - touch /tmp/healthy; sleep 30; rm -f /tmp/healthy; sleep 600
    livenessProbe:
      exec:
        command:
        - cat
        - /tmp/healthy
      initialDelaySeconds: 5
      periodSeconds: 5
```

Or use can use `liveness` probe with HTTP request configuration

```yaml {3-11}
spec:
containers:
    livenessProbe:
      httpGet:
        path: /healthz
        port: 8080
        httpHeaders:
        - name: Custom-Header
          value: Awesome
      initialDelaySeconds: 3
      periodSeconds: 3
```

You can use another protocol with `liveness`, such as

- [TCP](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-a-tcp-liveness-probe)
- [gRPC](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-a-grpc-liveness-probe)

## Readiness

>[!info]
>Readiness probes determine when a container is ready to start accepting traffic. This is useful when waiting for an application to perform time-consuming initial tasks, such as establishing network connections, loading files, and warming caches.

If the readiness probe returns a failed state, Kubernetes removes the pod from all matching service endpoints.

You can try configure `readiness` proble with

```yaml
readinessProbe:
  exec:
    command:
    - cat
    - /tmp/healthy
  initialDelaySeconds: 5
  periodSeconds: 5
```

Configuration for HTTP and TCP readiness probes also remains identical to liveness probes.

>[!info]
>Readiness and liveness probes can be used in parallel for the same container. Using both can ensure that traffic does not reach a container that is not ready for it, and that containers are restarted when they fail.

>[!note]
>Readiness probes runs on the container during its whole lifecycle.

## Startup

>[!info]
>A startup probe verifies whether the application within a container is started. This can be used to adopt liveness checks on slow starting containers, avoiding them getting killed by the kubelet before they are up and running.

If such a probe is configured, it disables liveness and readiness checks until it succeeds.

You can configure for you pod with configuration

```yaml
livenessProbe:
  httpGet:
    path: /healthz
    port: liveness-port
  failureThreshold: 1
  periodSeconds: 10
```

And mostly startup for helping kubernetes to [protect slow starting containers](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-startup-probes)

>[!note]
>This type of probe is only executed at startup, unlike readiness probes, which are run periodically