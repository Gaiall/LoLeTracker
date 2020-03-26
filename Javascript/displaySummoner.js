function displaySummoner(){
    var request = new XMLHttpRequest();
    request.open("GET", league_v4+summonerId+"?api_key="+apiKey, false);
    var rankedSolo;
    var rankedFlex;
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
}
