/* 활성 덱: 초급(FUNCS) / 중급(FUNCS_INTER) 전환 */
let DECK=FUNCS;
let MODE='basic';
function mainScreen(){return (MODE==='inter'||MODE==='pinter')?'screen-main-inter':MODE==='adv'?'screen-main-adv2':MODE==='hacker'?'screen-main-hacker':'screen-main-basic';}
function rKey(){return MODE==='inter'?'blockcell_records_inter':MODE==='adv'?'blockcell_records_adv':MODE==='hacker'?'blockcell_records_hacker':MODE==='practice'?'blockcell_records_practice':MODE==='pinter'?'blockcell_records_pinter':'blockcell_records_basic';}
const isPractice=()=>MODE==='practice'||MODE==='pinter';

/* ═══════════════════════════════════
   상태
═══════════════════════════════════ */
const S={name:'',fi:0,pi:0,scores:new Array(20).fill(null),slots:[],wrongs:0,solved:false,revealed:false,t0:0,timer:null,locked:false,hintUsed:false};
const $=id=>document.getElementById(id);
const getRecords=()=>{try{return JSON.parse(localStorage.getItem(rKey()))||{}}catch(e){return{}}};
const saveRecords=r=>localStorage.setItem(rKey(),JSON.stringify(r));
const gIdx=()=>{let o=0;for(let k=0;k<S.fi;k++)o+=DECK[k].problems.length;return o+S.pi;};
const totalProbs=()=>DECK.reduce((a,f)=>a+f.problems.length,0);
const probOffset=fi=>{let o=0;for(let k=0;k<fi;k++)o+=DECK[k].problems.length;return o;};
const flatProbs=()=>DECK.flatMap(f=>f.problems);
const resetScores=()=>{S.scores=new Array(totalProbs()).fill(null);};
const curFn=()=>DECK[S.fi];
const curProb=()=>DECK[S.fi].problems[S.pi];
const totalScore=()=>S.scores.reduce((a,b)=>a+(b||0),0);

/* ─── 화면 전환 ─── */
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('on'));
  /* 시작 화면·초급 메뉴는 항상 기본(라임) 테마 — 랭킹에서 바뀐 테마 초기화 */
  if(id==='screen-start'||id==='screen-main-basic'){
    document.body.classList.remove('inter-theme','adv-theme','hacker-theme');
  }
  const el=$(id);el.classList.remove('on');void el.offsetWidth;el.classList.add('on');
  window.scrollTo({top:0,behavior:'smooth'});
}
function goHome(){clearInterval(S.timer);showScreen('screen-start');}
function wip(){alert('준비 중입니다!');}

/* ─── 온라인 랭킹 화면 ─── */
const RANK_LV_NAME={basic:'초급자',inter:'중급자',adv:'고급자',hacker:'해커모드'};
let curRankLv='basic';
function openRanking(){
  showScreen('screen-ranking');
  switchRankTab('basic');
}
function switchRankTab(lv){
  curRankLv=lv;
  document.querySelectorAll('.rank-tab').forEach(t=>t.classList.toggle('on',t.dataset.lv===lv));
  document.body.classList.toggle('inter-theme',lv==='inter');
  document.body.classList.toggle('adv-theme',lv==='adv');
  document.body.classList.toggle('hacker-theme',lv==='hacker');
  renderRankTable(lv);
}
async function renderRankTable(lv){
  const table=$('rank-table'),empty=$('rank-empty'),loading=$('rank-loading');
  table.innerHTML='';empty.style.display='none';loading.style.display='block';
  try{
    const rows=await fetchLeaderboard(lv,50);
    loading.style.display='none';
    if(rows.length===0){empty.style.display='block';return;}
    table.innerHTML=rows.map((r,i)=>`<tr class="${r.nickname===S.name?'me':''}"><td>${i+1}</td><td>${escapeHtml(r.nickname)}</td><td>${r.score.toLocaleString()}점</td></tr>`).join('');
  }catch(e){
    loading.style.display='none';
    empty.textContent='랭킹을 불러오지 못했어요. 잠시 후 다시 시도해주세요.';
    empty.style.display='block';
  }
}
function escapeHtml(s){
  const d=document.createElement('div');d.textContent=s;return d.innerHTML;
}

