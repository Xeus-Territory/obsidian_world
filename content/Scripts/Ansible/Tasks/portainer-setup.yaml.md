---
title: portainer-setup.yaml
tags:
  - ansible-playbooks
  - ansible
  - monitoring
---

```yaml
---
- name: Deploy portainer master and agent
  hosts: "{{ host_name }}"
  become: true
  vars_files: "./inventories/{{ env }}/host_vars/vm.yml"
  tasks:
    - name: Create and mounting the script for setting up the portainer
      tags: portainer_config
      block:
        - name: Create a folder to store the script
          ansible.builtin.shell:
            mkdir -p /root/script
          changed_when: false
        - name: Mounting the script into the machine
          ansible.posix.synchronize:
            src: "../script/config_portainer.sh"
            dest: "/root/script/config_portainer.sh"

    - name: Configuration master portainer
      tags: config_master
      ansible.builtin.shell:
        bash -c "/root/script/config_portainer.sh --deploy-master-portainer {{ monitoring.name_origin_replica_monitoring }}"
      register: shell_output
      changed_when: false

    - name: Configuration master portainer
      tags: config_ssl_master
      ansible.builtin.shell:
        bash -c "/root/script/config_portainer.sh --deploy-master-ssl-portainer {{ monitoring.name_origin_replica_monitoring }}"
      register: shell_output
      changed_when: false

    - name: Configuration agent portainer
      tags: config_agent
      ansible.builtin.shell:
        bash -c "/root/script/config_portainer.sh --deploy-agent-portainer {{ monitoring.name_origin_replica_monitoring }}"
      register: shell_output
      changed_when: false

    - name: Reset password master container
      tags: reset_password_master_portainer
      ansible.builtin.shell:
        bash -c "/root/script/config_password_master --reset-password {{ monitoring.name_origin_replica_monitoring }}"
      register: shell_output
      changed_when: false

    - name: Log output to console
      ansible.builtin.debug:
        msg: "{{ shell_output.stdout_lines }}"
      tags:
        - config_master
        - config_agent
        - config_deal_master
        - reset_password_master_portainer
```