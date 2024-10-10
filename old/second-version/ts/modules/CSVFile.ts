const csvData: string[] = [];

// Define column headers
const columnHeaders = [
    'Titulo',
    'Temporada',
    'Estudios',
    'Temas',
    'Generos',
    'Estreia',
    'Transmissão',
    'Nota',
    'Qntd Avaliações',
    'Faixa-etaria',
    'Qntd de Membros',
    'Favoritado por',
    'Produtores',
    'Distribuidores'
];

// Adiciona as colunas de título à primeira linha do arquivo CSV
csvData.push(columnHeaders.join(';'));

export default csvData;