// Rover & Ranger Website Script

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Rover & Ranger Website Loaded");

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      document.querySelector(link.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
    });
  });

  // Join form
  const joinBtn = document.getElementById("joinFormBtn");
  if (joinBtn) {
    joinBtn.addEventListener("click", () => {
      window.open("https://forms.gle/", "_blank"); // Replace with your Google Form link
    });
  }
});
