/** Books, the architect Q&A, technology radar, speaking and channels. */
export const books = [
  {
    title: 'Artificial Intelligence Design and Solution for Risk and Security',
    description:
      'Targets readers to understand, learn, define problems, and architect AI projects — from current business architectures to futuristic AI-driven solutions.',
    tags: ['AI', 'Risk', 'Security', 'Architecture'],
    publisher: 'Business Expert Press',
    publisherUrl: 'https://www.businessexpertpress.com/books/artificial-intelligence-design-and-solution-for-risk-and-security/',
    cover: '/images/books/ai-design-risk-security.jpg',
    isbn: '978-1-951527-48-8',
    year: 2020,
    published: 'March 2020',
    pages: 124,
    coAuthors: ['Archie Addo', 'Muthu Shanmugam'],
  },
  {
    title: 'Artificial Intelligence for Security',
    description:
      'Explores security terminologies and how AI automates security processes — with practical examples, real-time use cases, and algorithm recommendations.',
    tags: ['AI', 'Security', 'Deep Learning'],
    publisher: 'Business Expert Press',
    publisherUrl: 'https://www.businessexpertpress.com/books/artificial-intelligence-for-security/',
    cover: '/images/books/ai-security.png',
    isbn: '978-1-951527-26-6',
    year: 2020,
    published: 'March 2020',
    pages: 154,
    coAuthors: ['Archie Addo', 'Muthu Shanmugam'],
  },
  {
    title: 'Artificial Intelligence for Risk Management',
    description:
      'How managers can apply AI to risk management — developing knowledge bases for AI projects and driving business action on risk.',
    tags: ['AI', 'Risk', 'Finance'],
    publisher: 'Business Expert Press',
    publisherUrl: 'https://www.businessexpertpress.com/books/artificial-intelligence-for-risk-management/',
    cover: '/images/books/ai-risk-management.png',
    isbn: '978-1-949443-51-6',
    year: 2020,
    published: 'March 2020',
    pages: 164,
    coAuthors: ['Archie Addo', 'Muthu Shanmugam'],
  },
  {
    title: 'OneStop Project Management',
    description:
      'A new approach to learning project management — developing skills and competencies for professionals, novices, and organizations.',
    tags: ['Project Management', 'Leadership'],
    publisher: 'AuthorHouse',
    publisherUrl: 'https://www.amazon.com/OneStop-Project-Management-Archie-Addo/dp/1452062846',
    cover: '/images/books/onestop-project-management.jpg',
    coverHeight: 534,
    isbn: '978-1-452062-84-6',
    year: 2010,
    published: '2010',
    pages: 732,
    coAuthors: ['Archie Addo', 'Ken Agar', 'Muthu Shanmugam'],
  },
]

const FAQ_TOPICS = [
  'Data architecture', 'Cloud and cost', 'AI and agents', 'Data architecture', 'AI and agents', 'Career and strategy',
  'AI and agents', 'Data architecture', 'Career and strategy', 'Governance and quality', 'Data architecture', 'AI and agents',
  'Data architecture', 'Data architecture', 'Data architecture', 'Cloud and cost', 'Governance and quality', 'Cloud and cost',
  'AI and agents', 'Career and strategy', 'Career and strategy', 'Governance and quality', 'Governance and quality', 'AI and agents',
  'Governance and quality', 'Data architecture', 'Career and strategy', 'Governance and quality', 'Governance and quality', 'Data architecture',
]