/* ─── 레벨 선택 ─── */
async function goLevel(lv){
  const nick=$('nickname').value.trim();
  const note=$('input-note');
  const btns=document.querySelectorAll('.lvl-btn');
  if(!nick){note.textContent='별명을 먼저 입력해주세요!';note.style.color='var(--red)';$('nickname').focus();return;}
  note.textContent='별명 확인 중...';note.style.color='';
  btns.forEach(b=>b.disabled=true);
  const taken=await checkNicknameTaken(nick,lv);
  btns.forEach(b=>b.disabled=false);
  if(taken){
    note.textContent=`이미 ${RANK_LV_NAME[lv]} 랭킹에 있는 별명이에요. 다른 별명을 쓰거나 다른 레벨을 선택해주세요.`;note.style.color='var(--red)';$('nickname').focus();
    return;
  }
  saveClaim(lv,nick);
  note.textContent='이 브라우저에 기록이 저장됩니다.';note.style.color='';
  S.name=nick;
  /* 랭킹에서 바뀐 테마가 남지 않도록 각 레벨 메뉴 테마를 명시적으로 설정 */
  document.body.classList.toggle('inter-theme',lv==='inter');
  document.body.classList.toggle('adv-theme',lv==='adv');
  document.body.classList.toggle('hacker-theme',lv==='hacker');
  if(lv==='basic'){
    $('basic-name-hud').textContent=nick;
    $('basic-main-desc').textContent=`안녕하세요, ${nick}님! 블록을 끼워 수식을 완성하는 엑셀 함수 퀴즈입니다.`;
    showScreen('screen-main-basic');
  }else if(lv==='inter'){
    $('inter-name-hud').textContent=nick;
    showScreen('screen-main-inter');
  }else if(lv==='adv'){
    $('adv-name-hud').textContent=nick;
    showScreen('screen-main-adv2');
  }else if(lv==='hacker'){
    $('hacker-name-hud').textContent=nick;
    showScreen('screen-main-hacker');
  }
}

/* ═══════════════════════════════════
   학습하기
═══════════════════════════════════ */
function setMode(mode){
  MODE=mode;
  DECK = mode==='inter'?FUNCS_INTER : mode==='adv'?FUNCS_ADV : mode==='hacker'?FUNCS_HACKER : mode==='practice'?FUNCS_PRACTICE : mode==='pinter'?FUNCS_PRACTICE_INTER : FUNCS;
  document.body.classList.toggle('inter-theme',mode==='inter'||mode==='pinter');
  document.body.classList.toggle('adv-theme',mode==='adv');
  document.body.classList.toggle('hacker-theme',mode==='hacker');
}
function backToMain(){showScreen(mainScreen());}
function openLearn(mode){
  if(mode==='hacker'){flash('해커모드에는 학습하기가 없습니다','warn');return;}
  setMode(mode);
  buildFnList();
  $('fn-detail-area').innerHTML='<div class="learn-placeholder">← 위에서 함수를 선택하면 상세 설명이 여기에 나타납니다</div>';
  showScreen('screen-learn');
}
function showLearnScreen(){openLearn('basic');}

function buildFnList(){
  const list=$('fn-list');list.innerHTML='';
  DECK.forEach((f,i)=>{
    if(f.noLearn)return;
    const btn=document.createElement('button');
    btn.className='fn-item';
    btn.innerHTML=`<span class="fi-name">${f.fn}</span><span class="fi-desc">${f.learn.oneline}</span>`;
    btn.onclick=()=>showFnDetail(i,btn);
    list.appendChild(btn);
  });
}

