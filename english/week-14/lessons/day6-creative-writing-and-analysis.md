# Day 6: Creative Writing & Output Analysis (Incident Post-Mortem)

---

## ✍️ 1. Creative Dialogue Writing

**Instructions**: Write a new, original 10-turn conversation (5 turns each) between you and a junior data engineer. You are reviewing the incident report for a recent pipeline failure and planning the implementation of new Slack/PagerDuty alerts.
**Requirements**: 
- Naturally integrate at least 2 of the target grammar rules (*Past Perfect Continuous*, *Causative structures*, *Third Conditional*).
- Naturally integrate at least 3 of the target collocations (*track down, rule out, keep an eye on, catch early, point of failure*).

**Dialogue**:
- **Me**: 
- **Junior Engineer**: 
- **Me**: 
- **Junior Engineer**: 
- **Me**: 
- **Junior Engineer**: 
- **Me**: 
- **Junior Engineer**: 
- **Me**: 
- **Junior Engineer**: 

---

## 📊 2. Technical Monologue: Incident Post-Mortem

**Context**: You are explaining to your team the timeline, root cause, and recovery actions for yesterday's database ingestion crash.

**Monologue**:
> "Alright, let's go over exactly what went wrong during yesterday's data crash.
>
> First, let's look at our pipeline state before the crash. The database replica **had been running smoothly until** 2:00 PM, when the replication lag suddenly spiked and the parser queue backed up almost instantly.
>
> It **took us several hours to track down** the root cause of the error. We checked our network interfaces first to **rule out** any simple database connection timeouts. Once we eliminated that, we realized that the vendor's source database had changed a date field format from timestamp to string without notifying us. This schema mismatch was the single **point of failure** that crashed our consumer service.
>
> Reflecting on this: **if we had kept a closer eye on** the upstream schema changes, we **would have caught** the data drift early and avoided this downtime. 
>
> Moving forward, I want to make sure we don't repeat this mistake. I will **get the schema validation rules updated** in our staging environment by tonight. Furthermore, Tu and Linh, we need to **get new PagerDuty alerts configured** today so we are notified of schema drifts before they reach production. 
>
> Does anyone have any questions about this timeline before we move on?"

### Key Vocabulary & Concepts:
- **Schema Drift**: The unplanned changes in database schemas (like column renames or type changes) made at the data source.
- **Replication Lag**: The delay between a transaction occurring in the primary database and being copied to the replica.
- **Schema drift**: (Vietnamese: Sự biến động cấu trúc dữ liệu - thay đổi ngẫu nhiên cấu trúc nguồn)
- **Replication lag**: (Vietnamese: Độ trễ sao chép dữ liệu giữa các máy chủ)

---

## 📖 3. Band 6.5-7.0 Cue Card Sample Answer

**Prompt**: Describe a time when a system, machine, or project you were responsible for had a major problem or failure.

**Sample Answer**:
"I'd like to tell you about a time when a critical ingestion pipeline I was managing crashed unexpectedly. I was working as a data engineer on our team, and our main pipeline was responsible for loading user transaction data from a source database into our Lakehouse. 

Everything **had been running smoothly until** one Tuesday afternoon, when we suddenly received an urgent alert showing that the data synchronization lag was spiking. Business analysts were complaining because their dashboards were empty. 

It was a stressful situation. It **took us several hours to track down** the exact issue. We checked the server CPU first to **rule out** resource constraints. Finally, we discovered that the source database had changed its schema format—specifically, it started sending date values as strings instead of timestamps, which crashed our parsing library. That schema change was the main **point of failure**. 

If we **had kept a closer eye on** the upstream modifications, we **would have caught** the change early. To fix it, we had to update our parser logic and reload the missed data. Once it was resolved, I also made sure we **got new validation schemas configured** in our staging environment. 

In the end, I felt relieved that we restored the service, and it was a great learning experience because it taught us the importance of proactive alerting."

### Conversational Words Highlighted:
- **had been running smoothly**: was operating without problems prior to a past event (Vietnamese: đã và đang vận hành trơn tru)
- **track down**: to search for and locate the source of a problem (Vietnamese: truy tìm, tìm ra nguồn gốc)
- **rule out**: to eliminate a possibility from consideration (Vietnamese: loại trừ)
- **point of failure**: a part of a system that, if it fails, will stop the entire system from working (Vietnamese: điểm gây lỗi hệ thống)
- **got ... configured**: arranged to have the configuration completed (Vietnamese: đã cho cấu hình xong)

---

## 🔍 4. Self-Evaluation Checklist
- [ ] Did I use the Past Perfect Continuous (*had been running*) to describe the baseline state before the incident?
- [ ] Did I use a passive causative (*get/have something done*) to assign or describe post-incident action items?
- [ ] Did I form the Third Conditional (*If + had + P.P., would have + P.P.*) correctly?
- [ ] Did I naturally include at least 3 collocations (*track down*, *rule out*, *point of failure*, etc.)?

---

## 💼 5. Data Operations Situational Responses

**Scenario 1:**
Your team lead asks you why the pipeline didn't process any files between 1 AM and 4 AM last night.
*(Use: had been running, track down, point of failure)*

<details>
<summary><b>Model Answer</b></summary>
"The extraction job had been running without issues until 1 AM, when the source API suddenly went offline for unscheduled maintenance. It took me about an hour to track down the connection logs, and I realized that the expired API token was the main point of failure. Once I refreshed the token, the queue cleared."
</details>

**Scenario 2:**
You are explaining what changes you will make to the staging environment to ensure that bad data formats never reach production again.
*(Use: rule out, get ... updated, catch early)*

<details>
<summary><b>Model Answer</b></summary>
"To ensure this doesn't happen again, we need to get our schema validation rules updated in our staging environment. This will automatically rule out any files with invalid column formats and help us catch data issues early. If a bad file is uploaded, the staging pipeline will immediately block it and send an alert."
</details>

