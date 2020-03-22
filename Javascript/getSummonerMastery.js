function casParticulier(championName, championImage){
    switch(championName) {
        case "LeBlanc":
            championImage = "DATA/img/champion/tiles/Leblanc_0.jpg"
            break;
        case "KhaZix":
            championImage = "DATA/img/champion/tiles/Khazix_0.jpg"
            break;
        case "Fiddlesticks":
            championImage = "DATA/img/champion/tiles/FiddleSticks_0.jpg"
            break;
        default:

    }
    return championImage;
}

function getSummonerMastery(){
    var request = new XMLHttpRequest();
    request.open("GET","https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/"+summonerId+"?api_key="+apiKey, false);
    var data;
    request.onload = function(){
        data = JSON.parse(this.response);
    }
    request.send();
    if(request.status == 200){
        var tableau = document.getElementById("allMastery");
        tableau.innerHTML = "";
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
            let newTr = document.createElement('tr'); //On crée la nouvelle ligne
            let newTd0 = document.createElement('td'); //Colonne de l'image du perso
                newTd0.innerHTML = i+1;
            newTr.appendChild(newTd0);
            let newTd1 = document.createElement('td'); //Colonne de l'image du perso
                newTd1.classList.add("masteryIcon");
                let championImage = "DATA/img/champion/tiles/"+championName+"_0.jpg"
                championImage = casParticulier(championName, championImage);
                let baliseImage = document.createElement('img');
                baliseImage.src = championImage;
                newTd1.appendChild(baliseImage);
            newTr.appendChild(newTd1);
            let newTd2 = document.createElement('td');//Colonne du nom du perso
                newTd2.classList.add("masteryName");
                let leTexte = document.createElement('p');
                let championTitle = getChampionTitle(championName);
                leTexte.innerHTML = championName +" : "+championTitle;
                newTd2.appendChild(leTexte);
            newTr.appendChild(newTd2);
            let newTd3 = document.createElement('td');//Colonne du niveau de maitrise
                newTd3.classList.add("masteryLevel");
                leTexte = document.createElement('p');
                leTexte.innerHTML = data[i].championLevel;
                newTd3.appendChild(leTexte);
            newTr.appendChild(newTd3);
            let newTd4 = document.createElement('td');
                newTd4.classList.add("masteryPoint");
                leTexte = document.createElement('p');
                leTexte.innerHTML = data[i].championPoints;
                newTd4.appendChild(leTexte);
            newTr.appendChild(newTd4);
            tableau.appendChild(newTr);
        }
    }
}
