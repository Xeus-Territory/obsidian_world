**Level: APPRENTICE**

*[Lab: Insecure direct object references](https://portswigger.net/web-security/access-control/lab-insecure-direct-object-references)*

*Description: This lab stores user chat logs directly on the server's file system, and retrieves them using static URLs. This lab stores user chat logs directly on the server's file system, and retrieves them using static URLs.*
![[Pasted image 20240219143843.png]]
## [[:BoBxsCoffee:]] So try best and we can take the flag LOL

*Access the lab with button and it will automatically generate the web, we got this* 😊

![[Pasted image 20240219143957.png]]

So first look we can see, this web look like the e-commerce website, with the Item web show not have interesting content. So We can notice about the tag to change something, base on solution we can know tag we need to notice about Live Chat.

![[Pasted image 20240219144025.png]]

So go to some tag on website to see cool, first look in F12 to see the route or API this web to return for user. so we get this all tag to change url to make user directly to route. No Interesting content and yeah we click to this tag and see smt. we can see the /chat have something behind it so we type some keywords on that web and send to see what happens next ? 

![[Pasted image 20240219144045.png]]

![[Pasted image 20240219144055.png]]

I think that really chat-box to reply the user with random message but we see something this way to make conversation :rocket: with server so turn on burp and make proxy server to see what happens next ?

![[Pasted image 20240219144108.png]]

So when we send something to the server with proxy server and it disconnect server ? But nothing change so we have suspicious the button view transcript have something behind it 

![[Pasted image 20240219144128.png]]

1. View transcript is post request POST /download-transcript HTTP/1.1 (Download transcript)
2. Cookies include Cookie: session=7hWIzcYksRmeH8Wb0M8VufhoT4fXSFcK (IDK what type of encoding but if decrypt it u can find something behind it if decrypt it)
3. The script we download and quite a bit of information, if web have IDOR vul we can download the script of other user and take the information from script they typing (Can include Banking account or something like password :smiley:)

![[Pasted image 20240219144138.png]]

![[Pasted image 20240219144148.png]]

So as well we can look GET and yeah we can see the what name or id .txt we download. So we can test IDOR vulnerable on this web by change name or id of text file and look what happens ? Change 2 ==> 1 (One is the best :BoBxsSmile:)

![[Pasted image 20240219144218.png]]
![[Pasted image 20240219144225.png]]

> *Yeah we find the password of user so IDOR vulnerable occurs and we exploit something like this so take password and login with username carlos and password: 0gwov41nw2xlfiwf2aga (Dynamically generated so your file have different). Yeah That end IDOR lab on portswigger, quite a bit about IDOR but I'm sure it critical vulnerable if this is payment or something sensity. Happy hacking and careful for this vulnerable* :BoBxsCoffee: