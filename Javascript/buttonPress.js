document.getElementById("summonerNameContainer").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById("boutonSearch").click();
    }
});

document.getElementById("boutonSearch").onclick = function(){
    getSummonerIDbyName();
    getSummonerIcon();
}
