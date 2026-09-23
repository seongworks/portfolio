/* ═══════════════════════════════════
   데이터
═══════════════════════════════════ */
const FUNCS = [
{
  fn:'ROUND', title:'— 반올림 기계', oneline:'숫자를 원하는 자리에서 반올림합니다.',
  desc:'ROUND(숫자, 자릿수) — 숫자를 지정한 소수 자릿수에서 반올림해요. 자릿수 2는 소수 둘째 자리까지, 0은 정수로, 1은 소수 첫째 자리까지 남깁니다.',
  exF:'=ROUND(A1, 1)', exR:'→ A1이 3.14159면 3.1',
  sheet:{head:['A'],rows:[['3.14159']]},
  learn:{
    oneline:'숫자를 지정한 소수 자릿수에서 반올림합니다.',
    desc:'ROUND는 지저분한 소수를 깔끔하게 정리해주는 함수예요. 첫 번째 자리에 반올림할 숫자, 두 번째 자리에 남길 소수 자릿수를 넣습니다. 자릿수가 0이면 정수로, 1이면 소수 첫째 자리까지, 2면 소수 둘째 자리까지 남아요. 평균값이나 금액을 보기 좋게 다듬을 때 자주 씁니다.',
    syntax:'=ROUND( 숫자, 자릿수 )',
    params:[
      {name:'숫자', desc:'반올림할 숫자 또는 셀 주소 (예: A1, 3.14159)'},
      {name:'자릿수', desc:'남길 소수 자릿수. 0=정수, 1=소수 첫째 자리, 2=소수 둘째 자리'},
    ],
    examples:[
      {formula:'=ROUND(A1, 1)', result:'→ 3.1', comment:'A1(3.14159)을 소수 첫째 자리까지 반올림.'},
      {formula:'=ROUND(A1, 2)', result:'→ 3.14', comment:'소수 둘째 자리까지 남깁니다.'},
      {formula:'=ROUND(A1, 0)', result:'→ 3', comment:'자릿수 0이면 정수로 반올림합니다.'},
    ]
  },
  problems:[
    {lv:0,q:'A1(3.14159)을 반올림하려 합니다. 알맞은 함수 블록을 넣으세요.',
     tokens:[{t:'txt',v:'='},{t:'slot'},{t:'txt',v:'('},{t:'lit',v:'A1'},{t:'txt',v:','},{t:'lit',v:'1'},{t:'txt',v:')'}],
     blocks:['ROUND','AVERAGE','LEFT','MID'],answer:['ROUND'],ordered:true,result:'3.1'},
    {lv:0,q:'A1을 소수 첫째 자리까지(3.1) 남기려 합니다. 자릿수 자리에 알맞은 블록은?',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'ROUND'},{t:'txt',v:'('},{t:'lit',v:'A1'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['1','0','2','3'],answer:['1'],ordered:true,result:'3.1'},
    {lv:1,q:'A1을 정수로 반올림하세요(3). 자릿수 자리에 알맞은 블록을 넣으세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'ROUND'},{t:'txt',v:'('},{t:'lit',v:'A1'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['0','1','2','3'],answer:['0'],ordered:true,result:'3'},
    {lv:1,q:'A1을 소수 둘째 자리까지(3.14) 반올림하세요. 숫자와 자릿수, 두 칸을 순서대로 채우세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'ROUND'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['A1','2','A2','1'],answer:['A1','2'],ordered:true,result:'3.14'}
  ]
},
{
  fn:'AVERAGE', title:'— 평균 기계', oneline:'값들을 전부 더한 뒤 개수로 나눠 평균을 냅니다.',
  desc:'SUM과 사용법이 똑같아요. 낱개 셀을 쉼표로 넣거나, B1:B4 같은 범위를 넣으면 그 안의 숫자들의 평균값이 나옵니다.',
  exF:'=AVERAGE(B1, B2)  ·  =AVERAGE(B1:B4)', exR:'→ 두 점수의 평균  ·  네 점수 전체의 평균',
  sheet:{head:['B'],rows:[['80'],['90'],['70'],['100']]},
  learn:{
    oneline:'선택한 숫자들의 평균(산술 평균)을 구합니다.',
    desc:'AVERAGE는 합계를 개수로 나눈 값을 돌려줍니다. 학교 성적 평균, 월별 매출 평균 등 실무에서 정말 자주 쓰이는 함수예요. 빈 셀과 텍스트는 자동으로 무시합니다.',
    syntax:'=AVERAGE( 값1, 값2, ... )',
    params:[
      {name:'값1', desc:'평균을 낼 첫 번째 숫자 또는 셀 주소'},
      {name:'값2, ...', desc:'추가로 포함할 숫자나 범위. 빈 셀은 계산에서 제외됩니다.'},
    ],
    examples:[
      {formula:'=AVERAGE(B1, B2)', result:'→ (80 + 90) ÷ 2 = 85', comment:'낱개 두 셀의 평균입니다.'},
      {formula:'=AVERAGE(B1:B4)', result:'→ (80+90+70+100) ÷ 4 = 85', comment:'범위 전체의 평균입니다.'},
      {formula:'=AVERAGE(B1:B3)', result:'→ (80+90+70) ÷ 3 = 80', comment:'일부 범위만 평균 낼 수 있습니다.'},
    ]
  },
  problems:[
    {lv:0,q:'B1과 B2 점수의 평균을 구하세요. 두 칸을 채워주세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'AVERAGE'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['B1','B2','B3','A1'],answer:['B1','B2'],ordered:false,result:'85'},
    {lv:0,q:'평균을 구하는 함수를 골라, B1~B4 전체의 평균을 구하세요.',
     tokens:[{t:'txt',v:'='},{t:'slot'},{t:'txt',v:'('},{t:'lit',v:'B1:B4'},{t:'txt',v:')'}],
     blocks:['AVERAGE','ROUND','LEFT','RIGHT'],answer:['AVERAGE'],ordered:true,result:'85'},
    {lv:1,q:'B1부터 B4까지 네 점수 전체의 평균을 구하세요. (범위 블록을 사용하세요)',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'AVERAGE'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:')'}],
     blocks:['B1:B4','B1:B3','B2:B4','A1:A4'],answer:['B1:B4'],ordered:true,result:'85'},
    {lv:1,q:'B1부터 B3까지, 세 점수만의 평균을 구하세요. (B4는 제외)',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'AVERAGE'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:')'}],
     blocks:['B1:B3','B1:B4','B2:B4','B1'],answer:['B1:B3'],ordered:true,result:'80'}
  ]
},
{
  fn:'LEFT', title:'— 왼쪽 가위 기계', oneline:'글자를 왼쪽에서부터 원하는 개수만큼 잘라옵니다.',
  desc:'LEFT(글자, 개수) — 글자의 맨 왼쪽부터 지정한 개수만큼 잘라와요. "대한민국"에서 왼쪽 2글자를 자르면 "대한"이 됩니다.',
  exF:'=LEFT(C1, 2)', exR:'→ C1이 "대한민국"이면 "대한"',
  sheet:{head:['C'],rows:[['대한민국']]},
  learn:{
    oneline:'글자의 왼쪽에서부터 지정한 개수만큼 잘라서 가져옵니다.',
    desc:'LEFT는 텍스트를 왼쪽 끝에서부터 잘라내는 함수예요. 첫 번째 자리에 자를 글자(또는 셀), 두 번째 자리에 몇 글자를 가져올지 개수를 넣습니다. 예를 들어 전화번호 앞자리, 이름의 성(姓)만 뽑아낼 때 유용해요.',
    syntax:'=LEFT( 글자, 개수 )',
    params:[
      {name:'글자', desc:'자를 대상 텍스트 또는 셀 주소 (예: C1, "안녕하세요")'},
      {name:'개수', desc:'왼쪽에서부터 가져올 글자 수 (예: 2)'},
    ],
    examples:[
      {formula:'=LEFT(C1, 2)', result:'→ "대한"', comment:'C1("대한민국")의 왼쪽 2글자를 가져옵니다.'},
      {formula:'=LEFT(C1, 1)', result:'→ "대"', comment:'왼쪽 1글자만 가져옵니다.'},
      {formula:'=LEFT("2026년", 4)', result:'→ "2026"', comment:'글자를 직접 넣어 앞 4자를 자를 수도 있어요.'},
    ]
  },
  problems:[
    {lv:0,q:'C1("대한민국")의 왼쪽 글자를 자르려 합니다. 알맞은 함수 블록을 넣으세요.',
     tokens:[{t:'txt',v:'='},{t:'slot'},{t:'txt',v:'('},{t:'lit',v:'C1'},{t:'txt',v:','},{t:'lit',v:'2'},{t:'txt',v:')'}],
     blocks:['LEFT','RIGHT','MID','ROUND'],answer:['LEFT'],ordered:true,result:'"대한"'},
    {lv:0,q:'C1에서 왼쪽 2글자("대한")를 가져오려 합니다. 개수 자리에 알맞은 블록은?',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'LEFT'},{t:'txt',v:'('},{t:'lit',v:'C1'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['2','1','3','4'],answer:['2'],ordered:true,result:'"대한"'},
    {lv:1,q:'C1에서 왼쪽 1글자("대")만 가져오세요. 대상과 개수, 두 칸을 순서대로 채우세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'LEFT'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['C1','1','C2','2'],answer:['C1','1'],ordered:true,result:'"대"'},
    {lv:1,q:'C1에서 왼쪽 3글자("대한민")를 가져오세요. 두 칸을 순서대로 채우세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'LEFT'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['C1','3','C1','2'],answer:['C1','3'],ordered:true,result:'"대한민"'}
  ]
},
{
  fn:'RIGHT', title:'— 오른쪽 가위 기계', oneline:'글자를 오른쪽에서부터 원하는 개수만큼 잘라옵니다.',
  desc:'RIGHT(글자, 개수) — LEFT의 거울 버전이에요. 글자의 맨 오른쪽부터 지정한 개수만큼 잘라옵니다. "대한민국"에서 오른쪽 2글자를 자르면 "민국"이 됩니다.',
  exF:'=RIGHT(C1, 2)', exR:'→ C1이 "대한민국"이면 "민국"',
  sheet:{head:['C'],rows:[['대한민국']]},
  learn:{
    oneline:'글자의 오른쪽에서부터 지정한 개수만큼 잘라서 가져옵니다.',
    desc:'RIGHT는 LEFT와 사용법이 똑같고 방향만 반대예요. 오른쪽 끝에서부터 글자를 잘라냅니다. 파일 확장자, 전화번호 뒷자리, 주민번호 뒷부분 등을 뽑을 때 자주 씁니다. LEFT를 배웠다면 RIGHT는 거의 공짜로 익힐 수 있어요.',
    syntax:'=RIGHT( 글자, 개수 )',
    params:[
      {name:'글자', desc:'자를 대상 텍스트 또는 셀 주소 (예: C1)'},
      {name:'개수', desc:'오른쪽에서부터 가져올 글자 수 (예: 2)'},
    ],
    examples:[
      {formula:'=RIGHT(C1, 2)', result:'→ "민국"', comment:'C1("대한민국")의 오른쪽 2글자를 가져옵니다.'},
      {formula:'=RIGHT(C1, 1)', result:'→ "국"', comment:'오른쪽 1글자만 가져옵니다.'},
      {formula:'=RIGHT("010-1234", 4)', result:'→ "1234"', comment:'전화번호 뒷 4자리를 뽑을 수 있어요.'},
    ]
  },
  problems:[
    {lv:0,q:'C1("대한민국")의 오른쪽 글자를 자르려 합니다. 알맞은 함수 블록을 넣으세요.',
     tokens:[{t:'txt',v:'='},{t:'slot'},{t:'txt',v:'('},{t:'lit',v:'C1'},{t:'txt',v:','},{t:'lit',v:'2'},{t:'txt',v:')'}],
     blocks:['RIGHT','LEFT','MID','AVERAGE'],answer:['RIGHT'],ordered:true,result:'"민국"'},
    {lv:0,q:'C1에서 오른쪽 2글자("민국")를 가져오려 합니다. 개수 자리에 알맞은 블록은?',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'RIGHT'},{t:'txt',v:'('},{t:'lit',v:'C1'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['2','1','3','4'],answer:['2'],ordered:true,result:'"민국"'},
    {lv:1,q:'C1에서 오른쪽 1글자("국")만 가져오세요. 대상과 개수, 두 칸을 순서대로 채우세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'RIGHT'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['C1','1','C2','2'],answer:['C1','1'],ordered:true,result:'"국"'},
    {lv:1,q:'C1에서 오른쪽 3글자("한민국")를 가져오세요. 두 칸을 순서대로 채우세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'RIGHT'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['C1','3','C1','2'],answer:['C1','3'],ordered:true,result:'"한민국"'}
  ]
},
{
  fn:'MID', title:'— 가운데 가위 기계', oneline:'글자의 중간에서 원하는 위치부터 몇 글자를 잘라옵니다.',
  desc:'MID(글자, 시작위치, 개수) — 시작 위치부터 지정한 개수만큼 잘라와요. "대한민국"에서 3번째부터 2글자를 자르면 "민국"이 됩니다.',
  exF:'=MID(C1, 2, 2)', exR:'→ C1이 "대한민국"이면 "한민"',
  sheet:{head:['C'],rows:[['대한민국']]},
  learn:{
    oneline:'글자의 지정한 위치부터 원하는 개수만큼 잘라서 가져옵니다.',
    desc:'MID는 글자의 가운데 부분을 잘라내는 함수예요. LEFT·RIGHT와 달리 "몇 번째 글자부터" 시작할지를 정할 수 있습니다. 첫 번째 자리에 대상 글자, 두 번째에 시작 위치(맨 앞이 1), 세 번째에 가져올 개수를 넣어요. 주민번호 가운데 부분, 상품코드 중간 자리를 뽑을 때 유용합니다.',
    syntax:'=MID( 글자, 시작위치, 개수 )',
    params:[
      {name:'글자', desc:'자를 대상 텍스트 또는 셀 주소 (예: C1)'},
      {name:'시작위치', desc:'몇 번째 글자부터 가져올지 (맨 앞 글자가 1)'},
      {name:'개수', desc:'시작 위치부터 가져올 글자 수 (예: 2)'},
    ],
    examples:[
      {formula:'=MID(C1, 2, 2)', result:'→ "한민"', comment:'2번째 글자부터 2글자를 가져옵니다.'},
      {formula:'=MID(C1, 3, 2)', result:'→ "민국"', comment:'3번째 글자부터 2글자를 가져옵니다.'},
      {formula:'=MID(C1, 1, 2)', result:'→ "대한"', comment:'1번째부터 2글자면 LEFT와 같은 결과예요.'},
    ]
  },
  problems:[
    {lv:0,q:'C1("대한민국")의 가운데 글자를 자르려 합니다. 알맞은 함수 블록을 넣으세요.',
     tokens:[{t:'txt',v:'='},{t:'slot'},{t:'txt',v:'('},{t:'lit',v:'C1'},{t:'txt',v:','},{t:'lit',v:'2'},{t:'txt',v:','},{t:'lit',v:'2'},{t:'txt',v:')'}],
     blocks:['MID','LEFT','RIGHT','ROUND'],answer:['MID'],ordered:true,result:'"한민"'},
    {lv:0,q:'C1의 2번째 글자부터 2글자("한민")를 가져오려 합니다. 시작 위치 자리에 알맞은 블록은?',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'MID'},{t:'txt',v:'('},{t:'lit',v:'C1'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:','},{t:'lit',v:'2'},{t:'txt',v:')'}],
     blocks:['2','1','3','4'],answer:['2'],ordered:true,result:'"한민"'},
    {lv:1,q:'C1의 3번째 글자부터 2글자("민국")를 가져오세요. 시작 위치 자리에 알맞은 블록은?',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'MID'},{t:'txt',v:'('},{t:'lit',v:'C1'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:','},{t:'lit',v:'2'},{t:'txt',v:')'}],
     blocks:['3','2','1','4'],answer:['3'],ordered:true,result:'"민국"'},
    {lv:1,q:'C1의 2번째 글자부터 2글자를 가져오세요. 시작 위치와 개수, 두 칸을 순서대로 채우세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'MID'},{t:'txt',v:'('},{t:'lit',v:'C1'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['2','2','3','1'],answer:['2','2'],ordered:true,result:'"한민"'}
  ]
}
];

const FUNCS_PRACTICE = [
{
  fn:'ROUND', title:'— 반올림 기계 (연습)', oneline:'숫자를 원하는 자리에서 반올림합니다.',
  desc:'ROUND(숫자, 자릿수). 자릿수 1=소수 첫째, 0=정수, 2=소수 둘째.',
  exF:'=ROUND(A1, 1)', exR:'→ A1이 2.71828이면 2.7',
  sheet:{head:['A'],rows:[['2.71828']]},
  learn:{oneline:'',desc:'',syntax:'',params:[],examples:[]},
  problems:[
    {lv:0,q:'A1(2.71828)을 반올림하려 합니다. 알맞은 함수 블록을 넣으세요.',
     tokens:[{t:'txt',v:'='},{t:'slot'},{t:'txt',v:'('},{t:'lit',v:'A1'},{t:'txt',v:','},{t:'lit',v:'1'},{t:'txt',v:')'}],
     blocks:['ROUND','AVERAGE','LEFT','MID'],answer:['ROUND'],ordered:true,result:'2.7',
     bigtip:'반올림은 ROUND 함수예요. 형태는 =ROUND(숫자, 자릿수). 지금은 A1을 소수 첫째 자리(자릿수 1)로 반올림하는 거라 2.71828 → 2.7 이 됩니다.'},
    {lv:0,q:'A1을 소수 첫째 자리까지(2.7) 남기려 합니다. 자릿수 자리에 알맞은 블록은?',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'ROUND'},{t:'txt',v:'('},{t:'lit',v:'A1'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['1','0','2','3'],answer:['1'],ordered:true,result:'2.7',
     bigtip:'자릿수가 곧 "남길 소수 자리 수"예요. 1이면 소수 첫째 자리까지(2.7), 0이면 정수(3), 2이면 소수 둘째(2.72). "첫째 자리"니까 1을 넣습니다.'},
    {lv:1,q:'A1을 정수로 반올림하세요(3). 자릿수 자리에 알맞은 블록을 넣으세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'ROUND'},{t:'txt',v:'('},{t:'lit',v:'A1'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['0','1','2','3'],answer:['0'],ordered:true,result:'3',
     bigtip:'정수로 만들려면 소수 자리를 0개 남기면 되니 자릿수 0. 2.71828은 소수 첫째가 7(5 이상)이라 올림돼서 3이 됩니다.'},
    {lv:1,q:'A1을 소수 둘째 자리까지(2.72) 반올림하세요. 숫자와 자릿수, 두 칸을 순서대로 채우세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'ROUND'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['A1','2','A2','1'],answer:['A1','2'],ordered:true,result:'2.72',
     bigtip:'첫 칸은 반올림할 셀 A1, 둘째 칸은 자릿수. "소수 둘째 자리까지"니까 2. 2.71828 → 셋째 자리 8이 올림되어 2.72.'}
  ]
},
{
  fn:'AVERAGE', title:'— 평균 기계 (연습)', oneline:'값들을 더한 뒤 개수로 나눠 평균을 냅니다.',
  desc:'낱개 셀을 쉼표로 넣거나 B1:B4 같은 범위를 넣습니다.',
  exF:'=AVERAGE(B1, B2)  ·  =AVERAGE(B1:B4)', exR:'→ 두 값 평균 · 네 값 평균',
  sheet:{head:['B'],rows:[['60'],['80'],['100'],['60']]},
  learn:{oneline:'',desc:'',syntax:'',params:[],examples:[]},
  problems:[
    {lv:0,q:'B1과 B2 점수의 평균을 구하세요. 두 칸을 채워주세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'AVERAGE'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['B1','B2','B3','A1'],answer:['B1','B2'],ordered:false,result:'70',
     bigtip:'낱개 셀은 쉼표로 나열해요: =AVERAGE(B1, B2). B1(60)과 B2(80)의 평균은 (60+80)÷2 = 70. 순서는 상관없어요.'},
    {lv:0,q:'평균을 구하는 함수를 골라, B1~B4 전체의 평균을 구하세요.',
     tokens:[{t:'txt',v:'='},{t:'slot'},{t:'txt',v:'('},{t:'lit',v:'B1:B4'},{t:'txt',v:')'}],
     blocks:['AVERAGE','ROUND','MID','RIGHT'],answer:['AVERAGE'],ordered:true,result:'75',
     bigtip:'평균은 AVERAGE예요. 범위 B1:B4 전체의 평균은 (60+80+100+60)÷4 = 75.'},
    {lv:1,q:'B1부터 B4까지 네 값 전체의 평균을 구하세요. (범위 블록을 사용하세요)',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'AVERAGE'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:')'}],
     blocks:['B1:B4','B1:B3','B2:B4','A1:A4'],answer:['B1:B4'],ordered:true,result:'75',
     bigtip:'연속된 셀은 콜론(:)으로 범위를 지정해요. B1부터 B4까지 전부니까 B1:B4. 평균은 75.'},
    {lv:1,q:'B1부터 B3까지, 세 값만의 평균을 구하세요. (B4는 제외)',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'AVERAGE'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:')'}],
     blocks:['B1:B3','B1:B4','B2:B4','B1'],answer:['B1:B3'],ordered:true,result:'80',
     bigtip:'B4를 빼려면 범위를 B1:B3으로 끊어요. (60+80+100)÷3 = 80. 끝 셀 번호가 3이라는 점만 주의하면 됩니다.'}
  ]
},
{
  fn:'LEFT', title:'— 왼쪽 가위 기계 (연습)', oneline:'글자를 왼쪽에서부터 잘라옵니다.',
  desc:'LEFT(글자, 개수). "서울특별시"에서 왼쪽 2글자 → "서울".',
  exF:'=LEFT(C1, 2)', exR:'→ C1이 "서울특별시"면 "서울"',
  sheet:{head:['C'],rows:[['서울특별시']]},
  learn:{oneline:'',desc:'',syntax:'',params:[],examples:[]},
  problems:[
    {lv:0,q:'C1("서울특별시")의 왼쪽 글자를 자르려 합니다. 알맞은 함수 블록을 넣으세요.',
     tokens:[{t:'txt',v:'='},{t:'slot'},{t:'txt',v:'('},{t:'lit',v:'C1'},{t:'txt',v:','},{t:'lit',v:'2'},{t:'txt',v:')'}],
     blocks:['LEFT','RIGHT','MID','ROUND'],answer:['LEFT'],ordered:true,result:'"서울"',
     bigtip:'왼쪽에서 자르는 건 LEFT예요. =LEFT(C1, 2)는 "서울특별시"의 앞 2글자 "서울"을 가져옵니다.'},
    {lv:0,q:'C1에서 왼쪽 2글자("서울")를 가져오려 합니다. 개수 자리에 알맞은 블록은?',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'LEFT'},{t:'txt',v:'('},{t:'lit',v:'C1'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['2','1','3','4'],answer:['2'],ordered:true,result:'"서울"',
     bigtip:'두 번째 인수는 "가져올 글자 수"예요. "서울"은 2글자니까 2. 앞에서부터 서(1)·울(2) 이렇게 셉니다.'},
    {lv:1,q:'C1에서 왼쪽 1글자("서")만 가져오세요. 대상과 개수, 두 칸을 순서대로 채우세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'LEFT'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['C1','1','C2','2'],answer:['C1','1'],ordered:true,result:'"서"',
     bigtip:'첫 칸은 자를 대상 셀 C1, 둘째 칸은 개수. 1글자만 원하니 1. 결과는 "서".'},
    {lv:1,q:'C1에서 왼쪽 3글자("서울특")를 가져오세요. 두 칸을 순서대로 채우세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'LEFT'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['C1','3','C1','2'],answer:['C1','3'],ordered:true,result:'"서울특"',
     bigtip:'대상은 C1, 개수는 3. "서울특"은 서(1)·울(2)·특(3) 세 글자라서 개수에 3을 넣습니다.'}
  ]
},
{
  fn:'RIGHT', title:'— 오른쪽 가위 기계 (연습)', oneline:'글자를 오른쪽에서부터 잘라옵니다.',
  desc:'RIGHT(글자, 개수). "서울특별시"에서 오른쪽 2글자 → "별시".',
  exF:'=RIGHT(C1, 2)', exR:'→ C1이 "서울특별시"면 "별시"',
  sheet:{head:['C'],rows:[['서울특별시']]},
  learn:{oneline:'',desc:'',syntax:'',params:[],examples:[]},
  problems:[
    {lv:0,q:'C1("서울특별시")의 오른쪽 글자를 자르려 합니다. 알맞은 함수 블록을 넣으세요.',
     tokens:[{t:'txt',v:'='},{t:'slot'},{t:'txt',v:'('},{t:'lit',v:'C1'},{t:'txt',v:','},{t:'lit',v:'2'},{t:'txt',v:')'}],
     blocks:['RIGHT','LEFT','MID','AVERAGE'],answer:['RIGHT'],ordered:true,result:'"별시"',
     bigtip:'오른쪽에서 자르는 건 RIGHT예요. =RIGHT(C1, 2)는 "서울특별시"의 뒤 2글자 "별시"를 가져옵니다.'},
    {lv:0,q:'C1에서 오른쪽 2글자("별시")를 가져오려 합니다. 개수 자리에 알맞은 블록은?',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'RIGHT'},{t:'txt',v:'('},{t:'lit',v:'C1'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['2','1','3','4'],answer:['2'],ordered:true,result:'"별시"',
     bigtip:'뒤에서부터 셀 글자 수예요. "별시"는 2글자니까 2. 뒤에서 시·별 순으로 2글자를 떼면 "별시".'},
    {lv:1,q:'C1에서 오른쪽 1글자("시")만 가져오세요. 대상과 개수, 두 칸을 순서대로 채우세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'RIGHT'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['C1','1','C2','2'],answer:['C1','1'],ordered:true,result:'"시"',
     bigtip:'대상 C1, 개수 1. 맨 뒤 1글자만 떼면 "시"가 나와요.'},
    {lv:1,q:'C1에서 오른쪽 3글자("특별시")를 가져오세요. 두 칸을 순서대로 채우세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'RIGHT'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['C1','3','C1','2'],answer:['C1','3'],ordered:true,result:'"특별시"',
     bigtip:'대상 C1, 개수 3. 뒤에서 시·별·특 세 글자를 떼면 "특별시"가 됩니다.'}
  ]
},
{
  fn:'MID', title:'— 가운데 가위 기계 (연습)', oneline:'글자의 원하는 위치부터 잘라옵니다.',
  desc:'MID(글자, 시작위치, 개수). "서울특별시"의 2번째부터 2글자 → "울특".',
  exF:'=MID(C1, 2, 2)', exR:'→ C1이 "서울특별시"면 "울특"',
  sheet:{head:['C'],rows:[['서울특별시']]},
  learn:{oneline:'',desc:'',syntax:'',params:[],examples:[]},
  problems:[
    {lv:0,q:'C1("서울특별시")의 가운데 글자를 자르려 합니다. 알맞은 함수 블록을 넣으세요.',
     tokens:[{t:'txt',v:'='},{t:'slot'},{t:'txt',v:'('},{t:'lit',v:'C1'},{t:'txt',v:','},{t:'lit',v:'2'},{t:'txt',v:','},{t:'lit',v:'2'},{t:'txt',v:')'}],
     blocks:['MID','LEFT','RIGHT','ROUND'],answer:['MID'],ordered:true,result:'"울특"',
     bigtip:'가운데를 자르는 건 MID예요. =MID(C1, 2, 2)는 "2번째 글자부터 2글자"라는 뜻으로 "울특"을 가져옵니다.'},
    {lv:0,q:'C1의 2번째 글자부터 2글자("울특")를 가져오려 합니다. 시작 위치 자리에 알맞은 블록은?',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'MID'},{t:'txt',v:'('},{t:'lit',v:'C1'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:','},{t:'lit',v:'2'},{t:'txt',v:')'}],
     blocks:['2','1','3','4'],answer:['2'],ordered:true,result:'"울특"',
     bigtip:'MID의 두 번째 인수는 "몇 번째 글자부터"예요. 서(1)·울(2)이니 "울"부터 시작하려면 2. 거기서 2글자면 "울특".'},
    {lv:1,q:'C1의 3번째 글자부터 2글자("특별")를 가져오세요. 시작 위치 자리에 알맞은 블록은?',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'MID'},{t:'txt',v:'('},{t:'lit',v:'C1'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:','},{t:'lit',v:'2'},{t:'txt',v:')'}],
     blocks:['3','2','1','4'],answer:['3'],ordered:true,result:'"특별"',
     bigtip:'서(1)·울(2)·특(3)이니 "특"부터 시작하려면 시작 위치 3. 거기서 2글자를 가져오면 "특별".'},
    {lv:1,q:'C1의 2번째 글자부터 2글자를 가져오세요. 시작 위치와 개수, 두 칸을 순서대로 채우세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'MID'},{t:'txt',v:'('},{t:'lit',v:'C1'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['2','2','3','1'],answer:['2','2'],ordered:true,result:'"울특"',
     bigtip:'첫 칸=시작 위치 2("울"부터), 둘째 칸=개수 2. 두 값이 모두 2라 헷갈리기 쉬워요. 결과는 "울특".'}
  ]
}
];

