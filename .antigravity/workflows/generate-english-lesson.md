---
description: The core topic-agnostic project backbone of the English learning system. Generates comprehensive weekly study modules focusing on grammar, sentence structures, vocabulary with Vietnamese meanings, IELTS Speaking practice, Vietnamese-to-English Conversation Translation drills, and Daily Reflex & Active Listening exercises, tailored for a 3-hour/day, 5-day/week (15 hours/week) intensive practice schedule targeting a natural, conversational Band 6.5 level using real-life vocabulary.
---

# Workflow: /generate-english-lesson (Unified GSC & IELTS Speaking Plan - Band 6.5 Focus & 3-Hour Daily Reflex Engine)

> [!IMPORTANT]
> **⚓ CORE PROJECT BACKBONE (Data Engineer Practical Daily Focus & 3-Hour Daily Practice Engine)**
> - This workflow rule is the permanent, structural engine of this repository.
> - **3-Hour Daily Schedule (15 Hours/Week)**: Every generated weekly lesson is designed for a learner committing **3 hours a day (180 minutes), 5 days a week** (Monday to Friday, leaving weekends free for rest & recovery). Each day incorporates a balanced 4-block workflow:
>   1. **Block 1: Warm-up & Daily Reflex Drills (35-45 mins)**: Spontaneous speaking reflex drill + TOEIC Dictation active listening.
>   2. **Block 2: Workplace Practice & Translation Engine (60 mins)**: Grammar, slot-filling formulas, vocabulary, Vietnamese-to-English conversation transcreation, IELTS Speaking, or monologue analysis.
>   3. **Block 3: AI Speaking Simulation (60 mins)**: Practice speaking with AI using today's lessons/vocabulary and ChatGPT Voice Mode roleplays.
>   4. **Block 4: Review & Consolidation (15 mins)**: Anki/flashcard repetition, error logging, and self-evaluation.
> - **Integrated Reflex & Active Listening Toolkit**: Every daily lesson MUST embed a specific Speaking Reflex exercise (e.g., *Daily Commentator, 60s Pitch, AI Voice Roleplay, Devil's Advocate*). For Active Listening, the daily routine is **TOEIC Dictation (3 Exercises)** for 20-30 minutes.
> - **Vietnamese-to-English Conversation Translation Drills (Days 3 & 5)**: Embedded realistic Vietnamese workplace and social dialogues to bridge the idea gap, transcreate into natural native English, compare with model native phrasings, and reinforce through spoken roleplay.
> - **Daily & Practical Tech-Adjacent Topics (CRITICAL)**: All generated themes/topics must focus on **practical daily situations** and **casual workplace settings** rather than academic, formal, or abstract IELTS topics (strictly avoid themes like environmental protection, global warming, space exploration, biodiversity, history). Prioritize topics applicable to daily social and professional life as a data engineer.
>   - *Ideal Topic Examples*: Small talk at the coffee machine, talking about weekend plans with colleagues, discussing daily commutes, team lunch conversations, handling busy or stressful workdays, asking a coworker for help, explaining a pipeline/query to non-technical stakeholders, discussing work-life balance or tech-industry stress.
> - **Plain English & Functional Self-Explanation (CRITICAL)**: Prioritize clear, direct, and effortless self-expression over complex vocabulary or elaborate grammar. All generated content must strictly follow [english/AGENTS.md](file:///c:/Users/adm.thangvm/repos/thangvo-miscellaneous/english/AGENTS.md).
>   - **Vocabulary**: Use natural, high-frequency B1-B2 spoken English. Strictly avoid show-off words (*utilize*, *facilitate*, *commence*, *plethora*) and empty corporate clichés or boastful idioms (*bring to the table*, *go above and beyond*, *synergy*, *hit the ground running*, unsubstantiated *exceed expectations*).
>   - **Sentence Structures**: Keep formulas short-to-medium (breath-friendly, 12–20 words). Focus on functional explanation: explaining what happened, why it happened, what action was taken, and what comes next.
> - **Spoken Response Methodologies & Frameworks (MANDATORY ENFORCEMENT)**:
>   All speaking practices, IELTS preparation sections, and AI voice roleplay simulations MUST explicitly instruct, structure, and enforce the following frameworks:
>   1. **Daily / Weekly General Practice & IELTS Speaking**:
>      - **Part 1 & Part 2: 5W1H Framework (Who, What, Where, When, Why, How)**:
>        * *For Part 1*: Strictly ensure a direct answer + 1 or 2 supporting details (e.g., Why + How/When) to avoid flat single-sentence answers.
>        * *For Part 2 (Cue Card)*: Structure cue card responses and 1-minute preparation scratchpads logically through the 5W1H checklist (Who was involved, What happened, Where & When it took place, Why it mattered, How it was resolved/felt) to ensure 1.5–2 minutes of continuous, natural flow.
>      - **Part 3 (Abstract / Analytical Discussion): O-R-E-O Framework**:
>        * **O - Opinion**: Clear, direct thesis statement or stance.
>        * **R - Reason**: Logical explanation/cause (Why / Because...).
>        * **E - Example**: Concrete real-life instance, scenario, or illustration.
>        * **O - Opinion / Outcome**: Concise synthesis, restatement, or final takeaway.
>   2. **Job Interview Mode (ONLY when the scenario is a Job / Behavioral Interview)**:
>      - Switch behavior-based situational questions to the **S-T-A-R Framework**:
>        * **S - Situation**: Context, background, and project environment.
>        * **T - Task**: The specific objective, obstacle, or challenge faced.
>        * **A - Action**: Concrete actions taken by the speaker (using strong, active first-person verbs).
>        * **R - Result**: Measurable business/engineering outcome, metric improvement, or key lesson learned.

---

## 📁 Output Folder Structure
```
english/week-<N>/lessons/
├── lesson-overview.md
├── day1/
│   ├── 01-knowledge.md
│   └── 02-exercises.md
├── day2/
│   ├── 01-knowledge.md
│   └── 02-exercises.md
├── day3/
│   ├── 01-knowledge.md
│   └── 02-exercises.md
├── day4/
│   ├── 01-knowledge.md
│   └── 02-exercises.md
└── day5/
    ├── 01-knowledge.md
    └── 02-exercises.md
```

---

## ⏰ Daily 3-Hour (180 Mins) Time Allocation & File Architecture Breakdown

Every day (`day1` through `day5`) is cleanly split into exactly **2 files**:
1. `01-knowledge.md` (~45–60 mins): Input Engine (Context, Dialogue, Rules, Formulas, Collocations, Nuance)
2. `02-exercises.md` (~90–120 mins): Output & Reflex Engine (Warm-up, Drills, Translation, Spoken Frameworks, AI Voice, Review)

| Day | Phase | File 1: `01-knowledge.md` (Input ~45-60m) | File 2: `02-exercises.md` (Output ~90-120m) |
| :--- | :--- | :--- | :--- |
| **Day 1** | Study & Input (Topic 1) | • Topic 1 Setting & Dialogue 1<br>• 3 Grammar Rules & 5 Templates<br>• 5 Collocations & Nuance Guide | • Reflex: The Daily Commentator<br>• Active Listening: TOEIC Dictation<br>• Slot-filling & Translation Drills<br>• AI Speaking & Daily Review |
| **Day 2** | Speaking & Output (Topic 1) | • Topic 1 Setting & Dialogue 2<br>• Model Answers & Analysis<br>• Shadowing & Pacing Guide | • Reflex: 60s Random Pitch<br>• Active Listening: TOEIC Dictation<br>• IELTS Speaking (5W1H & O-R-E-O)<br>• ChatGPT Voice Roleplay & Review |
| **Day 3** | Translation & Analysis (Topic 1) | • Workplace Dialogue Scenario & Model<br>• Native vs Vietlish Contrast Analysis<br>• Monologue & Cue Card Model (5W1H) | • Reflex: AI Voice Roleplay<br>• Active Listening: TOEIC Dictation<br>• Conversation Transcreation Drill<br>• Delivery & Review Checklist |
| **Day 4** | Study & Input (Topic 2 - Tech) | • Topic 2 Tech Setting & Dialogue<br>• 3 Tech Grammar Rules & 5 Templates<br>• 5 Tech Collocations & Nuance Guide | • Active Listening: TOEIC Dictation<br>• Tech Slot-filling & Translation<br>• Error Correction & Plain English Drills<br>• AI Speaking & Daily Review |
| **Day 5** | Translation & STAR (Topic 2 - Tech) | • Tech Incident Scenario & Model<br>• Tech S-T-A-R Model Answer<br>• Shadowing & Pacing Guide | • Reflex: Devil's Advocate Challenge<br>• Active Listening: TOEIC Dictation<br>• Tech Transcreation Drill<br>• S-T-A-R Interview & ChatGPT Voice |

---

## 🛠️ Step 0 - Gather Dynamic Topic Info & Registry Check (Before File Creation)

> [!IMPORTANT]
> **Anti-Duplication Guard (Rolling 3-Week Memory)**
> 1. **Read the Registry**: Before generating any lessons, you **MUST** read [lesson-registry.md](file:///c:/Users/adm.thangvm/repos/thangvo-miscellaneous/english/lesson-registry.md).
> 2. **Verify Duplications**: Ensure that the dynamically chosen theme, target collocations, conversational phrases, and sentence template structures **do not duplicate** any entries used in the **last 3 generated weeks**.
> 3. **Append New Entries**: Once the week's lesson files are successfully created, you **MUST** append the new week's metadata, topics, collocations, grammar, and sentence structures to the bottom of `lesson-registry.md` in the established tabular format.
> 
> **Priority Check: User-Supplied Notes (CRITICAL)**:
> - Before picking topics dynamically, check if `english/week-<N>/notes/` exists.
> - If any notes exist (created via `/add-next-week-material`), you **MUST** prioritize them as the primary grammar rules, sentence templates, collocations, and speaking scenarios for that week!
>
> **Topic Restrictions (No Academic Bloat)**:
> - Confirm that the selected topic is highly practical, conversational, and related to tech workplace/social situations. **DO NOT** generate academic themes like Environmental Protection, Ecology, Science History, etc.

Identify or extract the following core elements based on the **dynamically supplied weekly topic** (ensuring compliance with the 3-week duplication guard):
1. **Metadata**: Title, Source, Target Week, and Target Level (IELTS 6.5 / B1-B2).
2. **Topic 1 (General Social/Workplace)** & **Topic 2 (Tech/Data Operations)**: Dual-topic focus per week for 5-day cycles (Days 1–3 focus on Topic 1; Days 4–5 focus on Topic 2).
3. **3 Target Grammar Rules per Topic**: Key grammatical concepts highly relevant to B1-B2 speaking (e.g., *Using modals for advice, Simple conditionals with "if", Present Perfect for past-to-present experience, Contrast linkers*).
4. **5 Sentence Structure Templates per Topic**: Natural, conversational sentence patterns used in real-life speaking that can be generalized into slot-filling formulas.
5. **5 High-Yield Collocations/Phrases per Topic**: Highly common, natural expressions used by native speakers to explain ideas, actions, and situations clearly. Must be practical and grounded (no corporate buzzwords, boastful idioms, or overly formal phrases), defined with Vietnamese translations and real-life examples.
6. **IELTS Speaking Questions & Delivery Frameworks**: Topic-related questions for:
   - **Part 1 (3 questions)**: Strictly enforce **5W1H** (Direct answer + 1–2 supporting details like Why/When/How).
   - **Part 2 (1 Cue Card)**: Enforce **5W1H checklist** (Who, What, Where, When, Why, How) across bullet points and 1-minute scratchpad.
   - **Part 3 (2 questions)**: Strictly enforce **O-R-E-O** (Opinion, Reason, Example, Opinion/Outcome).
   - *(Note: If a designated scenario or exercise is a Job / Behavioral Interview, switch situational questions to the **S-T-A-R** framework).*

---

## 📄 Step 1 - Generate `lesson-overview.md`

This file introduces the week's themes, conversational vocabulary, 3-hour 5-day schedule, reference conversation transcripts, and the Daily Reflex & Active Listening integration matrix.

### 1. Metadata Table
- Title, Source, Target Level (IELTS 6.5), Target Week.

### 2. High-Yield Collocations & Vocabulary Tables
Separate into Topic 1 (General Social/Workplace) and Topic 2 (Tech/Data Operations).
Columns: `Collocation/Phrase` | `POS` | `Vietnamese Meaning` | `Natural IELTS-Style Example`
- List **5 common, natural, real-life phrases** per topic with accurate Vietnamese translations and standard spoken examples. Prioritize functional self-explanation phrases over exaggerated idioms or corporate clichés.

### 3. Comprehensive 5-Day Study Schedule & Objectives Table (3-Hour Focus)
Include the full 5-Day schedule table mapping out all 4 blocks per day:
| Day | Phase | Speaking Reflex Focus (15m) | Active Listening Focus (20-30m) | Workplace Practice (60m) | AI Speaking & Review (75m) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Day 1** | Study & Input (Topic 1) | 🎙️ The Daily Commentator | 🎧 TOEIC Dictation (3 Exercises) | Topic 1 Grammar, Formulas & Vocab Study | Practice with AI using today's lessons |
| **Day 2** | Speaking & Output (Topic 1) | ⏱️ 60s Random Object Pitch | 🎧 TOEIC Dictation (3 Exercises) | Topic 1 IELTS Practice & Shadowing | ChatGPT Voice Mode Roleplay (IELTS) |
| **Day 3** | Translation & Analysis (Topic 1) | 🤖 AI Voice Roleplay | 🎧 TOEIC Dictation (3 Exercises) | 🇻🇳➡️🇬🇧 Conversation Translation Drill (General), Monologue & Model Analysis | Practice with AI using today's translated dialogue |
| **Day 4** | Study & Input (Topic 2) | *(Focused Input)* | 🎧 TOEIC Dictation (3 Exercises) | Topic 2 Grammar, Formulas & Vocab Study (Tech) | Practice with AI using today's tech lessons |
| **Day 5** | Translation & Output (Topic 2) | 😈 Devil's Advocate Challenge | 🎧 TOEIC Dictation (3 Exercises) | 🇻🇳➡️🇬🇧 Tech Conversation Translation Drill & IELTS Speaking / Shadowing | ChatGPT Voice Mode Roleplay (Tech Workplace Simulation) |

### 4. Core Lesson Dialogues
- Generate 2 natural, highly realistic conversation transcripts between 2 characters (Dialogue 1 for Topic 1, Dialogue 2 for Topic 2).
- **Important**: Naturally integrate the target grammar rules, sentence structure templates, and high-yield collocations into each dialogue.
- Highlight target grammar/sentence patterns in **bold** in the transcripts.

---

## 📄 Step 2 - Generate Day 1 & Day 4: `day<D>/01-knowledge.md` & `day<D>/02-exercises.md`

For both **Day 1** (Topic 1: General Social/Workplace) and **Day 4** (Topic 2: Tech/Data Operations), create two distinct files:

### File 1: `day<D>/01-knowledge.md` (The Input Engine — ~45–60 mins)
- **Metadata Frontmatter**: `title`, `week`, `day`, `type: knowledge`, `target_level`, `estimated_time`.
- **Section 1: Scenario & Context**: Setting the scene for the dialogue.
- **Section 2: Dialogue Transcript**: Realistic conversation (10–14 turns) between 2 characters with target structures in **bold**.
- **Section 3: Grammar Deconstruction (3 Target Rules)**:
  - Rule name, quote from dialogue, simple explanation, and Common Pitfall Box (*Incorrect vs. Correct*).
- **Section 4: Sentence Structure Templates (5 Patterns)**:
  - Communicative function, slot-filling formula, and 3 distinct examples (Everyday, Tech/Casino, General Workplace).
- **Section 5: High-Yield Collocations (5 Items)** & **Nuance Guide**:
  - Collocation table with POS, Vietnamese meaning, and plain English usage tips.
  - Delivery tips on breath-friendly phrasing and natural pausing.

### File 2: `day<D>/02-exercises.md` (The Output Engine — ~90–120 mins)
- **Metadata Frontmatter**: `title`, `week`, `day`, `type: exercises`, `target_level`, `estimated_time`.
- **Block 1: Warm-up Reflex & Active Listening (35–45 Mins)**:
  - *Speaking Reflex*: **The Daily Commentator 🎙️** (15 mins) (Day 1) or targeted spoken warm-up (Day 4).
  - *Active Listening*: **TOEIC Dictation 🎧** (20–30 mins) — 3 exercises with red-pen transcription analysis.
- **Block 2: Interactive Grammar & Template Drills (35–40 Mins)**:
  - Dedicated transformation, contextual fill-in, and personalized rewrite prompts for all 3 grammar rules and 5 templates.
  - Multi-rule integration mastery drill.
  - Collapsible Answer Keys (`<details><summary>💡 Click to View Suggested Answers & Analysis</summary>`).
- **Block 3: Production, Translation & Error Correction (30 Mins)**:
  - 3 custom Vietnamese-to-English translation challenges with collapsed model answers.
  - Spot the Mistake (3 pitfall sentences with explanations).
- **Block 4 & 5: AI Speaking & Review (45–60 Mins)**:
  - ChatGPT Voice Mode instructions with the 3 mandatory exercises (Rapid Q&A, Instant Translation, Roleplay).
  - Anki flashcard review reminder & error log table.

---

## 📄 Step 3A - Generate Day 2: `day2/01-knowledge.md` & `day2/02-exercises.md`

For **Day 2 (Topic 1: Speaking Output & Reflex Frameworks)**:

### File 1: `day2/01-knowledge.md` (The Input Engine — ~45–60 mins)
- **Metadata Frontmatter**: `title`, `week`, `day: 2`, `type: knowledge`, `target_level`, `estimated_time`.
- **Section 1: Scenario Setup & Follow-up Context**: Contextualizing today's deeper discussions or speaking prompts.
- **Section 2: High-Performing Model Structures & Vocabulary**:
  - Sample Band 6.5–7.0 responses showing natural, non-academic Plain English.
  - Useful discursive linkers (*because of that, the reason is, what surprised me was*).
- **Section 3: Interactive Shadowing & Pacing Guide**:
  - 2–3 key spoken lines broken down with rhythm slashes `/` for natural pauses and **bold/CAPITALIZED** stress markers.

### File 2: `day2/02-exercises.md` (The Output Engine — ~90–120 mins)
- **Metadata Frontmatter**: `title`, `week`, `day: 2`, `type: exercises`, `target_level`, `estimated_time`.
- **Block 1: Warm-up Reflex & Active Listening (35–45 Mins)**:
  - *Speaking Reflex*: **The 60-Second Random Object Pitch ⏱️** (15 mins) — Continuous 60s pitch on an object/work tool without long pauses.
  - *Active Listening*: **TOEIC Dictation 🎧** (20–30 mins) — Complete 3 short TOEIC listening exercises with full word-for-word dictation.
- **Block 2: Spoken Framework Drills (IELTS & Workplace Prep) (45 Mins)**:
  - **Part 1 (3 Questions)**: Strictly enforcing **5W1H** (Direct answer + 1–2 supporting details).
  - **Part 2 (Cue Card)**: 1 prompt structured with 1-min scratchpad through the **5W1H checklist** for 1.5–2 mins flow.
  - **Part 3 (2 Questions)**: Strictly enforcing **O-R-E-O** (Opinion, Reason, Example, Opinion/Outcome).
- **Block 3: Interactive Shadowing Practice (15 Mins)**:
  - Practice reading aloud with the pacing markers from `01-knowledge.md` to internalize natural rhythm.
- **Block 4 & 5: AI Voice Simulation & Review (45–60 Mins)**:
  - ChatGPT Voice Mode simulation prompt (<300 chars, <10 hyphens).
  - Mandatory 3 AI exercises (Rapid Q&A, Instant Translation, Roleplay).
  - Blank feedback logging table & Anki review.

---

## 📄 Step 3B - Generate Day 3: `day3/01-knowledge.md` & `day3/02-exercises.md`

For **Day 3 (Topic 1: Translation & Monologue Analysis)**:

### File 1: `day3/01-knowledge.md` (The Input Engine — ~45–60 mins)
- **Metadata Frontmatter**: `title`, `week`, `day: 3`, `type: knowledge`, `target_level`, `estimated_time`.
- **Section 1: Dialogue Scenario**: Relatable Vietnamese dialogue (8–12 turns) set in office/social life.
- **Section 2: Native Model Comparison & Analysis**:
  - Complete native English dialogue model.
  - Side-by-side contrastive notes showing literal "Vietlish" traps vs. natural native idioms/phrases.
- **Section 3: Monologue & Cue Card Model Answer**:
  - Natural monologue explaining a daily life or workplace topic.
  - Band 6.5–7.0 model response demonstrating the **5W1H framework** (Who, What, Where, When, Why, How) for 1.5–2 min flow.

### File 2: `day3/02-exercises.md` (The Output Engine — ~90–120 mins)
- **Metadata Frontmatter**: `title`, `week`, `day: 3`, `type: exercises`, `target_level`, `estimated_time`.
- **Block 1: Warm-up Reflex & Active Listening (35–45 Mins)**:
  - *Speaking Reflex*: **Unconventional AI Voice Roleplay 🤖** (15 mins) — Dramatic/quirky AI voice roleplay (e.g., Demanding Customer, Alien Encounter).
  - *Active Listening*: **TOEIC Dictation 🎧** (20–30 mins) — Complete 3 short TOEIC listening exercises with full word-for-word dictation.
- **Block 2: Conversation Transcreation Drill (45 Mins)**:
  - Active transcreation of the 8–12 turn dialogue into natural spoken English.
  - Aloud repetition drill (3–5 times) to cement natural rhythm.
- **Block 3: Situational Production & Monologue Delivery (20 Mins)**:
  - Deliver the monologue aloud using target linkers; self-evaluation checklist.
- **Block 4 & 5: AI Speaking & Review (45–60 Mins)**:
  - Practice speaking with AI using today's translated dialogue and the 3 mandatory exercises (Rapid Q&A, Instant Translation, Roleplay).
  - Portfolio error logging & Anki review.

---

## 📄 Step 3C - Generate Day 5: `day5/01-knowledge.md` & `day5/02-exercises.md`

For **Day 5 (Topic 2: Tech Translation & S-T-A-R Interview Output)**:

### File 1: `day5/01-knowledge.md` (The Input Engine — ~45–60 mins)
- **Metadata Frontmatter**: `title`, `week`, `day: 5`, `type: knowledge`, `target_level`, `estimated_time`.
- **Section 1: Tech Workplace Scenario**:
  - Realistic Vietnamese workplace dialogue (8–12 turns) set in a real data engineering context (pipeline delay, schema migration, ETL debugging).
  - Native English model dialogue and contrastive notes.
- **Section 2: Tech S-T-A-R Model Answer**:
  - Model response demonstrating Situation, Task, Action, Result for a behavioral interview or post-mortem incident report.
- **Section 3: Tech Shadowing & Pacing Guide**:
  - 2 key lines from lesson dialogues broken down with rhythm slashes `/` and **bold/CAPITALIZED** stress markers.

### File 2: `day5/02-exercises.md` (The Output Engine — ~90–120 mins)
- **Metadata Frontmatter**: `title`, `week`, `day: 5`, `type: exercises`, `target_level`, `estimated_time`.
- **Block 1: Warm-up Reflex & Active Listening (35–45 Mins)**:
  - *Speaking Reflex*: **The "Devil's Advocate" Challenge 😈** (15 mins) — Stating an opinion and immediately refuting it within 30s using contrast linkers.
  - *Active Listening*: **TOEIC Dictation 🎧** (20–30 mins) — Complete 3 short TOEIC listening exercises with full word-for-word dictation.
- **Block 2: Tech Transcreation & S-T-A-R Practice (45 Mins)**:
  - Active transcreation of the tech workplace dialogue.
  - S-T-A-R interview question practice with blank slots for Situation, Task, Action, Result.
  - Tech IELTS questions using **5W1H** (Part 1/2) and **O-R-E-O** (Part 3).
- **Block 3: Interactive Shadowing Practice (15 Mins)**:
  - Aloud repetition using the pacing guide markers.
- **Block 4 & 5: AI Voice Simulation & Weekly Wrap-up (45–60 Mins)**:
  - ChatGPT Voice Mode tech prompt (<300 chars, <10 hyphens).
  - Mandatory 3 AI exercises (Rapid Q&A, Instant Translation, Roleplay).
  - Weekly portfolio log completion, feedback logging table, Anki wrap-up. Rest on the weekend!
