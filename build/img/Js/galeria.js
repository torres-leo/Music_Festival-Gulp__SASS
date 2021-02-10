document.addEventListener("DOMContentLoaded", function () {
    crearGaleria();
});

function crearGaleria() {
    const galeria = document.querySelector(".galeria-imagenes");

    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement("IMG");
        imagen.src = `build/img/thumb/${i}.webp`;
        imagen.dataset.imagenId = i;

        //Añadir la funcion de mostrar imagen
        imagen.onclick = mostrarImagen;

        const lista = document.createElement("LI");
        lista.appendChild(imagen);
        galeria.appendChild(lista);
    }
}

function mostrarImagen(e) {
    // El id de las imagenes se van creando de tipo string
    // console.log(typeof e.target.dataset.imagenId);
    // Pero para poderlas ver necesitamos pasarle su numero de id
    // y es más fácil hacerlo si fuese un numero real en vez de un string
    const id = parseInt(e.target.dataset.imagenId); // Pasando el numero string de la imagen a un numero real
    //Generando la imagen
    const imagen = document.createElement("IMG");
    imagen.src = `build/img/grande/${id}.webp`;

    const overlay = document.createElement("DIV");
    overlay.appendChild(imagen);
    overlay.classList.add("overlay");

    //Cuando se da click fuera de la X, cerrar la imagen
    overlay.onclick = function () {
        overlay.remove();
    };

    //Mostrarlo en el html
    const body = document.querySelector("body");
    body.appendChild(overlay);
    body.classList.add("fijar-body"); //Para que no se pueda dar scroll al momento de abrir la imagen

    //Boton para cerrar la imagen
    const cerrarImagen = document.createElement("P");
    cerrarImagen.textContent = "X";
    cerrarImagen.classList.add("btn-cerrar");

    //Cuando se presiona, se cierra la imagen
    cerrarImagen.onclick = function () {
        overlay.remove();
    };

    overlay.appendChild(cerrarImagen);
}
