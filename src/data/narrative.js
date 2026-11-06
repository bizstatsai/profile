/**
 * Editorial content: philosophy, the data-to-intelligence journey, the AI layers,
 * the principles, the Enterprise Intelligence Architecture method and the maturity pyramid.
 * Technologies named under "documented" come from the experience and skills data.
 */

export const philosophy = {
  label: 'How I think',
  headline: ['Technology Is the Medium.', 'Business Impact Is the Objective.'],
  lead: 'A business challenge comes first. Data architecture, technology decisions, intelligent automation and enterprise scalability are the medium it passes through. A measurable outcome is the reason to pass through it at all.',
  context: 'Partnering with CIOs, CDOs, and CTOs to architect comprehensive data strategies. Translating abstract business goals into high-performance data ecosystems for Fortune 100 companies.',
  medium: ['Data architecture', 'Technology decisions', 'Intelligent automation', 'Enterprise scalability'],
  input: 'Business challenges',
  output: 'Measurable outcomes',
  principles: [
    {
      n: '01',
      title: 'Understand the problem',
      text: 'Great architecture starts with understanding business context, not selecting technologies.',
    },
    {
      n: '02',
      title: 'Design the right system',
      text: 'Choose appropriate data models, infrastructure, integrations and intelligence layers.',
    },
    {
      n: '03',
      title: 'Create lasting impact',
      text: 'Build systems that are scalable, maintainable, reliable and valuable to the organization.',
    },
  ],
}

export const dataJourney = {
  label: 'From data to decisions',
  headline: ['Data Is Not Intelligence Yet.', 'Architecture Is What Turns It Into a Decision.'],
  lead: 'Enterprise data arrives scattered and leaves as a single decision. This is the path it takes, stage by stage, with the technologies documented in the work on this site. Choose a stage to read what it is responsible for.',
  note: 'A conceptual model of the journey. It summarises many engagements and is not one deployed system.',
  stages: [
    {
      id: 'business-data',
      name: 'Business data',
      explanation: 'Everything the enterprise already produces: supply-chain records, ERP transactions, ad and campaign data, customer interactions and logs.',
      responsibility: 'Know what exists, where it comes from and what the business means by it.',
      documented: ['SAP ECC, APO and BW', 'JD Edwards', 'IQVIA and Veeva sources', 'Mediaplex and DoubleClick', '2 PB of viewership logs'],
      next: 'Sources rarely agree on format or timing, so ingestion has to absorb both streams and batches.',
    },
    {
      id: 'ingestion',
      name: 'Data ingestion',
      explanation: 'Moving data out of source systems reliably, on the schedule the business actually needs.',
      responsibility: 'Deliver complete data on time, and keep an agreement with every producer about what they send.',
      documented: ['Kafka', 'Kinesis', 'Pub/Sub', 'Apache Airflow', 'NiFi', 'CDAP', 'MQ Series'],
      next: 'Arrived is not the same as usable, so raw data goes on to be cleansed and conformed.',
    },
    {
      id: 'engineering',
      name: 'Data engineering',
      explanation: 'Cleansing, conforming and validating data, so that the same fact means the same thing everywhere.',
      responsibility: 'Make pipelines repeatable and testable, and catch quality problems before anyone downstream does.',
      documented: ['Spark', 'Hadoop and MapReduce', 'Glue and EMR', 'Dataflow and Dataproc', 'Informatica', 'DataStage', 'Ab Initio', 'Matillion', 'Ensure validation framework'],
      next: 'Trusted data needs a home that fits how it will be queried and governed.',
    },
    {
      id: 'storage',
      name: 'Data storage',
      explanation: 'Choosing where data lives for the access patterns, scale and cost it has to meet.',
      responsibility: 'Balance performance, cost and governance without creating another copy to reconcile.',
      documented: ['Snowflake', 'Databricks', 'BigQuery', 'Redshift and S3', 'Teradata', 'Netezza', 'Vertica', 'Oracle', 'MongoDB', 'Pinecone and Milvus'],
      next: 'Stored data still has to be shaped around the questions the business asks.',
    },
    {
      id: 'modeling',
      name: 'Data modeling',
      explanation: 'Giving data the structure that matches the business: facts, dimensions, business keys and master records.',
      responsibility: 'Keep one authoritative meaning for each business entity, and let the model evolve without breaking consumers.',
      documented: ['Star Schema', 'Snowflake Schema', 'Data Vault 2.0', 'ERwin and Power Designer', 'Master Data Management', 'TIBCO-EBX'],
      next: 'A well-modelled foundation is what analytics and machine learning can rely on.',
    },
    {
      id: 'intelligence',
      name: 'Analytics & intelligence',
      explanation: 'Turning modelled data into understanding: KPIs and dashboards, statistical models, machine learning and LLMs.',
      responsibility: 'Answer the questions people ask, and predict what they would otherwise find out too late.',
      documented: ['MicroStrategy', 'Power BI', 'Tableau', 'Looker', 'Cognos', 'TensorFlow', 'PyTorch', 'Scikit-Learn', 'SageMaker', 'LLMs'],
      next: 'An insight only matters once someone, or something, acts on it.',
    },
    {
      id: 'decisions',
      name: 'Business decisions',
      explanation: 'Putting the answer where the decision is made: in front of an executive, an agent on a call, or an automated action.',
      responsibility: 'Close the loop, so that outcomes feed back and show whether the architecture created value.',
      documented: ['Active Decision Engine for customer care', 'KPI APIs for real-time business event notifications', 'Demand forecast services', 'BizStats AI decision support'],
      next: null,
    },
  ],
}

