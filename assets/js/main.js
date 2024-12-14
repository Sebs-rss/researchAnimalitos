import { Leon, Lobo, Oso, Serpiente, Aguila } from "./animal.js"; // Importa las clases de animales desde el constructor

let animalesRegistrados = []; // Declara un array para guardar los animales registrados

/* Formulario de Registro de animales
Función autoejecutable (IIFE) para encapsular a listeners, que son funciones que se ejecutan al cargar el documento
 */

(function () {
    document.getElementById("animal").addEventListener("change", async function (event) { // Añade un listener al select con id "animal" desde index.html, éste reacciona cuando el valor cambia
        /* Aquí se obtienen los datos seleccionados del formulario */
        const nombre = event.target.value;  
        const imagen = await obtenerImagen(nombre); // Llama a la función obtenerImagen de forma asíncrona para obtener la imagen del animal seleccionado
        document.getElementById("preview").style.backgroundImage = `url(./assets/imgs/${imagen})`; // Cambia la imagen de fondo del elemento con id "preview" para mostrar la imagen del animal
    });

        // Añade un listener al botón con id "btnRegistrar" que se ejecuta al hacer click
        document.getElementById("btnRegistrar").addEventListener("click", async function (event) {
            event.preventDefault(); // Previene la acción por defecto del formulario para que no recargue la página y poder ver los animales registrados
    
        // Obtiene los valores del formulario
        const nombre = document.getElementById("animal").value;
        const edad = document.getElementById("edad").value;
        const comentarios = document.getElementById("comentarios").value;

        // Valida los datos obligatorios, si no están todos completos muestra una alerta
        if (!nombre || !edad || !comentarios) { 
            alert("Todos los campos son requeridos para registrar.");
            return;
        }

        /* TABLA de animales participantes del estudio 🐾:
        Llama a las funciones obtenerImagen y obtenerSonido de forma asíncrona */
        const imagen = await obtenerImagen(nombre);
        const sonido = await obtenerSonido(nombre);

        // Al seleccionar un animal en el formulario, crea una instancia de éste según su clase específica
        console.log(`Se seleccionó el animal: ${nombre}`);
        let animal;
        switch (nombre) { //Se usa switch para validar las propiedades del animal que se seleccionó
            case "Leon":
                console.log("Creando instancia de la clase Leon");
                animal = new Leon(nombre, edad, imagen, comentarios, sonido);
                break;
            case "Lobo":
                console.log("Creando instancia de la clase Lobo");
                animal = new Lobo(nombre, edad, imagen, comentarios, sonido);
                break;
            case "Oso":
                console.log("Creando instancia de la clase Oso");
                animal = new Oso(nombre, edad, imagen, comentarios, sonido);
                break;
            case "Serpiente":
                console.log("Creando instancia de la clase Serpiente");
                animal = new Serpiente(nombre, edad, imagen, comentarios, sonido);
                break;
            case "Aguila":
                console.log("Creando instancia de la clase Aguila");
                animal = new Aguila(nombre, edad, imagen, comentarios, sonido);
                break;
            default:
                console.error(`Animal no válido: ${nombre}`);
                alert("Animal no válido");
        }

        // Agrega el animal a la tabla y resetea los campos del formulario
        agregarAnimalATabla(animal);
        resetFormulario();
    });
})(); // La función autoejecutable (IIFE) se invoca

/* FUNCIONES e interacción con la API (archivo JSON) y luego con el HTML:
Función asíncrona para obtener la IMAGEN del animal desde el archivo JSON */
async function obtenerImagen(animal) {
    console.log(`Obteniendo la imagen del animal: ${animal}`);
    try {
        const respuesta = await fetch(`animales.json`);
        console.log("Solicitud realizada, esperando respuesta...");

        const datos = await respuesta.json();
        console.log("Datos obtenidos, buscando animal...");

        const animalEncontrado = datos.animales.find((item) => item.name === animal); // "Find" busca el animal seleccionado en los datos, el primer dato que coincida 
        console.log(`Animal encontrado: ${animalEncontrado.name}`);

        return animalEncontrado.imagen;
        console.log(`Imagen del animal: ${animalEncontrado.imagen}`);
    } catch (error) {
        console.error("Error al obtener la imagen:", error);
    }
}

