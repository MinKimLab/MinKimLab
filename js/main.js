// NCEL site interactions: nav toggle, sticky shadow, scroll reveal, hero slider, back-to-top
(function () {
  // Mobile nav
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      toggle.classList.toggle("open");
    });
  }

  // Header shadow on scroll
  var header = document.querySelector(".site-header");
  window.addEventListener("scroll", function () {
    if (header) header.classList.toggle("scrolled", window.scrollY > 10);
    if (topBtn) topBtn.classList.toggle("show", window.scrollY > 600);
  }, { passive: true });

  // Back to top
  var topBtn = document.createElement("button");
  topBtn.className = "to-top";
  topBtn.setAttribute("aria-label", "Back to top");
  topBtn.innerHTML = "&uarr;";
  topBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  document.body.appendChild(topBtn);

  // Scroll reveal: auto-tag common blocks, then observe
  var selectors = [
    ".card", ".img-card", ".person", ".news-item", ".feed-item",
    ".gallery-grid figure", ".year-block", ".timeline li",
    ".research-feature", ".research-imgs img", ".highlight-band > *",
    ".cta-band", ".contact-grid > *", ".section-head", ".section-label", ".group-title"
  ];
  var items = document.querySelectorAll(selectors.join(","));
  items.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("visible"); });
  }

  // Hero slider
  var slider = document.querySelector(".hero-slider");
  if (slider) {
    var slides = slider.querySelectorAll(".slide");
    var dotsWrap = slider.querySelector(".slider-dots");
    var current = 0;
    var timer = null;

    function go(i) {
      slides[current].classList.remove("active");
      dotsWrap.children[current].classList.remove("active");
      current = (i + slides.length) % slides.length;
      slides[current].classList.add("active");
      dotsWrap.children[current].classList.add("active");
    }
    function schedule() {
      clearInterval(timer);
      timer = setInterval(function () { go(current + 1); }, 6000);
    }

    slides.forEach(function (_, i) {
      var b = document.createElement("button");
      b.setAttribute("aria-label", "Slide " + (i + 1));
      if (i === 0) b.classList.add("active");
      b.addEventListener("click", function () { go(i); schedule(); });
      dotsWrap.appendChild(b);
    });
    slides[0].classList.add("active");
    schedule();
  }
})();
