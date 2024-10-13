interface image {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
}

interface trailerInfo {
    youtube_id: string;
    url: string;
    embed_url: string;
    images: {
        image_url: string;
        small_image_url: string;
        medium_image_url: string;
        large_image_url: string;
        maximum_image_url: string;
    };
}

interface titleInfo {
    type: string;
    title: string;
}

interface duration {
    from: {
        day: number;
        month: number;
        year: number;
    };
    to: {
        day: number;
        month: number;
        year: number
    };
}

interface exhibition {
    from: string;
    to: string;
    prop: duration;
    string: string;
}

interface tvTime {
    day: string;
    time: string;
    timezone: string;
    string: string;
}

interface genericInfo {
    mal_id: number;
    type: string;
    name: string;
    url: string;
}

interface animeData {
    mal_id: number;
    url: string;
    images: { jpg: image, webp: image };
    trailer: trailerInfo;
    approved: boolean;
    titles: titleInfo[];
    title: string;
    title_english: string;
    title_japanese: string;
    title_synonyms: string[];
    type: "TV" | "OVA" | "Movie" | "Special" | "ONA" | "Music";
    source: string;
    episodes: number;
    status: "Finished Airing" | "Currently Airing" | "Not yet aired";
    airing: boolean;
    aired: exhibition;
    duration: string;
    rating: "G - All Ages" | "PG - Children" | "PG-13 - Teens 13 or older" | "R - 17+ (violence & profanity)" | "R+ - Mild Nudity" | "Rx - Hentai";
    score: number;
    scored_by: number;
    rank: number;
    popularity: number;
    members: number;
    favorites: number;
    synopsis: string;
    background: string;
    season: "summer" | "winter" | "spring" | "fall";
    broadcast: tvTime;
    producers: genericInfo[];
    licensors: genericInfo[];
    studios: genericInfo[];
    genres: genericInfo[];
    explicit_genres: genericInfo[];
    themes: genericInfo[];
    demographics: genericInfo[];
}

interface paginationInfo {
    last_visible_page: number,
    has_next_page: boolean,
    current_page: number,
    items: {
        count: number,
        total: number,
        per_page: number,
    }
}

interface seasonInfo {
    pagination: paginationInfo,
    data: animeData[],
}

interface animeCSV {
    malID?: number;
    tituloPadrao?: string;
    tituloIngles?: string;
    qntdEpisodios?: number | string;
    termino?: string;
    temporada?: string;
    ano?: number | string;
    diaSemana?: string;
    horario?: string;
    estudios?: string;
    origem?: string;
    temas?: string;
    generos?: string;
    estreia?: string;
    demografias?: string;
    duracao?: string;
    transmissao?: string; /* REMOVER */
    nota?: number | string;
    qntdAvaliacoes?: number | string;
    rank?: number;
    faixaEtaria?: string;
    qntdMembros?: string;
    favoritados?: number | string;
    popularidade?: number | string;
    produtores?: string;
    distribuidores?: string;
}

/* Formulário */
interface formData {
    malID?: boolean;
    defaultTitle?: boolean;
    tituloING?: boolean;
    qntdEPS?: boolean;
    estreiaID?: boolean;
    terminoID?: boolean;
    temporadaID?: boolean;
    anoID?: boolean;
    semanaID?: boolean;
    horarioID?: boolean;
    produtoresID?: boolean;
    distribuidoresID?: boolean;
    estudiosID?: boolean;
    origemID?: boolean;
    generosID?: boolean;
    temasID?: boolean;
    demografiasID?: boolean;
    duracaoID?: boolean;
    notaID?: boolean;
    qntdAvalID?: boolean;
    etariaID?: boolean;
    rankID?: boolean;
    popularidadeID?: boolean;
    favoritadosID?: boolean;
    qntdMembrosID?: boolean;
}

interface formData {
    fromInput?: string;
    toInput?: string;
    fromSlider?: string;
    toSlider?:string;
    todosTempID?: boolean;
    invernoID?: boolean;
    primaveraID?: boolean;
    veraoID?: boolean;
    outonoID?: boolean;
    todosTipoID?: boolean;
    tvID?: boolean;
    movieID?: boolean;
    ovaID?: boolean;
    onaID?: boolean;
    musicID?: boolean;
    todosStatusID?: boolean;
    finalizadoID?: boolean;
    exibicaoID?: boolean;
    exibidoID?: boolean;
    todosEtariaID?: boolean;
    gID?: boolean;
    pgID?: boolean;
    pg13ID?: boolean;
    r17ID?: boolean;
    rID?: boolean;
    rxID?: boolean;
}

interface Window {
    formData: any;
}

/* CHECKBOX */
interface checkbox {
    [key: string]: boolean
}

interface temporada {
    todos: boolean;
    winter: boolean;
    spring: boolean;
    summer: boolean;
    fall: boolean;
}

interface tipo {
    todos: boolean;
    tv: boolean;
    movie: boolean;
    ova: boolean;
    ona: boolean;
    music: boolean;
}

interface status {
    todos: boolean;
    "Finished Airing": boolean;
    "Currently Airing": boolean;
    "Not yet aired": boolean;
}

interface etaria {
    todos: boolean;
    "G - All Ages": boolean;
    "PG - Children": boolean;
    "PG-13 - Teens 13 or older": boolean;
    "R - 17+ (violence & profanity)": boolean;
    "R+ - Mild Nudity": boolean;
    "Rx - Hentai": boolean;
}

/* interface filters {
    anos: number[];
    temporada: temporada;
    tipo: tipo;
    status: status;
    etaria: etaria;
} */