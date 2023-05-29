import { PoolClient, QueryResult } from "pg";

export class Code {
  /**
   * Get a unique code correlating to a response in the database.
   * @param client The database to connect to
   * @param table The table to query
   * @param code Optional pre-defined code to use
   * @returns A unique code correlating to a response in the database
   */
  public static async genCode(
    client: PoolClient,
    table: string = "Message",
    code: string = ""
  ): Promise<string> {
    const max_code_length: number = 64;
    const min_code_length: number = 32;
    // The dictionary is the character set for generating codes
    const dictionary: string =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
        .split("")
        .sort()
        .join("");

    // Generate random code, or use the one provided
    let code_combination: number[] =
      code.length < min_code_length || code.length > max_code_length
        ? this.initCodeCombination(
            this.randInt(max_code_length, min_code_length),
            dictionary
          )
        : this.renderCodeCombination(code, dictionary);

    // Verify random code is available, or get new code instead
    await this.getCode(client, table, code_combination, dictionary);

    return this.renderCode(code_combination, dictionary);
  }

  /**
   * Generate random initial code to use
   * @param code_length Length of the code to be generated
   * @param dictionary The character set to use
   * @returns A random code combination
   */
  private static initCodeCombination(
    code_length: number,
    dictionary: string
  ): number[] {
    let code_combination = [];
    for (let i: number = 0; i < code_length; i++) {
      // Insert random character from dictionary
      code_combination.push(this.randInt(dictionary.length - 1));
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
  private static async getCode(
    client: PoolClient,
    table: string,
    code_combination: number[],
    dictionary: string,
    index: number = 0
  ): Promise<boolean> {
    let isAvailable: boolean = false;
    if (index === code_combination.length - 1) {
      // We are at the last index in the array
      isAvailable = await this.queryCodes(
        client,
        table,
        code_combination,
        dictionary
      );
    } else {
      // init is the value of the character at this index value
      let init: number = code_combination[index];
      // init is the value of the next character in the dictionary, after init
      let i: number = init !== dictionary.length - 1 ? init + 1 : 0;

      // Cycle through all the characters in the dictionary
      do {
        isAvailable = await this.getCode(
          client,
          table,
          code_combination,
          dictionary,
          index + 1
        );
        if (isAvailable) {
          break;
        }
        // i is set to 0 if it is set to the last value of the dictionary.
        // i increments by 1 otherwise
        i = i !== dictionary.length - 1 ? i + 1 : 0;
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
  private static async queryCodes(
    client: PoolClient,
    table: string,
    code_combination: number[],
    dictionary: string
  ): Promise<boolean> {
    var isAvailable: boolean = false;
    var existing_codes: string[] = [];
    var existing_code_dates: Date[] = [];

    const code: string = this.renderCode(code_combination, dictionary).slice(
      0,
      code_combination.length - 1
    );
    const query = {
      rowMode: "array",
      text:
        "SELECT code, time_submitted FROM \"" +
        table +
        "\" WHERE code LIKE '" +
        code +
        "%" +
        "' AND char_length(code) = $1;",
      values: [
        code_combination.length,
      ],
    };
    var queryResult: QueryResult<any> = await client.query(query);

    if (queryResult.rowCount === 0) {
      isAvailable = true;
    } else {
      // Populate the codes and dates from the database into arrays
      for (var row: number = 0; row < queryResult.rowCount; row++) {
        existing_codes.push(queryResult.rows[row][0]);
        existing_code_dates.push(new Date(queryResult.rows[row][1]));
      }
    }

    for (var i: number = 0; i < dictionary.length && !isAvailable; i++) {
      // Check the availability of every possible character in the last spot in the array
      code_combination[code_combination.length - 1] = i;
      isAvailable = await this.isAvailable(
        client,
        table,
        code_combination,
        dictionary,
        existing_codes,
        existing_code_dates
      );
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
  private static async isAvailable(
    client: PoolClient,
    table: string,
    code_combination: number[],
    dictionary: string,
    existing_codes: string[],
    existing_code_dates: Date[]
  ): Promise<boolean> {
    var isAvailable: boolean = false;
    if (
      !existing_codes.includes(this.renderCode(code_combination, dictionary))
    ) {
      isAvailable = true;
    } else if (
      new Date().getFullYear() -
        existing_code_dates[
          existing_codes.findIndex(
            (e) => e === this.renderCode(code_combination, dictionary)
          )
        ].getFullYear() >
      10
    ) {
      // The code is available if it was last used 10 years ago
      // Delete the last entry's code
      isAvailable = true;
      const query = {
        rowMode: "array",
        text: "UPDATE \"" + table + "\" SET code = NULL WHERE code = $1;",
        values: [this.renderCode(code_combination, dictionary)],
      };
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
  private static randInt(max: number, min: number = 0) {
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
  private static renderCode(
    code_combination: number[],
    dictionary: string
  ): string {
    let code: string = "";
    code_combination.forEach((char) => {
      code += dictionary[char];
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
    for (var i = 0; i < code.length; i++) {
      code_combination.push(dictionary.indexOf(code[i]));
    }
    return code_combination;
  }
}
