/* ================= Release 13: one search ranking for the masthead and the assistant ================= */
/* Everyday pages rank above specialist ones; old addresses are rewritten to current pages; common words people use map
   to the pages that answer them. Measured by tests/eval_search.py (an evaluation set run on every change). */
const SEARCH_KIND_W = {Page:4, Workflow:4, Route:3, "At a glance":3, "Public sector scheme":3, "Award winner":2, "Recognition domain":2, "Recognition method":2, Glossary:1,
  Defect:-6, Requirement:-6, Control:-6, Backlog:-6, Checklist:-6, "Change record":-5, "Integration rule":-1};
const SEARCH_SPECIALIST = /\b(defect|bug fix|requirement|backlog|control|checklist|change record|D\d\d|FR-\d|C\d\d)\b/i;
const PAGE_WORDS = {
  "calendar-alerts":"reminders reminder notifications notify subscribe subscription alerts follow",
  "calendar-agenda":"deadline deadlines closing dates what closes next due",
  "help-privacy":"clear data delete cookies storage browser privacy my data forget",
  "workflows-nominate":"nominate nomination nominating submit put forward how do i nominate",
  "help-guide":"help how do i report problem bug question",
  "help-glossary":"glossary meaning definition star format terms",
  "routes-finder":"which award find award suggest route finder choose",
  "recognition-pay":"bonus pay money reward voucher payment",
  "help-easyread":"easy read simple",
  "help-a11y":"accessibility statement",
  "build-dpia":"dpia data protection impact assessment gdpr",
  "build-standards":"standards frameworks atrs algorithmic transparency compliance",
  "connect-brand":"brand logo colours fonts style guide"
};
function rankSearch(q, n){ SIDX = SIDX || searchIndex(); const terms=String(q||"").toLowerCase().split(/\s+/).filter(t=>t.length>1 && !["how","do","i","a","an","the","to","my","for","of","and","is"].includes(t));
  if(!terms.length) return [];
  const spec = SEARCH_SPECIALIST.test(q);
  const score = x => { const t=x.title.toLowerCase(), h=canon(x.hash), extra=(PAGE_WORDS[h]||"");
    const hits = terms.filter(w=>x.text.includes(w) || (x.kind==="Page" && extra.includes(w))).length; if(!hits) return null;
    let s = hits*2 + terms.reduce((a,w)=>a+(t.includes(w)?5:0)+(x.kind==="Page"&&extra.includes(w)?4:0),0);
    if(hits===terms.length) s += 6;
    if(!spec) s += (SEARCH_KIND_W[x.kind]||0) - (/^build-/.test(h)||/Build hub/.test(x.title)?6:0);
    return s; };
  const seen=new Set();
  return SIDX.map(x=>({x, s:score(x)})).filter(r=>r.s!=null).sort((a,b)=>b.s-a.s).map(r=>({title:r.x.title, kind:r.x.kind, hash:canon(r.x.hash), text:r.x.text, s:r.s}))
    .filter(r=>{ const k=r.hash+"|"+r.title; if(seen.has(k)) return false; seen.add(k); return true; }).slice(0, n||40); }
