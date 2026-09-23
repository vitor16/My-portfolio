/**
 * ==========================================================================
 * APPLE LIQUID GLASS PORTFOLIO APPLICATION CORE
 * ==========================================================================
 */

class PortfolioApp {
    constructor() {
        this.data = window.portfolioData || {};
        this.currentTab = 'home';
        this.isMuted = false;
        this.audioCtx = null;
        this.carouselStates = {};
        this.terminalHistory = [];
        this.terminalHistoryIndex = -1;

        this.init();
    }

    init() {
        this.setupAudio();
        this.setupTheme();
        this.setupNavigation();
        this.setupGlareEffect();
        this.renderAll();
        this.setupTerminal();
        this.setupModals();
        this.setupContactForm();
        this.handleHashChange();

        window.addEventListener('hashchange', () => this.handleHashChange());
        window.addEventListener('resize', () => this.updateActivePill(false));
    }

    /* --------------------------------------------------------------------------
       1. WEB AUDIO API SYNTHESIZER FOR TACTILE HAPTICS
       -------------------------------------------------------------------------- */
    setupAudio() {
        const audioBtn = document.getElementById('audio-toggle-btn');
        const savedMute = localStorage.getItem('liquid_portfolio_muted');
        
        if (savedMute === 'true') {
            this.isMuted = true;
            document.body.classList.add('is-muted');
        }

        if (audioBtn) {
            audioBtn.addEventListener('click', () => {
                this.isMuted = !this.isMuted;
                localStorage.setItem('liquid_portfolio_muted', this.isMuted);
                document.body.classList.toggle('is-muted', this.isMuted);
                if (!this.isMuted) {
                    this.playHapticSound(900, 0.04);
                    this.showToast("Sound effects enabled 🔊");
                } else {
                    this.showToast("Sound effects muted 🔇");
                }
            });
        }
    }

    playHapticSound(freq = 820, duration = 0.035) {
        if (this.isMuted) return;
        try {
            if (!this.audioCtx) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                this.audioCtx = new AudioCtx();
            }
            if (this.audioCtx.state === 'suspended') {
                this.audioCtx.resume();
            }

            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(140, this.audioCtx.currentTime + duration);

            gain.gain.setValueAtTime(0.06, this.audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

            osc.connect(gain);
            gain.connect(this.audioCtx.destination);

            osc.start();
            osc.stop(this.audioCtx.currentTime + duration);
        } catch (e) {
            // Audio context not allowed or unsupported
        }
    }

