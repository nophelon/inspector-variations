import { writeFileSync } from 'node:fs';

/* ── 아이콘 (검은 선 아이콘, 레퍼런스 톤) ───────────────────────────── */
const S = (p, sw = 2) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const I = {
  home: S('<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9.5h13V10"/><path d="M10 19.5V14h4v5.5"/>'),
  file: S('<path d="M6 3h8l4 4v14H6Z"/><path d="M14 3v4h4"/>'),
  grip: S('<circle cx="9" cy="6" r="1.1"/><circle cx="15" cy="6" r="1.1"/><circle cx="9" cy="12" r="1.1"/><circle cx="15" cy="12" r="1.1"/><circle cx="9" cy="18" r="1.1"/><circle cx="15" cy="18" r="1.1"/>'),
  minus: S('<path d="M5 12h14"/>'),
  plus: S('<path d="M12 5v14M5 12h14"/>'),
  link: S('<path d="M9.5 14.5 14.5 9.5"/><path d="M8 11 6 13a3.5 3.5 0 0 0 5 5l2-2"/><path d="M16 13l2-2a3.5 3.5 0 0 0-5-5l-2 2"/>'),
  copy: S('<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),
  clock: S('<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/>'),
  gear: S('<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M4.2 7l2.6 1.5M17.2 15.5l2.6 1.5M4.2 17l2.6-1.5M17.2 8.5l2.6-1.5"/>'),
  panel: S('<rect x="3.5" y="4.5" width="17" height="15" rx="3"/><path d="M9 4.5v15"/>'),
  help: S('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7"/><circle cx="12" cy="16.5" r=".6"/>'),
  right: S('<path d="m9 6 6 6-6 6"/>'),
  monitor: S('<rect x="3" y="4.5" width="18" height="12" rx="2.5"/><path d="M8.5 20h7M12 16.5V20"/>'),
  mobile: S('<rect x="7" y="2.5" width="10" height="19" rx="3"/><path d="M10.5 18.5h3"/>'),
  layers: S('<path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z"/><path d="m3.5 12 8.5 4.5 8.5-4.5"/><path d="m3.5 16.5 8.5 4.5 8.5-4.5"/>'),
  image: S('<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="8.5" cy="9.5" r="1.8"/><path d="m4 18 5.5-5 4 4 2.5-2.5 4 3.5"/>'),
  video: S('<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10.5 9.2v5.6l4.5-2.8-4.5-2.8Z"/>'),
  color: S('<circle cx="12" cy="12" r="9"/><circle cx="8.3" cy="10" r="1.1"/><circle cx="15.7" cy="10" r="1.1"/><circle cx="12" cy="15.2" r="1.1"/>'),
  phone: S('<rect x="6.5" y="2.5" width="11" height="19" rx="3.2"/><path d="M10.5 18.3h3"/>'),
  chev: S('<path d="m6 9 6 6 6-6"/>'),
  back: S('<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><path d="M13 8l-4 4 4 4"/>'),
};

const PAGES = [
  { ic: 'home', nm: '홈', on: true, static: true },
  { ic: 'file', nm: '브랜드 소개' },
  { ic: 'file', nm: '연구·기술' },
  { ic: 'file', nm: '제품' },
  { ic: 'file', nm: '적용시험·사례' },
  { ic: 'file', nm: '문의' },
];

/* ── 공통 토큰/기본 CSS ───────────────────────────────────────────── */
const BASE = `
*{box-sizing:border-box}
:root{
  --accent:#D646AC;--on-accent:#FFFFFF;--accent-soft:rgba(214,70,172,.10);--accent-line:rgba(214,70,172,.28);
  --page1:#ECEDF4;--page2:#E4E2EF;
  --app:#FFFFFF;--panel:#FFFFFF;--panel-2:#F4F5F8;--ink:#171922;--ink-2:#5A6072;--label:#9AA0AC;--line:#E9EBEF;
  --sel:#FFFFFF;--sel-sh:0 2px 8px rgba(23,25,34,.10),0 0 0 1px rgba(23,25,34,.05);
  --panel-sh:0 24px 60px rgba(40,40,80,.14),0 4px 14px rgba(40,40,80,.06);
  --app-sh:0 40px 100px rgba(40,40,80,.20),0 8px 24px rgba(40,40,80,.08);
  --connector:#D7DAE1;--hover:#F3F4F7;--canvas:#EEF0F5;
  --font:-apple-system,BlinkMacSystemFont,"Pretendard","Apple SD Gothic Neo","Segoe UI",sans-serif}
@media (prefers-color-scheme:dark){:root{
  --page1:#0C0C10;--page2:#050507;--app:#0C0C0F;--panel:#121216;--panel-2:#1A1B20;--ink:#F3F4F6;--ink-2:#AEB2BD;--label:#6E7480;--line:#232429;
  --sel:#1E1F25;--sel-sh:0 2px 8px rgba(0,0,0,.5),inset 0 0 0 1px #2A2B33;
  --panel-sh:0 30px 70px rgba(0,0,0,.6);--app-sh:0 40px 100px rgba(0,0,0,.7);
  --connector:#2A2C33;--hover:#17181D;--canvas:#0A0A0D;--accent-soft:rgba(214,70,172,.16)}}
:root[data-theme=light]{--page1:#ECEDF4;--page2:#E4E2EF;--app:#FFFFFF;--panel:#FFFFFF;--panel-2:#F4F5F8;--ink:#171922;--ink-2:#5A6072;--label:#9AA0AC;--line:#E9EBEF;--sel:#FFFFFF;--sel-sh:0 2px 8px rgba(23,25,34,.10),0 0 0 1px rgba(23,25,34,.05);--panel-sh:0 24px 60px rgba(40,40,80,.14),0 4px 14px rgba(40,40,80,.06);--app-sh:0 40px 100px rgba(40,40,80,.20),0 8px 24px rgba(40,40,80,.08);--connector:#D7DAE1;--hover:#F3F4F7;--canvas:#EEF0F5;--accent-soft:rgba(214,70,172,.10)}
:root[data-theme=dark]{--page1:#0C0C10;--page2:#050507;--app:#0C0C0F;--panel:#121216;--panel-2:#1A1B20;--ink:#F3F4F6;--ink-2:#AEB2BD;--label:#6E7480;--line:#232429;--sel:#1E1F25;--sel-sh:0 2px 8px rgba(0,0,0,.5),inset 0 0 0 1px #2A2B33;--panel-sh:0 30px 70px rgba(0,0,0,.6);--app-sh:0 40px 100px rgba(0,0,0,.7);--connector:#2A2C33;--hover:#17181D;--canvas:#0A0A0D;--accent-soft:rgba(214,70,172,.16)}
body{margin:0;font-family:var(--font);background:linear-gradient(140deg,var(--page1),var(--page2));color:var(--ink);-webkit-font-smoothing:antialiased;min-height:100vh}
svg{width:20px;height:20px;display:block}
.wrap{min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:26px 16px 60px}
/* 상단 설명 + 베리에이션 전환 */
.cap{max-width:760px;text-align:center;margin-bottom:14px}
.cap .n b{background:var(--accent);color:var(--on-accent);padding:2px 9px;border-radius:999px;font-size:11px;font-weight:800;letter-spacing:.06em;margin-right:7px}
.cap .n span{font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--label)}
.cap h1{font-size:19px;font-weight:750;margin:9px 0 5px}
.cap p{margin:0 auto;color:var(--label);font-size:13px;line-height:1.55;max-width:560px}
.bar{display:flex;gap:10px;align-items:center;margin:14px 0 22px;flex-wrap:wrap;justify-content:center}
.nav{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}
.nav a{font-size:12px;font-weight:600;text-decoration:none;color:var(--label);border:1px solid var(--line);background:var(--panel);padding:6px 11px;border-radius:999px}
.nav a.on{background:var(--accent);color:var(--on-accent);border-color:var(--accent)}
.tg{display:inline-flex;background:var(--panel);border:1px solid var(--line);border-radius:999px;padding:3px}
.tg button{border:0;background:transparent;color:var(--label);font-size:12px;font-weight:700;padding:5px 12px;border-radius:999px;cursor:pointer;font-family:var(--font)}
.tg button.on{background:var(--accent);color:var(--on-accent)}

/* ── 에디터 프레임 ─────────────────────────────────────────────── */
.app{width:100%;max-width:1240px;height:min(760px,calc(100vh - 150px));min-height:560px;background:var(--app);border-radius:20px;box-shadow:var(--app-sh);overflow:hidden;display:flex;flex-direction:column;border:1px solid var(--line)}
/* 상단바 */
.topbar{height:58px;flex:0 0 auto;display:flex;align-items:center;gap:12px;padding:0 16px;border-bottom:1px solid var(--line);background:var(--panel)}
.slogo{width:30px;height:30px;border-radius:9px;background:linear-gradient(135deg,var(--accent),#F06FB6);display:inline-block;flex:0 0 auto;box-shadow:0 2px 6px var(--accent-line)}
.lgm-btn{border:0;background:transparent;padding:4px;border-radius:10px;cursor:pointer;display:flex;align-items:center;gap:7px;color:var(--ink);font-family:var(--font)}
.lgm-btn:hover{background:var(--hover)}
.lgm-btn .caret{color:var(--label)}
.tb-name{font-size:14.5px;font-weight:750;color:var(--ink)}
.tb-crumb{font-size:12.5px;color:var(--label)}.tb-crumb b{color:var(--ink);font-weight:700}
.sp{flex:1}
.device{display:inline-flex;background:var(--panel-2);border-radius:999px;padding:3px;gap:2px}
.device button{border:0;background:transparent;color:var(--label);padding:6px 10px;border-radius:999px;cursor:pointer;display:grid;place-items:center}
.device button.on{background:var(--app);color:var(--accent);box-shadow:0 1px 4px rgba(0,0,0,.1)}
.tb-note{font-size:12px;color:var(--label);display:flex;align-items:center;gap:6px}
.tb-note::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--accent);flex:0 0 auto}
.tbtn{font-family:var(--font);font-size:13px;font-weight:700;padding:8px 15px;border-radius:11px;border:1px solid var(--line);background:var(--panel);color:var(--ink);cursor:pointer}
.tbtn.ghost{background:transparent}
.tbtn.primary{background:var(--accent);color:var(--on-accent);border-color:var(--accent)}
.tbtn.primary:disabled{opacity:.45;cursor:default}

/* 작업영역 3분할 */
.work{flex:1;display:flex;min-height:0}
.pgbar{width:234px;flex:0 0 auto;border-right:1px solid var(--line);background:var(--panel);display:flex;flex-direction:column;min-height:0}
.pg-head{display:flex;align-items:center;padding:16px 18px 10px}
.pg-head b{font-size:13px;font-weight:750;letter-spacing:.02em}
.pg-head .sp{flex:1}
.pg-head .x{border:0;background:transparent;color:var(--label);padding:4px;border-radius:8px;cursor:pointer}
.pg-head .x:hover{background:var(--hover)}
.pg-list{padding:4px 12px 16px;overflow:auto;display:flex;flex-direction:column;gap:3px}
.pli{display:flex;align-items:center;gap:9px;padding:10px 12px;border-radius:12px;cursor:pointer;color:var(--ink);font-size:14px;font-weight:600;border:0;background:transparent;width:100%;text-align:left;font-family:var(--font)}
.pli:hover{background:var(--hover)}
.pli.on{background:var(--accent);color:var(--on-accent)}
.pli.on .fico{color:var(--on-accent)}
.pli .fico{color:var(--ink-2);display:flex}
.pli .grip{color:var(--label);display:flex;margin-left:auto;opacity:0}
.pli:hover .grip{opacity:.7}
.pli .nm{flex:1}
.pli .del{border:0;background:transparent;color:var(--label);padding:2px;border-radius:7px;cursor:pointer;opacity:0;display:flex}
.pli:hover .del{opacity:.7}
.pg-add{margin:2px 12px 0;display:flex;align-items:center;gap:8px;justify-content:center;padding:10px;border-radius:12px;border:1.5px dashed var(--line);color:var(--label);font-size:13px;font-weight:650;cursor:pointer;background:transparent;font-family:var(--font)}
.pg-add:hover{border-color:var(--accent-line);color:var(--accent)}

/* 캔버스(미리보기) */
.canvas{flex:1;min-width:0;background:var(--canvas);overflow:auto;display:flex;justify-content:center;padding:26px}
.frame{width:100%;max-width:560px}
.sec{position:relative;border-radius:16px;overflow:hidden;background:#111;min-height:300px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:52px 30px;color:#fff;
  background-image:linear-gradient(0deg,rgba(10,6,16,.55),rgba(10,6,16,.2)),linear-gradient(135deg,#6a2250,#241633 60%,#101522)}
.sec.selected{outline:2.5px solid var(--accent);outline-offset:3px}
.sec .kick{font-size:11px;letter-spacing:.18em;text-transform:uppercase;opacity:.8;font-weight:700;margin-bottom:12px}
.sec h2{font-size:27px;line-height:1.25;font-weight:800;margin:0 0 12px;text-wrap:balance}
.sec p{margin:0 0 20px;opacity:.86;font-size:14px;line-height:1.6;max-width:360px}
.sec .cta{display:inline-flex;gap:8px}
.sec .cta span{padding:11px 20px;border-radius:999px;font-size:13px;font-weight:700}
.sec .cta .a{background:var(--accent);color:#fff}
.sec .cta .b{background:rgba(255,255,255,.14);color:#fff;backdrop-filter:blur(4px)}
.sectools{position:absolute;top:10px;right:10px;display:flex;gap:4px;background:rgba(20,16,26,.5);border-radius:999px;padding:4px;backdrop-filter:blur(6px)}
.sectools button{border:0;background:transparent;color:#fff;padding:6px;border-radius:999px;cursor:pointer;display:grid;place-items:center}
.sectools button:hover{background:rgba(255,255,255,.18)}
.seclabel{position:absolute;top:10px;left:10px;background:var(--accent);color:#fff;font-size:11px;font-weight:700;padding:4px 10px;border-radius:999px}

/* 인스펙터 공통 */
.insp{width:344px;flex:0 0 auto;border-left:1px solid var(--line);background:var(--panel);overflow:auto;min-height:0}
.ih{display:flex;align-items:center;gap:11px;padding:18px 18px 14px}
.ih .bk{width:34px;height:34px;border-radius:11px;display:grid;place-items:center;background:var(--panel-2);color:var(--ink);flex:0 0 auto}
.ih b{font-size:15.5px;font-weight:800}
.ih small{display:block;font-size:11px;font-weight:600;color:var(--label)}
.idiv{height:1px;background:var(--line)}
.ib{padding:12px 14px 22px}
.lab{font-size:11px;font-weight:700;color:var(--label);letter-spacing:.07em;text-transform:uppercase;margin:16px 10px 8px}
.item{display:flex;align-items:center;gap:13px;padding:12px 14px;border-radius:14px;cursor:pointer;color:var(--ink);font-size:14px;font-weight:650;border:0;background:transparent;width:100%;text-align:left;font-family:var(--font)}
.item:hover{background:var(--hover)}
.item .cv{margin-left:auto;color:var(--label);transition:transform .2s}
.item.active{background:var(--accent);color:var(--on-accent)}
.item.active .cv{color:var(--on-accent)}
.item.open .cv{transform:rotate(180deg)}
.subs{position:relative;margin:4px 0 6px 24px;padding-left:18px}
.subs::before{content:"";position:absolute;left:0;top:6px;bottom:14px;width:1.5px;background:var(--connector)}
.sub{display:flex;align-items:center;gap:11px;padding:10px 13px;border-radius:12px;cursor:pointer;font-size:13.5px;font-weight:550;color:var(--ink);opacity:.85}
.sub:hover{opacity:1}.sub svg{width:18px;height:18px}
.sub.sel{background:var(--sel);box-shadow:var(--sel-sh);opacity:1;font-weight:700}
.ctl{margin:10px 8px 2px;display:flex;flex-direction:column;gap:12px}
.ctl.indent{margin-left:42px}
.fl{font-size:12px;font-weight:700;color:var(--label);margin-bottom:7px}.fl .s{float:right;font-weight:600;color:var(--ink);display:inline-flex;align-items:center;gap:5px}
.inp{width:100%;font-family:var(--font);font-size:13px;padding:11px 13px;border:1px solid var(--line);border-radius:12px;background:var(--panel-2);color:var(--ink)}
.inp:focus{outline:2px solid var(--accent);outline-offset:1px}
.row{display:flex;gap:8px}
.cbtn{font-family:var(--font);font-size:13px;font-weight:700;padding:11px 15px;border-radius:12px;border:0;cursor:pointer}
.cbtn.p{background:var(--accent);color:var(--on-accent);flex:1}.cbtn.g{background:var(--panel-2);color:var(--ink);flex:1}
.pill2{display:inline-flex;background:var(--panel-2);border-radius:999px;padding:4px;gap:4px}
.pill2 button{font-family:var(--font);font-size:12.5px;font-weight:700;padding:7px 18px;border:0;border-radius:999px;background:transparent;color:var(--label);cursor:pointer}
.pill2 button.on{background:var(--accent);color:var(--on-accent)}
.dot{width:7px;height:7px;border-radius:50%;background:#3DCB73;display:inline-block}
.hint{font-size:11.5px;color:var(--label);margin:2px 0 0;line-height:1.5}
.seg{display:flex;background:var(--panel-2);border-radius:12px;padding:4px;gap:4px}
.seg button{flex:1;display:flex;align-items:center;justify-content:center;gap:7px;font-family:var(--font);font-size:12.5px;font-weight:700;padding:9px;border:0;border-radius:9px;background:transparent;color:var(--ink-2);cursor:pointer}
.seg button.on{background:var(--accent);color:var(--on-accent)}.seg button svg{width:16px;height:16px}
.scard{background:var(--panel-2);border-radius:16px;padding:14px;margin:10px 0}
.scard .sch{display:flex;align-items:center;gap:10px;font-size:13.5px;font-weight:750;margin-bottom:12px}
.scard .sch svg{width:18px;height:18px}
`;

/* ── 상단바 ───────────────────────────────────────────────────── */
function topbar(){
  return `<div class="topbar">
  <button class="lgm-btn" title="사이트 메뉴"><span class="slogo"></span><span class="caret">${I.chev}</span></button>
  <span class="tb-name">포우젠바이오</span>
  <span class="tb-crumb">/ <b>홈</b></span>
  <div class="device"><button class="on" title="데스크톱">${I.monitor}</button><button title="모바일">${I.mobile}</button></div>
  <span class="tb-note">글자·사진을 눌러 바로 고쳐 보세요</span>
  <span class="sp"></span>
  <button class="tbtn ghost">미리보기</button>
  <button class="tbtn primary" disabled>저장하기</button>
  <button class="tbtn ghost">나가기</button>
</div>`;
}

/* ── 페이지 패널 (compact 플래그로 밀도 조절) ─────────────────────── */
function pgbar(){
  const items = PAGES.map(p => p.on
    ? `<button class="pli on">${renderIco(p.ic)}<span class="nm">${p.nm}</span></button>`
    : `<div class="pli"><span class="fico">${renderIco(p.ic)}</span><span class="nm">${p.nm}</span><span class="grip">${I.grip}</span><button class="del" aria-label="삭제">${I.minus}</button></div>`
  ).join('');
  return `<aside class="pgbar">
  <div class="pg-head"><b>페이지</b><span class="sp"></span><button class="x" title="패널 닫기">${I.panel}</button></div>
  <div class="pg-list">${items}<button class="pg-add">${I.plus}<span>페이지 추가</span></button></div>
</aside>`;
}
function renderIco(k){ return `<span style="display:flex">${I[k]}</span>`; }

/* ── 캔버스 ───────────────────────────────────────────────────── */
function canvas(){
  return `<div class="canvas"><div class="frame"><div class="sec selected">
  <span class="seclabel">히어로 섹션</span>
  <div class="sectools"><button title="위로">${I.chev}</button><button title="배경 설정">${I.image}</button><button title="삭제">${I.minus}</button></div>
  <div class="kick">POWGEN BIO</div>
  <h2>반려동물의 건강한 하루를<br>연구합니다</h2>
  <p>과학적 근거 기반의 반려동물 영양 솔루션. 포우젠바이오가 함께합니다.</p>
  <div class="cta"><span class="a">제품 보기</span><span class="b">문의하기</span></div>
</div></div></div>`;
}

/* ── 인스펙터 5종 ─────────────────────────────────────────────── */
function ihead(){
  return `<div class="ih"><span class="bk">${I.back}</span><span><b>배경 설정</b><small>히어로 섹션</small></span></div><div class="idiv"></div>`;
}
const videoCtl = `<div class="ctl indent">
  <div><label class="fl">동영상 링크 <span class="s"><span class="dot"></span> 연결됨</span></label><input class="inp" value="https://youtu.be/v-ALMSlqyy0"></div>
  <div class="row"><button class="cbtn p">넣기</button><button class="cbtn g">빼기</button></div>
  <div><div class="fl">화면 맞춤</div><div class="pill2"><button>세로</button><button class="on">가로</button></div></div>
  <p class="hint">링크(임베드)만 가능 · 파일 업로드는 지원하지 않아요.</p>
</div>`;

// F1 — 충실 재현(플로팅·연결선 트리)
function inspF1(){
  return `<div class="insp">${ihead()}<div class="ib">
  <button class="item active open"><span style="display:flex">${I.layers}</span><span>배경</span><span class="cv">${I.chev}</span></button>
  <div class="subs">
    <div class="sub">${I.image}<span>이미지</span></div>
    <div class="sub sel">${I.video}<span>동영상</span></div>
    <div class="sub">${I.color}<span>색상</span></div>
  </div>
  ${videoCtl}
  <button class="item" style="margin-top:8px"><span style="display:flex">${I.phone}</span><span>모바일 전용 영상</span><span class="cv">${I.chev}</span></button>
  <button class="item"><span style="display:flex">${I.color}</span><span>배경 색</span><span class="cv">${I.chev}</span></button>
</div></div>`;
}

// F3 — 섹션 라벨 그룹(평평·설정앱 느낌)
function inspF3(){
  return `<div class="insp">${ihead()}<div class="ib">
  <div class="lab">배경 유형</div>
  <div class="seg"><button>${I.image}이미지</button><button class="on">${I.video}동영상</button><button>${I.color}색상</button></div>
  <div class="ctl">
    <div><label class="fl">동영상 링크 <span class="s"><span class="dot"></span> 연결됨</span></label><input class="inp" value="https://youtu.be/v-ALMSlqyy0"></div>
    <div class="row"><button class="cbtn p">넣기</button><button class="cbtn g">빼기</button></div>
    <div><div class="fl">화면 맞춤</div><div class="pill2"><button>세로</button><button class="on">가로</button></div></div>
    <p class="hint">링크(임베드)만 가능 · 파일 업로드는 지원하지 않아요.</p>
  </div>
  <div class="lab">모바일 전용</div>
  <div class="ctl"><input class="inp" placeholder="모바일에서 보일 세로 영상 링크(선택)"></div>
  <div class="lab">배경 색</div>
  <div class="ctl"><div class="row"><input class="inp" value="#241633" style="flex:1"><span style="width:44px;border-radius:12px;background:#241633;border:1px solid var(--line);flex:0 0 auto"></span></div></div>
</div></div>`;
}

// F4 — 3섹션 동시 노출(아코디언 아님, soft 카드)
function inspF4(){
  return `<div class="insp">${ihead()}<div class="ib">
  <div class="scard">
    <div class="sch">${I.layers}<span>배경</span></div>
    <div class="seg"><button>${I.image}이미지</button><button class="on">${I.video}동영상</button><button>${I.color}색상</button></div>
    <div class="ctl" style="margin:12px 0 0">
      <div><label class="fl">동영상 링크 <span class="s"><span class="dot"></span> 연결됨</span></label><input class="inp" value="https://youtu.be/v-ALMSlqyy0"></div>
      <div class="row"><button class="cbtn p">넣기</button><button class="cbtn g">빼기</button></div>
      <div><div class="fl">화면 맞춤</div><div class="pill2"><button>세로</button><button class="on">가로</button></div></div>
    </div>
  </div>
  <div class="scard">
    <div class="sch">${I.phone}<span>모바일 전용 영상</span></div>
    <input class="inp" placeholder="모바일에서 보일 세로 영상 링크(선택)">
  </div>
  <div class="scard">
    <div class="sch">${I.color}<span>배경 색</span></div>
    <div class="row"><input class="inp" value="#241633" style="flex:1"><span style="width:44px;border-radius:12px;background:#241633;border:1px solid var(--line);flex:0 0 auto"></span></div>
  </div>
</div></div>`;
}

const VARIS = [
  { id:'f1', t:'충실 재현', d:'레퍼런스(image3) 그대로 — 활성 "배경"이 마젠타 풀 pill, 하위(이미지·동영상·색상)는 세로 연결선 트리, 동영상이 흰 선택 pill. 상단바·페이지 패널도 같은 둥근 톤.', chrome:'', insp:inspF1 },
  { id:'f2', t:'아이콘 레일 + 패널', d:'인스펙터 왼쪽에 아이콘 레일(배경·모바일·색상), 선택 항목만 오른쪽 패널에 펼침. 한 화면에 더 많이 담기는 2단 구성.', chrome:'v2', insp:inspF2 },
  { id:'f3', t:'섹션 라벨 그룹', d:'떠있는 pill 대신 평평한 설정-앱 느낌. 회색 대문자 라벨로 "배경 유형 / 모바일 전용 / 배경 색"을 묶고, 유형은 세그먼트로 전환.', chrome:'v3', insp:inspF3 },
  { id:'f4', t:'3섹션 동시 노출', d:'아코디언을 열고 닫지 않고 배경·모바일 영상·배경 색 세 소프트 카드를 항상 함께 노출. 클릭 수 최소.', chrome:'v4', insp:inspF4 },
  { id:'f5', t:'컴팩트', d:'F1과 같은 구조를 간격·반경·글자만 줄여 밀도를 높임. 페이지가 많거나 작은 화면에서 한눈에.', chrome:'v5', insp:inspF1 },
];

// F2 inspector — 아이콘 레일 + 패널
function inspF2(){
  return `<div class="insp insp-rail"><div class="rail2">
    <button class="r2 on" title="배경">${I.layers}</button>
    <button class="r2" title="모바일 전용 영상">${I.phone}</button>
    <button class="r2" title="배경 색">${I.color}</button>
  </div><div class="rpanel">${ihead()}<div class="ib" style="padding-top:4px">
    <div class="seg"><button>${I.image}이미지</button><button class="on">${I.video}동영상</button><button>${I.color}색상</button></div>
    <div class="ctl" style="margin:12px 8px 2px">
      <div><label class="fl">동영상 링크 <span class="s"><span class="dot"></span> 연결됨</span></label><input class="inp" value="https://youtu.be/v-ALMSlqyy0"></div>
      <div class="row"><button class="cbtn p">넣기</button><button class="cbtn g">빼기</button></div>
      <div><div class="fl">화면 맞춤</div><div class="pill2"><button>세로</button><button class="on">가로</button></div></div>
      <p class="hint">링크(임베드)만 가능 · 파일 업로드는 지원하지 않아요.</p>
    </div>
  </div></div></div>`;
}

/* chrome별 변주 CSS */
const CHROME = {
  v2:`.insp{display:flex;padding:0;width:400px}.insp-rail{display:flex}.rail2{width:62px;flex:0 0 auto;border-right:1px solid var(--line);padding:16px 0;display:flex;flex-direction:column;align-items:center;gap:8px;background:var(--panel-2)}
.r2{width:42px;height:42px;border-radius:13px;display:grid;place-items:center;border:0;background:transparent;color:var(--ink-2);cursor:pointer}.r2:hover{background:var(--hover)}.r2.on{background:var(--accent);color:var(--on-accent)}
.rpanel{flex:1;min-width:0;overflow:auto}`,
  v3:``,
  v4:``,
  v5:`.topbar{height:50px}.pgbar{width:208px}.pg-head{padding:12px 14px 6px}.pg-list{padding:2px 9px 12px;gap:2px}.pli{padding:7px 10px;font-size:13px;border-radius:10px;gap:7px}.pli svg{width:17px;height:17px}
.ih{padding:13px 14px 10px}.ih .bk{width:30px;height:30px}.ih b{font-size:14px}.ib{padding:8px 11px 16px}
.item{padding:9px 12px;font-size:13px;border-radius:11px;gap:10px}.item svg{width:18px;height:18px}.sub{padding:8px 11px;font-size:12.5px}.ctl{gap:9px}.inp{padding:9px 11px;border-radius:10px}.cbtn{padding:9px 13px}
.sec{min-height:240px;padding:40px 24px}.sec h2{font-size:22px}`,
};

function page(v, idx){
  const navLinks = VARIS.map(x => `<a href="${x.id}.html" class="${x.id===v.id?'on':''}">${x.id.toUpperCase()} ${x.t}</a>`).join('');
  const chromeCss = v.chrome ? `<style>${CHROME[v.chrome]}</style>` : '';
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>에디터 ${v.id.toUpperCase()} · ${v.t}</title><style>${BASE}</style>${chromeCss}</head>
<body><div class="wrap">
  <div class="cap"><div class="n"><b>${v.id.toUpperCase()}</b><span>editor chrome</span></div><h1>${v.t}</h1><p>${v.d}</p></div>
  <div class="bar"><div class="nav"><a href="index.html">목록</a>${navLinks}</div><span class="tg"><button data-t="light" class="on" onclick="setT('light')">라이트</button><button data-t="dark" onclick="setT('dark')">다크</button></span></div>
  <div class="app">
    ${topbar()}
    <div class="work">${pgbar()}${canvas()}${v.insp()}</div>
  </div>
</div>
<script>function setT(t){document.documentElement.setAttribute('data-theme',t);document.querySelectorAll('.tg button').forEach(b=>b.classList.toggle('on',b.dataset.t===t));}</script>
</body></html>`;
}

const dir = new URL('.', import.meta.url).pathname;
VARIS.forEach((v,i)=> writeFileSync(dir + v.id + '.html', page(v,i)));

/* index */
const cards = VARIS.map(v => `<a class="card" href="${v.id}.html"><div class="cn"><b>${v.id.toUpperCase()}</b> ${v.t}</div><p>${v.d}</p></a>`).join('');
const index = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>에디터 화면 디자인 베리에이션</title><style>${BASE}
.list{width:100%;max-width:760px;display:flex;flex-direction:column;gap:12px}
.card{display:block;text-decoration:none;color:var(--ink);background:var(--panel);border:1px solid var(--line);border-radius:18px;padding:18px 20px;box-shadow:0 2px 10px rgba(40,40,80,.05)}
.card:hover{border-color:var(--accent-line);box-shadow:var(--panel-sh)}
.cn{font-size:16px;font-weight:750;margin-bottom:5px}.cn b{color:var(--accent)}
.card p{margin:0;color:var(--label);font-size:13px;line-height:1.55}
</style></head><body><div class="wrap">
<div class="cap"><div class="n"><b>EDITOR</b><span>chrome variations</span></div><h1>에디터 화면 디자인 베리에이션</h1><p>상단바 · 왼쪽 페이지 패널 · 오른쪽 "배경 설정" 인스펙터를 포함한 전체 편집 화면. 브랜드 컬러 <b style="color:var(--accent)">#D646AC</b>. 각 카드를 열어 라이트/다크로 확인하세요.</p></div>
<div class="list">${cards}</div>
</div></body></html>`;
writeFileSync(dir + 'index.html', index);
console.log('generated', VARIS.map(v=>v.id).join(', '), '+ index');