const FUNCS_PRACTICE_INTER = [
{
  fn:'VLOOKUP', title:'— 사서 기계 (연습)', oneline:'표에서 원하는 값을 찾아옵니다.',
  desc:'VLOOKUP(찾을 값, 표 범위, 열 번호). 열 번호는 표 안에서 1부터.',
  exF:'=VLOOKUP("우유", A1:C5, 3)', exR:'→ 우유 행의 3번째 열(가격) 1200',
  sheet:{head:['A','B','C'],rows:[['연필','문구','500'],['우유','식품','1200'],['지우개','문구','300'],['라면','식품','900'],['공책','문구','1000']]},
  learn:{oneline:'',desc:'',syntax:'',params:[],examples:[]},
  problems:[
    {lv:0,q:'우유의 "가격"을 찾으려 합니다. 가격은 몇 번째 열일까요? (이름=1, 분류=2, 가격=3) 열 번호 블록을 넣으세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'VLOOKUP'},{t:'txt',v:'('},{t:'lit',v:'"우유"'},{t:'txt',v:','},{t:'lit',v:'A1:C5'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['3','2','1','5'],answer:['3'],ordered:true,result:'1200',
     bigtip:'열 번호는 표 범위 안에서 왼쪽부터 1, 2, 3…으로 세요. A열(이름)=1, B열(분류)=2, C열(가격)=3. 가격을 원하니 3을 넣으면 우유 행의 1200이 나옵니다.'},
    {lv:0,q:'라면의 "분류"를 찾으려 합니다. 분류는 몇 번째 열일까요? 열 번호 블록을 넣으세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'VLOOKUP'},{t:'txt',v:'('},{t:'lit',v:'"라면"'},{t:'txt',v:','},{t:'lit',v:'A1:C5'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['2','3','1','900'],answer:['2'],ordered:true,result:'"식품"',
     bigtip:'같은 행이라도 열 번호에 따라 다른 값이 나와요. 분류는 B열이니 2. 라면 행의 2번째 열 "식품"이 답이에요. 900은 열 번호가 아니라 가격 값이니 함정!'},
    {lv:1,q:'지우개의 가격을 찾습니다. "찾을 값" 자리에는 무엇을 넣을까요? (첫 열에서 찾는다는 점에 주의!)',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'VLOOKUP'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:','},{t:'lit',v:'A1:C5'},{t:'txt',v:','},{t:'lit',v:'3'},{t:'txt',v:')'}],
     blocks:['"지우개"','"문구"','300','A3'],answer:['"지우개"'],ordered:true,result:'300',
     bigtip:'VLOOKUP은 표의 "첫 번째 열"에서 찾을 값을 검색해요. 첫 열은 이름이니 "지우개"를 넣어야 해요. "문구"(분류)나 300(가격)은 첫 열에 없어서 못 찾습니다.'},
    {lv:1,q:'공책의 가격을 찾으려 합니다. 가격 열까지 포함하는 "표 범위" 블록을 넣으세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'VLOOKUP'},{t:'txt',v:'('},{t:'lit',v:'"공책"'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:','},{t:'lit',v:'3'},{t:'txt',v:')'}],
     blocks:['A1:C5','A1:B5','A1:A5','B1:C5'],answer:['A1:C5'],ordered:true,result:'1000',
     bigtip:'표 범위는 "찾는 첫 열"부터 "가져올 열"까지 모두 포함해야 해요. 3번째 열(가격)을 가져오려면 C열까지 포함한 A1:C5가 필요해요. A1:B5는 가격 열이 빠져서 오류!'}
  ]
},
{
  fn:'IF', title:'— 갈림길 기계 (연습)', oneline:'조건이 맞으면 앞의 값, 틀리면 뒤의 값.',
  desc:'IF(조건, 참일 때, 거짓일 때). 부등호 방향과 값 순서 주의!',
  exF:'=IF(A1>=80, "합격", "불합격")', exR:'→ A1이 85라면 "합격"',
  sheet:{head:['A'],rows:[['85']]},
  learn:{oneline:'',desc:'',syntax:'',params:[],examples:[]},
  problems:[
    {lv:0,q:'A1(85점)이 80 이상이면 "합격"이 나오도록 조건을 넣으세요. (부등호 방향에 주의!)',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'IF'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:','},{t:'lit',v:'"합격"'},{t:'txt',v:','},{t:'lit',v:'"불합격"'},{t:'txt',v:')'}],
     blocks:['A1>=80','A1<=80','A1>80','A1=80'],answer:['A1>=80'],ordered:true,result:'"합격"',
     bigtip:'">=80"은 "80보다 크거나 같으면(이상)"이에요. 85는 80 이상이라 참 → "합격". A1<=80은 "이하"라 반대 뜻이 되고, A1>80도 85면 참이지만 "80점인 사람"이 불합격되는 함정이 있어요. "이상"은 >=!'},
    {lv:0,q:'90 이상이면 "우수", 아니면 "보통". 참/거짓 값을 순서대로 넣으세요. (앞이 참, 뒤가 거짓!)',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'IF'},{t:'txt',v:'('},{t:'lit',v:'A1>=90'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['"우수"','"보통"','"합격"','"불합격"'],answer:['"우수"','"보통"'],ordered:true,result:'"보통"',
     bigtip:'IF의 두 번째 자리는 "조건이 참일 때", 세 번째는 "거짓일 때"예요. 참="우수", 거짓="보통" 순서로! A1(85)은 90 미만이라 조건이 거짓 → 뒷값 "보통"이 결과예요.'},
    {lv:1,q:'A1이 70 이상이면 "통과"가 나오는 수식 — 조건과 참일 때 값, 두 칸을 순서대로 채우세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'IF'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:','},{t:'lit',v:'"재도전"'},{t:'txt',v:')'}],
     blocks:['A1>=70','"통과"','A1<=70','"재도전"'],answer:['A1>=70','"통과"'],ordered:true,result:'"통과"',
     bigtip:'첫 칸=조건(A1>=70), 둘째 칸=참일 때 값("통과"). 85는 70 이상이라 "통과"가 나와요. 조건과 참값의 위치를 바꾸면 수식이 깨지니 순서가 중요해요.'},
    {lv:1,q:'90 이상 "A", 80 이상 "B", 그 외 "C". 안쪽 IF의 조건을 채우세요. (중첩 IF — A1은 85점)',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'IF'},{t:'txt',v:'('},{t:'lit',v:'A1>=90'},{t:'txt',v:','},{t:'lit',v:'"A"'},{t:'txt',v:','},{t:'fn',v:'IF'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:','},{t:'lit',v:'"B"'},{t:'txt',v:','},{t:'lit',v:'"C"'},{t:'txt',v:'))'}],
     blocks:['A1>=80','A1>=90','A1<=80','A1>=70'],answer:['A1>=80'],ordered:true,result:'"B"',
     bigtip:'중첩 IF는 바깥부터 차례로 검사해요. 85는 90 미만이라 안쪽 IF로 넘어가고, 거기서 "80 이상인가?"를 물어야 하니 A1>=80. 85≥80 참 → "B"! 안쪽에 또 90을 쓰면 B가 나올 수 없어요.'}
  ]
},
{
  fn:'SUMIF', title:'— 골라 더하기 기계 (연습)', oneline:'조건에 맞는 것만 골라 더합니다.',
  desc:'SUMIF(조건 범위, 조건, 합계 범위). 조건은 A열, 더하기는 B열!',
  exF:'=SUMIF(A1:A6, "과일", B1:B6)', exR:'→ 과일 행의 금액만 더해 6000',
  sheet:{head:['A','B'],rows:[['과일','2000'],['채소','1500'],['과일','3000'],['채소','2500'],['과일','1000'],['채소','500']]},
  learn:{oneline:'',desc:'',syntax:'',params:[],examples:[]},
  problems:[
    {lv:0,q:'과일의 금액 합계를 구하려 합니다. "조건" 자리에 알맞은 블록을 넣으세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'SUMIF'},{t:'txt',v:'('},{t:'lit',v:'A1:A6'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:','},{t:'lit',v:'B1:B6'},{t:'txt',v:')'}],
     blocks:['"과일"','"채소"','A1','2000'],answer:['"과일"'],ordered:true,result:'6000',
     bigtip:'조건 자리에는 찾을 글자를 따옴표로 넣어요. "과일"인 행(2000+3000+1000)의 금액만 더해 6000. A1은 셀 주소, 2000은 금액이라 조건이 될 수 없어요.'},
    {lv:0,q:'채소의 금액 합계를 구하세요. 실제로 더할 "합계 범위"는 어느 열일까요? (금액=B열)',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'SUMIF'},{t:'txt',v:'('},{t:'lit',v:'A1:A6'},{t:'txt',v:','},{t:'lit',v:'"채소"'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['B1:B6','A1:A6','B1:B3','A1:B6'],answer:['B1:B6'],ordered:true,result:'4500',
     bigtip:'세 번째 인수는 "실제로 더할 숫자 범위"예요. 금액은 B열이니 B1:B6. 채소 행의 금액 1500+2500+500=4500. A1:A6을 넣으면 글자를 더하려다 실패해요!'},
    {lv:1,q:'과일의 금액 합계를 구합니다. 조건을 검사할 "조건 범위"는 어느 열일까요? (분류=A열)',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'SUMIF'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:','},{t:'lit',v:'"과일"'},{t:'txt',v:','},{t:'lit',v:'B1:B6'},{t:'txt',v:')'}],
     blocks:['A1:A6','B1:B6','A1:B6','A1'],answer:['A1:A6'],ordered:true,result:'6000',
     bigtip:'첫 번째 인수는 "조건을 검사할 범위"예요. "과일"이라는 글자는 A열에 있으니 A1:A6. B열엔 숫자만 있어서 "과일"을 못 찾아요. 조건 검사는 A열, 더하기는 B열 — 서로 다른 열!'},
    {lv:1,q:'채소의 금액 합계를 구하는 수식 — "조건"과 "합계 범위" 두 칸을 순서대로 채우세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'SUMIF'},{t:'txt',v:'('},{t:'lit',v:'A1:A6'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['"채소"','B1:B6','"과일"','A1:A6'],answer:['"채소"','B1:B6'],ordered:true,result:'4500',
     bigtip:'인수 순서: ①조건범위(A1:A6, 이미 있음) ②조건("채소") ③합계범위(B1:B6). 채소 행의 금액 합 4500이 나와요. 조건과 합계범위 순서를 바꾸면 안 돼요!'}
  ]
},
{
  fn:'COUNTIF', title:'— 골라 세기 기계 (연습)', oneline:'조건에 맞는 칸의 개수를 셉니다.',
  desc:'COUNTIF(범위, 조건). 숫자 조건은 ">=90"처럼 부등호까지 따옴표!',
  exF:'=COUNTIF(A1:A6, ">=90")', exR:'→ 90점 이상인 칸의 개수 3',
  sheet:{head:['A'],rows:[['70'],['95'],['85'],['90'],['65'],['90']]},
  learn:{oneline:'',desc:'',syntax:'',params:[],examples:[]},
  problems:[
    {lv:0,q:'90점 "이상"이 몇 개인지 세려고 합니다. 조건 자리에 알맞은 블록을 넣으세요. (부등호를 잊지 마세요!)',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'COUNTIF'},{t:'txt',v:'('},{t:'lit',v:'A1:A6'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['">=90"','"90"','"<=90"','90'],answer:['">=90"'],ordered:true,result:'3',
     bigtip:'숫자 비교 조건은 부등호와 숫자를 통째로 따옴표에 넣어요: ">=90". 95, 90, 90 세 칸이 세어져요. 그냥 90이나 "90"을 넣으면 "정확히 90인 칸"만 세서 2가 나와버려요!'},
    {lv:0,q:'90점 이상의 개수를 셉니다. 여섯 칸 전체를 포함하는 "범위" 블록을 넣으세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'COUNTIF'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:','},{t:'lit',v:'">=90"'},{t:'txt',v:')'}],
     blocks:['A1:A6','A1:A5','A2:A6','A1'],answer:['A1:A6'],ordered:true,result:'3',
     bigtip:'개수를 정확히 세려면 여섯 칸 전체 A1:A6이 필요해요. A1:A5는 마지막 90(A6)이 빠지고, A2:A6은 첫 칸이 빠져서 개수가 달라질 수 있어요.'},
    {lv:1,q:'80점 "이상"이 몇 개인지 세세요. 조건 자리에 알맞은 블록을 넣으세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'COUNTIF'},{t:'txt',v:'('},{t:'lit',v:'A1:A6'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['">=80"','">80"','">=90"','"<80"'],answer:['">=80"'],ordered:true,result:'4',
     bigtip:'"80 이상"은 ">=80". 95, 85, 90, 90 네 칸이에요. ">80"은 "초과"라 뜻이 다르고(여기선 결과는 같지만 80점이 있으면 달라져요), "<80"은 미만이라 정반대!'},
    {lv:1,q:'90점 이상의 개수를 구하는 수식 — 범위와 조건, 두 칸을 순서대로 채우세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'COUNTIF'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['A1:A6','">=90"','A1:A5','">90"'],answer:['A1:A6','">=90"'],ordered:true,result:'3',
     bigtip:'COUNTIF는 인수가 딱 둘: ①셀 범위(A1:A6) ②조건(">=90"). 순서대로 넣으면 3이 나와요. ">90"은 90 초과라 90점 두 개가 빠져 1이 되니 주의!'}
  ]
},
{
  fn:'RANK.EQ', title:'— 등수 매기기 기계 (연습)', oneline:'값이 범위에서 몇 등인지 알려줍니다.',
  desc:'RANK.EQ(수, 범위, [방식]). 여러 행에 채울 땐 범위를 $로 고정!',
  exF:'=RANK.EQ(A1, $A$1:$A$5)', exR:'→ A1(73)은 5개 중 4등',
  sheet:{head:['A'],rows:[['73'],['91'],['84'],['97'],['66']]},
  learn:{oneline:'',desc:'',syntax:'',params:[],examples:[]},
  problems:[
    {lv:0,q:'A1(73점)이 몇 등인지 구하려 합니다. 알맞은 함수 블록을 넣으세요.',
     tokens:[{t:'txt',v:'='},{t:'slot'},{t:'txt',v:'('},{t:'lit',v:'A1'},{t:'txt',v:','},{t:'lit',v:'A1:A5'},{t:'txt',v:')'}],
     blocks:['RANK.EQ','MAX','COUNTIF','VLOOKUP'],answer:['RANK.EQ'],ordered:true,result:'4',
     bigtip:'등수를 매기는 함수는 RANK.EQ예요. 기본은 큰 값이 1등(내림차순): 97>91>84>73 순서라 73은 4등. MAX는 최댓값, COUNTIF는 개수라 등수와 달라요.'},
    {lv:0,q:'A4(97점)의 등수를 구하세요. 순위를 알고 싶은 "수" 자리에 알맞은 블록을 넣으세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'RANK.EQ'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:','},{t:'lit',v:'A1:A5'},{t:'txt',v:')'}],
     blocks:['A4','A1','A5','A2'],answer:['A4'],ordered:true,result:'1',
     bigtip:'첫 번째 인수는 "등수를 알고 싶은 그 값의 셀"이에요. 97점은 A4에 있으니 A4를 넣어요. 97이 가장 크니 1등!'},
    {lv:1,q:'이 수식을 아래 행으로 드래그해도 범위가 밀리지 않게 하려 합니다. "고정된(절대참조) 범위" 블록을 넣으세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'RANK.EQ'},{t:'txt',v:'('},{t:'lit',v:'A1'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['$A$1:$A$5','A1:A5','$A1:$A5','A2:A6'],answer:['$A$1:$A$5'],ordered:true,result:'4',
     bigtip:'아래로 드래그하면 A1:A5가 A2:A6, A3:A7…로 밀려서 등수가 엉켜요. $A$1:$A$5처럼 행·열 모두 $로 고정하면 어느 행에서든 같은 범위와 비교해요. $A1:$A5는 열만 고정이라 행이 밀리는 함정!'},
    {lv:1,q:'"작은 값이 1등"인 오름차순으로 A5(66점)의 순위를 구하세요. "수"와 "방식" 두 칸을 순서대로 채우세요. (오름차순=1)',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'RANK.EQ'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:','},{t:'lit',v:'A1:A5'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['A5','1','A1','0'],answer:['A5','1'],ordered:true,result:'1',
     bigtip:'세 번째 "방식"에 1을 넣으면 작은 값이 1등(오름차순)이 돼요. 66이 가장 작으니 1등! 0이나 생략은 큰 값이 1등(내림차순)이라 66은 꼴찌 5등이 되어버려요.'}
  ]
}
];

