/* ================= Release 4: icons, AI layer, workflow engine ================= */

/* ---------- Icon library (24px line icons, 1.8 stroke) ---------- */
Object.assign(ICON, {
  workflows:'<path d="M4 6h6v4H4zM14 14h6v4h-6zM14 4h6v4h-6z"/><path d="M10 8h2a2 2 0 0 1 2 2v4M17 8v6"/>',
  nominate:'<path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z"/>',
  thanks:'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  credits:'<path d="M7 4h10v4a5 5 0 0 1-10 0z"/><path d="M5 5H3v1a3 3 0 0 0 3 3M19 5h2v1a3 3 0 0 1-3 3M12 13v4M8 21h8M9 17h6"/>',
  handover:'<path d="M3 12h7l-2-2M10 12l-2 2"/><rect x="12" y="6" width="9" height="12" rx="1.5"/><path d="M15 10h3M15 14h3"/>',
  change:'<path d="M4 7h11l-3-3M20 17H9l3 3"/>',
  verify:'<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.2-4.2M8.5 11l1.8 1.8 3.2-3.3"/>',
  map:'<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
  sparkle:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
  r_CSA:'<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5v1a3 3 0 0 0 3 3M16 6h3v1a3 3 0 0 1-3 3M12 13v4M8 20h8"/>',
  r_BDA:'<circle cx="12" cy="9" r="5"/><path d="M12 6.5l.9 1.8 2 .3-1.4 1.4.3 2-1.8-.9-1.8.9.3-2-1.4-1.4 2-.3z"/><path d="M9 13.5L7.5 21l4.5-2 4.5 2-1.5-7.5"/>',
  r_EA:'<circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M3 20a5 5 0 0 1 10 0M11 20a5 5 0 0 1 10 0"/>',
  r_NDA:'<circle cx="12" cy="7" r="3"/><circle cx="5" cy="10" r="2"/><circle cx="19" cy="10" r="2"/><path d="M7 20a5 5 0 0 1 10 0M2 19a3.5 3.5 0 0 1 5-3M22 19a3.5 3.5 0 0 0-5-3"/>',
  r_HONOURS:'<path d="M4 18h16l-1.5-9-4 3.5L12 6l-2.5 6.5-4-3.5z"/><path d="M4 21h16"/>',
  r_INTERNAL:'<path d="M3 14l4-1 5 3 6-4 3 1M7 13l2-5h4l3 4"/><path d="M3 18h18"/>',
  r_AIG:'<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>',
  r_CSAI:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/><path d="M10 10h4v4h-4z"/>',
  r_DUK:'<path d="M12 3v18M5 7h14M5 7l-3 6a3 3 0 0 0 6 0zM19 7l-3 6a3 3 0 0 0 6 0z"/>',
  r_KAVS:'<circle cx="12" cy="14" r="5"/><path d="M8 3l4 6 4-6M12 12v4M10 14h4"/>',
  t_DEADLINE:'<path d="M5 21V4M5 4h12l-2 4 2 4H5"/>',
  t_PREP:'<path d="M9 6h11M9 12h11M9 18h11M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"/>',
  t_CEREMONY:'<path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z"/>',
  t_MILESTONE:'<path d="M3 11v2h3l7 5V6L6 11zM17 9a4 4 0 0 1 0 6"/>',
  t_WATCH:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  t_ONGOING:'<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4"/>',
  s_ok:'<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9.5"/>',
  s_warn:'<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h.01"/>',
  s_bad:'<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
  s_info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>',
  lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  doc:'<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h5"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  download:'<path d="M12 4v11M7 11l5 5 5-5M4 20h16"/>',
  copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
  link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  people:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17.5" cy="9" r="2.5"/><path d="M16 14.2A5 5 0 0 1 22 19"/>'
});
const rIco = code => ICON["r_"+code] ? ico("r_"+code,"ico rico") : ico("routes","ico rico");
const tIco = t => ico("t_"+t,"ico tico");
const sIco = k => ico("s_"+k,"ico sico");

/* ---------- Tiny ZIP writer (stored, CRC32) for calendar packs ---------- */
const CRC = (()=>{ const t=new Uint32Array(256); for(let n=0;n<256;n++){ let c=n; for(let k=0;k<8;k++) c = c&1 ? 0xEDB88320^(c>>>1) : c>>>1; t[n]=c>>>0; } return b=>{ let c=0xFFFFFFFF; for(let i=0;i<b.length;i++) c=t[(c^b[i])&255]^(c>>>8); return (c^0xFFFFFFFF)>>>0; }; })();
function makeZip(files){ const enc=new TextEncoder(), parts=[], cen=[]; let off=0;
  const u16=n=>[n&255,(n>>8)&255], u32=n=>[n&255,(n>>8)&255,(n>>16)&255,(n>>>24)&255];
  files.forEach(f=>{ const name=enc.encode(f.name), data=enc.encode(f.data), crc=CRC(data);
    const head=new Uint8Array([...u32(0x04034b50),...u16(20),...u16(0x0800),...u16(0),...u16(0),...u16(0x21),...u32(crc),...u32(data.length),...u32(data.length),...u16(name.length),...u16(0)]);
    parts.push(head,name,data);
    cen.push(new Uint8Array([...u32(0x02014b50),...u16(20),...u16(20),...u16(0x0800),...u16(0),...u16(0),...u16(0x21),...u32(crc),...u32(data.length),...u32(data.length),...u16(name.length),...u16(0),...u16(0),...u16(0),...u16(0),...u32(0),...u32(off)]),name);
    off+=head.length+name.length+data.length; });
  const cenLen=cen.reduce((a,b)=>a+b.length,0);
  const end=new Uint8Array([...u32(0x06054b50),...u16(0),...u16(0),...u16(files.length),...u16(files.length),...u32(cenLen),...u32(off),...u16(0)]);
  return new Blob([...parts,...cen,end],{type:"application/zip"}); }

/* ---------- Platform capabilities: AI (sample) and downloads ---------- */
let AI = null, AI_STATE = "checking", DL = null;
const capUse = name => (window.claude && typeof window.claude.use==="function") ? window.claude.use(name).catch(()=>null) : Promise.resolve(null);
capUse("sample").then(s=>{ AI=s; AI_STATE = s ? "ready" : "off"; $$(".aistate").forEach(paintAIState); });
capUse("downloads").then(d=>{ DL=d; });
function paintAIState(el){ el.textContent = AI_STATE==="ready" ? "AI ready: uses your Claude account when you click. Follow your department's AI policy and leave out personal details that aren't needed." : AI_STATE==="checking" ? "Checking AI availability…" : "AI not available in this view: template versions are used"; el.dataset.state = AI_STATE; }
const AI_POLICY = [
  ["P1","Never infer or state anyone's ethnicity, religion, disability, sexual orientation, gender identity or other protected characteristic. If a draft contains an identity statement, flag it for the nominee to confirm they self-described it."],
  ["P2","Use only facts the user supplied or that appear in this Hub. Do not invent metrics, dates, quotes or outcomes. Mark gaps as [needs evidence]."],
  ["P3","Do not rank or compare people."],
  ["P4","Facts marked C (compendium only) are unverified: say so whenever you use one."],
  ["P5","Point the reader to the organiser's official site for current rules and dates."],
  ["P6","For UK Honours: the nomination is confidential and the nominee must not be told."],
  ["P7","Write in plain UK English, active voice, short sentences."],
  ["P8","Proposals are suggestions. A person accepts or rejects every change; nothing is submitted by the assistant."]
];
const POLICY_TEXT = "Rules you must follow:\n"+AI_POLICY.map(p=>p[0]+". "+p[1]).join("\n");
const AI_COPY = {not_granted:"AI was not allowed for this page. Templates still work.", sampling_disabled:"AI is not available for this account. Templates still work.", rate_limited:"Too many AI requests just now. Try again in a minute.", refused:"The request was declined. Rephrase it and try again.", prompt_too_large:"That was too much text at once. Shorten the inputs.", invalid_json:"The AI reply could not be read. Try again.", session_expired:"Sign in to Claude again, then retry.", empty_completion:"No answer came back. Try a simpler request.", upstream_error:"The AI service was interrupted. Try again."};
function aiFail(e){ const c=(e&&e.code)||"upstream_error"; if(["not_granted","sampling_disabled","not_declared","capability_disabled","capability_removed"].includes(c)){ AI_STATE="off"; $$(".aistate").forEach(paintAIState); } return c==="cancelled" ? "" : (AI_COPY[c]||AI_COPY.upstream_error); }
const aiBtn = (id,label,cls="") => `<button type="button" class="btn ai ${cls}" id="${id}">${ico("sparkle","ico")}<span>${esc(label)}</span></button>`;

