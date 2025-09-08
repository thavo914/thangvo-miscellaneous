# Week Creation Guide - Complete Structure & Requirements

## 1. Main Week Directory Structure

Each week must follow this exact structure:

```
weeks/week-XX/
├── README.md                           # Main week overview (REQUIRED)
├── prompts/
│   ├── comprehensive-practice.md       # Combined conversations/monologues (REQUIRED)
│   └── compare-contrast-recommend.md   # Optional additional prompts
├── grammar/
│   ├── grammar-lessons.md              # Grammar patterns (REQUIRED)
│   ├── grammar-teaching-transcript.md  # Monologue transcript (REQUIRED)
│   ├── sentence-structure-practice.md  # Sentence practice (REQUIRED)
│   └── echoing-practice-transcript.md  # Echoing practice (REQUIRED)
├── exercises/
│   ├── grammar-practice.md             # Grammar exercises (REQUIRED)
│   └── speaking-scenarios.md           # Speaking scenarios (REQUIRED)
├── vocabularies/                       # Individual vocabulary files (REQUIRED)
│   ├── term1.md
│   ├── term2.md
│   └── ...
├── daily-practice-plan.md              # Daily practice schedule (REQUIRED)
└── session-structure.md                # Session organization (REQUIRED)
```

## 2. Files to Update When Creating New Weeks

### A. Update TOPICS_SUMMARY.md
**Location:** `english/TOPICS_SUMMARY.md`

**Required additions:**
- Add new week section with format:
  ```markdown
  ## 📊 **WEEK XX: [Topic Name]**
  
  ### **Core Topics Covered:**
  - [List 5-8 main topics]
  
  ### **Key Concepts:**
  - [List 8-12 technical terms with hyphens]
  
  ### **Learning Materials:**
  - [List main practice materials]
  
  ### **Grammar Focus:**
  - [List grammar patterns]
  ```

**Update sections:**
- Add to "TOPICS TO AVOID DUPLICATING" if repeating concepts
- Add to "RECOMMENDATIONS FOR FUTURE WEEKS" if creating new topics
- Update "Last Updated" timestamp

### B. Update coach.config.yaml
**Location:** `english/coach.config.yaml`

**Only update if changing:**
- `vocabulary.path` (currently: `weeks/week-01/day-01/vocabularies`)
- `session_minutes_default` (currently: 90)
- `level` (currently: B1)
- `weekly_requirements` settings

**Example update:**
```yaml
vocabulary:
  path: weeks/week-XX/vocabularies  # Update to new week
```

### C. Create the week directory
**Location:** `weeks/week-XX/`

**Required files to create:**
1. `README.md`
2. `prompts/comprehensive-practice.md`
3. `grammar/grammar-lessons.md`
4. `grammar/grammar-teaching-transcript.md`
5. `grammar/sentence-structure-practice.md`
6. `grammar/echoing-practice-transcript.md`
7. `exercises/grammar-practice.md`
8. `exercises/speaking-scenarios.md`
9. `daily-practice-plan.md`
10. `session-structure.md`
11. `vocabularies/` directory with 8-12 vocabulary files

## 3. Required Content for Each File

### README.md Template
```markdown
# Week XX – [Topic Name]

## Outcomes (by end of week)
- [3-4 specific learning outcomes]
- [Technical skills to master]
- [Communication goals]

## Inputs (choose 1–2)
- [Article/talk/video recommendations]
- [Internal documentation references]

## Chunk Bank (8–12)
- [List 8-12 technical terms and phrases]
- [Include both single words and multi-word chunks]
- [Focus on terms you'll actually use]

## Grammar/Pronunciation Focus
- **Grammar**: [3-4 specific grammar patterns]
- **Grammar**: [Context for each pattern]
- **Pronunciation**: [Specific pronunciation focus]
- **Echoing**: [Practice materials description]

## Daily Plan (B1 Level, Speaking-First)
- **Mon**: [Specific activities and time]
- **Tue**: [Specific activities and time]
- **Wed**: [Specific activities and time]
- **Thu**: [Specific activities and time]
- **Fri**: [Specific activities and time]
- **Sat**: [Review and practice]
- **Sun**: [Light review and planning]

**Total**: ~4.5 hours/week, 60%+ speaking practice

## Exercises & Prompts
- [Problem–Solution–Impact scenarios]
- [Compare–Contrast–Recommend topics]
- [Role-play prompts with personas]

## Checklist (B1 Level)
- [ ] 5+ sessions completed (60%+ speaking time)
- [ ] 2 recordings (2-3 min talks)
- [ ] 6–8 chunks added & used naturally
- [ ] One error added to personal doc and addressed
- [ ] Grammar patterns practiced in context
- [ ] Technical vocabulary mastered (8-10 terms)
- [ ] Echoing practice completed daily
```

