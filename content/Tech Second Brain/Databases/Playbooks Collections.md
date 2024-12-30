---
title: Database Playbooks Collections
tags:
  - ansible
  - ansible-playbooks
  - monitoring
  - database
---
# Postgres
## In Docker

>[!summary]
>Ansible Playbooks for self-hosted PostgreSQL with Docker

```yaml title="postgresql-docker.yaml"
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

## In VM

>[!summary]
>Ansible Playbooks for self-hosted PostgreSQL on VM

```yaml title="postgresql-selfhost.yaml"
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
