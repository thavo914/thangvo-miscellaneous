---
title: "Day 4 - Exercise 2: Technical Grammar & System Operations"
week: 21
day: 4
block: 2
duration: "25 Mins"
category: "Weekly Curriculum"
subcategory: "Week 21"
exercise_type: "tech_grammar"
target_level: "IELTS Band 6.5 / CEFR B1-B2"
grammar_focus:
  - Present Continuous Passive (is/are being + V3/ed) for in-flight migrations
  - Phrasal Verb mechanics of "hook up" (systems, hardware, and team connections)
  - Iterative diagnostic pattern "keep(s) making a [beeping/strange] sound"
drills_included: true
date: 2026-10-18
---

# Day 4 - Exercise 2: Technical Grammar & System Operations

> [!NOTE]
> **Block 2 (Part A)**: Master 3 operational grammar patterns essential for standup status updates, Jira tickets, and hardware troubleshooting.

---

## 📘 Rule 1: Present Continuous Passive (`is/are being + V3/ed`) for Active Migrations

* **Quote from Dialogue**: *"One of the storage drives had sector errors, so the disk **is being replaced** right now."*
* **Rule Explanation**: 
  When explaining that an infrastructure component, railway line, or software service is undergoing an active overhaul right now, use the Present Continuous Passive. The presence of **`being`** is critical because it highlights that the replacement is **an ongoing process in progress**:
  $$\mathbf{[Subject\ (Asset)] + is\ /\ are\ being\ +\ [Past\ Participle\ (V_3/ed)]\ +\ (with\ /\ by\ [Replacement])}$$
* **Comparison with Other Forms**:
  * `The server is replaced`: Simple present (routine schedule / static general fact).
  * `The server is being replaced`: Present continuous passive (technicians are physically doing it right now).
  * `The server is replacing`: Active voice (fatal error: implies the server replaces something else).
* **Common Pitfall**:
  > ❌ **Active Voice Error**: *The rail line is replacing right now.* (Tracks cannot replace themselves).  
  > ❌ **Missing Auxiliary**: *The database being replaced with ClickHouse.* (Missing `is`).  
  > ✅ **Natural Native English**: *The tracks **are being replaced**.* / *The database **is being replaced** with ClickHouse.*

### 🎯 Rule 1 Practice Exercises

#### Drill 1.1: Transform Active Descriptions into In-Flight Passives
Upgrade the following sentences to emphasize the system/asset being overhauled right now:
1. *The DevOps engineers are currently migrating our legacy database.*  
   → **Your Rewrite**: Our legacy database is currently __________________________________________________
2. *Network Rail is replacing the tracks between Wilmslow and Levenshulme.*  
   → **Your Rewrite**: The tracks between Wilmslow and Levenshulme __________________________________________________
3. *We are swapping out the faulty memory stick on worker node 02.*  
   → **Your Rewrite**: The faulty memory stick on worker node 02 __________________________________________________

#### Drill 1.2: Contextual Fill-in-the-Blank
Complete each sentence using `is/are being replaced (with/by)`:
1. All outdated SSL certificates ____________________ (replace) across our production Kubernetes clusters tonight.
2. The legacy cron-based ETL pipeline ____________________ (replace) with a real-time Apache Flink stream.
3. My company laptop screen is flickering, so the unit ____________________ (replace) by IT today.

<details>
<summary>💡 Click to View Suggested Answers & Analysis</summary>

* **Drill 1.1**:
  1. *Our legacy database **is currently being migrated**.*
  2. *The tracks between Wilmslow and Levenshulme **are being replaced**.*
  3. *The faulty memory stick on worker node 02 **is being swapped out**.*
* **Drill 1.2**:
  1. *are being replaced*
  2. *is being replaced with*
  3. *is being replaced by*
</details>

---

## 📘 Rule 2: Phrasal Verb Mechanics of `hook [something] up` in Engineering

* **Quote from Dialogue**: *"Once IT finishes assigning IAM roles, I'll **hook it up** to our primary Kafka broker."*
* **Rule Explanation**:
  `hook up` is one of the most versatile phrasal verbs in tech. It has two primary functions:
  1. **Technical Connection / Integration**: `hook [something] up (to [system])`: To physically plug in hardware, wire a network, or connect a data source to a pipeline:
     * *"Let's **hook up** the new replica to our primary database."*
  2. **Sharing Resources / Doing a Favor**: `hook [someone] up with [something]`: To provide someone with valuable resources, contacts, or internal credentials:
     * *"Can you **hook me up with** read access to the staging logs?"*
