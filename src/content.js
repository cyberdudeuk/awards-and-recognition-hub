/* Static, de-identified content distilled from the supplied tracker, packs and compendium.
   Provenance codes on facts: V = re-verified against the organiser page on the build date;
   P = taken from the supplied pack/tracker (pack states verification on 17 Oct 2026);
   O = portfolio operating rule or advice, not an organiser fact;
   S = confirmed by the service owner where no public page states it;
   C = appears only in the compendium visuals (not independently verified). */
const C = {};

C.northStar = {
  promise: "Evidence-backed recognition that makes enabling contribution visible.",
  purpose: "To make the contribution of individuals, teams, communities and networks visible, valued and portable, so that inclusion, collaboration and positive impact are recognised and sustained through change.",
  mission: "A recognition portfolio that celebrates contribution, strengthens belonging and helps build a more inclusive, high-performing and representative civil service.",
  pillars: [
    {t:"Fairer visibility", d:"Shine a light on the people and communities who often work behind the scenes."},
    {t:"Stronger collaboration", d:"Build bridges across communities and organisations."},
    {t:"Organisational learning", d:"Use de-identified evidence to improve policy, practice and opportunity."},
    {t:"Development and belonging", d:"Inspire, empower and create a more inclusive culture where everyone can thrive."}
  ],
  principles: [["People first","Recognise real contribution"],["Fair and inclusive","Equitable and accessible"],["Collaborative","Across teams, networks and departments"],["Transparent","Evidence-led and open"],["Sustainable","Built for long-term impact"]],
  outcomes: ["A more representative and inclusive workforce","Greater innovation and collaboration","Improved opportunities and progression","Stronger communities and wellbeing","Better outcomes for the public"],
  guardrails: ["Not ranking people","Not a performance tool","No automated profiling or decision-making","No inferred protected characteristics","Privacy, consent and data protection by design","Human review and proportionate recognition"]
};

C.isNot = [
  ["Ranking people","No league tables, scores or comparative ratings."],
  ["Performance management","Not part of appraisals, talent management or employment decisions. You may copy your own evidence into your objectives or review; the portfolio never does it for you."],
  ["Automated profiling","No automated decision-making, AI profiling or algorithmic assessment of individuals."],
  ["Inferring protected characteristics","Ethnicity, religion, disability, sexual orientation or other protected characteristics are never inferred or labelled."],
  ["Using private communications","Not based on personal messages, emails or content without consent."],
  ["Mandatory disclosure of identity","Nobody is required to share protected characteristics."],
  ["Excluding unpaid or non-traditional work","Community, network, allyship and enabling contributions count, not only formal roles."],
  ["Combining unnecessary data","No aggregation of data from unrelated systems beyond what is necessary and lawful."],
  ["Public disclosure by default","Recognition is private by default; the person chooses what is shared and where."],
  ["Disciplinary or capability use","Not used in investigations, misconduct cases or grievance processes."],
  ["Linking to pay or rewards","Not used to determine pay, bonuses or access to reward schemes. Managers decide rewards under departmental schemes, on the contribution itself."],
  ["Surveillance or monitoring","Not a tool to track activity, behaviour or productivity."],
  ["Replacing existing routes","Complements existing awards, acknowledgement and celebration."]
];

C.toc = {
  inputs:["Verified organiser sources","Network and community evidence (with consent)","Calendar pack and change control","Sponsor and governance roles","DPO/IG and accessibility expertise"],
  activities:["Contribution-first discovery and open calls","Evidence capture with provenance","Subject review, consent and preference gates","Human moderation and assurance","Route selection across the recognition ladder","MoG handover packages"],
  outputs:["Governed opportunity register and .ics feeds","Evidence-led nomination drafts","Contributor-credit records","Portable recognition records","De-identified insight reports"],
  outcomes:["Fairer visibility of behind-the-scenes contribution","Stronger cross-network collaboration","Recognition that survives organisational change","Better-evidenced nominations submitted on time"],
  impact:["A more inclusive, high-performing and representative civil service"],
  assumptions:["People opt in and confirm eligibility themselves","Organisers publish dates that can be verified","Successor owners are assigned through MoG","Sponsors confirm their roles"],
  risks:["Identity inference creeping into discovery","Recognition lost through MoG","Stale or unverified dates presented as fact","Concentration of recognition on visible roles"]
};

C.journey = [
  ["Contribution occurs","People take action, lead, support, collaborate and make a difference across communities, teams and beyond their day job.",["Volunteering","Mentoring","Community leadership","Inclusive design","Policy and practice change"]],
  ["Evidence captured","Contributions are recorded with evidence from multiple sources.",["Nominations","Supporting documents","Event materials","Manager or peer endorsement","Links to published content"]],
  ["Subject review","The person reviews their record, can edit or add context, and chooses what is shared. Participation is voluntary.",["Review and edit","Approve for recognition","Choose visibility level","Request changes or removal"]],
  ["Moderation and assurance","A small moderation panel checks evidence, fairness and consistency, and supports sensitive cases.",["Fair and consistent","Evidence-based","Inclusive and transparent","Sensitive handling","Right to appeal"]],
  ["Recognition shared","Recognition is shared through appropriate channels.",["Internal comms and intranet","Leadership events","Award submissions","Case studies","Network showcases"]],
  ["Learning aggregated","De-identified insight shows where recognition happens and where gaps are.",["Participation trends","Cross-community collaboration","Barriers and enablers","Impact themes","Recommendations"]],
  ["Lasting impact","Contributions are preserved through MoG and organisational change.",["Portable recognition record","Continued visibility","Organisational learning","Stronger culture"]]
];

C.loop = [["Evidence","Capture contribution and impact from multiple sources."],["Verification","Moderate, validate and assure fairly and consistently."],["Recognition","Share and celebrate individuals, teams and communities."],["Insight","Analyse themes, barriers and enablers (de-identified where possible)."],["Action","Inform decisions; improve policy, practice and opportunity."],["Opportunity","Create development, visibility and new possibilities."]];

C.anatomy = {
  contributors:["Individuals","Teams","Networks","Allies (sponsors, mentors, advocates)","External partners"],
  capture:["Self-nomination","Peer nomination","Manager endorsement","Evidence artefacts","Community input"],
  core:["Contribution records: actions, outcomes, evidence, crossover, beneficiaries","Governance and assurance: verification status, moderation, audit trail, retention","Insights and learning (de-identified): themes, trends, barriers, opportunities"],
  control:["Review and edit","Choose visibility (private, internal, public)","Set preferences","Withdraw if needed","Sensitive information is optional and held separately"],
  uses:["Internal recognition","Civil Service Awards","Specialist and community awards","Professional recognition","Public storytelling","Development and opportunity"],
  enablers:["Identity and access management","Microsoft 365 (or approved platform)","Data architecture and standards","APIs and integration (where appropriate)","Reporting and analytics (de-identified)"],
  oversight:["DPO and legal assurance","Inclusion and network panel","Risk, audit and compliance","Ongoing monitoring and improvement"],
  outOfScope:["Employee performance management","Automated profiling, scoring or rankings","Mandatory participation","Silent inference of protected characteristics","Use in disciplinary, promotion or pay decisions"]
};

C.mog = {
  before:["Person: colleague, role, team","Community or network","Contribution","Evidence","Impact"],
  during:["Teams split or merge","People move to new departments","Network names and structures change","Risk of lost institutional memory"],
  after:["Record follows the individual (with consent)","Networks keep links and history","Evidence retained, verified and attributable","Impact continues to inform"],
  continuity:["Portable recognition record","Successor ownership assigned","Networks and collaborations retained","History and impact preserved"]
};

C.roadmap = [
  {p:"0. Mobilise",w:"Weeks 1–2",d:"Confirm mandate, appoint sponsor and team, agree scope, principles and success criteria.",o:["Project charter","Roles and governance","Initial stakeholder map"],owner:"Executive Sponsor",s:"Proposed"},
  {p:"1. Discover",w:"Weeks 3–5",d:"Engage people and networks, understand needs, map the recognition landscape.",o:["User research findings","Service design insights","Evidence of opportunities"],owner:"Service Design Lead",s:"Proposed"},
  {p:"2. Define",w:"Weeks 4–6",d:"Agree recognition taxonomy, evidence model, inclusion standards and privacy by design.",o:["Data model and fields","Moderation approach","Privacy and consent design"],owner:"Business Design Lead",s:"Proposed"},
  {p:"3. Assure",w:"Weeks 6–9",d:"Complete full DPIA, security review, equality assessment and accessibility assessment.",o:["DPIA and risk register","EIA and accessibility plan","Final approval to build"],owner:"Privacy Lead",s:"Proposed"},
  {p:"4. Prototype",w:"Weeks 6–9",d:"Build a low-data demonstrator, test with synthetic data and validate with users.",o:["Prototype (MVP)","Usability testing results","Assurance sign-off"],owner:"Product Lead",s:"To be appointed"},
  {p:"5. Pilot",w:"Weeks 10–15",d:"Run a controlled pilot with a voluntary cohort across selected teams and communities.",o:["Live pilot","Ongoing support","Interim learning"],owner:"Pilot Lead",s:"To be appointed"},
  {p:"6. Evaluate",w:"Weeks 16–18",d:"Assess impact, risks and user experience; recommend scale, iterate or stop.",o:["Evaluation report","Recommendations","Decision paper"],owner:"Evaluation Lead",s:"To be appointed"},
  {p:"7. Decide",w:"Weeks 19–20",d:"Agree next steps: stop, iterate or scale; plan sustainability or MoG handover.",o:["Final decision","Scale or transition plan","Communications"],owner:"Executive Sponsor with steering group",s:"Proposed"}
];
C.gates = [["G1","Mandate approved","Scope, purpose, safeguards"],["G2","Design assured","DPIA screening, EIA, security"],["G3","Prototype ready","Testing and user validation"],["G4","Pilot authorised","Full DPIA and risk acceptance"],["G5","Decision to scale","Evaluation and recommendations"]];

