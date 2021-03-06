function getSummonerIcon(){
    var request = new XMLHttpRequest();
    request.open("GET",summoner_v4+summonerName+"?api_key="+apiKey,false);
    request.onload=function(){
        var data = JSON.parse(this.response);
        if(this.status == 200){
            let link ='./DATA/'+dataDragonVersion+'/img/profileicon/'+data.profileIconId+'.png';
            document.getElementById("summonerIcon").src = link;
            document.getElementById("summonerIcon").classList.add("rotationChampionPic");
            document.getElementById("summonerNameError").innerHTML = "";
        } else {
            document.getElementById("summonerIcon").src = "img/favicon.png"
            document.getElementById("summonerIcon").classList.remove("rotationChampionPic");
            document.getElementById("summonerNameError").innerHTML = "Summoner does not exist";
        }
    };
    request.send();
    if(request.status == 200)
        return true;
    else
        return false;
}
