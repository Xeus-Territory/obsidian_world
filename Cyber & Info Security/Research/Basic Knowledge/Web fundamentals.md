*This is about what should we need to getting before go to security. Find out it on some topic below and grasp for yourself something news*

## Website basic things
<img src = "https://assets.tryhackme.com/additional/how-websites-work/client%20server.png">
There are two major components that make up a website:
- Front End (Client-Side) - the way your browser renders a website.
- Back End (Server-Side) - a server that processes your request and returns a response.
### Contain in HTML

Websites are primarily created using:
- HTML, to build websites and define their structure
- CSS, to make websites look pretty by adding styling options
- JavaScript, implement complex features on pages using interactivity
### JavaScript

![[Pasted image 20240219085641.png]]
This part of website will make some cool stuff, with `javascript`, you can handle more thing ever like 
- Server route
- Request and Response handler
- Make animation, logic
- More than ever with complicated things
P/S: `Javascript` is up to the beast but use it not carefully will make you have reverse results, kind of
- Security and vulnerable
- Sensitive Data Exposure
- ...
### Sensitive Data Exposure

- Sensitive Data Exposure occurs when a website doesn't properly protect (or remove) sensitive clear-text information to the end-user; usually found in a site's frontend source code.
- Sensitive information can be potentially leveraged to further an attacker's access within different parts of a web application. For example, there could be HTML comments with temporary login credentials, and if you viewed the page's source code and found this, you could use these credentials to log in elsewhere on the application (or worse, used to access other backend components of the site)

![[Pasted image 20240219090216.png]]
### HTML Injection

- HTML Injection is a vulnerability that occurs when unfiltered user input is displayed on the page. If a website fails to sanatise user input (filter any "malicious" text that a user inputs into a website), and that input is used on the page, an attacker can inject HTML code into a vulnerable website.

- Input sanitisation is very important in keeping a website secure, as information a user inputs into a website is often used in other front-end and back-end functionality. A vulnerability you'll explore in another lab is database injection, where you can manipulate a database lookup query to log in as another user by controlling the input that's directly used in the query - but for now, let's focus on HTML injection (which is client-side).

- When a user has control of how their input is displayed, they can submit HTML (or JavaScript) code, and the browser will use it on the page, allowing the user to control the page's appearance and functionality.

<img src = "https://assets.tryhackme.com/additional/how-websites-work/html_injection.png">

## The real website in the internet
### Putting It All Together

To summarise, when you request a website, your computer needs to know the server's IP address it needs to talk to; for this, it uses `DNS`. Your computer then talks to the web server using a special set of commands called the HTTP protocol; the `web-server` then returns HTML, JavaScript, CSS, Images, etc., which your browser then uses to correctly format and display the website to you.
  
<div align="center">
	<img src = "https://static-labs.tryhackme.cloud/sites/puttingittogether/puttingitalltogether.png">
</div>

### Other Components

**Load Balancers**

![[Pasted image 20240219091219.png]]
- Easily know to that provide 2 main features to ensure high traffic can handle the load and providing a fail-over if a server becomes unresponsive
- When you request a website with a `load balancer`, which will receive your request first and then forward it to one of the multiple servers behind it
- The `load balancer` uses different algorithms to help it decide which server is best to deal with the request. A couple of examples of these algorithms are ***round-robin***, which sends it to each server in turn, or ***weighted***, which checks how many requests a server is currently dealing with and sends it to the least busy server.
- `Load balancers` also perform periodic checks with each server to ensure they are running correctly; this is called a ***health check***. If a server doesn't respond appropriately or doesn't respond, the `load balancer` will stop sending traffic until it responds appropriately again.

**CDN (Content Delivery Networks)**

![[Pasted image 20240219091032.png]]

- A `CDN` can be an excellent resource for cutting down traffic to a busy website. It allows you to host static files from your website, such a JavaScript, CSS, Images, Videos, and host them across thousands of servers all over the world.
- When a user requests one of the hosted files, the `CDN` works out where the nearest server is physically located and sends the request there instead of potentially the other side of the world.

**Databases**

![[Pasted image 20240219091704.png]]
- Often websites will need a way of storing information for their users. Web-servers can communicate with databases to store and recall data from them. 
- Databases can range from just a simple plain text file up to complex clusters of multiple servers providing speed and resilience. You'll come across some common databases: MySQL, MSSQL, MongoDB, SQLite, Postgres, and more; each has its specific features.

**WAF (Web Application Firewall)**

