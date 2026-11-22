/* ================= Release 6: connect hub, integrations, colour and iconography, overflow guard ================= */
Object.assign(ICON, {
  connect:'<path d="M9 3v4M15 3v4"/><path d="M7 7h10v4a5 5 0 0 1-10 0z"/><path d="M12 16v5"/>',
  chat:'<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
  send:'<path d="M21 3L3 10.5l7.5 3 3 7.5z"/><path d="M10.5 13.5L21 3"/>',
  webhook:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><circle cx="12" cy="6" r="3"/><path d="M10.5 8.6L7.5 14.4M13.5 8.6l3 5.8M9 17h6"/>',
  badge:'<circle cx="12" cy="9" r="6"/><path d="M12 6.2l.9 1.8 2 .3-1.4 1.4.3 2-1.8-.9-1.8.9.3-2-1.4-1.4 2-.3z"/><path d="M9 14.5L8 22l4-2 4 2-1-7.5"/>',
  apps:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  cloud:'<path d="M7 18a4 4 0 0 1-.6-8 6 6 0 0 1 11.5-1A4.5 4.5 0 0 1 17.5 18z"/>',
  bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  code:'<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
  sitemap:'<rect x="9" y="3" width="6" height="4" rx="1"/><rect x="3" y="17" width="6" height="4" rx="1"/><rect x="15" y="17" width="6" height="4" rx="1"/><path d="M12 7v5M6 17v-3h12v3"/>',
  print:'<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',
  share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 10.5l6.8-4M8.6 13.5l6.8 4"/>',
  video:'<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3z"/>',
  task:'<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 12l3 3 5-6"/>',
  retired:'<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>',
  history:'<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>',
  palette:'<path d="M12 3a9 9 0 0 0 0 18c1.1 0 1.5-.8 1.5-1.6 0-1.3-1-1.4-1-2.6 0-.9.7-1.3 1.6-1.3H16a5 5 0 0 0 5-5c0-4.2-4-7.5-9-7.5z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="14.5" cy="7" r="1"/>',
  plug:'<path d="M9 3v4M15 3v4"/><path d="M7 7h10v4a5 5 0 0 1-10 0z"/><path d="M12 16v5"/>',
  live:'<circle cx="12" cy="12" r="3"/><path d="M6.3 6.3a8 8 0 0 0 0 11.4M17.7 6.3a8 8 0 0 1 0 11.4M8.8 8.8a4.5 4.5 0 0 0 0 6.4M15.2 8.8a4.5 4.5 0 0 1 0 6.4"/>',
  boundary:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 12h18" stroke-dasharray="2 2"/><path d="M12 3v18"/>',
  flow:'<rect x="2" y="9" width="5" height="6" rx="1"/><rect x="9.5" y="9" width="5" height="6" rx="1"/><rect x="17" y="9" width="5" height="6" rx="1"/><path d="M7 12h2.5M14.5 12H17"/>'
});
if(!ICON.search) ICON.search='<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>';
if(!ICON.next) ICON.next='<path d="M9 6l6 6-6 6"/>';
Object.assign(TAB_ICON, {hub:"connect", send:"send", microsoft:"apps", google:"cloud", slack:"chat", others:"webhook", formats:"code", govern:"safeguards", sitemap:"sitemap", connect:"plug"});

