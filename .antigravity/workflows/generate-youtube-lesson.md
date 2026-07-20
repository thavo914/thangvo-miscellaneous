---
description: Generate a detailed English lesson from a YouTube video transcript about life and daily lessons, breaking it down into chunks with grammar, vocabulary, sentence structures, and usage guides.
---

# Workflow: /generate-youtube-lesson

Use when the user provides a YouTube video transcript (focused on life, personal growth, or daily lessons) and asks to create a structured study guide or lesson.

## Requirements

- **Theme Focus**: The focus should be on practical life lessons, personal growth, and daily reflections, extracting language that native speakers actually use when talking about these topics.
- **Level**: Target B1-B2 CEFR conversational level. Ensure explanations are simple, practical, and easy to digest.
- **Format**: Save the output into a single Markdown file with a clear, engaging layout.
- **Goal**: Provide a comprehensive analysis of the video's content. You must process the **entire transcript** from start to finish, breaking it into as many sequential chunks as necessary (e.g., 10+ chunks for long videos) to capture the full narrative and storyline. The user wants to understand the actual video content, not just learn isolated English phrases. Only omit true filler (e.g., "don't forget to subscribe"); do NOT skip stories, examples, or narrative tangents.

---

## Output Structure

The final markdown file should follow this exact structure:

### 1. Title and Brief Summary
- **Title**: Create a catchy, relevant title for the lesson based on the video's theme.
- **Core Message**: Provide a brief 2-3 sentence summary of the video's main life lesson.

### 2. Comprehensive Chunk-by-Chunk Analysis
Break the **entire** provided transcript down sequentially into logical, bite-sized chunks (usually a paragraph or 3-5 sentences that share a single thought). For **every chunk**, provide the following sections:

#### 📝 Transcript Chunk [Number]
- Quote the exact text of the chunk using a blockquote (`> `).

#### 📚 Vocabulary & Idioms
- Extract 3-5 useful words, collocations, phrasal verbs, or idioms from the chunk.
- For each item, provide:
  - Part of speech
  - Vietnamese translation
  - A natural, real-life example sentence.

#### 🧠 Grammar & Sentence Structure
- Highlight 1-2 interesting grammar points or sentence structure templates used in the chunk.
- Explain the rule simply.
- Extract the structural formula (e.g., `What I really wanted wasn't [Noun A], but [Noun B]`).

#### 💡 Practical Application & Alternatives
- **How to use it**: Explain a practical daily or workplace situation where the user can apply the key phrases or structures from this chunk (e.g., *"Use this structure when giving advice to a friend who is stressed out"*).
- **Alternative ways to say it**: Provide 2-3 alternative phrases or idioms that convey the same meaning but in different tones (e.g., more casual, more professional, or idioms).

---

## Execution Instructions
- **Output File**: Save the entire generated lesson into a single markdown file in the appropriate directory (e.g., `english/youtube-lessons/[lesson-name].md`).
- **Formatting**: Use emojis, bold text, bullet points, and blockquotes to make the lesson highly scannable and visually engaging.
- **No Academic Bloat**: Keep the explanations practical. Avoid overly complex linguistic terms; explain grammar in a way that helps the user *speak* better, not just pass a written test.
