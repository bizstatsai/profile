/** Employment history and career milestones. Sourced from LinkedIn and the resume. */
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
    measure: '2 PB',
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
    measure: '97%',
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
    measure: '1000 TPS',
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
    measure: '100 TB',
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

/** Career moments that are not client engagements. Dates of books follow the publishers' pages. */
export const milestones = [
  { year: 1994, event: 'B.E. Electronics, Bangalore University', type: 'Education' },
  { year: 1994, event: 'Started career at Canny Soft Services, India', type: 'Career' },
  { year: 1997, event: 'Moved to USA — on-site consulting begins', type: 'Milestone' },
  { year: 2002, event: 'State of Florida & Georgia — Led 30+ resource teams, offshore model', type: 'Career' },
  { year: 2007, event: 'Founded Absolut-e Data Com Inc.', type: 'Milestone' },
  { year: 2010, event: 'Published "OneStop Project Management" (AuthorHouse)', type: 'Book' },
  { year: 2020, event: 'Published three AI books with Business Expert Press: "AI for Risk Management", "AI for Security" and "AI Design and Solution for Risk and Security"', type: 'Book' },
  { year: 2023, event: 'Launched BizStats AI Analytics Platform', type: 'Milestone' },
]

export const eras = [
  { from: 1994, to: 2003, title: 'Systems and pricing engines' },
  { from: 2004, to: 2008, title: 'Warehouses at scale' },
  { from: 2009, to: 2013, title: 'Metadata-driven products' },
  { from: 2014, to: 2020, title: 'Petabytes and the move to cloud' },
  { from: 2021, to: 2026, title: 'Multi-cloud and AI platforms' },
]

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const startYear = (period) => Number(period.match(/\d{4}/)[0])
const startMonth = (period) => MONTHS.indexOf(period.slice(0, 3))

/** Everything on the career line, oldest first, grouped into eras. */
export function careerLine() {
  const engagements = experiences
    .filter(e => !e.period.includes('Present'))
    .map(e => ({ kind: 'engagement', year: startYear(e.period), month: startMonth(e.period), ...e }))
  // A milestone has only a year, so it opens that year. Items that tie keep their written order.
  const moments = milestones.map(m => ({ kind: 'milestone', month: -1, ...m }))
  const all = [...engagements, ...moments].sort((a, b) => a.year - b.year || a.month - b.month)
  return eras.map(era => ({
    ...era,
    items: all.filter(i => i.year >= era.from && i.year <= era.to),
  }))
}

export const founderRole = experiences.find(e => e.period.includes('Present'))
