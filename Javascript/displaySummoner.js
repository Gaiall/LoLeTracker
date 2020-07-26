function capitalize(s) {
    let first = s.charAt(0);
    first = first.toUpperCase();
    let sansFirst = s.slice(1);
    sansFirst = sansFirst.toLowerCase();
    s = first+sansFirst
    return s
}

function casParticulier2(championName, championImage){
    switch(championName) {
        case "LeBlanc":
            championImage = "./DATA/"+dataDragonVersion+"/img/champion/Leblanc.png"
            break;
        case "KhaZix":
            championImage = "./DATA/"+dataDragonVersion+"/img/champion/Khazix.png"
            break;
        case "Fiddlesticks":
            championImage = "./DATA/"+dataDragonVersion+"/img/champion/FiddleSticks.png"
            break;
        default:

    }
    return championImage;
}

function isIn(tab, argument) {
  let i;
  for(i = 0 ; i < tab.length;i++){
    if(argument == tab[i]) return true;
  }
  return false;
}

function displaySummoner(){
    var request = new XMLHttpRequest();
    request.open("GET", league_v4+summonerId+"?api_key="+apiKey, false);
    var rankedSolo;
    var rankedFlex;
    document.getElementById("summonerName").innerHTML = summonerName;
    document.getElementById("summonerIconInSummoner").src = document.getElementById("summonerIcon").src
    document.getElementById("summonerLevel").innerHTML = "Level " + summonerLevel;
    document.getElementById("summonerRank5v5Img").src = "img/Emblem_Unranked.png";
    document.getElementById("summonerRankFlexImg").src = "img/Emblem_Unranked.png";
    document.getElementById("summonerRank5v5").innerHTML = "Unranked";
    document.getElementById("summonerRankFlex").innerHTML = "Unranked";
    request.onload = function(){
        var data = JSON.parse(this.response);
        if(data.length > 0){
            if(data[0].queueType == "RANKED_FLEX_SR"){
                rankedFlex = data[0];
            } else {
                rankedSolo = data[0];
            }
            if(data.length > 1 && rankedFlex != null){
                rankedSolo = data[1];
            } else {
                rankedFlex = data[1];
            }
        }
    }
    request.send();
    if(rankedSolo != null){
        let tier = rankedSolo.tier;
        tier = capitalize(tier);
        let rank = rankedSolo.rank;
        let points = rankedSolo.leaguePoints;
        document.getElementById("summonerRank5v5Img").src = "img/Emblem_" + tier + ".png";
        document.getElementById("summonerRank5v5").innerHTML = tier + " " + rank + " " + points + "LP";
    }
    if(rankedFlex != null){
        let tier = rankedFlex.tier;
        tier = capitalize(tier);
        let rank = rankedFlex.rank;
        let points = rankedFlex.leaguePoints;
        document.getElementById("summonerRankFlexImg").src = "img/Emblem_" + tier + ".png";
        document.getElementById("summonerRankFlex").innerHTML = tier + " " + rank + " " + points + "LP";
    }
    let last10length = matchlist.matches.length < 10 ? matchlist.matches.length : 10;
    console.log("Matches : " + last10length)
    var last10Matches = new Array();
    for(let k = 0; k < last10length; k++){
        request.open("GET",match_v4_matches+matchlist.matches[k].gameId+"?api_key="+apiKey,false);
        request.onload=function(){
          last10Matches[k] = JSON.parse(this.response);
        }
        request.send();
    }

    let playerID = 0;

    let winL10 = 0;
    let kdaL10 = "";
    let kL10 = 0;
    let dL10 = 0;
    let aL10 = 0;
    let minionsL10 = 0;
    let champLvL10 = 0;
    let ccL10 = 0;
    let dmgL10 = 0;
    let dmgL10R = 0;
    let goldL10 = 0;
    let visionL10 = 0;
    let champsUsed = new Array();
    let champsTreated = new Array();
    let champsTreatedRate = new Array();
    for(let k = 0; k < last10length; k++){
        console.log("k - " + k);
        for(let j = 0; j < last10Matches[k].participantIdentities.length; j++){
            console.log("j - " + j)
            if(summonerName == last10Matches[k].participantIdentities[j].player.summonerName){
                playerID = j;
            }
        }
        let playerStats = last10Matches[k].participants[playerID].stats;
        champsUsed[k] = last10Matches[k].participants[playerID].championId;
        winL10+=playerStats.win==true?1:0;
        kL10+=playerStats.kills;
        dL10+=playerStats.deaths;
        aL10+=playerStats.assists;
        minionsL10+=playerStats.totalMinionsKilled;
        champLvL10+=playerStats.champLevel;
        ccL10+=playerStats.timeCCingOthers;
        dmgL10+=playerStats.totalDamageDealt;
        dmgL10R+=playerStats.totalDamageTaken;
        goldL10+=playerStats.goldEarned;
        visionL10+=playerStats.visionScore;
    }
    let laLigneOuJEcris = document.getElementById("last10ligne");
    laLigneOuJEcris.innerHTML = "";
    winL10 = winL10*last10length;
    laLigneOuJEcris.innerHTML += "<td>"+winL10+"%</td>";
    kL10 = Math.ceil(kL10/last10length);
    dL10 = Math.ceil(dL10/last10length);
    aL10 = Math.ceil(aL10/last10length);
    kdaL10 = kL10+"/"+dL10+"/"+aL10;
    laLigneOuJEcris.innerHTML += "<td>"+kdaL10+"</td>";
    minionsL10 = Math.ceil(minionsL10/last10length);
    laLigneOuJEcris.innerHTML += "<td>"+minionsL10+"</td>";
    champLvL10 = Math.ceil(champLvL10/last10length);
    laLigneOuJEcris.innerHTML += "<td>"+champLvL10+"</td>";
    ccL10 = Math.ceil(ccL10/last10length);
    laLigneOuJEcris.innerHTML += "<td>"+ccL10+" seconds</td>";
    dmgL10 = Math.ceil(dmgL10/last10length);
    laLigneOuJEcris.innerHTML += "<td>"+dmgL10+"</td>";
    dmgL10R = Math.ceil(dmgL10R/last10length);
    laLigneOuJEcris.innerHTML += "<td>"+dmgL10R+"</td>";
    goldL10 = Math.ceil(goldL10/last10length);
    laLigneOuJEcris.innerHTML += "<td>"+goldL10+"</td>";
    visionL10 = Math.ceil(visionL10/last10length);
    laLigneOuJEcris.innerHTML += "<td>"+visionL10+"</td>";

    if(last10length != 0){
        let laTable = document.getElementById("last10Stats");
        laTable.visibility="visible";
    }

    for(let i = 0 ; i < last10length ; i++){
        if(!isIn(champsTreated,champsUsed[i])){
            champsTreated[champsTreated.length] = champsUsed[i];
            champsTreatedRate[champsTreatedRate.length] = 1;
        }else{
            champsTreatedRate[champsTreated.indexOf(champsUsed[i])] = champsTreatedRate[champsTreated.indexOf(champsUsed[i])] + 1;
        }
    }
    let endroitDesChampions = document.getElementById("ChampionsUsed");
    endroitDesChampions.innerHTML = "<br>";
    for(let i = 0; i < champsTreated.length; i++){
        championName = chIdToName(champsTreated[i]);
        championSrc = "./DATA/"+dataDragonVersion+"/img/champion/"+championName+".png";
        championSrc = casParticulier2(championName, championSrc);
        endroitDesChampions.innerHTML += '<div><img src="' + championSrc + '" alt="Champion">' + champsTreatedRate[i]*10+"%</div>";
    }
}