* **Common Pitfall**:
  > ❌ **Preposition Confusion**: *I will hook up with the database.* (Sounds like you are romantically dating the database!).  
  > ✅ **Natural Native English**: *I will **hook the service up to** the database.* / *I'll **hook it up**.*

### 🎯 Rule 2 Practice Exercises

#### Drill 2.1: Use "Hook Up" Naturally
Rewrite each sentence using `hook up`:
1. *Could you please connect the new monitoring agent to our Grafana dashboard?*  
   → **Your Rewrite**: Could you please hook __________________________________________________
2. *Can you share the test dataset credentials with me when you get a second?*  
   → **Your Rewrite**: Can you hook __________________________________________________
3. *We finished cabling the secondary network switch in the server rack.*  
   → **Your Rewrite**: We finished hooking __________________________________________________

<details>
<summary>💡 Click to View Suggested Answers & Analysis</summary>

1. *Could you please **hook the new monitoring agent up to** our Grafana dashboard?*
2. *Can you **hook me up with** the test dataset credentials when you get a second?*
3. *We finished **hooking up** the secondary network switch in the server rack.*
</details>

---

## 📘 Rule 3: Iterative Troubleshooting Pattern: `keep(s) making a [beeping/strange] sound`

* **Quote from Dialogue**: *"Node 04 **keeps making a beeping sound**."*
* **Rule Explanation**:
  When diagnosing erratic equipment or intermittent bugs that repeat annoying actions, native engineers use the iterative structure:
  $$\mathbf{[Device\ /\ Hardware] + keep(s)\ making\ a\ [beeping\ /\ clicking\ /\ buzzing\ /\ strange]\ sound}$$
  $$\mathbf{Alternative:\ [Device] + keep(s)\ +\ [Verb\text{-}ing]\ (e.g.,\ keeps\ rebooting,\ keeps\ timing\ out)}$$
* **Common Pitfall**:
  > ❌ **Broken Form**: *The server keeps make a sound.* (Must use gerund: *making*).  
  > ❌ **Wordy Explanation**: *The disk continuously produces an unexpected acoustic signal.* (Overly formal academic bloat).  
  > ✅ **Natural Native English**: *The drive **keeps making a clicking sound**.*

### 🎯 Rule 3 Practice Exercises

#### Drill 3.1: Hardware Diagnostic Precision
Fill in the blanks with the natural diagnostic pattern:
1. The power supply unit in rack 03 ____________________ (make / high-pitched buzzing sound).
2. Our background consumer pod ____________________ (keep / crash) every time it processes large JSON payloads.
3. Why does the cooling fan ____________________ (keep / spin) at maximum speed even when CPU utilization is low?

<details>
<summary>💡 Click to View Suggested Answers & Analysis</summary>

1. *keeps making a high-pitched buzzing sound*
2. *keeps crashing*
3. *keep spinning*
</details>

---

## 🚀 Section 1 Mastery Drill: The 3-Rule Synthesis Challenge

Combine Rule 1 (`is being replaced`), Rule 2 (`hook up`), and Rule 3 (`keeps making a sound`) into a concise incident status update for your engineering team:

* **Scenario**: Báo cho team biết rằng chiếc ổ cứng trong máy chủ lưu trữ liên tục phát ra tiếng bíp cảnh báo lỗi, nên hiện nó đang được kỹ thuật viên thay thế bằng ổ cứng NVMe mới, và sau khi xong bạn sẽ đấu nối nó vào cụm cluster.
* **Fill-in Template**:
  > *"Node 04 **keeps making a** ____________________ sound, so the failed hard drive **is currently being replaced with** ____________________. As soon as the hardware check passes, I'll **hook it up to** our storage cluster."*
* **Your Complete Rewrite**: __________________________________________________

<details>
<summary>💡 Click to View Model Synthesis</summary>

> *"Node 04 **keeps making a beeping** sound, so the failed hard drive **is currently being replaced with** a new NVMe SSD. As soon as the hardware check passes, I'll **hook it up to** our storage cluster."*
</details>
