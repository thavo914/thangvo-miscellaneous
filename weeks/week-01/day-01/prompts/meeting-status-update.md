# Full practice conversation (B1) — Internal status update on MSSQL warehouse (from SAS)

Direction: Read aloud in a warm, welcoming tone. Use clear B1 sentences. Keep answers concise (1–2 sentences). Participants: Speaker 1 (you), Speaker 2 (PM).


Speaker 2: Thanks for joining. Can you give us a quick update?
Speaker 1: We’re on track. Daily loads run in dev, and the first tables are ready. Next, we’ll migrate the SAS datasets this week.
Speaker 2: Which tables are ready?
Speaker 1: Customer and orders. Bronze and silver are ready; basic dbt tests pass.
Speaker 2: And can you read data from SAS now?
Speaker 1: Yes. Daniel handed over the SAS side. I can read SAS datasets and load them into MSSQL.
Speaker 2: Any risks we should know about?
Speaker 1: Some SAS jobs use custom formats. We may need extra mapping time. I’ll work with Daniel and a business SME.
Speaker 3: Do you need more budget now?
Speaker 1: No, not now. We optimize for reliability first, then reduce cost after the first release.
Speaker 3: How is performance so far?
Speaker 1: Early tests look okay. If joins are slow, I’ll add indexes and use incremental models.
Speaker 2: What’s the plan for the next two weeks?
Speaker 1: Migrate the needed SAS datasets to MSSQL and keep them up to date, so the report team can start using them.
Speaker 2: What is the larger plan this year?
Speaker 1: Build the full MSSQL ELT pipeline in 3 months. I’d like to do the DW migration first, because Titus’s team needs time to get familiar with MSSQL. Then we run MSSQL and SAS in parallel for 6 weeks to compare data and performance before year‑end.
Speaker 2: Why the parallel run?
Speaker 1: To check data parity and runtime safely. We’ll compare daily KPIs and fix gaps before we switch.
Speaker 2: Can you outline the 3‑month plan?
Speaker 1: Month 1: source ingestion, bronze/silver, basic tests. Month 2: gold models, more tests, data contracts. Month 3: monitoring, cost checks, backfills, docs.
Speaker 3: When can we start using MSSQL tables?
Speaker 1: In the next two weeks. We’ll add more tables each week.
Speaker 3: What if numbers don’t match SAS?
Speaker 1: During the 6‑week parallel run, we compare KPIs daily. If numbers don’t match, we fix them before cutover.
Speaker 3: Any data quality issues now?
Speaker 1: About 97% passed. The last 3% is one SAS discount format. I’ll map it this week.
Speaker 2: What do you need from us?
Speaker 1: Please confirm top‑priority datasets for Week 1, assign one SME for discount rules, and approve the 2‑week migration window.
Speaker 2: Can we move faster?
Speaker 1: We can, but risk goes up. I prefer safe steps: stable data first, then speed and cost optimization.
Speaker 2: Okay. Please send a short summary after the meeting.
Speaker 1: Sure. I’ll send the summary and the priority list request today.
Speaker 2: Will you send a weekly status email?
Speaker 1: Yes. I’ll send a short update every Friday morning with: Summary, Done, Next, Risks/Blocks, and Ask. I’ll CC Finance, Platform, the Report Lead, and Daniel.

## Optional reformulations (use if you want to sound a bit more polished)

- “We are on track to deliver the first MSSQL tables for reporting in the next two weeks.”
- “The only notable risk is custom SAS formats; I’ll work with Daniel and an SME to map them.”
- “We’ll run SAS and MSSQL in parallel for six weeks to validate data parity and performance before cutover.”

---

## Weekly status email (B1) — when and template

### Should I send a weekly email?
- Yes, if there is no regular status meeting or stakeholders prefer async updates.
- Yes, if dependencies (PM/Finance/Platform/Report team) need visibility.
- Otherwise, post in the team channel with the same structure.

### When and who
- Send every Friday before 12:00 (or Monday 9:00).
- To: PM, Report team lead, Platform lead, Finance partner, Daniel (SAS owner).

### Subject examples
- DW Migration (MSSQL) — Weekly Update — 2025-08-15
- SAS → MSSQL — Status (Week 06) — Risks & Next Steps

### Email body template (≤150 words)
- Summary: 1–2 sentences (on track / at risk; headline result)
- Done (this week): 3–5 bullets
- Next (next week): 3–5 bullets
- Risks/Blocks: 1–3 bullets (owner + ETA)
- Need/Ask: 1–2 bullets

### Sample (copy/paste)
- Summary: On track. Dev is live (Airflow + dbt + MSSQL). First tables designed and full flow tested. SAS handover completed.
- Done: Daily ingestion running; bronze/silver for customer & orders; dbt tests pass; SAS datasets load to MSSQL.
- Next: Migrate remaining SAS datasets; keep tables up to date for Report team; map custom formats.
- Risks/Blocks: Custom SAS discount format — mapping with Daniel (ETA Wed).
- Need/Ask: Confirm Week‑1 dataset priorities; 1 SME from Finance for discount rules.

### Chat/Slack version (very short)
- On track. Dev live (Airflow+dbt+MSSQL). Bronze/silver for customer & orders; tests pass. Next week: migrate remaining SAS datasets; keep tables fresh. Risk: SAS discount format (fix with Daniel by Wed). Ask: confirm top datasets + Finance SME.
 