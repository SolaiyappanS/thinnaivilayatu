var homei = true;
var kuli = new Array(14);
var begin = false;
var canPress = false;
var p1Amount = 35;
var p2Amount = 35;
var p1turn = true;
var roundCount = 0;
var p1blocks = 0;
var p2blocks = 0;
var previousv = 0;
var currentv = 0;
var interval;
interval = setInterval(update);
setAll(0);

function update() {
    var i = 0;
    for(i=0 ; i<14 ; i++) {
        document.getElementById( "kuli"+(i+1)).innerHTML = kuli[i];
        }
        document.getElementById( "kuli15").innerHTML = p1Amount;
        document.getElementById( "kuli16").innerHTML = p2Amount;
    }

function setAll(v) {
    for (i = 0; i < 14; i++) {
        kuli[i] = v;
    }
}

function updateVal() {
    var np1blocks=0, np2blocks=0;
    for (i=0 ; i<(7-p1blocks) ; i++) {
        if(p1Amount >= 5) {
            kuli[i] = 5;
            p1Amount-=5;
            document.getElementById("kuli"+(i+1)).classList = "kuli1";
        } else {
            np1blocks++;
            document.getElementById("kuli"+(i+1)).classList = "blocks";
        }
    }
    for (i=7 ; i<(14-p2blocks) ; i++) {
        if(p2Amount >= 5) {
            kuli[i] = 5;
            p2Amount-=5;
            document.getElementById("kuli"+(i+1)).classList = "kuli2";
        } else {
            np2blocks++;
            document.getElementById("kuli"+(i+1)).classList = "blocks";
        }
    }
    p1blocks=np1blocks;
    p2blocks=np2blocks;
}

function start() {
    if(!begin){
        if(p1Amount>=5 && p2Amount>=5) {
            p1blocks = 0;
            p2blocks = 0;
            updateVal();
            begin = true;
            if(roundCount%2==0) p1turn = true;
            else p1turn = false;
            canPress = true;
            document.getElementById("playbutton").classList = "fas fa-info-circle";
            if(p1turn) tempAlert("இது முதலாம் ஆட்டக்காரரின் முறை. பூஜ்ஜியமற்ற குழியைத் தேர்ந்தெடுக்கவும்.\nIt's player 1's turn. Select any one non zero hole.");
            else tempAlert("இது இரண்டாம் ஆட்டக்காரரின் முறை. பூஜ்ஜியமற்ற குழியைத் தேர்ந்தெடுக்கவும்.\nIt's player 2's turn. Select any one non zero hole.");
        } else {gameOver();}
    }
    else if(!canPress) nextTurn();
    else { isEmpty(); if(begin) playerturn();}
}

function gameOver() {
    if(p1Amount>p2Amount) tempAlert("ஆட்டம் முடிந்தது. முதலாம் ஆட்டக்காரர் வெற்றி பெற்றுவிட்டார். Game Over. Player 1 Wins.");
        else tempAlert("ஆட்டம் முடிந்தது. இரண்டாம் ஆட்டக்காரர் வெற்றி பெற்றுவிட்டார். Game Over. Player 2 Wins.");  reset();
}

function reset() {
    p1Amount = 35;
    p2Amount = 35;
    p1blocks = 0;
    p2blocks = 0;
    roundCount = 0;
}

function playerturn(){
    if(p1turn) tempAlert("இது முதலாம் ஆட்டக்காரரின் முறை. பூஜ்ஜியமற்ற குழியைத் தேர்ந்தெடுக்கவும்.\nIt's player 1's turn. Select any one non zero hole.");
    else tempAlert("இது இரண்டாம் ஆட்டக்காரரின் முறை. பூஜ்ஜியமற்ற குழியைத் தேர்ந்தெடுக்கவும்.\nIt's player 2's turn. Select any one non zero hole.");
}

