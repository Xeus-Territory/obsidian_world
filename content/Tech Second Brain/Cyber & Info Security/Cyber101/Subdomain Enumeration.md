---
title: Cyber101 Session 5  - Subdomain Enumeration
tags:
  - fundamentals
  - infosec
---

![[Pasted image 20240219142429 1.png]]
# Subdomain Enumeration

- **Definition:** Subdomain enumeration is the process of identifying valid subdomains for a target domain. This is a critical phase of reconnaissance because it expands the **attack surface**, revealing hidden assets or legacy systems that may contain vulnerabilities.
- **Methodologies:** Common techniques include **Bruteforcing**, **OSINT**, and **Virtual Host discovery**. For comprehensive technical resources, refer to the [0xffsec Handbook](https://0xffsec.com/handbook/information-gathering/subdomain-enumeration/) and [Zweilosec’s Web Notes](https://zweilosec.gitbook.io/hackers-rest/web/web-notes/subdomain-virtual-host-enumeration).

# OSINT - SSL/TLS Certificates

- **Mechanism:** When a Certificate Authority (CA) issues an SSL/TLS certificate for a domain, the certificate is recorded in **Certificate Transparency (CT) logs**. 
- **Purpose:** These logs are publicly accessible databases designed to prevent the use of fraudulent or accidentally issued certificates.
- **Extraction:** Pentesters can query these logs to discover subdomains that were previously unknown. Tools like [crt.sh](https://crt.sh) and the [Entrust CT Search](https://ui.ctsearch.entrust.com/ui/ctsearchui) are excellent for this purpose, with `crt.sh` being a community favorite for its simplicity and depth.

# OSINT - Search Engines (Google Dorking)

- **Strategy:** Search engines index trillions of pages, making them an invaluable resource for finding subdomains through advanced search operators, often called **Google Dorks**.
- **Example:** Using the query `-site:www.domain.com site:*.domain.com` instructs the search engine to display all indexed subdomains for `domain.com` while explicitly excluding the main `www` host. This isolates unique subdomains that may have been indexed by web crawlers.

# DNS Bruteforcing

- **Concept:** This method involves systematically querying a DNS server with a wordlist of common subdomain names (e.g., `dev`, `staging`, `api`, `vpn`) to see which ones resolve to an IP address.
- **Automation:** Because of the high volume of requests, automation is essential. Professional tools like [dnsrecon](https://www.kali.org/tools/dnsrecon/) or web-based services like [DNSDumpster](https://dnsdumpster.com/) are industry standards for executing these queries efficiently.

# OSINT - Automated Tools (Sublist3r & Subfinder)

- **Tooling:** For faster, automated reconnaissance, tools like [Sublist3r](https://github.com/aboul3la/Sublist3r) and [Subfinder](https://github.com/projectdiscovery/subfinder) are highly recommended.
- **Capabilities:** These tools aggregate results from multiple passive sources (search engines, CT logs, and DNS aggregators) and include modules for wildcard elimination. They are optimized for speed and low resource consumption, providing a consolidated list of subdomains in seconds or minutes.

# Virtual Hosts (VHosts)

- **Hidden Subdomains:** Some subdomains are not listed in public DNS records (e.g., internal development environments or admin panels). These may only exist in a private DNS or a local `hosts` file (`/etc/hosts` on Linux or `C:\Windows\System32\drivers\etc\hosts` on Windows).
- **VHost Routing:** Modern web servers often host multiple websites on a single IP address. The server uses the **HTTP Host Header** to determine which site to serve to the client.
- **Fuzzing:** By manipulating the `Host` header in an HTTP request and analyzing the server's response (looking for differences in status codes or page length), we can discover "hidden" virtual hosts.
- **Tooling:** A popular tool for this technique is [ffuf](https://github.com/ffuf/ffuf) (Fuzz Faster U Fool). By fuzzing the Host header against a wordlist, you can identify valid internal subdomains that don't appear in public DNS lookups.




