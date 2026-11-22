/* ================= Release 5f: inclusive design, access modes, signposting ================= */
Object.assign(ICON, {
  access:'<circle cx="12" cy="4.5" r="2"/><path d="M5 8l7 1.5L19 8M12 9.5V14M9 21l3-7 3 7"/>',
  easy:'<circle cx="12" cy="12" r="9"/><path d="M8.5 14a4 4 0 0 0 7 0M9 9.5h.01M15 9.5h.01"/>',
  textonly:'<path d="M4 6h16M4 10h16M4 14h10M4 18h12"/>',
  top:'<path d="M12 19V5M5 12l7-7 7 7"/>',
  prev:'<path d="M15 6l-6 6 6 6"/>', next:'<path d="M9 6l6 6-6 6"/>',
  statement:'<path d="M6 3h9l4 4v14H6z"/><path d="M9 12l2 2 4-4"/>'
});
/* ---- Display and access settings ---- */
const ACC_DEFAULT = {size:0, dys:false, contrast:false, motion:false, links:false, easy:false, text:false};
let ACC = Object.assign({}, ACC_DEFAULT, store.get("acc", {}));
function applyAcc(){ const r=document.documentElement; r.classList.toggle("acc-l1",ACC.size===1); r.classList.toggle("acc-l2",ACC.size===2); ["dys","contrast","motion","links","easy","text"].forEach(k=>r.classList.toggle("acc-"+k,!!ACC[k])); }
function accPanelHTML(){ const sw=(k,l,d)=>`<button type="button" class="toggle accsw" role="switch" aria-checked="${!!ACC[k]}" data-acc="${k}" style="color:var(--ink)"><span class="track"><span class="knob"></span></span><span><strong>${esc(l)}</strong><br><span class="small muted">${esc(d)}</span></span></button>`;
  return `<div class="accp" id="accPanel" role="dialog" aria-label="Display and access settings" hidden><div class="row" style="justify-content:space-between"><strong class="row" style="gap:8px">${ico("access","ico")} Display and access</strong><button class="iconbtn2" type="button" id="accClose" aria-label="Close settings">✕</button></div>
  <div class="stack" style="gap:6px"><span class="small"><strong>Text size</strong></span><div class="chips" role="radiogroup" aria-label="Text size">${["Standard","Large","Larger"].map((l,i)=>`<button type="button" class="chip" role="radio" aria-checked="${ACC.size===i}" data-accsize="${i}">${l}</button>`).join("")}</div></div>
  ${sw("dys","Easier reading spacing","More space between letters, words and lines; no italics")}${sw("contrast","High contrast","Black, white and yellow with strong outlines")}${sw("motion","Reduce motion","Stops animation and smooth scrolling")}${sw("links","Underline all links","Makes every link easy to spot")}${sw("easy","Easy Read mode","Large text, short lines and the Easy Read page first")}${sw("text","Text-only mode","No icons, charts or decoration; one column")}
  <div class="row"><a class="btn ghost" href="#help-easyread">${ico("easy","ico")}<span>Easy Read version</span></a><a class="btn ghost" href="#help-textonly">${ico("textonly","ico")}<span>Text-only version</span></a></div><button type="button" class="btn ghost" id="accReset">Reset to standard</button><p class="small muted">Saved in this browser only.</p></div>`; }
function bindAcc(){ const accSet=open=>{ const p=$("#accPanel"); p.hidden=!open; $("#accBtn").setAttribute("aria-expanded", String(open)); if(open) $("[data-accsize]",p).focus(); };
  $("#accBtn").onclick=()=>accSet($("#accPanel").hidden);
  $("#accClose").onclick=()=>{ accSet(false); $("#accBtn").focus(); };
  /* D32: Escape did not close Settings (found by the release 11 keyboard test) */
  document.addEventListener("keydown", e=>{ const p=$("#accPanel"); if(e.key==="Escape" && p && !p.hidden){ accSet(false); $("#accBtn").focus(); } });
  $$("[data-accsize]").forEach(b=>b.onclick=()=>{ ACC.size=+b.dataset.accsize; saveAcc(); });
  $$("[data-acc]").forEach(b=>b.onclick=()=>{ ACC[b.dataset.acc]=!ACC[b.dataset.acc]; saveAcc(); if(b.dataset.acc==="easy"&&ACC.easy) location.hash="help-easyread"; });
  $("#accReset").onclick=()=>{ ACC=Object.assign({},ACC_DEFAULT); saveAcc(); }; }
