
class FunPageManager {
    constructor() {
        this.currentPage = 'sobre-page';
        this.isAnimating = false;
        this.animationPairs = {
            'sobre-page_experiencia-page': ['page-flip-exit', 'page-slide-bounce-enter'],
            'sobre-page_habilidades-page': ['page-flip-exit', 'page-zoom-rotate-enter'],
            'sobre-page_projetos-page': ['page-flip-exit', 'page-falling-enter'],
            'sobre-page_contato-page': ['page-flip-exit', 'page-falling-enter'],
            
            'experiencia-page_sobre-page': ['page-slide-bounce-exit', 'page-wave-enter'],
            'experiencia-page_habilidades-page': ['page-slide-bounce-exit', 'page-zoom-rotate-enter'],
            'experiencia-page_projetos-page': ['page-slide-bounce-exit', 'page-falling-enter'],
            'experiencia-page_contato-page': ['page-slide-bounce-exit', 'page-falling-enter'],
            
            'habilidades-page_sobre-page': ['page-zoom-rotate-exit', 'page-wave-enter'],
            'habilidades-page_experiencia-page': ['page-zoom-rotate-exit', 'page-slide-bounce-enter'],
            'habilidades-page_projetos-page': ['page-zoom-rotate-exit', 'page-falling-enter'],
            'habilidades-page_contato-page': ['page-zoom-rotate-exit', 'page-falling-enter'],
            
            'projetos-page_sobre-page': ['page-falling-exit', 'page-wave-enter'],
            'projetos-page_experiencia-page': ['page-falling-exit', 'page-slide-bounce-enter'],
            'projetos-page_habilidades-page': ['page-falling-exit', 'page-zoom-rotate-enter'],
            'projetos-page_contato-page': ['page-falling-exit', 'page-slide-bounce-enter'],
            
            'contato-page_sobre-page': ['page-falling-exit', 'page-wave-enter'],
            'contato-page_experiencia-page': ['page-falling-exit', 'page-slide-bounce-enter'],
            'contato-page_habilidades-page': ['page-falling-exit', 'page-zoom-rotate-enter'],
            'contato-page_projetos-page': ['page-falling-exit', 'page-slide-bounce-enter']
        };
        this.init();
    }

    init() {
        this.setupNavigation();
        this.showPage(this.currentPage);
        this.setupScrollEffect();
        this.setupMobileMenu();
    }

    setupNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = link.getAttribute('data-page');
                if (targetPage && targetPage !== this.currentPage && !this.isAnimating) {
                    this.navigateTo(targetPage);
                    this.closeMobileMenu();
                }
            });
        });

        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1);
            const targetPage = `${hash}-page`;
            if (targetPage && targetPage !== this.currentPage && !this.isAnimating) {
                this.navigateTo(targetPage);
            }
        });
    }

    setupMobileMenu() {
        const headerContent = document.querySelector('.header-content');
        const nav = document.querySelector('nav');
        
        if (window.innerWidth < 768) {
            const hamburger = document.createElement('button');
            hamburger.className = 'mobile-menu-toggle';
            hamburger.innerHTML = '☰';
            hamburger.setAttribute('aria-label', 'Abrir menu');
            
            hamburger.addEventListener('click', () => {
                nav.classList.toggle('mobile-active');
                hamburger.innerHTML = nav.classList.contains('mobile-active') ? '✕' : '☰';
            });
            
            headerContent.appendChild(hamburger);
            
            document.addEventListener('click', (e) => {
                if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
                    nav.classList.remove('mobile-active');
                    hamburger.innerHTML = '☰';
                }
            });
        }
    }

    closeMobileMenu() {
        const nav = document.querySelector('nav');
        const hamburger = document.querySelector('.mobile-menu-toggle');
        if (nav && hamburger) {
            nav.classList.remove('mobile-active');
            hamburger.innerHTML = '☰';
        }
    }

    setupScrollEffect() {
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    async navigateTo(pageId) {
        if (this.isAnimating) return;

        this.isAnimating = true;
        const fromPage = this.currentPage;
        
        this.createJumpingCodes();
        this.showFunLoading();

        await this.delay(400);

        const [exitAnim, enterAnim] = this.getAnimations(fromPage, pageId);
        this.hidePage(fromPage, exitAnim);

        await this.delay(600);

        this.showPage(pageId, enterAnim);
        this.currentPage = pageId;
        window.history.pushState(null, null, `#${pageId.replace('-page', '')}`);

        this.playTransitionSound(fromPage, pageId);

        await this.delay(800);
        
        this.hideLoading();
        this.isAnimating = false;
    }

    getAnimations(fromPage, toPage) {
        const key = `${fromPage}_${toPage}`;
        return this.animationPairs[key] || ['page-flip-exit', 'page-flip-enter'];
    }

    showPage(pageId, animation) {
        const page = document.getElementById(pageId);
        if (page) {
            page.classList.add('active');
            if (animation) {
                page.classList.add(animation);
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            setTimeout(() => {
                page.classList.remove(animation);
            }, 1000);
        }
    }

    hidePage(pageId, animation) {
        const page = document.getElementById(pageId);
        if (page) {
            if (animation) {
                page.classList.add(animation);
            }
            setTimeout(() => {
                page.classList.remove('active', animation);
            }, 600);
        }
    }

    showFunLoading() {
        const loading = document.getElementById('pageLoading');
        loading.innerHTML = `
            <div class="loading-fun">
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
            </div>
        `;
        loading.classList.add('active');
    }

    hideLoading() {
        const loading = document.getElementById('pageLoading');
        loading.classList.remove('active');
    }

    createJumpingCodes() {
        const codesContainer = document.createElement('div');
        codesContainer.className = 'transition-codes';
        document.body.appendChild(codesContainer);

        const codeSnippets = [
            '{ }', 'const', 'function', '=>', '()', '[]', 'export', 'import',
            'return', 'class', 'async', 'await', 'if', 'else', 'for', 'while',
            'console', 'document', 'window', 'this', 'new', 'try', 'catch',
            'true', 'false', 'null', 'undefined', 'let', 'var', '=>', '...',
            '${ }', 'template', 'string', 'array', 'object', 'promise'
        ];

        for (let i = 0; i < 15; i++) {
            const codeElement = document.createElement('div');
            codeElement.className = 'jumping-code';
            
            
            const randomSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
            codeElement.textContent = randomSnippet;
            
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            
            const animationName = `jumpCode${i}`;
            const keyframes = this.generateJumpKeyframes(startX, startY);
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes ${animationName} {
                    ${keyframes}
                }
            `;
            document.head.appendChild(style);
            
            codeElement.style.animation = `${animationName} 1.2s ease-out forwards`;
            codeElement.style.left = `${startX}%`;
            codeElement.style.top = `${startY}%`;
            codeElement.style.animationDelay = `${Math.random() * 0.3}s`;
            
            codesContainer.appendChild(codeElement);
        }

        setTimeout(() => {
            if (codesContainer.parentNode) {
                codesContainer.parentNode.removeChild(codesContainer);
            }
        }, 1200);
    }

    generateJumpKeyframes(startX, startY) {
        const keyframes = [];
        const numFrames = 8;
        
        for (let frame = 0; frame <= numFrames; frame++) {
            const progress = frame / numFrames;
            const x = startX + (Math.random() - 0.5) * 40;
            const y = startY - Math.sin(progress * Math.PI) * 30;
            const scale = 0.5 + Math.sin(progress * Math.PI) * 0.5;
            const rotation = (Math.random() - 0.5) * 20;
            
            keyframes.push(`
                ${frame * (100/numFrames)}% {
                    transform: translate(${x}vw, ${y}vh) scale(${scale}) rotate(${rotation}deg);
                    opacity: ${1 - progress * 0.8};
                }
            `);
        }
        
        return keyframes.join('');
    }

    playTransitionSound(fromPage, toPage) {
        const pages = {
            'sobre-page': '🚀 SOBRE',
            'experiencia-page': '💼 EXPERIÊNCIA', 
            'habilidades-page': '⚡ HABILIDADES',
            'projetos-page': '💻 PROJETOS',
            'contato-page': '📞 CONTATO'
        };
        
        console.log(`%c${pages[fromPage]} → ${pages[toPage]}`, 
            'color: #FFD700; font-size: 16px; font-weight: bold;');
        console.log('%c✨ Códigos Pulando! ✨', 
            'color: #25D366; font-size: 14px;');
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}


const jumpingCodesStyles = `
.transition-codes {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9998;
    overflow: hidden;
}

.jumping-code {
    position: absolute;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    font-weight: bold;
    color: var(--primary-color);
    background: rgba(255, 215, 0, 0.1);
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid var(--primary-color);
    white-space: nowrap;
    opacity: 0;
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
}

.jumping-code::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, transparent, var(--primary-color), transparent);
    border-radius: 6px;
    opacity: 0;
    animation: codeGlow 1.2s ease-out forwards;
    z-index: -1;
}

@keyframes codeGlow {
    0%, 100% { opacity: 0; }
    50% { opacity: 0.3; }
}
`;


const jumpingCodesStyleSheet = document.createElement('style');
jumpingCodesStyleSheet.textContent = jumpingCodesStyles;
document.head.appendChild(jumpingCodesStyleSheet);


function createInfiniteCodeRain() {
    const codeBackground = document.getElementById('codeBackground');
    if (!codeBackground) return;
    
    const codeSnippets = [
        'function developSolution() {',
        'const innovation = new Idea();',
        'return breakthrough;',
        '}',
        'class SoftwareEngineer {',
        'constructor(name, skills) {',
        'this.name = name;',
        'this.skills = skills;',
        '}',
        'code() { return "amazing"; }',
        '}',
        'const matheus = new Developer();',
        'matheus.buildFuture();',
        'export default function Portfolio() {',
        'return <Innovation />;',
        '}',
        'const App = () => {',
        'return <div>Hello World</div>;',
        '};',
        'useEffect(() => {',
        'fetchSolutions();',
        '}, []);',
        'app.get("/api/success", (req, res) => {',
        'res.json({ status: "achieved" });',
        '});',
        'const server = http.createServer();',
        'server.listen(3000);',
        'def solve_problem():',
        'return innovative_solution',
        'class Algorithm:',
        'def optimize(self):',
        'pass',
        'class AmazingApp extends StatelessWidget {',
        '@override',
        'Widget build(BuildContext context) {',
        'return Innovation();',
        '}',
        '}',
        'git commit -m "feat: revolutionary feature"',
        'git push origin main',
        'npm run build',
        'docker-compose up',
        'SELECT * FROM solutions;',
        'db.innovations.find({})',
        'CREATE TABLE projects (id SERIAL);',
        'kubectl apply -f deployment.yaml',
        'terraform apply',
        'aws s3 sync ./build s3://portfolio',
        '<?php',
        'echo "Hello Innovation";',
        '?>',
        '$success = true;',
        'public class Solution {',
        'public static void main() {',
        'System.out.println("Success");',
        '}',
        '}',
        'package main',
        'func main() {',
        'fmt.Println("Building...")',
        '}',
        'ls -la',
        'cd ~/projects',
        'mkdir innovation',
        'chmod +x deploy.sh',
        '// Code with passion',
        '// Build the future',
        '// Innovation starts here',
        '// FullStack Developer',
        '// Clean architecture',
        '// Performance matters',
        '// User experience first',
        '// Scalable solutions',
        '// Cloud native apps',
        '// Mobile first approach',
        'const techStack = ["React", "Node", "Flutter"];',
        'let creativity = unlimited;',
        'var solutions = [];',
        'function deploy() {',
        'return "success";',
        '}',
        'async function learn() {',
        'await growth;',
        '}'
    ];

    if (codeBackground.children.length === 0) {
        const initialCodes = window.innerWidth < 768 ? 25 : 60;
        
        for (let i = 0; i < initialCodes; i++) {
            createSingleCodeLine(codeBackground, codeSnippets, i);
        }
    }
}

function createSingleCodeLine(container, snippets, index) {
    const codeLine = document.createElement('div');
    const randomSnippet = snippets[Math.floor(Math.random() * snippets.length)];
    
    const speeds = window.innerWidth < 768 ? 
        ['slow', 'medium', 'fast'] : 
        ['slow', 'medium', 'fast', 'very-fast'];
    
    const speedClass = speeds[Math.floor(Math.random() * speeds.length)];
    
    codeLine.className = `code-line ${speedClass}`;
    codeLine.textContent = randomSnippet;
    codeLine.style.left = `${Math.random() * 100}%`;
    codeLine.style.animationDelay = `${Math.random() * 15}s`;
    
    const durations = {
        'slow': window.innerWidth < 768 ? '20s' : '25s',
        'medium': window.innerWidth < 768 ? '16s' : '20s', 
        'fast': window.innerWidth < 768 ? '12s' : '15s',
        'very-fast': window.innerWidth < 768 ? '8s' : '10s'
    };
    codeLine.style.animationDuration = durations[speedClass];
    
    codeLine.addEventListener('animationiteration', () => {
        const newSnippet = snippets[Math.floor(Math.random() * snippets.length)];
        codeLine.textContent = newSnippet;
        codeLine.style.left = `${Math.random() * 100}%`;
    });

    container.appendChild(codeLine);
}


function initProjectsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}


function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}


function optimizeMobileLayout() {
    if (window.innerWidth < 768) {
        document.querySelectorAll('.page').forEach(page => {
            page.style.paddingTop = '140px';
        });
        
        const profileImg = document.querySelector('.profile-img-art');
        if (profileImg) {
            profileImg.style.width = '200px';
            profileImg.style.height = '200px';
        }
    } else {
        document.querySelectorAll('.page').forEach(page => {
            page.style.paddingTop = '80px';
        });
        
        const profileImg = document.querySelector('.profile-img-art');
        if (profileImg) {
            profileImg.style.width = '350px';
            profileImg.style.height = '350px';
        }
    }
}


document.addEventListener('DOMContentLoaded', function() {
    new FunPageManager();
    createInfiniteCodeRain();
    setupSmoothScrolling();
    initProjectsFilter();
    optimizeMobileLayout();
    
    window.addEventListener('resize', optimizeMobileLayout);
});

const projectsData = {
     1: {
    title: "SGS Saúde - Sistema de Gestão de Saúde",
    subtitle: "Sistema de gestão para diretoria de saúde da Polícia Militar do Ceará",
    image: "img/SGS.png",
    description: "O sistema de gestão de saúde da polícia militar do Ceará foi desenvolvido com o objetivo de facilitar o gerenciamento de horários e do atendimento dentro das operações da diretoria de saúde, trazendo otimização no trabalho dos profissionais da saúde dentro da PMCE e facilidade de atendimento para os policiais militares do estado.",
    features: [
        "Gestão completa de agendamentos e horários",
        "Otimização do trabalho dos profissionais de saúde",
        "Facilidade no atendimento aos policiais militares",
        "Controle de operações da diretoria de saúde",
        "Sistema integrado de gestão médica",
        "Relatórios de atendimento e produtividade"
    ],
    technologies: ["Node.js", "React", "Nest"],
},
   
    2: {
        title: "Amigos CCDS",
        subtitle: "App mobile para Conselhos Comunitários de Defesa Social",
        image: "img/Amigos2.png",
        description: "Aplicativo mobile desenvolvido para aproximar líderes dos Conselhos Comunitários de Defesa Social dos órgãos competentes de segurança pública. Plataforma completa com múltiplas funcionalidades para engajamento comunitário.",
        features: [
            "Portal de notícias do CCDS",
            "Sistema de notificação de eventos",
            "Documentos relacionados aos CCDS's",
            "Respostas de formulários de avaliação",
            "Acesso à identidade funcional digital",
            "Comunicação direta com órgãos públicos"
        ],
        technologies: ["Flutter", "Java", "SpringBoot",],
       
       
    },
   3: {
    title: "Campeonato Cearense de Rally",
        subtitle: "Readequação e modernização de site existente",
        image: "img/Rally2.png",
        description: "Projeto de readequação de um site já existente que necessitava de ajustes estruturais e atualizações visuais. Desenvolvemos uma nova arquitetura com foco na melhor experiência do usuário e posicionamento estratégico das informações mais relevantes. O site também recebeu um sistema de inscrições otimizado com um novo fluxo e facilitando o controle da diretoria.",
        features: [
        "Redesign completo da interface",
        "Nova estrutura de navegação", 
        "Otimização de performance",
        "Layout responsivo",
        "Melhor posicionamento de dados importantes",
        "Atualização visual moderna",
        "Sistema de inscrições otimizado",
        "Novo fluxo de inscrições",
        "Facilitação do controle pela diretoria"
    ],
    technologies: [ "PHP", "Codeigniter", "Jquery"],
        
        
    },
    4: {
        title: "Sistema de Controle de Veículos - AESP/CE",
        subtitle: "Sistema de gestão veicular para Academia Estadual de Segurança Pública",
        image: "img/AESP2.png",
        description: "Sistema desenvolvido para a Academia Estadual de Segurança Pública do Ceará com o objetivo de centralizar todas as informações referentes aos veículos da organização. Além da centralização de dados, o sistema possui funcionalidades avançadas de geração de relatórios para processos financeiros e de gestão do Estado do Ceará.",
        features: [
            "Centralização de informações veiculares",
            "Geração de relatórios virtuais no sistema",
            "Exportação de relatórios em PDF",
            "Exportação de relatórios em Excel",
            "Indexação direta nos processos financeiros",
            "Gestão completa da frota veicular"
        ],
        technologies: ["PHP", "Codeigniter", "Jquery"],
     
       
    },
    5: {
         title: "Desor Rally Team",
        subtitle: "Site + Portal para equipe de rally",
        image: "img/desor2.png",
        description: "Projeto completo envolvendo desenvolvimento de Site institucional e Portal administrativo. O Site tem como objetivo apresentar a equipe para potenciais patrocinadores, enquanto o Portal gerencia associados e conteúdo interno.",
        features: [
            "Site institucional para patrocinadores",
            "Portal administrativo para associados",
            "Seção de notícias atualizável",
            "Carteirinha digital de associado",
            "Galeria de fotos de competições",
            "Módulo de contato com marketing"
        ],
        technologies: ["PHP", "Codeigniter", "Bootstrap"],
       
        
    },
    6: {
         title: "Sistema de Gestão Acadêmica - AESP/CE",
        subtitle: "Sistema completo para gestão educacional",
        image: "img/AESP3.png",
        description: "Sistema desenvolvido para a Academia Estadual de Segurança Pública do Ceará com foco na gestão completa dos processos acadêmicos, desde administração de alunos até processos financeiros dos instrutores.",
        features: [
            "Administração de alunos e turmas",
            "Gestão de instrutores e coordenadores",
            "Processos financeiros dos instrutores",
            "Relatórios de pagamento e financeiro",
            "Cadastro de aulas e diários de classe",
            "Controle completo de cursos"
        ],
        technologies: ["PHP", "Codeigniter", "Bootstrap"],
        
        
    },
    7: {
         title: "NMC Consultoria",
        subtitle: "Site institucional para consultoria imobiliária jurídica",
        image: "img/NMC2.png",
        description: "Site institucional desenvolvido para empresa do ramo imobiliário jurídico, com objetivo de apresentar a empresa de forma profissional e facilitar o contato com clientes potenciais.",
        features: [
            "Apresentação institucional da empresa",
            "Catálogo de serviços jurídicos",
            "Formulários de contato otimizados",
            "Design profissional e confiável",
            "Otimização para dispositivos móveis",
            "Integração com redes sociais"
        ],
        technologies: ["PHP", "Codeigniter", "Bootstrap"],
       
        
    },
    8: {
        title: "Cyphertech Automation",
        subtitle: "App Android para automação industrial única",
        image: "img/Cyphertech2.png",
        description: "Aplicativo Android único no mercado desenvolvido para comunicação com máquina microcontrolada em indústria de produtos de limpeza. Solução inovadora que controla o despejo de misturas químicas através de interface mobile.",
        features: [
            "Comunicação com microcontrolador",
            "Controle de dosagem química",
            "Interface intuitiva para operadores",
            "Sistema único no mercado",
            "Integração industrial",
            "Controle de processos em tempo real"
        ],
        technologies: ["Java", "Kotlin", "PHP", "C#"],
    
         
       
       
    }
};


function initProjectModal() {
    const modal = document.getElementById('project-modal');
    const modalBody = modal.querySelector('.modal-body');
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');

    
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });

   
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function openProjectModal(projectId) {
        const project = projectsData[projectId];
        if (!project) return;

        modalBody.innerHTML = `
            <div class="modal-header">
                <h2 class="modal-title">${project.title}</h2>
                <p class="modal-subtitle">${project.subtitle}</p>
            </div>
            
            <div class="modal-grid">
                <div class="modal-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                
                <div class="modal-info">
                    <div class="modal-description">
                        <p>${project.description}</p>
                    </div>
                    
                    <div class="modal-features">
                        <h3>Funcionalidades</h3>
                        <ul>
                            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="modal-tech">
                        <h3>Tecnologias Utilizadas</h3>
                        <div class="modal-tech-stack">
                            ${project.technologies.map(tech => `<span class="tech-tag-large">${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
            
            
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}


document.addEventListener('DOMContentLoaded', function() {
    
    initProjectModal(); 
});
