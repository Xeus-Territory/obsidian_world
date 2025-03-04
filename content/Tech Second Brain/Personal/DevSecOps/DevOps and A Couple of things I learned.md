---
title: DevOps và những điều tôi học hỏi được
tags:
  - devops
  - devsecops
  - story
---

>[!quote]
>Hi @all, how is your day ? It's a special week, I have invited to become a guest of workshop of my old club, and I'll share about DevOps, DevSecOps and A couple things I learned after 3 years in this fields. Because I think I can't cover and share most of things to DevOps, career and what technologies and driven of anything, I just follow and point the difference ways to help you distinguish with another DevOps Engineer. I want to share this articles in Vietnamese for easier approaching of new person who want to get closer with this field. Let's digest !

![[meme-awesome.png|center]]


>[!quote]
>Hi mọi người, một lần nữa một blog được viết bằng Tiếng Việt để dễ tiếp cận và đây là câu chuyện của cá nhân, và là hành trình của mình khi học và trở thành DevOps Engineer, thì mình sẽ trả lời câu hỏi của các bạn và chỉ ra đâu là những gì sẽ giúp các bạn trở nên khác biệt, theo ý kiến chủ quan của mình, có thể đúng và có thể sai nhưng hi vọng mọi người sẽ có những trải nghiệm đáng nhớ và hi vọng chúng ta có thể làm đồng nghiệp trong một thời gần tới nha. Giờ thì bắt đầu.

À Xin chào mọi người, Mình là Nghĩa, cựu thành viên của CLB ATTT và hôm nay có cơ hội để share với mọi người về trải nghiệm học và làm DevOps của mình, rất cảm ơn tới Thông và Lộc đã cho anh cơ hội để share với mọi người như này, cảm ơn thầy Ly đã dẫn dắt và có được CLB như ngày hôm nay và cảm ơn mọi người đã tạo điều kiện cho mình được đứng và chia sẻ câu chuyện của mình.

Mình hiện đang làm DevOps Engineer, đồng thời còn là tech blogger của Medium, một số thông tin của mình ở dưới nha

- Website cá nhân: https://wiki.xeusnguyen.xyz/
- Medium: https://medium.com/@XeusNguyen
- GitHub: https://github.com/Xeus-Territory
- Youtube: https://www.youtube.com/@xeusnguyen

Để dễ dàng tiếp cận, thì mọi người có thể truy cập một số resource mà mình có dẫn link để tìm hiểu thêm về DevOps nha, nó sẽ rõ ràng và chi tiết hơn

Articles

