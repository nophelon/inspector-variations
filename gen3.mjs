import { writeFileSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
const OUT = '/tmp/claude-1000/-home-nophelon-ai-web-saas/4c2df346-aab5-475a-be90-b87dca5932f7/scratchpad/inspector-variations';
mkdirSync(OUT, { recursive: true });
for (const f of readdirSync(OUT)) if (/^(v[1-6]|n[1-5]|f[1-5]|index)\.html$/.test(f)) rmSync(`${OUT}/${f}`);

// 굵은 라인 아이콘(레퍼런스처럼 stroke 2, 라운드). 24px.
const sw = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
const I = {
  layers:`<svg viewBox="0 0 24 24" ${sw}><path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z"/><path d="m3.5 12 8.5 4.5 8.5-4.5"/><path d="m3.5 16.5 8.5 4.5 8.5-4.5"/></svg>`,
  image:`<svg viewBox="0 0 24 24" ${sw}><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="8.5" cy="9.5" r="1.8"/><path d="m4 18 5.5-5 4 4 2.5-2.5 4 3.5"/></svg>`,
  video:`<svg viewBox="0 0 24 24" ${sw}><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10.5 9.2v5.6l4.5-2.8-4.5-2.8Z"/></svg>`,
  palette:`<svg viewBox="0 0 24 24" ${sw}><circle cx="12" cy="12" r="9"/><circle cx="8.3" cy="10" r="1.1"/><circle cx="15.7" cy="10" r="1.1"/><circle cx="12" cy="15.2" r="1.1"/></svg>`,
  phone:`<svg viewBox="0 0 24 24" ${sw}><rect x="6.5" y="2.5" width="11" height="19" rx="3.2"/><path d="M10.5 18.3h3"/></svg>`,
  chev:`<svg viewBox="0 0 24 24" ${sw}><path d="m6 9 6 6 6-6"/></svg>`,
  home:`<svg viewBox="0 0 24 24" ${sw}><path d="M4 11.5 12 4l8 7.5"/><path d="M6 10.5V20h12v-9.5"/></svg>`,
  grid:`<svg viewBox="0 0 24 24" ${sw}><rect x="4" y="4" width="7" height="7" rx="1.6"/><rect x="13" y="4" width="7" height="7" rx="1.6"/><rect x="4" y="13" width="7" height="7" rx="1.6"/><rect x="13" y="13" width="7" height="7" rx="1.6"/></svg>`,
  clock:`<svg viewBox="0 0 24 24" ${sw}><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>`,
  gear:`<svg viewBox="0 0 24 24" ${sw}><path d="M12 3.5 19 7.5v8l-7 4-7-4v-8l7-4Z"/><circle cx="12" cy="11.5" r="2.6"/></svg>`,
  type:`<svg viewBox="0 0 24 24" ${sw}><path d="M5 6h14M5 12h14M5 18h9"/></svg>`,
  collapse:`<svg viewBox="0 0 24 24" ${sw}><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><path d="M13 8l-4 4 4 4"/></svg>`,
  plus:`<svg viewBox="0 0 24 24" ${sw}><path d="M12 6v12M6 12h12"/></svg>`,
};

// 레퍼런스 충실 재현 베이스: 떠있는 카드·굵은 블랙아이콘·라임 풀pill·세로연결선·흰 선택pill·넉넉한 간격·토글.
const BASE = `
*{box-sizing:border-box}
:root{
  --accent:#BFFF6B;--on-accent:#12210A;
  --page1:#ECEDF4;--page2:#E4E2EF;
  --panel:#FFFFFF;--panel-2:#F4F5F8;--ink:#171922;--label:#9AA0AC;--line:#E9EBEF;
  --sel:#FFFFFF;--sel-sh:0 2px 8px rgba(23,25,34,.10),0 0 0 1px rgba(23,25,34,.04);
  --panel-sh:0 24px 60px rgba(40,40,80,.14),0 4px 14px rgba(40,40,80,.06);
  --connector:#D7DAE1;--badge:#F0453F;--hover:#F3F4F7;
  --font:-apple-system,BlinkMacSystemFont,"Pretendard","Apple SD Gothic Neo","Segoe UI",sans-serif}
@media (prefers-color-scheme:dark){:root{
  --page1:#101014;--page2:#050507;--panel:#0C0C0F;--panel-2:#151519;--ink:#F3F4F6;--label:#6E7480;--line:#1E1F25;
  --sel:#1C1D22;--sel-sh:0 2px 8px rgba(0,0,0,.5),inset 0 0 0 1px #262730;
  --panel-sh:0 30px 70px rgba(0,0,0,.6);--connector:#2A2C33;--hover:#17181D}}
:root[data-theme=light]{--page1:#ECEDF4;--page2:#E4E2EF;--panel:#FFFFFF;--panel-2:#F4F5F8;--ink:#171922;--label:#9AA0AC;--line:#E9EBEF;--sel:#FFFFFF;--sel-sh:0 2px 8px rgba(23,25,34,.10),0 0 0 1px rgba(23,25,34,.04);--panel-sh:0 24px 60px rgba(40,40,80,.14),0 4px 14px rgba(40,40,80,.06);--connector:#D7DAE1;--hover:#F3F4F7}
:root[data-theme=dark]{--page1:#101014;--page2:#050507;--panel:#0C0C0F;--panel-2:#151519;--ink:#F3F4F6;--label:#6E7480;--line:#1E1F25;--sel:#1C1D22;--sel-sh:0 2px 8px rgba(0,0,0,.5),inset 0 0 0 1px #262730;--panel-sh:0 30px 70px rgba(0,0,0,.6);--connector:#2A2C33;--hover:#17181D}
body{margin:0;font-family:var(--font);background:linear-gradient(140deg,var(--page1),var(--page2));color:var(--ink);-webkit-font-smoothing:antialiased;min-height:100vh}
svg{width:22px;height:22px;display:block}
.page{min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:34px 16px 70px}
.cap{max-width:420px;text-align:center;margin-bottom:16px}
.cap .n b{background:var(--accent);color:var(--on-accent);padding:2px 9px;border-radius:999px;font-size:11px;font-weight:800;letter-spacing:.06em;margin-right:7px}
.cap .n span{font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--label)}
.cap h1{font-size:19px;font-weight:750;margin:9px 0 5px}
.cap p{margin:0;color:var(--label);font-size:13px;line-height:1.55}
.bar{display:flex;gap:8px;align-items:center;margin:16px 0 24px;flex-wrap:wrap;justify-content:center}
.nav{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}
.nav a{font-size:12px;font-weight:600;text-decoration:none;color:var(--label);border:1px solid var(--line);background:var(--panel);padding:6px 11px;border-radius:999px}
.nav a.on{background:var(--accent);color:var(--on-accent);border-color:var(--accent)}
.tg{display:inline-flex;background:var(--panel);border:1px solid var(--line);border-radius:999px;padding:3px}
.tg button{border:0;background:transparent;color:var(--label);font-size:12px;font-weight:700;padding:5px 12px;border-radius:999px;cursor:pointer;font-family:var(--font)}
.tg button.on{background:var(--accent);color:var(--on-accent)}
/* 패널(떠있는 카드) */
.panel{width:340px;max-width:100%;background:var(--panel);border-radius:26px;box-shadow:var(--panel-sh);overflow:hidden}
.ph{display:flex;align-items:center;justify-content:space-between;padding:20px 22px 16px}
.ph .wm{display:flex;align-items:center;gap:11px}
.ph .wm .lg{color:var(--ink)}
.ph .wm b{font-size:16px;font-weight:800;letter-spacing:.02em}
.ph .wm small{display:block;font-size:11px;font-weight:600;color:var(--label);letter-spacing:0}
.sw{width:46px;height:26px;border-radius:999px;background:var(--panel-2);border:1px solid var(--line);position:relative;cursor:pointer;flex:0 0 auto}
.sw::after{content:"";position:absolute;top:2px;left:2px;width:20px;height:20px;border-radius:50%;background:var(--accent);transition:left .2s}
:root[data-theme=dark] .sw::after,@media (prefers-color-scheme:dark){.sw::after{left:22px}}
.pdiv{height:1px;background:var(--line);margin:0 22px}
.pb{padding:12px 16px 20px}
.lab{font-size:12px;font-weight:650;color:var(--label);letter-spacing:.04em;margin:14px 10px 8px}
/* 공통 nav 행 */
.item{display:flex;align-items:center;gap:14px;padding:13px 16px;border-radius:999px;cursor:pointer;color:var(--ink);font-size:14.5px;font-weight:600;border:0;background:transparent;width:100%;text-align:left;font-family:var(--font)}
.item:hover{background:var(--hover)}
.item .ic{color:var(--ink);flex:0 0 auto}
.item .cv{margin-left:auto;color:var(--label);transition:transform .2s}
.item.active{background:var(--accent);color:var(--on-accent)}
.item.active .ic,.item.active .cv{color:var(--on-accent)}
.item.open .cv{transform:rotate(180deg)}
/* 하위(연결선 트리) */
.subs{position:relative;margin:4px 0 6px 26px;padding-left:18px;display:none}
.open + .subs,.subs.show{display:block}
.subs::before{content:"";position:absolute;left:0;top:6px;bottom:14px;width:1.5px;background:var(--connector)}
.sub{display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:999px;cursor:pointer;font-size:13.5px;font-weight:550;color:var(--ink);opacity:.86}
.sub .ic{width:19px;height:19px}.sub:hover{opacity:1}
.sub.sel{background:var(--sel);box-shadow:var(--sel-sh);opacity:1;font-weight:650}
/* 상세 컨트롤(선택 항목 아래) */
.ctl{margin:8px 10px 2px 44px;display:flex;flex-direction:column;gap:12px}
.fl{font-size:12px;font-weight:650;color:var(--label);margin-bottom:7px}.fl .s{float:right;font-weight:600;color:var(--ink);display:inline-flex;align-items:center;gap:5px}
.inp{width:100%;font-family:var(--font);font-size:13px;padding:11px 13px;border:1px solid var(--line);border-radius:13px;background:var(--panel-2);color:var(--ink)}
.inp:focus{outline:2px solid var(--accent);outline-offset:1px}
.row{display:flex;gap:8px}
.btn{font-family:var(--font);font-size:13px;font-weight:700;padding:11px 15px;border-radius:13px;border:0;cursor:pointer}
.btn.p{background:var(--accent);color:var(--on-accent);flex:1}.btn.g{background:var(--panel-2);color:var(--ink)}
.pill2{display:inline-flex;background:var(--panel-2);border-radius:999px;padding:4px;gap:4px}
.pill2 button{font-family:var(--font);font-size:12.5px;font-weight:650;padding:7px 18px;border:0;border-radius:999px;background:transparent;color:var(--label);cursor:pointer}
.pill2 button.on{background:var(--accent);color:var(--on-accent)}
.dot{width:7px;height:7px;border-radius:50%;background:#3DCB73;display:inline-block}.dot.w{background:#F3A63A;animation:pz 1.4s infinite}@keyframes pz{50%{opacity:.4}}
.hint{font-size:11.5px;color:var(--label);margin:2px 0 0}
.sv{position:relative;width:100%;height:116px;border-radius:13px;cursor:crosshair;background:linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,var(--accent))}
.sv i{position:absolute;top:16%;left:76%;width:13px;height:13px;border-radius:50%;background:#fff;border:2px solid #171922;transform:translate(-50%,-50%)}
.hue{height:11px;border-radius:999px;margin-top:9px;background:linear-gradient(to right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00);position:relative}
.hue i{position:absolute;top:50%;left:30%;width:15px;height:15px;border-radius:50%;background:#fff;border:2px solid #475569;transform:translate(-50%,-50%)}
/* 아이콘 레일(듀얼용) */
.wrap2{display:flex;gap:16px;align-items:flex-start}
.rail{width:72px;flex:0 0 auto;background:var(--panel);border-radius:26px;box-shadow:var(--panel-sh);padding:16px 0;display:flex;flex-direction:column;align-items:center;gap:10px}
.rail .ri{width:44px;height:44px;border-radius:14px;display:grid;place-items:center;color:var(--ink);cursor:pointer}
.rail .ri:hover{background:var(--hover)}
.rail .ri.on{background:var(--accent);color:var(--on-accent);border-radius:999px}
.rail .rl{flex:1;width:1.5px;background:var(--connector);margin:6px 0}
`;

// 공통: 동영상 상세 컨트롤 블록
const detail = `
<div class="ctl">
  <div><label class="fl">동영상 링크 <span class="s"><span class="dot"></span> 연결됨</span></label><input class="inp" value="https://youtu.be/v-ALMSlqyy0"></div>
  <div class="row"><button class="btn p">넣기</button><button class="btn g">빼기</button></div>
  <div><div class="fl">화면 맞춤</div><div class="pill2"><button>세로</button><button class="on">가로</button></div></div>
  <p class="hint">링크(임베드)만 가능 · 파일 업로드 미지원.</p>
</div>`;

// 배경 섹션(공통): active pill + 하위 트리 + 상세
function bgSection(){ return `
<button class="item active open">${I.layers}<span>배경</span><span class="cv">${I.chev}</span></button>
<div class="subs show">
  <div class="sub">${I.image}<span>이미지</span></div>
  <div class="sub sel">${I.video}<span>동영상</span></div>
  <div class="sub">${I.palette}<span>색상</span></div>
</div>
${detail}`; }

function mobileRow(){ return `<button class="item">${I.phone}<span>모바일 전용 영상</span><span class="cv">${I.chev}</span></button>`; }
function colorRow(){ return `<button class="item">${I.palette}<span>배경 색</span><span class="cv">${I.chev}</span></button>`; }

const V = [
  { id:'f1', name:'충실 재현', tag:'image3 그대로',
    desc:'레퍼런스 Datasets 패턴 그대로 — "배경"이 라임 풀 pill(안쪽 ⌄), 하위 이미지/동영상/색상은 세로 연결선 트리, 동영상이 흰 선택 pill. 아래 상세.',
    extra:``,
    body:(p)=>`<div class="pb">${bgSection()}${mobileRow()}${colorRow()}</div>` },
  { id:'f2', name:'아이콘 레일 + 패널', tag:'듀얼(풀 재현)',
    desc:'레퍼런스의 "얇은 아이콘 레일 + 패널" 2단 구조를 그대로. 왼쪽 레일(배경 활성=라임 원), 오른쪽 패널에 트리.',
    dual:true,
    body:(p)=>`<div class="pb">${bgSection()}${mobileRow()}${colorRow()}</div>` },
  { id:'f3', name:'섹션 라벨 그룹', tag:'2열 느낌',
    desc:'레퍼런스의 "Agents/Signals" 회색 섹션 라벨 구조. 콘텐츠·맞춤·고급을 라벨로 나눠 더 정돈.',
    body:(p)=>`<div class="pb">
      <div class="lab">콘텐츠</div>
      <button class="item active open">${I.layers}<span>배경 · 동영상</span><span class="cv">${I.chev}</span></button>
      <div class="subs show"><div class="sub">${I.image}<span>이미지</span></div><div class="sub sel">${I.video}<span>동영상</span></div><div class="sub">${I.palette}<span>색상</span></div></div>
      ${detail}
      <div class="pdiv" style="margin:16px 12px"></div>
      <div class="lab">그 외</div>
      ${mobileRow()}${colorRow()}
    </div>` },
  { id:'f4', name:'3섹션 피어', tag:'미니멀',
    desc:'배경·모바일영상·배경색을 동급 아코디언 행으로. 하나만 라임 활성, 나머지는 차분한 행. 가장 담백.',
    body:(p)=>`<div class="pb">
      <button class="item active open">${I.layers}<span>배경</span><span class="cv">${I.chev}</span></button>
      <div class="subs show"><div class="sub">${I.image}<span>이미지</span></div><div class="sub sel">${I.video}<span>동영상</span></div><div class="sub">${I.palette}<span>색상</span></div></div>
      ${detail}
      ${mobileRow()}${colorRow()}
    </div>` },
  { id:'f5', name:'컴팩트', tag:'고밀도',
    desc:'충실 재현을 좁은 화면용으로 간격·크기만 압축. 라임 pill·연결선·흰 선택 pill 유지.',
    extra:`.panel{width:312px}.item{padding:10px 13px;font-size:13.5px;gap:11px}.item svg{width:20px;height:20px}.ph{padding:16px 18px 13px}.pb{padding:10px 12px 16px}.ctl{margin-left:38px;gap:10px}.sub{padding:9px 12px;font-size:13px}.inp{padding:9px 11px}.btn{padding:9px 13px}`,
    body:(p)=>`<div class="pb">${bgSection()}${mobileRow()}${colorRow()}</div>` },
];

const script = `<script>function setT(t){document.documentElement.setAttribute('data-theme',t);document.querySelectorAll('.tg button').forEach(b=>b.classList.toggle('on',b.dataset.t===t));}</script>`;
function navHtml(cur){return `<div class="nav"><a href="index.html">목록</a>`+V.map(v=>`<a href="${v.id}.html" class="${v.id===cur?'on':''}">${v.id.toUpperCase()} ${v.name}</a>`).join('')+`</div>`;}

function panelHtml(v){
  const head = `<div class="ph"><div class="wm"><span class="lg">${I.collapse}</span><span><b>배경 설정</b><small>히어로 섹션</small></span></div><span class="sw" aria-hidden="true"></span></div><div class="pdiv"></div>`;
  const panel = `<div class="panel">${head}${v.body(v)}</div>`;
  if (v.dual) {
    const rail = `<div class="rail"><div class="ri">${I.collapse}</div><div class="ri on">${I.layers}</div><div class="ri">${I.type}</div><div class="ri">${I.palette}</div><div class="rl"></div><div class="ri">${I.gear}</div></div>`;
    return `<div class="wrap2">${rail}${panel}</div>`;
  }
  return panel;
}

for (const v of V) {
  const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>인스펙터 ${v.id.toUpperCase()} · ${v.name}</title><style>${BASE}${v.extra||''}</style></head>
<body><div class="page">
  <div class="cap"><div class="n"><b>${v.id.toUpperCase()}</b><span>${v.tag}</span></div><h1>${v.name}</h1><p>${v.desc}</p></div>
  <div class="bar">${navHtml(v.id)}<span class="tg"><button data-t="light" class="on" onclick="setT('light')">라이트</button><button data-t="dark" onclick="setT('dark')">다크</button></span></div>
  ${panelHtml(v)}
</div>${script}</body></html>`;
  writeFileSync(`${OUT}/${v.id}.html`, html);
}
const cards = V.map(v=>`<a class="vc" href="${v.id}.html"><div class="vt">${v.id.toUpperCase()}</div><div class="vn">${v.name}</div><div class="vg">${v.tag}</div><p>${v.desc}</p></a>`).join('');
writeFileSync(`${OUT}/index.html`, `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>인스펙터 리디자인 — 레퍼런스 충실 5안 (BFFF6B)</title><style>${BASE}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px;width:100%;max-width:820px}
.vc{display:block;text-decoration:none;color:var(--ink);background:var(--panel);border-radius:18px;padding:18px;box-shadow:var(--panel-sh);transition:transform .15s}
.vc:hover{transform:translateY(-3px)}
.vc .vt{display:inline-block;font-size:11px;font-weight:800;letter-spacing:.07em;background:var(--accent);color:var(--on-accent);padding:2px 9px;border-radius:999px}
.vc .vn{font-size:17px;font-weight:750;margin:9px 0 2px}.vc .vg{font-size:11px;color:var(--label);font-weight:650;margin-bottom:8px}.vc p{font-size:12.5px;color:var(--label);margin:0;line-height:1.55}</style></head>
<body><div class="page">
  <div class="cap"><div class="n"><b>UI</b><span>에디터 우측 패널</span></div><h1>인스펙터 리디자인 — 레퍼런스 충실 5안</h1>
  <p>레퍼런스(떠있는 카드·굵은 블랙아이콘·풀 pill·세로연결선 트리·흰 선택pill)를 정확히 반영. 브랜드 라임 <b style="color:var(--ink)">#BFFF6B</b>. 우상단 라이트/다크.</p></div>
  <div class="bar"><span class="tg"><button data-t="light" class="on" onclick="setT('light')">라이트</button><button data-t="dark" onclick="setT('dark')">다크</button></span></div>
  <div class="grid">${cards}</div>
</div>${script}</body></html>`);
console.log('생성:', V.map(v=>v.id).join(', '), '+ index');
