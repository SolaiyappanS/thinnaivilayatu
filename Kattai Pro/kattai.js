var round = 0;
var win = 0;
var move = true;
var m;
var fixedi, fixedj;
var interval;
interval = setInterval(end);
function select(i,j) {
    if(round<8) {
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
            || (fixedj==j && (fixedi==i+1 || fixedi==i-1))) {
                document.getElementById("box"+i+j).classList =m ;
                m="fab";
                document.getElementById("box"+fixedi+fixedj).classList =m ;
            } else {
                tempAlert('இதை தேர்ந்தெடுக்க முடியாது. வேறு எதையும் தேர்ந்தெடுக்கவும்.\nCannot select this. Select any other key.');
                round++;
            }
            fixedi=4; fixedj=4; move =true; 
            checkFilled();
        }
        else tempAlert('இதை தேர்ந்தெடுக்க முடியாது. வேறு எதையும் தேர்ந்தெடுக்கவும்.\nCannot select this. Select any other key.');
    }
}

function checkFilled(){
    var a = document.getElementById("box00").classList;
    var b = document.getElementById("box01").classList;
    var c = document.getElementById("box02").classList;
    var d = document.getElementById("box03").classList;
    var e = document.getElementById("box10").classList;
    var f = document.getElementById("box11").classList;
    var g = document.getElementById("box12").classList;
    var h = document.getElementById("box13").classList;
    var i = document.getElementById("box20").classList;
    var j = document.getElementById("box21").classList;
    var k = document.getElementById("box22").classList;
    var l = document.getElementById("box23").classList;
    var m = document.getElementById("box30").classList;
    var n = document.getElementById("box31").classList;
    var o = document.getElementById("box32").classList;
    var p = document.getElementById("box33").classList;
    var x = "fas fa-dot-circle";
    var y = "far fa-dot-circle";

    if((a==x && b==x && c==x && d==x)
        ||(e==x && f==x && g==x && h==x)
        ||(i==x && j==x && k==x && l==x)
        ||(m==x && n==x && o==x && p==x)
        ||(a==x && e==x && i==x && m==x)
        ||(b==x && f==x && j==x && n==x)
        ||(c==x && g==x && k==x && o==x)
        ||(d==x && h==x && l==x && p==x)
        ||(a==x && f==x && k==x && p==x)
        ||(d==x && g==x && j==x && m==x)) win = 1;
    if((a==y && b==y && c==y && d==y)
        ||(e==y && f==y && g==y && h==y)
        ||(i==y && j==y && k==y && l==y)
        ||(m==y && n==y && o==y && p==y)
        ||(a==y && e==y && i==y && m==y)
        ||(b==y && f==y && j==y && n==y)
        ||(c==y && g==y && k==y && o==y)
        ||(d==y && h==y && l==y && p==y)
        ||(a==y && f==y && k==y && p==y)
        ||(d==y && g==y && j==y && m==y)) win = 2;
}

function reset() {
    win = 0;
    round = 0;
    for (var i=0; i<4; i++) for (var j=0; j<4; j++) document.getElementById("box"+i+j).classList = "fab";
}

function end(){
    switch(win) {
        case 1 : {tempAlert("முதலாம் ஆட்டக்காரர் வெற்றி பெற்று விட்டார்.\nPlayer 1 Wins."); reset();} break;
        case 2 : {tempAlert("இரண்டாம் ஆட்டக்காரர் வெற்றி பெற்று விட்டார்.\nPlayer 2 Wins."); reset();}
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

function tempAlert(msg)
{
 var el = document.createElement("div");
 el.setAttribute("style","position:absolute;top:40%;left:25%;width:50vw; background-color:brown; font-size:larger; text-align: center;");
 el.innerHTML = msg;
 setTimeout(function(){
  el.parentNode.removeChild(el);
 },2500);
 document.body.appendChild(el);
}
