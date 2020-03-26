function displayHistoryList(){
    console.log("Execution du displayHistoryList");
    var laList = document.getElementById("gameNumberSelect");
    let res = "";
    res += '<select id="selectedMatch" onchange="displayHistory()">';
    res += '<option value="">Please choose a match</option>';
    let length = 50;
    length = matchlist.length < length ? matchlist.length : length;
    for(let m = 1; m <= length; m++){
        res += '<option value="'+m+'">'+m+'</option>';
    }
    res += '</select>';
    laList.innerHTML = res;
}
