// Variáveis globais

// Detectar quando o DOM está carregado
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar animações e efeitos
    initScrollAnimations();
    initMobileMenu();
    initHeaderScroll();
    initSkillsAnimation();
    initCounters();



    // Efeito de digitação para o hero
    if (document.querySelector('.hero-title span')) {
        initTypingEffect();
    }
});

// Animações de scroll
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Usar requestAnimationFrame para melhor performance
                requestAnimationFrame(() => {
                    entry.target.classList.add('visible');
                });
            }
        });
    }, {
        threshold: 0.2, // Maior threshold para animação mais cedo
        rootMargin: '0px 0px -50px 0px' // Menos margem para transição mais suave
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Suavizar navegação entre seções
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Menu mobile
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link
        const navItems = document.querySelectorAll('.nav-links li a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// Header scroll
function initHeaderScroll() {
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Animação das habilidades
function initSkillsAnimation() {
    const skillElements = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const percentage = progressBar.getAttribute('data-percentage');
                progressBar.style.width = `${percentage}%`;
            }
        });
    }, {
        threshold: 0.5
    });

    skillElements.forEach(element => {
        observer.observe(element);
    });
}

// Contadores animados
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let count = 0;
                const duration = 2000; // 2 segundos
                const interval = duration / target;

                const timer = setInterval(() => {
                    count++;
                    counter.textContent = count;

                    if (count >= target) {
                        clearInterval(timer);
                        counter.textContent = target;
                    }
                }, interval);

                // Desconectar o observer após iniciar a animação
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}





// Efeito de digitação
function initTypingEffect() {
    const element = document.querySelector('.hero-title span');
    const text = element.getAttribute('data-text');
    element.textContent = '';

    let i = 0;
    const typingSpeed = 100;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, typingSpeed);
        } else {
            // Adicionar cursor piscante após a digitação
            element.classList.add('typing-done');
        }
    }

    setTimeout(() => {
        type();
    }, 1000);
}









// Formulário de contato - Formspree Integration
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const submitBtn = contactForm.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        // Permitir que o formulário seja enviado para o Formspree
        // O Formspree irá lidar com o envio e redirecionamento
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Carrossel de Depoimentos
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

// Função para mostrar um slide específico
function showSlide(index) {
    // Remove classe active de todos os slides e indicadores
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Pequeno delay para suavizar a transição
    setTimeout(() => {
        // Adiciona classe active ao slide e indicador corretos
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
    }, 50);
}

// Função para mudar slide (próximo/anterior)
function changeTestimonial(direction) {
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }
    
    showSlide(currentSlideIndex);
}

// Função para ir para um slide específico
function currentTestimonial(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

// Auto-rotação dos depoimentos (opcional)
function autoRotateTestimonials() {
    setInterval(() => {
        changeTestimonial(1);
    }, 5000); // Muda a cada 5 segundos
}

// Inicializar o carrossel quando o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    if (slides.length > 0) {
        showSlide(0); // Mostrar o primeiro slide
        // autoRotateTestimonials(); // Descomente para rotação automática
    }
});
