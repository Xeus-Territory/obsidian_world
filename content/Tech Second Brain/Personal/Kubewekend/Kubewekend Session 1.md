---
title: "Kubewekend Session 1: Build up your host with Vagrant"
tags:
  - k8s
  - DIY
  - series
  - kubewekend
  - automation
---
>[!quote]
>Hi @all, How are you going, great huh 👐. Graceful and especially to announcing about `kubewekend` - new series of mine, which one to give me and you opportunities to learn about new technologies, the way to bring you near `kubernetes` and more a lot of things pick a up around `devops`, `networking`, `devsecops`,`pipelines` and moreover. And today, the first session, let dive deeper into way for setup the VM on your host, I mean how can we automate provisioning to create your machine with `vagrant`, that is factor to doing a lot of stuff when you want to operate something in your host, especially `kubernetes`. Not wait to long, let's digest 😄

List of topics in series

- **[[Kubewekend Session 1]]**
- [[Kubewekend Session 2]]
- [[Kubewekend Session 3]]
# What is vagrant ? Why I use it ?

Like usual, before start a lab, we will figure out what things we do interact, and how we can handle and understand about useful that tools can bring up for us. And `vagrant` is special target, much powerful and easily to hang out when you want to work in `vm` with `virtualbox`, `hyper-v` and `vmware`

![[Pasted image 20240707153554.png]]

If this is first time you hear about `vagrant`, then `vagrant` is

## Introduce Vagrant

