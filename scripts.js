// scripts.js
// Funcionalidades JavaScript para a landing page

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling para links de navegação
    const navLinks = document.querySelectorAll('nav a, .btn-primary, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Verifica se o link é para uma âncora na mesma página
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Calcula a posição considerando o cabeçalho fixo
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Adiciona classe ativa ao item de navegação conforme a rolagem
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav a');
    
    function highlightNavItem() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('header').offsetHeight;
            
            if (window.scrollY >= (sectionTop - headerHeight - 50)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavItem);
    
    // Animação de entrada para elementos ao rolar
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.timeline-item, .skill-category, .language-item, .experience-item, .contact-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Define propriedades iniciais para animação
    const animatedElements = document.querySelectorAll('.timeline-item, .skill-category, .language-item, .experience-item, .contact-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // Executa uma vez ao carregar a página para elementos já visíveis
    animateOnScroll();
    
    // Efeito de hover para botões
    const buttons = document.querySelectorAll('.btn-primary, .btn-whatsapp, .btn-email');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Adiciona ano atual no rodapé (se necessário)
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.copyright p');
    if (yearElement && yearElement.textContent.includes('2025')) {
        yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
    }
    
    // Função para o WhatsApp - abre em nova aba com mensagem pré-definida
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Se não for um link externo, adiciona a funcionalidade
            if (!this.getAttribute('href')) {
                e.preventDefault();
                const phoneNumber = '+5585992117625';
                const message = 'Olá Matheus, gostaria de entrar em contato sobre oportunidades de trabalho.';
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            }
        });
    });
    
    console.log('Landing page carregada com sucesso!');
});
// Gerar códigos computacionais descendo - MAIS CÓDIGOS
function createCodeRain() {
    const codeBackground = document.getElementById('codeBackground');
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

    // MAIS CÓDIGOS - aumentei de 30 para 60
    for (let i = 0; i < 40; i++) {
        const codeLine = document.createElement('div');
        const randomSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        const speedClass = ['slow', 'medium', 'fast', 'very-fast'][Math.floor(Math.random() * 4)];
        
        codeLine.className = `code-line ${speedClass}`;
        codeLine.textContent = randomSnippet;
        codeLine.style.left = `${Math.random() * 100}%`;
        codeLine.style.animationDelay = `${Math.random() * 8}s`; // Aumentei o delay máximo
        
        codeBackground.appendChild(codeLine);
    }
}

// Iniciar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    createCodeRain();
    
    // Atualizar mais frequentemente para mais variedade
    setInterval(() => {
        const codeBackground = document.getElementById('codeBackground');
        // Mantém alguns códigos, remove outros
        const existingCodes = codeBackground.querySelectorAll('.code-line');
        if (existingCodes.length > 40) {
            // Remove os mais antigos
            for (let i = 0; i < 20; i++) {
                if (existingCodes[i]) {
                    existingCodes[i].remove();
                }
            }
        }
        // Adiciona novos
        createCodeRain();
    }, 15000); // Atualiza a cada 15 segundos
});