/* ================= Release 5e: help, tours, tutorials, ideas ================= */
Object.assign(ICON, {
  help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .8-1 1.5v.7M12 17h.01"/>',
  tour:'<path d="M3 20l6-16 3 8 3-4 6 12z"/>',
  tutorial:'<path d="M2 8l10-5 10 5-10 5z"/><path d="M6 10v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5M22 8v6"/>',
  idea:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
  vote:'<path d="M7 11l5-6 5 6M12 5v14"/>',
  keyboard:'<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>'
});
ICON.helpsec = ICON.help;

/* ---------- User guide ---------- */
const FAQ = [
  ["Who can see what I type?","Workflow drafts, ticks and preferences stay in your browser only. The idea box is shared with everyone who can open the Hub. AI requests send only what that button needs, when you click it."],
  ["Does this Hub submit nominations?","No. It prepares a pack, an approval message and reminders. You submit on the organiser's own form."],
  ["Is anything here used for pay or performance ratings?","No. Managers decide rewards under departmental schemes, on the contribution itself. You may copy your own evidence into objectives or reviews if you choose; the Hub never does it for you."],
  ["How current are the dates?","Each fact carries a provenance code. V means it was re-checked on the organiser's page on the build date. A banner appears once sources are more than 30 days old."],
  ["Why can't I download the .ics file directly?","The platform allows only some file types, so calendars come inside a .zip. You can also copy the .ics text from Calendar › Export."],
  ["What if AI isn't available?","Every AI feature has a template or search fallback, so the Hub works without it."],
  ["Can I ask for identity-related categories to be considered for someone?","Only the person can self-confirm eligibility for identity-dependent categories. Use the opt-in invitation workflow; never assign such a category for them."],
  ["How do I report a problem or suggest an improvement?","Use Help › Ideas and wishlist. Choose 'Problem' for something broken."]
];
const HOWTO = [
  ["nominate","Nominate someone","workflows-nominate"],["thanks","Say thank you well","workflows-thanks"],["search","Find the right award","routes-finder"],["calendar","Put deadlines in Outlook","calendar-export"],
  ["reward","Propose an in-year reward","workflows-reward"],["scale","Decide how big recognition should be","recognition-proportion"],["person","Prepare evidence for my review","workflows-myevidence"],["rhythm","See what's due this week","workflows-rhythm"],
  ["sparkle","Ask the assistant","overview-home"],["s_ok","Check the Hub is working","assurance-checks"]
];
V.help_guide = () => `<div class="grid g3"><div class="card stack" style="border-top:4px solid var(--accent)"><span class="eyebrow">Step 1</span><h3 class="h4">Find what you need</h3><p class="small">Use the sections across the top, the contents drawer on the left, or press <kbd>/</kbd> to search everything.</p></div><div class="card stack" style="border-top:4px solid var(--gilt)"><span class="eyebrow">Step 2</span><h3 class="h4">Follow a workflow</h3><p class="small">Workflows guide you step by step, check the safeguards, and save as you go.</p></div><div class="card stack" style="border-top:4px solid var(--navy)"><span class="eyebrow">Step 3</span><h3 class="h4">Use what it gives you</h3><p class="small">Packs, messages, calendars and records you can copy or download.</p></div></div>
  <div class="row"><button class="btn" type="button" data-tour="welcome">${ico("tour","ico")}<span>Take the 1-minute tour</span></button><a class="btn ghost" href="#help-tutorials">${ico("tutorial","ico")}<span>Try a tutorial</span></a></div>
  <h3 id="hg-map">What's where</h3><div class="grid g3">${SECTIONS.map(s=>`<a class="card stack wfcard" href="#${s.id}"><div class="row" style="gap:10px"><div class="wfico">${ico(s.id==="help"?"helpsec":s.id,"ico")}</div><strong>${esc(s.label)}</strong></div><p class="small muted">${esc(INTRO[s.id]?INTRO[s.id][1]:"")}</p><p class="small">${s.tabs.filter(t=>!(t[5]&&t[5].hidden)).map(t=>esc(t[1])).join(" · ")}</p></a>`).join("")}</div>
  <h3 id="hg-how">How do I…</h3><div class="grid g4">${HOWTO.map(h=>`<a class="card row wfcard" style="gap:10px" href="#${h[2]}">${ico(h[0],"ico")}<span class="small"><strong>${esc(h[1])}</strong></span></a>`).join("")}</div>
  <h3 id="hg-keys">${ico("keyboard","ico")} Keyboard shortcuts</h3><div class="tblwrap"><table><tbody>${[["/","Open search"],["Ctrl+K or Cmd+K","Open search"],["Enter (in search)","Open the top result"],["Arrow keys (in search)","Move through results"],["Left and right arrows (on tabs)","Switch tab"],["Esc","Close search, menus and tours"],["Tab and Shift+Tab","Move between controls"]].map(r=>`<tr><td><kbd>${esc(r[0])}</kbd></td><td>${esc(r[1])}</td></tr>`).join("")}</tbody></table></div>
  <h3 id="hg-data">Your data</h3><div class="tblwrap"><table><thead><tr><th>What</th><th>Where it is kept</th><th>Who can see it</th></tr></thead><tbody>${[["Workflow drafts and cases","This browser","Only you, on this device"],["Ticks, filters and preferences","This browser","Only you"],["AI requests","Sent to Claude on your account when you click","You; nothing is stored by the Hub"],["Ideas and votes","The Hub's shared store, under an opaque id (no names)","Everyone who can open the Hub; only you can edit your ideas"],["Downloads","Your device","You"]].map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("")}</tbody></table></div>
  <h3 id="hg-faq">Frequently asked questions</h3><div class="stack">${FAQ.map(f=>`<details class="card"><summary><strong>${esc(f[0])}</strong></summary><p class="small" style="margin-top:8px">${esc(f[1])}</p></details>`).join("")}</div>
  <h3 id="hg-a11y">Accessibility</h3><p class="small">Automated scans (axe-core, WCAG 2.2 AA rules) run on every view in light and dark themes before each release; see self-check K22. A manual audit with assistive technology is still to do. Report barriers through the idea box as a Problem.</p>`;

