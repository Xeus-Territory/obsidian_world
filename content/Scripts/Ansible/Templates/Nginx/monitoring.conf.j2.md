---
title: monitoring.conf.j2
tags:
  - ansible
  - ansible-templates
  - nginx
---
```nginx
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