C.roles = [
  ["Executive Sponsor","Strategic leadership and direction","Proposed (confirmation required)"],
  ["Data Management Champion","Accountability, resources and impact","Proposed (confirmation required)"],
  ["Architecture Champion","Standards, interoperability and scale","Proposed (confirmation required)"],
  ["Privacy and Data Protection Lead","Privacy, compliance and ethical use of data","Proposed (confirmation required)"],
  ["Security Representative","Security, risk and trusted implementation","Proposed (confirmation required)"],
  ["Inclusion and Network Panel","Co-design, community voice and lived experience","To be confirmed"],
  ["Communications and Engagement","Storytelling, amplification and behaviour change","Proposed (confirmation required)"],
  ["Service Design and Research","User-centred design, accessibility and evidence-led delivery","Proposed (confirmation required)"],
  ["Legal, HR and EDI","Policy alignment, fairness and organisational support","To be confirmed"],
  ["Participants and Departments","Real-world insight and practical application","To be confirmed"]
];

C.privacy = [
  ["Purpose limitation","A clear, specific and legitimate purpose","Only use data for defined recognition and organisational learning purposes."],
  ["Minimum necessary data","Collect only what is needed","Use the least personal data to achieve the purpose."],
  ["People's control and transparency","Clear information and meaningful choice","Be open about how data is used and give people control over their information."],
  ["Human moderation","People, not algorithms","Use human review to ensure fairness, context and proportionality."],
  ["Restricted access and audit","Right people, right access","Limit access, keep audit records and monitor use."],
  ["Retention, correction and deletion","Keep it accurate and up to date","Review regularly, allow corrections and delete when no longer needed."]
];
C.standards = ["UK GDPR and Data Protection Act 2018","ICO guidance on special category data and DPIAs","Government Service Standard","Secure by design principles","Equality, diversity and inclusion good practice"];

C.gatesEthical = [
  ["G1","Purpose","Is there a specific recognition or equality purpose with a concrete public or organisational benefit?","Purpose is documented and cannot be met equally well without identity-related processing.","Use identity-neutral contribution discovery instead."],
  ["G2","Necessity","Is person-level inference genuinely necessary and proportionate?","Less intrusive methods have been tried or demonstrably cannot meet the purpose.","Use open calls, contribution records, network referrals or aggregate analysis."],
  ["G3","Legal authority","Are Article 6 and Article 9 conditions, plus any DPA Schedule 1 condition, documented?","DPO/IG confirms the legal basis and required appropriate policy document.","Do not process the inferred identity."],
  ["G4","Risk","Has a DPIA assessed discrimination, misclassification, chilling effects, disclosure and function creep?","Risks are mitigated, residual risk accepted and a human challenge route exists.","Stop or redesign."],
  ["G5","Source quality","Is the signal explicit, attributable, current and relevant to the stated purpose?","The person self-described, or an authorised source records a declaration for a compatible purpose.","Treat only as an outreach cue, never as identity evidence."],
  ["G6","Human confirmation","Can the person confirm, correct, decline or prefer not to say before identity affects recognition?","Confirmation is voluntary and non-response has no adverse effect.","Recognise contribution without an identity label or category-dependent claim."],
  ["G7","Separation","Are discovery signals separated from recognition decisions and access restricted?","Only authorised roles see sensitive data; decision-makers receive the minimum necessary status.","Do not create or circulate a person-level inferred list."],
  ["G8","Retention and mobility","(Not specified in the source tracker)","(Not specified)","Incomplete gate: see defect D11"]
];

C.edge = [
  ["E01","Aggregate declaration gaps by business unit, profession, grade or location","Green","Target inclusive communications or improve declaration routes at group level, with disclosure control.","Identifying or ranking named people.","Minimum cell sizes; aggregation; equality and analytics governance.","Invite the whole affected population; recognise verified contribution regardless of declaration.","Small cells, unusual combinations or re-identification risk."],
  ["E02","Person explicitly self-identifies in a current official biography, authored article or nomination form","Amber","Use as a prompt to seek confirmation where identity is relevant to eligibility.","Silent transfer into a recognition database or assuming all related identities.","Purpose compatibility; provenance; currency check; privacy notice; confirmation before use.","Contribution may be recognised immediately; identity-dependent route waits for confirmation.","Role move, MoG, old publication or changed self-description."],
  ["E03","Participation in a heritage event, staff network, cultural programme or faith activity","Amber","Find and credit the contribution: organiser, speaker, designer, mentor, volunteer or sponsor.","Inferring ethnicity, religion, nationality or network membership.","Separate activity evidence from identity; ask open, optional questions.","Credit the documented role without applying an identity label.","Public nomination requiring personal eligibility."],
  ["E04","Declared language skill, translation work or cultural expertise in a professional profile","Amber","Identify a skill contribution or invite participation in relevant recognition activity.","Inferring ethnicity, nationality, migration history or religion.","Use only the declared skill; verify authorship and consent for publicity.","Recognise language or cultural expertise as the contribution described.","Profile is stale or skill was recorded for another purpose."],
  ["E05","Authorised HR self-declaration available during a restructure or MoG","Amber","With approved access and compatible purpose, invite the person to validate a recognition route or refresh details.","Broad circulation to managers, networks or nomination panels.","Article 6/9 basis; access controls; DPIA as needed; purpose limitation; audit trail; refresh.","Panels receive eligibility confirmed or not confirmed, not raw identity detail unless strictly necessary.","Transfer to successor controller, purpose change or outdated declaration."],
  ["E06","Referral by manager, peer, network lead, organiser or community partner","Green","Locate overlooked contribution and invite the person to provide evidence or opt in.","Treating the referrer's view as identity confirmation.","Record referrer and evidence; contact neutrally; permit correction and decline.","Recognise verified work and name co-contributors.","Conflict of interest, repeated nominations or weak attribution."],
  ["E07","Historic directory, archived network list or prior nomination indicates identity or membership","Amber","Reconnect for a neutral update and ask whether the person wishes to engage.","Assuming continued identity, membership, consent or eligibility.","Restricted access; expiry date; do not expose historic labels; re-confirm.","Preserve contribution history while marking identity or eligibility unconfirmed.","MoG, name change, departure, long inactivity or new controller."],
  ["E08","Surname or name analysis, geocoding, nationality, birthplace or language model used to predict ethnicity","Red","At most, DPO-approved aggregate methodological research where necessary, validated and never used for individual recognition decisions.","Creating candidate lists, assigning identity, eligibility, exclusion, publication or differential treatment.","DPIA; legal basis; bias validation; aggregation; independent review; no individual action.","Use alternative discovery methods for individuals.","Any plan to retain person-level scores or contact named people."],
  ["E09","Photograph, appearance, accent, voice, dress or perceived skin colour","Red","No use for identity inference in recognition discovery.","Any identity classification or eligibility decision.","Do not collect or record the inference; challenge subjective nomination language.","Recognise only independently evidenced contribution.","Immediate escalation if such inference enters a record."],
  ["E10","Social graph: friends, network attendance, email groups or association with known members","Red","Use event records only to identify documented work, not identity.","Inferring shared ethnicity, religion, belief or another protected characteristic.","Data minimisation; no relationship profiling; verify the actual contribution.","Credit the person's evidenced role, if any.","Automated network analysis or broad mailbox mining."],
  ["E11","Urgent MoG handover risks losing evidence about a person whose identity status cannot be refreshed","Amber","Preserve role, outputs, dates, sources and recognition history; flag identity-dependent eligibility as unconfirmed.","Guessing identity to keep a nomination alive.","Provenance, restricted handover, successor owner and time-limited re-contact action.","Give identity-neutral acknowledgement now; revisit category-specific nomination after confirmation.","Successor owner assigned or contact restored."]
];