### comprehensive-practice.md Template
```markdown
# Comprehensive Practice - [Topic Name]

## Overview
[Brief description of the week's focus and practice goals]

---

## PART 1: TECHNICAL CONVERSATIONS (4 Conversations)

### Conversation 1: [Scenario Name]
**Participants:** Speaker1 + Speaker2 (Practice both roles)
**Duration:** [X-Y minutes]
**Context:** [Specific technical scenario]

[Full conversation dialogue]

**Key Phrases to Practice:**
- "[Phrase 1]"
- "[Phrase 2]"
- "[Phrase 3]"
- "[Phrase 4]"
- "[Phrase 5]"
- "[Phrase 6]"

### Conversation 2: [Scenario Name]
[Same structure as Conversation 1]

### Conversation 3: [Scenario Name]
[Same structure as Conversation 1]

### Conversation 4: [Scenario Name]
[Same structure as Conversation 1]

---

## PART 2: MONOLOGUE PRESENTATIONS (2 Monologues)

### Monologue 1: [Presentation Topic]
**Duration:** [X-Y minutes]
**Audience:** [Target audience]
**Goal:** [Presentation objective]

**Script:**
"[Full monologue text]"

**Key Phrases to Practice:**
- "[Phrase 1]"
- "[Phrase 2]"
- "[Phrase 3]"
- "[Phrase 4]"
- "[Phrase 5]"
- "[Phrase 6]"

### Monologue 2: [Presentation Topic]
[Same structure as Monologue 1]

---

## PART 3: EVERYDAY LIFE CONVERSATIONS (2 Conversations)

### Conversation 1: [Casual Topic]
**Participants:** Speaker1 + Speaker2 (Practice both roles)
**Duration:** [X-Y minutes]
**Context:** [Casual scenario]

[Full conversation dialogue]

**Key Phrases to Practice:**
- "[Phrase 1]"
- "[Phrase 2]"
- "[Phrase 3]"
- "[Phrase 4]"
- "[Phrase 5]"
- "[Phrase 6]"

### Conversation 2: [Casual Topic]
[Same structure as Conversation 1]

---

## PRACTICE GUIDELINES

### General Practice Tips
1. **Practice Both Roles:** Switch between Speaker1 and Speaker2 to develop flexibility
2. **Natural Flow:** Don't rush through the conversations; maintain natural pacing
3. **Context Awareness:** Adapt your tone based on the scenario (casual, professional, technical)
4. **Key Phrases:** Focus on the highlighted phrases that are commonly used in each context

### Technical Communication
1. **Clarity First:** Prioritize clear communication over perfect grammar
2. **Examples:** Use concrete examples to illustrate abstract concepts
3. **Business Value:** Connect technical decisions to business outcomes
4. **Confidence:** Speak with authority about your technical knowledge

### Casual Communication
1. **Relaxed Tone:** Keep everyday conversations light and friendly
2. **Personal Touch:** Share personal experiences and preferences
3. **Encouragement:** Offer support and encouragement
4. **Flexibility:** Be prepared to adapt the conversation based on responses

### Speaking Practice
1. **Record Yourself:** Listen to your pronunciation and fluency
2. **Vary Your Pace:** Practice speaking at different speeds
3. **Emphasize Key Points:** Use stress and intonation to highlight important information
4. **Handle Interruptions:** Practice responding to questions and clarifications

### Preparation Strategy
1. **Start with Conversations:** Begin with the technical conversations to build confidence
2. **Practice Monologues:** Use monologues to develop presentation skills
3. **End with Casual:** Finish with everyday conversations to maintain natural flow
4. **Repeat Key Phrases:** Practice the highlighted phrases multiple times

Remember, the goal is to develop natural, confident communication skills across all contexts - from technical discussions to casual conversations. This comprehensive practice will help you build the language patterns and confidence needed for professional and personal communication!
```

### Vocabulary File Template
**Location:** `vocabularies/term-name.md`

**Format (5-part specification):**
```markdown
# [Term Name]

## 1. IPA
/[phonetic transcription]/

## 2. Definition
[Clear, concise definition in context]

## 3. Part of Speech
[verb/noun/adjective/adverb/phrase]

## 4. Usage & Examples
- [Example sentence 1]
- [Example sentence 2]
- [Example sentence 3]
- [Example sentence 4]
- [Example sentence 5]

## 5. Synonyms & Related Terms
- [Synonym 1]: [brief explanation]
- [Synonym 2]: [brief explanation]
- [Related term 1]: [brief explanation]
- [Related term 2]: [brief explanation]
```

### Grammar Files Templates

**grammar-lessons.md:**
- 3-4 specific grammar patterns
- Clear explanations with examples
- Context from the week's technical topic
- Practice exercises

**grammar-teaching-transcript.md:**
- 2-3 minute monologue transcript
- Focus on teaching the grammar patterns
- Natural, conversational tone
- Technical context integration

**sentence-structure-practice.md:**
- Sentence transformation exercises
- Pattern recognition activities
- Context-based practice
- Progressive difficulty levels

**echoing-practice-transcript.md:**
- Short phrases and sentences
- Technical vocabulary focus
- Natural rhythm and stress patterns
- Progressive complexity

### Exercise Files Templates

**grammar-practice.md:**
- Fill-in-the-blank exercises
- Sentence completion activities
- Pattern recognition tasks
- Context-based applications

**speaking-scenarios.md:**
- Role-play situations
- Presentation topics
- Discussion prompts
- Q&A scenarios

### Planning Files Templates

**daily-practice-plan.md:**
- Day-by-day breakdown
- Time allocations
- Specific activities
- Progress tracking

**session-structure.md:**
- Session organization
- Time blocks
- Activity sequences
- Assessment criteria

## Quick Commands for Week Creation

- **"Create week-XX"** → Creates complete week structure with all required files
- **"Update topics summary"** → Adds new week to TOPICS_SUMMARY.md
- **"Add vocabulary: [term]"** → Creates vocabulary file using 5-part format
- **"Create grammar monologue"** → Builds teaching transcript for current week
- **"Generate comprehensive practice"** → Creates the main practice file with all conversations and monologues

## Quality Checklist

Before finalizing a new week, ensure:

- [ ] All 11 required files are created
- [ ] TOPICS_SUMMARY.md is updated
- [ ] Vocabulary follows 5-part format
- [ ] Grammar patterns connect to technical topic
- [ ] Conversations are realistic and practical
- [ ] Monologues are appropriate length and audience
- [ ] Everyday conversations are natural and engaging
- [ ] Practice guidelines are comprehensive
- [ ] Daily plan follows B1 speaking-first approach
- [ ] No duplication with previous weeks