export const faqItems = [
  {
    question: 'When should an enterprise choose Data Mesh vs. Data Fabric?',
    answer: 'Data Mesh is ideal when you have strong domain teams with data ownership culture and need decentralized autonomy. Data Fabric works better when you need centralized governance with automated metadata management. Most enterprises benefit from a hybrid: Data Mesh organizational principles with Data Fabric automation capabilities.',
  },
  {
    question: 'How do you approach cloud migration for a legacy data warehouse?',
    answer: 'I follow a phased approach: (1) Assessment & inventory of existing workloads, (2) Target architecture design (typically Lakehouse on Snowflake or Databricks), (3) Data pipeline migration with parallel validation, (4) BI layer migration, (5) Decommission legacy. The key is maintaining business continuity — dual-run both environments during transition.',
  },
  {
    question: 'What\'s the ROI timeline for MLOps implementation?',
    answer: 'Typically 6-12 months for initial ROI. The first 3 months focus on infrastructure (model registry, CI/CD pipelines, monitoring). Months 4-8 show efficiency gains — model deployment time drops from weeks to hours. By month 12, you see compounding returns: faster experimentation, reduced model drift incidents, and 3-5x more models in production.',
  },
  {
    question: 'Star Schema vs. Data Vault 2.0 — which should I use?',
    answer: 'Star Schema excels for BI/reporting with predictable query patterns. Data Vault 2.0 is superior for enterprise data warehouses needing full auditability, parallel loading, and agility. My recommendation: Data Vault 2.0 for the raw/integration layer, then Star Schema marts for consumption. This gives you the best of both worlds.',
  },
  {
    question: 'How do you evaluate AI/ML use cases for enterprise adoption?',
    answer: 'I use a 4-quadrant framework: (1) Business Value — revenue impact or cost reduction, (2) Data Readiness — is quality data available?, (3) Technical Feasibility — can current infrastructure support it?, (4) Organizational Readiness — do teams have skills and change management support? Only proceed when at least 3 of 4 quadrants score high.',
  },
  {
    question: 'What\'s the difference between a Data Architect and a Data Engineer?',
    answer: 'A Data Architect designs the blueprint — defining data models, integration patterns, governance policies, and technology selection. A Data Engineer builds the pipelines — implementing ETL/ELT processes, optimizing queries, and maintaining infrastructure. Think architect vs. builder: one draws the plans, the other constructs the building. In practice, senior professionals often span both roles.',
  },
  {
    question: 'How should enterprises approach Agentic AI adoption?',
    answer: 'Start with well-defined, low-risk workflows: document processing, data quality checks, or report generation. Use frameworks like CrewAI or n8n for orchestration. Key principles: (1) Human-in-the-loop for critical decisions, (2) Clear guardrails and permissions, (3) Audit trails for all agent actions, (4) Start with single-agent systems before multi-agent.',
  },
  {
    question: 'Snowflake vs. Databricks — how do you choose?',
    answer: 'Snowflake excels at SQL-based analytics, data sharing, and ease of use — ideal for BI-heavy workloads. Databricks leads in data science, ML/AI workloads, and streaming with Delta Lake. For enterprises needing both: use Databricks for data engineering and ML, Snowflake for analytics and data sharing. Many of my clients run both.',
  },
  {
    question: 'What certifications matter most for data architects in 2025?',
    answer: 'Top 5: (1) AWS Solutions Architect Professional — most respected cloud cert, (2) Snowflake SnowPro Advanced Architect, (3) Databricks Data Engineer Professional, (4) TOGAF 10 — used by 80% of Fortune 500, (5) Google Professional Cloud Architect. Combine platform-specific with methodology certs for the strongest profile.',
  },
  {
    question: 'How do you ensure data quality at enterprise scale?',
    answer: 'Three-layer approach: (1) Prevention — data contracts at source, schema validation, SLAs with producers, (2) Detection — automated quality checks in pipelines (completeness, freshness, accuracy, consistency), (3) Resolution — alert routing, impact analysis, and automated remediation. Tools like Monte Carlo or custom frameworks built on Great Expectations work well.',
  },
  {
    question: 'What is a Lakehouse architecture and why does it matter?',
    answer: 'A Lakehouse combines the best of data lakes (cheap storage, schema flexibility, raw data) with data warehouses (ACID transactions, SQL performance, governance). Platforms like Databricks Delta Lake and Snowflake make this practical. It eliminates the two-system problem — no more ETL between your lake and warehouse. One platform for BI, data science, and streaming.',
  },
  {
    question: 'How should enterprises approach LLM adoption?',
    answer: 'Start with retrieval-augmented generation (RAG) rather than fine-tuning. Build a vector database of your enterprise knowledge, use an LLM as the reasoning layer. Key decisions: (1) Build vs. buy — OpenAI/Claude APIs vs. self-hosted open-source, (2) Data privacy — what goes to external APIs vs. stays on-prem, (3) Governance — prompt guardrails, output validation, audit trails.',
  },
  {
    question: 'What is the difference between ETL and ELT, and which should I use?',
    answer: 'ETL (Extract-Transform-Load) transforms data before loading into the warehouse — traditional approach. ELT (Extract-Load-Transform) loads raw data first, then transforms in the warehouse using its compute power. Use ELT for modern cloud warehouses (Snowflake, BigQuery, Databricks) where compute is elastic. ETL still works for edge cases with strict compliance or data minimization requirements.',
  },
  {
    question: 'How do you handle real-time vs. batch processing decisions?',
    answer: 'Ask: "What is the business cost of latency?" If stale data by 1 hour costs nothing — batch (Airflow, dbt). If seconds matter — streaming (Kafka + Spark/Flink). Most enterprises need both: a Lambda or Kappa architecture. My recommendation: start batch-first, add streaming only for use cases with proven latency requirements. Premature real-time adds enormous complexity.',
  },
  {
    question: 'What is Data Vault 2.0 and when should I use it?',
    answer: 'Data Vault 2.0 is a modeling methodology for enterprise data warehouses — designed for agility, auditability, and parallel loading. It uses three entity types: Hubs (business keys), Links (relationships), and Satellites (descriptive data). Use it when you need: full audit history, multiple source integration, parallel team development, or regulatory compliance. Avoid it for simple BI-only warehouses where Star Schema suffices.',
  },
  {
    question: 'How do you evaluate cloud costs and prevent budget overruns?',
    answer: 'Four strategies: (1) Right-size from day one — use auto-scaling, spot instances, and serverless where possible, (2) Tagging discipline — tag every resource by team, project, environment, (3) FinOps practice — monthly cost reviews with engineering teams, not just finance, (4) Architecture choices — choose serverless (BigQuery, Athena) over always-on clusters for intermittent workloads. A well-architected system is inherently cost-efficient.',
  },
  {
    question: 'What is the role of data governance in modern architectures?',
    answer: 'Governance is not a bureaucratic layer — it is the immune system of your data platform. Modern governance includes: (1) Data cataloging (know what data exists), (2) Lineage (know where it came from and where it goes), (3) Access control (row/column level security), (4) Quality monitoring (automated SLAs), (5) Privacy compliance (GDPR, CCPA masking and consent). Tools like Atlan, Collibra, or Unity Catalog make this practical.',
  },
  {
    question: 'How do you design for multi-cloud without over-engineering?',
    answer: 'True multi-cloud is expensive and rarely necessary. What most enterprises need is cloud-portable architecture: (1) Use Snowflake or Databricks as a cross-cloud data layer, (2) Containerize workloads (Docker/K8s) for compute portability, (3) Abstract storage behind APIs, (4) Avoid deep coupling to one cloud\'s proprietary services. Design for one primary cloud with exit capability — not simultaneous multi-cloud deployment.',
  },
  {
    question: 'What is MCP (Model Context Protocol) and why should architects care?',
    answer: 'MCP is an open protocol that standardizes how AI models connect to external tools, data sources, and APIs. Think of it as USB-C for AI — one standard interface instead of custom integrations for every tool. For architects, MCP matters because it enables agentic AI systems where LLMs can query databases, call APIs, read documents, and take actions through a governed, auditable protocol. Early adoption gives enterprises a head start on agentic AI infrastructure.',
  },
  {
    question: 'How do you build a business case for data platform modernization?',
    answer: 'Quantify three categories: (1) Cost reduction — legacy license savings, reduced maintenance, fewer ETL failures, (2) Revenue enablement — faster time to insight, new analytics capabilities, ML-driven personalization, (3) Risk reduction — compliance gaps, data quality incidents, key-person dependencies. Frame it as: "We spend $X maintaining legacy. For $Y investment, we unlock Z capabilities and save $W annually." Always tie to business KPIs the CFO cares about.',
  },
  {
    question: 'What skills should a data architect develop in 2025-2026?',
    answer: 'Core: SQL (always), Python, cloud platforms (at least 2 of AWS/GCP/Azure), data modeling (Star Schema + Data Vault). Growing: MLOps, LLM/RAG architecture, streaming (Kafka), IaC (Terraform). Emerging: Agentic AI (CrewAI, MCP), data contracts, active metadata. Soft skills: stakeholder communication, cost optimization, and the ability to translate business problems into technical architectures — this is the highest-value skill.',
  },
  {
    question: 'What is a data contract and why is it important?',
    answer: 'A data contract is a formal agreement between a data producer and consumer that defines schema, quality rules, SLAs, and ownership. Think of it as an API contract for data. Without contracts, downstream systems break silently when producers change schemas. With contracts: producers own quality at the source, consumers get guarantees, and the data platform team stops being the bottleneck for every integration issue.',
  },
  {
    question: 'How do you handle data security and compliance (GDPR, CCPA)?',
    answer: 'Architecture-level: (1) Data classification — tag every field as PII, sensitive, or public, (2) Column-level security — restrict access based on role, not just table, (3) Encryption — at rest and in transit, plus field-level encryption (FPE) for sensitive columns, (4) Consent management — track user consent and propagate through pipelines, (5) Right to deletion — design pipelines that can purge specific user data across all stores. Compliance is an architecture concern, not an afterthought.',
  },
  {
    question: 'What is RAG (Retrieval-Augmented Generation) and how do you implement it?',
    answer: 'RAG combines LLMs with your enterprise knowledge base. Architecture: (1) Chunk documents into embeddings, (2) Store in a vector database (Pinecone, Milvus, Weaviate), (3) On query, retrieve relevant chunks via similarity search, (4) Pass context + query to the LLM for a grounded answer. Key decisions: chunk size (512-1024 tokens), embedding model, re-ranking strategy, and guardrails to prevent hallucinations. RAG is the safest way to use LLMs with proprietary data.',
  },
  {
    question: 'How do you approach master data management (MDM) in modern architectures?',
    answer: 'MDM ensures a single authoritative source for critical business entities: customers, products, locations, accounts. Modern approach: (1) Define golden records with survivorship rules, (2) Use a dedicated MDM platform (Reltio, Informatica MDM, TIBCO-EBX) or build a lightweight entity resolution service, (3) Publish master data as data products via APIs, (4) Federate — let domains own their reference data but conform to enterprise standards. MDM is the foundation that makes all analytics trustworthy.',
  },
  {
    question: 'What is the difference between a data lake and a data warehouse?',
    answer: 'Data Lake: stores raw, unstructured, and semi-structured data cheaply (S3, GCS, ADLS). Schema-on-read. Great for data science and exploration. Risk: becomes a "data swamp" without governance. Data Warehouse: stores structured, curated data with schema-on-write (Snowflake, BigQuery, Redshift). Optimized for SQL analytics and BI. Higher cost per TB. Modern answer: Lakehouse — combines both. Store raw data cheaply, apply structure for analytics, same platform.',
  },
  {
    question: 'How do you measure the ROI of a data platform?',
    answer: 'Four metrics: (1) Time-to-insight — how fast can analysts get answers? Reduce from weeks to hours, (2) Pipeline reliability — SLA adherence, incident reduction, MTTR, (3) Cost per query — total platform cost divided by business queries served, (4) Business impact — tie data products to revenue decisions. Track before/after: "Before platform: quarterly manual reports. After: daily automated dashboards driving $XM in pricing decisions." CFOs respond to business outcomes, not technical metrics.',
  },
  {
    question: 'How do you handle schema evolution without breaking downstream consumers?',
    answer: 'Three strategies: (1) Additive-only changes — add new columns, never rename or delete in place. Use deprecation windows, (2) Schema registry — enforce compatibility checks before deployment (Confluent Schema Registry for Kafka, or Delta Lake schema enforcement), (3) Data contracts — producers declare their schema and consumers subscribe. Breaking changes require versioned endpoints and migration windows. The key principle: producers must not surprise consumers.',
  },
  {
    question: 'What is observability for data pipelines and why does it matter?',
    answer: 'Data observability is monitoring the health of your data — not just pipelines, but the data itself. Five pillars: (1) Freshness — is data arriving on time?, (2) Volume — are row counts within expected ranges?, (3) Schema — did the structure change unexpectedly?, (4) Distribution — are values within normal statistical ranges?, (5) Lineage — if something breaks, what downstream is affected? Tools like Monte Carlo, Soda, or Great Expectations automate this. Without observability, you find data issues from angry stakeholders, not alerts.',
  },
  {
    question: 'How do you transition from a monolithic data team to a data mesh organization?',
    answer: 'Incrementally, not as a big bang. Phase 1: Identify 2-3 domains with strong data ownership (e.g., marketing, finance, supply chain). Phase 2: Define data product contracts — what each domain publishes, schemas, SLAs, quality guarantees. Phase 3: Build a self-serve data platform — infrastructure that domain teams can use without filing tickets. Phase 4: Establish federated governance — shared standards (naming, security, quality) with decentralized execution. The biggest challenge is organizational, not technical: convincing domain teams to own their data products.',
  },
].map((item, i) => ({ ...item, topic: FAQ_TOPICS[i] }))