C.methods = [
  ["Open recognition call with multiple channels","Self or peer nomination through intranet, email, live sessions and accessible forms","Reaches people outside established networks and allows self-definition.","Publish criteria; allow prefer-not-to-say; offer private recognition; monitor response gaps.","Opt-in leads with contribution evidence."],
  ["Contribution-credit capture at source","Event pages, project closure, communities of practice, mentoring and volunteering records","Captures delivery, administration and emotional labour when it happens.","Require organisers to name all roles, not only visible speakers or senior sponsors.","Named contributor list with consent status."],
  ["Structured manager and peer prompts","Quarterly prompts during performance, talent and team reviews","Scales through organisational hierarchy and mobility.","Ask for evidence and co-contributors; audit concentration by grade, location and function.","Evidence referrals, not identity labels."],
  ["Network and community lead referrals","Leads identify activity and contributors, including cross-network work","Finds informal and discretionary contributions.","Leads do not attest identity; nominees confirm eligibility themselves.","Verified contribution leads and partner contacts."],
  ["Event and programme role registers","Host, organiser, facilitator, designer, speaker, volunteer, communications and accessibility roles","Surfaces behind-the-scenes contributors.","Use role evidence only; avoid identity inference from event theme.","Complete credit record for each programme."],
  ["MoG recognition handover pack","Record ID, contribution, sources, consent state, owner, destination and review date","Preserves visibility through restructures and changing email and Teams estates.","Transfer minimum necessary data; separate sensitive declarations; assign successor owner.","Portable, auditable recognition history."],
  ["Self-service recognition profile","Voluntary profile for contribution interests, recognition preferences and optional identity declaration","Keeps information current and person-controlled.","Granular consent, edit and delete controls, privacy notice and access restriction.","Current preferences and verified self-description."],
  ["Portfolio gap review","Aggregate patterns by function, location, grade and recognition route","Identifies where outreach is missing without naming ethnic groups or people.","Use disclosure control and avoid proxy variables as identity substitutes.","Targeted inclusive outreach plan."],
  ["Source-led search","Authored outputs, awards, project records, volunteer lists and published acknowledgements","Finds evidenced achievement across a large organisation.","Search for contribution terms and roles, not names or perceived identities.","Candidate contributions for neutral verification."],
  ["Alumni and leaver recognition check","Exit, transfer and alumni processes ask about unrecorded discretionary contribution","Captures people at the moment mobility would otherwise erase evidence.","Optional response; clear reuse and publication choices.","Closed or transferred recognition record."]
];

C.ladder = [
  ["L1","Private thanks and evidence confirmation","Individual or immediate team","Verified action or reliable source","Ask recognition preference; no identity inference required.","Early acknowledgement while evidence is being strengthened."],
  ["L2","Manager, peer or senior-leader commendation","Department or profession","Verified contribution and attributable value","Consent for circulation; identity-neutral by default.","Timely in-year recognition and invisible work."],
  ["L3","Contributor credits and service record","Programme, event, network or project","Documented role and dates","Opt in to named or public credit; private alternative available.","Equitable recognition of organisers, volunteers and operational labour."],
  ["L4","Internal spotlight, case study or showcase","Organisation or cross-government","Fact-checked narrative, outcomes and co-contributors","Publication consent and communications clearance.","Share learning and increase visibility without competitive ranking."],
  ["L5","Team, community or network award","Internal or external awards audience","Collective impact, activity, outcomes and named delivery roles","Group approval; do not expose member identities unnecessarily.","Recognise collective infrastructure and cross-network collaboration."],
  ["L6","Individual award nomination","Civil Service or external awards audience","Strong attributable evidence and current criteria","Nominee consent except where the scheme requires confidentiality; self-confirm identity-dependent eligibility.","Exceptional sustained or category-aligned contribution."],
  ["L7","Professional recognition","Profession, conference, publication or external partner","Transferable practice, expertise and impact","Author or speaker consent; security and publication checks.","Recognition through expertise, authorship and influence."],
  ["L8","Honours or long-service public recognition","National or public","Extraordinary, sustained, independently supported impact","Follow scheme confidentiality and evidence rules; no speculative identity.","Long-term public or community service."],
  ["L9","Legacy and institutional memory","Successor organisation, archive or alumni community","Verified contribution history and provenance","Minimum necessary data; retention and transfer approval.","Protect recognition through MoG, restructure, departure or closure."]
];

C.criteria = [
  ["Champion Ally","For a person who does not identify as being from an ethnic-minority background and has used their position to support or initiate activity advancing inclusion within and outside work.","Potential route only. Never assign until identity, role and career-stage conditions are self-confirmed."],
  ["Exceptional Inclusion","For a person working in diversity, inclusion, people, talent or HR who goes beyond their day job and can show innovative, lasting change.","Potential route only. Never assign until identity, role and career-stage conditions are self-confirmed."],
  ["Future Leader","For someone from the beginning to middle of their career who role-models leadership and has raised the profile or pushed the boundaries of ethnic inclusion.","Potential route only. Never assign until identity, role and career-stage conditions are self-confirmed."],
  ["Inspirational Leader","For a senior management leader who has used influence to create positive change and acted as a role model inside and outside work.","Potential route only. Never assign until identity, role and career-stage conditions are self-confirmed."],
  ["Network Group","For a network group able to demonstrate that it is active, innovative and supportive of diverse ethnic staff.","Principal route for the network and community evidence in this register."],
  ["Values alignment","Inclusion and belonging; listening; stronger together; support; advocacy.","Used across every narrative as a non-competitive recognition lens."]
];

C.routes = [
  ["R01","Ethnicity Awards","Individuals; ethnicity networks","Network and community records; eligible individuals who self-confirm","Current-cycle outcomes, activity window, consent, category eligibility and named contributors","Check next published cycle","Do not infer identity, ally status, career stage or seniority.","https://www.ethnicityawards.com/rcblocks/categories-corporate/","EA"],
  ["R02","Civil Service Awards: Developing and Supporting People","Individuals or teams","Mentoring programmes; network leadership; inclusion systems work","Measurable barrier removal, culture or representation change; above-and-beyond contribution","Closed 27 Oct 2026 (5pm); shortlist January and ceremony March 2027, both tentative","Confirm departmental nomination process and current criteria.","https://www.civilserviceawards.com/categories/","CSA"],
  ["R03","Civil Service Awards: Collaboration","Teams or partnerships","Network partnerships; cross-network programmes; diversity-in-technology event collaboration","Common goal, two or more parties, shared outcomes, benefits and replicability","Closed 27 Oct 2026 (5pm); shortlist January and ceremony March 2027, both tentative","Must evidence partnership and measurable benefit beyond one team.","https://www.civilserviceawards.com/categories/","CSA"],
  ["R04","Civil Service Awards: Outstanding Community Service","Individuals or teams","Community volunteering and outreach","Exceptional voluntary contribution and positive difference to people's lives","Closed 27 Oct 2026 (5pm); shortlist January and ceremony March 2027, both tentative","Separate voluntary service from normal duties and evidence beneficiaries.","https://www.civilserviceawards.com/categories/","CSA"],
  ["R05","Civil Service Awards: Leadership or Rising Star","Individuals","Documented formal or informal leaders; early-career nominees only where confirmed","Leadership beyond role, tangible outcomes and lasting impact; service length for Rising Star","Closed 27 Oct 2026 (5pm); shortlist January and ceremony March 2027, both tentative","Rising Star requires three or fewer cumulative Civil Service years; verify eligibility.","https://www.civilserviceawards.com/categories/","CSA"],
  ["R06","British Diversity Awards","Individuals; networks; teams; projects","Outstanding Ethnicity Network; Diversity Team; Changemaker; Diversity Champion; role model","Measurable impact during the stated period, voice amplified, barriers removed and contributors credited","2027 nominations closed on 20 November 2026 (no extension); finalists 14 January 2027, winners 17 March 2027","Select the specific network category; check current rules and employer approval.","https://www.britishdiversityawards.com/awards-categories","BDA"],
  ["R07","National Diversity Awards","Individuals; community groups or voluntary organisations","Positive Role Model; Community Organisation (Race, Religion and Faith or Multi-Strand)","Community impact, selfless contribution, evidence of sustained change and public support","2026 cycle complete; monitor next cycle","Employee networks may not meet community-organisation rules; verify before nomination.","https://www.nationaldiversityawards.co.uk/awards-2026/awards-categories/","NDA"],
  ["R08","UK Honours System","Individuals","Sustained, extraordinary public or community service with impact beyond the role","Detailed achievements and impact, prior recognition and two supporting letters","Rolling; decision may take 12–18 months","Confidential process; the nominee should not be told. Best for sustained service, not a single event.","https://www.gov.uk/honours","HONOURS"],
  ["R09","King's Award for Voluntary Service","Qualifying volunteer groups","Potential only for an eligible volunteer group with substantial community service","Group history, community benefit, volunteer leadership, independent support and eligibility evidence","KAVS 2027 nominations close 1 December 2026 (confirmed 22 Nov 2026); awards are usually announced on 14 November, a date the nomination page does not state","Groups of three or more, running for at least three years, led by volunteers with over half the members volunteers, and based in the UK, Channel Islands or Isle of Man. Civil Service staff networks are not automatically eligible; check the eligibility page first.","https://kavs.dcms.gov.uk/make-a-nomination/eligibility/","HONOURS"],
  ["R10","Departmental formal recognition","Individuals; teams; communities; networks","All documented contributors, including behind-the-scenes organisers and transition owners","Short evidence citation, impact, named co-contributors, consent and fair-credit statement","Immediate or in-year","Confirm the successor department's local scheme, delegated authority and publication consent.","","INTERNAL"],
  ["R11","Published case study, blog or conference contribution","Individuals; teams; networks","Cross-network programmes, mentoring, outreach and reusable operating practice","Fact-checked story, metrics, quotes, co-author credits and publication consent","Rolling or opportunity-led","Use communications and security clearance; do not publish personal data or unsupported claims.","","INTERNAL"],
  ["R12","Contributor-credit package","Individuals; teams; communities; networks","Every event, programme, handover and network record","Named credits in event pages and reports; thank-you letters; service certificates; endorsements; alumni record","Immediate and repeatable","Offer opt-in recognition and a private alternative; credit delivery, administration and emotional labour.","","INTERNAL"],
  ["R13","Analysis in Government Awards","Individuals or teams in government analysis","Analytical work with measurable impact","Evidence of impact against the chosen category, work within the last 12 months","2026 nominations closed (23 October 2026 after an extension; the page now shows the original 16 October); shortlist before Christmas","Added by this build from the organiser hub; not in the supplied route register. Check category criteria.","https://analysisfunction.civilservice.gov.uk/aig-awards-hub/","AIG"]
  ,["R14","Cabinet Secretary's AI Innovation Award","Individuals or teams across the Civil Service, including the Scottish and Welsh Governments","Innovative, safe and responsible use of AI and technology","Outcome, safe use, reuse; quarterly","Quarterly; next window not published (watch marker 2 Nov 2026)","Shortlisted nominees go into the Civil Service Awards. Never nominate AI use for its own sake.","https://civilservice.blog.gov.uk/2026/05/29/40890/","CSAI"]
  ,["R15","Civil Service AI & Data Challenge","Civil servants from any profession; cross-departmental teams","A 400-word idea or joining a team","Problem, idea and user need; line manager approval","2026 to 2027 cycle not published (watch marker 2 Nov 2026)","Agree time with your line manager before entering.","https://datachallenge.uk/","DATAC"]
  ,["R16","iESE Public Sector Transformation Awards 2027","UK public bodies and partnerships","Transformation, digital innovation, AI in public services, cyber resilience","Outcomes and evidence of change","Closes 5pm, 15 January 2027; ceremony 3 March 2027","External scheme: check entry fees and departmental approval.","https://iese.org.uk/awards/","IESE"]
  ,["R17","LGC Awards 2027","Councils and local public services, including partnerships with central government","Local public service projects","Outcomes for residents","Entries closed 16 Oct 2026; shortlist 10 Dec 2026; ceremony 24 Mar 2027","For partnership work with councils; the council usually enters.","https://awards.lgcplus.com/lgca2027/","LGC"]
  ,["R18","MJ Awards 2027","Local government","Local government achievement","Outcomes for residents","Ceremony 25 June 2027; entry deadline not yet published","For partnership work with councils.","https://awards.themj.co.uk/","MJ"]
  ,["R19","Scottish Public Service Awards 2026","Scottish public services","Public service delivery, including digital public services","Outcomes for people in Scotland","Nominations closed; ceremony 9 December 2026","Relevant to Scottish Government and UK bodies working in Scotland.","https://events.holyrood.com/event/scottish-public-service-awards-2026/","SPSA"]
  ,["R20","HSJ Awards 2026","NHS and health organisations","Health service improvement","Outcomes for patients and staff","2026 ceremony held on 19 November 2026; winners published; no 2027 dates yet","For health partnerships only.","https://awards.hsj.co.uk/","HSJ"]
];