function showFnDetail(idx,btn){
  document.querySelectorAll('.fn-item').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const f=DECK[idx];
  const l=f.learn;
  const area=$('fn-detail-area');

  const exHtml=l.examples.map(e=>`
    <div class="fd-ex">
      <div class="ex-formula">${e.formula}</div>
      <div class="ex-result">${e.result}</div>
      <div class="ex-comment">${e.comment}</div>
    </div>`).join('');

  const paramHtml=l.params.map(p=>`
    <div class="fd-param">
      <span class="param-name">${p.name}</span>
      <span class="param-desc">${p.desc}</span>
    </div>`).join('');

  const tipHtml=l.absTip?`
      <div class="fd-section">
        <div class="fd-section-title">TIP — 절대참조 $</div>
        <div class="fd-tip">${l.absTip}</div>
      </div>`:'';

  area.innerHTML=`
    <div class="fn-detail">
      <h3><span class="fn-chip2">${f.fn}</span> ${f.title}</h3>
      <p class="fd-oneline">${l.oneline}</p>
      <p class="fd-desc">${l.desc}</p>
      <div class="fd-section">
        <div class="fd-section-title">SYNTAX — 기본 형식</div>
        <div class="fd-syntax">${l.syntax}<br><span class="sy-comment">// 대괄호 [ ] 안은 생략 가능한 인수입니다</span></div>
      </div>
      <div class="fd-section">
        <div class="fd-section-title">PARAMETERS — 인수 설명</div>
        <div class="fd-param-list">${paramHtml}</div>
      </div>
      ${tipHtml}
      <div class="fd-section">
        <div class="fd-section-title">EXAMPLES — 실전 예시</div>
        <div class="fd-examples">${exHtml}</div>
      </div>
    </div>`;
}

/* ═══════════════════════════════════
   문제 풀기
═══════════════════════════════════ */
function startGame(mode){
  setMode(mode);
  S.fi=0;S.pi=0;resetScores();
  buildProgress();showLesson();
}
function startBasicGame(){startGame('basic');}

function buildProgress(){
  const flat=flatProbs();const n=flat.length;
  ['progress-bar','progress-bar2'].forEach(id=>{
    const p=$(id);p.innerHTML='';
    for(let i=0;i<n;i++){
      const c=document.createElement('div');
      c.className='pcell'+(flat[i].lv?' adv-q':'');
      p.appendChild(c);
    }
  });
}
function updateProgress(){
  const n=totalProbs();
  ['progress-bar','progress-bar2'].forEach(id=>{
    const cells=$(id).children;
    for(let i=0;i<n;i++){
      cells[i].classList.toggle('done',S.scores[i]!==null);
      cells[i].classList.toggle('cur',i===gIdx()&&S.scores[i]===null);
    }
  });
  const p=curProb();
  const lbl=`${curFn().fn} · ${p.tag||(p.lv?'심화':'기초')}`;
  const idx=`문제 ${gIdx()+1}/${n}`;
  $('pm-left').textContent=idx;$('pm-right').textContent=lbl;
  $('pm-left2').textContent=idx;$('pm-right2').textContent=lbl;
}

function showLesson(){
  const f=curFn();
  const nb=f.problems.filter(p=>!p.lv).length, na=f.problems.length-nb;
  $('lesson-tag').textContent=`함수 ${S.fi+1}/${DECK.length} · 기초 ${nb} + 심화 ${na}`;
  $('lesson-fn').textContent=f.fn;
  $('lesson-title').textContent=f.title;
  $('lesson-oneline').textContent=f.oneline;
  $('lesson-desc').textContent=f.desc;
  $('lesson-exf').textContent=f.exF;
  $('lesson-exr').textContent=f.exR;
  updateProgress();
  showScreen('screen-lesson');
}
$('btn-lesson-next').addEventListener('click',()=>showProblem());

