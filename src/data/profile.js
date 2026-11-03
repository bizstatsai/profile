/**
 * Centralized profile data - Single source of truth.
 * Sourced from LinkedIn + Resume (2024-2025).
 */

export const profile = {
  name: 'Srini Centhala',
  title: 'Chief Data and AI Architect',
  company: 'Absolut-e Data Com, Inc.',
  companyUrl: 'https://www.absolut-e.com',
  product: 'BizStats AI',
  productUrl: 'https://www.bizstats.ai',
  role: 'Founder & Chief Data and AI Architect',
  location: 'San Jose, California',
  phone: '678-570-6353',
  email: 'srini@absolut-e.com',
  linkedin: 'https://linkedin.com/in/srinicenthala',
  bio: 'For over two decades, I have operated as the strategic architect behind the data infrastructure of the world\'s most complex and demanding companies — including AT&T, Walmart, Experian, UPS, and eBay. I design the central nervous system for enterprise intelligence, translating abstract business goals into high-performance data ecosystems that fuel billion-dollar decisions.',
  roles: [
    'Data Architect',
    'AI Architect',
    'Cloud Architect',
    'Data Scientist',
    'BI Architect',
    'Data Engineer',
    'Data Warehouse Architect',
    'AI Solution Designer',
    'System Architect',
  ],
  stats: {
    yearsExperience: '25+',
    publishedBooks: 4,
    linkedinFollowers: '22K+',
    fortune100Clients: '10+',
  },
}

