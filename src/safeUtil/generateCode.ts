import Client from 'ts-postgres';
import { ResultRow } from 'ts-postgres/dist/src/result';
import messageDB from "../safeMessageDB/messageDB"
import QRCode from 'qrcode';

const dictionary: string = sortChars("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");

function sortChars(str: string): string {
    var arr: string[] = [];
    for(var i: number = 0; i < str.length; i++){
        arr.concat(str[i]);
    }
    return arr.sort().toString();
}

async function genCode(): Promise<string> {
    var max: number = 64;
    var min: number = 32;
    var code_combination: number[] = [];
    var code_length = randInt(max, min);

    // TODO: Generate random code
    for (let i: number = 0; i < code_length; i++) {
        code_combination.concat(randInt(dictionary.length - 1));
    }

    // Check if code exists in database. Get "next" code if it exists in the database
    var query = "SELECT COUNT(*) FROM messages WHERE code = " + renderCode(code_combination) + ";";
    var msgs: ResultRow<Client.Value>[] = await messageDB.getMessage(query);
    if (msgs.length !== 0) {
        // Get "next" possible code
        code_combination = await getNextCode(code_combination, code_length, max, min);
    }

    return renderCode(code_combination);
}

async function checkCombinations(code_combination: number[], code_length: number): Promise<number[]> {
    var db: ResultRow<Client.Value>[] = await messageDB.getMessage( "SELECT code FROM messages WHERE code LIKE " +
                                                                    renderCode(code_combination.slice(0, code_combination.length - 2)) + " " +
                                                                    "AND char_length(messages.code) == " + code_combination.length +
                                                                    ";");
    var existing_codes: string[] = [];
    for (var row of db) {
        existing_codes.concat(String(row.get("code")));
    }
    // In the loop, we need to increment curr by 1, because we know that the code combination with curr isn't valid
    // All this does is cycle through every value in the dictionary until it reaches the original value
    var init: number = code_combination[code_combination.length - 1];
    var i: number = (init !== (dictionary.length - 1)) ? (init + 1) : 0;
    code_combination[code_length - 1] = i;
    do{
        if(!(existing_codes.includes(renderCode(code_combination)))){
            break;
        }
        i = (i !== (dictionary.length - 1)) ? (i + 1) : 0;
        code_combination[code_length - 1] = i;
    }while(i !== init);

    // Returns either a new, available code, or the original code if none is available
    return code_combination;
}

// TODO: Finish writing this function
async function getNextCode(code_combination: number[], code_length: number, max: number, min: number, index: number = 0): Promise<number[]> {
    var new_code_combination: number[] = code_combination;
    var init: number = code_combination[code_combination.length - 1];
    var i: number = (init !== (dictionary.length - 1)) ? (init + 1) : 0;
    if (index === code_length - 1) {
        // We are at the last index in the array
        await checkCombinations(code_combination, code_length);
    }else{
        do{
            new_code_combination = await getNextCode(code_combination, code_length, max, min, index + 1);
            if (new_code_combination === code_combination){
                new_code_combination[index] = (code_combination[index] === dictionary.length - 1) ? (i - dictionary.length) : (i + 1);
            }
        }while(code_combination === new_code_combination);
    }
    new_code_combination = await getNextCode(code_combination, code_length, max, min, index + 1);
    return code_combination;
}

function renderCode(code_combination: number[]): string {
    var code: string = "";
    code_combination.forEach(char => {
        code.concat(dictionary[char]);
    });
    return code;
}

function randInt(max: number, min: number = 0) {
    // Make sure min and max are integers
    max = Math.floor(max + 1);
    min = Math.floor(min);
    return Math.floor(Math.random() * (max - min)) + min;
}

function genURL(page: string, code: string): string {
    if (page[page.length - 1] === "/") {
        page.concat("/");
    }
    return page + "#" + code;
}

function genQRcode(url: string) {
    var canvas = document.getElementById('qrcode');
    QRCode.toCanvas(canvas, url);
}