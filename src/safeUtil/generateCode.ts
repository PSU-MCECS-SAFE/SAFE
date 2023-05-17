import QRCode from 'qrcode';
import { PoolClient, QueryResult } from 'pg';

export class Code {

    /**
     * Get a unique code correlating to a response in the database.
     * @param client The database to connect to
     * @param table The table to query
     * @param code Optional pre-defined code to use
     * @returns A unique code correlating to a response in the database
     */
    public static async genCode(client: PoolClient, table: string = "Message", code: string = ""): Promise<string> {
        const max_code_length: number = 64;
        const min_code_length: number = 32;
        const dictionary: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("").sort().join("");


        // Generate random code
        let code_combination: number[] = ((code.length < min_code_length) || (code.length > max_code_length)) ? Code.initCodeCombination(Code.randInt(max_code_length, min_code_length), dictionary) : Code.renderCodeCombination(code, dictionary);

        await Code.getCode(client, table, code_combination, dictionary);

        return Code.renderCode(code_combination, dictionary);
    }

    /**
     * Generate random initial code to use
     * @param code_length Length of the code to be generated
     * @param dictionary The character set to use
     * @returns A random code combination
     */
    private static initCodeCombination(code_length: number, dictionary: string) : number[] {
        let code_combination = [];
        for (let i: number = 0; i < code_length; i++) {
            code_combination.push(Code.randInt(dictionary.length - 1));
        }
        return code_combination;
    }

    /**
     * Iterate through code combination until a code is available
     * @param client The database to connect to
     * @param table The table to query
     * @param code_combination code combination being evaluated
     * @param dictionary The character set to use
     * @param index Placement in the code combination
     * @returns true if the code is available, otherwise false
     */
    private static async getCode(client: PoolClient, table: string, code_combination: number[], dictionary: string, index: number = 0): Promise<boolean> {
        let isAvailable: boolean = false;
        if (index === code_combination.length - 1) {
            // We are at the last index in the array
            isAvailable = await Code.queryCodes(client, table, code_combination, dictionary);
        } else {
            let init: number = code_combination[index];
            let i: number = (init !== (dictionary.length - 1)) ? (init + 1) : 0;
            do {
                isAvailable = await Code.getCode(client, table, code_combination, dictionary, index + 1);
                if (isAvailable) {
                    break;
                }
                i = (i !== (dictionary.length - 1)) ? (i + 1) : 0;
                code_combination[index] = i;
            } while (i !== init);
        }
        return isAvailable;
    }

    /**
     * Query table and iterate through code combinations to find available codes
     * @param client The database to connect to
     * @param table The table to query
     * @param code_combination code combination being evaluated
     * @param dictionary The character set to use
     * @returns true if the code is available, otherwise false
     */
    private static async queryCodes(client: PoolClient, table: string, code_combination: number[], dictionary: string): Promise<boolean> {
        var isAvailable: boolean = false;
        var existing_codes: string[] = [];
        var existing_code_dates: Date[] = [];

        const query = {
            rowMode: 'array',
            text: 'SELECT code, time_submitted FROM $1 WHERE code LIKE $2 AND char_length(code) = $3;',
            values: [table, String(Code.renderCode(code_combination, dictionary).slice(0, code_combination.length - 1) + "%"), code_combination.length],
        }
        var queryResult: QueryResult<any> = await client.query(query);

        if (queryResult.rowCount === 0) {
            isAvailable = true;
        }else{
            for(var row: number = 0; row < queryResult.rowCount; row++){
                existing_codes.push(queryResult.rows[row][0]);
                existing_code_dates.push(new Date(queryResult.rows[row][1]));
            }
        }

        for(var i: number = 0; i < dictionary.length && !isAvailable; i++){
            code_combination[code_combination.length - 1] = i;
            isAvailable = await Code.isAvailable(client, table, code_combination, dictionary, existing_codes, existing_code_dates);
        }

        return isAvailable;
    }
    /**
     * Query table and iterate through code combinations to find available codes
     * @param client The database to connect to
     * @param table The table to query
     * @param code_combination code combination being evaluated
     * @param dictionary The character set to use
     * @param existing_codes A list of codes that exist in the database similar to the given code combination
     * @param existing_code_dates List of timestamps for codes in existing_codes
     * @returns true if the code is available, otherwise false
     */
    private static async isAvailable(client: PoolClient, table: string, code_combination: number[], dictionary: string, existing_codes: string[], existing_code_dates: Date[]): Promise<boolean> {
        var isAvailable: boolean = false;
        if(!existing_codes.includes(Code.renderCode(code_combination, dictionary))){
            isAvailable = true;
        }else if ((new Date().getFullYear() - existing_code_dates[existing_codes.findIndex(e => e === Code.renderCode(code_combination, dictionary))].getFullYear()) > 10){
            isAvailable = true;
            const query = {
                rowMode: 'array',
                text: 'UPDATE $1 SET code = NULL WHERE code = $2;',
                values: [table, String(Code.renderCode(code_combination, dictionary))],
            }
            await client.query(query);
        }
        return isAvailable;
    }

    /**
     * Generate random number within a range
     * @param max The highest possible number
     * @param min The lowest possible number, default is 0
     * @returns A random number between max and min (inclusive)
     */
    private static randInt(max: number, min: number = 0): number {
        // Make sure min and max are integers
        max = Math.floor(max + 1);
        min = Math.floor(min);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    /**
     * Convert code combination to code based on dictionary
     * @param code_combination code combination being evaluated
     * @param dictionary The character set to use
     * @returns The code correlating to the code combination
     */
    private static renderCode(code_combination: number[], dictionary: string): string {
        let code: string = "";
        code_combination.forEach(char => {
            code += (dictionary[char]);
        });
        return code;
    }

     /**
      * Convert code to code combination based on dictionary
      * @param code code being evaluated
      * @param dictionary The character set to use
      * @returns The code combination correlating to the code
      */
    private static renderCodeCombination(code: string, dictionary: string) {
        let code_combination = [];
        for(var i = 0; i < code.length; i++){
            code_combination.push(dictionary.indexOf(code[i]));
        }
        return code_combination;
    }
}