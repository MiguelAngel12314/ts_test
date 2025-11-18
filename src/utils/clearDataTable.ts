/**
 * @classdesc this class Clear DataTable
 */

export class ClearDataTable {

    /**
     * @description clear DataTable
     */
    clear() {
        this.clearHaaders();
        this.clearRows();
    }

    /**
     * @description clear only headers dataTable
     */
    clearHaaders() {
        const headerTable = document.getElementById("header-table") as HTMLTableElement;
        headerTable.innerHTML = '';
    }

    /**
     * @description clear only rows dataTable
     */
    clearRows() {
        const row = document.getElementById("data-table") as HTMLTableElement;
        row.innerHTML = '';
    }
}