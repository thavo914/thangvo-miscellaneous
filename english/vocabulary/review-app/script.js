document.addEventListener('DOMContentLoaded', () => {
    const vocabGrid = document.getElementById('vocab-list');
    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort-select');
    const btnShowAll = document.getElementById('btn-show-all');
    const btnHideAll = document.getElementById('btn-hide-all');
    const btnShuffle = document.getElementById('btn-shuffle');

    // Make sure vocabData is loaded
    if (typeof vocabData === 'undefined') {
        vocabGrid.innerHTML = '<div style="color: red; grid-column: 1 / -1; text-align: center;">Error: vocab_data.js could not be loaded. Please ensure you have run the python script first.</div>';
        return;
    }

    let currentData = [...vocabData];
    let currentPage = 1;
    const itemsPerPage = 10;
    const paginationContainer = document.getElementById('pagination');

    function renderCards(data) {
        vocabGrid.innerHTML = '';
        
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = data.slice(startIndex, endIndex);

        pageData.forEach((item) => {
            const card = document.createElement('div');
            card.className = 'vocab-card';
            
            // Highlight the word in sentences
            const sentencesHtml = item.sentences.slice(0, 2).map(s => {
                // simple replace with bold, case insensitive
                // We use a regex safely to replace the word if it matches, but since English phrases might conjugate, it's rough. 
                // We'll just display it as is.
                return `<li>${s}</li>`;
            }).join('');
            
            // Build synonyms HTML
            const synonymsHtml = item.synonyms.length > 0 ? 
                `<div class="meaning-section">
                    <div class="meaning-title">Synonyms / Alternatives</div>
                    <div class="synonyms">
                        ${item.synonyms.map(syn => {
                            // Extract just the word part from "**Word** - definition"
                            const cleanSyn = syn.split(/—|–|-/)[0].replace(/\*\*/g, '').trim();
                            return `<span class="synonym-tag">${cleanSyn}</span>`;
                        }).join('')}
                    </div>
                </div>` : '';

            // Build antonyms HTML
            const antonymsHtml = item.antonyms && item.antonyms.length > 0 ? 
                `<div class="meaning-section">
                    <div class="meaning-title">Antonyms / Contrasts</div>
                    <div class="antonyms">
                        ${item.antonyms.map(ant => {
                            // Extract just the word part from "**Word** - definition"
                            const cleanAnt = ant.split(/—|–|-/)[0].replace(/\*\*/g, '').trim();
                            return `<span class="antonym-tag">${cleanAnt}</span>`;
                        }).join('')}
                    </div>
                </div>` : '';

            // Build prompt HTML
            const promptHtml = item.prompts.length > 0 ? 
                `<div class="prompt"><strong>"Your Turn":</strong> ${item.prompts[0]}</div>` : '';

            card.innerHTML = `
                <div class="word-header">
                    <div class="word">${item.id}. ${item.word}</div>
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <div class="type">${item.type}</div>
                        <div style="font-size: 0.75rem; color: var(--text-secondary);">${item.added_date}</div>
                    </div>
                </div>
                <div class="card-content">
                    <div class="meaning-section">
                        <div class="meaning-vi">${item.vietnamese_meaning}</div>
                        <div class="meaning-en">${item.english_meaning}</div>
                    </div>
                    ${synonymsHtml}
                    ${antonymsHtml}
                    ${item.sentences.length > 0 ? `
                    <div class="meaning-section">
                        <div class="meaning-title">Examples</div>
                        <ul class="sentences-list">
                            ${sentencesHtml}
                        </ul>
                    </div>
                    ` : ''}
                    ${promptHtml}
                </div>
            `;

            card.addEventListener('click', () => {
                const content = card.querySelector('.card-content');
                content.classList.toggle('show');
            });

            vocabGrid.appendChild(card);
        });

        renderPagination(data.length);
    }

    function renderPagination(totalItems) {
        if (!paginationContainer) return;
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        
        if (totalPages <= 1) return;

        // Prev button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'page-btn';
        prevBtn.innerText = '«';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderCards(currentData);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
        paginationContainer.appendChild(prevBtn);

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
            pageBtn.innerText = i;
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                renderCards(currentData);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            paginationContainer.appendChild(pageBtn);
        }

        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'page-btn';
        nextBtn.innerText = '»';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderCards(currentData);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
        paginationContainer.appendChild(nextBtn);
    }

    // Initial render
    renderCards(currentData);

    // Search functionality
    function applyFilters() {
        let filtered = [...vocabData];
        
        // Search
        const query = searchInput.value.toLowerCase();
        if (query) {
            filtered = filtered.filter(item => 
                item.word.toLowerCase().includes(query) || 
                item.vietnamese_meaning.toLowerCase().includes(query) ||
                item.english_meaning.toLowerCase().includes(query)
            );
        }

        // Sort
        const sortValue = sortSelect.value;
        if (sortValue === 'newest') {
            filtered.sort((a, b) => new Date(b.added_date) - new Date(a.added_date));
        } else if (sortValue === 'oldest') {
            filtered.sort((a, b) => new Date(a.added_date) - new Date(b.added_date));
        } else {
            // default ID sort
            filtered.sort((a, b) => a.id - b.id);
        }

        currentData = filtered;
        currentPage = 1;
        renderCards(currentData);
    }

    searchInput.addEventListener('input', applyFilters);
    sortSelect.addEventListener('change', applyFilters);

    // Control buttons
    btnShowAll.addEventListener('click', () => {
        document.querySelectorAll('.card-content').forEach(c => c.classList.add('show'));
    });

    btnHideAll.addEventListener('click', () => {
        document.querySelectorAll('.card-content').forEach(c => c.classList.remove('show'));
    });

    btnShuffle.addEventListener('click', () => {
        currentData = [...currentData].sort(() => Math.random() - 0.5);
        currentPage = 1;
        renderCards(currentData);
        searchInput.value = ''; // Reset search on shuffle
        sortSelect.value = 'default'; // Reset sort
    });
});
