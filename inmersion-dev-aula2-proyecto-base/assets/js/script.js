let listaNombreGastos = [];
let listaValoresGasto = [];

document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formularioGasto');
    formulario.addEventListener('submit', manejarEnvioFormulario);
});

function manejarEnvioFormulario(evento) {
    evento.preventDefault(); // Previene el envío del formulario por defecto

    let nombreGasto = document.getElementById('nombreGasto').value.trim();
    let valorGasto = Number(document.getElementById('valorGasto').value);

    if (nombreGasto && !isNaN(valorGasto) && valorGasto > 0) {
        agregarGasto(nombreGasto, valorGasto);
    } else {
        alert('Por favor, ingrese un nombre válido y un valor numérico positivo para el gasto.');
    }
}

function agregarGasto(nombre, valor) {
    listaNombreGastos.push(nombre);
    listaValoresGasto.push(valor);

    console.log(listaNombreGastos);
    console.log(listaValoresGasto);

    actualizarListaDeGastos();
    limpiar();
}

function actualizarListaDeGastos() {
    const listaElementos = document.getElementById('listaDeGastos');
    const totalElementos = document.getElementById('totalGastos');
    let htmlLista = '';
    let totalGastos = 0;

    listaNombreGastos.forEach((elemento, posicion) => {
        const valorGasto = listaValoresGasto[posicion];

        htmlLista += `<li>${elemento} - USD ${valorGasto.toFixed(2)} 
              <button onclick="eliminarGasto(${posicion});">Eliminar</button>
                </li>`;
        totalGastos += valorGasto;
    });

    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);
}

function limpiar() {
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
    document.getElementById('nombreGasto').focus();
}

function eliminarGasto(posicion) {
    listaNombreGastos.splice(posicion, 1);
    listaValoresGasto.splice(posicion, 1);
    actualizarListaDeGastos();
}