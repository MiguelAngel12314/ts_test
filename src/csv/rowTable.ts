export class RowTable {
    dataTable: string[][];
    constructor(dataTable: string[][]) {
        this.dataTable = dataTable;
    }

    /**
     * @description build rows in table
     */
    rowTable() {
        const dataTable = document.getElementById("data-table") as HTMLTableElement;
        // this.dataTable.shift();
        dataTable.innerHTML = this.dataTable.map((cell: string[]) => `<tr>${cell.map(c => this.cellRow(c)).join('')}</tr>`).join('');
    }

    /**
     * @description Build Cell in row
     * @param cell string
     * @returns string
     */
    cellRow(cell: string): string {
        return `<td>${cell} </td>`;
    }
}