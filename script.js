// ===== Initialize AOS =====
AOS.init({ duration: 800, once: true });

// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  menuToggle.textContent = menuToggle.textContent === "☰" ? "✖" : "☰";
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", e => {
    if(link.getAttribute("href").startsWith("#")) {
      e.preventDefault();
      document.querySelector(link.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
      navMenu.classList.remove("active");
      menuToggle.textContent = "☰";
    }
  });
});

// ===== DARK MODE TOGGLE =====
const modeToggle = document.getElementById("mode-toggle");
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  modeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});
