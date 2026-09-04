# 송호성 포트폴리오

콘텐츠 디자인 포트폴리오 사이트입니다.
**빌드 도구·프로그램 설치 없이** `index.html` 을 더블클릭하면 바로 열립니다.

- 메인 색: 검정 `#0A0A0A`
- 포인트 색: 흰색 `#FFFFFF`

---

## 1. 자주 바꾸는 곳은 딱 2개입니다

| 무엇을 바꾸고 싶을 때 | 열어야 할 파일 |
|---|---|
| 작업 추가·수정·삭제 | `data/projects.js` |
| 필터 버튼 순서 | `data/projects.js` 맨 위 `CATEGORY_ORDER` |
| 이름 · 이메일 · SNS | `data/site.js` |
| 색 · 폰트 | `assets/css/base.css` 맨 위 `:root` |
| 메뉴 이름·순서 | `assets/js/include.js` 맨 위 `NAV` |
| 소개글 · 이력 | `about.html` |

파일은 메모장, VS Code 등 아무 텍스트 편집기로 열면 됩니다.

---

## 2. 작업 추가하는 법

### ① 이미지 넣기
`assets/img/projects/` 폴더에 이미지를 넣습니다.
파일 이름은 `p05-cover.jpg`, `p05-01.jpg` 처럼 **번호 순서**로 지으면 관리가 편합니다.

### ② `data/projects.js` 열기
맨 아래 `}` 와 `];` 사이에 **쉼표(,)** 를 찍고 아래 블록을 붙여넣습니다.

```js
  ,{
    id: "p05",                                   // 겹치지 않게!
    title: "작업 제목",
    category: "웹 디자인",                        // 여러 개면 ["웹 디자인", "공모전"]
    year: "2026",
    cover: "assets/img/projects/p05-cover.jpg",
    summary: "목록에 보이는 한 줄 소개",
    description: [
      "첫 번째 문단입니다.",
      "두 번째 문단입니다."                        // 문단은 얼마든지 추가 가능
    ],
    tools: ["Photoshop", "Illustrator"],
    images: [
      { src: "assets/img/projects/p05-01.jpg", caption: "이미지 설명" },
      { src: "assets/img/projects/p05-02.jpg", caption: "" }
    ],
    featured: true                                // true 면 홈 화면에도 표시
  }
```

### ③ 저장하고 새로고침
끝입니다. 목록 페이지 · 상세 페이지 · 필터 버튼이 모두 자동으로 만들어집니다.

---

## 2-1. 한 작업을 여러 필터에 넣기

공모전에 낸 포스터처럼 **분류가 두 개인 작업**은 `category` 에 대괄호로 묶어 나열합니다.

```js
category: ["광고 · 포스터", "공모전"],
```

이렇게 하면 `광고 · 포스터` 필터에서도, `공모전` 필터에서도 똑같이 보입니다.
하나뿐이면 지금처럼 `category: "캐릭터"` 로 써도 됩니다.

### 필터 버튼 순서 바꾸기

`data/projects.js` 맨 위에서 순서를 정합니다.

```js
const CATEGORY_ORDER = ["광고 · 포스터", "캐릭터", "웹 디자인", "공모전"];
```

- 적힌 순서대로 버튼이 나옵니다 (`전체` 는 항상 맨 앞)
- 여기 없는 분류를 작업에 쓰면 **맨 뒤에 자동으로 추가**되니, 새 분류를 만들면 이 줄에도 넣어주세요

### 분류만 걸러서 보여주는 주소

작업 상세 페이지의 분류 태그를 누르면 아래 주소로 이동합니다. 링크로 공유해도 됩니다.

```
work.html?cat=공모전
```

> ⚠️ 자주 하는 실수
> - 쉼표(`,`)를 빼먹으면 작업 목록이 통째로 안 보입니다.
> - 큰따옴표(`"`)는 반드시 짝을 맞춰주세요.
> - 화면이 비어 보이면 `F12` → `Console` 탭에 빨간 글씨로 원인이 나옵니다.

---

## 3. 색 바꾸는 법

`assets/css/base.css` 맨 위 `:root` 안의 값만 바꾸면 사이트 전체에 적용됩니다.

```css
--bg:       #0A0A0A;   /* 배경 */
--point:    #FFFFFF;   /* 포인트 — 제목, 호버 */
--text:     rgba(255,255,255,.72);   /* 본문 */
--text-dim: rgba(255,255,255,.42);   /* 캡션 */
```

흰색을 투명도로 나눠 쓰는 구조라, `--point` 만 다른 색으로 바꿔도
전체 톤이 자연스럽게 따라갑니다.

---

## 4. 폴더 구조

```
├── index.html          홈
├── work.html           작업 목록
├── project.html        작업 상세 (1개 파일로 모든 작업 표시)
├── about.html          소개
├── contact.html        연락처
│
├── data/
│   ├── site.js         ★ 이름 · 이메일 · SNS
│   └── projects.js     ★ 작업 목록
│
├── partials/           헤더 · 푸터 참고용 마크업
│
└── assets/
    ├── css/
    │   ├── base.css    ★ 색 · 폰트 · 기본 스타일
    │   ├── layout.css  헤더 · 푸터 · 그리드 · 반응형
    │   └── pages.css   페이지별 스타일
    ├── js/
    │   ├── include.js  헤더 · 푸터 자동 삽입
    │   ├── render.js   작업 목록/상세 자동 생성
    │   └── ui.js       모바일 메뉴 · 스크롤 효과
    ├── img/
    │   ├── projects/   작업 이미지
    │   └── profile/    프로필 사진
    └── fonts/          웹폰트 (직접 넣을 경우)
```

---

## 5. 인터넷에 올리기 (무료)

**GitHub Pages**
1. 이 저장소 → `Settings` → `Pages`
2. Source 를 `Deploy from a branch`, 브랜치는 `main`, 폴더는 `/ (root)` 로 선택
3. 1~2분 뒤 `https://아이디.github.io/저장소이름/` 주소로 접속

---

## 6. 참고

- 지금 들어있는 회색 이미지는 **자리표시용 예시**입니다. 실제 작업 이미지로 바꿔주세요.
- 폰트는 Pretendard 를 인터넷에서 불러옵니다.
  인터넷 없이 쓰려면 각 HTML 상단의 `pretendard.min.css` 줄을 지우면 기본 폰트로 표시됩니다.
- 이미지 권장 크기: 커버 `1200×900`, 상세 `1600×1000` (가로 기준, JPG 권장)
