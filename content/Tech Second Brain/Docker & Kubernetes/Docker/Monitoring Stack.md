---
title: Collection Dockerfile and Docker Compose of Monitoring Stack
tags:
  - monitoring
  - docker
  - usage
  - helpful
---
>[!info]
>The place where store and reuse `Dockerfile` and `docker-commpose` in use for monitoring cluster
# Docker Compose

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