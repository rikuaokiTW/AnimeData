export function isHTMLElement(value) {
    return value instanceof HTMLElement;
}
;
export function isAnchor(value) {
    return value instanceof HTMLAnchorElement;
}
;
export function isInput(value) {
    return value instanceof HTMLInputElement;
}
;
export function isCheckbox(value) {
    return value instanceof HTMLInputElement;
}
;
export function isTemporada(data) {
    if (data &&
        typeof data === 'object' &&
        'todos' in data &&
        'winter' in data &&
        'spring' in data &&
        'summer' in data &&
        'fall' in data) {
        return true;
    }
    else {
        return false;
    }
}
export function isTipo(data) {
    if (data &&
        typeof data === 'object' &&
        'todos' in data &&
        'tv' in data &&
        'movie' in data &&
        'ova' in data &&
        'ona' in data &&
        'music' in data) {
        return true;
    }
    else {
        return false;
    }
}
export function isStatus(data) {
    if (data &&
        typeof data === 'object' &&
        'todos' in data &&
        'Finished Airing' in data &&
        'Currently Airing' in data &&
        'Not yet aired' in data) {
        return true;
    }
    else {
        return false;
    }
}
export function isFaixaEtaria(data) {
    if (data &&
        typeof data === 'object' &&
        'todos' in data &&
        'G - All Ages' in data &&
        'PG - Children' in data &&
        'PG-13 - Teens 13 or older' in data &&
        'R - 17+ (violence & profanity)' in data &&
        'R+ - Mild Nudity' in data &&
        'Rx - Hentai' in data) {
        return true;
    }
    else {
        return false;
    }
}
export function isFilters(data) {
    if (data &&
        typeof data === 'object' &&
        'anos' in data &&
        'temporadas' in data &&
        'tipos' in data &&
        'status' in data &&
        'etaria' in data) {
        return true;
    }
    else {
        return false;
    }
}
export function isCampos(data) {
    if (data &&
        typeof data === 'object' &&
        "malID" in data &&
        "defaultTitle" in data &&
        "tituloING" in data &&
        "qntdEPS" in data &&
        "estreia" in data &&
        "termino" in data &&
        "temporada" in data &&
        "ano" in data &&
        "semana" in data &&
        "horario" in data &&
        "produtores" in data &&
        "distribuidores" in data &&
        "estudios" in data &&
        "origem" in data &&
        "generos" in data &&
        "temas" in data &&
        "demografias" in data &&
        "duracao" in data &&
        "nota" in data &&
        "qntdAval" in data &&
        "etaria" in data &&
        "rank" in data &&
        "popularidade" in data &&
        "favoritados" in data &&
        "qntdMembros" in data) {
        return true;
    }
    else {
        return false;
    }
}
//# sourceMappingURL=typeguards.js.map