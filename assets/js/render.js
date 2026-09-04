/* ==========================================================
   render.js  —  projects.js 의 내용을 화면에 그립니다.
   (이 파일은 건드릴 일이 거의 없습니다)
   ========================================================== */

(function () {
  /* ---- 도우미 ---- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // 분류를 항상 배열로 돌려줍니다.
  // "캐릭터"  →  ["캐릭터"]
  // ["캐릭터", "공모전"]  →  그대로
  function catsOf(p) {
    if (!p.category) return [];
    return (Array.isArray(p.category) ? p.category : [p.category])
      .map(function (c) { return String(c).trim(); })
      .filter(Boolean);
  }

  // 필터 버튼에 쓸 분류 목록 — CATEGORY_ORDER 순서를 먼저 따르고,
  // 거기 없는 분류는 등장 순서대로 뒤에 붙입니다.
  function categoryList() {
    var used = [];
    PROJECTS.forEach(function (p) {
      catsOf(p).forEach(function (c) {
        if (used.indexOf(c) === -1) used.push(c);
      });
    });

    var order = (typeof CATEGORY_ORDER !== "undefined" && Array.isArray(CATEGORY_ORDER))
      ? CATEGORY_ORDER : [];

    var sorted = order.filter(function (c) { return used.indexOf(c) !== -1; });
    used.forEach(function (c) {
      if (sorted.indexOf(c) === -1) sorted.push(c);
    });

    return ["전체"].concat(sorted);
  }

  function cardHTML(p, index) {
    var cats = catsOf(p);
    return (
      '<a class="card" href="project.html?id=' + encodeURIComponent(p.id) + '"' +
        ' data-reveal data-delay="' + (index % 3) * 90 + '">' +
        '<div class="card__thumb">' +
          '<span class="card__num">' + String(index + 1).padStart(2, "0") + "</span>" +
          '<img src="' + esc(p.cover) + '" alt="' + esc(p.title) + '" loading="lazy">' +
        "</div>" +
        '<div class="card__body">' +
          "<div>" +
            '<h3 class="card__title">' + esc(p.title) + "</h3>" +
            '<p class="card__cat">' + esc(cats.join(", ")) + "</p>" +
          "</div>" +
          '<span class="card__meta">' + esc(p.year) + "</span>" +
        "</div>" +
      "</a>"
    );
  }

  /* ================= 홈 : 대표 작업 ================= */
  var featuredBox = document.querySelector('[data-render="featured"]');
  if (featuredBox) {
    var featured = PROJECTS.filter(function (p) { return p.featured; });
    if (!featured.length) featured = PROJECTS.slice(0, 3);
    featuredBox.innerHTML = featured.map(cardHTML).join("");
  }

  /* ================= WORK : 전체 + 필터 ================= */
  var workBox = document.querySelector('[data-render="work"]');
  if (workBox) {
    var filterBox = document.querySelector('[data-render="filter"]');
    var cats = categoryList();

    var draw = function (cat) {
      // 작업 하나가 여러 분류를 가질 수 있으므로 "포함하는지"로 판단합니다.
      var list = cat === "전체"
        ? PROJECTS
        : PROJECTS.filter(function (p) { return catsOf(p).indexOf(cat) !== -1; });

      workBox.innerHTML = list.length
        ? list.map(cardHTML).join("")
        : '<p class="empty">해당 분류의 작업이 아직 없습니다.</p>';

      // 새로 그려진 카드에 등장 효과 적용
      workBox.querySelectorAll("[data-reveal]").forEach(function (el) {
        requestAnimationFrame(function () { el.classList.add("is-in"); });
      });
    };

    // 주소에 ?cat=분류 가 붙어 있으면 그 필터를 켠 상태로 시작합니다.
    // (작업 상세 페이지의 분류를 눌렀을 때 여기로 옵니다)
    var wanted = new URLSearchParams(location.search).get("cat");
    if (!wanted || cats.indexOf(wanted) === -1) wanted = "전체";

    if (filterBox) {
      filterBox.innerHTML = cats.map(function (c) {
        return '<button type="button" class="' + (c === wanted ? "is-active" : "") +
               '" data-cat="' + esc(c) + '">' + esc(c) + "</button>";
      }).join("");

      filterBox.addEventListener("click", function (e) {
        var btn = e.target.closest("button[data-cat]");
        if (!btn) return;
        filterBox.querySelectorAll("button").forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
        });
        draw(btn.dataset.cat);
      });
    }

    draw(wanted);
  }

  /* ================= PROJECT : 상세 ================= */
  var detailBox = document.querySelector('[data-render="project"]');
  if (detailBox) {
    var id = new URLSearchParams(location.search).get("id");
    var i = PROJECTS.findIndex(function (p) { return p.id === id; });
    var p = PROJECTS[i];

    if (!p) {
      detailBox.innerHTML =
        '<div class="container"><div class="empty">' +
          "<p>작업을 찾을 수 없습니다.</p>" +
          '<p style="margin-top:20px"><a class="btn" href="work.html">작업 목록으로 <span class="btn-arrow">→</span></a></p>' +
        "</div></div>";
      return;
    }

    document.title = p.title + " — " + SITE.name;

    var pCats = catsOf(p);
    var catText = pCats.join(", ");

    var desc = (Array.isArray(p.description) ? p.description : [p.description])
      .map(function (t) { return "<p>" + esc(t) + "</p>"; })
      .join('<div style="height:18px"></div>');

    var tags = (p.tools || [])
      .map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; })
      .join("");

    // 분류는 눌러서 해당 필터로 이동할 수 있게 링크로 만듭니다.
    var catLinks = pCats.map(function (c) {
      return '<a class="tag" href="work.html?cat=' + encodeURIComponent(c) + '">' + esc(c) + "</a>";
    }).join("");

    var gallery = (p.images || []).map(function (img, n) {
      return (
        "<figure data-reveal>" +
          '<img src="' + esc(img.src) + '" alt="' + esc(p.title) + " 이미지 " + (n + 1) + '" loading="lazy">' +
          (img.caption ? "<figcaption>" + esc(img.caption) + "</figcaption>" : "") +
        "</figure>"
      );
    }).join("");

    var prev = PROJECTS[i - 1];
    var next = PROJECTS[i + 1];
    var link = function (t, side) {
      return t
        ? '<a href="project.html?id=' + encodeURIComponent(t.id) + '"><span>' + side +
          "</span>" + esc(t.title) + "</a>"
        : "<span></span>";
    };

    detailBox.innerHTML =
      '<div class="container">' +
        '<section class="project-head" data-reveal>' +
          '<span class="t-label">' + esc(catText) + " · " + esc(p.year) + "</span>" +
          '<h1 class="t-h1">' + esc(p.title) + "</h1>" +
          (p.summary ? '<p class="t-body-lg" style="margin-top:20px;max-width:52ch">' + esc(p.summary) + "</p>" : "") +
        "</section>" +

        '<section class="project-info" data-reveal>' +
          "<div>" + desc + "</div>" +
          '<dl class="meta-list">' +
            "<div><dt>Year</dt><dd>" + esc(p.year) + "</dd></div>" +
            '<div><dt>Category</dt><dd class="tag-row">' + catLinks + "</dd></div>" +
            '<div><dt>Tools</dt><dd class="tag-row">' + tags + "</dd></div>" +
          "</dl>" +
        "</section>" +

        '<section class="project-gallery">' + gallery + "</section>" +

        '<nav class="project-nav">' + link(prev, "Previous") + link(next, "Next") + "</nav>" +
      "</div>";
  }
})();


/* ================= CONTACT : 연락처 카드 ================= */
(function () {
  var box = document.querySelector('[data-render="contact"]');
  if (!box) return;

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // 큰 이메일 링크도 site.js 값으로 교체
  var big = document.querySelector("[data-mail]");
  if (big) {
    big.textContent = SITE.email;
    big.setAttribute("href", "mailto:" + SITE.email);
  }

  var items = [];

  items.push(
    '<a href="mailto:' + esc(SITE.email) + '">' +
      '<span class="t-label">Email</span>' +
      "<strong>" + esc(SITE.email) + "</strong>" +
    "</a>"
  );

  if (SITE.phone) {
    items.push(
      '<a href="tel:' + esc(SITE.phone.replace(/[^0-9+]/g, "")) + '">' +
        '<span class="t-label">Phone</span>' +
        "<strong>" + esc(SITE.phone) + "</strong>" +
      "</a>"
    );
  }

  SITE.sns.filter(function (s) { return s.url; }).forEach(function (s) {
    items.push(
      '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' +
        '<span class="t-label">' + esc(s.label) + "</span>" +
        "<strong>" + esc(s.handle || s.label) + "</strong>" +
      "</a>"
    );
  });

  box.innerHTML = items.join("");
})();
