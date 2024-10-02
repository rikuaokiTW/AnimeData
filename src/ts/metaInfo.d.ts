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
    titulo: string;
    temporada: string;
    estudios: string;
    temas: string;
    generos: string;
    estreia: string;
    transmissao: string;
    nota: number | string;
    qntdAvaliacoes: number | string;
    faixaEtaria: string;
    qntdMembros: string;
    favoritados: number | string;
    produtores: string;
    distribuidores: string;
}