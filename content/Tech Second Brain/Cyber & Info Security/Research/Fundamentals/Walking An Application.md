---
tags:
  - fundamentals
  - infosec
draft: "false"
---

>[!quote]
>*Basic skill to hacking web is manual review a web application for security issues such as view page source, using dev-tools to inspect, debugger or network issues*
## Walking an application (Methods)
Here is a short breakdown of the in-built browser tools you will use for this manual review

1. View Source - Use your browser to view the human-readable source code of a website.
2. Inspector - Learn how to inspect page elements and make changes to view usually blocked content.
3. Debugger - Inspect and control the flow of a page's JavaScript
4. Network - See all the network requests a page makes.
## Explore the website 
- In this field, you need to discover features that could potentially be vulnerable and attempt to exploit them to access whether or not they are. These features are usually part of website interactivity with the user
- Finding interaction portion of the website can be easy as spotting login form to manually reviewing the website js and many kind of this.
## View Page Source Skill
- The page source is the human-readable code returned to our browser/client from the web server each time we make a request.
- The return code include HTML, CSS, JS about content User receive and view in browser, foremost, view the page source can help discover more infomation about the web application

### How do I view the Page Source?
*There are two common method we can use
1. Access via dork of browser with this syntax like this ***view-source:https://www.google.com/*** on the page you want view 
2. Access via the dev-tools browser with `F12 Button` or in browser menu
Ah yeah,  we can see the code of website 😄  (easy for know the code building, copy that and u can get the good web :smile, I just kidding) and u need to know about the basic of html to know this and on the arrow u can access and see inside.

![[Pasted image 20240219142846 1.png]]
QUIZ:
- What is the flag from the HTML comment? Answer: Access with route from comment and get this THM{HTML_COMMENTS_ARE_DANGEROUS}
- What is the flag from the secret link? Answer: Find the hidden page and get this THM{NOT_A_SECRET_ANYMORE}
- What is the directory listing flag? Answer: I have struggle with this and finally i read the directory listing and have folder assets and we go route /assets and yeah i got flag THM{INVALID_DIRECTORY_PERMISSIONS}
- What is the framework flag? Answer: So we have the page generate the web so access and find something and yeah u find this 
![[Pasted image 20240219142918 1.png]]
**So access this and get this flag THM{KEEP_YOUR_SOFTWARE_UPDATED}
## Developer Tools - Inspector
- Developer Tools: Every modern browser includes developer tools; this is a tool kit used to aid web developers in debugging web applications and gives you a peek under the hood of a website to see what is going on. ***As a pententer***, We're specifically focusing on three features of the developer tool kit, Inspector, Debugger and Network.
- Inspector: 
    - The page source doesn't always represent what's shown on a webpage; this is because CSS, JavaScript and user interaction can change the content and style of the page, which means we need a way to view what's been displayed in the browser window at this exact time. Element inspector assists us with this by providing us with a live representation of what is currently on the website.
    - As well as viewing this live view, we can also edit and interact with the page elements, which is helpful for web developers to debug issues.
QUIZ
- What is the flag behind the paywall? Inspector inside the tab https://10-10-111-1.p.thmlabs.com/news/article?id=3 and do the step like tryhackme recommend and yet we turn off the position elements on css site and yet we get the flag THM{NOT_SO_HIDDEN}
![[Pasted image 20240219142944 1.png]]
## Developer Tools - Debugger
- This panel in the developer tools is intended for debugging JavaScript, and again is an excellent feature for web developers wanting to work out why something might not be working. But as penetration testers, it gives us the option of digging deep into the JavaScript code.
QUIZ:
What is the flag in the red box?

*You need to choose contact tab and you will see the thing like step in tryhackme, do that thing and you will get the flag THM{CATCH_ME_IF_YOU_CAN}*

![[Pasted image 20240219143035 1.png]]
## Developer Tools - Network
- The network tab on the developer tools can be used to keep track of every external request a webpage makes. If you click on the Network tab and then refresh the page, you'll see all the files the page is requesting.<br>
QUIZ
What is the flag shown on the contact-msg network request?

>*Do step base on tryhackme and you will see the web do ajax request and we get the json file and yeah we get the flag THM{GOT_AJAX_FLAG}*