export const experiences = [
  {
    role: 'Founder & Chief Data and AI Architect',
    company: 'Absolut-e Data Com / BizStats AI',
    location: 'San Jose, CA',
    period: 'Aug 2007 – Present',
    description:
      'Designs & oversees BizStats AI Data Analytics platform — a web-based SaaS decision support system integrating structured and unstructured data from social media, public data, and competitors using Big Data and statistical modeling. Provides expert consulting to Fortune 100 companies.',
    highlights: [
      'Architected Big Data and KPI API solutions for real-time business event notifications',
      'Defined ML/AI business cases, cloud infrastructure, and ML model selection & training',
      'Built cloud data lakes and warehouses on AWS (Glue, EMR, Athena, Redshift, Kinesis)',
      'Designed metadata-driven EDW adaptable across industries using Star Schema, Snowflake Schema, and Data Vault 2.0',
    ],
    tags: ['AI/ML', 'AWS', 'GCP', 'Big Data', 'SaaS', 'Data Lake'],
  },
  {
    role: 'Sr. Data Architect / Cloud Architect',
    company: 'DirecTV',
    location: 'San Jose, CA',
    period: 'Oct 2024 – Jul 2025',
    description:
      'Designed dimensional modeling modules for Finance Analytics on Snowflake and Databricks platforms with automated data validation frameworks.',
    highlights: [
      'Dimensional Modeling for Finance and Finance Analytics',
      'Snowflake implementation for multi-cloud strategy',
      'Databricks framework implementation',
      'Automated Data Validation framework',
    ],
    tags: ['Snowflake', 'Databricks', 'Finance', 'Data Modeling'],
  },
  {
    role: 'Sr. Data Architect / Cloud Architect',
    company: 'Walmart',
    location: 'San Jose, CA',
    period: 'Oct 2021 – Jul 2024',
    description:
      'Intelligence Business Growth (IBG) — designed micro-service architecture for Demand Forecast, Alert Services, Portfolio Management, and Unified Finance on GCP and Azure.',
    highlights: [
      'Micro-service architecture for Demand Forecast & Unified Finance',
      'Data architecture on GCP + Azure (Data Factory, Azure SQL, Informatica, Matillion)',
      'Automated data validation with Ensure framework and Power BI',
      'Master Data & Hierarchy mappings from TIBCO-EBX',
      'Snowflake multi-cloud strategy implementation',
    ],
    tags: ['GCP', 'Azure', 'Snowflake', 'Power BI', 'Micro-services'],
  },
  {
    role: 'Data Architect',
    company: 'Aktana',
    location: 'San Francisco, CA',
    period: 'Jul 2020 – Jan 2021',
    description:
      'Designed Data Lake and Data Model on Snowflake and AWS RDS for Life Science clients — IQVIA Sales Detection, Veeva sources, and Aktana\'s Decision Support / Suggestion AI Engine.',
    highlights: [
      'Metadata-driven architecture for core and custom deployments',
      'Snowflake + AWS RDS data modeling for Life Science use cases',
    ],
    tags: ['Snowflake', 'AWS', 'Life Science', 'AI Engine'],
  },
  {
    role: 'Data Architect',
    company: 'Macy\'s',
    location: 'San Francisco, CA',
    period: 'Jun 2019 – Oct 2019',
    description:
      'Oversaw migration from on-prem Teradata to Google Cloud Platform using BigQuery, Composer, GCP Storage, and Stack Driver dashboards.',
    tags: ['GCP', 'BigQuery', 'Teradata', 'Cloud Migration'],
  },
  {
    role: 'BI Solution Designer / Data Architect',
    company: 'AT&T / DirecTV',
    location: 'Los Angeles, CA',
    period: 'Sep 2014 – Apr 2019',
    description:
      'CDO Solution design for enterprise payment system, supply chain, content & viewership analytics (2PB log data), DirecTV-Now, NFL-OTT, and XandR.com ad platform products. Migrated on-premises Data Lake to AWS cloud.',
    highlights: [
      'Proof of value of BizStats AI Analytics platform at AT&T-DirecTV',
      'Content Analytics & Viewership Analytics — 2 PB of log data',
      'Encryption (FPE & EFPE) for Secure Private Information on Data Lake & Teradata',
      'Supported CDO data science group and XandR addressable ads platform',
      'Migrated on-prem Data Lake & RDBMS to AWS cloud',
    ],
    tags: ['AWS', 'Teradata', 'Vertica', 'Ad Tech', 'Data Lake', '2PB'],
  },
  {
    role: 'Data Architect',
    company: 'VMware',
    location: 'Palo Alto, CA',
    period: 'Mar 2014 – Aug 2014',
    description:
      'Proof of concept for BizStats AI as Data Discovery Platform. Architected Project Tahoe data access layer with recommendation engine for cross-selling and up-selling.',
    tags: ['Data Discovery', 'Data Science', 'Recommendations'],
  },
  {
    role: 'BI Solution Designer / DW Architect',
    company: 'DirecTV',
    location: 'Los Angeles, CA',
    period: 'Sep 2012 – Mar 2014',
    description:
      'Designed EDW for Supply Chain Management (SAP-ECC, SAP-APO, SAP-BW, TM1) and Active Decision Engine for Customer Care — enabling agents to deliver prioritized, real-time offers to customers.',
    highlights: [
      'Supply Chain EDW — demand planning, procurement, reverse logistics',
      'Active Decision Engine — real-time pricing offers matched 97% accuracy',
      'Master Data Management for Hardware Products, Regions, Dealers',
    ],
    tags: ['SAP', 'Teradata', 'Informatica', 'SCM', 'MDM'],
  },
  {
    role: 'BI / ETL / Data Architect',
    company: 'Experian',
    location: 'Costa Mesa, CA',
    period: 'Dec 2009 – Aug 2012',
    description:
      'Designed and developed NextGen Credit Bureau Product — metadata-driven architecture for "develop once, deploy many" worldwide. Evaluated by Forrester and received feedback of "Excellent Architecture & Design".',
    highlights: [
      'NextGen Credit Bureau Product — worldwide deployment architecture',
      'Metadata-driven code generation for data loads, credit reporting, rules engine',
      'Forrester evaluation: "Excellent Architecture & Design"',
      'Uninterrupted credit reporting while loading at 1000 TPS',
    ],
    tags: ['Big Data', 'Hadoop', 'MongoDB', 'Pentaho', 'Credit Bureau'],
  },
  {
    role: 'Sr. Architect',
    company: 'IMS Health (IQVIA)',
    location: 'Plymouth Meeting, PA',
    period: 'Nov 2007 – Aug 2008',
    description:
      'Built data warehouse to replicate the 40-year-old Primary Factory DDD (Drug Distribution Data) system — designed for evolve & modify deployment across different countries.',
    tags: ['Netezza', 'Ab Initio', 'MicroStrategy', 'Pharma'],
  },
  {
    role: 'BI Architect / Data Architect',
    company: 'Lafarge North America',
    location: 'Herndon, VA',
    period: 'Mar 2005 – Oct 2007',
    description:
      'Largest ERP implementation of JD Edwards Enterprise One. Designed data warehouse for Gypsum Division — Sales & Marketing, Manufacturing, and Finance datamarts with KPI dashboards.',
    tags: ['JD Edwards', 'Cognos', 'MicroStrategy', 'Oracle'],
  },
  {
    role: 'BI Architect / Data Architect',
    company: 'eBay',
    location: 'San Jose, CA',
    period: 'Aug 2004 – Feb 2005',
    description:
      'Designed data warehouse for the 100TB eBay e-commerce platform — ad tracker analytics (Mediaplex, DoubleClick), email campaigns, Simplify Stores subject area, GMV & revenue analysis.',
    tags: ['Teradata', 'MicroStrategy', '100TB', 'Ad Analytics'],
  },
  {
    role: 'Sr. System Architect',
    company: 'UPS (United Parcel Services)',
    location: 'Atlanta, GA',
    period: 'Feb 1998 – Jan 2001',
    description:
      'Re-engineered Revenue Management, Marketing Management, Contract Management, and Pricing Engine (now Oracle R12 Advanced Pricing) for UPS international markets. Built automated SLD data migration from mainframe.',
    tags: ['Oracle', 'Pricing Engine', 'MQ Series', 'Revenue Mgmt'],
  },
]

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
    isbn: '978-1-452062-84-6',
    coAuthors: ['Archie Addo', 'Ken Agar'],
  },
]

