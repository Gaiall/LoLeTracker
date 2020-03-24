var request = new XMLHttpRequest();
request.open("GET",champion_v3+"?api_key="+apiKey,false);
request.onload=function(){
  var data = JSON.parse(this.response);
  /*Permet d'afficher le status des serveurs avec la première lettre en majuscule*/
  for(let i = 0; i < data.freeChampionIds.length;i++){
    let link ='./DATA/10.5.1/img/champion/';
    link +=chIdToName(data.freeChampionIds[i]);
    link +='.png';
    id = i.toString() + "rcP";
    document.getElementById(id).innerHTML='<img src="'+link+'" class="rotationChampionPic" atl="'+chIdToName(data.freeChampionIds[i])+'">';
  }
};
request.send();