function saveAcc(){ store.set("acc",ACC); applyAcc(); $$("[data-acc]").forEach(b=>b.setAttribute("aria-checked",String(!!ACC[b.dataset.acc]))); $$("[data-accsize]").forEach(b=>b.setAttribute("aria-checked",String(ACC.size===+b.dataset.accsize))); fitNav(); }

/* ---- Easy Read ---- */
const EASY = [
  ["What this is",[["recognition","This website helps people say thank you for good work."],["people","It is for everyone who works here."],["nominate","It helps you put someone forward for an award."],["calendar","It shows the dates when awards close."]]],
  ["Saying thank you",[["thanks","You can say thank you to anyone."],["s_ok","Say what they did."],["s_ok","Say why it helped."],["lock","Ask before you tell other people."]]],
  ["Putting someone forward for an award",[["search","Find the right award."],["s_ok","Ask the person if they are happy."],["doc","Write down what they did."],["doc","Say how you know it is true."],["link","Send it on the award website."],["clock","Do it before the closing date."]]],
  ["Keeping things fair",[["fair","We look at what people did."],["s_bad","We never guess things about who you are."],["s_bad","We do not compare people."],["lock","You choose who sees things about you."]]],
  ["Your information",[["lock","What you type stays on your computer."],["sparkle","The helper only reads what you send it."],["idea","Ideas you share can be seen by everyone here."]]],
  ["Getting help",[["help","Press Help at the top of the page."],["sparkle","Press Ask at the bottom of the page to ask a question."],["people","You can ask your manager or HR team for help."]]]
];
V.help_easyread = () => `<div class="easy"><p class="easy-lead">${ico("easy","ico easyico")}<span>This is the <strong>Easy Read</strong> version of the website.</span></p>
  ${EASY.map(([h,lines],i)=>`<section class="easy-sec"><h3 id="er-${i}">${esc(h)}</h3>${lines.map(([ic,t])=>`<p class="easy-line"><span class="easy-pic" aria-hidden="true">${ico(ic,"ico")}</span><span>${esc(t)}</span></p>`).join("")}</section>`).join("")}
  <p class="easy-line"><span class="easy-pic" aria-hidden="true">${ico("nominate","ico")}</span><span><a href="#workflows-nominate">Start putting someone forward</a></span></p>
  <p class="easy-line"><span class="easy-pic" aria-hidden="true">${ico("thanks","ico")}</span><span><a href="#workflows-thanks">Say thank you</a></span></p></div>
  <div class="note warn small"><strong>About this Easy Read page.</strong> It follows common Easy Read practice: short sentences, one idea per line, a picture beside each line and large text. Easy Read should be checked with people with learning disabilities before it is relied on; that testing has not been done yet.</div>`;

