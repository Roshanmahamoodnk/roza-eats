(function(){
'use strict';
const story=document.querySelector('.plate-story');
if(!story)return;
const root=document.documentElement,buttons=[...story.querySelectorAll('[data-plate-choice]')],chapters=[...story.querySelectorAll('[data-plate-chapter]')],frames=[...story.querySelectorAll('[data-plate-image]')];
const narrow=matchMedia('(max-width: 800px)'),motion=matchMedia('(prefers-reduced-motion: reduce)');
const index=story.querySelector('[data-plate-index]');
let selected=0,visible=false,pending=false;
function reduced(){return root.classList.contains('motion-off')||motion.matches;}
function choose(next){
 selected=next;
 buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===next)));
 chapters.forEach((c,i)=>c.classList.toggle('is-active',i===next));
 frames.forEach((f,i)=>{f.classList.toggle('is-active',i===next);f.setAttribute('aria-hidden',String(i!==next));});
 index.textContent='0'+(next+1);
}
function update(){
 pending=false;
 if(!visible||narrow.matches||reduced())return;
 const y=Math.min(innerHeight*.48,400);
 let next=0;chapters.forEach((c,i)=>{if(c.getBoundingClientRect().top<=y)next=i;});
 if(next!==selected)choose(next);
}
function schedule(){if(!pending){pending=true;requestAnimationFrame(update);}}
buttons.forEach((b,i)=>b.addEventListener('click',()=>{
 choose(i);
 if(!narrow.matches&&!reduced())window.scrollTo({top:scrollY+chapters[i].getBoundingClientRect().top-parseFloat(getComputedStyle(story.querySelector('.plate-stage')).top)+2,behavior:'instant'});
}));
if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)schedule();},{rootMargin:'100px'}).observe(story);
else visible=true;
root.classList.add('plate-ready');choose(0);
window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});
document.addEventListener('roza:motion',schedule);document.addEventListener('roza:language',schedule);
narrow.addEventListener('change',schedule);motion.addEventListener('change',schedule);
schedule();
})();
