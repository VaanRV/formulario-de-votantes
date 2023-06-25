
const regex = new RegExp(!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/);

export function ValidarRut(rut) {
    if (regex.test( rut ))
			return false;
		var tmp = rut.split('-');
		var digv = tmp[1]; 
		var rut = tmp[0];
		if ( digv == 'K' ) digv = 'k' ;
		return (DigitoVerificador(rut) == digv );
}

function DigitoVerificador(T) {
    var M = 0,
        S = 1;
    for (; T; T = Math.floor(T / 10))
        S = (S + T % 10 * (9 - M++ % 6)) % 11;
    return S ? S - 1 : 'k';
}