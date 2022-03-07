const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    //proměnná hamburger manipuluje se třídou (=classList) - přepne (=toggle)/aktivuje třídu active
    hamburger.classList.toggle("active");
    //to samé udělá se třídou nav-menu
    navMenu.classList.toggle("active");
})

//zavření menu po kliknutí na odkaz v navbaru
document.querySelectorAll(".nav-link").forEach(n => n. 
    addEventListener("click", () => {
        //na event kliknutí odebere třídu active - tím zmizí menu
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }))