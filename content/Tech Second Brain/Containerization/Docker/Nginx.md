---
title: Collection Dockerfile and Docker compose Nginx
tags:
  - nginx
  - docker
  - usage
  - helpful
---
# Dockerfile

## Nginx with `ModSecurity`, and `Lua` module

You can clone this from my registry, with command

```bash
# With Luascript and Modsecurity
docker pull xeusnguyen/nginx-1.23.4:allinone

# With only ModSecurity
docker pull xeusnguyen/nginx-1.23.4:modsecurity
```

```dockerfile
# Provides the env for building the addon for nginx
FROM debian:bullseye-slim AS builder

# Configuration NGINX-Version to Environment
ENV NGINX_VERSION=1.23.4
ENV LUAJIT2_VERSION=2.1-20230410
ENV NGINX_DEV_KIT_VERSION=0.3.1
ENV LUA_NGINX_MODULE_VERSION=0.10.24
ENV STREAM_LUA_NGINX_MODULE_VERSION=0.0.13
ENV LUA_RESTY_CORE_VERSION=0.1.26
ENV LUA_RESTY_LRUCACHE_VERSION=0.13
ENV LUA_RESTY_HMAC_VERSION=0.06-1

# Update requirements package for os
RUN apt update && \
    apt install -y \
    build-essential curl git \
    libpcre++-dev zlib1g-dev \
    libtool autoconf \
    libssl-dev libxml2-dev \
    libgeoip-dev liblmdb-dev \
    libyajl-dev libcurl4-openssl-dev \
    libpcre3-dev pkgconf libxslt1-dev \
    libgd-dev automake


# Download and uncompress nginx packages
RUN curl http://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz -o /tmp/nginx-${NGINX_VERSION}.tar.gz && \
    tar -xvzf /tmp/nginx-${NGINX_VERSION}.tar.gz --directory /tmp/

# Download and configure modesecurity package
RUN git clone --depth 100 -b v3/master --single-branch https://github.com/SpiderLabs/ModSecurity /tmp/ModSecurity && \
    cd /tmp/ModSecurity && \
    git submodule init && \
    git submodule update  && \
    sh build.sh && \
    ./configure && \
    make && \ 
    make install && \
    cd /

# Download and run configuration build module for nginx with modsecurity
RUN git clone https://github.com/SpiderLabs/ModSecurity-nginx /tmp/ModSecurity-nginx && \
    cd /tmp/nginx-${NGINX_VERSION} && \
    ./configure --with-compat --with-openssl=/usr/include/openssl/ --add-dynamic-module=/tmp/ModSecurity-nginx && \
    make modules && \
    rm -rf Makefile /objs/Makefile

# # Download and configurartion build module for nginx with ngx_dynamic_upstream
# RUN git clone https://github.com/cubicdaiya/ngx_dynamic_upstream.git /tmp/ngx_dynamic_upstream && \
#     cd /tmp/nginx-${NGINX_VERSION} && \
#     ./configure --add-dynamic-module=/tmp/ngx_dynamic_upstream && \
#     make modules

# Download and configuration build module for lua-nginx-module (All modules below will be required for this step) 
# Change the version of nginx can be make available - refer: @https://github.com/openresty/lua-nginx-module#nginx-compatibility
# for more infomation - require 1.19.x or may be install dynamic module with suitable version 
RUN curl -L https://github.com/openresty/luajit2/archive/v${LUAJIT2_VERSION}.tar.gz -o /tmp/luajit2-v${LUAJIT2_VERSION}.tar.gz && \
    curl -L https://github.com/simplresty/ngx_devel_kit/archive/v${NGINX_DEV_KIT_VERSION}.tar.gz -o /tmp/ngx_devel_kit-v${NGINX_DEV_KIT_VERSION}.tar.gz  && \
    curl -L https://github.com/openresty/lua-nginx-module/archive/v${LUA_NGINX_MODULE_VERSION}.tar.gz -o /tmp/lua-nginx-module-v${LUA_NGINX_MODULE_VERSION}.tar.gz && \
    curl -L https://github.com/openresty/stream-lua-nginx-module/archive/refs/tags/v${STREAM_LUA_NGINX_MODULE_VERSION}.tar.gz -o /tmp/stream-lua-nginx-module-v${STREAM_LUA_NGINX_MODULE_VERSION}.tar.gz && \
    curl -L https://github.com/openresty/lua-resty-core/archive/v${LUA_RESTY_CORE_VERSION}.tar.gz -o /tmp/lua-resty-core-v${LUA_RESTY_CORE_VERSION}.tar.gz && \
    curl -L https://github.com/openresty/lua-resty-lrucache/archive/v${LUA_RESTY_LRUCACHE_VERSION}.tar.gz -o /tmp/lua-resty-lrucache-v${LUA_RESTY_LRUCACHE_VERSION}.tar.gz && \
    curl -L https://github.com/jkeys089/lua-resty-hmac/archive/refs/tags/${LUA_RESTY_HMAC_VERSION}.tar.gz -o /tmp/lua-resty-hmac-${LUA_RESTY_HMAC_VERSION}.tar.gz && \
    tar -xzf /tmp/luajit2-v${LUAJIT2_VERSION}.tar.gz --directory /tmp/ && \
    tar -xzf /tmp/ngx_devel_kit-v${NGINX_DEV_KIT_VERSION}.tar.gz --directory /tmp && \
    tar -xzf /tmp/lua-nginx-module-v${LUA_NGINX_MODULE_VERSION}.tar.gz --directory /tmp && \
    tar -xzf /tmp/stream-lua-nginx-module-v${STREAM_LUA_NGINX_MODULE_VERSION}.tar.gz --directory /tmp && \
    tar -xzf /tmp/lua-resty-core-v${LUA_RESTY_CORE_VERSION}.tar.gz --directory /tmp && \
    tar -xzf /tmp/lua-resty-lrucache-v${LUA_RESTY_LRUCACHE_VERSION}.tar.gz --directory /tmp && \
    tar -xzf /tmp/lua-resty-hmac-${LUA_RESTY_HMAC_VERSION}.tar.gz --directory /tmp 

# Compile the LUAJIT module
RUN cd /tmp/luajit2-${LUAJIT2_VERSION} && \
    make && make install

# Export the location of LUAJIT LIB
ENV LUAJIT_LIB=/usr/local/lib
ENV LUAJIT_INC=/usr/local/include/luajit-2.1

# Install require package include
RUN cd /tmp/lua-resty-core-${LUA_RESTY_CORE_VERSION} && \
    make install

RUN cd /tmp/lua-resty-lrucache-${LUA_RESTY_LRUCACHE_VERSION} && \
    make install

RUN cd /tmp/lua-resty-hmac-${LUA_RESTY_HMAC_VERSION} && \
    make install

# Compile NGINX with LUAJIT to build ndk (nginx-development-kit) and lua-nginx-module
RUN cd /tmp/nginx-${NGINX_VERSION} && \
    ./configure --with-compat --with-stream --with-openssl=/usr/include/openssl/ --with-ld-opt="-Wl,-rpath,/usr/local/lib" --with-pcre --with-ld-opt='-lpcre' \
    --add-dynamic-module=/tmp/ngx_devel_kit-${NGINX_DEV_KIT_VERSION} --add-dynamic-module=/tmp/lua-nginx-module-${LUA_NGINX_MODULE_VERSION} \
    --add-dynamic-module=/tmp/stream-lua-nginx-module-${STREAM_LUA_NGINX_MODULE_VERSION} && \
    make modules && \
    rm -rf Makefile /objs/Makefile

FROM nginx:1.23.4

ENV LD_LIBRARY_PATH=/usr/local/lib
ENV LUAJIT_LIB=/usr/local/lib
ENV LUAJIT_INC=/usr/local/include/luajit-2.1
ENV NGINX_VERSION=1.23.4

# Copy the module mod-security compile for
COPY --from=builder /tmp/nginx-${NGINX_VERSION}/objs/ngx_http_modsecurity_module.so /etc/nginx/modules

# Copy the module include for lua-nginx-module, component relative to the module fron builder into nginx
COPY --from=builder /tmp/nginx-${NGINX_VERSION}/objs/ndk_http_module.so /etc/nginx/modules
COPY --from=builder /tmp/nginx-${NGINX_VERSION}/objs/ngx_http_lua_module.so /etc/nginx/modules
COPY --from=builder /tmp/nginx-${NGINX_VERSION}/objs/ngx_stream_lua_module.so /etc/nginx/modules
COPY --from=builder /usr/local/include/luajit-2.1 /usr/local/include/luajit-2.1
COPY --from=builder /usr/local/bin  /usr/local/bin
COPY --from=builder /usr/local/lib  /usr/local/lib
COPY --from=builder /usr/local/openresty/lualib/resty /usr/local/lib/lua/resty/

# COPY the module modsecurity from builder into nginx 
# RUN mkdir -p /usr/local/modsecurity
COPY --from=builder /usr/local/modsecurity /usr/local/modsecurity

# Create a directory for including the modules ModSecurity
RUN mkdir /etc/nginx/modsec

# Copy the init for mod-security module
COPY --from=builder /tmp/ModSecurity/unicode.mapping /etc/nginx/modsec
COPY --from=builder /tmp/ModSecurity/modsecurity.conf-recommended etc/nginx/modsec/modsecurity.conf

# # The Module is not valid for nginx-version - outdate and deprecation - 
# # should using 1.11.0 version like Makefile https://github.com/cubicdaiya/ngx_dynamic_upstream
# COPY --from=builder /tmp/nginx-${NGINX_VERSION}/objs/ngx_dynamic_upstream_module.so /etc/nginx/modules

# Install package dependecy
RUN apt update && \
    apt install -y \
    build-essential curl git \
    libpcre++-dev zlib1g-dev \
    libtool autoconf \
    libssl-dev libxml2-dev \
    libgeoip-dev liblmdb-dev \
    libyajl-dev libcurl4-openssl-dev \
    libpcre3-dev pkgconf libxslt1-dev \
    libgd-dev automake \
    nano


# Install OWASP CRS from github
RUN curl -L  https://github.com/SpiderLabs/owasp-modsecurity-crs/archive/v3.2.0.tar.gz -o /tmp/mod-security.tar.gz && \
    tar -xzf /tmp/mod-security.tar.gz -C /tmp/ && \
    mkdir -p /etc/nginx/modsec/owasp-modsecurity-crs && \
    mv /tmp/owasp-modsecurity-crs-3.2.0 /etc/nginx/modsec/owasp-modsecurity-crs && \
    mv /etc/nginx/modsec/owasp-modsecurity-crs/owasp-modsecurity-crs-3.2.0/crs-setup.conf.example \
       /etc/nginx/modsec/owasp-modsecurity-crs/owasp-modsecurity-crs-3.2.0/crs-setup.conf && \
    mv /etc/nginx/modsec/owasp-modsecurity-crs/owasp-modsecurity-crs-3.2.0/rules/REQUEST-900-EXCLUSION-RULES-BEFORE-CRS.conf.example \
       /etc/nginx/modsec/owasp-modsecurity-crs/owasp-modsecurity-crs-3.2.0/rules/REQUEST-900-EXCLUSION-RULES-BEFORE-CRS.conf

# COPY an external file into nginx via binding mod for setup modsecurity

COPY conf/nginx/modsecurity.conf /etc/nginx/modsec

COPY conf/nginx/main.conf /etc/nginx/modsec

# COPY conf/nginx/nginx.conf /etc/nginx/nginx.conf

# COPY conf/nginx/nginx-default.conf /etc/nginx/conf.d/default.conf
```

