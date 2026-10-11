---
title: "Day 5 - Exercise 3: Tech-Adjacent IELTS Speaking Practice"
week: 20
day: 5
block: 2
duration: "25 Mins"
category: "Weekly Curriculum"
subcategory: "Week 20"
exercise_type: "tech-ielts-speaking"
target_level: "IELTS Band 6.5 / CEFR B1-B2"
drills_included: true
date: 2026-10-11
---

# Day 5 - Exercise 3: Tech-Adjacent IELTS Speaking Practice (25 Mins)

> [!NOTE]
> **Block 2 (Part B)**: Structured spoken IELTS practice tailored to engineering operations, software budgeting, and technical problem-solving.

---

## 🗣️ Part 1: Introductory Interview (3 Questions)

Answer out loud in 3–4 sentences per question.

### Question 1: Do you rely heavily on cloud storage or automated services in your daily work?
* **Model Answer Framework**:
  > *"Yes, absolutely. In data engineering, almost all our ingestion pipelines and database clusters reside in the cloud. Using automated cloud infrastructure allows our team to **guarantee flexibility** and scale compute resources on demand without managing physical hardware in a server room."*

### Question 2: How do you react when a software tool or service you use raises its prices?
* **Model Answer Framework**:
  > *"It's always frustrating when a vendor **has raised its prices**, especially if our budget is already tight. When that happens, I usually look into open-source alternatives or explore whether we can optimize our usage, so we don't end up **throwing money down the drain** on idle features."*

### Question 3: What do you do when a computer or software service starts acting up?
* **Model Answer Framework**:
  > *"Whenever a service starts **acting up**, my first instinct is to check the system logs and resource utilization metrics. Often, it's just a memory leak or an unindexed query, **as those things often do** happen during high traffic. Once I isolate the bottleneck, I restart the affected container or apply an index."*

---

## 📇 Part 2: Long Turn (Cue Card)

You have 1 minute to take notes and 2 minutes to speak uninterrupted.

```text
Describe a technical problem or system issue you helped resolve at work.

You should say:
• What the system or problem was
• How you diagnosed and investigated the issue
• What solution you proposed and implemented
And explain how the outcome turned out for your team or organization.
```

### 💡 Brainstorming Bullet Points:
* **The Problem**: A high-volume ingestion pipeline was experiencing consumer lag, and database storage was becoming **a money pit** due to massive unpartitioned audit logs.
* **The Diagnosis**: The caching layer was **acting up** during peak load, causing write timeouts.
* **The Solution**: Proposed: *"Say we partition the table by month and migrate historical data to S3."* Enforced **the maximum amount of** memory allocated per batch job.
* **The Outcome**: Was **able to successfully** cut storage costs by 40%, eliminate lag, and the review **was held on Zoom** where leadership approved the full migration.

---

## 💬 Part 3: Analytical Discussion (2 Questions)

### Question 1: What are the main trade-offs between using managed cloud vendors versus building self-hosted solutions?
* **Key Arguments**:
  1. *Managed vendors*: Speed, automatic backups, high availability; but high risk of vendor lock-in and vendor price hikes that can turn tools into money pits.
  2. *Self-hosted*: Complete control, guarantees flexibility, zero licensing fees; but requires substantial engineering hours to maintain.
  3. *Sentence Starter*: *"There is a clear **trade-off between cost and operational overhead involved**. In my experience, **a mix of both** works best: managed services for core databases, and open-source tools for pipeline orchestration."*

### Question 2: How can companies encourage technical teams to build cost-effective architectures?
* **Key Arguments**:
  1. *Visibility*: Provide transparent monthly cloud billing dashboards so engineers see the cost impact of their queries.
  2. *Incentives*: Celebrate cost optimization wins in sprint retrospectives rather than just shipping features fast.
  3. *Sentence Starter*: *"Engineers often focus solely on performance and forget cost. By setting up automated alerts before a cluster becomes **a money pit**, companies can help teams eliminate waste before bills spike."*
