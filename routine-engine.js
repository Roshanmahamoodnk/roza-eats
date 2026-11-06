/* Educational routine planner v1.0. Not a clinical decision tool. */
(function(root){
  'use strict';
  var presets={
    M1:{base:'jeera',protein:'chicken',veg:'thoran',side:'curd'},
    M2:{base:'brown',protein:'chicken',veg:'curry',side:'curd'},
    M3:{base:'brown',protein:'fish',veg:'thoran',side:'salad'},
    M4:{base:'ragi',protein:'egg',veg:'thoran',side:'none'},
    M5:{base:'brown',protein:'soy',veg:'thoran',side:'curd'},
    M6:{base:'ragi',protein:'chicken',veg:'curry',side:'none'}
  };
  var meals=[
    {id:'M1',name:'Malabar Grill Biryani',ml:'മലബാർ ഗ്രിൽ ബിരിയാണി',category:'chicken',tag:'Your biryani-day ritual',tagMl:'ബിരിയാണി ഇഷ്ടമുള്ള ദിവസത്തിന്',desc:'Jeerakasala rice, grilled chicken, thoran & curd.',descMl:'ജീരകശാല ചോറ്, ഗ്രിൽ ചിക്കൻ, തോരൻ, തൈര്.',pair:'A familiar rice base, a defined chicken serving and room for vegetables.',pairMl:'പരിചിത ചോറിനൊപ്പം ചിക്കനും പച്ചക്കറികൾക്കും ഇടം.'},
    {id:'M2',name:'Brown Rice & Kerala Grill',ml:'ബ്രൗൺ റൈസും കേരള ഗ്രില്ലും',category:'chicken',tag:'The everyday lunch',tagMl:'ദിവസേനയ്ക്കൊരു ഉച്ചഭക്ഷണം',desc:'Brown rice, grilled chicken, vegetable curry & curd.',descMl:'ബ്രൗൺ റൈസ്, ഗ്രിൽ ചിക്കൻ, പച്ചക്കറിക്കറി, തൈര്.',pair:'Wholegrain rice with chicken and a vegetable side. Brown rice still has calories.',pairMl:'ഹോൾഗ്രെയിൻ ചോറിനൊപ്പം ചിക്കനും പച്ചക്കറിയും. ബ്രൗൺ റൈസിനും കലോറി ഉണ്ട്.'},
    {id:'M3',name:'Fish Pollichathu Plate',ml:'മീൻ പൊള്ളിച്ച മീൽ',category:'fish',tag:'A little coastal comfort',tagMl:'നാടൻ മീനിന്റെ ഇഷ്ടരുചി',desc:'Fish pollichathu, brown rice, thoran & cucumber.',descMl:'മീൻ പൊള്ളിച്ചത്, ബ്രൗൺ റൈസ്, തോരൻ, വെള്ളരിക്ക.',pair:'Banana-leaf flavour with measured masala and a considered rice portion.',pairMl:'വാഴയിലയുടെ മണവും അളന്ന മസാലയും അനുയോജ്യമായ ചോറും.'},
    {id:'M4',name:'Ragi Puttu, Kadala & Eggs',ml:'റാഗി പുട്ട്, കടല, മുട്ട',category:'egg',tag:'Puttu, with a protein partner',tagMl:'പുട്ടിന് പ്രോട്ടീൻ കൂട്ട്',desc:'Steamed ragi puttu, eggs, kadala & thoran.',descMl:'റാഗി പുട്ട്, മുട്ട, കടല, തോരൻ.',pair:'Eggs and kadala complement the puttu. Ragi is a grain, not a free-calorie food.',pairMl:'പുട്ടിന് മുട്ടയും കടലയും നല്ല കൂട്ട്. റാഗിയും കലോറി നൽകുന്ന ധാന്യമാണ്.'},
    {id:'M5',name:'Brown Rice & Soy–Kadala',ml:'ബ്രൗൺ റൈസും സോയ–കടലയും',category:'veg',tag:'A proper vegetarian plate',tagMl:'നല്ലൊരു വെജിറ്റേറിയൻ മീൽ',desc:'Brown rice, soy–kadala curry, thoran & curd.',descMl:'ബ്രൗൺ റൈസ്, സോയ–കടലക്കറി, തോരൻ, തൈര്.',pair:'Soy and pulses supply protein. Vegetables are a partner, not the only protein source.',pairMl:'സോയയും കടലയും പ്രോട്ടീൻ നൽകുന്നു. കൂടെ പച്ചക്കറിയും.'},
    {id:'M6',name:'Ragi Puttu & Kerala Grill',ml:'റാഗി പുട്ടും കേരള ഗ്രില്ലും',category:'chicken',tag:'A familiar flavour, remixed',tagMl:'പരിചിത രുചിക്ക് പുതിയ കൂട്ട്',desc:'Ragi puttu, grilled chicken & vegetable curry.',descMl:'റാഗി പുട്ട്, ഗ്രിൽ ചിക്കൻ, പച്ചക്കറിക്കറി.',pair:'A steamed base with chicken and a vegetable curry. Adjust the serving to the day.',pairMl:'ആവിയിൽ പാകം ചെയ്ത പുട്ടിനൊപ്പം ചിക്കനും പച്ചക്കറിക്കറിയും.'}
  ];
  function selection(id){return Object.assign({baseGrams:150,proteinLevel:1,vegGrams:120,spice:'medium',diet:'all',level:'everyday',quantity:1,id:'preview'},presets[id]||presets.M1);}
  function recommend(a){
    var ids=a.diet==='veg'?['M5']:a.diet==='egg'?['M4','M5']:['M1','M2','M3','M4','M5','M6'];
    var fav=Array.isArray(a.favourites)?a.favourites:[];
    var first=fav.includes('puttu')?(a.diet==='veg'?'M5':a.diet==='egg'?'M4':'M6'):fav.includes('fish')&&a.diet==='all'?'M3':fav.includes('biryani')&&a.diet==='all'?'M1':a.diet==='veg'?'M5':a.diet==='egg'?'M4':'M2';
    return [first].concat(ids.filter(function(id){return id!==first;})).slice(0,3);
  }
  function energy(a){
    var age=Number(a.age),height=Number(a.height),weight=Number(a.weight),target=Number(a.target);
    if(a.goal==='health'||a.review!=='clear'||a.adult!==true||a.equation==='skip'||!['male','female'].includes(a.equation))return {available:false,reason:'review'};
    if(!Number.isFinite(age)||!Number.isFinite(height)||!Number.isFinite(weight)||age<19||age>78||height<130||height>220||weight<35||weight>220)return {available:false,reason:'measurements'};
    var bmi=weight/Math.pow(height/100,2);
    if(bmi<18.5||bmi>=40||(target>0&&(target<35||target>220||target/Math.pow(height/100,2)<18.5)))return {available:false,reason:'review'};
    // REE: Mifflin–St Jeor (1990); broad population activity bands: FAO/WHO/UNU (2004).
    // Applying PAL bands to predicted REE is an approximate planning model, not a measured personal requirement.
    var ree=10*weight+6.25*height-5*age+(a.equation==='male'?5:-161);
    var band={desk:[1.4,1.69],mixed:[1.7,1.99],active:[2,2.4]}[a.activity];
    if(!band)return {available:false,reason:'activity'};
    return {available:true,resting:Math.round(ree),low:Math.round(ree*band[0]/50)*50,high:Math.round(ree*band[1]/50)*50,multipliers:band};
  }
  function walking(minutes,pace){minutes=Number(minutes);pace=Number(pace);if(!Number.isFinite(minutes)||!Number.isFinite(pace)||minutes<0||minutes>60||pace<2||pace>6)return null;return Math.round(minutes/60*pace*10)/10;}
  function contactUrl(config,message){
    if(config&&/^[1-9][0-9]{7,14}$/.test(config.whatsapp||''))return 'https://wa.me/'+config.whatsapp+'?text='+encodeURIComponent(message);
    if(config&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email||''))return 'mailto:'+config.email+'?subject='+encodeURIComponent('Roza Eats routine review')+'&body='+encodeURIComponent(message);
    return null;
  }
  var api={meals:meals,presets:presets,selection:selection,recommend:recommend,energy:energy,walking:walking,contactUrl:contactUrl};
  if(typeof module==='object'&&module.exports)module.exports=api;else root.RozaRoutine=api;
})(typeof window!=='undefined'?window:globalThis);
