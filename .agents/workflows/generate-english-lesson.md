---
description: Generate a complete English lesson folder from a new audio/video episode using the Six Techniques framework
---

# Workflow: /generate-english-lesson

Use when the user provides a new episode script/transcript and asks to create lesson materials.

Framework: `english/docs/Six Techniques For English Learning.md`
Output folder: `english/week-<N>/lessons/`
Total files: 10 per lesson

---

## Step 0 - Gather Episode Info (before creating any files)

Extract from the script:
1. Title, source (BBC / podcast / YouTube), CEFR level (A2-B1=Beginner | B1-B2=Intermediate | B2-C1=Advanced)
2. Primary shadowing clip: 30-60s segment with densest vocabulary + most natural connected speech (prefer guest speaker over host small-talk)
3. 5-7 target vocabulary words: not basic, formally defined in episode, transferable to work/daily life, varied part of speech

---

## Step 1 - Create folder

```
english/week-<N>/lessons/
```

---

## Step 2 - lesson-overview.md

Single-page entry point. Include:
- Metadata: title, source, CEFR level, dates
- Learning objectives table (Listening | Vocabulary | Pronunciation | Speaking | Thinking)
- Target vocabulary table (word | POS | meaning | episode sentence)
- 6-day protocol table (Day | Technique | Core Activity)
- File listing table linking to all 10 files
- Success metrics checklist
- Ground rules (copy verbatim every time):
  1. One artifact, many angles - apply every technique to this same episode.
  2. Record your output - voice memos count. You are your own evaluator.
  3. Resist translation - describe unknown words in English first.
  4. Quantity beats quality - 3 imperfect recordings beat 1 over-rehearsed one.

---

## Step 3 - lesson-transcript.md

Annotated script for Day 2 verification and Day 3 shadowing.

Annotation symbols (include a guide table at the top):
- `_` = catenation: consonant links to next vowel ("an_apple")
- `(t)` / `(d)` = elision: sound dropped ("nex(t) door")
- `[a]` = schwa/weak form ("[a]nd")
- **BOLD** = primary stress
- [up] / [down] = rising / falling intonation
- [key] = target vocabulary word (mark every occurrence)

Rules:
- Organize into named Parts (Part 1, Part 2...)
- Mark primary shadowing clip: "> [TARGET] This is your primary shadowing clip (~45s). Focus Day 3 here."
- Mark secondary clip if present
- Focus annotations on: stressed content words, reduced function words, cross-word links
- End with Vocabulary Quick Reference table: word | IPA | example sentence

---

## Step 4 - day1-passive-active-listening.md

Phase 1 - Passive (20 min): Play 2-3x while doing something else. List 4-5 things to notice without trying. Hard rule: no pausing, no notes.

Phase 2 - Active (30 min):
- Listen 1: Global - 4 open questions (topic, speakers, main argument, main concern)
- Listen 2: Targeted - Part A: factual/quiz; Part B: key ideas; Part C: vocabulary hunt (3 unknown words)
- Listen 3: Primary clip only - 3 micro-questions (speed, tone, one sentence recalled)

Phase 3 - Check (10 min): 4 vocab fill-ins from episode context; 2-3 sentence personal opinion in English; self-coaching notes (% understood, hardest part, easiest speaker)

---

## Step 5 - day2-dictation.md

Phase 1 - Dictation (30 min): Target = primary shadowing clip. Instructions: listen once through -> sentence-by-sentence -> max 3 replays -> mark gaps as [???]. Include blank code block.

Phase 2 - Verify (20 min): Compare against lesson-transcript.md. Error classification table with 5 categories (Elision | Weak form | Catenation | Unknown vocab | Speed) - include one episode-specific example per category. 5-row error log (what I wrote | what it was | category).

Phase 3 - Drill (10 min): 4 phrases from the episode - one demonstrating each: catenation, elision, schwa, rhythm. For each: write natural-speech version, drill x5.

Bonus: Optional second target (slower section) for users who finish early.

---

## Step 6 - day3-shadowing.md

4-stage protocol applied to the primary shadowing clip:

Stage 1 - Auditory Priming (5 min): No transcript, no speaking. Play x3. Listen for melody, rhythm, tone, stressed words.

Stage 2 - Transcribed Echoing (15 min): Open transcript. Sentence-by-sentence: pause -> read aloud -> repeat x3-5. Include Focus Sentences table (5 rows: sentence | feature to copy).

Stage 3 - Synchronous Shadowing with Text (20 min): Read simultaneously while audio plays, 0.5s delay. Include Common Mistakes table (4 rows: problem | fix). Target: 10+ reps.

Stage 4 - Blind Shadowing (15 min): No transcript. Play x5-8. Record at least 2 attempts. Self-eval: rhythm? intonation? problem word?

Bonus: "Shadow + Personalize" - shadow one sentence, then swap in own work content.

---

## Step 7 - day4-ai-simulation.md

3 rounds. Rules for ALL prompts: set B1-B2 level explicitly, forbid mid-conversation corrections, require structured post-round feedback.

Round 1 - Discussion (15 min): AI as curious peer. Episode central debate. After 3 exchanges: AI lists target words used correctly + one grammar error.

Round 2 - Expert Role-play (15 min): AI plays main guest/expert. User interviews with 3-4 questions. After round: feedback on question naturalness, grammar, vocab.

