/* ================= Release 11: acting on the professional review ================= */
/* Owners are proposed roles, not named people. Drafts here need sign-off by the role named on each; none is approved. */
const PAGE_REVIEW_BY = "2027-04-18";
const PAGE_OWNER = {overview:"Service owner", workflows:"Product manager", recognition:"Head of reward (HR policy)", calendar:"Calendar owner", routes:"Calendar owner", connect:"Head of internal communications", evidence:"Evidence steward", help:"Content designer", build:"Technical architect"};
const ASSUMPTION_PAGES = ["build-journey","recognition-peers","recognition-managers","recognition-leaders","recognition-hr","workflows-start"];
function pageMetaHTML(sec){ const o=PAGE_OWNER[sec.id]; if(!o) return "";
  return `<p class="small muted pagemeta">Page owner (proposed): ${esc(o)} · Review by ${esc(fmt(PAGE_REVIEW_BY))}</p>`; }
function assumptionNoteHTML(sec, tab){ return ASSUMPTION_PAGES.includes(sec.id+"-"+tab[0]) ? `<div class="note warn assumption"><div><strong>Assumption, not yet tested with users.</strong> This page describes who we think the users are and what they need. It has not been checked in user research. See the research plan in Build hub › Governance drafts.</div></div>` : ""; }
/* Pay caveat on every financial method (K52) */
const PAY_CAVEAT = "Check your department's reward policy before offering this.";
METHODS.forEach(m=>{ if(m[2]==="Financial" && m[7].indexOf(PAY_CAVEAT)<0) m[7] = m[7].trim()+" "+PAY_CAVEAT; });
/* Architecture decision on GitHub Pages */
ADR.push(["ADR-08","GitHub Pages as the live host","Free, static and run from the open repository; a Content Security Policy allows only this build's own scripts, fonts and styles.","No shared store on Pages: the idea box sends people to GitHub issues, and opt-in profiles and votes work only inside claude.ai. Workflow cases stay in each person's browser."]);
ADR.push(["ADR-09","Fonts hosted with the site","No request leaves for a font provider, so no visitor data goes to a third party and the policy can be strict.","About 206 KB of font files to keep up to date (SIL Open Font License)."]);
ADR.push(["ADR-10","Source split into ordered parts","src/app holds the code in numbered files assembled in order; there are no copies to drift.","Still one global scope; modules are the next step."]);
/* DPIA screening against the ICO's high-risk indicators */
const DPIA_SCREEN = [
  ["Personal data processed?","Yes","Names of publicly announced winners (from organiser pages); opt-in profiles; account identifiers for ideas and votes inside claude.ai; free text people type."],
  ["Special category or criminal offence data?","Not intended","Free-text profiles and ideas could reveal it. The idea box blocks emails and phone numbers and warns on identity terms; profiles have no such filter yet."],
  ["Large-scale profiling, data matching or systematic monitoring?","No","No scoring of people; no tracking; no analytics yet."],
  ["Targets children or other vulnerable people?","No","Civil servants and public sector staff."],
  ["Innovative technology?","Yes","An AI assistant, though it reads only Hub content and the viewer's own drafts."],
  ["Invisible processing?","No","Everything shown is what the person sees; nothing is sent automatically."],
  ["Risk of physical harm?","Low","Publishing names could, rarely, expose someone; only names already published by organisers are shown."],
  ["Employer and employee relationship","Yes","The ICO says consent will not usually be appropriate where there is a clear imbalance of power, a particular issue for public authorities and employers, though they are not banned from using it. Opt-in profiles are optional with no adverse consequences, but the DPO should confirm the lawful basis."]
];
const DPIA_OUTCOME = "Two indicators apply (innovative technology, and publication of names in an employment setting). The ICO advises that two criteria usually point to a DPIA and that, if in doubt, you should do one. Recommendation: complete a full DPIA before go-live. Decision rests with the data protection officer.";
const PRIVACY_NOTICE = [
  ["What we collect","For an opt-in profile: the name, organisation, role, award, short bio and link you enter. For the idea box: your idea, its type and area, and the votes you cast. Your claude.ai account identifier is used to keep your entries yours."],
  ["Why","To celebrate recognised work and to improve the Hub. We do not use it for pay, performance or any decision about you."],
  ["Who can see it","Anyone who can open the Hub. Editors can hide a profile or idea."],
  ["How long","Until you remove it, or 12 months after your last update, whichever is first (proposed)."],
  ["Your choices","Remove your profile or idea at any time from the same page. Ask the owning team to correct or delete anything else."],
  ["Lawful basis","To be confirmed by the data protection officer (see the DPIA screening)."],
  ["Contact","The owning team, once named. Do not use the idea box for personal matters."]
];
const ATRS_SCREEN = [
  ["Organisation in scope?","Depends on the host","The mandatory policy covers ministerial and non-ministerial departments and arm's-length bodies that serve or interact with the public."],
  ["Significant influence on a decision with public effect?","No","The assistant suggests and drafts; a person decides and sends. Nothing it produces decides an award or pay."],
  ["Interacts directly with the general public?","No","The Hub is for civil servants and public sector staff."],
  ["Outcome","Probably out of mandatory scope","Record the decision and revisit if the Hub opens to the public or the assistant starts ranking nominations. A voluntary record is still good practice."]
];
const MEASURES = [
  ["M1","Sources verified within their check cadence","Share of source registry entries checked on time","Measured below from the registry",()=>{ const r=D.registry; const ok=r.filter(x=>x[4] && addDays(x[4],x[5])>=TODAY).length; return ok+" of "+r.length+" ("+Math.round(ok/r.length*100)+"%) not overdue, as of "+fmt(TODAY); }],
  ["M2","People can complete the top three tasks","Task completion in moderated usability sessions","Target 4 of 5 participants per task",()=>"No baseline: sessions not yet run"],
  ["M3","Nominations started before deadlines","Nomination packs started in the 30 days before each closing date","From a short survey of route owners each cycle",()=>"No baseline: no analytics"],
  ["M4","Calendar reach","Calendar downloads and subscriptions per month","GitHub Pages traffic, or consented analytics",()=>"No baseline: not live"],
  ["M5","Accessibility","Open accessibility issues after a manual audit","Target 0 high-severity issues",()=>"No baseline: audit not done"]
];
const CORE_TASKS = [["Find what closes next","Home, Calendar › Agenda"],["Choose the right award","Awards › Route finder"],["Draft and submit a nomination","Workflows › Nominate"],["Thank or credit someone","Workflows › Thank, Credit"],["Choose a way to recognise","Recognition › Ways to recognise"],["Get reminders","Calendar › Alerts and subscriptions"],["Get help","Help › User guide"]];
const RESEARCH_PLAN = [
  ["Usability sessions","5 moderated sessions, 45 minutes, remote","Nominators, line managers and one HR or reward practitioner; include at least one screen reader user and one person who uses Easy Read","Tasks: find the next deadline, pick a route for a team, start a nomination, set a reminder"],
  ["Tree test","Unmoderated, 30 or more participants","Mixed roles across at least three departments","Ten find-it tasks against the nine sections, to check names and order"],
  ["Easy Read check","2 sessions with a user group","People who use Easy Read, paid at the going rate","Read the Easy Read page and say what it means in their own words"]
];
const MAINT = [["Weekly triage of issues and checks",0.5,52],["Monthly source re-verification (18 sources, about 10 minutes each)",3,12],["Calendar releases",2,4],["Twice-yearly page reviews (9 sections, about 2 hours each)",18,2],["Yearly accessibility retest (internal share)",8,1]];
V.build_drafts = () => { const hrs=MAINT.reduce((a,m)=>a+m[1]*m[2],0);
  return `<p class="lede">Drafts written in response to the professional review. Each needs sign-off by the role named; none has been approved.</p>
  <h3 id="gd-dpia">DPIA screening</h3><p class="small">Against the ICO's high-risk indicators (<a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/data-protection-impact-assessments-dpias/when-do-we-need-to-do-a-dpia" target="_blank" rel="noopener">ICO: when do we need to do a DPIA?</a>). On consent, see <a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/consent/when-is-consent-appropriate/" target="_blank" rel="noopener">ICO: when is consent appropriate?</a> For the data protection officer.</p>
  <div class="tblwrap"><table><thead><tr><th scope="col">Question</th><th scope="col">Answer</th><th scope="col">Notes</th></tr></thead><tbody>${DPIA_SCREEN.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
  <div class="note"><div><strong>Screening outcome (draft).</strong> ${esc(DPIA_OUTCOME)}</div></div>
  <h3 id="gd-privacy">Privacy notice for profiles and the idea box</h3><p class="small">Draft for the data protection officer.</p><dl class="facts">${PRIVACY_NOTICE.map(r=>`<dt>${esc(r[0])}</dt><dd>${esc(r[1])}</dd>`).join("")}</dl>
  <h3 id="gd-atrs">Algorithmic Transparency Recording Standard screening</h3><p class="small">Against the <a href="https://www.gov.uk/government/publications/algorithmic-transparency-recording-standard-mandatory-scope-and-exemptions-policy/algorithmic-transparency-recording-standard-atrs-mandatory-scope-and-exemptions-policy" target="_blank" rel="noopener">ATRS mandatory scope and exemptions policy</a>. For the AI lead.</p>
  <div class="tblwrap"><table><thead><tr><th scope="col">Question</th><th scope="col">Answer</th><th scope="col">Why</th></tr></thead><tbody>${ATRS_SCREEN.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
  <h3 id="gd-measures">Success measures</h3><p class="small">Proposed for the service owner and performance analyst. Only M1 can be measured today.</p>
  <div class="tblwrap"><table><thead><tr><th scope="col">Measure</th><th scope="col">What it counts</th><th scope="col">How</th><th scope="col">Baseline today</th></tr></thead><tbody>${MEASURES.map(m=>`<tr><td><strong>${esc(m[0])}</strong> ${esc(m[1])}</td><td>${esc(m[2])}</td><td>${esc(m[3])}</td><td>${esc(m[4]())}</td></tr>`).join("")}</tbody></table></div>
  <h3 id="gd-core">Core tasks for the first release</h3><p class="small">Proposed minimum product for the product manager: seven tasks and where they live. Other pages stay, but are not promoted until research shows a need.</p><ol class="stack">${CORE_TASKS.map(t=>`<li><strong>${esc(t[0])}</strong> <span class="small muted">${esc(t[1])}</span></li>`).join("")}</ol>
  <h3 id="gd-research">Research plan</h3><div class="tblwrap"><table><thead><tr><th scope="col">Activity</th><th scope="col">Format</th><th scope="col">Who</th><th scope="col">What we test</th></tr></thead><tbody>${RESEARCH_PLAN.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
  <h3 id="gd-maint">Maintenance time (modelled)</h3><p class="small">A modelled estimate, not measured: about <strong>${Math.round(hrs)} hours a year</strong> of staff time, before any new features.</p>
  <div class="tblwrap"><table><thead><tr><th scope="col">Activity</th><th scope="col">Hours each</th><th scope="col">Times a year</th><th scope="col">Hours a year</th></tr></thead><tbody>${MAINT.map(m=>`<tr><td>${esc(m[0])}</td><td>${m[1]}</td><td>${m[2]}</td><td>${m[1]*m[2]}</td></tr>`).join("")}</tbody></table></div>
  <h3 id="gd-owners">Page owners</h3><p class="small">Proposed owners by section, shown at the foot of every page with a review date of ${esc(fmt(PAGE_REVIEW_BY))} (self-check K51).</p><div class="tblwrap"><table><thead><tr><th scope="col">Section</th><th scope="col">Owner (proposed)</th></tr></thead><tbody>${SECTIONS.map(s=>`<tr><td>${esc(s.label)}</td><td>${esc(PAGE_OWNER[s.id]||"None")}</td></tr>`).join("")}</tbody></table></div>`; };