const FUNCS_INTER = [
{
  fn:'VLOOKUP', title:'— 사서 기계', oneline:'표에서 원하는 값을 찾아오는 도서관 사서예요.',
  desc:'VLOOKUP(찾을 값, 표 범위, 열 번호) — 표의 첫 열에서 "찾을 값"을 발견하면, 그 행의 "열 번호"번째 값을 가져옵니다. 열 번호는 표 안에서 1부터 셉니다.',
  exF:'=VLOOKUP("바나나", A1:C5, 3)', exR:'→ 바나나 행의 3번째 열(가격) 1500',
  sheet:{head:['A','B','C'],rows:[['사과','과일','1200'],['당근','채소','800'],['바나나','과일','1500'],['배추','채소','600'],['포도','과일','3000']]},
  learn:{
    oneline:'표의 첫 번째 열에서 값을 찾아, 같은 행의 지정한 열 값을 가져옵니다.',
    desc:'VLOOKUP은 "세로(Vertical)로 검색하는 함수"예요. 표의 첫 번째 열에서 값을 찾은 뒤, 그 행에서 원하는 열의 값을 꺼냅니다. 열 번호는 표 범위 안에서 왼쪽부터 1, 2, 3… 으로 세는 게 핵심이에요. (A열=1, B열=2, C열=3). 찾을 값은 항상 표의 첫 열에 있어야 합니다.',
    syntax:'=VLOOKUP( 찾을_값, 표_범위, 열_번호 )',
    params:[
      {name:'찾을_값', desc:'표의 첫 번째 열에서 찾을 값 (예: "바나나")'},
      {name:'표_범위', desc:'검색할 표 전체 범위. 첫 열이 검색 기준, 가져올 열까지 모두 포함해야 합니다.'},
      {name:'열_번호', desc:'가져올 값이 있는 열 번호. 표 범위의 왼쪽 열부터 1로 셉니다.'},
    ],
    examples:[
      {formula:'=VLOOKUP("바나나", A1:C5, 3)', result:'→ 1500', comment:'바나나 행의 3번째 열(가격)을 가져옵니다.'},
      {formula:'=VLOOKUP("바나나", A1:C5, 2)', result:'→ "과일"', comment:'같은 행이라도 열 번호가 2면 분류가 나와요.'},
      {formula:'=VLOOKUP("포도", A1:C5, 3)', result:'→ 3000', comment:'포도 행의 가격입니다.'},
    ]
  },
  problems:[
    {lv:0,q:'바나나의 "가격"을 찾으려 합니다. 가격은 몇 번째 열일까요? (이름=1, 분류=2, 가격=3) 열 번호 블록을 넣으세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'VLOOKUP'},{t:'txt',v:'('},{t:'lit',v:'"바나나"'},{t:'txt',v:','},{t:'lit',v:'A1:C5'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['3','2','1','5'],answer:['3'],ordered:true,result:'1500'},
    {lv:0,q:'포도의 "분류"를 찾으려 합니다. 분류는 몇 번째 열일까요? 열 번호 블록을 넣으세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'VLOOKUP'},{t:'txt',v:'('},{t:'lit',v:'"포도"'},{t:'txt',v:','},{t:'lit',v:'A1:C5'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['2','3','1','2000'],answer:['2'],ordered:true,result:'"과일"'},
    {lv:1,q:'당근의 가격을 찾습니다. "찾을 값" 자리에는 무엇을 넣을까요? (첫 열에서 찾는다는 점에 주의!)',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'VLOOKUP'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:','},{t:'lit',v:'A1:C5'},{t:'txt',v:','},{t:'lit',v:'3'},{t:'txt',v:')'}],
     blocks:['"당근"','"채소"','800','A2'],answer:['"당근"'],ordered:true,result:'800'},
    {lv:1,q:'배추의 가격을 찾으려 합니다. 가격 열까지 포함하는 "표 범위" 블록을 넣으세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'VLOOKUP'},{t:'txt',v:'('},{t:'lit',v:'"배추"'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:','},{t:'lit',v:'3'},{t:'txt',v:')'}],
     blocks:['A1:C5','A1:B5','A1:A5','B1:C5'],answer:['A1:C5'],ordered:true,result:'600'}
  ]
},
{
  fn:'IF', title:'— 갈림길 기계', oneline:'조건이 맞으면 앞의 값, 틀리면 뒤의 값을 내보냅니다.',
  desc:'IF(조건, 참일 때, 거짓일 때) — 세 자리로 이루어져요. 조건에는 A1>=60 같은 비교식이 들어갑니다. 참/거짓 결과값의 순서가 중요해요!',
  exF:'=IF(A1>=60, "합격", "불합격")', exR:'→ A1이 72라면 60 이상이므로 "합격"',
  sheet:{head:['A'],rows:[['72']]},
  learn:{
    oneline:'조건을 판단해 참이면 앞의 값, 거짓이면 뒤의 값을 돌려줍니다.',
    desc:'IF는 "만약 ~라면 A, 아니라면 B"라는 논리를 표현합니다. 비교 연산자 방향(>=는 이상, <=는 이하)과 참/거짓 값의 순서를 헷갈리지 않는 게 중요해요. IF 안에 또 IF를 넣으면 3갈래 이상으로 나눌 수 있습니다 (중첩 IF).',
    syntax:'=IF( 조건, 참일_때_값, 거짓일_때_값 )',
    params:[
      {name:'조건', desc:'참/거짓으로 판단되는 비교식 (예: A1>=60). >=는 "이상", <=는 "이하"'},
      {name:'참일_때', desc:'조건이 참일 때 돌려줄 값 (앞자리)'},
      {name:'거짓일_때', desc:'조건이 거짓일 때 돌려줄 값 (뒷자리)'},
    ],
    examples:[
      {formula:'=IF(A1>=60, "합격", "불합격")', result:'→ A1=72이므로 "합격"', comment:'60 이상이면 합격.'},
      {formula:'=IF(A1>=90, "우수", "보통")', result:'→ A1=72이므로 "보통"', comment:'90 미만이라 뒷값 "보통".'},
      {formula:'=IF(A1>=90, "A", IF(A1>=70, "B", "C"))', result:'→ A1=72이므로 "B"', comment:'중첩 IF: 90↑=A, 70↑=B, 나머지=C.'},
    ]
  },
  problems:[
    {lv:0,q:'A1(72점)이 60 이상이면 "합격"이 나오도록 조건을 넣으세요. (부등호 방향에 주의!)',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'IF'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:','},{t:'lit',v:'"합격"'},{t:'txt',v:','},{t:'lit',v:'"불합격"'},{t:'txt',v:')'}],
     blocks:['A1>=60','A1<=60','A1>60','A1=60'],answer:['A1>=60'],ordered:true,result:'"합격"'},
    {lv:0,q:'90 이상이면 "우수", 아니면 "보통". 참/거짓 값을 순서대로 넣으세요. (앞이 참, 뒤가 거짓!)',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'IF'},{t:'txt',v:'('},{t:'lit',v:'A1>=90'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['"우수"','"보통"','"합격"','"불합격"'],answer:['"우수"','"보통"'],ordered:true,result:'"보통"'},
    {lv:1,q:'A1이 70 이상이면 "합격"이 나오는 수식 — 조건과 참일 때 값, 두 칸을 순서대로 채우세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'IF'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:','},{t:'lit',v:'"불합격"'},{t:'txt',v:')'}],
     blocks:['A1>=70','"합격"','A1<=70','"불합격"'],answer:['A1>=70','"합격"'],ordered:true,result:'"합격"'},
    {lv:1,q:'90 이상 "A", 70 이상 "B", 그 외 "C". 안쪽 IF의 조건을 채우세요. (중첩 IF — A1은 72점)',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'IF'},{t:'txt',v:'('},{t:'lit',v:'A1>=90'},{t:'txt',v:','},{t:'lit',v:'"A"'},{t:'txt',v:','},{t:'fn',v:'IF'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:','},{t:'lit',v:'"B"'},{t:'txt',v:','},{t:'lit',v:'"C"'},{t:'txt',v:'))'}],
     blocks:['A1>=70','A1>=90','A1<=70','A1>=60'],answer:['A1>=70'],ordered:true,result:'"B"'}
  ]
},
{
  fn:'SUMIF', title:'— 골라 더하기 기계', oneline:'조건에 맞는 것만 골라서 더합니다.',
  desc:'SUMIF(조건 범위, 조건, 합계 범위) — 조건 범위에서 조건에 맞는 행을 찾고, 그 행의 합계 범위 값만 더해요. 첫 번째와 세 번째 인수(범위 두 개)를 헷갈리지 마세요!',
  exF:'=SUMIF(A1:A6, "문구", B1:B6)', exR:'→ 문구인 행의 금액만 더해 6000',
  sheet:{head:['A','B'],rows:[['문구','3000'],['식품','5000'],['문구','2000'],['식품','4000'],['문구','1000'],['식품','2500']]},
  learn:{
    oneline:'조건에 맞는 행만 골라서 합계를 구합니다.',
    desc:'SUMIF는 "조건부 SUM"이에요. 첫 번째 인수는 조건을 검사할 범위(A열), 두 번째는 조건, 세 번째는 실제로 더할 숫자 범위(B열)입니다. 헷갈리기 쉬운 점: 첫 번째(조건 범위)와 세 번째(합계 범위)는 서로 다른 열이에요. 조건은 A열에서 찾고, 더하는 건 B열입니다.',
    syntax:'=SUMIF( 조건_범위, 조건, 합계_범위 )',
    params:[
      {name:'조건_범위', desc:'조건을 검사할 범위 (예: 분류가 있는 A1:A6)'},
      {name:'조건', desc:'찾을 조건 (예: "문구")'},
      {name:'합계_범위', desc:'조건에 맞는 행에서 실제로 더할 숫자 범위 (예: 금액이 있는 B1:B6)'},
    ],
    examples:[
      {formula:'=SUMIF(A1:A6, "문구", B1:B6)', result:'→ 3000+2000+1000 = 6000', comment:'문구 행의 금액만 더합니다.'},
      {formula:'=SUMIF(A1:A6, "식품", B1:B6)', result:'→ 5000+4000+2500 = 11500', comment:'식품 행의 금액만 더합니다.'},
      {formula:'=SUMIF(B1:B6, ">=3000")', result:'→ 3000 이상인 금액의 합', comment:'합계 범위를 생략하면 조건 범위 자체를 더해요.'},
    ]
  },
  problems:[
    {lv:0,q:'문구의 금액 합계를 구하려 합니다. "조건" 자리에 알맞은 블록을 넣으세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'SUMIF'},{t:'txt',v:'('},{t:'lit',v:'A1:A6'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:','},{t:'lit',v:'B1:B6'},{t:'txt',v:')'}],
     blocks:['"문구"','"식품"','A1','3000'],answer:['"문구"'],ordered:true,result:'6000'},
    {lv:0,q:'식품의 금액 합계를 구하세요. 실제로 더할 "합계 범위"는 어느 열일까요? (금액=B열)',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'SUMIF'},{t:'txt',v:'('},{t:'lit',v:'A1:A6'},{t:'txt',v:','},{t:'lit',v:'"식품"'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['B1:B6','A1:A6','B1:B3','A1:B6'],answer:['B1:B6'],ordered:true,result:'11500'},
    {lv:1,q:'문구의 금액 합계를 구합니다. 조건을 검사할 "조건 범위"는 어느 열일까요? (분류=A열)',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'SUMIF'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:','},{t:'lit',v:'"문구"'},{t:'txt',v:','},{t:'lit',v:'B1:B6'},{t:'txt',v:')'}],
     blocks:['A1:A6','B1:B6','A1:B6','A1'],answer:['A1:A6'],ordered:true,result:'6000'},
    {lv:1,q:'식품의 금액 합계를 구하는 수식 — "조건"과 "합계 범위" 두 칸을 순서대로 채우세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'SUMIF'},{t:'txt',v:'('},{t:'lit',v:'A1:A6'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['"식품"','B1:B6','"문구"','A1:A6'],answer:['"식품"','B1:B6'],ordered:true,result:'11500'}
  ]
},
{
  fn:'COUNTIF', title:'— 골라 세기 기계', oneline:'조건에 맞는 칸이 몇 개인지 세어줍니다.',
  desc:'COUNTIF(범위, 조건) — 범위 안에서 조건에 맞는 칸의 개수를 세요. 숫자 조건은 ">=90"처럼 부등호까지 통째로 따옴표 안에 넣는 게 핵심입니다!',
  exF:'=COUNTIF(A1:A6, ">=90")', exR:'→ 90점 이상인 칸의 개수 3',
  sheet:{head:['A'],rows:[['88'],['92'],['75'],['95'],['60'],['90']]},
  learn:{
    oneline:'범위 안에서 조건에 맞는 칸의 개수를 셉니다.',
    desc:'COUNTIF는 "조건부 개수 세기" 함수예요. 인수는 범위와 조건 두 개뿐입니다. 중급에서 가장 헷갈리는 부분은 숫자 조건 표기예요. "90 이상"은 그냥 90이 아니라 ">=90"처럼 부등호와 숫자를 함께 따옴표로 묶어야 합니다. 부등호가 없으면 "정확히 90인 칸"만 세게 돼요.',
    syntax:'=COUNTIF( 범위, 조건 )',
    params:[
      {name:'범위', desc:'개수를 셀 범위 (예: A1:A6)'},
      {name:'조건', desc:'셀 조건. 숫자 비교는 부등호까지 따옴표로 (예: ">=90", "<70")'},
    ],
    examples:[
      {formula:'=COUNTIF(A1:A6, ">=90")', result:'→ 3 (92, 95, 90)', comment:'90점 이상인 칸이 3개입니다.'},
      {formula:'=COUNTIF(A1:A6, ">=80")', result:'→ 4 (88, 92, 95, 90)', comment:'80점 이상은 4개예요.'},
      {formula:'=COUNTIF(A1:A6, "<70")', result:'→ 1 (60)', comment:'70점 미만은 60점 하나뿐입니다.'},
    ]
  },
  problems:[
    {lv:0,q:'90점 "이상"이 몇 개인지 세려고 합니다. 조건 자리에 알맞은 블록을 넣으세요. (부등호를 잊지 마세요!)',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'COUNTIF'},{t:'txt',v:'('},{t:'lit',v:'A1:A6'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['">=90"','"90"','"<=90"','90'],answer:['">=90"'],ordered:true,result:'3'},
    {lv:0,q:'90점 이상의 개수를 셉니다. 여섯 칸 전체를 포함하는 "범위" 블록을 넣으세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'COUNTIF'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:','},{t:'lit',v:'">=90"'},{t:'txt',v:')'}],
     blocks:['A1:A6','A1:A5','A2:A6','A1'],answer:['A1:A6'],ordered:true,result:'3'},
    {lv:1,q:'80점 "이상"이 몇 개인지 세세요. 조건 자리에 알맞은 블록을 넣으세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'COUNTIF'},{t:'txt',v:'('},{t:'lit',v:'A1:A6'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['">=80"','">80"','">=90"','"<80"'],answer:['">=80"'],ordered:true,result:'4'},
    {lv:1,q:'90점 이상의 개수를 구하는 수식 — 범위와 조건, 두 칸을 순서대로 채우세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'COUNTIF'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['A1:A6','">=90"','A1:A5','">90"'],answer:['A1:A6','">=90"'],ordered:true,result:'3'}
  ]
},
{
  fn:'RANK.EQ', title:'— 등수 매기기 기계', oneline:'값이 범위 안에서 몇 등인지 순위를 매깁니다.',
  desc:'RANK.EQ(수, 범위, [방식]) — "수"가 "범위" 안에서 몇 등인지 알려줘요. 여러 행에 순위를 채울 땐 범위를 $A$1:$A$5처럼 고정(절대참조)해야 밀리지 않아요! 방식은 생략/0이면 내림차순(큰 값이 1등), 1이면 오름차순입니다.',
  exF:'=RANK.EQ(A1, $A$1:$A$5)', exR:'→ A1(88)은 5개 중 3등',
  sheet:{head:['A'],rows:[['88'],['92'],['75'],['95'],['60']]},
  learn:{
    oneline:'값이 전체 범위에서 몇 번째 순위인지 등수를 매깁니다.',
    desc:'RANK.EQ는 성적 등수, 매출 순위 등을 매길 때 씁니다. 첫 번째 인수는 순위를 알고 싶은 "값", 두 번째는 비교할 "전체 범위"예요. 세 번째 방식은 생략하거나 0이면 큰 값이 1등(내림차순), 1이면 작은 값이 1등(오름차순)입니다.',
    syntax:'=RANK.EQ( 수, 범위, [방식] )',
    params:[
      {name:'수', desc:'순위를 알고 싶은 값 또는 셀 (예: A1)'},
      {name:'범위', desc:'순위를 매길 전체 비교 범위. 아래로 채울 땐 $A$1:$A$5처럼 고정하세요.'},
      {name:'방식', desc:'생략/0이면 내림차순(큰 값=1등), 1이면 오름차순(작은 값=1등)'},
    ],
    absTip:'왜 $를 붙일까? A1에 =RANK.EQ(A1, A1:A5)를 넣고 아래로 드래그하면 비교 범위가 A2:A6, A3:A7…처럼 같이 밀려서 등수가 엉켜요. 범위를 $A$1:$A$5로 고정하면 모든 행이 똑같은 전체 범위와 비교되어 순위가 정확해집니다. ($는 F4 키로 빠르게 붙일 수 있어요.)',
    examples:[
      {formula:'=RANK.EQ(A1, $A$1:$A$5)', result:'→ 3 (88은 3등)', comment:'범위를 $로 고정 — 아래로 채워도 안 밀려요.'},
      {formula:'=RANK.EQ(A4, $A$1:$A$5)', result:'→ 1 (95는 1등)', comment:'가장 큰 95가 내림차순 1등입니다.'},
      {formula:'=RANK.EQ(A5, $A$1:$A$5, 1)', result:'→ 1 (60은 오름차순 1등)', comment:'방식 1이면 가장 작은 60이 1등이 돼요.'},
    ]
  },
  problems:[
    {lv:0,q:'A1(88점)이 몇 등인지 구하려 합니다. 알맞은 함수 블록을 넣으세요.',
     tokens:[{t:'txt',v:'='},{t:'slot'},{t:'txt',v:'('},{t:'lit',v:'A1'},{t:'txt',v:','},{t:'lit',v:'A1:A5'},{t:'txt',v:')'}],
     blocks:['RANK.EQ','MAX','COUNTIF','VLOOKUP'],answer:['RANK.EQ'],ordered:true,result:'3'},
    {lv:0,q:'A4(95점)의 등수를 구하세요. 순위를 알고 싶은 "수" 자리에 알맞은 블록을 넣으세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'RANK.EQ'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:','},{t:'lit',v:'A1:A5'},{t:'txt',v:')'}],
     blocks:['A4','A1','A5','A3'],answer:['A4'],ordered:true,result:'1'},
    {lv:1,q:'이 수식을 아래 행으로 드래그해도 범위가 밀리지 않게 하려 합니다. "고정된(절대참조) 범위" 블록을 넣으세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'RANK.EQ'},{t:'txt',v:'('},{t:'lit',v:'A1'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['$A$1:$A$5','A1:A5','$A1:$A5','A2:A6'],answer:['$A$1:$A$5'],ordered:true,result:'3'},
    {lv:1,q:'"작은 값이 1등"인 오름차순으로 A5(60점)의 순위를 구하세요. "수"와 "방식" 두 칸을 순서대로 채우세요. (오름차순=1)',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'RANK.EQ'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:','},{t:'lit',v:'A1:A5'},{t:'txt',v:','},{t:'slot'},{t:'txt',v:')'}],
     blocks:['A5','1','A1','0'],answer:['A5','1'],ordered:true,result:'1'}
  ]
}
];

