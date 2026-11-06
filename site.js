(function(){
  'use strict';
  var root=document.documentElement, originals=new WeakMap();
  function read(k){try{return localStorage.getItem(k);}catch(e){return null;}}
  function write(k,v){try{localStorage.setItem(k,v);}catch(e){}}
  var lang=read('roza-language')==='ml'?'ml':'en';
  var reduced=read('roza-motion')==='off'||window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var R=window.RozaRoutine,N=window.RozaNutrition,portion=150;
  function L(en,ml){return lang==='ml'?ml:en;}
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function translate(){
    root.lang=lang;
    document.querySelectorAll('[data-ml]').forEach(function(el){if(!originals.has(el))originals.set(el,el.innerHTML);el.innerHTML=lang==='ml'?el.getAttribute('data-ml'):originals.get(el);});
    document.querySelectorAll('[data-language]').forEach(function(b){b.textContent=lang==='ml'?'English':'മലയാളം';b.setAttribute('aria-label',lang==='ml'?'Switch to English':'മലയാളത്തിലേക്ക് മാറ്റുക');});
    renderHomeMeals();renderPortion();renderMotionLabel();
    document.dispatchEvent(new CustomEvent('roza:language'));
  }
  function foodCard(id){
    if(!R||!N)return '';
    var i=R.meals.findIndex(function(x){return x.id===id;}),m=R.meals[i],v=N.calculate(R.selection(id));
    return '<article class="food-card"><a href="menu.html?meal='+m.id+'#build" aria-label="'+esc(L('Customise ','മാറ്റി തിരഞ്ഞെടുക്കാം: ')+L(m.name,m.ml))+'"><div class="food-photo-new photo-'+i+'" role="img" aria-label="'+esc(L(m.name,m.ml))+' · AI concept"><span class="food-badge">'+L(m.category==='veg'?'VEGETARIAN':m.category==='egg'?'EGG & KADALA':m.category==='fish'?'FISH':'CHICKEN',m.category==='veg'?'വെജിറ്റേറിയൻ':m.category==='egg'?'മുട്ട & കടല':m.category==='fish'?'മീൻ':'ചിക്കൻ')+'</span></div></a><div class="food-body"><small>'+L(m.tag,m.tagMl)+'</small><h3>'+L(m.name,m.ml)+'</h3><p>'+L(m.desc,m.descMl)+'</p><div class="food-macros"><b>~'+Math.round(v.kcal/10)*10+' <span>kcal</span></b><b>~'+Math.round(v.protein)+' g <span>'+L('protein','പ്രോട്ടീൻ')+'</span></b></div><small class="macro-estimate">'+L('REFERENCE RECIPE ESTIMATE','റെസിപ്പി മാതൃകയുടെ കണക്ക്')+'</small><a class="quiet-link" href="menu.html?meal='+m.id+'#build">'+L('Make it my meal','എന്റെ മീൽ ആക്കാം')+' <span aria-hidden="true">↗</span></a></div></article>';
  }
  function renderHomeMeals(){var box=document.getElementById('home-meals');if(box)box.innerHTML=['M1','M3','M4'].map(foodCard).join('');}
  function renderPortion(){
    var box=document.getElementById('portion-numbers');if(!box||!R||!N)return;
    var s=R.selection('M1');s.baseGrams=portion;var v=N.calculate(s);
    box.innerHTML='<div><b>~'+Math.round(v.kcal/10)*10+'</b><span>'+L('kcal / whole meal','kcal / മുഴുവൻ മീൽ')+'</span></div><div><b>~'+Math.round(v.protein)+' g</b><span>'+L('protein','പ്രോട്ടീൻ')+'</span></div><div><b>~'+Math.round(v.fat)+' g</b><span>'+L('total fat','മൊത്തം കൊഴുപ്പ്')+'</span></div>';
  }
  function renderMotionLabel(){document.querySelectorAll('[data-motion]').forEach(function(b){b.textContent=reduced?L('Enable motion','ചലനം തുടങ്ങാം'):L('Pause motion','ചലനം നിർത്താം');b.setAttribute('aria-pressed',String(reduced));});root.classList.toggle('motion-off',reduced);}
  function walk(){var min=document.getElementById('walk-minutes'),pace=document.getElementById('walk-pace');if(!min||!pace)return;document.getElementById('walk-min-label').textContent=min.value+' min';document.getElementById('walk-distance').textContent=R.walking(min.value,pace.value).toFixed(1);}
  var nav=document.getElementById('main-nav'),navButton=document.querySelector('.mobile-nav');
  document.addEventListener('click',function(e){
    if(e.target.closest('[data-language]')){lang=lang==='en'?'ml':'en';write('roza-language',lang);translate();}
    if(e.target.closest('[data-motion]')){reduced=!reduced;write('roza-motion',reduced?'off':'on');renderMotionLabel();document.dispatchEvent(new CustomEvent('roza:motion'));}
    var p=e.target.closest('[data-home-portion]');if(p){portion=Number(p.dataset.homePortion);document.querySelectorAll('[data-home-portion]').forEach(function(b){b.classList.toggle('selected',b===p);b.setAttribute('aria-pressed',String(b===p));});renderPortion();}
    if(e.target.closest('.mobile-nav')){var open=!nav.classList.contains('open');nav.classList.toggle('open',open);navButton.setAttribute('aria-expanded',String(open));navButton.textContent=open?'×':'☰';}
    if(e.target.closest('#main-nav a')&&navButton){nav.classList.remove('open');navButton.setAttribute('aria-expanded','false');navButton.textContent='☰';}
  });
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&nav?.classList.contains('open')){nav.classList.remove('open');navButton.setAttribute('aria-expanded','false');navButton.textContent='☰';navButton.focus();}});
  document.getElementById('walk-minutes')?.addEventListener('input',walk);
  document.getElementById('walk-pace')?.addEventListener('change',walk);
  var progress=document.querySelector('.scroll-progress'),scheduled=false;
  function scroll(){if(scheduled)return;scheduled=true;requestAnimationFrame(function(){var d=document.documentElement.scrollHeight-window.innerHeight;if(progress)progress.style.width=(d>0?window.scrollY/d*100:0)+'%';scheduled=false;});}
  window.addEventListener('scroll',scroll,{passive:true});
  if('IntersectionObserver' in window){root.classList.add('motion-ready');var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}});},{threshold:.08});document.querySelectorAll('.reveal').forEach(function(el){observer.observe(el);});}
  window.RozaSite={L:L,escape:esc,foodCard:foodCard,translate:translate};
  translate();walk();scroll();
})();