/* ---- Text-only version (linear, screen-reader friendly) ---- */
function staticTable(id){ const t=TBL[id]; if(!t) return ""; return `<table><thead><tr>${t.cols.map(c=>`<th scope="col">${esc(c.l)}</th>`).join("")}</tr></thead><tbody>${t.rows.map(r=>`<tr>${t.cols.map(c=>`<td>${esc(r[c.k]==null?"":r[c.k])}</td>`).join("")}</tr>`).join("")}</tbody></table>`; }
let TSEQ=0;
function linearise(html){ const d=document.createElement("div"); d.innerHTML=html;
  $$("svg,button,select,textarea,input,.ctrls,.chips,.aibar,.aistate,.heroact,.guil,.ribbon,script,style,[aria-hidden='true']",d).forEach(n=>n.remove());
  $$("div[id^='t']",d).forEach(n=>{ if(TBL[n.id]) n.outerHTML=staticTable(n.id); });
  $$("table",d).forEach((t,ti)=>{ const w=document.createElement("div"); w.setAttribute("tabindex","0"); w.setAttribute("role","region"); w.setAttribute("aria-label","Table "+(++TSEQ)+(t.querySelector("th")?": "+t.querySelector("th").textContent.trim().slice(0,30):"")); w.dataset.tscroll="1"; t.parentNode.insertBefore(w,t); w.appendChild(t); });
  $$("[style]",d).forEach(n=>n.removeAttribute("style")); $$("[class]",d).forEach(n=>n.removeAttribute("class")); $$("[tabindex]",d).forEach(n=>{ if(!n.dataset.tscroll) n.removeAttribute("tabindex"); }); $$("[id]",d).forEach(n=>n.removeAttribute("id"));
  return d.innerHTML.replace(/<\/(span|i|strong|a)>(?=<)/g,"</$1> "); }
const TEXT_SKIP = new Set(["calendar-timeline","calendar-month","knowledge-graph","help-textonly","help-tours","help-ideas","calendar-export","knowledge-open","recognition-proportion"]);
V.help_textonly = () => { TSEQ=0; const parts=[], toc=[];
  SECTIONS.forEach(s=>{ const tabs=s.tabs.filter(t=>!(t[5]&&t[5].hidden) && !(s.id==="workflows" && WF[t[0]]) && !TEXT_SKIP.has(s.id+"-"+t[0])); if(!tabs.length) return;
    toc.push(`<li><a href="#to-${s.id}">${esc(s.label)}</a></li>`);
    parts.push(`<section aria-labelledby="to-${s.id}"><h2 id="to-${s.id}">${esc(s.label)}</h2><p>${esc(INTRO[s.id]?INTRO[s.id][1]:"")}</p>${tabs.map(t=>{ let h=""; try{ h=linearise(t[2]()); }catch(e){ h="<p>This part is interactive. Open it in the standard view.</p>"; } return `<h3>${esc(t[1])}</h3>${h}<p><a href="#${s.id}-${t[0]}">Open ${esc(t[1])} in the standard view</a></p>`; }).join("")}</section>`); });
  return `<div class="textonly-doc"><p>This is a text-only version of the whole Hub, in one page, for screen readers, text browsers and anyone who prefers plain text. Charts are described in words. Interactive tools (workflows, tours, idea box, exports) are listed with links to the standard view.</p>
  <nav aria-label="Text-only contents"><h2>Contents</h2><ol>${toc.join("")}<li><a href="#to-interactive">Interactive tools</a></li></ol></nav>
  ${parts.join("")}
  <section aria-labelledby="to-interactive"><h2 id="to-interactive">Interactive tools</h2><ul>${WF_ALL().map(id=>`<li><a href="#workflows-${id}">${esc(WF[id].name)}</a>: ${esc(WF[id].who)}. ${esc(GUIDE[id]?GUIDE[id].cadence:"")}</li>`).join("")}<li><a href="#calendar-export">Calendar export</a></li><li><a href="#recognition-proportion">Proportionality guide</a></li><li><a href="#help-ideas">Ideas and wishlist</a></li><li><a href="#help-tours">Guided tours</a></li></ul>
  <h3>Calendar in words</h3><ul>${allOcc().filter(o=>o.date>=TODAY).slice(0,40).map(o=>`<li>${esc(fmtLong(o.date))}: ${esc(o.e.summary.replace(/^(\[[A-Z-]+\])+\s*/,""))} (${esc(TYPE_LABEL[o.e.type])}; ${esc(statusOf(o.e).t)})</li>`).join("")}</ul></section></div>`; };

