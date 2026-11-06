const test=require('node:test');
const assert=require('node:assert/strict');
const M=require('./scroll-lab-model.js');
const N=require('./nutrition.js');
const R=require('./routine-engine.js');
const near=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-8,`${actual} != ${expected}`);
test('oil illustration counts energy from oil alone, without inventing a whole meal',()=>{
 const a=M.frame('oil',0),b=M.frame('oil',1);
 near(a.grams,10);near(b.grams,5);near(a.kcal,89.2);near(b.kcal,44.6);near(b.delta,44.6);
 assert.equal(b.whole,undefined);
});
test('rice experiment changes only cooked brown rice, preserving other ingredient amounts',()=>{
 const a=M.frame('rice',0),b=M.frame('rice',1),s=R.selection('M2');
 near(a.kcal,246);near(b.kcal,184.5);near(b.delta,61.5);near(a.whole.kcal,565.42);near(b.whole.kcal,503.92);
 const from=N.ingredientTotals({...s,baseGrams:200}),to=N.ingredientTotals({...s,baseGrams:150});
 for(const key of Object.keys(to))if(key!=='brown')near(from[key],to[key]);
 assert.ok(b.whole.protein<a.whole.protein); // Rice also contributes protein.
 near(a.whole.oil,b.whole.oil);
});
test('extra chicken includes marinade and displays both protein and energy increases',()=>{
 const a=M.frame('protein',0),b=M.frame('protein',1);
 near(a.whole.kcal,503.92);near(b.whole.kcal,596.165);near(b.whole.protein,55.37375);
 near(b.proteinDelta,15.67315);near(b.kcalDelta,92.245);near(b.whole.oil,6);
 const mid=M.frame('protein',.5);near(mid.grams,125);near(mid.kcalDelta,b.kcalDelta/2);
});
test('examples are independent, deterministic and bounded when scrolling backwards or past the ends',()=>{
 const before=M.frame('rice',1);M.frame('oil',1);M.frame('protein',1);
 assert.deepEqual(M.frame('rice',1),before);
 for(const scene of ['oil','rice','protein']){
  assert.deepEqual(M.frame(scene,-3),M.frame(scene,0));
  assert.deepEqual(M.frame(scene,3),M.frame(scene,1));
  assert.deepEqual(M.frame(scene,NaN),M.frame(scene,0));
 }
 assert.throws(()=>M.frame('health-score',1),RangeError);
});
