---
title: Setup PostgreSQL with Ansible
tags:
  - DIY
  - ansible
  - docker
  - database
  - devops
  - basic-knowledge
  - architecture
  - usage
  - postgresql
---
>[!summary]
>This progress will setup the `postgresql`, configure for `postgresql` for remote access on docker image

For running to set up `postgresql` in VM. Go for it with commands

**Notice:**

- Upgrading your specify hosts from `hosts` file and verify `ssh-key` with your `ssh-agent`

```bash
#!/bin/bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/<YOUR_SSH_KEY>
ansible <YOUR_HOSTS> -i inventories/hosts -m ping (200 Succeed - Moving to next step)
```

- Deprecated: Configuration your [pg_hba.conf](PostgreSQL%20Host%20Template%20for%20Ansible.md) and [postgresql.conf](PostgreSQL%20Configuration%20Template%20for%20Ansible.md) on templates folder --> Changing into use `PostgreSQL` database inside container but this `pg_hba` & `postgresql.conf` still work if you find the right path to mounting.
- Running the ansible for setup postgresql and configure your postgresql. This configuration will put inside `YAML` style and refer with this article to deployment via `ansible`
	1. [Deploy PostgreSQL via Docker](PostgreSQL%20Self-hosted%20in%20Docker%20by%20Ansible.md)
	2. [Deploy PostgreSQL in Host](PostgreSQL%20Self-hosted%20in%20VM%20by%20Ansible.md)

```bash
#!/bin/bash
ansible-playbook -i inventories/hosts --extra-vars name_machine=deal_platform --tags update general-tasks.yaml
ansible-playbook -i inventories/hosts --extra-vars name_machine=deal_platform --tags install general-tasks.yaml
ansible-playbook -i inventories/hosts --tags install_psql postgres_docker_tasks.yaml
```