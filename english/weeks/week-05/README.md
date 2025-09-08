# Week 05 – Orchestration design (Airflow/Dagster)

## Outcomes (by end of week)

- Explain your orchestration choices and justify dependencies/retries/SLAs.
- Use 6–8 chunks around DAG design, idempotency, sensors, failure modes.
- Handle objections about reliability and maintainability.

## Inputs (choose 1–2)

- Article/talk on Airflow or Dagster best practices
- Internal doc on your orchestration standards

## Chunk Bank (8–12)

- DAG; task dependencies; sensors; deferrable operators
- idempotent tasks; retries; backoff; alerts
- dynamic mapping; task groups; modular DAGs
- SLAs vs SLOs; late tasks; critical path
- failure modes; retries exhausted; on-failure callbacks
- deployment; CI/CD; versioning; secrets
- observability; logs; lineage integration
- ownership; runbook; handover

## Grammar/Pronunciation Focus

- **Grammar**: Relative clauses for technical definitions ("A DAG is a workflow that...")
- **Grammar**: Reported speech for stakeholder updates ("The team says that...")
- **Grammar**: Mixed conditionals for hypotheticals ("If we had implemented...")
- **Grammar**: Cleft sentences for emphasis ("It was the retry mechanism that...")
- **Grammar**: Presentation language for technical discussions
- **Pronunciation**: Clear articulation of technical terms and acronyms
- **Echoing**: Practice technical vocabulary and sentence patterns

## Daily Plan (B1 Level, Speaking-First)

- **Mon**: Input + shadowing; chunks to SRS (45 min)
- **Tue**: PREP: why this orchestration design (30 min)
- **Wed**: Role-play: defend sensors vs polling; retries/backoff (35 min)
- **Thu**: Writing-to-speaking: runbook excerpt → 2-min talk (40 min)
- **Fri**: Simulation: Design review Q&A (45 min)
- **Sat**: Retell without notes; record (30 min)
- **Sun**: Light review; plan next week (20 min)

**Total**: ~4.5 hours/week, 60%+ speaking practice

## Exercises & Prompts

- Problem–Solution–Impact: Retry storm and your mitigation
- Compare–Contrast–Recommend: Airflow vs Dagster for your team
- Role-play prompt:

  ```text
  You are a staff engineer questioning orchestration complexity. Topic: Airflow/Dagster design. Ask about idempotency, retries, and ownership. After 6–8 minutes, give me 3 reformulations.
  ```

## Checklist (B1 Level)

- [ ] 5+ sessions completed (60%+ speaking time)
- [ ] 2 recordings (2-3 min talks)
- [ ] 6–8 chunks added & used naturally
- [ ] One error added to personal doc and addressed
- [ ] Grammar patterns practiced in context
- [ ] Technical vocabulary mastered (8-10 terms)
- [ ] Echoing practice completed daily
