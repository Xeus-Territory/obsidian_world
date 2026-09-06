---
title: About Serverless Discovery - DIY Chatbot Serverless with Cloudflare Worker + D1
tags:
  - tech
  - DIY
  - developer
  - architecture
---

![[meme-long-time-no-see.png|center]]

>[!quote]
>Hello, hello! It has been a while since I shared a hands-on, DIY technical project. Lately, I’ve been heavily focused on **[W'xOps IDP](https://www.wxops.cloud/)**, which is currently in a maintain-and-refactor phase as me prepare for its first open-source (OSS) release.
>
>While that’s brewing, I decided to take a short break to build something fun, slightly complex, and practical, just to keep my hands-on skills sharp!
>
>A few days ago, I received a request to build a Task Management and KPI Tracking Bot. This led me down the path of Serverless Architecture, a fantastic approach for optimizing costs, designing lightweight systems, and keeping things fun to build.
>
>Without further ado, let’s dive right into this week’s topic!

# Serverless Architecture and The story surround them

>[!info] TL;DR
>The first part of the article focuses on delving deeper into Serverless Architecture and System Architecture Design. Additionally, I discuss AI/ML and Cloud Native Solutions (Knative) in conjunction with Serverless.
>
>Therefore, if you prefer not to explore Serverless and would rather jump straight to the showcase solution, you can skip Part 1 and proceed directly to Part 2 of this session. Thank you!

As mentioned earlier, I was tasked with designing an automated workflow to integrate daily messaging platforms, such as Zalo (widely used in Vietnam) and Telegram - for workload tracking and KPI management. To build an efficient end-to-end solution, I combined several architectural patterns: **Chatbots**, **Serverless Compute**, and **SQLite Databases**.

This combination offers key strategic advantages:

- **Cost Optimization**: Leverages generous free tiers and low-cost pay-as-you-go pricing models.
- **Streamlined Deployment**: Supported by modern developer frameworks that simplify development, testing, and deployment.
- **Zero Server Management**: Eliminates the operational overhead of provisioning and maintaining infrastructure (even though servers still exist behind the scenes).
- **Elastic Scalability**: Cloud vendors handle auto-scaling out of the box, allowing serverless functions to scale seamlessly from zero to peak demand.

![[meme-serverless.png|center|500]]

## Why Serverless

As usual, I will try to explore what technologies hand-on and which options are available on the marketplace for free and commercial. You can explore more about these articles below about Serverless and the decision making when choose Serverless.

- [AWS - What is Serverless Computing?](https://aws.amazon.com/what-is/serverless-computing/)
- [Serverless - What is Serverless and What Makes it Great?](https://www.serverless.com/guides/what-is-serverless)
- [RedHat - What is serverless?](https://www.redhat.com/en/topics/cloud-native-apps/what-is-serverless)
- [Cloudflare - What is serverless computing?](https://www.cloudflare.com/learning/serverless/what-is-serverless/)
- [Cloudflare - Serverless computing vs. containers | How to choose](https://www.cloudflare.com/learning/serverless/serverless-vs-containers/)
- [Serverless - Serverless (FaaS) vs. Containers - when to pick which?](https://www.serverless.com/blog/serverless-faas-vs-containers)
- [Dev.to - Introduction to Serverless Architecture](https://dev.to/yasmine_ddec94f4d4/serverless-architecture-101-33l8)

>[!summary]
>**Serverless** is a [cloud-native](https://www.redhat.com/en/topics/cloud-native-apps) development model that allows developers to build and run applications without having to manage servers.

This architecture is designed to free developers from server management, allowing them to focus strictly on building applications faster. As noted earlier, your code still runs on physical or virtual servers; however, the cloud provider abstracts and manages the underlying infrastructure, offering a unified interface to interact with your services.

This architecture fits my requirements because **Serverless Architecture** typically pairs with **[Event-Driven Architecture](https://aws.amazon.com/event-driven-architecture/)**, a modern pattern where events trigger and orchestrate communication between decoupled components. An event is essentially a message emitted when a state change occurs. This design allows individual components to scale, update, and operate independently, which is why individual execution units are termed "Functions" across major public clouds (e.g., Azure Functions, AWS Lambda).

>[!info]
>**Functions** are single-purpose execution blocks well-suited for serverless execution. They request compute resources (CPU and memory) on demand only when executed, maximizing efficiency.

Serverless allows functions to scale efficiently and effortlessly. In traditional architecture (such as dedicated Virtual Private Servers or compute instances), you are constrained by pre-allocated resources that you must manually manage and size. In contrast, serverless functions provide elastic, virtually infinite scalability. **A single serverless function can seamlessly handle one or one million requests without any code modifications.**

Given these core capabilities, Serverless Architecture is well-suited for several key use cases:

- **Stateless Application Development**: Ideal for asynchronous, stateless workloads that do not retain client session state between calls (e.g., Chatbots, Task Schedulers, and IoT ingestion).
- **Batch Processing**: Periodically handles high-volume, repetitive data processing jobs like automated backups, log filtering, and data transformations.
- **Real-Time Data Analytics**: Integrates with real-time streaming pipelines to process telemetry and event data immediately for rapid customer responsiveness.
- **Machine Learning Inference**: Offers cost-effective serving for model endpoints with variable traffic patterns, provided cold-start latencies remain acceptable.

While **Function-as-a-Service (FaaS)** is the most widely recognized serverless model, the paradigm spans several architectural implementations:

- **Function-as-a-Service (FaaS):** [FaaS](https://www.redhat.com/en/topics/cloud-native-apps/what-is-faas) runs event-driven logic inside ephemeral containers without persistent server management, executing strictly upon invocation.
- **Backend-as-a-Service (BaaS):** [BaaS](https://www.cloudflare.com/learning/serverless/glossary/backend-as-a-service-baas/) provides fully managed cloud backend services covering authentication, databases, push notifications, and object storage, commonly consumed by mobile and web clients.
- **Serverless Databases:** Managed [serverless database](https://aws.amazon.com/what-is/serverless-database/) options that auto-scale capacity and storage transparently based on query load (e.g., [AWS Aurora Serverless](https://aws.amazon.com/rds/aurora/serverless/), [AWS Timestream](https://aws.amazon.com/timestream/), [AWS DynamoDB](https://aws.amazon.com/dynamodb/)).
- **Serverless [Containers](https://www.redhat.com/en/topics/containers):** Combine the packaging flexibility of OCI/Docker containers with serverless auto-scaling and zero-node management (e.g., AWS Fargate, Azure Container Apps).
- **Serverless [Edge Computing](https://www.redhat.com/en/topics/edge-computing/what-is-edge-computing):** Executes logic directly on geographically distributed edge nodes close to end-users, delivering ultra-low latency alongside pay-as-you-go scaling (e.g., [Cloudflare Workers](https://www.cloudflare.com/products/workers/), [AWS Lambda@Edge](https://aws.amazon.com/lambda/edge/), [Vercel Edge Functions](https://vercel.com/blog/edge-functions-generally-available), [Apache OpenWhisk](https://github.com/apache/openwhisk)).

>[!quote]
>Serverless is a compelling and flexible architecture that leverages abstract compute models to convert application deployments into fully managed, self-scaling micro-units. The optimal choice among these serverless patterns depends entirely on your specific workload demands, operational constraints, and business requirements.

## The Advantage and Trade-off

Serverless architecture is tailored for a wide array of use cases and has become a popular design pattern when architecting new projects from scratch. However, like any technology, it is a double-edged sword: while offering significant advantages, the trade-offs and operational costs must be carefully evaluated.

**Advantages**

- **Cost Efficiency & Pay-as-You-Go**: You pay strictly for execution time and consumed resources rather than idle compute capacity.
- **Seamless Architectural Integration**: Easily orchestrate functions alongside Webhooks, API Gateways, CDNs, databases, and event brokers without infrastructure bottlenecks.
- **Rapid Deployment & Iteration**: Extensive tooling and frameworks streamline shipping serverless applications, enabling rapid iteration and automated deployment pipelines.
- **Built-in Infrastructure Security**: Cloud providers manage OS patching, underlying runtime security, and hardware isolation, mitigating server misconfiguration risks.
- **Elastic Auto-Scaling**: Functions and managed backends automatically scale up or down dynamically in response to incoming request spikes or drops.
- **Zero Infrastructure Management**: Eliminates the operational overhead of provisioning, patching, and maintaining servers, freeing engineering teams to focus purely on business logic.

**Disadvantages & Challenges**

- **Cold Start Latency**: Unlike persistent servers that run continuously, serverless functions experience initial invocation latency when spinning up new ephemeral environments on demand.
- **Architectural & Operational Complexity**: Splitting application logic into dozens of isolated functions increases system complexity, requiring dedicated workflow orchestration tools (e.g., AWS Step Functions) as pipelines expand.
- **Resource & Execution Limits**: Cloud vendors enforce strict maximum thresholds on memory allocation, execution timeouts, and concurrency limits, making long-running or resource-intensive tasks difficult to execute natively.
- **Debugging & Observability Overhead**: Distributed, asynchronous workflows make end-to-end distributed tracing, log aggregation, and local debugging challenging, often increasing third-party observability costs.

Explore more about challanges and trade-offs when work with Serverless

- [Medium - Considering design trade-offs when building serverless APIs on AWS](https://heeki.medium.com/considering-design-trade-offs-when-building-serverless-apis-on-aws-b34803e29e35)
- [Proxify - Serverless doesn’t mean free: Trade-offs every engineering team should know](https://proxify.io/articles/serverless-doesnt-mean-free-engineering-tradeoffs)

## Serverless in System Architecture Design

Because the flexibility of Serverless for designing the architecture pattern, therefore, you will have more than one opproach to pursuit when you think about Serverless in your system, including
### Request-Response / API Proxy Pattern

![[thumbnail-api-proxy-pattern.png]]

>[!summary]
>A client sends a synchronous HTTP request to an API Gateway, which routes it directly to a serverless function. The function processes business logic, queries a database, and returns a response immediately.

**Preferred Use Cases:** Web/mobile backends, REST/GraphQL APIs, user authentication, interactive search, third-party webhook handlers.

**Candidate Tools**

- **Cloud and Commericial**
	- Compute: AWS Lambda, Azure Functions, Google Cloud Run / Cloud Functions.
	- API Management: AWS API Gateway, Azure API Management, GCP API Gateway.
	- Data: Amazon DynamoDB, Azure Cosmos DB, Cloud Firestore.

- **Open Source**
	- Compute: KNative Serving, OpenFaaS
	- API Management: Envoy Proxy, Kong Gateway
### Fan-Out / Pub-Sub (Event-Driven) Pattern

![[thumbnail-serverless-event-driven.png]]

>[!summary]
>An event producer publishes a single state change to a message broker, which automatically broadcasts the event to multiple independent consumer functions running in parallel.

**Prefered Use Cases**: Multi-channel notifications (Email, Push, SMS), file upload processing (generating thumbnails, video transcoding, OCR text extraction), audit logging.

**Candidate Tools**

- **Cloud and Commericial**

	- Event Routers: AWS EventBridge / SNS, Azure Event Grid / Service Bus, GCP Pub/Sub.
	- Storage Triggers: AWS S3 Streams / DynamoDB Streams, Azure Blob Storage triggers.

- **Open Source**: Apache Kafka, Apache Pulsar, Knative Eventing, Dapr Pub/Sub, RabbitMQ

### Queue-Based Buffer

![[thumbnail-serverless-queue.png]]

>[!summary]
>Incoming requests drop into a durable queue. Serverless functions consume messages in controlled batches or with concurrency limits to smooth out traffic spikes.

**Preferred Use Cases:** Flash sale order processing, high-throughput IoT telemetry ingestion, batch database writes to legacy systems.

**Candidate Tools**

- **Cloud and Commericial**

	- Queues: AWS SQS, Azure Queue Storage / Service Bus Queues, GCP Cloud Tasks.    
	- Throttled Compute: AWS Lambda (with reserved concurrency limits), Azure Functions, GCP Cloud Functions.

- **Open Source**: RabbitMQ, Redis Streams, Apache ActiveMQ.

### Saga / Step Orchestration Pattern

![[thumbnail-serverless-saga.png|center]]

>[!summary]
>A centralized state engine steps through a multi-service business transaction sequentially, handling state tracking, retries, and automated compensation (rollbacks) if a step fails.

**Preferred Use Cases:** E-commerce order fulfillment (inventory lock $\rightarrow$ charge payment $\rightarrow$ create shipping label), banking transfers, multi-stage data ETL.

**Candidate Tools:**

- **Cloud and Commericial**
	
	- Orchestrators: AWS Step Functions, Azure Durable Functions / Logic Apps, GCP Cloud Workflows.

- **Open Source**: Temporal.io, Dapr Workflows, Zeebe (Camunda), Netflix Conductor.
### Choreography Pattern

![[thumbnail-saga-choreography.png]]

>[!summary]
>Autonomous serverless functions publish and subscribe to a central event bus, reacting independently to upstream domain events without a central controller.

- **Preferred Use Cases:** High-throughput microservice ecosystems, independent product feature teams, short event chains (2–4 steps) requiring sub-second execution.

**Candidate Tools:**

- **Cloud and Commericial**: AWS EventBridge + Lambda, Azure Event Grid + Functions, GCP Eventarc + Cloud Run.
- **Open Source**: Apache Kafka, NATS JetStream, Knative Eventing.

>[!info] Saga Orchestration vs Choreography
>Both of them quite look great pattern to setup the Serverless Architecture and here what you can delve deeper to see them different for what and which use-case prefer to use them.

| **Dimension**             | **Orchestration (State Machine)**                                             | **Choreography (Event-Driven)**                                                                      |
| ------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Control & State**       | Centralized in a workflow engine (e.g., AWS Step Functions, Temporal).        | Decentralized across local service databases and event topics.                                       |
| **Service Coupling**      | Medium-High: The orchestrator must know every service's API contract.         | Low: Services only need to know about incoming and outgoing event schemas.                           |
| **Failure Handling**      | Native: Automated retries, timeouts, and structured error catching/rollbacks. | Complex: Services must listen for failure events (e.g., `PaymentFailed`) to trigger local rollbacks. |
| **Visibility & Tracing**  | High: Single dashboard visualizes status, execution path, and failing nodes.  | Distributed: Requires correlation IDs and tracing tools (e.g., OpenTelemetry, AWS X-Ray).            |
| **Performance & Latency** | Higher Latency: State persistence and orchestrator network hops add overhead. | Lower Latency: Direct event handoff without intermediary state execution steps.                      |

Explore more about the different between SAGA Pattern with Orchestration and Choreography

- [AWS - Saga Pattern](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/saga-patterns.html)
- [Azure - Saga Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/saga)
- [AWS - Saga choreography pattern](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/saga-choreography.html)
- [Azure - Choreography pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/choreography)
- [Blog - Choreography vs Orchestration in the land of serverless](https://theburningmonk.com/2020/08/choreography-vs-orchestration-in-the-land-of-serverless/)
- [AWS - Orchestration and Choreography in AWS: The Serverless Way](https://medium.com/@salvatorecirone/orchestration-and-choreography-in-aws-the-serverless-way-58b4311389d2)
### CQRS (Command Query Responsibility Segregation) Pattern

![[thumbnail-cqrs-pattern-with-serverless.png]]

>[!summary]
>Separates write operations (Commands) from read operations (Queries). Writes update a transactional database, emitting stream events to populate read-optimized indexes or caches asynchronously.

**Preferred Use Cases:** Systems with high read-to-write ratios, e-commerce catalog search with complex filtering, real-time analytics dashboards, e.g: E-commerce product search with complex filters, social media activity feeds, real-time analytics dashboards.

**Candidate Tools:**

- **Cloud and Commericial**: AWS DynamoDB Streams + Kinesis + OpenSearch, Azure Cosmos DB Change Feed + Cognitive Search, GCP Firestore + Bigtable.
- **Open Source**: Debezium (CDC) + Apache Kafka + OpenSearch / Elasticsearch.

Explore more about this pattern with

- [Apache APISIX - Building event-driven API services using CQRS, API Gateway and Serverless](https://apisix.apache.org/blog/2022/09/23/build-event-driven-api/)
- [AWS - Scaling Distributed Systems with Event Sourcing, CQRS, and AWS Serverless](https://builder.aws.com/content/2dqfVdKPEO1Q917YG25q8F3Y2QW/scaling-distributed-systems-with-event-sourcing-cqrs-and-aws-serverless)
### Strangler Fig Pattern

![[thumbnail-serverless-strangler-fit.png]]

>[!summary]
>An API Gateway or Load Balancer intercepts incoming monolith traffic and selectively redirects individual route paths to new serverless microservices until the legacy backend is fully retired.

**Preferred Use Cases:** Migrating legacy enterprise monoliths to cloud-native microservices without a high-risk "big bang" rewrite.

**Candidate Tools:**

- **Cloud and Commericial**: AWS API Gateway / Application Load Balancer, Azure API Management, GCP Apigee.
- **Open Source**: Traefik, Kong Gateway, NGINX, Envoy Proxy.

Explore more about pattern with Serverless

- [AWS - Strangler fig pattern](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/strangler-fig.html)
- [Dev.to - Strangler Fig Migration Strategy on AWS](https://dev.to/axeldlv/strangler-fig-migration-strategy-on-aws-17l0)
### Conclusion

| **Pattern**            | **Coupling** | **Execution Mode** | **Latency** | **Complexity** | **Primary Strength**                                 |
| ---------------------- | ------------ | ------------------ | ----------- | -------------- | ---------------------------------------------------- |
| **Request-Response**   | Tight        | Synchronous        | Low         | Low            | Immediate, interactive data processing               |
| **Fan-Out / Pub-Sub**  | Loose        | Asynchronous       | Low-Medium  | Medium         | Parallel notification across multiple services       |
| **Queue-Based Buffer** | Loose        | Asynchronous       | Medium      | Low-Medium     | Leveling traffic spikes to protect downstream stores |
| **Saga Orchestration** | Loose        | Async / Stateful   | Medium      | High           | Centralized control and automated rollbacks          |
| **Choreography**       | Very Loose   | Asynchronous       | Low         | Medium-High    | Autonomous service execution with low latency        |
| **CQRS**               | Decoupled    | Eventual Sync      | Low (Reads) | High           | Fast search/reads isolated from transactional writes |
| **Strangler Fig**      | Decoupled    | Sync / Async Proxy | Variable    | Medium         | Risk-free, incremental legacy monolith modernization |

If you want to find pattern, solutions and case-studies around Serverless Architecture and Computing, check out these links below

- [Serverless Land - Pattern Collections](https://serverlessland.com/patterns)
- [Prisma - Top 13 serverless computing and database providers](https://www.prisma.io/dataguide/serverless/serverless-comparison)
- [Medium - How Netflix Uses Serverless Services For Content Streaming](https://towardsaws.com/how-netflix-uses-serverless-services-for-content-streaming-85390232b3ac)
- [AWS - See how Coca-Cola uses the compute power of AWS to innovate consumer beverage experiences at scale](https://aws.amazon.com/blogs/industries/see-how-coca-cola-uses-the-compute-power-of-aws-to-innovate-consumer-beverage-experiences-at-scale/)

## AI and LLM with Serverless Architecture 2026

![[thumbnail-serverless-ai-llm.png]]

With Serverless Architecture, AI and LLM have more space and tools to being optimization. Because the price of GPU are truly expensive and Serverless can be the solution for saving lots money and keep your AI/ML model still be available for inference and workflow agentic with these pattern above
### Queue-Based Buffer + Event-Driven Scaling (The GPU Optimizer)

>[!question] Problem
>Because the GPU are expensive and easily crash with OOM error during traffic surges for heavy AI tasks (Batch Inference, Image/Video Generation, Embeddings)

**Solution**: To solved problem, Incomming AI Inference prompts drop into Queue and use [KEDA](https://keda.sh/) for monitoring the queue depth and scale GPU worker pods (vLLM or Ray) for batch inferencing and protect GPU vRAM 

**Use Cases:** Batch LLM processing, AI image/video generation (Stable Diffusion/Flux), asynchronous audio transcription.

**K8s & Cloud Candidates:** KEDA, Ray Cluster, Apache Kafka, RabbitMQ, AWS SQS, GCP Cloud Tasks.

Explore more about articles use this pattern

- [Dev.to - Kubernetes Autoscaling with KEDA: Event-Driven Scaling for Queues and Microservices – Part 1](https://dev.to/suavebajaj/kubernetes-autoscaling-with-keda-event-driven-scaling-for-queues-and-microservices-part-1-2bhp)
- [Blog - The Complete Guide to Event-Driven AI Systems](https://theneuralmaze.substack.com/p/the-complete-guide-to-event-driven)
- [Youtube - Beyond the Model: Production AI Inference on Kubernetes](https://youtu.be/0ido8FCv8gk?si=BlID07bXf-_66EYn)
### Saga / Step Orchestration (The Agentic AI & Pipeline Engine)

>[!question] Problem
>Agentic workflows execute non-deterministic, multi-step LLM loops with external API tool calls. If step 4 of 5 fails or times out, standard stateless retries burn expensive tokens, corrupt global state, or leave side-effects (like partial database writes) unhandled.

**Solution**: Implement stateful Saga Orchestration to isolate each step with persistent checkpoints for LLM decisions, vector retrieval, or tool execution. This ensures that failures trigger rollbacks only at the exact point of failure rather than rolling back the entire workflow, while keeping the original meaning intact.

**Use Cases:** Multi-tool autonomous coding/research agents, enterprise document processing with human-in-the-loop approvals, complex multi-modal ETL pipelines.

**K8s & Cloud Candidates:**

- Cloud Native (K8s): Temporal, Restate, LangGraph Server, Prefect, Inngest, CrewAI on K8s.
- Commercial / Public Cloud: AWS Step Functions, Azure Durable Functions, GCP Workflows, Trigger.dev.

Explore more several articles below about SAGA Orchestration with Serverless for AI/ML

- [AWS - Building a serverless distributed application using a saga orchestration pattern](https://aws.amazon.com/blogs/compute/building-a-serverless-distributed-application-using-a-saga-orchestration-pattern/)
- [GitHub Azure - An orchestration-based saga implementation reference in a serverless architecture](https://github.com/Azure-Samples/saga-orchestration-serverless)
### CQRS (The RAG & Knowledge Indexing Engine)

>[!question] Problem
>Document ingestion, chunking, and embedding generation (Write Path) are heavy, batch-oriented CPU/GPU operations that spike intermittently. Semantic retrieval (Read Path) requires sub-100ms vector similarity searches. Mixing both on a unified service leads to search latency spikes, lock contention, and VRAM/RAM starvation.

**Solution:** Decouple the ingestion pipeline from the search engine using Command Query Responsibility Segregation (CQRS).

- **Command (Write) Path:** Asynchronous queues capture incoming documents. Ephemeral GPU/CPU worker pods parse, chunk, embed, and batch-upsert data into storage.
- **Query (Read) Path:** Incoming user queries hit a lightweight, read-optimized vector database replica equipped with in-memory indexes (e.g., HNSW) and fast re-ranking sidecars, completely isolated from ingestion load.

**Use Cases:** Enterprise knowledge base RAG, real-time news/social media semantic indexing, multi-tenant document search platforms.

**K8s & Cloud Candidates:**

- Write Path: Ray Data, Unstructured.io, Apache Kafka, RabbitMQ, KEDA.
- Read Path: Qdrant, Milvus, Pinecone, Weaviate, PGvector (with `pg_vectorize`).
- Managed Solutions: AWS Bedrock Knowledge Bases, GCP Vertex AI Search.

Explore more article about this topics

- [Medium - Building a Production RAG Pipeline with Bedrock Knowledge Bases and OpenSearch Serverless](https://aws.plainenglish.io/building-a-production-rag-pipeline-with-bedrock-knowledge-bases-and-opensearch-serverless-e18f2069acc2)
- [AWS - Easy Serverless RAG with Knowledge Base for Amazon Bedrock](https://builder.aws.com/content/2bi5tqITxIperTzMsD3ohYbPIA4/easy-serverless-rag-with-knowledge-base-for-amazon-bedrock)
- [Medium - Serverless Event Sourcing & CQRS (Part 2)](https://blog.serverlessadvocate.com/serverless-event-sourcing-cqrs-part-2-75bd14644edf)

### Streaming Request-Response (Real-Time LLM Serving)

>[!question] Problem
>LLM generations take seconds to minutes to complete. Standard synchronous HTTP/REST APIs buffer the response until full generation ends, triggering API Gateway timeouts (e.g., AWS 29-second limit), increasing serverless proxy VRAM/memory footprint, and delivering a sluggish user experience.

**Solution:** Establish an event-driven streaming transport channel (Server-Sent Events [SSE] or WebSockets) through edge proxies supporting HTTP/2 multiplexing and chunked transfer encoding. The inference backend streams generated tokens frame-by-frame directly to the client as they leave VRAM, keeping initial Time-to-First-Token (TTFT) under 200ms while maintaining lightweight connection states on the proxy layer.

**Use Cases**: Real-time interactive LLM chats, inline IDE code completion, streaming text-to-speech (TTS) synthesis.

**K8s & Cloud Candidates:**

- Inference Engines: vLLM, SGLang, TensorRT-LLM, TGI.
- Ingress & Gateways: Envoy Gateway, Istio, Kong, Traefik.
- Serverless Edge / Cloud: Cloudflare Workers, Fastly Compute, AWS API Gateway (HTTP APIs SSE), GCP Cloud Run (Response Streaming).

Explore the article for more information about this pattern [AWS - Serverless strategies for streaming LLM responses](https://aws.amazon.com/blogs/compute/serverless-strategies-for-streaming-llm-responses/)
### Low-Latency Interactive Inference (Buffered Scale-to-Zero)

>[!warning] Problem
>Interactive LLM/Chat applications require low Time-to-First-Token (TTFT). Naive scale-to-zero drops client connections or causes unbearable timeouts when spinning up empty GPU instances that must download $10\text{--}100\text{ GB}$ of weights.

**Solution:** An ingress/activator proxy buffers incoming requests while a cluster autoscaler provisions a node. The pod boots using local NVMe host-level weight caches (via P2P image/file caching or shared mount volumes like JuiceFS) to bypass container layer downloads. The request is released to the warm instance, streaming tokens back over SSE or gRPC

**Use Cases**: Real-time streaming LLMs, customer support voicebots, interactive coding assistants.

**Candidates & Tools**:

- Cloud Native (K8s): KServe, Knative Serving (Activator), vLLM / SGLang, Spegel / JuiceFS.
- Commercial / Public Cloud: Google Cloud Run for GPUs (L4/A100), AWS Bedrock, Modal, RunPod Serverless, Baseten.

Explore the article for more information about this pattern [Blog - Scaling GPU inference to zero and back](https://harshit.cloud/blog/gpu-deployments-part-5-scale-to-zero)
### Dynamic LoRA Hot-Swapping (Multi-Tenant Base Instance)

>[!warning] Problem
>Provisioning dedicated GPU replicas for hundreds of tenant-specific fine-tuned models leads to massive infrastructure costs and GPU idling.

**Solution**: Maintain a warm "base model" instance (e.g., Llama 3 70B) in GPU VRAM. Incoming requests specify a Low-Rank Adaptation target (lora_id). The inference engine dynamically fetches and overlays small LoRA adapters (tens of megabytes) in VRAM on-the-fly per request without resetting the base model state.

**Use Cases**: Enterprise B2B SaaS with custom customer personas, localized language translation, domain-specific contract analysis.

**Candidates & Tools**:

- Cloud Native (K8s): vLLM (Multi-LoRA dynamic loading), SGLang, BentoML.
- Commercial / Public Cloud: Predibase, AWS Bedrock Custom Models, GCP Vertex AI Model Garden.

Explore these articles below for more information about this pattern

- [Weight & Biases - Introducing Serverless LoRA Inference](https://wandb.ai/wandb_fc/product-announcements-fc/reports/Introducing-Serverless-LoRA-Inference--VmlldzoxNTEyNDU4OQ)
- [HuggingFace - LoRA Hotswapping in Production: Serving Millions of Personalized Avatars](https://huggingface.co/blog/superapp/lora-hotswapping-in-production)
- [Doubleword - Takeoff Serverless LoRA: Efficient inference at scale for fine-tuned models](https://resources.doubleword.ai/resources/takeoff-serverless-lora-efficient-inference-at-scale-for-fine-tuned-models)
- [Arxiv Paper - Predictive-LoRA: A Proactive and Fragmentation-Aware Serverless Inference System for LLMs](https://arxiv.org/html/2512.20210)
- [Lyceum - Porting Fine-Tunes and LoRA Adapters Between Providers](https://lyceum.technology/magazine/porting-fine-tunes-and-lora-adapters-between-providers/)
### Conclusion

![[thumbnail-lora-adater-edge-compute.png]]

| **Pattern**                    | **Core Architectural Goal**                                                     | **Latency Profile**                              | **Primary Use Cases**                                                       | **Cloud Native (K8s / OSS)**                     | **Commercial / Public Cloud**                          |
| ------------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------ |
| **Buffered Scale-to-Zero**     | Eliminate cold starts using ingress buffering & NVMe host-level weight caching  | Low (<200ms TTFT start)                          | Real-time chat, voicebots, inline code completion                           | KServe, Knative, vLLM, Spegel, JuiceFS           | GCP Cloud Run (GPUs), Modal, AWS Bedrock, Baseten      |
| **Dynamic LoRA Hot-Swapping**  | Serve thousands of fine-tuned models on a single base model in VRAM             | Low-to-Medium (On-demand adapter fetch)          | Enterprise B2B SaaS, tenant custom personas, localized translation          | vLLM (Multi-LoRA), SGLang, BentoML               | Predibase, AWS Bedrock, GCP Vertex AI Model Garden     |
| **Queue-Depth Async Batch**    | Scale GPU pods dynamically based on queue depth/backlog to prevent VRAM OOMs    | Asynchronous / High Throughput                   | AI image/video generation (Flux), offline scoring, dataset creation         | KEDA, Ray Cluster, Apache Kafka, RabbitMQ        | AWS SQS + Karpenter, GCP Cloud Run Jobs, Modal, RunPod |
| **Saga Orchestration**         | Provide state checkpointing and compensating rollbacks for failed agent actions | Step-based / Event-driven                        | Complex multi-agent execution, human-in-the-loop approvals                  | Temporal, LangGraph Server, Restate, Prefect     | Azure Durable Functions, AWS Step Functions            |
| **CQRS for RAG**               | Decouple heavy embedding ingestion (Write) from sub-100ms vector lookups (Read) | Read: <100ms<br><br>  <br><br>Write: Async batch | Enterprise knowledge base search, real-time news semantic indexing          | Ray Data, Unstructured, Qdrant, Milvus, PGvector | AWS Bedrock KB, GCP Vertex AI Search, Pinecone         |
| **Streaming Request-Response** | Stream tokens frame-by-frame via SSE/WebSockets to bypass 30s gateway limits    | Real-time (<200ms TTFT)                          | Interactive LLM chat, real-time text-to-speech (TTS), inline IDE assistance | vLLM, SGLang, TensorRT-LLM, Envoy Gateway        | Cloudflare Workers, GCP Cloud Run, AWS API Gateway     |

Explore more about the several articles shared about these pattern with real use-cases below

- [Medium - Serverless Advocate](https://blog.serverlessadvocate.com/)
- [AWS - Serverless generative AI architectural patterns – Part 1](https://aws.amazon.com/blogs/compute/serverless-generative-ai-architectural-patterns/)
- [AWS - Serverless generative AI architectural patterns – Part 2](https://aws.amazon.com/blogs/compute/part-2-serverless-generative-ai-architectural-patterns/)
- [Blog - Serverless Allocation Models For ETL And AI Workloads](https://www.dataexpert.io/blog/serverless-allocation-models-etl-ai-workloads)
- [Medium - How I Architected an AI-Powered, Serverless Content Moderation Pipeline on AWS](https://aws.plainenglish.io/how-i-architected-an-ai-powered-serverless-content-moderation-pipeline-on-aws-950a00e2eb81)
- [Unite.ai - The Future of Serverless Inference for Large Language Models](https://www.unite.ai/the-future-of-serverless-inference-for-large-language-models/)
- [Modal - How we achieved truly serverless GPUs](https://modal.com/blog/truly-serverless-gpus)
- [AWS - Production-Ready Real-Time Monitoring Solution for LLMs on Amazon SageMaker AI Endpoint inference](https://builder.aws.com/content/39pAP53j9mlK9o1NBBjWZ4HMJPl/production-ready-real-time-monitoring-solution-for-llms-on-amazon-sagemaker-ai-endpoint-inference)
## Bonus: Cloud Native, Edge Computing with Serverless

My interest in delving deeper into serverless computing stems from its tight coupling with the present and future of IT infrastructure. Attending **KubeCon Japan 2026** exposed me to advanced use cases, such as Edge Computing (e.g: KubeEdge, K0s), that are not yet widely adopted within my local market. Explore more them via my session at [[For Japan and KubeCon 2026 - Recaps and Keynotes]]

During this servless Architecture, I just ask why not if we find out the diverse of Edge Computing, Serverless for small workload but run them in edge node, orchestration and reponse the end result, the combination called Cloud-edge Continuum, and you can explore more about them via these articles below

- [LFEdge - Breaking Down the Edge Continuum](https://lfedge.org/breaking-down-the-edge-continuum/)
- [DecipherZone - Cloud Native Architecture in 2026: 8 Trends, Tools, and Implementation Guide](https://www.decipherzone.com/blog-detail/cloud-native-architecture-trends)

Following reasearch and AI Involving, I see there are severals point to combine them into one workflow with high dependencies and intelligence loop works, and these step cover by

- **Cloud Native Heavy Processing**: The observability, ranking, training and quatization model as automatically should processed on this pipeline --> Scale down model into size INT4/FP8
- **Low-Power Edge Execution**: Lightweight runtimes (like [WasmEdge](https://wasmedge.org/) or micro-containers) run compressed $1\text{--}7\text{B}$ parameter models or tiny LoRA adapters directly on local NPU or GPU hardware.

>[!info]
>There are Low-Power said about `micro-containers`, so it refers to stripping down traditional containerization to its bare minimum binary dependencies to eliminate OS overhead on constrained edge hardware.
>There are 3 Technologies Powering "Micro-Containers"
>1. Minimal OCI Containers (Distroless & Scratch Images): [distroless](https://github.com/googlecontainertools/distroless)
>2. Embedded Container Engines & Runtimes: [crun](https://github.com/containers/crun) / [youki](https://youki-dev.github.io/youki/) start containers in sub-50ms with single-digit megabyte RAM footprints, or [balenaEngine](https://www.balena.io/engine), A purpose-built IoT container engine 3.5x smaller than Docker CE, uses binary diffing (deltas) to send 10x smaller updates, and prevents storage corruption during sudden power losses.
>3. MicroVMs and Unikernels: MicroVMs ([Firecracker](https://firecracker-microvm.github.io/) / [Cloud Hypervisor](https://github.com/cloud-hypervisor/cloud-hypervisor)): Strips away hardware emulation from traditional QEMU VMs. Or Unikernels ([Unikraft](https://github.com/unikraft/unikraft), [OSv](https://github.com/cloudius-systems/osv)) Compiles your AI inference code and only the exact operating system primitives it needs into a single bootable binary image, bypassing traditional Linux user-space entirely.

| **Dimension**                | **WebAssembly (WasmEdge)**                      | **Micro-Containers (crun / Distroless / Balena)**       |
| ---------------------------- | ----------------------------------------------- | ------------------------------------------------------- |
| **Isolation Level**          | Process-level sandbox (WASI capability model)   | OS-level kernel isolation (Linux cgroups & namespaces)  |
| **Cold-Start Time**          | Sub-10ms (instant invocation)                   | 50ms – 500ms                                            |
| **Memory Footprint**         | Ultra-low (1 MB – 10 MB)                        | Low (15 MB – 50 MB)                                     |
| **C/C++ AI Library Support** | Requires WASI-NN bindings or dynamic host calls | Native support for any Linux C++/CUDA/TensorRT driver   |
| **Tooling Compatibility**    | Emerging Wasm ecosystem (Spin, Wasmtime)        | Standard OCI/Docker registries, Helm, and K8s manifests |
- **Edge-to-Cloud Telemetry:** Edge devices capture edge cases, failed queries, or low-confidence predictions. Anonymized data streams back to cloud queues (Kafka, MQTT).
- **Continuous Adapter Sync:** Serverless GPU workers execute automated micro-fine-tuning on the newly queued edge data, pushing updated lightweight LoRA adapters back to edge devices [over-the-air (OTA)](https://blog.devops.dev/a-deep-dive-into-ota-update-support-with-kubeedge-for-edge-kubernetes-690da554b727).

>[!info]
>Serverless architecture unlocks low-power Edge GPUs and NPUs by replacing continuous, power-hungry background models with event-driven, sub-second inference micro-bursts. This eliminates thermal overload and battery drain on constrained edge devices while dynamically managing shared system memory.

There are few key-patterns design for Serverless GPU Inference

- **Micro-Wasm Event Activation (Cold Starts < 10ms)**: Edge Serverless function use lightweight WebAssembly Runtime (e.g: WasmEdge with WASI-NN) for instanly wake up by sensors, execute GPU/NPU Inference and easier to scale to zero memory state after complete.
- **Unified Memory Slicing**: [Embedded SoCs](https://en.wikipedia.org/wiki/System_on_a_chip) (like NVIDIA Jetson or NXP eIQ) share system RAM between the CPU and NPU/GPU. Serverless edge schedulers allocate memory frames on-the-fly per function invocation, preventing OOM crashes on devices with as little as 4GB–16GB total RAM.
- **Dynamic GGUF & Adapter Hot-Swapping**: A single quantized base model (e.g., INT4 GGUF or ONNX runtime) remains resident in memory. Incoming serverless event triggers dynamically load tiny task-specific adapters (LoRA) or vision heads for OCR, anomaly detection, or voice commands without reloading the base engine.
- **Cascading Confidence Offload (Edge-to-Cloud Fallback)**: Edge serverless functions execute local inference for sub-10ms response times. If the local model's confidence score falls below a set threshold, the function asynchronously offloads the raw frame or query to a Cloud Serverless GPU cluster (like vLLM on EKS/GKE) for high-precision validation.

| **Architectural Layer**   | **Tools & Runtimes**                                      | **Role in Edge Inference**                                                  |
| ------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------- |
| **Serverless Runtime**    | WasmEdge (WASI-NN), Spin, OpenFaaS Edge, K3s + Knative    | Sub-10ms event triggers with a <10MB memory footprint                       |
| **Edge Inference Engine** | llama.cpp (GGUF), ONNX Runtime, TensorRT-Edge, ExecuTorch | Low-precision (INT4/FP16) execution on embedded silicon                     |
| **Hardware Abstraction**  | Akri, NVIDIA JetPack, NXP eIQ                             | Discovers and exposes heterogeneous NPUs/GPUs to serverless workloads       |
| **Sync & Telemetry**      | MQTT (Mosquitto/EMQX), Apache Kafka, NATS                 | Handles async event triggers, edge telemetry, and OTA model adapter updates |

With [LF Edge (Linux Foundation)](https://lfedge.org/) , unifies the fragmented Operational Technology (OT) hardware landscape. It provides open frameworks to discover, virtualize, and orchestrate edge nodes and IoT protocols.

| **LF Edge Project**                            | **Architectural Layer**            | **Primary Function in the Edge AI Pipeline**                                                                      |
| ---------------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Project EVE** _(Edge Virtualization Engine)_ | Bare-Metal Hardware Virtualization | Provides an immutable, zero-trust host OS with A/B dual-partition updates on bare-metal gateways.                 |
| **EdgeX Foundry**                              | OT/IT Interoperability Framework   | Normalizes raw industrial sensor protocols (Modbus, BACnet, OPC-UA) into structured JSON/MQTT events.             |
| **Akri**                                       | K8s Resource Discovery             | Automatically detects leaf devices (IP cameras, local NPUs, USB sensors) and presents them as K8s resources.      |
| **Open Horizon**                               | Policy-Based Orchestration         | Manages autonomous deployment and lifecycle updates of container/Wasm workloads across thousands of edge nodes.   |
| **Fledge / eKuiper**                           | Stream Analytics & Filtering       | Filters noise and processes high-frequency time-series data locally before passing key triggers to the AI engine. |

![[thumbnail-kube-edge-computing.png]]

>[!info]
>Edge computing is an infrastructure topology—executing compute near the data source—rather than a single software stack

- **Near Edge (Regional Gateways / MEC):** Runs lightweight Kubernetes distributions (K3s, KubeEdge, MicroK8s) to orchestrate microservices and AI engines on multi-gigabyte industrial hardware.
- **Far Edge (Micro-Devices / SoCs):** Bypasses Kubernetes entirely due to strict memory ($\le 1\text{ GB}$) and thermal power ($5\text{--}15\text{ W}$) limits, relying on bare-metal hypervisors (Project EVE) and WebAssembly runtimes (WasmEdge with WASI-NN).
- **LoRA Mechanics on Edge:** A quantized base model (e.g., INT4 Llama or Vision Transformer) sits permanently in local device RAM/NPU. Event-driven serverless triggers hot-swap lightweight task adapters (10MB–50MB LoRAs or ONNX heads) on demand without pulling gigabytes over metered cellular networks.

Here is the matrix for reflecting the Edge AI Solves Infrastructure problems

|**Industry**|**Core Problem at the Edge**|**Edge AI & Serverless Solution**|**Key Tools & Architecture**|
|---|---|---|---|
|**Telecom (5G/6G MEC & OpenRAN)**|Cloud latency (>50ms) breaks real-time radio beamforming and dynamic network slicing across dense cell towers.|Near-Edge Multi-access Edge Computing (MEC) servers execute reinforcement learning (xApps) to reallocate radio bandwidth locally in sub-10ms loops.|K3s / KubeEdge, OpenRAN RIC, ONNX Runtime, DPDK|
|**EV Charging Infrastructure**|Concurrent fast-charging surges burn out local grid transformers, causing localized power outages.|Localized AI load-balancing algorithms run directly on charging station gateways. They adjust power output across 20+ piles in sub-second intervals, maintaining local stability even when offline.|WasmEdge, MQTT (Mosquitto/EMQX), Rust/Python micro-runtimes|
|**Virtual Power Plants (VPP)**|Centralized cloud controllers react too slowly to sub-second utility grid frequency spikes (50Hz/60Hz).|Edge controllers aggregate local solar inverters, battery storage, and smart HVACs. Local ML models adjust charge/discharge cycles in $<100\text{ ms}$ to stabilize the grid locally.|Project EVE, EdgeX Foundry, Modbus/OPC-UA|
|**Clean Power (Solar & Wind)**|Remote solar and wind farms have poor satellite bandwidth and require sub-second hardware safety controls.|On-site edge vision and vibration models run on low-power NPUs to feather wind turbine blades during dangerous gusts or adjust solar panel angles based on local cloud movement.|WASI-NN, TensorRT-Edge, NXP eIQ, Local Time-Series DBs|
>[!info]
>Across all four domains, the underlying blueprint remains identical: keep execution local for deterministic speed, and use serverless event triggers to swap lightweight model adapters without relying on a persistent cloud connection.

Explore couple of articles, papers about this topics and enjoyed

- [Youtube - WasmEdge: Cross-Platform, High-Performance, Lightweight, Embeddable Multi-Modal LLM Runtime](https://www.youtube.com/watch?v=5_wTuySm7lE)
- [WasmEdge - Use Cases](https://wasmedge.org/docs/start/usage/use-cases/) & [WasmEdge - Book Version](https://wasmedge.org/book/en/use_cases)
- [NCBI - Tactile IoT Architecture for the IoT—Edge—Cloud Continuum: The ASSIST-IoT Approach](https://www.ncbi.nlm.nih.gov/books/NBK602366/)
- [MDPI - Cloud-Native Workload Orchestration at the Edge: A Deployment Review and Future Directions](https://www.mdpi.com/1424-8220/23/4/2215)
- [AWS - Building a Charging Station Management System with AWS](https://aws.amazon.com/blogs/industries/building-a-charging-station-management-system-with-aws/)
- [Arxiv Paper - Towards Seamless Serverless Computing Across an Edge-Cloud Continuum](https://arxiv.org/abs/2401.02271)
- [Arxiv Paper - Edge Deployment of Small Language Models, a comprehensive comparison of CPU, GPU and NPU backends](https://arxiv.org/pdf/2511.22334)
- [HuggingFace - An Edge-First Generalized LLM LoRA Fine-Tuning Framework for Heterogeneous GPUs](https://huggingface.co/blog/qvac/fabric-llm-finetune)
- [CNCF - Kubernetes on the edge: getting started with KubeEdge and Kubernetes for edge computing](https://www.cncf.io/blog/2022/08/18/kubernetes-on-the-edge-getting-started-with-kubeedge-and-kubernetes-for-edge-computing/)
- [MDPI - Local Scheduling in KubeEdge-Based Edge Computing Environment](https://www.mdpi.com/1424-8220/23/3/1522)
- [VMWare - Great Opportunity and Great Risk at the Network Edge](https://blogs.vmware.com/sase/2022/03/02/great-opportunity-and-great-risk-at-the-network-edge/)
- [MDPI - Performance Evaluation of Container Orchestration Tools in Edge Computing Environments](https://www.mdpi.com/1424-8220/23/8/4008)
- [Alibaba - OpenYurt: The Practice of Extending Native Kubernetes to the Edge](https://www.alibabacloud.com/blog/openyurt-the-practice-of-extending-native-kubernetes-to-the-edge_597903)
- [Kubernetes - KubeEdge, a Kubernetes Native Edge Computing Framework](https://kubernetes.io/blog/2019/03/19/kubeedge-k8s-based-edge-intro/)
# How I am implementing DIY Chatbot with Serverless

![[thumbnail-bot-serverless-cloudflare.png]]

## Why I choose Serverless

If you are exploring serverless architectures, I hope this breakdown offers valuable insights for your upcoming projects. Below is a solution showcase featuring a DIY Chatbot built using **[Cloudflare Workers](https://developers.cloudflare.com/workers/)** and **[Cloudflare D1](https://developers.cloudflare.com/d1/)** to automate KPI management and workload tracking based on daily user activity.

But answer reason why, because I think that match with my requirments

- **Zero Server Management**: Eliminates the operational overhead of managing VPS or dedicated server infrastructure. Designed with non-technical maintenance in mind, it simplifies configuration through managed compute boundaries.
- **Generous Free Tiers**: Among the various architectural approaches, serverless platforms offer extensive free usage tiers. **[Cloudflare Workers](https://developers.cloudflare.com/workers/)** serves as a highly cost-effective runtime for lightweight execution.
- **Seamless Messaging Platform Integration**: Functioning as an event-driven webhook handler, serverless architecture integrates effortlessly with messaging services like Zalo or Telegram, ideal for asynchronous, user-triggered workflows.
- **Multi-Language & Framework Flexibility**: Modern serverless runtimes offer flexible implementation choices across various languages and frameworks, particularly JavaScript/TypeScript and Python.

Based on these criteria, a serverless pattern implementing a Request-Response or API Proxy architecture serves as a refined, production-ready design for building automated chat workflows.

Choosing the right provider is a critical decision. While Cloudflare Workers was ultimately selected for edge performance, another compelling option considered during initial evaluation was **[Google Apps Script](https://developers.google.com/apps-script/overview)**.

![[icon-google-appscript.png]]

>[!summary] Apps Script
>A rapid application development platform that makes it fast to create business applications that integrate with Google Workspace. You write code in modern JavaScript and have access to built-in libraries for Google Workspace applications like Gmail, Google Calendar, Google Drive, and more.

Following these features, I thought about that cool if I can use Google Sheet to DataStorage saving the both AppScript implemented by JavaScript, and also keep the data of workloads tracker and API Managment. With AppScript, you can perform not only Google Sheet, but futhermore like

- Add [custom menus](https://developers.google.com/apps-script/guides/menus), and [dialogs & sidebars](https://developers.google.com/apps-script/guides/dialogs) to Google Docs, Google Sheets, and Google Forms.
- Write [custom functions](https://developers.google.com/apps-script/execution_custom_functions) and [macros](https://developers.google.com/apps-script/guides/sheets/macros) for Sheets.
- Publish [web apps](https://developers.google.com/apps-script/execution_web_apps)—either standalone or embedded in Google Sites.
- Interact with other [Google services](https://developers.google.com/apps-script/guides/services), including Google AdSense, Google Analytics, Calendar, Drive, Gmail, and Google Maps.
- Build lightweight [add-ons](https://developers.google.com/apps-script/add-ons/overview) and publish them to Google Workspace Marketplace. If you anticipate building large-scale add-ons, refer to [Build a Google Workspace add-on using HTTP endpoints](https://developers.google.com/workspace/add-ons/guides/alternate-runtimes).

Not only building AppScript manually, but also Google provide **[clasp](https://github.com/google/clasp)** as CLI solution for helping you easier to delivery and update AppScript automatically. It provens more evidence to say that quite graduate solution to be setup. Explore more about [Clasp & How to use](https://developers.google.com/apps-script/guides/clasp) for more usage.

>[!warning] Actual Problems
>**Google blocks it on managed accounts.** The script needs sensitive OAuth scopes — spreadsheets and script.external_request — and an organisation account will refuse consent outright unless an admin allow-lists the script or the project is moved onto a GCP project with an Internal consent screen. Those scopes are irreducible here: it has to read a spreadsheet and it has to call the Zalo API.

Here is permission scopt I set for AppScript Project and get the block when running the function.

```json appsscript.json
{
  "timeZone": "Asia/Ho_Chi_Minh",
  "dependencies": {
    "enabledAdvancedServices": [
      {
        "userSymbol": "Drive",
        "serviceId": "drive",
        "version": "v2"
      }
    ]
  },
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8",
  "webapp": {
    "executeAs": "USER_DEPLOYING",
    "access": "ANYONE_ANONYMOUS"
  },
  "oauthScopes": [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/script.external_request",
    "https://www.googleapis.com/auth/script.scriptapp",
    "https://www.googleapis.com/auth/script.container.ui"
  ]
}
```

Due to the restrictions of Google Workspace permissions and GCP IAM via OAuth, I began considering an alternative approach. While this setup is beneficial for GCP-managed backends and I appreciate how it enhances ecosystem security, it demands significant time and effort for maintenance and upgrades. Consequently, I sought another solution, and Cloudflare's serverless architecture, featuring Workers and their broader ecosystem, proved to be the right choice for successfully implementing this project.

Explore if you want to delve deeper into the combination between Google App Scripts with Google Sheet, you can check this video for more information [Youtube - Google Apps Script for Beginners: Start Automating Google Sheets](https://www.youtube.com/watch?v=8UmdqwY9AdA)

## Cloudflare Serverless Ecosystem

After spending some time exploring Cloudflare's serverless offerings and ecosystem, my first impression is that their toolset is more than comprehensive. It provides extensive computing and serverless capabilities that seamlessly connect you with various services, such as the D1 database (SQLite) and R2 object storage. What ultimately led me to choose this platform—aside from it being one of the largest domain management systems—is that it offers the best generous free tier. It provides just the right amount of resources, allowing you to gracefully build small projects or experiment with your ideas within their ecosystem.

![[thumbnail-cloudflare-worker-free-tier.png]]

Double-check these articles hightlight below for more information about Cloudflare worker, Serverless compatible and free-tier with Cloudflare Free-tier Account.

- [Blog - Exploring Cloudflare's Free Tier](https://koryporter.com/posts/exploring-cloudflares-free-tier)
- [Cloudflare - Reaffirming our commitment to free](https://blog.cloudflare.com/cloudflares-commitment-to-free/)
- [Youtube - Cloudflare Workers in Action](https://www.youtube.com/watch?v=XdGD5WvTs04)
- [CloudFlare - How to build and deploy your web app fast](https://www.cloudflare.com/learning/serverless/how-to-deploy-app-or-website/)
- [CloudFalre -The Serverless Framework and Cloudflare Workers | What is the Serverless Framework?](https://www.cloudflare.com/learning/serverless/glossary/serverless-and-cloudflare-workers/)
- [CloudFlare - Introducing Services: Build Composable, Distributed Applications on Cloudflare Workers](https://blog.cloudflare.com/introducing-worker-services/)
- [Vietnix - Cloudflare Workers: Tìm hiểu giải pháp Serverless Edge cho Developer](https://vietnix.vn/cloudflare-workers/)

Let's delve deeper a little bit about CloudFlare Worker and Framework supported. You can explore deeply into it at [Cloudflare Worker - Documentation](https://developers.cloudflare.com/workers/)

>[!summary] Cloudflare Workers
>A serverless platform for building, deploying, and scaling apps across  [Cloudflare's global network](https://www.cloudflare.com/network/) with a single command — no infrastructure to manage, no complex configuration

Following these both concept I related about Serverless and Edge Computing, CloudFlare worker is one of them, and with this architecture that allow Cloudflare can deploy to the end user close as possible, help these application reduce latency and increase performance.

Cloudflare also support several framework and also [Serverless Framework](https://www.serverless.com/framework/docs), include

- Full-stack framework: [React](https://developers.cloudflare.com/workers/framework-guides/web-apps/react/), [Vue](https://developers.cloudflare.com/workers/framework-guides/web-apps/vue/), [Svelte](https://developers.cloudflare.com/workers/framework-guides/web-apps/sveltekit/), [Next](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/), [Astro](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/), [React Router](https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router/), [and more](https://developers.cloudflare.com/workers/framework-guides/)
- Multiple-language prefered: [JavaScript](https://developers.cloudflare.com/workers/languages/javascript/), [TypeScript](https://developers.cloudflare.com/workers/languages/typescript/), [Python](https://developers.cloudflare.com/workers/languages/python/), [Rust](https://developers.cloudflare.com/workers/languages/rust/), [and more](https://developers.cloudflare.com/workers/runtime-apis/webassembly/)

With diverse optional, I think you can deploy what ever you want from Front-end application (static-asset), backend-application (API), AI-Inference, Background jobs, and more stuff about Observability & Monitoring integrated

Not only that, Workers like I told that allow you to connect with several compute and storage services of Cloudflare like

- [Cloudflare D1](https://developers.cloudflare.com/d1/): Cloudflare's managed, serverless database with SQLite's SQL semantics, built-in disaster recovery, and Worker and HTTP API access.
- [Cloudflare R2](https://developers.cloudflare.com/r2/): Object storage for all your data. Egress bandwidth fees associated with typical cloud storage services.
- [Cloudflare Queues](https://developers.cloudflare.com/queues/): Send and receive messages with guaranteed delivery and no charges for egress bandwidth.
- [Cloudflare Cache/CDN](https://developers.cloudflare.com/cache/): Global CDN for rapid access static-content with high-performance.
- And [moreover](https://developers.cloudflare.com/workers/configuration/integrations/)

Moreover, Cloudflare worker provide several highlighted feature, like

- [Versioning & Deployments](https://developers.cloudflare.com/workers/versions-and-deployments/): Versioning each deployment version for archive or running with unique ID, and using them to proceed **[Canary Deployment](https://launchdarkly.com/blog/four-common-deployment-strategies/)** by spliting traffic across version with [Gradual Deployments](https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/)
- [wrangler CLI](https://developers.cloudflare.com/workers/wrangler/): Cloudflare worker CLI allowed you for run and configuration Cloud worker & page without access into Cloudflare dashboard, used this one for CI/CD pipeline, and handle multiple queries to compute and data storage of Cloudflare, e.g: Database D1.
- [Observability](https://developers.cloudflare.com/workers/observability/): Provide you full ecosystem to help you debug, analysis and understand your project under the control for following ingest request.

>[!quote]
>Throught to these features, Cloudflare workers and ecosystem enable all-in-one (AIO) system completely from code to application, database and deployment as life-cycle. I would to recommend find out to Cloudflare if you want to handle simple project, or serverless architecture.

## Zalo Chatbot Platform

Let's tell a abit about Zalo Chatbot Platform, and see what it got behind

![[thumbnail-zalo-bot.png]]

>[!summary] Zalo Chatbot Platform
>A comprehensive chatbot platform that empowers developers to seamlessly integrate bots into Zalo chats through straightforward and simple steps.

>[!info] FYI
>[Zalo](https://zalo.me/en/) is Vietnam's leading messaging platform. Initially released on August 8, 2012, by VNG Corporation, it has emerged as one of Vietnam's prominent tech unicorns. With nearly every citizen utilizing it for both professional communication and daily life, it stands as a source of national pride, deserving a major shoutout. Furthermore, Zalo integrates with various external tools and services, such as news outlets, banking, and flight bookings, transforming the platform into a comprehensive ecosystem for managing diverse tasks.

Based on these considerations and daily usage requirements, using the **Zalo Chatbot Platform** proved to be the best fit for this project. Although in an early stage, Zalo's free tier is generous for small projects, supporting up to 3 group chats and interactions with up to 50 users. It provides a cost-effective, straightforward solution for both technical and non-technical teams to build automated bots for daily task management.

To explore more about the Zalo Chat Platform, refer to these official resources:

- **[Create a bot](https://bot.zapps.me/en/docs/create-bot/)**: Step-by-step guide to provisioning your bot.
- **[Using the API](https://bot.zapps.me/en/docs/call-api/)**: Comprehensive API references and invocation methods.
- **[Webhook](https://bot.zapps.me/en/docs/webhook/)**: Webhook payload specifications and endpoint registration guidelines.

Currently, the Zalo Bot platform supports two primary mechanisms for receiving and processing messages with your backend:

- **Long Polling**: Periodically polls the server for new incoming messages.
- **Webhook**: Zalo automatically pushes event payloads to your registered HTTP endpoint.

For this setup, the **Webhook** approach is the optimal choice. It aligns seamlessly with serverless execution models by processing event-driven HTTP requests and returning immediate responses. You can explore further best practices and API reference details in the official documentation.

To get started, create your bot following the setup steps to obtain your bot token in the format `12345689:abc-xyz`. Once obtained, you are ready to register your webhook URL using the API structure below.

```http
 https://bot-api.zaloplatforms.com/bot${BOT_TOKEN}/functionName
```

## Wire them together

>[!warning] Disclaim
>Because of the source-code related some sentitive information, so I can't directly to share it. But I will try hard to be go in to detail to let you know how to build and setup by yourself.

First of all here is the code structure of project

```bash
├── package.json
├── package-lock.json
├── public
│   └── vendor
├── README.md
├── schema.sql
├── src
│   ├── bot.js
│   ├── crypto.js
│   ├── import.js
│   ├── index.js
│   ├── pages
│   ├── review.js
│   ├── score.js
│   ├── store.js
│   ├── template-spec.js
│   └── zalo.js
├── test
│   ├── harness.mjs
│   └── worker.test.mjs
└── wrangler.toml
```

- `wrangler.toml`:  Because we will use `wrangler` to deploy the application, so that one required for storing configuration, and `worker` setup 
- `src`: The entire source-code of project
- `schema.sql`: The schema of database D1 for migrating the schema for initialization
- `package.json`:  As you know you know, NodeJS package managament
- `public/vendor`: I use `exceljs` for helping excel generation runs in the browser, this public will store this script to release the heavy library out of workers. `exceljs` is served from this Worker's own origin (`public/vendor/`), never a CDN,  because the unit's network may block external hosts.

| File | Responsibility |
|---|---|
| `src/template-spec.js` | anchor rules — **ported from Apps Script with zero logic changes**, still covered by the same 66 assertions |
| `src/store.js` | all D1 access; the designated swap point |
| `src/zalo.js` | Bot API client, 2000-char chunking, retry on 429/5xx |
| `src/crypto.js` | HMAC + constant-time compare on WebCrypto |
| `src/bot.js` | commands and the logging grammar |
| `src/review.js` | signed links, period lock, page model |
| `src/import.js` | SheetJS reads .xls/.xlsx → anchors → D1 |
| `src/score.js` | KPI formulas |
| `src/pages/*` | review, export and admin pages |
Because I don't use any framework for this deployment, it's truly serverless with only the function implementation for several routes, and this one can work perfectly in Zalo for responding by [Javascript Language](https://developers.cloudflare.com/workers/languages/javascript/) and few examples in [Javascript](https://developers.cloudflare.com/workers/examples/?languages=JavaScript) for easier following.

There are some configuration of project, that able to show, including

```json package.json
{
  "name": "kpi-zalo-worker",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "wrangler dev",
    "deploy": "npm run vendor && wrangler deploy",
    "vendor": "cp node_modules/exceljs/dist/exceljs.min.js public/vendor/",
    "db:create": "wrangler d1 create kpi",
    "db:init": "wrangler d1 execute kpi --remote --file=./schema.sql",
    "db:init:local": "wrangler d1 execute kpi --local --file=./schema.sql",
    "test": "node --experimental-sqlite test/worker.test.mjs ../samples/grid.json"
  },
  "dependencies": {
    "xlsx": "^0.18.5"
  },
  "devDependencies": {
    "exceljs": "^4.4.0",
    "wrangler": "^4.125.0"
  }
}
```

```toml 
name = "kpi-zalo-bot"
main = "src/index.js"
compatibility_date = "2026-01-01"

# SheetJS parses the uploaded .xls server-side and wants a few Node builtins.
compatibility_flags = ["nodejs_compat"]

# worker.dev mode is not used and maybe lead to abuse domain errors, so we disable it. The custom domain is used instead.
workers_dev = false
preview_urls = false

# (opt) prevent the error when request with the abuse domain `worker.dev`, custom domain is used instead
routes = [
    { pattern = "abcd.example.com", custom_domain = true }
]

[[d1_databases]]
binding = "DB"
database_name = "kpi"
database_id = "<replace-by-your-id-init>"   # wrangler d1 create kpi

# exceljs is served from this Worker's own origin, not a CDN: the unit's
# network may block external CDNs, and the export page must not depend on one.
[assets]
directory = "./public"
binding = "ASSETS"


[vars]
TIMEZONE = "Asia/Ho_Chi_Minh"
# (opt) PUBLIC_URL = "https://abcd.example.com"
# Secrets are NOT here. Set them with `wrangler secret put`:
#   ZALO_BOT_TOKEN       from the Zalo Bot Manager OA
#   WEBHOOK_SECRET       8-256 chars per the Bot API docs; also sent to
#                        setWebhook. `openssl rand -hex 24` is a safe default.
```

Explore more about [Wrangler Configuration](https://developers.cloudflare.com/workers/configuration/) and [Wrangler Configuration File](https://developers.cloudflare.com/workers/wrangler/configuration/)

Let's talk a bit about mechanism how worker ship your code toward

>[!info]
>`wrangler` use the mechanism call [bundle](https://developers.cloudflare.com/workers/wrangler/bundling/) same as method you run when ship the static code for production environment with project like `react` or `vite`. The package to help you bundle called [esbuild](https://esbuild.github.io/)

In the configuration file, I set the entry point to the root file (`main = "src/index.js"`). `wrangler` reads this file, finds all imported modules, and resolves their specifiers. Before combining them into a single bundled file, it resolves package dependencies like `xlsx` via Node resolution into `node_modules/xlsx` (landing on `xlsx.mjs` per its exports map). This repeats transitively until no new dependencies appear.

After that, it compresses the bundled script with gzip to downscale the code size and uploads it along with **metadata** (bindings for DB, ASSETS, VARS, and Secrets) to the **Cloudflare API** as a multipart upload. At the edge, It's stored as one script and instantiated in a [V8 Isolate](https://v8.dev/). **It's why bundle size matters for cold start more than for bandwidth**

>[!info] V8 Isolate Instantiation & The Cold Start Impact
>Cloudflare Workers execute inside V8 Isolates rather than full virtual machines or Docker containers:
>- Zero-OS Boot Overhead: Traditional containerized FaaS (like AWS Lambda) must allocate virtual CPU, memory, and an operating system runtime during a cold start. V8 Isolates run thousands of separate scripts inside a shared process, eliminating OS-level startup delay.
>- Why Bundle Size Dictates Cold Starts: In an isolate architecture, cold-start latency is driven almost entirely by V8 script parsing and compilation time, not network transfer speed. A larger JavaScript bundle requires V8 to parse and evaluate more syntax trees before executing the first line of code, directly increasing execution latency.

>[!warning]
> **Dynamic imports break the graph.** `esbuild` resolves import statically. `await import(someVariable)` can't be followed, so the target won't be inlined and will fail at runtime. Everything in src/ is static, which is why this has never bitten you.
> 
> **Your dependencies vs devDependencies split is doing nothing for size**. What ships is decided purely by reachability from src/index.js. xlsx sits in dependencies and exceljs in devDependencies, and that's honest bookkeeping — but moving xlsx to devDependencies wouldn't shrink the bundle by a byte, and it would still ship.

Anyway, if you want to explore more about how worker worked, check this out [Cloudflare - How Workers works](https://developers.cloudflare.com/workers/reference/how-workers-works/)

Now let's run each command to fully deploy project

1. Install `wrangler`

```bash
npm install
```

2. Login `wrangler` session to Cloudflare. Or you can read [Cloudflare - Worker Authentication profiles](https://developers.cloudflare.com/workers/wrangler/profiles/)

![[worker-wrangler-permission.png]]

3. Create the database D1 and replace ID in `wrangler.toml` before running the migration with defined schema at `schema.sql`

```bash
npm run db:create              # copy the printed database_id into wrangler.toml
npm run db:init
```

4. Wrangler support both VARS import by configuration file for publish environment variable, and secret with command to keep them securable

```bash
npx wrangler secret put ZALO_BOT_TOKEN        # from the Zalo Bot Manager OA
npx wrangler secret put WEBHOOK_SECRET        # 8-256 chars: openssl rand -hex 24
```

5. Now run the deploy and ship the code

```bash
npm run deploy
```

>[!info] Opt
>If you use the custom-domain, you can deploy again with new env `PUBLIC_URL`, so help the bot can use custom domain to review it when `setWebhook`

Already you already setup full serverless in edge computing of Cloudflare with Cloudflare worker.

![[Pasted image 20260829153348.png]]

Now register the Zalo Bot with Webhook with `curl` command to set webhook

```bash
curl -X POST "https://bot-api.zaloplatforms.com/bot<BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-custom-domain.example.com",
    "secret_token": "mykey-abcyxz"
  }'
```

>[!danger] Failure
>Here is problem come, because Cloudflare will block the request from anonymous or strange browser or `user-agent` for severity check-up.

```json
{
  "ok": true,
  "result": {
    "ok": false,
    "url": "https://your-webhookurl.com",
    "status_code": 403,
    "outcome": "webhook.http.403",
    "latency_ms": 189,
    "hint": "Your server or CDN rejected the request with 403. Check WAF / Cloudflare rules, any IP allowlist, and that the User-Agent \"Java/<version>\" is permitted."
  }
}
```

Therefore, I cost one or two hours to debug with enable Log and check the error, and that lead into the [Issue: Browser Integrity Check](https://developers.cloudflare.com/waf/tools/browser-integrity-check/), it doesn't issue, it just the feature of Cloudflare to ensure connection come from external resources for prevent DDoS or Anomaly Activity, e.g: Bots, Crawlers, ... with challgenges.

In badly, Zalo bot use `User-Agent: Java/<version>` to send the request and it hits Browser Integrity Check rejects with a 403 at the edge — before the Worker runs.

To fix it, you need to define the additional rule for help you bypass this one for only Zalo Bot, with turn off **Browser Integrity Check**

>[!warning]
>I don't recommend the method to turn off the **Browser Integrity Check** entirely, because it make your domain and other service can encounter the abuse activity by anomaly activity.

You can find the configuration at **Your Domain -> Rules -> Overview -> Create Rule (Configuration Rules)** with 

- Expression: `(http.host eq "your-custom-domain.example.com")`
- Setting: **Browser Integrity Check → Off**

Now try again with register webhook `/setWebhook` and `/testWebhook` for checkup again

```bash
{
  "ok": true,
  "result": {
    "ok": true,
    "url": "https://your-custom-domain.example.com",
    "status_code": 200,
    "outcome": "webhook.ok",
    "latency_ms": 214,
    "hint": "Your endpoint responded successfully."
  }
}
```

Now you can test from Zalo Application to get the whole conversation with your Serverless via message.

![[Pasted image 20260829155513.png]]
# Conclusion

![[meme-awesome.png|center]]

>[!done] My Thoughts
>That's it, damn. It seemed easy at first, but there was a lot more information to digest than I initially thought. Anyway, taking a step back, you can gain a deeper understanding and knowledge of Serverless Architecture, design patterns, and some new keywords, such as Edge Computing or AI/ML on Serverless. Beyond that, I found the experience of trying to implement something new, learning a couple of serverless concepts, and handling them with Cloudflare Workers to be quite remarkable and engaging.

>[!quote]
>Well, it's been a long time, maybe six months 😮‍💨,since I last tried to write a full blog post about a DIY project, and the feeling is just like the old days: fantastic. I hope you gain valuable insights and knowledge about Serverless and take some time to enjoy exploring it before trying it out for yourself. By the way, I hope this blog helps keep my motivation alive; I plan to publish several more articles by the end of the year, so hopefully, those will be out soon. Finally, I hope you and your family are doing well. I hope everyone in my country has a wonderful holiday, and that the rest of you have a fantastic weekend. Stay tuned, and I'll see you soon, y'all. Bye!


