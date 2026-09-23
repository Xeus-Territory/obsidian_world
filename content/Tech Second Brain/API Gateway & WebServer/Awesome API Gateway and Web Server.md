---
title: Awesome API Gateway and WebServer
tags:
  - collections
  - awesome
  - cheatsheet
  - research
---

# Generals

![[thumbnail-webserver-source-gg.png]]

**Traditional - WebServing, or API**

|**Architectural Role**|**Primary Focus & Layer**|**When to Choose**|**Top Candidates & Tools**|**Key Concepts & Recommended Reading**|
|---|---|---|---|---|
|**Load Balancer**|**Layer 4 / Layer 7:** High availability, horizontal scaling, health checks, and equal traffic distribution across identical servers.|You need fault tolerance, failover, and multi-instance distribution for a single service tier.|AWS ALB/NLB, HAProxy, Cloudflare LB, F5 BIG-IP|• _L4 vs L7 Load Balancing_<br><br>  <br><br>• HAProxy Architecture Guide<br><br>  <br><br>• AWS ELB Deep Dive|
|**Reverse Proxy**|**Layer 7:** Edge protection, origin IP masking, SSL termination, static content caching, and URL rewriting.|You need to shield backend monoliths/servers, terminate TLS centrally, or cache static assets at the edge.|NGINX, Caddy, Traefik, HAProxy|• _NGINX Reverse Proxy Guide_<br><br>  <br><br>• ByteByteGo: _Reverse Proxy Basics_<br><br>  <br><br>• Cloudflare Edge Architecture|
|**API Gateway**|**Layer 7:** API governance, authentication (JWT/OAuth), rate limiting, request transformation, and microservice routing.|You need to expose diverse backend microservices to public web/mobile clients with unified security and metering.|Kong Gateway, Apache APISIX, AWS API Gateway, Envoy, Tyk, KrakenD|• _Microservices API Gateway Pattern_ (Chris Richardson)<br><br>  <br><br>• API7 APISIX Architecture Docs<br><br>  <br><br>• _Kong API Gateway Fundamentals_|

**AI Modeling in 2026, AI-Native Gateway, MCP Routers or Agentic BFFs**

|**2026 Architectural Layer**|**Core Purpose & Native Mechanics**|**Problem Solved**|**Modern Candidates & Native Tools**|
|---|---|---|---|
|**AI Gateway / LLM Proxy**|Token-aware rate limiting (TPM vs. RPS), semantic caching via vector embeddings, model fallback chains, and prompt guardrails.|Eliminates cost spikes from heavy prompts, guards against provider outages, and reduces latency from seconds to milliseconds on similar queries.|Envoy AI Gateway, Apache APISIX (AI Proxy), Gloo AI Gateway, Portkey, LiteLLM|
|**MCP Gateway (Agent Tool Proxy)**|Multiplexes Model Context Protocol (MCP) tool servers, translates SSE/JSON-RPC streams, and enforces OAuth & tool-level access policies.|Enables AI agents to dynamically discover and execute microservice tools securely without exposing direct backend network access.|Envoy MCP Gateway, APISIX MCP Bridge, Tailscale Agent Mesh|
|**Agentic BFF (Backend For Frontend)**|Coordinates bi-directional client streaming (SSE/WebSockets), UI component hydration, and agent session state.|Decouples long-lived LLM streams and non-deterministic agent loops from core client rendering code.|Next.js AI SDK Actions, FastAPI Agent BFF, GraphQL Subscriptions|
|**Resilient AI Microservices**|Wraps external model calls in strict circuit breakers and applies the Saga pattern for compensating actions when multi-step agent runs fail.|Prevents cascading system crashes when LLM providers lag or when an autonomous agent fails midway through a sequence.|Resilience4j, Temporal, Dapr, LangGraph / CrewAI|
## Repositories

