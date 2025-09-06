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

- Grammar: Inversion for emphasis ("Only when dependencies are explicit do failures localize.")
- Grammar: Advanced patterns - relative clauses, reported speech, mixed conditionals, cleft sentences
- Grammar: Echoing method for speaking practice and pronunciation improvement
- Grammar: Presentation language for technical discussions
- Pronunciation: Clear articulation of acronyms and initialisms

## Daily Plan

- Mon: Input + shadowing; chunks to SRS
- Tue: PREP: why this orchestration design
- Wed: Role-play: defend sensors vs polling; retries/backoff
- Thu: Writing-to-speaking: runbook excerpt → 2-min talk
- Fri: Simulation: Design review Q&A
- Sat: Retell without notes; record
- Sun: Light review; plan next week

## Exercises & Prompts

- Problem–Solution–Impact: Retry storm and your mitigation
- Compare–Contrast–Recommend: Airflow vs Dagster for your team
- Role-play prompt:

  ```text
  You are a staff engineer questioning orchestration complexity. Topic: Airflow/Dagster design. Ask about idempotency, retries, and ownership. After 6–8 minutes, give me 3 reformulations.
  ```

## Checklist

- [ ] 5+ sessions completed
- [ ] 2 recordings
- [ ] 6–8 chunks added & used
- [ ] One error added to personal doc and addressed