/* ---- Accessibility statement ---- */
V.help_a11y = () => `<p class="lede">Draft accessibility statement for the Awards and Recognition Hub, following the structure of GOV.UK accessibility statements.</p>
  <div class="note warn"><strong>Compliance status: partially compliant.</strong> The Hub has not yet had a manual audit against WCAG 2.2 AA with assistive technology users. Until it has, use the <a href="#help-textonly">text-only version</a> or the <a href="#help-easyread">Easy Read version</a> if the standard view does not work for you.</div>
  <div class="grid g2"><div class="card stack"><h3 id="as-done">What we have done</h3>${cardList(["Automated WCAG 2.2 AA checks (axe-core) on every page, in light and dark themes, before each release (self-check K22)","Keyboard access to every control, visible focus and skip link","Semantic headings, landmarks, tables with headers and labelled form fields","Text alternatives for charts and icon-only buttons","Display settings: text size, easier reading spacing, high contrast, reduced motion, underlined links","Easy Read and text-only versions","Plain English and inclusive language checks (self-checks K32 and K33)","No information conveyed by colour alone: status also shown in words and icons"])}</div>
  <div class="card stack"><h3 id="as-known">Known limitations</h3>${cardList(["No manual audit or testing with disabled users yet","Easy Read not yet tested with people with learning disabilities","The timeline and knowledge graph are visual; text versions are provided beside them","Some long tables scroll sideways on small screens","Downloads depend on the viewer's platform; copy options are always provided"])}</div></div>
  <div class="grid g2"><div class="card stack"><h3 id="as-report">Reporting problems</h3><p class="small">Use <a href="#help-ideas">Ideas and wishlist</a> and choose Problem. Describe the page and what got in the way. Do not include personal information.</p></div><div class="card stack"><h3 id="as-prep">Preparation of this statement</h3><p class="small">Prepared on ${fmtLong(D.meta.build_date)} for release ${esc(D.meta.version)}. Last automated test: ${esc(String(D.a11y.scanned||0))} views, ${esc(String((D.a11y.critical||0)+(D.a11y.serious||0)))} serious or critical issues.</p></div></div>`;

/* ---- Top tasks (UCD entry points) ---- */
const TOP_TASKS = [
  ["thanks","Thank someone","workflows-thanks"],["nominate","Nominate someone","workflows-nominate"],["search","Find an award","routes-finder"],["clock","See what closes soon","overview-week"],
  ["manager","I'm a line manager","recognition-managers"],["leader","I'm a leader","recognition-leaders"],["hr","I work in HR or reward","recognition-hr"],["person","Prepare for my review","workflows-myevidence"],
  ["send","Send to Teams, Slack or Gmail","connect-send"],["innov","Recognise innovation","recognition-innovation"],["easy","Easy Read","help-easyread"],["textonly","Text-only version","help-textonly"],["sitemap","Site map","help-sitemap"]
];
function topTasksHTML(){ return `<section class="stack" aria-labelledby="tt-h"><h3 id="tt-h">I want to…</h3><div class="toptasks">${TOP_TASKS.map(t=>`<a class="toptask" href="#${t[2]}">${ico(t[0],"ico")}<span>${esc(t[1])}</span></a>`).join("")}</div></section>`; }

