---
description: The core topic-agnostic project backbone of the English learning system. Generates comprehensive weekly study modules focusing on grammar, sentence structures, vocabulary with Vietnamese meanings, IELTS Speaking practice, and Daily Reflex & Active Listening exercises, tailored for a 3-hour/day, 6-day/week (18 hours/week) intensive practice schedule targeting a natural, conversational Band 6.5 level using real-life vocabulary.
---

# Workflow: /generate-english-lesson (Unified GSC & IELTS Speaking Plan - Band 6.5 Focus & 3-Hour Daily Reflex Engine)

> [!IMPORTANT]
> **⚓ CORE PROJECT BACKBONE (Data Engineer Practical Daily Focus & 3-Hour Daily Practice Engine)**
> - This workflow rule is the permanent, structural engine of this repository.
> - **3-Hour Daily Schedule (18 Hours/Week)**: Every generated weekly lesson is designed for a learner committing **3 hours a day (180 minutes), 6 days a week**. Each day incorporates a balanced 4-block workflow:
>   1. **Block 1: Warm-up & Daily Reflex Drills (30 mins)**: Spontaneous speaking + acoustic audio decoding.
>   2. **Block 2: Core Weekly Lesson Engine (90 mins)**: Grammar, slot-filling formulas, vocabulary, IELTS Speaking / AI voice simulation, creative writing, or monologue analysis.
>   3. **Block 3: Skimming & Short Video Production (40 mins)**: 10-second eye-sweep skimming, 60-second video/audio recording, and targeted audio breakdown.
>   4. **Block 4: Review & Consolidation (20 mins)**: Anki/flashcard repetition, error logging, and self-evaluation.
> - **Integrated Reflex & Active Listening Toolkit**: Every daily lesson MUST embed specific exercises from [daily-reflex-and-active-listening-practices.md](file:///c:/Users/adm.thangvm/repos/thangvo-miscellaneous/english/daily-reflex-and-active-listening-practices.md) (e.g., *Daily Commentator, 60s Pitch, AI Voice Roleplay, Dubbing Shadowing, Devil's Advocate, Micro-Dictation, Echoing, 3-Sentence Summary, Gap-Fill Decoding, Connected Speech Mapping*).
> - **Daily & Practical Tech-Adjacent Topics (CRITICAL)**: All generated themes/topics must focus on **practical daily situations** and **casual workplace settings** rather than academic, formal, or abstract IELTS topics (strictly avoid themes like environmental protection, global warming, space exploration, biodiversity, history). Prioritize topics applicable to daily social and professional life as a data engineer.
>   - *Ideal Topic Examples*: Small talk at the coffee machine, talking about weekend plans with colleagues, discussing daily commutes, team lunch conversations, handling busy or stressful workdays, asking a coworker for help, explaining a pipeline/query to non-technical stakeholders, discussing work-life balance or tech-industry stress.
> - **Band 6.5 & Real-Life Target**: Prioritize natural, widely-used, conversational English (CEFR B1-B2) suitable for a strong IELTS 6.5 Speaking score. Avoid academic bloat or obscure C1-C2 terms.

---

## 📁 Output Folder Structure
```
english/week-<N>/lessons/
├── lesson-overview.md
├── day1-grammar-and-structures.md
├── day2-ielts-and-simulation-practice.md
├── day3-creative-writing-and-analysis.md
├── day4-grammar-and-structures.md
├── day5-ielts-and-simulation-practice.md
├── day6-creative-writing-and-analysis.md
└── skimming-transcripts.md
```

---

## ⏰ Daily 3-Hour (180 Mins) Time Allocation Breakdown

Every generated daily file (`day1` through `day6`) must align with the following 4-block operational breakdown:

| Block | Focus | Duration | Key Activities |
| :--- | :--- | :--- | :--- |
| **Block 1** | Warm-up & Reflex Drills | **30 mins** | • 15m Daily Speaking Reflex Exercise<br>• 15m Active Audio Decoding Exercise |
| **Block 2** | Core Weekly Lesson Engine | **90 mins** | • **Days 1 & 4**: Grammar Rules (3), Slot Templates (5), Collocations (5), Drills<br>• **Days 2 & 5**: IELTS Speaking Part 1-3, ChatGPT Voice Mode Roleplay, Shadowing<br>• **Days 3 & 6**: Creative Dialogue Writing, Monologue Recitation & Cue Card Analysis |
| **Block 3** | Skimming & Video Production | **40 mins** | • 15m 10-Second Skimming Eye-Sweep (Keywords Only)<br>• 15m 60-Second Video/Audio Recording & Self-Review<br>• 10m Targeted Audio Breakdown |
| **Block 4** | Review & Consolidation | **20 mins** | • 10m Anki / Flashcard Review (Collocations & Formulas)<br>• 10m Error Logging & Self-Evaluation Checklist |

---

## 🛠️ Step 0 - Gather Dynamic Topic Info & Registry Check (Before File Creation)

> [!IMPORTANT]
> **Anti-Duplication Guard (Rolling 3-Week Memory)**
> 1. **Read the Registry**: Before generating any lessons, you **MUST** read [lesson-registry.md](file:///c:/Users/adm.thangvm/repos/thangvo-miscellaneous/english/lesson-registry.md).
> 2. **Verify Duplications**: Ensure that the dynamically chosen theme, target collocations, conversational phrases, and sentence template structures **do not duplicate** any entries used in the **last 3 generated weeks**.
> 3. **Append New Entries**: Once the week's lesson files are successfully created, you **MUST** append the new week's metadata, topics, collocations, grammar, and sentence structures to the bottom of `lesson-registry.md` in the established tabular format.
> 
> **Topic Restrictions (No Academic Bloat)**:
> - Confirm that the selected topic is highly practical, conversational, and related to tech workplace/social situations. **DO NOT** generate academic themes like Environmental Protection, Ecology, Science History, etc.

Identify or extract the following core elements based on the **dynamically supplied weekly topic** (ensuring compliance with the 3-week duplication guard):
1. **Metadata**: Title, Source, Target Week, and Target Level (IELTS 6.5 / B1-B2).
2. **Topic 1 (General Social/Workplace)** & **Topic 2 (Tech/Data Operations)**: Dual-topic focus per week for 6-day cycles (Days 1–3 focus on Topic 1; Days 4–6 focus on Topic 2).
3. **3 Target Grammar Rules per Topic**: Key grammatical concepts highly relevant to B1-B2 speaking (e.g., *Using modals for advice, Simple conditionals with "if", Present Perfect for past-to-present experience, Contrast linkers*).
4. **5 Sentence Structure Templates per Topic**: Natural, conversational sentence patterns used in real-life speaking that can be generalized into slot-filling formulas.
5. **5 High-Yield Collocations/Idioms per Topic**: Highly common, natural expressions used by native speakers in day-to-day conversation, defined with Vietnamese translations and real-life examples.
6. **IELTS Speaking Questions**: Topic-related questions for Part 1 (3 questions), Part 2 (1 Cue Card), and Part 3 (2 questions).

---

## 📄 Step 1 - Generate `lesson-overview.md`

This file introduces the week's themes, conversational vocabulary, 3-hour 6-day schedule, reference conversation transcripts, and the Daily Reflex & Active Listening integration matrix.

### 1. Metadata Table
- Title, Source, Target Level (IELTS 6.5), Target Week.

### 2. High-Yield Collocations & Vocabulary Tables
Separate into Topic 1 (General Social/Workplace) and Topic 2 (Tech/Data Operations).
Columns: `Collocation/Phrase` | `POS` | `Vietnamese Meaning` | `Natural IELTS-Style Example`
- List **5 common, natural, real-life phrases** per topic with accurate Vietnamese translations and standard spoken examples.

### 3. Comprehensive 6-Day Study Schedule & Objectives Table (3-Hour Focus)
Include the full 6-Day schedule table mapping out all 4 blocks per day:
| Day | Phase | Speaking Reflex Focus (15m) | Active Listening Focus (15m) | Core Engine Focus (90m) | Primary Deliverable |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Day 1** | Study & Input (Topic 1) | 🎙️ The Daily Commentator | ✍️ Micro-Dictation | Topic 1 Grammar, Formulas & Vocab Study | Complete all drills in `day1-grammar-and-structures.md`. |
| **Day 2** | Speaking & Output (Topic 1) | ⏱️ 60s Random Object Pitch | 🗣️ Audio Echoing / Shadowing | Topic 1 IELTS Questions & AI Voice Simulation | Answer IELTS questions & run ChatGPT Voice roleplay. |
| **Day 3** | Refinement & Writing (Topic 1) | 🤖 AI Voice Roleplay | 🧩 Gap-Fill Decoding | Topic 1 Creative Writing & Band 6.5 Cue Card Analysis | Write custom dialogue & analyze Band 6.5 model answer. |
| **Day 4** | Study & Input (Topic 2) | 🎬 Dubbing & Emotion Shadowing | 🗺️ Connected Speech Mapping | Topic 2 Grammar, Formulas & Vocab Study (Tech) | Complete all drills in `day4-grammar-and-structures.md`. |
| **Day 5** | Speaking & Output (Topic 2) | 😈 Devil's Advocate Challenge | 📝 3-Sentence Active Summary | Topic 2 IELTS Questions & AI Voice Simulation (Tech) | Answer IELTS questions & run ChatGPT Voice roleplay. |
| **Day 6** | Refinement & Writing (Topic 2) | 🎙️ Free Pitch / Commentator | ✍️ Micro-Dictation / Audio Breakdown | Topic 2 Creative Writing & Technical Monologue | Write custom dialogue & present technical monologue. |

### 4. Core Lesson Dialogues
- Generate 2 natural, highly realistic conversation transcripts between 2 characters (Dialogue 1 for Topic 1, Dialogue 2 for Topic 2).
- **Important**: Naturally integrate the target grammar rules, sentence structure templates, and high-yield collocations into each dialogue.
- Highlight target grammar/sentence patterns in **bold** in the transcripts.

---

## 📄 Step 2 - Generate `day1-grammar-and-structures.md` & `day4-grammar-and-structures.md`

This file houses Block 1 (Warm-up & Reflex Drills), Block 2 (Structural Foundation & Grammar Deconstruction), Block 3 (Skimming & Production), and Block 4 (Review & Error Logging).

### Section 0: Block 1 - Warm-up Reflex & Active Listening (30 Mins)
Provide explicit practice prompts for the day's designated exercises from [daily-reflex-and-active-listening-practices.md](file:///c:/Users/adm.thangvm/repos/thangvo-miscellaneous/english/daily-reflex-and-active-listening-practices.md):
- **Day 1**:
  - *Speaking Reflex*: **The Daily Commentator 🎙️** (15 mins) — Prompts for narrating actions using the day's target vocabulary.
  - *Active Listening*: **Micro-Dictation (Function Words) ✍️** (15 mins) — Transcribing a short dialogue audio snippet with focus on weak form function words (*a, the, to, of, can*).
- **Day 4**:
  - *Speaking Reflex*: **Dubbing & Emotion Shadowing 🎬** (15 mins) — Shadowing dialogue lines matching native speed and emotion.
  - *Active Listening*: **Connected Speech Mapping 🗺️** (15 mins) — Mapping linking sound ($\smile$), elision, and stress markers on target sentences.

### Section 1: Block 2 - Grammar Focus (3 Target Rules) (90 Mins)
For each of the **3 target grammar rules**:
- **Grammar Point Name** (e.g., *Talking about experience using Present Perfect*)
- **Quote**: Exact sentence from the dialogue showing this rule.
- **Rule Explanation**: Simple, clear explanation of usage and form.
- **Common Pitfall Box**: A warning box showing a frequent mistake and how to correct it (*Incorrect vs. Correct*).

### Section 2: Sentence Structure Templates (5 Patterns)
For each of the **5 sentence structures**:
- **Communicative Function**: (e.g., *To give a recommendation*, *To compare two choices*).
- **Slot-Filling Formula**: Expressed using brackets for modular components (e.g., `It's really important that + [Subject] + [Verb] + before + [Noun]`).
- **Examples**: Provide 3 distinct example sentences utilizing the formula:
  1. *Everyday Context*
  2. *Data Engineering / Casino Context*
  3. *General Workplace Context*

### Section 3: Production & Translation Drills
- **"Your Turn" Exercises**: Prompts for each of the 5 templates with blank spaces (`- `) for custom sentence construction.
- **Translation / Transformation Challenge**: 3 custom sentences to translate (Vietnamese to English) or restructure using target grammar.

### Section 4: Spot the Mistake (Error Correction Drill)
- 3 custom incorrect sentences featuring common grammatical or collocation pitfalls.
- Collapsed Answer Key (`<details>`) with B1-B2 explanations.

### Section 5: Block 3 & 4 - Skimming, Video Recording & Daily Consolidation (60 Mins)
- **Skimming & Video Practice (40 Mins)**: Instructions to perform 10-Second Eye-Sweep on `skimming-transcripts.md` and record a 60-second video response.
- **Review & Consolidation (20 Mins)**: Anki flashcard logging prompt and error log checklist.

---

## 📄 Step 3A - Generate `day2-ielts-and-simulation-practice.md` & `day5-ielts-and-simulation-practice.md`

This file facilitates Block 1 reflex warm-ups, active output, structured IELTS speaking practice, AI voice simulation, and intonation shadowing.

### Section 0: Block 1 - Warm-up Reflex & Active Listening (30 Mins)
- **Day 2**:
  - *Speaking Reflex*: **The 60-Second Random Object Pitch ⏱️** (15 mins) — Continuous 60s pitch on an object using target descriptors without pausing >2s.
  - *Active Listening*: **Audio Echoing / Real-Time Shadowing 🗣️** (15 mins) — Immediate echo repetition with a 0.5s delay.
- **Day 5**:
  - *Speaking Reflex*: **The "Devil's Advocate" Challenge 😈** (15 mins) — Stating an opinion and immediately refuting it within 30s using contrast linkers.
  - *Active Listening*: **The 3-Sentence Active Summary 📝** (15 mins) — Summarizing a 2-3 minute audio snippet in 3 structured sentences.

### Section 1: Block 2 - IELTS Speaking Practice Questions (90 Mins)
- **Part 1 (Interview)**: 3 introductory questions related to the week's theme.
- **Part 2 (Cue Card)**: 1 complete IELTS Part 2 prompt with bullet points.
- **Part 3 (Analytical Discussion)**: 2 discussion questions.

### Section 2: ChatGPT Voice Mode Simulation Prompt
- A prompt based on the theme and the user's background (Data Engineering / Casino).
- **Prompt Constraints (CRITICAL)**:
  - **Length**: Prompt text inside code block must be **less than 300 characters**.
  - **Hyphens**: Must contain **fewer than 10 hyphens/dashes (`-`)**.
  - **Topic**: Clear, natural conversation topic or direction.

### Section 3: Feedback Logging Table
- A blank table to log grammar, pronunciation, and vocabulary corrections received during AI voice sessions.

### Section 4: Interactive Shadowing & Pacing Guide
- 2 key lines from lesson dialogues broken down with visual rhythm markers:
  - Slashes `/` for natural speaking pauses/boundaries.
  - **Bold** or CAPITALIZED text for word stress and emphasis.

### Section 5: Block 3 & 4 - Skimming, Video Recording & Review (60 Mins)
- Instructions for 60-second video recording based on IELTS Part 2 Cue Card & Anki review.

---

## 📄 Step 3B - Generate `day3-creative-writing-and-analysis.md` & `day6-creative-writing-and-analysis.md`

This file facilitates personal production, creative dialogue writing, structured analysis of high-performing Band 6.5 model answers, monologue explanations, and daily reflex warm-ups.

### Section 0: Block 1 - Warm-up Reflex & Active Listening (30 Mins)
- **Day 3**:
  - *Speaking Reflex*: **Unconventional AI Voice Roleplay 🤖** (15 mins) — Dramatic/quirky AI voice roleplay (e.g., Demanding Customer, Alien Encounter).
  - *Active Listening*: **Self-Generated Gap-Fill Decoding 🧩** (15 mins) — Filling in 5-10 erased target words while listening to lesson dialogue audio.
- **Day 6**:
  - *Speaking Reflex*: **The Daily Commentator / Free Pitch 🎙️** (15 mins) — Freestyle narrative commentary or object pitch combining all weekly vocab.
  - *Active Listening*: **Micro-Dictation / Audio Breakdown ✍️** (15 mins) — Transcribing complex sentences from Day 6 technical monologue audio.

### Section 1: Block 2 - Creative Dialogue Writing (90 Mins)
- Instruct the user to write a new conversation transcript (10+ turns) incorporating target structures.

### Section 2: Monologue (General for Day 3, Technical for Day 6)
- **Day 3 (General Monologue)**: An original monologue explaining a daily life, sports, or office-social topic.
- **Day 6 (Technical Monologue)**: An original monologue from a data engineer's perspective explaining a technical system design, pipeline architecture, database layout, or server incident.
- Highlight target grammar/phrases in **bold**. Include a "Key Vocabulary & Concepts" section below it with Vietnamese translations.

### Section 3: Band 6.5-7.0 Cue Card Sample Answer
- A natural **Band 6.5-7.0 model response** answering the Day 2 Part 2 Cue Card.
- Highlight 3-5 key real-life phrases with Vietnamese translations.

### Section 4: Self-Evaluation Checklist & Situational Responses
- A checklist for target grammar, templates, and collocations.
- 2 role-specific speaking/writing scenarios relevant to Data Engineering or Casino Operations with collapsed model answers.

### Section 5: Block 3 & 4 - Skimming, Video Recording & Weekly Wrap-up (60 Mins)
- 60-second monologue video recording and weekly portfolio log completion.

---

## 📄 Step 4 - Generate `skimming-transcripts.md`

This file provides 60-second video transcripts (~120-140 words) for short-form video creation and rapid 10-second skimming training (Block 3).

### 1. Document Format & Pacing
For each topic in the week's lesson, generate a dedicated skimming block:
- **Title**: A catchy, high-engagement title.
- **Metadata**: Topic, Target Duration (60s), Word Count (120-140 words), Speaking Speed (~130 WPM).
- **Transcript**: Punchy single-speaker monologue incorporating at least **2 target collocations**, **1 target grammar rule**, and **1 sentence template**. Include timeline markers (`[00:00]`, `[00:20]`, `[00:40]`).

### 2. 10-Second Skimming Training (Eye-Sweep)
- **The Skimming Core (Keywords Only)**: Bare-bones layout displaying *only* key nouns, verbs, and target phrases in **bold** to train eye sweeps under 10 seconds.
- **Skimming Check**: 2 quick comprehension questions with answers placed in a collapsed details block.
