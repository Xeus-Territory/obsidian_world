---
title: Network traffic monitoring and analysis for anomalies detection and auto-scaling
tags:
  - DIY
  - solutions
  - devops
  - infosec
  - architecture
  - docker
---
# Why was it gonna released ?

![[Pasted image 20240324111622.png]]
<div align="center">
    <strong><em><p style="text-align: center;">NTMA - Project Infrastructure</p></em></strong>
</div>

>[!quote]
>Hi @all, About releasing documentation for final university project, I want to hold this on hand in little bit time but I think It could helped another, therefore, When I contribute and hope It can help you and make solution on near future !!! LOL. Give it a new reason for why it existed

>[!info]
>Whole project is creature by [@me](https://github.com/Xeus-Territory) and [@markpage2k1](https://github.com/MarkPage2k1). This is opensource, experimental and not have limited, you can clone and continue progress to make it more effective, helpful.

# Purpose and components of Project
## Purpose

- Purpose of project is about make the idealy about the **HA (High Available)** system combine `DevOps` with **automation management** and `AI` for **intelligence action**.
- Follow this way, you can be **detected anomaly in network traffic** by monitoring and analysis through `log` & `metrics` for deciding to make decision **about automatic scaling by horizontal** for demand anything work with **low latency at least**
- Combine AI for anomaly detection can **make the system to becoming flexible** with data and can be **dynamically scale with flex metric** not like using basic metrics or log.
- Featured can be offer for **detection `Dos/DDos`, `High Traffic Usage Detection`, `OWASP Vulnerable Attack`, ...**
- Malware working in system. (Develop in the future !!!)

## Components

- Infrastructure: Use `Docker-Swarm`, Orchestration platform like Kubernetes but manually and basic. With `Docker-Swarm`, You can learn some technical like `nginx`, `kafka pub-coms`, `Grafana`, `Prometheus`, `Swarm Visualizer`. Digest it on [this link](https://github.com/Xeus-Territory/wouops/blob/main/ntma_anomaly/Infrastructure)
- Script: Use `Python` & `Bash` to handling multiple task about manage `Swarm Cluster`, do `Service Discovery SD`, create a `web-hook` for interacting cluster and `auto-scaling` or maybe you can find `load-testing` with customize `bot` using `apache2 - ab`. Digest it on [this link](https://github.com/Xeus-Territory/wouops/tree/main/ntma_anomaly/Script)
- ML-AI: Use the models `LSTM` `Kmeans` for boost the speed and performance to detecting the `web-app vulnerables` ,` high traffic for scaling`. Digest it on [this link](https://github.com/Xeus-Territory/wouops/tree/main/ntma_anomaly/ML-AI)

# Documentations

- [Vietnamese - Slide Presentation](https://docs.google.com/presentation/d/1I-RfgcjXt-FyBgX3MHNZblPM7KOjNpbMN8yBxFS9Vak/edit?usp=sharing)
- [Vietnamese - Final Thesis Documentation](https://drive.google.com/file/d/1_0djB08AyeABBi4z7rPoeQSEwUgHxP3H/view?usp=sharing)
- [Github Repo](https://github.com/Xeus-Territory/wouops/tree/main/ntma_anomaly)