---
title: "Day 5 - Exercises: Troubleshooting, Audits & Incident Resolution (S-T-A-R)"
week: 22
day: 5
type: "exercises"
target_level: "B1-B2 CEFR / IELTS Band 6.0-6.5"
estimated_time: "90-120 Mins"
---

# ✍️ Day 5 - Exercises: Troubleshooting, Audits & Incident Resolution (S-T-A-R)

> [!NOTE]
> **Output Engine Focus**: Train high-stakes technical explanations, incident post-mortems, and behavioral interview responses using the **S-T-A-R framework**.

---

## 🎙️ Block 1: Warm-up Reflex & Active Listening (35–45 Mins)

### Part A: Speaking Reflex — The "Devil's Advocate" Challenge (15 Mins)
* **Instructions**: State an opinion about code refactoring, then immediately challenge and refute your own opinion within 30 seconds using contrast linkers (*however, on the other hand, nevertheless*).
* **Target expressions to weave in**:
  * `solve vs. resolve`
  * `if that's what needs to be done`
* **Sample Delivery**:
  > *"We should immediately refactor our legacy ingestion pipeline because fixing isolated bugs every week is throwing time down the drain. **On the other hand**, a full rewrite would halt new feature development for at least two sprints when we are already **a couple weeks behind schedule**. Nevertheless, **if that's what needs to be done** to prevent another production outage, we must commit to it."*

### Part B: Active Listening — TOEIC Dictation (20–30 Mins)
* Complete 3 short technical or customer service problem-resolution recordings.
* Write word-for-word, check with red pen, and log preposition errors.

---

## 🇻🇳➡️🇬🇧 Block 2: Tech Transcreation & S-T-A-R Practice (45 Mins)

### Part A: Tech War Room Dialogue (8 Turns)
Transcreate this urgent incident debrief between two engineers into natural B1–B2 Plain English:

* **Turn 1 (Nam)**: *"Sơn ơi, hệ thống webhook thanh toán đêm qua bị sập là do nguyên nhân gì thế?"*  
* **Turn 2 (Sơn)**: *"Kỹ sư trực đêm qua bị khóa quyền truy cập vào máy chủ bastion do chứng chỉ IAM hết hạn, nên không vào kiểm tra log được."*  
* **Turn 3 (Nam)**: *"Hóa ra đó là lý do tại sao chúng ta bị trễ tiến độ kiểm toán hệ thống cả hai tuần nay à?"*  
* **Turn 4 (Sơn)**: *"Đúng rồi. Sáng nay bọn mình đã sửa xong lỗi code trong file script và giải quyết xong bất đồng về quyền truy cập với bên bảo mật."*  
* **Turn 5 (Nam)**: *"Thế còn việc tốc độ xử lý dữ liệu bị chậm liên tiếp 5 tháng nay thì sao?"*  
* **Turn 6 (Sơn)**: *"Bọn mình chưa thấy được hiệu năng như kỳ vọng. Mình đang tính thử xáo trộn lại ca trực và cấu hình lại Kafka xem có tạo ra khác biệt gì không."*  
* **Turn 7 (Nam)**: *"Nếu làm vậy thì phải tạm hoãn tính năng báo cáo mới của sếp đấy."*  
* **Turn 8 (Sơn)**: *"Mình biết, nhưng nếu đó là điều bắt buộc phải làm để bảo vệ sự ổn định của hệ thống thì chúng ta đành phải chấp nhận thôi."*

---

<details>
<summary>💡 Click to View Native Model Transcreation & Contrastive Notes</summary>

