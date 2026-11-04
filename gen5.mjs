import { writeFileSync } from 'node:fs';

/* ── 아이콘 (검은 선 아이콘) ─────────────────────────────── */
const S = (p, sw = 2) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const I = {
  home: S('<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9.5h13V10"/><path d="M10 19.5V14h4v5.5"/>'),
  file: S('<path d="M6 3h8l4 4v14H6Z"/><path d="M14 3v4h4"/>'),
  grip: S('<circle cx="9" cy="6" r="1.1"/><circle cx="15" cy="6" r="1.1"/><circle cx="9" cy="12" r="1.1"/><circle cx="15" cy="12" r="1.1"/><circle cx="9" cy="18" r="1.1"/><circle cx="15" cy="18" r="1.1"/>'),
  minus: S('<path d="M5 12h14"/>'),
  plus: S('<path d="M12 5v14M5 12h14"/>'),
  monitor: S('<rect x="3" y="4.5" width="18" height="12" rx="2.5"/><path d="M8.5 20h7M12 16.5V20"/>'),
  mobile: S('<rect x="7" y="2.5" width="10" height="19" rx="3"/><path d="M10.5 18.5h3"/>'),
  layers: S('<path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z"/><path d="m3.5 12 8.5 4.5 8.5-4.5"/><path d="m3.5 16.5 8.5 4.5 8.5-4.5"/>'),
  image: S('<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="8.5" cy="9.5" r="1.8"/><path d="m4 18 5.5-5 4 4 2.5-2.5 4 3.5"/>'),
  video: S('<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10.5 9.2v5.6l4.5-2.8-4.5-2.8Z"/>'),
  color: S('<circle cx="12" cy="12" r="9"/><circle cx="8.3" cy="10" r="1.1"/><circle cx="15.7" cy="10" r="1.1"/><circle cx="12" cy="15.2" r="1.1"/>'),
  phone: S('<rect x="6.5" y="2.5" width="11" height="19" rx="3.2"/><path d="M10.5 18.3h3"/>'),
  chev: S('<path d="m6 9 6 6 6-6"/>'),
  back: S('<path d="m15 6-6 6 6 6"/>'),
  panel: S('<rect x="3.5" y="4.5" width="17" height="15" rx="3"/><path d="M9 4.5v15"/>'),
  eye: S('<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>'),
};
const ico = k => `<span style="display:flex">${I[k]}</span>`;

const PAGES = [
  { ic: 'home', nm: '홈', on: true },
  { ic: 'file', nm: '브랜드 소개' },
  { ic: 'file', nm: '연구·기술' },
  { ic: 'file', nm: '제품' },
  { ic: 'file', nm: '적용시험·사례' },
  { ic: 'file', nm: '문의' },
];

