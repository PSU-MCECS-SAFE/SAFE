import { PoolClient } from "pg";
import { messageDBConnect } from "../safeMessageDB/messageDBConnect";
import { Code } from "../safeUtil/generateCode";

describe("generateCode.ts tests", async () => {
  const client: PoolClient = await messageDBConnect.connect();
  const dictionary: string =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
      .split("")
      .sort()
      .join("");

  describe("Utility Functions", () => {
    it("renderCode renders correct code", () => {
      expect(
        // @ts-ignore
        Code.renderCode(
          [
            0,
            1,
            2,
            dictionary.length - 3,
            dictionary.length - 2,
            dictionary.length - 1,
          ],
          dictionary
        )
      ).toEqual(
        dictionary.slice(0, 3) +
          dictionary.slice(dictionary.length - 3, dictionary.length)
      );
    });

    it("renderCode empty case", () => {
      // @ts-ignore
      expect(Code.renderCode([], dictionary)).toEqual("");
    });

    it("renderCodeCombination renders correct code combination", () => {
      expect(
        // @ts-ignore
        Code.renderCodeCombination(
          dictionary.slice(0, 3) + dictionary.slice(dictionary.length - 3),
          dictionary
        )
      ).toEqual([
        0,
        1,
        2,
        dictionary.length - 3,
        dictionary.length - 2,
        dictionary.length - 1,
      ]);
    });

    it("renderCodeCombination empty case", () => {
      // @ts-ignore
      expect(Code.renderCodeCombination("", dictionary)).toEqual([]);
    });

    it("renderCode and renderCodeCombination are inverses of each other", () => {
      expect(
        // @ts-ignore
        Code.renderCode(
          // @ts-ignore
          Code.renderCodeCombination(
            dictionary.slice(0, 3) + dictionary.slice(dictionary.length - 3),
            dictionary
          ),
          dictionary
        )
      ).toEqual(
        dictionary.slice(0, 3) + dictionary.slice(dictionary.length - 3)
      );

      // @ts-ignore
      expect(
        // @ts-ignore
        Code.renderCodeCombination(
          // @ts-ignore
          Code.renderCode(
            [
              0,
              1,
              2,
              dictionary.length - 3,
              dictionary.length - 2,
              dictionary.length - 1,
            ],
            dictionary
          ),
          dictionary
        )
      ).toEqual([
        0,
        1,
        2,
        dictionary.length - 3,
        dictionary.length - 2,
        dictionary.length - 1,
      ]);
    });

    it("randInt defaults min to 0", () => {
      // @ts-ignore
      expect(Code.randInt(0)).toEqual(0);
    });

    it("randInt uses inclusive value range", () => {
      // @ts-ignore
      expect(Code.randInt(1, 1)).toEqual(1);
    });

    it("randInt rounds floating point values down", () => {
      // @ts-ignore
      expect(Code.randInt(5.1, 5.9)).toEqual(5);
    });
  });
});
