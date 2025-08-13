# DE-English

## Evergreen Daily English Practice (B1 → C1 Speaking)

Build a durable, topic-based routine you can follow indefinitely. Pick one topic per day, speak a lot, capture errors, and recycle your best language.

### Quick start

- **Choose a topic** from the Topic Bank below (work or everyday)
- **Set a timer** for your available time: 30 / 60 / 90 minutes
- **Follow the Daily Menu** (steps below)
- **Record** your 2–3 minute talk (phone is fine)
- **Log** 1 new chunk used, 1 error to fix, 1 goal for tomorrow

---

## Daily Menu

Default: 60 minutes. Also includes 30-min Lite and 90-min Power.

### 60-Min Standard (recommended)

1) **Warm-up (8 min)**
   - 4–3–2 drill on yesterday’s topic (4 min → 3 min → 2 min).
   - 1 minute: summarize what changed or improved.

2) **Input (10 min)**
   - Short video/article on today’s topic. First pass with transcript/captions.

3) **Shadowing (10 min)**
   - Select 8–12 key sentences. Read slowly → normal → fast; focus on linking and stress.

4) **Chunks/SRS (8 min)**
   - Capture 8–12 chunks (not single words). Add to Anki/Quizlet with 2 original examples.

5) **Speaking Task (18 min)**
   - Speak for 2–3 minutes using a framework (see Speaking Menu). Repeat once improving flow.
   - Optional role-play with an AI or partner (5–7 minutes of Q&A).

6) **Micro-Pronunciation (3 min)**
   - One sound or stress pattern; 10–20 reps using your shadowing sentences.

7) **Log (3 min)**
   - Write: one new chunk used, one error to fix, one goal for tomorrow.

### 30-Min Lite

- 5 min Warm-up
- 8 min Input (identify 4–6 sentences)
- 12 min Speaking Task (one take + quick repeat)
- 5 min Log

### 90-Min Power

- 10 min Warm-up
- 15 min Input
- 15 min Shadowing
- 10 min Chunks/SRS
- 25 min Speaking (includes role-play)
- 10 min Pronunciation
- 5 min Log

---

## Topic Bank (rotate freely)

### Work / Data Engineering

- Explaining your end-to-end pipeline
- Batch vs. streaming trade-offs
- Lakehouse vs. warehouse: when and why
- Orchestration (Airflow/Dagster) design choices
- CDC and schema evolution
- Spark performance playbook
- Data quality, SLAs, and observability
- Cost vs. performance: optimization stories
- Metrics layer and semantic models
- Data contracts and breaking changes
- Incident postmortem (root cause, fix, prevention)
- Stakeholder communication and prioritization
- Lineage and documentation practices
- MLOps handoff to downstream consumers
- Governance, compliance, and access policies
- On-call handover and incident hygiene
- Cloud cost control: storage, compute, egress
- Migration or replatforming story
- Interviewing and evaluating data engineers

### Everyday / Personal

- Travel story or cultural difference
- Health, routines, and habits
- Books/podcasts and key takeaways
- A decision you reversed and why
- A failure you learned from
- A tough conversation handled well

Tip: Alternate work and everyday topics to broaden vocabulary and keep it fresh.

---

## Speaking Menu (pick one per day)

- **Explain (PREP)**: Point → Reason → Example → Point.
- **Problem–Solution–Impact**: What’s broken → Your fix → Measurable outcome.
- **Compare–Contrast–Recommend**: Option A vs. B → Criteria → Recommendation.
- **Story (STAR)**: Situation → Task → Action → Result (+ reflection).
- **Trade-off discussion**: “We optimized for X at the expense of Y because …”
- **Persuasion**: Stakeholder objections → your responses → decision.

Useful starter chunks:

- “From a reliability standpoint, …”
- “As far as data quality is concerned, …”
- “The crux is …” / “What this boils down to is …”
- “Much as X helps, it introduces …”
- “We optimized for … at the expense of …”
- “Given the constraints, the pragmatic choice was …”

