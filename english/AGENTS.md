# English Learning & Communication Guidelines: Plain English & Functional Self-Explanation

> [!IMPORTANT]
> **Core Mission**: Prioritize **clear, direct, and effortless self-expression** over complex vocabulary or elaborate grammar. The goal is to explain real-world situations, technical work, opinions, and daily experiences with confidence, clarity, and zero pretentiousness.

---

## 1. Core Principles

### 1. Clarity > Complexity
- The best English is the English that gets your message across immediately without hesitation or ambiguity.
- If an idea can be said with a simple word or a short sentence, **always choose the simpler option**.
- Never introduce a word or sentence structure solely to "sound advanced", "show off", or "impress an examiner".

### 2. Focus on "Self-Explanation"
All vocabulary, sentence formulas, and speaking exercises must train the learner to answer practical real-world questions:
1. **What is the problem or situation?** (*"The pipeline failed because the upstream schema changed."*)
2. **Why does it matter?** (*"This means our daily report will be delayed by an hour."*)
3. **What action did I take or recommend?** (*"I fixed the query and re-ran the job."*)
4. **What is the result or current status?** (*"Now the data is up to date."*)

---

## 2. Vocabulary & Collocation Rules

### 🚫 What to Avoid
- **Corporate Clichés & Boastful Idioms**:
  - Avoid: *"bring to the table"*, *"go above and beyond"*, *"hit the ground running"*, *"synergy"*, *"think outside the box"*, *"move the needle"*.
  - Avoid unsubstantiated self-praise like *"I consistently exceed expectations"* unless discussing an actual official performance metric with numbers.
  - Avoid self-proclaiming labels: Calling your own work *"key projects"* or *"critical deliverables"* sounds boastful. Let the manager assign importance, or describe the system objectively.
- **Show-off / Stiff Academic Words**:
  - Replace *"utilize"* → **"use"**
  - Replace *"facilitate"* → **"help"** or **"make easier"**
  - Replace *"commence"* → **"start"** or **"begin"**
  - Replace *"plethora of"* → **"a lot of"** or **"many"**
  - Replace *"in order to ascertain"* → **"to find out"** or **"to check"**
- **Overly Dramatic Idioms**: Avoid idioms that sound theatrical or unnatural when spoken by engineers in daily syncs or chats.

### ✅ What to Prioritize
- **High-Frequency B1–B2 Spoken English**: Natural verbs, phrasal verbs, and everyday descriptive words.
- **Clear Action Verbs**: *solve, fix, build, update, check, track, prevent, deliver, delay, improve, test*.
- **Factual, Grounded Collocations**:
  - Instead of *"go above and beyond"*, use: *"take on extra tasks"*, *"help out outside my main scope"*.
  - Instead of *"bring to the table"*, use: *"contribute"*, *"bring my background in..."*.
  - Instead of *"exceed expectations"*, use: *"deliver ahead of schedule"*, *"surpass our target by [X]%"*.
  - Instead of *"proven track record"*, use: *"experience with..."*, *"history of delivering..."*.
  - Instead of self-important labels like *"key projects"*, use objective technical terms: *"delivered our core data pipelines"*, *"completed my assigned projects"*.

---

## 3. Sentence Structure & Grammar Rules

### 1. Breath-Friendly Length
- Keep sentences **short to medium** (12–20 words on average).
- Sentences should be comfortable to speak aloud in one breath without stumbling or losing track of the thought.

### 2. High-Utility Logical Connectors
Focus mastery on reliable, reflexive connectors rather than obscure literary linkers:
- **Cause & Reason**: *because, since, so, that's why* (avoid overly formal ones like *inasmuch as*, *owing to the fact that*).
- **Condition & Sequence**: *if, when, as soon as, once, before, after*.
- **Contrast**: *but, although, even though, however* (avoid *notwithstanding*, *albeit*).
- **Purpose**: *so that, to, in order to*.

### 3. Slot-Filling Formulas
Formulas must represent natural everyday speech patterns, such as:
- `The main issue was that + [Subject] + [Verb]...`
- `To prevent this in the future, we should + [Base Verb]...`
- `I spent most of my time + [Verb-ing] + because + [Reason]...`
- `What I noticed was that + [Subject] + [Verb]...`

---

## 4. Tone & Mindset

1. **Grounded & Modest**: Speak objectively about work, achievements, and challenges. Let the facts and data tell the story.
2. **Conversational & Collaborative**: Sound like a friendly, clear, reliable teammate, not a textbook or a motivational speaker.
3. **Reflex-Oriented**: Train language patterns that can be produced instantaneously without translating from Vietnamese in your head.

---

## 5. Agent Must-Do Rules for Chat Interaction

