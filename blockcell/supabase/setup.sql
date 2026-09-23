-- ═══════════════════════════════════════════════════════
-- 블록셀 관리자 설정 테이블 만들기
--
-- ★ 실행 전에 아래 '여기에-초기-비밀번호'를
--   원하는 비밀번호로 바꾼 뒤 실행하세요! ★
--
-- Supabase 대시보드 → SQL Editor → 붙여넣기 → Run
-- ═══════════════════════════════════════════════════════

-- 해시 계산에 필요한 확장
create extension if not exists pgcrypto;

-- 비밀번호 해시를 담는 테이블 (행 1개만 사용)
create table if not exists public.admin_settings (
  id   int  primary key,
  salt text not null,
  hash text not null
);

-- RLS 켜기 + 정책을 하나도 만들지 않음
--   → anon(브라우저) 키로는 읽기/쓰기 전부 불가
--   → service_role(Edge Function 전용)만 접근 가능
alter table public.admin_settings enable row level security;

-- 초기 비밀번호 저장 (다시 실행하면 비밀번호가 이 값으로 재설정됨)
insert into public.admin_settings (id, salt, hash)
values (
  1,
  'blockcell-salt-2026',
  encode(digest('blockcell-salt-2026' || '0318', 'sha256'), 'hex')
)
on conflict (id) do update
  set salt = excluded.salt,
      hash = excluded.hash;
