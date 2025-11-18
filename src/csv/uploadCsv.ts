import { ParseCSV } from "./parseCSV";

/**
 * @classdesc this class parse CSV
 */
export class UploadCsv {
    file: File;
    constructor(file: File) {
        this.file = file;
    }

    /**
     * @description transfer the information input from papaParse
     */
    parseInfo(): void {

        const spinner = document.getElementById('loading') as HTMLDivElement;
        spinner.style.display = 'block';
        const parseCSV = new ParseCSV(this.file, spinner);
        parseCSV.csvParse();

    }
}
