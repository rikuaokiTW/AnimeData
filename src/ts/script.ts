import * as fs from 'fs';
import fetchSeason from "./modules/fetchSeason.js";
import csvData from './modules/CSVFile.js';

const seasons = ['winter', 'spring', 'summer', 'fall'];
const years = [2022, 2023];
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

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
        }
    }
}

fetchAll();