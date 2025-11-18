import { HandleErrors } from '../Helpers/Errors';
import { ErrorMessage } from './alerts/error';
import { UploadCSV } from './csv/uploadCSV';
import { ClearDataTable } from "./clearDataTable";

/**
 * @classdesc This class Upload File
 * @method setFile
 * @method typeF
 */
export class Upload {
    fileT: File = new File([], '');
    constructor(file: File) {
        this.fileT = file;
    }

    /**
     * @description Obtain file
     */
    setFile(): void {
        this.typeF()
    }

    /**
     * @type private
     * @description Identify format file
     */
    private typeF() {
        const { type } = this.fileT;
        const errorMsg = new ErrorMessage();
        const clearDataTable = new ClearDataTable();
        errorMsg.destroyAlert();
        switch (type) {
            case 'text/csv':
                const uploadCSV = new UploadCSV(this.fileT)
                uploadCSV.setFile();
                break;
            default:
                const errorInvalidFile = new HandleErrors();
                const err = errorInvalidFile.errorFileInvalid();
                errorMsg.setMessage(err.message);
                clearDataTable.clear();
                break;
        }
    }
}