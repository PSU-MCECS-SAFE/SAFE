import Client from 'ts-postgres';
import { ResultRow } from 'ts-postgres/dist/src/result';
import messageDB from "../safeMessageDB/messageDB"
import QRCode from 'qrcode';

export class Code {

    private static sortChars(str: string): string {
        var arr: string[] = [];
        for (var i: number = 0; i < str.length; i++) {
            arr.concat(str[i]);
        }
        return arr.sort().toString();
    }

    public static async genCode(): Promise<string> {
        var max: number = 64;
        var min: number = 32;
        var code_combination: number[] = [];
        var code_length = Code.randInt(max, min);
        var dictionary: string = Code.sortChars("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");

        // TODO: Generate random code
        for (let i: number = 0; i < code_length; i++) {
            code_combination.concat(Code.randInt(dictionary.length - 1));
        }

        // Check if code exists in database. Get "next" code if it exists in the database
        var query = "SELECT COUNT(*) FROM messages WHERE code = " + Code.renderCode(code_combination, dictionary) + ";";
        var msgs: ResultRow<Client.Value>[] = await messageDB.getMessage(query);
        if (msgs.length !== 0) {
            // Get "next" possible code
            code_combination = await Code.getNextCode(code_combination, code_length, dictionary, max, min);
        }

        return Code.renderCode(code_combination, dictionary);
    }

    private static async checkCombinations(code_combination: number[], code_length: number, index: number, dictionary: string): Promise<number[]> {
        var db: ResultRow<Client.Value>[] = await messageDB.getMessage("SELECT code FROM messages WHERE code LIKE " +
            Code.renderCode(code_combination.slice(0, code_combination.length - 2), dictionary) + " " +
            "AND char_length(messages.code) == " + code_combination.length +
            ";");
        var existing_codes: string[] = [];
        for (var row of db) {
            existing_codes.concat(String(row.get("code")));
        }
        // In the loop, we need to increment curr by 1, because we know that the code combination with curr isn't valid
        // All this does is cycle through every value in the dictionary until it reaches the original value
        var init: number = code_combination[index];
        var i: number = (init !== (dictionary.length - 1)) ? (init + 1) : 0;
        code_combination[index] = i;
        do {
            if (!(existing_codes.includes(Code.renderCode(code_combination, dictionary)))) {
                break;
            }
            i = (i !== (dictionary.length - 1)) ? (i + 1) : 0;
            code_combination[index] = i;
        } while (i !== init);

        // Returns either a new, available code, or the original code if none is available
        return code_combination;
    }

    // TODO: Clean up this code, it could definitely be combined with checkCombinations somehow
    private static async getNextCode(code_combination: number[], code_length: number, dictionary:string, max: number, min: number, index: number = 0): Promise<number[]> {
        if (index === code_length - 1) {
            // We are at the last index in the array
            await Code.checkCombinations(code_combination, code_length, index, dictionary);
        } else {
            var init: number = code_combination[index];
            var i: number = (init !== (dictionary.length - 1)) ? (init + 1) : 0;
            do {
                var new_code_combination: number[] = await Code.getNextCode(code_combination, code_length, dictionary, max, min, index + 1);
                if (code_combination !== new_code_combination) {
                    code_combination = new_code_combination;
                    break;
                }
                i = (i !== (dictionary.length - 1)) ? (i + 1) : 0;
                code_combination[index] = i;
            } while (i !== init);
        }
        return code_combination;
    }

    private static renderCode(code_combination: number[], dictionary: string): string {
        var code: string = "";
        code_combination.forEach(char => {
            code.concat(dictionary[char]);
        });
        return code;
    }

    private static randInt(max: number, min: number = 0) {
        // Make sure min and max are integers
        max = Math.floor(max + 1);
        min = Math.floor(min);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    public static genURL(page: string, code: string): string {
        if (page[page.length - 1] === "/") {
            page.concat("/");
        }
        return page + "#" + code;
    }

    public static genQRcode(url: string) {
        var canvas = document.getElementById('qrcode');
        QRCode.toCanvas(canvas, url);
    }
}