Round 3 - Devil's Advocate (20 min): User argues one position, AI argues opposite. 4+ exchanges. After round: grade linking words, vocab range, grammar, persuasiveness; suggest 2 more natural phrases.

Review (10 min): Ask AI for 3 best sentences + 3 corrected weak sentences. Read improved sentences aloud x3.

---

## Step 8 - day5-monologue.md

Phase 1 - Warm-up (15 min):
- Exercise A - Lexical Labeling (5 min): label room objects in English aloud; if unknown, describe in English; bridge to episode topic
- Exercise B - Syntactic Narration (10 min): narrate actions/observations in full English sentences; connect to episode topic; forward momentum only

Phase 2 - Recorded Monologue (30 min):
Topic: episode theme as personal opinion question ("[Topic]: My Personal View").
Structure table (always use):

| Section      | Time | Content                            |
| ------------ | ---- | ---------------------------------- |
| Opening      | 15s  | State your position                |
| First point  | 30s  | Main supporting argument           |
| Counterpoint | 30s  | Opposing view using episode vocab  |
| Expert idea  | 20s  | Paraphrase the expert's suggestion |
| Your verdict | 20s  | Agree/disagree and why             |
| Closing      | 5s   | One final sentence                 |

Recording: Attempt 1 (2 min, no stop); recovery phrases ("What I mean is..." / "Let me put it differently..."); listen back; Attempt 2 (fix one problem); Attempt 3 optional.

Phase 3 - Self-Eval (15 min): Target Vocabulary Audit (checkbox per word); Fluency Audit table (Rhythm | Fillers | Vocab range | Grammar | Confidence - rated 1-5).

---

## Step 9 - day6-grammar-structures.md

Extract at least 7 grammar patterns genuinely present in the transcript. Must include at least: one hedging phrase, one conditional, one passive recommendation, one in-speech definition, one idiom/set phrase.

For each structure include:
1. Exact transcript quote + speaker name
2. What it does (1-2 sentences - communicative function)
3. Pattern in [bracket] template form
4. 2-3 examples - at least one in user's work/life context (data engineering / casino)
5. "Your turn" - 1-2 personal fill-in prompts

Pattern menu (pick what is genuinely present): Concession (Not X, but not nearly as Y) | Set phrase (Take [thing] for granted) | Time contrast (Initially... but later) | Definition (It means... In other words...) | Conditional (If X, then [subject] do Y) | Passive recommendation (Could be [adv] [V-ed] by [V-ing]) | Hedged opinion (I think it is fair to say that...) | Reported speech (He said that he thought...)

End with: Grammar Summary Table (# | pattern | key use) + "Day 6 Deliverables" checklist + "Key Insight" callout.

---

## Step 10 - vocabulary-flashcards.md

One card per target word. Card format (exact):

```
## Card N - [word]

Front: [Definition question - do NOT use the word]

Back: [word] /IPA/ | POS | 1-line definition

Episode sentence: "exact quote"

Your sentence: [Blank sentence in user's work/life context]

[Pronunciation drill / Collocations / Register note / Grammar warning]
```

Rules: front cannot contain the word; episode sentence must be exact quote; personalize to data engineering/casino context; include pronunciation drill for tricky words; include grammar warning for common misuse.

End with 5-question Weekly Review Quiz (no answers).

---

## Step 11 - weekly-review.md

Complete Day 7. Six parts:

1. Knowledge Check (no notes): 4 comprehension questions + 6 vocab fill-in-blanks -> check against flashcards
2. Skills Audit Table (11 rows): Passive listening | Active listening | Dictation | Connected speech | Shadowing rhythm | Blind shadowing | AI conversation | Vocab use | Monologue | Thinking in English | Grammar structures -> columns: Skill | Day | Rating /5 | Improve
3. Recording Comparison: Day 1 comprehension % vs Day 5 %; define vs use each word; one phrase now said fluently
4. Vocabulary Mastery Checklist: one row per word - Heard | Wrote | Dictation | Shadowing | AI | Monologue | Grammar (goal: 4+/7 per word)
5. Deliverables Checklist: checkbox per major item (episode x5, dictation, shadowing recordings, grammar sentences, etc.)
6. Reflection (3 prompt options) + blank code block + Carry Forward (3 blank lines)

---

## Format Rules (all files)

- Markdown .md only
- Filename: day<N>-<slug>.md
- Every file ends with "Day N Deliverables" checklist + "Key Insight for Today" (1-3 sentences)
- Use tables for 3+ rows of comparable data
- Phase/stage/step structure - no prose walls
- Time estimates in every section header

---

## Quick Reference

| Day | Technique                           | File                                                                                 |
| --- | ----------------------------------- | ------------------------------------------------------------------------------------ |
| 1   | Passive and Active Listening        | day1-passive-active-listening.md                                                     |
| 2   | Dictation                           | day2-dictation.md                                                                    |
| 3   | Shadowing                           | day3-shadowing.md                                                                    |
| 4   | AI Simulation                       | day4-ai-simulation.md                                                                |
| 5   | Cognitive Restructuring + Monologue | day5-monologue.md                                                                    |
| 6   | Grammar and Sentence Structures     | day6-grammar-structures.md                                                           |
| -   | Supporting files                    | lesson-overview.md, lesson-transcript.md, vocabulary-flashcards.md, weekly-review.md |
