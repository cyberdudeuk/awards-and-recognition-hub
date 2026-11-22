/* ================= Release 7: architecture (SAD, HLD, LLD), what's new, finder routes ================= */
Object.assign(ICON, {arch:'<rect x="3" y="3" width="7" height="5" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="8.5" y="16" width="7" height="5" rx="1"/><path d="M6.5 8v3h11V8M12 11v5"/>', news:'<path d="M4 5h13v14H6a2 2 0 0 1-2-2z"/><path d="M17 9h3v8a2 2 0 0 1-2 2"/><path d="M7 9h7M7 12h7M7 15h4"/>'});
Object.assign(TAB_ICON, {arch:"arch", news:"news"});
FINDER.push(["R14",["ind","team"],["innov"],["external"],"CSAI"],["R15",["ind","team"],["innov","analysis"],["external"],"DATAC"],["R16",["team"],["innov","place"],["external"],"IESE"],["R17",["team"],["place"],["external"],"LGC"],["R18",["team"],["place"],["external"],"MJ"],["R19",["ind","team"],["place"],["external"],"SPSA"],["R20",["team"],["place"],["external"],"HSJ"]);

// Components: [id, component, responsibility, key functions, data, checks]
const ARCH_COMP = [
  ["C01","Data model","Embedded JSON built at release time from the supplied packs, the de-identified tracker and approved change records.","data.py build(), apply_change_records()","portal-data JSON: events, split calendars, aggregates, registry, releases, changes","K01 to K14, K20, K21"],
  ["C02","Calendar engine","Occurrences, status, reminders and RFC 5545 export, with master and split calendars.","statusOf, occurrences, allOcc, buildICS, makeZip","Events, splits, bounded RRULEs, VALARMs","K01 to K12, K21"],
  ["C03","Workflow engine","Declarative specifications rendered as gated steps with outputs, guidance and cadence.","WF, PROTECT.rules, fieldHTML, wfView, wfAfter, OUT, TEXTS, GUIDE, RHYTHM","Workflow cases in the browser (rop:wfc:*)","K24, K26, K27"],
  ["C04","AI layer","Generative drafting, review and an agentic assistant with page tools, under fixed rules sent with every request.","AI (sample capability), AI_POLICY, ASK_TOOLS*, aiDraft, aiReview","No storage; requests run as the viewer","K25"],
  ["C05","Connect layer","Send and share: deep links, copy formats, files and live connectors, all started by a person.","SHARE_ACTIONS, payloads, SHARE_LINK, liveDo (mcp capability), shareLint","No storage; recipient never kept","K35, K36"],
  ["C06","Recognition knowledge","Methods, roles, lifecycle links, proportionality, innovation, schemes and missions.","METHODS, ROLES, LIFECYCLE, RUBRIC, INNOV, SECTOR_SCAN, MISSION_LINKS","Static content","K28 to K30, K39, K40"],
  ["C07","Shared idea box","Ideas and votes shared between viewers, with per-path access rules.","ideasInit, submitIdea, toggleVote, setStatus (db capability)","db: ideas, votes, triage","Functional tests (func4)"],
  ["C08","Access and signposting","Display modes, Easy Read, text-only, breadcrumbs, tooltips, colour and icons, overflow guard.","applyAcc, enhance, decorate, autoTerms, tabScroller, spillList","Preferences in the browser (rop:acc, rop:theme)","K18, K19, K22, K32 to K34, K37, K38"],
  ["C09","Search and navigation","Ranked search across content, global navigation that folds, drawer, tabs and site map.","searchIndex, drawSearch, fitNav, buildDrawer, render","rop:recent, rop:tab:*","K18, K31"],
  ["C10","Self-verification","Self-checks with negative tests, defect register, adversarial review and checkpoint.","runChecks, runNegatives, DEFECTS, ADVERSARIAL","None","Every check has a negative test"]
];
const ARCH_STORE = [
  ["Browser storage (this viewer only)","rop:wfc:<workflow>, rop:wfcur:<workflow>","Workflow cases and the current case","Per viewer, per browser; can be cleared; never shared"],
  ["Browser storage","rop:acc, rop:theme, rop:drawer, rop:tab:<section>, rop:recent, rop:seen:<page>","Display settings, layout, last tab, recently viewed","Conveniences only"],
  ["Browser storage","rop:plan:*, rop:star:*, rop:mix, rop:rubric, rop:finder, rop:month, rop:fb, rop:tour, rop:tut, rop:cand, rop:exp, rop:hist, rop:chk, rop:idea*","Planner, drafts, tools, tour and tutorial progress, feedback","Conveniences only"],
  ["Shared database (db capability)","ideas, ideas/{self}","Ideas: everyone with access reads; each person writes their own","Rules: read view, write owner; own item write interact"],
  ["Shared database","votes, votes/{self}","Votes: one document per person","Same pattern as ideas"],
  ["Shared database","triage","Idea status set by editors","Write admin"],
  ["Viewer's connectors (mcp capability)","Gmail create_draft; Google Calendar create_event","Drafts and events in the viewer's own account","Each connector asks the viewer before first use"]
];
const ADR = [
  ["ADR-01","One self-contained HTML file","Works offline once opened, is easy to review and hand over, and needs no hosting decision during the pilot.","Shared data needs platform capabilities; no server-side code."],
  ["ADR-02","Personal data out of the published layer","Only aggregates with small-cell suppression and role names are published.","The full register stays in a restricted store with the evidence steward."],
  ["ADR-03","Declarative workflows","New workflows are data, not new screens; the engine enforces gates consistently.","Complex branching needs engine changes."],
  ["ADR-04","A person starts every send","Integrations open the app or copy a format; nothing posts automatically.","Fewer clicks saved; much lower risk of leaks."],
  ["ADR-05","No link to pay or performance systems","Keeps recognition separate from pay decisions and avoids misuse of the evidence.","HR systems need a person to copy evidence across."],
  ["ADR-06","Change control for every calendar change","UIDs are preserved; every change has a record, class, approver and release.","Slower than editing in place; traceable."],
  ["ADR-07","Self-checks inside the artefact","Every release proves its own integrity in the viewer's browser, with negative tests.","Adds code; catches regressions before users do."]
];
const NFR = [
  ["Accessibility","WCAG 2.2 AA target; automated scan of every page in light and dark; Easy Read and text-only versions","K22; manual audit outstanding"],
  ["Responsiveness","No horizontal overflow from 320 px to 1920 px; navigation folds into menus","K18, K38; width test of every page at seven widths"],
  ["Privacy","No personal names, contact details or small cells in the published layer","K09, K14, K16, K20"],
  ["Integrity","Calendar valid to RFC 5545; splits reconcile; change records complete","K01 to K08, K21"],
  ["Currency","Sources re-verified within their cadence; staleness banner after 30 days","K15, K23"],
  ["Security","No secrets in the page; webhook URLs never entered; live connectors run as the viewer","K35, rule I5"],
  ["Impartiality","No party names or slogans in criteria","K39"]
];
function archSVG(){ const b=(x,y,w,h,t,s,k)=>`<g transform="translate(${x},${y})"><rect width="${w}" height="${h}" rx="10" class="flbox fl-${k}"/><text x="${w/2}" y="${h/2-4}" text-anchor="middle" class="fl-t">${t}</text><text x="${w/2}" y="${h/2+16}" text-anchor="middle" class="fl-s">${s}</text></g>`;
  return `<figure class="card flowfig"><svg viewBox="0 0 720 270" role="img" aria-label="System context: people use the Hub page in claude.ai. The page holds its own data and engines. Platform capabilities provide the assistant, downloads, the shared idea box, viewer identity and the viewer's own connectors. External apps are reached only by links the person opens.">
  ${b(10,10,160,70,"People","peers, managers, HR","a")}${b(250,10,220,70,"Hub page","one HTML file, embedded data","b")}${b(550,10,160,70,"External apps","Teams, Outlook, Slack…","c")}
  ${b(130,170,140,70,"Assistant","sample capability","d")}${b(290,170,140,70,"Idea box","db capability","b")}${b(450,170,140,70,"Gmail, Calendar","mcp capability","a")}
  <g class="fl-arrow"><path d="M170 45h76M470 45h76M360 80v40M200 120h340M200 120v46M360 120v46M520 120v46"/><path d="M240 39l6 6-6 6M540 39l6 6-6 6"/></g>
  <text x="508" y="38" text-anchor="middle" class="fl-s">links only</text></svg><figcaption class="small muted">Context (SAD level). Arrows show who starts each interaction; nothing leaves the page without a person's click.</figcaption></figure>`; }
