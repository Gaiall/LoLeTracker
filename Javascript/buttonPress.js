document.getElementById("summonerNameContainer").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
      document.getElementById("boutonSearch").click();
    }
});

document.getElementById("boutonSearch").onclick = function(){
    console.log("button");
    getSummonerIDbyName();
    console.log("le Name");
    getSummonerIcon();
    console.log("le Icon");
}