function makeSheetTable(sh){
  const t=document.createElement('table');t.className='sheet';
  let html='<tr><th></th>'+sh.head.map(h=>`<th>${h}</th>`).join('')+'</tr>';
  sh.rows.forEach((row,i)=>{
    html+=`<tr><td class="rowhead">${i+1}</td>`+row.map(v=>`<td class="${isNaN(v)?'txt':''}">${v}</td>`).join('')+'</tr>';
  });
  t.innerHTML=html;return t;
}
function renderSheet(){
  const sh=curFn().sheet;const box=$('prob-sheet');box.innerHTML='';
  box.appendChild(makeSheetTable(sh));
  if(sh.crit){
    const lbl=document.createElement('div');lbl.className='sheet-label';
    lbl.textContent=sh.crit.title||'조건';
    box.appendChild(lbl);
    box.appendChild(makeSheetTable(sh.crit));
  }
}
function renderAssembly(){
  const p=curProb();const a=$('assembly');a.innerHTML='';
  a.classList.remove('win','shake');
  /* typed 문제(tokens 없음)는 조립판을 숨김 */
  a.style.display=p.typed?'none':'';
  let si=0;
  (p.tokens||[]).forEach(tk=>{
    let el;
    if(tk.t==='slot'){
      el=document.createElement('button');
      el.className='slot';el.textContent='□';el.dataset.i=si++;
      el.addEventListener('click',onSlotClick);
    }else{
      el=document.createElement('span');
      el.className=tk.t==='fn'?'tok-fn':(tk.t==='lit'?'tok-lit':'tok');
      el.textContent=tk.v;
    }
    a.appendChild(el);
  });
}
function shuffleArr(arr){
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}
function renderPalette(){
  const p=curProb();const pal=$('palette');pal.innerHTML='';
  shuffleArr(p.blocks);
  p.blocks.forEach((b,i)=>{
    const el=document.createElement('button');
    el.className='block';el.textContent=b;el.dataset.i=i;
    el.addEventListener('click',onBlockClick);
    pal.appendChild(el);
  });
}
function showProblem(){
  const p=curProb();
  S.slots=new Array((p.tokens||[]).filter(t=>t.t==='slot').length).fill(null);
  S.wrongs=0;S.solved=false;S.revealed=false;S.locked=false;S.hintUsed=false;
  /* 해석 보기: 고급자 모드 + 문제에 hint가 있을 때만 표시 */
  const hintRow=$('hint-row'), hintBox=$('hint-box'), hintBtn=$('btn-hint');
  if((MODE==='adv'||MODE==='hacker') && p.hint){
    hintRow.style.display='block';
    hintBox.style.display='none';
    hintBox.textContent='';
    hintBtn.className='hint-btn';
    hintBtn.innerHTML='💡 해석 보기 <span class="hint-warn">(점수 0점)</span>';
    hintBtn.disabled=false;
  } else {
    hintRow.style.display='none';
  }
  /* 연습 모드: 점수(보너스) 표시 숨김 */
  $('prob-bonus').style.display=isPractice()?'none':'';
  /* 팁 보기: 연습문제 모드 + bigtip 있을 때만 표시 (점수 영향 없음) */
  const tipBtn=$('btn-tip'), tipBox=$('tip-box');
  if(isPractice() && p.bigtip){
    tipBtn.style.display='inline-block';
    tipBtn.className='tip-btn';
    tipBtn.textContent='💡 팁 보기';
    tipBox.style.display='none';
    tipBox.textContent='';
  } else {
    tipBtn.style.display='none';
    tipBox.style.display='none';
  }
  $('prob-lv-badge').className='lv-badge '+(p.lv?'adv':'basic');
  $('prob-q').textContent=p.q;
  renderSheet();renderAssembly();
  const isTyped=!!p.typed;
  $('palette-area').style.display=isTyped?'none':'block';
  $('typed-area').style.display=isTyped?'flex':'none';
  if(isTyped){
    $('typed-input').placeholder = MODE==='hacker'
      ? '> 수식을 직접 입력하세요 (= 부터 시작)_'
      : '수식을 직접 입력하세요 (= 부터)';
    $('typed-input').value='';
    setTimeout(()=>$('typed-input').focus(),100);
  }
  else renderPalette();
  $('result-cell').className='result-cell';
  $('result-formula').textContent='결과';
  $('result-val').textContent='= ?';
  $('feedback').textContent='';$('feedback').className='feedback';
  $('btn-check').style.display='inline-block';$('btn-check').disabled=false;$('btn-check').textContent='확인';
  $('btn-next').style.display='none';
  updateProgress();
  showScreen('screen-problem');
  S.t0=Date.now();
  clearInterval(S.timer);
  S.timer=setInterval(tick,250);tick();
}
function tick(){
  const sec=Math.floor((Date.now()-S.t0)/1000);
  $('prob-time').textContent=sec+'초';
  $('prob-bonus').textContent='보너스 +'+Math.max(0,100-sec*5);
}
function onBlockClick(e){
  if(S.solved||S.revealed)return;
  const bi=+e.currentTarget.dataset.i;
  const si=S.slots.indexOf(null);
  if(si===-1){flash('빈칸이 없어요 — 채운 칸을 눌러 빼세요','warn');return;}
  S.slots[si]=bi;
  e.currentTarget.classList.add('used');
  const slot=$('assembly').querySelectorAll('.slot')[si];
  slot.textContent=curProb().blocks[bi];
  slot.classList.remove('filled');void slot.offsetWidth;slot.classList.add('filled');
}
function onSlotClick(e){
  if(S.solved||S.revealed)return;
  const si=+e.currentTarget.dataset.i;
  const bi=S.slots[si];
  if(bi===null)return;
  S.slots[si]=null;
  e.currentTarget.textContent='□';
  e.currentTarget.classList.remove('filled');
  $('palette').querySelectorAll('.block')[bi].classList.remove('used');
}
function flash(msg,cls){const f=$('feedback');f.textContent=msg;f.className='feedback '+cls;}