C.glance = [
  {code:"CSA", name:"Civil Service Awards 2026", url:"https://www.civilserviceawards.com/", who:"Any UK civil servant; individuals and teams; every grade and role.",
   facts:[["Nominations close","5pm, Tuesday 27 October 2026 (no time zone stated; read as UK time)","V"],["Nominations opened","September 2026","V"],["Shortlist","January 2027, day not published","V"],["Ceremony","March 2027, day not published","V"],["Format","600 words: about 100 for the overview and 500 for the STAR statement (Situation, Task, Action, Result)","V"],["Self-nomination","Not allowed: you cannot nominate yourself (organiser's How to nominate page)","V"],["Categories mapped","2026 categories are being refreshed. 2025 categories included Collaboration, Developing and Supporting People, Rising Star and the Cabinet Secretary's Outstanding Leader Award","V"]]},
  {code:"BDA", name:"British Diversity Awards 2027", url:"https://www.britishdiversityawards.com/keydates2026", who:"Individuals, teams, organisations, employee networks and community initiatives; all sectors.",
   facts:[["Nominations opened","3 August 2026","V"],["Nominations close","20 November 2026","V"],["Finalists announced","14 January 2027","V"],["Winners announced","17 March 2027 (organiser warns dates may change)","V"],["Venue","Not given on the organiser's key dates or 2026 shortlist pages","V"],["Categories mapped","2026 categories include Outstanding Ethnicity Network, Outstanding Employee Network, Diversity Team, Changemaker, Diversity Champion and Inspirational Role Model","V"]]},
  {code:"EA", name:"Ethnicity Awards 2026", url:"https://www.ethnicityawards.com/nomination-process/", who:"Individuals, networks, organisations and allies; category-specific eligibility applies and is self-confirmed.",
   facts:[["Nominations opened","1 May 2026","V"],["Nominations closed","1 June 2026 (all categories except Outstanding Employer)","V"],["Maturity Matrix","14 July 2026","V"],["22 October 2026","Listed beneath the shortlist heading; not a verified winners date","V"],["Winners","At the Awards Ceremony, Autumn 2026, no date given","V"],["Evidence window","March 2025 to February 2026 where a 12-month period applies","V"],["Next cycle","Monthly watch from 1 February 2027","O"]]},
  {code:"NDA", name:"National Diversity Awards", url:"https://www.nationaldiversityawards.co.uk/", who:"Individuals, community groups and charities; you can nominate others, not yourself (compendium).",
   facts:[["2026 cycle","Opened 11 March, closed 13 May, shortlist announced in July, winners 18 September 2026 at Liverpool Anglican Cathedral (historical)","V"],["Categories mapped","Positive Role Model and Community Organisation categories (by strand, such as age, disability, gender, LGBT, race, faith or religion)","V"],["Employee networks","May not meet community-organisation rules; verify","O"],["Next cycle","No 2027 dates published on 19 October 2026; recent cycles opened in March. Monthly watch from 15 January 2027","V"]]},
  {code:"HONOURS", name:"UK Honours", url:"https://www.gov.uk/honours", who:"Anyone who has made a significant, sustained contribution in the UK or overseas.",
   facts:[["Deadline","No closing date is given on GOV.UK; nominate at any time (checked 19 Oct 2026)","V"],["Confidentiality","Cabinet Office guidance: do not tell the person you have nominated them","V"],["Supporting evidence","Two supporting letters from people who know the nominee personally","V"],["Who","Individuals only; they must still be actively involved in what you nominate them for","V"],["Decision time","GOV.UK: you get an acknowledgement, then may not hear anything else for 12 to 18 months","V"],["Portfolio control","Quarterly confidential candidate and evidence review from 2 November 2026","O"]]},
  {code:"INTERNAL", name:"Internal and departmental recognition", url:"", who:"All colleagues, subject to scheme eligibility.",
   facts:[["Timing","Ongoing throughout the year","O"],["Portfolio control","Monthly recognition portfolio review from 6 November 2026 (18 occurrences)","O"],["Scheme budgets and award caps","No figures are shown: the compendium's figures had no source. Check the department's own policy","O"],["Governance","Departmental guidance applies; confirm delegated authority and publication consent","O"]]},
  {code:"AIG", name:"Analysis in Government Awards 2026", url:"https://analysisfunction.civilservice.gov.uk/aig-awards-hub/", who:"Civil servants working in government analysis; individuals or teams; self-nomination allowed (compendium).",
   facts:[["Nominations close","23:55, Friday 23 October 2026 (extended from 16 October)","V"],["Prize draw","Only nominations made by the original 16 October deadline","V"],["Winners","No date published","V"],["Categories","Collaboration; Communication; Impact; Innovative Methods; Rising Star; Analysis for Everyone","V"]]},
  {code:"CSAI", name:"Cabinet Secretary's AI Innovation Award", url:"https://civilservice.blog.gov.uk/2026/05/29/40890/", who:"Individuals and teams across the Civil Service using AI and technology in genuinely innovative and responsible ways (Cabinet Secretary's launch message, 29 May 2026).",
   facts:[["Cadence","Quarterly","V"],["Dates","First window closed on 22 July 2026; first winner reported 9 October 2026; the nomination form was closed on 19 October 2026 and the next window is not yet published","V"],["Recognition","Vouchers, a signed certificate and the chance to present to Ministers; shortlisted nominees are entered into the Civil Service Awards","V"],["Self-nomination","Allowed: individuals and teams can nominate themselves (confirmed by the service owner on 19 October 2026; not stated on a public page and the form is closed)","S"]]},
  {code:"DUK", name:"Diversity UK Awards", url:"https://www.diversityuk.org/", who:"Individuals driving progress on race equality in the UK. Recipients are chosen by Diversity UK's trustees; no public nomination process is published.",
   facts:[["Categories","Diversity Champion Award; Lifetime Achievement Award","V"],["Dates","None published (checked 19 October 2026); 2026 awards were announced in March and July","V"],["How to be considered","Not an open nomination route: the trustees choose recipients","V"]]}
];

