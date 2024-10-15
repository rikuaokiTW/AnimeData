import { isSeason } from "./normalizeData.js";
import fetchData from "./fetchData.js";
import { createAnimeCSV } from "./writingCSV.js";
export default async function fetchSeason(year, season, campos, filtros, page = 1) {
    let url, json;
    if (Object.values(filtros.tipos).filter(value => value === true).length > 1) {
        url = `https://api.jikan.moe/v4/seasons/${year}/${season}?page=${page}`;
        json = await fetchData(url);
    }
    else {
        for (const [key, value] of Object.entries(filtros.tipos)) {
            if (value === true) {
                url = `https://api.jikan.moe/v4/seasons/${year}/${season}?filter=${key}&page=${page}`;
                json = await fetchData(url);
            }
            ;
        }
        ;
    }
    ;
    if (json && isSeason(json)) {
        const { pagination, data } = json;
        createAnimeCSV(data, campos, filtros);
        return { pagination, data };
    }
    else {
        return {};
    }
}
//# sourceMappingURL=fetchSeason.js.map