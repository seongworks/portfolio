/* ==========================================================
   include.js  —  헤더 · 푸터 자동 삽입
   모든 페이지의 <div id="site-header"></div> 와
   <div id="site-footer"></div> 자리에 내용을 채워 넣습니다.
   → 메뉴를 고치려면 아래 NAV 배열만 수정하면 전체 페이지에 반영됩니다.

   ※ data/site.js 를 편집하다 실수(쉼표·따옴표 누락)해도
     메뉴는 살아 있도록 만들어져 있습니다.
     이때 F12 → Console 에 무엇이 잘못됐는지 한글로 표시됩니다.
   ========================================================== */

const NAV = [
  { label: "Home",    href: "index.html" },
  { label: "Work",    href: "work.html"  },
  { label: "About",   href: "about.html" },
  { label: "Contact", href: "contact.html" }
];

(function () {
  /* ---------------- 안전하게 읽기 ----------------
     site.js 가 깨지면 SITE 가 아예 없거나 접근만 해도 오류가 납니다.
     그래도 헤더·푸터가 통째로 사라지지 않도록 빈 값으로 대체합니다.
     (여기에 이메일·SNS 를 또 적어두면 나중에 두 곳을 고쳐야 하므로
      일부러 비워둡니다 — 빈 항목은 화면에 표시되지 않습니다)         */
  var EMPTY = {
    name: "Portfolio", nameEn: "", role: "", roleEn: "",
    email: "", phone: "", sns: [], copyright: ""
  };

  var S = EMPTY;
  try {
    if (typeof SITE !== "undefined" && SITE && typeof SITE === "object") {
      S = SITE;
    } else {
      throw new Error("SITE 없음");
    }
  } catch (e) {
    console.error(
      "[include.js] data/site.js 를 읽지 못했습니다.\n" +
      "쉼표(,) 나 큰따옴표(\") 가 빠지지 않았는지 확인하세요.\n" +
      "지금은 메뉴만 표시하고, 이메일·SNS 는 생략합니다."
    );
    document.documentElement.classList.add("data-error");
  }

  // 다른 스크립트(render.js)도 같은 안전한 값을 쓰도록 넘겨줍니다.
  window.SAFE_SITE = S;

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // 현재 페이지 파일명 (project.html 은 Work 메뉴를 활성화)
  var file = location.pathname.split("/").pop() || "index.html";
  if (file === "project.html") file = "work.html";

  /* ---------------- 헤더 ---------------- */
  try {
    var headerBox = document.getElementById("site-header");
    if (headerBox) {
      var links = NAV.map(function (n) {
        var on = n.href === file ? " is-active" : "";
        return '<a class="nav__link' + on + '" href="' + n.href + '">' + esc(n.label) + "</a>";
      }).join("");

      headerBox.outerHTML =
        '<header class="header" id="header">' +
          '<div class="header__inner">' +
            '<a class="logo" href="index.html">' +
              esc(S.name) +
              (S.roleEn ? "<small>" + esc(S.roleEn) + "</small>" : "") +
            "</a>" +
            '<nav class="nav" id="nav">' + links + "</nav>" +
            '<button class="nav-toggle" id="navToggle" type="button" aria-label="메뉴 열기" aria-expanded="false">' +
              "<span></span><span></span>" +
            "</button>" +
          "</div>" +
        "</header>";
    }
  } catch (e) {
    console.error("[include.js] 헤더를 만들지 못했습니다.", e);
  }

  /* ---------------- 푸터 ---------------- */
  try {
    var footerBox = document.getElementById("site-footer");
    if (footerBox) {
      // url 이 비어 있는 항목은 표시하지 않습니다.
      var list = Array.isArray(S.sns) ? S.sns : [];
      var sns = list
        .filter(function (s) { return s && s.url; })
        .map(function (s) {
          return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + "</a>";
        })
        .join("");

      var mail = S.email
        ? '<span class="t-label">Get in touch</span>' +
          '<a class="footer__mail" href="mailto:' + esc(S.email) + '">' + esc(S.email) + "</a>"
        : "";

      var byline = [S.nameEn, S.role].filter(Boolean).join(" · ");

      footerBox.outerHTML =
        '<footer class="footer">' +
          '<div class="container">' +
            '<div class="footer__top">' +
              "<div>" + mail + "</div>" +
              '<div class="footer__links">' + sns + "</div>" +
            "</div>" +
            '<div class="footer__bottom">' +
              "<span>" + esc(S.copyright) + "</span>" +
              "<span>" + esc(byline) + "</span>" +
            "</div>" +
          "</div>" +
        "</footer>";
    }
  } catch (e) {
    console.error("[include.js] 푸터를 만들지 못했습니다.", e);
  }
})();