/* ---------- Guided tours ---------- */
const TOURS = {
  welcome:{name:"Welcome tour", icon:"tour", who:"Everyone", steps:[
    ["overview-home",".hero-main","Start here","The Hub's purpose and the quickest ways in: start a nomination, ask the assistant or find a route."],
    ["overview-home","#gnav","Sections","Everything the Hub does, grouped. Extra sections fold into More on smaller screens."],
    ["overview-home","#drawer","Contents drawer","In-page navigation for the section you are in, with counts and New or Changed flags. Hide it with the Contents switch."],
    ["overview-home","#searchBtn","Search","Search routes, dates, terms, workflows and more. Press / from anywhere."],
    ["overview-home","#askFab","Ask the assistant","Ask questions in plain English. It searches the Hub, links you to pages and can start workflows."],
    ["overview-home","#chkBadge","Self-checks","Live checks on the Hub's data, privacy and accessibility. Amber means a warning, red a failure."]
  ]},
  nominate:{name:"Nominate someone", icon:"nominate", who:"Nominators", steps:[
    ["workflows-start",".wfhero","The nomination workflow","Seven guided steps from choosing a route to a ready-to-submit pack."],
    ["routes-finder",".grid.g3","Not sure where?","Answer three questions to see matching routes and their deadlines."],
    ["workflows-nominate","#wfNew","Start a case","Your progress saves in this browser. You can run several nominations at once."],
    ["workflows-nominate","details.guide","Guidance and cadence","When to start, who approves, service levels and common pitfalls."],
    ["calendar-planner","#planSel","Plan backwards","Pick a deadline to see every preparation date and draft in STAR form."]
  ]},
  managers:{name:"For line managers", icon:"manager", who:"Line managers", steps:[
    ["recognition-managers",".wfhead","Your role","What line managers can do, the workflows to use and the methods available."],
    ["recognition-methods","#rm-mix","Recognition mix","Build a mix of ways to recognise that fit the budget and the person."],
    ["recognition-proportion","#rubForm","Keep it proportionate","Score the contribution, not the person, to see a fair band."],
    ["recognition-pay",".note.bad","The pay boundary","Rewards run through departmental schemes, never through the recognition portfolio."],
    ["workflows-mywork",".grid.g3","My work","Everything you have in progress and what is due."]
  ]},
  calendar:{name:"Calendar and deadlines", icon:"calendar", who:"Everyone", steps:[
    ["calendar-timeline",".svgwrap","Timeline","Every route's dates. Dashed markers are unconfirmed; hover for details."],
    ["calendar-agenda","#tAgenda","Agenda","Filter, group and copy the list of dates."],
    ["calendar-export","#zipIcs","Export","Download the whole calendar pack, or copy one file."],
    ["calendar-import",".grid.g2","Import guide","Steps for Outlook, Apple and Google calendars."]
  ]},
  assurance:{name:"How the Hub checks itself", icon:"assure", who:"Owners and reviewers", steps:[
    ["assurance-checks",".card","Self-checks","Every check runs on load, with a negative test that proves it can fail."],
    ["assurance-defects","#tDef","Defects and conflicts","Every problem found, its treatment and the check that prevents a repeat."],
    ["assurance-adversarial","#adv-case","Adversarial review","The strongest objections to this work, answered."],
    ["governance-registry",".tblwrap","Source registry","When each organiser source was last verified and is next due."]
  ]}
};
let TOUR=null;
function startTour(id){ TOUR={id, i:0}; showTour(); }
function endTour(){ TOUR=null; const o=$("#tourLayer"); if(o) o.remove(); store.set("tourDone:"+(TOUR&&TOUR.id||""),true); }
function showTour(){ const t=TOURS[TOUR.id], st=t.steps[TOUR.i]; if(("#"+st[0])!==location.hash){ location.hash=st[0]; setTimeout(showTour,250); return; }
  let el=$(st[1]); if(st[1]==="#drawer" && $("#frame").classList.contains("closed")) el=$("#drawerToggle");
  let o=$("#tourLayer"); if(!o){ o=document.createElement("div"); o.id="tourLayer"; o.innerHTML=`<div class="tspot"></div><div class="tpop" role="dialog" aria-modal="false" aria-live="polite"></div>`; document.body.appendChild(o); }
  const spot=$(".tspot",o), pop=$(".tpop",o);
  if(el){ el.scrollIntoView({block:"center", behavior:"auto"}); }
  requestAnimationFrame(()=>{ const r=el?el.getBoundingClientRect():{left:innerWidth/2-100,top:innerHeight/2-40,width:200,height:80};
    Object.assign(spot.style,{left:(r.left-6)+"px",top:(r.top-6)+"px",width:(r.width+12)+"px",height:(Math.min(r.height,innerHeight*0.7)+12)+"px"});
    pop.innerHTML=`<div class="row" style="justify-content:space-between"><span class="eyebrow">${esc(t.name)} · ${TOUR.i+1} of ${t.steps.length}</span><button class="iconbtn2" type="button" id="tClose" aria-label="End tour">✕</button></div><strong>${esc(st[2])}</strong><p class="small">${esc(st[3])}</p><div class="row"><button class="btn ghost" type="button" id="tBack" ${TOUR.i===0?"disabled":""}>Back</button><button class="btn" type="button" id="tNext">${TOUR.i===t.steps.length-1?"Finish":"Next"}</button></div>`;
    const below = r.top + r.height + 220 < innerHeight; const left=Math.max(12, Math.min(innerWidth-352, r.left));
    Object.assign(pop.style,{left:left+"px", top:(below? r.top+Math.min(r.height,innerHeight*0.7)+16 : Math.max(12, r.top-200))+"px"});
    $("#tNext").focus();
    $("#tNext").onclick=()=>{ if(TOUR.i<t.steps.length-1){ TOUR.i++; showTour(); } else { store.set("tourDone:"+TOUR.id,true); endTour(); } };
    $("#tBack").onclick=()=>{ TOUR.i=Math.max(0,TOUR.i-1); showTour(); };
    $("#tClose").onclick=()=>endTour(); });
}
document.addEventListener("keydown",e=>{ if(e.key==="Escape" && TOUR) endTour(); });
V.help_tours = () => `<p class="lede">Short, guided walk-throughs. Each one moves between pages and highlights what to look at. Press Esc to stop at any time.</p><div class="grid g3">${Object.entries(TOURS).map(([id,t])=>`<div class="card stack"><div class="row" style="gap:10px"><div class="wfico">${ico(t.icon,"ico")}</div><div><strong>${esc(t.name)}</strong><br><span class="small muted">${esc(t.who)} · ${t.steps.length} stops</span></div></div><p class="small">${esc(t.steps.map(s=>s[2]).join(" → "))}</p><div class="row"><button class="btn" type="button" data-tour="${id}">${ico("tour","ico")}<span>${store.get("tourDone:"+id,false)?"Take it again":"Start tour"}</span></button>${store.get("tourDone:"+id,false)?pill("Done","ok"):""}</div></div>`).join("")}</div>`;
document.addEventListener("click",e=>{ const b=e.target.closest("[data-tour]"); if(b){ e.preventDefault(); startTour(b.dataset.tour); } });