C.compare = [
  // route, individuals, teams, networks, self-nomination, confidential, timing
  ["Civil Service Awards","Yes","Yes","Via team categories","No (C)","No","Annual; closes 27 Oct 2026"],
  ["British Diversity Awards","Yes","Yes","Yes","Check rules","No","Annual; closes 20 Nov 2026"],
  ["Ethnicity Awards","Yes (self-confirmed eligibility)","Via organisation categories","Yes (Network Group)","Category-dependent","No","Annual; 2026 cycle closed"],
  ["National Diversity Awards","Yes","Via community categories","Community organisations only","No (C)","No","Annual; 2026 cycle complete"],
  ["UK Honours","Yes","No","No (see KAVS)","No","Yes","Rolling"],
  ["Analysis in Government Awards","Yes","Yes","Not stated","Yes (C)","No","Annual; closes 23 Oct 2026"],
  ["Internal and departmental","Yes","Yes","Yes","Scheme-dependent","No","Ongoing"]
];

C.howto = [
  ["1. Preserve","Add new evidence as a separate source and link it to the relevant recognition record. Never overwrite earlier evidence."],
  ["2. Verify","Check attribution, dates, outcomes and metrics against the cited source and, where possible, the source owner."],
  ["3. Consent","Ask each nominee to confirm that they are content to be nominated and to self-confirm any personal category eligibility."],
  ["4. Maintain through MoG","Record both legacy and successor homes. If unresolved, keep “Unresolved” rather than guessing."],
  ["5. Draft","Use the narrative as a starting point, then replace general wording with verified examples and direct outcome evidence."],
  ["6. Submit","Re-check the current award-cycle criteria and evidence window before submission. The 2026 window is not assumed for a later cycle."],
  ["7. Recognise beyond awards","Use the same register for Civil Service Awards, in-year recognition, internal spotlights and handover records, without ranking people."]
];
C.cadence = [["Weekly triage","Review the action view; assign an owner to new or High-risk records and record the next evidence step."],["Monthly assurance","Check source attribution, outcome evidence, consent status and successor ownership; retain earlier evidence rather than overwriting it."],["Before publication","Confirm names, roles, quotations, metrics, co-contributors and publication consent with the source owner."],["Before nomination","Re-check the current award criteria, evidence window, personal eligibility and approval route; tailor the narrative to the chosen category."],["After outcome","Record submission or recognition outcomes, preserve supporting material and reuse verified evidence for appropriate non-ranking recognition."]];

C.controls = [
  ["C01","Contribution-first discovery","Find positive action without identity classification","Recognition service owner","Contribution records, event roles, nominations","Proposed","Search and referral channels operational"],
  ["C02","Neutral outreach","Invite participation without implying identity","Community engagement lead","Approved neutral contact template","Proposed","Contact wording accessibility and privacy reviewed"],
  ["C03","Voluntary self-identification","Confirm eligibility only when relevant","Nominee or data subject","Explicit current declaration or prefer-not-to-say","Proposed","Identity-dependent decision blocked until confirmed"],
  ["C04","Evidence verification","Validate attribution, outcomes and collaborators","Evidence steward","Source record and owner validation","Proposed","No unsupported material claim remains"],
  ["C05","Proportionate recognition","Match recognition to evidence maturity and preference","Recognition panel","Consent and route criteria","Proposed","Private, internal or public lane selected"],
  ["C06","MoG continuity","Preserve portable recognition history","Continuity owner","Legacy owner, successor, retention and review date","Proposed","Successor owner accepts record"],
  ["C07","Special-category governance","Prevent silent profiling and unlawful reuse","DPO/IG","Article 6 basis, Article 9 condition, necessity, policy document where needed","Mandatory","Approval recorded before person-level inferred processing"],
  ["C08","DPIA trigger","Assess high-risk processing before deployment","DPO/IG","Completed DPIA and mitigations","Conditional","Residual risk accepted or design stopped"],
  ["C09","Human correction and appeal","Allow confirm, correct, decline or withdraw","Service owner","Audit trail and accessible correction route","Proposed","No adverse effect from non-response"],
  ["C10","DEIA and accessibility","Ensure equitable access and recognition preferences","UCD and accessibility lead","Inclusive research, WCAG review, assisted route","Proposed","Accessibility and inclusion acceptance passed"]
];

C.reqs = [
  ["UR-01","User","Contributor can see, correct and control how their contribution is described","Must / Alpha","Correction and preference changes are recorded and reflected","ToC O1 → PRD O1 → FR-05"],
  ["UR-02","User","Network lead can submit multiple named and behind-the-scenes contributors","Must / Alpha","Submission supports organiser, facilitator, mentor, admin, accessibility and sponsor roles","ToC O2 → PRD O2 → FR-01"],
  ["UR-03","User","MoG owner can transfer recognition evidence without losing provenance","Must / Alpha","Legacy and successor owners, sources and review dates persist","ToC O3 → PRD O3 → FR-08"],
  ["UR-04","User","Nominee can prefer private, internal or public recognition","Must / Alpha","Recognition preference gate precedes publication","ToC O1 → PRD O1 → FR-06"],
  ["UR-05","User","People not in established networks can be discovered through open and accessible routes","Must / Beta","Open call, peer referral and source-led discovery available","ToC O2 → PRD O2 → FR-02"],
  ["FR-01","Functional","Capture person, community, action, crossover, beneficiary, outcome, source and recognition route","Must / Alpha","All entities stored with identifiers and provenance","PRD P1 → Data model"],
  ["FR-02","Functional","Support contribution discovery without protected-identity inference","Must / Alpha","Search and referrals operate on role and action terms","PRD P1 → Ethical gate"],
  ["FR-03","Functional","Send neutral invitation and optional self-identification request","Must / Beta","Template contains no assumed identity and allows prefer-not-to-say","PRD P2 → Interface"],
  ["FR-04","Functional","Block identity-dependent route until eligibility is confirmed","Must / Alpha","Workflow cannot advance without confirmation status","PRD P2 → Rule engine"],
  ["FR-05","Functional","Support correction, withdrawal and review","Must / Alpha","Every record has correction status and immutable provenance log","PRD P3 → Audit"],
  ["FR-06","Functional","Offer private, internal, collective and public recognition lanes","Must / Alpha","Recognition plan records chosen lane and consent","PRD P3 → Portfolio"],
  ["FR-07","Functional","Detect duplicate and overlapping contributions","Should / Beta","Potential duplicates surfaced for human review, never auto-merged","PRD P4 → Matching"],
  ["FR-08","Functional","Create MoG handover package","Must / Alpha","Export contains minimum necessary record, owner, destination and review date","PRD P4 → Portability"],
  ["NFR-01","Non-functional","Accessible to WCAG 2.2 AA and usable with assisted routes","Must","Accessibility audit and user testing passed","DEIA plan"],
  ["NFR-02","Non-functional","No automated person-level ethnicity scoring","Must","Design and logs show no proxy score or silent label","Ethical rule"],
  ["NFR-03","Non-functional","Data minimisation and role-based access","Must","Sensitive fields segregated and access logged","Security/DPIA"],
  ["NFR-04","Non-functional","Resilient through repository, team and email migration","Must","Export/import and successor-owner checks tested","MoG continuity"]
];

C.backlog = [
  ["B01","Discovery","Contribution-first open call and accessible nomination form","Alpha","UCD lead","Privacy notice","Tested with network and non-network users"],
  ["B02","Evidence","Source-led search and contributor-credit capture","Alpha","Evidence steward","M365 access","Attribution and provenance retained"],
  ["B03","Ethics","DPO/IG decision tree for exceptional inference","Alpha","DPO/IG","Legal review","Published internal control and stop conditions"],
  ["B04","Recognition","Recognition-ladder routing","Alpha","Service owner","Consent model","Private, internal and public routes operational"],
  ["B05","Continuity","MoG handover export","Alpha","Information manager","Successor schema","Portable record accepted by successor owner"],
  ["B06","Assurance","DEIA, accessibility and bias testing","Alpha","Accessibility lead","Prototype","Critical issues closed"],
  ["B07","Matching","Human-reviewed duplicate and crossover suggestions","Beta","Product team","Data model","No automated identity inference"],
  ["B08","Analytics","Aggregate coverage and recognition-gap reporting","Beta","Analyst","Disclosure controls","No small-cell re-identification"],
  ["B09","Operations","Service standards, SLA, triage and appeal process","Beta","Operations lead","Resourcing","Operational acceptance completed"],
  ["B10","Scale","Cross-government pilot and evaluation","Pilot","SRO","Alpha acceptance","Benefits and risks independently reviewed"]
];

C.checklist = {
  "Pre-deployment assurance":[
    "Use one deployment model only: master calendar or split calendars, never both for the same audience.",
    "Review the validation results; every event intended for release passes structural and content validation.",
    "Re-verify every organiser-published date against the authoritative organiser source before release.",
    "Treat [PREP], [WATCH] and [ONGOING] as portfolio controls, not organiser deadlines.",
    "Preserve stable UID values when an existing event changes. A changed date is an update, not a new event.",
    "Do not replace a TBC month marker with an exact date until the organiser publishes the exact date.",
    "Confirm Europe/London as the intended calendar context.",
    "Test recurrence expansion and reminders in a non-production Outlook calendar."],
  "Import and release":[
    "Create or select the destination Outlook calendar(s).",
    "Create or align Outlook master categories before applying categories to events.",
    "Import the chosen .ics deployment set.",
    "Spot-check: CSA deadline; BDA deadline, finalists and winners; recurring watch rules; Honours quarterly review; internal monthly review.",
    "Confirm reminders appear and recurring series have a finite end (COUNT or approved end date).",
    "Confirm tentative and TBC events are visibly labelled.",
    "Record release version, release date, source-verification date and owner role."],
  "Post-deployment checks":[
    "Search Outlook for [DEADLINE], [PREP], [CEREMONY], [MILESTONE], [WATCH], [ONGOING].",
    "Check no user has both master and split deployment active unless duplication is intentional.",
    "Check no duplicate UID, subject+start, or route+type+start tuple exists in the source pack.",
    "Keep a rollback copy of the previous approved calendar pack."]
};

