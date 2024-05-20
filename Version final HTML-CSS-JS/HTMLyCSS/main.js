// Funciones para almacenar y traer los datos (por si BD no funciona)
function guardarAlmacenamientoLocal(llave, valor_a_guardar) {
    localStorage.setItem(llave, JSON.stringify(valor_a_guardar))
}
function obtenerAlmacenamientoLocal(llave) {
    const datos = JSON.parse(localStorage.getItem(llave))
    return datos
}
let peliculas = obtenerAlmacenamientoLocal('peliculas') || [];