/* ---------- Tutorials (interactive, self-checking) ---------- */
const TUTORIALS = {
  first:{name:"Your first nomination", icon:"nominate", mins:15, who:"Anyone", tasks:[
    ["Find a route for a team's collaboration","Open the route finder and choose: a team, collaboration, an external award.","routes-finder",()=>{ const f=store.get("finder",{}); return f.who==="team"&&f.what==="collab"&&f.want==="external"; }],
    ["Start a nomination case","Open the nomination workflow and press Start.","workflows-nominate",()=>wfCases("nominate").length>0],
    ["Pass the consent and eligibility gate","Complete steps 1 and 2 of your case.","workflows-nominate",()=>wfCases("nominate").some(c=>c.step>=2)],
    ["Add two sourced claims","In step 3, add two claims each with a source.","workflows-nominate",()=>wfCases("nominate").some(c=>(c.data.ev||[]).filter(x=>String(x.source||"").trim()).length>=2)],
    ["Write a STAR draft within the limit","Fill Situation, Task, Action and Result.","workflows-nominate",()=>wfCases("nominate").some(c=>["s","t","a","r"].every(k=>words(c.data[k])>0) && (!wordLimit(c.data)||starWords(c.data)<=wordLimit(c.data)))]
  ], quiz:[["Can you tell a UK Honours nominee they have been nominated?",["Yes, once it is submitted","No, it is confidential","Only if they ask"],1],["Who confirms eligibility for an identity-dependent category?",["The nominator","The line manager","The nominee themselves"],2],["Where do you submit the nomination?",["In this Hub","On the organiser's own form","By emailing HR"],1]]},
  team:{name:"Recognise your team this month", icon:"manager", mins:10, who:"Line managers", tasks:[
    ["Look at your recognition options","Open Recognition › Line managers.","recognition-managers",()=>store.get("seen:recognition-managers",false)],
    ["Build a mix with no cost","In Ways to recognise, choose Line managers and No cost.","recognition-methods",()=>{ const m=store.get("mix",{}); return m.giver==="M"&&m.cost==="none"; }],
    ["Thank someone specifically","Complete a Thank someone case.","workflows-thanks",()=>wfCases("thanks").some(c=>c.step>=1&&c.data.msg)],
    ["Check proportionality before a reward","Set the guide's evidence to corroborated (2 or more).","recognition-proportion",()=>(store.get("rubric",{}).evidence||0)>=2]
  ], quiz:[["What decides an in-year cash award?",["The recognition portfolio score","The departmental scheme, approved by the scheme approver","Peer votes"],1],["Which measure should never be used to size an award?",["Impact","Hours logged","Strength of evidence"],1]]},
  outlook:{name:"Get the calendar into Outlook", icon:"calendar", mins:5, who:"Everyone", tasks:[
    ["Open the export page","Go to Calendar › Export .ics.","calendar-export",()=>store.get("seen:calendar-export",false)],
    ["Choose one model","Pick the master calendar or one split file, not both.","calendar-export",()=>store.get("exp",null)!==null],
    ["Read the import steps","Open Calendar › Import guide.","calendar-import",()=>store.get("seen:calendar-import",false)],
    ["Import into Outlook","Follow the steps, then tick this when done.","calendar-import",null]
  ], quiz:[["What happens if you import the master and the split calendars?",["Nothing","Every event appears twice","Outlook merges them"],1]]},
  review:{name:"Prepare evidence for your review", icon:"person", mins:15, who:"Employees", tasks:[
    ["Read how the links work","Open Recognition › Objectives, development and reviews.","recognition-career",()=>store.get("seen:recognition-career",false)],
    ["Start your evidence","Open Build my evidence and choose a purpose.","workflows-myevidence",()=>wfCases("myevidence").some(c=>c.data.purpose)],
    ["Map a contribution to a behaviour","Add a contribution with a behaviour number.","workflows-myevidence",()=>wfCases("myevidence").some(c=>(c.data.items||[]).some(x=>x.what&&x.beh))]
  ], quiz:[["Does the Hub send your evidence to your performance review?",["Yes, automatically","No, you copy what you choose","Only at end-year"],1]]}
};
V.help_tutorials = () => { const prog=store.get("tutManual",{}), qz=store.get("tutQuiz",{});
  return `<p class="lede">Hands-on lessons that check your progress as you go. Each task links to the right page; ticks appear when the Hub sees you have done it.</p>
  <div class="stack">${Object.entries(TUTORIALS).map(([id,t])=>{ const done=t.tasks.map((k,i)=>k[3]?!!k[3]():!!prog[id+i]); const n=done.filter(Boolean).length;
    return `<details class="card tut" ${n>0&&n<t.tasks.length?"open":""}><summary class="row" style="gap:12px"><div class="wfico">${ico(t.icon,"ico")}</div><div class="stack" style="gap:2px;flex:1;min-width:0"><strong>${esc(t.name)}</strong><span class="small muted">${esc(t.who)} · about ${t.mins} minutes · ${n} of ${t.tasks.length} done</span><div class="sbar"><span style="width:${100*n/t.tasks.length}%"></span></div></div>${n===t.tasks.length?pill("Complete","ok"):""}</summary>
    <ol class="stack tutlist">${t.tasks.map((k,i)=>`<li class="row" style="gap:10px;align-items:flex-start">${done[i]?sIco("ok"):`<span class="tdot">${i+1}</span>`}<div class="stack" style="gap:2px;flex:1"><strong class="small">${esc(k[0])}</strong><span class="small muted">${esc(k[1])}</span></div><a class="btn ghost" href="#${k[2]}">Go</a>${k[3]?"":`<label class="row small" style="gap:6px"><input type="checkbox" data-tutman="${id+i}" ${prog[id+i]?"checked":""}> Done</label>`}</li>`).join("")}</ol>
    <div class="card stack" style="background:var(--sunk)"><strong class="small">Check your understanding</strong>${t.quiz.map((q,qi)=>{ const ans=qz[id+qi]; return `<fieldset class="stack" style="border:0;padding:0;margin:0"><legend class="small"><strong>${esc(q[0])}</strong></legend><div class="chips">${q[1].map((o,oi)=>`<button type="button" class="chip" data-quiz="${id+qi}" data-opt="${oi}" aria-pressed="${ans===oi}">${esc(o)}</button>`).join("")}</div>${ans!=null?`<span class="small" style="color:${ans===q[2]?"var(--ok)":"var(--bad)"}">${ans===q[2]?"Correct.":"Not quite: "+esc(q[1][q[2]])+"."}</span>`:""}</fieldset>`; }).join("")}</div></details>`; }).join("")}</div>`; };
