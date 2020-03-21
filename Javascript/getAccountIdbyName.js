function getSummonerIDbyName(){
    summonerName = document.getElementById("summonerNameContainer").value;
    var request = new XMLHttpRequest();
    request.open("GET","https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+summonerName+"?api_key="+apiKey,false);
    request.onload=function(){
      var data = JSON.parse(this.response);
      accountId = data.accountId;
    };
    request.send();
    if(request.status == 200)
        return true;
    else
        return false;
}
