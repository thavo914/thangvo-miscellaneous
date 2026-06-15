import os
import re
import json
import glob
import time

def parse_markdown_files(directory):
    files = glob.glob(os.path.join(directory, "vocabulary-batch-*.md"))
    all_vocab = []

    # Regex patterns
    vocab_pattern = re.compile(r'\*\*(\d+)\.\s+(.+?)\*\*')
    type_meaning_pattern = re.compile(r'\*\((.*?)\)\*:\s*(.*?)\s*\*\((Vietnamese:.*?)\)\*')
    
    for file in sorted(files):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Split content into blocks by vocab word
        blocks = re.split(r'(?=\*\*\d+\.\s+)', content)
        
        for block in blocks:
            if not block.strip() or not block.startswith('**'):
                continue
            
            vocab_match = vocab_pattern.search(block)
            if not vocab_match:
                continue
                
            index = int(vocab_match.group(1))
            word = vocab_match.group(2).strip()
            
            # Find type and meanings
            type_meaning_match = type_meaning_pattern.search(block)
            word_type = ""
            eng_meaning = ""
            vi_meaning = ""
            if type_meaning_match:
                word_type = type_meaning_match.group(1).strip()
                eng_meaning = type_meaning_match.group(2).strip()
                vi_meaning = type_meaning_match.group(3).replace("Vietnamese:", "").strip()

            # Find sentences
            sentences_section = re.search(r'\*\*Sample Sentences:\*\*(.*?)(?=\*\*Synonyms / Alternatives:\*\*|\*\*Antonyms / Contrasts:\*\*|\*\*"Your Turn" Prompts:\*\*|$)', block, re.DOTALL)
            sentences = []
            if sentences_section:
                for line in sentences_section.group(1).strip().split('\n'):
                    if re.match(r'\d+\.\s+', line):
                        sentences.append(re.sub(r'^\d+\.\s+', '', line).strip())

            # Find synonyms
            synonyms_section = re.search(r'\*\*Synonyms / Alternatives:\*\*(.*?)(?=\*\*Antonyms / Contrasts:\*\*|\*\*"Your Turn" Prompts:\*\*|$)', block, re.DOTALL)
            synonyms = []
            if synonyms_section:
                for line in synonyms_section.group(1).strip().split('\n'):
                    if line.strip().startswith('-') and not 'Note:' in line:
                        synonyms.append(line.replace('- **', '**').strip())

            # Find antonyms
            antonyms_section = re.search(r'\*\*Antonyms / Contrasts:\*\*(.*?)(?=\*\*"Your Turn" Prompts:\*\*|$)', block, re.DOTALL)
            antonyms = []
            if antonyms_section:
                for line in antonyms_section.group(1).strip().split('\n'):
                    if line.strip().startswith('-') and not 'Note:' in line:
                        antonyms.append(line.replace('- **', '**').strip())

            # Find prompts
            prompts_section = re.search(r'\*\*"Your Turn" Prompts:\*\*(.*?)$', block, re.DOTALL)
            prompts = []
            if prompts_section:
                for line in prompts_section.group(1).strip().split('\n'):
                    if line.strip().startswith('>'):
                        prompts.append(line.replace('> ', '').strip())
            
            # Get file modification time as added_date
            mtime = os.path.getmtime(file)
            added_date = time.strftime('%Y-%m-%d', time.localtime(mtime))

            all_vocab.append({
                "id": index,
                "word": word,
                "type": word_type,
                "english_meaning": eng_meaning,
                "vietnamese_meaning": vi_meaning,
                "sentences": sentences,
                "synonyms": synonyms,
                "antonyms": antonyms,
                "prompts": prompts,
                "source": os.path.basename(file),
                "added_date": added_date
            })

    return all_vocab

if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    lessons_dir = os.path.dirname(current_dir)
    vocab_data = parse_markdown_files(lessons_dir)
    
    # Save as JavaScript variable
    output_path = os.path.join(current_dir, "vocab_data.js")
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(f"const vocabData = {json.dumps(vocab_data, indent=4, ensure_ascii=False)};")
    
    print(f"Parsed {len(vocab_data)} vocabulary items successfully!")
    print(f"Data saved to {output_path}")
