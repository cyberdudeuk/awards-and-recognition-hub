/* ================= Release 12: DPIA, ATRS decision, standards and frameworks, browser data ================= */
/* Every source below was opened on 18 October 2026. Statuses are self-assessed by the builder and reviewed by the service owner; none is an external assurance. */

/* ---- Browser storage catalogue (PECR): every key the Hub writes on this device, why, and the exception relied on (K57) ---- */
const STORAGE_CATALOG = [
  ["Settings","acc theme drawer splashNever","Text size, theme, access modes, pages menu, splash screen","Appearance exception (how the Hub looks and works for you)"],
  ["Your work","wfc: wfcur: star: plan planDate mix rubric finder cand ideasLocal","Drafts of nominations, thanks and credits, planner and finder choices, ideas saved before sharing","Strictly necessary: you asked the Hub to keep them"],
  ["Reminders","subs remind notifRead lastVisit bn:","Followed routes, reminders and which notifications you have read","Strictly necessary: you set them up"],
  ["Navigation","tab: seen: recent hist month newsKind ideaKind ideaSort spot:sel exp","Last tab used, pages seen, recently viewed pages and filter choices","Appearance exception; recently viewed pages can be switched off"],
  ["Help and feedback","tourDone: tutManual tutQuiz fb chk","Tours and tutorials completed, page feedback given, last self-check view","Strictly necessary for the help you started"],
  ["Preferences","noRecent","Your choice not to remember recently viewed pages","Strictly necessary to respect your choice"]
];
const STORAGE_SESSION = [["splash","Whether the splash screen has been shown in this browser session","Strictly necessary"]];
const storeKeyKnown = k => STORAGE_CATALOG.some(c=>c[1].split(" ").some(p=>p.endsWith(":")?k.startsWith(p):k===p));
function myStoredKeys(){ const out=[]; try{ for(let i=0;i<localStorage.length;i++){ const k=localStorage.key(i); if(k && k.startsWith("rop:")) out.push(k.slice(4)); } }catch(e){} return out; }
function clearMyBrowserData(){ let n=0; try{ myStoredKeys().forEach(k=>{ localStorage.removeItem("rop:"+k); n++; }); sessionStorage.removeItem("rop:splash"); }catch(e){} return n; }

/* ---- Privacy notice: corrections and additions (replaces the release 11 draft) ---- */
PRIVACY_NOTICE.splice(0, PRIVACY_NOTICE.length,
  ["Who is responsible","The department that runs the Hub is the controller. GitHub hosts the public site; Anthropic hosts the pilot inside claude.ai. Both act for the controller."],
  ["What we publish about award winners","Names, organisation, award and a short citation, only where the award organiser or an official page has already published them, each with a link. We did not collect this from you, so this notice is how we tell you. Ask us to correct or remove an entry and we will act within 5 working days."],
  ["Opt-in profiles (pilot only)","The name, organisation, role, award, short bio and link you enter, with your consent. Your claude.ai account identifier keeps it yours. Remove it at any time. Profiles not updated for 12 months are hidden automatically."],
  ["Ideas and votes (pilot only)","Your idea, its type and area, and your votes, with your account identifier. On the public site, ideas go to GitHub issues instead, which are public under your GitHub username."],
  ["Data kept in your browser","Settings, drafts, reminders and pages you have visited are stored on your device only and never sent to us. See the list and clear it at any time on Help › Privacy and your data."],
  ["AI features (pilot only)","Text is sent to the AI service in your own claude.ai account only when you click an AI button. Follow your department's AI policy and leave out personal details that are not needed. AI is not available on the public site."],
  ["Hosting logs","GitHub logs visitors' IP addresses for security, whether or not they are signed in. GitHub and Anthropic are in the United States; transfers rely on the UK Extension to the EU-US Data Privacy Framework."],
  ["Why we use it","To help people find and meet award deadlines, celebrate recognised work and improve the Hub. It is never used for pay, performance or any decision about you."],
  ["Lawful basis","Public task (UK GDPR Article 6(1)(e)) for the Hub and published winners; consent (Article 6(1)(a)) for opt-in profiles. To be confirmed by the data protection officer."],
  ["How long","Profiles: hidden after 12 months without an update. Ideas: 24 months after a decision (proposed). Winners: the last three award years (proposed). Browser data: until you clear it."],
  ["Your rights","You can ask to see, correct or remove information about you, object to its use, and complain to the Information Commissioner's Office."],
  ["Contact","The service owner, through a content correction on GitHub, or your department's data protection officer. Do not use the idea box for personal matters."]
);
/* D34: the release 11 screening said profiles had no email and phone filter; they did. Corrected. */
{ const r=DPIA_SCREEN.find(x=>x[0].startsWith("Special category")); if(r) r[2]="Free-text profiles and ideas could reveal it. Both block email addresses and phone numbers and warn on identity terms."; }
DPIA_SCREEN.push(["Outcome","Full DPIA done","Build hub › Data protection impact assessment, 18 October 2026"]);

