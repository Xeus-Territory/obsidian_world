---
title: Awesome NGINX
tags:
  - nginx
  - basic-knowledge
  - devops
  - usage
  - architecture
  - webserver
  - awesome
---

![[nginx.png]]
# Awesome Repository

- [awesome-nginx](https://github.com/agile6v/awesome-nginx) : A curated list of awesome Nginx distributions, 3rd party modules, Active developers, etc.
# Articles

- [Medium - Nginx Configuration File Explanation and Common Feature Configurations (90% Practical Use Rate)](https://medium.com/@cstoppgmr/nginx-configuration-file-explanation-and-common-feature-configurations-90-practical-use-rate-bc49271f3766) 🌟 **(Recommended)**
- [[Create Free SSL with Let's Encrypt and Certbot|Myself - Create Free SSL with Let's Encrypt and Certbot]]
- [Blog - Nginx high availability through Keepalived – Virtual IP](https://www.chakray.com/nginx-high-availability-through-keepalived-virtual-ip/)
- [Nginx Docs - High Availability Support for NGINX Plus in On-Premises Deployments](https://docs.nginx.com/nginx/admin-guide/high-availability/ha-keepalived/) 🌟 **(Recommended)**
- [Medium - Linux Load Balancing: Advanced Techniques](https://medium.com/@erencuysal/linux-load-balancing-advanced-techniques-f8266b67d177) 🌟 **(Recommended)**
# Nginx Configuration
## Default

```nginx title="nginx.conf"
user nginx;
worker_processes auto;

error_log /var/log/nginx/error.log notice;
pid /var/run/nginx.pid;


events {
    worker_connections 1024;
}


http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    open_file_cache max=2000 inactive=20s;
    open_file_cache_valid 60s;
    open_file_cache_min_uses 5;
    open_file_cache_errors off;
    client_max_body_size 10M;

    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
    '$status $body_bytes_sent "$http_referer" '
    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    sendfile on;

    keepalive_timeout 65;


    include /etc/nginx/conf.d/*.conf;
}
```

```nginx title="conf.d/default.conf"
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```

## Upstream for load balancer

>[!info]
>*This `nginx` configuration will contain something like*
>1. upstream block: this block will hold the bunch of containers for making load balancer with multiple style
>2. server block: This server block will handle your request and response. This server block will cause redirect from (HTTP) 80 to (HTTPS) 443

```nginx title="conf.d/upstream.conf"
# LB for backend containers
upstream backend {
    server {{ be.name_origin_replica_backend }}:{{ be.port_origin_replica_backend }};
}

# LB for frontend containers
upstream frontend {
    server {{ fe.name_origin_replica_frontend }}:{{ fe.port_origin_replica_frontend }};
}

# This server block for purpose redirect from HTTP to HTTPS
server {
    if ($host = {{ ssl.app_server_name }}) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = {{ ssl.monitoring_server_name }}) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    server_name {{ ssl.app_server_name }} {{ ssl.monitoring_server_name }};
    return 404; # managed by Certbot

}

# This server block for purpose process the route traffic
server {
    listen 443 ssl;  # managed by Certbot
    server_name {{ ssl.app_server_name }};

    ssl_certificate /etc/letsencrypt/live/{{ ssl.monitoring_server_name }}/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/{{ ssl.monitoring_server_name }}/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

    # This configurable server block bot scanning via some browser
    location = /robots.txt { return 200 "User-agent: *\nDisallow: /\n"; }
    
    location / {
        proxy_set_header X-Real-IP $remote_addr;

        # Header for helping resolivng the server to work with another protocol. (e.g "wss:// ws://" (grpc will have another header))
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;

        if ($host != {{ ssl.app_server_name }}) {
            return 444;
        }

        if ($request_uri ~ ^/(api|auth|openapi)) {
            proxy_pass http://backend$request_uri;
        }

        if ($request_uri !~ ^/(api|auth|openapi)) {
            proxy_pass http://frontend$request_uri;
        }
    }
}
```
## Zero Downtime Basic Upstream SSL

>[!info]
>*This block will help you handling blue-green deployment concept which can force traffic from blue to green with zero downtime and auto reload to backup container*

```nginx title="conf.d/upstream-0downtime.conf"
# LB for backend containers
upstream backend {
    server {{ be.name_origin_replica_backend }}:{{ be.port_origin_replica_backend }} max_fails=2 fail_timeout=3;
    server {{ be.name_new_replica_backend }}:{{ be.port_new_replica_backend }} backup;
}

# LB for frontend containers
upstream frontend {
    server {{ fe.name_origin_replica_frontend }}:{{ fe.port_origin_replica_frontend }};
}

# This server block for purpose redirect from HTTP to HTTPS
server {
    if ($host = {{ ssl.app_server_name }}) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = {{ ssl.monitoring_server_name }}) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    server_name {{ ssl.app_server_name }} {{ ssl.monitoring_server_name }};
    return 404; # managed by Certbot

}

# This server block for purpose process the route traffic
server {
    listen 443 ssl;  # managed by Certbot
    server_name {{ ssl.app_server_name }};

    ssl_certificate /etc/letsencrypt/live/{{ ssl.monitoring_server_name }}/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/{{ ssl.monitoring_server_name }}/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

    location / {
        proxy_set_header X-Real-IP $remote_addr;

        if ($host != {{ ssl.app_server_name }}) {
            return 444;
        }

        if ($request_uri ~ ^/(api|auth|openapi)) {
            proxy_pass http://backend$request_uri;
        }

        if ($request_uri !~ ^/(api|auth|openapi)) {
            proxy_pass http://frontend$request_uri;
        }
    }
}
```
## Work with websocket

- As you can see the backend have create some connections via `websocket` protocol and anything requested via `nginx-server`, so it need to be configured for resolved this one connection
- All configuration can reference via article: [NGINX as a WebSocket Proxy](https://www.nginx.com/blog/websocket-nginx/). So we can sum up the configuration for adding to nginx including
 
```nginx
http{
  # Setting up for nginx resolivng websocket to the backend
  map $http_upgrade $connection_upgrade {
      default upgrade;
      '' close;

  <some_another_configuration>

  server {
        location "/" {
          # Header for helping resolivng the server to work with another protocol. (e.g "wss:// ws://" (grpc will have another header))
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection $connection_upgrade;

          <some_another_configuration>      
        }
	  }
  }
}
```

## Nginx Template Portainer for Ansible

>[!summary]
>Ansible Playbooks Template is used config for Nginx work with Portainer

```nginx title="monitoring.conf.j2"
# This block server for purpose route traffic to monitoring route
server {
    listen 443 ssl; # managed by Certbot
    server_name {{ ssl.monitoring_server_name }};

    ssl_certificate /etc/letsencrypt/live/{{ ssl.monitoring_server_name }}/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/{{ ssl.monitoring_server_name }}/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

   location / {
        proxy_set_header X-Real-IP $remote_addr;
        
        if ($host != {{ ssl.monitoring_server_name }}) {
            return 444;
        }

	    proxy_pass https://{{ monitoring.name_origin_replica_monitoring }}:{{ monitoring.port_origin_replica_monitoring }};
    }

# This part can help you access container via nginx with websocket
    location /api/websocket/ {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_http_version 1.1;
        proxy_pass https://{{ monitoring.name_origin_replica_monitoring }}:{{ monitoring.port_origin_replica_monitoring }}/api/websocket/;
    }
}
```

## Enable Basic Authentication

If your application doesn't implement authentication method for accessing your platform, you can use `basic_auth` method of Nginx for instead to secure connection temporarily. Explore at: [Nginx - Restricting Access with HTTP Basic Authentication](https://docs.nginx.com/nginx/admin-guide/security-controls/configuring-http-basic-authentication/)

First of all, to enable basic_auth, you need define the user/pass file for let nginx can decrypt and understand your access. Following the documentation and several, you can use couple tools to create `.htpasswd`, such as

- `apache2-utils` and `httpd-tools`  🌟 **(Recommended)**
- `openssl`

What option is your own decision, so I will take `apache2-utils` for easier approach but not instant on your host or you can use `openssl` for built-in in Ubuntu. By usual, I choose docker to run `htpasswd` command

```bash
docker run -it --name httpd --rm --workdir /root httpd:2.4 -d /bin/bash
```

Generate the password

```bash
htpasswd -c .htpasswd <user-name>
```

Prompting password and you will have `.htpasswd` file in current directory. Now copy the file to where you setup `nginx`, e.g: I have `nginx` at `/etc/nginx`

```bash
docker cp httpd:/root/.htpasswd ./etc/nginx/
```

Alright, you can end `httpd` container and configure nginx with configuration like

```bash title="/etc/nginx/conf.d/default.conf"
...
...
location /api {
    auth_basic           "Administrator’s Area";
    auth_basic_user_file /etc/nginx/.htpasswd;
}
...
...
```

>[!done]
>Now when you access to `nginx` at route `/api`, you will ask for `basic-auth`
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


