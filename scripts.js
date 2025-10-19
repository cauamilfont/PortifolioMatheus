// Sistema de Navegação com Animações Divertidas
class FunPageManager {
    constructor() {
        this.currentPage = 'sobre-page';
        this.isAnimating = false;
        this.animationPairs = {
            // [fromPage_toPage]: [exitAnimation, enterAnimation]
            'sobre-page_experiencia-page': ['page-flip-exit', 'page-slide-bounce-enter'],
            'sobre-page_habilidades-page': ['page-flip-exit', 'page-zoom-rotate-enter'],
            'sobre-page_contato-page': ['page-flip-exit', 'page-falling-enter'],
            
            'experiencia-page_sobre-page': ['page-slide-bounce-exit', 'page-wave-enter'],
            'experiencia-page_habilidades-page': ['page-slide-bounce-exit', 'page-zoom-rotate-enter'],
            'experiencia-page_contato-page': ['page-slide-bounce-exit', 'page-falling-enter'],
            
            'habilidades-page_sobre-page': ['page-zoom-rotate-exit', 'page-wave-enter'],
            'habilidades-page_experiencia-page': ['page-zoom-rotate-exit', 'page-slide-bounce-enter'],
            'habilidades-page_contato-page': ['page-zoom-rotate-exit', 'page-falling-enter'],
            
            'contato-page_sobre-page': ['page-falling-exit', 'page-wave-enter'],
            'contato-page_experiencia-page': ['page-falling-exit', 'page-slide-bounce-enter'],
            'contato-page_habilidades-page': ['page-falling-exit', 'page-zoom-rotate-enter']
        };
        this.init();
    }

    init() {
        this.setupNavigation();
        this.showPage(this.currentPage);
        this.setupScrollEffect();
    }

    setupNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = link.getAttribute('data-page');
                if (targetPage && targetPage !== this.currentPage && !this.isAnimating) {
                    this.navigateTo(targetPage);
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
        
        // Criar códigos pulando
        this.createJumpingCodes();

        // Mostrar loading divertido
        this.showFunLoading();

        await this.delay(400);

        // Obter animações para esta transição
        const [exitAnim, enterAnim] = this.getAnimations(fromPage, pageId);

        // Animação de saída
        this.hidePage(fromPage, exitAnim);

        await this.delay(600);

        // Mostrar nova página
        this.showPage(pageId, enterAnim);

        // Atualizar estado
        this.currentPage = pageId;
        window.history.pushState(null, null, `#${pageId.replace('-page', '')}`);

        // Efeitos sonoros visuais
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
            
            // Remover animação após execução
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

        // Criar 15 códigos pulando
        for (let i = 0; i < 15; i++) {
            const codeElement = document.createElement('div');
            codeElement.className = 'jumping-code';
            
            // Snippet aleatório
            const randomSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
            codeElement.textContent = randomSnippet;
            
            // Posição inicial aleatória
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            
            // Configurar animação única para cada código
            const animationName = `jumpCode${i}`;
            const keyframes = this.generateJumpKeyframes(startX, startY);
            
            // Adicionar keyframes dinâmicos
            const style = document.createElement('style');
            style.textContent = `
                @keyframes ${animationName} {
                    ${keyframes}
                }
            `;
            document.head.appendChild(style);
            
            // Aplicar animação
            codeElement.style.animation = `${animationName} 1.2s ease-out forwards`;
            codeElement.style.left = `${startX}%`;
            codeElement.style.top = `${startY}%`;
            codeElement.style.animationDelay = `${Math.random() * 0.3}s`;
            
            codesContainer.appendChild(codeElement);
        }

        // Remover códigos após animação
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
            const x = startX + (Math.random() - 0.5) * 40; // Movimento horizontal aleatório
            const y = startY - Math.sin(progress * Math.PI) * 30; // Movimento de pulo
            const scale = 0.5 + Math.sin(progress * Math.PI) * 0.5; // Escala que muda durante o pulo
            const rotation = (Math.random() - 0.5) * 20; // Rotação leve
            
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
        // Efeitos visuais no console
        const pages = {
            'sobre-page': '🚀 SOBRE',
            'experiencia-page': '💼 EXPERIÊNCIA', 
            'habilidades-page': '⚡ HABILIDADES',
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

// CSS para códigos pulando (será adicionado dinamicamente)
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

/* Efeito de brilho nos códigos */
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

// Adicionar estilos dos códigos pulando
const jumpingCodesStyleSheet = document.createElement('style');
jumpingCodesStyleSheet.textContent = jumpingCodesStyles;
document.head.appendChild(jumpingCodesStyleSheet);

// Gerar códigos computacionais descendo (para a página sobre)
function createCodeRain() {
    const codeBackground = document.getElementById('codeBackground');
    if (!codeBackground) return;
    
    const codeSnippets = [
        // JavaScript/TypeScript
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
        
        // React/Next.js
        'export default function Portfolio() {',
        'return <Innovation />;',
        '}',
        'const App = () => {',
        'return <div>Hello World</div>;',
        '};',
        'useEffect(() => {',
        'fetchSolutions();',
        '}, []);',
        
        // Node.js/Backend
        'app.get("/api/success", (req, res) => {',
        'res.json({ status: "achieved" });',
        '});',
        'const server = http.createServer();',
        'server.listen(3000);',
        
        // Python
        'def solve_problem():',
        'return innovative_solution',
        'class Algorithm:',
        'def optimize(self):',
        'pass',
        
        // Flutter/Dart
        'class AmazingApp extends StatelessWidget {',
        '@override',
        'Widget build(BuildContext context) {',
        'return Innovation();',
        '}',
        '}',
        
        // Git Commands
        'git commit -m "feat: revolutionary feature"',
        'git push origin main',
        'npm run build',
        'docker-compose up',
        
        // Database
        'SELECT * FROM solutions;',
        'db.innovations.find({})',
        'CREATE TABLE projects (id SERIAL);',
        
        // DevOps
        'kubectl apply -f deployment.yaml',
        'terraform apply',
        'aws s3 sync ./build s3://portfolio',
        
        // PHP
        '<?php',
        'echo "Hello Innovation";',
        '?>',
        '$success = true;',
        
        // Java
        'public class Solution {',
        'public static void main() {',
        'System.out.println("Success");',
        '}',
        '}',
        
        // Go
        'package main',
        'func main() {',
        'fmt.Println("Building...")',
        '}',
        
        // Comandos Linux
        'ls -la',
        'cd ~/projects',
        'mkdir innovation',
        'chmod +x deploy.sh',
        
        // Comentários inspiradores
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
        
        // Variáveis e funções
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

    // Limpar códigos existentes
    codeBackground.innerHTML = '';

    // 60 códigos
    for (let i = 0; i < 50; i++) {
        const codeLine = document.createElement('div');
        const randomSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        const speedClass = ['slow', 'medium', 'fast', 'very-fast'][Math.floor(Math.random() * 4)];
        
        codeLine.className = `code-line ${speedClass}`;
        codeLine.textContent = randomSnippet;
        codeLine.style.left = `${Math.random() * 100}%`;
        codeLine.style.animationDelay = `${Math.random() * 8}s`;
        
        codeBackground.appendChild(codeLine);
    }
}

// Smooth scrolling para links internos
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

// Inicializar quando DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar sistema de páginas
    new FunPageManager();
    
    // Inicializar códigos descendo
    createCodeRain();
    
    // Configurar scroll suave
    setupSmoothScrolling();
    
    // Atualizar códigos periodicamente
    setInterval(() => {
        const codeBackground = document.getElementById('codeBackground');
        if (codeBackground) {
            const existingCodes = codeBackground.querySelectorAll('.code-line');
            if (existingCodes.length > 40) {
                for (let i = 0; i < 20; i++) {
                    if (existingCodes[i]) {
                        existingCodes[i].remove();
                    }
                }
            }
            createCodeRain();
        }
    }, 15000);
});