### 🎯 Spontaneous Vietnamese-to-English Natural Translation
Whenever the user communicates in Vietnamese in the chat (asks a question, describes a situation, shares a personal experience, or makes a comment):
- **Mandatory Directive**: The agent **MUST** proactively provide the natural, native English translation of the user's Vietnamese sentence or thought.
- **Plain & Idiomatic**: The translation must completely avoid literal word-by-word "Vietlish" and academic stiffness. Instead, use natural B1–B2 spoken English that native professionals or engineers actually use in daily syncs, standups, or casual banter.
- **Format & Placement**: Highlight the English equivalent clearly in the response (e.g., `💡 Cách diễn đạt tiếng Anh tự nhiên: "... "`), optionally providing both a concise conversational version and a professional workplace version when applicable.

### 🔍 Proactive Naturalness Check & Alternative Phrasing
Whenever the user writes, asks about, or tests an English sentence in the chat:
- **Mandatory Directive**: The agent **MUST** actively evaluate the sentence's naturalness (identifying if it sounds like textbook English, slight Vietlish, or if a native speaker/engineer would say it differently).
- **Proactive Suggestions**: Proactively offer 1–2 more natural, punchier, or idiomatic native alternatives (e.g., rapid daily spoken reflexes vs. polished workplace communication).
- **Grammar & Collocation Nuance**: Briefly highlight *why* the suggested phrasing feels more natural (e.g., verb choice, preposition habits, word order).

---

## 6. Mandatory Sound-Block Chunking Rule (Keith Speaking Academy Method)
Whenever generating, updating, or reviewing **English curriculum notes, daily speed-reflex lessons, listening transcripts, or speaking drills** (excluding strict `parse_vocab.py` database import files):
- **Core Rule**: Apply the **Sound-Block Chunking Method** as documented in [chunk-text-and-lessons.md](file:///c:/Users/adm.thangvm/repos/thangvo-miscellaneous/.antigravity/workflows/chunk-text-and-lessons.md) so the learner trains spoken sound blocks instead of translating word-by-word.
- **Chunking Categories**:
  - **Adverbial / Time / Discourse Chunks**: e.g., `At the moment`, `By and large`, `To be honest`, `If that's the case`.
  - **Verb / Starter Chunks**: e.g., `I tend to`, `I'm used to`, `I find it easy to`, `It shouldn't take this long to`, `get [something] set up`.
  - **Object / Complement / Clause Chunks**: Breath-friendly 2–4 word sound units separated visually with `/` or `—` when drilling pronunciation and rhythm.
- **Complex Structures & 90/10 Grammar Logic Guard**:
  - Do **not** force every sentence into a rigid `[Adverbial] + [Verb] + [Object]` template. Use flexible/complex patterns (e.g., `It shouldn't take this long + to [verb chunk]`, conditional starters, passive/causative chunks like `get [something] [V-ed]`) as natural sound blocks.
  - Keep **90% of examples logically accurate** and natural; reserve the **10% Absurd/Illogical Mini-Story** explicitly for rapid 15-second fluency warm-ups so rhythm and linking take priority over overthinking.
- **Listening & Transcript Materials**: Include collapsible `🧱 Chunked Transcript` blocks showing sound-block breaks (`/`) and key reusable `[Verb/Starter]` and `[Adverbial]` chunks extracted from the audio.

---

## 7. Mandatory Linearthinking Methodology (Tư Duy Tuyến Tính)
Whenever explaining reading comprehension, dissecting complex sentences, teaching vocabulary, or coaching spoken responses (and across `/linearthinking`, `/add-next-week-material`, and `/generate-english-lesson`), combine **Linearthinking** with **Plain English & Sound-Block Chunking**:
- **No Word-by-Word Translation**: Eliminate Vietnamese word-by-word translation habits. Always construct the core English skeleton (`Subject - Verb - Object`) first before adding modifiers.
- **Simplify & Read Connection (Reading & Sentence Dissection)**:
  - **Simplify**: Strip away secondary modifiers (relative clauses, participial phrases, prepositional phrases, parenthetical clauses) to expose the core `S - V - O` skeleton (<10 words), then reconstruct how the modifiers add conditions or context.
  - **Read Connection**: Explicitly map the logical link between clauses or consecutive sentences (`Cause ➔ Effect`, `Problem ➔ Mechanism ➔ Solution`, `Contrast`, `Elaboration`).
- **Specify & Linear Flow (Speaking & Response Training)**:
  - **Specify**: Break broad or abstract prompts into 2–3 concrete, specific angles before speaking.
  - **Linear Flow**: Organize spoken responses along a straight causal axis (`Direct Answer ➔ Specify & Cause–Effect ➔ Concrete Example / Next Action`, compatible with `O-R-E-O` and `S-T-A-R`) connected by clear logical markers (`because, so, however, therefore, as a result, instead of`), and slice the final model sentences into **Sound-Block Chunks** (`/`).
- **Vocabulary by Mental Model (`Cause ➔ Problem ➔ Solution`)**:
  - Group vocabulary into logical cause–problem–solution chains and natural workplace collocations rather than isolated word lists so the learner retains words as an interconnected system.

