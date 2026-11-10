(function(){
 'use strict';
 // Deep links open education panels without collecting or storing any answers.
 function openTopic(){
  var id;try{id=decodeURIComponent(location.hash.slice(1));}catch(e){return;}
  var target=id&&document.getElementById(id);
  if(target&&target.matches('details.health-topic'))target.open=true;
 }
 openTopic();window.addEventListener('hashchange',openTopic);
})();
