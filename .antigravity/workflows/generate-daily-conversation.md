---
description: Generate a B1-B2 daily English conversation and practice module split cleanly into 2 files per day (01-knowledge.md and 02-exercises.md), balanced for practical Data Engineer and office-social settings.
---

# Workflow: /generate-daily-conversation

Use when the user provides a daily situation or topic and requests a daily conversation module, or when generating daily study materials for a 5-day weekly cycle.

---

## 🎯 Core Principles & Requirements

- **2 Files Per Day Architecture (CRITICAL)**:
  Every daily lesson MUST be split into exactly **2 separate files**:
  1. `01-knowledge.md` (The Input & Comprehension Engine — ~45–60 mins)
  2. `02-exercises.md` (The Output & Reflex Engine — ~90–120 mins)
- **Data Engineer & Practical Daily Focus (CRITICAL)**: The conversation context, situations, and vocabulary must prioritize **practical daily life and office-social settings** for a tech professional / Data Engineer. Strictly **avoid academic, abstract, or formal themes** (e.g., environmental protection, scientific reports, space exploration). Scenarios should reflect real-life tech workplace and social interactions (e.g., standup updates, coffee chats, discussing weekend plans, handling work stress, explaining pipeline delays simply, asking colleagues for help).
- **Plain English & Functional Self-Explanation (CRITICAL)**: Follow [english/AGENTS.md](file:///c:/Users/adm.thangvm/repos/thangvo-miscellaneous/english/AGENTS.md). The dialogue and extracted structures must focus on **how people actually explain themselves** in daily life and work—using simple, clear words and natural, breath-friendly sentences (12–20 words). Strictly avoid show-off vocabulary, complex sentence acrobatics, and corporate clichés (*bring to the table*, *go above and beyond*, *synergy*, etc.).
- **Level**: CEFR B1–B2 / IELTS Band 6.0–6.5.
- **Spoken Response Methodologies & Frameworks (MANDATORY)**:
  1. **5W1H Framework (Who, What, Where, When, Why, How)**: Applied for general Q&A (Direct answer + 1–2 supporting details) and continuous storytelling.
  2. **O-R-E-O Framework (Opinion, Reason, Example, Opinion/Outcome)**: Applied for analytical discussion and expressing a clear stance.
  3. **S-T-A-R Framework (Situation, Task, Action, Result)**: Applied for workplace problem-solving and job/behavioral interview practice.

---

## 📁 Output Folder & File Structure

When generating as part of a weekly cycle (e.g. Week `<N>`, Day `<D>`):
```
english/week-<N>/lessons/day<D>/
├── 01-knowledge.md   # [INPUT] Setting, Dialogue, Deconstruction, Collocations, Nuance Guide
└── 02-exercises.md   # [OUTPUT] Warm-up, Shadowing, Slot-filling, Transcreation, Spoken Frameworks, AI Voice
```

When generating as a standalone daily conversation:
```
english/daily-conversations/<YYYY-MM-DD-topic-slug>/
├── 01-knowledge.md
└── 02-exercises.md
```

---

## 📄 File 1: `01-knowledge.md` (Input & Comprehension Engine)

This file contains 100% pure input, context, dialogue, grammatical deconstruction, vocabulary, and linguistic nuances. It serves as the learner's reference handbook for the day.

### YAML Frontmatter
```yaml
---
title: "Day <D> - Knowledge & Daily Conversation: <Topic Title>"
week: <N> # (if applicable)
day: <D>
type: "knowledge"
target_level: "B1-B2 CEFR / IELTS Band 6.5"
estimated_time: "45-60 Mins"
---
```

### Required Sections:

#### 1. Context & Scenario Setup
- Set the scene: Who are the speakers? What is the relationship between them? What is the setting (e.g. coffee station, Slack sync, team lunch, desk-side chat)?
- What is the objective or central tension (e.g., planning a weekend trip, asking for code review without sounding pushy, explaining a job delay)?

#### 2. Realistic Dialogue Transcript
- A natural, realistic conversation (10–14 turns) between 2 characters.
- Must feel conversational, breath-friendly, and authentic to a tech professional's daily life.
- Highlight target sentence structures and key collocations in **bold**.

#### 3. Sentence Structure & Formula Deconstruction (3–4 Patterns)
For each target pattern:
- **Quote**: The exact sentence from the dialogue.
- **Slot-Filling Pattern**: Formula using brackets (e.g., `The main issue was that + [Subject] + [Verb]...`).
- **Functional Meaning**: What communicative job does this sentence perform?
- **Everyday Example**: 1 sentence in a general daily context.
- **Tech / Workplace Example**: 1 sentence in a data engineering or office context.

#### 4. High-Yield Collocations & Phrasing (4–6 Items)
A clear markdown table:
| Phrase / Collocation | POS | Vietnamese Meaning | Natural Usage Note & Plain English Contrast |
| :--- | :--- | :--- | :--- |
| *e.g., settle into the role* | Phrase | bắt nhịp với công việc | Natural alternative to stiff "adapt to job responsibilities" |

#### 5. Communicative Nuance & Delivery Guide
- **How to use it**: Pronunciation notes, natural rhythm, pausing, and connected speech tips.
- **Why you should use it**: Cultural and pragmatic nuances (e.g., softening requests, expressing uncertainty without sounding incompetent, sounding cooperative).

---

## ✍️ File 2: `02-exercises.md` (Output & Reflex Engine)

This file contains 100% active production, muscle-memory drills, translation challenges, framework-driven speaking exercises, and AI roleplay simulations.

### YAML Frontmatter
```yaml
---
title: "Day <D> - Exercises & Reflex Engine: <Topic Title>"
week: <N> # (if applicable)
day: <D>
type: "exercises"
target_level: "B1-B2 CEFR / IELTS Band 6.5"
estimated_time: "90-120 Mins"
---
```

### Required Sections:

#### Block 1: Warm-up Reflex & Shadowing (20–25 Mins)
- **Part A: Speaking Reflex Warm-up (10–15 mins)**:
  - Quick, unscripted reflex exercise (e.g., *The Daily Commentator* or *60s Object/Idea Pitch*) requiring the learner to use at least 2 of today's target collocations.
- **Part B: Interactive Shadowing & Pacing (10 mins)**:
  - Take 2 key dialogue lines and break them down with rhythm markers:
    - Slashes `/` for breath pauses.
    - **Bold** or CAPITALIZED syllables for stress and intonation peaks.

#### Block 2: Structural Slot-Filling & Pitfall Drills (25–30 Mins)
- **Drill 1: Slot-Filling Customization**:
  - 1 prompt per sentence pattern with blank rewrite slots (`→ **Your Sentence**: ____________________`) customized to the user's real project/work experience.
- **Drill 2: Spot the Pitfall (Error Correction)**:
  - 2–3 sentences containing common Vietnamese learner pitfalls (literal Vietlish translation, wrong prepositions, or over-complicated words).
- **Collapsible Answer Key**:
  `<details><summary>💡 Click to View Sample Completions & Pitfall Analysis</summary>` with clear model sentences and explanations.

#### Block 3: Vietnamese-to-English Transcreation Drill (25–30 Mins)
- **The Challenge**: 3–4 realistic Vietnamese workplace/daily dialogue lines to translate into natural English using today's grammar and collocations.
- **Collapsible Model Translations**:
  `<details><summary>💡 Click to View Native Model Translations & Phrasing Comparison</summary>`
  - Provide natural B1–B2 native translations.
  - Highlight the contrast between literal translation vs. idiomatic Plain English.

#### Block 4: Spoken Response Frameworks (25–30 Mins)
Provide targeted speaking practice prompts based on the dialogue, explicitly mapped to the required frameworks:
1. **General / Follow-up Q&A Drill (5W1H Framework)**:
   - Provide a direct answer + 1–2 supporting details (Why + When/How). Include a model response demonstrating this structure.
2. **Analytical / Discussion Drill (O-R-E-O Framework)**:
   - Scaffolded into **O**pinion, **R**eason, **E**xample, and **O**pinion/Outcome. Include a structured model response.
3. **Workplace / Behavioral Drill (S-T-A-R Framework - if applicable)**:
   - For incident, troubleshooting, or interview scenarios: **S**ituation, **T**ask, **A**ction, **R**esult.

#### Block 5: AI Voice Simulation & Wrap-up (20–30 Mins)
- **ChatGPT Voice Mode Prompt**:
  - Enforce prompt constraints: **under 300 characters**, **fewer than 10 hyphens/dashes**.
  - Must define a concrete roleplay partner (e.g., coworker, team lead, friend).
- **Suggested AI Voice Drills**:
  1. *Rapid Q&A* (fast answers + feedback on naturalness).
  2. *Instant Translation / Reverse Shadowing* (Vietnamese prompt ➔ speak English in 3s).
  3. *Free-flowing Roleplay* (back-and-forth dialogue).
- **Daily Review Checklist & Error Logging**:
  - Blank feedback logging table (Error, Correction, Root Cause).
  - Anki flashcard logging reminder.