>[!info]
>[Vagrant](https://developer.hashicorp.com/vagrant) is a tool for building complete development environments. With an easy-to-use workflow and focus on automation, Vagrant lowers development environment setup time, increases development/production parity, and makes the "it works on my machine" excuse a relic of the past.

`Vagrant` is one in tools of `Hashicorp`, which community provide us about powerful solution in Managing Infrastructure by code, such as

- Terraform
- Nomad
- Packer
- Consul
- And yeah, Vagrant

Back to `Vagrant`, this tool can help you handle the work when you want to build virtual machine environments in a single workflow, you will except mistake when you setup hand by hand for virtual machine and cut off effort to setup your projects, help maximize the productivity and flexibility of you and your team.

>[!fact]
>To achieve its magic, Vagrant stands on the shoulders of giants. Machines are provisioned on top of VirtualBox, VMware, AWS, or [any other provider](https://developer.hashicorp.com/vagrant/docs/providers). Then, industry-standard [provisioning tools](https://developer.hashicorp.com/vagrant/docs/provisioning) such as shell scripts, Chef, or Puppet can automatically install and configure software on the virtual machine.

Vagrant is designed to use for multiple purpose and personal reason

- [For Developer](https://developer.hashicorp.com/vagrant/intro#for-developers), `Vagrant` will isolate dependencies and their configuration within a single disposable, consistent environment, without sacrificing any of the tools you are used to working with (editors, browsers, debuggers, etc.)
- [For Operators](https://developer.hashicorp.com/vagrant/intro#for-operators), `Vagrant` gives you a disposable environment and consistent workflow for developing and testing infrastructure management scripts.
- [For Designers](https://developer.hashicorp.com/vagrant/intro#for-designers), `Vargant` will automatically set everything up that is required for that web app in order for you to focus on doing what you do best: design.

>[!note]
>Vagrant is designed for everyone as the easiest and fastest way to create a virtualized environment! 🤭

Read more about `Vagrant` versus with others software, at : [Vagrant vs. Other Software](https://developer.hashicorp.com/vagrant/intro/vs)

## Vagrant Fundamentals

![[Pasted image 20240707160257.png]]

The special of `Vagrant` comes up with multiple features, and active community to help you doing great things, let me tell you

- [Boxes](https://developer.hashicorp.com/vagrant/docs/boxes) - *The package format for Vagrant environments, that will factor like light weight image which package and provide to reuse that for bring up virtual environment*
- [Vagrantfile](https://developer.hashicorp.com/vagrant/docs/vagrantfile) - *Describe your virtual machine's configuration and how to provision it*
- [Provisioning](https://developer.hashicorp.com/vagrant/docs/provisioning) - *Workflow help you automatically install software, alter configuration, and do lot of things with machine*
- [Vagrant Cloud](https://app.vagrantup.com/boxes/search) - *Huge providers to give you boxes which can interact with `vagrant`*
- And a lot of things, [CLI](https://developer.hashicorp.com/vagrant/docs/cli) [Synced Folders](https://developer.hashicorp.com/vagrant/docs/synced-folders) [Networking](https://developer.hashicorp.com/vagrant/docs/networking)

Explore more about `Vagrant` and features at [Documentations](https://developer.hashicorp.com/vagrant/docs)

## Installation

`Vagrant` is [CLI](https://developer.hashicorp.com/vagrant/docs/cli), as binary and work for multiple platforms from Mac, Win and Linux. You can install from [install page](https://developer.hashicorp.com/vagrant/install) and follow [instruction](https://developer.hashicorp.com/vagrant/docs/installation) to installing

So simple if you work with `Linux`, especially Ubuntu or Debian, you can follow my guide to install `Vagrant`

```bash
# Install require tools for installation
sudo apt update
sudo apt install -y wget curl git unzip build-essential libfuse2

# Get the binary from installation page
wget -q https://releases.hashicorp.com/vagrant/2.4.1/vagrant_2.4.1_linux_amd64.zip

# Unzip the compress
unzip -q vagrant_2.4.1_linux_amd64.zip

# mv to execution profile
sudo mv vagrant /usr/local/bin
```

Done after move to directories, you can check `vagrant` on your shell

```bash
~ ⌚ 16:18:47
$ vagrant --version
Vagrant 2.4.1
```

## Vagrant workflow

![[Pasted image 20240707162430.png]]

Base on my experience, when work with `vagrant`, you will make sure some stuff already exist and make sure your step can occur smooth and no problems

1. Prepare environment variables if need
2. Validate `Vagrantfile` configuration with `validate` command
3. Check providers actually install and work on your machine
4. Use `up` command when you validate all above, and others will handle via `Vagrant`
5. After provisioning progress, Use `ssh` command to connect machine

## Conclusion

![[Pasted image 20240707163249.png]]

>[!quote]
>Hope you find well information about `vagrant`, figure out the technology which you work with. Don't worry to ton of information because on the next part, when you do the lab, I think you will actually love `vagrant`, for sure 100% 😄

# Do magical with Vagrant

![[Pasted image 20240707164329.png]]

## Introduce Lab

>[!todo]
>On session 1, we will use `vagrant` to provisioning the machine in `VirtualBox`, and prepare `docker` environment inside to next session, you will deploy `kubernetes` cluster with `docker` inside that machine

Source Lab: [Use Vargrant to configuration the VM with provider](https://github.com/Xeus-Territory/kubewekend?tab=readme-ov-file#use-vargrant-to-configuration-the-vm-with-provider)

That is my source code about `kubewekend` series, you can follow and take new update from progress of series, what lab does we have in [table of contents](https://github.com/Xeus-Territory/kubewekend?tab=readme-ov-file#table-of-contents)

Before you can do the lab, make sure you do 

- Install [virtualbox](https://www.virtualbox.org/wiki/Downloads)
- Install [vagrant](https://developer.hashicorp.com/vagrant/docs/installation)

With `Virtualbox`, if you meet the problem to install or unable to start `virtualbox` service, you can reach out to [[Troubleshoot Problems#Could not load 'vboxdrv' after upgrade to Ubuntu 16.04 (and I want to keep secure boot)|virtualbox troubleshoot]] which can help use to resolve problem (NOTICE: Ubuntu 24.04 can be meet)

If you check all work, `VBoxManage` and `Vagrant`  like this

```bash
~ ⌚ 16:20:05
$ VBoxManage --version
7.0.18r162988

~ ⌚ 16:44:49
$ vagrant --version
Vagrant 2.4.1
```

You is already to do provisioning VM with `Vagrantfile`, but before review file, you can perform `box add` command to cut off the time to waiting download box from [Vagrant Cloud](https://app.vagrantup.com/ubuntu/boxes/focal64). To be stable and not increase the trouble, we will use Ubuntu 20.04 - focal64

```bash
vagrant box add https://app.vagrantup.com/ubuntu/boxes/focal64
```

It will start download `box` and you can check result on the last of progress, with `box list` command

```bash
vagrant box list
```

![[Pasted image 20240707165055.png]]

## Vagrantfile

Now, we overview `Vagrantfile`, I try to setup multiple case for you meet when work with `vagrant`, such as

- Iteration loop (Use for in `ruby`)
- Set up `priority` for your step in provisioning machine
- Overwrite `ssh` default port to customize of your
- Disable password and use `private_key` to authentication
- Use `env` in `Vagrantfile` with `.env` file
- Write `provision` with `shell` block to installing `docker`
- Configuration `trigger` when you do `up` and `provision` with machine
- Use regex to handle `provision` multiple machine

```ruby title="Vagrantfile"
Vagrant.configure("2") do |config|
  # # Handle multiple machine in one block of Vagrantfile
  # # https://developer.hashicorp.com/vagrant/docs/multi-machine
  config.vm.define "k8s-master-machine", primary: true do |config|
    config.vm.box = "ubuntu/focal64"
    config.vm.hostname = "k8s-master-machine"
    config.vm.communicator = "ssh"
    # Default enable 2222 for ssh communication (Add id: "ssh" to disable default)
    # https://realguess.net/2015/10/06/overriding-the-default-forwarded-ssh-port-in-vagrant/
    config.vm.network "forwarded_port", guest: 22, host: 6996, protocol: "tcp", id: "ssh", host_ip: "127.0.0.1"
    config.vm.box_check_update = false
    config.ssh.username = ENV["SSH_USER"]
    config.ssh.private_key_path = ENV["SSH_PRIV_KEY_PATH"]
    config.ssh.port = 6996
    config.ssh.guest_port = 22

    # # Disable to generate a key pair inside .vargrant directory, use insecure_private_keys
    # # instead of using private_key
    # config.ssh.insert_key = false

    config.ssh.forward_agent = true

    config.vm.provider "virtualbox" do |config|
      config.name = "k8s-master-machine"
      config.memory = 2048
      config.cpus = 2
    end
  end
  
  # Use to loo[] over VM defination
  # Documentation: https://developer.hashicorp.com/vagrant/docs/vagrantfile/tips#loop-over-vm-definitions
  # Use can use `up` with regex to numberic the machines what you want to provisioning
  # Example: vagrant up "/k8s-worker-machine-[1-2]/" --provider=virtualbox
  (1..3).each do |i|
    config.vm.define "k8s-worker-machine-#{i}" do |config|
      config.vm.box = "ubuntu/focal64"
      config.vm.hostname = "k8s-worker-machine-#{i}"
      config.vm.communicator = "ssh"
      # Default enable 2222 for ssh communication (Add id: "ssh" to disable default)
      # https://realguess.net/2015/10/06/overriding-the-default-forwarded-ssh-port-in-vagrant/
      # For prevent collisions, use `auto_correct` and `unsable_port_parameter` to guide the port to new one
      config.vm.network "forwarded_port", guest: 22, host: 9669, protocol: "tcp", id: "ssh", host_ip: "127.0.0.1", auto_correct: true
      config.vm.usable_port_range = 9669..9671
      config.vm.box_check_update = false
      config.ssh.username = ENV["SSH_USER"]
      config.ssh.private_key_path = ENV["SSH_PRIV_KEY_PATH"]
      config.ssh.guest_port = 22

      # # Disable to generate a key pair inside .vargrant directory, use insecure_private_keys
      # # instead of using private_key
      # config.ssh.insert_key = false

      config.ssh.forward_agent = true

      config.vm.provider "virtualbox" do |config|
        config.name = "k8s-worker-machine-#{i}"
        config.memory = 1024
        config.cpus = 1
      end
    end
  end

  # Initialize the shell command to configuration
  $configScript = <<-'SHELL'
  sudo -i
  sudo apt update && sudo apt install curl git -y
  sudo apt install docker.io docker-compose -y
  sudo usermod -aG docker vagrant
  SHELL

  # Reload profile of current user on machine
  $reloadProfile = <<-'SHELL'
  sudo -i
  shutdown -r now
  SHELL

  # Execution the shell script provide
  config.vm.provision "shell", inline: $configScript

  # Configuration auto trigger reload profile in machine after shell
  config.trigger.after :up, :provision do |trigger|
    trigger.info = "Running a after trigger!"
    trigger.run_remote = { inline: $reloadProfile }
    trigger.ignore = [:destroy, :halt]
  end
end
```

So `Vagrant` is use `ruby` major language to write this file, so syntax will like a `ruby` a lot. Inside this `Vagrantfile`, I will do three task when you use `up` command

- Tell `Virtualbox`, build and define the machine base on name we will pass into, e.g: `k8s-master-machine`, `k8s-worker-machine-1`. Especially, I define dynamic worker machine to help you learn about high availability (HA) on this series, so you can use `regex` which I refer on description about `description` to parallel build multiple machines, e.g use `"/k8s-worker-machine-[1-2]/"` to up machine 1 and 2
- When you trigger `up` you can perform `ssh` and do provision shell script to install docker engine inside that machine. You can update script what ever you want and re-trigger with `provision` command
- Lastly, when you use `up` and `provision` command, your machine will restart base on trigger event which I setup on the last, to apply and use new profile which `reboot` options

You can learn more about `Vagrantfile` at [Vagrantfile](https://developer.hashicorp.com/vagrant/docs/vagrantfile) that will include multiple topics and configuration about `vm` `ssh` `winrm` `winssh` `vagrant`

After you make sure learn and feel pleasure with your `Vagrantfile`. You can save that do next step

## Make a magic

When you choose the `Vagrantfile` of mine, you can do step by step to get the goal

1. First, locate to the root of project

2. Secondly, you need to make sure set environment variables for your shell before execute Vagrant, you can do manually or use `.env`

	```bash
	# Manually
	export SSH_USER="vargrant-user"
	export SSH_PRIV_KEY_PATH="~/.ssh/vmbox"
	
	# Use .env file
	cp -r .env.examples .env
	set -o allexport && source .env && set +o allexport
	```

3. Third, use `up` command with provider=`virtualbox`

	```bash
	# Use can use another provider: https://developer.hashicorp.com/vagrant/docs/providers
	# Provision 1 master and 1 worker
	vagrant up k8s-master-machine k8s-worker-machine-1 --provider=virtualbox
	
	# You can provision more worker with regex pattern
	vagrant up "/k8s-worker-machine-[2-3]/" --provider=virtualbox
	```

Result when you provisioning successfully

![[Pasted image 20240707171423.png]]

## `Vagrant` note

>[!note]
>In this part, I will brief the popular command, that use for control and handle task with `vagrant`

### Destroy

When you want to destroy, use `destroy` command with option to destroy vm

```bash
# Shutdown and destroy VM for all machines
vagrant destroy --graceful --force

# Specify the target with name
# (Use can regex to manipulate multiple machines)
vagrant destroy k8s-worker-machine-1 --graceful --force
```

### Provision

When you want to execute a `shell` script, you can use `provision` command

```bash
# Execute a shell script for all machines
vagrant provision

# Execute a shell script for specific machines
# (Use can regex to manipulate multiple machines)
vagrant provision k8s-worker-machine-1
```

### Halt

When you want to turn off the machine provisioning, use `halt` command

```bash
# Turn off all machines provision
vagrant halt

# Turn off the specific machine provision 
# (Use can regex to manipulate multiple machines)
vagrant halt k8s-worker-machine-1
```

### Reload

When you want to reload the machine provisioning when update Vargrantfile, use `reload` command. **(NOTE: Use can use that to turn up your machine, but it will regenerate private key, make sure you understand that)**

```bash
# Reload all machines provision
vagrant reload

# Reload the specific machine provision
# (Use can regex to manipulate multiple machines)
vagrant reload k8s-worker-machine-1
```

### Box

When you want to add a new box to the machine, or cut off time for downloads machine. Use can use `box` command

```bash
# Check actually box we have in host
vagrant box list

# Install box to host
vagrant box add https://location/of/vagrant/box # (Can be local, Vagrant Registry or private storage)

# Example: vagrant box add https://app.vagrantup.com/ubuntu/boxes/focal64
```

### SSH

When you want to connect to the machine, you have two ways to connect

1. Via `vargrant`, `ssh` command

```bash
# Connect to machine with specified machine name
vagrant ssh k8s-worker-machine-1

# When you want to pass command via ssh
vagrant ssh k8s-worker-machine-1 --command "echo "Hello World" > foo.txt"
```

That situation will use `private_key` base on your ssh-config when you define and generate machine, you will not need concert about your key is outdate or whatever, just simple put the responsibility for `vagrant` to take care connection

```bash
# You can check with `vagrant ssh-config` to understand your `ssh` work on port
vagrant ssh-config
```

![[Pasted image 20240707172240.png]]

And you access `ssh` succeed with `vagrant ssh` command

![[Pasted image 20240707172348.png]]

2. Via actions with manually configured `ssh-key`

```bash
# With this action you need to location where .vagrant in your project, usually in root directory
ls .vagrant/

# After that you need run `ssh-agent` to create new session for agent ssh
eval $(ssh-agent -s) # Set the new session agent

# Add the key to your host, and make a authentication
ssh-add ./vagrant/machines/k8s-master-machine/private_key

# And lastone make a connection to machine on custom port
# Befor that you can check again with `vagrant ssh-config` to understand your `ssh` work on port
vagrant ssh-config

# Make a ssh connection
ssh vagrant@127.0.0.1 -p 6996
```

### Status

You can use `status` command to check your state of machine

```bash
vagrant status
```

![[Pasted image 20240707172604.png]]

# Conclusion

>[!done]
>Yeah that all for today, just few situation around `vagrant`, hope you can learn a lot about them and define your own `Vagrantfile` to handle your requirements. As least, I can deliver you some situations you can refer for future update. And lastly of this lab, you have machine with `docker` inside, and be ready for bring up `Kubernetes` cluster on next session

>[!quote]
>Lastly, This is end on the session 1, please wait and join with me in the next issues, you can find suitable topic at [[Personal Projects Management#Setup Self Kubernetes Cluster in locally ✍]]. On the session 2, I will guide you about `ansible` and how we can use `ansible` to provide for you own `kubernetes` cluster with `kind`. And now, I hope you have a good weekend, happy with your family, stay safe and I will see you soon, bye bye 😄

