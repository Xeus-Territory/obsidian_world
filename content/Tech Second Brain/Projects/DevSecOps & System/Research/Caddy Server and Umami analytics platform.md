---
title: Do self-hosted analytics platforms for you website with automatically SSL domain
tags:
  - devops
  - analytics
  - self-hosted
  - solutions
  - docker
  - research
---
>[!quote]
>Hi @all, Hope you have nice weekend. On this week, I will talk about little bit a new things what I try and applied for my wiki-site for analytics, tracking the activity on my site with `umami`. Moreover, I want to try another web-server is `caddy` instead of `nginx` - kind of similar with me, because I want to try new things 😄😄😄. Let's digest about it !!

# Umami - Opensource analytics platform

*It has been a while since this wiki was published but IDK who are interacting with my site, what is popular topic with most attention. Therefore, I decide find and applied a new analytics to knowing about the behavior people on my website and improving the topic which have most attentions*

With platform when I release this wiki is [Quartz - Jacky Zhao](https://quartz.jzhao.xyz/) - one more time I appreciate about your contribute to delivery this template to me and community 🤝🤝. On the documentation, Quartz relate about configuration to tracking, analytics this site via some platform like `Google Analytics` `Plausible` `Umami` `Goatcounter`. I mean It has a lot but choosing quick and easy is important. Therefore, I have take a look and have comparison between of them, here is result

## Google Analytics

![[Pasted image 20240324160455.png]]

>[!summary]
>Google Analytics is a web analytics service that provides statistics and basic analytical tools for search engine optimization (SEO) and marketing purposes. The service is part of the Google Marketing Platform and is available for free to anyone with a Google account.
>[Google Analytics - Wesley Chai | TechTarget Contributor](https://www.techtarget.com/searchbusinessanalytics/definition/Google-Analytics)

I don't have experience with GA, So I have read some about article to find out more about it, like

- [English - Google Analytics 4 Pros and Cons](https://www.woopra.com/google-analytics/google-analytics-pros-and-cons)
- [Vietnamese - Google Analytics là gì? Cách sử dụng Google Analytics hiệu quả](https://mona.media/cach-su-dung-google-analytics/)

>[!info]
>GA is great for basic tracking and to gain a general sense of your site's traffic. Google Analytics may fit the bill if your main focus is on what browser types, operating systems, and device types are visiting your site. In addition, they offer a free plan that has up to 20 custom non-Personally Identifiable Information (PII) properties.
>
>Adding the code to your site is relatively straightforward as well. Like many trackers, you'll add the JavaScript snippet to your site to start tracking.

![[Pasted image 20240324161929.png]]
But like I said, I want to try with new self-hosted and opensource, so maybe GA is not expectation for me. So I am not choosing the platform for analytics site, some feature I will not use and GA look like a kind of complicated
## Plausible

![[Pasted image 20240324162024.png]]

>[!summary]
>[Plausible](https://plausible.io/) is intuitive, lightweight and open source web analytics. No cookies and fully compliant with GDPR, CCPA and PECR. Made and hosted in the EU, powered by European-owned cloud infrastructure 🇪🇺
>
>New update 2024: Plausible have updated their pricing model and added a new Business plan that includes Custom Properties, Funnels (removed from Growth), Ecommerce revenue attribution

![[Pasted image 20240324162111.png]]
First sight, It look like similar site and beautiful. So I hope it will work with expectation, when I try to digest about this platform I have some conclusion

Pros:

- Open-source and privacy-friendly
- Lightweight and easy-to-use
- Real-time data
- GDPR, CCPA compliant
- Can be self-hosted

Cons:

- Contract necessary for the hosting
- Not a free tool (Growth plan starts at $9 per month for 10k monthly pageviews)
- Limited integrations

So with `Plausible` , you can self-hosted and try some cool things via this platform. One thing, I find out via Plausible - CE is `Caddy Server` which can be alternative `Nginx` - `web-server` with `ZeroSSL` and `Let's Encrypt` for automatic serve `SSL` for your host. 

You can find to [Plausible - Github](https://github.com/plausible) for know about more. With some reasonable, I do not choose this one because of `Plausible` documentation about It not good enough for me to understanding what I am doing to completely self-hosting.

From [Plausible: Self-Hosted Google Analytics alternative](https://plausible.io/self-hosted-web-analytics), It encourage smt like

>[!info]
>The easiest way to get started with Plausible is with our [official managed service in the cloud](https://plausible.io/) but if you’re happy to manage your own infrastructure, you can also self-host Plausible Community Edition (CE) on your server. Plausible CE is our “free as in beer”, self-hosted and AGPL-licensed release.

![[Pasted image 20240324164816.png]]

I meet a failure on the first step and It makes me not satisfied, so I will not waste my time. If you want to make challenge on the self-hosted `Plausible`, you will need these article for doing smt

- https://plausible.io/docs/
- https://plausible.io/docs/self-hosting-configuration
- https://github.com/plausible/community-edition/

## Umami - Last one but like the beast

![[Pasted image 20240324165021.png]]

>[!info]
>[Umami](https://umami.is/) is a simple, easy-to-use, open-source web analytics solution. It provides website owners with essential insights about their website traffic in a clean and straightforward way. It can be self-hosted and is a great alternative for those looking for privacy-friendly options.

Pros:

- Simple and clean design
- Open-source and customizable
- Privacy-focused, no cookies used
- Can be self-hosted
- Free to use

Cons:

- May require technical knowledge to set up self-hosting
- No option for event tracking
- Limited features compared to full-fledged analytics tools

![[Pasted image 20240324165440.png]]

On the first sight, I look similar like `Plausible`, color, information is easily to understanding and for sure, Umami is best self-hosted solution for your first analytics site. Some reasonable, I can list like

- `Umami` is kindly simple and do not need multiple technical integration like `Plausible` or `Google Analytics`
- It's have `Docker-compose` with easily to self-hosted with Instant image, just clone and put the connection with any database supported
- `Umami` [documentation](https://umami.is/docs) is for sure to using like open-source, not make you confusing to choose and find out.

>[!question]
>Hardest when self-hosted `umami` is the skill to working with `Docker`, `Docker-compose`, `hosting` and `server`. So I will describe basic step to reaching about the goal, but hold on let's me introduce the new web-server `Caddy` which can be easily use for multiple case instead of `Nginx`, `Apache` or `IIS`
# Caddy Server - new target web-server which can choose for alternative

## About the Caddy Server

![[Pasted image 20240324171221.png]]

>[!info]
>[Caddy](https://caddyserver.com/) is an extensible, cross-platform, open-source web server written in Go.
>
>The name "Caddy" refers both to a helper for tedious tasks, and a way to organize multiple parts into a simplified system. At its core, Caddy is an extensible platform for deploying long-running services ("apps") using a single, unified configuration that can be updated on-line with a REST API. Official Caddy distributions ship with a set of standard modules which include HTTP server, TLS automation, and PKI apps. It is best known for its automatic HTTPS features.

I am really surprise when have a first look with `Caddy`, although I have seen `Caddy` on multiple blogs and articles on Medium like

- [Roll Your Own Static Site Host on VPS with Caddy Server](https://medium.com/geekculture/roll-your-own-static-site-host-on-vps-with-caddy-server-4f653ad320d)
- [How to Use Caddy Server 2](https://medium.com/@austinw.035/how-to-use-caddy-server-2-beginner-a24747d175db)
- [Securing ShinyProxy with Caddy Server](https://medium.com/analythium/securing-shinyproxy-with-caddy-server-b08cdbc52f1c)

And now, when first time to work with `Caddy`, I am really impress which helpful of one bring back, some huge things which you can try like

- **By default**, Caddy **automatically obtains and renews TLS certificates** for all your sites
- A forward-thinking reverse proxy
- Production-grade static file server
- Flexible configuration compatible with any workflow
- Unparalleled extensibility
- 4x faster PHP apps

However, With me `Nginx` is best choice but `Caddy` can be others choose for make another suggestion, solution and whatever. Thinks about Caddy can read Nginx config like [adapter](https://caddyserver.com/docs/config-adapters), I mean It's kind crazy interesting.

![[Pasted image 20240324175506.png]]

Some about interesting article, documentation and blog about web-server technologies which you can find and deliver, `Caddy` is on the way become the huge thing
- [Caddy feature](https://caddyserver.com/features)
- [Download for Caddy](https://caddyserver.com/download)
- [Documentation for Caddy](https://caddyserver.com/docs/)
- [Comparing the best web servers: Caddy, Apache, and Nginx](https://blog.logrocket.com/comparing-best-web-servers-caddy-apache-nginx/)
- [Web And Application Servers](https://6sense.com/tech/web-and-application-servers)

## Run the first Caddy Server

With Caddy, you can try multiple way to configuration via adapter, API but `Caddyfile` is most of thing can me and you impressed. It's `JSON` format, you simply put your domain and free SSL can serve for your service 🥶🥶🥶

For easily use Caddy, you can try Caddyfile for the first optional with feel step, you will have a static website with SSL like what you want

- Caddy is work on `Docker` or `Binary`, use can try one on solution but `Docker` is kind simple and easily usage. With docker, you can find Caddy on the [Dockerhub](https://hub.docker.com/_/caddy)

```bash
docker run -d --name caddy --rm -p 80:80 -p 443:443 -p 2019:2019 caddy 
```

- With some optional and warning which I want to prefer. Remember, when you want to `SSL` work **make sure** port `443` can reach from domain to hit with your `Caddy`

>[!warning]
>Example: If you set up on `homelab`, maybe some routers or ISP modems can't enable port `443`, The problem will raise in here when you run server caddy). On this situation, You must change `https_port` and `http_port` to another if meet some mistake. IDK why It occurs 🤔 or maybe I am wrong. Just for sure

If you run the command above, hit your browser with `localhost` to see what `Caddy` response

![[Pasted image 20240324212324.png]]

>[!info]
>That is list of things about what you need to do for serve your site over HTTPS with Caddy Server. Give an applause for super friendly from this one !! 😃😃😃

# Combine Caddy with Umami for serve your analytics platform with SSL

![[Pasted image 20240324213109.png]]

>[!question]
>This part, I will show you how we can connect `Umami` and `Caddy` to each othes for making the secure analytics platforms. Probably, you just pleasure when put the `password` or `credentials` in `SSL` site instead not site 😅 

## Prepare server or VPS

Like I talk about, you may need `VPS` for working in situation or maybe your `443` can work in `homelab` and you not need. Whatever, so try best `VPS` or hosting some where can use both `80` and `443`

On my situation, I will use Azure VM with `Ubuntu OS` . For make sure anything work, you need at least VM stats like

- `1 - 2` vCPU
- `1 ~ 2 GB` Memory
- `>= 5 GB` Storage

Next, you need configure the firewall of cloud like `Security Group` with `AWS` or `Network Security Group` with `Azure` for port open, including

- 80 (HTTP)
- 443 (HTTPS)
- 22 (SSH)
- 6996 (Wild Port) - This purpose if you want your domain that set on this port

After book your VPS, next step you need run this script for setting up environment for run compose

```bash
sudo apt update && sudo apt install docker.io docker-compose -y
sudo usermod -aG docker $USER
sudo systemctl enable docker
sudo chmod 666 /var/run/docker.sock
```

When you run all of command above, make sure your `Docker daemon` work with command

```bash
~ ⌚ 21:42:08
$ docker ps
CONTAINER ID   IMAGE     COMMAND        CREATED          STATUS          PORTS            
```

## Prepare your host and point it to public ip

When you book your `VPS`, most of cloud will return your `Public IP` with IPv4 or IPv6. You need to find them and copy that for pointing to your DNS server like

- With `IPv4`, you need match that domain type `A`
- With `IPv6`, you need match that domain type `AAAA`
- With `VPS - DNS` like `AWS` cloud, You need match that domain type `CNAME`

For example, If I have a `Public IPv4` 69.96.69.96 and subdomain `havefun.fun4fun.io`, just choose type `A` domain and point that for `IPv4`. You can read them in [[Web fundamentals |Basic things about internet and networking]]

## Run the compose and get the result

On this step, you need to work with `docker-compose`. For sure, you need to check `docker-compose` on your host with `docker-compose --version`

```bash
~ ⌚ 21:42:10
$ docker-compose --version
docker-compose version 1.29.2, build unknown
```

You can reach to [my repository](https://github.com/Xeus-Territory/obsidian_world/tree/main/analytics), take a look `docker-compose.yaml` file and copy them to your `VPS` shell

```yaml title="docker-compose.yaml"
---
version: '3'
services:
  umami:
    image: ghcr.io/umami-software/umami:postgresql-latest
    env_file:
      - ./.env.umami.examples
    depends_on:
      db:
        condition: service_healthy
    restart: always
    healthcheck:
      test: ["CMD-SHELL", "curl http://localhost:3000/api/heartbeat"]
      interval: 5s
      timeout: 5s
      retries: 5
  db:
    image: postgres:14-alpine
    env_file:
      - ./.env.db.examples
    volumes:
      - umami-db-data:/var/lib/postgresql/data
    restart: always
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}"]
      interval: 5s
      timeout: 5s
      retries: 5
  proxy:
    image: caddy:latest
    ports:
      - 80:80
      - 443:443
    volumes:
      - caddy-data:/data
      - ./Caddyfile:/etc/caddy/Caddyfile
    depends_on:
      umami:
        condition: service_healthy
    restart: always
volumes:
  umami-db-data:
  caddy-data:
```

**NOTICE**L: For running this file, you need provide them two `.env` file including `.env.db.examples` and `.env.umami.examples`

```env title=".env.umami.examples"
DATABASE_URL=postgresql://<db-user>:<db-pass>@<db-host>:5432/umami
DATABASE_TYPE=postgresql # Choose the database type (# Default: Postgres)
APP_SECRET=RANDOM_STRING
```

```env title=".env.db.examples"
POSTGRES_DB=umami
POSTGRES_USER=<db-user>
POSTGRES_PASSWORD=<db-password>
```

After change what the identity of umami and db, prepare the `Caddyfile` which doing for your next step, change `$DOMAIN` to your self domain which point your `VPS` like `havefun.fun4fun.io` 

```json title="Caddyfile"
https://havefun.fun4fun.io {
        reverse_proxy umami:3000
}
```

Run the `docker-compose` and get the result

```bash
docker-compose -f docker-compose.yaml -p analytics up -d
```

Access your browser with domain `https://havefun.fun4fun.io` and your umami come up 
![[Pasted image 20240324220803.png]]

Your first start, default account is `admin` and password is`umami`

## Setup your site traffic reach to umami

I am not actually programing my site, I just reuse a template and It offer `umami` like plugin for traffic analysis. But usually, If you want set your analytics on your site, just need include the `<script>` for running specify things to analytics platform. Like `umami`, you can find `/script.js` on `umami`. To digest about that, take a look helpful video to understanding more
- [How to set up your own website analytics with Umami? | Open Source | Self Hosted](https://www.youtube.com/watch?v=_cettsM08XE&ab_channel=MaxProgramming)
- [Adding self-hosted analytics to your website for free with Umami](https://dev.to/mathewthe2/adding-self-hosted-analytics-to-your-website-for-free-with-umami-37k2)

# Conclusion
![[Pasted image 20240324222432.png]]

>[!summary]
>That's all for today, I hope you can figure out what things you need to do on making own analytics platform for you project. That project is quite fun and cost minimum time to set up, just couple minutes and you have basic analytics with `SSL`
>
>On this blog, `Caddy server` is factor which I want to prefer which multiple time with powerful, one-line setup, auto SSL. How cool thing is it 😏😏😏

>[!info]
>Appreciate to know `umami` and `caddy`, that is making this game to easily and more effective. Thanks for all contributing from [umami](https://github.com/umami-software) and [caddy](https://github.com/caddyserver). Stay safe, research, humble and I will see you on next things. Bye Bye 🏳️🏳️🏳️

