/* Independent teaching examples, derived from the reference ingredient model. */
(function(root){
'use strict';
const N=typeof module==='object'&&module.exports?require('./nutrition.js'):root.RozaNutrition;
const R=typeof module==='object'&&module.exports?require('./routine-engine.js'):root.RozaRoutine;
const clamp=value=>Number.isFinite(value)?Math.max(0,Math.min(1,value)):0;
const mix=(a,b,p)=>a+(b-a)*clamp(p);
function frame(scene,progress){
 const p=clamp(progress),base=R.selection('M2');
 if(scene==='oil'){
  const grams=mix(10,5,p),kcal=grams*N.foods.oil.kcal/100;
  return {progress:p,grams,kcal,delta:10*N.foods.oil.kcal/100-kcal,fat:grams*N.foods.oil.fat/100};
 }
 if(scene==='rice'){
  const grams=mix(200,150,p),whole=N.calculate({...base,baseGrams:grams});
  return {progress:p,grams,kcal:grams*N.foods.brown.kcal/100,whole,delta:(200-grams)*N.foods.brown.kcal/100};
 }
 if(scene==='protein'){
  // Interpolate the complete chicken component, including its marinade.
  const start=N.calculate(base),end=N.calculate({...base,proteinLevel:1.5});
  const whole=Object.fromEntries(Object.keys(start).map(key=>[key,mix(start[key],end[key],p)]));
  return {progress:p,grams:mix(100,150,p),whole,proteinDelta:whole.protein-start.protein,kcalDelta:whole.kcal-start.kcal};
 }
 throw new RangeError('Unknown measurement scene');
}
const api={clamp,frame};
if(typeof module==='object'&&module.exports)module.exports=api;else root.RozaScrollLab=api;
})(typeof window!=='undefined'?window:globalThis);
