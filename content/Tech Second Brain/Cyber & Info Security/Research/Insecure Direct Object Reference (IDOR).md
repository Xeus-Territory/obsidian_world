---
title: Insecure Direct Object Reference (IDOR)
tags:
  - fundamentals
  - infosec
---
>[!info]
>*There many thing web you can refer to this stuff*
>1. [Insecure Direct Object Reference – IDOR Vulnerability](https://crashtest-security.com/insecure-direct-object-reference-idor/)
>1. [Tìm kiếm các lỗi IDOR, chưa bao giờ lại dễ đến thế với extension Autorize](https://viblo.asia/p/tim-kiem-cac-loi-idor-chua-bao-gio-lai-de-den-the-voi-extension-autorize-gDVK2z02KLj)
>2. [Automating BURP to find IDORs](https://medium.com/cyberverse/automating-burp-to-find-idors-2b3dbe9fa0b8)
>3. [How-To: Find IDOR (Insecure Direct Object Reference) Vulnerabilities for large bounty rewards](https://www.bugcrowd.com/blog/how-to-find-idor-insecure-direct-object-reference-vulnerabilities-for-large-bounty-rewards/)
>4. [What is IDOR Vulnerability, and how does it affect you?](https://infosecwriteups.com/what-is-idor-vulnerability-and-how-does-it-affect-you-85431d10f8fb)
>5. [Insecure Direct Object Reference Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html)

# What is an IDOR? 

![[Pasted image 20240219105216.png]]

IDOR stands for Insecure Direct Object Reference and is a type of access control vulnerability.

This type of vulnerability can occur when a web server receives user-supplied input to retrieve objects (files, data, documents), too much trust has been placed on the input data, and it is not validated on the server-side to confirm the requested object belongs to the user requesting it.

# IDOR Example

Imagine you've just signed up for an online service, and you want to change your profile information. The link you click on goes to http://online-service.thm/profile?user_id=1305, and you can see your information.

Curiosity gets the better of you, and you try changing the user_id value to 1000 instead (http://online-service.thm/profile?user_id=1000), and to your surprise, you can now see another user's information. That is IDOR vulnerability!, Ideally, there should be a check on the website to confirm that the user information belongs to the user logged requesting it.

## Finding IDORs in Encoded IDs

**Encoded IDs**
- When passing data from page to page either by post data, query strings, or cookies, web developers will often first take the raw data and encode it.
- Encoding ensures that the receiving web server will be able to understand the contents. Encoding changes binary data into an ASCII string commonly using the a-z, A-Z, 0-9 and =character for padding.
- The most common encoding technique on the web is base64 encoding and can usually be pretty easy to spot.
![](https://tryhackme-images.s3.amazonaws.com/user-uploads/5efe36fb68daf465530ca761/room-content/5f2cbe5c4ab4a274420bc9a9afc9202d.png)

## Finding IDORs in Hashed IDs

**Hashed IDs**
- Hashed IDs are a little bit more complicated to deal with than encoded ones, but they may follow a predictable pattern, such as being the hashed version of the integer value.
- It's worthwhile putting any discovered hashes through a web service such as [https://crackstation.net/](https://crackstation.net/) (which has a database of billions of hash to value results) to see if we can find any matches.

## Finding IDORs in Unpredictable IDs

**Unpredictable IDs**
If the Id cannot be detected using the above methods, an excellent method of IDOR detection is to create two accounts and swap the Id numbers between them. If you can view the other users' content using their Id number while still being logged in with a different account (or not logged in at all), you've found a valid IDOR vulnerability.

# Where are IDORs located
The vulnerable endpoint you're targeting may not always be something you see in the address bar. It could be content your browser loads in via an AJAX request or something that you find referenced in a JavaScript file. <br>

Sometimes endpoints could have an unreferenced parameter that may have been of some use during development and got pushed to production. For example, you may notice a call to /user/details displaying your user information (authenticated through your session). But through an attack known as parameter mining, you discover a parameter called user_id that you can use to display other users' information, for example, /user/details?user_id=123

>[!quote]
>So i think IDOR is famous vulnerable for any web, u can exploit that if web dev not care full to show the url with para to access directly to other accounts, Dangerous thing. So happy hacking and i will come back IDOR for realweb exploit.

# Extend IDOR 

## Types of IDOR
1. Blind IDOR: The type of IDOR in which the results of the exploitation cannot be seen in the server response. For example modifying other user private data without accessing it.
2. Generic IDOR: The type of IDOR in which the results of the exploitation can be seen in the server response. For example accessing confidential data or files belonging to another user.
3. IDOR with Reference to Objects: Used to access or modify an unauthorized object. For example accessing bank account information of other users by sending such a request **→example.com/accounts?id={reference ID}**
4. IDOR with Reference to Files: Used to access an unauthorized file. For example a live chat server stores the confidential conversations in files with names as incrementing numbers and any conversation can be retrieved by just sending requests like this **→example.com/1.log, example.com/2.log, example.com/3.log and so on.**

## How to find an IDOR in a Bug Bounty Program
The first rule in testing for an IDOR vulnerability is to catch all the requests your browser sends to the web server. Many times you will find those type of issues in URL parameters values, headers values or cookies. You will likely find encoded or hashed values and you have to decode them. For example the following link:

```http
https://example.com/profiles.php?id=e4da3b7fbbce2345d7772b0674a318d5
```

The “id” URL parameter value can be easily cracked using a hash decode tool (MD5 hashed).

Also, a common place where an IDOR can occur is in the API requests, so be sure that you analyze the web application, gather all the API requests that are being sent and tamper with the requested values.