import { parse } from "papaparse";
import { DataTableInterface } from "../interfaces/DataTable.interface";
import { HeaderTable } from "./headerTable";
import { RowTable } from "./rowTable";
import { ClearDataTable } from './../utils/clearDataTable';
import { ErrorMessage } from "./../utils/alerts/error";
export class ParseCSV {
    file: File;
    spinner: HTMLDivElement;
    constructor(file: File, spinner: HTMLDivElement) {
        this.file = file
        this.spinner = spinner;
    }

    /**
     * use module papa parser
     */
    csvParse() {
        parse(this.file, {
            worker: true,
            // preview: 40,
            skipEmptyLines: true,
            chunk: this.chunkData,
            complete: () => {
                this.spinner.style.display = 'none';
            },
            error: (error) => {
                console.error("Error parsing CSV:", error);
            }
        });
    }

    /**
     * @description Build data table
     * @param result DataTable
     */
    chunkData(result: DataTableInterface) {
        const dataTable = result.data;
        const headerTable = new HeaderTable(dataTable);
        const rowTable = new RowTable(dataTable);
        const clearDataTable = new ClearDataTable();
        try {
            headerTable.dataRow();
            rowTable.rowTable();

        } catch (e) {
            const errorMsg = new ErrorMessage();
            errorMsg.setMessage('CSV Invalido');
            clearDataTable.clear();
            console.log('Error', e);

        }
    }
}