/** Portfolio content based on Vitor Matheus dos Santos Avelar's curriculum. */
const portfolioData = {
    personal: {
        name: "Vitor Matheus dos Santos Avelar",
        title: "Técnico em Informática em transição para Tecnologia e Suporte Técnico",
        handle: "vitor-avelar-877619251",
        status: "Aberto a oportunidades em Tecnologia e Suporte Técnico",
        statusType: "active",
        location: "Belo Horizonte, MG",
        bio: "Profissional organizado, paciente e focado na excelência do atendimento e na resolução de problemas. Tenho vivência internacional nos Estados Unidos, inglês fluente e experiência prática com hardware, sistemas operacionais, servidores self-hosted e ambientes Linux.",
        experienceYears: "Vivência internacional",
        projectsDelivered: "3 áreas práticas",
        systemUptime: "Self-hosted",
        githubStars: "GitHub",
        avatarUrl: "assets/avatar.jpeg",
        resumePdf: "#",
        phone: "+55 (31) 98322-4629",
        whatsappUrl: "https://wa.me/5531983224629?text=Olá%20Vitor,%20vi%20seu%20portfólio!",
        socials: {
            github: "https://github.com/vitor16",
            linkedin: "https://linkedin.com/in/vitor-avelar-877619251",
            twitter: "#",
            email: "",
            phone: "+55 (31) 98322-4629",
            whatsapp: "https://wa.me/5531983224629?text=Olá%20Vitor,%20vi%20seu%20portfólio!",
            calendar: "#"
        }
    },
    stats: [
        { label: "Formação", value: "SENAI", change: "Em andamento desde 2025" },
        { label: "Experiência", value: "EUA", change: "Atendimento e operação" },
        { label: "Idiomas", value: "Inglês fluente", change: "Português nativo" },
        { label: "Foco", value: "Suporte técnico", change: "Hardware e Linux" }
    ],
    quickStack: ["Linux", "Arch Linux", "Hyprland", "Servidores self-hosted", "Jellyfin", "Redes", "Armazenamento", "Hardware", "Inglês fluente", "SENAI"],
    projects: [
        {
            id: "self-hosted-media", title: "Servidor de Mídia Self-Hosted", subtitle: "Infraestrutura local com Jellyfin e armazenamento dedicado",
            category: "infrastructure", categoryLabel: "Infraestrutura",
            description: "Planejamento, montagem e configuração de um servidor de mídia local com Jellyfin, armazenamento dedicado e organização de dados.",
            metrics: "🗄️ Até 8 TB • Jellyfin • Armazenamento local", tags: ["Jellyfin", "Linux", "Redes", "Storage", "Servidores"],
            liveUrl: "http://192.168.100.105:8096", githubUrl: "https://github.com/vitor16",
            slides: [
                { url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80", caption: "Servidor e infraestrutura de armazenamento local", tag: "Infraestrutura" },
                { url: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=1200&auto=format&fit=crop&q=80", caption: "Organização e gerenciamento de dados", tag: "Storage" }
            ],
            caseStudy: {
                challenge: "Organizar uma infraestrutura doméstica confiável para armazenar e disponibilizar uma biblioteca de mídia.",
                solution: "Planejamento do servidor, montagem física, configuração do Jellyfin e gerenciamento de unidades de armazenamento.",
                results: "Ambiente self-hosted funcional com armazenamento dedicado e acesso aos serviços na rede local."
            }
        },
        {
            id: "hardware-optimization", title: "Montagem e Otimização de Hardware", subtitle: "Seleção de componentes, fluxo de ar e manutenção preventiva",
            category: "hardware", categoryLabel: "Hardware",
            description: "Experiência prática na escolha de componentes com foco em custo-benefício, configuração térmica e manutenção preventiva de computadores.",
            metrics: "🔧 Custo-benefício • Gestão térmica • Manutenção", tags: ["Hardware", "Cooling", "Airflow", "Diagnóstico", "Manutenção"],
            liveUrl: "#", githubUrl: "https://github.com/vitor16",
            slides: [
                { url: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1200&auto=format&fit=crop&q=80", caption: "Seleção e montagem de componentes", tag: "Montagem" },
                { url: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=1200&auto=format&fit=crop&q=80", caption: "Fluxo de ar e gerenciamento térmico", tag: "Cooling" }
            ],
            caseStudy: {
                challenge: "Equilibrar desempenho, custo, temperatura e confiabilidade na montagem de sistemas.",
                solution: "Seleção criteriosa de componentes, configuração de curvas de ventilação, organização do fluxo de ar e manutenção preventiva.",
                results: "Sistemas mais organizados, termicamente equilibrados e adequados ao uso pretendido."
            }
        },
        {
            id: "linux-hyprland", title: "Linux e Customização com Hyprland", subtitle: "Configuração avançada de ambientes Arch Linux",
            category: "systems", categoryLabel: "Sistemas Operacionais",
            description: "Configuração e customização de ambientes Linux baseados em Arch Linux, incluindo Hyprland, temas, automações e ferramentas de produtividade.",
            metrics: "🐧 Arch Linux • Hyprland • Automação", tags: ["Arch Linux", "Hyprland", "Bash", "Waybar", "Automação"],
            liveUrl: "#", githubUrl: "https://github.com/vitor16",
            slides: [
                { url: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&auto=format&fit=crop&q=80", caption: "Ambiente Linux e ferramentas de terminal", tag: "Linux" },
                { url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80", caption: "Customização de interface e automação", tag: "Hyprland" }
            ],
            caseStudy: {
                challenge: "Criar um ambiente de trabalho Linux personalizado, funcional e adequado às tarefas diárias.",
                solution: "Configuração de Arch Linux, Hyprland, Waybar, temas e scripts de automação para integrar o ambiente.",
                results: "Ambiente de trabalho adaptado às preferências do usuário, com foco em produtividade e controle do sistema."
            }
        }
    ],
    skills: {
        infrastructure: {
            title: "Infraestrutura e Suporte Técnico", subtitle: "Servidores, redes, armazenamento e atendimento",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="6" rx="1"/><rect x="3" y="15" width="18" height="6" rx="1"/><line x1="7" y1="6" x2="7.01" y2="6"/><line x1="7" y1="18" x2="7.01" y2="18"/></svg>`,
            items: [
                { name: "Servidores de mídia self-hosted e Jellyfin", level: 88, exp: "Prática" }, { name: "Gerenciamento, particionamento e espelhamento de discos", level: 84, exp: "Prática" },
                { name: "Redes e infraestrutura local", level: 78, exp: "Prática" }, { name: "Atendimento, diagnóstico e resolução de problemas", level: 94, exp: "Experiência" },
                { name: "Organização de processos e cronogramas", level: 92, exp: "Experiência" }
            ]
        },
        hardware: {
            title: "Hardware e Manutenção", subtitle: "Montagem, desempenho e gestão térmica",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="9" r="3"/><path d="M8 16h8M8 19h5"/></svg>`,
            items: [
                { name: "Seleção de componentes e custo-benefício", level: 92, exp: "Prática" }, { name: "Montagem e manutenção preventiva", level: 90, exp: "Prática" },
                { name: "Fluxo de ar e curvas de ventilação", level: 86, exp: "Prática" }, { name: "Otimização de desempenho e temperaturas", level: 84, exp: "Prática" },
                { name: "Diagnóstico de problemas de hardware", level: 82, exp: "Prática" }
            ]
        },
        systems: {
            title: "Linux e Sistemas Operacionais", subtitle: "Arch Linux, Hyprland e automação",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3M13 15h4"/></svg>`,
            items: [
                { name: "Linux com foco em distribuições Arch", level: 90, exp: "Domínio prático" }, { name: "Hyprland e tiling window managers", level: 88, exp: "Customização" },
                { name: "Bash e automação de rotinas", level: 78, exp: "Prática" }, { name: "Temas e customização de interfaces", level: 90, exp: "Prática" },
                { name: "Windows e fundamentos de sistemas", level: 78, exp: "Conhecimento" }
            ]
        },
        communication: {
            title: "Idiomas e Habilidades Interpessoais", subtitle: "Comunicação clara, paciência e aprendizagem rápida",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5h16v11H8l-4 4V5z"/><path d="M8 9h8M8 12h5"/></svg>`,
            items: [
                { name: "Inglês: escrita, leitura e conversação", level: 98, exp: "Fluente" }, { name: "Português", level: 100, exp: "Nativo" },
                { name: "Paciência e resiliência no atendimento", level: 96, exp: "Experiência" }, { name: "Comunicação clara e didática", level: 94, exp: "Experiência" },
                { name: "Organização, método e atenção aos detalhes", level: 94, exp: "Experiência" }
            ]
        }
    },
    codeSnippets: [
        {
            id: "linux-server", tabTitle: "self-hosted.sh", language: "Bash", desc: "Rotina de verificação de serviços self-hosted",
            code: `<span class="cmt"># Verifica serviços do servidor local</span>
<span class="kw">for</span> service <span class="kw">in</span> portfolio immich jellyfin; <span class="kw">do</span>
  systemctl --user is-active --quiet <span class="str">"$service"</span> && <span class="fn">echo</span> <span class="str">"$service: online"</span>
<span class="kw">done</span>`
        },
        {
            id: "hardware-checklist", tabTitle: "hardware-checklist.txt", language: "Support", desc: "Checklist de manutenção preventiva",
            code: `<span class="cmt"># Manutenção preventiva</span>
1. <span class="str">Verificar temperaturas e curvas de ventilação</span>
2. <span class="str">Limpar filtros, ventoinhas e dissipadores</span>
3. <span class="str">Conferir cabos, armazenamento e integridade dos dados</span>
4. <span class="str">Registrar alterações e próximos passos</span>`
        }
    ],
    experience: [
        {
            role: "Gestão de Serviços e Atendimento ao Cliente", company: "Prestação de Serviços Especializados / Setor Operacional",
            period: "Vivência profissional nos Estados Unidos", location: "Estados Unidos",
            description: "Atendimento direto ao público e gerenciamento de carteira de clientes em ambiente internacional.",
            achievements: ["Planejamento logístico, organização de cronogramas de entrega e controle de qualidade de projetos de infraestrutura e acabamento.", "Resolução de conflitos e negociações diretas com paciência, escuta ativa e comunicação clara.", "Coordenação de processos de faturamento e conformidade da prestação de serviços."],
            tech: ["Atendimento", "Logística", "Planejamento", "Qualidade", "Negociação"]
        },
        {
            role: "Desenvolvimento de Sistemas", company: "SENAI CTTI", period: "Em andamento — início em 2025", location: "Belo Horizonte, MG",
            description: "Formação em desenvolvimento de sistemas, com aplicação prática de tecnologia e resolução de problemas.",
            achievements: ["Formação atual em desenvolvimento de sistemas no SENAI CTTI.", "Aplicação prática de raciocínio lógico, ferramentas de tecnologia e aprendizagem de novas soluções."],
            tech: ["Desenvolvimento de Sistemas", "Tecnologia", "Lógica", "SENAI"]
        },
        {
            role: "Projetos Práticos de Infraestrutura e Sistemas", company: "Projetos pessoais", period: "Atuação contínua", location: "Belo Horizonte, MG",
            description: "Construção e manutenção de ambientes self-hosted, hardware e sistemas Linux para uso pessoal e aprendizado técnico.",
            achievements: ["Montagem e configuração de servidores de mídia locais com Jellyfin e armazenamento dedicado de até 8 TB.", "Gerenciamento, particionamento e espelhamento de unidades de armazenamento.", "Customização de Arch Linux e Hyprland, incluindo temas e automação de rotinas."],
            tech: ["Jellyfin", "Linux", "Arch Linux", "Hyprland", "Hardware", "Storage"]
        },
        {
            role: "Ensino Médio (High School Diploma)", company: "Instituição de Ensino nos Estados Unidos", period: "Concluído", location: "Estados Unidos",
            description: "Ensino médio concluído nos Estados Unidos.", achievements: ["Formação escolar concluída em instituição de ensino americana."], tech: ["Inglês", "Vivência internacional"]
        }
    ],
    terminalHelp: [
        { cmd: "help", desc: "Lista os comandos disponíveis" }, { cmd: "about", desc: "Sobre Vitor e seu perfil profissional" },
        { cmd: "skills", desc: "Visualiza competências técnicas e interpessoais" }, { cmd: "education", desc: "Formação no SENAI e High School Diploma" },
        { cmd: "languages", desc: "Inglês fluente e Português nativo" }, { cmd: "projects", desc: "Lista os projetos práticos de infraestrutura" },
        { cmd: "contact", desc: "Telefone, WhatsApp, LinkedIn e GitHub" }, { cmd: "theme [dark|light]", desc: "Alterna o tema visual" }, { cmd: "clear", desc: "Limpa o histórico do terminal" }
    ]
};

if (typeof window !== "undefined") window.portfolioData = portfolioData;
