import { UploadCsv } from './uploadCsv';
describe('UploadCsv', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="loading" class="spinner-border" role="status" style="display:none;"></div>
        `;
    });

    test('parseInfo show spinner and call ParseCSV.csvParse', () => {
        const file = new File(['a,b\n1,2'], 'test.csv', { type: 'text/csv' });
        const uploader = new UploadCsv(file);

        uploader.parseInfo();

        const spinner = document.getElementById('loading') as HTMLDivElement;
        expect(spinner.style.display).toBe('block');
    });
});