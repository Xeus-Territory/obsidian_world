---
title: Awesome Vagrant
tags:
  - devops
  - provisioning
  - system-architecture
  - usage
---

![[thumbnail-vagrant-general.png]]

# Repositories

## General

- [vagrant](https://github.com/hashicorp/vagrant): a tool for building and distributing development environments.
- [awesome-vagrant](https://github.com/iJackUA/awesome-vagrant): A curated list of awesome Vagrant resources, plugins, tutorials and other nice things
## Plugins

- [GitHub - Available Vagrant Plugins](https://github.com/hashicorp/vagrant/wiki/Available-Vagrant-Plugins)
- [vagrant-libvirt](https://github.com/vagrant-libvirt/vagrant-libvirt): a [Vagrant](http://www.vagrantup.com/) plugin that adds a [Libvirt](http://libvirt.org/) provider to Vagrant, allowing Vagrant to control and provision machines via Libvirt toolkit.
- [vagrant-vmware-desktop](https://github.com/hashicorp/vagrant-vmware-desktop):  the common codebase for the official providers for VMware desktop products: Fusion, Player, and Workstation. This therefore works on Windows, Mac, and Linux
# Documentation & Resources

## General

- [Vagrant - General Documentation](https://developer.hashicorp.com/vagrant/docs)
- [Vagrant - Vagrantfile](https://developer.hashicorp.com/vagrant/docs/vagrantfile)
- [Vagrant - Networking](https://developer.hashicorp.com/vagrant/docs/networking)
## External

- [Vagrant Cloud](https://portal.cloud.hashicorp.com/vagrant/discover): The repository for downloading the image needed for turn on the machine

# Tips & Configuration

## Standard `Vagrantfile`

```ruby
Vagrant.configure("2") do |config|
  # # Handle multiple machine in one block of Vagrantfile
  # # https://developer.hashicorp.com/vagrant/docs/multi-machine
  config.vm.define "harchidb-primary", primary: true do |config|
    config.vm.box = "ubuntu/focal64"
    config.vm.hostname = "harchidb-primary"
    config.vm.communicator = "ssh"
    # Default enable 2222 for ssh communication (Add id: "ssh" to disable default)
    # https://realguess.net/2015/10/06/overriding-the-default-forwarded-ssh-port-in-vagrant/
    config.vm.network "forwarded_port", guest: 22, host: 6996, protocol: "tcp", id: "ssh", host_ip: "127.0.0.1"
    # Add the bridge network for let two machine can communicate each others
    # With Linux, Private Network will set by default in range: 192.168.56.0/21 (192.168.56.1 - 192.168.63.255)
    # Read more the documentation at: https://www.virtualbox.org/manual/ch06.html#network_hostonly 
    config.vm.network "private_network", ip: "192.168.56.10"
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
      config.name = "harchidb-primary"
      config.memory = 2048
      config.cpus = 2
    end
    # Add one more disk 10GB for master node, if prerequisites
    config.vm.disk :disk, size: "10GB", name: "extra_storage"
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

## Vagrant can't authentication `ssh`

If you have problems when `vagrant` can't authentication for `ssh`. You will need concern to add this setting. Read more at: [Vagrant ssh authentication failure](https://stackoverflow.com/questions/22922891/vagrant-ssh-authentication-failure)

```bash title="Vagrantfile"
config.ssh.forward_agent = true
```
