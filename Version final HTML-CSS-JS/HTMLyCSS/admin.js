function guardarAlmacenamientoLocal(llave, valor_a_guardar) {
    localStorage.setItem(llave, JSON.stringify(valor_a_guardar))
}
function obtenerAlmacenamientoLocal(llave) {
    const datos = JSON.parse(localStorage.getItem(llave))
    return datos
}

let peliculas = obtenerAlmacenamientoLocal('peliculas') || [];
let mensaje = document.getElementById('mensaje')

//Añadir una pelicula
const añadirpelicula = document.getElementById('peliculaAñadir')
const añadirDescripcion = document.getElementById('descripcionAñadir')
const añadirImagen = document.getElementById('ImagenAñadir')

document.getElementById("botonAñadir").addEventListener("click", function (event) {
    event.preventDefault()
    let peliculaAñadir = añadirPelicula.value
    let descripcionAñadir = añadirDescripcion.value
    let imagenAñadir = añadirImagen.value

    let van = true

    if (peliculaAñadir == '' || descripcionAñadir == '' || imagenAñadir == '') {
        mensaje.classList.add('llenarCampos')
        setTimeout(() => { mensaje.classList.remove('llenarCampos') }, 2500)
        van = false
    }
    else {
        for (let i = 0; i < peliculas.length; i++) {
            if (productos[i].nombre == peliculaAñadir) {
                mensaje.classList.add('repetidoError')
                setTimeout(() => { mensaje.classList.remove('repetidoError') }, 2500)
                van = false
            }
        }
    }

    if (van == true) {
        productos.push({
            nombre: peliculaAñadir,
            descripcion: descripcionAñadir,
            urlImagen: imagenAñadir
        })
        mensaje.classList.add('realizado')
        setTimeout(() => {
            mensaje.classList.remove('repetidoError')
            window.location.reload()
        }, 1500)
    }
    guardarAlmacenamientoLocal('peliculas', peliculas);
})



// Eliminar
const peliculaE = document.getElementById('peliculaEliminar')

document.getElementById("botonEliminar").addEventListener("click", function (event) {
    event.preventDefault()
    let peliculaEliminar = peliculaE.value
    let van = false

    for (let i = 0; i < peliculas.length; i++) {
        if (peliculas[i].nombre == peliculaEliminar) {
            peliculas.splice(i, 1)
            van = true
        }
    }

    if (van == false) {
        mensaje.classList.add('noExsiteError')
        setTimeout(() => { mensaje.classList.remove('noExsiteError') }, 2500);
    }
    else {
        mensaje.classList.add('realizado')
        setTimeout(() => {
            mensaje.classList.remove('realizado')
            window.location.reload()
        }, 1500);
    }
    guardarAlmacenamientoLocal('peliculas', peliculas);
})

/* 
---------------------------------------------------------------------------------------------------------------------------------------------
// MOSTRAR PELICULAS
window.addEventListener("load", () => {
    const productoEd = document.getElementById('peliculaEditar')
    const productoEl = document.getElementById('peliculaEliminar')
    for (let i = 0; i < productos.length; i++) {
        peliculaEd.innerHTML += `<option>${pelicula[i].nombre}</option>`
        peliculaEl.innerHTML += `<option>${pelicula[i].nombre}</option>`
    }
    Object.keys(productos[0]).forEach(element => {
        atributoEd.innerHTML += `<option>${element}</option>`
    });

    let mostraPeliculas = document.getElementById('mostrarProductos')
    mostraProductos.innerHTML = ''
    for (let i = 0; i < productos.length; i++) {
        mostraProductos.innerHTML += `<div class="contenedorProductos"><img src="${productos[i].urlImagen}"><div class="informacion"><p>${productos[i].nombre}</p><p class="precio"><span>Precio: $${productos[i].valor}</span></p> Existencia: ${productos[i].existencia}<p></p></div></div>`
    }
})



---------------------------------------------------------------------------------------------------------------------------------------------

// EDITAR PELICULA (posiblemente quitar)
const peliculaEd = document.getElementById('peliculaEditar')
const atributoEd = document.getElementById('peliculaEditar')
const nuevoAtributoEd = document.getElementById('nuevoAtributo')

document.getElementById("botonEditar").addEventListener("click", function (event) {
    event.preventDefault()
    let peliculaEditar = peliculaEd.value
    let atributoEditar = atributoEd.value
    let nuevoAtributo = nuevoAtributoEd.value
    let van = false
    if (peliculaEditar == '' || atributoEditar == '' || nuevoAtributo == '') {
        mensaje.classList.add('llenarCampos')
        setTimeout(() => { mensaje.classList.remove('llenarCampos') }, 2500)
    }
    else {
        for (let i = 0; i < peliculas.length; i++) {
            if pelicula[i].nombre == peliculaEditar) {
                pelicula[i][atributoEditar] = nuevoAtributo
                van = true
            }
        }
        if (van == true) {
            mensaje.classList.add('realizado')
            setTimeout(() => {
                mensaje.classList.remove('realizado')
                window.location.reload()
            }, 1500);
        }
        else {
            mensaje.classList.add('noExisteError')
            setTimeout(() => { mensaje.classList.remove('noExsiteError') }, 2500);
        }
        guardarAlmacenamientoLocal('productos', productos);
    }
})
*/