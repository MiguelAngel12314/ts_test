import { RowTable } from "./rowTable";
import { SortTable } from "./sortTable";

export class HeaderTable {
    rows: string[][];
    sortState: Record<number, boolean> = {};
    sortTable: SortTable;
    constructor(dataTable: string[][]) {
        this.rows = dataTable;
        this.sortTable = new SortTable(this.rows)
    }

    /**
     * @description Build row of header table
     */
    dataRow() {
        const headerTable = document.getElementById("header-table") as HTMLTableElement;
        const row: string[] = this.rows[0];
        headerTable.innerHTML = `<tr>${row.map((header: string, idx) => this.headerTable(header, idx)).join('')}</tr>`;

        row.forEach((_, idx) => {
            const th = headerTable.querySelector(`th[data-col="${idx}"]`);
            th?.addEventListener('click', () => this.onHeaderClick(idx));
        });

    }

    /**
     * @description build header table
     * @param header string
     * @param idx number
     * @returns 
     */
    headerTable(header: string, idx: number): string {
        const tag = `<th data-col="${idx}" style="cursor:pointer;">${header}<i class="bi bi-arrow-up"></th>`;
        this.sortTable.sort(idx)
        return tag
    }

    /**
     * @description sort asc and desc table
     * @param idx index
     */
    async onHeaderClick(idx: number) {
        const current = this.sortState[idx];
        const newAsc = current === undefined ? true : !current;
        const rowT = new RowTable(this.rows);
        this.sortState[idx] = newAsc;
        await this.sortTable.sort(idx, newAsc);
        await rowT.rowTable();
        this.updateHeaderIcons(idx, newAsc);
    }

    /**
     * @description change icon arrow up or arrow down
     * @param activeIdx number
     * @param asc boolean
     * @returns void
     */
    updateHeaderIcons(activeIdx: number, asc: boolean) {
        const headerTable = document.getElementById("header-table") as HTMLTableElement;
        if (!headerTable) return;
        const ths = headerTable.querySelectorAll('th');
        ths.forEach(th => {
            const icon = th.querySelector('i');
            if (!icon) return;
            const col = Number((th as HTMLElement).dataset.col);
            if (col === activeIdx) {
                if (asc) {
                    icon.className = 'bi bi-arrow-up';
                } else {
                    icon.className = 'bi bi-arrow-down';
                }
            } else {
                icon.className = 'bi bi-arrow-up';
            }
        });
    }

}