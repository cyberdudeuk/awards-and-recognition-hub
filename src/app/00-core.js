(function(){
"use strict";
const D = JSON.parse(document.getElementById("portal-data").textContent);
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s==null?"":s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const store = { get(k,d){ try{ const v=localStorage.getItem("rop:"+k); return v==null?d:JSON.parse(v);}catch(e){return d;} }, set(k,v){ try{ localStorage.setItem("rop:"+k, JSON.stringify(v)); }catch(e){} } };
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const pd = s => { const [y,m,d] = s.split("-").map(Number); return new Date(Date.UTC(y,m-1,d)); };
const iso = dt => dt.toISOString().slice(0,10);
const fmt = s => { const d=pd(s); return d.getUTCDate()+" "+MONTHS[d.getUTCMonth()].slice(0,3)+" "+d.getUTCFullYear(); };
const fmtLong = s => { const d=pd(s); return ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getUTCDay()]+" "+d.getUTCDate()+" "+MONTHS[d.getUTCMonth()]+" "+d.getUTCFullYear(); };
const now = new Date();
const TODAY = iso(new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())));
const dayDiff = (a,b) => Math.round((pd(b)-pd(a))/86400000);
const ROUTE = Object.assign({}, D.routes_codes, {CSAI:"Cabinet Secretary's AI Innovation Award", DUK:"Diversity UK Awards"});
const TYPES = ["DEADLINE","MILESTONE","CEREMONY","PREP","WATCH","ONGOING"];
const TYPE_LABEL = {DEADLINE:"Deadline", MILESTONE:"Milestone", CEREMONY:"Ceremony", PREP:"Preparation", WATCH:"Watch", ONGOING:"Ongoing"};
const ICON = {
  overview:'<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  routes:'<circle cx="12" cy="9" r="6"/><path d="M8.5 14L6 22l6-3 6 3-2.5-8"/>',
  register:'<path d="M5 3h11l3 3v15H5z"/><path d="M9 9h6M9 13h6M9 17h4"/>',
  safeguards:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  service:'<circle cx="6" cy="12" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M8.6 10.7l6.8-3.4M8.6 13.3l6.8 3.4"/>',
  governance:'<path d="M4 20h16M6 20V10M10 20V10M14 20V10M18 20V10M3 10l9-6 9 6z"/>',
  knowledge:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5"/>',
  assurance:'<path d="M9 11l3 3 8-8"/><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9"/>',
  dot:'<circle cx="12" cy="12" r="4"/>'
};
const TAB_ICON = {easyread:"easy",textonly:"textonly",a11y:"statement",benefits:"reward",guide:"help",tours:"tour",tutorials:"tutorial",ideas:"idea",proportion:"scale",methods:"medal",pay:"coin",peers:"peer",managers:"manager",leaders:"leader",hr:"hr",career:"career",mywork:"mywork",rhythm:"rhythm",reward:"reward",fairness:"fair",myevidence:"person",objectives:"pdp",triage:"triage",assurance:"assure",invite:"invite",correct:"correct",moderate:"moderate",discover:"discover",publish:"publish",release:"release",opencall:"opencall",leaver:"leaver",home:"overview",week:"clock",not:"s_bad",toc:"map",timeline:"calendar",agenda:"t_PREP",month:"calendar",planner:"clock",export:"download",import:"link",register:"routes",finder:"search",glance:"doc",compare:"map",criteria:"lock",summary:"register",groups:"people",intersections:"r_EA",template:"doc",privacy:"lock",gates:"safeguards",edge:"s_warn",ladder:"r_BDA",journey:"workflows",anatomy:"service",roadmap:"map",reqs:"doc",backlog:"t_PREP",checklist:"s_ok",change:"change",registry:"verify",releases:"t_MILESTONE",auto:"workflows",glossary:"knowledge",taxonomy:"map",dictionary:"doc",trace:"link",graph:"service",sources:"link",open:"download",checks:"s_ok",defects:"s_warn",adversarial:"safeguards",deid:"lock",ai:"sparkle",checkpoint:"t_DEADLINE",start:"workflows",nominate:"nominate",thanks:"thanks",credits:"credits",handover:"handover",reverify:"verify",map:"map"};
ICON.help='<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .8-1 1.5v.7M12 17h.01"/>';
ICON.recognition = '<circle cx="12" cy="9" r="5"/><path d="M9 13.5L7.5 21l4.5-2 4.5 2-1.5-7.5"/>';
const ico = (k, cls="ico") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[k]||ICON.dot}</svg>`;
const pill = (t, k) => `<span class="pill p-${k}">${esc(t)}</span>`;
const prov = c => `<abbr class="prov ${c}" data-term="Provenance code" title="${c==="V"?"Re-verified against the organiser":c==="P"?"From supplied pack":c==="O"?"Portfolio operating rule, not an organiser fact":c==="S"?"Confirmed by the service owner; no public page states it":"Compendium only, unverified"}">${c}</abbr>`;
const term = (t, label) => `<span data-term="${esc(t)}" tabindex="0">${esc(label||t)}</span>`;
const link = (u, t) => u ? `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(t||u.replace(/^https?:\/\//,"").replace(/\/$/,""))}</a>` : '<span class="muted">Internal</span>';

/* ---------------- Calendar model ---------------- */
const DEFAULT_CAND = false;
let includeCandidates = store.get("cand", DEFAULT_CAND);
function statusOf(e){
  if (e.origin==="candidate") return {k:"candidate", t:"Candidate, awaiting approval", c:"warn"};
  if (["PREP","WATCH","ONGOING"].includes(e.type)) return {k:"control", t:"Portfolio control", c:"info"};
  if (e.tbc) return {k:"tbc", t:"Date TBC (tentative)", c:"mute"};
  return {k:"organiser", t:e.origin==="corrected"?"Organiser date (corrected, CR-003)":e.origin==="approved"?"Organiser date (added, CR-002)":"Organiser date", c:"ok"};
}
function rr(e){ const o={}; (e.rrule||"").split(";").filter(Boolean).forEach(p=>{const [k,v]=p.split("="); o[k]=v;}); return o; }
function occurrences(e){
  if (!e.rrule) return [{date:e.start, n:1, of:1}];
  const r=rr(e), n=+r.COUNT||1, step=+(r.INTERVAL||1), out=[];
  const s=pd(e.start);
  for (let i=0;i<n;i++){ const d=new Date(Date.UTC(s.getUTCFullYear(), s.getUTCMonth()+i*step, s.getUTCDate())); out.push({date:iso(d), n:i+1, of:n}); }
  return out;
}
function liveEvents(){ return D.events.filter(e => includeCandidates || e.origin!=="candidate"); }
function allOcc(){ const out=[]; liveEvents().forEach(e => occurrences(e).forEach(o => out.push(Object.assign({e}, o)))); return out.sort((a,b)=>a.date.localeCompare(b.date)); }

/* ---------------- ICS writer (RFC 5545) ---------------- */
function icsEsc(s){ return String(s).replace(/\\/g,"\\\\").replace(/;/g,"\\;").replace(/,/g,"\\,").replace(/\n/g,"\\n"); }
function fold(line){ const out=[]; let cur=""; for (const ch of line){ const nb = new TextEncoder().encode(cur+ch).length; if (nb>75){ out.push(cur); cur=" "+ch; } else cur+=ch; } out.push(cur); return out.join("\r\n"); }
function buildICS(events, name){
  const L=["BEGIN:VCALENDAR","PRODID:-//Awards and Recognition Hub//Release "+D.meta.version+"//EN","VERSION:2.0","CALSCALE:GREGORIAN","METHOD:PUBLISH","X-WR-CALNAME:"+icsEsc(name),"X-WR-TIMEZONE:"+(D.meta.tz||"Europe/London"),"X-WR-CALDESC:"+icsEsc(D.meta.caldesc||"")];
  events.forEach(e => {
    L.push("BEGIN:VEVENT","UID:"+e.uid,"DTSTAMP:"+D.meta.build_date.replace(/-/g,"")+"T120000Z","DTSTART;VALUE=DATE:"+e.start.replace(/-/g,""),"DTEND;VALUE=DATE:"+e.end.replace(/-/g,""));
    if (e.rrule) L.push("RRULE:"+e.rrule);
    L.push("SUMMARY:"+icsEsc(e.summary),"DESCRIPTION:"+icsEsc(e.desc),"CATEGORIES:"+e.categories.map(icsEsc).join(","),"STATUS:"+e.status,"TRANSP:TRANSPARENT");
    if (e.url) L.push("URL:"+e.url);
    if (e.color) L.push("COLOR:"+e.color);
    e.alarms.forEach(a => L.push("BEGIN:VALARM","TRIGGER:"+a,"ACTION:DISPLAY","DESCRIPTION:"+icsEsc(e.summary),"END:VALARM"));
    L.push("END:VEVENT");
  });
  L.push("END:VCALENDAR");
  return L.map(fold).join("\r\n")+"\r\n";
}
function splitSets(){
  const sets = Object.entries(D.split).map(([f,v]) => ({file:f, name:v.name, uids:v.uids.slice()}));
  if (includeCandidates){
    D.events.filter(e=>e.origin==="candidate").forEach(e => {
      const t = sets.find(s=>s.file==="Recognition_Deadlines.ics"); if (t && e.type==="DEADLINE") t.uids.push(e.uid);
      sets.push({file:"Analysis_in_Government_Awards.ics", name:"Analysis in Government Awards (candidate)", uids:[e.uid]});
    });
  }
  return sets;
}

/* ---------------- Self-verification ---------------- */
function runChecks(ctx){
  const ev = ctx.events, res=[];
  const add=(id,name,ok,detail,sev="fail",defect="")=>res.push({id,name,ok,detail,sev:ok?"pass":sev,defect});
  const dup = (keyf) => { const seen={}, d=[]; ev.forEach(e=>{const k=keyf(e); if(seen[k]) d.push(k); seen[k]=1;}); return d; };
  let d;
  d=dup(e=>e.uid); add("K01","No duplicate UID", d.length===0, d.length?("Duplicates: "+d.join(", ")):ev.length+" events, all UIDs unique","fail","Gate 3");
  d=dup(e=>e.summary+"|"+e.start); add("K02","No duplicate summary + start", d.length===0, d.length?d.join(", "):"None found","fail","Pack review");
  d=dup(e=>e.route+"|"+e.type+"|"+e.start); add("K03","No duplicate route + type + start", d.length===0, d.length?d.join(", "):"None found","fail","Gate 4");
  const unb = ev.filter(e=>e.rrule && !/COUNT=\d+|UNTIL=/.test(e.rrule)); add("K04","Every recurrence is bounded", unb.length===0, unb.length?unb.map(e=>e.uid).join(", "):ev.filter(e=>e.rrule).length+" recurring rules, all bounded","fail","Gate 7");
  const badA = ev.filter(e=>e.alarms.some(a=>!/^-P/.test(a))); add("K05","Reminders fire before the event", badA.length===0, badA.length?badA.map(e=>e.uid).join(", "):"All reminder offsets are negative","fail","Gate 6");
  const orgT = ev.filter(e=>e.tbc && !["PREP","WATCH","ONGOING"].includes(e.type)); const badT = orgT.filter(e=>e.status!=="TENTATIVE"); add("K06","TBC organiser markers are TENTATIVE", badT.length===0, badT.length?badT.map(e=>e.uid).join(", "):orgT.length+" TBC organiser events, all tentative","fail","Gate 9");
  const mas = ev.filter(e=>["PREP","WATCH","ONGOING"].includes(e.type) && (e.categories.includes("Deadline")||/\[DEADLINE\]/.test(e.summary))); add("K07","Controls never masquerade as deadlines", mas.length===0, mas.length?mas.map(e=>e.uid).join(", "):"No PREP, WATCH or ONGOING event carries a deadline label","fail","Gate 9");
  const master = new Set(ev.filter(e=>e.origin!=="candidate").map(e=>e.uid));
  const inSplit = new Set(); let stray=[];
  Object.values(ctx.split).forEach(s=>s.uids.forEach(u=>{ inSplit.add(u); if(!master.has(u)) stray.push(u); }));
  const orphan=[...master].filter(u=>!inSplit.has(u));
  add("K08","Split calendars reconcile to the master", stray.length===0 && orphan.length===0, (stray.length||orphan.length)?("Stray: "+stray.join(", ")+" Orphan: "+orphan.join(", ")):Object.keys(ctx.split).length+" split files; every UID reconciles","fail","Gate 8");
  const conf = ev.filter(e=>e.route==="HONOURS" && /\b(Mr|Mrs|Ms|Dr)\.?\s+[A-Z]|@/.test(e.summary+" "+e.desc)); add("K09","Confidential route exposes no candidate identity", conf.length===0, conf.length?"Identity pattern found":"Honours events contain no names or addresses","fail","Gate 10");
  const ea = ev.find(e=>e.uid.startsWith("ethnicity-winners-2026")); add("K10","CR-001 applied: 22 Oct EA event is a neutral milestone", !!ea && !/winners announced/i.test(ea.summary), ea?ea.summary:"Event missing","fail","D02");
  const cand = ev.filter(e=>e.origin==="candidate"); add("K11","No unapproved candidate in production files", ctx.defaultExcludesCandidates, cand.length+" candidate event(s); default export excludes them","fail","Human gate");
  const relOf = e => (ctx.relOf||{})[e.uid] || ctx.release; /* each event is judged against the release that added it */
  const elapsed = ev.filter(e=>e.start>=relOf(e) && e.alarms.some(a=>{ const m=/^-P(\d+)D$/.exec(a); if(!m) return false; const f=pd(e.start); f.setUTCDate(f.getUTCDate()-(+m[1])); return iso(f)<relOf(e); }));
  add("K12","No reminder had already elapsed at release", elapsed.length===0, elapsed.length?(elapsed.length+" event(s) whose first reminder fell before the release date: "+elapsed.map(e=>e.uid.split("@")[0]).join(", ")):"All reminders are in the future at release","warn","D14");
  const a=ctx.agg; const sum=o=>Object.values(o).reduce((x,y)=>x+(typeof y==="number"?y:0),0);
  add("K13","Aggregates reconcile to the record total", sum(a.evidence_all)===a.total && sum(a.risk_all)===a.total, "Evidence "+sum(a.evidence_all)+"/"+a.total+", risk "+sum(a.risk_all)+"/"+a.total,"fail","D01");
  const cells=[a.ind_evidence,a.ind_risk,a.ind_readiness].flatMap(o=>Object.values(o)).concat((ctx.intersections||[]).map(x=>x.named_count)); const leak=cells.filter(v=>typeof v==="number" && v<3);
  add("K14","Small-cell suppression applied (threshold 3)", leak.length===0, leak.length?"Unsuppressed small cells: "+leak.join(", "):cells.length+" individual-level cells; "+cells.filter(v=>typeof v==="string").length+" suppressed","fail","E01");
  const age = dayDiff(ctx.verified, ctx.today); add("K15","Source verification is fresh (30 days or less)", age<=30, "Verified "+fmt(ctx.verified)+"; "+age+" day(s) ago","warn","Staleness");
  const text = ctx.text||""; const emails=(text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)||[]).filter(x=>!/recognition-portfolio\.gov\.uk$/i.test(x));
  const phones = text.match(/(?:\+44\s?|\b0)(?:\d[\s-]?){9,10}\b/g)||[];
  add("K16","No email address or phone number in the published page", emails.length===0 && phones.length===0, (emails.length||phones.length)?("Found: "+emails.concat(phones).join(", ")):"Scanned "+text.length.toLocaleString()+" characters","fail","D13");
  const http = (ctx.links||[]).filter(h=>/^http:/.test(h)); add("K17","All external links use HTTPS", http.length===0, http.length?http.join(", "):(ctx.links||[]).length+" external links checked","fail","Standards");
  if (ctx.navFits!=null) add("K18","Global navigation fits the screen width", ctx.navFits, ctx.navFits?"No overflow; extra sections fold into More":"Navigation overflows","fail","Canon");
  if (ctx.terms) add("K19","Every tooltip term exists in the glossary", ctx.terms.missing.length===0, ctx.terms.missing.length?"Missing: "+ctx.terms.missing.join(", "):ctx.terms.count+" tooltip terms resolved","fail","Canon");
  const badCat = ev.filter(e=>e.categories.length<2); add("K21","CATEGORIES exported as a comma-separated list", badCat.length===0, badCat.length?badCat.map(e=>e.uid).join(", "):"Every event exports "+Math.min(...ev.map(e=>e.categories.length))+" or more separate categories","fail","D18");
  const ax=ctx.a11y||{}; add("K22","Automated accessibility scan: no serious or critical issues", ax.scanned>0 && (ax.critical||0)+(ax.serious||0)===0, ax.scanned?("axe-core "+(ax.version||"")+" on "+ax.scanned+" views in light and dark: "+(ax.critical||0)+" critical, "+(ax.serious||0)+" serious, "+(ax.moderate||0)+" moderate, "+(ax.minor||0)+" minor"):"Not scanned","fail","NFR-01");
  const reg=(ctx.registry||[]).filter(r=>r[4]); const od=reg.filter(r=>{ const d=pd(r[4]); d.setUTCDate(d.getUTCDate()+r[5]); return iso(d)<ctx.today; }); add("K23","Every verified source is within its re-verification cadence", od.length===0, od.length?"Overdue: "+od.map(r=>r[0]).join(", "):reg.length+" verified sources within cadence","warn","Registry");
  const wfp=[]; const specs=ctx.workflows||{}; Object.values(specs).forEach(w=>{ const keys=new Set(); w.steps.forEach(st=>{ (st.gate||[]).forEach(g=>{ if(!PROTECT.rules[g.rule]) wfp.push(w.id+"/"+st.id+": unknown rule "+g.rule); }); st.fields.forEach(f=>{ if(keys.has(f.k)) wfp.push(w.id+": duplicate field "+f.k); keys.add(f.k); }); if(st.out && !OUT[st.out]) wfp.push(w.id+"/"+st.id+": missing output "+st.out); }); });
  add("K24","Workflow specifications are valid", wfp.length===0 && Object.keys(specs).length>0, wfp.length?wfp.join("; "):Object.keys(specs).length+" workflows, "+Object.values(specs).reduce((a,w)=>a+w.steps.length,0)+" steps, every gate rule and output resolves","fail","Engine");
  const pol=ctx.policy||[]; const ptxt=ctx.policyText||""; const missP=pol.filter(p=>!ptxt.includes(p[0]+". "+p[1]));
  add("K25","AI rules complete and sent with every request", pol.length>=8 && missP.length===0, missP.length?"Missing from request text: "+missP.map(p=>p[0]).join(", "):pol.length+" rules embedded in the request text","fail","AI safeguards");
  const gmiss=Object.keys(specs).filter(id=>{ const g=(ctx.guide||{})[id]; return !g || !g.cadence || !g.when || !g.done || !(g.raci&&g.raci.length===4); });
  add("K26","Every workflow has operating guidance and a cadence", Object.keys(specs).length>0 && gmiss.length===0, gmiss.length?"Missing or incomplete: "+gmiss.join(", "):Object.keys(specs).length+" workflows with purpose, trigger, cadence, service level, done criteria and RACI","fail","Guidance");
  const rh=ctx.rhythm||[]; const rbad=rh.filter(r=>!specs[r.wf] || (["weekly","monthlyFirst","monthly","quarterly"].includes(r.freq) && (!/COUNT=\d+/.test(rhythmRule(r)) || !nextDue(r, ctx.today))));
  add("K27","Operating rhythm resolves: every activity has a workflow, bounded recurrence and a next due date", rh.length>0 && rbad.length===0, rbad.length?"Problems: "+rbad.map(r=>r.id).join(", "):rh.length+" activities; "+rh.filter(r=>rhythmRule(r)).length+" bounded recurring reminders","fail","Cadence");
  const mbad=(ctx.methods||[]).filter(m=>!m[8] || !["V","P","C","G"].includes(m[8]) || (m[8]==="V"&&!m[9]) || !m[3].split(" ").every(g=>GIVER[g]));
  const rbad2=Object.entries(ctx.roles||{}).filter(([k,r])=>!r.workflows.every(id=>specs[id]));
  add("K28","Recognition methods and role pages resolve", (ctx.methods||[]).length>0 && mbad.length===0 && rbad2.length===0, (mbad.length||rbad2.length)?"Problems: "+mbad.map(m=>m[0]).concat(rbad2.map(r=>r[0])).join(", "):(ctx.methods||[]).length+" methods each with a basis (verified ones cite a source); "+Object.keys(ctx.roles||{}).length+" role pages link to existing workflows","fail","Recognition");
  const fin=(ctx.methods||[]).filter(m=>m[2]==="Financial"); const pbad=fin.filter(m=>!/scheme|payroll|HR|policy|pot|tax|HMRC|remit|£50/i.test(m[7]));
  const ownOk = /Not supplied by the recognition portfolio/.test(ctx.myEvidenceSample||"") && /Not derived from the recognition portfolio/.test(ctx.rewardSample||"");
  add("K29","Pay and performance boundary holds", pbad.length===0 && ownOk, pbad.length?"Financial methods without scheme or tax rule: "+pbad.map(m=>m[0]).join(", "):!ownOk?"Ownership statements missing from personal evidence or reward outputs":fin.length+" financial methods all route through departmental schemes; personal evidence and reward outputs state they are not from the portfolio","fail","Guardrails");
  const rub=ctx.rubric||[]; const wsum=rub.reduce((a,r)=>a+r.w,0); const banned=rub.filter(r=>/hour|time logged|attendance|working pattern|ethnic|gender|age|disab|religio/i.test(r.l+" "+r.a.join(" ")));
  const bandsOk=(ctx.bands||[]).every((b,i,a)=>i===0?b[0]===0:b[0]===a[i-1][1]+1) && (ctx.bands||[]).slice(-1)[0][1]===100;
  add("K30","Proportionality guide is fair by construction", wsum===100 && banned.length===0 && bandsOk, wsum!==100?"Weights sum to "+wsum:banned.length?"Banned measure in rubric: "+banned.map(r=>r.l).join(", "):!bandsOk?"Bands leave gaps or overlap":rub.length+" dimensions, weights sum to 100, no hours or identity measures, bands cover 0–100 without gaps","fail","Proportionality");
  const secIds=new Set(SECTIONS.map(x=>x.id)); const tabIds=new Set(SECTIONS.flatMap(x=>x.tabs.map(t=>x.id+"-"+t[0])));
  const tbad=[]; Object.entries(ctx.tours||{}).forEach(([id,t])=>t.steps.forEach((st,i)=>{ if(!tabIds.has(st[0])) tbad.push(id+" stop "+(i+1)+": unknown page "+st[0]); if(!st[1]) tbad.push(id+" stop "+(i+1)+": no target"); }));
  Object.entries(ctx.tutorials||{}).forEach(([id,t])=>t.tasks.forEach((k,i)=>{ if(!tabIds.has(k[2])) tbad.push(id+" task "+(i+1)+": unknown page "+k[2]); }));
  add("K31","Every tour stop and tutorial task points at a real page", tbad.length===0 && Object.keys(ctx.tours||{}).length>0, tbad.length?tbad.slice(0,4).join("; "):Object.keys(ctx.tours||{}).length+" tours and "+Object.keys(ctx.tutorials||{}).length+" tutorials; every stop and task resolves","fail","Help");
  const lc=(ctx.text||"").toLowerCase(); const exc=EXCLUSIVE.filter(([w])=>new RegExp("\\b"+w.replace("-","\\-")+"\\b").test(lc));
  add("K32","Inclusive language scan", exc.length===0, exc.length?"Replace: "+exc.map(([w,r])=>w+" → "+r).join(", "):EXCLUSIVE.length+" exclusionary terms checked across the visible page","fail","DEIA");
  const avg=readability(ctx.plain||""); add("K33","Plain English: average sentence length 25 words or fewer", avg>0 && avg<=25, "Average "+avg.toFixed(1)+" words per sentence across introductions, guidance and help text","warn","UCD");
  if(ctx.unlabelled!=null) add("K34","Every icon-only control has an accessible name", ctx.unlabelled===0, ctx.unlabelled?ctx.unlabelled+" unlabelled control(s) on this page":"All buttons and links on this page have an accessible name","fail","WCAG 4.1.2");
  const acts=ctx.actions||[]; const abad=acts.filter(a=>a.trigger!=="click" || !a.tick);
  add("K35","Integrations send nothing on their own", acts.length>0 && abad.length===0, abad.length?"Actions not started by a click after the privacy tick: "+abad.map(a=>a.id).join(", "):acts.length+" send and share actions; every one needs a click and the privacy tick; no recipient is stored","fail","Rule I1");
  const ig=ctx.integ||[]; const srcIds=new Set(C.sourcesPublic.map(x=>x[0])); const ibad=ig.filter(i=>((i[8]==="V"||i[8]==="L") && i[7] && !srcIds.has(i[7])) || (i[8]==="L" && !i[7]) || !TIER[i[3]]); const ret=ig.filter(i=>i[3]==="retired"&&i[4]!=="Retired");
  add("K36","Integration register: every claim has a basis and retired services are marked", ig.length>0 && ibad.length===0 && ret.length===0, ibad.length?"No basis: "+ibad.map(i=>i[0]).join(", "):ret.length?"Retired but not marked: "+ret.map(i=>i[0]).join(", "):ig.length+" integrations; vendor claims cite a source or are marked as undocumented or policy; retired services marked","fail","Integrations");
  if(ctx.cardsNoIcon!=null) add("K37","Every card and panel on the page carries an icon", ctx.cardsNoIcon===0, ctx.cardsNoIcon?ctx.cardsNoIcon+" card(s) without an icon":"All cards on this page have an icon and a colour","warn","Visual design");
  if(ctx.spill!=null) add("K38","No content runs past the width of the screen", ctx.spill.length===0, ctx.spill.length?"Overflowing: "+ctx.spill.slice(0,4).join(", "):"Checked at "+ctx.vw+" px wide: nothing overflows","fail","Canon");
  const mtxt=(ctx.missionLinks||[]).map(m=>m[0]+" "+m[3]).concat((ctx.innov||[]).map(n=>n[1]+" "+n[4]+" "+n[5])).join(" "); const party=mtxt.match(PARTY_RX);
  add("K39","Mission links and innovation criteria are politically impartial", (ctx.missionLinks||[]).length>0 && !party && (ctx.missionLinks||[]).some(m=>m[1]==="no" && /pay/i.test(m[0])), party?"Party or slogan wording in criteria: "+party[0]:!(ctx.missionLinks||[]).some(m=>m[1]==="no"&&/pay/i.test(m[0]))?"The pay boundary is missing from the missions assessment":(ctx.missionLinks||[]).length+" mission links assessed with outcome wording, no party names or slogans; pay link ruled out","fail","Civil Service Code");
  const sc=ctx.sector||[]; const sbad=sc.filter(x=>!["V","L","U"].includes(x[6]) || (x[6]!=="U" && !/^https:\/\//.test(x[5])) || /\b(Mr|Mrs|Ms|Miss|Dr|Sir|Dame)\.?\s+[A-Z][a-z]/.test(x.join(" ")));
  add("K40","Public sector scan: every scheme has a basis, an HTTPS source and no individual names", sc.length>0 && sbad.length===0, sbad.length?"Problems: "+sbad.map(x=>x[1]).join(", "):sc.length+" schemes; "+sc.filter(x=>x[6]==="V").length+" read on official or organiser pages, "+sc.filter(x=>x[6]!=="V").length+" marked as located or not confirmed","fail","Verification");
  const kr=new Set(ctx.kgRoutes||[]); const rmiss=[...new Set(ev.map(e=>e.route))].filter(r=>!kr.has(r) || !(ctx.routeNames||{})[r]);
  add("K41","Every calendar route has a name and a place in the knowledge graph", rmiss.length===0, rmiss.length?"Missing: "+rmiss.join(", "):kr.size+" routes named and drawn","fail","D27");
  const sp=ctx.spot||[]; const spbad=sp.filter(e=>(e.src==="public" && !/^https:\/\//.test(e.url||"")) || (e.src==="self" && e.consent!==true) || (e.src==="register" && e.kind==="individual") || !["public","self","register"].includes(e.src));
  add("K42","Spotlight shows only published, consented or network entries, each with a source", spbad.length===0, spbad.length?"Problems: "+spbad.map(e=>e.name||e.id).join(", "):sp.length+" spotlight entries: "+sp.filter(e=>e.src==="public").length+" published by organisers with links, "+sp.filter(e=>e.src==="register").length+" network profiles, "+sp.filter(e=>e.src==="self").length+" added with consent","fail","Privacy");
  const cz=ctx.carousel||{}; add("K43","Carousel can be paused and never auto-plays with reduced motion", cz.interval>=5000 && cz.pauseOnHover && cz.pauseOnFocus && cz.reducedMotionAutoplay===false && (ctx.carPause==null || ctx.carPause===true), "Interval "+(cz.interval/1000)+" s; pauses on hover and focus; pause button "+(ctx.carPause===false?"missing":"present")+"; no autoplay with reduced motion","fail","WCAG 2.2.2");
  const sz=ctx.splash||{}; add("K44","Splash screen is under the person's control and shown at most once per session", sz.skippable && sz.oncePerSession && (sz.autoClose===false || (sz.ms!=null && sz.ms<=3000)), sz.autoClose===false?"No time limit: it closes on Enter the Hub, any choice or Esc; once per session; can be switched off":"Closes after "+(sz.ms/1000)+" s or on any key; once per session","fail","WCAG 2.2.1");
  const tabsAll=new Set(SECTIONS.flatMap(x=>[x.id].concat(x.tabs.map(t=>x.id+"-"+t[0])))); const aliasBad=(ctx.alias||[]).filter(([a,b])=>!tabsAll.has(b));
  add("K49","Every old page address redirects to a live page", (ctx.alias||[]).length>0 && aliasBad.length===0, aliasBad.length?"Dead redirects: "+aliasBad.map(x=>x.join(" → ")).join(", "):(ctx.alias||[]).length+" old addresses redirect to current pages after the restructure","fail","Information architecture");
  const rv=ctx.review||[]; const rvBad=rv.filter(r=>!["Good","Fair","Poor"].includes(r[4]) || !(r[5]||[]).length || !(r[6]||[]).length || !(r[7]||[]).length || (r[7]||[]).some(a=>!["Now","Next","Later"].includes(a[0])||!a[1]||!a[2]) || (r[8]||[]).some(e=>!(ctx.reviewFacts||[]).includes(e)));
  const avBad=(ctx.reviewAdv||[]).filter(a=>!a[2]||!a[3]||!a[4]||!["Holds","Partly holds","Rebutted"].includes(a[5]));
  add("K50","Every professional review has a rating, strengths, concerns and owned actions, and every adversarial claim is answered", rv.length>=10 && rvBad.length===0 && (ctx.reviewAdv||[]).length>0 && avBad.length===0, rvBad.length||avBad.length?"Incomplete: "+rvBad.map(r=>r[1]).concat(avBad.map(a=>a[1])).join(", "):rv.length+" roles reviewed with owned actions; "+(ctx.reviewAdv||[]).length+" adversarial claims answered with a verdict","fail","Professional review");
  const dm=ctx.domains||[]; const dbad=dm.filter(d=>!d[6]||!d[7]||!d[5]||!d[5].i||!d[5].t||!d[5].o); const dmEx=dm.filter(d=>(ctx.winners||[]).some(w=>d[8].test([w[2],w[3],w[6]].join(" ")))).length;
  add("K45","Every recognition domain has routes, a guardrail and incentives at all three levels", dm.length>0 && dbad.length===0, dbad.length?"Incomplete: "+dbad.map(d=>d[0]).join(", "):dm.length+" domains complete; "+dmEx+" have published examples","fail","Domains");
  const wbad=(ctx.winners||[]).filter(w=>!/^https:\/\//.test(w[7]||"") || !w[0] || !w[3] || !["individual","team","organisation"].includes(w[4]));
  add("K46","Every published winner has a scheme, a kind and an HTTPS source", (ctx.winners||[]).length>0 && wbad.length===0, wbad.length?"Problems: "+wbad.map(w=>w[3]).join(", "):(ctx.winners||[]).length+" winners, each linked to the page that announced them","fail","Spotlight");
  const ac=ctx.alertCfg||{}; const badLead=(ac.leadsAllowed||[]).filter(l=>!(l>0)); const subAl=(ctx.subsAlarms||[]).filter(a=>!/^-P\d+D$/.test(a));
  add("K47","Alerts never send on their own and every reminder fires before its date", ac.autoSend===false && badLead.length===0 && subAl.length===0, ac.autoSend!==false?"Automatic sending is switched on":badLead.length||subAl.length?"Reminder offsets not before the event: "+badLead.concat(subAl).join(", "):"Reminders at "+(ac.leadsAllowed||[]).join(", ")+" days before; nothing is sent automatically","fail","Rule I1");
  if(ctx.frontDl!=null) add("K48","Front page flags every deadline in the next "+(ac.horizon||60)+" days", ctx.frontDl.shown===ctx.frontDl.expected, ctx.frontDl.shown+" of "+ctx.frontDl.expected+" deadlines flagged","fail","Front page");
  const rdNeed=[]; (ctx.review||[]).forEach(r=>(r[7]||[]).forEach((a,i)=>rdNeed.push(r[0]+":"+i))); const rdHave=(ctx.reviewDone||[]).map(d=>d[0]+":"+d[1]);
  const rdMiss=rdNeed.filter(x=>!rdHave.includes(x)), rdBad=(ctx.reviewDone||[]).filter((d,i)=>!rdNeed.includes(d[0]+":"+d[1]) || rdHave.indexOf(d[0]+":"+d[1])!==i || !["Done","Partly done","Drafted","Needs people"].includes(d[2]) || !d[3]);
  add("K54","Every review action has exactly one status and a note on what was done", rdNeed.length>0 && rdMiss.length===0 && rdBad.length===0, rdMiss.length?"No status: "+rdMiss.join(", "):rdBad.length?"Duplicate, unknown or unexplained: "+rdBad.map(d=>d[0]+":"+d[1]).join(", "):rdNeed.length+" actions tracked: "+["Done","Partly done","Drafted","Needs people"].map(k=>(ctx.reviewDone||[]).filter(d=>d[2]===k).length+" "+k.toLowerCase()).join(", "),"fail","Professional review");
  const po=ctx.pageOwner||{}; const ownSecIds=SECTIONS.map(x=>x.id); const poMiss=ownSecIds.filter(id=>!po[id]); const rvOk=!!ctx.reviewBy && ctx.reviewBy>=ctx.today;
  add("K51","Every section has a page owner and a review date that has not passed", poMiss.length===0 && rvOk, poMiss.length?"No owner: "+poMiss.join(", "):!rvOk?"Review date "+(ctx.reviewBy||"missing")+" has passed or is missing":ownSecIds.length+" sections owned; review by "+ctx.reviewBy,"fail","Professional review PR05");
  const finNo=(ctx.methods||[]).filter(m=>m[2]==="Financial" && (m[7]||"").indexOf(ctx.payCaveat||"\u0000")<0);
  add("K52","Every financial way to recognise tells people to check their department's policy", (ctx.methods||[]).some(m=>m[2]==="Financial") && finNo.length===0, finNo.length?"Missing caveat: "+finNo.map(m=>m[0]).join(", "):(ctx.methods||[]).filter(m=>m[2]==="Financial").length+" financial methods carry the caveat","fail","Professional review PR15");
  const apBad=(ctx.assumptionPages||[]).filter(h=>!tabsAll.has(h));
  add("K53","Untested user assumptions are labelled on the pages that make them", (ctx.assumptionPages||[]).length>=4 && apBad.length===0, apBad.length?"Labels point at missing pages: "+apBad.join(", "):(ctx.assumptionPages||[]).length+" pages carry an assumption label","fail","Professional review PR04");
  const stdBad=(ctx.standards||[]).filter(x=>!x[1]||!["Met","Partly met","Not met","Not applicable","Decision needed"].includes(x[3])||!x[4]||!/^https:\/\//.test(x[6]||"")||(x[3]!=="Met"&&x[3]!=="Not applicable"&&(!x[5]||x[5]==="None")));
  add("K55","Every standard and framework has a status, evidence, an official source and, where not met, an action", (ctx.standards||[]).length>=10 && stdBad.length===0, stdBad.length?"Incomplete: "+stdBad.map(x=>x[0]).join(", "):(ctx.standards||[]).length+" standards assessed, each with evidence and a source","fail","Release 12 compliance");
  const band=(l,sv)=>{ const L={Remote:1,Possible:2,Probable:3}[l]||0, S={Minimal:1,Significant:2,Severe:3}[sv]||0, x=L*S; return x>=6?"High":x>=3?"Medium":x>=1?"Low":""; };
  const dr=ctx.dpiaRisks||[]; const drBad=dr.filter(r=>!band(r[3],r[4])||!band(r[7],r[8])||!r[5]||!r[6]); const drHigh=dr.filter(r=>band(r[7],r[8])==="High");
  add("K56","Every DPIA risk has a valid likelihood and severity before and after measures, and none stays high without ICO consultation", dr.length>0 && drBad.length===0 && (drHigh.length===0 || ctx.icoConsulted===true), drBad.length?"Invalid: "+drBad.map(r=>r[0]).join(", "):drHigh.length?"High residual risk without prior consultation: "+drHigh.map(r=>r[0]).join(", "):dr.length+" risks rated; residual: "+["High","Medium","Low"].map(b=>dr.filter(r=>band(r[7],r[8])===b).length+" "+b.toLowerCase()).join(", "),"fail","DPIA");
  const skUnknown=(ctx.storeKeys||[]).filter(k=>!(ctx.storeCatalog||[]).some(c=>c[1].split(" ").some(p=>p.endsWith(":")?k.startsWith(p):k===p)));
  add("K57","Everything kept in the browser is listed in the privacy notice with the rule it relies on", (ctx.storeCatalog||[]).length>0 && skUnknown.length===0, skUnknown.length?"Not in the notice: "+skUnknown.join(", "):(ctx.storeKeys||[]).length+" items in this browser, all listed in Help › Privacy and your data","fail","PECR");
  const dq=ctx.dq?dqMeasure(ctx.dq):[]; const dqHard=dq.filter(r=>["Completeness","Uniqueness","Consistency","Validity"].includes(r[0]) && r[2]<r[3]);
  add("K58","Data meets the Government Data Quality Framework targets for completeness, uniqueness, consistency and validity", dq.length===6 && dqHard.length===0, dqHard.length?dqHard.map(r=>r[0]+": "+r[4]).join("; "):dq.map(r=>r[0].split(" ")[0]+" "+r[2]+"%").join(", "),"fail","Data quality");
  const th=ctx.threats||[]; const thBad=th.filter(t=>!band(t[3],t[4])||!band(t[6],t[7])||!t[5]);
  add("K59","Every security threat is rated before and after its controls", th.length>=5 && thBad.length===0, thBad.length?"Incomplete: "+thBad.map(t=>t[0]).join(", "):th.length+" threats rated; "+th.filter(t=>band(t[6],t[7])==="High").length+" high after controls","fail","Secure by Design");
  const wOld=(ctx.winners||[]).filter(w=>+w[1] < (+String(ctx.today).slice(0,4))-2);
  add("K60","Published winners are kept only for the last three award years", wOld.length===0 || ctx.winnersFiltered===true, wOld.length+" winners older than three award years"+(wOld.length?" are hidden from display":""),"fail","Retention");
  const cm=ctx.community||[], he=ctx.honoursEth||[]; const cmBad=cm.filter(x=>!["V","L","U"].includes(x[6]) || (x[6]!=="U" && !/^https:\/\//.test(x[5])) || (x[7] && !/^https:\/\//.test(x[7])) || /\b(Mr|Mrs|Ms|Miss|Dr|Sir|Dame|Lord|Lady)\.?\s+[A-Z][a-z]/.test(x.join(" "))); const heBad=he.filter(x=>typeof x[2]!=="number" || typeof x[3]!=="number" || !(x[4]===null || (typeof x[4]==="number" && x[4]>=x[2]+x[3])) || !/^\d+(\.\d)?$/.test(x[5]) || !/^\d+(\.\d)?$/.test(x[6]) || !/^https:\/\//.test(x[7]));
  add("K61","Community routes and honours figures: every row has a basis, an HTTPS source and no personal names; every figure has a count, a published share and a source", cm.length>0 && he.length>0 && cmBad.length===0 && heBad.length===0, (cmBad.length||heBad.length)?"Problems: "+cmBad.map(x=>x[1]).concat(heBad.map(x=>x[0])).join(", "):cm.length+" routes ("+cm.filter(x=>x[6]==="V").length+" read on official or organiser pages); "+he.length+" honours lists with counts, published shares and a source","fail","Verification");
  const oldName=/recognition opportunities/i, nm=ctx.names||{}; const oldHits=["title","calname","docTitle","desc"].filter(k=>oldName.test(nm[k]||"")).concat(oldName.test(String(ctx.text||"").replace(/formerly the Recognition Opportunities Portal/g,""))?["page text"]:[]);
  add("K62","The Hub is called by its current name everywhere (title, calendar name, page metadata and text)", nm.title==="Awards and Recognition Hub" && oldHits.length===0, oldHits.length?"Old name found in: "+oldHits.join(", "):(nm.title!=="Awards and Recognition Hub"?"Title is "+(nm.title||"missing"):"Current name only"),"fail","D40");
  const cd=ctx.codes||{}; const codeOk=!!cd.qr && cd.qr.indexOf(nm.title+" | "+ctx.version+" |")===0 && cd.bar===(ctx.codePrefix+"-"+String(ctx.version||"").replace(/^v/,""));
  add("K63","The QR code and barcode carry this release's name and version", codeOk, codeOk?"QR and Code 128 match "+ctx.version:"QR: "+(cd.qr||"missing").slice(0,80)+"; barcode: "+(cd.bar||"missing"),"fail","D41");
  add("K20","Build-time name scan found no personal names", ctx.buildScan===0, ctx.buildScan===0?"0 matches against the removed-identifier list (list not published)":(ctx.buildScan===-1?"The scan did not run in this build (no identifier list supplied)":"Matches found: "+ctx.buildScan),"fail","D13");
  return res;
}
function relCodes(){ const q=document.querySelector('.codes svg[aria-label^="QR code: "]'), b=document.querySelector('.codes svg[aria-label^="Barcode (Code 128): "]');
  return {qr:q?q.getAttribute("aria-label").slice(9):"", bar:b?b.getAttribute("aria-label").slice(20):""}; }
function baseCtx(){
  return { names:{title:D.meta.title, calname:D.meta.calname, docTitle:document.title, desc:(document.querySelector('meta[name="description"]')||{}).content||""}, codes:relCodes(), version:D.meta.version, codePrefix:D.meta.code_prefix, relOf:Object.fromEntries((D.changes||[]).filter(c=>c.uid && /released/i.test(c.status||"")).map(c=>[c.uid,((D.releases||[]).find(r=>r.v===c.release)||{}).date]).filter(x=>x[1])), events:JSON.parse(JSON.stringify(D.events)), split:JSON.parse(JSON.stringify(D.split)), agg:D.agg, defaultExcludesCandidates:true,
    release:D.meta.build_date, verified:D.meta.source_verified, today:TODAY, buildScan:D.buildScan, a11y:D.a11y, workflows:WF, guide:GUIDE, plain:Object.values(INTRO).map(x=>x[1]).concat(Object.values(GUIDE).flatMap(g=>[g.purpose,g.when,g.done]),FAQ.map(f=>f[1]),C.isNot.map(x=>x[1])).join(" "), tours:JSON.parse(JSON.stringify(TOURS)), tutorials:Object.fromEntries(Object.entries(TUTORIALS).map(([k,t])=>[k,{tasks:t.tasks.map(x=>x.slice(0,3))}])), rubric:JSON.parse(JSON.stringify(RUBRIC)), bands:JSON.parse(JSON.stringify(BANDS)), methods:JSON.parse(JSON.stringify(METHODS)), roles:ROLES, myEvidenceSample:TEXTS.myEvidenceText({purpose:"x",items:[{what:"y"}]}), rewardSample:TEXTS.rewardText({}), rhythm:RHYTHM.map(r=>Object.assign({},r)), policy:AI_POLICY.map(p=>p.slice()), policyText:POLICY_TEXT, registry:JSON.parse(JSON.stringify(D.registry)), intersections:JSON.parse(JSON.stringify(D.intersections)), actions:JSON.parse(JSON.stringify(SHARE_ACTIONS)), integ:JSON.parse(JSON.stringify(INTEG)), missionLinks:JSON.parse(JSON.stringify(MISSION_LINKS)), innov:JSON.parse(JSON.stringify(INNOV)), sector:JSON.parse(JSON.stringify(SECTOR_SCAN)), kgRoutes:KG_ROUTES(), routeNames:Object.assign({},ROUTE), spot:JSON.parse(JSON.stringify(spotEntries())), carousel:Object.assign({},CAROUSEL), splash:Object.assign({},SPLASH), domains:DOMAINS.map(d=>d.slice()), winners:JSON.parse(JSON.stringify(PUBLIC_WINNERS)), alertCfg:JSON.parse(JSON.stringify(ALERT_CFG)), alias:ALIAS_LIST(), review:REVIEW_LIST(), reviewDone:REVIEW_DONE_LIST(), standards:STANDARDS.map(x=>x.slice()), dpiaRisks:DPIA_RISKS.map(x=>x.slice()), icoConsulted:false, storeKeys:myStoredKeys(), storeCatalog:STORAGE_CATALOG.map(x=>x.slice()), dq:JSON.parse(JSON.stringify(dqData())), threats:THREATS.map(x=>x.slice()), winnersFiltered:true, pageOwner:Object.assign({},PAGE_OWNER), reviewBy:PAGE_REVIEW_BY, payCaveat:PAY_CAVEAT, assumptionPages:ASSUMPTION_PAGES.slice(), reviewFacts:REVIEW_FACTS.map(f=>f[0]), reviewAdv:REVIEW_ADV.map(a=>a.slice()), subsAlarms:SUBS.leads.map(l=>"-P"+l+"D"), community:JSON.parse(JSON.stringify(typeof COMMUNITY_ROUTES!=="undefined"?COMMUNITY_ROUTES:[])), honoursEth:JSON.parse(JSON.stringify(typeof HONOURS_ETH!=="undefined"?HONOURS_ETH:[])) };
}
const NEG = [
  ["K01","Insert a second event with an existing UID", c=>{ c.events.push(Object.assign({},c.events[0])); }],
  ["K02","Duplicate a summary on the same start date", c=>{ c.events.push(Object.assign({},c.events[1],{uid:"neg-2"})); }],
  ["K03","Add a second CSA deadline on 27 Oct", c=>{ c.events.push(Object.assign({},c.events[0],{uid:"neg-3",summary:"x"})); }],
  ["K04","Make a recurrence unbounded", c=>{ c.events.find(e=>e.rrule).rrule="FREQ=MONTHLY"; }],
  ["K05","Set a reminder after the event", c=>{ c.events[0].alarms=["P1D"]; }],
  ["K06","Mark a TBC organiser event CONFIRMED", c=>{ c.events.find(e=>e.tbc && e.type==="CEREMONY").status="CONFIRMED"; }],
  ["K07","Label a WATCH event as a deadline", c=>{ c.events.find(e=>e.type==="WATCH").categories.push("Deadline"); }],
  ["K08","Drop one UID from every split file", c=>{ const u=c.events[0].uid; Object.values(c.split).forEach(s=>s.uids=s.uids.filter(x=>x!==u)); }],
  ["K09","Put a named candidate in the Honours review", c=>{ const e=c.events.find(e=>e.route==="HONOURS"); e.desc+=" Candidate: Dr Example"; }],
  ["K10","Revert CR-001", c=>{ c.events.find(e=>e.uid.startsWith("ethnicity-winners")).summary="[MILESTONE][EA] Ethnicity Awards 2026 winners announced"; }],
  ["K11","Include candidates by default", c=>{ c.defaultExcludesCandidates=false; }],
  ["K13","Break the evidence total", c=>{ c.agg=Object.assign({},c.agg,{total:c.agg.total+1}); }],
  ["K14","Publish an unsuppressed cell of 1", c=>{ c.agg=Object.assign({},c.agg,{ind_risk:{High:1,Medium:12,Low:1}}); }],
  ["K14","Publish an intersection contributor count of 1", c=>{ c.intersections[1].named_count=1; }],
  ["K15","Age the verification date by 60 days", c=>{ const d=pd(c.today); d.setUTCDate(d.getUTCDate()-60); c.verified=iso(d); }],
  ["K16","Add an email address to the page text", c=>{ c.text=(c.text||"")+" someone@example.org "; }],
  ["K17","Add an http link", c=>{ c.links=(c.links||[]).concat(["http://example.org"]); }],
  ["K21","Collapse categories into one escaped string", c=>{ c.events[0].categories=["Recognition;Deadline;Civil Service Awards"]; }],
  ["K22","Simulate one serious accessibility issue", c=>{ c.a11y=Object.assign({},c.a11y,{serious:1}); }],
  ["K23","Age a verified source past its cadence", c=>{ c.registry[0][4]="2026-01-01"; }],
  ["K24","Reference an unknown gate rule", c=>{ c.workflows={x:{id:"x",steps:[{id:"s",fields:[{k:"a"}],gate:[{rule:"nope"}]}]}}; }],
  ["K25","Drop one rule from the request text", c=>{ c.policyText=c.policyText.replace(/P3\..*\n/,""); }],
  ["K26","Remove the cadence from one workflow's guidance", c=>{ c.guide=Object.assign({},c.guide,{thanks:Object.assign({},c.guide.thanks,{cadence:""})}); }],
  ["K27","Point a rhythm activity at a missing workflow", c=>{ c.rhythm[0].wf="nope"; }],
  ["K28","Give a verified method no source", c=>{ c.methods[9][9]=""; }],
  ["K29","Remove the ownership statement from the personal evidence output", c=>{ c.myEvidenceSample="My evidence"; }],
  ["K30","Add an hours-logged dimension to the rubric", c=>{ c.rubric.push({k:"hours",l:"Hours logged",w:0,a:["0","1","2","3"]}); }],
  ["K31","Point a tour stop at a page that does not exist", c=>{ c.tours.welcome.steps[0][0]="nowhere-tab"; }],
  ["K32","Use an exclusionary term", c=>{ c.text="please whitelist this"; }],
  ["K33","Make every sentence 40 words long", c=>{ c.plain=Array(10).fill(Array(40).fill("word").join(" ")+".").join(" "); }],
  ["K34","Add an icon-only button with no name", c=>{ c.unlabelled=1; }],
  ["K35","Make one share action fire on page load", c=>{ c.actions[0].trigger="load"; }],
  ["K35","Remove the privacy tick from one action", c=>{ c.actions[3].tick=false; }],
  ["K36","Cite a source that does not exist", c=>{ c.integ[0][7]="S999"; }],
  ["K36","Mark a retired service as available", c=>{ c.integ.find(i=>i[3]==="retired")[4]="Available now"; }],
  ["K37","Leave one card without an icon", c=>{ c.cardsNoIcon=1; }],
  ["K38","Let one element run past the screen edge", c=>{ c.spill=["div.example +40px"]; c.vw=390; }],
  ["K39","Put a party name in a mission criterion", c=>{ c.missionLinks[1][3]+=" in line with Labour policy"; }],
  ["K39","Remove the pay boundary from the missions assessment", c=>{ c.missionLinks=c.missionLinks.filter(m=>!/pay/i.test(m[0])); }],
  ["K40","Name an individual winner", c=>{ c.sector[0][3]+=" Won by Dr Example."; }],
  ["K40","Drop the source from a verified scheme", c=>{ c.sector[1][5]=""; }],
  ["K41","Add an event on a route the graph does not draw", c=>{ c.events.push(Object.assign({},c.events[0],{uid:"neg-41",route:"NEWROUTE",start:"2027-05-05",summary:"neg 41"})); }],
  ["K42","Add a spotlight person without consent", c=>{ c.spot.push({id:"x",src:"self",kind:"individual",name:"Example",consent:false}); }],
  ["K42","Add a public winner without a source", c=>{ c.spot.push({id:"y",src:"public",kind:"team",name:"Example team",url:""}); }],
  ["K43","Make the carousel rotate every 2 seconds", c=>{ c.carousel.interval=2000; }],
  ["K43","Auto-play with reduced motion", c=>{ c.carousel.reducedMotionAutoplay=true; }],
  ["K44","Make the splash screen close itself after 10 seconds", c=>{ c.splash.autoClose=true; c.splash.ms=10000; }],
  ["K49","Point an old address at a page that does not exist", c=>{ c.alias.push(["assurance-old","build-nowhere"]); }],
  ["K45","Remove the guardrail from a domain", c=>{ c.domains[0][7]=""; }],
  ["K46","Drop the source from a published winner", c=>{ c.winners[0][7]=""; }],
  ["K47","Switch on automatic sending", c=>{ c.alertCfg.autoSend=true; }],
  ["K47","Set a reminder after the date", c=>{ c.subsAlarms.push("P1D"); }],
  ["K48","Hide one deadline from the front page", c=>{ c.frontDl={shown:2, expected:3}; }],
  ["K50","Remove the actions from a professional review", c=>{ c.review[0][7]=[]; }],
  ["K50","Leave an adversarial claim unanswered", c=>{ c.reviewAdv[0][3]=""; }],
  ["K58","Duplicate an event UID", c=>{ c.dq.events.push(Object.assign({}, c.dq.events[0])); }],
  ["K58","Give an event a date that does not exist", c=>{ c.dq.events[0].start="2026-02-30"; }],
  ["K58","List an event in a split calendar that does not exist", c=>{ const k=Object.keys(c.dq.split)[0]; c.dq.split[k].uids.push("ghost@x"); }],
  ["K58","Duplicate a source registry row", c=>{ c.dq.registry.push(c.dq.registry[0].slice()); }],
  ["K59","Leave a threat without controls", c=>{ c.threats[0][5]=""; }],
  ["K60","Publish an old winner without the retention filter", c=>{ c.winners.push(["Old award","2019","Cat","Old Team","team","Org","x","https://example.org","2019-01-01","x"]); c.winnersFiltered=false; }],
  ["K55","Leave a partly met standard without an action", c=>{ const x=c.standards.find(y=>y[3]==="Partly met"); x[5]=""; }],
  ["K55","Cite a standard without an official source", c=>{ c.standards[0][6]="see intranet"; }],
  ["K56","Leave a risk high after measures without consulting the ICO", c=>{ c.dpiaRisks[6][7]="Probable"; c.dpiaRisks[6][8]="Severe"; }],
  ["K56","Give a risk a likelihood the scale does not have", c=>{ c.dpiaRisks[0][3]="Likely"; }],
  ["K57","Store something in the browser that the notice does not mention", c=>{ c.storeKeys.push("trackMe"); }],
  ["K54","Drop the status of one review action", c=>{ c.reviewDone.pop(); }],
  ["K54","Mark an action done without saying what was done", c=>{ c.reviewDone[0][3]=""; }],
  ["K51","Remove the owner from a section", c=>{ delete c.pageOwner.calendar; }],
  ["K51","Let the review date pass", c=>{ c.reviewBy="2020-01-01"; }],
  ["K52","Drop the policy caveat from a financial method", c=>{ const m=c.methods.find(x=>x[2]==="Financial"); m[7]="Paid from the pot."; }],
  ["K53","Point an assumption label at a page that does not exist", c=>{ c.assumptionPages.push("recognition-nowhere"); }],
  ["K20","Simulate a build-time name match", c=>{ c.buildScan=1; }],
  ["K12","Add an event two days after release with a reminder seven days before", c=>{ const e=c.events[0]; e.uid="neg-k12@test"; const d=pd(c.release); d.setUTCDate(d.getUTCDate()+2); e.start=iso(d); e.alarms=["-P7D"]; }],
  ["K62","Put the old name back in the calendar name", c=>{ c.names.calname="Recognition Opportunities"; }],
  ["K63","Leave last release's barcode on the page", c=>{ c.codes.bar="ROP-2026.10.25.17"; }],
  ["K61","Give a community route an insecure source and an honours figure no count", c=>{ c.community.push(["Test","Test scheme","Org","x","y","http://example.org","V",""]); c.honoursEth.push(["Test list","2020",null,1,10,"1","1","https://example.org"]); }]
];
function runNegatives(){
  return NEG.map(([id,desc,mut]) => { const c=baseCtx(); c.text=""; c.links=[]; mut(c); const r=runChecks(c).find(x=>x.id===id); return {id,desc,caught: r && !r.ok}; });
}
let CHECKS=[];
function pageCtx(){
  const c=baseCtx(); c.events=JSON.parse(JSON.stringify(liveEvents())); c.defaultExcludesCandidates = (DEFAULT_CAND===false);
  c.text=document.body.innerText; $$("[data-lint-skip]").forEach(el=>{ const t=el.innerText; if(t) c.text=c.text.split(t).join(" "); }); c.unlabelled=$$("button, a[href]").filter(b=>b.offsetParent!==null && !(b.textContent||"").trim() && !b.getAttribute("aria-label") && !b.getAttribute("title")).length; c.links=$$("a[href^='http']").map(a=>a.getAttribute("href"));
  const g=$("#gnav"); c.navFits = g.scrollWidth <= g.clientWidth+1;
  try{ const sc=SECTIONS.find(x=>x.id===cur.s); decorate(sc, sc.tabs.find(t=>t[0]===cur.t)); }catch(e){}
  c.carPause = $("#car") ? !!$("#carPlay") : null;
  c.frontDl = $(".dlsec") ? {shown:$$(".dlsec .dlrow").length, expected:upcoming(ALERT_CFG.horizon,["DEADLINE"]).length} : null;
  c.cardsNoIcon=$$("#panel .card").filter(x=>!cardHasIcon(x)).length; c.spill=spillList(); c.vw=document.documentElement.clientWidth;
  const gl=new Set(C.glossary.map(g=>g[0])); const ts=[...new Set($$("[data-term]").map(x=>x.getAttribute("data-term")))];
  c.terms={count:ts.length, missing:ts.filter(t=>!gl.has(t))};
  return c;
}
function refreshChecks(){
  CHECKS = runChecks(pageCtx());
  const f=CHECKS.filter(c=>c.sev==="fail").length, w=CHECKS.filter(c=>c.sev==="warn").length;
  const b=$("#chkBadge"); b.classList.toggle("fail", f>0); b.classList.toggle("warn", !f && w>0);
  $("#chkBadgeText").textContent = (CHECKS.length-f-w)+"/"+CHECKS.length+" checks"+(f?" · "+f+" fail":w?" · "+w+" warn":"");
}

/* ---------------- Defects, adversarial review, de-identification log ---------------- */
const DEFECTS = [
  ["D01","Tracker summaries broken","Workbook: Overview, Action Dashboard, Ethical Discovery risk counts, Recognition Portfolio","Every summary formula returns #REF!, so the headline numbers cannot be read from the workbook.","The Hub recomputes every figure from the register rows at build time.","K13","Fixed in portal"],
  ["D02","22 October Ethnicity Awards event titled \u201cwinners announced\u201d","Master and split calendars; compendium visuals 13 and 17","The organiser page places 22 October beneath the shortlist heading and gives no winners date.","CR-001: neutral milestone title and description; UID, date and reminders unchanged.","K10","Fixed and released (CR-001, CR-003)"],
  ["D03","Ethnicity Awards shortlist timing conflict","Compendium visual 17 vs pack legend","Compendium says shortlist \u201clate summer 2026\u201d; the pack treats 22 October as the shortlist point.","Settled by CR-003 after re-reading the organiser page: every date follows its own heading, so 22 October is the shortlist announcement.","K10","Fixed and released (CR-003)"],
  ["D04","British Diversity Awards venue unverified","Compendium visual 16","Venue appears only in the compendium. The organiser key-dates page lists 17 March 2027 as \u201cwinners announced\u201d, with no venue.","Venue omitted; date kept as verified.","","Mitigated"],
  ["D05","Civil Service Awards deadline: time zone unstated","Organiser homepage","\u201c5pm on Tuesday, 27 October\u201d has no time zone; the FAQ page omits the deadline.","Read as UK time (BST on that date); flagged on the route card.","","Mitigated"],
  ["D06","Honours timing contradicts itself","Compendium visual 7","Says nominations are \u201cusually by autumn each year\u201d; GOV.UK and the pack say there is no annual deadline.","The Hub follows the no-deadline position.","","Fixed in portal"],
  ["D07","Generalised nomination windows","Compendium visual 7","\u201cBDA typically autumn (Oct\u2013Nov)\u201d while the 2027 cycle opened on 3 August 2026.","The Hub shows organiser dates only.","","Fixed in portal"],
  ["D08","Unsourced internal reward figures","Compendium visual 20","Budget percentage and individual award caps have no source in the pack.","Marked C (unverified); figures not reproduced.","","Mitigated"],
  ["D09","Routes outside the pack","Compendium visuals 21\u201323","AiG, Cabinet Secretary's AI award and Diversity UK are not in the calendar pack or route register.","AiG deadline approved and released (CR-002) with its own split calendar; the other two remain C and sit in the source registry as not verified.","K08 K23","Mitigated"],
  ["D10","Duplicate source entries","Workbook source register","S33 duplicates S30 (ICO); S35 duplicates S31 (ethnicity data standards).","Merged in the public source list.","","Fixed in portal"],
  ["D11","Incomplete safeguard rows","Workbook: Ethical Discovery","Gate G8 \u201cRetention and mobility\u201d has no question or pass condition; edge case E12 is empty.","Shown as incomplete; needs DPO/IG input.","","Open: needs owner"],
  ["D12","Non-durable source locators","Workbook source register","Internal sources cite session search identifiers that cannot be resolved later.","Removed; evidence steward to assign durable references.","","Open: needs owner"],
  ["D13","Personal and identity-adjacent data in inputs","Workbook, compendium visuals 4\u20135, PDF metadata","Named individuals, role histories, identity-dependent eligibility notes, named officials, author metadata and a named mailbox.","Removed or replaced by roles and aggregates; see de-identification log.","K16 K20","Fixed"],
  ["D14","Structural validation passed a content error; some reminders already elapsed","Validation report CSV","All 17 events PASS, including D02. Two PREP events dated 17 October carry reminders that fell before the release date.","Content gates K10 and K12 added. Elapsed reminders are reported, not hidden.","K10 K12","Mitigated"],
  ["D15","Generated imagery is not authoritative","Compendium visuals 3\u201326","Visuals reproduce organiser and departmental branding and contain spelling errors typical of generated images.","No logos reproduced; facts from visuals carry provenance C.","","Mitigated"],
  ["D16","Calendar UID domain","All .ics files","UIDs use recognition-portfolio.gov.uk, which is an identifier convention, not a running service.","Kept unchanged so existing imports update cleanly.","K01","Accepted"],
  ["D18","Calendar categories collapsed into one","All supplied .ics files","CATEGORIES values use escaped semicolons (Recognition\\;Deadline\\;…), which RFC 5545 reads as one category name, not three.","Exports from this Hub write a comma-separated list.","K21","Fixed in portal exports"],
  ["D19","Watch reminders tagged Date-TBC but CONFIRMED","Watch calendar (EA and NDA next-cycle checks)","Both carry the Date-TBC category while STATUS is CONFIRMED. The reminder date is certain; the organiser cycle is not.","Shown as portfolio controls, not as TBC organiser dates. Consider a clearer category such as Cycle-TBC.","K06 K07","Accepted"],
  ["D20","Search Enter reopened the dialog","Search (release 3 build)","Enter navigated, then the same key press activated the focused search button and reopened the dialog.","Enter is now consumed and focus is not returned when navigating; the top page result is chosen, not the assistant row.","Regression test: search Enter","Fixed"],
  ["D21","Workflow outputs did not update while typing","Workflow engine (release 4 build)","Handover and re-verify outputs rendered once, so the package and the change-request button lagged the inputs.","Outputs re-render and re-bind on every change.","Regression test: handover and re-verify","Fixed"],
  ["D22","Low-contrast hero and button icons","Overview hero; workflow output cards","Ghost buttons on the dark hero and icons inside filled buttons used the accent colour on an accent or navy ground.","Buttons take the surrounding text colour; automated contrast scan rerun.","K22","Fixed"],
  ["D17","Organisational homes unresolved after MoG","Workbook MoG tracker","3 of 18 records have an unresolved future home and all 18 continuity owners were \u201cTo assign\u201d.","Owners assigned by role (network leads for the 4 network records, the evidence steward for the 14 individual records). Named post-holders still to confirm; 3 future homes remain unresolved.","","Mitigated"]
];
const ADVERSARIAL = [
  ["A calendar portal creates false certainty about dates.","Every fact carries a provenance code. Five organiser facts were re-read on the build date; month-only dates stay TENTATIVE; a banner appears once verification is more than 30 days old."],
  ["Removing personal data makes the register useless.","Network and community records, routes, safeguards and aggregates remain. The full register stays with the evidence steward in a restricted store; this Hub is the layer that is safe to share."],
  ["Aggregates for 14 people in a small, known team can still identify someone.","Counts below 3 are suppressed and no cross-tabulations are offered. Residual risk remains for readers who already know the team; do not publish beyond the owning team without DPO/IG review."],
  ["Recognition tied to ethnicity awards invites special-category processing.","No identity data is held here. Eligibility is self-confirmed by the nominee, gates G1\u2013G7 apply before any identity-related step, and inference methods rated Red are prohibited."],
  ["The compendium is generated imagery and may be wrong.","Facts that appear only in the compendium are marked C and never override organiser or pack facts. Seven compendium claims conflict with better sources (D03\u2013D09)."],
  ["The self-checks grade their own work.","Each check has a negative test that mutates the data and must fail. Base rate from the pack: its own validation passed 17 of 17 events while one carried a content error, so structural checks alone are not enough. An independent review is still recommended before release."],
  ["Adding the AiG deadline bypassed change control.","It was held as a candidate (CR-002) until the portfolio owner approved it on 17 October 2026; the change record, source and verification date are logged and the release log shows the transition."],
  ["Adding pay and reward contradicts the guardrail that recognition is not linked to pay.","The guardrail is about the portfolio's data: it never decides or feeds pay. Reward schemes are a separate, legitimate form of recognition that managers decide under departmental policy on the contribution itself. The pay page states this boundary first, the reward workflow states it in its output, and check K29 fails if either statement goes missing."],
  ["Scoring contributions is ranking people by another name.","The guide scores one contribution against anchored descriptions, not people against each other. Scores are not stored or compared, the number is never a reason on its own, and the rubric excludes hours, working pattern and identity (check K30)."],
  ["Linking to objectives and reviews turns the portfolio into a performance tool.","The link is one-way and person-controlled: employees copy their own evidence if they choose. Nothing is pulled into or pushed from performance systems, and the lifecycle table marks grievance, discipline and capability as a hard no."],
  ["Settling 22 October as the shortlist date rests on reading page layout.","All five dated entries on the organiser's page follow the same heading-then-date pattern, and the 14 July Maturity Matrix date is independently stated in the pack. An automated reading of the organiser homepage paired dates differently; it was rejected because it contradicts that 14 July date. Re-checked on the weekly registry cycle."]
];

/* ---------------- Generic table ---------------- */
const TBL = {};
function table(id, cfg){ TBL[id]=Object.assign({sort:null, dir:1, group:cfg.defaultGroup||"", q:"", f:{}}, cfg); return `<div id="${id}" class="stack"></div>`; }
function renderTable(id){
  const t=TBL[id], root=document.getElementById(id); if(!root) return;
  let rows=t.rows.slice();
  if (t.q){ const q=t.q.toLowerCase(); rows=rows.filter(r=>t.cols.some(c=>String(r[c.k]==null?"":r[c.k]).toLowerCase().includes(q))); }
  Object.entries(t.f).forEach(([k,v])=>{ if(v) rows=rows.filter(r=>String(r[k])===v); });
  if (t.sort){ rows.sort((a,b)=>String(a[t.sort]).localeCompare(String(b[t.sort]), undefined, {numeric:true})*t.dir); }
  t._rows=rows;
  const ctr = [];
  if (t.search!==false) ctr.push(`<label>Search<input type="search" id="${id}-q" value="${esc(t.q)}" placeholder="Filter rows"></label>`);
  (t.filters||[]).forEach(k=>{ const c=t.cols.find(c=>c.k===k)||{l:(t.labels||{})[k]||k}; const vals=[...new Set(t.rows.map(r=>String(r[k])))].sort(); ctr.push(`<label>${esc(c.l)}<select id="${id}-f-${k}"><option value="">All</option>${vals.map(v=>`<option${t.f[k]===v?" selected":""}>${esc(v)}</option>`).join("")}</select></label>`); });
  if (t.groups && t.groups.length) ctr.push(`<label>Group by<select id="${id}-g"><option value="">No grouping</option>${t.groups.map(k=>`<option value="${k}"${t.group===k?" selected":""}>${esc((t.cols.find(c=>c.k===k)||{l:(t.labels||{})[k]||k}).l)}</option>`).join("")}</select></label>`);
  const head = t.cols.map(c=>`<th scope="col"><button data-sort="${c.k}" aria-label="Sort by ${esc(c.l)}">${esc(c.l)}${t.sort===c.k?(t.dir>0?" ▲":" ▼"):""}</button></th>`).join("");
  const cell = (c,r)=>`<td${c.num?' class="num"':""}>${c.f?c.f(r[c.k],r):esc(r[c.k])}</td>`;
  let body="";
  if (t.group){ const g={}; rows.forEach(r=>{ (g[r[t.group]]=g[r[t.group]]||[]).push(r); }); Object.keys(g).sort().forEach(k=>{ body+=`<tr class="grouprow"><td colspan="${t.cols.length}">${esc(k)} <span class="muted">(${g[k].length})</span></td></tr>`+g[k].map(r=>`<tr>${t.cols.map(c=>cell(c,r)).join("")}</tr>`).join(""); }); }
  else body = rows.map(r=>`<tr>${t.cols.map(c=>cell(c,r)).join("")}</tr>`).join("");
  root.innerHTML = `<div class="ctrls">${ctr.join("")}<span class="small muted">${rows.length} of ${t.rows.length} rows</span><button class="btn ghost" type="button" id="${id}-csv">Copy as CSV</button><span class="copyok" id="${id}-csvmsg" aria-live="polite"></span></div><textarea id="${id}-csvtxt" hidden readonly aria-label="CSV"></textarea><div class="tblwrap"><table><thead><tr>${head}</tr></thead><tbody>${body||`<tr><td colspan="${t.cols.length}" class="muted">No rows match. Clear the search or filters.</td></tr>`}</tbody></table></div>`;
  const q=$("#"+id+"-q"); if(q) q.addEventListener("input", e=>{ t.q=e.target.value; renderTable(id); const n=$("#"+id+"-q"); n.focus(); n.setSelectionRange(n.value.length,n.value.length); });
  (t.filters||[]).forEach(k=>{ const s=$("#"+id+"-f-"+k); s.addEventListener("change", e=>{ t.f[k]=e.target.value; renderTable(id); }); });
  const g=$("#"+id+"-g"); if(g) g.addEventListener("change", e=>{ t.group=e.target.value; renderTable(id); });
  $("#"+id+"-csv").addEventListener("click",()=>{ const v=tableCSV(id), ta=$("#"+id+"-csvtxt"); ta.value=v; const fb=()=>{ ta.hidden=false; ta.focus(); ta.select(); $("#"+id+"-csvmsg").textContent="Selected: press Ctrl+C or Cmd+C"; }; try{ navigator.clipboard.writeText(v).then(()=>$("#"+id+"-csvmsg").textContent="Copied "+(v.split("\r\n").length-1)+" rows",fb); }catch(e){ fb(); } });
  $$("th button",root).forEach(b=>b.addEventListener("click",()=>{ const k=b.dataset.sort; if(t.sort===k) t.dir*=-1; else { t.sort=k; t.dir=1; } renderTable(id); }));
}

/* ---------------- Views ---------------- */
function nextDeadlines(n){ return allOcc().filter(o=>o.e.type==="DEADLINE" && o.date>=TODAY).slice(0,n); }
function cardList(items){ return `<ul class="tick">${items.map(i=>`<li>${esc(i)}</li>`).join("")}</ul>`; }
function typeTag(t){ return `<span class="tag ${t}" data-term="${t}">${ICON["t_"+t]?ico("t_"+t,"ico tgico"):""}[${t}]</span>`; }

const V = {};
V.overview_home = () => {
  const nd = nextDeadlines(4);
  const occ90 = allOcc().filter(o=>o.date>=TODAY && dayDiff(TODAY,o.date)<=90).length;
  const open = DEFECTS.filter(d=>/^Open/.test(d[6])).length;
  const pass = CHECKS.filter(c=>c.ok).length;
  return `<section class="hero">
    <div class="hero-main">${guilloche()}
      <span class="eyebrow" style="color:inherit;opacity:.8">Recognition portfolio · ${esc(D.meta.edition)}</span>
      <h2>${esc(C.northStar.promise)}</h2>
      <p style="max-width:62ch;opacity:.92">${esc(C.northStar.purpose)}</p>
      <div class="row heroact"><a class="btn herobtn" href="#workflows-nominate">${ico("nominate","ico")}<span>Start a nomination</span></a><button class="btn ghost herobtn2" type="button" data-ask="What closes next and what should I do now?">${ico("sparkle","ico")}<span>Ask the Hub</span></button><a class="btn ghost herobtn2" href="#routes-finder">${ico("search","ico")}<span>Find a route</span></a><button class="btn ghost herobtn2" type="button" data-tour="welcome">${ico("tour","ico")}<span>Take the tour</span></button></div>
      <div class="row small" style="opacity:.85"><span>Release ${esc(D.meta.version)}</span><span>·</span><span>Sources verified ${fmt(D.meta.source_verified)}</span><span>·</span><span>Calendar context ${esc(D.meta.tz)}</span></div>
    </div>
    <div class="stack"><h3 id="ov-next">Next organiser deadlines</h3>
      ${nd.length?nd.map(o=>{ const d=dayDiff(TODAY,o.date); return `<div class="count-card"><div class="days">${d}<small>day${d===1?"":"s"}</small></div><div class="stack" style="gap:2px;min-width:0"><strong class="row" style="gap:6px">${rIco(o.e.route)}${esc(ROUTE[o.e.route]||o.e.route)}</strong><span class="small">${esc(fmtLong(o.date))}${o.e.route==="CSA"?", 5pm":o.e.route==="AIG"?", 23:55":""}</span><span class="row">${pill(statusOf(o.e).t, statusOf(o.e).c)}</span></div></div>`; }).join(""):`<p class="muted">No upcoming organiser deadlines in the calendar.</p>`}
      ${!includeCandidates && D.events.some(e=>e.origin==="candidate")?`<p class="small muted">Candidate changes are hidden. <a href="#calendar-agenda">Include candidates</a> to see them.</p>`:`<p class="small"><a href="#calendar-planner">Plan a nomination</a> · <a href="#overview-week">See this fortnight</a> · <a href="#routes-finder">Find a route</a></p>`}
    </div></section>
    ${topTasksHTML()}
    <section class="grid g4" aria-label="Key figures">
      <div class="kpi">${ico("routes","ico kico")}<b>${C.routes.length}</b><span>Recognition routes mapped</span></div>
      <div class="kpi">${ico("calendar","ico kico")}<b>${D.events.filter(e=>e.origin!=="candidate").length}</b><span>Calendar events in release ${esc(D.meta.version.replace(/^v/,""))}</span></div>
      <div class="kpi">${ico("clock","ico kico")}<b>${occ90}</b><span>Calendar occurrences in the next 90 days</span></div>
      <div class="kpi" style="border-color:var(--warn)">${ico("s_warn","ico kico")}<b>${open}</b><span>Open conflicts needing an owner</span></div>
      <div class="kpi">${ico("register","ico kico")}<b>${D.agg.total}</b><span>Recognition records (aggregate only)</span></div>
      <div class="kpi" style="border-color:var(--ok)">${ico("s_ok","ico kico")}<b>${pass}/${CHECKS.length}</b><span>Self-checks passing</span></div>
    </section>
    <section class="grid g2">
      <div class="card stack"><h3 id="ov-mission">Mission</h3><p>${esc(C.northStar.mission)}</p>
        <h3 class="h4">Principles</h3><ul class="plain">${C.northStar.principles.map(p=>`<li><strong>${esc(p[0])}</strong> <span class="muted">${esc(p[1])}</span></li>`).join("")}</ul></div>
      <div class="card stack"><h3 id="ov-pillars">Four pillars</h3>${C.northStar.pillars.map(p=>`<div><strong>${esc(p.t)}</strong><p class="small muted">${esc(p.d)}</p></div>`).join("")}</div>
      <div class="card stack"><h3 id="ov-outcomes">Outcomes</h3>${cardList(C.northStar.outcomes)}</div>
      <div class="card stack" style="border-color:var(--bad)"><h3 id="ov-guardrails">Guardrails</h3>${cardList(C.northStar.guardrails)}</div>
    </section>`;
};
V.overview_not = () => `<p class="lede">To build and keep trust, the portfolio is clear about what it is not and what it will never be used for.</p>
  <div class="grid g3">${C.isNot.map(([t,d])=>`<div class="card stack" style="border-left:4px solid var(--bad)"><h3 class="h4">${esc(t)}</h3><p class="small">${esc(d)}</p></div>`).join("")}</div>
  <div class="note ok"><strong>What it is instead.</strong> A contribution-led approach that is people-controlled and transparent, evidence-based and human reviewed, built with staff networks and designed to endure through organisational change.</div>`;
V.overview_toc = () => { const col=(t,a,id)=>`<div class="card stack"><h3 id="${id}">${t}</h3>${cardList(a)}</div>`;
  return `<p class="lede">Derived from the compendium's North Star, journey and learning-loop visuals. Requirement IDs trace to these outcomes in Service › Requirements.</p>
  <div class="grid g3">${col("Inputs",C.toc.inputs,"toc-in")}${col("Activities",C.toc.activities,"toc-act")}${col("Outputs",C.toc.outputs,"toc-out")}<div class="card stack"><h3 id="toc-oc">Outcomes</h3><ul class="plain">${C.toc.outcomes.map((o,i)=>`<li><span class="mono" style="color:var(--accent)">O${i+1}</span> ${esc(o)}</li>`).join("")}</ul><a class="small" href="#knowledge-trace">Trace outcomes to requirements and checks</a></div>${col("Impact",C.toc.impact,"toc-imp")}</div>
  <div class="grid g2">${col("Assumptions",C.toc.assumptions,"toc-as")}<div class="card stack" style="border-color:var(--warn)"><h3 id="toc-risk">Risks to the theory</h3>${cardList(C.toc.risks)}</div></div>`; };

/* Calendar */
function calCtrls(){ if(!D.events.some(e=>e.origin==="candidate")) return ""; return `<div class="row"><button class="toggle" id="candTog" role="switch" aria-checked="${includeCandidates}" style="color:var(--ink)"><span class="track"><span class="knob"></span></span><span>Include candidate changes (CR-002)</span></button></div>`; }
function bindCand(){ const b=$("#candTog"); if(b) b.addEventListener("click",()=>{ includeCandidates=!includeCandidates; store.set("cand",includeCandidates); render(); }); }
V.calendar_timeline = () => {
  const hist = store.get("hist", false);
  const start = hist ? "2026-03-01" : "2026-10-01", end = "2027-08-01";
  const rows = ["CSA","BDA","EA","NDA","HONOURS","INTERNAL"].concat(includeCandidates?["AIG"]:[]);
  const W=1100, L=190, R=20, top=40, rh=46, H=top+rows.length*rh+30;
  const span = dayDiff(start,end), x = d => L + (W-L-R)*dayDiff(start,d)/span;
  let g=`<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Timeline of recognition calendar events by route">`;
  for (let d=pd(start); iso(d)<end; d.setUTCMonth(d.getUTCMonth()+1)){ const xi=x(iso(d)); g+=`<line x1="${xi}" y1="${top-8}" x2="${xi}" y2="${H-24}" stroke="var(--rule)"/><text x="${xi+4}" y="${top-14}" font-size="11" fill="var(--muted)">${MONTHS[d.getUTCMonth()].slice(0,3)}${d.getUTCMonth()===0?" "+d.getUTCFullYear():""}</text>`; }
  rows.forEach((r,i)=>{ const y=top+i*rh+rh/2; g+=`<rect x="0" y="${top+i*rh}" width="${W}" height="${rh}" fill="${i%2?"var(--sunk)":"transparent"}" opacity=".6"/><text x="10" y="${y+4}" font-size="13" font-weight="600">${esc(ROUTE[r]||r)}</text>`; });
  const col = t => `var(--t-${({DEADLINE:"deadline",PREP:"prep",CEREMONY:"ceremony",MILESTONE:"milestone",WATCH:"watch",ONGOING:"ongoing"})[t]})`;
  const shape = (t,cx,cy,c,hollow) => { const f=hollow?"var(--surface)":c, s=`stroke="${c}" stroke-width="2"${hollow?' stroke-dasharray="3 2"':""}`;
    if (t==="DEADLINE") return `<path d="M${cx} ${cy-8}L${cx+8} ${cy}L${cx} ${cy+8}L${cx-8} ${cy}Z" fill="${f}" ${s}/>`;
    if (t==="CEREMONY") return `<path d="M${cx} ${cy-9}l2.6 5.6 6 .6-4.5 4 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.5-4 6-.6z" fill="${f}" ${s}/>`;
    if (t==="PREP") return `<rect x="${cx-5}" y="${cy-5}" width="10" height="10" fill="${f}" ${s}/>`;
    if (t==="WATCH") return `<path d="M${cx} ${cy-7}L${cx+7} ${cy+6}L${cx-7} ${cy+6}Z" fill="${f}" ${s}/>`;
    if (t==="ONGOING") return `<circle cx="${cx}" cy="${cy}" r="5" fill="var(--surface)" ${s}/>`;
    return `<circle cx="${cx}" cy="${cy}" r="6" fill="${f}" ${s}/>`; };
  if (hist) D.historical.forEach(h=>{ const i=rows.indexOf(h.route); if(i<0) return; const cx=x(h.date), cy=top+i*rh+rh/2; g+=`<g><title>${esc(fmt(h.date)+": "+h.label+" (historical, "+h.basis+")")}</title><circle cx="${cx}" cy="${cy}" r="5" fill="var(--t-hist)"/></g>`; });
  allOcc().forEach(o=>{ const i=rows.indexOf(o.e.route); if(i<0||o.date<start||o.date>=end) return; const cx=x(o.date), cy=top+i*rh+rh/2+(o.e.type==="PREP"?-12:o.e.type==="WATCH"||o.e.type==="ONGOING"?10:0);
    g+=`<g tabindex="0"><title>${esc(fmt(o.date)+": "+o.e.summary+(o.of>1?" (occurrence "+o.n+" of "+o.of+")":"")+" · "+statusOf(o.e).t)}</title>${shape(o.e.type,cx,cy,col(o.e.type),(o.e.tbc&&!["PREP","WATCH","ONGOING"].includes(o.e.type))||o.e.origin==="candidate")}</g>`; });
  if (TODAY>=start && TODAY<end){ const tx=x(TODAY); g+=`<line x1="${tx}" y1="${top-8}" x2="${tx}" y2="${H-24}" stroke="var(--accent)" stroke-width="2"/><text x="${tx+4}" y="${H-10}" font-size="11" font-weight="700" fill="var(--accent)">Today ${fmt(TODAY)}</text>`; }
  g+="</svg>";
  const legend = TYPES.map(t=>`<span class="row" style="gap:4px">${typeTag(t)}<span class="small">${TYPE_LABEL[t]}</span></span>`).join("")+`<span class="small muted">Dashed outline: date TBC or candidate. Grey dots: historical 2026 cycle dates (not in the .ics).</span>`;
  return `<div class="row" style="justify-content:space-between">${calCtrls()}<button class="toggle" id="histTog" role="switch" aria-checked="${hist}" style="color:var(--ink)"><span class="track"><span class="knob"></span></span><span>Show 2026 historical cycles</span></button></div>
    <div class="svgwrap">${g}</div><div class="row">${legend}</div>
    <p class="small muted">Hover or focus a marker for its title and status. Scroll sideways on small screens.</p>${timelineText()}`;
};
V.calendar_timeline.after = () => { bindCand(); const h=$("#histTog"); h&&h.addEventListener("click",()=>{ store.set("hist",!store.get("hist",false)); render(); }); };
V.calendar_agenda = () => {
  const rows = allOcc().map(o=>({date:o.date, month:o.date.slice(0,7)+" · "+MONTHS[+o.date.slice(5,7)-1]+" "+o.date.slice(0,4), type:o.e.type, route:ROUTE[o.e.route]||o.e.route, summary:o.e.summary.replace(/^(\[[A-Z-]+\])+\s*/,""), status:statusOf(o.e).t, sc:statusOf(o.e).c, rem:o.e.alarms.join(" "), uid:o.e.uid, occ:o.of>1?o.n+"/"+o.of:"", url:o.e.url, desc:o.e.desc, past:o.date<TODAY?"Past":"Upcoming"}));
  return `${calCtrls()}${table("tAgenda",{rows, labels:{month:"Month"}, defaultGroup:"month", filters:["type","route","status","past"], groups:["month","route","type","status"], cols:[
    {k:"date",l:"Date",f:v=>`<span class="mono">${esc(fmt(v))}</span>`},{k:"type",l:"Type",f:v=>typeTag(v)},{k:"summary",l:"Event",f:(v,r)=>`<strong>${esc(v)}</strong>${r.occ?` <span class="muted small">occurrence ${r.occ}</span>`:""}<div class="small muted">${esc(r.desc)}</div>`},{k:"route",l:"Route"},{k:"status",l:"Status",f:(v,r)=>pill(v,r.sc)},{k:"rem",l:"Reminders",f:v=>`<span class="mono">${esc(v)}</span>`},{k:"past",l:"When"},{k:"uid",l:"UID and source",f:(v,r)=>`<span class="mono small">${esc(v.split("@")[0])}</span><br>${r.url?`<a href="${esc(r.url)}" target="_blank" rel="noopener">Source<span class="sr"> for ${esc(r.summary)}</span></a>`:link(r.url,"Source")}`}]})}`;
};
V.calendar_agenda.after = () => { bindCand(); renderTable("tAgenda"); };
V.calendar_month = () => {
  const m = store.get("month", TODAY.slice(0,7) >= "2026-10" && TODAY.slice(0,7) <= "2027-12" ? TODAY.slice(0,7) : "2026-10");
  const [y,mo] = m.split("-").map(Number); const first=new Date(Date.UTC(y,mo-1,1)); const startDow=(first.getUTCDay()+6)%7; const days=new Date(Date.UTC(y,mo,0)).getUTCDate();
  const occ=allOcc(); const opts=[]; for(let i=0;i<18;i++){ const d=new Date(Date.UTC(2026,9+i,1)); const k=iso(d).slice(0,7); opts.push(`<option value="${k}"${k===m?" selected":""}>${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}</option>`); }
  let cells=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d=>`<div class="dow">${d}</div>`).join("");
  for(let i=0;i<startDow;i++) cells+=`<div class="day out" aria-hidden="true"></div>`;
  for(let d=1; d<=days; d++){ const k=`${m}-${String(d).padStart(2,"0")}`; const es=occ.filter(o=>o.date===k);
    cells+=`<div class="day${k===TODAY?" today":""}"><span class="d">${d}</span>${es.map(o=>`<span class="ev" style="border-color:var(--t-${o.e.type.toLowerCase()})" title="${esc(o.e.summary)}">${esc(o.e.summary.replace(/^(\[[A-Z-]+\])+\s*/,""))}</span>`).join("")}</div>`; }
  const list = occ.filter(o=>o.date.startsWith(m));
  return `<div class="ctrls">${calCtrls()}<label>Month<select id="monthSel">${opts.join("")}</select></label></div>
    <div class="monthgrid" aria-label="Month view">${cells}</div>
    <h3 id="month-list">${list.length} event${list.length===1?"":"s"} in ${MONTHS[mo-1]} ${y}</h3>
    <ul class="plain">${list.map(o=>`<li class="row">${typeTag(o.e.type)} <span class="mono small">${fmt(o.date)}</span> ${esc(o.e.summary.replace(/^(\[[A-Z-]+\])+\s*/,""))} ${pill(statusOf(o.e).t,statusOf(o.e).c)}</li>`).join("")||'<li class="muted">Nothing scheduled this month.</li>'}</ul>`;
};
V.calendar_month.after = () => { bindCand(); $("#monthSel").addEventListener("change",e=>{ store.set("month",e.target.value); render(); }); };
V.calendar_export = () => {
  const sets = splitSets(); const sel = store.get("exp","master");
  const opts = `<option value="master"${sel==="master"?" selected":""}>Master calendar (all events)</option>`+sets.map(s=>`<option value="${esc(s.file)}"${sel===s.file?" selected":""}>${esc(s.name)} (${s.uids.length})</option>`).join("");
  let evs, name, file;
  if (sel==="master" || !sets.find(s=>s.file===sel)){ evs=liveEvents(); name=D.meta.calname; file="Awards_and_Recognition_Hub_Master_Calendar.ics"; }
  else { const s=sets.find(s=>s.file===sel); evs=s.uids.map(u=>D.events.find(e=>e.uid===u)).filter(Boolean); name=s.name; file=s.file; }
  const txt = buildICS(evs, name);
  return `<div class="note warn"><strong>Import one model per audience.</strong> The master and split calendars share UIDs; importing both shows every event twice.</div>
    <div class="ctrls">${calCtrls()}<label>File<select id="expSel">${opts}</select></label><button class="btn" id="zipIcs" type="button">${ico("download","ico")}<span>Download all calendars (.zip)</span></button><button class="btn ghost" id="copyIcs">${ico("copy","ico")}<span>Copy this .ics</span></button><span id="copyMsg" class="copyok" aria-live="polite"></span></div>
    <p class="small muted">Copy the text, paste it into a plain-text file named <span class="mono">${esc(file)}</span>, then import it. The corrected and candidate files are also supplied alongside this Hub. ${evs.length} event(s); release ${esc(D.meta.version)}.</p>
    <textarea id="icsText" readonly aria-label="iCalendar text">${esc(txt)}</textarea>`;
};
V.calendar_export.after = () => { $("#zipIcs").addEventListener("click",()=>{ const files=[{name:"Awards_and_Recognition_Hub_Master_Calendar.ics", data:buildICS(liveEvents(), D.meta.calname)}].concat(splitSets().map(s=>({name:"split/"+s.file, data:buildICS(s.uids.map(u=>D.events.find(e=>e.uid===u)).filter(Boolean), s.name)}))).concat([{name:"README.txt", data:"Awards and Recognition Hub calendar pack "+D.meta.version+"\r\nImport EITHER the master calendar OR the files in split/, never both.\r\nSources verified "+D.meta.source_verified+". Check organiser sites before relying on any date.\r\n"}]); saveFile("Recognition_Calendar_"+D.meta.version+".zip", makeZip(files), $("#copyMsg")); });
  bindCand(); $("#expSel").addEventListener("change",e=>{ store.set("exp",e.target.value); render(); }); copyBtn("#copyIcs","#icsText","#copyMsg"); };
V.calendar_import = () => `<div class="grid g2">${C.importGuide.map(([t,s])=>`<div class="card stack"><h3 id="imp-${t.split(" ")[0].toLowerCase()}">${esc(t)}</h3><ol class="tick">${s.map(x=>`<li>${esc(x)}</li>`).join("")}</ol></div>`).join("")}</div>
  <h3 id="imp-cats">Outlook categories</h3><div class="tblwrap"><table><thead><tr><th>Category</th><th>Colour</th><th>Purpose</th><th>Title tag</th></tr></thead><tbody>${C.outlookCats.map(c=>`<tr><td>${esc(c[0])}</td><td>${esc(c[1])}</td><td>${esc(c[2])}</td><td>${typeTag(c[3])}</td></tr>`).join("")}</tbody></table></div>
  <p class="small muted">The visible title tags are the cross-platform source of truth because calendar clients vary in how they honour imported colours and categories.</p>
  <h3 id="imp-trouble">Troubleshooting</h3><div class="grid g2">${C.troubleshoot.map(([t,d])=>`<div class="card"><h3 class="h4">${esc(t)}</h3><p class="small">${esc(d)}</p></div>`).join("")}</div>
  <div class="note"><strong>UK Honours.</strong> Keep nominations confidential and never add a nominee's name to a shared calendar.</div>`;

/* Routes */
V.routes_register = () => table("tRoutes",{rows:C.routes.map(r=>({id:r[0],route:r[1],scope:r[2],fit:r[3],evidence:r[4],timing:r[5],caveat:r[6],url:r[7],code:r[8], family:ROUTE[r[8]]||r[8]})), filters:["family"], groups:["family","scope"], cols:[
  {k:"id",l:"ID",f:v=>`<span class="mono">${esc(v)}</span>`},{k:"route",l:"Route",f:(v,r)=>`<strong>${esc(v)}</strong><div class="small">${link(r.url, r.url?"Official source":"")}</div>`},{k:"family",l:"Family"},{k:"scope",l:"Who it recognises"},{k:"fit",l:"Best fit"},{k:"evidence",l:"Evidence to prepare"},{k:"timing",l:"Timing"},{k:"caveat",l:"Eligibility caveat"}]});
V.routes_register.after = () => renderTable("tRoutes");
V.routes_glance = () => `<p class="lede">${prov("V")} re-verified against the organiser on ${fmt(D.meta.build_date)} · ${prov("P")} from the supplied pack · ${prov("S")} confirmed by the service owner · ${prov("O")} portfolio operating rule or advice · ${prov("C")} unconfirmed.</p>
  <div class="grid g2">${C.glance.map(g=>`<article class="card stack glcard" id="gl-${g.code}"><div class="row" style="justify-content:space-between"><h3 class="row" style="gap:8px"><span class="rbadge">${rIco(g.code)}</span>${esc(g.name)}</h3>${g.url?link(g.url,"Official site"):""}</div><p class="small muted">${esc(g.who)}</p><dl class="facts">${g.facts.map(f=>`<dt>${esc(f[0])}</dt><dd>${esc(f[1])} ${prov(f[2])}</dd>`).join("")}</dl><div class="row"><a class="btn ghost" href="#workflows-nominate">${ico("nominate","ico")}<span>Nominate</span></a><button class="btn ghost ai" type="button" data-ask="What do I need to know before nominating for ${esc(g.name)}?">${ico("sparkle","ico")}<span>Ask about this route</span></button></div></article>`).join("")}</div>`;
V.routes_compare = () => `<div class="tblwrap"><table><thead><tr><th>Route</th><th>Individuals</th><th>Teams</th><th>Networks</th><th>Self-nomination</th><th>Confidential</th><th>Timing</th></tr></thead><tbody>${C.compare.map(r=>`<tr>${r.map((c,i)=>i===0?`<th scope="row" style="position:static;text-transform:none;letter-spacing:0;font-size:.88rem;color:var(--ink)">${esc(c)}</th>`:`<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><p class="small muted">(C) marks values taken from the compendium only. Always check current rules on the organiser's site.</p>`;
V.routes_criteria = () => `<div class="note warn"><strong>Identity-dependent categories.</strong> Never assign one of these routes on someone's behalf. The nominee confirms identity, role and career-stage eligibility themselves.</div>
  <div class="grid g2">${C.criteria.map(c=>`<div class="card stack"><h3 class="h4">${esc(c[0])}</h3><p class="small">${esc(c[1])}</p><p class="small muted">${esc(c[2])}</p></div>`).join("")}</div>
  <p class="small">Source: ${link("https://www.ethnicityawards.com/rcblocks/categories-corporate/","Ethnicity Awards corporate categories")}. Evidence window for the 2026 cycle: March 2025 to February 2026 where a 12-month period applies ${prov("P")}.</p>`;

/* Register */
function bars(obj, total){ const ent=Object.entries(obj); const max=Math.max(...ent.map(([,v])=>typeof v==="number"?v:0),1);
  return `<div class="stack" style="gap:6px">${ent.map(([k,v])=>`<div style="display:grid;grid-template-columns:minmax(0,1fr) 3fr auto;gap:8px;align-items:center"><span class="small">${esc(k)}</span><span style="height:12px;background:var(--sunk);border-radius:2px;position:relative"><span style="position:absolute;inset:0 auto 0 0;width:${typeof v==="number"?(100*v/max):0}%;background:var(--navy);border-radius:2px"></span></span><span class="mono small">${esc(v)}</span></div>`).join("")}</div>`; }
V.register_summary = () => { const a=D.agg; return `<div class="note"><strong>Aggregate view only.</strong> Individual records were removed from this edition. Counts below ${3} are suppressed (shown as &lt;3), following the register's own disclosure rule.</div>
  <div class="grid g4"><div class="kpi"><b>${a.total}</b><span>Records in the source register</span></div><div class="kpi"><b>${a.individuals}</b><span>Individual records (de-identified)</span></div><div class="kpi"><b>${a.groups}</b><span>Network and community records</span></div><div class="kpi" style="border-color:var(--ok)"><b>${a.owners_source_unassigned-a.owners_unassigned}/${a.owners_source_unassigned}</b><span>Continuity owners assigned by role</span></div></div>
  <div class="grid g3"><div class="card stack"><h3 id="reg-ev">Evidence status, all records</h3>${bars(a.evidence_all)}</div><div class="card stack"><h3 id="reg-risk">MoG continuity risk, all records</h3>${bars(a.risk_all)}</div><div class="card stack"><h3 id="reg-home">Future home evidence</h3>${bars(a.home_status)}</div><div class="card stack"><h3 id="reg-owner">Continuity owner by role</h3>${bars(a.owner_roles)}<p class="small muted">Roles assigned 17 Oct 2026. Name the post-holders in the restricted register.</p></div>
  <div class="card stack"><h3 id="reg-iev">Individuals: evidence</h3>${bars(a.ind_evidence)}</div><div class="card stack"><h3 id="reg-irisk">Individuals: MoG risk</h3>${bars(a.ind_risk)}</div><div class="card stack"><h3 id="reg-iready">Individuals: readiness</h3>${bars(a.ind_readiness)}</div></div>
  <h3 id="reg-priority">Priority actions</h3><ol class="tick"><li>Name the post-holder behind each continuity-owner role; start with the ${a.risk_all.High} High-risk records.</li><li>Strengthen single-source and attribution-sensitive evidence before any nomination.</li><li>Obtain consent and self-confirmed eligibility before an identity-dependent route is considered.</li><li>Civil Service Awards close ${fmtLong("2026-10-27")} at 5pm: confirm the departmental approval route now.</li></ol>`; };
V.register_groups = () => `<p class="lede">Networks and communities are organisational units, so their records are kept. Narratives are working drafts that must be fact-checked with the network before use.</p>
  <div class="grid g2">${D.groups.map(g=>`<article class="card stack" id="grp-${g.id}"><div class="row" style="justify-content:space-between"><h3>${esc(g.name)}</h3><span class="mono small">${esc(g.id)}</span></div>
  <div class="row">${pill(g.evidence, g.evidence==="Corroborated"?"ok":"info")} ${pill("MoG risk: "+g.risk, g.risk==="High"?"bad":g.risk==="Medium"?"warn":"ok")} ${pill(g.next,"mute")}</div>
  <dl class="facts"><dt>Kind</dt><dd>${esc(g.kind)}</dd><dt>Legacy home</dt><dd>${esc(g.legacy)}</dd><dt>Future home</dt><dd>${esc(g.future)} <span class="muted small">(${esc(g.home_status)})</span></dd><dt>Activity</dt><dd>${esc(g.actions)}</dd><dt>Outcomes</dt><dd>${esc(g.outcomes)}</dd><dt>Best-fit route</dt><dd>${esc(g.route)}</dd><dt>Sources</dt><dd class="mono small">${esc(g.sources)}</dd><dt>Continuity owner</dt><dd>${pill(g.owner,"ok")}</dd></dl>
  <details><summary class="small"><strong>Draft nomination narrative</strong></summary><p class="small" style="margin-top:6px">${esc(g.narrative)}</p></details></article>`).join("")}</div>
  <div class="note warn">Reported metrics such as webinar participation and event engagement need provenance confirmed with the source owner before publication.</div>`;
V.register_intersections = () => table("tX",{rows:D.intersections.map(x=>Object.assign({},x,{status:x.assurance.split(".")[0]})), filters:["status"], groups:["status"], cols:[
  {k:"id",l:"ID",f:v=>`<span class="mono">${esc(v)}</span>`},{k:"theme",l:"Intersection",f:v=>`<strong>${esc(v)}</strong>`},{k:"communities",l:"Communities connected"},{k:"named_count",l:"Named contributors",num:true,f:v=>esc(v)},{k:"contribution",l:"Contribution evidenced"},{k:"sources",l:"Sources",f:v=>`<span class="mono small">${esc(v)}</span>`},{k:"status",l:"Assurance"},{k:"assurance",l:"Next action"}]})+`<p class="small muted">Named contributors are shown as a count only, with counts below 3 suppressed; activity descriptions for small groups are generalised. No identity or membership is inferred from any intersection.</p>`;
V.register_intersections.after = () => renderTable("tX");
V.register_template = () => `<p class="lede">The shape of a recognition record in the restricted register. Use it to add records; never paste one into this Hub.</p>
  <div class="tblwrap"><table><thead><tr><th>Field</th><th>Example value</th><th>Rule</th></tr></thead><tbody>
  ${[["Record ID","I15 (pseudonymous)","Stable; never reused"],["Entity type","Individual · Network · Community","Required"],["Contribution","Actions taken, in the person's or source's words","Cite a source for each claim"],["Outcomes and value","What changed and for whom","No unsupported metric"],["Route mapping","Network Group; Collaboration","Identity-dependent routes only after self-confirmation"],["Evidence source IDs","S40; S41","Add new evidence as a new source"],["Evidence status","Corroborated · Verified single source","Taxonomy in Knowledge"],["Consent and eligibility","Consent recorded · eligibility self-confirmed · prefer not to say","Held separately; restricted access"],["Recognition preference","Private · Internal · Public","Gate before any publication"],["MoG continuity risk","High · Medium · Low","Review monthly"],["Legacy and future home","Confirmed · Indicated · Unresolved","Never guess"],["Continuity owner","Role","Must not be blank at handover"],["Next evidence action","Free text","Dated"]].map(r=>`<tr><td><strong>${r[0]}</strong></td><td>${r[1]}</td><td class="small">${r[2]}</td></tr>`).join("")}</tbody></table></div>
  <h3 id="tpl-narr">Narrative pattern</h3><div class="card"><p class="small">[Name or group] has contributed practical, visible action to [purpose] through [verified actions]. The documented value of this contribution is [verified outcomes]. This evidence shows role-modelling through action rather than title alone. The nomination recognises this contribution without comparing it with others, and preserves an accurate record through organisational change.</p></div>
  <h3 id="tpl-ops">Operating guidance</h3><div class="steps">${C.howto.map(h=>`<div class="step"><span class="n">${esc(h[0].split(".")[0])}</span><h3 class="h4">${esc(h[0].split(". ")[1])}</h3><p class="small">${esc(h[1])}</p></div>`).join("")}</div>
  <h3 id="tpl-cad">Cadence</h3><div class="grid g3">${C.cadence.map(c=>`<div class="card"><h3 class="h4">${esc(c[0])}</h3><p class="small">${esc(c[1])}</p></div>`).join("")}</div>`;

/* Safeguards */
const LAYER_COL=["var(--navy)","var(--t-ongoing)","var(--t-milestone)","var(--t-prep)","var(--t-watch)","var(--t-deadline)"];
V.safe_privacy = () => `<p class="lede">Six layers, from purpose to deletion. Inclusion and privacy go together.</p><div class="layers">${C.privacy.map((p,i)=>`<div class="layer"><span class="lv" style="background:${LAYER_COL[i]}">${i+1}</span><div><strong>${esc(p[0])}</strong> <span class="muted small">${esc(p[1])}</span><p class="small">${esc(p[2])}</p></div></div>`).join("")}</div>
  <div class="grid g2"><div class="card stack"><h3 id="pv-std">Built on these standards</h3>${cardList(C.standards)}</div><div class="card stack" style="border-color:var(--bad)"><h3 id="pv-not">What we do not do</h3>${cardList(["No ranking of people","No performance management use","No automated profiling or scoring","No inference of protected characteristics","No use for employment decisions","No unnecessary collection of sensitive personal data","No sharing beyond agreed boundaries"])}</div></div>`;
V.safe_gates = () => `<div class="note"><strong>Operating rule.</strong> Use signals to widen an invitation or find contribution evidence, never to assign ethnicity. All gates must pass before any person-level inference is processed, and ${term("Self-identification","voluntary self-identification")} remains the preferred standard.</div>
  <div class="tblwrap"><table><thead><tr><th>Gate</th><th>Question</th><th>Pass condition</th><th>If not met</th></tr></thead><tbody>${C.gatesEthical.map(g=>`<tr${g[0]==="G8"?' style="opacity:.7"':""}><td><strong class="mono">${g[0]}</strong><br>${esc(g[1])}</td><td>${esc(g[2])}</td><td>${esc(g[3])}</td><td>${esc(g[4])}</td></tr>`).join("")}</tbody></table></div>
  <p class="small">Evidence basis: ${link("https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/a-guide-to-lawful-basis/special-category-data/","ICO special category data guidance")} (${term("Article 6 lawful basis","Article 6")} and ${term("Article 9 condition","Article 9")}; ${term("DPIA")} for likely high risk) and ${link("https://www.gov.uk/government/publications/standards-for-ethnicity-data/standards-for-ethnicity-data","GOV.UK standards for ethnicity data")}.</p>`;
V.safe_edge = () => table("tEdge",{rows:C.edge.map(e=>({id:e[0],scenario:e[1],tier:e[2],use:e[3],never:e[4],controls:e[5],treat:e[6],review:e[7]})), filters:["tier"], groups:["tier"], cols:[
  {k:"id",l:"Case",f:v=>`<span class="mono">${esc(v)}</span>`},{k:"scenario",l:"Scenario or signal",f:v=>`<strong>${esc(v)}</strong>`},{k:"tier",l:"Risk tier",f:v=>pill(v,v==="Green"?"ok":v==="Amber"?"warn":"bad")},{k:"use",l:"Permissible use"},{k:"never",l:"Never sufficient for"},{k:"controls",l:"Required controls"},{k:"treat",l:"Recognition treatment"},{k:"review",l:"Review trigger"}]});
V.safe_edge.after = () => renderTable("tEdge");
V.safe_methods = () => `<p class="lede">Ten ways to find invisible contribution without inferring identity.</p><div class="grid g2">${C.methods.map(m=>`<div class="card stack"><h3 class="h4">${esc(m[0])}</h3><dl class="facts"><dt>Signal</dt><dd>${esc(m[1])}</dd><dt>Coverage</dt><dd>${esc(m[2])}</dd><dt>Bias safeguard</dt><dd>${esc(m[3])}</dd><dt>Output</dt><dd>${esc(m[4])}</dd></dl></div>`).join("")}</div>`;
V.safe_ladder = () => `<p class="lede">Identity-neutral recognition can go ahead while category-dependent eligibility is still unconfirmed. Pick the level that matches evidence maturity and the person's preference.</p>
  <div class="stack">${C.ladder.map((l,i)=>`<div class="card" style="display:grid;grid-template-columns:56px minmax(0,1fr);gap:12px;border-left:4px solid color-mix(in srgb, var(--gilt) ${30+i*8}%, var(--navy))"><span class="mono" style="font-size:1.1rem;font-weight:700;color:var(--gilt)">${l[0]}</span><div class="stack" style="gap:4px"><strong>${esc(l[1])}</strong><div class="grid g4 small"><span><span class="eyebrow">Audience</span><br>${esc(l[2])}</span><span><span class="eyebrow">Evidence threshold</span><br>${esc(l[3])}</span><span><span class="eyebrow">Consent and identity</span><br>${esc(l[4])}</span><span><span class="eyebrow">Best use</span><br>${esc(l[5])}</span></div></div></div>`).join("")}</div>`;

/* Service */
V.svc_journey = () => `<div class="steps">${C.journey.map((j,i)=>`<div class="step"><span class="n">${i+1}</span><h3 class="h4">${esc(j[0])}</h3><p class="small">${esc(j[1])}</p><ul class="tick small muted">${j[2].map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`).join("")}</div>
  <div class="flow small"><span>Ongoing contribution adds to the record</span><i>·</i><span>Request changes or withdrawal at any point</span><i>·</i><span>Continuous feedback and improvement</span></div>
  <h3 id="j-loop">Evidence-to-learning loop</h3><div class="flow">${C.loop.map((l,i)=>`<span title="${esc(l[1])}"><strong>${esc(l[0])}</strong></span>${i<C.loop.length-1?"<i>→</i>":"<i>↺</i>"}`).join("")}</div>
  <div class="grid g3">${C.loop.map(l=>`<div class="card"><h3 class="h4">${esc(l[0])}</h3><p class="small">${esc(l[1])}</p></div>`).join("")}</div>`;
V.svc_anatomy = () => { const a=C.anatomy, b=(t,x,id,s="")=>`<div class="card stack" ${s}><h3 id="${id}">${t}</h3>${cardList(x)}</div>`;
  return `<div class="grid g3">${b("1. Contributors",a.contributors,"an-1")}${b("2. Contribution and evidence capture",a.capture,"an-2")}${b("3. Core system",a.core,"an-3")}${b("Subject control",a.control,"an-sc")}${b("4. Recognition and use",a.uses,"an-4")}${b("6. Enablers and interfaces",a.enablers,"an-6")}${b("7. Governance and oversight",a.oversight,"an-7")}${b("Out of scope for the pilot",a.outOfScope,"an-oos",'style="border-color:var(--bad)"')}</div>
  <h3 id="an-mog">Through change, recognition endures</h3><div class="grid g4">${b("Before MoG",C.mog.before,"mog-b")}${b("During transition",C.mog.during,"mog-d")}${b("After change",C.mog.after,"mog-a")}${b("Continuity in action",C.mog.continuity,"mog-c")}</div>`; };
V.svc_roadmap = () => `<div class="flow">${C.gates.map(g=>`<span><strong class="mono">${g[0]}</strong> ${esc(g[1])} <span class="muted small">(${esc(g[2])})</span></span>`).join("<i>→</i>")}</div>
  <div class="steps">${C.roadmap.map(r=>`<div class="step"><span class="n">${esc(r.w)}</span><h3 class="h4">${esc(r.p)}</h3><p class="small">${esc(r.d)}</p><ul class="tick small">${r.o.map(o=>`<li>${esc(o)}</li>`).join("")}</ul><span class="small"><span class="eyebrow">Owner role</span><br>${esc(r.owner)} ${pill(r.s, r.s==="Proposed"?"warn":"mute")}</span></div>`).join("")}</div>
  <p class="small muted">Named post-holders shown in the compendium have been replaced by role titles. Every role still needs confirmation.</p>
  <h3 id="rm-roles">Sponsor and change-agent roles</h3><div class="tblwrap"><table><thead><tr><th>Role</th><th>Contribution</th><th>Status</th></tr></thead><tbody>${C.roles.map(r=>`<tr><td><strong>${esc(r[0])}</strong></td><td>${esc(r[1])}</td><td>${pill(r[2], /Proposed/.test(r[2])?"warn":"mute")}</td></tr>`).join("")}</tbody></table></div>`;
V.svc_reqs = () => table("tReq",{rows:C.reqs.map(r=>({id:r[0],type:r[1],req:r[2],pri:r[3],acc:r[4],trace:r[5]})), filters:["type","pri"], groups:["type","pri"], defaultGroup:"type", cols:[{k:"id",l:"ID",f:v=>`<span class="mono">${esc(v)}</span>`},{k:"req",l:"Requirement",f:v=>`<strong>${esc(v)}</strong>`},{k:"type",l:"Type"},{k:"pri",l:"Priority / phase"},{k:"acc",l:"Acceptance criterion"},{k:"trace",l:"Traceability",f:v=>`<span class="mono small">${esc(v)}</span>`}]})
  +`<h3 id="rq-portal">How this Hub meets the requirements it can</h3><div class="tblwrap"><table><thead><tr><th>Requirement</th><th>In this Hub</th><th>Status</th></tr></thead><tbody>${[["NFR-02 No person-level scoring","No person-level data held; K16 and K20 guard the page","Met"],["NFR-03 Data minimisation","Aggregates and intersection counts with small-cell suppression; K14","Met"],["NFR-01 WCAG 2.2 AA","Keyboard focus, semantic tables, contrast tokens; automated axe-core scan in both themes (K22); manual audit outstanding","Partly met"],["FR-08 MoG handover package","MoG handover workflow exports a minimum-necessary JSON and Markdown package","Met"],["NFR-04 Resilient through migration","Single self-contained file with open .ics and JSON-LD exports","Partly met"]].map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${pill(r[2],r[2]==="Met"?"ok":r[2]==="Not met"?"bad":"warn")}</td></tr>`).join("")}</tbody></table></div>`;
V.svc_reqs.after = () => renderTable("tReq");
V.svc_backlog = () => table("tBl",{rows:C.backlog.map(b=>({id:b[0],epic:b[1],item:b[2],phase:b[3],owner:b[4],dep:b[5],dod:b[6]})), filters:["phase"], groups:["phase","epic"], defaultGroup:"phase", cols:[{k:"id",l:"ID",f:v=>`<span class="mono">${esc(v)}</span>`},{k:"epic",l:"Epic"},{k:"item",l:"Item",f:v=>`<strong>${esc(v)}</strong>`},{k:"phase",l:"Phase"},{k:"owner",l:"Owner role"},{k:"dep",l:"Dependency"},{k:"dod",l:"Definition of done"}]})
  +`<h3 id="bl-ctl">Controls</h3>`+table("tCtl",{rows:C.controls.map(c=>({id:c[0],ctl:c[1],purpose:c[2],owner:c[3],ev:c[4],status:c[5],exit:c[6]})), filters:["status"], cols:[{k:"id",l:"ID",f:v=>`<span class="mono">${esc(v)}</span>`},{k:"ctl",l:"Control",f:v=>`<strong>${esc(v)}</strong>`},{k:"purpose",l:"Purpose"},{k:"owner",l:"Owner role"},{k:"ev",l:"Evidence required"},{k:"status",l:"Status",f:v=>pill(v,v==="Mandatory"?"bad":v==="Conditional"?"warn":"mute")},{k:"exit",l:"Exit condition"}]});
V.svc_backlog.after = () => { renderTable("tBl"); renderTable("tCtl"); };

/* Governance */
V.gov_checklist = () => { const st=store.get("chk",{}); let i=0;
  return `<p class="lede">Tick items as you deploy. Ticks are saved in this browser only.</p>${Object.entries(C.checklist).map(([h,items])=>`<div class="card stack"><h3 id="ck-${h.split(" ")[0].toLowerCase()}">${esc(h)}</h3>${items.map(t=>{ const k="c"+(i++); return `<label class="row" style="align-items:flex-start;gap:10px"><input type="checkbox" data-ck="${k}" ${st[k]?"checked":""} style="margin-top:4px"> <span>${esc(t)}</span></label>`; }).join("")}</div>`).join("")}
  <div class="row"><span id="ckCount" class="small"></span><button class="btn ghost" id="ckReset">Clear ticks</button></div>`; };
V.gov_checklist.after = () => { const upd=()=>{ const all=$$("[data-ck]"); $("#ckCount").textContent=all.filter(x=>x.checked).length+" of "+all.length+" done"; };
  $$("[data-ck]").forEach(c=>c.addEventListener("change",()=>{ const st=store.get("chk",{}); st[c.dataset.ck]=c.checked; store.set("chk",st); upd(); })); $("#ckReset").addEventListener("click",()=>{ store.set("chk",{}); render(); }); upd(); };
V.gov_change = () => `<h3 id="cc-status">Status model</h3><div class="flow">${C.statusModel.map(s=>`<span title="${esc(s[1])}"><strong>${esc(s[0])}</strong></span>`).join("<i>→</i>")}</div>
  <div class="grid g3">${C.statusModel.map(s=>`<div class="card"><h3 class="h4">${esc(s[0])}</h3><p class="small">${esc(s[1])}</p></div>`).join("")}</div>
  <h3 id="cc-class">Change classes</h3><div class="grid g4">${C.changeClasses.map(c=>`<div class="card"><h3 class="h4">${esc(c[0])}</h3><p class="small">${esc(c[1])}</p></div>`).join("")}</div>
  <h3 id="cc-records">Change records raised by this build</h3><div class="grid g2">${D.changes.map(c=>`<article class="card stack"><div class="row" style="justify-content:space-between"><h3 class="h4">${esc(c.id)} · ${esc(c.route)}</h3>${pill(c.class, /C2/.test(c.class)?"warn":"info")}</div><dl class="facts">${[["Field changed",c.field],["Old value",c.old],["Proposed value",c.new],["Authoritative source",c.source],["Verified",c.verified],["Evidence status",c.evidence],["Impact",c.impact],["UID affected",c.uid],["Recurrence affected",c.recurrence],["Reminders affected",c.reminders],["Owner",c.owner],["Approver",c.approver],["Release",c.release],["Status",c.status]].map(([k,v])=>`<dt>${k}</dt><dd${k==="UID affected"?' class="mono small"':""}>${/^https/.test(v)?link(v):esc(v)}</dd>`).join("")}</dl></article>`).join("")}</div>
  <h3 id="cc-rules">Update rules</h3><ol class="tick">${C.updateRules.map(r=>`<li>${esc(r)}</li>`).join("")}</ol>
  <h3 id="cc-new">Draft a change record</h3><p class="small">For a guided version with classification and the approval gate, use the <a href="#workflows-change">change request workflow</a>.</p><form id="crForm" class="card stack"><div class="grid g3">${["Route","Field changed","Old value","Proposed value","Authoritative source","Impact"].map((l,i)=>`<label class="small stack" style="gap:3px"><strong>${l}</strong><input type="text" id="cr${i}"></label>`).join("")}<label class="small stack" style="gap:3px"><strong>Change class</strong><select id="cr6">${C.changeClasses.map(c=>`<option>${esc(c[0])}</option>`).join("")}</select></label></div><div class="row"><button class="btn" type="submit">Build record line</button><span id="crMsg" class="copyok" aria-live="polite"></span></div><textarea id="crOut" readonly style="min-height:70px" aria-label="Change record line"></textarea></form>`;
V.gov_change.after = () => { $("#crForm").addEventListener("submit",e=>{ e.preventDefault(); const v=[0,1,2,3,4,5,6].map(i=>$("#cr"+i).value.trim()||"—"); const id="CR-"+String(D.changes.length+1).padStart(3,"0");
  $("#crOut").value=[id,v[0],v[1],v[2],v[3],v[4],TODAY,"Observed",v[5],"Owner role","Approver role","UID (preserve)","Recurrence?","Reminders?",D.meta.version.replace(/\.\d+-candidate$/,".N"),"—", v[6]].join(" | "); $("#crMsg").textContent="Record line ready to copy"; }); };
V.gov_auto = () => `<div class="note warn">This is a workflow specification for an approved automation platform. It is not running, and nothing here claims it has been activated.</div>
  <h3 id="au-flow">Workflow</h3><div class="flow">${C.pipeline.map(p=>`<span class="${/Human/.test(p)?"human":""}">${esc(p)}</span>`).join("<i>→</i>")}</div>
  <div class="grid g2"><div class="card stack"><h3 id="au-machine">Machine may do automatically</h3>${cardList(C.machineMay)}</div><div class="card stack" style="border-color:var(--accent)"><h3 id="au-human">Human approval stays mandatory for</h3>${cardList(C.humanMust)}</div></div>
  <h3 id="au-trig">Trigger pattern</h3><div class="grid g3">${C.triggers.map(t=>`<div class="card"><h3 class="h4">${esc(t[0])}</h3><p class="small">${esc(t[1])}</p></div>`).join("")}</div><p class="small muted">Recommended operating-policy values, not organiser facts.</p>
  <h3 id="au-gates">Release validation gates</h3><ol class="tick">${C.releaseGates.map(g=>`<li>${esc(g)}</li>`).join("")}</ol>
  <h3 id="au-ver">Versioning</h3><p>Versions follow <span class="mono">vYYYY.MM.DD.N</span> with an immutable release copy, a machine-readable change log, the previous version kept for rollback, and release notes listing added, changed, retired and unresolved events. This build is <span class="mono">${esc(D.meta.version)}</span>.</p>
  <div class="note"><strong>Future state.</strong> System of record: a governed opportunity register, not Outlook. Distribution: generated .ics files. Assurance: source evidence, human verification and automated validation. Principle: detect automatically, approve deliberately, publish reproducibly.</div>`;

/* Knowledge */
V.kn_glossary = () => table("tGl",{rows:C.glossary.map(g=>({term:g[0],def:g[1],alt:g[2],domain:g[3]})), filters:["domain"], groups:["domain"], cols:[{k:"term",l:"Term",f:v=>`<strong id="term-${esc(v.replace(/[^A-Za-z0-9]/g,""))}">${esc(v)}</strong>`},{k:"def",l:"Definition"},{k:"alt",l:"Also known as (thesaurus)"},{k:"domain",l:"Domain"}]});
V.kn_glossary.after = () => renderTable("tGl");
V.kn_taxonomy = () => { const tx=[["Event type",TYPES.map(t=>TYPE_LABEL[t]+" ["+t+"]")],["Event status",["Organiser date","Date TBC (tentative)","Portfolio control","Candidate, awaiting approval"]],["Evidence status",["Verified","Corroborated","Verified single source","Reported","Proposed","Unresolved"]],["Fact provenance",["V re-verified on build date","P supplied pack","C compendium only"]],["MoG continuity risk",["High","Medium","Low"]],["Home evidence",["Confirmed","Indicated","Unresolved"]],["Risk tier (edge cases)",["Green","Amber","Red"]],["Change class",C.changeClasses.map(c=>c[0])],["Change status",C.statusModel.map(s=>s[0])],["Recognition level",C.ladder.map(l=>l[0]+" "+l[1])],["Route family",Object.values(ROUTE)]];
  return `<div class="grid g3">${tx.map(([h,v])=>`<div class="card stack"><h3 id="tx-${h.split(" ")[0].toLowerCase()}">${esc(h)}</h3><ul class="tick small">${v.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`).join("")}</div>
  <h3 id="tx-onto">Ontology</h3><div class="tblwrap"><table><thead><tr><th>Subject</th><th>Predicate</th><th>Object</th></tr></thead><tbody>${C.ontology.map(o=>`<tr><td>${esc(o[0])}</td><td class="mono">${esc(o[1])}</td><td>${esc(o[2])}</td></tr>`).join("")}</tbody></table></div>`; };
V.kn_dictionary = () => table("tDd",{rows:C.dictionary.map(d=>({entity:d[0],field:d[1],type:d[2],desc:d[3],cls:d[4]})), filters:["entity","cls"], groups:["entity"], defaultGroup:"entity", cols:[{k:"entity",l:"Entity"},{k:"field",l:"Field",f:v=>`<span class="mono">${esc(v)}</span>`},{k:"type",l:"Type"},{k:"desc",l:"Description"},{k:"cls",l:"Personal data classification"}]});
V.kn_dictionary.after = () => renderTable("tDd");
const KG_ROUTES = () => [...new Set(["CSA","BDA","EA","NDA","HONOURS","INTERNAL","AIG"].concat(D.events.map(e=>e.route)))];
V.kn_graph = () => {
  const typesN = TYPES, routesN = KG_ROUTES(), scopeN=["Individuals","Teams","Networks","Community organisations"];
  const W=900, H=Math.max(460, 40+routesN.length*34), col=[140,450,760], pos={};
  typesN.forEach((t,i)=>pos["t:"+t]=[col[0], 50+i*(H-80)/(typesN.length-1)]);
  routesN.forEach((r,i)=>pos["r:"+r]=[col[1], 40+i*(H-70)/(routesN.length-1)]);
  scopeN.forEach((s,i)=>pos["s:"+s]=[col[2], 70+i*(H-130)/(scopeN.length-1)]);
  const edges=new Set(); D.events.forEach(e=>edges.add("r:"+e.route+"|t:"+e.type));
  const sc={CSA:["Individuals","Teams"],BDA:["Individuals","Teams","Networks","Community organisations"],EA:["Individuals","Networks","Community organisations"],NDA:["Individuals","Community organisations"],HONOURS:["Individuals"],INTERNAL:["Individuals","Teams","Networks"],AIG:["Individuals","Teams"],CSAI:["Individuals","Teams"],DATAC:["Individuals","Teams"],IESE:["Teams"],LGC:["Teams"],MJ:["Teams"],SPSA:["Individuals","Teams"],HSJ:["Teams"]};
  Object.entries(sc).forEach(([r,ss])=>ss.forEach(s=>edges.add("r:"+r+"|s:"+s)));
  let g=`<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Knowledge graph linking recognition routes to event types and to who they recognise"><g id="kgE">`;
  edges.forEach(k=>{ const [a,b]=k.split("|"); const [x1,y1]=pos[a],[x2,y2]=pos[b]; g+=`<path data-e="${a} ${b}" d="M${x1} ${y1} C ${(x1+x2)/2} ${y1}, ${(x1+x2)/2} ${y2}, ${x2} ${y2}" fill="none" stroke="var(--rule)" stroke-width="1.6"/>`; });
  g+="</g>";
  const node=(k,label,c)=>{ const [x,y]=pos[k]; return `<g class="kgn" data-n="${k}" tabindex="0" style="cursor:pointer"><circle cx="${x}" cy="${y}" r="9" fill="${c}"/><text x="${x+(x<W/2?-14:14)}" y="${y+4}" font-size="13" text-anchor="${x<W/2?"end":"start"}">${esc(label)}</text></g>`; };
  typesN.forEach(t=>g+=node("t:"+t,TYPE_LABEL[t],`var(--t-${t.toLowerCase()})`));
  routesN.forEach(r=>{ const [x,y]=pos["r:"+r]; g+=`<g class="kgn" data-n="r:${r}" tabindex="0" style="cursor:pointer"><rect x="${x-70}" y="${y-13}" width="140" height="26" rx="13" fill="var(--navy)"/><text x="${x}" y="${y+4}" font-size="12" text-anchor="middle" font-weight="700" style="fill:var(--paper)">${esc(r==="INTERNAL"?"Internal":r==="HONOURS"?"UK Honours":r)}</text></g>`; });
  scopeN.forEach(s=>g+=node("s:"+s,s,"var(--gilt)"));
  g+=`<text x="${col[0]}" y="18" font-size="11" text-anchor="middle" fill="var(--muted)">EVENT TYPES</text><text x="${col[1]}" y="18" font-size="11" text-anchor="middle" fill="var(--muted)">ROUTES</text><text x="${col[2]}" y="18" font-size="11" text-anchor="middle" fill="var(--muted)">WHO IT RECOGNISES</text></svg>`;
  return `<p class="lede">Select a node to highlight its links. Built from the calendar events and the route register.</p><div class="svgwrap">${g}</div><p id="kgInfo" class="small" aria-live="polite">No node selected.</p>${graphText()}`;
};
V.kn_graph.after = () => { $$(".kgn").forEach(n=>{ const act=()=>{ const k=n.dataset.n; $$("#kgE path").forEach(p=>{ const on=p.dataset.e.split(" ").includes(k); p.setAttribute("stroke", on?"var(--accent)":"var(--rule)"); p.setAttribute("stroke-width", on?"3":"1.6"); }); const c=$$("#kgE path").filter(p=>p.dataset.e.split(" ").includes(k)).map(p=>p.dataset.e.split(" ").find(x=>x!==k).split(":")[1]); $("#kgInfo").textContent=k.split(":")[1]+" links to: "+(c.join(", ")||"nothing"); }; n.addEventListener("click",act); n.addEventListener("keydown",e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); act(); } }); }); };
V.kn_sources = () => `<h3 id="src-pub">Public and organiser sources</h3>`+table("tSrc",{rows:C.sourcesPublic.map(s=>({id:s[0],title:s[1],supports:s[2],url:s[3],status:s[4]})), cols:[{k:"id",l:"ID",f:v=>`<span class="mono">${esc(v)}</span>`},{k:"title",l:"Source",f:(v,r)=>`<strong>${esc(v)}</strong><br>${link(r.url)}`},{k:"supports",l:"Supports"},{k:"status",l:"Assurance"}]})
  +`<h3 id="src-int">Internal sources</h3><div class="card stack"><p class="small">${esc(C.sourcesInternalSummary.note)}</p><div class="tblwrap"><table><thead><tr><th>Class</th><th>Count</th></tr></thead><tbody>${C.sourcesInternalSummary.classes.map(c=>`<tr><td>${esc(c[0])}</td><td class="num">${c[1]}</td></tr>`).join("")}</tbody></table></div></div>`;
V.kn_sources.after = () => renderTable("tSrc");
V.kn_open = () => { const ld={"@context":{"@vocab":"https://schema.org/","rop":"urn:recognition-portfolio:"},"@type":"DataCatalog","name":"Awards and Recognition Hub","version":D.meta.version,"dateModified":D.meta.build_date,
  "dataset":[{"@type":"Dataset","name":"Recognition calendar","hasPart":liveEvents().map(e=>({"@type":"Event","identifier":e.uid,"name":e.summary,"startDate":e.start,"endDate":e.end,"eventStatus":e.status==="TENTATIVE"?"EventPostponed":"EventScheduled","url":e.url||undefined,"rop:eventType":e.type,"rop:route":e.route,"rop:recurrence":e.rrule||undefined,"rop:origin":e.origin}))},
  {"@type":"DefinedTermSet","name":"Recognition glossary","hasDefinedTerm":C.glossary.map(g=>({"@type":"DefinedTerm","name":g[0],"description":g[1],"alternateName":g[2],"inDefinedTermSet":g[3]}))},
  {"@type":"Dataset","name":"Recognition routes","hasPart":C.routes.map(r=>({"@type":"Thing","identifier":r[0],"name":r[1],"description":r[2]+". "+r[6],"url":r[7]||undefined}))}]};
  return `<p class="lede">Open, machine-readable exports so other portals and APIs can harvest this content: JSON-LD using schema.org, and RFC 5545 iCalendar in Calendar › Export.</p><div class="row"><button class="btn" id="copyLd">Copy JSON-LD</button><span id="ldMsg" class="copyok" aria-live="polite"></span></div><textarea id="ldText" readonly aria-label="JSON-LD export">${esc(JSON.stringify(ld,null,1))}</textarea>`; };
V.kn_open.after = () => copyBtn("#copyLd","#ldText","#ldMsg");

/* Assurance */
V.as_checks = () => { const neg=runNegatives();
  return `<p class="lede">These checks run every time the page loads, against the live page and data. Each one has a negative test that breaks the data on purpose and must be caught.</p>
  <div class="card">${CHECKS.map(c=>`<div class="check"><span>${pill(c.sev==="pass"?"Pass":c.sev==="warn"?"Warn":"Fail", c.sev==="pass"?"ok":c.sev==="warn"?"warn":"bad")}</span><div><strong><span class="mono">${c.id}</span> ${esc(c.name)}</strong><div class="small muted">${esc(c.detail)}</div></div><span class="small muted">${esc(c.defect)}</span></div>`).join("")}</div>
  <h3 id="ck-neg">Negative tests</h3><p class="small">${neg.filter(n=>n.caught).length} of ${neg.length} deliberately broken inputs were caught.</p>
  <div class="tblwrap"><table><thead><tr><th>Check</th><th>Mutation</th><th>Result</th></tr></thead><tbody>${neg.map(n=>`<tr><td class="mono">${n.id}</td><td>${esc(n.desc)}</td><td>${pill(n.caught?"Caught":"Missed", n.caught?"ok":"bad")}</td></tr>`).join("")}</tbody></table></div>
  <p class="small muted">K12, K18 and K19 depend on the live page or release date and have no synthetic negative test here.</p>`; };
V.as_defects = () => table("tDef",{rows:DEFECTS.map(d=>({id:d[0],title:d[1],where:d[2],detail:d[3],treat:d[4],check:d[5],status:d[6]})), filters:["status"], groups:["status"], cols:[{k:"id",l:"ID",f:v=>`<span class="mono">${esc(v)}</span>`},{k:"title",l:"Defect or conflict",f:(v,r)=>`<strong>${esc(v)}</strong><div class="small muted">${esc(r.where)}</div>`},{k:"detail",l:"What is wrong"},{k:"treat",l:"Treatment"},{k:"check",l:"Check that prevents recurrence",f:v=>`<span class="mono">${esc(v||"Manual review")}</span>`},{k:"status",l:"Status",f:v=>pill(v,/^Open/.test(v)?"bad":/Fixed/.test(v)?"ok":"warn")}]});
V.as_defects.after = () => renderTable("tDef");
V.as_adversarial = () => { const ev=D.events.filter(e=>e.origin!=="candidate"); const org=ev.filter(e=>["DEADLINE","MILESTONE","CEREMONY"].includes(e.type)&&!e.tbc).length, tbc=ev.filter(e=>e.tbc).length, ctl=ev.filter(e=>["PREP","WATCH","ONGOING"].includes(e.type)).length;
  return `<div class="grid g3"><div class="card stack"><h3 id="adv-base">Base rate</h3><p class="small">Of ${ev.length} events in the supplied pack, ${org} are organiser dates with an exact day, ${tbc} are month-only placeholders and ${ctl} are portfolio controls. One of the ${org} exact organiser dates needed correction on re-reading the source.</p></div>
  <div class="card stack"><h3 id="adv-dis">Disconfirming evidence</h3><p class="small">An automated reading of the Ethnicity Awards homepage paired 14 July with the shortlist and 22 October with winners; it was rejected because it contradicts the stated Maturity Matrix date. The Civil Service Awards FAQ omits the closing date that the homepage states. The British Diversity Awards key-dates page lists winners, not a ceremony or venue. Single-page reliance would have produced different answers.</p></div>
  <div class="card stack"><h3 id="adv-lim">Limits of the sources</h3><p class="small">Five organiser facts were re-read on ${fmt(D.meta.build_date)}. Everything else rests on the pack's own verification or the compendium. Organiser pages change without notice, and the internal sources could not be seen.</p></div></div>
  <h3 id="adv-case">Strongest case against, answered</h3><div class="stack">${ADVERSARIAL.map(a=>`<div class="card" style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.3fr);gap:16px"><p><strong>Objection.</strong> ${esc(a[0])}</p><p class="small"><strong>Answer.</strong> ${esc(a[1])}</p></div>`).join("")}</div>`; };
V.as_deid = () => { const s=D.deid; const rows=[["Individuals' names removed from the register, narratives, MoG tracker, sources and intersection map",s.individual_names+" people; "+s.cells_with_names+" workbook cells"],["Person-level role titles, affiliations and legacy or future homes","Removed for all "+s.individual_names+" individual records"],["Identity-dependent eligibility notes about named people","Removed; generic category criteria kept"],["Personal-life detail recorded about one person","Removed"],["Internal source titles naming people","Summarised by class ("+s.sources_naming_people+" sources)"],["Session-specific search locators","Removed ("+s.session_locators+")"],["Named contributors in the intersection map","Replaced by counts, with counts below 3 suppressed and descriptions generalised ("+s.intersection_name_mentions+" mentions)"],["Named officials in the compendium governance visuals","Replaced by role titles ("+s.compendium_named_officials+" people and their post titles; redacted copy pages "+s.compendium_pages_redacted.slice(0,2).join(" and ")+")"],["Document author metadata","Removed from the redacted compendium"],["Mailbox naming an individual organiser contact","Removed; organiser websites linked instead (redacted copy page "+s.compendium_pages_redacted[2]+")"],["Workbook author and last-modified-by properties","Replaced with a team label"],["Individual-level counts below 3","Suppressed (shown as <3)"],["Hub owner's own contact details","Not published in this edition, at the requester's instruction"]];
  return `<p class="lede">What was removed and how, so a reviewer can check the de-identification without seeing the data.</p><div class="tblwrap"><table><thead><tr><th>Category</th><th>Treatment</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td></tr>`).join("")}</tbody></table></div>
  <div class="note warn"><strong>What stays.</strong> Network and community names, organisational unit names, organiser names and public URLs. These identify organisations, not people. Role titles in governance tables describe posts, not post-holders.</div>
  <div class="note"><strong>Residual risk.</strong> Readers who know the team may still link aggregates or network activity to people. Keep the Hub within the owning team until DPO/IG has reviewed it.</div>`; };
V.as_checkpoint = () => `<div class="grid g2"><div class="card stack"><h3 id="cp-intent">Initial intent</h3><p>Remove all personal information from the four supplied files (two calendar packs, the tracker workbook and the visual compendium), then build a portal from the requirements they set out.</p></div>
  <div class="card stack"><h3 id="cp-arc">Arc of development</h3><ol class="tick small"><li>Read both packs (identical apart from the change-control workflow), all 15 workbook sheets and all 26 compendium pages.</li><li>Re-verified five organiser facts on the build date and found one content error (D02) and one new deadline (AiG).</li><li>De-identified: individual records reduced to suppressed aggregates; names replaced by roles; redacted copies made.</li><li>Built the Hub with calendar, routes, register, safeguards, service, governance, knowledge and assurance sections.</li><li>Added self-checks with negative tests, and a defect register linking each defect to its check.</li><li>An independent review found small-number intersection counts; suppressed and generalised.</li><li>Release 4: workflows section (six guided workflows on a declarative engine), AI assistant and drafting and review agents with template fallbacks, ranked search with assistant hand-off, real downloads, and an icon system. 36 end-to-end workflow tests with and without AI.</li><li>Release 3: owner approved CR-001 to CR-003; continuity owners assigned by role; added planner, route finder, fortnight view, search, CSV copy, source registry, release log, traceability and automated accessibility testing.</li><li>Release 4: declarative workflow engine, AI drafting and an agentic assistant, search and icons.</li><li>Release 5: operating guidance and cadence on 20 workflows, ways to recognise including pay and reward, role pages, lifecycle links, proportionality guide, help, tours, idea box, benefits and inclusive design.</li><li>Release 6: Connect hub for Microsoft 365, Google Workspace, Slack and other apps; colour and icons; overflow guard; innovation, public sector schemes and missions assessment.</li><li>Release 7: CR-004 scheme dates and CR-005 in the calendar, seven new routes, architecture drafts and a What's new page.</li></ol></div>
  <div class="card stack"><h3 id="cp-met">Against the brief</h3><ul class="tick small"><li>${pill("Met","ok")} Personal information removed from the Hub and from the supplied copies.</li><li>${pill("Met","ok")} Hub built from the packs' requirements: calendar, deployment, change control, routes, safeguards.</li><li>${pill("Met","ok")} All three change records approved and released in ${esc(D.meta.version)}.</li><li>${pill("Deviation","warn")} Individual records shown only as aggregates, which limits operational use.</li></ul></div>
  <div class="card stack" style="border-color:var(--warn)"><h3 id="cp-next">Further build work</h3><ul class="tick small"><li>Name the post-holders behind the continuity-owner roles in the restricted register.</li><li>Manual accessibility audit with assistive technology (automated scan passes; that is not a full WCAG 2.2 AA audit).</li><li>Add a user requirement for outcome O4.</li><li>Complete gate G8 and decide D12 with DPO/IG.</li><li>Service blueprints are not yet written; the SAD, HLD and LLD are drafts in Service design › Architecture, for review.</li><li>Organiser dates for 2027 cycles not yet published: watch markers are in the calendar.</li><li>Workflow cases live in each person's browser; a shared tracker would need a governed data store and a DPIA.</li><li>Independent review of the de-identification before wider sharing.</li></ul></div></div>`;

/* ---------------- Release 3 features ---------------- */
const nextDeadlineFor = code => { const o=allOcc().find(o=>o.e.type==="DEADLINE" && o.e.route===code && o.date>=TODAY); return o?o.date:null; };
const addDays = (s,n) => { const d=pd(s); d.setUTCDate(d.getUTCDate()+n); return iso(d); };

/* This fortnight */
V.overview_week = () => {
  const end = addDays(TODAY,14), occ = allOcc().filter(o=>o.date>=TODAY && o.date<=end);
  const byDay = {}; occ.forEach(o=>(byDay[o.date]=byDay[o.date]||[]).push(o));
  const open = DEFECTS.filter(d=>/^Open/.test(d[6]));
  const st = store.get("chk",{}); const total = Object.values(C.checklist).flat().length; const done = Object.values(st).filter(Boolean).length;
  return `<p class="lede">What needs attention between ${fmtLong(TODAY)} and ${fmtLong(end)}.</p>
  <div class="grid g2"><div class="card stack"><h3 id="wk-dates">${occ.length} calendar item${occ.length===1?"":"s"} in the next 14 days</h3>
    ${Object.keys(byDay).length?Object.entries(byDay).map(([d,os])=>`<div class="stack" style="gap:4px"><strong class="small">${esc(fmtLong(d))} <span class="muted">(${dayDiff(TODAY,d)===0?"today":"in "+dayDiff(TODAY,d)+" day"+(dayDiff(TODAY,d)===1?"":"s")})</span></strong>${os.map(o=>`<div class="row">${typeTag(o.e.type)} <span class="small">${esc(o.e.summary.replace(/^(\[[A-Z-]+\])+\s*/,""))}</span></div>`).join("")}</div>`).join(""):'<p class="muted">Nothing scheduled.</p>'}</div>
  <div class="stack"><div class="card stack" style="border-color:var(--warn)"><h3 id="wk-open">Open items needing an owner</h3><ul class="plain">${open.map(d=>`<li><a href="#assurance-defects" class="mono">${d[0]}</a> ${esc(d[1])}</li>`).join("")||'<li class="muted">None.</li>'}</ul></div>
  <div class="card stack"><h3 id="wk-rhythm">Operating rhythm due</h3><ul class="plain">${RHYTHM.map(r=>({...r,due:nextDue(r)})).filter(r=>r.due&&r.due<=end).sort((a,b)=>a.due.localeCompare(b.due)).map(r=>`<li class="row" style="justify-content:space-between"><a href="#workflows-${r.wf}">${esc(r.name)}</a>${pill(fmt(r.due),"info")}</li>`).join("")||'<li class="muted">Nothing due.</li>'}</ul></div>
  <div class="card stack"><h3 id="wk-deploy">Deployment checklist</h3><p>${done} of ${total} items ticked in this browser.</p><a href="#governance-checklist">Open the checklist</a></div>
  <div class="card stack"><h3 id="wk-reg">Source re-verification due</h3><ul class="plain">${D.registry.filter(r=>r[4]).map(r=>{ const due=addDays(r[4],r[5]); return `<li class="row" style="justify-content:space-between"><span>${esc(ROUTE[r[0]]||r[0])}</span>${pill(due<TODAY?"Overdue "+fmt(due):"Due "+fmt(due), due<TODAY?"bad":dayDiff(TODAY,due)<=3?"warn":"ok")}</li>`; }).join("")}</ul></div></div></div>`;
};

/* Nomination planner */
const PLAN_STEPS = [[-34,"Start nomination preparation","Pick the category, gather sources and confirm the nominee is content to be nominated."],[-21,"Evidence and category review","Check every claim against a cited source and the current criteria and evidence window."],[-10,"Final preparation","Verify category fit, evidence, facts, approvals and the draft."],[-5,"Evidence and STAR review","Peer-review the draft; confirm metrics and co-contributors with the source owner."],[-2,"Submission check","Confirm the departmental approval route and the organiser's form; submit early."],[0,"Organiser deadline","Submit before the stated time."]];
V.calendar_planner = () => {
  const dl = allOcc().filter(o=>o.e.type==="DEADLINE" && o.date>=TODAY);
  const sel = store.get("plan", dl[0]?dl[0].e.uid:"custom"); const custom = store.get("planDate", addDays(TODAY,30));
  const cur = dl.find(o=>o.e.uid===sel); const date = cur?cur.date:custom; const code = cur?cur.e.route:"";
  const limit = code==="CSA"?600:null; const draft = store.get("star:"+(code||"custom"), {o:"",s:"",t:"",a:"",r:""});
  const steps = PLAN_STEPS.map(([n,t,d])=>({date:addDays(date,n), t, d, n}));
  return `<p class="lede">Back-schedule a nomination from its deadline, then draft it in STAR form with a live word count. Plans and drafts stay in this browser only.</p>
  <div class="ctrls"><label>Deadline<select id="planSel">${dl.map(o=>`<option value="${esc(o.e.uid)}"${o.e.uid===sel?" selected":""}>${esc(fmt(o.date))}: ${esc(ROUTE[o.e.route]||o.e.route)}</option>`).join("")}<option value="custom"${!cur?" selected":""}>Another route (enter a date)</option></select></label>${!cur?`<label>Deadline date<input type="date" id="planDate" value="${esc(custom)}"></label>`:""}</div>
  <h3 id="pl-sched">Schedule for ${esc(fmtLong(date))}</h3>
  <div class="tblwrap"><table><thead><tr><th>Date</th><th>Step</th><th>What to do</th><th>Status</th></tr></thead><tbody>${steps.map(s=>{ const dd=dayDiff(TODAY,s.date); return `<tr><td class="mono">${esc(fmt(s.date))}<br><span class="muted small">T${s.n===0?"":s.n}</span></td><td><strong>${esc(s.t)}</strong></td><td class="small">${esc(s.d)}</td><td>${dd<0?pill("Passed","mute"):dd===0?pill("Today","warn"):dd<=3?pill("In "+dd+" day"+(dd===1?"":"s"),"warn"):pill("In "+dd+" days","ok")}</td></tr>`; }).join("")}</tbody></table></div>
  ${steps.filter(s=>s.n<0).every(s=>s.date<TODAY)?'<div class="note warn">Every preparation step has passed. Concentrate on the submission check and the departmental approval route.</div>':""}
  <div class="row"><button class="btn ghost" id="planIcs">Copy plan as .ics</button><span id="planMsg" class="copyok" aria-live="polite"></span></div><textarea id="planIcsText" readonly hidden aria-label="Plan calendar"></textarea>
  <h3 id="pl-star">STAR draft${limit?` (limit ${limit} words)`:""}</h3>
  <div class="note"><strong>Before you draft.</strong> Use verified examples only. Do not assign an identity-dependent category on the nominee's behalf. Drafts are saved in this browser only; do not leave sensitive details on a shared device.</div>
  <form id="starForm" class="stack">${[["o","Overview","One or two sentences on who is nominated and for what."],["s","Situation","The context and the problem."],["t","Task","What needed to change and the nominee's part in it."],["a","Action","What they did, with dates and named co-contributors where consented."],["r","Result","Measurable outcomes and who benefited, with sources."]].map(([k,l,h])=>`<label class="stack small" style="gap:4px"><strong>${l}</strong><span class="muted">${h}</span><textarea id="star-${k}" data-k="${k}" style="min-height:90px;font-family:var(--f-body);font-size:.95rem">${esc(draft[k]||"")}</textarea></label>`).join("")}</form>
  <div class="row"><strong id="starCount" aria-live="polite"></strong><button class="btn" id="starCopy">Copy draft</button><button class="btn ghost" id="starClear">Clear draft</button><span id="starMsg" class="copyok" aria-live="polite"></span></div><textarea id="starText" readonly hidden aria-label="Draft text"></textarea>`;
};
V.calendar_planner.after = () => {
  $("#planSel").addEventListener("change",e=>{ store.set("plan",e.target.value); render(); });
  const pdi=$("#planDate"); if(pdi) pdi.addEventListener("change",e=>{ if(/^\d{4}-\d{2}-\d{2}$/.test(e.target.value) && !isNaN(pd(e.target.value))){ store.set("planDate",e.target.value); render(); } else { e.target.setCustomValidity("Use the format YYYY-MM-DD"); e.target.reportValidity(); } });
  const sel=store.get("plan",""), dl=allOcc().filter(o=>o.e.type==="DEADLINE" && o.date>=TODAY), cur=dl.find(o=>o.e.uid===sel)||(!sel?dl[0]:null);
  const code = cur?cur.e.route:"custom", limit = code==="CSA"?600:null, date=cur?cur.date:store.get("planDate",addDays(TODAY,30));
  const words = t => (t.trim().match(/\S+/g)||[]).length;
  const upd = () => { const d={}; $$("#starForm textarea").forEach(t=>d[t.dataset.k]=t.value); store.set("star:"+code,d); const n=Object.values(d).reduce((a,t)=>a+words(t),0); const el=$("#starCount"); el.textContent=n+" word"+(n===1?"":"s")+(limit?" of "+limit:""); el.style.color = limit && n>limit ? "var(--bad)" : "var(--ink)";
    $("#starText").value=[["Overview","o"],["Situation","s"],["Task","t"],["Action","a"],["Result","r"]].map(([l,k])=>l+"\n"+(d[k]||"")).join("\n\n"); };
  $$("#starForm textarea").forEach(t=>t.addEventListener("input",upd)); upd();
  $("#starClear").addEventListener("click",()=>{ store.set("star:"+code,{}); render(); });
  $("#starCopy").addEventListener("click",()=>{ const t=$("#starText"); try{ navigator.clipboard.writeText(t.value).then(()=>$("#starMsg").textContent="Copied",()=>{ t.hidden=false; t.select(); $("#starMsg").textContent="Selected: press Ctrl+C or Cmd+C"; }); }catch(e){ t.hidden=false; t.select(); } });
  const evs = PLAN_STEPS.filter(s=>s[0]<0).map(([n,t,d])=>({uid:`plan-${code.toLowerCase()}-${date.replace(/-/g,"")}-t${-n}@recognition-portfolio.gov.uk`, summary:`[PREP][${code==="custom"?"ROUTE":code}] ${t}`, start:addDays(date,n), end:addDays(date,n+1), desc:d+" Personal planning reminder generated by the Hub; not an organiser date.", categories:["Recognition","Preparation"], status:"CONFIRMED", url:"", color:"", rrule:"", alarms:["-P1D"]}));
  $("#planIcsText").value = buildICS(evs, "Nomination plan");
  $("#planIcs").addEventListener("click",()=>{ const t=$("#planIcsText"); try{ navigator.clipboard.writeText(t.value).then(()=>$("#planMsg").textContent="Copied "+evs.length+" reminders",()=>{ t.hidden=false; t.select(); $("#planMsg").textContent="Selected: press Ctrl+C or Cmd+C"; }); }catch(e){ t.hidden=false; t.select(); } });
};

/* Route finder */
const FINDER = [
  ["R02",["ind","team"],["mentor","inclusion"],["external"],"CSA"],["R03",["team"],["collab"],["external"],"CSA"],["R04",["ind","team"],["community"],["external"],"CSA"],["R05",["ind"],["lead"],["external"],"CSA"],
  ["R06",["ind","team","net"],["inclusion","lead","collab"],["external"],"BDA"],["R01",["ind","net"],["inclusion"],["external"],"EA"],["R07",["ind","vol"],["community","inclusion"],["external"],"NDA"],
  ["R08",["ind"],["sustained","community"],["honour"],"HONOURS"],["R09",["vol"],["community","sustained"],["honour"],"HONOURS"],["R13",["ind","team"],["analysis"],["external"],"AIG"],
  ["R10",["ind","team","net","vol"],["*"],["quick","internal"],"INTERNAL"],["R11",["ind","team","net"],["*"],["internal"],"INTERNAL"],["R12",["ind","team","net","vol"],["*"],["quick","internal"],"INTERNAL"]
];
const LADDER_FOR = {quick:"L1–L3", internal:"L2–L4", external:"L5–L6", honour:"L8"};
V.routes_finder = () => {
  const f = store.get("finder",{who:"team",what:"collab",want:"external"});
  const opt=(id,label,arr)=>`<fieldset class="card stack" style="margin:0"><legend class="eyebrow" style="padding:0 4px">${label}</legend><div class="chips" role="radiogroup">${arr.map(([v,l])=>`<button type="button" class="chip" role="radio" aria-checked="${f[id]===v}" data-f="${id}" data-v="${v}">${esc(l)}</button>`).join("")}</div></fieldset>`;
  const res = FINDER.map(([rid,who,what,want,code])=>{ let sc=0; if(who.includes(f.who)) sc+=3; else return null; if(what.includes("*")) sc+=1; else if(what.includes(f.what)) sc+=3; else return null; if(want.includes(f.want)) sc+=2; else sc-=2; return {r:C.routes.find(r=>r[0]===rid), sc, code, dl:nextDeadlineFor(code)}; }).filter(Boolean).sort((a,b)=>b.sc-a.sc);
  return `<p class="lede">Answer three questions about the contribution. The finder never asks about anyone's identity; identity-dependent categories are flagged for the nominee to self-confirm.</p>
  <div class="grid g3">${opt("who","Who is being recognised",[["ind","An individual"],["team","A team or partnership"],["net","A staff network"],["vol","A volunteer or community group"]])}${opt("what","What did they do",[["lead","Leadership"],["collab","Collaboration"],["mentor","Mentoring or developing people"],["community","Community or volunteering"],["inclusion","Inclusion or network activity"],["analysis","Analysis or data"],["innov","Innovation, digital or AI"],["place","Work with councils, the NHS or Scotland"],["sustained","Sustained public service"]])}${opt("want","What kind of recognition",[["quick","Quick thanks"],["internal","Internal visibility"],["external","An external award"],["honour","A national honour"]])}</div>
  <h3 id="rf-res">${res.length} matching route${res.length===1?"":"s"} <span class="muted small">· suggested ladder level ${LADDER_FOR[f.want]}</span></h3>
  <div class="stack">${res.map((x,i)=>`<article class="card" style="display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:14px;align-items:start${i===0?";border-color:var(--accent)":""}"><span class="stack" style="align-items:center;gap:4px"><span class="rbadge">${rIco(x.code)}</span><span class="mono small" style="color:var(--gilt);font-weight:700">${x.r[0]}</span></span><div class="stack" style="gap:4px"><strong>${esc(x.r[1])}</strong><span class="small">${esc(x.r[4])}</span><span class="small muted">${esc(x.r[6])}</span>${x.code==="EA"?`<span class="small" style="color:var(--warn)">Individual categories here depend on identity, role or career stage: the nominee self-confirms. Network Group does not.</span>`:""}${x.r[7]?link(x.r[7],"Official criteria"):""}</div><div class="stack" style="gap:4px;text-align:right">${x.dl?pill("Closes "+fmt(x.dl)+" · "+dayDiff(TODAY,x.dl)+" days", dayDiff(TODAY,x.dl)<=10?"warn":"ok"):pill(esc(x.r[5]),"mute")}${x.dl?`<a class="small" href="#calendar-planner" data-plan="${x.code}">Plan it</a>`:""}</div></article>`).join("")||'<p class="muted">No route matches that combination. Try a broader kind of recognition, such as internal visibility.</p>'}</div>`;
};
V.routes_finder.after = () => {
  $$("[data-f]").forEach(b=>b.addEventListener("click",()=>{ const f=store.get("finder",{who:"team",what:"collab",want:"external"}); f[b.dataset.f]=b.dataset.v; store.set("finder",f); render(); const n=$(`[data-f="${b.dataset.f}"][data-v="${b.dataset.v}"]`); n&&n.focus(); }));
  $$("[data-plan]").forEach(a=>a.addEventListener("click",()=>{ const o=allOcc().find(o=>o.e.type==="DEADLINE"&&o.e.route===a.dataset.plan&&o.date>=TODAY); if(o) store.set("plan",o.e.uid); }));
};

/* Source registry and release log */
V.gov_registry = () => `<p class="lede">The canonical source registry from the deployment pack: one row per route, with the authoritative source, the fields it is expected to supply, when it was last verified and when it is next due.</p>
  <div class="tblwrap"><table><thead><tr><th>Route</th><th>Organiser and source</th><th>Fields expected</th><th>Last verified</th><th>Cadence</th><th>Next due</th><th>Status</th></tr></thead><tbody>${D.registry.map(r=>{ const due=r[4]?addDays(r[4],r[5]):null; return `<tr><td><strong>${esc(ROUTE[r[0]]||r[0])}</strong></td><td>${esc(r[1])}<br>${r[2]?link(r[2]):'<span class="muted small">No authoritative URL held</span>'}</td><td class="small">${esc(r[3])}</td><td class="mono">${r[4]?esc(fmt(r[4])):"—"}</td><td>${r[5]} days</td><td class="mono">${due?esc(fmt(due)):"—"}</td><td>${pill(!r[4]?r[6]:due<TODAY?"Overdue":r[6], !r[4]?"bad":due<TODAY?"bad":/Pack/.test(r[6])?"info":"ok")}</td></tr>`; }).join("")}</tbody></table></div>
  <p class="small muted">Cadences follow the pack's recommended policy: weekly for routes with an open deadline or active watch, longer otherwise. They are operating-policy values, not organiser facts.</p>`;
V.gov_releases = () => `<div class="stack">${D.releases.slice().reverse().map(r=>`<article class="card stack"><div class="row" style="justify-content:space-between"><h3 class="mono" id="rel-${r.v.replace(/[^0-9a-z]/gi,"")}">${esc(r.v)}</h3>${pill(r.status, r.status==="Current"?"ok":"mute")}</div><p class="small muted">${esc(fmtLong(r.date))}</p><p>${esc(r.notes)}</p></article>`).join("")}</div>
  <h3 id="rel-cr">Change records in this release</h3><div class="tblwrap"><table><thead><tr><th>ID</th><th>Route</th><th>Change</th><th>Class</th><th>Approver</th><th>Status</th></tr></thead><tbody>${D.changes.map(c=>`<tr><td class="mono">${c.id}</td><td>${esc(c.route)}</td><td class="small">${esc(c.new)}</td><td>${esc(c.class)}</td><td class="small">${esc(c.approver)}</td><td>${pill(c.status,/released/i.test(c.status)?"ok":"mute")}</td></tr>`).join("")}</tbody></table></div>`;

/* Traceability */
const TRACE = [
  ["O1","UR-01 UR-04","FR-05 FR-06","C05 C09","B04","safeguards-ladder","K14"],
  ["O2","UR-02 UR-05","FR-01 FR-02 FR-03","C01 C02 C03","B01 B02","register-intersections","K14 K16"],
  ["O3","UR-03","FR-08","C06","B05","register-template","K08"],
  ["O4","(none in source)","Calendar release gates 1–10","C04","—","calendar-planner","K01–K12 K21 K23"],
  ["All","NFR-01","—","C10","B06","assurance-checks","K22"],
  ["All","NFR-02","FR-02 FR-04","C07 C08","B03","safeguards-gates","K16 K20"],
  ["All","NFR-03","—","C07","B08","register-summary","K14"],
  ["All","NFR-04","FR-08","C06","B05","knowledge-open","K08 K21"]
];
V.kn_trace = () => { const oc = i => i==="All"?"Cross-cutting":C.toc.outcomes[+i.slice(1)-1];
  const def = ids => DEFECTS.filter(d=>ids.split(/[\s–]+/).some(k=>k && d[5].split(" ").includes(k))).map(d=>d[0]);
  return `<p class="lede">Lineage from each theory-of-change outcome to the requirements, controls, backlog items, Hub evidence, self-checks and defects that serve it. Gaps are shown, not filled.</p>
  <div class="tblwrap"><table><thead><tr><th>Outcome</th><th>User or non-functional requirement</th><th>Functional requirement</th><th>Control</th><th>Backlog</th><th>Where in the Hub</th><th>Self-checks</th><th>Related defects</th></tr></thead><tbody>${TRACE.map(t=>`<tr><td><span class="mono" style="color:var(--accent)">${t[0]}</span><br><span class="small">${esc(oc(t[0]))}</span></td><td class="mono small">${esc(t[1])}</td><td class="mono small">${esc(t[2])}</td><td class="mono small">${esc(t[3])}</td><td class="mono small">${esc(t[4])}</td><td><a href="#${t[5]}">${esc(t[5].replace("-"," › "))}</a></td><td class="mono small"><a href="#assurance-checks">${esc(t[6])}</a></td><td class="mono small">${def(t[6]).join(" ")||"—"}</td></tr>`).join("")}</tbody></table></div>
  <div class="note warn"><strong>Gap.</strong> Outcome O4 (better-evidenced nominations submitted on time) has no user requirement in the source tracker. The planner and calendar gates serve it; a user requirement should be added.</div>`; };

/* CSV copy for tables */
function tableCSV(id){ const t=TBL[id]; const rows=(t._rows||t.rows).map(r=>t.cols.map(c=>String(r[c.k]==null?"":r[c.k]).replace(/\s+/g," ").trim())); const head=t.cols.map(c=>c.l); return [head].concat(rows).map(r=>r.map(v=>/[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v).join(",")).join("\r\n"); }

/* Global search */
function searchIndex(){
  const I=[]; const add=(title,text,hash,kind)=>I.push({title,text:(title+" "+text).toLowerCase(),hash,kind});
  D.events.forEach(e=>add(e.summary.replace(/^(\[[A-Z-]+\])+\s*/,""),e.desc+" "+e.start,"calendar-agenda","Calendar"));
  C.routes.forEach(r=>add(r[0]+" "+r[1],r.slice(2).join(" "),"routes-register","Route"));
  C.glance.forEach(g=>add(g.name,g.who+" "+g.facts.map(f=>f.join(" ")).join(" "),"routes-glance","At a glance"));
  C.glossary.forEach(g=>add(g[0],g[1]+" "+g[2],"knowledge-glossary","Glossary"));
  DEFECTS.forEach(d=>add(d[0]+" "+d[1],d.slice(2).join(" "),"assurance-defects","Defect"));
  C.reqs.forEach(r=>add(r[0]+" "+r[2],r.slice(3).join(" "),"service-reqs","Requirement"));
  C.controls.forEach(c=>add(c[0]+" "+c[1],c.slice(2).join(" "),"service-backlog","Control"));
  C.backlog.forEach(b=>add(b[0]+" "+b[2],b.join(" "),"service-backlog","Backlog"));
  C.edge.forEach(e=>add(e[0]+" "+e[1],e.slice(2).join(" "),"safeguards-edge","Edge case"));
  C.gatesEthical.forEach(g=>add(g[0]+" "+g[1],g.slice(2).join(" "),"safeguards-gates","Gate"));
  C.methods.forEach(m=>add(m[0],m.slice(1).join(" "),"safeguards-methods","Discovery method"));
  C.ladder.forEach(l=>add(l[0]+" "+l[1],l.slice(2).join(" "),"safeguards-ladder","Recognition level"));
  C.isNot.forEach(n=>add(n[0],n[1],"overview-not","Boundary"));
  Object.entries(C.checklist).forEach(([h,a])=>a.forEach(x=>add(x.slice(0,70),h+" "+x,"governance-checklist","Checklist")));
  D.changes.forEach(c=>add(c.id+" "+c.route,c.new+" "+c.status,"governance-change","Change record"));
  D.groups.forEach(g=>add(g.name,g.actions+" "+g.outcomes,"register-groups","Network"));
  SECTIONS.forEach(s=>s.tabs.forEach(t=>add(s.label+" › "+t[1],"","" + s.id+"-"+t[0],"Page")));
  WF_ALL().forEach(id=>{ const w=WF[id], g=GUIDE[id]||{}; add(w.name, w.who+" "+(g.purpose||"")+" "+(g.cadence||"")+" "+w.steps.map(s=>s.title+" "+s.intro).join(" ")+" "+w.outputs.join(" "), "workflows-"+id, "Workflow"); });
  METHODS.forEach(m=>add(m[1], m[2]+" "+m[7]+" "+m[3].split(" ").map(g=>GIVER[g]).join(" "), "recognition-methods", "Recognition method"));
  Object.entries(ROLES).forEach(([k,r])=>add(r.title, r.intro+" "+r.resp.join(" "), "recognition-"+({peer:"peers",manager:"managers",leader:"leaders",hr:"hr"})[k], "Role"));
  BENEFITS.forEach(b=>add(b[1], b[0]+" "+b[2]+" benefits", "recognition-benefits", "Benefit or scheme"));
  INTEG.forEach(i=>add(i[2], i[1]+" "+i[4]+" "+i[5]+" "+i[6]+" integration connect send share", "connect-"+(["microsoft","google","slack","others"].includes(i[9])?i[9]:i[9]==="formats"?"formats":"govern"), "Integration"));
  DOMAINS.forEach(d=>add(d[1], d[3]+" "+d[4]+" "+d[6]+" recognition domain", "recognition-domains", "Recognition domain"));
  PUBLIC_WINNERS.forEach(w=>add(w[3], w[0]+" "+w[1]+" "+w[2]+" "+w[5]+" "+w[6]+" winner spotlight", "overview-spotlight", "Award winner"));
  INNOV.forEach(n=>add(n[1], n[4]+" "+n[5]+" innovation reward incentive", "recognition-innovation", "Innovation"));
  PROFESSIONS.forEach(p=>add(p[0]+" profession innovation", p.slice(1).join(" "), "recognition-innovation", "Profession"));
  SECTOR_SCAN.forEach(x=>add(x[1], x.slice(2,5).join(" ")+" "+x[0]+" scheme award", "recognition-sector", "Public sector scheme"));
  MISSION_LINKS.forEach(m=>add(m[0], m[2]+" "+m[3]+" mission priority", "recognition-missions", "Mission link"));
  INTEG_RULES.forEach(r=>add(r[0]+" "+r[1], r[2]+" integration rule", "connect-govern", "Integration rule"));
  Object.entries(TOURS).forEach(([id,t])=>add(t.name, "guided tour "+t.steps.map(x=>x[2]).join(" "), "help-tours", "Tour"));
  Object.entries(TUTORIALS).forEach(([id,t])=>add(t.name, "tutorial "+t.tasks.map(x=>x[0]).join(" "), "help-tutorials", "Tutorial"));
  FAQ.forEach(f=>add(f[0], f[1], "help-guide", "FAQ"));
  EFFORT_OPTIONS.forEach(o=>add(o[0], o[1]+" "+o[2]+" effort proportionality fair", "recognition-proportion", "Proportionality"));
  LIFECYCLE.forEach(l=>add(l[0], l[2]+" "+l[5], "recognition-career", "Employee process"));
  RHYTHM.forEach(r=>add(r.name, FREQ_LABEL[r.freq]+" "+r.owner+" cadence rhythm", "workflows-rhythm", "Rhythm"));
  return I;
}
let SIDX=null;
function openSearch(){
  SIDX = SIDX || searchIndex(); const dlg=$("#searchDlg"); dlg.hidden=false; const inp=$("#searchIn"); inp.value=""; drawSearch(""); inp.focus();
}
function closeSearch(noFocus){ const d=$("#searchDlg"); d.hidden=true; const anch=d.classList.contains("anchored"); d.classList.remove("anchored"); if(!noFocus){ (anch||mastSearchVisible() ? $("#mSearch") : $("#searchBtn")).focus(); } }
function drawSearch(q){
  SIDX = SIDX || searchIndex(); const terms=q.toLowerCase().split(/\s+/).filter(Boolean); const res = terms.length ? rankSearch(q, 40) : SIDX.filter(x=>x.kind==="Page"||x.kind==="Workflow").slice(0,14);
  const askRow = terms.length>=2 ? `<li><button type="button" class="askrow" id="searchAsk">${ico("sparkle","ico")}<span><span class="eyebrow">Ask the assistant</span><span>${esc(q)}</span></span></button></li>` : "";
  $("#searchRes").innerHTML = (res.map((r,i)=>`<li><a href="#${r.hash}" data-i="${i}"><span class="eyebrow">${esc(r.kind)}</span><span>${esc(r.title)}</span></a></li>`).join("") || '<li class="muted" style="padding:10px">No results. Try fewer words, or ask the assistant.</li>') + askRow;
  const sa=$("#searchAsk"); if(sa) sa.onclick=()=>{ closeSearch(true); openAsk(q); };
  $("#searchCount").textContent = terms.length? res.length+" result"+(res.length===1?"":"s") : "Pages";
  $$("#searchRes a").forEach(a=>a.addEventListener("click",()=>closeSearch(true)));
}

