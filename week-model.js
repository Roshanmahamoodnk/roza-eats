/* A personal planning aid. No nutrition targets or delivery bookings. */
(function(root){
  'use strict';
  var DAY=86400000;
  var habits={
    timing:{en:'Give a meal a time.',ml:'ഭക്ഷണത്തിന് സമയം നിശ്ചയിക്കാം.',action:'Choose a realistic meal break and a backup if your day runs late.',actionMl:'ഭക്ഷണത്തിന് അനുയോജ്യമായ ഇടവേളയും ദിവസം വൈകിയാൽ ഒരു പകരം പ്ലാനും തീരുമാനിക്കൂ.'},
    portions:{en:'Notice the portion.',ml:'അളവ് ശ്രദ്ധിക്കാം.',action:'Use a familiar bowl or serving spoon. Notice the grain, protein component and vegetables without automatically making the meal smaller.',actionMl:'പരിചിത പാത്രമോ വിളമ്പുന്ന സ്പൂണോ ഉപയോഗിക്കൂ. അളവ് കുറയ്ക്കണമെന്ന് തീരുമാനിക്കുന്നതിന് മുമ്പ് ധാന്യം, പ്രോട്ടീൻ ഘടകം, പച്ചക്കറി എന്നിവ ശ്രദ്ധിക്കൂ.'},
    snacks:{en:'Plan the tea-time pause.',ml:'ചായസമയവും പ്ലാൻ ചെയ്യാം.',action:'Decide what you would enjoy at your tea break before the afternoon gets busy.',actionMl:'തിരക്ക് തുടങ്ങുന്നതിന് മുമ്പ് ചായസമയത്ത് എന്ത് കഴിക്കണമെന്ന് തീരുമാനിക്കൂ.'},
    decisions:{en:'Decide one day ahead.',ml:'ഒരു ദിവസം മുമ്പ് തീരുമാനിക്കാം.',action:'Choose tomorrow’s meal today. A home-cooked meal belongs in the plan too.',actionMl:'നാളത്തെ ഭക്ഷണം ഇന്നേ തീരുമാനിക്കൂ. വീട്ടിലെ ഭക്ഷണവും പ്ലാനിൽ ഉൾപ്പെടാം.'},
    strict:{en:'Keep a favourite in the plan.',ml:'ഇഷ്ടഭക്ഷണത്തിന് ഇടം നൽകാം.',action:'Keep one familiar food you enjoy. Explore its portion and partners instead of starting another strict ban.',actionMl:'ഇഷ്ടമുള്ള ഒരു പരിചിത ഭക്ഷണം നിലനിർത്തൂ. കർശന വിലക്കുകൾക്ക് പകരം അളവും കൂട്ടുകളും ശ്രദ്ധിക്കൂ.'},
    variety:{en:'Make a simple rotation.',ml:'മാറിമാറി കഴിക്കാൻ ഒരു പ്ലാൻ.',action:'Choose two or three familiar combinations you can repeat. Keep preparation practical.',actionMl:'ആവർത്തിക്കാൻ കഴിയുന്ന രണ്ടോ മൂന്നോ പരിചിത കൂട്ടുകൾ തിരഞ്ഞെടുക്കൂ. തയ്യാറാക്കൽ എളുപ്പമാകട്ടെ.'}
  };
  var meals={breakfast:['Breakfast','പ്രഭാതഭക്ഷണം'],lunch:['Lunch','ഉച്ചഭക്ഷണം'],dinner:['Dinner','അത്താഴം'],snack:['Tea-time snack','ചായസമയത്തെ ഭക്ഷണം']};
  var states={pending:['Not checked in','ഇനിയും രേഖപ്പെടുത്തിയിട്ടില്ല'],tried:['I tried it','ശ്രമിച്ചു'],adjust:['Needs adjusting','മാറ്റം വേണം'],missed:['Not today','ഇന്ന് കഴിഞ്ഞില്ല']};
  function validDate(s){if(typeof s!=='string'||!/^20\d{2}-\d{2}-\d{2}$/.test(s))return false;var d=new Date(s+'T00:00:00Z');return Number.isFinite(+d)&&d.toISOString().slice(0,10)===s;}
  function today(now){return new Date(+(now||new Date())+330*60000).toISOString().slice(0,10);}
  function dates(start){if(!validDate(start))return [];return Array.from({length:7},function(_,i){return new Date(+new Date(start+'T00:00:00Z')+i*DAY).toISOString().slice(0,10);});}
  function handoff(a){return {habit:a&&Object.hasOwn(habits,a.habit)?a.habit:'decisions',meal:a&&Object.hasOwn(meals,a.meal)?a.meal:'lunch'};}
  function fresh(start,seed){var h=handoff(seed);return {version:1,habit:h.habit,meal:h.habit==='snacks'?'snack':h.meal,start:validDate(start)?start:today(),time:h.habit==='snacks'?'16:30':h.meal==='breakfast'?'08:30':h.meal==='dinner'?'19:30':'13:00',days:Array(7).fill('pending')};}
  function validate(a){
    if(!a||a.version!==1||!Object.hasOwn(habits,a.habit)||!Object.hasOwn(meals,a.meal)||!validDate(a.start)||typeof a.time!=='string'||!/^([01]\d|2[0-3]):[0-5]\d$/.test(a.time)||!Array.isArray(a.days)||a.days.length!==7||!a.days.every(function(s){return Object.hasOwn(states,s);}))return null;
    // Return an allowlist. Never persist extra assessment or health fields.
    return {version:1,habit:a.habit,meal:a.meal,start:a.start,time:a.time,days:a.days.slice()};
  }
  function checkIn(plan,index,status,current){var p=validate(plan);if(!p||!Number.isInteger(index)||index<0||index>6||!Object.hasOwn(states,status)||!validDate(current)||dates(p.start)[index]>current)return null;p.days[index]=status;return p;}
  function summary(plan){return {recorded:plan.days.filter(function(s){return s!=='pending';}).length,tried:plan.days.filter(function(s){return s==='tried';}).length,adjust:plan.days.filter(function(s){return s==='adjust';}).length};}
  function exportText(plan,lang){var p=validate(plan);if(!p)return '';var ml=lang==='ml',h=habits[p.habit],rows=dates(p.start);return [ml?'ROZA EATS — എന്റെ ഏഴ് ദിവസങ്ങൾ':'ROZA EATS — MY SEVEN DAYS',ml?h.ml:h.en,ml?h.actionMl:h.action,meals[p.meal][ml?1:0]+' · '+p.time+' IST','',...rows.map(function(d,i){return d+' — '+states[p.days[i]][ml?1:0];}),'',ml?'ഇത് സ്വന്തം ശീലം പ്ലാൻ ചെയ്യാനുള്ളതാണ്. ആരോഗ്യ സ്കോറോ ചികിത്സാ പ്ലാനോ ഡെലിവറി ബുക്കിങ്ങോ അല്ല.':'A personal routine planner, not a health score, prescribed diet or delivery booking.'].join('\n');}
  var api={habits:habits,meals:meals,states:states,today:today,dates:dates,fresh:fresh,validate:validate,handoff:handoff,checkIn:checkIn,summary:summary,exportText:exportText};
  if(typeof module==='object'&&module.exports)module.exports=api;else root.RozaWeek=api;
})(typeof window!=='undefined'?window:globalThis);
