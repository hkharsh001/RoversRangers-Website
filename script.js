// ===== Initialize AOS (Animation on Scroll) =====
AOS.init({
  duration: 800,
  once: true, // Animation runs only once when scrolled into view
});

// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

// Toggle menu visibility when clicking ☰ icon
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  // Toggle icon style (optional visual feedback)
  menuToggle.textContent =
    menuToggle.textContent === "☰" ? "✖" : "☰";
});

// ===== SMOOTH SCROLL FOR NAV LINKS =====
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // If link starts with #
    if (link.getAttribute("href").startsWith("#")) {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      document.querySelector(targetId).scrollIntoView({
        behavior: "smooth",
      });
      // Close menu on mobile after clicking a link
      navMenu.classList.remove("active");
      menuToggle.textContent = "☰";
    }
  });
});

// ===== OPTIONAL: Add scroll shadow effect on header =====
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 30) {
    header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.5)";
  } else {
    header.style.boxShadow = "none";
  }
});
