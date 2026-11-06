/** Certifications, education and technical credentials. */
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
    url: null, // issuer retired the course_completion links (404 on 2026-11-03)
  },
  {
    name: 'MongoDB Aggregation Framework',
    issuer: 'MongoDB University',
    url: null, // issuer retired the course_completion links (404 on 2026-11-03)
  },
  {
    name: 'MongoDB for Python Developers',
    issuer: 'MongoDB University',
    url: null, // issuer retired the course_completion links (404 on 2026-11-03)
  },
]

export const education = {
  degree: 'Bachelor of Engineering (Electronics)',
  university: 'Bangalore University',
}

export const educationYear = 1994

export const additionalTraining = [
  'Oracle Database & Applications',
  'Rational Unified Process (RUP)',
  'MicroStrategy',
  'BizFlow',
  'Enterprise Data Modeling (ERP)',
  'Data Science Advanced',
  'Machine Learning Advanced',
  'AI & Deep Learning Advanced',
]

export const certificationGroups = [
  { group: 'Databricks', test: c => c.issuer === 'Databricks' },
  { group: 'AI and machine learning', test: c => /Machine Learning|Neural/.test(c.name) },
  { group: 'Google Cloud', test: c => c.issuer.includes('Google') },
  { group: 'MongoDB', test: c => c.issuer.includes('MongoDB') },
].map(({ group, test }) => ({ group, certs: certifications.filter(test) }))

export const recognition = {
  quote: 'Excellent Architecture & Design',
  source: 'Forrester',
  context: 'Forrester evaluated the NextGen Credit Bureau product designed and developed at Experian between 2009 and 2012, a metadata-driven architecture built to develop once and deploy many worldwide. This was its feedback.',
  caveat: 'A Forrester evaluation of the architecture, not a formal award.',
  link: '#project-experian',
}
