# Week 05 - Role-Play: Orchestration Design Defense

## Scenario Setup

**Your Role**: Senior Data Engineer defending orchestration design choices
**Partner's Role**: Staff Engineer questioning complexity and reliability
**Context**: Design review meeting for new Airflow/Dagster implementation
**Duration**: 6-8 minutes

## Key Topics to Cover

### 1. Idempotency & Task Design
**Expected Questions**:
- "How do you ensure tasks are truly idempotent?"
- "What happens when a task fails mid-execution?"
- "How do you handle partial failures in complex workflows?"

**Your Defense Points**:
- Explain idempotent task design principles
- Discuss state management and cleanup procedures
- Provide examples of safe retry behavior

### 2. Retry Strategy & Backoff
**Expected Questions**:
- "Why did you choose exponential backoff over linear retry?"
- "How do you prevent retry storms across multiple DAGs?"
- "What's your strategy for handling persistent failures?"

**Your Defense Points**:
- Justify retry configuration choices
- Explain circuit breaker patterns
- Discuss failure isolation strategies

### 3. Ownership & Maintenance
**Expected Questions**:
- "Who owns these DAGs when the original developer leaves?"
- "How do you ensure new team members can maintain this complexity?"
- "What's your strategy for documentation and runbooks?"

**Your Defense Points**:
- Explain ownership model and handover procedures
- Discuss documentation standards and training
- Provide examples of maintainable design patterns

## Sample Conversation Flow

### Opening (1 minute)
**Staff Engineer**: "I'm concerned about the complexity of this orchestration design. Can you walk me through your key design decisions?"

**Your Response**: "Absolutely. Let me start with our core principles: idempotency, observability, and maintainability..."

### Deep Dive (4-5 minutes)
**Staff Engineer**: "I see you're using deferrable operators. How do you handle the complexity of state management?"

**Your Response**: "Great question. Deferrable operators actually simplify state management because..."

### Closing (1-2 minutes)
**Staff Engineer**: "What's your biggest concern about this design?"

**Your Response**: "My main concern is ensuring the team can maintain this as we scale..."

## Key Phrases to Use

### Defending Design Choices
- "We chose this approach because..."
- "The trade-off we're making is..."
- "This design pattern ensures that..."
- "Our experience shows that..."

### Addressing Concerns
- "I understand your concern about..."
- "Let me explain how we mitigate that risk..."
- "That's a valid point, and here's how we handle it..."
- "We've considered that scenario, and our approach is..."

### Providing Evidence
- "Our monitoring shows that..."
- "The metrics demonstrate that..."
- "We've tested this under load and..."
- "Historical data indicates that..."

## Post-Conversation Reflection

After the role-play, provide 3 reformulations of key points:

### Reformulation 1: For Technical Team
"Based on our discussion, the key architectural decisions are: idempotent task design prevents data corruption, exponential backoff with jitter reduces retry storms, and comprehensive documentation ensures maintainability."

### Reformulation 2: For Management
"The orchestration design prioritizes reliability over simplicity. While it requires more upfront investment, it reduces operational overhead and prevents costly failures in production."

### Reformulation 3: For New Team Members
"Here's how to understand our orchestration design: every task is designed to be safely retryable, failures are isolated to prevent cascading issues, and everything is documented for easy maintenance."

## Practice Tips

1. **Prepare Examples**: Have specific examples ready for each design choice
2. **Know Your Metrics**: Be ready to cite performance improvements
3. **Acknowledge Trade-offs**: Don't oversell - acknowledge limitations
4. **Stay Calm**: Handle challenging questions with confidence
5. **Use Visual Aids**: Reference diagrams or code examples when helpful

## Common Objections & Responses

### "This is too complex"
**Response**: "I understand the concern. Let me show you how this complexity actually reduces operational burden..."

### "What if it fails?"
**Response**: "That's exactly why we've built in multiple layers of protection..."

### "How do we maintain this?"
**Response**: "Great question. We've designed this with maintainability as a core principle..."

### "Is this over-engineered?"
**Response**: "I appreciate that perspective. Let me explain why each component is necessary..."

## Success Criteria

- [ ] Successfully defended all three key topics
- [ ] Used advanced grammar patterns naturally
- [ ] Handled objections with confidence
- [ ] Provided specific examples and evidence
- [ ] Demonstrated clear communication skills
- [ ] Completed within time limit
- [ ] Provided 3 reformulations afterward
