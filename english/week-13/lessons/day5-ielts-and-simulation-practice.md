# Day 5: IELTS & Simulation Practice (Navigating Vendor Constraints)

---

## 1. IELTS Speaking Practice Questions

**Part 1 (Interview)**
1. Do you often have to deal with unexpected problems at work? How do you usually handle them?
  - **Your turn**
  - Yes, I often have to deal with unexpected problems at work. I usually handle unexpected problems by assessing the situation and determining the best course of action. Sometimes I need to escalate the issue to my manager or relevant stakeholders for further assistance.
  - Of course, I think unexpected problems are normal at work. But I don't expect them to happen frequently. When they happen, I usually try to solve them as soon as possible. Sometimes I need to ask for help from my colleagues or manager to solve them.
  - No quite often. But sometimes I have to deal with unexpected problems at work. But luckily I always can handle them by myself.
2. Have you ever had to wait a long time to get approval or permission for something at work?
  - **Your turn**
  - Yes, I remember that I had to wait a week to get approval for a new project. Because I need to get approval from my manager and the vendor.
  - Not really. Usually I can get approval within a few days. But last year, I had to wait two weeks to get approval for a new project. 
  - Luckily, now I have a good relationship with my manager and the vendor, so I can get approval within a few days. I don't have to wait too long.
3. Is it easy or difficult to communicate with people outside your company, like suppliers or vendors?
  - **Your turn**
  - Yes, I think I have a good relationship with people outside my company, like suppliers or vendors. Because I always try to communicate with them clearly and effectively.
  - It depends. Sometimes it is easy to communicate with people outside my company, like suppliers or vendors. Because they are usually friendly and helpful. But sometimes it is difficult to communicate with them, because they are usually busy and they don't have time to communicate with me.



**Part 2 (Cue Card)**
Describe a time when you had to find a creative solution to a problem at work.
You should say:
- What the problem was
- Why you couldn't solve it in the usual way
- What alternative solution you came up with
- And explain how you felt about the outcome
**Answer**
- **Sample Answer:**
  > I’d like to talk about a time when I had to tackle a critical data issue at my previous job. We were facing a major challenge with our data warehouse, which business analysts relied on to make daily decisions. The problem was that our data was loaded using traditional batch processing once every 24 hours. This meant our reports were always outdated, and we struggled with data accuracy, especially when records were updated or deleted in the source database throughout the day.
  > 
  > Normally, we would just update the data more often, like every few hours. But we couldn't do this because it would slow down our main database, which could crash the system and affect our users.
  > 
  > To resolve this creatively, I proposed implementing a real-time streaming pipeline using Change Data Capture, or CDC, coupled with Apache Kafka. Instead of querying the database directly, CDC read the database transaction logs to detect any inserts, updates, or deletes instantly. These changes were then published as event streams to Kafka, which seamlessly delivered them to our data warehouse. 
  > 
  > I felt absolutely thrilled with the outcome. We successfully shifted from daily updates to near real-time data freshness, reducing latency from 24 hours to just a few seconds. More importantly, our data accuracy improved dramatically. Seeing the business team make decisions based on live, precise data was incredibly rewarding, and it gave me a massive boost of confidence in my technical problem-solving skills.

- **Structure Breakdown:**
  - **What the problem was:** Traditional daily batch processing caused outdated reports, stale data, and poor accuracy for deleted/updated records.
  - **Why you couldn't solve it normally:** Increasing batch query frequency would put too much load on production databases and degrade performance.
  - **Alternative solution:** Implemented real-time streaming using CDC (reading transaction logs) and Apache Kafka to stream changes instantly.
  - **Feelings about the outcome:** Thrilled and rewarded; reduced latency to sub-seconds, improved data freshness and accuracy, and boosted confidence.

- **Key Vocabulary & Idioms:**
  - *Tackle a critical issue*: To deal with or solve a very important problem.
  - *Workaround*: A temporary or alternative method to solve a problem.
  - *Degrade performance*: To reduce the speed or efficiency of a system.
  - *Disrupt*: To interrupt an event, activity, or process by causing a disturbance.
  - *Seamlessly*: Smoothly and without any transition problems or gaps.
  - *Near real-time / Data freshness*: How quickly data is updated and made available.
  - *Latency*: The delay between a data change occurring in the source system and appearing in the target system.
  - *Incredibly rewarding*: Giving a lot of satisfaction.
  - *A massive boost of confidence*: A significant increase in self-belief.