function excecute(v){
    previousv = v;
    var amount = kuli[v];
    var v1;
    var x = 0;
    kuli[v]=0;
    for( var i=0, j=0; i<(amount) ;j++, i++) { //Continuing excecution
            if(document.getElementById("kuli"+(((v+j)%14)+2)).classList == "blocks") {x++; i--;}
            else {
                v1 = v+i+x+1;
                v1%=14;
                kuli[v1]+=1;
        }
    }
    v = v + amount +x+ 1;
    v %= 14;
    currentv = v;
    if(document.getElementById("kuli"+(currentv+1)).classList == "blocks"){
        if(currentv<7) currentv = 7;
        else currentv = 0;
    }
    var i;
    for(i=0 ; i<(7-p1blocks) ; i++){
        if(i==previousv)
            document.getElementById("kuli"+(i+1)).classList = "previousv";
            else if(i>previousv && i<currentv && previousv < currentv)
                document.getElementById("kuli"+(i+1)).classList = "kuli3";
                else if(i>previousv && i != currentv && previousv > currentv)
                    document.getElementById("kuli"+(i+1)).classList = "kuli3";
                    else if(i<currentv && previousv > currentv)
                        document.getElementById("kuli"+(i+1)).classList = "kuli3";
                        else if(i==currentv)
                                document.getElementById("kuli"+(i+1)).classList = "currentv";
                            else document.getElementById("kuli"+(i+1)).classList = "kuli1";
    }
    for(i=7 ; i<(14-p2blocks) ; i++){
        if(i==previousv)
            document.getElementById("kuli"+(i+1)).classList = "previousv";
            else if(i>previousv && i<currentv && previousv < currentv)
                document.getElementById("kuli"+(i+1)).classList = "kuli3";
                else if(i>previousv && i != currentv && previousv > currentv)
                    document.getElementById("kuli"+(i+1)).classList = "kuli3";
                    else if(i<currentv && previousv > currentv)
                        document.getElementById("kuli"+(i+1)).classList = "kuli3";
                        else if(i==currentv)
                                document.getElementById("kuli"+(i+1)).classList = "currentv";
                            else document.getElementById("kuli"+(i+1)).classList = "kuli2";
    }
}

function empty(v){
    var v1= v+1;
    v1%=(14);
    if(p1turn) {p1Amount += kuli[v1]; if(kuli[v1]!=0) tempAlert("முதலாம் ஆட்டக்காரர், "+ kuli[v1] +" புள்ளிகளைப் பெறுகிறார்.\nPlayer 1 earns "+ kuli[v1] +" points.");
    else tempAlert("முதலாம் ஆட்டக்காரர் இம்முறை எந்த புள்ளிகளையும் பெறவில்லை.\nPlayer 1 earns no points in this turn.");
    tempAlert("இது இரண்டாம் ஆட்டக்காரரின் முறை. பூஜ்ஜியமற்ற குழியைத் தேர்ந்தெடுக்கவும்.\nIt's player 2's turn. Select any one non zero hole.");}
    else {p2Amount += kuli[v1]; if(kuli[v1]!=0) tempAlert("இரண்டாம் ஆட்டக்காரர், "+ kuli[v1] +" புள்ளிகளைப் பெறுகிறார்.\nPlayer 2 earns "+ kuli[v1] +" points.");
    else tempAlert("இரண்டாம் ஆட்டக்காரர் இம்முறை எந்த புள்ளிகளையும் பெறவில்லை.\nPlayer 2 earns no points in this turn.");
    tempAlert("இது முதலாம் ஆட்டக்காரரின் முறை. பூஜ்ஜியமற்ற குழியைத் தேர்ந்தெடுக்கவும்.\nIt's player 1's turn. Select any one non zero hole.");}
    kuli[v1] = 0;
    p1turn = !p1turn;
    canPress = true;
    for(i=0 ; i<(7-p1blocks) ; i++)
        document.getElementById("kuli"+(i+1)).classList = "kuli1";
    for(i=7 ; i<(14-p2blocks) ; i++)
        document.getElementById("kuli"+(i+1)).classList = "kuli2";
    document.getElementById("playbutton").classList = "fas fa-info-circle";
}

function nextTurn(){
    pasu();
    isEmpty();
    if(begin){
    if (kuli[currentv] != 0) excecute(currentv);
    else empty(currentv);
}
}

