'use strict';

/* ═══════════════════════════════════
   온라인 랭킹 (Supabase)
═══════════════════════════════════ */
const SUPABASE_URL='https://dkvbmbhfxnuurftxvsck.supabase.co/rest/v1/';
const SUPABASE_KEY='sb_publishable_N47DiI4bl23tspM3gJAoOQ_q81hFA1D';
function sbHeaders(extra){
  return Object.assign({apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY,'Content-Type':'application/json'},extra||{});
}
/* 브라우저별 "이 레벨에서 이미 쓴 닉네임" 기록 — 레벨마다 따로 관리 */
function getClaims(){
  try{return JSON.parse(localStorage.getItem('blockcell_claims'))||{};}catch(e){return {};}
}
function saveClaim(level,nick){
  const c=getClaims();c[level]=nick;localStorage.setItem('blockcell_claims',JSON.stringify(c));
}
/* 예전 버전(레벨 구분 없는 전역 닉네임)에서 쓰던 값을 4개 레벨 모두에 이전 */
(function migrateOldClaim(){
  const old=localStorage.getItem('blockcell_my_nickname');
  if(old && !localStorage.getItem('blockcell_claims')){
    const c={};['basic','inter','adv','hacker'].forEach(lv=>c[lv]=old);
    localStorage.setItem('blockcell_claims',JSON.stringify(c));
  }
})();
/* 닉네임이 "해당 레벨" 랭킹에 이미 있는지 확인. 이 브라우저가 그 레벨에서 이미 쓴 닉네임이면 통과. */
async function checkNicknameTaken(nick,level){
  const claims=getClaims();
  if(claims[level]===nick)return false;
  try{
    const res=await fetch(SUPABASE_URL+'leaderboard?nickname=ilike.'+encodeURIComponent(nick)+'&level=eq.'+level+'&select=nickname&limit=1',{headers:sbHeaders()});
    if(!res.ok)return false; /* 조회 실패 시 막지 않음(가용성 우선) */
    const rows=await res.json();
    return rows.length>0;
  }catch(e){
    console.warn('닉네임 확인 실패:',e);
    return false;
  }
}
/* 완주 점수를 온라인 랭킹에 제출 (실패해도 앱 진행에는 영향 없음) */
async function submitScore(nick,level,score){
  try{
    await fetch(SUPABASE_URL+'leaderboard',{
      method:'POST',
      headers:sbHeaders({Prefer:'return=minimal'}),
      body:JSON.stringify({nickname:nick,level:level,score:score})
    });
  }catch(e){console.warn('점수 제출 실패:',e);}
}
/* 특정 레벨의 상위 기록을 가져와 닉네임별 최고점만 남긴다 */
async function fetchLeaderboard(level,limit){
  limit=limit||100;
  const res=await fetch(SUPABASE_URL+'leaderboard?level=eq.'+level+'&select=nickname,score,created_at&order=score.desc&limit='+limit,{headers:sbHeaders()});
  if(!res.ok)throw new Error('랭킹을 불러오지 못했어요');
  const rows=await res.json();
  const seen=new Set();const out=[];
  rows.forEach(r=>{if(!seen.has(r.nickname)){seen.add(r.nickname);out.push(r);}});
  return out;
}