function normTyped(s){
  return s.replace(/\s+/g,'').replace(/[\u201C\u201D\u2018\u2019]/g,'"').replace(/^=/,'').toUpperCase();
}
/* 해커모드용: = 유지, 공백 제거, 스마트따옴표 → ", 대문자화 (한글은 영향 없음) */
function normFormula(s){
  return s.replace(/[\u201C\u201D\u2018\u2019]/g,'"').replace(/\s+/g,'').toUpperCase();
}
$('btn-check').addEventListener('click',check);
$('typed-input').addEventListener('keydown',e=>{if(e.key==='Enter')check();});
function check(){
  if(S.solved||S.revealed||S.locked)return;
  const p=curProb();
  let correct;
  if(p.typed){
    const v=$('typed-input').value.trim();
    if(!v){flash('수식을 입력해주세요','warn');return;}
    /* answerPattern이 있으면 정규화 후 대조, 없으면 레거시 패턴 */
    if(p.answerPattern){
      correct=new RegExp(p.answerPattern).test(normFormula(v));
    } else {
      correct=/^VLOOKUP\("바나나",A1:B3,2(,FALSE|,0)?\)$/.test(normTyped(v));
    }
  }else{
    if(S.slots.includes(null)){flash('빈칸을 모두 채워주세요','warn');return;}
    const vals=S.slots.map(i=>p.blocks[i]);
    correct=p.ordered?vals.every((v,i)=>v===p.answer[i]):[...vals].sort().join('|')===[...p.answer].sort().join('|');
  }
  correct?solve():wrong();
}
function wrong(){
  S.wrongs++;
  const a=$('assembly');
  a.classList.remove('shake');void a.offsetWidth;a.classList.add('shake');
  if(S.wrongs>=3){reveal();return;}
  flash(isPractice()?`오답! 기회 ${3-S.wrongs}회 남음 — 팁 보기를 눌러보세요`:`오답! −30점 · 기회 ${3-S.wrongs}회 남음`,'bad');
  S.locked=true;
  const btn=$('btn-check');btn.disabled=true;
  let n=1.5;btn.textContent='잠금 1.5초';
  const iv=setInterval(()=>{
    n=+(n-.5).toFixed(1);
    if(n<=0){clearInterval(iv);btn.disabled=false;btn.textContent='확인';S.locked=false;}
    else btn.textContent=`잠금 ${n}초`;
  },500);
}
function reveal(){
  S.revealed=true;clearInterval(S.timer);
  const p=curProb();
  if(p.typed){$('typed-input').value=p.answerText;}
  else{
    $('assembly').querySelectorAll('.slot').forEach((el,i)=>{el.textContent=p.answer[i];el.className='slot revealed';});
    $('palette').querySelectorAll('.block').forEach(b=>b.classList.add('used'));
  }
  S.scores[gIdx()]=0;fillResult();
  flash(isPractice()?'3회 오답 — 정답을 공개했어요. 천천히 살펴보고 넘어가세요':'3회 오답 — 정답을 공개했어요. 이 문제는 0점이에요','bad');
  $('btn-check').style.display='none';$('btn-next').style.display='inline-block';
  updateProgress();
}
function solve(){
  S.solved=true;clearInterval(S.timer);
  const p=curProb();
  /* 연습 모드: 점수 없이 정답 처리만 */
  if(isPractice()){
    S.scores[gIdx()]=1;
    $('assembly').classList.add('win');
    $('palette').querySelectorAll('.block').forEach(b=>b.style.pointerEvents='none');
    fillResult();
    flash('정답이에요! 🎉','ok');
    $('btn-check').style.display='none';$('btn-next').style.display='inline-block';$('btn-next').focus();
    updateProgress();
    return;
  }
  const sec=Math.floor((Date.now()-S.t0)/1000);
  const base=p.lv?200:100;
  const bonus=Math.max(0,100-sec*5);
  const pen=S.wrongs*30;
  /* 해석을 봤으면 점수 0점 확정 */
  if(S.hintUsed){
    S.scores[gIdx()]=0;
    $('assembly').classList.add('win');
    $('palette').querySelectorAll('.block').forEach(b=>b.style.pointerEvents='none');
    fillResult();
    flash('정답! — 그러나 해석을 봤으므로 0점이에요','warn');
    floatScore('+0');
    $('btn-check').style.display='none';$('btn-next').style.display='inline-block';$('btn-next').focus();
    updateProgress();
    return;
  }
  const score=Math.max(0,base+bonus-pen);
  S.scores[gIdx()]=score;
  $('assembly').classList.add('win');
  $('palette').querySelectorAll('.block').forEach(b=>b.style.pointerEvents='none');
  fillResult();
  flash(`정답! 기본 ${base} + 보너스 ${bonus}${pen?` − 감점 ${pen}`:''} = +${score}점`,'ok');
  floatScore('+'+score);
  $('btn-check').style.display='none';$('btn-next').style.display='inline-block';$('btn-next').focus();
  updateProgress();
}
function showTip(){
  const p=curProb();
  if(!p.bigtip)return;
  const tipBox=$('tip-box'), tipBtn=$('btn-tip');
  tipBox.textContent=p.bigtip;
  tipBox.style.display='block';
  tipBtn.className='tip-btn used';
}
function showHint(){
  if(S.hintUsed||S.solved||S.revealed)return;
  const p=curProb();
  if(!p.hint)return;
  S.hintUsed=true;
  /* 즉시 0점 확정 */
  S.scores[gIdx()]=0;
  /* UI 업데이트 */
  const hintBox=$('hint-box'), hintBtn=$('btn-hint');
  hintBox.textContent=p.hint;
  hintBox.style.display='block';
  hintBtn.className='hint-btn used';
  hintBtn.innerHTML='💡 해석 확인됨 <span class="hint-warn">(0점 확정)</span>';
  hintBtn.disabled=true;
  flash('해석을 봤어요 — 이 문제는 0점이에요','bad');
  updateProgress();
}
function fillResult(){
  $('result-formula').textContent='fx';$('result-val').textContent='= '+curProb().result;
  $('result-cell').classList.add('solved');
}
function floatScore(txt){
  const card=document.querySelector('.prob-card');
  const btn=$('btn-next');
  const el=document.createElement('span');
  el.className='float-score';el.textContent=txt;
  el.style.left=(btn.offsetLeft+80)+'px';el.style.top=(btn.offsetTop-4)+'px';
  card.appendChild(el);setTimeout(()=>el.remove(),1100);
}
$('btn-next').addEventListener('click',()=>{
  S.pi++;
  if(S.pi>=DECK[S.fi].problems.length){S.pi=0;S.fi++;if(S.fi>=DECK.length){showEnd();return;}showLesson();}
  else showProblem();
});

