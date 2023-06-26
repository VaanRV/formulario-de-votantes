import { ValidarRut } from './validarRut.js';
import { ValidarAlias } from './validarAlias.js';
import { RegionIdConvertir } from './regionId.js';

const urlAgregarVotante = ' http://localhost/php/urlAgregarVotante.php';
const urlObtenerVotante = ' http://localhost/php/urlObtenerVotante.php';
const urlObtenerRegiones = ' http://localhost/php/urlObtenerRegiones.php';
const urlObtenerComunas = ' http://localhost/php/urlObtenerComunas.php';
const urlObtenerCandidatos = ' http://localhost/php/urlObtenerCandidatos.php';

//Listado de votantes, regiones y comunas en la BD
let listaVotantes = []
let listaRegiones = []
let listaComunas = []
let listaCandidatos = []

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
const checkbox = document.querySelectorAll(".checkbox")

formulario.addEventListener('submit', validarFormulario)

//Validar los datos del formulario según los criterios especificados en el documento
function validarFormulario(e) {
    e.preventDefault()

    const checkboxValues= []
    checkbox.forEach(check => {
        if(check.checked === true) {
            checkboxValues.push(check.value)
        }
    })

    if(checkboxValues.length < 2) {
        alert('Debes seleccionar al menos 2 opciones')
        return
    } else if([nombre.value, alias.value, rut.value, email.value, region.value, comuna.value, candidato.value].includes('')) {
        alert('Todos los campos son obligatorios')
        return
    } else if(!ValidarAlias(alias.value)) {
        alert('Ingrese un Alias con más de 5 letras alternando entre letras y numeros')
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
        votanteInfo.formato = checkboxValues.toString()

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

//Obtener la información de las regiones y comunas
async function obtenerRegiones() {
    listaRegiones = await fetch(urlObtenerRegiones)
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error))

    mostrarRegiones()
}

async function obtenerComunas() {
    listaComunas = await fetch(urlObtenerComunas)
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error))

}

async function obtenerCandidatos() {
    listaCandidatos = await fetch(urlObtenerCandidatos)
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error))
    mostrarCandidatos()

}

obtenerRegiones()
obtenerComunas()
obtenerCandidatos()

//Mostrar en la página web los usuarios obtenidos anteriormente
function mostrarRegiones() {
    const selectRegion = document.querySelector('#region')

    listaRegiones.forEach(region => {
        const { region_nombre, region_ordinal } = region
        const optionRegion = document.createElement('option')

        optionRegion.text = region_nombre;
        optionRegion.value = region_nombre;
        optionRegion.id = region_ordinal;
        
        selectRegion.appendChild(optionRegion)
    })
    
    selectRegion.addEventListener("change", e => {
        let option = e.currentTarget.selectedOptions[0];
        FiltrarComunas(option.id)
    });
}

function FiltrarComunas(option) {
    const regionId = RegionIdConvertir[option]

    const coumnasFiltradas = listaComunas.filter(elem => 
        elem.region_id == regionId
    )

    mostrarComunas(coumnasFiltradas)
}

function mostrarComunas(comunas) {
    
    const selectComuna = document.querySelector('#comuna')
    const blankCom = document.createElement('option')
    
    selectComuna.innerHTML = '';
    selectComuna.removeAttribute("disabled")
    selectComuna.classList.remove("disabled-select")
    selectComuna.appendChild(blankCom)

    comunas.forEach(comuna => {
        const { comuna_id, comuna_nombre } = comuna
        const optionsComunas = document.createElement('option')

        optionsComunas.text = comuna_nombre;
        optionsComunas.value = comuna_nombre;
        optionsComunas.id = `${comuna_id}_${comuna_nombre}`;
        
        selectComuna.appendChild(optionsComunas)
    })
}

function mostrarCandidatos() {
    
    const selectCandidato = document.querySelector('#candidato')
    const blankCom = document.createElement('option')
    
    selectCandidato.appendChild(blankCom)

    listaCandidatos.forEach(candidato => {
        const { candidato_id , nombre_candidato } = candidato
        const optionsCandidato = document.createElement('option')

        optionsCandidato.text = nombre_candidato;
        optionsCandidato.value = nombre_candidato;
        optionsCandidato.id = `${candidato_id}_${nombre_candidato}`;
        
        selectCandidato.appendChild(optionsCandidato)
    })
}

//Mostrar en la página web los usuarios obtenidos anteriormente
function mostrarVotantes() {
    const divVotantes = document.querySelector('.div-listado')

    listaVotantes.forEach(votante => {
        const {nombre, alias, rut, email, region, comuna, candidato} = votante

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
    const selectComuna = document.querySelector('#comuna')

    selectComuna.innerHTML = '';
    selectComuna.setAttribute("disabled", "")
    selectComuna.classList.add("disabled-select");

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