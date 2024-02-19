---

---
## OSWAP Top 10 

![[Pasted image 20240219122648.png]]
### Definition: 
- The Open Web Application Security Project (OWASP) is a nonprofit foundation dedicated to improving software security.
- It operates under an “open community” model, which means that anyone can participate in and contribute to OWASP-related online chats, projects, and more.
- For everything from online tools and videos to forums and events, the OWASP ensures that its offerings remain free and easily accessible through its website.
- The OWASP Top 10 provides rankings of—and remediation guidance for—the top 10 most critical web application security risks.
- Risks are ranked according to the frequency of discovered security defects, the severity of the uncovered vulnerabilities, and the magnitude of their potential impacts.
- The purpose of the report is to offer developers and web application security professionals insight into the most prevalent security risks so that they may fold the report’s findings and recommendations into their own security practices, thereby minimizing the presence of known risks in their applications.

*Base on THM we consider in list down below (Notice: Top 10 will change base on timeline, so you can reach internet for find out currently top list)*

1. Injection
2. Broken Authentication
3. Sensitive Data Exposure
4. XML External Entity
5. Broken Access Control
6. Security Misconfiguration
7. Cross-site Scripting
8. Insecure Deserialization
9. Components with Known Vulnerabilities
10. Insufficent Logging & Monitoring
## INJECTION
![](https://cdn.acunetix.com/wp_content/uploads/2020/01/html-injection-910x478.png)
### Define: 
- Injection flaws are very common in applications today. These flaws occur because user controlled input is interpreted as actual commands or parameters by the application. Injection attacks depend on what technologies are being used and how exactly the input is interpreted by these technologies.
- Some common examples include: SQL injection and Command injection
- If an attacker is able to successfully pass input that is interpreted correctly, they would be able to do the following:
    - Access, Modify and Delete information in a database when this input is passed into database queries. This would mean that an attacker can steal sensitive information such as personal details and credentials.
    - Execute Arbitrary system commands on a server that would allow an attacker to gain access to users’ systems. This would enable them to steal sensitive data and carry out more attacks against infrastructure linked to the server on which the command is executed.
- The main defence for preventing injection attacks is ensuring that user controlled input is not interpreted as queries or commands. There are different ways of doing this:
    - Using an allow list: when input is sent to the server, this input is compared to a list of safe input or characters. If the input is marked as safe, then it is processed. Otherwise, it is rejected and the application throws an error.
    - Stripping input: If the input contains dangerous characters, these characters are removed before they are processed.
- We can do preventing with various libraries that perform these actions for u instead of manually constructing

### Example
#### OS Command Injection
1. Command Injection occurs when server-side code (like PHP) in a web application makes a system call on the hosting machine.
2. It is a web vulnerability that allows an attacker to take advantage of that made system call to execute operating system commands on the server. Sometimes this not affect with something malicious, Whoami or reading of files. Not bad !!!.
3. But the thing about command injection is it opens up many options for the attacker.  The worst thing they could do would be to spawn a reverse shell to become the user that the web server is running as. Example: A simple ;nc -e /bin/bash is all that's needed and they own your server; some variants of netcat don't support the -e option. You can use a list of these reverse shells as an alternative. 
4. Once the attacker has a foothold on the web server, they can start the usual enumeration of your systems and start looking for ways to pivot around.  Now that we know what command injection is, we'll start going into the different types and how to test for them.
5. Practical:
![[Pasted image 20240219123130.png]]
![[Pasted image 20240219123151.png]]
==> Try your best with solution u find on this type of vulnerabilities and my result:

![[Pasted image 20240219123212.png]]
## Broken Authentication
![](https://i.imgur.com/49p4BkI.png)

### Define
- Authentication and session management constitute core components of modern web applications.
- Authentication allows users to gain access to web applications by verifying their identities. The most common form of authentication is using a username and password mechanism. A user would enter these credentials, the server would verify them. If they are correct, the server would then provide the users’ browser with a session cookie.
- A session cookie is needed because web servers use HTTP(S) to communicate which is stateless. Attaching session cookies means that the server will know who is sending what data. The server can then keep track of users' actions.
- If an attacker is able to find flaws in an authentication mechanism, they would then successfully gain access to other users’ accounts. This would allow the attacker to access sensitive data (depending on the purpose of the application). Some common flaws in authentication mechanisms include:
    - Brute force attacks: If a web application uses usernames and passwords, an attacker is able to launch brute force attacks that allow them to guess the username and passwords using multiple authentication attempts. 
    - Use of weak credentials: web applications should set strong password policies. If applications allow users to set passwords such as ‘password1’ or common passwords, then an attacker is able to easily guess them and access user accounts. They can do this without brute forcing and without multiple attempts.
    - Weak Session Cookies: Session cookies are how the server keeps track of users. If session cookies contain predictable values, an attacker can set their own session cookies and access users’ accounts. 
- There can be various mitigation for broken authentication mechanisms depending on the exact flaw:
    - To avoid password guessing attacks, ensure the application enforces a strong password policy. 
    - To avoid brute force attacks, ensure that the application enforces an automatic lockout after a certain number of attempts. This would prevent an attacker from launching more brute force attacks.
    - Implement Multi Factor Authentication - If a user has multiple methods of authentication, for example, using username and passwords and receiving a code on their mobile device, then it would be difficult for an attacker to get access to both credentials to get access to their account.

### Example and Practical
![[Pasted image 20240219123312.png]]
On the first question, broken authentication occurs when the dev have missing on the check if add some space with the username and register with that we can access to original account, that prety cool. **SO BE CAREFUL**
![[Pasted image 20240219123338.png]]
## Sensitive Data Exposure
![](https://www.internetsecurity.tips/wp-content/uploads/2020/09/What-is-Sensitive-Data-Exposure-1280x720.png)
### Define
- When a webapp accidentally divulges sensitive data, we refer to it as "Sensitive Data Exposure".
- This is often data directly linked to customers (e.g. names, dates-of-birth, financial information, etc), but could also be more technical information, such as usernames and passwords.
- At more complex levels this often involves techniques such as a "Man in The Middle Attack", whereby the attacker would force user connections through a device which they control, then take advantage of weak encryption on any transmitted data to gain access to the intercepted information (if the data is even encrypted in the first place...).
- Of course, many examples are much simpler, and vulnerabilities can be found in web apps which can be exploited without any advanced networking knowledge. Indeed, in some cases, the sensitive data can be found directly on the webserver itself...

### For storage data or information we need meterial (Database)
- The most common way to store a large amount of data in a format that is easily accessible from many locations at once is in a database. Perfect for something like a web application, as there may be many users interacting with the website at any one time.
- Database engines usually follow the Structured Query Language (SQL) syntax; however, alternative formats (such as NoSQL) are rising in popularity.
- In a production environment it is common to see databases set up on dedicated servers, running a database service such as MySQL or MariaDB, however, databases can also be stored as files ==> referred to as "flat-file" databases, as they are stored as a single file on the computer.
- This is much easier than setting up a full database server, and so could potentially be seen in smaller web applications.
- **Risky**: Flat-file databases are stored as a file on the disk of a computer. Usually this would not be a problem for a webapp, but what happens if the database is stored underneath the root directory of the website (i.e. one of the files that a user connecting to the website is able to access)? Well, we can download it and query it on our own machine, with full access to everything in the database. Sensitive Data Exposure indeed!

### Exploit sensitive data exposure
![[Pasted image 20240219123534.png]]
![[Pasted image 20240219123604.png]]

*To crack data with non normal form on plain text, so we need to technique to tranform the data from the hash or something of encrypted by `crypto graphically` algorithms so we need the MATERIAL 2*
- When it comes to hash cracking, Kali comes pre-installed with various tools -- if you know how to use these then feel free to do so; however, they are outwith the scope of this material.
- Instead we will be using the online tool: [Crackstation](https://crackstation.net/). This website is extremely good at cracking weak password hashes. For more complicated hashes we would need more sophisticated tools; however, all of the crackable password hashes used in today's challenge are weak MD5 hashes, which Crackstation should handle very nicely indeed.
![[Pasted image 20240219123637.png]]

>**The challenge is guided, so if Crackstation fails to break a hash in today's box you can assume that the hash has been specifically designed to not be crackable.**
### Practical for exploit:
![[Pasted image 20240219123737.png]]
## XML External Entity
![](https://assets.tryhackme.com/additional/cmn-owasptopten/XXE_600x315.png)

### Define
- An XML External Entity (XXE) attack is a vulnerability that abuses features of XML parsers/data.
- It often allows an attacker to interact with any backend or external systems that the application itself can access and can allow the attacker to read the file on that system.
- They can also cause Denial of Service (DoS) attack or could use XXE to perform Server-Side Request Forgery (SSRF) inducing the web application to make requests to other applications.
- XXE may even enable port scanning and lead to remote code execution.
- There are two types of XXE attacks: in-band and out-of-band (OOB-XXE).
    - 1) An in-band XXE attack is the one in which the attacker can receive an immediate response to the XXE payload.
    - 2) out-of-band XXE attacks (also called blind XXE), there is no immediate response from the web application and attacker has to reflect the output of their XXE payload to some other file or their own server.

### Define XML ? What is the XML and What uses it?
#### What is XML?
XML (eXtensible Markup Language) is a markup language that defines a set of rules for encoding documents in a format that is both human-readable and machine-readable. It is a markup language used for storing and transporting data. 
#### Why we use XML ?
1. XML is platform-independent and programming language independent, thus it can be used on any system and supports the technology change when that happens.

2. The data stored and transported using XML can be changed at any point in time without affecting the data presentation.

3. XML allows validation using DTD and Schema. This validation ensures that the XML document is free from any syntax error.

4. XML simplifies data sharing between various systems because of its platform-independent nature. XML data doesn’t require any conversion when transferred between different systems.
### Syntax
![[Pasted image 20240219125436.png]]
![[Pasted image 20240219125447.png]]
### DTD - XML
- DTD stands for Document Type Definition. A DTD defines the structure and the legal elements and attributes of an XML document.
- Example for DTD to understanding the structure:
![[Pasted image 20240219125516.png]]
![[Pasted image 20240219125525.png]]
### Exploit: XXE payload and Practical
![[Pasted image 20240219125551.png]]
![[Pasted image 20240219125602.png]]
![[Pasted image 20240219125619.png]]
![[Pasted image 20240219125632.png]]
![[Pasted image 20240219125645.png]]
![[Pasted image 20240219125657.png]]

## Broken Access Control
![](https://i.imgur.com/fNlDFTR.png)

### Define
- Websites have pages that are protected from regular visitors, for example only the site's admin user should be able to access a page to manage other users. If a website visitor is able to access the protected page/pages that they are not authorised to view, the access controls are broken.
- A regular visitor being able to access protected pages, can lead to the following:
    - Being able to view sensitive information
    - Accessing unauthorized functionality
- OWASP have a listed a few attack scenarios demonstrating access control weaknesses: [link](https://owasp.org/www-project-top-ten/2017/A5_2017-Broken_Access_Control.html)
![[Pasted image 20240219125804.png]]
So we do with the question IDOR chall to see what happen with this vulnerability
### Exploit and Practical [IDOR](obsidian://open?vault=wiki_tech_obsidian_vault&file=Cyber%20%26%20Info%20Security%2FResearch%2FSecurity%20Things%2FInsecure%20Direct%20Object%20Reference%20(IDOR))
![](https://i.imgur.com/v7GuE3d.png)

*IDOR, or Insecure Direct Object Reference, is the act of exploiting a misconfiguration in the way user input is handled, to access resources you wouldn't ordinarily be able to access. IDOR is a type of access control vulnerability.*
![[Pasted image 20240219130223.png]]

## Security Misconfiguration
### Define
- Security Misconfigurations are distinct from the other Top 10 vulnerabilities, because they occur when security could have been configured properly but was not.
- Security misconfigurations include:
    - Poorly configured permissions on cloud services, like S3 buckets
    - Having unnecessary features enabled, like services, pages, accounts or privileges
    - Default accounts with unchanged passwords
    - Error messages that are overly detailed and allow an attacker to find out more about the system
    - Not using HTTP security headers, or revealing too much detail in the Server: HTTP header
- For more vulnerabilities, need read [OWASP top 10 entry for Security Misconfiguration](https://owasp.org/www-project-top-ten/OWASP_Top_Ten_2017/Top_10-2017_A6-Security_Misconfiguration)

### Scenerio and  Practical DEFAULT PASSWORD 
![[Pasted image 20240219132845.png]]

**Notice: We must see the technically of webapp and find with google dork and find at in github or anything and see the default username :defaultpasswork on readme of this app**

![[Pasted image 20240219132913.png]]

# Cross-site Scripting (XSS)
<img src = "https://i.ytimg.com/vi/lG7U3fuNw3A/maxresdefault.jpg">

### Define
- Cross-site scripting, also known as XSS is a security vulnerability typically found in web applications. It’s a type of injection which can allow an attacker to execute malicious scripts and have it execute on a victim’s machine.
- A web application is vulnerable to XSS if it uses unsanitized user input. XSS is possible in Javascript, VBScript, Flash and CSS. There are three main types of cross-site scripting:
    - Stored XSS - the most dangerous type of XSS. This is where a malicious string originates from the website’s database. This often happens when a website allows user input that is not sanitised (remove the "bad parts" of a users input) when inserted into the database.
    - Reflected XSS - the malicious payload is part of the victims request to the website. The website includes this payload in response back to the user. To summarise, an attacker needs to trick a victim into clicking a URL to execute their malicious payload.
    - DOM-Based XSS - DOM stands for Document Object Model and is a programming interface for HTML and XML documents. It represents the page so that programs can change the document structure, style and content. A web page is a document and this document can be either displayed in the browser window or as the HTML source.

### XSS Payload
Remember, cross-site scripting is a vulnerability that can be exploited to execute malicious Javascript on a victim’s machine. Check out some common payloads types used:
- Popup's ```(<script>alert(“Hello World”)</script>)``` - Creates a Hello World message popup on a users browser.
- Writing HTML (document.write) - Override the website's HTML to add your own (essentially defacing the entire page).
- XSS Keylogger (http://www.xss-payloads.com/payloads/scripts/simplekeylogger.js.html) - You can log all keystrokes of a user, capturing their password and other sensitive information they type into the webpage.
- Port scanning (http://www.xss-payloads.com/payloads/scripts/portscanapi.js.html) - A mini local port scanner (more information on this is covered in the TryHackMe XSS room).
XSS-Payloads.com (http://www.xss-payloads.com/) is a website that has XSS related Payloads, Tools, Documentation and more. You can download XSS payloads that take snapshots from a webcam or even get a more capable port and network scanner.

### Practical and do more in XSS room on tryhackme
![[Pasted image 20240219133352.png]]

## Insecure Deserialization
![](https://i.imgur.com/ReL2rEe.png)

*"Insecure Deserialization is a vulnerability which occurs when untrusted data is used to abuse the logic of an application" (Acunetix., 2017)*
### Define 
- Insecure deserialization is replacing data processed by an application with malicious code; allowing anything from DoS (Denial of Service) to RCE (Remote Code Execution) that the attacker can use to gain a foothold in a pentesting scenario.
- Specifically, this malicious code leverages the legitimate serialization and deserialization process used by web applications. We'll be explaining this process and why it is so commonplace in modern web applications.
- OWASP rank this vulnerability as 8 out of 10 because of the following reasons:
    - Low exploitability. This vulnerability is often a case-by-case basis - there is no reliable tool/framework for it. Because of its nature, attackers need to have a good understanding of the inner-workings of the ToE.
    - The exploit is only as dangerous as the attacker's skill permits, more so, the value of the data that is exposed. For example, someone who can only cause a DoS will make the application unavailable. The business impact of this will vary on the infrastructure - some organisations will recover just fine, others, however, will not.<br>

At summary, ultimately, any application that stores or fetches data where there are no validations or integrity checks in place for the data queried or retained. A few examples of applications of this nature are:
- E-Commerce Sites
- Forums
- API's
- Application Runtimes (Tomcat, Jenkins, Jboss, etc)

### Insecure Deserialization - Objects
A prominent element of object-oriented programming (OOP), objects are made up of two things:
- State
- Behaviour

Simply, objects allow you to create similar lines of code without having to do the leg-work of writing the same lines of code again.<br>
For example, a lamp would be a good object. Lamps can have different types of bulbs, this would be their state, as well as being either on/off - their behaviour!. <br>
Rather than having to accommodate every type of bulb and whether or not that specific lamp is on or off, you can use methods to simply alter the state and behaviour of the lamp. <br>

### Insecure Deserialization - Deserialization
- Serialisation is the process of converting objects used in programming into simpler, compatible formatting for transmitting between systems or networks for further processing or storage. Alternatively, deserialisation is the reverse of this; converting serialised information into their complex form - an object that the application will understand.

==> Expland what does this mean ? 

- Say you have a password of "password123" from a program that needs to be stored in a database on another system. To travel across a network this string/output needs to be converted to binary. Of course, the password needs to be stored as "password123" and not its binary notation. Once this reaches the database, it is converted or deserialised back into "password123" so it can be stored.
![](https://i.imgur.com/ZB76mLI.png)

### Insecure Deserialization - Cookies
![[Pasted image 20240219133455.png]]
Whilst plaintext credentials is a vulnerability in itself, it is not insecure deserialization as we have not sent any serialized data to be executed!

Cookies are not permanent storage solutions like databases. Some cookies such as session ID's will clear when the browser is closed, others, however, last considerably longer. This is determined by the "Expiry" timer that is set when the cookie is created.
![[Pasted image 20240219133518.png]]

### Cookies Creating 
Cookies can be set in various website programming languages. For example, Javascript, PHP or Python to name a few.

![](https://i.imgur.com/9WOYwbF.png)

Setting cookies in Flask is rather trivial. Simply, this snippet gets the current date and time, stores it within the variable "timestamp" and then stores the date and time in a cookie named "registrationTimestamp". This is what it will look like in the browser.

![](https://i.imgur.com/I4oUGsn.png)

 ## Insecure Deserialization - Cookies Practical

![[Pasted image 20240219133623.png]]
![[Pasted image 20240219133633.png]]
![[Pasted image 20240219134124.png]]
![[Pasted image 20240219134135.png]]
### Insecure Deserialization - Code Execution
![[Pasted image 20240219134158.png]]
![](https://i.imgur.com/FwG0TBs.png)

### What makes this form vulnerable?
If a user was to enter their feedback, the data will get encoded and sent to the Flask application (presumably for storage within a database for example). However, the application assumes that any data encoded is trustworthy. But we're hackers. You can only trust us as far as you can fling us (and that's nigh-on impossible online)

![](https://i.imgur.com/lgomAL9.png)
![[Pasted image 20240219134432.png]]
![[Pasted image 20240219134534.png]]
![[Pasted image 20240219134543.png]]

## Components With Known Vulnerabilities
### Define
Occasionally, you may find that the company/entity that you're pen-testing is using a program that already has a well documented vulnerability.

Hence, why OWASP has rated this a 3(meaning high) on the prevalence scale, it is incredibly easy for a company to miss an update for an application.

### Exploit
Recall that since this is about known vulnerabilities, most of the work has already been done for us. Our main job is to find out the information of the software, and research it until we can find an exploit. 
![[Pasted image 20240219134640.png]]
![[Pasted image 20240219134625.png]]
![[Pasted image 20240219134658.png]]

### Practical 
- Reference with CVE on exploit-db : [Online Book Store 1.0](https://www.exploit-db.com/exploits/47887)
- Copy the code to execute RCE on VPN machine and do RCE 
- Get the answer from the RCE machine
![[Pasted image 20240219134716.png]]

## Insufficient Logging and Monitoring

### Define
When web applications are set up, every action performed by the user should be logged. Logging is important because in the event of an incident, the attackers actions can be traced. Once their actions are traced, their risk and impact can be determined. Without logging, there would be no way to tell what actions an attacker performed if they gain access to particular web applications. The bigger impacts of these include:
1. regulatory damage: if an attacker has gained access to personally identifiable user information and there is no record of this, not only are users of the application affected, but the application owners may be subject to fines or more severe actions depending on regulations.
2. risk of further attacks: without logging, the presence of an attacker may be undetected. This could allow an attacker to launch further attacks against web application owners by stealing credentials, attacking infrastructure and more.
    
The information stored in logs should include:
 1. HTTP status codes
 2. Time Stamps
 3. Usernames
 4. API endpoints/page locations
 5. IP addresses

These logs do have some sensitive information on them so its important to ensure that logs are stored securely and multiple copies of these logs are stored at different locations.

As you may have noticed, logging is more important after a breach or incident has occurred. The ideal case is having monitoring in place to detect any suspicious activity. The aim of detecting this suspicious activity is to either stop the attacker completely or reduce the impact they've made if their presence has been detected much later than anticipated. Common examples of suspicious activity includes:

- multiple unauthorised attempts for a particular action (usually authentication attempts or access to unauthorised resources e.g. admin pages)
- requests from anomalous IP addresses or locations: while this can indicate that someone else is trying to access a particular user's account, it can also have a false positive rate.
- use of automated tools: particular automated tooling can be easily identifiable e.g. using the value of User-Agent headers or the speed of requests. This can indicate an attacker is using automated tooling.
- common payloads: in web applications, it's common for attackers to use Cross Site Scripting (XSS) payloads. Detecting the use of these payloads can indicate the presence of someone conducting unauthorised/malicious testing on applications.

Just detecting suspicious activity isn't helpful. This suspicious activity needs to be rated according to the impact level. For example, certain actions will higher impact than others. These higher impact actions need to be responded to sooner thus they should raise an alarm which raises the attention of the relevant party.
