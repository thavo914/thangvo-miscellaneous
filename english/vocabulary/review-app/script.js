// Study & Training Hub - Interactive Vocabulary and Live Markdown Reader

// Global helper for copying code block snippets
window.copySnippet = function(button) {
    const wrapper = button.closest('.code-block-wrapper');
    if (!wrapper) return;
    const code = wrapper.querySelector('code');
    if (!code) return;
    navigator.clipboard.writeText(code.innerText).then(() => {
        const origText = button.innerText;
        button.innerText = 'Copied!';
        button.style.color = '#34d399';
        setTimeout(() => {
            button.innerText = origText;
            button.style.color = '';
        }, 2000);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    // =========================================================================
    // 1. Toast Notification Helper
    // =========================================================================
    const toastEl = document.getElementById('app-toast');
    let toastTimeout = null;
    function showToast(message) {
        if (!toastEl) return;
        toastEl.textContent = message;
        toastEl.classList.add('show');
        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toastEl.classList.remove('show');
        }, 2600);
    }

    // =========================================================================
    // 2. View Switching (Reader vs Editor vs Vocab vs Running Report)
    // =========================================================================
    const tabBtnReader = document.getElementById('tab-btn-reader');
    const tabBtnEditor = document.getElementById('tab-btn-editor');
    const tabBtnVocab = document.getElementById('tab-btn-vocab');
    const tabBtnRunning = document.getElementById('tab-btn-running');

    const viewReader = document.getElementById('view-reader');
    const viewEditor = document.getElementById('view-editor');
    const viewVocab = document.getElementById('view-vocabulary');
    const viewRunning = document.getElementById('view-running');

    const btnQuickSwitchReader = document.getElementById('btn-quick-switch-reader');
    const btnJumpMafDocs = document.getElementById('btn-jump-maf-docs');

    function switchView(viewName) {
        // Deactivate all
        [tabBtnReader, tabBtnEditor, tabBtnVocab, tabBtnRunning].forEach(btn => btn?.classList.remove('active'));
        [viewReader, viewEditor, viewVocab, viewRunning].forEach(view => view?.classList.remove('active'));

        if (viewName === 'vocab') {
            tabBtnVocab?.classList.add('active');
            viewVocab?.classList.add('active');
            window.location.hash = 'vocab';
        } else if (viewName === 'running') {
            tabBtnRunning?.classList.add('active');
            viewRunning?.classList.add('active');
            window.location.hash = 'running';
        } else if (viewName === 'editor') {
            tabBtnEditor?.classList.add('active');
            viewEditor?.classList.add('active');
            if (activeDocPath && (!currentEditorPath || currentEditorPath !== activeDocPath)) {
                loadDocIntoEditor(activeDocPath);
            } else if (!currentEditorPath && allDocuments.length > 0) {
                loadDocIntoEditor(allDocuments[0].path);
            }
            window.location.hash = currentEditorPath ? `editor=${encodeURIComponent(currentEditorPath)}` : 'editor';
        } else {
            // Default to reader
            tabBtnReader?.classList.add('active');
            viewReader?.classList.add('active');
            if (activeDocPath) {
                window.location.hash = `doc=${encodeURIComponent(activeDocPath)}`;
            } else {
                window.location.hash = 'reader';
            }
        }
    }

    tabBtnReader?.addEventListener('click', () => switchView('reader'));
    tabBtnEditor?.addEventListener('click', () => switchView('editor'));
    tabBtnVocab?.addEventListener('click', () => switchView('vocab'));
    tabBtnRunning?.addEventListener('click', () => switchView('running'));
    btnQuickSwitchReader?.addEventListener('click', () => switchView('reader'));
    btnJumpMafDocs?.addEventListener('click', () => {
        switchView('reader');
        // Filter to running docs and pick plan overview
        filterDocsByCategory('running');
        loadDocument('running/maf-plan/plan-overview.md');
    });

    // =========================================================================
    // 3. VOCABULARY FLASHCARDS ENGINE (Preserved & Enhanced with Windowed Pagination)
    // =========================================================================
    const vocabGrid = document.getElementById('vocab-list');
    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort-select');
    const btnShowAll = document.getElementById('btn-show-all');
    const btnHideAll = document.getElementById('btn-hide-all');
    const btnShuffle = document.getElementById('btn-shuffle');
    const paginationContainer = document.getElementById('pagination');

    let currentVocabData = (typeof vocabData !== 'undefined') ? [...vocabData] : [];
    let currentVocabPage = 1;
    const itemsPerPage = 12;

    function renderVocabCards(data) {
        if (!vocabGrid) return;
        vocabGrid.innerHTML = '';

        if (!data || data.length === 0) {
            vocabGrid.innerHTML = '<div style="color: var(--text-secondary); grid-column: 1 / -1; text-align: center; padding: 3rem;">No vocabulary terms matched your search.</div>';
            renderSmartPagination(0);
            return;
        }

        const startIndex = (currentVocabPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = data.slice(startIndex, endIndex);

        pageData.forEach((item) => {
            const card = document.createElement('div');
            card.className = 'vocab-card';

            const sentencesHtml = item.sentences && item.sentences.length > 0 ? 
                item.sentences.slice(0, 2).map(s => `<li>${s}</li>`).join('') : '';

            const synonymsHtml = (item.synonyms && item.synonyms.length > 0) ? 
                `<div class="meaning-section">
                    <div class="meaning-title">Synonyms / Alternatives</div>
                    <div class="synonyms">
                        ${item.synonyms.map(syn => {
                            const cleanSyn = syn.split(/—|–|-/)[0].replace(/\*\*/g, '').trim();
                            return `<span class="synonym-tag">${cleanSyn}</span>`;
                        }).join('')}
                    </div>
                </div>` : '';

            const antonymsHtml = (item.antonyms && item.antonyms.length > 0) ? 
                `<div class="meaning-section">
                    <div class="meaning-title">Antonyms / Contrasts</div>
                    <div class="antonyms">
                        ${item.antonyms.map(ant => {
                            const cleanAnt = ant.split(/—|–|-/)[0].replace(/\*\*/g, '').trim();
                            return `<span class="antonym-tag">${cleanAnt}</span>`;
                        }).join('')}
                    </div>
                </div>` : '';

            const promptHtml = (item.prompts && item.prompts.length > 0) ? 
                `<div class="prompt"><strong>"Your Turn":</strong> ${item.prompts[0]}</div>` : '';

            card.innerHTML = `
                <div class="word-header">
                    <div class="word">${item.id}. ${item.word}</div>
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <div class="type">${item.type || 'term'}</div>
                        <div style="font-size: 0.72rem; color: var(--text-secondary);">${item.added_date || ''}</div>
                    </div>
                </div>
                <div class="card-content">
                    <div class="meaning-section">
                        <div class="meaning-vi">${item.vietnamese_meaning || ''}</div>
                        <div class="meaning-en">${item.english_meaning || ''}</div>
                    </div>
                    ${synonymsHtml}
                    ${antonymsHtml}
                    ${sentencesHtml ? `
                    <div class="meaning-section">
                        <div class="meaning-title">Examples</div>
                        <ul class="sentences-list">
                            ${sentencesHtml}
                        </ul>
                    </div>` : ''}
                    ${promptHtml}
                </div>
            `;

            card.addEventListener('click', () => {
                const content = card.querySelector('.card-content');
                content?.classList.toggle('show');
            });

            vocabGrid.appendChild(card);
        });

        renderSmartPagination(data.length);
    }

    function renderSmartPagination(totalItems) {
        if (!paginationContainer) return;
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        if (totalPages <= 1) return;

        // Prev Button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'page-btn';
        prevBtn.innerText = '«';
        prevBtn.disabled = currentVocabPage === 1;
        prevBtn.title = 'Previous Page';
        prevBtn.addEventListener('click', () => {
            if (currentVocabPage > 1) {
                currentVocabPage--;
                renderVocabCards(currentVocabData);
                document.querySelector('.vocab-header')?.scrollIntoView({ behavior: 'smooth' });
            }
        });
        paginationContainer.appendChild(prevBtn);

        // Smart windowed page numbers
        const visiblePages = new Set();
        visiblePages.add(1);
        visiblePages.add(totalPages);
        for (let i = Math.max(1, currentVocabPage - 2); i <= Math.min(totalPages, currentVocabPage + 2); i++) {
            visiblePages.add(i);
        }

        const sortedPages = Array.from(visiblePages).sort((a, b) => a - b);
        let prevNum = 0;

        sortedPages.forEach(pageNum => {
            if (prevNum && pageNum - prevNum > 1) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'pagination-ellipsis';
                ellipsis.innerText = '…';
                paginationContainer.appendChild(ellipsis);
            }

            const pageBtn = document.createElement('button');
            pageBtn.className = `page-btn ${pageNum === currentVocabPage ? 'active' : ''}`;
            pageBtn.innerText = pageNum;
            pageBtn.addEventListener('click', () => {
                currentVocabPage = pageNum;
                renderVocabCards(currentVocabData);
                document.querySelector('.vocab-header')?.scrollIntoView({ behavior: 'smooth' });
            });
            paginationContainer.appendChild(pageBtn);
            prevNum = pageNum;
        });

        // Next Button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'page-btn';
        nextBtn.innerText = '»';
        nextBtn.disabled = currentVocabPage === totalPages;
        nextBtn.title = 'Next Page';
        nextBtn.addEventListener('click', () => {
            if (currentVocabPage < totalPages) {
                currentVocabPage++;
                renderVocabCards(currentVocabData);
                document.querySelector('.vocab-header')?.scrollIntoView({ behavior: 'smooth' });
            }
        });
        paginationContainer.appendChild(nextBtn);
    }

    function applyVocabFilters() {
        if (!vocabData) return;
        let filtered = [...vocabData];
        const query = searchInput?.value.toLowerCase().trim() || '';
        if (query) {
            filtered = filtered.filter(item => 
                (item.word && item.word.toLowerCase().includes(query)) || 
                (item.vietnamese_meaning && item.vietnamese_meaning.toLowerCase().includes(query)) ||
                (item.english_meaning && item.english_meaning.toLowerCase().includes(query))
            );
        }

        const sortValue = sortSelect?.value || 'default';
        if (sortValue === 'newest') {
            filtered.sort((a, b) => new Date(b.added_date) - new Date(a.added_date));
        } else if (sortValue === 'oldest') {
            filtered.sort((a, b) => new Date(a.added_date) - new Date(b.added_date));
        } else {
            filtered.sort((a, b) => a.id - b.id);
        }

        currentVocabData = filtered;
        currentVocabPage = 1;
        renderVocabCards(currentVocabData);
    }

    searchInput?.addEventListener('input', applyVocabFilters);
    sortSelect?.addEventListener('change', applyVocabFilters);

    btnShowAll?.addEventListener('click', () => {
        document.querySelectorAll('.vocab-card .card-content').forEach(c => c.classList.add('show'));
    });

    btnHideAll?.addEventListener('click', () => {
        document.querySelectorAll('.vocab-card .card-content').forEach(c => c.classList.remove('show'));
    });

    btnShuffle?.addEventListener('click', () => {
        currentVocabData = [...currentVocabData].sort(() => Math.random() - 0.5);
        currentVocabPage = 1;
        renderVocabCards(currentVocabData);
        if (searchInput) searchInput.value = '';
        if (sortSelect) sortSelect.value = 'default';
        showToast('Shuffled flashcards');
    });

    if (currentVocabData.length > 0) {
        renderVocabCards(currentVocabData);
    }

    // =========================================================================
    // 4. LIVE MARKDOWN READER & STUDY ENGINE
    // =========================================================================
    let allDocuments = [];
    let filteredDocuments = [];
    let activeDocPath = null;
    let activeRawMarkdown = '';
    let currentCategoryFilter = 'all';

    // LocalStorage reviewed docs set
    const STORAGE_KEY_REVIEWED = 'study_hub_reviewed_docs';
    let reviewedDocs = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY_REVIEWED) || '[]'));

    // DOM Elements for Reader
    const docListContainer = document.getElementById('doc-list-container');
    const docSearchInput = document.getElementById('doc-search-input');
    const btnClearDocSearch = document.getElementById('btn-clear-doc-search');
    const categoryPills = document.querySelectorAll('#category-pills .pill');
    const readProgressLabel = document.getElementById('read-progress-label');
    const readProgressBar = document.getElementById('read-progress-bar');

    const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');
    const readerSidebar = document.getElementById('reader-sidebar');

    const docBreadcrumbs = document.getElementById('doc-breadcrumbs');
    const docMainTitle = document.getElementById('doc-main-title');
    const docMetaFilepath = document.getElementById('doc-meta-filepath');
    const docMetaBadge = document.getElementById('doc-meta-badge');
    const docMetaReadingTime = document.getElementById('doc-meta-reading-time');
    const docMetaWordCount = document.getElementById('doc-meta-word-count');
    const docRenderedBody = document.getElementById('doc-rendered-body');
    const docRawBody = document.getElementById('doc-raw-body');
    const tocList = document.getElementById('toc-list');

    const btnToggleMarkDone = document.getElementById('btn-toggle-mark-done');
    const markDoneText = document.getElementById('mark-done-text');
    const btnCopyDocMarkdown = document.getElementById('btn-copy-doc-markdown');
    const btnToggleRaw = document.getElementById('btn-toggle-raw');

    const btnNavPrevDoc = document.getElementById('btn-nav-prev-doc');
    const btnNavNextDoc = document.getElementById('btn-nav-next-doc');
    const navPrevLabel = document.getElementById('nav-prev-label');
    const navNextLabel = document.getElementById('nav-next-label');

    const btnFontSmaller = document.getElementById('btn-font-smaller');
    const btnFontReset = document.getElementById('btn-font-reset');
    const btnFontLarger = document.getElementById('btn-font-larger');
    let currentFontSize = 1.05;

    // Font size controls
    btnFontSmaller?.addEventListener('click', () => {
        currentFontSize = Math.max(0.85, currentFontSize - 0.1);
        applyFontSize();
    });
    btnFontReset?.addEventListener('click', () => {
        currentFontSize = 1.05;
        applyFontSize();
    });
    btnFontLarger?.addEventListener('click', () => {
        currentFontSize = Math.min(1.4, currentFontSize + 0.1);
        applyFontSize();
    });

    function applyFontSize() {
        const article = document.getElementById('doc-article');
        if (article) article.style.fontSize = `${currentFontSize}rem`;
        if (btnFontReset) btnFontReset.innerText = `${Math.round((currentFontSize / 1.05) * 100)}%`;
    }

    // Toggle Mobile Sidebar
    btnToggleSidebar?.addEventListener('click', () => {
        readerSidebar?.classList.toggle('open');
    });

    // Toggle Raw / Rendered
    let isRawMode = false;
    btnToggleRaw?.addEventListener('click', () => {
        isRawMode = !isRawMode;
        if (isRawMode) {
            docRenderedBody.style.display = 'none';
            docRawBody.style.display = 'block';
            btnToggleRaw.querySelector('span').innerText = 'View Rendered';
        } else {
            docRenderedBody.style.display = 'block';
            docRawBody.style.display = 'none';
            btnToggleRaw.querySelector('span').innerText = 'View Raw';
        }
    });

    // Copy Markdown
    btnCopyDocMarkdown?.addEventListener('click', () => {
        if (!activeRawMarkdown) return;
        navigator.clipboard.writeText(activeRawMarkdown).then(() => {
            showToast('Full Markdown copied to clipboard');
        });
    });

    // Toggle Mark Done
    btnToggleMarkDone?.addEventListener('click', () => {
        if (!activeDocPath) return;
        if (reviewedDocs.has(activeDocPath)) {
            reviewedDocs.delete(activeDocPath);
        } else {
            reviewedDocs.add(activeDocPath);
        }
        localStorage.setItem(STORAGE_KEY_REVIEWED, JSON.stringify(Array.from(reviewedDocs)));
        updateReviewStateUI();
        updateProgressUI();
    });

    function updateReviewStateUI() {
        const isReviewed = activeDocPath && reviewedDocs.has(activeDocPath);
        if (isReviewed) {
            btnToggleMarkDone?.classList.add('completed');
            if (markDoneText) markDoneText.innerText = 'Reviewed ✓';
        } else {
            btnToggleMarkDone?.classList.remove('completed');
            if (markDoneText) markDoneText.innerText = 'Mark Reviewed';
        }

        // Update list items
        document.querySelectorAll('.doc-item-link').forEach(link => {
            const path = link.getAttribute('data-path');
            if (reviewedDocs.has(path)) {
                link.classList.add('reviewed');
            } else {
                link.classList.remove('reviewed');
            }
        });
    }

    function updateProgressUI() {
        const total = allDocuments.length;
        const count = reviewedDocs.size;
        if (readProgressLabel) {
            readProgressLabel.innerText = `Reviewed: ${count} / ${total}`;
        }
        if (readProgressBar) {
            const pct = total > 0 ? Math.round((count / total) * 100) : 0;
            readProgressBar.style.width = `${pct}%`;
        }
    }

    // Category Filter Pills
    categoryPills.forEach(pill => {
        pill.addEventListener('click', () => {
            categoryPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentCategoryFilter = pill.getAttribute('data-category') || 'all';
            filterAndRenderDocTree();
        });
    });

    function filterDocsByCategory(cat) {
        currentCategoryFilter = cat;
        categoryPills.forEach(p => {
            if (p.getAttribute('data-category') === cat) p.classList.add('active');
            else p.classList.remove('active');
        });
        filterAndRenderDocTree();
    }

    // Search Input in Reader
    docSearchInput?.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (btnClearDocSearch) {
            btnClearDocSearch.style.display = query.length > 0 ? 'block' : 'none';
        }
        filterAndRenderDocTree();
    });

    btnClearDocSearch?.addEventListener('click', () => {
        if (docSearchInput) docSearchInput.value = '';
        btnClearDocSearch.style.display = 'none';
        filterAndRenderDocTree();
    });

    // Fetch All Documents
    async function loadDocumentsList() {
        try {
            const res = await fetch('/api/documents');
            const data = await res.json();
            if (data.success && Array.isArray(data.documents)) {
                allDocuments = data.documents;
                updateProgressUI();
                filterAndRenderDocTree();

                // Check URL hash or load default
                const hash = window.location.hash;
                if (hash.startsWith('#doc=')) {
                    const docPath = decodeURIComponent(hash.replace('#doc=', ''));
                    loadDocument(docPath);
                } else if (hash.startsWith('#editor=')) {
                    const docPath = decodeURIComponent(hash.replace('#editor=', ''));
                    switchView('editor');
                    loadDocIntoEditor(docPath);
                } else if (hash === '#editor') {
                    switchView('editor');
                    if (allDocuments.length > 0) {
                        loadDocIntoEditor(allDocuments[0].path);
                    }
                } else if (hash === '#vocab') {
                    switchView('vocab');
                } else if (hash === '#running') {
                    switchView('running');
                } else {
                    // Default first document: Week 9 Day 1
                    const initialDoc = allDocuments.find(d => d.path.includes('week-9') && d.badge === 'Day 1') || allDocuments[0];
                    if (initialDoc) {
                        loadDocument(initialDoc.path);
                    }
                }

                // Populate file editor selector dropdown
                populateEditorFileSelector();
            } else {
                if (docListContainer) docListContainer.innerHTML = '<div style="color: #f87171; padding: 1rem;">Failed to load documents list.</div>';
            }
        } catch (err) {
            console.error('Error fetching documents list:', err);
            if (docListContainer) docListContainer.innerHTML = '<div style="color: #f87171; padding: 1rem;">Error connecting to server.</div>';
        }
    }

    function filterAndRenderDocTree() {
        if (!docListContainer) return;

        const query = docSearchInput?.value.toLowerCase().trim() || '';

        filteredDocuments = allDocuments.filter(doc => {
            // Category check
            if (currentCategoryFilter === 'curriculum' && doc.category !== 'Weekly Curriculum') return false;
            if (currentCategoryFilter === 'youtube' && doc.category !== 'YouTube Lessons') return false;
            if (currentCategoryFilter === 'techniques' && doc.category !== 'Practices & Techniques') return false;
            if (currentCategoryFilter === 'running' && doc.category !== 'Running & MAF Training') return false;

            // Search query check
            if (query) {
                const matchTitle = doc.title.toLowerCase().includes(query);
                const matchPath = doc.path.toLowerCase().includes(query);
                const matchSub = doc.subcategory.toLowerCase().includes(query);
                return matchTitle || matchPath || matchSub;
            }
            return true;
        });

        if (filteredDocuments.length === 0) {
            docListContainer.innerHTML = '<div style="color: var(--text-muted); font-size: 0.85rem; padding: 2rem 1rem; text-align: center;">No lessons found matching filter.</div>';
            return;
        }

        // Group by category then subcategory
        const tree = {};
        filteredDocuments.forEach(doc => {
            if (!tree[doc.category]) tree[doc.category] = {};
            if (!tree[doc.category][doc.subcategory]) tree[doc.category][doc.subcategory] = [];
            tree[doc.category][doc.subcategory].push(doc);
        });

        let html = '';

        for (const [catName, subcats] of Object.entries(tree)) {
            html += `<div class="tree-category">
                <div class="tree-category-title">${catName}</div>`;

            for (const [subName, docs] of Object.entries(subcats)) {
                // If searching, keep groups expanded by default
                const isExpanded = query.length > 0 || (activeDocPath && docs.some(d => d.path === activeDocPath)) || subName === 'Week 9' || subName === 'Week 10';

                html += `
                    <div class="tree-group ${isExpanded ? 'expanded' : ''}" data-group="${subName}">
                        <button type="button" class="tree-group-header">
                            <span class="group-title">
                                <span class="group-chevron">▶</span>
                                <span>${subName}</span>
                            </span>
                            <span class="doc-item-badge">${docs.length}</span>
                        </button>
                        <div class="tree-group-items">
                            ${docs.map(doc => {
                                const isActive = doc.path === activeDocPath;
                                const isRev = reviewedDocs.has(doc.path);
                                return `
                                    <a class="doc-item-link ${isActive ? 'active' : ''} ${isRev ? 'reviewed' : ''}" data-path="${doc.path}" href="#doc=${encodeURIComponent(doc.path)}">
                                        <div class="doc-item-left">
                                            <span class="doc-status-indicator"></span>
                                            <span class="doc-item-title">${doc.title}</span>
                                        </div>
                                        <span class="doc-item-badge">${doc.badge || doc.readingTime + 'm'}</span>
                                    </a>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `;
            }

            html += `</div>`;
        }

        docListContainer.innerHTML = html;

        // Group accordions toggle
        docListContainer.querySelectorAll('.tree-group-header').forEach(header => {
            header.addEventListener('click', (e) => {
                e.stopPropagation();
                header.closest('.tree-group')?.classList.toggle('expanded');
            });
        });

        // Doc links click
        docListContainer.querySelectorAll('.doc-item-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const path = link.getAttribute('data-path');
                loadDocument(path);
                // Close mobile sidebar
                if (window.innerWidth <= 860) {
                    readerSidebar?.classList.remove('open');
                }
            });
        });
    }

    // Load Single Document from Server
    async function loadDocument(docPath) {
        if (!docPath) return;
        activeDocPath = docPath;
        window.location.hash = `doc=${encodeURIComponent(docPath)}`;

        // Highlight active link in sidebar
        document.querySelectorAll('.doc-item-link').forEach(link => {
            if (link.getAttribute('data-path') === docPath) {
                link.classList.add('active');
                // Ensure parent group is expanded
                link.closest('.tree-group')?.classList.add('expanded');
                link.scrollIntoView({ block: 'nearest' });
            } else {
                link.classList.remove('active');
            }
        });

        // Show loading in main reader
        if (docRenderedBody) {
            docRenderedBody.innerHTML = '<div class="loading-doc-spinner" style="padding: 3rem 0; color: var(--text-muted); text-align: center;">Loading lesson...</div>';
        }

        try {
            const res = await fetch(`/api/document?path=${encodeURIComponent(docPath)}`);
            const data = await res.json();

            if (data.success) {
                activeRawMarkdown = data.rawMarkdown || '';

                // Header & Badges
                if (docMainTitle) docMainTitle.innerText = data.title;
                if (docMetaFilepath) docMetaFilepath.innerText = data.path;
                if (docMetaBadge) docMetaBadge.innerText = data.badge || data.category;
                if (docMetaReadingTime) docMetaReadingTime.innerText = `⏱️ ${data.readingTime} min read`;
                if (docMetaWordCount) docMetaWordCount.innerText = `📝 ${data.wordCount.toLocaleString()} words`;

                // Breadcrumbs
                if (docBreadcrumbs) {
                    docBreadcrumbs.innerHTML = `
                        <span class="crumb-cat">${data.category}</span>
                        <span class="crumb-sep">/</span>
                        <span class="crumb-sub">${data.subcategory}</span>
                        <span class="crumb-sep">/</span>
                        <span class="crumb-title">${data.title}</span>
                    `;
                }

                // Rendered HTML
                if (docRenderedBody) {
                    docRenderedBody.innerHTML = data.html;
                }
                if (docRawBody) {
                    docRawBody.textContent = data.rawMarkdown;
                }

                // Populate Table of Contents
                renderTOC(data.headings || []);

                // Update Sequential Previous / Next Links
                updateSequentialNav(docPath);

                // Update reviewed state
                updateReviewStateUI();

                // Scroll reader area to top
                document.querySelector('.reader-scroll-area')?.scrollTo({ top: 0, behavior: 'smooth' });

            } else {
                if (docRenderedBody) {
                    docRenderedBody.innerHTML = `<div style="color: #f87171; padding: 2rem;">Failed to load document: ${data.error}</div>`;
                }
            }
        } catch (err) {
            console.error('Error loading document:', err);
            if (docRenderedBody) {
                docRenderedBody.innerHTML = `<div style="color: #f87171; padding: 2rem;">Error connecting to server.</div>`;
            }
        }
    }

    // Render Table of Contents
    function renderTOC(headings) {
        if (!tocList) return;
        if (!headings || headings.length <= 1) {
            tocList.innerHTML = '<li style="color: var(--text-muted); font-size: 0.78rem;">Overview</li>';
            return;
        }

        tocList.innerHTML = headings.map(h => {
            return `
                <li>
                    <a href="#${h.id}" class="toc-link toc-depth-${h.depth}">
                        ${h.text}
                    </a>
                </li>
            `;
        }).join('');

        // Smooth scroll for TOC links
        tocList.querySelectorAll('.toc-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').replace('#', '');
                const targetEl = document.getElementById(targetId);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // Previous / Next Nav
    function updateSequentialNav(currentPath) {
        const index = allDocuments.findIndex(d => d.path === currentPath);
        if (index === -1) return;

        // Previous
        if (index > 0) {
            const prevDoc = allDocuments[index - 1];
            btnNavPrevDoc.disabled = false;
            navPrevLabel.innerText = prevDoc.title;
            btnNavPrevDoc.onclick = () => loadDocument(prevDoc.path);
        } else {
            btnNavPrevDoc.disabled = true;
            navPrevLabel.innerText = 'Start of Curriculum';
            btnNavPrevDoc.onclick = null;
        }

        // Next
        if (index < allDocuments.length - 1) {
            const nextDoc = allDocuments[index + 1];
            btnNavNextDoc.disabled = false;
            navNextLabel.innerText = nextDoc.title;
            btnNavNextDoc.onclick = () => loadDocument(nextDoc.path);
        } else {
            btnNavNextDoc.disabled = true;
            navNextLabel.innerText = 'End of Curriculum';
            btnNavNextDoc.onclick = null;
        }
    }

    // =========================================================================
    // 5. MARKDOWN FILE EDITOR MODULE
    // =========================================================================
    const btnEditCurrentDoc = document.getElementById('btn-edit-current-doc');
    const btnCreateNewDoc = document.getElementById('btn-create-new-doc');

    const editorFileSelector = document.getElementById('editor-file-selector');
    const editorDirtyIndicator = document.getElementById('editor-dirty-indicator');
    const editorStats = document.getElementById('editor-stats');
    const markdownEditorTextarea = document.getElementById('markdown-editor-textarea');
    const editorLivePreview = document.getElementById('editor-live-preview');
    const previewUpdateIndicator = document.getElementById('preview-update-indicator');

    const btnModeSplit = document.getElementById('btn-mode-split');
    const btnModeEditor = document.getElementById('btn-mode-editor');
    const btnModePreview = document.getElementById('btn-mode-preview');
    const editorWorkspace = document.getElementById('editor-workspace');

    const btnEditorNew = document.getElementById('btn-editor-new');
    const btnEditorRevert = document.getElementById('btn-editor-revert');
    const btnEditorSave = document.getElementById('btn-editor-save');
    const btnEditorSaveAndView = document.getElementById('btn-editor-save-and-view');

    // Callout dropdown elements
    const btnCalloutMenu = document.getElementById('btn-callout-menu');
    const calloutMenu = document.getElementById('callout-menu');

    // Modal elements for creating new file
    const modalNewFile = document.getElementById('modal-new-file');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const btnCancelNewFile = document.getElementById('btn-cancel-new-file');
    const btnSubmitNewFile = document.getElementById('btn-submit-new-file');
    const newDocFolder = document.getElementById('new-doc-folder');
    const customFolderRow = document.getElementById('custom-folder-row');
    const customFolderInput = document.getElementById('custom-folder-input');
    const newDocFilename = document.getElementById('new-doc-filename');
    const newDocTemplate = document.getElementById('new-doc-template');

    let currentEditorPath = null;
    let originalEditorContent = '';
    let isEditorDirty = false;
    let previewDebounceTimer = null;

    // Populate the dropdown selector in the editor toolbar
    function populateEditorFileSelector() {
        if (!editorFileSelector) return;
        const categories = {};
        allDocuments.forEach(doc => {
            if (!categories[doc.category]) categories[doc.category] = [];
            categories[doc.category].push(doc);
        });

        let html = '';
        for (const [catName, docs] of Object.entries(categories)) {
            html += `<optgroup label="${catName}">`;
            docs.forEach(d => {
                html += `<option value="${d.path}">${d.title} (${d.path})</option>`;
            });
            html += `</optgroup>`;
        }
        editorFileSelector.innerHTML = html;
        if (currentEditorPath) {
            editorFileSelector.value = currentEditorPath;
        }
    }

    editorFileSelector?.addEventListener('change', (e) => {
        const selected = e.target.value;
        if (selected) {
            loadDocIntoEditor(selected);
        }
    });

    // Update dirty indicator badge and revert button
    function markEditorDirty(dirty) {
        isEditorDirty = dirty;
        if (!editorDirtyIndicator) return;
        if (dirty) {
            editorDirtyIndicator.className = 'dirty-badge dirty';
            editorDirtyIndicator.textContent = '● Unsaved';
            if (btnEditorRevert) btnEditorRevert.disabled = false;
        } else {
            editorDirtyIndicator.className = 'dirty-badge clean';
            editorDirtyIndicator.textContent = '✓ Saved';
            if (btnEditorRevert) btnEditorRevert.disabled = true;
        }
    }

    // Schedule live preview update via server API
    function scheduleLivePreview(markdown) {
        if (previewUpdateIndicator) {
            previewUpdateIndicator.textContent = 'Rendering...';
            previewUpdateIndicator.style.color = '#f59e0b';
        }
        if (previewDebounceTimer) clearTimeout(previewDebounceTimer);
        previewDebounceTimer = setTimeout(async () => {
            try {
                const res = await fetch('/api/document/preview', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ markdown })
                });
                const data = await res.json();
                if (data.success && editorLivePreview) {
                    editorLivePreview.innerHTML = data.html;
                }
            } catch (e) {
                console.error('Preview error:', e);
            } finally {
                if (previewUpdateIndicator) {
                    previewUpdateIndicator.textContent = 'Live';
                    previewUpdateIndicator.style.color = '#10b981';
                }
            }
        }, 220);
    }

    // Handle text input changes
    function onEditorInput() {
        if (!markdownEditorTextarea) return;
        const val = markdownEditorTextarea.value;
        const dirty = val !== originalEditorContent;
        markEditorDirty(dirty);

        const words = val.trim() ? val.trim().split(/\s+/).length : 0;
        const chars = val.length;
        if (editorStats) {
            editorStats.textContent = `${words.toLocaleString()} words • ${chars.toLocaleString()} chars`;
        }

        scheduleLivePreview(val);
    }

    markdownEditorTextarea?.addEventListener('input', onEditorInput);

    // Tab indentation & Ctrl+S shortcut inside textarea
    markdownEditorTextarea?.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = markdownEditorTextarea.selectionStart;
            const end = markdownEditorTextarea.selectionEnd;
            const value = markdownEditorTextarea.value;
            markdownEditorTextarea.value = value.substring(0, start) + '  ' + value.substring(end);
            markdownEditorTextarea.selectionStart = markdownEditorTextarea.selectionEnd = start + 2;
            onEditorInput();
        } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
            e.preventDefault();
            saveCurrentFile(false);
        }
    });

    // Load Document into Editor
    async function loadDocIntoEditor(docPath) {
        if (!docPath) return;

        if (isEditorDirty && currentEditorPath && currentEditorPath !== docPath) {
            const confirmDiscard = confirm('You have unsaved changes in the current file. Discard them and open the new file?');
            if (!confirmDiscard) {
                if (editorFileSelector) editorFileSelector.value = currentEditorPath;
                return;
            }
        }

        currentEditorPath = docPath;
        if (editorFileSelector) editorFileSelector.value = docPath;

        if (markdownEditorTextarea) {
            markdownEditorTextarea.disabled = true;
            markdownEditorTextarea.placeholder = 'Loading document...';
        }

        try {
            const res = await fetch(`/api/document?path=${encodeURIComponent(docPath)}`);
            const data = await res.json();

            if (data.success) {
                const content = data.rawMarkdown || '';
                originalEditorContent = content;
                if (markdownEditorTextarea) {
                    markdownEditorTextarea.value = content;
                    markdownEditorTextarea.disabled = false;
                }
                markEditorDirty(false);

                const words = content.trim() ? content.trim().split(/\s+/).length : 0;
                const chars = content.length;
                if (editorStats) {
                    editorStats.textContent = `${words.toLocaleString()} words • ${chars.toLocaleString()} chars`;
                }

                if (editorLivePreview) {
                    editorLivePreview.innerHTML = data.html;
                }
                window.location.hash = `editor=${encodeURIComponent(docPath)}`;
            } else {
                showToast(`Failed to load file: ${data.error}`);
            }
        } catch (err) {
            console.error('Error loading file into editor:', err);
            showToast('Error connecting to server');
        } finally {
            if (markdownEditorTextarea) {
                markdownEditorTextarea.disabled = false;
            }
        }
    }

    // Save current file to server
    async function saveCurrentFile(andSwitchToReader = false) {
        if (!currentEditorPath) {
            showToast('No file selected to save');
            return;
        }

        if (!markdownEditorTextarea) return;
        const content = markdownEditorTextarea.value;
        if (btnEditorSave) btnEditorSave.disabled = true;

        try {
            const res = await fetch('/api/document/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    path: currentEditorPath,
                    content
                })
            });
            const data = await res.json();

            if (data.success) {
                originalEditorContent = content;
                markEditorDirty(false);
                showToast(`Saved successfully: ${data.fileName || currentEditorPath}`);

                // Update document cache in memory
                const docIdx = allDocuments.findIndex(d => d.path === currentEditorPath);
                if (docIdx !== -1) {
                    allDocuments[docIdx] = {
                        ...allDocuments[docIdx],
                        title: data.title,
                        wordCount: data.wordCount,
                        readingTime: data.readingTime,
                        badge: data.badge
                    };
                    filterAndRenderDocTree();
                }

                if (andSwitchToReader) {
                    switchView('reader');
                    loadDocument(currentEditorPath);
                } else if (activeDocPath === currentEditorPath) {
                    // Update reader if active
                    activeRawMarkdown = content;
                    if (docMainTitle) docMainTitle.innerText = data.title;
                    if (docMetaReadingTime) docMetaReadingTime.innerText = `⏱️ ${data.readingTime} min read`;
                    if (docMetaWordCount) docMetaWordCount.innerText = `📝 ${data.wordCount.toLocaleString()} words`;
                    if (docRenderedBody) docRenderedBody.innerHTML = data.html;
                    if (docRawBody) docRawBody.textContent = content;
                    renderTOC(data.headings || []);
                }
            } else {
                showToast(`Save failed: ${data.error || 'Unknown error'}`);
            }
        } catch (err) {
            console.error('Error saving file:', err);
            showToast('Failed to save: network error');
        } finally {
            if (btnEditorSave) btnEditorSave.disabled = false;
        }
    }

    btnEditorSave?.addEventListener('click', () => saveCurrentFile(false));
    btnEditorSaveAndView?.addEventListener('click', () => saveCurrentFile(true));

    btnEditorRevert?.addEventListener('click', () => {
        if (!isEditorDirty) return;
        const confirmRevert = confirm('Discard unsaved edits and revert back to saved file?');
        if (confirmRevert && markdownEditorTextarea) {
            markdownEditorTextarea.value = originalEditorContent;
            onEditorInput();
            showToast('Changes reverted');
        }
    });

    // Formatting Toolbar Helpers
    function applyFormatting(action) {
        if (!markdownEditorTextarea) return;
        const textarea = markdownEditorTextarea;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const val = textarea.value;
        const selected = val.substring(start, end);

        let replacement = '';
        let cursorOffset = 0;

        switch (action) {
            case 'bold':
                replacement = `**${selected || 'bold text'}**`;
                cursorOffset = selected ? replacement.length : 2;
                break;
            case 'italic':
                replacement = `*${selected || 'italic text'}*`;
                cursorOffset = selected ? replacement.length : 1;
                break;
            case 'strike':
                replacement = `~~${selected || 'strikethrough'}~~`;
                cursorOffset = selected ? replacement.length : 2;
                break;
            case 'heading-1':
                replacement = `\n# ${selected || 'Heading 1'}\n`;
                cursorOffset = replacement.length;
                break;
            case 'heading-2':
                replacement = `\n## ${selected || 'Heading 2'}\n`;
                cursorOffset = replacement.length;
                break;
            case 'heading-3':
                replacement = `\n### ${selected || 'Heading 3'}\n`;
                cursorOffset = replacement.length;
                break;
            case 'ul':
                if (selected) {
                    replacement = selected.split('\n').map(l => `- ${l}`).join('\n');
                } else {
                    replacement = '- List item\n- List item';
                }
                cursorOffset = replacement.length;
                break;
            case 'ol':
                if (selected) {
                    replacement = selected.split('\n').map((l, idx) => `${idx + 1}. ${l}`).join('\n');
                } else {
                    replacement = '1. First item\n2. Second item';
                }
                cursorOffset = replacement.length;
                break;
            case 'task':
                if (selected) {
                    replacement = selected.split('\n').map(l => `- [ ] ${l}`).join('\n');
                } else {
                    replacement = '- [ ] Task to complete\n- [ ] Another task';
                }
                cursorOffset = replacement.length;
                break;
            case 'quote':
                if (selected) {
                    replacement = selected.split('\n').map(l => `> ${l}`).join('\n');
                } else {
                    replacement = '> Blockquote insight or key takeaway here.';
                }
                cursorOffset = replacement.length;
                break;
            case 'code-inline':
                replacement = `\`${selected || 'code'}\``;
                cursorOffset = selected ? replacement.length : 1;
                break;
            case 'code-block':
                replacement = `\n\`\`\`javascript\n${selected || '// Write your code here'}\n\`\`\`\n`;
                cursorOffset = replacement.length;
                break;
            case 'table':
                replacement = `\n| Column 1 | Column 2 | Column 3 |\n| :--- | :--- | :--- |\n| Item 1 | Description | Value |\n| Item 2 | Description | Value |\n`;
                cursorOffset = replacement.length;
                break;
            case 'link':
                replacement = `[${selected || 'Link title'}](https://example.com)`;
                cursorOffset = replacement.length;
                break;
            case 'hr':
                replacement = `\n\n---\n\n`;
                cursorOffset = replacement.length;
                break;
            default:
                return;
        }

        textarea.value = val.substring(0, start) + replacement + val.substring(end);
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = start + cursorOffset;
        onEditorInput();
    }

    document.querySelectorAll('.editor-formatting-toolbar .format-btn[data-action]').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.getAttribute('data-action');
            if (action) applyFormatting(action);
        });
    });

    // Callout Menu Toggle & Insert
    btnCalloutMenu?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!calloutMenu) return;
        calloutMenu.style.display = calloutMenu.style.display === 'none' ? 'block' : 'none';
    });

    document.addEventListener('click', (e) => {
        if (calloutMenu && !calloutMenu.contains(e.target) && e.target !== btnCalloutMenu) {
            calloutMenu.style.display = 'none';
        }
    });

    document.querySelectorAll('.callout-opt').forEach(opt => {
        opt.addEventListener('click', () => {
            const type = opt.getAttribute('data-callout') || 'NOTE';
            if (!markdownEditorTextarea) return;
            const textarea = markdownEditorTextarea;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const val = textarea.value;
            const selected = val.substring(start, end) || 'Detailed explanation or instruction here.';
            const calloutText = `\n> [!${type}]\n> ${selected}\n\n`;
            textarea.value = val.substring(0, start) + calloutText + val.substring(end);
            textarea.focus();
            textarea.selectionStart = textarea.selectionEnd = start + calloutText.length;
            onEditorInput();
            if (calloutMenu) calloutMenu.style.display = 'none';
        });
    });

    // View Mode Toggles
    function setEditorMode(mode) {
        if (!editorWorkspace) return;
        [btnModeSplit, btnModeEditor, btnModePreview].forEach(btn => btn?.classList.remove('active'));
        editorWorkspace.classList.remove('split-mode', 'editor-mode', 'preview-mode');

        if (mode === 'editor') {
            btnModeEditor?.classList.add('active');
            editorWorkspace.classList.add('editor-mode');
        } else if (mode === 'preview') {
            btnModePreview?.classList.add('active');
            editorWorkspace.classList.add('preview-mode');
        } else {
            btnModeSplit?.classList.add('active');
            editorWorkspace.classList.add('split-mode');
        }
    }

    btnModeSplit?.addEventListener('click', () => setEditorMode('split'));
    btnModeEditor?.addEventListener('click', () => setEditorMode('editor'));
    btnModePreview?.addEventListener('click', () => setEditorMode('preview'));

    // Edit current document button in Reader
    btnEditCurrentDoc?.addEventListener('click', () => {
        if (!activeDocPath) return;
        switchView('editor');
        loadDocIntoEditor(activeDocPath);
    });

    // Modal: Create New File
    function openNewFileModal() {
        if (!modalNewFile) return;
        modalNewFile.style.display = 'flex';
        if (newDocFilename) {
            newDocFilename.value = '';
            setTimeout(() => newDocFilename.focus(), 50);
        }
    }

    function closeNewFileModal() {
        if (!modalNewFile) return;
        modalNewFile.style.display = 'none';
    }

    btnCreateNewDoc?.addEventListener('click', openNewFileModal);
    btnEditorNew?.addEventListener('click', openNewFileModal);
    btnCloseModal?.addEventListener('click', closeNewFileModal);
    btnCancelNewFile?.addEventListener('click', closeNewFileModal);

    modalNewFile?.addEventListener('click', (e) => {
        if (e.target === modalNewFile) closeNewFileModal();
    });

    newDocFolder?.addEventListener('change', () => {
        if (customFolderRow) {
            customFolderRow.style.display = newDocFolder.value === 'custom' ? 'flex' : 'none';
            if (newDocFolder.value === 'custom') customFolderInput?.focus();
        }
    });

    // Starter Templates for New Documents
    function getStarterTemplate(type, title) {
        const cleanTitle = title.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        if (type === 'lesson') {
            return `# ${cleanTitle}\n\n## 1. Objectives & Focus Areas\n- Master grammatical accuracy and complex syntactic structures.\n- Improve natural conversational pacing and idiomatic fluency.\n\n## 2. Core Grammar & Key Structures\n> [!NOTE]\n> Focus on correct subject-verb inversion and parallel structures.\n\n- **Structure Formula:** *Not only [auxiliary] [subject] [verb], but also...*\n- **Example:** Not only did they complete the project on schedule, but they also exceeded target metrics.\n\n## 3. High-Yield Vocabulary & Expressions\n| Term | Pronunciation | Definition | Example Sentence |\n| :--- | :--- | :--- | :--- |\n| **Synthesize** | /ˈsɪn.θə.saɪz/ | Combine ideas into a coherent whole | *The report synthesizes findings from multiple trials.* |\n| **Pragmatic** | /præɡˈmæt.ɪk/ | Dealing with things sensibly and realistically | *We need a pragmatic solution to this bottleneck.* |\n\n## 4. IELTS Simulation & Reflex Practice\n**Interviewer:** How has technology shifted modern collaborative dynamics?\n**Candidate:** Rapid digitalization has fundamentally redefined asynchronous communication, allowing cross-functional teams to coordinate seamlessly across disparate time zones.\n\n## 5. Daily Reflex Drill\n- [ ] Read the dialogue aloud 3 times with natural syllable timing\n- [ ] Construct 3 original sentences using today's core vocabulary\n- [ ] Record a 1-minute spontaneous summary\n`;
        } else if (type === 'youtube') {
            return `# ${cleanTitle}\n\n## Video Information\n- **Video Topic:** \n- **Difficulty Level:** Intermediate / Advanced (B2-C1)\n- **Primary Focus:** Native Phrasing & Natural Cadence\n\n> [!TIP]\n> Listen first without reading transcripts, then shadow key phrases with active vocal imitation.\n\n## Timestamp Breakdown\n- **00:00 - 02:30:** Contextual Introduction\n- **02:31 - 06:15:** Breakdown of Idiomatic Phrasing\n- **06:16 - 10:00:** Practical Conversational Nuance\n\n## Key Phrases & Collocations\n1. **Take it with a grain of salt** — Be skeptical or do not accept something as completely true.\n2. **Touch base with** — Briefly connect or check in with someone.\n\n## Personal Takeaways\nSummarize the main ideas in your own words...\n`;
        } else if (type === 'technique') {
            return `# Technique: ${cleanTitle}\n\n## Theoretical Foundation\nExplain the cognitive methodology and retention science behind this practice technique.\n\n> [!IMPORTANT]\n> Sustainable habit formation requires short, daily focused sessions rather than occasional cramming.\n\n## Execution Protocol\n1. **Setup:** Select focused source materials and remove environmental distractions.\n2. **Active Retrieval:** Practice immediate recall drills against reference audio/text.\n3. **Reflection:** Identify stumbling blocks and note pronunciation/grammatical corrections.\n\n## Practice Checklist\n- [ ] Daily 15-minute active listening session\n- [ ] Record oral output and review against native standard\n`;
        } else if (type === 'running') {
            return `# MAF Training: ${cleanTitle}\n\n## Target Session Parameters\n- **MAF Heart Rate Ceiling:** 145 bpm (180 - Age Formula)\n- **Target Pace Window:** 6:15 - 6:45 min/km\n- **Total Duration:** 50 - 60 minutes\n- **Energy System:** Aerobic Base Building (Zone 2)\n\n> [!NOTE]\n> Keep heart rate strictly below your aerobic threshold. Walk or slow down immediately if heart rate exceeds your ceiling.\n\n## Workout Phases\n- **Warm-up (10 min):** Light leg swings, calf activation, slow jog with HR < 120 bpm.\n- **Continuous Run (40 min):** Smooth cadence (175-180 spm) strictly within aerobic zone.\n- **Cool-down (10 min):** Easy walk, diaphragmatic nasal breathing, hydration.\n\n## Post-Workout Log\n- **Average HR:** \n- **Total Distance:** \n- **Perceived Exertion (1-10):** \n- **Notes on Cadence & Fatigue:** \n`;
        }
        return `# ${cleanTitle}\n\nStart typing your content here...\n`;
    }

    // Submit New Document Creation
    btnSubmitNewFile?.addEventListener('click', async () => {
        let folder = newDocFolder?.value || 'english/week-10/lessons/';
        if (folder === 'custom') {
            folder = customFolderInput?.value.trim() || '';
            if (!folder) {
                alert('Please specify a custom folder path');
                return;
            }
            if (!folder.endsWith('/')) folder += '/';
        }

        let filename = newDocFilename?.value.trim() || '';
        if (!filename) {
            alert('Please enter a file name');
            return;
        }

        if (!filename.endsWith('.md')) {
            filename += '.md';
        }

        // Clean filename (lowercase, dashes)
        filename = filename.replace(/\s+/g, '-');
        const targetPath = folder + filename;
        const templateType = newDocTemplate?.value || 'lesson';
        const initialContent = getStarterTemplate(templateType, filename.replace('.md', ''));

        if (btnSubmitNewFile) btnSubmitNewFile.disabled = true;

        try {
            const res = await fetch('/api/document/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    path: targetPath,
                    content: initialContent
                })
            });
            const data = await res.json();

            if (data.success) {
                closeNewFileModal();
                showToast(`Created document: ${filename}`);

                // Reload document list to update tree and dropdown
                await loadDocumentsList();

                // Switch to editor and load newly created file
                switchView('editor');
                loadDocIntoEditor(targetPath);
            } else {
                alert(`Error creating file: ${data.error}`);
            }
        } catch (err) {
            console.error('Error creating document:', err);
            alert('Failed to create file: Server connection error');
        } finally {
            if (btnSubmitNewFile) btnSubmitNewFile.disabled = false;
        }
    });

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        // Only if not focused in an input field
        if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
            if (e.key === 'Escape') {
                document.activeElement.blur();
            }
            return;
        }

        if (e.key === '/') {
            e.preventDefault();
            docSearchInput?.focus();
        } else if (e.key === '[' || (e.ctrlKey && e.key === 'ArrowLeft')) {
            if (!btnNavPrevDoc?.disabled) btnNavPrevDoc?.click();
        } else if (e.key === ']' || (e.ctrlKey && e.key === 'ArrowRight')) {
            if (!btnNavNextDoc?.disabled) btnNavNextDoc?.click();
        }
    });

    // Initialize Reader
    loadDocumentsList();
});
