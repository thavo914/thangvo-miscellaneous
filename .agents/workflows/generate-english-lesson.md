---
description: Generate a complete English lesson folder from a new audio/video episode using the Restructured Seven-Day framework
---

# Workflow: /generate-english-lesson (Restructured)

Use when the user provides a new episode script/transcript and asks to create lesson materials.

Framework: `english/docs/Six Techniques For English Learning.md`
Output folder: `english/week-<N>/lessons/`
Total files: 11 per lesson

---

## Step 0 - Gather Episode Info (before creating any files)

Extract from the script:
1. Title, source (BBC / podcast / YouTube), CEFR level (A2-B1=Beginner | B1-B2=Intermediate | B2-C1=Advanced)
2. Primary shadowing clip: 30-60s segment with densest vocabulary + most natural connected speech
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
- 7-day protocol table:
  | Day | Technique | Core Activity |
  | --- | --- | --- |
  | 1 | Listening + Dictation (A) | Global listening and first dictation draft. |
  | 2 | Immersion + Dictation (B) | Orthographic mapping, dictation verification, and phrase drills. |
  | 3 | AI Simulation (Episode) | Discuss episode themes with an AI peer and expert. |
  | 4 | Grammar Structures | Master 7 specific patterns from the transcript. |
  | 5 | Shadowing | 4-stage shadowing protocol on the primary episode clip. |
  | 6 | AI Simulation (Background) | Professional role-play and expert discussion on background-related topics. |
  | 7 | Monologue (Background) | Record personal view on a topic from your professional background (Data Engineering / Casino). |
- File listing table linking to all 10 files
- Ground rules (copy verbatim every time):
  1. One artifact, many angles - apply every technique to this same episode.
  2. Record your output - voice memos count. You are your own evaluator.
  3. Resist translation - describe unknown words in English first.
  4. Quantity beats quality - 3 imperfect recordings beat 1 over-rehearsed one.

---

## Step 3 - lesson-transcript.md

Annotated script for Day 2 verification and Day 6 shadowing.

Annotation symbols:
- `_` = catenation ("an_apple")
- `(t)` / `(d)` = elision ("nex(t) door")
- `[a]` = schwa/weak form ("[a]nd")
- **BOLD** = primary stress
- [up] / [down] = rising / falling intonation
- [key] = target vocabulary word

Rules:
- Mark primary shadowing clip: "> [TARGET] This is your primary shadowing clip (~45s). Focus Day 6 here."
- End with Vocabulary Quick Reference table: word | IPA | example sentence

---

## Step 4 - day1-passive-active-listening.md (Listening + Dictation Draft)

Phase 1 - Passive (Continuous): Play 2-3x as background noise.
Phase 2 - Active (25 min): Global (2 questions) and Targeted (3-4 questions).
Phase 3 - Micro-Dictation Part A (25 min): Primary clip drafting. Max 3 replays. No transcript.

---

## Step 5 - day2-active-listening-immersion.md (Immersion + Verification)

Phase 1 - Orthographic Mapping (20 min): Listen while reading transcript. Highlight 5-7 collocations.
Phase 2 - Micro-Dictation Part B (25 min): Compare Day 1 draft with transcript. Error classification table (3 entries).
Phase 3 - Phonetic Drill (15 min): Drill 4 phrases x5.

---

## Step 6 - day3-ai-simulation.md

3 rounds. Rules: B1-B2 level, no mid-convo corrections, post-round feedback.
Round 1 - Discussion (15 min): AI as curious peer.
Round 2 - Expert Role-play (15 min): AI plays main expert.
Round 3 - Devil's Advocate / Startup Scenario (20 min): Discussion on core debate.
Review (10 min): ReadImproved sentences aloud x3.

---

## Step 7 - day4-grammar-structures.md

Extract 7 grammar patterns present in transcript.
Include:
1. Exact transcript quote
2. Communicative function
3. [bracket] template
4. 2-3 examples (one in user's work/life context)
5. "Your turn" prompt

---

## Step 8 - day5-shadowing.md (Shadowing)

4-stage protocol applied to the primary shadowing clip:
Stage 1 - Auditory Priming (5 min): No transcript. Play x3.
Stage 2 - Transcribed Echoing (15 min): Sentence-by-sentence with transcript.
Stage 3 - Synchronous Shadowing (20 min): With text, 0.5s delay. 10+ reps.
Stage 4 - Blind Shadowing (15 min): No transcript. Record 2 attempts.

---

## Step 9 - day6-ai-simulation-background.md (AI Simulation — Background Topic)

Purpose: Practice professional English conversation in real-world scenarios from your background (Data Engineering / Casino).
3 rounds. Rules: B1-B2 level, no mid-convo corrections, post-round feedback.

Round 1 - Non-Technical Stakeholder (15 min): AI plays a casino floor manager or marketing director with no data background. Explain a technical concept without jargon. Use analogies.
Round 2 - Peer Expert Discussion (15 min): AI plays a senior data engineer or solution architect. Discuss a design decision, architecture choice, or a technical challenge relevant to your work.
Round 3 - Job Interview / Presentation (20 min): AI plays a hiring manager for a senior data engineering role at a casino company. Answer 3 behavioral/technical questions using the STAR method. Incorporate episode vocabulary where natural.
Review (10 min): Re-read improved sentences aloud x3. Note 2 phrases to carry forward.

Background Prompt Bank (generate 3 customized prompts tailored to the episode theme + background):
- Example: "You are a hiring manager for a resort & casino group. I am applying for a Senior Data Engineer role. Ask me about how I handle data quality issues, cross-team collaboration, and my experience with streaming pipelines."

---

## Step 10 - day7-monologue-background.md (Monologue — Background Topic)

Purpose: Transfer episode vocabulary and grammar patterns into your professional domain (Data Engineering / Casino).

Phase 1 - Warm-up (10 min): Brainstorm 5-7 technical/professional words you want to use. Write one sentence connecting the episode's vocabulary to your work context.
Phase 2 - Recorded Monologue (30 min):
- Choose ONE topic from the list below. Record yourself speaking for 2-3 minutes.
- Topic options (generate based on the episode's theme and the user's background):
  - "Describe the most complex data pipeline challenge you have faced and how you solved it."
  - "How would you explain real-time player analytics to a non-technical casino manager?"
  - "What skills from this week's episode topic remind you of challenges in data engineering?"
  - "Present your vision for how data engineering could improve a specific casino operation."
- Use a timing table: [0:00-0:30 Hook | 0:30-1:30 Main Point | 1:30-2:30 Example | 2:30-3:00 Conclusion]
Phase 3 - Self-Eval (15 min):
- Vocabulary audit: Did you use at least 3 words from the week's episode vocabulary?
- Fluency audit (1-5): Rate your pace, accuracy, and confidence.
- Write 1-2 sentences you want to improve.

---

## Step 11 - vocabulary-flashcards.md

One card per target word. 
Front: Definition question (no word).
Back: [word] /IPA/ | POS | 1-line definition | Episode quote | Personal sentence.
End with 5-question Review Quiz.

---

## Step 12 - weekly-review.md

1. Knowledge Check (No notes): 4 questions + 6-7 fill-ins.
2. Skills Audit Table (13 rows, including Day 6 Monologue Background and Day 7 AI Simulation Background).
3. Recording Comparison (Day 1 understanding vs Day 5 Shadowing fluency).
4. Vocabulary Mastery Checklist (Heard | Wrote | Dictation | Shadowing | AI Episode | AI Background | Monologue Background | Grammar).
5. Reflection and Carry Forward.
