/**
 * Every architecture drawing on the site.
 *
 * Labels and relationships are NOT written here: they come from the Mermaid source
 * at build time (see scripts/mermaid-parser.mjs and the plugin in vite.config.js).
 * This file adds only what a source cannot say: where each component sits, what
 * colour family it belongs to, and a one-line description for the inspector.
 * src/test/diagrams.test.js fails if a source and this file disagree.
 *
 * Colour language: source (cyan), process (blue), storage (violet), ai (purple),
 * governance (amber), consumption (green), neutral and people (slate).
 */
import lakehouse from '../../docs/diagrams/src/pattern-lakehouse.mmd'
import mlops from '../../docs/diagrams/src/pattern-mlops.mmd'
import dataMesh from '../../docs/diagrams/src/pattern-data-mesh.mmd'
import agenticMcp from '../../docs/diagrams/src/pattern-agentic-mcp.mmd'
import streaming from '../../docs/diagrams/src/pattern-streaming.mmd'
import cloudMigration from '../../docs/diagrams/src/pattern-cloud-migration.mmd'
import pilotLight from '../../docs/diagrams/src/pattern-pilot-light-failover.mmd'
import availability from '../../docs/diagrams/src/pattern-availability-states.mmd'
import scaleToZero from '../../docs/diagrams/src/pattern-scale-to-zero.mmd'
import llmRouter from '../../docs/diagrams/src/pattern-llm-router.mmd'
import platformContext from '../../docs/diagrams/src/platform-context.mmd'
import releasePath from '../../docs/diagrams/src/platform-release-path.mmd'
import deployment from '../../docs/diagrams/deployment.mmd'
import sitemap from '../../docs/diagrams/sitemap.mmd'
import classDiagram from '../../docs/uml/class-diagram.mmd'
import componentDiagram from '../../docs/uml/component-diagram.mmd'
import sequenceDiagram from '../../docs/uml/sequence-diagram.mmd'
import stateDiagram from '../../docs/uml/state-diagram.mmd'
import schema from '../../docs/data-model/schema.mmd'
import wireframe from '../../docs/wireframes/layout.mmd'
import { caseStudies } from './projects'

const REPO = 'https://github.com/bizstatsai/profile/blob/main'
const src = (path) => `${REPO}/${path}`

export const CATEGORIES = {
  source: 'Data sources',
  process: 'Processing and transformation',
  storage: 'Storage',
  ai: 'AI and intelligence',
  governance: 'Security and governance',
  consumption: 'Business consumption',
  neutral: 'Tools and external services',
  people: 'People',
}

export const STATUS = {
  pattern: { label: 'Reference pattern', note: 'A reusable design with its trade-offs. It does not depict any one client system.' },
  target: { label: 'Target design', note: 'The planned design for the BizStats AI platform. Not presented as deployed.' },
  built: { label: 'As built, public view', note: 'The BizStats AI platform as it runs, labelled by role.' },
  engagement: { label: 'Engagement summary', note: 'A simplified flow from the case-study notes, not a client system diagram.' },
  record: { label: 'Planning record', note: 'Drawn in February 2026 while planning this website. Superseded by the site you are reading.' },
}

const flow = (cols, rows, nodeW, at, rest = {}) => ({ cols, rows, nodeW, at, ...rest })