/* ── 공통 토큰 + 기본 CSS (브랜드 보라 #8F48F3) ─────────────── */
const BASE = `
*{box-sizing:border-box}
:root{
  --accent:#8F48F3;--accent-2:#B07CF8;--accent-deep:#7A2FE0;--on-accent:#FFFFFF;
  --accent-soft:rgba(143,72,243,.10);--accent-tint:rgba(143,72,243,.07);--accent-line:rgba(143,72,243,.30);
  --page1:#EEEBF6;--page2:#E6E1F2;
  --app:#FFFFFF;--panel:#FFFFFF;--panel-2:#F5F4FA;--ink:#191622;--ink-2:#5C5570;--label:#9A94A8;--line:#EAE7F1;
  --chip-bg:#F0ECFA;--chip-ink:#6B4FAE;
  --box-sh:0 10px 28px rgba(80,50,160,.12),0 2px 6px rgba(80,50,160,.05);
  --app-sh:0 40px 100px rgba(70,45,140,.22),0 8px 24px rgba(70,45,140,.09);
  --hover:#F3F1FA;--canvas:#EEEBF5;
  --font:-apple-system,BlinkMacSystemFont,"Pretendard","Apple SD Gothic Neo","Segoe UI",sans-serif}
@media (prefers-color-scheme:dark){:root{
  --page1:#0C0A12;--page2:#060509;--app:#100D18;--panel:#15121E;--panel-2:#1C1828;--ink:#F2F0F7;--ink-2:#ADA6BD;--label:#6E6880;--line:#262133;
  --chip-bg:#271E3E;--chip-ink:#C5A9F5;--accent-soft:rgba(143,72,243,.20);--accent-tint:rgba(143,72,243,.14);
  --box-sh:0 14px 36px rgba(0,0,0,.55);--app-sh:0 40px 100px rgba(0,0,0,.72);--hover:#1C182A;--canvas:#08060D}}
:root[data-theme=light]{--page1:#EEEBF6;--page2:#E6E1F2;--app:#FFFFFF;--panel:#FFFFFF;--panel-2:#F5F4FA;--ink:#191622;--ink-2:#5C5570;--label:#9A94A8;--line:#EAE7F1;--chip-bg:#F0ECFA;--chip-ink:#6B4FAE;--accent-soft:rgba(143,72,243,.10);--accent-tint:rgba(143,72,243,.07);--box-sh:0 10px 28px rgba(80,50,160,.12),0 2px 6px rgba(80,50,160,.05);--app-sh:0 40px 100px rgba(70,45,140,.22),0 8px 24px rgba(70,45,140,.09);--hover:#F3F1FA;--canvas:#EEEBF5}
:root[data-theme=dark]{--page1:#0C0A12;--page2:#060509;--app:#100D18;--panel:#15121E;--panel-2:#1C1828;--ink:#F2F0F7;--ink-2:#ADA6BD;--label:#6E6880;--line:#262133;--chip-bg:#271E3E;--chip-ink:#C5A9F5;--accent-soft:rgba(143,72,243,.20);--accent-tint:rgba(143,72,243,.14);--box-sh:0 14px 36px rgba(0,0,0,.55);--app-sh:0 40px 100px rgba(0,0,0,.72);--hover:#1C182A;--canvas:#08060D}
body{margin:0;font-family:var(--font);background:linear-gradient(140deg,var(--page1),var(--page2));color:var(--ink);-webkit-font-smoothing:antialiased;min-height:100vh}
svg{width:20px;height:20px;display:block}
.wrap{min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:26px 16px 60px}
.cap{max-width:760px;text-align:center;margin-bottom:14px}
.cap .n b{background:var(--accent);color:var(--on-accent);padding:2px 9px;border-radius:999px;font-size:11px;font-weight:800;letter-spacing:.06em;margin-right:7px}
.cap .n span{font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--label)}
.cap h1{font-size:19px;font-weight:750;margin:9px 0 5px}
.cap p{margin:0 auto;color:var(--label);font-size:13px;line-height:1.55;max-width:580px}
.cap p b{color:var(--accent)}
.bar{display:flex;gap:10px;align-items:center;margin:14px 0 22px;flex-wrap:wrap;justify-content:center}
.nav{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}
.nav a{font-size:12px;font-weight:600;text-decoration:none;color:var(--label);border:1px solid var(--line);background:var(--panel);padding:6px 11px;border-radius:999px}
.nav a.on{background:var(--accent);color:var(--on-accent);border-color:var(--accent)}
.tg{display:inline-flex;background:var(--panel);border:1px solid var(--line);border-radius:999px;padding:3px}
.tg button{border:0;background:transparent;color:var(--label);font-size:12px;font-weight:700;padding:5px 12px;border-radius:999px;cursor:pointer;font-family:var(--font)}
.tg button.on{background:var(--accent);color:var(--on-accent)}
.hintbar{font-size:12px;color:var(--label);margin:-6px 0 18px;display:flex;align-items:center;gap:7px}
.hintbar b{color:var(--accent);font-weight:700}

/* ── 에디터 프레임 ──────────────────────────────────── */
.app{width:100%;max-width:1240px;height:min(772px,calc(100vh - 150px));min-height:580px;background:var(--app);border-radius:22px;box-shadow:var(--app-sh);overflow:hidden;display:flex;flex-direction:column;border:1px solid var(--line)}
/* 상단바(GNB) */
.topbar{height:60px;flex:0 0 auto;display:flex;align-items:center;gap:12px;padding:0 16px;border-bottom:1px solid var(--line);background:var(--panel)}
.lgm{display:flex;align-items:center;gap:8px;border:0;background:transparent;padding:5px 9px 5px 5px;border-radius:12px;cursor:pointer;color:var(--ink);font-family:var(--font)}
.lgm:hover{background:var(--hover)}
.slogo{width:30px;height:30px;border-radius:9px;background:linear-gradient(135deg,var(--accent),var(--accent-2));display:inline-block;flex:0 0 auto;box-shadow:0 3px 8px var(--accent-line)}
.lgm .cr{color:var(--label)}
.tb-name{font-size:14.5px;font-weight:750}
.tb-crumb{font-size:12.5px;color:var(--label)}.tb-crumb b{color:var(--ink);font-weight:700}
.sp{flex:1}
.device{display:inline-flex;background:var(--panel-2);border-radius:11px;padding:3px;gap:2px}
.device button{border:0;background:transparent;color:var(--label);padding:6px 11px;border-radius:9px;cursor:pointer;display:grid;place-items:center}
.device button.on{background:var(--app);color:var(--accent);box-shadow:0 1px 4px rgba(0,0,0,.12)}
.tb-note{font-size:12px;color:var(--ink-2);display:flex;align-items:center;gap:7px;font-weight:550}
.tb-note::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--accent);flex:0 0 auto}
.tbtn{font-family:var(--font);font-size:13px;font-weight:700;padding:9px 16px;border-radius:12px;border:1px solid var(--line);background:var(--panel);color:var(--ink);cursor:pointer}
.tbtn.ghost{background:transparent}.tbtn.ghost:hover{background:var(--hover)}
.tbtn.primary{background:linear-gradient(135deg,var(--accent),var(--accent-deep));color:var(--on-accent);border:0;box-shadow:0 4px 12px var(--accent-line)}
.tbtn.primary:disabled{opacity:.5;box-shadow:none;cursor:default}

/* 작업영역 3분할 */
.work{flex:1;display:flex;min-height:0}
/* 왼쪽 메뉴 */
.pgbar{width:236px;flex:0 0 auto;border-right:1px solid var(--line);background:var(--panel);display:flex;flex-direction:column;min-height:0}
.pg-head{display:flex;align-items:center;padding:17px 18px 11px}
.pg-head b{font-size:12px;font-weight:750;letter-spacing:.09em;text-transform:uppercase;color:var(--label)}
.pg-head .x{margin-left:auto;border:0;background:transparent;color:var(--label);padding:4px;border-radius:8px;cursor:pointer}
.pg-head .x:hover{background:var(--hover)}
.pg-list{padding:2px 12px 16px;overflow:auto;display:flex;flex-direction:column;gap:3px}
.pli{display:flex;align-items:center;gap:10px;padding:11px 12px;border-radius:12px;cursor:pointer;color:var(--ink);font-size:14px;font-weight:600;border:0;background:transparent;width:100%;text-align:left;font-family:var(--font)}
.pli:hover{background:var(--hover)}
.pli.on{background:linear-gradient(135deg,var(--accent),var(--accent-deep));color:#fff;box-shadow:0 4px 12px var(--accent-line)}
.pli.on .fico{color:#fff}
.pli .fico{color:var(--ink-2);display:flex}
.pli .grip{color:var(--label);display:flex;align-items:center;width:18px;flex:0 0 auto;opacity:0}.pli:hover .grip{opacity:.6}
.pli.on .grip{opacity:0}
.pli .nm{flex:1}
.pli .del{border:0;background:transparent;color:var(--label);padding:2px;border-radius:7px;cursor:pointer;opacity:0;display:flex}.pli:hover .del{opacity:.65}
.pg-add{margin:4px 12px 0;display:flex;align-items:center;gap:8px;justify-content:center;padding:11px;border-radius:12px;border:1.5px dashed var(--line);color:var(--label);font-size:13px;font-weight:650;cursor:pointer;background:transparent;font-family:var(--font)}
.pg-add:hover{border-color:var(--accent-line);color:var(--accent);background:var(--accent-tint)}

/* 캔버스 */
.canvas{flex:1;min-width:0;background:var(--canvas);overflow:auto;display:flex;justify-content:center;padding:26px}
.frame{width:100%;max-width:560px}
.sec{position:relative;border-radius:18px;overflow:hidden;min-height:308px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:54px 30px;color:#fff;
  background-image:linear-gradient(0deg,rgba(14,8,26,.5),rgba(14,8,26,.15)),linear-gradient(135deg,#4a2270,#2a1b47 58%,#141225)}
.sec.selected{outline:2.5px solid var(--accent);outline-offset:3px}
.sec .kick{font-size:11px;letter-spacing:.2em;text-transform:uppercase;opacity:.82;font-weight:700;margin-bottom:13px;color:var(--accent-2)}
.sec h2{font-size:28px;line-height:1.24;font-weight:800;margin:0 0 13px;text-wrap:balance}
.sec p{margin:0 0 22px;opacity:.85;font-size:14px;line-height:1.6;max-width:360px}
.sec .cta{display:inline-flex;gap:9px}
.sec .cta span{padding:11px 21px;border-radius:999px;font-size:13px;font-weight:700}
.sec .cta .a{background:var(--accent);color:#fff}
.sec .cta .b{background:rgba(255,255,255,.14);color:#fff}
.sectools{position:absolute;top:11px;right:11px;display:flex;gap:4px;background:rgba(18,12,30,.52);border-radius:999px;padding:4px;backdrop-filter:blur(6px)}
.sectools button{border:0;background:transparent;color:#fff;padding:6px;border-radius:999px;cursor:pointer;display:grid;place-items:center}
.sectools button:hover{background:rgba(255,255,255,.2)}
.seclabel{position:absolute;top:11px;left:11px;background:var(--accent);color:#fff;font-size:11px;font-weight:700;padding:4px 11px;border-radius:999px}

/* ── 인스펙터 ───────────────────────────────────────── */
.insp{width:350px;flex:0 0 auto;border-left:1px solid var(--line);background:var(--panel);overflow:auto;min-height:0}
.ih{display:flex;align-items:center;gap:11px;padding:18px 18px 14px}
.ih .bk{width:32px;height:32px;border-radius:10px;display:grid;place-items:center;background:var(--panel-2);color:var(--ink);flex:0 0 auto;cursor:pointer}
.ih .bk:hover{background:var(--hover)}
.ih b{font-size:15.5px;font-weight:800}
.ih small{display:block;font-size:11.5px;font-weight:600;color:var(--label)}
.ib{padding:6px 14px 22px}

/* 드롭다운 박스(아코디언) */
.box{background:var(--panel);border:1px solid var(--line);border-radius:16px;overflow:hidden;margin-bottom:11px;transition:box-shadow .2s,border-color .2s,background .2s}
.box.open{box-shadow:var(--box-sh)}
.box-head{display:flex;align-items:center;gap:12px;padding:15px 15px;cursor:pointer;border:0;background:transparent;width:100%;text-align:left;font-family:var(--font);color:var(--ink)}
.box .chip{width:36px;height:36px;border-radius:11px;display:grid;place-items:center;background:var(--chip-bg);color:var(--chip-ink);flex:0 0 auto;transition:background .2s,color .2s}
.box .chip svg{width:19px;height:19px}
.box.open .chip{background:var(--accent);color:#fff}
.box-head .bt{font-size:14.5px;font-weight:750;line-height:1.2}
.box-head .bt small{display:block;font-size:11.5px;font-weight:600;color:var(--label);margin-top:3px}
.box-head .chev{margin-left:auto;color:var(--label);transition:transform .25s;flex:0 0 auto}
.box.open .chev{transform:rotate(180deg);color:var(--accent)}
.box-body{max-height:0;overflow:hidden;opacity:0;transition:max-height .3s ease,opacity .2s}
.box.open .box-body{max-height:640px;opacity:1}
.bbin{padding:2px 15px 17px;display:flex;flex-direction:column;gap:13px}

/* 컨트롤 */
.fl{font-size:12px;font-weight:700;color:var(--label);margin-bottom:7px}.fl .s{float:right;font-weight:600;color:var(--ink);display:inline-flex;align-items:center;gap:5px}
.inp{width:100%;font-family:var(--font);font-size:13px;padding:11px 13px;border:1px solid var(--line);border-radius:12px;background:var(--panel-2);color:var(--ink)}
.inp:focus{outline:2px solid var(--accent);outline-offset:1px}
.row{display:flex;gap:8px}
.cbtn{font-family:var(--font);font-size:13px;font-weight:700;padding:11px 15px;border-radius:12px;border:0;cursor:pointer}
.cbtn.p{background:linear-gradient(135deg,var(--accent),var(--accent-deep));color:#fff;flex:1;box-shadow:0 3px 10px var(--accent-line)}
.cbtn.g{background:var(--panel-2);color:var(--ink);flex:1}
.pill2{display:inline-flex;background:var(--panel-2);border-radius:999px;padding:4px;gap:4px}
.pill2 button{font-family:var(--font);font-size:12.5px;font-weight:700;padding:7px 18px;border:0;border-radius:999px;background:transparent;color:var(--label);cursor:pointer}
.pill2 button.on{background:var(--accent);color:#fff}
.dot{width:7px;height:7px;border-radius:50%;background:#35C46B;display:inline-block}
.hint{font-size:11.5px;color:var(--label);margin:0;line-height:1.5}
.seg{display:flex;background:var(--panel-2);border-radius:12px;padding:4px;gap:4px}
.seg button{flex:1;display:flex;align-items:center;justify-content:center;gap:6px;font-family:var(--font);font-size:12.5px;font-weight:700;padding:9px 6px;border:0;border-radius:9px;background:transparent;color:var(--ink-2);cursor:pointer}
.seg button.on{background:var(--accent);color:#fff}.seg button svg{width:16px;height:16px}
.sw{width:46px;height:46px;border-radius:12px;border:1px solid var(--line);flex:0 0 auto}
`;

