---
title: The awesome of Monitoring & Observability
tags:
  - devops
  - monitoring
  - usage
  - awesome
  - collections
---

![[icon-grafana.png]]

>[!quote]
>This awesome collections is a place where store articles, blogs, tools and strategies to using monitoring and observability stack in your project

# General

## Alert / On Call Tools

- [calert](https://github.com/mr-karan/calert): 🔔 Send alert notifications to Google Chat via Prometheus Alertmanager
- [elastalert2](https://github.com/jertel/elastalert2):  A simple framework for alerting on anomalies, spikes, or other patterns of interest from data in [Elasticsearch](https://www.elastic.co/elasticsearch/) and [OpenSearch](https://opensearch.org/)
- [versus-incident](https://github.com/VersusControl/versus-incident): An incident management tool supporting multi-channel alerting, customizable messages, and on-call integrations
## Monitoring Stacks

- [ELK](https://www.elastic.co/elastic-stack): Combination from four main components. [Guide](https://www.digitalocean.com/community/tutorials/how-to-install-elasticsearch-logstash-and-kibana-elastic-stack-on-ubuntu-22-04), [Helm](https://operatorhub.io/operator/elastic-cloud-eck) and [Docker](https://github.com/deviantony/docker-elk)

	- [Beats](https://www.elastic.co/products/beats): lightweight, single-purpose data shippers that can send data from hundreds or thousands of machines to either Logstash or Elasticsearch.
	- [Elasticsearch](https://www.elastic.co/products/elasticsearch): a distributed [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) search engine which stores all of the collected data.
	- [Kibana](https://www.elastic.co/products/kibana): a web interface for searching and visualizing logs.
	- [Logstash](https://www.elastic.co/products/logstash): the data processing component of the Elastic Stack which sends incoming data to Elasticsearch.

- [Grafana Stack](https://grafana.com/about/grafana-stack/): Ecosystem of Grafana for providing monitor methodology for your application, container, nodes and moreover.

	- Agent: [alloy](https://grafana.com/docs/alloy/latest/), [agent](https://grafana.com/docs/agent/latest/), [mimir](https://grafana.com/docs/mimir/latest/)
	- Alert: [AlertManger](https://prometheus.io/docs/alerting/latest/alertmanager/)
	- Dashboard: [FlameGraph](https://github.com/brendangregg/FlameGraph) - (Pyroscope), [gitana](https://github.com/nicolastakashi/gitana)
	- Installer: [Helm](https://artifacthub.io/packages/helm/prometheus-community/kube-prometheus-stack), [[Monitoring Stack#Grafana, Prometheus and Exporter|Docker]] and [Guide](https://grafana.com/docs/grafana/latest/getting-started/get-started-grafana-prometheus/)
	- Logging: [fluentd](https://github.com/fluent/fluentd), [fluent-bit](https://github.com/fluent/fluent-bit), [loki](https://grafana.com/docs/loki/latest/), [promtail](https://grafana.com/docs/loki/latest/send-data/promtail/)
	- Metrics: [prometheus](https://prometheus.io/docs/introduction/overview/), [cadvisor](https://github.com/google/cadvisor), [node_exporter](https://github.com/prometheus/node_exporter), [thanos](https://github.com/thanos-io/thanos)
	- Profiling: [pyroscope](https://grafana.com/docs/pyroscope/latest/)
	- SLO: [sloth](https://github.com/slok/sloth)
	- Traces: [jaeger](https://www.jaegertracing.io/docs/2.1/), [OpenTelemetry](https://opentelemetry.io/docs/what-is-opentelemetry/), [tempo](https://grafana.com/docs/tempo/latest/)

- [VictoriaMetrics Stack](https://github.com/VictoriaMetrics/VictoriaMetrics): New monitoring solution for both metrics and logs

	- VictoriaMetrics is a fast, cost-effective and scalable monitoring solution and time series database
	- VictoriaLogs is [open source](https://github.com/VictoriaMetrics/VictoriaMetrics/tree/master/app/victoria-logs) user-friendly database for logs from [VictoriaMetrics](https://github.com/VictoriaMetrics/VictoriaMetrics/).

- [dcgm](https://developer.nvidia.com/dcgm): Manage and Monitor GPUs in Cluster Environments
- [zabbix](https://github.com/zabbix/zabbix): Real-time monitoring of IT components and services, such as networks, servers, VMs, applications and the cloud.
## Product Error Analytics

- [openreplay](https://github.com/openreplay/openreplay): Session replay and analytics tool you can self-host. Ideal for reproducing issues, co-browsing with users and optimizing your product.
- [Sentry](https://github.com/getsentry/sentry): Developer-first error tracking and performance monitoring. [Website](https://sentry.io/)
## Repositories

- [awesome-monitoring](https://github.com/Enapiuz/awesome-monitoring): List of tools for monitoring and analyze everything
- [awesome-observability](https://github.com/adriannovegil/awesome-observability): Awesome observability page
- [Awesome Prometheus alerts](https://samber.github.io/awesome-prometheus-alerts/): Collection of alerting rules
## Technique Articles

- [Medium - Observability Series: A Step-by-Step Guide to Logs, Traces, and Metrics](https://medium.com/gitconnected/observability-series-a-step-by-step-guide-to-logs-traces-and-metrics-9860d7c46220)
- [Grafana - Private data source connect (PDC)](https://grafana.com/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/)

## Technology Articles

- [Medium - Grafana Alloy & OpenTelemetry](https://medium.com/@magstherdev/grafana-alloy-opentelemetry-59c171d2ebfc)
- [Medium - SLOs should be easy, say hi to Sloth](https://medium.com/itnext/slos-should-be-easy-say-hi-to-sloth-9c8a225df0d4)
- [Medium - Observability 2.0 with AWS OpenTelemetry Collector](https://medium.com/@usingsystem/observability-2-0-with-aws-opentelemetry-collector-7fef0e0e2c1c)
- [DevOps Cube - Prometheus Architecture: Complete Breakdown of Key Components](https://devopscube.com/prometheus-architecture/)
- [Medium - 6 Best Free OnCall Software in 2024, Open-Source and SaaS](https://medium.com/statuspal/6-best-free-oncall-software-in-2024-open-source-and-saas-36f82595e539)
- [Medium - 11 Automation Scripts for Prometheus Configurations.](https://medium.com/@obaff/11-automation-scripts-for-prometheus-configurations-fde7b3bf4198)
## Web Analytics

- [Plausible](https://github.com/plausible/analytics): Simple, open source, lightweight (< 1 KB) and privacy-friendly web analytics alternative to Google Analytics.
- [umami](https://github.com/umami-software/umami): Umami is a simple, fast, privacy-focused alternative to Google Analytics.
# Docker Collections

>[!info]
>The place where store and reuse `Dockerfile` and `docker-commpose` in use for monitoring cluster
## Grafana, Prometheus and Exporter

```yaml
# Author: XeusNguyen - NTMA for Anomally Detection
# Github: https://github.com/Xeus-Territory/ntma_anomaly/blob/main/Infrastructure/docker/get-data-metric-compose.yaml

version: '3'

volumes:
  prometheus_data: {}
  grafana_data: {}
  alertmanager_data: {}

networks:
  monitoring:
    external: true

services:
  prometheus:
    image: prom/prometheus:v2.37.6
    deploy:
      resources:
        limits:
          cpus: '0.50'
          memory: 500M
    container_name: prometheus
    restart: unless-stopped
    healthcheck:
      test: wget --quiet --tries=1 --spider http://localhost:9090
      interval: 30s
      timeout: 10s
      retries: 5
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - 
      - '--web.enable-lifecycle'
      - '--storage.tsdb.path=/prometheus'
    volumes:
      - prometheus_data:/prometheus
      - ./conf/monitoring/prometheus/:/etc/prometheus/
    ports:
      - 9090:9090
    labels:
      org.label-schema.group: "monitoring"
    networks:
      - "monitoring"
  
  alertmanager:
    image: prom/alertmanager:v0.25.0
    deploy:
      resources:
        limits:
          cpus: '0.10'
          memory: 100M
    container_name: alert-manager
    restart: unless-stopped
    healthcheck:
      test: wget --quiet --tries=1 --spider http://localhost:9093
      interval: 30s
      timeout: 10s
      retries: 5
    command:
      - '--config.file=/etc/alertmanager/alertmanager.yml'
      - '--storage.path=/alertmanager'
    ports:
      - 9093:9093
    volumes:
      - alertmanager_data:/alertmanager
      - ./conf/monitoring/alertmanager/:/etc/alertmanager/
    depends_on:
      - prometheus
    labels:
      org.label-schema.group: "monitoring"
    networks:
      - "monitoring"

  grafana:
    image: grafana/grafana:9.4.3
    deploy:
      resources:
        limits:
          cpus: '0.50'
          memory: 500M
    container_name: grafana
    restart: unless-stopped
    healthcheck:
      test: wget --quiet --tries=1 --spider http://localhost:3000
      interval: 30s
      timeout: 10s
      retries: 5

    ports:
      - 3000:3000
    environment:
      - GF_USERS_ALLOW_SIGN_UP=false
    volumes:
      - grafana_data:/var/lib/grafana
      - ./conf/monitoring/grafana/provisioning:/etc/grafana/provisioning
    labels:
      org.label-schema.group: "monitoring"
    networks:
      - "monitoring"

  nginxlog_exporter:
    image: quay.io/martinhelmich/prometheus-nginxlog-exporter:v1.10.0
    deploy:
      resources:
        limits:
          cpus: '0.50'
          memory: 200M
    container_name: nginxlog-exporter
    command:
      - '--config-file=/etc/prometheus-nginxlog-exporter.yml'
    ports:
      - 4040:4040
    volumes:
      - ./log/access.log:/mnt/nginxlogs/access.log
      - ./conf/nginxlog/nginxlog_exporter.yml:/etc/prometheus-nginxlog-exporter.yml
    labels:
      org.label-schema.group: "monitoring"
    networks:
      - "monitoring"
```