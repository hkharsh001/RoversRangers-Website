/* =========================================================
   ROVER & RANGER UNIT — FINAL script.js
   Includes:
   - AOS initialization
   - Accessible responsive hamburger menu
   - Compact mobile menu behaviour
   - Close menu on link click, outside click and Escape
   - Back-to-top button
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const backToTopButton = document.getElementById("back-to-top");

  /* AOS is optional; the website still works if its CDN is unavailable. */
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 650,
      once: true,
      offset: 70
    });
  }

  /* -------------------------
     RESPONSIVE HAMBURGER MENU
     ------------------------- */

  const isMobileNav = () =>
    window.matchMedia("(max-width: 900px)").matches;

  const openMenu = () => {
    if (!menuToggle || !navMenu) return;

    navMenu.classList.add("active");
    menuToggle.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
  };

  const closeMenu = (returnFocus = false) => {
    if (!menuToggle || !navMenu) return;

    navMenu.classList.remove("active");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");

    if (returnFocus) {
      menuToggle.focus();
    }
  };

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", (event) => {
      event.stopPropagation();

      const isExpanded =
        menuToggle.getAttribute("aria-expanded") === "true";

      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close after selecting a navigation destination.
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => closeMenu());
    });

    // Close when tapping outside the menu.
    document.addEventListener("click", (event) => {
      if (
        isMobileNav() &&
        navMenu.classList.contains("active") &&
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    // Escape key closes the menu and returns focus to its button.
    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        navMenu.classList.contains("active")
      ) {
        closeMenu(true);
      }
    });

    // Reset menu state when switching to desktop width.
    window.addEventListener("resize", () => {
      if (!isMobileNav()) {
        closeMenu();
      }
    });
  }

  /* -------------------------
     BACK-TO-TOP BUTTON
     ------------------------- */

  let scrollTicking = false;

  const updateScrollUI = () => {
    const scrollPosition = window.scrollY || window.pageYOffset;

    if (backToTopButton) {
      backToTopButton.classList.toggle(
        "visible",
        scrollPosition > 300
      );
    }

    scrollTicking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(updateScrollUI);
        scrollTicking = true;
      }
    },
    { passive: true }
  );

  updateScrollUI();

  if (backToTopButton) {
    backToTopButton.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});
