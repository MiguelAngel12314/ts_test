import { ParseCSV } from "./parseCSV";
import { parse } from "papaparse";
import { dataTab } from '../mocks/dataTable.mock';

jest.mock("papaparse", () => ({ parse: jest.fn() }));

describe('ParseCSV', () => {
    beforeEach(() => {
        document.body.innerHTML = `
        <table class="table">

                <!-- Dinamyc table headers -->
                <thead>
                    <tr id="header-table">
                    </tr>
                </thead>

                <!-- Dinamyc table rows -->
                <tbody id="data-table">
                </tbody>
            </table>
        <div class="text-center">
            <div id="loading" class="spinner-border" role="status" style="width: 3rem; height: 3rem; display: none;"></div>
            <div class="alert alert-danger" role="alert" id="alertError" style="display: none;"></div>
        </div>
        `;
        (parse as jest.Mock).mockClear();
    });

    test('Create class ParseCSV', () => {
        const spy = jest.spyOn(ParseCSV.prototype, 'chunkData');
        const spinner = document.getElementById('loading') as HTMLDivElement;
        const file = new File(['a,b\n1,2'], 'test.csv', { type: 'text/csv' });
        const parser = new ParseCSV(file, spinner);
        const result = {
            data: dataTab
        }
        parser.chunkData(result);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    })

    test('Call papaparse.parse in method (chunk/complete)', () => {
        const parseMock = parse as jest.Mock;
        parseMock.mockImplementation((file: File, options: any) => {
            options.chunk && options.chunk({ data: [['col1', 'col2'], ['a', '1'], ['b', '2']] });
            options.complete && options.complete({});
        });

        const spinner = document.getElementById('loading') as HTMLDivElement;
        const file = new File(['a,b\n1,2'], 'test.csv', { type: 'text/csv' });
        const parser = new ParseCSV(file, spinner);

        parser.csvParse();

        expect(parseMock).toHaveBeenCalled();
        const callArgs = parseMock.mock.calls[0];
        expect(callArgs[0]).toBe(file);

        const opts = callArgs[1];
        expect(typeof opts.chunk).toBe('function');
        expect(typeof opts.complete).toBe('function');
    });

    test('Hide sppiner when completed', () => {
        const parseMock = parse as jest.Mock;
        parseMock.mockImplementation((file: File, options: any) => {
            options.complete && options.complete({});
        });

        const spinner = document.getElementById('loading') as HTMLDivElement;
        spinner.style.display = 'none';
        const file = new File(['x'], 'f.csv', { type: 'text/csv' });
        const parser = new ParseCSV(file, spinner);

        parser.csvParse();

        // Después de complete el spinner debería quedar oculto
        expect(spinner.style.display).toBe('none');
    });

    test('When papaparse create error callback console.error', () => {
        const parseMock = parse as jest.Mock;
        parseMock.mockImplementation((file: File, options: any) => {
            options.error && options.error(new Error('mock error'));
        });

        const spinner = document.getElementById('loading') as HTMLDivElement;
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        const file = new File(['x'], 'f.csv', { type: 'text/csv' });
        const parser = new ParseCSV(file, spinner);
        parser.csvParse();

        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    });
});