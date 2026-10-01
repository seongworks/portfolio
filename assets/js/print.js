/* ==========================================================
   print.js  —  data/projects.js 를 A4 인쇄용으로 다시 그립니다.

   화면용(render.js)과 완전히 따로 도는 파일입니다.
   작업을 추가·수정하면 여기도 자동으로 따라옵니다. 손댈 일 없습니다.

   구성 : 표지 1장 + 작업 목록 1장 + 작업마다 1장
   ========================================================== */

(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* ---- 데이터 안전하게 읽기 ---- */
  var LIST = [], S = { name: "", role: "" };
  try { if (typeof PROJECTS !== "undefined") LIST = PROJECTS; } catch (e) {}
  try { if (typeof SITE !== "undefined") S = SITE; } catch (e) {}

  if (!LIST.length) {
    document.body.innerHTML =
      '<div class="page"><p style="padding:40mm 0;text-align:center">' +
      "작업 목록을 불러오지 못했습니다. data/projects.js 를 확인해 주세요.</p></div>";
    return;
  }

  function cats(p) {
    if (!p || !p.category) return [];
    return (Array.isArray(p.category) ? p.category : [p.category]).map(String);
  }

  function no(i) { return String(i + 1).padStart(2, "0"); }

  /* 작업에 들어갈 그림 목록 — data/projects.js 의 images 를 그대로 씁니다.
     커버는 앞 장의 작업 목록에 이미 실리므로 여기서 또 넣지 않습니다.
     (넣으면 커버와 첫 그림이 거의 같은 작업에서 같은 사진이 두 번 나옵니다)
     아직 images 를 안 적은 작업만 커버로 대신합니다. */
  function shotsOf(p) {
    var list = (p.images || []).slice();
    if (!list.length && p.cover) list.push({ src: p.cover, caption: "" });
    return list;
  }

  /* 장수에 따른 기준 높이(mm). 많을수록 작게 깔립니다.
     실제 높이는 아래 layoutShots 가 줄 단위로 다시 계산합니다. */
  function baseHeightMm(n) {
    if (n <= 1) return 120;
    if (n <= 2) return 80;
    if (n <= 4) return 56;
    if (n <= 6) return 44;
    if (n <= 9) return 34;
    if (n <= 14) return 27;
    return 21;
  }

  var out = [];

  /* 쪽마다 위에 얇게 깔리는 러닝 헤더 */
  function run(right) {
    return (
      '<div class="run">' +
        '<span class="l"><i class="tick"></i>' + esc(S.name || "") +
          (S.roleEn ? " · " + esc(S.roleEn) : "") + "</span>" +
        "<span>" + esc(right) + "</span>" +
      "</div>"
    );
  }

  /* ================= 표지 ================= */
  var years = LIST.map(function (p) { return parseInt(p.year, 10); })
    .filter(function (y) { return y; });
  var span = years.length
    ? Math.min.apply(null, years) + " — " + Math.max.apply(null, years)
    : "";

  var sns = (S.sns || []).filter(function (s) { return s.url; });

  /* 표지 사진 띠 — 홈에 내세운 작업을 먼저, 모자라면 순서대로 채웁니다 */
  var strip = LIST.filter(function (p) { return p.featured; })
    .concat(LIST.filter(function (p) { return !p.featured; }))
    .slice(0, 6);

  out.push(
    '<section class="page cover">' +
      '<div class="cover__kicker">PORTFOLIO' + (span ? " &nbsp;·&nbsp; " + esc(span) : "") + "</div>" +
      '<div class="cover__rule"></div>' +

      '<h1 class="cover__name">' + esc(S.name || "") + "</h1>" +
      '<p class="cover__en">' + esc(S.nameEn || "") + "</p>" +
      '<p class="cover__role"><span>' + esc(S.role || "") + "</span></p>" +

      '<div class="cover__bot">' +
        "<div>" +
          (S.email ? esc(S.email) + "<br>" : "") +
          sns.map(function (s) {
            return esc(s.label) + (s.handle ? " " + esc(s.handle) : "");
          }).join("<br>") +
        "</div>" +
        '<div class="r">' +
          '<span class="cap">WORKS</span>' +
          '<div class="big">' + LIST.length + "</div>" +
        "</div>" +
      "</div>" +

      /* 사진 띠는 맨 마지막 — 종이 아래 끝까지 꽉 차게 깔립니다 */
      '<div class="cover__strip bleed">' +
        strip.map(function (p) {
          return '<img src="' + esc(p.cover) + '" alt="">';
        }).join("") +
      "</div>" +
    "</section>"
  );

  /* ================= 작업 목록 ================= */
  out.push(
    '<section class="page toc">' +
      run("index") +
      '<div class="band bleed">' +
        '<span class="band__no">00</span>' +
        '<h2 class="band__t">작업 목록</h2>' +
        '<span class="band__y">' + LIST.length + " WORKS</span>" +
      "</div>" +
      '<div class="toc__grid">' +
        LIST.map(function (p, i) {
          return (
            '<div class="toc__item">' +
              '<div class="shot"><img src="' + esc(p.cover) + '" alt=""></div>' +
              '<p class="t"><b>' + no(i) + "</b><span>" + esc(p.title) + "</span></p>" +
              '<p class="c">' + esc(cats(p).join(", ")) + " · " + esc(p.year) + "</p>" +
            "</div>"
          );
        }).join("") +
      "</div>" +
      '<div class="p-foot"><span></span><span class="pageno"></span></div>' +
    "</section>"
  );

  /* ================= 작업 한 장씩 ================= */
  LIST.forEach(function (p, i) {
    var shots = shotsOf(p);
    var body = (Array.isArray(p.description) ? p.description : [p.description])
      .filter(Boolean)
      .map(function (t) { return "<p>" + esc(t) + "</p>"; })
      .join("");

    var meta = "<span><b>CATEGORY</b>" + esc(cats(p).join(" · ")) + "</span>";
    if ((p.tools || []).length) {
      meta += "<span><b>TOOLS</b>" + esc(p.tools.join(" · ")) + "</span>";
    }

    out.push(
      '<section class="page work">' +
        run("work " + no(i)) +

        '<div class="band bleed">' +
          '<span class="band__no">' + no(i) + "</span>" +
          '<h2 class="band__t">' + esc(p.title) + "</h2>" +
          '<span class="band__y">' + esc(p.year) + "</span>" +
        "</div>" +

        (p.summary ? '<p class="w__summary">' + esc(p.summary) + "</p>" : "") +
        '<div class="w__meta">' + meta + "</div>" +

        '<div class="w__shots" data-base="' + baseHeightMm(shots.length) + '">' +
          shots.map(function (im) {
            return (
              "<figure>" +
                '<img src="' + esc(im.src) + '" alt="">' +
                (im.caption ? "<figcaption>" + esc(im.caption) + "</figcaption>" : "") +
              "</figure>"
            );
          }).join("") +
        "</div>" +

        '<div class="w__body">' + body + "</div>" +

        '<div class="p-foot">' +
          "<span>" + esc(S.name || "") + " PORTFOLIO</span>" +
          '<span class="pageno"></span>' +
        "</div>" +
      "</section>"
    );
  });

  document.body.innerHTML = out.join("");
  document.title = (S.name || "") + " 포트폴리오";

  /* ==========================================================
     그림이 다 실린 뒤에 자리를 잡습니다.
     그림은 세로만 고정이고 가로는 비율대로 늘어나기 때문에,
     다 실리기 전에 재면 높이가 틀립니다.
     ========================================================== */

  /* 한 장에서 넘친 높이(px). 0 이하면 잘 들어간 것입니다.
     표지 사진 띠는 종이 끝까지 일부러 넘기므로 셈에서 뺍니다. */
  function overflowOf(pg) {
    var bottom = pg.getBoundingClientRect().bottom;
    var max = 0;
    pg.querySelectorAll("*").forEach(function (el) {
      if (el.closest(".cover__strip")) return;
      var r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0 && r.bottom > max) max = r.bottom;
    });
    return max - bottom;
  }

  var PX_PER_MM = 96 / 25.4;      /* CSS 기준 — 1mm = 3.7795px */

  /* ---- 줄 맞춤 배치 -------------------------------------------
     사진 비율이 제각각이라 그냥 늘어놓으면 줄 끝에 빈 자리가 남습니다.
     한 줄에 들어갈 사진을 모은 뒤, 그 줄의 가로 합이 지면 폭과 딱 맞도록
     높이를 거꾸로 계산합니다. (잡지 사진 배치와 같은 방식)
     ----------------------------------------------------------- */
  function layoutShots(wrap, targetPx) {
    var figs = Array.prototype.slice.call(wrap.querySelectorAll("figure"));
    if (!figs.length) return;

    var maxW = wrap.clientWidth;
    var gap = parseFloat(getComputedStyle(wrap).columnGap) || 3 * PX_PER_MM;

    var items = figs.map(function (f) {
      var im = f.querySelector("img");
      var a = (im.naturalWidth || 4) / (im.naturalHeight || 3);
      return { im: im, a: a };
    });

    var rows = [], cur = [], sum = 0;
    items.forEach(function (it) {
      cur.push(it);
      sum += it.a;
      if (sum * targetPx + gap * (cur.length - 1) >= maxW) {
        rows.push({ items: cur, sum: sum, full: true });
        cur = []; sum = 0;
      }
    });
    if (cur.length) rows.push({ items: cur, sum: sum, full: false });

    rows.forEach(function (r) {
      var h = (maxW - gap * (r.items.length - 1)) / r.sum;
      // 마지막 줄이 덜 찼을 때 혼자 커지지 않게 막습니다
      if (!r.full) h = Math.min(h, targetPx * 1.15);
      r.items.forEach(function (it) { it.im.style.height = h + "px"; });
    });
  }

  /* 넘치면 그림을 조금씩 줄이고, 그래도 넘치면 글씨를 줄입니다.
     작업 설명이 길거나 그림이 많아도 A4 한 장 안에 들어가게 하는 장치입니다. */
  function fitPage(pg) {
    var wrap = pg.querySelector(".w__shots");
    var body = pg.querySelector(".w__body");
    if (!wrap || !wrap.querySelector("figure")) return;

    var target = (parseFloat(wrap.dataset.base) || 56) * PX_PER_MM;
    layoutShots(wrap, target);

    var step  = 2 * PX_PER_MM;
    var floor = 13 * PX_PER_MM;
    var ceil  = 155 * PX_PER_MM;
    var guard = 0;

    // ① 자리가 남으면 키웁니다 — 설명이 짧은 작업에서 아래가 텅 비지 않게.
    while (overflowOf(pg) <= 0 && target < ceil && guard++ < 300) {
      target += step;
      layoutShots(wrap, target);
    }

    // ② 넘치면 줄입니다 (①에서 한 칸 넘겼을 때 되돌리는 일도 겸합니다).
    while (overflowOf(pg) > 0 && target > floor && guard++ < 600) {
      target -= step;
      layoutShots(wrap, target);
    }

    // 그림을 최소까지 줄여도 넘치면 본문 글씨를 한 단계씩 내립니다.
    var sizes = [8.2, 7.8, 7.4, 7];
    for (var i = 0; i < sizes.length && overflowOf(pg) > 0; i++) {
      if (body) body.style.fontSize = sizes[i] + "pt";
    }
  }

  function layout() {
    document.querySelectorAll(".page.work").forEach(fitPage);

    var pages = document.querySelectorAll(".page");
    pages.forEach(function (pg, i) {
      var el = pg.querySelector(".pageno");
      if (el) el.textContent = (i + 1) + " / " + pages.length;
    });

    // 넘친 쪽이 남아 있으면 콘솔에 알려줍니다 (F12 → Console)
    var over = [];
    pages.forEach(function (pg, i) {
      if (overflowOf(pg) > 1) over.push(i + 1);
    });
    if (over.length) {
      console.warn("[print.js] 내용이 넘치는 쪽: " + over.join(", ") +
                   " — 설명을 줄이거나 그림 수를 줄여주세요.");
    }

    document.documentElement.setAttribute("data-print-ready", "1");
  }

  /* 그림 하나가 끝날 때마다 세고, 다 끝나면 글꼴까지 기다린 뒤 자리를 잡습니다.
     없는 그림(아직 안 올린 파일)은 자리째 지웁니다 — 사이트와 같은 규칙입니다. */
  var imgs = Array.prototype.slice.call(document.images);
  var left = imgs.length;

  function one() {
    if (--left > 0) return;
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
    else layout();
  }

  if (!imgs.length) {
    layout();
  } else {
    imgs.forEach(function (im) {
      if (im.complete) {
        if (!im.naturalWidth) {
          var f = im.closest("figure") || im.closest(".toc__item");
          if (f) f.remove(); else im.remove();
        }
        one();
        return;
      }
      im.addEventListener("load", one);
      im.addEventListener("error", function () {
        var f = im.closest("figure") || im.closest(".toc__item");
        if (f) f.remove(); else im.remove();
        one();
      });
    });
  }
})();
