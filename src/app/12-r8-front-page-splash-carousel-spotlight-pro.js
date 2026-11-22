/* ================= Release 8: front page, splash, carousel, spotlight, profiles, media centre, quick actions ================= */
Object.assign(ICON, {
  home2:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><circle cx="12" cy="14" r="2.5"/>',
  star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
  media:'<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M10 9l5 3-5 3z"/><path d="M7 21h10"/>',
  zap:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  image:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>',
  quote:'<path d="M7 7h4v6H5v-2a4 4 0 0 1 2-4zM15 7h4v6h-6v-2a4 4 0 0 1 2-4z"/><path d="M7 13v4M15 13v4"/>',
  pause:'<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>',
  play:'<path d="M7 5l12 7-12 7z"/>',
  profile:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4.5-6 8-6s7 2 8 6"/>',
  org:'<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-3h4v3"/>'
});
Object.assign(TAB_ICON, {front:"home2", spotlight:"star", profiles:"profile", media:"media"});

/* ---- Logo: an original mark (eight-hue laurel ring around a rosette star) ---- */
function logoSVG(size, cls){ const s=size||64; const dots=[0,1,2,3,4,5,6,7].map(i=>{ const a=(i/8)*Math.PI*2-Math.PI/2, x=32+24*Math.cos(a), y=32+24*Math.sin(a); return `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="4.2" fill="var(--h${i})"/>`; }).join("");
  return `<svg class="${cls||"logo"}" width="${s}" height="${s}" viewBox="0 0 64 64" role="img" aria-label="Awards and Recognition Hub logo"><defs><linearGradient id="lgG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--h0)"/><stop offset="1" stop-color="var(--h6)"/></linearGradient></defs><circle cx="32" cy="32" r="30" fill="var(--surface)" opacity=".55"/>${dots}<circle cx="32" cy="32" r="15" fill="url(#lgG)"/><path d="M32 22.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.4L32 37.3l-5.8 3 1.1-6.4-4.7-4.6 6.5-.9z" fill="#fff"/></svg>`; }

/* ---- Splash screen: once per session, skippable, short, respects reduced motion ---- */
const SPLASH = {ms:2200, oncePerSession:true, skippable:true};
function splashSeen(){ try{ return sessionStorage.getItem("rop:splash")==="1"; }catch(e){ return false; } }
function splashMark(){ try{ sessionStorage.setItem("rop:splash","1"); }catch(e){} }
let showSplash = function(force){ if(!force && (splashSeen() || navigator.webdriver)) return; splashMark();
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.classList.contains("acc-motion");
  const el=document.createElement("div"); el.id="splash"; el.className="splash"+(reduce?" still":""); el.setAttribute("role","dialog"); el.setAttribute("aria-modal","true"); el.setAttribute("aria-labelledby","splashT");
  el.innerHTML=`<div class="blobs" aria-hidden="true"><i></i><i></i><i></i><i></i></div><div class="splashcard glass">${logoSVG(96,"logo splogo")}<h2 id="splashT">Awards and Recognition Hub</h2><p>Find, plan and make fair recognition, with verified dates and safeguards.</p><button type="button" class="btn" id="splashGo">${ico("next","ico")}<span>Enter the Hub</span></button><p class="small muted">Opens automatically. Press any key to skip.</p></div>`;
  document.body.appendChild(el); const go=$("#splashGo"); go.focus({preventScroll:true});
  let done=false; const close=()=>{ if(done) return; done=true; el.classList.add("out"); setTimeout(()=>{ el.remove(); const h=$("#top"); h&&(h.tabIndex=-1, h.focus({preventScroll:true})); }, reduce?0:420); document.removeEventListener("keydown", key, true); };
  const key=e=>{ e.preventDefault(); close(); }; document.addEventListener("keydown", key, true); go.addEventListener("click", close); el.addEventListener("click", e=>{ if(e.target===el) close(); });
  setTimeout(close, reduce?900:SPLASH.ms); };