V.help_tutorials.after = () => { $$("[data-tutman]").forEach(c=>c.onchange=()=>{ const p=store.get("tutManual",{}); p[c.dataset.tutman]=c.checked; store.set("tutManual",p); render(); });
  $$("[data-quiz]").forEach(b=>b.onclick=()=>{ const q=store.get("tutQuiz",{}); q[b.dataset.quiz]=+b.dataset.opt; store.set("tutQuiz",q); const y=scrollY; render(); scrollTo(0,y); }); };

/* ---------- Ideas and wishlist (shared db) ---------- */
const ROADMAP = [
  ["Shared team nomination tracker","Let a team see nominations in one place.","Needs a governed data store and a DPIA","Under consideration"],
  ["Manual accessibility audit","Test with screen readers and keyboard-only users.","Automated scans pass; manual audit outstanding","Planned"],
  ["Solution architecture and designs","SAD, HLD and LLD drafted in Service design › Architecture; service blueprints still to write.","Drafts need review by the technical design authority","In progress"],
  ["User requirement for on-time nominations","Add a user requirement for outcome O4.","Traceability gap","Planned"],
  ["Complete gate G8 (retention and mobility)","Define the question and pass condition with DPO/IG.","Incomplete in source","Planned"],
  ["Scheduled source monitoring","Run the weekly organiser checks automatically.","Needs an approved automation platform","Under consideration"],
  ["Aggregate recognition-gap analysis","Quarterly aggregate view of where recognition is missing.","Needs aggregate data with disclosure control","Under consideration"]
];
const NOT_PLANNED = [
  ["Feeding recognition into performance ratings","Breaks the guardrail that the portfolio is not a performance tool."],
  ["Hours or activity tracking to size awards","Intrusive and discriminatory; see Fair and proportionate."],
  ["Leaderboards, points or peer voting on people","Ranks people and rewards popularity."],
  ["Inferring identity to widen eligible pools","Prohibited by the decision gates."]
];
let IDB=null, IUSER=null, IDEAS=[], VOTES={}, TRIAGE={}, IDEAS_STATE="loading", ME=null, IUNSUB=[];
async function ideasInit(){ if(IDB!==null || IDEAS_STATE==="off") return; IDB = await capUse("db"); IUSER = await capUse("user");
  if(!IDB){ IDEAS_STATE="off"; if(cur.s==="help"&&cur.t==="ideas") render(); return; }
  ME = IUSER ? await IUSER.id() : null; IDEAS_STATE="ready";
  const err=e=>{ IDEAS_STATE = e&&e.code==="revoked"?"off":"ready"; };
  IUNSUB.push(IDB.collection("ideas").onSnapshot(s=>{ IDEAS=s.docs.flatMap(d=>{ const b=d.data()||{}; return (b.items||[]).map(it=>Object.assign({}, it, {owner:d.id, key:d.id+"~"+it.id})); }); paintIdeas(); }, err));
  IUNSUB.push(IDB.collection("votes").onSnapshot(s=>{ VOTES={}; s.docs.forEach(d=>{ const b=d.data()||{}; Object.keys(b.ideas||{}).forEach(k=>{ if(b.ideas[k]) VOTES[k]=(VOTES[k]||0)+1; }); }); paintIdeas(); }, err));
  IUNSUB.push(IDB.doc("triage/status").onSnapshot(s=>{ TRIAGE=(s.exists&&s.data().map)||{}; paintIdeas(); }, err));
  if(cur.s==="help"&&cur.t==="ideas") render(); }