const FUNCS_HACKER = [
{
  fn:'CHOOSE+RANK.EQ', title:'— 순위별 수상명 부여 [컴활 기출 유형]',
  oneline:'점수의 순위를 구해 1위부터 차례로 "대상·금상·은상·동상·장려"를 표시합니다.',
  desc:'CHOOSE의 번호 자리에 RANK.EQ를 통째로 넣는 컴활 단골 조합. 수상명 5개를 순위 순서대로 나열하는 게 관건.',
  exF:'=CHOOSE( RANK.EQ(점수, $범위$), 값1, 값2, ... )', exR:'→ 순위가 곧 CHOOSE의 번호가 됩니다',
  sheet:{head:['A'],rows:[['88'],['92'],['75'],['95'],['60']]},
  learn:{oneline:'',desc:'',syntax:'',params:[],examples:[]},
  problems:[
    {lv:1,typed:true,
     q:'[표1] A2 점수(92)의 순위를 구하여 1위는 "대상", 2위는 "금상", 3위는 "은상", 4위는 "동상", 5위는 "장려"를 표시하세요.\n▶ CHOOSE, RANK.EQ 함수 사용 · 순위 비교 범위는 절대참조($A$1:$A$5)',
     answerText:'=CHOOSE(RANK.EQ(A2,$A$1:$A$5),"대상","금상","은상","동상","장려")',
     answerPattern:'^=CHOOSE\\(RANK\\.EQ\\(A2,\\$A\\$1:\\$A\\$5(,0)?\\),"대상","금상","은상","동상","장려"\\)$',
     blocks:[],answer:[],ordered:true,result:'"금상"',
     hint:'순위(2)가 CHOOSE의 번호가 되어 2번째 값 "금상"이 나와요. 수상명은 반드시 1위부터 순서대로! 완성: =CHOOSE(RANK.EQ(A2,$A$1:$A$5),"대상","금상","은상","동상","장려")'}
  ]
},
{
  fn:'CHOOSE+MID', title:'— 주민번호 성별 판정 [컴활 최빈출]',
  oneline:'주민등록번호의 8번째 글자(1=남, 2=여)로 성별을 표시합니다.',
  desc:'컴활 시험에 가장 자주 나오는 문제. 함정: 하이픈(-)도 한 글자라서 성별 코드는 7이 아니라 8번째!',
  exF:'=CHOOSE( MID(주민번호, 위치, 1), 값1, 값2 )', exR:'→ 뽑은 숫자가 CHOOSE의 번호가 됩니다',
  sheet:{head:['C'],rows:[['990101-2345678']]},
  learn:{oneline:'',desc:'',syntax:'',params:[],examples:[]},
  problems:[
    {lv:1,typed:true,
     q:'[표1] C1의 주민등록번호에서 성별 코드를 뽑아 1이면 "남", 2이면 "여"를 표시하세요.\n▶ CHOOSE, MID 함수 사용 · 주의: 하이픈(-)도 글자 수에 포함됩니다!',
     answerText:'=CHOOSE(MID(C1,8,1),"남","여")',
     answerPattern:'^=CHOOSE\\(MID\\(C1,8,1\\),"남","여"\\)$',
     blocks:[],answer:[],ordered:true,result:'"여"',
     hint:'990101-2345678에서 글자를 세면 하이픈이 7번째, 성별 코드 2는 8번째예요. MID(C1,8,1)="2" → CHOOSE 2번째 값 "여". 완성: =CHOOSE(MID(C1,8,1),"남","여")'}
  ]
},
{
  fn:'IF+AVERAGE', title:'— 전체 평균과 비교 판정 [절대참조 함정]',
  oneline:'내 점수가 전체 평균 이상인지 비교해 통과 여부를 표시합니다.',
  desc:'조건 안에서 AVERAGE를 기준값으로 쓰는 유형. 아래로 채워도 평균 범위가 밀리지 않게 절대참조가 필수.',
  exF:'=IF( 점수 >= AVERAGE($범위$), 참, 거짓 )', exR:'→ 평균이 비교 기준이 됩니다',
  sheet:{head:['B'],rows:[['81'],['86'],['90'],['77'],['66']]},
  learn:{oneline:'',desc:'',syntax:'',params:[],examples:[]},
  problems:[
    {lv:1,typed:true,
     q:'[표1] B1 점수(81)가 B1:B5 전체 평균 이상이면 "통과", 미만이면 "재시험"을 표시하세요.\n▶ IF, AVERAGE 함수 사용 · 평균 범위는 절대참조($B$1:$B$5)',
     answerText:'=IF(B1>=AVERAGE($B$1:$B$5),"통과","재시험")',
     answerPattern:'^=IF\\(B1>=AVERAGE\\(\\$B\\$1:\\$B\\$5\\),"통과","재시험"\\)$',
     blocks:[],answer:[],ordered:true,result:'"통과"',
     hint:'전체 평균은 (81+86+90+77+66)÷5=80. B1(81)≥80이라 "통과". 평균 범위는 꼭 $B$1:$B$5로 고정! 완성: =IF(B1>=AVERAGE($B$1:$B$5),"통과","재시험")'}
  ]
},
{
  fn:'IF+RANK.EQ(오름차순)', title:'— 기록 경기 순위 [옵션 1 함정]',
  oneline:'100m 달리기처럼 "작은 값이 1위"인 기록의 순위를 구해 결승 진출을 판정합니다.',
  desc:'점수와 반대로 기록(시간)은 작을수록 좋음! RANK.EQ 세 번째 인수에 1(오름차순)을 반드시 넣어야 하는 함정 문제.',
  exF:'=IF( RANK.EQ(기록, $범위$, 1) <= 기준, 참, 거짓 )', exR:'→ 옵션 1 = 작은 값이 1위',
  sheet:{head:['A'],rows:[['12.5'],['11.8'],['13.2'],['11.5'],['12.9']]},
  learn:{oneline:'',desc:'',syntax:'',params:[],examples:[]},
  problems:[
    {lv:1,typed:true,
     q:'[표1] A1의 100m 기록(12.5초)의 순위를 구해 3위 이내면 "결승", 아니면 "예선"을 표시하세요.\n▶ IF, RANK.EQ 함수 사용 · 기록은 작을수록 좋은 것에 주의! · 범위 절대참조',
     answerText:'=IF(RANK.EQ(A1,$A$1:$A$5,1)<=3,"결승","예선")',
     answerPattern:'^=IF\\(RANK\\.EQ\\(A1,\\$A\\$1:\\$A\\$5,1\\)<=3,"결승","예선"\\)$',
     blocks:[],answer:[],ordered:true,result:'"결승"',
     hint:'기록은 작을수록 좋으니 RANK.EQ 세 번째 인수에 1(오름차순)! 11.5→1위, 11.8→2위, 12.5→3위라 "결승". 옵션 1을 빼면 내림차순이 되어 순위가 뒤집혀요. 완성: =IF(RANK.EQ(A1,$A$1:$A$5,1)<=3,"결승","예선")'}
  ]
},
{
  fn:'ROUNDDOWN+DAVERAGE', title:'— 조건부 평균 버림 [ROUND 함정]',
  oneline:'영업부 평균을 소수 첫째 자리까지 "버림"으로 구합니다.',
  desc:'평균 82.66…을 ROUND로 반올림하면 82.7이지만, ROUNDDOWN 버림이면 82.6! 한 글자 차이로 답이 갈리는 함정.',
  exF:'=ROUNDDOWN( DAVERAGE(데이터, 필드, 조건범위), 자릿수 )', exR:'→ 무조건 버림(내림)',
  sheet:{head:['A','B'],rows:[['부서','점수'],['영업','82'],['관리','90'],['영업','90'],['관리','60'],['영업','76']],
    crit:{title:'조건 (D1:D2)',head:['D'],rows:[['부서'],['영업']]}},
  learn:{oneline:'',desc:'',syntax:'',params:[],examples:[]},
  problems:[
    {lv:1,typed:true,
     q:'[표1] D1:D2 조건(영업)에 맞는 점수의 평균을 소수 첫째 자리까지 "버림"하여 표시하세요.\n▶ ROUNDDOWN, DAVERAGE 함수 사용 · 반올림(ROUND) 아님에 주의!',
     answerText:'=ROUNDDOWN(DAVERAGE(A1:B6,"점수",D1:D2),1)',
     answerPattern:'^=ROUNDDOWN\\(DAVERAGE\\(A1:B6,("점수"|2),D1:D2\\),1\\)$',
     blocks:[],answer:[],ordered:true,result:'82.6',
     hint:'영업 평균 = (82+90+76)÷3 = 82.666…. ROUND면 82.7이지만 문제는 "버림"이라 ROUNDDOWN → 82.6! 필드는 "점수" 또는 열 번호 2 둘 다 가능. 완성: =ROUNDDOWN(DAVERAGE(A1:B6,"점수",D1:D2),1)'}
  ]
},
{
  fn:'ROUND+SUMIF÷COUNTIF', title:'— 조건부 평균 반올림',
  oneline:'SUMIF÷COUNTIF로 영업부 평균을 만들고, 소수 첫째 자리로 반올림합니다.',
  desc:'평균 = 합계÷개수 원리를 수식으로. 두 함수의 조건("영업")과 범위를 똑같이 맞추는 게 포인트.',
  exF:'=ROUND( SUMIF(...) / COUNTIF(...), 자릿수 )', exR:'→ 합계÷개수를 통째로 반올림',
  sheet:{head:['A','B'],rows:[['부서','점수'],['영업','80'],['관리','90'],['영업','76'],['관리','60'],['영업','91']]},
  learn:{oneline:'',desc:'',syntax:'',params:[],examples:[]},
  problems:[
    {lv:1,typed:true,
     q:'[표1] "영업" 부서의 점수 평균을 SUMIF와 COUNTIF로 구한 뒤, 소수 첫째 자리까지 반올림하세요.\n▶ ROUND, SUMIF, COUNTIF 함수 사용 · 범위: 조건 A2:A6, 합계 B2:B6 (제목줄 제외)',
     answerText:'=ROUND(SUMIF(A2:A6,"영업",B2:B6)/COUNTIF(A2:A6,"영업"),1)',
     answerPattern:'^=ROUND\\(SUMIF\\(A2:A6,"영업",B2:B6\\)/COUNTIF\\(A2:A6,"영업"\\),1\\)$',
     blocks:[],answer:[],ordered:true,result:'82.3',
     hint:'영업 합계 80+76+91=247, 인원 3명 → 247÷3=82.333… → ROUND(…,1)=82.3. 나누기 전체를 ROUND로 감싸야 해요. 완성: =ROUND(SUMIF(A2:A6,"영업",B2:B6)/COUNTIF(A2:A6,"영업"),1)'}
  ]
},
{
  fn:'VLOOKUP+CHOOSE+MID', title:'— 코드 해독 후 가격 조회 [3중 중첩]',
  oneline:'코드 속 숫자로 과일 이름을 정하고, 그 이름으로 가격표에서 가격을 찾습니다.',
  desc:'MID→CHOOSE→VLOOKUP 3단 연결. 안쪽부터 차례로 계산되는 흐름을 정확히 따라가야 합니다.',
  exF:'=VLOOKUP( CHOOSE( MID(...), ... ), 표, 열번호 )', exR:'→ 숫자 → 이름 → 가격',
  sheet:{head:['C','','E','F'],rows:[['D2일','','과일','가격'],['','','사과','1200'],['','','배','1500'],['','','포도','3000']]},
  learn:{oneline:'',desc:'',syntax:'',params:[],examples:[]},
  problems:[
    {lv:1,typed:true,
     q:'[표1] C1 코드("D2일")의 2번째 글자를 뽑아 1이면 "사과", 2이면 "배", 3이면 "포도"로 정하고,\n그 과일을 E1:F3 표에서 찾아 2번째 열(가격)을 표시하세요.\n▶ VLOOKUP, CHOOSE, MID 함수 사용',
     answerText:'=VLOOKUP(CHOOSE(MID(C1,2,1),"사과","배","포도"),E1:F3,2)',
     answerPattern:'^=VLOOKUP\\(CHOOSE\\(MID\\(C1,2,1\\),"사과","배","포도"\\),E1:F3,2(,0|,FALSE)?\\)$',
     blocks:[],answer:[],ordered:true,result:'1500',
     hint:'MID(C1,2,1)="2" → CHOOSE 2번째 "배" → VLOOKUP이 표에서 배를 찾아 가격 1500. 안쪽→바깥 순서로 계산돼요. 완성: =VLOOKUP(CHOOSE(MID(C1,2,1),"사과","배","포도"),E1:F3,2)'}
  ]
},
{
  fn:'DSUM(다중조건)', title:'— 두 조건 동시 만족 합계 [조건표 확장]',
  oneline:'"영업 부서이면서 80점 이상"인 사람들의 점수 합계를 구합니다.',
  desc:'조건표가 두 칸(D1:E2)으로 확장된 심화형. 같은 행에 나란히 쓴 조건은 "그리고(AND)"로 동시에 만족해야 합니다.',
  exF:'=DSUM( 데이터, 필드, 조건범위 )', exR:'→ 조건표 가로 나열 = AND 조건',
  sheet:{head:['A','B'],rows:[['부서','점수'],['영업','82'],['관리','90'],['영업','90'],['관리','60'],['영업','76']],
    crit:{title:'조건 (D1:E2)',head:['D','E'],rows:[['부서','점수'],['영업','>=80']]}},
  learn:{oneline:'',desc:'',syntax:'',params:[],examples:[]},
  problems:[
    {lv:1,typed:true,
     q:'[표1] 조건표(D1:E2)를 이용해 "부서가 영업이면서 점수가 80 이상"인 점수의 합계를 구하세요.\n▶ DSUM 함수 사용 · 조건범위는 두 칸짜리 D1:E2!',
     answerText:'=DSUM(A1:B6,"점수",D1:E2)',
     answerPattern:'^=DSUM\\(A1:B6,("점수"|2),D1:E2\\)$',
     blocks:[],answer:[],ordered:true,result:'172',
     hint:'조건표 같은 행에 [영업 | >=80]을 나란히 쓰면 "영업 그리고 80이상"이 돼요. 해당자는 82, 90 두 명 → 합계 172. 조건범위를 D1:D2로 쓰면 함정에 빠져요(모든 영업 합산). 완성: =DSUM(A1:B6,"점수",D1:E2)'}
  ]
}
];
const FUNCS_ADV = [
{
  fn:'IF+RANK.EQ', title:'— 1·2·3위만 표시 (합성)', oneline:'등수를 구해서 1·2·3위에만 메달을, 나머지엔 빈칸을 줍니다.',
  desc:'RANK.EQ로 등수를 구하고, IF로 "3등 이내인지"를 판단해요. 3등 안에 들면 순위를, 아니면 빈 문자열("")을 보여줍니다.',
  exF:'=IF(RANK.EQ(A1,$A$1:$A$5)<=3, RANK.EQ(A1,$A$1:$A$5), "")', exR:'→ A1(88)은 3등이라 3',
  sheet:{head:['A'],rows:[['88'],['92'],['75'],['95'],['60']]},
  learn:{
    oneline:'RANK.EQ로 등수를 구한 다음, IF로 상위 3등만 골라 표시하는 수식입니다.',
    desc:'엑셀을 처음 해도 이렇게 생각하면 쉬워요. ① 먼저 "이 점수가 몇 등이지?"를 RANK.EQ가 계산해요. ② 그 다음 IF가 "그 등수가 3보다 작거나 같나?"를 물어봐요. ③ 맞으면 등수를 보여주고, 아니면 아무것도 안 보이게(빈칸 "") 둡니다. 즉 "등수를 구한다 → 3등까지만 통과시킨다"는 2단계예요. 비교 범위는 아래로 채워도 안 밀리게 $로 고정합니다.',
    syntax:'=IF( RANK.EQ(점수,$범위$) <= 3, 보여줄_값, "" )',
    params:[
      {name:'RANK.EQ(점수,$범위$)', desc:'먼저 등수를 계산해요. 범위는 $로 고정'},
      {name:'<=3', desc:'"3등 이내인가?"를 판단하는 조건 (작거나 같음)'},
      {name:'보여줄_값 / ""', desc:'3등 이내면 표시할 값 / 아니면 빈칸'},
    ],
    absTip:'"1·2·3위만"을 만드는 핵심은 <=3 조건이에요. <=1 로 바꾸면 1등만, <=5 로 바꾸면 5등까지 표시돼요. 등수 대신 CHOOSE로 "금·은·동"을 붙이는 것도 응용이에요.',
    examples:[
      {formula:'=IF(RANK.EQ(A1,$A$1:$A$5)<=3, RANK.EQ(A1,$A$1:$A$5), "")', result:'→ 3', comment:'A1(88)은 3등이라 3이 표시.'},
      {formula:'=IF(RANK.EQ(A3,$A$1:$A$5)<=3, RANK.EQ(A3,$A$1:$A$5), "")', result:'→ ""', comment:'A3(75)은 4등이라 빈칸.'},
      {formula:'=RANK.EQ(A4,$A$1:$A$5)', result:'→ 1', comment:'A4(95)는 1등. IF로 감싸면 1이 표시돼요.'},
    ]
  },
  problems:[
    {lv:0,q:'등수를 구하는 안쪽 함수를 골라 조건 자리에 넣으세요. (3등 이내면 등수 표시)',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'IF'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:'('},{t:'lit',v:'A1'},{t:'txt',v:', '},{t:'lit',v:'$A$1:$A$5'},{t:'txt',v:')<=3, '},{t:'lit',v:'3'},{t:'txt',v:', '},{t:'lit',v:'""'},{t:'txt',v:')'}],
     blocks:['RANK.EQ','COUNTIF','MAX','AVERAGE'],answer:['RANK.EQ'],ordered:true,result:'3',hint:'RANK.EQ가 등수를 계산해요. IF의 조건 자리에 RANK.EQ를 통째로 넣습니다. 완성: =IF(RANK.EQ(A1,$A$1:$A$5)<=3, RANK.EQ(A1,$A$1:$A$5), "")'},
    {lv:1,q:'1·2·3위만 표시하려 합니다. "몇 등까지 통과"인지 정하는 조건을 완성하세요. (연산자와 숫자!)',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'IF'},{t:'txt',v:'('},{t:'fn',v:'RANK.EQ'},{t:'txt',v:'('},{t:'lit',v:'A1'},{t:'txt',v:', '},{t:'lit',v:'$A$1:$A$5'},{t:'txt',v:') '},{t:'slot'},{t:'txt',v:' '},{t:'slot'},{t:'txt',v:', '},{t:'lit',v:'3'},{t:'txt',v:', '},{t:'lit',v:'""'},{t:'txt',v:')'}],
     blocks:['<=','3','>=','1'],answer:['<=','3'],ordered:true,result:'3',hint:'1,2,3위를 통과시키려면 <=3 조건이에요. 연산자 <= 와 숫자 3 을 순서대로. 완성 조건: RANK.EQ(A1,$A$1:$A$5) <= 3'},
    {lv:1,tag:'보충',q:'등수 대신 "금·은·동"을 붙이려 합니다. 3등 이내일 때 CHOOSE로 메달을 고르도록, 참일 때 값과 등수 인수를 순서대로 채우세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'IF'},{t:'txt',v:'('},{t:'fn',v:'RANK.EQ'},{t:'txt',v:'('},{t:'lit',v:'A2'},{t:'txt',v:', '},{t:'lit',v:'$A$1:$A$5'},{t:'txt',v:')<=3, '},{t:'slot'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:'('},{t:'lit',v:'A2'},{t:'txt',v:', '},{t:'lit',v:'$A$1:$A$5'},{t:'txt',v:'), '},{t:'lit',v:'"금","은","동"'},{t:'txt',v:'), '},{t:'lit',v:'""'},{t:'txt',v:')'}],
     blocks:['CHOOSE','RANK.EQ','IF','MID'],answer:['CHOOSE','RANK.EQ'],ordered:true,result:'"은"',hint:'참일 때 값 자리엔 CHOOSE, 그 안의 번호 자리엔 RANK.EQ를 넣어요. 완성: IF(…<=3, CHOOSE(RANK.EQ(A2,$A$1:$A$5),금,은,동), "")'}
  ]
},
{
  fn:'IF+LEFT+RIGHT', title:'— 앞뒤 글자 판정 (합성)', oneline:'코드의 맨 앞과 맨 뒤 글자를 각각 잘라 조건으로 씁니다.', noLearn:true,
  desc:'LEFT는 왼쪽, RIGHT는 오른쪽 글자를 잘라요. 중첩 IF로 "앞글자가 M인가?" → "뒷글자가 A인가?"를 차례로 물어 등급을 정합니다.',
  exF:'=IF(LEFT(C1,1)="M", IF(RIGHT(C1,1)="A","정회원","준회원"), "비회원")', exR:'→ "M-2024-A"는 앞 M·뒤 A → "정회원"',
  sheet:{head:['C'],rows:[['M-2024-A']]},
  learn:{
    oneline:'LEFT와 RIGHT로 앞·뒤 글자를 뽑아, 중첩 IF로 등급을 나눕니다.',
    desc:'글자를 양쪽에서 잘라 쓰는 패턴이에요. ① LEFT(C1,1)은 맨 앞 글자 "M"을, RIGHT(C1,1)은 맨 뒤 글자 "A"를 뽑아요. ② 첫 IF가 "앞이 M이야?"를 묻고, 맞으면 ③ 안쪽 IF가 "뒤가 A야?"를 다시 물어요. 이렇게 조건을 두 번 통과하면 "정회원"이 됩니다. 앞이 M이 아니면 바로 "비회원"이고요.',
    syntax:'=IF( LEFT(코드,1)="M", IF(RIGHT(코드,1)="A","정회원","준회원"), "비회원" )',
    params:[
      {name:'LEFT(코드,1)', desc:'맨 앞 1글자를 잘라냅니다 (예: "M")'},
      {name:'RIGHT(코드,1)', desc:'맨 뒤 1글자를 잘라냅니다 (예: "A")'},
      {name:'중첩 IF', desc:'앞글자 통과 → 뒷글자 확인, 두 단계로 판정'},
    ],
    absTip:'왼쪽은 LEFT, 오른쪽은 RIGHT — 이름 그대로예요. 두 조건을 모두 만족해야 할 때 IF 안에 IF를 넣어 차례로 확인합니다.',
    examples:[
      {formula:'=IF(LEFT(C1,1)="M", IF(RIGHT(C1,1)="A","정회원","준회원"), "비회원")', result:'→ "정회원"', comment:'앞 M·뒤 A 둘 다 통과.'},
      {formula:'=LEFT(C1,1)', result:'→ "M"', comment:'맨 앞 글자만 뽑은 모습.'},
      {formula:'=RIGHT(C1,1)', result:'→ "A"', comment:'맨 뒤 글자만 뽑은 모습.'},
    ]
  },
  problems:[
    {lv:0,q:'맨 뒤 글자 "A"를 뽑는 안쪽 함수를 고르세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'IF'},{t:'txt',v:'('},{t:'fn',v:'LEFT'},{t:'txt',v:'('},{t:'lit',v:'C1'},{t:'txt',v:',1)="M", '},{t:'slot'},{t:'txt',v:'('},{t:'lit',v:'C1'},{t:'txt',v:',1)="A", '},{t:'lit',v:'"정회원"'},{t:'txt',v:', ...)'}],
     blocks:['RIGHT','LEFT','MID','ROUND'],answer:['RIGHT'],ordered:true,result:'"정회원"',hint:'맨 뒤 글자는 RIGHT예요. LEFT=왼쪽, RIGHT=오른쪽! 완성: =IF(LEFT(C1,1)=M, IF(RIGHT(C1,1)=A,정회원,준회원), 비회원)'},
    {lv:1,q:'앞은 LEFT, 뒤는 RIGHT로 각각 잘라야 합니다. 두 함수를 자리에 맞게 순서대로 채우세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'IF'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:'('},{t:'lit',v:'C1'},{t:'txt',v:',1)="M", '},{t:'fn',v:'IF'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:'('},{t:'lit',v:'C1'},{t:'txt',v:',1)="A", '},{t:'lit',v:'"정회원"'},{t:'txt',v:', '},{t:'lit',v:'"준회원"'},{t:'txt',v:'), '},{t:'lit',v:'"비회원"'},{t:'txt',v:')'}],
     blocks:['LEFT','RIGHT','MID','ROUND'],answer:['LEFT','RIGHT'],ordered:true,result:'"정회원"',hint:'바깥 IF → LEFT(앞글자), 안쪽 IF → RIGHT(뒷글자) 순서예요. 완성: LEFT … RIGHT'}
  ]
},
{
  fn:'IF+MID', title:'— 가운데 글자 판정 (합성)', oneline:'코드 중간의 글자를 뽑아 조건으로 사용합니다.',
  desc:'MID(코드, 시작위치, 개수)로 가운데 글자를 잘라, IF로 그 글자가 무엇인지 판단합니다. 위치를 정확히 세는 게 핵심!',
  exF:'=IF(MID(C1,3,1)="2", "2팀", "기타")', exR:'→ "A-201"의 3번째 글자가 2 → "2팀"',
  sheet:{head:['C'],rows:[['A-201']]},
  learn:{
    oneline:'MID로 가운데 글자를 뽑아, IF로 어느 그룹인지 판정합니다.',
    desc:'LEFT·RIGHT가 양 끝이라면, MID는 "가운데 아무 곳"이에요. ① MID(C1, 3, 1)은 "3번째 글자부터 1글자"라는 뜻으로 "A-201"에서 "2"를 뽑아요. (글자 세기: A=1, -=2, 2=3, 0=4, 1=5) ② IF가 그게 "2"인지 확인해 "2팀"으로 분류합니다. 시작 위치를 잘못 세면 엉뚱한 글자가 나오니 위치 세기가 가장 중요해요.',
    syntax:'=IF( MID(코드, 시작위치, 개수)="2", 참, 거짓 )',
    params:[
      {name:'MID(코드,시작,개수)', desc:'시작 위치부터 개수만큼 가운데 글자를 잘라냄'},
      {name:'="2"', desc:'뽑은 글자와 비교할 값 (따옴표 필수)'},
      {name:'참 / 거짓', desc:'맞을 때 / 아닐 때 표시할 값'},
    ],
    absTip:'MID의 시작 위치는 맨 앞 글자를 1로 셉니다. "A-201"에서 A=1, -=2, 2=3 … 이렇게요. 3번째 글자를 원하면 시작 위치에 3을 넣으면 됩니다.',
    examples:[
      {formula:'=IF(MID(C1,3,1)="2", "2팀", "기타")', result:'→ "2팀"', comment:'3번째 글자 "2"라서 "2팀".'},
      {formula:'=MID(C1,3,1)', result:'→ "2"', comment:'가운데 글자만 뽑은 모습.'},
      {formula:'=IF(MID(C1,3,1)="9", "9팀", "기타")', result:'→ "기타"', comment:'3번째가 9가 아니므로 "기타".'},
    ]
  },
  problems:[
    {lv:0,q:'가운데 글자를 뽑는 안쪽 함수를 고르세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'IF'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:'('},{t:'lit',v:'C1'},{t:'txt',v:',3,1)="2", '},{t:'lit',v:'"2팀"'},{t:'txt',v:', '},{t:'lit',v:'"기타"'},{t:'txt',v:')'}],
     blocks:['MID','LEFT','RIGHT','ROUND'],answer:['MID'],ordered:true,result:'"2팀"',hint:'가운데 글자를 뽑는 함수는 MID예요. 완성: =IF(MID(C1,3,1)=2,2팀,기타)'},
    {lv:1,q:'"A-201"의 3번째 글자를 뽑아야 합니다. MID의 시작 위치와 개수를 순서대로 채우세요. (앞글자=1)',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'IF'},{t:'txt',v:'('},{t:'fn',v:'MID'},{t:'txt',v:'('},{t:'lit',v:'C1'},{t:'txt',v:', '},{t:'slot'},{t:'txt',v:', '},{t:'slot'},{t:'txt',v:')="2", '},{t:'lit',v:'"2팀"'},{t:'txt',v:', '},{t:'lit',v:'"기타"'},{t:'txt',v:')'}],
     blocks:['3','1','2','5'],answer:['3','1'],ordered:true,result:'"2팀"',hint:'A-201에서 A=1, -=2, 2=3. 3번째 글자부터 1글자 → 시작위치=3, 개수=1. 완성: MID(C1, 3, 1)'}
  ]
},
{
  fn:'ROUND+DAVERAGE', title:'— 조건부 평균 반올림 (합성)', oneline:'조건에 맞는 행만 평균 낸 뒤, 그 값을 반올림합니다.',
  desc:'DAVERAGE(데이터, 필드, 조건범위)는 "조건표에 맞는 행만 골라 평균"을 냅니다. 그 결과를 바깥 ROUND가 반올림해요. 조건은 아래 작은 "조건" 표에 적습니다.',
  exF:'=ROUND(DAVERAGE(A1:B6, "점수", D1:D2), 0)', exR:'→ 영업 평균 82.67을 반올림해 83',
  sheet:{head:['A','B'],rows:[['부서','점수'],['영업','82'],['관리','90'],['영업','90'],['관리','60'],['영업','76']],
    crit:{title:'조건 (D1:D2)',head:['D'],rows:[['부서'],['영업']]}},
  learn:{
    oneline:'DAVERAGE로 조건에 맞는 평균을 구하고, ROUND로 반올림합니다.',
    desc:'DAVERAGE는 "조건에 맞는 것만 평균"이에요. 인수가 3개인데 초보자는 이렇게 외우면 쉬워요. ① 데이터(A1:B6): 제목줄까지 포함한 표 전체 ② 필드("점수"): 평균 낼 열 이름 ③ 조건범위(D1:D2): 옆에 따로 만든 작은 표(제목 "부서" + 조건 "영업"). 이러면 "영업"인 행들의 점수만 평균 내요. 그 평균(82.67)을 바깥 ROUND가 정수 83으로 반올림합니다. 조건을 옆 표에 적는다는 게 SUMIF와 다른 점이에요.',
    syntax:'=ROUND( DAVERAGE(데이터, "필드", 조건범위), 자릿수 )',
    params:[
      {name:'데이터', desc:'제목줄 포함 표 전체 (예: A1:B6)'},
      {name:'"필드"', desc:'평균 낼 열의 제목 (예: "점수")'},
      {name:'조건범위', desc:'옆에 만든 조건 표 (예: D1:D2 — 제목+조건)'},
    ],
    absTip:'DAVERAGE는 조건을 수식 안이 아니라 "옆의 작은 표(조건범위)"에 적어요. 제목("부서")과 값("영업")을 위아래로 쓰면 됩니다. 이게 D로 시작하는 데이터베이스 함수들의 공통 규칙이에요.',
    examples:[
      {formula:'=ROUND(DAVERAGE(A1:B6, "점수", D1:D2), 0)', result:'→ 83', comment:'영업 평균 82.67 → 정수 83.'},
      {formula:'=DAVERAGE(A1:B6, "점수", D1:D2)', result:'→ 82.67', comment:'반올림 전 조건부 평균.'},
      {formula:'=ROUND(DAVERAGE(A1:B6, "점수", D1:D2), 1)', result:'→ 82.7', comment:'소수 첫째 자리까지 반올림.'},
    ]
  },
  problems:[
    {lv:0,q:'조건(영업)에 맞는 평균을 구하는 안쪽 함수를 고르세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'ROUND'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:'('},{t:'lit',v:'A1:B6'},{t:'txt',v:', '},{t:'lit',v:'"점수"'},{t:'txt',v:', '},{t:'lit',v:'D1:D2'},{t:'txt',v:'), '},{t:'lit',v:'0'},{t:'txt',v:')'}],
     blocks:['DAVERAGE','AVERAGE','SUMIF','COUNTIF'],answer:['DAVERAGE'],ordered:true,result:'83',hint:'조건에 맞는 행만 평균 내는 함수는 DAVERAGE예요. 완성: =ROUND(DAVERAGE(A1:B6,점수,D1:D2), 0)'},
    {lv:1,q:'DAVERAGE의 세 인수를 순서대로 채우세요. 표 전체 → 평균 낼 열 이름 → 조건 표.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'ROUND'},{t:'txt',v:'('},{t:'fn',v:'DAVERAGE'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:', '},{t:'slot'},{t:'txt',v:', '},{t:'slot'},{t:'txt',v:'), '},{t:'lit',v:'0'},{t:'txt',v:')'}],
     blocks:['A1:B6','"점수"','D1:D2','B1:B6'],answer:['A1:B6','"점수"','D1:D2'],ordered:true,result:'83',hint:'DAVERAGE 인수 순서: 1)전체 표(A1:B6) 2)열 이름(점수) 3)조건 표(D1:D2). 완성: DAVERAGE(A1:B6, 점수, D1:D2)'}
  ]
},
{
  fn:'CHOOSE+MID', title:'— 코드로 이름 바꾸기 (합성)', oneline:'코드 속 숫자를 뽑아, 그 번호에 해당하는 이름을 고릅니다.',
  desc:'MID로 코드 가운데 숫자를 뽑고, 그 숫자를 CHOOSE의 번호로 써서 1번="월", 2번="화"처럼 골라줍니다.',
  exF:'=CHOOSE(MID(C1,2,1), "월","화","수")', exR:'→ "D2일"의 2번째가 2 → "화"',
  sheet:{head:['C'],rows:[['D2일']]},
  learn:{
    oneline:'MID로 뽑은 숫자를 CHOOSE의 순번으로 넘겨, 그 자리의 이름을 고릅니다.',
    desc:'두 함수가 이어달리기를 해요. ① MID(C1,2,1)이 "D2일"에서 2번째 글자 "2"를 뽑아요. ② 그 "2"가 CHOOSE의 번호가 되어 CHOOSE(2, "월","화","수")처럼 작동, 2번째인 "화"를 골라줘요. 즉 "코드에서 숫자를 꺼낸다 → 그 번호의 이름을 고른다"는 흐름이에요. CHOOSE는 1번부터 세니까 숫자 1이면 첫 번째, 2면 두 번째가 나와요.',
    syntax:'=CHOOSE( MID(코드,위치,1), 값1, 값2, 값3 )',
    params:[
      {name:'MID(코드,위치,1)', desc:'코드에서 번호로 쓸 숫자 한 글자를 뽑음'},
      {name:'값1, 값2, ...', desc:'번호에 해당하는 후보들 (1번=값1, 2번=값2)'},
    ],
    absTip:'MID가 꺼낸 숫자가 CHOOSE의 "몇 번째"가 돼요. "2"가 나오면 두 번째 값이 골라집니다. 코드 규칙에 따라 요일·분류·이름 등을 자동으로 바꿀 때 아주 편해요.',
    examples:[
      {formula:'=CHOOSE(MID(C1,2,1), "월","화","수")', result:'→ "화"', comment:'2번째 글자 "2" → 2번째 값 "화".'},
      {formula:'=MID(C1,2,1)', result:'→ "2"', comment:'CHOOSE에 넘길 번호를 뽑은 모습.'},
      {formula:'=CHOOSE(1, "월","화","수")', result:'→ "월"', comment:'번호가 1이면 첫 번째 값.'},
    ]
  },
  problems:[
    {lv:0,q:'코드에서 번호로 쓸 숫자를 뽑는 안쪽 함수를 고르세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'CHOOSE'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:'('},{t:'lit',v:'C1'},{t:'txt',v:',2,1), '},{t:'lit',v:'"월","화","수"'},{t:'txt',v:')'}],
     blocks:['MID','LEFT','RIGHT','ROUND'],answer:['MID'],ordered:true,result:'"화"',hint:'코드에서 숫자를 뽑아 CHOOSE의 번호로 넘기는 함수는 MID예요. 완성: =CHOOSE(MID(C1,2,1),월,화,수)'},
    {lv:1,q:'"D2일"의 2번째 글자는 "2"예요. CHOOSE는 1번부터 셉니다. 1번째와 2번째 값을 순서대로 채우세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'CHOOSE'},{t:'txt',v:'('},{t:'fn',v:'MID'},{t:'txt',v:'('},{t:'lit',v:'C1'},{t:'txt',v:',2,1), '},{t:'slot'},{t:'txt',v:', '},{t:'slot'},{t:'txt',v:', '},{t:'lit',v:'"수"'},{t:'txt',v:')'}],
     blocks:['"월"','"화"','"수"','"목"'],answer:['"월"','"화"'],ordered:true,result:'"화"',hint:'CHOOSE는 1번부터 세요. 1번째=월, 2번째=화로 채웁니다. 완성: CHOOSE(MID(C1,2,1), 월, 화, 수)'},
    {lv:1,tag:'보충',q:'"D2일"의 2번째 숫자로 이름을 고릅니다. 바깥·안쪽 함수와 MID 시작 위치를 순서대로 채우세요.',
     tokens:[{t:'txt',v:'='},{t:'slot'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:'('},{t:'lit',v:'C1'},{t:'txt',v:', '},{t:'slot'},{t:'txt',v:', 1), '},{t:'lit',v:'"월","화","수"'},{t:'txt',v:')'}],
     blocks:['CHOOSE','MID','2','LEFT'],answer:['CHOOSE','MID','2'],ordered:true,result:'"화"',hint:'바깥=CHOOSE, 안쪽=MID, MID 시작위치=2(두 번째 글자). 완성: =CHOOSE(MID(C1, 2, 1),월,화,수)'}
  ]
},
{
  fn:'ROUNDDOWN+AVERAGE', title:'— 평균 내림 (합성)', oneline:'평균을 구한 뒤, 올리지 않고 버려서 내림합니다.',
  desc:'ROUNDDOWN은 반올림이 아니라 무조건 "버림(내림)"이에요. 평균 83.5를 ROUND는 84로 올리지만, ROUNDDOWN은 83으로 버립니다.',
  exF:'=ROUNDDOWN(AVERAGE(B1:B4), 0)', exR:'→ 평균 83.5를 내려서 83',
  sheet:{head:['B'],rows:[['81'],['86'],['90'],['77']]},
  learn:{
    oneline:'AVERAGE로 평균을 낸 뒤, ROUNDDOWN으로 소수를 버려 내립니다.',
    desc:'ROUND와 아주 헷갈리는 함수예요. 차이만 기억하면 돼요. ① AVERAGE(B1:B4)가 평균 83.5를 만들어요. ② ROUND라면 반올림해서 84가 되지만, ROUNDDOWN은 "무조건 버림"이라 소수점 아래를 떼고 83이 됩니다. 즉 83.9여도 ROUNDDOWN(…,0)은 83이에요. 나이 계산이나 "몇 개 살 수 있나"처럼 올리면 안 되는 경우에 씁니다.',
    syntax:'=ROUNDDOWN( AVERAGE(범위), 자릿수 )',
    params:[
      {name:'AVERAGE(범위)', desc:'안쪽에서 먼저 평균을 냅니다 (예: 83.5)'},
      {name:'자릿수', desc:'버릴 기준 자리 (0=정수로 내림, 1=소수 첫째까지)'},
    ],
    absTip:'ROUND=반올림(가까운 쪽), ROUNDDOWN=무조건 버림(작은 쪽). 83.5는 ROUND→84, ROUNDDOWN→83. 헷갈리면 "DOWN=내려간다"로 기억하세요.',
    examples:[
      {formula:'=ROUNDDOWN(AVERAGE(B1:B4), 0)', result:'→ 83', comment:'평균 83.5를 버림해 83.'},
      {formula:'=ROUND(AVERAGE(B1:B4), 0)', result:'→ 84', comment:'같은 평균도 ROUND는 84로 올림.'},
      {formula:'=AVERAGE(B1:B4)', result:'→ 83.5', comment:'내림 전 평균값.'},
    ]
  },
  problems:[
    {lv:0,q:'평균을 구하는 안쪽 함수를 고르세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'ROUNDDOWN'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:'('},{t:'lit',v:'B1:B4'},{t:'txt',v:'), '},{t:'lit',v:'0'},{t:'txt',v:')'}],
     blocks:['AVERAGE','ROUND','COUNTIF','MID'],answer:['AVERAGE'],ordered:true,result:'83',hint:'먼저 평균을 내야 해요. 평균 함수는 AVERAGE. 완성: =ROUNDDOWN(AVERAGE(B1:B4), 0)'},
    {lv:1,q:'평균 83.5를 "올리지 않고 버려서" 83으로 만들려 합니다. 바깥 함수를 고르세요. (ROUND와 헷갈리지 마세요!)',
     tokens:[{t:'txt',v:'='},{t:'slot'},{t:'txt',v:'('},{t:'fn',v:'AVERAGE'},{t:'txt',v:'('},{t:'lit',v:'B1:B4'},{t:'txt',v:'), '},{t:'lit',v:'0'},{t:'txt',v:')'}],
     blocks:['ROUNDDOWN','ROUND','AVERAGE','SUMIF'],answer:['ROUNDDOWN'],ordered:true,result:'83',hint:'ROUND=반올림(83.5→84), ROUNDDOWN=버림(83.5→83). 버리는 건 ROUNDDOWN! 완성: =ROUNDDOWN(AVERAGE(B1:B4), 0)'}
  ]
},
{
  fn:'DSUM', title:'— 조건부 합계 (DB 함수)', oneline:'옆의 조건 표에 맞는 행만 골라 합계를 냅니다.',
  desc:'DSUM(데이터, 필드, 조건범위) — SUMIF와 목적은 같지만, 조건을 수식 안이 아니라 "옆의 작은 조건 표"에 적어요. 데이터베이스(D) 함수의 대표주자입니다.',
  exF:'=DSUM(A1:B6, "점수", D1:D2)', exR:'→ 영업인 행의 점수 합계 248',
  sheet:{head:['A','B'],rows:[['부서','점수'],['영업','82'],['관리','90'],['영업','90'],['관리','60'],['영업','76']],
    crit:{title:'조건 (D1:D2)',head:['D'],rows:[['부서'],['영업']]}},
  learn:{
    oneline:'조건 표에 맞는 행만 골라 지정한 열의 값을 모두 더합니다.',
    desc:'DSUM은 SUMIF의 사촌이에요. 목적("조건에 맞는 것만 합계")은 같지만 쓰는 법이 달라요. ① 데이터(A1:B6): 제목줄 포함 표 전체 ② 필드("점수"): 더할 열의 제목 ③ 조건범위(D1:D2): 옆에 따로 만든 조건 표(제목 "부서" + 값 "영업"). 이러면 "영업"인 행들의 점수만 더해 248이 나와요. 조건을 "옆 표"에 적는 게 핵심이라, 조건이 여러 개일 때 특히 편리합니다.',
    syntax:'=DSUM( 데이터, "필드", 조건범위 )',
    params:[
      {name:'데이터', desc:'제목줄 포함 표 전체 (예: A1:B6)'},
      {name:'"필드"', desc:'합계 낼 열의 제목 (예: "점수")'},
      {name:'조건범위', desc:'옆에 만든 조건 표 (예: D1:D2 — 제목 + 조건값)'},
    ],
    absTip:'SUMIF는 조건을 수식 안("영업")에 쓰고, DSUM은 조건을 옆의 표(D1:D2)에 써요. D로 시작하는 함수(DSUM·DAVERAGE·DCOUNT)는 모두 이 "조건 표" 방식을 씁니다.',
    examples:[
      {formula:'=DSUM(A1:B6, "점수", D1:D2)', result:'→ 248', comment:'영업 점수 82+90+76의 합.'},
      {formula:'=DSUM(A1:B6, "점수", D1:D2)  (조건=관리)', result:'→ 150', comment:'조건 표를 "관리"로 바꾸면 90+60.'},
      {formula:'=SUMIF(A2:A6, "영업", B2:B6)', result:'→ 248', comment:'같은 결과를 SUMIF로 쓴 모습.'},
    ]
  },
  problems:[
    {lv:0,q:'옆 조건 표(영업)에 맞는 점수만 더하는 함수를 고르세요.',
     tokens:[{t:'txt',v:'='},{t:'slot'},{t:'txt',v:'('},{t:'lit',v:'A1:B6'},{t:'txt',v:', '},{t:'lit',v:'"점수"'},{t:'txt',v:', '},{t:'lit',v:'D1:D2'},{t:'txt',v:')'}],
     blocks:['DSUM','SUMIF','DAVERAGE','COUNTIF'],answer:['DSUM'],ordered:true,result:'248',hint:'옆의 조건 표에 맞는 행만 합계 내는 함수는 DSUM이에요. 완성: =DSUM(A1:B6,점수,D1:D2)'},
    {lv:1,q:'DSUM의 세 인수를 순서대로 채우세요. 표 전체 → 더할 열 이름 → 조건 표.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'DSUM'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:', '},{t:'slot'},{t:'txt',v:', '},{t:'slot'},{t:'txt',v:')'}],
     blocks:['A1:B6','"점수"','D1:D2','B2:B6'],answer:['A1:B6','"점수"','D1:D2'],ordered:true,result:'248',hint:'DSUM 인수 순서: 1)제목포함 전체(A1:B6) 2)열 이름(점수) 3)조건 표(D1:D2). 완성: DSUM(A1:B6, 점수, D1:D2)'},
    {lv:1,tag:'보충',q:'같은 결과를 SUMIF로도 만들 수 있어요. 조건 범위·조건·합계 범위를 순서대로 채우세요. (조건을 수식 안에!)',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'SUMIF'},{t:'txt',v:'('},{t:'slot'},{t:'txt',v:', '},{t:'slot'},{t:'txt',v:', '},{t:'slot'},{t:'txt',v:')'}],
     blocks:['A2:A6','"영업"','B2:B6','D1:D2'],answer:['A2:A6','"영업"','B2:B6'],ordered:true,result:'248',hint:'SUMIF 순서: 조건범위(A2:A6) → 조건(영업) → 합계범위(B2:B6). 제목줄 제외! 완성: =SUMIF(A2:A6,영업,B2:B6)'}
  ]
},
{
  fn:'SUMIF÷COUNTIF', title:'— 조건부 평균 직접 계산 (합성)', oneline:'조건에 맞는 합계를 개수로 나눠 평균을 직접 구합니다.',
  desc:'평균 = 합계 ÷ 개수. SUMIF로 조건에 맞는 합계를, COUNTIF로 그 개수를 구해 나누면 "조건부 평균"이 됩니다. AVERAGEIF가 없던 시절의 방법이자, 평균의 원리를 보여주는 조합이에요.',
  exF:'=SUMIF(A2:A6,"영업",B2:B6) / COUNTIF(A2:A6,"영업")', exR:'→ 246 ÷ 3 = 82',
  sheet:{head:['A','B'],rows:[['부서','점수'],['영업','80'],['관리','90'],['영업','76'],['관리','60'],['영업','90']]},
  learn:{
    oneline:'SUMIF(조건 합계)를 COUNTIF(조건 개수)로 나눠 조건부 평균을 만듭니다.',
    desc:'"평균은 합계를 개수로 나눈 것"이라는 원리를 그대로 수식으로 옮긴 거예요. ① SUMIF(A2:A6,"영업",B2:B6)가 영업 점수의 합 246을 구하고 ② COUNTIF(A2:A6,"영업")가 영업의 인원 수 3을 세요. ③ 246 ÷ 3 = 82. 두 함수를 나누기(/)로 이으면 "영업의 평균 점수"가 됩니다. 조건이 같아야(둘 다 "영업") 올바른 평균이 나와요.',
    syntax:'=SUMIF(범위,조건,합계범위) / COUNTIF(범위,조건)',
    params:[
      {name:'SUMIF(...)', desc:'조건에 맞는 값들의 합계 (예: 영업 점수 합 246)'},
      {name:'/ (나누기)', desc:'합계를 개수로 나누는 연산자'},
      {name:'COUNTIF(...)', desc:'조건에 맞는 칸의 개수 (예: 영업 3명)'},
    ],
    absTip:'평균 = 합계 ÷ 개수. 그래서 SUMIF ÷ COUNTIF 예요. 두 함수의 조건("영업")과 범위(A2:A6)는 반드시 똑같이 맞춰야 정확한 평균이 나옵니다.',
    examples:[
      {formula:'=SUMIF(A2:A6,"영업",B2:B6) / COUNTIF(A2:A6,"영업")', result:'→ 82', comment:'합 246 ÷ 개수 3 = 82.'},
      {formula:'=SUMIF(A2:A6,"영업",B2:B6)', result:'→ 246', comment:'영업 점수의 합계 부분.'},
      {formula:'=COUNTIF(A2:A6,"영업")', result:'→ 3', comment:'영업 인원 수(개수) 부분.'},
    ]
  },
  problems:[
    {lv:0,q:'영업 점수의 "합계"를 구하는 함수를 나누기 앞자리에 넣으세요.',
     tokens:[{t:'txt',v:'='},{t:'slot'},{t:'txt',v:'('},{t:'lit',v:'A2:A6'},{t:'txt',v:',"영업",'},{t:'lit',v:'B2:B6'},{t:'txt',v:') / '},{t:'fn',v:'COUNTIF'},{t:'txt',v:'('},{t:'lit',v:'A2:A6'},{t:'txt',v:',"영업")'}],
     blocks:['SUMIF','COUNTIF','DSUM','AVERAGE'],answer:['SUMIF'],ordered:true,result:'82',hint:'평균 = 합계 ÷ 개수. 합계를 구하는 SUMIF를 나누기(/) 앞에 넣어요. 완성: =SUMIF(A2:A6,영업,B2:B6) / COUNTIF(A2:A6,영업)'},
    {lv:1,q:'평균은 "합계 ÷ 개수"예요. 합계와 개수 사이에 들어갈 연산자를 고르세요.',
     tokens:[{t:'txt',v:'='},{t:'fn',v:'SUMIF'},{t:'txt',v:'('},{t:'lit',v:'A2:A6'},{t:'txt',v:',"영업",'},{t:'lit',v:'B2:B6'},{t:'txt',v:') '},{t:'slot'},{t:'txt',v:' '},{t:'fn',v:'COUNTIF'},{t:'txt',v:'('},{t:'lit',v:'A2:A6'},{t:'txt',v:',"영업")'}],
     blocks:['/','*','+','-'],answer:['/'],ordered:true,result:'82',hint:'합계를 개수로 나눠야 평균이에요. 나누기 연산자는 / 예요. 완성: SUMIF(...) / COUNTIF(...)'},
    {lv:1,tag:'보충',q:'조건부 평균을 완성하세요. 합계 함수 → 개수 함수를 순서대로 채우세요. (평균 = 합계 ÷ 개수)',
     tokens:[{t:'txt',v:'='},{t:'slot'},{t:'txt',v:'('},{t:'lit',v:'A2:A6'},{t:'txt',v:',"영업",'},{t:'lit',v:'B2:B6'},{t:'txt',v:') / '},{t:'slot'},{t:'txt',v:'('},{t:'lit',v:'A2:A6'},{t:'txt',v:',"영업")'}],
     blocks:['SUMIF','COUNTIF','DSUM','MID'],answer:['SUMIF','COUNTIF'],ordered:true,result:'82',hint:'앞=SUMIF(합계), 뒤=COUNTIF(개수). 평균 = 합계 ÷ 개수! 완성: =SUMIF(A2:A6,영업,B2:B6) / COUNTIF(A2:A6,영업)'}
  ]
}
]