C.outlookCats = [["Recognition - Deadline","Cranberry","Verified closing dates","DEADLINE"],["Recognition - Preparation","DarkYellow","Internal preparation checkpoints","PREP"],["Recognition - Ceremony","Purple","Ceremonies and award events","CEREMONY"],["Recognition - Milestone","Blue","Shortlists, finalist and winner milestones","MILESTONE"],["Recognition - Watch","Orange","Monitor for publication or change","WATCH"],["Recognition - Ongoing","Green","Recurring in-year recognition review","ONGOING"],["Recognition - Date TBC","Gray","Approximate or month-only marker not yet confirmed","TBC"],["Recognition - Confidential","DarkRed","Restricted handling, including honours candidate review","CONFIDENTIAL"]];

C.statusModel = [["Observed","A source page appears to contain a new or changed date."],["Verified","Date, route and category are confirmed against an authoritative organiser source."],["Impact assessed","Existing UID, reminders, recurrence, prep gates and linked split calendars identified."],["Approved","The change owner authorises the update."],["Released","Master and derived calendars regenerated and validation passes."],["Monitored","Deployment checked for duplication, category and reminder behaviour."]];
C.changeClasses = [["C1 Critical","Deadline moved, cancelled or materially shortened; confidentiality or legal handling changes."],["C2 Material","Ceremony or finalist date, nomination opening, eligibility or evidence rule changes."],["C3 Routine","TBC becomes exact; links or text corrected; future-cycle publication detected."],["C4 Portfolio control","Prep lead-time or monitoring cadence changes without altering organiser facts."]];
C.updateRules = ["Never change an organiser fact from one unofficial secondary source alone.","Preserve the existing UID for an updated logical event.","Never silently turn a [WATCH] marker into a verified deadline.","A new exact date replaces a TBC marker only after verification.","Recalculate preparation checkpoints only after a new deadline is approved.","If a deadline moves earlier, flag it C1 and review every dependent prep reminder immediately.","If a deadline moves later, keep the audit trail of the previous value rather than deleting history.","Bound recurring rules with COUNT or an approved end date.","When a next cycle is published, retire the relevant [WATCH] recurrence and create the verified cycle events.","Run duplicate and conflict validation after every regeneration."];
C.pipeline = ["Scheduled trigger","Source registry","Retrieve authoritative pages","Extract candidate dates and status","Compare with approved register","Classify change","Human verification gate","Update canonical register","Regenerate .ics","Validation gates","Publish new version","Notify owner","Deployment update"];
C.machineMay = ["Revisit registered public source URLs.","Detect text and date changes.","Compare detected values with the approved register.","Create a change candidate and diff.","Run syntax, collision and recurrence validation.","Regenerate a candidate calendar after human approval."];
C.humanMust = ["Accepting a new deadline or ceremony date as authoritative.","Resolving conflicting organiser pages.","Changing an eligibility or confidentiality rule.","Changing a recurring-reminder policy.","Publishing the production pack."];
C.releaseGates = ["Source is authoritative and traceable.","Exact date and time is explicit; otherwise keep TBC.","No duplicate UID.","No duplicate route+type+start combination.","Existing logical events retain their UID.","Reminder offsets do not occur after the target event.","Recurrence is bounded.","Split calendars reconcile to the master.","TBC and watch events cannot masquerade as verified deadlines.","Confidential routes do not expose candidate identities."];
C.triggers = [["Routine source check","Weekly"],["Intensified check","When a [WATCH] item is active or a nomination deadline is approaching"],["Event-driven manual check","Whenever an organiser announcement, email or network communication reports a potential change"]];

C.importGuide = [
  ["Outlook on the web or new Outlook",["Open Calendar.","Choose Add calendar.","Choose Upload from file.","Select the .ics file and the destination calendar.","Import."]],
  ["Classic Outlook for Windows",["Open the .ics file, or use File > Open & Export > Import/Export and import an iCalendar file.","To keep routes separate, import each route into its own calendar rather than the default calendar."]],
  ["Apple Calendar",["Use File > Import and select the .ics file.","Choose the destination calendar; import route calendars separately for one colour per route."]],
  ["Google Calendar",["In Settings, use Import & export > Import.","Select the .ics file and the destination calendar; create destination calendars first to keep routes separate."]]
];
C.troubleshoot = [["Events are duplicated","You may have imported both the master and the split calendars. Remove one and re-import."],["No colours showing","Some Outlook versions ignore imported colours. Filter on the visible title tags instead, such as [DEADLINE]."],["Reminders missing","Check Outlook notification settings, then edit the event and confirm reminders are enabled."],["Updating","Remove the existing calendar, import the new version, then check for new or changed events."]];

