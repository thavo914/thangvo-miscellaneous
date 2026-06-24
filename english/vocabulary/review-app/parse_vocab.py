import os
import re
import json
import glob
import time
import sqlite3

def init_db(db_path, js_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Create vocabulary table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS vocabulary (
            id INTEGER PRIMARY KEY,
            word TEXT UNIQUE NOT NULL,
            type TEXT NOT NULL,
            english_meaning TEXT NOT NULL,
            vietnamese_meaning TEXT NOT NULL,
            sentences TEXT NOT NULL,
            synonyms TEXT NOT NULL,
            antonyms TEXT NOT NULL,
            prompts TEXT NOT NULL,
            source TEXT NOT NULL,
            added_date TEXT NOT NULL
        )
    """)
    conn.commit()
    
    # Check if table is empty
    cursor.execute("SELECT COUNT(*) FROM vocabulary")
    count = cursor.fetchone()[0]
    
    if count == 0 and os.path.exists(js_path):
        print(f"Database is empty. Bootstrapping from {js_path}...")
        try:
            with open(js_path, 'r', encoding='utf-8') as f:
                js_content = f.read()
            match = re.search(r'const vocabData = (\[.*\]);', js_content, re.DOTALL)
            if match:
                existing_data = json.loads(match.group(1))
                for item in existing_data:
                    cursor.execute("""
                        INSERT INTO vocabulary 
                        (id, word, type, english_meaning, vietnamese_meaning, sentences, synonyms, antonyms, prompts, source, added_date)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """, (
                        item["id"],
                        item["word"],
                        item["type"],
                        item["english_meaning"],
                        item["vietnamese_meaning"],
                        json.dumps(item["sentences"], ensure_ascii=False),
                        json.dumps(item["synonyms"], ensure_ascii=False),
                        json.dumps(item["antonyms"], ensure_ascii=False),
                        json.dumps(item["prompts"], ensure_ascii=False),
                        item["source"],
                        item["added_date"]
                    ))
                conn.commit()
                print(f"Successfully bootstrapped database with {len(existing_data)} items.")
        except Exception as e:
            print(f"Warning: Failed to bootstrap database: {e}")
            
    conn.close()

def parse_markdown_files(directory):
    files = glob.glob(os.path.join(directory, "vocabulary-batch-*.md"))
    all_vocab = []
    seen_words = set()

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
            
            # Check for duplicates within the markdown files being parsed
            if word in seen_words:
                print(f"Warning: Duplicate word '{word}' found in batch files. Skipping duplicate.")
                continue
            seen_words.add(word)
            
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

            # Validation check
            if len(sentences) != 5:
                print(f"Warning: Word '{word}' has {len(sentences)} sample sentences (expected exactly 5).")

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
            
            # File modification time for fallback
            mtime = os.path.getmtime(file)
            added_date = time.strftime('%Y-%m-%d', time.localtime(mtime))

            all_vocab.append({
                "proposed_id": index,
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

def sync_vocab_to_db(db_path, parsed_items):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    updated_count = 0
    inserted_count = 0
    
    for item in parsed_items:
        word = item["word"]
        
        # Check if word exists
        cursor.execute("SELECT id, type, english_meaning, vietnamese_meaning, sentences, synonyms, antonyms, prompts, source FROM vocabulary WHERE word=?", (word,))
        row = cursor.fetchone()
        
        # Convert parsed items to JSON strings for DB insertion/comparison
        sentences_json = json.dumps(item["sentences"], ensure_ascii=False)
        synonyms_json = json.dumps(item["synonyms"], ensure_ascii=False)
        antonyms_json = json.dumps(item["antonyms"], ensure_ascii=False)
        prompts_json = json.dumps(item["prompts"], ensure_ascii=False)
        
        if row:
            # Word exists, check if details changed
            db_id = row[0]
            if (row[1] != item["type"] or
                row[2] != item["english_meaning"] or
                row[3] != item["vietnamese_meaning"] or
                row[4] != sentences_json or
                row[5] != synonyms_json or
                row[6] != antonyms_json or
                row[7] != prompts_json or
                row[8] != item["source"]):
                
                # Update details but preserve added_date and id
                cursor.execute("""
                    UPDATE vocabulary 
                    SET type=?, english_meaning=?, vietnamese_meaning=?, sentences=?, synonyms=?, antonyms=?, prompts=?, source=?
                    WHERE id=?
                """, (
                    item["type"],
                    item["english_meaning"],
                    item["vietnamese_meaning"],
                    sentences_json,
                    synonyms_json,
                    antonyms_json,
                    prompts_json,
                    item["source"],
                    db_id
                ))
                updated_count += 1
        else:
            # Word is new, check if proposed ID is taken
            proposed_id = item["proposed_id"]
            cursor.execute("SELECT COUNT(*) FROM vocabulary WHERE id=?", (proposed_id,))
            id_taken = cursor.fetchone()[0] > 0
            
            if id_taken:
                # Find the next available ID
                cursor.execute("SELECT MAX(id) FROM vocabulary")
                max_id = cursor.fetchone()[0] or 0
                assigned_id = max_id + 1
                print(f"Warning: Proposed ID {proposed_id} for word '{word}' is already taken. Auto-assigning ID {assigned_id}.")
            else:
                assigned_id = proposed_id
                
            cursor.execute("""
                INSERT INTO vocabulary 
                (id, word, type, english_meaning, vietnamese_meaning, sentences, synonyms, antonyms, prompts, source, added_date)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                assigned_id,
                word,
                item["type"],
                item["english_meaning"],
                item["vietnamese_meaning"],
                sentences_json,
                synonyms_json,
                antonyms_json,
                prompts_json,
                item["source"],
                item["added_date"]
            ))
            inserted_count += 1
            
    conn.commit()
    conn.close()
    if updated_count > 0 or inserted_count > 0:
        print(f"Database sync complete. Inserted {inserted_count} new entries, updated {updated_count} existing entries.")

def export_db_to_js(db_path, js_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    cursor.execute("""
        SELECT id, word, type, english_meaning, vietnamese_meaning, sentences, synonyms, antonyms, prompts, source, added_date 
        FROM vocabulary 
        ORDER BY id ASC
    """)
    rows = cursor.fetchall()
    
    vocab_data = []
    for row in rows:
        vocab_data.append({
            "id": row[0],
            "word": row[1],
            "type": row[2],
            "english_meaning": row[3],
            "vietnamese_meaning": row[4],
            "sentences": json.loads(row[5]),
            "synonyms": json.loads(row[6]),
            "antonyms": json.loads(row[7]),
            "prompts": json.loads(row[8]),
            "source": row[9],
            "added_date": row[10]
        })
        
    conn.close()
    
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(f"const vocabData = {json.dumps(vocab_data, indent=4, ensure_ascii=False)};")
    print(f"Exported {len(vocab_data)} items from database to {js_path}")

if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    lessons_dir = os.path.dirname(current_dir)
    
    db_path = os.path.join(current_dir, "vocabulary.db")
    js_path = os.path.join(current_dir, "vocab_data.js")
    
    # 1. Initialize and bootstrap DB
    init_db(db_path, js_path)
    
    # 2. Parse markdown files
    parsed_items = parse_markdown_files(lessons_dir)
    
    # 3. Sync parsed items to database
    sync_vocab_to_db(db_path, parsed_items)
    
    # 4. Export database to vocab_data.js
    export_db_to_js(db_path, js_path)
