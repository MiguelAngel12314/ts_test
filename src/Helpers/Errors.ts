/**
 * @classdesc type of Errors
 */

export class HandleErrors {

    /**
     * @description Error wnen file is not admit
     * @returns Error
     */
    errorFileInvalid(): Error {
        return new Error("Archivo no compatible, solo se admite CSV");
        ;
    }

    /**
     * @description Error when CSV is corrupt
     * @returns Error
     */
    errorCsvInvalid(): Error {
        return new Error('CSV Invalido')
    }
}