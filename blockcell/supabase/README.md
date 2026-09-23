# 랭킹 초기화 기능 — 서버 설정 안내

브라우저에는 삭제 권한이 전혀 없고, 비밀번호를 확인한 **서버 함수(Edge Function)**만
service_role 키로 랭킹을 지울 수 있는 구조입니다. 아래 두 단계만 하면 됩니다.

## 1단계. 비밀번호 테이블 만들기 (SQL)

1. `setup.sql` 파일을 열어 `여기에-초기-비밀번호`를 원하는 비밀번호로 수정합니다.
2. Supabase 대시보드 → **SQL Editor** → 파일 내용 붙여넣기 → **Run**.

이 테이블은 RLS로 잠겨 있어서 브라우저(anon 키)로는 읽을 수도 없습니다.
비밀번호를 잊어버렸다면 이 SQL을 다시 실행해서 재설정하면 됩니다.

## 2단계. Edge Function 배포

### 방법 A — 대시보드에서 (CLI 설치 불필요)

1. Supabase 대시보드 → **Edge Functions** → **Deploy a new function** (또는 "Via Editor").
2. 함수 이름: `reset-leaderboard`
3. `functions/reset-leaderboard/index.ts` 내용을 붙여넣고 **Deploy**.
4. 함수 상세 화면 → **Details/Settings**에서 **Verify JWT** 옵션을 **끕니다(OFF)**.
   (비밀번호로 자체 인증하므로 JWT 검증이 필요 없습니다. 켜져 있으면 401 오류가 납니다.)

### 방법 B — CLI로

```bash
supabase functions deploy reset-leaderboard --no-verify-jwt
```

## 3단계. 동작 확인

1. 게임 페이지 → 🏆 랭킹 보기 → 아무 탭이나 선택.
2. 목록 아래 **"이 레벨 랭킹 초기화"** 버튼 → 비밀번호 입력 → 초기화.
3. **"관리자 비밀번호 변경"**으로 비밀번호를 바꿀 수 있습니다.
   (기존 비밀번호를 알아야만 변경 가능)

## 참고

- 함수 주소는 `js/admin.js` 맨 위 `ADMIN_FN_URL`에 있습니다.
  프로젝트가 다르면 이 주소의 프로젝트 ID 부분만 바꿔주세요.
- service_role 키는 코드에 쓸 필요가 없습니다 — Edge Function 실행 환경에
  `SUPABASE_SERVICE_ROLE_KEY`로 자동 주입됩니다.
- 비밀번호가 틀리면 서버가 0.8초 지연 후 응답해 무차별 대입을 늦춥니다.
