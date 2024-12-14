// Clase padre Animal
// Contiene las propiedades y métodos comunes para todos los animales.
export class Animal {
    // El constructor recibe los parámetros que representan los atributos del animal: nombre, edad, imagen, comentarios, y sonido.
    constructor(nombre, edad, imagen, comentarios, sonido) {
        console.log(`Creando un nuevo animal: ${nombre}`);
        this.nombre = nombre;          
        this.edad = edad;              
        this.img = imagen;             
        this.comentarios = comentarios;
        this.sonido = sonido;          
    }

    /* Métodos: */
    // ...obtener el nombre del animal
    getNombre() {
        console.log(`Obteniendo el nombre del animal: ${this.nombre}`);
        return this.nombre;
    }

    // ...obtener la edad del animal
    getEdad() {
        console.log(`Obteniendo la edad del animal: ${this.edad}`);
        return this.edad;
    }

    // ...obtener la imagen del animal
    getImg() {
        console.log(`Obteniendo la imagen del animal: ${this.img}`);
        return this.img;
    }

    // ...obtener los comentarios sobre el animal
    getComentarios() {
        console.log(`Obteniendo los comentarios sobre el animal: ${this.comentarios}`);
        return this.comentarios;
    }

    // ...obtener el sonido del animal
    getSonido() {
        console.log(`Obteniendo el sonido del animal: ${this.sonido}`);
        return this.sonido;
    }
}

/* Clases heredadas para cada tipo de animal:
Cada una de estas clases hereda de la clase Animal, pero no añaden métodos adicionales, ya que los métodos específicos (como rugir, aullar, etc.) no se utilizan en el código donde se importan. 
Solo heredamos las propiedades y los métodos comunes. */

export class Leon extends Animal {}
export class Lobo extends Animal {}
export class Oso extends Animal {}
export class Serpiente extends Animal {}
export class Aguila extends Animal {}
