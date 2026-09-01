import { isValid, validate } from "../lib/valid";

const VALID_RESULT = {
  validLength: true,
  validDate: true,
  validCitizenshipCode: true,
  validSecondLastDigit: true,
  validChecksum: true,
};

describe("validate", () => {
  test("accepts the SARS reference ID", () => {
    expect(validate("8001015009087")).toEqual(VALID_RESULT);
  });

  test("accepts a refugee ID with another register index", () => {
    expect(validate("9002015052258")).toEqual(VALID_RESULT);
  });

  test("accepts register index 9", () => {
    expect(validate("9002015052191")).toEqual(VALID_RESULT);
  });

  test("rejects the wrong length", () => {
    expect(validate("800101500908").validLength).toBe(false);
  });

  test("rejects non-digit characters", () => {
    const result = validate("80010150090 7");

    expect(result.validLength).toBe(false);
    expect(result.validSecondLastDigit).toBe(false);
  });

  test("rejects an impossible date", () => {
    expect(validate("0002305000081").validDate).toBe(false);
  });

  test("rejects an unknown citizenship code", () => {
    expect(validate("0012315002381").validCitizenshipCode).toBe(false);
  });

  test("rejects an invalid checksum", () => {
    expect(validate("8001015009086").validChecksum).toBe(false);
  });
});

describe("isValid", () => {
  test("accepts a valid ID", () => {
    expect(isValid("8001015009087")).toBe(true);
  });

  test("rejects an invalid ID", () => {
    expect(isValid("8001015009086")).toBe(false);
  });
});
