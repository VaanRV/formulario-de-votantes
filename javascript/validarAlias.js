var regex = new RegExp(/^[a-z0-9_-]{5,16}$/);

export function ValidarAlias(alias) {
    var aliasValidado = regex.test(alias);
    return aliasValidado;
}