export const skillGroups = [
  {
    category: 'Cloud Platforms',
    skills: [
      'Google Cloud (BigQuery, Dataflow, Dataproc, Pub/Sub, Cloud SQL, Spanner)',
      'AWS (Redshift, Glue, Kinesis, Athena, EMR, S3, EC2, SageMaker)',
      'Azure (Data Factory, Cosmos DB, SQL Data Warehouse, Databricks)',
      'Snowflake',
      'Databricks',
      'Oracle Cloud',
      'SAP Cloud Platform',
    ],
  },
  {
    category: 'AI / Machine Learning',
    skills: [
      'MLOps & AI Platform Design',
      'Large Language Models (LLMs)',
      'Deep Learning & Neural Networks',
      'TensorFlow, PyTorch, Scikit-Learn',
      'NLP & Chatbots',
      'OpenAI APIs, Google AI Studio',
      'MCP (Model Context Protocol)',
      'CrewAI, n8n Workflows',
    ],
  },
  {
    category: 'Big Data & Databases',
    skills: [
      'Hadoop, HDFS, MapReduce, Spark, Kafka',
      'Snowflake, Databricks, BigQuery',
      'MongoDB, Cassandra, Redis, Neo4j',
      'Oracle, Teradata, DB2, SQL Server, Netezza',
      'VectorDB, Pinecone, Milvus',
      'HBase, Hive, Vertica, MemSQL',
    ],
  },
  {
    category: 'Data Architecture & BI',
    skills: [
      'Star Schema, Snowflake Schema, Data Vault 2.0',
      'ETL/ELT (Informatica, DataStage, Ab Initio, Matillion)',
      'MicroStrategy, Power BI, Tableau, Looker',
      'Cognos, SAP Business Objects, QlikView',
      'Data Modeling (ERwin, Power Designer)',
      'Master Data Management (MDM)',
    ],
  },
  {
    category: 'Languages & Tools',
    skills: [
      'Python, SQL, PL/SQL, Spark SQL',
      'Java, C, C++, Scala, R',
      'Docker, Kubernetes',
      'UNIX Shell, XML, UML',
      'Apache Airflow, NiFi, CDAP',
      'APIGEE, Web Methods, MQ Series',
    ],
  },
  {
    category: 'Industries',
    skills: [
      'Retail (Walmart, Macy\'s, eBay)',
      'Telecom & Media (AT&T, DirecTV)',
      'Finance & Banking (Experian)',
      'Transportation & Logistics (UPS)',
      'Life Science & Pharma (IQVIA, Aktana)',
      'Government, Ad Tech, Manufacturing',
    ],
  },
]

export const certifications = [
  {
    name: 'Databricks Fundamentals',
    issuer: 'Databricks',
    url: 'https://credentials.databricks.com/6b068bec-8964-41ce-b05e-d00049e9cbde#acc.fkKyOIAV',
  },
  {
    name: 'Databricks Lakehouse Fundamentals',
    issuer: 'Databricks',
    url: 'https://credentials.databricks.com/59afe467-45ed-462d-8dbd-cb97e070c123#acc.3WCp41RD',
  },
  {
    name: 'Databricks Generative AI Fundamentals',
    issuer: 'Databricks',
    url: 'https://credentials.databricks.com/0872c333-7e49-4ee8-96bc-f7257a61fc72#acc.QC1Y8sHA',
  },
  {
    name: 'Neural Networks and Deep Learning',
    issuer: 'Coursera (deeplearning.ai)',
    url: 'https://www.coursera.org/account/accomplishments/certificate/88V2QCKPKKR1',
  },
  {
    name: 'Machine Learning (Stanford University)',
    issuer: 'Coursera',
    url: 'https://www.coursera.org/account/accomplishments/certificate/VJLUBDUQ8WUN',
  },
  {
    name: 'AWS Machine Learning',
    issuer: 'Coursera',
    url: 'https://www.coursera.org/account/accomplishments/certificate/TWPER89FFQ2B',
  },
  {
    name: 'Architecting with Google Cloud Platform (Specialization)',
    issuer: 'Coursera / Google',
    url: 'https://www.coursera.org/account/accomplishments/specialization/certificate/MABZ97YKHSQE',
  },
  {
    name: 'GCP Professional Data Engineer Prep',
    issuer: 'Coursera / Google',
    url: 'https://www.coursera.org/account/accomplishments/certificate/DA5ACAKA4W5P',
  },
  {
    name: 'MongoDB Basics',
    issuer: 'MongoDB University',
    url: 'http://university.mongodb.com/course_completion/9272af1b-f79a-4656-a01e-88252db1f67e',
  },
  {
    name: 'MongoDB Aggregation Framework',
    issuer: 'MongoDB University',
    url: 'http://university.mongodb.com/course_completion/04623b8c-8135-4ee7-9e58-ff9dda3359ed',
  },
  {
    name: 'MongoDB for Python Developers',
    issuer: 'MongoDB University',
    url: 'http://university.mongodb.com/course_completion/b7d12a8d-a98d-4935-98ba-3dce663c1ed8',
  },
]