---

## Shadowing: how to do it well

- Choose clear, high-quality audio with transcripts.
- Mark thought groups and stress the new information.
- Do 3 passes: slow (over-articulate), normal (linking), faster (natural reductions).
- Record the last pass and compare with the original for rhythm and stress.

Recommended sources: [TED Talks](https://www.ted.com/talks), [NPR](https://www.npr.org), YouTube channels on data engineering (e.g., “Seattle Data Guy”, “Alex The Analyst”).

---

## Chunks and SRS

- Prefer multi-word chunks and sentence frames over single words.
- Add only items you actually want to say at work/life.
- For each card: chunk, 2 original example sentences, optional native-language gloss.

Anki model (suggestion):

- Front: the chunk (e.g., “From a reliability standpoint, …”)
- Back: two originals + short gloss
- Tag by topic (e.g., `streaming`, `cost`, `storytelling`)

---

## Micro-Pronunciation Drills (rotate)

- Linking: “want to” → “wanna”, consonant-vowel connections
- Stress: put emphasis on new information in a sentence
- Reductions: gonna, gotta, kinda; function words de-stressed
- Endings: past tense “-ed”, plural “-s”, third-person “-s”
- Problem sounds: pick one (e.g., /θ/ vs. /s/, /v/ vs. /w/) and drill 10–20 reps

---

## Error-Correction Loop

- Keep a single doc: Mispronunciations, fossilized grammar errors, overused fillers, go-to chunks.
- After each session, add one line to each relevant section.
- Every 5–7 days, promote one weak item to your chunk deck and practice it deliberately next week.

---

## Light Metrics (review weekly, no deadlines)

- **Fluency**: 2–3 min talk at 140–170 WPM (record and check once a week)
- **Chunks**: 5+ target chunks used naturally in a 3–5 min talk
- **Complexity**: ≥3 complex sentences per prepared 2-min talk
- **Clarity**: Speech-to-text transcript ~90% accurate on your recorded talk
- **Consistency**: 5+ days/week

Use a simple 0–5 score for each; focus next week on the lowest.

---

## Templates

### Daily Log (copy/paste)

```markdown
Topic:
New chunks (5–10):
Grammar/pronunciation focus:
Shadowed lines (8–12):
2–3 min talk outline:
Reflection (1 error, 1 fix, 1 goal):
```

### AI Role-Play Prompt (paste into your chatbot)

```text
You are a tough senior PM interviewing a Data Engineer. Be concise, interrupt sometimes, and ask follow-up why/how questions. Topic: <TODAY'S TOPIC>. Evaluate clarity, trade-offs, and stakeholder alignment. After 6–8 minutes, give me 3 precise reformulations I could use.
```

---

## How to use this repo

- Create a folder `logs/` and save your daily log files as `YYYY-MM-DD.md`.
- Keep audio recordings in `recordings/` with the same date.
- Maintain a `personal-english.md` with your recurring errors and go-to chunks.

- Weekly plans live in `weeks/`. Start at `weeks/README.md`.

- Coaching settings live in `COACHING.md` and `coach.config.yaml`. I will follow these by default.

Suggested structure:

```text
DE-English/
  README.md (this file)
  logs/
  recordings/
  personal-english.md
```

---

## Start Today (5 steps)

1) Pick a topic: “Explaining your end-to-end pipeline.”
2) Find a 5–8 minute input with transcript (YouTube/TED/NPR).
3) Shadow 8–12 sentences; extract 8–12 chunks.
4) Speak 2–3 minutes using PREP or Problem–Solution–Impact; record it.
5) Write your Daily Log and set one micro-goal for tomorrow.

If you want, I can personalize the Topic Bank and chunk list for your specific tech stack (e.g., Spark, Kafka, BigQuery, Airflow), meeting types, and target accent.
