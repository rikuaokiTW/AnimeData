import fetchSeason from "./fetchSeason.js";
import { loadMessage, downloadFile, setFileName } from './downloadableFile.js';
import { switchToFIle, switchToLoader } from './switchingElements.js';
import { getCampos, getFiltros } from './handleForm.js';
import { isCampos, isFilters } from './typeguards.js';
import csvDados from './CSV.js';
import { toggleButton } from './button.js';


export default async function executeFetch() {
    toggleButton();
    const campos = getCampos();
    const filters = getFiltros();

    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    if(
        Object.keys(campos).length &&
        isCampos(campos) &&
        Object.keys(filters).length &&
        isFilters(filters)
    ) {
        const years = filters.anos;
        const seasons = filters.temporadas;
        switchToLoader();
        for (let year of years) {
            try {
                for (const [season, value] of Object.entries(seasons)) {
                    if(season != 'todos' && value) {
                        loadMessage(String(year), season);
                        let data = await fetchSeason(year, season, campos, filters);
                        await delay(2000);
                        if(Object.keys(data).length && data.pagination) {
                            if(data.pagination.last_visible_page > 1) {
                                for(let i = 2; i <= data.pagination.last_visible_page; i++) {
                                    await fetchSeason(year, season, campos, filters, i);
                                    await delay(2000);
                                };
                            };
                        };
                    };
                };
                if(year === years[years.length - 1]) {
                    if(years[0] < years[years.length - 1]) {
                        const name = `anime-data ${years[0]}-${years[years.length - 1]}.csv`;
                        downloadFile('text/csv', csvDados.join('\n'), name);
                        setFileName(name);
                    } else {
                        const name = `anime-data ${years[0]}.csv`;
                        downloadFile('text/csv', csvDados.join('\n'), name);
                        setFileName(name);
                    }
                    switchToFIle();
                    toggleButton();
                };
            } catch (error) {
                if (error) {
                    console.log(error);
                };
            };
        };
    } else {
        toggleButton();
    };
};