- [awesome-webservers](https://github.com/imgarylai/awesome-webservers): a collection of one-liner server
- [web-servers.md](https://gist.github.com/willurd/5720255) : Each of these commands will run an ad hoc http static server in your current (or specified) directory
- [TLS Configurator](https://configurator.tlsref.org/): SSL Generation for multiple webserver 🌟 **(Recommended)**
## Documentations

- [ASGI](https://asgi.readthedocs.io/en/latest/): *Asynchronous Server Gateway Interface* is a spiritual successor to WSGI, intended to provide a standard interface between async-capable Python web servers, frameworks, and applications.
- [WSGI](https://wsgi.readthedocs.io/en/latest/): the Web Server Gateway Interface
- [Enable CORS](https://enable-cors.org/index.html): enable cross-origin resource sharing

## Articles

- [Linkedin - My ‘Opinionated’ Cloud Native Journey: Web Servers, Service Proxies, API Gateways, Service Meshes](https://www.linkedin.com/pulse/my-opinionated-cloud-native-journey-web-servers-service-castagna/) 🌟 **(Recommended)**
- [Microservice.io - Why to choose API Gateway - Architecture Design](https://microservices.io/patterns/apigateway.html) 🌟 **(Recommended)**
- [api7.ai - API Gateway vs Reverse Proxy: Differences and Use Cases](https://api7.ai/blog/api-gateway-vs-reverse-proxy)
- [Hackernoon - Choosing the Right Proxy: Forward Proxy vs. Reverse Proxy vs. API Gateway](https://hackernoon.com/choosing-the-right-proxy-forward-proxy-vs-reverse-proxy-vs-api-gateway)
- [F5 - Building Microservices: Using an API Gateway](https://www.f5.com/company/blog/nginx/building-microservices-using-an-api-gateway) 🌟 **(Recommended)**
- [AWS - Guidance for Agentic AI Operational Foundations on AWS](https://docs.aws.amazon.com/solutions/agentic-ai-operational-foundations-on-aws/) 🌟 **(Recommended)**
- [Medium - Agentic AI Gateway: The Proven Architecture Pattern for Enterprise GenAI Security and Governance](https://medium.com/vedcraft/agentic-ai-gateway-the-proven-architecture-pattern-for-enterprise-genai-security-and-governance-3abe0ca8af6a) 🌟 **(Recommended)**
## Topics

- [API Gateway](https://github.com/topics/api-gateway)
- [ASGI](https://github.com/topics/asgi)
- [Load Balancer](https://github.com/topics/load-balancer)
- [Reverse Proxy](https://github.com/topics/reverse-proxy)
- [Server](https://github.com/topics/server)
- [WSGI](https://github.com/topics/wsgi)

# Tool Collections (Curious Version 🔭)

![[thumbnail-api-gateway-collections.png]]

## API Gateway

- [Apache APISIX](https://apisix.apache.org/docs/apisix/getting-started/README/): The Cloud-Native API Gateway
- [easegress](https://github.com/easegress-io/easegress): A Cloud Native traffic orchestration system
- [Kong](https://docs.konghq.com/gateway/latest/): API gateway built for hybrid and multi-cloud, optimized for microservices and distributed architectures 🌟 **(Recommended)**
- [lura](https://github.com/luraproject/lura): Ultra performant API Gateway with middlewares
- [tyk](https://github.com/TykTechnologies/tyk): Open Source API Gateway written in Go, supporting REST, GraphQL, TCP and gRPC protocols
## WebServer

- [IIS](https://learn.microsoft.com/en-us/iis/): Window webserver
# Tool Collections

![[thumbnail-web-server.png]]

## WebServer

- [Caddy server](https://caddyserver.com/docs/): Caddy is a powerful, extensible platform to serve your sites, services, and apps, written in Go 🌟 **(Recommended)**
- [HAProxy](https://docs.haproxy.org/) : HAProxy is a free, very fast and reliable reverse-proxy offering [high availability](http://en.wikipedia.org/wiki/High_availability), [load balancing](http://en.wikipedia.org/wiki/Load_balancer), and proxying for TCP and HTTP-based applications 🌟 **(Recommended)**
- [httpd - Apache2](https://httpd.apache.org/) : The Apache HTTP Server Project is an effort to develop and maintain an open-source HTTP server for modern operating systems including UNIX and Windows.
- [Nginx](https://nginx.org/en/docs/): nginx is an HTTP and reverse proxy server, a mail proxy server, and a generic TCP/UDP proxy server. 🌟 **(Recommended - Most powerful)** 
- [Tomcat](https://github.com/apache/tomcat): an open source implementation of the JSP Specifications 🌟 **(Recommended)**
- [Traefik](https://github.com/traefik/traefik) : Traefik is an open-source Edge Router that makes publishing your services a fun and easy experience 🌟 **(Recommended)**
## ASGI & WSGI

- [gunicorn](https://gunicorn.org/): A Python WSGI HTTP Server for UNIX 🌟 **(Recommended)**
- [uvicorn](https://www.uvicorn.org/): An ASGI web server implementation for Python