/* ---------------- Sections ---------------- */
const SECTIONS = [
  {id:"overview", label:"Home", group:"Start", tabs:[["front","Home",V.overview_front,null,"new"],["news","What's new",V.overview_new,()=>NEWS.length,"new"],["spotlight","Spotlight",V.overview_spotlight,()=>spotEntries().length,"new",{group:"Spotlight"}],["profiles","Profiles",V.overview_profiles,()=>spotEntries().length,"new",{group:"Spotlight"}],["about","About the portfolio",V.overview_about,null,"changed"]]},
  {id:"workflows", label:"Workflows", group:"Do", tabs:[["start","Start here",V.wf_home,()=>WF_ALL().length],["mywork","My work",V.wf_mywork,()=>WF_ALL().reduce((a,id)=>a+wfCases(id).length,0)||null,"new"],["nominate","Nominate",wfView("nominate"),()=>wfCases("nominate").length||null]].concat(WF_GROUPS.flatMap(([g,ids])=>ids.filter(id=>id!=="nominate").map(id=>[id,WF[id].name,wfView(id),()=>wfCases(id).length||null,["triage","assurance","invite","correct","moderate","discover","publish","release","opencall","leaver"].includes(id)?"new":"",{hidden:true,group:g}]))).concat([["rhythm","Operating rhythm",V.wf_rhythm,()=>RHYTHM.length,"new"],["map","Workflow map",V.wf_map,()=>WF_ALL().length]])},
  {id:"recognition", label:"Recognition", group:"Do", tabs:[["methods","Ways to recognise",V.rec_methods,()=>METHODS.length,"new"],["pay","Pay and reward",V.rec_pay,null,"new"],["proportion","Fair and proportionate",V.rec_proportion,()=>EFFORT_OPTIONS.length,"new"],["benefits","Benefits and schemes",V.rec_benefits,()=>BENEFITS.length,"new"],["peers","Peers",roleView("peer"),null,"new",{group:"By role"}],["managers","Line managers",roleView("manager"),null,"new",{group:"By role"}],["leaders","Leaders and senior managers",roleView("leader"),null,"new",{group:"By role"}],["hr","HR and reward",roleView("hr"),null,"new",{group:"By role"}],["career","Objectives, development and reviews",V.rec_career,()=>LIFECYCLE.length,"new",{group:"For you"}],["domains","Recognition domains",V.rec_domains,()=>DOMAINS.length,"new",{group:"Themes"}],["innovation","Innovation",V.rec_innovation,()=>INNOV.length,"new",{group:"Themes"}],["missions","Missions and priorities",V.rec_missions,()=>MISSION_LINKS.length,"new",{group:"Themes"}]]},
  {id:"calendar", label:"Calendar", group:"Plan", tabs:[["agenda","Agenda",V.calendar_agenda,()=>allOcc().length,"changed"],["alerts","Alerts and subscriptions",V.calendar_alerts,()=>unread().length||null,"new"],["month","Month",V.calendar_month],["timeline","Timeline",V.calendar_timeline],["planner","Nomination planner",V.calendar_planner,null,"new"],["export","Export .ics",V.calendar_export,()=>liveEvents().length,"",{group:"Get the calendar"}],["import","Import guide",V.calendar_import,null,"",{group:"Get the calendar"}]]},
  {id:"routes", label:"Awards", group:"Plan", tabs:[["finder","Route finder",V.routes_finder,null,"new"],["register","Route register",V.routes_register,()=>C.routes.length],["schemes","Public sector schemes",V.rec_sector,()=>SECTOR_SCAN.length,"new"],["community","Community and heritage",V.routes_community,()=>COMMUNITY_ROUTES.length,"new"],["glance","At a glance",V.routes_glance,()=>C.glance.length],["compare","Compare",V.routes_compare,()=>C.compare.length],["criteria","Category criteria",V.routes_criteria,()=>C.criteria.length]]},
  {id:"connect", label:"Connect", group:"Do", tabs:[["hub","Connect hub",V.cx_hub,()=>INTEG.length,"new"],["send","Send and share",V.cx_send,()=>SHARE_ACTIONS.length,"new"],["microsoft","Microsoft 365",V.cx_microsoft,()=>INTEG.filter(i=>i[9]==="microsoft").length,"new",{group:"By platform"}],["google","Google Workspace",V.cx_google,()=>INTEG.filter(i=>i[9]==="google").length,"new",{group:"By platform"}],["slack","Slack",V.cx_slack,()=>INTEG.filter(i=>i[9]==="slack").length,"new",{group:"By platform"}],["others","Other apps",V.cx_others,()=>INTEG.filter(i=>i[9]==="others").length,"new",{group:"By platform"}],["formats","Formats and standards",V.cx_formats,null,"new",{group:"Reference"}],["govern","Integration safeguards",V.cx_govern,()=>INTEG_RULES.length,"new",{group:"Reference"}],["media","Media centre",V.connect_media,()=>COMMS.length,"new",{group:"Brand and media"}],["brand","Brand kit and style guide",V.connect_brand,null,"new",{group:"Brand and media"}],["deck","Brand deck",V.connect_deck,()=>DECK().length,"new",{group:"Brand and media"}]]},
  {id:"evidence", label:"Evidence", group:"Evidence", tabs:[["summary","Summary",V.register_summary,()=>D.agg.total,"",{group:"Register"}],["groups","Networks and communities",V.register_groups,()=>D.groups.length,"",{group:"Register"}],["intersections","Intersections",V.register_intersections,()=>D.intersections.length,"",{group:"Register"}],["template","Record template",V.register_template,null,"",{group:"Register"}],["privacy","Privacy by design",V.safe_privacy,()=>C.privacy.length,"",{group:"Safeguards"}],["gates","Decision gates",V.safe_gates,()=>C.gatesEthical.length,"",{group:"Safeguards"}],["edge","Edge cases",V.safe_edge,()=>C.edge.length,"",{group:"Safeguards"}],["discovery","Safer discovery",V.safe_methods,()=>C.methods.length,"",{group:"Safeguards"}],["ladder","Recognition ladder",V.safe_ladder,()=>C.ladder.length,"",{group:"Safeguards"}]]},
  {id:"help", label:"Help", group:"Reference", tabs:[["guide","User guide",V.help_guide,null,"new"],["tours","Guided tours",V.help_tours,()=>Object.keys(TOURS).length,"new"],["tutorials","Tutorials",V.help_tutorials,()=>Object.keys(TUTORIALS).length,"new"],["ideas","Ideas and wishlist",V.help_ideas,null,"new"],["glossary","Glossary and thesaurus",V.kn_glossary,()=>C.glossary.length,"",{group:"Reference"}],["sources","Sources",V.kn_sources,()=>C.sourcesPublic.length,"",{group:"Reference"}],["privacy","Privacy and your data",V.help_privacy,()=>STORAGE_CATALOG.length,"new",{group:"Reference"}],["sitemap","Site map",V.help_sitemap,()=>SECTIONS.reduce((a,x)=>a+x.tabs.length,0),"new",{group:"Reference"}],["easyread","Easy Read",V.help_easyread,null,"new",{group:"Accessible versions"}],["textonly","Text-only version",V.help_textonly,null,"new",{group:"Accessible versions"}],["a11y","Accessibility statement",V.help_a11y,null,"new",{group:"Accessible versions"}]]},
  {id:"build", label:"Build hub", group:"Specialists", tabs:[["intro","About this hub",V.build_intro,null,"new"],["releases","Release log",V.gov_releases,()=>D.releases.length,"new",{group:"Releases and changes"}],["change","Change control",V.gov_change,()=>D.changes.length,"changed",{group:"Releases and changes"}],["arch","Architecture (SAD, HLD, LLD)",V.svc_arch,()=>ARCH_COMP.length,"new",{group:"Architecture and design"}],["journey","Journey and loop",V.svc_journey,()=>C.journey.length,"",{hidden:true,group:"Architecture and design"}],["anatomy","System anatomy",V.svc_anatomy,null,"",{hidden:true,group:"Architecture and design"}],["roadmap","Pilot roadmap",V.svc_roadmap,()=>C.roadmap.length,"",{hidden:true,group:"Architecture and design"}],["reqs","Requirements",V.svc_reqs,()=>C.reqs.length,"",{hidden:true,group:"Architecture and design"}],["backlog","Backlog and controls",V.svc_backlog,()=>C.backlog.length+C.controls.length,"",{hidden:true,group:"Architecture and design"}],["checklist","Deployment checklist",V.gov_checklist,()=>Object.values(C.checklist).flat().length,"",{hidden:true,group:"Governance"}],["registry","Source registry",V.gov_registry,()=>D.registry.length,"new",{hidden:true,group:"Governance"}],["auto","Automation workflow",V.gov_auto,null,"",{hidden:true,group:"Governance"}],["quality","Data quality",V.build_quality,()=>6,"new",{group:"Data and standards"}],["taxonomy","Taxonomy and ontology",V.kn_taxonomy,null,"",{hidden:true,group:"Data and standards"}],["dictionary","Data dictionary",V.kn_dictionary,()=>C.dictionary.length,"",{hidden:true,group:"Data and standards"}],["trace","Traceability",V.kn_trace,()=>TRACE.length,"new",{hidden:true,group:"Data and standards"}],["graph","Knowledge graph",V.kn_graph,null,"",{hidden:true,group:"Data and standards"}],["open","Open data",V.kn_open,null,"",{hidden:true,group:"Data and standards"}],["checks","Self-checks",V.as_checks,()=>CHECKS.length,"changed",{group:"Assurance"}],["defects","Defects and conflicts",V.as_defects,()=>DEFECTS.length,"changed",{hidden:true,group:"Assurance"}],["adversarial","Adversarial review",V.as_adversarial,()=>ADVERSARIAL.length,"",{hidden:true,group:"Assurance"}],["ai","AI safeguards",V.as_ai,()=>AI_POLICY.length,"new",{hidden:true,group:"Assurance"}],["deid","De-identification log",V.as_deid,null,"",{hidden:true,group:"Assurance"}],["checkpoint","Checkpoint",V.as_checkpoint,null,"",{hidden:true,group:"Assurance"}],["ia","Information architecture review",V.build_ia,()=>IA_MOVES.length,"new",{group:"Architecture and design"}],["review","Professional review",V.build_review,()=>REVIEW.length,"new",{group:"Assurance"}],["security","Security risk assessment",V.build_security,()=>THREATS.length,"new",{group:"Assurance"}],["dpia","Data protection impact assessment",V.build_dpia,()=>DPIA_RISKS.length,"new",{group:"Assurance"}],["standards","Standards and frameworks",V.build_standards,()=>STANDARDS.length,"new",{group:"Governance"}],["drafts","Governance drafts",V.build_drafts,()=>DPIA_SCREEN.length+PRIVACY_NOTICE.length+ATRS_SCREEN.length+MEASURES.length,"new",{group:"Governance"}],["github","GitHub and automation",V.build_github,null,"new",{group:"Operations"}]]}
];
const INTRO = {
  overview:["Awards and Recognition Hub","Verified award dates, fair ways to recognise people and teams, and the tools to make recognition happen."],
  workflows:["Workflows","Step-by-step help to nominate, thank, credit, hand over and keep the calendar right. Progress saves as you go; checks catch problems before you move on."],
  recognition:["Ways to recognise","Every way to show recognition, from a specific thank-you to pay and reward, what each role can do, and themes such as innovation and joining up across government."],
  connect:["Connect","Send recognition to Teams, Outlook, Viva Engage, Gmail, Google Calendar, Slack and other apps, plus the brand kit, media centre and deck. You start and check every send."],
  calendar:["Recognition calendar","Organiser deadlines, ceremonies and milestones, with alerts and reminders for the awards you follow. Dates marked TBC or WATCH are not verified deadlines."],
  routes:["Awards and routes","Find the right award: internal, Civil Service, profession and public sector schemes, with eligibility caveats and a source for every fact."],
  evidence:["Evidence and safeguards","How contribution is recorded without ranking people, and the privacy layers, decision gates and edge cases that keep recognition fair."],
  help:["Help and reference","A user guide, guided tours, tutorials, the idea box, the glossary, sources and accessible versions."],
  build:["Build hub","How the Hub is made, assured and kept up to date: releases, architecture, governance, data standards, self-checks and automation."]
};


