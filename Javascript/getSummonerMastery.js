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
        let headerTr = document.createElement('tr');
        let th1 = document.createElement('th');
            th1.innerHTML = "Rank";
            headerTr.appendChild(th1);
        let th2= document.createElement('th');
            th2.innerHTML = "       ";
            headerTr.appendChild(th2);
        let th3 = document.createElement('th');
            th3.innerHTML = "Champion Name";
            headerTr.appendChild(th3);
        let th4 = document.createElement('th');
            th4.innerHTML = "Level";
            headerTr.appendChild(th4);
        let th5 = document.createElement('th');
            th5.innerHTML = "Points";
            headerTr.appendChild(th5);
        let th6 = document.createElement('th');
            th6.innerHTML = "Progress";
            headerTr.appendChild(th6);
        let th7 = document.createElement('th');
            th7.innerHTML = "Chest";
            headerTr.appendChild(th7);
        tableau.appendChild(headerTr);
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
            /*Le rank*/
            let newTdChampionRank = document.createElement('td');
                newTdChampionRank.innerHTML = i+1;
            newTr.appendChild(newTdChampionRank);
            /*L'image*/
            let imgUrl = "DATA/img/champion/tiles/"+championName+"_0.jpg";
            imgUrl = casParticulier(championName, imgUrl);
            newTdChampionPic = document.createElement('td');
                newTdChampionPic.classList.add("masteryIcon");
                let championImage = "DATA/img/champion/tiles/"+championName+"_0.jpg"
                championImage = casParticulier(championName, championImage);
                let baliseImage = document.createElement('img');
                baliseImage.src = championImage;
                newTdChampionPic.appendChild(baliseImage);
            newTr.appendChild(newTdChampionPic);
            /*Le nom et Titre*/
            let newTdChampionNameTitle = document.createElement('td');
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
                leTexte.style.marginBottom = "0px";
                leTexte.style.marginTop = "0px";
                let imageMaitrise = document.createElement('img');
                imageMaitrise.src = "img/mastery"+data[i].championLevel+".png"
                imageMaitrise.classList.add("masteryLevelPic");
                newTdMasteryLevel.appendChild(leTexte);
                newTdMasteryLevel.appendChild(imageMaitrise);
            newTr.appendChild(newTdMasteryLevel);
            /*L'xp*/
            let newTdMasteryPoints = document.createElement('td');
                newTdMasteryPoints.classList.add("masteryPoint");
                leTexte = document.createElement('p');
                leTexte.innerHTML = data[i].championPoints;
                newTdMasteryPoints.appendChild(leTexte);
            newTr.appendChild(newTdMasteryPoints);
            /*La barre*/
            /*On garde le code qui pue de David parce que je sais pas aligner des élements correctement avec le css*/
            /*(grosse merde)*/
            let xpNeeded = data[i].championPointsSinceLastLevel + data[i].championPointsUntilNextLevel;
            let newTdXp = '<td>'+data[i].championPointsSinceLastLevel+'  <progress max="'+xpNeeded+'" value="'+data[i].championPointsSinceLastLevel+'"></progress>  '+xpNeeded+'</td>';
            if(data[i].championPointsSinceLastLevel == xpNeeded)
                newTdXp = "<td><p>No XP needed</p></td>";
            if(data[i].championLevel == 7)
                newTdXp = "<td><p>Level Max reached !</p></td>";
            newTr.innerHTML += newTdXp;
            /*Le coffre*/
            let newTdChest = document.createElement('td');
                let chestUrl = "img/ChestNotGranted.png";
                if(data[i].chestGranted){
                    chestUrl = "img/ChestGranted.png";
                }
                let imgChest = document.createElement('img');
                imgChest.src = chestUrl;
                imgChest.classList.add("chestPic");
                newTdChest.appendChild(imgChest);
            newTr.appendChild(newTdChest);
            tableau.appendChild(newTr);
        }
    }
}
