import { isSeason } from "./normalizeData.js";
import fetchData from "./fetchData.js";
import { createAnimeCSV } from "./writingCSV.js";

export default async function fetchSeason(year: number, season: string, campos: campos, filtros: filters, page = 1) {
    let url, json;

    if(Object.values(filtros.tipos).filter(value => value === true).length > 1) {
        url = `https://api.jikan.moe/v4/seasons/${year}/${season}?page=${page}`;
        json = await fetchData<seasonInfo>(url);    
    } else {
        for(const [key, value] of Object.entries(filtros.tipos)) {
            if(value === true) {
                url = `https://api.jikan.moe/v4/seasons/${year}/${season}?filter=${key}&page=${page}`;
                json = await fetchData<seasonInfo>(url);
            };
        };
    };
    

    if (json && isSeason(json)) {
        const {pagination, data} = json;
        //data ? console.log('Dados existem') : console.log(data);
        //console.log(data);
        createAnimeCSV(data, campos, filtros);
        return {pagination, data};
    } else {
        return {};
    }
}