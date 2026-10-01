/* ==========================================================
   exhibit.js  —  A3 전시 패널을 만듭니다.

   아래 PANELS 에 적은 작업만 패널로 나옵니다.
   내용(제목 · 설명 · 연도 · 도구)은 data/projects.js 에서 그대로 끌어옵니다.
   ★ 다른 작업으로 바꾸려면 PANELS 의 id 만 고치면 됩니다.
   ========================================================== */

(function () {
  "use strict";

  /* ---- 어떤 작업을 패널로 만들지 --------------------------- */
  var PANELS = [
    {
      id: "p01",
      // 쓸 사진을 직접 고릅니다 (작업에 들어있는 전부를 쓰지 않습니다)
      shots: [
        { src: "assets/img/projects/p01-01.jpg", caption: "" },
        { src: "assets/img/projects/p01-02.jpg", caption: "설치 목업" }
      ]
    },
    {
      id: "p10",
      shots: [
        { src: "assets/img/projects/p10-cover.jpg", caption: "" }
      ]
    }
  ];

  var SITE_URL = "https://seongworks.github.io/portfolio/project.html?id=";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  var LIST = [], S = { name: "", roleEn: "" };
  try { if (typeof PROJECTS !== "undefined") LIST = PROJECTS; } catch (e) {}
  try { if (typeof SITE !== "undefined") S = SITE; } catch (e) {}

  function find(id) {
    for (var i = 0; i < LIST.length; i++) if (LIST[i].id === id) return LIST[i];
    return null;
  }
  function cats(p) {
    if (!p || !p.category) return [];
    return (Array.isArray(p.category) ? p.category : [p.category]).map(String);
  }

  var out = [];

  PANELS.forEach(function (spec) {
    var p = find(spec.id);
    if (!p) return;

    var shots = spec.shots && spec.shots.length ? spec.shots : (p.images || []);
    var body = (Array.isArray(p.description) ? p.description : [p.description])
      .filter(Boolean)
      .map(function (t) { return "<p>" + esc(t) + "</p>"; })
      .join("");

    out.push(
      '<section class="panel" data-id="' + esc(p.id) + '">' +

        '<div class="e-head">' +
          '<span class="l"><i class="tick"></i>' +
            '<span class="who">' + esc(S.name || "") + "</span>" +
            (S.roleEn ? "<span>" + esc(S.roleEn) + "</span>" : "") +
          "</span>" +
          "<span>" + esc(p.year) + "</span>" +
        "</div>" +

        '<div class="e-art' + (shots.length === 1 ? " is-single" : "") + '">' +
          shots.map(function (im) {
            return (
              "<figure>" +
                '<img src="' + esc(im.src) + '" alt="">' +
                (im.caption ? "<figcaption>" + esc(im.caption) + "</figcaption>" : "") +
              "</figure>"
            );
          }).join("") +
        "</div>" +

        '<h1 class="e-title">' + esc(p.title) + "</h1>" +
        (p.summary ? '<p class="e-lead">' + esc(p.summary) + "</p>" : "") +

        '<div class="e-body">' + body + "</div>" +

        '<div class="e-foot">' +
          '<div class="meta">' +
            "<b>" + esc(cats(p).join(" · ")) + "</b>" +
            esc((p.tools || []).join(" · ")) +
          "</div>" +
          '<div class="e-qr">' +
            '<div class="cap"><b>작업 더 보기</b>' + esc(S.name || "") + " 포트폴리오</div>" +
            '<img src="assets/img/qr/' + esc(p.id) + '.svg" alt="' +
              esc(SITE_URL + p.id) + '">' +
          "</div>" +
        "</div>" +

      "</section>"
    );
  });

  document.body.innerHTML = out.join("") ||
    '<p style="padding:40mm">작업을 찾지 못했습니다. data/projects.js 를 확인해 주세요.</p>';
  document.title = (S.name || "") + " 전시 패널 A3";

  /* ==========================================================
     작품 자리에 맞춰 사진 크기를 정합니다.

     사진 비율이 작업마다 달라서(가로로 긴 간판, 세로로 긴 포스터)
     고정 크기로는 둘 다 담기지 않습니다. 그래서 정해진 높이 안에서
     가로 폭도 넘지 않는 최대 크기를 계산해 넣습니다.
     ========================================================== */
  var PX_PER_MM = 96 / 25.4;

  function sizeArt(panel) {
    var art = panel.querySelector(".e-art");
    if (!art) return;

    var figs = Array.prototype.slice.call(art.querySelectorAll("figure"));
    if (!figs.length) return;

    var maxW = art.clientWidth;
    var maxH = art.clientHeight;
    var gap  = 5 * PX_PER_MM;
    var capH = 5 * PX_PER_MM;          // 캡션이 차지하는 높이(대략)

    var items = figs.map(function (f) {
      var im = f.querySelector("img");
      return {
        im: im,
        a: (im.naturalWidth || 4) / (im.naturalHeight || 3),
        cap: !!f.querySelector("figcaption")
      };
    });

    if (items.length === 1) {
      // 한 장 — 자리 안에 들어가는 최대 크기
      var it = items[0];
      var h = Math.min(maxH - (it.cap ? capH : 0), maxW / it.a);
      it.im.style.height = h + "px";
      it.im.style.width = (h * it.a) + "px";
      return;
    }

    // 여러 장 — 첫 장이 주인공입니다. 가로 폭 끝까지 꽉 채우고,
    // 나머지는 그 아래 남은 자리에 작게 둡니다. 가로로 나란히 두면
    // 둘 다 작아져서 간판에 적힌 글씨가 안 읽힙니다.
    var lead = items[0];
    var rest = items.slice(1);

    var budget = maxH - gap * rest.length
                      - items.filter(function (x) { return x.cap; }).length * capH;

    var leadW = maxW;
    var leadH = leadW / lead.a;
    if (leadH > budget * 0.78) {          // 세로로 긴 그림이 자리를 다 먹지 않게
      leadH = budget * 0.78;
      leadW = leadH * lead.a;
    }
    lead.im.style.height = leadH + "px";
    lead.im.style.width = leadW + "px";

    var restH = budget - leadH;
    rest.forEach(function (x) {
      var h2 = restH / rest.length;
      var w2 = h2 * x.a;
      if (w2 > maxW * 0.46) { w2 = maxW * 0.46; h2 = w2 / x.a; }
      x.im.style.height = h2 + "px";
      x.im.style.width = w2 + "px";
      // 주 사진은 왼쪽 끝, 보조 사진은 오른쪽 끝 — 빈 자리가 한쪽으로
      // 몰려 계단처럼 읽히게 합니다. 가운데 어정쩡하게 뜨는 것보다 낫습니다.
      x.im.parentNode.style.alignSelf = "flex-end";
      x.im.parentNode.style.textAlign = "right";
    });
  }

  function layout() {
    document.querySelectorAll(".panel").forEach(sizeArt);

    // 넘친 패널이 있으면 콘솔에 알려줍니다 (F12 → Console)
    var over = [];
    document.querySelectorAll(".panel").forEach(function (pn, i) {
      var bottom = pn.getBoundingClientRect().bottom;
      var max = 0;
      pn.querySelectorAll("*").forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0 && r.bottom > max) max = r.bottom;
      });
      if (max - bottom > 1) over.push(i + 1);
    });
    if (over.length) {
      console.warn("[exhibit.js] 내용이 넘치는 패널: " + over.join(", ") +
                   " — 설명을 줄이거나 사진 자리를 낮춰주세요.");
    }

    document.documentElement.setAttribute("data-print-ready", "1");
  }

  /* 사진이 다 실린 뒤에 자리를 잡습니다 (비율을 알아야 크기를 정할 수 있습니다) */
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
      if (im.complete) { one(); return; }
      im.addEventListener("load", one);
      im.addEventListener("error", one);
    });
  }
})();
