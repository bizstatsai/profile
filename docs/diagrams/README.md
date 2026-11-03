# Diagrams

Every diagram on the site is rendered from a Mermaid source in `docs/diagrams/src/`.
Nothing is drawn by hand and nothing is pasted as a screenshot.

## Pipeline

```bash
npm run diagrams
```

renders `docs/diagrams/src/*.mmd` → `public/diagrams/*.svg` with
[mermaid-cli](https://github.com/mermaid-js/mermaid-cli) and copies each source to
`public/diagrams/src/` so every figure on the site can link to "view Mermaid source".
A parse error fails the run. In a container without a bundled Chromium, point it at one:

```bash
PUPPETEER_EXECUTABLE_PATH=/path/to/chromium npm run diagrams
```

`src/test/profile-data.test.js` fails if a pattern references a diagram that has not been rendered.

## Header on every source file

The first line of each `.mmd` is a comment with the diagram's register entry:

```
%% id: pattern-lakehouse · level: pattern · visibility: public · owner: architect
```

`level` is one of `C4-1`, `C4-2`, `C4-3`, `C4-4`, `class`, `sequence`, `state`, `deployment`,
`pattern`. `visibility` is `public` or `internal`; only `public` sources live in this
repository.

## What never appears in a public diagram

Hostnames, IP addresses, ports, namespaces, cluster and tunnel names, secret paths,
credential and role names, vendor account identifiers, exact software versions, rate-limit
values, incident details, ticket and backlog identifiers, staff names, internal codenames,
release tags. Label by **role** ("Control-plane node", "Secrets vault", "Primary tunnel").
Roles, counts and patterns are fine.

Internal diagrams, where those details belong, live with the platform repositories and are
the source of truth; a public variant is derived from the internal one by replacing labels,
never drawn twice.

## Inventory

| File | Level | Shows |
|---|---|---|
| `platform-context.mmd` | C4-1 | System context of the BizStats AI product family, roles only |
| `platform-release-path.mmd` | sequence | Merge → tests → staging → manual promotion → production |
| `pattern-lakehouse.mmd` | pattern | Bronze / Silver / Gold with catalogue and contracts |
| `pattern-mlops.mmd` | pattern | Feature store → training → registry → serving → monitoring |
| `pattern-data-mesh.mmd` | pattern | Domain products, self-serve platform, federated governance |
| `pattern-agentic-mcp.mmd` | pattern | Orchestrator, specialised agents, MCP gateway, handoff, audit |
| `pattern-streaming.mmd` | pattern | Producers → event bus → stream processing → serving → actions |
| `pattern-cloud-migration.mmd` | pattern | Assess → design → migrate → validate (dual-run) → decommission |
| `pattern-pilot-light-failover.mmd` | sequence | Self-hosted primary, edge LB, cloud standby promotion, failback |
| `pattern-availability-states.mmd` | state | Normal → Degraded → Failing over → Failed over → Failing back |
| `pattern-scale-to-zero.mmd` | sequence | Door service, waker, environment, idle sleeper |
| `pattern-llm-router.mmd` | pattern | Local model first, API providers in cost order, single failure |

## Conventions

- Explicit fills on every node (`classDef … fill:… color:#1a1a1a`) so the drawing reads on the
  "paper" card in both site themes.
- `<br/>` for line breaks in labels; no `;` inside labels (Mermaid treats it as a separator).
- Every figure on the site has a caption that states its one claim and an `alt` that repeats it.
- Add a row to the inventory above and an entry in `src/data/profile.js` when adding a pattern.
