/* ================= Start-up: wire controls, run the self-checks and render (always the last part) ================= */
document.documentElement.lang = "en-GB";
$("#drawerToggle").addEventListener("click",()=>setDrawer($("#frame").classList.contains("closed")));
$("#drawerOpen").addEventListener("click",()=>setDrawer(true)); $("#drawerClose").addEventListener("click",()=>{ setDrawer(false,true); $("#drawerOpen").focus(); }); $("#dback").addEventListener("click",()=>setDrawer(false,true));
document.addEventListener("keydown",e=>{ if(e.key==="Escape" && innerWidth<=900 && !$("#frame").classList.contains("closed")){ setDrawer(false,true); $("#drawerOpen").focus(); } });
setDrawer(innerWidth>900 ? store.get("drawer",true) : false, true);
addEventListener("resize", ()=>{ const b=$("#dback"); if(b && innerWidth>900) b.hidden=true; });
$("#themeBtn").addEventListener("click",()=>{ const r=document.documentElement; const dark = r.dataset.theme ? r.dataset.theme==="dark" : matchMedia("(prefers-color-scheme: dark)").matches; r.dataset.theme = dark?"light":"dark"; store.set("theme", r.dataset.theme); });
const th=store.get("theme",null); if (th) document.documentElement.dataset.theme=th;
footer(); staleness(); buildNav(); try{ ghDecorate(); }catch(e){}
cur=parseHash(); CHECKS=runChecks(baseCtx()); render(); refreshChecks();
if (cur.s==="assurance"||cur.s==="overview") render();
if (cur.s==="overview" && cur.t==="front") showSplash();
addEventListener("hashchange", ()=>{ route(); refreshChecks(); });
addEventListener("resize", ()=>{ fitNav(); });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(()=>{ fitNav(); refreshChecks(); });
$("#searchBtn").addEventListener("click", openSearch);
$("#searchIn").addEventListener("input", e=>drawSearch(e.target.value));
$("#searchIn").addEventListener("keydown", e=>{ if(e.key==="Enter"){ e.preventDefault(); const a=$("#searchRes a")||$("#searchRes button"); if(a){ if(a.tagName==="BUTTON"){ a.click(); } else { const h=a.getAttribute("href").slice(1); closeSearch(true); location.hash=h; } } } if(e.key==="ArrowDown"){ e.preventDefault(); const a=$("#searchRes a, #searchRes button"); a&&a.focus(); } });
$("#searchRes").addEventListener("keydown", e=>{ const as=$$("#searchRes a, #searchRes button"), i=as.indexOf(document.activeElement); if(e.key==="ArrowDown"&&i<as.length-1){ e.preventDefault(); as[i+1].focus(); } if(e.key==="ArrowUp"){ e.preventDefault(); (i>0?as[i-1]:$("#searchIn")).focus(); } });
$("#searchDlg").addEventListener("click", e=>{ if(e.target.id==="searchDlg") closeSearch(); });
document.addEventListener("keydown", e=>{ const typing=/INPUT|TEXTAREA|SELECT/.test((document.activeElement||{}).tagName||""); if((e.key==="/"&&!typing)||((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k")){ e.preventDefault(); if(mastSearchVisible()){ const i=$("#mSearch"); i.focus(); mastSearchOpen(); drawSearch(i.value); } else openSearch(); } if(e.key==="Escape"&&!$("#searchDlg").hidden) closeSearch(); });
window.__ROP = {sections:()=>SECTIONS.map(x=>({id:x.id,label:x.label,tabs:x.tabs.map(t=>t[0])})), runChecks, runNegatives, buildICS, D, C, CHECKS:()=>CHECKS, tools:()=>ALL_ASK_TOOLS(), search:(q,n)=>portalSearch(q,n||5).map(h=>({title:h.title,page:h.page,kind:h.kind}))};
})();


