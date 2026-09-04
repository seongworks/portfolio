/* ==========================================================
   projects.js  —  작업 목록
   ★ 작업을 추가하려면 아래 { ... } 블록 하나를 통째로 복사해서
     쉼표(,) 뒤에 붙여넣고 내용만 바꾸세요. 목록/상세 페이지가
     자동으로 만들어집니다.

   id          : 겹치지 않는 영문+숫자 (주소에 쓰입니다)
   title       : 작업 제목
   category    : 분류. 하나면 "캐릭터", 여러 개면 ["캐릭터", "공모전"]
                 → 여러 개를 쓰면 그 필터 모두에 나타납니다
   year        : 연도
   cover       : 목록에 보이는 대표 이미지
   summary     : 목록/상단 한 줄 소개
   description : 상세 설명 (여러 문단은 배열에 문장을 추가)
   tools       : 사용 프로그램
   images      : 상세 페이지 이미지 [{ src, caption }]
   featured    : true 면 홈 화면에 노출
   ========================================================== */


/* ---- 필터 버튼 순서 --------------------------------------
   여기에 적은 순서대로 버튼이 나옵니다.
   목록에 없는 분류를 작업에 쓰면 맨 뒤에 자동으로 추가됩니다.
   ("전체" 버튼은 항상 맨 앞에 자동 생성됩니다)
   -------------------------------------------------------- */
const CATEGORY_ORDER = ["광고 · 포스터", "캐릭터", "웹 디자인", "공모전"];


const PROJECTS = [
  {
    id: "p01",
    title: "청소년 문화축제 포스터",
    category: "광고 · 포스터",
    year: "2026",
    cover: "assets/img/projects/p01-cover.svg",
    summary: "행사 정보를 3초 안에 읽히게 정리한 축제 메인 포스터",
    description: [
      "학교 문화축제 홍보를 위한 메인 포스터입니다. 기존 포스터가 정보를 다 담으려다 오히려 아무것도 안 읽히던 문제에서 출발했습니다.",
      "날짜와 장소를 가장 크게, 부대행사는 아래로 밀어내는 식으로 정보의 순서를 다시 짰습니다. 무채색 배경에 축제 키컬러만 남겨 멀리서도 눈에 띄도록 했습니다."
    ],
    tools: ["Illustrator", "Photoshop"],
    images: [
      { src: "assets/img/projects/p01-01.svg", caption: "메인 포스터" },
      { src: "assets/img/projects/p01-02.svg", caption: "정보 위계 설계 과정" },
      { src: "assets/img/projects/p01-03.svg", caption: "현수막 · 배너 적용" }
    ],
    featured: true
  },

  {
    id: "p02",
    title: "학교 마스코트 캐릭터",
    category: ["캐릭터", "공모전"],          // ← 두 필터 모두에 표시됩니다
    year: "2026",
    cover: "assets/img/projects/p02-cover.svg",
    summary: "교내 캐릭터 공모전 출품작 — 표정 8종과 굿즈 활용안",
    description: [
      "교내 마스코트 공모전에 낸 캐릭터입니다. 학교 상징인 은행나무에서 형태를 따와, 단순한 원과 곡선만으로 그렸습니다.",
      "누가 그려도 비슷하게 나오도록 비율 가이드를 만들고, 스티커·굿즈에 쓰일 것을 감안해 표정 8종과 흑백 버전까지 함께 정리했습니다."
    ],
    tools: ["Illustrator", "Photoshop"],
    images: [
      { src: "assets/img/projects/p02-01.svg", caption: "기본형과 비율 가이드" },
      { src: "assets/img/projects/p02-02.svg", caption: "표정 8종" },
      { src: "assets/img/projects/p02-03.svg", caption: "굿즈 적용 목업" }
    ],
    featured: true
  },

  {
    id: "p03",
    title: "동아리 소개 웹페이지",
    category: "웹 디자인",
    year: "2025",
    cover: "assets/img/projects/p03-cover.svg",
    summary: "휴대폰으로 먼저 보게 되는 동아리 모집 페이지",
    description: [
      "디자인 동아리 신입 모집을 위한 소개 페이지입니다. 대부분 휴대폰으로 링크를 열어본다는 점을 고려해 모바일 화면부터 설계했습니다.",
      "스크롤 한 번에 '무슨 동아리인지 → 무엇을 하는지 → 어떻게 지원하는지'가 끝나도록 흐름을 짰습니다."
    ],
    tools: ["Photoshop", "Illustrator"],
    images: [
      { src: "assets/img/projects/p03-01.svg", caption: "모바일 화면 흐름" },
      { src: "assets/img/projects/p03-02.svg", caption: "데스크톱 화면" }
    ],
    featured: true
  },

  {
    id: "p04",
    title: "환경 캠페인 포스터",
    category: ["광고 · 포스터", "공모전"],   // ← 두 필터 모두에 표시됩니다
    year: "2025",
    cover: "assets/img/projects/p04-cover.svg",
    summary: "청소년 환경 공모전 출품작 — 사진 없이 타이포만으로",
    description: [
      "청소년 환경 포스터 공모전에 낸 작업입니다. 자극적인 사진에 기대지 않고 글자만으로 메시지를 전달해보고 싶었습니다.",
      "문장이 아래로 갈수록 작아지며 사라지는 구조로, '줄어드는 것'을 형태 자체로 보여주려 했습니다."
    ],
    tools: ["Illustrator"],
    images: [
      { src: "assets/img/projects/p04-01.svg", caption: "출품 포스터" },
      { src: "assets/img/projects/p04-02.svg", caption: "타이포 디테일" }
    ],
    featured: false
  }
];
