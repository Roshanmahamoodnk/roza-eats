(function(){
'use strict';
const root=document.documentElement,lab=document.querySelector('.measure-lab'),M=window.RozaScrollLab;
if(!lab||!M)return;
const stage=lab.querySelector('.measure-stage'),chapters=[...lab.querySelectorAll('[data-measure-scene]')];
const panels=[...lab.querySelectorAll('[data-measure-panel]')],buttons=[...lab.querySelectorAll('[data-measure-jump]')];
const numbers=Object.fromEntries([...lab.querySelectorAll('[data-measure-number]')].map(el=>[el.dataset.measureNumber,el]));
const page=lab.querySelector('.measure-page'),progressBar=lab.querySelector('.measure-stage-progress');
const hero=document.querySelector('.exp-hero-visual'),labs=document.querySelector('.exp-labs figure');
const systemMotion=matchMedia('(prefers-reduced-motion: reduce)'),mobile=matchMedia('(max-width: 800px)');
let pending=false,active=-1,visible=true;
root.classList.add('measure-ready');
function reduced(){return root.classList.contains('motion-off')||systemMotion.matches;}
function num(key,value,digits=0){const text=value.toFixed(digits);if(numbers[key].textContent!==text)numbers[key].textContent=text;}
function render(i,p){
 const scene=chapters[i].dataset.measureScene,v=M.frame(scene,p);
 if(active!==i){
  active=i;
  panels.forEach((panel,j)=>panel.classList.toggle('is-active',j===i));
  chapters.forEach((chapter,j)=>chapter.classList.toggle('is-current',j===i));
  buttons.forEach((button,j)=>{if(j===i)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');});
  page.textContent=`0${i+1} / 03`;
 }
 progressBar.style.setProperty('--story-progress',`${(i+p)/3*100}%`);
 if(scene==='oil'){
  num('oil-grams',v.grams,1);num('oil-kcal',v.kcal);num('oil-delta',v.delta);
  stage.style.setProperty('--oil-fill',v.grams/10);
 }else if(scene==='rice'){
  num('rice-grams',v.grams);num('rice-kcal',v.whole.kcal);num('rice-delta',v.delta);
  stage.style.setProperty('--rice-p',p);
 }else{
  num('protein-grams',v.grams);num('protein-total',v.whole.protein,1);num('protein-kcal',v.whole.kcal);
  num('protein-delta',v.proteinDelta,1);num('protein-energy',v.kcalDelta);
  stage.style.setProperty('--protein-p',p);stage.style.setProperty('--protein-bar',`${v.whole.protein/60*100}%`);
  stage.style.setProperty('--energy-bar',`${v.whole.kcal/650*100}%`);
 }
}
// Deliberate tab selection replaces scroll-driven numbers and parallax.
function select(i){
 render(i,1);
 chapters.forEach((chapter,j)=>{chapter.hidden=j!==i;});
}
buttons.forEach((button,i)=>button.addEventListener('click',()=>select(i)));
select(0);
})();
