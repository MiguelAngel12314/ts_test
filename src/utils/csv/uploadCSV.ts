import { UploadCsv } from "../../csv/uploadCsv";

/**
 * @classdesc This class identfy is CSV
 */

export class UploadCSV {
    file: File = new File([], '');
    constructor(file: File) {
        this.file = file;
    }

    /**
     * @description Identify if is a CSV File
     * @returns null
     */
    setFile() {
        if (this.file.type !== "text/csv") {
            return;
        }

        const uploadCSV = new UploadCsv(this.file);
        uploadCSV.parseInfo();
    }


}