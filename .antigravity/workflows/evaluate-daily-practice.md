---
description: Evaluate, grade, and provide actionable feedback on user-completed English exercises, grammar rewrites, sentence templates, translations, error corrections, and speaking logs according to Plain English and CEFR B1-B2 standards.
---

# Workflow: /evaluate-daily-practice

Use this workflow whenever the user asks for grading, feedback, or review on their answers in any lesson file under `english/week-<N>/lessons/` (such as `02-grammar-rules.md`, `03-sentence-templates.md`, `04-production-and-translation.md`, or speaking/translation logs).

---

## 🎯 Purpose & Scope

This workflow establishes a standardized, high-quality evaluation system that:
1. **Validates Grammatical Correctness**: Verifies verb tenses, passive forms, modal verbs, collocations, and prepositions against target lesson rules.
2. **Assesses Workplace Naturalness & Flow**: Evaluates whether the phrasing sounds like authentic, professional spoken English (CEFR B1-B2 / IELTS 6.5) rather than stiff textbook or literal Vietnamese translation (Vietlish).
3. **Enforces Plain English Principles**: Keeps feedback grounded in [english/AGENTS.md](file:///c:/Users/adm.thangvm/repos/thangvo-miscellaneous/english/AGENTS.md)—clarity, simplicity, and functional self-explanation with zero academic bloat or corporate buzzwords.
4. **Delivers Constructive, High-EQ Coaching**: Celebrates good usage first, pinpoints exact mistakes clearly with simple explanations, and provides clean, breath-friendly native alternatives.

---

## 🧭 Evaluation Rubric (The 3 Pillars)

Every user submission must be graded across three criteria:

| Pillar | Focus | What to Check |
| :--- | :--- | :--- |
| **1. Grammatical Precision** | Target Rules & Mechanics | • Correct tense form (e.g., Present Perfect Passive: `have been treated`).<br>• Modal verb syntax (e.g., `must V` not `must to V`, `could` for softening).<br>• Subject-verb agreement with collective nouns (`the team has`, `we have`).<br>• Idiom agreement (e.g., `pull his weight` not `pull someone weight`). |
| **2. Natural Workplace Flow** | Pragmatics & Context | • Does it sound natural in a tech/data workplace setting (standups, 1-on-1s, hiring syncs)?<br>• Is the tone appropriately calibrated (polite softening vs. direct statement)?<br>• Are compound adjectives correctly formed (e.g., `detail-oriented`, `end-to-end`)? |
| **3. Plain English & Conciseness** | Clarity & Brevity | • Breath-friendly length (12–20 words).<br>• Avoids redundancy (e.g., "automate manually" conflicts).<br>• Zero empty corporate clichés or academic bloat. |

---

## 🛠️ Step-by-Step Execution Guide

### Step 1: Identify Context & Exercise Type
Inspect the file and drill type the user is submitting:
- **Grammar Transformation Drill** (e.g., Drill 1.1 / Drill 2.1): Did the user successfully transform the sentence using the required rule?
- **Fill-in-the-Blank** (e.g., Drill 1.2 / Drill 2.2): Did the user conjugate the verb correctly and clean up any prompt brackets?
- **Personal Production / "Your Turn"** (e.g., Drill 1.3 / Drill 2.3): Did the user personalize the sentence with realistic tech or workplace context?
- **Sentence Template Slot-Filling** (`03-sentence-templates.md`): Are the filled slots grammatically coherent with the template frame?
- **Vietnamese-to-English Translation** (`04-production-and-translation.md`): Did the user transcreate the natural meaning using target collocations, avoiding word-by-word literal translation?
- **Error Detection & Correction**: Did the user identify all intentional traps?

---

### Step 2: Formulate Detailed Feedback Breakdown

For each exercise item, provide:
1. **Verdict & Score**: Clear status (`✅ 10/10 Perfect`, `👍 9/10 Great with Minor Tweak`, or `⚠️ Needs Correction`).
2. **Specific Highlight**: Point out what the user did well (e.g., good choice of idiom, natural softening, correct passive voice).
3. **Linguistic Explanation (Why)**: Explain the reason behind any error simply without heavy academic jargon.
4. **Clean Polish / Alternative**: Offer 1 polished version for markdown notes, and optionally 1 alternative for different contexts (e.g., 1-on-1 with manager vs. talking to a mentor).

---

### Step 3: Markdown Cleanup Check
Remind or assist the user with clean markdown formatting:
- Remove leftover prompt placeholders (e.g., `(bring on board)`, `(something came up)`).
- Ensure continuous sentences render cleanly without fragmented backticks (e.g., `` `I was wondering if ` you had a minute ` `` $\rightarrow$ `` `I was wondering if you had a minute` `` or clean text).
- Check punctuation (e.g., indirect questions with `I was wondering if...` end in a period `.`, not `?`).

---

## 📋 Standard Feedback Response Template

When responding to the user, format your evaluation using the following structure:

```markdown
### 🏆 Overall Assessment: [Score / Grade, e.g. 9.5 / 10 - Excellent!]
[1-2 sentences summarizing the user's performance, highlighting strengths in grammar or tone.]

---

### 🎯 Item-by-Item Breakdown

#### [Exercise Name / Drill Number]
* **Sentence 1**: `[User's Answer]`
  * **Verdict**: [Perfect / Great / Needs Polish]
  * **Feedback**: [Specific praise or correction]
  * 👉 **Polished Version**: *"[Clean, natural sentence]"*

* **Sentence 2**: `[User's Answer]`
  * **Verdict**: ...
  * **Feedback**: ...

---

### 💡 High-Yield Takeaways & Polish Points
1. **[Key Rule / Collocation]**: [Quick recap of why it works]
2. **[Common Trap Avoided or Corrected]**: [Explanation of the fix]

---

### 🚀 Recommended Next Step
- [ ] Log tricky collocations into your Anki deck.
- [ ] Read the polished sentences aloud 2–3 times to build vocal muscle memory.
- [ ] Proceed to [Next Exercise / Day].
```