/* ---- Carousel slides: built from verified Hub content and live calendar data ---- */
function carouselSlides(){ const nd=nextDeadlines(1)[0]; const n90=allOcc().filter(o=>o.date>=TODAY && dayDiff(TODAY,o.date)<=90); const nonFin=METHODS.filter(m=>m[2]!=="Financial").length; const rel=D.releases[D.releases.length-1];
  return [
    {k:"News", ic:"news", h:0, t:"Release "+rel.v.replace(/^v/,"")+" is live", d:clip(rel.notes,190), go:"overview-news", cta:"See what's new"},
    {k:"Data", ic:"calendar", h:3, t: nd ? (ROUTE[nd.e.route]||nd.e.route)+" closes in "+dayDiff(TODAY,nd.date)+" day"+(dayDiff(TODAY,nd.date)===1?"":"s") : "No open deadlines", d: nd ? fmtLong(nd.date)+". "+n90.length+" calendar dates in the next 90 days across "+new Set(n90.map(o=>o.e.route)).size+" routes." : "Watch markers show when new cycles are expected.", go:"calendar-agenda", cta:"Open the agenda"},
    {k:"Insight", ic:"medal", h:6, t:nonFin+" of "+METHODS.length+" ways to recognise cost no money", d:"A specific thank-you, development, time and visibility often matter more than a voucher. Financial reward goes through departmental schemes.", go:"recognition-methods", cta:"Build a recognition mix"},
    {k:"News", ic:"sparkle", h:1, t:"Cabinet Secretary's AI Innovation Award", d:"A quarterly award for innovative use of technology. Shortlisted nominees go straight into the Civil Service Awards.", go:"recognition-sector", cta:"See public sector schemes"},
    {k:"Knowledge", ic:"coin", h:4, t:"When is a gift tax-free?", d:"HMRC: a trivial benefit must cost £50 or less, not be cash or a cash voucher, and not be a reward for work. Most recognition gifts are rewards for work.", go:"recognition-pay", cta:"Read pay and reward"},
    {k:"Insight", ic:"innov", h:5, t:"Recognise the learning, not only the launch", d:"Reward a well-run test, share credit with maintainers and reusers, and set no targets for AI use.", go:"recognition-innovation", cta:"Recognise innovation"},
    {k:"Action", ic:"send", h:2, t:"Send recognition where people work", d:"Open Teams, Outlook, Gmail or Slack with your message filled in. You press Send.", go:"connect-hub", cta:"Open the Connect hub"},
    {k:"Spotlight", ic:"star", h:7, t:"Spotlight on recognised work", d:"Publicly announced winners, network profiles and opt-in profiles, each with its source.", go:"overview-spotlight", cta:"Visit the spotlight"}
  ]; }
const CAROUSEL = {interval:7000, pauseOnHover:true, pauseOnFocus:true, reducedMotionAutoplay:false};
let CAR = {i:0, playing:true, timer:null};
function carouselHTML(){ const sl=carouselSlides();
  return `<section class="car glass" aria-roledescription="carousel" aria-label="Highlights" id="car"><div class="car-ctl"><button type="button" class="iconbtn" id="carPlay" aria-label="Pause the highlights">${ico("pause","ico")}</button><button type="button" class="iconbtn" id="carPrev" aria-label="Previous highlight">${ico("prev","ico")}</button><button type="button" class="iconbtn" id="carNext" aria-label="Next highlight">${ico("next","ico")}</button></div>
  <div class="car-track" id="carTrack" aria-live="off">${sl.map((s,i)=>`<div class="car-slide" role="group" aria-roledescription="slide" aria-label="${i+1} of ${sl.length}: ${esc(s.t)}" data-hue="${s.h}" ${i?"hidden":""}><div class="car-art" aria-hidden="true"><span class="art-blob"></span>${ico(s.ic,"ico")}</div><div class="car-body"><span class="chipk">${esc(s.k)}</span><h3 class="car-t">${esc(s.t)}</h3><p>${esc(s.d)}</p><a class="btn" href="#${s.go}">${esc(s.cta)}</a></div></div>`).join("")}</div>
  <div class="car-dots" role="group" aria-label="Choose a highlight">${sl.map((s,i)=>`<button type="button" class="dot${i?"":" on"}" data-car="${i}" aria-label="Show highlight ${i+1}: ${esc(s.t)}" aria-current="${i===0}"></button>`).join("")}</div></section>`; }
function carouselBind(){ const root=$("#car"); if(!root) return; const slides=$$(".car-slide",root), dots=$$(".car-dots .dot",root), track=$("#carTrack"), play=$("#carPlay");
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.classList.contains("acc-motion");
  const show=i=>{ CAR.i=(i+slides.length)%slides.length; slides.forEach((s,j)=>{ s.hidden=j!==CAR.i; }); dots.forEach((d,j)=>{ d.classList.toggle("on",j===CAR.i); d.setAttribute("aria-current", String(j===CAR.i)); }); };
  const stop=()=>{ clearInterval(CAR.timer); CAR.timer=null; };
  const start=()=>{ stop(); if(CAR.playing) CAR.timer=setInterval(()=>{ if(!document.getElementById("car")) return stop(); show(CAR.i+1); }, CAROUSEL.interval); };
  const setPlay=p=>{ CAR.playing=p; play.setAttribute("aria-label", p?"Pause the highlights":"Play the highlights"); play.innerHTML=ico(p?"pause":"play","ico"); track.setAttribute("aria-live", p?"off":"polite"); p?start():stop(); };
  play.onclick=()=>setPlay(!CAR.playing); $("#carPrev").onclick=()=>{ setPlay(false); show(CAR.i-1); }; $("#carNext").onclick=()=>{ setPlay(false); show(CAR.i+1); };
  dots.forEach(d=>d.onclick=()=>{ setPlay(false); show(+d.dataset.car); });
  root.addEventListener("mouseenter", ()=>stop()); root.addEventListener("mouseleave", ()=>{ if(CAR.playing && !root.contains(document.activeElement)) start(); });
  root.addEventListener("focusin", ()=>stop()); root.addEventListener("focusout", e=>{ if(!root.contains(e.relatedTarget) && CAR.playing) start(); });
  show(CAR.i); setPlay(reduce ? false : CAR.playing); }

