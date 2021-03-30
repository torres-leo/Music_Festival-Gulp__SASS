//

// const { series, parallel } = require("gulp");

// function hola(done) {
//     console.log("Hola mundo en Gulp");
//     done();
// }

// function adios(done) {
//     console.log("Ejecutando dos tareas o más");
//     done();
// }

// //require para importar
// //exports para exportar

// exports.hola = hola;
// //exports.(cualquier nombre para llamarlo en la terminal) = nombre de la funcion
// //ejemplo
// //exports.funcionHola = hola; ==> "Hola mundo en Gulp"

// //Mandar a llamar más de una funcion con sass
// exports.imprimir = series(hola, adios);
// //Estamos llamando todas estas funciones por medio de series, la cual está irá mostrandolas una por una en el orden que las pongamos en el exports

// //parallel va a ejecutar todas las tareas que se encuentren definidas al mismo tiempo
// exports.imprimir2 = parallel(hola, adios);

//----------------------------------------------------------------------------------------------------------

//funcion que compila sass
const { series, src, dest, watch, parallel } = require("gulp");
//"src" es para decirle dónde encontrará los archivos de sass
//"dest" servirá para decirle la nueva ruta donde se guardará nuestro archivo a compilar
//"watch" sirve para que cualquier cambio que hagamos se ejecute al instante
// const sass = require("gulp-sass"); //importando sass
const sass = require("gulp-dart-sass"); //importando la version sass que logré instalar
const imagemin = require("gulp-imagemin");
const notify = require("gulp-notify");
const webp = require("gulp-webp");
const concat = require("gulp-concat");

//Utilidades CSS
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const sourcemaps = require("gulp-sourcemaps");

//Utilidades Js
const terser = require("gulp-terser-js"); //Esto va a minificar el archivo de js
const rename = require("gulp-rename");

const enlaces = {
    imagenes: "src/img/**/*", //Entrando a las carpetas
    scss: "src/img/scss/**/*.scss",
    js: "src/img/Js/**/*.js",
    //A js le añadimos la ruta de img, porque la carpeta de src solamente contiene la carpeta de img,
    // por lo tanto el sistema entra directamente a esa carpeta
};

function css() {
    return src(enlaces.scss) //Diciendole que compile este archivo
        .pipe(sourcemaps.init())
        .pipe(sass()) //Leyendo el archivo
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write(".")) //Esto es para mantener la referencia de que archivo de sass, tenemos que dirigirnos en caso que se necesite un cambio
        .pipe(dest("./build/css")); //Guardando en una nueva direccion asignada
}

//Se elimina esta parte porque podemos minificar el codigo a través de sourcemaps
// function minificarCss() {
//     return src(enlaces.scss)
//         .pipe(
//             //Leyendo el archivo
//             sass({
//                 outputStyle: "compressed", //Diciendole que comprima el archivo css, dejando su sintaxis junta
//                 // outputStyle: "expanded", //"expanded", lo dejará de la manera en que hacemos el formato en css
//             })
//         )
//         .pipe(dest("./build/css")); //Guardando en una nueva direccion asignada
// }

function javascript() {
    return src(enlaces.js) // Entrando a todas las carpetas
        .pipe(sourcemaps.init())
        .pipe(concat("bundle.js"))
        .pipe(terser()) //Minificando los archivos js
        .pipe(sourcemaps.write("."))
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest("./build/js"));
}

function imagenes() {
    return src(enlaces.imagenes) //Entrando a todas las carpetas
        .pipe(imagemin())
        .pipe(dest("./build/img"))
        .pipe(notify({ message: "Imagen minificada" }));
}

function versionWebp() {
    return src(enlaces.imagenes) //Entrando a todas las carpetas
        .pipe(webp())
        .pipe(dest("./build/img"))
        .pipe(notify({ message: "Versión web lista" }));
}

function watchArchivo() {
    watch(enlaces.scss, css); // './' = Carpeta actual
    // **/* = Todos los archivos con esa extension que estén en todas las carpetas
    watch(enlaces.js, javascript);
}

// exports.css = css;
// exports.minificarCss = minificarCss;
// exports.watchArchivo = watchArchivo;
// exports.imagenes = imagenes;

exports.default = series(css, javascript, imagenes, versionWebp, watchArchivo);
