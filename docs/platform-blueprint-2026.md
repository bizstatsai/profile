# BizStats Platform Blueprint (November 2026)

**Co-Author**: Srini Centhala, srini@absolut-e.com, Chief Data and AI Architect

Condensed, public-safe copy of the report published on 2026-11-03. The full version with
all figures, evidence tags and 87 numbered sources is the "BizStats Platform Blueprint"
artifact. This file keeps the decisions, the tables and the diagram sources so the repository
carries the reasoning. No internal identifiers (hosts, addresses, ports, namespaces, secret
paths, ticket numbers, staff names) appear here or in the diagrams, on purpose.

Evidence labels used below: **[source]** the page was opened and checked; **[excerpt]** taken
from a search-result excerpt because the host was blocked in the research session, so confirm
before quoting externally; **[repo]** from the product repositories.

---

## 0. Ten decisions

1. Become known through one public artifact, not through cadence alone. Every 2025–26 rise
   case was a single inspectable thing others could fork, cite or teach.
2. The artifact is the pattern, not the product: open-source a reference implementation of a
   self-hosted MCP agent platform with cloud failover, extracted from the shared platform tier
   and BotNX, under a memorable name.
3. Name the practice: *sovereign agent operations* (working name).
4. Write the fifth book with an engineering press (Manning or O'Reilly) and release the
   manuscript free first.
5. The fused "Chief Data and AI" title is the one winning at Fortune 500 scale (54 vs 24 plain
   CAIOs; ~450 companies have neither) [excerpt]. Sell "CAIO-in-residence" against that gap.
6. Route Fortune 100 work through partner programs, Marketplace private offers and expert
   networks, not cold outreach.
7. Showcase the thirteen products as one family with one identity; fix the naming
   inconsistencies between repositories first.
8. Close the resilience gaps before telling the failover story in public.
9. Build the failover as a pilot light on a managed Kubernetes cluster at a second provider,
   fronted by an edge load balancer with a documented bypass. RTO 15 min, RPO 60 s.
10. Launch patterns.bizstats.ai as a diagrams-as-code catalogue seeded with twelve patterns.

## 1. How data and AI people became known in 2025–26

| Who | Artifact | Outcome | Mechanism | Evidence |
|---|---|---|---|---|
| Dex Horthy | *12-Factor Agents*, README-driven GitHub guide, created 2025-03-30 | 26,960 stars; a day on the HN front page; AI Engineer World's Fair talk | Borrowed name + Show HN + one talk | [source] |
| Peter Steinberger | *OpenClaw* personal agent runtime (first commit 2025-11-24, viral as Clawdbot from 2026-01-02) | ~196k stars by 2026-02-16; 393.8k by Nov 2026; hired by OpenAI; now a 501(c)(3) | Runtime others could run | [source] GitHub, [excerpt] CNBC |
| Affaan Mustafa | *everything-claude-code* config pack | 296.2k stars; weekly releases by one maintainer | Opinionated configuration for a popular tool | [source] |
| David Soria Parra | MCP, donated to the Linux Foundation AAIF 2025-12-09 | 97M monthly SDK downloads, 10,000 servers | Open protocol in a neutral foundation | [source] |
| Chip Huyen | *AI Engineering* (O'Reilly, Jan 2025) + companion repo | "Most read book on O'Reilly in 2025" (author's self-report) | Engineering-press book + public repo | [excerpt] |
| Hamel Husain & Shreya Shankar | Cohort course on LLM evals (Maven) | 4,500+ students in 15 months | Narrow pain, high-ticket cohort | [excerpt] |
| Zach Wilson | Free bootcamp funnel, daily LinkedIn, handbook repo | $912,000 sales in H1 2025 (self-reported) | Free → paid cohort | [excerpt] |
| Harrison Chase | LangChain | $125M Series B at $1.25B, Oct 2025 | Star curve first, revenue second | [excerpt] |
| Antonio Gulli | 400-page *Agentic Design Patterns* as a free Google Doc | Cited widely from Sept 2025; print Dec 2025 | Give the manuscript away | [excerpt] |
| Andrej Karpathy | *nanochat* (~8,000 lines) | 60.1k stars; "context engineering" spread in a week | Small runnable reference; two-word name | [source] |
| Chad Sanderson | "Data contracts" → Gable | $20M Series A, Mar 2025 | Name a concept, productise later | [excerpt] |
| Nate B. Jones | Daily strategy video | ~127k → ~325k YouTube subscribers in 2026 | Pure cadence, fixed format | [excerpt] |
| Avi Chawla | Daily visual explainers + tutorial repo | 200k+ newsletter subs (publisher's figure) | Free runnable tutorials | [excerpt] |
| swyx | Coined "AI Engineer"; AI Engineer World's Fair | 3,000 attendees, 300 speakers (June 2025) | Name a role, own the room | [excerpt] |
| Gene Kim & Steve Yegge | *Vibe Coding* (IT Revolution, Oct 2025) | Axiom gold 2026 | First serious book on a named trend | [excerpt] |

**The pattern:** one forkable artifact · a name that travels · free first, paid second · a
narrow unsolved pain · a neutral venue · credentials as backstop, not headline.

**The route for a 25-year architect specifically:** every rise case above is a founder or
developer in their twenties or thirties. The architects of this generation who are widely known
got there by a defining long-form essay on a neutral high-authority host (Dehghani's data-mesh
essay on martinfowler.com, 2019) and a reference-manual site maintained for years (Hohpe since
2003, Richards' numbered lessons, Fowler's bliki). Do all three: repo, essay, catalogue.

## 2. Playbook

1. **Open-source the reference architecture you already run** — gateway with per-tool allowlists
   and per-tenant scopes, LLM router with provider fallback, Hub-style OIDC trust, scale-to-zero
   environments, health-checked edge pool pair, Postgres streaming + WAL archive. Companion
   markdown repo *"12 factors for sovereign agent platforms"*. A control matrix against the
   OWASP MCP Top 10 (MCP01–MCP10) and post-mortems of named CVEs. List in the MCP Registry
   under a DNS-verified `ai.bizstats/*` namespace [source].
   - Competitive reality [source, GitHub API 2026-11-03]: Coolify 65,577 stars, Dokploy 38,210,
     Kamal 14,702 (self-host PaaS); Uptime Kuma 93,211 (status pages); IBM mcp-context-forge
     4,745, Docker mcp-gateway 1,621, Microsoft 904 (gateways); the e2b awesome-mcp-gateways
     list names 16 open-source + 29 commercial gateways and admits projects at 200+ stars and
     2+ contributors. "MCP gateway" is not a differentiator; failover-aware MCP sessions and
     failover-safe agent memory are. No repository named `12-factor-mcp` exists.
   - Licensing templates: Apache-2.0 core + proprietary folder (Coolify, Dokploy) or AGPLv3 core
     + per-file enterprise + MIT SDK (Twenty CRM).
2. **Name the practice** and map it onto the canon: Anthropic's *Building effective agents*
   (2024-12-19) and *Effective context engineering for AI agents* (2025-09-29) [source].
3. **Fifth book** with Manning (`proposals@manning.com`) or O'Reilly, manuscript free first.
4. **Cadence on your own rails**: weekly long-form on BlogNX, daily LinkedIn, newsletter via
   the existing newsletter route.
5. **Cohort course on Labs**: operating self-hosted agent platforms in regulated enterprises.
6. **Standing in standards bodies**: one MCP SEP, OWASP MCP Top 10 contribution, AAIF Silver,
   Claude Connectors Directory and ChatGPT Apps directory listings.
7. **Stages selected on the artifact**: AI Engineer World's Fair, MCP Dev Summit, KubeCon's AI
   Inference + Agentic track, Data + AI Summit; QCon via track hosts and InfoQ articles.

## 3. Winning the offers

| Channel | What it takes | Evidence |
|---|---|---|
| AWS AI Competency, "Agentic AI Consulting Services" | Four customer case studies with architecture diagrams, two public; Advanced tier | [excerpt] |
| AWS Marketplace private offers | List assessments and deployments as professional services; 0.5% fee since 2026-06-16 | [excerpt] |
| Databricks Brickbuilder Partner Network | Bronze is enrolment; Gold needs a specialisation + customer evidence | [excerpt] |
| Snowflake Partner Network (new rules 2026-11-02) | Registered is free; CoCo accreditation; Select tier | [excerpt] |
| Microsoft Solutions Partner for Data & AI | 70 points: 2×AZ-104 + 2×AZ-305 prerequisites, certified staff, $1K+/month deployments | [excerpt] |
| Google Cloud Partner Network | Competencies decoupled from tiers; aim for an Advanced Competency | [source] post, [excerpt] thresholds |
| Expert networks (GLG, AlphaSights, Guidepoint, Coleman) | Register at $400–600/hour; profile on enterprise MCP/agent platforms | [excerpt] |
| Gartner Peer Insights for BotNX | 20+ reviews in 18 months; sub-$50M reviewers excluded (favours Fortune 100 references) | [excerpt] |
| Procurement readiness | $1M/$2M E&O, $1–5M cyber, SIG Lite/Core answer sets, SOC 2 Type II once products run inside client environments | [excerpt] |

Demand signal: MIT NANDA's *GenAI Divide* found 95% of pilots show no P&L impact and externally
partnered builds reach deployment ~67% vs ~33% for internal builds [excerpt]. Pricing: quote day
rates ($3,200–4,000/day advisory), sell implementation as Marketplace SKUs, never accept the
$130–190 agency band [excerpt]. Caution: Walmart discontinued its supplier diversity program in
November 2024 per its FY2025 proxy filings [excerpt].

## 4. What you already have → what to use it for

| Asset | Use |
|---|---|
| 25+ years, Fortune 100 roster | The four AWS case studies; expert-network profile; "known uses" on every pattern; CIO 100 co-nomination (deadline 2027-01-18) |
| Four BEP books | Credibility backstop; the fifth book goes to an engineering press |
| Forrester "Excellent Architecture & Design" | Lead sentence of every analyst briefing request |
| 22K LinkedIn followers | Distribution for the repo, the site and the newsletter |
| Shared platform tier (nine services, Terraform environments, vault, registry) | Source of the open reference implementation; known use for five patterns |
| BotNX (live) | Registry listing; Claude/ChatGPT/Copilot directories; Peer Insights reviews; cohort lab |
| DeployNX (building) | "Publish to MCP Registry" and "conformance suite as a deploy gate" features |
| Hub (live) | Private MCP sub-registry; the OIDC federation story |
| BlogNX, Labs, Status | Cadence engine; cohort course; public evidence of failover drills |
| Self-hosted cluster with a GPU node | Live reference for the cost and sovereignty argument; publish utilisation-vs-cost curves |

## 5. Product showcase

See `src/data/profile.js` (`products`) and the Products section of the site. Thirteen products:
BotNX (live), BizStats Hub (live), DeployNX (building), BlogNX (early access), BizStats Labs
(live), Status (live), bizstats.ai (live), KOU (early), D3K (early), DWS (early), DPMS (early),
Cosmos3D (coming soon), CRM (building; planned `crm.bizstats.ai`).

Inconsistencies to fix before showcasing further [repo]: DWS / D3K / DPMS are expanded
differently on the main repository and the marketing site; the two architecture documents
disagree on runtime versions; the old site's prices are not on the new site. Recommendation for
the CRM: unless it exists to dogfood BotNX agents, run an open CRM (Twenty) and ship the
BotNX↔CRM MCP integration instead.

## 6. Architecture, as built (public view)

Rendered diagrams: `public/diagrams/platform-context.svg` (C4 L1) and
`public/diagrams/platform-release-path.svg` (release sequence); sources in `docs/diagrams/src/`.
The full report adds the container view, the logical class model, the BotNX conversation
sequence and the deployment diagram, all labelled by role.

What a credible resilience story has to show: a rehearsed restore with its duration written
down; point-in-time recovery and stated RPO/RTO; a failover for the main site and BotNX, not only
the Hub; no single points of failure in cluster DNS, the edge tunnel client, the secrets vault,
shared storage or the image registry; production observability; edge-to-origin identity
enforced; the drift watcher kept authoritative.

## 7. Why self-host

- Cost when utilisation is steady: 37signals' S3 exit (~$1.5M/yr → under $200K/yr; >$10M
  five-year savings), GEICO's repatriation, Dropbox's $74.6M [excerpt].
- Inference economics are about utilisation: cost per million tokens varied up to 36.3× on
  identical hardware (arXiv 2606.11690, June 2026) [excerpt].
- Sovereignty is a budget line: Gartner $80B sovereign-cloud IaaS in 2026, Europe $12.6B
  (+83%); EU Cloud Sovereignty Framework; AWS European Sovereign Cloud GA 2026-01-15 [excerpt].
- The 2025 outages (AWS us-east-1 2025-10-20; Azure Front Door 2025-10-29; Cloudflare
  2025-11-18 and 2025-12-05) were single-provider control-plane failures [excerpt]; the failover
  must route around the edge provider, not only around origins.
- Costs, stated plainly: one building, one ISP; operations labour on a small team; one GPU node;
  SOC 2 once products run inside client environments.

## 8. Cloud failover design (proposed)

Pattern: pilot light, upgraded to warm standby for the gateway and auth. Standby at the managed
provider where the Hub's failover cluster, the Postgres hot standby and the secrets vault already
live; the Terraform modules use only the Kubernetes provider, so they apply unchanged.

| Concern | Decision |
|---|---|
| Traffic steering | Edge load balancer per hostname, two origin pools; HTTP monitor on the existing health endpoint, 60 s interval, retries 2, three consecutive failures to mark down; TTL 60 s |
| If the edge provider fails | Secondary DNS provider with direct-to-origin records, rehearsed quarterly; origins reachable without the tunnel client |
| Database | Keep streaming replication; add WAL archiving to object storage (pgBackRest/WAL-G) and a nightly base backup; promote with `pg_promote()` after fencing the primary; keep the nightly dump as the third copy |
| Redis | Ephemeral; the standby starts empty |
| Media and static | Media already on edge object storage; publish the static site zone there on every build |
| Images | Mirror the service images to a cloud registry on every build |
| Secrets | Vault Raft HA (3 nodes) or scheduled snapshots to object storage; same session signing key on both pools |
| LLM and voice | Designed degradation: no GPU on the standby; router falls through to API providers; voice unavailable and says so |
| Compute footprint | Gateway and auth at 1 replica; everything else scaled to zero and woken on first request (the staging pattern) |
| IaC | A fourth Terraform environment for DR with the same modules |
| Control of the switch | Automatic steering; human-approved promotion for six months, automatic after two clean drills |
| Targets | RTO 15 min for the main site, Hub and BotNX; RPO 60 s; static pages RTO ≈ 0 |

Build order: (1) rehearse the restore and write down its duration; (2) WAL archive to object
storage + PITR test; (3) second cluster-DNS replica and two tunnel-client replicas; (4) registry
mirror and static-site-to-object-storage steps in CI; (5) the DR Terraform environment, added to
the drift watcher baseline; (6) edge load balancer with the secondary DNS configured but not
serving; (7) production observability; (8) game day, publish RTO/RPO on the status page, repeat
quarterly, enforce the edge-to-origin identity header.

Diagrams: `pattern-pilot-light-failover.mmd` (sequence) and `pattern-availability-states.mmd`
(state machine) in `docs/diagrams/src/`.

## 9. patterns.bizstats.ai

Purpose: the one public artifact in web form, the canonical definition of the practice, the
chapters of the book, the weekly content, and a live demonstration of its own failover pattern.

What the reference catalogues do: Azure Cloud Design Patterns — 44 patterns in one table with
Well-Architected pillars as the taxonomy, a seven-heading article convention, CC BY 4.0 [source];
microservices.io — context / problem / forces / solution / resulting context / related [excerpt];
EIP — 65 patterns with one icon each, released as free stencils; C4 — CC BY 4.0 notation,
Structurizr models-as-code [excerpt]; System Design Primer 376.7k stars but unmaintained since
March 2026; Refactoring.Guru ~650–800K visits/month, down 19% MoM in Jan 2026 (search-dependent
sites are losing traffic to AI answers) [excerpt]; Mermaid 91k stars with `architecture-beta`
icon packs; MADR maintained, Log4brains dormant since Dec 2024 [source].

Pattern page template (fixed order): intent · context & forces · solution (diagram as code) ·
reference implementation · consequences · known uses · ADR + changelog · related. Spec: Astro
static export, Mermaid lint in CI, served from both pools and mirrored to object storage,
Pagefind search, MADR decision records, CC BY 4.0 for text and diagrams (NC-ND only for paid
course material). Launch set: the ten patterns now on this site plus two more from the stack
(Hub-style OIDC federation; Decision Card as a system of record), each naming which of
Anthropic's six canonical agent patterns it instantiates.

## 10. Managing the diagrams

Rules: one source file per diagram in git next to the document; a header on every file (id,
level, visibility, owner, rebuilt-against commit, ADR); rendered in CI, never by hand; public
diagrams derived from internal ones by a label mapping, never drawn twice; a fixed list of what
never appears in a public diagram; an ADR for every structural change; rebuilt on promotion;
captioned and accessible. Inventory and the public/internal boundary: `docs/diagrams/README.md`.

How the top profiles handle it (Fowler, Brown/C4, Hohpe, Richardson, Newman, Richards, Xu,
Huyen, Willison, Orosz): one canonical page per concept at a permanent URL; a fixed template;
evergreen pages with dated revision traces; diagrams in one notation with a legend, the notation
licensed CC BY where adoption is the goal; known uses are public exemplars, fictional running
examples or anonymised sources, never client logos; own the distribution (RSS, newsletter on
your domain); offerings kept apart from writing; plain long-lived static technology; publish
your own numbers. Almost none publish diagram source files — doing so is a differentiator.

## 11. Calendar (dates from search excerpts; confirm before relying on them)

| When | What | Action |
|---|---|---|
| 2026-11-09 → 12 | KubeCon NA (AI Inference + Agentic track) | Attend; meet track chairs for the NA 2027 CFP (~May 2027) |
| 2026-11-16 → 19 | DGIQ East + AI Governance | Network; ask about April 2027 San Diego CFP |
| 2026-11-17 → 18 | MLOps World | GenAI Summit | "Apply to Speak" for 2027 |
| 2026-11-17 → 20 | Microsoft Ignite | Partner-manager conversation |
| 2026-11-30 → 12-04 | AWS re:Invent | Seed a 2027 customer co-presentation |
| Dec 2026 → Feb 2027 | Data + AI Summit 2027 CFP (expected) | Submit the week it opens |
| Nov 2026 → Jan 2027 | QCon London 2027 track hosts | Pitch directly; write for InfoQ |
| 2027-01-18 | CIO 100 Awards 2027 deadline | Co-nominate a client program |
| 2027-03-08 → 10 | Gartner Data & Analytics Summit | Attend; request analyst briefings (free) |
| 2027-04-12 → 16 | DGIQ West + Enterprise Data World | Speak |
| ~May 2027 | AI Engineer World's Fair 2027 CFP | The BotNX/DeployNX production talk |
| Sep–Oct 2027 | DataIQ 100 nominations | Pre-write the 250-word entry |

Ninety days: (1–30) restore rehearsal; fix naming; extract the reference repo; register on
expert networks; enrol in partner programs; attend the November events. (31–60) WAL archive,
second cluster DNS, registry mirror; patterns site live with twelve patterns; reference repo
public with a Show HN; MCP Registry and Connectors Directory listings; Manning conversation;
DAIS abstract; SIG Lite answer set. (61–90) DR environment applied; edge load balancer live;
first game day with RTO/RPO on the status page; CIO 100 co-nomination; four AWS case studies
drafted; first cohort announced; weekly long-form running; one SEP or OWASP contribution.

## 12. Sources

The artifact lists 87 numbered sources with URLs and the research date (2026-11-03). Research
was run by six parallel search agents, a verification pass of the five leading findings per
angle (nine openable at source, four corrected, twenty-one unopenable because of the session's
network policy, none contradicted), a completeness critic and a synthesis. Repository facts come
from the platform repository, the marketing-site repository and this repository.
