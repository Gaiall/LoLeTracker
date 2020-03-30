function capitalize(s) {
    let first = s.charAt(0);
    first = first.toUpperCase();
    let sansFirst = s.slice(1);
    sansFirst = sansFirst.toLowerCase();
    s = first+sansFirst
    return s
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
    var last10Matches = new Array();
    for(let k = 0; k < last10length; k++){
        request.open("GET",match_v4_matches+matchlist.matches[k].gameId+"?api_key="+apiKey,false);
        request.onload=function(){
          last10Matches[k] = JSON.parse(this.response);
        }
        request.send();
    }
    let kdaL10 = "";
    let kL10 = 0;
    let dL10 = 0;
    let aL10 = 0;
    let minionsL10 = 0;
    let champLvL10 = 0;
    let ccL10 = 0;
    let playerID = 0;
    for(let k = 0; k < last10length; k++){
        for(let j = 0; j < 10; j++){
            if(summonerName == last10Matches[k].participantIdentities[j].player.summonerName){
                playerID = j;
            }
        }
        let playerStats = last10Matches[k].participants[playerID].stats;
        kL10+=playerStats.kills;
        dL10+=playerStats.deaths;
        aL10+=playerStats.assits;
    }
    let leKdaDesLastGames = document.getElementById(last10KDA);
    let leMinionDesLastGames = document.getElementById(last10Minions);
    let leChampLvlDesLastGames = document.getElementById(last10ChampLevel);
    let leCcDesLastGames = document.getElementById(last10CrowdControl);
    kL10 = Math.ceil(kL10/10);
    dL10 = Math.ceil(dL10/10);
    aL10 = Math.ceil(aL10/10);
    kdaL10 = kL10+"/"+dL10+"/"+aL10;
    leKdaDesLastGames.innerHTML=kdaL10;
}
