---
title: PostgreSQL Self-hosted in Docker by Ansible
tags:
  - database
  - ansible-playbooks
  - ansible
  - docker
  - postgresql
---
```yaml
# postgresql-docker.yaml
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