C.sourcesPublic = [
  ["S23","Ethnicity Awards corporate criteria","Formal category descriptions and eligibility conditions","https://www.ethnicityawards.com/rcblocks/categories-corporate/","Authoritative awards source"],
  ["S24","Ethnicity Awards values","Inclusion, listening, stronger together, support and advocacy","https://www.ethnicityawards.com/ethnicity-awards-nominations/","Authoritative awards source"],
  ["S25","Ethnicity Awards nomination process","2026 process and judging approach; re-read on build date for CR-001","https://www.ethnicityawards.com/nomination-process/","Authoritative; re-verified 17 Oct 2026"],
  ["S26","Civil Service Awards 2026 categories","Collaboration, Developing and Supporting People, Outstanding Community Service, Leadership and Rising Star","https://www.civilserviceawards.com/categories/","Retrieved 17 Oct 2026; re-check before submission"],
  ["S27","UK Honours nomination guidance","Evidence, confidentiality, supporting letters, decision timing and group-route distinction","https://www.gov.uk/honours","Authoritative current guidance"],
  ["S28","British Diversity Awards categories","Ethnicity Network, employee network, Diversity Team, Changemaker, Diversity Champion and role-model routes","https://www.britishdiversityawards.com/awards-categories","Retrieved 17 Oct 2026; verify entry window"],
  ["S29","National Diversity Awards categories","Positive Role Model and Community Organisation routes","https://www.nationaldiversityawards.co.uk/awards-2026/awards-categories/","2026 categories; monitor next cycle"],
  ["S30","ICO special category data guidance","Article 6 basis, Article 9 condition, necessity, safeguards and DPIA (S33 merged here)","https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/a-guide-to-lawful-basis/special-category-data/","Authoritative; page notes guidance is under review"],
  ["S31","Standards for ethnicity data","Self-defined ethnicity, self-reporting, harmonised standards, least-intrusive collection (S35 merged here)","https://www.gov.uk/government/publications/standards-for-ethnicity-data/standards-for-ethnicity-data","Official standards"],
  ["S32","Civil Service Diversity and Inclusion Dashboard","Declared or recorded characteristic data, recording-rate limitations and suppression","https://www.gov.uk/government/publications/civil-service-diversity-inclusion-dashboard/civil-service-diversity-and-inclusion-dashboard","Official; figures are historical context"],
  ["S34","ONS ethnic group, national identity and religion guidance","Ethnic group, national identity and religion are self-identification measures","https://www.ons.gov.uk/methodology/classificationsandstandards/measuringequality/ethnicgroupnationalidentityandreligion","Authoritative"],
  ["S40","Civil Service pay remit guidance 2026 to 2027","Non-consolidated pot as a fixed % of paybill; in-year or end-year awards; PSED and equality impact assessment","https://www.gov.uk/government/publications/civil-service-pay-remit-guidance-2026-to-2027/civil-service-pay-remit-guidance-2026-to-2027","Official; read 17 Oct 2026 (added by this build)"],
  ["S41","Civil Service pay remit guidance 2025 to 2026","Targeted one-off reward mechanism (section 2.5.3)","https://www.gov.uk/government/publications/civil-service-pay-remit-guidance-2025-to-2026/civil-service-pay-remit-guidance-2025-to-2026-html","Official; read 17 Oct 2026 (added by this build)"],
  ["S42","HMRC: tax on trivial benefits","Four conditions for a tax-free trivial benefit","https://www.gov.uk/expenses-and-benefits-trivial-benefits","Official; read 17 Oct 2026 (added by this build)"],
  ["S43","ONS FOI: reward and recognition payments 2025 to 2026","One department's in-year and end-year scheme figures (example only)","https://www.ons.gov.uk/aboutus/transparencyandgovernance/freedomofinformationfoi/rewardandrecognitionandperformancerelatedpayments2025to2026financialyear","Official FOI; read 17 Oct 2026 (added by this build)"],
  ["S44","Success Profiles: Civil Service behaviours","The nine behaviours","https://www.gov.uk/government/publications/success-profiles/success-profiles-civil-service-behaviours","Official; read 17 Oct 2026 (added by this build)"],
  ["S45","Equality Act 2010, section 19","Indirect discrimination: proportionate means of achieving a legitimate aim","https://www.legislation.gov.uk/ukpga/2010/15/section/19","Legislation; read 17 Oct 2026 (added by this build)"],
  ["S46","Part-time Workers Regulations 2000, regulation 5","Less favourable treatment of part-time workers; pro rata principle","https://www.legislation.gov.uk/uksi/2000/1551/regulation/5","Legislation; read 17 Oct 2026 (added by this build)"],
  ["S47","Civil Service Careers","Benefits overview: leave, learning days, flexible working","https://www.civil-service-careers.gov.uk/","Official; read 17 Oct 2026 (added by this build)"],
  ["S48","Civil Service Management Code","Terms and conditions framework","https://www.gov.uk/government/publications/civil-servants-terms-and-conditions","Official; read 17 Oct 2026 (added by this build)"],
  ["S49","Charity for Civil Servants","Support for current and former civil servants","https://www.cfcs.org.uk/","Read 17 Oct 2026 (added by this build)"],
  ["S50","CSSC Sports & Leisure","Membership benefits","https://store.cssc.co.uk/","Read 17 Oct 2026 (added by this build)"],
  ["S51","Microsoft Learn: Deep link to a workflow in Teams","Chat and meeting scheduling deep links","https://learn.microsoft.com/microsoftteams/platform/concepts/build-and-test/deep-link-workflow","Read 18 Oct 2026 (added by this build)"],
  ["S52","Microsoft Learn: Manage the Praise app","Praise in Teams and Viva Insights; admin controls","https://learn.microsoft.com/microsoftteams/manage-praise-app","Read 18 Oct 2026 (added by this build)"],
  ["S53","Microsoft Learn: Share to Teams from web apps","Launcher script and message limits","https://learn.microsoft.com/microsoftteams/platform/concepts/build-and-test/share-to-teams-from-web-apps","Read 18 Oct 2026 (added by this build)"],
  ["S54","Microsoft Learn: Create incoming webhooks with Workflows","Connector retirement; Workflows webhook trigger","https://learn.microsoft.com/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook","Read 18 Oct 2026 (added by this build)"],
  ["S55","Microsoft 365 message centre MC1181996 (public mirror)","Connector webhook migration dates, May 2026","https://mc.merill.net/message/MC1181996","Read 18 Oct 2026 (added by this build)"],
  ["S56","Microsoft Learn: Deep linking into Viva Engage","Documented Viva Engage links","https://learn.microsoft.com/viva/engage/deeplinks","Read 18 Oct 2026 (added by this build)"],
  ["S57","Google for Developers: Google Chat incoming webhooks","Set-up, limits and URL security","https://developers.google.com/workspace/chat/quickstart/webhooks","Read 18 Oct 2026 (added by this build)"],
  ["S58","Slack: Sending messages using incoming webhooks","Payloads and secret URLs","https://docs.slack.dev/messaging/sending-messages-using-incoming-webhooks/","Read 18 Oct 2026 (added by this build)"],
  ["S59","Slack Help: Create a workflow that starts outside of Slack","Webhook triggers, variables and plans","https://slack.com/help/articles/360041352714","Read 18 Oct 2026 (added by this build)"],
  ["S60","Zoom App Marketplace: Incoming Webhook","Zoom Team Chat incoming webhook app","https://marketplace.zoom.us/apps/eH_dLuquRd-VYcOsNGy-hQ","Located 18 Oct 2026; not read in full"],
  ["S61","Webex App Hub: Incoming Webhooks","Webex messaging incoming webhooks","https://apphub.webex.com/applications/incoming-webhooks-cisco-systems-38054-23307-75252","Located 18 Oct 2026; not read in full"],
  ["S62","1EdTech: Open Badges 3.0 specification","Verifiable Credentials based badges","https://www.imsglobal.org/spec/ob/v3p0/","Read 18 Oct 2026 (added by this build)"],
  ["S63","SiliconANGLE: Meta to shut down Workplace","Workplace closure on 31 May 2026","https://siliconangle.com/2024/05/14/meta-shut-workplace-business-communications-platform/","Read 18 Oct 2026 (added by this build)"],
  ["S64","IETF RFC 6068: The mailto URI scheme","Email links","https://www.rfc-editor.org/rfc/rfc6068","Standard; not re-read"],
  ["S65","Microsoft Support: Send Praise to people","How to send Praise in Teams","https://support.microsoft.com/office/send-praise-to-people-50f26b47-565f-40fe-8642-5ca2a5ed261e","Located 18 Oct 2026; not read in full"],
  ["S66","Civil Service AI & Data Challenge","Competition site; 2025 to 2026 cycle and Grand Finale","https://datachallenge.uk/","Read 18 Oct 2026 (added by this build)"],
  ["S67","Civil Service blog: Cabinet Secretary's AI Innovation Award","Quarterly award launched 29 May 2026","https://civilservice.blog.gov.uk/2026/05/29/40890/","Read 18 Oct 2026 (added by this build)"],
  ["S68","GOV.UK: Machinery of government changes fact sheet","22 Jul 2026 changes","https://www.gov.uk/government/news/machinery-of-government-changes-fact-sheet","Read 18 Oct 2026 (added by this build)"],
  ["S69","GOV.UK: Missions","Plan for Change missions and milestones","https://www.gov.uk/missions","Read 18 Oct 2026 (added by this build)"],
  ["S70","GOV.UK: Youth Matters, the National Youth Strategy","DCMS, 10 Dec 2025","https://www.gov.uk/government/publications/youth-matters-your-national-youth-strategy","Read 18 Oct 2026 (added by this build)"],
  ["S71","GOV.UK: English Devolution Bill receives Royal Assent","Apr 2026","https://www.gov.uk/government/news/english-devolution-bill-receives-royal-assent","Research pass 18 Oct 2026"],
  ["S72","GOV.UK: Civil Service roles moved out of London (Places for Growth)","14 May 2025","https://www.gov.uk/government/news/thousands-of-civil-service-roles-moved-out-of-london-in-latest-reform-to-the-state","Research pass 18 Oct 2026"],
  ["S73","GOV.UK: Evaluation Accelerator Fund phase 5","Cabinet Office Evaluation Task Force","https://www.gov.uk/government/news/evaluation-accelerator-fund-phase-5-project-summaries","Research pass 18 Oct 2026"],
  ["S74","LGC Awards 2027","Local government awards","https://awards.lgcplus.com/lgca2027/","Research pass 18 Oct 2026"],
  ["S75","iESE Public Sector Transformation Awards","Public sector awards","https://iese.org.uk/awards/","Research pass 18 Oct 2026"],
  ["S76","Scottish Public Service Awards 2026","Holyrood Communications","https://events.holyrood.com/event/scottish-public-service-awards-2026/","Research pass 18 Oct 2026"],
  ["S77","Government Project Delivery Awards 2026 shortlist","Project delivery profession","https://projectdelivery.gov.uk/2026/01/05/government-project-delivery-awards-2026-shortlist-announced/","Research pass 18 Oct 2026"],
  ["S36","Civil Service Awards homepage","Closing time: 5pm on Tuesday, 27 October","https://www.civilserviceawards.com/","Re-verified 17 Oct 2026 (added by this build)"],
  ["S37","Civil Service Awards FAQs","Shortlist January 2027; ceremony March 2027","https://www.civilserviceawards.com/faqs/","Re-verified 17 Oct 2026 (added by this build)"],
  ["S38","British Diversity Awards key dates","3 Aug open; 20 Nov close; 14 Jan finalists; 17 Mar winners","https://www.britishdiversityawards.com/keydates2026","Re-verified 17 Oct 2026 (added by this build)"],
  ["S39","Analysis in Government Awards hub","Deadline extended to 23:55 Friday 23 October 2026","https://analysisfunction.civilservice.gov.uk/aig-awards-hub/","Re-verified 17 Oct 2026 (added by this build)"]
];
C.sourcesInternalSummary = {count:22, classes:[["Network team decks and activity summaries",4],["Intranet pages (networks, heritage months, MoG hub, operating model)",8],["Email evidence (events, volunteering, collaboration)",6],["Teams and meeting evidence",4]],
  note:"22 internal sources (S01–S22) support the network and individual records. Their titles and locators named individuals or used session-specific search identifiers, so they are summarised here by class only. The evidence steward holds the full register."};

