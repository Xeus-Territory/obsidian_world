---
title: Awesome Ansible
tags:
  - awesome
  - collections
  - devops
  - ansible
  - ansible-playbooks
---

![[thumbnail-ansible-general.png]]

# General

## Articles

- [Medium - 40 Ansible Playbooks You Can’t Live Without in Your CI/CD Pipeline](https://medium.com/@eren.c.uysal/40-ansible-playbooks-you-cant-live-without-in-your-ci-cd-pipeline-460a1b472c38) 🌟 **(Recommended)**
- [[Setup PostgreSQL with Ansible]]
## Documentations

- [Ansible](https://docs.ansible.com/ansible/latest/index.html) : Ansible provides open-source automation that reduces complexity and runs everywhere, especially **virtual machine**
- [Ansible Vault](https://docs.ansible.com/ansible/2.9/user_guide/vault.html): A feature of ansible that allows you to keep sensitive data such as passwords or keys in encrypted files, rather than as plaintext in playbooks or roles.
## Organization

- [Ansible Community](https://github.com/ansible-community): Collection of community-driven Ansible repositories
- [Ansible](https://github.com/ansible): The Community whose stand behind Ansible
## Page

- [Ansible Galaxy](https://galaxy.ansible.com/ui/) : Ansible template and external playbook 🌟 **(Recommended)**
## Tools

- [awx](https://github.com/ansible/awx): AWX provides a web-based user interface, REST API, and task engine built on top of Ansible.
# Playbook Collections

## Operation System (OS)

### Setup General VM

```yaml title="general-setup.yaml"
# For general config VM
---
- name: Update and install packages from apt repository
  become: true
  tags: update_and_install
  block:
    - name: Update via apt
      ansible.builtin.shell:
        cmd: |
          sudo apt update &&
          sudo apt upgrade -y
      changed_when: false

    - name: Install docker.io and docker-compose
      ansible.builtin.apt:
        name:
          - docker.io
          - docker-compose
        state: present

    - name: Install jq
      ansible.builtin.apt:
        name:
          - jq
        state: present

    - name: Install postgresql-client
      ansible.builtin.apt:
        name:
          - postgresql-client
        state: present
```


## PostgreSQL Database

### In Docker

```yaml title="postgresql-docker.yaml"
# Ansible Playbooks for self-hosted PostgreSQL with Docker
---
- name: Setup postgres for remote machines via Docker
  hosts: "{{ name_machine }}"
  tags: install_psql
  vars:
    postgres_version: "13"
  vars_files: "./inventories/{{ env }}/host_vars/postgresql.yml"
  tasks:
    - name: Install docker and packages dependencies
      ansible.builtin.include_tasks:
        file: "./general_tasks.yaml"
        apply:
          tags:
            - update_and_install

    - name: Create a .credentials folder for remote machines
      ansible.builtin.command:
        cmd: mkdir -p ~/.credentials
      changed_when: false

    - name: Mount the secrets into the VM
      ansible.builtin.copy:
        src: "~/.credentials/{{ secret_password }}"
        dest: "~/.credentials/{{ secret_password }}"
        mode: "0400"
        owner: "{{ owner }}"
        group: "{{ owner }}"

    - name: Create the folder for volumes postgres
      ansible.builtin.command:
        cmd: mkdir -p /etc/postgresql/{{ postgres_version }}/data
      changed_when: false

    - name: Docker run to setup postgres
      ansible.builtin.shell: |-
        docker run -d --name postgres \
        -e POSTGRES_DB="{{ database_name }}" -e POSTGRES_HOST_AUTH_METHOD="{{ auth_method }}" \
        -e POSTGRES_PASSWORD="$(cat ~/.credentials/{{ secret_password }})" -v /etc/postgresql/{{ postgres_version }}/data:/var/lib/postgresql/data \
        --restart unless-stopped -p 5432:5432 {{ postgres_container_version }}
        docker ps
      register: shell_output
      changed_when: false

    - name: View the log of setup postgres
      ansible.builtin.debug:
        msg: "{{ shell_output.stdout_lines }}"

- name: Remove postgres container
  hosts: "{{ host_name }}"
  tags: remove_psql
  vars:
    postgres_version: "13"
  vars_files: "./inventories/{{ env }}/host_vars/postgresql.yml"
  tasks:
    - name: Turn off the docker container
      ansible.builtin.shell: |
        docker rm -f postgres
        docker volumes rm -f $(docker volumes ls)
        sleep 3
        docker ps
      register: shell_output
      changed_when: false

    - name: View shell output
      ansible.builtin.debug:
        msg: "{{ shell_output.stdout_lines }}"

    - name: Delete the folder mount into container
      ansible.builtin.command:
        cmd: rm -rf /etc/postgresql
      changed_when: false

```

### In VM

```yaml title="postgresql-selfhost.yaml"
# Ansible Playbooks for self-hosted PostgreSQL on VM
---
- name: Install postgresql-server
  hosts: "{{ host_name }}"
  become: true
  tags: install_psql
  vars:
    postgresql_version: "14"
    postgresql_bin_path: "/usr/lib/postgresql/{{ postgresql_version }}/bin"
    postgresql_data_dir: "/var/lib/postgresql/{{ postgresql_version }}/main"
  tasks:
    - name: Install packages
      ansible.builtin.apt:
        name:
          - postgresql
          - postgresql-contrib
          - libpq-dev
          - python3-psycopg2
        state: present

    - name: Check if PostgreSQL is initialized
      ansible.builtin.stat:
        path: "{{ postgresql_data_dir }}/pg_hba.conf"
      register: postgres_data

    - name: Empty data dir
      ansible.builtin.file:
        path: "{{ postgresql_data_dir }}"
        state: absent
      when: not postgres_data.stat.exists

    - name: Initialize PostgreSQL
      ansible.builtin.command: "{{ postgresql_bin_path }}/initdb -D {{ postgresql_data_dir }}"
      become: true
      become_user: postgres
      when: not postgres_data.stat.exists
      changed_when: false

    - name: Start and enable service
      ansible.builtin.service:
        name: postgresql
        state: started
        enabled: true

- name: Remove postgresql-server
  hosts: "{{ host_name }}"
  become: true
  tags: remove_psql
  tasks:
    - name: Remove Package from postgresql-server
      ansible.builtin.apt:
        name:
          - postgresql
          - postgresql-contrib
        state: absent

    - name: Remove the dependencies with postgresql-server
      ansible.builtin.apt:
        autoremove: true

- name: Config for PostgreSQL
  hosts: "{{ host_name }}"
  become: true
  tags: config_psql
  tasks:
    - name: Sync pg_hba.conf file to remote
      ansible.builtin.template:
        src: "./templates/pg_hba.conf.j2"
        dest: "/etc/postgresql/14/main/pg_hba.conf"
        owner: postgres
        group: postgres
        mode: "0600"
    - name: Sync postgresql.conf file to remote
      ansible.builtin.template:
        src: "./templates/postgresql.conf.j2"
        dest: "/etc/postgresql/14/main/postgresql.conf"
        owner: postgres
        group: postgres
        mode: "0600"
    - name: Restarted service postgres
      ansible.builtin.service:
        name: postgresql
        state: restarted

```

## Portainer

```yaml title="portainer-setup.yaml"
# Ansible Playbooks for self-hosted Portainer with Docker
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