export function isHTMLElement(value: unknown): value is HTMLElement {
    return value instanceof HTMLElement;
};

export function isAnchor(value: unknown): value is HTMLAnchorElement {
    return value instanceof HTMLAnchorElement;
};

export function isInput(value: unknown): value is HTMLInputElement {
    return value instanceof HTMLInputElement;
};

export function isCheckbox(value: unknown): value is HTMLInputElement {
    return value instanceof HTMLInputElement;
};

export function isTemporada(data: unknown): data is temporada {
	if (
        data &&
        typeof data === 'object' &&
        'todos' in data &&
        'winter' in data &&
        'spring' in data &&
        'summer' in data &&
        'fall' in data
    ) {
		return true;
	} else {
		return false;
	}
}

export function isTipo(data: unknown): data is tipo {
	if (
        data &&
        typeof data === 'object' &&
        'todos' in data &&
        'tv' in data &&
        'movie' in data &&
        'ova' in data &&
        'ona' in data &&
        'music' in data
    ) {
		return true;
	} else {
		return false;
	}
}

export function isStatus(data: unknown): data is status {
	if (
        data &&
        typeof data === 'object' &&
        'todos' in data &&
        'Finished Airing' in data &&
        'Currently Airing' in data &&
        'Not yet aired' in data
    ) {
		return true;
	} else {
		return false;
	}
}

export function isFaixaEtaria(data: unknown): data is etaria {
	if (
        data &&
        typeof data === 'object' &&
        'todos' in data &&
        'G - All Ages' in data &&
        'PG - Children' in data &&
        'PG-13 - Teens 13 or older' in data &&
        'R - 17+ (violence & profanity)' in data &&
        'R+ - Mild Nudity' in data &&
        'Rx - Hentai' in data
    ) {
		return true;
	} else {
		return false;
	}
}

export function isFilters(data: unknown): data is filters {
	if (
        data &&
        typeof data === 'object' &&
        'anos' in data &&
        'temporadas' in data &&
        'tipos' in data &&
        'status' in data &&
        'etaria' in data
    ) {
		return true;
	} else {
		return false;
	}
}

interface campos {
    malID: boolean;
    defaultTitle: boolean;
    tituloING: boolean;
    qntdEPS: boolean;
    estreia: boolean;
    termino: boolean;
    temporada: boolean;
    ano: boolean;
    semana: boolean;
    horario: boolean;
    produtores: boolean;
    distribuidores: boolean;
    estudios: boolean;
    origem: boolean;
    generos: boolean;
    temas: boolean;
    demografias: boolean;
    duracao: boolean;
    nota: boolean;
    qntdAval: boolean;
    etaria: boolean;
    rank: boolean;
    popularidade: boolean;
    favoritados: boolean;
    qntdMembros: boolean;
}

export function isCampos(data: unknown): data is campos {
	if (
        data &&
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
        "qntdMembros" in data
    ) {
		return true;
	} else {
		return false;
	}
}