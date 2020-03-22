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
        var tableau = document.getElementById("allMastery");
        for (var i = 0; i < data.length; i++) {
            //On récupère les 3 premiers meilleurs champions
            var championName = chIdToName(data[i].championId)
            switch(i){
                case 0:
                    document.getElementById("firstBest").src = "DATA/img/champion/tiles/"+championName+"_0.jpg"
                    break;
                case 1:
                    document.getElementById("secondBest").src = "DATA/img/champion/tiles/"+championName+"_0.jpg"
                    break;
                case 2:
                    document.getElementById("thirdBest").src = "DATA/img/champion/tiles/"+championName+"_0.jpg"
                    break;
                default:
            }
            console.log(chIdToName(data[i].championId));
            let newTr = document.createElement('tr'); //On crée la nouvelle ligne
            let newTd1 = document.createElement('td'); //Colonne de l'image du perso
                newTd1.classList.add("masteryIcon");
                let championImage = "DATA/img/champion/tiles/"+championName+"_0.jpg"
                let baliseImage = document.createElement('img');
                newTd1.appendChild(baliseImage);
            newTr.appendChild(newTd1);
            let newTd2 = document.createElement('td');//Colonne du nom du perso
            let newTd3 = document.createElement('td');
            let newTd4 = document.createElement('td');
        }
    }
}
