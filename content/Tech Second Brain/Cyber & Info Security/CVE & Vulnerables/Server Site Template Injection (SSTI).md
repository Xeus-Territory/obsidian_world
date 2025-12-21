---
title: Server Site Template Injection (SSTI)
tags:
  - fundamentals
  - infosec
---

>[!question]
>*What SSTI ? How does it work ? What hacker can do with it? How to prevent it?*
# English
## Resource SSTI from
1. [Hackstricks](https://book.hacktricks.xyz/pentesting-web/ssti-server-side-template-injection#tplmap) (very detailed explanation)
2. [Port Swigger](https://portswigger.net/web-security/server-side-template-injection)
3. [SSTI Jinja2](https://medium.com/@nyomanpradipta120/ssti-in-flask-jinja2-20b068fdaeee)
4. [Jinja SSTI limited payload](https://niebardzo.github.io/2020-11-23-exploiting-jinja-ssti/)
5. [SSTI payload](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Server%20Side%20Template%20Injection)
6. [On SSTI & bypass of jinja2](https://chowdera.com/2020/12/20201221231521371q.html)
7. [Java SSTI](https://hell38vn.wordpress.com/2019/07/11/root-mejava-server-side-template-injection-easy/#:~:text=SSTI%20l%C3%A0%20l%E1%BB%97i%20s%E1%BB%AD%20d%E1%BB%A5ng,m%C3%ACn%20XXS%2Cexecute%20code%2C%E2%80%A6)
8. [SSTI Vietnamese](https://viblo.asia/p/server-side-template-injection-YWOZrxvy5Q0)
9. [Prevent SSTI with jinja2](https://www.onsecurity.io/blog/server-side-template-injection-with-jinja2/)

## Table of contents
1. What SSTI (Server Side Template Injection)
2. SSTI occurs when?
3. Constructing a server-side template injection attack
4. Example attack
5. How to prevent a server-side template injection attack
## What SSTI (Server Side Template Injection)?
- A server-side template injection occurs when an attacker is able to use native template syntax to inject a malicious payload into a template, which is then executed server-side.
- Template engine are designed to <strong>generate web</strong> pages by combining fixed templates with volatile data. This is widely used by many web applications to present a data through web and email. Embedding unself from user input into templates bring to SSTI - Serious vulnerabilities and this easily confused with XSS. <br>
<img src = "https://images.viblo.asia/fb9ee2bd-415d-4b83-8fc0-afbfa8d9ceb7.png" align = "center">
- Not like XSS, SSTI use to directly attack into server and include RCE - Remote code execution. <strong>Template Injection can arise not only through mistakes on the part of the developer, but also through intentional behavior of the template in an attempt to provide rich functionality - usually done by wikis, blogs, etc. marketing applications and content management systems</strong>. 
An example of vulnerable code see the following one: :scream:

```php
$output = $twig->render("Dear " . $_GET['name']);
```

As template syntax is evaluated server-side, this potentially allows an attacker to place a server-side template injection payload inside the name parameter as follows:

```url
"http://vulnerable-website.com/?name={{bad-stuff-here}}"
```

## SSTI occurs when ?
- SSTI occurs when user input is concatenated directly into template, specified touch the data. This allows hacker to <strong>inject arbitrary template directives</strong> in order to manipulate the template engine, often enabling them to take <strong>complete control of the server</strong> <em>(ex. RCE Skill))</em>. <strong>The severity of this problem varies depending on the type of template engines used. Template engines can range from easy to nearly impossible to exploit.</strong>
- Base on example from ***resource 8***: 
1. Have markerting send series of email and use Twig templates to send the Hello to customer. if only name of customer pass on template like example, it will work as well:

```php
$output = $twig->render("Dear {first_name},", array("first_name" => $user.first_name) );
```		    

2. But if you can change the email, Problem will occurs:
 
```php
$output = $twig->render($_GET['custom_email'], array("first_name" => $user.first_name) );
```

3. Output from  case can be see the server side vulnerabilities:
 
```php
 -customemail={{self}}
  Object of class TwigTemplate7ae62e582f8a35e5ea6cc639800ecf15b96c0d6f78db3538221c1145580ca4a5 could not be converted to string*
```

- The vulnerabilities usually occurs when the developer intentionally allows the user to submit or edit the templates.
- The template injection have crucial problem and have dammed over the functionality or data of applications. This can happen if the hacker used this server to attack the other application. Besides, template injection not pose significant security issues

## Constructing a server-side template injection attack ?  What hacker can do with it?

<div align="center">
    <img src = "https://images.viblo.asia/43842564-1a0b-420b-9e51-70263e70ae68.png" width = "640" height = "480">
</div>

### Detect 
As with any vulnerability, the first step towards exploitation is being able to find it. Perhaps the simplest initial approach is to try fuzzing the template by injecting a sequence of special characters commonly used in template expressions, such as the [polyglot](https://book.hacktricks.xyz/pentesting-web/pocs-and-polygloths-cheatsheet)
If server is vulnerable you should spot the differences between the response and regular data on para and give payload.
If an error is thrown it will be quiet easy to figure out that the server is vulnerable and even which engine is running. But you could also find a vulnerable server if you were expecting it to reflect the given payload and it is not being reflected or if there are some missing chars in the response.
### Plaintext context
Error often occurs on once of method:  
![[Pasted image 20240219113133.png]]
To injection we need to embedded code into the template, but it's easy to differentiate if you try to set mathematical operations within a template expression:
![[Pasted image 20240219113152.png]]

### Code context
In these cases the user input is being placed within a template expression:

```php
engine.render("Hello {{"+greeting+"}}", data)
```

The URL access that page could be similar to: *http://vulnerable-website.com/?greeting=data.username*

If you change the greeting para for a diff value the response won't contain the username , but if you access something like: *http://vulnerable-website.com/?greeting=data.username}}hello*. Then, the response will contain the username (if the closing template expression chars were }}).
If an error is thrown during these test, it will be easier to find that the server is vulnerable<br>
Some example from code context:

![[Pasted image 20240219113447.png]]

### Indentify
The next step to attack with skill is to indentify the template engine. Although there are a huge number of templating language but have some similar btw that. Luckily the you can print some error and find the engine used inside 😤 

<img src = "https://images.viblo.asia/1b20d79b-7ca2-4056-943b-97f706baf51d.png">

### Exploit

**Read**

After step indentify, next step you need to read relative doc. Focus on 
- Basic syntax of template engine
- List of function, method, filter and default para
- Extension of template engine / Plugin

**Explore**

Find the exactly what we can access in the template engine
- Consider both the default objects provided by the template engine and the application-specific objects passed into the template by the developers.
- Bruteforce variable names. Objects provided by the developer can potentially contain sensitive information. 

**Attack** 

Review each function to find exploitable vulnerabilities. Attacks can include creating arbitrary objects, reading/writing arbitrary files (including remote files), or exploiting privilege escalation vulnerabilities.

## Example about attack with SSTI

*A lot of template engine for language so we can not cover it, focus some keywords*
- jinja2 (Python-Flask)
- Twig (PHP)
*Some reference about multiple type of SSTI*
[1. PHP SSTI](https://viblo.asia/p/server-side-template-injection-YWOZrxvy5Q0#_4-vi-du-ve-server-side-template-injection-6)
[2. Jinja2 SSTI](https://book.hacktricks.xyz/pentesting-web/ssti-server-side-template-injection#jinja2-python)
[3. Java SSTI](https://hell38vn.wordpress.com/2019/07/11/root-mejava-server-side-template-injection-easy/#:~:text=SSTI%20l%C3%A0%20l%E1%BB%97i%20s%E1%BB%AD%20d%E1%BB%A5ng,m%C3%ACn%20XXS%2Cexecute%20code%2C%E2%80%A6)
## How to prevent SSTI
Example and explain below
[Prevention SSTI with Jinja2 Template](https://www.onsecurity.io/blog/server-side-template-injection-with-jinja2/)
 
# Tiếng Việt
## Mục lục
1. SSTI (Server Side Template Injection) Là gì ?
2. Khi nào SSTI xảy ra ?
3. Cấu trúc một cuộc tấn công SSTI như thế nào ?
4. Ví dụ về tần công SSTI
5. Cách phòng vệ SSTI
## SSTI (Server Side Template Injection) là gì ?
- SSTI xảy ra khi kẻ tấn công có thể sử dụng cú pháp mẫu (template syntax) gốc để đưa một payload độc hại vào template, sau đó sẽ được thực thi phía máy chủ.
- Công cụ mẫu được thiết kế để <strong> tạo trang web </strong> bằng cách kết hợp các mẫu cố định với dữ liệu dễ bay hơi. Điều này được sử dụng rộng rãi bởi nhiều ứng dụng web để trình bày dữ liệu thông qua web và email. Việc nhúng không chính mình từ đầu vào của người dùng vào các mẫu dẫn đến SSTI - Lỗ hổng nghiêm trọng và điều này dễ bị nhầm lẫn với XSS. <br>
<img src = "https://images.viblo.asia/fb9ee2bd-415d-4b83-8fc0-afbfa8d9ceb7.png" align = "center">
- Không giống như XSS, SSTI sử dụng để tấn công trực tiếp vào máy chủ và bao gồm RCE - Thực thi mã từ xa. <strong> Chèn mẫu có thể phát sinh không chỉ do lỗi của nhà phát triển mà còn do hành vi cố ý của template nhằm cung cấp chức năng phong phú - thường được thực hiện bởi wiki, blog, v.v. các ứng dụng tiếp thị và hệ thống quản lý nội dung </strong>.

Ví dụ về mã dễ bị tấn công, hãy xem ví dụ sau 😱

```php
$output = $twig->render("Dear " . $_GET['name']);
```

Vì cú pháp mẫu được đánh giá phía máy chủ, điều này có khả năng cho phép kẻ tấn công SSTI các template từ phía máy chủ bên với tham số name như sau:

    "http://vulnerable-website.com/?name={{bad-stuff-here}}"

## Khi nào SSTI xảy ra ?
- SSTI xảy ra khi đầu vào của người dùng được nối trực tiếp vào mẫu, được chỉ định chạm vào dữ liệu. Điều này cho phép hacker <strong> đưa các chỉ thị template tùy ý </strong> để thao tác với công cụ mẫu, thường cho phép họ <strong> kiểm soát hoàn toàn máy chủ </strong> <em> (ví dụ: RCE))</em>. <strong>Mức độ nghiêm trọng của vấn đề này khác nhau tùy thuộc vào loại công cụ mẫu được sử dụng. Các công cụ mẫu có thể từ dễ đến gần như không thể khai thác được. </strong>
- Có ví dụ từ ***nguồn số 8***: 
    - Đánh dấu gửi hàng loạt email và sử dụng các mẫu Twig để gửi Lời chào đến khách hàng. nếu chỉ có tên của khách hàng chuyển qua mẫu như ví dụ, nó hoạt động tốt:
        
	        $output = $twig->render("Dear {first_name},", array("first_name" => $user.first_name) );
        
    - Nhưng nếu bạn có thể custom được email, vấn đề sẽ xảy ra:
        
			 $output = $twig->render($_GET['custom_email'], array("first_name" => $user.first_name) );
    - Output từ hàm đã bị mắc SSTI:

		    - customemail={{self}}
	        Object of class TwigTemplate7ae62e582f8a35e5ea6cc639800ecf15b96c0d6f78db3538221c1145580ca4a5 could not be converted to string*

*Ở đây mình giữ nguyên nguyên văn để nó cover được tất cả vấn đề* 🌊

- The vulnerabilities usually occurs when the developer intentionally allows the user to submit or edit the templates.
-  The template injection have crutial problem and have dammed over the functionality or data of applications. This can happen if the hacker used this server to attack the other application. Besides, template injection not pose significant security issues
## Cấu trúc một cuộc tấn công SSTI như thế nào ? Hacker có thể làm được gì?
<img src = "https://images.viblo.asia/43842564-1a0b-420b-9e51-70263e70ae68.png" width = "640" height = "480" align = "center">

### Detect 
Như với bất kỳ lỗ hổng nào, bước đầu tiên để khai thác là có thể tìm thấy nó. Có lẽ cách tiếp cận ban đầu đơn giản nhất là thử làm mờ mẫu bằng cách chèn một chuỗi các ký tự đặc biệt thường được sử dụng trong các biểu thức mẫu, chẳng hạn như [polygloths](https://book.hacktricks.xyz/pentesting-web/pocs-and-polygloths-cheatsheet)

Nếu máy chủ dễ bị tấn công, bạn nên phát hiện sự khác biệt giữa phản hồi và dữ liệu thông thường trên para và đưa ra tải trọng.

Nếu một lỗi được đưa ra, bạn sẽ rất dễ dàng nhận ra rằng máy chủ đang bị tấn công và thậm chí là động cơ nào đang chạy. Nhưng bạn cũng có thể tìm thấy một máy chủ dễ bị tấn công nếu bạn mong đợi nó phản ánh trọng tải đã cho và nó không được phản ánh hoặc nếu có một số ký tự bị thiếu trong phản hồi.
### Plaintext context
Lỗi thường xảy ra:

![[Pasted image 20240219113133.png]]

Để đưa vào, chúng ta cần nhúng code vào template, nhưng rất dễ phân biệt nếu bạn cố gắng đặt các phép toán trong một biểu thức mẫu:

![[Pasted image 20240219113152.png]]

### Code context
Trong những trường hợp này, đầu vào của người dùng đang được đặt trong một biểu thức mẫu:

    engine.render("Hello {{"+greeting+"}}", data)

URL truy cập trang đó có thể tương tự như: *http: //vulnerable-website.com/?welcome= data.username*
Nếu bạn thay đổi para lời chào cho một giá trị khác, câu trả lời sẽ không chứa tên người dùng, nhưng nếu bạn truy cập một cái gì đó như http://vulnerable-website.com/?greeting=data.username}}hello thì câu trả lời sẽ chứa tên người dùng (nếu các ký tự biểu thức mẫu đóng là}}).

Nếu xảy ra lỗi trong quá trình kiểm tra này, sẽ dễ dàng phát hiện ra rằng máy chủ dễ bị tấn công
Một số ví dụ về code context:

![[Pasted image 20240219113447.png]]

### Indentify
Bước tiếp theo để tấn công bằng kỹ năng là xác định công cụ mẫu. Mặc dù có một số lượng lớn ngôn ngữ tạo mẫu nhưng có một số btw tương tự. May mắn thay, bạn có thể in một số lỗi và tìm thấy động cơ được sử dụng bên trong 😤

<img src = "https://images.viblo.asia/1b20d79b-7ca2-4056-943b-97f706baf51d.png">

### Exploit

**Read**

Sau bước xác định, bước tiếp theo bạn cần đọc tài liệu tương đối. Tập trung vào:
- Cú pháp cơ bản của công cụ mẫu
- Danh sách chức năng, phương pháp, bộ lọc và para mặc định
- Phần mở rộng của công cụ mẫu / Plugin

**Explore**

Tìm chính xác những gì chúng ta có thể truy cập đối với template:
- Xem xét cả các đối tượng mặc định được cung cấp bởi template và các đối tượng dành riêng cho ứng dụng được các nhà phát triển chuyển vào template.
- Bruteforce Tên biến. Các đối tượng do nhà phát triển cung cấp có thể chứa thông tin nhạy cảm. 

**Attack**

Xem xét từng chức năng để tìm các lỗ hổng có thể khai thác. Các cuộc tấn công có thể bao gồm việc tạo các đối tượng tùy ý, đọc / ghi các tệp tùy ý (bao gồm cả các tệp từ xa) hoặc khai thác các lỗ hổng leo thang đặc quyền.

## Ví dụ tấn công SSTI

*Rất nhiều template mẫu cho các ngôn ngữ lập trình vì vậy chúng ta không thể đề cập hết đến nó, hãy tập trung vào một số từ khóa*
-  jinja2 (Python-Flask)
- Twig (PHP)
*Một vài ví dụ về SSTI với một số ngôn ngữ*
[1. PHP SSTI](https://viblo.asia/p/server-side-template-injection-YWOZrxvy5Q0#_4-vi-du-ve-server-side-template-injection-6)
[2. Jinja2 SSTI](https://book.hacktricks.xyz/pentesting-web/ssti-server-side-template-injection#jinja2-python)
[3. Java SSTI](https://hell38vn.wordpress.com/2019/07/11/root-mejava-server-side-template-injection-easy/#:~:text=SSTI%20l%C3%A0%20l%E1%BB%97i%20s%E1%BB%AD%20d%E1%BB%A5ng,m%C3%ACn%20XXS%2Cexecute%20code%2C%E2%80%A6)

## Phòng tránh SSTI - cách bảo vệ với template Jinja2
Ví dụ và giới thiệu được đề cập
[Prevention SSTI with Jinja2 Template](https://www.onsecurity.io/blog/server-side-template-injection-with-jinja2/)


# SSTI (ImaginaryCTF) (Vietnamese)

Challenge: [imaginaryctf](https://imaginaryctf.org/Challenges) (50 Pts)

Thông tin và mở rộng cho SSTI ▶️ ▶️  [[Server Site Template Injection (SSTI)]]
## I. Cấu trúc câu hỏi

![[Pasted image 20240219145516.png]]
*Lời dẫn (tạm dịch): Nó bảo là nó có thể ngăn SSTI trên web nó bằng cách nó hạn chế nhập thông tin vào của người dùng, nó đảm bảo rằng sẽ có bug nào trên web nó cả*

*Đính kèm: [Link to web](http://puzzler7.imaginaryctf.org:3002/)*

1. Click vào đường dẫn ta sẽ được trả về với route đầu tiên `(@app.route('/')))`
![[Pasted image 20240219145617.png]]
-   Nhận diện dược đây là code Flask (Các thư viện import là lý do).
-   Có 2 route trong bài này đó là route (/) ta đang đứng và route (/ssti)
-   Đặc điểm nhận dạng của bài SSTI đối với python cụ thể jinja2 đó là ***render_template_string()*** cụ thể câu lệnh này xuất hiện trong route (/ssti), trong đó còn một đặc điểm nữa trong route này cậu lệnh get argument còn cho ta hiểu rằng sẽ có dữ liệu sẽ được lấy vào và check 
-   Một dấu hiệu cuối cùng của việc Flask đó là cho ta tính năng debug, theo code thì debug đang ở mode on tức là true thì thằng Flask nó có một khuyến cáo ***"The debugger allows executing arbitrary Python code from the browser. It is protected by a pin, but still represents a major security risk. Do not run the development server or debugger in a production environment."*** (nôm na là nó bảo là khi mày bật debug đối với template này thì người dụng họ sẽ có thể thực thi bất cứ câu lệnh python nào, nó bảo là có được bv bởi số pin nhưng mà vẫn rủi ro nên là không nên bật mode debug nếu nó trên product)

**So that all, tất cả mọi thông tin mà ta còn có thể đọc từ code ==> giờ tiếp theo ta vọc thử xem nó có gì**

## II. Khai thác (Exploit):
Đầu tiên ta sẽ đến với cái route (/ssti) thì thử gõ một cái url với ssti xem nó báo lỗi gì (có lỗi chớ vì nó yêu cầu cái query mà mình không truyền vào 😞 `http://puzzler7.imaginaryctf.org:3002/ssti`
    
![[Pasted image 20240219150018.png]]
- Trước hết trong framework web của python (có 2 cái to to : Django + Flask) nó có tích hợp một nền tảng hoặc là quy ước [WGSI](https://en.wikipedia.org/wiki/Web_Server_Gateway_Interface) nôm na là điều hướng để forward các request từ web server tới web application hoặc các framework của python (nhiều ngôn ngữ khác nữa không chỉ riêng python), trong cái wiki nó có viết một cái WGSI ***"WSGI was thus created as an implementation-neutral interface between web servers and web applications or frameworks to promote common ground for portable web application development"*** (có thể hiểu là WGSI nó là interface trung lập giữa web server và web app để thúc đẩy nền tảng cho sự phát triển).
- Okay sau khi ta biết wgsi là gì thì ta có thể xem trong cái debug mà chương trình nó đổ ra ta có thể thấy flask nó dùng một cái wgsi tên werkzeug và cái điều hướng cũng như về proxy thì nó làm và werkzeug là một wsgi được tính hợp sẵn trong flask, theo debug nó đổ về một cái traceback (cây lỗi) và nó báo xám tại cái dòng bị lỗi trong code ở đây ra có thể khai thác được 2 thứ
![[Pasted image 20240219150108.png]]

- Theo như cái hình ta có thể thấy được là werkzeug nó cho ta debug trực tiếp code đó trên web luôn :clap:, điểu đó có thể hiểu là việc bật debug này nó cho phép ta mở một console code trực tiếp để thực thi code python ngay trên web. Như nó nói thì có thể click vào cái icon ngày bên cạnh cái dòng lỗi ở cái traceback hoặc là ta có thể trực tiếp vào console thông qua route(/console) `http://puzzler7.imaginaryctf.org:3002/console`

-   [Werkzeug exploit](https://book.hacktricks.xyz/network-services-pentesting/pentesting-web/werkzeug) đây là một trang ta có thể xem được các thông tin mà ta khai thác được đối với WGSI này. Trong một cái trường hợp thì tụi nó có một cách để khóa ta lại nó là dùng mã PIN (như đã nói ở trên mã PIN không tuyệt đối an toàn và mã pin bằng cách mà cái link nó chỉ cách bẻ là reverse lại cái algo mà generating ra cái PIN đó), **Nhưng mà đối với bài này ta không cần phải nhập mà PIN vì nó được config với flask là không cần phải nhập debug pin và được phép tương tác trực tiếp với console này**.

![[Pasted image 20240219150200.png]]
![[Pasted image 20240219150226.png]]
- Ta sẽ thử tương tác những câu lệnh để xem nó trả về cho ta được gì
![[Pasted image 20240219150239.png]]
- Ta có thể thấy tương tác tốt với các command với máy chủ đầu tiên ta đi lấy cờ trước thì không hiểu chủ đích thể nào mà ta không có được file là flag mà họ lại đặt là man_this_sure_is_an_odd_name_for_a_flag_file (hơi bị 3 chấm ...) mà thôi cat file đó thì ta được
```python
>> __import__('os').popen('cat man_this_sure_is_an_odd_name_for_a_flag_file').read();
    'ictf{oops_I_left_my_debugger_on_I_need_to_run_home_before_my_webserver_burns_down}'
>>
```

**Okay sau đây ta đã tìm được flag trong bài này ta có thể thấy được là để debug mode on trên web là risk thế nào. Nói chung là bài này có thể có cách giải khác hay không thì phải đợi writeup khác thử ... HappyHacking !!!** 👏👏👏
## III. Dockerfile và Docker-compose tậu về xài và mã nguồn để build lại:

```dockerfile
FROM ubuntu:20.04
RUN apt-get update -y && apt-get install -y python3-pip python3-dev
WORKDIR /app
RUN pip3 install flask
COPY . /app
RUN chmod 555 /app
ENV WERKZEUG_DEBUG_PIN=off
USER 1000:1000
ENTRYPOINT [ "python3" ]
CMD [ "server.py" ]'
```

```yaml
version: '3.3'
services:\n  hostility:\n    deploy:\n      resources:\n        limits:\n          cpus: '0.     001'\n          memory: 50M\n        reservations:\n          cpus: '0.0001'\n          memory: 20M\n    build: .\n    network_mode: bridge\n    restart: always\n    ports:\n      - 3002:3002\n    cap_drop:\n      - all\n    cap_add:\n      - chown\n      - setuid\n      - setgid\n      - sys_admin\n    security_opt:\n      - apparmor=unconfined\n      - seccomp=unconfined\n"
```       

*Mã nguồn lưu lại hồi không có mà tìm*
```python
#!/usr/bin/env python3

from flask import Flask, render_template_string, request, Response

app = Flask(__name__)

@app.route('/')
def index():
	return Response(open(__file__).read(), mimetype='text/plain')

@app.route('/ssti')
def ssti():
	query = request.args['query']
	if len(query) > 2:
		return "Too long!"
	return render_template_string(query)

app.run('0.0.0.0', 3002, debug=True)
```