import { ValidarRut } from './validarRut.js';
import { ValidarAlias } from './validarAlias.js';

const urlAgregarVotante = ' http://localhost/php/urlAgregarVotante.php';
const urlObtenerVotante = ' http://localhost/php/urlObtenerVotante.php';

//Listado de votantes ingresados
let listaVotantes = []

//Objeto que contiene la información del nuevo votante
const votanteInfo = {
    nombre: '',
    alias: '',
    rut: '', 
    email: '', 
    region: '',
    comuna: '', 
    candidato: ''
}

const formulario = document.getElementById('form_vote');
const nombre = document.querySelector('#nombre');
const alias = document.querySelector('#alias');
const rut = document.querySelector('#rut');
const email = document.querySelector('#email');
const region = document.querySelector('#region');
const comuna = document.querySelector('#comuna');
const candidato = document.querySelector('#candidato');

formulario.addEventListener('submit', validarFormulario)

//Validar los datos del formulario según los criterios especificados en el documento
function validarFormulario(e) {
    e.preventDefault()
    
    if([nombre.value, alias.value, rut.value, email.value, region.value, comuna.value, candidato.value].includes('')) {
        alert('Todos los campos son obligatorios')
        return
    } else if(!ValidarAlias(alias.value)) {
        alert('Error alias')
        return

    } else if(!ValidarRut(rut.value)) {
        alert('Rut invalido, ingrese un rut valido o siga el formato 11111111-k')
        return
    } else {
        votanteInfo.nombre = nombre.value
        votanteInfo.alias = alias.value
        votanteInfo.rut = rut.value
        votanteInfo.email = email.value
        votanteInfo.region = region.value
        votanteInfo.comuna = comuna.value
        votanteInfo.candidato = candidato.value

        agregarVotante()
    }
}

//Obtener la información de los votantes ya ingresados en la BD
async function obtenerVotantes() {
    listaVotantes = await fetch(urlObtenerVotante)
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error))

    mostrarVotantes()
}

obtenerVotantes()

//Mostrar en la página web los usuarios obtenidos anteriormente
function mostrarVotantes() {
    const divVotantes = document.querySelector('.div-listado')

    listaVotantes.forEach(votante => {
        const {nombre, alias, rut, email, region, comuna, candidato} = votante
        console.log("wwae", votante)
        const parrafo = document.createElement('p')
        parrafo.textContent = `${nombre} - ${alias} - ${rut} - ${email} - ${region}`
        parrafo.dataset.id = rut
        const hr = document.createElement('hr')

        divVotantes.appendChild(parrafo)
        divVotantes.appendChild(hr)
    });
}

//Agregar Votante en la BD
async function agregarVotante() {

    const respuesta = await fetch(urlAgregarVotante, {
        method: 'POST',
        body: JSON.stringify(votanteInfo)
    })
    .then(res => res.json())
    .then(data => data)
    .catch(error => alert("Ya se ha registrado un votante con este RUT"))
    
    if(!respuesta) {
        return
    }
    if(respuesta.msg === 'OK') {
        alert('Se ha registrado exitosamente')
        limpiarHTML()
        obtenerVotantes()

        formulario.reset()
        limpiarObjeto()
    }
}

//Limpiar los datos de los votantes ingresados para mostrar los nuevos ingresados
function limpiarHTML() {
    const divVotantes = document.querySelector('.div-listado')
    while(divVotantes.firstChild) {
        divVotantes.removeChild(divVotantes.firstChild)
    }
}

//Limpiar los datos del votante ingresado
function limpiarObjeto() {
    votanteInfo.nombre = ''
    votanteInfo.alias = ''
    votanteInfo.rut = ''
    votanteInfo.email = ''
    votanteInfo.region = ''
    votanteInfo.comuna = ''
    votanteInfo.candidato = ''
}