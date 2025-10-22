document.addEventListener('DOMContentLoaded', () => {

    // Inicializa os ícones do Lucide
    lucide.createIcons();

    // 1. ANIMAÇÃO DE DIGITAÇÃO COM TYPED.JS
    const typed = new Typed('#typed-text', {
        strings: ['Python.', 'Django.', 'Flutter.', 'Inteligência Artificial.'],
        typeSpeed: 70,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
        smartBackspace: true
    });

    // 2. LÓGICA PARA TROCA DE TEMA (DARK/LIGHT)
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const moonIcon = document.querySelector('.icon-moon');
    const sunIcon = document.querySelector('.icon-sun');

    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    html.setAttribute('data-theme', savedTheme);
    
    if (savedTheme === 'light') {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'inline-block';
    } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline-block';
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        if (newTheme === 'light') {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'inline-block';
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'inline-block';
        }
    });

    // 3. LÓGICA PARA ANIMAÇÃO DE SCROLL (FADE-IN)
    const sections = document.querySelectorAll('.content-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    sections.forEach(section => observer.observe(section));

    // 4. LÓGICA DO CURSOR PERSONALIZADO
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

    // 5. ESCONDER NAVBAR AO ROLAR PARA BAIXO
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.top = '-100px'; // Esconde o navbar
        } else {
            navbar.style.top = '0'; // Mostra o navbar
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
});