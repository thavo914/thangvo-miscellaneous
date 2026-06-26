---
description: Generate a structured vocabulary definition entry for a target word or phrase, using real-life sample sentences grounded in the user's identity as a data engineer, avid runner, and Liverpool FC supporter.
---

# Workflow: /generate-vocabulary-definition

Use when the user provides a target word or phrase (noun, verb, adjective, adverb, or noun phrase) and requests a vocabulary definition entry.

> [!IMPORTANT]
> **Anti-Duplication Guard & Database Verification (CRITICAL)**
> - **Rolling 3-Week Rule**: Check `english/lesson-registry.md` to ensure the vocabulary theme or phrase hasn't been used in the past 3 weeks.
> - **Database Check**: Query the `english/vocabulary/review-app/vocabulary.db` SQLite database to ensure the word does not already exist, maintaining a clean and deduplicated list.
> - **Build & Sync**: After saving the definition in a markdown batch file, run `parse_vocab.py` in the `review-app` directory to sync the database and rebuild the frontend artifact (`vocab_data.js`). The parser will strictly validate that there are exactly 5 sentences per word.

> [!IMPORTANT]
> **Context-Grounded Samples (CRITICAL)**
> All sample sentences **MUST** be rooted in at least one of the following three life contexts of the user. Rotate and vary the contexts across the 5 sample sentences — do **not** cluster them all in one area:
> 1. **Data Engineer**: ETL pipelines, SQL queries, cloud infrastructure, dashboards, data quality, stakeholder reporting, debugging, pipeline orchestration, Spark jobs, dbt models, data warehouses.
> 2. **Avid Runner**: Marathon training, weekly mileage, long runs, pace targets, race-day performance, running gear, injury recovery, Strava, parkrun, hill repeats, tempo runs.
> 3. **Liverpudlian / Liverpool FC Fan**: Match days at Anfield, Premier League standings, Champions League nights, transfer windows, Klopp-era memories, specific players (Salah, Van Dijk, Trent), derby matches, post-match feelings, football banter with colleagues.
>
> **Language Level**: B1-B2 (natural, conversational, IELTS 6.5-friendly). Avoid overly academic or stiff phrasings.

---

## Output Structure

> [!IMPORTANT]
> **Python Parser Compatibility Requirements (CRITICAL)**
> To ensure the generated output can be successfully parsed by the vocabulary review app parser (`parse_vocab.py`), the output must follow these rules strictly:
> 1. **Numbered Header**: The target word/phrase header must be bold and prefixed with a number and a period. E.g., `**1. target word/phrase**` (or matching the correct index in the batch).
> 2. **Definition Block Format**: The definition line must match this exact format:
>    `*([part of speech])*: [English definition] *(Vietnamese: [Vietnamese translation])*`
>    Note the exact syntax: `*(part of speech)*` followed by `: ` followed by the definition, and ending with ` *(Vietnamese: [translation])*`.
> 3. **Sample Sentences Header**: The section header must be exactly `**Sample Sentences:**` followed by a numbered list (e.g. `1. `, `2. `).
> 4. **Synonyms Header**: The section header must be exactly `**Synonyms / Alternatives:**` followed by a bulleted list starting with `- **[Synonym]** — [Nuance]`.
> 5. **Antonyms Header**: The section header must be exactly `**Antonyms / Contrasts:**` followed by a bulleted list starting with `- **[Antonym]** — [Contrast]`.
> 6. **"Your Turn" Prompts Header**: The section header must be exactly `**"Your Turn" Prompts:**` followed by blockquotes starting with `> `.

### 1. Definition Block

Format as follows:

```
**1. [target word/phrase]**
*(part of speech)*: [a clear, natural definition in one to two sentences explaining the core meaning and typical usage context] *(Vietnamese: [Vietnamese translation])*
```

- Write the definition in plain, accessible English (B1-B2 level).
- If the word has a strong connotation (positive/negative/neutral), state it briefly.
- Include the **Vietnamese translation** of the target word/phrase formatted exactly as `*(Vietnamese: [translation])*` after the English definition.

---

### 2. Sample Sentences (Exactly 5 sentences)

Provide **exactly 5 sample sentences** (the database strictly validates this count) that:
- Demonstrate the word/phrase used **naturally in context**.
- Cover **all three life domains** (data engineer, running, Liverpool FC) — use each domain at least once, mixing freely across the 5 sentences.
- Are **varied in grammatical structure** (avoid repeating the same sentence pattern).
- Feel **authentic and personal**, as if written from the user's own perspective.
- Are at **B1-B2 CEFR level** — natural spoken or written register.

---

### 3. Synonyms / Alternatives

List **4–6 synonyms or near-equivalent phrases** that can substitute for the target word/phrase in similar contexts. For each:
- Provide the synonym.
- Add a brief note (one phrase or clause) on any nuance or register difference from the target word.

Format as a bullet list:
- **[Synonym]** — [nuance note]

---

### 4. Antonyms / Contrasts

List **3–5 antonyms or contrasting expressions**. For each:
- Provide the antonym.
- Add a brief note explaining the contrast.

Format as a bullet list:
- **[Antonym]** — [contrast note]

---

### 5. "Your Turn" Practice Prompt

Provide **2 short fill-in-the-blank or sentence-completion prompts** for the user to practice using the target word/phrase in their own words. Ground both prompts in the user's life contexts.

Example format:
> After ______________________, my pipeline was processing data at an astonishing rate.

> It wasn't until ______________________ that I realized Liverpool were winning the league at a truly astonishing rate.

---

## Example Output

> **Target word**: *at an astonishing rate*

---

**1. at an astonishing rate**
*(noun phrase)*: an unexpectedly high or impressive speed, level, or degree at which something happens or develops, often surprising or remarkable in nature. *(Vietnamese: với tốc độ đáng kinh ngạc)*

**Sample Sentences:**

1. After we migrated to the new cloud warehouse, our batch jobs were completing at an astonishing rate — what used to take six hours was done in under forty minutes.
2. During my long run last Sunday, I noticed my heart rate was dropping at an astonishing rate after each hill, which told me my aerobic fitness was genuinely improving.
3. Under Klopp, Liverpool were accumulating points at an astonishing rate in the 2019–20 season — no one could keep up with them.
4. The number of data quality alerts we were getting from the dbt tests was growing at an astonishing rate, so I knew the upstream source had a serious problem.
5. My training volume has been increasing at an astonishing rate this block — I've gone from 40 km to 70 km a week in just six weeks, and my legs are definitely feeling it.

**Synonyms / Alternatives:**
- **At a remarkable speed** — interchangeable in most contexts; slightly more formal.
- **At a rapid pace** — more neutral and common in everyday speech.
- **At an unprecedented rate** — stronger emphasis on novelty; implies nothing like this has happened before.
- **At a staggering rate** — similar meaning but slightly more dramatic/informal in tone.
- **At breakneck speed** — idiomatic; implies dangerously or impressively fast, more casual.

**Antonyms / Contrasts:**
- **At a snail's pace** — implies frustratingly slow progress; very informal.
- **Gradually** — slow and steady, no sense of surprise or impressiveness.
- **At a modest rate** — suggests unremarkable, ordinary speed or growth.
- **At a stable rate** — no acceleration; things are consistent, not accelerating.

**"Your Turn" Prompts:**
> After we switched to the new orchestration tool, our data pipeline deployments were happening at an astonishing rate — I went from __________________ to __________________ in less than a month.

> I knew my marathon training was working when I saw my weekly pace improving at an astonishing rate; by the time race day came, I __________________.