- [[All Blogs#DevOps - Tutorials from zero to hero|DevOps - Tutorials from zero to hero|]] - Series được viết lại thông qua quá trình khi mình học và tiếp cận Devops
- [devops-exercises](https://github.com/bregman-arie/devops-exercises) - For who want to start with DevOps journey
- [DevOps-Roadmap](https://github.com/milanm/DevOps-Roadmap): DevOps Roadmap with learning resources. contents by Milan **(Legit Recommend)**

Videos

- [TechWorld with Nana](https://www.youtube.com/c/TechWorldwithNana/featured): She teaches about roadmap to dive into DevOps
- [That DevOps Guy](https://www.youtube.com/@MarcelDempers/videos): A solutions Architect and my passions are platform architecture, distributed systems engineering ,micro-services, containers and cloud native technology.
# DevOps là gì ? Tại sao lại là DevOps mà không phải điều gì khác

![[thumbnail-devops.png]]

Trước hết nếu mọi người đề cập tới DevOps, thì giống như trên hình mọi người sẽ phải tiệp cận với từng đó khái niệm để có thể thực sự cover được DevOps (mình đùa thôi), thực ra tool nó không phải là thứ thiết yếu mà cái quan trọng khi để trở thành 1 DevOps Engineer đó là cái gốc nhìn và tư duy thiết kế hệ thống của mọi người.

>[!info]
>Do đó với mình, DevOps nó không hẳn là một vị trí mà nó là một văn hóa, một cách tiếp cận mà thế giới đang thực sự để tâm nhất là trong thời buổi AI xuất hiện, mọi hệ thống đều ngày càng trở nên phức tạp, DevOps giúp tối ưu hóa chu trình release của một sản phẩm khi DevOps chính là cơ chế để tự hóa tất cả công việc, đảm bảo tính nhất quán cao và từ đó cho phép đẩy nhanh sự phát triển của một dự án.

Thực ra không có một quy chuẩn nào để có thể thực sự hiểu DevOps Engineer như nào ở thời nay, vì định nghĩa này đã bị gắn cho rất nhiều kĩ thuật, nhập nhằn và rất phức tạp, như

- Cloud Engineer
- Platform Engineer
- DevOps Engineer
- SRE

Nhưng hãy tìm hiểu về những khái niệm về DevOps và các nhánh khác của DevOps để hiểu rõ được mọi người sẽ phải làm gì để có thể theo hướng đó, đồng thời có những khái niệm mà ta sẽ phải tiếp cận

- [Dynatrace - What is DevOps? Unpacking the purpose and importance of an IT cultural revolution](https://www.dynatrace.com/news/blog/what-is-devops/)
- [Medium - What is DevOps?](https://medium.com/featurepreneur/what-is-devops-761d7b9d7b1c)
- [Razorops - Role and responsibelities of DevOps, SRE, Platform Engineering, and Cloud Engineering](https://razorops.com/blog/role-and-responsibelities-of-devops-sre-platform-engineering-and-cloud-engineering)
- [Youtube - DevOps vs SRE vs Platform Engineering | Clear Big Misconceptions](https://www.youtube.com/watch?v=an8SrFtJBdM&ab_channel=ByteByteGo)

Trong các quy trình của một DevOps Engineer thì mọi người sẽ phải học và build up rất nhiều kĩ năng của một software engineer, bao gồm

1. Tìm tòi và học hỏi

	- Đây là điều thực sự quan trọng vì đây là nguồn để giải quyết mọi về đề
	- Khai phá và giúp mọi người tiếp cận được sâu vào bên trong hạ tầng của sản phẩm

2. Coding và lập trình

	- Thực ra cái này có cũng được nhưng không cũng chẳng sao, nhưng để hiểu nguồn cơn vấn đề thì một chút code sẽ thật sự quan trọng
	- Những ngôn ngữ khuyên khích nên học: Python, Go. Tụi này hỗ trợ tốt cho các dịch vụ liên quan đến Server

3. Networking

	- Đây là cách mà thế giới Internet vận hành và khái niệm của tất cả những công nghệ những gì mà mọi người có được bây giờ
	- Sự thật không thể nào chỉ dùng mỗi local nếu sản phẩm muốn public, thi việc học những khái niệm của Networking rất quan trọng, chẳng hạn: OSI, TCP/IP, DNS, TCP, UDP, HTTP, HTTPS, SSH, ...
	- Luôn nhớ rằng tất cả đều hoạt đồng và bắt nguồn từ một IP và một Port

4. Linux, Server và Scripting

	- Đây là môi trường mà mọi người sẽ làm việc hằng ngày, việc trang bị cho mình những kiến thực về Linux, về shell script và những fundamental bên trong một server rất quan trọng vì đó chính là cách mà mọi người tạo ra sự khác biệt.
	- Biết kiểm soát và hiểu những gì mình thực sự làm, đừng copy, chậm lại và hiểu những câu lệnh mình viết, nó sẽ thực sự là những gì khác biết giữa các DevOps.
	- Ngoài ra, viết có những công cụ trên chính shell của cá nhân sẽ giúp ích mọi người dùng Linux và các server một cách hiệu quả hơn, chẳng hạn customize lại ZSH

5. Tools và Công nghệ

	- Thực ra phần này là cái khó nhất, những cũng là phần thú vị nhất khi làm một DevOps khi mà bạn phải là người đề xuất ra giải pháp và tìm cách triển khai chúng lên thực tế để sử dụng
	- Đừng cố rơi vào pitfall là học tất cả mọi thứ, chẳng ai làm được điều đó cả, mọi người nên có những ý tưởng làm chủ một công nghệ cốt lõi trong hàng trăm tool đó và sử dụng nó một cách thành thạo khi đó khác biệt sẽ đến
	- Hãy mổ sẽ bài toán và cân nhắc độ phực tạp khi sử dụng Tools và công nghệ, hay biết chắc rằng nó sẽ hoạt động, đừng tạo tech debt vì điều đó sẽ rất khó để thay đổi trong tương lai

6. Cloud

	- Đây là câu chuyện chi phí và rất nhiều vấn đề phát sinh, nhưng đây cũng chính là môi trường mà các doanh nghiệp tiếp cận từ đâu, hãy cố gắn chọn và làm chủ 1 trong 3 cloud cốt lõi để có thể bắt đầu build up tư duy thiết kế, bao gồm Azure, AWS và GCP
	- Tiếp cận Cloud trên phương diện là tìm tòi và học hỏi, Cloud sẽ rất phức tạp cho những anh em nào mới bắt đầu, có một vài cốt lõi mình rút ra

		- Azure: Khi anh em muốn làm Containerization, như Container App, Kubernetes
		- AWS: Khi nào anh em muốn dùng các dịch vụ về xử lý sự kiện, như Lambda, SQS, SNS
		- GCP: Khi nào anh em muốn tiếp cận về AI và các dịch vụ AI của Google hãy sử dụng nó như Vertex, GPU machine

7. System Design and Architecture

	- Khi mọi người đã tiếp cận đủ thì đây gần như layer cuối để mọi người design một hệ thống hoàn chỉnh, có những kĩ thuật cao về Infra như High Availability, Scaling, Caching, ...
	- Việc build một hạ tầng và sử dụng các tool một cách thông minh sẽ giúp anh em có thể tiếp cận một cách dễ dàng hơn với việc xây dựng một hạ tầng, thời gian sẽ rất nhanh và tương đối dễ dàng khi mọi người đã thực sự quen.


>[!info]
>Đó là tất cả những gì mình đã và đang tiếp tục trau dồi khi làm một DevOps Engineer, đây là một cơ hội cho mọi người khi đã chọn DevOps để theo đuổi, nó sẽ rất phức tạp trên một phương diện nào đó nhưng sẽ giúp mọi người hiểu cách một hạ tầng nó hoạt động ra sao đôi khi nó sẽ còn nhanh hơn là khi mọi người viết code để phục vụ hạ tầng đó

Những lý do khiến bản thân trở thành DevOps có hay không, có thể gồm việc bạn muốn

- Tìm hiểu và đào sâu về các hệ thống,hiểu và khám phá những thành phần để tạo nên sự khác biệt đối với trải nghiệm người dùng
- Thích công nghệ và vận dụng công nghệ để phục vụ cho các mục đích nghiên cứu, phát triển để từ đó đem lại nguồn lợi cho các dự án
- Va chạm và có nhiều thử thách, đối với một DevOps Engineer việc các vấn đề phát sinh là không hiếm và nhiều khi rất phức tạp, đó là lúc bản thân sẽ thực sự phát triển để có thể đương đầu với các tình huống như vậy
- Cơ hội giao lưu, hợp tác và phát triển không ngừng vì môi trường tiếp xúc sẽ đòi hỏi nhiều vấn đề kĩ thuật để từ đó tạo ra cho mình những kinh nghiệm, tư duy để có thể xúc tiến bản thân tiếp tục tiến lên.

# Lộ trình để trở thành 1 DevOps ? Đâu là thứ sẽ tạo nên sự khác biệt

![[thumbnail-devops-skill.png|center|600]]

Follow các roadmap để có thể hiểu rõ hơn làm thế nào để có thể tiếp cận DevOps trong năm 2025

- [DevOps-Roadmap](https://github.com/milanm/DevOps-Roadmap): DevOps Roadmap with learning resources. contents by Milan **(Legit Recommend)**
- [DevOps Roadmap](https://roadmap.sh/devops): Step by step guide for DevOps, SRE or any other Operations Role in 2025

Về vấn đề các yêu cầu và kĩ năng của DevOps, thông thường sẽ chia ra làm 2 loại

- **Về Tech**: Khả năng làm việc với công nghệ, thiết kế hệ thống, xây dựng tính sẵn sàng, mở rộng, ...
- **Về Softskill**: Khả năng giao tiếp, kết nối các đồng nghiệp trong team, biết xây dựng văn hóa học hỏi và trau đổi để làm tiền đề đưa DevOps vào trong dự án

## Đối với Tech

1. Làm chủ vấn đề nền tảng, đây chính là cơ sở để tạo nên các công nghệ khác, bao gồm: Networking và Programming. Những resource bạn có thể tiếp cận

	- [Networking for DevOps](https://devopsvn.tech/networking-for-devops)
	- [Python for DevOps: A Comprehensive Guide from Beginner to Advanced](https://dev.to/prodevopsguytech/python-for-devops-a-comprehensive-guide-from-beginner-to-advanced-2pmm)

2. Trau đồi các kĩ năng quản lí source code để có thể dễ dàng thao tác và kiếm soát các vấn đề vận hành trong một dự án, đây sẽ giúp mọi người dễ dàng collab với nhiều team member của mình, chẳng hạn như `Git` hoặc `Apache Subversion`. Những resource để bạn tiếp cận

	- [Learn Git with tutorials, news, and tips](https://www.atlassian.com/git)
	- [Git fundamentals, a complete guide](https://dev.to/leandronsp/git-fundamentals-a-complete-guide-do7)
	- [How to Learn Git for DevOps: Beginners Git Roadmap](https://devopscube.com/git-for-devops/)

3. Tiếp cận các hệ điều hành, bao gồm 3 OS chính `Mac`, `Linux` và `Windows`. Trong đó, `Windows` tương đối đặc thù và bạn cần phải trau đổi `Powershell` để thực sự thao tác với `Windows`, nhưng `Linux` và `Mac` thì lại dùng chung kiến trúc `Unix` và điều bạn cần thực sự tiếp cận đó là `Shell` script, học và trau đổi cũng như sử dụng các công cụ sẵn có trên hệ điều hành để có thể tăng khả năng làm việc cũng như debug. Một số resource mà các bạn có thể tiếp cận

	- [PowerShell Commands: 50+ Every Developer Should Know](https://stackify.com/powershell-commands-every-developer-should-know/)
	- [100 Essential Commands, Scripts, and Hacks : The DevOps Engineer’s Survival Guide](https://medium.com/@osomudeyazudonu/the-devops-engineers-survival-guide-100-essential-commands-scripts-and-hacks-661c75fd0a41)
	- [Linux command in DevOps](https://www.geeksforgeeks.org/linux-command-in-devops/)
	- [DevOps Automation with Shell Scripting](https://dev.to/prodevopsguytech/devops-automation-with-shell-scripting-1p69)

4. Học và tiếp cận với containerization tools và xây dựng cho mình tư duy đóng gói dự án, sử dụng các tools phổ biến như [Docker](https://www.docker.com/), [Podman](https://podman.io/), để từ đó dễ dàng triển khai và vận hành sản phẩm ở nhiều máy chủ khác nhau

	- [Docker là gì?](https://viblo.asia/p/devops-docker-phan-1-docker-la-gi-3P0lPJa8Kox)
	- [Exploring Docker for DevOps: What It Is and How It Works](https://www.docker.com/blog/docker-for-devops/)
	- [Podman - Công cụ thay thế Docker](https://devopsvn.tech/devops/podman-cong-cu-thay-the-docker)

5. Làm chủ cho mình một loại web server (hoặc là API Gateway) để có thể dễ dàng triển khai và kiểm soát các luồng traffic trong hạ tầng, chẳng hạn như `Nginx`, `Apache2` hoặc `Caddy` để từ đó các bạn sẽ học được các kĩ thuật về `Load Balancer`, `DNS`, `SSL`, `Upstream`, ... Một số nguồn tài liệu để tiếp cận

	- [NGINX For Devops Engineers](https://ghazanfaralidevops.medium.com/nginx-for-devops-engineers-b73c9ce5ccb8)
	- [Nginx - Beginner’s Guide](https://nginx.org/en/docs/beginners_guide.html)
	- [NGINX Configuration: Tìm hiểu về context NGINX configuration cho người mới](https://vietnix.vn/nginx-configuration/)

6. Tiếp xúc với Cloud và chọn cho bản thân một hướng đi đầu tiên khi sử dụng Cloud Service, nếu tập trung vào các doanh nghiệp để tiếp cận thì nên là 3 cloud top bao gồm `Azure`, `AWS` và `GCP` nhưng để học các concept của cloud thì các cloud nhỏ hơn cũng tốt không kém như `Digital Ocean`, `Akamai` hoặc `Hertzner`. Ở cloud chúng ta cần nên tập trung nắm vựng các nguyên lý về network (VPC), authentication (IAM), storage (S3), virtual machine (EC2), Database (RDS), Function (Lambda), ... Để tiếp cận ta có thể tìm hiểu

	- [Technology choices for Azure solutions](https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/technology-choices-overview)
	- [DevOpsVN - AWS Practice](https://devopsvn.tech/aws-practice)
	- [DevOpsVN - Azure](https://devopsvn.tech/azure)

7. Khi đã nắm về các bước giao tiếp trên cloud, mọi người sẽ tiếp xúc với IaC để có thể tối ưu khả năng kết nối và quản lí infrastructure trên Cloud ở dưới dạng code, đơn giản hóa việc dựng và thay đổi dựa trên các versioning. Công cụ mạnh nhất ở hiện tại là Terraform, ngoài ra còn có OpenTofu, Pulumi, ... Tìm hiểu thêm về link ở dưới

	- [Complete Guide On DevOps Terraform (2024)](https://zeet.co/blog/devops-terraform)
	- [DevOpsVN - Terraform](https://devopsvn.tech/terraform-series/terraform)

8. Nếu tiếp tục học về các công nghệ container service, thì Kubernetes chính là thử thách tiếp theo, khi này chúng ta sẽ có khái niệm mới là Container Orchestration, để điều hành và điều phối các Container với Kubernetes trên nhiều cụm máy chủ. Tài nguyên để tiếp cận như

	- [Kubernetes examples](https://k8s-examples.container-solutions.com/): A series of YAML references with canonical and as-simple-as-possible demonstrations of kubernetes functionality and features.
	- [Medium - HomeLab Kubernetes Cluster Setup](https://cavecafe.medium.com/setup-homelab-kubernetes-cluster-cfc3acd4dca5)
	- [Medium - Kubernetes, but locally.](https://medium.com/@mosesmbadi/kubernetes-but-locally-aa5fbd671763)

9. Sau khi đã tìm hiểu và quản lí được các tác vụ như IaC, Containerization, Orchestration thì lúc này mọi người sẽ tìm hiểu về CI/CD Pipeline để có tự động tất cả công việc ở trên, đây là một trong những công việc quan trọng và có thể ảnh hưởng trực tiếp đến một dự án. Tài nguyên để học chẳng hạn

	- [How to build a CI/CD pipeline with GitHub Actions in four simple steps](https://github.blog/enterprise-software/ci-cd/build-ci-cd-pipeline-github-actions-four-steps/)
	- [Mastering GitHub Actions for DevOps Engineers: A Complete Guide from Beginner to Advanced](https://dev.to/prodevopsguytech/mastering-github-actions-for-devops-engineers-a-complete-guide-from-beginner-to-advanced-2lc1)

10. Để có thể dễ dàng và nhanh chóng thì chúng ta sẽ cần một hệ thống mới để cảnh báo và quan sát trong hệ thống, khi đó chúng ta sẽ phải tiếp cận với concept monitoring and observability, đồng thời alert, chẳng hạn với các stack như Grafana, Prometheus, ELK, ... Một số nguồn để ta có thể tiếp cận chẳng hạn

	- [Medium - Observability Series: A Step-by-Step Guide to Logs, Traces, and Metrics](https://medium.com/gitconnected/observability-series-a-step-by-step-guide-to-logs-traces-and-metrics-9860d7c46220)
	- [Devops Training Session 16: Setup Observability for Kubernetes](https://hackmd.io/@XeusNguyen/rJk0lunAj)


11. Khi này chúng sẽ học về các concept hạ tầng, cũng như đào sâu về các vấn đề hệ thống như High Availability, Fault Tolerance, Caching, Serverless, ... Chúng ta có thể tìm hiểu thêm ở dưới đây
	
	- [Medium - Top 10 System Design Concepts Every Programmer should learn](https://medium.com/javarevisited/top-10-system-design-concepts-every-programmer-should-learn-54375d8557a6)
	- [Dev.to - The Software Design /System Design Interview Preparation RoadMap (with Resources)](https://dev.to/somadevtoo/the-software-design-system-design-interview-preparation-roadmap-with-resources-1no0)


## Đối với SoftSkill

Đây cũng là tập kĩ năng quan trọng không kèm để phối hợp tốt với kĩ thuật, chẳng hạn như chúng ta sẽ tập làm quen với việc

- Làm việc với nhiều con người trong một nhóm, chúng ta sẽ rèn các thoái quen giao tiếp và các để giải quyết vấn đề. Chẳng hạn đôi khi ta làm việc với nhiều team khác nhau trong 1 dự án, thì ta sẽ tiếp cách để giao tiếp và giải quyết vấn đề
- Luyện tập khả năng lắng nghe, để muốn biết và tiếp thu nhiều hơn đôi khi lắng nghe chính là cách tốt nhất để mình học hỏi
- Xây dựng tư duy về hệ thống dựa trên hiểu biết và đồng thời phản biện cũng như bảo vệ quản điểm khi thực hiện xây dựng về hệ thống
- Quán trị thời gian cũng là một trong những điểm quan trọng của DevOps, vì DevOps tương đối đặc thù khi công việc sẽ đến rất bất chợt nên phải có cơ chế để ứng phó

Để hiểu rõ hơn chúng ta có thể tìm hiểu ở một số resources

- [Medium - 10 Soft Skills for DevOps Engineer You Need To Develop From Day 1](https://medium.com/devops-mindset/important-soft-skills-for-devops-engineers-29cd348e4c64)
- [Zesty - 5 Habits of Successful DevOps Engineers](https://zesty.co/blog/soft-skills-devops-engineer/)

## Vậy làm thế nào để tạo nên sự khác biệt

![[meme-gg.png|center]]

Đây là một câu hỏi khó nhưng ta vẫn có thể giải quyết được bằng cách

- Làm DevOps, ta sẽ phải biết nhẫn nhịn, lắng nghe chính là cách mà ta có thể giải quyết tốt mọi thứ.
- Tools không phải là thứ quan trọng, quan trọng đến từ phía bên trong những suy nghĩ, cách mà ta giải quyết vấn đề và tiến hành nó ra sao, tools sẽ là thứ đi sau chớ không quyết định tất cả mọi thử
- Luôn luôn tò mò để mình đào sâu vào được hệ thống, đặt câu hỏi cách mà một ứng dụng nó chạy thế nào để từ đó ta có thể có nhiều Keyword để tiếp cận hạ tầng, debug
- Xây dựng cho mình một bộ skill về fundamental, nhất đối với DevOps đó là Networking, Linux, đây chính là hai nhân tố giúp ta có thể cải thiện được rất nhiều quá trình tự động hóa, cách mọi thứ được điều hành thông qua scripting cũng như cách mà các thành phần kết nối với nhau
- Khiêm tốn, luôn luôn nhiệt huyết và thành công sẽ đến theo một cách nào đó. Việc mình cần làm đó là tiếp tục cố gắng, xây dựng tốt những kĩ năng đang có và chỉnh sửa bổ sung các phần mình còn thiếu

# Docker và Kubernetes

![[thumbnail-container-service-layer.png]]

## Sự phát triển của Containerization

Về phần này chung ta sẽ phải tiếp cận với nguồn tài nguyên và thông tin rất lớn, để có thể hiểu và tiếp tục tìm kiếm thì có thể tiếp cận như sau

- [[Kubewekend Session 3|Kubewekend Session 3: Basically about Kubernetes architecture]]
- [Docker and Kubernetes: How They Work Together](https://www.docker.com/blog/docker-and-kubernetes/)
- [Kubernetes vs Docker: What’s the difference?](https://www.dynatrace.com/news/blog/kubernetes-vs-docker/)

Đối với vấn đề này chung ta sẽ phải quay lại lý do vì sao mà công nghệ này xuất hiện, thì nó sẽ bao gồm 3 giai đoạn

![[thumbnail-deployment-evolution.png|center]]

- Tradition Deployment: Sử dụng máy chủ để vận hành
- Virtualized Deployment: Sử dụng những thành phẩn ảo hóa để vận hành
- Container Deployment: Sử dụng về các kiến trúc ảo hóa và container hóa để vận hành

Xuyên suốt quá trình hình thành và phát triển của các công nghệ ảo hóa, thì việc quản lí các tài nguyên, hệ điều hành, lớp ảo hóa (HyperVisor) đặt ra nhiều vấn đề và thách thức, chẳng hạn

- Cần nhiều kiến thức về kiến trúc hạ tầng để quản lí tối ưu
- Triển khai các ứng dụng không nhanh, giá thành và thời gian bỏ ra là tương đối lớn

Do đó sự xuất hiện của công nghệ Container, đặc biệt là các runtime đã thay đổi rất nhiều cách tiếp cận vấn đề của Developer ngày này, chẳng hạn

- Tạo ra một ứng dụng có chu kì release, đem lại sự dễ dàng khi tiếp cận và hiệu quả hơn
- Áp dụng được nhiều kĩ thuật để tự động hóa các chu trình, có khả năng rollback bất cứ khi nào cần thiết
- Isolate các môi trường để có thể dễ dàng phân biệt và cấu hình cho nhiều loại môi trường khác nhau
- ...

Tìm hiểu thêm về Containerization Era ở đây

- [[Kubewekend Session 3#Container deployment era|Container Deployment Era]]
- [Kubernetes – Evolution of application deployment](https://learnbyinsight.com/2020/08/09/quick-look-into-kubernetes-docker-saas/)
- [Tại sao ta nên sử dụng kubernetes và nó giúp ta giải quyết vấn đề gì?](https://viblo.asia/p/kubernetes-series-bai-1-kubernetes-la-gi-ORNZqnDql0n#_tai-sao-ta-nen-su-dung-kubernetes-va-no-giup-ta-giai-quyet-van-de-gi-2)

## Vậy tại sao lại có Kubernetes

>[!question]
>Vấn đề được đặt ra, đó là chúng ta sớm nhận ra rằng việc triển khai container cũng có vấn đề riêng, chúng ta không có kế hoạch nào để giữ và tự phục hồi nếu thời gian ngừng hoạt động của container và vấn đề lớn mà bạn không thể sử dụng bộ điều khiển đơn giản như Docker để kiểm soát 1000 container đồng thời, không thể theo dõi hoặc kiểm soát nếu một trong số chúng bị lỗi

![[Pasted image 20240714155227.png]]

Khi đó sự xuất hiện của thuật ngữ orchestration ra đời, và hai cái tên lớn bao gồm

- Kubernetes
- Docker Swarm

Việc xuất hiện của những cái tên này đem lại cho chúng ta nhiều cái lợi bao gồm

- Service discovery and load balancing
- Storage orchestration
- Automated rollouts and rollbacks
- Automatic bin packing
- Self-healing
- Secret and configuration management
- Batch execution
- Horizontal scaling
- IPv4/IPv6 dual-stack
- Designed for extensibility
- And moreover if you have more experience with this technology

Nhưng vấn đề sẽ luôn tồn đọng, đó là những Orchestration này rất phức tạp và cách triển khai cũng đòi hỏi rất nhiều kĩ năng trong việc quản lí, cách tiếp cận và sự phát triển nhanh của chúng, vì thế

- Tiếp cận Kubernetes ở mức độ chừng mực, hãy thực sự hiểu về kiến trúc và cấu tạo của Kubernetes trước khi thực hành
- Nên tập trung vào những thành phần cốt lỗi của một hệ thống Kubernetes hoặc là Swarm, về network, container runtime, container storage, workload trong Kubernetes và Swarm

## Tốt hơn hết Docker và Kubernetes nên đi song hành

![[thumbnail-docker-kubernetes-era.png]]

Tại sạo lại nói vậy bởi vì

- Docker và Kubernetes hướng tới hai scope khác nhau và chúng bổ trợ cho nhau thay, chúng ta nên nhận ra và có sự phân biệt giữa hai công nghệ này
- Trên phương diện Kubernetes, ta sử dụng lại các container image của Docker build ra để sự dụng trong bước vận hành và Deliver, có thể hiểu Docker chính là bước hình thành nên sản phẩm để được điều phối bởi công nghệ Kubernetes

# Chu trình CI/CD và làm sao để tích hợp Sec

Thì đối với việc là một DevOps Engineer, công việc chính của role này đặt ra đó là tự động hóa hoàn toàn một vòng đời sản phẩm (Ở một số thị trường, thì công việc DevOps nhiều hơn 😄) và đặt ra nhiều thách thức khi tiếp cận

## Một chu trình CI/CD hoàn chỉnh

![[thumbnail-cicd.png]]

Thì CI/CD viết tắt cho hai giai đoạn

1. **CI (Continuous Integration)**: Đây là giai đoạn ta kết nối phần code và phần tự động hóa để tạo ra các thành phần cho các bước triển khai và vận hành, bao gồm

	- Build Test: Đó là việc mình sẽ build code ra các thành phần để đóng gói, hiểu đơn giản là build code thành nhưng bundle, lib để kiếm tra xem các thành phần đó có bị lỗi trong qua trình build không
	- Tích hợp các chu trình test vào trong CI như Unit test, Integration test để tăng tính khả dụng, kiểm thử và phát hiện những lỗi sai mà các công đoạn kiểm thử thủ công bỏ sót
	- Build Artifact: Đây là bước quan trọng và hình thành sản phẩm cho bước deployment, có thể Docker Image, Static Code bundle, Library, ...

Luôn nhớ rằng việc chạy CI phải hình thành một artifact cốt lỗi ở bất cứ giai đoạn nào của CI, để từ đó làm tiền đề cũng nhưng giúp chúng ta retrieve chính xác các thông tin và bổ sung nó cho giai đoạn deployment

2. **CD (Continuous Deployment / Delivery)**: Đây là giai đoạn triển khai sản phẩm ở quá trình Build lên môi trường thực tế, bao gồm

	- Kiểm chứng và validate các thành phần của CI, bao gồm Hash artifact, thông tin versioning của artifact, ...
	- Chọn các cơ chế để deployment, thông thường sẽ có rất nhiều cơ chế nhưng ta sẽ chọn kiểu phổ biến như **Rollout Update, tức là sẽ tạo một bản sao và chuyển dời traffic qua thành phần mới trước khi terminate đi cái cũ**
	- Thông báo và validate được môi trường cũng như version đã được deploy thành công hay chưa

Để hiểu rõ mọi người có thể đọc tiếp ở các blog này

- [CI, CD và ... DevOps ???](https://viblo.asia/p/ci-cd-va-devops-07LKXYXDZV4)
- [GitLab - What is CI/CD?](https://about.gitlab.com/topics/ci-cd/)
- [CI CD Pipelines with GitHub Actions](https://www.kerno.io/learn/ci-cd-pipelines-with-github-actions)

## Sự xuất hiện của Sec và trở thành phần quan trọng trong CI/CD

Đối với mọi người ở trong CLB ATTT, chúng ta đã hiểu rõ đó là tầm quan trong của security như thế nào việc chúng ta để lộ một lỗ hỏng sẽ dẫn tới rất nhiểu vấn đề phát sinh, như mất mát về tài chính, bị tấn công và trở thành đối tượng tấn công, ...

Do đó việc hình thành các tư duy kiểm thử ngay trên vòng đời sản phẩm, biến nó từ DevOps thành DevSecOps trở nên rất quan trọng và có chỗ đứng trong thị trường

![[thumbnail-devsecops.png]]

Dựa trên Guide line của [OWASP - DevSecOps Guideline](https://owasp.org/www-project-devsecops-guideline/latest/) để ta có thể tìm hiểu rõ hơn về DevSecOps, sẽ bao gồm

1. Thread Modeling: Đây là bước mà ta có thể lập nên danh sách các vấn đề của hệ thống mà có thể phát sinh các vấn đề về bảo mật
2. Precommit: Ở bước này chúng ta sẽ phải có nhưng convention, rule trước khi các Developer được commit và push lên các remote repo
3. Vulnerable Scanning: Đây là tập hợp của nhiều quá trình để giúp chúng ta đánh giá cũng như kiểm thử được tính bảo mật của sản phẩm

Đây là một nhanh đang phát triển không ngừng và đôi khi còn có những kĩ thuật mới xuất hiện, để có thể tham khảo thêm chúng ta có thể tìm hiểu

- [AWS - What is DevSecOps?](https://aws.amazon.com/what-is/devsecops/?nc1=h_ls)
- [Giới thiệu cơ bản về DevSecOps (Phần 1)](https://whitehat.vn/threads/gioi-thieu-co-ban-ve-devsecops-phan-1.16376/)
- [Medium - Building end-to-end DevSecOps for AWS Migration: Security at Entry Level with open source SCA, SAST and DAST tools](https://medium.com/@akhilmittal510/building-end-to-end-devsecops-for-aws-migration-security-at-entry-level-with-open-source-sca-sast-919480423fc1)

Có một số tools và công cụ nổi tiếng để mọi người có thể tích hợp như

- SAST: [Sonarqube](https://www.sonarsource.com/products/sonarqube/)
- DAST: [ZAP](https://www.zaproxy.org/)
- Vulnerability Management: [DefectDojo](https://github.com/DefectDojo/django-DefectDojo)
- SCA: [Snyk](https://snyk.io/product/open-source-security-management/)
- Secret Detection: [GitGuardian](https://www.gitguardian.com/)
- Container and Kubernetes Scanning: [Trivy](https://trivy.dev/latest/)

# Tổng kết

![[meme-decision.png|center]]

>[!done]
>Đây là toàn bộ những gì Overview của bài DevOps cũng như cách tiếp cận DevOps cho những người mới bắt đầu, hi vọng những thông tin cũng như take note để mọi người có thêm nhiều dữ kiện để mở mang kiến thức cũng như có cơ hội tiếp xúc với tư cách là một DevOps ngay trên ghế nhà trường.

>[!quote]
>DevOps và DevSecOps đang là một việc là có thể đang là một những thị trường tiềm năng và có dấu hiệu đi lên trong những năm gần đây, khác với Software thì đây là công việc đòi hỏi nhiều trách nhiệm cũng như khó khăn nhất định, do đó để trở nên phát triển thì việc tiếp tục học và kết hợp với AI sẽ đem lại nhiều mặt tích cực hơn. Do đó đừng lo AI thay thế, việc mình làm đó là cố gắng trau dồi, nâng cấp bản thân và luôn không ngai va chạm với những thử thách mới, khi đó mọi thành công sẽ đến với mọi người. Cảm ơn đã cho mình có cơ hội đứng đây và chia sẻ với mọi người về câu chuyện DevOps và công việc trong thời đại ngày nay.




