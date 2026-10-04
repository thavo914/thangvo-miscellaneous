---
description: Capture, organize, and store user-supplied vocabulary, grammar rules, collocations, or technical language notes into a dedicated folder and file for the upcoming week's English lesson curriculum.
---

# Workflow: /add-next-week-material

Use this workflow whenever the user shares a new vocabulary item, grammar structure, phrase, collocation, or technical English note that they want prioritized in the **next week's lessons**.

---

## 🎯 Purpose & Scope

This workflow ensures that any spontaneous language insight, grammar discovery, or vocabulary request from the user is:
1. **Targeted to the upcoming week**: Automatically mapped to `english/week-<N>/notes/` (where `<N>` is the upcoming week number).
2. **Systematically structured**: Broken down into core definitions, Vietnamese explanations, authentic technical/workplace contexts, common pitfalls, and ready-to-use drill templates.
3. **Seamlessly linked to the lesson generation engine**: Preserved so that when `/generate-english-lesson` runs for that week, these notes are automatically consumed as **Priority 1 curriculum content**.

---

## 🧭 Core Principles & Constraints

All processed notes must strictly adhere to the repository guidelines in [english/AGENTS.md](file:///c:/Users/adm.thangvm/repos/thangvo-miscellaneous/english/AGENTS.md):
- **Plain English & Functional Self-Explanation**: Focus on how this language is actually used by engineers and professionals to explain situations, problems, actions, and results.
- **Strictly Avoid**: Show-off vocabulary, academic bloat, and empty corporate buzzwords (*synergy*, *bring to the table*, etc.).
- **Grounding Contexts**: Root examples in the user's authentic life:
  1. *Data Engineering & Systems*: Pipelines, schemas, SQL, Spark jobs, cloud infrastructure, monitoring, disaster recovery, software licensing, internal data security.
  2. *Daily Workplace & Social*: Setting boundaries, handling ad-hoc requests, standup updates, cross-team alignment, logging off on time.
  3. *Personal Interests*: Running/marathon training, Liverpool FC / Premier League football.

---

## 🛠️ Execution Steps

### Step 1: Detect Target Upcoming Week & Folder Resolution
1. Check `english/` directory to identify existing `week-<N>` folders.
2. Determine the **highest current week number** (e.g., `week-18`).
3. Set the **target week number** to `week-<N+2>` (e.g., `week-20`), unless the user explicitly specifies a different week (e.g., *"add this to week 21"*).
4. Resolve the target notes directory:
   ```
   english/week-<target>/notes/
   ```
5. If the directory does not exist, create it automatically.

---

### Step 2: Content Parsing & Linguistic Structuring
Analyze the user's input and organize it into the following standardized sections:

1. **Header & Metadata**:
   - Target item (e.g., `for [Noun/Adjective] use`, `point of failure`, `push back on`).
   - Category: Grammar Structure, Technical Collocation, Idiomatic Boundary Expression, or Vocabulary Pattern.
   - Core Meaning in Plain English + Vietnamese translation.

2. **Categorized Practical Usages**:
   - Group the expressions by authentic domains (e.g., *Licensing & Compliance*, *Internal Security & Access*, *Hardware & Technical Load*, *Daily Workplace*).
   - Provide concrete, natural example sentences for each group.

3. **Core Rules & Pitfalls to Avoid (Common Mistakes)**:
   - Explicitly highlight what **NOT** to do (e.g., incorrect collocations, literal Vietnamese translation traps, invalid verb forms).
   - Present a clear comparison table: ❌ *Incorrect / Awkward* vs. ✅ *Natural Native English*.

4. **Curriculum Integration Blueprint (Ready for `/generate-english-lesson`)**:
   - **For Day 1/Day 4 Grammar Rules (`02-grammar-rules.md`)**:
     - Rule summary + formula.
     - 2 inline practice drills with model answers.
   - **For Sentence Templates (`03-sentence-templates.md`)**:
     - 1–2 slot-filling formulas with engineering examples.
   - **For Translation & Error Correction (`04-production-and-translation.md`)**:
     - 1 Vietnamese-to-English translation prompt testing this pattern.
   - **For AI Speaking Voice Practice (`05-ai-speaking-and-review.md`)**:
     - 1 ChatGPT Voice Mode rapid question or roleplay scenario.

---

### Step 3: Write to Dedicated Note File
Generate a clean, descriptive kebab-case filename based on the topic:
```
english/week-<target>/notes/<topic-slug>.md
```
*Examples*:
- `english/week-19/notes/target-grammar-for-use.md`
- `english/week-19/notes/collocation-iron-out-discrepancies.md`

Write the structured markdown file using the standard template defined below.

---

### Step 4: Maintain Master Notes Index
Check if `english/week-<target>/notes/README.md` exists:
- If it does not exist, create it with an index table of upcoming notes for that week.
- If it exists, append the new note file link and a 1-line summary to the table.

This allows `/generate-english-lesson` to inspect a single index file to discover all custom requests for that week.

---

### Step 5: Deliver Response to User
Present a concise summary to the user:
- Clickable link to the newly created file: `[<filename>](file:///...)`
- Short summary of the target rule/words captured.
- Confirmation that it is staged for automatic pickup during that week's lesson generation.

---

## 📋 Standard Note File Template (`<topic-slug>.md`)

```markdown
# 📘 Week <N> Curriculum Note: <Topic Title>

> **Target Week**: Week <N>  
> **Type**: [Grammar Rule | Collocation Group | Vocabulary Focus | Workplace Formula]  
> **Core Concept**: [1-sentence explanation in English] *(Vietnamese: [Bản dịch tiếng Việt])*

---

## 🌟 1. Core Explanation & Mechanics

[Detailed breakdown of the rule or word, why it matters, and how it functions grammatically.]

* **Formula**: `[Formula pattern here]`
* **Key Principle**: [Underlying native intuition or usage condition]

---

## 📚 2. Categorized Usages & Real-Life Examples

### Domain A: [e.g. Data Engineering & Cloud Infrastructure]
* **[Expression 1]**: [Meaning]
  * *Example*: *"[Natural B1-B2 sentence]"*
* **[Expression 2]**: [Meaning]
  * *Example*: *"[Natural B1-B2 sentence]"*

### Domain B: [e.g. Daily Workplace & Communication]
* **[Expression 1]**: [Meaning]
  * *Example*: *"[Natural B1-B2 sentence]"*

---

## ⚠️ 3. Common Pitfalls & Vietlish Traps

| ❌ Common Mistake / Awkward Phrasing | ✅ Natural Native English | Why / Linguistic Reason |
| :--- | :--- | :--- |
| *[Wrong example]* | *[Correct example]* | [Short explanation] |

---

## 🎯 4. Lesson Integration Blueprint (For `/generate-english-lesson`)

### A. Grammar / Template Slot Formula:
* `[Slot-Filling Formula]`
* *Engineering Example*: `...`

### B. Practice Drill:
* **Drill Prompt**: `...`
* **Suggested Answer**: `...`

### C. AI Speaking Simulation Prompt:
* *"In ChatGPT Voice Mode, ask me to explain [scenario] using [target expression]."*
```