/* ---- DPIA ---- */
const DPIA_META = {date:"2026-10-18", review:"2027-04-18", status:"Draft for the data protection officer", method:"The seven steps of the ICO's DPIA guidance"};
const LV = {Remote:1, Possible:2, Probable:3}, SV = {Minimal:1, Significant:2, Severe:3};
const riskBand = (l,s) => { const x=(LV[l]||0)*(SV[s]||0); return x>=6?"High":x>=3?"Medium":x>=1?"Low":""; };
const DPIA_DATA = [
  ["D1","Award winners: name, organisation, award, citation, source link","Organiser and official pages","Repository and page","Everyone","Both"],
  ["D2","Opt-in profile: name, individual or team, role, organisation, award, bio, link, consent, date updated, account ID","The person","claude.ai shared store","All viewers; editors can hide","Pilot"],
  ["D3","Ideas and votes, with account ID","The person","claude.ai shared store","All viewers","Pilot"],
  ["D4","Moderation: idea status, hidden profiles","Editors","claude.ai shared store","All viewers","Pilot"],
  ["D5","Alert settings: followed routes, reminders, read flags","The viewer","Browser; the person's own store record where the platform allows","The viewer","Both"],
  ["D6","Workflow drafts that can hold a colleague's name and achievements","The viewer","Browser only","The viewer","Both"],
  ["D7","Text sent to AI when the viewer clicks","The viewer","The viewer's own claude.ai account","The viewer","Pilot"],
  ["D8","Gmail drafts and calendar events the viewer creates","The viewer","The viewer's own Google account","The viewer","Pilot"],
  ["D9","GitHub issues and the submitter's username","The person","GitHub, public","Everyone","Production"],
  ["D10","Visitor IP addresses in hosting logs","Automatic","GitHub (for security) and Anthropic","The host","Both"],
  ["D11","Register aggregates and network names; no individuals; small cells suppressed","De-identified source files","Repository and page","Everyone","Both"],
  ["D12","Removed-identifier list (names only)","The service owner","GitHub encrypted secret","Repository admins; never published","Production"]
];
/* [id, risk, data, likelihood, severity, measures, effect, residual likelihood, residual severity, note] */
const DPIA_RISKS = [
  ["R1","Someone in the de-identified register is re-identified from aggregates or network names","D11","Possible","Significant","Aggregates only with small-cell suppression; build-time name scan (K20); independent review planned","Reduced","Remote","Significant",""],
  ["R2","A featured winner objects, or is put at risk because name and workplace appear together","D1","Possible","Significant","Only organiser-published names, each linked; no photos or contact details; removal within 5 working days; Article 14 notice","Reduced","Remote","Significant",""],
  ["R3","Staff feel pressed to publish a profile, so consent is not freely given","D2","Possible","Significant","Optional, never used in performance; consent tick; self-removal; hidden after 12 months without an update","Reduced","Remote","Significant",""],
  ["R4","Free text reveals health, religion or another special category","D2 D3 D9","Possible","Significant","Identity-term warning; email and phone blocked; editors hide; issue forms warn and triage flags","Reduced","Remote","Significant",""],
  ["R5","A nomination draft about a colleague is seen on a shared or lost device","D6","Possible","Significant","Browser only, never sent; notice and one-click clear in Help › Privacy and your data","Reduced","Remote","Significant",""],
  ["R6","A colleague's details are sent to an AI service the department has not approved","D7","Possible","Significant","AI only on click in the viewer's own account; not on the public site; notice to follow departmental AI policy","Reduced","Remote","Significant",""],
  ["R7","Colleagues' ideas and profiles sit in a store under one person's account with no controller-processor agreement","D2 D3 D4","Probable","Significant","Production on GitHub Pages with no shared store; pilot holds no real colleague data until a departmental agreement exists","Reduced when decided","Possible","Significant","Low once the hosting decision is taken"],
  ["R8","Injected script steals what a viewer types","D2 D3 D6","Remote","Significant","Hash-based Content Security Policy; escaping; hostile-input tests (func10)","Reduced","Remote","Significant",""],
  ["R9","The secret list of removed names leaks","D12","Remote","Significant","Encrypted GitHub secret; admins only; never logged or published","Accepted","Remote","Significant",""],
  ["R10","Visitors' IP addresses are logged by the host and transferred to the US","D10","Probable","Minimal","Privacy notice; no analytics or other trackers; UK Extension to the EU-US Data Privacy Framework","Accepted","Probable","Minimal",""],
  ["R11","A public issue names or describes a colleague","D9","Possible","Significant","Issue forms warn; triage flags contact details; maintainers edit or delete","Reduced","Remote","Significant",""],
  ["R12","An award is attributed to the wrong person or team","D1","Possible","Minimal","Source link on every winner; correction form","Reduced","Remote","Minimal",""],
  ["R13","Recognition data is reused for pay, performance or promotion decisions","D1 D2 D6","Possible","Severe","No link to pay or performance systems (ADR-05); purpose statement; K29; HR reward sign-off","Reduced","Remote","Severe",""]
];
const DPIA_SIGNOFF = [["Measures approved by","Service owner","18 Oct 2026","Approved"],["Residual risks approved by","Information asset owner or SIRO","",""],["DPO advice","Data protection officer","",""],["DPO advice accepted or overruled by","Service owner","",""],["Kept under review by","Service owner","Review by 18 Apr 2027","Earlier if the processing changes"]];