let MYVOTES = {};
function paintIdeas(){ const box=$("#ideaList"); if(!box) return; const sort=store.get("ideaSort","votes"), kind=store.get("ideaKind","");
  const list=IDEAS.filter(i=>(TRIAGE[i.key]||{}).status!=="Hidden").filter(i=>!kind||i.kind===kind).sort((a,b)=>sort==="new"?String(b.created).localeCompare(String(a.created)):(VOTES[b.key]||0)-(VOTES[a.key]||0));
  box.innerHTML = list.length ? list.map(i=>{ const st=(TRIAGE[i.key]||{}).status||"New", mine=i.owner===ME, voted=!!MYVOTES[i.key];
    return `<article class="card idea"><button type="button" class="votebtn" data-vote="${esc(i.key)}" aria-pressed="${voted}" aria-label="${voted?"Remove your vote":"Vote for this"}" ${ME?"":"disabled"}>${ico("vote","ico")}<b>${VOTES[i.key]||0}</b></button><div class="stack" style="gap:4px;min-width:0"><div class="row" style="gap:8px"><strong>${esc(i.title)}</strong>${pill(i.kind,"info")}${pill(st, st==="Done"?"ok":st==="Planned"?"warn":st==="Not now"?"mute":"mute")}</div><p class="small">${esc(i.body||"")}</p><span class="small muted">${esc(i.area?("About: "+i.area+" · "):"")}${mine?"Yours · ":""}${esc(fmt(String(i.created||TODAY).slice(0,10)))}</span>
    <div class="row">${mine?`<button type="button" class="btn ghost" data-idel="${esc(i.id)}">Delete</button>`:""}${IS_EDITOR?`<label class="small">Status <select data-istatus="${esc(i.key)}">${["New","Under review","Planned","Done","Not now","Hidden"].map(s=>`<option${s===st?" selected":""}>${s}</option>`).join("")}</select></label>`:""}</div></div></article>`; }).join("") : `<p class="muted">No ideas yet. Be the first to suggest one.</p>`;
  $$("[data-vote]",box).forEach(b=>b.onclick=()=>toggleVote(b.dataset.vote));
  $$("[data-idel]",box).forEach(b=>b.onclick=()=>deleteIdea(b.dataset.idel));
  $$("[data-istatus]",box).forEach(s=>s.onchange=()=>setStatus(s.dataset.istatus, s.value));
  const c=$("#ideaCount"); if(c) c.textContent = IDEAS.length+" idea"+(IDEAS.length===1?"":"s")+" · "+Object.values(VOTES).reduce((a,b)=>a+b,0)+" votes"; }
