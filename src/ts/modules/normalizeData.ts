export function isSeason(data: unknown): data is seasonInfo {
    if (data && typeof data === 'object' && 'pagination' in data && 'data' in data) {
        return true;
    } else {
        return false;
    }
}

export function formatArray(array: genericInfo[]) {
    if (array instanceof Array && array.length > 0) {
        return array.map((obj) => obj['name']).join('|');
    } else {
        return 'N/A';
    }
}