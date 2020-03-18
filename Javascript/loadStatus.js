var request = new XMLHttpRequest();
request.open("GET","https://euw1.api.riotgames.com/lol/status/v3/shard-data?api_key="+apiKey,false);
request.onload=function(){
  var data = JSON.parse(this.response);
  /*Permet d'afficher le status des serveurs avec la première lettre en majuscule*/
  document.getElementById('servStatusContainer').innerHTML=data.services[0].status.charAt(0).toUpperCase() + data.services[0].status.slice(1);
};
request.send();