const DEFS = [
  {
    id: 'pattern-lakehouse',
    model: lakehouse,
    status: 'pattern',
    source: src('docs/diagrams/src/pattern-lakehouse.mmd'),
    render: 'pattern-lakehouse',
    title: 'Modern Lakehouse Architecture',
    cats: { SRC: 'source', B: 'storage', S: 'storage', G: 'storage', BI: 'consumption', ML: 'ai', CAT: 'governance' },
    desc: {
      SRC: 'Where data originates: applications, SaaS products, files and event streams.',
      B: 'The raw tier. Data lands append-only and is read with schema on read.',
      S: 'Cleansed, conformed entities, published under data contracts.',
      G: 'Business-ready marts and the metrics layer.',
      BI: 'Dashboards and reports reading from Gold.',
      ML: 'The feature store and ML workloads, fed from both Silver and Gold.',
      CAT: 'Catalogue, lineage and access policy applied to all three tiers.',
    },
    wide: flow([190, 250, 250, 240, 190], [96, 124, 110], 170, {
      SRC: [0, 1], B: [1, 1], S: [2, 1], G: [3, 1], BI: [4, 1], ML: [4, 2], CAT: [2, 0],
    }, {
      size: { CAT: 320 },
      routes: {
        'B>S': { labelChars: 10 },
        'S>G': { labelChars: 10 },
        'S>ML': { sides: ['b', 'l'], toAt: 0.74 },
        'G>ML': { sides: ['b', 'l'], toAt: 0.3 },
      },
    }),
    narrow: flow([214, 150], [88, 112, 112, 112, 100], 196, {
      SRC: [0, 0], B: [0, 1], S: [0, 2], G: [0, 3], BI: [0, 4], ML: [1, 4], CAT: [1, 2],
    }, {
      size: { CAT: 136, ML: 136 },
      labelChars: 30,
      routes: {
        'S>ML': { sides: ['r', 'l'], midX: 229, fromAt: 0.72, toAt: 0.3 },
        'G>ML': { sides: ['r', 't'], fromAt: 0.72 },
        'CAT>B': { sides: ['t', 'r'] },
        'CAT>S': { sides: ['l', 'r'], fromAt: 0.5, toAt: 0.3 },
        'CAT>G': { sides: ['b', 'r'], toAt: 0.3 },
      },
    }),
  },
  {
    id: 'pattern-data-mesh',
    model: dataMesh,
    status: 'pattern',
    source: src('docs/diagrams/src/pattern-data-mesh.mmd'),
    render: 'pattern-data-mesh',
    title: 'Data Mesh Implementation',
    cats: { D1: 'source', D2: 'source', D3: 'source', P1: 'storage', P2: 'process', P3: 'process', GOV: 'governance', C: 'consumption' },
    desc: {
      D1: 'The sales domain owns its orders data product and publishes it with a contract.',
      D2: 'The supply-chain domain owns its inventory data product and publishes it with a contract.',
      D3: 'The finance domain owns its ledger data product and publishes it with a contract.',
      P1: 'Shared storage, compute and pipelines that every domain builds on.',
      P2: 'Where products are registered and found: catalogue, contracts and quality checks.',
      P3: 'Access control and observability across products.',
      GOV: 'Sets global policies. The platform enforces them as code.',
      C: 'Analysts, ML teams and applications discover products and subscribe to them.',
    },
    wide: flow([320, 320, 320], [112, 176, 110], 240, {
      D1: [0, 0], D2: [1, 0], D3: [2, 0], P1: [0, 1], P2: [1, 1], P3: [2, 1], C: [0.55, 2], GOV: [1.55, 2],
    }, {
      dir: 'TB',
      size: { GOV: 280 },
      routes: {
        'D1>P1': { fromAt: 0.35, toAt: 0.35 },
        'D2>P1': { fromAt: 0.3, toAt: 0.55, midY: 138 },
        'D3>P1': { fromAt: 0.3, toAt: 0.75, midY: 128 },
        'D1>P2': { fromAt: 0.7, toAt: 0.25, midY: 170, noLabel: true },
        'D2>P2': { fromAt: 0.6, toAt: 0.6, labelAt: 0.7 },
        'D3>P2': { fromAt: 0.7, toAt: 0.85, midY: 170, noLabel: true },
        'GOV>P2': { sides: ['t', 'b'], fromAt: 0.25, toAt: 0.7, noLabel: true },
        'GOV>P3': { sides: ['t', 'b'], fromAt: 0.75, toAt: 0.4, labelAt: 0.42 },
        'C>P2': { sides: ['t', 'b'], toAt: 0.3, labelAt: 0.3 },
      },
    }),
    narrow: {
      px: true,
      nodeW: 100,
      minH: 58,
      size: { P1: 144, P2: 174, P3: 146, C: 170, GOV: 190 },
      at: {
        D1: [86, 75], D2: [196, 75], D3: [306, 75],
        P1: [108, 290], P2: [277, 290], P3: [291, 372],
        C: [101, 500], GOV: [291, 500],
      },
      labelChars: 14,
      routes: {
        'D1>P1': { sides: ['b', 't'], along: 86 },
        'D2>P1': { sides: ['b', 't'], from: 170, to: 130, midY: 172 },
        'D3>P1': { sides: ['b', 't'], from: 290, to: 160, midY: 158 },
        'D1>P2': { sides: ['b', 't'], from: 120, to: 205, midY: 186, noLabel: true },
        'D2>P2': { sides: ['b', 't'], along: 225, noLabel: true },
        'D3>P2': { sides: ['b', 't'], along: 320, labelPos: [306, 182] },
        'GOV>P3': { sides: ['t', 'b'], along: 291, labelPos: [291, 430], labelChars: 18 },
        'GOV>P2': { sides: ['t', 'r'], from: 375, to: 300, noLabel: true },
        'C>P2': { sides: ['t', 'b'], from: 150, to: 204, midY: 438, labelPos: [160, 384], labelChars: 10 },
      },
    },
  },
  {
    id: 'pattern-streaming',
    model: streaming,
    status: 'pattern',
    source: src('docs/diagrams/src/pattern-streaming.mmd'),
    render: 'pattern-streaming',
    title: 'Real-Time Streaming Architecture',
    cats: { P1: 'source', BUS: 'process', SP: 'process', SV: 'process', ACT: 'consumption', BATCH: 'storage', REG: 'governance' },
    desc: {
      P1: 'Applications, devices and change data capture write events.',
      BUS: 'A partitioned log, retained so events can be replayed.',
      SP: 'Enriches, windows and aggregates events as they arrive.',
      SV: 'Real-time views and alerts.',
      ACT: 'Dashboards, decisions and agents act on what is served.',
      BATCH: 'Replay from the log reconciles results in the lakehouse.',
      REG: 'Compatibility rules applied to the event bus.',
    },
    wide: flow([200, 220, 220, 220, 200], [100, 120, 110], 176, {
      P1: [0, 1], BUS: [1, 1], SP: [2, 1], SV: [3, 1], ACT: [4, 1], REG: [1, 0], BATCH: [1, 2],
    }),
    narrow: flow([198, 166], [96, 118, 112, 100, 90], 182, {
      P1: [0, 0], BUS: [0, 1], SP: [0, 2], SV: [0, 3], ACT: [0, 4], REG: [1, 0], BATCH: [1, 2],
    }, {
      size: { REG: 156, BATCH: 156 },
      routes: {
        'REG>BUS': { sides: ['b', 'r'], toAt: 0.3 },
        'BUS>BATCH': { sides: ['r', 't'], fromAt: 0.72 },
      },
    }),
  },
  {
    id: 'pattern-cloud-migration',
    model: cloudMigration,
    status: 'pattern',
    source: src('docs/diagrams/src/pattern-cloud-migration.mmd'),
    render: 'pattern-cloud-migration',
    title: 'Cloud Migration Playbook',
    cats: { A: 'process', D: 'process', M: 'process', V: 'governance', X: 'process' },
    desc: {
      A: 'Inventory the workloads, trace lineage and establish cost.',
      D: 'Define the target lakehouse and its contracts.',
      M: 'Move in waves. Each wave can be released on its own.',
      V: 'Run old and new side by side and reconcile. A mismatch sends the wave back.',
      X: 'Retire the legacy system wave by wave once reconciliation matches.',
    },
    wide: flow([210, 210, 210, 250, 200], [120, 90], 176, {
      A: [0, 0], D: [1, 0], M: [2, 0], V: [3, 0], X: [4, 0],
    }, {
      routes: {
        'V>M': { sides: ['b', 'b'], out: 44 },
      },
    }),
    narrow: flow([240, 124], [90, 96, 96, 130, 96], 216, {
      A: [0, 0], D: [0, 1], M: [0, 2], V: [0, 3], X: [0, 4],
    }, {
      routes: {
        'V>M': { sides: ['r', 'r'], out: 30, labelDx: 44, labelDy: 0 },
      },
    }),
  },
  {
    id: 'pattern-pilot-light-failover',
    model: pilotLight,
    status: 'target',
    source: src('docs/diagrams/src/pattern-pilot-light-failover.mmd'),
    render: 'pattern-pilot-light-failover',
    title: 'Self-Hosted Primary with Cloud Pilot Light',
    cats: { U: 'people', LB: 'governance', HC: 'governance', A: 'process', B: 'process', PGA: 'storage', PGB: 'storage', W: 'governance' },
    sequence: { colW: 160 },
  },
  {
    id: 'pattern-availability-states',
    model: availability,
    status: 'target',
    source: src('docs/diagrams/src/pattern-availability-states.mmd'),
    render: 'pattern-availability-states',
    title: 'Availability as a State Machine',
    cats: { Normal: 'consumption', Degraded: 'governance', FailingOver: 'governance', FailedOver: 'process', FailingBack: 'process', '[*]': 'neutral' },
    desc: {
      Normal: 'Pool A serves, pool B stays scaled low, and WAL streams to the standby.',
      Degraded: 'On-call is alerted and B is pre-warmed. Writes stay on A.',
      FailingOver: 'Writes see a maintenance page while A is fenced, the standby database is promoted and B scales up.',
      FailedOver: 'Pool B serves. The RTO target is 15 minutes, and LLM service degrades to API providers only.',
      FailingBack: 'Writes freeze for two minutes, the primary database is promoted again and pool weights flip back.',
    },
    wide: flow([56, 350, 350, 350], [200, 190], 224, {
      '[*]': [0, 0], Normal: [1, 0], Degraded: [2, 0], FailingOver: [3, 0], FailedOver: [3, 1], FailingBack: [2, 1],
    }, {
      labelChars: 20,
      routes: {
        'Normal>Degraded': { fromAt: 0.28, toAt: 0.28, labelDy: -34 },
        'Degraded>Normal': { fromAt: 0.72, toAt: 0.72, labelDy: 24 },
        'FailingBack>Normal': { sides: ['l', 'b'], labelAt: 0.3 },
        'FailedOver>FailedOver': { out: 26, labelAt: 0.46, labelDx: 58, labelDy: -12 },
        'FailedOver>FailingBack': { labelChars: 18 },
      },
    }),
    narrow: flow([44, 250, 8], [44, 150, 170, 170, 180, 170], 230, {
      '[*]': [1, 0], Normal: [1, 1], Degraded: [1, 2], FailingOver: [1, 3], FailedOver: [1, 4], FailingBack: [1, 5],
    }, {
      labelChars: 18,
      routes: {
        '[*]>Normal': { sides: ['b', 't'] },
        'Normal>Degraded': { sides: ['b', 't'], labelDx: -32 },
        'Degraded>Normal': { sides: ['t', 'b'], fromAt: 0.86, toAt: 0.86, labelDx: 28, labelChars: 11 },
        'Degraded>FailingOver': { sides: ['b', 't'] },
        'FailingOver>FailedOver': { sides: ['b', 't'], labelPos: [122, 552], labelChars: 18 },
        'FailedOver>FailingBack': { sides: ['b', 't'], labelDx: 10 },
        'FailingBack>Normal': { sides: ['l', 'l'], out: 34, labelPos: [24, 465], labelChars: 9 },
        'FailedOver>FailedOver': { out: 16, labelPos: [250, 552], labelChars: 18 },
      },
    }),
  },
  {
    id: 'pattern-scale-to-zero',
    model: scaleToZero,
    status: 'pattern',
    source: src('docs/diagrams/src/pattern-scale-to-zero.mmd'),
    render: 'pattern-scale-to-zero',
    title: 'Scale-to-Zero Environments with a Door',
    cats: { V: 'people', D: 'governance', W: 'process', E: 'process', S: 'storage', Z: 'process' },
    sequence: { colW: 178 },
  },
  {
    id: 'platform-context',
    model: platformContext,
    status: 'built',
    source: src('docs/diagrams/src/platform-context.mmd'),
    render: 'platform-context',
    title: 'System context of the product family',
    wideOnly: true,
    cats: {
      P1: 'people', P2: 'people', P3: 'people', P4: 'people', P5: 'people',
      DNS: 'governance', T1: 'governance', T2: 'governance', WK: 'governance', R2: 'storage',
      HUB: 'consumption', PROD: 'consumption', STG: 'process', SHARED: 'storage', OLL: 'ai', OTHER: 'consumption',
      VAULT: 'governance', STATUS: 'consumption', DRPG: 'storage',
      STRIPE: 'neutral', LLM: 'ai', MAIL: 'neutral', DATA: 'source', GH: 'neutral', CAL: 'neutral',
    },
    desc: {
      P1: 'End customers meet the platform through the BotNX chat widget on a client website.',
      P2: 'Visitors to the marketing site, Labs and the status page.',
      P3: 'Signs in at the Hub, pays and launches products.',
      P4: 'Consultants working through the KOU partner ecosystem.',
      P5: 'Merges to main and promotes releases.',
      DNS: 'First stop for public traffic: DNS, TLS and web application firewall, adding an edge identity header to origin.',
      T1: 'The normal route into the self-hosted cluster.',
      T2: 'The route to the cloud standby, used on failover.',
      WK: 'Edge code that serves the maintenance page and runs the disaster-recovery monitor.',
      R2: 'Object storage at the edge for media, the static site and backups.',
      HUB: 'Single sign-on, billing and the launchpad for the product family.',
      PROD: 'The production system: API gateway, domain services, web, site and workers.',
      STG: 'A staging environment that scales to zero and wakes on the first request.',
      SHARED: 'Postgres with pgvector, Redis, the LLM router and six more services.',
      OLL: 'LLM and speech models on a GPU node.',
      OTHER: 'The other product deployments: BotNX, Labs, DeployNX, BlogNX and widgets.',
      VAULT: 'Issues short-lived credentials at deploy time.',
      STATUS: 'The public status page, hosted in managed cloud.',
      DRPG: 'A hot standby kept current by streaming replication from the shared tier.',
      STRIPE: 'Plans and Stripe Connect.',
      LLM: 'External LLM providers: OpenAI, Anthropic, Google, DeepSeek, Groq, Fireworks and HF.',
      MAIL: 'Transactional email.',
      DATA: 'Market data: SEC EDGAR, news and quotes.',
      GH: 'GitHub Actions with self-hosted runners.',
      CAL: 'Google and Outlook calendars.',
    },
    wide: {
      px: true,
      nodeW: 170,
      size: {
        P1: 160, P2: 160, P3: 160, P4: 160, P5: 160,
        T1: 160, T2: 160, WK: 160, R2: 160,
        HUB: 184, PROD: 184, OTHER: 184, STG: 184,
        STATUS: 120, VAULT: 100, DRPG: 150,
      },
      at: {
        P1: [96, 150], P2: [96, 250], P3: [96, 349], P4: [96, 449], P5: [96, 548],
        DNS: [321, 300],
        T1: [582, 205], T2: [582, 285], WK: [582, 372], R2: [582, 472],
        STATUS: [798, 62], VAULT: [960, 62], DRPG: [1100, 62],
        HUB: [830, 205], PROD: [830, 325], OTHER: [830, 448], STG: [830, 556],
        SHARED: [1075, 262], OLL: [1075, 422],
        STRIPE: [1337, 183], LLM: [1337, 272], MAIL: [1337, 368], DATA: [1337, 444], CAL: [1337, 521], GH: [1337, 600],
      },
      bus: ['DNS:r', 'T1:r'],
      routes: {
        'P1>DNS': { sides: ['r', 'l'], toAt: 0.5, midX: 206, labelPos: [216, 130], labelChars: 10 },
        'P2>DNS': { sides: ['r', 'l'], toAt: 0.5, midX: 206 },
        'P3>DNS': { sides: ['r', 'l'], toAt: 0.5, midX: 206 },
        'P4>DNS': { sides: ['r', 'l'], toAt: 0.5, midX: 206 },
        'P5>GH': { sides: ['b', 'b'], via: [['p', 672], ['q', 672]], labelAt: 0.5 },
        'DNS>T1': { sides: ['r', 'l'], midX: 424 },
        'DNS>T2': { sides: ['r', 'l'], midX: 424, labelPos: [463, 272] },
        'DNS>WK': { sides: ['r', 'l'], midX: 424 },
        'DNS>R2': { sides: ['r', 'l'], midX: 424 },
        'DNS>STATUS': { sides: ['t', 'l'], from: 394 },
        'T1>HUB': { sides: ['r', 'l'] },
        'T1>PROD': { sides: ['r', 'l'], midX: 700, to: 300 },
        'T1>OTHER': { sides: ['r', 'l'], midX: 700 },
        'T1>STG': { sides: ['r', 'l'], midX: 700 },
        'HUB>SHARED': { sides: ['r', 'l'], along: 222 },
        'PROD>SHARED': { sides: ['r', 'l'], along: 290 },
        'OTHER>SHARED': { sides: ['r', 'l'], from: 422, to: 306, midX: 952 },
        'PROD>OLL': { sides: ['r', 'l'], from: 374, to: 402, midX: 966 },
        'OTHER>OLL': { sides: ['r', 'l'], along: 440 },
        'SHARED>DRPG': { sides: ['t', 'b'], along: 1100, labelPos: [1100, 166], labelChars: 12 },
        'PROD>VAULT': { sides: ['r', 'b'], from: 278, labelPos: [1011, 166], labelChars: 14 },
        'HUB>STRIPE': { sides: ['r', 'l'], along: 190 },
        'OTHER>STRIPE': { sides: ['r', 'l'], from: 470, to: 204, midX: 1192 },
        'SHARED>LLM': { sides: ['r', 'l'], along: 262 },
        'PROD>MAIL': { sides: ['r', 'l'], along: 352 },
        'PROD>DATA': { sides: ['r', 'l'], from: 363, to: 444, midX: 1216 },
        'OTHER>CAL': { sides: ['r', 'l'], from: 480, to: 505, midX: 1216 },
        'STATUS>MAIL': { sides: ['b', 't'], to: 1280, via: [['p', 124], [1216, 124], [1216, 328], ['q', 328]] },
        'GH>PROD': { sides: ['l', 'l'], from: 577, to: 350, via: [[1204, 'p'], [1204, 502], [728, 502], [728, 'q']], labelPos: [1040, 502], labelChars: 22 },
        'GH>STG': { sides: ['l', 'r'], from: 600, midX: 1192 },
      },
    },
    narrow: { kind: 'layers' },
  },
  {
    id: 'platform-release-path',
    model: releasePath,
    status: 'built',
    source: src('docs/diagrams/src/platform-release-path.mmd'),
    render: 'platform-release-path',
    title: 'Release path from merge to production',
    wideOnly: true,
    cats: { E: 'people', GH: 'process', T: 'governance', B: 'process', R: 'storage', V: 'governance', S: 'process', O: 'people', P: 'consumption', N: 'storage' },
    sequence: { colW: 134 },
  },
  {
    id: 'pattern-mlops',
    model: mlops,
    status: 'pattern',
    source: src('docs/diagrams/src/pattern-mlops.mmd'),
    render: 'pattern-mlops',
    title: 'MLOps Pipeline Pattern',
    cats: { FS: 'storage', TR: 'ai', REG: 'ai', SRV: 'ai', MON: 'process', CI: 'governance' },
    desc: {
      FS: 'Holds features both offline and online.',
      TR: 'Experiments are tracked so that every model can be reproduced.',
      REG: 'Versioned models wait here behind an approval gate.',
      SRV: 'Approved models run as batch, online or local services.',
      MON: 'Watches drift, latency and cost, and triggers retraining.',
      CI: 'Tests, lineage and rollback wrapped around training, the registry and serving.',
    },
    wide: flow([200, 220, 220, 220, 200], [100, 116, 96], 176, {
      FS: [0, 1], TR: [1, 1], REG: [2, 1], SRV: [3, 1], MON: [4, 1], CI: [2, 0],
    }, {
      size: { CI: 230 },
      routes: { 'MON>TR': { sides: ['b', 'b'], out: 44 } },
    }),
    narrow: flow([214, 150], [90, 100, 100, 100, 110], 196, {
      FS: [0, 0], TR: [0, 1], REG: [0, 2], SRV: [0, 3], MON: [0, 4], CI: [1, 2],
    }, {
      size: { CI: 136 },
      routes: {
        'MON>TR': { sides: ['r', 'r'], out: 8, fromAt: 0.5, toAt: 0.72, labelPos: [264, 440], labelChars: 10 },
        'CI>TR': { sides: ['t', 'r'], toAt: 0.3 },
        'CI>REG': { sides: ['l', 'r'], fromAt: 0.5, toAt: 0.5 },
        'CI>SRV': { sides: ['b', 'r'], toAt: 0.5 },
      },
    }),
  },
  {
    id: 'pattern-agentic-mcp',
    model: agenticMcp,
    status: 'pattern',
    source: src('docs/diagrams/src/pattern-agentic-mcp.mmd'),
    render: 'pattern-agentic-mcp',
    title: 'Agentic AI + MCP Enterprise Pattern',
    cats: {
      U: 'people', ORC: 'ai', A1: 'ai', A2: 'ai', A3: 'ai', LLM: 'ai',
      GW: 'governance', AUD: 'governance', T1: 'neutral', T2: 'neutral', T3: 'neutral', T4: 'neutral', H: 'people',
    },
    desc: {
      U: 'A person or system starts the work through chat, an API call or an event.',
      ORC: 'Plans the work, routes it to agents and decides when to stop.',
      A1: 'A specialised agent. It reaches tools only through the gateway.',
      A2: 'A specialised agent. It reaches tools only through the gateway.',
      A3: 'A specialised agent that scores output and rejects what falls short.',
      GW: 'The one governed route to tools: per-tool allowlist, per-tenant scope, rate limits and audit.',
      T1: 'A tool reached only through the MCP gateway.',
      T2: 'A tool reached only through the MCP gateway.',
      T3: 'A tool reached only through the MCP gateway.',
      T4: 'A tool reached only through the MCP gateway.',
      H: 'When confidence is low, the orchestrator hands off to a person with a context packet.',
      AUD: 'The gateway records its activity to the audit log and telemetry.',
      LLM: 'Model calls go through the router: local first, API fallback.',
    },
    wide: flow([180, 224, 224, 280, 180], [92, 92, 92, 92, 92], 170, {
      U: [0, 1.5], ORC: [1, 1.5], LLM: [1, 0.1], A1: [2, 0.5], A2: [2, 1.5], A3: [2, 2.5], H: [1, 3.1],
      GW: [3, 1], AUD: [3, 2.9], T1: [4, 0], T2: [4, 1], T3: [4, 2], T4: [4, 3],
    }, {
      dir: 'LR',
      size: { GW: 240, H: 170 },
      bus: ['ORC:r', 'GW:r'],
      routes: {
        'A1>GW': { sides: ['r', 'l'], toAt: 0.35 },
        'A2>GW': { sides: ['r', 'l'], toAt: 0.65 },
        'ORC>H': { sides: ['b', 't'], labelAt: 0.5 },
        'ORC>LLM': { sides: ['t', 'b'] },
        'GW>AUD': { sides: ['b', 't'] },
      },
    }),
    narrow: {
      px: true,
      nodeW: 116,
      size: { U: 246, ORC: 246, GW: 246, LLM: 96, A1: 116, A2: 138, A3: 100, H: 100, AUD: 118 },
      minH: 58,
      at: {
        U: [139, 45], ORC: [139, 138], LLM: [339, 138],
        A1: [74, 262], A2: [205, 262], A3: [339, 262],
        GW: [139, 392], H: [339, 392],
        T1: [74, 494], T2: [204, 494], T3: [74, 586], T4: [204, 586],
        AUD: [331, 520],
      },
      labelChars: 10,
      routes: {
        'U>ORC': { sides: ['b', 't'] },
        'ORC>LLM': { sides: ['r', 'l'] },
        'ORC>A1': { sides: ['b', 't'], along: 74 },
        'ORC>A2': { sides: ['b', 't'], along: 205 },
        'ORC>A3': { sides: ['b', 't'], from: 238, via: [['p', 206], ['q', 206]] },
        'ORC>H': { sides: ['b', 't'], from: 252, to: 318, via: [['p', 192], [282, 192], [282, 332], ['q', 332]], labelPos: [248, 330] },
        'A1>GW': { sides: ['b', 't'], along: 74 },
        'A2>GW': { sides: ['b', 't'], along: 190 },
        'GW>T1': { sides: ['b', 't'], along: 74 },
        'GW>T2': { sides: ['b', 't'], along: 204 },
        'GW>T3': { sides: ['b', 't'], from: 139, via: [['p', 540], ['q', 540]] },
        'GW>T4': { sides: ['b', 't'], from: 139, via: [['p', 540], ['q', 540]] },
        'GW>AUD': { sides: ['r', 't'], from: 425, via: [[277, 'p'], [277, 450], ['q', 450]], to: 331 },
      },
    },
  },
  {
    id: 'pattern-llm-router',
    model: llmRouter,
    status: 'pattern',
    source: src('docs/diagrams/src/pattern-llm-router.mmd'),
    render: 'pattern-llm-router',
    title: 'LLM Router with Provider Fallback',
    cats: { C: 'neutral', R: 'ai', L: 'ai', P1: 'neutral', P2: 'neutral', P3: 'neutral', M: 'process' },
    desc: {
      C: 'An agent or service sends an OpenAI-shaped request.',
      R: 'Tries providers in a fixed order. The order is configuration, not code.',
      L: 'First choice: a local model on a GPU node. Free and sovereign.',
      P1: 'Second choice: the cheapest API provider.',
      P2: 'Third in the fallback order.',
      P3: 'Fourth in the fallback order.',
      M: 'Cost and quality measured per provider.',
    },
    wide: {
      px: true,
      nodeW: 186,
      size: { C: 170, R: 220 },
      at: {
        C: [106, 185], R: [420, 185], L: [810, 74], P1: [810, 148], P2: [810, 222], P3: [810, 296], M: [420, 312],
      },
      bus: ['R:r'],
      labelChars: 13,
      routes: {
        'C>R': { sides: ['r', 'l'], along: 172, labelPos: [250, 150] },
        'R>C': { sides: ['l', 'r'], along: 198, labelPos: [250, 220] },
        'R>L': { sides: ['r', 'l'], midX: 556, labelPos: [636, 74], labelChars: 22 },
        'R>P1': { sides: ['r', 'l'], midX: 556, labelPos: [636, 148], labelChars: 22 },
        'R>P2': { sides: ['r', 'l'], midX: 556, labelPos: [636, 222] },
        'R>P3': { sides: ['r', 'l'], midX: 556, labelPos: [636, 296] },
        'R>M': { sides: ['b', 't'] },
      },
    },
    narrow: flow([96, 270], [78, 112, 92, 74, 74, 74, 80], 250, {
      C: [1, 0], R: [1, 1], L: [1, 2], P1: [1, 3], P2: [1, 4], P3: [1, 5], M: [1, 6],
    }, {
      routes: {
        'C>R': { sides: ['b', 't'], fromAt: 0.28, toAt: 0.28, labelChars: 13 },
        'R>C': { sides: ['t', 'b'], fromAt: 0.72, toAt: 0.72, labelChars: 12 },
        'R>L': { sides: ['b', 't'], labelChars: 22 },
        'R>P1': { sides: ['l', 'l'], fromAt: 0.5, out: 82, labelAt: 0.82, labelChars: 9 },
        'R>P2': { sides: ['l', 'l'], fromAt: 0.5, out: 82, labelAt: 0.88 },
        'R>P3': { sides: ['l', 'l'], fromAt: 0.5, out: 82, labelAt: 0.91 },
        'R>M': { sides: ['r', 'r'], out: 10 },
      },
    }),
  },

  // Planning records for this website, February 2026.
  {
    id: 'site-deployment',
    model: deployment,
    status: 'record',
    source: src('docs/diagrams/deployment.mmd'),
    title: 'Deployment architecture, as planned',
    claim: 'Source on GitHub, a lint, test and build pipeline, static hosting behind a CDN, and the external services a browser would call.',
    cats: {
      Code: 'source', LocalDev: 'neutral', GHA: 'process', Lint: 'governance', Test: 'governance', Build: 'process',
      Pages: 'storage', CF: 'storage', Fonts: 'neutral', FormAPI: 'neutral', CMS: 'neutral', Analytics: 'neutral',
      Desktop: 'consumption', Mobile: 'consumption',
    },
    wide: flow([190, 190, 190, 190, 190], [80, 80, 80, 80], 150, {
      Code: [0, 0.5], LocalDev: [0, 2.5], GHA: [1, 0], Lint: [1, 1], Test: [1, 2], Build: [1, 3],
      Pages: [2, 3], CF: [2, 1.5], Desktop: [3, 1], Mobile: [3, 2.5],
      Fonts: [4, 0], FormAPI: [4, 1], CMS: [4, 2], Analytics: [4, 3],
    }, {
      dir: 'LR',
      size: { FormAPI: 160, CMS: 160 },
      bus: ['Desktop:r'],
      routes: {
        'Code>GHA': { sides: ['r', 'l'] },
        'Code>LocalDev': { sides: ['b', 't'] },
        'Build>Pages': { sides: ['r', 'l'] },
        'Pages>CF': { sides: ['t', 'b'] },
        'CF>Desktop': { sides: ['r', 'l'] },
        'CF>Mobile': { sides: ['r', 'l'] },
      },
    }),
  },
  {
    id: 'site-map',
    model: sitemap,
    status: 'record',
    source: src('docs/diagrams/sitemap.mmd'),
    title: 'Sitemap and information architecture, as planned',
    claim: 'A single home page with six sections, future pages drawn as dashed branches, and the external links it would carry.',
    labels: { Email: { title: 'Email link', sub: ['mailto address'] } },
    cats: {
      Home: 'consumption', HeroSection: 'process', AboutSection: 'process', ExperienceSection: 'process', BooksSection: 'process',
      SkillsSection: 'process', ContactSection: 'process', Blog: 'neutral', BlogPost: 'neutral', Projects: 'neutral', Resume: 'neutral',
      LinkedIn: 'source', BizstatsAI: 'source', Email: 'source',
    },
    wide: flow([140, 140, 140, 140, 140, 140, 140, 140, 140], [76, 136, 132], 132, {
      Home: [3.5, 0],
      HeroSection: [0, 1], AboutSection: [1, 1], ExperienceSection: [2, 1], BooksSection: [3, 1], SkillsSection: [4, 1], ContactSection: [5, 1],
      Blog: [6.87, 1], Projects: [7.87, 1], Resume: [8.87, 1], BlogPost: [6.87, 2],
      BizstatsAI: [3.5, 2], LinkedIn: [4.55, 2], Email: [5.6, 2],
    }, {
      dir: 'TB',
      bus: ['Home:b'],
      size: { LinkedIn: 150, Email: 132 },
      routes: {
        'ContactSection>LinkedIn': { sides: ['b', 't'] },
        'ContactSection>Email': { sides: ['b', 't'] },
        'Blog>BlogPost': { sides: ['b', 't'] },
        'Home>BizstatsAI': { sides: ['b', 't'] },
      },
    }),
  },
  {
    id: 'site-components',
    model: componentDiagram,
    status: 'record',
    source: src('docs/uml/component-diagram.mmd'),
    title: 'Component diagram, as planned',
    claim: 'How the browser loads the app, how components relate to the styling and data layers, and the external services marked as future work.',
    cats: {
      index: 'source', main: 'process', App: 'process', Navbar: 'consumption', Hero: 'consumption', About: 'consumption',
      Experience: 'consumption', Books: 'consumption', Skills: 'consumption', Contact: 'consumption', Footer: 'consumption',
      indexCSS: 'neutral', appCSS: 'neutral', profileData: 'storage', hooks: 'storage', utils: 'storage',
      fonts: 'neutral', linkedin: 'neutral', emailjs: 'neutral', cms: 'neutral', analytics: 'neutral',
    },
    wide: {
      px: true,
      nodeW: 96,
      dir: 'TB',
      size: { index: 130, main: 110, App: 110, Experience: 124, Navbar: 100, Hero: 100, About: 100, Books: 100, Skills: 100, Contact: 100, Footer: 100, indexCSS: 170, appCSS: 150, profileData: 130, hooks: 124, utils: 124, fonts: 150, linkedin: 150, emailjs: 150, cms: 150, analytics: 150 },
      at: {
        index: [477, 62], main: [477, 138], App: [477, 214],
        Navbar: [80, 330], Hero: [190, 330], About: [300, 330], Experience: [422, 330], Books: [544, 330], Skills: [654, 330], Contact: [764, 330], Footer: [874, 330],
        indexCSS: [145, 520], appCSS: [322, 520], profileData: [560, 520], hooks: [700, 520], utils: [834, 520],
        fonts: [1120, 62], linkedin: [1120, 150], cms: [1120, 300], analytics: [1120, 410], emailjs: [1120, 520],
      },
      // Mermaid draws App inside Components, because the Components subgraph mentions it last.
      groupOf: { App: 'Components' },
      bus: ['App:b'],
      routes: {
        'index>fonts': { sides: ['r', 'l'], along: 62 },
        'Contact>emailjs': { sides: ['b', 'l'], from: 764, to: 520, via: [['p', 360], [1000, 360], [1000, 'q']] },
        'Components>Styles': { sides: ['b', 't'], from: 235, to: 235 },
        'Components>Data': { sides: ['b', 't'], from: 700, to: 700 },
        'Components>cms': { sides: ['r', 'l'], along: 300 },
        'Components>analytics': { sides: ['r', 'l'], from: 345, to: 410, midX: 1014 },
      },
    },
  },
  {
    id: 'site-classes',
    model: classDiagram,
    status: 'record',
    source: src('docs/uml/class-diagram.mmd'),
    title: 'Class and data-structure diagram, as planned',
    claim: 'The App component composing eight sections, each holding the structure of the content it renders.',
    cats: {
      App: 'process', Navbar: 'consumption', Hero: 'consumption', About: 'consumption', Experience: 'consumption', Books: 'consumption', Skills: 'consumption', Contact: 'consumption', Footer: 'consumption',
      NavLink: 'storage', Stat: 'storage', ExpertiseCard: 'storage', ExperienceItem: 'storage', Book: 'storage', SkillGroup: 'storage',
    },
    wide: flow([186, 186, 186, 186, 186, 186, 186, 186], [100, 190, 150], 178, {
      App: [3.5, 0], Navbar: [0, 1], Hero: [1, 1], About: [2, 1], Experience: [3, 1], Books: [4, 1], Skills: [5, 1], Contact: [6, 1], Footer: [7, 1],
      NavLink: [0, 2], Stat: [1, 2], ExpertiseCard: [2, 2], ExperienceItem: [3, 2], Book: [4, 2], SkillGroup: [5, 2],
    }, { dir: 'TB', bus: ['App:b'] }),
  },
  {
    id: 'site-navigation-flow',
    model: sequenceDiagram,
    status: 'record',
    source: src('docs/uml/sequence-diagram.mmd'),
    title: 'User navigation sequence, as planned',
    claim: 'Page load, section navigation and mobile navigation, with the contact form and blog drawn as future flows.',
    cats: { U: 'people', B: 'consumption', V: 'process', R: 'process', E: 'neutral' },
    sequence: { colW: 200 },
  },
  {
    id: 'site-states',
    model: stateDiagram,
    status: 'record',
    source: src('docs/uml/state-diagram.mmd'),
    title: 'Application state diagram, as planned',
    claim: 'Loading and page states, with the scroll, mobile menu, contact form and theme toggle state machines drawn as nested regions.',
    cats: {
      '[*]': 'neutral', Loading: 'process', PageReady: 'consumption',
      NavTransparent: 'process', NavBlurred: 'process', '[*]:Scrolling': 'neutral',
      MenuClosed: 'process', MenuOpen: 'process', '[*]:MobileMenu': 'neutral',
      FormEmpty: 'process', FormFilling: 'process', FormSubmitting: 'process', FormSuccess: 'consumption', FormError: 'governance', '[*]:ContactForm': 'neutral',
      DarkMode: 'process', LightMode: 'process', '[*]:ThemeToggle': 'neutral',
    },
    wide: {
      px: true,
      nodeW: 130,
      size: { MenuClosed: 160, MenuOpen: 160, NavTransparent: 160, NavBlurred: 140, FormSubmitting: 160, FormError: 116, FormEmpty: 126 },
      at: {
        '[*]': [30, 70], Loading: [210, 70], PageReady: [440, 70],
        '[*]:Scrolling': [670, 70], NavTransparent: [790, 70], NavBlurred: [1060, 70],
        '[*]:ContactForm': [660, 250], FormEmpty: [750, 250], FormFilling: [960, 250],
        FormSubmitting: [960, 390], FormSuccess: [750, 390], FormError: [1130, 320],
        '[*]:MobileMenu': [60, 250], MenuClosed: [190, 250], MenuOpen: [190, 410],
        '[*]:ThemeToggle': [360, 250], DarkMode: [480, 250], LightMode: [480, 410],
      },
      labelChars: 14,
      routes: {
        '[*]>Loading': { sides: ['r', 'l'], labelPos: [90, 70], labelChars: 11 },
        'Loading>PageReady': { sides: ['r', 'l'], labelPos: [325, 70], labelChars: 8 },
        'PageReady>Scrolling': { sides: ['r', 'l'], labelPos: [572, 70], labelChars: 8 },
        'NavTransparent>NavBlurred': { sides: ['r', 'l'], along: 60, labelPos: [930, 44] },
        'NavBlurred>NavTransparent': { sides: ['l', 'r'], along: 80, labelPos: [930, 96] },
        'PageReady>MobileMenu': { sides: ['b', 't'], from: 410, to: 160, midY: 136, labelPos: [290, 136], labelChars: 18 },
        'PageReady>ThemeToggle': { sides: ['b', 't'], along: 465, labelPos: [465, 136], labelChars: 18 },
        'Scrolling>ContactForm': { sides: ['b', 't'], along: 900, labelPos: [900, 164], labelChars: 22 },
        'MenuClosed>MenuOpen': { sides: ['b', 't'], along: 150, labelPos: [150, 305], labelChars: 10 },
        'MenuOpen>MenuClosed': { sides: ['t', 'b'], along: 190, labelPos: [190, 352], labelChars: 6 },
        'MenuOpen>MenuClosed#1': { sides: ['t', 'b'], along: 230, labelPos: [230, 305], labelChars: 10 },
        'FormEmpty>FormFilling': { sides: ['r', 'l'], labelPos: [854, 250], labelChars: 6 },
        'FormFilling>FormSubmitting': { sides: ['b', 't'], labelPos: [960, 320], labelChars: 14 },
        'FormSubmitting>FormSuccess': { sides: ['l', 'r'], labelPos: [848, 390], labelChars: 4 },
        'FormSubmitting>FormError': { sides: ['r', 'b'], labelPos: [1085, 390], labelChars: 10 },
        'FormError>FormFilling': { sides: ['t', 'r'], labelPos: [1085, 250], labelChars: 14 },
        'FormSuccess>FormEmpty': { sides: ['t', 'b'], labelPos: [750, 320] },
        'DarkMode>LightMode': { sides: ['b', 't'], along: 452, labelPos: [452, 330], labelChars: 7 },
        'LightMode>DarkMode': { sides: ['t', 'b'], along: 508, labelPos: [508, 330], labelChars: 7 },
      },
    },
  },
  {
    id: 'site-data-model',
    model: schema,
    status: 'record',
    source: src('docs/data-model/schema.mmd'),
    title: 'Content data model, as planned',
    claim: 'The entities the site content would use if it moved into a CMS or JSON. Every relationship in the source is one to zero or many, and each arrow runs from the one to the many.',
    cats: {
      PROFILE: 'storage', EXPERIENCE: 'storage', BOOK: 'storage', SKILL_GROUP: 'storage', CERTIFICATION: 'storage',
      SERVICE: 'storage', SOCIAL_LINK: 'storage', BLOG_POST: 'storage', TAG: 'storage',
    },
    wide: flow([250, 250, 250, 250], [190, 170, 170], 196, {
      PROFILE: [0, 1], EXPERIENCE: [1, 0], BOOK: [2, 0], BLOG_POST: [3, 0], TAG: [2.5, 1.05],
      SKILL_GROUP: [1, 2], CERTIFICATION: [1.95, 2], SERVICE: [2.85, 2], SOCIAL_LINK: [3.7, 2],
    }, {
      size: { SERVICE: 160, SOCIAL_LINK: 160, SKILL_GROUP: 170, CERTIFICATION: 180, TAG: 150 },
      labelChars: 12,
      routes: {
        'PROFILE>EXPERIENCE': { sides: ['r', 'l'] },
        'PROFILE>BOOK': { sides: ['t', 't'], out: 22, labelAt: 0.5 },
        'PROFILE>BLOG_POST': { sides: ['t', 't'], out: 44, fromAt: 0.72, labelAt: 0.6 },
        'PROFILE>SKILL_GROUP': { sides: ['r', 'l'], fromAt: 0.66 },
        'PROFILE>CERTIFICATION': { sides: ['b', 'b'], fromAt: 0.3, out: 22, labelAt: 0.4 },
        'PROFILE>SERVICE': { sides: ['b', 'b'], fromAt: 0.55, out: 40, labelAt: 0.5 },
        'PROFILE>SOCIAL_LINK': { sides: ['b', 'b'], fromAt: 0.8, out: 58, labelAt: 0.6 },
        'EXPERIENCE>TAG': { sides: ['b', 'l'], labelAt: 0.4 },
        'BOOK>TAG': { sides: ['b', 't'], toAt: 0.3 },
        'BLOG_POST>TAG': { sides: ['b', 'r'], labelAt: 0.4 },
      },
    }),
  },
]

