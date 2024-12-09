document.addEventListener('DOMContentLoaded', () => {
    // Variables globales
    let articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carrito = document.querySelector('#carrito tbody');
    const listaCursos = document.querySelector('#lista-cursos');
    const botonFlotante = document.getElementById('boton-flotante');
    const contadorCarrito = document.getElementById('contador-carrito');
    const vaciarCarritoButton = document.getElementById('vaciar-carrito');

    // Actualizar contador en el botón flotante
    function actualizarContador() {
        const totalProductos = articulosCarrito.reduce((total, curso) => total + curso.cantidad, 0);
        contadorCarrito.textContent = totalProductos;
    }

    // Guardar carrito en localStorage
    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
    }

    // Actualizar carrito en el DOM
    function actualizarCarrito() {
        limpiarCarrito();
        let total = 0;

        // Generar las filas del carrito
        articulosCarrito.forEach(curso => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${curso.imagen}" width="100"></td>
                <td>${curso.titulo}</td>
                <td>${curso.precio}</td>
                <td>${curso.cantidad}</td>
                <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
                </td>
            `;
            carrito.appendChild(row);

            // Calcular el total
            total += parseFloat(curso.precio.replace('$', '')) * curso.cantidad;
        });

        // Actualizar el total en el DOM
        document.getElementById('total-monto').textContent = total.toFixed(2);

        // Actualizar contador
        actualizarContador();
    }

    // Limpiar el contenido del carrito en el DOM
    function limpiarCarrito() {
        while (carrito.firstChild) {
            carrito.removeChild(carrito.firstChild);
        }
    }

    // Agregar curso al carrito
    function agregarCurso(curso) {
        const existe = articulosCarrito.find(item => item.id === curso.id);
        if (existe) {
            existe.cantidad++;
        } else {
            articulosCarrito.push({ ...curso, cantidad: 1 });
        }

        guardarCarrito();
        actualizarCarrito();
    }

    // Eliminar curso del carrito
    function eliminarCurso(id) {
        articulosCarrito = articulosCarrito.filter(item => item.id !== id);
        guardarCarrito();
        actualizarCarrito();
    }

    // Vaciar carrito completo
    vaciarCarritoButton.addEventListener('click', () => {
        articulosCarrito = [];
        guardarCarrito();
        actualizarCarrito();
    });

    // Listeners para agregar curso
    listaCursos.addEventListener('click', e => {
        e.preventDefault();
        if (e.target.classList.contains('agregar-carrito')) {
            const cursoElement = e.target.parentElement.parentElement;
            const curso = {
                id: cursoElement.querySelector('a').getAttribute('data-id'),
                titulo: cursoElement.querySelector('h4').textContent,
                precio: cursoElement.querySelector('.u-pull-right').textContent,
                imagen: cursoElement.querySelector('img').src
            };
            agregarCurso(curso);
        }
    });

    // Listener para eliminar curso
    carrito.addEventListener('click', e => {
        if (e.target.classList.contains('borrar-curso')) {
            const id = e.target.getAttribute('data-id');
            eliminarCurso(id);
        }
    });

    // Mostrar carrito al hacer clic en el botón flotante
    botonFlotante.addEventListener('click', () => {
        // Mostrar la sección del carrito
        const carritoSeccion = document.querySelector('#carrito-seccion');
        carritoSeccion.style.display = 'block'; // Asegura que el carrito esté visible

        // Actualizar y mostrar el contenido del carrito
        actualizarCarrito();

        // Desplazarse al inicio de la página (donde está el carrito)
        window.scrollTo({
            top: 0, // Desplazar a la parte superior de la página
            behavior: 'smooth' // Desplazamiento suave
        });
    });

    // Inicializar el carrito en el DOM
    actualizarCarrito();
});

