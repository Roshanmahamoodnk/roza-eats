/* Reference model v2.1.0. Ingredient data, not validated finished-product labels. */
(function(root){
'use strict';
const version='2.1.0';
// Per 100 g: kcal, protein, fat, fibre. USDA SR Legacy unless noted.
const foods={
 rice:{en:'White rice, cooked (long-grain proxy for jeerakasala)',ml:'പാകം ചെയ്ത വെള്ള അരി (ജീരകശാലയ്ക്കുള്ള മാതൃക)',kcal:130,protein:2.69,fat:.28,fibre:.4,fdc:169757},
 brown:{en:'Brown rice, cooked',ml:'പാകം ചെയ്ത ബ്രൗൺ റൈസ്',kcal:123,protein:2.74,fat:.97,fibre:1.6,fdc:169704},
 chicken:{en:'Skinless chicken breast, cooked, grilled',ml:'പാകം ചെയ്ത തൊലിയില്ലാത്ത ചിക്കൻ ബ്രെസ്റ്റ്',kcal:151,protein:30.54,fat:3.17,fibre:0,fdc:171534},
 fish:{en:'Tilapia, cooked dry heat (fish reference)',ml:'പാകം ചെയ്ത തിലാപ്പിയ (മീനിന്റെ റഫറൻസ്)',kcal:128,protein:26.15,fat:2.65,fibre:0,fdc:175177},
 egg:{en:'Hard-boiled egg, edible weight',ml:'പുഴുങ്ങിയ മുട്ട, ഭക്ഷ്യയോഗ്യമായ ഭാരം',kcal:155,protein:12.58,fat:10.61,fibre:0,fdc:173424},
 chickpea:{en:'Chickpeas, cooked without salt',ml:'പാകം ചെയ്ത കടല',kcal:164,protein:8.86,fat:2.59,fibre:7.6,fdc:173757},
 yogurt:{en:'Plain whole-milk yogurt / curd reference',ml:'പ്ലെയിൻ തൈരിന്റെ റഫറൻസ്',kcal:61,protein:3.47,fat:3.25,fibre:0,fdc:171284},
 soy:{en:'Dry textured vegetable protein (before hydration)',ml:'ഉണങ്ങിയ സോയ TVP (വെള്ളം ചേർക്കുന്നതിന് മുമ്പ്)',kcal:366,protein:51.1,fat:3.33,fibre:17.5,fdc:2707451},
 beans:{en:'Green beans, cooked',ml:'പാകം ചെയ്ത ബീൻസ്',kcal:35,protein:1.89,fat:.28,fibre:3.2,fdc:169141},
 cabbage:{en:'Cabbage, cooked',ml:'പാകം ചെയ്ത കാബേജ്',kcal:23,protein:1.27,fat:.06,fibre:1.9,fdc:169976},
 carrot:{en:'Carrot, cooked',ml:'പാകം ചെയ്ത കാരറ്റ്',kcal:35,protein:.76,fat:.18,fibre:3,fdc:170394},
 coconut:{en:'Fresh coconut',ml:'തേങ്ങ',kcal:354,protein:3.33,fat:33.49,fibre:9,fdc:170169},
 onion:{en:'Onion (raw input weight)',ml:'സവാള (പാകം ചെയ്യുന്നതിന് മുമ്പുള്ള ഭാരം)',kcal:40,protein:1.1,fat:.1,fibre:1.7,fdc:170000},
 tomato:{en:'Tomato (raw input weight)',ml:'തക്കാളി (പാകം ചെയ്യുന്നതിന് മുമ്പുള്ള ഭാരം)',kcal:18,protein:.88,fat:.2,fibre:1.2,fdc:170457},
 cucumber:{en:'Cucumber with peel, raw',ml:'വെള്ളരിക്ക',kcal:15,protein:.65,fat:.11,fibre:.5,fdc:168409},
 oil:{en:'Added coconut oil',ml:'ചേർത്ത വെളിച്ചെണ്ണ',kcal:892,protein:0,fat:99.06,fibre:0,fdc:171412},
 spice:{en:'Dry spice blend (generic curry-powder proxy)',ml:'ഉണങ്ങിയ മസാല (പൊതു കറിപ്പൊടി റഫറൻസ്)',kcal:325,protein:14.29,fat:14.01,fibre:53.2,fdc:170924},
 ragi:{en:'Raw ragi / whole-grain flour proxy (ICAR-IIMR / IFCT 2017)',ml:'റാഗി / പൊടിക്കുള്ള ഹോൾഗ്രെയിൻ മാതൃക',kcal:1342/4.184,protein:7.16,fat:1.92,fibre:11.18},
 water:{en:'Retained water / hydration assumption',ml:'വെള്ളത്തിന്റെ അനുമാനിച്ച അളവ്',kcal:0,protein:0,fat:0,fibre:0}
};
const components={
 jeera:{name:'Jeerakasala rice',ml:'ജീരകശാല ചോറ്',short:'Aromatic biryani-style base',shortMl:'ബിരിയാണിയുടെ പരിചിത മണവുമായി',symbol:'grain-white'},
 brown:{name:'Brown rice',ml:'ബ്രൗൺ റൈസ്',short:'A simple wholegrain base',shortMl:'ഹോൾഗ്രെയിൻ ബേസ്',symbol:'grain-brown'},
 ragi:{name:'Ragi puttu',ml:'റാഗി പുട്ട്',short:'Steamed, with measured coconut',shortMl:'അളന്ന തേങ്ങയോടെ ആവിയിൽ',symbol:'grain-ragi'},
 chicken:{name:'Kerala grilled chicken',ml:'കേരള ഗ്രിൽ ചിക്കൻ',short:'100 g cooked breast + marinade',shortMl:'100 g പാകം ചെയ്ത ബ്രെസ്റ്റ് + മാരിനേഡ്',symbol:'protein-chicken'},
 fish:{name:'Fish pollichathu',ml:'മീൻ പൊള്ളിച്ചത്',short:'120 g fish + 50 g masala · tilapia model',shortMl:'120 g മീൻ + 50 g മസാല · തിലാപ്പിയ മാതൃക',symbol:'protein-fish'},
 egg:{name:'Eggs & kadala',ml:'മുട്ടയും കടലയും',short:'2 eggs + 80 g cooked kadala + masala',shortMl:'2 മുട്ട + 80 g കടല + മസാല',symbol:'protein-egg'},
 soy:{name:'Soy–kadala curry',ml:'സോയ–കടലക്കറി',short:'30 g dry soy + 80 g cooked kadala',shortMl:'30 g ഉണങ്ങിയ സോയ + 80 g കടല',symbol:'protein-soy'},
 thoran:{name:'Cabbage–beans thoran',ml:'കാബേജ്–ബീൻസ് തോരൻ',short:'Vegetables, coconut, measured oil',shortMl:'പച്ചക്കറി, തേങ്ങ, അളന്ന എണ്ണ',symbol:'vegetable-thoran'},
 curry:{name:'Kerala vegetable curry',ml:'കേരള പച്ചക്കറിക്കറി',short:'Carrot, beans & a coconut base',shortMl:'കാരറ്റ്, ബീൻസ്, തേങ്ങയുടെ കൂട്ട്',symbol:'vegetable-curry'},
 curd:{name:'Plain curd · 80 g',ml:'തൈര് · 80 g'},salad:{name:'Cucumber salad · 80 g',ml:'വെള്ളരിക്ക സലാഡ് · 80 g'},none:{name:'No extra side',ml:'അധിക സൈഡ് വേണ്ട'}
};
const recipe={
 jeera:{rice:140,oil:3,onion:6,spice:1},brown:{brown:150},ragi:{ragi:60,coconut:10,water:80},
 chicken:{chicken:100,yogurt:15,oil:2,spice:2},fish:{fish:120,onion:22,tomato:22,oil:3,spice:3},
 egg:{egg:100,chickpea:80,onion:15,tomato:15,oil:3,spice:2},
 soy:{soy:30,water:60,chickpea:80,onion:15,tomato:15,oil:3,spice:2},
 thoran:{cabbage:80,beans:25,coconut:10,oil:3,spice:2},curry:{carrot:30,beans:30,coconut:8,onion:8,tomato:20,oil:3,spice:1,water:20},
 curd:{yogurt:80},salad:{cucumber:60,onion:10,tomato:10},none:{}
};
function ingredientTotals(s){
 const amounts={};const add=(r,factor=1)=>Object.entries(r).forEach(([id,g])=>{amounts[id]=(amounts[id]||0)+g*factor;});
 add(recipe[s.base],s.baseGrams/150);
 const main={...recipe[s.protein]};
 // Extra means more cooked meat, one more egg, or 15 g extra dry soy with water.
 if(s.proteinLevel===1.5){if(s.protein==='chicken'){for(const k in main)main[k]*=1.5;}else if(s.protein==='fish'){main.fish=180;}else if(s.protein==='egg'){main.egg=150;}else if(s.protein==='soy'){main.soy=45;main.water=90;}}
 add(main);add(recipe[s.veg],s.vegGrams/120);add(recipe[s.side]);return amounts;
}
function calculate(s){const totals={kcal:0,protein:0,fat:0,fibre:0,oil:0};const amounts=ingredientTotals(s);for(const [id,g] of Object.entries(amounts)){for(const n of ['kcal','protein','fat','fibre'])totals[n]+=foods[id][n]*g/100;}totals.oil=amounts.oil||0;return totals;}
function recipeRows(s){return Object.entries(ingredientTotals(s)).map(([key,grams])=>({...foods[key],key,grams}));}
function portions(s){const isExtra=s.proteinLevel===1.5;const main=s.protein==='chicken'?`${isExtra?150:100} g + ${isExtra?28.5:19} g` : s.protein==='fish'?`${isExtra?180:120} g + 50 g`:s.protein==='egg'?`${isExtra?3:2} ${typeof document!=='undefined'&&document.documentElement.lang==='ml'?'മുട്ട':'eggs'} + 80 g`:`${isExtra?45:30} g ${typeof document!=='undefined'&&document.documentElement.lang==='ml'?'ഉണങ്ങിയത്':'dry'} + 80 g`;
 return [{en:components[s.base].name+' · cooked',ml:components[s.base].ml+' · പാകം ചെയ്തത്',amount:s.baseGrams+' g'},{en:s.protein==='chicken'?'Chicken + marinade':s.protein==='fish'?'Fish + masala':s.protein==='egg'?'Eggs + cooked kadala':'Soy + cooked kadala',ml:s.protein==='chicken'?'ചിക്കൻ + മാരിനേഡ്':s.protein==='fish'?'മീൻ + മസാല':s.protein==='egg'?'മുട്ട + കടല':'സോയ + കടല',amount:main},{en:components[s.veg].name,ml:components[s.veg].ml,amount:s.vegGrams+' g'},...(s.side==='none'?[]:[{en:s.side==='curd'?'Plain curd':'Cucumber salad',ml:s.side==='curd'?'തൈര്':'വെള്ളരിക്ക സലാഡ്',amount:'80 g'}])];}
function allergens(s){const result=[];if(s.protein==='chicken'||s.side==='curd')result.push({en:'milk',ml:'പാൽ'});if(s.protein==='fish')result.push({en:'fish',ml:'മീൻ'});if(s.protein==='egg')result.push({en:'egg',ml:'മുട്ട'});if(s.protein==='soy')result.push({en:'soy',ml:'സോയ'});if(s.base==='ragi'||['thoran','curry'].includes(s.veg))result.push({en:'coconut',ml:'തേങ്ങ'});return result;}
function signature(s){return ['base','protein','veg','side','baseGrams','proteinLevel','vegGrams','spice'].map(k=>s[k]).join('|');}
function validItem(s){return !!s&&['jeera','brown','ragi'].includes(s.base)&&['chicken','fish','egg','soy'].includes(s.protein)&&['thoran','curry'].includes(s.veg)&&['curd','salad','none'].includes(s.side)&&[100,150,200].includes(s.baseGrams)&&[1,1.5].includes(s.proteinLevel)&&[120,180].includes(s.vegGrams)&&['mild','medium','hot'].includes(s.spice)&&['all','egg','veg'].includes(s.diet)&&['smaller','everyday','extra','custom'].includes(s.level)&&Number.isInteger(s.quantity)&&s.quantity>=1&&s.quantity<=10&&typeof s.id==='string'&&/^[a-zA-Z0-9_-]{1,50}$/.test(s.id)&&!(s.diet==='veg'&&s.protein!=='soy')&&!(s.diet==='egg'&&!['egg','soy'].includes(s.protein));}
const DAY=86400000;
function validDate(date){if(!/^\d{4}-\d{2}-\d{2}$/.test(date))return false;const d=new Date(date+'T00:00:00Z');return Number.isFinite(d.getTime())&&d.toISOString().slice(0,10)===date;}
function slotInstant(date,minutes){return validDate(date)&&[720,750].includes(minutes)?Date.parse(`${date}T${minutes===720?'12:00':'12:30'}:00+05:30`):NaN;}
function serviceDay(date){return validDate(date)&&new Date(date+'T12:00:00Z').getUTCDay()!==0;}
function slotEligible(date,minutes,now=Date.now()){return serviceDay(date)&&slotInstant(date,minutes)-now>=DAY;}
function addDay(date){return new Date(Date.parse(date+'T00:00:00Z')+DAY).toISOString().slice(0,10);}
function nextDate(now=Date.now()){let date=new Date(now+330*60000).toISOString().slice(0,10);for(let i=0;i<8;i++){if(slotEligible(date,750,now))return date;date=addDay(date);}return date;}
function serviceDates(date,count){if(!validDate(date)||![1,3,5,20].includes(count))return [];const days=[];while(days.length<count){if(serviceDay(date))days.push(date);date=addDay(date);}return days;}
function formatDate(ms,withTime=false){return new Intl.DateTimeFormat(typeof document!=='undefined'&&document.documentElement.lang==='ml'?'ml-IN':'en-IN',{timeZone:'Asia/Kolkata',day:'numeric',month:'short',year:'numeric',...(withTime?{hour:'numeric',minute:'2-digit',hour12:true}:{weekday:'short'})}).format(new Date(ms));}
const sources=[{title:'USDA FoodData Central · ingredient dataset & food record IDs',url:'https://fdc.nal.usda.gov/download-datasets/'},{title:'ICAR-IIMR · Nutritional and Health Benefits of Millets, Table 1 (IFCT 2017)',url:'https://millets.res.in/m_recipes/Nutritional_health_benefits_millets.pdf'},{title:'ICMR–NIN · Dietary Guidelines for Indians 2024',url:'https://nin.res.in/dietaryguidelines/pdfjs/locale/DGI_2024.pdf'},{title:'Download the reference data and model assumptions',url:'nutrition-reference.json'}];
const api={version,foods,components,recipe,ingredientTotals,calculate,recipeRows,portions,allergens,signature,validItem,validDate,slotInstant,serviceDay,slotEligible,nextDate,serviceDates,formatDate,sources};
if(typeof module==='object'&&module.exports)module.exports=api;else root.RozaNutrition=api;
})(typeof window!=='undefined'?window:globalThis);
