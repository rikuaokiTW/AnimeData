const fs = require('fs'); // Node.js file system module

const csvData = [];
const seasons = ['winter', 'spring', 'summer', 'fall'];
const years = ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];

// Define column headers
const columnHeaders = [
    'Titulo',
    'Temporada',
    'Estudios',
    'Temas',
    'Transmissão',
    'Generos',
    'Estreia',
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

async function fetchAndWriteAnimeData(page = 1, season = 0, year = 0) {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/seasons/${years[year]}/${seasons[season]}?filter=tv&page=${page}`);
    const animeData = await response.json();
    console.log(`https://api.jikan.moe/v4/seasons/${years[year]}/${seasons[season]}?filter=tv&page=${page}`);

    if(animeData.data.length > 0) {
        animeData.data.forEach((item) => {
            let day = String(item.aired.prop.from.day);
            day = day.length < 2 ? `0${day}` : day;
            let month = String(item.aired.prop.from.month);
            month = month.length < 2 ? `0${month}` : month;
            let year = String(item.aired.prop.from.year);
            year = year.length < 4 ? `20${year}` : year;
            
            const anime = {
                titulo: item.title,
                temporada: item.season,
                estudios: item.studios.map((obj) => obj['name']).join('|'),
                temas: item.themes.map((obj) => obj['name']).join('|'),
                generos: item.genres.map((obj) => obj['name']).join('|'),
                estreia: `${day}/${month}/${year}`,
                transmissao: item.broadcast.string,
                nota: item.score,
                qntdAvaliacoes: item.scored_by,
                faixaEtaria: item.rating,
                qntd_membros: item.members.toLocaleString(),
                favoritados: item.favorites,
                produtores: item.producers.map((obj) => obj['name']).join('|'),
                distribuidores: item.licensors.map((obj) => obj['name']).join('|')
            };

          
            for (const key in anime) {
                if (anime.hasOwnProperty(key)) {
                    if (anime[key] === '' || anime[key] === null || anime[key] === undefined) {
                        anime[key] = 'N/A';
                    } else if (Array.isArray(anime[key]) && anime[key].length === 0) {
                        anime[key] = 'N/A';
                    }
                }
            }
        
            if(anime.faixaEtaria.includes('Children')) {
                return;
            }

            const csvRow = `"${anime.titulo.replace(/"/g, '""')}";"${anime.temporada}";"${anime.estudios}";"${anime.temas}";"${anime.generos}";"${anime.estreia}";"${anime.transmissao}";"${anime.nota}";"${anime.qntdAvaliacoes}";"${anime.faixaEtaria}";"${anime.qntd_membros}";"${anime.favoritados}";"${anime.produtores}";"${anime.distribuidores}"`;
            csvData.push(csvRow);
        });
    
        if (animeData.pagination.has_next_page) {
            setTimeout(() => {
                fetchAndWriteAnimeData(page + 1, season, year);
            }, 1000);
        } else if (season < seasons.length - 1) {
            console.log(season);
            setTimeout(() => {
                fetchAndWriteAnimeData(1, season + 1, year);
            }, 1000);
        } else if (year < years.length - 1) {
            setTimeout(() => {
                fetchAndWriteAnimeData(1, 0, year + 1);
            }, 1000);
        } else {
            console.log('Todos os dados foram requisitados e escritos no CSV.');
            const csvContent = csvData.join('\n');
            fs.writeFileSync('anime_data.csv', csvContent, 'utf-8');
            console.log('Arquivo CSV criado com sucesso.');
        }
    } else {
        console.log('Sem mais dados para fazer.');
    }
  } catch (error) {
    console.error("Um erro aconteceu:", error);
  }
}

fetchAndWriteAnimeData();