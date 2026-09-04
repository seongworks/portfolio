/* ==========================================================
   ui.js  —  모바일 메뉴 · 스크롤 효과
   ========================================================== */

(function () {
  /* ---- 모바일 메뉴 토글 ---- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    });

    // 메뉴 안 링크를 누르면 닫기
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- 스크롤하면 헤더에 경계선 ---- */
  var header = document.getElementById("header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- 스크롤 등장 효과 ---- */
  var targets = document.querySelectorAll("[data-reveal]");

  if (!("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("is-in"); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var delay = entry.target.dataset.delay || 0;
      setTimeout(function () { entry.target.classList.add("is-in"); }, delay);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

  targets.forEach(function (el) { io.observe(el); });
})();
