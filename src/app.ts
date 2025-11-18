import { Upload } from "./utils/upload";
export class App {
    constructor() {
        this.uploadFile();
    }

    /**
     * @description Input from upload File
     * @returns void
     */
    uploadFile(): void {
        const fileInput = document.getElementById("upload-file") as HTMLInputElement;
        fileInput.addEventListener("change", () => {
            console.log(fileInput.files?.length, 'fids');

            if (fileInput.files && fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const uploadFile = new Upload(file);
                uploadFile.setFile();
            }
        })
    }
}