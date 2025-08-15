# Full practice conversation (B1) — Internal status update on MSSQL warehouse (from SAS)

- **PM**: Thanks for joining. Can you give us a quick update?
- **You**: Yes, sure. We built the dev environment with Airflow, dbt, and MSSQL. I designed the first tables and tested the full flow end to end.
- **PM**: Can you read data from the current SAS system?
- **You**: Yes. Daniel gave me the handover. I can read SAS datasets and load them into MSSQL.
- **PM**: What is done so far, exactly?
- **You**: Daily ingestion is running in dev. We have bronze and silver tables for customer and orders. Basic dbt tests pass.
- **PM**: What’s the plan for the next two weeks?
- **You**: I will migrate the needed SAS datasets to MSSQL and keep them up to date, so the report team can start using them.
- **PM**: Good. What’s the main risk?
- **You**: Some SAS jobs use custom formats. We may need extra mapping time. I will work with Daniel and a business SME.

- **Finance**: Do we need more budget now?
- **You**: No new budget now. We optimize for reliability first, then reduce cost after the first release.
- **Finance**: Timeline risk?
- **You**: The plan is realistic. If we hit a heavy format issue, I’ll flag it the same day.

- **Platform Lead**: How is performance in MSSQL?
- **You**: Early tests are okay. If joins are slow, I will add indexes and use incremental models.
- **Platform Lead**: Do we have monitoring?
- **You**: In Month 3 we will add alerts and quality checks. For now, dbt tests run on each build.

- **PM**: What is the larger plan this year?
- **You**: We plan to build the full ELT pipeline for MSSQL in 3 months. After that, we run MSSQL and SAS in parallel for 6 weeks to compare data and performance before year-end.
- **PM**: Why do we need parallel run?
- **You**: To check data parity and runtime safely. We compare daily KPIs and fix gaps before we switch.

- **PM**: Can you outline the 3-month plan?
- **You**: Month 1: source ingestion, bronze/silver, basic tests. Month 2: gold models, more tests, data contracts. Month 3: monitoring, cost checks, backfills, docs.
- **PM**: When can the report team start?
- **You**: They can start on the first MSSQL tables in the next two weeks, and we add more tables each week.

- **Finance**: What if numbers don’t match SAS?
- **You**: During the 6-week parallel run, we compare KPIs daily. If there’s a mismatch, we fix it before cutover.

- **Platform Lead**: Any data quality issues now?
- **You**: About 97% passed. The last 3% is due to one SAS discount format. I will map it this week.

- **PM**: What do you need from us?
- **You**: Please confirm the top-priority datasets for Week 1, assign one SME for discount rules, and approve the 2-week migration window.

- **PM**: Final question: can we move faster?
- **You**: We can go faster, but it increases risk. I prefer safe steps: stable data first, then speed and cost optimization.

- **PM**: Okay. Please send a short summary after the meeting.
- **You**: Sure. I’ll send the summary and the priority list request today.

## Optional reformulations (use if you want to sound a bit more polished)

- “We are on track to deliver the first MSSQL tables for reporting in the next two weeks.”
- “The only notable risk is custom SAS formats; I’ll work with Daniel and an SME to map them.”
- “We’ll run SAS and MSSQL in parallel for six weeks to validate data parity and performance before cutover.”
