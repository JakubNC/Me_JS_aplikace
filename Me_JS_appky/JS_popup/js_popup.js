//zápis je dělaný tak, jako bychom měli více modalů na stránce
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')   //křížek
const overlay = document.getElementById('overlay')

//spouštěče eventů - všechny se spouští po kliknutí
openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        /*dataset nám umožní přístup ke všem atributům jako k JS objektům 
          - zde přístup k našemu "#modal" - data-modal-target*/
        const modal = document.querySelector(button.dataset.modalTarget) 
        openModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        /*Modal zde nebude založený na querySelectoru a data-atributu jako výše,
          ale na nejbližším rodičovském elementu - zde .modal*/
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

//vypnutí modalu po kliknutí do overlaye
    overlay.addEventListener('click', () => {
        const modals = document.querySelectorAll('.modal.active')
        modals.forEach(modal => {
            closeModal(modal)
        })
    })

//vytvoření funkcí open + close
function openModal(modal) {
    if (modal == null) return   //pokud nemáme kliknuto na modal, nic se nestane
    modal.classList.add('active')   //pokud máme kliknuto, přidá se třída active
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return   //pokud nemáme kliknuto na modal, nic se nestane
    modal.classList.remove('active')   //pokud máme kliknuto, přidá se třída active
    overlay.classList.remove('active')
}