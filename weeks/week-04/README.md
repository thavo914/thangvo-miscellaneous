# Week 04 – Spark performance tuning

## Outcomes (by end of week)

- Explain a tuning approach and justify trade-offs.
- Use 6–8 chunks on partitioning, shuffle, skew, caching.
- Tell a before/after story with measurable impact.

## Inputs (choose 1–2)

- Talk/article on Spark performance best practices
- Company/internal doc on a perf win

## Chunk Bank (8–12)

- partitioning strategy; predicate pushdown; file sizes
- shuffle; skew; broadcast join; AQE
- cache/persist strategy; spilling; memory pressure
- cluster sizing; autoscaling; spot instances
- job DAG; critical path; bottleneck analysis
- metrics: runtime, cost, CPU-hours
- backpressure; retries; idempotent writes
- end-to-end improvement; regression

## Grammar/Pronunciation Focus

- Grammar: Participle clauses for compactness ("Given X, optimizing Y reduces Z")
- Pronunciation: Numbers, ranges, and percentages clearly

## Daily Plan

- Mon: Input + shadowing; chunks to SRS
- Tue: PREP: tuning framework; 4-3-2 drill
- Wed: Role-play: defend costs vs runtime
- Thu: Writing-to-speaking: perf report → 2-min talk
- Fri: Simulation: Perf review with stakeholders
- Sat: Retell without notes; record
- Sun: Light review; plan next week

## Exercises & Prompts

- Problem–Solution–Impact: Skew → mitigation → improvement
- Compare–Contrast–Recommend: Broadcast vs shuffle join
- Role-play prompt:

  ```text
  You are a platform lead pushing for lower run costs. Topic: Spark performance tuning. Challenge assumptions, ask for metrics. After 6–8 minutes, give me 3 reformulations.
  ```

## Checklist

- [ ] 5+ sessions completed
- [ ] 2 recordings
- [ ] 6–8 chunks added & used
- [ ] One error added to personal doc and addressed