/* ---- Quick launch and quick actions ---- */
const QUICK = [
  ["nominate","Nominate","#workflows-nominate"],["thanks","Say thank you","#workflows-thanks"],["search","Find a route","#routes-finder"],["calendar","Deadlines","#calendar-agenda"],
  ["send","Send to Teams or Slack","#connect-send"],["innov","Recognise innovation","#recognition-innovation"],["star","Spotlight","#overview-spotlight"],["media","Media centre","#connect-media"],
  ["sparkle","Ask the Hub","ask"],["easy","Easy Read","#help-easyread"]
];
function quickHTML(){ return `<nav class="quick glass" aria-label="Quick launch">${QUICK.map(q=>q[2]==="ask"?`<button type="button" class="qa" data-ask="What should I do next?">${ico(q[0],"ico")}<span>${esc(q[1])}</span></button>`:`<a class="qa" href="${q[2]}">${ico(q[0],"ico")}<span>${esc(q[1])}</span></a>`).join("")}</nav>`; }
function qfabHTML(){ return `<button type="button" class="qfab" id="qFab" aria-haspopup="true" aria-expanded="false" aria-controls="qMenu" aria-label="Quick actions">${ico("zap","ico")}<span>Quick</span></button><div class="qmenu glass" id="qMenu" hidden role="menu" aria-label="Quick actions">${QUICK.map(q=>q[2]==="ask"?`<button type="button" role="menuitem" data-ask="What should I do next?">${ico(q[0],"ico")}<span>${esc(q[1])}</span></button>`:`<a role="menuitem" href="${q[2]}">${ico(q[0],"ico")}<span>${esc(q[1])}</span></a>`).join("")}<button type="button" role="menuitem" data-blankshare="1">${ico("chat","ico")}<span>New message to share</span></button></div>`; }
function bindQfab(){ const b=$("#qFab"), m=$("#qMenu"); const close=()=>{ m.hidden=true; b.setAttribute("aria-expanded","false"); };
  b.onclick=()=>{ const open=m.hidden; m.hidden=!open; b.setAttribute("aria-expanded",String(open)); if(open){ const f=$("[role=menuitem]",m); f&&f.focus(); } };
  m.addEventListener("click", e=>{ const t=e.target.closest("[role=menuitem]"); if(!t) return; if(t.dataset.blankshare) openShare({title:"",text:""}); close(); });
  m.addEventListener("keydown", e=>{ const it=$$("[role=menuitem]",m), i=it.indexOf(document.activeElement); if(e.key==="ArrowDown"){ e.preventDefault(); it[(i+1)%it.length].focus(); } if(e.key==="ArrowUp"){ e.preventDefault(); it[(i-1+it.length)%it.length].focus(); } if(e.key==="Escape"){ close(); b.focus(); } });
  document.addEventListener("click", e=>{ if(!m.hidden && !e.target.closest("#qMenu,#qFab")) close(); }); }

/* ---- Spotlight: public winners (published by organisers), network profiles, opt-in profiles ---- */
// [scheme, year, category, winner, kind individual|team|organisation, org, citation, url, pageDate, basis]
const PUBLIC_WINNERS = (D.public_winners||[]);
const SPOT_POLICY = "Shown only if published by the organiser or an official page, or added by the person or team themselves. Each entry links to its source. To correct or remove an entry, use the Ideas page or contact the owning team.";
let SPOT = {db:null, user:null, me:null, mine:null, list:[], hidden:{}, state:"loading", editor:false};
async function spotInit(){ if(SPOT.db!==null || SPOT.state==="off") return; SPOT.db = await capUse("db"); SPOT.user = await capUse("user");
  if(!SPOT.db){ SPOT.state="off"; if(cur.t==="spotlight"||cur.t==="profiles") render(); return; }
  try{ SPOT.me = SPOT.user ? await SPOT.user.id() : null; }catch(e){} try{ SPOT.editor = SPOT.user ? await SPOT.user.canEdit() : false; }catch(e){}
  SPOT.state="ready";
  SPOT.db.collection("spotlight").onSnapshot(s=>{ SPOT.list=s.docs.map(d=>Object.assign({id:d.id}, d.data()||{})).filter(p=>p.consent===true && p.name); SPOT.mine=SPOT.list.find(p=>p.id===SPOT.me)||null; paintSpot(); }, ()=>{});
  SPOT.db.doc("spotmod/status").onSnapshot(s=>{ SPOT.hidden=(s.exists&&s.data().hidden)||{}; paintSpot(); }, ()=>{});
  if(cur.t==="spotlight"||cur.t==="profiles") render(); }
