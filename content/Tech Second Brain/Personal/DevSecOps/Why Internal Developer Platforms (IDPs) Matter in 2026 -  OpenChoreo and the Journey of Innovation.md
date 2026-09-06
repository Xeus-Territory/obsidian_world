---
title: "Why Internal Developer Platforms (IDPs) Matter in 2026: OpenChoreo and the Journey of Innovation"
tags:
  - devops
  - platform-engineering
  - architecture
  - gitops
  - story
---

> [!quote]
> Hi everyone, it's me again! To keep the momentum going from my last post, I want to share a deeper look into the next chapter of my career, my production **[W'xOps IDP](https://www.wxops.cloud/)**, and the tools that have inspired me from day one, **[OpenChoreo](https://openchoreo.dev/)**
> 
> While I chose not to adopt their architectures directly—recognizing that you will certainly discover alternative approaches that work best for you—these tools have profoundly shaped my perspective on the Internal Developer Platform (IDP) landscape in 2026.
> 
> In this post, I also want to explore the emerging opportunities in this space, connect with people who share this vision, and look forward to where Platform Engineering is headed.
> 
> Without further ado, let’s dive right into today’s topic!

![[thumbnail-idp.png]]

# Platform Engineering: The Story of Why and What IDPs Will Be in 2026

Before sharing my perspective, I hope you will take a moment to review these links, articles, and stories regarding Platform Engineering, Internal Developer Platforms (IDPs), and why this architecture is poised to become an industry standard in the near future, despite having gained major traction only around early 2023.

- [Internal Developer Platform - Introducing, the theory and more information about IDP](https://internaldeveloperplatform.org/) 🌟 **(Recommended)**
- [Platform Engineering - What is an Internal Developer Portal?](https://platformengineering.org/blog/what-is-an-internal-developer-portal)
- [Youtube - How to drive the platform engineering revolution](https://www.youtube.com/watch?v=qsqCFJ-5IXE)
- [RedHat - What is an internal developer platform?](https://www.redhat.com/en/topics/platform-engineering/what-is-an-internal-developer-platform)
- [Medium - Building a Kubernetes Platform — Think Big, Think in Planes](https://medium.com/itnext/building-a-kubernetes-platform-think-big-think-in-planes-ede8bcba295f) 🌟 **(Recommended)**
- [Platform Engineering - The Landscape - Distills the best practices in designing IDP](https://platformengineering.org/platform-tooling) 🌟 **(Recommended)**
- [CNCF TAG - CNCF Platforms White Paper](https://tag-app-delivery.cncf.io/whitepapers/platforms/) 🌟 **(Recommended)**
- [Medium - Internal Developer Platform: Is Your Team Ready for the Next Step in Automation?](https://medium.com/itnext/internal-developer-platform-is-your-team-ready-for-the-next-step-in-automation-0cc8156c3136)
- [Youtube - AI, DevOps, and Kubernetes: Kelsey Hightower on What’s Next](https://www.youtube.com/watch?v=HdUbTyvrfKo&t=6s) 🌟 **(Recommended)**
- [Youtube - Kubernetes and retiring at the top with Kelsey Hightower](https://www.youtube.com/watch?v=UlXpOGIpITM)
- [Youtube - Beyond Kubernetes: Pragmatic platform engineering for 2026 with Kelsey Hightower](https://www.youtube.com/watch?v=MV20Xoc5hcE)
- [Youtube - The Evolution of GitOps in Platform Engineering - Artem Lajko, iits](https://youtu.be/MlrBMgmGpyA?si=-dArYiqxoTcS-wmT)
- [Medium - OpenChoreo: The Secure-by-Default Internal Developer Platform Based on Cells and Planes](https://medium.com/itnext/openchoreo-the-secure-by-default-internal-developer-platform-based-on-cells-and-planes-438fdd3484de)
- [DevOps.com - Internal Developer Platform (IDP) Reference Architectures](https://devops.com/internal-developer-platform-idp-reference-architectures/)
- [CNCF - Platform engineering maturity: From toolchain to self-service](https://www.cncf.io/blog/2026/09/01/platform-engineering-maturity-from-toolchain-to-self-service/)
- And more, find out at [[Awesome Cloud Native]]

To be completely honest, I can't share any more references because it might overwhelm this article with information overload 😄. As I mentioned, this terminology isn't new; it emerged in early 2023 when I was essentially the DevOps intern, just learning new DevOps tools. Today, it shapes my career path. For anyone who wants to stay passionate and keep up the momentum in DevOps, SRE, and Systems Engineering, while confronting the evolution of technology and AI in general, and Kubernetes in particular, it fundamentally transforms how teams approach and advance in system design, making Kubernetes the standard architecture and the backbone for running your business.

>[!quote] Thankful
>Anyway, I want to send my utmost respect and a major shoutout to the person who inspired me to pursue Platform Engineering, [Artem Lajko](https://www.linkedin.com/in/lajko/). If you need some motivation, check out his insightful articles on [Medium](https://medium.com/@artem_lajko); they will give you a clearer perspective on stepping into Platform Engineering and Internal Developer Platforms. While I wouldn't necessarily call it the absolute best, I can assure you that your time won't be wasted exploring his wealth of knowledge, keywords, and perspectives on Kubernetes, platforms, and more. 
>
>Additionally, I am deeply grateful to have discovered [Kelsey Hightower](https://www.linkedin.com/in/kelsey-hightower-849b342b1/). From [his hardcore Kubernetes background](https://github.com/kelseyhightower/kubernetes-the-hard-way) to his numerous podcasts, he truly showed me how Kubernetes is a game changer for the near future.
## My Journey and Reflections: Discovering IDP & Platform Engineering


![[meme-overwhems.png]]

After several years working in the Technology and Economy sector as a DevOps engineer—specializing in Cloud Native technologies and Kubernetes, I constantly found myself questioning whether daily manual DevOps tasks could be defined as workflows and automated natively. This isn't about replacing the entire DevOps, SRE, or Infrastructure roles, but rather about the mental fatigue of repeatedly answering the same troubleshooting queries. Over time, while your troubleshooting skills naturally improve, you eventually feel stuck, as if your career has hit a plateau without a clear path forward. This was my reality, my job, and my career trajectory just six months ago.

Around that time, the Platform Engineer role gained significant traction, though I had first encountered it back in early 2023, coinciding with the rapid emergence of ChatGPT specifically and LLMs in general. This shift completely transformed the engineering approach. Consequently, Platform Engineering and Internal Developer Platforms (IDPs) deeply influenced my perspective, reminding me of my original purpose when I first started building platforms to scale projects, minimize downtime, and enhance security with [NTMA Anomaly (Network Traffic Monitoring and Analysis for Anomaly Detection)](https://github.com/Xeus-Territory/ntma_anomaly). It was just me taking the initiative; even though I am not a traditional developer, I excel at technical troubleshooting, DevOps operations, scenario scripting in Bash, Terraform, or Ansible, and I am a passionate Kubernetes and Cloud Native advocate. As IDPs and Internal Developer Portals began dominating my feed, I realized I needed a new career path, which ultimately led me to develop [W'xOps IDP](https://www.wxops.cloud/).

Internal Developer Platforms (IDPs) effectively address several fundamental questions regarding my professional purpose:

- It establishes a centralized way for developers and DevOps engineers to visualize their systems, making system information and documentation far more transparent and easier to maintain.
- It significantly reduces pain points and bottlenecks caused by answering repetitive, cyclical questions such as, "How do I operate this?" "How does this work?" or "The CI/CD pipeline broke and I don't know why."
- It provides a clear perspective, helping developers measure their experience when working within systems impacted by the rapid shipping of AI-generated code. While AI helps them manage their code, a lack of structured pathways leads to a messy system cluttered with conflicting concepts, making it difficult to refactor when scaling or updating critical infrastructure, such as migrating away from an outdated Ingress Controller (e.g., NGINX Ingress becoming deprecated by early 2026).
- It focuses on creating frameworks and workflows that help developers shape their workspaces intuitively, avoiding workaround hacks while enforcing best practices, all while providing the flexibility developers need to perform at their best.

>[!quote] (TL;DR) Don't be scared to start.
>Like you, who are reading this blog and navigating a new career path, I don't have a wealth of experience to share about starting or building something new. First of all, I admire your sacrifice in leaving your comfort zone to explore uncharted territory. If things fail, it's not entirely your fault; it simply means there is more to learn, more to absorb, and more you can do for the future. So, whether you are starting to build something like an IDP or diving into any new technology, once you get moving, run as far as you can. You can rest after a long run, but never give up, because your dedication will ultimately answer your questions, fulfill your dreams, and justify your sacrifices.
>
> I sincerely apologize for oversharing my thoughts. It is quite a bit shy, yet this is simply how I confront my upcoming journey of contribution, development, and delivering future-proof solutions. Now, let us return to the topic of Internal Developer Platforms (IDPs) in greater detail.

## Why and What are Internal Developer Platforms (IDPs) – The Golden Path Terminology

>[!info] Internal Developer Platform (IDP)
>By [Internal Deverloper Platform](https://internaldeveloperplatform.org/what-is-an-internal-developer-platform/), Internal Developer Platform (IDP) looks like the theory or principle built by platform team to build Golden Path and enable Developer self-services.

![[thumbnail-cncf-landscape.png]]

![[thumbnail-cncf-landscape-v2.png]]

Internal Developer Platform appearance to help you reduce the complexity of [Cloud Native Landscape](https://landscape.cncf.io/), or help your business choose the right tools, glued them together in a way that lower cognitive load on developers without abstracting away context and underlying technologies.

The core of IDP is helping developer see the system more friendly, enough abstract (CLI, Portal, Kubernetes Manifest but customization, etc) to help them can self deployed their application into Kubernetes, or what ever infrastructure stay behind without effort. There are no framework or frame to helping you ship and delivery the right IDP on the first introducing, the successful platform will initialize from small, follow to get the MVP approach, and iterate quickly to continuous prove value to all key stakeholders.

Like I told you above, IDP have more than one identity or shape, because it's depending what you see your system of what, and let your decision follow to make the bunch of tools become the abstract and explain followed your idea, i means some thing that called **Plane - By Platform Engineering, Artem, OpenChoreo**, or **Components - By Internal Platform Engineer** with having these common components.

- **Application Configuration (Service Plane)**: Manage application configuration in a dynamic, scalable and reliable way.
- **Infrastructure Orchestration (Control Plane)**: Orchestrate your infrastructure in a dynamic and intelligent way depending on the context.
- **Deployment Management (Workflow Plane)**: Implement a delivery pipeline for Continuous Delivery or even Continuous Deployment (CD).
- **Role-Based Access Control (Identity, Policies or Security Plane)**: Manage who can do what in a scalable way.
- **Environment Management (Environment Plane)**: Enable developers to create new and fully provisioned environments whenever needed.

These one will lead you to another landscape and you already seen in a lot of articles about AWS, Azure, Google Cloud or Cloud Native design.

![[thumbnail-idp-landscape.png]]
<div align="center">
	<p style="text-align: center;">Internal Developer Platform Landscape (By: Platform Engineering)</p>
</div>

![[thumbnail-azure-cloud-idp-landscape.png]]
<div align="center">
	<p style="text-align: center;">Internal Developer Platform Landscape on Azure Cloud (By: Humanitec)</p>
</div>

Explore more these architecture designs, and landscapes at

- [Humanitec - Reference architectures for Internal Developer Platforms](https://humanitec.com/reference-architectures)
- [Platform Engineering - Platform Tooling Landscape](https://platformengineering.org/platform-tooling)
- [Medium - Building a Kubernetes Platform — Think Big, Think in Planes](https://medium.com/itnext/building-a-kubernetes-platform-think-big-think-in-planes-ede8bcba295f) 🌟 **(Recommended)**
- [Internal Developer Platform - The 5 Core Components of an Internal Developer Platform (IDP) ](https://internaldeveloperplatform.org/core-components/) 🌟 **(Recommended)**
## A Game-Changer or Overengineered?

Whether an Internal Developer Platform (IDP) is a game-changer or simply overengineered depends entirely on what you expect from its capabilities and how you measure its outcomes when your current setup already works. An IDP must be fundamentally implemented around developer experience, optimizing workloads while safeguarding the final result. If you can answer these questions, an IDP can be a tremendous asset to your tech stack. However, without concrete evidence to justify it, you will likely encounter significant challenges when operating these frameworks.

>[!question] What are golden paths?

As mentioned in the blog, when you envision your golden paths, you are shaping your development environment and defining clear metrics for developer success. These can include:

- **Streamlined deployment workflows**, e.g., GitOps, Helm, Manifests, etc.
- **Optimized CI pipelines** required to ensure your production releases meet the necessary quality standards before going live, e.g., testing (unit, smoke, or E2E), security (secret detection, vulnerability scanning), building and packaging, dependency management, code quality checks, etc.
- **Success metrics**, e.g., [DORA Metrics](https://dora.dev/guides/dora-metrics/) (deployment frequency, change failure rate, and lead time for changes) and [Score](https://github.com/score-spec/spec) (a developer-centric and platform-agnostic workload specification ensuring consistent configuration across local and remote environments).
- **AI integration** using MCP, ACA, or multi-agent systems to facilitate easier integration and reshape developer behavior, as AI is rapidly transforming engineering workflows worldwide.
- **Platform tooling and services** available for developers, e.g., DNS & Ingress definition (Services, Ingress, API Gateways), databases (PostgreSQL, VectorDB, or analytical databases), secret management (Vault, Azure Key Vault), version control (Git, changelogs), etc.

👉 Read more about question at: [Platform Engineer - What are golden paths? A guide to streamlining developer workflows](https://platformengineering.org/blog/what-are-golden-paths-a-guide-to-streamlining-developer-workflows)

![[meme-idp.png|center|400]]

>[!question] Who’s Really Responsible for an Internal Developer Platform?

The answer for who taking the responsibility in traditional DevOps ain't gonna easy, and now we got the Internal Developer Platform (IDP), the brand new ecosystem, super complex and look kinda  and break them small piece to managament is great trade-off or it's just been a trapping

- Following the golden-path, you have more than one things to measure, and this golden-path is changing followed the Developer Experience, I don't really think there are having the standard here, it just been your choice, or not to following them rule, and break them. So choosing what you need and turn in them into feedback loop is the short key to bridge the gap between developer and platform team for measure the successful of Golden-Path
- There are the respobility boundaries between Developer and Platform, because you are not in control whole edge case can happen, so that why the challenge when IDP is solving the hallucinate of developer of system, transparent documentation and they know what happen inside the cluster to let know the responsiblity to use this platform in good ways, to ensure not block other team mate application, ain't noway easy challenge, but platform team should deal with that for building the great IDP, documentation them and transparent them via training to let them know how much responsibility they will take when they provision the system.

👉 Read more about question at: [Medium - Who’s Really Responsible for an Internal Developer Platform?](https://itnext.io/whos-really-responsible-for-an-internal-developer-platform-5dce5f2a0401)

Explore further what is actually happening with IDPs in 2026; the challenges and blockers that need to be addressed before pursuing this architecture are discussed in the articles below.

- [Blog - Platform Engineering in 2026: Why DIY Is Dead](https://roadie.io/blog/platform-engineering-in-2026-why-diy-is-dead/)
- [Linkedin (Platform Engineering) - The biggest challenges platform engineering teams are facing in 2026](https://www.linkedin.com/pulse/biggest-challenges-platform-engineering-teams-qwhqe/)
- [Medium - Internal Developer Platforms: A Real Thing or Just a Trend?](https://itnext.io/internal-developer-platforms-a-real-thing-or-just-a-trend-ee9c97870dcc)
- [Medium - Internal Developer Platform: Insights from Conversations with Over 100 Experts](https://itnext.io/internal-developer-platform-insights-from-conversations-with-over-100-experts-dbe332353afc)

>[!done] Successful or Not?
>The success of most IDPs doesn't stem from having a platform with tons of plugins, numerous show-off features, or a great approach to any project. Instead, measuring application success, project impact, and Developer Experience (DevEx) is the real game-changer. These elements drive higher engagement and generate organic feedback from your collaborators—whether they are developers, Product Managers, Product Owners, or CEOs.
>
>As I mentioned, it all comes down to how you visualize your project problems, remediate issues, and resolve bottlenecks. Only then can the platform truly perform as intended.

# OpenChoreo - The Cloud-Native IDP

![[thumbnail-cncf-openchoreo.png]]

Upon double-checking the [CNCF Landscape](https://landscape.cncf.io/), **[OpenChoreo](https://www.cncf.io/projects/openchoreo/)** is listed under **App Definition and Development** and **Continuous Integration & Delivery** as a **Sandbox Project** starting from **06/01/2026**. Discovering this for the first time prompted me to reflect on my current work and how the CNCF community has embraced OpenChoreo as a viable solution and approach.

I plan to take a comprehensive walkthrough of this product, covering its architecture, core concepts, and a hands-on guide to self-hosting it, while evaluating the standout features of this Internal Developer Platform (IDP) compared to others. Coincidentally, I had the pleasure of meeting OpenChoreo's maintainer, [Tishan Dahanayakage](https://www.linkedin.com/in/tishan/) (Director and Head of Engineering, Choreo BU @WSO2), and we had a fantastic conversation at KubeCon Japan 2026 regarding Platform Engineering, OpenChoreo, and the story behind the project. In short, this project is bound to go far and will inspire many others in the near future, including myself. Congratulations to the team on offering such a phenomenal IDP option for Kubernetes workflows!

There are several blogs, articles, and videos that genuinely showcase what happens behind the scenes at OpenChoreo. I really appreciate how they communicate and tackle challenges using **[Backstage](https://backstage.io/)**, **[AI Agent with Platform](https://openchoreo.dev/explore/agentic-developer-platform/)**, **InHouse Identity with [WSO2 ThunderID](https://github.com/thunder-id/thunderid)**, and more, making it an exciting project well worth diving into. A huge shoutout to all the maintainers, users, and community members who have built these incredible tools, what I believe is the first truly complete IDP in the CNCF Landscape (alongside others like **[KubeVela](https://www.cncf.io/projects/kubevela/)**). Be sure to check out the resources below before you start exploring!

**Blogs**

- [Medium - OpenChoreo: The Secure-by-Default Internal Developer Platform Based on Cells and Planes - Artem Lajko](https://medium.com/itnext/openchoreo-the-secure-by-default-internal-developer-platform-based-on-cells-and-planes-438fdd3484de)
- [CNCF - Cloud Native platform sovereignty through multi-plane architecture](https://www.cncf.io/blog/2026/08/18/cloud-native-platform-sovereignty-through-multi-plane-architecture/)
- [Linkedin - Abdel SGHIOUAR - Hands-On with OpenChoreo: Deploying on GKE and Running a Microservices Demo](https://www.linkedin.com/pulse/hands-on-openchoreo-deploying-gke-running-demo-abdel-sghiouar-nwv2f/)
- [Youtube - 🤖 The End of Manual SRE: Hands-On with OpenChoreo & Autonomous SRE Agents](https://www.youtube.com/watch?v=LbHmfTDsrjA)

**Core Features to Exploring**

- [OpenChoreo - Backstage-Powered Developer Portal](https://openchoreo.dev/explore/backstage-powered-developer-portal/)
- [OpenChoreo - Agentic Developer Platform for Kubernetes](https://openchoreo.dev/explore/agentic-developer-platform/)
- [OpenChoreo - Observability](https://openchoreo.dev/explore/observability/)

**More stuff to deep diving**

- [OpenChoreo - Ecosystem](https://openchoreo.dev/ecosystem/): Great collections for Skill, Manifest, etc to help you easier integrate into OpenChoreo
- [GitHub - community-modules](https://github.com/openchoreo/community-modules): Community modules for OpenChoreo
- [OpenChoreo - Concepts/Platform Abstractions](https://openchoreo.dev/docs/concepts/platform-abstractions/): To much interesting things OpenChoreo use and founding inside their platform, especially **CEL - Expression Language**, help them expressions to dynamically generate resource manifests based on component specifications.
- [OpenChoreo - Concept/Runtime Model](https://openchoreo.dev/docs/concepts/runtime-model/): Cell Architecture in the building with OpenChoreo, and more about pattern for traffic flow, networking, security, observability.
- [OpenChoreo - Concept](https://openchoreo.dev/docs/category/concepts/): Understand the fundamental abstractions and relationships in OpenChoreo

**General**

- [OpenChoreo - Documentation](https://openchoreo.dev/docs/)
- [OpenChoreo - Platform Engineer Guide](https://openchoreo.dev/docs/category/platform-engineer-guide/)
- [OpenChoreo - Developer Guide](https://openchoreo.dev/docs/category/developer-guide/)
- [OpenChoreo - Quick Start](https://openchoreo.dev/docs/getting-started/quick-start-guide/)
- [OpenChoreo - Run OpenChoreo in Your Environment (Full Installation Version)](https://openchoreo.dev/docs/getting-started/try-it-out/on-your-environment/)

>[!info]
>If you prefer to explore a live demo rather than self-hosting the platform yourself, you can check out the official OpenChoreo Demo Portal directly at [demo.openchoreo.wso2.com](https://demo.openchoreo.wso2.com/).
## What is OpenChoreo?

After describing more about OpenChoreo above, Now I'm actually explain technically what OpenChoreo is it 😄

>[!info] OpenChoreo
>A complete, modular, open-source developer platform for Kubernetes that brings together the abstractions platform and application teams actually need: development and architecture guardrails, a Backstage-powered developer portal, application CI/CD, GitOps, and observability all in a single, cohesive platform. OpenChoreo is developed and maintained by [WSO2](https://wso2.com/) Developers, and it officially became a CNCF Sandbox Project on January 6, 2026.

OpenChoreo stands out with several truly impressive capabilities, including:

- **Leveraging and Optimizing Backstage:** They use Backstage as the foundational portal framework to deliver the OpenChoreo Platform UI. Backstage is a widely adopted framework for building developer portals with extensive plugin support; however, it can be difficult to manage, hard to control, and requires deep familiarity with numerous JavaScript/TypeScript plugins. OpenChoreo did an impressive job taming this complexity to successfully harness the framework.
- **Clear IDP Positioning:** OpenChoreo remains transparent about the true role of an Internal Developer Platform, acting as effective middleware between Platform Teams and Software Teams. They enhance this bridge by embedding built-in AI Agentic capabilities focused on SRE, Architectural, and cost control.
- **Modern Observability:** OpenChoreo ships metrics, logs, and traces through seamless workflows designed to operate effortlessly across single and multi-cluster environments. Having built-in observability within an IDP is a critical key to success, especially when integrating AI for automated deep analysis and root-cause debugging. Rather than simply relying on default redirect links to Grafana, OpenChoreo delivers impressive native visualizations directly inside Backstage, featuring application topology graphs along with detailed, dedicated views for each observability signal.

Next, we will explore how OpenChoreo works under the hood, examining its impressive Cell Architecture for workloads alongside dedicated control planes designed for distinct system missions.
## Architecture

![[thumbnail-openchoreo-arch.png]]

**OpenChoreo** follows the multi-planes for operating their modular with Kubernetes-native system backbone. It uses **a domain-and-abstraction-driven, API-first approach as its core design** philosophy, which sets it apart from platforms that are primarily built from disparate tools stitched together with scripts.

OpenChoreo leverage multi-planes to create them the flexibility in customization and extend the platform if you needed, but still ensure the foundation of your IDPs.
### Control Planes

With [Control Plane](https://openchoreo.dev/docs/overview/architecture/#control-plane), the API controller inside Kubernetes provide you the interface for orchestration your platform and developer resources with others platform, and it declared by  **[Developer API](https://openchoreo.dev/docs/overview/architecture/#developer-api)** and **[Platform API](https://openchoreo.dev/docs/overview/architecture/#platform-api)**.

>[!info]
>If you want to explore more about their API, you can use one of them
>1. [doc.crds.dev](https://doc.crds.dev/github.com/openchoreo/openchoreo) - To see full index about their CRDs (This look quite old version)
>2. [API Reference](https://openchoreo.dev/docs/category/api-reference/) - To see full scheme and API supported with controller of OpenChoreo

![[thumbnail-openchoreo-concepts.png]]

Through its **Platform API**, OpenChoreo empowers platform engineers to define the structure, behavior, and topology of the platform using high-level abstractions, such as Namespaces, Infrastructure Planes (Data, Workflow, and Observability), and Deployment Pipelines. To ensure a seamless developer experience, it provides specific APIs that allow platform builders to establish "Golden Paths" via reusable templates:

- **[ComponentType](https://openchoreo.dev/docs/reference/api/platform/componenttype/):** A platform-defined template that governs how components are deployed and determines which underlying resources are generated.
- **[Trait](https://openchoreo.dev/docs/reference/api/platform/trait/):** Represents a cross-cutting capability attached to components to introduce functionality like persistent storage, observability, security policies, or service mesh integration.
- **[Environment](https://openchoreo.dev/docs/reference/api/platform/environment/):** Defines the target runtime context (e.g., dev, test, staging, production) where workloads are deployed and executed.
- **[ResourceType](https://openchoreo.dev/docs/reference/api/platform/resourcetype/):** A platform template governing how managed infrastructure (databases, queues, caches, object stores) is provisioned on the data plane and exposed to application workloads.
- **[ProjectType](https://openchoreo.dev/docs/reference/api/platform/projecttype/):** An infrastructure template declared at the project level. It materializes namespace-scoped Kubernetes resources (such as cell namespaces, NetworkPolicies, ResourceQuotas, baseline RBAC, and ImagePullSecrets) across every environment a project is deployed to, while defining parameter schemas for project-level and per-environment overrides.
- **[DataPlane](https://openchoreo.dev/docs/reference/api/platform/dataplane/)**: A Kubernetes cluster where application workloads are deployed. It defines the connection to a target Kubernetes cluster via a cluster agent and gateway settings for routing traffic to applications.

>[!info]
>To learn more about the design and motivation behind these primitives, explore the [Platform Abstractions Documentation](https://openchoreo.dev/docs/concepts/platform-abstractions/).

![developer-api-overview.svg|900](https://raw.githubusercontent.com/openchoreo/openchoreo.github.io/b9e97ac78c462a8b1eaa3c5d761b511a733b0b26/docs/resources/developer-api-overview.svg)

Complementing this, the **Developer API** translates Kubernetes primitives into intuitive, domain-driven abstractions that simplify how developers define projects, application components, endpoints, and dependencies:

- **[Component](https://openchoreo.dev/docs/reference/api/application/component/):** Represents a deployable unit of an application and serves as the primary building block for services within a project.
- **[Project](https://openchoreo.dev/docs/reference/api/application/project/):** Represents a complete cloud-native application composed of multiple interconnected components.
- **[Resource](https://openchoreo.dev/docs/reference/api/application/resource/):** Represents a developer-declared dependency on managed infrastructure, such as databases, messaging queues, caches, or object storage.

>[!info]
>For a deeper look into the application-level design, check out the [Developer Abstractions Overview](https://openchoreo.dev/docs/concepts/developer-abstractions/).

![what-is-openchoreo-overview.svg|900](https://raw.githubusercontent.com/openchoreo/openchoreo.github.io/b9e97ac78c462a8b1eaa3c5d761b511a733b0b26/docs/resources/what-is-openchoreo-overview.svg)

As shown in the architectural diagrams, OpenChoreo excels at establishing a clear, transparent bridge between Platform Teams and Developers through its dual API design. To understand how these entities interact under the hood, refer to the [Resource Relationships Documentation](https://openchoreo.dev/docs/concepts/resource-relationships/). Key highlights include:

- **[Component to ComponentType](https://openchoreo.dev/docs/concepts/resource-relationships/#component-to-componenttype):** A **Component** references a **ComponentType** using the format `{workloadType}/{componentTypeName}`. This link binds the deployment to its governing template, validating developer-provided input parameters against the schema defined by the ComponentType.
- **[Trait Composition](https://openchoreo.dev/docs/concepts/resource-relationships/#trait-composition):** Traits supply pluggable capabilities that components can consume. Similar to ComponentType schemas, Traits accept parameter overrides per environment via `ReleaseBinding` resources, enabling platform engineers to compose flexible, reusable features across diverse workload types.

After these abstractions are defined by both teams, OpenChoreo translates them into runtime manifests. Through a series of automated binding and rendering processes, these components are merged and deployed directly into the target Kubernetes Namespace.

![release-transformation-diagram.svg|900](https://raw.githubusercontent.com/openchoreo/openchoreo.github.io/b9e97ac78c462a8b1eaa3c5d761b511a733b0b26/docs/resources/release-transformation-diagram.svg)

- **[ComponentRelease](https://openchoreo.dev/docs/reference/api/runtime/componentrelease/)**: An immutable snapshot of a component's configuration at a specific point in time in OpenChoreo. It captures the complete component specification including the ComponentType, Traits, parameters, and Workload template with the built image. ComponentReleases ensure reproducibility and enable rollback by preserving the exact state of a component when it was released.
- **[ReleaseBinding](https://openchoreo.dev/docs/reference/api/platform/releasebinding/)**: A ReleaseBinding represents an environment-specific deployment of a Component. It binds a specific release to an environment and allows platform engineers to override component parameters, trait configurations, and workload settings for specific environments like development, staging, or production.
- **[RenderedRelease](https://openchoreo.dev/docs/reference/api/runtime/renderedrelease/)**: A RenderedRelease represents the actual deployment of application resources to a target plane (DataPlane or ObservabilityPlane) in OpenChoreo. It is created by the ReleaseBinding controller and contains the complete set of Kubernetes resources that need to be applied to the target plane. RenderedReleases manage the lifecycle and health monitoring of deployed resources.

Other Platform API and Developer API, OpenChoreo also introduce several API called Experience Plane, for abstraction used to 

- **Authentication** with engine [ThunderID](https://thunderid.dev/): Supported OIDC/OAuth2 Identity Provider. Explore more at [Identity Provider Configuration](https://openchoreo.dev/docs/platform-engineer-guide/identity-configuration/)
- **Authorization** with enginer [Apache Casbin](https://casbin.apache.org/): Support several types for RBAC, ABAC and specific instance-level access control that can allow or deny on resources. Explore more at [Authorization in OpenChoreo](https://openchoreo.dev/docs/platform-engineer-guide/authorization/overview/) 
### Data Planes

![[thumbnail-openchoreo-dataplane.png]]

OpenChoreo defines the [Data Plane](https://openchoreo.dev/docs/overview/architecture/#data-plane) as the target Kubernetes cluster that executes workload components, enforces network policies, and exposes endpoints through a structured [gateway topology](https://openchoreo.dev/docs/overview/architecture/#gateway-topology). This runtime model is built upon the [Cell-Based Architecture](https://github.com/wso2/reference-architecture/blob/master/reference-architecture-cell-based.md), a design pattern where individual teams or domain units operate autonomously within clearly bounded environments while leveraging shared core platform capabilities.

The Data Plane provides several built-in modules to support these workloads, including:

- **API Management Module:** A central API Gateway layer that defines component endpoints and enforces operational policies such as rate limiting and authentication. OpenChoreo attaches these capabilities to components using Traits, natively supporting [Kgateway](https://kgateway.dev/), the [WSO2 API Platform](https://github.com/wso2/product-apim), and [Kong Gateway](https://github.com/kong/kong).
- **Elastic Module:** Responsible for autoscaling workloads based on traffic metrics and events. OpenChoreo leverages [KEDA](https://github.com/kedacore/keda) to manage event-driven autoscaling seamlessly.
- **Guard Module:** Focuses on eBPF technology to secure the data plane, provide deep network observability, and enforce granular network policies to maintain zero-trust compliance. OpenChoreo natively integrates [Cilium](https://github.com/cilium/cilium) for this foundation.
### Workflow Planes

![[thumbnail-openchoreo-workflow-planes.png]]

Similar to the Data Plane, OpenChoreo defines the [Workflow Plane](https://openchoreo.dev/docs/overview/architecture/#workflow-plane) as a dedicated Kubernetes cluster responsible for executing platform-defined workflows—such as CI pipelines (Test, Build, and Deploy) or Generic Workflows (custom platform jobs, GitOps tasks, and infrastructure provisioning) managed by the Control Plane. Much like the Data Plane, the Workflow Plane establishes an outbound, secure WebSocket (`wss://`) connection to interact with the Control Plane, receiving workflow definitions, execution instructions, and streaming real-time status updates back.

Workflows within this plane can be configured in two primary ways:

- **Native Workflow Engine:** Powered natively by [Argo Workflows](https://github.com/argoproj/argo-workflows), offering a flexible engine for complex jobs. Platform teams can also swap or customize this engine based on existing CRD-driven pipeline tools, [Tekton](https://tekton.dev/), [Podman](https://podman.io/), [Cloud Native buildpacks](https://buildpacks.io/)
- **External CI Integration:** External platforms like GitHub Actions, GitLab CI, or Jenkins can be connected as workflow sources. While OpenChoreo does not directly control the execution of these external pipelines, it provides integrated Backstage plugins to simplify day-to-day interactions. In this setup, the Control Plane focuses on tracking metadata, build artifacts, container images, and workload custom resources (CRs).

Furthermore, Generic Workflows support automated GitOps operations as well as pre-promotion and post-deployment validation steps, such as automated integration testing.
### Observability Planes

![[thumbnail-openchoreo-observability.png]]

An [Observability Plane](https://openchoreo.dev/docs/overview/architecture/#observability-plane) is a Kubernetes cluster responsible for providing centralized logs, metrics, traces, and alerts. It acts as a primary data sink, collecting and aggregating telemetry from all connected Workflow and Data Planes as configured by the Platform API. OpenChoreo maintains flexibility here—allowing platform engineers to customize observability tooling while ensuring the Control Plane and Experience Plane can query telemetry to map platform topology relationships accurately.

Like the Data and Workflow Planes, the Observability Plane is defined by the Control Plane via API and establishes an outbound secure WebSocket (`wss://`) connection for management. Crucially, this plane also exposes an OpenAPI v3-compliant API for querying logs, metrics, and traces, alongside a native Model Context Protocol (MCP) server. This MCP enables AI Agents to securely connect and query telemetry data while maintaining strict zero-trust authentication and authorization controls.

Telemetry collection across planes is handled by lightweight agents configured via observability modules. These agents run on target planes, enrich raw telemetry with contextual domain metadata (such as plane, namespace, project, and component), and forward the data to the Observability Plane. The observability modules receive this data and act as backends or adapters for OpenChoreo's Observer API, delivering a domain-centric querying experience.

By default, the Observability Plane provides a complete, out-of-the-box telemetry stack:

- **Logs Module:** Collects logs using [Fluent Bit](https://fluentbit.io/) and centralizes them in [OpenSearch](https://opensearch.org/) for indexing and analytics. Learn more in the [OpenChoreo OpenSearch Logs Module](https://github.com/openchoreo/community-modules/tree/main/observability-logs-opensearch).
- **Metrics Module:** Scrapes metrics from [Prometheus Exporters](https://prometheus.io/docs/instrumenting/exporters/) and stores them in [Prometheus](https://prometheus.io/). Learn more in the [OpenChoreo Prometheus Metrics Module](https://github.com/openchoreo/community-modules/tree/main/observability-metrics-prometheus).
- **Tracing Module:** Collects distributed traces via the [OpenTelemetry (OTEL) Collector](https://opentelemetry.io/) and stores them within [OpenSearch](https://opensearch.org/). Learn more in the [OpenChoreo OpenSearch Tracing Module](https://github.com/openchoreo/community-modules/tree/main/observability-tracing-opensearch).
- **Alerting Capabilities:** Built directly into the logging and metrics modules. Learn more in the [Observability & Alerting Guide](https://openchoreo.dev/docs/platform-engineer-guide/observability-alerting/).

Together, these default modules support full-text search, structured and unstructured log storage, metric aggregations, distributed tracing, configurable retention policies, and complex querying.

For organizations with existing **External Observability Systems** (e.g., Datadog, Splunk, New Relic, Grafana Cloud, or cloud-native offerings like AWS CloudWatch and Azure Log Analytics), OpenChoreo uses an adapter pattern. This allows a lightweight Observability Plane to hook into third-party APIs while exposing the unified Observer API and MCP endpoints across the platform.
### Deployment Topology

OpenChoreo supports multiple deployment topologies tailored to organizational scale, team size, and operational requirements:

- **Small Deployment (Development & Testing):** A single Kubernetes cluster leveraging namespace-based isolation across planes.
- **Large/Production Deployment:** Dedicated Kubernetes clusters for each distinct plane (Control, Data, Workflow, and Observability) to maximize fault isolation, high availability, and security boundaries.
- **Hybrid Deployment:** Co-locates selected planes within shared clusters to strike a pragmatic balance between operational overhead, security isolation, and infrastructure cost optimization.

For detailed topology configurations and architectural guidelines, explore the [OpenChoreo Deployment Topology Guide](https://openchoreo.dev/docs/platform-engineer-guide/deployment-topology/).
## Concepts and Explore

### Cell-Based Architecture

Before exploring my perspective about this architecture, you definitely explore these articles to gather truly detail, official purpose and how they build this architecture for solving the problems with Kubernetes by OpenChoreo, and others use-cases

- [GitHub (WSO2) - Cell-Based Architecture - A Decentralized Reference Architecture for Cloud Native Applications](https://github.com/wso2/reference-architecture/blob/master/reference-architecture-cell-based.md) 🌟 **(Recommended)**
- [Medium - OpenChoreo: The Secure-by-Default Internal Developer Platform Based on Cells and Planes](https://itnext.io/openchoreo-the-secure-by-default-internal-developer-platform-based-on-cells-and-planes-438fdd3484de)
- [AWS - What is a cell-based architecture?](https://docs.aws.amazon.com/wellarchitected/latest/reducing-scope-of-impact-with-cell-based-architecture/what-is-a-cell-based-architecture.html)
- [InfoQ - Cell-Based Architectures: How to Build Scalable and Resilient Systems](https://www.infoq.com/minibooks/cell-based-architecture-2024/)
- [TheNewStack - Cell-Based Architecture: A New Decentralized Approach for Cloud Native Patterns](https://thenewstack.io/cell-based-architecture-a-new-decentralized-approach-for-cloud-native-patterns/)
- [Nordicapis - What is Cell-Based Architecture?](https://nordicapis.com/what-is-cell-based-architecture/)

![[thumbnail-openchoreo-cell-project-view.png]]

Like anyone eager to dive deeper into this platform architecture, I discovered this paradigm while exploring the broader OpenChoreo ecosystem and reading [Artem's blog](https://itnext.io/openchoreo-the-secure-by-default-internal-developer-platform-based-on-cells-and-planes-438fdd3484de) post from lastly 2025 or early 2026, which first introduced me to OpenChoreo.

OpenChoreo's runtime relies on a pattern called [Cell Architecture](https://openchoreo.dev/docs/concepts/runtime-model/#cell-architecture). This architecture creates isolated runtime environments for OpenChoreo Component Workloads, grouping them into cohesive deployment units called **Cells** for specific application domains, ensuring clean boundaries between distinct business domains.

Each Cell operates within its own dedicated namespace, governed by isolated network policies and security perimeters. While components inside the same cell communicate freely via cluster-local networking, all cross-cell communication must route through a [well-defined Cell Gateway](https://github.com/wso2/reference-architecture/blob/master/reference-architecture-cell-based.md#cell-gateway-communication).

![[thumbnail-openchoreo-cell-gateway.png|center]]

Cells consume functionality from other cells through three primary API patterns exposed by their Cell Gateways:

- **Request-Response:** Provides an abstraction over resources that can be explicitly **queried** or **activated**.
- **Events:** Enables real-time reactive execution based on environmental changes, allowing workloads to be asynchronously **triggered**.
- **Streams:** Captures the continuous, evolving state of the system for real-time **pattern matching** and **data analysis**.

Cell Gateways manage traffic ingress and egress according to strict directional patterns, which OpenChoreo models transparently as Projects and Gateways within the Data Plane (see [Traffic Flow Patterns](https://openchoreo.dev/docs/concepts/runtime-model/#traffic-flow-patterns) for details):

- **Northbound (Ingress from Channels):** External APIs exposed by the cell, consumed by web, mobile, and IoT clients.
- **Southbound (Egress to External Services):** Outbound calls from the cell to third-party APIs residing outside the organization.
- **Westbound (Ingress from Internal Cells):** Internal APIs exposed by the cell, consumed by components in another cell.
- **Eastbound (Egress to Internal Cells):** Outbound calls initiated by the cell to target another internal cell.
    
By enforcing these traffic boundaries at the gateway level, failures, security breaches, or performance bottlenecks within one cell are contained and cannot directly impact others. This boundary gives domain teams the autonomy to adopt tech stacks and governance models tailored to their specific needs without disrupting the broader platform. Because policies are introduced, managed, and maintained directly at the Cell Gateways, teams gain architectural agility without needing to modify underlying application components.

Furthermore, OpenChoreo visualizes this Cell Architecture directly within its Backstage-powered Developer Portal, giving teams clear visibility into ingress/egress gateway behavior across internal and external boundaries. Isolating traffic at the domain level also makes it easy to scope, collect, and toggle observability metrics for Gateway per application domain.

![[thumbnaill-openchoreo-cell-diagram-backstage.png]]

![[thumbnail-openchoreo-observe-runtime-topology.gif]]

>[!done] Purpose
>The cell model aligns with microservices best practices and [Domain-Driven Design principles](https://martinfowler.com/bliki/DomainDrivenDesign.html). By mapping bounded contexts to isolated runtime units, OpenChoreo ensures that architectural boundaries are enforced by infrastructure. This alignment reduces the cognitive load on developers - the same mental model used for designing applications applies to their runtime behavior.
### ThunderID as iDP for Authentication

Beyond the architecture, platform security and identity management are critical considerations, where native OAuth2/OIDC integration plays a vital role. OpenChoreo addresses this by adopting a enterprise-grade stack powered by [WSO2 Asgardeo](https://github.com/asgardeo) and leveraging [ThunderID](https://github.com/thunder-id/thunderid) under the hood.

To explore more about ThunderID and its identity capabilities, check out the links below:

- [OpenChoreo - Identity Provider Configuration](https://openchoreo.dev/docs/platform-engineer-guide/identity-configuration/)
- [WSO2 - Meet ThunderID: An Identity Core for the Future](https://wso2.com/library/conference/2026/05/meet-thunderid-an-identity-core-for-the-future)
- [ThunderID - Introduction](https://thunderid.dev/)
- [Medium - Exploring External Authentication in OpenChoreo: Integrating WSO2 Asgardeo as an External IdP](https://medium.com/@aish.basavaraj1007/replacing-thunder-with-wso2-asgardeo-enterprise-authentication-for-openchoreo-58c9c3e3c815)
- [WSO2 - WSO2 Accelerates Agentic Enterprise Adoption with New Agent Identity, Forward Deployed Engineers, and Expanded Delivery Partner Ecosystem](https://wso2.com/about/news/wso2-accelerates-agentic-enterprise-adoption-with-new-agent-identity-forward-deployed-engineers-and-expanded-delivery-partner-ecosystem/)

![[thumbnail-openchoreo-ThunderID-iDP.png]]

>[!info] ThunderID
>An open-source IAM stack built in Go, focused on open standards and designed to handle identity for humans, AI agents, and machines with fully orchestratable identity flows.

OpenChoreo ships **ThunderID** out of the box as its default Identity Provider, delivering several core authentication and identity management capabilities:

- **Standard-Compliant Authentication:** Native OAuth 2.0 and OIDC flows for secure user logins.
- **Identity Management:** Full lifecycle management for both human users and automated service accounts.
- **Token Handling:** Built-in JWT token issuance, signing, and verification.
- **Pre-Configured Integrations:** Ready-to-use OAuth application profiles for core OpenChoreo components.

ThunderID also includes a dedicated admin console and web UI, allowing platform operators to manage users, configure applications, and manage OAuth 2.0 clients easily.

>[!info]
>OpenChoreo enable the flexible to help you integrate your existIdentity Providers, and leverage them for user authentication and service account managment. But you need to ensure your Identity provider meet the prerequisite conditions
>1. An OAuth2/OIDC compliant identity provider accessible from your cluster
>2. The following endpoints from your identity provider:
> 	  - OIDC Discovery endpoint (`.well-known/openid-configuration`)
> 	  - Authorization endpoint
> 	  - Token endpoint
> 	  - JWKS (JSON Web Key Set) endpoint 
>3. Knowledge of your provider's issuer and audience claim values

Depending on OpenChoreo requirements, you can choose alternative open-source solutions if you prefer to build with a different identity stack. Below is a comparison matrix evaluating popular open-source Identity Providers (IdPs) across core enterprise capabilities, giving you a clearer perspective when selecting an external identity solution:

- **[DexiDP](https://dexidp.io/)**: A broker to help you integrate any identity provider through OpenID Connect — without touching your application code.
- **Zitadel**: Like ThunderID, [Zitadel](https://zitadel.com/) is written in **Go** and focuses on low-latency, cloud-native deployments. It offers strong support for multi-tenancy, passkeys, and a developer-first approach.
- **Authentik**: If you value ThunderID's declarative configuration and identity orchestration, [Authentik](https://goauthentik.io/) is an excellent choice. It is a highly customizable, open-source identity provider that can be fully integrated with GitOps workflows.
- **Ory (Kratos / Hydra)**: A modular, API-first identity stack built in **Go**. Ory Kratos handles user management and authentication, while Ory Hydra manages OAuth 2.0 and OpenID Connect. It is perfect if you want to build your own UI without being tied to a specific frontend.
- **Keycloak**: Backed by Red Hat, [Keycloak](https://www.keycloak.org/) is the industry standard for open-source IAM. While heavier than ThunderID's lightweight Go footprint, it is incredibly feature-rich and supports extensive enterprise federation out of the box.

|**Feature**|**Dex**|**ThunderID**|**Zitadel**|**Authentik**|**Keycloak**|**Ory (Hydra/Kratos/Keto)**|
|---|---|---|---|---|---|---|
|**Primary Architectural Role**|Identity Shim / Broker|Agentic & Dev-First IAM|Cloud-Native Multi-Tenant CIAM|Modular "XIAM" Proxy/IdP|Enterprise Full-Stack IAM|Microservice Identity Ecosystem|
|**Tech Stack & Runtime**|Go (Single binary)|Go + TypeScript|Go (Single binary / Cockroach)|Python (Django) + Go Outposts|Java (Quarkus Engine)|Go (Distributed Microservices)|
|**User Data Store**|**None** (Delegates Upstream)|Built-in + External Federation|Event-Sourced (Built-in)|Built-in (PostgreSQL)|Built-in (Relational DB)|Built-in (RDBMS via Kratos)|
|**K8s & GitOps Integration**|**Highest** (ConfigMap/YAML)|High (Declarative Identity Flows)|High (K8s / Knative Native)|High (Helm + Outpost CRDs)|High (Operator pattern)|High (Custom Resource Controllers)|
|**AI / Machine Workloads**|Basic OIDC|**Native (MCP & AI Agents)**|API/Service Accounts|Service Accounts|Service Accounts & MCP|OAuth2 M2M (Hydra)|
|**Authorization Engine**|None (Authenticates only)|RBAC + Derived Permissions|Built-in B2B Organizations|Policy-based (Rego/Expression)|Complex Fine-Grained PBAC/RBAC|**Zanzibar / ReBAC** (Ory Keto)|
|**Management Interface**|**No UI** (Config files only)|Console UI + REST APIs|Modern Angular Web UI|Flow-Engine Visual UI|Enterprise Admin Console|Headless (Write your own UI)|

Beyond authentication, OpenChoreo handles fine-grained authorization across its platform components using role-based access control (RBAC) and attribute-based access control (ABAC). It leverages [Apache Casbin](https://github.com/apache/casbin) as its policy enforcement engine to grant or deny access to platform resources dynamically.

To explore the details of policy models, subject-action-resource mappings, and authorization enforcement in OpenChoreo, check out these resources:

- **[OpenChoreo - Authorization in OpenChoreo](https://openchoreo.dev/docs/platform-engineer-guide/authorization/overview/):** The official documentation on permission structures, scope isolation, and access control models.
- **[Medium - Boring but Correct: How OpenChoreo Handles Authorization](https://binoyperies.medium.com/boring-but-correct-how-openchoreo-handles-authorization-4407599d5d59):** An in-depth article exploring the architectural decisions behind OpenChoreo's authorization implementation.
### AI Agent with MCP

![[thumbnail-openchoreo-ai-mcp.png]]

Taking a look into OpenChoreo's AI capabilities, the platform feels remarkably cutting-edge—embracing modern AI primitives like the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs) and agentic [Skills](https://github.com/anthropics/skills) to deliver native AI platform tools. Rather than simply embedding isolated LLM features, OpenChoreo integrates built-in Platform Agents that connect directly across its multiple planes to solve complex SRE, FinOps, observability, and architectural challenges. You can explore their AI framework in detail through these resources:

- **[OpenChoreo - Working with AI](https://openchoreo.dev/docs/ai/overview/):** The official overview of OpenChoreo's AI integration, MCP servers, and agent architectures.
- **[CNCF - Platform engineering for the agentic enterprise: Managing applications, resources, and AI agents](https://www.cncf.io/blog/2026/07/21/platform-engineering-for-the-agentic-enterprise-managing-applications-resources-and-ai-agents/):** A deep dive into how platform engineering is evolving to support agentic workflows and AI-driven infrastructure operations.

> [!quote] 
> OpenChoreo is leading the charge in natively integrating agentic AI into a full-fledged Internal Developer Platform. While there are many standalone tools addressing specific DevOps, SRE, and infrastructure tasks (as showcased in [awesome-sre-agents](https://github.com/last9/awesome-sre-agents)), OpenChoreo unifies them under a single platform model.

OpenChoreo exposes dedicated MCP Servers across both its Control Plane and Observability Plane, enabling AI assistants (such as Claude Code, Cursor, or Gemini CLI) to:

- **Discover and manage platform resources:** List namespaces, projects, components, environments, and deployment pipelines directly from conversational prompts.
- **Trigger and monitor builds:** Initiate workflow executions and track pipeline status without leaving your IDE or CLI.
- **Query observability data:** Retrieve logs, metrics, distributed traces, alerts, and active incidents using natural language.
- **Deploy and promote workloads:** Update release bindings and promote application components across environments through chat-driven workflows.

Exposing infrastructure via MCP provides AI agents with transparent, contextual access to platform state, vastly enhancing developer experience while reducing operational overhead for DevOps and Platform teams. Furthermore, packaged platform skills (such as `OpenChoreo Developer`, `OpenChoreo Platform Engineer`, `OpenChoreo Setup`, etc) streamline agent integration (explore these in the [OpenChoreo Ecosystem Skills Repository](https://openchoreo.dev/ecosystem/?group=skill)).

Beyond raw MCP servers, OpenChoreo ships dedicated autonomous AI agents designed for specific operational roles:

- **[FinOps Agent](https://openchoreo.dev/docs/ai/finops-agent/):** Analyzes Kubernetes resource utilization across OpenChoreo components, generating actionable cost-optimization reports and rightsizing recommendations. 
- **[SRE Agent](https://openchoreo.dev/docs/ai/sre-agent/):** Automates incident investigations by correlating telemetry across logs, metrics, and traces, delivering automated root cause analysis (RCA) reports the moment alerts fire.
- **[Portal Assistant](https://openchoreo.dev/docs/ai/portal-assistant/):** A read-only chat assistant embedded directly within the Backstage portal. It interfaces with the Control Plane and Observability MCP servers (and the SRE Agent) to answer team queries, allowing developers to inspect components, pull RCA reports, or check runtime telemetry without leaving the UI.

OpenChoreo provides a complete set of modules that bring clarity and control to the AI ecosystem, delivering native tooling to manage agent behavior end-to-end. This includes specialized components like the [WSO2 Agent Manager](https://openchoreo.dev/ecosystem/item/wso2-agent-manager/), dedicated [AI Gateways](https://openchoreo.dev/ecosystem/?group=module&category=AI&category=AI+Gateway), runtime [sandboxing](https://openchoreo.dev/ecosystem/?group=component-type&category=AI), proxy-based policy enforcement, and evaluation frameworks. By bringing AI actors into the same operational framework, these capabilities allow AI agents to safely participate in platform tasks, governed by the exact same security policies, access controls, and observability pipelines applied to human-led workloads.
## Self-hosted OpenChoreo

![[meme-lab-time.png|center]]

Now, let's attempt to self-host OpenChoreo on a K3s cluster to see how straightforward the process is. To keep the setup lean, I will skip deploying the Workflow Plane and focus exclusively on the remaining three planes, aiming to:

- Expose the OpenChoreo Backstage portal and explore how they structure their Backstage environment.
- Provision a few common resource relationships to test OpenChoreo's core platform features.
- Inspect the Control Plane in action and evaluate several native visualization features offered by OpenChoreo.

### Setup OpenChoreo

For lightweight self-hosted Kubernetes setups, I prefer using my open-source project, [Kubewekend](https://github.com/Xeus-Territory/kubewekend), to provision target environments across local Virtual Machines (e.g., VirtualBox via Vagrant) or cloud VPS instances. Kubewekend provides a streamlined CLI and Ansible playbooks to spin up local developer clusters quickly

| Kubewekend Cluster Distribution | Local | VM  | VPS Remote |
| ------------------------------- | ----- | --- | ---------- |
| Kind (K8s in Docker)            | ✅     | ✅   | ✅          |
| K3s Standalone                  | ✅     | ✅   | ✅          |
| K3s High Availability (HA)      | 🚧    | ✅   | ✅          |
| RKE2                            | 🚧    | 🚧  | 🚧         |

Naturally, you can choose whichever bootstrap tool fits your local workflow—such as [K3d](https://k3d.io/stable/), which OpenChoreo officially recommends for rapid local evaluations (see [Run OpenChoreo on K3d Locally](https://openchoreo.dev/docs/getting-started/try-it-out/on-k3d-locally/)).

For this exercise, I am deploying a single-node **K3s Standalone** cluster inside a local VirtualBox VM using the following specifications:

- **CPU & RAM:** 2 vCPUs and 8 GB RAM *(Note: 4 GB RAM is generally sufficient to co-locate the Control Plane and Data Plane for testing).*
- **Storage:** 40 GB Disk Space.

```bash
# setup the virtual machine virtualbox
./scripts/setup.sh vagrant up k8s-master-machine

# setup k3s
./scripts/setup.sh k3s setup --host k8s-master-machine

# grasp your kubeconfig of k3s to your local machine
ssh -i ~/.ssh/vmbox -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null vagrant@192.168.56.99 'sudo cat /etc/rancher/k3s/k3s.yaml' > ~/.kube/k3s-local

# seed your config with your virtual ip
sed -i 's/127.0.0.1/192.168.56.99/g' ~/.kube/k3s-local

# export KUBECONFIG into yourshell to get connect with k3s
export KUBECONFIG=~/.kube/k3s-local
```

With K3s of Kubewekend, you will be ready for having

- Ingress and Gateway: Traefik
- LoadBalancer: ServiceLB
- DNS: CoreDNS
- Storage: Local Path Provisioner

Now setup following [OpenChoreo - Run OpenChoreo in Your Environment](https://openchoreo.dev/docs/getting-started/try-it-out/on-your-environment/) for setup Control Plane, Data Plane to have fullstack be ready, I won't cover to install workflow and observability on this articles and we can find out in others article.

>[!warning]
>Because the default Ingress Traefik will install GatewayCRD, so you can encounter trouble when setup to install Gateway CRDs, so you can add `--force-conflict` to deal when you have problem.
>

```bash
kubectl apply --server-side \
  -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.5.1/standard-install.yaml --force-conflicts
```

>[!warning]
>By Anyway to be ensure working following openchoreo techstack, I recommend you to turn off the Traefik in K3s Kubewekend also, to ensure LoadBalancer reserved by `kgateway` as `gateway-default`
```bash
helm uninstall -n kube-system traefik
```

>[!info]
>You can cost about 10 mins for setup fully stack of Control Plane with ThunderID for authentication, OpenBeo and External Secrets for Secret Management, kgateway for default gateway of OpenChoreo, Cert-Manager for cert-management, Backstage for Portal and prerequisite CRDs of these techstack go live.

```bash
kgp -A
NAMESPACE                  NAME                                               READY   STATUS    RESTARTS   AGE
cert-manager               cert-manager-746886b79c-wqbl7                      1/1     Running   0          29m
cert-manager               cert-manager-cainjector-5664b56fc6-p56jk           1/1     Running   0          29m
cert-manager               cert-manager-webhook-7f644f6b8f-w4jph              1/1     Running   0          29m
external-secrets           external-secrets-7fcdbd8d79-mbdzw                  1/1     Running   0          28m
external-secrets           external-secrets-cert-controller-7b7858f6f-tk9j7   1/1     Running   0          28m
external-secrets           external-secrets-webhook-66f565986c-txxb4          1/1     Running   0          28m
kube-system                coredns-695cbbfcb9-gvqkz                           1/1     Running   0          42m
kube-system                local-path-provisioner-546dfc6456-cfmjd            1/1     Running   0          42m
kube-system                metrics-server-c8774f4f4-lbcd5                     1/1     Running   0          42m
kube-system                svclb-gateway-default-dec5836b-wv6ww               2/2     Running   0          4m16s
openbao                    openbao-0                                          1/1     Running   0          25m
openchoreo-control-plane   backstage-58bd4bcbd4-6q2pb                         1/1     Running   0          4m19s
openchoreo-control-plane   cluster-gateway-7df4b496cf-nzgqw                   1/1     Running   0          22m
openchoreo-control-plane   controller-manager-65586f8859-ht46p                1/1     Running   0          22m
openchoreo-control-plane   event-forwarder-57f87bcbb7-lkxmc                   1/1     Running   0          22m
openchoreo-control-plane   gateway-default-9bd779695-v9z28                    1/1     Running   0          4m17s
openchoreo-control-plane   kgateway-5df87456c-6n2gr                           1/1     Running   0          26m
openchoreo-control-plane   openchoreo-api-5d7dfcb7d4-jxmlc                    1/1     Running   0          4m19s
thunder                    thunder-deployment-5589989846-659mb                1/1     Running   0          10m

```

```bash
Control plane base domain: openchoreo.192-168-56-99.nip.io
  Console: console.openchoreo.192-168-56-99.nip.io
  API:     api.openchoreo.192-168-56-99.nip.io
  ThunderID: thunder.openchoreo.192-168-56-99.nip.io
```

![[thumbnail-openchoreo-thunderid-console.png]]
<div align="center">
	<p style="text-align: center;">OpenChoreo ThunderID Console</p>
</div>

![[thumbnail-openchoreo-backstage-ui-1.png]]
<div align="center">
	<p style="text-align: center;">Openchoreo Backstage Console</p>
</div>

After deploying the **Control Plane**, the next step is installing the **Data Plane** across the OpenChoreo ecosystem to prepare the environment for application deployments.

> [!warning] One port for One LoadBalancer Only
> 
> Running a single-node K3s cluster introduces networking constraints due to limited External IP availability. Since K3s' default LoadBalancer (`svclb`) binds directly to the node's single IP address (`192.168.56.99`), exposing multiple `LoadBalancer` services on identical ports (like `80` and `443`) leads to port conflicts. A common bare-metal workaround is disabling K3s' default LoadBalancer and deploying [MetalLB](https://metallb.io/) to assign dedicated Virtual IPs from a custom address pool (see [k3s-io/k3s #1969](https://github.com/k3s-io/k3s/issues/1969)).

To solve this single-IP limitation, we can evaluate two approaches:

- **Adding Worker Nodes:** Expanding the K3s cluster with additional nodes allows ServiceLB to register IP endpoints across the node pool, enabling distinct LoadBalancer services to claim separate virtual IPs or node endpoints.
- **Port Offset Strategy (Recommended by OpenChoreo):** When restricted to a single LoadBalancer IP—typical in self-hosted or local edge setups—all gateway services can share that same IP by remapping their operational ports. Passing `--set gateway.httpPort=8080 --set gateway.httpsPort=8443` during Helm installation assigns unique entry points. Ensure these values match the `http.port` and `https.port` parameters declared in your `ClusterDataPlane` registration manifest. For advanced network topologies, refer to the [Multi-Cluster Connectivity Guide](https://openchoreo.dev/docs/platform-engineer-guide/multi-cluster-connectivity/).

The **OpenChoreo port-mapping approach** offers the cleanest solution here—shifting the default Gateway ports avoids adding node infrastructure while allowing the single IP to route ingress traffic cleanly.

```bash
helm upgrade --install openchoreo-data-plane oci://ghcr.io/openchoreo/helm-charts/openchoreo-data-plane \
--version 1.2.4 \
--namespace openchoreo-data-plane \
--create-namespace \
--set gateway.tls.enabled=false \
--set gateway.httpPort=8080 \
--set gateway.httpsPort=8443
```

```bash
k get services -n openchoreo-data-plane 
NAME              TYPE           CLUSTER-IP      EXTERNAL-IP     PORT(S)          AGE
gateway-default   LoadBalancer   10.43.129.154   192.168.56.99   8080:31953/TCP   41m
```

Alright after finishing setup **Data Plane**, following OpenChoreo, we can access the backstage console again with new account `admin@openchoreo.dev/Admin@123` to see what happen inside. Because in the previous, I login by admin account from ThunderID, it just only provide the empty Backstage UI.

```bash
open $(echo "https://console.${CP_BASE_DOMAIN}")
```

Alright, something new comming with `default` project in namespace `default`, which we already provision in step setup Control Plane.

![[thumbnail-openchoreo-backstage-ui-2.png]]

Finish them by create React Application provided by OpenChoreo to help you full visualization about OpenChoreo setup

```bash
kubectl apply -f https://raw.githubusercontent.com/openchoreo/openchoreo/release-v1.2/samples/from-image/react-starter-web-app/react-starter.yaml
```

```bash
$ kubectl wait --for=condition=available deployment \
  -l openchoreo.dev/component=react-starter -A --timeout=180s

HOSTNAME=$(kubectl get httproute -A -l openchoreo.dev/component=react-starter \
  -o jsonpath='{.items[0].spec.hostnames[0]}')
DP_HTTPS_PORT=$(kubectl get gateway gateway-default -n openchoreo-data-plane \
  -o jsonpath='{.spec.listeners[?(@.protocol=="HTTPS")].port}')
PORT_SUFFIX=$([ "$DP_HTTPS_PORT" = "443" ] && echo "" || echo ":${DP_HTTPS_PORT}")

echo "https://${HOSTNAME}${PORT_SUFFIX}"


deployment.apps/react-starter-development-c37e66d8 condition met
https://http-react-starter-development-default-cde5190f.apps.openchoreo.192-168-56-99.nip.io:8443
```

>[!done]
>Open that URL in your browser (accept the self-signed certificate warning). You should see the React starter application running.
### OpenChoreo BackStack Playground

First off, taking a tour through the UI highlights how effectively OpenChoreo visualizes resource definitions mapped directly to deployed application components—like `react-starter`.

![[Pasted image 20260906154406.png]]

With this feature, you can easily navigate all interconnected resources bound to your project to retrieve key operational insights—including live **YAML Manifest Definitions**, **Resource Overviews**, and specialized telemetry views made available as soon as Observability and Workflow planes are registered.

Navigating to the **Project View** reveals how OpenChoreo maps application boundaries through its Cell Architecture model. It offers a clear, high-level structural map showing how services interact, detailing ingress entry points, outbound dependencies, and intra-cell communication flows across project services:

![[Pasted image 20260906155159.png]]

>[!info]
>This visualization topology becomes immensely powerful once the Observability Plane is fully connected. Having live telemetry overlaid on top of Cell boundaries makes deep-dive debugging and real-time dependency tracking for Project Components effortless.

Zooming into the **Project View**, the portal exposes insights tailored not just for developers, but also for Day 2 operators, SREs, and FinOps engineers. It provides a single pane of glass for monitoring infrastructure costs, automated Root Cause Analysis (RCA) reports, active security alerts, and system incidents, streamlining the journey from telemetry collection to security and platform stability

![[Pasted image 20260906155817.png]]

The relationship graph proves its worth by helping operators and developers instantly map raw Kubernetes primitives directly to high-level OpenChoreo Project abstractions

![[Pasted image 20260906155731.png]]

Diving deeper into individual **Components**, OpenChoreo provides several core capabilities directly within the portal UI:

- **Build Management:** Tracks and manages application builds when integrated with the Workflow Plane.
- **Environment Promotion:** Orchestrates sequential releases, enabling components to move safely from development and staging up to production environments.
- **Native Observability:** Embeds granular telemetry, including metrics, logs, distributed traces, and alert triggers, scoped directly to the specific component.
- **Cluster Runtime Operations:** Offers a hands-on playground to interact with deployed workloads, allowing operators to trigger rollouts, modify pod replicas, adjust resource requests/limits, manage environment variables, configure port bindings, and set up file mounts.

![[Pasted image 20260906160534.png]]

![[Pasted image 20260906160629.png]]

When it comes to **resource creation**, getting comfortable with OpenChoreo's declarative manifests is essential. While platform engineers naturally spend more time crafting custom Custom Resource Definitions (CRDs) than application developers, OpenChoreo streamlines this process for both sides, delivering tailored abstractions for platform builders and intuitive forms for app developers

![[Pasted image 20260906161128.png]]

To simplify self-service provisioning, the portal ships with built-in templates covering common **Component Types**, **Resource Types**, and **Project Types**:

- **Components:** Pre-configured workloads for **Web Applications**, **Microservices**, **Background Workers**, and **Scheduled Tasks**.    
- **Resources:** Managed infrastructure dependencies such as **PostgreSQL**, **NATS messaging**, and **Valkey in-memory storage**.

![[Pasted image 20260906161801.png]]

Regarding **Platform Governance & Permissions**, navigating to the Settings view reveals how fine-grained authorization works under the hood. Platform operators can manage RBAC and ABAC policies alongside secret references, establishing strict guardrails and access controls across projects and environments

![[Pasted image 20260906162140.png]]

>[!done] More things for exploring, but not today
>Setting up the Control Plane and Data Plane on K3s within a single afternoon barely scratches the surface of what OpenChoreo can do when fully wired with its Workflow, Observability, and AI MCP planes. Nevertheless, the diligence, attention to detail, and architectural clarity embedded into this platform are genuinely impressive. OpenChoreo provides an exceptionally solid foundation for engineering organizations making the shift toward modern Platform Engineering and Internal Developer Platforms (IDPs).
>
>While a complete end-to-end setup deserves its own dedicated follow-up guide, there is no substitute for getting your hands dirty. Spin up a cluster, break things, iterate, and discover what works best when building golden paths for your own production environment!
## OpenChoreo, Future Execution and My Thought

![[meme-waiting.png|center]]

>[!quote]
>Ultimately, OpenChoreo demonstrates that the future of platform engineering is not about creating separate platforms for applications, resources, or AI. It is about extending a single cloud-native platform that enables both humans and AI agents to collaboratively build, operate, and govern the complete enterprise software estate.
>
>*By CNCF, Platform engineering for the agentic enterprise: Managing applications, resources, and AI agents*

>[!done] From Architectural Inspiration to Future Execution
>Studying OpenChoreo's modular architecture, dual API design, Cell-based runtime, and agentic AI integration has provided immense clarity for my own roadmap. While W'xOps IDP follows its own tailored principles built from first principles, analyzing how OpenChoreo solves developer abstraction, multi-plane orchestration, and zero-trust security validates many of the design choices I'm embedding into W'xOps for its upcoming open-source release.

# Conclusion

![[meme-hero.png|center]]

>[!done]
>That’s all for today! I know this article takes time to digest—just as it took time for me to write 😃, but I made it through! I hope you found this exploration of Platform Engineering, Internal Developer Platforms (IDPs), and the single-day OpenChoreo setup valuable. Processing this vast landscape of tools, architectures, and future trends has been an incredible learning journey. If you choose this path for your career, know that it isn't easy, but the value you unlock through the effort of building a true IDP makes it deeply rewarding. I genuinely appreciate the foundation the OpenChoreo project is setting up. As a user, friend, and fellow builder, I see enormous potential for OpenChoreo to mature across the CNCF ecosystem, driving platform efficiency and delivering immense value to teams adopting it.

>[!quote]
>Writing this blog has been a fantastic experience for me personally. It raised important questions about how the industry views IDPs, as well as the challenges and exciting future ahead for Platform Engineers, developer platforms, and projects under this umbrella—including OpenChoreo and my own project, W'xOps IDP. Let’s see what new insights we can bring back next time! Thank you for reading this far. Take care of yourself, stay dedicated to learning, be bold in your technical decisions, and I’ll see you in the next article. Bye!

>[!info] The Story Behind the OpenChoreo Logo 😄
>If you want to read a fun and inspiring story about how traditional Sri Lankan stilt fishing inspired the design of the OpenChoreo logo, be sure to check out [How Sri Lankan Stilt Fishing Inspired the OpenChoreo Logo](https://openchoreo.dev/blog/how-sri-lankan-stilt-fishing-inspired-the-openchoreo-logo/)!








