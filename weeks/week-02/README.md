# Week 02 – Batch vs. streaming trade-offs

## Outcomes (by end of week)

- Explain trade-offs clearly and make a recommendation under constraints.
- Use 6–8 chunks about latency, cost, reliability, complexity.
- Handle pushback with paraphrasing and reformulations.

## Inputs (choose 1–2)

- Talk/article comparing batch and streaming architectures
- Case study on streaming adoption or rollback

## Chunk Bank (8–12)

- latency budget; freshness; end-to-end SLA
- exactly-once vs at-least-once vs idempotent
- operational overhead; on-call burden
- total cost of ownership; run cost; data egress
- failure domains; backpressure; scaling characteristics
- degrade gracefully; replay; checkpointing
- eventual consistency; consumer expectations
- recommendation given constraints …

## Grammar/Pronunciation Focus

- Grammar: Clefts for emphasis ("What really matters is reliability under spikes.")
- Pronunciation: Contrastive stress for trade-offs

## Daily Plan

- Mon: Input + shadowing; chunks to SRS
- Tue: Compare–Contrast–Recommend; 4-3-2 drill
- Wed: Objection handling role-play
- Thu: Writing-to-speaking (pros/cons table → 2-min talk)
- Fri: Simulation: Stakeholder review; defend your choice
- Sat: Retell without notes; record
- Sun: Light review; plan next week

## Exercises & Prompts

- Compare–Contrast–Recommend: Streaming vs Batch for `your use case`.
- Problem–Solution–Impact: Backpressure incident and mitigation.
- PREP: "We should keep batch for now because …"
- Role-play prompt:

  ```text
  You are a skeptical finance lead challenging run costs and complexity. Topic: Batch vs streaming trade-offs. Interrupt, ask for numbers, and push on reliability. After 6–8 minutes, give me 3 reformulations.
  ```

## Checklist

- [ ] 5+ sessions completed
- [ ] 2 recordings
- [ ] 6–8 chunks added & used
- [ ] One error added to personal doc and addressed
