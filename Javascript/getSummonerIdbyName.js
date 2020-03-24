function getSummonerIDbyName(){
    summonerName = document.getElementById("summonerNameContainer").value;
    var request = new XMLHttpRequest();
    request.open("GET",summoner_v4+summonerName+"?api_key="+apiKey,false);
    request.onload=function(){
      var data = JSON.parse(this.response);
      summonerId = data.id;
    };
    request.send();
    if(request.status == 200)
        return true;
    else
        return false;
}
