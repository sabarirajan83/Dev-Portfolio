// ==========================================
// 1. Dark Mode Toggle
// ==========================================
const themeToggle = document.getElementById("theme-toggle");
const body = document.documentElement;
const themeIcon = themeToggle.querySelector("i");

// Check local storage for theme preference
const currentTheme = localStorage.getItem("theme") || "light";
body.setAttribute("data-theme", currentTheme);
updateIcon(currentTheme);

themeToggle.addEventListener("click", () => {
  let theme = body.getAttribute("data-theme");
  if (theme === "light") {
    body.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    updateIcon("dark");
  } else {
    body.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    updateIcon("light");
  }
});

function updateIcon(theme) {
  if (theme === "dark") {
    themeIcon.classList.replace("fa-moon", "fa-sun");
  } else {
    themeIcon.classList.replace("fa-sun", "fa-moon");
  }
}

// ==========================================
// 2. Mobile Menu Toggle
// ==========================================
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  const icon = hamburger.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});

// Close mobile menu when a link is clicked
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.querySelector("i").classList.add("fa-bars");
    hamburger.querySelector("i").classList.remove("fa-xmark");
  });
});

// ==========================================
// 3. Scroll Reveal Animations
// ==========================================
const revealElements = document.querySelectorAll(".reveal");

const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const revealObserver = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("active");
    // Optional: stop observing once revealed
    observer.unobserve(entry.target);
  });
}, revealOptions);

revealElements.forEach((el) => {
  revealObserver.observe(el);
});

// ==========================================
// 4. Active Navigation Highlight
// ==========================================
const sections = document.querySelectorAll(".section");
const navLi = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    // Adjust trigger point
    if (scrollY >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navLi.forEach((li) => {
    li.classList.remove("active");
    if (li.getAttribute("href") === `#${current}`) {
      li.classList.add("active");
    }
  });
});

// ==========================================
// 5. Image Gallery Modal
// ==========================================
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("expanded-img");
const closeModal = document.querySelector(".close-modal");
const galleryImages = document.querySelectorAll(".gallery-img");

// Open modal on image click
galleryImages.forEach((img) => {
  img.addEventListener("click", function () {
    modal.style.display = "block";
    modalImg.src = this.src;
    // Prevent background scrolling
    document.body.style.overflow = "hidden";
  });
});

// Close modal on 'X' click
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
});

// Close modal when clicking outside the image
modal.addEventListener("click", (e) => {
  if (e.target !== modalImg) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// ==========================================
// 6. Horizontal Slider Buttons
// ==========================================
const sliders = document.querySelectorAll(".slider-wrapper");

sliders.forEach((wrapper) => {
  const grid = wrapper.querySelector(".achievement-grid");
  const leftBtn = wrapper.querySelector(".left-btn");
  const rightBtn = wrapper.querySelector(".right-btn");

  if (leftBtn && rightBtn && grid) {
    // Scroll Left
    leftBtn.addEventListener("click", () => {
      const card = grid.querySelector(".card");
      // Card width + gap (2rem = 32px)
      const scrollAmount = card.offsetWidth + 32;
      grid.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    // Scroll Right
    rightBtn.addEventListener("click", () => {
      const card = grid.querySelector(".card");
      const scrollAmount = card.offsetWidth + 32;
      grid.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  }
});
