function getSummonerIcon(){
    var request = new XMLHttpRequest();
    request.open("GET","https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+summonerName+"?api_key="+apiKey,false);
    request.onload=function(){
      var data = JSON.parse(this.response);
      let link ='./DATA/10.5.1/img/profileicon/'+data.profileIconId+'.png';
      document.getElementById("summonerIcon").src = link;
    };
    request.send();
}
