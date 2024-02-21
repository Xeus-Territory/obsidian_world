---
title: postgres_itself_tasks.yaml
tags:
  - ansible
  - ansible-playbooks
  - self-hosted
  - postgresql
---
```yaml
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