/* 박스 본문 */
const bgBody = `<div class="bbin">
  <div class="seg"><button>${I.image}이미지</button><button class="on">${I.video}동영상</button><button>${I.color}색상</button></div>
  <div><label class="fl">동영상 링크 <span class="s"><span class="dot"></span> 연결됨</span></label><input class="inp" value="https://youtu.be/v-ALMSlqyy0"></div>
  <div class="row"><button class="cbtn p">넣기</button><button class="cbtn g">빼기</button></div>
  <div><div class="fl">화면 맞춤</div><div class="pill2"><button>세로</button><button class="on">가로</button></div></div>
  <p class="hint">링크(임베드)만 가능 · 파일 업로드는 지원하지 않아요.</p>
</div>`;
const mobBody = `<div class="bbin"><input class="inp" placeholder="모바일에서 보일 세로 영상 링크(선택)"><p class="hint">비워 두면 데스크톱 영상이 모바일에도 그대로 보여요.</p></div>`;
const colBody = `<div class="bbin"><div class="fl">배경 색</div><div class="row"><input class="inp" value="#2A1B47" style="flex:1"><span class="sw" style="background:#2A1B47"></span></div></div>`;

function box(icon, title, sub, body, open){
  return `<div class="box${open?' open':''}"><button class="box-head"><span class="chip">${I[icon]}</span><span class="bt">${title}${sub?`<small>${sub}</small>`:''}</span><span class="chev">${I.chev}</span></button><div class="box-body">${body}</div></div>`;
}
function inspector(){
  return `<div class="insp">
  <div class="ih"><span><b>배경 설정</b><small>히어로 섹션</small></span></div>
  <div class="ib">
    ${box('layers','배경','동영상 · 가로',bgBody,true)}
    ${box('phone','모바일 전용 영상','없음',mobBody,false)}
    ${box('color','배경 색','#2A1B47',colBody,false)}
  </div>
</div>`;
}

