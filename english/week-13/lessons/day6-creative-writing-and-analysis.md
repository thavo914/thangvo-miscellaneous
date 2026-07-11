# Day 6: Creative Writing & Analysis (Navigating Vendor Constraints)

---

## 1. Creative Dialogue Writing
**Instructions**: Write a new, original 10-turn conversation between you and your team lead. You are discussing the CDC blocker from your vendor and brainstorming workarounds.
**Requirement**: You must naturally include at least 2 of the target grammar rules (Modal Perfect for Speculation, Reporting Verbs + that + base verb, Passive with Modals) and 3 of the target collocations (*reach out to, work around, push back on, get sign-off, in the meantime*).
**Dialogue**:

- **Team Lead**: "Hey, how are we doing with the database integration? Have we started streaming the live updates yet?"
- **Me**: "Actually, we've hit a blocker. The vendor hasn't approved our CDC access yet. They **might have missed** our initial security request because we haven't heard back in a week."
- **Team Lead**: "That's frustrating. We can't let this delay the entire project. How should we proceed?"
- **Me**: "I suggest **that we reach out to** their lead architect directly to explain our deadline, rather than waiting in the standard support queue."
- **Team Lead**: "Good idea. But what if they still **push back on** the access due to security policies? We need a backup plan."
- **Me**: "If that happens, the data **could be extracted** using hourly snapshot exports instead. It's not real-time, but it's a viable option."
- **Team Lead**: "True, that would help us **work around** the issue temporarily. Let's draft a backup pipeline for that."
- **Me**: "Right. I'll get started on the staging setup. **In the meantime**, could you follow up with our procurement team to see if they can speed up the vendor's legal review?"
- **Team Lead**: "Will do. Once the vendor gives us the green light, we'll need to **get sign-off** from our security officer before deploying to production."
- **Me**: "Sounds like a solid plan. I'll document these options so we can present them at the status meeting this afternoon."

## 2. Technical Monologue: Data Flow to Lakehouse

**Context**: You are explaining to a colleague or stakeholder how data flows in near real-time from a transactional database (source) to the Lakehouse.

**Monologue**:
> "Sure, let me explain how we stream data from our operational source to the Lakehouse in near real-time. If we break it down into three simple stages—**Capture**, **Transport**, and **Storage**—it’s actually very straightforward.
>
> First, let's look at **Capture**. At the source, we have our transactional database. Instead of running heavy batch queries that slow down the system, we use **Change Data Capture (CDC)**. CDC acts like a silent observer, reading the database's internal transaction logs. Whenever a record is inserted, updated, or deleted, CDC captures that change event instantly without putting any load on the database.
>
> Next is **Transport**. Once CDC captures a change, we need a fast and reliable way to move it. That’s where **Apache Kafka** comes in. Think of Kafka as a real-time messaging pipeline. It takes those change events and streams them as message feeds—which we call 'topics'. Kafka is built to handle millions of events per second with virtually zero latency.
>
> Finally, we reach the **Storage and Processing** stage in our **Lakehouse**. For our storage layer, we use **Delta Lake** built on top of **MinIO**, which is our self-hosted, S3-compatible object storage. We organize the incoming streams on MinIO using a **Medallion Architecture**:
> - First, the raw events land in the **Bronze layer** (our raw landing zone on MinIO).
> - Then, a streaming engine cleans, deduplicates, and formats the data, writing it to the **Silver layer**.
> - Lastly, the data is modeled and aggregated in the **Gold layer** for business intelligence.
>
> Because we store the files in open Delta Lake tables on top of MinIO, our analysts can query the data immediately with ACID compliance, and we get high-speed, cost-effective storage.
> 
> So, in a nutshell: data changes at the source, is instantly captured by CDC, streamed through Kafka, and organized in Delta Lake on MinIO—all within a few seconds. That's how we keep our data fresh and accurate."


### Key Vocabulary & Concepts:
- **ACID Compliance**: Set of properties (Atomicity, Consistency, Isolation, Durability) that guarantee database transactions are processed reliably.
- **Medallion Architecture**: A data design pattern consisting of Bronze (raw), Silver (cleansed/conformed), and Gold (curated/aggregated) layers.
- **Deduplication**: The process of identifying and removing duplicate records from a dataset.
- **In a nutshell**: A common idiom meaning "in summary" or "expressed in a few words".
- **ACID compliance**: (Vietnamese: Tính tuân thủ ACID - đảm bảo giao dịch tin cậy)
- **Deduplicate**: (Vietnamese: Loại bỏ dữ liệu trùng lặp)

---

## 3. Band 6.5-7.0 Cue Card Sample Answer

**Prompt**: Describe a time when you had to find a creative solution to a problem at work.

**Sample Answer**:
"I'd like to talk about a situation we faced recently on my data engineering team. The business wanted near-real-time data from our main OLTP database, and the cleanest solution was to enable CDC — Change Data Capture. The problem was that CDC **must be approved** by the database vendor first, and we hadn't yet **got sign-off** from them.

So instead of just waiting, I suggested that we **reach out to** the vendor's account manager directly, rather than going through the standard support queue. I also recommended that the team **set up** a 15-minute scheduled snapshot **in the meantime** as a short-term fallback. I knew the vendor **might push back on** the request if it involved changes to their managed service agreement, so we prepared a detailed technical justification document.

Looking back, I think the vendor **must have appreciated** the structured approach because they approved our request within ten days — much faster than we expected. **In the end**, the real-time feed was live within a month.

It taught me that when you hit a wall at work, there's almost always a way to **work around** it. You just need to communicate clearly and stay proactive."

### Conversational Words Highlighted:
- **get sign-off**: to receive formal approval (Vietnamese: được phê duyệt / chấp thuận)
- **reach out to**: to contact someone, especially proactively (Vietnamese: liên hệ / tiếp cận)
- **in the meantime**: while waiting for something else to happen (Vietnamese: trong thời gian chờ đợi)
- **push back on**: to resist or object to something (Vietnamese: phản đối / từ chối)
- **work around**: to find a way to deal with a problem or obstacle (Vietnamese: tìm cách giải quyết)

---

## 4. Self-Evaluation Checklist
- [ ] Did I use Modal Perfect (must/might/should have + P.P.) correctly?
- [ ] Did I use Reporting Verbs + that + base verb (recommend/suggest/propose)?
- [ ] Did I use Passive with Modals (must/should + be + P.P.)?
- [ ] Did I naturally include 3+ target collocations?

---

## 5. Casino & Data Operations Situational Responses

**Scenario 1:**
Your morning report shows the casino's live gaming dashboard is displaying data from 6 hours ago. You need to tell your team lead what likely happened and what should be done.
*(Use: must have, should be, Passive with Modal)*

<details>
<summary><b>Model Answer</b></summary>
The CDC feed must have dropped overnight — probably during the maintenance window. The pipeline should be restarted and the lag should be monitored for at least an hour to confirm it's stable. The root cause must be investigated before we sign off on this being a one-off event.
</details>

**Scenario 2:**
Your vendor has told you verbally that they approve CDC, but nothing is in writing yet. Your manager wants to start the implementation today.
*(Use: get sign-off, should be, I'd recommend that)*

<details>
<summary><b>Model Answer</b></summary>
I'd recommend that we wait until we get sign-off in writing before we start. Verbal approval is a good sign, but the configuration should be locked in only after the formal document is received. In the meantime, I can prepare the implementation plan so we're ready to move immediately once it's confirmed.
</details>