/* ---- Colour system: eight accessible hues, one per section, rotated across cards ---- */
const SEC_HUE = {overview:0, workflows:1, recognition:6, connect:5, calendar:3, routes:2, register:7, safeguards:2, service:4, governance:7, knowledge:3, help:5, assurance:1};
const CARD_ICON_RULES = [
  [/thank|praise|appreciat|kudos/i,"thanks"],[/nominat/i,"nominate"],[/teams|outlook|microsoft|viva|sharepoint/i,"apps"],[/slack/i,"chat"],[/google|gmail/i,"cloud"],
  [/webhook|automat|power automate|zapier|workflow builder/i,"webhook"],[/badge|credential/i,"badge"],[/json|format|code|payload|standard/i,"code"],
  [/deadline|date|calendar|week|month|when|diary/i,"calendar"],[/pay|reward|£|bonus|money|tax|voucher|benefit/i,"coin"],[/privacy|personal data|consent|confiden|secret|lock|de-identif/i,"lock"],
  [/risk|warn|pitfall|caution|don't|avoid|limit/i,"s_warn"],[/check|verif|assur|test|audit|quality/i,"verify"],[/manager/i,"manager"],[/leader|senior/i,"leader"],[/\bhr\b|human resources/i,"hr"],
  [/team|people|network|communit|peer|colleague/i,"people"],[/learn|develop|career|grow|pdp|objective|review/i,"grow"],[/source|link|reference|further/i,"link"],[/download|export|file|\.ics|zip|import/i,"download"],
  [/\bai\b|assistant|generat|agent/i,"sparkle"],[/search|find|discover/i,"search"],[/fair|equal|proportion|bias|equity/i,"fair"],[/workflow|step|process|journey|how/i,"workflows"],
  [/route|award|medal|honour|prize/i,"medal"],[/idea|wish/i,"idea"],[/access|easy read|screen reader|inclus/i,"access"],[/chat|message|post|share|send/i,"chat"],
  [/governance|policy|rule|gate|safeguard|boundary/i,"safeguards"],[/glossary|term|knowledge|taxonomy|ontology/i,"knowledge"],[/change|release|version/i,"change"],[/time|cadence|rhythm|clock|often/i,"clock"],
  [/doc|template|record|register|statement|note/i,"doc"],[/what|why|purpose|about/i,"s_info"]
];
function cardIconFor(text, fallback){ for(const [rx,k] of CARD_ICON_RULES){ if(rx.test(text) && ICON[k]) return k; } return fallback; }
function cardHasIcon(card){ return !!card.querySelector(".cico, .wfico, .rbadge, .kico, .easy-pic") || Array.from(card.querySelectorAll("svg.ico")).some(x=>{ const a=x.closest("button, .btn, .chip, .pill, p, li, td, .note"); return !a || a===card || !card.contains(a); }); }
function decorate(sec, tab){
  const base = SEC_HUE[sec.id]||0; document.body.dataset.hue = base;
  const eb=$(".sechead .eyebrow"); if(eb && !eb.dataset.ic){ eb.dataset.ic=1; eb.insertAdjacentHTML("afterbegin", `<span class="secbadge" aria-hidden="true">${ico(sec.id,"ico")}</span>`); }
  const fb = TAB_ICON[tab[0]]||sec.id;
  $$("#panel .card").forEach(card=>{ if(card.dataset.dec) return; card.dataset.dec=1;
    const grid=card.parentElement && card.parentElement.classList.contains("grid") ? card.parentElement : null;
    const i = grid ? Array.prototype.indexOf.call(grid.children, card) : 0;
    card.dataset.hue = String((base + i) % 8);
    if (cardHasIcon(card)) return;
    const h = card.querySelector(":scope > h3, :scope > h4, :scope > summary, :scope > strong, :scope > .row > strong, :scope > p:first-child > strong, :scope > div:first-child > strong, :scope > legend");
    const k = cardIconFor((h||card).textContent.slice(0,140), fb);
    const chip = `<span class="cico" aria-hidden="true">${ico(k,"ico")}</span>`;
    if (h) { h.insertAdjacentHTML("afterbegin", chip); h.classList.add("withico"); } else card.insertAdjacentHTML("afterbegin", `<span class="cico cico-top" aria-hidden="true">${ico(k,"ico")}</span>`);
  });
  $$("#panel .tblwrap").forEach(t=>t.dataset.hue=String(base));
  $$("#panel .kpi").forEach((k,i)=>{ if(!k.dataset.hue) k.dataset.hue=String((base+i)%8); });
  tabScroller(); try{ ghDecorate(); }catch(e){}
  $$("#panel .outpre:not(.code)").forEach(pre=>{ if(pre.dataset.share) return; pre.dataset.share=1; const b=document.createElement("button"); b.type="button"; b.className="btn ghost sharebtn"; b.innerHTML=`${ico("send","ico")}<span>Send to Teams, Slack, Outlook, Gmail and more</span>`; b.addEventListener("click",()=>openShare({title:(WF[tab[0]]&&WF[tab[0]].name)||tab[1], text:pre.textContent.trim(), from:sec.id+"-"+tab[0]})); pre.insertAdjacentElement("afterend", b); });
}
let _obsBusy=false;
const _obs = new MutationObserver(()=>{ if(_obsBusy) return; _obsBusy=true; requestAnimationFrame(()=>{ try{ const sec=SECTIONS.find(s=>s.id===cur.s), tab=sec&&sec.tabs.find(t=>t[0]===cur.t); if(sec&&tab) decorate(sec,tab); }catch(e){} _obsBusy=false; }); });
function tabScroller(){ const tabs=$(".tabs"); if(!tabs || tabs.parentElement.classList.contains("tabswrap")) return;
  const w=document.createElement("div"); w.className="tabswrap"; tabs.parentNode.insertBefore(w, tabs); w.appendChild(tabs);
  w.insertAdjacentHTML("afterbegin", `<button type="button" class="tabnav prev" aria-label="Scroll tabs left" hidden>${ico("prev","ico")}</button>`);
  w.insertAdjacentHTML("beforeend", `<button type="button" class="tabnav next" aria-label="Scroll tabs right" hidden>${ico("next","ico")}</button>`);
  const p=$(".tabnav.prev",w), n=$(".tabnav.next",w);
  const upd=()=>{ const over=tabs.scrollWidth>tabs.clientWidth+1; p.hidden=!over||tabs.scrollLeft<=1; n.hidden=!over||tabs.scrollLeft+tabs.clientWidth>=tabs.scrollWidth-1; w.classList.toggle("over",over); };
  p.onclick=()=>{ tabs.scrollBy({left:-tabs.clientWidth*0.7, behavior:"smooth"}); }; n.onclick=()=>{ tabs.scrollBy({left:tabs.clientWidth*0.7, behavior:"smooth"}); };
  tabs.addEventListener("scroll", upd, {passive:true}); addEventListener("resize", upd);
  const sel=$("[aria-selected='true']",tabs); if(sel){ const l=sel.offsetLeft - tabs.offsetLeft; if(l+sel.offsetWidth>tabs.clientWidth) tabs.scrollLeft=l-24; }
  upd(); setTimeout(upd, 60); }
/* elements that run past the right edge of the screen and are not inside a scroll container */
function spillList(){ const vw=document.documentElement.clientWidth, out=[];
  $$("#view *, .mast *, footer *").forEach(el=>{ if(!el.offsetParent && getComputedStyle(el).position!=="fixed") return; const r=el.getBoundingClientRect(); if(r.width<=1 || r.right<=vw+1) return;
    for(let a=el.parentElement; a && a!==document.body; a=a.parentElement){ const ox=getComputedStyle(a).overflowX; if(ox==="auto"||ox==="scroll"||ox==="hidden"||ox==="clip") return; }
    out.push((el.id?"#"+el.id:el.tagName.toLowerCase()+(el.className&&typeof el.className==="string"?"."+el.className.split(" ")[0]:""))+" +"+Math.round(r.right-vw)+"px"); });
  return out; }

/* ---- Integration register (verified on the build date unless marked) ---- */
// [id, vendor, name, tier, status, what, how, source, provenance, page]
const TIER = {live:["Live connector","live",5],link:["Open in the app","link",1],format:["Copy a ready-made format","code",3],admin:["Admin automation","webhook",4],manual:["Copy and paste","copy",7],evaluate:["Evaluate first","search",2],boundary:["Not connected by design","boundary",6],retired:["Retired","retired",7]};
const INTEG = [
  ["teams-chat","Microsoft","Teams chat with a draft message","link","Available now","Opens a Teams chat with the person and puts your message in the compose box. You press Send.","Uses the documented Teams chat deep link. Needs their work email; the Hub does not keep it.","S51","V","microsoft"],
  ["teams-praise","Microsoft","Praise in Teams (Viva Insights)","manual","Available now","Praise sends a badge such as Courage, Kind heart, Leadership or Achiever with your message in a chat or channel.","There is no public way for a web page to send Praise. Copy the text, open Teams, choose Praise and paste. Admins can allow or block the Praise app.","S52","V","microsoft"],
  ["teams-meeting","Microsoft","Teams meeting scheduling form","link","Available now","Opens the Teams scheduling form with a subject and agenda, for a recognition panel, a celebration or a nomination clinic.","Uses the documented meeting deep link. You add attendees and the time.","S51","V","microsoft"],
  ["teams-workflows","Microsoft","Teams Workflows webhook (Adaptive Card)","admin","Needs admin set-up","Posts a card to a Teams channel when a channel owner chooses to send one.","Set up with the 'When a Teams webhook request is received' trigger. Office 365 connector webhooks were retired in May 2026; use Workflows.","S54","V","microsoft"],
  ["teams-share","Microsoft","Share to Teams button","evaluate","Needs hosting","A Share to Teams button on the page, with a message of up to 200 characters.","Needs Microsoft's launcher script, which this page cannot load. Possible once the Hub is hosted on the intranet.","S53","V","microsoft"],
  ["outlook-mail","Microsoft","Outlook on the web: new email","link","Available now","Opens a new Outlook email with the subject and text filled in.","Uses a widely used Outlook web link pattern that Microsoft does not document. If it fails, use the email link.","","C","microsoft"],
  ["outlook-cal","Microsoft","Outlook calendar: new all-day event","link","Available now","Opens a new Outlook calendar event for a deadline.","Undocumented Outlook web link pattern. The .ics download works in every calendar.","","C","microsoft"],
  ["viva-engage","Microsoft","Viva Engage praise post","manual","Available now","Viva Engage supports praise posts in communities.","Copy the text and open Viva Engage with the documented link. Check the community is the right audience first.","S56","V","microsoft"],
  ["gmail-live","Google","Gmail draft through your Claude connector","live","Available if connected","Creates a draft in your Gmail. It never sends. You review and send it in Gmail.","Uses your own claude.ai Gmail connector, with your permission each time this page first asks.","","V","google"],
  ["gcal-live","Google","Google Calendar event through your Claude connector","live","Available if connected","Adds an all-day event for a deadline to your Google Calendar.","Uses your own claude.ai Google Calendar connector. Nothing is shared with other people.","","V","google"],
  ["gmail-link","Google","Gmail compose window","link","Available now","Opens Gmail's compose window with the subject and text filled in.","Widely used Gmail link pattern that Google does not document.","","C","google"],
  ["gcal-link","Google","Google Calendar event form","link","Available now","Opens Google Calendar's new event form for a deadline.","Widely used Google Calendar template link that Google does not document.","","C","google"],
  ["gchat-webhook","Google","Google Chat incoming webhook","admin","Needs admin set-up","Posts a message to one Chat space. One-way: people cannot reply to the webhook.","Business or Enterprise Workspace; the admin must allow webhooks. Limit of one request per second per space. The URL is a secret.","S57","V","google"],
  ["slack-copy","Slack","Slack message (mrkdwn)","manual","Available now","Formatted text you paste into a Slack message.","Copy, paste into Slack, check and send.","","V","slack"],
  ["slack-webhook","Slack","Slack incoming webhook (Block Kit)","admin","Needs admin set-up","Posts a formatted message to one channel through a Slack app.","A Slack app owner creates the webhook. Slack says the URL contains a secret and revokes leaked ones.","S58","V","slack"],
  ["slack-workflow","Slack","Slack Workflow Builder webhook trigger","admin","Needs admin set-up","Starts a Slack workflow, for example to post praise to a channel and notify a manager.","Paid Slack plans. Up to 20 variables, flat JSON only; a missing variable makes the workflow fail.","S59","V","slack"],
  ["zoom-webhook","Zoom","Zoom Team Chat Incoming Webhook app","admin","Needs admin set-up","Posts messages to a Zoom Team Chat channel.","Install the Incoming Webhook app from the Zoom App Marketplace.","S60","L","others"],
  ["webex-webhook","Cisco","Webex Incoming Webhooks","admin","Needs admin set-up","Posts messages to a Webex space.","Add the Incoming Webhooks integration from Webex App Hub.","S61","L","others"],
  ["automation","Various","Power Automate, Zapier, Make and similar","admin","Needs admin set-up","Connect the Hub's webhook payload to other systems.","Use an approved platform only. Pass only the fields in the payload.","S54","V","others"],
  ["atlassian","Atlassian","Jira and Confluence","manual","Available now","Paste Markdown into a Confluence page or a Jira ticket, for example to record a recognition panel decision.","Copy as Markdown. No personal data beyond what people agreed to.","","V","others"],
  ["notion","Notion","Notion pages","manual","Available now","Paste Markdown into a Notion page.","Copy as Markdown.","","V","others"],
  ["email","Any","Any email app (mailto link)","link","Available now","Opens your default email app with the subject and text.","Standard mailto link (RFC 6068). Long messages are shortened; copy the full text if needed.","S64","L","others"],
  ["ics","Any","Any calendar (.ics file)","format","Available now","An all-day event file for Outlook, Google, Apple and other calendars.","iCalendar (RFC 5545), the same standard as the Hub's calendar exports.","","V","others"],
  ["badges","1EdTech","Open Badges 3.0 credential template","format","Needs an issuing platform","A portable digital badge the person can keep and share on their own terms.","Open Badges 3.0 follows the W3C Verifiable Credentials model. This page gives an unsigned template; an issuing platform adds the recipient and the proof.","S62","V","formats"],
  ["recog-platforms","Various","Recognition platforms (for example Workhuman, Achievers, Bonusly, Kudos)","evaluate","Needs procurement and a DPIA","Dedicated peer recognition and reward platforms.","Assess through procurement, security review and a DPIA. No named product is endorsed. Check that points, leaderboards and peer voting can be turned off.","","P","others"],
  ["hris","Various","HR, payroll and performance systems","boundary","Not connected by design","Systems that hold pay, ratings and case records.","The portfolio never feeds pay or performance. People copy their own evidence across, one way, if they choose.","","P","govern"],
  ["workplace","Meta","Workplace from Meta","retired","Retired","Workplace closed on 31 May 2026.","Do not build anything on it. Move community recognition to Viva Engage, Teams or Slack.","S63","V","others"]
];
const INTEG_RULES = [
  ["I1","A person starts every send","Nothing is sent when a page loads, on a timer or by the assistant. Every action is a click after a preview."],
  ["I2","Read before it goes","You see and can edit the exact text before it leaves the Hub, and tick that it is OK to share."],
  ["I3","Minimum data","Only the title and message go. The Hub adds no names, identifiers or tracking."],
  ["I4","Nothing remembered about recipients","Email addresses typed to open a chat or draft are used once and never saved."],
  ["I5","Secrets stay with the app owner","Webhook URLs and keys are never entered into or stored by the Hub. Admin recipes use placeholders."],
  ["I6","Your account, your permission","Live connectors run as you, through your claude.ai connectors, and ask before first use. You can switch them off in the page's Permissions menu."],
  ["I7","No pay, ratings or case systems","Nothing flows to or from pay, performance ratings, grievance, discipline or capability systems."],
  ["I8","Channels need consent","Post to a channel or community only if the person agreed to public recognition. Honours nominations are never shared."],
  ["I9","Approved platforms only","New integrations go through the Request an integration workflow, security review and DPIA screening."],
  ["I10","Retire cleanly","Each integration has an owner and a switch-off route. Retired services are marked and not used."]
];
const SHARE_ACTIONS = [
  // [id, group, label, kind, needs, icon, integ]
  ["teams-chat","Microsoft 365","Teams chat","link","email","chat","teams-chat"],
  ["teams-praise","Microsoft 365","Teams Praise","praise","","thanks","teams-praise"],
  ["teams-meeting","Microsoft 365","Teams meeting","link","","video","teams-meeting"],
  ["outlook-mail","Microsoft 365","Outlook email","link","","mail","outlook-mail"],
  ["outlook-cal","Microsoft 365","Outlook calendar","link","date","calendar","outlook-cal"],
  ["viva-engage","Microsoft 365","Viva Engage","praise","","people","viva-engage"],
  ["adaptive","Microsoft 365","Adaptive Card JSON","copy","","code","teams-workflows"],
  ["gmail-live","Google Workspace","Gmail draft (connector)","live","","cloud","gmail-live"],
  ["gcal-live","Google Workspace","Google Calendar (connector)","live","date","calendar","gcal-live"],
  ["gmail-link","Google Workspace","Gmail compose","link","","mail","gmail-link"],
  ["gcal-link","Google Workspace","Google Calendar form","link","date","calendar","gcal-link"],
  ["gchat","Google Workspace","Google Chat JSON","copy","","code","gchat-webhook"],
  ["slack-text","Slack","Slack message","copy","","chat","slack-copy"],
  ["slack-blocks","Slack","Block Kit JSON","copy","","code","slack-webhook"],
  ["slack-vars","Slack","Workflow Builder JSON","copy","","webhook","slack-workflow"],
  ["mailto","Any app","Email app","link","","mail","email"],
  ["markdown","Any app","Markdown","copy","","doc","atlassian"],
  ["plain","Any app","Plain text","copy","","copy","notion"],
  ["ics","Any app","Calendar file (.ics)","download","date","download","ics"],
  ["badge","Any app","Open Badges 3.0 JSON","copy","","badge","badges"]
].map(a=>({id:a[0], group:a[1], label:a[2], kind:a[3], needs:a[4], icon:a[5], integ:a[6], trigger:"click", tick:true}));

/* ---- Payload builders ---- */
const clip = (s,n) => { s=String(s||""); return s.length>n ? s.slice(0,n-1)+"…" : s; };
const enc = encodeURIComponent;
function payloads(s){ const title=clip(s.title||"Recognition",150), text=s.text||"";
  return {
    plain: title+"\n\n"+text,
    markdown: "## "+title+"\n\n"+text,
    slackText: "*"+title+"*\n"+text,
    blockKit: {text:title, blocks:[{type:"header",text:{type:"plain_text",text:title}},{type:"section",text:{type:"mrkdwn",text:clip(text,2900)}}]},
    slackVars: {title:title, message:clip(text,2900)},
    adaptive: {type:"message", attachments:[{contentType:"application/vnd.microsoft.card.adaptive", content:{"$schema":"http://adaptivecards.io/schemas/adaptive-card.json", type:"AdaptiveCard", version:"1.4", body:[{type:"TextBlock", text:title, weight:"Bolder", size:"Medium", wrap:true},{type:"TextBlock", text:text, wrap:true}]}}]},
    googleChat: {text:"*"+title+"*\n"+text},
    badge: {"@context":["https://www.w3.org/ns/credentials/v2","https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json"], id:"urn:uuid:<set by the issuing platform>", type:["VerifiableCredential","OpenBadgeCredential"], name:title, issuer:{id:"<issuer profile URL>", type:["Profile"], name:"<issuing organisation>"}, validFrom:"<set when issued>", credentialSubject:{type:["AchievementSubject"], achievement:{id:"<achievement URL>", type:["Achievement"], name:title, description:clip(text,500), criteria:{narrative:"<published criteria for this recognition>"}}}}
  }; }
const SHARE_LINK = {
  "teams-chat": s=> s.email ? `https://teams.microsoft.com/l/chat/0/0?users=${enc(s.email)}&message=${enc(clip(s.title+"\n\n"+s.text,1500))}` : "",
  "teams-meeting": s=> `https://teams.microsoft.com/l/meeting/new?subject=${enc(clip(s.title,200))}&content=${enc(clip(s.text,1200))}`,
  "outlook-mail": s=> `https://outlook.office.com/mail/deeplink/compose?${s.email?"to="+enc(s.email)+"&":""}subject=${enc(clip(s.title,200))}&body=${enc(clip(s.text,1800))}`,
  "outlook-cal": s=> s.date ? `https://outlook.office.com/calendar/0/deeplink/compose?subject=${enc(clip(s.title,200))}&body=${enc(clip(s.text,1200))}&startdt=${s.date}&enddt=${addDays(s.date,1)}&allday=true` : "",
  "gmail-link": s=> `https://mail.google.com/mail/?view=cm&fs=1${s.email?"&to="+enc(s.email):""}&su=${enc(clip(s.title,200))}&body=${enc(clip(s.text,1800))}`,
  "gcal-link": s=> s.date ? `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${enc(clip(s.title,200))}&dates=${s.date.replace(/-/g,"")}/${addDays(s.date,1).replace(/-/g,"")}&details=${enc(clip(s.text,1200))}` : "",
  "mailto": s=> `mailto:${s.email?enc(s.email):""}?subject=${enc(clip(s.title,200))}&body=${enc(clip(s.text,1800))}`
};
const PRAISE_OPEN = {"teams-praise":"https://teams.microsoft.com/", "viva-engage":"https://aka.ms/VivaEngage/Web"};
const COPY_OF = {adaptive:p=>JSON.stringify(p.adaptive,null,2), gchat:p=>JSON.stringify(p.googleChat,null,2), "slack-text":p=>p.slackText, "slack-blocks":p=>JSON.stringify(p.blockKit,null,2), "slack-vars":p=>JSON.stringify(p.slackVars,null,2), markdown:p=>p.markdown, plain:p=>p.plain, badge:p=>JSON.stringify(p.badge,null,2), "teams-praise":p=>p.plain, "viva-engage":p=>p.plain};
function shareICS(s){ const st=s.date.replace(/-/g,""), en=addDays(s.date,1).replace(/-/g,""); const uid="share-"+st+"-"+Math.abs([...s.title].reduce((a,c)=>(a*31+c.charCodeAt(0))|0,7))+"@recognition-portfolio";
  return ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Recognition Portfolio//Connect "+D.meta.version+"//EN","CALSCALE:GREGORIAN","METHOD:PUBLISH","BEGIN:VEVENT","UID:"+uid,"DTSTAMP:"+TODAY.replace(/-/g,"")+"T120000Z","DTSTART;VALUE=DATE:"+st,"DTEND;VALUE=DATE:"+en,"SUMMARY:"+icsEsc(s.title),"DESCRIPTION:"+icsEsc(s.text),"TRANSP:TRANSPARENT","END:VEVENT","END:VCALENDAR"].map(fold).join("\r\n")+"\r\n"; }
function shareLint(s){ const t=(s.title||"")+" "+(s.text||""), out=[];
  if(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(t) || /(?:\+44\s?|\b0)(?:\d[\s-]?){9,10}\b/.test(t)) out.push(["warn","The text contains an email address or phone number. Remove it unless the person agreed."]);
  if(IDENTITY_RX.test(t)) out.push(["warn","The text mentions an identity characteristic. Keep it only if the person described themselves this way and agreed to share it."]);
  if(/honour|new year|birthday honours|\bMBE\b|\bOBE\b|\bBEM\b/i.test(t)) out.push(["bad","Honours nominations are confidential. Do not post or send them to the nominee or a channel."]);
  if(/\[needs evidence\]/i.test(t)) out.push(["warn","There are [needs evidence] gaps to fill first."]);
  if(!out.length) out.push(["ok","No contact details, identity terms or Honours references found. Still read it through."]);
  return out; }

/* ---- Live connectors (the viewer's own claude.ai connectors) ---- */
let MCP = null, MCP_STATE = "checking";
capUse("mcp").then(m=>{ MCP=m; MCP_STATE = m ? "ready" : "off"; paintLive(); });
const MCP_FIX = {
  needs_reauth:s=>`Reconnect ${s} in claude.ai Settings → Connectors, then try again.`,
  server_not_connected:s=>`Add the ${s} connector in claude.ai Settings → Connectors to use this. The links and copy options work without it.`,
  selection_required:s=>`Choose which ${s} account to use when claude.ai asks, then try again.`,
  not_in_manifest:s=>`${s} is turned off for this page. You can allow it from the page's Permissions menu.`,
  approval_required:s=>`This needs your approval. Claude.ai asks when you click, if the page is open there.`,
  consent_required:s=>`You have not allowed ${s} for this page. Click again to be asked.`,
  blocked_by_policy:s=>`Your organisation's policy blocks ${s} here.`,
  server_unavailable:s=>`${s} did not respond. Check ${s} before trying again, in case it was created.`,
  upstream_error:s=>`${s} reported a problem. Check ${s} before trying again, in case it was created.`,
  not_granted:()=>`Connectors are not available in this view. Use the links or copy options instead.`,
  capability_disabled:()=>`Connectors are not available in this view. Use the links or copy options instead.`
};
function mcpMsg(e, server){ const c=(e&&e.code)||"upstream_error"; if(c==="tool_error") return `${server} could not do this. ${clip(String((e&&e.message)||"").replace(/[{}"]/g," "),160)}`; return (MCP_FIX[c]||MCP_FIX.upstream_error)(server); }
function findUrl(o){ let u=""; JSON.stringify(o||{}, (k,v)=>{ if(!u && typeof v==="string" && /^https:\/\/(mail|calendar|www)\.google\.com\//.test(v)) u=v; return v; }); return u; }
async function liveDo(id, s, msg){
  if(!MCP){ msg.textContent=MCP_FIX.not_granted(); return; }
  const server = id==="gmail-live" ? "Gmail" : "Google Calendar";
  try{
    const r = id==="gmail-live"
      ? await MCP.callTool("Gmail","create_draft", Object.assign({subject:clip(s.title,200), body:s.text}, s.email?{to:[s.email]}:{}))
      : await MCP.callTool("Google Calendar","create_event", {summary:clip(s.title,200), description:s.text, startTime:s.date+"T00:00:00", endTime:addDays(s.date,1)+"T00:00:00", allDay:true});
    const u=findUrl(r.payload||r);
    msg.innerHTML = (id==="gmail-live" ? "Draft created in your Gmail. It has not been sent." : "Event added to your Google Calendar.") + (u?` <a href="${esc(u)}" target="_blank" rel="noopener">Open it</a>`:"");
  }catch(e){ msg.textContent = mcpMsg(e, server); }
}
async function paintLive(){ const els=$$(".livestate"); if(!els.length) return;
  let txt = MCP_STATE==="checking" ? "Checking your connectors…" : MCP_STATE==="off" ? "Live connectors are not available in this view. Links and copy options still work." : "Live connectors available: the page asks your permission the first time you use one.";
  if(MCP){ try{ const r=await MCP.listTools(); const names=(r.servers||[]).filter(x=>x.kind!=="artifact").map(x=>x.server+(x.authStatus==="needs_reauth"?" (reconnect needed)":"")); if(names.length) txt+=" Declared: "+names.join(", ")+"."; }catch(e){} }
  els.forEach(el=>{ el.textContent=txt; el.dataset.state=MCP_STATE; }); }

/* ---- The Send and share dialog ---- */
let SHARE = {title:"", text:"", email:"", date:"", from:"", ok:false}, SHARE_RET=null;
function upcomingDates(){ return allOcc().filter(o=>o.date>=TODAY && ["DEADLINE","MILESTONE","CEREMONY"].includes(o.e.type)).slice(0,24); }
function shareDlgHTML(){ const groups=[...new Set(SHARE_ACTIONS.map(a=>a.group))];
  return `<div id="shareDlg" class="sdlg" hidden role="dialog" aria-modal="true" aria-labelledby="shareH"><div class="sbox sharebox">
  <div class="row" style="justify-content:space-between"><h2 id="shareH" class="h4">${ico("send","ico")} Send or share</h2><button type="button" class="iconbtn" id="shareClose" aria-label="Close">✕</button></div>
  <p class="small muted">Nothing leaves the Hub until you choose an app below. Links open the app with your text filled in; you press Send there.</p>
  <label class="fld">Title<input id="shTitle" type="text" maxlength="150"></label>
  <label class="fld">Message<textarea id="shText" rows="6"></textarea></label>
  <div class="grid g2"><label class="fld">Their work email (optional, only to open a chat or draft; not saved)<input id="shEmail" type="email" autocomplete="off" spellcheck="false" placeholder="Their work email address"></label>
  <label class="fld">Date (for calendar options)<select id="shDate"><option value="">No date</option>${upcomingDates().map(o=>`<option value="${o.date}">${esc(fmt(o.date))} · ${esc(ROUTE[o.e.route]||o.e.route)}: ${esc(TYPE_LABEL[o.e.type])}</option>`).join("")}<option value="custom">Another date…</option></select><input id="shDateC" type="date" hidden aria-label="Another date"></label></div>
  <div id="shLint" class="stack" aria-live="polite"></div>
  <label class="chk"><input type="checkbox" id="shOk"> I have read this and it is OK for the people who will see it.</label>
  <div id="shActs" class="stack">${groups.map(g=>`<div class="shgroup" data-g="${esc(g)}"><span class="eyebrow">${esc(g)}</span><div class="shrow">${SHARE_ACTIONS.filter(a=>a.group===g).map(a=>{ const i=INTEG.find(x=>x[0]===a.integ); const tip=i?i[5]+(i[8]==="C"?" Undocumented link pattern.":""):""; return a.kind==="link" ? `<a class="shact" data-act="${a.id}" href="#" target="_blank" rel="noopener" title="${esc(tip)}">${ico(a.icon,"ico")}<span>${esc(a.label)}</span></a>` : `<button type="button" class="shact" data-act="${a.id}" title="${esc(tip)}">${ico(a.icon,"ico")}<span>${esc(a.label)}</span>${a.kind==="live"?'<span class="flag">live</span>':""}</button>`; }).join("")}</div></div>`).join("")}</div>
  <p class="copyok" id="shMsg" aria-live="polite"></p>
  <textarea id="shCopy" class="sr" readonly tabindex="-1" aria-hidden="true"></textarea>
  <p class="small muted"><span class="livestate"></span> <a href="#connect-govern" id="shRules">How sharing is kept safe</a></p></div></div>`; }
function openShare(init){ SHARE = Object.assign({title:"", text:"", email:"", date:"", from:""}, init||{}, {ok:false}); SHARE_RET=document.activeElement;
  const dlg=$("#shareDlg"); $("#shTitle").value=SHARE.title; $("#shText").value=SHARE.text; $("#shEmail").value=""; $("#shOk").checked=false; $("#shMsg").textContent="";
  const sel=$("#shDate"); if(SHARE.date && ![...sel.options].some(o=>o.value===SHARE.date)){ sel.value="custom"; $("#shDateC").hidden=false; $("#shDateC").value=SHARE.date; } else { sel.value=SHARE.date||""; $("#shDateC").hidden=true; }
  dlg.hidden=false; syncShare(); paintLive(); $("#shTitle").focus(); }
function closeShare(){ $("#shareDlg").hidden=true; SHARE.email=""; $("#shEmail").value=""; if(SHARE_RET&&SHARE_RET.focus) SHARE_RET.focus(); }
function syncShare(){ SHARE.title=$("#shTitle").value.trim(); SHARE.text=$("#shText").value; SHARE.email=$("#shEmail").value.trim(); const sv=$("#shDate").value; $("#shDateC").hidden = sv!=="custom"; SHARE.date = sv==="custom" ? $("#shDateC").value : sv; SHARE.ok=$("#shOk").checked;
  $("#shLint").innerHTML = shareLint(SHARE).map(([k,t])=>`<div class="note ${k}">${esc(t)}</div>`).join(""); noteIcons($("#shLint"));
  const emailOk = !SHARE.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(SHARE.email);
  SHARE_ACTIONS.forEach(a=>{ const el=$(`#shActs [data-act="${a.id}"]`); if(!el) return; let why="";
    if(!SHARE.ok) why="Tick the box above first"; else if(!SHARE.text.trim()) why="Add a message"; else if(a.needs==="date"&&!SHARE.date) why="Choose a date"; else if(a.needs==="email"&&(!SHARE.email||!emailOk)) why="Add their work email"; else if(!emailOk&&a.kind!=="copy") why="Check the email address"; else if(a.kind==="live"&&!MCP) why="Connectors are not available in this view";
    el.setAttribute("aria-disabled", why?"true":"false"); el.dataset.why=why;
    if(a.kind==="link") el.setAttribute("href", why ? "#" : (SHARE_LINK[a.id](SHARE)||"#")); }); }
async function shareAct(id, el){ const a=SHARE_ACTIONS.find(x=>x.id===id), msg=$("#shMsg"); if(el.getAttribute("aria-disabled")==="true"){ msg.textContent=el.dataset.why||"Not available"; return false; }
  const p=payloads(SHARE);
  const copy=async t=>{ try{ await navigator.clipboard.writeText(t); return true; }catch(e){ const ta=$("#shCopy"); ta.value=t; ta.classList.remove("sr"); ta.removeAttribute("aria-hidden"); ta.focus(); ta.select(); return false; } };
  if(a.kind==="link"){ msg.textContent="Opening "+a.label+" in a new tab. Check the text and press Send there."; return true; }
  if(a.kind==="copy"){ const ok=await copy(COPY_OF[id](p)); msg.textContent= ok ? `Copied ${a.label}. Paste it into the app or give it to the person who owns the webhook.` : "Selected below: press Ctrl+C or Cmd+C to copy."; return false; }
  if(a.kind==="praise"){ const ok=await copy(COPY_OF[id](p)); msg.innerHTML = `${ok?"Copied.":"Selected below; copy it first."} <a href="${PRAISE_OPEN[id]}" target="_blank" rel="noopener">Open ${id==="teams-praise"?"Teams":"Viva Engage"}</a>, ${id==="teams-praise"?"choose Praise in the chat, pick a badge and paste":"choose Praise in the community and paste"}.`; return false; }
  if(a.kind==="download"){ await saveFile("recognition-"+SHARE.date+".ics", shareICS(SHARE), msg); return false; }
  if(a.kind==="live"){ el.setAttribute("aria-disabled","true"); msg.textContent="Working…"; await liveDo(id, SHARE, msg); el.setAttribute("aria-disabled","false"); return false; }
  return false; }
function bindShare(){ const dlg=$("#shareDlg");
  ["shTitle","shText","shEmail","shDateC"].forEach(i=>$("#"+i).addEventListener("input", syncShare)); ["shDate","shOk"].forEach(i=>$("#"+i).addEventListener("change", syncShare));
  $("#shareClose").addEventListener("click", closeShare); dlg.addEventListener("click", e=>{ if(e.target.id==="shareDlg") closeShare(); });
  dlg.addEventListener("keydown", e=>{ if(e.key==="Escape"){ e.stopPropagation(); closeShare(); } if(e.key==="Tab"){ const f=$$("input,textarea,select,button,a[href]",dlg).filter(x=>x.offsetParent!==null && !x.hidden); const i=f.indexOf(document.activeElement); if(e.shiftKey&&i<=0){ e.preventDefault(); f[f.length-1].focus(); } else if(!e.shiftKey&&i===f.length-1){ e.preventDefault(); f[0].focus(); } } });
  $$("#shActs .shact").forEach(el=>el.addEventListener("click", async e=>{ const a=SHARE_ACTIONS.find(x=>x.id===el.dataset.act); if(a.kind!=="link"||el.getAttribute("aria-disabled")==="true") e.preventDefault(); await shareAct(el.dataset.act, el); }));
  $("#shRules").addEventListener("click", ()=>closeShare()); }

/* ---- Request an integration (declarative workflow) ---- */
WF.connect = {id:"connect", icon:"plug", group:"Integrations", name:"Request an integration", who:"Service owner with IT, security and DPO/IG", time:"20 minutes plus reviews", outputs:["Integration request record"],
  steps:[
    {id:"what", title:"The integration", icon:"plug", intro:"Say what should connect and why. Use a role, not a person's name.", fields:[{k:"app",type:"select",label:"App or system",options:()=>opt(INTEG.filter(i=>i[3]!=="retired").map(i=>i[2]).concat(["Other (describe below)"]))(),required:true},{k:"dir",type:"select",label:"Direction",options:opt(["Hub to app (send)","App to Hub (receive)","Both directions"])},{k:"purpose",type:"area",label:"Purpose and the user need it meets",required:true},{k:"fields",type:"rows",label:"Data that would move (describe fields, never real data)",cols:[["field","Field"],["example","Made-up example"],["personal","Personal data? (yes/no)"]],min:3},{k:"owner",type:"text",label:"Owning role",hint:"For example: service owner, network lead"}], gate:[{rule:"required",k:"app",msg:"App"},{rule:"required",k:"purpose",msg:"Purpose"}]},
    {id:"safe", title:"Safeguards", icon:"safeguards", intro:"Each box must be true. These follow the integration rules I1 to I10.", fields:[{k:"c_user",type:"check",label:"I1: a person starts every send; nothing runs automatically"},{k:"c_min",type:"check",label:"I3: only the fields listed move; no names unless the person agreed"},{k:"c_secret",type:"check",label:"I5: webhook URLs and keys stay with the app owner, never in the Hub"},{k:"c_pay",type:"check",label:"I7: nothing flows to or from pay, ratings or HR case systems"},{k:"c_dpia",type:"check",label:"DPIA screening done with DPO/IG"},{k:"c_sec",type:"check",label:"Security review of the app or connector booked or done"},{k:"c_off",type:"check",label:"I10: owner and switch-off route recorded"}], gate:[{rule:"checked",k:"c_user",msg:"Person-started sends"},{rule:"checked",k:"c_min",msg:"Minimum data"},{rule:"checked",k:"c_secret",msg:"Secrets"},{rule:"checked",k:"c_pay",msg:"Pay boundary"},{rule:"checked",k:"c_dpia",msg:"DPIA screening"}], out:"genericOut", outText:"connectText"}
  ]};
TEXTS.connectText = d => { const rows=(d.fields||[]).filter(r=>r&&r.field); return `INTEGRATION REQUEST\nApp or system: ${d.app||""}\nDirection: ${d.dir||"Not stated"}\nOwning role: ${d.owner||"[needs owner]"}\n\nPurpose and user need:\n${d.purpose||""}\n\nData that would move:\n${rows.length?rows.map(r=>"- "+r.field+(r.example?" (e.g. "+r.example+")":"")+(String(r.personal||"").toLowerCase().startsWith("y")?" [personal data]":"")).join("\n"):"- [needs field list]"}\n\nSafeguards confirmed: person-started sends (I1); minimum data (I3); secrets held by the app owner (I5); no pay, ratings or case systems (I7); DPIA screening${d.c_sec?"; security review":""}${d.c_off?"; owner and switch-off route (I10)":""}.\nStatus: requested. Not approved until security and DPO/IG sign off.`; };
GUIDE.connect = {purpose:"Ask for a new connection between the Hub and another app, with the safeguards agreed up front.", when:"Before anyone builds a webhook, automation, bot or connector for recognition.", cadence:"Event-driven; integrations are reviewed quarterly.", raci:["Service owner","Senior responsible owner","IT security and DPO/IG","Network panel"], sla:"Decision within 20 working days of a complete request.", done:"Request recorded with purpose, data, owner and safeguards; review outcome noted.", pitfalls:["Pasting a webhook URL into a shared document","Sending names or identity details to a channel without consent","Connecting to pay or performance systems"], related:["connect-govern","connect-hub","connect-formats"]};
WF_GROUPS.push(["Integrations",["connect"]]);
RHYTHM.push({id:"integ", name:"Integration review", freq:"quarterly", anchor:"2027-01-20", wf:"connect", owner:"Service owner", source:"Integration rule I10 (cadence is operating policy)"});

/* ---- Views ---- */
const integById = id => INTEG.find(i=>i[0]===id);
const srcLink = id => { const s=C.sourcesPublic.find(x=>x[0]===id); return s ? `<a href="${esc(s[3])}" target="_blank" rel="noopener">${esc(id)}: ${esc(s[1])}</a>` : ""; };
const provTag = c => `<abbr class="prov ${c==="L"?"P":c}" title="${c==="V"?"Checked against the vendor's page on the build date":c==="L"?"Official page located on the build date; not read in full":c==="P"?"Operating policy or design decision":"Widely used but not documented by the vendor"}">${c}</abbr>`;
function integCard(i){ const t=TIER[i[3]]; return `<div class="card stack integ" data-tier="${i[3]}"><div class="row" style="gap:10px;align-items:flex-start"><span class="cico" aria-hidden="true">${ico(t[1],"ico")}</span><div class="stack" style="gap:2px"><span class="eyebrow">${esc(i[1])} · ${esc(t[0])}</span><strong>${esc(i[2])}</strong></div></div>
  <p class="small">${esc(i[5])}</p><p class="small muted">${esc(i[6])}</p>
  <div class="row" style="justify-content:space-between;gap:8px">${pill(i[4], i[3]==="retired"?"bad":i[3]==="boundary"?"mute":/Available now/.test(i[4])?"ok":/if connected/.test(i[4])?"info":"warn")}<span class="small">${i[7]?srcLink(i[7]):""} ${provTag(i[8])}</span></div></div>`; }
function launchers(){ const cs=wfCases("thanks"); const last=cs.length?cs[cs.length-1]:null; const nd=upcomingDates().find(o=>o.e.type==="DEADLINE");
  return `<div class="grid g3 launch">
  <button type="button" class="card stack launchcard" data-launch="thanks">${ico("thanks","ico big")}<strong>Send a thank-you</strong><span class="small muted">${last?"Uses your latest thank-you draft":"Starts from a short template"}</span></button>
  <button type="button" class="card stack launchcard" data-launch="deadline">${ico("calendar","ico big")}<strong>Add a deadline to my calendar</strong><span class="small muted">${nd?esc(ROUTE[nd.e.route]||nd.e.route)+", "+esc(fmt(nd.date)):"Pick any upcoming date"}</span></button>
  <button type="button" class="card stack launchcard" data-launch="call">${ico("opencall","ico big")}<strong>Tell the team a call is open</strong><span class="small muted">For a team channel in Teams, Slack or Google Chat</span></button></div>`; }
function bindLaunchers(){ $$("[data-launch]").forEach(b=>b.onclick=()=>{ const k=b.dataset.launch;
  if(k==="thanks"){ const cs=wfCases("thanks"); const last=cs.length?cs[cs.length-1]:null; openShare({title:"Thank you", text: last&&last.data ? OUTTEXT.thanks(last.data) : thanksTemplate({tone:"warm", did:"[what they did]", impact:"[the difference it made]"}), from:"connect"}); }
  if(k==="deadline"){ const o=upcomingDates().find(o=>o.e.type==="DEADLINE"); openShare({title: o?(ROUTE[o.e.route]||o.e.route)+": deadline":"Recognition deadline", text: o?("Deadline for "+(ROUTE[o.e.route]||o.e.route)+" on "+fmtLong(o.date)+". Check the organiser's site for current rules before nominating."):"", date:o?o.date:"", from:"connect"}); }
  if(k==="call"){ const o=upcomingDates().find(o=>o.e.type==="DEADLINE"); openShare({title:"Nominations are open", text:`Do you know someone whose work deserves recognition? ${o?(ROUTE[o.e.route]||o.e.route)+" closes on "+fmtLong(o.date)+". ":""}Use the Hub's Nominate workflow to draft a nomination, and ask the person before you nominate them. Talk to your line manager if you would like help.`, date:o?o.date:"", from:"connect"}); } }); }
V.cx_hub = () => { const counts={}; INTEG.forEach(i=>counts[i[3]]=(counts[i[3]]||0)+1);
  return `<div class="cxhero"><div class="stack"><span class="eyebrow">Connect</span><h3 id="cx-h" class="cxhero-t">Send recognition where people already work</h3><p>Open Teams, Outlook, Gmail, Google Calendar, Slack and other apps with your message filled in, or copy a ready-made format for a channel. You stay in control: nothing is sent until you press Send in the app.</p><p class="small"><span class="livestate"></span></p></div><div class="cxorbit" aria-hidden="true">${["apps","cloud","chat","mail","calendar","webhook","badge","video"].map((k,i)=>`<span class="orb o${i}">${ico(k,"ico")}</span>`).join("")}<span class="orb core">${ico("thanks","ico")}</span></div></div>
  <h3 id="cx-quick">Start here</h3>${launchers()}
  <h3 id="cx-tiers">Five ways to connect</h3><div class="grid g3">${["link","live","manual","format","admin"].map(k=>`<div class="card stack"><div class="row" style="gap:8px"><span class="cico" aria-hidden="true">${ico(TIER[k][1],"ico")}</span><strong>${esc(TIER[k][0])}</strong></div><p class="small">${esc({link:"A link opens the app with your text filled in. Works now, no set-up.",live:"Uses your own claude.ai connector to create a Gmail draft or a calendar event. Asks your permission first.",manual:"Copy formatted text and paste it, for example into Praise in Teams or Viva Engage.",format:"Ready-made JSON or files, such as Adaptive Cards, Block Kit, .ics and Open Badges.",admin:"A channel owner sets up a webhook or workflow. The Hub gives them the payload and a recipe."}[k])}</p><p class="small muted">${counts[k]||0} option${counts[k]===1?"":"s"}</p></div>`).join("")}</div>
  <h3 id="cx-flow">How a send works</h3>${flowSVG()}
  <h3 id="cx-reg">Integration register</h3>${table("tIntegReg",{cols:[{k:"vendor",l:"Vendor"},{k:"name",l:"Integration"},{k:"tier",l:"Way to connect"},{k:"status",l:"Status"},{k:"prov",l:"Basis"}], rows:INTEG.map(i=>({vendor:i[1],name:i[2],tier:TIER[i[3]][0],status:i[4],prov:{V:"Vendor page read",L:"Vendor page located",C:"Undocumented pattern",P:"Policy"}[i[8]]})), filters:["vendor","tier","status"], groups:["vendor","tier"], defaultGroup:"vendor"})}
  <p class="small muted">Basis: V checked against the vendor's page on ${fmt(D.meta.build_date)}; L official page located but not read in full; C widely used link pattern that the vendor does not document; P operating policy.</p>`; };
V.cx_hub.after = () => { renderTable("tIntegReg"); bindLaunchers(); paintLive(); };
function flowSVG(){ const box=(x,l,s,k)=>`<g transform="translate(${x},14)"><rect width="150" height="78" rx="10" class="flbox fl-${k}"/><text x="75" y="34" text-anchor="middle" class="fl-t">${l}</text><text x="75" y="56" text-anchor="middle" class="fl-s">${s}</text></g>`;
  return `<figure class="card flowfig"><svg viewBox="0 0 700 106" role="img" aria-label="How a send works: you write or pick a message, the Hub checks it and you tick that it is OK, you choose an app, and you press Send in that app.">${box(0,"1 Write","or pick a message","a")}${box(183,"2 Check","privacy lint and tick","b")}${box(366,"3 Choose","Teams, Gmail, Slack…","c")}${box(549,"4 Send","you press Send there","d")}<g class="fl-arrow"><path d="M152 53h28M335 53h28M518 53h28"/><path d="M174 47l6 6-6 6M357 47l6 6-6 6M540 47l6 6-6 6"/></g></svg><figcaption class="small muted">The Hub never sends on its own. Webhooks and automations are set up and run by the app's owner.</figcaption></figure>`; }
function vendorView(cat, intro, extra){ return () => `<p class="lede">${intro}</p><div class="row"><button type="button" class="btn" data-launch="thanks">${ico("send","ico")}<span>Send something now</span></button></div><div class="grid g3">${INTEG.filter(i=>i[9]===cat).map(integCard).join("")}</div>${extra?extra():""}`; }
function recipe(title, steps, code, note){ return `<details class="card stack recipe"><summary><strong>${esc(title)}</strong></summary><ol class="small">${steps.map(s=>`<li>${esc(s)}</li>`).join("")}</ol>${code?`<pre tabindex="0" class="outpre code">${esc(code)}</pre>`:""}${note?`<p class="small muted">${esc(note)}</p>`:""}</details>`; }
const SAMPLE = {title:"Thank you for leading the network's open call", text:"Your plan made it easy for colleagues across three teams to take part, and nominations doubled on last year. Thank you."};
const CURL = `curl -X POST -H "Content-Type: application/json" \\\n  --data @payload.json "$WEBHOOK_URL"\n# WEBHOOK_URL is held by the app owner. Never paste it into the Hub or a shared document.`;
V.cx_microsoft = vendorView("microsoft", "Teams, Praise, Outlook and Viva Engage. Links open the app with your message ready; you press Send.", ()=>`<h3 id="cx-ms-r">Recipes for channel owners</h3>${recipe("Post an Adaptive Card to a Teams channel with Workflows",["In Teams, open Workflows and choose the template that posts to a channel when a webhook request is received.","Pick the team and channel. Copy the URL it gives you and keep it private.","Send the Adaptive Card JSON from the Hub's Send dialog, or the sample below, to that URL from your approved automation tool."], JSON.stringify(payloads(SAMPLE).adaptive,null,2)+"\n\n"+CURL, "Office 365 connector webhooks were retired between 18 and 22 May 2026. Workflows is the supported route.")}${recipe("Send Praise in Teams",["Copy your message from the Send dialog (Teams Praise).","In Teams, open a chat with the person or the channel.","Open Praise, pick a badge, paste your message and send. Microsoft's help page shows where Praise appears in your version of Teams."],"","Praise data is processed by Viva Insights. Admins can allow or block Praise for everyone or for some people.")}<p class="small">Help: ${srcLink("S65")} · ${srcLink("S52")}</p>`);
V.cx_google = vendorView("google", "Gmail, Google Calendar and Google Chat. Live options use your own claude.ai connectors and ask your permission first.", ()=>`<div class="note"><strong>Live connectors.</strong> <span class="livestate"></span> A Gmail draft is never sent by the Hub. A calendar event is added only to your own calendar.</div><h3 id="cx-g-r">Recipe for space managers</h3>${recipe("Post to a Google Chat space with an incoming webhook",["In Google Chat on the web, open the space, then Apps and integrations, then Add webhooks.","Name it, save, and copy the link. Keep it private: anyone with it can post to the space.","Send the Google Chat JSON from the Send dialog, or the sample below, from your approved automation tool."], JSON.stringify(payloads(SAMPLE).googleChat,null,2)+"\n\n"+CURL, "Needs a Business or Enterprise Workspace account, with webhooks allowed by your admin. Limit: one request per second per space.")}`);
V.cx_slack = vendorView("slack", "Slack messages, Block Kit for incoming webhooks, and Workflow Builder variables.", ()=>`<h3 id="cx-s-r">Recipes for workspace admins</h3>${recipe("Post with an incoming webhook (Block Kit)",["A Slack app owner turns on Incoming Webhooks and adds a webhook for one channel.","Keep the URL private. Slack treats it as a secret and revokes leaked ones.","Send the Block Kit JSON from the Send dialog, or the sample below."], JSON.stringify(payloads(SAMPLE).blockKit,null,2)+"\n\n"+CURL)}${recipe("Start a Workflow Builder workflow",["In Workflow Builder, create a workflow that starts from a webhook.","Add the variables title and message as text. Keep to flat key and value pairs.","Add steps, for example post to #recognition and send a message to the person's manager. Publish and keep the URL private."], JSON.stringify(payloads(SAMPLE).slackVars,null,2)+"\n\n"+CURL, "Webhook-started workflows are on paid Slack plans. Up to 20 variables; nested JSON is not supported; a missing variable makes the run fail.")}`);
V.cx_others = vendorView("others", "Zoom, Webex, Atlassian, Notion, automation platforms, any email or calendar app, and recognition platforms.", ()=>`<h3 id="cx-o-r">Recipes</h3>${recipe("Zoom Team Chat or Webex space",["Install the Incoming Webhook app (Zoom App Marketplace) or the Incoming Webhooks integration (Webex App Hub).","Choose the channel or space and keep the URL private.","Send the plain text or Markdown from the Send dialog using the vendor's documented format."],"","Formats differ by vendor; follow the vendor's own documentation for the message body.")}${recipe("Automation platforms",["Use only a platform your department has approved.","Start the automation from a webhook and map only the title and message fields.","Never add lookups of names, grades or identity data."],"",null)}`);
V.cx_formats = () => { const p=payloads(SAMPLE); const f=[["Adaptive Card","Teams Workflows and other Microsoft apps","adaptive",JSON.stringify(p.adaptive,null,2)],["Block Kit","Slack incoming webhooks","blocks",JSON.stringify(p.blockKit,null,2)],["Slack Workflow variables","Slack Workflow Builder (flat JSON)","vars",JSON.stringify(p.slackVars,null,2)],["Google Chat message","Google Chat incoming webhooks","gchat",JSON.stringify(p.googleChat,null,2)],["Markdown","Confluence, Jira, Notion, Docs, GitHub","md",p.markdown],["Open Badges 3.0","Portable badges (unsigned template)","badge",JSON.stringify(p.badge,null,2)],["iCalendar (.ics)","Every calendar app","ics",shareICS({title:"Example deadline", text:"Check the organiser's site.", date:TODAY})]];
  return `<p class="lede">Open standards and vendor formats the Hub produces. Each one is built from the same title and message, so what you checked is what gets sent.</p><div class="grid g2">${f.map(x=>`<div class="card stack"><strong>${esc(x[0])}</strong><p class="small muted">${esc(x[1])}</p><pre tabindex="0" class="outpre code" id="fmt-${x[2]}">${esc(x[3])}</pre></div>`).join("")}</div><div class="grid g2">${integCard(integById("badges"))}${integCard(integById("ics"))}</div><div class="note"><strong>Open Badges.</strong> Version 3.0 follows the W3C Verifiable Credentials model. The template has no recipient or proof: an issuing platform adds those, and the person decides where to show it.</div>`; };
V.cx_govern = () => `<p class="lede">The rules every integration follows, and what the Hub will not connect to.</p><div class="grid g2">${INTEG_RULES.map(r=>`<div class="card stack"><div class="row" style="gap:8px"><span class="rulechip">${r[0]}</span><strong>${esc(r[1])}</strong></div><p class="small">${esc(r[2])}</p></div>`).join("")}</div>
  <h3 id="cx-gv-flow">Data flow</h3><div class="tblwrap"><table><thead><tr><th scope="col">Way to connect</th><th scope="col">What leaves the Hub</th><th scope="col">Who starts it</th><th scope="col">Where it goes</th><th scope="col">Stored by the Hub</th></tr></thead><tbody>
  <tr><td>Open in the app</td><td>Title and message in the link</td><td>You, by clicking</td><td>Your own app session</td><td>Nothing</td></tr>
  <tr><td>Live connector</td><td>Title, message and date</td><td>You, by clicking, after permission</td><td>Your own Gmail drafts or calendar</td><td>Nothing</td></tr>
  <tr><td>Copy and paste</td><td>What you paste</td><td>You</td><td>Wherever you paste it</td><td>Nothing</td></tr>
  <tr><td>Admin automation</td><td>The payload the owner sends</td><td>The channel owner</td><td>One channel or space</td><td>Nothing; the URL is never entered here</td></tr></tbody></table></div>
  <h3 id="cx-gv-not">Not connected by design</h3><div class="grid g2">${INTEG.filter(i=>["boundary","retired"].includes(i[3])).map(integCard).join("")}</div>
  <div class="row"><a class="btn" href="#workflows-connect">${ico("plug","ico")}<span>Request an integration</span></a></div>`;
V.cx_send = () => `<p class="lede">Pick what to send. The Send dialog shows the text, checks it, and offers every app.</p>${launchers()}<h3 id="cx-sd-any">Or start from any output</h3><p>Every workflow output in the Hub now has a <strong>Send to Teams, Slack, Outlook, Gmail and more</strong> button under it, so a thank-you, a credits block or a release note goes straight to the right app.</p><div class="row"><button type="button" class="btn ghost" data-blank="1">${ico("send","ico")}<span>Start with a blank message</span></button></div>`;
V.cx_send.after = () => { bindLaunchers(); $$("[data-blank]").forEach(b=>b.onclick=()=>openShare({title:"", text:"", from:"connect"})); };
["cx_microsoft","cx_google","cx_slack","cx_others"].forEach(k=>{ V[k].after = ()=>{ bindLaunchers(); paintLive(); }; });

/* ---- Site map with recently viewed ---- */
V.help_sitemap = () => { const rec=store.get("recent",[]).filter(h=>SECTIONS.some(s=>h.startsWith(s.id+"-")));
  const lbl=h=>{ const [s,t]=h.split("-"); const sec=SECTIONS.find(x=>x.id===s); const tab=sec&&sec.tabs.find(x=>x[0]===t); return sec&&tab?sec.label+" › "+tab[1]:h; };
  return `<p class="lede">Every page in the Hub, including workflows that are not shown as tabs.</p>${rec.length?`<div class="card stack"><h3 id="sm-recent" class="h4">Recently viewed</h3><ul class="tick small">${rec.slice(0,8).map(h=>`<li><a href="#${h}">${esc(lbl(h))}</a></li>`).join("")}</ul></div>`:""}
  <div class="grid g3 sitemap">${SECTIONS.map(s=>`<div class="card stack"><h3 id="sm-${s.id}" class="h4"><a href="#${s.id}">${esc(s.label)}</a></h3><ul class="small smlist">${s.tabs.map(t=>`<li><a href="#${s.id}-${t[0]}">${ico(TAB_ICON[t[0]]||s.id,"ico")}<span>${esc(t[1])}</span></a></li>`).join("")}</ul></div>`).join("")}</div>`; };

/* ---- Assistant tool ---- */
const ASK_TOOLS_V6 = () => [{name:"integration_options", description:"Ways to send or share recognition through Microsoft 365 (Teams chat, Praise, Outlook, Viva Engage, Workflows), Google Workspace (Gmail, Calendar, Chat), Slack, Zoom, Webex and other apps, with status, set-up and safeguards. Use to answer how to post or send recognition somewhere.", execute:()=>({integrations:INTEG.map(i=>({vendor:i[1],name:i[2],way:TIER[i[3]][0],status:i[4],what:i[5],how:i[6],basis:i[8]})), rules:INTEG_RULES.map(r=>r[0]+" "+r[1]+": "+r[2]), page:"#connect-hub", send:"Use the Send dialog from Connect › Send and share, or the Send button under any workflow output."})}];

/* ---- Further improvements identified in this release ---- */
ROADMAP.push(
  ["Teams app and Viva Connections card","Package the Hub as a Teams tab and an Adaptive Card Extension on the Viva Connections dashboard.","Needs hosting, an app registration and tenant admin approval","Under consideration"],
  ["Share to Teams button","Embed Microsoft's Share to Teams launcher once the Hub is hosted on the intranet.","Needs hosting on an allowed domain","Planned"],
  ["Welsh language version","Offer the Hub in Welsh for bodies with Welsh language duties.","Needs translation and review","Under consideration"],
  ["Single sign-on and role-based views","Show each person the pages for their role automatically.","Needs identity integration and a DPIA","Under consideration"]
);
NOT_PLANNED.push(["Automatic posting to channels","Breaks rule I1: a person starts every send."],["Connecting to HR, payroll or performance systems","Breaks the pay and performance boundary (rule I7)."]);


DEFECTS.push(
  ["D23","Global navigation overflowed on some narrow screens","Masthead (found by the release 6 width test)","At 320 to 389 px, and at 641 to 900 px on sections with long names, the section menu button did not fit beside the tools, so K18 failed on those pages.","Tool labels fold earlier; below 481 px the check badge, help and theme buttons move into the menu.","Width test: every page at 320, 375, 768, 1024, 1280, 1440 and 1920 px","Fixed"],
  ["D24","Calendar type CONFIDENTIAL had no glossary entry","Calendar import guide and text-only version","The tooltip term resolved to nothing, so K19 failed on two pages.","Glossary entry added.","Width test runs K19 on every page","Fixed"],
  ["D25","Page-level self-checks ran on one page per screen size","Test harness","Smoke tests read the self-checks only on the last page visited, which hid D23 and D24.","New width test reads every self-check on every page at seven widths.","widths.py","Fixed"]
);

