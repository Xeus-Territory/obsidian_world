---
title: "Kubewekend Session 2: Setup Kind cluster with Ansible"
tags:
  - k8s
  - DIY
  - kubewekend
  - automation
  - devops
---
>[!quote]
>Hi @all, It's me again, BTW session 2 of kubewekend is already publish if you read the currently message, LOL 😄. Today we will learn and practice with `Ansible` and `kind` inside the machine we provision and build in previous session, Read at: [[Kubewekend Session 1]], not long as well, let's digest to new session 🛫

List of topics in series

- [[Kubewekend Session 1]]
- **[[Kubewekend Session 2]]**
- [[Kubewekend Session 3]]

# Why I choose `Ansible` and `kind` ?

>[!quote]
>Just like usual, we will find the reason why I choose `Ansible` and `Kind` for targets to provide `Kubernetes` in locally

## `Ansible` and what can we do with one ?

![[Pasted image 20240711101753.png]]

IYKYK, I have a topic which write about Ansible, and how I use ansible to provisioning `AWS Cloud`, that like crazy and powerful tools with huge community support. I hope you can find well about that at: [Ansible, Terraform and your first infrastructure](https://hackmd.io/@XeusNguyen/SJBPGfcbp)

>[!question]
>A couple question refer about what different between `Ansible` and `Terraform` ? With me they are kind of similar nowaday, `Terraform` can do a job like `Ansible`, and vice versa, submit role like **IaC (Infrastructure as Code)**. But not at all, `Ansible` is releasing not target like IaC, but it use for Configuration, because you can image usually `Ansible` will do task job behind the scene, like set up environment and configuration machine and use connection like `ssh`, but `Ansible` is evolving nowaday, and you can do furthermore things with one, super cool.

Get the official documentation to understand more about `Ansible`, read more at [Introduction to Ansible](https://docs.ansible.com/ansible/latest/getting_started/introduction.html)

>[!info]
><h3>Ansible</h3>
>
>Providing open-source automation that reduces complexity and runs everywhere. Using Ansible lets you automate virtually any task. Here are some common use cases for Ansible:
>- Eliminate repetition and simplify workflows
>- Manage and maintain system configuration
>- Continuously deploy complex software
>- Perform zero-downtime rolling updates

Ansible uses simple, human-readable scripts called playbooks to automate your tasks. You declare the desired state of a local or remote system in your playbook. Ansible ensures that the system remains in that state.

![[Pasted image 20240711105244.png]]

Following the Ansible, Ansible is designed for

- Agent-less architecture
- Simplicity
- Scalability and flexibility
- Idempotence and predictability

>[!quote]
>Thinking about you have 100 machine in company, and you can't loop the job for setting up one machine for hundred, you need `Ansible` to parallel configuration with same workflow to be ensure we will not mistake, you put all machines to same network, give the `hosts` configuration, and run `ansible` with cup of coffee, that actually powerful `ansible` can bring for us 😄

## Setup `Ansible` for your machine

>[!warning]
>Because `Ansible` is running only on Linux or Mac system, so you need to ensure use `WSL` (For windows) or Linux machine for perform `Ansible`

You can simply to install `ansible` via `pip` command of python, but you need python version `>=` 3.9 at least for stabling use `ansible`. Use [official documentation](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) if you meet the problems

```bash
# For version >= 3.9, < 3.12
pip3 install ansible ansible-lint

# With Python 3.12, everything became complicated in Linux, you need to use pipx or apt package to install ansible
# To download ansible and components
pipx install --include-deps ansible
pipx install --include-deps ansible-lint
```

You can use `ansible --version` to validate your progress is alright or not, double check that and we will move to `Kind`, 🙌

## What is `kind` ?

For fun fact, if you search on `kind` in internet like Google, you will not find anything about this tool on the head, for sure but if you find `Kind Cluster` that will help you choose right location of `kind`. Or simply access at [Kind documentation](https://kind.sigs.k8s.io/), LOL 🥲, more pleasant things inside their [github](https://github.com/kubernetes-sigs/kind)

![[Pasted image 20240711105617.png]]

>[!quote]
>With me, `kind` is such helpful tool, and easily to management Kubernetes cluster, honestly when you work with `k3s`, `minikube` that cause you a lot trouble when you not follow those documentation. `kind` is easily to run, just need `container runtime` like `docker` and you have completely `kubernetes` in locally to practical, how cool is it !!! 🥶

So we reach to official definition to understand what is `kind`

>[!info]
><h3>kind</h3>
>
>[kind](https://sigs.k8s.io/kind) is a tool for running local Kubernetes clusters using Docker container “nodes”.  
>kind was primarily designed for testing Kubernetes itself, but may be used for local development or CI.

You can use `go` to install `kind`, and setup with `go install` LOL very simple 😄. `kind` contain some pleasant things, include

- Go [packages](https://github.com/kubernetes-sigs/kind/tree/main/pkg) implementing [cluster creation](https://github.com/kubernetes-sigs/kind/tree/main/pkg/cluster), [image build](https://github.com/kubernetes-sigs/kind/tree/main/pkg/build), etc.
- A command line interface ([`kind`](https://github.com/kubernetes-sigs/kind/tree/main/main.go)) built on these packages.
- Docker [image(s)](https://github.com/kubernetes-sigs/kind/tree/main/images) written to run systemd, Kubernetes, etc.
- [`kubetest`](https://github.com/kubernetes/test-infra/tree/master/kubetest) integration also built on these packages (WIP)

kind bootstraps each “node” with [kubeadm](https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm/). For more details see [the design documentation](https://kind.sigs.k8s.io/docs/design/initial).

Like I said `kind` is very easily to use, just need `docker` and we know your have machine in session 1, which setup container runtime is `docker` inside. We will use `ansible` to assume the task to deploy local cluster `kubernetes` with kind on practical part

## Initial design of `kind`

>[!info]
>When you work with `kind`, you have full components to work with `kubernetes` cluster like real in cloud services, it divide into go packages, and implementing most of functionality, CLI for users and `node` images - which image built in and just need pull to setup cluster like you expectation if you want to work for in Cloud.

So if you setup the `kind`, you will receive features from team project, including

- runs very cheap clusters that any developer can locally replicate
- integrates with our tooling
- is thoroughly documented and maintainable
- is very stable, and has extensive error handling and sanity checking
- passes all conformance tests

After you bring up the `kind`, you will have the cluster with include the services like

![[Pasted image 20240711133117.png]]

And if you have `kubectl` inside your host, `kind` will automatically export `kubeconfig` for your purpose to give bride to contact with your cluster, how cool is that 😄

One more thing, follow the cycle life of `kind` and node image, I think that contain all versions are close to reality, you can retrieve that from [Dockerhub - kind/node](https://hub.docker.com/r/kindest/node/)

That @all technologies for this session, we will move to practical part and learn more about `ansible`, and figure out the way use that to provisioning your `kubernetes` locally cluster with `kind`

## Alternative of `kind`

You can choose another tools for setup locally `kubernetes`, with `kind` you will receive the simple things to set up, and do not need and understand to much way for self-hosted kubernetes. But if you want to practice more, and come up with more flexibility, so you can checkout with some another example

- [RKE](https://docs.rke2.io/) : *RKE2, also known as RKE Government, is Rancher's next-generation Kubernetes distribution.*
- [minikube](https://minikube.sigs.k8s.io/docs/) :  *Quickly sets up a local Kubernetes cluster on macOS, Linux, and Windows*
- [k3s](https://k3s.io/) : *Lightweight Kubernetes. Easy to install, half the memory, all in a binary of less than 100 MB.*
- [microk8s](https://microk8s.io/) :  The easiest and fastest way to get Kubernetes up and running.
- [k0s](https://docs.k0sproject.io/stable/) : An open source, all-inclusive Kubernetes distribution, which is configured with all of the features needed to build a Kubernetes cluster

>[!warning]
>But recommendation from me, If you do not familiar with system, please choose `kind` that easily to hand on with `kubernetes` in the first time

# Practical with `ansible` and `kind`

>[!quote]
>Purpose in lab session 2 about using the `ansible` to configuration `kind` cluster inside the machine which built from session 1. You will about how to use `ansible-playbook` with `hosts` and `inventories` to delivery parameterize on configuration which use for `kind`. Okay now, we will inspect it

To easily follow what is practical, you can access the lab on my [github - kubewekend](https://github.com/Xeus-Territory/kubewekend#ansible---to-setup-and-run-script-and-bring-up-kubernetes-cluster-on-locally-use-kind)

If you read the part above, ensure you have `ansible` in your host, therefore I skip this step. I will drop down some workflow to make your provision become smooth, include

- Define `hosts` file for ansible can detection your location, and methodology to access your host which provided by `vagrant`
- Next, you need to define `kind-config` and parameterize `template` to give configuration which use when setup `kubernetes` cluster
- Next, you will define `tasks`, one concept of `ansible` to define the workflow to config `kubernetes` with `kind`
- Connect host and retrieve the result to validate succeed provisioning `kubernetes` cluster

## Define `hosts`

That part is very important, the bridge help you connect between `ansible` and `vagrant` host. For easily to understand, I think about writing script to help you automation retrieve which host become online, here is the script

```bash title="script/operate-kind-cluster.sh"
#!/bin/bash

# Check machine name which running and be ready to add cluster
listRunningMachine=$(vagrant status | grep -e "running" | awk '{print $1}')
# Get the actually path of file you exection
rootProjectLocation=$(dirname -- "$(realpath -- "$(dirname -- "$0")")")
hostsfileLocation="$rootProjectLocation/ansible/inventories/hosts"

# Flush hosts file
echo "" >"$hostsfileLocation"

# Build hosts file
printf "🚀 In-progress to set up for your hosts file 🚀\n\n"
for vm in $listRunningMachine; do
    ssh_config=$(vagrant ssh-config "$vm")
    user=$(echo "$ssh_config" | grep User | head -n1 | awk '{print $2}')
    host=$(echo "$ssh_config" | grep HostName | awk '{print $2}')
    port=$(echo "$ssh_config" | grep Port | awk '{print $2}')
    key_path=$(echo "$ssh_config" | grep IdentityFile | awk '{print $2}')
    # Read about that kind in the article
    # https://medium.com/@megawan/provisioning-vagrant-multi-machines-with-ansible-32e1809816c5
    cat <<EOF | tee -a "$hostsfileLocation" >/dev/null
$vm ansible_ssh_host=$host ansible_ssh_port=$port ansible_ssh_user=$user
EOF
    ssh-add "$key_path" > /dev/null 2>&1
    echo "VM: $vm ✅"
done

printf "\n🤩 Your patience is incrediable 🤩"

```

Let take a look about script, you can image my script will use `vagrant` to

- Retrieve the `status` of machine in running state, that are really useful for helping you understand target, and use that for see `ssh-config`
- If you know about list of `VM` in running state, you can retrieve the couple of things to setup about your host like `user` `host` and `port`, that really define base on `hosts` template come from [official documentation](https://docs.ansible.com/ansible/latest/inventory_guide/intro_inventory.html#connecting-to-hosts-behavioral-inventory-parameters). Export that definition to your `hosts` file
- Lastly, the script will automate add key which retrieve from profile of `vagrant` to get the private_key which help you access to `vagrant` host via them

>[!warning]
>On the situation, you have create a new virtual machine but your know_hosts have include the key from old configuration, you need to make sure to delete that. For e.g, use command
>
>```bash
>ssh-keygen -f "/home/$USER/.ssh/known_hosts" -R "[127.0.0.1]:6996"
>```

That all, you can use `ssh-add -L` to retrieve your `private_key` of running machine import in `ssh-session` to do next-things

And you can execute the script with command

```bash
# Directly execution
./script/operate-kind-cluster.sh

# Use bash for alternative
bash -c "./script/operate-kind-cluster.sh"
```

## Definition configuration for `kind` 

In this part, we will write the configuration file which help you define your cluster base on your decision, It means you can change something inside cluster, such as

- CNI (Container Network Interface)
- Subnet for Pod and Service
- [Feature gate](https://kubernetes.io/docs/reference/command-line-tools-reference/feature-gates/) of Kubernetes Cluster
- Change configuration inside `kubeadm` ,`kubelet` and `kube-apiserver`
- You can change `kube-proxy` mode
- Setup node role, and how much node you want to implement

And more feature is in develop progress of `kind` project, but is provide that into template and take note some situations, you can check on below

```yaml title="ansible/templates/kind-config.yaml.j2"
kind: Cluster
# Exist two apiVersions for Kind Cluster
# Documentation: https://pkg.go.dev/sigs.k8s.io/kind/pkg/apis/config@v0.23.0
apiVersion: kind.x-k8s.io/v1alpha4
name: {{ cluster_name }}

# Enable ny feature gate can be enabled here with "Name": true or false to disable
# Find your feature gate at: https://kubernetes.io/docs/reference/command-line-tools-reference/feature-gates/
# featureGates:
#   "CSIMigration": true

# Maps parameters to flag `--runtime-config` in kube-apiserver flag: https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/
# eg: Disable alpha API version
# runtimeConfig:
#   "api/alpha": "false"

# Use to configuration networking part for kubernetes
networking:
  # API SERVER
  ###################################
  # For security reasons, need to keep this option default (default = "127.0.0.1")
  apiServerAddress: {{ cluster.networking.apiServer.address }}
  # By default the API server listens on a random open port.
  # You may choose a specific port but probably don't need to in most cases.
  # Using a random port makes it easier to spin up multiple clusters.
  apiServerPort: {{ cluster.networking.apiServer.port }}

  # POD SUBNET
  ###################################
  # Configuration subnet assign when turn on pod
  # By default, kind uses 10.244.0.0/16
  podSubnet: {{ cluster.networking.podSubnet }}

  # SERVICE SUBNET
  ###################################
  # Configuration subnet for services, help you expose the service
  # By default, kind uses 10.96.0.0/16
  serviceSubnet: {{ cluster.networking.serviceSubnet }}

  # DEFAULT CNI
  ###################################
  # Configuration CNI (Container Network Interface) for Kubernetes Cluster
  # Kind ships us with multiple CNI like kindnetd
  # But we don't want to use that, be stay calm, disable now and manually setup cillium
  disableDefaultCNI: {{ cluster.networking.disableDefaultCNI }}

  # kube-proxy MODE
  ###################################
  # Kind offer us many proxy mode, include iptables, nftables (v1.31+), ipvs
  # Behind the scenes: https://gist.github.com/aojea/f9ca1a51e2afd03621744c95bfdab5b8
  # To disable, set mode to `none`. One more, default option will be `iptables`
  kubeProxyMode: {{ cluster.networking.kubeProxyMode }}

# Set the role for your node
nodes:
###########################################
# Use roles for set up permit for your node
# https://kind.sigs.k8s.io/docs/user/configuration/#nodes
# NOTICE: KIND ALWAYS NEED ONE CONTROL-PLANE TO OPERATE
# YOU CAN NOT CREATE ONLY WORKER ON HOST
###########################################
- role: control-plane
  # Use can specify the version of Kubernetes cluster of kind, use image
  # Find docker version at: https://hub.docker.com/r/kindest/node/
  image: {{ cluster.image }}
#- role: worker
#  # Use can specify the version of Kubernetes cluster of kind, use image
#  # Find docker version at: https://hub.docker.com/r/kindest/node/
#  image: {{ cluster.image }}

  # Extra Mounts
  ########################################
  # Use can use extraMounts to add additional from host to node
  # Read more at: https://kind.sigs.k8s.io/docs/user/configuration/#extra-mounts
  ########################################
  # extraMounts:
  # - hostPath: /path/to/my/files
  #   containerPath: /files

  # Extra Port Mappings
  # Doc: https://kind.sigs.k8s.io/docs/user/configuration/#extra-port-mappings
  ########################################
  # Extra port mappings can be used to port forward to the kind nodes. This is a cross-platform option to get traffic into your kind cluster.
  # NOTE: Don't need use this configuration with Docker Desktop App in Linux because this exist method to send traffic to node Ips from host
  # If you like, you can configuration, that will help you when configuration Load Balancer and provide Ingress plugin for your cluster to
  # serve traffic to nodes
  ########################################
  # extraPortMappings:
  # - containerPort: 80
  #   hostPort: 80
  #   # optional: set the bind address on the host
  #   # 0.0.0.0 is the current default
  #   listenAddress: "127.0.0.1"
  #   # optional: set the protocol to one of TCP, UDP, SCTP.
  #   # TCP is the default
  #   protocol: TCP

  # Extra Labels
  # Read more at: https://kind.sigs.k8s.io/docs/user/configuration/#extra-labels
  #######################################
  # Usually use for set the target for your node, to use `nodeSelectors` option in Kubernetes
  # Doc: https://kubernetes.io/docs/tasks/configure-pod-container/assign-pods-nodes/
  #######################################
  # labels:
  # tier: frontend

  # Kubeadm Config Patches
  # Read more at: https://kind.sigs.k8s.io/docs/user/configuration/#kubeadm-config-patches
  #######################################
  # Kind will use `kubeadm` to configure cluster nodes, formally use `kubeadm init` on first control plane
  # Read more about `kubeadm init` at: https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-init/#config-file
  ######################################
  # kubeadmConfigPatches:
  # - |
  #   kind: InitConfiguration
  #   nodeRegistration:
  #     kubeletExtraArgs:
  #       node-labels: "my-label=true"    
  ######################################
  # You can use different type configuration for customization, like: InitConfiguration ClusterConfiguration
  # KubeProxyConfiguration KubeletConfiguration
  # You can override the apiserver flag by kubeadm at: https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/control-plane-flags/
  # kubeadmConfigPatches:
  #   - |
  #     kind: ClusterConfiguration
  #     apiServer:
  #         extraArgs:
  #           enable-admission-plugins: NodeRestriction,MutatingAdmissionWebhook,ValidatingAdmissionWebhook    
  ######################################
  # Another way, if you want to join node, you will concern about using `kubeadm join`
  # Kind offers for us to do smt like that, which uses the joinconfiguration
  # at https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-join/#config-file 
  # kubeadmConfigPatches:
  # - |
  #   kind: JoinConfiguration
  #   nodeRegistration:
  #     kubeletExtraArgs:
  #       node-labels: "my-label2=true"   
  #####################################
  # External: Use can use over patches via strategic merge and JSON6092 patches
  # You can read more and adopting that kind in last of Kind's Configuration
```

That huge and a lot, you will be messed up on the first meet, but it just really simple and you can give some basically configuration, brief like

- namecluster: Set name of cluster
- networking: Modify and configuration subnet of pods and services of cluster
- cni: Disable default cni, because I will use customize `cilium`, a `ebpf` platform
- kube-proxy: Use `iptables`, but on feature we can use `cilium`
- role: Just use only control plane role

>[!warning]
>For preventing error, usually cluster will exist at least on control plane, so can deploy only worker node, that will cause you have problem when configuration different role for your node to make that become HA, but don't worry we will inspect later

That all the purpose I want to change, and make it become different with default. So you know your `kind-config.yaml` is writing in `jinja2` and you can see `{{ }}` bracket, and that can become to place where call  by `tasks` inside `ansible`. You can image `host_vars` like

```yaml title="ansible/inventories/host_vars/master.yaml"
cluster:
  networking:
    apiServer:
      address: "127.0.0.1"
      port: 6996
    podSubnet: "10.244.0.0/16"
    serviceSubnet: "10.96.0.0/16"
    disableDefaultCNI: true
    kubeProxyMode: "iptables"
  # NOT ENABLE, DEFAULT NEED AT LEAST 1 CONTROL PLANE (UPATE LATER)
  # role: "control-plane"
  image: "kindest/node:v1.28.9"

```

and each key-values, it will map into `kind-config.yaml` with corresponding values. `kind-config.yaml` is already to use, just define `ansible` for doing stuff.

## Write Ansible, and execute the script

In the last of stage, we need to write the script to telling with `ansible` do configuration for us in bring up `kind` cluster.

Just for sure you have connection, you can use `ping` - basic module that `ansible` offer for us, read more about that in [walkthrough documentation](https://ansible-tips-and-tricks.readthedocs.io/en/latest/ansible/commands/)

```bash
ansible -i ./ansible/inventories/hosts all -m ping
```

![[Pasted image 20240712101119.png]]

and result if return `success`, you are done for connecting to machine with `ssh`, and failure occur so you need to re-check again

You can move on the definition steps for **ansible playbook**, that component will put some configuration about installing `kind` tool and use command to operate `kind` cluster. Just for help you understand more situations, I try to put more complicated block to handle that. Let explain that

```bash title="ansible/k8s-provisioning-playbook.yaml"
---
# Playbook for provision Kubernete node
- name: Playbook of Kubernetes Node with KIND
  vars:
    cluster_name: "{{ host_name }}"
    user: "vagrant"
  # To fix lint issues: when you not set host_name, use default func of jinja2 to handle
  # https://stackoverflow.com/questions/35105615/use-a-default-if-a-variable-is-not-defined
  hosts: "{{ host_name | default('sample-k8s-master') }}"
  tasks:
    - name: Install common libraries,kind and dependencies for your host
      tags: install_common
      # Help to do inline script and multiple line
      # https://docs.ansible.com/ansible/latest/collections/ansible/builtin/shell_module.html
      ansible.builtin.shell: |-
        sudo apt update
        sudo apt install -y apt-transport-https ca-certificates curl gpg wget
        wget -q https://kind.sigs.k8s.io/dl/v0.23.0/kind-linux-amd64 -O ./kind
        chmod +x ./kind
        sudo mv ./kind /usr/local/bin/kind
      changed_when: false
      args:
        executable: /bin/bash
      register: shell_output

    - name: Log the results of install common
      # Use `debug` feature to log your progress when perform the script, such as output or error
      # to your ansible shell. https://docs.ansible.com/ansible/latest/collections/ansible/builtin/debug_module.html
      tags: install_common
      ansible.builtin.debug:
        msg: "{{ shell_output.stdout_lines }}"

      # Task help choose var_files when host is master
    - name: Access master var_files
      tags: setup_kind
      # Use `include_vars` to handling to task to import
      # host_vars base on conditional
      # https://docs.ansible.com/ansible/latest/collections/ansible/builtin/include_vars_module.html
      ansible.builtin.include_vars:
        file: "./inventories/host_vars/master.yaml"
      # `when` conditional inside the ansible which help handle configuration,
      # and give the flexible to dynamic tasks on ansible
      # https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_conditionals.html
      when: cluster_name is search("master")

      # Task help choose var_files when host is worker
    - name: Access worker var_files
      tags: setup_kind
      ansible.builtin.include_vars:
        file: "./inventories/host_vars/worker.yaml"
      when: cluster_name is search("worker")

    - name: Bring up Kind cluster
      tags: setup_kind
      block:
        - name: Create kind directory for host
          # Use `command` feature, if you want to execute command in your remote host
          # Besides, you can use `shell`, `script` or `win_shell` to do same thing but multiple line or run script-file optional
          # https://docs.ansible.com/ansible/latest/collections/ansible/builtin/command_module.html
          ansible.builtin.command:
            cmd: "mkdir -p ~/.kind"
          # Ansible lets you define when a particular task has “changed” a remote node using the changed_when conditional
          # https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_error_handling.html#defining-changed
          changed_when: false

        - name: Mount the kind-config template to the host
          # Use `template` feature, to handle your situation on load template jinja2 to host
          # https://docs.ansible.com/ansible/latest/collections/ansible/builtin/template_module.html
          ansible.builtin.template:
            src: "./templates/kind-config.yaml.j2"
            dest: "~/.kind/kind-config.yaml"
            owner: "{{ user }}"
            mode: "0644"

        - name: Bring up the cluster base on cluster
          # Same reason as `command` feature above, but can do inline script and multiple line
          # https://docs.ansible.com/ansible/latest/collections/ansible/builtin/shell_module.html
          ansible.builtin.shell: |-
            kindCheck="$(kind get clusters)"
            if [ $kindCheck != "" ]; then
              echo "Exist cluster already"
            else
              kind create cluster --config ~/.kind/kind-config.yaml
              echo "Create a new cluster succeed"
            fi
          register: kind_log
          changed_when: false

        - name: Log the results of Playbook K8s master node
          tags: setup_kind
          # Use `debug` feature to log your progress when perform the script, such as output or error
          # to your ansible shell. https://docs.ansible.com/ansible/latest/collections/ansible/builtin/debug_module.html
          ansible.builtin.debug:
            msg: "{{ kind_log.stdout_lines }}"

```

With this configuration, you have control workflow below 2 task

- `install_common` : For installing `kind` and package dependencies for `linux` machine
- `setup_kind` : For setup `kind` cluster with optional choose `host_vars` base environment you set when run `ansible`

To understand syntax, I recommend you read about syntax when you try write playbooks of `ansible`. Read more at: [Ansible playbooks](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_intro.html#ansible-playbooks "Link to this heading"), and one more thing if you want to do more configuration but easily to prompt `ansible`, i recommend you use `ansible` extension in VSCode, with help you a lot to understand and prevent mistake when you write the `ansible`

After setup your `ansible playbooks`, you need to use `ansible-playbook` command to practice with your playbooks, and yup it will be kind of fun things

```bash
ansible-playbook -i ./ansible/inventories/hosts \
--extra-vars="host_name=k8s-master-machine" \
--tags "install_common,setup_kind" ansible/k8s-provisioning-playbook.yaml
```

That is basic command, you need to provide some optional before you can use playbook above, including

- `-i` :PATH of your inventories
- `--extra-vars` : Additional variables you want to set on run-time of `ansible`, with **key-value** type . E.g: `host_name=k8s-master-machine` (NOTICE: You can use this `extra_vars` for multiple times)
- `--tags` : Set the tasks tagged with values, it means you execute that sequential tasks base on this optional (NOTICE: You can use this one for multiple times)

And in the end you choose your ansible playbook which you want to play, and you can perform task with execution with your expectation

![[Pasted image 20240712110201.png]]

When you see that result return with no failure, you can easily check vagrant to see `kind` cluster is actually bring up with `ssh` command

```bash
# For example, you set for k8s-master-machine
vagrant ssh k8s-master-machine
```

![[Pasted image 20240712110358.png]]
Your cluster will actually work, and ready to retrieve from `kubectl`. You can easily check `kubeconfig` is automatically generate and store at `.kube/config`

## Validate `kind` cluster

To make conversation with `kind`, you can use `kubectl` to installing that, you can easily download that for Win, Mac or Linux. For example, I will provide some command to install that

```bash
# Install kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo chmod +x kubectl
sudo mv kubectl /usr/local/bin
```

You can validate that on `vagrant` host with command `version`

![[Pasted image 20240712110812.png]]

So next, (Optional) you will use `kind` to see your host does exist context or not

```bash
kind get kubeconfig --name k8s-master-machine
```

If your shell expose something except error, you will see a lots of configuration with certificate is `base64` encode, `kubectl` will use this context to call and work with `kind` cluster

First of all use list all configuration which have inside host

```bash
kubectl config get-contexts
```

![[Pasted image 20240712111643.png]]

And you can use config that with command

```bash
kubectl config use-context kind-k8s-master-machine
```
accessableaccessable
Now you are in `kind` cluster, just use `kubectl get all -A` to show all things inside currently container

![[Pasted image 20240712112108.png]]

And now you have full accessible to `kind` cluster, and we will talk about deep about cluster on next session

# Conclusion

![[Pasted image 20240712113051.png]]

>[!done]
>That is end of session 2, hope you enjoy and learn about new things, include `ansible` and `kind`, and the way we can use that tools to make valuable for yourself. In the end, you will have cluster in locally to practice `kubernetes` that really cool and helpful for learning more about `kubernetes`.

>[!quote]
>Give the appreciate for `kind` and `Kubernetes` community to bring up the powerful and easily tools to learn and play with `kubernetes`, and more warmness to `ansible` in providing the powerful configuration language to handle incredible things, willing to learn more from of them. And give more thankful and grateful to you my audience, your readable will a part to make this adventure become more pleasant, therefore hope you and family well, stay safe and wait for next session, Bye bye 🙌

