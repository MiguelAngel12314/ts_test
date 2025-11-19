/**
 * @classdesc This class apply asc and desc
 */
export class SortTable {
    dataTable: string[][];
    constructor(dataTable: string[][]) {
        this.dataTable = dataTable;
    }

    /**
     * @description apply sort per columns
     * @param idx index of row
     * @param asc boolean
     * @returns void
     */
    async sort(idx: number, asc: boolean = true) {

        if (!this.dataTable || this.dataTable.length === 0) return;

        const comparator = (newValue: string[], oldValue: string[]) => {
            const va = (newValue[idx] ?? '').toString();
            const vb = (oldValue[idx] ?? '').toString();

            const na = parseFloat(va.replace(',', '.'));
            const nb = parseFloat(vb.replace(',', '.'));

            if (!isNaN(na) && !isNaN(nb)) {
                return asc ? na - nb : nb - na;
            }

            return asc
                ? va.localeCompare(vb, undefined, { numeric: true, sensitivity: 'base' })
                : vb.localeCompare(va, undefined, { numeric: true, sensitivity: 'base' });
        };

        this.dataTable.sort(comparator);
    }
}