---
title: Setup General VM with Ansible
tags:
  - ansible-playbooks
  - ansible
  - basic-knowledge
  - bash
  - linux
---

```yaml
# general-setup.yaml
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

