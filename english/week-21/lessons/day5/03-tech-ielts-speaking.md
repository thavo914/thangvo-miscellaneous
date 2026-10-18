---
title: "Day 5 - Exercise 3: Tech IELTS Speaking Practice & System Optimization"
week: 21
day: 5
block: 2
duration: "20 Mins"
category: "Weekly Curriculum"
subcategory: "Week 21"
exercise_type: "tech_ielts_speaking"
target_level: "IELTS Band 6.5 / CEFR B1-B2"
drills_included: true
date: 2026-10-18
---

# Day 5 - Exercise 3: Tech IELTS Speaking Practice & System Optimization

> [!NOTE]
> **Block 2 (Part B)**: Prepare structured spoken answers for technical interviews and architectural discussions using IELTS-style questioning.

---

## 🎙️ Part 1: Technical Interview Questions (3–4 Minutes)

> [!TIP]
> **5W1H Framework Rule**: For technical Q&A, state a direct technical answer immediately, then support it with 1–2 practical details covering **Why**, **When**, or **How**.

### Question 1: How do modern companies balance operational costs with system performance?
* **Framework Breakdown (5W1H)**:
  * **[Direct Answer - What/How]**: *"Most tech teams schedule compute-heavy workloads to **run off-peak** during midnight **off-peak hours** when cloud spot instances are much cheaper."*
  * **[Supporting Detail - Why/Outcome]**: *"This enables organizations to cut infrastructure spending significantly **without compromising quality** or SLA commitments."*
* **Full Spoken Flow**:  
  > *"Most tech teams schedule compute-heavy workloads to **run off-peak** during midnight **off-peak hours** when cloud spot instances are much cheaper. This enables organizations to cut infrastructure spending significantly **without compromising quality** or SLA commitments."*
* **Key Expressions**:
  * `run off-peak` / `off-peak hours` *(chạy vào giờ thấp điểm)*
  * `without compromising quality` *(mà không đánh đổi chất lượng)*

### Question 2: Why do engineers often push back when management wants to rush a product release?
* **Framework Breakdown (5W1H)**:
  * **[Direct Answer - Why]**: *"Engineers push back because rushing usually leads to cutting corners on architectural testing."*
  * **[Supporting Detail - How/Impact]**: *"Skipping integration checks will **compromise data integrity** and create massive technical debt, so senior engineers refuse to **take system stability for granted**."*
* **Full Spoken Flow**:  
  > *"Engineers push back because rushing usually leads to cutting corners on architectural testing. Skipping integration checks will **compromise data integrity** and create massive technical debt, so senior engineers refuse to **take system stability for granted**."*
* **Key Expressions**:
  * `compromise data integrity` *(làm suy giảm tính toàn vẹn dữ liệu)*
  * `take system stability for granted` *(chủ quan coi độ ổn định là hiển nhiên)*

### Question 3: What are the fundamental qualities of a scalable data architecture?
* **Framework Breakdown (5W1H)**:
  * **[Direct Answer - What]**: *"Clean modular interfaces and idempotent data pipelines are **the building blocks of** any scalable platform."*
  * **[Supporting Detail - How/Why]**: *"When individual microservices or workers fail, they can be swapped out or restarted easily without taking down the entire production cluster."*
* **Full Spoken Flow**:  
  > *"Clean modular interfaces and idempotent data pipelines are **the building blocks of** any scalable platform. When individual microservices or workers fail, they can be swapped out or restarted easily without taking down the entire production cluster."*
* **Key Expressions**:
  * `the building blocks of [something]` *(những viên gạch nền móng)*

---

## 📋 Part 2: Individual Long Turn (Tech Cue Card)

### Candidate Task Card

```text
Describe a technical optimization or process improvement you worked on to save resources or improve performance without lowering standards.

You should say:
• What the system or process was
• What problem was causing high cost or poor performance
• What specific action you recommended or took
And explain what the result was and why it was achieved without compromising quality.
```

### 🎯 1-Minute Preparation Scratchpad (Structured via 5W1H)

| 5W1H Question | Scratchpad Brainstorming Notes |
| :--- | :--- |
| **Who** | Our data engineering team and downstream analytics stakeholders |
| **What** | Optimizing an ETL data pipeline & replacing legacy cron scripts with Spark |
| **Where** | Production AWS cloud infrastructure and analytics dashboards |
| **When** | Last quarter during a quarterly cost optimization initiative |
| **Why** | Daytime batch jobs overloaded relational DB, causing timeouts and high AWS bills |
| **How** | Rescheduled jobs to *run off-peak* (2:00 AM–4:00 AM); *legacy scripts were being replaced*; slashed bills by 30% *without compromising quality* |

