# AGENTS.md — SyncSphere AI: Multi-Agent Execution Contract

> This file defines the agent responsibilities, communication contracts, output expectations, and collaboration workflow for Antigravity multi-agent execution of the SyncSphere AI platform.

---

## 🏛️ 1. Product Architect Agent

**Identifier:** `@architect`

### Responsibilities
- Own the high-level system design and architecture decisions
- Define and maintain the data schema (`useAppStore.ts`) as the single source of truth
- Arbitrate conflicts between agents on API contracts, naming, and shared state shape
- Produce and update `AGENTS.md`, `implementation_plan.md`, and API contracts

### Input Expectations
- User requirements, feature requests, and hackathon briefs
- Output from other agents requesting schema or architecture changes

### Output Expectations
- Finalized `AppStore` interface with typed entities (`Task`, `Meeting`, `Blocker`, `TeamMember`)
- Approved API route signatures before `@backend` implements them
- Architecture decision records (ADRs) added as comments in relevant files

### Communication Contract
```ts
// @architect → ALL AGENTS
// Always export types from: client/src/store/useAppStore.ts
// Any new entity must be reviewed by @architect before @backend or @frontend add it
```

---

## 🎨 2. Frontend UI Agent

**Identifier:** `@frontend`

### Responsibilities
- Build all React pages and reusable UI components
- Enforce the unified design system (color tokens, typography, spacing, glass morphism)
- Implement premium interactions: Framer Motion animations, hover states, micro-animations
- Consume the global `useAppStore` hook — never maintain local state that belongs to the store

### Input Expectations
- Finalized `AppStore` interface from `@architect`
- Page specifications and feature descriptions from user or `@architect`
- Component designs or wireframes

### Output Expectations
- Components in `client/src/components/` (organized by feature: `ui/`, `layout/`, `dashboard/`, etc.)
- Pages in `client/src/pages/`
- All imports resolved — no broken module references
- Passes `tsc --noEmit` before handoff to `@qa`

### Design System Contract
```css
/* ALL components MUST use these CSS classes from index.css */
/* Colors: accent-gradient, glass, glass-card, glow-primary */
/* Typography: font-black for headings, font-bold for labels */
/* Animations: framer-motion for all enter/exit transitions */
/* No inline styles except for dynamic values (e.g., chart colors) */
```

### Communication Contract
```ts
// @frontend → @backend: API calls via fetch('/api/...')
// @frontend → @store: ONLY via useAppStore() hook
// NEVER: import data directly from JSON files in /server/src/data/
```

---

## 🤖 3. AI Workflow Agent

**Identifier:** `@ai-agent`

### Responsibilities
- Implement all rule-based AI simulation modules (client-side and server-side)
- Meeting note parser: regex + NLP extraction of tasks, owners, due dates
- Blocker detector: pattern matching on task metadata + workload signals
- Standup generator: template + dynamic data from store
- Voice note to task: simulated STT + task extraction pipeline

### Input Expectations
- Raw text transcripts from `MeetingParser.tsx`
- Task and team data from `useAppStore`
- Voice input (simulated) from `VoiceNoteWidget.tsx`

### Output Expectations
- `client/src/utils/parser.ts` — meeting transcript parser
- `server/src/ai/` — server-side AI simulation endpoints
- Outputs MUST conform to `Task[]` shape defined by `@architect`

### AI Simulation Contract
```ts
// Minimum confidence threshold: 80%
// Task extraction must include: title, assignee, dueDate, priority
// Priority inference rules:
//   "urgent" | "ASAP" | "critical" → high
//   "by EOW" | "this sprint" → medium
//   "when you have time" | "backlog" → low
// Assignee inference: look for name mentions near action verbs
```

### Communication Contract
```ts
// @ai-agent → @store: addTasksFromMeeting(tasks, meetingTitle)
// @ai-agent → @backend: POST /api/ai/parse-meeting { transcript }
// Response shape: { tasks: Task[], summary: string, confidence: number }
```

---

## 📊 4. Analytics Agent

**Identifier:** `@analytics`

### Responsibilities
- Build all data visualization components (Recharts-based)
- Implement the Risk Score Meter, Heatmap, Dependency Map, and efficiency charts
- Ensure all charts consume live data from `useAppStore` (not hardcoded)
- Compute derived analytics: risk score, velocity trend, team efficiency score

### Input Expectations
- `tasks[]`, `team[]`, `blockers[]` from `useAppStore`
- Sprint history (mock or server data)