V.svc_arch = () => `<p class="lede">Solution architecture (SAD), high-level design (HLD) and low-level design (LLD) for this release, written from the code itself. Draft for review by the service owner and technical design authority.</p>
  <h3 id="ar-ctx">Context (SAD)</h3>${archSVG()}
  <div class="grid g3"><div class="card stack"><strong>Purpose</strong><p class="small">Help people find, plan and make fair recognition, with verified dates, safeguards and portable evidence through organisational change.</p></div><div class="card stack"><strong>Users</strong><p class="small">Peers, line managers, leaders, HR and reward teams, network leads, evidence stewards, calendar owners.</p></div><div class="card stack"><strong>Boundary</strong><p class="small">No pay, ratings or HR case systems; no personal data in the published layer; no automatic sends.</p></div></div>
  <h3 id="ar-hld">Components (HLD)</h3>${table("tArch",{cols:[{k:"id",l:"ID"},{k:"c",l:"Component"},{k:"r",l:"Responsibility"},{k:"f",l:"Key functions"},{k:"d",l:"Data"},{k:"k",l:"Checks"}],rows:ARCH_COMP.map(a=>({id:a[0],c:a[1],r:a[2],f:a[3],d:a[4],k:a[5]}))})}
  <h3 id="ar-lld">Storage and interfaces (LLD)</h3><div class="tblwrap"><table><thead><tr><th scope="col">Store</th><th scope="col">Keys or paths</th><th scope="col">Holds</th><th scope="col">Access</th></tr></thead><tbody>${ARCH_STORE.map(r=>`<tr>${r.map((c,i)=>`<td${i===1?' class="mono small"':""}>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
  <div class="grid g2"><div class="card stack"><strong>Build pipeline</strong><ol class="small"><li>sanitise.py removes personal data from the supplied copies.</li><li>data.py builds the data model and applies approved change records.</li><li>build.py assembles shell, content and code, runs the name scan twice and adds the QR and barcode colophon.</li><li>Tests: smoke, axe accessibility, seven-width, and five functional suites.</li></ol></div>
  <div class="card stack"><strong>Release ${esc(D.meta.version)}</strong><p class="small">${D.events.length} calendar events, ${Object.keys(D.split).length} split calendars, ${WF_ALL().length} workflows, ${C.sourcesPublic.length} public sources, ${CHECKS.length||"40"} self-checks.</p><p class="small muted">Counts are read from the running page.</p></div></div>
  <h3 id="ar-nfr">Non-functional requirements</h3><div class="grid g2">${NFR.map(n=>`<div class="card stack"><strong>${esc(n[0])}</strong><p class="small">${esc(n[1])}</p><p class="small muted">Evidence: ${esc(n[2])}</p></div>`).join("")}</div>
  <h3 id="ar-adr">Architecture decisions</h3>${table("tAdr",{cols:[{k:"id",l:"ID"},{k:"d",l:"Decision"},{k:"w",l:"Why"},{k:"t",l:"Trade-off"}],rows:ADR.map(a=>({id:a[0],d:a[1],w:a[2],t:a[3]})),search:false})}
  <div class="note warn"><strong>Not yet done.</strong> Service blueprints, a hosting decision for production, a full threat model and a manual accessibility audit. This architecture describes the pilot artefact, not a production service.</div>`;
V.svc_arch.after = () => { renderTable("tArch"); renderTable("tAdr"); };
V.overview_new = () => { const rel=D.releases.slice().reverse().slice(0,4);
  return `<p class="lede">What changed in recent releases, newest first.</p><div class="stack">${rel.map((r,i)=>`<div class="card stack"><div class="row" style="justify-content:space-between;gap:8px"><strong class="mono">${esc(r.v)}</strong>${pill(r.status, r.status==="Current"?"ok":"mute")}</div><p class="small">${esc(fmt(r.date))}</p><p class="small">${esc(r.notes)}</p></div>`).join("")}</div>
  <h3 id="nw-try">Try the newest things</h3><div class="grid g3">
  <a class="card stack" href="#connect-hub">${ico("connect","ico big")}<strong>Connect hub</strong><span class="small muted">Send to Teams, Outlook, Gmail, Slack and more</span></a>
  <a class="card stack" href="#recognition-innovation">${ico("innov","ico big")}<strong>Recognise innovation</strong><span class="small muted">By profession, with guardrails</span></a>
  <a class="card stack" href="#calendar-agenda">${ico("calendar","ico big")}<strong>New scheme dates</strong><span class="small muted">iESE, LGC, MJ, HSJ and Scottish awards</span></a></div>
  <p class="small"><a href="#governance-releases">Full release log</a> · <a href="#governance-change">Change records</a></p>`; };
DEFECTS.push(["D28","Inclusive language check flagged the style guide","Brand kit (found by the release 9 width test)","The voice and tone guidance quotes the terms to avoid, so K32 failed on the brand kit and text-only pages.","Quoted guidance is marked as exempt from the scan; everything else is still scanned.","Width test runs K32 on every page","Fixed"]);
DEFECTS.push(["D27","Knowledge graph failed on routes it did not list","Knowledge graph (found by the release 7 smoke test)","The graph drew a fixed list of seven routes, so the new CR-004 routes broke it with a script error.","Routes are now read from the calendar; new routes get scopes. Check K41 fails if a calendar route has no name or no place in the graph.","K41 with a negative test","Fixed"]);
DEFECTS.push(["D26","Route finder could not suggest innovation or place-based schemes","Route finder","The finder had no question option for innovation, digital or AI, or for work with councils, the NHS or Scotland, so the new routes R14 to R20 were unreachable.","Two options and seven finder rules added.","Functional test: finder returns R14 for innovation","Fixed"]);

