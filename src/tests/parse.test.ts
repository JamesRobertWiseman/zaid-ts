import {
  getAge,
  getCitizenship,
  getDateOfBirth,
  getGender,
  parse,
} from "../lib/parse";

const CURRENT_DATE = new Date("2026-09-01T12:00:00.000Z");

beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(CURRENT_DATE);
});

afterEach(() => {
  jest.useRealTimers();
});

describe("getDateOfBirth", () => {
  test("returns the date at UTC midnight", () => {
    expect(getDateOfBirth("8001015009087").toISOString()).toBe(
      "1980-01-01T00:00:00.000Z"
    );
  });

  test("resolves a recent two-digit birth year", () => {
    expect(getDateOfBirth("2601015000089").toISOString()).toBe(
      "2026-01-01T00:00:00.000Z"
    );
  });

  test("does not resolve a birth date into the future", () => {
    expect(getDateOfBirth("2609025000080").toISOString()).toBe(
      "1926-09-02T00:00:00.000Z"
    );
  });
});

describe("getGender", () => {
  test("uses 0000 through 4999 for female", () => {
    expect(getGender("9002014999087")).toBe("female");
  });

  test("uses 5000 through 9999 for male", () => {
    expect(getGender("9002015000083")).toBe("male");
  });
});

describe("getCitizenship", () => {
  test.each([
    ["8001015009087", "SA citizen"],
    ["9002015052191", "Permanent resident"],
    ["9002015052258", "Refugee"],
  ])("parses %s", (id, citizenship) => {
    expect(getCitizenship(id)).toBe(citizenship);
  });
});

describe("getAge", () => {
  test("subtracts a year before the birthday", () => {
    expect(getAge("0009025000085")).toBe(25);
  });

  test("uses the current age after the birthday", () => {
    expect(getAge("0008315000086")).toBe(26);
  });
});

describe("parse", () => {
  test("returns all encoded fields", () => {
    expect(parse("9002015052258")).toEqual({
      dateOfBirth: new Date("1990-02-01T00:00:00.000Z"),
      gender: "male",
      citizenship: "Refugee",
    });
  });
});
