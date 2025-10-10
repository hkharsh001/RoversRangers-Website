// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector("#nav-menu .nav-links"); // target the ul inside nav

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  // Toggle icon between ☰ and ✖
  if (menuToggle.textContent === "☰") {
    menuToggle.textContent = "✖";
  } else {
    menuToggle.textContent = "☰";
  }
});

// ===== SMOOTH SCROLL FOR NAV LINKS =====
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    if (link.getAttribute("href").startsWith("#")) {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      document.querySelector(targetId).scrollIntoView({
        behavior: "smooth",
      });
      // Close menu on mobile
      navMenu.classList.remove("active");
      menuToggle.textContent = "☰";
    }
  });
});
