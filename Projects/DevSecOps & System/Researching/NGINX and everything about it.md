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
