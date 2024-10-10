import { formatArray } from "./normalizeData.js";
import csvData from "./CSVFile.js";

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

export default function writeCSVRow(data: animeData[]) {
    data.forEach((item) => {
        const anime: animeCSV = animeToCSV(item);
        if (anime.faixaEtaria?.includes('Children')) return;

        const csvRow = `"${anime.titulo.replace(/"/g, '""')}";"${anime.temporada}";"${anime.estudios}";"${anime.temas}";"${anime.generos}";"${anime.estreia}";"${anime.transmissao}";"${anime.nota}";"${anime.qntdAvaliacoes}";"${anime.faixaEtaria}";"${anime.qntdMembros}";"${anime.favoritados}";"${anime.produtores}";"${anime.distribuidores}"`;
        csvData.push(csvRow);
    })
}