export const services = [
  'Data Architecture & Strategy',
  'AI/ML Platform Design & MLOps',
  'Cloud Migration (AWS, GCP, Azure)',
  'Data Warehouse & Data Lake Design',
  'Business Intelligence & Analytics',
  'Enterprise Data Governance',
  'SaaS Product Development',
  'Big Data Engineering',
]

export const education = {
  degree: 'Bachelor of Engineering (Electronics)',
  university: 'Bangalore University',
}

export const clients = [
  'AT&T', 'Walmart', 'Experian', 'UPS', 'eBay',
  'DirecTV', 'Macy\'s', 'Aktana', 'VMware',
  'IMS Health (IQVIA)', 'Lafarge', 'Temple Inland',
  'State of Georgia', 'State of Florida',
]

export const caseStudies = [
  {
    client: 'Walmart',
    title: 'Demand Forecast & Unified Finance Platform',
    challenge: 'Walmart needed a micro-service architecture for demand forecasting, alert services, and unified finance across GCP and Azure, handling massive retail data volumes.',
    solution: 'Designed micro-service architecture on GCP + Azure with Snowflake multi-cloud strategy, automated data validation (Ensure framework), and Master Data hierarchy mappings from TIBCO-EBX.',
    impact: ['Multi-cloud data architecture serving 4,700+ stores', 'Real-time demand forecast powering inventory decisions', 'Unified Finance platform across business units', 'Automated data validation reducing manual QA by 80%'],
    tags: ['GCP', 'Azure', 'Snowflake', 'Micro-services', 'Power BI'],
    period: '2021-2024',
    architecture: ['TIBCO-EBX (MDM)', 'GCP + Azure Ingest', 'Snowflake (Multi-Cloud DW)', 'Ensure Framework (Validation)', 'Micro-services (Demand/Finance)', 'Power BI Dashboards'],
  },
  {
    client: 'AT&T / DirecTV',
    title: '2PB Content & Viewership Analytics Platform',
    challenge: 'AT&T/DirecTV needed to process 2 petabytes of log data for content analytics, viewership insights, and the XandR ad platform while migrating from on-prem to AWS cloud.',
    solution: 'Designed CDO solution for enterprise payment system, supply chain, content & viewership analytics. Implemented FPE & EFPE encryption for secure data handling. Migrated on-prem Data Lake to AWS.',
    impact: ['2PB of log data processed for content analytics', 'Encryption (FPE/EFPE) securing private information', 'On-prem to AWS cloud migration completed', 'XandR addressable ads platform supported'],
    tags: ['AWS', 'Teradata', 'Vertica', '2PB', 'Ad Tech'],
    period: '2014-2019',
    architecture: ['2PB Log Sources', 'AWS Data Lake (S3/EMR)', 'Teradata + Vertica DW', 'FPE/EFPE Encryption Layer', 'CDO Analytics Platform', 'XandR Ad Serving'],
  },
  {
    client: 'Experian',
    title: 'NextGen Credit Bureau — Forrester "Excellent Architecture"',
    challenge: 'Experian needed a next-generation credit bureau product that could be developed once and deployed worldwide, processing credit data at 1000 TPS without interruption.',
    solution: 'Designed metadata-driven architecture for "develop once, deploy many" worldwide. Built code generation for data loads, credit reporting, and rules engine. Achieved uninterrupted credit reporting at 1000 TPS.',
    impact: ['Forrester evaluation: "Excellent Architecture & Design"', 'Worldwide deployment with single codebase', '1000 TPS uninterrupted credit reporting', 'Metadata-driven code generation'],
    tags: ['Big Data', 'Hadoop', 'MongoDB', 'Credit Bureau'],
    period: '2009-2012',
    architecture: ['Credit Data Sources', 'Metadata-Driven Ingest', 'Hadoop + MongoDB Store', 'Code Generation Engine', 'Rules Engine (1000 TPS)', 'Credit Reports (Global)'],
  },
  {
    client: 'eBay',
    title: '100TB E-Commerce Data Warehouse',
    challenge: 'eBay required a data warehouse for their 100TB e-commerce platform covering ad tracker analytics, email campaigns, and GMV/revenue analysis.',
    solution: 'Designed data warehouse architecture on Teradata with MicroStrategy for the 100TB platform — integrating Mediaplex and DoubleClick ad analytics, email campaigns, and store analytics.',
    impact: ['100TB data warehouse for e-commerce analytics', 'Integrated ad tracking (Mediaplex, DoubleClick)', 'GMV & revenue analysis across platform', 'Unified store analytics subject area'],
    tags: ['Teradata', 'MicroStrategy', '100TB', 'Ad Analytics'],
    period: '2004-2005',
    architecture: ['Ad Trackers (Mediaplex/DoubleClick)', 'Email Campaign Data', 'Teradata 100TB DW', 'Star Schema Marts', 'MicroStrategy BI', 'GMV & Revenue Dashboards'],
  },
  {
    client: 'DirecTV',
    title: 'Supply Chain EDW — 97% Accuracy Decision Engine',
    challenge: 'DirecTV needed an EDW for supply chain management and a real-time decision engine for customer care agents to deliver prioritized offers.',
    solution: 'Designed EDW for SCM (SAP-ECC, SAP-APO, SAP-BW, TM1) covering demand planning, procurement, and reverse logistics. Built Active Decision Engine for real-time customer pricing.',
    impact: ['97% accuracy on real-time pricing offers', 'End-to-end supply chain visibility', 'Active Decision Engine for customer care', 'Master Data Management for products & regions'],
    tags: ['SAP', 'Teradata', 'Informatica', 'SCM', 'MDM'],
    period: '2012-2014',
    architecture: ['SAP ECC/APO/BW Sources', 'Informatica ETL', 'Teradata EDW', 'MDM (Products/Regions)', 'Active Decision Engine', 'Customer Care (97% Accuracy)'],
  },
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
    answer: 'RAG combines LLMs with your enterprise knowledge base. Architecture: (1) Chunk documents into embeddings, (2) Store in a vector database (Pinecone, Milvus, Weaviate), (3) On query, retrieve relevant chunks via similarity search, (4) Pass context + query to the LLM for a grounded answer. Key decisions: chunk size (512-1024 tokens), embedding model, re-ranking strategy, and guardrails to prevent hallucination. RAG is the safest way to use LLMs with proprietary data.',
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
]

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

