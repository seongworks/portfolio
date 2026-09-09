/* ==========================================================
   include.js  —  헤더 · 푸터 자동 삽입
   모든 페이지의 <div id="site-header"></div> 와
   <div id="site-footer"></div> 자리에 내용을 채워 넣습니다.
   → 메뉴를 고치려면 아래 NAV 배열만 수정하면 전체 페이지에 반영됩니다.
   ========================================================== */

const NAV = [
  { label: "Home",    href: "index.html" },
  { label: "Work",    href: "work.html"  },
  { label: "About",   href: "about.html" },
  { label: "Contact", href: "contact.html" }
];

(function () {
  // 현재 페이지 파일명 (project.html 은 Work 메뉴를 활성화)
  var file = location.pathname.split("/").pop() || "index.html";
  if (file === "project.html") file = "work.html";

  /* ---------------- 헤더 ---------------- */
  var headerBox = document.getElementById("site-header");
  if (headerBox) {
    var links = NAV.map(function (n) {
      var on = n.href === file ? " is-active" : "";
      return '<a class="nav__link' + on + '" href="' + n.href + '">' + n.label + "</a>";
    }).join("");

    headerBox.outerHTML =
      '<header class="header" id="header">' +
        '<div class="header__inner">' +
          '<a class="logo" href="index.html">' +
            SITE.name + "<small>" + SITE.roleEn + "</small>" +
          "</a>" +
          '<nav class="nav" id="nav">' + links + "</nav>" +
          '<button class="nav-toggle" id="navToggle" type="button" aria-label="메뉴 열기" aria-expanded="false">' +
            "<span></span><span></span>" +
          "</button>" +
        "</div>" +
      "</header>";
  }

  /* ---------------- 푸터 ---------------- */
  var footerBox = document.getElementById("site-footer");
  if (footerBox) {
    var sns = SITE.sns
      .filter(function (s) { return s.url; })
      .map(function (s) {
        return '<a href="' + s.url + '" target="_blank" rel="noopener">' + s.label + "</a>";
      })
      .join("");

    footerBox.outerHTML =
      '<footer class="footer">' +
        '<div class="container">' +
          '<div class="footer__top">' +
            "<div>" +
              '<span class="t-label">Get in touch</span>' +
              '<a class="footer__mail" href="mailto:' + SITE.email + '">' + SITE.email + "</a>" +
            "</div>" +
            '<div class="footer__links">' + sns + "</div>" +
          "</div>" +
          '<div class="footer__bottom">' +
            "<span>" + SITE.copyright + "</span>" +
            "<span>" + SITE.nameEn + " · " + SITE.role + "</span>" +
          "</div>" +
        "</div>" +
      "</footer>";
  }
})();
