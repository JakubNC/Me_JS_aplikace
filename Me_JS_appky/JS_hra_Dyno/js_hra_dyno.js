//vytvoření proměnných pro získání přístupu k charakteru a bloku
var character = document.getElementById("character");
var block = document.getElementById("block");

//vytvoření funkce pro výskok
function jump() {
    //podmínka nám zaručí, že budeme moci zmáčknout vyskočení/vyskočit jen jednou
    if (character.classList != "animate") {
        character.classList.add("animate");
    }

    //připojení třídy .animate, která obsahuje animaci výskoku
    character.classList.add("animate"); 
    //vyjmutí třídy po dokončení animace, aby se mohla animace na onlick opakovat
    setTimeout(function(){
        character.classList.remove("animate");

    }, 500) //vyjmutí po 500ms -> po trvání animace
}

//vytvoření detekce nárazu
 var checkDead = setInterval(function() {
    //na začátku bude charakter v horním levém rohu..
    var characterTop = 
    parseInt(window.getComputedStyle(character).getPropertyValue("top")); //parseInt - protože chceme pouze číslo px
    
    //..a blok v pravém dolním rohu
    var blockLeft =
    parseInt(window.getComputedStyle(block).getPropertyValue("left"));

    //podmínka nárazu
    /*pokud má blockLeft méně než 20 a více než 0 (hodnota 0 až 20 bude pod charakterem),
     a pokud jsme neskočili přes celý blok (skočili jsme méně než 20px), prohráli jsme*/
    if(blockLeft<20 && blockLeft > 0 && characterTop >=130) {
        block.style.animation = "none"; //zastaví animaci
        block.style.display = "none";
        alert("Prohrál jsi!")
    }
 }, 10);