function topbar(){
  return `<div class="topbar">
  <button class="lgm" title="사이트 메뉴"><span class="slogo"></span><span class="cr">${I.chev}</span></button>
  <span class="tb-name">포우젠바이오</span><span class="tb-crumb">/ <b>홈</b></span>
  <div class="device"><button class="on" title="데스크톱">${I.monitor}</button><button title="모바일">${I.mobile}</button></div>
  <span class="tb-note">글자·사진을 눌러 바로 고쳐 보세요</span>
  <span class="sp"></span>
  <button class="tbtn ghost">미리보기</button>
  <button class="tbtn primary" disabled>저장하기</button>
  <button class="tbtn ghost">나가기</button>
</div>`;
}
function pgbar(){
  const items = PAGES.map(p => p.on
    ? `<button class="pli on"><span class="grip"></span><span class="nm">${p.nm}</span></button>`
    : `<div class="pli"><span class="grip" title="드래그해서 순서 이동">${I.grip}</span><span class="nm">${p.nm}</span><button class="del" aria-label="삭제">${I.minus}</button></div>`
  ).join('');
  return `<aside class="pgbar"><div class="pg-head"><b>페이지</b><button class="x" title="패널 닫기">${I.panel}</button></div><div class="pg-list">${items}<button class="pg-add">${I.plus}<span>페이지 추가</span></button></div></aside>`;
}
function canvas(){
  return `<div class="canvas"><div class="frame"><div class="sec selected">
  <span class="seclabel">히어로 섹션</span>
  <div class="sectools"><button title="위로">${I.chev}</button><button title="배경 설정">${I.image}</button><button title="삭제">${I.minus}</button></div>
  <div class="kick">POWGEN BIO</div><h2>반려동물의 건강한 하루를<br>연구합니다</h2>
  <p>과학적 근거 기반의 반려동물 영양 솔루션. 포우젠바이오가 함께합니다.</p>
  <div class="cta"><span class="a">제품 보기</span><span class="b">문의하기</span></div>
</div></div></div>`;
}