export const techRadar = [
  {
    ring: 'Adopt',
    description: 'Technologies we strongly recommend for enterprise use',
    items: [
      { name: 'Agentic AI (CrewAI, n8n)', note: 'Production-ready for workflow automation' },
      { name: 'MCP (Model Context Protocol)', note: 'Standard for AI-tool integration' },
      { name: 'Snowflake', note: 'Mature multi-cloud data platform' },
      { name: 'Databricks / Delta Lake', note: 'Unified analytics & ML platform' },
      { name: 'dbt', note: 'Analytics engineering standard' },
      { name: 'Apache Airflow', note: 'Workflow orchestration standard' },
    ],
  },
  {
    ring: 'Trial',
    description: 'Technologies worth pursuing in pilot projects',
    items: [
      { name: 'Data Mesh Architecture', note: 'Decentralized domain-owned data' },
      { name: 'Small Language Models (SLMs)', note: 'Cost-effective for specific tasks' },
      { name: 'LakeFS', note: 'Git-like version control for data lakes' },
      { name: 'Data Contracts', note: 'Schema agreements between producers & consumers' },
      { name: 'Vector Databases (Pinecone, Milvus)', note: 'Essential for RAG pipelines' },
    ],
  },
  {
    ring: 'Assess',
    description: 'Technologies to explore and research',
    items: [
      { name: 'Graph + LLM Integration', note: 'Knowledge graphs enhancing LLM reasoning' },
      { name: 'Active Metadata (Atlan)', note: 'AI-powered data cataloging' },
      { name: 'Real-time Feature Stores', note: 'Feast, Tecton for ML features' },
      { name: 'Data Fabric', note: 'Automated metadata-driven integration' },
    ],
  },
  {
    ring: 'Hold',
    description: 'Technologies to avoid for new projects',
    items: [
      { name: 'On-Prem Hadoop Clusters', note: 'Migrate to cloud-native alternatives' },
      { name: 'Legacy ETL (Informatica PowerCenter)', note: 'Replace with cloud-native ELT' },
      { name: 'Monolithic Data Warehouses', note: 'Adopt Lakehouse architecture' },
      { name: 'Custom ML Infrastructure', note: 'Use managed MLOps platforms' },
    ],
  },
]

