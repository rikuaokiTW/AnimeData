import { formatArray } from "./normalizeData.js";
import csvData from "./CSVFile.js";
import csvDados from "./CSV.js";
export function createAnimeCSV(data, campos, filtros) {
    let columnHeaders = [];
    if (data && campos && filtros) {
        function formatTitle(title) {
            return title.replace(/"/g, '""');
        }
        function formatSmallNumber(number) {
            return String(number);
        }
        function formatBigNumber(number) {
            return String(number.toLocaleString());
        }
        function formatDate(date) {
            return date.slice(0, 10).split('-').reverse().join('/');
        }
        ;
        function formatDuration(duration) {
            return duration.split(' per')[0];
        }
        function formatArray(array) {
            if (array instanceof Array && array.length > 0) {
                return array.map((obj) => obj['name']).join('|');
            }
            else {
                return 'N/A';
            }
        }
        function writeCSV(animeCSV) {
            let order = ['malID', 'tituloPadrao', 'tituloIngles', 'qntdEpisodios', 'estreia', 'termino', 'temporada', 'ano', 'diaSemana', 'horario', 'produtores', 'distribuidores', 'estudios', 'origem', 'generos', 'temas', 'demografias', 'duracao', 'nota', 'qntdAvaliacoes', 'faixaEtaria', 'rank', 'popularidade', 'favoritados', 'qntdMembros'];
            let CSVRow = [];
            for (let key of order) {
                if (!Object.keys(animeCSV).includes(key)) {
                    order = order.filter(field => field != key);
                }
                ;
            }
            ;
            for (let key of order) {
                if (order.indexOf(key) === order.length - 1) {
                    CSVRow.push(`"${animeCSV[key]}"`);
                }
                else {
                    CSVRow.push(`"${animeCSV[key]}";`);
                }
                ;
            }
            ;
            csvDados.push(CSVRow.join(""));
        }
        ;
        function generateAnimeCSV() {
            let animeCSV;
            let flag;
            data.forEach(anime => {
                animeCSV = {};
                flag = true;
                for (const [key, value] of Object.entries(filtros.tipos)) {
                    if (anime.type) {
                        if (!value && key === anime.type.toLowerCase()) {
                            flag = false;
                        }
                        ;
                    }
                    ;
                }
                ;
                for (const [key, value] of Object.entries(filtros.status)) {
                    if (anime.status) {
                        if (!value && key === anime.status) {
                            flag = false;
                        }
                        ;
                    }
                    ;
                }
                ;
                for (const [key, value] of Object.entries(filtros.etaria)) {
                    if (anime.rating) {
                        if (!value && key === anime.rating) {
                            flag = false;
                        }
                        ;
                    }
                    ;
                }
                ;
                if (flag) {
                    for (const [key, value] of Object.entries(campos)) {
                        if (value) {
                            switch (key) {
                                case "malID":
                                    if (!columnHeaders.includes("MAL ID")) {
                                        columnHeaders.push("MAL ID");
                                    }
                                    ;
                                    animeCSV.malID = anime.mal_id;
                                case 'defaultTitle':
                                    if (!columnHeaders.includes("Título Padrão")) {
                                        columnHeaders.push("Título Padrão");
                                    }
                                    ;
                                    animeCSV.tituloPadrao = formatTitle(anime.titles[0].title);
                                case 'tituloING':
                                    if (!columnHeaders.includes("Título Inglês")) {
                                        columnHeaders.push("Título Inglês");
                                    }
                                    ;
                                    anime.titles.forEach(title => {
                                        if (title.type === "English") {
                                            animeCSV.tituloIngles = title.title;
                                        }
                                        ;
                                    });
                                    if (!Object.keys(animeCSV).includes('tituloIngles')) {
                                        animeCSV.tituloIngles = 'N/A';
                                    }
                                case 'qntdEPS':
                                    if (!columnHeaders.includes("Qntd Episódios")) {
                                        columnHeaders.push("Qntd Episódios");
                                    }
                                    ;
                                    if (anime.episodes || anime.episodes != null) {
                                        animeCSV.qntdEpisodios = formatSmallNumber(anime.episodes);
                                    }
                                    else {
                                        animeCSV.qntdEpisodios = 'N/A';
                                    }
                                case 'estreia':
                                    if (!columnHeaders.includes("Estreou em")) {
                                        columnHeaders.push("Estreou em");
                                    }
                                    ;
                                    if (anime.aired.from) {
                                        animeCSV.estreia = formatDate(anime.aired.from);
                                    }
                                    else {
                                        animeCSV.estreia = 'N/A';
                                    }
                                case 'termino':
                                    if (!columnHeaders.includes("Terminou em")) {
                                        columnHeaders.push("Terminou em");
                                    }
                                    ;
                                    if (anime.season) {
                                        animeCSV.termino = formatDate(anime.aired.to);
                                    }
                                    else {
                                        animeCSV.termino = 'N/A';
                                    }
                                case 'temporada':
                                    if (!columnHeaders.includes("Temporada")) {
                                        columnHeaders.push("Temporada");
                                    }
                                    ;
                                    if (anime.season) {
                                        animeCSV.temporada = anime.season;
                                    }
                                    else {
                                        animeCSV.temporada = 'N/A';
                                    }
                                case 'ano':
                                    if (!columnHeaders.includes("Ano")) {
                                        columnHeaders.push("Ano");
                                    }
                                    ;
                                    if (anime.aired.prop.from.year) {
                                        animeCSV.ano = formatSmallNumber(anime.aired.prop.from.year);
                                    }
                                    else {
                                        animeCSV.ano = 'N/A';
                                    }
                                    ;
                                case 'semana':
                                    if (!columnHeaders.includes("Dia da Semana")) {
                                        columnHeaders.push("Dia da Semana");
                                    }
                                    ;
                                    if (anime.broadcast.day) {
                                        animeCSV.diaSemana = anime.broadcast.day;
                                    }
                                    else {
                                        animeCSV.diaSemana = 'N/A';
                                    }
                                    ;
                                case 'horario':
                                    if (!columnHeaders.includes("Horário")) {
                                        columnHeaders.push("Horário");
                                    }
                                    ;
                                    if (anime.broadcast.time) {
                                        animeCSV.horario = anime.broadcast.time;
                                    }
                                    else {
                                        animeCSV.horario = 'N/A';
                                    }
                                    ;
                                case 'produtores':
                                    if (!columnHeaders.includes("Produtores")) {
                                        columnHeaders.push("Produtores");
                                    }
                                    ;
                                    if (anime.producers.length) {
                                        animeCSV.produtores = formatArray(anime.producers);
                                    }
                                    else {
                                        animeCSV.produtores = 'N/A';
                                    }
                                    ;
                                case 'distribuidores':
                                    if (!columnHeaders.includes("Distribuidores")) {
                                        columnHeaders.push("Distribuidores");
                                    }
                                    ;
                                    if (anime.licensors.length) {
                                        animeCSV.distribuidores = formatArray(anime.licensors);
                                    }
                                    else {
                                        animeCSV.distribuidores = 'N/A';
                                    }
                                    ;
                                case 'estudios':
                                    if (!columnHeaders.includes("Estúdios")) {
                                        columnHeaders.push("Estúdios");
                                    }
                                    ;
                                    if (anime.studios.length) {
                                        animeCSV.estudios = formatArray(anime.studios);
                                    }
                                    else {
                                        animeCSV.estudios = 'N/A';
                                    }
                                    ;
                                case 'origem':
                                    if (!columnHeaders.includes("Origem")) {
                                        columnHeaders.push("Origem");
                                    }
                                    ;
                                    if (anime.source) {
                                        animeCSV.origem = anime.source;
                                    }
                                    else {
                                        animeCSV.origem = 'N/A';
                                    }
                                    ;
                                case 'generos':
                                    if (!columnHeaders.includes("Gêneros")) {
                                        columnHeaders.push("Gêneros");
                                    }
                                    ;
                                    if (anime.genres.length) {
                                        animeCSV.generos = formatArray(anime.genres);
                                    }
                                    else {
                                        animeCSV.generos = 'N/A';
                                    }
                                    ;
                                case 'temas':
                                    if (!columnHeaders.includes("Temas")) {
                                        columnHeaders.push("Temas");
                                    }
                                    ;
                                    if (anime.themes.length) {
                                        animeCSV.temas = formatArray(anime.themes);
                                    }
                                    else {
                                        animeCSV.temas = 'N/A';
                                    }
                                    ;
                                case 'demografias':
                                    if (!columnHeaders.includes("Demografias")) {
                                        columnHeaders.push("Demografias");
                                    }
                                    ;
                                    if (anime.demographics.length) {
                                        animeCSV.demografias = formatArray(anime.demographics);
                                    }
                                    else {
                                        animeCSV.demografias = 'N/A';
                                    }
                                    ;
                                case 'duracao':
                                    if (!columnHeaders.includes("Duração")) {
                                        columnHeaders.push("Duração");
                                    }
                                    ;
                                    if (anime.duration) {
                                        animeCSV.duracao = formatDuration(anime.duration);
                                    }
                                    else {
                                        animeCSV.duracao = 'N/A';
                                    }
                                    ;
                                case 'nota':
                                    if (!columnHeaders.includes("Nota")) {
                                        columnHeaders.push("Nota");
                                    }
                                    ;
                                    if (anime.score) {
                                        animeCSV.nota = formatSmallNumber(anime.score);
                                    }
                                    else {
                                        animeCSV.nota = 'N/A';
                                    }
                                    ;
                                case 'qntdAval':
                                    if (!columnHeaders.includes("Qntd Avaliações")) {
                                        columnHeaders.push("Qntd Avaliações");
                                    }
                                    ;
                                    if (anime.scored_by) {
                                        animeCSV.qntdAvaliacoes = formatBigNumber(anime.scored_by);
                                    }
                                    else {
                                        animeCSV.qntdAvaliacoes = 'N/A';
                                    }
                                    ;
                                case 'etaria':
                                    if (!columnHeaders.includes("Faixa-Etária")) {
                                        columnHeaders.push("Faixa-Etária");
                                    }
                                    ;
                                    if (anime.rating) {
                                        animeCSV.faixaEtaria = anime.rating;
                                    }
                                    else {
                                        animeCSV.faixaEtaria = 'N/A';
                                    }
                                    ;
                                case 'rank':
                                    if (!columnHeaders.includes("Rank")) {
                                        columnHeaders.push("Rank");
                                    }
                                    ;
                                    if (anime.rank) {
                                        animeCSV.rank = formatBigNumber(anime.rank);
                                    }
                                    else {
                                        animeCSV.rank = 'N/A';
                                    }
                                    ;
                                case 'popularidade':
                                    if (!columnHeaders.includes("Popularidade")) {
                                        columnHeaders.push("Popularidade");
                                    }
                                    ;
                                    if (anime.popularity) {
                                        animeCSV.popularidade = formatBigNumber(anime.popularity);
                                    }
                                    else {
                                        animeCSV.popularidade = 'N/A';
                                    }
                                    ;
                                case 'favoritados':
                                    if (!columnHeaders.includes("Favoritados")) {
                                        columnHeaders.push("Favoritados");
                                    }
                                    ;
                                    if (anime.favorites) {
                                        animeCSV.favoritados = formatBigNumber(anime.favorites);
                                    }
                                    else {
                                        animeCSV.favoritados = 'N/A';
                                    }
                                    ;
                                case 'qntdMembros':
                                    if (!columnHeaders.includes("Qntd Membros")) {
                                        columnHeaders.push("Qntd Membros");
                                    }
                                    ;
                                    if (anime.members) {
                                        animeCSV.qntdMembros = formatBigNumber(anime.members);
                                    }
                                    else {
                                        animeCSV.qntdMembros = 'N/A';
                                    }
                                    ;
                                default:
                                    break;
                            }
                            ;
                        }
                        ;
                    }
                    ;
                    if (!csvDados.length) {
                        console.log(columnHeaders);
                        csvDados.push(columnHeaders.join(';'));
                    }
                    ;
                    writeCSV(animeCSV);
                }
                ;
            });
        }
        ;
        generateAnimeCSV();
    }
    ;
}
;
function animeToCSV(data) {
    return {
        tituloPadrao: data.titles[0].title,
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
export function writeCSVRow(data) {
    data.forEach((item) => {
        const anime = animeToCSV(item);
        if (anime.faixaEtaria?.includes('Children'))
            return;
        const csvRow = `"${anime.tituloPadrao.replace(/"/g, '""')}";"${anime.temporada}";"${anime.estudios}";"${anime.temas}";"${anime.generos}";"${anime.estreia}";"${anime.transmissao}";"${anime.nota}";"${anime.qntdAvaliacoes}";"${anime.faixaEtaria}";"${anime.qntdMembros}";"${anime.favoritados}";"${anime.produtores}";"${anime.distribuidores}"`;
        csvData.push(csvRow);
    });
}
//# sourceMappingURL=writingCSV.js.map