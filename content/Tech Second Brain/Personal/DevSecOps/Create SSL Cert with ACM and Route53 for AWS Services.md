---
title: Create SSL Cert with ACM and Route53 for AWS Services
tags:
  - cloud-services
  - aws
  - ssl
  - devops
  - usage
---
>[!quote]
>Hi @all, this week is not special at all, how about you guy, hope you feel well and chill. This week is so busy, so I don't have mood to continue `kubewekend` in this week, maybe back to next week. But forgive me and instead of this, we will learn something around AWS and free about how to serve your `SSL` from AWS for your domain. Let's digest everyone 🙌

# AWS Certificate Manager and Route53

![[aws-certificate-manager.png]]

With the demand of user of Cloud, for managing consistently everything inside your service from network, virtual machine, domain. Therefore, Cloud platform always  try to integrate at least one service which customer of them can configure and manage their domain from root to subdomain with easily. This reason why we have `route53` and `acm` of AWS
## AWS Certificate Manager (ACM)

Official documentation

- [User Guide](https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html)
- [API Reference](https://docs.aws.amazon.com/acm/latest/APIReference/Welcome.html)
- [ACM with CLI](https://docs.aws.amazon.com/cli/latest/reference/acm/index.html)

>[!info]
>AWS Certificate Manager (ACM) handles the complexity of creating, storing, and renewing public and private SSL/TLS X.509 certificates and keys that protect your AWS websites and applications.

And conveniently, ACM help you [integrated AWS services](https://docs.aws.amazon.com/acm/latest/userguide/acm-services.html) either by issuing them directly with ACM or by [importing](https://docs.aws.amazon.com/acm/latest/userguide/import-certificate.html) third-party certificates into the ACM management system, such as `CloudFlare` - which one I will relate on the practice part.

ACM can help customers issued type of domain, such as

- Singular domain names (E.g. `xeusnguyen.abc`)
- Multiple specific domain names (E.g. `xeusnguyen.abc`, `xeusnguyen.xyz`, `xeusnguyen.io`)
- Wildcard domains (E.g. `*.xeusnguyen.abc`)

If you want to figure out what different between SAN/UCC Domain and Wildcard Domain, you can try to read these articles

- [Sự khác nhau giữa chứng chỉ Wildcard và Multi-Domain (SAN/UCC)](https://cer.vn/news/kien-thuc/su-khac-nhau-giua-chung-chi-wildcard-va-multi-domain-san-ucc/)
- [Wildcard SSL vs Standard SSL: What’s The Difference?](https://sectigostore.com/page/wildcard-ssl-vs-standard-ssl-whats-the-difference/)
- [Wildcard SAN Certificates – All You Need to Know Before Buying](https://sectigostore.com/page/wildcard-san-certificates/)

This will have multiple questions, and you can try to read about that via old articles of mine inside the security topic [[Web fundamentals#Domain Hierarchy|Web fundamentals - Domain Hierarchy]]

![[Pasted image 20240811105457.png]]

So with ACM you can request two type issued via

- Request a public certificate
- Request a private certificate (Enterprise)

Via ACM, you received a lot of characteristic and useful from this one, read more at [ACM certificate characteristics](https://docs.aws.amazon.com/acm/latest/userguide/acm-certificate.html)

- **Certificate authority and hierarchy**
- **Browser and application trust**
- **Intermediate and root CA rotation**
- **Firewall access for revocation**
- ...

>[!quote]
>All of these make ACM become potential when user of AWS want to work with their domain and certificate inside AWS Cloud

So how about **Route53**

## AWS Route 53

Official Documentation:

- [User Guide](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/index.html)
- [API Reference](https://docs.aws.amazon.com/Route53/latest/APIReference/index.html)
- [Extend Guide](https://docs.aws.amazon.com/route53/)

![[aws-route53.png]]

To help create location where control and create new record for your domain, Route 53 will take responsibility to handle this task

>[!info]
>Amazon Route 53 is a highly available and scalable Domain Name System (DNS) web service. You can use Route 53 to perform three main functions in any combination: domain registration, DNS routing, and health checking.

If you want to start with Route53, you need to ensure

- **Register domain names**
- **Route internet traffic to the resources for your domain**
- **Check the health of your resources**

Read more about this one via [What is Amazon Route 53?](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html)

With me `Route53` is really kind simple, you create the record inside and attached them for your service, and be easily use. To make this come true, you will need learn about network with domain, and try to learn about what record you can create and implement

- [[Web fundamentals#Record Types|Web fundamentals - Record Types]]
- [List of DNS record types](https://en.wikipedia.org/wiki/List_of_DNS_record_types)
- [Common DNS Records](https://support.dnsimple.com/articles/common-dns-records/)

>[!question]
>If you can make sure everything is work, now we can reach to practice part and try to learn about issuing your own certificate with `Route53` and `ACM` for free, attaching that on example website and figure how they work

# Practice with AWS

So before you start, at least to say you need to have at least domain for doing this practice and totally it not free, but you can find and deal your own domain with cheap at

- [GoDaddy](https://www.godaddy.com/en-sg/domains)
- [NameCheap](https://www.namecheap.com/domains/)
- [Squarespace](https://domains.squarespace.com/)
- [Matbao - Vietnamese](https://www.matbao.net/)
- [NoIP](https://www.noip.com/domains)

>[!info]
>You can to use DDNS - for free but I think you will not have permission if you don't pay something for owner domain like enhanced DDNS, ...

If you have your domain let back to AWS, and try to create `ACM` and `Route53` with AWS Portal or you can try with AWS CLI. Read about [[Awesome AWS Cloud|AWS Cheatsheet and Troubleshoot]] to figure out way to create for own AWS account

Try to search `Certificate Manager`

![[Pasted image 20240811111905.png]]

And now try click to `Request Certificate` in left side, and you can choose request a public certificate

![[Pasted image 20240811105457.png]]

Now click `Next` and provide your information before create your `certificate` with domain

![[Pasted image 20240811112247.png]]

If you feel pleasure with your information, Click `Request` on bottom of page to create new one for yourself

![[Pasted image 20240811112427.png]]

>[!info]
>Next create for your own `Route53` with valid domain with ACM, for example I use wildcard domain `*.example.xeusnguyen.xyz` and just need to create `Route53` with contain subdomain in first level `example.xeusnguyen.xyz`

Search `Route53` and click to select this service

![[Pasted image 20240811120758.png]]

Reach to `Hosted Zones` and create new one with valid domain which relate above

![[Pasted image 20240811120854.png]]

Now click to `create hosted zone` for creating for new one

![[Pasted image 20240811120950.png]]

>[!quote]
>As you can see, this `Route53` after create will give us 2 record, and focus on NS (Name Server) Record because this one is an important factor to delivery traffic from place where control your domain to AWS and receive the issued certificate

In my situation, I use `Cloudflare` for controlling my domain, so we will need to configure NS (name server) record with 4 value in **Route53** to **Cloudflare** record dashboard with corresponds to domain in **Route53** (e.g. example.xeusnguyen.xyz) 

![[Pasted image 20240811121800.png]]

And try to add 4 value to Cloudflare, and you will complete on the first step of get the validate certificate inside ACM

![[Pasted image 20240811122122.png]]

>[!info]
>Currently, your traffic from your root domain is route to AWS and managed by Route53, and one more step need is add `CNAME` record of issued to Route53 and help ACM can validate you have own that domain, and can help you validate. This progress can take long from 1m - 10m or more, but usually in that range.

Try to click `Create records in Route 53` to help you automatic create `CNAME` record inside dashboard of Route53 with corresponds domain. (NOTE: You can copy name and value of CNAME inside ACM to handling manually)

![[Pasted image 20240811122351.png]]

![[Pasted image 20240811122550.png]]

Click `Create records` to add your record to Route53 record dashboard

![[Pasted image 20240811122809.png]]

And wait to see the state change from pending to issue, you can successfully create and manged your domain and certificate with Route53 and ACM

If you wait over 10 minute, next action you need create again ACM and submit your CNAME record again but before delete the current record

![[Pasted image 20240811124306.png]]

You just need to wait 1 minute before your domain is issued by ACM, very tough and confuse, I know but you integrate 3rd party inside and about connect and validate between of them will have problem. But on lastly you have your `ACM` for yourself with your own domain, and it totally free

>[!warning]
>To prevent mistake or wait to long, you can create `Route53` first and copy NS record to your cloudflare and reach to create ACM because I think that right path for every working 😄

# How to use ACM with Route53

Basically, ACM will permit only for AWS services with can define to use ACM, such as

- **AWS Amplify**
- **Amazon API Gateway**
- **AWS App Runner**
- **AWS CloudFormation**
- **Amazon CloudFront**
- **Amazon Cognito**
- **AWS Elastic Beanstalk**
- **Elastic Load Balancing**
- **AWS Network Firewall**
- **AWS Nitro Enclaves**
- **Amazon OpenSearch Service**

>[!quote]
>And that reason why you can't use this certificate and domain for your external services

Therefore, you can take the example of previous article about [[Atlantis with ECS for automatic provisioning]] on the domain

After provision inside `Atlantis.tf`, you can gentlely add your `ACM` certificate inside this Atlantis, and create add-on **CNAME record** corresponds to Atlantis and Elastic Load Balancer

You can try other project via this articles to help you understand more ACM, and try concept with difference services

- [Bring your own SSL certificate to AWS Amplify Hosting](https://aws.amazon.com/vi/blogs/mobile/custom-ssl-amplify-hosting/)
- [Securing Amazon Elastic Container Service applications using Application Load Balancer and Amazon Cognito](https://aws.amazon.com/vi/blogs/containers/securing-amazon-elastic-container-service-applications-using-application-load-balancer-and-amazon-cognito/)
- [LocalStack Certificate Manager (ACM)](https://docs.localstack.cloud/user-guide/aws/acm/)

# Conclusion

>[!done]
>That @all for this week, not long and not short, hope you have image what you need to do for create ACM and control record of domain via Route53. I know that have more article around there but I am being stuck with these one, and yeah try to save as memory and contribute is best way to handle that 😄

>[!quote]
>Leverage with the thing we have and make the difference, that why I try to make concept this one topic and hope that deliver to you somethings LOL. Therefore, I hope you and your family have the good weekend, stay safe, learn something new and I will back to next week. Now, bye and see yahhhhhh !!!!! 