/* Safe mini-markdown for AI answers: escape first, then bold, internal links, bullets */
function md(t){ let h=esc(t);
  h=h.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\[([^\]]+)\]\((#[a-z]+(?:-[a-z]+)?)\)/g,'<a href="$2">$1</a>').replace(/\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>');
  return h.split(/\n{2,}/).map(b=>/^\s*[-•] /m.test(b)?"<ul class=\"tick\">"+b.split("\n").filter(l=>l.trim()).map(l=>"<li>"+l.replace(/^\s*[-•]\s*/,"")+"</li>").join("")+"</ul>":"<p>"+b.replace(/\n/g,"<br>")+"</p>").join(""); }

/* ---------- Portal assistant (agentic: page tools) ---------- */
let ASK = {turns:[], ctl:null};
function portalSearch(q, n=8){ return rankSearch(q, n).map(r=>({title:r.title, kind:r.kind, page:"#"+r.hash, excerpt:r.text.slice(0,240)})); }
/* Every tool the assistant can call. None reads the shared store (ideas, votes, opt-in profiles), so text other people write cannot steer it (tested in func10). */
const ALL_ASK_TOOLS = () => ASK_TOOLS().concat(ASK_TOOLS_V5(),ASK_TOOLS_V5B(),ASK_TOOLS_V5D(),ASK_TOOLS_V6(),ASK_TOOLS_V6B(),ASK_TOOLS_V8(),ASK_TOOLS_V8C());
const ASK_TOOLS = () => [
  {name:"search_portal", description:"Search everything in this Hub (routes, calendar, glossary, safeguards, requirements, defects, workflows). Returns up to 8 matches with title, kind, page link and excerpt.", inputSchema:{type:"object",properties:{query:{type:"string"}},required:["query"]}, execute:i=>portalSearch(i.query)},
  {name:"upcoming_deadlines", description:"Organiser deadlines from today onward, with route, date and days left.", execute:()=>allOcc().filter(o=>o.e.type==="DEADLINE"&&o.date>=TODAY).map(o=>({route:ROUTE[o.e.route]||o.e.route, date:o.date, days_left:dayDiff(TODAY,o.date), note:o.e.desc.slice(0,160)}))},
  {name:"route_details", description:"Full details for one recognition route by code (CSA, BDA, EA, NDA, HONOURS, INTERNAL, AIG, CSAI, DUK, DATAC, IESE, LGC, MJ, SPSA, HSJ): who it is for, facts with provenance (V verified, P pack, C unverified), eligibility caveats and official URL.", inputSchema:{type:"object",properties:{code:{type:"string"}},required:["code"]}, execute:i=>{ const c=String(i.code||"").toUpperCase(); const g=C.glance.find(g=>g.code===c); const r=C.routes.filter(r=>r[8]===c); if(!g&&!r.length) throw new Error("Unknown route code"); return {name:g&&g.name, who:g&&g.who, facts:g&&g.facts.map(f=>f[0]+": "+f[1]+" ["+f[2]+"]"), url:g&&g.url, register:r.map(r=>({id:r[0],route:r[1],evidence:r[4],timing:r[5],caveat:r[6]}))}; }},
  {name:"my_nominations", description:"The viewer's in-progress nominations in this browser: route, step reached and missing items. No nominee details are returned.", execute:()=>wfCases("nominate").map(c=>({title:c.title, route:c.data.route||"", step:WF.nominate.steps[c.step]&&WF.nominate.steps[c.step].title, unmet:wfUnmet(WF.nominate,c).slice(0,5)}))}
];
function askPanelHTML(){ return `<aside class="askp" id="askPanel" hidden aria-label="Hub assistant"><div class="askh"><div class="row" style="gap:8px">${ico("sparkle","ico")}<strong>Ask the Hub</strong></div><button class="iconbtn2" id="askClose" aria-label="Close assistant">✕</button></div>
  <p class="small aistate" data-state="checking"></p>
  <div class="asklog" id="askLog" aria-live="polite"><div class="askmsg bot"><p>Ask about routes, deadlines, eligibility, safeguards or your nominations. I search the Hub and link to what I find. I never infer anyone's identity.</p><div class="chips">${["What closes next and what should I do now?","Which routes suit a staff network?","How do I nominate someone for an honour?","What must I check before submitting?"].map(q=>`<button class="chip askq" type="button">${esc(q)}</button>`).join("")}</div></div></div>
  <form id="askForm" class="askf"><label for="askIn" class="sr">Your question</label><textarea id="askIn" rows="2" placeholder="Ask a question"></textarea><div class="row"><button class="btn ai" type="submit">${ico("sparkle","ico")}<span>Ask</span></button><button class="btn ghost" type="button" id="askStop" hidden>Stop</button><button class="btn ghost" type="button" id="askReset">New chat</button></div></form></aside>
  <button class="askfab" id="askFab" type="button" aria-controls="askPanel" aria-expanded="false">${ico("sparkle","ico")}<span>Ask</span></button>`; }
function openAsk(q){ const p=$("#askPanel"); p.hidden=false; $("#askFab").setAttribute("aria-expanded","true"); paintAIState($(".aistate",p)); if(q){ $("#askIn").value=q; sendAsk(); } else $("#askIn").focus(); }
function addMsg(cls, html){ const d=document.createElement("div"); d.className="askmsg "+cls; d.innerHTML=html; $("#askLog").appendChild(d); $("#askLog").scrollTop=1e9; return d; }
async function sendAsk(){
  const q=$("#askIn").value.trim(); if(!q) return; $("#askIn").value=""; addMsg("me", `<p>${esc(q)}</p>`);
  const bot=addMsg("bot", `<p class="muted">Thinking…</p>`);
  if(!AI){ const hits=portalSearch(q,6); bot.innerHTML = `<p>AI isn't available in this view, so here are the closest matches in the Hub:</p><ul class="tick">${hits.map(h=>`<li><a href="${h.page}">${esc(h.title)}</a> <span class="muted small">${esc(h.kind)}</span></li>`).join("")||"<li>No matches. Try other words.</li>"}</ul>`; return; }
  ASK.turns.push({role:"user",content:q}); ASK.ctl=new AbortController(); $("#askStop").hidden=false;
  const steps=[]; const tools=ALL_ASK_TOOLS().map(t=>Object.assign({},t,{execute:(i,c)=>{ steps.push(t.name.replace(/_/g," ")); bot.innerHTML=`<p class="muted">Working: ${esc(steps.join(" → "))}…</p>`; return t.execute(i,c); }}));
  const lead={role:"user",content:`You are the assistant inside the Awards and Recognition Hub (release ${D.meta.version}, sources verified ${D.meta.source_verified}, today is ${TODAY}). Answer using the tools; do not rely on memory for dates or rules. Link to Hub pages as markdown links using the page value from tool results, e.g. [Route finder](#routes-finder). Keep answers under 180 words; use short bullets for steps. Use list_workflows to recommend a workflow and start_workflow when the person asks you to start one (never prefill names). Use operating_rhythm for "what is due" questions and recognition_methods for ways to recognise (including pay and reward: financial rewards go through departmental schemes, never the recognition portfolio). Use proportionality_guide for how big a recognition or reward should be (#recognition-proportion). Role pages: #recognition-peers, #recognition-managers, #recognition-leaders, #recognition-hr; employee links: #recognition-career. Useful pages: #workflows-mywork, #workflows-rhythm, #workflows-nominate (guided nomination), #routes-finder, #calendar-planner, #safeguards-gates, #routes-glance.\n${POLICY_TEXT}`};
  try{ const {text,truncated}=await AI([lead,...ASK.turns.slice(-8)],{signal:ASK.ctl.signal, tools, cache:false, onText:({text})=>{ bot.innerHTML=md(text); $("#askLog").scrollTop=1e9; }});
    bot.innerHTML=md(text)+(steps.length?`<p class="small muted">${ico("search","ico")} Used: ${esc([...new Set(steps)].join(", "))}</p>`:"")+(truncated?'<p class="small muted">Answer cut short; ask for less.</p>':""); ASK.turns.push({role:"assistant",content:text});
  }catch(e){ const m=aiFail(e); bot.innerHTML=(e&&e.text?md(e.text):"")+(m?`<p class="small" style="color:var(--warn)">${esc(m)}</p>`:""); ASK.turns.pop(); }
  finally{ $("#askStop").hidden=true; }
}
ICON.search='<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>';

/* ---------- Declarative workflow engine ---------- */
const ROUTE_OPTS = () => C.routes.map(r=>[r[0], r[0]+" · "+r[1]]);
const routeByRid = rid => C.routes.find(r=>r[0]===rid);
const routeCode = rid => (routeByRid(rid)||[])[8]||"";
const wordLimit = d => d.limit ? +d.limit : (routeCode(d.route)==="CSA" ? 600 : 0);
const words = t => (String(t||"").trim().match(/\S+/g)||[]).length;
const starWords = d => ["o","s","t","a","r"].reduce((n,k)=>n+words(d[k]),0);
const IDENTITY_RX = /\b(ethnic\w*|race|racial|religio\w*|faith|muslim|christian|hindu|sikh|jewish|disab\w*|neurodiverg\w*|autis\w*|sexual orientation|gay|lesbian|bisexual|transgender|trans|non-binary|bame|black|asian|white|minority|heritage)\b/i;
const SUPERLATIVE_RX = /\b(best|greatest|unparalleled|world-class|unique|outstanding|exceptional)\b/gi;
const PROTECT = {
  rules:{
    required:(r,d)=>String(d[r.k]||"").trim()!=="",
    checked:(r,d)=>!!d[r.k],
    minRows:(r,d)=>(d[r.k]||[]).filter(x=>String(x[r.where]||"").trim()).length>=r.n,
    maxWords:(r,d)=>{ const L=wordLimit(d); return !L || starWords(d)<=L; },
    allStar:(r,d)=>["s","t","a","r"].every(k=>words(d[k])>0),
    deadlineOpen:(r,d)=>{ const dl=nextDeadlineFor(routeCode(d.route)); return !dl || dl>=TODAY; },
    when:(r,d)=>true
  }
};
const WF = {};
WF.nominate = {id:"nominate", icon:"nominate", name:"Draft and submit a nomination", who:"Anyone nominating a colleague, team, network or volunteer group", time:"30–60 minutes over a few sittings",
  outputs:["Nomination pack (.md)","Approval request message","Reminder calendar (.zip of .ics)","Status tracker"],
  steps:[
    {id:"route", title:"Choose the route", icon:"routes", intro:"Pick where the nomination goes. Not sure? Use the route finder, then come back.",
     fields:[{k:"route",type:"select",label:"Recognition route",options:ROUTE_OPTS,required:true},{k:"category",type:"text",label:"Category name",hint:"As written on the organiser's site, for example Collaboration."},{k:"kind",type:"select",label:"Who is being nominated",options:()=>[["ind","An individual"],["team","A team or partnership"],["net","A staff network"],["vol","A volunteer or community group"]],required:true},{k:"ref",type:"text",label:"Your reference for this nomination",hint:"Stays in this browser. On a shared device use a reference, not a name.",required:true},{k:"limit",type:"text",label:"Word limit (if not 600 for Civil Service Awards)",hint:"Leave blank to use the known limit.",inputmode:"numeric"}],
     gate:[{rule:"required",k:"route",msg:"Choose a route"},{rule:"required",k:"kind",msg:"Say who is being nominated"},{rule:"required",k:"ref",msg:"Add a reference"},{rule:"deadlineOpen",msg:"This route's deadline has passed"}], side:"routeInfo"},
    {id:"gate", title:"Consent and eligibility", icon:"lock", intro:"These gates protect the nominee. Every box must be true before you write anything.",
     fields:[{k:"c_consent",type:"check",label:d=>routeCode(d.route)==="HONOURS"?"I understand UK Honours nominations are confidential and I will not tell the nominee.":"The nominee (or the group's lead) is content to be nominated."},{k:"c_identity",type:"check",label:"I will not assign an identity-dependent category on anyone's behalf. Any such category is self-confirmed by the nominee, or not used."},{k:"c_approval",type:"check",label:"I know who approves nominations in my department, or will ask before submitting."},{k:"c_rules",type:"check",label:"I have opened the organiser's current criteria and evidence window."},{k:"c_credit",type:"check",label:"I will credit co-contributors who consent to be named."}],
     gate:[{rule:"checked",k:"c_consent",msg:"Confirm consent or confidentiality"},{rule:"checked",k:"c_identity",msg:"Confirm the identity rule"},{rule:"checked",k:"c_approval",msg:"Confirm the approval route"},{rule:"checked",k:"c_rules",msg:"Confirm you have read the criteria"},{rule:"checked",k:"c_credit",msg:"Confirm contributor credit"}], side:"gateInfo"},
    {id:"evidence", title:"Gather evidence", icon:"doc", intro:"List each claim you will make and where it can be checked. Two sourced claims is the minimum; more is better.",
     fields:[{k:"ev",type:"rows",label:"Evidence",cols:[["claim","Claim or outcome"],["source","Source (document, page, person's role)"],["when","When"]],min:3}],
     gate:[{rule:"minRows",k:"ev",where:"source",n:2,msg:"Add at least two claims with a source"}]},
    {id:"draft", title:"Draft the nomination", icon:"nominate", intro:"Write in STAR form. Use the AI to draft from your evidence, then make it yours.",
     fields:[{k:"o",type:"area",label:"Overview",hint:"Who is nominated and for what, in two sentences."},{k:"s",type:"area",label:"Situation"},{k:"t",type:"area",label:"Task"},{k:"a",type:"area",label:"Action"},{k:"r",type:"area",label:"Result",hint:"Measurable outcomes and who benefited."}],
     gate:[{rule:"allStar",msg:"Fill in Situation, Task, Action and Result"},{rule:"maxWords",msg:"Bring the draft within the word limit"}], ai:"draft"},
    {id:"review", title:"Review", icon:"verify", intro:"Automatic checks run on every change. Ask the AI reviewer for a criteria check; you decide which suggestions to accept.",
     fields:[{k:"c_peer",type:"check",label:"A colleague has read the draft."},{k:"c_facts",type:"check",label:"Metrics and dates are confirmed with the source owner."}],
     gate:[{rule:"maxWords",msg:"Within word limit"},{rule:"checked",k:"c_peer",msg:"Peer review done"},{rule:"checked",k:"c_facts",msg:"Facts confirmed"}], ai:"review", side:"reviewChecks"},
    {id:"submit", title:"Prepare and submit", icon:"download", intro:"Download your pack, get approval, then submit on the organiser's form. The Hub never submits for you.",
     fields:[{k:"approver",type:"text",label:"Approver's role",hint:"For example: line manager, departmental awards lead."}], out:"submitPack"},
    {id:"track", title:"Track", icon:"clock", intro:"Record what happened so the evidence can be reused, whatever the outcome.",
     fields:[{k:"status",type:"select",label:"Status",options:()=>[["Drafting","Drafting"],["Awaiting approval","Awaiting approval"],["Submitted","Submitted"],["Shortlisted","Shortlisted"],["Recognised","Recognised"],["Not shortlisted","Not shortlisted"]]},{k:"submitted",type:"date",label:"Date submitted"},{k:"outcome",type:"area",label:"Outcome and what to reuse next time"}], gate:[]}
  ]};
WF.thanks = {id:"thanks", icon:"thanks", name:"Thank or commend someone", who:"Anyone. Recognition levels L1 to L2", time:"5 minutes",
  outputs:["Thank-you or commendation message"],
  steps:[
    {id:"what", title:"What happened", icon:"thanks", intro:"Specific thanks lands best. Say what they did and what it changed.", fields:[{k:"level",type:"select",label:"Recognition level",options:()=>[["L1","L1 Private thanks"],["L2","L2 Manager, peer or senior commendation"]],required:true},{k:"to",type:"text",label:"Who it is for (as you would address them)",required:true},{k:"did",type:"area",label:"What they did",required:true},{k:"impact",type:"area",label:"What difference it made"},{k:"tone",type:"select",label:"Tone",options:()=>[["warm","Warm"],["formal","Formal"],["brief","Brief"]]}],
     gate:[{rule:"required",k:"to",msg:"Say who it is for"},{rule:"required",k:"did",msg:"Say what they did"}]},
    {id:"msg", title:"Message", icon:"mail", intro:"Edit freely. Ask before sharing beyond the person.", fields:[{k:"msg",type:"area",label:"Message",rows:8}], ai:"thanks", out:"thanksOut"}
  ]};
WF.credits = {id:"credits", icon:"credits", name:"Credit everyone who delivered", who:"Event, programme and project organisers. Recognition level L3", time:"10 minutes",
  outputs:["Contributor credits block"],
  steps:[
    {id:"what", title:"The work", icon:"credits", intro:"Name the event or programme and when it ran.", fields:[{k:"event",type:"text",label:"Event, programme or project",required:true},{k:"when",type:"text",label:"When"}], gate:[{rule:"required",k:"event",msg:"Name the event"}]},
    {id:"who", title:"Who did what", icon:"people", intro:"Include behind-the-scenes roles: organiser, facilitator, designer, administrator, accessibility, communications, volunteer, sponsor.", fields:[{k:"rows",type:"rows",label:"Contributors",cols:[["role","Role"],["name","Name or team (as they wish to be credited)"],["named","Named credit? (yes/no)"]],min:4}], gate:[{rule:"minRows",k:"rows",where:"role",n:1,msg:"Add at least one role"}], out:"creditsOut"}
  ]};
WF.handover = {id:"handover", icon:"handover", name:"Hand over a record through MoG", who:"Continuity owners. Meets requirement FR-08", time:"10 minutes per record",
  outputs:["Handover package (.json and .md)"],
  steps:[
    {id:"rec", title:"The record", icon:"register", intro:"Minimum necessary data only. No identity declarations go in a handover package.", fields:[{k:"rid",type:"text",label:"Record ID",required:true},{k:"summary",type:"area",label:"Contribution summary",required:true},{k:"sources",type:"text",label:"Source IDs",hint:"For example S01; S04"},{k:"evidence",type:"select",label:"Evidence status",options:()=>[["Corroborated","Corroborated"],["Verified single source","Verified single source"],["Reported","Reported"]]}], gate:[{rule:"required",k:"rid",msg:"Record ID"},{rule:"required",k:"summary",msg:"Summary"}]},
    {id:"own", title:"Ownership and destination", icon:"handover", intro:"Keep unresolved destinations visible rather than guessing.", fields:[{k:"consent",type:"select",label:"Consent state",options:()=>[["Recorded","Consent recorded"],["Not yet asked","Not yet asked"],["Declined","Declined"]]},{k:"pref",type:"select",label:"Recognition preference",options:()=>[["Private","Private"],["Internal","Internal"],["Public","Public"],["Unknown","Unknown"]]},{k:"from",type:"text",label:"Legacy owner role"},{k:"to",type:"text",label:"Successor owner role",required:true},{k:"dest",type:"text",label:"Destination organisation or network",hint:"Write Unresolved if not known."},{k:"review",type:"date",label:"Review date",required:true}], gate:[{rule:"required",k:"to",msg:"Successor owner role"},{rule:"required",k:"review",msg:"Review date"}], out:"handoverOut"}
  ]};
WF.change = {id:"change", icon:"change", name:"Raise a calendar change", who:"Calendar owner and anyone who spots a changed date", time:"5 minutes",
  outputs:["Change record line","Human approval request"],
  steps:[
    {id:"obs", title:"What changed", icon:"change", intro:"Status: Observed. Never change an organiser fact from one unofficial source.", fields:[{k:"uid",type:"select",label:"Affected event",options:()=>D.events.map(e=>[e.uid,fmt(e.start)+" · "+e.summary.replace(/^(\[[A-Z-]+\])+\s*/,"")]).concat([["new","A new event"]]),required:true},{k:"field",type:"select",label:"Field",options:()=>[["date","Date"],["time","Time"],["title","Title or description"],["eligibility","Eligibility or evidence rule"],["cancel","Cancelled"]]},{k:"newv",type:"text",label:"New value",required:true},{k:"src",type:"text",label:"Authoritative source URL",required:true,hint:"Must be the organiser's own page."}], gate:[{rule:"required",k:"uid",msg:"Pick the event"},{rule:"required",k:"newv",msg:"New value"},{rule:"required",k:"src",msg:"Source URL"}]},
    {id:"assess", title:"Classify and assess", icon:"verify", intro:"The class is suggested from what changed. Check every dependent reminder.", fields:[{k:"earlier",type:"check",label:"The deadline moves earlier or is shortened"},{k:"c_uid",type:"check",label:"I will keep the existing UID"},{k:"c_prep",type:"check",label:"I have listed dependent preparation reminders to recalculate"}], gate:[{rule:"checked",k:"c_uid",msg:"Keep the UID"}], out:"changeOut"}
  ]};
WF.reverify = {id:"reverify", icon:"verify", name:"Re-verify a source", who:"Calendar owner on the weekly cadence", time:"5 minutes per source",
  outputs:["Registry update note","Change request when something moved"],
  steps:[
    {id:"pick", title:"Open the source", icon:"link", intro:"Read the organiser's own page, not a summary of it.", fields:[{k:"reg",type:"select",label:"Route",options:()=>D.registry.map(r=>[r[0],(ROUTE[r[0]]||r[0])+(r[4]?" · last verified "+fmt(r[4]):" · never verified")]),required:true}], gate:[{rule:"required",k:"reg",msg:"Pick a route"}], side:"regInfo"},
    {id:"result", title:"Record the result", icon:"verify", intro:"If anything differs, raise a change request.", fields:[{k:"checked",type:"date",label:"Date checked",required:true},{k:"same",type:"select",label:"Does everything match the Hub?",options:()=>[["yes","Yes, unchanged"],["no","No, something changed"]],required:true},{k:"diff",type:"area",label:"What changed (if anything)"}], gate:[{rule:"required",k:"checked",msg:"Date checked"},{rule:"required",k:"same",msg:"Say whether it matches"}], out:"reverifyOut"}
  ]};
const WF_ORDER = ["nominate","thanks","credits","handover","change","reverify"];

function wfCases(id){ return store.get("wfc:"+id, []); }
function wfSave(id, list){ store.set("wfc:"+id, list); }
function wfUnmet(spec, c, upto){ const out=[]; spec.steps.slice(0, upto==null?spec.steps.length:upto+1).forEach(s=>(s.gate||[]).forEach(g=>{ if(!PROTECT.rules[g.rule](g,c.data)) out.push(s.title+": "+g.msg); })); return out; }
function stepUnmet(step, d){ return (step.gate||[]).filter(g=>!PROTECT.rules[g.rule](g,d)).map(g=>g.msg); }
function curCase(id){ const list=wfCases(id), cid=store.get("wfcur:"+id,null); return list.find(c=>c.id===cid)||null; }
function newCase(id){ const list=wfCases(id); const c={id:"c"+Date.now().toString(36), title:"", created:TODAY, updated:TODAY, step:0, data:{}}; list.unshift(c); wfSave(id,list); store.set("wfcur:"+id,c.id); return c; }
function putCase(id, c){ const list=wfCases(id).map(x=>x.id===c.id?c:x); c.updated=TODAY; wfSave(id,list); }

function fieldHTML(f, d, wid){ const id=`wf-${wid}-${f.k}`, lab=typeof f.label==="function"?f.label(d):f.label, v=d[f.k];
  const hint=f.hint?`<span class="muted small">${esc(f.hint)}</span>`:"";
  if(f.type==="check") return `<label class="row wcheck" for="${id}"><input type="checkbox" id="${id}" data-k="${f.k}" ${v?"checked":""}><span>${esc(lab)}</span></label>`;
  if(f.type==="select"){ const opts=f.options(); return `<label class="wf-f" for="${id}"><strong>${esc(lab)}${f.required?' <span class="req" aria-hidden="true">*</span>':""}</strong>${hint}<select id="${id}" data-k="${f.k}"><option value="">Choose…</option>${opts.map(([val,l])=>`<option value="${esc(val)}"${v===val?" selected":""}>${esc(l)}</option>`).join("")}</select></label>`; }
  if(f.type==="area") return `<label class="wf-f" for="${id}"><strong>${esc(lab)}${f.required?' <span class="req" aria-hidden="true">*</span>':""}</strong>${hint}<textarea id="${id}" data-k="${f.k}" rows="${f.rows||4}" class="prose">${esc(v||"")}</textarea><span class="wc small muted" data-wc="${f.k}"></span></label>`;
  if(f.type==="rows"){ const rows=(v&&v.length?v:Array.from({length:f.min||3},()=>({}))); return `<fieldset class="wf-rows"><legend><strong>${esc(lab)}</strong></legend><div class="tblwrap"><table><thead><tr>${f.cols.map(c=>`<th>${esc(c[1])}</th>`).join("")}<th><span class="sr">Remove</span></th></tr></thead><tbody>${rows.map((r,i)=>`<tr>${f.cols.map(c=>`<td><input type="text" aria-label="${esc(c[1])} ${i+1}" data-rk="${f.k}" data-ri="${i}" data-rc="${c[0]}" value="${esc(r[c[0]]||"")}"></td>`).join("")}<td><button type="button" class="iconbtn2" data-rdel="${f.k}" data-ri="${i}" aria-label="Remove row ${i+1}">✕</button></td></tr>`).join("")}</tbody></table></div><button type="button" class="btn ghost" data-radd="${f.k}">+ Add row</button></fieldset>`; }
  return `<label class="wf-f" for="${id}"><strong>${esc(lab)}${f.required?' <span class="req" aria-hidden="true">*</span>':""}</strong>${hint}<input type="${f.type==="date"?"date":"text"}" id="${id}" data-k="${f.k}" value="${esc(v||"")}"${f.inputmode?` inputmode="${f.inputmode}"`:""}></label>`;
}
const SIDE = {
  routeInfo:d=>{ const r=routeByRid(d.route); if(!r) return `<p class="small">Not sure where to send it? <a href="#routes-finder">Use the route finder</a>.</p>`; const code=r[8], g=C.glance.find(x=>x.code===code), dl=nextDeadlineFor(code);
    return `<div class="row" style="gap:8px">${rIco(code)}<strong>${esc(r[1])}</strong></div><p class="small">${esc(r[4])}</p><p class="small muted">${esc(r[6])}</p>${dl?`<p>${pill("Closes "+fmtLong(dl)+" · "+dayDiff(TODAY,dl)+" days", dayDiff(TODAY,dl)<=7?"warn":"ok")}</p>`:`<p class="small">${esc(r[5])}</p>`}${r[7]?`<p class="small">${link(r[7],"Official criteria")}</p>`:""}${g?`<p class="small"><a href="#routes-glance">At a glance</a></p>`:""}`; },
  gateInfo:d=>`<p class="small"><strong>Why these gates?</strong> They come from the portfolio's safeguards: consent first, identity is self-confirmed and never inferred, and recognition stays fair and evidenced.</p><p class="small"><a href="#safeguards-gates">Read the decision gates</a></p>`,
  regInfo:d=>{ const r=D.registry.find(x=>x[0]===d.reg); return r?`<p><strong>${esc(r[1])}</strong></p><p class="small">Expected fields: ${esc(r[3])}</p>${r[2]?`<p>${link(r[2],"Open the source")}</p>`:'<p class="small" style="color:var(--warn)">No authoritative URL held. Find the organiser\'s own page first.</p>'}`:'<p class="small muted">Pick a route to see its source.</p>'; },
  reviewChecks:d=>reviewList(d)
};
function reviewList(d){ const L=wordLimit(d), n=starWords(d), all=["o","s","t","a","r"].map(k=>d[k]||"").join("\n"); const ev=(d.ev||[]).filter(x=>x.claim||x.source);
  const items=[
    [!L||n<=L, L?`${n} of ${L} words`:`${n} words (no limit recorded: check the organiser's)`],
    [ev.length>=2 && ev.every(x=>String(x.source||"").trim()), `${ev.filter(x=>String(x.source||"").trim()).length} of ${ev.length} claims have a source`],
    [["s","t","a","r"].every(k=>words(d[k])>0), "Situation, Task, Action and Result all written"],
    [/\d/.test(d.r||""), "Result includes a number or measurable outcome", "warn"],
    [!IDENTITY_RX.test(all), IDENTITY_RX.test(all)?`Identity term found ("${(all.match(IDENTITY_RX)||[""])[0]}"): confirm the nominee self-described it and agreed to its use`:"No identity statements", "warn"],
    [(all.match(SUPERLATIVE_RX)||[]).length<=2, `${(all.match(SUPERLATIVE_RX)||[]).length} superlative(s): back each with evidence`, "warn"],
    [PROTECT.rules.deadlineOpen({},d), (()=>{ const dl=nextDeadlineFor(routeCode(d.route)); return dl?"Deadline "+fmtLong(dl)+" ("+dayDiff(TODAY,dl)+" days)":"No calendar deadline for this route"; })()],
    [["c_consent","c_identity","c_approval","c_rules","c_credit"].every(k=>d[k]), "Consent and eligibility gates passed"]
  ];
  return `<ul class="plain rchk">${items.map(([ok,t,sev])=>`<li class="row" style="gap:8px;align-items:flex-start">${sIco(ok?"ok":sev==="warn"?"warn":"bad")}<span class="small">${esc(t)}</span></li>`).join("")}</ul>`; }

/* Outputs */
function nominationPack(d){ const r=routeByRid(d.route)||[], code=r[8], dl=nextDeadlineFor(code), ev=(d.ev||[]).filter(x=>x.claim||x.source);
  return `# Nomination pack: ${d.ref||"untitled"}\n\nRoute: ${r[1]||"—"}${d.category?" · Category: "+d.category:""}\nOrganiser: ${r[7]||"see departmental scheme"}\nDeadline: ${dl?fmtLong(dl)+(code==="CSA"?", 5pm":code==="AIG"?", 23:55":""):r[5]||"—"}\nPrepared: ${fmtLong(TODAY)} using the Awards and Recognition Hub ${D.meta.version}\n${code==="HONOURS"?"\nCONFIDENTIAL: do not tell the nominee.\n":""}\n## Nomination (${starWords(d)} words${wordLimit(d)?" of "+wordLimit(d):""})\n\n**Overview.** ${d.o||""}\n\n**Situation.** ${d.s||""}\n\n**Task.** ${d.t||""}\n\n**Action.** ${d.a||""}\n\n**Result.** ${d.r||""}\n\n## Evidence\n\n| Claim | Source | When |\n|---|---|---|\n${ev.map(x=>`| ${(x.claim||"").replace(/\|/g,"/")} | ${(x.source||"").replace(/\|/g,"/")} | ${(x.when||"").replace(/\|/g,"/")} |`).join("\n")}\n\n## Assurance\n\n- Consent or confidentiality confirmed: ${d.c_consent?"yes":"no"}\n- Identity-dependent categories self-confirmed or not used: ${d.c_identity?"yes":"no"}\n- Approval route: ${d.approver||"to confirm"}\n- Peer review: ${d.c_peer?"done":"not yet"} · Facts confirmed with source owner: ${d.c_facts?"yes":"not yet"}\n\nSubmit on the organiser's own form. Check the current criteria before submitting.\n`; }
function approvalMsg(d){ const r=routeByRid(d.route)||[], dl=nextDeadlineFor(r[8]); return `Subject: Approval request: nomination for ${r[1]||"recognition"}${d.category?" ("+d.category+")":""}\n\nHello,\n\nI would like to submit a nomination to ${r[1]||"this scheme"}${d.category?" in the "+d.category+" category":""}. ${dl?"Nominations close on "+fmtLong(dl)+". ":""}The draft and its evidence are attached. ${r[8]==="HONOURS"?"This is an honours nomination, so please keep it confidential.":"The nominee is content to be nominated."}\n\nCould you confirm approval, or tell me who in the department should approve it?\n\nThank you.`; }
function remindersZip(d){ const r=routeByRid(d.route)||[], code=r[8]||"ROUTE", dl=nextDeadlineFor(code); if(!dl) return null;
  const evs=PLAN_STEPS.map(([n,t,desc])=>({uid:`nom-${(d.ref||"x").toLowerCase().replace(/[^a-z0-9]+/g,"-").slice(0,24)}-${code.toLowerCase()}-t${-n}@recognition-portfolio.gov.uk`, summary:`[${n===0?"DEADLINE":"PREP"}][${code}] ${t}${n===0?"":" ("+(d.ref||"nomination")+")"}`, start:addDays(dl,n), end:addDays(dl,n+1), desc:desc+" Personal reminder from the nomination workflow.", categories:["Recognition",n===0?"Deadline":"Preparation"], status:"CONFIRMED", url:r[7]||"", color:"", rrule:"", alarms:["-P1D"]})).filter(e=>e.start>=TODAY);
  return {name:`Nomination-reminders-${code}.zip`, ics:buildICS(evs,"Nomination: "+(d.ref||code)), n:evs.length}; }
const OUT = {
  submitPack:(d,wid)=>{ const z=remindersZip(d); const r=routeByRid(d.route)||[];
    return `<div class="grid g2"><div class="card stack outcard"><div class="row" style="gap:8px">${ico("doc","ico")}<h3 class="h4">Nomination pack</h3></div><p class="small">Draft, evidence and assurance record in Markdown.</p><div class="row"><button class="btn" type="button" data-out="pack">${ico("download","ico")}<span>Download .md</span></button><button class="btn ghost" type="button" data-copy="pack">${ico("copy","ico")}<span>Copy</span></button></div></div>
    <div class="card stack outcard"><div class="row" style="gap:8px">${ico("mail","ico")}<h3 class="h4">Approval request</h3></div><p class="small">A message to send to your approver. No addresses are stored.</p><div class="row"><button class="btn ghost" type="button" data-copy="approval">${ico("copy","ico")}<span>Copy message</span></button></div></div>
    <div class="card stack outcard"><div class="row" style="gap:8px">${tIco("PREP")}<h3 class="h4">Reminders</h3></div><p class="small">${z?z.n+" reminder(s) from today to the deadline, as a calendar file inside a .zip.":"No calendar deadline for this route."}</p>${z?`<div class="row"><button class="btn ghost" type="button" data-out="zip">${ico("download","ico")}<span>Download .zip</span></button><button class="btn ghost" type="button" data-copy="ics">${ico("copy","ico")}<span>Copy .ics</span></button></div>`:""}</div>
    <div class="card stack outcard" style="border-color:var(--accent)"><div class="row" style="gap:8px">${ico("link","ico")}<h3 class="h4">Submit</h3></div><p class="small">Once approved, submit on the organiser's form. Then record the date in the next step.</p>${r[7]?link(r[7],"Open the organiser's site"):'<span class="small">Use your department\'s recognition scheme page.</span>'}</div></div>
    <textarea class="sr" id="wfout-${wid}" readonly tabindex="-1" aria-hidden="true"></textarea><p class="copyok" id="wfmsg-${wid}" aria-live="polite"></p>`; },
  thanksOut:(d,wid)=>`<div class="row"><button class="btn ghost" type="button" data-copy="thanks">${ico("copy","ico")}<span>Copy message</span></button><button class="btn ghost" type="button" data-tpl="thanks">Use template</button></div><textarea class="sr" id="wfout-${wid}" readonly tabindex="-1" aria-hidden="true"></textarea><p class="copyok" id="wfmsg-${wid}" aria-live="polite"></p>`,
  creditsOut:(d,wid)=>`<h3 class="h4">Credits block</h3><pre tabindex="0" class="outpre" id="credPre">${esc(creditsText(d))}</pre><div class="row"><button class="btn ghost" type="button" data-copy="credits">${ico("copy","ico")}<span>Copy credits</span></button></div><textarea class="sr" id="wfout-${wid}" readonly tabindex="-1" aria-hidden="true"></textarea><p class="copyok" id="wfmsg-${wid}" aria-live="polite"></p>`,
  handoverOut:(d,wid)=>`<h3 class="h4">Handover package</h3><pre tabindex="0" class="outpre">${esc(JSON.stringify(handoverObj(d),null,2))}</pre><div class="row"><button class="btn" type="button" data-out="handover">${ico("download","ico")}<span>Download .json</span></button><button class="btn ghost" type="button" data-out="handovermd">${ico("download","ico")}<span>Download .md</span></button><button class="btn ghost" type="button" data-copy="handover">${ico("copy","ico")}<span>Copy</span></button></div><textarea class="sr" id="wfout-${wid}" readonly tabindex="-1" aria-hidden="true"></textarea><p class="copyok" id="wfmsg-${wid}" aria-live="polite"></p>`,
  changeOut:(d,wid)=>{ const cls=d.field==="cancel"||d.earlier?"C1 Critical":["date","time","eligibility"].includes(d.field)?"C2 Material":"C3 Routine"; return `<p>Suggested class: ${pill(cls, /C1/.test(cls)?"bad":/C2/.test(cls)?"warn":"info")}</p>${/C1/.test(cls)?'<div class="note bad">C1: review every dependent preparation reminder immediately.</div>':""}<pre tabindex="0" class="outpre">${esc(changeLine(d,cls))}</pre><div class="note"><strong>Human gate.</strong> Send this record to the calendar owner for approval. Nothing changes in the calendar until it is approved and released.</div><div class="row"><button class="btn ghost" type="button" data-copy="change">${ico("copy","ico")}<span>Copy record</span></button></div><textarea class="sr" id="wfout-${wid}" readonly tabindex="-1" aria-hidden="true"></textarea><p class="copyok" id="wfmsg-${wid}" aria-live="polite"></p>`; },
  reverifyOut:(d,wid)=>`<pre tabindex="0" class="outpre">${esc(reverifyNote(d))}</pre><div class="row"><button class="btn ghost" type="button" data-copy="reverify">${ico("copy","ico")}<span>Copy note</span></button>${d.same==="no"?`<button class="btn" type="button" data-startchange="1">${ico("change","ico")}<span>Raise a change request</span></button>`:""}</div><textarea class="sr" id="wfout-${wid}" readonly tabindex="-1" aria-hidden="true"></textarea><p class="copyok" id="wfmsg-${wid}" aria-live="polite"></p>`
};
function creditsText(d){ const rows=(d.rows||[]).filter(r=>r.role); const named=rows.filter(r=>/^y/i.test(r.named||"")&&r.name), anon=rows.filter(r=>!(/^y/i.test(r.named||"")&&r.name));
  return `With thanks to everyone who delivered ${d.event||"this work"}${d.when?" ("+d.when+")":""}:\n\n${named.map(r=>`${r.role}: ${r.name}`).join("\n")}${anon.length?`\n\nAnd thanks to the colleagues in ${[...new Set(anon.map(r=>r.role.toLowerCase()))].join(", ")} roles who preferred not to be named.`:""}`; }
function handoverObj(d){ return {"@type":"rop:HandoverPackage", recordId:d.rid||"", contribution:d.summary||"", sourceIds:(d.sources||"").split(/[;,]\s*/).filter(Boolean), evidenceStatus:d.evidence||"", consentState:d.consent||"", recognitionPreference:d.pref||"", legacyOwnerRole:d.from||"", successorOwnerRole:d.to||"", destination:d.dest||"Unresolved", reviewDate:d.review||"", identityDeclarations:"Not transferred (held separately under access controls)", preparedWith:"Awards and Recognition Hub "+D.meta.version, prepared:TODAY}; }
function changeLine(d,cls){ const e=D.events.find(x=>x.uid===d.uid); return ["CR-NEW", e?e.route:"(new)", d.field||"", e?(d.field==="date"?e.start:e.summary):"(none)", d.newv||"", d.src||"", TODAY, "Observed", cls, (d.earlier?"Deadline earlier: review prep reminders. ":"")+(d.c_prep?"Dependent reminders listed.":""), "Calendar owner (role)", "Approver to confirm", e?e.uid:"(new UID)", e&&e.rrule?"Yes":"No", e&&e.alarms.length?"Yes":"No", "next release", "—"].join(" | "); }
function reverifyNote(d){ const r=D.registry.find(x=>x[0]===d.reg)||[]; return `Source re-verification\nRoute: ${ROUTE[r[0]]||r[0]||"—"}\nSource: ${r[2]||"(none held)"}\nChecked: ${d.checked||"—"}\nResult: ${d.same==="yes"?"Unchanged; registry last-verified date can move to "+(d.checked||"—"):d.same==="no"?"Changed: "+(d.diff||"(describe)"):"—"}\nNext due: ${d.checked&&r[5]?addDays(d.checked,r[5]):"—"}`; }
const OUTTEXT = { pack:nominationPack, approval:approvalMsg, ics:d=>{ const z=remindersZip(d); return z?z.ics:""; }, thanks:d=>d.msg||thanksTemplate(d), credits:creditsText, handover:d=>JSON.stringify(handoverObj(d),null,2), change:d=>changeLine(d, d.field==="cancel"||d.earlier?"C1 Critical":["date","time","eligibility"].includes(d.field)?"C2 Material":"C3 Routine"), reverify:reverifyNote };
function thanksTemplate(d){ const t=d.tone||"warm"; const open = t==="formal"?`Dear ${d.to||""},`:`Hi ${d.to||""},`; return `${open}\n\nThank you for ${String(d.did||"what you did").replace(/\.$/,"")}.${d.impact?" "+String(d.impact).replace(/^./,c=>c.toUpperCase()).replace(/\.?$/,"."):""}${t==="brief"?"":" It made a real difference, and I wanted you to know it was noticed."}${d.level==="L2"?"\n\nI am sharing this with your line manager so it is recorded, if you are happy for me to do so.":""}\n\n${t==="formal"?"With thanks,":"Thanks again,"}`; }

async function saveFile(name, data, msgEl){ if(DL){ try{ await DL.save({filename:name, data}); msgEl.textContent="Saved "+name; return; }catch(e){ if(e&&e.code==="declined"){ msgEl.textContent="Download cancelled."; return; } } }
  if(typeof data==="string"){ try{ await navigator.clipboard.writeText(data); msgEl.textContent="Downloads aren't available here, so the content was copied instead."; }catch(e){ msgEl.textContent="Downloads aren't available here. Use Copy instead."; } } else msgEl.textContent="Downloads aren't available in this view. Use Copy instead."; }

/* AI actions inside workflows */
async function aiDraft(wid, c, spec, statusEl){
  const d=c.data, r=routeByRid(d.route)||[], g=C.glance.find(x=>x.code===r[8]), L=wordLimit(d)||450;
  const ev=(d.ev||[]).filter(x=>x.claim).map((x,i)=>`${i+1}. ${x.claim} — source: ${x.source||"none"}${x.when?" ("+x.when+")":""}`).join("\n");
  const prompt=`Draft a nomination in STAR form for ${r[1]||"a recognition route"}${d.category?", category "+d.category:""}. Nominee type: ${({ind:"an individual",team:"a team",net:"a staff network",vol:"a volunteer group"})[d.kind]||"unspecified"}; refer to them as "${d.ref||"the nominee"}". Route evidence expectations: ${r[4]||""}. Caveat: ${r[6]||""}.${g?" Key facts: "+g.facts.map(f=>f[0]+": "+f[1]+" ["+f[2]+"]").join("; "):""}\nEvidence supplied by the nominator (use ONLY this; put [needs evidence] where something is missing):\n${ev||"(none supplied)"}\nExisting draft to improve if present: ${JSON.stringify({o:d.o,s:d.s,t:d.t,a:d.a,r:d.r})}\nTotal length at most ${Math.round(L*0.95)} words across all five parts.\n${POLICY_TEXT}\nReply with only JSON: {"o":"overview","s":"situation","t":"task","a":"action","r":"result","notes":["gaps or cautions for the nominator"]}`;
  statusEl.innerHTML=`<span class="muted">Drafting from your evidence…</span>`;
  if(!AI){ statusEl.innerHTML=`<span class="muted">AI isn't available here. A template has been added to empty fields; replace the brackets with your evidence.</span>`; const tpl={o:`[Name or reference] is nominated for ${r[1]||"this award"} for [one-line summary].`, s:"[The context and the problem, with dates.]", t:"[What needed to change and their part in it.]", a:(d.ev||[]).filter(x=>x.claim).map(x=>x.claim).join(". ")||"[What they did, with co-contributors named where consented.]", r:"[Measurable outcomes and who benefited, with sources.]"}; Object.keys(tpl).forEach(k=>{ if(!d[k]) d[k]=tpl[k]; }); putCase(spec.id,c); return true; }
  try{ const j=await AI.json(prompt,{modelTier:"default", cache:false}); c.prev=Object.assign({}, {o:d.o,s:d.s,t:d.t,a:d.a,r:d.r}); ["o","s","t","a","r"].forEach(k=>{ if(typeof j[k]==="string") d[k]=j[k]; }); c.aiNotes=Array.isArray(j.notes)?j.notes.slice(0,8).map(String):[]; putCase(spec.id,c); return true; }
  catch(e){ statusEl.innerHTML=`<span style="color:var(--warn)">${esc(aiFail(e))}</span>`; return false; }
}
async function aiTighten(wid, c, spec, statusEl){ const d=c.data, L=wordLimit(d); if(!L){ statusEl.textContent="Record a word limit first (step 1)."; return false; }
  if(!AI){ statusEl.textContent="AI isn't available here. Trim the Action and Situation first; they are usually longest."; return false; }
  statusEl.innerHTML='<span class="muted">Tightening…</span>';
  try{ const j=await AI.json(`Shorten this STAR nomination to at most ${Math.round(L*0.95)} words in total without losing facts, sources or outcomes. Keep every factual claim; cut adjectives and repetition.\n${POLICY_TEXT}\nDraft: ${JSON.stringify({o:d.o,s:d.s,t:d.t,a:d.a,r:d.r})}\nReply with only JSON {"o":"","s":"","t":"","a":"","r":""}.`,{cache:false}); c.prev={o:d.o,s:d.s,t:d.t,a:d.a,r:d.r}; ["o","s","t","a","r"].forEach(k=>{ if(typeof j[k]==="string") d[k]=j[k]; }); putCase(spec.id,c); return true; }
  catch(e){ statusEl.innerHTML=`<span style="color:var(--warn)">${esc(aiFail(e))}</span>`; return false; } }
async function aiReview(wid, c, spec, statusEl, outEl){ const d=c.data, r=routeByRid(d.route)||[];
  if(!AI){ statusEl.textContent="AI isn't available here. Use the automatic checks and ask a colleague to review."; return; }
  const props=[]; const ctl=new AbortController(); statusEl.innerHTML='<span class="muted">Reviewer started…</span> <button type="button" class="btn ghost" id="revStop">Stop</button>'; $("#revStop").onclick=()=>ctl.abort();
  const tools=[
    {name:"get_draft", description:"The current STAR draft fields o,s,t,a,r and the word count and limit.", execute:()=>({o:d.o,s:d.s,t:d.t,a:d.a,r:d.r, words:starWords(d), limit:wordLimit(d)||null})},
    {name:"get_evidence", description:"The nominator's evidence list: claim, source, when.", execute:()=>(d.ev||[]).filter(x=>x.claim||x.source)},
    {name:"get_route_criteria", description:"The selected route's evidence expectations, caveats and key facts.", execute:()=>{ const g=C.glance.find(x=>x.code===r[8]); return {route:r[1], evidence:r[4], caveat:r[6], facts:g?g.facts.map(f=>f.join(" | ")):[] , category:d.category||""}; }},
    {name:"run_portal_checks", description:"The Hub's automatic review checks with pass or fail.", execute:()=>{ const t=document.createElement("div"); t.innerHTML=reviewList(d); return $$("li",t).map(li=>li.textContent.trim()); }},
    {name:"propose_edit", description:"Propose replacing one STAR field (o,s,t,a,r) with new text, with a one-sentence reason. The person decides whether to accept. Use for concrete improvements only.", inputSchema:{type:"object",properties:{field:{type:"string",enum:["o","s","t","a","r"]},text:{type:"string"},reason:{type:"string"}},required:["field","text","reason"]}, execute:i=>{ const f=String(i.field); if(!["o","s","t","a","r"].includes(f)) throw new Error("field must be one of o,s,t,a,r"); props.push({field:f,text:String(i.text),reason:String(i.reason||"")}); statusEl.innerHTML=`<span class="muted">${props.length} suggestion(s) so far…</span>`; return "Recorded for the person to review."; }}
  ];
  try{ const {text}=await AI(`Review this nomination against the route's criteria as a careful awards assessor. Use the tools: read the draft, evidence and criteria, run the Hub checks, then call propose_edit for up to 4 specific improvements (claims without evidence, missing measurable results, unclear actions, over the word limit, identity statements needing self-confirmation). Finish with a short assessment: strengths, risks, and what to do next, under 150 words.\n${POLICY_TEXT}`,{tools, signal:ctl.signal, onText:({text})=>{ outEl.innerHTML=`<div class="aiout">${md(text)}</div>`; }});
    c.review={text, props, at:TODAY}; putCase(spec.id,c); statusEl.textContent=props.length?`${props.length} suggestion(s) to review below.`:"Review complete."; renderReviewOut(outEl,c,spec);
  }catch(e){ const m=aiFail(e); statusEl.innerHTML=m?`<span style="color:var(--warn)">${esc(m)}</span>`:"Stopped."; if(props.length){ c.review={text:e.text||"",props,at:TODAY}; putCase(spec.id,c); renderReviewOut(outEl,c,spec); } }
}
const FIELD_LABEL={o:"Overview",s:"Situation",t:"Task",a:"Action",r:"Result"};
function renderReviewOut(outEl,c,spec){ const rv=c.review; if(!rv) return; outEl.innerHTML=`${rv.text?`<div class="aiout">${md(rv.text)}</div>`:""}${(rv.props||[]).map((p,i)=>p.done?"":`<div class="card stack prop"><div class="row" style="justify-content:space-between"><strong>${ico("sparkle","ico")} Suggested change to ${FIELD_LABEL[p.field]}</strong><span class="small muted">${esc(p.reason)}</span></div><p class="small">${esc(p.text)}</p><div class="row"><button class="btn" type="button" data-accept="${i}">Accept</button><button class="btn ghost" type="button" data-reject="${i}">Reject</button></div></div>`).join("")}`;
  $$("[data-accept]",outEl).forEach(b=>b.onclick=()=>{ const p=rv.props[+b.dataset.accept]; c.prev=Object.assign({}, {o:c.data.o,s:c.data.s,t:c.data.t,a:c.data.a,r:c.data.r}); c.data[p.field]=p.text; p.done="accepted"; putCase(spec.id,c); render(); });
  $$("[data-reject]",outEl).forEach(b=>b.onclick=()=>{ rv.props[+b.dataset.reject].done="rejected"; putCase(spec.id,c); renderReviewOut(outEl,c,spec); }); }
async function aiThanks(c, spec, statusEl){ const d=c.data; if(!AI){ d.msg=thanksTemplate(d); putCase(spec.id,c); statusEl.textContent="AI isn't available here; the template was used."; return true; }
  statusEl.innerHTML='<span class="muted">Writing…</span>';
  try{ const {text}=await AI(`Write a short ${d.tone||"warm"} ${d.level==="L2"?"commendation":"thank-you"} message (under 120 words) to ${d.to}. What they did: ${d.did}. Difference it made: ${d.impact||"(not given)"}. Be specific, no clichés, no exaggeration.${d.level==="L2"?" Offer to share it with their line manager if they are happy for that.":""}\n${POLICY_TEXT}\nReply with the message only.`,{cache:false}); d.msg=text.trim(); putCase(spec.id,c); return true; }
  catch(e){ statusEl.innerHTML=`<span style="color:var(--warn)">${esc(aiFail(e))}</span>`; return false; } }

/* Engine view */
function wfView(wid){ const spec=WF[wid]; return () => {
  const list=wfCases(wid); let c=curCase(wid);
  if(c){ const st0=spec.steps[c.step]; if(st0.fields.some(f=>f.k==="msg") && !c.data.msg && st0.outText){ c.data.msg=TEXTS[st0.outText](Object.assign({},c.data,{msg:""})); putCase(wid,c); } }
  if(!c) return `<div class="wfhead"><div class="wfico">${ico(spec.icon,"ico")}</div><div class="stack" style="gap:4px"><h2 class="wfh">${esc(spec.name)}</h2><p class="muted">${esc(spec.who)} · ${esc(spec.time)}</p></div></div>
    ${guideHTML(wid,false)}<div class="grid g2"><div class="card stack"><h3 id="wf-steps">${spec.steps.length} steps</h3><ol class="wfsteps-list">${spec.steps.map(s=>`<li>${ico(s.icon,"ico")}<span><strong>${esc(s.title)}</strong><br><span class="small muted">${esc(s.intro)}</span></span></li>`).join("")}</ol></div>
    <div class="stack"><div class="card stack"><h3 id="wf-out">You'll get</h3>${cardList(spec.outputs)}<button class="btn big" type="button" id="wfNew">${ico(spec.icon,"ico")}<span>Start</span></button><p class="small muted">Your progress is saved in this browser only. Nothing is sent anywhere unless you download, copy or use AI.</p></div>
    ${list.length?`<div class="card stack"><h3 id="wf-cases">Continue where you left off</h3><ul class="plain">${list.map(x=>`<li class="row" style="justify-content:space-between"><span><strong>${esc(x.title||x.data.ref||x.data.to||x.data.event||x.data.rid||"Untitled")}</strong><br><span class="small muted">Step ${x.step+1} of ${spec.steps.length}: ${esc(spec.steps[x.step].title)} · updated ${esc(fmt(x.updated))}</span></span><span class="row"><button class="btn ghost" type="button" data-resume="${x.id}">Resume</button><button class="iconbtn2" type="button" data-del="${x.id}" aria-label="Delete">✕</button></span></li>`).join("")}</ul><div id="delConfirm"></div></div>`:""}</div></div>`;
  const st=spec.steps[c.step], d=c.data, un=stepUnmet(st,d), pct=Math.round(100*c.step/(spec.steps.length-1));
  return `<div class="wfhead"><div class="wfico">${ico(spec.icon,"ico")}</div><div class="stack" style="gap:2px;min-width:0"><span class="eyebrow">${esc(spec.name)}</span><h2 class="wfh">${esc(d.ref||d.to||d.event||d.rid||"New")}</h2></div><button class="btn ghost" type="button" id="wfExit">All ${esc(spec.name.toLowerCase().split(" ")[0])} cases</button></div>
  ${guideHTML(wid,true)}
  <nav class="stepper" aria-label="Steps"><div class="sbar"><span style="width:${pct}%"></span></div><ol>${spec.steps.map((s,i)=>{ const done=i<c.step, curr=i===c.step, reach=i<=c.step || wfUnmet(spec,c,i-1).length===0; return `<li class="${done?"done":""}${curr?" cur":""}"><button type="button" data-go="${i}" ${reach?"":"disabled"} aria-current="${curr?"step":"false"}"><span class="sdot">${done?sIco("ok"):ico(s.icon,"ico")}</span><span class="slab">${esc(s.title)}</span></button></li>`; }).join("")}</ol></nav>
  <div class="wfgrid"><section class="card stack wfmain"><h3 id="wf-cur">${ico(st.icon,"ico")} Step ${c.step+1}: ${esc(st.title)}</h3><p class="small muted">${esc(st.intro)}</p>
    <form class="stack" id="wfForm" novalidate>${st.fields.map(f=>fieldHTML(f,d,wid)).join("")}</form>
    ${st.ai==="draft"?`<div class="aibar"><div class="row">${aiBtn("aiDraft",d.s?"Improve with AI":"Draft from my evidence")}${aiBtn("aiTight","Tighten to limit","ghost")}${c.prev?`<button class="btn ghost" type="button" id="aiUndo">Undo last AI change</button>`:""}</div><p class="small aistate" data-state="checking"></p><p class="small" id="aiStatus" aria-live="polite"></p>${c.aiNotes&&c.aiNotes.length?`<div class="note"><strong>AI notes for you.</strong><ul class="tick small">${c.aiNotes.map(n=>`<li>${esc(n)}</li>`).join("")}</ul></div>`:""}<p class="small"><strong id="wfWords"></strong></p></div>`:""}
    ${st.ai==="review"?`<div class="aibar"><div class="row">${aiBtn("aiReview","Review against criteria")}</div><p class="small aistate" data-state="checking"></p><p class="small" id="aiStatus" aria-live="polite"></p><div id="aiRevOut"></div></div>`:""}
    ${String(st.ai||"").startsWith("rewrite:")?`<div class="aibar"><div class="row">${aiBtn("aiRewrite","Improve wording with AI")}${c.prev?`<button class="btn ghost" type="button" id="aiUndo">Undo last AI change</button>`:""}</div><p class="small aistate" data-state="checking"></p><p class="small" id="aiStatus" aria-live="polite"></p></div>`:""}
    ${st.ai==="thanks"?`<div class="aibar"><div class="row">${aiBtn("aiThanks","Write it for me")}</div><p class="small aistate" data-state="checking"></p><p class="small" id="aiStatus" aria-live="polite"></p></div>`:""}
    ${st.out?`<div id="wfOutBox" class="stack">${OUT[st.out](d,wid)}</div>`:""}
    <div class="wfnav row"><button class="btn ghost" type="button" id="wfBack" ${c.step===0?"disabled":""}>Back</button>${c.step<spec.steps.length-1?`<button class="btn" type="button" id="wfNext" ${un.length?'aria-disabled="true"':""}>Continue</button>`:`<button class="btn" type="button" id="wfDone">Finish</button>`}<span class="small" id="wfSaved" aria-live="polite">Saved</span></div>
    ${un.length?`<div class="note warn small" id="wfUnmet"><strong>To continue:</strong> ${un.map(esc).join(" · ")}</div>`:""}</section>
    <aside class="stack wfside">${st.side?`<div class="card stack">${SIDE[st.side](d)}</div>`:""}<div class="card stack small"><strong>${ico("lock","ico")} Privacy</strong><p>Everything you type stays in this browser. AI requests send only what that button needs, and only when you click.</p></div></aside></div>`;
};}
function wfAfter(wid){ return () => { const spec=WF[wid]; let c=curCase(wid);
  const nb=$("#wfNew"); if(nb) nb.onclick=()=>{ newCase(wid); render(); };
  $$("[data-resume]").forEach(b=>b.onclick=()=>{ store.set("wfcur:"+wid,b.dataset.resume); render(); });
  $$("[data-del]").forEach(b=>b.onclick=()=>{ $("#delConfirm").innerHTML=`<div class="note bad row" style="justify-content:space-between"><span>Delete this case from this browser? This can't be undone.</span><span class="row"><button class="btn" type="button" id="delYes">Delete</button><button class="btn ghost" type="button" id="delNo">Keep</button></span></div>`; $("#delYes").onclick=()=>{ wfSave(wid, wfCases(wid).filter(x=>x.id!==b.dataset.del)); render(); }; $("#delNo").onclick=()=>{ $("#delConfirm").innerHTML=""; }; });
  if(!c) return;
  const d=c.data, st=spec.steps[c.step];
  const sync=()=>{ c=curCase(wid)||c; c.data=d; putCase(wid,c); const s=$("#wfSaved"); if(s) s.textContent="Saved"; updWords(); refreshGate(); const side=$(".wfside .card"); if(st.side&&side) side.innerHTML=SIDE[st.side](d); const ob=$("#wfOutBox"); if(st.out&&ob&&st.out!=="submitPack"&&st.out!=="thanksOut"){ ob.innerHTML=OUT[st.out](d,wid); bindOut(); } };
  const updWords=()=>{ const w=$("#wfWords"); if(w){ const L=wordLimit(d), n=starWords(d); w.textContent=n+" words"+(L?" of "+L:""); w.style.color=L&&n>L?"var(--bad)":"var(--ink)"; } $$("[data-wc]").forEach(s=>{ s.textContent=words(d[s.dataset.wc])+" words"; }); };
  const refreshGate=()=>{ const un=stepUnmet(st,d), nx=$("#wfNext"); if(nx) nx.setAttribute("aria-disabled", un.length?"true":"false"); let box=$("#wfUnmet"); if(un.length){ if(!box){ box=document.createElement("div"); box.id="wfUnmet"; box.className="note warn small"; $(".wfmain").appendChild(box); } box.innerHTML="<strong>To continue:</strong> "+un.map(esc).join(" · "); } else if(box) box.remove(); };
  $$("#wfForm [data-k]").forEach(el=>el.addEventListener(el.type==="checkbox"||el.tagName==="SELECT"?"change":"input",()=>{ d[el.dataset.k]= el.type==="checkbox"?el.checked:el.value; if(el.dataset.k==="route"&&!c.title){ c.title=""; } sync(); if(el.tagName==="SELECT"&&el.dataset.k==="route"){ render(); } }));
  $$("[data-rk]").forEach(el=>el.addEventListener("input",()=>{ const k=el.dataset.rk, i=+el.dataset.ri; d[k]=d[k]||[]; while(d[k].length<=i) d[k].push({}); d[k][i][el.dataset.rc]=el.value; sync(); }));
  $$("[data-radd]").forEach(b=>b.onclick=()=>{ const k=b.dataset.radd, f=st.fields.find(f=>f.k===k); d[k]=d[k]&&d[k].length?d[k]:Array.from({length:f.min||3},()=>({})); d[k].push({}); sync(); render(); });
  $$("[data-rdel]").forEach(b=>b.onclick=()=>{ const k=b.dataset.rdel; (d[k]=d[k]||[]).splice(+b.dataset.ri,1); sync(); render(); });
  $$("[data-go]").forEach(b=>b.onclick=()=>{ c.step=+b.dataset.go; putCase(wid,c); render(); $("#wf-cur")&&$("#wf-cur").focus&&$(".stepper").scrollIntoView({block:"nearest"}); });
  const back=$("#wfBack"); if(back) back.onclick=()=>{ c.step=Math.max(0,c.step-1); putCase(wid,c); render(); };
  const nx=$("#wfNext"); if(nx) nx.onclick=()=>{ const un=stepUnmet(st,d); if(un.length){ const box=$("#wfUnmet"); box&&box.focus&&(box.tabIndex=-1, box.focus()); return; } c.step++; putCase(wid,c); render(); const h=$("#wf-cur"); if(h){ h.tabIndex=-1; h.focus(); } };
  const dn=$("#wfDone"); if(dn) dn.onclick=()=>{ store.set("wfcur:"+wid,null); render(); };
  const ex=$("#wfExit"); if(ex) ex.onclick=()=>{ store.set("wfcur:"+wid,null); render(); };
  const statusEl=$("#aiStatus"); $$(".aistate").forEach(paintAIState);
  const run=async(fn,btn)=>{ btn.disabled=true; const ok=await fn(); btn.disabled=false; if(ok) render(); };
  const ad=$("#aiDraft"); if(ad) ad.onclick=()=>run(()=>aiDraft(wid,c,spec,statusEl),ad);
  const at=$("#aiTight"); if(at) at.onclick=()=>run(()=>aiTighten(wid,c,spec,statusEl),at);
  const au=$("#aiUndo"); if(au) au.onclick=()=>{ Object.assign(c.data,c.prev); delete c.prev; putCase(wid,c); render(); };
  const ar=$("#aiReview"); if(ar){ if(c.review) renderReviewOut($("#aiRevOut"),c,spec); ar.onclick=async()=>{ ar.disabled=true; await aiReview(wid,c,spec,statusEl,$("#aiRevOut")); ar.disabled=false; }; }
  const arw=$("#aiRewrite"); if(arw){ const [,fk,...ins]=String(st.ai).split(":"); arw.onclick=()=>run(()=>aiRewrite(c,spec,fk,ins.join(":"),statusEl),arw); }
  const ath=$("#aiThanks"); if(ath) ath.onclick=()=>run(()=>aiThanks(c,spec,statusEl),ath);
  $$("[data-tpl]").forEach(b=>b.onclick=()=>{ d.msg=thanksTemplate(d); sync(); render(); });
  const bindOut=()=>{
  const msg=$("#wfmsg-"+wid);
  $$("[data-copy]").forEach(b=>b.onclick=async()=>{ const t=b.dataset.copy==="gen"?genText(wid,d):OUTTEXT[b.dataset.copy](d); try{ await navigator.clipboard.writeText(t); msg.textContent="Copied"; }catch(e){ const ta=$("#wfout-"+wid); ta.value=t; ta.classList.remove("sr"); ta.removeAttribute("aria-hidden"); ta.focus(); ta.select(); msg.textContent="Selected: press Ctrl+C or Cmd+C"; } });
  $$("[data-out]").forEach(b=>b.onclick=()=>{ const k=b.dataset.out, ref=(d.ref||d.rid||"nomination").replace(/[^A-Za-z0-9-]+/g,"-").slice(0,40);
    if(k==="pack") saveFile(`Nomination-pack-${ref}.md`, nominationPack(d), msg);
    if(k==="zip"){ const z=remindersZip(d); if(z) saveFile(z.name, makeZip([{name:z.name.replace(/\.zip$/,".ics"), data:z.ics}]), msg); }
    if(k==="handover") saveFile(`Handover-${ref}.json`, JSON.stringify(handoverObj(d),null,2), msg);
    if(k==="genmd") saveFile(`${spec.name.replace(/[^A-Za-z0-9]+/g,"-")}-${TODAY}.md`, "# "+spec.name+"\n\n"+genText(wid,d), msg);
    if(k==="relzip"){ const files=[{name:"Awards_and_Recognition_Hub_Master_Calendar.ics", data:buildICS(liveEvents(), D.meta.calname)}].concat(splitSets().map(s=>({name:"split/"+s.file, data:buildICS(s.uids.map(u=>D.events.find(e=>e.uid===u)).filter(Boolean), s.name)}))).concat([{name:"RELEASE-NOTE.txt", data:releaseText(d).replace(/\n/g,"\r\n")}]); saveFile(`Recognition_Calendar_${(d.ver||D.meta.version).replace(/[^A-Za-z0-9.]+/g,"")}.zip`, makeZip(files), msg); }
    if(k==="handovermd") saveFile(`Handover-${ref}.md`, "# Handover package\n\n"+Object.entries(handoverObj(d)).map(([a,v])=>`- **${a}**: ${Array.isArray(v)?v.join("; "):v}`).join("\n"), msg); });
  const sh=$("[data-starthandover]"); if(sh) sh.onclick=()=>{ const nc=newCase("handover"); nc.data={rid:d.ref||"", summary:d.contrib||""}; putCase("handover",nc); location.hash="workflows-handover"; };
  const sc=$("[data-startchange]"); if(sc) sc.onclick=()=>{ const r=D.registry.find(x=>x[0]===d.reg)||[]; const nc=newCase("change"); nc.data={src:r[2]||"", newv:d.diff||""}; putCase("change",nc); location.hash="workflows-change"; };
  };
  bindOut();
  updWords();
};}
V.wf_home = () => `<p class="lede">Guided workflows for the things people do most. Each one saves as you go, checks the safeguards before you move on, and ends with something you can use.</p>
  <a class="wfhero" href="#workflows-nominate"><div class="wfico big">${ico("nominate","ico")}</div><div class="stack" style="gap:4px"><span class="eyebrow">Most used</span><strong class="wfhero-t">Draft and submit a nomination</strong><span class="small">Route, consent, evidence, STAR draft with AI help, review, pack and reminders. ${esc(GUIDE.nominate.cadence)} ${wfCases("nominate").length?wfCases("nominate").length+" in progress.":""}</span></div><span class="wfgo" aria-hidden="true">→</span></a>
  <div class="row"><a class="btn ghost" href="#workflows-mywork">${ico("mywork","ico")}<span>My work</span></a><a class="btn ghost" href="#workflows-rhythm">${ico("rhythm","ico")}<span>Operating rhythm</span></a><a class="btn ghost" href="#workflows-map">${ico("map","ico")}<span>Workflow map</span></a></div>
  ${WF_GROUPS.map(([g,ids])=>`<h3 id="wfg-${g.split(" ")[0].toLowerCase()}">${esc(g)}</h3><div class="grid g3">${ids.filter(id=>id!=="nominate").map(id=>{ const s=WF[id], gd=GUIDE[id]||{}; return `<a class="card stack wfcard" href="#workflows-${id}"><div class="row" style="gap:10px"><div class="wfico">${ico(s.icon,"ico")}</div><strong>${esc(s.name)}</strong></div><p class="small muted">${esc(s.who)}</p><p class="small">${ico("rhythm","ico")} ${esc(gd.cadence||"")}</p><p class="small">${s.steps.length} steps · ${esc(s.time)}${wfCases(id).length?" · "+wfCases(id).length+" in progress":""}</p></a>`; }).join("")}</div>`).join("")}
  <div class="card stack aicard"><div class="row" style="gap:8px">${ico("sparkle","ico")}<h3 class="h4">AI in the workflows</h3></div><p class="small">Drafting, tightening and criteria review use Claude on your own account, only when you click. Suggestions never change your draft until you accept them. If AI isn't available, templates and automatic checks still work.</p><p class="small aistate" data-state="checking"></p><a class="small" href="#assurance-ai">Read the AI rules</a></div>`;
V.wf_home.after = () => $$(".aistate").forEach(paintAIState);
V.wf_map = () => { const built=WF_ALL().map(id=>{ const w=WF[id], g=GUIDE[id]||{}; return [w.name, g.raci?g.raci[0]:w.who, g.when||"", g.cadence||"", String(w.steps.length), String(w.steps.reduce((a,s)=>a+(s.gate||[]).length,0)), w.outputs.join("; "), "Built", "workflows-"+id]; });
  const other=[["Nomination planner","Nominator","A deadline is chosen","Per award cycle","1","—","Back-schedule, STAR draft, .ics","Built","calendar-planner"],["Route finder","Anyone","Unsure where to nominate","When needed","1","—","Ranked routes","Built","routes-finder"],["Deployment checklist","Calendar owner","Release","Per release","1","—","Tick list (also in Release workflow)","Built","governance-checklist"],
   ["Scheduled source monitoring","Automation platform","Weekly trigger","Weekly","13","Human verification gate","Candidate release","Specified only: needs an approved automation platform","governance-auto"],
   ["Shared team nomination tracker","Portfolio owner","Many nominators at once","Continuous","—","DPIA, access rules","Team view of cases","Candidate: needs a governed data store and a DPIA","workflows-mywork"],
   ["Recognition-gap analysis","Analyst","Quarterly","Quarterly","—","Disclosure control, small-cell suppression","Aggregate gap report (backlog B08)","Candidate: needs aggregate data","service-backlog"],
   ["DPIA and equality screening","DPO/IG","Before pilot (gates G2, G4)","Per phase","—","Legal basis","DPIA record","Candidate: owned by DPO/IG tooling","service-roadmap"],
   ["Pilot evaluation","Evaluation lead","Weeks 16–18 of the pilot","Once","—","Gate G5","Evaluation report","Candidate","service-roadmap"]];
  const rows=built.concat(other);
  return `<p class="lede">Every workflow identified across the Hub: what starts it, who does it, how often, and whether it runs here. ${built.length} are built as guided workflows; the rest are tools, specified processes or candidates.</p><div class="tblwrap"><table><thead><tr><th>Workflow</th><th>Responsible</th><th>Trigger</th><th>Cadence</th><th>Steps</th><th>Gates</th><th>Outputs</th><th>Status</th></tr></thead><tbody>${rows.map(r=>`<tr><td><a href="#${r[8]}"><strong>${esc(r[0])}</strong></a></td><td class="small">${esc(r[1])}</td><td class="small">${esc(r[2])}</td><td class="small">${esc(r[3])}</td><td class="num">${esc(r[4])}</td><td class="small">${esc(r[5])}</td><td class="small">${esc(r[6])}</td><td>${pill(r[7].startsWith("Built")?"Built":r[7].startsWith("Specified")?"Specified only":"Candidate", r[7].startsWith("Built")?"ok":r[7].startsWith("Specified")?"mute":"info")}${r[7].startsWith("Built")?"":`<br><span class="small muted">${esc(r[7].replace(/^(Specified only|Candidate):? ?/,""))}</span>`}</td></tr>`).join("")}</tbody></table></div>
  <h3 id="wm-decl">How the workflows are defined</h3><p>Each workflow is a declarative specification: steps, fields, gates, outputs, guidance and cadence held as data. The engine renders it, enforces the gates and saves progress. Adding a workflow means adding a specification, not new screens.</p><pre tabindex="0" class="outpre code">${esc(JSON.stringify({id:"invite",guide:{cadence:GUIDE.invite.cadence,sla:GUIDE.invite.sla},steps:WF.invite.steps.map(s=>({id:s.id,title:s.title,fields:s.fields.map(f=>f.k+":"+f.type),gate:(s.gate||[]).map(g=>g.rule+(g.k?"("+g.k+")":"")),ai:s.ai?String(s.ai).split(":").slice(0,2).join(":"):undefined}))},null,1))}</pre>`; };
V.as_ai = () => `<p class="lede">Where AI runs in this Hub, what it can see, and the rules it follows. The rules are data: the same list is sent with every request.</p>
  <div class="grid g2"><div class="card stack"><h3 id="ai-where">Where AI runs</h3><div class="tblwrap"><table><thead><tr><th>Feature</th><th>Kind</th><th>What is sent</th></tr></thead><tbody>${[["Ask the Hub","Agentic: searches the Hub with page tools","Your question and up to 8 recent turns; tool results"],["Draft from my evidence","Generative","Route criteria, your evidence list and current draft"],["Tighten to limit","Generative","Current draft and the word limit"],["Review against criteria","Agentic: reads draft, evidence and criteria, runs checks, proposes edits","Draft, evidence, route criteria, check results"],["Write it for me (thanks)","Generative","The recipient as you typed it, what they did and its impact"]].map(r=>`<tr><td><strong>${r[0]}</strong></td><td class="small">${r[1]}</td><td class="small">${r[2]}</td></tr>`).join("")}</tbody></table></div><p class="small aistate" data-state="checking"></p></div>
  <div class="card stack"><h3 id="ai-rules">Rules sent with every request</h3><ul class="plain">${AI_POLICY.map(p=>`<li class="row" style="align-items:flex-start;gap:8px"><span class="mono" style="color:var(--accent)">${p[0]}</span><span class="small">${esc(p[1])}</span></li>`).join("")}</ul></div></div>
  <div class="grid g3"><div class="card stack"><h3 class="h4">Consent and cost</h3><p class="small">AI uses the viewer's own Claude account. The first request asks permission. Nothing runs on load or in the background.</p></div><div class="card stack"><h3 class="h4">People stay in control</h3><p class="small">AI suggestions are shown for acceptance; there is an undo for the last AI change; the Hub never submits a nomination.</p></div><div class="card stack"><h3 class="h4">Declarative checks</h3><p class="small">Gates and review rules (word limit, sourced claims, identity-statement flag, superlatives, deadline) are data the engine evaluates, so they apply with or without AI.</p></div></div>`;
V.as_ai.after = () => $$(".aistate").forEach(paintAIState);

