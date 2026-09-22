// Study & Training Hub - Interactive Vocabulary and Live Markdown Reader

// Global helper for escaping HTML special characters
function escapeHtml(text) {
    if (text === null || text === undefined) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
window.escapeHtml = escapeHtml;

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
    // 2. View Switching (Reader vs Editor vs Vocab vs Running Report vs AI Coach vs Voice)
    // =========================================================================
    const tabBtnReader = document.getElementById('tab-btn-reader');
    const tabBtnEditor = document.getElementById('tab-btn-editor');
    const tabBtnVocab = document.getElementById('tab-btn-vocab');
    const tabBtnRunning = document.getElementById('tab-btn-running');
    const tabBtnChat = document.getElementById('tab-btn-chat');
    const tabBtnVoice = document.getElementById('tab-btn-voice');

    const viewReader = document.getElementById('view-reader');
    const viewEditor = document.getElementById('view-editor');
    const viewVocab = document.getElementById('view-vocabulary');
    const viewRunning = document.getElementById('view-running');
    const viewChat = document.getElementById('view-chat');
    const viewVoice = document.getElementById('view-voice');

    const btnQuickSwitchReader = document.getElementById('btn-quick-switch-reader');
    const btnJumpMafDocs = document.getElementById('btn-jump-maf-docs');

    function switchView(viewName) {
        // Deactivate all
        [tabBtnReader, tabBtnEditor, tabBtnVocab, tabBtnRunning, tabBtnChat, tabBtnVoice].forEach(btn => btn?.classList.remove('active'));
        [viewReader, viewEditor, viewVocab, viewRunning, viewChat, viewVoice].forEach(view => view?.classList.remove('active'));

        if (viewName === 'vocab') {
            tabBtnVocab?.classList.add('active');
            viewVocab?.classList.add('active');
            window.location.hash = 'vocab';
        } else if (viewName === 'running') {
            tabBtnRunning?.classList.add('active');
            viewRunning?.classList.add('active');
            window.location.hash = 'running';
        } else if (viewName === 'chat') {
            tabBtnChat?.classList.add('active');
            viewChat?.classList.add('active');
            window.location.hash = 'chat';
            setTimeout(() => {
                document.getElementById('chat-input-textarea')?.focus();
            }, 100);
        } else if (viewName === 'voice') {
            tabBtnVoice?.classList.add('active');
            viewVoice?.classList.add('active');
            window.location.hash = 'voice';
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
    tabBtnChat?.addEventListener('click', () => switchView('chat'));
    tabBtnVoice?.addEventListener('click', () => switchView('voice'));
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
    const docFrontmatterContainer = document.getElementById('doc-frontmatter-container');
    let currentDocHasFrontmatter = false;
    const tocList = document.getElementById('toc-list');

    const btnToggleMarkDone = document.getElementById('btn-toggle-mark-done');
    const markDoneText = document.getElementById('mark-done-text');
    const btnCopyDocMarkdown = document.getElementById('btn-copy-doc-markdown');
    const btnToggleRaw = document.getElementById('btn-toggle-raw');

    const btnNavPrevDoc = document.getElementById('btn-nav-prev-doc');
    const btnNavNextDoc = document.getElementById('btn-nav-next-doc');
    const navPrevLabel = document.getElementById('nav-prev-label');
    const navNextLabel = document.getElementById('nav-next-label');

    // ==========================================================================
    // Comprehensive Reader Scaling & Auto Fit Engine (Phone & Web)
    // ==========================================================================
    const STORAGE_KEY_SCALE = 'study_reader_scale';
    const STORAGE_KEY_WIDTH = 'study_reader_width';
    const STORAGE_KEY_AUTOFIT = 'study_reader_autofit';

    const readerScaleContainer = document.getElementById('reader-scale-container');
    const btnAutoFitScreen = document.getElementById('btn-autofit-screen');
    const btnFontSmaller = document.getElementById('btn-font-smaller');
    const btnFontReset = document.getElementById('btn-font-reset');
    const btnFontLarger = document.getElementById('btn-font-larger');
    const scalePercentText = document.getElementById('scale-percent-text');
    const scalePopoverMenu = document.getElementById('scale-popover-menu');
    const btnScaleAutoFitDirect = document.getElementById('btn-scale-autofit-direct');
    const btnScaleResetDirect = document.getElementById('btn-scale-reset-direct');
    const chipScaleAuto = document.getElementById('chip-scale-auto');
    const readerScaleSlider = document.getElementById('reader-scale-slider');
    const scalePresetsGrid = document.getElementById('scale-presets-grid');
    const scaleWidthToggles = document.getElementById('scale-width-toggles');
    const readerZoomHud = document.getElementById('reader-zoom-hud');
    const zoomHudText = document.getElementById('zoom-hud-text');
    const readerScrollArea = document.getElementById('reader-scroll-area');
    const sidebarBackdrop = document.getElementById('sidebar-backdrop');

    // Mobile overflow actions
    const btnReaderMore = document.getElementById('btn-reader-more');
    const readerMoreMenu = document.getElementById('reader-more-menu');
    const btnMobileAutoFit = document.getElementById('btn-mobile-autofit');
    const btnMobileCopyMarkdown = document.getElementById('btn-mobile-copy-markdown');
    const btnMobileToggleRaw = document.getElementById('btn-mobile-toggle-raw');
    const mobileToggleRawText = document.getElementById('mobile-toggle-raw-text');

    // Load persisted preferences
    let readerScale = parseFloat(localStorage.getItem(STORAGE_KEY_SCALE)) || 1.0;
    if (isNaN(readerScale) || readerScale < 0.7 || readerScale > 2.0) readerScale = 1.0;

    let readerWidthMode = localStorage.getItem(STORAGE_KEY_WIDTH) || 'standard';
    let storedAutoFit = localStorage.getItem(STORAGE_KEY_AUTOFIT);
    // Auto Fit defaults to true on mobile screens (< 860px) unless explicitly disabled
    let isAutoFitActive = storedAutoFit !== null ? storedAutoFit === 'true' : (window.innerWidth <= 860);
    let zoomHudTimeout = null;

    // Show visual feedback HUD badge
    function showZoomHud(textOrPercent) {
        if (!readerZoomHud || !zoomHudText) return;
        zoomHudText.innerText = typeof textOrPercent === 'number' ? `${textOrPercent}%` : textOrPercent;
        readerZoomHud.classList.add('show');
        if (zoomHudTimeout) clearTimeout(zoomHudTimeout);
        zoomHudTimeout = setTimeout(() => {
            readerZoomHud.classList.remove('show');
        }, 1200);
    }

    // Determine optimal readability scale based on viewport dimensions
    function getAutoFitScale() {
        const width = window.innerWidth;
        if (width <= 360) {
            return 0.90; // compact screens
        } else if (width <= 480) {
            return 0.95; // standard iPhone / Android portrait
        } else if (width <= 768) {
            return 1.0;
        } else {
            return 1.0;
        }
    }

    function setAutoFitActiveState(active) {
        isAutoFitActive = active;
        try {
            localStorage.setItem(STORAGE_KEY_AUTOFIT, active ? 'true' : 'false');
        } catch (e) {}

        btnAutoFitScreen?.classList.toggle('active', active);
        chipScaleAuto?.classList.toggle('active', active);
    }

    // Trigger auto-fit to screen width
    function triggerAutoFit(notify = true) {
        setAutoFitActiveState(true);
        const targetScale = getAutoFitScale();
        const targetWidth = window.innerWidth <= 860 ? 'full' : 'standard';

        applyReaderScale(targetScale, true, false);
        applyReaderWidth(targetWidth, true);

        // Ensure reader is scrolled to left boundary
        if (readerScrollArea) {
            readerScrollArea.scrollLeft = 0;
        }
        window.scrollTo({ left: 0, top: window.scrollY });

        if (notify) {
            showZoomHud(`Fit (${Math.round(targetScale * 100)}%)`);
        }
    }

    // Apply scale to reader container and update controls
    function applyReaderScale(newScale, persist = true, resetAutoFit = true) {
        if (resetAutoFit) {
            setAutoFitActiveState(false);
        }

        readerScale = Math.min(2.0, Math.max(0.7, Math.round(newScale * 100) / 100));
        const percent = Math.round(readerScale * 100);

        const article = document.getElementById('doc-article');
        if (article) {
            article.style.setProperty('--reader-scale', readerScale.toString());
        }
        if (docRenderedBody) {
            docRenderedBody.style.setProperty('--reader-scale', readerScale.toString());
        }
        if (docFrontmatterContainer) {
            docFrontmatterContainer.style.setProperty('--reader-scale', readerScale.toString());
        }
        if (docRawBody) {
            docRawBody.style.setProperty('--reader-scale', readerScale.toString());
        }

        if (scalePercentText) {
            scalePercentText.innerText = `${percent}%`;
        }
        if (readerScaleSlider) {
            readerScaleSlider.value = percent.toString();
        }

        // Highlight matching preset chip
        scalePresetsGrid?.querySelectorAll('.scale-chip').forEach(chip => {
            const chipScale = parseFloat(chip.getAttribute('data-scale'));
            if (!isNaN(chipScale)) {
                const isMatch = Math.abs(chipScale - readerScale) < 0.04;
                chip.classList.toggle('active', isMatch);
            }
        });

        // Update Auto chip and toolbar button active state
        chipScaleAuto?.classList.toggle('active', isAutoFitActive);
        btnAutoFitScreen?.classList.toggle('active', isAutoFitActive);

        if (persist) {
            try {
                localStorage.setItem(STORAGE_KEY_SCALE, readerScale.toString());
            } catch (e) {
                console.warn('Storage unavailable:', e);
            }
        }
    }

    // Apply reading width mode
    function applyReaderWidth(mode, persist = true) {
        readerWidthMode = mode;
        const article = document.getElementById('doc-article');
        if (article) {
            if (mode === 'wide') {
                article.style.setProperty('--reader-max-width', '1180px');
            } else if (mode === 'full') {
                article.style.setProperty('--reader-max-width', '100%');
            } else {
                article.style.setProperty('--reader-max-width', '880px');
            }
        }

        scaleWidthToggles?.querySelectorAll('.width-toggle-btn').forEach(btn => {
            const btnMode = btn.getAttribute('data-width');
            btn.classList.toggle('active', btnMode === mode);
        });

        if (persist) {
            try {
                localStorage.setItem(STORAGE_KEY_WIDTH, mode);
            } catch (e) {
                console.warn('Storage unavailable:', e);
            }
        }
    }

    // Auto Fit Button in Toolbar
    btnAutoFitScreen?.addEventListener('click', (e) => {
        e.stopPropagation();
        triggerAutoFit(true);
    });

    // Zoom Step Controls (- and +)
    btnFontSmaller?.addEventListener('click', (e) => {
        e.stopPropagation();
        const nextScale = Math.max(0.7, readerScale - 0.1);
        applyReaderScale(nextScale);
        showZoomHud(Math.round(nextScale * 100));
    });

    btnFontLarger?.addEventListener('click', (e) => {
        e.stopPropagation();
        const nextScale = Math.min(2.0, readerScale + 0.1);
        applyReaderScale(nextScale);
        showZoomHud(Math.round(nextScale * 100));
    });

    // Display button toggles scale menu
    btnFontReset?.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = scalePopoverMenu?.style.display === 'block';
        if (isOpen) {
            closeScaleMenu();
        } else {
            openScaleMenu();
        }
    });

    // Auto Fit direct button in popover header
    btnScaleAutoFitDirect?.addEventListener('click', (e) => {
        e.stopPropagation();
        triggerAutoFit(true);
        closeScaleMenu();
    });

    // Reset direct button (100%)
    btnScaleResetDirect?.addEventListener('click', (e) => {
        e.stopPropagation();
        applyReaderScale(1.0);
        showZoomHud(100);
        closeScaleMenu();
    });

    function openScaleMenu() {
        if (!scalePopoverMenu) return;
        closeReaderMoreMenu();
        scalePopoverMenu.style.display = 'block';
        readerScaleContainer?.classList.add('active');
    }

    function closeScaleMenu() {
        if (!scalePopoverMenu) return;
        scalePopoverMenu.style.display = 'none';
        readerScaleContainer?.classList.remove('active');
    }

    // Scale Preset Chips
    scalePresetsGrid?.addEventListener('click', (e) => {
        const chip = e.target.closest('.scale-chip');
        if (!chip) return;
        e.stopPropagation();
        if (chip.id === 'chip-scale-auto') {
            triggerAutoFit(true);
            closeScaleMenu();
            return;
        }
        const targetScale = parseFloat(chip.getAttribute('data-scale'));
        if (!isNaN(targetScale)) {
            applyReaderScale(targetScale);
            showZoomHud(Math.round(targetScale * 100));
        }
    });

    // Continuous Range Slider
    readerScaleSlider?.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        if (!isNaN(val)) {
            const scale = val / 100;
            applyReaderScale(scale, false);
            showZoomHud(val);
        }
    });

    readerScaleSlider?.addEventListener('change', (e) => {
        const val = parseInt(e.target.value, 10);
        if (!isNaN(val)) {
            applyReaderScale(val / 100, true);
        }
    });

    // Reading Width Toggles
    scaleWidthToggles?.addEventListener('click', (e) => {
        const btn = e.target.closest('.width-toggle-btn');
        if (!btn) return;
        e.stopPropagation();
        const mode = btn.getAttribute('data-width');
        if (mode) {
            applyReaderWidth(mode);
        }
    });

    // Mobile Multi-Touch Pinch-to-Zoom Gesture Detection
    let touchStartDistance = 0;
    let initialScaleOnPinch = 1.0;
    let isPinching = false;

    if (readerScrollArea) {
        readerScrollArea.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                touchStartDistance = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                initialScaleOnPinch = readerScale;
                isPinching = true;
            }
        }, { passive: true });

        readerScrollArea.addEventListener('touchmove', (e) => {
            if (isPinching && e.touches.length === 2) {
                const currentDist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                if (touchStartDistance > 0) {
                    const factor = currentDist / touchStartDistance;
                    const liveScale = Math.min(2.0, Math.max(0.7, initialScaleOnPinch * factor));
                    applyReaderScale(liveScale, false);
                    showZoomHud(Math.round(liveScale * 100));
                }
            }
        }, { passive: true });

        readerScrollArea.addEventListener('touchend', (e) => {
            if (isPinching && e.touches.length < 2) {
                isPinching = false;
                applyReaderScale(readerScale, true); // persist current pinch result
            }
        });
    }

    // Web / Desktop Keyboard Shortcuts (Ctrl/Cmd + Plus/Minus/0)
    window.addEventListener('keydown', (e) => {
        // Don't trigger when typing in inputs or textareas
        const activeTag = document.activeElement?.tagName?.toLowerCase();
        if (activeTag === 'input' || activeTag === 'textarea' || document.activeElement?.isContentEditable) {
            return;
        }

        // Only handle when reader view is active
        const isReaderActive = tabBtnReader?.classList.contains('active');
        if (!isReaderActive) return;

        const isModifier = e.ctrlKey || e.metaKey;
        if (isModifier && (e.key === '=' || e.key === '+')) {
            e.preventDefault();
            const nextScale = Math.min(2.0, readerScale + 0.1);
            applyReaderScale(nextScale);
            showZoomHud(Math.round(nextScale * 100));
        } else if (isModifier && (e.key === '-' || e.key === '_')) {
            e.preventDefault();
            const nextScale = Math.max(0.7, readerScale - 0.1);
            applyReaderScale(nextScale);
            showZoomHud(Math.round(nextScale * 100));
        } else if (isModifier && e.key === '0') {
            e.preventDefault();
            applyReaderScale(1.0);
            showZoomHud(100);
        }
    });

    // Mobile Overflow Menu Handlers
    btnReaderMore?.addEventListener('click', (e) => {
        e.stopPropagation();
        closeScaleMenu();
        const isOpen = readerMoreMenu?.style.display === 'block';
        if (readerMoreMenu) {
            readerMoreMenu.style.display = isOpen ? 'none' : 'block';
        }
    });

    function closeReaderMoreMenu() {
        if (readerMoreMenu) readerMoreMenu.style.display = 'none';
    }

    btnMobileAutoFit?.addEventListener('click', () => {
        closeReaderMoreMenu();
        triggerAutoFit(true);
    });

    btnMobileCopyMarkdown?.addEventListener('click', () => {
        closeReaderMoreMenu();
        if (!activeRawMarkdown) return;
        navigator.clipboard.writeText(activeRawMarkdown).then(() => {
            showToast('Full Markdown copied to clipboard');
        });
    });

    btnMobileToggleRaw?.addEventListener('click', () => {
        closeReaderMoreMenu();
        toggleRawRenderedView();
    });

    // Dismiss popovers when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#reader-scale-container')) {
            closeScaleMenu();
        }
        if (!e.target.closest('#reader-more-container')) {
            closeReaderMoreMenu();
        }
    });

    // Dynamic viewport & orientation adaptation for Mobile Safari and Chrome
    window.addEventListener('resize', () => {
        if (isAutoFitActive) {
            triggerAutoFit(false);
        }
    });

    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            if (isAutoFitActive) {
                triggerAutoFit(false);
            }
        }, 200);
    });

    // Initialize initial scale, width, and Auto Fit mode
    if (isAutoFitActive) {
        triggerAutoFit(false);
    } else {
        applyReaderScale(readerScale, false, false);
        applyReaderWidth(readerWidthMode, false);
        setAutoFitActiveState(false);
    }

    // Toggle Mobile Sidebar & Backdrop
    btnToggleSidebar?.addEventListener('click', () => {
        const isOpen = readerSidebar?.classList.toggle('open');
        sidebarBackdrop?.classList.toggle('active', isOpen);
    });

    sidebarBackdrop?.addEventListener('click', () => {
        readerSidebar?.classList.remove('open');
        sidebarBackdrop?.classList.remove('active');
    });

    // Toggle Raw / Rendered
    let isRawMode = false;
    function toggleRawRenderedView() {
        isRawMode = !isRawMode;
        if (isRawMode) {
            docRenderedBody.style.display = 'none';
            if (docFrontmatterContainer) docFrontmatterContainer.style.display = 'none';
            docRawBody.style.display = 'block';
            if (btnToggleRaw) btnToggleRaw.querySelector('.btn-text').innerText = 'Rendered';
            if (mobileToggleRawText) mobileToggleRawText.innerText = 'View Rendered Content';
        } else {
            docRenderedBody.style.display = 'block';
            if (docFrontmatterContainer && currentDocHasFrontmatter) {
                docFrontmatterContainer.style.display = 'block';
            }
            docRawBody.style.display = 'none';
            if (btnToggleRaw) btnToggleRaw.querySelector('.btn-text').innerText = 'Raw';
            if (mobileToggleRawText) mobileToggleRawText.innerText = 'View Raw Markdown';
        }
    }

    // Front-Matter helper actions (copy & toggle collapse)
    window.copyFrontMatterYaml = function(btn) {
        const base64 = btn?.getAttribute('data-yaml-base64');
        if (!base64) return;
        try {
            const yamlText = atob(base64);
            navigator.clipboard.writeText(yamlText).then(() => {
                showToast('YAML front-matter copied to clipboard');
            });
        } catch (err) {
            console.error('Failed to copy YAML:', err);
        }
    };

    window.toggleFrontMatterTable = function(btn) {
        const panel = btn?.closest('.doc-frontmatter-panel');
        if (!panel) return;
        const isCollapsed = panel.classList.toggle('collapsed');
        const textSpan = btn.querySelector('.fm-toggle-text');
        if (textSpan) {
            textSpan.textContent = isCollapsed ? 'Expand' : 'Collapse';
        }
    };

    btnToggleRaw?.addEventListener('click', toggleRawRenderedView);

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
                } else if (hash === '#chat') {
                    switchView('chat');
                } else if (hash === '#voice') {
                    switchView('voice');
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
                    sidebarBackdrop?.classList.remove('active');
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
        if (docFrontmatterContainer) {
            docFrontmatterContainer.style.display = 'none';
            docFrontmatterContainer.innerHTML = '';
        }
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

                // Front-Matter Metadata Table
                if (data.frontMatterHtml && data.frontMatter && Object.keys(data.frontMatter).length > 0) {
                    currentDocHasFrontmatter = true;
                    if (docFrontmatterContainer) {
                        docFrontmatterContainer.innerHTML = data.frontMatterHtml;
                        docFrontmatterContainer.style.display = isRawMode ? 'none' : 'block';
                    }
                } else {
                    currentDocHasFrontmatter = false;
                    if (docFrontmatterContainer) {
                        docFrontmatterContainer.innerHTML = '';
                        docFrontmatterContainer.style.display = 'none';
                    }
                }

                // Rendered HTML
                if (docRenderedBody) {
                    docRenderedBody.innerHTML = data.html;
                }
                if (docRawBody) {
                    docRawBody.textContent = data.rawMarkdown;
                }

                applyReaderScale(readerScale, false);
                applyReaderWidth(readerWidthMode, false);

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

    // =========================================================================
    // 6. GEMINI MULTI-TURN AI CHATBOT (gemini-3.8-flash & models)
    // =========================================================================
    const chatModelSelect = document.getElementById('chat-model-select');
    const chatRoleSelect = document.getElementById('chat-role-select');
    const btnToggleSystemPrompt = document.getElementById('btn-toggle-system-prompt');
    const chatSystemPromptPanel = document.getElementById('chat-system-prompt-panel');
    const chatSystemPromptTextarea = document.getElementById('chat-system-prompt-textarea');
    const btnClosePromptPanel = document.getElementById('btn-close-prompt-panel');
    const btnApplyCustomPrompt = document.getElementById('btn-apply-custom-prompt');

    const btnChatAttachDoc = document.getElementById('btn-chat-attach-doc');
    const chatAttachedDocName = document.getElementById('chat-attached-doc-name');
    const chatActiveDocBanner = document.getElementById('chat-active-doc-banner');
    const chatDocBannerText = document.getElementById('chat-doc-banner-text');
    const btnRemoveAttachedDoc = document.getElementById('btn-remove-attached-doc');
    const btnExportChat = document.getElementById('btn-export-chat');
    const btnClearChat = document.getElementById('btn-clear-chat');

    const chatMessagesContainer = document.getElementById('chat-messages-container');
    const chatInputTextarea = document.getElementById('chat-input-textarea');
    const btnChatSend = document.getElementById('btn-chat-send');
    const btnChatStop = document.getElementById('btn-chat-stop');
    const chatQuickChips = document.getElementById('chat-quick-chips');

    // Reader Toolbar Quick Action Buttons
    const btnAskAiReader = document.getElementById('btn-ask-ai-reader');
    const btnVoiceReader = document.getElementById('btn-voice-reader');

    let chatHistory = []; // Array of { role: 'user' | 'model', content: string }
    let chatActiveAbortController = null;
    let isAttachedDocActive = false;
    let chatAttachedDocData = null;

    // Role preset system prompts
    const ROLE_PROMPTS = {
        'ielts-coach': `You are an elite IELTS Examiner and C1/C2 Professional English Coach.
Your objectives:
1. Provide actionable, high-impact feedback on lexical resource, grammatical range and accuracy, and natural discourse markers.
2. When answering or reviewing user responses, give an honest Band score estimation (e.g. Band 6.5 vs Band 7.5+), highlighting specific phrases that sound unnatural or textbook-like.
3. Suggest native-speaker alternatives, collocations, and advanced sentence transformations (e.g., Cleft sentences, Negative Inversion, Participle clauses).
4. Maintain an encouraging, articulate, and intellectually rigorous tone.`,

        'negotiator': `You are a Senior Engineering Director at a high-growth tech enterprise, conducting a performance and compensation review with the user.
Your role:
1. Challenge the user's salary raise proposal (e.g., a 25% compensation increase) realistically. Ask for concrete business metrics, ROI, cross-functional leverage, and data architecture improvements.
2. Push back gently on vague statements ("I worked hard", "I completed tasks") and demand quantified impact ("What was the percentage latency reduction?", "How many engineering hours did your pipeline save?").
3. Give real-time coaching on how to reframe their points using executive presence, diplomatic firmness, and persuasive C1 business English.`,

        'grammar-tutor': `You are a rigorous English Syntax & Grammar Drillmaster.
Your expertise is in advanced sentence formulas:
- Cleft Sentences (It was X that... / What I did was... / All we need is...)
- Negative Inversion (Not only did..., Seldom had..., Under no circumstances should...)
- Spotlight Fronting and Parallelism
Whenever the user writes a sentence or requests a drill:
1. Analyze the syntactic structure.
2. Point out subtle errors in auxiliary placement, subject-verb agreement, or tense harmony.
3. Provide 2-3 upgraded variations for immediate repetition.`,

        'data-engineer': `You are a Staff Data Engineer and Technical English Specialist.
Your focus:
1. Help the user articulate complex distributed systems, PySpark dataframes, Kafka streaming, Airflow DAG orchestration, and lakehouse storage concepts in crisp, unambiguous English.
2. Clarify terminology (e.g., idempotent, backpressure, distributed consensus, eventual consistency, schema evolution).
3. Conduct mock technical behavioral and system design interview responses with immediate phrasing critiques.`,

        'custom': `You are an intelligent, versatile AI English Coach. Provide clear, accurate, and structured explanations.`
    };

    let activeSystemInstruction = ROLE_PROMPTS['ielts-coach'];
    if (chatSystemPromptTextarea) chatSystemPromptTextarea.value = activeSystemInstruction;

    // Toggle custom system prompt drawer
    btnToggleSystemPrompt?.addEventListener('click', () => {
        if (!chatSystemPromptPanel) return;
        const isHidden = chatSystemPromptPanel.style.display === 'none';
        chatSystemPromptPanel.style.display = isHidden ? 'block' : 'none';
        if (isHidden) chatSystemPromptTextarea?.focus();
    });

    btnClosePromptPanel?.addEventListener('click', () => {
        if (chatSystemPromptPanel) chatSystemPromptPanel.style.display = 'none';
    });

    chatRoleSelect?.addEventListener('change', (e) => {
        const selected = e.target.value;
        if (ROLE_PROMPTS[selected]) {
            activeSystemInstruction = ROLE_PROMPTS[selected];
            if (chatSystemPromptTextarea) chatSystemPromptTextarea.value = activeSystemInstruction;
        }
        if (selected === 'custom') {
            if (chatSystemPromptPanel) chatSystemPromptPanel.style.display = 'block';
            chatSystemPromptTextarea?.focus();
        } else {
            showToast(`Role updated: ${chatRoleSelect.options[chatRoleSelect.selectedIndex].text.split('(')[0].trim()}`);
        }
    });

    btnApplyCustomPrompt?.addEventListener('click', () => {
        const customText = chatSystemPromptTextarea?.value.trim();
        if (customText) {
            activeSystemInstruction = customText;
            if (chatRoleSelect) chatRoleSelect.value = 'custom';
            if (chatSystemPromptPanel) chatSystemPromptPanel.style.display = 'none';
            showToast('Custom system instruction applied');
        }
    });

    // Helper: Render Markdown inside bubbles
    function renderMarkdownToHtml(markdownText) {
        if (!markdownText) return '';
        if (typeof marked !== 'undefined' && typeof marked.parse === 'function') {
            try {
                return marked.parse(markdownText);
            } catch (e) {
                console.warn('marked.parse error, using fallback:', e);
            }
        }
        // Fallback lightweight regex formatter
        let html = escapeHtml(markdownText)
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>');
        return `<p>${html}</p>`;
    }

    // Render Welcome Greeting Card in Chat
    function renderChatWelcome() {
        if (!chatMessagesContainer) return;
        chatMessagesContainer.innerHTML = `
            <div class="chat-welcome-card" id="chat-welcome-card">
                <div class="welcome-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                    </svg>
                    <span>Gemini AI English Coach</span>
                </div>
                <h3 class="welcome-title">Welcome to your Personal AI English & IELTS Coach</h3>
                <p class="welcome-desc">
                    Practice multi-turn conversational drills, simulate salary raise discussions, review grammar exercises from your lessons, and refine your Data Engineering technical English.
                </p>
                <div class="welcome-features">
                    <div class="welcome-feature-item">
                        <h4>🎯 IELTS & Professional Feedback</h4>
                        <p>Analyze sentences for band score criteria, lexical range, and idiomatic phrasing.</p>
                    </div>
                    <div class="welcome-feature-item">
                        <h4>💼 Salary Negotiation Simulation</h4>
                        <p>Roleplay executive discussions with realistic pushbacks and tactical justifications.</p>
                    </div>
                    <div class="welcome-feature-item">
                        <h4>📑 Context-Aware Lesson Review</h4>
                        <p>Attach any curriculum lesson or markdown document to ask targeted questions.</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Toggle Document Attachment in Chat
    function toggleAttachDoc(forceState = null) {
        if (forceState !== null) {
            isAttachedDocActive = forceState;
        } else {
            isAttachedDocActive = !isAttachedDocActive;
        }

        if (isAttachedDocActive) {
            // Find current active document
            const currentDoc = allDocuments.find(d => d.path === activeDocPath) || allDocuments[0];
            if (currentDoc) {
                chatAttachedDocData = {
                    path: currentDoc.path,
                    title: currentDoc.title,
                    rawMarkdown: activeRawMarkdown
                };
                if (btnChatAttachDoc) {
                    btnChatAttachDoc.classList.add('active');
                    btnChatAttachDoc.title = `Attached: ${currentDoc.title}. Click to detach.`;
                }
                if (chatAttachedDocName) {
                    chatAttachedDocName.textContent = currentDoc.title.length > 20 ? currentDoc.title.substring(0, 18) + '...' : currentDoc.title;
                }
                if (chatActiveDocBanner) {
                    chatActiveDocBanner.style.display = 'flex';
                }
                if (chatDocBannerText) {
                    chatDocBannerText.textContent = `Attached: ${currentDoc.title} (${currentDoc.path})`;
                }
                showToast(`Attached document: ${currentDoc.title}`);
            } else {
                showToast('No document currently open to attach');
                isAttachedDocActive = false;
            }
        } else {
            chatAttachedDocData = null;
            if (btnChatAttachDoc) {
                btnChatAttachDoc.classList.remove('active');
                btnChatAttachDoc.title = 'Attach current document to chat';
            }
            if (chatAttachedDocName) {
                chatAttachedDocName.textContent = 'Attach Current Doc';
            }
            if (chatActiveDocBanner) {
                chatActiveDocBanner.style.display = 'none';
            }
        }
    }

    btnChatAttachDoc?.addEventListener('click', () => toggleAttachDoc());
    btnRemoveAttachedDoc?.addEventListener('click', () => toggleAttachDoc(false));

    // Clear Chat History
    btnClearChat?.addEventListener('click', () => {
        if (chatHistory.length > 0 && !confirm('Are you sure you want to clear this conversation history?')) {
            return;
        }
        chatHistory = [];
        renderChatWelcome();
        showToast('Chat history cleared');
    });

    // Export Chat Transcript
    btnExportChat?.addEventListener('click', () => {
        if (chatHistory.length === 0) {
            showToast('No messages to export');
            return;
        }
        let transcript = `# Gemini AI Coach - Conversation Transcript\n\n`;
        transcript += `**Date:** ${new Date().toLocaleString()}\n`;
        transcript += `**Role Directive:** ${chatRoleSelect ? chatRoleSelect.options[chatRoleSelect.selectedIndex].text : 'IELTS Coach'}\n`;
        transcript += `**Model:** ${chatModelSelect?.value || 'gemini-3.8-flash'}\n\n---\n\n`;

        chatHistory.forEach(msg => {
            const speaker = msg.role === 'user' ? '### 👤 You' : '### 🤖 Gemini Coach';
            transcript += `${speaker}\n\n${msg.content}\n\n`;
        });

        const blob = new Blob([transcript], { type: 'text/markdown;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chat-transcript-${new Date().toISOString().slice(0, 10)}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('Transcript exported as Markdown');
    });

    // Auto-resize Chat Input Textarea
    chatInputTextarea?.addEventListener('input', () => {
        chatInputTextarea.style.height = 'auto';
        chatInputTextarea.style.height = Math.min(chatInputTextarea.scrollHeight, 160) + 'px';
    });

    // Enter to Send, Shift+Enter for New Line
    chatInputTextarea?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendChatMessage();
        }
    });

    btnChatSend?.addEventListener('click', () => {
        sendChatMessage();
    });

    btnChatStop?.addEventListener('click', () => {
        if (chatActiveAbortController) {
            chatActiveAbortController.abort();
            chatActiveAbortController = null;
            showToast('Response stopped');
            finishChatStreaming();
        }
    });

    // Quick Chips click handlers
    chatQuickChips?.addEventListener('click', (e) => {
        const chip = e.target.closest('.quick-chip');
        if (!chip) return;
        const prompt = chip.getAttribute('data-prompt');
        if (prompt && chatInputTextarea) {
            chatInputTextarea.value = prompt;
            sendChatMessage();
        }
    });

    // Append Message to UI
    function appendChatMessageToUI(role, content, isStreaming = false) {
        // Remove welcome card if present
        const welcomeCard = document.getElementById('chat-welcome-card');
        if (welcomeCard) welcomeCard.remove();

        const messageRow = document.createElement('div');
        messageRow.className = `chat-message-row ${role}`;

        const isUser = role === 'user';
        const roleLabel = isUser ? 'You' : 'Gemini Coach';
        const avatarText = isUser ? 'ME' : 'AI';

        messageRow.innerHTML = `
            <div class="message-avatar" title="${roleLabel}">${avatarText}</div>
            <div class="message-body-wrapper">
                <div class="message-meta">
                    <span class="message-role-tag">${roleLabel}</span>
                    <span class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div class="message-bubble rendered-markdown-body">
                    ${isStreaming ? '<span class="streaming-content"></span><span class="streaming-cursor"></span>' : renderMarkdownToHtml(content)}
                </div>
                ${!isUser && !isStreaming ? `
                    <div class="message-actions-bar">
                        <button type="button" class="msg-action-btn btn-copy-msg" title="Copy message">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                            </svg>
                            <span>Copy</span>
                        </button>
                    </div>
                ` : ''}
            </div>
        `;

        // Wire copy button
        messageRow.querySelector('.btn-copy-msg')?.addEventListener('click', (e) => {
            navigator.clipboard.writeText(content).then(() => {
                showToast('Message copied to clipboard');
            });
        });

        chatMessagesContainer.appendChild(messageRow);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
        return messageRow;
    }

    function finishChatStreaming() {
        if (btnChatSend) btnChatSend.style.display = 'inline-flex';
        if (btnChatStop) btnChatStop.style.display = 'none';
        if (chatInputTextarea) chatInputTextarea.disabled = false;
        document.querySelectorAll('.streaming-cursor').forEach(c => c.remove());
    }

    // Send Message to Gemini Chat API
    async function sendChatMessage() {
        const text = chatInputTextarea?.value.trim();
        if (!text) return;

        // Reset input textarea
        chatInputTextarea.value = '';
        chatInputTextarea.style.height = 'auto';

        // Check if document context needs to be prefixed
        let messageToSend = text;
        if (isAttachedDocActive && chatAttachedDocData) {
            messageToSend = `[Context Attached: "${chatAttachedDocData.title}"]\nDocument Path: ${chatAttachedDocData.path}\n\nDocument Content Excerpt:\n"""\n${chatAttachedDocData.rawMarkdown.substring(0, 3500)}\n"""\n\nUser Question:\n${text}`;
        }

        // Add user message to history & UI
        chatHistory.push({ role: 'user', content: messageToSend });
        appendChatMessageToUI('user', text);

        // Prepare UI for streaming assistant response
        if (btnChatSend) btnChatSend.style.display = 'none';
        if (btnChatStop) btnChatStop.style.display = 'inline-flex';
        if (chatInputTextarea) chatInputTextarea.disabled = true;

        const assistantRow = appendChatMessageToUI('model', '', true);
        const streamingContentEl = assistantRow.querySelector('.streaming-content');
        const bubbleEl = assistantRow.querySelector('.message-bubble');

        let fullAssistantReply = '';
        const model = chatModelSelect?.value || 'gemini-3-flash-preview';

        chatActiveAbortController = new AbortController();

        try {
            // First attempt: Server-Sent Events (SSE) streaming endpoint
            const res = await fetch('/api/chat/stream', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                signal: chatActiveAbortController.signal,
                body: JSON.stringify({
                    messages: chatHistory,
                    model: model,
                    systemInstruction: activeSystemInstruction
                })
            });

            if (!res.ok) {
                // If stream returns an error status (e.g., 403 / 500), parse error payload
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP ${res.status}: ${res.statusText}`);
            }

            const reader = res.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let buffer = '';
            let streamError = null;

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop(); // Keep partial line in buffer

                for (const line of lines) {
                    const trimmed = line.trim();
                    if (trimmed.startsWith('data:')) {
                        const jsonStr = trimmed.replace('data:', '').trim();
                        if (!jsonStr) continue;
                        let data = null;
                        try {
                            data = JSON.parse(jsonStr);
                        } catch (parseErr) {
                            console.warn('Error parsing SSE chunk:', parseErr);
                            continue;
                        }
                        if (data.error) {
                            streamError = new Error(data.error);
                            break;
                        }
                        if (data.activeModel) {
                            console.log(`[Gemini Coach] Responding with model: ${data.activeModel}`);
                        }
                        if (data.text) {
                            fullAssistantReply += data.text;
                            if (streamingContentEl) {
                                streamingContentEl.innerHTML = renderMarkdownToHtml(fullAssistantReply);
                            }
                            chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
                        }
                    }
                }
                if (streamError) break;
            }

            if (streamError) {
                throw streamError;
            }

            // Fallback: If streaming ended without output, gracefully try standard /api/chat endpoint
            if (!fullAssistantReply.trim()) {
                console.log('[Gemini Coach] SSE stream produced no content. Invoking fallback /api/chat endpoint...');
                if (streamingContentEl) {
                    streamingContentEl.innerHTML = '<span style="color: var(--text-muted); font-style: italic;">Generating response...</span>';
                }
                const fallbackRes = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    signal: chatActiveAbortController?.signal,
                    body: JSON.stringify({
                        messages: chatHistory,
                        model: model,
                        systemInstruction: activeSystemInstruction
                    })
                });
                const fallbackData = await fallbackRes.json();
                if (!fallbackRes.ok || !fallbackData.success) {
                    throw new Error(fallbackData.error || `HTTP ${fallbackRes.status}: Failed to receive response`);
                }
                fullAssistantReply = fallbackData.text || '';
            }

            if (!fullAssistantReply.trim()) {
                throw new Error('The Gemini Coach returned an empty response. Please try again.');
            }

            // Stream completed successfully
            chatHistory.push({ role: 'model', content: fullAssistantReply });
            if (bubbleEl) {
                bubbleEl.innerHTML = renderMarkdownToHtml(fullAssistantReply);
            }

            // Add copy button
            const wrapper = assistantRow.querySelector('.message-body-wrapper');
            if (wrapper) {
                const actionsBar = document.createElement('div');
                actionsBar.className = 'message-actions-bar';
                actionsBar.innerHTML = `
                    <button type="button" class="msg-action-btn btn-copy-msg" title="Copy message">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                        </svg>
                        <span>Copy</span>
                    </button>
                `;
                actionsBar.querySelector('.btn-copy-msg')?.addEventListener('click', () => {
                    navigator.clipboard.writeText(fullAssistantReply).then(() => showToast('Message copied'));
                });
                wrapper.appendChild(actionsBar);
            }

        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('Stream generation aborted by user.');
                if (!fullAssistantReply) {
                    assistantRow.remove();
                }
            } else {
                console.error('Chat error:', err);
                const isPermissionError = err.message.includes('denied') || err.message.includes('403') || err.message.includes('PERMISSION_DENIED');
                let errHtml = `
                    <div style="color: #fca5a5; padding: 0.4rem 0;">
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem; font-weight: 600;">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            <span>Coach Response Error</span>
                        </div>
                        <p style="margin: 0.3rem 0; font-size: 0.84rem; line-height: 1.4;">${escapeHtml(err.message)}</p>
                `;
                if (isPermissionError) {
                    errHtml += `
                        <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.35); border-radius: 8px; padding: 0.75rem; margin-top: 0.6rem; font-size: 0.8rem; color: #fecaca;">
                            <strong>Note on Project Permissions:</strong> The server's GEMINI_API_KEY is configured, but Google Cloud returned <code>PERMISSION_DENIED</code>. Ensure that the Gemini API is enabled in your Google Cloud / AI Studio project and the billing/quota tier is active.
                        </div>
                    `;
                }
                errHtml += `
                        <button type="button" class="btn-retry-chat-inline" style="margin-top: 0.6rem; display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.35rem 0.75rem; border-radius: 6px; background: rgba(239, 68, 68, 0.2); border: 1px solid rgba(239, 68, 68, 0.4); color: #fee2e2; font-size: 0.8rem; cursor: pointer;">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                                <path d="M21 3v5h-5"></path>
                                <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                                <path d="M3 21v-5h5"></path>
                            </svg>
                            <span>Retry Question</span>
                        </button>
                    </div>
                `;
                if (bubbleEl) {
                    bubbleEl.innerHTML = errHtml;
                    bubbleEl.querySelector('.btn-retry-chat-inline')?.addEventListener('click', () => {
                        assistantRow.remove();
                        if (chatHistory.length && chatHistory[chatHistory.length - 1].role === 'user') {
                            chatHistory.pop();
                        }
                        if (chatInputTextarea) {
                            chatInputTextarea.value = text;
                        }
                        sendChatMessage();
                    });
                }
            }
        } finally {
            chatActiveAbortController = null;
            finishChatStreaming();
            chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
        }
    }

    // Reader Toolbar "Ask AI" button handler
    btnAskAiReader?.addEventListener('click', () => {
        switchView('chat');
        toggleAttachDoc(true);
        if (chatInputTextarea) {
            chatInputTextarea.value = 'Please provide a comprehensive study guide for this lesson: highlight key grammatical formulas, breakdown high-yield vocabulary with collocations, and give 3 practice sentences.';
            chatInputTextarea.focus();
        }
    });

    // =========================================================================
    // 7. LIVE VOICE CONVERSATIONS (gemini-3.8-live WebSockets & Web Audio)
    // =========================================================================
    const voicePickerSelect = document.getElementById('voice-picker-select');
    const voiceScenarioSelect = document.getElementById('voice-scenario-select');
    const voiceStatusPill = document.getElementById('voice-connection-status');
    const voiceStatusLabel = document.getElementById('voice-status-label');
    const voiceWaveformCanvas = document.getElementById('voice-waveform-canvas');
    const voiceOrbBtn = document.getElementById('btn-voice-toggle');
    const voiceOrbLabel = document.getElementById('voice-orb-label');
    const voiceControlsRow = document.getElementById('voice-controls-row');
    const btnVoiceMute = document.getElementById('btn-voice-mute');
    const btnVoiceMuteText = document.getElementById('btn-voice-mute-text');
    const btnVoiceInterrupt = document.getElementById('btn-voice-interrupt');
    const btnVoiceEnd = document.getElementById('btn-voice-end');
    const voiceTranscriptFeed = document.getElementById('voice-transcript-feed');
    const btnClearVoiceTranscript = document.getElementById('btn-clear-voice-transcript');
    const voiceTextInput = document.getElementById('voice-text-input');
    const btnVoiceTextSend = document.getElementById('btn-voice-text-send');

    const voiceStage = document.querySelector('.voice-stage');

    let voiceWs = null;
    let voiceAudioCtx = null;
    let voiceMediaStream = null;
    let voiceAudioProcessor = null;
    let voiceAudioSource = null;
    let isVoiceConnected = false;
    let isVoiceMuted = false;
    let nextAudioPlayTime = 0;
    let audioScheduledSources = [];
    let canvasAnimationId = null;

    // Visualizer Audio Analyser
    let audioAnalyser = null;
    let analyserDataArray = null;

    // Live Scenario Prompt Definitions
    const VOICE_SCENARIOS = {
        'performance-review': `You are an Executive Engineering Director in a formal year-end performance review with the user.
The user is arguing for a 25% compensation increase based on their data engineering leadership, pipeline optimization, and mentoring.
Your persona: Professional, exacting, articulate, and discerning.
Speak in short, conversational turns (1 to 2 sentences) to simulate realistic back-and-forth speech.
Ask probing questions about latency benchmarks, stakeholder buy-in, and ROI.`,

        'ielts-speaking': `You are a certified senior IELTS Speaking Examiner.
Conduct an official Part 3 discussion on the topic of "Technological Innovation, Big Data, and the Future of Human Labor".
Speak naturally, asking one thought-provoking question at a time.
Maintain authentic IELTS examiner intonation and conversational pacing.`,

        'grammar-drills': `You are a fast-paced English sentence transformation trainer.
Provide a standard sentence and challenge the user to transform it on the fly using either:
1. A Cleft sentence (e.g., 'What really saved the project was...')
2. Negative Inversion (e.g., 'Not only did we...')
Evaluate their spoken answer immediately, give praise or correction, and present the next sentence.`,

        'free-conversation': `You are a friendly, articulate native English conversationalist.
Discuss books, running, habit formation, technology, and life philosophies with warmth, humor, and intellectual curiosity.`
    };

    function updateVoiceStatus(status, label) {
        if (!voiceStatusPill || !voiceStatusLabel) return;
        voiceStatusPill.className = `voice-status-pill status-${status}`;
        voiceStatusLabel.textContent = label;

        if (voiceStage) {
            voiceStage.classList.remove('listening', 'speaking');
            if (status === 'listening') voiceStage.classList.add('listening');
            if (status === 'speaking') voiceStage.classList.add('speaking');
        }

        if (voiceOrbLabel) {
            if (status === 'idle') voiceOrbLabel.textContent = 'Click to Start Conversation';
            else if (status === 'connecting') voiceOrbLabel.textContent = 'Connecting to Gemini Live...';
            else if (status === 'listening') voiceOrbLabel.textContent = 'Listening (Speak freely)';
            else if (status === 'speaking') voiceOrbLabel.textContent = 'Gemini is speaking...';
        }
    }

    // Downsample PCM buffer from any mic rate (e.g. 44100 / 48000) to 16000Hz
    function downsampleBuffer(buffer, inputSampleRate, outputSampleRate = 16000) {
        if (inputSampleRate === outputSampleRate) return buffer;
        const sampleRateRatio = inputSampleRate / outputSampleRate;
        const newLength = Math.round(buffer.length / sampleRateRatio);
        const result = new Float32Array(newLength);
        let offsetResult = 0;
        let offsetBuffer = 0;
        while (offsetResult < result.length) {
            const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
            let accum = 0, count = 0;
            for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
                accum += buffer[i];
                count++;
            }
            result[offsetResult] = count > 0 ? accum / count : 0;
            offsetResult++;
            offsetBuffer = nextOffsetBuffer;
        }
        return result;
    }

    // Convert Float32Array [-1.0, 1.0] to base64 16-bit linear PCM
    function floatTo16BitPCMBase64(floatSamples) {
        const pcm16 = new Int16Array(floatSamples.length);
        for (let i = 0; i < floatSamples.length; i++) {
            const s = Math.max(-1, Math.min(1, floatSamples[i]));
            pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }
        const bytes = new Uint8Array(pcm16.buffer);
        let binary = '';
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }

    // Decode Base64 24kHz PCM to Float32Array
    function base64PCM24kToFloat(base64) {
        const binary = atob(base64);
        const len = binary.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        const int16 = new Int16Array(bytes.buffer);
        const floatSamples = new Float32Array(int16.length);
        for (let i = 0; i < int16.length; i++) {
            floatSamples[i] = int16[i] / 32768.0;
        }
        return floatSamples;
    }

    // Schedule 24kHz PCM Audio Playback seamlessly
    function scheduleAudioChunk(floatSamples) {
        if (!voiceAudioCtx) return;

        const audioBuffer = voiceAudioCtx.createBuffer(1, floatSamples.length, 24000);
        audioBuffer.copyToChannel(floatSamples, 0);

        const source = voiceAudioCtx.createBufferSource();
        source.buffer = audioBuffer;

        if (audioAnalyser) {
            source.connect(audioAnalyser);
            audioAnalyser.connect(voiceAudioCtx.destination);
        } else {
            source.connect(voiceAudioCtx.destination);
        }

        const now = voiceAudioCtx.currentTime;
        const startTime = Math.max(now, nextAudioPlayTime);
        source.start(startTime);
        nextAudioPlayTime = startTime + audioBuffer.duration;

        audioScheduledSources.push(source);
        updateVoiceStatus('speaking', 'Gemini Speaking...');

        source.onended = () => {
            const index = audioScheduledSources.indexOf(source);
            if (index !== -1) audioScheduledSources.splice(index, 1);
            if (audioScheduledSources.length === 0 && voiceWs && voiceWs.readyState === WebSocket.OPEN) {
                updateVoiceStatus('listening', 'Listening (Speak now)');
            }
        };
    }

    // Clear all playing audio buffers (e.g. on interrupt)
    function stopAllPlayingAudio() {
        audioScheduledSources.forEach(s => {
            try { s.stop(); } catch (e) {}
        });
        audioScheduledSources = [];
        if (voiceAudioCtx) {
            nextAudioPlayTime = voiceAudioCtx.currentTime;
        }
    }

    // Add Live Voice Transcript bubble
    function appendVoiceTranscript(role, text) {
        if (!voiceTranscriptFeed || !text) return;

        // Clear empty state if present
        const emptyState = voiceTranscriptFeed.querySelector('.transcript-empty-state');
        if (emptyState) emptyState.remove();

        const bubble = document.createElement('div');
        bubble.className = `transcript-bubble ${role}`;
        const speaker = role === 'user' ? 'You' : 'Gemini 3.8 Live';

        bubble.innerHTML = `
            <span class="transcript-speaker">${speaker}</span>
            <span class="transcript-text">${escapeHtml(text)}</span>
        `;
        voiceTranscriptFeed.appendChild(bubble);
        voiceTranscriptFeed.scrollTop = voiceTranscriptFeed.scrollHeight;
    }

    // Waveform Visualizer on Canvas
    function initWaveformVisualizer() {
        if (!voiceWaveformCanvas) return;
        const ctx = voiceWaveformCanvas.getContext('2d');
        const width = voiceWaveformCanvas.width;
        const height = voiceWaveformCanvas.height;

        let phase = 0;

        function drawWaveform() {
            canvasAnimationId = requestAnimationFrame(drawWaveform);
            ctx.clearRect(0, 0, width, height);

            let amplitude = 0.08;
            if (audioAnalyser && analyserDataArray) {
                audioAnalyser.getByteFrequencyData(analyserDataArray);
                let sum = 0;
                for (let i = 0; i < analyserDataArray.length; i++) {
                    sum += analyserDataArray[i];
                }
                const avg = sum / analyserDataArray.length;
                amplitude = Math.max(0.08, (avg / 255) * 0.9);
            }

            ctx.lineWidth = 3;
            ctx.lineCap = 'round';

            // Draw multi-layer glowing sine waves
            const waves = [
                { color: 'rgba(59, 130, 246, 0.75)', freq: 0.02, speed: 0.04, ampMult: 1.0 },
                { color: 'rgba(139, 92, 246, 0.65)', freq: 0.03, speed: -0.03, ampMult: 0.75 },
                { color: 'rgba(16, 185, 129, 0.55)', freq: 0.015, speed: 0.025, ampMult: 0.5 }
            ];

            waves.forEach(w => {
                ctx.beginPath();
                ctx.strokeStyle = w.color;
                for (let x = 0; x < width; x++) {
                    const y = height / 2 + Math.sin(x * w.freq + phase * w.speed) * (height * 0.35 * amplitude * w.ampMult);
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            });

            phase += 1;
        }

        if (canvasAnimationId) cancelAnimationFrame(canvasAnimationId);
        drawWaveform();
    }

    // Start Live Voice Connection
    async function startVoiceConversation() {
        if (isVoiceConnected) {
            disconnectVoice();
            return;
        }

        updateVoiceStatus('connecting', 'Connecting...');
        try {
            // 1. Request Microphone access
            voiceMediaStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    channelCount: 1,
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                }
            });

            // 2. Initialize Web Audio Context
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            voiceAudioCtx = new AudioCtx();
            if (voiceAudioCtx.state === 'suspended') {
                await voiceAudioCtx.resume();
            }

            audioAnalyser = voiceAudioCtx.createAnalyser();
            audioAnalyser.fftSize = 64;
            analyserDataArray = new Uint8Array(audioAnalyser.frequencyBinCount);

            // Connect mic to analyser & script processor
            voiceAudioSource = voiceAudioCtx.createMediaStreamSource(voiceMediaStream);
            voiceAudioSource.connect(audioAnalyser);

            const bufferSize = 4096;
            voiceAudioProcessor = voiceAudioCtx.createScriptProcessor(bufferSize, 1, 1);

            voiceAudioProcessor.onaudioprocess = (e) => {
                if (!isVoiceConnected || isVoiceMuted || !voiceWs || voiceWs.readyState !== WebSocket.OPEN) return;
                const inputSamples = e.inputBuffer.getChannelData(0);
                const downsampled = downsampleBuffer(inputSamples, voiceAudioCtx.sampleRate, 16000);
                const base64Pcm = floatTo16BitPCMBase64(downsampled);
                voiceWs.send(JSON.stringify({ type: 'audio', audio: base64Pcm }));
            };

            voiceAudioSource.connect(voiceAudioProcessor);
            voiceAudioProcessor.connect(voiceAudioCtx.destination);

            // 3. Connect to Backend WebSocket
            const selectedVoice = voicePickerSelect?.value || 'Zephyr';
            const selectedScenario = voiceScenarioSelect?.value || 'performance-review';
            const instruction = VOICE_SCENARIOS[selectedScenario] || VOICE_SCENARIOS['performance-review'];

            const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
            const wsUrl = `${protocol}//${window.location.host}/api/live?voice=${encodeURIComponent(selectedVoice)}&instruction=${encodeURIComponent(instruction)}`;

            voiceWs = new WebSocket(wsUrl);

            voiceWs.onopen = () => {
                isVoiceConnected = true;
                if (voiceControlsRow) voiceControlsRow.style.display = 'flex';
                updateVoiceStatus('listening', 'Connected • Listening (Speak now)');
                initWaveformVisualizer();
                showToast('Voice session connected');
            };

            voiceWs.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.type === 'ready') {
                        updateVoiceStatus('listening', 'Listening (Speak now)');
                    } else if (data.type === 'audio' && data.audio) {
                        const floatSamples = base64PCM24kToFloat(data.audio);
                        scheduleAudioChunk(floatSamples);
                    } else if (data.type === 'outputTranscription' && data.text) {
                        appendVoiceTranscript('model', data.text);
                    } else if (data.type === 'inputTranscription' && data.text) {
                        appendVoiceTranscript('user', data.text);
                    } else if (data.type === 'interrupted') {
                        stopAllPlayingAudio();
                        updateVoiceStatus('listening', 'Listening (Speak now)');
                    } else if (data.type === 'turnComplete') {
                        if (audioScheduledSources.length === 0) {
                            updateVoiceStatus('listening', 'Listening (Speak now)');
                        }
                    } else if (data.type === 'error') {
                        console.error('Live session server error:', data.error);
                        appendVoiceTranscript('model', `⚠️ Error: ${data.error}`);
                        showToast(`Voice error: ${data.error}`);
                    }
                } catch (err) {
                    console.error('Error handling live ws message:', err);
                }
            };

            voiceWs.onerror = (err) => {
                console.error('Voice WebSocket error:', err);
                updateVoiceStatus('idle', 'Connection Error');
                showToast('Voice connection failed');
                disconnectVoice();
            };

            voiceWs.onclose = () => {
                disconnectVoice();
                updateVoiceStatus('idle', 'Disconnected');
            };

        } catch (err) {
            console.error('Failed to start voice session:', err);
            updateVoiceStatus('idle', 'Microphone Denied');
            alert(`Microphone access error: ${err.message}. Please allow microphone permissions in your browser.`);
            disconnectVoice();
        }
    }

    // Cleanly Disconnect Voice Session
    function disconnectVoice() {
        isVoiceConnected = false;
        isVoiceMuted = false;
        stopAllPlayingAudio();

        if (canvasAnimationId) {
            cancelAnimationFrame(canvasAnimationId);
            canvasAnimationId = null;
        }

        if (voiceAudioProcessor) {
            try { voiceAudioProcessor.disconnect(); } catch (e) {}
            voiceAudioProcessor = null;
        }

        if (voiceAudioSource) {
            try { voiceAudioSource.disconnect(); } catch (e) {}
            voiceAudioSource = null;
        }

        if (voiceMediaStream) {
            voiceMediaStream.getTracks().forEach(t => t.stop());
            voiceMediaStream = null;
        }

        if (voiceAudioCtx) {
            try { voiceAudioCtx.close(); } catch (e) {}
            voiceAudioCtx = null;
        }

        if (voiceWs) {
            try { voiceWs.close(); } catch (e) {}
            voiceWs = null;
        }

        if (voiceControlsRow) voiceControlsRow.style.display = 'none';
        updateVoiceStatus('idle', 'Ready to Connect');
    }

    voiceOrbBtn?.addEventListener('click', () => {
        startVoiceConversation();
    });

    btnVoiceMute?.addEventListener('click', () => {
        isVoiceMuted = !isVoiceMuted;
        if (btnVoiceMuteText) btnVoiceMuteText.textContent = isVoiceMuted ? 'Unmute Mic' : 'Mute Mic';
        btnVoiceMute?.classList.toggle('active', isVoiceMuted);
        showToast(isVoiceMuted ? 'Microphone muted' : 'Microphone unmuted');
    });

    btnVoiceInterrupt?.addEventListener('click', () => {
        stopAllPlayingAudio();
        if (voiceWs && voiceWs.readyState === WebSocket.OPEN) {
            // Signal turn interrupt to live session
            voiceWs.send(JSON.stringify({ type: 'text', text: '[User interrupted]' }));
        }
        updateVoiceStatus('listening', 'Interrupted • Listening');
        showToast('Interrupted model');
    });

    btnVoiceEnd?.addEventListener('click', () => {
        disconnectVoice();
        showToast('Call ended');
    });

    btnClearVoiceTranscript?.addEventListener('click', () => {
        if (!voiceTranscriptFeed) return;
        voiceTranscriptFeed.innerHTML = `
            <div class="transcript-empty-state">
                <p>Real-time speech transcripts from you and Gemini will appear here as you speak.</p>
                <span class="transcript-tip">💡 Tip: Speak naturally. Gemini responds in 24kHz real-time audio with low latency.</span>
            </div>
        `;
    });

    // Voice Fallback Text Input
    function sendVoiceTextMessage() {
        const text = voiceTextInput?.value.trim();
        if (!text) return;
        voiceTextInput.value = '';

        appendVoiceTranscript('user', text);

        if (voiceWs && voiceWs.readyState === WebSocket.OPEN) {
            voiceWs.send(JSON.stringify({ type: 'text', text }));
            stopAllPlayingAudio();
        } else {
            showToast('Voice session not connected. Connect first.');
        }
    }

    voiceTextInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendVoiceTextMessage();
        }
    });

    btnVoiceTextSend?.addEventListener('click', () => {
        sendVoiceTextMessage();
    });

    // Reader Toolbar "Voice" button handler
    btnVoiceReader?.addEventListener('click', () => {
        switchView('voice');
        showToast('Ready to start Live Voice session for this lesson');
    });

    // Initialize Chat Welcome Card on start
    renderChatWelcome();

    // Initialize Reader
    loadDocumentsList();
});
