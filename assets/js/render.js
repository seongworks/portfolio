/* ==========================================================
   render.js  —  projects.js 의 내용을 화면에 그립니다.
   (이 파일은 건드릴 일이 거의 없습니다)

   ※ 두 가지 안전장치가 들어 있습니다.
     1) data/projects.js 가 깨져도 페이지가 백지가 되지 않고,
        "무엇이 잘못됐는지" 안내 문구가 대신 나옵니다.
     2) 아직 올리지 않은 이미지는 깨진 아이콘 대신 그냥 감춰집니다.
        → projects.js 에 파일 이름만 미리 적어두고, 나중에 이미지를
          올리면 그때부터 자동으로 나타납니다.
   ========================================================== */

(function () {
  /* ---- 도우미 ---- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* ---- 데이터 안전하게 읽기 ----
     projects.js 가 깨지면 PROJECTS 가 없거나 접근만 해도 오류가 납니다. */
  var LIST = [];
  var dataOK = false;
  try {
    if (typeof PROJECTS !== "undefined" && Array.isArray(PROJECTS)) {
      LIST = PROJECTS;
      dataOK = true;
    }
  } catch (e) { /* 아래에서 함께 처리 */ }

  if (!dataOK) {
    console.error(
      "[render.js] data/projects.js 를 읽지 못했습니다.\n" +
      "작업과 작업 사이의 쉼표(,), 큰따옴표(\") 짝을 확인하세요.\n" +
      "Console 탭 위쪽의 빨간 줄에 몇 번째 줄이 잘못됐는지 나옵니다."
    );
    document.documentElement.classList.add("data-error");
  }

  // site.js 도 안전하게 (include.js 가 미리 정리해 둔 값을 씁니다)
  var S = window.SAFE_SITE || { name: "" };

  var DATA_ERROR_HTML =
    '<p class="empty">' +
      "작업 목록을 불러오지 못했습니다.<br>" +
      '<span style="font-size:13px">data/projects.js 의 쉼표(,)와 따옴표(&quot;)를 확인해 주세요.</span>' +
    "</p>";

  // 분류를 항상 배열로 돌려줍니다.
  // "캐릭터"  →  ["캐릭터"]
  // ["캐릭터", "공모전"]  →  그대로
  function catsOf(p) {
    if (!p || !p.category) return [];
    return (Array.isArray(p.category) ? p.category : [p.category])
      .map(function (c) { return String(c).trim(); })
      .filter(Boolean);
  }

  // 필터 버튼에 쓸 분류 목록 — CATEGORY_ORDER 순서를 먼저 따르고,
  // 거기 없는 분류는 등장 순서대로 뒤에 붙입니다.
  function categoryList() {
    var used = [];
    LIST.forEach(function (p) {
      catsOf(p).forEach(function (c) {
        if (used.indexOf(c) === -1) used.push(c);
      });
    });

    var order = [];
    try {
      if (typeof CATEGORY_ORDER !== "undefined" && Array.isArray(CATEGORY_ORDER)) {
        order = CATEGORY_ORDER;
      }
    } catch (e) { /* 없으면 등장 순서대로 */ }

    var sorted = order.filter(function (c) { return used.indexOf(c) !== -1; });
    used.forEach(function (c) {
      if (sorted.indexOf(c) === -1) sorted.push(c);
    });

    return ["전체"].concat(sorted);
  }

  /* ---- 없는 이미지는 조용히 감추기 ----
     아직 안 올린 이미지가 "깨진 그림" 아이콘으로 보이지 않게 합니다. */
  function hideBrokenImages(scope, onChange) {
    scope.querySelectorAll("img[data-check]").forEach(function (im) {
      var settle = function (ok) {
        im.removeAttribute("data-check");
        var fig = im.closest("figure[data-pending]");
        if (ok) {
          if (fig) fig.removeAttribute("data-pending");
        } else if (fig) {
          fig.remove();                 // 갤러리 이미지는 통째로 제거
        } else {
          im.style.visibility = "hidden"; // 카드 커버는 자리만 남김
        }
        if (onChange) onChange();
      };

      if (im.complete) {
        settle(im.naturalWidth > 0);
      } else {
        im.addEventListener("load",  function () { settle(true); });
        im.addEventListener("error", function () { settle(false); });
      }
    });
  }

  function cardHTML(p, index) {
    var cats = catsOf(p);
    return (
      '<a class="card" href="project.html?id=' + encodeURIComponent(p.id) + '"' +
        ' data-reveal data-delay="' + (index % 3) * 90 + '">' +
        '<div class="card__thumb">' +
          '<span class="card__num">' + String(index + 1).padStart(2, "0") + "</span>" +
          '<img src="' + esc(p.cover) + '" alt="' + esc(p.title) + '" loading="lazy" data-check>' +
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
  try {
    var featuredBox = document.querySelector('[data-render="featured"]');
    if (featuredBox) {
      if (!dataOK) {
        featuredBox.innerHTML = DATA_ERROR_HTML;
      } else {
        var featured = LIST.filter(function (p) { return p.featured; });
        if (!featured.length) featured = LIST.slice(0, 3);
        featuredBox.innerHTML = featured.map(cardHTML).join("");
        hideBrokenImages(featuredBox);
      }
    }
  } catch (e) {
    console.error("[render.js] 홈의 대표 작업을 그리지 못했습니다.", e);
  }

  /* ================= WORK : 전체 + 필터 ================= */
  try {
    var workBox = document.querySelector('[data-render="work"]');
    if (workBox && !dataOK) {
      workBox.innerHTML = DATA_ERROR_HTML;
    } else if (workBox) {
      var filterBox = document.querySelector('[data-render="filter"]');
      var cats = categoryList();

      var draw = function (cat) {
        // 작업 하나가 여러 분류를 가질 수 있으므로 "포함하는지"로 판단합니다.
        var list = cat === "전체"
          ? LIST
          : LIST.filter(function (p) { return catsOf(p).indexOf(cat) !== -1; });

        workBox.innerHTML = list.length
          ? list.map(cardHTML).join("")
          : '<p class="empty">해당 분류의 작업이 아직 없습니다.</p>';

        hideBrokenImages(workBox);

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
  } catch (e) {
    console.error("[render.js] 작업 목록을 그리지 못했습니다.", e);
  }

  /* ================= PROJECT : 상세 ================= */
  try {
    var detailBox = document.querySelector('[data-render="project"]');
    if (detailBox) {
      var id = new URLSearchParams(location.search).get("id");
      var i = LIST.findIndex(function (p) { return p.id === id; });
      var p = LIST[i];

      if (!p) {
        detailBox.innerHTML =
          '<div class="container"><div class="empty">' +
            "<p>" + (dataOK ? "작업을 찾을 수 없습니다." : "작업 정보를 불러오지 못했습니다.") + "</p>" +
            '<p style="margin-top:20px"><a class="btn" href="work.html">작업 목록으로 <span class="btn-arrow">→</span></a></p>' +
          "</div></div>";
      } else {
        document.title = p.title + (S.name ? " — " + S.name : "");

        // 검색 결과와 공유 미리보기에도 이 작업의 설명이 쓰이도록 갱신
        var summaryText = p.summary || (Array.isArray(p.description) ? p.description[0] : p.description) || "";
        [
          ['meta[name="description"]', "content"],
          ['meta[property="og:title"]', "content"],
          ['meta[property="og:description"]', "content"]
        ].forEach(function (pair) {
          var el = document.querySelector(pair[0]);
          if (!el) return;
          el.setAttribute(pair[1], pair[0].indexOf("og:title") !== -1
            ? p.title + (S.name ? " — " + S.name : "")
            : summaryText);
        });

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

        // data-pending: 파일이 실제로 있는지 확인될 때까지 감춰둡니다.
        // (여기서는 loading="lazy" 를 쓰지 않습니다 — 감춰진 채로는 확인이 안 되기 때문)
        // 그림은 화면에 맞춰 줄여 보여주므로, 눌러서 원본을 열 수 있게 링크로 감쌉니다.
        var gallery = (p.images || []).map(function (img, n) {
          var alt = esc(p.title) + " 이미지 " + (n + 1);
          return (
            '<figure data-reveal data-pending>' +
              '<a class="shot" href="' + esc(img.src) + '" target="_blank" rel="noopener"' +
                ' aria-label="' + alt + ' 원본 크기로 보기">' +
                '<img src="' + esc(img.src) + '" alt="' + alt + '" data-check>' +
              "</a>" +
              (img.caption ? "<figcaption>" + esc(img.caption) + "</figcaption>" : "") +
            "</figure>"
          );
        }).join("");

        var prev = LIST[i - 1];
        var next = LIST[i + 1];
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

            '<section class="project-gallery" hidden>' + gallery + "</section>" +

            '<nav class="project-nav">' + link(prev, "Previous") + link(next, "Next") + "</nav>" +
          "</div>";

        // 실제로 존재하는 이미지가 하나라도 있을 때만 갤러리 영역을 펼칩니다.
        // (없으면 빈 여백만 남는 걸 막아줍니다)
        var syncGallery = function () {
          var g = detailBox.querySelector(".project-gallery");
          if (g) g.hidden = !g.querySelector("figure:not([data-pending])");
        };
        hideBrokenImages(detailBox, syncGallery);
        syncGallery();
      }
    }
  } catch (e) {
    console.error("[render.js] 작업 상세를 그리지 못했습니다.", e);
  }
})();


/* ================= CONTACT : 연락처 카드 ================= */
(function () {
  try {
    var box = document.querySelector('[data-render="contact"]');
    if (!box) return;

    function esc(s) {
      return String(s == null ? "" : s)
        .replace(/&/g, "&amp;").replace(/</g, "&lt;")
        .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }

    var S = window.SAFE_SITE || { email: "", phone: "", sns: [] };

    // 큰 이메일 링크도 site.js 값으로 교체 (읽지 못했으면 HTML 에 적힌 값을 그대로 둡니다)
    var big = document.querySelector("[data-mail]");
    if (big && S.email) {
      big.textContent = S.email;
      big.setAttribute("href", "mailto:" + S.email);
    }

    var items = [];

    if (S.email) {
      items.push(
        '<a href="mailto:' + esc(S.email) + '">' +
          '<span class="t-label">Email</span>' +
          "<strong>" + esc(S.email) + "</strong>" +
        "</a>"
      );
    }

    if (S.phone) {
      items.push(
        '<a href="tel:' + esc(S.phone.replace(/[^0-9+]/g, "")) + '">' +
          '<span class="t-label">Phone</span>' +
          "<strong>" + esc(S.phone) + "</strong>" +
        "</a>"
      );
    }

    (Array.isArray(S.sns) ? S.sns : [])
      .filter(function (s) { return s && s.url; })
      .forEach(function (s) {
        items.push(
          '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' +
            '<span class="t-label">' + esc(s.label) + "</span>" +
            "<strong>" + esc(s.handle || s.label) + "</strong>" +
          "</a>"
        );
      });

    // 칸 수에 맞춰 배치되도록 실제 개수를 알려줍니다 (1~3개 모두 자연스럽게)
    box.style.setProperty("--cols", Math.min(items.length || 1, 3));
    box.innerHTML = items.join("");
  } catch (e) {
    console.error("[render.js] 연락처 카드를 그리지 못했습니다.", e);
  }
})();