export const methodology = {
  name: 'Enterprise Intelligence Architecture',
  tagline: 'Translating business strategy into data-driven enterprise systems',
  description: 'Enterprise Intelligence Architecture (EIA) is a methodology for designing the central nervous system of modern enterprises — connecting business goals, data ecosystems, AI/ML capabilities, and cloud infrastructure into a unified, governed, and scalable architecture.',
  principles: [
    { title: 'Business-First Translation', description: 'Every architecture decision starts with a business outcome. Map C-suite objectives to data capabilities before selecting any technology.' },
    { title: 'Layered Intelligence Stack', description: 'Structure data flow across five layers: Ingest, Store, Process, Serve, and Act. Each layer has clear contracts, SLAs, and governance.' },
    { title: 'Metadata-Driven Design', description: 'Build once, deploy many. Use metadata to drive data loads, transformations, validation rules, and reporting — minimizing custom code.' },
    { title: 'Cloud-Agnostic Patterns', description: 'Design for portability. Use abstraction layers that work across AWS, GCP, and Azure so enterprises avoid vendor lock-in.' },
    { title: 'AI-Ready Foundation', description: 'Every data platform should be ML-ready from day one. Feature stores, model registries, and MLOps pipelines are not add-ons — they are core.' },
    { title: 'Governed Autonomy', description: 'Centralize standards and governance. Decentralize execution. Domain teams own their data products within enterprise guardrails.' },
  ],
  layers: [
    { name: 'Act', description: 'Agentic AI, Decision Engines, Real-time Actions', cat: 'consumption' },
    { name: 'Serve', description: 'APIs, BI Dashboards, ML Model Serving, Data Products', cat: 'ai' },
    { name: 'Process', description: 'ETL/ELT, Feature Engineering, ML Training, Data Quality', cat: 'process' },
    { name: 'Store', description: 'Lakehouse, Data Vault 2.0, Vector DBs, Feature Stores', cat: 'storage' },
    { name: 'Ingest', description: 'Streaming (Kafka), Batch (Airflow), APIs, Data Contracts', cat: 'source' },
  ],
}

