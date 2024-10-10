import { isSeason } from "./normalizeData.js";
import fetchData from "./fetchData.js";
import writeCSVRow from "./writingCSV.js";

export default async function fetchSeason(year: number, season: string) {
    const url = `https://api.jikan.moe/v4/seasons/${year}/${season}?filter=tv&page=1`;
    const json = await fetchData<seasonInfo>(url);
    if (isSeason(json)) {
        const {pagination, data} = json;
        data ? console.log('Dados existem') : console.log(data);
        for(let i = 0; i < pagination.last_visible_page; i++) {
            writeCSVRow(data);
        }
        return {pagination, data}
    }
    return null

}