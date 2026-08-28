
// ===== RUN AFTER PAGE LOAD =====
document.addEventListener("DOMContentLoaded", function () {

    // ===== PORTFOLIO INTRO =====
    const intro = document.getElementById('portfolioIntro');
    const introGreetings = document.getElementById('introGreetings');
    const introWelcome = document.getElementById('introWelcome');
    const introSkip = document.getElementById('introSkip');
    const greetings = document.querySelectorAll('.greeting');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function hideIntro() {
        if (intro) {
            intro.style.transition = 'opacity 0.6s ease, visibility 0.6s ease';
            intro.classList.add('hidden');
            setTimeout(() => {
                intro.style.display = 'none';
            }, 600);
        }
    }

    function showIntro() {
        if (!intro) return;
        intro.style.display = 'flex';
        intro.style.transition = 'none';
        intro.classList.remove('hidden');
        intro.style.opacity = '1';
        intro.style.visibility = 'visible';
        intro.style.pointerEvents = 'auto';
    }

    function playIntro() {
        if (!intro || !introGreetings || !introWelcome) return;

        showIntro();

        const greetingElements = Array.from(greetings);
        const showDuration = 700;   // how long each greeting is fully visible
        const fadeDuration = 350;   // matches CSS transition duration
        const totalGreetings = greetingElements.length;

        // Ensure all greetings start hidden
        greetingElements.forEach(g => {
            g.classList.remove('active', 'exit');
        });

        let currentTime = 0;

        greetingElements.forEach((greeting, index) => {
            // Fade IN
            setTimeout(() => {
                greeting.classList.remove('exit');
                greeting.classList.add('active');
            }, currentTime);

            // Fade OUT after showing
            currentTime += fadeDuration + showDuration;
            setTimeout(() => {
                greeting.classList.remove('active');
                greeting.classList.add('exit');
            }, currentTime);

            // Wait for fade-out before next greeting
            currentTime += fadeDuration;
        });

        // Show welcome screen after all greetings are done
        const welcomeDelay = currentTime + 300;
        setTimeout(() => {
            if (introGreetings) introGreetings.style.display = 'none';
            if (introWelcome) introWelcome.classList.add('active');
        }, welcomeDelay);

        // Hide intro overlay after welcome is shown
        setTimeout(() => {
            hideIntro();
        }, welcomeDelay + 2000);
    }

    showIntro();

    if (!prefersReducedMotion) {
        playIntro();
    } else {
        setTimeout(() => {
            hideIntro();
        }, 1500);
    }

    if (introSkip) {
        introSkip.addEventListener('click', () => {
            hideIntro();
            if (introGreetings) introGreetings.style.display = 'none';
            if (introWelcome) introWelcome.classList.remove('active');
        });
    }

    // ===== SCROLL PROGRESS BAR =====
    const scrollProgress = document.getElementById('scrollProgress');

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = scrollPercentage + '%';
    });

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
        "Full-Stack Developer",
        "Application Developer",
        "Software Tester",
        "Freelance Developer",
        "AI/ML Explorer",
        "Cybersecurity Explorer"
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typingElement = document.querySelector(".typing-text");

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typingElement.textContent = currentText.substring(0, charIndex);

        let speed = isDeleting ? 70 : 130;

        if (!isDeleting && charIndex >= currentText.length) {
            isDeleting = true;
            speed = 1000; // reduced pause
        } else if (isDeleting && charIndex <= 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            speed = 200;
        }

        setTimeout(type, speed);
    }

    setTimeout(type, 1000);


    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
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
            } else {
                // Optional: Remove 'show' to re-animate when scrolling back
                // entry.target.classList.remove('show');
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
        contactForm.addEventListener('submit', function (e) {
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
    const chatbotInputArea = document.getElementById('chatbotInputArea');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSendBtn = document.getElementById('chatbotSendBtn');
    const chatSuggestions = document.getElementById('chatSuggestions');

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

    // Bot response data
    const botResponses = {
        intro: "Hey! I'm Vinayaka, a Full Stack Developer who genuinely enjoys solving real problems through code. I'm motivated by building things that are both technically solid and actually useful. Beyond the screen, I'm curious about how systems work end-to-end, and I love the process of turning a rough idea into something reliable. For me, development isn't just about syntax — it's about understanding the problem first, then choosing the right tool for it.",

        approach: "I approach problems by breaking them into smaller parts, understanding the root cause, and then building clean, maintainable solutions. I enjoy debugging as much as building — there's something satisfying about tracing an issue back to its source. I prefer learning by building real projects, testing as I go, and iterating based on feedback. Security and performance are considerations I weave in early, not as afterthoughts.",

        beyond: "A few things you won't see on my resume: I experiment with AI/ML side projects because I find generative models fascinating. I'm currently exploring more about LLMs and model integration in real applications. I enjoy participating in hackathons and workshops — like the J.P. Morgan simulation and the IIT Kanpur AI/ML workshop — because they push me to learn fast under pressure. My personal goal is to bridge strong engineering practices with emerging AI capabilities in production systems.",

        ask: "Feel free to ask me anything! Try one of the suggestions below or type your own question."
    };

    const keywordResponses = {
        'currently learning': "I'm currently deepening my knowledge of LLMs, generative AI, and model integration. I want to build more real-world applications that combine traditional full-stack engineering with modern AI capabilities.",
        'what are you learning': "I'm currently deepening my knowledge of LLMs, generative AI, and model integration. I want to build more real-world applications that combine traditional full-stack engineering with modern AI capabilities.",
        'learning': "Right now I'm focused on LLMs, generative AI, and how to integrate them into production-grade apps. I also spend time sharpening my skills in React, Node.js, and cloud deployment.",
        'motivate': "What motivates me is building software that actually helps people or solves a real problem. I enjoy the process of taking a messy, undefined idea and shaping it into something reliable and useful. Continuous improvement keeps me going — there's always a better way to write code or design a system.",
        'motivates': "What motivates me is building software that actually helps people or solves a real problem. I enjoy the process of taking a messy, undefined idea and shaping it into something reliable and useful. Continuous improvement keeps me going — there's always a better way to write code or design a system.",
        'motivation': "What motivates me is building software that actually helps people or solves a real problem. I enjoy the process of taking a messy, undefined idea and shaping it into something reliable and useful. Continuous improvement keeps me going — there's always a better way to write code or design a system.",
        'projects': "I really enjoy projects that sit at the intersection of AI and practical engineering — like my cybersecurity platform Raksha-Vyuh or the agriculture AI tool IntelliCrop. I like projects where I have to think about both the model and the full stack around it.",
        'enjoy': "I enjoy projects where I can solve a meaningful problem end-to-end. My favorites are ones that mix AI with real user needs — whether that's cybersecurity, agriculture, or campus management. The challenge of making complex systems simple is what draws me in.",
        'strengths': "My strengths are in full-stack development, secure coding practices, and applying AI/ML to practical problems. I'm comfortable across the stack — from React frontends to Python/Node backends to cloud deployment — and I care deeply about writing code that's maintainable and tested.",
        'resume': "My resume covers my technical skills, projects, and certifications, but some of my best learning has come from side experiments, hackathons, and the late-night debugging sessions that taught me the most. If you want to know what I'm actually like to work with, ask me about my approach to problem-solving!",
        'hackathon': "I've participated in hands-on simulations and workshops like the J.P. Morgan Software Engineering Simulation and the Ethical EduFabrica AI/ML workshop at IIT Kanpur. Those experiences taught me to think fast, collaborate under pressure, and deliver working solutions quickly.",
        'goal': "My short-term goal is to contribute to engineering teams that build impactful, scalable products. Long-term, I want to work at the intersection of AI and full-stack engineering — building intelligent systems that are also well-architected and reliable.",
        'debugging': "Debugging is one of my favorite parts of development. I start by reproducing the issue, then trace it methodically — checking logs, isolating variables, and narrowing down the root cause. I find that most bugs teach you more about the system than happy paths do.",
        'challenge': "I'm drawn to challenges that require both technical depth and clear thinking — like securing real-time systems, optimizing data pipelines, or making AI models work reliably in production. The best problems force you to learn something new."
    };

    function getBotResponse(userText) {
        const text = userText.toLowerCase();
        for (const [keyword, response] of Object.entries(keywordResponses)) {
            if (text.includes(keyword)) {
                return response;
            }
        }
        return "That's a great question! While I keep my assistant focused on key topics right now, the best way to get to know me is through my projects, skills, or the contact form. Feel free to ask about my work, my approach to problems, or what I'm learning next!";
    }

    function showInputArea() {
        if (chatbotInputArea) {
            chatbotInputArea.style.display = 'block';
            if (chatbotInput) chatbotInput.focus();
        }
    }

    function handleUserMessage(text) {
        if (!text.trim()) return;

        addUserMessage(text);

        if (chatbotInput) chatbotInput.value = '';

        setTimeout(() => {
            const response = getBotResponse(text);
            addBotMessage(response);
        }, 600);
    }

    // Handle quick options
    quickOptions.forEach(option => {
        option.addEventListener('click', () => {
            const action = option.getAttribute('data-action');
            const label = option.textContent.trim();

            addUserMessage(label);

            setTimeout(() => {
                if (action === 'ask') {
                    addBotMessage(botResponses.ask);
                    showInputArea();
                } else if (botResponses[action]) {
                    addBotMessage(botResponses[action]);
                    if (action === 'ask') showInputArea();
                }
            }, 600);
        });
    });

    // Chat input handlers
    if (chatbotSendBtn) {
        chatbotSendBtn.addEventListener('click', () => {
            handleUserMessage(chatbotInput.value);
        });
    }

    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleUserMessage(chatbotInput.value);
            }
        });
    }

    // Suggestion chips
    if (chatSuggestions) {
        chatSuggestions.addEventListener('click', (e) => {
            if (e.target.classList.contains('suggestion-chip')) {
                handleUserMessage(e.target.textContent.trim());
            }
        });
    }

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

    // ===== SCROLL INDICATOR FUNCTIONALITY =====
    const scrollIndicator = document.getElementById('scrollIndicator');

    if (scrollIndicator) {
        // Click to scroll to About section
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });

        // Hide on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '0.7';
                scrollIndicator.style.pointerEvents = 'all';
            }
        });
    }

    // ===== EASTER EGG: KONAMI CODE =====
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Activate Easter egg
                document.body.style.animation = 'pulse 2s ease-in-out';
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 2000);
                alert('👑 KINGDOM MODE ACTIVATED! 👑');
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    // ===== MODAL POPUP SYSTEM =====
    const modalOverlay = document.getElementById('modalOverlay');
    const modalContainer = document.getElementById('modalContainer');
    const modalClose = document.getElementById('modalClose');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalLabelEl = document.querySelector('.modal-label');
    const modalTitleEl = document.querySelector('.modal-title');
    const modalDescEl = document.querySelector('.modal-description');
    const modalStatusText = document.querySelector('.modal-status-text');
    const modalStatusValue = document.querySelector('.modal-status-value');

    // Modal content configurations
    const modalContent = {
        resume: {
            label: 'RESUME',
            title: 'Coming Soon',
            description: "I'm currently updating my resume with my latest projects and experience. Check back soon!",
            statusText: 'Resume Status',
            statusValue: 'Updating'
        },
        casestudy: {
            label: 'CASE STUDY',
            title: 'Coming Soon',
            description: 'Detailed case studies are being prepared. They will be available soon with in-depth project insights!',
            statusText: 'Case Study Status',
            statusValue: 'In Progress'
        },
        code: {
            label: 'SOURCE CODE',
            title: 'Coming Soon',
            description: "This project is being refined. The source code will be available once it's production-ready.",
            statusText: 'Code Status',
            statusValue: 'Refining'
        },
        demo: {
            label: 'LIVE DEMO',
            title: 'Coming Soon',
            description: 'This project is currently being updated and refined. The live demo will be available soon.',
            statusText: 'Project Status',
            statusValue: 'In Development'
        }
    };

    // Function to show modal
    function showModal(type) {
        const content = modalContent[type];
        if (content) {
            if (modalLabelEl) modalLabelEl.textContent = content.label;
            if (modalTitleEl) modalTitleEl.textContent = content.title;
            if (modalDescEl) modalDescEl.textContent = content.description;
            if (modalStatusText) modalStatusText.textContent = content.statusText;
            if (modalStatusValue) modalStatusValue.textContent = content.statusValue;
            if (modalOverlay) modalOverlay.classList.add('active');
        }
    }

    // Close modal
    function closeModal() {
        if (modalOverlay) modalOverlay.classList.remove('active');
    }

    // Event listeners
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Add click handlers to buttons
    document.querySelectorAll('[data-modal-type]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const modalType = button.getAttribute('data-modal-type');
            showModal(modalType);
        });
    });

    // ===== CERTIFICATES CAROUSEL =====
    const carousel = document.getElementById('certificatesCarousel');
    const track = document.getElementById('certificatesTrack');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const dots = document.querySelectorAll('#carouselDots .dot');

    if (carousel && track) {
        let currentIndex = 0;
        const slides = document.querySelectorAll('.certificate-slide');
        const totalSlides = slides.length;
        let autoSlideInterval;
        const autoSlideDelay = 5000;

        function updateCarousel() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            if (currentIndex < 0) currentIndex = totalSlides - 1;
            if (currentIndex >= totalSlides) currentIndex = 0;
            updateCarousel();
            resetAutoSlide();
        }

        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        function prevSlide() {
            goToSlide(currentIndex - 1);
        }

        function startAutoSlide() {
            stopAutoSlide();
            autoSlideInterval = setInterval(nextSlide, autoSlideDelay);
        }

        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
            }
        }

        function resetAutoSlide() {
            stopAutoSlide();
            startAutoSlide();
        }

        // Navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
            });
        }

        // Dots
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                goToSlide(index);
            });
        });

        // Pause on hover
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);

        // Touch support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoSlide();
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoSlide();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }

        // Start auto-slide
        startAutoSlide();
    }

    // ===== VIEW MORE PROJECTS TOGGLE =====
    const viewMoreBtn = document.getElementById('viewMoreProjects');
    const otherProjectsWrapper = document.getElementById('otherProjectsWrapper');

    if (viewMoreBtn && otherProjectsWrapper) {
        viewMoreBtn.addEventListener('click', () => {
            const isOpen = otherProjectsWrapper.classList.toggle('open');
            viewMoreBtn.classList.toggle('expanded', isOpen);

            const textEl = viewMoreBtn.querySelector('.view-more-text');
            if (textEl) {
                textEl.textContent = isOpen ? 'Show Less' : 'View More Projects';
            }
        });
    }

});