/* Status of every review action after release 11: [role id, action index, status, what was done] */
const REVIEW_DONE = [
  ["PR01",0,"Partly done","Service owner in place (18 Oct 2026); a deputy is still to be named"],["PR01",1,"Drafted","Five proposed measures; M1 measured (Governance drafts)"],["PR01",2,"Drafted","Research plan written (Governance drafts)"],
  ["PR02",0,"Drafted","Seven core tasks proposed"],["PR02",1,"Needs people","Needs use data after the pilot"],["PR02",2,"Needs people","Needs the GitHub project, once the repository exists"],
  ["PR03",0,"Needs people","Waiting for the empty repository to be created"],["PR03",1,"Needs people","Needs a team"],["PR03",2,"Done","Branch protection script requires one approving review (tools/protect_branch.sh); runs once the repository exists"],
  ["PR04",0,"Done","Assumption notes on the journey, role pages and Start here (K53)"],["PR04",1,"Drafted","Plan written; sessions need a researcher"],["PR04",2,"Drafted","Plan written; needs participants"],["PR04",3,"Drafted","Plan written; needs a user group"],
  ["PR05",0,"Done","Proposed owner and review date at the foot of every page (K51)"],["PR05",1,"Needs people","Needs use data"],["PR05",2,"Needs people","Needs subject experts"],
  ["PR06",0,"Done","Current brand signed off by the service owner (18 Oct 2026)"],["PR06",1,"Needs people","Waits for usability testing"],["PR06",2,"Needs people","Waits for usability testing"],
  ["PR07",0,"Done","Statement remains a draft and claims no conformance"],["PR07",1,"Partly done","Keyboard-only test added for every section (tests/func11.py); screen reader audit needs a specialist"],["PR07",2,"Needs people","After the audit"],
  ["PR08",0,"Done","Scratch copies retired; src/app parts are the only source"],["PR08",1,"Partly done","Split into 29 ordered files; still one global scope"],["PR08",2,"Done","ESLint in the pipeline with no-undef, no-redeclare and no-dupe-keys as errors"],["PR08",3,"Done","Unit tests for the calendar pack and source tools (tests/unit_tools.py)"],
  ["PR09",0,"Done","ADR-08 to ADR-10"],["PR09",1,"Done","Decision: GitHub issues for ideas on Pages; profiles and votes only in claude.ai (ADR-08)"],["PR09",2,"Needs people","Later work"],
  ["PR10",0,"Partly done","Navigation waits replaced with waits for the page to render; other waits remain"],["PR10",1,"Drafted","Firefox and WebKit smoke job in the pipeline; not run here, so unverified"],["PR10",2,"Needs people","Needs someone new to the Hub"],
  ["PR11",0,"Done","Hash-based Content Security Policy on the Pages build; fonts hosted with the site"],["PR11",1,"Done","Hostile ideas and profiles tested: no markup or script runs, and no assistant tool returns shared text (tests/func10.py)"],["PR11",2,"Done","Pull requests from forks build and test without the name list; deployment still requires the scan"],["PR11",3,"Done","Official address and report-a-copy link in the footer"],
  ["PR12",0,"Drafted","Screening done; recommends a full DPIA"],["PR12",1,"Needs people","Needs someone independent"],["PR12",2,"Drafted","Privacy notice drafted"],
  ["PR13",0,"Needs people","Workflows run once the repository exists"],["PR13",1,"Done","Snapshot carries version and a JSON Schema (data/portal-data.schema.json)"],
  ["PR14",0,"Drafted","Five measures proposed"],["PR14",1,"Needs people","Needs a decision on analytics and consent"],["PR14",2,"Needs people","Needs a performance analyst"],
  ["PR15",0,"Needs people","Head of reward to review"],["PR15",1,"Done","Caveat on every financial method (K52)"],
  ["PR16",0,"Done","Branding signed off by the service owner (18 Oct 2026)"],["PR16",1,"Done","Banner maker adds 'Not an official announcement'"],
  ["PR17",0,"Done","Open Government Licence v3.0 for content in the footer and the repository"],["PR17",1,"Needs people","Legal review"],
  ["PR18",0,"Needs people","Only the account holder can create an organisation repository"],["PR18",1,"Done","Uptime workflow opens an issue if the live address stops answering"],
  ["PR19",0,"Drafted","ATRS screening: probably out of mandatory scope"],["PR19",1,"Done","Injection tested (tests/func10.py)"],
  ["PR20",0,"Drafted","Modelled at about 114 hours a year (Governance drafts)"]
];
const DONE_KIND = {"Done":"ok","Partly done":"info","Drafted":"warn","Needs people":"mute"};
const REVIEW_DONE_LIST = () => REVIEW_DONE.map(r=>r.slice());
{ const _brv = V.build_review, _bra = V.build_review.after;
  V.build_review = () => { const c={}; REVIEW_DONE.forEach(r=>c[r[2]]=(c[r[2]]||0)+1); const role=Object.fromEntries(REVIEW.map(r=>[r[0],r]));
    return _brv() + `<h3 id="rv-done">What release 11 did about it</h3>
    <p class="small">Of ${REVIEW_DONE.length} actions: ${c["Done"]||0} done, ${c["Partly done"]||0} partly done, ${c["Drafted"]||0} drafted for sign-off and ${c["Needs people"]||0} that need people or decisions. Ratings above are as reviewed and have not been changed: an independent reviewer should re-rate.</p>
    ${table("tRvDone",{cols:[{k:"r",l:"Role"},{k:"a",l:"Action"},{k:"s",l:"Status"},{k:"n",l:"What was done"}], rows:REVIEW_DONE.map(d=>({r:role[d[0]][1], a:(role[d[0]][7][d[1]]||[])[1]||"", s:d[2], n:d[3]}))})}`; };
  V.build_review.after = () => { _bra && _bra(); renderTable("tRvDone"); }; }