export const aiSection = {
  label: 'The intelligent systems era',
  headline: ['AI Is Powerful.', 'Architecture Makes It Useful.'],
  lead: 'Enterprise intelligence moved from reports to predictions, and now to systems that act. Each step has leaned harder on the one beneath it. A model is only as useful as the data, knowledge, orchestration and governance around it.',
  practice: 'End-to-end AI platform architecture — from defining ML business cases and selecting algorithms to MLOps pipelines, LLMs, deep learning, NLP, and production AI systems using TensorFlow, PyTorch, and OpenAI APIs.',
  note: 'A conceptual model of how the layers relate. It is a way of thinking about the problem and does not depict a deployed system.',
  layers: [
    {
      id: 'data-foundation',
      name: 'Data foundation',
      cat: 'storage',
      summary: 'Reliable intelligence requires trusted foundations. Governed data, quality checks, lineage and access control come before any model.',
      topics: ['Data governance', 'Data quality and lineage', 'Lakehouse', 'Data contracts'],
      plate: 'lakehouse',
      plateLabel: 'Modern Lakehouse Architecture',
    },
    {
      id: 'knowledge',
      name: 'Knowledge layer',
      cat: 'source',
      summary: 'What the enterprise knows, in a form models can use: embeddings in a vector database for retrieval-augmented generation, semantic definitions and feature stores.',
      topics: ['Knowledge systems', 'Retrieval-augmented generation', 'Vector databases (Pinecone, Milvus)', 'Feature stores'],
      faq: 'What is RAG (Retrieval-Augmented Generation) and how do you implement it?',
    },
    {
      id: 'intelligence',
      name: 'Intelligence layer',
      cat: 'ai',
      summary: 'Models that predict and generate, released and monitored with the same rigour as application code.',
      topics: ['Machine learning', 'Predictive analytics', 'Generative AI', 'Deep learning and NLP', 'MLOps'],
      plate: 'mlops',
      plateLabel: 'MLOps Pipeline Pattern',
    },
    {
      id: 'orchestration',
      name: 'Orchestration',
      cat: 'governance',
      summary: 'Agents, tools and model routing, with one governed gateway, a human in the loop for critical decisions, and an audit trail.',
      topics: ['AI agents (CrewAI, n8n)', 'MCP (Model Context Protocol)', 'LLM routing and fallback', 'Guardrails and audit'],
      plate: 'agentic-mcp',
      plateLabel: 'Agentic AI + MCP Enterprise Pattern',
    },
    {
      id: 'applications',
      name: 'Business applications',
      cat: 'consumption',
      summary: 'Where intelligence meets the work: decision support, customer conversations and automated processes, integrated into how the business already operates.',
      topics: ['Enterprise AI integration', 'Intelligent automation', 'Decision support'],
      link: '#products',
      linkLabel: 'See the BizStats AI product family',
    },
  ],
}

export const maturityPyramid = {
  title: 'Enterprise AI Maturity Pyramid',
  description: 'Where is your organization on the AI maturity journey? Most enterprises stall at levels 1-2. True competitive advantage starts at level 4.',
  levels: [
    { level: 5, name: 'Autonomous Intelligence', description: 'Agentic AI systems making decisions within guardrails. Self-optimizing pipelines, automated anomaly response, AI-driven strategy.', cat: 'consumption' },
    { level: 4, name: 'Predictive & Prescriptive', description: 'ML models in production predicting outcomes. Recommendation engines, demand forecasting, risk scoring. MLOps pipelines deployed.', cat: 'ai' },
    { level: 3, name: 'Advanced Analytics', description: 'Statistical analysis, segmentation, trend detection. Self-serve BI for business users. Data products emerging.', cat: 'process' },
    { level: 2, name: 'Governed Data Platform', description: 'Centralized data warehouse/lakehouse. Data quality monitoring, lineage, cataloging. Single source of truth established.', cat: 'governance' },
    { level: 1, name: 'Data Foundation', description: 'Reliable data collection, storage, and basic ETL. Clean pipelines, consistent schemas, basic reporting. Most organizations are here.', cat: 'storage' },
  ],
}

export const principles = {
  label: 'Design principles',
  headline: 'Principles Behind Every Architecture Decision.',
  items: [
    { n: '01', title: 'Business First', text: 'Technology must solve a meaningful business problem.', glyph: 'target' },
    { n: '02', title: 'Simplicity Over Complexity', text: 'Good architecture reduces unnecessary complexity.', glyph: 'untangle' },
    { n: '03', title: 'Data Before Intelligence', text: 'Reliable intelligence requires trusted foundations.', glyph: 'foundation' },
    { n: '04', title: 'Design for Scale', text: 'Systems must accommodate future growth.', glyph: 'scale' },
    { n: '05', title: 'Security by Design', text: 'Trust, governance and security are architectural foundations.', glyph: 'shield' },
    { n: '06', title: 'Outcomes Over Technology', text: 'The success of architecture is measured by the value it creates.', glyph: 'focus' },
  ],
}
