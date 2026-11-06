const test=require('node:test');
const assert=require('node:assert/strict');
const R=require('./routine-engine.js');
const N=require('./nutrition.js');
const adult={adult:true,review:'clear',goal:'routine',age:35,height:170,weight:75,equation:'male',activity:'desk',target:''};
test('maintenance model shows broad transparent range, not weight-loss target',()=>{
 const e=R.energy(adult);
 assert.equal(e.resting,1643);assert.equal(e.low,2300);assert.equal(e.high,2800);
 assert.deepEqual(e.multipliers,[1.4,1.69]);assert.equal(R.energy({...adult,target:70}).low,e.low);
});
test('every clinical-review route and missing consent withholds estimates',()=>{
 for(const a of [{review:'review'},{review:'skip'},{adult:false},{goal:'health'},{equation:'skip'},{equation:''}])assert.equal(R.energy({...adult,...a}).available,false);
});
test('age, body-size and unsuitable-target bounds withhold estimates',()=>{
 for(const a of [{age:18},{age:79},{height:0},{weight:0},{weight:NaN},{height:170,weight:45},{height:150,weight:110},{target:40},{activity:'unknown'}])assert.equal(R.energy({...adult,...a}).available,false);
 assert.equal(R.energy({...adult,equation:'female'}).resting,1477);
});
test('vegetarian and egg preferences never recommend meat or fish',()=>{
 for(const favourites of [[],['fish'],['biryani'],['puttu']]){
  for(const diet of ['veg','egg']){
   for(const id of R.recommend({diet,favourites})){
    const p=R.presets[id].protein;
    assert.ok(diet==='veg'?p==='soy':['egg','soy'].includes(p));
   }
  }
 }
});
test('six meal cards use the same nutrition model as the builder',()=>{
 for(const m of R.meals){const n=N.calculate(R.selection(m.id));assert.ok(Number.isFinite(n.kcal)&&n.kcal>250);assert.ok(n.protein>15);}
});
test('distance is time times pace; malformed values do not yield results',()=>{
 assert.equal(R.walking(30,4),2);assert.equal(R.walking(20,4),1.3);assert.equal(R.walking(-1,4),null);assert.equal(R.walking('abc',4),null);assert.equal(R.walking(20,99),null);
});
test('callback cannot open without a valid configured business destination',()=>{
 assert.equal(R.contactUrl({},'hello'),null);
 assert.equal(R.contactUrl({whatsapp:'not-configured'},'hello'),null);
 assert.equal(R.contactUrl({whatsapp:'919876543210'},'hello & world'),'https://wa.me/919876543210?text=hello%20%26%20world');
 assert.ok(R.contactUrl({email:'test@example.com'},'hello').startsWith('mailto:test@example.com?subject='));
});
