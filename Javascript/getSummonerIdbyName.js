function getSummonerIDbyName(){
    summonerName = document.getElementById("summonerNameContainer").value;
    var request = new XMLHttpRequest();
    request.open("GET","https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+summonerName+"?api_key="+apiKey,false);
    request.onload=function(){
      var data = JSON.parse(this.response);
      summonerId = data.id;
    };
    request.send();
}