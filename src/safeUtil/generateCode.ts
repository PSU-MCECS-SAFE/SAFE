import Client from 'ts-postgres';
import { ResultRow } from 'ts-postgres/dist/src/result';
import messageDB from "../safeMessageDB/messageDB"
import QRCode from 'qrcode';

const dictionary: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

async function genCode(): Promise<string> {
    var code_combination: number[] = [];
    var code_length = randInt(65, 32);

    // TODO: Generate random code
    for (let i: number = 0; i < code_length; i++) {
        code_combination.concat(randInt(dictionary.length - 1));
    }

    code_combination = await verifyCode(code_combination, code_length);

    return renderCode(code_combination);
}

async function verifyCode(code_combination: number[], code_length: number): Promise<number[]> {
    // Check if random code exists in database already
    var query = "SELECT COUNT(*) FROM messages WHERE code = " + renderCode(code_combination);
    var msgs: ResultRow<Client.Value>[] = await messageDB.getMessage(query);

    if (msgs.length !== 0) {
        // Get "next" possible code
        code_combination = await getNextCode(code_combination, code_length);
    }

    return code_combination;
}

// TODO: Finish writing this function
async function getNextCode(code_combination: number[], code_length: number, index: number = 0): Promise<number[]> {
    /*
    var new_code_combination: number[] = [];
    if (index !== code_length) {
        new_code_combination = getNextCode(code_combination, code_length, index + 1);
    }
    if(code_combination === new_code_combination){
    }
    */
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
    max = Math.floor(max);
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
    var canvas = document.getElementById('canvas');
    QRCode.toCanvas(canvas, url);
}