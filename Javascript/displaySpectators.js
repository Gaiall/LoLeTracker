function displaySpectator(){
  var request = new XMLHttpRequest();
  request.open("GET","https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/"+summonerId+"?api_key="+apiKey,false);
  request.onload=function(){
    var data = JSON.parse(this.response);
    let color = "red";
    let nbBlue = 0;
    let nbRed = 0;
    let id = "";
    let res = "";
    if(data.status.status_code == "200"){
      for(let i = 0; i < 10; i++){
        switch(data.participants[0].teamId){
            case 100:
              nbBlue += 1;
              id="blue"+nbBlue+"ChampRaw";
              res = "";
              /*Champion*/
              res += '<td><img src="DATA/10.5.1/img/champion/'+chIdToName(data.participants[i].championId)+'.png" class="teamChampionPic"></td>';
              /*Nom*/
              res += '<td>'+data.participants[i].summonerName+'</td>';
              /*Runes*/
              res += '<td><img src="DATA/img/perk-images/Styles/7203_Whimsy.png" class="runes"><img src="DATA/img/perk-images/Styles/7204_Resolve.png" class="runes"></td>';
              /*Summoner Spells*/
              res += '<td><img src="DATA/10.5.1/img/spell/'+idToSummonerSpell(data.participants[i].spell1id)+'.png" class="SummonerSpell"><img src="DATA/10.5.1/img/spell/'+idToSummonerSpell(data.participants[i].spell2id)+'.png" class="SummonerSpell"></td>'
              /*OBJETS TODO*/
              res += "Les items."
              document.getElementById(id).innerHTML=res;
            break;
            case 200:
              nbRed += 1;
              id="red"+nbRed+"ChampRaw";
              res = "";
              /*Champion*/
              res += '<td><img src="DATA/10.5.1/img/champion/'+chIdToName(data.participants[i].championId)+'.png" class="teamChampionPic"></td>';
              /*Nom*/
              res += '<td>'+data.participants[i].summonerName+'</td>';
              /*Runes TODO*/
              res += '<td><img src="DATA/img/perk-images/Styles/7203_Whimsy.png" class="runes"><img src="DATA/img/perk-images/Styles/7204_Resolve.png" class="runes"></td>';
              /*Summoner Spells*/
              res += '<td><img src="DATA/10.5.1/img/spell/'+idToSummonerSpell(data.participants[i].spell1id)+'.png" class="SummonerSpell"><img src="DATA/10.5.1/img/spell/'+idToSummonerSpell(data.participants[i].spell2id)+'.png" class="SummonerSpell"></td>'
              /*OBJETS TODO*/
              res += "Les items."
              document.getElementById(id).innerHTML=res;
            break;
            default:
              return false;
            break;
        }
      }
      return true;
    }else{
      return false;
    }
  };
  request.send();
}
