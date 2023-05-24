import { isValid, validate } from "../lib/valid";

describe("validate", () => {
  test("valid ID", () => {
    const id = "9002015052084";
    const result = validate(id);
    expect(result.validLength).toBe(true);
    expect(result.validDate).toBe(true);
    expect(result.validCitizenshipCode).toBe(true);
    expect(result.validSecondLastDigit).toBe(true);
    expect(result.validChecksum).toBe(true);
  });

  test("invalid length", () => {
    const id = "001231500108";
    const result = validate(id);
    expect(result.validLength).toBe(false);
  });

  test("invalid characters", () => {
    const id = "00123150010a9";
    const result = validate(id);
    expect(result.validLength).toBe(false);
  });

  test("invalid date", () => {
    const id = "0013315001089";
    const result = validate(id);
    expect(result.validDate).toBe(false);
  });

  test("invalid citizenship code", () => {
    const id = "0012315002282";
    const result = validate(id);
    expect(result.validCitizenshipCode).toBe(false);
  });

  test("invalid second last digit", () => {
    const id = "0012315001058";
    const result = validate(id);
    expect(result.validSecondLastDigit).toBe(false);
  });

  test("invalid checksum", () => {
    const id = "0012315001080";
    const result = validate(id);
    expect(result.validChecksum).toBe(false);
  });
});

describe("isValid", () => {
  test("valid ID", () => {
    const id = "9002015052084";
    const result = isValid(id);
    expect(result).toBe(true);
  });

  test("invalid ID", () => {
    const id = "0012315001080";
    const result = isValid(id);
    expect(result).toBe(false);
  });
});
