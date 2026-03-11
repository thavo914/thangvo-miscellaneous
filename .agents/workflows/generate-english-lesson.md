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

Phase 1 - Passive (Continuous): Play 2-3x while multitasking.
Phase 2 - Active (25 min): Global/Targeted comprehension (Open questions + Fact check).
Phase 3 - Micro-Dictation Part A (20 min): Initial rough draft of primary clip. **Strict Limit**: Stop when timer ends even if incomplete.

---

## Step 5 - day2-active-listening-immersion.md

Phase 1 - Orthographic Mapping (20 min): Highlight vocabulary + mark connected speech in transcript.
Phase 2 - Micro-Dictation Part B (20 min): Verify draft against transcript + log 5 errors.
Phase 3 - Phonetic Drill (15 min): Drill 4 natural-speech phrases.

---

## Step 6 - day3-ai-simulation.md

3 rounds of AI conversation based on episode theme. 60 min.

---

## Step 7 - day4-grammar-structures.md

Master 7 transcript-specific grammar patterns. Personal examples required. 60 min.

---

## Step 8 - day5-monologue.md

Phase 1 - Warm-up (10 min): Lexical labeling / Syntactic narration.
Phase 2 - Recorded Monologue (35 min): Topic view + self-eval.

---

## Step 9 - day6-shadowing.md

4-stage shadowing protocol (Audit -> Echo -> Sync -> Blind) applied to primary clip. 60 min.

---

## Step 10 - vocabulary-flashcards.md

(Same as before)

---

## Step 11 - weekly-review.md

Complete Day 7. Focus on Recording Comparison and Skills Audit.

---

## Format Rules (all files)

...

---

## Quick Reference

| Day | Technique                           | File                             |
| --- | ----------------------------------- | -------------------------------- |
| 1   | Listening + Dictation (A)           | day1-passive-active-listening.md |
| 2   | Immersion + Dictation (B)           | day2-active-listening-immersion.md |
| 3   | AI Simulation                       | day3-ai-simulation.md            |
| 4   | Grammar Structures                  | day4-grammar-structures.md       |
| 5   | Monologue                           | day5-monologue.md                |
| 6   | Shadowing                           | day6-shadowing.md                |
| -   | Supporting files                    | overview, transcript, flashcards, review |
