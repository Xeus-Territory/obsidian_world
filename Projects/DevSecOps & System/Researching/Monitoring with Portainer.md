<div align="center">
    <img src="https://cloudcraft.info/wp-content/uploads/2021/11/portainer_7.jpg">
    <strong><em><p style="text-align: center;">Portainer - Monitoring tools for K8s and Docker</p></em></strong>
</div>

- So for easily managing and reading logs, metrics, and exec console of containers, you will need monitoring tools, and `portainer` is exactly what you want, go to [documentation](https://www.portainer.io/) for more detail.

- Go for check it [config_portainer.sh](config_portainer.sh.md) for understanding what is going on for deployed containers. The script will contain 2 purposes, deploy the container and reset the password. To run this script, try this command

```bash
#/bin/bash
chmod +x config_portainer.sh
# This command will reset the password of current portainer (1st optional)
./config_portainer.sh --reset-password
# This command will create a new portainer for you (2nd optional)
./config_portainer.sh --deploy-master-portainer
# This command will create a new agent portainer for you (3rd optional)
./config_portainer.sh --deploy-agent-portainer
```

*If you want to setup `portainer` with ansible. You can perform this command. You need choose one of task in [monitoring-task](portainer-setup.yaml.md)*
  - **config_master**: *Configuration master portainer*
  - **config_ssl_master**: *Configuration master portainer with SSL cert domain*
  - **config_agent**: *Configuration agent portainer*
  - **reset_password_master_portainer**: *Reset the password of master portainer*

```bash
ansible-playbook -i inventories/<env>/hosts --extra-vars "host_name=<your_host_machine>" \
--extra-vars "env=local|staging|prod" --user="root|<remote-user>" \
--tags="portainer_config,selection-task-portainer" ./ansible/monitoring_tasks.yaml
```

- When you apply the container will run, for this purpose, you can disable exposing the public port of `portainer` into the host, just access it via `nginx-proxy` which optional will be best for secure and easily managing the `portainer`. The configuration which you can take a look at [monitoring.conf](monitoring.conf.j2.md)

- `portainer` is not just managed the only your local docker, it can be managed for multiple docker via `portainer-agent`. Read this [documentation](https://docs.portainer.io/admin/environments/add/docker/agent) for more information.