function tempAlert(msg)
{
 var el = document.createElement("div");
 el.setAttribute("style","position:absolute;top:40%;left:25%;width:50vw; background-color:brown; font-size:larger;");
 el.innerHTML = msg;
 setTimeout(function(){
  el.parentNode.removeChild(el);
 },2500);
 document.body.appendChild(el);
}

function pasu(){
    var i = 0;
    for(i=0 ; i<14 ; i++) { //Checking for Pasu
        if(kuli[i]==4){
            if(i<7) {p1Amount += 4; tempAlert("முதலாம் ஆட்டக்காரர் ஒரு பசுவைப் பெறுகிறார்.\nPlayer 1 earns a Pasu.");}
            else {p2Amount += 4; tempAlert("இரண்டாம் ஆட்டக்காரர் ஒரு பசுவைப் பெறுகிறார்.\nPlayer 2 earns a Pasu.");}
            kuli[i]=0;
        }
    }
}

function select(v) {
    if(canPress){
        if((p1turn && v<7) || (!p1turn && v>=7 && v<14)){
            if(kuli[v] != 0){
                document.getElementById("playbutton").classList = "fas fa-angle-double-right";
                canPress = false;
                previousv = currentv;
                excecute(v);
            }
            else if(document.getElementById("kuli"+(v+1)).classList == "blocks") tempAlert("தடுக்கப்பட்ட குழியை தேர்வு செய்ய இயலாது. வேறு ஏதேனும் குழியை தேர்வு செய்யவும்.\nCan't select a blocked hole. Select any other hole.");
            else tempAlert("பூஜ்யம் உள்ள குழியை தேர்வு செய்ய இயலாது. வேறு ஏதேனும் குழியை தேர்வு செய்யவும்.\nCan't select zero. Select any other hole.");
        }
        else if(p1turn) tempAlert("இது முதலாம் ஆட்டக்காரரின் முறை.\nIt's Player 1's turn.");
        else tempAlert("இது இரண்டாம் ஆட்டக்காரரின் முறை.\nIt's Player 2's turn.")
    }
}

function isEmpty(){
    if(kuli[0]==0 && kuli[1]==0 && kuli[2]==0 && kuli[3]==0 && kuli[4]==0 && kuli[5]==0 && kuli[6]==0) addAll();
   else if(kuli[7]==0 && kuli[8]==0 && kuli[9]==0 && kuli[10]==0 && kuli[11]==0 && kuli[12]==0 && kuli[13]==0) addAll();
}
function addAll(){
    for(i=0 ; i<7 ; i++){ // adding elements in first row
        p1Amount += kuli[i];
        kuli[i]=0;
    }

    for(i=7 ; i<14 ; i++){ // adding elements in second row
        p2Amount += kuli[i];
        kuli[i]=0;        
    }
    begin = false;
    document.getElementById("playbutton").classList = "fas fa-play";
    roundCount++;
    var x = true;
    if(roundCount%2==0)
    x = confirm("சுற்று "+roundCount+" முடிந்தது. சுற்று "+ (roundCount+1)+"க்கு OK பட்டனை அழுத்தவும். ஆட்டத்தை முடிக்க Cancel பட்டனை அழுத்தவும்.\nThe round "+roundCount+" is completed. Press OK button to play the round "+ (roundCount+1)+". To End the game press Cancel");
    if(x) alert("சுற்று "+roundCount+" முடிந்தது. சுற்று "+ (roundCount+1)+"க்கு OK பட்டனை அழுத்தவும்.\nThe round "+roundCount+" is completed. Press OK button to play the round "+ (roundCount+1)+".");
    else gameOver();
    for(i=0 ; i<14 ; i++) {
        if(i<7) document.getElementById("kuli"+(i+1)).classList="kuli1";
        else document.getElementById("kuli"+(i+1)).classList="kuli2";
    }
}

function game(){
    if(!homei){
        document.getElementById("board").style.display = "block";
        document.getElementById("playbutton").style.display = "block";
        document.getElementById("about").style.display = "none";
    }
    else {
        document.getElementById("board").style.display = "none";
        document.getElementById("playbutton").style.display = "none";
        document.getElementById("about").style.display = "contents";
    }
    homei=!homei;
}

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        start();
    }
}