/* ─── 포기 ─── */
function showGiveUp(){$('give-up-overlay').classList.add('on');}
function closeGiveUp(){$('give-up-overlay').classList.remove('on');}
function confirmGiveUp(){
  clearInterval(S.timer);$('give-up-overlay').classList.remove('on');
  resetScores();showScreen(mainScreen());
}
$('give-up-overlay').addEventListener('click',e=>{if(e.target===$('give-up-overlay'))closeGiveUp();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeGiveUp();});

/* ─── 종료 ─── */
function showEnd(){
  const total=totalScore();
  $('end-name-lbl').textContent=S.name;
  $('btn-to-main').textContent=((MODE==='inter'||MODE==='pinter')?'중급':MODE==='adv'?'고급':MODE==='hacker'?'해커':'초급')+' 메뉴로';
  /* 연습 모드: 점수·기록 없이 완주 축하만 */
  const prac=isPractice();
  document.querySelector('.end-score').style.display=prac?'none':'';
  document.querySelector('.breakdown').style.display=prac?'none':'';
  document.querySelector('.rec-box').style.display=prac?'none':'';
  if(prac){
    const msg=$('rec-msg');
    msg.textContent='연습 완주! 점수 부담 없이 잘 풀었어요 🎉 이제 문제 풀기에 도전해보세요';
    msg.className='rec-msg new';
    showScreen('screen-end');
    confetti();
    return;
  }
  const rec=getRecords();const prev=rec[S.name];const msg=$('rec-msg');
  if(prev===undefined||total>prev){
    rec[S.name]=total;saveRecords(rec);
    msg.textContent=prev===undefined?'첫 기록이 저장됐어요!':`기록 갱신! (이전 최고 ${prev.toLocaleString()}점)`;
    msg.className='rec-msg new';
  }else{
    msg.textContent=`아쉽지만 기존 최고 ${prev.toLocaleString()}점이 더 높아요`;
    msg.className='rec-msg old';
  }
  submitScore(S.name,MODE,total);
  const bd=$('breakdown');bd.innerHTML='';
  DECK.forEach((f,i)=>{
    const off=probOffset(i), n=f.problems.length;
    const pts=S.scores.slice(off,off+n).reduce((a,b)=>a+(b||0),0);
    const maxPts=f.problems.reduce((a,p)=>a+(p.lv?300:200),0);
    const w=maxPts?Math.round(pts/maxPts*100):0;
    const row=document.createElement('div');row.className='bd-row';
    row.innerHTML=`<span class="bd-fn">${f.fn}</span><span class="bd-bar"><i data-w="${w}"></i></span><span class="bd-pts">${pts.toLocaleString()}</span>`;
    bd.appendChild(row);
  });
  const rt=$('rec-table');
  const list=Object.entries(getRecords()).sort((a,b)=>b[1]-a[1]).slice(0,5);
  rt.innerHTML=list.map((r,i)=>`<tr class="${r[0]===S.name?'me':''}"><td>${i+1}</td><td>${r[0]}</td><td>${r[1].toLocaleString()}점</td></tr>`).join('');
  showScreen('screen-end');
  let cur=0;const step=Math.max(1,Math.round(total/40));
  const iv=setInterval(()=>{cur=Math.min(total,cur+step);$('end-score-v').textContent=cur.toLocaleString();if(cur>=total)clearInterval(iv);},25);
  setTimeout(()=>{bd.querySelectorAll('.bd-bar i').forEach(b=>b.style.width=b.dataset.w+'%');},300);
  confetti();
}
$('btn-retry').addEventListener('click',()=>{S.fi=0;S.pi=0;resetScores();buildProgress();showLesson();});
$('btn-to-main').addEventListener('click',()=>showScreen(mainScreen()));
$('btn-to-home').addEventListener('click',goHome);

function confetti(){
  if(window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  const colors=['#84CC16','#A3E635','#141414','#3F6212','#EDEDEA'];
  for(let i=0;i<60;i++){
    const c=document.createElement('div');c.className='confetti';
    c.style.left=Math.random()*100+'vw';
    c.style.background=colors[i%colors.length];
    c.style.animationDuration=(2.2+Math.random()*2)+'s';
    c.style.animationDelay=(Math.random()*.8)+'s';
    c.style.transform=`rotate(${Math.random()*360}deg)`;
    document.body.appendChild(c);setTimeout(()=>c.remove(),5200);
  }
}
$('nickname').addEventListener('keydown',e=>{if(e.key==='Enter')document.querySelector('.lvl-btn.basic').focus();});