**Part 3 (Analytical Discussion)**
1. In what situations do you think companies should be more flexible about granting access or permissions to external partners?

**Answer**
- **Option 1: Urgent emergencies / critical system outages**
  > "First of all, I think companies should show more flexibility during unforeseen emergencies or system outages. If a third-party vendor is hired to fix a critical bug or handle server downtime, waiting days for security approval can lead to massive financial losses and damage the company's reputation. In these situations, fast-tracking temporary access is crucial to resolving the issue promptly."
  
- **Option 2: Low-risk environments (Staging / Sandboxes)**
  > "Another situation is when the access is limited to non-production environments, such as staging servers or development sandboxes. Since these environments only contain dummy data and no sensitive client information, companies don't need to be as strict. Being flexible here allows external developers to test their integrations quickly without unnecessary security bottlenecks."
  
- **Option 3: Trusted long-term partners with strict NDAs**
  > "Lastly, flexibility is justified when dealing with long-standing strategic partners who are bound by strict non-disclosure agreements (NDAs). When there is a proven track record of trust and legal safeguards are already in place, cutting through the usual red tape can speed up project timelines and foster a more collaborative working relationship."

- **Useful Vocabulary:**
  - *Unforeseen emergencies*: Unexpected events requiring immediate action.
  - *Fast-tracking / Expediting*: Accelerating a process to make it happen faster.
  - *Bottleneck*: A point of congestion in a system that slows down progress.
  - *Dummy data*: Placeholder or fake data used for testing purposes.
  - *Proven track record*: A history of success and reliability.
  - *Red tape*: Excessive bureaucracy or official rules that delay progress.


2. How important is clear communication when dealing with third-party vendors or suppliers?

**Answer**
- **Option 1: Aligning expectations and preventing project delays**
  > "I believe clear communication is absolutely vital because it aligns expectations from the very start. When dealing with external vendors, you need to make sure they fully understand the project requirements, milestones, and deliverables. If expectations aren't communicated clearly, it can easily lead to costly misunderstandings, scope creep, and severe project delays."
  
- **Option 2: Troubleshooting and resolving technical blockers**
  > "Furthermore, it's essential for solving problems and tackling technical issues. For example, if a vendor is blocking you by not granting database access, a clear and honest conversation can help you explain the urgency and collaborate on a temporary workaround. Good communication bridges the gap and prevents teams from pointing fingers at each other when things go wrong."
  
- **Option 3: Establishing long-term trust and mutual cooperation**
  > "Lastly, open and transparent communication is key to building mutual trust over time. When you maintain a positive, transparent dialogue, vendors are much more likely to be flexible, prioritize your requests, and go the extra mile to help you out during critical situations."

- **Useful Vocabulary:**
  - *Vital*: Extremely important or essential.
  - *Align expectations*: Ensure everyone has the same understanding or goals.
  - *Scope creep*: Uncontrolled changes or continuous growth in a project’s scope.
  - *Point fingers / The blame game*: Accusing others of causing a problem instead of finding a solution.
  - *Bridge the gap*: To connect or reduce the difference between two groups or ideas.
  - *Go the extra mile*: Make a special effort to achieve something or help someone.

---

## 2. ChatGPT Voice Mode Simulation Prompt

```
You're my project manager. I'm briefing you on a blocker: our vendor won't approve CDC access yet. Ask me for updates and push me to think of workarounds. Keep it professional but casual.
```

---

## 3. Feedback Logging Table

| # | My Original Sentence | AI Correction / Suggestion | Grammar Rule / Reason |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |

---

## 4. Interactive Shadowing & Pacing Guide

**Line 1** (from the overview dialogue):
> *"We need to reach out to the vendor before we can enable CDC."*

**Shadowing Breakdown**:
> `We NEED to / REACH OUT to the VENdor /`
> `beFORE we can enABLE / C-D-C.`

- Stress **NEED** and **REACH OUT** as the core action items.
- Pause naturally after *vendor* before the condition clause.
- Say "C-D-C" as three separate letters with even stress.

---

**Line 2** (from the overview dialogue):
> *"In the meantime, we can use a daily snapshot as a temporary fallback."*

**Shadowing Breakdown**:
> `In the MEANTIME, /`
> `we can USE a DAIly SNAPshot /`
> `as a TEMporary FALL-back.`

- Use a slight pause and slight rise in tone after *meantime*.
- Stress **DAILY** and **SNAPSHOT** as the core technical terms.
- Stress **TEMPORARY** to signal that this is not a final solution.
