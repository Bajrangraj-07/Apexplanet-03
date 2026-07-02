// mobile menu open/close karne ke liye
const menuBtn = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

const allLinks = navLinks.querySelectorAll("a");
allLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});
