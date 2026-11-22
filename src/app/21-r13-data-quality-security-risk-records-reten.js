/* ================= Release 13: data quality, security risk, records, retention ================= */

/* ---- Data quality scorecard: the six dimensions of the Government Data Quality Framework, measured live from the data (K58) ---- */
const ISO_D = /^\d{4}-\d{2}-\d{2}$/;
const validDate = s => ISO_D.test(s||"") && !isNaN(pd(s).getTime()) && fmtISO(pd(s))===s;
function fmtISO(d){ return d.getUTCFullYear()+"-"+String(d.getUTCMonth()+1).padStart(2,"0")+"-"+String(d.getUTCDate()).padStart(2,"0"); }
function dqMeasure(data){ const ev=data.events||[], sp=data.split||{}, reg=data.registry||[], win=data.winners||[], routes=data.routes||{};
  const pct=(n,d)=>d?Math.round(n/d*1000)/10:100;
  const evFull=ev.filter(e=>e.uid&&e.summary&&e.type&&e.route&&e.start&&(e.url||e.route==="INTERNAL")).length;  // internal operating reminders have no organiser page by design
  const winFull=win.filter(w=>w[0]&&w[1]&&w[2]&&w[3]&&w[4]&&w[5]&&w[7]).length;
  const uids=ev.map(e=>e.uid), dupU=uids.filter((u,i)=>uids.indexOf(u)!==i);
  const wkeys=win.map(w=>[w[0],w[1],w[2],w[3]].join("|")), dupW=wkeys.filter((k,i)=>wkeys.indexOf(k)!==i);
  const rkeys=reg.map(r=>r[0]), dupR=rkeys.filter((k,i)=>rkeys.indexOf(k)!==i).map(k=>"registry "+k);  // D39
  const uidSet=new Set(uids); const badSplit=[]; Object.entries(sp).forEach(([f,s])=>(s.uids||[]).forEach(u=>{ if(!uidSet.has(u)) badSplit.push(f+": "+u); }));
  const badRoute=ev.filter(e=>!routes[e.route]).map(e=>e.uid), badOrder=ev.filter(e=>e.end && e.start && e.end<e.start).map(e=>e.uid);
  const regDue=reg.filter(r=>r[4]).filter(r=>addDays(r[4],r[5])>=data.today).length, regDated=reg.filter(r=>r[4]).length;
  const badDate=ev.filter(e=>!validDate(e.start)||(e.end&&!validDate(e.end))).map(e=>e.uid), badUrl=ev.filter(e=>e.url&&!/^https:\/\//.test(e.url)).map(e=>e.uid).concat(win.filter(w=>!/^https:\/\//.test(w[7]||"")).map(w=>w[3]));
  const types=["DEADLINE","MILESTONE","CEREMONY","PREP","WATCH","ONGOING"], badType=ev.filter(e=>!types.includes(e.type)).map(e=>e.uid);
  const badAlarm=ev.filter(e=>(e.alarms||[]).some(a=>!/^-P\d+D$/.test(a))).map(e=>e.uid);
  const verified=reg.filter(r=>/^Verified/i.test(r[6]||"")).length;
  const facts=(data.glance||[]).flatMap(g=>g.facts.map(f=>[g.code,f[0],f[2]])).filter(f=>f[2]!=="O"), factsAll=facts.length, factsV=facts.filter(f=>f[2]==="V"||f[2]==="S").length, factsS=facts.filter(f=>f[2]==="S").length, factsOpen=facts.filter(f=>f[2]!=="V"&&f[2]!=="S").map(f=>f[0]+" "+f[1].toLowerCase());  // "Not verified" must not count (found when first run)
  return [
    ["Completeness","Every event has a UID, title, type, route, start date and source (internal reminders excepted); every winner has scheme, year, category, name, kind, organisation and source", pct(evFull+winFull, ev.length+win.length), 100, (ev.length-evFull)+" events and "+(win.length-winFull)+" winners incomplete"],
    ["Uniqueness","No duplicate event UIDs, winner entries or source registry rows", dupU.length||dupW.length||dupR.length?0:100, 100, dupU.length||dupW.length||dupR.length?"Duplicates: "+dupU.concat(dupW,dupR).slice(0,5).join(", "):"No duplicates"],
    ["Consistency","Split calendars only list events that exist; every route is named; no event ends before it starts", badSplit.length||badRoute.length||badOrder.length?0:100, 100, badSplit.length||badRoute.length||badOrder.length?"Problems: "+badSplit.concat(badRoute,badOrder).slice(0,5).join(", "):"Consistent"],
    ["Timeliness","Source registry entries checked within their cadence", pct(regDue, regDated), 80, (regDated-regDue)+" of "+regDated+" sources overdue for re-verification"],
    ["Validity","Dates are real ISO dates, links are HTTPS, event types and reminders follow the rules", badDate.length||badUrl.length||badType.length||badAlarm.length?0:100, 100, badDate.length||badUrl.length||badType.length||badAlarm.length?"Invalid: "+badDate.concat(badUrl,badType,badAlarm).slice(0,5).join(", "):"All valid"],
    ["Accuracy (proxy)","Sources verified in the registry, and route facts re-checked against organiser pages (operating rules excluded)", pct(verified+factsV, reg.length+factsAll), 70, verified+" of "+reg.length+" sources and "+factsV+" of "+factsAll+" organiser facts verified"+(factsS?" ("+factsS+" confirmed by the service owner rather than a public page)":"")+(factsOpen.length?"; still unconfirmed: "+factsOpen.join("; "):"")]
  ]; }
const DQ_PLAN = [
  ["Commit to data quality","The calendar owner is accountable for organiser facts; the service owner for everything else. Quality is measured on every build (K58).","Calendar owner, service owner"],
  ["Know your users and their needs","Nominators need exact closing dates and times; managers need categories; comms need confirmed ceremonies. Unconfirmed dates are labelled TBC.","Service owner"],
  ["Assess quality throughout the data lifecycle","At entry: schema and self-checks. In use: weekly source and staleness checks. On change: change records with an approver.","Calendar owner"],
  ["Communicate data quality clearly and effectively","Every event shows its source and verification date; candidates are kept separate; this scorecard is published.","Content designer"],
  ["Anticipate changes affecting data quality","Award cycles move each year: re-verify every source in September, and after any organiser announcement.","Calendar owner"]
];
const dqData = () => ({glance:C.glance.map(g=>({code:g.code, facts:g.facts.map(f=>f.slice())})), events:D.events, split:D.split, registry:D.registry, winners:PUBLIC_WINNERS, routes:Object.assign({},ROUTE), today:TODAY});

/* ---- Security risk assessment (Secure by Design principle 3), scored like the DPIA (K59) ---- */
const THREATS = [
  ["T1","Public site","Defacement or a malicious change merged into main","Possible","Severe","Protected main, one code owner review, required checks, signed release tags","Remote","Severe"],
  ["T2","Public site","Script injected through content or a dependency","Possible","Significant","Hash-based CSP, no third-party scripts or fonts, escaping, CodeQL, Dependabot","Remote","Significant"],
  ["T3","Look-alike copy","A clone collects details from people who think it is official","Possible","Significant","Official address in the footer, report-a-copy link, no sign-in or payment anywhere","Remote","Significant"],
  ["T4","Repository","Account takeover of the only admin","Possible","Severe","Two admins in an organisation account, two-factor authentication required (to do)","Possible","Severe"],
  ["T5","Name scan secret","The removed-identifier list is exposed in logs or a fork","Remote","Significant","Encrypted secret, not passed to forks, never printed","Remote","Significant"],
  ["T6","Issue backlog","Spam or abusive issues flood the backlog","Possible","Minimal","GitHub account required, triage labels, ability to lock and block","Possible","Minimal"],
  ["T7","AI assistant","Instructions hidden in shared text steer the assistant","Possible","Significant","Assistant tools never read shared text (tested in func10)","Remote","Significant"],
  ["T8","Calendar files","A tampered .ics adds a false deadline","Remote","Significant","Calendars generated from the tested build; UIDs preserved; change records","Remote","Significant"],
  ["T9","Availability","GitHub Pages outage on a deadline day","Possible","Minimal","Calendar files people have downloaded keep working; uptime check opens an issue","Possible","Minimal"],
  ["T10","Supply chain","A compromised GitHub Action in the pipeline","Remote","Severe","Actions from GitHub and well-known publishers only; read-only default permissions; Dependabot for actions (to pin by commit hash)","Remote","Severe"]
];
/* ---- Records of processing (UK GDPR Article 30) ---- */
const ROPA = [
  ["Controller","The department that runs the Hub (to be confirmed), with its data protection officer"],
  ["Purposes","Help staff find and meet award deadlines; celebrate recognised work; improve the Hub from feedback"],
  ["Categories of people","Civil servants and public sector staff; award winners named by organisers; people who submit ideas or issues"],
  ["Categories of data","Names, organisation, role, award and citation; opt-in profile text; ideas, votes and issues; browser-only drafts and settings; hosting logs"],
  ["Special category data","None sought; free text is screened for identity terms"],
  ["Recipients","Everyone who can open the Hub (published data); GitHub and Anthropic as processors"],
  ["International transfers","United States, under the UK Extension to the EU-US Data Privacy Framework (processor certification to confirm)"],
  ["Retention","Profiles hidden after 12 months without an update; winners shown for the last three award years; ideas 24 months after a decision (proposed); browser data until cleared"],
  ["Security","Static hosting, Content Security Policy, escaping, protected main, encrypted secrets, continuous testing"],
  ["DPIA","Done, 18 October 2026 (Build hub › Data protection impact assessment)"]
];
/* ---- Retention of published winners: the last three award years (K60) ---- */
const WINNER_YEARS = 3;
const winnerCurrent = w => +w[1] >= (+TODAY.slice(0,4)) - (WINNER_YEARS-1);

V.build_quality = () => { const m=dqMeasure(dqData());
  return `<p class="lede">How good the Hub's data is, measured on every build against the six dimensions of the Government Data Quality Framework, and the plan to keep it that way.</p>
  <div class="grid g3">${m.map(r=>`<div class="kpi">${ico(r[2]>=r[3]?"s_ok":"s_warn","ico kico")}<b>${r[2]}%</b><span>${esc(r[0])}</span></div>`).join("")}</div>
  ${table("tDq",{cols:[{k:"d",l:"Dimension"},{k:"w",l:"What is measured"},{k:"s",l:"Score"},{k:"t",l:"Target"},{k:"n",l:"Detail"}], rows:m.map(r=>({d:r[0], w:r[1], s:r[2]+"%", t:r[3]+"%", n:r[4]}))})}
  <h3 id="dq-plan">Data quality action plan</h3><p class="small">Against the framework's five principles.</p>${simpleTable(["Principle","What we do","Owner"], DQ_PLAN)}
  <p class="small muted">Source: <a href="https://www.gov.uk/government/publications/the-government-data-quality-framework" target="_blank" rel="noopener">The Government Data Quality Framework</a>. Accuracy is measured by proxy; only a person re-checking the organiser page can confirm it.</p>`; };
V.build_quality.after = () => renderTable("tDq");
V.build_security = () => { const b={High:0,Medium:0,Low:0}, a={High:0,Medium:0,Low:0}; THREATS.forEach(t=>{ b[riskBand(t[3],t[4])]++; a[riskBand(t[6],t[7])]++; });
  return `<p class="lede">Security risk assessment for the Hub, as Secure by Design asks: what could go wrong, how likely and how bad, and what controls it. Scored like the DPIA.</p>
  <p class="small">Before controls: ${b.High} high, ${b.Medium} medium, ${b.Low} low. After controls: ${a.High} high, ${a.Medium} medium, ${a.Low} low. ${THREATS.filter(t=>riskBand(t[6],t[7])==="High").map(t=>t[0]+" ("+t[2].toLowerCase()+")").join(", ")||"None"} stays high until the repository moves to an organisation account with two admins and two-factor authentication.</p>
  ${table("tThreat",{cols:[{k:"id",l:"ID"},{k:"as",l:"Asset"},{k:"t",l:"Threat"},{k:"b",l:"Before"},{k:"c",l:"Controls"},{k:"a",l:"After"}], rows:THREATS.map(t=>({id:t[0], as:t[1], t:t[2], b:riskBand(t[3],t[4]), c:t[5], a:riskBand(t[6],t[7])}))})}
  <h3 id="sec-ropa">Record of processing (Article 30)</h3><dl class="facts">${ROPA.map(r=>`<dt>${esc(r[0])}</dt><dd>${esc(r[1])}</dd>`).join("")}</dl>`; };
V.build_security.after = () => renderTable("tThreat");
DEFECTS.push(["D35","Data quality accuracy counted unverified sources as verified","Data quality scorecard (found on its first run)","The test for verified sources matched the word verified anywhere, so Not verified counted.","Match only a status that starts with Verified.","func13 checks the accuracy count against the registry","Fixed"]);
DEFECTS.push(["D36","Search results stayed open after keyboard focus moved on","Masthead search (found by the WCAG 2.2 focus-not-obscured test)","The anchored results panel opened on focus but only closed on a click elsewhere or Escape, so tabbing past the search box left it covering the page.","The panel closes as soon as focus moves outside the search box and its results.","tests/func13.py checks no focused element is hidden on any section","Fixed"]);
DEFECTS.push(["D37","The Ask button could cover a focused link at the bottom of the screen","Every page (found by the WCAG 2.2 focus-not-obscured test)","When the browser scrolled a focused link into view at the bottom, the floating Ask button sat on top of it.","Scroll padding keeps focused items clear of the masthead and the Ask button.","tests/func13.py","Fixed"]);
/* ---- Accessibility statement: testing done so far (live numbers) ---- */
{ const _a=V.help_a11y; V.help_a11y = () => _a() + `<h3 id="as-tests">How the Hub has been tested</h3>${simpleTable(["Test","Coverage","Result"],[
    ["Automated WCAG 2.2 AA and best-practice rules (axe-core "+((D.a11y&&D.a11y.version)||"")+")", ((D.a11y&&D.a11y.scanned)||"Every")+" page views in light and dark", (D.a11y&&D.a11y.scanned)?((D.a11y.critical||0)+(D.a11y.serious||0)+(D.a11y.moderate||0)+(D.a11y.minor||0))+" issues":"Run before each release"],
    ["Keyboard only: tab order, no traps, visible focus, Escape closes panels","Every section","Pass (tests/func11.py)"],
    ["1.4.12 Text spacing","Every section with increased line, letter, word and paragraph spacing","Pass (tests/func13.py)"],
    ["2.4.11 Focus not obscured","Every section","Pass after fixing D36 and D37"],
    ["Forced colours (Windows high contrast)","Focus visibility on five sections","Pass"],
    ["Reduced motion","Front page animations and carousel","Pass"],
    ["1.4.10 Reflow","Every page at seven widths from 320 px","Pass (tests/widths.py)"],
    ["Screen readers (NVDA, JAWS, VoiceOver) and testing with disabled people","Not yet done","Needed before the statement can be finalised"]])}
  <p class="small muted">This statement was prepared on ${esc(fmt(TODAY))} and is still a draft.</p>`; }
/* ---- Register updates after release 13 ---- */
{ const set=(arr,key,col,vals)=>{ const r=arr.find(x=>x[col]===key); if(r) vals.forEach(([i,v])=>r[i]=v); };
  set(STANDARDS,"S14",0,[[3,"Met"],[4,"Live scorecard of the six framework dimensions (K58) and an action plan against the five principles"],[5,"Raise accuracy from 72%: re-verify the five unverified sources"]]);
  set(STANDARDS,"S06",0,[[4,"Assessed principle by principle below; security risk assessment of 10 threats (K59); live integrity check"]]);
  set(STANDARDS,"S09",0,[[4,"Automated scan with 0 issues; keyboard, text spacing, focus not obscured, forced colours and reduced motion tests on every section; statement updated with test evidence"]]);
  set(TCOP,"10",0,[[2,"Met"],[3,"Data dictionary, schema, lineage, and a data quality scorecard with an action plan"]]);
  set(SBD,"3",0,[[2,"Met"],[3,"Security risk assessment with 10 threats rated before and after controls"]]);
  set(SBD,"5",0,[[3,"Uptime and integrity check (the live page must keep its security policy), CodeQL; no real-time monitoring"]]);
  set(TCOP,"12",0,[[3,"Static site, no servers. Measured: 976 KB page, about 306 KB sent over the network compressed, plus 206 KB of fonts. Minifying saved only 5%, so it was not adopted"]]);
  set(AIPB,"5",0,[[3,"A search evaluation set runs on every change; AI can be switched off; no monitoring of live answers"]]);
  [["PR07",1,"Partly done","Keyboard, text spacing, focus not obscured, forced colours and reduced motion tests on every section (func11, func13); screen reader audit needs a specialist"],["PR10",1,"Drafted","Firefox and WebKit smoke job in the pipeline; not run here, so unverified"],["PR13",1,"Done","Snapshot has a JSON Schema and a live data quality scorecard (K58)"]].forEach(([r,i,s,n])=>{ const d=REVIEW_DONE.find(x=>x[0]===r&&x[1]===i); if(d){ d[2]=s; d[3]=n; } }); }
DEFECTS.push(["D38","Agenda source links all had the same name","Calendar agenda (found by the keyboard test)","Every row's link was called Source, so a screen reader list of links gave 20 identical entries (WCAG 2.4.4).","Each link now says which event it is the source for, in text read by screen readers.","tests/func11.py distinguishes focused elements by name and position","Fixed"]);
DEFECTS.push(["D39","The AI Innovation Award had two rows in the source registry","Source registry (found while re-verifying sources on 19 Oct 2026)","An older unverified row stayed when a verified one was added in release 7, so the registry counted the award twice and the accuracy score was understated.","Removed the stale row; the data quality uniqueness check now covers the registry.","K58 break test: duplicate a registry row","Fixed"]);
/* ---- Release 15 close-out: register and review updates ---- */
{ const t10=THREATS.find(t=>t[0]==="T10"); if(t10){ t10[5]="Every action pinned to a full commit hash (checked by tools/validate_github.py on every change), read-only default permissions, Dependabot updates the pins weekly"; }
  const sb=SBD.find(x=>x[0]==="2"); if(sb){ sb[2]="Met"; sb[3]="Dependencies pinned (Python, npm, and GitHub Actions by commit hash), with Dependabot; hosting approval still to confirm in the purchasing decision"; }
  [["PR08",1,"Done","Split into ordered files and wrapped in one function scope, so nothing leaks onto the page's global object (func13 checks it). Full ES modules were not adopted: the single file must also run offline and as a claude.ai artifact"],
   ["PR10",0,"Done","Every fixed wait replaced by a wait for the page to settle or for a specific condition; one deliberate 6.5-second wait remains to prove the carousel does not move on its own"],
   ["PR09",2,"Done","Decided against splitting data from code: the page is about 306 KB compressed, works offline as one file, and must run as a claude.ai artifact"]].forEach(([r,i,st,n])=>{ const d=REVIEW_DONE.find(x=>x[0]===r&&x[1]===i); if(d){ d[2]=st; d[3]=n; } }); }
