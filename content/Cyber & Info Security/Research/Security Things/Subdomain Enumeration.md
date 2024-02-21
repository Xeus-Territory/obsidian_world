---
title: Subdomain Enumeration
tags:
  - fundamentals
  - infosec
---

## About the subdomain 
- Subdomain enumeration is the process of dinding valid subdomain for a domain ==> Do this because it expand our attack surface to try and discover more potential points of vulnerability
- 3 method to subdomain enumeration such as Bruteforce, OSINT and Virtual Host. [This link](https://0xffsec.com/handbook/information-gathering/subdomain-enumeration/) and [this link](https://zweilosec.gitbook.io/hackers-rest/web/web-notes/subdomain-virtual-host-enumeration) contain lots of cool stuff about the subdomain enumeration. Yeah try the best ☕ ☕ 

## OSINT - SSL/TLS Certificates
- SSL/TLS (Secure Sockets Layer/Transport Layer Security) Certificates is created for a domain by a CA (Certificate Authority), CA's take part in what's called "Certificate Transparency (CT) logs".
- These are publicly accessible logs of every SSL/TLS certificate created for a domain name. The purpose of Certificate Transparency logs is to stop malicious and accidentally made certificates from being used.
- Use some services to exploit about the certificate with subdomains belonging to a domain, with [https://crt.sh](https://crt.sh) and [https://ui.ctsearch.entrust.com/ui/ctsearchui](https://ui.ctsearch.entrust.com/ui/ctsearchui), so i recommended use the first option, yeah idk but it looks great for me :smile: <br>
About the quiz u can do yourself with crt.sh take a look and u will get result :smiley: and a bunch something u can find like this :rocket:

## OSINT - Search Engines
- About one times again i need to reference to the google dorking or dorking engine on every browser, Search engines contain trillions of links to more than a billion websites, which can be an excellent resource for finding new subdomains.
- For example, "-site:www.domain.com site:*.domain.com" would only contain results leading to the domain name domain.com but exclude any links to www.domain.com; therefore, it shows us only subdomain names belonging to domain.com.

## DNS Bruteforce
- This common method to say the domain **"ey, give me the subdomain "** :cool:, Bruteforce DNS is method of trying tens, hundreds, thousands or even millions of different possible subdomains from a pre-defined list of commonly used subdomains.
- Because this method requires many requests, we automate it with tools to make the process quicker.
- So let find so tool cooling to do this and i sure about the [dnsrecon](https://www.kali.org/tools/dnsrecon/) or the website [https://dnsdumpster.com/](https://dnsdumpster.com/) look great for your BruteforceDNS, so there are many tools so idk much but this thing is enough for do this things. Therefore, Let't try

## OSINT - Sublist3r
- And yeah we do passive thing above and now we try some different things about tools for discover subdomain with automated with their wordlists. The cool tool like [Sublist3r](https://github.com/aboul3la/Sublist3r) and [subfinder](https://github.com/projectdiscovery/subfinder), they are Fast and powerful resolution and wildcard elimination module, Optimized for speed, very fast and lightweight on resources, ...
- And this tools do the job like go to the searchtool in internet such as google, bing, ... and find the subdomain for u and yeah it tool and need to wait for a little bit second or minute :BoBxsWinkSmile: to get result.

## Virtual Hosts
- Some subdomains aren't always hosted in publically accessible DNS results, such as development versions of a web application or administration portals. Instead, the DNS record could be kept on a private DNS server or recorded on the developer's machines in their /etc/hosts file (or c:\windows\system32\drivers\etc\hosts file for Windows users) which maps domain names to IP addresses. 
- Because web servers can host multiple websites from one server when a website is requested from a client, the server knows which website the client wants from the Host header. We can utilise this host header by making changes to it and monitoring the response to see if we've discovered a new website.
- Like with DNS Bruteforce, we can automate this process by using a wordlist of commonly used subdomains.
- Idk about this techniques much, reality this first time i try this. i see tool used for this session is [ffuf](https://github.com/ffuf/ffuf), i don;t have experience for this tool so i try do with step in tryhackme, i get something with tool like lines: 01 so i choose this with AlphaBet and i get 2 result is delta and yellow ==> Check lab tryhackme to get something cool stuff.<br>
![[Pasted image 20240219142429 1.png]]




