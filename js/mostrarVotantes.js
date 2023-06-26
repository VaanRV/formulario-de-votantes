const urlObtenerVotante = ' http://localhost/php/urlObtenerVotante.php';

//Listado de votantes, regiones y comunas en la BD
let listaVotantes = [];

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

        const parrafo = document.createElement('p')
        parrafo.textContent = `${nombre} - ${alias} - ${rut} - ${email} - ${region}`
        parrafo.dataset.id = rut
        const hr = document.createElement('hr')

        divVotantes.appendChild(parrafo)
        divVotantes.appendChild(hr)
    });
}