/** Case-study flows are short ordered lists in the source data, drawn with the same parts. */
const FLOW_CATS = {
  walmart: ['governance', 'process', 'storage', 'governance', 'process', 'consumption'],
  att: ['source', 'storage', 'storage', 'governance', 'process', 'consumption'],
  experian: ['source', 'process', 'storage', 'process', 'process', 'consumption'],
  ebay: ['source', 'source', 'storage', 'storage', 'consumption', 'consumption'],
  directv: ['source', 'process', 'storage', 'governance', 'ai', 'consumption'],
}

const flowFromSteps = (study) => {
  const steps = study.architecture
  const cats = FLOW_CATS[study.id]
  const ids = steps.map((_, i) => `s${i}`)
  return {
    id: `flow-${study.id}`,
    status: 'engagement',
    title: `${study.client} engagement flow`,
    claim: study.title,
    linear: true,
    model: {
      type: 'flow',
      nodes: steps.map((title, i) => ({ id: ids[i], title, sub: [], group: null })),
      edges: ids.slice(1).map((to, i) => ({ from: ids[i], to, dashed: false, label: null })),
      groups: [],
    },
    cats: Object.fromEntries(ids.map((id, i) => [id, cats[i]])),
    wide: flow([205, 205, 205, 205, 205, 205], [96], 172, Object.fromEntries(ids.map((id, i) => [id, [i, 0]]))),
    narrow: flow([350], steps.map(() => 72), 300, Object.fromEntries(ids.map((id, i) => [id, [0, i]])), { minH: 44 }),
  }
}

