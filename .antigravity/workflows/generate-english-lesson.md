---
description: The core topic-agnostic project backbone of the English learning system. Generates comprehensive weekly study modules focusing on grammar, sentence structures, vocabulary with Vietnamese meanings, and IELTS Speaking practice, targeting a natural, conversational Band 6.5 level using real-life vocabulary.
---

# Workflow: /generate-english-lesson (Unified GSC & IELTS Speaking Plan - Band 6.5 Focus)

> [!IMPORTANT]
> **⚓ CORE PROJECT BACKBONE (Topic-Agnostic Engine)**
> - This workflow rule is the permanent, structural engine of this repository.
> - **Band 6.5 & Real-Life Target**: All generated materials must prioritize natural, widely-used, and conversational English (CEFR B1-B2) suitable for a strong IELTS 6.5 Speaking score.
> - **Avoid Academic Bloat**: Avoid overly formal, academic, or obscure C1-C2 terms. Focus strictly on **practical, real-life vocabulary** that native speakers actually use in daily work and social contexts.

---

## 📁 Output Folder Structure
```
english/week-<N>/lessons/
├── lesson-overview.md
├── day1-grammar-and-structures.md
└── day2-day3-ielts-and-simulation-practice.md
```

---

## 🛠️ Step 0 - Gather Dynamic Topic Info (Before File Creation)

Identify or extract the following core elements based on the **dynamically supplied weekly topic**:
1. **Metadata**: Title, Source, Target Week, and Target Level (IELTS 6.5 / B1-B2).
2. **3 Target Grammar Rules**: Key grammatical concepts highly relevant to B1-B2 speaking (e.g., *Using modals for advice, Simple conditionals with "if", Present Perfect for past-to-present experience, Contrast linkers*).
3. **5 Sentence Structure Templates**: Natural, conversational sentence patterns used in real-life speaking that can be generalized into slot-filling formulas.
4. **5 High-Yield Collocations/Idioms**: Highly common, natural expressions used by native speakers in day-to-day conversation, defined with Vietnamese translations and real-life examples.
5. **IELTS Speaking Questions**: Topic-related questions for Part 1 (3 questions), Part 2 (1 Cue Card), and Part 3 (2 questions).

---

## 📄 Step 1 - Generate `lesson-overview.md`

This file introduces the week's theme, conversational vocabulary, study schedule, and reference conversation transcript.

### 1. Metadata Table
- Title, Source, Target Level (IELTS 6.5), Target Week.

### 2. High-Yield Collocations & Vocabulary Table
Columns: `Collocation/Phrase` | `POS` | `Vietnamese Meaning` | `Natural IELTS-Style Example`
- List **5 common, natural, real-life phrases** with accurate Vietnamese translations and standard spoken examples.

### 3. Study Schedule & Objectives Table
Include the 3-Day combined schedule table:
| Day | Phase | Activity & Focus | Primary Deliverable |
|---|---|---|---|
| **Day 1** | Study & Input | Grammar, Formulas & Vocab Study | Complete all drills in `day1-grammar-and-structures.md`. |
| **Day 2** | Speaking & Output | IELTS Questions & AI Voice Simulation | Answer Part 1, 2, 3 questions & run the ChatGPT Voice Mode role-play. |
| **Day 3** | Refinement & Writing | Creative Production & Band 6.5 Analysis | Write a custom dialogue and study/analyze the Band 6.5 Cue Card sample answer in `day2-day3-ielts-and-simulation-practice.md`. |

### 4. Core Lesson Dialogue
- Generate a natural, highly realistic conversation transcript between 2 characters (e.g., coworkers or friends) centered on the week's custom theme.
- **Important**: Naturally integrate the 3 grammar rules, 5 sentence structure templates, and 5 target conversational vocabulary phrases.
- Highlight the target grammar/sentence patterns in **bold** in the transcript.
- Ensure the tone is casual and professional, mimicking standard office or daily conversation.

---

## 📄 Step 2 - Generate `day1-grammar-and-structures.md`

This file houses the structural foundation, grammar deconstruction, and initial production drills.

### 1. Grammar Focus (3 Target Rules)
For each of the **3 target grammar rules**:
- **Grammar Point Name** (e.g., *Talking about experience using Present Perfect*)
- **Quote**: The exact sentence from the dialogue showing this rule.
- **Rule Explanation**: A simple, clear, and direct explanation of the rule's usage and form.
- **Common Pitfall Box**: A warning box showing a frequent mistake and how to correct it (e.g., *Incorrect vs. Correct*).

### 2. Sentence Structure Templates (5 Patterns)
For each of the **5 sentence structures**:
- **Communicative Function**: (e.g., *To give a recommendation*, *To compare two choices*).
- **Slot-Filling Formula**: Expressed using brackets for modular components (e.g., `It's really important that + [Subject] + [Verb] + before + [Noun]`).
- **Examples**: Provide 3 distinct example sentences utilizing the formula:
  1. *Everyday Context*
  2. *Data Engineering / Casino Context* (customized to the user's background)
  3. *General Workplace Context*

### 3. Production & Translation Drills
- **"Your Turn" Exercises**: A prompt for each of the 5 templates with a blank space (`- `) for the user to construct their own sentences.
- **Translation / Transformation Challenge**: 3 custom sentences to translate (from Vietnamese to English) or restructure using the target grammar.

---

## 📄 Step 3 - Generate `day2-day3-ielts-and-simulation-practice.md`

This file facilitates active output, structured IELTS test practice, AI voice simulation, and natural model answer analysis.

### 1. Day 2: IELTS Practice & AI Simulation
- **IELTS Speaking Practice Questions**:
  - **Part 1 (Interview)**: 3 introductory questions related to the week's theme.
  - **Part 2 (Cue Card)**: 1 complete IELTS Part 2 prompt with bullet points.
  - **Part 3 (Analytical Discussion)**: 2 discussion questions.
- **Copy-Paste AI Voice Simulation Prompt**: A prompt based on the theme and the user's professional background (Data Engineering / Casino).
  - *Prompt requirements*: Force ChatGPT Voice Mode to adopt a specific persona (e.g., a coworker or a project manager).
  - Instruct the AI to speak in a natural, casual, and friendly manner, encouraging the user to use the target grammar, templates, and vocabulary.
  - Instruct the AI to provide brief, helpful feedback on making sentences sound more natural.
- **Feedback Logging Table**: A blank table for the user to log grammar and pronunciation corrections received.

### 2. Day 3: Creative Writing & Band 6.5 Refinement
- **Creative Dialogue Writing**:
  - Instruct the user to write a new conversation transcript (10+ turns) incorporating the target structures.
- **Band 6.5 Cue Card Sample Answer**:
  - Provide a highly natural, realistic **Band 6.5-7.0 model response** answering the Day 2 Part 2 Cue Card. 
  - **Conversational Words Highlighted**: Highlight and list 3-5 key real-life, natural phrases used in the sample answer with their definitions and Vietnamese translations.
- **Self-Evaluation Checklist**: A checklist for the user to tick off each target grammar rule, sentence template, and collocation successfully produced.
