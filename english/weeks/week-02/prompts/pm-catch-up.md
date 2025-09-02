# Full practice conversation (B1) — Catching up with PM on Batch vs. Streaming Decision

Direction: Read aloud in a confident, analytical tone. Use clear B1 sentences with technical precision. Keep answers concise but thorough (2-3 sentences). Participants: Speaker 1 (you), Speaker 2 (PM).

## Main Conversation

Speaker 2: Thanks for the time. Can you walk me through the batch vs. streaming decision?
Speaker 1: We analyzed both options. Batch is cheaper and simpler to operate, but streaming gives us real-time data. For our use case, I recommend starting with batch.
Speaker 2: What's the cost difference?
Speaker 1: Batch costs about 60% less to run. We save on infrastructure and operational overhead. Streaming requires more compute and monitoring.
Speaker 2: What about data freshness?
Speaker 1: Batch gives us data within 2-4 hours. Streaming would be near real-time. But our business users don't need real-time for most decisions.
Speaker 2: How complex is each option?
Speaker 1: Batch is much simpler. We use existing tools and patterns. Streaming adds complexity with backpressure handling and exactly-once processing.
Speaker 2: What are the reliability concerns?
Speaker 1: Batch is more predictable. If it fails, we can rerun easily. Streaming has more failure points and requires careful error handling.
Speaker 2: Can we scale batch if needed?
Speaker 1: Yes, we can optimize batch processing. We'll use incremental models and parallel processing. If we need faster updates later, we can add micro-batches.
Speaker 2: What's the timeline impact?
Speaker 1: Batch gets us to production in 3 months. Streaming would add 2-3 months for setup and testing. We can deliver value faster with batch.
Speaker 2: What if business requirements change?
Speaker 1: We can evolve the architecture. Start with batch, then add streaming components for specific use cases that need real-time data.
Speaker 2: What are the operational risks?
Speaker 1: Batch has lower operational burden. Less on-call complexity, fewer failure modes. Streaming requires 24/7 monitoring and incident response.
Speaker 2: How do we handle late-arriving data?
Speaker 1: Batch handles this well with backfills. We can reprocess historical data easily. Streaming requires more complex logic for late data.
Speaker 2: What's your recommendation?
Speaker 1: Start with batch processing. It's cost-effective, reliable, and gets us to market faster. We can add streaming later for specific real-time needs.
Speaker 2: What's the next step?
Speaker 1: I'll create a detailed implementation plan for batch processing. We'll start with core data pipelines and add monitoring.
Speaker 2: When can we review the plan?
Speaker 1: I'll have the detailed plan ready by Friday. We can review it together and get stakeholder approval.
Speaker 2: Any dependencies we need to address?
Speaker 1: We need to confirm the data sources and get access to the target systems. I'll work with the platform team on infrastructure setup.
Speaker 2: What's the budget impact?
Speaker 1: Batch processing fits within our current budget. We'll need some additional compute resources, but it's manageable.
Speaker 2: How do we measure success?
Speaker 1: We'll track data freshness, processing time, and cost per record. We'll also monitor data quality and business user satisfaction.
Speaker 2: What's the rollback plan?
Speaker 1: If batch doesn't meet requirements, we can pivot to streaming. We'll keep the data models compatible with both approaches.
Speaker 2: Thanks for the overview. Send me the detailed plan by Friday.
Speaker 1: Will do. I'll include cost estimates, timeline, and risk mitigation strategies in the plan.

## Key Phrases to Practice

- "Batch processing is more cost-effective and operationally simpler."
- "We can deliver value faster with batch while maintaining flexibility for future changes."
- "The trade-off is between real-time data and operational complexity."
- "We'll start with batch and can evolve to streaming for specific use cases."
- "Batch handles late-arriving data more gracefully than streaming."

## Optional Reformulations (for more polished delivery)

- "Our analysis shows that batch processing offers the best balance of cost, complexity, and time-to-market for our current requirements."
- "While streaming provides real-time capabilities, the additional operational overhead and cost don't justify the benefits for our use case."
- "We're designing the architecture to be flexible, allowing us to add streaming components later without major refactoring."

## Follow-up Actions

1. Create detailed implementation plan
2. Review with technical stakeholders
3. Prepare cost-benefit analysis
4. Set up monitoring and success metrics
5. Plan stakeholder communication strategy
