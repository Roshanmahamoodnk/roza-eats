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
// Images change only when a visitor selects a chapter; never move the viewport.
buttons.forEach((button,i)=>button.addEventListener('click',()=>choose(i)));
root.classList.add('plate-ready');choose(0);
})();
