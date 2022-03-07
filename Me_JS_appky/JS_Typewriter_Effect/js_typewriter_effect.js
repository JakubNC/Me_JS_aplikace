var messageArray = ["Typewriter Effect"]
var textPosition = 0;
var speed = 100; //jak rychlý bude efekt v ms

//vytvoření funkce
typewriter = () => {
    //bude se odehrávat v elementu s id=message
    document.querySelector("#message").
    //v HTML se objeví obsah proměnné - pole messageArray
    innerHTML = messageArray[0]
    //procházení efektu písmeny
    .substring(0, textPosition)
    //vložení animace blinker
    + "<span>\u25ae</span>";  //\u25ae = černý vertikální obdélnník

    //funkce se bude inkrementovat, dokud nebude dokončena
    if(textPosition++ != messageArray[0].length)
    //a bude se sama volat
    setTimeout(typewriter, speed);
}

//zavolání funkce
window.addEventListener("load", typewriter);