const VARIS = [
  { id:'f1', t:'소프트 카드 아코디언', d:'각 설정이 둥근 박스. 박스 헤더를 누르면 아래로 드롭다운되어 내용이 박스 안에 펼쳐져요. 열리면 아이콘 칩이 보라로 켜지고 그림자가 떠요. GNB·왼쪽 메뉴도 같은 둥근 보라 톤.', css:'' },
  { id:'f2', t:'보라 틴트 강조', d:'열린 박스 전체가 연보라로 채워져 "지금 열린 것"이 또렷해요. 헤더에 보라 좌측 바. 색 대비를 더 준 버전.', css:`
.box{border-color:var(--line)}
.box.open{background:var(--accent-tint);border-color:var(--accent-line)}
.box.open .box-head{position:relative}
.box.open .box-head::before{content:"";position:absolute;left:0;top:11px;bottom:11px;width:3px;border-radius:0 3px 3px 0;background:var(--accent)}
.box.open .box-head{padding-left:18px}
.pli.on{box-shadow:0 5px 14px var(--accent-line)}` },
  { id:'f3', t:'라인 정돈형', d:'박스들을 한 틀 안에 얇은 구분선으로 이어 붙인 차분한 설정-앱 느낌. 각지고 정돈된 톤. 보라는 포인트에만.', css:`
.ib{padding:10px 14px 22px}
.ib .stack{border:1px solid var(--line);border-radius:14px;overflow:hidden;background:var(--panel)}
.box{border:0;border-radius:0;margin:0;box-shadow:none!important}
.box+.box{border-top:1px solid var(--line)}
.box .chip{border-radius:9px;width:32px;height:32px}
.box.open{background:var(--panel-2)}
.box.open .box-body{background:var(--panel)}` , stack:true },
  { id:'f4', t:'컴팩트', d:'같은 드롭다운 박스를 간격·글자를 줄여 밀도를 높인 버전. 페이지가 많거나 작은 화면에서 한눈에.', css:`
.topbar{height:52px}.pgbar{width:210px}.pg-list{gap:2px}.pli{padding:8px 11px;font-size:13px;border-radius:10px}
.ib{padding:4px 11px 16px}.box{margin-bottom:8px;border-radius:13px}.box-head{padding:11px 12px;gap:10px}.box .chip{width:30px;height:30px;border-radius:9px}
.box-head .bt{font-size:13.5px}.bbin{padding:0 12px 13px;gap:10px}.inp{padding:9px 11px}.cbtn{padding:9px 13px}
.sec{min-height:250px;padding:42px 26px}.sec h2{font-size:23px}` },
];