C.glossary = [
  ["AiG","Analysis in Government Awards, run by the Government Analysis Function.","Analysis in Government Awards","Route"],
  ["Alarm (VALARM)","A reminder inside a calendar event, expressed as an offset such as -P7D (seven days before).","Reminder; trigger","Calendar"],
  ["Article 6 lawful basis","The UK GDPR legal basis needed for any processing of personal data.","Lawful basis","Data protection"],
  ["Article 9 condition","The additional UK GDPR condition needed to process special category data such as ethnicity.","Special category condition","Data protection"],
  ["BDA","British Diversity Awards.","British Diversity Awards","Route"],
  ["Candidate event","An event a build has proposed that has not passed the human approval gate. Excluded from production files by default.","Proposed change","Governance"],
  ["CEREMONY","Calendar tag for an award event or ceremony.","Awards event","Event type"],
  ["Change class","Severity of a calendar change: C1 Critical, C2 Material, C3 Routine, C4 Portfolio control.","Change severity","Governance"],
  ["Continuity owner","The named role accountable for carrying a recognition record through organisational change.","Successor owner; handover owner","Continuity"],
  ["Contributor-credit package","Opt-in named credits, thank-you letters, certificates and endorsements for everyone who delivered a piece of work.","Credits package","Recognition"],
  ["Corroborated","Evidence status where two or more independent sources support the claim.","Multi-source","Evidence"],
  ["CSA","Civil Service Awards.","Civil Service Awards","Route"],
  ["DEADLINE","Calendar tag for an organiser-published closing date.","Closing date","Event type"],
  ["DEIA","Diversity, equity, inclusion and accessibility.","EDI; D&I","Inclusion"],
  ["DPIA","Data protection impact assessment, required where processing is likely to result in high risk.","Privacy impact assessment","Data protection"],
  ["DPO/IG","Data Protection Officer and Information Governance function.","Data protection team","Data protection"],
  ["EA","Ethnicity Awards.","Ethnicity Awards","Route"],
  ["EIA","Equality impact assessment.","Equality analysis","Inclusion"],
  ["Evidence window","The period in which activity must have happened to count for an award cycle.","Activity period","Evidence"],
  ["Human gate","A step the automated workflow cannot pass without a person's approval.","Approval gate","Governance"],
  ["iCalendar (.ics)","The open calendar exchange format (RFC 5545) used by Outlook, Apple and Google calendars.","ICS; iCal","Calendar"],
  ["KAVS","King's Award for Voluntary Service.","King's Award","Route"],
  ["Master calendar","One .ics file holding every event. Import either this or the split calendars, never both.","All-in-one calendar","Calendar"],
  ["MILESTONE","Calendar tag for a shortlist, finalist or winner announcement.","Announcement","Event type"],
  ["MoG","Machinery of Government change: the transfer of functions between departments.","Machinery of Government","Continuity"],
  ["NDA","National Diversity Awards.","National Diversity Awards","Route"],
  ["Non-consolidated award","A one-off payment that does not add to base salary, funded from the department's non-consolidated pot (a fixed percentage of paybill).","In-year award; bonus","Reward"],
  ["Pay remit guidance","Cabinet Office's yearly framework within which departments set pay.","Remit","Reward"],
  ["PSED","Public Sector Equality Duty: public bodies must consider equality, including when setting pay.","Equality duty","Reward"],
  ["Success Profiles","The Civil Service recruitment and development framework: behaviours, strengths, ability, experience and technical elements.","Behaviours framework","Employee"],
  ["Trivial benefit","A tax-free benefit costing £50 or less that is not cash or a cash voucher, not a reward for work or performance, and not contractual.","Small gift","Reward"],
  ["PDP","Personal development plan agreed between an employee and their line manager.","Development plan","Employee"],
  ["CONFIDENTIAL","Calendar event type for restricted handling, such as Honours candidate review. Details are never shown to the nominee or put in shared calendars.","Restricted; Confidential","Calendar"],
  ["Adaptive Card","A JSON format for cards in Teams and other Microsoft apps. The Hub produces one for Teams Workflows webhooks.","Card payload","Integrations"],
  ["Block Kit","Slack's JSON format for laid-out messages, used with incoming webhooks.","Slack blocks","Integrations"],
  ["Webhook","A private web address that an app gives you; anything sent to it is posted to one channel or starts a workflow. Treat the address as a secret.","Incoming webhook","Integrations"],
  ["Deep link","A link that opens an app at a particular screen with details filled in, such as a Teams chat with a draft message.","App link","Integrations"],
  ["Open Badges","An open standard (1EdTech, version 3.0) for portable digital badges based on W3C Verifiable Credentials.","Digital badge; OB 3.0","Integrations"],
  ["Live connector","Your own claude.ai connection to an app such as Gmail or Google Calendar. The page uses it only when you click, after asking permission.","Connector","Integrations"],
  ["Proportionality guide","A six-dimension rubric that scores a contribution (not a person) to suggest a proportionate band of recognition; a guide for a human decision.","Contribution rubric","Reward"],
  ["Network group","An employee network that can be nominated as a collective.","Staff network; ERG","Recognition"],
  ["ONGOING","Calendar tag for a recurring in-year recognition review created by the portfolio.","Recurring review","Event type"],
  ["PREP","Calendar tag for a portfolio preparation checkpoint. Never an organiser deadline.","Preparation checkpoint","Event type"],
  ["Provenance code","V re-verified on the build date against the organiser; P from the supplied pack; C compendium only, unverified.","Source code","Evidence"],
  ["Recognition ladder","Nine levels of recognition from private thanks (L1) to legacy records (L9).","Recognition levels","Recognition"],
  ["RRULE","A calendar recurrence rule, such as FREQ=MONTHLY;COUNT=6. Every rule here is bounded.","Recurrence rule","Calendar"],
  ["Self-identification","A person stating their own identity. The only basis this portfolio accepts for identity-dependent eligibility.","Self-declaration","Data protection"],
  ["Small-cell suppression","Hiding counts below a threshold (here 3) so that aggregates cannot identify individuals.","Disclosure control","Data protection"],
  ["Special category data","Personal data needing extra protection under UK GDPR, including ethnicity, religion and health.","Sensitive personal data","Data protection"],
  ["Split calendars","Separate .ics files per route or per event type, sharing UIDs with the master.","Route calendars","Calendar"],
  ["STAR format","Situation, Task, Action, Result: the structure for Civil Service Awards nominations.","STAR","Evidence"],
  ["TBC","To be confirmed: a month-only placeholder with status TENTATIVE.","Date-TBC; tentative","Calendar"],
  ["UID","The permanent identifier of a calendar event. Preserved on every update.","Event identifier","Calendar"],
  ["Verified single source","Evidence status where one attributable source supports the claim.","Single-source","Evidence"],
  ["WATCH","Calendar tag for monitoring a future cycle. Never a deadline.","Monitor","Event type"]
];

C.dictionary = [
  ["CalendarEvent","uid","string","Permanent event identifier (RFC 5545 UID)","None"],
  ["CalendarEvent","summary","string","Title with [TYPE][ROUTE] tags","None"],
  ["CalendarEvent","type","enum EventType","DEADLINE, PREP, CEREMONY, MILESTONE, WATCH, ONGOING","None"],
  ["CalendarEvent","route","enum RouteCode","CSA, BDA, EA, NDA, HONOURS, INTERNAL, AIG","None"],
  ["CalendarEvent","start / end","date","All-day start and exclusive end","None"],
  ["CalendarEvent","status","enum","CONFIRMED or TENTATIVE","None"],
  ["CalendarEvent","rrule","string","Bounded recurrence rule, if any","None"],
  ["CalendarEvent","alarms","list of durations","Negative offsets before the event","None"],
  ["CalendarEvent","origin","enum","pack, corrected, candidate","None"],
  ["RecognitionRoute","id","string","R01–R13","None"],
  ["RecognitionRoute","scope","string","Who the route can recognise","None"],
  ["RecognitionRoute","caveat","string","Eligibility and assurance caveat","None"],
  ["RecognitionRecord","recordId","string","Pseudonymous identifier; the register links it to a person only in the restricted store","Personal (pseudonymised)"],
  ["RecognitionRecord","entityType","enum","Individual, Network, Community","None"],
  ["RecognitionRecord","actions / outcomes","text","Documented contribution and value","Personal when about an individual"],
  ["RecognitionRecord","evidenceStatus","enum EvidenceStatus","Corroborated, Verified single source, Reported, Proposed, Unresolved","None"],
  ["RecognitionRecord","mogRisk","enum","High, Medium, Low","None"],
  ["RecognitionRecord","eligibilityConfirmed","enum","Confirmed, Not confirmed, Prefer not to say","Special category when identity-dependent; held separately"],
  ["RecognitionRecord","recognitionPreference","enum","Private, Internal, Public","Personal"],
  ["RecognitionRecord","continuityOwner","role","Accountable role through MoG","None (role, not person)"],
  ["ChangeRecord","id ... released","see template","Mandatory change record fields (16)","None"],
  ["Source","id / title / url / class / assurance","mixed","Evidence or authority source","Internal sources may contain personal data"]
];

C.ontology = [
  ["RecognitionRoute","hasEvent","CalendarEvent"],["CalendarEvent","hasType","EventType"],["CalendarEvent","citedBy","Source"],
  ["ChangeRecord","affects","CalendarEvent (by UID)"],["RecognitionRecord","mapsTo","RecognitionRoute"],["RecognitionRecord","citesSource","Source"],
  ["RecognitionRecord","hasLevel","RecognitionLevel"],["RecognitionRecord","ownedBy","ContinuityOwner (role)"],["Intersection","connects","Network or Community"],
  ["EthicalGate","governs","Discovery method"],["EdgeCase","hasRiskTier","RiskTier"],["Requirement","tracesTo","Theory of change outcome"]
];