DEFECTS.push(["D29","Ways to recognise showed the wrong tab icon","Tab icon map (found by the new ESLint run in release 11)","The icon map listed the key methods twice; the second entry, left over from the old Safeguards tab, replaced the medal icon with a search icon.","Removed the stale entry.","ESLint no-dupe-keys runs on the assembled script in every pull request","Fixed"],
  ["D30","Splash screen replaced by reassigning a function declaration","Release 9 splash (found by ESLint)","The newer splash overwrote a function declaration, which works but hides which version runs.","Declared as a variable that the newer version replaces on purpose.","ESLint no-func-assign","Fixed"],
  ["D31","Source check missed URLs outside content.js","tools/check_sources.py (found while splitting the code)","URLs in app code, such as the ICO and ATRS links, were never checked.","The check reads every file in src/app.","tests/unit_tools.py checks the ICO link is collected","Fixed"]);
DEFECTS.push(["D32","Escape did not close the Settings panel","Masthead Settings (found by the release 11 keyboard test)","Quick and notifications closed with Escape but Settings did not, and the button did not say whether the panel was open.","Escape closes Settings and returns focus to the button, which now reports aria-expanded.","tests/func11.py opens and closes every masthead panel with the keyboard","Fixed"]);
DEFECTS.push(["D33","Four issue forms and the source-check workflow were invalid YAML","Repository .github (found by the release 11 configuration check)","Unquoted question marks and colons broke the YAML, so GitHub would have hidden the idea, bug, correction and date forms that the Hub links to, and the weekly source check would not run.","Values quoted; the source-check step uses a block scalar.","tools/validate_github.py in every pull request, with a break test in tests/unit_tools.py","Fixed"]);
GH_AUTOMATION[0][2] = "Rebuilds the Hub from its sources and runs ESLint, a check of the GitHub configuration, the name scan, the data schema, unit tests, the accessibility scan, the width test and the keyboard, security and functional tests, plus a Firefox and WebKit smoke test. Fails the change if any check fails.";
GH_AUTOMATION.push(["Uptime check","uptime.yml","Every hour in working hours on weekdays, checks the live address answers and opens or updates an issue if it does not."]);
