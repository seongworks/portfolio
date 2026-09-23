// ═══════════════════════════════════════════════════════
// reset-leaderboard — Supabase Edge Function
//
// 브라우저는 이 함수에 비밀번호만 보내고,
// 실제 삭제는 서버만 가진 service_role 키로 수행합니다.
//
// 지원 action:
//   { action:"reset", level:"basic|inter|adv|hacker", password:"..." }
//   { action:"change_password", old_password:"...", new_password:"..." }
//
// 배포: supabase functions deploy reset-leaderboard --no-verify-jwt
// (자세한 순서는 ../README.md 참고)
// ═══════════════════════════════════════════════════════
import { createClient } from "npm:@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });

async function sha256Hex(s: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(s),
  );
  return [...new Uint8Array(buf)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "POST만 지원합니다." }, 405);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "잘못된 요청 형식입니다." }, 400);
  }

  // service_role 키 — Edge Function 환경변수로 자동 주입됨 (브라우저에는 절대 노출되지 않음)
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  // 저장된 비밀번호 해시 읽기 (RLS로 잠긴 테이블이지만 service_role은 우회)
  const { data: row, error: readErr } = await supabase
    .from("admin_settings")
    .select("salt,hash")
    .eq("id", 1)
    .single();
  if (readErr || !row) {
    return json(
      { error: "관리자 설정이 없습니다. setup.sql을 먼저 실행해주세요." },
      500,
    );
  }

  const verify = async (pw: unknown) =>
    typeof pw === "string" &&
    (await sha256Hex(row.salt + pw)) === row.hash;

  // ─── 랭킹 초기화 ───
  if (body.action === "reset") {
    const level = String(body.level ?? "");
    if (!["basic", "inter", "adv", "hacker"].includes(level)) {
      return json({ error: "잘못된 레벨입니다." }, 400);
    }
    if (!(await verify(body.password))) {
      await sleep(800); // 무차별 대입 속도 늦추기
      return json({ ok: false, error: "비밀번호가 틀렸어요." }, 401);
    }
    const { error } = await supabase
      .from("leaderboard")
      .delete()
      .eq("level", level);
    if (error) return json({ error: "삭제 실패: " + error.message }, 500);
    return json({ ok: true, level });
  }

  // ─── 비밀번호 변경 (기존 비밀번호 필요) ───
  if (body.action === "change_password") {
    if (!(await verify(body.old_password))) {
      await sleep(800);
      return json({ ok: false, error: "기존 비밀번호가 틀렸어요." }, 401);
    }
    const np = String(body.new_password ?? "");
    if (np.length < 4) {
      return json({ error: "새 비밀번호는 4자 이상이어야 해요." }, 400);
    }
    const salt = crypto.randomUUID(); // 새 솔트로 교체
    const hash = await sha256Hex(salt + np);
    const { error } = await supabase
      .from("admin_settings")
      .update({ salt, hash })
      .eq("id", 1);
    if (error) return json({ error: "변경 실패: " + error.message }, 500);
    return json({ ok: true });
  }

  return json({ error: "알 수 없는 action입니다." }, 400);
});
