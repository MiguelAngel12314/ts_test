/**
 * @classdesc Show the error message in DOM
 */

export class ErrorMessage {
    alertError: HTMLDivElement = document.getElementById('alertError') as HTMLDivElement;

    /**
     * @description function message
     * @param message string
     */
    setMessage(message: string) {
        this.alertError.textContent = message;
        this.buildAlert();
        // this.alertError.textContent = 'CSV invalido';
    }

    /**
     * @description show message in the DOM
     */
    buildAlert() {
        this.alertError.style.display = 'block';
    }

    /**
     * @description Hide message in the DOM
     */
    destroyAlert() {
        this.alertError.style.display = 'none';
    }
}