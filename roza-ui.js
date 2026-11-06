(function(){
  'use strict';
  // No profile access, storage, network calls, or calculation changes.
  var root=document.documentElement;
  function enter(el){
    if(root.classList.contains('motion-off')||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    el.classList.remove('ui-enter');
    requestAnimationFrame(function(){
      el.classList.add('ui-enter');
      el.addEventListener('animationend',function(){el.classList.remove('ui-enter');},{once:true});
    });
  }
  window.RozaUI={enter:enter};
  document.addEventListener('roza:motion',function(){document.querySelectorAll('.ui-enter').forEach(function(el){el.classList.remove('ui-enter');});});
  var nav=document.querySelector('.evidence-nav');
  if(nav&&'IntersectionObserver' in window){
    var links=Array.from(nav.querySelectorAll('a[href^="#"]'));
    var observer=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){if(!entry.isIntersecting)return;
        links.forEach(function(a){if(a.hash==='#'+entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
      });
    },{rootMargin:'-15% 0px -60% 0px',threshold:0});
    document.querySelectorAll('.evidence-content section[id]').forEach(function(s){observer.observe(s);});
  }
})();
