
// ===== RUN AFTER PAGE LOAD =====
document.addEventListener("DOMContentLoaded", function () {

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
        "Web Consultant"
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

});