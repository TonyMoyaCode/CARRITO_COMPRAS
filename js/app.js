document.querySelectorAll('.agregar-carrito').forEach(boton => {
    boton.addEventListener('click', e => {
        e.preventDefault();
        const cursoId = boton.dataset.id;
        console.log(`Curso agregado: ${cursoId}`);
        // Lógica para agregar el curso al carrito
    });
});
// Selecciona el formulario y agrega un listener al evento 'submit'
document.getElementById('busqueda').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita el comportamiento predeterminado
    const textoBusqueda = document.getElementById('buscador').value.trim();
    
    if (textoBusqueda) {
        console.log(`Buscando: ${textoBusqueda}`);
        // Aquí podrías implementar la búsqueda en una lista de cursos o realizar otra acción
    } else {
        console.log('El campo de búsqueda está vacío');
    }
});
// Variables
const carrito = document.querySelector('#carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

let articulosCarrito = []; // Array para guardar los productos

// Listeners
document.addEventListener('DOMContentLoaded', () => {
  listaCursos.addEventListener('click', agregarCurso);
  carrito.addEventListener('click', eliminarCurso);
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
});

// Funciones
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains('agregar-carrito')) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

// Leer datos del curso y agregarlos al carrito
function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.u-pull-right').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  };

  // Verificar si el curso ya está en el carrito
  const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
  if (existe) {
    // Actualizamos la cantidad
    const cursos = articulosCarrito.map(curso => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });
    articulosCarrito = [...cursos];
  } else {
    // Agregamos el curso al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  actualizarCarrito();
}

// Eliminar curso del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains('borrar-curso')) {
    const cursoId = e.target.getAttribute('data-id');
    // Eliminar del array por el id
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
    actualizarCarrito();
  }
}

// Actualizar el carrito en el DOM
function actualizarCarrito() {
  limpiarCarrito();

  // Recorrer el carrito y generar el HTML
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
  });
}

// Vaciar el carrito
function vaciarCarrito() {
  articulosCarrito = [];
  limpiarCarrito();
}

// Limpiar el HTML del carrito
function limpiarCarrito() {
  while (carrito.firstChild) {
    carrito.removeChild(carrito.firstChild);
  }
}
 
// total carrito 
// Calcular el total de los productos en el carrito
function calcularTotal() {
    const totalMonto = articulosCarrito.reduce((total, curso) => {
      const precio = parseFloat(curso.precio.replace('$', '')); //  convertir el precio en un número
      return total + precio * curso.cantidad;
    }, 0);
  
    // Actualiza el total en el DOM
    document.getElementById('total-monto').textContent = totalMonto.toFixed(2);
  }
  

// Actualizar el carrito en el DOM
function actualizarCarrito() {
    limpiarCarrito();
  
    // Recorrer el carrito y generar el HTML
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
    });
  
    // Calcular y mostrar el total
    calcularTotal();
  }
  
  // Vaciar el carrito
  function vaciarCarrito() {
    articulosCarrito = [];
    limpiarCarrito();
    calcularTotal(); // También actualiza el total al vaciar el carrito
  }
  