export const speakingTopics = [
  {
    title: 'The Enterprise Intelligence Architect: A New Role for the AI Era',
    description: 'How the convergence of data, AI, and cloud is creating a new architect role — and why enterprises need it.',
  },
  {
    title: 'From Data Vault 2.0 to Lakehouse: The Migration Playbook',
    description: 'Practical patterns and lessons from migrating traditional data warehouses to modern Lakehouse architecture.',
  },
  {
    title: '25 Years of Enterprise Data: What Changed, What Didn\'t',
    description: 'A retrospective on data architecture evolution — from Oracle DWs to cloud-native AI platforms.',
  },
  {
    title: 'Agentic AI in the Enterprise: Architecture Patterns & Guardrails',
    description: 'How to design enterprise-grade agentic AI systems with CrewAI, MCP, and proper governance.',
  },
  {
    title: 'Cloud Architecture Decision Matrix: AWS vs Azure vs GCP',
    description: 'A framework for choosing the right cloud platform based on workload type, team skills, and enterprise requirements.',
  },
]

export const speakerKit = {
  bio: 'Srini Centhala is a 25+ year veteran enterprise architect who has designed data systems for AT&T, Walmart, Experian, UPS, and eBay. Founder of Absolut-e Data Com and BizStats AI, he is the author of 4 books on AI and architecture. Srini specializes in translating business strategy into scalable data ecosystems.',
  bioShort: 'Enterprise architect with 25+ years at Fortune 100 companies. Author of 4 AI books. Creator of the Enterprise Intelligence Architecture methodology.',
  topics: [
    'The Enterprise Intelligence Architect: A New Role for the AI Era',
    'From Data Vault 2.0 to Lakehouse: The Migration Playbook',
    '25 Years of Enterprise Data: What Changed, What Didn\'t',
    'Agentic AI in the Enterprise: Architecture Patterns & Guardrails',
    'Cloud Architecture Decision Matrix: AWS vs Azure vs GCP',
  ],
  formats: ['Keynote (30-60 min)', 'Workshop (Half-day / Full-day)', 'Panel Discussion', 'Fireside Chat'],
  audiences: ['CTOs & CDOs', 'Data Engineering Teams', 'Enterprise Architects', 'AI/ML Practitioners'],
  pastClients: ['AT&T', 'Walmart', 'Experian', 'eBay', 'DirecTV', 'UPS', 'VMware', 'Macy\'s'],
}

export const thoughtLeadership = [
  {
    platform: 'LinkedIn',
    label: 'Follow on LinkedIn',
    url: 'https://linkedin.com/in/srinicenthala',
    description: '22K+ followers — enterprise architecture insights, AI trends, and career lessons.',
    active: true,
  },
  {
    platform: 'Substack',
    label: 'Newsletter (Coming Soon)',
    url: '#',
    description: 'Architecture Insights with Srini — bi-weekly deep dives on enterprise data & AI patterns.',
    active: false,
  },
  {
    platform: 'YouTube',
    label: 'YouTube (Coming Soon)',
    url: '#',
    description: 'Architecture walkthroughs, cloud comparisons, and Data Vault to Lakehouse migration tutorials.',
    active: false,
  },
  {
    platform: 'Medium',
    label: 'Medium (Coming Soon)',
    url: '#',
    description: 'Long-form articles on AI strategy, data architecture, and enterprise transformation.',
    active: false,
  },
  {
    platform: 'Podcast',
    label: 'Podcast (Coming Soon)',
    url: '#',
    description: 'Data Architecture Decoded — conversations with enterprise data leaders.',
    active: false,
  },
]
