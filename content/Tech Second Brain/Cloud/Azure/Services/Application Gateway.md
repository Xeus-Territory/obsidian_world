---
title: Azure Application Gateway
tags:
  - azure
  - cloud-services
  - devops
  - admin
---
# What is Application gateway ?

![[Pasted image 20240509142644.png]]

>[!info]
>Azure Application Gateway is a load balancer for web traffic. Administrators implement an application gateway to manage traffic to their web apps. An application gateway listens for incoming traffic to web apps and checks for messages sent via protocols like HTTP. Gateway rules direct the traffic to resources in a back-end pool.

![[Pasted image 20240509143356.png]]

# Routing

Reference resource

- [Determine Azure Application Gateway routing](https://learn.microsoft.com/en-us/training/modules/configure-azure-application-gateway/3-determine-routing)

You can have some options for config your Application gateway

- Azure Application Gateway offers two primary methods for routing traffic:
    
    - **Path-based routing** sends requests with different URL paths to different pools of back-end servers.
        
    - **Multi-site routing** configures more than one web application on the same application gateway instance.
        
- You can configure your application gateway to **redirect** traffic.

	Application Gateway can redirect traffic received at one listener to another listener, or to an external site. This approach is commonly used by web apps to automatically redirect HTTP requests to communicate via HTTPS. The redirection ensures all communication between your web app and clients occurs over an encrypted path.
    
- You can implement Application Gateway to **rewrite HTTP headers**.
    
    HTTP headers allow the client and server to pass parameter information with the request or the response. In this scenario, you can translate URLs or query string parameters, and modify request and response headers. Add conditions to ensure URLs or headers are rewritten only for certain conditions.
    
- Application Gateway allows you to create custom error pages instead of displaying default error pages. You can use your own branding and layout by using a custom error page.

You have some type for routing, like 

- Path-based routing
- Multi-site routing

# Components

Reference resources

- [Configure Azure Application Gateway components](https://learn.microsoft.com/en-us/training/modules/configure-azure-application-gateway/4-app-gateway-components)

You have some components to applying with application gateway, such as

- Front-end IP 
- WAF
- Listeners
- Routing Rules
- Back-end pool
- Health probes (Create default probe wait 30s)

![[Pasted image 20240509155735.png]]

Summary and resources, you can follow in https://learn.microsoft.com/en-us/training/modules/configure-azure-application-gateway/6-summary-resources