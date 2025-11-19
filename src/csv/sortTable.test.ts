import { SortTable } from "./sortTable";
import { dataTab } from "./../mocks/dataTable.mock";
describe('SortTable', () => {
    test('asc order numeric in column', async () => {
        const data = [
            ['id', '10'],
            ['id2', '2'],
            ['id3', '30'],
            ['id4', '1']
        ];
        const sorter = new SortTable(data);
        await sorter.sort(1, true);
        expect(data.map(r => r[1])).toEqual(['1', '2', '10', '30']);
    });

    test('desc order numeric in column', async () => {
        const data = [
            ['id', '10'],
            ['id2', '2'],
            ['id3', '30'],
            ['id4', '1']
        ];
        const sorter = new SortTable(data);
        await sorter.sort(1, false);
        expect(data.map(r => r[1])).toEqual(['30', '10', '2', '1']);
    });

    test('order string in column', async () => {
        const data = dataTab;
        const sorter = new SortTable(data);
        await sorter.sort(1, true);
        expect(data.map(r => r[0])).toEqual(['NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'Pablo', 'Nico', "Rocío", "Laura", "Miguel", "Odi", "David", "Marcos", "Sara", "Yogui", "trabajador"]);

        await sorter.sort(1, false);
        expect(data.map(r => r[0])).toEqual(["trabajador", "Yogui", "Sara", "Marcos", "David", "Odi", "Miguel", "Laura", "Rocío", "Nico", "Pablo", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA",]);
    });

    test('decimal numeric', async () => {
        const data = [
            ['a', '1,5'],
            ['b', '2.3'],
            ['c', '0,75']
        ];
        const sorter = new SortTable(data);
        await sorter.sort(1, true);
        expect(data.map(r => r[1])).toEqual(['0,75', '1,5', '2.3']);
    });

    test('invalid column in the table', async () => {
        const original = [
            ['a', 'one'],
            ['b', 'two'],
            ['c', 'three']
        ];
        const data = JSON.parse(JSON.stringify(original));
        const sorter = new SortTable(data);
        await sorter.sort(99, true); // índice fuera de rango
        expect(data).toEqual(original);
    });

    test('Empty table', async () => {
        const data: string[][] = [];
        const sorter = new SortTable(data);
        await sorter.sort(0, true);
        expect(sorter.dataTable).toEqual([]);
    });
});