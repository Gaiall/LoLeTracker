var request = new XMLHttpRequest();
request.open("GET",champion_v3+"?api_key="+apiKey,false);
request.onload=function(){
  var data = JSON.parse(this.response);
  /*Permet d'afficher le status des serveurs avec la première lettre en majuscule*/
  for(let i = 0; i < data.freeChampionIdsForNewPlayers.length;i++){
    let link ='./DATA/10.5.1/img/champion/';
    name = chIdToName(data.freeChampionIdsForNewPlayers[i]);
    link += name;
    link +='.png';
    link = casParticulier2(name, link);
    id = i.toString() + "rcPN";
    document.getElementById(id).innerHTML='<img src="'+link+'" class="rotationChampionPic" atl="'+chIdToName(data.freeChampionIdsForNewPlayers[i])+'">';
  }
};
request.send();
