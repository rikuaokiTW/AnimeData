import * as fs from 'fs';
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const json = await response.json();
        if (!response.ok) {
            throw new Error("Erro: " + response.status);
        }
        ;
        return json;
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("fetchData: " + error.message);
        }
        return null;
    }
}
async function fetchSeason(year, season) {
    const url = `https://api.jikan.moe/v4/seasons/${year}/${season}?filter=tv&page=1`;
    const json = await fetchData(url);
    if (isSeason(json)) {
        const { pagination, data } = json;
        data ? console.log('Dados existem') : console.log(data);
        for (let i = 0; i < pagination.last_visible_page; i++) {
            writeCSVRow(data);
        }
        return { pagination, data };
    }
    return null;
}
const delay = (ms) => new Promise(res => setTimeout(res, ms));
function isSeason(data) {
    if (data && typeof data === 'object' && 'pagination' in data && 'data' in data) {
        return true;
    }
    else {
        return false;
    }
}
function formatArray(array) {
    if (array instanceof Array && array.length > 0) {
        return array.map((obj) => obj['name']).join('|');
    }
    else {
        return 'N/A';
    }
}
function animeToCSV(data) {
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
function writeCSVRow(data) {
    data.forEach((item) => {
        const anime = animeToCSV(item);
        if (anime.faixaEtaria?.includes('Children'))
            return;
        const csvRow = `"${anime.titulo.replace(/"/g, '""')}";"${anime.temporada}";"${anime.estudios}";"${anime.temas}";"${anime.generos}";"${anime.estreia}";"${anime.transmissao}";"${anime.nota}";"${anime.qntdAvaliacoes}";"${anime.faixaEtaria}";"${anime.qntdMembros}";"${anime.favoritados}";"${anime.produtores}";"${anime.distribuidores}"`;
        csvData.push(csvRow);
    });
}
const csvData = [];
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
            if (year === years[years.length - 1]) {
                fs.writeFileSync('anime_data.csv', csvData.join('\n'), 'utf-8');
                console.log('Finalizado');
            }
        }
        catch (error) {
            if (error) {
                console.log(error);
            }
            //return null;
        }
    }
}
fetchAll();
