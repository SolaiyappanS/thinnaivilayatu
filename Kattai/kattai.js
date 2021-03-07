var round = 0;
var win = 0;
var move = true;
var m;
var fixedi, fixedj;
var interval;
interval = setInterval(end);
function select(i,j) {
    if(round<6) {
        round++;
        if (document.getElementById("box"+i+j).classList=="fab")
        if (round%2==0) document.getElementById("box"+i+j).classList="far fa-dot-circle";
        else document.getElementById("box"+i+j).classList="fas fa-dot-circle";
        else round--;
        checkFilled();
    }
    else if ((round%2==0 && document.getElementById("box"+i+j).classList!="far fa-dot-circle")
    || (round%2==1 && document.getElementById("box"+i+j).classList!="fas fa-dot-circle")) {
        if (document.getElementById("box"+i+j).classList!="fab") {
            if (move){
                m = document.getElementById("box"+i+j).classList;
                fixedi=i; fixedj=j;
                move =false; round++;
            } else {
                fixedi=4; fixedj=4;
                round++;
                move =true;
            }
        }
        else if (document.getElementById("box"+i+j).classList=="fab" && !move) {
            if ((fixedi==i && (fixedj==j+1 || fixedj==j-1))
            || (fixedj==j && (fixedi==i+1 || fixedi==i-1))
            || (fixedi==1 && fixedj==2 && i!=1 && j!=2)
            || (fixedi!=1 && fixedj!=2 && i==1 && j==2)) {
                document.getElementById("box"+i+j).classList =m ;
                m="fab";
                document.getElementById("box"+fixedi+fixedj).classList =m ;
            }
            else { 
                round++; 
                alert('இதை தேர்ந்தெடுக்க முடியாது. வேறு எதையும் தேர்ந்தெடுக்கவும்.\nCannot select this. Select any other key.');
            }
            fixedi=4; fixedj=4; move =true; 
            checkFilled();
        }
        else alert('இதை தேர்ந்தெடுக்க முடியாது. வேறு எதையும் தேர்ந்தெடுக்கவும்.\nCannot select this. Select any other key.');
    }
}

function checkFilled(){
    var a = document.getElementById("box01").classList;
    var b = document.getElementById("box02").classList;
    var c = document.getElementById("box03").classList;
    var d = document.getElementById("box11").classList;
    var e = document.getElementById("box12").classList;
    var f = document.getElementById("box13").classList;
    var g = document.getElementById("box21").classList;
    var h = document.getElementById("box22").classList;
    var i = document.getElementById("box23").classList;
    var x = "fas fa-dot-circle";
    var o = "far fa-dot-circle";

    if((a==x && b==x && c==x)
        ||(d==x && e==x && f==x)
        ||(g==x && h==x && i==x)
        ||(a==x && d==x && g==x)
        ||(b==x && e==x && h==x)
        ||(c==x && f==x && i==x)
        ||(a==x && e==x && i==x)
        ||(c==x && e==x && g==x)) win = 1;
    if((a==o && b==o && c==o)
        ||(d==o && e==o && f==o)
        ||(g==o && h==o && i==o)
        ||(a==o && d==o && g==o)
        ||(b==o && e==o && h==o)
        ||(c==o && f==o && i==o)
        ||(a==o && e==o && i==o)
        ||(c==o && e==o && g==o)) win = 2;
}

function reset() {
    win = 0;
    round = 0;
    for (var i=0; i<3; i++) for (var j=1; j<4; j++) document.getElementById("box"+i+j).classList = "fab";
}

function end(){
    switch(win) {
        case 1 : {alert("முதலாம் ஆட்டக்காரர் வெற்றி பெற்று விட்டார்.\nPlayer 1 Wins."); reset();} break;
        case 2 : {alert("இரண்டாம் ஆட்டக்காரர் வெற்றி பெற்று விட்டார்.\nPlayer 2 Wins."); reset();}
    }
}
let homei = true;

function home() {
    homei =!homei;
    if (homei) {
        document.getElementById("board").style.display = "contents";
        document.getElementById("about").style.display = "none";
    } else {
        document.getElementById("board").style.display = "none";
        document.getElementById("about").style.display = "contents";
    }
}