//definování proměnných
const multiStepForm = document.querySelector("[data-multi-step]")
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")] //jedná se o pole


//současný krok (část formuláře). formSteps - kroky formuláře jsou seřazeny automaticky podle pořadí v HTML  dokumentu
let currentStep = formSteps.findIndex(step => {
    return step.classList.contains("active")
})
if (currentStep < 0) {
    currentStep = 0
    showCurrentStep()
}


//přechod mezi jednotlivými kroky formuláře:
//multi-step tlačítka (další, předchozí)
multiStepForm.addEventListener("click", e => {
    let incrementor
    //v případě, že dojde ke kliknutí na tlačítko s data-next
    if (e.target.matches("[data-next]")) {
        //posune se currentStep o 1
        incrementor = 1

    } else if (e.target.matches("[data-previous]")) {
        incrementor = -1
    }

    if (incrementor == null) return //pokud se neklikne na další nebo předchozí, nic se nestane
    
    
    //kontrola, zda jsou vstupy do formuláře validní a lze jít na další krok
    const inputs = [...formSteps[currentStep].querySelectorAll("input")]
    //kontrola všech inputů, zda jsou validní (zda jsou vyplněné) - reportValidity: podá zprávu - upozornění na nutnost vyplnění údajů
    const allValid = inputs.every(input => input.reportValidity())
    if (allValid) {
        //změní se můj současný krok (překliknutí) pouze tehdy, je-li všechno validní
        currentStep += incrementor 
        showCurrentStep() //zavolání funkce
    }

})

//transition a animation pro naše form Steps
formSteps.forEach(step => {
                        //animationend se spustí poté, co se dokončí CSS animace
    step.addEventListener("animationend", e => {
        //odstraní třídu "hide" pouze tehdy, když skončí animace
        formSteps[currentStep].classList.remove("hide")
        //když nemáme aktivní třídu, přidej třídu "skrýt" na konci transition (přechodu) naší animace
        e.target.classList.toggle("hide", !e.target.classList.contains("active"))
    })   
})

//funkce pro ukázání současného kroku
function showCurrentStep() {
  formSteps.forEach((step, index) => {
      //přepne na krok mající třídu "active" a dá ho současné třídě, na kterou je odkázáno
    step.classList.toggle("active", index === currentStep)
  })
}

