'use strict';
/* ═══════════════════════════════════
   관리자: 랭킹 초기화 / 비밀번호 변경
   (Supabase Edge Function 호출 — 브라우저에는 삭제 권한 없음)
═══════════════════════════════════ */
const ADMIN_FN_URL='https://dkvbmbhfxnuurftxvsck.supabase.co/functions/v1/reset-leaderboard';

async function adminRequest(payload){
  let res;
  try{
    res=await fetch(ADMIN_FN_URL,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(payload)
    });
  }catch(e){
    throw new Error('서버에 연결하지 못했어요. Edge Function이 배포되었는지 확인해주세요.');
  }
  let data={};
  try{data=await res.json();}catch(e){}
  if(!res.ok||!data.ok) throw new Error(data.error||'요청에 실패했어요. (HTTP '+res.status+')');
  return data;
}

/* ─── 초기화 모달 ─── */
function openResetModal(){
  $('reset-lv-name').textContent=RANK_LV_NAME[curRankLv];
  $('reset-pw').value='';
  const m=$('reset-msg');m.textContent='';m.style.color='var(--sub)';
  $('reset-overlay').classList.add('on');
  setTimeout(()=>$('reset-pw').focus(),60);
}
function closeResetModal(){$('reset-overlay').classList.remove('on');}

async function confirmReset(){
  const pw=$('reset-pw').value;
  const msg=$('reset-msg');
  if(!pw){msg.style.color='var(--red)';msg.textContent='비밀번호를 입력해주세요.';$('reset-pw').focus();return;}
  const btn=$('reset-go');
  btn.disabled=true;msg.style.color='var(--sub)';msg.textContent='초기화 중...';
  try{
    await adminRequest({action:'reset',level:curRankLv,password:pw});
    msg.style.color='var(--lime-d)';msg.textContent='✓ '+RANK_LV_NAME[curRankLv]+' 랭킹을 초기화했어요.';
    setTimeout(()=>{closeResetModal();renderRankTable(curRankLv);},900);
  }catch(e){
    msg.style.color='var(--red)';msg.textContent=e.message;
  }
  btn.disabled=false;
}

/* ─── 비밀번호 변경 모달 ─── */
function openPwModal(){
  ['pw-old','pw-new','pw-new2'].forEach(id=>$(id).value='');
  const m=$('pw-msg');m.textContent='';m.style.color='var(--sub)';
  $('pw-overlay').classList.add('on');
  setTimeout(()=>$('pw-old').focus(),60);
}
function closePwModal(){$('pw-overlay').classList.remove('on');}

async function confirmPwChange(){
  const oldPw=$('pw-old').value,newPw=$('pw-new').value,newPw2=$('pw-new2').value;
  const msg=$('pw-msg');
  msg.style.color='var(--red)';
  if(!oldPw){msg.textContent='기존 비밀번호를 입력해주세요.';$('pw-old').focus();return;}
  if(newPw.length<4){msg.textContent='새 비밀번호는 4자 이상이어야 해요.';$('pw-new').focus();return;}
  if(newPw!==newPw2){msg.textContent='새 비밀번호가 서로 달라요. 다시 확인해주세요.';$('pw-new2').focus();return;}
  if(newPw===oldPw){msg.textContent='기존 비밀번호와 다른 비밀번호를 사용해주세요.';$('pw-new').focus();return;}
  const btn=$('pw-go');
  btn.disabled=true;msg.style.color='var(--sub)';msg.textContent='변경 중...';
  try{
    await adminRequest({action:'change_password',old_password:oldPw,new_password:newPw});
    msg.style.color='var(--lime-d)';msg.textContent='✓ 비밀번호를 변경했어요.';
    setTimeout(closePwModal,900);
  }catch(e){
    msg.style.color='var(--red)';msg.textContent=e.message;
  }
  btn.disabled=false;
}

/* ─── 모달 공통: 배경 클릭/ESC 닫기, Enter 제출 ─── */
$('reset-overlay').addEventListener('click',e=>{if(e.target===$('reset-overlay'))closeResetModal();});
$('pw-overlay').addEventListener('click',e=>{if(e.target===$('pw-overlay'))closePwModal();});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){closeResetModal();closePwModal();}
});
$('reset-pw').addEventListener('keydown',e=>{if(e.key==='Enter')confirmReset();});
$('pw-new2').addEventListener('keydown',e=>{if(e.key==='Enter')confirmPwChange();});
