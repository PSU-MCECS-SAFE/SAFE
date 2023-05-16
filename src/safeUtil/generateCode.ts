import QRCode from 'qrcode';
import { PoolClient, QueryResult } from 'pg';

export class Code {

    public static async genCode(client: PoolClient, code: string = ""): Promise<string> {
        const max_code_length: number = 64;
        const min_code_length: number = 32;
        const dictionary: string = Code.sortChars("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");


        // Generate random code
        let code_combination: number[] = ((code.length < min_code_length) || (code.length > max_code_length)) ? Code.initCodeCombination(Code.randInt(max_code_length, min_code_length), dictionary) : Code.renderCodeCombination(code, dictionary);

        await Code.getCode(client, code_combination, dictionary);

        return Code.renderCode(code_combination, dictionary);
    }

    private static initCodeCombination(code_length: number, dictionary: string) : number[] {
        let code_combination = [];
        for (let i: number = 0; i < code_length; i++) {
            code_combination.push(Code.randInt(dictionary.length - 1));
        }
        return code_combination;
    }

    private static async getCode(client: PoolClient, code_combination: number[], dictionary: string, index: number = 0): Promise<boolean> {
        let isAvailable: boolean = false;
        if (index === code_combination.length - 1) {
            // We are at the last index in the array
            isAvailable = await Code.queryCodes(client, code_combination, dictionary);
        } else {
            let init: number = code_combination[index];
            let i: number = (init !== (dictionary.length - 1)) ? (init + 1) : 0;
            do {
                isAvailable = await Code.getCode(client, code_combination, dictionary, index + 1);
                if (isAvailable) {
                    break;
                }
                i = (i !== (dictionary.length - 1)) ? (i + 1) : 0;
                code_combination[index] = i;
            } while (i !== init);
        }
        return isAvailable;
    }

    private static async queryCodes(client: PoolClient, code_combination: number[], dictionary: string): Promise<boolean> {
        var isAvailable: boolean = false;
        const query = {
            rowMode: 'array',
            text: 'SELECT code, time_submitted FROM "Message" WHERE code LIKE $1 AND char_length(code) = $2;',
            values: [String(Code.renderCode(code_combination, dictionary).slice(0, code_combination.length - 1) + "%"), code_combination.length],
        }
        var queryResult: QueryResult<any> = await client.query(query);
        isAvailable = (queryResult.rowCount === 0) ? true : await Code.checkCombinations(client, queryResult, code_combination, dictionary);
        return isAvailable;
    }

    private static async checkCombinations(client: PoolClient, queryResult: QueryResult<any>, code_combination: number[], dictionary: string): Promise<boolean> {
        var isAvailable: boolean = false;
        var existing_codes: string[] = [];
        var existing_code_dates: Date[] = [];
        for(var row: number = 0; row < queryResult.rowCount; row++){
            existing_codes.push(queryResult.rows[row][0]);
            existing_code_dates.push(new Date(queryResult.rows[row][1]));
        }
        for(var i: number = 0; i < dictionary.length; i++){
            code_combination[code_combination.length - 1] = i;
            if(await Code.isAvailable(client, code_combination, dictionary, existing_codes, existing_code_dates)){
                isAvailable = true;
                break;
            }
        }
        return isAvailable;
    }

    private static async isAvailable(client: PoolClient, code_combination: number[], dictionary: string, existing_codes: string[], existing_code_dates: Date[]): Promise<boolean> {
        var isAvailable: boolean = false;
        if(!existing_codes.includes(Code.renderCode(code_combination, dictionary))){
            isAvailable = true;
        }else if ((new Date().getFullYear() - existing_code_dates[existing_codes.findIndex(e => e === Code.renderCode(code_combination, dictionary))].getFullYear()) > 10){
            isAvailable = true;
            const query = {
                rowMode: 'array',
                text: 'UPDATE "Message" SET code = NULL WHERE code = $1;',
                values: [String(Code.renderCode(code_combination, dictionary))],
            }
            await client.query(query);
        }
        return isAvailable;
    }

    private static randInt(max: number, min: number = 0) {
        // Make sure min and max are integers
        max = Math.floor(max + 1);
        min = Math.floor(min);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    private static renderCode(code_combination: number[], dictionary: string): string {
        let code: string = "";
        code_combination.forEach(char => {
            code += (dictionary[char]);
        });
        return code;
    }

    private static renderCodeCombination(code: string, dictionary: string) {
        let code_combination = [];
        for(var i = 0; i < code.length; i++){
            code_combination.push(dictionary.indexOf(code[i]));
        }
        return code_combination;
    }

    private static sortChars(str: string): string {
        let arr: string[] = [];
        for (let i: number = 0; i < str.length; i++) {
            arr.push(str[i]);
        }
        return arr.sort().join('');
    }

    public static genURL(page: string, code: string): string {
        if (page[page.length - 1] === "/") {
            page += ("/");
        }
        return page + "#" + code;
    }

    public static genQRcode(url: string) {
        let canvas = document.getElementById('qrcode');
        QRCode.toCanvas(canvas, url);
    }
}