### Model Native English Transcreation:
* **Nam**: *"Son, what was the root cause behind the payment webhook outage last night?"*
* **Son**: *"Our on-call engineer was locked out of the bastion host due to an expired IAM certificate, so he couldn't SSH in to inspect the logs."*
* **Nam**: *"So that explains why we've been a couple weeks behind on our infrastructure audit?"*
* **Son**: *"Exactly. This morning we solved the code bug in the renewal script and resolved the permission conflict with the security team."*
* **Nam**: *"What about the batch ingestion throughput that has been dropping for the fifth month in a row?"*
* **Son**: *"We haven't been seeing the results we expected. I'm thinking of mixing up our on-call rotation and reconfiguring our Kafka topics to see if that makes any difference."*
* **Nam**: *"If we do that, we'll have to push back the manager's new reporting feature."*
* **Son**: *"I know, but if that's what needs to be done to ensure system stability, that's a trade-off we have to make."*

### Contrastive Linguistic Notes:
1. *"bị khóa quyền truy cập"*: Use `locked out of the bastion host` (remember preposition `of`).
2. *"sửa xong lỗi code... giải quyết xong bất đồng"*: Pair `solved the code bug` with `resolved the permission conflict`.
3. *"chậm liên tiếp 5 tháng nay"*: Use `for the fifth month in a row`.
</details>

---

### Part B: S-T-A-R Behavioral Interview Practice
* **Question**: *"Tell me about a time when an unexpected technical obstacle threatened your project delivery."*
* **Model 90-Second Response (S-T-A-R Framework)**:
  > - **S (Situation)**: *"Last quarter, our primary payment reconciliation pipeline experienced severe latency spikes right before month-end."*  
  > - **T (Task)**: *"My task was to diagnose the bottleneck and unblock our engineers, who **were locked out of** the cluster monitoring dashboards."*  
  > - **A (Action)**: *"I immediately escalated the IAM credential renewal to our security team. Then, I **solved the query index bug** and coordinated with colleagues to **mix up our job schedules** so batch loads ran during off-peak hours."*  
  > - **R (Result)**: *"As a result, we drained the entire event backlog within two hours, prevented financial data discrepancies, and established a permanent runbook for credential expiration."*

---

## 🧩 Block 3: Structural Slot-Filling & Pitfall Drills (20–25 Mins)

### Spot the Mistake:
1. *"We finally resolved the mathematical algorithm bug in the machine learning code."*
2. *"The on-call developer was locked out from the cloud production database."*
3. *"Our team has missed the sprint target for the fifth months in a row."*

<details>
<summary>💡 Click to View Corrections & Explanations</summary>

1. **Correction**: *"We finally **solved** the mathematical algorithm bug in the machine learning code."*  
   *Explanation*: Computational or algorithmic problems are `solved`, not resolved.
2. **Correction**: *"The on-call developer was **locked out of** the cloud production database."*  
   *Explanation*: The fixed phrasal verb is `locked out of` (never *locked out from*).
3. **Correction**: *"Our team has missed the sprint target **for the fifth month in a row**."*  
   *Explanation*: The time noun after ordinal numbers is always singular: `fifth month in a row`.
</details>

---

## 🤖 Block 4 & 5: AI Voice Simulation & Weekly Wrap-up (45–60 Mins)

### ChatGPT Voice Mode Prompt
Copy and paste this prompt into ChatGPT Voice Mode:

```text
Act as my engineering director. I am a lead data engineer briefing you on last night's webhook outage. I will explain that an engineer was locked out of the bastion host, but we solved the bug and resolved the issue. Ask me about our backlog and trade-offs. Keep replies concise and grounded.
```

### Suggested AI Exercises:
1. **Rapid Q&A**: Ask the AI: *"What is the best way to handle trade-offs between tech debt and business deadlines?"* Respond using `if that's what needs to be done`.
2. **Roleplay**: Conduct a realistic 4-minute incident debrief.

---

## 🎉 Weekly Portfolio Review & Anki Wrap-up
Congratulations on finishing all 5 days of Week 22!
- [ ] Added all Week 22 collocations and formulas to Anki.
- [ ] Reviewed your error logging table.
- [ ] **Rest and recharge on the weekend** — zero study required on Saturday and Sunday!
