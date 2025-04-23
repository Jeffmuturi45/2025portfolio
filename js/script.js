// DOM Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Loader
  setTimeout(function () {
    document.querySelector(".loader").classList.add("fade-out");
  }, 1000);

  // Set current year in footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Mobile navigation toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      this.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking a link
  const navItems = document.querySelectorAll(".nav-links a");
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });
  });

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Active link highlighting
  const currentPage = window.location.pathname.split("/").pop();
  const navLinksAll = document.querySelectorAll(".nav-links a");

  navLinksAll.forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (
      linkPage === currentPage ||
      (currentPage === "" && linkPage === "index.html")
    ) {
      link.classList.add("active");
    }
  });

  // Initialize animations (GSAP)
  gsap.from(".navbar", {
    duration: 1,
    y: -100,
    opacity: 0,
    ease: "power3.out",
  });
});

// Typewriter Effect (for homepage)
class Typewriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Initialize Typewriter if on homepage
if (document.querySelector(".typing-text")) {
  const txtElement = document.querySelector(".typing-text");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  new Typewriter(txtElement, words, wait);
}