# Docker Compose

## Nginx with `exporter`, `modsecurity` and `ddos` protection

>[!info]
>The compose use for `docker swarm` in stack, so some key will not work but it can bypass with no problems

```yaml
version: "3"

networks:
  application:
    external: true

services:
  server:
    image: xeusnguyen/nginx-1.23.4:allinone
    ports:
      - 80:80
    deploy:
      resources:
        limits:
          cpus: "0.5"
          memory: 500M
      placement:
        constraints:
          - "node.role==manager"
    healthcheck:
      test: "service nginx status || exit 1"
      interval: 30s
      timeout: 10s
      retries: 5
    networks:
      - application
    volumes:
      - ./log/access.log:/var/log/nginx/access_server.log
      - ./log/error.log:/var/log/nginx/error_server.log
      - ./log/modsec_audit.log:/var/log/nginx/modsec_audit.log
      - ./conf/nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./conf/nginx/nginx-default.conf:/etc/nginx/conf.d/default.conf
      - ./conf/nginx/ddos.conf:/etc/nginx/waf/ddos.conf
      - ./conf/nginx/anti_ddos_challenge.lua:/etc/nginx/lua/anti_ddos_challenge.lua

  nginx_exporter:
    image: nginx/nginx-prometheus-exporter:0.10.0
    deploy:
      replicas: 1
      resources:
        limits:
          cpus: '0.1'
          memory: 200M
      placement:
        constraints:
          - "node.role==manager"
    command:
      - '-nginx.scrape-uri=http://server/nginx_status'
    ports:
      - 9113:9113
    labels:
      org.label-schema.group: "monitoring"
    networks:
      - application    
    depends_on:
      - server
```


