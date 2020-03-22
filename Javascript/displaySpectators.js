function displaySpectators(){
  var data;
  var request = new XMLHttpRequest();
  request.open("GET","https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/"+summonerId+"?api_key="+apiKey,false);
  request.onload=function(){
    data = JSON.parse(this.response);
  }
  request.send();
  let color = "red";
  let nbBlue = 0;
  let nbRed = 0;
  let id = "";
  let res = "";
  let lerreurSpectate = document.getElementById("playerNotPlayingError");
  let tableauSpectate = document.getElementById("tableEquipes");
  if(request.status==200){
    for(let i = 0; i < 10; i++){
      switch(data.participants[i].teamId){
        case 100:
        nbBlue += 1;
        id="blue"+nbBlue+"ChampRaw";
        res = "";
        /*Champion*/
        res += '<td><img src="DATA/10.5.1/img/champion/'+chIdToName(data.participants[i].championId)+'.png" class="teamChampionPic">'+chIdToName(data.participants[i].championId)+'</td>';
        /*Nom*/
        res += '<td>'+data.participants[i].summonerName+'</td>';
        /*Runes*/
        res += '<td><img src="DATA/img/perk-images/Styles/'+runeIdToName(data.participants[i].perks.perkStyle)+'.png" class="runes"><img src="DATA/img/perk-images/Styles/'+runeIdToName(data.participants[i].perks.perkSubStyle)+'.png" class="runes"></td>';
        /*Summoner Spells*/
        console.log(data.participants[i].spell1Id);
        res += '<td><img src="DATA/10.5.1/img/spell/'+idToSummonerSpell(data.participants[i].spell1Id)+'.png" class="SummonerSpell"><img src="DATA/10.5.1/img/spell/'+idToSummonerSpell(data.participants[i].spell2Id)+'.png" class="SummonerSpell"></td>'
        /*OBJETS TODO*/
        res += "Les items."
        document.getElementById(id).innerHTML=res;
        break;
        case 200:
        nbRed += 1;
        id="red"+nbRed+"ChampRaw";
        res = "";
        /*Champion*/
        res += '<td><img src="DATA/10.5.1/img/champion/'+chIdToName(data.participants[i].championId)+'.png" class="teamChampionPic">'+chIdToName(data.participants[i].championId)+'</td>';
        /*Nom*/
        res += '<td>'+data.participants[i].summonerName+'</td>';
        /*Runes TODO*/
        res += '<td><img src="DATA/img/perk-images/Styles/'+runeIdToName(data.participants[i].perks.perkStyle)+'.png" class="runes"><img src="DATA/img/perk-images/Styles/'+runeIdToName(data.participants[i].perks.perkSubStyle)+'.png" class="runes"></td>';
        /*Summoner Spells*/
        res += '<td><img src="DATA/10.5.1/img/spell/'+idToSummonerSpell(data.participants[i].spell1Id)+'.png" class="SummonerSpell"><img src="DATA/10.5.1/img/spell/'+idToSummonerSpell(data.participants[i].spell2Id)+'.png" class="SummonerSpell"></td>'
        /*OBJETS TODO*/
        res += "Les items."
        document.getElementById(id).innerHTML=res;

        break;
        default:
        return false;
        break;
      }
      tableEquipes.style.display="block";
      lerreurSpectate.style.display="none";
    }
    return true;
  }else{
    tableEquipes.style.display="none";
    switch(request.status){
      case 400:
        lerreurSpectate.innerHTML = "Bad Request.";
      break;
      case 404:
        lerreurSpectate.innerHTML = "L'utilisateur n'est pas en train de jouer.";
      break;
      case 401:
        lerreurSpectate.innerHTML = "Requête non autorisée.";
      break;
      case 403:
        lerreurSpectate.innerHTML = "Requête interdite.";
      break;
      case 405:
        lerreurSpectate.innerHTML = "Méthode non autorisée.";
      break;
      case 415:
        lerreurSpectate.innerHTML = "Média non supporté.";
      break;
      case 429:
        lerreurSpectate.innerHTML = "Trop de requêtes.";
      break;
      case 500:
        lerreurSpectate.innerHTML = "Internal Server Error.";
      break;
      case 502:
        lerreurSpectate.innerHTML = "Bad Gateway.";
      break;
      case 503:
        lerreurSpectate.innerHTML = "Service non disponible.";
      break;
      case 504:
        lerreurSpectate.innerHTML = "Gateway Timeout.";
      break;
    }
    return false;
  }
}