/* ---- Signposting and enhancement after each render ---- */
const AUTO_TERMS = ["CSA","BDA","EA","NDA","AiG","KAVS","DPIA","MoG","PSED","PDP","STAR format","UID","TBC","RRULE","DEIA","EIA","DPO/IG","Success Profiles","Trivial benefit","Non-consolidated award","Adaptive Card","Block Kit","Open Badges"];
function autoTerms(root){ const gl=new Set(C.glossary.map(g=>g[0])); const terms=AUTO_TERMS.filter(t=>gl.has(t)); const done=new Set();
  const rx=new RegExp("\\b("+terms.map(t=>t.replace(/[.*+?^${}()|[\]\\\/]/g,"\\$&").replace("STAR format","STAR")).join("|")+")\\b");
  const walker=document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {acceptNode:n=>{ const p=n.parentElement; if(!p||p.closest("a,button,code,pre,textarea,input,select,abbr,[data-term],h1,h2,h3,.mono,svg,label,summary,th,.tag,.pill,.prov,.outpre")) return NodeFilter.FILTER_REJECT; return rx.test(n.nodeValue)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP; }});
  const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(n=>{ const m=n.nodeValue.match(rx); if(!m) return; const word=m[1], key=word==="STAR"?"STAR format":word; if(done.has(key)) return; done.add(key);
    const i=m.index, after=n.splitText(i); after.nodeValue=after.nodeValue.slice(word.length); const ab=document.createElement("abbr"); ab.setAttribute("data-term",key); ab.tabIndex=0; ab.textContent=word; after.parentNode.insertBefore(ab, after); }); }
function noteIcons(root){ $$(".note",root).forEach(n=>{ if(n.dataset.ic) return; n.dataset.ic=1; const k=n.classList.contains("bad")?"s_bad":n.classList.contains("warn")?"s_warn":n.classList.contains("ok")?"s_ok":"s_info"; const hasInline=[...n.childNodes].some(c=>(c.nodeType===3&&c.textContent.trim())||(c.nodeType===1&&getComputedStyle(c).display.startsWith("inline")));
    if(hasInline){ const w=document.createElement("div"); w.className="notebody"; while(n.firstChild) w.appendChild(n.firstChild); n.appendChild(w); } /* D50: keep a sentence with links on one flowing line */
    n.insertAdjacentHTML("afterbegin", ico(k,"ico noteico")); n.classList.add("hasico"); }); }
function readingTime(root){ const w=(root.innerText.match(/\S+/g)||[]).length; return Math.max(1, Math.round(w/200)); }
function signpost(sec, tab){ const vis=sec.tabs.filter(t=>!(t[5]&&t[5].hidden)||t[0]===cur.t); const i=vis.findIndex(t=>t[0]===cur.t); const prev=vis[i-1], next=vis[i+1];
  const rel = (sec.id==="workflows" && GUIDE[tab[0]]) ? GUIDE[tab[0]].related : [];
  return `<nav class="signpost" aria-label="Page navigation">${prev?`<a class="spl" href="#${sec.id}-${prev[0]}">${ico("prev","ico")}<span><span class="eyebrow">Previous</span>${esc(prev[1])}</span></a>`:"<span></span>"}<a class="sptop" href="#top">${ico("top","ico")}<span>Back to top</span></a>${next?`<a class="spr" href="#${sec.id}-${next[0]}"><span><span class="eyebrow">Next</span>${esc(next[1])}</span>${ico("next","ico")}</a>`:"<span></span>"}</nav>
  ${rel.length?`<div class="related"><strong class="small">Related:</strong> ${rel.map(h=>`<a class="small" href="#${h}">${esc(h.split("-").map(x=>x[0].toUpperCase()+x.slice(1)).join(" › "))}</a>`).join(" · ")}</div>`:""}
  <div class="feedback" id="fbBox"><span class="small">Was this page useful?</span><button type="button" class="chip" data-fb="yes">Yes</button><button type="button" class="chip" data-fb="no">No</button><span class="small" id="fbMsg" aria-live="polite"></span></div>`; }
