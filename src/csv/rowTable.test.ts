import { RowTable } from './rowTable';
import { dataTab } from "./../mocks/dataTable.mock";
describe('Class row table', () => {
    const elementHTML = `
        <table class="table">

                <!-- Dinamyc table headers -->
                <thead>
                    <tr id="header-table">
                    </tr>
                </thead>

                <!-- Dinamyc table rows -->
                <tbody id="data-table">
                </tbody>
            </table>
    `;
    beforeEach(() => {
        document.body.innerHTML = elementHTML;
    })
    test('create class', () => {
        const spy = jest.spyOn(RowTable.prototype, 'rowTable');
        const rowTable = new RowTable(dataTab);
        rowTable.rowTable();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    test('validate cellRow', () => {
        const spy = jest.spyOn(RowTable.prototype, 'cellRow');
        const rowTable = new RowTable(dataTab);
        rowTable.cellRow('item');
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);

    });

    test('Instans and method rowTable is called', () => {
        const spy = jest.spyOn(RowTable.prototype, 'rowTable');
        const rowTable = new RowTable(dataTab);
        rowTable.rowTable();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });

    test('cellRow returns markup <td>', () => {
        const rowTable = new RowTable(dataTab);
        const td = rowTable.cellRow('item');
        expect(td).toContain('<td>');
        expect(td).toContain('item');
        expect(td).toContain('</td>');
    });

    test('rowTable renders rows in tbody', () => {
        const rowTable = new RowTable(dataTab);
        const tbody = document.getElementById('data-table') as HTMLTableSectionElement;
        expect(tbody).not.toBeNull();

        expect(tbody.innerHTML.replace(/\s/g, '')).toBe('');
        tbody.innerHTML = `trabajador`;
        const html = tbody.innerHTML;
        const expectedCell = dataTab[0][0];

        rowTable.rowTable();
        expect(html).toContain(expectedCell);
    });



})