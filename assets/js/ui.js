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


/* ==========================================================
   사진 크게 보기 (라이트박스)
   갤러리 사진을 누르면 새 탭으로 나가지 않고, 화면을 덮는 검은 판 위에
   크게 띄웁니다. 설명은 사진 아래에 작게 붙습니다.

   ※ 사진은 원래 <a href="그림파일"> 로 감싸여 있습니다.
     아래 코드는 그 클릭을 가로채는 방식이라, 자바스크립트가 멈춰도
     링크는 살아 있어 원본이 그냥 열립니다.
   ========================================================== */
(function () {
  "use strict";

  var gallery = document.querySelector(".project-gallery");
  if (!gallery) return;

  // 파일이 없어 지워지는 사진이 있으므로, 목록은 열 때마다 새로 셉니다.
  function shots() {
    return Array.prototype.slice.call(
      gallery.querySelectorAll("figure:not([data-pending]) .shot")
    );
  }

  var box = document.createElement("div");
  box.className = "lightbox";
  box.hidden = true;
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "사진 크게 보기");
  box.innerHTML =
    '<button class="lightbox__close" type="button" aria-label="닫기">✕</button>' +
    '<button class="lightbox__nav is-prev" type="button" aria-label="이전 사진">‹</button>' +
    '<button class="lightbox__nav is-next" type="button" aria-label="다음 사진">›</button>' +
    '<figure class="lightbox__stage">' +
      '<img alt="">' +
      '<figcaption><span class="lightbox__text"></span>' +
        '<a class="lightbox__raw" target="_blank" rel="noopener">원본 열기</a>' +
        '<span class="lightbox__count"></span>' +
      "</figcaption>" +
    "</figure>";
  document.body.appendChild(box);

  var img     = box.querySelector("img");
  var text    = box.querySelector(".lightbox__text");
  var raw     = box.querySelector(".lightbox__raw");
  var count   = box.querySelector(".lightbox__count");
  var prevBtn = box.querySelector(".is-prev");
  var nextBtn = box.querySelector(".is-next");

  var list = [], at = 0, lastFocus = null;

  function show(i) {
    if (!list.length) return;
    at = (i + list.length) % list.length;                 // 끝에서 처음으로 이어집니다
    var shot = list[at];
    var cap = shot.closest("figure").querySelector("figcaption");

    img.src = shot.getAttribute("href");
    img.alt = shot.querySelector("img").alt;
    text.textContent = cap ? cap.textContent.trim() : "";
    raw.href = shot.getAttribute("href");
    count.textContent = list.length > 1 ? at + 1 + " / " + list.length : "";

    var many = list.length > 1;
    prevBtn.hidden = nextBtn.hidden = !many;

    // 다음·이전 사진을 미리 받아두면 넘길 때 끊기지 않습니다.
    [at + 1, at - 1].forEach(function (n) {
      var s = list[(n + list.length) % list.length];
      if (s && s !== shot) new Image().src = s.getAttribute("href");
    });
  }

  function open(i) {
    list = shots();
    if (!list.length) return;
    lastFocus = document.activeElement;
    show(i);
    box.hidden = false;
    document.documentElement.style.overflow = "hidden";   // 뒤 페이지 스크롤 잠금
    box.querySelector(".lightbox__close").focus();
  }

  function close() {
    box.hidden = true;
    img.removeAttribute("src");
    document.documentElement.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  try {
    // 갤러리에 위임해 두면 나중에 다시 그려진 사진도 그대로 동작합니다.
    gallery.addEventListener("click", function (e) {
      var shot = e.target.closest(".shot");
      if (!shot) return;
      var all = shots();
      var i = all.indexOf(shot);
      if (i === -1) return;
      e.preventDefault();                                  // 새 탭으로 나가지 않게
      open(i);
    });

    box.addEventListener("click", function (e) {
      if (e.target.closest(".lightbox__raw")) return;       // 원본 열기는 그대로 통과
      if (e.target.closest(".lightbox__close") || e.target === box) return close();
      if (e.target.closest(".is-prev")) return show(at - 1);
      if (e.target.closest(".is-next")) return show(at + 1);
    });

    document.addEventListener("keydown", function (e) {
      if (box.hidden) return;
      if (e.key === "Escape")     { e.preventDefault(); close(); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); show(at - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); show(at + 1); }
    });

    // 휴대폰에서 좌우로 밀어 넘기기
    var x0 = null;
    box.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 50) show(at + (dx < 0 ? 1 : -1));
    }, { passive: true });
  } catch (e) {
    console.error("[ui.js] 사진 크게 보기를 켜지 못했습니다. 누르면 원본이 새 탭에서 열립니다.", e);
  }
})();
