const test=require('node:test');
const assert=require('node:assert/strict');
const W=require('./week-model.js');
test('seven calendar days include Sunday, leap day and year rollover',()=>{
  assert.deepEqual(W.dates('2024-02-27').slice(0,3),['2024-02-27','2024-02-28','2024-02-29']);
  assert.equal(W.dates('2026-12-29')[6],'2027-01-04');
  assert.equal(W.dates('2026-11-06')[2],'2026-11-08');
  for(const d of ['2026-02-29','2026-13-01','<script>','2026-01-32'])assert.deepEqual(W.dates(d),[]);
});
test('India day changes at 18:30 UTC, regardless of browser zone',()=>{
  assert.equal(W.today(new Date('2026-11-06T18:29:59Z')),'2026-11-06');
  assert.equal(W.today(new Date('2026-11-06T18:30:00Z')),'2026-11-07');
});
test('saved state is allowlisted and rejects malformed values',()=>{
  const good=W.fresh('2026-11-06');
  const safe=W.validate({...good,weight:75,health:'private',profile:{name:'private'}});
  assert.deepEqual(safe,good);
  for(const bad of [{version:2},{days:['tried']},{days:Array(7).fill('fake')},{time:'24:00'},{habit:'__proto__'},{meal:'unknown'},{start:'2026-02-31'}])assert.equal(W.validate({...good,...bad}),null);
  const copy=W.validate(good);copy.days[0]='tried';assert.equal(good.days[0],'pending');
});
test('handoff carries only valid habit and meal, never body or health answers',()=>{
  assert.deepEqual(W.handoff({habit:'timing',meal:'dinner',weight:75,review:'clear',age:35}),{habit:'timing',meal:'dinner'});
  assert.deepEqual(W.handoff({habit:'constructor',meal:'bad'}),{habit:'decisions',meal:'lunch'});
  assert.equal(W.fresh('2026-11-06',{habit:'snacks',meal:'lunch'}).meal,'snack');
});
test('future check-ins and invalid indexes are rejected without changing state',()=>{
  const p=W.fresh('2026-11-06');
  assert.equal(W.checkIn(p,1,'tried','2026-11-06'),null);
  assert.equal(W.checkIn(p,7,'tried','2026-12-01'),null);
  assert.equal(W.checkIn(p,0,'fake','2026-11-06'),null);
  const next=W.checkIn(p,0,'adjust','2026-11-06');assert.equal(next.days[0],'adjust');assert.equal(p.days[0],'pending');
  assert.deepEqual(W.summary(next),{recorded:1,tried:0,adjust:1});
});
test('export follows selected language and does not include unknown private fields',()=>{
  const p={...W.fresh('2026-11-06'),weight:75,health:'SECRET'};
  assert.match(W.exportText(p,'en'),/not a health score/);
  assert.match(W.exportText(p,'ml'),/എന്റെ ഏഴ് ദിവസങ്ങൾ/);
  assert.ok(!W.exportText(p,'en').includes('SECRET'));
});
