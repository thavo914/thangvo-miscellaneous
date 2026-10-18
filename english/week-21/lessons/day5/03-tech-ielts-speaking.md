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

### Question 1: How do modern companies balance operational costs with system performance?
* **Model Response**:  
  > *"Most tech teams schedule compute-heavy workloads to **run off-peak** during midnight **off-peak hours** when cloud spot instances are much cheaper. This enables organizations to cut infrastructure spending significantly **without compromising quality** or SLA commitments."*
* **Key Expressions**:
  * `run off-peak` / `off-peak hours` *(chạy vào giờ thấp điểm)*
  * `without compromising quality` *(mà không đánh đổi chất lượng)*

### Question 2: Why do engineers often push back when management wants to rush a product release?
* **Model Response**:  
  > *"Because rushing usually leads to cutting corners on testing. Senior engineers know that skipping integration checks will **compromise data integrity** and create massive technical debt down the road. They refuse to **take system stability for granted**."*
* **Key Expressions**:
  * `compromise data integrity` *(làm suy giảm tính toàn vẹn dữ liệu)*
  * `take system stability for granted` *(chủ quan coi độ ổn định là hiển nhiên)*

### Question 3: What are the fundamental qualities of a scalable data architecture?
* **Model Response**:  
  > *"Clean modular interfaces and idempotent data pipelines are **the building blocks of** any scalable platform. When individual components fail, they can be swapped out easily without taking down the entire service."*
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

### 🎯 1-Minute Preparation Scratchpad
* **Topic**: Optimizing an ETL data pipeline by scheduling it off-peak and replacing legacy scripts with Spark.
* **Key Target Vocab to Include**:
  * *run off-peak / off-peak hours*
  * *the legacy batch pipeline was being replaced*
  * *without compromising data accuracy*
  * *one of the reasons was because of...*

### Model Band 6.5–7.0 Spoken Response
> *"I'd like to talk about an infrastructure optimization initiative I spearheaded last quarter at my company. Our data engineering team maintains a large analytics pipeline that ingests millions of user events every day.
> 
> The main problem was that our transformation jobs were running right in the middle of peak business hours. Because cloud compute pricing is much higher during the day and our relational database was already under heavy load from live users, this setup was driving up our monthly AWS bill and causing frequent query timeouts.
> 
> To solve this, I proposed two main adjustments. First, I restructured our workflow orchestration so that all heavy aggregation queries **run off-peak**, specifically between 2:00 AM and 4:00 AM during midnight **off-peak hours** when spot instance pricing drops by nearly 40%. Second, our legacy cron scripts **were being replaced with** a distributed Spark job that processed partitions in parallel.
> 
> **One of the reasons** this approach worked so well was because we proved that cost reduction could be achieved **without compromising quality**. Our stakeholder dashboards were fully refreshed before anyone arrived at the office at 8:00 AM, and our data accuracy remained 100% consistent. We managed to slash our monthly cloud bill by over 30% while making the entire system much more resilient."*

---

## 💬 Part 3: Analytical Discussion (Tech Operations & Trade-offs)

### Question 1: Is it always wise for companies to pursue the lowest possible infrastructure cost?
* **Model Response**:  
  > *"Not necessarily. While cost optimization is important, aggressive cost-cutting can easily **compromise system reliability**. If a team downsizes instances too much or eliminates redundancy to save a few dollars, a single spike in traffic could cause an outage. In engineering, you have to balance frugality with resilience."*

### Question 2: How can engineering teams avoid taking their system reliability for granted?
* **Model Response**:  
  > *"Teams must proactively practice disaster recovery and chaos testing. When a service has run smoothly for months, it's very easy to **take uptime for granted**. Regularly simulating hardware failures and practicing failovers ensures that engineers remain alert and capable of resolving real outages quickly."*
