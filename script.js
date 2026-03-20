
// ===== RUN AFTER PAGE LOAD =====
document.addEventListener("DOMContentLoaded", function () {

    // ===== CREATE PARTICLES =====
    function createParticles() {
        const container = document.getElementById('particles');
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            container.appendChild(particle);
        }
    }
    createParticles();

    // ===== CURSOR GLOW EFFECT =====
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // ===== MAGNETIC BUTTONS =====
    const buttons = document.querySelectorAll('.btn, .social-icons a');
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });

    // ===== MOBILE MENU =====
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav ul");
    const icon = menuToggle.querySelector("i");

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");

        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
    });

    // CLOSE MENU ON CLICK
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            icon.classList.add("fa-bars");
            icon.classList.remove("fa-xmark");
        });
    });


    // ===== TYPING EFFECT =====
    const texts = [
        "Full Stack Developer",
        "UI/UX Designer",
        "Cybersecurity Enthusiast",
        "AI/ML Developer",
        "Backend Developer",
        "Tech Innovator"
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typingElement = document.querySelector(".typing-text");

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex--);
        } else {
            typingElement.textContent = currentText.substring(0, charIndex++);
        }

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            speed = 1500;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            speed = 500;
        }

        setTimeout(type, speed);
    }

    setTimeout(type, 1000);


    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                
                // Animate skill bars when visible
                if (entry.target.classList.contains('skill-card-minimal')) {
                    const progressFills = entry.target.querySelectorAll('.progress-fill');
                    progressFills.forEach(fill => {
                        const width = fill.getAttribute('data-width');
                        fill.style.width = width;
                    });
                }
                
                // Animate skill bars in old structure
                if (entry.target.classList.contains('skill-category')) {
                    const barFills = entry.target.querySelectorAll('.bar-fill');
                    barFills.forEach(fill => {
                        const width = fill.getAttribute('data-width');
                        fill.style.width = width;
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements with stagger animation for project cards
    const projectCards = document.querySelectorAll('.project-card-minimal');
    projectCards.forEach((card, index) => {
        // Add stagger delay using style
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe other elements
    document.querySelectorAll('.skill-category, .skill-card-minimal, .stat-card, .timeline-item, .about-left, .about-timeline').forEach(el => {
        observer.observe(el);
    });

    // ===== CONTACT FORM HANDLER =====
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            
            // Show success message (you can integrate with email service later)
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
            
            // TODO: Integrate with Formspree, EmailJS, or backend API
            // Example: fetch('https://formspree.io/f/your-form-id', { method: 'POST', body: formData })
        });
    }

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const targetId = this.getAttribute("href");

            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        });
    });

    // ===== FINAL CTA SECTION ANIMATION =====
    const finalCtaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.3 });

    const finalCtaContent = document.querySelector('.final-cta-content');
    if (finalCtaContent) {
        finalCtaObserver.observe(finalCtaContent);
    }

    // ===== CHATBOT FUNCTIONALITY =====
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotPanel = document.getElementById('chatbotPanel');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const quickOptions = document.querySelectorAll('.quick-option');

    // Toggle chatbot panel
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', () => {
            chatbotPanel.classList.toggle('active');
            if (chatbotPanel.classList.contains('active')) {
                chatbotToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            } else {
                chatbotToggle.innerHTML = '<i class="fa-solid fa-message"></i>';
            }
        });
    }

    // Close chatbot
    if (chatbotClose) {
        chatbotClose.addEventListener('click', () => {
            chatbotPanel.classList.remove('active');
            chatbotToggle.innerHTML = '<i class="fa-solid fa-message"></i>';
        });
    }

    // Handle quick options
    quickOptions.forEach(option => {
        option.addEventListener('click', () => {
            const action = option.getAttribute('data-action');
            
            // Add user message
            addUserMessage(option.textContent.trim());
            
            // Process action
            setTimeout(() => {
                switch(action) {
                    case 'projects':
                        addBotMessage('Check out my featured projects in the Projects section above! 🚀');
                        break;
                    case 'skills':
                        addBotMessage('I have expertise in Frontend, Backend, Cybersecurity, and AI technologies. See the Skills section for details! 💡');
                        break;
                    case 'contact':
                        addBotMessage('You can reach out using the contact form below or scroll down to the Contact section! 📧');
                        setTimeout(() => {
                            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 500);
                        break;
                    case 'resume':
                        addBotMessage('You can download my resume from the button in the section above! 📄');
                        break;
                }
            }, 600);
        });
    });

    function addUserMessage(text) {
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-message user-message';
        userMsg.textContent = text;
        chatbotMessages.appendChild(userMsg);
        scrollToBottom();
    }

    function addBotMessage(text) {
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-message bot-message';
        botMsg.textContent = text;
        chatbotMessages.appendChild(botMsg);
        scrollToBottom();
    }

    function scrollToBottom() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

});