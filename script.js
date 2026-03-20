// ===== RUN AFTER PAGE LOAD =====
document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav ul");
    const icon = menuToggle.querySelector("i");

    // TOGGLE MENU
    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");

        // Toggle icon (bars <-> close)
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
    });

    // CLOSE MENU WHEN CLICKING LINK (MOBILE UX)
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            icon.classList.add("fa-bars");
            icon.classList.remove("fa-xmark");
        });
    });

});