// Función asíncrona para obtener el SONIDO del animal desde el archivo JSON
async function obtenerSonido(animal) {
    console.log(`Obteniendo el sonido del animal: ${animal}`);
    try {
        const respuesta = await fetch(`animales.json`);
        console.log("Solicitud realizada, esperando respuesta...");

        const datos = await respuesta.json();
        console.log("Datos obtenidos, buscando animal...");

        const animalEncontrado = datos.animales.find((item) => item.name === animal);
        console.log(`Animal encontrado: ${animalEncontrado.name}`);

        const sonido = animalEncontrado.sonido;
        console.log(`Sonido del animal: ${sonido}`);

        return sonido;
    } catch (error) {
        console.error("Error al obtener el sonido:", error);
    }
}

// Función que AGREGA EL ANIMAL A LA TABLA de registros en el DOM
function agregarAnimalATabla(animal) {
    const animalesDiv = document.getElementById("Animales");
    // Selecciona el contenedor donde se mostrarán los animales registrados

    const card = document.createElement("div");
    // Crea un div para cada animal

    card.classList.add("card", "participante", "m-2");
    // Añade clases de Bootstrap para el estilo de la tarjeta

    card.style.width = "30%";
    // Define el ancho de la tarjeta

    // Define el contenido HTML de la tarjeta con la imagen y el botón de sonido
    card.innerHTML = `
        <img src="./assets/imgs/${animal.getImg()}" class="card-img-top img-fluid" alt="${animal.getNombre()}" style="height: 300px; width: 240px; object-fit: cover;">
        <div class="card-body">
        <button class="btn btn-reproducir"><img src="./assets/imgs/audio.svg" style="width: 25px; height: 25px;"></button>
        </div>
    `;

    // Añade un listener al botón de sonido para reproducir el sonido del animal
    const btnReproducir = card.querySelector(".btn-reproducir");
    btnReproducir.addEventListener("click", () => reproducirSonido(animal.getSonido()));

    // Añade un listener para mostrar el modal con los detalles del animal cuando se hace clic en la tarjeta
    card.addEventListener("click", () => mostrarModal(animal));

    animalesDiv.appendChild(card);
    // Añade la tarjeta al contenedor "Animales". AppendChild() agrega el elemento como el último en el DOM

    animalesRegistrados.push(animal);
    // Agrega el animal al array de animales registrados. Push() agrega un elemento al final del arreglo
}

// Función para REPRODUCIR el SONIDO del animal
function reproducirSonido(sonido) {
    console.log("Reproduciendo sonido:", sonido);
    // Imprime en la consola el sonido que se va a reproducir para verificar que funciona

    new Audio(`./assets/sounds/${sonido}`).play();
    // Reproduce el archivo de sonido del animal
}

// Función para MOSTRAR el MODAL con los detalles del animal registrado
function mostrarModal(animal) {
    const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
    // Inicializa el modal de Bootstrap

    const modalBody = document.querySelector("#exampleModal .modal-body");
    // Selecciona el cuerpo del modal donde se mostrarán los detalles del animal. Se usa querySelector() para seleccionar el elemento que contenga el modal

    // Define el contenido HTML del modal con la imagen y los detalles del animal
    modalBody.innerHTML = `
    <img src="./assets/imgs/${animal.getImg()}" class="img-fluid" style="height: 300px; width: 240px; object-fit: cover; align-self-center;" alt="${animal.getNombre()}">
        <p><strong>Edad:</strong> ${animal.getEdad()}</p>
        <p><strong>Comentarios:</strong><br> ${animal.getComentarios()}</p>
    `;

    modal.show();
    // Muestra el modal en pantalla
}

// Función que LIMPIAR EL FORMULARIO después de registrar un animal
function resetFormulario() {
    // Restablecer el campo de nombre
    const animalSelect = document.getElementById('animal');
    animalSelect.selectedIndex = 0; // Seleccionar la opción por defecto

    // Restablecer el campo de edad
    const edadSelect = document.getElementById('edad');
    edadSelect.selectedIndex = 0; // Seleccionar la opción por defecto

    // Limpiar el campo de comentarios
    document.getElementById('comentarios').value = '';

    // Restaurar la imagen de preview al ícono de un león por defecto
    const preview = document.getElementById('preview');
    preview.style.backgroundImage = "url('./assets/imgs/lion.svg')";
}
