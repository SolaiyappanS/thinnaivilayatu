
let homei = true;

function home() {
    homei =!homei;
    if (homei) {
        document.getElementById("home").style.display = "contents";
        document.getElementById("about").style.display = "none";
    } else {
        document.getElementById("home").style.display = "none";
        document.getElementById("about").style.display = "contents";
    }
}