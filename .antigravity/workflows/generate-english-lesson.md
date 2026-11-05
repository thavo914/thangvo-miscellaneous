---
description: The core topic-agnostic project backbone of the English learning system. Generates comprehensive weekly study modules engineered for Story-Driven High-Intensity Speed Reflex (90–120 mins/day, 1 consolidated file/day from Day 1 to Day 5, plus a 90-minute Written Proficiency Review Test on Day 6), focusing on rapid sentence construction, 3-second quick-fire drills, situational dialogues, and ChatGPT Voice Mode simulations anchored directly in the previous week's notes.
---

# Workflow: /generate-english-lesson (Story-Driven High-Intensity Speed Reflex & Weekly 90-Min Proficiency Review)

> [!IMPORTANT]
> **⚓ CORE PROJECT BACKBONE (Story-Driven Speed Reflex Engine & Data Engineer Communication)**
> - This workflow rule is the permanent structural engine for weekly lesson generation in this repository.
> - **Daily Commitment (90–120 Mins/Day, Monday to Friday)**: Each day focuses 80% of its time on active speaking, quick-fire sentence construction, and AI Voice Mode simulation.
> - **Single Consolidated Daily File**: Every day from Day 1 to Day 5 is contained in **1 single file** (`day<N>-speed-reflex.md`) to create a seamless, uninterrupted learning flow.
> - **Story-Driven Narrative Journey**: Each week is organized around **2–3 connected real-life story arcs** (e.g. from planning a launch/migration, to handling system incidents, coordinating with teammates, reporting to leadership, celebrating milestones, and casual coffee banter). The notes from `english/week-<N>/notes/` serve as the narrative fabric and target formulas.
> - **The 3-Second Rule**: Train involuntary spoken reflexes — hear/read a Vietnamese prompt and fire out natural B1-B2 spoken English within 3 seconds.
> - **Day 6 Review Test (90 Mins / 100 Pts)**: A rigorous 4-part written milestone test validating mastery of collocations, Vietlish trap avoidance, sentence formulas, and contextual dialogue transcreation.
> - **Plain English & Functional Self-Explanation**: All content strictly follows [english/AGENTS.md](file:///c:/Users/adm.thangvm/repos/thangvo-miscellaneous/english/AGENTS.md). Strictly avoid academic bloat, show-off vocabulary (*utilize*, *facilitate*), and empty corporate clichés (*bring to the table*, *synergy*).

---

## 📁 Output Folder Structure
```
english/week-<N>/lessons/
├── lesson-overview.md
├── day1-speed-reflex.md
├── day2-speed-reflex.md
├── day3-speed-reflex.md
├── day4-speed-reflex.md
├── day5-speed-reflex.md
└── day6-review-test-90min.md
```

---

## 🛠️ Step 0 - Gather Notes & Design Weekly Story Arcs (Before File Creation)

> [!IMPORTANT]
> **Primary Source: User-Supplied Notes (`english/week-<N>/notes/`)**:
> 1. Read all note files in `english/week-<N>/notes/` and `README.md`.
> 2. Group the notes into **2–3 overarching, logical story arcs** that simulate realistic everyday and data engineering workplace scenarios.
> 3. Map notes evenly across Day 1 to Day 5 so each day targets 4–6 cohesive sentence patterns and collocations.

### Story Arc Framework:
* **Arc 1 (Days 1–2): Daily Social, Workplace Sync & Planning**: Casual interactions, ordering, scheduling earliest time, team standups, asking for accommodations, polite suggestions.
* **Arc 2 (Days 3–4): System Incidents, Triage & Empathy**: PagerDuty alerts going off, laptop freezing up, de-escalating customer/stakeholder frustration, diagnosing issues, separating services.
* **Arc 3 (Day 5): Milestone Celebrations, Leadership & Solution Pitching**: All-hands town halls, pseudo-cleft praises (*is what has made us...*), attributing growth to diligence, handing over the stage, and customer service call-to-actions.

---

## 📄 Step 1 - Generate `lesson-overview.md`

This file introduces the weekly story roadmap, target vocabulary, schedule matrix, and direct links to all daily reflex files.

### Contents:
1. **Metadata Table**: Week, Theme, Target Level (B1–B2 Spoken & Workplace Reflex), Target Output Files.
2. **Weekly Storyline Roadmap**: Summary of the 3 Story Arcs and what happens each day.
3. **Core Target Patterns & Collocations Registry**: Comprehensive table mapping target notes to days.
4. **Weekly Study Schedule (Monday to Saturday)**: Table listing daily 4 action blocks and Day 6 Review Test.

---

## 📄 Step 2 - Generate Daily Reflex Files: `day<N>-speed-reflex.md` (Days 1 to 5)

Each daily file contains a complete 4-block training engine taking 90–120 minutes:

### Block 1: Story Mission & Pattern Activation 🎯 (15–20 Mins)
* **Today's Story Mission**: Short narrative brief setting the scene (*Who you are, who you're talking to, and the crisis/goal of today's episode*).
* **Target Sentence Formulas from Notes (4–6 Patterns)**:
  * Dynamic formula box with bracketed components: e.g. `[Effort] + is what has made + [Subject] + [Adjective]`.
  * Communicative function & Why native speakers use it.
  * 3 quick slot-filling prompts per formula with collapsed answers.

### Block 2: 3-Second Quick-Fire Reflex Drills ⚡ (35–45 Mins)
* **15–20 Rapid Situational Prompts**:
  * Format: Realistic Vietnamese prompt/thought $\longrightarrow$ Speak out native English in 3 seconds.
  * Covering both **Daily Life** and **Data Engineering Workplace** scenarios.
  * Explicit **De-Vietlish Traps**: Highlight common mistranslations and explain why the native phrasing works better.
  * Collapsible model answers with alternative reflexes (Spoken reflex vs. Workplace reflex).

### Block 3: Storyline Transcreation & Dialogue Breakdown 🎭 (20–25 Mins)
* **Storyline Multi-turn Dialogue (10–14 Turns)**:
  * Realistic conversational script between the learner and a coworker/client/lead.
  * Active Vietnamese-to-English transcreation for learner's turns before checking answers.
  * Nuance analysis of collocations and natural phrase choices.

### Block 4: ChatGPT Voice Mode Real-Time Simulation 🎙️ (25–35 Mins)
* **ChatGPT Voice Mode Battle Prompt (<300 chars, <10 hyphens)**:
  * A battle-tested system prompt for hands-free interactive conversation with ChatGPT Voice Mode on phone or PC.
  * **Mission Objectives**: Specific speaking challenges (e.g. *"Must use at least 3 formulas from today"*, *"De-escalate the user before proposing a fix"*).
* **Daily Reflection & Anki Logging**: Quick error table and flashcard logging.

---

## 📄 Step 3 - Generate `day6-review-test-90min.md` (Saturday Milestone)

A rigorous, professional 90-minute written examination (100 Points Total) covering all story arcs and notes from the week.

### Test Structure (4 Parts):
* **Part 1: Vocabulary & Collocation Slot-Filling (20 Points / 10 Questions)**:
  * Fill in missing prepositions, phrasal verb particles, and technical terms in realistic sentences.
* **Part 2: Vietlish Trap Detection & Deconstruction (20 Points / 5 Scenarios)**:
  * Identify subtle Vietlish errors, explain the underlying cultural/grammatical failure, and provide the native alternative.
* **Part 3: Dynamic Sentence Construction & Transformation (30 Points / 6 Scenarios)**:
  * Transform flat sentences into high-impact native patterns (e.g., Wh-clefts, future continuous, passive participles, comparative growth formulas).
* **Part 4: Contextual Situational Transcreation (30 Points / 3 Multi-turn Dialogues)**:
  * Transcreate 3 complex Vietnamese workplace/social scenarios into polished native English.

### Answer Key & Grading Rubric:
* Include comprehensive answer key and explanatory rubrics under collapsible `<details>` blocks.
