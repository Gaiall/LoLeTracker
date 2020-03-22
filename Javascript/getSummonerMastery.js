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
            let newTd1 = document.createElement('td'); //Colonne de l'image du perso
                newTd1.classList.add("masteryIcon");
                let championImage = "DATA/img/champion/tiles/"+championName+"_0.jpg"
                let baliseImage = document.createElement('img');
                baliseImage.src = championImage;
                newTd1.appendChild(baliseImage);
            newTr.appendChild(newTd1);
            let newTd2 = document.createElement('td');//Colonne du nom du perso
                newTd2.classList.add("masteryName");
                let leTexte = document.createElement('p');
                let championTitle = getChampionTitle(championName)
                console.log(championTitle);
                leTexte.innerHTML = championName +" : "+getChampionTitle(championTitle);
                newTd2.appendChild(leTexte);
            newTr.appendChild(newTd2);
            let newTd3 = document.createElement('td');//Colonne du niveau de maitrise
                newTd3.classList.add("masteryLevel");
                leTexte = document.createElement('p');
                leTexte.innerHTML = data[i].championLevel;
                newTd3.appendChild(leTexte);
            newTr.appendChild(newTd3);
            let newTd4 = document.createElement('td');
                newTd4.classList.add("masteryLevel");
                leTexte = document.createElement('p');
                leTexte.innerHTML = data[i].championPoints;
                newTd4.appendChild(leTexte);
            newTr.appendChild(newTd4);
            tableau.appendChild(newTr);
        }
    }
}
