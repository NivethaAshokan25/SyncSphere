# SyncSphere AI: Architectural Blueprint

## System Philosophy
SyncSphere AI is designed as a **Multi-Agent Orchestration Platform** that transforms asynchronous team data into synchronous intelligence. The architecture prioritizes low-latency simulation, type-safe state propagation, and premium user interaction.

## Core Pillars

### 1. Unified State & Simulation Layer (`useAppStore`)
- **Reactive Engine**: Built on Zustand for high-performance state updates without the boilerplate of Redux.
- **AI Simulation**: The store implements rule-based simulation engines (Workload, Risk, Health) that reactively update as raw task data changes.
- **Persistence Layer**: LocalStorage integration ensures session continuity for offline-first capabilities.

### 2. Strategic Intelligence Engines
- **useTeamHealth**: A complex hook that aggregates overdue metrics, blocker frequency, and workload density into a unified health score.
- **useDemoTour**: An automated orchestration engine that controls application routing and UI spotlights for guided demonstrations.

### 3. Service Layer Abstraction
- **Firebase Module**: Provides Firestore and Auth scaffolds for Google ecosystem parity.
- **Gemini AI Module**: Wraps Google Gemini API for NLP tasks (meeting parsing, standup generation).
- **API Wrapper**: Secure Axios interceptors handle input sanitization (DOMPurify) and global error handling.

## Component Architecture
- **Atoms**: Common library (`Button`, `Card`, `Badge`) ensures visual consistency.
- **Organisms**: Complex features like the `TeamHealthRadar` and `AICommandPalette` are modular and self-contained.
- **Error Handling**: Centralized `ErrorBoundary` wraps the route hierarchy to ensure graceful degradation.

---
*Author: SyncSphere Engineering Team*