/* Profiles are hidden 12 months after their last update (DPIA R3, retention); K42 and func12 check it. */
const PROFILE_DAYS = 365;
const profileCurrent = p => !!p.updated && dayDiff(p.updated, TODAY) <= PROFILE_DAYS;
function spotEntries(){ const out=[];
  PUBLIC_WINNERS.forEach((w,i)=>winnerCurrent(w) && out.push({id:"pw"+i, src:"public", kind:w[4], name:w[3], org:w[5], award:w[0]+" "+w[1], cat:w[2], bio:w[6], url:w[7], date:w[8], basis:w[9]}));
  D.groups.forEach(g=>out.push({id:"rg-"+g.id, src:"register", kind:"team", name:g.name, org:(g.kind||"").split("|").pop().trim(), award:"Ready for recognition: "+g.next, cat:g.type, bio:g.narrative, actions:g.actions, outcomes:g.outcomes, evidence:g.evidence, route:g.route}));
  SPOT.list.filter(p=>!SPOT.hidden[p.id] && profileCurrent(p)).forEach(p=>out.push({id:"op-"+p.id, src:"self", kind:p.kind==="team"?"team":"individual", name:p.name, org:p.org||"", award:p.award||"", cat:p.role||"", bio:p.bio||"", url:/^https:\/\//.test(p.link||"")?p.link:"", consent:p.consent, owner:p.id}));
  return out; }
const SRC_LABEL = {public:"Published by the organiser", register:"Portfolio network profile", self:"Added by the person or team"};
function spotCard(e){ return `<button type="button" class="card stack spotcard" data-spot="${esc(e.id)}"><span class="avatar" aria-hidden="true">${ico(e.kind==="individual"?"profile":e.kind==="organisation"?"org":"people","ico")}</span><span class="chipk">${esc(SRC_LABEL[e.src])}</span><strong>${esc(e.name)}</strong><span class="small">${esc(e.award)}${e.cat?" · "+esc(e.cat):""}</span>${e.org?`<span class="small muted">${esc(e.org)}</span>`:""}<span class="small spotgo">Read profile ${ico("next","ico")}</span></button>`; }
function bindSpotCards(root){ $$("[data-spot]",root||document).forEach(b=>b.onclick=()=>{ store.set("spot:sel", b.dataset.spot); if(cur.t==="profiles") render(); else location.hash="overview-profiles"; }); }
V.overview_spotlight = () => { spotInit(); const all=spotEntries(); const pub=all.filter(e=>e.src==="public"), reg=all.filter(e=>e.src==="register"), self=all.filter(e=>e.src==="self");
  return `<div class="spothero glass"><div class="stack"><span class="eyebrow">Spotlight</span><h3 id="sp-h" class="cxhero-t">Celebrating recognised work</h3><p>Publicly announced award winners from organiser pages, network and community profiles from the portfolio, and profiles that people and teams add themselves.</p><p class="small muted">${esc(SPOT_POLICY)}</p></div>${logoSVG(110,"logo")}</div>
  <h3 id="sp-pub">Publicly announced winners</h3>${pub.length?`<div class="grid g3">${pub.slice(0,9).map(spotCard).join("")}</div>${pub.length>9?`<p><a href="#overview-profiles">See all ${pub.length} winners</a></p>`:""}`:`<p class="muted">No publicly announced winners are listed in this edition.</p>`}
  <h3 id="sp-reg">Networks and communities ready for recognition</h3><p class="small muted">From the portfolio register. These are nominations in preparation, not awards.</p><div class="grid g3">${reg.map(spotCard).join("")}</div>
  <h3 id="sp-self">Added by people and teams</h3>${SPOT.state==="off"?`<p class="muted">Opt-in profiles need the shared store, which is not available in this view.</p>`:self.length?`<div class="grid g3">${self.map(spotCard).join("")}</div>`:`<p class="muted">No profiles yet. <a href="#overview-profiles">Add yours</a>.</p>`}`; };
V.overview_spotlight.after = () => bindSpotCards($("#panel"));
function paintSpot(){ if(cur.s==="overview" && (cur.t==="spotlight"||cur.t==="profiles"||cur.t==="front")){ const y=scrollY; render(); scrollTo(0,y); } }
function profileHTML(e){ if(!e) return "";
  return `<article class="card stack profile glass" aria-labelledby="pf-name"><div class="row" style="gap:14px;align-items:flex-start"><span class="avatar big" aria-hidden="true">${ico(e.kind==="individual"?"profile":e.kind==="organisation"?"org":"people","ico")}</span><div class="stack" style="gap:2px"><span class="chipk">${esc(SRC_LABEL[e.src])}</span><h3 id="pf-name" class="h4">${esc(e.name)}</h3>${e.org?`<span class="small">${esc(e.org)}</span>`:""}</div></div>
  <dl class="pfdl"><dt>Recognition</dt><dd>${esc(e.award)}${e.cat?" · "+esc(e.cat):""}</dd>${e.bio?`<dt>${e.src==="public"?"Citation as published":"About"}</dt><dd>${esc(e.bio)}</dd>`:""}${e.actions?`<dt>What they do</dt><dd>${esc(e.actions)}</dd>`:""}${e.outcomes?`<dt>Outcomes</dt><dd>${esc(e.outcomes)}</dd>`:""}${e.evidence?`<dt>Evidence</dt><dd>${esc(e.evidence)} · route: ${esc(e.route)}</dd>`:""}${e.url?`<dt>Source</dt><dd><a href="${esc(e.url)}" target="_blank" rel="noopener">${esc(e.url.replace(/^https:\/\//,"").slice(0,70))}</a>${e.date?" · "+esc(e.date):""}${e.basis?" · "+esc(e.basis):""}</dd>`:""}</dl>
  <div class="row"><button type="button" class="btn ghost" data-sendcongrats="1">${ico("send","ico")}<span>Send congratulations</span></button>${e.src==="self"&&e.owner===SPOT.me?`<button type="button" class="btn ghost" data-spotdel="1">Remove my profile</button>`:""}${e.src==="self"&&SPOT.editor?`<button type="button" class="btn ghost" data-spothide="${esc(e.owner)}">Hide (editor)</button>`:""}</div></article>`; }
V.overview_profiles = () => { spotInit(); const all=spotEntries(); const sel=all.find(e=>e.id===store.get("spot:sel",""))||all[0]; const kinds=[["public","Publicly announced winners"],["register","Networks and communities"],["self","Added by people and teams"]];
  return `<p class="lede">Individual and team profiles. Public entries quote only what the organiser published.</p>${profileHTML(sel)}
  <div class="grid g2"><div class="stack">${kinds.map(([k,l])=>{ const xs=all.filter(e=>e.src===k); return `<h3 id="pf-${k}">${esc(l)} <span class="muted small">(${xs.length})</span></h3>${xs.length?`<ul class="pflist">${xs.map(e=>`<li><button type="button" class="linkbtn" data-spot="${esc(e.id)}" aria-current="${e===sel}">${ico(e.kind==="individual"?"profile":e.kind==="organisation"?"org":"people","ico")}<span>${esc(e.name)}</span><span class="small muted">${esc(e.award)}</span></button></li>`).join("")}</ul>`:`<p class="muted small">None yet.</p>`}`; }).join("")}</div>
  <div class="card stack"><h3 id="pf-add" class="h4">Add or update your own profile</h3>${SPOT.state==="off"?`<p class="muted">Not available in this view.</p>`:!SPOT.me?`<p class="muted">Sign in to add a profile.</p>`:`<p class="small">Your profile is visible to everyone who can open the Hub. Add only what you are happy to share. You can remove it at any time.</p>
  <form id="spForm" class="stack"><label class="fld">Name as you want it shown<input id="spName" maxlength="80" value="${esc(SPOT.mine?SPOT.mine.name:"")}"></label><label class="fld">Profile for<select id="spKind"><option value="individual"${SPOT.mine&&SPOT.mine.kind==="team"?"":" selected"}>Me</option><option value="team"${SPOT.mine&&SPOT.mine.kind==="team"?" selected":""}>My team (everyone named agreed)</option></select></label><label class="fld">Role or team<input id="spRole" maxlength="80" value="${esc(SPOT.mine?SPOT.mine.role||"":"")}"></label><label class="fld">Department or organisation<input id="spOrg" maxlength="80" value="${esc(SPOT.mine?SPOT.mine.org||"":"")}"></label><label class="fld">Award or recognition<input id="spAward" maxlength="120" value="${esc(SPOT.mine?SPOT.mine.award||"":"")}"></label><label class="fld">About (up to 600 characters)<textarea id="spBio" rows="4" maxlength="600">${esc(SPOT.mine?SPOT.mine.bio||"":"")}</textarea></label><label class="fld">Public link (optional, https)<input id="spLink" maxlength="300" value="${esc(SPOT.mine?SPOT.mine.link||"":"")}"></label><label class="chk"><input type="checkbox" id="spOk"> I agree to this profile being shown to everyone who can open the Hub, and everyone named has agreed.</label><button class="btn" type="submit">${ico("star","ico")}<span>${SPOT.mine?"Update my profile":"Add my profile"}</span></button><p class="copyok" id="spMsg" aria-live="polite"></p></form>`}</div></div>`; };
V.overview_profiles.after = () => { bindSpotCards($("#panel"));
  const all=spotEntries(); const sel=all.find(e=>e.id===store.get("spot:sel",""))||all[0];
  $$("[data-sendcongrats]").forEach(b=>b.onclick=()=>sel&&openShare({title:"Congratulations", text:`Congratulations ${sel.name} on ${sel.award}${sel.cat?" ("+sel.cat+")":""}. ${sel.url?"Read more: "+sel.url:""}`.trim()}));
  $$("[data-spotdel]").forEach(b=>b.onclick=async()=>{ try{ await SPOT.db.doc("spotlight/"+SPOT.me).delete(); store.set("spot:sel",""); }catch(e){ $("#spMsg")&&($("#spMsg").textContent="Your profile couldn't be removed."); } });
  $$("[data-spothide]").forEach(b=>b.onclick=async()=>{ try{ const s=await SPOT.db.doc("spotmod/status").get(); const h=Object.assign({}, (s.exists&&s.data().hidden)||{}); h[b.dataset.spothide]=TODAY; await SPOT.db.doc("spotmod/status").set({hidden:h}); }catch(e){} });
  const f=$("#spForm"); if(f) f.addEventListener("submit", async ev=>{ ev.preventDefault(); const v=id=>$("#"+id).value.trim(), msg=$("#spMsg"); const p={name:v("spName"), kind:$("#spKind").value, role:v("spRole"), org:v("spOrg"), award:v("spAward"), bio:v("spBio"), link:v("spLink"), consent:$("#spOk").checked, updated:TODAY};
    const all=Object.values(p).join(" ");
    if(!p.name){ msg.textContent="Add the name to show."; return; } if(!p.consent){ msg.textContent="Tick the consent box to publish your profile."; return; }
    if(p.link && !/^https:\/\//.test(p.link)){ msg.textContent="Links must start with https://"; return; }
    if(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(all) || /(?:\+44\s?|\b0)(?:\d[\s-]?){9,10}\b/.test(all)){ msg.textContent="Please remove email addresses and phone numbers."; return; }
    if(IDENTITY_RX.test(all) && !f.dataset.idok){ f.dataset.idok="1"; msg.textContent="Your profile mentions an identity characteristic. Keep it only if it describes you and you are happy to share it. Submit again to confirm."; return; }
    const prevSel=store.get("spot:sel",""); store.set("spot:sel","op-"+SPOT.me);
    try{ await SPOT.db.doc("spotlight/"+SPOT.me).set(p); render(); const m=$("#spMsg"); if(m) m.textContent="Saved. Your profile is now in the spotlight."; }catch(e){ store.set("spot:sel",prevSel); msg.textContent="Your profile couldn't be saved. You may have view-only access."; } }); };

/* ---- Media centre ---- */
const PALETTE_NAMES = ["Berry","Blue","Green","Purple","Amber","Teal","Indigo","Navy"];
const COMMS = [
  ["Open call: email","Nominations are open",o=>`Do you know someone whose work deserves recognition?\n\n${o?(ROUTE[o.e.route]||o.e.route)+" closes on "+fmtLong(o.date)+".\n\n":""}Use the Awards and Recognition Hub to find the right award and draft a nomination with the Nominate workflow. Please ask the person before you nominate them.`],
  ["Open call: Teams or Slack post","Nominations are open",o=>`Nominations are open${o?" for "+(ROUTE[o.e.route]||o.e.route)+" (closes "+fmt(o.date)+")":""}. Find a route and draft a nomination in the Awards and Recognition Hub. Ask the person first.`],
  ["Intranet news story","Celebrating recognition across the team",()=>`Recognition matters. This month we are celebrating colleagues and teams whose work made a difference.\n\n[Add the story here, with the agreement of everyone named.]\n\nTo recognise someone, use the Hub's Say thank you or Nominate workflows.`],
  ["Newsletter blurb","Say thank you",()=>`A specific thank-you is the most valued recognition and costs nothing. Say what the person did and the difference it made. The Hub's Say thank you workflow helps.`],
  ["Congratulations message","Congratulations",()=>`Congratulations on your recognition. [Say what they did and why it mattered.] Thank you.`]
];
function bannerSVG(head, sub, hue){ const h=hue||0; return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${HEX_LIGHT[h]}"/><stop offset="1" stop-color="${HEX_LIGHT[(h+5)%8]}"/></linearGradient></defs><rect width="1200" height="630" fill="url(#bg)"/><circle cx="1010" cy="140" r="230" fill="#fff" opacity=".12"/><circle cx="160" cy="560" r="200" fill="#fff" opacity=".10"/>${[0,1,2,3,4,5,6,7].map(i=>{ const a=(i/8)*Math.PI*2-Math.PI/2; return `<circle cx="${(1010+120*Math.cos(a)).toFixed(1)}" cy="${(140+120*Math.sin(a)).toFixed(1)}" r="16" fill="#fff" opacity=".85"/>`; }).join("")}<path d="M1010 92l14 28 31 4.5-22.5 22 5.3 31-27.8-14.7-27.8 14.7 5.3-31-22.5-22 31-4.5z" fill="#fff"/><text x="80" y="330" font-family="Arial, sans-serif" font-size="72" font-weight="800" fill="#fff">${esc(clip(head,28))}</text><text x="80" y="400" font-family="Arial, sans-serif" font-size="34" fill="#fff" opacity=".92">${esc(clip(sub,60))}</text><text x="80" y="560" font-family="Arial, sans-serif" font-size="26" fill="#fff" opacity=".85">Awards and Recognition Hub</text><text x="1120" y="600" text-anchor="end" font-family="Arial, sans-serif" font-size="20" fill="#fff" opacity=".9">Not an official announcement</text></svg>`; }
const HEX_LIGHT = ["#A3124F","#2453A0","#1D7044","#6B3FA0","#9A5300","#0E6B75","#4046B0","#16365C"];
async function svgToPng(svg){ return new Promise((res,rej)=>{ const img=new Image(); img.onload=()=>{ const c=document.createElement("canvas"); c.width=1200; c.height=630; c.getContext("2d").drawImage(img,0,0); c.toBlob(b=>b?res(b):rej(new Error("png")),"image/png"); }; img.onerror=rej; img.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg); }); }
V.connect_media = () => { const o=nextDeadlines(1)[0];
  return `<p class="lede">Brand assets, ready-made banners, comms templates and media guidance for recognition campaigns.</p>
  <h3 id="md-brand">Brand</h3><div class="grid g2"><div class="card stack"><strong>Logo</strong><div class="row" style="gap:18px;align-items:center">${logoSVG(96,"logo")}${logoSVG(56,"logo")}${logoSVG(32,"logo")}</div><p class="small">An original mark: eight colours around a rosette star, one for each section. Use it on a plain background with clear space of half its width.</p><div class="row"><button type="button" class="btn ghost" data-dl="logo">${ico("download","ico")}<span>Download logo (.svg)</span></button></div></div>
  <div class="card stack"><strong>Colour palette</strong><div class="swatches">${HEX_LIGHT.map((h,i)=>`<div class="sw"><span style="background:${h}"></span><b>${PALETTE_NAMES[i]}</b><code>${h}</code></div>`).join("")}</div><p class="small muted">Every colour has at least 4.5:1 contrast with white text, so it is safe for text on white and white text on the colour.</p></div></div>
  <h3 id="md-banners">Banner maker</h3><div class="card stack"><div class="grid g3"><label class="fld">Headline<input id="bnHead" maxlength="28" value="Nominations are open"></label><label class="fld">Line two<input id="bnSub" maxlength="60" value="${esc(o?(ROUTE[o.e.route]||o.e.route)+" closes "+fmt(o.date):"Recognise someone today")}"></label><label class="fld">Colour<select id="bnHue">${PALETTE_NAMES.map((n,i)=>`<option value="${i}">${n}</option>`).join("")}</select></label></div><div class="bnprev" id="bnPrev" role="img" aria-label="Banner preview"></div><div class="row"><button type="button" class="btn" data-dl="bannerpng">${ico("image","ico")}<span>Download banner (.png)</span></button><button type="button" class="btn ghost" data-dl="bannersvg">${ico("download","ico")}<span>Download (.svg)</span></button></div><p class="small muted">1200 by 630 pixels, the size most intranets and social channels use for link cards. Write alt text that repeats the headline and line two.</p><p class="copyok" id="mdMsg" aria-live="polite"></p></div>
  <h3 id="md-comms">Comms toolkit</h3><div class="grid g2">${COMMS.map((c,i)=>`<div class="card stack"><strong>${esc(c[0])}</strong><pre tabindex="0" class="outpre code">${esc(c[2](o))}</pre><div class="row"><button type="button" class="btn ghost" data-comms="${i}">${ico("send","ico")}<span>Send or share</span></button></div></div>`).join("")}</div>
  <h3 id="md-guide">Media guidance</h3><div class="grid g3"><div class="card stack"><strong>Consent first</strong><p class="small">Name people, use photos or quote them only with their agreement. Honours nominations are never publicised.</p></div><div class="card stack"><strong>Accessible media</strong><p class="small">Alt text for every image, captions for every video, plain English, no text-only images for key information.</p></div><div class="card stack"><strong>Describe the work, not the person</strong><p class="small">Say what was done and the difference it made. Never state or imply anyone's protected characteristics unless they described themselves that way and agreed.</p></div></div>
  <h3 id="md-links">Official media</h3><ul class="tick small"><li><a href="https://civilservice.blog.gov.uk/2026/05/29/40890/" target="_blank" rel="noopener">Civil Service blog: Cabinet Secretary's AI Innovation Award</a></li><li><a href="https://datachallenge.uk/" target="_blank" rel="noopener">Civil Service AI &amp; Data Challenge</a></li><li><a href="https://www.civilserviceawards.com/" target="_blank" rel="noopener">Civil Service Awards</a></li></ul>`; };
V.connect_media.after = () => { const prev=()=>{ const s=bannerSVG($("#bnHead").value,$("#bnSub").value,+$("#bnHue").value); $("#bnPrev").innerHTML=s.replace('<svg ','<svg aria-hidden="true" '); $("#bnPrev").setAttribute("aria-label","Banner preview: "+$("#bnHead").value+". "+$("#bnSub").value); return s; };
  ["bnHead","bnSub","bnHue"].forEach(i=>$("#"+i).addEventListener("input", prev)); $("#bnHue").addEventListener("change", prev); prev();
  $$("[data-dl]").forEach(b=>b.onclick=async()=>{ const k=b.dataset.dl, msg=$("#mdMsg")||{textContent:""};
    if(k==="logo"){ const svg=logoSVG(512,"logo").replace(/var\(--h(\d)\)/g,(m,d)=>HEX_LIGHT[+d]).replace(/var\(--surface\)/g,"#FFFFFF").replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" '); return saveFile("awards-and-recognition-hub-logo.svg", svg, msg); }
    const svg=prev(); if(k==="bannersvg") return saveFile("recognition-banner.svg", svg, msg);
    try{ const png=await svgToPng(svg); if(DL){ try{ await DL.save({filename:"recognition-banner.png", data:png}); msg.textContent="Saved recognition-banner.png"; }catch(e){ msg.textContent= e&&e.code==="declined"?"Download cancelled.":"The PNG couldn't be saved here; download the SVG instead."; } } else { const a=document.createElement("a"); a.href=URL.createObjectURL(png); a.download="recognition-banner.png"; a.click(); } }catch(e){ msg.textContent="The PNG couldn't be made in this view; download the SVG instead."; } });
  $$("[data-comms]").forEach(b=>b.onclick=()=>{ const c=COMMS[+b.dataset.comms]; openShare({title:c[1], text:c[2](nextDeadlines(1)[0])}); }); };

/* ---- Front page ---- */
V.overview_front = () => { spotInit(); const nd=nextDeadlines(3); const pub=spotEntries().filter(e=>e.src==="public"); const feat=(pub.length?pub:spotEntries()).slice(0,3);
  const n90=allOcc().filter(o=>o.date>=TODAY && dayDiff(TODAY,o.date)<=90).length;
  return `<div class="front">
  <section class="fhero glass"><div class="blobs" aria-hidden="true"><i></i><i></i><i></i><i></i></div><div class="fhero-in">${logoSVG(88,"logo")}<div class="stack"><span class="eyebrow">Awards and Recognition Hub</span><h2 class="fhero-t">Notice it. Say it. Make it count.</h2><p>Verified award dates, fair ways to recognise people and teams, and the tools to send it where people work.</p><div class="row heroact"><a class="btn" href="#workflows-nominate">${ico("nominate","ico")}<span>Nominate someone</span></a><a class="btn ghost" href="#routes-finder">${ico("search","ico")}<span>Find an award</span></a><a class="btn ghost" href="#workflows-thanks">${ico("thanks","ico")}<span>Say thank you</span></a></div></div></div></section>
  ${frontDeadlinesHTML()}
  ${carouselHTML()}
  <section class="spotstrip"><div class="row" style="justify-content:space-between;gap:8px"><h3 id="fr-spot">${ico("star","ico")} Spotlight</h3><a class="btn ghost" href="#overview-spotlight">${ico("star","ico")}<span>See the spotlight</span></a></div><div class="grid g3">${feat.map(spotCard).join("")}</div></section>
  <h3 id="fr-ins">At a glance</h3><div class="grid g4">
  <div class="kpi">${ico("calendar","ico kico")}<b>${n90}</b><span>Calendar dates in the next 90 days</span></div>
  <div class="kpi">${ico("routes","ico kico")}<b>${C.routes.length}</b><span>Recognition routes</span></div>
  <div class="kpi">${ico("medal","ico kico")}<b>${METHODS.length}</b><span>Ways to recognise</span></div>
  <div class="kpi">${ico("sector","ico kico")}<b>${SECTOR_SCAN.length}</b><span>Public sector schemes</span></div></div>
  <div class="grid g2"><div class="card stack"><h3 id="fr-dg" class="h4">This week's digest</h3><pre tabindex="0" class="outpre code">${esc(digestText())}</pre><div class="row"><button type="button" class="btn ghost" id="frDigest">${ico("send","ico")}<span>Share the digest</span></button></div></div>
  <div class="card stack"><h3 id="fr-news" class="h4">Latest</h3><ul class="tick small"><li><a href="#overview-news">${esc(D.releases[D.releases.length-1].v)}</a>: ${esc(clip(D.releases[D.releases.length-1].notes,140))}</li><li><a href="#recognition-sector">Public sector schemes</a>: ${SECTOR_SCAN.filter(s=>s[6]==="V").length} verified on organiser pages</li><li><a href="#connect-hub">Connect hub</a>: Teams, Outlook, Gmail, Slack and more</li></ul></div></div>

  </div>`; };
V.overview_front.after = () => { carouselBind(); bindSpotCards($("#panel")); bindDeadlineActions($("#panel")); const d=$("#frDigest"); if(d) d.onclick=()=>openShare({title:"Recognition digest", text:digestText()}); };

/* ---- Release 8 self-checks are added in runChecks: K42 spotlight consent and sources, K43 carousel control, K44 splash ---- */