/* ---- ATRS decision ---- */
const ATRS_DECISION = {
  outcome:"Not required", date:"2026-10-18",
  tests:[
    ["Is the organisation in scope?","Yes, if a ministerial department runs it","The policy covers ministerial and non-ministerial departments and arm's-length bodies that provide public or frontline services or routinely interact with the public."],
    ["Is it an algorithmic tool?","Yes, for the AI assistant and criteria reviewer","The policy defines an algorithmic tool as a product that supports or solves a specific problem using complex algorithms. The calendar, search and self-checks are ordinary software."],
    ["Significant influence on a decision with public effect?","No","The assistant suggests wording; a person decides and sends. Award decisions are made by organisers, not the Hub. Public effect means an impact on members of the public; the users are civil servants."],
    ["Directly interacts with the general public?","No","AI runs only inside claude.ai for signed-in viewers. On the public GitHub Pages site it is switched off and template versions are used. The policy lists a chatbot for purely internal purposes as out of scope."]
  ],
  revisit:["AI is switched on for the public site","The assistant starts ranking, scoring or shortlisting nominations","The Hub is opened to members of the public, for example for public nominations","An arm's-length body that serves the public adopts it"],
  voluntary:"A short AI transparency statement is published on the AI safeguards page instead."
};

/* ---- Standards and frameworks register (K55): [id, name, applies, status, evidence, gap or action, url] ---- */
const STD_STATUS = ["Met","Partly met","Not met","Not applicable","Decision needed"];
const STANDARDS = [
  ["S01","UK GDPR and Data Protection Act 2018","Yes","Partly met","Full DPIA, privacy notice, data inventory, rights routes","DPO advice and residual-risk acceptance","https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/data-protection-impact-assessments-dpias/how-do-we-do-a-dpia/"],
  ["S02","PECR: storage and access technologies","Yes","Met","Catalogue of every browser key with its exception; clear-data control; opt-out from recently viewed pages; no analytics (K57)","Recheck if analytics are added","https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/"],
  ["S03","Algorithmic Transparency Recording Standard","Checked","Not applicable","Decision recorded: internal tool, no significant influence on decisions with public effect, AI off on the public site","Revisit on any trigger listed","https://www.gov.uk/government/publications/algorithmic-transparency-recording-standard-mandatory-scope-and-exemptions-policy/algorithmic-transparency-recording-standard-atrs-mandatory-scope-and-exemptions-policy"],
  ["S04","Service Standard (14 points)","Yes","Partly met","Self-assessment in the professional review: 2 met, 8 partly, 3 not met, 1 not yet assessable","User research, team, measures","https://www.gov.uk/service-manual/service-standard"],
  ["S05","Technology Code of Practice (13 points)","Yes","Partly met","Assessed point by point below","Purchasing strategy and sustainability need decisions","https://www.gov.uk/guidance/the-technology-code-of-practice"],
  ["S06","Secure by Design (10 principles)","Yes, mandatory for departments","Partly met","Assessed principle by principle below","Named security owner; departmental risk review","https://www.security.gov.uk/policy-and-guidance/secure-by-design/principles/"],
  ["S07","AI Playbook for the UK Government (10 principles)","Yes, for the AI features","Partly met","Assessed principle by principle below","Departmental AI policy check; commercial view","https://www.gov.uk/government/publications/ai-playbook-for-the-uk-government/artificial-intelligence-playbook-for-the-uk-government-html"],
  ["S08","Data and AI Ethics Framework (7 principles)","Yes","Partly met","Assessed principle by principle below","Use the framework's self-assessment tool with the team","https://www.gov.uk/government/publications/data-ethics-framework/data-and-ai-ethics-framework"],
  ["S09","Accessibility regulations 2018 and WCAG 2.2 AA","Yes, internal sites included","Partly met","Automated scan of "+((D.a11y&&D.a11y.scanned)||"every")+" views with "+(D.a11y&&D.a11y.scanned?((D.a11y.critical||0)+(D.a11y.serious||0)+(D.a11y.moderate||0)+(D.a11y.minor||0)):"no")+" issues; keyboard test of every section; draft statement","Manual audit with screen readers before publishing the statement","https://www.gov.uk/guidance/accessibility-requirements-for-public-sector-websites-and-apps"],
  ["S10","Equality Act 2010: public sector equality duty","Yes","Partly met","Equality impact screening below","Confirm with staff networks during research","https://www.legislation.gov.uk/ukpga/2010/15/section/149"],
  ["S11","Government Security Classifications","Yes","Met","All content is OFFICIAL and suitable for publication; no OFFICIAL-SENSITIVE material; the identifier list is held outside the Hub","None","https://www.gov.uk/government/publications/government-security-classifications"],
  ["S12","Open standards and open source","Yes","Partly met","iCalendar, CSV, JSON with a schema, Open Badges 3.0; MIT code and OGL content","Met once the repository is public","https://www.gov.uk/government/publications/open-standards-principles"],
  ["S13","The GDS Way","Yes","Partly met","GitHub, pull requests, continuous integration, linting, tests, Dependabot, CodeQL","Two-person review once the repository exists","https://gds-way.digital.cabinet-office.gov.uk/"],
  ["S14","Government Data Quality Framework","Yes","Partly met","Every event has a source and a verification date; staleness and source checks; schema","Write a short data quality action plan","https://www.gov.uk/government/publications/the-government-data-quality-framework"],
  ["S15","Civil Service Code (impartiality)","Yes","Met","Missions content assessed for impartiality; no party political content","None","https://www.gov.uk/government/publications/civil-service-code"],
  ["S16","Managing Public Money","Yes","Met","No spend; hosting is free; maintenance time modelled","Revisit if any spend is proposed","https://www.gov.uk/government/publications/managing-public-money"],
  ["S17","ICO Children's code","Checked","Not applicable","Users are adults at work","None","https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/"]
];
const TCOP = [
  ["1","Define user needs","Partly met","Needs assumed, not researched; research plan written"],
  ["2","Make things accessible and inclusive","Partly met","Automated and keyboard tests pass; manual audit outstanding"],
  ["3","Be open and use open source","Met once pushed","Public repository under MIT; content under OGL"],
  ["4","Make use of open standards","Met","iCalendar, CSV, JSON Schema, Open Badges 3.0"],
  ["5","Use cloud first","Met","Static hosting on GitHub Pages"],
  ["6","Make things secure","Partly met","CSP, escaping, CodeQL, Dependabot; no IT health check"],
  ["7","Make privacy integral","Partly met","Privacy by design and a full DPIA; DPO advice outstanding"],
  ["8","Share, reuse and collaborate","Partly met","Open repository and data snapshot; not yet shared across government"],
  ["9","Integrate and adapt technology","Met","Plain files and open formats; no lock-in"],
  ["10","Make better use of data","Partly met","Data dictionary, schema and lineage; quality action plan needed"],
  ["11","Define your purchasing strategy","Decision needed","No purchase now; decide whether GitHub and claude.ai are approved for this use"],
  ["12","Make your technology sustainable","Partly met","Static site, no servers; about 919 KB per visit plus fonts, which could be reduced"],
  ["13","Meet the Service Standard","Partly met","See the professional review"]
];
const SBD = [
  ["1","Create responsibility for cyber security risk","Partly met","Service owner named; a security owner is still needed"],
  ["2","Source secure technology products","Partly met","Pinned dependencies with Dependabot; hosting approval needed"],
  ["3","Adopt a risk-driven approach","Partly met","DPIA risk register; no separate security risk assessment"],
  ["4","Design usable security controls","Met","No passwords or sign-in on the public site; clear confirmations before anything is sent"],
  ["5","Build in detect and respond security","Partly met","Uptime check and CodeQL; no security monitoring of the live site"],
  ["6","Design flexible architectures","Met","Static, replaceable host; ordered source parts; open formats"],
  ["7","Minimise the attack surface","Met","No server, no database on the public site, no third-party scripts or fonts"],
  ["8","Defend in depth","Met","Escaping, Content Security Policy and hostile-input tests"],
  ["9","Embed continuous assurance","Met","Self-checks with break tests, CI on every change, weekly source and link checks"],
  ["10","Make changes securely","Partly met","Pull requests and protected main once the repository exists"]
];
const AIPB = [
  ["1","You know what AI is and what its limitations are","Met","AI safeguards page explains limits; template fallbacks"],
  ["2","You use AI lawfully, ethically and responsibly","Partly met","DPIA covers AI; departmental AI policy check needed"],
  ["3","You know how to use AI securely","Partly met","AI cannot read shared text (tested); no AI-specific penetration test"],
  ["4","You have meaningful human control at the right stages","Met","Every AI edit needs acceptance; nothing is sent automatically"],
  ["5","You understand how to manage the full AI life cycle","Partly met","AI can be switched off; no monitoring of answer quality"],
  ["6","You use the right tool for the job","Met","AI only for drafting help; search and templates do the rest"],
  ["7","You are open and collaborative","Met","AI use is labelled and published; open repository"],
  ["8","You work with commercial colleagues from the start","Not met","No commercial view on using claude.ai"],
  ["9","You have the skills and expertise needed","Partly met","Builder and service owner only"],
  ["10","You use these principles alongside your organisation's policies and have the right assurance in place","Partly met","This register; departmental assurance still needed"]
];
const DAIEF = [
  ["Transparency","Met","Sources on every fact; AI labelled; DPIA and decisions published in the Hub"],
  ["Accountability","Partly met","Service owner named; DPO and IAO sign-off outstanding"],
  ["Fairness","Partly met","Hours and popularity rejected as measures; equality screening below; not tested with users"],
  ["Privacy","Partly met","Full DPIA; minimisation; DPO advice outstanding"],
  ["Safety","Met","Human control over AI; hostile-input and security tests"],
  ["Societal impact","Met","Recognition across all professions and the wider public sector"],
  ["Environmental sustainability","Partly met","Static hosting; page weight could be reduced"]
];
const EQIA = [
  ["Disability","Positive, with risk","Easy Read, text-only, text size and keyboard support help. Untested with disabled users; screen reader audit outstanding."],
  ["Age","Neutral","Plain English; no age data used. Nominations cannot use age as a criterion."],
  ["Race, religion or belief, sex, sexual orientation, gender reassignment","Risk of indirect bias","Award schemes may favour visible roles and groups. The Hub flags identity terms, never infers characteristics, and covers all professions and grades."],
  ["Pregnancy and maternity","Positive","Calendar subscriptions and reminders help people on leave not miss deadlines."],
  ["Marriage and civil partnership","Neutral","Not relevant to the processing."]
];
/* ---- Views ---- */
const stPill = s => pill(s, s==="Met"||s==="Met once pushed"?"ok":s==="Not applicable"?"mute":s==="Partly met"?"warn":s==="Decision needed"?"info":"bad");
const simpleTable = (cols, rows) => `<div class="tblwrap"><table><thead><tr>${cols.map(c=>`<th scope="col">${esc(c)}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map((c,i)=>`<td>${i===cols.indexOf("Status")||c==="Met"||c==="Partly met"||c==="Not met"||c==="Decision needed"||c==="Met once pushed"?stPill(c):esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
V.build_dpia = () => { const before={High:0,Medium:0,Low:0}, after={High:0,Medium:0,Low:0};
  DPIA_RISKS.forEach(r=>{ before[riskBand(r[3],r[4])]++; after[riskBand(r[7],r[8])]++; });
  return `<p class="lede">The full data protection impact assessment, following ${esc(DPIA_META.method)}. ${esc(DPIA_META.status)}; review by ${esc(fmt(DPIA_META.review))}.</p>
  <div class="note"><div><strong>Outcome.</strong> Before measures: ${before.High} high, ${before.Medium} medium and ${before.Low} low risks. After measures: ${after.High} high, ${after.Medium} medium and ${after.Low} low. No residual risk is high, so prior consultation with the ICO is not needed. One decision is needed: production runs on GitHub Pages without the shared store (R7).</div></div>
  <h3 id="dp-data">What personal data is involved</h3>${simpleTable(["ID","Data","Source","Where held","Who sees it","Version"], DPIA_DATA)}
  <h3 id="dp-basis">Lawful basis and proportionality</h3><dl class="facts">${PRIVACY_NOTICE.filter(p=>/Lawful|How long|Your rights|Hosting/.test(p[0])).map(p=>`<dt>${esc(p[0])}</dt><dd>${esc(p[1])}</dd>`).join("")}</dl>
  <h3 id="dp-risks">Risks and measures</h3><p class="small">Likelihood (remote 1, possible 2, probable 3) times severity (minimal 1, significant 2, severe 3): 1 to 2 low, 3 to 4 medium, 6 to 9 high. Self-check K56 recomputes every rating.</p>
  ${table("tDpia",{cols:[{k:"id",l:"ID"},{k:"r",l:"Risk"},{k:"b",l:"Before"},{k:"m",l:"Measures"},{k:"a",l:"After"}], rows:DPIA_RISKS.map(r=>({id:r[0], r:r[1], b:riskBand(r[3],r[4])+" ("+r[3]+", "+r[4]+")", m:r[5], a:riskBand(r[7],r[8])+(r[9]?" · "+r[9]:"")}))})}
  <h3 id="dp-sign">Sign-off</h3>${simpleTable(["Item","Role","Date","Outcome"], DPIA_SIGNOFF)}
  <p class="small muted">Sources: <a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/data-protection-impact-assessments-dpias/how-do-we-do-a-dpia/" target="_blank" rel="noopener">ICO: how do we do a DPIA?</a> · <a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/a-guide-to-lawful-basis/public-task/" target="_blank" rel="noopener">ICO: public task</a> · <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages" target="_blank" rel="noopener">GitHub Docs: GitHub Pages</a></p>`; };
V.build_dpia.after = () => renderTable("tDpia");
V.build_standards = () => { const c={}; STANDARDS.forEach(s=>c[s[3]]=(c[s[3]]||0)+1);
  return `<p class="lede">Every standard, framework and duty that applies to the Hub, with its status, the evidence and what is still needed. Self-assessed by the builder and reviewed by the service owner.</p>
  <p class="small">${STANDARDS.length} checked: ${STD_STATUS.map(s=>(c[s]||0)+" "+s.toLowerCase()).join(", ")}.</p>
  ${table("tStd",{cols:[{k:"n",l:"Standard"},{k:"a",l:"Applies"},{k:"s",l:"Status"},{k:"e",l:"Evidence"},{k:"g",l:"Gap or action"}], rows:STANDARDS.map(s=>({n:s[1], a:s[2], s:s[3], e:s[4], g:s[5]}))})}
  <p class="small muted">Sources: ${STANDARDS.map(s=>`<a href="${esc(s[6])}" target="_blank" rel="noopener">${esc(s[1])}</a>`).join(" · ")}</p>
  <h3 id="st-atrs">Algorithmic Transparency Recording Standard: decision</h3>
  <div class="note"><div><strong>${esc(ATRS_DECISION.outcome)}</strong> (decided ${esc(fmt(ATRS_DECISION.date))}). ${esc(ATRS_DECISION.voluntary)}</div></div>
  ${simpleTable(["Test","Answer","Why"], ATRS_DECISION.tests)}
  <p class="small"><strong>Revisit the decision if:</strong></p><ul class="small">${ATRS_DECISION.revisit.map(r=>`<li>${esc(r)}</li>`).join("")}</ul>
  <h3 id="st-tcop">Technology Code of Practice</h3>${simpleTable(["Point","Title","Status","Evidence or gap"], TCOP)}
  <h3 id="st-sbd">Secure by Design</h3>${simpleTable(["Principle","Title","Status","Evidence or gap"], SBD)}
  <h3 id="st-ai">AI Playbook for the UK Government</h3>${simpleTable(["Principle","Title","Status","Evidence or gap"], AIPB)}
  <h3 id="st-ethics">Data and AI Ethics Framework</h3>${simpleTable(["Principle","Status","Evidence or gap"], DAIEF)}
  <h3 id="st-eqia">Equality impact screening</h3><p class="small">Under the public sector equality duty (Equality Act 2010, section 149). To confirm with staff networks during research.</p>${simpleTable(["Characteristic","Likely impact","Why"], EQIA)}`; };
V.build_standards.after = () => renderTable("tStd");
V.help_privacy = () => { const keys=myStoredKeys(); const unknown=keys.filter(k=>!storeKeyKnown(k)); const noRecent=!!store.get("noRecent",false);
  return `<p class="lede">What the Hub knows about you, where it is kept and how to remove it.</p>
  <h3 id="pv-browser">Data in this browser</h3><p>The Hub keeps ${keys.length} item${keys.length===1?"":"s"} on this device. Nothing here is sent to anyone.</p>
  ${simpleTable(["What","Why","Rule it relies on"], STORAGE_CATALOG.map(c=>[c[0],c[2],c[3]]))}
  ${unknown.length?`<p class="small muted">Other items: ${unknown.map(esc).join(", ")}</p>`:""}
  <div class="row" style="flex-wrap:wrap;gap:10px"><button type="button" class="toggle" role="switch" id="pvRecent" aria-checked="${!noRecent}" style="color:var(--ink)"><span class="track"><span class="knob"></span></span><span><strong>Remember recently viewed pages</strong></span></button>
  <button type="button" class="btn ghost" id="pvClear">${ico("s_bad","ico")}<span>Clear all data in this browser</span></button></div><p class="small" id="pvMsg" aria-live="polite"></p>
  <h3 id="pv-notice">Privacy notice</h3><p class="small muted">Draft for the data protection officer.</p><dl class="facts">${PRIVACY_NOTICE.map(r=>`<dt>${esc(r[0])}</dt><dd>${esc(r[1])}</dd>`).join("")}</dl>
  <p class="small">The full assessment is in the Build hub: <a href="#build-dpia">Data protection impact assessment</a>.</p>`; };
V.help_privacy.after = () => { const t=$("#pvRecent"); if(t) t.onclick=()=>{ const on=t.getAttribute("aria-checked")!=="true"; t.setAttribute("aria-checked",String(on)); store.set("noRecent",!on); if(!on) store.set("recent",[]); $("#pvMsg").textContent=on?"Recently viewed pages will be remembered.":"Recently viewed pages are no longer remembered, and the list has been cleared."; };
  const c=$("#pvClear"); if(c) c.onclick=()=>{ if(c.dataset.confirm!=="1"){ c.dataset.confirm="1"; $("#pvMsg").textContent="This removes your drafts, reminders and settings from this browser. Click again to confirm."; return; } const n=clearMyBrowserData(); c.dataset.confirm=""; $("#pvMsg").textContent=n+" items removed. Settings are back to their defaults."; }; };
/* Review statuses after release 12 */
[["PR12",0,"Done","Full DPIA following the ICO's seven steps (Build hub › Data protection impact assessment); DPO advice outstanding"],["PR12",2,"Done","Privacy notice corrected and published in Help › Privacy and your data; DPO to confirm"],["PR19",0,"Done","ATRS not required: internal tool, no significant influence on decisions with public effect, AI off on the public site (Build hub › Standards and frameworks)"]].forEach(([r,i,s,n])=>{ const d=REVIEW_DONE.find(x=>x[0]===r&&x[1]===i); if(d){ d[2]=s; d[3]=n; } });
DEFECTS.push(["D34","Release 11 DPIA screening said profiles had no email and phone filter","Governance drafts (found while writing the full DPIA)","The profile form already blocked email addresses and phone numbers; the screening note was written without checking the code.","Corrected, and the full DPIA states only what the code does.","func12 submits a profile with an email address and checks it is refused","Fixed"]);
/* Voluntary AI transparency statement on the AI safeguards page */
const AI_STATEMENT = [["What the AI does","Suggests wording for nominations, thank-yous and criteria checks, and answers questions about the Hub's own content."],["What it does not do","Decide, rank, score or shortlist anyone; send anything; read other people's ideas or profiles."],["Where it runs","Only inside claude.ai, in the viewer's own account, when they click. It is switched off on the public site."],["Human control","Every suggested edit must be accepted by the person; template versions work without AI."],["Transparency record","Not required under the Algorithmic Transparency Recording Standard (decision of 18 October 2026); this statement is published instead."]];
{ const _ai=V.as_ai, _aia=V.as_ai.after; V.as_ai = () => _ai() + `<h3 id="ai-statement">AI transparency statement</h3><dl class="facts">${AI_STATEMENT.map(r=>`<dt>${esc(r[0])}</dt><dd>${esc(r[1])}</dd>`).join("")}</dl>`; if(_aia) V.as_ai.after=_aia; }