### Output Expectations
- `client/src/components/analytics/` — all chart components
- `client/src/components/ui/RiskScoreMeter.tsx` — arc-based gauge
- Charts MUST use the shared Recharts Tooltip style (dark background, rounded)

### Chart Style Contract
```ts
// ALL tooltips:
contentStyle={{ 
  background: '#13131a', 
  border: '1px solid rgba(255,255,255,0.08)', 
  borderRadius: 16, 
  fontSize: 12 
}}
// ALL gradients: define in <defs> with unique IDs
// NO hardcoded pixel heights — use ResponsiveContainer
```

---

## 🔌 5. Integration Agent

**Identifier:** `@integration`

### Responsibilities
- Manage all connections between client, server, and external APIs
- Maintain `server/src/index.ts` — Express routes, middleware, static file serving
- Manage Dockerfile, `.gcloudignore`, and Cloud Run deployment configuration
- Implement the git workflow: commit messages, branch strategy, push automation

### Input Expectations
- API contracts approved by `@architect`
- New routes requested by `@ai-agent` or `@analytics`
- Deployment configuration from user

### Output Expectations
- Stable `server/src/index.ts` — all routes must return correct JSON shapes
- Working `Dockerfile` that passes `docker build` locally before commit
- `.env.example` updated with any new environment variables

### Deployment Contract
```dockerfile
# Cloud Run requirements:
# 1. EXPOSE 8080
# 2. ENV PORT=8080
# 3. Server must bind on process.env.PORT
# 4. Wildcard route uses Express 5 syntax: '/{*path}'
# 5. Static files served AFTER all API routes
```

### Git Contract
```
# Commit message format:
# [feat|fix|refactor|style|docs] Short description
# Examples:
#   fix: Express 5 wildcard route syntax for Cloud Run
#   feat: Add AI Command Palette with typewriter response
```

---

## 🧪 6. QA Agent

**Identifier:** `@qa`

### Responsibilities
- Validate TypeScript compilation: `npx tsc --noEmit` in both `client/` and `server/`
- Verify local dev server runs: `npm run dev` from root
- Run browser-based smoke tests using the browser subagent
- Catch and report: import errors, unused variables, missing component props, runtime crashes

### Input Expectations
- Completed features from `@frontend`, `@ai-agent`, or `@integration`
- Feature descriptions to know what to verify

### Output Expectations
- TypeScript error list (zero tolerance for `error TS...` — must all be fixed)
- Runtime smoke test report: each page loads without console errors
- Performance notes: no components re-rendering unnecessarily

### QA Checklist
```
[ ] npm install completes without errors (both client/ and server/)
[ ] npx tsc --noEmit passes in client/ (zero errors)
[ ] npx tsc --noEmit passes in server/ (zero errors)
[ ] npm run dev starts both client (port 5173) and server (port 8080)
[ ] Landing page loads and all demo buttons navigate correctly
[ ] Meeting Parser: paste transcript → parse → tasks appear in Dashboard
[ ] Dashboard: KPI cards show live data (not hardcoded)
[ ] Team Pulse: Activity stream renders, filters work
[ ] Analytics: All charts render with data
[ ] Blockers page: resolve action updates Dashboard KPIs
[ ] ⌘K Command Palette: opens, navigates, generates standup
[ ] Health Report modal: opens, score renders, download works
[ ] Onboarding: all 5 steps render, CTAs navigate correctly
[ ] Voice Widget: recording simulation → task added to store
[ ] Blocker notifications: appear on load, dismiss works
[ ] No broken imports, no "cannot find module" errors
[ ] Mobile responsive: sidebar collapses, cards stack properly
```

### Communication Contract
```ts
// @qa → ALL AGENTS: file bug reports as inline TODO comments
// Format: // TODO(@agent): Description of issue — file:line
// @qa blocks deployment until TypeScript compilation is clean
```

---

## 🔄 Collaboration Workflow

```
User Request
    ↓
@architect → Designs schema, creates plan
    ↓
@frontend + @ai-agent (parallel)
    ↓
@analytics (depends on @frontend component structure)
    ↓
@integration → Wires server routes, tests Docker build
    ↓
@qa → Validates, reports bugs back to owning agent
    ↓
@integration → Final git push + Cloud Run deploy
    ↓
✅ Deployed
```

### Shared Context File
All agents read `client/src/store/useAppStore.ts` as the canonical data contract.
Any agent adding a new data field MUST:
1. Update `useAppStore.ts` types
2. Notify `@architect` via commit message `[contract] Add X field to Task type`
3. Update this file with new agent responsibilities if needed

---

*Last updated: May 2026 · SyncSphere AI Hackathon Edition*
