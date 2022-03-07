//2. ukládání všech informací kalkulačky - kam se co ukládá, jaká je to operace.. pomocí třídy
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement //proměnné této třídy
    this.currentOperandTextElement = currentOperandTextElement
    //zavolání funkce
    this.clear()
  }

  //3. definování funkcí
  clear() {
    //odstranění všeho
    this.currentOperand = '' //při zmáčknutí funkce zmizí horní a dolní zobrazení displeje a znaménko
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() { 
  //odstranění jediného čísla
  this.currentOperand = this.currentOperand.toString().slice(0, -1) //slice: odebere poslední znak z proměnné

  }

  appendNumber(number) {
    //co se má stát při použití každého z čísel a přiřazení k hornímu displeji
    //v případě, že je číslem znak . , nebo se již znak . v operaci vyskytuje, funkce nenastane
    if (number === '.' && this.currentOperand.includes('.')) return;

    //převod na text, kvůli řazení čísel za sebe
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    //+-*÷
    //pokud je displej se současným číslem prázdný, funkce nenastane
    if (this.currentOperand === '') return;

    //pokud displej s minulým číslem není prázdný řetězec, zobrazí se u minulého čísla znak operace
    if (this.previousOperand !== '') {
      this.compute()
    }

    this.operation = operation
    // současné číslo (current) se tak nestane minulým číslem (previous)
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
        //funkce spočítej
        let computation //proměnná, ve které bude náš výsledek funkce spočítej
        const prev = parseFloat(this.previousOperand) //číslo z předchozí operace - konverze z textu na číslo
        const current = parseFloat(this.currentOperand)

        //pokud předchozí číslo nebo (||) současné číslo není číslo, funkce "spočítej" se ukončí
        if (isNaN(prev) || isNaN(current)) return

        //switch pro výběr matematických operací
        switch (this.operation) {
        case '+':
            computation = prev + current
            break
        case '-':
            computation = prev - current
            break
        case '*':
            computation = prev * current
            break
        case '÷':
            computation = prev / current
            break
        default:          //výchozí hodnota: pokud se nevybere žádná z uvedených, nic se nestane
            return
        }

        //výpočetní operace
        this.currentOperand = computation //současný displej = výpočet naší matematické operace
        this.operation = undefined   //znaménko zmizí
        this.previousOperand = ''   //předchozí číslo zmizí
    }

   //funkce pro zobrazení dělících čárek mezi číslicemi (komplikovanější věc)
   getDisplayNumber(number) {
       //rozdělení čísel na desetinná a nedesetinná
       const stringNumber = number.toString()
       const integerDigits = parseFloat(stringNumber.split('.') [0])
       const decimalDigits = stringNumber.split('.') [1] //v poli je číslo po desetinném umístění

       let integerDisplay
       //v případě, že někdo nezadá nic na displej, nebo jen nedesetinné číslo
       if (isNaN(integerDigits)) {
           integerDisplay = ''      //nezobrazí se nic, žádná čárka
       } else {                      //při konverzi nebude přítomná žádná čárka
           integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0 })
       }
       //v případě desetinných čísel
       if (decimalDigits !=null) {
         return `${integerDisplay}.${decimalDigits}`    //vyskytne se tečka
       } else {
           return integerDisplay    //nebo ne, pokud číslo tečku nepotřebuje
       }

       //smazáno po aktualizaci viz výše
       //const floatNumber = parseFloat(number)   //konvertování z řetězce na číslo
       //if (isNaN(floatNumber)) return '' //pokud číslo není číslo, vrátí prázdný řetězec
       //vrací číslo jako řetězec s dělícími čárkami
       //return floatNumber.toLocaleString('en')
    }

  updateDisplay() {
    //aktualizace hodnot na displeji
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand) //dovolí nám zobrazovat zadaný text
    //úprava zobrazování
    if ( this.operation != null) {  //pokud předchozí operace nemá prázdný výsledek
                                                        //zřetězení obou hodnot displeje
        this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
        this.previousOperandTextElement.innerText = ''
    }
  }
}

//1. proměnné - tlačítka a displej

//všechny elementy s daným atributem (data-number)
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]"); //vybere jediný selektor
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
); //není tlačítko, ale textový element
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

//4. vytvoření objektu kalkulačky
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

//vybrání číselných tlačítek
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    //co se stane při kliknutí:
    calculator.appendNumber(button.innerText); //při kliknutí se "připne" číslo uvnitř elementu
    calculator.updateDisplay(); //poté se aktualizují hodnoty na displeji
  });
});

//vybrání tlačítek matematických operací
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText); //při kliknutí se zvolí operace
    calculator.updateDisplay();
  });
});

//rovná se
equalsButton.addEventListener("click", (button) => {
  calculator.compute(); //při kliknutí zavolá funkci spočítej
  calculator.updateDisplay();
});

//AC - vymazání celého displeje
allClearButton.addEventListener("click", (button) => {
    calculator.clear(); //při kliknutí vymaže veškerý obsah
    calculator.updateDisplay();
});

//delete - vymazání jednoho čísla
deleteButton.addEventListener("click", (button) => {
    calculator.delete(); //při kliknutí vymaže jedno číslo
    calculator.updateDisplay();
});