let IS_EDITOR=false;
async function myVotesLoad(){ if(!IDB||!ME) return; try{ const s=await IDB.doc("votes/"+ME).get(); MYVOTES=(s.exists&&s.data().ideas)||{}; }catch(e){} }
async function toggleVote(key){ if(!IDB||!ME) return; const next=Object.assign({}, MYVOTES); if(next[key]) delete next[key]; else next[key]=true; MYVOTES=next; paintIdeas(); try{ await IDB.doc("votes/"+ME).set({ideas:next}); }catch(e){ $("#ideaMsg").textContent="Your vote couldn't be saved. You may have view-only access."; } }
async function myIdeasDoc(){ const s=await IDB.doc("ideas/"+ME).get(); return (s.exists&&s.data().items)||[]; }
async function submitIdea(ev){ ev.preventDefault(); const t=$("#iTitle").value.trim(), b=$("#iBody").value.trim(), k=$("#iKind").value, a=$("#iArea").value, msg=$("#ideaMsg");
  if(!t){ msg.textContent="Add a short title."; $("#iTitle").focus(); return; }
  if(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(t+" "+b) || /(?:\+44\s?|\b0)(?:\d[\s-]?){9,10}\b/.test(t+" "+b)){ msg.textContent="Please remove email addresses and phone numbers before submitting."; return; }
  if(IDENTITY_RX.test(t+" "+b) && !$("#iOk").checked){ msg.innerHTML="Your idea mentions an identity term. Ideas are shared with everyone, so don't describe any person. Tick to confirm it's about the Hub, not a person."; $("#iOkRow").hidden=false; return; }
  if(!IDB||!ME){ const loc=store.get("ideasLocal",[]); loc.unshift({id:"l"+Date.now().toString(36), title:t, body:b, kind:k, area:a, created:new Date().toISOString()}); store.set("ideasLocal",loc); msg.textContent="Saved in this browser only: the shared idea box isn't available in this view."; render(); return; }
  try{ const items=await myIdeasDoc(); if(items.length>=50){ msg.textContent="You've reached 50 ideas. Delete one to add another."; return; } items.unshift({id:"i"+Date.now().toString(36), title:t.slice(0,140), body:b.slice(0,1500), kind:k, area:a, created:new Date().toISOString()}); await IDB.doc("ideas/"+ME).set({items}); $("#iTitle").value=""; $("#iBody").value=""; msg.textContent="Thanks, your idea is shared."; }
  catch(e){ msg.textContent = e&&e.code==="quota_exceeded" ? "The idea box is full. Ask the Hub owner to archive old ideas." : "Your idea couldn't be saved. You may have view-only access."; } }
