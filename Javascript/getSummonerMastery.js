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
        tableau.innerHTML = "<tr><th>Rank</th><th>Champion</th><th>Title</th><th>Level</th><th>Points</th><th>Progress</th></tr>";
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
            let newTdChampionRank = document.createElement('td'); //Colonne de l'image du perso
                newTdChampionRank.innerHTML = i+1;
            newTr.appendChild(newTdChampionRank);
            let newTdChampionPic = document.createElement('td'); //Colonne de l'image du perso
                newTdChampionPic.classList.add("masteryIcon");
                let championImage = "DATA/img/champion/tiles/"+championName+"_0.jpg"
                championImage = casParticulier(championName, championImage);
                let baliseImage = document.createElement('img');
                baliseImage.src = championImage;
                newTdChampionPic.appendChild(baliseImage);
            newTr.appendChild(newTdChampionPic);
            let newTdChampionNameTitle = document.createElement('td');//Colonne du nom du perso
                newTdChampionNameTitle.classList.add("masteryName");
                let leTexte = document.createElement('p');
                let championTitle = getChampionTitle(championName);
                leTexte.innerHTML = championName +" : "+championTitle;
                newTdChampionNameTitle.appendChild(leTexte);
            newTr.appendChild(newTdChampionNameTitle);
            /*Le niveau*/
            let newTdMasteryLevel = document.createElement('td');//Colonne du niveau de maitrise
                newTdMasteryLevel.classList.add("masteryLevel");
                leTexte = document.createElement('p');
                leTexte.innerHTML = data[i].championLevel;
                leTexte.innerHTML += '<img src="img/mastery'+data[i].championLevel+'.png" class="masteryLevelPic">'
                newTdMasteryLevel.appendChild(leTexte);
            newTr.appendChild(newTdMasteryLevel);
            /*L'xp*/
            let newTdMasteryPoints = document.createElement('td');
                newTdMasteryPoints.classList.add("masteryPoint");
                leTexte = document.createElement('p');
                leTexte.innerHTML = data[i].championPoints;
                newTdMasteryPoints.appendChild(leTexte);
            newTr.appendChild(newTdMasteryPoints);
            /*La barre*/
            let newTdMasteryPointsSLL = document.createElement('td');
                newTdMasteryPointsSLL.classList.add("masteryPoint");
                let xpNeeded = data[i].championPointsSinceLastLevel + data[i].championPointsUntilNextLevel;
                leTexte.innerHTML='<td><progress max="'+xpNeeded+'" value="'+data[i].championPointsSinceLastLevel+'"></progress></td>'
                //newTdMasteryPointsSLL.appendChild(leTexte);
            newTr.innerHTML += leTexte;
            tableau.appendChild(newTr);
        }
    }
}
