document.getElementById("summonerNameContainer").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById("boutonSearch").click();
    }
});

document.getElementById("boutonSearch").onclick = function(){
    let gotName = getSummonerIDbyName();
    let gotIcon = getSummonerIcon();
    if(gotName && gotIcon){
        let lesBouttons = document.getElementsByClassName("tablinks");
        for (let i = 0; i < lesBouttons.length; i++) {
            lesBouttons[i].disabled = false;
        }
    } else {
        let lesBouttons = document.getElementsByClassName("tablinks");
        for (let i = 0; i < lesBouttons.length; i++) {
            let elem = lesBouttons[i];
            elem.disabled = true;
            elem.classList.remove("active");
        }
        let tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
    }
}