async function deleteIdea(id){ const box=$("#ideaMsg"); box.innerHTML=`Delete this idea? <button type="button" class="btn" id="idY">Delete</button> <button type="button" class="btn ghost" id="idN">Keep</button>`; $("#idN").onclick=()=>{ box.textContent=""; }; $("#idY").onclick=async()=>{ try{ const items=(await myIdeasDoc()).filter(x=>x.id!==id); await IDB.doc("ideas/"+ME).set({items}); box.textContent="Deleted."; }catch(e){ box.textContent="Couldn't delete it."; } }; }
async function setStatus(key, status){ try{ const s=await IDB.doc("triage/status").get(); const map=Object.assign({}, (s.exists&&s.data().map)||{}); map[key]={status, at:TODAY}; await IDB.doc("triage/status").set({map}); }catch(e){ $("#ideaMsg").textContent="Only editors of the Hub can change status."; } }
V.help_ideas = () => { ideasInit(); const loc=store.get("ideasLocal",[]);
  return `<p class="lede">Suggest an improvement, wish for a feature or report a problem. Ideas are shared with everyone who can open the Hub; vote for the ones you want most. No names are stored.</p>
  <div class="wfgrid"><div class="stack"><form class="card stack" id="ideaForm"><h3 id="id-new">${ico("idea","ico")} Add an idea</h3>
    <label class="wf-f" for="iTitle"><strong>Title</strong><input type="text" id="iTitle" maxlength="140" placeholder="One line"></label>
    <label class="wf-f" for="iBody"><strong>Details</strong><span class="muted small">What would it help you do? Don't include names or personal information.</span><textarea id="iBody" rows="4" class="prose" maxlength="1500"></textarea></label>
    <div class="grid g2"><label class="wf-f" for="iKind"><strong>Type</strong><select id="iKind"><option>Idea</option><option>Feature wish</option><option>Problem</option></select></label><label class="wf-f" for="iArea"><strong>Area</strong><select id="iArea"><option value="">General</option>${SECTIONS.map(s=>`<option>${esc(s.label)}</option>`).join("")}</select></label></div>
    <label class="row small" id="iOkRow" hidden style="gap:8px"><input type="checkbox" id="iOk"> This is about the Hub, not about any person</label>
    <div class="row"><button class="btn" type="submit">${ico("idea","ico")}<span>Share idea</span></button><span class="small" id="ideaMsg" aria-live="polite"></span></div>
    <p class="small muted">${IDEAS_STATE==="off"?"The shared idea box isn't available in this view; ideas you add are kept in this browser only.":IDEAS_STATE==="loading"?"Connecting to the shared idea box…":"Connected to the shared idea box."}</p></form>
    <div class="card stack"><div class="row" style="justify-content:space-between"><h3 id="id-list">Ideas</h3><span class="small muted" id="ideaCount"></span></div><div class="ctrls"><label>Sort<select id="iSort"><option value="votes"${store.get("ideaSort","votes")==="votes"?" selected":""}>Most votes</option><option value="new"${store.get("ideaSort","votes")==="new"?" selected":""}>Newest</option></select></label><label>Type<select id="iFilter"><option value="">All</option>${["Idea","Feature wish","Problem"].map(k=>`<option${store.get("ideaKind","")===k?" selected":""}>${k}</option>`).join("")}</select></label></div>
    <div class="stack" id="ideaList"><p class="muted">${IDEAS_STATE==="off"?"Shared ideas aren't available here.":"Loading ideas…"}</p></div>
    ${loc.length?`<h3 class="h4">Saved in this browser</h3><ul class="plain">${loc.map(i=>`<li class="small"><strong>${esc(i.title)}</strong> · ${esc(i.kind)}</li>`).join("")}</ul>`:""}</div></div>
  <aside class="stack"><div class="card stack"><h3 id="id-road">${ico("map","ico")} Wishlist from the build</h3><ul class="plain">${ROADMAP.map(r=>`<li class="stack" style="gap:2px"><span class="row" style="gap:6px"><strong class="small">${esc(r[0])}</strong>${pill(r[3], r[3]==="Planned"?"warn":"info")}</span><span class="small muted">${esc(r[1])} ${esc(r[2])}.</span></li>`).join("")}</ul></div>
  <div class="card stack" style="border-color:var(--bad)"><h3 class="h4">${sIco("bad")} Considered and not planned</h3><ul class="plain">${NOT_PLANNED.map(r=>`<li class="small"><strong>${esc(r[0])}.</strong> <span class="muted">${esc(r[1])}</span></li>`).join("")}</ul></div></aside></div>`; };
