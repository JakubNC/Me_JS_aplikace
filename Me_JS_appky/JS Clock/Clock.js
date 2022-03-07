setInterval(setClock, 1000) /*každých 1000ms chceme zavolat funkci setClock */

const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')


function setClock() {
    const currentDate = new Date()  /*poskytne nám aktuální čas */
    const secondsRatio = currentDate.getSeconds() / 60  /*odtud budeme brát sekundy, 60 sekund - kvůli rotaci */
    const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12

    setRotation(secondHand, secondsRatio)   /*volání funkcí */
    setRotation(minuteHand, minutesRatio)
    setRotation(hourHand,hoursRatio)
}

function setRotation(element, rotationRatio) {      /*vytvoření funkce pro rotaci */
    element.style.setProperty('--rotation', rotationRatio * 360) /*rotace o 360 stupňů */
}

setClock() /*okamžitě nastaví hodiny na aktuální čas - jinak má program asi 1s prodlevu */