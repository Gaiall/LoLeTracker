function displayHistory(){
  var data;
  let errorDiv = document.getElementById("playerNeverPlayedError");
  let tableauHistory = document.getElementById("tableEquipesHistory");
  let i = document.getElementById("selectedMatch").value;
  if(i == ""){
      i = 0;
  }

  if(request.status==200){
      request.open("GET",match_v4_matches+matchlist.matches[i].gameId+"?api_key="+apiKey,false);
      request.onload=function(){
        data = JSON.parse(this.response);
      }
      request.send();
      let blueTeam = data.teams[0].teamId == 100 ? 0 : 1;
      let redTeam = data.teams[0].teamId == 200 ? 0 : 1;

      let blueWinner = document.getElementById("blueWon");
      let redWinner = document.getElementById("redWon");

      let redNash = document.getElementById("redNashor");
      let blueNash = document.getElementById("blueNashor");

      let redDragon = document.getElementById("redDragon");
      let blueDragon = document.getElementById("blueDragon");

      let redHeraut = document.getElementById("redHerald");
      let blueHeraut = document.getElementById("blueHerald");

      let redTour = document.getElementById("redTower");
      let blueTour = document.getElementById("blueTower");

      let redInhibitor = document.getElementById("redInhib");
      let blueInhibitor = document.getElementById("blueInhib");

      let redSang = document.getElementById("redKill");
      let blueSang = document.getElementById("blueKill");
      /*Win*/
      {
          if(data.teams[blueTeam].win=="Win"){
              blueWinner.innerHTML='<img src="img/win.png" class="crownPic" alt="Win">';
              redWinner.innerHTML='<img src="img/lose.png" class="crownPic" alt="Loss">';
          }else{
              redWinner.innerHTML='<img src="img/win.png" class="crownPic" alt="Win">';
              blueWinner.innerHTML='<img src="img/lose.png" class="crownPic" alt="Loss">';
          }
      }
      /*Nashor*/
      {
          if(data.teams[redTeam].firstBaron){
              redNash.innerHTML='<img src="img/nashor.png" class="nashorPic" alt="Nashor Win">';
              blueNash.innerHTML='<img src="img/noNashor.png" class="nashorPic" alt="Nashor Loss">';
          }else if(data.teams[blueTeam].firstBaron){
              blueNash.innerHTML='<img src="img/nashor.png" class="nashorPic" alt="Nashor Win">';
              redNash.innerHTML='<img src="img/noNashor.png" class="nashorPic" alt="Nashor Loss">';
          }else{
              blueNash.innerHTML='<img src="img/noNashor.png" class="nashorPic" alt="Nashor Loss">';
              redNash.innerHTML='<img src="img/noNashor.png" class="nashorPic" alt="Nashor Loss">';
          }
      }
      blueNash.innerHTML += data.teams[blueTeam].baronKills;
      redNash.innerHTML += data.teams[redTeam].baronKills;
      /*Drake*/
      {
          if(data.teams[redTeam].firstDragon){
              redDragon.innerHTML='<img src="img/drake.png" class="drakePic" alt="drake Win">';
              blueDragon.innerHTML='<img src="img/noDrake.png" class="drakePic" alt="drake Loss">';
          }else if(data.teams[blueTeam].firstDragon){
              blueDragon.innerHTML='<img src="img/drake.png" class="drakePic" alt="drake Win">';
              redDragon.innerHTML='<img src="img/noDrake.png" class="drakePic" alt="drake Loss">';
          }else{
              blueDragon.innerHTML='<img src="img/noDrake.png" class="drakePic" alt="drake Loss">';
              redDragon.innerHTML='<img src="img/noDrake.png" class="drakePic" alt="drake Loss">';
          }
      }
      blueDragon.innerHTML += data.teams[blueTeam].dragonKills;
      redDragon.innerHTML += data.teams[redTeam].dragonKills;
      /*Herald*/
      {
          if(data.teams[redTeam].firstRiftHerald){
              redHeraut.innerHTML='<img src="img/herald.png" class="heraldPic" alt="herald Win">';
              blueHeraut.innerHTML='<img src="img/noHerald.png" class="heraldPic" alt="herald Loss">';
          }else if(data.teams[blueTeam].firstRiftHerald){
              blueHeraut.innerHTML='<img src="img/herald.png" class="heraldPic" alt="herald Win">';
              redHeraut.innerHTML='<img src="img/noHerald.png" class="heraldPic" alt="herald Loss">';
          }else{
              blueHeraut.innerHTML='<img src="img/noHerald.png" class="heraldPic" alt="herald Loss">';
              redHeraut.innerHTML='<img src="img/noHerald.png" class="heraldPic" alt="herald Loss">';
          }
      }
      blueHeraut.innerHTML += data.teams[blueTeam].riftHeraldKills;
      redHeraut.innerHTML += data.teams[redTeam].riftHeraldKills;
      /*Inhib*/
      {
          if(data.teams[redTeam].firstInhibitor){
              redInhibitor.innerHTML='<img src="img/blueInhib.png" class="inhibPic" alt="inhib Win">';
              blueInhibitor.innerHTML='<img src="img/noInhib.png" class="inhibPic" alt="inhib Loss">';
          }else if(data.teams[blueTeam].firstInhibitor){
              blueInhibitor.innerHTML='<img src="img/redInhib.png" class="inhibPic" alt="inhib Win">';
              redInhibitor.innerHTML='<img src="img/noInhib.png" class="inhibPic" alt="inhib Loss">';
          }else{
              blueInhibitor.innerHTML='<img src="img/noInhib.png" class="inhibPic" alt="inhib Loss">';
              redInhibitor.innerHTML='<img src="img/noInhib.png" class="inhibPic" alt="inhib Loss">';
          }
      }
      blueInhibitor.innerHTML += data.teams[blueTeam].inhibitorKills;
      redInhibitor.innerHTML += data.teams[redTeam].inhibitorKills;
      /*Tour*/
      {
          if(data.teams[redTeam].firstTower){
              redTour.innerHTML='<img src="img/blueTower.png" class="towerPic" alt="tower Win">';
              blueTour.innerHTML='<img src="img/noTower.png" class="towerPic" alt="tower Loss">';
          }else if(data.teams[blueTeam].firstTower){
              blueTour.innerHTML='<img src="img/redTower.png" class="towerPic" alt="tower Win">';
              redTour.innerHTML='<img src="img/noTower.png" class="towerPic" alt="tower Loss">';
          }else{
              blueTour.innerHTML='<img src="img/noTower.png" class="towerPic" alt="tower Loss">';
              redTour.innerHTML='<img src="img/noTower.png" class="towerPic" alt="tower Loss">';
          }
      }
      blueTour.innerHTML += data.teams[blueTeam].towerKills;
      redTour.innerHTML += data.teams[redTeam].towerKills;
      /*Kill*/
      {
          if(data.teams[redTeam].firstBlood){
              redSang.innerHTML='<img src="img/kill.png" class="killPic" alt="kill Win">';
              blueSang.innerHTML='<img src="img/nokill.png" class="killPic" alt="kill Loss">';
          }else if(data.teams[blueTeam].firstBlood){
              blueSang.innerHTML='<img src="img/kill.png" class="killPic" alt="kill Win">';
              redSang.innerHTML='<img src="img/nokill.png" class="killPic" alt="kill Loss">';
          }else{
              blueSang.innerHTML='<img src="img/nokill.png" class="killPic" alt="kill Loss">';
              redSang.innerHTML='<img src="img/nokill.png" class="killPic" alt="kill Loss">';
          }
      }
      let redKills = 0;
      let blueKills = 0;
      for(let i = 0; i < data.participants.length; i++){
          if(data.participants[i].teamId == 100){
              blueKills += data.participants[i].stats.kills;
          }else{
              redKills += data.participants[i].stats.kills;
          }
      }
      blueSang.innerHTML += blueKills;
      redSang.innerHTML += redKills;


      let nbBlue = 0;
      let nbRed = 0;
      let id = "";
      let res = "";
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
          let bot = "";
          let srcSpell1 = "DATA/10.5.1/img/spell/"+idToSummonerSpell(data.participants[i].spell1Id);
          let srcSpell2 = "DATA/10.5.1/img/spell/"+idToSummonerSpell(data.participants[i].spell2Id);
          /*Champion*/
          res += '<td><img src="DATA/10.5.1/img/champion/'+chIdToName(data.participants[i].championId)+'.png" class="teamChampionPic" alt="'+chIdToName(data.participants[i].championId)+'">'+chIdToName(data.participants[i].championId)+'</td>';
          /*Nom*/
          if(data.participants[i].spell1Id == 0){
              bot = "Bot ";
          }
          res += '<td>'+bot + data.participantIdentities[i].player.summonerName+'</td>';
          /*KDA*/
          res += '<td>'+data.participants[i].stats.kills+"/"+data.participants[i].stats.deaths+"/"+data.participants[i].stats.assists+'</td>';
          /*Runes TODO*/
          res += '<td><img src="DATA/img/perk-images/Styles/'+mainRuneIdToName(data.participants[i].stats.perk0)+'.png" class="runes" alt="'+mainRuneIdToName(data.participants[i].stats.perk0)+'"><img src="DATA/img/perk-images/Styles/'+runeIdToName(data.participants[i].stats.perkSubStyle)+'.png" class="runes" alt="'+runeIdToName(data.participants[i].stats.perkSubStyle)+'"></td>';
          /*Summoner Spells*/
          if(data.participants[i].spell1Id == 0){
              srcSpell1 = "img/SpellPlaceholder";
              srcSpell2 = "img/SpellPlaceholder";
          }
          res += '<td><img src="'+srcSpell1+'.png" class="SummonerSpell" alt="'+idToSummonerSpell(data.participants[i].spell1Id)+'"><img src="'+srcSpell2+'.png" class="SummonerSpell" alt="'+idToSummonerSpell(data.participants[i].spell2Id)+'"></td>'
          /*Objets*/
          res += '<td>';
          if(data.participants[i].stats.item0 != 0){
              res += '<img src="DATA/10.5.1/img/item/'+data.participants[i].stats.item0+'.png" class="items" alt="item">';
          }
          if(data.participants[i].stats.item1 != 0){
              res += '<img src="DATA/10.5.1/img/item/'+data.participants[i].stats.item1+'.png" class="items" alt="item">';
          }
          if(data.participants[i].stats.item2 != 0){
              res += '<img src="DATA/10.5.1/img/item/'+data.participants[i].stats.item2+'.png" class="items" alt="item">';
          }
          if(data.participants[i].stats.item3 != 0){
              res += '<img src="DATA/10.5.1/img/item/'+data.participants[i].stats.item3+'.png" class="items" alt="item">';
          }
          if(data.participants[i].stats.item4 != 0){
              res += '<img src="DATA/10.5.1/img/item/'+data.participants[i].stats.item4+'.png" class="items" alt="item">';
          }
          if(data.participants[i].stats.item5 != 0){
              res += '<img src="DATA/10.5.1/img/item/'+data.participants[i].stats.item5+'.png" class="items" alt="item">';
          }
          if(data.participants[i].stats.item6 != 0){
              res += '<img src="DATA/10.5.1/img/item/'+data.participants[i].stats.item6+'.png" class="items" alt="item">';
          }
          res +="</td>";
          /*Minions*/
          res+='<td>'+data.participants[i].stats.totalMinionsKilled+'</td>'
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
