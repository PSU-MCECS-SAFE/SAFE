import Code from "../safeUtil/generateCode";
import { PoolClient } from 'pg';
import { messageDBConnect } from '../safeMessageDB/messageDBConnect';

describe("Code Generation", () => {
  const dictionary: string =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
      .split("")
      .sort()
      .join("");

  // test('testName', () => {});
  test("Sorting Dictionary", () => {
    expect(dictionary).toBe(
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    );
  });

  test("Rendering Code and Rendering Code Combinations are Inverses", () => {
    expect(
      // @ts-ignore
      Code.renderCode([...Array(dictionary.length).keys()], dictionary)
    ).toStrictEqual(dictionary);

    // @ts-ignore
    expect(Code.renderCodeCombination(dictionary, dictionary)).toStrictEqual([
      ...Array(dictionary.length).keys(),
    ]);
  });

  test("Random Number Generator", () => {
    // @ts-ignore
    expect(Code.randInt(0)).toBe(0);
    // @ts-ignore
    expect(Code.randInt(0, 0)).toBe(0);
    // @ts-ignore
    expect(Code.randInt(dictionary.length, dictionary.length)).toBe(dictionary.length);

    // @ts-ignore
    expect(Code.randInt(dictionary.length, 10)).toBeGreaterThanOrEqual(10);
    // @ts-ignore
    expect(Code.randInt(dictionary.length, 10)).toBeLessThanOrEqual(dictionary.length);
  });

  test("Random Code Generator", async () => {
    const client: PoolClient = await messageDBConnect.connect();

    let first_code: string = await Code.genCode(client);
    let second_code: string = await Code.genCode(client, "MessageTest", first_code);
  });
});
