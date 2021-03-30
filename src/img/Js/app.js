document.addEventListener("DOMContentLoaded", function () {
    scrollNav();
    navegacionFija();
});

//Creando funcion para dejar fija la navegacion cuando se da scroll
function navegacionFija() {
    const barra = document.querySelector(".header");
    //Registrar la interseccion a observar
    const observer = new IntersectionObserver(function (entries) {
        console.log(entries[0]);
        if (entries[0].isIntersecting) {
            barra.classList.remove("fijo");
        } else {
            barra.classList.add("fijo");
        }
    });
    //Elemento a observar
    observer.observe(document.querySelector(".sobre-festival"));
}

function scrollNav() {
    const enlaces = document.querySelectorAll(".navegacion-principal a");
    console.log(enlaces);

    enlaces.forEach(function (enlace) {
        enlace.addEventListener("click", function (e) {
            e.preventDefault();
            const seccion = document.querySelector(e.target.attributes.href.value);
            seccion.scrollIntoView({
                behavior: "smooth",
            });
        });
    });
}
