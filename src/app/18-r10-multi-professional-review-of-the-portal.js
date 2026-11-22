/* ================= Release 10: multi-professional review of the Hub and how it was built (Build hub) ================= */
/* Evidence figures are measured from the build of v2026.10.18.9 on 18 October 2026 unless a row says otherwise. */
const REVIEW_META = {date:"2026-10-18", build:"v2026.10.18.9", method:"Desk review of the published page, its source, its tests and its repository, written by the same AI that built it. Every rating is a self-assessment and is labelled as one. None of it replaces a GDS service assessment, an IT health check, a DPIA or an accessibility audit by people who did not build it."};
const REVIEW_FACTS = [
  ["Size","One HTML file of 858,959 bytes with data, styles and script inlined; about 1,150 page elements on load"],
  ["Speed (measured once, local file)","First paint 696 ms and load 947 ms at desktop size; 910 ms to interactive on a phone-sized window with the processor slowed four times. Not measured over a real network"],
  ["Code","app.js 3,114 lines with 354 top-level declarations in one global scope; content.js 474 lines; shell.html 656 lines"],
  ["Releases","9 builds in 2 days (17 to 18 October 2026)"],
  ["Self-checks","49 checks run in the browser, each with at least one deliberate-break test (54 in all)"],
  ["Defects","28 logged and fixed, each with a check that would catch it again"],
  ["Tests","11 browser test scripts (accessibility on 220 page views in light and dark, seven screen widths, 9 functional suites); 146 fixed waits; no unit tests; no linter"],
  ["Rendering","57 places write HTML directly; 633 calls to the escaping helper"],
  ["Outside dependencies","Google Fonts (2 references); no Content Security Policy"],
  ["Stored in the browser","Workflow cases, reminders and settings in localStorage only; ideas, votes and opt-in profiles in the shared store"],
  ["Repository","Prepared with 9 workflows, issue forms and labels; not yet pushed, so GitHub Pages is not live"],
  ["Build scratch files","11 of the 17 feature files used to assemble app.js no longer match it; app.js is the only copy kept in the repository"]
];
/* [id, role, profession framework, the question they ask, rating, strengths[], concerns[], actions[[when, action, owner]], evidence ids[]] */
const REVIEW = [
  ["PR01","Service owner","GDS Service Standard; Civil Service product and delivery","Is this solving a real problem, for whom, and who keeps it running?","Fair",
   ["A clear purpose and boundaries (About the portfolio, What it is not, theory of change)","Every number traces to a source or is labelled modelled","An operating rhythm with owners by role, so continuity does not rest on one person"],
   ["No named service owner or budget; owners are roles, not people","No evidence yet that nominators or managers want a portal rather than a calendar and a template","Nine releases in two days is faster than any governance can absorb"],
   [["Now","Name an accountable owner and a deputy before going live","Sponsoring director"],["Now","Agree success measures (for example nominations submitted on time, routes used) and a baseline","Service owner"],["Next","Run a short discovery with 8 to 12 people from the main audiences","Service owner and user researcher"]],
   ["Releases","Repository"]],
  ["PR02","Product manager","DDaT product manager","Is the scope right and is the backlog driven by value?","Fair",
   ["Release notes, roadmap, not-planned list and a backlog exist","Idea box and wishlist feed GitHub issues, the standard backlog","Each feature has a self-check, so scope creep is at least visible"],
   ["Scope grew with every request: 9 sections, about 220 page views, 20 recognition domains, 27 integrations","No prioritisation by user value; most features came from one stakeholder's requests","Several features (deck, media centre, banner maker) duplicate tools people already have"],
   [["Now","Define a minimum lovable product: the 5 to 8 pages that the main tasks need","Product manager"],["Next","Hide or retire features with no use after the pilot, using page feedback and analytics","Product manager"],["Next","Score the backlog by value and effort in the GitHub project","Product manager"]],
   ["Releases","Size"]],
  ["PR03","Delivery manager","DDaT delivery manager","Is the work flowing safely and predictably?","Fair",
   ["Small, logged releases with change records and a checkpoint","Automated build, test and release workflows prepared","Defects tracked to closure with a regression check"],
   ["No team: one requester and one AI builder, so no separation of duties","No sprint rhythm, review or retrospective with users","Live deployment blocked on a repository that does not exist yet"],
   [["Now","Create the repository and run the first pipeline end to end","Delivery manager"],["Next","Move to a fortnightly release with a show and tell","Delivery manager"],["Next","Require a second person to approve pull requests","Delivery manager"]],
   ["Repository","Releases"]],
  ["PR04","User researcher","DDaT user researcher","What evidence is there that this works for real people?","Poor",
   ["Personas, journeys and role pages show intent to design for users","Page feedback control on every page","Easy Read, text-only and accessibility modes were planned in, not added later"],
   ["No research with users at any stage; personas are assumptions","Easy Read has not been tested with people who use Easy Read","The restructure was not tree-tested or card-sorted"],
   [["Now","Label personas and journeys as assumptions until tested","User researcher"],["Next","Five moderated usability sessions on the top three tasks before go-live","User researcher"],["Next","Tree test the nine sections with at least 30 participants","User researcher and content designer"],["Later","Test Easy Read with a user group, paid at the going rate","User researcher"]],
   []],
  ["PR05","Content designer","GOV.UK style; Civil Service content design","Can people understand it and find what they need?","Fair",
   ["Plain-English, inclusive-language and accessible-name checks run on every page","Glossary tooltips, reading time, a lay What's new","Style guide with words to avoid and a voice section"],
   ["About 220 views is a lot of content to keep accurate; staleness is the main risk","Some pages still read like specification documents","Repeated explanations across workflows, guide and tours"],
   [["Now","Give every page an owner and a review date","Content designer"],["Next","Cut or merge pages with low use after the pilot","Content designer"],["Next","Pair-write the top ten pages with a subject expert","Content designer"]],
   ["Self-checks"]],
  ["PR06","Interaction and UX designer","DDaT interaction designer","Is it intuitive and consistent?","Fair",
   ["Consistent masthead, Pages menu, tabs and Settings; no horizontal scroll at seven widths","Familiar patterns: search bar, notifications bell, off-canvas menu on phones","Order of precedence on every page"],
   ["Visual richness (glass, eight hues, an icon on every card) adds noise and may not suit a government brand","Many ways to do the same thing (search, Quick, Ask, Pages menu, site map)","Not built with the GOV.UK Design System, so familiar government patterns are only approximated"],
   [["Next","Decide brand: GOV.UK Design System, departmental brand or this one","Design lead"],["Next","Remove one of the overlapping entry points after usability testing","Interaction designer"],["Later","Offer a plain mode as the default if testing shows the decoration distracts","Interaction designer"]],
   ["Size"]],
  ["PR07","Accessibility specialist","WCAG 2.2 AA; Public Sector Bodies Accessibility Regulations 2018","Does it meet the regulations, and would a disabled person be able to use it?","Fair",
   ["Automated scan with axe-core on 220 views in light and dark: 0 issues","Checks for reduced motion, pause controls, target size and contrast","Accessibility statement drafted; text-only and Easy Read versions"],
   ["Automated tools find only part of the problems; no manual audit and no screen reader testing","The statement is a draft and cannot claim compliance without an audit","Dynamic panels (search, Quick, Settings, share) need checks with real assistive technology"],
   [["Now","Keep the statement as a draft; do not claim conformance","Accessibility lead"],["Next","Manual audit against WCAG 2.2 AA, including NVDA, JAWS, VoiceOver and keyboard only","Accessibility specialist"],["Next","Fix and retest before go-live; publish the statement with known issues","Accessibility specialist"]],
   ["Tests"]],
  ["PR08","Front-end developer","DDaT front-end developer","Can someone else maintain this code?","Poor",
   ["No framework or build tools to break; it runs from a single file","Escaping helper used widely; a self-check for every feature","Accessible names, focus handling and keyboard shortcuts considered"],
   ["3,114 lines and 354 declarations in one global scope; later features override earlier ones","Features were added by inserting text into app.js, and 11 of 17 scratch copies have drifted","57 places write HTML directly; one missed escape is a script injection","No unit tests, linter or type checks"],
   [["Now","Treat src/app.js as the only source; delete the scratch feature files","Developer"],["Next","Split into ES modules by section with a simple bundler","Developer"],["Next","Add ESLint and a rule that flags HTML writes without the escaping helper","Developer"],["Later","Unit tests for the data, calendar and check functions","Developer"]],
   ["Code","Rendering","Build scratch files"]],
  ["PR09","Technical architect","DDaT technical architect; Technology Code of Practice","Is the design fit for purpose, secure and open?","Fair",
   ["Static hosting: very small attack surface and almost no running cost","Architecture decisions, non-functional requirements and component maps written up","Open source repository and open data snapshot, in line with the Technology Code of Practice"],
   ["A single 859 KB file grows with every release; everyone downloads every page","Shared data only works inside claude.ai; on GitHub Pages ideas, votes and profiles have no store","Workflow cases live in one browser and are lost if it is cleared"],
   [["Now","Record the GitHub Pages limitations in an architecture decision","Technical architect"],["Next","Choose a store for shared data on Pages (GitHub issues only, or a small approved back end)","Technical architect"],["Next","Split data from code and load it on demand","Technical architect and developer"]],
   ["Size","Stored in the browser","Repository"]],
  ["PR10","Quality and test engineer","DDaT test engineer","Would the tests catch the next regression?","Fair",
   ["Every defect has a regression check and every check has a break test","Accessibility, widths and functional suites cover all pages","Tests run in the pipeline on every pull request"],
   ["146 fixed waits make tests slow and flaky on slower runners","Tests were written by the builder, after the feature, so they confirm rather than challenge","No cross-browser testing (Chromium only) and no real devices"],
   [["Next","Replace fixed waits with waits for a condition","Test engineer"],["Next","Add Firefox and WebKit runs","Test engineer"],["Later","Exploratory testing sessions by someone new to the Hub","Test engineer"]],
   ["Tests"]],
  ["PR11","Security engineer","NCSC guidance; Government Cyber Security Strategy; Secure by Design","What could an attacker or a careless user do?","Fair",
   ["No secrets in the page; webhook URLs are never entered","Live connectors only create drafts and need a click","CodeQL, Dependabot and a security policy prepared for the repository"],
   ["No Content Security Policy; outside font host loaded on every visit","Direct HTML writes plus content from the shared store is a possible injection path","A public repository with an MIT licence can be cloned into a convincing look-alike","Fork pull requests cannot read the name scan secret, so they always fail K20"],
   [["Now","Add a strict Content Security Policy and host the fonts locally","Security engineer and developer"],["Now","Review every place shared-store text is shown for escaping","Security engineer"],["Next","Document the fork pull request behaviour and run the scan only on trusted branches","Security engineer"],["Next","Add a clear 'official address' notice and report-a-copy route","Service owner"]],
   ["Outside dependencies","Rendering","Repository"]],
  ["PR12","Data protection and information governance","UK GDPR; Data Protection Act 2018; ICO guidance","Is personal data handled lawfully and minimally?","Fair",
   ["Personal data removed from the source files and checked by a build-time scan","Public names only from organiser pages, each with a link","Opt-in profiles with consent, removal by the person and an editor hide"],
   ["No DPIA; showing named winners and profiles is processing that needs a lawful basis","The de-identification has not been reviewed by anyone independent","The name scan only works when a secret holds the list, and the list itself is personal data"],
   [["Now","Complete a DPIA screening before go-live","Data protection officer"],["Now","Independent review of the de-identification","Information governance"],["Next","Privacy notice for profiles and the idea box","Data protection officer"]],
   ["Stored in the browser"]],
  ["PR13","Data architect and analyst","Government Data Quality Framework; open standards","Is the data accurate, structured and reusable?","Good",
   ["Data dictionary, taxonomy, traceability and an open data snapshot","Every event has a source and verification date; candidates kept separate","Standard formats: iCalendar, CSV, JSON, Open Badges 3.0"],
   ["Data is entered by hand from organiser websites and will go stale","Scheme dates for 2027 depend on pages that are not yet published"],
   [["Next","Turn on the weekly source and staleness workflows","Data owner"],["Later","Publish the snapshot with a version and a schema","Data architect"]],
   ["Releases"]],
  ["PR14","Performance analyst","DDaT performance analyst","How will we know it is working?","Poor",
   ["Page feedback control on every page","Release notes record what changed and when"],
   ["No analytics, no baseline and no success measures","No way to see which pages are used, so nothing can be retired with evidence"],
   [["Now","Agree three to five measures with the service owner","Performance analyst"],["Next","Add privacy-friendly analytics with consent, or count GitHub Pages traffic","Performance analyst"],["Next","Monthly report of measures to the service owner","Performance analyst"]],
   []],
  ["PR15","HR, reward and recognition policy","Civil Service pay remit guidance; HMRC rules; departmental reward policy","Does it reflect policy, and could it mislead people about pay?","Fair",
   ["Pay and reward content checked against the 2026 to 2027 pay remit guidance and HMRC rules, with sources","Proportionality rubric rejects hours worked and popularity as measures","Reward proposals stay proposals; nothing promises money"],
   ["Departmental schemes differ; a portal can only describe the general rules","Rubric bands may be read as entitlements","No sign-off by HR policy or reward specialists"],
   [["Now","HR policy review of the Recognition and pay pages","Head of reward"],["Next","Add 'check your department's policy' to every pay item","Content designer"]],
   []],
  ["PR16","Internal communications","Government Communication Service; Civil Service Code","Is it on brand, impartial and safe to share?","Fair",
   ["Share dialog with a privacy check and a confirmation tick","Brand kit, media guidance and a comms toolkit","Missions content assessed for impartiality"],
   ["An original logo and palette sit outside departmental branding","Banner maker and deck can produce unofficial-looking material"],
   [["Next","Agree branding with the comms team before launch","Head of internal comms"],["Next","Add 'not an official announcement' to generated banners","Content designer"]],
   []],
  ["PR17","Legal and commercial","Copyright; licensing; procurement","Are the content, licences and third-party links sound?","Fair",
   ["Third-party schemes linked, not copied; sources attributed","MIT licence chosen for code; no paid dependencies"],
   ["Licence for content (not code) not stated; Open Government Licence would be usual","Third-party trademarks (Teams, Slack, Google) in integration pages"],
   [["Now","Add the Open Government Licence v3.0 for content","Legal"],["Next","Review integration pages for trademark use","Legal"]],
   ["Repository"]],
  ["PR18","Site reliability and operations","DDaT site reliability engineer","Who fixes it at 9am on a deadline day?","Fair",
   ["Static site: little can fall over","Scheduled checks open issues when sources, links or dates go stale","Maintenance guide and issue forms"],
   ["No support model or service level for the live site","Workflows depend on one personal GitHub account","No monitoring of the live address"],
   [["Now","Move the repository to an organisation account with two admins","Service owner"],["Next","Add an uptime check and an on-call contact for deadline weeks","Operations"]],
   ["Repository"]],
  ["PR19","AI and automation assurance","Generative AI Framework for HMG; Algorithmic Transparency Recording Standard","Is AI use transparent, controlled and accountable?","Fair",
   ["AI rules published in the Hub; AI edits need acceptance; template fallbacks","Ask assistant labelled and grounded in Hub content","Live connectors create drafts only"],
   ["The Hub itself was built almost entirely by AI with one reviewer","An algorithmic transparency record has not been considered","Prompt injection through shared-store text reaching the assistant has not been tested"],
   [["Next","Decide if an Algorithmic Transparency Recording Standard record is needed","AI lead"],["Next","Red-team the assistant with injected text in ideas and profiles","Security engineer"]],
   ["Releases"]],
  ["PR20","Senior responsible owner or finance","Managing Public Money; spending controls","Is it value for money and within controls?","Good",
   ["Almost no running cost on GitHub Pages","No licences or contracts"],
   ["Hidden cost is people's time to keep content current","Digital spend controls may apply if it becomes a live service"],
   [["Next","Estimate the yearly maintenance time and agree who funds it","Senior responsible owner"]],
   ["Size"]]
];
const REVIEW_RATINGS = {Good:"ok", Fair:"warn", Poor:"bad"};
/* Build and development process against the GDS service lifecycle and the Service Standard (self-assessed) */
const REVIEW_PHASES = [
  ["Discovery","Skipped","Requirements came from one stakeholder and four attached files; no user research"],
  ["Alpha","Partly","Many ideas built and kept rather than tested and thrown away; the restructure in release 9 is the first sign of iteration"],
  ["Private beta","Not started","Runs as a private artifact; no real users yet"],
  ["Public beta and live","Not started","Repository prepared; GitHub Pages not live; no support model"]
];
const REVIEW_STANDARD = [
  ["1","Understand users and their needs","Not met","No research"],
  ["2","Solve a whole problem for users","Partly","Covers find, plan, nominate and thank; does not reach departmental HR systems"],
  ["3","Provide a joined-up experience across all channels","Partly","Calendar files, email and chat drafts; not tested end to end"],
  ["4","Make the service simple to use","Not yet assessable","Needs usability testing"],
  ["5","Make sure everyone can use the service","Partly","Automated checks pass; no manual audit"],
  ["6","Have a multidisciplinary team","Not met","One requester and an AI builder"],
  ["7","Use agile ways of working","Partly","Small releases; no user feedback loop"],
  ["8","Iterate and improve frequently","Met","Nine releases with change records"],
  ["9","Create a secure service which protects users' privacy","Partly","Privacy design strong; no CSP, DPIA or health check"],
  ["10","Define what success looks like and publish performance data","Not met","No measures"],
  ["11","Choose the right tools and technology","Partly","Static site suits it; single file will not scale"],
  ["12","Make new source code open","Met once pushed","Public repository prepared under MIT"],
  ["13","Use and contribute to open standards, components and patterns","Partly","Open formats used; GOV.UK Design System not used"],
  ["14","Operate a reliable service","Partly","Scheduled checks; no owner, support or monitoring"]
];
/* Adversarial view: the strongest case against, answered from the evidence. [id, claim, strongest form, response, residual, verdict] */
const REVIEW_ADV = [
  ["RA1","Nobody asked for this","A calendar, a spreadsheet and an email template would meet the need; a 220-page portal is a solution looking for a problem.","The source pack did contain a calendar, a tracker and guidance; the Hub joins them. But no user has said they want more than that.","Holds until research shows otherwise. Strip back to the core tasks if it does not.","Holds"],
  ["RA2","It grades its own homework","The same AI wrote the features, the tests, the checks and this review. 49 passing checks only prove it agrees with itself.","Break tests show the checks can fail, and outside tools (axe-core, CodeQL) are used. But no independent person has reviewed it.","Independent review is the only answer.","Holds"],
  ["RA3","It will go stale and mislead people","Hand-entered dates from outside websites will be wrong within months; a confident portal with wrong deadlines is worse than none.","Every date has a source and a verification date, and weekly staleness and source workflows open issues. They only help if someone acts on them.","Depends on a named owner.","Partly holds"],
  ["RA4","It is unmaintainable","3,114 lines in one scope, built by pasting text into a file, with drifting copies. The next developer will rewrite it.","The repository keeps one source file and tests guard behaviour. The structure is still poor.","Refactor into modules before handing over.","Holds"],
  ["RA5","Publishing names is a privacy risk","Showing named winners and profiles could expose people or be scraped.","Names come only from organiser pages that already publish them, each linked; profiles need consent. No DPIA has confirmed the lawful basis.","DPIA needed.","Partly holds"],
  ["RA6","Recognition can be gamed","Votes, opt-in profiles and the idea box invite self-promotion and campaigning; a spotlight rewards visibility, not merit.","Hours and popularity are rejected as measures, votes do not decide awards, and editors can hide profiles. Abuse has not been tested.","Moderate in practice and watch for patterns.","Partly holds"],
  ["RA7","It looks official when it is not","An original logo and polished design, in a public repository anyone can copy, could be mistaken for an official departmental service.","The footer carries disclaimers and the Hub says what it is not. Branding has not been agreed.","Agree branding and publish the official address.","Partly holds"],
  ["RA8","Accessibility is claimed, not proven","Zero axe issues means little; automated tools miss most barriers.","The Hub does not claim conformance and the statement is a draft.","Manual audit before go-live.","Partly holds"],
  ["RA9","The AI features are a liability","An assistant giving wrong advice on pay or awards could be relied on.","The assistant is grounded in Hub content, labelled, and says when it does not know; pay pages point to official sources. Not red-teamed.","Red-team and keep the label.","Partly holds"],
  ["RA10","Speed traded off governance","Nine releases in two days means change control was a formality.","Each release has a record, a test run and a checkpoint, but the approver and builder sit in one conversation.","Two-person approval in GitHub.","Holds"]
];
const REVIEW_ABUSE = [
  ["Injected script in an idea or profile","Shared-store text written into the page","Escaping helper; review every direct HTML write; Content Security Policy","Partly mitigated"],
  ["Instructions hidden in an idea to steer the assistant","Ask reading shared text","Treat shared text as data; red-team","Not tested"],
  ["Spam ideas flooding GitHub issues","Issue forms are public","Issue forms need a GitHub account; triage workflow labels; rate limits by GitHub","Partly mitigated"],
  ["Look-alike copy collecting details","Public MIT repository","Official address notice; no login or payment in the Hub","Partly mitigated"],
  ["Fake winner added to the spotlight","Pull request to public_winners.json","Every winner needs an HTTPS source (K46); code owner review","Mitigated if review is enforced"],
  ["Share link used for phishing","Prefilled mail and chat links","Drafts only; the person sends from their own account","Mitigated"]
];
const REVIEW_TOP = [
  ["Now","Name a service owner and move the repository to an organisation account with two admins"],
  ["Now","Push the repository, set the name scan secret and run the pipeline once"],
  ["Now","DPIA screening and an independent check of the de-identification"],
  ["Now","Add a Content Security Policy, host fonts locally and review direct HTML writes"],
  ["Next","Five usability sessions and a tree test on the nine sections"],
  ["Next","Manual accessibility audit with assistive technology"],
  ["Next","Agree success measures and add consented analytics"],
  ["Next","HR policy and comms sign-off for pay and branding"],
  ["Next","Split app.js into modules and replace fixed waits in tests"],
  ["Later","Retire pages with no use after the pilot"]
];
const REVIEW_LIST = () => REVIEW.map(r=>r.slice());
V.build_review = () => {
  const n = {Good:0,Fair:0,Poor:0}; REVIEW.forEach(r=>n[r[4]]++);
  const vc = {}; REVIEW_ADV.forEach(a=>vc[a[5]]=(vc[a[5]]||0)+1);
  const factById = Object.fromEntries(REVIEW_FACTS.map(f=>[f[0],f[1]]));
  return `<p class="lede">How the Hub and the way it was built look to the twenty kinds of professional who would normally build, assure and run a service like this, followed by the strongest case against it.</p>
  <div class="note"><div><strong>Self-assessment.</strong> ${esc(REVIEW_META.method)} Reviewed ${esc(fmt(REVIEW_META.date))} against ${esc(REVIEW_META.build)}.</div></div>
  <h3 id="rv-verdict">Verdict</h3>
  <div class="grid g3">
    <div class="card stack"><strong>The product</strong><p class="small">Unusually thorough on traceability, privacy design and self-checking for something this young. Content is sourced and labelled.</p></div>
    <div class="card stack"><strong>The process</strong><p class="small">Fast and well logged, but it skipped discovery, has no team and no users, and the builder also tested and reviewed it.</p></div>
    <div class="card stack"><strong>Ready to go live?</strong><p class="small">Not yet. Fit for a private beta with a named owner once the four <em>Now</em> actions below are done.</p></div>
  </div>
  <p class="small">${n.Good} roles rate it good, ${n.Fair} fair and ${n.Poor} poor. Of ${REVIEW_ADV.length} adversarial arguments, ${vc["Holds"]||0} hold, ${vc["Partly holds"]||0} partly hold and ${vc["Rebutted"]||0} are rebutted.</p>
  <h3 id="rv-top">Ten actions that matter most</h3><ol class="stack">${REVIEW_TOP.map(t=>`<li>${pill(t[0],t[0]==="Now"?"bad":t[0]==="Next"?"warn":"mute")} ${esc(t[1])}</li>`).join("")}</ol>
  <h3 id="rv-facts">Evidence used</h3><div class="tblwrap"><table><thead><tr><th scope="col">Measure</th><th scope="col">Finding</th></tr></thead><tbody>${REVIEW_FACTS.map(f=>`<tr><td>${esc(f[0])}</td><td>${esc(f[1])}</td></tr>`).join("")}</tbody></table></div>
  <h3 id="rv-roles">By profession</h3>
  <div class="stack">${REVIEW.map(r=>`<details class="card"><summary><strong>${esc(r[1])}</strong> ${pill(r[4],REVIEW_RATINGS[r[4]])} <span class="small muted">${esc(r[3])}</span></summary>
    <p class="small muted">Lens: ${esc(r[2])}</p>
    <div class="grid g2"><div><strong class="small">Working well</strong><ul class="small">${r[5].map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>
    <div><strong class="small">Concerns</strong><ul class="small">${r[6].map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div></div>
    <strong class="small">Actions</strong><ul class="small">${r[7].map(a=>`<li>${pill(a[0],a[0]==="Now"?"bad":a[0]==="Next"?"warn":"mute")} ${esc(a[1])} <span class="muted">(${esc(a[2])})</span></li>`).join("")}</ul>
    ${r[8].length?`<p class="small muted">Evidence: ${r[8].map(e=>esc(e+": "+(factById[e]||""))).join("; ")}</p>`:`<p class="small muted">Evidence: absence of the activity this role would expect.</p>`}
  </details>`).join("")}</div>
  <h3 id="rv-process">The build process</h3>
  <p class="small">Against the GDS service lifecycle:</p>
  <div class="tblwrap"><table><thead><tr><th scope="col">Phase</th><th scope="col">Status</th><th scope="col">Why</th></tr></thead><tbody>${REVIEW_PHASES.map(p=>`<tr><td>${esc(p[0])}</td><td>${esc(p[1])}</td><td>${esc(p[2])}</td></tr>`).join("")}</tbody></table></div>
  <p class="small">Against the 14 points of the Service Standard (self-assessed, not an assessment):</p>
  ${table("tRvStd",{cols:[{k:"n",l:"Point"},{k:"p",l:"Standard"},{k:"s",l:"Status"},{k:"w",l:"Why"}], rows:REVIEW_STANDARD.map(s=>({n:s[0],p:s[1],s:s[2],w:s[3]}))})}
  <div class="grid g2">
    <div class="card stack"><strong>What the process did well</strong><ul class="small"><li>Every release recorded, tested and reversible</li><li>Every defect turned into a check that fails if it returns</li><li>Facts sourced; modelled or unverified items labelled</li><li>Privacy designed in from the first build</li></ul></div>
    <div class="card stack"><strong>What it got wrong</strong><ul class="small"><li>Built before learning: no discovery or user research</li><li>Requests were added, rarely questioned or removed</li><li>One builder wrote the code, the tests and the review</li><li>Text-insertion patching left drifting copies of the code</li></ul></div>
  </div>
  <h3 id="rv-adv">Adversarial view</h3>
  <p class="small">The strongest case a sceptical reviewer would make, answered from the evidence, with what is left over.</p>
  ${table("tRvAdv",{cols:[{k:"c",l:"Claim"},{k:"s",l:"Strongest form"},{k:"r",l:"Response"},{k:"l",l:"What remains"},{k:"v",l:"Verdict"}], rows:REVIEW_ADV.map(a=>({c:a[1],s:a[2],r:a[3],l:a[4],v:a[5]}))})}
  <h4 id="rv-abuse">Abuse cases</h4>
  <div class="tblwrap"><table><thead><tr><th scope="col">Abuse</th><th scope="col">Route in</th><th scope="col">Defence</th><th scope="col">Status</th></tr></thead><tbody>${REVIEW_ABUSE.map(a=>`<tr>${a.map(c=>`<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
  <div class="note"><div><strong>Base rate (judgement, not measured here).</strong> A common pattern in government digital work is that internal portals built ahead of user research are under-used, and their content goes stale unless someone owns it. This Hub's checks reduce the second risk but do nothing for the first. The single most useful next step is to put the core tasks in front of five real nominators.</div></div>`;
};
V.build_review.after = () => { renderTable("tRvStd"); renderTable("tRvAdv"); };
