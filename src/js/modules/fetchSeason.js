import { isSeason } from "./normalizeData.js";
import fetchData from "./fetchData.js";
import { createAnimeCSV } from "./writingCSV.js";
export default async function fetchSeason(year, season, campos, filtros) {
    let url, json;
    if (Object.values(filtros.tipos).filter(value => value === true).length > 1) {
        url = `https://api.jikan.moe/v4/seasons/${year}/${season}?page=1`;
        json = await fetchData(url);
    }
    else {
        for (const [key, value] of Object.entries(filtros.tipos)) {
            if (value === true) {
                url = `https://api.jikan.moe/v4/seasons/${year}/${season}?filter=${key}&page=1`;
                json = await fetchData(url);
            }
            ;
        }
        ;
    }
    ;
    if (json && isSeason(json)) {
        const { pagination, data } = json;
        data ? console.log('Dados existem') : console.log(data);
        for (let i = 0; i < pagination.last_visible_page; i++) {
            createAnimeCSV(data, campos, filtros);
        }
        return { pagination, data };
    }
    return null;
}
//# sourceMappingURL=fetchSeason.js.map