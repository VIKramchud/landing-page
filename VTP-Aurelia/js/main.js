// header sticky + mobile menu ------------------------------------------------------------->

const header = document.querySelector(".header");
const menu = document.querySelector(".menu");

function onScroll() {
  const y = window.pageYOffset;
  header.classList.toggle("is-sticky", y > 60);
  document.querySelector(".go-top").classList.toggle("show", y > 400);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const burger = document.querySelector(".burger");
const menuOverlay = document.querySelector(".menu-overlay");

function setMenu(open) {
  menu.classList.toggle("active", open);
  menuOverlay.classList.toggle("active", open);
  document.body.classList.toggle("menu-open", open);
  burger.setAttribute("aria-expanded", open);
}

burger.addEventListener("click", () => setMenu(true));
menuOverlay.addEventListener("click", () => setMenu(false));
menu.querySelector(".menu-close").addEventListener("click", () => setMenu(false));
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
window.addEventListener("resize", () => { if (window.innerWidth > 991) setMenu(false); });

document.querySelector(".go-top").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));


// enquiry popup ------------------------------------------------------------------------------>

const popup = document.querySelector(".form-popup-bg");

function openForm() {
  popup.classList.add("is-visible");
}

function closeForm() {
  popup.classList.remove("is-visible");
}

document.querySelectorAll(".btnOpenForm").forEach(btn => btn.addEventListener("click", e => {
  e.preventDefault();
  openForm();
}));

popup.addEventListener("click", e => {
  if (e.target === popup || e.target.closest(".btnCloseForm")) closeForm();
});

// auto open once after page load
setTimeout(openForm, 4000);


// gallery lightbox --------------------------------------------------------------------------->

const lightbox = document.getElementById("lightbox");
const lbImg = lightbox.querySelector("img");
const lbItems = [...document.querySelectorAll(".g-item img, .loc-map img")];
let lbIndex = 0;

function showLightbox(i) {
  lbIndex = (i + lbItems.length) % lbItems.length;
  lbImg.src = lbItems[lbIndex].src;
  lbImg.alt = lbItems[lbIndex].alt;
  lightbox.classList.add("open");
}

lbItems.forEach((img, i) => img.closest(".g-item, .loc-map").addEventListener("click", () => showLightbox(i)));
lightbox.querySelector(".lb-prev").addEventListener("click", () => showLightbox(lbIndex - 1));
lightbox.querySelector(".lb-next").addEventListener("click", () => showLightbox(lbIndex + 1));
lightbox.addEventListener("click", e => {
  if (e.target === lightbox || e.target.closest(".lb-close")) lightbox.classList.remove("open");
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    setMenu(false);
    closeForm();
    lightbox.classList.remove("open");
  }
  if (lightbox.classList.contains("open")) {
    if (e.key === "ArrowLeft") showLightbox(lbIndex - 1);
    if (e.key === "ArrowRight") showLightbox(lbIndex + 1);
  }
});


// reveal on scroll ----------------------------------------------------------------------------->

const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add("in"));
}
