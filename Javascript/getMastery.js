function getSummonerMastery(){
    var request = new XMLHttpRequest();
    request.open("GET","https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/"+summonerId+"?api_key="+apiKey, false);
    var data;
    request.onload = function(){
        data = JSON.parse(this.response);
        console.log(data);
    }
    request.send();
    if(request.status == 200){

    }
}