function enhance(sec, tab){ const panel=$("#panel"); if(!panel) return;
  const head=$(".sechead"); if(head && !$(".crumbs",head)){ const rt=readingTime(panel); head.insertAdjacentHTML("afterbegin", `<nav class="crumbs" aria-label="Breadcrumb"><ol>${sec.id==="overview" ? (tab[0]==="front" ? `<li aria-current="page">Home</li>` : `<li><a href="#overview-front">Home</a></li><li aria-current="page">${esc(tab[1])}</li>`) : `<li><a href="#overview-front">Home</a></li><li><a href="#${sec.id}">${esc(sec.label)}</a></li><li aria-current="page">${esc(tab[1])}</li>`}</ol><span class="small muted rtime">${ico("clock","ico")} About ${rt} minute${rt===1?"":"s"} to read</span></nav>`); }
  const ids=$$("#panel h3[id]"); if(ids.length>=3) panel.insertAdjacentHTML("afterbegin", `<nav class="onpage" aria-label="On this page"><span class="eyebrow">On this page</span>${ids.slice(0,10).map(h=>`<a href="#${sec.id}-${tab[0]}" data-jump="${h.id}">${esc(h.textContent.trim())}</a>`).join("")}</nav>`);
  $$(".onpage [data-jump]",panel).forEach(a=>a.onclick=e=>{ e.preventDefault(); const t=document.getElementById(a.dataset.jump); t&&t.scrollIntoView({block:"start"}); t&&(t.tabIndex=-1, t.focus({preventScroll:true})); });
  panel.insertAdjacentHTML("beforeend", signpost(sec, tab));
  panel.insertAdjacentHTML("beforeend", pageMetaHTML(sec)); const an=assumptionNoteHTML(sec, tab); if(an) panel.insertAdjacentHTML("afterbegin", an);
  $$("[data-fb]",panel).forEach(b=>b.onclick=()=>{ const f=store.get("fb",{}); f[sec.id+"-"+tab[0]]=b.dataset.fb; store.set("fb",f); $("#fbMsg").innerHTML = b.dataset.fb==="yes" ? "Thanks." : `Sorry about that. <a href="#help-ideas">Tell us what was missing</a>.`; });
  $$(".sptop",panel).forEach(a=>a.onclick=e=>{ e.preventDefault(); scrollTo({top:0}); $("#top")&&($("#top").tabIndex=-1, $("#top").focus({preventScroll:true})); });
  autoTerms(panel); noteIcons(panel); bindTips(); decorate(sec, tab);
  $$("svg[role='img']",panel).forEach(s=>{ if(!s.getAttribute("aria-label")) s.setAttribute("aria-label","Chart"); }); }

/* ---- Chart text alternatives ---- */
function timelineText(){ return `<details class="card alt"><summary><strong>${ico("textonly","ico")} Text version of this timeline</strong></summary><ul class="tick small">${allOcc().filter(o=>o.date>=TODAY).slice(0,30).map(o=>`<li>${esc(fmtLong(o.date))}: ${esc(ROUTE[o.e.route]||o.e.route)}, ${esc(TYPE_LABEL[o.e.type])}: ${esc(o.e.summary.replace(/^(\[[A-Z-]+\])+\s*/,""))} (${esc(statusOf(o.e).t)})</li>`).join("")}</ul></details>`; }
function graphText(){ const rows={}; D.events.forEach(e=>{ (rows[e.route]=rows[e.route]||new Set()).add(TYPE_LABEL[e.type]); }); return `<details class="card alt"><summary><strong>${ico("textonly","ico")} Text version of this graph</strong></summary><ul class="tick small">${Object.entries(rows).map(([r,s])=>`<li>${esc(ROUTE[r]||r)} has ${esc([...s].join(", "))} events.</li>`).join("")}</ul></details>`; }

/* ---- Inclusive language and readability checks ---- */
const EXCLUSIVE = [["whitelist","allowlist"],["blacklist","blocklist"],["manpower","staffing"],["chairman","chair"],["man-hours","hours"],["sanity check","quick check"],["dummy","placeholder"],["crippled","broken"],["blind spot","gap"],["grandfathered","legacy"],["guys","everyone"]];
function readability(text){ const sents=text.split(/[.!?]+\s/).map(s=>s.trim()).filter(s=>s.split(/\s+/).length>=3); const w=sents.reduce((a,s)=>a+s.split(/\s+/).length,0); return sents.length? w/sents.length : 0; }