![[Pasted image 20240219091731.png]]
- A WAF sits between your web request and the web server; its primary purpose is to protect the web-servers from hacking or denial of service attacks.
- It analyses the web requests for common attack techniques, whether the request is from a real browser rather than a bot.
- It also checks if an excessive amount of web requests are being sent by utilising something called rate limiting, which will only allow a certain amount of requests from an IP per second. If a request is deemed a potential attack, it will be dropped and never sent to the web-servers.
## How Web servers work

**What is a Web Server?**

![[Pasted image 20240219092042.png]]
- A web server is a software that listens for incoming connections and then utilises the HTTP protocol to deliver web content to its clients. The most common web server software you'll come across is Apache, Nginx, IIS and NodeJS.
- A Web server delivers files from what's called its root directory, which is defined in the software settings. For example, Nginx and Apache share the same default location of /var/www/html in Linux operating systems, and IIS uses C:\inetpub\wwwroot for the Windows operating systems.

**Virtual Hosts**
![[Pasted image 20240219092310.png]]
- Web servers can host multiple websites with different domain names; to achieve this, they use virtual hosts.
- The web server software checks the hostname being requested from the HTTP headers and matches that against its virtual hosts (virtual hosts are just text-based configuration files). If it finds a match, the correct website will be provided. If no match is found, the default website will be provided instead.
- Virtual Hosts can have their root directory mapped to different locations on the hard drive.
- There's no limit to the number of different websites you can host on a web server.

**Static vs Dynamic Content**
- You can know the view what you see in your browser is called the front-end
- Static is target to Static Content and content never change and Dynamic Opposite
- These Changes to what you end up seeing are done in what is called the Backend with the use of Programing and Script language. Backend done behind the scene (Not view this)

**Scripting and Backend Languages**

![[Pasted image 20240219092435.png]]

## Web Protocol (HTTP/HTTPS)
*This kind is important things in the internet, the critical part which cause the fail or succeed of website, performance, dns, caching and more thing which essential did it *
  
### What is HTTP(S)?
<div align="center">
	<img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/HTTP_logo.svg/220px-HTTP_logo.svg.png">
</div>

- `HTTP` is what's used whenever you view a website, developed by **Tim Berners-Lee** and his team between 1989-1991. HTTP is the set of rules used for communicating with web servers for the transmitting of web-page data, whether that is HTML, Images, Videos, etc.
- `HTTPS` is the secure version of `HTTP`. `HTTPS` data is encrypted so it not only stops people from seeing the data you are receiving and sending, but it also gives you assurances that you're talking to the correct web server and not something impersonating it. You can find the keywords to register `HTTPS` for your website with SSL Certificate or CRT, you can know this the method to create the key and verify it on your website
### Request and Response

**What is a URL? (Uniform Resource Locator)**

>If you’ve used the internet, you’ve used a URL before. A URL is predominantly an instruction on how to access a resource on the internet. The below image shows what a URL looks like with all of its features (it does not use all features in every request).

<img src = "https://static-labs.tryhackme.cloud/sites/howhttpworks/newurl.png"><br>
- **Scheme**: This instructs on what protocol to use for accessing the resource such as HTTP, HTTPS, FTP (File Transfer Protocol).
- **User:Password**: Some services require authentication to log in, you can put a username and password into the URL to log in.
- **Host**: The domain name or IP address of the server you wish to access.
- **Port**: The Port that you are going to connect to, usually 80 for HTTP and 443 for HTTPS, but this can be hosted on any port between 1 - 65535.
- **Path**: The file name or location of the resource you are trying to access.
- **Query String**: Extra bits of information that can be sent to the requested path. For example, /blog?id=1 would tell the blog path that you wish to receive the blog article with the id of 1.
- **Fragment**: This is a reference to a location on the actual page requested. This is commonly used for pages with long content and can have a certain part of the page directly linked to it, so it is viewable to the user as soon as they access the page.
### Making a request
<div align="center">
	<img src = "https://static-labs.tryhackme.cloud/sites/howhttpworks/line.png">
</div>
Example Request:

    GET / HTTP/1.1
    Host: tryhackme.com
    User-Agent: Mozilla/5.0 Firefox/87.0
    Referer: https://tryhackme.com/

Line 1: This request is sending the GET method ( more on this in the HTTP Methods task ), request the home page with / and telling the web server we are using HTTP protocol version 1.1.

Line 2: We tell the web server we want the website tryhackme.com

Line 3: We tell the web server we are using the Firefox version 87 Browser

Line 4: We are telling the web server that the web page that referred us to this one is https://tryhackme.com

Line 5: HTTP requests always end with a blank line to inform the web server that the request has finished.

