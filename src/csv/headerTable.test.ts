import { HeaderTable } from "./headerTable";
import { dataTab } from "./../mocks/dataTable.mock";
import * as sinon from 'sinon';

describe("Class Header Table", () => {
    const dataTable: string[][] = dataTab;
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
    test("Create Data Row in the table", () => {
        const spy = jest.spyOn(HeaderTable.prototype, 'dataRow');
        const headerTable = new HeaderTable(dataTable);
        headerTable.dataRow();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        spy.mockRestore()

    })

    test('Create Dom header table', () => {
        const spy = jest.spyOn(HeaderTable.prototype, 'headerTable');
        const headerTable = new HeaderTable(dataTable);
        headerTable.headerTable('Table', 1);

        expect(spy).toHaveBeenCalled();
    })

    test('Render Headers and add listeners to <th>', () => {
        const spyOnClick = jest.spyOn(HeaderTable.prototype, 'onHeaderClick');
        const header = new HeaderTable(dataTab);
        header.dataRow();

        const th = document.querySelector('th[data-col="0"]') as HTMLElement | null;
        expect(th).not.toBeNull();

        th?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(spyOnClick).toHaveBeenCalled();
        spyOnClick.mockRestore();
    });

    test('header table dataTable Empty sort', () => {
        const spy = jest.spyOn(HeaderTable.prototype, 'headerTable');
        const dataTab: string[][] = []
        const headerTable = new HeaderTable(dataTab);
        headerTable.headerTable('Table', 1);
        expect(spy).toHaveBeenCalled();
    })

    test('header table dataTable validate null Data in sort', () => {
        const spy = jest.spyOn(HeaderTable.prototype, 'headerTable');
        const dataTab: any[][] = [[null, null], [null, null]]
        const headerTable = new HeaderTable(dataTab);
        headerTable.headerTable('Table', 1);
        expect(spy).toHaveBeenCalled();
    })

    test('Return HeaderTable tag HTML', () => {
        const tagMock = '<th data-col="1" style="cursor:pointer;">Table<i class="bi bi-arrow-up"></th>'
        const spy = jest.spyOn(HeaderTable.prototype, 'headerTable');
        const headerTable = new HeaderTable(dataTable);
        const htable = headerTable.headerTable('Table', 1);
        expect(htable).toBe(tagMock);
    })

    test('Create Dom header onHeaderClick', () => {
        const spy = jest.spyOn(HeaderTable.prototype, 'onHeaderClick');
        const headerTable = new HeaderTable(dataTable);
        headerTable.onHeaderClick(1);

        expect(spy).toHaveBeenCalled();
    })

    test('onHeaderClick desc sort in datatable', () => {
        const spy = jest.spyOn(HeaderTable.prototype, 'onHeaderClick');
        const headerTable = new HeaderTable(dataTable);
        headerTable.sortState = [true]
        headerTable.onHeaderClick(0);

        expect(spy).toHaveBeenCalled();
    })
    test('onHeaderClick desc sort in datatable', () => {
        const spy = jest.spyOn(HeaderTable.prototype, 'onHeaderClick');
        const headerTable = new HeaderTable(dataTable);
        headerTable.sortState = [false, true]
        headerTable.onHeaderClick(0);

        expect(spy).toHaveBeenCalled();
    })

    test('Create Dom header updateHeaderIcons', () => {
        const spy = jest.spyOn(HeaderTable.prototype, 'updateHeaderIcons');
        const headerTable = new HeaderTable(dataTable);
        headerTable.updateHeaderIcons(1, true);

        expect(spy).toHaveBeenCalled();
    })

    test('header updateHeaderIcons map 2 or more Elements', () => {
        const hTable = document.getElementById('header-table') as HTMLTableElement;
        hTable.innerHTML = `
            <th data-col="1" style="cursor:pointer;">Table<i class="bi bi-arrow-up"></th>
            <th data-col="1" style="cursor:pointer;">Table<i class="bi bi-arrow-up"></th>
        `;
        const spy = jest.spyOn(HeaderTable.prototype, 'updateHeaderIcons');
        const headerTable = new HeaderTable(dataTable);
        headerTable.updateHeaderIcons(1, true);
        expect(spy).toHaveReturned();
    })

    test('header updateHeaderIcons no contain icon', () => {
        const hTable = document.getElementById('header-table') as HTMLTableElement;
        hTable.innerHTML = `
            <th data-col="1" style="cursor:pointer;">Table</th>
            <th data-col="1" style="cursor:pointer;">Table</th>
        `;
        const spy = jest.spyOn(HeaderTable.prototype, 'updateHeaderIcons');
        const headerTable = new HeaderTable(dataTable);
        headerTable.updateHeaderIcons(1, true);
        expect(spy).toHaveReturned();
    })

    test('header updateHeaderIcons index is diferent to column', () => {
        const hTable = document.getElementById('header-table') as HTMLTableElement;
        hTable.innerHTML = `
            <th data-col="1" style="cursor:pointer;">Table<i class="bi bi-arrow-up"></th>
            <th data-col="2" style="cursor:pointer;">Table<i class="bi bi-arrow-up"></th>
        `;
        const spy = jest.spyOn(HeaderTable.prototype, 'updateHeaderIcons');
        const headerTable = new HeaderTable(dataTable);
        headerTable.updateHeaderIcons(2, true);
        expect(spy).toHaveReturned();
    })

    test('header updateHeaderIcons update icon down', () => {
        const hTable = document.getElementById('header-table') as HTMLTableElement;
        hTable.innerHTML = `
            <th data-col="1" style="cursor:pointer;">Table<i class="bi bi-arrow-up"></th>
            <th data-col="2" style="cursor:pointer;">Table<i class="bi bi-arrow-up"></th>
        `;
        const spy = jest.spyOn(HeaderTable.prototype, 'updateHeaderIcons');
        const headerTable = new HeaderTable(dataTable);
        headerTable.updateHeaderIcons(1, false);
        expect(spy).toHaveReturned();
    })

    test('header updateHeaderIcons no exist Element', () => {
        document.body.innerHTML = '';
        const spy = jest.spyOn(HeaderTable.prototype, 'updateHeaderIcons');
        const headerTable = new HeaderTable(dataTable);
        headerTable.updateHeaderIcons(1, true);
        expect(spy).toHaveReturned();
    })

});