function page(v){
  const navLinks = VARIS.map(x => `<a href="${x.id}.html" class="${x.id===v.id?'on':''}">${x.id.toUpperCase()} ${x.t}</a>`).join('');
  let insp = inspector();
  if (v.stack) insp = insp.replace('<div class="ib">', '<div class="ib"><div class="stack">').replace('</div>\n</div>', '</div></div>\n</div>');
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>에디터 ${v.id.toUpperCase()} · ${v.t}</title><style>${BASE}${v.css}</style></head>
<body><div class="wrap">
  <div class="cap"><div class="n"><b>${v.id.toUpperCase()}</b><span>editor chrome</span></div><h1>${v.t}</h1><p>${v.d}</p></div>
  <div class="bar"><div class="nav"><a href="index.html">목록</a>${navLinks}</div><span class="tg"><button data-t="light" class="on" onclick="setT('light')">라이트</button><button data-t="dark" onclick="setT('dark')">다크</button></span></div>
  <div class="hintbar">💡 인스펙터의 <b>박스 제목</b>을 클릭하면 드롭다운으로 열리고 닫혀요.</div>
  <div class="app">${topbar()}<div class="work">${pgbar()}${canvas()}${insp}</div></div>
</div>
<script>
function setT(t){document.documentElement.setAttribute('data-theme',t);document.querySelectorAll('.tg button').forEach(b=>b.classList.toggle('on',b.dataset.t===t));}
document.querySelectorAll('.box-head').forEach(h=>h.addEventListener('click',()=>h.parentElement.classList.toggle('open')));
</script></body></html>`;
}

const dir = new URL('.', import.meta.url).pathname;
VARIS.forEach(v => writeFileSync(dir + v.id + '.html', page(v)));
// f5 제거(4종으로 축소)
writeFileSync(dir + 'f5.html', `<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=f4.html">`);

const cards = VARIS.map(v => `<a class="card" href="${v.id}.html"><div class="cn"><b>${v.id.toUpperCase()}</b> ${v.t}</div><p>${v.d}</p></a>`).join('');
writeFileSync(dir + 'index.html', `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>에디터 화면 디자인 베리에이션</title><style>${BASE}
.list{width:100%;max-width:760px;display:flex;flex-direction:column;gap:12px}
.card{display:block;text-decoration:none;color:var(--ink);background:var(--panel);border:1px solid var(--line);border-radius:18px;padding:18px 20px}
.card:hover{border-color:var(--accent-line);box-shadow:var(--box-sh)}
.cn{font-size:16px;font-weight:750;margin-bottom:5px}.cn b{color:var(--accent)}
.card p{margin:0;color:var(--label);font-size:13px;line-height:1.55}
</style></head><body><div class="wrap">
<div class="cap"><div class="n"><b>EDITOR</b><span>chrome + 아코디언 인스펙터</span></div><h1>에디터 화면 디자인 베리에이션</h1><p>설정을 <b>드롭다운 박스(아코디언)</b>에 담고, 상단바(GNB)·왼쪽 메뉴까지 같은 톤앤매너로. 브랜드 컬러 <b>#8F48F3</b>. 박스 제목을 누르면 열고 닫혀요.</p></div>
<div class="list">${cards}</div></div></body></html>`);
console.log('generated', VARIS.map(v=>v.id).join(', '), '+ index (f5→redirect)');