V.help_ideas.after = async () => { $("#ideaForm").addEventListener("submit",submitIdea); $("#iSort").onchange=e=>{ store.set("ideaSort",e.target.value); paintIdeas(); }; $("#iFilter").onchange=e=>{ store.set("ideaKind",e.target.value); paintIdeas(); };
  if(IUSER && !IS_EDITOR){ try{ IS_EDITOR = await IUSER.canEdit(); }catch(e){} } await myVotesLoad(); paintIdeas(); };

/* ---------- Benefits and reward schemes (links) ---------- */
const BENEFITS = [
  ["Pay and reward framework","Civil Service pay remit guidance 2026 to 2027","How departments set pay, including the non-consolidated performance pay pot and equality duties.","https://www.gov.uk/government/publications/civil-service-pay-remit-guidance-2026-to-2027/civil-service-pay-remit-guidance-2026-to-2027","V"],
  ["Pay and reward framework","Senior Civil Service performance management and reward","Collection of guidance for the Senior Civil Service.","https://www.gov.uk/government/collections/senior-civil-service-performance-management-and-reward","L"],
  ["Terms and conditions","Civil Service Management Code","The framework of terms and conditions that departments apply.","https://www.gov.uk/government/publications/civil-servants-terms-and-conditions","V"],
  ["Pension","Civil Service Pension Scheme","Scheme information, including alpha.","https://www.civilservicepensionscheme.org.uk/pension-scheme/","L"],
  ["Overview of benefits","Civil Service Careers","Describes flexible working, wellbeing and discount schemes; annual leave usually starting at 25 days and rising to 30 with long service; 5 days a year for learning and development.","https://www.civil-service-careers.gov.uk/","V"],
  ["Overview of benefits","Departmental benefits pages (examples)","For instance HMRC and VOA publish their own benefits pages; check your department's.","https://www.civil-service-careers.gov.uk/hmrc-benefits","L"],
  ["Wellbeing and support","Charity for Civil Servants","Financial, health, caring and bereavement support for people who work in or have retired from the Civil Service.","https://www.cfcs.org.uk/","V"],
  ["Sport, leisure and discounts","CSSC Sports & Leisure","Membership with discounts on days out, gyms and wellbeing activities, plus events.","https://store.cssc.co.uk/","V"],
  ["Salary sacrifice and travel","Cycle to work scheme guidance","Government guidance for employers running cycle to work schemes; check whether your department offers one.","https://www.gov.uk/government/publications/cycle-to-work-scheme-implementation-guidance","L"],
  ["Tax on gifts","HMRC: tax on trivial benefits","When a small gift is tax-free, and why most recognition gifts are not.","https://www.gov.uk/expenses-and-benefits-trivial-benefits","V"],
  ["Your department","Departmental reward and recognition scheme","In-year awards, vouchers, special leave and long-service rules, limits and approvers.","","I"],
  ["Your department","Employee assistance programme and HR policies","Wellbeing support, flexible working, special leave and learning budgets.","","I"]
];
V.rec_benefits = () => { const groups=[...new Set(BENEFITS.map(b=>b[0]))];
  return `<p class="lede">Official links to Civil Service employment benefits and reward schemes. Recognition sits alongside these; it never replaces fair pay, benefits or progression.</p>
  ${groups.map(g=>`<h3 id="bn-${g.split(" ")[0].toLowerCase()}">${esc(g)}</h3><div class="grid g3">${BENEFITS.filter(b=>b[0]===g).map(b=>`<div class="card stack"><div class="row" style="gap:8px">${ico(/Pension/.test(g)?"coin":/Wellbeing/.test(g)?"thanks":/Sport/.test(g)?"party":/Tax/.test(g)?"doc":/department/i.test(g)?"hr":/Terms/.test(g)?"doc":"reward","ico")}<strong>${esc(b[1])}</strong></div><p class="small">${esc(b[2])}</p><div class="row" style="justify-content:space-between">${b[3]?link(b[3],"Open"):'<span class="small muted">On your department\'s intranet</span>'}<abbr class="prov ${b[4]==="V"?"V":b[4]==="L"?"P":"C"}" title="${b[4]==="V"?"Page read on the build date":b[4]==="L"?"Official link located on the build date; page not read":"Internal: varies by department"}">${b[4]}</abbr></div></div>`).join("")}</div>`).join("")}
  <p class="small muted">V: page read on ${fmt(D.meta.build_date)}. L: official link located on that date but not read in full. I: internal to your department. Figures quoted are as stated on the page and may vary by department and grade.</p>`; };

