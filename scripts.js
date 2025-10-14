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