/* ================= Release 9b: information architecture review (Build hub) ================= */
const IA_SECTIONS = [
  ["1","Home","Everyone","What closes soon, highlights, the spotlight and what's new. Most people start and finish here."],
  ["2","Workflows","Anyone doing something","Nominate, thank, credit and the other guided tasks."],
  ["3","Recognition","Anyone deciding how to recognise","Ways to recognise, pay and reward, role pages and themes such as innovation and domains."],
  ["4","Calendar","Nominators and planners","Agenda first, then alerts, month and timeline views, the planner and calendar files."],
  ["5","Awards","Nominators","Route finder first, then the route register, public sector schemes and comparisons."],
  ["6","Connect","Communicators and channel owners","Sending recognition, then integrations, then brand, media and deck."],
  ["7","Evidence","Evidence stewards and network leads","The register and the safeguards that protect people, together."],
  ["8","Help","Anyone stuck","Guide, tours, tutorials, ideas, glossary, sources, site map and accessible versions."],
  ["9","Build hub","Specialists","Releases, architecture, governance, data standards, assurance and automation."]
];
const IA_MOVES = [
  ["North Star, What it is not, Theory of change","Three separate Overview tabs","Home › About the portfolio","Merged: one page about purpose and boundaries"],
  ["This fortnight","Overview tab","Calendar › Agenda and the front page deadlines","Removed duplicate; old address redirects"],
  ["Public sector schemes","Recognition","Awards › Public sector schemes","Sits with the other awards and routes"],
  ["Register and Safeguards","Two sections","Evidence","Merged: the evidence and the rules that protect it belong together"],
  ["Glossary and Sources","Knowledge","Help › Reference","Everyday reference for everyone"],
  ["Taxonomy, data dictionary, traceability, knowledge graph, open data","Knowledge","Build hub › Data and standards","Specialist material"],
  ["Service design, architecture, requirements, backlog","Service design","Build hub › Architecture and design","Specialist material"],
  ["Deployment checklist, change control, source registry, release log, automation","Governance","Build hub","Specialist material"],
  ["Self-checks, defects, adversarial review, AI safeguards, de-identification, checkpoint","Assurance","Build hub › Assurance","Specialist material; the health badge is in Settings"],
  ["What's new","Technical release notes","Plain-language news cards; the release log is in the Build hub","Written for everyone"],
  ["Quick launch","Floating button beside Ask, plus a bar on the front page","One Quick button in the masthead, anchored under it","Bottom right is only for Ask; no duplicate Ask item"],
  ["Theme, text size, access, help, health badge, contents switch","Separate masthead buttons","One Settings panel","Makes room for a search bar"]
];
const IA_RULES = [
  ["Order of precedence on every page","Most important first: what needs action, then how to do it, then reference, then housekeeping (method, sources, design) last."],
  ["One home for each thing","Content appears in one place and is linked from elsewhere, never copied. Search ranks everyday pages above specialist ones."],
  ["Pages menu","The left-hand menu lists every page in the section, grouped, with counts and New flags, and the headings of the page you are on. On wide screens it collapses to an icon rail; on phones it opens from the Pages button and closes with Esc or a tap outside."],
  ["Tabs","Tabs show the main pages of a section; the menu also shows grouped and less-used pages."],
  ["Masthead","Brand, sections (folding into More), search, Quick, notifications and Settings. Nothing is wider than the screen."],
  ["Old addresses","Every address from earlier releases redirects to its new page (self-check K49)."]
];
V.build_ia = () => `<p class="lede">The review behind the release 9 restructure: what moved, why, and the rules every page now follows.</p>
  <h3 id="ia-order">Sections in order of importance</h3><div class="tblwrap"><table><thead><tr><th scope="col">Order</th><th scope="col">Section</th><th scope="col">Mainly for</th><th scope="col">Why it is here</th></tr></thead><tbody>${IA_SECTIONS.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
  <h3 id="ia-moves">What moved or merged</h3>${table("tIaMoves",{cols:[{k:"w",l:"Content"},{k:"f",l:"Was"},{k:"t",l:"Now"},{k:"y",l:"Why"}], rows:IA_MOVES.map(m=>({w:m[0],f:m[1],t:m[2],y:m[3]}))})}
  <h3 id="ia-rules">Rules every page follows</h3><div class="grid g2">${IA_RULES.map(r=>`<div class="card stack"><strong>${esc(r[0])}</strong><p class="small">${esc(r[1])}</p></div>`).join("")}</div>
  <div class="note"><strong>Still to test with users.</strong> The new structure follows common patterns but has not yet been tested with people outside the build team. Card sorting and tree testing with nominators, managers and HR would confirm the section names and order.</div>`;
V.build_ia.after = () => renderTable("tIaMoves");

