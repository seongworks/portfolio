/* ==========================================================
   ui.js  —  모바일 메뉴 · 스크롤 효과
   ========================================================== */

(function () {
  /* ---- 모바일 메뉴 토글 ---- */
  try {
    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("nav");

    if (toggle && nav) {
      // 닫혀 있는 동안에는 Tab 키로도 링크에 접근되지 않게 합니다.
      // (안 보이는 메뉴에 포커스가 들어가는 걸 막아줍니다)
      var setReachable = function (open) {
        var mobile = window.matchMedia("(max-width: 720px)").matches;
        nav.querySelectorAll(".nav__link").forEach(function (a) {
          if (mobile && !open) a.setAttribute("tabindex", "-1");
          else a.removeAttribute("tabindex");
        });
        nav.setAttribute("aria-hidden", mobile && !open ? "true" : "false");
      };

      var setOpen = function (open) {
        nav.classList.toggle("is-open", open);
        toggle.classList.toggle("is-open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
        setReachable(open);
      };

      toggle.addEventListener("click", function () {
        setOpen(!nav.classList.contains("is-open"));
      });

      // 메뉴 안 링크를 누르면 닫기
      nav.addEventListener("click", function (e) {
        if (e.target.closest("a")) setOpen(false);
      });

      // Esc 로 닫기
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && nav.classList.contains("is-open")) {
          setOpen(false);
          toggle.focus();
        }
      });

      // 창 크기가 바뀌면 데스크톱/모바일에 맞게 다시 정리
      window.addEventListener("resize", function () {
        setReachable(nav.classList.contains("is-open"));
      });

      setOpen(false);
    }
  } catch (e) {
    console.error("[ui.js] 메뉴를 초기화하지 못했습니다.", e);
  }

  /* ---- 스크롤하면 헤더에 경계선 ---- */
  try {
    var header = document.getElementById("header");
    if (header) {
      var onScroll = function () {
        header.classList.toggle("is-scrolled", window.scrollY > 8);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
  } catch (e) {
    console.error("[ui.js] 헤더 스크롤 효과를 켜지 못했습니다.", e);
  }

  /* ---- 스크롤 등장 효과 ----
     무슨 일이 있어도 글이 안 보이는 상태로 남지 않게 합니다. */
  var revealAll = function () {
    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      el.classList.add("is-in");
    });
  };

  try {
    var targets = document.querySelectorAll("[data-reveal]");

    if (!("IntersectionObserver" in window)) {
      revealAll();
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
  } catch (e) {
    console.error("[ui.js] 등장 효과를 켜지 못했습니다. 내용을 바로 표시합니다.", e);
    revealAll();
  }
})();