function resolve(def) {
  const { model } = def
  if (model.type === 'flow') {
    const groupIds = new Set((model.groups ?? []).map(g => g.id))
    return {
      ...def,
      kind: 'flow',
      model: {
        ...model,
        id: def.id,
        nodes: model.nodes.filter(n => !groupIds.has(n.id)).map(n => ({
          ...n,
          ...(def.labels?.[n.id] ?? {}),
          group: def.wide?.groupOf?.[n.id] ?? n.group,
          cat: def.cats?.[n.id] ?? 'neutral',
          desc: def.desc?.[n.id] ?? null,
        })),
      },
    }
  }
  if (model.type === 'sequence') {
    return {
      ...def,
      kind: 'sequence',
      model: {
        ...model,
        id: def.id,
        participants: model.participants.map(p => ({ ...p, cat: def.cats?.[p.id] ?? 'neutral' })),
      },
    }
  }
  return { ...def, kind: model.type }
}

export const diagrams = Object.fromEntries(
  [...DEFS, ...caseStudies.map(flowFromSteps)].map(d => [d.id, resolve(d)]),
)

export const wireframeRecord = {
  id: 'site-wireframe',
  kind: 'block',
  status: 'record',
  source: src('docs/wireframes/layout.mmd'),
  title: 'Page wireframe, as planned',
  claim: 'The first page layout, top to bottom. Its placeholder copy is from the planning stage and is not current.',
  model: wireframe,
}

export const planningRecords = [
  'site-map', 'site-deployment', 'site-components', 'site-classes', 'site-navigation-flow', 'site-states', 'site-data-model',
]
