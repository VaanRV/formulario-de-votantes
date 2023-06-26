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
    const tablaVotante = document.querySelector('.tabla-votantes')
    var tblBody = document.createElement("tbody");

    listaVotantes.forEach(votante => {
        const {nombre, alias, rut, email, region, comuna, candidato} = votante
        console.log(Object.values(votante))
        var hilera = document.createElement("tr");

        Object.values(votante).forEach(ele => {
            console.log(ele)
            var celda = document.createElement("td");
            var textoCelda = document.createTextNode(ele);
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
        })
        tblBody.appendChild(hilera)

    });
    tablaVotante.appendChild(tblBody)
    divVotantes.appendChild(tabla)
}