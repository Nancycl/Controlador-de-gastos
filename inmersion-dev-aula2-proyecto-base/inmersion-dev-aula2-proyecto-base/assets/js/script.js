let gastos = [];

document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formularioGasto');
    formulario.addEventListener('submit', agregarGasto);

    actualizarListaDeGastos();
});

function agregarGasto(evento) {
    evento.preventDefault();

    const nombreGasto = document.getElementById('nombreGasto').value.trim();
    const valorGasto = parseFloat(document.getElementById('valorGasto').value);

    if (nombreGasto && !isNaN(valorGasto) && valorGasto > 0) {
        const nuevoGasto = { id: Date.now(), nombre: nombreGasto, valor: valorGasto };
        gastos.push(nuevoGasto);

        if (valorGasto > 150) {
            alert('¡Atención! Este gasto es considerado excesivo (mayor a $150).');
        }

        actualizarListaDeGastos();
        limpiarFormulario();
    } else {
        alert('Por favor, ingrese un nombre válido y un valor numérico positivo para el gasto.');
    }
}

function actualizarListaDeGastos() {
    const listaElementos = document.getElementById('listaDeGastos');
    const totalElemento = document.getElementById('totalGastos');
    let htmlLista = '';
    let totalGastos = 0;

    gastos.forEach(gasto => {
        htmlLista += `
            <li>
                ${gasto.nombre} - USD 
                <span id="valor-${gasto.id}">${gasto.valor.toFixed(2)}</span>
                <button onclick="iniciarModificacion(${gasto.id})">Modificar</button>
                <button onclick="eliminarGasto(${gasto.id})">Eliminar</button>
            </li>
        `;
        totalGastos += gasto.valor;
    });

    listaElementos.innerHTML = htmlLista;
    totalElemento.textContent = totalGastos.toFixed(2);
}

function limpiarFormulario() {
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
    document.getElementById('nombreGasto').focus();
}

function eliminarGasto(id) {
    gastos = gastos.filter(gasto => gasto.id !== id);
    actualizarListaDeGastos();
}

function iniciarModificacion(id) {
    const gasto = gastos.find(g => g.id === id);
    if (gasto) {
        const valorSpan = document.getElementById(`valor-${id}`);
        const valorActual = valorSpan.textContent;
        valorSpan.innerHTML = `
            <input type="number" id="input-${id}" value="${valorActual}" min="0" step="0.01">
            <button onclick="guardarModificacion(${id})">Guardar</button>
        `;
    }
}

function guardarModificacion(id) {
    const nuevoValor = parseFloat(document.getElementById(`input-${id}`).value);
    if (!isNaN(nuevoValor) && nuevoValor > 0) {
        const gasto = gastos.find(g => g.id === id);
        if (gasto) {
            gasto.valor = nuevoValor;
            if (nuevoValor > 150) {
                alert('¡Atención! Este gasto modificado es considerado excesivo (mayor a $150).');
            }
            actualizarListaDeGastos();
        }
    } else {
        alert('Por favor, ingrese un valor numérico positivo para el gasto.');
        actualizarListaDeGastos(); // Restaura el valor original
    }
}