---
title: NGINX and everything about it
tags:
  - nginx
  - basic-knowledge
  - devops
  - usage
  - architecture
  - tech
  - solutions
---
## Default nginx configuration

```nginx
# nginx.conf
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

```nginx
# default.conf

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

## Nginx configuration for work with upstream - load balancer

*This `nginx` configuration will contain something like*
1. upstream block: this block will hold the bunch of containers for making load balancer with multiple style
2. server block: This server block will handle your request and response. This server block will cause redirect from (HTTP) 80 to (HTTPS) 443 
```nginx
# upstream.conf
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

*This block will help you handling blue-green deployment concept which can force traffic from blue to green with zero downtime and auto reload to backup container*
```nginx
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
## Nginx configuration for work with websocket

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
