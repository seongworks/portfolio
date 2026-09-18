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
const CATEGORY_ORDER = ["광고 · 포스터 · 간판", "캐릭터", "웹 디자인", "공모전"];


const PROJECTS = [
  {
    id: "p01",
    title: "숲나무",
    category: ["광고 · 포스터 · 간판", "공모전"],
    year: "2025",
    cover: "assets/img/projects/p01-cover.jpg",
    summary: "제24회 아름다운 간판 공모전 특별상 — 숲을 나무 한 그루에 담은 간판",
    description: [
      "'숲나무'의 간판 디자인입니다. 제24회 아름다운 간판 공모전에 출품해 특별상을 받았습니다.",
      "가게 이름 그대로, 여러 그루가 모인 숲을 나무 한 그루의 선 안에 담았습니다. 가지를 가로선으로 단순화해 멀리서도 형태가 무너지지 않게 하고, 나무 아래에 손으로 쓴 듯한 상호를 두어 간판 전체가 하나의 그림처럼 읽히도록 했습니다."
    ],
    tools: ["Illustrator"],

    /* ★ 이미지 자리를 미리 만들어 뒀습니다.
       assets/img/projects/ 폴더에 아래 이름 그대로 올리기만 하면
       그때부터 상세 페이지에 자동으로 나타납니다.
         p01-01.jpg  p01-02.jpg  p01-03.jpg
       - 아직 안 올린 줄은 화면에 아무것도 표시되지 않습니다 (깨진 아이콘 X)
       - 필요 없는 줄은 지우고, 더 넣고 싶으면 같은 형식으로 추가하세요
       - caption 은 사진 아래 설명입니다. 비우려면 "" 로 두세요           */
    images: [
      { src: "assets/img/projects/p01-01.jpg", caption: "간판 전체 모습" },
      { src: "assets/img/projects/p01-02.jpg", caption: "간판 목업" },
      { src: "assets/img/projects/p01-03.jpg", caption: "설치된 현장" }
    ],
    featured: true
  },

  {
    id: "p02",
    title: "샘샘이와 룡룡이",
    category: ["캐릭터", "공모전"],          // ← 두 필터 모두에 표시됩니다
    year: "2026",
    cover: "assets/img/projects/p02-cover.png",   // 투명 배경 — 검은 카드 위에 그대로 얹힙니다
    summary: "교내 공모전 우수상 — 처음부터 만든 창작 캐릭터 샘샘이와 룡룡이",

    description: [
      "교내 공모전에 출품해 우수상을 받은 캐릭터입니다. 기존 상징이나 있는 캐릭터를 빌리지 않고, 샘샘이와 룡룡이 두 캐릭터를 처음부터 만들었습니다.",
      "둘 다 동그란 덩어리에 짧은 팔다리를 붙인 단순한 형태로 그렸습니다. 샘샘이는 파랑, 룡룡이는 초록으로 색을 나누고 배경까지 같은 색으로 묶어, 이름을 모르고 봐도 둘이 구분되게 했습니다.",
      "앞 · 옆 · 뒤 세 방향을 같은 높이 선 위에 나란히 두었습니다. 어느 각도에서 다시 그려도 비율이 흔들리지 않도록, 기준을 먼저 잡아두고 싶었습니다."
    ],
    tools: ["Illustrator", "Photoshop"],

    /* 커버는 두 캐릭터만 담은 그림, 상세에는 삼면도가 들어간 시트를 둡니다.
       다른 컷(표정·굿즈 적용 등)은 p02-02.jpg 처럼 번호를 이어 올리고
       아래에 줄을 추가하면 뒤이어 나옵니다.                            */
    images: [
      { src: "assets/img/projects/p02-01.jpg", caption: "캐릭터 시트 — 두 캐릭터의 앞 · 옆 · 뒤" }
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
    title: "닭갈비 축제 리플렛",
    category: "광고 · 포스터 · 간판",
    year: "2026",
    cover: "assets/img/projects/p04-cover.jpg",

    summary: "2026 춘천 막국수 닭갈비 축제 홍보 리플렛 — 접었다 펴는 순서대로 정보를 나눠 담기",
    description: [
      "수업 과제로 만든 춘천 막국수 닭갈비 축제 홍보 리플렛입니다. 축제 개요부터 일정, 장소, 스탬프 투어까지 한 장에 들어가야 해서, 종이를 접었다 펴는 순서에 맞춰 정보를 나눴습니다.",
      "바깥 면은 들고 다닐 때 보이는 쪽이라 축제 이름과 날짜, 음식 사진, 찾아오는 길만 남겼습니다. 펼쳤을 때 나오는 안쪽 면에 개요 · 진행 흐름 · 시간 일정 · 스탬프 투어를 칸으로 갈라 넣었고, 표에 들어갈 내용은 표로, 순서가 있는 내용은 목록으로 형태를 나눠 훑어보기만 해도 구분되게 했습니다.",
      "노랑 한 가지를 바탕으로 깔고 글자는 검정으로만 썼습니다. 축제 현장에서 멀리서도 눈에 띄어야 하는 인쇄물이라 색을 늘리기보다 대비를 세게 가져갔고, 캐릭터와 음식 사진만 색을 가진 요소로 남겼습니다.",
      "리플렛의 닭 캐릭터는 앞서 만든 이모티콘(2025)의 그 캐릭터입니다. 축제용으로 자세만 새로 그리고 형태와 색은 그대로 두어, 두 작업이 같은 캐릭터로 읽히게 했습니다."
    ],

    tools: ["Illustrator", "Photoshop"],

    /* 바깥 면 → 안쪽 면 순서로 두면 실제로 리플렛을 받아 펼치는 순서와
       같습니다. 순서를 바꾸려면 아래 두 줄의 위치를 바꾸면 됩니다.     */
    images: [
      { src: "assets/img/projects/p04-02.jpg", caption: "바깥 면 — 표지 · 뒷면 · 찾아오는 길" },
      { src: "assets/img/projects/p04-01.jpg", caption: "안쪽 면 — 개요 · 일정 · 스탬프 투어" }
    ],

    featured: false
  },

  {
    id: "p05",
    title: "무면인 (無面人)",
    category: "캐릭터",
    year: "2026",
    cover: "assets/img/projects/p05-cover.jpg",

    summary: "8등신 비율로 그린 오리지널 캐릭터 — 전신과 설정을 한 장에 정리한 캐릭터 시트",
    description: [
      "키가 머리 길이의 여덟 배가 되는 8등신 비율로 그린 오리지널 캐릭터 '무면인(無面人)'입니다. '얼굴을 잃어버린 자'라는 설정에서 출발해, 본명과 생일, 출생지를 모두 '알 수 없음'으로 비워 두었습니다.",
      "얼굴이 가려져 있으면 표정으로 감정을 전할 수 없습니다. 그래서 그 역할을 비율과 실루엣에 맡겼습니다. 8등신으로 길게 뺀 몸, 회색 상자로 가린 머리, 낡은 검정 셔츠에 맨 주황 넥타이 — 서로 어울리지 않는 요소를 한 인물에 모아, 겉모습만으로는 성격을 단정하기 어렵게 만들었습니다.",
      "한 장 안에 전신 도해와 설정글, 배경을 모두 넣어야 해서 읽는 순서를 먼저 정했습니다. 제목 → 큰 전신 → 설정글 순으로 크기 차이를 크게 두고, 배경의 산과 밤하늘은 채도를 낮춰 인물이 먼저 눈에 들어오도록 했습니다."
    ],

    tools: ["Illustrator", "Photoshop"],

    /* 캐릭터 시트 한 장이 작업 전체라, 목록의 작은 썸네일로는 설정글이
       안 읽힙니다. 그래서 상세 페이지에서 같은 그림을 크게 다시 보여줍니다.
       나중에 다른 컷(표정·포즈·러프 등)을 p05-01.jpg 같은 이름으로 올리고
       아래에 줄을 추가하면 이어서 나옵니다.                            */
    images: [
      { src: "assets/img/projects/p05-cover.jpg", caption: "캐릭터 시트 — 전신 도해와 설정" }
    ],

    featured: true
  },

  {
    id: "p06",
    title: "토토",
    category: ["캐릭터", "공모전"],
    year: "2026",
    cover: "assets/img/projects/p06-cover.png",   // 투명 배경 — 검은 카드 위에 그대로 얹힙니다

    summary: "가야 탐험대 캐릭터 공모전 출품작 — 가야 토기에서 형태를 가져온 마스코트",
    description: [
      "국립가야문화유산연구소의 마스코트로 제안한 캐릭터 '토토'입니다. 가야 탐험대 캐릭터 공모전에 출품했습니다.",
      "가야 토기의 둥근 몸체를 그대로 캐릭터의 몸으로 삼고, 토기에 새겨진 얼굴선을 표정으로 살렸습니다. 설정도 유물에서 끌어왔습니다. 생년월일은 400년, 특이점은 '불멸', 싫어하는 것은 '신라'로 두어 가야라는 배경이 프로필만 읽어도 전해지게 했습니다. 머리에 꽂힌 꽃은 꽃을 주면 온순해진다는 설정을 형태로 드러낸 장치입니다.",
      "마스코트는 그림 한 장으로 끝나지 않고 굿즈와 안내물에 계속 쓰이기 때문에, 받는 쪽이 바로 가져다 쓸 수 있는 형태까지 만들어 냈습니다. 앞 · 옆 · 뒤 턴어라운드로 비율 기준을 잡고, 표정 6종으로 상황별 변주를 두고, 메인 컬러를 CMYK 값으로 지정하고, 책 · 티셔츠 · 키링 목업으로 실제로 얹었을 때의 모습까지 함께 넣었습니다."
    ],

    tools: ["Illustrator", "Photoshop"],

    /* 커버는 토토 단독 그림, 상세에는 시트를 먼저 크게 보여주고
       시트 안에서는 작게 들어가 있던 굿즈 목업을 뒤이어 원래 크기로 둡니다. */
    images: [
      { src: "assets/img/projects/p06-01.jpg", caption: "캐릭터 시트 — 턴어라운드 · 표정 6종 · 굿즈 목업" },
      { src: "assets/img/projects/p06-02.jpg", caption: "굿즈 적용 — 키링" },
      { src: "assets/img/projects/p06-03.jpg", caption: "굿즈 적용 — 티셔츠" }
    ],

    featured: false
  },

  {
    id: "p07",
    title: "닭 이모티콘",
    category: "캐릭터",
    year: "2025",
    cover: "assets/img/projects/p07-cover.jpg",

    summary: "메신저용 이모티콘 22종 — 근육질 닭 한 마리로 감정을 다 말하기",
    description: [
      "메신저에서 쓰는 이모티콘 22종입니다. 근육질 몸에 회색 치마를 입은 닭 한 마리로 '사랑해용', '분노', '혼란', '잘자~' 같은 일상 대화의 감정을 나눠 담았습니다.",
      "대화창에서는 아주 작게 뜨는 그림이라 요소를 줄였습니다. 흰 몸에 굵은 외곽선, 붉은 볏과 노란 부리, 회색 치마 — 색을 다섯 가지 안쪽으로 묶어 두면 손톱만 한 크기로 떠도 무엇인지 바로 알아볼 수 있습니다.",
      "표정만으로 모자란 감정은 글자와 자세로 보탰습니다. '하하하하'를 화면 가득 깔고, 문틈으로 몸을 반쯤 내밀고, 팔을 벌린 채 늘어지는 식으로 — 같은 캐릭터 하나가 스물두 번 다르게 읽히도록 만들었습니다.",
      "이 닭은 이후 춘천 막국수 닭갈비 축제 리플렛(2026)에도 그대로 썼습니다. 메신저 화면에서 인쇄물로 자리를 옮겨도 형태가 버티는지 확인해 본 셈입니다."
    ],

    tools: ["Illustrator", "Photoshop"],

    /* gallery: "tiles"
       이모티콘처럼 개수가 많고 낱개가 작은 작업은 타일형으로 깝니다.
       - 한 줄에 여러 개가 들어가고
       - 밝은 바탕 위에 놓여 외곽선과 글자가 묻히지 않습니다
       (색을 바꾸려면 assets/css/pages.css 의 --tile 한 줄)            */
    gallery: "tiles",

    images: [
      { src: "assets/img/projects/p07-01.png", caption: "" },
      { src: "assets/img/projects/p07-02.png", caption: "" },
      { src: "assets/img/projects/p07-03.png", caption: "" },
      { src: "assets/img/projects/p07-04.png", caption: "" },
      { src: "assets/img/projects/p07-05.png", caption: "" },
      { src: "assets/img/projects/p07-06.png", caption: "" },
      { src: "assets/img/projects/p07-07.png", caption: "" },
      { src: "assets/img/projects/p07-08.png", caption: "" },
      { src: "assets/img/projects/p07-09.png", caption: "" },
      { src: "assets/img/projects/p07-10.png", caption: "" },
      { src: "assets/img/projects/p07-11.png", caption: "" },
      { src: "assets/img/projects/p07-12.png", caption: "" },
      { src: "assets/img/projects/p07-13.png", caption: "" },
      { src: "assets/img/projects/p07-14.png", caption: "" },
      { src: "assets/img/projects/p07-15.png", caption: "" },
      { src: "assets/img/projects/p07-16.png", caption: "" },
      { src: "assets/img/projects/p07-17.png", caption: "" },
      { src: "assets/img/projects/p07-18.png", caption: "" },
      { src: "assets/img/projects/p07-19.png", caption: "" },
      { src: "assets/img/projects/p07-20.png", caption: "" },
      { src: "assets/img/projects/p07-21.png", caption: "" },
      { src: "assets/img/projects/p07-22.png", caption: "" }
    ],

    featured: false
  },

  {
    id: "p08",
    title: "AI 굿즈 공모전",
    category: ["캐릭터", "공모전"],
    year: "2026",
    cover: "assets/img/projects/p08-cover.jpg",

    summary: "한국기술교육대학교 AI 굿즈 디자인 공모전 출품작 — 학교 캐릭터 '코리'를 무드등과 키링으로",
    description: [
      "한국기술교육대학교 AI 굿즈 디자인 공모전에 출품한 작업입니다. 캐릭터를 새로 만드는 공모전이 아니라, 학교가 이미 쓰고 있는 마스코트 '코리'를 굿즈로 옮기는 과제였습니다. 코리의 생김새와 색은 그대로 두고 물건에 맞는 표정과 자세만 새로 그렸습니다.",
      "굿즈 사진은 실제로 제작해 찍은 것이 아니라 ChatGPT로 만들고 포토샵으로 다듬은 이미지입니다. 물건을 뽑아 보지 않고도 완성된 모습을 보여주는 것이 이 공모전의 방식이었습니다.",
      "무드등은 불을 켠 모습과 끈 모습을 함께 실었습니다. 조명은 켜 놓은 그림만 보면 낮에 어떻게 보이는지 알 수 없어서, 두 상태가 나란히 있어야 물건으로 상상이 됩니다. 키링은 얼굴만 잘라 쓰되 기본 · 반짝 · 슬픔 세 가지 표정으로 나눠, 고르는 재미를 두면서도 셋이 나란히 있을 때 같은 캐릭터로 보이게 했습니다."
    ],

    tools: ["Photoshop", "ChatGPT"],

    /* 굿즈 종류별로 한 장씩. 다른 컷을 p08-03.jpg 처럼 올리고
       아래에 줄을 추가하면 이어서 나옵니다.                           */
    images: [
      { src: "assets/img/projects/p08-01.jpg", caption: "코리 무드등 — 전원 ON · OFF" },
      { src: "assets/img/projects/p08-02.jpg", caption: "코리 키링 — 표정 3종" }
    ],

    featured: true
  },

  {
    id: "p09",
    title: "확대 효과를 이용한 자동차 광고",
    category: "광고 · 포스터 · 간판",
    year: "2026",
    cover: "assets/img/projects/p09-cover.jpg",

    summary: "같은 차를 세 배율로 쌓아 올린 자동차 광고 포스터",
    description: [
      "확대를 주제로 만든 자동차 광고 포스터입니다. 맥라렌 W1 한 대를 배율만 바꿔 세 번 담았습니다. 맨 위는 차체와 휠이 화면을 가득 채울 만큼 바짝 당긴 컷, 가운데는 뒤쪽 절반, 맨 아래는 차 전체입니다.",
      "위로 갈수록 크고 아래로 갈수록 작아지게 두었습니다. 아래에서 위로 시선이 올라가면서 점점 가까워지는 흐름이 생기고, 가장 작은 맨 아래 컷이 '무엇을 광고하는지'를 마지막에 분명히 해 줍니다.",
      "배경은 연기와 어두운 회색으로 눌러 두고 차의 주황색만 남겼습니다. 세 컷이 겹쳐 있어도 색이 하나뿐이라 셋이 같은 차라는 게 바로 읽힙니다."
    ],

    tools: ["Photoshop"],

    /* 시안이나 다른 배율 실험이 있으면 p09-01.jpg 처럼 올리고
       아래에 줄을 추가하면 이어서 나옵니다.                           */
    images: [
      { src: "assets/img/projects/p09-cover.jpg", caption: "포스터 전체 — 위에서 아래로 배율이 줄어드는 구성" }
    ],

    featured: false
  }
];
