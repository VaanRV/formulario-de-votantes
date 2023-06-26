const urlObtenerVotante = ' http://localhost/php/urlObtenerVotante.php';

//Listado de votantes.
let listaVotantes = [];

//Obtener el listado de votantes desde la BD.
async function obtenerVotantes() {
    listaVotantes = await fetch(urlObtenerVotante)
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error))

    mostrarVotantes()
}

obtenerVotantes()

//Mostrar en la página web los usuarios obtenidos anteriormente.
function mostrarVotantes() {
    const votanteContainer = document.querySelector('.div-listado')
    const tablaVotante = document.querySelector('.tabla-votantes')
    var tblBody = document.createElement("tbody");

    listaVotantes.forEach(votante => {
        var hilera = document.createElement("tr");

        Object.values(votante).forEach(dato => {
            var celda = document.createElement("td");
            var textoCelda = document.createTextNode(dato);

            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
        })
        tblBody.appendChild(hilera)

    });

    tablaVotante.appendChild(tblBody)
    votanteContainer.appendChild(tabla)
}