/* ---------------- Shell: nav, drawer, router ---------------- */
let cur = {s:"overview", t:"home"};
function parseHash(){ let h=(location.hash||"").replace(/^#/,""); const c=canon(h); if(c!==h){ h=c; try{ history.replaceState(null,"","#"+c); }catch(e){} } const [s,t]=h.split("-"); const sec=SECTIONS.find(x=>x.id===s); if(!sec) return {s:"overview",t:"front"}; const tab=sec.tabs.find(x=>x[0]===t)?t:store.get("tab:"+s, sec.tabs[0][0]); return {s:sec.id, t:sec.tabs.find(x=>x[0]===tab)?tab:sec.tabs[0][0]}; }
function buildNav(){
  const nav=$("#gnav"); nav.innerHTML=SECTIONS.map(s=>`<a href="#${s.id}" data-s="${s.id}"${s.id===cur.s?' aria-current="page"':""}>${ico(s.id,"ico navico")}<span>${esc(s.label)}</span></a>`).join("")+`<div class="morewrap" hidden><button class="more" aria-haspopup="true" aria-expanded="false">More ▾</button><div class="moremenu" hidden></div></div>`;
  fitNav();
}
function fitNav(){
  const nav=$("#gnav"), links=$$("a[data-s]",nav), mw=$(".morewrap",nav), menu=$(".moremenu",nav), btn=$("button.more",nav);
  links.forEach(a=>a.hidden=false); mw.hidden=true; menu.hidden=true; menu.innerHTML="";
  const fits=()=>nav.scrollWidth<=nav.clientWidth+1;
  if (fits()) return;
  mw.hidden=false;
  for (let i=links.length-1; i>=0 && !fits(); i--){ if(links[i].dataset.s!==cur.s) links[i].hidden=true; }
  if (!fits()) links.forEach(a=>a.hidden=true);
  const hidden=SECTIONS.filter((s,i)=>links[i].hidden);
  let lastG=""; menu.innerHTML=hidden.map(s=>{ const g=s.group!==lastG?`<span class="grp">${esc(s.group)}</span>`:""; lastG=s.group; return g+`<a href="#${s.id}"${s.id===cur.s?' aria-current="page"':""}>${ico(s.id,"ico navico")}<span>${esc(s.label)}</span></a>`; }).join("")+`<span class="grp">All pages</span><a href="#help-sitemap">${ico("sitemap","ico navico")}<span>Site map</span></a>`+(innerWidth<=480?`<span class="grp">Tools</span><a href="#calendar-alerts">${ico("bell","ico navico")}<span>Notifications${unread().length?" ("+unread().length+")":""}</span></a><a href="#build-checks">${ico("s_ok","ico navico")}<span>Self-checks</span></a><button type="button" class="menuitem" data-menutheme="1">${ico("palette","ico navico")}<span>Switch colour theme</span></button>`:"");
  $$("[data-menutheme]",menu).forEach(b=>b.addEventListener("click",()=>{ $("#themeBtn").click(); menu.hidden=true; btn.setAttribute("aria-expanded","false"); }));
  btn.textContent = links.every(a=>a.hidden) ? (innerWidth<=640 ? "Menu ▾" : SECTIONS.find(x=>x.id===cur.s).label+" ▾") : "More ▾";
  btn.onclick=()=>{ const open=menu.hidden; if(open){ const r=btn.getBoundingClientRect(); menu.style.top=(r.bottom+6)+"px"; menu.style.right=Math.max(12, innerWidth-r.right)+"px"; } menu.hidden=!open; btn.setAttribute("aria-expanded",String(open)); };
  $$("a",menu).forEach(a=>a.addEventListener("click",()=>{ menu.hidden=true; btn.setAttribute("aria-expanded","false"); }));
}
document.addEventListener("click",e=>{ const m=$(".moremenu"); if(m && !m.hidden && !e.target.closest(".morewrap")){ m.hidden=true; } });
document.addEventListener("keydown",e=>{ if(e.key==="Escape"){ const m=$(".moremenu"); if(m) m.hidden=true; } });
function buildDrawer(){
  const sec=SECTIONS.find(s=>s.id===cur.s);
  let h=`<h2>${esc(sec.label)}</h2>`;
  let lastGrp=null;
  sec.tabs.forEach(([id,label,fn,cnt,flag,opt])=>{ const n=cnt?cnt():null; const on=id===cur.t; const grp=opt&&opt.group||null;
    if(grp!==lastGrp){ if(grp) h+=`<h2 class="dgrp">${esc(grp)}</h2>`; lastGrp=grp; }
    h+=`<div class="dsec"><button data-tab="${id}" aria-current="${on}" title="${esc(label)}" aria-label="${esc(label)}${n!=null?", "+n:""}${flag?", "+flag:""}">${ico(TAB_ICON[id]||sec.id)}<span>${esc(label)}${flag?`<span class="flag">${flag}</span>`:""}</span>${n!=null?`<span class="count">${n}</span>`:""}</button>`;
    if (on){ const hs=$$("#panel h3[id]"); if (hs.length) h+=`<ul class="dsub">${hs.map(x=>`<li><a href="#${cur.s}-${cur.t}" data-jump="${x.id}">${esc(x.textContent)}</a></li>`).join("")}</ul>`; }
    h+=`</div>`; });
  h+=`<div class="dsec dfoot small muted">Flags: <span class="flag">new</span> added by this build · <span class="flag">changed</span> corrected or extended.</div>`;
  const dr=$("#drawer"); dr.innerHTML=h;
  $$("button[data-tab]",dr).forEach(b=>b.addEventListener("click",()=>{ location.hash=cur.s+"-"+b.dataset.tab; if (innerWidth<=900) setDrawer(false, true); }));
  $$("a[data-jump]",dr).forEach(a=>a.addEventListener("click",e=>{ e.preventDefault(); const t=document.getElementById(a.dataset.jump); if(t){ t.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"}); } if (innerWidth<=900) setDrawer(false); }));
}
function setDrawer(open, keep){ $("#frame").classList.toggle("closed",!open); $("#drawerToggle").setAttribute("aria-checked",String(open)); const mob=innerWidth<=900; const b=$("#dback"); if(b) b.hidden=!(open&&mob); const o=$("#drawerOpen"); if(o) o.setAttribute("aria-expanded",String(open)); if(!mob && !keep) store.set("drawer",open); const sd=$("#setDrawer"); if(sd) sd.setAttribute("aria-checked",String(open)); if(open&&mob){ const f=$("#drawer button[aria-current='true']")||$("#drawerClose"); f&&f.focus(); } }
function render(){
  const sec=SECTIONS.find(s=>s.id===cur.s), tab=sec.tabs.find(t=>t[0]===cur.t);
  const [title,lede]=INTRO[sec.id];
  $("#view").innerHTML=`<div class="sechead"><span class="eyebrow">${esc(sec.group)} · ${esc(sec.label)}</span><h1 id="top">${esc(title)}</h1><p class="lede">${esc(lede)}</p></div>
    <div class="tabs" role="tablist" aria-label="${esc(sec.label)} tabs">${sec.tabs.filter(t=>!(t[5]&&t[5].hidden)||t[0]===cur.t).map(([id,label])=>`<button role="tab" id="tab-${id}" aria-selected="${id===cur.t}" aria-controls="panel" tabindex="${id===cur.t?0:-1}" data-t="${id}">${ico(TAB_ICON[id]||sec.id,"ico tabico")}<span>${esc(label)}</span></button>`).join("")}</div>
    <section class="panel" id="panel" role="tabpanel" aria-labelledby="tab-${cur.t}"><h2 class="sr">${esc(tab[1])}</h2>${tab[2]()}</section>`;
  if (tab[2].after) tab[2].after();
  if (sec.id==="workflows" && WF[tab[0]]) wfAfter(tab[0])();
  try{ enhance(sec, tab); }catch(e){ console.warn("enhance", e); }
  $$(".tabs button").forEach((b,i,all)=>{ b.addEventListener("click",()=>{ location.hash=cur.s+"-"+b.dataset.t; }); b.addEventListener("keydown",e=>{ if(e.key==="ArrowRight"||e.key==="ArrowLeft"){ const j=(i+(e.key==="ArrowRight"?1:-1)+all.length)%all.length; all[j].focus(); all[j].click(); } }); });
  $$("#gnav a[data-s]").forEach(a=>{ if(a.dataset.s===cur.s) a.setAttribute("aria-current","page"); else a.removeAttribute("aria-current"); });
  buildDrawer(); fitNav(); bindTips(); const sl=$("#secbarLabel"); if(sl) sl.textContent=sec.label+": "+tab[1];
  document.title = "Awards and Recognition Hub";
  const de=document.documentElement; de.dataset.view=cur.s+"-"+cur.t; de.dataset.renders=String((+de.dataset.renders||0)+1);
}
function route(){ cur=parseHash(); store.set("tab:"+cur.s, cur.t); if(!store.get("noRecent",false)){ const h=cur.s+"-"+cur.t; store.set("recent", [h].concat(store.get("recent",[]).filter(x=>x!==h)).slice(0,12)); } store.set("seen:"+cur.s+"-"+cur.t, true); render(); }
function copyBtn(btn, src, msg){ const b=$(btn); if(!b) return; b.addEventListener("click",()=>{ const t=$(src); const v=t.value; const ok=()=>{ $(msg).textContent="Copied"; }; const fb=()=>{ t.focus(); t.select(); $(msg).textContent="Selected: press Ctrl+C or Cmd+C to copy"; };
  try{ navigator.clipboard.writeText(v).then(ok,fb); }catch(e){ fb(); } }); }
function bindTips(){
  const tip=$("#tip"), gl=Object.fromEntries(C.glossary.map(g=>[g[0],g]));
  $$("[data-term]").forEach(el=>{ if(el._tb) return; el._tb=1; const show=()=>{ const g=gl[el.dataset.term]; if(!g) return; tip.innerHTML=`<strong>${esc(g[0])}</strong><br>${esc(g[1])}`; tip.hidden=false; const r=el.getBoundingClientRect(); const x=Math.min(innerWidth-tip.offsetWidth-12, Math.max(12,r.left)); tip.style.left=x+"px"; tip.style.top=(r.bottom+8+tip.offsetHeight>innerHeight? r.top-tip.offsetHeight-8 : r.bottom+8)+"px"; };
    const hide=()=>{ tip.hidden=true; }; el.addEventListener("mouseenter",show); el.addEventListener("focus",show); el.addEventListener("mouseleave",hide); el.addEventListener("blur",hide); });
}
function footer(){
  $("#footText").innerHTML=`<p><strong>Awards and Recognition Hub</strong> · ${esc(D.meta.edition)} · release <span class="mono">${esc(D.meta.version)}</span> · built ${fmt(D.meta.build_date)} · sources verified ${fmt(D.meta.source_verified)}</p>
  <p><strong>Disclaimer.</strong> Award dates and rules belong to the organisers and can change without notice. Always check the official source before nominating. Nothing here is legal or HR advice.</p>
  <p><strong>Disclosure.</strong> This Hub was assembled with AI assistance from supplied packs, a tracker workbook and a generated visual compendium, then checked against organiser pages where stated. Facts marked C have not been independently verified.</p>
  <p><strong>Transparency.</strong> No private personal data from the supplied files is held in this file; counts below 3 are suppressed. Names in the Spotlight were published by award organisers or official pages (each linked to its source) or added by people themselves with consent. See Assurance for the de-identification log, defects and self-checks.</p>
  <p><strong>Status.</strong> Built and run by its service owner as public-good work and published from a personal GitHub account. It is not an official GOV.UK service, does not speak for any department and is not endorsed by any award organiser. Build profile: public sector › personal public-good work › UK-wide › central government audience; grade G4, because it helps people make decisions about nominating colleagues. Upkeep: one person, about 114 hours a year (modelled; see Build hub).</p>
  <p><strong>Contact.</strong> ${ghBase()?`Use the <a href="${ghIssueURL("contact","Contact: ")}" target="_blank" rel="noopener">contact form</a> (a GitHub issue form; what you write is public, so leave out personal details). If you cannot use it, ask a colleague to raise it for you.`:"Contact form: to be set."} No email address is published.</p>
  <nav class="footmap" aria-label="Site map"><strong>Pages:</strong> ${SECTIONS.map(s=>`<a href="#${s.id}">${esc(s.label)}</a>`).join(" · ")} · <a href="#help-sitemap">Full site map</a></nav>
  <p class="muted">OFFICIAL · Calendar context ${esc(D.meta.tz)} · Open formats: iCalendar (RFC 5545), JSON-LD (schema.org)</p>`;
}
function staleness(){ const age=dayDiff(D.meta.source_verified, TODAY); const b=$("#staleBanner"); if (age>30){ b.hidden=false; b.innerHTML=`<strong>Sources last verified ${age} days ago (${fmt(D.meta.source_verified)}).</strong> Re-verify organiser dates before relying on this calendar.`; } }

function guilloche(){ let p=""; for(let i=0;i<36;i++){ const a=i*10; p+=`<ellipse cx="100" cy="100" rx="92" ry="34" transform="rotate(${a} 100 100)"/>`; } return `<svg class="guil" viewBox="0 0 200 200" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width=".5">${p}<circle cx="100" cy="100" r="22"/><circle cx="100" cy="100" r="96"/></g></svg>`; }
/* ---------------- Boot ---------------- */
applyAcc();
document.body.insertAdjacentHTML("beforeend", askPanelHTML()+accPanelHTML()+shareDlgHTML()+quickMenuHTML()+notifPanelHTML()); bindAcc(); bindSettings(); bindShare(); bindQuick(); bindBell(); browserNotify(false); bindMastSearch();
_obs.observe(document.getElementById("view"), {childList:true, subtree:true});
$("#askFab").addEventListener("click",()=>{ const p=$("#askPanel"); if(p.hidden) openAsk(); else { p.hidden=true; $("#askFab").setAttribute("aria-expanded","false"); } });
$("#askClose").addEventListener("click",()=>{ $("#askPanel").hidden=true; $("#askFab").setAttribute("aria-expanded","false"); $("#askFab").focus(); });
$("#askForm").addEventListener("submit",e=>{ e.preventDefault(); sendAsk(); });
$("#askIn").addEventListener("keydown",e=>{ if(e.key==="Enter"&&!e.shiftKey){ e.preventDefault(); sendAsk(); } });
$("#askStop").addEventListener("click",()=>ASK.ctl&&ASK.ctl.abort());
$("#askReset").addEventListener("click",()=>{ ASK.turns=[]; $$("#askLog .askmsg").slice(1).forEach(n=>n.remove()); });
document.addEventListener("click",e=>{ const q=e.target.closest(".askq"); if(q){ openAsk(q.textContent); return; } const a=e.target.closest("[data-ask]"); if(a){ openAsk(a.dataset.ask); } });
