document.addEventListener("DOMContentLoaded", () => {

  // ===== AOS (ANIMATE ON SCROLL) INITIALIZATION =====
  AOS.init({
    duration: 800, // Animation duration in ms
    once: true, // Whether animation should happen only once
    offset: 100, // Offset (in px) from the original trigger point
  });

  // ===== MOBILE MENU TOGGLE =====
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      // Toggle classes for CSS animations/transitions
      navMenu.classList.toggle("active");
      menuToggle.classList.toggle("active");

      // Update ARIA attribute for accessibility
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", !isExpanded);
    });
  }

  // ===== CLOSE MOBILE MENU ON LINK CLICK & OUTSIDE CLICK =====
  const navLinks = document.querySelectorAll(".nav-links a");

  // Close on link click
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (navMenu.classList.contains("active") && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });


  // ===== BACK TO TOP BUTTON =====
  const backToTopButton = document.getElementById("back-to-top");

  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) { // Show button after scrolling 300px
        backToTopButton.classList.add("visible");
      } else {
        backToTopButton.classList.remove("visible");
      }
    });
  }

  // ===== ACTIVE NAV LINK ON SCROLL =====
  const sections = document.querySelectorAll("section[id]");
  const navLinksForScroll = document.querySelectorAll("#nav-menu a");

  if (sections.length > 0 && navLinksForScroll.length > 0) {
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) { // 150px offset to trigger a bit earlier
          current = section.getAttribute("id");
        }
      });

      navLinksForScroll.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
          link.classList.add("active");
        }
      });
    });
  }

});
// ===== HAMBURGER MENU TOGGLE =====
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.querySelector("nav");

  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
    menuToggle.classList.toggle("active");

    // Accessibility attribute toggle
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !expanded);
  });

  // Close menu when a nav link is clicked (mobile)
  const navLinks = nav.querySelectorAll("a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", false);
    });
  });
});
