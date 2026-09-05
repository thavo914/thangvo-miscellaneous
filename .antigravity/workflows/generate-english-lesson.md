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
└── day5-ielts-and-simulation-practice.md
```

---

## ⏰ Daily 3-Hour (180 Mins) Time Allocation Breakdown

Every generated daily file (`day1` through `day5`) must align with the following 4-block operational breakdown:

| Block | Focus | Duration | Key Activities |
| :--- | :--- | :--- | :--- |
| **Block 1** | Warm-up & Reflex Drills | **35-45 mins** | • 15m Daily Speaking Reflex Exercise<br>• 20-30m TOEIC Dictation (3 Exercises) |
| **Block 2** | Workplace Practice | **60 mins** | • **Days 1 & 4**: Grammar Rules (3), Slot Templates (5), Collocations (5), Drills<br>• **Day 2**: Topic 1 IELTS Speaking Part 1-3, Shadowing & Rhythm<br>• **Day 3**: Topic 1 Vietnamese-to-English Conversation Translation, Monologue & Model Analysis<br>• **Day 5**: Topic 2 Vietnamese-to-English Tech Conversation Translation, IELTS Speaking & Shadowing |
| **Block 3** | AI Speaking | **60 mins** | • Practice speaking English with AI using the lessons/vocabulary from Block 2<br>• ChatGPT Voice Mode Roleplay (IELTS Simulation / Tech Workplace Simulation) |
| **Block 4** | Review & Consolidation | **15 mins** | • Anki / Flashcard Review<br>• Error Logging & Self-Evaluation Checklist |

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
2. **Topic 1 (General Social/Workplace)** & **Topic 2 (Tech/Data Operations)**: Dual-topic focus per week for 5-day cycles (Days 1–3 focus on Topic 1; Days 4–5 focus on Topic 2).
3. **3 Target Grammar Rules per Topic**: Key grammatical concepts highly relevant to B1-B2 speaking (e.g., *Using modals for advice, Simple conditionals with "if", Present Perfect for past-to-present experience, Contrast linkers*).
4. **5 Sentence Structure Templates per Topic**: Natural, conversational sentence patterns used in real-life speaking that can be generalized into slot-filling formulas.
5. **5 High-Yield Collocations/Idioms per Topic**: Highly common, natural expressions used by native speakers in day-to-day conversation, defined with Vietnamese translations and real-life examples.
6. **IELTS Speaking Questions**: Topic-related questions for Part 1 (3 questions), Part 2 (1 Cue Card), and Part 3 (2 questions).

---

## 📄 Step 1 - Generate `lesson-overview.md`

This file introduces the week's themes, conversational vocabulary, 3-hour 5-day schedule, reference conversation transcripts, and the Daily Reflex & Active Listening integration matrix.

### 1. Metadata Table
- Title, Source, Target Level (IELTS 6.5), Target Week.

### 2. High-Yield Collocations & Vocabulary Tables
Separate into Topic 1 (General Social/Workplace) and Topic 2 (Tech/Data Operations).
Columns: `Collocation/Phrase` | `POS` | `Vietnamese Meaning` | `Natural IELTS-Style Example`
- List **5 common, natural, real-life phrases** per topic with accurate Vietnamese translations and standard spoken examples.

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

## 📄 Step 2 - Generate `day1-grammar-and-structures.md` & `day4-grammar-and-structures.md`

This file houses Block 1 (Warm-up & Reflex Drills), Block 2 (Structural Foundation & Grammar Deconstruction), Block 3 (Skimming & Production), and Block 4 (Review & Error Logging).

### Section 0: Block 1 - Warm-up Reflex & Active Listening
Provide explicit practice prompts for the day's designated exercises from [daily-reflex-and-active-listening-practices.md](file:///c:/Users/adm.thangvm/repos/thangvo-miscellaneous/english/daily-reflex-and-active-listening-practices.md):
- **Day 1 & Day 4**:
  - *Speaking Reflex*: **The Daily Commentator 🎙️** (15 mins) — Prompts for narrating actions using the day's target vocabulary. (Day 1 only)
  - *Active Listening*: **TOEIC Dictation 🎧** (20-30 mins) — Complete 3 short TOEIC listening exercises with full word-for-word dictation, pausing as needed. Compare with transcript and correct with a red pen.

### Section 1: Block 2 - Workplace Practice (Grammar & Structures) (60 Mins)
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

### Section 5: Block 3 & 4 - AI Speaking & Daily Consolidation (75 Mins)
- **AI Speaking Practice (60 Mins)**: Instructions to practice speaking with AI (ChatGPT Voice Mode) using today's grammar rules, templates, and collocations. **IMPORTANT: You MUST append the following exact block to this section:**
  > **Suggested Exercises (AI Prompts):**
  >
  > 1. **Rapid Q&A:**
  >    > "Act as my English tutor. Ask me random English questions ranging from easy to advanced (topics: daily life, work, opinions, etc.). I will answer in English as quickly as possible. After I answer, please correct my grammar and vocabulary, and suggest more natural, native-like ways to express my ideas."
  >
  > 2. **Instant Translation (Reverse Shadowing):**
  >    > "Give me a common Vietnamese situation or daily phrase. I will try to translate it into English out loud within 3–5 seconds. After my attempt, please provide the most natural English translation so I can compare."
  >
  > 3. **Role-play:**
  >    > "Let's do a role-play. Please choose one of these topics: ordering at a restaurant, a job interview, traveling/at the airport, or discussing work with a colleague. We will have a back-and-forth conversation entirely in English."
- **Review & Consolidation (15 Mins)**: Anki flashcard logging prompt and error log checklist.

---

## 📄 Step 3A - Generate `day2-ielts-and-simulation-practice.md`

This file facilitates Block 1 reflex warm-ups, active output, structured IELTS speaking practice, AI voice simulation, and intonation shadowing for **Topic 1 (General Social/Workplace)**.

### Section 0: Block 1 - Warm-up Reflex & Active Listening
- *Speaking Reflex*: **The 60-Second Random Object Pitch ⏱️** (15 mins) — Continuous 60s pitch on an object using target descriptors without pausing >2s.
- *Active Listening*: **TOEIC Dictation 🎧** (20-30 mins) — Complete 3 short TOEIC listening exercises with full word-for-word dictation.

### Section 1: Block 2 - Workplace Practice (IELTS Prep) (60 Mins)
- **Part 1 (Interview)**: 3 introductory questions related to Topic 1.
- **Part 2 (Cue Card)**: 1 complete IELTS Part 2 prompt with bullet points.
- **Part 3 (Analytical Discussion)**: 2 discussion questions.

### Section 2: ChatGPT Voice Mode Simulation Prompt
- A prompt based on Topic 1 and the user's background.
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

### Section 5: Block 3 & 4 - AI Speaking & Review (75 Mins)
- **AI Speaking Practice (60 Mins)**: Use the ChatGPT Voice Mode Simulation Prompt above to conduct the roleplay. **IMPORTANT: You MUST append the following exact block to this section:**
  > **Suggested Exercises (AI Prompts):**
  >
  > 1. **Rapid Q&A:**
  >    > "Act as my English tutor. Ask me random English questions ranging from easy to advanced (topics: daily life, work, opinions, etc.). I will answer in English as quickly as possible. After I answer, please correct my grammar and vocabulary, and suggest more natural, native-like ways to express my ideas."
  >
  > 2. **Instant Translation (Reverse Shadowing):**
  >    > "Give me a common Vietnamese situation or daily phrase. I will try to translate it into English out loud within 3–5 seconds. After my attempt, please provide the most natural English translation so I can compare."
  >
  > 3. **Role-play:**
  >    > "Let's do a role-play. Please choose one of these topics: ordering at a restaurant, a job interview, traveling/at the airport, or discussing work with a colleague. We will have a back-and-forth conversation entirely in English."
- **Review & Consolidation (15 Mins)**: Feedback logging table & Anki review.

---

## 📄 Step 3B - Generate `day3-creative-writing-and-analysis.md`

This file facilitates personal production, **Vietnamese-to-English Conversation Translation & Transcreation**, structured analysis of high-performing Band 6.5 model answers, monologue explanations, and daily reflex warm-ups for **Topic 1 (General Social/Workplace)**.

### Section 0: Block 1 - Warm-up Reflex & Active Listening
- *Speaking Reflex*: **Unconventional AI Voice Roleplay 🤖** (15 mins) — Dramatic/quirky AI voice roleplay (e.g., Demanding Customer, Alien Encounter).
- *Active Listening*: **TOEIC Dictation 🎧** (20-30 mins) — Complete 3 short TOEIC listening exercises with full word-for-word dictation.

### Section 1: Block 2 - Workplace Practice: Vietnamese-to-English Conversation Translation Drill (60 Mins)
- **Vietnamese Dialogue Scenario (8–12 Turns)**: Generate a highly realistic, relatable Vietnamese dialogue between two colleagues or friends reflecting Topic 1 (e.g., small talk, venting about a busy week, coffee chat, lunch plans).
- **Task 1: Active Translation & Transcreation**: The user translates/transcreates the Vietnamese dialogue into natural, conversational English, intentionally incorporating Topic 1's target grammar rules and high-yield collocations.
- **Task 2: Native Model Comparison & Analysis**: Provide a collapsed `<details><summary>💡 Native English Model Translation & Contrastive Analysis</summary>` block displaying:
  1. The complete native English dialogue model.
  2. Side-by-side contrastive notes showing literal "Vietlish" traps vs. natural native idioms/phrases.
- **Task 3: Spoken Delivery Reinforcement**: Read the English model aloud 3–5 times to build muscle memory and rhythm without mental translation.

### Section 2: Monologue (General Topic)
- An original monologue explaining a daily life, sports, or office-social topic.
- Highlight target grammar/phrases in **bold**. Include a "Key Vocabulary & Concepts" section below it with Vietnamese translations.

### Section 3: Band 6.5-7.0 Cue Card Sample Answer
- A natural **Band 6.5-7.0 model response** answering the Day 2 Part 2 Cue Card.
- Highlight 3-5 key real-life phrases with Vietnamese translations.

### Section 4: Self-Evaluation Checklist & Situational Responses
- A checklist for target grammar, templates, and collocations.
- 2 role-specific speaking/writing scenarios relevant to Data Engineering or Casino Operations with collapsed model answers.

### Section 5: Block 3 & 4 - AI Speaking & Consolidation (75 Mins)
- **AI Speaking Practice (60 Mins)**: Practice speaking with AI using today's translated dialogue and monologue. **IMPORTANT: You MUST append the following exact block to this section:**
  > **Suggested Exercises (AI Prompts):**
  >
  > 1. **Rapid Q&A:**
  >    > "Act as my English tutor. Ask me random English questions ranging from easy to advanced (topics: daily life, work, opinions, etc.). I will answer in English as quickly as possible. After I answer, please correct my grammar and vocabulary, and suggest more natural, native-like ways to express my ideas."
  >
  > 2. **Instant Translation (Reverse Shadowing):**
  >    > "Give me a common Vietnamese situation or daily phrase. I will try to translate it into English out loud within 3–5 seconds. After my attempt, please provide the most natural English translation so I can compare."
  >
  > 3. **Role-play:**
  >    > "Let's do a role-play. Please choose one of these topics: ordering at a restaurant, a job interview, traveling/at the airport, or discussing work with a colleague. We will have a back-and-forth conversation entirely in English."
- **Review & Consolidation (15 Mins)**: Anki logging & Evaluation Checklist.

---

## 📄 Step 3C - Generate `day5-ielts-and-simulation-practice.md`

This file integrates the **Tech Conversation Translation Drill**, structured IELTS speaking practice, AI voice simulation, and intonation shadowing for **Topic 2 (Tech/Data Operations)**.

### Section 0: Block 1 - Warm-up Reflex & Active Listening
- *Speaking Reflex*: **The "Devil's Advocate" Challenge 😈** (15 mins) — Stating an opinion and immediately refuting it within 30s using contrast linkers.
- *Active Listening*: **TOEIC Dictation 🎧** (20-30 mins) — Complete 3 short TOEIC listening exercises with full word-for-word dictation.

### Section 1: Block 2 - Workplace Practice: Tech Conversation Translation Drill & IELTS Prep (60 Mins)
- **Part A: Tech Conversation Translation Drill (Topic 2 Context)**:
  - **Vietnamese Tech Dialogue Scenario (8–12 Turns)**: Generate a realistic workplace dialogue in Vietnamese set in a real data engineering or tech operation context (e.g., pipeline delay, schema migration, debugging with a backend engineer, explaining ETL latency to a manager).
  - **Task 1: Active Translation & Transcreation**: The user translates the dialogue into natural tech workplace English incorporating Topic 2's target grammar rules and high-yield tech collocations.
  - **Task 2: Native Model Comparison & Analysis**: Provide a collapsed `<details><summary>💡 Native English Tech Model Translation & Analysis</summary>` block showing the natural workplace English script and technical vocabulary contrast.
  - **Task 3: Spoken Reinforcement**: Aloud repetition of the model script.
- **Part B: IELTS Practice (Tech-Adjacent Context)**:
  - **Part 1 (Interview)**: 3 tech/workplace questions.
  - **Part 2 (Cue Card)**: 1 tech/project-focused IELTS Part 2 prompt with bullet points.
  - **Part 3 (Analytical Discussion)**: 2 analytical discussion questions.

### Section 2: ChatGPT Voice Mode Simulation Prompt
- A prompt based on Topic 2 and Data Engineering / Tech Operations.
- **Prompt Constraints (CRITICAL)**:
  - **Length**: Prompt text inside code block must be **less than 300 characters**.
  - **Hyphens**: Must contain **fewer than 10 hyphens/dashes (`-`)**.
  - **Topic**: Clear, natural tech conversation topic or workplace scenario.

### Section 3: Feedback Logging Table
- A blank table to log grammar, pronunciation, and vocabulary corrections received during AI voice sessions.

### Section 4: Interactive Shadowing & Pacing Guide
- 2 key lines from lesson dialogues broken down with visual rhythm markers:
  - Slashes `/` for natural speaking pauses/boundaries.
  - **Bold** or CAPITALIZED text for word stress and emphasis.

### Section 5: Block 3 & 4 - AI Speaking & Weekly Wrap-up (75 Mins)
- **AI Speaking Practice (60 Mins)**: Use the ChatGPT Voice Mode Simulation Prompt to conduct the tech roleplay. **IMPORTANT: You MUST append the following exact block to this section:**
  > **Suggested Exercises (AI Prompts):**
  >
  > 1. **Rapid Q&A:**
  >    > "Act as my English tutor. Ask me random English questions ranging from easy to advanced (topics: daily life, work, opinions, etc.). I will answer in English as quickly as possible. After I answer, please correct my grammar and vocabulary, and suggest more natural, native-like ways to express my ideas."
  >
  > 2. **Instant Translation (Reverse Shadowing):**
  >    > "Give me a common Vietnamese situation or daily phrase. I will try to translate it into English out loud within 3–5 seconds. After my attempt, please provide the most natural English translation so I can compare."
  >
  > 3. **Role-play:**
  >    > "Let's do a role-play. Please choose one of these topics: ordering at a restaurant, a job interview, traveling/at the airport, or discussing work with a colleague. We will have a back-and-forth conversation entirely in English."
- **Review & Consolidation (15 Mins)**: Weekly portfolio log completion, feedback logging & Anki wrap-up. Rest on the weekend!
