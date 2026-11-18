---
description: Break down any English transcript, lesson file, dialogue, or workplace text into speakable Sound Chunks (Verb Chunks + Adverbial Chunks) and generate a 5-Minute Chunking Fluency Drill based on the Keith Speaking Academy method.
---

# Workflow: /chunk-text-and-lessons (or /chunking)

> [!IMPORTANT]
> **🧱 SOUND-BLOCK & FLUENCY CHUNKING ENGINE**
> - **Core Philosophy**: Proficient speakers do not think or speak word-by-word—they think and speak in **sound blocks (`chunks`)** of 2–5 words compressed into a single rhythmic unit (like picking up a *bunch* of bananas rather than one banana at a time).
> - **Supported Inputs**:
>   1. **Audio / Video Transcripts** (TOEIC Part 3, YouTube talks, Podcasts).
>   2. **Existing Lesson & Note Files** (`english/week-<N>/lessons/*.md`, `notes/*.md`).
>   3. **Raw Workplace / Tech Text** (Emails, Slack updates, PR descriptions, Design docs).
> - **Plain English & Functional Self-Explanation**: Strictly adhere to [english/AGENTS.md](file:///c:/Users/adm.thangvm/repos/thangvo-miscellaneous/english/AGENTS.md). Keep chunks B1–B2 natural, breath-friendly, and free of empty corporate jargon.
> - **Git Rules**: Keep all file edits in the local working tree only. **Do not auto-commit or auto-push** without explicit user permission.

---

## 🛠️ Step-by-Step Execution Guide

### Step 1: Audit the Input & Identify Scope
1. Inspect the user's input (pasted transcript/text or `@[file]` reference).
2. Determine the target output mode:
   * **Chat-Only Breakdown**: When user pastes a raw transcript, email, or paragraph for quick practice.
   * **Lesson / Cue Sheet Enrichment**: When user targets `day<N>-speed-reflex.md`, `verbal-recall-cues.md`, or asks to apply chunking to a week's lessons.

---

### Step 2: Sound-Block Segmentation (Break Text into Speakable Chunks)
Take key sentences from the source material and slice them into natural rhythmic breath units using `/` separators and sound-linked hyphens (`-`):

1. **Extract High-Yield Chunks by Category**:
   * **Verb Chunks** *(Action cores)*: e.g., `I've-been-trying-to`, `I'm-in-charge-of`, `we-could-switch-from`, `I-should've-checked`.
   * **Adverbial Chunks** *(Time, framing, attitude)*: e.g., `at-the-moment`, `by-and-large`, `to-be-honest`, `in-the-first-place`, `at-the-last-minute`.
   * **Object / Noun Chunks** *(Concrete targets)*: e.g., `the-catering-quotes`, `something-upscale`, `the-latest-diagnostic-equipment`.
   * **Starter / Frame Chunks** *(Openers for complex sentences, indirect questions & conditionals)*: e.g., `I-wonder-if`, `What-if-we`, `Because-of-how-great`, `The-first-step-I-always-take`, `It's-been-a-month-since`.

2. **Format Rhythm & Linking Hints**:
   * Show where native speakers compress multiple words into **one sound unit**:
     * *Example*: `What-matters-now-is` / `that-I-need-the-camera` / `up-and-running` / `by-tomorrow-morning`.

---

### Step 3: Apply the 90/10 Grammar Logic Guard ⚠️
Before drilling chunks blindly, flag **any 10% logic-critical rules** present in the text so the learner never misuses a chunk in the wrong context:
* *Examples*:
  * `try + V-ing` (experimenting with a fix) vs. `try + to V0` (difficult effort).
  * `by [Deadline]` vs. `on [Event Day]`.
  * `have/get it installed` (causative) vs. `can't have installed it` (past deduction).
  * `I wonder if [S + V]` (no auxiliary inversion).

---

### Step 4: Build the 5-Minute Chunking Fluency Drill
Generate a ready-to-speak 5-minute drill directly from the segmented chunks:

1. **Minute 1 — 3 Core Verb / Starter Chunks (Slot-Swapping)**:
   * List 3 Verb or Starter Chunks from the input, each with 2–3 quick slot endings to repeat aloud as single sound units.
2. **Minute 2 — 3 Adverbial / End-Position Chunks (Rhythm Anchors)**:
   * List 3 Adverbial Chunks (front, mid, or end position) to lock in natural rhythm.
3. **Minutes 3–4 — Flexible & Complex Lego Assembly**:
   * Do **not** force every sentence into a single template. Assemble chunks using natural patterns matched to the target grammar:
     * **Front-Adverbial Pattern**: `[Adverbial] + [Verb Chunk] + [Object/Complement]` *(e.g., `At the moment` / `I'm in charge of` / `the pipeline`)*.
     * **End-Adverbial Pattern**: `[Verb Chunk] + [Object] + [End-Adverbial]` *(e.g., `I should've read` / `the manual` / `in the first place`)*.
     * **Intransitive / No-Object Pattern**: `[Subject] + [Verb Chunk] + [Time/Place]` *(e.g., `Prices` / `have skyrocketed` / `in the last year`)*.
     * **Complex Multi-Clause / Indirect Pattern**: `[Starter/Frame Chunk] + [Clause 1] + [Connector/Pivot] + [Clause 2]` *(e.g., `Because of how great` / `the team has been performing`, / `we will be letting` / `everyone leave early`; or `I wonder if` / `this supplier offers` / `the same deals` / `at its physical locations`)*.
4. **Minute 5 — Dual 15-Second Mini-Stories**:
   * **Playful / Illogical Mini-Story**: A quirky, zero-pressure 3-sentence story linking the chunks purely to train mouth muscles and rhythm without overthinking meaning.
   * **Real Workplace / Tech Mini-Story**: A realistic 3-sentence Engineering/Workplace update using the exact same chunks.

---

### Step 5: Deliver Output & Update Files (If Requested)
1. If updating lesson files (`day<N>-speed-reflex.md`), insert a compact **`🧱 5-Minute Chunking Warm-Up (Keith Method)`** block right before Block 2.
2. If generating for a transcript or pasted text, output the complete segmented breakdown + 5-Minute Drill directly in chat (and optionally save to a dedicated note/drill file if requested).
3. Provide clickable `file:///` links for any created or modified files.
4. **Remember Git Rules**: Never auto-commit or auto-push.