U can find more the anything else about the request in [HTTP Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)

Example Response:

    HTTP/1.1 200 OK
    Server: nginx/1.15.8
    Date: Fri, 09 Apr 2021 13:34:03 GMT
    Content-Type: text/html
    Content-Length: 98

    <html>
    <head>
        <title>TryHackMe</title>
    </head>
    <body>
        Welcome To TryHackMe.com
    </body>
    </html>

To breakdown each line of the response:

Line 1: HTTP 1.1 is the version of the HTTP protocol the server is using and then followed by the HTTP Status Code in this case "200 Ok" which tells us the request has completed successfully.

Line 2: This tells us the web server software and version number.

Line 3: The current date, time and timezone of the web server.

Line 4: The Content-Type header tells the client what sort of information is going to be sent, such as HTML, images, videos, pdf, XML.

Line 5: Content-Length tells the client how long the response is, this way we can confirm no data is missing.

Line 6: HTTP response contains a blank line to confirm the end of the HTTP response.

Lines 7-14: The information that has been requested, in this instance the homepage.
 
### HTTP Method
4 Most Request to create API (REST-CRUD): GET - POST - PUT - DELETE
- GET Request: This is used for getting information from a web server.
- POST Request: This is used for submitting data to the web server and potentially creating new records
- PUT Request: This is used for submitting data to a web server to update information
- DELETE Request: This is used for deleting information/records from a web server.
P/S: HTTP is not stopped with 4 methods above, it will include some other type. You can check it on the [documentation](https://en.wikipedia.org/wiki/HTTP)
### HTTP Status Codes
The first image is about range of a status code informing the client of the outcome of their request and also potentially how to handle it. These status codes can be broken down into 5 different ranges

![[Pasted image 20240219093157.png]]

Common HTTP Response Codes
![[Pasted image 20240219093310.png]]

## What is DNS ?
*This below resource are refer with [THM (TryHackMe)](https://tryhackme.com)*

![[Pasted image 20240219100607.png]]
- DNS (Domain Name System) provides a simple way for us to communicate with devices on the internet without remembering complex numbers.
- Every computer on the internet has its own unique address to communicate with it called an IP address.
- An IP address looks like the following 104.26.10.229, 4 sets of digits ranging from 0 - 255 separated by a period.
- DNS can help you go into website without remembering complex IP

### Domain Hierarchy

<div align="center">
	 <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--b9G6DenD--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://i.imgur.com/xOdVIPZ.png">
    <strong><em><p style="text-align: center;"><a href="https://www.google.com/url?sa=i&url=https%3A%2F%2Fdev.to%2Fblake%2Fdns-explained-hierarchy-and-architecture-18pj&psig=AOvVaw1djiJyDgb531mhnJU8-Z6Y&ust=1708398415738000&source=images&cd=vfe&opi=89978449&ved=0CBQQjhxqFwoTCKjqr5e2toQDFQAAAAAdAAAAABAR">DNS Explained. Hierarchy and Architecture - DEV Community</a></p></em></strong>
</div>
- **TLD (Top-Level Domain)**: A TLD is the most righthand part of a domain name (.com .vn .net). There are two types of TLD, gTLD (Generic Top Level) and ccTLD (Country Code Top Level Domain). And the TLD considerate about the purpose of each domain (.com: commercial, .org: organisation, etc or ccTLD .vn: vietnam). You can get a list of domains in [link](https://data.iana.org/TLD/tlds-alpha-by-domain.txt)
- **Second-Level Domain**: Taking tryhackme.com as an example, the .com part is the TLD, and tryhackme is the Second Level Domain. When registering a domain name, the second-level domain is limited to 63 characters + the TLD and can only use a-z 0-9 and hyphens (cannot start or end with hyphens or have consecutive hyphens)
- **Subdomain**:  A subdomain sits on the left-hand side of the Second-Level Domain using a period to separate it. Example you can see in lab [dnsindetail](https://tryhackme.com/room/dnsindetail)

:BoBxsRightArrow::BoBxsRightArrow: **You can knowing the construct is `https:// subdomain.Second-Level Domain .TLD`**
### Record Types 

<div align="center">
	 <img src="https://upload.wikimedia.org/wikipedia/commons/5/59/All_active_dns_record_types.png">
    <strong><em><p style="text-align: center;"><a href="https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FList_of_DNS_record_types&psig=AOvVaw0ZzFXHDlMVmlxRy2e2hFtA&ust=1708398715064000&source=images&cd=vfe&opi=89978449&ved=0CBQQjhxqFwoTCJi8mKa3toQDFQAAAAAdAAAAABAR">List of DNS record types - Wikipedia</a></p></em></strong>
</div>

- DNS isn't just for websites though, and multiple types of DNS record exist. We'll go over some of the most common ones that you're likely to come across.
- **A Record**: These records resolve to IPv4 addresses, for example 104.26.10.229
- **AAAA Record**: These records resolve to IPv6 addresses, for example 2606:4700:20::681a:be5
- **CNAME Record**: These records resolve to another domain name, for example, TryHackMe's online shop has the subdomain name store.tryhackme.com which returns a CNAME record shops.shopify.com. Another DNS request would then be made to shops.shopify.com to work out the IP address.
- **MX Record**: These records resolve to the address of the servers that handle the email for the domain you are querying, for example an MX record response for tryhackme.com would look something like alt1.aspmx.l.google.com. These records also come with a priority flag. This tells the client in which order to try the servers, this is perfect for if the main server goes down and email needs to be sent to a backup server.
- **TXT Record**: TXT records are free text fields where any text-based data can be stored. TXT records have multiple uses, but some common ones can be to list servers that have the authority to send an email on behalf of the domain (this can help in the battle against spam and spoofed email). They can also be used to verify ownership of the domain name when signing up for third party services.

### Making A Request
**What happens when you make a DNS request**

<div align="center">
	 <img src="https://miro.medium.com/v2/resize:fit:1400/1*u_AlfgDpaYdJvwoJvdGnvQ.png">
    <strong><em><p style="text-align: center;"><a href="https://www.google.com/url?sa=i&url=https%3A%2F%2Fcclements3150.medium.com%2Fwhat-happens-when-you-visit-a-web-page-e407a38db95f&psig=AOvVaw3r85usutoXRLQjihNRi4hP&ust=1708399094981000&source=images&cd=vfe&opi=89978449&ved=0CBQQjhxqFwoTCMizvtu4toQDFQAAAAAdAAAAABAa">What happens when you visit a web page. | by Carter C | Medium</a></p></em></strong>
</div>
- When you request a domain name, your computer first checks its local cache to see if you've previously looked up the address recently; if not, a request to your Recursive DNS Server will be made.
- A Recursive DNS Server is usually provided by your ISP, but you can also choose your own. This server also has a local cache of recently looked up domain names. If a result is found locally, this is sent back to your computer, and your request ends here (this is common for popular and heavily requested services such as Google, Facebook, Twitter). If the request cannot be found locally, a journey begins to find the correct answer, starting with the internet's root DNS servers.
- The root servers act as the DNS backbone of the internet; their job is to redirect you to the correct Top Level Domain Server, depending on your request. If, for example, you request www.tryhackme.com, the root server will recognise the Top Level Domain of .com and refer you to the correct TLD server that deals with .com addresses.
- The TLD server holds records for where to find the authoritative server to answer the DNS request. The authoritative server is often also known as the nameserver for the domain. For example, the name server for tryhackme.com is kip.ns.cloudflare.com and uma.ns.cloudflare.com. You'll often find multiple nameservers for a domain name to act as a backup in case one goes down.
- An authoritative DNS server is the server that is responsible for storing the DNS records for a particular domain name and where any updates to your domain name DNS records would be made. Depending on the record type, the DNS record is then sent back to the Recursive DNS Server, where a local copy will be cached for future requests and then relayed back to the original client that made the request. DNS records all come with a TTL (Time To Live) value. This value is a number represented in seconds that the response should be saved for locally until you have to look it up again. Caching saves on having to make a DNS request every time you communicate with a server.

## What cookies 
- They're just a small piece of data that is stored on your computer.
- Cookies are saved when you receive a "Set-Cookie" header from a web server.
- Then every further request you make, you'll send the cookie data back to the web server. Because HTTP is stateless (doesn't keep track of your previous requests), cookies can be used to remind the web server who you are, some personal settings for the website or whether you've been to the website before.
![[Pasted image 20240219102512.png]]

**Cookies can be used for many purposes but are most commonly used for website authentication. The cookie value won't usually be a clear-text string where you can see the password, but a token (unique secret code that isn't easily humanly guessable).**

### Viewing Your Cookies
- You can easily view what cookies your browser is sending to a website by using the developer tools, in your browser. If you're not sure how to get to the developer tools in your browser, click on the "View Site" button at the top of this task for a how-to guide.
- Once you have developer tools open, click on the "Network" tab. This tab will show you a list of all the resources your browser has requested. You can click on each one to receive a detailed breakdown of the request and response. If your browser sent a cookie, you will see these on the "Cookies" tab of the request.