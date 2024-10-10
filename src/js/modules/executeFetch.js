import fetchSeason from "./fetchSeason.js";
import csvData from './CSVFile.js';
import { loadMessage, downloadFile, setFileName } from './downloadableFile.js';
import { switchToFIle, switchToLoader } from './switchingElements.js';
const seasons = ['winter', 'spring', 'summer', 'fall'];
const years = [2022, 2023];
const delay = (ms) => new Promise(res => setTimeout(res, ms));
export default async function executeFetch() {
    switchToLoader();
    for (let year of years) {
        try {
            for (let indexSeason in seasons) {
                loadMessage(String(year), seasons[indexSeason]);
                await fetchSeason(year, seasons[indexSeason]);
                await delay(2000);
                console.log(`Escrito: Animes de ${year} temporada ${seasons[indexSeason]}`);
            }
            if (year === years[years.length - 1]) {
                console.log("sim 2");
                if (years[0] < years[years.length - 1]) {
                    const name = `anime-data ${years[0]}-${years[years.length - 1]}.csv`;
                    downloadFile('text/csv', csvData.join('\n'), name);
                    setFileName(name);
                }
                else {
                    const name = `anime-data ${years[0]}.csv`;
                    downloadFile('text/csv', csvData.join('\n'), name);
                    setFileName(name);
                }
                switchToFIle();
            }
        }
        catch (error) {
            if (error) {
                console.log(error);
            }
            ;
        }
        ;
    }
    ;
}
;
//# sourceMappingURL=executeFetch.js.map