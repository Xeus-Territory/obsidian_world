---
title: "Kubewekend Session Extra 7: GitOps from day 1 in Kubernetes with ArgoCD"
tags:
  - kubewekend
  - k8s
  - devops
  - gitops
---

![[thumbnail-argocd-image-updater.png]]

>[!quote]
>Continuous of [[Kubewekend Session Extra 6]], I think I would try to release also the blog I already made but don't complete after a long time ago, today we will delve deeper into GitOps with Cloud Native, and discovery ArgoCD with Ecosystem that supported for user. Now let's finish with Kubewekend.

Before diving into GitOps for Kubernetes, I already dedicated a previous session to exploring the core GitOps methodology with hands-on examples focused on Infrastructure as Code (IaC) outside of a Kubernetes environment. If you are curious about how to apply GitOps to IaC tools like Terraform, check out [[Atlantis with ECS for automatic provisioning]].

# GitOps Today and in Cloud Native

## GitOps Glossary and Cloud Native with GitOps

>[!info] GitOps Glossary
>Following [GItOps Glossary of CNCF](https://glossary.cncf.io/gitops/), GitOps is a set of practices for managing software applications and infrastructure by continuously evaluating and reconciling their desired states as defined in a version control system such as Git against their actual state. Reconciling states includes changing the resources to match the defined state via deployment or updates.

To restructure operations and eliminate the recurring pitfalls of legacy workflows, such as configuration drift, failed deployments, environment inconsistencies, painful rollbacks, and poor change traceability, **GitOps** shifts infrastructure and application management from an imperative process into an **operational philosophy** rather than just a specific toolset. Built on four foundational OpenGitOps principles, **Declarative** state, **Versioned and Immutable** storage, **Automated Pull** delivery, and **Continuous Reconciliation**, GitOps delivers deterministic reliability out of the box when teams and organizations adopt it properly.

After returning from [KubeCon Japan last July 2026](https://www.youtube.com/playlist?list=PLH1zduub3WrE) and catching up on [KubeCon NA last week](https://www.youtube.com/playlist?list=PLTr_Dw92PnXU), it is clear that GitOps adoption continues to accelerate. The methodology powers massive production systems worldwide, anchored by two CNCF Graduated projects, **Argo CD** and **Flux**, which continue to earn recognition across enterprise case studies for enabling Cloud Native teams to distribute massive workloads and scale effortlessly, including:

- [CNCF - The Evolution of GitOps in Platform Engineering - Artem Lajko, iits](https://www.youtube.com/watch?v=MlrBMgmGpyA) - GitOps in Platform Engineering, interesting concept and clearly presentation by Artem Lajko
- [CNCF - GitOps at Meta: How Meta Is Accelerating AI Infrastructure Deployments with Argo CD, Helm and Kubernetes](https://www.cncf.io/case-studies/meta/) - Winner of the CNCF End User Case Study contest at KubeCon NA 2026. Read the announcement [here](https://www.cncf.io/announcements/2026/11/11/meta-wins-cncf-end-user-case-study-contest-for-accelerating-ai-infrastructure-deployments-from-hours-to-minutes/).
- [CNCF - Galaxy FinX - Scaling Kubernetes Operations to 100+ Clusters with GitOps and Argo CD](https://www.cncf.io/case-studies/galaxy-finx/) - A standout CNCF case study from Vietnam.
- [CNCF - Deltatre chose Flux, Helm and K8s to automate and scale](https://www.cncf.io/case-studies/deltatre/) - A CNCF case study highlighting Flux at scale.
- [CNCF - Streamlining application deployment on Kubernetes at RBC Capital Markets: A journey with FluxCD](https://www.cncf.io/blog/2025/05/22/streamlining-application-deployment-on-kubernetes-at-rbc-capital-markets-a-journey-with-fluxcd/) - An end-user adoption story with Flux.
- [ArgoCon Japan 2026](https://www.youtube.com/playlist?list=PLIpHGd5-uZ40) - Session playlist from ArgoCon Japan 2026.
- [FluxCon 2026 NA](https://www.youtube.com/playlist?list=PLCqn2cxbl5ik) - Session playlist from FluxCon North America 2026.

Across these case studies and community sessions, organizations consistently highlight tangible operational gains from adopting GitOps:

- **Decoupling Infrastructure and Application Delivery:** Transitioning application deployments out of monolithic Terraform runs into Argo CD resolves state-drift issues and provides continuous, real-time application health verification.
- **Git as the Single Source of Truth:** Version-controlled repositories serve as an auditable compliance boundary for every infrastructure and application change.
- **Multi-Cluster Scalability:** Seamlessly distributing and synchronizing applications across large fleets of Kubernetes clusters using Argo CD.
- **Faster Deployments and Troubleshooting:** Accelerating release velocity from hours to minutes while cutting down mean time to resolution (MTTR) with Argo CD's live diffing and sync visibility.
- **Reliable Rollouts and Rollbacks:** Ensuring predictable deployments and instant, deterministic rollbacks to previous Git commits.

Beyond CNCF end-user recognition, the GitOps methodology continues to establish itself as a hardened industry standard for deployment strategies, delivering greater operational efficiency and significantly reducing configuration drift and deployment failures compared to traditional push-based CI/CD pipelines or manual operations. You can explore further architectural patterns and real-world implementations through the blogs and articles below

- [CNCF - GitOps 101: What’s it all about?](https://www.cncf.io/blog/2021/09/28/gitops-101-whats-it-all-about/)
- [Medium - Self Managed Argo CD — App Of Everything](https://medium.com/devopsturkiye/self-managed-argo-cd-app-of-everything-a226eb100cf0)
- [Medium - GitOps: How to Manage Dynamic Network Policy Changes at Scale Across 25 Clusters?](https://itnext.io/gitops-how-to-manage-dynamic-network-policy-changes-at-scale-across-25-clusters-0727ce1145e5)
- [Medium - GitOps at Scale: Mastering Multi-Cluster Management and Advanced Patterns](https://blog.devops.dev/gitops-at-scale-mastering-multi-cluster-management-and-advanced-patterns-ac335f11be46)
- [Medium - Configure CI/CD pipeline: GitlabCI, ArgoCD, HelmCharts & SOPS](https://medium.com/@golaneduard1/configure-ci-cd-pipeline-gitlabci-argocd-helmcharts-sops-3cbf94f300ed)
- [Medium - End-to-End DevSecOps and GitOps Implementation with Jenkins, Docker, SonarQube, Trivy, Terraform, ArgoCD, and Amazon EKS](https://medium.com/@harsh05/end-to-end-devsecops-and-gitops-implementation-with-jenkins-docker-sonarqube-trivy-terraform-3ae842882b75)
- [Medium - GitOps with Kubernetes, Terraform, Gitlab and FluxCD](https://medium.com/@prag-matic/gitops-with-kubernetes-terraform-gitlab-and-fluxcd-2875d1010dac)
- [Digital Ocean - Implementing GitOps using Flux CD](https://www.digitalocean.com/community/developer-center/implementing-gitops-using-flux-cd)
- [Codefresh - Understanding Argo CD: Kubernetes GitOps Made Simple](https://codefresh.io/learn/argo-cd/)
- [Medium - Kubernetes ClusterAPI + ArgoCD = easy end-to-end declarative GitOps for platform teams](https://jason-umiker.medium.com/kubernetes-clusterapi-argocd-easy-end-to-end-declarative-gitops-for-platform-teams-0d237504f6a0)
- [Medium - Top 30 Argo CD Anti-Patterns to Avoid When Adopting Gitops](https://medium.com/containers-101/top-30-argo-cd-anti-patterns-to-avoid-when-adopting-gitops-1b147879297a)
- [Medium - How We Load Test Argo CD at Scale: 1,000 vClusters with GitOps on Kubernetes](https://itnext.io/how-we-load-test-argo-cd-at-scale-1-000-vclusters-with-gitops-on-kubernetes-d8ea2a8935b6)
- [Medium - Manage multiple clusters with Argo CD (using Operator)](https://abhishekveeramalla-av.medium.com/manage-multiple-clusters-with-openshift-gitops-based-on-argo-cd-84e1fa761218)
- [GitHub - gitops-bridge](https://github.com/gitops-bridge-dev/gitops-bridge): a community project that aims to showcase best practices and patterns for bridging the process of creating a Kubernetes cluster to subsequently managing everything through GitOps. It focuses on using [ArgoCD](https://www.cncf.io/projects/argo/) or [FluxCD](https://www.cncf.io/projects/flux/), both of which are CNCF-graduated projects.
## GitOps Landscape and New Opportunities

![[thumbnail-gitops.png]]

### Landscape

In 2026, GitOps remains a dominant standard with a proven track record across Cloud Native ecosystems. Looking across the [CNCF Landscape](https://landscape.cncf.io/), the [CD Foundation](https://landscape.cd.foundation/), and [The Linux Foundation](https://www.linuxfoundation.org/projects), **Argo CD** and **Flux** remain the two premier choices for Kubernetes GitOps—each offering a distinct architectural model and ecosystem. Argo CD ships with a centralized web UI, built-in multi-tenant RBAC, and its own API server, whereas Flux operates as a set of composable, Kubernetes-native CRD controllers driven primarily via CLI and declarative manifests.

Beyond Argo CD and Flux, several other tools support Git-driven continuous delivery across Kubernetes and hybrid environments:

- **[Jenkins X](https://jenkins-x.io/):** Automated CI/CD for Kubernetes with built-in GitOps promotion workflows.
- **[PipeCD](https://pipecd.dev/):** Continuous delivery for declarative Kubernetes, serverless, and multi-cloud infrastructure applications.
- **[Spinnaker](https://github.com/spinnaker/spinnaker):** An open-source, multi-cloud continuous delivery platform designed for complex, multi-stage release pipelines at enterprise scale.

When navigating the GitOps landscape, the foundational architectural decision starts with **Push vs. Pull**:

>[!summary]
>As outlined in [CNCF - GitOps in 2025: From Old-School Updates to the Modern Way](https://www.cncf.io/blog/2025/06/09/gitops-in-2025-from-old-school-updates-to-the-modern-way/), understanding the boundary between these two approaches defines your operational model:
>
>- **Pull-based GitOps** is the model popularized by tools like **Argo CD** and **Flux**. An in-cluster operator continuously watches your Git repository (or OCI registry) for changes and *pulls* updates into the cluster while correcting any live configuration drift.
>- **Push-based CD** resembles a traditional CI/CD flow, where an external pipeline (such as Jenkins, GitHub Actions, or GitLab CI) *pushes* manifests directly into the cluster as part of a pipeline execution.
>
>In short:
>- **Pull** = declarative, autonomous clusters with continuous drift remediation.
>- **Push** = controlled, event-driven pipeline execution.

In practice, many teams adopt a **Hybrid** workflow, combining **Push-based CI triggers** with **Pull-based GitOps reconciliation** to get immediate deployment speed without sacrificing drift protection:

- **CI Stage (Push):** When code is merged, your CI pipeline builds the artifact, updates the target image tag or manifest in your GitOps repository, and immediately fires a **Webhook** event to notify the CD controller that a new desired state is ready.
- **CD Stage (Pull & Reconcile):** Instead of waiting for the default polling interval (typically 3 minutes), the GitOps controller immediately pulls the updated Git state upon receiving the webhook, compares it against the live cluster, and reconciles the diff. Meanwhile, background polling remains active as a fallback safety net to catch and self-heal any manual out-of-band configuration drift.

However, this hybrid pattern introduces two operational trade-offs you need to plan for:

- **Network Exposure & Security:** To receive webhooks from an external Git provider (such as GitHub or GitLab), a private cluster must expose an inbound endpoint for the webhook receiver, requiring strict IP allowlisting, TLS termination, and webhook secret validation.
- **Tooling Maintenance Overhead:** You must maintain both CI pipeline logic (to mutate manifests and dispatch triggers) and the in-cluster GitOps operator configurations.

To explore the broader GitOps landscape, compare tooling architectures, and learn proven production patterns, check out the resources below

- [awesome-gitops](https://github.com/weaveworks/awesome-gitops): A curated list for awesome GitOps resources
- [GitHub - awesome-argo](https://github.com/akuity/awesome-argo): A curated list of awesome projects and resources related to Argo (a CNCF graduated project)
- [GitHub - awesome-flux-infra](https://github.com/brainfair/awesome-flux-infra): This repository contains infrastructure applications and add-ons installed in Kubernetes via FluxCD v2.
- [CNCF - GitOps in 2025: From Old-School Updates to the Modern Way](https://www.cncf.io/blog/2025/06/09/gitops-in-2025-from-old-school-updates-to-the-modern-way/)
- [Encore - GitOps Tools in 2026: Argo CD, Flux, Spinnaker and Alternatives](https://encore.dev/articles/gitops-tools)
- [Qovery - Top GitOps Tools for Kubernetes in 2026: 12 Options Compared, Plus What Changes When Agents Write the YAML](https://www.qovery.com/blog/gitops-tools-kubernetes-ai-agents-compared)
- [ControlPlane - Argo CD vs Flux in 2026: How to Structure GitOps for Environments, Apps, and Clusters, and Roll Out Changes Safely](https://controlplane.com/blog/post/argo-cd-vs-flux-gitops-environments-clusters)
- [Portainer.io - ArgoCD vs Flux: The Complete 2026 GitOps Comparison Guide](https://www.portainer.io/blog/argocd-vs-flux)
- [GitOps.tech](https://www.gitops.tech/): A book and community about GitOps
- [TheNewStack - Push vs. Pull in GitOps: Is There Really a Difference?](https://thenewstack.io/push-vs-pull-in-gitops-is-there-really-a-difference/)
- [TheNewStack - 6 GitOps Practices That Actually Work](https://thenewstack.io/6-gitops-practices-that-actually-work/)
### New Opportunity

![[thumbnail-gitops-evolution-and-opportunity.png]]

With the rapid growth of AI workloads and Cloud Native platforms, operating Kubernetes at scale introduces new complexities—directly reshaping how we design and control deployments through GitOps strategies. Rather than just being an operational hurdle for adopters, this shift presents a major opportunity to make your centralized Cloud Native architecture more reliable, more secure, and ready for agentic AI integration. That is why it is worth diving deeper into two advanced GitOps pillars:

**First**, let's look at **Progressive Rollouts**. If you have explored deployment strategies in Kubernetes, such as those documented in [GitHub - k8s-deployment-strategies](https://github.com/ContainerSolutions/k8s-deployment-strategies)—you know that standard Kubernetes `Deployment` objects only provide basic `RollingUpdate` or `Recreate` strategies. Pairing GitOps with a progressive delivery controller (like **Argo Rollouts** or **Flagger**) unlocks fine-grained traffic shifting and automated verification:

- **How it works right:** You commit a new container image tag to Git, and Argo CD or Flux syncs the `Rollout` CRD. The rollout controller then takes over—spinning up the canary `ReplicaSet`, instructing your ingress controller or service mesh (Gateway API, Traefik, Istio, or Cilium) to shift traffic incrementally (`5% → 25% → 50% → 100%`), and continuously evaluating `AnalysisRuns` against Prometheus or Grafana metrics to trigger automatic rollbacks if error rates spike.
- **The anti-pattern to avoid:** Never have a CI pipeline commit intermediate traffic weights (such as `weight: 20`) back into Git. Git should declare the static *strategy* (`steps: [setWeight: 20, pause: {duration: 5m}]`), while the rollout controller manages the ephemeral step progression in cluster memory.

![[thumbnail-gitops-rollout.png]]
<div align="center">
	<p style="text-align: center;">Source: Argo Rollouts</p>
</div>

Explore more about **Rollout Opportunity** topics:

- [ControlPlane - Long-Lived Infrastructure, GitOps, and Rolling Updates (2026): How Each Layer Rolls and Which Stack to Use](https://controlplane.com/blog/post/long-lived-infrastructure-gitops-rolling-updates)
- [Isovalent - Progressive Delivery with Argo Rollouts, Isovalent and Gateway API](https://isovalent.com/blog/post/argo-rollouts-and-gateway-api/)

![[thumbnail-gitops-promotion.png]]
<div align="center">
	<p style="text-align: center;">Source: Kargo</p>
</div>

**Second**, let's examine **Environment Promotion**. Out of the box, core GitOps engines like Argo CD and Flux focus on synchronizing a single target state—they do not natively orchestrate how artifacts move across environments. Historically, teams tried to solve this using long-lived Git branches (`dev` → `staging` → `prod`), which inevitably leads to merge conflicts and configuration drift. Purpose-built GitOps promotion mechanisms directly solve this pain point:

- **How it works right:** Adopt a **directory/overlay-per-environment** layout on a single `main` branch (or non-merging stage branches), paired with a dedicated promotion controller such as **[Kargo](https://kargo.io/)** (or **[Flux Image Update Automation](https://fluxcd.io/flux/components/image/imageupdateautomations/)** and **[Argo GitOps Promoter](https://github.com/argoproj-labs/gitops-promoter)**). Kargo introduces first-class `Warehouse` (artifact watcher), `Freight` (an immutable bundle of container images, Helm charts, and manifests), and `Stage` (`Dev → Staging → Prod`) resources. It runs automated verification checks in `Staging` before opening a PR or committing the `Freight` promotion to `Prod`.
- **Key advantage:** Environment promotion becomes declarative, auditable, and observable directly inside the cluster, eliminating fragile, bespoke bash scripts glued into CI pipelines.

Explore more about **Promotion Opportunity** topics:

- [Medium - GitOps Promotion with Kargo: Image Tag → Git Commit → Argo Sync](https://medium.com/@zxc0905fghasd/gitops-promotion-with-kargo-image-tag-git-commit-argo-sync-16ca3eec38d5)
- [Dev.to - Stop Using Branches for Deploying to Different GitOps Environments](https://dev.to/codefreshio/stop-using-branches-for-deploying-to-different-gitops-environments-5bmj)
- [Akuity - GitOps Promotion: How Kargo Moves Artifacts from Dev to Production](https://akuity.io/blog/how-kargo-fixes-gitops-with-promotion)
- [Akuity - GitOps Environment Promotion With Kargo’s Custom Steps](https://akuity.io/blog/kargo-custom-steps-gitops-promotion)
- [Blog - From Pull Request to Production: Tekton Pipelines as Code and Argo CD GitOps Promoter](https://piotrminkowski.com/2026/10/23/from-pull-request-to-production-tekton-pipelines-as-code-and-argo-cd-gitops-promoter/)

![[thumbnail-gitops-sbom-slsa.png]]
<div align="center">
	<p style="text-align: center;">Tekton, Cosign, Kyverno: A Signed CI/CD Supply Chain on RKE2 by George Ezejiofor</p>
</div>

**Third**, let's address **Software Supply Chain Security**. In traditional CI/CD, security checks happen solely at build time, meaning anyone with write access to the cluster or Git repository can bypass CI and deploy an unverified image. GitOps closes this gap by shifting verification to **reconciliation and admission time**, enforcing end-to-end provenance through **[SBOM (Software Bill of Materials)](https://www.redhat.com/en/topics/security/what-is-sbom)** and **[SLSA (Supply-chain Levels for Software Artifacts)](https://slsa.dev/)** standards

**How it works right:**

1. **CI (Produce & Sign):** Build the container image, generate an SBOM (with [Syft](https://github.com/anchore/syft)) and vulnerability report (with [Trivy](https://github.com/aquasecurity/trivy) or [Grype](https://github.com/anchore/grype)), and sign both the image digest and SLSA provenance attestations into your OCI registry using [**Sigstore Cosign**](https://github.com/sigstore/cosign).
2. **GitOps Sync (Verify Artifacts):** If using **Flux**, [`OCIRepository`](https://fluxcd.io/flux/components/source/ocirepositories/) resources natively verify Cosign signatures on packaged Kubernetes manifests before applying them to the cluster.
3. **Admission Controller (Enforce):** **Kyverno** ([`ImageValidatingPolicy`](https://kyverno.io/docs/policy-types/image-validating-policy/) rules) intercepts every Pod creation synced by Argo CD or Flux, validating that the image digest matches a trusted Cosign signature, carries a valid SBOM attestation, and has zero critical CVEs, while mutating mutable tags into immutable `@sha256:...` digests.

Explore more about **SBOM and SLSA** topics:

- [OneUptime - How to Implement Supply Chain Security with ArgoCD](https://oneuptime.com/blog/post/2026-02-26-argocd-supply-chain-security/view)
- [GitOps Security - GitOps Security Champion](https://gitopsecurity.com/)
- [CNCF - Moving secure GitOps forward with Flux](https://www.cncf.io/blog/2025/05/19/moving-secure-gitops-forward-with-flux/)
- [CNCF - Building secure software supply chains in CNCF with SLSA assessments](https://www.cncf.io/blog/2023/04/19/building-secure-software-supply-chains-in-cncf-with-slsa-assessments/)
- [NHIMG - GitOps Security Guide: Argo CD and Flux](https://nhimg.org/gitops-security-guide)
- [Medium - From GitOps to DevSecOps on a Home Server](https://medium.com/@maksymus/from-gitops-to-devsecops-on-a-home-server-8d95a13a58fb)
- [Blog - Tekton, Cosign, Kyverno: A Signed CI/CD Supply Chain on RKE2](https://georgeezejiofor.com/build-scan-sign-cicd-supply-chain-rke2)
- [Sailor.sh - Image Signing & Verification for the CKS Exam: Cosign, Sigstore & Enforcing Signed Images at Admission](https://sailor.sh/blog/cks-image-signing-verification-cosign-sigstore-admission/)

**Fourth**, **Policy as Code** is one of the strongest native fits for GitOps because policies are declarative YAML and CEL manifests that follow the exact same PR review and sync lifecycle as application code.

**How it works right:** Store **Kyverno** policies or native Kubernetes **ValidatingAdmissionPolicies (CEL)** in a dedicated platform Git repository synced by your GitOps agent. This gives you a **dual-gate defense**:

- **Shift-Left (CI):** Run [`kyverno apply`](https://kyverno.io/docs/kyverno-cli/reference/kyverno_apply/) or [`chainsaw`](https://github.com/kyverno/chainsaw) tests on Pull Requests to block misconfigurations before they ever merge.
- **Shift-Right (Runtime):** The cluster admission controller enforces those exact same policies continuously, blocking manual `kubectl edit` drift and generating `PolicyReport` CRDs for compliance dashboards.

Explore more about **Policy as Code** topics:

- [Isovalent - From Tickets to Pull Requests: Running Cilium in a GitOps Platform](https://isovalent.com/blog/post/cilium-gitops-platform-engineering/)
- [CNCF - GitOps policy-as-code: Securing Kubernetes with Argo CD and Kyverno](https://www.cncf.io/blog/2026/04/02/gitops-policy-as-code-securing-kubernetes-with-argo-cd-and-kyverno/)

**Fifth**, modern GitOps extends well beyond stateless Kubernetes Deployments to cover full-stack cloud infrastructure and dynamic secrets through **Configuration as Code**:

- **Infrastructure via Crossplane:** Instead of running Terraform imperatively in CI (where state locks and drift go unnoticed until the next pipeline run), **Crossplane** brings databases, DNS records, object storage, and VPCs into Kubernetes as Composite Resources (`XRs`). Argo CD or Flux reconciles the `XR`, and Crossplane continuously corrects infrastructure drift 24/7.
- **Secrets without Plaintext in Git:** Never commit raw secrets to Git. Store `ExternalSecret` manifests in Git that reference secret paths in **OpenBao** or **HashiCorp Vault**. The **External Secrets Operator (ESO)** reconciles those manifests and injects native Kubernetes `Secrets` dynamically at runtime.

Explore more about **Configuration as Code** topics:

- [RedHat - Manage automation controller Configuration as Code (CaC) with Ansible](https://www.redhat.com/en/blog/ansible-automation-controller-cac-gitops)
- [TheNewStack - Our Approach to Config-as-Code at Octopus Deploy](https://thenewstack.io/our-approach-to-config-as-code-at-octopus-deploy/)

Integrating all five pillars unlocks a major architectural shift: **developers no longer interact with Kubernetes, Helm, or underlying infrastructure tooling directly**. It establishes

| **GitOps Pillar**               | **Without AI Agents (Deterministic)**                                            | **With AI Agents (Autonomous & Context-Aware)**                                                                                                                           |
| ------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Configuration & Scaffolding** | Developers manually fill out IDP forms or copy-paste YAML claims                 | **Intent-to-Claim Agent:** Reads IDP schemas via MCP, scaffolds zero-drift Crossplane XRs, OpenBao secret mappings, and app manifests from a prompt                       |
| **Policy & Supply Chain**       | CI fails with cryptic Kyverno/Trivy error logs; devs wait for platform help      | **Remediation Agent:** Intercepts policy or SBOM/Cosign failures, explains the violation, and opens a fix PR with patched base images or compliant specs                  |
| **Deployment Strategy**         | Rollouts rely on static threshold rules (e.g., error rate greater than 2%)       | **Canary Analysis Agent:** Correlates logs, traces, and subtle latency anomalies during an Argo Rollout to explain _why_ a canary is degrading before triggering rollback |
| **Environment Promotion**       | Kargo promotes based on pass/fail checks; humans manually review diffs           | **Release Advisor Agent:** Summarizes commits, scores blast radius from historical stage data, and attaches risk context to Kargo `Freight` promotions                    |
| **Day-2 Operations & Drift**    | Alerts fire to Slack; on-call engineers manually correlate Git commits with pods | **Autonomous SRE Agent:** Correlates degraded workloads directly to the exact Git commit or Kargo promotion, runs read-only diagnostics, and opens a rollback/hotfix PR   |

Without an IDP, AI agents fail in enterprise environments because infrastructure context is scattered across wikis, tribal shell scripts, and undocumented Helm charts. **An IDP gives AI agents the structured map, tools, and guardrails they need to operate safely:**

1. **The IDP Portal & Service Catalog = The Agent's Context Graph**An IDP aggregates ownership, dependencies, OpenAPI/event schemas, and live cluster state into a single graph. Whether a human clicks a button in the portal UI or an AI agent calls the IDP via MCP, both consume the exact same Golden Path templates.
2. **Git + Crossplane + OpenBao = The Safe Mutation Boundary** Agents operate under **inherited RBAC**—they never hold more permissions than the user or service account invoking them. Rather than mutating live clusters, agents commit declarative claims (`XRs`, `ExternalSecrets`, `Rollouts`) to Git.
3. **Kyverno + Cosign + ArgoCD = The Deterministic Safety Net** Even if an LLM hallucinates a misconfigured resource limit, an unverified container image, or an overly permissive network policy, **Policy as Code and Supply Chain gates reject it at PR time and admission time**. The agent is allowed to make mistakes because the platform boundary makes those mistakes harmless.

![[thumbnail-wxops-landscape.png]]

>[!question] Promotion for W'xOps IDP
>With the design above that maching exactly the concept where [W'xOps IDP](https://github.com/wxops-idp/wxops-core) live on, my project try to delivery the concept starting from Git (SCM) with watching anychange from your source code and applying into infrastructure with hardened policy, and promotion across multi-cluster, and environment.

If you are architecting or evolving an IDP to support both human developers and AI agents as first-class consumers, three design principles separate toy demos from production systems:

- **Never give agents raw `kubectl` write access:** Split agent permissions cleanly. Give diagnostic/SRE agents **read-only cluster RBAC** (`get`, `list`, `watch` on pods, events, logs, and observability APIs), and restrict all state mutations to **Git Pull Requests** or scoped IDP workflow triggers.
- **Treat agent configs as GitOps artifacts:** System prompts, tool schemas, model routing, and RBAC bindings for your platform agents should live in Git and be reconciled by ArgoCD/Flux—giving you full auditability (`git log`) and instant rollback if an agent's behavior regresses.
- **Keep orchestration deterministic, keep reasoning agentic:** Let LLMs handle _unstructured synthesis_ (correlating logs with recent commits, drafting Crossplane claims from natural language, summarizing Kargo release diffs), while keeping the actual _execution loop_ strictly deterministic inside Kubernetes controllers.

Explore more about **IDP and AI Agentic Opportunity** topics

- [Akuity - GitOps Best Practices: A Complete Guide for Modern Deployments](https://akuity.io/blog/gitops-best-practices-whitepaper)
- [CNCF - Building a cloud native internal developer platform with Kubernetes, GitOps, and supply chain security](https://www.cncf.io/blog/2026/05/29/building-a-cloud-native-internal-developer-platform-with-kubernetes-gitops-and-supply-chain-security/)
- [PlatformEngineering - GitOps architecture, patterns and anti-patterns](https://platformengineering.org/blog/gitops-architecture-patterns-and-anti-patterns)
- [Medium - Why Argo CD Wasn’t Enough: Real GitOps Pain and the Tools That Fixed It](https://medium.com/@zxc0905fghasd/why-argo-cd-wasnt-enough-real-gitops-pain-and-the-tools-that-fixed-it-53f705b9bcce)
- [CNCF - Kubernetes Fuels AI Growth; Organizational Culture Remains the Decisive Factor](https://www.cncf.io/blog/2026/01/20/kubernetes-fuels-ai-growth-organizational-culture-remains-the-decisive-factor/?utm_content=369595454&utm_medium=social&utm_source=linkedin&hss_channel=lcp-12893459)
- [CNCF - Building a Cluster-Aware AI Agent with Kubernetes, Argo CD, and GitOps](https://www.cncf.io/blog/2026/06/25/building-a-cluster-aware-ai-agent-with-kubernetes-argo-cd-and-gitops/)
- [Medium - Building an Agentic API Ecosystem with GitOps, IDP, and MCP](https://medium.com/@armyost1/building-an-agentic-api-ecosystem-with-gitops-kafka-registry-and-mcp-6ef1735f1eda)
- [Harness - Agentic Coding And The New Role Of Internal Developer Portals](https://www.harness.io/blog/agentic-coding-and-the-new-role-of-internal-developer-portals)
- [Dev.to - Use Crossplane and ArgoCD to deliver Cloud Infrastructure the GitOps Way](https://dev.to/piyushjajoo/use-crossplane-and-argocd-to-deliver-cloud-infrastructure-the-gitops-way-2ijl)

### Move Away

![[meme-short-story.png|center]]

However, GitOps is not a silver bullet, which is why I emphasized earlier that it is an operational discipline rather than a plug-and-play toolset. You cannot adopt it overnight; instead, it requires incremental execution and day-by-day refinement before maturing within an engineering organization. When teams adopt GitOps blindly or over-engineer their workflows, it introduces serious operational friction, as highlighted in the articles below:

- [Medium - Why Some Teams Are Abandoning GitOps (And What They’re Using Instead)](https://medium.com/weeklycloud/why-some-teams-are-abandoning-gitops-and-what-theyre-using-instead-97c4860f1d5d)
- [TheNewStack - The Problems with GitOps — And How to Fix Them](https://thenewstack.io/the-problems-with-gitops-and-how-to-fix-them/)
- [Medium - Git Is Not Your Source of Truth: Rethinking GitOps for Kubernetes Platforms](https://itnext.io/git-is-not-your-source-of-truth-rethinking-gitops-for-kubernetes-platforms-e50666f38e5e)

When GitOps spirals out of control or is applied to the wrong problem space, five common pitfalls emerge:

1. **Too Much Complexity for Small Gains:** Smaller teams with straightforward deployment needs often do not benefit from full GitOps machinery. Managing multi-environment overlays, repository structures, and reconciliation loops can slow down rapid iteration rather than accelerate it.
2. **Debugging Can Be a Pain:** GitOps introduces an asynchronous indirection layer between a commit and live cluster state. When a sync fails, troubleshooting requires digging through controller logs, diffing states, and tracing webhooks across multiple ecosystem tools instead of inspecting a direct deployment output.
3. **Secrets Management Is a Hassle:** Because Git repositories must never store plaintext credentials, adopting GitOps forces you to introduce and maintain an external secrets lifecycle, integrating tools like HashiCorp Vault, OpenBao, SOPS, or Sealed Secrets alongside your reconciliation controllers.
4. **Git Isn’t Always the Complete Source of Truth:** While this might sound contradictory to core GitOps principles, it is an important practical reality. Git works well for static desired-state manifests, but if you fail to properly isolate stateful workloads (such as live database schemas, dynamic autoscaling states, or runtime Kubernetes status), treating Git as the *sole* source of truth breaks down, leaving critical gaps between what Git declares and what actually runs in production.
5. **Confusing GitOps with Kubernetes-Only Tooling:** A common misconception is treating GitOps as strictly synonymous with Kubernetes controllers like Argo CD or Flux. In reality, GitOps is an architectural pattern that applies across infrastructure and traditional CI/CD workflows, forcing Kubernetes-centric GitOps tooling onto non-Kubernetes workloads often creates unnecessary complexity.

>[!quote] My Thoughts on GitOps
>No matter whether you choose GitOps or traditional CI/CD, you need to carefully align the pattern you adopt with your actual expectations—so your architecture reflects real operational demands rather than over-engineering. Today, tools like **[kro (Kube Resource Orchestrator)](https://github.com/kubernetes-sigs/kro)** and **[Crossplane](https://github.com/crossplane/crossplane)** allow you to build higher-level abstraction layers that control both Kubernetes objects and external resources (such as databases, cloud services, or custom infrastructure). Making these external dependencies transparent and declarative through GitOps bridges the biggest gap in infrastructure management. It transforms Kubernetes from being merely an application runtime into a unified control plane—allowing your cluster state to accurately reflect Git as the Single Source of Truth. Everything shared here reflects my personal perspective and hands-on experience; take these insights as a reference to calibrate GitOps principles against your own real-world expectations.

# ArgoCD is a masterpiece

![[icon-argocd.svg|center|300]]

When you ask anything about GitOps and Kubernetes, **Argo CD** is almost always the first tool introduced. Rather than spending time hyping up how popular Argo CD has become across DevOps, Cloud Native, and Kubernetes communities, it is more useful to look at why it continues to evolve into one of the strongest Day-1 foundations for any Kubernetes cluster. While plenty of solid alternatives exist, its adherence to declarative principles, massive community ecosystem, deep tooling integrations, and extensibility make Argo CD a standout choice for automating cluster state from A to Z. So, what actually is Argo CD under the hood?

## ArgoCD and Features

>[!info] What is ArgoCD?
>[Argo CD](https://argo-cd.readthedocs.io/en/stable/) is a declarative, GitOps continuous delivery tool for Kubernetes.

ArgoCD help you to opeate GitOps from Git resource and ship your declare for any **application definition, configuration, and envrionment** automtically and easy to understand.

ArgoCD support various Kubernetes manifests definied, such as

- [Kustomize](https://argo-cd.readthedocs.io/en/stable/user-guide/kustomize/) applications
- [Helm](https://argo-cd.readthedocs.io/en/stable/user-guide/helm/) charts
- [OCI](https://argo-cd.readthedocs.io/en/stable/user-guide/oci/) images
- A directory of YAML, JSON, or [Jsonnet](https://argo-cd.readthedocs.io/en/stable/user-guide/jsonnet/) manifests.
- Any [custom config management tool](https://argo-cd.readthedocs.io/en/stable/operator-manual/config-management-plugins/) configured as a config management plugin

ArgoCD work with Git as source of truth to delivery your desired application states to specfic target environment by many [tracking strategies](https://argo-cd.readthedocs.io/en/stable/user-guide/tracking_strategies/), e.g: [Helm Sematic Version](https://argo-cd.readthedocs.io/en/stable/user-guide/tracking_strategies/#helm), [branches](https://argo-cd.readthedocs.io/en/stable/user-guide/tracking_strategies/#head-branch-tracking), [tags](https://argo-cd.readthedocs.io/en/stable/user-guide/tracking_strategies/#tag-tracking), or [pinniped commit in specific version](https://argo-cd.readthedocs.io/en/stable/user-guide/tracking_strategies/#commit-pinning)

The mechanism of ArgoCD show via activity for continuing monitor running application and compare the current state in Kubernetes cluster with desired target state (as specified in Git Repo), with driff and not mached, that will mark status of application by **OutOfSync**. In the user behavior, ArgoCD allow you can check the status via rich and powerful UI, **Sync** again desired to synchronize your running application drift compare with desired, or you can turn it on for automation for let ArgoCD applying instead of you.

![[thumbnail-argocd-architecture.png]]

For [Architecture](https://argo-cd.readthedocs.io/en/stable/operator-manual/architecture/), ArgoCD is built to several components with different purpose on each, like

- [**Application Controller**](https://argo-cd.readthedocs.io/en/stable/operator-manual/architecture/#application-controller): Continuously monitors running applications and compares the current, live state against the desired target state
- [**Repository Server**](https://argo-cd.readthedocs.io/en/stable/operator-manual/architecture/#repository-server): An internal service which maintains a local cache of the Git repository holding the application manifests.
- [**API Server**](https://argo-cd.readthedocs.io/en/stable/operator-manual/architecture/#api-server): API server is a gRPC/REST server which exposes the API consumed by the Web UI, CLI, and CI/CD systems.

Beside the core, to make more effienciency when operating ArgoCD and reduce the **request to both KubeAPI Server and Git Provider**, ArgoCD also deployed [**Redis Server**](https://argo-cd.readthedocs.io/en/stable/developer-guide/architecture/components/#redis) as component. Depend on your setup and decision for ArgoCD operating, your Architecture will provide more components, that will take repsonsibility for Authentication, Notification, ...

ArgoCD provides several features to let you operate your GitOps Principle like 

- Automated deployment of applications to specified target environments
- Support for multiple config management/templating tools (Kustomize, Helm, Jsonnet, plain-YAML)
- Ability to manage and deploy to multiple clusters
- SSO Integration (OIDC, OAuth2, LDAP, SAML 2.0, GitHub, GitLab, Microsoft, LinkedIn)
- Multi-tenancy and RBAC policies for authorization
- Rollback/Roll-anywhere to any application configuration committed in Git repository
- Health status analysis of application resources
- Automated configuration drift detection and visualization
- Automated or manual syncing of applications to its desired state
- Web UI which provides real-time view of application activity
- CLI for automation and CI integration
- Webhook integration (GitHub, BitBucket, GitLab)
- Access tokens for automation
- PreSync, Sync, PostSync hooks to support complex application rollouts (e.g. blue/green & canary upgrades)
- Audit trails for application events and API calls
- Prometheus metrics
- Parameter overrides for overriding helm parameters in Git

![[thumbnail-argocd-auth-model.png]]

[The Auth Model of ArgoCD](https://argo-cd.readthedocs.io/en/stable/developer-guide/architecture/authz-authn/) is the essential part to help you control your ArgoCD easier than the default concepts. It devide to 4 parts, which control logical elements  via two protocol HTTP and gRPC, and applied AuthZ and AuthN layer reponsible.

- **HTTP**: It is responsible for serving a unified **REST API** to the web UI exposing all gRPC and non-gRPC services.
- **gRPC**: The internal gRPC Server responsible for handling gRPC requests, almost logical of API Server.
- **AuthN**: Is responsible for invoking the authentication logic. It is registered as a gRPC interceptor which will automatically trigger for every gRPC request. **ArgoCD embeds DexiDP** as part of installation, for the purpose of delegating authentication to an external identity provider, such as GitHub, Gitea, ... DexiDP will work like **AuthN Provider**
- **AuthZ**: Is reposible for define and enforce rules of ArgoCD actions with [RBAC rules](https://argo-cd.readthedocs.io/en/stable/operator-manual/rbac/), and ArgoCD use [Casbin](https://casbin.apache.org/) library to enforce it.

ArgoCD API definied in Kubernetes as Custom Resource Definitions (CRDs) under the `argoproj.io` API group, including

- **AppProject**: Groups applications logically and enforces boundaries such as allowed source repositories, destination clusters/namespaces, permitted resource kinds, RBAC roles, and sync windows.
- **Application**: Defines a GitOps application, linking a source repository/revision/path to a target Kubernetes cluster and namespace along with sync and health settings.
- **ApplicationSet**: Automates generating and managing multiple `Application` resources from templates and generators (such as Git directories/files or cluster lists).

>[!info] Explore API Schema
>You can explore about the API Schema for declaring at [docs.crd.dev](https://doc.crds.dev/github.com/argoproj/argo-cd) 

Beside, it also design the [**ArgoCDExtension**](https://argo-cd.readthedocs.io/en/stable/proposals/002-ui-extensions/#argocdextension-crd), which help you register UI extensions for Argo CD, which I will talk more about ArgoCD Extensions part.

To explore more about ArgoCD, I recommend you to spend to read whole of documentations, and features that provided to easier configuration, setup, and install manifest for setup GitOps

**General**

- [ArgoCD - Official Documentation](https://argo-cd.readthedocs.io/en/stable/)
- [ArgoCD - Getting Started](https://argo-cd.readthedocs.io/en/stable/getting_started/)
- [ArgoCD - Architecture](https://argo-cd.readthedocs.io/en/stable/operator-manual/architecture/)
- [ArgoCD - Authentication and Authorization](https://argo-cd.readthedocs.io/en/stable/developer-guide/architecture/authz-authn/)
- [ArgoCD - Component Architecture](https://argo-cd.readthedocs.io/en/stable/developer-guide/architecture/components/)
- [ArgoCD - ArgoCD Core](https://argo-cd.readthedocs.io/en/stable/operator-manual/core/)

**Configuration**

- [ArgoCD - Declarative Setup](https://argo-cd.readthedocs.io/en/stable/operator-manual/declarative-setup/)
- [ArgoCD - Ingress Configuration](https://argo-cd.readthedocs.io/en/stable/operator-manual/ingress/)
- [ArgoCD - High Availability](https://argo-cd.readthedocs.io/en/stable/operator-manual/high_availability/)
- [ArgoCD - User Management](https://argo-cd.readthedocs.io/en/stable/operator-manual/user-management/)
- [ArgoCD - RBAC Configuration](https://argo-cd.readthedocs.io/en/stable/operator-manual/rbac/)
- [ArgoCD - Notification](https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/)
- [ArgoCD - Cluster Management](https://argo-cd.readthedocs.io/en/stable/operator-manual/cluster-management/)

**Usage**

- [ArgoCD - ApplicationSet](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/)
- [ArgoCD - Application](https://argo-cd.readthedocs.io/en/stable/user-guide/application-specification/)
- [ArgoCD - AppProject](https://argo-cd.readthedocs.io/en/stable/user-guide/projects/)
- [ArgoCD - Private Repository](https://argo-cd.readthedocs.io/en/stable/user-guide/private-repositories/)
- [ArgoCD - Sync Phases and Waves](https://argo-cd.readthedocs.io/en/stable/user-guide/sync-waves/)
- [ArgoCD - Sync Applications with Kubectl](https://argo-cd.readthedocs.io/en/stable/user-guide/sync-kubectl/)
- [ArgoCD - Sync Application with UI](https://argo-cd.readthedocs.io/en/stable/getting_started/#syncing-via-ui)
- [ArgoCD - Sync Application with CLI](https://argo-cd.readthedocs.io/en/stable/getting_started/#syncing-via-cli)
- [ArgoCD - Managing ApplicationSets in the Web UI](https://argo-cd.readthedocs.io/en/stable/user-guide/application-set-ui/)
- [ArgoCD - Command Reference](https://argo-cd.readthedocs.io/en/stable/user-guide/commands/argocd/)
## Bootstrap Pattern & Delivery Concepts

![[thumbnail-argocd-boostrap-pattern.png]]

Following [ArgoCD - Cluster Bootstrapping](https://argo-cd.readthedocs.io/en/stable/operator-manual/cluster-bootstrapping/), to start setup GitOps strategies with ArgoCD beside configuration, you need to choose bootstrap pattern to decide how ArgoCD operate and worked to delivery your application to specific Cluster, you can choose on three options below

- [**App of Apps Pattern**](https://argo-cd.readthedocs.io/en/stable/operator-manual/cluster-bootstrapping/#app-of-apps-pattern-alternative): This pattern lets you define a **Root** `Application` that does not contain any workload definitions (like `Deployment` or `Service`). Instead, its sole purpose is to group and manage multiple child `Application` manifests, allowing you to organize tightly coupled or nested applications in a hierarchical structure.
- [**ApplicationSet Pattern**](https://argo-cd.readthedocs.io/en/stable/operator-manual/cluster-bootstrapping/#application-sets-and-cluster-labels-recommended): This is the **recommended** approach by Argo CD. It introduces an `ApplicationSet` controller that uses **Generators** (such as Git directories, cluster labels, or lists) and Go templates to dynamically generate and manage multiple `Application` resources from a single manifest, removing the need for external templating tools like Helm.
- **Hybrid App of Apps and ApplicationSet**: This approach combines both patterns for large-scale multi-cluster environments. A **Root App of Apps** manages core platform bootstrapping and deploys multiple `ApplicationSet` manifests, while each `ApplicationSet` dynamically fans out workload or add-on `Applications` across target clusters and environments.

| **Pattern**        | **Best for**                                                                                           | **Strengths**                                                                                                                                                                                                                                                                                                                                                                                  | **Limitations**                                                                                                                                                                                                                                                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **App of Apps**    | Small to medium clusters; explicit control over every application                                      | **1.** Native `sync-wave` dependency ordering for heterogeneous stacks.<br><br>  <br><br>**2.** Full per-app customization (bespoke Helm values, `ignoreDifferences`, sync options).<br><br>  <br><br>**3.** Explicit, transparent 1-to-1 mapping between Git files and live `Applications`.                                                                                                   | **1.** High YAML boilerplate and copy-paste drift as clusters or services grow.<br><br>  <br><br>**2.** Manual Git commits required to onboard every new cluster or environment.<br><br>  <br><br>**3.** Risk of accidental fleet-wide deletion if cascade finalizers are set on the root app.                                                  |
| **ApplicationSet** | Large fleets; dynamic generation from Git structure, cluster lists, or SCM providers                   | **1.** Zero-touch onboarding via generators (`Clusters`, `Git`, `Matrix`, `PullRequest`).<br><br>  <br><br>**2.** Eliminates repetitive manifests with a single parameterized template.<br><br>  <br><br>**3.** Supports `RollingSync` progressive updates across staged cluster labels.                                                                                                       | **1.** Rigid templating makes per-app exceptions and custom overrides messy.<br><br>  <br><br>**2.** Poor fit for ordered foundation bootstrapping where CRDs and operators depend on each other.<br><br>  <br><br>**3.** High blast radius—a single template or generator bug affects all generated `Applications` simultaneously.             |
| **Hybrid**         | Inherit the ability of both pattern for purpose operating multiple child `Application` in large fleets | **1.** Combines strict `sync-wave` ordering for Hub foundation components with automated `ApplicationSet` fan-out for spoke clusters and tenant workloads.<br><br>  <br><br>**2.** Clean RBAC (`AppProject`) isolation between control-plane infrastructure and application teams.<br><br>  <br><br>**3.** Scales from a single cluster to 100+ clusters without restructuring the repository. | **1.** Higher upfront architectural and directory design complexity.<br><br>  <br><br>**2.** Longer debugging path when tracing ownership (Root App to Launcher App to `ApplicationSet` to Generated App).<br><br>  <br><br>**3.** Requires strict governance over cluster secret labels and generator selectors to prevent unintended fan-out. |

Not only cluster bootstrap, nowadays, ArgoCD offer you several extensions to integrate into ArgoCD, that let you enhance your ArgoCD deployment strategy with new concept

- **Multi-Environment & Config Promotion Concept**: You can integrate ArgoCD with [Kargo](https://kargo.io/) or [Argo GitOps Promoter](https://gitops-promoter.readthedocs.io/en/latest/) to let you define concept how an immutable release artifact advances from `Dev` -> `Staging` -> `Prod` without configuration drift. This pattern will avoid **branch-per-environment** (which causes endless merge conflicts). Instead, use **directory/overlay-per-environment** on a single `main` branch (`envs/dev`, `envs/staging`, `envs/prod`), driven by an `ApplicationSet` Git generator or **Kargo**.
- **Progressive Delivery Concept**: Bootstraping [Argo Rollouts](https://argo-rollouts.readthedocs.io/en/stable/) alongside a Gateway API controller or Service Mesh (Cilium, Istio, Traefik) allows `Rollout` resources to split live traffic between Stable and Canary ReplicaSets while continuously evaluating`AnalysisTemplates` against observability metrics. Beside, ArgoCD introduce Beta mechanism for `Rollout` for ApplicationSet at [ArgoCD - ApplicationSet Progressive Rollout Strategy](https://argo-cd.readthedocs.io/en/stable/proposals/2022-07-13-appset-progressive-rollout-strategy/) and [ArgoCD - Progressive Sync (Beta Feature Since v3.3.0)](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Progressive-Syncs/)

Here is the matrix to show purpose of each concepts and patterns, from that describe what target you will get for bootstraping ArgoCD cluster

| **Dimension**               | **App of Apps (Pattern)**                                                                             | **ApplicationSet (Pattern)**                                                                                                     | **Multi-Env & Config Promotion (Concept)**                                                                                     | **Progressive Delivery (Concept)**                                                                         |
| --------------------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| **Architectural Layer**     | Bootstrap & Dependency Orchestration                                                                  | Dynamic Fleet & Tenant Generation                                                                                                | Cross-Stage Release Lifecycle                                                                                                  | In-Cluster Runtime Traffic & Risk Control                                                                  |
| **Core Mechanism**          | A parent `Application` points to a Git directory/Helm chart containing child `Application` YAML files | An `ApplicationSet` controller uses **Generators** (`git`, `clusters`, `matrix`) to stamp out `Application` CRDs from a template | Overlay/directory separation (`base` + env values) paired with PR workflows or **Kargo** (`Warehouse` -> `Freight` -> `Stage`) | **Argo Rollouts** controller replaces `Deployment` with `Rollout` + `AnalysisTemplate` + L7 traffic router |
| **Topology Shape**          | Heterogeneous **tree** (each child app can have a completely different chart, repo, and sync wave)    | Homogeneous **fan-out** (1 template generates $N$ identical apps across clusters, directories, or PRs)                           | Linear or DAG **stage pipeline** across environments                                                                           | Incremental **traffic ramp** (`5% -> 25% -> 100%`) inside a single environment                             |
| **Ordering & Dependencies** | Native via `argocd.argoproj.io/sync-wave` annotations on child `Application` manifests                | Flat by default (all generated `Applications` reconcile concurrently unless `syncPolicy` progressive syncs are configured)       | Gate-driven (environment $N$ must pass verification/health checks before environment $N+1$ updates)                            | Metric-driven (`AnalysisRun` queries Prometheus/LGTM before advancing to the next rollout step)            |
| **Blast Radius**            | Deleting the parent with a cascade finalizer can delete every child app in the cluster                | Editing the `ApplicationSet` template simultaneously updates all $N$ generated `Applications`                                    | Scoped to one stage at a time (e.g., bad config stops in `Staging` before reaching `Prod`)                                     | Scoped to a small percentage of live requests (e.g., 5% canary traffic) with instant auto-rollback         |

>[!note] Learning
>When designing a complete GitOps platform from zero, the four pieces assemble into a clear four-stage pipeline:
>1. **Seed Bootstrap (`App of Apps`):** A single root `Application` reconciles core cluster add-ons in ordered Sync Waves—installing **Cilium/Gateway API**, **Kyverno**, **OpenBao + ESO**, **Argo Rollouts**, and **Kargo**.
>2. **Fleet & Workload Generation (`ApplicationSet`):** Once the foundation wave is healthy, an `ApplicationSet` (`Matrix` of `Clusters` x `Environments`) automatically generates the `Applications` for every microservice across `dev`, `staging`, and `prod`.
>3. **Cross-Stage Movement (`Multi-Env Promotion`):** When CI pushes a signed image, **Kargo** bundles it into `Freight`, promotes it to `staging`, runs smoke tests, and opens a promotion PR (or auto-syncs) to update the `prod` overlay in Git.
>4. **Safe Traffic Cutover (`Progressive Delivery`):** ArgoCD syncs the updated `prod` overlay, triggering **Argo Rollouts** to shift production traffic `5% -> 25% -> 50% -> 100%` via Gateway API while verifying error rates and latency before finalizing the release.
### App of Apps Pattern

You can try to use **App of Apps Pattern** following repository structure below 

```bash
gitops-repo/
├── app_of_apps.yaml                 # Root Application (points to apps/)
├── projects/                        # AppProjects defining RBAC & destination rules
│   ├── app-project.yaml
│   ├── infra-project.yaml
│   └── bootstrap-project.yaml
├── apps/                            # Tier 1: Sub-parent Applications watched by root
│   ├── app-parent.yaml              # Project: app       -> points to apps-app/
│   ├── infra-parent.yaml            # Project: infra     -> points to apps-infra/
│   └── bootstrap-parent.yaml        # Project: bootstrap -> points to apps-bootstrap/
├── apps-app/                        # Tier 2: Child Applications for business workloads
│   └── payment-service.yaml         # Project: app
├── apps-infra/                      # Tier 2: Child Applications for cluster add-ons
│   └── ingress-nginx.yaml           # Project: infra
├── apps-bootstrap/                  # Tier 2: Child Applications for core GitOps/secrets
│   ├── projects.yaml                # Deploys projects/
│   └── sealed-secrets.yaml          # Project: bootstrap
└── manifests/                       # Tier 3: Actual Helm values / Kustomize / K8s YAMLs
    ├── payment-service/
    ├── ingress-nginx/
    └── sealed-secrets/
```

To bootstrap pattern, you only need to manually apply `app_of_apps.yaml` once to bootstrap the root `Application`. From there, it continuously watches the `apps/` directory and automatically spawns child `Application` resources mapped to their corresponding `AppProject` boundaries. You can skip creating custom `AppProject` resources if you do not need strict isolation or resource restrictions, since Argo CD automatically provisions a [`default`](https://argo-cd.readthedocs.io/en/stable/user-guide/projects/#the-default-project) project upon installation. In production environments, however, defining dedicated `AppProject` resources is strongly recommended so you can enforce granular access control tied to your team's SSO groups.

```yaml title="app_of_apps.yaml"
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: app-of-apps
  namespace: argocd
  # Omit resources-finalizer.argocd.argoproj.io on root-app in prod
  # to prevent accidental deletion of all child apps if root-app is removed.
spec:
  project: default
  source:
    repoURL: https://github.com/your-org/gitops-platform.git
    targetRevision: main
    path: apps
    # Recursive: https://argo-cd.readthedocs.io/en/stable/user-guide/directory/
    directory:
      recurse: true
  destination:
    server: https://kubernetes.default.svc
    namespace: argocd
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
```

```yaml title="app-project.yaml"
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: apps
  namespace: argocd
spec:
  description: "Application layer - manages workload Deployments and StatefulSets via GitOps IDP"
  sourceRepos:
    - https://github.com/your-org/gitops-platform.git
  sourceNamespaces:
    - argocd
  destinations:
    # Block privileged/system namespaces from app workloads
    - namespace: '!kube-system'
      server: '*'
    - namespace: '!argocd'
      server: '*'
    # Allow all other namespaces on the local cluster
    - server: https://kubernetes.default.svc
      namespace: '*'
  # Only allow namespace-scoped workload resources
  namespaceResourceWhitelist:
    - group: 'apps'
      kind: Deployment
    - group: 'apps'
      kind: StatefulSet
    - group: 'apps'
      kind: DaemonSet
    - group: ''
      kind: Service
    - group: ''
      kind: ConfigMap
    - group: ''
      kind: Secret
    - group: ''
      kind: ServiceAccount
    - group: ''
      kind: PersistentVolumeClaim
    - group: 'networking.k8s.io'
      kind: Ingress
    - group: 'networking.k8s.io'
      kind: NetworkPolicy
    - group: 'autoscaling'
      kind: HorizontalPodAutoscaler
    - group: 'policy'
      kind: PodDisruptionBudget
    - group: 'batch'
      kind: Job
    - group: 'batch'
      kind: CronJob
    - group: ''
      kind: Pod
    - group: 'apps'
      kind: ReplicaSet
  # Explicitly block all cluster-wide resources at the app layer
  clusterResourceBlacklist:
    - group: '*'
      kind: '*'
  # Define role for Projecct, that will reflect via SSO
  # ref: https://argo-cd.readthedocs.io/en/stable/user-guide/projects/#project-roles
  # ref: https://argo-cd.readthedocs.io/en/stable/operator-manual/rbac/#rbac-model-structure
  # ref: https://argo-cd.readthedocs.io/en/stable/operator-manual/rbac/#using-sso-usersgroups
  roles:
    - name: developer
      description: "Application developer - can deploy and sync workloads"
      policies:
        - p, proj:apps:developer, applications, get, apps/*, allow
        - p, proj:apps:developer, applications, create, apps/*, allow
        - p, proj:apps:developer, applications, update, apps/*, allow
        - p, proj:apps:developer, applications, sync, apps/*, allow
        - p, proj:apps:developer, applications, override, apps/*, allow
      groups:
        - apps:developer
    - name: viewer
      description: "Read-only access to the apps project"
      policies:
        - p, proj:apps:viewer, applications, get, apps/*, allow
      groups:
        - apps:viewer
  orphanedResources:
    warn: true
```

Next, you will define **Parent** `Application` which define the actual child `Appication` following specific groups, e.g: `app`, `infra`, or `bootstrap`. You can skip this if you don't want to, and starting define **Child** `Application` to help you define application Kubernetes manifest by serveral format, e.g:  [Kustomization](https://argo-cd.readthedocs.io/en/stable/user-guide/kustomize/), [Helm](https://argo-cd.readthedocs.io/en/stable/user-guide/helm/), YAML, [Jsonet](https://argo-cd.readthedocs.io/en/stable/user-guide/jsonnet/), ...

```yaml title="app-parent.yaml"
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: app-parent
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: default # Need to be project have permission to create Application
  source:
    repoURL: https://github.com/your-org/gitops-platform.git
    targetRevision: HEAD
    path: apps-app
  destination:
    server: https://kubernetes.default.svc
    namespace: argocd
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

```yaml title="child-app-yaml.yaml"
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: payment-service
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: app # Enforces app-project permissions
  source:
    repoURL: https://github.com/your-org/gitops-platform.git
    targetRevision: HEAD
    path: manifests/payment-service
  destination:
    server: https://kubernetes.default.svc
    namespace: app-payments
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
```

>[!hint] Use Sync Wave
>Use `argocd.argoproj.io/sync-wave` annotations to control the deployment order within a sync. Lower wave number = applied first. This is critical for infrastructure that has CRD-to-resource dependencies. Explore detail at [How sync waves work](https://argo-cd.readthedocs.io/en/stable/user-guide/sync-waves/#how-sync-waves-work)
### Application Set Pattern

In alternative, you want to setup **ApplicationSet Pattern**, you can consider to use repository structure below

```bash
gitops-repo/
├── applicationsets/               # Managed by Platform/DevOps team
│   ├── tenants-appset.yaml
└── tenants-apps/                  # Managed by Product/App teams
    ├── payment-service/
    │   ├── base/                  # Shared Kustomize base or Helm chart
    │   └── overlays/
    │       ├── dev/
    │       ├── staging/
    │       └── prod/
    └── order-service/
        ├── base/
        └── overlays/
            ├── dev/
            └── prod/
```

With **ApplicationSet**, you just being apply one time for each appset, it will automatically generate `Application` resource using generator strategies. This removes the need to manually write one YAML file per application.

```yaml title="tenants-appset.yaml"
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: tenants-apps
  namespace: argocd
  annotations:
    argocd.argoproj.io/sync-wave: "5"
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  goTemplate: true
  goTemplateOptions: ["missingkey=error"]
  generators:
    - git:
        repoURL: https://github.com/your-org/gitops-platform.git
        revision: main
        directories:
          - path: tenants-apps/*/*/overlays/dev
  template:
    metadata:
      name: "{{ index .path.segments 1 }}-{{ index .path.segments 2 }}-{{ .path.basename }}"
      namespace: argocd
      finalizers:
        - resources-finalizer.argocd.argoproj.io
    spec:
      project: "tenant-{{ index .path.segments 1 }}"
      source:
        repoURL: https://github.com/your-org/gitops-platform.git
        targetRevision: main
        path: "{{ .path.path }}"
      destination:
        server: https://kubernetes.default.svc
        namespace: "tenant-{{ index .path.segments 1 }}"
      revisionHistoryLimit: 3
      syncPolicy:
        automated:
          prune: true
          selfHeal: true
        syncOptions:
          - CreateNamespace=false
---
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: tenants-apps-stable
  namespace: argocd
  annotations:
    argocd.argoproj.io/sync-wave: "5"
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  goTemplate: true
  goTemplateOptions: ["missingkey=error"]
  generators:
    - git:
        repoURL: https://github.com/your-org/gitops-platform.git
        revision: main
        directories:
          - path: tenants-apps/*/*/overlays/staging
          - path: tenants-apps/*/*/overlays/production
  template:
    metadata:
      name: "{{ index .path.segments 1 }}-{{ index .path.segments 2 }}-{{ .path.basename }}"
      namespace: argocd
      finalizers:
        - resources-finalizer.argocd.argoproj.io
    spec:
      project: "tenant-{{ index .path.segments 1 }}"
      source:
        repoURL: https://github.com/your-org/gitops-platform.git
        targetRevision: main
        path: "{{ .path.path }}"
      destination:
        server: https://kubernetes.default.svc
        namespace: "tenant-{{ index .path.segments 1 }}"
      revisionHistoryLimit: 3
      syncPolicy:
        syncOptions:
          - CreateNamespace=false
```

With `tenants-appset.yaml` above, it will create two `ApplicationSet` for once automatical sync when application on `dev` environment, and other for manual sync when application on `staging` and `prod` required more strictly when application rollout for more careful.

In recent version of ArgoCD, `ApplicationSet` support **[more than 10 generator](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators/)**, and you can pick any option to operate your strategy, e.g: example above use [Git generator](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators-Git/).

### Hybrid Pattern

>[!hint] My Thoughts on Production Best Practices
>Do not choose one pattern over the other - **nest them**. Use a root **App of Apps** to bootstrap foundational cluster add-ons in strict **Sync Waves**, and configure its final wave to deploy **ApplicationSets** that dynamically generate tenant workloads and multi-cluster fleet configurations.

The **Hybrid Pattern** combines **App of Apps** and **ApplicationSet** by dividing cluster lifecycle responsibilities along a clear architectural boundary:

- **App of Apps:** Bootstraps the **Hub (Management) Cluster** in deterministic Sync Waves, where each component is unique and initialization order matters (CRDs → Secrets & Policy → Identity & Crossplane → ApplicationSet definitions).
- **ApplicationSets:** Launched by the final wave of the App of Apps to dynamically stamp out `Application` resources across **Spoke Clusters** (fleet-wide add-ons) and **Tenant Workloads** (microservices deployed across environments).

This gives you deterministic startup ordering on the hub without duplicating YAML manifests every time you onboard a new cluster or microservice. You can explore the **Hybrid Pattern** repository layouts below, starting with a concise overview and followed by a production-grade directory structure:

```bash title="shorten-version"
gitops-repo/
├── bootstrap/
│   └── root-app.yaml              # 1. Seed entry point (applied once)
│
├── hub-apps/                      # 2. APP OF APPS (Ordered Hub foundation)
│   ├── 01-infra/                  #    sync-wave: "-1" (CRDs, Secrets, Policy)
│   ├── 02-platform/               #    sync-wave: "0"  (Crossplane, Kargo, LGTM)
│   └── 03-appset-launcher.yaml    #    sync-wave: "1"  (Hands off to ApplicationSets)
│
├── appsets/                       # 3. APPLICATIONSETS (Automated fleet fan-out)
│   ├── spoke-addons.yaml          #    Clusters generator -> Add-ons on all spokes
│   └── tenant-workloads.yaml      #    Matrix generator   -> Apps across Dev/Stage/Prod
│
└── configs/                       # 4. VALUES & MANIFESTS (Actual payloads)
    ├── hub/                       #    Hub Helm values & policies
    ├── spokes/                    #    Spoke add-on values
    └── apps/                      #    App base + env overlays (dev / stage / prod)
```

```bash title="detail-version"
gitops-control-plane/
├── bootstrap/
│   ├── root-app.yaml                      # 1. Single entry point applied once on Hub
│   └── projects/
│       ├── hub-core.yaml                  # AppProject for Hub control-plane components
│       ├── spoke-addons.yaml              # AppProject for fleet-wide spoke infrastructure
│       └── tenant-workloads.yaml          # Restricted AppProject for application namespaces
│
├── hub-apps/                              # 2. APP OF APPS LAYER (Hub-only, Sync-Wave ordered)
│   ├── wave-0-crds-networking/
│   │   ├── gateway-api-crds.yaml          # sync-wave: "-3"
│   │   └── traefik.yaml                   # sync-wave: "-2"
│   ├── wave-1-security-identity/
│   │   ├── external-secrets.yaml          # sync-wave: "-1"
│   │   ├── openbao.yaml                   # sync-wave: "-1"
│   │   ├── dex-pinniped.yaml              # sync-wave: "-1"
│   │   └── kyverno.yaml                   # sync-wave: "-1"
│   ├── wave-2-platform-engines/
│   │   ├── crossplane.yaml                # sync-wave: "0"
│   │   ├── kargo.yaml                     # sync-wave: "0"
│   │   └── observability-lgtm.yaml        # sync-wave: "0"
│   └── wave-3-appset-launchers/           # Handoff point from App of Apps -> ApplicationSets
│       ├── launch-fleet-appsets.yaml      # sync-wave: "1" (points to fleet-appsets/)
│       └── launch-workload-appsets.yaml   # sync-wave: "1" (points to workload-appsets/)
│
├── fleet-appsets/                         # 3. APPLICATIONSET LAYER A (Spoke Cluster Add-ons)
│   ├── spoke-baseline-addons.yaml         # Clusters generator -> Kyverno, ESO, Alloy agent on all spokes
│   └── spoke-gpu-stack.yaml               # Label-filtered Clusters generator (gpu=true) -> GPU operator
│
├── workload-appsets/                      # 4. APPLICATIONSET LAYER B (Multi-Env Tenant Apps)
│   └── tenant-services-matrix.yaml        # Matrix generator (Clusters x Git dirs) -> Dev/Staging/Prod apps
│
└── configs/                               # 5. Shared Helm values, Policies, & Tenant Overlays
    ├── hub/                               # Hub-specific Helm values & Crossplane XRs
    ├── fleet/                             # Spoke add-on values (e.g., spoke/kyverno-values.yaml)
    └── workloads/                         # App manifests consumed by Matrix/Git generators
        ├── billing-service/
        │   ├── base/
        │   └── overlays/
        │       ├── dev/
        │       ├── staging/
        │       └── prod/
        └── auth-service/
            ├── base/
            └── overlays/
                ├── dev/
                ├── staging/
                └── prod/
```

You begin in `bootstrap/` by applying `root-app.yaml` once to initialize the entire GitOps hierarchy. From there, the root application triggers the **App of Apps** layer to provision core Hub infrastructure sequentially via `sync-wave`, and finally hands off to the **ApplicationSet** layer to dynamically stamp out spoke add-ons and tenant workloads from `configs/`.

This provides a solid, production-ready foundation to explore and adapt to your own platform architecture. You can dive deeper into these patterns at:

- [ArgoCD - Cluster Bootstrapping](https://argo-cd.readthedocs.io/en/stable/operator-manual/cluster-bootstrapping/)
- [ArgoCD - Use cases supported by the ApplicationSet controller](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Use-Cases/)
- [Medium - Self Managed Argo CD — App Of Everything](https://medium.com/devopsturkiye/self-managed-argo-cd-app-of-everything-a226eb100cf0)
- [Octopus - Structuring Argo CD repositories](https://octopus.com/blog/how-to-structure-your-argo-cd-repositories-using-application-sets)
- [CNCF - Managing Kubernetes Workloads Using the App of Apps Pattern in ArgoCD](https://www.cncf.io/blog/2025/10/07/managing-kubernetes-workloads-using-the-app-of-apps-pattern-in-argocd-2/)
- [Blog - Managing Kubernetes Workloads using App of Apps Pattern in ArgoCD](https://marcinkujawski.pl/deploying-kubernetes-workloads-using-app-of-apps-pattern-in-argocd/)
- [Youtube - From chaos to control: Structuring repositories for scalable GitOps on Kubernetes](https://www.youtube.com/watch?v=VOCo3qNPGDE&t=578s)
- [Medium - GitOps at Scale: Mastering Multi-Cluster Management and Advanced Patterns](https://blog.devops.dev/gitops-at-scale-mastering-multi-cluster-management-and-advanced-patterns-ac335f11be46)
- [Youtube - Multi-cluster, multi-apps, multi-value deployments using Argo CD Application Sets - Kostis Kapelonis](https://www.youtube.com/watch?v=7hJvZaqiG5s)
- [Youtube - Mastering ApplicationSet: Advanced Argo CD Automation - Alexander Matyushentsev, Akuity](https://www.youtube.com/watch?v=9RvDczVIiS0)
- [Youtube - Sponsored Workshop: Scaling Multi-cluster Management with Argo CD and Application Sets](https://www.youtube.com/watch?v=Ns4MjCDKx7E)
- [DigitalOcean - Manage Multi-Cluster Deployments with ArgoCD](https://www.digitalocean.com/community/tutorials/application-deployments-multi-cluster-kubernetes)
## Multi-Cluster and Scalable

![[thumbnail-argocd-hub-and-spoke-arch.png]]

Beyond bootstrap patterns and repository layouts, choosing the right **Argo CD deployment architecture** is critical to scaling your GitOps control plane and distributing workloads reliably across a multi-cluster fleet.

As explored in [Akuity - Which Argo CD Architecture is Best? Comparing Single, Per Cluster, and Hybrid Models](https://akuity.io/blog/argo-cd-architectures-explained) and illustrated in [GitHub - ArgoCD Multi-Cluster Architectures Illustration](https://github.com/mehmetmgrsl/argo-cd-multi-cluster-architectures), there are five primary architectural topologies to choose from depending on your security boundaries, blast-radius tolerance, and fleet scale:

- **Single Instance (Hub & Spoke):** A single centralized Argo CD instance runs on a dedicated Hub (Management) cluster and pushes manifests to multiple Spoke clusters over the network using registered cluster credentials (such as [ServiceAccount Bearer Tokens](https://argo-cd.readthedocs.io/en/stable/operator-manual/security/#external-cluster-credentials), [OIDC](https://github.com/argoproj/argo-cd/discussions/26776#discussioncomment-16228312), or [cloud IAM](https://medium.com/@dedicatted/secure-argocd-multi-cluster-deployment-in-aws-eks-with-irsa-0a6332a881bd) roles). This provides a unified pane of glass, though it requires exposing each Spoke's Kubernetes API server (`:6443`) to the Hub and introduces a single point of failure.
- **Per Cluster (Decentralized):** Every Kubernetes cluster runs its own independent, self-contained Argo CD instance. This maximizes isolation and eliminates cross-cluster network dependencies or central blast radius, at the cost of higher operational overhead and fragmented UI visibility across clusters.
- **Per Organization / Team (Multi-Instance Sharding):** Multiple Argo CD instances are deployed, either on a shared management cluster or dedicated regional hubs, where each instance manages a specific subset of clusters aligned to a business unit, region, or tenant organization. This balances centralized management with strict RBAC and blast-radius isolation.
- **Hierarchical (Argo CD Managing Argo CDs):** A central parent Argo CD instance bootstraps and manages the lifecycle, configurations, and upgrades of child Argo CD instances running inside remote clusters, combining centralized governance with local cluster execution.
- **Agent Mode (Outbound Pull / `argocd-agent`):** A modern distributed model where lightweight agents run inside each remote Spoke cluster and establish **outbound** gRPC/mTLS connections back to a central Hub control plane to *pull* desired state—eliminating the need to expose Spoke Kubernetes API servers (`:6443`) or store privileged cluster-admin credentials on the Hub.

| **Architecture Topology**                                                                      | Operational Scale                                      | **Network & Auth Model**                                                              | **Advantages**                                                                                                                                                                                                                                                                                                                        | **Trade-Offs & Limitations**                                                                                                                                                                                                                                                                                                                       | **Best-Fit Scenario**                                                                                                            |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Single Instance (Hub & Spoke)**                                                              | 2 – 50 clusters (~1,500 apps without tuning)           | **Inbound Push** (`Hub -> Spoke :6443`) using Bearer tokens, OIDC, or cloud IAM roles | **1.** Single unified UI, RBAC, and SSO configuration across the entire fleet.<br><br>**2.** Lowest resource footprint on Spoke clusters (zero Argo CD pods required on spokes).<br><br>**3.** Simplest initial setup for `ApplicationSets` (`Clusters` / `Matrix` generators).                                                       | **1.** Requires exposing every Spoke's Kube API (`:6443`) to the Hub network.<br><br>**2.** Hub stores privileged credentials for all Spokes (high-value target if compromised).<br><br>**3.** Single point of failure and controller bottleneck (repo-server / application-controller CPU/RAM) at large scale.                                    | Small-to-medium fleets (less than 20 clusters) inside a trusted private VPC/VPN with centralized platform ownership.             |
| **Per Cluster (Decentralized)**                                                                | Unlimited clusters (each cluster scales independently) | **Local Loop** (In-cluster `kubernetes.default.svc`; outbound to Git/OCI only)        | **1.** Maximum blast-radius containment, one cluster's failure or compromise cannot affect others.<br><br>**2.** Zero cross-cluster network exposure (`:6443` stays completely private).<br><br>**3.** Linear scaling—each cluster runs its own controller resources independently.                                                   | **1.** Fragmented visibility (no native single-pane-of-glass UI across clusters).<br><br>**2.** Duplicated operational overhead (upgrading Argo CD, SSO, and RBAC across $N$ clusters).<br>  <br>**3.** Harder to coordinate cross-cluster dependencies or progressive fleet rollouts.                                                             | Regulated/air-gapped workloads, strict compliance boundaries, or autonomous teams managing 1–2 dedicated clusters each.          |
| **Per Organization / Team (Multi-Instance Sharding, Hybrid)**                                  | 10 – 500+ clusters (segmented by region/team)          | **Sharded Inbound Push** (`Team Hub -> Team Spokes :6443`)                            | **1.** Prevents noisy-neighbor contention—one team's heavy Helm templating won't stall another's syncs.<br><br>**2.** Clean tenant/BU isolation for RBAC, secrets, and Git credentials.<br><br>**3.** Limits blast radius to a single business unit or region.                                                                        | **1.** Higher control-plane resource and maintenance cost than a single Hub.<br><br>**2.** Still requires network reachability from each regional/team Hub to its Spoke API servers.<br><br>**3.** Cross-organization visibility requires external aggregation or custom portals.                                                                  | Multi-tenant enterprises, multi-region setups, or organizations with distinct business units needing independent SLAs.           |
| **Hierarchical (Argo CD Managing Argo CDs (Controller Sharding))**                             | 50 – 200+ clusters (thousands of apps)                 | **Two-Tier Push** (`Parent Hub -> Child Argo CD` on Spoke `-> Local Spoke`)           | **1.** Centralizes lifecycle management, upgrades, and baseline policies for all child Argo CD instances.<br><br>**2.** Local execution on each Spoke, if the Parent Hub goes down, Spokes keep reconciling from Git.<br><br>**3.** Eliminates storing Spoke `cluster-admin` workload tokens on the Parent Hub once bootstrapped.     | **1.** Highest architectural and debugging complexity (two layers of `Applications`, sync waves, and drift).<br><br>**2.** Initial bootstrap still requires Parent Hub access to Spoke `:6443` to install the child Argo CD.<br>  <br>**3.** Operational UI remains split between Parent (fleet control) and Child instances (workload details).   | Large fleets where local autonomy and offline resilience are required alongside standardized platform governance.                |
| **Agent Mode (Outbound Pull / [`argocd-agent`](https://argocd-agent.readthedocs.io/stable/))** | 100 – 1,000+ clusters                                  | **Outbound Pull** (`Spoke Agent -> Hub` over gRPC/mTLS; `:6443` stays closed)         | **1.** Zero inbound firewall rules needed on Spokes—works seamlessly behind NAT, firewalls, and edge networks.<br><br>**2.** Hub holds **zero** Spoke cluster credentials (drastically shrinks security blast radius).<br><br>**3.** Combines a unified Hub UI/control plane with lightweight, distributed local execution on Spokes. | **1.** Newer architectural model with stricter mTLS certificate and reverse-proxy/gateway lifecycle requirements.<br><br>**2.** Spoke clusters still run a lightweight agent footprint and local state cache.<br><br>**3.** Requires careful mode selection (`managed` vs. `autonomous`) depending on whether Git state lives on the Hub or Spoke. | Zero-trust multi-cloud, hybrid on-prem/cloud, and edge/IoT fleets where Spoke Kube APIs (`:6443`) must remain completely hidden. |

There are some key drivers that dictate your choice

- **Network & Security Topology**: Standard Hub-and-Spoke breaks down in regulated or edge environments where target clusters sit behind firewalls and forbid inbound traffic from a central hub. In these scenarios, **Standalone** or **Agent-based (pull)** models are required regardless of cluster count.
- **Resource & Object Churn:** Scalability is rarely limited by cluster count alone; it is driven by the total number of Kubernetes resources watched and how frequently they change. High-churn clusters require **Application Controller Sharding** (distributing clusters across multiple controller replicas) or splitting into **Hybrid instances**.
- **Blast Radius & Isolation**: Putting every cluster on one hub centralizes risk, a misconfiguration, secret leak, or hub outage impacts the entire fleet. Separating clusters by Argo CD Projects helps logically, while **hybrid** or **per-cluster patterns** enforce hard infrastructure isolation.
- **Developer Experience**: If developers need a single dashboard to inspect logs, diffs, and sync statuses across environments, **hub-and-spoke** vs. **pull-mode** keeps visibility centralized, whereas standalone instances force teams to switch contexts per cluster.

If you want to explore more about this topics, you can double-check these links below

- [Akuity - Which Argo CD Architecture is Best? Comparing Single, Per Cluster, and Hybrid Models](https://akuity.io/blog/argo-cd-architectures-explained)
- [GitHub - ArgoCD Multi-Cluster Architectures Illustration](https://github.com/mehmetmgrsl/argo-cd-multi-cluster-architectures)
- [AWS - Multi-cluster management for Kubernetes with Cluster API and Argo CD](https://aws.amazon.com/blogs/containers/multi-cluster-management-for-kubernetes-with-cluster-api-and-argo-cd/)
- [Blog - Create and Manage Kubernetes Clusters with Cluster API and ArgoCD](https://piotrminkowski.com/2021/12/03/create-kubernetes-clusters-with-cluster-api-and-argocd/)
- [GitHub - argocd-agent](https://argocd-agent.readthedocs.io/stable/): Multi-cluster agent for Argo CD
- [Tremolo - Securing Multi-Cluster ArgoCD](https://www.tremolo.io/post/securing-multi-cluster-argocd)
- [Youtube - Scaling Argo CD: From Symptoms To Solution - Alexandre Gaudreault, Intuit](https://www.youtube.com/watch?v=LlAt8yx7goA)
- [Youtube - Redefining the Multi-Cluster Story of Argo CD - Harriet Lawrence, Red Hat](https://www.youtube.com/watch?v=AE063zEKTHg)
- [Youtube - ArgoCon '21 - Argo CD Production Best Practices (Alexander Matyushentsev)](https://www.youtube.com/watch?v=ESQLqjbM8h0&t=679s)
- [Youtube - Control Plane, Service, or Both? – Argo CD Multi-Cluster Architectures - Nicholas Morey, Akuity](https://www.youtube.com/watch?v=vyaZv4yM3_o)
- [Medium - Secure ArgoCD Multi-Cluster Deployment in AWS EKS with IRSA](https://medium.com/@dedicatted/secure-argocd-multi-cluster-deployment-in-aws-eks-with-irsa-0a6332a881bd)
- [Blog - Multi-Cluster ArgoCD Architecture: Hub-and-Spoke vs. Per-Cluster, Done Right](https://aloknecessary.in/blogs/multi-cluster-argocd-architecture/)
- [Octopus - A Comprehensive Overview of Argo CD Architectures](https://octopus.com/blog/a-comprehensive-overview-of-argo-cd-architectures)
## Ecosystem and Extensions

Argo CD is in continuous active development, so it is no surprise how massive its ecosystem and extension landscape have become. If you take a look at [awesome-argo](https://github.com/akuity/awesome-argo) curated by [Akuity](https://github.com/akuity), or the main [Argo Project](https://github.com/argoproj) organization, you will find four core pillars—**Argo CD**, **Argo Workflows**, **Argo Rollouts**, and **Argo Events**. Together, they form an end-to-end, Kubernetes-native delivery suite that covers the entire software lifecycle—from event-driven CI pipelines and container builds to GitOps reconciliation and progressive delivery.

Today, the Argo ecosystem also continues to pioneer multi-cluster control plane scalability with projects like [argocd-agent](https://argocd-agent.readthedocs.io/stable/), which enables remote clusters to pull state securely over outbound connections rather than relying on centralized push models. Alongside the core projects, you can discover many of these experimental and specialized add-ons under [Argo Project Labs](https://github.com/argoproj-labs).

It is well worth exploring these extensions—here are several standout tools and UI plugins from the Argo ecosystem that elevate day-to-day GitOps operations:

- **[Argo CD Notifications](https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/):** Built directly into core Argo CD, this controller continuously monitors application state changes and triggers alerts or webhooks across Slack, Microsoft Teams, email, GitHub commit statuses, and custom endpoints.
- **[Argo CD Image Updater](https://github.com/argoproj-labs/argocd-image-updater):** A controller that watches container registries for new image tags or digests and automatically updates Kubernetes workloads managed by Argo CD—either via imperative parameter overrides or by committing updated tags directly back to your Git repository.
- **[Argo Rollouts UI Extension](https://github.com/argoproj-labs/rollout-extension):** A native Argo CD web UI extension that embeds interactive progressive delivery visualizations—showing canary step progression, traffic weights, and `AnalysisRun` statuses directly inside the Argo CD resource tree.
- **[Argo CD Metrics Extension](https://github.com/argoproj-labs/argocd-extension-metrics):** A UI extension that surfaces real-time Prometheus metrics and golden signals (latency, error rate, traffic, saturation) right alongside your deployed resources in the Argo CD dashboard.
- **[ArgoCD Agent](https://github.com/argoproj-labs/argocd-agent)**: Redefining the multi cluster story of Argo CD

Explore more of the Argo ecosystem through the links below:

- [awesome-argo](https://github.com/akuity/awesome-argo)
- [Argo Project](https://github.com/argoproj)
- [Argo Project Labs](https://github.com/argoproj-labs)
- [Octopus - A Fully Argo-Based Ecosystem For Continuous Delivery and Deployment](https://octopus.com/blog/a-fully-argo-based-ecosystem)
## ArgoCD Use Case with Notification Controller

![[design-argocd-notification-with-webhook.png]]

Before diving into the hands-on **Kubewekend** setup for Argo CD, I have a small project I built previously that uses Argo CD as the core engine alongside the `notification-controller` to:

- Observe CD (Sync) status whenever a new application version or platform tool is deployed.
- Connect the Argo CD Notification Controller with webhooks in a large cluster to dispatch alerts and trigger automated API documentation generation.

>[!question]
>Depending on our purpose, I should integrate our alerting into **Google Chat** to centralize our notifications and alerts sync-status in one place. Therefore, you should consider using Argo CD's [Google Chat Service](https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/services/googlechat/). This service provides the ability to send messages to Google Chat channels via [webhook integration](https://developers.google.com/workspace/chat/quickstart/webhooks) and offers [card message templates](https://developers.google.com/chat/reference/message-formats/cards) to build advanced notifications with Argo CD.

Now we will take a walkthrough into the **why**, the **resources**, and a couple of previews of the setup and demo I built previously, hopefully sparking some new ideas for your own workflows.

### Why

> [!info]
> 
> All products are operated via **Argo CD**. However, a challenge arises when applications sync without a clear indication of whether the deployment actually succeeded or stabilized. This is why we should implement **Argo CD Notifications**, a built-in feature natively supported by Argo CD.

Implementing Argo CD Notifications enhances day-to-day operations in three key ways:

- **Real-time Deployment Awareness:** Provides immediate updates on application deployment progress and current health states.
- **Proactive Issue Resolution:** Enables rapid identification and troubleshooting of problems occurring during Argo CD application deployments or synchronization loops.
- **Timely Error Announcements:** Delivers instant alerts for any synchronization failures or degradation originating from Argo CD.

At a minimum, Argo CD should emit notifications for the following core application lifecycle states:

- **Synced and Healthy (`on-deployed`):** Indicates that the application synchronized cleanly and all resources are operating as expected.
- **Health Degraded (`on-health-degraded`):** Alerts the team when an application that was previously stable transitions into an unhealthy or degraded state.

### Resources

Leveraging Argo CD's native notification engine, originally developed under the [argocd-notifications project](https://github.com/argoproj-labs/argocd-notifications?tab=readme-ov-file)—we can easily set up and deliver deployment state notifications to various chat platforms, such as Slack, PagerDuty, or Google Chat.

To achieve this, consult the instructions provided by the Argo CD maintainers in the [Argo CD Documentation - Notifications Overview](https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/). Notifications function as a continuous monitoring mechanism for the Argo CD system, pairing [triggers](https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/triggers/) (which evaluate state conditions) with [templates](https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/templates/) (which format the payload) inside the `argocd-notifications-cm` ConfigMap. This flexible approach allows you to customize notifications based on specific conditions, application states, desired channels, and payload formats.

> [!note]
> 
> There are several [predefined catalogs](https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/catalog/) available for general purposes—including ready-to-use `on-deployed`, `on-sync-failed`, and `on-health-degraded` triggers—eliminating the need to reinvent them from scratch.

Externally, you can also refer to these practical walkthroughs and tutorials on building out a notification system:

- [YouTube - ArgoCD Notifications (Successful/Failed Deployments)](https://www.youtube.com/watch?v=OP6IRsNiB4w&ab_channel=AntonPutra) - [GitHub](https://github.com/antonputra/tutorials/tree/main/lessons/179)
- [Octopus - Argo CD Notifications: From Basic to Advanced](https://octopus.com/devops/argo-cd/argo-cd-notifications/)

### Setup and Demo

>[!warning] Prerequisites
>This setup requires notification-controller to be enabled in your Argo CD deployment. You can enable it through whichever method you use to deploy Argo CD. In my case, I use helm (where `notifications.enabled` defaults to true in recent chart versions).

```bash
helm upgrade --install argocd argo/argo-cd --version 10.18.3 \
 --namespace argocd --create-namespace \
 --reuse-values \
 --set notifications.enable=true
```

Next, create a Kubernetes `Secret` (by default, the controller looks for `argocd-notifications-secret` in the `argocd` namespace) to store your webhook URLs and API tokens so `notification-controller` can reference them safely without exposing credentials in ConfigMaps

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: <secret-name>
stringData:
  space-webhook-url: https://chat.googleapis.com/v1/spaces/<space_id>/messages?key=<key>&token=<token>
  docs-sk: sk-xyzabc
```

Now configure `argocd-notifications-cm` to declare `service.googlechat` referencing that secret key

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
data:
  service.googlechat: |
    webhooks:
      spaceName: $space-webhook-url
```

Beyond declaring the webhook service, this same ConfigMap centralizes your [`template`](https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/templates/), [`service.webhook`](https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/services/webhook/), and [`trigger`](https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/triggers/) definitions before any [`Application` subscribes via annotations](https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/subscriptions/). Here is the complete configuration combining Google Chat alerts and automated API documentation webhooks

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
data:
  # Notifying to google-chat
  service.googlechat: |
    webhooks:
      spaceName: $space-webhook-url
  # Submitting new documentation
  service.webhook.example-docs: |
	url: https://webhook-docs.example.com/projects
	headers:
	- name: Authorization
	  value: Bearer $docs-sk
	- name: Content-Type
	  value: application/json
	retryWaitMin: 120s
	retryWaitMax: 120s
	retryMax: 3
  # Notifying about the state of apps
  template.app-deployed: |
	message: |
	  🚀 *The app has successfully deployed!* 🚀
	  - *Application*: {{ .app.metadata.name }}
	  - *Project*: {{ .app.spec.project }}
	  - *Namespace*: {{ .app.spec.destination.namespace }}
	  - *Status*: {{ .app.status.sync.status }}
	  - *Health*: {{ .app.status.health.status }}
	  - *View in ArgoCD*: {{ .context.argocdUrl }}/applications/{{ .app.metadata.name }}
	  - *Deployed At*: {{ .app.status.operationState.finishedAt | default "N/A" }}
  template.app-health-degraded: |
	message: |
	  🚨 *The app has degraded!* 🚨
	  - *Application*: {{ .app.metadata.name }}
	  - *Project*: {{ .app.spec.project }}
	  - *Namespace*: {{ .app.spec.destination.namespace }}
	  - *Status*: {{ .app.status.sync.status }}
	  - *Health*: {{ .app.status.health.status }}
	  - *View in ArgoCD*: {{ .context.argocdUrl }}/applications/{{ .app.metadata.name }}
	  - *Last Sync Message*: {{ .app.status.operationState.message | default "No message" }}
	  - *Degraded Since*: {{ .app.status.health.status | default "N/A" }}
  # Submitting documentation of apps
  template.example-docs-submitted: |
	webhook:
	  example-docs:
	    method: POST
		body: |
		  {
			"openapiUrl": "https://api.example.com/openapi.json",
			"projectName": "Example API"
		  }
  # The trigger of state of apps notification 
  trigger.on-deployed: |
	- description: Application is synced and healthy. Triggered once per commit.
	  oncePer: app.status.operationState.syncResult.revision
	  send:
		- app-deployed
	  when: app.status.operationState.phase in ['Succeeded'] and app.status.health.status == 'Healthy'
  trigger.on-health-degraded: |
	- description: Application has degraded
	  send:
		- app-health-degraded
	  when: app.status.health.status == 'Degraded'
  # The trigger of documentation submmited
  trigger.example-docs-on-submitted: |
	- when: app.status.operationState.phase in ['Succeeded'] and app.status.health.status == 'Healthy'
	  oncePer: app.status.operationState.syncResult.revision
	  send:
		- example-docs-submitted
```

With the triggers, templates, and services wired up, you simply subscribe your `Application` via metadata annotations. Once you sync the application, the controller automatically executes the pipeline step-by-step (`subscription` → `trigger` → `template` + `service`)

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: example-app
  namespace: argocd
  annotations:
    # Annotation use for notification-cd
    # format: notifications.argoproj.io/subscribe.<trigger>.<noti-service>: <recipient>
    notifications.argoproj.io/subscribe.on-deployed.googlechat: spaceName
    notifications.argoproj.io/subscribe.on-health-degraded.googlechat: spaceName
    # Annotation use for submit-documentation
    # format: notifications.argoproj.io/subscribe.<trigger>.<webhook-service>: ""
    notifications.argoproj.io/subscribe.example-docs-on-submitted.example-docs: ""
```

# ArgoCD with Kubewekend

![[meme-lab-time.png|center|500]]

Alright, we are officially jumping into the **Kubewekend** hands-on lab. After covering the architectural foundations, patterns, and ecosystem extensions above, you are ready to bootstrap Argo CD for your own HomeLab GitOps setup, or build the foundation to drive a GitOps transition in your workplace.

This lab focuses on a complete, end-to-end deployment walkthrough covering four practical stages:

- **Cluster Bootstrap & Multi-Tenancy:** Bootstrapping the cluster with the **App of Apps Pattern** and enforcing isolation with dedicated **`AppProject`** boundaries for each application group.
- **Hybrid Fan-Out (`Application` & `ApplicationSet`):** Combining standalone `Application` manifests with `ApplicationSet` generators inside the **Hyrbid App of Apps + ApplicationSet Pattern**.
- **Automated Image Lifecycle (`argocd-image-updater`):** Configuring `argocd-image-updater` to automatically track and update container images across both **Helm** and **Kustomize** workloads.
- **Outbound Multi-Cluster Fleet (`argocd-agent`):** Setting up a lightweight multi-cluster case study using **`argocd-agent`**, allowing remote spoke clusters to pull desired state securely over outbound connections without exposing their Kubernetes API servers.

Before diving into the lab details, you need to prepare your experimental environment with **Kubewekend**. With **Kubewekend**, you can easily provision a Kubernetes cluster using any of three supported distributions, **K3s**, **RKE2**, or **KinD**, and automatically deploy **Argo CD** with **`argocd-image-updater`** enabled. But I will help you deploy `ArgoCD` manually with `helm`

Let's spin up a single-node **K3s** cluster on a VM, VPS, or cloud host of your choice using `kubewekend` from [GitHub - Kubewekend](https://github.com/Xeus-Territory/kubewekend)

```bash
git clone https://github.com/Xeus-Territory/kubewekend.git
cd kubewekend
pip install -r requirements.txt
./scripts/setup.sh config show
```

![[thumbnail-kubewekend-k3s-config.png]]

>[!info] VPS Specifications
>My experimental VPS machine is provisioned with: 2 vCPUs – 8 GB RAM – Ubuntu 24.04 LTS.

Next, configure your Ansible inventory with your target VPS IP address and SSH credentials, then verify connectivity

```bash
# Setup inventory with your SSH and IP of VPS
./scripts/setup.sh inventory set-remote

# Test connectivity before setup
./scripts/setup.sh inventory ping standalone-masters
```

After status return successful, you can run command to setup `k3s` cluster, this will install `install_common` with various opensource, and tool to help you workaroud with kubernetes inside host, and `setup_k3s` to setup K3s Cluster with configuration.

```bash
./scripts/setup.sh k3s setup --host k8s-master-machine --ask-become-pass
```

You can execute `kubectl` directly on the VPS, or you can get `kubeconfig` to your host for practicing with K3s Cluster Provision from remote-vps

```bash
  ssh <master> 'sudo -S cat /etc/rancher/k3s/k3s.yaml' > ~/.kube/config
  # Then replace 127.0.0.1 with the master node IP in the kubeconfig
  sed -i 's/127.0.0.1/<master_ip>/g' ~/.kube/config
```

```bash
kubectl get pods -A
```

![[thumbnail-kubewekend-k3s-bootstrap.png]]

## Bootstrap ArgoCD in Cluster

You can apply ArgoCD with many way, but I would recommend you to install ArgoCD with `helm` for easier modification via `values.yaml` when applied. Explore more at [ArgoCD - Installation](https://argo-cd.readthedocs.io/en/stable/operator-manual/installation/) and [Helm Chart](https://artifacthub.io/packages/helm/argo/argo-cd)

```bash
helm repo add argo https://argoproj.github.io/argo-helm
helm repo update
helm upgrade --install argocd argo/argo-cd \
  --namespace argocd --create-namespace --version 10.16.0 --wait \
  --set global.domain=argocd.kubewekend.local \
  --set server.ingress.enabled=true \
  --set server.ingress.ingressClassName=traefik \
  --set server.ingress.hostname=argocd.kubewekend.local \
  --set configs.params."server\.insecure"=true \
  --set dex.enabled=false
```

This command will help you add `argo` helm-chart repository to your local, and install argocd via `helm` with configuration

- Enable and set `global.domain` which let you redirect anything inside ArgoCD with specfic host
- Enable Ingress to help you easier to ArgoCD, but you can skip it if not need UI
- Setup `insecure` for TLS configuration to prevent error when you use ArgoCD with Traefik o prevent redirect loops from HTTP to HTTPS. But this feature require enable when you run in production when TLS inject into your application, it can self-signed, but you can use `cert-manager` to manipulate it. Explore more at [Ingress Disable internal TLS](https://argo-cd.readthedocs.io/en/stable/operator-manual/ingress/#disable-internal-tls), [TLS configuration](https://argo-cd.readthedocs.io/en/stable/operator-manual/tls/).
- Disable Dex for authentication for reduce complex. We will explore Dex on another session about enable more complex Authentication in ArgoCD for align them with SSO.

>[!hint] Enable HA Git Pooling
>To prevent error when pull Git with `rate-limit`, you can enable more attempts for ArgoCD via environment variable `ARGOCD_GIT_ATTEMPTS_COUNT=3` (Default 1). Explore more at [ArgoCD HighAvailability](https://argo-cd.readthedocs.io/en/stable/operator-manual/high_availability/) or [Medium - Make Your ArgoCD Super Fast🚀](https://saikiranpikili.medium.com/make-your-argocd-super-fast-9c75fa94b840)

To access ArgoCD, you can modify `/etc/hosts` and add `x.y.z.t argocd-address` and openbrowser to connect ArgoCD UI. Now get password of admin user via `secret` in `argocd` namespace with `user=admin`

![[thumbnail-argocd-login.png]]

```bash
kubectl get secrets -n argocd argocd-initial-admin-secret -o go-template='{{range $k,$v := .data}}{{"### "}}{{$k}}{{"\n"}}{{$v|base64decode}}{{"\n\n"}}{{end}}'
```

![[thumbnail-argocd-workspace.png]]

If you require to setup private private repository, I recommend you read carefully these articles to configuration SSH information and authenticate to let ArgoCD can discovery your GitOps repository

- [ArgoCD - Declarative Setup (Repositories)](https://argo-cd.readthedocs.io/en/stable/operator-manual/declarative-setup/#repositories)
- [ArgoCD - Declarative Setup (SSH Known host public keys)](https://argo-cd.readthedocs.io/en/stable/operator-manual/declarative-setup/#ssh-known-host-public-keys) 
- [ArgoCD - `argocd repo add` command](https://argo-cd.readthedocs.io/en/stable/user-guide/commands/argocd_repo_add/)

>[!info]
>Get `ssh-know-host` with command `ssh-keyscan`
>```bash
>ssh-keyscan -p <port> hostname
>```

To add private repository credentials, you have two method `CLI` and apply Kubernetes manifest

```bash
argocd repo add REPOURL [flag]
```

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: private-repo-creds
  namespace: argocd
  labels:
    argocd.argoproj.io/secret-type: repo-creds
stringData:
  type: git
  url: https://github.com/argoproj
  password: my-password
  username: my-username
```

You can try directly with `kubewekend` because it's public repository so that don't require authentication to pull and discovery code.

Now after setup credential, and SSH know-host configuration, you can apply `app-of-app.yaml` to declare App of Apps Pattern in Kubewekend Cluster

```bash
kubectl apply -n argocd -f https://raw.githubusercontent.com/Xeus-Territory/kubewekend/refs/heads/main/examples/argocd-apps/app-of-apps.yaml
```

Now show the `app-of-apps` Application with `argocd` command or you can view them in ArgoCD UI

```bash
argocd app list
```

```bash
NAME                         CLUSTER                         NAMESPACE     PROJECT         STATUS  HEALTH   SYNCPOLICY  CONDITIONS               REPO                                          PATH                                                          TARGET
argocd/app-of-apps           https://kubernetes.default.svc  argocd        default         Synced  Healthy  Auto-Prune  <none>                   https://github.com/Xeus-Territory/kubewekend  examples/argocd-apps/app-of-apps                              HEAD
argocd/argocd                https://kubernetes.default.svc  argocd        infrastructure  Synced  Healthy  Auto-Prune  <none>                   https://github.com/Xeus-Territory/kubewekend  examples/argocd-apps/manifests/infrastructure/argocd          HEAD
argocd/cert-manager          https://kubernetes.default.svc  cert-manager  platform        Synced  Healthy  Auto-Prune  OrphanedResourceWarning  https://github.com/Xeus-Territory/kubewekend  examples/argocd-apps/manifests/platform/cert-manager          HEAD
argocd/hello-helm            https://kubernetes.default.svc  hello-helm    apps            Synced  Healthy  Auto-Prune  <none>                   https://github.com/Xeus-Territory/kubewekend  examples/argocd-apps/workloads/hello-helm                     HEAD
argocd/hello-kustomize-dev   https://kubernetes.default.svc  hello-dev     apps            Synced  Healthy  Auto-Prune  <none>                   https://github.com/Xeus-Territory/kubewekend  examples/argocd-apps/workloads/hello-kustomize/overlays/dev   HEAD
argocd/hello-kustomize-prod  https://kubernetes.default.svc  hello-prod    apps            Synced  Healthy  Auto-Prune  <none>                   https://github.com/Xeus-Territory/kubewekend  examples/argocd-apps/workloads/hello-kustomize/overlays/prod  HEAD
```

![[thumnail-argocd-sync.png]]

It will setup totally 6 **Applications**

- `app-of-apps`: For managing entire application, app-project, and applicationset. It shows entirely concept and manging application following groups to isolate range user can reach in ArgoCD
- `argocd`: Sync again **ArgoCD** with more configuration, you find out them in [values.yaml](https://github.com/Xeus-Territory/kubewekend/blob/main/examples/argocd-apps/manifests/infrastructure/argocd/values.yaml) to enable new `user`, `exec`, resource custom health, enable rbac for user with `policy.csv`, ...
- `cert-manager`: Support **Cert-Manager** helm chart
- `hello-helm`: Helm application built on [Kubewekend Helm Chart - Common v0.4.0](https://github.com/Xeus-Territory/kubewekend/tree/main/kubernetes/charts/common)
- `hello-kustomize-*`: Kustomize application built on Kustomize and **ApplicationSet** using Git generator for multiple environment
## Image Updater - The Right Hand of ArgoCD (Optional)

With ArgoCD, you can declare your strategy update image by manually in CI/CD pipeline, or integrate 3rd party, [ArgoCD Image Updater](https://argocd-image-updater.readthedocs.io/en/stable/). In my opinon, you can choose one of them to let declare clearly your image update strategy, don't mix them together because it's bad idea and cause your manifest encounter trouble. Let's discovery  

| Dimension                      | CI/CD Git Push                                                                                                                             | Argo CD Image Updater                                                                                                                               |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **How it works**               | CI builds the image, updates the tag in your manifest repo (e.g., via `yq`, `kustomize edit`, or PR), and pushes. Argo CD pulls and syncs. | A controller inside Kubernetes polls container registries for new tags and writes changes back to Git or the Argo CD API.                           |
| **Security & Blast Radius**    | **Safer.** Your cluster only needs read-only access to Git; CI already holds write/deploy permissions.                                     | **Higher risk.** Requires giving a cluster component write credentials (PATs/SSH keys/GitHub App) to push to your manifest repo.                    |
| **Determinism & Traceability** | **High.** Every deployment maps 1-to-1 to a specific CI build commit with clear commit authors and PR checks.                              | **Moderate.** Relies on tag matching rules (`semver`, `latest`, `digest`), which can unexpectedly deploy if someone pushes a matching tag manually. |
| **Maintenance & Complexity**   | Requires adding a manifest-update step (and handling concurrent Git push conflicts) in your CI pipeline.                                   | Zero CI changes needed; configured via Kubernetes annotations or `ImageUpdater` CRDs, though you must manage another controller.                    |
| **Registry API Limits**        | **Low.** No continuous polling against Docker Hub, ECR, or GHCR.                                                                           | **Higher.** Frequent registry polling can trigger rate limits if you track many images.                                                             |

That why you should consider to choose ArgoCD follow what path, it's essential step and it should declare from scratch, before hit to complex system with many Application and Image. You can choose which when

**Go with CI/CD Git Push**

- You own the application source code and already run a CI pipeline (GitHub Actions, GitLab CI, Jenkins, etc.) to build the container.
- You enforce strict branch protection, PR approvals, or compliance audits in production.
- You want your Kubernetes cluster to remain strictly read-only toward Git.

**Go with Argo CD Image Updater**

- You deploy third-party vendor images or shared base images built outside your CI pipelines and want automatic patch updates (e.g., `~1.4.0`).
- You manage dozens of microservices and want centralized tag-tracking rules without duplicating Git-commit logic across every repo.
- You use an imperative setup (`argocd` write-back method) for ephemeral/dev environments where Git history isn't needed.

>[!hint] Perspective
>With me, I usually choose Image Updater because our repository should declare same tag format for which environment, that will be quite fit if you got them easier to promotion for higher version. But the tricky when you use Image Updater can let you become confuse, but belive me, if you can control it, I think **Image Updater** can become a right hand of ArgoCD to reduce workload when bootstrap CI/CD Pipeline, which hard to control and managing than Platform with **Image Updater**

Let's try with `kubwekend` if you want to test `image-updater` fit with your setup at [example](https://github.com/Xeus-Territory/kubewekend/blob/main/examples/argocd-apps/labs/03-image-updater/imageupdater.yaml). But you need to ensure what version you got for **Image Updater** because this project is unstable, with changing after minor version, like

- If you use version `<= 1.0.0`, **Image Updater** will work for setup via `annotation`, you can setup them in **Application** to let controller can discovery and mapping their image to right possition. Explore more at [ArgoCD Image Updater v0.19](https://argocd-image-updater.readthedocs.io/en/release-0.19/configuration/applications/)
- If you use version `>= 1.0.0`, **Image Updater** will support CRDs instead annotation to let you declare image update for your Application with easier to manage across environment of once app, than **Application** annotation format. Explore more at [ArgoCD Image Update from v1.0](https://argocd-image-updater.readthedocs.io/en/release-1.0/)

When you sync the bootstrap of `argocd` application, it already include chart `image-updater.enable=true`, and it will install version `v1.0.1`, or you can use helm install

```bash
helm upgrade --install argocd-image-updater argo/argocd-image-updater \
  --namespace argocd --version 1.0.1 --wait
```

Now you can explore the API scheme `imageupdater` with command

```bash
kubectl explain imageupdater.spec
```

It will include 4 part to configuration

- **applicationRefs (Required)**: ApplicationRefs indicates the set of applications to be managed. ApplicationRefs is a list of rules to select Argo CD Applications within the **ImageUpdater CR's namespace (not `spec.namespace` - deprecated v1.2.x)**.
- **commonUpdateSettings**: CommonUpdateSettings provides global default settings for update strategies, tag filtering, pull secrets, etc., for all applications matched by this CR. These can be overridden at the ApplicationRef or ImageConfig level.
- **writeBackConfig**: WriteBackConfig provides global default settings for how and where to write back image updates. This can be overridden at the ApplicationRef level.
- **imagesVerification**: ImagesVerification defines the global default image signature verification policy. When set, every image update is subject to cryptographic verification before being committed to Git or applied to an Argo CD Application.

Now we will implement following the example, and I will explain each parameter we configure

```bash title="imageupdater.yaml"
# Lab 3: Argo CD Image Updater (v1.x) with an `ImageUpdater` custom resource (no annotations on the Applications).
#
# What it does, every few minutes:
#   1. looks up the tags of xeusnguyen/kubewekend-todo in the registry
#   2. picks the newest semver tag (v1.0.0 -> v1.1.0)
#   3. commits the new tag to Git (the `git` write-back method), so Git stays the source of truth
#   4. Argo CD sees the new commit and rolls the Deployment out
#
# Two applications are tracked, one per tool; `hello-kustomize-prod` is deliberately NOT tracked:
#   hello-helm            -> writes common.image.tag in workloads/hello-helm/values.yaml
#   hello-kustomize-dev   -> writes the `images:` block of overlays/dev/kustomization.yaml
apiVersion: argocd-image-updater.argoproj.io/v1alpha1
kind: ImageUpdater
metadata:
  name: hello
  namespace: argocd
spec:
  # `git:secret:<namespace>/<name>` reads `username` and `password` from that Secret (see the lab for the command)
  writeBackConfig:
    method: git:secret:argocd/git-creds
    gitConfig:
      branch: main
      # Use the URL of YOUR fork: the commit is pushed there
      repository: https://github.com/Xeus-Territory/kubewekend
  commonUpdateSettings:
    updateStrategy: semver
    ignoreTags:
      - latest
  applicationRefs:
    - namePattern: hello-helm
      writeBackConfig:
        method: git:secret:argocd/git-creds
        gitConfig:
          branch: main
          repository: https://github.com/Xeus-Territory/kubewekend
          # # NOTE: use the default write with newfile `.argocd-source-<appName>.yaml`
          # # Helm: write the tag into the chart's values file (path relative to the Application's source path)
          # writeBackTarget: helmvalues:values.yaml
      images:
        - alias: todo
          imageName: xeusnguyen/kubewekend-todo
          manifestTargets:
            helm:
              # Value paths in values.yaml. The `common` chart is a dependency, hence the `common.` prefix
              name: common.image.repository
              tag: common.image.tag
    - namePattern: hello-kustomize-dev
      writeBackConfig:
        method: git:secret:argocd/git-creds
        gitConfig:
          branch: main
          repository: https://github.com/Xeus-Territory/kubewekend
          # # NOTE: use the default write with newfile `.argocd-source-<appName>.yaml`
          # # Kustomize: edit the `images:` block of the kustomization.yaml in the Application's source path
          # writeBackTarget: kustomization
      images:
        - alias: todo
          imageName: xeusnguyen/kubewekend-todo
          manifestTargets:
            kustomize:
              # The image name exactly as written in `images:` (overlays/dev/kustomization.yaml)
              name: xeusnguyen/kubewekend-todo
```

This file declares the core configuration for `argocd-image-updater` (using its CRD-based `ImageUpdater` specification):

- **Target Applications (`applicationRefs[].namePattern`):** Selects the two Argo CD `Application` resources managed by the updater—`hello-helm` and `hello-kustomize-dev`—via explicit name matching or wildcard patterns.
- **Git Write-Back & Authentication (`writeBackConfig.method`):** Configures `git` as the write-back method so the controller persists image updates directly back to your GitOps repository instead of applying ephemeral parameter overrides. You must configure a `git-creds` Secret with write permissions to the repository—using either an **SSH private key**, a **password**, or a **Personal Access Token (PAT)**.
- **Repository URL & Credential Alignment:** Ensure your Git credential type matches the repository URL scheme declared in Argo CD—use a PAT or username/password for `https://` URLs, and an SSH private key for `git@` URLs.
- **Manifest Target Mapping (`manifestTargets`):** Defines how updated image tags are written into each packaging format:
    
    - **Helm (`manifestTargets.helm`):** Specifies the exact `values.yaml` key paths for the image repository and tag (for example, `common.image.repository` and `common.image.tag`).
    - **Kustomize (`manifestTargets.kustomize`):** Maps the `name` entry under the `images` transformer block in `kustomization.yaml`. Note that Kustomize's built-in image transformer only targets standard workload fields (such as `Deployment` or `StatefulSet` `containers[].image`) by default—if you manage custom resources like Crossplane `XRs`, you must define a custom `ImageTagTransformer` configuration to target those custom field paths. Explore more at [Kustomize - ImageTagTransformer](https://www.google.com/search?q=https://kubectl.docs.kubernetes.io/references/kustomize/builtins/%23_imagetagtransformer_) and [StackOverflow](https://stackoverflow.com/a/71920861).
- **Global Update Strategy & Tag Filtering (`commonUpdateSettings`):** Sets shared defaults (`updateStrategy` and `ignoreTags`) across all referenced applications unless overridden per `applicationRef`. Using `semver` instructs the updater to automatically track and bump to the newest minor or patch version whenever a new `vX.Y.Z` or `X.Y.Z` tag is published to the registry. Explore more at [Semver - Semantic Versions](https://argocd-image-updater.readthedocs.io/en/stable/basics/update-strategies/#semver-update-to-semantic-versions).
- **Pull Request Workflow (`writeBackConfig.gitConfig.pullRequest`):** Starting in **v1.2.0**, `argocd-image-updater` supports opening a **Pull Request** for image tag updates rather than committing directly to your target branch. This enforces branch protection and peer review—allowing CI checks and human reviewers to validate or reject an automated version bump before it ever triggers an Argo CD sync. Explore more at [Git Pull Request](https://argocd-image-updater.readthedocs.io/en/stable/basics/update-methods/#git-pull-request)

>[!warning] Recommendation
>I recommend forking the `kubewekend` repository to your own GitHub account first so you can practice Git write-backs and Pull Requests safely without permission issues.

First, create the `git-creds` Secret in the `argocd` namespace using your GitHub username and Personal Access Token (PAT) so `argocd-image-updater` has permission to push branches and open Pull Requests against your GitOps repository

```bash
kubectl -n argocd create secret generic git-creds \
  --from-literal=username=someuser \
  --from-literal=password=somepassword
```

Next, apply the `ImageUpdater` custom resource to watch the applications and detect available image bumps. Because tag `v1.1.0` already exists in the container registry, the controller will immediately detect the newer semantic version and trigger a Git write-back

```bash
kubectl apply -n argocd -f https://raw.githubusercontent.com/Xeus-Territory/kubewekend/refs/heads/main/examples/argocd-apps/labs/03-image-updater/imageupdater-github.yaml
```

Inspect the `ImageUpdater` custom resource definition and tail the `argocd-image-updater-controller` logs to observe the reconciliation loop in real time

```bash
# check imageupdater configuration
kubectl get imageupdater -n argocd hello

# check log of image updater
kubectl logs -n argocd deployments/argocd-image-updater-controller argocd-image-updater-controller
```

Once detected, `argocd-image-updater` automatically opens Pull Requests targeting `main` for both `hello-helm` and `hello-kustomize-dev`. Instead of mutating your base `values.yaml` or `deployment.yaml` directly, each PR generates a `.argocd-source-<appName>.yaml` override file inside the manifest directory watched by Argo CD. You can merge the PR to let Argo CD sync the new `v1.1.0` image into Kubernetes, or close/reject it to block the rollout.

![[thumbnail-argo-image-updater-helm.png]]

![[thumbnail-argo-image-updater-kustomize.png]]

Finally, verify the active container image revisions directly from the Argo CD UI or by querying the application manifests via the `argocd` CLI

```bash
argocd app get argocd/hello-helm --output yaml | grep -e "xeusnguyen/kubewekend-todo"
argocd app get argocd/hello-kustomize-dev --output yaml | grep -e "xeusnguyen/kubewekend-todo"
```

>[!done] Argo CD Image Updater Complete
>That covers the core workflow for `argocd-image-updater`. As noted earlier, adopting it depends on your team's operational expectations—since it adds an external controller layer that can feel less deterministic than explicit CI-driven manifest commits. Give it a try in your lab to see how it fits your workflow, and explore further configuration options in the [Argo CD Image Updater Official Documentation](https://argocd-image-updater.readthedocs.io/en/stable/).

## ArgoCD Multi-Cluster with Brand New Strategy

![[thumbnail-argocd-agent-multi-cluster.png]]

![[thumbnail-argocd-agent-architecture-concept.png]]

In the last lab, I think I will bring something new cool stuff to try with ArgoCD Multi-Cluster with [**ArgoCD Agent**](https://github.com/argoproj-labs/argocd-agent), a brand new method to get your GitOps into your workspace.

>[!info] What is ArgoCD Agent?
>[argocd-agent](https://argocd-agent.readthedocs.io/latest/) introduces a pull-based architecture where agents on workload clusters initiate connections to a central control plane. This inversion eliminates most traditional multi-cluster pain points while preserving the familiar Argo CD experience.
>
>**Key Principles:**
>- **Agents Connect Inward**: No outbound connections from the control plane
>- **Local Reconciliation**: Application controllers run where workloads live
>- **Unified Observability**: Single pane of glass for all clusters and applications
>- **Standard Argo CD**: Works with vanilla Argo CD installations
> 
>You can find more information about ArgoCD Agent at [ArgoCD Agent - Features Overview](https://argocd-agent.readthedocs.io/latest/features/)

Let's try it, but instead use the cluster we provision, I recommend you to create two `Kind` cluster by using `Kubewekend`, or `define` the own with `kind-config.yaml`.  Following lab [Getting Started with Kind](https://argocd-agent.readthedocs.io/latest/getting-started/kubernetes/kind/), you will setup

- Two Individual K8s Cluster will run in different network configuration, to show them can connect and provision application each others. Especially, ensure the connectivity between two individual K8s Cluster
- Setup one node as Hub cluster to install ArgoCD for only for centralize, but don't operate workload, and one node as Spoke cluster to install ArgoCD Agent and workload operation.
- PKI and certificate authority to let hub and agent secure connect each other via mTLS, and deploy [**Principal**](https://argocd-agent.readthedocs.io/latest/concepts/components-terminology/#principal) to open NetworkPolicy for agent traffic.
### PKI and mTLS

Before we go directly to use and setup ArgoCD Agent, because I want to show and learn the about core concept with PKI and mTLS, that will help you go cleanly with concept of ArgoCD Agent apply to create the connection between each cluster via mTLS and gRPC.

>[!note] What is PKI ?
>[Public Key Infrastructure (PKI)](https://www.okta.com/identity-101/public-key-infrastructure/) is a framework of cryptographic technologies, policies, and procedures that secures and authenticates digital communications. It relies on asymmetric encryption — using paired public and private keys — and digital certificates issued by trusted Certificate Authorities (CAs) to verify identities online.
>
>PKI underpins everyday internet security, from HTTPS web browsing to email encryption, document signing, and IoT device communication.

>[!note] What is mTLS?
>[Mutual Transport Layer Security (mTLS)](https://www.cloudflare.com/learning/access-management/what-is-mutual-tls/) is a security method where both the client and server verify each other's identity using digital certificates before exchanging encrypted data. Unlike standard TLS, where only the server proves its identity, mTLS enforces two-way authentication.

The linked between PKI and TLS showed via PKI provide trust and identity system (digital certificates and CA) that TLS uses to authenticate parties and encrypt live connection across a supply chain. In a supply chain—spanning vendors, APIs, logistics systems, CI/CD pipelines, and connected devices—PKI answers _"who can be trusted?"_ while TLS answers _"how do we secure this session in transit?"_

How they work together

- **Identity & Trust (PKI):** Certificate Authorities (CAs) issue, validate, renew, and revoke X.509 certificates that bind public keys to verified supply chain entities (servers, services, gateways, or devices).
- **Session Security (TLS):** During the TLS handshake, endpoints exchange certificates, verify the trust chain and revocation status, prove possession of the private key, and negotiate symmetric session keys (such as AES) to encrypt data and verify integrity.
- **Mutual TLS (mTLS):** Both client and server present PKI-issued certificates and verify each other. This is widely used for machine-to-machine supply chain traffic (e.g., partner APIs, microservices, and edge/IoT nodes) so neither side can be spoofed.

Open-source public key infrastructure is publicly available. Examples of open-source PKI include the following:

| Tool                                                 | Description                                                                                                                                                          | Key Feature                                                                                  |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [OpenSSL](https://www.openssl.org/)                  | Commercial-grade, full-featured toolkit developed in C                                                                                                               | Included in all major Linux distributions; can PKI-enable applications and build a simple CA |
| [CFSSL](https://github.com/cloudflare/cfssl)         | Cloudflare's PKI/SSL toolkit for signing, verifying, and bundling TLS certificates and building custom TLS PKI tools                                                 | Signing, verifying, and bundling TLS certificates                                            |
| [XiPKI](https://github.com/xipki/xipki)              | High-performance and highly scalable CA and Online Certificate Status Protocol (OCSP) responder implemented in Java                                                  | SHA-3 support                                                                                |
| [step-ca](https://github.com/smallstep/certificates) | A lightweight, developer-friendly open-source private CA and ACME server that makes practicing mTLS between laptops, Docker containers, or IoT/edge nodes very fast. |                                                                                              |

You can practice mTLS + PKI with Opensource and CNCF project, you can reference these collaboration

| Stack                              | Environment                        | Best For Practicing                                               | Setup Complexity |
| ---------------------------------- | ---------------------------------- | ----------------------------------------------------------------- | ---------------- |
| **SPIRE + Envoy**                  | Linux / Docker / VMs               | Zero-trust workload identity & cross-domain federation            | Medium           |
| **cert-manager + Linkerd**         | Local Kubernetes (kind / minikube) | Automated K8s certificate lifecycle & transparent pod mTLS        | Low–Medium       |
| **step-ca + Nginx/Go/Python**      | Localhost / Docker                 | Understanding raw X.509 chains, CSRs, and mTLS handshakes         | Low              |
| **OpenBao + cert-manager + Istio** | Kubernetes                         | Enterprise external CA integration & dynamic certificate rotation | High             |

![[thumbnail-mTLS-method.png]]
<div align="center">
	<p style="text-align: center;">Source: F5 Lab</p>
</div>

To easier practice, we will try with `openssl` to create PKI, and validate connection between Server Key and Client Key to create chain of mTLS, that will reflect machanism when you use `argocd-agentctl` to generate `PKI` and setup `mTLS` to let agent authenticate with principle used gRPC/mTLS.

Following this [devcloudlab - mTLS in Practice: Issuing and Rotating Client Certs](https://devcloudlab.com/blog/mtls-issuing-rotating-client-certificates/), [Kubewekend PKI and mTLS Lab with OpenSSL](https://kubewekend.xeusnguyen.xyz/examples/argocd-apps/labs/05-pki-mtls/) and [[Awesome Linux Shell commands#`openssl`]], you can try to create private CA and define issue certificate to create a chain mTLS between Client and Server

First we will create private CA who take responsibility to issue both certificate for Client and Server

```bash
# Gen key with RSA Algo, or DSA with specific bits
openssl genrsa -out ca.key 2048

# Gen crt with key created above
openssl req -x509 -new -nodes -key ca.key -sha256 -days 3650 -out ca.crt \
-subj "/CN=Local-Testing-CA"
```

Next create server-certificate and issue with private CA

```bash
# gen server-key
openssl genrsa -out server.key 2048

# gen csr (Certificate Signing Request) from server.key
openssl req -new -key server.key -subj "/CN=localhost" -out server.csr

# Create a config file for the SAN (Subject Alternative Name) extension
echo "subjectAltName=DNS:localhost,IP:127.0.0.1" > server_ext.cnf

# Sign the server CSR using your Private CA
openssl x509 -req -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt -days 365 -sha256 -extfile server_ext.cnf
```

Next create client-certificate and issue with private CA

```bash
# gen client-key
openssl genrsa -out client.key 2048

# gen csr (Certificate Signing Request) from client.key
openssl req -new -key client.key -subj "/CN=LabClient01" -out client.csr

# Sign the client CSR using the same Private CA
openssl x509 -req -in client.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out client.crt -days 365 -sha256
```

With OpenSSL, it provide built-in [s_server](https://docs.openssl.org/1.0.2/man1/s_server/) and [s_client](https://docs.openssl.org/1.0.2/man1/s_client/) utilities across two separate terminal windows to inspect the handshake live.

**Terminal 1: Start the mTLS Server**

The `-Verify 1` flag (capital **V**) forces the server to request a client certificate and **reject** the connection if none is provided or if it isn't signed by `ca.crt`

```bash
openssl s_server -accept 8443 \
  -cert server.crt -key server.key \
  -CAfile ca.crt -Verify 1
```

**Terminal 2: Connect with the Client and Inspect Status**

Pass the client certificate, client key, and the CA certificate to verify the server.

```bash
openssl s_client -connect localhost:8443 \
  -cert client.crt -key client.key \
  -CAfile ca.crt
```

Check the output in both terminals to confirm mutual authentication succeeded:

|Check Location|What to Look For|Meaning|
|---|---|---|
|**Client Terminal**|`Verify return code: 0 (ok)`|Client successfully verified the server's certificate against `ca.crt`.|
|**Client Terminal**|`Acceptable client certificate CA names` showing `/CN=MyPrivateCA`|Server actively requested a client certificate signed by your CA.|
|**Server Terminal**|`depth=1 CN = MyPrivateCA` followed by `depth=0 CN = LabClient01`|Server received and validated the client's certificate chain.|
|**Both Terminals**|Typing text in one window echoes it in the other|Encrypted application data channel is active.|

**Negative Test (Optional)**

To verify that unauthorized clients are blocked, run `openssl s_client -connect localhost:8443 -CAfile ca.crt` **without** the `-cert` and `-key` flags. The server terminal will immediately reject the handshake with `peer did not return a certificate`.

```bash
openssl s_client -connect localhost:8443 \
  -CAfile ca.crt
```

![[Pasted image 20261125135316.png]]

You can do advantage lab with **Target stack** (Nginx, Envoy, Go, Node.js, or Python) and **Certificate revocation** testing (CRL or OCSP setup)

**Nginx (Reverse Proxy mTLS)**

Nginx is commonly used to terminate mTLS at the edge before forwarding requests to backend services.

Save this as `nginx-mtls.conf` in your `mtls-lab` directory

```nginx
events {}

http {
    server {
        listen 8443 ssl;
        server_name localhost;

        # Server certificate and key
        ssl_certificate     /path/to/mtls-lab/server.crt;
        ssl_certificate_key /path/to/mtls-lab/server.key;

        # Client verification settings
        ssl_client_certificate /path/to/mtls-lab/ca.crt;
        ssl_verify_client on;

        location / {
            return 200 "mTLS Verified! Client DN: $ssl_client_s_dn\n";
        }
    }
}
```

Test with curl for terminate mTLS

```bash
curl --cacert ca.crt --cert client.crt --key client.key https://localhost:8443
```

Explore more about PKI and mTLS at

- [F5 Lab - What Is mTLS?](https://www.f5.com/labs/articles/what-is-mtls)
- [CNCF - Multi-cluster PKI + Istio recipe: practical example for a trusted and scalable PKI for your service mesh](https://www.cncf.io/blog/2024/11/01/multi-cluster-pki-istio-recipe-practical-example-for-a-trusted-and-scalable-pki-for-your-service-mesh/)
- [NHIMG - What is the difference between PKI and TLS in web security?](https://nhimg.org/faq/what-is-the-difference-between-pki-and-tls-in-web-security/)
- [Emudhra - Introduction to Transport Layer Security (TLS) and Public Key Infrastructure (PKI)](https://emudhra.com/en/blog/introduction-to-transport-layer-security-tls-public-key-infrastructure-pki)
- [DevOpsDB -  Security – Building an Internal CA with Step-CA (Part 1 — Installation and Initial Configuration)](https://devops-db.com/security-building-an-internal-ca-with-step-ca-part-1-installation-and-initial-configuration/)
- [OpenBao - PKI Secrets Agent](https://openbao.org/docs/secrets/pki/)
- [AWS - Introducing mTLS for Application Load Balancer](https://aws.amazon.com/blogs/networking-and-content-delivery/introducing-mtls-for-application-load-balancer/)
- [Smallstep - OCSP vs CRL Explained](https://smallstep.com/blog/ocsp-vs-crl-explained/)
- [Vault - PKI Unified CRL and OCSP with cross cluster revocation](https://developer.hashicorp.com/vault/tutorials/pki/pki-unified-crl-ocsp-cross-cluster)
- [Viblo - 3 cách xử lý SSL/TLS traffic tại Loadbalancer hoặc Reverse Proxy](https://viblo.asia/p/3-cach-xu-ly-ssltls-traffic-tai-loadbalancer-hoac-reverse-proxy-1XVOWEe6VMz)
- [F5 Lab - SSL/TLS Offloading, Encryption, and Certificates with NGINX and NGINX Plus](https://www.f5.com/company/blog/nginx/nginx-ssl)

Now back a bit about [ArgoCD Agent - TLS & Certificate](https://argocd-agent.readthedocs.io/latest/configuration/tls-certificates/), you can read this documenation to catch up how to setup and manage the PKI for argocd-agent. You can handle to create PKI and setup certificate for Server and Client following many ways

- [Using `argocd-agentctl` CLI](https://argocd-agent.readthedocs.io/latest/configuration/tls-certificates/#using-argocd-agentctl-cli-recommended): **Recommendation** method to ensure with right concept of `argocd-agent`
- [Using `cert-manager`](https://argocd-agent.readthedocs.io/latest/configuration/tls-certificates/#using-cert-manager): The [cert-manager](https://cert-manager.io/docs/) operator can automate certificate management using a CA issuer.
- [Using `SPIRE`](https://argocd-agent.readthedocs.io/latest/configuration/tls-certificates/#using-spire-automated-certificate-management)
- [Manual Certificate Management](https://argocd-agent.readthedocs.io/latest/configuration/tls-certificates/#manual-certificate-management): For production environments or integration with existing PKI infrastructure.

In argocd-agent, the **agent (client)** always initiates an outbound bi-directional **gRPC** connection to the **principal (server)**, and **mTLS** is the mechanism that lets both sides cryptographically validate each other before any state or application traffic is exchanged

1. **Shared Root of Trust (CA)**
    - Both the `principal` (hub cluster) and every `agent` (workload/spoke cluster) hold the same public **Root CA certificate** (`argocd-agent-ca` secret).
    - The `principal` has a **server certificate** signed by that CA (`argocd-agent-principal-tls`) with SANs matching its gRPC endpoint DNS/IP.
    - Each `agent` has its own unique **client certificate** signed by that same CA, where the certificate's **Subject Common Name (`CN`)** identifies the agent's name (e.g., `CN=agent-spoke-1`).
2. **Outbound Handshake (Agent → Principal)**
    - The `agent` dials out to the `principal` over gRPC (`agent.creds: "mtls:"`), avoiding the need to expose inbound firewall ports on workload clusters.
    - **Server Verification:** The `agent` checks the `principal`'s server certificate against its trusted Root CA and verifies the server's DNS/IP SAN to prevent Man-in-the-Middle (MITM) attacks.
    - **Client Verification:** Because `principal.tls.client-cert.require: "true"` is enforced, the `principal` demands the `agent`'s client certificate and validates it against the same Root CA.
3. **Identity Extraction & Traffic Authorization**
    - Once the mTLS handshake succeeds, the `principal` doesn't just trust the connection—it extracts the agent's identity directly from the validated X.509 certificate using a regex rule such as `principal.auth: "mtls:CN=([^,]+)"`.
    - That extracted identity (`agent-spoke-1`) maps directly to the agent's namespace and permissions on the hub cluster, ensuring an agent can only sync Applications and events belonging to its own identity.
    - Over this single authenticated HTTP/2 gRPC stream, the `principal` and `agent` multiplex bi-directional synchronization (Applications, AppProjects, and resource proxy requests)

You can explore more about Configuration Preference for both Principle and Agent Configuration at [ArgoCD Agent - Configuration Reference Overview](https://argocd-agent.readthedocs.io/latest/configuration/reference/)
### Walkthrough with Kind

You can follow step by step to setup full two cluster and use `argocd-agentctl` to bootstrap PKI and setup connection between ArgoCD Hub and ArgoCD Agent

0. **Tools and names**

Install `kind`, `kubectl` and `argocd-agentctl`, the project's command line tool for certificates and agents. Pick the download for your system from the [releases page](https://github.com/argoproj-labs/argocd-agent/releases):

```bash
export HUB=hub SPOKE=spoke-1 AGENT=spoke-1 NS=argocd RELEASE=v0.11.0
curl -fsSL -o argocd-agentctl "https://github.com/argoproj-labs/argocd-agent/releases/download/$RELEASE/argocd-agentctl-linux-amd64"
chmod +x argocd-agentctl && sudo mv argocd-agentctl /usr/local/bin/
argocd-agentctl version
```

1. **Create the two clusters**

Different pod and service ranges keep the two clusters from overlapping. Both Kind nodes join the same Docker network,  
which is how the spoke will reach the hub.

```bash
cat <<EOF | kind create cluster --name $HUB --config=-
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
name: $HUB
networking:
  podSubnet: "10.245.0.0/16"
  serviceSubnet: "10.97.0.0/16"
nodes:
  - role: control-plane
    image: kindest/node:v1.36.4
EOF

cat <<EOF | kind create cluster --name $SPOKE --config=-
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
name: $SPOKE
networking:
  podSubnet: "10.246.0.0/16"
  serviceSubnet: "10.98.0.0/16"
nodes:
  - role: control-plane
    image: kindest/node:v1.36.4
EOF

kubectl create namespace $NS --context kind-$HUB
kubectl create namespace $NS --context kind-$SPOKE
```

2. **Hub: Argo CD, the principal flavour.**

The project ships a kustomization that installs Argo CD **without** the application controller and the ApplicationSet  controller. Server-side apply is required because the manifests are large.

```bash
kubectl apply -n $NS --server-side --context kind-$HUB \
  -k "https://github.com/argoproj-labs/argocd-agent/install/kubernetes/argo-cd/principal?ref=$RELEASE"
```

This configuration includes:

- ✅ **argocd-server** (API and UI)
- ✅ **argocd-dex-server** (SSO, if needed)
- ✅ **argocd-redis** (state storage)
- ✅ **argocd-repo-server** (Git repository access)
- :luc_x: **argocd-application-controller** (runs on workload clusters only)
- **argocd-applicationset-controller** (optional)

>[!note]
>The kustomization takes Argo CD from its `stable` release, so the Argo CD version is whatever `stable` is today. In the test run it was `v3.6.2` (agent v0.11 supports the Argo CD 3.6 stream).

Two settings on the hub's Argo CD:

```bash
kubectl patch configmap argocd-cmd-params-cm -n $NS --context kind-$HUB \
  --patch '{"data":{"application.namespaces":"*","redis.server":"argocd-agent-redis-proxy:6379"}}'
kubectl rollout restart deployment argocd-server -n $NS --context kind-$HUB
for d in argocd-server argocd-repo-server argocd-redis; do
  kubectl rollout status deploy/$d -n $NS --context kind-$HUB --timeout=240s
done
```

- `application.namespaces: "*"` lets Applications live in any namespace.
- `redis.server` makes the API server read live data (resource trees) through the principal's **Redis proxy**, which fetches it from the spoke on demand. Without it the hub shows an app's sync status but fails to show its resources with `cache: key is missing`.

**3. Hub: certificates and the principal.**

```bash
argocd-agentctl pki init --principal-context kind-$HUB --principal-namespace $NS

kubectl apply -n $NS --context kind-$HUB \
  -k "https://github.com/argoproj-labs/argocd-agent/install/kubernetes/principal?ref=$RELEASE"
```

The principal listens on port 8443. A NetworkPolicy installed with it blocks traffic from outside the hub, so allow the agent's connection. Then bind to all interfaces, turn on destination-based mapping (an Application names its agent with `destination.name`) and expose the principal as a NodePort:

```bash
kubectl patch networkpolicy argocd-agent-redis-proxy -n $NS --context kind-$HUB --type=json \
  -p='[{"op":"add","path":"/spec/ingress/-","value":{"ports":[{"protocol":"TCP","port":8443}]}}]'

kubectl patch configmap argocd-agent-params -n $NS --context kind-$HUB --patch "{\"data\":{
  \"principal.allowed-namespaces\":\"$AGENT\",
  \"principal.destination-based-mapping\":\"true\",
  \"principal.listen.host\":\"0.0.0.0\"}}"

kubectl patch svc argocd-agent-principal -n $NS --context kind-$HUB --patch '{"spec":{"type":"NodePort"}}'
```

The principal's server certificate must name the address the agent will use: **the hub node's address on the Docker network and the NodePort**. The resource proxy (how the hub's Argo CD reaches the spoke's live data) gets its own

```bash
HUB_IP=$(kubectl get node $HUB-control-plane --context kind-$HUB -o jsonpath='{.status.addresses[?(@.type=="InternalIP")].address}')
NODEPORT=$(kubectl get svc argocd-agent-principal -n $NS --context kind-$HUB -o jsonpath='{.spec.ports[0].nodePort}')
RP_IP=$(kubectl get svc argocd-agent-resource-proxy -n $NS --context kind-$HUB -o jsonpath='{.spec.clusterIP}')

argocd-agentctl pki issue principal --principal-context kind-$HUB --principal-namespace $NS \
  --ip 127.0.0.1,$HUB_IP --dns localhost,argocd-agent-principal.$NS.svc.cluster.local --upsert
argocd-agentctl pki issue resource-proxy --principal-context kind-$HUB --principal-namespace $NS \
  --ip 127.0.0.1,$RP_IP --dns localhost,argocd-agent-resource-proxy.$NS.svc.cluster.local --upsert
argocd-agentctl jwt create-key --principal-context kind-$HUB --principal-namespace $NS --upsert

kubectl rollout restart deployment argocd-agent-principal -n $NS --context kind-$HUB
kubectl rollout status deployment argocd-agent-principal -n $NS --context kind-$HUB --timeout=180s
```

Show the information of Hub Cluster and servicd `nodeport` of `argocd-agent-principal`

```bash
echo "hub node: $HUB_IP, principal NodePort: $NODEPORT"             
hub node: 172.18.0.2, principal NodePort: 30710

kubectl get services -n argocd --context kind-$HUB
NAME                                      TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)                      AGE
argocd-agent-principal                    NodePort    10.97.230.183   <none>        443:30710/TCP                11m
argocd-agent-principal-healthz            ClusterIP   10.97.27.125    <none>        8003/TCP                     11m
argocd-agent-principal-metrics            ClusterIP   10.97.244.69    <none>        8000/TCP                     11m
argocd-agent-redis-proxy                  ClusterIP   10.97.190.131   <none>        6379/TCP                     11m
argocd-agent-resource-proxy               ClusterIP   10.97.155.235   <none>        9090/TCP                     11m
argocd-application-controller             ClusterIP   None            <none>        <none>                       18m
argocd-dex-server                         ClusterIP   10.97.248.71    <none>        5556/TCP,5557/TCP,5558/TCP   18m
argocd-metrics                            ClusterIP   10.97.175.103   <none>        8082/TCP                     18m
argocd-notifications-controller-metrics   ClusterIP   10.97.250.58    <none>        9001/TCP                     18m
argocd-redis                              ClusterIP   10.97.75.17     <none>        6379/TCP                     18m
argocd-repo-server                        ClusterIP   10.97.185.57    <none>        8081/TCP,8084/TCP            18m
argocd-server                             ClusterIP   10.97.60.34     <none>        80/TCP,443/TCP               18m
argocd-server-metrics                     ClusterIP   10.97.245.38    <none>        8083/TCP                     18m
```


4. **Spoke: Argo CD (managed flavour), then the agent.**

The managed flavour is Argo CD with the application controller and no API server or UI

```bash
kubectl apply -n $NS --server-side --context kind-$SPOKE \
  -k "https://github.com/argoproj-labs/argocd-agent/install/kubernetes/argo-cd/agent-managed?ref=$RELEASE"
```

This configuration includes:

- ✅ **argocd-application-controller** (reconciles applications - **required on workload clusters**)
- ✅ **argocd-repo-server** (Git access for the application controller)
- ✅ **argocd-redis** (local state for the application controller)
- ❌ **argocd-server** (runs on control plane only)
- ❌ **argocd-dex-server** (runs on control plane only)
- ❌ **argocd-applicationset-controller** (managed agents don't run their own, see [ApplicationSets — managed agents](https://argocd-agent.readthedocs.io/latest/user-guide/managed-agent/applicationsets-managed-mode/))

Register the agent on the hub, give it a client certificate on the spoke, and create the agent's namespace on the hub:

```bash
argocd-agentctl agent create $AGENT --principal-context kind-$HUB --principal-namespace $NS \
  --resource-proxy-server argocd-agent-resource-proxy.$NS.svc.cluster.local:9090
argocd-agentctl pki issue agent $AGENT --principal-context kind-$HUB \
  --agent-context kind-$SPOKE --agent-namespace $NS --upsert
kubectl create namespace $AGENT --context kind-$HUB
```

Deploy the agent and tell it where the principal is, which mode to use and how to authenticate

```bash
kubectl apply -n $NS --context kind-$SPOKE \
  -k "https://github.com/argoproj-labs/argocd-agent/install/kubernetes/agent?ref=$RELEASE"

kubectl patch configmap argocd-agent-params -n $NS --context kind-$SPOKE --patch "{\"data\":{
  \"agent.server.address\":\"$HUB_IP\",
  \"agent.server.port\":\"$NODEPORT\",
  \"agent.mode\":\"managed\",
  \"agent.creds\":\"mtls:any\",
  \"agent.destination-based-mapping\":\"true\",
  \"agent.create-namespace\":\"true\"}}"

kubectl rollout restart deployment argocd-agent-agent -n $NS --context kind-$SPOKE
kubectl rollout status deployment argocd-agent-agent -n $NS --context kind-$SPOKE --timeout=180s
```

**5. Check that the two sides found each other.**

From the spoke: the agent authenticated and connected

```bash
for i in $(seq 1 20); do
  kubectl logs -n $NS -l app.kubernetes.io/name=argocd-agent-agent --context kind-$SPOKE --tail=200 \
    | grep -E 'Authentication successful|Connected to' && break
  sleep 3
done
```

```bash
time="2026-11-25T08:13:33Z" level=info msg="Authentication successful" module=Connector
time="2026-11-25T08:13:33Z" level=info msg="Connected to argocd-agent-0.11.0" module=Connector
```

From the hub: the principal knows the agent, and the hub's Argo CD lists it as a cluster

```bash
argocd-agentctl agent list --principal-context kind-$HUB --principal-namespace $NS

PW=$(kubectl -n $NS --context kind-$HUB get secret argocd-initial-admin-secret -o jsonpath='{.data.password}' | base64 -d)
kubectl -n $NS --context kind-$HUB port-forward svc/argocd-server 8080:443 > /dev/null 2>&1 &
PF=$!
sleep 5
argocd login localhost:8080 --insecure --username admin --password "$PW"
argocd cluster list
```

```bash
'admin:login' logged in successfully
Context 'localhost:8080' updated
SERVER                                                                               NAME        VERSION  STATUS      MESSAGE                                       PROJECT
https://argocd-agent-resource-proxy.argocd.svc.cluster.local:9090?agentName=spoke-1  spoke-1              Successful  Agent: 'spoke-1' is connected with principal  
https://kubernetes.default.svc                                                       in-cluster  1.36.4   Successful  
```

The hub's `default` AppProject was also pushed to the spoke automatically

```bash
kubectl get appprojects -n $NS --context kind-$SPOKE
```

**6. Deploy from the hub to the spoke.**

[`guestbook.yaml`](https://github.com/Xeus-Territory/kubewekend/blob/main/examples/argocd-apps/labs/04-argocd-agent/guestbook.yaml) is an ordinary Application. The only unusual part is the destination: the agent's  
**name**, not a cluster address.

```yaml
  destination:
    name: spoke-1
    namespace: guestbook
```

```bash
kubectl apply -f https://raw.githubusercontent.com/Xeus-Territory/kubewekend/refs/heads/main/examples/argocd-apps/labs/04-argocd-agent/guestbook.yaml --context kind-$HUB
kubectl wait --for=jsonpath='{.status.sync.status}'=Synced application/guestbook -n $NS --context kind-$HUB --timeout=240s
kubectl wait --for=jsonpath='{.status.health.status}'=Healthy application/guestbook -n $NS --context kind-$HUB --timeout=240s
```

Now compare the two clusters:

```bash
echo "hub destination:   $(kubectl get application guestbook -n $NS --context kind-$HUB -o jsonpath='{.spec.destination}')"
echo "spoke destination: $(kubectl get application guestbook -n $NS --context kind-$SPOKE -o jsonpath='{.spec.destination}')"
kubectl get pods -n guestbook --context kind-$SPOKE
! kubectl get namespace guestbook --context kind-$HUB
```

```bash
hub destination:   {"name":"spoke-1","namespace":"guestbook"}
spoke destination: {"name":"in-cluster","namespace":"guestbook"}
NAME                            READY   STATUS    RESTARTS   AGE
guestbook-ui-5d6468fd55-kc4x6   1/1     Running   0          75s
Error from server (NotFound): namespaces "guestbook" not found
```

- The **hub** keeps `spoke-1` as the destination: it is how it routes the Application.
- The **spoke** received the same Application with the destination rewritten to in-cluster: for the spoke's own controller it is simply a local deployment.
- The pods exist only on the spoke. The hub never ran them and has no guestbook namespace.

**7. The hub can see into the spoke.**

The hub's Argo CD shows live data that lives on the spoke. It asks the spoke through the connection the agent opened, so the spoke's API server stays private.

```bash
argocd app get guestbook
```

```bash
$ argocd app get guestbook
Name:               argocd/guestbook
Project:            default
Server:             spoke-1
Namespace:          guestbook
URL:                https://localhost:8080/applications/guestbook
Source:
- Repo:             https://github.com/argoproj/argocd-example-apps
  Target:           HEAD
  Path:             guestbook
SyncWindow:         Sync Allowed
Sync Policy:        Automated (Prune)
Sync Status:        Synced to HEAD (8088f4c)
Health Status:      Healthy

GROUP  KIND        NAMESPACE  NAME          STATUS  HEALTH   HOOK  MESSAGE
       Service     guestbook  guestbook-ui  Synced  Healthy        service/guestbook-ui unchanged
apps   Deployment  guestbook  guestbook-ui  Synced  Healthy        deployment.apps/guestbook-ui unchanged
```

>[!warning] Get pod logs via argocd
>Pod logs are different: they need one more permission, because the agent's default role cannot read `pods/log`. Without  it the principal logs `pods "..." is forbidden: User "system:serviceaccount:argocd:argocd-agent-agent" cannot get resource "pods/log"`. Grant exactly that on the spoke:

```bash
kubectl patch clusterrole argocd-agent-agent --context kind-$SPOKE --type=json \
  -p='[{"op":"add","path":"/rules/-","value":{"apiGroups":[""],"resources":["pods/log"],"verbs":["get"]}}]'
POD=$(kubectl get pod -n guestbook --context kind-$SPOKE -l app=guestbook-ui -o jsonpath='{.items[0].metadata.name}')
argocd app logs guestbook --kind Pod --name $POD --tail 3
```

After patch the clusterrole in `kind-$SPOKE` with more `pods/log`, not it's available to get log from Hub, instead access into spoke.

Let's try to use open ArgoCD UI for see what inside at `https://localhost:8080` and login with `$PW`

![[thumbnail-argocd-agent-view-via-hub.png]]

![[thumnail-argocd-agent-connectivity-from-hub.png]]
>[!info]
>For inspection and debugging, you will rely more heavily on the `argocd` CLI (or the Hub UI's resource proxy) than direct `kubectl` commands on the Hub, because the actual workloads are not running on the Hub cluster—pod logs and live resource manifests are streamed back from the Spoke over the outbound gRPC/mTLS connection handled by the Principal's resource proxy.

To wrap up the lab, remember to terminate any background `port-forward` process running against the Argo CD Hub and delete both KinD clusters to clean up local resources

```bash
kill $PF
kind delete cluster --name $HUB
kind delete cluster --name $SPOKE
```

>[!info]
>For a complete overview of the lab and to explore more Argo CD and `argocd-agent` configurations, check out the full repository at [GitHub - Kubewekend](https://github.com/Xeus-Territory/kubewekend).
# Conclusion

![[meme-gg.png]]

>[!done] Conclusion
>That wraps up everything I wanted to share in this Argo CD session. With an estimated reading time of well over an hour, this is one of the largest deep-dive posts I have put together—I hope it gives you practical clarity and concrete evidence when choosing patterns and architectures for Argo CD. If any rough edges or typos slipped through, I will refine them in future updates.

>[!quote] A few words of thanks
>After spending 3–4 days since last weekend distilling my hands-on experience with GitOps and Argo CD, it is clear how much room there is to grow with GitOps—backed by a massive community and flexible patterns across both Argo CD and Flux. Stay healthy and keep building! Alongside this post, I am also releasing [[Kubewekend Session Extra 6]] covering Istio if you want to explore service mesh networking further. This may be my final standalone technology deep-dive on the channel for this year 2026, as I am shifting 100% of my focus toward refactoring **[W'xOps IDP](https://www.wxops.cloud/)** and introducing upcoming projects. Thanks for reading, and see you in the next post!
