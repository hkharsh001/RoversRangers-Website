document.addEventListener("DOMContentLoaded", () => {

  // A simple throttle function to limit how often a function can run.
  // This is used to improve performance of scroll events.
  const throttle = (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  // ===== AOS (ANIMATE ON SCROLL) INITIALIZATION =====
  // Check if the AOS library is loaded before initializing
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }

  // ===== MOBILE MENU LOGIC =====
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  // Function to close the mobile menu
  const closeMenu = () => {
    navMenu.classList.remove("active");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  if (menuToggle && navMenu) {
    // Toggle menu on button click
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent the 'document' click listener from closing it immediately
      navMenu.classList.toggle("active");
      menuToggle.classList.toggle("active");
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", !isExpanded);
    });

    // Close menu when a navigation link is clicked
    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (navMenu.classList.contains("active")) {
          closeMenu();
        }
      });
    });

    // Close menu when clicking outside of it
    document.addEventListener("click", (e) => {
      if (navMenu.classList.contains("active") && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        closeMenu();
      }
    });
  }


  // ===== SCROLL-DEPENDENT FEATURES =====
  const backToTopButton = document.getElementById("back-to-top");
  const sections = document.querySelectorAll("section[id]");
  const navLinksForScroll = document.querySelectorAll("#nav-menu a[href^='#']"); // Only target on-page links

  const handleScroll = () => {
    const scrollY = window.pageYOffset;

    // --- Back to Top Button Visibility ---
    if (backToTopButton) {
      if (scrollY > 300) {
        backToTopButton.classList.add("visible");
      } else {
        backToTopButton.classList.remove("visible");
      }
    }

    // --- Active Nav Link on Scroll ---
    if (sections.length > 0 && navLinksForScroll.length > 0) {
      let currentSectionId = "";
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 150) { // Adjust offset as needed
          currentSectionId = section.getAttribute("id");
        }
      });

      navLinksForScroll.forEach(link => {
        link.classList.remove("active");
        // Check if the link's href matches the current section's id
        if (link.getAttribute("href").substring(1) === currentSectionId) {
          link.classList.add("active");
        }
      });
    }
  };

  // Attach the throttled scroll handler
  window.addEventListener("scroll", throttle(handleScroll, 100));
  
  // --- Back to Top Button Click Event ---
  if (backToTopButton) {
    backToTopButton.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

});
