function getMatchlist(){
    var request = new XMLHttpRequest();
    request.open("GET",match_v4_matchlist+accountId+"?api_key="+apiKey,false);
    request.onload=function(){
      matchlist = JSON.parse(this.response);
    }
    request.send();
}