export const servicesDetail = [
  {
    title: 'Architecture Assessment',
    description: 'Comprehensive review of your current data architecture, identifying bottlenecks, risks, and modernization opportunities.',
    deliverables: ['Current-state architecture documentation', 'Gap analysis & risk assessment', 'Target-state architecture blueprint', 'Migration roadmap with priorities'],
    icon: '🔍',
  },
  {
    title: 'AI/ML Strategy Sprint',
    description: '2-4 week engagement to define your AI/ML roadmap — from use case identification to platform selection and MLOps design.',
    deliverables: ['AI use case prioritization matrix', 'ML platform architecture', 'MLOps pipeline design', 'Build vs. buy recommendations'],
    icon: '🧠',
  },
  {
    title: 'Cloud Migration',
    description: 'End-to-end cloud migration strategy and execution for data warehouses, data lakes, and analytics platforms on AWS, GCP, or Azure.',
    deliverables: ['Cloud readiness assessment', 'Target architecture (Lakehouse/Data Mesh)', 'Migration runbook & timeline', 'Cost optimization model'],
    icon: '☁️',
  },
  {
    title: 'Enterprise Data Governance',
    description: 'Design and implement data governance frameworks — data quality, lineage, cataloging, and compliance (GDPR, CCPA, SOX).',
    deliverables: ['Data governance framework', 'Data quality scorecard', 'Lineage & cataloging setup', 'Compliance mapping'],
    icon: '🛡️',
  },
  {
    title: 'Executive AI Workshop',
    description: 'Half-day or full-day workshop for executive teams — demystifying AI, identifying high-value opportunities, and building an AI-first strategy.',
    deliverables: ['AI opportunity assessment', 'Executive AI playbook', 'Hands-on demo of enterprise AI patterns', 'Prioritized action plan'],
    icon: '🎓',
  },
  {
    title: 'Fractional Chief Data Architect',
    description: 'Part-time CDA engagement for organizations needing senior architecture leadership without a full-time hire.',
    deliverables: ['Architecture reviews & decisions', 'Team mentoring & upskilling', 'Vendor evaluation & selection', 'Standards & patterns library'],
    icon: '👔',
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

export const maturityPyramid = {
  title: 'Enterprise AI Maturity Pyramid',
  description: 'Where is your organization on the AI maturity journey? Most enterprises stall at levels 1-2. True competitive advantage starts at level 4.',
  levels: [
    { level: 5, name: 'Autonomous Intelligence', description: 'Agentic AI systems making decisions within guardrails. Self-optimizing pipelines, automated anomaly response, AI-driven strategy.', color: 'var(--success)', width: '40%' },
    { level: 4, name: 'Predictive & Prescriptive', description: 'ML models in production predicting outcomes. Recommendation engines, demand forecasting, risk scoring. MLOps pipelines deployed.', color: 'var(--accent-light)', width: '55%' },
    { level: 3, name: 'Advanced Analytics', description: 'Statistical analysis, segmentation, trend detection. Self-serve BI for business users. Data products emerging.', color: 'var(--gradient-start)', width: '70%' },
    { level: 2, name: 'Governed Data Platform', description: 'Centralized data warehouse/lakehouse. Data quality monitoring, lineage, cataloging. Single source of truth established.', color: 'var(--gradient-end)', width: '85%' },
    { level: 1, name: 'Data Foundation', description: 'Reliable data collection, storage, and basic ETL. Clean pipelines, consistent schemas, basic reporting. Most organizations are here.', color: '#f0a030', width: '100%' },
  ],
}

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

export const socialLinks = {
  linkedin: 'https://linkedin.com/in/srinicenthala',
  github: 'https://github.com/Scenthala',
  absoluteE: 'https://www.absolut-e.com',
  bizstats: 'https://www.bizstats.ai',
  books: 'https://www.businessexpertpress.com/srini-centhala/',
}

export const methodology = {
  name: 'Enterprise Intelligence Architecture',
  tagline: 'Translating business strategy into data-driven enterprise systems',
  description: 'Enterprise Intelligence Architecture (EIA) is a methodology for designing the central nervous system of modern enterprises — connecting business goals, data ecosystems, AI/ML capabilities, and cloud infrastructure into a unified, governed, and scalable architecture.',
  principles: [
    {
      title: 'Business-First Translation',
      description: 'Every architecture decision starts with a business outcome. Map C-suite objectives to data capabilities before selecting any technology.',
      icon: '1',
    },
    {
      title: 'Layered Intelligence Stack',
      description: 'Structure data flow across five layers: Ingest, Store, Process, Serve, and Act. Each layer has clear contracts, SLAs, and governance.',
      icon: '2',
    },
    {
      title: 'Metadata-Driven Design',
      description: 'Build once, deploy many. Use metadata to drive data loads, transformations, validation rules, and reporting — minimizing custom code.',
      icon: '3',
    },
    {
      title: 'Cloud-Agnostic Patterns',
      description: 'Design for portability. Use abstraction layers that work across AWS, GCP, and Azure so enterprises avoid vendor lock-in.',
      icon: '4',
    },
    {
      title: 'AI-Ready Foundation',
      description: 'Every data platform should be ML-ready from day one. Feature stores, model registries, and MLOps pipelines are not add-ons — they are core.',
      icon: '5',
    },
    {
      title: 'Governed Autonomy',
      description: 'Centralize standards and governance. Decentralize execution. Domain teams own their data products within enterprise guardrails.',
      icon: '6',
    },
  ],
  layers: [
    { name: 'Act', description: 'Agentic AI, Decision Engines, Real-time Actions', color: 'var(--success)' },
    { name: 'Serve', description: 'APIs, BI Dashboards, ML Model Serving, Data Products', color: 'var(--accent-light)' },
    { name: 'Process', description: 'ETL/ELT, Feature Engineering, ML Training, Data Quality', color: 'var(--gradient-start)' },
    { name: 'Store', description: 'Lakehouse, Data Vault 2.0, Vector DBs, Feature Stores', color: 'var(--gradient-end)' },
    { name: 'Ingest', description: 'Streaming (Kafka), Batch (Airflow), APIs, Data Contracts', color: '#f0a030' },
  ],
}

export const thoughtLeadership = [
  {
    platform: 'LinkedIn',
    label: 'Follow on LinkedIn',
    url: 'https://linkedin.com/in/srinicenthala',
    description: '22K+ followers — enterprise architecture insights, AI trends, and career lessons.',
    icon: 'in',
    active: true,
  },
  {
    platform: 'Substack',
    label: 'Newsletter (Coming Soon)',
    url: '#',
    description: 'Architecture Insights with Srini — bi-weekly deep dives on enterprise data & AI patterns.',
    icon: '✉',
    active: false,
  },
  {
    platform: 'YouTube',
    label: 'YouTube (Coming Soon)',
    url: '#',
    description: 'Architecture walkthroughs, cloud comparisons, and Data Vault to Lakehouse migration tutorials.',
    icon: '▶',
    active: false,
  },
  {
    platform: 'Medium',
    label: 'Medium (Coming Soon)',
    url: '#',
    description: 'Long-form articles on AI strategy, data architecture, and enterprise transformation.',
    icon: 'M',
    active: false,
  },
  {
    platform: 'Podcast',
    label: 'Podcast (Coming Soon)',
    url: '#',
    description: 'Data Architecture Decoded — conversations with enterprise data leaders.',
    icon: '🎙',
    active: false,
  },
]

export const architecturePatterns = [
  {
    title: 'Modern Lakehouse Architecture',
    description: 'Reference architecture for building a unified Lakehouse on Databricks or Snowflake — combining data lake flexibility with warehouse performance.',
    tags: ['Databricks', 'Delta Lake', 'Snowflake', 'dbt'],
    layers: ['Bronze (Raw)', 'Silver (Cleansed)', 'Gold (Business)'],
  },
  {
    title: 'MLOps Pipeline Pattern',
    description: 'End-to-end ML lifecycle from feature engineering to model serving — with CI/CD, model registry, drift monitoring, and A/B testing.',
    tags: ['MLflow', 'SageMaker', 'Vertex AI', 'Airflow'],
    layers: ['Feature Store', 'Training', 'Registry', 'Serving', 'Monitoring'],
  },
  {
    title: 'Data Mesh Implementation',
    description: 'Decentralized data ownership with domain-oriented data products, self-serve platform, federated governance, and data contracts.',
    tags: ['Data Products', 'Domain Teams', 'Data Contracts', 'Self-Serve'],
    layers: ['Domain Teams', 'Data Products', 'Platform', 'Governance'],
  },
  {
    title: 'Agentic AI + MCP Enterprise Pattern',
    description: 'Architecture for deploying agentic AI systems with Model Context Protocol — tool orchestration, guardrails, audit trails, and human-in-the-loop.',
    tags: ['CrewAI', 'MCP', 'n8n', 'LangChain'],
    layers: ['Orchestrator', 'Agents', 'Tools/MCP', 'Guardrails', 'Audit'],
  },
  {
    title: 'Real-Time Streaming Architecture',
    description: 'Event-driven architecture for real-time analytics — from event ingestion through stream processing to real-time dashboards and alerts.',
    tags: ['Kafka', 'Spark Streaming', 'Flink', 'Kinesis'],
    layers: ['Producers', 'Event Bus', 'Stream Processing', 'Serving', 'Actions'],
  },
  {
    title: 'Cloud Migration Playbook',
    description: 'Phased migration from on-prem data warehouses (Teradata, Oracle, Netezza) to cloud-native Lakehouse with dual-run validation.',
    tags: ['AWS', 'GCP', 'Azure', 'Snowflake'],
    layers: ['Assess', 'Design', 'Migrate', 'Validate', 'Decommission'],
  },
]

/**
 * Product family built by the BizStats AI team. Copy, URLs and statuses come
 * from the product repositories (bizstatsai/bizstatsai product deck,
 * docs/BACKLOG.md, Cloudflare DNS inventory) as of 2026-11-03.
 * status: 'live' | 'early' (early access / in testing) | 'building' | 'soon'
 */
export const products = [
  {
    name: 'BotNX',
    tagline: 'Five agents. One conversation.',
    description: 'A multi-agent customer surface that qualifies, books, collects payment, and hands off to a human with full context — across every channel. Five specialised agents (Knowledge, Conversation, Response, Quality, Handoff) over ten LLM providers; live in 25 industries.',
    url: 'https://botnx.bizstats.ai',
    status: 'live',
    platform: 'Smart MCP',
    tags: ['Multi-agent', 'MCP', 'Stripe Connect', 'Calendar booking'],
  },
  {
    name: 'BizStats Hub',
    tagline: 'One sign-in for the whole family.',
    description: 'Identity and billing hub for every product — password, Google, Microsoft, Apple and passkey sign-in, Stripe-backed plans, and the launchpad that links BotNX, DeployNX, BlogNX, Labs and D3K.',
    url: 'https://hub.bizstats.ai',
    status: 'live',
    platform: 'Smart MCP',
    tags: ['SSO', 'Passkeys', 'OIDC', 'Billing'],
  },
  {
    name: 'DeployNX',
    tagline: 'Deploy and test control, as a product.',
    description: 'Grew out of the standalone Smart TCS (Test Control Server) project: its own backend, React frontend and Terraform, OIDC sign-in through the Hub, and first-class GitLab and Bitbucket CI integration.',
    url: 'https://deploynx.bizstats.ai',
    status: 'building',
    platform: 'Smart MCP',
    tags: ['CI/CD', 'Terraform', 'GitLab', 'Bitbucket'],
  },
  {
    name: 'BlogNX',
    tagline: 'Where ideas become public intelligence.',
    description: 'Forty-seven AI agents, structured debate, four pillars of verified reputation. Publishing for work that deserves to be read instead of scrolled past. Media served from Cloudflare R2.',
    url: 'https://blognx.bizstats.ai',
    status: 'early',
    platform: 'Smart MCP',
    tags: ['Editorial AI', 'Agents', 'R2'],
  },
  {
    name: 'BizStats Labs',
    tagline: 'Experiments, in the open.',
    description: 'A public workbench where beta tools ship while still rough: the Lumina Forge content engine, BizStats AI 2.0 conversational BI and the Data Studio pipeline builder. Local-first, Ollama-powered, cohort access.',
    url: 'https://labs.bizstats.ai',
    status: 'live',
    platform: 'Smart MCP',
    tags: ['Open beta', 'Local-first', 'Ollama'],
  },
  {
    name: 'Status',
    tagline: 'Every product, one health page.',
    description: 'Public status page for the product family, backed by a status API on the k3s tunnel and transactional email through neuralfeed.',
    url: 'https://status.bizstats.ai',
    status: 'live',
    platform: 'Linode + k3s',
    tags: ['Uptime', 'Incidents'],
  },
  {
    name: 'bizstats.ai',
    tagline: 'The decision platform.',
    description: 'Six FastAPI services (KOU, business channels, analytics, departments, insights, auth) behind an nginx gateway, a Next.js product zone and a static marketing zone, Celery workers and a local Ollama model — 191 routes live in production.',
    url: 'https://www.bizstats.ai',
    status: 'live',
    platform: 'Self-hosted k3s',
    tags: ['FastAPI', 'Next.js', 'Postgres + pgvector', 'KEDA'],
  },
  {
    name: 'KOU',
    tagline: 'Build your own AI practice.',
    description: 'The partner ecosystem and consulting arm: analysts, boutique firms and independent consultants carry the whole suite as their own practice — one catalogue, one commission, a workspace that runs the deal desk.',
    url: 'https://www.bizstats.ai/kou/plan',
    status: 'early',
    platform: 'bizstats.ai',
    tags: ['Partner program', 'Deal desk'],
  },
  {
    name: 'D3K',
    tagline: 'The memory that makes AI affordable.',
    description: 'Decision Domain Knowledge: an open spec that compiles to dbt, Iceberg and Cube, plus a Cognitive Cache that stops agents re-thinking the same domain question.',
    url: 'https://www.bizstats.ai/d3k',
    status: 'early',
    platform: 'bizstats.ai',
    tags: ['dbt', 'Iceberg', 'Cube', 'Semantic cache'],
  },
  {
    name: 'DWS',
    tagline: 'The seat at the head of the table.',
    description: 'Decisive Wisdom Studio: the Decision Card — versioned, bias-checked, audit-ready, outcome-attributed. The decision itself becomes the record, not the meeting that produced it.',
    url: 'https://www.bizstats.ai/dws',
    status: 'early',
    platform: 'bizstats.ai',
    tags: ['Decision records', 'Audit'],
  },
  {
    name: 'DPMS',
    tagline: 'The bill that pays for itself.',
    description: 'Decision Process Monitoring: self-healing pipelines, inference economics and EU AI Act audit for the AI-native data stack — and it drafts the fix.',
    url: 'https://www.bizstats.ai/dpms',
    status: 'early',
    platform: 'bizstats.ai',
    tags: ['Observability', 'FinOps', 'EU AI Act'],
  },
  {
    name: 'Cosmos3D',
    tagline: 'Fly through your company.',
    description: 'A three-dimensional command surface where every decision orbits the person who owns it. Thirteen AI executives, one 3D mind. Private preview; public release 2026.',
    url: 'https://www.bizstats.ai/cosmos3d/universe',
    status: 'soon',
    platform: 'bizstats.ai',
    tags: ['3D', 'Executive AI'],
  },
  {
    name: 'CRM',
    tagline: 'The pipeline behind the pipeline.',
    description: 'Internal CRM for the product family (the crm-bizstats project), sharing the Smart MCP data plane. Planned public home: crm.bizstats.ai.',
    url: null,
    status: 'building',
    platform: 'Smart MCP',
    tags: ['Internal', 'Pipeline'],
  },
]

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Products', href: '#products' },
  { label: 'Methodology', href: '#methodology' },
  { label: 'Books', href: '#books' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]
