var apiKey = "RGAPI-0952a012-c842-4fba-aa47-eafb5fa73bd0";
var request = new XMLHttpRequest();
request.open("GET","https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key="+apiKey,false);
request.onload=function(){
  var data = JSON.parse(this.response);
  /*Permet d'afficher le status des serveurs avec la première lettre en majuscule*/
  for(let i = 0; i < data.freeChampionIdsForNewPlayers.length;i++){
    let link ='./DATA/10.5.1/img/champion/';
    link +=chIdToName(data.freeChampionIdsForNewPlayers[i]);
    link +='.png';
    id = i.toString() + "rcPN";
    document.getElementById(id).innerHTML='<img src="'+link+'" class="rotationChampionPic"/>';
  }
};
request.send();