### Model Band 6.5–7.0 Spoken Response (5W1H Progression)

* **[When & Who & Where - Context]**:  
  > *"I'd like to talk about an infrastructure optimization initiative I spearheaded last quarter at my company. Our data engineering team maintains a large analytics pipeline that ingests millions of user events every day."*

* **[What Problem & Why It Was Urgent]**:  
  > *"The main problem was that our transformation jobs were running right in the middle of peak business hours. Because cloud compute pricing is much higher during the day and our relational database was already under heavy load from live users, this setup was driving up our monthly AWS bill and causing frequent query timeouts."*

* **[What Action & How Implemented]**:  
  > *"To solve this, I proposed two main adjustments. First, I restructured our workflow orchestration so that all heavy aggregation queries **run off-peak**, specifically between 2:00 AM and 4:00 AM during midnight **off-peak hours** when spot instance pricing drops by nearly 40%. Second, our legacy cron scripts **were being replaced with** a distributed Spark job that processed partitions in parallel."*

* **[Result & Final Satisfaction / Outcome]**:  
  > *"**One of the reasons** this approach worked so well was because we proved that cost reduction could be achieved **without compromising quality**. Our stakeholder dashboards were fully refreshed before anyone arrived at the office at 8:00 AM, and our data accuracy remained 100% consistent. We managed to slash our monthly cloud bill by over 30% while making the entire system much more resilient."*

---

## 💬 Part 3: Analytical Discussion (Tech Operations & Trade-offs)

> [!TIP]
> **O-R-E-O Framework Rule**: For high-band analytical answers, structure your thoughts with:
> 1. **O (Opinion)**: Direct, clear engineering stance.
> 2. **R (Reason)**: Root cause or technical rationale (*The reason is... / This is because...*).
> 3. **E (Example)**: Concrete technical scenario (*For example / In practice...*).
> 4. **O (Outcome / Synthesis)**: High-level architectural takeaway (*Ultimately / Therefore...*).

### Question 1: Is it always wise for companies to pursue the lowest possible infrastructure cost?

* **O - Opinion**: *"Pursuing the lowest possible infrastructure cost is not always wise if it leaves zero margin for system resilience."*
* **R - Reason**: *"The reason is that aggressive cost-cutting can easily **compromise system reliability** and create fragile single points of failure."*
* **E - Example**: *"For example, if an engineering squad downsizes compute instances excessively or removes multi-region failover to save a few hundred dollars, a sudden traffic spike will trigger an outage that costs ten times more in lost revenue."*
* **O - Outcome**: *"Therefore, technical leaders must always balance frugality with operational resilience rather than prioritizing cost in a vacuum."*

* **Full Spoken Flow**:  
  > *"Pursuing the lowest possible infrastructure cost is not always wise if it leaves zero margin for system resilience. The reason is that aggressive cost-cutting can easily **compromise system reliability** and create fragile single points of failure. For example, if an engineering squad downsizes compute instances excessively or removes multi-region failover to save a few hundred dollars, a sudden traffic spike will trigger an outage that costs ten times more in lost revenue. Therefore, technical leaders must always balance frugality with operational resilience rather than prioritizing cost in a vacuum."*

### Question 2: How can engineering teams avoid taking their system reliability for granted?

* **O - Opinion**: *"Teams must actively maintain a proactive disaster recovery culture rather than assuming systems will run smoothly on their own."*
* **R - Reason**: *"This is because when a platform has been stable for months, it is very easy for engineers to become complacent and **take uptime for granted**."*
* **E - Example**: *"For instance, forward-thinking organizations run scheduled chaos engineering drills, deliberately injecting network latency or simulating disk failures to ensure that failover mechanisms work as expected."*
* **O - Outcome**: *"Ultimately, continuous drill practice keeps on-call engineers alert and guarantees that automated recovery pipelines work reliably when real emergencies strike."*

* **Full Spoken Flow**:  
  > *"Teams must actively maintain a proactive disaster recovery culture rather than assuming systems will run smoothly on their own. This is because when a platform has been stable for months, it is very easy for engineers to become complacent and **take uptime for granted**. For instance, forward-thinking organizations run scheduled chaos engineering drills, deliberately injecting network latency or simulating disk failures to ensure that failover mechanisms work as expected. Ultimately, continuous drill practice keeps on-call engineers alert and guarantees that automated recovery pipelines work reliably when real emergencies strike."*