    /* --------------------------------------------------------------------------
       2. THEME CONTROLLER (LIGHT / DARK)
       -------------------------------------------------------------------------- */
    setupTheme() {
        const themeBtn = document.getElementById('theme-btn');
        const root = document.documentElement;

        // Determine initial theme (localStorage or prefers-color-scheme)
        const savedTheme = localStorage.getItem('liquid_portfolio_theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (systemDark ? 'dark' : 'light');

        root.setAttribute('data-theme', initialTheme);

        if (themeBtn) {
            themeBtn.addEventListener('click', () => {
                const currentTheme = root.getAttribute('data-theme');
                const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
                root.setAttribute('data-theme', nextTheme);
                localStorage.setItem('liquid_portfolio_theme', nextTheme);
                this.playHapticSound(600, 0.05);

                setTimeout(() => {
                    this.updateActivePill(false);
                }, 80);
            });
        }
    }

    /* --------------------------------------------------------------------------
       3. NAVIGATION & LIQUID SPRING PILL
       -------------------------------------------------------------------------- */
    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');

        navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');
                if (targetTab) {
                    this.switchTab(targetTab);
                    window.location.hash = targetTab;
                    this.playHapticSound(750, 0.03);
                }
            });
        });

        // Initial pill alignment
        setTimeout(() => {
            this.updateActivePill(false);
        }, 100);
    }

    updateActivePill(smooth = true) {
        const activeBtn = document.querySelector('.nav-btn.active');
        const activePill = document.getElementById('active-pill');
        if (!activeBtn || !activePill) return;

        if (!smooth) {
            activePill.style.transition = 'none';
        } else {
            activePill.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.2, 0.64, 1), width 0.5s cubic-bezier(0.34, 1.2, 0.64, 1), background 0.5s ease, box-shadow 0.5s ease';
        }

        activePill.style.width = `${activeBtn.offsetWidth}px`;
        activePill.style.transform = `translateX(${activeBtn.offsetLeft}px)`;
    }

    switchTab(tabId) {
        this.currentTab = tabId;

        // Update nav buttons
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            if (btn.getAttribute('data-tab') === tabId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        this.updateActivePill(true);

        // Update Tab Panes
        const tabPanes = document.querySelectorAll('.tab-pane');
        tabPanes.forEach(pane => {
            if (pane.id === `tab-${tabId}`) {
                pane.classList.add('active');
            } else {
                pane.classList.remove('active');
            }
        });

        // Trigger animations for specific views
        if (tabId === 'skills') {
            this.animateSkillBars();
        }

        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    handleHashChange() {
        const hash = window.location.hash.replace('#', '');
        const validTabs = ['home', 'projects', 'skills', 'experience', 'contact'];
        if (hash && validTabs.includes(hash)) {
            this.switchTab(hash);
        } else {
            this.switchTab('home');
        }
    }

    /* --------------------------------------------------------------------------
       4. INTERACTIVE SPECULAR GLARE TRACKER
       -------------------------------------------------------------------------- */
    setupGlareEffect() {
        const nav = document.getElementById('nav');
        const glare = document.getElementById('glare');

        if (nav && glare) {
            nav.addEventListener('mousemove', (e) => {
                const rect = nav.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                glare.style.setProperty('--x', `${x}px`);
                glare.style.setProperty('--y', `${y}px`);
            });
        }

        // Track glare on all interactive glass cards
        document.querySelectorAll('.glass-card.interactive').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }

    /* --------------------------------------------------------------------------
       5. RENDER PORTFOLIO CONTENT FROM DATA
       -------------------------------------------------------------------------- */
    renderAll() {
        this.renderStats();
        this.renderSkillsStrip();
        this.renderProjects();
        this.renderSkillsMatrix();
        this.renderCodeSnippets();
        this.renderTimeline();
    }

    renderStats() {
        const statsGrid = document.getElementById('hero-stats-grid');
        if (!statsGrid || !this.data.stats) return;

        statsGrid.innerHTML = this.data.stats.map(stat => `
            <div class="stat-box">
                <div class="stat-number">${stat.value}</div>
                <div class="stat-label">${stat.label}</div>
            </div>
        `).join('');
    }

    renderSkillsStrip() {
        const strip = document.getElementById('hero-skills-strip');
        if (!strip || !this.data.quickStack) return;

        strip.innerHTML = this.data.quickStack.map(skill => `
            <span class="tech-tag">${skill}</span>
        `).join('');
    }

    /* --------------------------------------------------------------------------
       6. PROJECTS & MULTI-SLIDE RANDOM PHOTO CAROUSEL
       -------------------------------------------------------------------------- */
    renderProjects(categoryFilter = 'all') {
        const container = document.getElementById('projects-container');
        if (!container || !this.data.projects) return;

        const filtered = categoryFilter === 'all' 
            ? this.data.projects 
            : this.data.projects.filter(p => p.category === categoryFilter);

        container.innerHTML = filtered.map(project => {
            // Initialize carousel state
            this.carouselStates[project.id] = {
                currentSlide: 0,
                totalSlides: project.slides.length
            };

            const slidesHtml = project.slides.map((slide, idx) => `
                <div class="carousel-slide" data-index="${idx}">
                    <img src="${slide.url}" alt="${slide.caption}" loading="lazy">
                </div>
            `).join('');

            const indicatorsHtml = project.slides.map((_, idx) => `
                <div class="indicator-dot ${idx === 0 ? 'active' : ''}" data-project="${project.id}" data-slide="${idx}"></div>
            `).join('');

            const tagsHtml = project.tags.map(t => `<span class="tech-tag">${t}</span>`).join('');

            return `
                <div class="glass-card interactive project-card" data-project-id="${project.id}">
                    <!-- Carousel Slider Box -->
                    <div class="project-carousel" id="carousel-${project.id}">
                        <div class="carousel-badge">${project.categoryLabel}</div>
                        <button class="carousel-zoom-btn" title="View Full Case Study" onclick="app.openCaseStudyModal('${project.id}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>
                        </button>

                        <div class="carousel-track" id="track-${project.id}">
                            ${slidesHtml}
                        </div>

                        <button class="carousel-btn carousel-prev" onclick="app.prevSlide('${project.id}')" aria-label="Previous Slide">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        </button>
                        <button class="carousel-btn carousel-next" onclick="app.nextSlide('${project.id}')" aria-label="Next Slide">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </button>

                        <div class="carousel-indicators" id="indicators-${project.id}">
                            ${indicatorsHtml}
                        </div>
                    </div>

                    <!-- Project Metadata & Content -->
                    <div class="project-content">
                        <div class="project-title-row">
                            <div>
                                <h3 class="project-title">${project.title}</h3>
                                <p style="font-size:12.5px; color:var(--text-tertiary); margin-top:2px;">${project.subtitle}</p>
                            </div>
                        </div>

                        <p class="project-desc">${project.description}</p>

                        <div class="project-metrics">
                            ${project.metrics}
                        </div>

                        <div class="project-tags">
                            ${tagsHtml}
                        </div>

                        <div class="project-footer">
                            <button class="liquid-btn liquid-btn-glass liquid-btn-sm" onclick="app.openCaseStudyModal('${project.id}')">
                                Case Study
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </button>

                            <div class="project-links">
                                <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="icon-link" title="GitHub Repository">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                </a>
                                <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="icon-link" title="Live Interactive Demo">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        this.setupCarouselEvents();
        this.setupFilterButtons();
    }

    setupFilterButtons() {
        const buttons = document.querySelectorAll('.filter-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const cat = btn.getAttribute('data-filter');
                this.renderProjects(cat);
                this.playHapticSound(800, 0.02);
            });
        });
    }

    setupCarouselEvents() {
        // Dot indicator clicks
        document.querySelectorAll('.indicator-dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                const projectId = dot.getAttribute('data-project');
                const slideIndex = parseInt(dot.getAttribute('data-slide'), 10);
                this.goToSlide(projectId, slideIndex);
            });
        });

        // Touch swipe support on project carousels
        document.querySelectorAll('.project-carousel').forEach(carousel => {
            let touchStartX = 0;
            let touchEndX = 0;
            const projectId = carousel.id.replace('carousel-', '');

            carousel.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            carousel.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                if (touchStartX - touchEndX > 50) {
                    this.nextSlide(projectId);
                } else if (touchEndX - touchStartX > 50) {
                    this.prevSlide(projectId);
                }
            }, { passive: true });
        });
    }

    goToSlide(projectId, slideIndex) {
        const state = this.carouselStates[projectId];
        if (!state) return;

        state.currentSlide = slideIndex;
        const track = document.getElementById(`track-${projectId}`);
        if (track) {
            track.style.transform = `translateX(-${slideIndex * 100}%)`;
        }

        // Update dots
        const dots = document.querySelectorAll(`#indicators-${projectId} .indicator-dot`);
        dots.forEach((d, idx) => {
            if (idx === slideIndex) {
                d.classList.add('active');
            } else {
                d.classList.remove('active');
            }
        });
        this.playHapticSound(950, 0.02);
    }

    nextSlide(projectId) {
        const state = this.carouselStates[projectId];
        if (!state) return;
        const nextIdx = (state.currentSlide + 1) % state.totalSlides;
        this.goToSlide(projectId, nextIdx);
    }

    prevSlide(projectId) {
        const state = this.carouselStates[projectId];
        if (!state) return;
        const prevIdx = (state.currentSlide - 1 + state.totalSlides) % state.totalSlides;
        this.goToSlide(projectId, prevIdx);
    }

    /* --------------------------------------------------------------------------
       7. SKILLS MATRIX & PROGRESS BARS
       -------------------------------------------------------------------------- */
    renderSkillsMatrix() {
        const matrixContainer = document.getElementById('skills-matrix');
        if (!matrixContainer || !this.data.skills) return;

        const categories = Object.keys(this.data.skills);
        matrixContainer.innerHTML = categories.map(catKey => {
            const cat = this.data.skills[catKey];
            const itemsHtml = cat.items.map(item => `
                <div class="skill-item">
                    <div class="skill-item-header">
                        <span>${item.name}</span>
                        <span class="skill-pct">${item.exp} • ${item.level}%</span>
                    </div>
                    <div class="skill-progress-track">
                        <div class="skill-progress-fill" style="width: ${item.level}%"></div>
                    </div>
                </div>
            `).join('');

            return `
                <div class="glass-card skill-category-card">
                    <div class="skill-card-header">
                        <div class="skill-icon-bubble">
                            ${cat.icon}
                        </div>
                        <div>
                            <h3 class="skill-cat-title">${cat.title}</h3>
                            <p class="skill-cat-sub">${cat.subtitle}</p>
                        </div>
                    </div>
                    <div class="skill-bars-list">
                        ${itemsHtml}
                    </div>
                </div>
            `;
        }).join('');
    }

    animateSkillBars() {
        const fills = document.querySelectorAll('.skill-progress-fill');
        fills.forEach(fill => {
            const targetWidth = fill.style.width;
            fill.style.width = '0%';
            setTimeout(() => {
                fill.style.width = targetWidth;
            }, 100);
        });
    }

    /* --------------------------------------------------------------------------
       8. CODE SNIPPETS SHOWCASE
       -------------------------------------------------------------------------- */
    renderCodeSnippets() {
        const tabsContainer = document.getElementById('code-tabs');
        const codeDisplay = document.getElementById('code-display');
        const codeDesc = document.getElementById('code-desc');
        if (!tabsContainer || !this.data.codeSnippets) return;

        tabsContainer.innerHTML = this.data.codeSnippets.map((snippet, idx) => `
            <button class="code-tab-btn ${idx === 0 ? 'active' : ''}" data-snippet-id="${snippet.id}">
                ${snippet.tabTitle}
            </button>
        `).join('');

        const firstSnippet = this.data.codeSnippets[0];
        if (firstSnippet && codeDisplay) {
            codeDisplay.innerHTML = `<pre><code>${firstSnippet.code}</code></pre>`;
            if (codeDesc) codeDesc.textContent = firstSnippet.desc;
        }

        // Tab click events
        document.querySelectorAll('.code-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.code-tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const snippetId = btn.getAttribute('data-snippet-id');
                const target = this.data.codeSnippets.find(s => s.id === snippetId);
                if (target && codeDisplay) {
                    codeDisplay.innerHTML = `<pre><code>${target.code}</code></pre>`;
                    if (codeDesc) codeDesc.textContent = target.desc;
                    this.playHapticSound(900, 0.02);
                }
            });
        });
    }

    copyActiveCode() {
        const activeBtn = document.querySelector('.code-tab-btn.active');
        if (!activeBtn) return;
        const snippetId = activeBtn.getAttribute('data-snippet-id');
        const snippet = this.data.codeSnippets.find(s => s.id === snippetId);
        if (!snippet) return;

        // Strip HTML tags for clean clipboard
        const plainText = snippet.code.replace(/<[^>]*>?/gm, '');
        navigator.clipboard.writeText(plainText).then(() => {
            this.showToast('Code snippet copied to clipboard! 📋');
            this.playHapticSound(1000, 0.03);
        });
    }

    /* --------------------------------------------------------------------------
       9. CAREER TIMELINE
       -------------------------------------------------------------------------- */
    renderTimeline() {
        const timelineList = document.getElementById('timeline-list');
        if (!timelineList || !this.data.experience) return;

        timelineList.innerHTML = this.data.experience.map(item => `
            <div class="timeline-item">
                <div class="timeline-node"></div>
                <div class="glass-card timeline-card">
                    <div class="timeline-header">
                        <div>
                            <h3 class="timeline-role">${item.role}</h3>
                            <div class="timeline-company">${item.company} • ${item.location}</div>
                        </div>
                        <span class="timeline-period">${item.period}</span>
                    </div>
                    <p style="font-size:14px; color:var(--text-secondary); margin-bottom:12px;">${item.description}</p>
                    <ul class="timeline-duties">
                        ${item.achievements.map(a => `<li>${a}</li>`).join('')}
                    </ul>
                    <div class="project-tags" style="margin-top:16px;">
                        ${item.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    /* --------------------------------------------------------------------------
       10. INTERACTIVE TERMINAL WIDGET
       -------------------------------------------------------------------------- */
    setupTerminal() {
        const terminalInput = document.getElementById('terminal-input');
        const terminalBody = document.getElementById('terminal-body');
        if (!terminalInput || !terminalBody) return;

        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = terminalInput.value.trim();
                if (cmd) {
                    this.executeTerminalCommand(cmd);
                    this.terminalHistory.push(cmd);
                    this.terminalHistoryIndex = this.terminalHistory.length;
                    terminalInput.value = '';
                }
            } else if (e.key === 'ArrowUp') {
                if (this.terminalHistoryIndex > 0) {
                    this.terminalHistoryIndex--;
                    terminalInput.value = this.terminalHistory[this.terminalHistoryIndex] || '';
                }
            } else if (e.key === 'ArrowDown') {
                if (this.terminalHistoryIndex < this.terminalHistory.length - 1) {
                    this.terminalHistoryIndex++;
                    terminalInput.value = this.terminalHistory[this.terminalHistoryIndex] || '';
                } else {
                    this.terminalHistoryIndex = this.terminalHistory.length;
                    terminalInput.value = '';
                }
            }
        });

        // Quick chip clicks
        document.querySelectorAll('.chip-btn').forEach(chip => {
            chip.addEventListener('click', () => {
                const cmd = chip.getAttribute('data-cmd');
                if (cmd) {
                    this.executeTerminalCommand(cmd);
                }
            });
        });
    }

    executeTerminalCommand(cmdStr) {
        const terminalBody = document.getElementById('terminal-body');
        if (!terminalBody) return;

        const trimmed = cmdStr.toLowerCase().trim();
        const inputEcho = `
            <div class="terminal-line">
                <span class="prompt-prefix">vitor@dev ~ $</span>
                <span class="prompt-cmd">${this.escapeHtml(cmdStr)}</span>
            </div>
        `;

        let outputHtml = '';

        switch (trimmed) {
            case 'help':
                outputHtml = `
                    <div class="terminal-line" style="color:#a1a1a6;">Available commands:</div>
                    ${this.data.terminalHelp.map(h => `
                        <div class="terminal-line" style="display:flex; justify-content:space-between; max-width:520px;">
                            <span style="color:#64d2ff; font-weight:600;">${h.cmd}</span>
                            <span style="color:#8e8e93;">${h.desc}</span>
                        </div>
                    `).join('')}
                `;
                break;

            case 'about':
                outputHtml = `
                    <div class="terminal-line" style="color:#30d158;">👤 Sobre Vitor Matheus dos Santos Avelar:</div>
                    <div class="terminal-line">• Formação: Desenvolvimento de Sistemas no SENAI CTTI (início em 2025)</div>
                    <div class="terminal-line">• Experiência: Atendimento, operação e gestão de serviços nos Estados Unidos</div>
                    <div class="terminal-line">• Idiomas: Inglês fluente & Português nativo</div>
                    <div class="terminal-line">• Foco técnico: Hardware, Linux, Arch Linux, Hyprland, redes e servidores self-hosted</div>
                `;
                break;

            case 'education':
            case 'senai':
                outputHtml = `
                    <div class="terminal-line" style="color:#bf5af2;">🎓 Formação Acadêmica & Técnica:</div>
                    <div class="terminal-line">1. <strong>SENAI CTTI</strong> — Desenvolvimento de Sistemas (início em 2025, em andamento)</div>
                    <div class="terminal-line">2. <strong>High School Diploma</strong> — Instituição de ensino nos Estados Unidos (concluído)</div>
                `;
                break;

            case 'languages':
            case 'english':
                outputHtml = `
                    <div class="terminal-line" style="color:#64d2ff;">🌐 Idiomas & Proficiência:</div>
                    <div class="terminal-line">• <strong>Inglês:</strong> Fluente / Full Professional Proficiency (Leitura, Escrita e Conversação)</div>
                    <div class="terminal-line">• <strong>Português:</strong> Nativo</div>
                `;
                break;

            case 'skills':
            case 'python':
                outputHtml = `
                    <div class="terminal-line" style="color:#30d158;">⚡ Competências Técnicas Principais:</div>
                    <div class="terminal-line">• <strong>Infraestrutura:</strong> Servidores self-hosted, Jellyfin, redes e armazenamento</div>
                    <div class="terminal-line">• <strong>Hardware:</strong> Montagem, custo-benefício, gestão térmica e manutenção preventiva</div>
                    <div class="terminal-line">• <strong>Sistemas:</strong> Linux, Arch Linux, Hyprland, tiling window managers e automação</div>
                    <div class="terminal-line">• <strong>Interpessoal:</strong> Atendimento, organização, comunicação clara e resolução de problemas</div>
                `;
                break;

            case 'projects':
                outputHtml = `
                    <div class="terminal-line" style="color:#2997ff;">🚀 Top Engineering Projects:</div>
                    ${this.data.projects.map(p => `
                        <div class="terminal-line">
                            <strong style="color:#f5f5f7;">${p.title}</strong> — ${p.metrics}
                        </div>
                    `).join('')}
                `;
                break;

            case 'contact':
                outputHtml = `
                    <div class="terminal-line" style="color:#bf5af2;">📬 Direct Contact Channels:</div>
                    <div class="terminal-line">• Phone / WhatsApp: <a href="tel:+5531983224629" style="color:#64d2ff; text-decoration:underline;">+55 (31) 98322-4629</a></div>
                    <div class="terminal-line">• LinkedIn: <a href="${this.data.personal.socials.linkedin}" target="_blank" style="color:#64d2ff; text-decoration:underline;">linkedin.com/in/vitor-avelar-877619251</a></div>
                    <div class="terminal-line">• GitHub: <a href="${this.data.personal.socials.github}" target="_blank" style="color:#64d2ff; text-decoration:underline;">github.com/vitor16</a></div>
                `;
                break;

            case 'experience':
                outputHtml = `
                    <div class="terminal-line" style="color:#ff9f0a;">💼 Career History:</div>
                    ${this.data.experience.map(e => `
                        <div class="terminal-line">• ${e.role} @ ${e.company} (${e.period})</div>
                    `).join('')}
                `;
                break;

            case 'theme dark':
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('liquid_portfolio_theme', 'dark');
                outputHtml = `<div class="terminal-line" style="color:#30d158;">Theme switched to Dark mode 🌙</div>`;
                break;

            case 'theme light':
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('liquid_portfolio_theme', 'light');
                outputHtml = `<div class="terminal-line" style="color:#ff9f0a;">Theme switched to Light mode ☀️</div>`;
                break;

            case 'clear':
                terminalBody.innerHTML = '';
                return;

            default:
                outputHtml = `<div class="terminal-line" style="color:#ff453a;">command not found: "${this.escapeHtml(cmdStr)}". Type <span style="color:#64d2ff;">help</span> for commands.</div>`;
                break;
        }

        terminalBody.insertAdjacentHTML('beforeend', inputEcho + outputHtml);
        terminalBody.scrollTop = terminalBody.scrollHeight;
        this.playHapticSound(850, 0.02);
    }

    /* --------------------------------------------------------------------------
       11. CASE STUDY MODAL & RESUME MODAL
       -------------------------------------------------------------------------- */
    setupModals() {
        const overlay = document.getElementById('case-study-modal');
        const closeBtn = document.getElementById('modal-close-btn');

        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.closeCaseStudyModal();
                }
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeCaseStudyModal());
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeCaseStudyModal();
            }
        });
    }

    openCaseStudyModal(projectId) {
        const project = this.data.projects.find(p => p.id === projectId);
        if (!project) return;

        const modalBody = document.getElementById('modal-body-content');
        const modal = document.getElementById('case-study-modal');
        if (!modal || !modalBody) return;

        const galleryHtml = project.slides.map(s => `
            <div style="margin-bottom:18px; border-radius:16px; overflow:hidden; border:1px solid var(--glass-border);">
                <img src="${s.url}" alt="${s.caption}" style="width:100%; display:block;">
                <div style="padding:10px 16px; background:rgba(0,0,0,0.5); font-size:12.5px; color:#e0e0e0;">
                    ${s.caption}
                </div>
            </div>
        `).join('');

        modalBody.innerHTML = `
            <div style="padding:36px; background:var(--card-glass-bg); backdrop-filter:blur(50px); color:var(--text-primary);">
                <div style="margin-bottom:20px;">
                    <span class="preview-badge" style="margin-bottom:8px;">${project.categoryLabel}</span>
                    <h2 style="font-size:2rem; font-weight:800; letter-spacing:-0.03em;">${project.title}</h2>
                    <p style="font-size:1.1rem; color:var(--text-secondary); margin-top:4px;">${project.subtitle}</p>
                </div>

                <div class="project-metrics" style="margin-bottom:24px; display:inline-flex;">
                    ${project.metrics}
                </div>

                <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:30px;">
                    <div style="padding:20px; background:rgba(140,140,150,0.08); border-radius:16px; border:1px solid var(--glass-border-subtle);">
                        <h4 style="font-size:15px; font-weight:700; margin-bottom:8px; color:var(--accent-pink);">💥 Technical Challenge</h4>
                        <p style="font-size:14px; color:var(--text-secondary); line-height:1.6;">${project.caseStudy.challenge}</p>
                    </div>
                    <div style="padding:20px; background:rgba(140,140,150,0.08); border-radius:16px; border:1px solid var(--glass-border-subtle);">
                        <h4 style="font-size:15px; font-weight:700; margin-bottom:8px; color:var(--accent-blue);">🛠️ Architecture Solution</h4>
                        <p style="font-size:14px; color:var(--text-secondary); line-height:1.6;">${project.caseStudy.solution}</p>
                    </div>
                </div>

                <div style="padding:20px; background:rgba(52, 199, 89, 0.08); border-radius:16px; border:1px solid rgba(52, 199, 89, 0.3); margin-bottom:30px;">
                    <h4 style="font-size:15px; font-weight:700; margin-bottom:6px; color:var(--accent-green);">📈 Measured Impact</h4>
                    <p style="font-size:14px; color:var(--text-primary); line-height:1.6;">${project.caseStudy.results}</p>
                </div>

                <h3 style="font-size:1.25rem; font-weight:700; margin-bottom:16px;">Visual Gallery & Diagrams</h3>
                <div>${galleryHtml}</div>

                <div style="display:flex; gap:12px; margin-top:24px;">
                    <a href="${project.liveUrl}" target="_blank" class="liquid-btn liquid-btn-primary">
                        Visit Live Demo
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                    <a href="${project.githubUrl}" target="_blank" class="liquid-btn liquid-btn-glass">
                        Inspect Source Code
                    </a>
                </div>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.playHapticSound(900, 0.04);
    }

    closeCaseStudyModal() {
        const modal = document.getElementById('case-study-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            this.playHapticSound(700, 0.03);
        }
    }

    /* --------------------------------------------------------------------------
       12. CONTACT FORM & TOAST NOTIFICATIONS
       -------------------------------------------------------------------------- */
    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = `Sending...`;

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                form.reset();
                this.showToast('Message sent! I will respond within 24 hours 🚀');
                this.playHapticSound(1100, 0.05);
            }, 1200);
        });
    }

    copyEmail() {
        const email = this.data.personal.socials.email;
        navigator.clipboard.writeText(email).then(() => {
            this.showToast(`Copied ${email} to clipboard! 📬`);
            this.playHapticSound(950, 0.03);
        });
    }

    copyPhone() {
        const phone = this.data.personal.phone;
        navigator.clipboard.writeText(phone).then(() => {
            this.showToast(`Copied ${phone} to clipboard! 📞`);
            this.playHapticSound(950, 0.03);
        });
    }

    showToast(message) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <span class="toast-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </span>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(15px) scale(0.95)';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    escapeHtml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
}

// Instantiate on DOM load
document.addEventListener('DOMContentLoaded', () => {
    window.app = new PortfolioApp();
});
