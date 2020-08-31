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

function displayMastery(){
    var request = new XMLHttpRequest();
    request.open("GET",champion_mastery_v4+summonerId+"?api_key="+apiKey, false);
    var data;
    request.onload = function(){
        data = JSON.parse(this.response);
    }
    request.send();
    if(request.status == 200){
        var tableau = document.getElementById("allMastery");
        tableau.innerHTML = "";
        document.getElementById("firstBest").src = "DATA/"+dataDragonVersion+"/img/profileicon/29.png"
        document.getElementById("secondBest").src = "DATA/"+dataDragonVersion+"/img/profileicon/29.png"
        document.getElementById("thirdBest").src = "DATA/"+dataDragonVersion+"/img/profileicon/29.png"
        if(data.length > 0){
            /*Champion par champion*/
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
            let masteryScore = 0;
            let totalChampXP = 0;
            let totalChestsGranted = 0;
            let totalChestsUngranted = 0;
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
                    baliseImage.alt = championName;
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
                    masteryScore += data[i].championLevel;
                    leTexte.style.marginBottom = "0px";
                    leTexte.style.marginTop = "0px";
                    let imageMaitrise = document.createElement('img');
                    imageMaitrise.src = "img/mastery"+data[i].championLevel+".png"
                    imageMaitrise.classList.add("masteryLevelPic");
                    imageMaitrise.alt = "Maîtrise du champion"
                    newTdMasteryLevel.appendChild(leTexte);
                    newTdMasteryLevel.appendChild(imageMaitrise);
                newTr.appendChild(newTdMasteryLevel);
                /*L'xp*/
                let newTdMasteryPoints = document.createElement('td');
                    newTdMasteryPoints.classList.add("masteryPoint");
                    leTexte = document.createElement('p');
                    leTexte.innerHTML = data[i].championPoints;
                    totalChampXP += data[i].championPoints;
                    newTdMasteryPoints.appendChild(leTexte);
                newTr.appendChild(newTdMasteryPoints);
                /*La barre*/
                /*On garde le code qui pue de David parce que je sais pas aligner des élements correctement avec le css*/
                /*(grosse merde)*/
                let xpNeeded = data[i].championPointsSinceLastLevel + data[i].championPointsUntilNextLevel;
                let newTdXp = '<td>'+data[i].championPointsSinceLastLevel+'  <progress max="'+xpNeeded+'" value="'+data[i].championPointsSinceLastLevel+'"></progress>  '+xpNeeded+'</td>';
                if(data[i].championPointsUntilNextLevel == 0){
                    newTdXp = "<td>";
                    for(let tk = 1 ; tk <= data[i].tokensEarned ; tk++){
                        newTdXp += '<img src="img/tokenGranted.png" class="chestPic" alt="Token Obtained">';
                    }
                    let necessaryToken = 3;
                    if(data[i].championLevel == 5){
                        necessaryToken = 2;
                    }
                    for(let tkN = 1; tkN <= necessaryToken - data[i].tokensEarned;tkN++){
                        newTdXp += '<img src="img/tokenNotGranted.png" class="chestPic" alt="Token not Obtained">';
                    }
                    newTdXp += "</td>";
                }

                if(data[i].championLevel == 7){
                    newTdXp = "<td><p>Level Max reached !</p></td>";
                }
                newTr.innerHTML += newTdXp;
                /*Le coffre*/
                let newTdChest = document.createElement('td');
                    let chestUrl = "img/ChestNotGranted.png";
                    if(data[i].chestGranted){
                        totalChestsGranted += 1;
                        chestUrl = "img/ChestGranted.png";
                    }else{
                        totalChestsUngranted += 1;
                    }
                    let imgChest = document.createElement('img');
                    imgChest.src = chestUrl;
                    imgChest.classList.add("chestPic");
                    imgChest.alt = "Coffre"
                    newTdChest.appendChild(imgChest);
                newTr.appendChild(newTdChest);
                tableau.appendChild(newTr);
            }
            /*Après avoir récupéré toutes les infos, on remplit les cases du tableau résumé*/
            document.getElementById("numMasteryScore").innerHTML = masteryScore;
            document.getElementById("numChampionXP").innerHTML = totalChampXP;
            document.getElementById("numChestGranted").innerHTML = totalChestsGranted;
            document.getElementById("numChestLeft").innerHTML = totalChestsUngranted;
        } else {
            let headerTr = document.createElement('tr');
            let th = document.createElement('th');
                th.innerHTML = "This Summoner never played any PvP game";
                headerTr.appendChild(th);
            tableau.appendChild(headerTr);
        }
    }
}
