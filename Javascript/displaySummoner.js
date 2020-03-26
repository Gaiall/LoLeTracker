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
}
