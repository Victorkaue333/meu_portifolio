document.addEventListener('DOMContentLoaded', () => {

    // Inicializa os ícones do Lucide
    lucide.createIcons();

    // 1. ANIMAÇÃO DE DIGITAÇÃO COM TYPED.JS
    const typed = new Typed('#typed-text', {
        strings: [
            'Python 🐍', 
            'Django 🎯', 
            'JavaScript ⚡', 
            'React ⚛️', 
            'HTML & CSS 🎨', 
            'Java ☕', 
            'Flutter 📱', 
            'MySQL 🗄️', 
            'PostgreSQL 🐘',
            'Docker 🐳',
            'Git & GitHub 🚀'
        ],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 1500,
        loop: true,
        smartBackspace: true,
        cursorChar: '|'
    });

    // 2. LÓGICA PARA ANIMAÇÃO DE SCROLL (FADE-IN)
    const sections = document.querySelectorAll('.content-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    sections.forEach(section => observer.observe(section));

    // 3. LÓGICA DO CURSOR PERSONALIZADO
    const cursor = document.querySelector('.custom-cursor');
    window.addEventListener('mousemove', e => {
        cursor.style.top = `${e.clientY}px`;
        cursor.style.left = `${e.clientX}px`;
    });

    // Adiciona classe ao cursor quando sobre elementos clicáveis
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseover', () => cursor.style.transform = 'translate(-50%, -50%) scale(1.5)');
        el.addEventListener('mouseout', () => cursor.style.transform = 'translate(-50%, -50%) scale(1)');
    });

    // 4. ESCONDER NAVBAR AO ROLAR PARA BAIXO
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.style.top = '-100px';
            } else {
                navbar.style.top = '0';
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, 50);
    });

    // 5. SMOOTH SCROLL PARA LINKS DE NAVEGAÇÃO
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Fechar menu mobile após clicar
                const menuWrapper = document.querySelector('.nav-menu-wrapper');
                const menuToggle = document.querySelector('.mobile-menu-toggle');
                if (menuWrapper && menuToggle) {
                    menuWrapper.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });

    // 6. MENU HAMBÚRGUER MOBILE
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenuWrapper = document.querySelector('.nav-menu-wrapper');

    if (mobileMenuToggle && navMenuWrapper) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navMenuWrapper.classList.toggle('active');
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                mobileMenuToggle.classList.remove('active');
                navMenuWrapper.classList.remove('active');
            }
        });
    }
});