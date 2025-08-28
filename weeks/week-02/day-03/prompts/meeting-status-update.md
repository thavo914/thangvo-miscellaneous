# Full practice conversation (B1) — Phase 2 kickoff update (SAS → MSSQL)

Direction: Read aloud in a warm, welcoming tone.

Speaker 2: Thanks for joining. Can you give us a quick update?
Speaker 1: Phase 1 is complete. We migrated 92 datasets to MSSQL and set daily syncs with SAS.
Speaker 2: Great. What is the plan for Phase 2?
Speaker 1: We start this week. All tasks run in parallel to release on or before Nov 25, 2025.
Speaker 2: What are the main workstreams?
Speaker 1: 1) Build ELT: recreate SAS logic as Airflow DAGs and dbt models, with backfills and daily loads.
Speaker 2: How long will that take?
Speaker 1: Estimate 6 weeks.
Speaker 2: What else?
Speaker 1: 2) Set up UAT and Production with Docker Engine, logging/monitoring, RBAC, and managed secrets.
Speaker 2: Estimate?
Speaker 1: 4 weeks.
Speaker 2: Any other tracks?
Speaker 1: 3) CI/CD (optional, recommended): Git-based automated build, test, and deploy for safer releases.
Speaker 2: Estimate?
Speaker 1: 4 weeks.
Speaker 2: Anything on data quality?
Speaker 1: 4) Data quality and observability (optional): freshness checks, dbt tests, anomaly alerts, and health dashboards.
Speaker 2: Estimate for that?
Speaker 1: 2 weeks.
Speaker 2: And documentation?
Speaker 1: 5) Documentation: architecture, ERDs, data dictionaries, and ops guides.
Speaker 2: Estimate?
Speaker 1: 1 week.
Speaker 2: Why run tasks in parallel?
Speaker 1: To meet the Nov 25 release and leave ~5 weeks for side-by-side comparison with SAS.
Speaker 2: Any risks we should know?
Speaker 1: Mapping some SAS-specific logic may take time. We’ll validate in UAT and compare KPIs daily.
Speaker 3: Do you need more budget now?
Speaker 1: No change now. We focus on reliability first; then optimize cost after first release.
Speaker 2: What do you need from us?
Speaker 1: Confirm priority datasets for ELT rebuild, approve environment access, and agree on UAT sign-off.
Speaker 2: Do you have any problems or blockers?
Speaker 1: No major blockers now. We may need help mapping some SAS business logic, but I'll work with the business team.
Speaker 2: This seems too easy. Are you sure there won't be bigger challenges?
Speaker 1: You're right to question this. The hardest parts are ahead: complex SAS logic mapping, data validation, and ensuring 100% parity. We're just at the beginning.
Speaker 2: What about streaming data? That's not in your current plan.
Speaker 1: Good catch. We're starting with batch ETL to replace SAS, which is easier. But adding streaming later will be much more challenging - real-time processing, event ordering, and handling late-arriving data.
Speaker 2: Please send a short summary after the meeting.
Speaker 1: Sure. I’ll send the Phase 2 plan and timeline today.

## Optional reformulations (use if you want to sound a bit more polished)

- "Phase 1 is complete: 92 datasets migrated; MSSQL now updates daily from SAS."
- "Phase 2 starts now with parallel tracks to hit the Nov 25 release."
- "ELT rebuild in Airflow + dbt with backfills ensures parity and repeatability."
- "UAT/Prod on Docker with RBAC and managed secrets for secure operations."
- "Optional CI/CD and observability improve safety, speed, and visibility."

---

## Weekly status email (B1) — template for Phase 2

### Subject examples

- SAS → MSSQL — Phase 2 Kickoff — Update — 2025-08-15
- DW Migration (MSSQL) — Phase 2 Status — Week 01

### Email body template (≤150 words)

- Summary: Phase 1 complete (92 datasets, daily sync). Phase 2 started. On track for Nov 25.
- Done (this week): Kickoff; plans finalized; access requested; initial ELT scaffolding.
- Next (next week): Start Airflow/dbt rebuild; set up UAT/Prod Docker; define tests/alerts.
- Risks/Blocks: SAS-specific logic mapping — validate in UAT (owner + ETA).
- Need/Ask: Confirm priority datasets; approve env access; agree UAT sign‑off.

### Chat/Slack version (very short)

- Phase 1 complete (92 datasets; daily sync). Phase 2 started. Tracks: ELT rebuild, UAT/Prod on Docker, optional CI/CD, optional DQ/observability, docs. Aim: release by Nov 25, then ~5 weeks of side-by-side with SAS.
