---
description: Propose and preview a cohesive curriculum blueprint for the upcoming week BEFORE generating lessons with /generate-english-lesson. Integrates all user notes from week-<N>/notes/, enriches with complementary B1-B2 daily conversational and technical vocabulary, and maps them across the 5-day cycle.
---

# Workflow: /suggest-next-week-curriculum (or /propose-next-week-curriculum)

> [!IMPORTANT]
> **🎯 PRE-GENERATION CURRICULUM BLUEPRINT & ENRICHMENT ENGINE**
> - **When to Run**: Run this workflow **BEFORE** invoking `/generate-english-lesson`.
> - **Core Objective**: Analyze all user-supplied notes queued in `english/week-<N>/notes/`, synthesize two cohesive weekly topics (General Workplace & Technical Engineering), and **enrich the curriculum with complementary high-frequency B1–B2 daily expressions, collocations, and slot formulas** so that every day has a complete, balanced practice set.
> - **Plain English & Functional Self-Explanation (CRITICAL)**: All proposed additions must strictly adhere to [english/AGENTS.md](file:///c:/Users/adm.thangvm/repos/thangvo-miscellaneous/english/AGENTS.md).
>   - Prioritize natural, high-frequency spoken English for daily workplace syncs, coffee talk, and engineering teamwork.
>   - Strictly avoid show-off words (*utilize, facilitate, commence*), empty corporate buzzwords (*bring to the table, synergy, go above and beyond*), and stiff academic bloat.
>   - Keep formulas breath-friendly (12–20 words on average).
> - **Git Rules**: Keep all generated files and proposals in the local working tree only. **Do not auto-commit or auto-push** without explicit user permission.

---

## 🛠️ Step-by-Step Execution Guide

### Step 1: Detect Target Week & Audit Staged Notes
1. Identify the upcoming week folder:
   - Check `english/` to find existing `week-<N>` directories.
   - Determine target upcoming week `<N>` (e.g., `week-20`).
2. Read the backlog:
   - Open and read `english/week-<N>/notes/README.md`.
   - Read the individual `.md` note files inside `english/week-<N>/notes/` to grasp all target concepts, phrases, grammar rules, and idioms already submitted by the user.
3. Check the Registry Anti-Duplication Guard:
   - Review [english/lesson-registry.md](file:///c:/Users/adm.thangvm/repos/thangvo-miscellaneous/english/lesson-registry.md) for the **last 3 generated weeks** to ensure newly suggested topics, vocabulary, and formulas do not repeat recent material.

---

### Step 2: Thematic Clustering (Define Topic 1 & Topic 2)
Cluster the staged user notes into two practical, authentic themes aligned with the 5-day schedule in [weekly-exercise-schedule.md](file:///c:/Users/adm.thangvm/repos/thangvo-miscellaneous/.antigravity/workflows/weekly-exercise-schedule.md):

* **Topic 1 (Days 1–3: General Workplace Collaboration & Social Dynamics)**:
  - Situations: Small talk at the coffee machine, negotiating deadlines, setting boundaries, weekend plans, giving peer feedback, polite requests, team catch-ups.
  - Target Audience: Colleagues, managers, cross-functional partners.
* **Topic 2 (Days 4–5: Technical Workplace & Data Engineering Operations)**:
  - Situations: Cloud cost optimization (FinOps), pipeline latency & bottlenecks, database migrations, hiring & team capacity, on-call incidents, architecture reviews.
  - Target Audience: Tech leads, fellow engineers, DevOps, product stakeholders.

---

### Step 3: Curriculum Enrichment & Expansion
The user's notes are Priority 1, but they may not cover all required slots for the full 5-day curriculum (e.g., Day 1 needs 3 grammar rules, 5 sentence templates, 5 collocations; Day 4 needs 3 tech grammar rules, 5 tech templates, 5 tech collocations).

**Enrichment Guidelines**:
1. **Fill Missing Gaps**: Propose complementary, high-yield words and expressions that naturally connect with the user's staged notes.
2. **Level Calibration**: Keep vocabulary within natural **B1–B2 conversational range**.
3. **Functional Utility**: Choose expressions that engineers and working professionals actually use in daily English (Slack messages, standup updates, PR discussions, casual banter).
4. **Contrast & Nuance**: Include common pitfalls and Vietlish traps for newly suggested items.

*Example of Natural Pairings*:
- If user noted `throw money down the drain` & `a money pit` $\rightarrow$ Add complementary FinOps expressions: `cost-effective`, `scale down`, `tighten our budget`, `cut down on unnecessary compute`.
- If user noted `I think I can make that work` $\rightarrow$ Add complementary negotiation phrases: `as long as`, `push back on`, `meet halfway`, `bandwidth`.
- If user noted `It's your call` $\rightarrow$ Add complementary delegation terms: `leave it to you`, `weigh the trade-offs`, `good call`.

---

### Step 4: Generate the Interactive Curriculum Proposal Blueprint

Create a comprehensive proposal file at:
```
english/week-<N>/curriculum-proposal.md
```
Present the proposal clearly using the standard blueprint format:

```markdown
# 📋 Week <N> Curriculum Proposal & Exercise Blueprint

> **Target Week**: Week <N>  
> **Status**: 🟡 Proposed / Awaiting User Approval  
> **Topic 1 (Days 1–3)**: [e.g. Workplace Flexibility, Polite Boundaries & Team Collaboration]  
> **Topic 2 (Days 4–5)**: [e.g. Cloud Cost Optimization, Capacity Planning & System Reliability]  

---

## 📑 1. Weekly Mapping Overview

| Day | Theme & Focus | User-Staged Notes (Priority 1) | Newly Suggested Additions (Enriched B1-B2) | Speaking / Roleplay Scenario |
| :--- | :--- | :--- | :--- | :--- |
| **Day 1** | [General Grammar & Foundations] | • `[User Note 1]`<br>• `[User Note 2]` | • `[Suggested Collocation 1]`<br>• `[Suggested Template 1]` | **Daily Commentator**: [Scenario description] |
| **Day 2** | [IELTS / Workplace Speaking] | • `[User Note 3]` | • `[Suggested Phrase 1]`<br>• `[Suggested Collocation 2]` | **ChatGPT Voice Mode**: [Roleplay scenario] |
| **Day 3** | [Conversation Transcreation] | • `[User Note 4]`<br>• `[User Note 5]` | • `[Suggested Formula 1]` | **Vietnamese-to-English Dialogue**: [8-12 turn scenario] |
| **Day 4** | [Tech Grammar & Slot Formulas] | • `[User Tech Note 1]`<br>• `[User Tech Note 2]` | • `[Suggested Tech Collocation 1]`<br>• `[Suggested Tech Template 1]` | **System Explanation Drill**: [Architecture scenario] |
| **Day 5** | [Tech Transcreation & Simulation] | • `[User Tech Note 3]` | • `[Suggested Tech Phrase 1]` | **Devil's Advocate Challenge**: [Debate scenario] |

---

## 💡 2. Detailed Breakdown of Newly Suggested Additions

### A. General Workplace Expressions (Days 1–3):
* **`[Expression 1]`**: [Meaning in Plain English + Vietnamese]. Why it complements `[User Note X]`.
* **`[Expression 2]`**: [Meaning in Plain English + Vietnamese]. Common pitfall / Vietlish trap.

### B. Technical & Data Engineering Collocations (Days 4–5):
* **`[Tech Expression 1]`**: [Meaning + Engineering application].
* **`[Tech Expression 2]`**: [Meaning + Engineering application].

---

## 🎙️ 3. Spoken Practice & Roleplay Plan

* **Day 2 Speaking Reflex (60s Pitch / Voice Simulation)**: [Specific prompt]
* **Day 3 Conversation Translation Context**: [Real-world Vietnamese dialogue synopsis]
* **Day 5 Tech Negotiation / War Room Context**: [Real-world incident or architectural debate synopsis]
```

---

### Step 5: Present Summary to User & Handoff
1. Display a concise executive summary in chat with a clickable link to `[curriculum-proposal.md](file:///...)`.
2. Highlight:
   - The two selected weekly topics.
   - Which staged notes are assigned to which days.
   - The key newly suggested vocabulary and grammar items added for balance.
3. Solicit user feedback:
   - Ask if the user wants to adjust any topic, swap words, or add more specific situations.
   - Once approved, guide the user that they can run `/generate-english-lesson week-<N>` to produce the complete 5-day module files.
4. **Remember Git Rules**: Keep all files in the working tree without committing or pushing.
