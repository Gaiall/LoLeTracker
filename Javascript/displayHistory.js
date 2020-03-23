function displayHistory(){
  var data;
  var request = new XMLHttpRequest();
  request.open("GET","https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/"+summonerId+"?api_key="+apiKey,false);
  request.onload=function(){
    data = JSON.parse(this.response);
  }
  request.send();
  let nbBlue = 0;
  let nbRed = 0;
  let id = "";
  let res = "";
  let errorDiv = document.getElementById("playerNeverPlayedError");
  let tableauHistory = document.getElementById("tableEquipesHistory");
  if(request.status==200){
    for(let i = 0; i < data.participants.length; i++){
      switch(data.participants[i].teamId){
        case 100:
        nbBlue += 1;
        id="blue"+nbBlue+"ChampHistoryRaw";
        break;
        case 200:
        nbRed += 1;
        id="red"+nbRed+"ChampHistoryRaw";
        break;
        default:
        return false;
        break;
      }
      res = "";
      /*Champion*/
      res += '<td><img src="DATA/10.5.1/img/champion/'+chIdToName(data.participants[i].championId)+'.png" class="teamChampionPic">'+chIdToName(data.participants[i].championId)+'</td>';
      /*Nom*/
      res += '<td>'+data.participants[i].summonerName+'</td>';
      /*Runes TODO*/
      res += '<td><img src="DATA/img/perk-images/Styles/'+mainRuneIdToName(data.participants[i].perks.perkIds[0])+'.png" class="runes"><img src="DATA/img/perk-images/Styles/'+runeIdToName(data.participants[i].perks.perkSubStyle)+'.png" class="runes"></td>';
      /*Summoner Spells*/
      res += '<td><img src="DATA/10.5.1/img/spell/'+idToSummonerSpell(data.participants[i].spell1Id)+'.png" class="SummonerSpell"><img src="DATA/10.5.1/img/spell/'+idToSummonerSpell(data.participants[i].spell2Id)+'.png" class="SummonerSpell"></td>'
      /*OBJETS TODO*/
      /*console.log(data.participants[i].gameCustomizationObjects);
      for(let j = 0; j < data.participants[i].gameCustomizationObjects.length; j++){
          console.log(data.participants[i].gameCustomizationObjects[j]);
          res += '<td><img src="DATA/10.5.1/img/items/'+"1055"+'".png class="items">'
      }*/
      document.getElementById(id).innerHTML=res;
    }
    tableauHistory.style.visibility="visible";
    errorDiv.style.visibility="hidden";
    return true;
  }else{
    tableauHistory.style.visibility="hidden";
    switch(request.status){
      case 400:
        errorDiv.innerHTML = "Bad Request.";
      break;
      case 404:
        errorDiv.innerHTML = "This user never played.";
      break;
      case 401:
        errorDiv.innerHTML = "Unauthorised Request.";
      break;
      case 403:
        errorDiv.innerHTML = "Forbidden Request.";
      break;
      case 405:
        errorDiv.innerHTML = "Unauthorised Method.";
      break;
      case 415:
        errorDiv.innerHTML = "Unsupported media type.";
      break;
      case 429:
        errorDiv.innerHTML = "Rate limit exceeded.";
      break;
      case 500:
        errorDiv.innerHTML = "Internal Server Error.";
      break;
      case 502:
        errorDiv.innerHTML = "Bad Gateway.";
      break;
      case 503:
        errorDiv.innerHTML = "Service unavailable.";
      break;
      case 504:
        errorDiv.innerHTML = "Gateway Timeout.";
      break;
    }
    errorDiv.style.visibility="visible";
    return false;
  }
}
