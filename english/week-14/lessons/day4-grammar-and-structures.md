# Day 4: Grammar & Sentence Structures (Incident Post-Mortem)

---

## 🔍 1. Grammar Focus (Days 4–6)

### Rule 1: Past Perfect Continuous (had been running / doing)
*   **Quote**: 
    - *"The database had been running smoothly until 2 PM when the replication lag spiked."*
*   **Explanation**:
    - **Form**: `Subject + had + been + Verb-ing`
    - **Usage**: Used to describe an action that was ongoing in the past up to a specific point or event in the past. It emphasizes the duration or continuity of the activity before the interruption.
    - *Example*: *"We had been streaming data for six months without any issues before the server crashed."*
*   **Common Pitfall Box**:
    > [!WARNING]
    > **Common Mistake**: Confusing Past Perfect Continuous with Present Perfect Continuous or Past Continuous when describing a past cutoff point.
    > - *Incorrect*: The pipeline has been running fine yesterday before the disk got full.
    > - *Correct*: The pipeline **had been running** fine yesterday before the disk got full.

### Rule 2: Causative Structures (Have / Get something done)
*   **Quote**: 
    - *"...get the schema validation updated..."*
    - *"...get the alerts configured..."*
*   **Explanation**:
    - **Form**: `Subject + have / get + Object + Past Participle (V3/P.P.)`
    - **Usage**: Used when we don't do the action ourselves, but rather organize for it to be done by someone else, or when we emphasize that a task needs completion. In tech, it's often used to assign action items.
    - *Example*: *"I will have the API key refreshed by tomorrow."* (I will arrange for it to be done).
*   **Common Pitfall Box**:
    > [!WARNING]
    > **Common Mistake**: Using the base verb or gerund instead of the past participle (V3) in passive causatives.
    > - *Incorrect*: We need to get the logs check.
    > - *Correct*: We need to get the logs **checked**.

### Rule 3: Third Conditional for Root Cause Speculation
*   **Quote**: 
    - *"If we had kept a closer eye on the error logs, we would have caught the bug early."*
*   **Explanation**:
    - **Form**: `If + Subject + had + P.P. (Past Perfect), Subject + would + have + P.P.`
    - **Usage**: Used to talk about imaginary situations in the past—speculating about how things would have been different if a past condition had been met. It is perfect for technical post-mortems and root-cause analysis.
*   **Common Pitfall Box**:
    > [!WARNING]
    > **Common Mistake**: Using *would* in the "if" clause.
    > - *Incorrect*: If we would have checked the schema, we would have avoided the crash.
    > - *Correct*: If we **had checked** the schema, we would have avoided the crash.

---

## 🛠️ 2. Sentence Structure Templates (Topic 2)

### Pattern 1: The [System/Database] had been running smoothly until + [Event/Time] + when + [Issue]
*   **Communicative Function**: To establish the operational baseline and pinpoint the exact moment an incident started.
*   **Examples**:
    1. *Everyday Context*: The kitchen microwave had been running smoothly until yesterday morning when it suddenly started making a weird noise.
    2. *Data Engineering Context*: The Kafka consumer group had been running smoothly until midnight when the partition offsets suddenly lag-spiked.
    3. *General Workplace Context*: The project planning phase had been running smoothly until the client presentation when the scope changed completely.

### Pattern 2: We need to get the [Noun] + [P.P. (e.g., updated/fixed)] + in order to + [Verb]
*   **Communicative Function**: To assign technical actions necessary to resolve or prevent an issue.
*   **Examples**:
    1. *Everyday Context*: We need to get the kitchen sink fixed in order to cook dinner tonight.
    2. *Data Engineering Context*: We need to get the parser library updated in order to support the new JSON schema.
    3. *General Workplace Context*: We need to get the slide deck reviewed in order to present to the VP tomorrow.

### Pattern 3: It took us several hours to track down + [Problem] + which was the main point of failure
*   **Communicative Function**: To describe the troubleshooting effort and name the root cause of an incident.
*   **Examples**:
    1. *Everyday Context*: It took us several hours to track down the water leak, which was the main point of failure in our plumbing.
    2. *Data Engineering Context*: It took us several hours to track down the memory leak, which was the main point of failure in our container.
    3. *General Workplace Context*: It took us several hours to track down the missing invoice, which was the main point of failure in our audit.

### Pattern 4: By ruling out + [Possible Cause], we were able to focus on + [Real Cause]
*   **Communicative Function**: To explain the logical debugging process by eliminating options.
*   **Examples**:
    1. *Everyday Context*: By ruling out a flat battery, we were able to focus on the broken starter motor of the motorbike.
    2. *Data Engineering Context*: By ruling out network latency, we were able to focus on the unindexed database table as the source of slow queries.
    3. *General Workplace Context*: By ruling out bad design, we were able to focus on poor marketing as the reason for low sales.

### Pattern 5: If we had kept a closer eye on + [Metric], we would have caught the bug early
*   **Communicative Function**: To reflect on a past incident and propose better monitoring for the future.
*   **Examples**:
    1. *Everyday Context*: If we had kept a closer eye on the engine temperature, we would have caught the radiator leak early.
    2. *Data Engineering Context*: If we had kept a closer eye on the MinIO bucket capacity, we would have caught the storage limit issue early.
    3. *General Workplace Context*: If we had kept a closer eye on client feedback, we would have caught the product flaws early.

---

## 📝 3. Production & Translation Drills

### "Your Turn" Exercises
1. The ________________ had been running smoothly until ________________ when ________________.
2. We need to get the ________________ ________________ in order to ________________.
3. It took us ________________ to track down ________________, which was the main point of failure.
4. By ruling out ________________, we were able to focus on ________________.
5. If we had kept a closer eye on ________________, we would have caught the ________________ early.

### Translation / Transformation Challenge
*Translate the following sentences from Vietnamese to English using the target grammar rules.*
1. Chúng tôi đã chạy các đường ống dẫn dữ liệu (data pipelines) được ba tuần trước khi chúng bị sập vào tối qua.
   - *Draft translation*: ________________________________________________
2. Chúng tôi cần phải cấu hình lại các cảnh báo PagerDuty để tránh việc bỏ sót các lỗi nghiêm trọng. (Sử dụng cấu trúc causative "get something done")
   - *Draft translation*: ________________________________________________
3. Nếu nhóm phát triển kiểm tra định dạng dữ liệu nguồn sớm hơn, họ đã phát hiện ra lỗi trước khi deploy.
   - *Draft translation*: ________________________________________________

---

## 🔍 4. Spot the Mistake (Error Correction Drill)
Identify and correct the errors in the following sentences:

1. *The database has been running smoothly until the power outage occurred last Tuesday.*
2. *We must get the pipeline restart immediately to process the backlog.*
3. *If we would have checked the configuration file, we would have found the bad port number.*

<details>
<summary><b>Answer Key & Explanations</b></summary>

1. **Correction**: *The database **had been running** smoothly until the power outage occurred last Tuesday.*
   - *Explanation*: Since the action was ongoing in the past up to a specific past event (the power outage), we must use the Past Perfect Continuous, not the Present Perfect Continuous.
2. **Correction**: *We must get the pipeline **restarted** immediately to process the backlog.*
   - *Explanation*: The passive causative structure requires the past participle (V3) form: `get + object + V3`.
3. **Correction**: *If we **had checked** the configuration file, we would have found the bad port number.*
   - *Explanation*: In the "if" clause of a third conditional sentence, use the Past Perfect (`had + P.P.`), not the conditional auxiliary `would have`.
</details>
