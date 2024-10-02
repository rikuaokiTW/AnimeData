import * as fs from 'fs';

async function fetchData<T>(url: string): Promise<T | null> {
    try {
        const response = await fetch(url);
        const json = await response.json();
        if (!response.ok) {
            throw new Error("Erro: " + response.status);
        };
        return json
    } catch (error) {
        if (error instanceof Error) {
            console.log("fetchData: " + error.message);
        }
        return null;
    }
}

async function fetchSeason(year: number, season: string) {
    const url = `https://api.jikan.moe/v4/seasons/${year}/${season}?filter=tv&page=1`;
    const json = await fetchData<seasonInfo>(url);
    if (isSeason(json)) {
        const {pagination, data} = json;
        data ? console.log('Dados existem') : console.log(data);
        for(let i = 0; i < pagination.last_visible_page; i++) {
            writeCSVRow(data);
        }
        return {pagination, data}
    }
    return null

}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

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

function isSeason(data: unknown): data is seasonInfo {
    if (data && typeof data === 'object' && 'pagination' in data && 'data' in data) {
        return true;
    } else {
        return false;
    }
}

function formatArray(array: genericInfo[]) {
    if (array instanceof Array && array.length > 0) {
        return array.map((obj) => obj['name']).join('|');
    } else {
        return 'N/A';
    }
}

function animeToCSV(data: animeData) {
    return {
        titulo: data.titles[0].title,
        temporada: data.season,
        estudios: formatArray(data.studios),
        temas: formatArray(data.themes),
        generos: formatArray(data.genres),
        estreia: data.aired.from.slice(0, 10).split('-').reverse().join('/'),
        transmissao: data.broadcast.string ? data.broadcast.string : 'N/A',
        nota: data.score ? String(data.score) : 'N/A',
        qntdAvaliacoes: data.scored_by ? String(data.scored_by.toLocaleString()) : 'N/A',
        faixaEtaria: data.rating,
        qntdMembros: data.members.toLocaleString(),
        favoritados: String(data.favorites.toLocaleString()),
        produtores: formatArray(data.producers),
        distribuidores: formatArray(data.licensors),
    };
}

function writeCSVRow(data: animeData[]) {
    data.forEach((item) => {
        const anime: animeCSV = animeToCSV(item);
        if (anime.faixaEtaria?.includes('Children')) return;

        const csvRow = `"${anime.titulo.replace(/"/g, '""')}";"${anime.temporada}";"${anime.estudios}";"${anime.temas}";"${anime.generos}";"${anime.estreia}";"${anime.transmissao}";"${anime.nota}";"${anime.qntdAvaliacoes}";"${anime.faixaEtaria}";"${anime.qntdMembros}";"${anime.favoritados}";"${anime.produtores}";"${anime.distribuidores}"`;
        csvData.push(csvRow);
    })
}

const csvData: string[] = [];
const seasons = ['winter', 'spring', 'summer', 'fall'];
const years = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

// Define column headers
const columnHeaders = [
    'Titulo',
    'Temporada',
    'Estudios',
    'Temas',
    'Generos',
    'Estreia',
    'Transmissão',
    'Nota',
    'Qntd Avaliações',
    'Faixa-etaria',
    'Qntd de Membros',
    'Favoritado por',
    'Produtores',
    'Distribuidores'
];

// Push column headers as the first row in the CSV
csvData.push(columnHeaders.join(';'));

async function fetchAll() {
    for (let year of years) {
        try {
            for (let indexSeason in seasons) {
                await fetchSeason(year, seasons[indexSeason]);
                await delay(2000);
                console.log(`Escrito: Animes de ${year} temporada ${seasons[indexSeason]}`);
            }
            if(year === years[years.length - 1]) {
                fs.writeFileSync('anime_data.csv', csvData.join('\n'), 'utf-8');
                console.log('Finalizado');
            }
        } catch (error) {
            if (error) {
                console.log(error);
            }
            //return null;
        }
    }
}

fetchAll();